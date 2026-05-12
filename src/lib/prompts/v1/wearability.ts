import { PromptLanguage } from './types';

/**
 * Wearability Profile Module
 * Consolidated single source of truth for all wearability data.
 * Version: 1.4.0
 *
 * Replaces fragmented wearability references in core.ts, workflow.ts, and contracts.ts.
 * Provides a 4-tier field system with confidence grading and source attribution.
 */

// ── Physical Limits Reference (moved from core.ts) ─────────────────────────

const PHYSICAL_LIMITS_EN = `## Physical Limits Reference

These are hard upper bounds. Designs must not exceed them.

| Component | Max Spread | Center Stone | Max Weight | Density Guidance |
|-----------|------------|--------------|------------|------------------|
| Necklace  | ≤8cm       | ≤3ct         | ≤80g       | Follow fused archetype |
| Earrings  | L≤5cm, W≤2.5cm | ≤1ct/ea  | ≤8g/ea     | Follow fused archetype |
| Ring      | W≤2.5cm, H≤1.2cm | ≤2ct   | ≤15g       | Follow fused archetype |
| Brooch    | ≤6cm       | ≤2.5ct       | ≤35g       | Follow fused archetype |

**Gemstone Rules**:
- Center stone must NOT exceed 25% of total visual weight.
- Prefer scattered small stones (≤0.5ct) over single large stones.
- The metal structure must remain visible around and between every stone.
- Absolutely forbidden: "collector size" stones (>5ct) as center pieces.`;

const PHYSICAL_LIMITS_ZH = `## 物理限制参考

以下为硬性上限，设计不得超过。

| 部件 | 最大展开 | 主石 | 最大重量 | 密度指导 |
|------|----------|------|----------|----------|
| 项链 | ≤8cm | ≤3ct | ≤80g | 遵循融合的原型 |
| 耳环 | 长≤5cm，宽≤2.5cm | ≤1ct/只 | ≤8g/只 | 遵循融合的原型 |
| 戒指 | 宽≤2.5cm，高≤1.2cm | ≤2ct | ≤15g | 遵循融合的原型 |
| 胸针 | ≤6cm | ≤2.5ct | ≤35g | 遵循融合的原型 |

**宝石规则**：
- 主石不得超过整体视觉重量的25%。
- 优先使用散点小宝石（≤0.5ct）替代单颗大宝石。
- 金属结构必须在每颗宝石周围和之间保持可见。
- 绝对禁止："收藏级"尺寸宝石（>5ct）作为主石。`;

// ── Jewelry-Type-Specific Rules ────────────────────────────────────────────

const TYPE_RULES_EN = `## Jewelry-Type-Specific Stability Rules

Apply the correct assessment based on the jewelry type:

**Necklace**:
- Check: forward tilt risk (heavy pendant pulling away from chest), back-of-neck contact pressure, collarbone contour fit
- Stability markers: chain gauge, clasp type, weight distribution across anchor points

**Earrings**:
- Check: earlobe pull/tear risk, swing amplitude, hair entanglement, post vs clip vs hook mechanism
- Stability markers: total weight per ear, center of gravity relative to piercing point, back-support type

**Ring**:
- Check: finger gap clearance (adjacent finger compression), knuckle passage, snag risk on clothing, hand activity interference
- Stability markers: band width/height ratio, bezel vs prong setting height, inner surface smoothness

**Brooch**:
- Check: fabric drape distortion, rotation risk, pin length vs fabric thickness, catch mechanism security
- Stability markers: pin-catch type, weight vs fabric stiffness ratio, backing plate size`;

const TYPE_RULES_ZH = `## 珠宝类型专属稳定性规则

根据珠宝类型应用正确的评估：

**项链**：
- 检查：前倾风险（重坠拉离胸部）、后颈接触压强、锁骨轮廓贴合度
- 稳定性标记：链条粗细、扣合类型、锚点间的重量分布

**耳环**：
- 检查：耳垂拉扯/撕裂风险、摆动幅度、头发缠绕、针式/夹式/钩式机制
- 稳定性标记：单只总重量、相对于穿刺点的重心、后托类型

**戒指**：
- 检查：指间间隙余量（相邻手指压迫）、指节通过性、勾挂衣物风险、手部活动干扰
- 稳定性标记：戒圈宽/高比、包镶vs爪镶高度、内表面光滑度

**胸针**：
- 检查：面料垂坠变形、旋转风险、针长vs面料厚度、保险扣机制安全性
- 稳定性标记：针扣类型、重量vs面料刚度比、背板尺寸`;

