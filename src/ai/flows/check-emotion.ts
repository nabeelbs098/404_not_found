// This file uses server-side code.
'use server';

/**
 * @fileOverview Emotion check flow.
 *
 * - checkEmotion - A function that takes an image data URI and a target emotion, then returns whether the user's emotion matches the target emotion.
 * - CheckEmotionInput - The input type for the checkEmotion function.
 * - CheckEmotionOutput - The return type for the checkEmotion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckEmotionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
    ),
  targetEmotion: z.string().describe('The emotion the user is supposed to be mimicking.'),
});
export type CheckEmotionInput = z.infer<typeof CheckEmotionInputSchema>;

const CheckEmotionOutputSchema = z.object({
  matchesEmotion: z.boolean().describe('Whether the user is expressing the target emotion.'),
  suggestion: z.string().optional().describe("A helpful tip on how to better express the target emotion if it doesn't match. For example, 'Try smiling wider!' or 'Furrow your brow a bit more.'"),
});
export type CheckEmotionOutput = z.infer<typeof CheckEmotionOutputSchema>;

export async function checkEmotion(input: CheckEmotionInput): Promise<CheckEmotionOutput> {
  return checkEmotionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkEmotionPrompt',
  input: {schema: CheckEmotionInputSchema},
  prompt: `You are an expert acting coach. Your task is to analyze an image of a user's face and determine if their expression matches a specific target emotion.

- Analyze the user's facial expression in the image.
- Compare it to the target emotion: **{{{targetEmotion}}}**.
- If the expression is a clear match, respond with only the word "YES".
- If it is not a match, respond with only "NO" and a brief, actionable tip on a new line to help them improve. For example:
NO
Try smiling wider.

Target Emotion: {{{targetEmotion}}}
Image of user: {{media url=photoDataUri}}
`,
});

const checkEmotionFlow = ai.defineFlow(
  {
    name: 'checkEmotionFlow',
    inputSchema: CheckEmotionInputSchema,
    outputSchema: CheckEmotionOutputSchema,
  },
  async input => {
    const response = await prompt(input);
    const responseText = response.text.trim();
    
    if (responseText.startsWith('YES')) {
      return { matchesEmotion: true };
    } else {
      const parts = responseText.split('\n');
      const suggestion = parts.length > 1 ? parts.slice(1).join(' ').trim() : "Try adjusting your expression.";
      return { matchesEmotion: false, suggestion };
    }
  }
);
