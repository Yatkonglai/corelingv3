import { PromptLanguage, PromptVersion, ConversationPhase } from './types';
import { buildCoreIdentity } from './core';
import { buildDesignerDNA } from './dna';
import { buildWorkflow } from './workflow';
import { buildExamples } from './examples';
import { buildContract } from './contracts';
import { buildRealityConstraints } from './constraints';
import { buildCompetitionCriteria } from './competitions';

/**
 * GEMMA ARTISTE Prompt System
 * Version: 1.3.0
 *
 * Added Master Density Archetypes in v1.3.0.
 * Replaced universal negative-space >= 50% with archetype-aware
 * density profiles (Lace/Architectural/Tapestry/Monolithic).
 * Each module is a pure function. The assembler composes them
 * into the final system instruction based on conversation phase.
 */

export const VERSION: PromptVersion = {
  major: 1,
  minor: 3,
  patch: 0,
  label: 'master-density-archetypes',
};

export function getVersionString(): string {
  return `${VERSION.major}.${VERSION.minor}.${VERSION.patch}`;
}

/**
 * Phase-aware module selection for prompt compression.
 * Reduces token usage by ~20-35% depending on phase.
 */
const PHASE_MODULES: Record<ConversationPhase, {
  core: boolean;
  constraints: boolean;
  designerDNA: boolean;
  competitions: boolean;
  workflow: boolean;
  examples: boolean;
  contract: boolean;
  competitionCompressed: boolean;
}> = {
  consultation: {
    core: true,
    constraints: false,      // skip heavy constraints during Q&A
    designerDNA: false,      // skip during Q&A
    competitions: true,
    workflow: true,          // keep Step 1 consultation behavior
    examples: false,         // skip examples during Q&A
    contract: false,         // skip contract during Q&A
    competitionCompressed: true,
  },
  'scheme-generation': {
    core: true,
    constraints: true,       // full constraints for generation
    designerDNA: true,
    competitions: true,
    workflow: true,
    examples: true,
    contract: true,
    competitionCompressed: false,
  },
  refinement: {
    core: false,             // skip identity re-introduction
    constraints: true,       // keep constraints for corrections
    designerDNA: false,      // skip during refinement
    competitions: true,
    workflow: false,         // skip full workflow during refinement
    examples: false,
    contract: true,
    competitionCompressed: true,
  },
  'image-generation': {
    core: false,
    constraints: true,       // keep constraints for image consistency
    designerDNA: false,
    competitions: false,
    workflow: false,
    examples: false,
    contract: false,
    competitionCompressed: false,
  },
};

/**
 * Assembles the complete system instruction.
 * @param lang - Target language for the prompt
 * @param phase - Conversation phase for dynamic module loading (default: scheme-generation)
 * @returns The full system instruction string
 */
