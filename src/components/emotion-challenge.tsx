'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { analyzeEmotion, AnalyzeEmotionOutput } from '@/ai/flows/analyze-emotion';
import { provideEmotionFeedback, ProvideEmotionFeedbackOutput } from '@/ai/flows/provide-emotion-feedback';
import { EMOTIONS, EmotionId } from '@/lib/emotions';
import WebcamFeed, { type WebcamRef } from '@/components/webcam-feed';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { emotionIcons } from '@/lib/story';

interface EmotionChallengeProps {
  emotion: (typeof EMOTIONS)[number];
}

export function EmotionChallenge({ emotion }: EmotionChallengeProps) {
  const router = useRouter();
  const { toast } = useToast();
  const webcamRef = useRef<WebcamRef>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<ProvideEmotionFeedbackOutput | null>(null);
  const [matchResult, setMatchResult] = useState<AnalyzeEmotionOutput | null>(null);

  const isMatch = matchResult?.isMatch ?? false;

  const handleAnalysis = useCallback(async () => {
    if (isAnalyzing || isMatch) return;

    const imageDataUri = webcamRef.current?.captureFrame();
    if (!imageDataUri) return;

    setIsAnalyzing(true);
    try {
      // Run both analysis and feedback calls in parallel
      const [feedbackRes, matchRes] = await Promise.all([
        provideEmotionFeedback({ photoDataUri: imageDataUri, targetEmotion: emotion.name }),
        analyzeEmotion({ photoDataUri: imageDataUri, targetEmotion: emotion.name }),
      ]);
      setFeedback(feedbackRes);
      setMatchResult(matchRes);
    } catch (error) {
      console.error("AI analysis failed:", error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Could not analyze the emotion. Please try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [isAnalyzing, isMatch, emotion.name, toast]);
  
  useEffect(() => {
    // Only run on the client
    if (!isClient) return;

    if (!isLoading && !isMatch) {
      // Start the interval and store its ID
      analysisIntervalRef.current = setInterval(handleAnalysis, 3000);
    }
    
    // Cleanup function to clear the interval
    return () => {
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, [isLoading, isMatch, handleAnalysis, isClient]);
  
  const EmotionIcon = emotionIcons[emotion.id as keyof typeof emotionIcons] || emotionIcons['happy'];

  const nextPath = emotion.next === 'complete' ? '/complete' : `/story/${emotion.next}`;

  return (
    <Card className="w-full max-w-4xl bg-card/80 backdrop-blur-sm shadow-2xl animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-3xl font-headline tracking-tight flex items-center justify-center gap-4">
            Show Me: <span className="text-primary">{emotion.name}</span> <EmotionIcon className="h-8 w-8 text-primary" />
        </CardTitle>
        <CardDescription className="text-center pt-2">
            Read the story snippet and match the emotion to continue.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
            <WebcamFeed ref={webcamRef} onLoaded={() => setIsLoading(false)} />
             <div className="h-20">
                {isLoading ? (
                    <div className="flex items-center justify-center text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Initializing camera...</div>
                ) : isMatch ? (
                    <Alert variant="default" className="border-green-500 bg-green-500/10 text-green-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <AlertTitle className="font-bold">Emotion Matched!</AlertTitle>
                        <AlertDescription>Great job! You can now proceed to the next feeling.</AlertDescription>
                    </Alert>
                ) : (
                    <Alert>
                        {isAnalyzing && <Loader2 className="absolute top-2 right-2 text-primary h-4 w-4 animate-spin" />}
                        <AlertTitle>Feedback</AlertTitle>
                        <AlertDescription>{feedback?.feedbackMessage ?? "Align your face with the camera..."}</AlertDescription>
                    </Alert>
                )}
            </div>
             <Progress value={isMatch ? 100 : (matchResult?.matchConfidence ?? 0) * 100} className="h-2" />
        </div>
        <div className="space-y-6 flex flex-col justify-between h-full">
            <div className="p-6 border rounded-lg bg-background/50">
                <p className="text-lg leading-relaxed text-foreground/80">{emotion.story}</p>
            </div>
             {isMatch && (
                <Button asChild size="lg" className="w-full group animate-pulse">
                    <Link href={nextPath}>
                        Scroll to the Next Feeling <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </Button>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
