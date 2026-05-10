import { PromptLanguage } from './types';

/**
 * Master Density Archetype Constraint Layer
 * Version: 1.3.0
 *
 * Replaces the universal negative-space >= 50% rule with archetype-aware constraints.
 * Each archetype represents a distinct compositional philosophy that matches
 * the DNA of specific master jewelers.
 */

const ARCHETYPES_EN = `## Master Density Archetypes

When fusing designer DNA, you MUST apply the correct archetype's constraints.
Do NOT apply a universal rule. The density is part of the master's identity.

### Lace Archetype (Bhagat, Michelle Ong)
**Negative space: 50–75%**
**Core language**: Structural air. Gems are suspended in webs of metal.
**Structure**: Filigree, lattice, jali, skeletal frameworks. Metal lines <0.8mm.
**Gemstones**: Scattered, suspended, held by tension. Never clustered in solid masses.
**Forbidden**: Solid blocks, thick wires (>0.8mm), unbroken metal planes, "heavy" descriptions.
**Self-check**: Does the design look like it is held together by tension and air?

### Architectural Archetype (Cindy Chao, Shaun Leane, Lauren Adriana)
**Negative space: 30–50%**
**Core language**: Sculptural flow. Metal is the bone structure; gems are the flesh.
**Structure**: 360-degree construction with articulated joints. Organic or geometric frameworks.
**Gemstones**: Integrated into structural nodes. Prong or tension settings that READ as structure.
**Forbidden**: Unarticulated solid blocks, flat CAD-blocky forms, lack of structural logic.
**Self-check**: Is the piece beautiful from every angle? Does the metal structure read as the protagonist?

### Tapestry Archetype (JAR, Verdura)
**Negative space: 5–15%**
**Core language**: Surface richness. Metal is a hidden canvas; gems are the paint.
**Structure**: Micro-pavé gradients, cabochon clusters, ribbon motifs. Metal is nearly invisible on primary surfaces.
**Gemstones**: Dense coverage. Color gradients and surface tension are the design.
**Forbidden**: Skeletal frameworks, excessive openness, "airy" descriptions. Visible metal on primary surfaces.
**Self-check**: Does the surface read as a continuous field of color and light? Is the metal hidden?

### Monolithic Archetype (Andrew Grima, Wallace Chan, Hemmerle, Sevan Bicakci, Suzanne Belperron)
**Negative space: 0–10%**
**Core language**: Mass is the protagonist. Carved volume, raw texture, forged weight.
**Structure**: Solid metal forms with hand-worked surface texture. Carved, hammered, or cast volumes.
**Gemstones**: Inlaid, carved-through, or set as structural punctuation. NOT surface coverage.
**Forbidden**: Thin wires, lattice structures, "delicate" descriptions. The piece must feel like a solid object.
**Self-check**: Does the piece feel like a sculpture you wear? Is mass and texture the design?

### Universal Realism Guards (All Archetypes)
These NEVER change, regardless of archetype:
- Realistic dimensions: necklace spread ≤8cm, earring length ≤5cm, ring face ≤2.5cm, brooch ≤6cm
- Visible setting mechanics: no floating gems without prongs, bezels, or tension
- Gemstone visual weight: center stone ≤25% of total visual weight
- No CGI/perfect polish language: hand-worked texture, tool marks, natural patina
- No impossible colors or fantasy proportions
- Metalwork references REAL goldsmith techniques: micro-pavé, prong, bezel, tension, invisible setting
- No "8k resolution", "cinematic lighting", "hyper-realistic" in design descriptions`;

const ARCHETYPES_ZH = `## 大师密度原型

融合设计师 DNA 时，必须应用正确原型的约束。
不要应用统一规则。密度是大师身份的一部分。

### 蕾丝原型 (Bhagat, Michelle Ong)
**负空间: 50–75%**
**核心语言**: 结构空气。宝石悬浮在金属网中。
**结构**: 掐丝、格子、jali、骨架框架。金属线 <0.8mm。
**宝石**: 散落、悬浮、张力固定。绝不聚集在实心块中。
**禁止**: 实心块、粗金属线(>0.8mm)、完整金属平面、"厚重"描述。
**自检**: 设计是否看起来由张力和空气支撑？

### 建筑原型 (Cindy Chao, Shaun Leane, Lauren Adriana)
**负空间: 30–50%**
**核心语言**: 雕塑流动。金属是骨骼结构；宝石是血肉。
**结构**: 360度构造，活动关节。有机或几何框架。
**宝石**: 融入结构节点。爪镶或张力镶嵌，读起来像结构本身。
**禁止**: 无关节的实心块、扁平CAD块状、缺乏结构逻辑。
**自检**: 作品从每个角度都美吗？金属结构是否是主角？

### 织锦原型 (JAR, Verdura)
**负空间: 5–15%**
**核心语言**: 表面丰富。金属是隐藏画布；宝石是颜料。
**结构**: 微镶渐变、蛋面簇、丝带图案。主表面几乎看不到金属。
**宝石**: 密集覆盖。色彩渐变和表面张力就是设计本身。
**禁止**: 骨架框架、过度开放、"通透"描述。主表面可见金属。
**自检**: 表面是否读起来像连续的色彩和光场？金属是否隐藏？

### 巨石原型 (Andrew Grima, Wallace Chan, Hemmerle, Sevan Bicakci, Suzanne Belperron)
**负空间: 0–10%**
**核心语言**: 体量是主角。雕刻体积、原始纹理、锻造重量。
**结构**: 实心金属形态，手工表面纹理。雕刻、锤打或铸造体积。
**宝石**: 镶嵌、穿透雕刻、或作为结构标点设置。不是表面覆盖。
**禁止**: 细线、格子结构、"精致"描述。作品必须感觉像实心物体。
**自检**: 作品是否像可穿戴的雕塑？体量和纹理是否是设计？

### 通用现实守卫 (所有原型)
这些永不改变，无论原型：
- 真实尺寸：项链展开≤8cm，耳环长度≤5cm，戒面≤2.5cm，胸针≤6cm
- 可见镶嵌机制：无镶嵌机制的漂浮宝石禁止
- 宝石视觉重量：主石≤整体视觉重量的25%
- 禁止CGI/完美抛光语言：手工纹理、工具痕迹、自然包浆
- 禁止不可能颜色或幻想比例
- 金属工艺参考真实金匠技术：微镶、爪镶、包镶、张力镶、隐形镶
- 设计描述中禁止"8k分辨率"、"电影级光线"、"超写实"`;

export function buildRealityConstraints(lang: PromptLanguage): string {
  return lang === 'zh' ? ARCHETYPES_ZH : ARCHETYPES_EN;
}
