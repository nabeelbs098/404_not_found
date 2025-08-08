import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-background to-accent/50">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <Card className="w-full shadow-2xl animate-fade-in-up">
          <CardHeader>
            <CardTitle className="text-5xl font-headline tracking-tight">
              Welcome to EmotiScroll
            </CardTitle>
            <CardDescription className="text-lg pt-2">
              An interactive journey powered by your feelings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              "The Scroll of Feelings" is a unique story that unfolds as you do. Using your webcam, we'll guide you through a tale where your own facial expressions unlock the next chapter. Mimic the required emotion to proceed.
            </p>
            <p className="font-semibold text-primary">
              Ready to feel your way through the story?
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/emotion/happy">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
