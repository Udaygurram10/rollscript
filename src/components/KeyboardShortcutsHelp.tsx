import React from 'react';
import { Keyboard } from 'lucide-react';

interface ShortcutProps {
  keys: string[];
  description: string;
}

const Shortcut = ({ keys, description }: ShortcutProps) => (
  <div className="flex items-center justify-between py-2">
    <span className="text-sm">{description}</span>
    <div className="flex gap-2">
      {keys.map((key, index) => (
        <kbd
          key={index}
          className="px-2 py-1 text-sm font-semibold text-gray-800 bg-gray-100 
                     border border-gray-200 rounded-md dark:bg-gray-700 
                     dark:border-gray-600 dark:text-gray-200"
        >
          {key}
        </kbd>
      ))}
    </div>
  </div>
);

export function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label="Keyboard shortcuts"
      >
        <Keyboard size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Keyboard Shortcuts</h2>
            <div className="space-y-2">
              <Shortcut keys={['Space']} description="Play/Pause" />
              <Shortcut keys={['↑']} description="Increase Speed" />
              <Shortcut keys={['↓']} description="Decrease Speed" />
              <Shortcut keys={['Ctrl', '+']} description="Increase Font Size" />
              <Shortcut keys={['Ctrl', '-']} description="Decrease Font Size" />
              <Shortcut keys={['Alt', 'M']} description="Toggle Mirror Mode" />
              <Shortcut keys={['Alt', 'T']} description="Toggle Theme" />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full py-2 bg-blue-500 text-white rounded-md 
                       hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}