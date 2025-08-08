'use client';

import { useState, useEffect } from 'react';

const EMOJI_COUNT = 30;

const EmojiRain = ({ emoji }: { emoji: string }) => {
  const [emojis, setEmojis] = useState<{ id: number; left: string; animationDuration: string; animationDelay: string }[]>([]);

  useEffect(() => {
    const generateEmojis = () => {
      return Array.from({ length: EMOJI_COUNT }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}vw`,
        animationDuration: `${Math.random() * 2 + 3}s`, // 3s to 5s
        animationDelay: `${Math.random() * 2}s`,
      }));
    };
    setEmojis(generateEmojis());
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden">
      {emojis.map(({ id, left, animationDuration, animationDelay }) => (
        <span
          key={id}
          className="absolute text-3xl animate-fall"
          style={{
            left,
            animationDuration,
            animationDelay,
          }}
        >
          {emoji}
        </span>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            top: -10%;
            opacity: 1;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
};

export default EmojiRain;
