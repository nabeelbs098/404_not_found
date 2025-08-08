<<<<<<< HEAD

import type { LucideIcon } from 'lucide-react';
import { Heart, Frown, Annoyed, Angry, PartyPopper } from 'lucide-react';
=======
import type { LucideIcon } from 'lucide-react';
import { Smile, Frown, Annoyed, Angry, PartyPopper } from 'lucide-react';
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593

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
<<<<<<< HEAD
    title: "സന്തോഷകരമായ തുടക്കം",
    text: `(ബാൽക്കണിയിൽ ഒരു ബക്കറ്റിൽ സോപ്പുപൊടി കലക്കിയ വെള്ളം. അമൃത, അർജുന്റെ വിലകൂടിയ ലാപ്ടോപ്പ് ആ വെള്ളത്തിൽ മുക്കി ഒരു സ്ക്രബ്ബർ ഉപയോഗിച്ച് നല്ലതുപോലെ ഉരച്ച് കഴുകുകയാണ്. അവൾ സന്തോഷത്തോടെ ഒരു പാട്ടും മൂളുന്നുണ്ട്.)
അമൃത (സ്വയം): (ചിരിച്ചുകൊണ്ട്) "അർജുൻ ഏട്ടൻ ഇന്നലെ പറഞ്ഞതേയുള്ളൂ, ലാപ്ടോപ്പിൽ നിറയെ വൈറസാണെന്ന്."`,
=======
    title: "A Happy Start",
    text: "The sun peeked through the clouds, casting a warm glow. A tiny seed, nestled in the soil, felt a surge of joy. It dreamed of the flower it would one day become.",
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
    iconName: 'happy',
    next: 'sad',
    emoji: '😊',
    colorFilter: 'sepia(30%) saturate(150%) brightness(105%)'
  },
  sad: {
    emotion: 'sad',
<<<<<<< HEAD
    title: "ഒന്നും നോക്കണ്ട കരഞ്ഞോ..",
    text: `അമൃത: (കരഞ്ഞുകൊണ്ട്) ഏട്ടൻ തന്നെയല്ലേ പറഞ്ഞത് ഇതിൽ നിറയെ അഴുക്കാണെന്ന്... ഞാൻ വൃത്തിയാക്കിയതാ...`,
=======
    title: "A Long Wait",
    text: "Days turned into weeks, but the seed remained dormant under the dry earth. It felt a deep sadness, longing for a single drop of rain to quench its thirst.",
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
    iconName: 'sad',
    next: 'surprised',
    emoji: '😢',
    colorFilter: 'grayscale(80%) brightness(90%)'
  },
  surprised: {
    emotion: 'surprised',
<<<<<<< HEAD
    title: "അപ്രതീക്ഷിത സമ്മാനം",
    text: `അർജുൻ: എന്താ... എന്താ അമ്മേ ഇവിടെയൊരു ബഹളം? (വെള്ളത്തിൽ കിടക്കുന്ന ലാപ്ടോപ്പ് കണ്ട് ഞെട്ടുന്നു) അമൃതാ!!! നീയെന്താ ഈ ചെയ്തത്?`,
=======
    title: "A Sudden Gift",
    text: "Suddenly, a gentle pitter-patter! The seed looked up in surprise. Rain! A tiny sprout burst forth, its leaves unfurling in astonishment at the wide, wet world.",
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
    iconName: 'surprised',
    next: 'angry',
    emoji: '😮',
    colorFilter: 'contrast(120%)'
  },
  angry: {
    emotion: 'angry',
<<<<<<< HEAD
    title: "കഠിനമായ പരീക്ഷണം",
    text: `(ബാൽക്കണിയിൽ ഒരു ബക്കറ്റിൽ സോപ്പുപൊടി കലക്കിയ വെള്ളം. അമൃത, അർജുന്റെ വിലകൂടിയ ലാപ്ടോപ്പ് ആ വെള്ളത്തിൽ മുക്കി ഒരു സ്ക്രബ്ബർ ഉപയോഗിച്ച് നല്ലതുപോലെ ഉരച്ച് കഴുകുകയാണ്. അവൾ സന്തോഷത്തോടെ ഒരു പാട്ടും മൂളുന്നുണ്ട്.)
അമൃത (സ്വയം): (ചിരിച്ചുകൊണ്ട്) "അർജുൻ ഏട്ടൻ ഇന്നലെ പറഞ്ഞതേയുള്ളൂ, ലാപ്ടോപ്പിൽ നിറയെ വൈറസാണെന്ന്."`,
=======
    title: "A Fierce Trial",
    text: "But the sky darkened. A fierce storm rolled in, its thunderous roar and lashing winds shaking the little sprout. It clenched its leaves, angry at the storm's fury.",
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
    iconName: 'angry',
    next: 'joy',
    emoji: '😠',
    colorFilter: 'hue-rotate(-20deg) saturate(200%) brightness(80%)'
  },
  joy: {
    emotion: 'joy',
<<<<<<< HEAD
    title: "വിജയകരമായ പൂവ്",
    text: `ഊർമിള ദേവി: (ട്രോഫി എടുത്ത് അമൃതയുടെ കയ്യിൽ തിരികെ കൊടുക്കുന്നു)
ഈ സമ്മാനം നിനക്കുള്ളതാണ്. നീയാണ് ഈ കുടുംബത്തിന്റെ യഥാർത്ഥ ഐശ്വര്യം. ഇന്ന് മുതൽ നീ ഈ വീടിന്റെ വെറും മരുമകളല്ല, എന്റെ സ്വന്തം മകളാണ്!
(പശ്ചാത്തലത്തിൽ സന്തോഷം നിറഞ്ഞ, ഗംഭീരമായ സംഗീതം ഉയർന്നുതുടങ്ങുന്നു.)
(അമൃതയ്ക്ക് സന്തോഷം സഹിക്കാൻ കഴിയുന്നില്ല.ഊർമിള ദേവി ആദ്യമായി സ്നേഹത്തോടെ അവളുടെ പുറത്ത് തട്ടുന്നു.`,
=======
    title: "A Triumphant Bloom",
    text: "The sprout held on. As the storm passed, a rainbow arched across the sky. Bathed in its colors, the sprout grew into a magnificent flower, bursting with pure joy.",
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
    iconName: 'joy',
    next: '/complete',
    emoji: '🎉',
    colorFilter: 'saturate(200%) brightness(110%)'
  }
};

export const storyOrder: Emotion[] = ['happy', 'sad', 'surprised', 'angry', 'joy'];

export const emotionIcons: Record<Emotion, LucideIcon> = {
<<<<<<< HEAD
    happy: Heart,
=======
    happy: Smile,
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
    sad: Frown,
    surprised: Annoyed,
    angry: Angry,
    joy: PartyPopper
};
