import { Message } from "./types";
import type { GenerationMode } from "./ai/config";

/**
 * Sends a chat message to the AI Gateway.
 * The actual Gemini SDK call is handled server-side at /api/ai/chat.
 */
export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string,
  language: string,
  mode: GenerationMode = "artisan"
): Promise<string> => {
  const response = await fetch("/api/ai/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      history: history.map((msg) => ({
        role: msg.role,
        text: msg.text,
      })),
      message: newMessage,
      language,
      mode,
    }),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw data.error || { code: "unknown", message: "Request failed." };
  }

  return data.text || "";
};

/**
 * Generates an image via the AI Gateway.
 * The actual Gemini SDK call is handled server-side at /api/ai/image.
 */
export const generateJewelryImage = async (
  designDescription: string,
  targetScheme?: string
): Promise<string> => {
  // Detect language from the design description
  const isChinese = /[一-鿿]/.test(designDescription);
  const lang: "en" | "zh" = isChinese ? "zh" : "en";

  const response = await fetch("/api/ai/image", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      designDescription,
      targetScheme,
      language: lang,
    }),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw data.error || { code: "unknown", message: "Image generation failed." };
  }

  return data.imageUrl;
};
