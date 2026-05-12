"use client";

import { Send } from "lucide-react";

interface InputWorkbenchProps {
  input: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  language: "en" | "zh";
  mode: string;
  placeholder: string;
}

const MODE_HINT: Record<string, Record<string, string>> = {
  zh: {
    artisan: "当前模式：Artisan。更适合先澄清主题、佩戴场景与约束。",
    muse: "当前模式：Muse。更适合快速推进更大胆的概念与视觉表达。",
  },
  en: {
    artisan: "Current mode: Artisan. Best for clarifying theme, wearing context, and constraints first.",
    muse: "Current mode: Muse. Best for pushing bolder concepts and stronger visual direction.",
  },
};

export default function InputWorkbench({
  input,
  onChange,
  onSend,
  isLoading,
  language,
  mode,
  placeholder,
}: InputWorkbenchProps) {
  const hint = MODE_HINT[language]?.[mode] ?? "";

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-2 text-sm text-[#6a6a6a]">{hint}</div>
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder={placeholder}
          className="min-h-[56px] max-h-32 w-full resize-none rounded-[28px] border border-[#ebebeb] bg-[#f7f7f7] py-3.5 pl-5 pr-14 text-base text-[#222222] placeholder-[#929292] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#ff385c]"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={onSend}
          disabled={!input.trim() || isLoading}
          className="absolute bottom-2 right-2 rounded-full bg-[#ff385c] p-2.5 text-white shadow-sm transition-colors hover:bg-[#e00b41] disabled:opacity-50 disabled:hover:bg-[#ff385c]"
        >
          <Send size={18} />
        </button>
      </div>
      <div className="mt-2 text-center text-[11px] text-[#929292]">
        Powered by Gemini 2.0 • GEMMA Methodology
      </div>
    </div>
  );
}
