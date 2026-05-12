"use client";

import { useRef } from "react";
import { ParsedResultViewModel } from "../lib/resultViewModel";
import SchemeCard from "./SchemeCard";

interface ResultPaneProps {
  result: ParsedResultViewModel;
  language: "en" | "zh";
  sourceText: string;
  onGenerateImage: (sourceText: string, schemeName?: string, imagePrompt?: string) => void;
  headerExtra?: React.ReactNode;
}

export default function ResultPane({ result, language, sourceText, onGenerateImage, headerExtra }: ResultPaneProps) {
  const paneRef = useRef<HTMLDivElement>(null);

  const intro =
    result.introMarkdown ||
    (language === "zh"
      ? "已识别到结构化方案。先快速浏览，再决定要出图或继续深化哪个方向。"
      : "A structured result was detected. Review first, then decide which direction to visualize or refine.");

  const scrollToScheme = (id: string) => {
    const el = paneRef.current?.querySelector(`#scheme-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div ref={paneRef}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#222222]">
            {language === "zh" ? "本轮结果" : "Current result"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-[#6a6a6a]">{intro}</p>
        </div>
        {headerExtra}
      </div>

      {/* Scheme Quick Nav */}
      {result.schemes.length > 0 && (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {result.schemes.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => scrollToScheme(scheme.id)}
              className="shrink-0 rounded-full border border-[#ebebeb] bg-white px-3 py-1.5 text-xs font-medium text-[#444444] transition-colors hover:border-[#ff385c] hover:text-[#ff385c]"
            >
              {scheme.id}
              {scheme.title ? ` · ${scheme.title}` : ""}
            </button>
          ))}
          {result.comparisonTableMarkdown && (
            <button
              onClick={() => {
                const el = paneRef.current?.querySelector("#comparison-table");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="shrink-0 rounded-full border border-[#ebebeb] bg-white px-3 py-1.5 text-xs font-medium text-[#444444] transition-colors hover:border-[#ff385c] hover:text-[#ff385c]"
            >
              {language === "zh" ? "对比表" : "Compare"}
            </button>
          )}
        </div>
      )}

      <div className="space-y-4">
        {result.schemes.map((scheme) => (
          <SchemeCard
            key={scheme.id}
            scheme={scheme}
            language={language}
            sourceText={sourceText}
            onGenerateImage={onGenerateImage}
          />
        ))}
      </div>

      {result.comparisonTableMarkdown && (
        <div id="comparison-table" className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-[#222222]">
            {language === "zh" ? "方案对比" : "Scheme Comparison"}
          </h3>
          <div className="rounded-xl bg-[#fafafa] p-3 text-[13px] leading-relaxed text-[#444444] overflow-x-auto">
            {/* Comparison table would be rendered here if needed */}
            <p className="text-xs text-[#929292]">
              {language === "zh"
                ? "对比表格内容请见对话区原始输出。"
                : "See the conversation area for the full comparison table."}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 rounded-2xl bg-[#f7f7f7] px-4 py-3 text-xs leading-6 text-[#6a6a6a]">
        {language === "zh"
          ? "原始完整内容仍保留在对话区，当前面板只负责帮助你更快识别方案与下一步动作。"
          : "The full original content remains in the conversation area. This panel only helps you identify schemes and next actions faster."}
      </div>
    </div>
  );
}
