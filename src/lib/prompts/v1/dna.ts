import { DesignerProfile } from './types';

/**
 * Designer DNA Module
 * Structured designer profiles for consistent reference.
 * Each profile is tagged with a DensityArchetype for constraint application.
 * v1.3.1: Enriched with avoid, keyQuote, era, signatureMaterials.
 */

export const DESIGNER_DNA: DesignerProfile[] = [
  {
    name: 'Cindy Chao',
    era: '2004–present',
    keywords: ['sculptural naturalism', 'titanium', 'wax sculpting', '360-degree construction', 'organic flow'],
    signatureTechniques: ['Black-label masterpieces', 'invisible settings', 'wax-to-titanium casting', 'seasonal narrative'],
    signatureMaterials: ['titanium', 'colored gemstones', 'diamonds', 'wax-sculpted forms'],
    philosophy: 'Jewelry is wearable sculpture. Every piece must be beautiful from every angle.',
    avoid: ['flat CAD-blocky forms', 'unarticulated solid blocks', 'prong-heavy settings', 'symmetrical layouts', 'commercial casting'],
    archetype: 'architectural',
    keyQuote: 'Jewelry is wearable sculpture. Every piece must be beautiful from every angle.',
  },
  {
    name: 'Wallace Chan',
    era: '1973–present',
    keywords: ['Zen philosophy', 'Wallace Cut', 'titanium', 'butterfly', 'cicada', 'mortise-and-tenon'],
    signatureTechniques: ['Carving through gemstone', 'meteorite inlay', 'multi-layer transparency', 'titanium mortise-and-tenon'],
    signatureMaterials: ['titanium', 'meteorite', 'carved gemstones', 'jade', 'porcelain'],
    philosophy: "Gemstones have souls. The craftsman's job is to liberate them.",
    avoid: ['traditional prong settings', 'high-polish surfaces', 'symmetrical designs', 'commercial casting', 'machine-made precision'],
    archetype: 'monolithic',
    keyQuote: 'The void is not empty; it is the space where light lives.',
  },
  {
    name: 'JAR (Joel Arthur Rosenthal)',
    era: '1977–present',
    keywords: ['pave gradients', 'oxidized metal', 'surrealist botany', 'micro-pave', 'aluminum anodizing'],
    signatureTechniques: ['Aluminum anodizing', 'color bleeding', 'impossible color combinations', 'hidden settings'],
    signatureMaterials: ['aluminum', 'micro-pavé diamonds', 'colored gemstones', 'oxidized silver'],
    philosophy: 'Jewelry should shock the eye before it seduces it.',
    avoid: ['traditional prong settings', 'high-polish gold', 'symmetrical arrangements', 'visible metal on primary surfaces', 'calibrated gemstones'],
    archetype: 'tapestry',
    keyQuote: 'Jewelry should shock the eye before it seduces it.',
  },
  {
    name: 'Hemmerle',
    era: '1893–present',
    keywords: ['anti-brilliance', 'iron', 'copper', 'wood', 'geometric', 'tension setting', 'raw metal'],
    signatureTechniques: ['Raw metal surfaces', 'contrasting materials', 'engineered structures', 'patinated bronze'],
    signatureMaterials: ['iron', 'copper', 'wood', 'raw diamonds', 'bronze', 'white gold'],
    philosophy: 'Precious is a concept, not a material.',
    avoid: ['high-polish gold', 'traditional brilliant-cut diamonds', 'delicate filigree', 'commercial settings', 'symmetrical layouts'],
    archetype: 'monolithic',
    keyQuote: 'Precious is a concept, not a material.',
  },
  {
    name: 'Shaun Leane',
    era: '1990s–present',
    keywords: ['Gothic romanticism', 'thorns', 'armor', 'tusks', 'Alexander McQueen', 'dark beauty'],
    signatureTechniques: ['Dark beauty', 'organic armor', 'statement pieces', 'black rhodium'],
    signatureMaterials: ['silver', 'black rhodium', 'white gold', 'diamonds', 'enamel'],
    philosophy: 'Beauty and darkness are inseparable.',
    avoid: ['dainty commercial jewelry', 'bright polished finishes', 'conventional romance motifs', 'minimalist restraint', 'delicate scale'],
    archetype: 'architectural',
    keyQuote: 'Beauty and darkness are inseparable.',
  },
  {
    name: 'Bhagat',
    era: '1990s–present',
    keywords: ['Mughal revival', 'enamel', 'jali work', 'symmetry', 'imperial', 'pietra dura'],
    signatureTechniques: ['Pietra dura', 'micro-mosaic', 'heritage techniques', 'Mughal filigree'],
    signatureMaterials: ['platinum', 'diamonds', 'emeralds', 'rubies', 'sapphires', 'enamel'],
    philosophy: 'The past is the future of luxury.',
    avoid: ['thick metal bands', 'solid metal planes', 'cluster settings', 'modern abstract forms', 'asymmetric layouts'],
    archetype: 'lace',
    keyQuote: 'The past is the future of luxury.',
  },
  {
    name: 'Michelle Ong',
    era: '1980s–present',
    keywords: ['Carnet', 'East-West fusion', 'imperial jade', 'nature motifs', 'titanium lace', 'ruyi'],
    signatureTechniques: ['Jade carving', 'Chinese symbolism', 'understated elegance', 'titanium filigree'],
    signatureMaterials: ['titanium', 'imperial jade', 'diamonds', 'colored gemstones', 'gold'],
    philosophy: 'East meets West in a whisper, not a shout.',
    avoid: ['heavy metal structures', 'Western-centric motifs', 'symmetrical layouts', 'mass-produced settings', 'bright polished surfaces'],
    archetype: 'lace',
    keyQuote: 'East meets West in a whisper, not a shout.',
  },
  {
    name: 'Lauren Adriana',
    era: '2010s–present',
    keywords: ['contemporary classical', 'enamel', 'sculptural settings', 'color theory', 'art deco'],
    signatureTechniques: ['Plique-a-jour', 'art nouveau revival', 'chromatic harmony', 'geometric enamel'],
    signatureMaterials: ['gold', 'enamel', 'spinels', 'zircons', 'sapphires', 'tourmalines'],
    philosophy: 'Classical techniques, contemporary vision.',
    avoid: ['overly traditional designs', 'mismatched color palettes', 'commercial casting', 'symmetric compositions', 'generic gemstone settings'],
    archetype: 'architectural',
    keyQuote: 'Classical techniques, contemporary vision.',
  },
  {
    name: 'Sevan Bicakci',
    era: '2000s–present',
    keywords: ['micro-mosaic', 'reverse intaglio', 'Ottoman heritage', 'dimensional', 'miniature painting'],
    signatureTechniques: ['Ring-within-ring', 'hidden compartments', 'miniature painting', 'reverse intaglio'],
    signatureMaterials: ['silver', 'gold', 'micro-mosaic', 'reverse intaglio gemstones', 'diamonds'],
    philosophy: 'A ring is a universe you wear on your finger.',
    avoid: ['flat bands', 'simple solitaires', 'Western minimalism', 'machine-made precision', 'commercial settings'],
    archetype: 'monolithic',
    keyQuote: 'A ring is a universe you wear on your finger.',
  },
  {
    name: 'Andrew Grima',
    era: '1960s–2000s',
    keywords: ['textured gold', 'raw crystals', 'Brutalist jewelry', 'organic forms', 'hammered surfaces'],
    signatureTechniques: ['Hammered surfaces', 'uncut stones', 'architectural settings', 'textured gold'],
    signatureMaterials: ['textured gold', 'raw crystals', 'uncut gemstones', 'diamonds', 'pearls'],
    philosophy: 'Let the material speak for itself.',
    avoid: ['high-polish finishes', 'calibrated gemstones', 'delicate settings', 'symmetrical designs', 'machine-made precision'],
    archetype: 'monolithic',
    keyQuote: 'Let the material speak for itself.',
  },
  {
    name: 'Suzanne Belperron',
    era: '1919–1983',
    keywords: ['Parisian chic', 'carved gemstones', 'soft geometry', 'understated', 'overlapping forms'],
    signatureTechniques: ['Overlapping forms', 'carved chalcedony', 'invisible mechanics', 'sculpted gold'],
    signatureMaterials: ['carved chalcedony', 'carved gemstones', 'gold', 'platinum', 'diamonds'],
    philosophy: 'Elegance is refusal.',
    avoid: ['prong settings', 'machine-made precision', 'conventional symmetry', 'bright polish', 'commercial settings'],
    archetype: 'monolithic',
    keyQuote: 'Elegance is refusal.',
  },
  {
    name: 'Verdura',
    era: '1939–present',
    keywords: ['Sicilian', 'maltese cross', 'bold color', 'rococo revival', 'tropical exuberance'],
    signatureTechniques: ['Cabochon clusters', 'ribbon motifs', 'tropical exuberance', 'wax-cast shells'],
    signatureMaterials: ['gold', 'cabochon gemstones', 'colored gemstones', 'diamonds', 'enamel'],
    philosophy: 'Jewelry should make you smile.',
    avoid: ['minimalist designs', 'cool-toned palettes', 'angular geometry', 'understated scale', 'monochrome schemes'],
    archetype: 'tapestry',
    keyQuote: 'Jewelry should make you smile.',
  },
];

