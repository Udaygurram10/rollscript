import React from 'react';
import { Gauge } from 'lucide-react';

interface SpeedControlProps {
  speed: number;
  onChange: (speed: number) => void;
}

export function SpeedControl({ speed, onChange }: SpeedControlProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Gauge size={20} className="text-gray-500" />
        <label htmlFor="speed-control" className="text-sm font-medium whitespace-nowrap">
          Speed: {speed}x
        </label>
      </div>
      <input
        id="speed-control"
        type="range"
        min="1"
        max="10"
        value={speed}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                   dark:bg-gray-700 accent-blue-500"
        aria-label="Scroll speed control"
      />
    </div>
  );
}