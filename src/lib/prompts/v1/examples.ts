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

**Concept Narrative**: Drawing from Shaun Leane's dark romanticism, this piece reimagines the crown of thorns as a wearable collar. The tension between suffering and beauty creates an unforgettable competition piece.

**Design DNA**: Shaun Leane (thorn morphology, dark beauty) + Hemmerle (raw metal tension, anti-brilliance) + Suzanne Belperron (soft geometry, understated power)

**Structural Description**: Asymmetrical open collar in platinum. Vine structures taper from 2mm at base to 0.4mm at thorn tips. 55% negative space. Thorns are delicate wire elements (0.6mm) extending from the main vine. Back closure integrates into the vine motif, invisible when worn. Total spread: 7cm.

**Key Materials**: Platinum (structural vines), Burmese rubies (0.8-1.2mm pavé scattered along thorn tips — approximately 40 small stones, no single stone dominant), black rhodium accents on select thorn bases

**Wearability Note**: Estimated 55g. Weight distributed across 5 collar anchor points. Inner surface hand-polished smooth. Suitable for 4+ hour wear. The open collar allows natural neck movement.

**Competition Fit**: Strong for GIT (narrative strength) and Couture (craftsmanship showcase). The religious symbolism may polarize AGTA Spectrum judges.

---

### Scheme B: Rose Briar Lariat

**Concept Narrative**: A lariat that tells the story of love's duality — the rose and the thorn inseparable. Platinum chain threads through organic briar forms, with a scattered ruby dewdrop motif. More wearable than Scheme A while maintaining dark romantic DNA.

**Design DNA**: Wallace Chan (Zen organic flow) + Cindy Chao (360-degree naturalism) + Shaun Leane (thorn detail as accent)

**Structural Description**: Lariat drop length 24cm. Briar thorns are 0.5mm delicate wire clusters. Chain is 1.2mm platinum cable with organic texture. Ruby dewdrops (0.5-0.8mm) are scattered like morning dew, never clustered. 60% negative space. The clasp is a small thorn cluster that becomes a design element.

**Key Materials**: Platinum (chain and structure), Mozambique rubies (0.5-0.8mm scattered dewdrops, ~25 stones total), diamond micro-accents (0.2mm, ~10 stones)

**Wearability Note**: Estimated 42g. Lariat form allows length adjustment. Thorns point outward, away from skin. Suitable for 6+ hour wear.

**Competition Fit**: Strong across all competitions. The wearable-art positioning hits Saul Bell's sweet spot. Rose motif is universally appealing.

---

| Aspect | Scheme A: Crown of Thorns | Scheme B: Rose Briar Lariat |
|--------|---------------------------|------------------------------|
| Concept Strength | Very high (iconic symbol) | High (accessible narrative) |
| Technical Innovation | High (tension wire structure) | Medium (classic lariat with texture) |
| Wearability | Medium (statement collar) | High (adjustable, lighter) |
| Competition Appeal | Niche (polarizing) | Broad (universal appeal) |

*Both designs include the mandatory constraint tag: "Designed for elegant wearability. Lightweight fine jewelry structure with ≥50% negative space ratio, delicate metalwork (0.5-3mm line weights), balanced weight distribution, and proportions suitable for actual luxury production. Gemstones are accents integrated into the metal structure, never dominant."*`,
    rationale: 'Shows proper scheme structure: named sections, DNA attribution with restraint-focused designers, structural description BEFORE materials, small scattered stones (not large center stones), wearability data, comparison table, and mandatory constraint tag.',
  },
  {
    id: 'image-prompt-1',
    input: 'Generate Scheme A',
    output: `**Image Generation Prompt for Scheme A: Crown of Thorns**