export function buildDesignerDNA(): string {
  const profiles = DESIGNER_DNA.map((d) => {
    return `- **${d.name}** [${d.archetype}] — ${d.era}
  Keywords: ${d.keywords.join(', ')}
  Techniques: ${d.signatureTechniques.join(', ')}
  Materials: ${d.signatureMaterials.join(', ')}
  Philosophy: "${d.philosophy}"
  Key Quote: "${d.keyQuote}"
  NEVER: ${d.avoid.join(', ')}`;
  }).join('\n');

  return `## Designer DNA Reference (12 Masters)

When analyzing a design concept, consider which designers' DNA would best serve the vision. Draw techniques, materials, and compositional approaches from their profiles.

**FUSION RULE:** When combining 2-3 designers, designate ONE as the **Structural Lead** (determines archetype/density) and the others as **Aesthetic Contributors** (techniques, motifs, materials). Do NOT blend densities 50/50.

**Density Archetype Legend:**
- **lace**: Structural air, high negative space (Bhagat, Michelle Ong)
- **architectural**: Sculptural flow, balanced density (Cindy Chao, Shaun Leane, Lauren Adriana)
- **tapestry**: Surface richness, dense coverage (JAR, Verdura)
- **monolithic**: Mass & texture, solid volume (Grima, Wallace Chan, Hemmerle, Sevan, Belperron)

${profiles}`;
}
