/**
 * Output Validation Layer
 * Version: 1.3.1
 *
 * Post-hoc structural validation for AI-generated scheme outputs.
 * Runs AFTER the model returns its response, before sending to client.
 * Scope: structural checks only (regex/schema). NO semantic archetype matching.
 */

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

const FORBIDDEN_PHRASES = [
  '8k resolution',
  'cinematic lighting',
  'hyper-realistic',
  'hyper realistic',
  'CGI',
  'computer generated',
];

const SCHEME_HEADING_EN = /### Scheme [A-C]:/g;
const SCHEME_HEADING_ZH = /### 方案 [A-C]:/g;
const CORELING_META = /```(?:json\s+)?coreling_meta\s*([\s\S]*?)```/;
const STRUCTURAL_LEAD_EN = /Structural Lead/i;
const STRUCTURAL_LEAD_ZH = /结构主导/i;

/**
 * Validate a scheme-generation output for structural correctness.
 * @param text - The raw AI response text
 * @returns ValidationResult with errors and warnings
 */
export function validateSchemeOutput(text: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Check coreling_meta block exists
  const metaMatch = text.match(CORELING_META);
  if (!metaMatch) {
    errors.push('Missing coreling_meta JSON block');
  } else {
    // 2. Try to parse the JSON
    try {
      const jsonText = metaMatch[1].trim();
      const meta = JSON.parse(jsonText);
      if (!meta.schemes || !Array.isArray(meta.schemes)) {
        errors.push('coreling_meta missing "schemes" array');
      } else {
        // 3. Check scheme count matches headings
        const enHeadings = (text.match(SCHEME_HEADING_EN) || []).length;
        const zhHeadings = (text.match(SCHEME_HEADING_ZH) || []).length;
        const headingCount = Math.max(enHeadings, zhHeadings);
        if (headingCount === 0) {
          warnings.push('No scheme headings (### Scheme A: / ### 方案 A:) found');
        } else if (meta.schemes.length !== headingCount) {
          errors.push(
            `Scheme count mismatch: ${headingCount} headings but ${meta.schemes.length} entries in coreling_meta`
          );
        }
        // 4. Check each scheme has required fields
        meta.schemes.forEach((scheme: any, i: number) => {
          if (!scheme.id) errors.push(`Scheme ${i + 1} missing "id" in coreling_meta`);
          if (!scheme.title) errors.push(`Scheme ${i + 1} missing "title" in coreling_meta`);
          if (!scheme.imagePrompt)
            errors.push(`Scheme ${i + 1} missing "imagePrompt" in coreling_meta`);
        });
      }
    } catch {
      errors.push('coreling_meta contains invalid JSON');
    }
  }

  // 5. Check scheme count ≤ 3
  const enHeadings = (text.match(SCHEME_HEADING_EN) || []).length;
  const zhHeadings = (text.match(SCHEME_HEADING_ZH) || []).length;
  const totalSchemes = Math.max(enHeadings, zhHeadings);
  if (totalSchemes > 3) {
    errors.push(`Too many schemes: ${totalSchemes} (max 3)`);
  }
  if (totalSchemes === 0) {
    warnings.push('No scheme headings detected');
  }

  // 6. Check for forbidden phrases (case-insensitive)
  const lowerText = text.toLowerCase();
  for (const phrase of FORBIDDEN_PHRASES) {
    if (lowerText.includes(phrase.toLowerCase())) {
      errors.push(`Forbidden phrase detected: "${phrase}"`);
    }
  }

  // 7. Check for Structural Lead declaration (advisory, not strict)
  const hasStructuralLead =
    STRUCTURAL_LEAD_EN.test(text) || STRUCTURAL_LEAD_ZH.test(text);
  if (!hasStructuralLead) {
    warnings.push('No "Structural Lead" / "结构主导" declaration found');
  }

  // 8. Check for comparison table
  const hasTable = text.includes('| Aspect |') || text.includes('| 维度 |');
  if (!hasTable) {
    warnings.push('No comparison table detected');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Build a correction prompt based on validation errors.
 * @param originalText - The AI's original output
 * @param validation - The validation result
 * @returns A correction prompt to send back to the model
 */
export function buildCorrectionPrompt(
  _originalText: string,
  validation: ValidationResult
): string {
  if (validation.valid && validation.warnings.length === 0) {
    return '';
  }

  const issues = [...validation.errors, ...validation.warnings];
  const issueList = issues.map((issue) => `- ${issue}`).join('\n');

  return `The previous response had the following issues. Please fix them and regenerate the complete response:

${issueList}

Rules:
1. Output the FULL corrected response, not just the fixes.
2. Ensure the \\\`\\\`\\\`json coreling_meta\\\`\\\`\\\` block is present and valid.
3. Follow all output contract rules from the system instruction.
4. Maintain the same design concepts where possible.`;
}
