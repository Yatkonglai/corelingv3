"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Globe, Trash2, Sparkles, Gem, Wand2, Compass } from "lucide-react";
import { Message, Role, Language, SchemeMeta } from "../lib/types";
import { TRANSLATIONS } from "../lib/constants";
import { sendMessageToGemini, generateJewelryImage } from "../lib/geminiService";
import type { GenerationMode } from "../lib/ai/config";
import { MODEL_PRESETS, DEFAULT_MODE } from "../lib/ai/config";
import MessageBubble from "../components/MessageBubble";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [mode, setMode] = useState<GenerationMode>(DEFAULT_MODE);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          role: Role.MODEL,
          text: t.welcomeMessage,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [language, messages.length, t.welcomeMessage]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: uuidv4(),
        role: Role.MODEL,
        text: t.welcomeMessage,
        timestamp: Date.now(),
      },
    ]);
  };

  const handleModeToggle = () => {
    setMode((prev) => (prev === "artisan" ? "muse" : "artisan"));
  };

  /**
   * Parse coreling_meta JSON block from AI response.
   * Extracts hidden imagePrompts for each scheme.
   */
  const parseCorelingMeta = (text: string): SchemeMeta | undefined => {
    try {
      const metaMatch = text.match(/```json coreling_meta\n([\s\S]*?)\n```/);
      if (!metaMatch) return undefined;

      const meta: SchemeMeta = JSON.parse(metaMatch[1]);
      if (!meta.schemes || !Array.isArray(meta.schemes)) return undefined;

      // Validate each scheme has required fields
      meta.schemes = meta.schemes.filter(
        (s) => s.id && s.title && s.imagePrompt
      );

      return meta.schemes.length > 0 ? meta : undefined;
    } catch {
      return undefined;
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: uuidv4(),
      role: Role.USER,
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setLoadingText(t.generating);

    try {
      const responseText = await sendMessageToGemini(
        messages,
        userMsg.text,
        language,
        mode
      );

      const meta = parseCorelingMeta(responseText);

      // Strip hidden coreling_meta block from user-visible text
      const cleanText = responseText
        .replace(/```(?:json\s+)?coreling_meta[\s\S]*?```/, "")
        .trim();

      const aiMsg: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: cleanText,
        timestamp: Date.now(),
        meta,
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      console.error(error);

      const errorCode = error?.code || "unknown";
      const isZh = language === "zh";

      const errorMessages: Record<string, { en: string; zh: string }> = {
        timeout: {
          en: "⏱ The Atelier is refining your request. Please try again in a moment.",
          zh: "⏱ 工坊正在处理您的请求，请稍后再试。",
        },
        rate_limit: {
          en: "🌸 The Atelier is experiencing high demand. Please wait a moment.",
          zh: "🌸 工坊 demand 较高，请稍等片刻。",
        },
        bad_request: {
          en: "⚠️ This request cannot be processed. Please check your input.",
          zh: "⚠️ 无法处理此请求，请检查您的输入。",
        },
        unavailable: {
          en: "⚠️ The Atelier is temporarily unavailable. Please try again shortly.",
          zh: "⚠️ 工坊暂时不可用，请稍后重试。",
        },
        network: {
          en: "⚠️ Connection issue. Please check your network and try again.",
          zh: "⚠️ 连接问题，请检查网络后重试。",
        },
        auth_error: {
          en: "🔑 Authentication failed. Please contact support.",
          zh: "🔑 认证失败，请联系支持团队。",
        },
        unknown: {
          en: "✨ Something unexpected happened. The Atelier is looking into it.",
          zh: "✨ 发生意外情况，工坊正在排查。",
        },
      };

      const msg = errorMessages[errorCode] || errorMessages.unknown;
      const errorText = isZh ? msg.zh : msg.en;

      const errorMsg: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: errorText,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  };

  const handleGenerateImage = async (
    sourceText: string,
    schemeName?: string,
    imagePrompt?: string
  ) => {
    if (isLoading) return;

    const tempId = uuidv4();
    setIsLoading(true);
    setLoadingText(t.generating);

    const statusMsg: Message = {
      id: tempId,
      role: Role.MODEL,
      text:
        language === "en"
          ? `*Initiating visual generation protocol${schemeName ? ` for ${schemeName}` : ""}...*`
          : `*正在启动视觉生成协议${schemeName ? ` (${schemeName})` : ""}...*`,
      timestamp: Date.now(),
      isGenerating: true,
    };
    setMessages((prev) => [...prev, statusMsg]);

    try {
      const imageUrl = await generateJewelryImage(sourceText, schemeName, imagePrompt);

      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === tempId) {
            return {
              ...msg,
              text:
                language === "en"
                  ? `Here is the visual rendering of the design concept${schemeName ? ` (${schemeName})` : ""}:`
                  : `这是设计概念的视觉渲染图${schemeName ? ` (${schemeName})` : ""}：`,
              imageUrl: imageUrl,
              isGenerating: false,
            };
          }
          return msg;
        })
      );
    } catch (error: any) {
      console.error(error);

      const errorCode = error?.code || "unknown";
      const isZh = language === "zh";

      const imageErrorMessages: Record<string, { en: string; zh: string }> = {
        timeout: {
          en: "⏱ Visual generation timed out. Please try again.",
          zh: "⏱ 视觉生成超时，请重试。",
        },
        rate_limit: {
          en: "🌸 Visual studio is busy. Please wait a moment.",
          zh: "🌸 视觉工作室正忙，请稍等。",
        },
        bad_request: {
          en: "⚠️ Cannot generate image for this design. Please try rephrasing.",
          zh: "⚠️ 无法为此设计生成图像，请尝试重新描述。",
        },
        unavailable: {
          en: "⚠️ Visual service is temporarily down. Please try again shortly.",
          zh: "⚠️ 视觉服务暂时不可用，请稍后重试。",
        },
        unknown: {
          en: "✨ Visual generation encountered an issue. Please try again.",
          zh: "✨ 视觉生成遇到问题，请重试。",
        },
      };

      const msg = imageErrorMessages[errorCode] || imageErrorMessages.unknown;
      const errorText = isZh ? msg.zh : msg.en;

      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === tempId) {
            return {
              ...msg,
              text: errorText,
              isGenerating: false,
            };
          }
          return msg;
        })
      );
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f7f7f7]">
      {/* Header - Airbnb style */}
      <header className="flex-none bg-white border-b border-[#ebebeb] px-4 py-3 shadow-sm z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#ff385c] p-2 rounded-lg text-white">
              <Gem size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#222222] tracking-tight">
                {t.title}
              </h1>
              <p className="text-xs text-[#ff385c] font-medium">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Toggle */}
            <button
              onClick={handleModeToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                mode === "artisan"
                  ? "bg-[#f7f7f7] text-[#6a6a6a] hover:bg-[#ebebeb]"
                  : "bg-[#fff8f6] text-[#ff385c] hover:bg-[#ffe8e3]"
              }`}
              title={
                mode === "artisan"
                  ? MODEL_PRESETS.artisan.description
                  : MODEL_PRESETS.muse.description
              }
            >
              {mode === "artisan" ? (
                <Compass size={14} />
              ) : (
                <Wand2 size={14} />
              )}
              <span>
                {language === "zh"
                  ? MODEL_PRESETS[mode].labelZh
                  : MODEL_PRESETS[mode].label}
              </span>
            </button>
            <button
              onClick={handleLanguageToggle}
              className="p-2 text-[#6a6a6a] hover:text-[#ff385c] hover:bg-[#f7f7f7] rounded-full transition-colors"
              title="Switch Language"
            >
              <Globe size={20} />
            </button>
            <button
              onClick={handleClearChat}
              className="p-2 text-[#6a6a6a] hover:text-[#c13515] hover:bg-red-50 rounded-full transition-colors"
              title={t.clearChat}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f7f7f7]/50">
        <div className="max-w-3xl mx-auto">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              translations={t}
              onGenerateImage={handleGenerateImage}
            />
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-[#ff385c] text-sm ml-12 animate-pulse">
              <Sparkles size={16} className="animate-spin" />
              <span>{loadingText}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area - Airbnb pill style */}
      <footer className="flex-none bg-white border-t border-[#ebebeb] p-4">
        <div className="max-w-3xl mx-auto relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={t.inputPlaceholder}
            className="w-full pl-5 pr-14 py-3.5 bg-[#f7f7f7] border border-[#ebebeb] rounded-full focus:outline-none focus:ring-2 focus:ring-[#ff385c] focus:bg-white resize-none text-[#222222] placeholder-[#929292] max-h-32 min-h-[56px] text-base"
            rows={1}
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 bottom-2 p-2.5 bg-[#ff385c] hover:bg-[#e00b41] disabled:opacity-50 disabled:hover:bg-[#ff385c] text-white rounded-full transition-colors shadow-sm"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="text-center mt-2 text-[11px] text-[#929292]">
          Powered by Gemini 2.0 • GEMMA Methodology
        </div>
      </footer>
    </div>
  );
}