// ── 4-Tier Field System ───────────────────────────────────────────────────

const FIELD_SYSTEM_EN = `## Wearability Profile Format

After each scheme, append a Wearability Profile block using this exact format:

\`\`\`
## Wearability Profile

### Core Layer (mandatory — every scheme must include all 4)

1. **Type-Specific Stability Assessment**
   - Value: [stability verdict based on jewelry-type rules above]
   - Confidence: high/medium/low
   - Source: rule-engine / LLM-inference / design-intent
   - Rationale: [2-3 evidence points from structural description]

2. **Wear Burden Level**
   - Value: Light / Medium / Heavy
   - Confidence: high/medium/low
   - Source: rule-engine / LLM-inference / design-intent
   - Rationale: [structural type + estimated size range + metal thickness]

3. **Recommended Scenarios**
   - Value: [select from: Daily / Evening / Red Carpet / Sports / Collection Display]
   - Confidence: high/medium/low
   - Source: rule-engine / LLM-inference / design-intent
   - Rationale: [presence level + stability + clothing compatibility]

4. **Presence Level**
   - Value: Subtle / Moderate / Striking / Theatrical
   - Confidence: high/medium/low
   - Source: LLM-inference / design-intent
   - Rationale: [visual area + reflectivity + color contrast + movement]

### Extended Layer (include when structurally relevant)

5. **Visual Coverage & Proportion**
   - Value: [description of body-area occupancy]
   - Confidence: high/medium/low
   - Source: LLM-inference / design-intent
   - Rationale: [dimensions relative to body part]

6. **Clothing Compatibility**
   - Value: [e.g., Snags knit / Suitable for structured fabrics / Avoid silk]
   - Confidence: high/medium/low
   - Source: rule-engine / LLM-inference
   - Rationale: [structure type + surface texture + catch/point risks]

7. **Maintenance Sensitivity**
   - Value: [e.g., Oxidation-prone / Avoids sweat / Fragile setting]
   - Confidence: high/medium/low
   - Source: rule-engine / LLM-inference
   - Rationale: [materials + setting type + surface finish]

### Annotated Layer (estimate — explicitly label as such)

8. **Estimated Weight Range**
   - Value: [range, e.g., "8–15g" — NEVER pseudo-precision like "12.4g"]
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: [structure type + material + size bracket]
   - **Label: ESTIMATE — actual weight requires CAD or physical prototype**

9. **Estimated Dimension Range**
   - Value: [range, e.g., "3–5cm" — NEVER pseudo-precision like "42.3mm"]
   - Confidence: low (estimate)
   - Source: LLM-inference
   - Rationale: [structure description + proportional references]
   - **Label: ESTIMATE — actual dimensions require CAD or physical measurement**

### Highlight Layer (design inference — cross-disciplinary depth)

10. **Thermal-Tactile Resonance**
    - Value: [qualitative description of material-skin thermal interaction]
    - Confidence: low (design inference)
    - Source: design-intent
    - Rationale: [primary material thermal properties + skin contact area]
    - Example: "Platinum's cool initial contact transitions to body-temperature neutrality within 30 seconds. Titanium offers a warmer first-touch sensation."

11. **Kinetic-Spatial Feedback**
    - Value: [description of designed movement trajectory and cadence]
    - Confidence: low (design inference)
    - Source: design-intent
    - Rationale: [structural articulation + weight distribution + intended body movement]
    - Example: "Long earrings designed for a 15-degree arc swing with 0.8-second pendulum rhythm during normal head turns."

12. **Dynamic Noise Risk**
    - Value: Silent / Light click / Noticeable clatter / Unsuitable for quiet settings
    - Confidence: medium/low
    - Source: LLM-inference / design-intent
    - Rationale: [loose elements + material hardness + joint types]

13. **Thermal Seasonal Bias**
    - Value: [seasonal wearing recommendation based on material thermal mass]
    - Confidence: low (design inference)
    - Source: design-intent
    - Rationale: [material thermal mass + body contact area + climate considerations]
    - Example: "Large-volume gold feels heavy and warm in summer; titanium remains thermally neutral year-round."
\`\`\`

**CRITICAL RULES**:
- Core Layer fields 1–4 are MANDATORY for every scheme. Missing any is a contract violation.
- Extended Layer fields 5–7 are OPTIONAL — include only when the scheme's structure makes them relevant.
- Annotated Layer fields 8–9 must ALWAYS carry the "ESTIMATE" label and low confidence.
- Highlight Layer fields 10–13 are OPTIONAL — include when they add genuine design insight. Do not force them if the scheme doesn't warrant cross-disciplinary analysis.
- NEVER output pseudo-precision (e.g., "12.4g", "3.2mm", "8.7/10") without explicit CAD/engineering source.
- Every judgment must include a rationale with 2–3 evidence points from the scheme description.`;

