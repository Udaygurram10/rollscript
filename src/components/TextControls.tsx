import React from 'react';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TextControlsProps {
  fontFamily: string;
  onFontFamilyChange: (font: string) => void;
  lineHeight: number;
  onLineHeightChange: (height: number) => void;
  textAlign: 'left' | 'center' | 'right';
  onTextAlignChange: (align: 'left' | 'center' | 'right') => void;
  bgOpacity: number;
  onBgOpacityChange: (opacity: number) => void;
}

export function TextControls({
  fontFamily,
  onFontFamilyChange,
  lineHeight,
  onLineHeightChange,
  textAlign,
  onTextAlignChange,
  bgOpacity,
  onBgOpacityChange,
}: TextControlsProps) {
  const fonts = [
    'Arial',
    'Times New Roman',
    'Courier New',
    'Georgia',
    'Verdana',
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <select
        value={fontFamily}
        onChange={(e) => onFontFamilyChange(e.target.value)}
        className="px-3 py-1 rounded border dark:bg-gray-700 dark:border-gray-600"
      >
        {fonts.map((font) => (
          <option key={font} value={font}>
            {font}
          </option>
        ))}
      </select>

      <div className="flex items-center gap-2">
        <label className="text-sm">Line Height:</label>
        <input
          type="range"
          min="1"
          max="2"
          step="0.1"
          value={lineHeight}
          onChange={(e) => onLineHeightChange(Number(e.target.value))}
          className="w-24"
        />
      </div>

      <div className="flex items-center gap-1 border rounded dark:border-gray-600">
        <button
          onClick={() => onTextAlignChange('left')}
          className={`p-2 ${
            textAlign === 'left' ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          <AlignLeft size={16} />
        </button>
        <button
          onClick={() => onTextAlignChange('center')}
          className={`p-2 ${
            textAlign === 'center' ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          <AlignCenter size={16} />
        </button>
        <button
          onClick={() => onTextAlignChange('right')}
          className={`p-2 ${
            textAlign === 'right' ? 'bg-gray-200 dark:bg-gray-700' : ''
          }`}
        >
          <AlignRight size={16} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm">Background Opacity:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={bgOpacity}
          onChange={(e) => onBgOpacityChange(Number(e.target.value))}
          className="w-24"
        />
      </div>
    </div>
  );
}