import React from 'react';
import { Settings as SettingsIcon, FlipHorizontal, Type } from 'lucide-react';

interface SettingsProps {
  isMirrored: boolean;
  onToggleMirror: () => void;
  textColor: string;
  onTextColorChange: (color: string) => void;
}

export function Settings({
  isMirrored,
  onToggleMirror,
  textColor,
  onTextColorChange,
}: SettingsProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <FlipHorizontal size={20} />
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isMirrored}
            onChange={onToggleMirror}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                        peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full 
                        peer dark:bg-gray-700 peer-checked:after:translate-x-full 
                        peer-checked:after:border-white after:content-[''] after:absolute 
                        after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                        after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                        dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium">Mirror Text</span>
        </label>
      </div>
      
      <div className="flex items-center gap-2">
        <Type size={20} />
        <input
          type="color"
          value={textColor}
          onChange={(e) => onTextColorChange(e.target.value)}
          className="w-8 h-8 rounded cursor-pointer"
          title="Text Color"
        />
      </div>
    </div>
  );
}