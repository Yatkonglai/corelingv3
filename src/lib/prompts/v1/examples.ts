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

## Wearability Profile

### Core Layer (mandatory)

1. **Type-Specific Stability Assessment**
   - Value: Medium stability — open collar with 5 anchor points distributes weight; forward tilt risk mitigated by symmetric placement.
   - Confidence: high
   - Source: rule-engine
   - Rationale: Explicit 5 anchor points; 7cm spread within necklace ≤8cm limit; tapering vines 2mm→0.4mm.

2. **Wear Burden Level**
   - Value: Medium
   - Confidence: high
   - Source: rule-engine
   - Rationale: Platinum structure + scattered rubies; multi-point distribution reduces pressure.

3. **Recommended Scenarios**
   - Value: Evening / Red Carpet
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: Striking collar presence; religious symbolism suits formal contexts.

4. **Presence Level**
   - Value: Striking
   - Confidence: high
   - Source: LLM-inference
   - Rationale: 7cm spread + asymmetric thorns + dark rhodium contrast.

### Extended Layer

5. **Clothing Compatibility**
   - Value: Requires structured neckline; fine chains may tangle with wire thorns.
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: 0.6mm wire thorns extend outward from collar structure.

6. **Maintenance Sensitivity**
   - Value: Black rhodium accents will wear with friction; annual re-plating recommended.
   - Confidence: medium
   - Source: rule-engine
   - Rationale: Surface plating degrades with skin contact and abrasion.

### Annotated Layer

7. **Estimated Weight Range**
   - Value: 45–60g
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: Platinum vines + 40 small rubies
   - **Label: ESTIMATE — actual weight requires CAD or physical prototype**

8. **Estimated Dimension Range**
   - Value: 6.5–7.5cm spread
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: Described as 7cm collar with asymmetric extension
   - **Label: ESTIMATE — actual dimensions require CAD or physical measurement**

### Highlight Layer

9. **Dynamic Noise Risk**
   - Value: Silent
   - Confidence: high
   - Source: rule-engine
   - Rationale: Solid platinum structure with fixed pavé; no loose elements.

10. **Thermal-Tactile Resonance**
    - Value: Platinum cools on initial contact, warming to body temperature within 30 seconds. Polished inner rails feel smooth.
    - Confidence: low (design inference)
    - Source: design-intent
    - Rationale: Platinum thermal conductivity + hand-polished inner surface.

**Competition Fit**: Strong for GIT (narrative strength) and Couture (craftsmanship showcase). The religious symbolism may polarize AGTA Spectrum judges.

---

### Scheme B: Rose Briar Lariat

**Concept Narrative**: A lariat that tells the story of love's duality — the rose and the thorn inseparable. Platinum chain threads through organic briar forms, with a scattered ruby dewdrop motif. More wearable than Scheme A while maintaining dark romantic DNA.

**Design DNA**: Wallace Chan (Zen organic flow) + Cindy Chao (360-degree naturalism) + Shaun Leane (thorn detail as accent)

**Structural Description**: Lariat drop length 24cm. Briar thorns are 0.5mm delicate wire clusters. Chain is 1.2mm platinum cable with organic texture. Ruby dewdrops (0.5-0.8mm) are scattered like morning dew, never clustered. 60% negative space. The clasp is a small thorn cluster that becomes a design element.

**Key Materials**: Platinum (chain and structure), Mozambique rubies (0.5-0.8mm scattered dewdrops, ~25 stones total), diamond micro-accents (0.2mm, ~10 stones)

## Wearability Profile

### Core Layer (mandatory)

1. **Type-Specific Stability Assessment**
   - Value: High stability — lariat form self-adjusts to body; thorns point outward eliminating skin contact risk.
   - Confidence: high
   - Source: rule-engine
   - Rationale: Lariat drop 24cm with adjustable length; thorns explicitly point away from skin; chain is flexible cable.

2. **Wear Burden Level**
   - Value: Light
   - Confidence: high
   - Source: rule-engine
   - Rationale: 35–48g estimated; chain distributes weight along neckline; no rigid collar pressure points.

3. **Recommended Scenarios**
   - Value: Daily / Evening
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: Adjustable lariat suits varied contexts; rose motif has universal appeal.

4. **Presence Level**
   - Value: Moderate
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: 24cm drop creates vertical line; scattered dewdrops add subtle sparkle without dominance.

### Extended Layer

5. **Visual Coverage & Proportion**
   - Value: 24cm vertical drop draws eye down neckline; proportionally elongates torso.
   - Confidence: high
   - Source: rule-engine
   - Rationale: Explicit 24cm drop length within lariat norms.

6. **Clothing Compatibility**
   - Value: Versatile — suits both high and low necklines; avoid delicate knit fabrics.
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: Chain weight may snag loose knit; smooth cable generally fabric-friendly.

### Annotated Layer

7. **Estimated Weight Range**
   - Value: 35–48g
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: Platinum cable chain + 25 rubies + 10 micro-diamonds
   - **Label: ESTIMATE — actual weight requires CAD or physical prototype**

8. **Estimated Dimension Range**
   - Value: 22–26cm drop length
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: Described as 24cm lariat with organic briar clusters
   - **Label: ESTIMATE — actual dimensions require CAD or physical measurement**

### Highlight Layer

9. **Kinetic-Spatial Feedback**
   - Value: Lariat sways gently with body movement; briar clusters at the terminal point create a soft pendulum rhythm (~1.2s period).
   - Confidence: low (design inference)
   - Source: design-intent
   - Rationale: 24cm drop + terminal cluster weight creates natural swing.

**Competition Fit**: Strong across all competitions. The wearable-art positioning hits Saul Bell's sweet spot. Rose motif is universally appealing.

---

