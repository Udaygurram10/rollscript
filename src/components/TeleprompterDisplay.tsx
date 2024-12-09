import React, { forwardRef, useImperativeHandle, useEffect, useCallback } from 'react';
import { Play, Pause, Plus, Minus, Sun, Moon } from 'lucide-react';
import { useHorizontalScroll } from '../hooks/useHorizontalScroll';
import { useTheme } from '../hooks/useTheme';
import { SeekBar } from './SeekBar';

interface TeleprompterDisplayProps {
  text: string;
  speed: number;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  isMirrored: boolean;
  textColor: string;
  fontFamily: string;
  lineHeight: number;
  textAlign: 'left' | 'center' | 'right';
  bgOpacity: number;
  isPlaying: boolean;
  onPlayChange: (isPlaying: boolean) => void;
}

export const TeleprompterDisplay = forwardRef<{ togglePlay: () => void }, TeleprompterDisplayProps>(({
  text,
  speed,
  fontSize,
  onFontSizeChange,
  isMirrored,
  textColor,
  fontFamily,
  lineHeight,
  textAlign,
  bgOpacity,
  isPlaying,
  onPlayChange,
}, ref) => {
  const { containerRef, scrollState, seekTo, startScroll, stopScroll, resetScroll } = useHorizontalScroll(speed);
  const { isDark, toggleTheme } = useTheme();

  const lines = text.split('\n').filter(line => line.trim());

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      stopScroll();
    } else {
      startScroll();
    }
    onPlayChange(!isPlaying);
  }, [isPlaying, startScroll, stopScroll, onPlayChange]);

  useImperativeHandle(ref, () => ({
    togglePlay: handleTogglePlay
  }), [handleTogglePlay]);

  // Handle play state changes
  useEffect(() => {
    if (isPlaying) {
      startScroll();
    } else {
      stopScroll();
    }
  }, [isPlaying, startScroll, stopScroll]);

  // Reset scroll position when text changes
  useEffect(() => {
    resetScroll();
  }, [text, resetScroll]);

  return (
    <div className="relative bg-white dark:bg-gray-800">
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handleTogglePlay}
              className="p-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => onFontSizeChange(fontSize - 1)}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Decrease font size"
              >
                <Minus size={18} />
              </button>
              <span className="min-w-[3ch] text-center font-medium">{fontSize}</span>
              <button
                onClick={() => onFontSizeChange(fontSize + 1)}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Increase font size"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="mt-4">
          <SeekBar
            position={scrollState.position}
            maxScroll={scrollState.maxScroll}
            onSeek={seekTo}
          />
        </div>
      </div>

      <div
        ref={containerRef}
        className="overflow-x-scroll scrollbar-hide h-[calc(40vh-8rem)] relative"
        role="region"
        aria-label="Teleprompter display"
      >
        <div 
          className="flex flex-nowrap py-8"
          style={{
            transform: isMirrored ? 'scaleX(-1)' : 'none',
          }}
        >
          {lines.map((line, index) => (
            <div
              key={index}
              className={`flex-none px-6 whitespace-nowrap ${
                textAlign === 'center' ? 'text-center' :
                textAlign === 'right' ? 'text-right' : 'text-left'
              }`}
              style={{ 
                fontSize: `${fontSize}px`,
                color: textColor || (isDark ? 'white' : 'black'),
                fontFamily,
                lineHeight,
              }}
            >
              {line || 'Enter your script below to begin...'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

TeleprompterDisplay.displayName = 'TeleprompterDisplay';