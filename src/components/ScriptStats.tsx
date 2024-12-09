import React from 'react';
import { Clock, Type, Hash, AlignJustify } from 'lucide-react';

interface ScriptStatsProps {
  text: string;
}

export function ScriptStats({ text }: ScriptStatsProps) {
  const words = text.trim() ? text.split(/\s+/).length : 0;
  const chars = text.length;
  const lines = text.split('\n').filter(Boolean).length;
  const readingTime = Math.ceil(words / 150); // Average reading speed: 150 words per minute

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
          <Type size={16} />
          <span>Words</span>
        </div>
        <div className="text-2xl font-semibold">{words}</div>
      </div>
      <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
          <Hash size={16} />
          <span>Characters</span>
        </div>
        <div className="text-2xl font-semibold">{chars}</div>
      </div>
      <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
          <AlignJustify size={16} />
          <span>Lines</span>
        </div>
        <div className="text-2xl font-semibold">{lines}</div>
      </div>
      <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
          <Clock size={16} />
          <span>Reading Time</span>
        </div>
        <div className="text-2xl font-semibold">{readingTime} min</div>
      </div>
    </div>
  );
}