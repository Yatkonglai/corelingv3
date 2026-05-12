"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Globe, Trash2, Sparkles, Gem, Wand2, Compass } from "lucide-react";
import { Message, Role, Language, AppViewState, FeedbackKind } from "../lib/types";
import { TRANSLATIONS } from "../lib/constants";
import { sendMessageToGemini, generateJewelryImage } from "../lib/geminiService";
import type { GenerationMode } from "../lib/ai/config";
import { MODEL_PRESETS, DEFAULT_MODE } from "../lib/ai/config";
import MessageBubble from "../components/MessageBubble";
import HomeHero from "../components/HomeHero";
import InputWorkbench from "../components/InputWorkbench";
import ResultPane from "../components/ResultPane";
import { parseCorelingMeta, parseResultViewModel } from "../lib/resultViewModel";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [mode, setMode] = useState<GenerationMode>(DEFAULT_MODE);
  const [appViewState, setAppViewState] = useState<AppViewState>("home");
  const [feedbackKind, setFeedbackKind] = useState<FeedbackKind>("idle");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[language];

  const latestStructuredMessage = useMemo(
    () =>
      [...messages]
        .reverse()
        .find(
          (message) =>
            message.role === Role.MODEL &&
            !message.isGenerating &&
            parseResultViewModel(message).hasStructuredResult
        ),
    [messages]
  );

  const latestResult = useMemo(
    () => (latestStructuredMessage ? parseResultViewModel(latestStructuredMessage) : undefined),
    [latestStructuredMessage]
  );

  useEffect(() => {
    if (isLoading && feedbackKind === "sending") {
      setAppViewState("generating-response");
      return;
    }

    if (isLoading && feedbackKind === "image-pending") {
      setAppViewState("generating-image");
      return;
    }

    if (messages.length === 0) {
      setAppViewState("home");
      return;
    }

    if (feedbackKind === "response-error") {
      setAppViewState("recoverable-error");
      return;
    }

    if (latestResult?.hasStructuredResult) {
      setAppViewState("result-ready");
      return;
    }

    setAppViewState("conversation");
  }, [feedbackKind, isLoading, latestResult, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  };

  const handleModeToggle = () => {
    setMode((prev) => (prev === "artisan" ? "muse" : "artisan"));
  };

  const handleClearChat = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setLoadingText("");
    setFeedbackKind("idle");
    setAppViewState("home");
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: uuidv4(),
      role: Role.USER,
      text: input,
      timestamp: Date.now(),
    };

    const history = messages.filter((message) => !message.isGenerating);

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    setLoadingText(t.generating);
    setFeedbackKind("sending");
    setAppViewState("generating-response");

    try {
      const responseText = await sendMessageToGemini(history, userMsg.text, language, mode);
      const meta = parseCorelingMeta(responseText);
      const cleanText = responseText.replace(/```(?:json\s+)?coreling_meta[\s\S]*?```/, "").trim();

      const aiMsg: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: cleanText,
        timestamp: Date.now(),
        meta,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setFeedbackKind("idle");
    } catch (error: any) {
      console.error(error);

      const errorCode = error?.code || "unknown";
      const errorMessages: Record<string, { en: string; zh: string }> = {
        timeout: {
          en: "⏱ The Atelier is refining your request. Please try again in a moment.",
          zh: "⏱ 工坊正在处理您的请求，请稍后再试。",
        },
        rate_limit: {
          en: "🌸 The Atelier is experiencing high demand. Please wait a moment.",
          zh: "🌸 工坊当前请求较多，请稍等片刻。",
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
      const errorText = language === "zh" ? msg.zh : msg.en;

      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: Role.MODEL,
          text: errorText,
          timestamp: Date.now(),
        },
      ]);
      setFeedbackKind("response-error");
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
    setFeedbackKind("image-pending");
    setAppViewState("generating-image");

    const statusText =
      language === "en"
        ? `*Initiating visual generation protocol${schemeName ? ` for ${schemeName}` : ""}...*`
        : `*正在启动视觉生成协议${schemeName ? ` (${schemeName})` : ""}...*`;

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        role: Role.MODEL,
        text: statusText,
        timestamp: Date.now(),
        isGenerating: true,
      },
    ]);

    try {
      const imageUrl = await generateJewelryImage(sourceText, schemeName, imagePrompt);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? {
                ...msg,
                text:
                  language === "en"
                    ? `Here is the visual rendering of the design concept${schemeName ? ` (${schemeName})` : ""}:`
                    : `这是设计概念的视觉渲染图${schemeName ? ` (${schemeName})` : ""}：`,
                imageUrl,
                isGenerating: false,
              }
            : msg
        )
      );
      setFeedbackKind("image-success");
      setAppViewState("result-ready");
    } catch (error: any) {
      console.error(error);

      const errorCode = error?.code || "unknown";
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
      const errorText = language === "zh" ? msg.zh : msg.en;

      setMessages((prev) =>
        prev.map((message) =>
          message.id === tempId
            ? {
                ...message,
                text: errorText,
                isGenerating: false,
              }
            : message
        )
      );
      setFeedbackKind("image-error");
      setAppViewState("result-ready");
    } finally {
      setIsLoading(false);
      setLoadingText("");
    }
  };

  const feedbackText =
    feedbackKind === "sending"
      ? loadingText
      : feedbackKind === "response-error"
        ? language === "zh"
          ? "本轮生成未完成，请直接重试或调整输入。"
          : "This response did not complete. Retry or adjust your prompt."
        : feedbackKind === "image-pending"
          ? loadingText
          : feedbackKind === "image-error"
            ? language === "zh"
              ? "效果图生成失败，但当前方案仍保留。"
              : "Image generation failed, but your current scheme remains available."
            : feedbackKind === "image-success"
              ? language === "zh"
                ? "效果图已生成，可继续比较或深化方案。"
                : "Visual generated. You can compare or refine further."
              : "";

  const feedbackTone =
    feedbackKind === "response-error" || feedbackKind === "image-error"
      ? "text-[#c13515] bg-red-50 border-red-200"
      : feedbackKind === "sending" || feedbackKind === "image-pending"
        ? "text-[#ff385c] bg-[#fff8f6] border-[#ffd8cf]"
        : "text-[#1f7a4f] bg-green-50 border-green-200";

  const showHomeHero = appViewState === "home";
  const showResultPanel = Boolean(latestResult?.hasStructuredResult);
  const resultSourceText = latestStructuredMessage?.text ?? "";

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f7]">
      <header className="z-10 flex-none border-b border-[#ebebeb] bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#ff385c] p-2 text-white">
              <Gem size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#222222]">{t.title}</h1>
              <p className="text-xs font-medium text-[#ff385c]">{t.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleModeToggle}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                mode === "artisan"
                  ? "bg-[#f7f7f7] text-[#6a6a6a] hover:bg-[#ebebeb]"
                  : "bg-[#fff8f6] text-[#ff385c] hover:bg-[#ffe8e3]"
              }`}
              title={mode === "artisan" ? MODEL_PRESETS.artisan.description : MODEL_PRESETS.muse.description}
            >
              {mode === "artisan" ? <Compass size={14} /> : <Wand2 size={14} />}
              <span>{language === "zh" ? MODEL_PRESETS[mode].labelZh : MODEL_PRESETS[mode].label}</span>
            </button>
            <button
              onClick={handleLanguageToggle}
              className="rounded-full p-2 text-[#6a6a6a] transition-colors hover:bg-[#f7f7f7] hover:text-[#ff385c]"
              title="Switch Language"
            >
              <Globe size={20} />
            </button>
            <button
              onClick={handleClearChat}
              className="rounded-full p-2 text-[#6a6a6a] transition-colors hover:bg-red-50 hover:text-[#c13515]"
              title={t.clearChat}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="min-w-0">
            <div className="mb-4 rounded-2xl border border-[#ebebeb] bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-[#222222]">
                {language === "zh"
                  ? mode === "artisan"
                    ? "当前模式：Artisan。更适合先澄清主题、佩戴场景与约束。"
                    : "当前模式：Muse。更适合快速推进更大胆的概念与视觉表达。"
                  : mode === "artisan"
                    ? "Current mode: Artisan. Best for clarifying theme, wearing context, and constraints first."
                    : "Current mode: Muse. Best for pushing bolder concepts and stronger visual direction."}
              </p>
            </div>

            {feedbackText && (
              <div className={`mb-4 rounded-2xl border px-4 py-3 text-sm ${feedbackTone}`}>
                {feedbackText}
              </div>
            )}

            {showHomeHero ? (
              <HomeHero language={language} mode={mode} onSelectPrompt={setInput} />
            ) : (
              <div className="space-y-6">
                {showResultPanel && latestResult && (
                  <div className="rounded-3xl border border-[#ebebeb] bg-white p-5 shadow-sm lg:hidden">
                    <ResultPane
                      result={latestResult}
                      language={language}
                      sourceText={resultSourceText}
                      onGenerateImage={handleGenerateImage}
                      headerExtra={
                        <span className="rounded-full bg-[#fff1f4] px-3 py-1 text-xs font-medium text-[#ff385c]">
                          {latestResult.schemes.length} {language === "zh" ? "个方案" : "schemes"}
                        </span>
                      }
                    />
                  </div>
                )}

                <div>
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      translations={t}
                      onGenerateImage={handleGenerateImage}
                    />
                  ))}

                  {isLoading && feedbackKind === "sending" && (
                    <div className="ml-12 flex items-center gap-2 text-sm text-[#ff385c] animate-pulse">
                      <Sparkles size={16} className="animate-spin" />
                      <span>{loadingText}</span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </section>

          <aside className="hidden lg:block">
            {showResultPanel && latestResult ? (
              <div className="sticky top-6 rounded-3xl border border-[#ebebeb] bg-white p-5 shadow-sm">
                <ResultPane
                  result={latestResult}
                  language={language}
                  sourceText={resultSourceText}
                  onGenerateImage={handleGenerateImage}
                />
              </div>
            ) : (
              <div className="sticky top-6 rounded-3xl border border-dashed border-[#d9d9d9] bg-white/70 p-5 text-sm leading-6 text-[#7a7a7a]">
                {language === "zh"
                  ? "结果面板会在识别到结构化方案后显示。当前你可以继续输入需求，或先从首页推荐提示开始。"
                  : "The result panel appears once a structured scheme output is detected. You can keep typing, or start from one of the suggested prompts."}
              </div>
            )}
          </aside>
        </div>
      </main>

      <footer className="sticky bottom-0 flex-none border-t border-[#ebebeb] bg-white p-4">
        <InputWorkbench
          input={input}
          onChange={setInput}
          onSend={handleSend}
          isLoading={isLoading}
          language={language}
          mode={mode}
          placeholder={t.inputPlaceholder}
        />
      </footer>
    </div>
  );
}
