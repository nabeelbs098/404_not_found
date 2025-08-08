import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, RotateCcw } from 'lucide-react';

export default function CongratulationsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/20 via-background to-accent/50">
      <div className="flex flex-col items-center text-center max-w-2xl">
        <Card className="w-full shadow-2xl animate-fade-in-up">
          <CardHeader className="items-center">
            <Award className="h-16 w-16 text-yellow-500" />
            <CardTitle className="text-5xl font-headline tracking-tight text-primary pt-4">
              Congratulations!
            </CardTitle>
            <CardDescription className="text-lg pt-2">
              You have successfully navigated The Scroll of Feelings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              You've completed the robot's emotional journey, from the spark of happiness to the chill of fear. Thank you for exploring this story with your feelings.
            </p>
            <Button asChild size="lg" className="group">
              <Link href="/">
                Play Again <RotateCcw className="ml-2 h-5 w-5 transition-transform group-hover:rotate-[-45deg]" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
