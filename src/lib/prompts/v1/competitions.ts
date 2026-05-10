import { CompetitionProfile, PromptLanguage } from './types';

/**
 * Competition Criteria Data Module
 * Structured data for 6 major international jewelry competitions.
 * Each profile includes weighted criteria and judge notes.
 * Version: 1.2.0
 */

export const COMPETITION_DATA: CompetitionProfile[] = [
  {
    id: 'git',
    nameEn: 'GIT (Gemological Institute of Thailand) World Jewellery Design Awards',
    nameZh: 'GIT 世界珠宝设计大奖赛',
    criteriaEn: [
      { name: 'Concept & Narrative', weight: 25, description: 'Originality of story and emotional depth' },
      { name: 'Design Aesthetics', weight: 20, description: 'Visual appeal, balance, and composition' },
      { name: 'Technical Feasibility', weight: 20, description: 'Manufacturing viability and material logic' },
      { name: 'Innovation', weight: 15, description: 'Novel use of materials or techniques' },
      { name: 'Wearability', weight: 10, description: 'Comfort and practical use' },
      { name: 'Theme Alignment', weight: 10, description: 'Adherence to annual theme (if applicable)' },
    ],
    criteriaZh: [
      { name: '概念与叙事', weight: 25, description: '故事原创性与情感深度' },
      { name: '设计美学', weight: 20, description: '视觉吸引力、平衡与构图' },
      { name: '技术可行性', weight: 20, description: '制造可行性与材质逻辑' },
      { name: '创新性', weight: 15, description: '材料或工艺的新颖运用' },
      { name: '佩戴性', weight: 10, description: '舒适度与实用性' },
      { name: '主题契合', weight: 10, description: '与年度主题的契合度（如适用）' },
    ],
    notesEn: 'GIT favors bold storytelling and Thai cultural elements. Judges appreciate designs that tell a clear story. Asian aesthetics and cultural symbolism score well.',
    notesZh: 'GIT 偏好大胆的叙事和泰国文化元素。评委欣赏能讲述清晰故事的设计。亚洲美学和文化象征得分较高。',
  },
  {
    id: 'agta-spectrum',
    nameEn: 'AGTA Spectrum Awards',
    nameZh: 'AGTA Spectrum 奖',
    criteriaEn: [
      { name: 'Gemstone Use & Appreciation', weight: 30, description: 'How well the design showcases the gemstone(s)' },
      { name: 'Craftsmanship & Technique', weight: 25, description: 'Quality of metalwork, setting, and finish' },
      { name: 'Design Originality', weight: 20, description: 'Uniqueness and creativity' },
      { name: 'Wearability', weight: 15, description: 'Comfort and practicality for daily or special occasion wear' },
      { name: 'Market Appeal', weight: 10, description: 'Commercial viability and desirability' },
    ],
    criteriaZh: [
      { name: '宝石运用与鉴赏', weight: 30, description: '设计如何展示宝石' },
      { name: '工艺与技法', weight: 25, description: '金属工艺、镶嵌和表面处理质量' },
      { name: '设计原创性', weight: 20, description: '独特性与创意' },
      { name: '佩戴性', weight: 15, description: '日常或特殊场合佩戴的舒适度与实用性' },
      { name: '市场吸引力', weight: 10, description: '商业可行性与吸引力' },
    ],
    notesEn: 'AGTA is gemstone-centric. The stone MUST be the hero, but through sophisticated setting and design — not size. Micro-pavé and invisible settings are highly valued. Color gem expertise is critical.',
    notesZh: 'AGTA 以宝石为中心。宝石必须是主角，但通过精湛的镶嵌和设计——而非尺寸。微镶和隐形镶备受重视。彩色宝石专业知识至关重要。',
  },
  {
    id: 'saul-bell',
    nameEn: 'Saul Bell Design Award',
    nameZh: 'Saul Bell 设计奖',
    criteriaEn: [
      { name: 'Technical Excellence', weight: 30, description: 'Precision of construction, setting, and metalwork' },
      { name: 'Artistic Merit', weight: 25, description: 'Aesthetic quality and artistic vision' },
      { name: 'Wearability', weight: 20, description: 'Comfort, balance, and ergonomics' },
      { name: 'Innovation', weight: 15, description: 'New techniques, materials, or concepts' },
      { name: 'Photography Presentation', weight: 10, description: 'Quality of entry images and presentation' },
    ],
    criteriaZh: [
      { name: '技术卓越', weight: 30, description: '构造、镶嵌和金属工艺的精确度' },
      { name: '艺术价值', weight: 25, description: '美学品质与艺术视野' },
      { name: '佩戴性', weight: 20, description: '舒适度、平衡性与人体工学' },
      { name: '创新性', weight: 15, description: '新工艺、新材料或新概念' },
      { name: '摄影呈现', weight: 10, description: '参赛作品图像与呈现质量' },
    ],
    notesEn: 'Saul Bell emphasizes technical mastery above all. Judges are often bench jewelers who scrutinize construction details. The piece must be technically achievable and photograph beautifully.',
    notesZh: 'Saul Bell 最强调技术精湛。评委通常是仔细检查构造细节的 bench jewelers。作品必须在技术上可实现，并在摄影中呈现精美。',
  },
  {
    id: 'couture',
    nameEn: 'Couture Design Awards',
    nameZh: 'Couture 设计奖',
    criteriaEn: [
      { name: 'Luxury Appeal', weight: 25, description: 'Does it feel like high jewelry, not fashion jewelry?' },
      { name: 'Design Innovation', weight: 25, description: 'New ideas, unexpected combinations, fresh perspective' },
      { name: 'Craftsmanship Quality', weight: 20, description: 'Finish detail, precision, and material quality' },
      { name: 'Wearability & Function', weight: 15, description: 'Comfort, security, and practical wear' },
      { name: 'Brand Story & Cohesion', weight: 15, description: 'Does it fit a cohesive collection narrative?' },
    ],
    criteriaZh: [
      { name: '奢华感', weight: 25, description: '是否感觉像高级珠宝，而非时尚珠宝？' },
      { name: '设计创新', weight: 25, description: '新想法、意外组合、全新视角' },
      { name: '工艺品质', weight: 20, description: '表面处理细节、精确度与材质品质' },
      { name: '佩戴性与功能', weight: 15, description: '舒适度、安全性与实际佩戴' },
      { name: '品牌故事与连贯性', weight: 15, description: '是否契合连贯的系列叙事？' },
    ],
    notesEn: 'Couture is about luxury positioning. The piece must scream "high jewelry" — extraordinary materials, exceptional craft, and aspirational appeal. Judges look for pieces that would stop someone on the red carpet.',
    notesZh: 'Couture 关乎奢华定位。作品必须彰显"高级珠宝"——非凡材质、卓越工艺和令人向往的吸引力。评委寻找能在红毯上让人驻足的作品。',
  },
  {
    id: 'red-dot',
    nameEn: 'Red Dot Design Award (Jewelry Category)',
    nameZh: '红点设计奖（珠宝类别）',
    criteriaEn: [
      { name: 'Innovation Level', weight: 30, description: 'Degree of novelty in concept, form, or technology' },
      { name: 'Functional Quality', weight: 20, description: 'Usability, ergonomics, and practical function' },
      { name: 'Formal Quality', weight: 20, description: 'Aesthetic design, proportions, and material choice' },
      { name: 'Symbolic & Emotional Content', weight: 15, description: 'Meaning, storytelling, and emotional resonance' },
      { name: 'Ecological Responsibility', weight: 15, description: 'Sustainable materials, production, and lifecycle' },
    ],
    criteriaZh: [
      { name: '创新程度', weight: 30, description: '概念、形态或技术的新颖度' },
      { name: '功能品质', weight: 20, description: '可用性、人体工学与实用功能' },
      { name: '形式品质', weight: 20, description: '美学设计、比例与材质选择' },
      { name: '象征与情感内涵', weight: 15, description: '意义、叙事与情感共鸣' },
      { name: '生态责任', weight: 15, description: '可持续材料、生产与生命周期' },
    ],
    notesEn: 'Red Dot is design-first, not jewelry-first. Industrial design thinking scores highly. Sustainability and material innovation are increasingly important. The piece should feel like a design object that happens to be jewelry.',
    notesZh: '红点以设计为先，而非珠宝为先。工业设计思维得分高。可持续性和材料创新日益重要。作品应感觉像恰好是珠宝的设计物件。',
  },
  {
    id: 'a-design',
    nameEn: "A' Design Award (Jewelry, Eyewear and Watch Design)",
    nameZh: "A' 设计奖（珠宝、眼镜与腕表设计）",
    criteriaEn: [
      { name: 'Innovation & Uniqueness', weight: 25, description: 'Novelty in concept, technique, or material' },
      { name: 'Aesthetic Value', weight: 20, description: 'Beauty, harmony, and visual impact' },
      { name: 'Functionality & Ergonomics', weight: 20, description: 'Comfort, wearability, and user experience' },
      { name: 'Technical Realization', weight: 15, description: 'Manufacturing feasibility and engineering logic' },
      { name: 'Emotional Impact', weight: 10, description: 'Storytelling and emotional resonance' },
      { name: 'Sustainability', weight: 10, description: 'Environmental and social responsibility' },
    ],
    criteriaZh: [
      { name: '创新与独特性', weight: 25, description: '概念、工艺或材料的新颖度' },
      { name: '美学价值', weight: 20, description: '美感、和谐与视觉冲击力' },
      { name: '功能与人体工学', weight: 20, description: '舒适度、佩戴性与用户体验' },
      { name: '技术实现', weight: 15, description: '制造可行性与工程逻辑' },
      { name: '情感冲击', weight: 10, description: '叙事与情感共鸣' },
      { name: '可持续性', weight: 10, description: '环境与社会责任' },
    ],
    notesEn: "A' Design balances artistic vision with technical proof. The entry must include clear technical drawings and material specifications. Judges are a mix of designers, engineers, and academics. Cross-disciplinary appeal helps.",
    notesZh: "A' 设计平衡艺术视野与技术证明。参赛作品必须包含清晰的技术图纸和材质规格。评委由设计师、工程师和学者组成。跨学科吸引力有帮助。",
  },
];