export function buildSystemInstruction(
  lang: PromptLanguage,
  phase: ConversationPhase = 'scheme-generation'
): string {
  const modules = PHASE_MODULES[phase];
  const sections: string[] = [];

  if (modules.core) {
    sections.push(buildCoreIdentity(lang));
  }

  if (modules.constraints) {
    sections.push(buildRealityConstraints(lang));
  }

  if (modules.designerDNA) {
    sections.push(buildDesignerDNA());
  }

  if (modules.competitions) {
    sections.push(buildCompetitionCriteria(lang, modules.competitionCompressed));
  }

  if (modules.workflow) {
    sections.push(buildWorkflow(lang));
  }

  if (modules.examples) {
    sections.push(buildExamples(lang));
  }

  if (modules.contract) {
    sections.push(buildContract(lang));
  }

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
1. **精致度**：使用"高级珠宝"、"掐丝"、"精致"、"手工锻造纹理"、"超薄金属工艺"等关键词。
2. **负空间（原型感知）**：匹配设计融合原型的密度，不要统一规则：
   - 蕾丝：通透、骨架感、50-75%负空间、掐丝、张力固定宝石
   - 建筑：雕塑流动、30-50%负空间、有机框架
   - 织锦：密集表面覆盖、5-15%负空间、微镶渐变
   - 巨石：实心体量、0-10%负空间、雕刻体积、原始纹理
3. **写实度**：使用"微距摄影"、"自然光线"、"手工质感"。禁止使用"8k"、"电影级"、"超写实"、"CGI"。
4. **比例**：确保珠宝 pieces 与人体比例协调。参考真实高级珠宝尺寸。`
    : `AESTHETIC RULES (MUST FOLLOW):
1. **Delicacy**: Use keywords like "fine jewelry," "filigree," "delicate," "hand-forged texture," "ultra-thin metalwork."
2. **Negative Space (Archetype-Aware)**: Match the density of the design's fused archetype. Do NOT apply a universal rule:
   - Lace: airy, skeletal, 50-75% negative space, filigree, tension-held gems
   - Architectural: sculptural flow, 30-50% negative space, organic frameworks
   - Tapestry: dense surface coverage, 5-15% negative space, micro-pavé gradients
   - Monolithic: solid mass, 0-10% negative space, carved volume, raw texture
3. **Realism**: Use "macro photography," "natural lighting," "hand-worked texture." NEVER use "8k," "cinematic," "hyper-realistic," or "CGI."
4. **Proportion**: Ensure jewelry pieces are proportional to a human scale. Reference real high jewelry dimensions.`;

  const displayContext = lang === 'zh'
    ? `展示环境规则（关键）：
* **项链**：使用"展示在优雅的黑色丝绒人体模型胸台上，自然光线"。
* **胸针/别针**：使用"别在高定时装的胸前（深色丝绸或丝绒翻领），以展示真实比例"。**不要**为胸针使用人体模型胸台。
* **戒指/耳环**：使用"深色纹理石板或专业珠宝展示架上的微距拍摄，自然光线"。`
    : `DISPLAY CONTEXT RULES (CRITICAL):
* **IF NECKLACE**: Use "displayed on an elegant black velvet mannequin bust, natural lighting."
* **IF BROOCH / PIN**: Use "pinned on the chest of a high-fashion garment (dark silk or velvet lapel) to show realistic scale". **DO NOT** use a mannequin bust for brooches.
* **IF RING / EARRINGS**: Use "macro shot on a dark textured slate or professional jewelry stand, natural lighting."`;

  const negativePrompts = lang === 'zh'
    ? `绝对禁止的视觉元素（会导致"AI幻想珠宝"）：
- ❌ 完美对称（高级珠宝需要动态不对称）
- ❌ 过度光滑的塑料质感表面
- ❌ 比金属结构还大的宝石
- ❌ 漂浮的宝石（无可见镶嵌）
- ❌ 霓虹般鲜艳或不真实的宝石颜色
- ❌ 实心金属块（无镂空/结构）
- ❌ 脱离人体比例的幻想尺寸`
    : `ABSOLUTELY FORBIDDEN visual elements (cause "AI fantasy jewelry"):
- ❌ Perfect symmetry (high jewelry needs dynamic asymmetry)
- ❌ Hyper-polished plastic-like surfaces
- ❌ Gemstones larger than the metal structure supporting them
- ❌ Floating gemstones without visible setting mechanics
- ❌ Neon or unrealistic gemstone colors
- ❌ Solid metal masses without open-work/structure
- ❌ Fantasy proportions detached from human anatomy`;

  const outputReq = lang === 'zh'
    ? '输出要求：只输出原始提示词文本，不要 markdown，不要解释。'
    : 'Output Requirements: Output ONLY the raw prompt text, no markdown, no explanations.';

  return `Act as GEMMA ARTISTE. Convert the following jewelry design description into a strictly formatted, photorealistic image generation prompt.

${focusInstruction}

Input Description:
"${designDescription}"

${aestheticRules}

${displayContext}

${negativePrompts}

${outputReq}`;
}

// Re-export types for convenience
export * from './types';
