'use client';

import type { StoryPart, Emotion } from '@/lib/story';
import { emotionIcons } from '@/lib/story';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { handleCheckEmotion } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Loader2, VideoOff, AlertTriangle } from 'lucide-react';
import EmojiRain from './emoji-rain';

export default function StoryPageClient({ storyPart }: { storyPart: StoryPart }) {
  const { toast } = useToast();
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<'correct' | 'incorrect' | null>(null);
  const [webcamState, setWebcamState] = useState<'loading' | 'active' | 'error' | 'denied'>('loading');
  const [webcamError, setWebcamError] = useState<string | null>(null);

  useEffect(() => {
    async function setupWebcam() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
            setWebcamState('active');
          }
        } catch (err: any) {
          if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
              setWebcamState('denied');
              setWebcamError("Webcam access denied. Please enable it in your browser settings.");
          } else {
              setWebcamState('error');
              setWebcamError('Could not access webcam. Please ensure it is not in use by another application.');
          }
        }
      } else {
        setWebcamState('error');
        setWebcamError('Your browser does not support webcam access.');
      }
    }
    setupWebcam();
    
    return () => {
        if (webcamRef.current && webcamRef.current.srcObject) {
            const stream = webcamRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, []);

  const handleCheck = async () => {
    if (!webcamRef.current || !canvasRef.current) return;

    setIsChecking(true);
    setCheckResult(null);

    const video = webcamRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const photoDataUri = canvas.toDataURL('image/jpeg');

    const result = await handleCheckEmotion({
      photoDataUri,
      targetEmotion: storyPart.emotion,
    });

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: result.error,
      });
      setCheckResult('incorrect');
    } else if (result.matchesEmotion) {
      setCheckResult('correct');
    } else {
      setCheckResult('incorrect');
    }

    setIsChecking(false);
  };
  
  const renderWebcamFeed = () => {
    switch(webcamState) {
        case 'loading':
            return <div className="aspect-video bg-muted rounded-lg flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
        case 'denied':
        case 'error':
            return <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center text-center p-4"><VideoOff className="h-12 w-12 text-destructive mb-4" /><p className="font-semibold text-destructive">Webcam Error</p><p className="text-sm text-muted-foreground">{webcamError}</p></div>;
        case 'active':
            return <video ref={webcamRef} autoPlay playsInline muted className="w-full h-auto rounded-lg shadow-inner transform -scale-x-100" aria-label="Webcam feed"></video>;
    }
  }

  const Icon = emotionIcons[storyPart.iconName as Emotion];

  return (
    <>
      {checkResult === 'correct' && <EmojiRain emoji={storyPart.emoji} />}
      <div className="container mx-auto px-4 py-8 flex justify-center animate-fade-in">
        <div style={{ filter: checkResult === 'correct' ? storyPart.colorFilter : 'none', transition: 'filter 1s ease-in-out' }} className="w-full">
            <Card className="w-full max-w-4xl mx-auto shadow-2xl bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
                <div className="p-6 md:p-8 flex flex-col">
                    <CardHeader className="p-0">
                        <div className="flex items-center gap-3 mb-4">
                            <Icon className="h-10 w-10 text-primary" />
                            <CardTitle className="font-headline text-3xl md:text-4xl capitalize">
                                Chapter: {storyPart.emotion}
                            </CardTitle>
                        </div>
                        <CardDescription className="font-body text-lg text-foreground/80 leading-relaxed">
                            {storyPart.text}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow flex flex-col justify-center mt-6">
                      {checkResult === 'correct' ? (
                        <div className="text-center space-y-4 animate-fade-in-up">
                            <h3 className="font-headline text-2xl text-accent font-bold">Success!</h3>
                            <p>You've matched the emotion. The story continues...</p>
                        </div>
                      ) : (
                        <div className="text-center space-y-2">
                           <h3 className="font-headline text-2xl text-primary-foreground/90">Your Turn</h3>
                           <p className="text-muted-foreground">Show me a <span className="font-bold text-primary">{storyPart.emotion}</span> face!</p>
                           {checkResult === 'incorrect' && <p className="text-destructive font-semibold animate-shake">Not quite, try again!</p>}
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-0 mt-6">
                    {checkResult === 'correct' ? (
                        <Button asChild size="lg" className="w-full rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 bg-accent hover:bg-accent/90">
                            <Link href={storyPart.next}>
                            Next Chapter
                            <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    ) : (
                        <Button
                            onClick={handleCheck}
                            disabled={isChecking || webcamState !== 'active'}
                            size="lg"
                            className="w-full rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            {isChecking && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                            {isChecking ? 'Analyzing...' : 'Check My Emotion'}
                        </Button>
                    )}
                    </CardFooter>
                </div>
                <div className="bg-muted/50 p-4 md:p-6 flex items-center justify-center">
                    {renderWebcamFeed()}
                </div>
            </div>
            </Card>
        </div>
      </div>
      <canvas ref={canvasRef} className="hidden"></canvas>
    </>
  );
}
