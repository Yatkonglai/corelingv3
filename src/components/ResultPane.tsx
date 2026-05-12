"use client";

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
  const intro =
    result.introMarkdown ||
    (language === "zh"
      ? "已识别到结构化方案。先快速浏览，再决定要出图或继续深化哪个方向。"
      : "A structured result was detected. Review first, then decide which direction to visualize or refine.");

  return (
    <div>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[#222222]">
            {language === "zh" ? "本轮结果" : "Current result"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-[#6a6a6a]">{intro}</p>
        </div>
        {headerExtra}
      </div>

      <div className="space-y-3">
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

      <div className="mt-4 rounded-2xl bg-[#f7f7f7] px-4 py-3 text-xs leading-6 text-[#6a6a6a]">
        {language === "zh"
          ? "原始完整内容仍保留在对话区，当前面板只负责帮助你更快识别方案与下一步动作。"
          : "The full original content remains in the conversation area. This panel only helps you identify schemes and next actions faster."}
      </div>
    </div>
  );
}
