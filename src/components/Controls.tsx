import React from 'react';
import { Play, Pause, Plus, Minus, Sun, Moon } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export function Controls({
  isPlaying,
  togglePlay,
  fontSize,
  onFontSizeChange,
  isDark,
  toggleTheme,
}: ControlsProps) {
  return (
    <div className="flex justify-between items-center py-2 md:py-4">
      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={togglePlay}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => onFontSizeChange(fontSize - 1)}
            className="p-1 md:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Decrease font size"
          >
            <Minus size={16} />
          </button>
          <span className="text-sm min-w-[2rem] text-center">{fontSize}px</span>
          <button
            onClick={() => onFontSizeChange(fontSize + 1)}
            className="p-1 md:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Increase font size"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
}