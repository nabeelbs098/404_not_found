'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { handleSuggestMoodBooster } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2, VideoOff, Wand, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MoodBoosterPage() {
  const { toast } = useToast();
  const webcamRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ emotion: string; suggestion?: string } | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | undefined>(undefined);

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
      if (webcamRef.current && webcamRef.current.srcObject) {
        const stream = webcamRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  const handleCheck = async () => {
    if (!webcamRef.current || !canvasRef.current || !webcamRef.current.srcObject) {
      toast({
          variant: 'destructive',
          title: 'Camera Not Ready',
          description: 'Please ensure camera access is enabled and try again.',
      });
      return;
    }

    setIsLoading(true);
    setResult(null);

    const video = webcamRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

    const photoDataUri = canvas.toDataURL('image/jpeg');

    const res = await handleSuggestMoodBooster({ photoDataUri });

    if (res.error) {
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description: res.error,
      });
    } else if (res.emotion) {
      setResult({ emotion: res.emotion, suggestion: res.suggestion });
    }

    setIsLoading(false);
  };

  const reset = () => {
    setResult(null);
  }

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

  return (
    <div className="min-h-full w-full bg-gradient-to-br from-indigo-400/20 via-purple-400/10 to-teal-400/20">
      <div className="container mx-auto px-4 py-8 flex justify-center animate-fade-in">
        <Card className="w-full max-w-4xl mx-auto shadow-2xl bg-card/80 backdrop-blur-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-6 md:p-8 flex flex-col">
              <CardHeader className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <Wand className="h-10 w-10 text-primary" />
                  <CardTitle className="font-headline text-3xl md:text-4xl capitalize">
                    Mood Booster
                  </CardTitle>
                </div>
                <CardDescription className="font-body text-lg text-foreground/80 leading-relaxed">
                  Let's check in on how you're feeling. Take a snapshot and I'll see if I can brighten your day!
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex-grow flex flex-col justify-center mt-6">
                {result ? (
                  <div className="text-center space-y-4 animate-fade-in-up">
                    <h3 className="font-headline text-2xl text-primary-foreground/90">I see you're feeling <span className="font-bold text-primary capitalize">{result.emotion}</span>.</h3>
                    {result.suggestion && (
                        <div className="bg-accent/20 p-4 rounded-lg">
                            <p className="font-headline text-xl text-accent font-bold">Here's a little idea:</p>
                            <p className="text-foreground/80 mt-2">{result.suggestion}</p>
                        </div>
                    )}
                    {!result.suggestion && <p>That's great! Keep shining.</p>}
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                     <h3 className="font-headline text-2xl text-primary-foreground/90">Your Turn</h3>
                     <p className="text-muted-foreground">Ready? Look at the camera and I'll check your emotion.</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="p-0 mt-6">
                {result ? (
                    <Button onClick={reset} size="lg" className="w-full rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Try Again
                    </Button>
                ) : (
                    <Button
                        onClick={handleCheck}
                        disabled={isLoading || !hasCameraPermission}
                        size="lg"
                        className="w-full rounded-full font-bold shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                        {isLoading ? 'Analyzing...' : 'Check My Mood'}
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
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
