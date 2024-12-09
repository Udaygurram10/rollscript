import { useRef, useState, useCallback, useEffect } from 'react';

interface ScrollState {
  position: number;
  maxScroll: number;
}

export function useHorizontalScroll(speed: number) {
  const [scrollState, setScrollState] = useState<ScrollState>({ position: 0, maxScroll: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const speedFactor = useRef(0.5);
  const isScrolling = useRef(false);

  // Dynamically adjust speed factor based on viewport width
  useEffect(() => {
    const updateSpeedFactor = () => {
      if (containerRef.current) {
        const { clientWidth } = containerRef.current;
        speedFactor.current = Math.max(0.2, Math.min(0.8, clientWidth / 1920));
      }
    };

    updateSpeedFactor();
    window.addEventListener('resize', updateSpeedFactor);
    return () => window.removeEventListener('resize', updateSpeedFactor);
  }, []);

  const updateScrollState = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setScrollState({
        position: scrollLeft,
        maxScroll: Math.max(0, scrollWidth - clientWidth)
      });
    }
  }, []);

  const scroll = useCallback(() => {
    if (containerRef.current && isScrolling.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      
      if (scrollLeft < maxScroll) {
        const baseSpeed = Math.max(1, Math.min(10, speed));
        const scrollStep = baseSpeed * speedFactor.current;
        containerRef.current.scrollLeft += scrollStep;
        updateScrollState();
        animationRef.current = requestAnimationFrame(scroll);
      } else {
        stopScroll();
      }
    }
  }, [speed, updateScrollState]);

  const startScroll = useCallback(() => {
    if (containerRef.current) {
      isScrolling.current = true;
      updateScrollState();
      if (!animationRef.current) {
        animationRef.current = requestAnimationFrame(scroll);
      }
    }
  }, [scroll, updateScrollState]);

  const stopScroll = useCallback(() => {
    isScrolling.current = false;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
  }, []);

  const seekTo = useCallback((percentage: number) => {
    if (containerRef.current && percentage >= 0 && percentage <= 100) {
      const { scrollWidth, clientWidth } = containerRef.current;
      const maxScroll = Math.max(0, scrollWidth - clientWidth);
      const newPosition = (maxScroll * percentage) / 100;
      containerRef.current.scrollLeft = newPosition;
      updateScrollState();
    }
  }, [updateScrollState]);

  // Reset scroll position when text changes
  const resetScroll = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
      updateScrollState();
    }
  }, [updateScrollState]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopScroll();
    };
  }, [stopScroll]);

  return {
    containerRef,
    scrollState,
    seekTo,
    startScroll,
    stopScroll,
    resetScroll,
    updateScrollState
  };
}