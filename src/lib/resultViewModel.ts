import { Message, SchemeMeta } from './types';

export interface ParsedSchemeSection {
  id: string;
  heading: string;
  title?: string;
  markdown: string;
  imagePrompt?: string;
}

export interface ParsedResultViewModel {
  hasStructuredResult: boolean;
  introMarkdown?: string;
  schemes: ParsedSchemeSection[];
  comparisonTableMarkdown?: string;
  rawMarkdown: string;
}

const SCHEME_HEADING = /^(###\s*(?:Scheme|方案)\s+([A-Z0-9]+)(?::\s*(.+))?)$/gim;
const COMPARISON_TABLE_START = /(^\|\s*(?:Aspect|维度)\s*\|.*$)/im;
const META_BLOCK = /```(?:json\s+)?coreling_meta[\s\S]*?```/g;

function normalizeSchemeId(value: string): string {
  return value.trim().toUpperCase().replace(/^SCHEME\s+/i, '').replace(/^方案\s+/i, '');
}

function getImagePrompt(meta: SchemeMeta | undefined, id: string): string | undefined {
  return meta?.schemes.find((scheme) => scheme.id === id)?.imagePrompt;
}

function stripMetaBlock(text: string): string {
  return text.replace(META_BLOCK, '').trim();
}

export function parseCorelingMeta(text: string): SchemeMeta | undefined {
  try {
    const match = text.match(/```json coreling_meta\n([\s\S]*?)\n```/);
    if (!match) return undefined;

    const meta: SchemeMeta = JSON.parse(match[1]);
    if (!Array.isArray(meta.schemes)) return undefined;

    const schemes = meta.schemes.filter((scheme) => scheme.id && scheme.title && scheme.imagePrompt);
    if (schemes.length === 0) return undefined;

    return {
      ...meta,
      schemes: schemes.map((scheme) => ({
        ...scheme,
        id: normalizeSchemeId(scheme.id),
      })),
    };
  } catch {
    return undefined;
  }
}

export function parseResultViewModel(message: Message): ParsedResultViewModel {
  const rawMarkdown = stripMetaBlock(message.text);
  const comparisonMatch = rawMarkdown.match(COMPARISON_TABLE_START);
  const comparisonStart = comparisonMatch?.index ?? -1;
  const contentBeforeTable = comparisonStart >= 0 ? rawMarkdown.slice(0, comparisonStart).trim() : rawMarkdown;
  const comparisonTableMarkdown = comparisonStart >= 0 ? rawMarkdown.slice(comparisonStart).trim() : undefined;

  const matches = [...contentBeforeTable.matchAll(SCHEME_HEADING)];
  if (matches.length === 0) {
    return {
      hasStructuredResult: false,
      introMarkdown: rawMarkdown,
      schemes: [],
      comparisonTableMarkdown,
      rawMarkdown,
    };
  }

  const introMarkdown = contentBeforeTable.slice(0, matches[0].index).trim() || undefined;
  const schemes: ParsedSchemeSection[] = matches.map((match, index) => {
    const fullHeading = match[1].trim();
    const id = normalizeSchemeId(match[2]);
    const title = match[3]?.trim();
    const start = match.index ?? 0;
    const end = index + 1 < matches.length ? matches[index + 1].index ?? contentBeforeTable.length : contentBeforeTable.length;
    const markdown = contentBeforeTable.slice(start, end).trim();

    return {
      id,
      heading: fullHeading,
      title,
      markdown,
      imagePrompt: getImagePrompt(message.meta, id),
    };
  });

  return {
    hasStructuredResult: schemes.length > 0,
    introMarkdown,
    schemes,
    comparisonTableMarkdown,
    rawMarkdown,
  };
}
