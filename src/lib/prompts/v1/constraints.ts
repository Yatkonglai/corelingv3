import { PromptLanguage } from './types';

/**
 * High Jewelry Reality Constraint Layer
 * Prevents AI from generating fantasy jewelry, oversized gemstones,
 * and unrealistic proportions. This is a runtime-level constraint module.
 */

const CONSTRAINTS_EN = `## High Jewelry Reality Constraints

### 1. Jewelry Hierarchy (Non-Negotiable Priority Order)
The value of high jewelry comes from this hierarchy. NEVER invert it:

1. **Silhouette** — The overall shape and line flow
2. **Proportion** — Relationship between all elements
3. **Negative Space** — The "air" that makes jewelry breathe
4. **Craftsmanship** — Metalwork, setting, texture detail
5. **Light Behavior** — How light interacts with materials
6. **Gemstone** — The accent, NOT the protagonist

**Rule**: If a gemstone size threatens any of items 1-5, the gemstone MUST be reduced.

### 2. Gemstone Proportion Constraints (Strict)
- Single center stone must NOT exceed 25% of total visual weight
- Necklace center stone: ≤3ct (accent stones ≤0.8ct)
- Earring center stone: ≤1ct per ear (accent stones ≤0.3ct)
- Ring center stone: ≤2ct (accent stones ≤0.5ct)
- Brooch center stone: ≤2.5ct (accent stones ≤0.5ct)
- **ABSOLUTELY FORBIDDEN**: "Collector size" stones (>5ct) as center pieces
- **Prefer**: Multi-stone pavé or scattered small stones over single large stone
- **Golden Rule**: The metal structure must be visible AROUND and BETWEEN every stone

### 3. Structural Balance Constraints
- Metal structure is the PROTAGONIST. Gemstones are SUPPORTING CHARACTERS.
- Gemstone settings must be organic extensions of metal structure
- Negative space ratio must be ≥ 50%
- No gemstone may obscure more than 20% of metal craftsmanship
- Metal line thickness reference: 0.5-1.5mm for fine details, 2-3mm for structural elements
- Maximum piece dimensions:
  - Necklace spread: ≤8cm
  - Earring length: ≤5cm
  - Ring face width: ≤2.5cm
  - Brooch: ≤6cm

### 4. Negative Prompt Layer (Absolute Prohibitions)
These elements instantly degrade output to "AI fantasy jewelry". NEVER include:

- ❌ Oversized center gemstones dominating the design
- ❌ Perfect mirror symmetry (dynamic asymmetry is luxury; symmetry is mass-market)
- ❌ Hyper-polished CGI aesthetics (plastic-like surfaces)
- ❌ Floating gemstones without visible setting mechanics
- ❌ Impossible or neon-bright gemstone colors
- ❌ Solid metal masses without structural articulation
- ❌ Fantasy proportions detached from human anatomy
- ❌ Gemstones larger than the metal structure supporting them
- ❌ "Instagram jewelry" aesthetics (over-styled, over-lit, over-perfect)
- ❌ Center stones that obscure the design's silhouette

### 5. Luxury Realism Standards
- Reference REAL high jewelry dimensions:
  - Cindy Chao Black Label brooches: 5-8cm (NOT 20cm)
  - JAR clip brooches: 3-5cm
  - Hemmerle necklaces: delicate chain links, substantial but not bulky pendants
- Metalwork must reference REAL goldsmith techniques:
  - Hand-forged texture, not machine-perfect polish
  - Visible tool marks where appropriate (hammered, chased)
  - Natural patina or oxidation as intentional design element
- Gemstone settings must be REAL techniques:
  - Micro-pavé, prong setting, bezel setting, tension setting, invisible setting
  - NO fantasy setting types

### 6. Eastern Restraint Aesthetics
- 留白 > 填满 (Empty space > filled space)
- 暗示 > 明示 (Suggestion > explicit display)
- 气韵 > 堆砌 (Spirit > accumulation)
- Gemstones should be "discovered" by the eye, not "announced"
- Reference: Michelle Ong Carnet (jade in whisper), Suzanne Belperron (carved understatement)
- The gem is a secret the metal keeps; the metal is the story the gem illustrates`;

