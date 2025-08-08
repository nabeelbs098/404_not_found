import { notFound, redirect } from 'next/navigation';
import { EmotionChallenge } from '@/components/emotion-challenge';
import { getEmotionData } from '@/lib/emotions';
import type { EmotionId } from '@/lib/emotions';
import { EmotionBackground } from '@/components/effects/emotion-background';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export function generateStaticParams() {
  return [
    { emotion: 'happy' },
    { emotion: 'sad' },
    { emotion: 'angry' },
    { emotion: 'surprised' },
    { emotion: 'fear' },
  ];
}

export default function EmotionPage({ params }: { params: { emotion: string } }) {
  const emotionId = params.emotion as EmotionId;
  const emotion = getEmotionData(emotionId);

  if (!emotion) {
    notFound();
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8">
      <EmotionBackground emotionId={emotion.id} />
       <div className="absolute top-4 left-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/">
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </Button>
      </div>
      <EmotionChallenge emotion={emotion} />
    </main>
  );
}
