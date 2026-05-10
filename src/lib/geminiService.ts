"use client";

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { buildSystemInstruction, buildImageOptimizationPrompt } from "./prompts/v1";
import { Message, Role } from "./types";

const apiKey = typeof window !== "undefined"
  ? (process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")
  : "";

const ai = new GoogleGenAI({ apiKey });

/**
 * Sends a chat message to the Gemini model.
 * Uses the structured prompt architecture (v1.0.0).
 */
export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string,
  language: string
): Promise<string> => {
  try {
    if (!apiKey) throw new Error("API Key missing");

    const modelId = "gemini-flash-latest";

    // Convert internal message format to Gemini format
    const relevantHistory = history.map(msg => ({
      role: msg.role === Role.USER ? 'user' as const : 'model' as const,
      parts: [{ text: msg.text }]
    }));

    // Build the system instruction from the structured prompt architecture
    const systemInstruction = buildSystemInstruction(language as 'en' | 'zh');

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
      history: relevantHistory
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: newMessage
    });

    return result.text || "";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};

/**
 * Generates an image based on a design description.
 * Uses the structured image prompt builder.
 */
export const generateJewelryImage = async (
  designDescription: string,
  targetScheme?: string
): Promise<string> => {
  try {
    if (!apiKey) throw new Error("API Key missing");

    // Detect language from the design description
    const isChinese = /[一-鿿]/.test(designDescription);
    const lang: 'en' | 'zh' = isChinese ? 'zh' : 'en';

    // Build the optimization prompt using the structured prompt architecture
    const optimizationPrompt = buildImageOptimizationPrompt(
      designDescription,
      targetScheme,
      lang
    );

    const textModel = "gemini-flash-latest";
    const promptResponse = await ai.models.generateContent({
      model: textModel,
      contents: optimizationPrompt
    });

    const optimizedPrompt = promptResponse.text?.trim() || designDescription;
    console.log(`Optimized Image Prompt (${targetScheme || 'General'}):`, optimizedPrompt);

    // Generate image
    const imageModel = "gemini-2.5-flash-image";

    const response = await ai.models.generateContent({
      model: imageModel,
      contents: {
        parts: [{ text: optimizedPrompt }]
      },
      config: {}
    });

    // Extract base64 image
    const parts = response.candidates?.[0]?.content?.parts;
    if (parts) {
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
          const mimeType = part.inlineData.mimeType || 'image/png';
          return `data:${mimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini Image Generation Error:", error);
    throw error;
  }
};