/**
 * Build the competition criteria section of the system prompt.
 * In compressed mode (phase !== 'scheme-generation'), only competition names
 * and top-weighted criteria are included to save tokens.
 */
export function buildCompetitionCriteria(lang: PromptLanguage, compressed: boolean = false): string {
  const isZh = lang === 'zh';

  const header = isZh
    ? `## 国际珠宝竞赛评审标准参考\n\n设计时参考以下竞赛标准。每个方案应明确标注最契合的1-2个竞赛。`
    : `## International Jewelry Competition Criteria Reference\n\nReference these competition standards when designing. Each scheme should explicitly name the 1-2 competitions it best fits.`;

  const profiles = COMPETITION_DATA.map((comp) => {
    const name = isZh ? comp.nameZh : comp.nameEn;
    const criteria = isZh ? comp.criteriaZh : comp.criteriaEn;
    const notes = isZh ? comp.notesZh : comp.notesEn;

    if (compressed) {
      // Compressed: only name + top 3 criteria + one-line notes
      const top3 = criteria
        .sort((a, b) => b.weight - a.weight)
        .slice(0, 3)
        .map((c) => `${c.name} (${c.weight}%)`)
        .join(', ');
      return `- **${name}**: ${top3}. ${notes}`;
    }

    // Full mode: all criteria with weights
    const criteriaLines = criteria
      .sort((a, b) => b.weight - a.weight)
      .map((c) => `  - ${c.name}: ${c.weight}% — ${c.description}`)
      .join('\n');

    return `### ${name}\n\n**评审标准**:\n${criteriaLines}\n\n**评委洞察**: ${notes}`;
  }).join('\n\n');

  return `${header}\n\n${profiles}`;
}

/**
 * Get a single competition profile by ID.
 */
export function getCompetitionById(id: string): CompetitionProfile | undefined {
  return COMPETITION_DATA.find((c) => c.id === id);
}

/**
 * Get competition names as a comma-separated string.
 * Used in compact prompts.
 */
export function getCompetitionNames(lang: PromptLanguage): string {
  return COMPETITION_DATA.map((c) => (lang === 'zh' ? c.nameZh : c.nameEn)).join(', ');
}
