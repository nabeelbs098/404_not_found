import type { LucideIcon } from 'lucide-react';
import { Heart, Frown, Annoyed, Angry, PartyPopper } from 'lucide-react';

export type Emotion = 'happy' | 'sad' | 'surprised' | 'angry' | 'joy';

export interface StoryPart {
  emotion: Emotion;
  malayalamEmotion: string;
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
    malayalamEmotion: 'ചിരി',
    title: "വൈറസിനെ കൊന്ന് അമൃത..(part-1)",
    text: `(ബാൽക്കണിയിൽ ഒരു ബക്കറ്റിൽ സോപ്പുപൊടി കലക്കിയ വെള്ളം. അമൃത, അർജുന്റെ വിലകൂടിയ ലാപ്ടോപ്പ് ആ വെള്ളത്തിൽ മുക്കി ഒരു സ്ക്രബ്ബർ ഉപയോഗിച്ച് നല്ലതുപോലെ ഉരച്ച് കഴുകുകയാണ്. അവൾ സന്തോഷത്തോടെ ഒരു പാട്ടും മൂളുന്നുണ്ട്.)
അമൃത (സ്വയം): (ചിരിച്ചുകൊണ്ട്) "അർജുൻ ഏട്ടൻ ഇന്നലെ പറഞ്ഞതേയുള്ളൂ, ലാപ്ടോപ്പിൽ നിറയെ വൈറസാണെന്ന്."`,
    iconName: 'happy',
    next: 'sad',
    emoji: '😊',
    colorFilter: 'sepia(30%) saturate(150%) brightness(105%)'
  },
  sad: {
    emotion: 'sad',
    malayalamEmotion: 'സങ്കടം',
    title: "ഒന്നും നോക്കണ്ട കരഞ്ഞോ..",
    text: `അമൃത: (കരഞ്ഞുകൊണ്ട്) ഏട്ടൻ തന്നെയല്ലേ പറഞ്ഞത് ഇതിൽ നിറയെ അഴുക്കാണെന്ന്... ഞാൻ വൃത്തിയാക്കിയതാ...`,
    iconName: 'sad',
    next: 'surprised',
    emoji: '😢',
    colorFilter: 'grayscale(80%) brightness(90%)'
  },
  surprised: {
    emotion: 'surprised',
    malayalamEmotion: 'അത്ഭുതം',
    title: "അപ്രതീക്ഷിത സമ്മാനം",
    text: `അർജുൻ: എന്താ... എന്താ അമ്മേ ഇവിടെയൊരു ബഹളം? (വെള്ളത്തിൽ കിടക്കുന്ന ലാപ്ടോപ്പ് കണ്ട് ഞെട്ടുന്നു) അമൃതാ!!! നീയെന്താ ഈ ചെയ്തത്?`,
    iconName: 'surprised',
    next: 'angry',
    emoji: '😮',
    colorFilter: 'contrast(120%)'
  },
  angry: {
    emotion: 'angry',
    malayalamEmotion: 'ദേഷ്യം',
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
    malayalamEmotion: 'സന്തോഷം',
    title: "വിജയകരമായ പൂവ്",
    text: `ഊർമിള ദേവി: (ട്രോഫി എടുത്ത് അമൃതയുടെ കയ്യിൽ തിരികെ കൊടുക്കുന്നു)
ഈ സമ്മാനം നിനക്കുള്ളതാണ്. നീയാണ് ഈ കുടുംബത്തിന്റെ യഥാർത്ഥ ഐശ്വര്യം. ഇന്ന് മുതൽ നീ ഈ വീടിന്റെ വെറും മരുമകളല്ല, എന്റെ സ്വന്തം മകളാണ്!
(പശ്ചാത്തലത്തിൽ സന്തോഷം നിറഞ്ഞ, ഗംഭീരമായ സംഗീതം ഉയർന്നുതുടങ്ങുന്നു.)
(അമൃതയ്ക്ക് സന്തോഷം സഹിക്കാൻ കഴിയുന്നില്ല.ഊർമിള ദേവി ആദ്യമായി സ്നേഹത്തോടെ അവളുടെ പുറത്ത് തട്ടുന്നു.`,
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
