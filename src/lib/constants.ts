import { Translation, Language } from './types';
import { buildSystemInstruction } from './prompts/v1';

/**
 * Prompt Version: 1.0.0
 * The system instruction is now assembled from structured modules
 * in src/lib/prompts/v1/. See that directory for the source of truth.
 */

/**
 * Returns the system instruction for the given language.
 * This is a thin wrapper around the prompt architecture.
 */
export function getSystemInstruction(language: Language): string {
  return buildSystemInstruction(language);
}

/**
 * Legacy export for backward compatibility during migration.
 * Prefer getSystemInstruction(language) for new code.
 */
export const SYSTEM_INSTRUCTION = buildSystemInstruction('en');

export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    title: "GEMMA ARTISTE",
    subtitle: "High Jewelry Design AI System",
    inputPlaceholder: "Describe your vision (e.g., 'A thorn-themed necklace set in platinum')...",
    send: "Send",
    generating: "Designing...",
    selectScheme: "Select this scheme",
    generateImage: "Generate Visualization",
    apiKeyMissing: "API Key not found in environment.",
    apiKeyPlaceholder: "Enter Gemini API Key",
    welcomeMessage: "✨ **Welcome to GEMMA ARTISTE.**\n\nI fuse the DNA of 12 master designers to create award-winning jewelry concepts.\n\nTell me your vision:\n*   Concept (e.g., Protection, Metamorphosis)\n*   Style (e.g., Sculptural, Gothic, Minimalist)\n*   Materials (e.g., Titanium, Emeralds)\n\nI will propose professional design schemes for you.",
    clearChat: "New Session"
  },
  zh: {
    title: "GEMMA ARTISTE",
    subtitle: "艺术珠宝设计 AI 系统",
    inputPlaceholder: "描述您的构想 (例如：'一套以此为主题的荆棘白金项链')...",
    send: "发送",
    generating: "设计中...",
    selectScheme: "选择此方案",
    generateImage: "生成视觉效果图",
    apiKeyMissing: "未找到 API 密钥。",
    apiKeyPlaceholder: "输入 Gemini API 密钥",
    welcomeMessage: "✨ **欢迎使用 GEMMA ARTISTE**\n\n我融合了全球 12 位顶级收藏级设计师的 DNA，为您打造获奖级的艺术珠宝方案。\n\n请告诉我您的愿景：\n*   概念主题 (如：变迁、保护)\n*   风格参考 (如：雕塑感、哥特风)\n*   关键材质 (如：钛金属、祖母绿)\n\n我将为您构思专业的艺术方案。",
    clearChat: "新会话"
  }
};
