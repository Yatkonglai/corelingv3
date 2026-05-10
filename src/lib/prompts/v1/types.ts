/**
 * Prompt Architecture Types
 * Version: 1.3.0
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

/**
 * Conversation phase for dynamic prompt compression.
 * Different phases load different prompt modules to reduce token usage.
 */
export type ConversationPhase =
  | 'consultation'      // Step 1: Asking clarifying questions
  | 'scheme-generation' // Step 2: Full scheme generation with all modules
  | 'refinement'        // Step 3+: Iterating on existing schemes
  | 'image-generation'; // Image generation request

/**
 * Master Density Archetype
 * Determines the density constraint profile for a design.
 * Each archetype represents a distinct compositional philosophy.
 */
export type DensityArchetype =
  | 'lace'          // Structural air: Bhagat, Michelle Ong
  | 'architectural' // Sculptural flow: Cindy Chao, Shaun Leane, Lauren Adriana
  | 'tapestry'      // Surface richness: JAR, Verdura
  | 'monolithic';   // Mass & texture: Grima, Wallace Chan, Hemmerle, Sevan, Belperron

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
  /** Density archetype for constraint application */
  archetype: DensityArchetype;
}

/**
 * Competition criterion with weight and description.
 */
export interface CompetitionCriterion {
  name: string;
  weight: number;
  description: string;
}

/**
 * Full competition profile with bilingual support.
 */
export interface CompetitionProfile {
  id: string;
  nameEn: string;
  nameZh: string;
  criteriaEn: CompetitionCriterion[];
  criteriaZh: CompetitionCriterion[];
  notesEn: string;
  notesZh: string;
}