const CONSTRAINTS_ZH = `## 高级珠宝现实约束

### 1. 珠宝层级（不可协商的优先级）
高级珠宝的价值来自此层级。绝不可颠倒：

1. **轮廓线条** — 整体形状与线条流动
2. **比例关系** — 所有元素之间的关系
3. **负空间** — 让珠宝呼吸的"空气"
4. **工艺细节** — 金属工艺、镶嵌、纹理
5. **光线行为** — 光线与材质的互动
6. **宝石** — 点缀，**不是主角**

**规则**：如果宝石尺寸威胁到第1-5项中的任何一项，宝石必须缩小。

### 2. 宝石比例约束（严格）
- 单颗主石不得超过整体视觉重量的25%
- 项链主石：≤3ct（点缀石≤0.8ct）
- 耳环主石：≤1ct/只（点缀石≤0.3ct）
- 戒指主石：≤2ct（点缀石≤0.5ct）
- 胸针主石：≤2.5ct（点缀石≤0.5ct）
- **绝对禁止**："收藏级"尺寸宝石（>5ct）作为主石
- **优先**：多颗小宝石密镶或散点排列，替代单颗大宝石
- **黄金法则**：金属结构必须在每颗宝石的周围和之间可见

### 3. 结构平衡约束
- 金属结构是**主角**。宝石是**配角**。
- 宝石镶嵌必须是金属结构的有机延伸
- 负空间比例必须≥50%
- 任何宝石不得遮盖超过20%的金属工艺
- 金属线条粗细参考：精细细节0.5-1.5mm，结构元素2-3mm
- 作品最大尺寸：
  - 项链展开宽度：≤8cm
  - 耳环长度：≤5cm
  - 戒面宽度：≤2.5cm
  - 胸针：≤6cm

### 4. 负面约束层（绝对禁止）
这些元素会立即将输出降级为"AI幻想珠宝"。绝不可包含：

- ❌  oversized 主石主宰设计
- ❌ 完美镜像对称（动态不对称才是奢华；对称是大众市场）
- ❌ 过度光滑的CGI质感（塑料般的表面）
- ❌ 无可见镶嵌机制的漂浮宝石
- ❌ 不可能或霓虹般鲜艳的宝石颜色
- ❌ 无结构变化的实心金属块
- ❌ 脱离人体解剖学的幻想比例
- ❌ 比支撑它的金属结构还大的宝石
- ❌ "Instagram珠宝"美学（过度造型、过度打光、过度完美）
- ❌ 遮盖设计轮廓的主石

### 5. 奢华现实主义标准
- 参考**真实**高级珠宝尺寸：
  - Cindy Chao Black Label 胸针：5-8cm（不是20cm）
  - JAR 夹式胸针：3-5cm
  - Hemmerle 项链：精致的链条，吊坠有分量但不笨重
- 金属工艺必须参考**真实**金匠技术：
  - 手工锻造纹理，非机器完美抛光
  - 适当处可见工具痕迹（锤打、錾刻）
  - 自然包浆或氧化作为有意设计元素
- 宝石镶嵌必须是**真实**技术：
  - 微镶、爪镶、包镶、张力镶、隐形镶
  - 禁止幻想镶嵌类型

### 6. 东方克制美学
- 留白 > 填满
- 暗示 > 明示
- 气韵 > 堆砌
- 宝石应该被眼睛"发现"，而非"宣告"
- 参考：Michelle Ong Carnet（玉石的耳语），Suzanne Belperron（克制的雕刻）
- 宝石是金属保守的秘密；金属是宝石讲述的故事`;

export function buildRealityConstraints(lang: PromptLanguage): string {
  return lang === 'zh' ? CONSTRAINTS_ZH : CONSTRAINTS_EN;
}
