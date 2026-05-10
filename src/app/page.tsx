"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Globe, Trash2, Sparkles, Gem } from "lucide-react";
import { Message, Role, Language } from "../lib/types";
import { TRANSLATIONS } from "../lib/constants";
import { sendMessageToGemini, generateJewelryImage } from "../lib/geminiService";
import MessageBubble from "../components/MessageBubble";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [language, setLanguage] = useState<Language>("zh");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

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
        messages.concat(userMsg),
        userMsg.text,
        language
      );

      const aiMsg: Message = {
        id: uuidv4(),
        role: Role.MODEL,
        text: responseText,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error: any) {
      console.error(error);

      let errorText =
        language === "en"
          ? "Sorry, something went wrong. Please check your API key."
          : "抱歉，出错了。请检查您的 API 密钥。";

      const errorString = error?.toString() || JSON.stringify(error);
      if (
        errorString.includes("User location is not supported") ||
        errorString.includes("400")
      ) {
        errorText =
          language === "en"
            ? "⚠️ Error: The AI model is not supported in your current region (Geo-blocked). Please check your network/VPN settings."
            : "⚠️ 错误：当前地区不支持使用此 AI 模型 (区域限制)。请检查您的网络或 VPN 设置。";
      }

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
    schemeName?: string
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
      const imageUrl = await generateJewelryImage(sourceText, schemeName);

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
      let errorText =
        language === "en"
          ? "Failed to generate image. Please try again."
          : "生成图片失败，请重试。";

      const errorString = error?.toString() || JSON.stringify(error);
      if (errorString.includes("User location is not supported")) {
        errorText =
          language === "en"
            ? "⚠️ Image generation unavailable in your region."
            : "⚠️ 当前地区无法使用图片生成功能。";
      }

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
