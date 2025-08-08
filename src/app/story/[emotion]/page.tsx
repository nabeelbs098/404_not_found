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
  happy: 'from-yellow-200/20 via-background to-orange-200/20',
  angry: 'from-red-300/20 via-background to-rose-300/20',
  surprised: 'from-purple-300/20 via-background to-indigo-300/20',
  sad: 'from-blue-300/20 via-background to-sky-300/20',
  joy: 'from-pink-300/20 via-background to-violet-300/20',
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
