"use client";

import React, { useEffect, useState } from 'react';

const emojis = ['😀', '😂', '😍', '🥳', '🤩', '😎'];

export function EmojiRain() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: 25 }).map((_, index) => {
        const style = {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 3 + 4}s`,
          animationDelay: `${Math.random() * 5}s`,
        };
        return (
          <span key={index} className="emoji" style={style}>
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </span>
        );
      })}
    </div>
  );
}
