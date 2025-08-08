
import type { LucideIcon } from 'lucide-react';
import { Heart, Frown, Annoyed, Angry, PartyPopper } from 'lucide-react';

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
    title: "സന്തോഷകരമായ തുടക്കം",
    text: `(ബാൽക്കണിയിൽ ഒരു ബക്കറ്റിൽ സോപ്പുപൊടി കലക്കിയ വെള്ളം. അമൃത, അർജുന്റെ വിലകൂടിയ ലാപ്ടോപ്പ് ആ വെള്ളത്തിൽ മുക്കി ഒരു സ്ക്രബ്ബർ ഉപയോഗിച്ച് നല്ലതുപോലെ ഉരച്ച് കഴുകുകയാണ്. അവൾ സന്തോഷത്തോടെ ഒരു പാട്ടും മൂളുന്നുണ്ട്.)
അമൃത (സ്വയം): (ചിരിച്ചുകൊണ്ട്) "അർജുൻ ഏട്ടൻ ഇന്നലെ പറഞ്ഞതേയുള്ളൂ, ലാപ്ടോപ്പിൽ നിറയെ വൈറസാണെന്ന്."`,
    iconName: 'happy',
    next: 'sad',
    emoji: '😊',
    colorFilter: 'sepia(30%) saturate(150%) brightness(105%)'
  },
  sad: {
    emotion: 'sad',
    title: "ഒന്നും നോക്കണ്ട കരഞ്ഞോ..",
    text: "അമൃത: (കരഞ്ഞുകൊണ്ട്) ഏട്ടൻ തന്നെയല്ലേ പറഞ്ഞത് ഇതിൽ നിറയെ അഴുക്കാണെന്ന്... ഞാൻ വൃത്തിയാക്കിയതാ...",
    iconName: 'sad',
    next: 'surprised',
    emoji: '😢',
    colorFilter: 'grayscale(80%) brightness(90%)'
  },
  surprised: {
    emotion: 'surprised',
    title: "അപ്രതീക്ഷിത സമ്മാനം",
    text: `അർജുൻ: എന്താ... എന്താ അമ്മേ ഇവിടെയൊരു ബഹളം? (വെള്ളത്തിൽ കിടക്കുന്ന ലാപ്ടോപ്പ് കണ്ട് ഞെട്ടുന്നു) അമൃതാ!!! നീയെന്താ ഈ ചെയ്തത്?`,
    iconName: 'surprised',
    next: 'angry',
    emoji: '😮',
    colorFilter: 'contrast(120%)'
  },
  angry: {
    emotion: 'angry',
    title: "കഠിനമായ പരീക്ഷണം",
    text: `(ബാൽക്കണിയിൽ ഒരു ബക്കറ്റിൽ സോപ്പുപൊടി കലക്കിയ വെള്ളം. അമൃത, അർജുന്റെ വിലകൂടിയ ലാപ്ടോപ്പ് ആ വെള്ളത്തിൽ മുക്കി ഒരു സ്ക്രബ്ബർ ഉപയോഗിച്ച് നല്ലതുപോലെ ഉരച്ച് കഴുകുകയാണ്. അവൾ സന്തോഷത്തോടെ ഒരു പാട്ടും മൂളുന്നുണ്ട്.)
അമൃത (സ്വയം): (ചിരിച്ചുകൊണ്ട്) "അർജുൻ ഏട്ടൻ ഇന്നലെ പറഞ്ഞതേയുള്ളൂ, ലാപ്ടോപ്പിൽ നിറയെ വൈറസാണെന്ന്."`,
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
    happy: Heart,
    sad: Frown,
    surprised: Annoyed,
    angry: Angry,
    joy: PartyPopper
};
