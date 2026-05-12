"use client";

import { Sparkles } from "lucide-react";

interface HomeHeroProps {
  language: "en" | "zh";
  mode: string;
  onSelectPrompt: (prompt: string) => void;
}

const STARTER_PROMPTS: Record<string, string[]> = {
  zh: [
    "我想做一个以东方婚礼为灵感的高级珠宝系列",
    "先给我 3 个适合日常佩戴的胸针方向",
    "把这个概念做得更适合国际设计大奖投稿",
  ],
  en: [
    "I want a high jewelry series inspired by an Eastern wedding.",
    "Give me 3 brooch directions suitable for everyday wear.",
    "Refine this concept for international design award submission.",
  ],
};

const HERO_COPY: Record<string, { title: string; description: string; badge: string; label: string }> = {
  zh: {
    title: "让珠宝概念更快变成可读、可选、可推进的设计方案",
    description:
      "从灵感澄清、方案生成到效果图推进，CoreLING 帮你更快得到结构清晰、便于比较和继续深化的设计输出。",
    badge: "AI 高级珠宝设计工作台",
    label: "推荐起手方式",
  },
  en: {
    title: "Turn jewelry concepts into readable, actionable design directions",
    description:
      "From concept clarification to structured schemes and visual generation, CoreLING helps you move faster with clearer outputs that are easier to compare and refine.",
    badge: "AI high jewelry design workbench",
    label: "Suggested ways to start",
  },
};

export default function HomeHero({ language, onSelectPrompt }: HomeHeroProps) {
  const copy = HERO_COPY[language];
  const prompts = STARTER_PROMPTS[language];

  return (
    <div className="rounded-3xl border border-[#ebebeb] bg-white p-6 shadow-sm md:p-8">
      <div className="max-w-3xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#fff1f4] px-3 py-1 text-xs font-medium text-[#ff385c]">
          <Sparkles size={14} />
          {copy.badge}
        </div>
        <h2 className="text-3xl font-bold leading-tight text-[#222222] md:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-[#5f5f5f]">
          {copy.description}
        </p>
      </div>

      <div className="mt-8">
        <p className="mb-3 text-sm font-semibold text-[#222222]">{copy.label}</p>
        <div className="flex flex-col gap-3">
          {prompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onSelectPrompt(prompt)}
              className="rounded-2xl border border-[#ebebeb] bg-[#fcfcfc] px-4 py-3 text-left text-sm text-[#444444] transition-colors hover:border-[#ffb7c4] hover:bg-[#fff8f6]"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
