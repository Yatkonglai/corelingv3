/**
 * AI Gateway Configuration
 * Centralized presets for model behavior.
 */

export type GenerationMode = 'artisan' | 'muse';

export interface ModelPreset {
  label: string;
  labelZh: string;
  temperature: number;
  description: string;
  descriptionZh: string;
}

export const MODEL_PRESETS: Record<GenerationMode, ModelPreset> = {
  artisan: {
    label: 'The Artisan',
    labelZh: '工匠模式',
    temperature: 0.3,
    description: 'Focus on technical viability, DNA adherence, and structural constraints.',
    descriptionZh: '专注于技术可行性、DNA遵循度和结构约束。',
  },
  muse: {
    label: 'The Muse',
    labelZh: '灵感模式',
    temperature: 0.7,
    description: 'Focus on artistic boundaries, unexpected material fusions, and conceptual breakthroughs.',
    descriptionZh: '专注于艺术边界、意外材质融合和概念突破。',
  },
};

export const IMAGE_PROMPT_PRESET = {
  temperature: 0.2,
} as const;

export const DEFAULT_MODE: GenerationMode = 'artisan';

export const CHAT_TIMEOUT_MS = 20_000;
export const IMAGE_TIMEOUT_MS = 45_000;

export const RETRY_CONFIG = {
  maxAttempts: 3,
  baseDelayMs: 500,
  maxDelayMs: 5000,
} as const;
