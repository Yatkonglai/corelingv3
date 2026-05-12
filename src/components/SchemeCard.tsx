"use client";

import { Sparkles } from "lucide-react";
import { ParsedSchemeSection } from "../lib/resultViewModel";

interface SchemeCardProps {
  scheme: ParsedSchemeSection;
  language: "en" | "zh";
  sourceText: string;
  onGenerateImage: (sourceText: string, schemeName?: string, imagePrompt?: string) => void;
}

export default function SchemeCard({ scheme, language, sourceText, onGenerateImage }: SchemeCardProps) {
  return (
    <div className="rounded-2xl border border-[#ebebeb] p-4">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-[#222222]">{scheme.heading}</p>
          {scheme.title && <p className="text-sm text-[#6a6a6a]">{scheme.title}</p>}
        </div>
        <span className="rounded-full bg-[#f7f7f7] px-2.5 py-1 text-xs text-[#6a6a6a]">{scheme.id}</span>
      </div>
      <button
        onClick={() => onGenerateImage(sourceText, scheme.heading, scheme.imagePrompt)}
        className="mt-2 inline-flex h-11 items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-4 text-xs font-medium text-[#ff385c] transition-colors hover:border-[#ff385c] hover:bg-[#fff8f6]"
      >
        <Sparkles size={14} />
        {language === "zh" ? "生成效果图" : "Generate visual"}
      </button>
    </div>
  );
}
