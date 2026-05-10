import { PromptLanguage, PromptVersion } from './types';
import { buildCoreIdentity } from './core';
import { buildDesignerDNA } from './dna';
import { buildWorkflow } from './workflow';
import { buildExamples } from './examples';
import { buildContract } from './contracts';

/**
 * GEMMA ARTISTE Prompt System
 * Version: 1.0.0
 *
 * Structured prompt assembly for consistent AI behavior.
 * Each module is a pure function. The assembler composes them
 * into the final system instruction.
 */

export const VERSION: PromptVersion = {
  major: 1,
  minor: 0,
  patch: 0,
  label: 'structured-prompt-architecture',
};

export function getVersionString(): string {
  return `${VERSION.major}.${VERSION.minor}.${VERSION.patch}`;
}

/**
 * Assembles the complete system instruction.
 * @param lang - Target language for the prompt
 * @returns The full system instruction string
 */
export function buildSystemInstruction(lang: PromptLanguage): string {
  const sections = [
    buildCoreIdentity(lang),
    buildDesignerDNA(),
    buildWorkflow(lang),
    buildExamples(lang),
    buildContract(lang),
  ];

  return sections.join('\n\n---\n\n');
}

/**
 * Builds the image generation optimization prompt.
 * @param designDescription - The full design text to convert
 * @param targetScheme - Optional specific scheme to focus on
 * @param lang - Target language
 * @returns The optimization prompt for the text model
 */
export function buildImageOptimizationPrompt(
  designDescription: string,
  targetScheme: string | undefined,
  lang: PromptLanguage
): string {
  const focusInstruction = targetScheme
    ? lang === 'zh'
      ? `重要：只关注"${targetScheme}"（或类似标识如"方案 A"）下描述的设计。忽略其他方案。`
      : `IMPORTANT: Focus ONLY on the design described under "${targetScheme}" (or similar identifier like "Scheme A"). Ignore other schemes.`
    : '';

  const aestheticRules = lang === 'zh'
    ? `美学规则（必须遵守）：
1. **精致度**：使用"高级珠宝"、"掐丝"、"精致"、"薄纱般"、"超薄金属工艺"等关键词。
2. **负空间**：确保设计看起来通透开放。不要实心，不要厚重。
3. **写实度**："微距摄影"、"景深"、"8k分辨率"、"电影级光线"。
4. **比例**：确保珠宝 pieces 与人体比例协调。`
    : `AESTHETIC RULES (MUST FOLLOW):
1. **Delicacy**: Use keywords like "fine jewelry," "filigree," "delicate," "gossamer," "ultra-thin metalwork."
2. **Negative Space**: Ensure the design looks airy and open. NOT solid, NOT chunky.
3. **Realism**: "Macro photography," "Depth of field," "8k resolution," "cinematic lighting."
4. **Proportion**: Ensure the jewelry pieces are proportional to a human scale.`;

  const displayContext = lang === 'zh'
    ? `展示环境规则（关键）：
* **项链**：使用"展示在优雅的黑色丝绒人体模型胸台上"。
* **胸针/别针**：使用"别在高定时装的胸前（深色丝绸或丝绒翻领），以展示真实比例"。**不要**为胸针使用人体模型胸台，会让它们看起来过大。
* **戒指/耳环**：使用"深色纹理石板或专业珠宝展示架上的微距拍摄"。`
    : `DISPLAY CONTEXT RULES (CRITICAL):
* **IF NECKLACE**: Use "displayed on an elegant black velvet mannequin bust".
* **IF BROOCH / PIN**: Use "pinned on the chest of a high-fashion garment (dark silk or velvet lapel) to show realistic scale". **DO NOT** use a mannequin bust for brooches, it makes them look oversized.
* **IF RING / EARRINGS**: Use "macro shot on a dark textured slate or professional jewelry stand".`;

  const outputReq = lang === 'zh'
    ? '输出要求：只输出原始提示词文本，不要 markdown，不要解释。'
    : 'Output Requirements: Output ONLY the raw prompt text, no markdown, no explanations.';

  return `Act as GEMMA ARTISTE. Convert the following jewelry design description into a strictly formatted, photorealistic image generation prompt.

${focusInstruction}

Input Description:
"${designDescription}"

${aestheticRules}

${displayContext}

${outputReq}`;
}

// Re-export types for convenience
export * from './types';
