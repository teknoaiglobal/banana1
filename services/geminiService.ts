import { GoogleGenAI } from "@google/genai";

export const generateImageStream = async (
  prompt: string,
  aspectRatio: string,
  onChunk: (chunk: { text?: string; image?: string }) => void
): Promise<void> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContentStream({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        // Based on user-provided script. These properties might be undocumented in the current type definitions.
        // @ts-ignore 
        responseModalities: ['IMAGE', 'TEXT'],
        // @ts-ignore 
        imageConfig: {
            aspectRatio: aspectRatio,
        },
      },
    });

    for await (const chunk of response) {
        let textChunk: string | undefined = undefined;
        let imageChunk: string | undefined = undefined;

        if (chunk.text) {
            textChunk = chunk.text;
        }
        
        for (const part of chunk.candidates?.[0]?.content?.parts ?? []) {
            if (part.inlineData) {
              const base64ImageBytes: string = part.inlineData.data;
              imageChunk = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            }
        }

        if (textChunk || imageChunk) {
            onChunk({ text: textChunk, image: imageChunk });
        }
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating the image.");
  }
};