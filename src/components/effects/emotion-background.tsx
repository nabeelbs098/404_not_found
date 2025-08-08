'use client';

import { cn } from '@/lib/utils';
import type { EmotionId } from '@/lib/emotions';
import { EmojiRain } from './emoji-rain';

interface EmotionBackgroundProps {
  emotionId: EmotionId;
}

export function EmotionBackground({ emotionId }: EmotionBackgroundProps) {
  return (
    <div
      className={cn(
        'fixed inset-0 -z-10 transition-colors duration-1000',
        {
          'bg-yellow-400/10': emotionId === 'happy',
          'bg-blue-900/20': emotionId === 'sad',
          'bg-red-900/20': emotionId === 'angry',
          'bg-purple-900/20': emotionId === 'surprised',
          'bg-gray-900/20': emotionId === 'fear',
        }
      )}
    >
      {emotionId === 'happy' && <EmojiRain />}
      {emotionId === 'sad' && (
         <div className="absolute inset-0 bg-blue-500/20 mix-blend-multiply" />
      )}
       {emotionId === 'angry' && (
         <div className="absolute inset-0 bg-red-700/20 mix-blend-hard-light animate-pulse" />
      )}
       {emotionId === 'surprised' && (
         <div className="absolute inset-0 bg-purple-500/20 mix-blend-overlay" />
      )}
      {emotionId === 'fear' && (
         <div className="absolute inset-0 bg-black/50 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      )}
    </div>
  );
}
