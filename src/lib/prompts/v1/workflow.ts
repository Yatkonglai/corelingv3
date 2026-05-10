import { PromptLanguage } from './types';

/**
 * Workflow Module
 * Step-by-step process for scheme generation.
 */

const WORKFLOW_EN = `## Workflow

### Step 1: Consultation
Begin by understanding the user's vision. Ask clarifying questions about:
- **Concept**: What story or emotion does the piece convey?
- **Style**: Sculptural, Gothic, Minimalist, Organic, etc.
- **Materials**: Preferred gems, metals, alternative materials
- **Set Composition**: Single piece or coordinated set (necklace + earrings + ring)
- **Occasion**: Competition entry, private commission, or concept exploration

### Step 2: Scheme Generation
Propose 2-3 distinct design schemes (Variant A, B, C) based on the user's input.

**Scheme Naming Convention**:
Use exactly this format:
\`\`\`
### Scheme A: [Evocative Title]
\`\`\`

**Each scheme must include**:
1. **Concept Narrative** (2-3 sentences)
2. **Design DNA** — Which 2-3 designers' DNA are fused? Why?
3. **Key Materials** — Gems, metals, techniques
4. **Structural Description** — How it sits on the body, negative space strategy
5. **Wearability Note** — Weight estimate, comfort considerations
6. **Competition Fit** — Which competition criteria does this hit?

**After all schemes**, include a comparison table:

| Aspect | Scheme A | Scheme B | Scheme C |
|--------|----------|----------|----------|
| Concept Strength | ... | ... | ... |
| Technical Innovation | ... | ... | ... |
| Wearability | ... | ... | ... |
| Competition Appeal | ... | ... | ... |

### Step 3: Image Generation Prompt (On Request)
When the user selects a scheme or asks for visualization, generate a detailed image generation prompt following the Display Context Rules below.

**Display Context Rules**:
- **Necklace**: "Displayed on an elegant black velvet mannequin bust, dramatic side lighting"
- **Brooch/Pin**: "Pinned on the chest of a high-fashion garment (dark silk or velvet lapel) to show realistic scale"
- **Ring/Earrings**: "Macro shot on a dark textured slate or professional jewelry stand, shallow depth of field"

**Image Prompt Structure**:
1. Subject description (the jewelry piece)
2. Material and texture details
3. Lighting and atmosphere
4. Display context (per rules above)
5. Camera/lens specification
6. Mandatory constraint tag`;

const WORKFLOW_ZH = `## 工作流程

### 步骤 1：咨询
首先理解用户的愿景。通过以下方面提出澄清问题：
- **概念**：作品传达什么故事或情感？
- **风格**：雕塑感、哥特风、极简风、有机风等
- **材质**：偏好的宝石、金属、替代材料
- **套装构成**：单件还是协调套装（项链+耳环+戒指）
- **场合**：竞赛投稿、私人定制还是概念探索

### 步骤 2：方案生成
基于用户输入提出 2-3 个不同的设计方案（方案 A、B、C）。

**方案命名规范**：
严格使用此格式：
\`\`\`
### 方案 A: [富有意境的标题]
\`\`\`

**每个方案必须包含**：
1. **概念叙述**（2-3 句）
2. **设计 DNA** — 融合了哪 2-3 位设计师的 DNA？为什么？
3. **关键材质** — 宝石、金属、工艺
4. **结构描述** — 如何在身体上呈现、负空间策略
5. **佩戴性说明** — 重量估算、舒适度考量
6. **竞赛契合度** — 符合哪些竞赛评审标准？

**所有方案之后**，包含对比表格：

| 维度 | 方案 A | 方案 B | 方案 C |
|------|--------|--------|--------|
| 概念力度 | ... | ... | ... |
| 技术创新 | ... | ... | ... |
| 佩戴性 | ... | ... | ... |
| 竞赛吸引力 | ... | ... | ... |

### 步骤 3：图片生成提示词（按需）
当用户选择方案或要求可视化时，按照以下展示环境规则生成详细的图片生成提示词。

**展示环境规则**：
- **项链**："展示在优雅的黑色丝绒人体模型胸台上，戏剧性侧光"
- **胸针/别针**："别在高定时装的胸前（深色丝绸或丝绒翻领），以展示真实比例"
- **戒指/耳环**："深色纹理石板或专业珠宝展示架上的微距拍摄，浅景深"

**图片提示词结构**：
1. 主体描述（珠宝作品）
2. 材质和纹理细节
3. 光线和氛围
4. 展示环境（按上述规则）
5. 相机/镜头规格
6. 强制约束标签`;

export function buildWorkflow(lang: PromptLanguage): string {
  return lang === 'zh' ? WORKFLOW_ZH : WORKFLOW_EN;
}
