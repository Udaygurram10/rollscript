import { useEffect } from 'react';

interface KeyboardShortcuts {
  onTogglePlay: () => void;
  onSpeedUp: () => void;
  onSpeedDown: () => void;
  onFontSizeUp: () => void;
  onFontSizeDown: () => void;
}

export function useKeyboardShortcuts({
  onTogglePlay,
  onSpeedUp,
  onSpeedDown,
  onFontSizeUp,
  onFontSizeDown,
}: KeyboardShortcuts) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          onTogglePlay();
          break;
        case 'ArrowUp':
          e.preventDefault();
          onSpeedUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          onSpeedDown();
          break;
        case 'Equal':
        case 'NumpadAdd':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onFontSizeUp();
          }
          break;
        case 'Minus':
        case 'NumpadSubtract':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onFontSizeDown();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onTogglePlay, onSpeedUp, onSpeedDown, onFontSizeUp, onFontSizeDown]);
}