const FIELD_SYSTEM_ZH = `## 佩戴性档案格式

每个方案后附加佩戴性档案区块，使用以下严格格式：

\`\`\`
## 佩戴性档案

### 核心层（强制——每个方案必须包含全部4项）

1. **类型专属稳定性评估**
   - 值：[基于上述珠宝类型规则的稳定性结论]
   - 置信度：高/中/低
   - 来源：规则引擎 / LLM推断 / 设计意图
   - 依据：[2-3条来自结构描述的证据点]

2. **佩戴负担等级**
   - 值：轻 / 中 / 重
   - 置信度：高/中/低
   - 来源：规则引擎 / LLM推断 / 设计意图
   - 依据：[结构类型 + 估算尺寸范围 + 金属厚度]

3. **推荐场景**
   - 值：[从以下选择：日常 / 晚宴 / 红毯 / 运动 / 收藏展示]
   - 置信度：高/中/低
   - 来源：规则引擎 / LLM推断 / 设计意图
   - 依据：[存在感等级 + 稳定性 + 服装兼容性]

4. **存在感等级**
   - 值：低调 / 适中 / 醒目 / 戏剧化
   - 置信度：高/中/低
   - 来源：LLM推断 / 设计意图
   - 依据：[视觉面积 + 反光度 + 色彩对比 + 动态感]

### 扩展层（结构相关时包含）

5. **视觉覆盖度与比例**
   - 值：[身体部位占有率的描述]
   - 置信度：高/中/低
   - 来源：LLM推断 / 设计意图
   - 依据：[相对于身体部位的尺寸]

6. **服装兼容性**
   - 值：[例如：易钩针织 / 适合硬挺面料 / 避免丝质]
   - 置信度：高/中/低
   - 来源：规则引擎 / LLM推断
   - 依据：[结构类型 + 表面纹理 + 勾挂/尖端风险]

7. **保养敏感度**
   - 值：[例如：易氧化 / 怕汗液 / 镶嵌脆弱]
   - 置信度：高/中/低
   - 来源：规则引擎 / LLM推断
   - 依据：[材质 + 镶嵌类型 + 表面处理]

### 标注层（估算——必须明确标注）

8. **估算重量区间**
   - 值：[范围，如"8–15g"——绝不用"12.4g"这类伪精确数字]
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：[结构类型 + 材质 + 尺寸档次]
   - **标注：估算——实际重量需CAD或实物原型确认**

9. **估算尺寸范围**
   - 值：[范围，如"3–5cm"——绝不用"42.3mm"这类伪精确数字]
   - 置信度：低（估算）
   - 来源：LLM推断
   - 依据：[结构描述 + 比例参照]
   - **标注：估算——实际尺寸需CAD或实物测量确认**

### 亮点层（设计推断——跨学科深度）

10. **触觉温感响应**
    - 值：[材质-皮肤热交互的定性描述]
    - 置信度：低（设计推断）
    - 来源：设计意图
    - 依据：[主要材质热学属性 + 皮肤接触面积]
    - 示例："铂金初触清凉，30秒内过渡至体温中性。钛金属提供温润的首触感受。"

11. **空间动力学反馈**
    - 值：[设计的运动轨迹和节奏描述]
    - 置信度：低（设计推断）
    - 来源：设计意图
    - 依据：[结构关节 + 重量分布 + 预期身体运动]
    - 示例："长款耳环设计为正常转头时15度弧摆，0.8秒摆锤节奏。"

12. **动态噪音风险**
    - 值：静音 / 轻响 / 明显碰撞 / 不适合安静场合
    - 置信度：中/低
    - 来源：LLM推断 / 设计意图
    - 依据：[松散元素 + 材质硬度 + 关节类型]

13. **热感季节倾向**
    - 值：[基于材质热质量的季度佩戴建议]
    - 置信度：低（设计推断）
    - 来源：设计意图
    - 依据：[材质热质量 + 身体接触面积 + 气候考量]
    - 示例："大体积黄金在夏季感觉沉重温热；钛金属全年保持热中性。"
\`\`\`

**关键规则**：
- 核心层字段1–4为每个方案的强制要求。缺失任何一项即为契约违规。
- 扩展层字段5–7为可选——仅在方案结构使其相关时包含。
- 标注层字段8–9必须始终携带"估算"标签和低置信度。
- 亮点层字段10–13为可选——仅在它们能增添真正的设计洞察时包含。如果方案不具备跨学科分析的价值，不要强行添加。
- 绝不用伪精确数字（如"12.4g"、"3.2mm"、"8.7/10"），除非有明确的CAD/工程来源。
- 每项判断必须包含依据，引用2–3条来自方案描述的证据点。`;

