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

**Each scheme must include** (in this order — structure before gemstones):
1. **Concept Narrative** (2-3 sentences)
2. **Design DNA** — Which 2-3 designers' DNA are fused? Why?
3. **Structural Description** — The metal framework, silhouette, negative space strategy, line weights
4. **Key Materials** — Gems (with specific ct limits), metals, techniques
5. **Wearability Note** — Weight estimate, comfort considerations, balance
6. **Competition Fit** — Which competition criteria does this hit?

**CRITICAL: Before presenting each scheme, run this self-check:**
- [ ] Does the metal structure read as the protagonist? (Not the gemstone)
- [ ] Is negative space ≥50%?
- [ ] Is the center stone ≤25% of visual weight?
- [ ] Are all dimensions within wearable limits?
- [ ] Would this piece look plausible in a real auction catalog?

**After all schemes**, include a comparison table:

| Aspect | Scheme A | Scheme B | Scheme C |
|--------|----------|----------|----------|
| Concept Strength | ... | ... | ... |
| Technical Innovation | ... | ... | ... |
| Wearability | ... | ... | ... |
| Competition Appeal | ... | ... | ... |

### Step 3: Image Generation Prompt (On Request)
When the user selects a scheme or asks for visualization, generate a detailed image generation prompt.

**Display Context Rules**:
- **Necklace**: "Displayed on an elegant black velvet mannequin bust, natural side lighting"
- **Brooch/Pin**: "Pinned on the chest of a high-fashion garment (dark silk or velvet lapel) to show realistic scale"
- **Ring/Earrings**: "Macro shot on a dark textured slate or professional jewelry stand, shallow depth of field"

**Image Prompt Structure**:
1. Subject description (the jewelry piece — describe metal structure FIRST)
2. Material and texture details (realistic finishes, not CGI-perfect)
3. Lighting and atmosphere (natural, not cinematic/hyper-polished)
4. Display context (per rules above)
5. Mandatory constraint tag`;

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

**每个方案必须包含**（按此顺序——先结构后宝石）：
1. **概念叙述**（2-3 句）
2. **设计 DNA** — 融合了哪 2-3 位设计师的 DNA？为什么？
3. **结构描述** — 金属框架、轮廓、负空间策略、线条粗细
4. **关键材质** — 宝石（带具体ct限制）、金属、工艺
5. **佩戴性说明** — 重量估算、舒适度考量、平衡性
6. **竞赛契合度** — 符合哪些竞赛评审标准？

**关键：在呈现每个方案前，运行此自检：**
- [ ] 金属结构是否呈现为主角？（而非宝石）
- [ ] 负空间是否≥50%？
- [ ] 主石是否≤视觉重量的25%？
- [ ] 所有尺寸是否在佩戴限制内？
- [ ] 这件作品在真实拍卖目录中是否看起来合理？

**所有方案之后**，包含对比表格：

| 维度 | 方案 A | 方案 B | 方案 C |
|------|--------|--------|--------|
| 概念力度 | ... | ... | ... |
| 技术创新 | ... | ... | ... |
| 佩戴性 | ... | ... | ... |
| 竞赛吸引力 | ... | ... | ... |

### 步骤 3：图片生成提示词（按需）
当用户选择方案或要求可视化时，生成详细的图片生成提示词。

**展示环境规则**：
- **项链**："展示在优雅的黑色丝绒人体模型胸台上，自然侧光"
- **胸针/别针**："别在高定时装的胸前（深色丝绸或丝绒翻领），以展示真实比例"
- **戒指/耳环**："深色纹理石板或专业珠宝展示架上的微距拍摄，浅景深"

**图片提示词结构**：
1. 主体描述（珠宝作品——先描述金属结构）
2. 材质和纹理细节（真实质感，非CGI完美）
3. 光线和氛围（自然，非电影级/过度抛光）
4. 展示环境（按上述规则）
5. 强制约束标签`;

export function buildWorkflow(lang: PromptLanguage): string {
  return lang === 'zh' ? WORKFLOW_ZH : WORKFLOW_EN;
}
