import type { LucideIcon } from 'lucide-react';
import { Smile, Frown, Annoyed, Angry, PartyPopper } from 'lucide-react';

export type Emotion = 'happy' | 'sad' | 'surprised' | 'angry' | 'joy';

export interface StoryPart {
  emotion: Emotion;
  title: string;
  text: string;
  iconName: Emotion;
  next: Emotion | '/complete';
  emoji: string;
  colorFilter: string;
}

export const story: Record<Emotion, StoryPart> = {
  happy: {
    emotion: 'happy',
    title: "സന്തോഷിക്കെടാ കുട്ടാ...",
    text: "The sun peeked through the clouds, casting a warm glow. A tiny seed, nestled in the soil, felt a surge of joy. It dreamed of the flower it would one day become.",
    iconName: 'happy',
    next: 'sad',
    emoji: '😊',
    colorFilter: 'sepia(30%) saturate(150%) brightness(105%)'
  },
  sad: {
    emotion: 'sad',
    title: "ഒന്നും നോക്കണ്ട കരഞ്ഞോ..",
    text: "Days turned into weeks, but the seed remained dormant under the dry earth. It felt a deep sadness, longing for a single drop of rain to quench its thirst.",
    iconName: 'sad',
    next: 'surprised',
    emoji: '😢',
    colorFilter: 'grayscale(80%) brightness(90%)'
  },
  surprised: {
    emotion: 'surprised',
    title: "അപ്രതീക്ഷിത സമ്മാനം",
    text: "Suddenly, a gentle pitter-patter! The seed looked up in surprise. Rain! A tiny sprout burst forth, its leaves unfurling in astonishment at the wide, wet world.",
    iconName: 'surprised',
    next: 'angry',
    emoji: '😮',
    colorFilter: 'contrast(120%)'
  },
  angry: {
    emotion: 'angry',
    title: "കഠിനമായ പരീക്ഷണം",
    text: "But the sky darkened. A fierce storm rolled in, its thunderous roar and lashing winds shaking the little sprout. It clenched its leaves, angry at the storm's fury.",
    iconName: 'angry',
    next: 'joy',
    emoji: '😠',
    colorFilter: 'hue-rotate(-20deg) saturate(200%) brightness(80%)'
  },
  joy: {
    emotion: 'joy',
    title: "വിജയകരമായ പൂവ്",
    text: "The sprout held on. As the storm passed, a rainbow arched across the sky. Bathed in its colors, the sprout grew into a magnificent flower, bursting with pure joy.",
    iconName: 'joy',
    next: '/complete',
    emoji: '🎉',
    colorFilter: 'saturate(200%) brightness(110%)'
  }
};

export const storyOrder: Emotion[] = ['happy', 'sad', 'surprised', 'angry', 'joy'];

export const emotionIcons: Record<Emotion, LucideIcon> = {
    happy: Smile,
    sad: Frown,
    surprised: Annoyed,
    angry: Angry,
    joy: PartyPopper
};