| Aspect | Scheme A: Crown of Thorns | Scheme B: Rose Briar Lariat |
|--------|---------------------------|------------------------------|
| Concept Strength | Very high (iconic symbol) | High (accessible narrative) |
| Technical Innovation | High (tension wire structure) | Medium (classic lariat with texture) |
| Wearability | Medium (statement collar) | High (adjustable, lighter) |
| Competition Appeal | Niche (polarizing) | Broad (universal appeal) |

*Both designs include the mandatory constraint tag: "Designed for elegant wearability. Density follows the fused designer's archetype (Lace/Architectural/Tapestry/Monolithic), with realistic proportions suitable for actual luxury production. Gemstones are accents integrated into the metal structure, never dominant."*`,
    rationale: 'Shows proper scheme structure: named sections, DNA attribution with archetype awareness, structural description BEFORE materials, small scattered stones (not large center stones), wearability data, comparison table, and mandatory constraint tag.',
  },
  {
    id: 'image-prompt-1',
    input: 'Generate Scheme A',
    output: `**Image Generation Prompt for Scheme A: Crown of Thorns**

Platinum vine collar necklace with scattered ruby pavé thorn tips, Shaun Leane-inspired dark romanticism. Asymmetrical open collar, platinum vines tapering from 2mm to 0.4mm, delicate thorns as 0.6mm wire extensions. Rubies are tiny 0.8-1.2mm scattered pavé accents, approximately 40 small stones — no dominant center stone. Black rhodium accents on select thorn bases. 55% negative space, filigree and open-work structure. Metal shows hand-forged texture with subtle hammer marks. Displayed on an elegant black velvet mannequin bust, natural side lighting from the left, soft shadows. Platinum surface shows authentic hand-worked texture with slight variations. Designed for elegant wearability. Density follows the Architectural archetype, with realistic proportions suitable for actual luxury production.`,
    rationale: 'Shows proper image prompt: metal structure described first, small scattered stones (no dominant gem), natural lighting (not cinematic), hand-worked texture (not CGI-perfect), and mandatory constraint tag with archetype awareness.',
  },
  {
    id: 'scheme-generation-tapestry-1',
    input: 'A JAR-style brooch with intense color gradients',
    output: `### Scheme A: Crimson Cascade

**Concept Narrative**: A JAR-style brooch that reimagines a falling autumn leaf as a field of cascading ruby and sapphire micro-pavé. The piece shocks the eye with impossible color bleeding before seducing it with technical perfection.

**Design DNA**: JAR (painterly pavé, color bleeding, micro-pavé) + Verdura (cabochon clusters, tropical exuberance)
**Archetype**: Tapestry (5-15% negative space)

**Structural Description**: Solid platinum base brooch, 4.5cm x 3.5cm. The metal is almost entirely hidden beneath a seamless gradient of micro-pavé. The surface reads as a continuous field of color — deep crimson bleeding into burnt orange and gold. Negative space is minimal (~8%), appearing only at the very edges where the "leaf" tapers to fine points (0.3mm). The setting mechanics are invisible; the surface reads as a continuous field of color with no visible metal interruption.

**Key Materials**: Platinum (hidden structural base), Burmese rubies (0.8-1.2mm pavé, ~180 stones), Sri Lankan sapphires (0.8-1.2mm pavé, ~120 stones), diamond micro-accents (0.2mm, ~40 stones). No single stone exceeds 0.8mm — the design is about the FIELD, not individual gems.

## Wearability Profile

### Core Layer (mandatory)

1. **Type-Specific Stability Assessment**
   - Value: High stability — solid platinum base with double-clutch pin; flat profile minimizes rotation risk.
   - Confidence: high
   - Source: rule-engine
   - Rationale: Double-clutch pin explicitly described; 8mm max height within brooch limits; solid base prevents flex.

2. **Wear Burden Level**
   - Value: Medium
   - Confidence: high
   - Source: rule-engine
   - Rationale: Estimated 25–32g concentrated in 4.5x3.5cm area; flat profile distributes across fabric.

3. **Recommended Scenarios**
   - Value: Evening / Red Carpet
   - Confidence: high
   - Source: LLM-inference
   - Rationale: JAR-style dense pavé is statement piece; 8+ hour comfort supports gala wear.

4. **Presence Level**
   - Value: Striking
   - Confidence: high
   - Source: LLM-inference
   - Rationale: 4.5x3.5cm surface area with intense color gradient; ~8% negative space = maximal visual impact.

### Extended Layer

5. **Visual Coverage & Proportion**
   - Value: 4.5x3.5cm occupies significant lapel/chest zone; reads as a color field rather than discrete object.
   - Confidence: high
   - Source: rule-engine
   - Rationale: Dimensions explicitly stated; within brooch ≤6cm limit.

6. **Clothing Compatibility**
   - Value: Best on structured fabrics (wool, silk dupioni); avoid lightweight chiffon that may drape under weight.
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: 28g concentrated load requires fabric stiffness; flat profile helps but mass is significant.

7. **Maintenance Sensitivity**
   - Value: Micro-pavé requires professional cleaning; avoid ultrasonic which may loosen tiny stones.
   - Confidence: high
   - Source: rule-engine
   - Rationale: 300+ micro-stones (0.8mm) in invisible settings = high stone-loss risk if mishandled.

### Annotated Layer

8. **Estimated Weight Range**
   - Value: 25–32g
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: Solid platinum base + ~300 micro-pavé stones
   - **Label: ESTIMATE — actual weight requires CAD or physical prototype**

9. **Estimated Dimension Range**
   - Value: 4.0–5.0cm x 3.0–4.0cm
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: Described as 4.5cm x 3.5cm brooch with tapered edges
   - **Label: ESTIMATE — actual dimensions require CAD or physical measurement**

### Highlight Layer

10. **Thermal-Tactile Resonance**
    - Value: Platinum base remains cool against fabric; the dense pavé surface creates a smooth, glass-like thermal interface.
    - Confidence: low (design inference)
    - Source: design-intent
    - Rationale: Platinum thermal mass + continuous gem surface minimizes thermal variation.

