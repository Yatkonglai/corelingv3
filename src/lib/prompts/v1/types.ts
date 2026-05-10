/**
 * Prompt Architecture Types
 * Version: 1.0.0
 *
 * Core types for the structured prompt system.
 * All prompt modules are pure functions that return strings.
 */

export interface PromptVersion {
  major: number;
  minor: number;
  patch: number;
  label: string;
}

export type PromptLanguage = 'en' | 'zh';

export interface OutputContract {
  /** Human-readable description of expected output */
  description: string;
  /** Required sections in the output */
  requiredSections: string[];
  /** Optional sections */
  optionalSections?: string[];
  /** Format constraints */
  format: 'markdown' | 'structured' | 'free';
  /** Validation rules */
  validation?: string[];
}

export interface FewShotExample {
  id: string;
  input: string;
  output: string;
  /** Why this output is correct */
  rationale: string;
}

export interface PromptModule {
  name: string;
  version: string;
  build: (lang: PromptLanguage) => string;
}

export interface DesignerProfile {
  name: string;
  keywords: string[];
  signatureTechniques: string[];
  philosophy: string;
}
