'use client';

import type { StoryPart } from '@/lib/story';
import { emotionIcons } from '@/lib/story';
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { handleCheckEmotion } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Loader2, VideoOff } from 'lucide-react';
import EmojiRain from './emoji-rain';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function StoryPageClient({ storyPart }: { storyPart: StoryPart }) {
  const { toast } = useToast();
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<'correct' | 'incorrect' | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);

  const stopChecking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleCheck = useCallback(async () => {
    if (!webcamRef.current || !canvasRef.current || !webcamRef.current.srcObject || isChecking) {
        return;
    }

    setIsChecking(true);

    const video = webcamRef.current;
    const canvas = canvasRef.current;
    
    // Ensure the video is playing before trying to capture
    if (video.paused || video.ended || video.videoWidth === 0) {
        setIsChecking(false);
        return;
    }

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
      stopChecking(); // Stop checking once correct
    } else {
      setCheckResult('incorrect');
    }

    setIsChecking(false);
  }, [storyPart.emotion, toast, isChecking]);


  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('Camera not supported on this browser.');
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Not Supported',
          description: 'Your browser does not support camera access.',
        });
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (webcamRef.current) {
          webcamRef.current.srcObject = stream;
        }
        setHasCameraPermission(true);
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to use this app.',
        });
      }
    };

    getCameraPermission();

    // Cleanup function to stop camera and interval
    return () => {
      stopChecking();
      if (webcamRef.current && webcamRef.current.srcObject) {
        const stream = webcamRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  useEffect(() => {
    // Start automatic checking only when camera is ready and not already correct
    if (hasCameraPermission && checkResult !== 'correct') {
      stopChecking(); // Clear any existing interval
      intervalRef.current = setInterval(handleCheck, 3000); // Check every 3 seconds
    }
    
    // Cleanup on dependency change
    return () => stopChecking();
  }, [hasCameraPermission, checkResult, handleCheck]);
  
  const renderWebcamFeed = () => {
    return (
      <div className="relative w-full aspect-video bg-muted rounded-lg flex items-center justify-center overflow-hidden">
        <video ref={webcamRef} autoPlay playsInline muted className="w-full h-full rounded-lg shadow-inner transform -scale-x-100 object-cover" aria-label="Webcam feed"></video>
        { hasCameraPermission === undefined && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-muted/80">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Initializing Camera...</p>
          </div>
        )}
        { hasCameraPermission === false && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-muted/80">
            <Alert variant="destructive">
              <VideoOff className="h-4 w-4" />
              <AlertTitle>Camera Access Required</AlertTitle>
              <AlertDescription>
                Please allow camera access. You may need to grant permission in your browser settings.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    );
  }

  const Icon = emotionIcons[storyPart.iconName];

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
                           {isChecking && <div className="flex items-center justify-center text-muted-foreground"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Checking...</div>}
                           {checkResult === 'incorrect' && !isChecking && <p className="text-destructive font-semibold animate-shake">Not quite, let's try again.</p>}
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
                            disabled={isChecking || !hasCameraPermission}
                            size="lg"
                            className="w-full rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            {isChecking && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                            {isChecking ? 'Analyzing...' : 'Check My Emotion Manually'}
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