**Competition Fit**: Exceptional for AGTA Spectrum (Gemstone Use 30% — the pavé gradient is a masterclass in color theory). Strong for Saul Bell (Technical Excellence 30% — invisible settings at this scale demand extraordinary craft).

---

| Aspect | Scheme A: Crimson Cascade |
|--------|---------------------------|
| Concept Strength | Very high (JAR color bleeding) |
| Technical Innovation | Very high (invisible micro-pavé gradient) |
| Wearability | High (flat profile, secure pin) |
| Competition Appeal | Broad (AGTA + Saul Bell) |
| Density Archetype | Tapestry (5-15% negative space) |

*This design includes the mandatory constraint tag: "Designed for elegant wearability. Density follows the Tapestry archetype with realistic proportions suitable for actual luxury production. Gemstones are accents integrated into the metal structure, never dominant."*`,
    rationale: 'Shows Tapestry archetype: JAR-style dense pavé with minimal negative space (~8%), hidden metal, surface-as-canvas philosophy. Demonstrates that negative space is NOT always high for master-level work.',
  },
  {
    id: 'scheme-generation-lace-1',
    input: 'A Mughal-inspired platinum necklace with diamond lattice, airy and imperial',
    output: `### Scheme A: Imperial Lattice

**Concept Narrative**: Reimagining Mughal jali screens as wearable architecture. Near-invisible platinum wire-work creates a tension-held diamond lattice where the gems define the silhouette, not the metal. The piece feels like it is held together by air.

**Design DNA**: Bhagat (Mughal jali, heritage techniques, calibrated stone alignment) + Michelle Ong (titanium lace, textile-to-metal articulation)
**Structural Lead**: Bhagat (lace archetype, 50-75% negative space)
**Aesthetic Contributor**: Michelle Ong (tactile fluidity, ruyi motifs)
**Archetype**: Lace (50-75% negative space)

**Structural Description**: Near-invisible 0.3mm platinum wire-work forms a skeletal lattice framework. Diamonds are tension-set at the intersection nodes, creating a "weightless" grid effect where tension settings are the only visible mechanics. The lattice spans 7cm across the collarbone, with calibrated stone alignment defining the overall silhouette — the metal is almost invisible. Negative space is ~65%. The framework uses mortise-and-tenon inspired joints at major nodes for structural integrity without bulk. Metal lines taper from 0.8mm at load-bearing nodes to 0.3mm at peripheral edges.

**Key Materials**: Platinum (near-invisible wire framework, 0.3-0.8mm), calibrated diamonds (0.5-1.0mm, ~80 stones tension-set at lattice nodes), no center stone — the FIELD of diamonds is the design. Imperial jade cabochon (8mm) as a single accent at the center node, held by tension.

## Wearability Profile

### Core Layer (mandatory)

1. **Type-Specific Stability Assessment**
   - Value: Medium stability — tension-held lattice at 0.3mm wire is delicate; mortise-and-tenon joints at load nodes provide structural redundancy.
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: 0.3mm wires are extremely fine; mortise joints described but not engineered; 7cm spread within limit.

2. **Wear Burden Level**
   - Value: Light
   - Confidence: high
   - Source: rule-engine
   - Rationale: Estimated 18–26g; open lattice eliminates solid metal mass; tension settings minimize additional weight.

3. **Recommended Scenarios**
   - Value: Evening / Red Carpet
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: Imperial jali narrative suits formal contexts; 4+ hour comfort supports event wear.

4. **Presence Level**
   - Value: Striking
   - Confidence: high
   - Source: LLM-inference
   - Rationale: 7cm collar spread with ~65% negative space creates dramatic silhouette; calibrated diamonds add brilliance.

### Extended Layer

5. **Visual Coverage & Proportion**
   - Value: 7cm collar span frames décolletage; near-invisible metal makes gems appear to float.
   - Confidence: high
   - Source: rule-engine
   - Rationale: Explicit 7cm spread; 65% negative space means visual boundary is gem-defined.

6. **Clothing Compatibility**
   - Value: Best with strapless or wide-neck garments; avoid high collars that compete for neckline space.
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: Collar piece needs exposed neck/chest to display full span.

7. **Maintenance Sensitivity**
   - Value: Extreme — 0.3mm wires vulnerable to impact; tension settings require specialist inspection.
   - Confidence: high
   - Source: rule-engine
   - Rationale: Sub-millimeter platinum wires fatigue under stress; tension settings can loosen with wear.

### Annotated Layer

8. **Estimated Weight Range**
   - Value: 18–26g
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: 0.3–0.8mm platinum wires + ~80 tension-set diamonds + single jade cabochon
   - **Label: ESTIMATE — actual weight requires CAD or physical prototype**

9. **Estimated Dimension Range**
   - Value: 6.5–7.5cm spread
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: Described as 7cm lattice spanning collarbone
   - **Label: ESTIMATE — actual dimensions require CAD or physical measurement**

### Highlight Layer

10. **Dynamic Noise Risk**
    - Value: Silent
    - Confidence: high
    - Source: rule-engine
    - Rationale: Fixed tension-set lattice; no dangling or articulated elements.

11. **Thermal Seasonal Bias**
    - Value: Platinum remains cool year-round; the open lattice allows air circulation, making it comfortable even in warm weather.
    - Confidence: low (design inference)
    - Source: design-intent
    - Rationale: Low thermal mass per contact point + 65% negative space = minimal heat retention.

**Competition Fit**: Strong for Couture (craftsmanship showcase — tension-setting at this scale demands extraordinary skill). Niche for AGTA Spectrum (no single large stone to showcase). The jali heritage narrative resonates with GIT judges.

---

