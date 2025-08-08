<<<<<<< HEAD

=======
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
'use client';

import type { StoryPart } from '@/lib/story';
import { emotionIcons } from '@/lib/story';
<<<<<<< HEAD
import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
=======
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { handleCheckEmotion } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
<<<<<<< HEAD
import { ArrowRight, Loader2, VideoOff, Lightbulb, Radio } from 'lucide-react';
=======
import { ArrowRight, Loader2, Video, VideoOff } from 'lucide-react';
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
import EmojiRain from './emoji-rain';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function StoryPageClient({ storyPart }: { storyPart: StoryPart }) {
  const { toast } = useToast();
<<<<<<< HEAD
  const router = useRouter();
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
=======
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593

  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<'correct' | 'incorrect' | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);
<<<<<<< HEAD
  const [expressionSuggestion, setExpressionSuggestion] = useState<string | null>(null);

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
      setExpressionSuggestion('There was an error analyzing the image.');
    } else if (result.matchesEmotion) {
      setCheckResult('correct');
      setExpressionSuggestion(null);
      stopChecking();
    } else {
      setCheckResult('incorrect');
      if (result.suggestion) {
        setExpressionSuggestion(result.suggestion);
      } else {
        setExpressionSuggestion("Not quite, try adjusting your expression.");
      }
    }

    setIsChecking(false);
  }, [storyPart.emotion, toast, isChecking]);

=======
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593

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

    return () => {
<<<<<<< HEAD
      stopChecking();
=======
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
      if (webcamRef.current && webcamRef.current.srcObject) {
        const stream = webcamRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

<<<<<<< HEAD
  useEffect(() => {
    if (hasCameraPermission && checkResult !== 'correct') {
      stopChecking(); 
      intervalRef.current = setInterval(handleCheck, 2000); // Check every 2 seconds
    }
    
    return () => stopChecking();
  }, [hasCameraPermission, checkResult, handleCheck]);

  useEffect(() => {
    if (checkResult === 'correct') {
      const timer = setTimeout(() => {
        router.push(storyPart.next);
      }, 2000); // 2-second delay before navigating

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [checkResult, router, storyPart.next]);
=======
  const handleCheck = async () => {
    if (!webcamRef.current || !canvasRef.current || !webcamRef.current.srcObject) {
        toast({
            variant: 'destructive',
            title: 'Camera Not Ready',
            description: 'Please ensure camera access is enabled and try again.',
        });
        return;
    }

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
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
  
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
<<<<<<< HEAD
                        <div className="space-y-4">
                           <div className="text-center">
                             <h3 className="font-headline text-2xl text-primary-foreground/90">Your Turn</h3>
                             <p className="text-muted-foreground">Show me a <span className="font-bold text-primary">{storyPart.emotion}</span> face!</p>
                           </div>
                           
                            <div className="bg-primary/20 p-4 rounded-lg mt-4 animate-fade-in-up">
                                <p className="font-headline text-lg text-primary font-bold flex items-center justify-center gap-2">
                                  {isChecking ? <Loader2 className="h-5 w-5 animate-spin"/> : <Radio className="h-5 w-5 animate-pulse text-destructive" />}
                                  Live Analysis On
                                </p>
                                {expressionSuggestion && (
                                  <p className="text-foreground/80 mt-2 text-center">
                                    <Lightbulb className="h-4 w-4 inline-block mr-1" />
                                    {expressionSuggestion}
                                  </p>
                                )}
                            </div>
=======
                        <div className="text-center space-y-2">
                           <h3 className="font-headline text-2xl text-primary-foreground/90">Your Turn</h3>
                           <p className="text-muted-foreground">Show me a <span className="font-bold text-primary">{storyPart.emotion}</span> face!</p>
                           {checkResult === 'incorrect' && <p className="text-destructive font-semibold animate-shake">Not quite, try again!</p>}
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="p-0 mt-6">
                    {checkResult === 'correct' ? (
<<<<<<< HEAD
                        <Button disabled size="lg" className="w-full rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 bg-accent hover:bg-accent/90">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Loading Next Chapter...
=======
                        <Button asChild size="lg" className="w-full rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow duration-300 bg-accent hover:bg-accent/90">
                            <Link href={storyPart.next}>
                            Next Chapter
                            <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
                        </Button>
                    ) : (
                        <Button
                            onClick={handleCheck}
                            disabled={isChecking || !hasCameraPermission}
                            size="lg"
                            className="w-full rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow duration-300"
<<<<<<< HEAD
                            variant="outline"
                        >
                            {isChecking && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                            Check Manually
=======
                        >
                            {isChecking && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                            {isChecking ? 'Analyzing...' : 'Check My Emotion'}
>>>>>>> d9d7f407c9cea52721995ebcd476129959a23593
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
