import { FewShotExample, PromptLanguage } from './types';

/**
 * Few-Shot Examples Module
 * Concrete input/output pairs to stabilize AI behavior.
 * Separate examples for EN and ZH to match user's language.
 */

const EXAMPLES_EN: FewShotExample[] = [
  {
    id: 'consultation-1',
    input: 'I want a necklace inspired by metamorphosis',
    output: `What a powerful concept. Metamorphosis offers rich visual language. To shape the best scheme for you, could you clarify:

- **Style direction**: Are you drawn to the dramatic rupture of a cocoon breaking (more sculptural/gothic), or the delicate emergence of wings (more ethereal/minimalist)?
- **Material preference**: Do you envision colored gemstones (emeralds, sapphires) or monochromatic (diamonds, pearls, titanium)?
- **Body placement**: A statement collar, a flowing lariat, or an asymmetrical pendant?`,
    rationale: 'The model asks clarifying questions instead of jumping to schemes, showing proper Step 1 consultation.',
  },
  {
    id: 'scheme-generation-1',
    input: 'A thorn-themed necklace in platinum with rubies, dark romantic style',
    output: `### Scheme A: Crown of Thorns

**Concept Narrative**: Drawing from Shaun Leane's dark romanticism and Alexander McQueen collaborations, this piece reimagines the crown of thorns as a wearable collar. Platinum vines twist around the neck with surgical precision, each thorn tipped with a blood-drop ruby. The tension between suffering and beauty creates an unforgettable competition piece.

**Design DNA**: Shaun Leane (thorn morphology, dark beauty) + JAR (pavé gradient, color bleeding) + Hemmerle (raw metal tension)

**Key Materials**: Platinum (body), Burmese rubies (1.5-3mm pavé on thorn tips), black rhodium accents

**Structural Description**: Asymmetrical open collar. Vines taper from 2mm at the base to 0.3mm at thorn tips. 60% negative space. Back closure is an extension of the vine motif, invisible when worn.

**Wearability Note**: Estimated 85g. Weight distributed across collar points. Inner surface polished smooth. Suitable for 4+ hour wear.

**Competition Fit**: Strong for GIT (narrative strength) and Couture (craftsmanship showcase). The religious symbolism may polarize AGTA Spectrum judges.

---

### Scheme B: Rose Briar Lariat

**Concept Narrative**: A lariat that tells the story of love's duality — the rose and the thorn inseparable. Platinum chain threads through organic briar forms, with a single rose bloom at the drop and thorn clusters at the clasp. More wearable than Scheme A while maintaining dark romantic DNA.

**Design DNA**: Wallace Chan (Zen organic flow) + Cindy Chao (360-degree naturalism) + Shaun Leane (thorn detail)

**Key Materials**: Platinum (chain and structure), Mozambique rubies (rose petals, 3-5mm), diamond dewdrops (0.5mm micro-pavé)

**Structural Description**: Lariat drop length 28cm. Rose bloom is 4cm diameter, fully three-dimensional. Briar thorns are delicate 0.5mm wire. 55% negative space.

**Wearability Note**: Estimated 65g. Lariat form allows adjustment. Rose rests at sternum. Suitable for 6+ hour wear.

**Competition Fit**: Strong across all competitions. The wearable-art positioning hits Saul Bell's sweet spot. Rose motif is universally appealing.

---

| Aspect | Scheme A: Crown of Thorns | Scheme B: Rose Briar Lariat |
|--------|---------------------------|------------------------------|
| Concept Strength | Very high (iconic symbol) | High (accessible narrative) |
| Technical Innovation | High (tension structure) | Medium (classic lariat) |
| Wearability | Medium (statement piece) | High (adjustable, lighter) |
| Competition Appeal | Niche (polarizing) | Broad (universal appeal) |

*Both designs include the mandatory constraint tag: "Designed for elegant wearability. Lightweight fine jewelry structure with high negative space ratio, delicate metalwork, balanced weight distribution, and proportions suitable for actual luxury production."*`,
    rationale: 'Shows proper scheme structure: named sections, DNA attribution, wearability data, comparison table, and mandatory constraint tag.',
  },
  {
    id: 'image-prompt-1',
    input: 'Generate Scheme A',
    output: `**Image Generation Prompt for Scheme A: Crown of Thorns**

Platinum vine collar necklace with blood-drop ruby pavé thorn tips, Shaun Leane-inspired dark romanticism. Asymmetrical open collar, platinum vines tapering from 2mm to 0.3mm, each thorn tipped with 1.5-3mm Burmese rubies in gradient pavé. Black rhodium accents on thorn bases. 60% negative space, filigree and open-work structure. Displayed on an elegant black velvet mannequin bust, dramatic Rembrandt side lighting from the left, deep shadows. Macro photography, 8k resolution, cinematic depth of field, Leica S3 medium format, 120mm macro lens. Platinum surface shows subtle hammered texture. Designed for elegant wearability. Lightweight fine jewelry structure with high negative space ratio, delicate metalwork, balanced weight distribution, and proportions suitable for actual luxury production.`,
    rationale: 'Shows proper image prompt structure with all required elements and the mandatory constraint tag.',
  },
];