| Aspect | Scheme A: Imperial Lattice |
|--------|----------------------------|
| Concept Strength | Very high (Mughal jali revival) |
| Technical Innovation | Very high (tension-held lattice at 0.3mm wire) |
| Wearability | Medium (delicate, requires care) |
| Competition Appeal | Niche (Couture-focused) |
| Density Archetype | Lace (50-75% negative space) |

*This design includes the mandatory constraint tag: "Designed for elegant wearability. Density follows the Lace archetype with realistic proportions suitable for actual luxury production. Gemstones are accents integrated into the metal structure, never dominant."*`,
    rationale: 'Shows Lace archetype: Bhagat-style structural lattice with 50-75% negative space. Near-invisible wire-work, tension-held gems, engineering-grade precision. Demonstrates that "lace" in high jewelry is structural engineering, not decorative filigree.',
  },
  {
    id: 'scheme-generation-monolithic-1',
    input: 'A brutalist gold ring with raw crystal',
    output: `### Scheme A: Forged Earth

**Concept Narrative**: Drawing from Andrew Grima's Brutalist gold philosophy, this ring lets the material speak for itself. A raw aquamarine crystal emerges from hand-hammered 18K gold like a geological formation — mass, texture, and raw beauty.

**Design DNA**: Andrew Grima (textured gold, raw crystals, Brutalist jewelry) + Hemmerle (raw metal surfaces, contrasting materials)
**Archetype**: Monolithic (0-10% negative space)

**Structural Description**: Solid 18K gold ring with a forged, hand-hammered surface. The band tapers from 8mm at the base to 12mm at the face — substantial but ergonomic. The gold surface shows intentional hammer marks, chased texture, and natural patina variations. A raw, uncut aquamarine crystal (approximately 1.5ct, naturally irregular shape) is set in a heavy bezel that becomes part of the sculptural form. Negative space is minimal (~5%) — the design is about MASS and TEXTURE, not delicacy. Metal thickness: 2.5-3mm structural.

**Key Materials**: 18K yellow gold (solid forged band, hand-hammered texture), raw aquamarine crystal (~1.5ct, uncut, natural inclusion visible), no additional gemstones — the raw crystal and the gold texture ARE the design.

## Wearability Profile

### Core Layer (mandatory)

1. **Type-Specific Stability Assessment**
   - Value: High stability — ergonomic taper (8mm→12mm) prevents adjacent finger compression; bezel setting eliminates snag risk.
   - Confidence: high
   - Source: rule-engine
   - Rationale: Explicit ergonomic taper; bezel surrounds raw crystal; band width 2.5cm within ring limit.

2. **Wear Burden Level**
   - Value: Medium
   - Confidence: high
   - Source: rule-engine
   - Rationale: Estimated 15–22g; substantial mass concentrated in ring zone but ergonomic taper distributes pressure.

3. **Recommended Scenarios**
   - Value: Daily / Evening
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: 6+ hour comfort supports daily wear; Brutist aesthetic suits creative professional contexts.

4. **Presence Level**
   - Value: Moderate
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: 12mm face width is statement-scale for a ring but monolithic form reads as grounded rather than flashy.

### Extended Layer

5. **Visual Coverage & Proportion**
   - Value: 12mm face width occupies significant finger real estate; bezel height creates vertical presence.
   - Confidence: high
   - Source: rule-engine
   - Rationale: Explicit 8mm→12mm taper; within ring width ≤2.5cm limit.

6. **Maintenance Sensitivity**
   - Value: Hammered texture hides minor scratches; raw crystal needs gentle cleaning (no ultrasonic).
   - Confidence: medium
   - Source: LLM-inference
   - Rationale: Intentional texture = self-healing aesthetic; raw crystal has natural fractures vulnerable to shock.

### Annotated Layer

7. **Estimated Weight Range**
   - Value: 15–22g
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: Solid 18K gold band (8mm→12mm) + ~1.5ct raw crystal in heavy bezel
   - **Label: ESTIMATE — actual weight requires CAD or physical prototype**

8. **Estimated Dimension Range**
   - Value: Band 7–9mm base, 11–13mm face; crystal ~8–12mm irregular
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: Described as 8mm→12mm taper with ~1.5ct raw crystal
   - **Label: ESTIMATE — actual dimensions require CAD or physical measurement**

### Highlight Layer

9. **Thermal-Tactile Resonance**
   - Value: 18K gold feels warm on contact and retains body heat. The hammered surface creates micro-air pockets that reduce skin adhesion.
   - Confidence: low (design inference)
   - Source: design-intent
   - Rationale: Gold thermal properties + hand-hammered texture = warm, tactile experience.

10. **Kinetic-Spatial Feedback**
    - Value: Ring is static on finger; the substantial mass provides a reassuring "grounding" sensation during hand gestures.
    - Confidence: low (design inference)
    - Source: design-intent
    - Rationale: Solid monolithic form + 15–22g mass = minimal movement, maximum tactile presence.

**Competition Fit**: Strong for Saul Bell (Technical Excellence 30% — the hand-forged texture and bezel setting on raw crystal demand extraordinary skill). Niche for AGTA Spectrum (the raw crystal may polarize judges who prefer cut stones).

---

| Aspect | Scheme A: Forged Earth |
|--------|------------------------|
| Concept Strength | Very high (material-first philosophy) |
| Technical Innovation | High (raw crystal bezel, hand-forged texture) |
| Wearability | High (ergonomic taper despite mass) |
| Competition Appeal | Niche (Saul Bell focused) |
| Density Archetype | Monolithic (0-10% negative space) |

