import { story, storyOrder, type Emotion } from '@/lib/story';
import { notFound } from 'next/navigation';
import StoryPageClient from '@/components/story-page-client';
import { cn } from '@/lib/utils';

interface StoryPageProps {
  params: {
    emotion: Emotion;
  };
}

const emotionBackgrounds: Record<Emotion, string> = {
  happy: 'from-yellow-400/10 via-background to-yellow-600/10',
  angry: 'from-red-500/10 via-background to-red-700/10',
  surprised: 'from-purple-500/10 via-background to-purple-700/10',
  sad: 'from-blue-600/10 via-background to-blue-800/10',
  joy: 'from-pink-400/10 via-background to-orange-400/10',
};


export function generateStaticParams() {
  return storyOrder.map((emotion) => ({
    emotion,
  }));
}

export default function StoryPage({ params }: StoryPageProps) {
  const { emotion } = params;
  const storyPart = story[emotion];

  if (!storyPart) {
    notFound();
  }

  const backgroundClass = emotionBackgrounds[emotion] || 'from-background to-background';

  return (
    <div className={cn("min-h-full w-full bg-gradient-to-br", backgroundClass)}>
      <StoryPageClient storyPart={storyPart} />
    </div>
  );
}
