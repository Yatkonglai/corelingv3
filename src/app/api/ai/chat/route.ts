import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { buildSystemInstruction } from '@/lib/prompts/v1';
import { MODEL_PRESETS, DEFAULT_MODE, CHAT_TIMEOUT_MS, RETRY_CONFIG } from '@/lib/ai/config';
import { withRetryAndTimeout } from '@/lib/ai/retry';
import type { GenerationMode } from '@/lib/ai/config';
import type { ConversationPhase } from '@/lib/prompts/v1';

function getAI() {
  const apiKey = process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey });
}

interface ChatRequest {
  history: Array<{ role: 'user' | 'model'; text: string }>;
  message: string;
  language: 'en' | 'zh';
  mode?: GenerationMode;
}

/**
 * Detect conversation phase based on history length and content.
 * This enables dynamic prompt compression to reduce token usage.
 */
function detectPhase(history: Array<{ role: 'user' | 'model'; text: string }>, currentMessage: string): ConversationPhase {
  const totalMessages = history.length;

  // Image generation keywords
  const imageKeywords = ['图', 'image', 'picture', 'render', 'visual', '照片', '效果图', '生成图'];
  const isImageRequest = imageKeywords.some((kw) => currentMessage.toLowerCase().includes(kw.toLowerCase()));
  if (isImageRequest) {
    return 'image-generation';
  }

  // Consultation: first 1-2 rounds (lightweight prompt)
  if (totalMessages <= 2) {
    return 'consultation';
  }

  // Refinement: if history contains scheme markers and user is asking follow-up
  const hasSchemes = history.some((msg) =>
    msg.role === 'model' && (/Scheme [A-C]/i.test(msg.text) || /方案 [A-C]/i.test(msg.text))
  );
  const refinementKeywords = ['改', '修改', '调整', 'refine', 'adjust', 'change', 'alter', '优化', 'optimize', '再', 'another'];
  const isRefinement = hasSchemes && refinementKeywords.some((kw) => currentMessage.toLowerCase().includes(kw.toLowerCase()));
  if (isRefinement) {
    return 'refinement';
  }

  // Default: full scheme generation mode
  return 'scheme-generation';
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: { code: 'auth_error', message: 'GEMINI_API_KEY not configured on server.' } },
        { status: 500 }
      );
    }

    const body: ChatRequest = await request.json();
    const { history, message, language, mode = DEFAULT_MODE } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: { code: 'bad_request', message: 'Message is required.' } },
        { status: 400 }
      );
    }

    const phase = detectPhase(history, message);
    const preset = MODEL_PRESETS[mode];
    const systemInstruction = buildSystemInstruction(language, phase);

    // Convert history to Gemini format
    const geminiHistory = history.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const result = await withRetryAndTimeout(
      async () => {
        const chat = getAI().chats.create({
          model: 'gemini-flash-latest',
          config: {
            systemInstruction,
            temperature: preset.temperature,
          },
          history: geminiHistory,
        });

        const response: GenerateContentResponse = await chat.sendMessage({
          message,
        });

        return response.text || '';
      },
      {
        maxAttempts: RETRY_CONFIG.maxAttempts,
        baseDelayMs: RETRY_CONFIG.baseDelayMs,
        maxDelayMs: RETRY_CONFIG.maxDelayMs,
        timeoutMs: CHAT_TIMEOUT_MS,
      }
    );

    const duration = Date.now() - startTime;
    console.log(`[AI Gateway] chat | mode=${mode} | phase=${phase} | temp=${preset.temperature} | duration=${duration}ms | success`);

    return NextResponse.json({ text: result });
  } catch (error: any) {
    const duration = Date.now() - startTime;

    if (error.code) {
      console.error(`[AI Gateway] chat | mode=${error.mode || 'unknown'} | duration=${duration}ms | error=${error.code}`);

      const statusMap: Record<string, number> = {
        timeout: 504,
        rate_limit: 429,
        bad_request: 400,
        unavailable: 503,
        invalid_output: 422,
        network: 502,
        auth_error: 500,
        unknown: 500,
      };

      return NextResponse.json(
        { error: { code: error.code, message: error.message } },
        { status: statusMap[error.code] || 500 }
      );
    }

    console.error(`[AI Gateway] chat | duration=${duration}ms | unexpected_error:`, error);
    return NextResponse.json(
      { error: { code: 'unknown', message: 'An unexpected server error occurred.' } },
      { status: 500 }
    );
  }
}
