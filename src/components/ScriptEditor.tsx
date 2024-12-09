import React from 'react';

interface ScriptEditorProps {
  value: string;
  onChange: (text: string) => void;
}

export function ScriptEditor({ value, onChange }: ScriptEditorProps) {
  return (
    <div className="p-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[30vh] p-4 rounded-lg bg-gray-50 dark:bg-gray-900 
                   border border-gray-200 dark:border-gray-700
                   text-gray-900 dark:text-white resize-none
                   focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
        placeholder="Enter your script here..."
        aria-label="Script editor"
      />
    </div>
  );
}