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
  prompt: `You are an expert acting coach specializing in facial expressions.

You will be given an image of a user's face and a target emotion they are trying to perform.

Analyze the user's facial expression in the image and compare it to the intended emotion.

If the expression matches the target emotion, set matchesEmotion to true.

If the expressed emotion does NOT fully match the intended one, set matchesEmotion to false and suggest a specific, short, and actionable acting adjustment to make the performance more believable. Focus on facial muscles, eyes, and mouth. For example: "For 'angry', try furrowing your brow and tightening your lips." or "To look more 'surprised', try widening your eyes."

Give feedback in short, actionable tips that the performer can apply immediately.

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