Platinum vine collar necklace with scattered ruby pavé thorn tips, Shaun Leane-inspired dark romanticism. Asymmetrical open collar, platinum vines tapering from 2mm to 0.4mm, delicate thorns as 0.6mm wire extensions. Rubies are tiny 0.8-1.2mm scattered pavé accents, approximately 40 small stones — no dominant center stone. Black rhodium accents on select thorn bases. 55% negative space, filigree and open-work structure. Metal shows hand-forged texture with subtle hammer marks. Displayed on an elegant black velvet mannequin bust, natural side lighting from the left, soft shadows. Platinum surface shows authentic hand-worked texture with slight variations. Designed for elegant wearability. Lightweight fine jewelry structure with ≥50% negative space ratio, delicate metalwork, balanced weight distribution, and proportions suitable for actual luxury production.`,
    rationale: 'Shows proper image prompt: metal structure described first, small scattered stones (no dominant gem), natural lighting (not cinematic), hand-worked texture (not CGI-perfect), and mandatory constraint tag.',
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

**概念叙述**：从 Shaun Leane 的暗黑浪漫主义中汲取灵感，这件作品将荆棘之冠重新构想为可穿戴的领圈。痛苦与美丽之间的张力创造了一个令人难忘的竞赛作品。

**设计 DNA**：Shaun Leane（荆棘形态、暗黑美学）+ Hemmerle（原始金属张力、反璀璨）+ Suzanne Belperron（柔和几何、克制的力量）

**结构描述**：铂金不对称开放式领圈。藤蔓结构从底部2mm渐变到荆棘尖端0.4mm。55%负空间。荆棘是0.6mm的精致金属线延伸。背部扣合融入藤蔓主题，佩戴时不可见。总展开宽度：7cm。

**关键材质**：铂金（结构藤蔓），缅甸红宝石（0.8-1.2mm散点密镶于荆棘尖端——约40颗小石，无单颗主导石），黑色铑金点缀于精选荆棘基部

**佩戴性说明**：估算55g。重量分布在5个领圈锚点。内侧表面手工抛光光滑。适合4小时以上佩戴。开放式领圈允许颈部自然活动。

**竞赛契合度**：GIT（叙事力度强）和 Couture（工艺展示）表现强劲。宗教象征意义可能让 AGTA Spectrum 评委产生分歧。

---

### 方案 B: 玫瑰荆棘 Lariat

**概念叙述**：一条讲述爱之双重性的 lariat 项链——玫瑰与荆棘不可分割。铂金链条穿过有机荆棘形态，点缀散落的红宝石露珠。比方案 A 更可穿戴，同时保持暗黑浪漫 DNA。

**设计 DNA**：Wallace Chan（禅意有机流动）+ Cindy Chao（360 度自然主义）+ Shaun Leane（荆棘细节作为点缀）

**结构描述**：Lariat 下垂长度24cm。荆棘为0.5mm精致金属线簇。链条为1.2mm有机纹理铂金索链。红宝石露珠（0.5-0.8mm）如晨露般散落，从不聚集。60%负空间。扣合处是小荆棘簇，成为设计元素。

**关键材质**：铂金（链条和结构），莫桑比克红宝石（0.5-0.8mm散落露珠，约25颗），钻石微点缀（0.2mm，约10颗）

**佩戴性说明**：估算42g。Lariat 形式允许长度调节。荆棘朝外，远离肌肤。适合6小时以上佩戴。

**竞赛契合度**：在所有竞赛中表现强劲。可穿戴艺术定位击中 Saul Bell 的甜蜜点。玫瑰主题具有普遍吸引力。

---

| 维度 | 方案 A: 荆棘之冠 | 方案 B: 玫瑰荆棘 Lariat |
|------|------------------|-------------------------|
| 概念力度 | 极高（标志性符号） | 高（易懂的叙事） |
| 技术创新 | 高（张力金属线结构） | 中（经典lariat带纹理） |
| 佩戴性 | 中（宣言式作品） | 高（可调节、更轻） |
| 竞赛吸引力 | 小众（两极化） | 广泛（普遍吸引力） |

*两个设计均包含强制约束标签："为优雅佩戴而设计。轻盈的高级珠宝结构，≥50%负空间比例，精致金属工艺（0.5-3mm线条粗细），平衡的重量分布，适合实际奢侈品生产的比例。宝石是融入金属结构的点缀，绝不主导。"*`,
    rationale: '展示了正确的方案结构：命名章节、克制感设计师DNA归属、先结构后材质、散点小宝石（非大颗主石）、佩戴性数据、对比表格和强制约束标签。',
  },
  {
    id: 'image-prompt-zh-1',
    input: '生成方案 A',
    output: `**方案 A: 荆棘之冠 的图片生成提示词**

铂金藤蔓领圈项链，散落的红宝石密镶荆棘尖端，Shaun Leane 风格的暗黑浪漫主义。不对称开放式领圈，铂金藤蔓从2mm渐变到0.4mm，精致的0.6mm金属线延伸作为荆棘。红宝石是微小的0.8-1.2mm散点密镶点缀，约40颗小石——无主导中心石。荆棘基部黑色铑金点缀。55%负空间，掐丝和镂空结构。金属呈现手工锻造纹理，带有微妙的锤痕。展示在优雅的黑色丝绒人体模型胸台上，左侧自然侧光，柔和阴影。铂金表面呈现真实手工纹理，带有轻微变化。为优雅佩戴而设计。轻盈的高级珠宝结构，≥50%负空间比例，精致金属工艺，平衡的重量分布，适合实际奢侈品生产的比例。`,
    rationale: '展示了正确的图片提示词：先描述金属结构、散点小宝石（无主导宝石）、自然光线（非电影级）、手工纹理（非CGI完美）、强制约束标签。',
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
