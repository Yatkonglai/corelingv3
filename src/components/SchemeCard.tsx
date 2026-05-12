"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Sparkles, Heart, ChevronDown, ChevronUp } from "lucide-react";
import { ParsedSchemeSection } from "../lib/resultViewModel";
import { isFavorite, toggleFavorite } from "../lib/favorites";

interface SchemeCardProps {
  scheme: ParsedSchemeSection;
  language: "en" | "zh";
  sourceText: string;
  onGenerateImage: (sourceText: string, schemeName?: string, imagePrompt?: string) => void;
}

function stripHeading(markdown: string): string {
  return markdown.replace(/^###\s*(?:Scheme|方案)\s*[A-Z0-9]+.*$/m, "").trim();
}

export default function SchemeCard({ scheme, language, sourceText, onGenerateImage }: SchemeCardProps) {
  const [expanded, setExpanded] = useState(true);
  const [liked, setLiked] = useState(() => isFavorite(scheme.id));

  const bodyMarkdown = stripHeading(scheme.markdown);

  return (
    <div id={`scheme-${scheme.id}`} className="rounded-2xl border border-[#ebebeb] bg-white p-4 shadow-sm">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#222222]">{scheme.heading}</p>
          {scheme.title && <p className="text-sm text-[#6a6a6a]">{scheme.title}</p>}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              const next = toggleFavorite(scheme.id, scheme.heading);
              setLiked(next);
            }}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#929292] transition-colors hover:bg-[#fff1f4] hover:text-[#ff385c]"
            title={language === "zh" ? "收藏" : "Favorite"}
          >
            <Heart size={16} className={liked ? "fill-[#ff385c] text-[#ff385c]" : ""} />
          </button>
          <span className="rounded-full bg-[#f7f7f7] px-2.5 py-1 text-xs text-[#6a6a6a]">{scheme.id}</span>
        </div>
      </div>

      {/* Expand/Collapse toggle */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="mb-2 flex items-center gap-1 text-xs font-medium text-[#ff385c] hover:text-[#e00b41] transition-colors"
      >
        {expanded ? (
          <>
            <ChevronUp size={14} />
            {language === "zh" ? "收起详情" : "Collapse details"}
          </>
        ) : (
          <>
            <ChevronDown size={14} />
            {language === "zh" ? "展开详情" : "Expand details"}
          </>
        )}
      </button>

      {/* Markdown Content */}
      {expanded && (
        <div className="mb-4 rounded-xl bg-[#fafafa] p-3 text-[13px] leading-relaxed text-[#444444]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => <h1 className="text-sm font-bold mt-3 mb-1 text-[#222222]" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-sm font-bold mt-3 mb-1 text-[#222222]" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-sm font-semibold mt-2 mb-1 text-[#222222]" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-semibold text-[#222222]" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc ml-4 my-1 space-y-0.5" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal ml-4 my-1 space-y-0.5" {...props} />,
              li: ({ node, ...props }) => <li className="pl-0.5" {...props} />,
              p: ({ node, ...props }) => <p className="mb-1.5 last:mb-0" {...props} />,
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto my-2 rounded-lg border border-[#ebebeb]">
                  <table className="min-w-full text-left text-xs border-collapse" {...props} />
                </div>
              ),
              thead: ({ node, ...props }) => <thead className="bg-[#f0f0f0] text-[#222222] font-semibold" {...props} />,
              tbody: ({ node, ...props }) => <tbody className="bg-white divide-y divide-[#ebebeb]" {...props} />,
              tr: ({ node, ...props }) => <tr className="hover:bg-[#f7f7f7] transition-colors" {...props} />,
              th: ({ node, ...props }) => <th className="p-2 border-r border-[#ebebeb] last:border-r-0 whitespace-nowrap" {...props} />,
              td: ({ node, ...props }) => <td className="p-2 border-r border-[#ebebeb] last:border-r-0 align-top" {...props} />,
            }}
          >
            {bodyMarkdown}
          </ReactMarkdown>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onGenerateImage(sourceText, scheme.heading, scheme.imagePrompt)}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-4 text-xs font-medium text-[#ff385c] transition-colors hover:border-[#ff385c] hover:bg-[#fff8f6]"
        >
          <Sparkles size={14} />
          {language === "zh" ? "生成效果图" : "Generate visual"}
        </button>
      </div>
    </div>
  );
}
