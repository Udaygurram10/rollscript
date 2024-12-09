import React from 'react';

interface SeekBarProps {
  position: number;
  maxScroll: number;
  onSeek: (percentage: number) => void;
}

export function SeekBar({ position, maxScroll, onSeek }: SeekBarProps) {
  const percentage = maxScroll > 0 ? (position / maxScroll) * 100 : 0;

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0 && value <= 100) {
      onSeek(value);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium min-w-[3ch]">{Math.round(percentage)}%</span>
      <input
        type="range"
        min="0"
        max="100"
        value={percentage}
        onChange={handleSeek}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                 dark:bg-gray-700 accent-blue-500"
        aria-label="Seek position"
      />
    </div>
  );
}