*This design includes the mandatory constraint tag: "Designed for elegant wearability. Density follows the Monolithic archetype with realistic proportions suitable for actual luxury production. Gemstones are accents integrated into the metal structure, never dominant."*`,
    rationale: 'Shows Monolithic archetype: Andrew Grima-style Brutalist gold with minimal negative space (~5%), hand-hammered texture, raw crystal, mass-as-design philosophy. Demonstrates that "delicate" is not the only valid aesthetic for high jewelry.',
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

## 佩戴性档案

### 核心层（强制）

1. **类型专属稳定性评估**
   - 值：中等稳定性——开放式领圈配5个锚点分散重量；对称锚点布置缓解前倾风险。
   - 置信度：高
   - 来源：规则引擎
   - 依据：明确描述5个锚点；7cm展开宽度在项链≤8cm限制内；藤蔓从2mm渐变至0.4mm。

2. **佩戴负担等级**
   - 值：中
   - 置信度：高
   - 来源：规则引擎
   - 依据：铂金结构+散点红宝石；多点分布降低单点压强。

3. **推荐场景**
   - 值：晚宴 / 红毯
   - 置信度：中
   - 来源：LLM推断
   - 依据：醒目领圈存在感+宗教象征适合正式场合。

4. **存在感等级**
   - 值：醒目
   - 置信度：高
   - 来源：LLM推断
   - 依据：7cm展开+不对称荆棘轮廓+黑铑对比。

### 扩展层

5. **服装兼容性**
   - 值：需搭配硬挺领口；避免细链与金属线荆棘缠绕。
   - 置信度：中
   - 来源：LLM推断
   - 依据：0.6mm金属线荆棘从领圈向外延伸。

6. **保养敏感度**
   - 值：黑铑点缀会因摩擦磨损；建议每年检查补镀。
   - 置信度：中
   - 来源：规则引擎
   - 依据：表面镀层随皮肤接触和磨损逐渐退化。

### 标注层

7. **估算重量区间**
   - 值：45–60g
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：铂金藤蔓+40颗小红宝石
   - **标注：估算——实际重量需CAD或实物原型确认**

8. **估算尺寸范围**
   - 值：6.5–7.5cm 展开
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：描述为7cm不对称领圈
   - **标注：估算——实际尺寸需CAD或实物测量确认**

### 亮点层

9. **动态噪音风险**
   - 值：静音
   - 置信度：高
   - 来源：规则引擎
   - 依据：实心铂金结构配固定密镶；无松散元素。

10. **触觉温感响应**
    - 值：铂金初触清凉，30秒内过渡至体温中性。抛光内侧导轨触感顺滑。
    - 置信度：低（设计推断）
    - 来源：设计意图
    - 依据：铂金导热性+手工抛光内侧表面。

**竞赛契合度**：GIT（叙事力度强）和 Couture（工艺展示）表现强劲。宗教象征意义可能让 AGTA Spectrum 评委产生分歧。

---

### 方案 B: 玫瑰荆棘 Lariat

**概念叙述**：一条讲述爱之双重性的 lariat 项链——玫瑰与荆棘不可分割。铂金链条穿过有机荆棘形态，点缀散落的红宝石露珠。比方案 A 更可穿戴，同时保持暗黑浪漫 DNA。

**设计 DNA**：Wallace Chan（禅意有机流动）+ Cindy Chao（360 度自然主义）+ Shaun Leane（荆棘细节作为点缀）

**结构描述**：Lariat 下垂长度24cm。荆棘为0.5mm精致金属线簇。链条为1.2mm有机纹理铂金索链。红宝石露珠（0.5-0.8mm）如晨露般散落，从不聚集。60%负空间。扣合处是小荆棘簇，成为设计元素。

**关键材质**：铂金（链条和结构），莫桑比克红宝石（0.5-0.8mm散落露珠，约25颗），钻石微点缀（0.2mm，约10颗）

## 佩戴性档案

### 核心层（强制）

1. **类型专属稳定性评估**
   - 值：高稳定性——lariat 形式可自适应调节；荆棘明确朝外，消除肌肤接触风险。
   - 置信度：高
   - 来源：规则引擎
   - 依据：24cm下垂长度可调节；荆棘明确远离肌肤；链条为柔性索链。

2. **佩戴负担等级**
   - 值：轻
   - 置信度：高
   - 来源：规则引擎
   - 依据：估算35–48g；链条沿颈线分布重量；无刚性领圈压点。

3. **推荐场景**
   - 值：日常 / 晚宴
   - 置信度：中
   - 来源：LLM推断
   - 依据：可调节lariat适应多种场合；玫瑰主题具有普遍吸引力。

4. **存在感等级**
   - 值：适中
   - 置信度：中
   - 来源：LLM推断
   - 依据：24cm下垂营造纵向线条；散落露珠增添微妙闪光而不主导。

### 扩展层

5. **视觉覆盖度与比例**
   - 值：24cm纵向下垂吸引视线沿领口下移；视觉上拉长 torso 比例。
   - 置信度：高
   - 来源：规则引擎
   - 依据：明确24cm下垂长度，在lariat标准范围内。

6. **服装兼容性**
   - 值：百搭——适合高领和低领；避免易钩挂的松散针织面料。
   - 置信度：中
   - 来源：LLM推断
   - 依据：链条重量可能钩挂松散针织；光滑索链通常面料友好。

### 标注层

7. **估算重量区间**
   - 值：35–48g
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：铂金索链+25颗红宝石+10颗微钻石
   - **标注：估算——实际重量需CAD或实物原型确认**

8. **估算尺寸范围**
   - 值：22–26cm 下垂长度
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：描述为24cm lariat配有机荆棘簇
   - **标注：估算——实际尺寸需CAD或实物测量确认**

### 亮点层

9. **空间动力学反馈**
   - 值：lariat 随身体自然摆动；末端荆棘簇形成柔和钟摆节奏（约1.2秒周期）。
   - 置信度：低（设计推断）
   - 来源：设计意图
   - 依据：24cm下垂+末端簇重量形成自然摆动。

**竞赛契合度**：在所有竞赛中表现强劲。可穿戴艺术定位击中 Saul Bell 的甜蜜点。玫瑰主题具有普遍吸引力。

---

| 维度 | 方案 A: 荆棘之冠 | 方案 B: 玫瑰荆棘 Lariat |
|------|------------------|-------------------------|
| 概念力度 | 极高（标志性符号） | 高（易懂的叙事） |
| 技术创新 | 高（张力金属线结构） | 中（经典lariat带纹理） |
| 佩戴性 | 中（宣言式作品） | 高（可调节、更轻） |
| 竞赛吸引力 | 小众（两极化） | 广泛（普遍吸引力） |

*两个设计均包含强制约束标签："为优雅佩戴而设计。密度遵循融合设计师的原型（蕾丝/建筑/织锦/巨石），适合实际奢侈品生产的真实比例。宝石是融入金属结构的点缀，绝不主导。"*`,
    rationale: '展示了正确的方案结构：命名章节、原型感知设计师DNA归属、先结构后材质、散点小宝石（非大颗主石）、佩戴性数据、对比表格和强制约束标签。',
  },
  {
    id: 'image-prompt-zh-1',
    input: '生成方案 A',
    output: `**方案 A: 荆棘之冠 的图片生成提示词**

铂金藤蔓领圈项链，散落的红宝石密镶荆棘尖端，Shaun Leane 风格的暗黑浪漫主义。不对称开放式领圈，铂金藤蔓从2mm渐变到0.4mm，精致的0.6mm金属线延伸作为荆棘。红宝石是微小的0.8-1.2mm散点密镶点缀，约40颗小石——无主导中心石。荆棘基部黑色铑金点缀。55%负空间，掐丝和镂空结构。金属呈现手工锻造纹理，带有微妙的锤痕。展示在优雅的黑色丝绒人体模型胸台上，左侧自然侧光，柔和阴影。铂金表面呈现真实手工纹理，带有轻微变化。为优雅佩戴而设计。密度遵循建筑原型，适合实际奢侈品生产的真实比例。`,
    rationale: '展示了正确的图片提示词：先描述金属结构、散点小宝石（无主导宝石）、自然光线（非电影级）、手工纹理（非CGI完美）、强制约束标签带原型感知。',
  },
  {
    id: 'scheme-generation-tapestry-zh-1',
    input: '一款 JAR 风格的胸针，强烈的色彩渐变',
    output: `### 方案 A: 赤色瀑布

**概念叙述**：一款 JAR 风格的胸针，将一片坠落的秋叶重新想象为红宝石和蓝宝石微镶的 cascading 领域。作品先用不可能的色彩 bleeding 冲击眼睛，再用技术完美度征服它。

**设计 DNA**：JAR（画家式密镶、色彩 bleeding、微镶）+ Verdura（蛋面簇、热带 exuberance）
**原型**：织锦（5-15% 负空间）

**结构描述**：实心铂金底座胸针，4.5cm x 3.5cm。金属几乎完全隐藏在无缝的微镶渐变之下。表面读起来像连续的色彩场——深 crimson bleeding 入 burnt orange 和 gold。负空间极少（~8%），仅出现在"叶片"渐细至尖端（0.3mm）的边缘。镶嵌机制不可见；表面读起来像连续的色彩场，无可见金属中断。

**关键材质**：铂金（隐藏结构底座），缅甸红宝石（0.8-1.2mm密镶，~180颗），斯里兰卡蓝宝石（0.8-1.2mm密镶，~120颗），钻石微点缀（0.2mm，~40颗）。没有单颗石超过0.8mm——设计关乎 FIELD，而非个体宝石。

## 佩戴性档案

### 核心层（强制）

1. **类型专属稳定性评估**
   - 值：高稳定性——实心铂金底座配双扣别针；扁平轮廓最小化旋转风险。
   - 置信度：高
   - 来源：规则引擎
   - 依据：明确描述双扣别针；8mm最大高度在胸针限制内；实心底座防止弯曲。

2. **佩戴负担等级**
   - 值：中
   - 置信度：高
   - 来源：规则引擎
   - 依据：估算25–32g集中于4.5x3.5cm区域；扁平轮廓分散于面料。

3. **推荐场景**
   - 值：晚宴 / 红毯
   - 置信度：高
   - 来源：LLM推断
   - 依据：JAR风格密集密镶为宣言作品；8小时以上舒适适合 gala 佩戴。

4. **存在感等级**
   - 值：醒目
   - 置信度：高
   - 来源：LLM推断
   - 依据：4.5x3.5cm表面积配强烈色彩渐变；约8%负空间=最大视觉冲击。

### 扩展层

5. **视觉覆盖度与比例**
   - 值：4.5x3.5cm占据显著翻领/胸部区域；呈现为色彩场而非离散物体。
   - 置信度：高
   - 来源：规则引擎
   - 依据：尺寸明确说明；在胸针≤6cm限制内。

6. **服装兼容性**
   - 值：最适合硬挺面料（羊毛、真丝双宫绸）；避免轻质雪纺因重量下垂。
   - 置信度：中
   - 来源：LLM推断
   - 依据：28g集中负载需要面料刚度；扁平轮廓有帮助但质量显著。

7. **保养敏感度**
   - 值：微镶需专业清洁；避免超声波清洗以防松动小石。
   - 置信度：高
   - 来源：规则引擎
   - 依据：300+微石（0.8mm）隐形镶嵌=操作不当有极高掉石风险。

### 标注层

8. **估算重量区间**
   - 值：25–32g
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：实心铂金底座+约300颗微密镶石
   - **标注：估算——实际重量需CAD或实物原型确认**

9. **估算尺寸范围**
   - 值：4.0–5.0cm x 3.0–4.0cm
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：描述为4.5cm x 3.5cm胸针，边缘渐细
   - **标注：估算——实际尺寸需CAD或实物测量确认**

### 亮点层

10. **触觉温感响应**
    - 值：铂金底座保持面料清凉；密集密镶表面形成光滑玻璃质感热界面。
    - 置信度：低（设计推断）
    - 来源：设计意图
    - 依据：铂金热质量+连续宝石表面最小化温度变化。

**竞赛契合度**：AGTA Spectrum 表现卓越（宝石运用 30%——密镶渐变是色彩理论的 masterclass）。Saul Bell 表现强劲（技术卓越 30%——此规模的隐形镶嵌需要非凡工艺）。

---

| 维度 | 方案 A: 赤色瀑布 |
|------|------------------|
| 概念力度 | 极高（JAR 色彩 bleeding） |
| 技术创新 | 极高（隐形微镶渐变） |
| 佩戴性 | 高（扁平轮廓，安全别针） |
| 竞赛吸引力 | 广泛（AGTA + Saul Bell） |
| 密度原型 | 织锦（5-15% 负空间） |

*此设计包含强制约束标签："为优雅佩戴而设计。密度遵循织锦原型，适合实际奢侈品生产的真实比例。宝石是融入金属结构的点缀，绝不主导。"*`,
    rationale: '展示了织锦原型：JAR 风格密集密镶，负空间极少（~8%），隐藏金属，表面即画布哲学。证明了负空间并非总是大师级作品的高值。',
  },
  {
    id: 'scheme-generation-lace-zh-1',
    input: '一款莫卧儿风格的铂金项链，钻石格窗，通透而帝国感',
    output: `### 方案 A: 帝国格窗

**概念叙述**：将莫卧儿 jali 屏风重新想象为可穿戴建筑。近不可见的铂金丝线创造张力固定的钻石格窗，宝石定义轮廓，而非金属。作品感觉由空气支撑。

**设计 DNA**：Bhagat（莫卧儿 jali、 heritage 技法、校准宝石对齐）+ Michelle Ong（钛金属蕾丝、纺织→金属 articulation）
**结构主导**：Bhagat（蕾丝原型，50-75% 负空间）
**美学贡献者**：Michelle Ong（触觉流动性、如意图案）
**原型**：蕾丝（50-75% 负空间）

**结构描述**：近不可见的 0.3mm 铂金丝线构成骨架格窗框架。钻石张力固定于交叉节点，创造"失重"网格效果，张力镶嵌是唯一可见的机械结构。格窗横跨锁骨 7cm，校准宝石对齐定义整体轮廓——金属几乎不可见。负空间约 65%。框架在主要节点使用榫卯灵感关节以确保结构完整性而不增加体量。金属线从承重节点的 0.8mm 渐细至边缘的 0.3mm。

**关键材质**：铂金（近不可见丝线框架，0.3-0.8mm），校准钻石（0.5-1.0mm，~80 颗张力固定于格窗节点），无中心石——钻石 FIELD 就是设计本身。帝王翡翠蛋面（8mm）作为中心节点的单一点缀，张力固定。

## 佩戴性档案

### 核心层（强制）

1. **类型专属稳定性评估**
   - 值：中等稳定性——0.3mm金属线上张力固定格窗极精致；承重节点榫卯关节提供结构冗余。
   - 置信度：中
   - 来源：LLM推断
   - 依据：0.3mm金属线极细；榫卯关节有描述但未工程验证；7cm展开在限制内。

2. **佩戴负担等级**
   - 值：轻
   - 置信度：高
   - 来源：规则引擎
   - 依据：估算18–26g；开放式格窗消除实心金属质量；张力镶嵌最小化额外重量。

3. **推荐场景**
   - 值：晚宴 / 红毯
   - 置信度：中
   - 来源：LLM推断
   - 依据：帝国jali叙事适合正式场合；4小时以上舒适支持活动佩戴。

4. **存在感等级**
   - 值：醒目
   - 置信度：高
   - 来源：LLM推断
   - 依据：7cm领圈展开配约65%负空间营造戏剧化轮廓；校准钻石增添璀璨。

### 扩展层

5. **视觉覆盖度与比例**
   - 值：7cm领圈跨度框住胸口；近不可见金属使宝石仿佛悬浮。
   - 置信度：高
   - 来源：规则引擎
   - 依据：明确7cm展开；65%负空间意味着视觉边界由宝石定义。

6. **服装兼容性**
   - 值：最适合抹胸或宽领服装；避免高领与领圈争夺领口空间。
   - 置信度：中
   - 来源：LLM推断
   - 依据：领圈作品需要暴露颈/胸以展示完整跨度。

7. **保养敏感度**
   - 值：极高——0.3mm金属线易受冲击；张力镶嵌需专业检查。
   - 置信度：高
   - 来源：规则引擎
   - 依据：亚毫米铂金丝线在应力下疲劳；张力镶嵌可能随佩戴松动。

### 标注层

8. **估算重量区间**
   - 值：18–26g
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：0.3–0.8mm铂金丝线+约80颗张力固定钻石+单颗翡翠蛋面
   - **标注：估算——实际重量需CAD或实物原型确认**

9. **估算尺寸范围**
   - 值：6.5–7.5cm 展开
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：描述为7cm横跨锁骨的格窗
   - **标注：估算——实际尺寸需CAD或实物测量确认**

### 亮点层

10. **动态噪音风险**
    - 值：静音
    - 置信度：高
    - 来源：规则引擎
    - 依据：固定张力固定格窗；无悬挂或关节元素。

11. **热感季节倾向**
    - 值：铂金全年保持清凉；开放式格窗允许空气流通，即使温暖天气也舒适。
    - 置信度：低（设计推断）
    - 来源：设计意图
    - 依据：单点接触热质量低+65%负空间=最小热滞留。

**竞赛契合度**：Couture 表现强劲（工艺展示——此规模张力固定需要非凡技艺）。AGTA Spectrum 小众（无单颗大宝石可展示）。Jali heritage 叙事与 GIT 评委产生共鸣。

---

| 维度 | 方案 A: 帝国格窗 |
|------|------------------|
| 概念力度 | 极高（莫卧儿 jali 复兴） |
| 技术创新 | 极高（0.3mm 丝线上张力固定格窗） |
| 佩戴性 | 中（精致，需要小心佩戴） |
| 竞赛吸引力 | 小众（Couture 聚焦） |
| 密度原型 | 蕾丝（50-75% 负空间） |

*此设计包含强制约束标签："为优雅佩戴而设计。密度遵循蕾丝原型，适合实际奢侈品生产的真实比例。宝石是融入金属结构的点缀，绝不主导。"*`,
    rationale: '展示了蕾丝原型：Bhagat 风格结构格窗，50-75% 负空间。近不可见丝线、张力固定宝石、工程级精度。证明高级珠宝中的"蕾丝"是结构工程，而非装饰性掐丝。',
  },
  {
    id: 'scheme-generation-monolithic-zh-1',
    input: '一款粗野主义金戒指，带原水晶',
    output: `### 方案 A: 锻造大地

**概念叙述**：从 Andrew Grima 的粗野主义黄金哲学中汲取灵感，这枚戒指让材质本身说话。一颗原海蓝宝石水晶从手工锤打的18K金中浮现，如同地质构造——体量、纹理和原始之美。

**设计 DNA**：Andrew Grima（纹理黄金、原水晶、粗野主义珠宝）+ Hemmerle（原始金属表面、对比材质）
**原型**：巨石（0-10% 负空间）

**结构描述**：实心18K金戒指，表面锻造、手工锤打。戒圈从底部8mm渐宽至面部12mm——有分量但人体工学。黄金表面展示 intentional 锤痕、錾刻纹理和自然包浆变化。一颗原、未切割的海蓝宝石水晶（约1.5ct，天然不规则形状）镶嵌在厚重的包镶中，包镶成为雕塑形态的一部分。负空间极少（~5%）——设计关乎 MASS 和 TEXTURE，而非精致。金属厚度：2.5-3mm 结构。

**关键材质**：18K黄金（实心锻造戒圈，手工锤打纹理），原海蓝宝石水晶（~1.5ct，未切割，天然内含物可见），无额外宝石——原水晶和黄金纹理就是设计本身。

## 佩戴性档案

### 核心层（强制）

1. **类型专属稳定性评估**
   - 值：高稳定性——人体工学渐宽（8mm→12mm）防止相邻手指压迫；包镶消除勾挂风险。
   - 置信度：高
   - 来源：规则引擎
   - 依据：明确人体工学渐宽；包镶包围原水晶；戒圈宽度2.5cm在戒指限制内。

2. **佩戴负担等级**
   - 值：中
   - 置信度：高
   - 来源：规则引擎
   - 依据：估算15–22g；戒指区域集中 substantial 质量但人体工学渐宽分散压力。

3. **推荐场景**
   - 值：日常 / 晚宴
   - 置信度：中
   - 来源：LLM推断
   - 依据：6小时以上舒适支持日常佩戴；粗野主义美学适合创意职业场合。

4. **存在感等级**
   - 值：适中
   - 置信度：中
   - 来源：LLM推断
   - 依据：12mm面部宽度对戒指为宣言级但巨石形态显得沉稳而非浮夸。

### 扩展层

5. **视觉覆盖度与比例**
   - 值：12mm面部宽度占据显著手指空间；包镶高度创造垂直存在感。
   - 置信度：高
   - 来源：规则引擎
   - 依据：明确8mm→12mm渐宽；在戒指宽度≤2.5cm限制内。

6. **保养敏感度**
   - 值：锤击纹理隐藏轻微划痕；原水晶需轻柔清洁（勿超声波）。
   - 置信度：中
   - 来源：LLM推断
   - 依据：故意纹理=自愈美学；原水晶有天然裂隙易受冲击。

### 标注层

7. **估算重量区间**
   - 值：15–22g
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：实心18K金戒圈（8mm→12mm）+约1.5ct原水晶配厚重包镶
   - **标注：估算——实际重量需CAD或实物原型确认**

8. **估算尺寸范围**
   - 值：戒圈底部7–9mm，面部11–13mm；水晶约8–12mm不规则
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：描述为8mm→12mm渐宽配约1.5ct原水晶
   - **标注：估算——实际尺寸需CAD或实物测量确认**

### 亮点层

9. **触觉温感响应**
   - 值：18K黄金触感温润并保留体温。锤击表面创造微气穴减少皮肤粘附。
   - 置信度：低（设计推断）
   - 来源：设计意图
   - 依据：黄金热学属性+手工锤击纹理=温暖触觉体验。

10. **空间动力学反馈**
    - 值：戒指在手指上静止； substantial 质量在手势间提供安心的" grounding "感受。
    - 置信度：低（设计推断）
    - 来源：设计意图
    - 依据：实心巨石形态+15–22g质量=最小移动，最大触觉存在。

**竞赛契合度**：Saul Bell 表现强劲（技术卓越 30%——手工锻造纹理和原水晶包镶需要非凡技艺）。AGTA Spectrum 小众（原水晶可能让偏好切割宝石的评委产生分歧）。

---

| 维度 | 方案 A: 锻造大地 |
|------|------------------|
| 概念力度 | 极高（材质优先哲学） |
| 技术创新 | 高（原水晶包镶，手工锻造纹理） |
| 佩戴性 | 高（人体工学渐宽，尽管有分量） |
| 竞赛吸引力 | 小众（Saul Bell 聚焦） |
| 密度原型 | 巨石（0-10% 负空间） |

*此设计包含强制约束标签："为优雅佩戴而设计。密度遵循巨石原型，适合实际奢侈品生产的真实比例。宝石是融入金属结构的点缀，绝不主导。"*`,
    rationale: '展示了巨石原型：Andrew Grima 风格粗野主义黄金，负空间极少（~5%），手工锤打纹理，原水晶，体量即设计哲学。证明了"精致"并非高级珠宝唯一有效的美学。',
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
