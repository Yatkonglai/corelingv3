import type { PromptLanguage, ConversationPhase } from './v1';
import { buildSystemInstruction as buildV1 } from './v1';
import type { PromptVersionString } from '../ai/config';

/**
 * Prompt Version Loader
 * Unified entry point for loading system instructions across versions.
 *
 * Usage:
 *   import { loadPrompt } from '@/lib/prompts/loader';
 *   const instruction = loadPrompt({ version: '1.2', lang: 'zh', phase: 'consultation' });
 *
 * A/B Testing:
 *   Pass different versions to compare output quality:
 *   loadPrompt({ version: '1.1', ... }) vs loadPrompt({ version: '1.2', ... })
 */

interface LoadPromptOptions {
  version: PromptVersionString;
  lang: PromptLanguage;
  phase?: ConversationPhase;
}

const versionLoaders: Record<
  PromptVersionString,
  (lang: PromptLanguage, phase?: ConversationPhase) => string
> = {
  '1.0': buildV1, // v1.0 base (before constraint layer)
  '1.1': buildV1, // v1.1 reality constraints (same entry, phase ignored = full)
  '1.2': buildV1, // v1.2 with phase-aware compression
  '1.3': buildV1, // v1.3 master density archetypes
};

/**
 * Load a system instruction by version, language, and phase.
 * Throws if version is not supported.
 */
export function loadPrompt(options: LoadPromptOptions): string {
  const { version, lang, phase } = options;
  const loader = versionLoaders[version];

  if (!loader) {
    throw new Error(
      `Unsupported prompt version: ${version}. Supported: ${Object.keys(versionLoaders).join(', ')}`
    );
  }

  return loader(lang, phase);
}

/**
 * Get available prompt versions with labels for UI / debugging.
 */
export function getPromptVersionInfo(): Array<{
  version: PromptVersionString;
  label: string;
  description: string;
}> {
  return [
    {
      version: '1.0',
      label: 'base-architecture',
      description: 'Original prompt system with designer DNA, workflow, and output contracts.',
    },
    {
      version: '1.1',
      label: 'reality-constraint-layer',
      description: 'Adds High Jewelry Reality Constraints (gemstone limits, negative space, anti-CGI).',
    },
    {
      version: '1.2',
      label: 'competition-criteria-compression',
      description: 'Adds 6 competition profiles and phase-aware prompt compression for token efficiency.',
    },
    {
      version: '1.3',
      label: 'master-density-archetypes',
      description: 'Replaces universal negative-space rule with 4 archetype-aware density profiles (Lace/Architectural/Tapestry/Monolithic) matching 12 master designers.',
    },
  ];
}
