import { useRef, useState, useEffect } from 'react';

export function useAutoScroll(speed: number) {
  const [isPlaying, setIsPlaying] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  const scroll = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop += speed * 0.5;
      animationRef.current = requestAnimationFrame(scroll);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(scroll);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  return { isPlaying, togglePlay, containerRef };
}