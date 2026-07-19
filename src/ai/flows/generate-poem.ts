'use server';
/**
 * @fileOverview Generates a poem based on a user-provided theme and style.
 *
 * - generatePoem - A function that generates a poem.
 * - GeneratePoemInput - The input type for the generatePoem function.
 * - GeneratePoemResponse - The output type for the generatePoem function.
 */

import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
// It automatically resolves process.env.GEMINI_API_KEY from environment variables
const ai = new GoogleGenAI({});

export type GeneratePoemInput = {
  theme: string;
  style: string;
};

export type GeneratePoemResponse = 
  | { success: true; poem: string }
  | { success: false; error: string; isRateLimit?: boolean };

export async function generatePoem(input: GeneratePoemInput): Promise<GeneratePoemResponse> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are a skilled poet. Please write a poem with the following theme and style:

Theme: ${input.theme}
Style: ${input.style}

Poem:`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            poem: {
              type: 'STRING',
              description: 'The generated poem.',
            },
          },
          required: ['poem'],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text returned from Gemini API.");
    }

    const data = JSON.parse(text);
    return { success: true, poem: data.poem };
  } catch (error: any) {
    console.error("Error generating poem with Gemini SDK:", error);
    const errorMessage = error?.message || String(error);
    const isRateLimit = 
      errorMessage.includes('429') || 
      errorMessage.toLowerCase().includes('quota') || 
      errorMessage.toLowerCase().includes('rate_limit') ||
      errorMessage.toLowerCase().includes('rate limit') ||
      errorMessage.toLowerCase().includes('too many requests');

    if (isRateLimit) {
      return {
        success: false,
        error: "Google Gemini API rate limit or quota exceeded. Please wait a moment and try again.",
        isRateLimit: true
      };
    }

    return {
      success: false,
      error: error?.message || "An unexpected error occurred while generating the poem."
    };
  }
}
