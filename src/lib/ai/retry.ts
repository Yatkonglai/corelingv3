/**
 * Retry and Timeout Wrapper for AI Gateway
 * Centralized resilience logic. This is the only place in the codebase
 * that knows retry timing and error classification.
 */

import { RETRY_CONFIG } from './config';

export type ErrorCode =
  | 'timeout'
  | 'rate_limit'
  | 'bad_request'
  | 'unavailable'
  | 'invalid_output'
  | 'network'
  | 'auth_error'
  | 'unknown';

export interface AIGatewayError {
  code: ErrorCode;
  message: string;
  retryable: boolean;
}

export interface RetryOptions {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
  timeoutMs: number;
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxAttempts: RETRY_CONFIG.maxAttempts,
  baseDelayMs: RETRY_CONFIG.baseDelayMs,
  maxDelayMs: RETRY_CONFIG.maxDelayMs,
  timeoutMs: 20_000,
};

/**
 * Classifies an error into a normalized AIGatewayError.
 */
export function classifyError(error: unknown): AIGatewayError {
  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return { code: 'network', message: 'Network error. Please check your connection.', retryable: true };
  }

  // AbortController timeout
  if (error instanceof DOMException && error.name === 'AbortError') {
    return { code: 'timeout', message: 'Request timed out. Please try again.', retryable: true };
  }

  // Google GenAI errors often have a status or code property
  const err = error as any;
  const status = err?.status || err?.code || err?.response?.status;
  const message = err?.message || String(error);

  if (status === 408 || message.includes('timeout') || message.includes('ETIMEDOUT')) {
    return { code: 'timeout', message: 'Request timed out. Please try again.', retryable: true };
  }

  if (status === 429 || message.includes('rate limit') || message.includes('quota')) {
    return { code: 'rate_limit', message: 'Service is busy. Please wait a moment and try again.', retryable: true };
  }

  if (status === 400 || status === '400') {
    if (message.includes('location') || message.includes('Geo') || message.includes('region')) {
      return { code: 'bad_request', message: 'The AI model is not supported in your current region.', retryable: false };
    }
    return { code: 'bad_request', message: 'Invalid request format. Please check your input.', retryable: false };
  }

  if (status === 401 || status === 403) {
    return { code: 'auth_error', message: 'Authentication failed. Please check your API key.', retryable: false };
  }

  if (status === 404) {
    return { code: 'bad_request', message: 'Resource not found.', retryable: false };
  }

  if (status >= 500 && status < 600) {
    return { code: 'unavailable', message: 'AI service is temporarily unavailable. Please try again.', retryable: true };
  }

  return { code: 'unknown', message: 'An unexpected error occurred. Please try again.', retryable: false };
}

/**
 * Checks if an error code is retryable.
 */
export function isRetryableError(code: ErrorCode): boolean {
  return ['timeout', 'rate_limit', 'unavailable', 'network'].includes(code);
}

/**
 * Computes delay with exponential backoff and jitter.
 */
function computeDelay(attempt: number, baseDelayMs: number, maxDelayMs: number): number {
  const exponential = baseDelayMs * Math.pow(2, attempt - 1);
  const jitter = Math.random() * 0.3 * exponential; // 0-30% jitter
  return Math.min(exponential + jitter, maxDelayMs);
}

/**
 * Sleep utility.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wraps an async function with timeout and retry logic.
 * Creates a fresh AbortController on each attempt.
 */
export async function withRetryAndTimeout<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const opts = { ...DEFAULT_RETRY_OPTIONS, ...options };

  for (let attempt = 1; attempt <= opts.maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), opts.timeoutMs);

    try {
      const result = await fn(controller.signal);
      clearTimeout(timeoutId);
      return result;
    } catch (error) {
      clearTimeout(timeoutId);
      const classified = classifyError(error);

      // Log for observability
      console.error(`[AI Gateway] Attempt ${attempt}/${opts.maxAttempts} failed:`, {
        code: classified.code,
        retryable: classified.retryable,
        message: classified.message,
      });

      // Don't retry non-retryable errors
      if (!classified.retryable || attempt >= opts.maxAttempts) {
        throw classified;
      }

      // Wait before retrying
      const delay = computeDelay(attempt, opts.baseDelayMs, opts.maxDelayMs);
      await sleep(delay);
    }
  }

  // Should never reach here
  throw { code: 'unknown', message: 'Max retry attempts exceeded.', retryable: false } as AIGatewayError;
}
