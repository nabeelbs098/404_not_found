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
<<<<<<< HEAD
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'"
=======
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
    ),
  targetEmotion: z.string().describe('The emotion the user is supposed to be mimicking.'),
});
export type CheckEmotionInput = z.infer<typeof CheckEmotionInputSchema>;

const CheckEmotionOutputSchema = z.object({
  matchesEmotion: z.boolean().describe('Whether the user is expressing the target emotion.'),
<<<<<<< HEAD
  suggestion: z.string().optional().describe("A helpful tip on how to better express the target emotion if it doesn't match. For example, 'Try smiling wider!' or 'Furrow your brow a bit more.'"),
=======
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
});
export type CheckEmotionOutput = z.infer<typeof CheckEmotionOutputSchema>;

export async function checkEmotion(input: CheckEmotionInput): Promise<CheckEmotionOutput> {
  return checkEmotionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkEmotionPrompt',
  input: {schema: CheckEmotionInputSchema},
  output: {schema: CheckEmotionOutputSchema},
<<<<<<< HEAD
  prompt: `You are an expert acting coach. Your task is to analyze an image of a user's face and determine if their expression matches a specific target emotion.

- Focus solely on the user's facial expression.
- Compare their expression to the intended emotion: **{{{targetEmotion}}}**.
- Determine if the expression is a match.
- If it doesn't match, provide a brief, actionable tip to help them improve.

Return a JSON object with 'matchesEmotion' set to true or false.

Intended Emotion: {{{targetEmotion}}}
Performer's Face: {{media url=photoDataUri}}
=======
  prompt: `You are an emotion recognition expert. You will be given an image of a user's face and a target emotion.

You must determine if the user is expressing the target emotion in the image.

Target Emotion: {{{targetEmotion}}}
User's Face: {{media url=photoDataUri}}

Analyze the user's face and determine if it matches the target emotion.
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
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
