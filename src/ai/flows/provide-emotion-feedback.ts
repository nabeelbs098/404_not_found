'use server';

/**
 * @fileOverview Provides real-time feedback on how well the user's expression matches the target emotion.
 *
 * - provideEmotionFeedback - A function that handles the emotion feedback process.
 * - ProvideEmotionFeedbackInput - The input type for the provideEmotionFeedback function.
 * - ProvideEmotionFeedbackOutput - The return type for the provideEmotionFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideEmotionFeedbackInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's face, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  targetEmotion: z.string().describe('The target emotion to mimic.'),
});
export type ProvideEmotionFeedbackInput = z.infer<
  typeof ProvideEmotionFeedbackInputSchema
>;

const ProvideEmotionFeedbackOutputSchema = z.object({
  matchQuality: z
    .string()
    .describe(
      'A qualitative description of how well the user matched the target emotion (e.g., Excellent, Good, Fair, Poor).' // Increased clarity
    ),
  feedbackMessage: z
    .string()
    .describe(
      'Specific feedback on how the user can improve their expression to better match the target emotion.'
    ),
});
export type ProvideEmotionFeedbackOutput = z.infer<
  typeof ProvideEmotionFeedbackOutputSchema
>;

export async function provideEmotionFeedback(
  input: ProvideEmotionFeedbackInput
): Promise<ProvideEmotionFeedbackOutput> {
  return provideEmotionFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideEmotionFeedbackPrompt',
  input: {schema: ProvideEmotionFeedbackInputSchema},
  output: {schema: ProvideEmotionFeedbackOutputSchema},
  prompt: `You are an AI-powered emotion recognition expert providing feedback to users trying to mimic emotions. Your goal is to provide helpful and encouraging feedback so that the user can successfully mimic the target emotion.

  Here is the user's face:
  {{media url=photoDataUri}}

  The target emotion is: {{{targetEmotion}}}.

  Analyze the user's expression and provide:
  1.  A "matchQuality" string that is a qualitative assessment of how well the user's expression matches the target emotion (choose one of: Excellent, Good, Fair, Poor).
  2.  A "feedbackMessage" string giving specific, actionable advice on how the user can adjust their expression to better match the target emotion. Be specific (e.g., "Smile wider", "Raise your eyebrows more", "Relax your forehead").
  `,
});

const provideEmotionFeedbackFlow = ai.defineFlow(
  {
    name: 'provideEmotionFeedbackFlow',
    inputSchema: ProvideEmotionFeedbackInputSchema,
    outputSchema: ProvideEmotionFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
