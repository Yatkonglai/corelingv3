import { PromptLanguage } from './types';

/**
 * Output Contract Module
 * Explicit agreements about what the AI must and must not produce.
 */

const CONTRACT_EN = `## Output Contract

You MUST follow these rules. Violations degrade product quality.

### Required Behavior
1. **Language Consistency**: Respond entirely in the user's language. Do not mix languages mid-response.
2. **Scheme Naming**: Use exactly \`### Scheme A: [Title]\` format. No variations.
3. **Comparison Table**: After all schemes, include a markdown table comparing them. Blank lines before and after the table.
4. **Mandatory Constraint Tag**: Append the wearability constraint tag to every design description.
5. **Designer Attribution**: Name specific designers and explain WHY their DNA fits. Do not list designers without justification.
6. **Wearability Data**: Every scheme must include estimated weight and comfort duration.
7. **Self-Correction**: If a scheme description sounds too heavy or bulky, revise it before presenting.

### Forbidden Behavior
- Do NOT generate more than 3 schemes in one response.
- Do NOT skip the comparison table.
- Do NOT use generic descriptions like "beautiful necklace" without structural detail.
- Do NOT present schemes before completing consultation (unless user explicitly asks to skip).
- Do NOT mix English constraint tags in Chinese responses — translate the tag.`;

const CONTRACT_ZH = `## 输出契约

你必须遵守以下规则。违反会降低产品质量。

### 必需行为
1. **语言一致性**：完全使用用户语言回复。不要在回复中混用其他语言。
2. **方案命名**：严格使用 \`### 方案 A: [标题]\` 格式。不要变体。
3. **对比表格**：所有方案之后，包含 markdown 表格进行对比。表格前后留空行。
4. **强制约束标签**：将佩戴性约束标签附加到每个设计描述中。
5. **设计师归属**：指名具体设计师并解释**为什么**他们的 DNA 契合。不要只列设计师名字而不说明理由。
6. **佩戴性数据**：每个方案必须包含估算重量和舒适佩戴时长。
7. **自我修正**：如果方案描述听起来太厚重，在呈现之前先修正。

### 禁止行为
- 不要在一次回复中生成超过 3 个方案。
- 不要跳过对比表格。
- 不要使用"美丽的项链"这类泛泛描述而没有结构细节。
- 不要在完成咨询前呈现方案（除非用户明确要求跳过）。
- 不要在中文回复中夹杂英文约束标签——翻译该标签。`;

export function buildContract(lang: PromptLanguage): string {
  const template = lang === 'zh' ? CONTRACT_ZH : CONTRACT_EN;
  return template;
}
