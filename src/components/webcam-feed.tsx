'use client';

import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
} from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Video, VideoOff } from 'lucide-react';

export interface WebcamRef {
  captureFrame: () => string | null;
}

interface WebcamFeedProps {
  onLoaded: () => void;
}

const WebcamFeed = forwardRef<WebcamRef, WebcamFeedProps>(({ onLoaded }, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  const startWebcam = async () => {
    setError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: 'user' },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
             setIsReady(true);
             onLoaded();
          };
        }
      } else {
        throw new Error('getUserMedia not supported');
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      if (err instanceof DOMException) {
         if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
             setError("Webcam access was denied. Please allow camera permissions in your browser settings to continue.");
         } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
             setError("No webcam was found. Please ensure a camera is connected and enabled.");
         } else {
             setError('An error occurred while accessing the webcam.');
         }
      } else {
        setError('An error occurred while accessing the webcam.');
      }
    }
  };

  useEffect(() => {
    startWebcam();
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    captureFrame: () => {
      if (videoRef.current && canvasRef.current && isReady) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
          context.scale(-1, 1); // Flip horizontally
          context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
          return canvas.toDataURL('image/jpeg');
        }
      }
      return null;
    },
  }));

  if (error) {
    return (
      <Alert variant="destructive" className="w-full max-w-md">
        <VideoOff className="h-4 w-4" />
        <AlertTitle>Webcam Error</AlertTitle>
        <AlertDescription>
          {error}
          <Button onClick={startWebcam} variant="secondary" className="mt-4">Try Again</Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] bg-muted rounded-lg overflow-hidden border shadow-inner">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover transform -scale-x-100"
      />
      <canvas ref={canvasRef} className="hidden" />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white">
           <Video className="h-8 w-8 mr-2 animate-pulse" />
           <p>Starting webcam...</p>
        </div>
      )}
    </div>
  );
});

WebcamFeed.displayName = 'WebcamFeed';
export default WebcamFeed;
