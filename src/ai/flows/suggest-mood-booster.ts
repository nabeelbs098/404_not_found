// This file uses server-side code.
'use server';

/**
 * @fileOverview Mood booster suggestion flow.
 *
 * - suggestMoodBooster - A function that takes an image data URI, detects the user's emotion, and provides a suggestion if the emotion is sad or angry.
 * - SuggestMoodBoosterInput - The input type for the suggestMoodBooster function.
 * - SuggestMoodBoosterOutput - The return type for the suggestMoodBooster function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestMoodBoosterInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SuggestMoodBoosterInput = z.infer<typeof SuggestMoodBoosterInputSchema>;

const SuggestMoodBoosterOutputSchema = z.object({
  emotion: z.string().describe("The detected emotion of the user. Can be one of 'happy', 'sad', 'angry', 'surprised', 'joy', or 'neutral'."),
  suggestion: z.string().optional().describe("A helpful and cheerful suggestion to improve the user's mood if they are sad or angry. Empty if the emotion is not sad or angry."),
});
export type SuggestMoodBoosterOutput = z.infer<typeof SuggestMoodBoosterOutputSchema>;

export async function suggestMoodBooster(input: SuggestMoodBoosterInput): Promise<SuggestMoodBoosterOutput> {
  return suggestMoodBoosterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestMoodBoosterPrompt',
  input: {schema: SuggestMoodBoosterInputSchema},
  output: {schema: SuggestMoodBoosterOutputSchema},
  prompt: `You are an expert and cheerful emotion recognition AI. You will be given an image of a user's face.

First, detect the user's primary emotion from the image. It can be happy, sad, angry, surprised, joy, or neutral.

If the detected emotion is 'sad' or 'angry', provide a short, cheerful, and actionable suggestion to help lift their spirits. For example, "How about listening to your favorite upbeat song?" or "Maybe a short walk outside could brighten your day!".

If the emotion is anything else, do not provide a suggestion.

User's Face: {{media url=photoDataUri}}
`,
});

const suggestMoodBoosterFlow = ai.defineFlow(
  {
    name: 'suggestMoodBoosterFlow',
    inputSchema: SuggestMoodBoosterInputSchema,
    outputSchema: SuggestMoodBoosterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
