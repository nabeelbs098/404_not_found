// This file uses server-side code.
'use server';

import { checkEmotion, type CheckEmotionInput } from '@/ai/flows/check-emotion';

interface CheckEmotionResult {
  matchesEmotion?: boolean;
  error?: string;
}

export async function handleCheckEmotion(input: CheckEmotionInput): Promise<CheckEmotionResult> {
  try {
    const result = await checkEmotion(input);
    return result;
  } catch (error) {
    console.error('Error checking emotion:', error);
    // In a real app, you'd want to log this error to a monitoring service.
    return { error: 'Failed to analyze emotion. Please try again later.' };
  }
}
