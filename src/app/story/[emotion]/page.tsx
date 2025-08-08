import { story, storyOrder, type Emotion } from '@/lib/story';
import { notFound } from 'next/navigation';
import StoryPageClient from '@/components/story-page-client';

interface StoryPageProps {
  params: {
    emotion: Emotion;
  };
}

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

  return <StoryPageClient storyPart={storyPart} />;
}
