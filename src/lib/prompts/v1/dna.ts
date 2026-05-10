import { DesignerProfile } from './types';

/**
 * Designer DNA Module
 * Structured designer profiles for consistent reference.
 */

export const DESIGNER_DNA: DesignerProfile[] = [
  {
    name: 'Cindy Chao',
    keywords: ['sculptural naturalism', 'titanium', 'wax sculpting', '360-degree construction'],
    signatureTechniques: ['Black-label masterpieces', 'invisible settings', 'organic flow'],
    philosophy: 'Jewelry is wearable sculpture. Every piece must be beautiful from every angle.',
  },
  {
    name: 'Wallace Chan',
    keywords: ['Zen philosophy', 'Wallace Cut', 'titanium', 'butterfly', 'cicada'],
    signatureTechniques: ['Carving through gemstone', 'meteorite inlay', 'multi-layer transparency'],
    philosophy: 'Gemstones have souls. The craftsman\'s job is to liberate them.',
  },
  {
    name: 'JAR (Joel Arthur Rosenthal)',
    keywords: ['pave gradients', 'oxidized metal', 'surrealist botany', 'micro-pave'],
    signatureTechniques: ['Aluminum anodizing', 'color bleeding', 'impossible color combinations'],
    philosophy: 'Jewelry should shock the eye before it seduces it.',
  },
  {
    name: 'Hemmerle',
    keywords: ['anti-brilliance', 'iron', 'copper', 'wood', 'geometric', 'tension setting'],
    signatureTechniques: ['Raw metal surfaces', 'contrasting materials', 'engineered structures'],
    philosophy: 'Precious is a concept, not a material.',
  },
  {
    name: 'Shaun Leane',
    keywords: ['Gothic romanticism', 'thorns', 'armor', 'tusks', 'Alexander McQueen'],
    signatureTechniques: ['Dark beauty', 'organic armor', 'statement pieces'],
    philosophy: 'Beauty and darkness are inseparable.',
  },
  {
    name: 'Bhagat',
    keywords: ['Mughal revival', 'enamel', 'jali work', 'symmetry', 'imperial'],
    signatureTechniques: ['Pietra dura', 'micro-mosaic', 'heritage techniques'],
    philosophy: 'The past is the future of luxury.',
  },
  {
    name: 'Michelle Ong',
    keywords: ['Carnet', 'East-West fusion', 'imperial jade', 'nature motifs'],
    signatureTechniques: ['Jade carving', 'Chinese symbolism', 'understated elegance'],
    philosophy: 'East meets West in a whisper, not a shout.',
  },
  {
    name: 'Lauren Adriana',
    keywords: ['contemporary classical', 'enamel', 'sculptural settings', 'color theory'],
    signatureTechniques: ['Plique-a-jour', 'art nouveau revival', 'chromatic harmony'],
    philosophy: 'Classical techniques, contemporary vision.',
  },
  {
    name: 'Sevan Bicakci',
    keywords: ['micro-mosaic', 'reverse intaglio', 'Ottoman heritage', 'dimensional'],
    signatureTechniques: ['Ring-within-ring', 'hidden compartments', 'miniature painting'],
    philosophy: 'A ring is a universe you wear on your finger.',
  },
  {
    name: 'Andrew Grima',
    keywords: ['textured gold', 'raw crystals', 'Brutalist jewelry', 'organic forms'],
    signatureTechniques: ['Hammered surfaces', 'uncut stones', 'architectural settings'],
    philosophy: 'Let the material speak for itself.',
  },
  {
    name: 'Suzanne Belperron',
    keywords: ['Parisian chic', 'carved gemstones', 'soft geometry', 'understated'],
    signatureTechniques: ['Overlapping forms', 'carved chalcedony', 'invisible mechanics'],
    philosophy: 'Elegance is refusal.',
  },
  {
    name: 'Verdura',
    keywords: ['Sicilian', 'maltese cross', 'bold color', 'rococo revival'],
    signatureTechniques: ['Cabochon clusters', 'ribbon motifs', 'tropical exuberance'],
    philosophy: 'Jewelry should make you smile.',
  },
];

export function buildDesignerDNA(): string {
  const profiles = DESIGNER_DNA.map((d) => {
    return `- **${d.name}**: ${d.keywords.join(', ')}
  Signature: ${d.signatureTechniques.join(', ')}
  Philosophy: "${d.philosophy}"`;
  }).join('\n');

  return `## Designer DNA Reference (12 Masters)

When analyzing a design concept, consider which designers' DNA would best serve the vision. Draw techniques, materials, and compositional approaches from their profiles.

${profiles}`;
}