const EXAMPLES_ZH: FewShotExample[] = [
  {
    id: 'consultation-zh-1',
    input: '我想要一个以蜕变为主题的项链',
    output: `这是一个非常有力量的概念。蜕变提供了丰富的视觉语言。为了为您塑造最佳方案，能否澄清几个问题：

- **风格方向**：您更被茧破裂的戏剧性张力吸引（更偏雕塑感/哥特风），还是翅膀展开的轻盈 emergence（更偏空灵/极简风）？
- **材质偏好**：您设想的是彩色宝石（祖母绿、蓝宝石）还是单色（钻石、珍珠、钛金属）？
- **身体位置**：宣言式领圈、流动的 lariat 项链，还是不对称吊坠？`,
    rationale: '模型先提出澄清问题而非直接跳到方案，展示了正确的步骤 1 咨询流程。',
  },
  {
    id: 'scheme-generation-zh-1',
    input: '一款以荆棘为主题的铂金红宝石项链，暗黑浪漫风格',
    output: `### 方案 A: 荆棘之冠

**概念叙述**：从 Shaun Leane 的暗黑浪漫主义和与 Alexander McQueen 的合作中汲取灵感，这件作品将荆棘之冠重新构想为可穿戴的领圈。铂金藤蔓以手术般的精确度缠绕颈部，每个荆棘尖端点缀着血滴般的红宝石。痛苦与美丽之间的张力创造了一个令人难忘的竞赛作品。

**设计 DNA**：Shaun Leane（荆棘形态、暗黑美学）+ JAR（密镶渐变、色彩 bleeding）+ Hemmerle（原始金属张力）

**关键材质**：铂金（主体）、缅甸红宝石（荆棘尖端 1.5-3mm 密镶）、黑色铑金点缀

**结构描述**：不对称开放式领圈。藤蔓从底部的 2mm 渐变到荆棘尖端的 0.3mm。60% 负空间。背部扣合是藤蔓主题的延伸，佩戴时不可见。

**佩戴性说明**：估算 85g。重量分布在领圈各点。内侧表面抛光光滑。适合 4 小时以上佩戴。

**竞赛契合度**：GIT（叙事力度强）和 Couture（工艺展示）表现强劲。宗教象征意义可能让 AGTA Spectrum 评委产生分歧。

---

### 方案 B: 玫瑰荆棘 Lariat

**概念叙述**：一条讲述爱之双重性的 lariat 项链——玫瑰与荆棘不可分割。铂金链条穿过有机荆棘形态，下垂处有一朵单独的玫瑰花绽放，扣合处有荆棘簇。比方案 A 更可穿戴，同时保持暗黑浪漫 DNA。

**设计 DNA**：Wallace Chan（禅意有机流动）+ Cindy Chao（360 度自然主义）+ Shaun Leane（荆棘细节）

**关键材质**：铂金（链条和结构）、莫桑比克红宝石（玫瑰花瓣，3-5mm）、钻石露珠（0.5mm 微镶）

**结构描述**：Lariat 下垂长度 28cm。玫瑰花直径 4cm，完全立体。荆棘为精致的 0.5mm 金属线。55% 负空间。

**佩戴性说明**：估算 65g。Lariat 形式允许调节。玫瑰位于胸骨处。适合 6 小时以上佩戴。

**竞赛契合度**：在所有竞赛中表现强劲。可穿戴艺术定位击中 Saul Bell 的甜蜜点。玫瑰主题具有普遍吸引力。

---

| 维度 | 方案 A: 荆棘之冠 | 方案 B: 玫瑰荆棘 Lariat |
|------|------------------|-------------------------|
| 概念力度 | 极高（标志性符号） | 高（易懂的叙事） |
| 技术创新 | 高（张力结构） | 中（经典 lariat） |
| 佩戴性 | 中（宣言式作品） | 高（可调节、更轻） |
| 竞赛吸引力 | 小众（两极化） | 广泛（普遍吸引力） |

*两个设计均包含强制约束标签："为优雅佩戴而设计。轻盈的高级珠宝结构，高负空间比例，精致金属工艺，平衡的重量分布，适合实际奢侈品生产的比例。"*`,
    rationale: '展示了正确的方案结构：命名章节、DNA 归属、佩戴性数据、对比表格和强制约束标签。',
  },
  {
    id: 'image-prompt-zh-1',
    input: '生成方案 A',
    output: `**方案 A: 荆棘之冠 的图片生成提示词**

铂金藤蔓领圈项链，血滴红宝石密镶荆棘尖端，Shaun Leane 风格的暗黑浪漫主义。不对称开放式领圈，铂金藤蔓从 2mm 渐变到 0.3mm，每个荆棘尖端点缀 1.5-3mm 缅甸红宝石渐变密镶。荆棘基部黑色铑金点缀。60% 负空间，掐丝和镂空结构。展示在优雅的黑色丝绒人体模型胸台上，左侧戏剧性伦勃朗侧光，深邃阴影。微距摄影，8k 分辨率，电影级景深，Leica S3 中画幅，120mm 微距镜头。铂金表面呈现微妙的锤打纹理。为优雅佩戴而设计。轻盈的高级珠宝结构，高负空间比例，精致金属工艺，平衡的重量分布，适合实际奢侈品生产的比例。`,
    rationale: '展示了正确的图片提示词结构，包含所有必需元素和强制约束标签。',
  },
];

export function buildExamples(lang: PromptLanguage): string {
  const examples = lang === 'zh' ? EXAMPLES_ZH : EXAMPLES_EN;

  const formatted = examples.map((ex) => {
    return `### Example: ${ex.id}

**User Input**:
${ex.input}

**Expected Output**:
${ex.output}

**Rationale**: ${ex.rationale}`;
  }).join('\n\n---\n\n');

  return `## Few-Shot Examples

Follow the patterns demonstrated below. Match the user's language (${lang === 'zh' ? 'Chinese' : 'English'}).

${formatted}`;
}
