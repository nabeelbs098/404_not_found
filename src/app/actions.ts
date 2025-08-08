// This file uses server-side code.
'use server';

import { checkEmotion, type CheckEmotionInput } from '@/ai/flows/check-emotion';
import { suggestMoodBooster, type SuggestMoodBoosterInput } from '@/ai/flows/suggest-mood-booster';

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

interface SuggestMoodBoosterResult {
  emotion?: string;
  suggestion?: string;
  error?: string;
}

export async function handleSuggestMoodBooster(input: SuggestMoodBoosterInput): Promise<SuggestMoodBoosterResult> {
  try {
    const result = await suggestMoodBooster(input);
    return result;
  } catch (error) {
    console.error('Error suggesting mood booster:', error);
    return { error: 'Failed to get a mood booster suggestion. Please try again later.' };
  }
}
