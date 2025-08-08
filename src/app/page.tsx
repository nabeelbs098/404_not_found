import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Wand } from 'lucide-react';
import { storyOrder } from '@/lib/story';

export default function Home() {
  const firstEmotion = storyOrder[0];

  return (
    <div className="min-h-full w-full bg-gradient-to-tr from-primary/10 via-background to-accent/20">
      <div className="container mx-auto px-4 py-8 sm:py-16 flex items-center justify-center min-h-full">
        <div className="w-full max-w-2xl text-center">
          <Card className="shadow-2xl bg-card/80 backdrop-blur-sm animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-headline text-5xl md:text-6xl tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent pb-2">
                The Scroll of Feelings
              </CardTitle>
              <CardDescription className="font-body text-lg md:text-xl text-muted-foreground pt-2">
                An interactive tale that unfolds with your expressions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 px-8 pb-8">
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                Welcome to EmotiScroll, a unique storytelling experience. To journey through our narrative, you'll use your webcam and the power of your emotions.
              </p>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                Each part of the story requires you to mirror an emotion. Match the feeling, and the scroll will move forward. Are you ready to begin?
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Link href={`/story/${firstEmotion}`}>
                    Start the Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Link href="/mood-booster">
                    Mood Booster
                    <Wand className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
