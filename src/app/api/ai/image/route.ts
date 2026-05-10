import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { buildImageOptimizationPrompt } from '@/lib/prompts/v1';
import { IMAGE_PROMPT_PRESET, IMAGE_TIMEOUT_MS, RETRY_CONFIG, resolvePromptVersion } from '@/lib/ai/config';
import { withRetryAndTimeout } from '@/lib/ai/retry';

function getAI() {
  const apiKey = process.env.GEMINI_API_KEY || '';
  return new GoogleGenAI({ apiKey });
}

interface ImageRequest {
  designDescription: string;
  targetScheme?: string;
  language?: 'en' | 'zh';
  prompt?: string;
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

    const body: ImageRequest = await request.json();
    const { designDescription, targetScheme, language = 'en', prompt } = body;

    if (!designDescription?.trim() && !prompt?.trim()) {
      return NextResponse.json(
        { error: { code: 'bad_request', message: 'Design description or prompt is required.' } },
        { status: 400 }
      );
    }

    let finalPrompt: string;

    if (prompt && prompt.trim()) {
      // Single-round: use pre-generated imagePrompt directly
      finalPrompt = prompt.trim();
    } else {
      // Fallback: two-round optimization (legacy flow)
      const optimizationPrompt = buildImageOptimizationPrompt(designDescription, targetScheme, language);

      finalPrompt = await withRetryAndTimeout(
        async () => {
          const response = await getAI().models.generateContent({
            model: 'gemini-flash-latest',
            contents: optimizationPrompt,
            config: {
              temperature: IMAGE_PROMPT_PRESET.temperature,
            },
          });
          return response.text?.trim() || designDescription;
        },
        {
          maxAttempts: RETRY_CONFIG.maxAttempts,
          baseDelayMs: RETRY_CONFIG.baseDelayMs,
          maxDelayMs: RETRY_CONFIG.maxDelayMs,
          timeoutMs: IMAGE_TIMEOUT_MS,
        }
      );
    }

    // Generate image
    const imageUrl = await withRetryAndTimeout(
      async () => {
        const response = await getAI().models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [{ text: finalPrompt }],
          },
          config: {},
        });

        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
          for (const part of parts) {
            if (part.inlineData && part.inlineData.data) {
              const mimeType = part.inlineData.mimeType || 'image/png';
              return `data:${mimeType};base64,${part.inlineData.data}`;
            }
          }
        }

        throw new Error('No image data found in response');
      },
      {
        maxAttempts: RETRY_CONFIG.maxAttempts,
        baseDelayMs: RETRY_CONFIG.baseDelayMs,
        maxDelayMs: RETRY_CONFIG.maxDelayMs,
        timeoutMs: IMAGE_TIMEOUT_MS,
      }
    );

    const version = resolvePromptVersion();
    const duration = Date.now() - startTime;
    console.log(`[AI Gateway] image | version=${version} | scheme=${targetScheme || 'general'} | singleRound=${!!prompt} | duration=${duration}ms | success`);

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    const duration = Date.now() - startTime;

    if (error.code) {
      console.error(`[AI Gateway] image | duration=${duration}ms | error=${error.code}`);

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

    console.error(`[AI Gateway] image | duration=${duration}ms | unexpected_error:`, error);
    return NextResponse.json(
      { error: { code: 'unknown', message: 'An unexpected server error occurred.' } },
      { status: 500 }
    );
  }
}
