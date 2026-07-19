'use server';
/**
 * @fileOverview Generates a poem based on a user-provided theme and style.
 *
 * - generatePoem - A function that generates a poem.
 * - GeneratePoemInput - The input type for the generatePoem function.
 * - GeneratePoemOutput - The output type for the generatePoem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePoemInputSchema = z.object({
  theme: z.string().describe('The theme of the poem.'),
  style: z.string().describe('The style of the poem (e.g., haiku, sonnet, free verse).'),
});
export type GeneratePoemInput = z.infer<typeof GeneratePoemInputSchema>;

const GeneratePoemOutputSchema = z.object({
  poem: z.string().describe('The generated poem.'),
});
export type GeneratePoemOutput = z.infer<typeof GeneratePoemOutputSchema>;

export type GeneratePoemResponse = 
  | { success: true; poem: string }
  | { success: false; error: string; isRateLimit?: boolean };

export async function generatePoem(input: GeneratePoemInput): Promise<GeneratePoemResponse> {
  try {
    const result = await generatePoemFlow(input);
    return { success: true, poem: result.poem };
  } catch (error: any) {
    console.error("Error in generatePoem Server Action:", error);
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

const generatePoemPrompt = ai.definePrompt({
  name: 'generatePoemPrompt',
  input: {
    schema: GeneratePoemInputSchema,
  },
  output: {
    schema: GeneratePoemOutputSchema,
  },
  prompt: `You are a skilled poet. Please write a poem with the following theme and style:

Theme: {{{theme}}}
Style: {{{style}}}

Poem:`,
});

const generatePoemFlow = ai.defineFlow(
  {
    name: 'generatePoemFlow',
    inputSchema: GeneratePoemInputSchema,
    outputSchema: GeneratePoemOutputSchema,
  },
  async input => {
    const {output} = await generatePoemPrompt(input);
    return output!;
  }
);
