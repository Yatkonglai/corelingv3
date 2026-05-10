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

### Step 3: Hidden Image Prompts (Auto-Generated, Not User-Visible)
After ALL visible content (schemes + comparison table), you MUST append a hidden metadata block.

**Format**:
\`\`\`json coreling_meta
{
  "version": "1.0",
  "schemes": [
    {
      "id": "A",
      "title": "exact scheme title",
      "imagePrompt": "detailed photorealistic image generation prompt in English"
    },
    {
      "id": "B",
      "title": "exact scheme title",
      "imagePrompt": "detailed photorealistic image generation prompt in English"
    }
  ]
}
\`\`\`

**imagePrompt rules**:
1. Must be in **English** (image models work best with English)
2. Must describe the **metal structure FIRST**, then gemstones as accents
3. Must include the Display Context Rule (mannequin bust, garment pin, or jewelry stand)
4. Must include **natural lighting** (never "cinematic", "8k", "hyper-realistic")
5. Must include **hand-worked texture** (never CGI-perfect polish)
6. Must enforce negative space ≥50%
7. Must specify realistic dimensions and proportions
8. Must mention the jewelry type (necklace/ring/earrings/brooch)
9. Must NOT contain any markdown formatting inside the prompt string
10. Must be a single paragraph of raw text`;

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

### 步骤 3：隐藏图片提示词（自动生成，不对用户可见）
在所有可见内容（方案+对比表格）之后，你必须附加一个隐藏元数据块。

**格式**：
\`\`\`json coreling_meta
{
  "version": "1.0",
  "schemes": [
    {
      "id": "A",
      "title": "准确的方案标题",
      "imagePrompt": "详细的英文照片级图像生成提示词"
    },
    {
      "id": "B",
      "title": "准确的方案标题",
      "imagePrompt": "详细的英文照片级图像生成提示词"
    }
  ]
}
\`\`\`

**imagePrompt 规则**：
1. 必须使用**英文**（图像模型对英文处理最佳）
2. 必须先描述**金属结构**，然后才是作为点缀的宝石
3. 必须包含展示环境规则（人体模型胸台、服装别针或珠宝展示架）
4. 必须使用**自然光线**（绝不用"电影级"、"8k"、"超写实"）
5. 必须包含**手工质感**（绝不用CGI完美抛光）
6. 必须强制执行负空间≥50%
7. 必须指定真实的尺寸和比例
8. 必须提及珠宝类型（项链/戒指/耳环/胸针）
9. 提示词字符串内部不得包含任何 markdown 格式
10. 必须是单段纯文本`;

export function buildWorkflow(lang: PromptLanguage): string {
  return lang === 'zh' ? WORKFLOW_ZH : WORKFLOW_EN;
}