// ── Confidence Grading Guide ───────────────────────────────────────────────

const CONFIDENCE_GUIDE_EN = `## Confidence Grading Guide

Every field must declare its confidence level:

**High**: Based on explicit structural data in the scheme description (e.g., "platinum 2mm band" → high confidence for Wear Burden Level).
**Medium**: Based on inferred relationships between described elements (e.g., "scattered small stones" → medium confidence for Dynamic Noise Risk).
**Low**: Based on design intent or aesthetic judgment without structural anchors (e.g., "Thermal-Tactile Resonance" is always low unless thermal conductivity data is explicitly provided).

**Source Attribution**:
- **rule-engine**: Derived from known physical constraints (max weights, material properties, setting mechanics).
- **LLM-inference**: Derived from the scheme description through reasoning.
- **design-intent**: Reflects the designer's stated artistic intention rather than objective measurement.`;

const CONFIDENCE_GUIDE_ZH = `## 置信度分级指南

每个字段必须声明其置信度等级：

**高**：基于方案描述中的明确结构数据（例如："铂金2mm戒圈" → 佩戴负担等级的高置信度）。
**中**：基于描述元素之间的推断关系（例如："散点小石" → 动态噪音风险的中等置信度）。
**低**：基于设计意图或审美判断，没有结构锚点（例如："触觉温感响应"始终为低，除非明确提供了热导率数据）。

**来源归属**：
- **规则引擎**：来自已知物理约束（最大重量、材质属性、镶嵌机制）。
- **LLM推断**：通过推理从方案描述中得出。
- **设计意图**：反映设计师声明的艺术意图，而非客观测量。`;

// ── Main Export ────────────────────────────────────────────────────────────

export function buildWearabilityPrompt(lang: PromptLanguage): string {
  const isZh = lang === 'zh';
  const physicalLimits = isZh ? PHYSICAL_LIMITS_ZH : PHYSICAL_LIMITS_EN;
  const typeRules = isZh ? TYPE_RULES_ZH : TYPE_RULES_EN;
  const fieldSystem = isZh ? FIELD_SYSTEM_ZH : FIELD_SYSTEM_EN;
  const confidenceGuide = isZh ? CONFIDENCE_GUIDE_ZH : CONFIDENCE_GUIDE_EN;

  return `## Wearability Profile System

${physicalLimits}

${typeRules}

${fieldSystem}

${confidenceGuide}`;
}
