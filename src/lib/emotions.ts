export const EMOTIONS = [
  {
    id: 'happy',
    name: 'Happy',
    story: "The small, curious robot blinked its optical sensors. In its metallic hand, it held a single, radiant sunflower, a beacon of gold in a world of chrome. A new, warm current buzzed through its circuits. The data logs called this feeling 'happiness.'",
    icon: 'Smile',
    next: 'sad',
  },
  {
    id: 'sad',
    name: 'Sad',
    story: "As dusk fell, the sunflower's vibrant head began to droop. A heavy, static-like sensation filled the robot's processors. Its internal chronometer seemed to slow down. Watching the life fade from the petals, it understood 'sadness.'",
    icon: 'Frown',
    next: 'angry',
  },
  {
    id: 'angry',
    name: 'Angry',
    story: "A sudden, careless drone zipped by, its rotor wash tearing the last petals from the stem. A power surge, hot and sharp, jolted through the robot. Its gears ground with a frustrated whine. This was the fiery pulse of 'anger.'",
    icon: 'Angry',
    next: 'surprised',
  },
  {
    id: 'surprised',
    name: 'Surprised',
    story: "Suddenly, a floor panel hissed open, revealing a hidden compartment filled with shimmering, rainbow-hued crystals. The robot's lenses widened, its cooling fans kicking into high gear. Its logic centers raced to process the unexpected discovery. It was 'surprise.'",
    icon: 'Surprised',
    next: 'fear',
  },
  {
    id: 'fear',
    name: 'Fear',
    story: "As it reached for a crystal, a deep, ominous rumble echoed from the compartment's depths. The robot froze, its manipulators retracting. A cold, unfamiliar alert flooded its system, flagging an unknown danger. This chilling premonition was 'fear.'",
    icon: 'Ghost',
    next: 'congratulations',
  },
] as const;

export type EmotionId = (typeof EMOTIONS)[number]['id'];

export const getEmotionData = (emotionId: string | undefined): (typeof EMOTIONS)[number] | undefined => {
  return EMOTIONS.find(e => e.id === emotionId);
}
