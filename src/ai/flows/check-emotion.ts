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
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
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
  output: {schema: CheckEmotionOutputSchema},
  prompt: `You are an expert acting coach. Analyze the user's face in the image and determine if it matches the target emotion.
If it doesn't match, provide a brief, actionable tip to help them improve their expression.

Intended Emotion: {{{targetEmotion}}}
Performer's Face: {{media url=photoDataUri}}
`,
});

const checkEmotionFlow = ai.defineFlow(
  {
    name: 'checkEmotionFlow',
    inputSchema: CheckEmotionInputSchema,
    outputSchema: CheckEmotionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // The model with an output schema will return the JSON object directly.
    return output!;
  }
);
