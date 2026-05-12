/**
 * Output Validation Layer
 * Version: 1.4.0
 *
 * Post-hoc structural validation for AI-generated scheme outputs.
 * Runs AFTER the model returns its response, before sending to client.
 * Scope: structural checks only (regex/schema). NO semantic archetype matching.
 *
 * v1.4.0: Added Wearability Profile strict checks (Core Layer = ERROR),
 * old "Wearability Note" format detection, confidence/rationale advisory.
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

// ── Wearability Profile Validation (v1.4.0) ────────────────────────────────

const WEARABILITY_PROFILE_EN = /## Wearability Profile/i;
const WEARABILITY_PROFILE_ZH = /## 佩戴性档案/i;

// Core Layer field names (EN)
const CORE_FIELD_STABILITY_EN = /Type-Specific Stability Assessment/i;
const CORE_FIELD_BURDEN_EN = /Wear Burden Level/i;
const CORE_FIELD_SCENARIOS_EN = /Recommended Scenarios/i;
const CORE_FIELD_PRESENCE_EN = /Presence Level/i;

// Core Layer field names (ZH)
const CORE_FIELD_STABILITY_ZH = /类型专属稳定性评估/i;
const CORE_FIELD_BURDEN_ZH = /佩戴负担等级/i;
const CORE_FIELD_SCENARIOS_ZH = /推荐场景/i;
const CORE_FIELD_PRESENCE_ZH = /存在感等级/i;

// Old format detection (regression guard)
const OLD_WEARABILITY_NOTE_EN = /\*\*Wearability Note\*\*/i;
const OLD_WEARABILITY_NOTE_ZH = /\*\*佩戴性说明\*\*/i;

// Confidence / source / rationale markers
const CONFIDENCE_MARKER = /Confidence:\s*(high|medium|low)/i;
const SOURCE_MARKER = /Source:\s*(rule-engine|LLM-inference|design-intent)/i;
const RATIONALE_MARKER = /Rationale:/i;
const ESTIMATE_LABEL = /ESTIMATE/i;

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

  // ── v1.4.0 Wearability Profile Checks ────────────────────────────────────

  // 9. Detect old "Wearability Note" format (regression guard)
  const hasOldWearabilityNote =
    OLD_WEARABILITY_NOTE_EN.test(text) || OLD_WEARABILITY_NOTE_ZH.test(text);
  if (hasOldWearabilityNote) {
    errors.push(
      'Deprecated "Wearability Note" format detected. Use "Wearability Profile" block with 4-tier field system instead.'
    );
  }

  // 10. Check Wearability Profile block presence
  const hasWearabilityProfile =
    WEARABILITY_PROFILE_EN.test(text) || WEARABILITY_PROFILE_ZH.test(text);
  if (!hasWearabilityProfile) {
    errors.push('Missing Wearability Profile block (required since v1.4.0)');
  }

  // 11. Check Core Layer field completeness (ERROR if any missing)
  if (hasWearabilityProfile) {
    const isEn = WEARABILITY_PROFILE_EN.test(text);
    const isZh = WEARABILITY_PROFILE_ZH.test(text);

    const stabilityOk = isEn
      ? CORE_FIELD_STABILITY_EN.test(text)
      : isZh
        ? CORE_FIELD_STABILITY_ZH.test(text)
        : CORE_FIELD_STABILITY_EN.test(text) || CORE_FIELD_STABILITY_ZH.test(text);

    const burdenOk = isEn
      ? CORE_FIELD_BURDEN_EN.test(text)
      : isZh
        ? CORE_FIELD_BURDEN_ZH.test(text)
        : CORE_FIELD_BURDEN_EN.test(text) || CORE_FIELD_BURDEN_ZH.test(text);

    const scenariosOk = isEn
      ? CORE_FIELD_SCENARIOS_EN.test(text)
      : isZh
        ? CORE_FIELD_SCENARIOS_ZH.test(text)
        : CORE_FIELD_SCENARIOS_EN.test(text) || CORE_FIELD_SCENARIOS_ZH.test(text);

    const presenceOk = isEn
      ? CORE_FIELD_PRESENCE_EN.test(text)
      : isZh
        ? CORE_FIELD_PRESENCE_ZH.test(text)
        : CORE_FIELD_PRESENCE_EN.test(text) || CORE_FIELD_PRESENCE_ZH.test(text);

    if (!stabilityOk) errors.push('Missing Core Layer field: Type-Specific Stability Assessment / 类型专属稳定性评估');
    if (!burdenOk) errors.push('Missing Core Layer field: Wear Burden Level / 佩戴负担等级');
    if (!scenariosOk) errors.push('Missing Core Layer field: Recommended Scenarios / 推荐场景');
    if (!presenceOk) errors.push('Missing Core Layer field: Presence Level / 存在感等级');
  }

  // 12. Advisory: confidence grading
  const confidenceCount = (text.match(CONFIDENCE_MARKER) || []).length;
  if (confidenceCount < 4) {
    warnings.push(
      `Only ${confidenceCount} confidence declarations found. Wearability Profile fields should each declare confidence (high/medium/low).`
    );
  }

  // 13. Advisory: source attribution
  const sourceCount = (text.match(SOURCE_MARKER) || []).length;
  if (sourceCount < 4) {
    warnings.push(
      `Only ${sourceCount} source attributions found. Wearability Profile fields should each declare source (rule-engine/LLM-inference/design-intent).`
    );
  }

  // 14. Advisory: rationale presence
  const rationaleCount = (text.match(RATIONALE_MARKER) || []).length;
  if (rationaleCount < 4) {
    warnings.push(
      `Only ${rationaleCount} rationale fields found. Wearability Profile fields should each include a rationale with 2-3 evidence points.`
    );
  }

  // 15. Advisory: ESTIMATE labels on physical data fields
  const hasEstimateLabel = ESTIMATE_LABEL.test(text);
  if (hasWearabilityProfile && !hasEstimateLabel) {
    warnings.push(
      'Missing "ESTIMATE" label on weight/dimension fields. Annotated Layer fields must explicitly label data as estimates.'
    );
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
4. Every scheme MUST include a Wearability Profile block with all 4 Core Layer fields (Type-Specific Stability Assessment, Wear Burden Level, Recommended Scenarios, Presence Level). Each field must have value, confidence (high/medium/low), source (rule-engine/LLM-inference/design-intent), and rationale with 2-3 evidence points.
5. Annotated Layer fields (weight, dimensions) must carry the "ESTIMATE" label and low confidence.
6. Maintain the same design concepts where possible.`;
}
