"use client";

import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "./constants";
import { Message, Role } from "./types";

const apiKey = typeof window !== "undefined"
  ? (process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")
  : "";

const ai = new GoogleGenAI({ apiKey });

export const sendMessageToGemini = async (
  history: Message[],
  newMessage: string,
  language: string
): Promise<string> => {
  try {
    if (!apiKey) throw new Error("API Key missing");

    const modelId = "gemini-flash-latest";

    const relevantHistory = history.map(msg => ({
      role: msg.role === Role.USER ? 'user' as const : 'model' as const,
      parts: [{ text: msg.text }]
    }));

    const chat = ai.chats.create({
      model: modelId,
      config: {
        systemInstruction: `${SYSTEM_INSTRUCTION}\n\nIMPORTANT: Please respond in ${language === 'zh' ? 'Chinese (Simplified)' : 'English'}.`,
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

export const generateJewelryImage = async (
  designDescription: string,
  targetScheme?: string
): Promise<string> => {
  try {
    if (!apiKey) throw new Error("API Key missing");

    let focusInstruction = "";
    if (targetScheme) {
      focusInstruction = `IMPORTANT: Focus ONLY on the design described under **"${targetScheme}"** (or similar identifier like "方案 A"). Ignore other schemes.`;
    }

    const optimizationPrompt = `
      Act as GEMMA ARTISTE. Convert the following jewelry design description into a strictly formatted, photorealistic image generation prompt for Google Imagen.

      ${focusInstruction}

      Input Description:
      "${designDescription}"

      AESTHETIC RULES (MUST FOLLOW):
      1. **Delicacy**: Use keywords like "fine jewelry," "filigree," "delicate," "gossamer," "ultra-thin metalwork."
      2. **Negative Space**: Ensure the design looks airy and open. NOT solid, NOT chunky.
      3. **Realism**: "Macro photography," "Depth of field," "8k resolution," "cinematic lighting."
      4. **Proportion**: Ensure the jewelry pieces are proportional to a human scale.

      DISPLAY CONTEXT RULES (CRITICAL):
      *   **IF NECKLACE**: Use "displayed on an elegant black velvet mannequin bust".
      *   **IF BROOCH / PIN**: Use "pinned on the chest of a high-fashion garment (dark silk or velvet lapel) to show realistic scale". **DO NOT** use a mannequin bust for brooches, it makes them look oversized.
      *   **IF RING / EARRINGS**: Use "macro shot on a dark textured slate or professional jewelry stand".

      Output Requirements:
      - Output ONLY the raw prompt text, no markdown, no explanations.
    `;

    const textModel = "gemini-flash-latest";
    const promptResponse = await ai.models.generateContent({
      model: textModel,
      contents: optimizationPrompt
    });

    const optimizedPrompt = promptResponse.text?.trim() || designDescription;
    console.log(`Optimized Image Prompt (${targetScheme || 'General'}):`, optimizedPrompt);

    const imageModel = "gemini-2.5-flash-image";

    const response = await ai.models.generateContent({
      model: imageModel,
      contents: {
        parts: [{ text: optimizedPrompt }]
      },
      config: {}
    });

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
