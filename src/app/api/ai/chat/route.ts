import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { buildSystemInstruction } from '@/lib/prompts/v1';
import { MODEL_PRESETS, DEFAULT_MODE, CHAT_TIMEOUT_MS, RETRY_CONFIG } from '@/lib/ai/config';
import { withRetryAndTimeout } from '@/lib/ai/retry';
import type { GenerationMode } from '@/lib/ai/config';

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

    const preset = MODEL_PRESETS[mode];
    const systemInstruction = buildSystemInstruction(language);

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

        // Note: Google GenAI SDK doesn't directly support AbortSignal on sendMessage.
        // We rely on the AbortController in withRetryAndTimeout for timeout handling.
        // If the SDK adds signal support in the future, pass it here.
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
    console.log(`[AI Gateway] chat | mode=${mode} | temp=${preset.temperature} | duration=${duration}ms | success`);

    return NextResponse.json({ text: result });
  } catch (error: any) {
    const duration = Date.now() - startTime;

    if (error.code) {
      // Already normalized error from withRetryAndTimeout
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

    // Unexpected error
    console.error(`[AI Gateway] chat | duration=${duration}ms | unexpected_error:`, error);
    return NextResponse.json(
      { error: { code: 'unknown', message: 'An unexpected server error occurred.' } },
      { status: 500 }
    );
  }
}
