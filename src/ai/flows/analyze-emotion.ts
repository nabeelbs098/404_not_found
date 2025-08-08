'use server';

/**
 * @fileOverview Analyzes the user's facial expression to match it with a target emotion.
 *
 * - analyzeEmotion - A function that handles the emotion analysis process.
 * - AnalyzeEmotionInput - The input type for the analyzeEmotion function.
 * - AnalyzeEmotionOutput - The return type for the analyzeEmotion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeEmotionInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  targetEmotion: z.string().describe('The emotion the user is trying to mimic.'),
});
export type AnalyzeEmotionInput = z.infer<typeof AnalyzeEmotionInputSchema>;

const AnalyzeEmotionOutputSchema = z.object({
  matchConfidence: z
    .number()
    .describe(
      'A number between 0 and 1 indicating how confident the AI is that the user is expressing the target emotion.'
    ),
  isMatch: z
    .boolean()
    .describe(
      'Whether the user is expressing the target emotion with sufficient confidence.'
    ),
});
export type AnalyzeEmotionOutput = z.infer<typeof AnalyzeEmotionOutputSchema>;

export async function analyzeEmotion(
  input: AnalyzeEmotionInput
): Promise<AnalyzeEmotionOutput> {
  return analyzeEmotionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeEmotionPrompt',
  input: {schema: AnalyzeEmotionInputSchema},
  output: {schema: AnalyzeEmotionOutputSchema},
  prompt: `You are an AI that analyzes facial expressions.

You will analyze the user's facial expression in the provided photo and determine how well it matches the target emotion.

Target Emotion: {{{targetEmotion}}}

Photo: {{media url=photoDataUri}}

Set the isMatch field to true if the user is expressing the target emotion with sufficient confidence, otherwise false.  The threshold for sufficient confidence should be determined based on how reliably the AI can detect the target emotion.
Set the matchConfidence to a value between 0 and 1 that represents the AI's confidence that the user is expressing the target emotion.`,
});

const analyzeEmotionFlow = ai.defineFlow(
  {
    name: 'analyzeEmotionFlow',
    inputSchema: AnalyzeEmotionInputSchema,
    outputSchema: AnalyzeEmotionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
