import React from 'react';
import { Download, Upload } from 'lucide-react';

interface ImportExportProps {
  onImport: (content: string) => void;
  onExport: () => void;
}

export function ImportExport({ onImport, onExport }: ImportExportProps) {
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        onImport(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex gap-2">
      <label className="flex items-center gap-2 px-3 py-1 bg-gray-100 
                     dark:bg-gray-700 rounded cursor-pointer hover:bg-gray-200 
                     dark:hover:bg-gray-600">
        <Upload size={16} />
        <span>Import</span>
        <input
          type="file"
          accept=".txt,.md"
          onChange={handleImport}
          className="hidden"
        />
      </label>
      <button
        onClick={onExport}
        className="flex items-center gap-2 px-3 py-1 bg-gray-100 
                 dark:bg-gray-700 rounded hover:bg-gray-200 
                 dark:hover:bg-gray-600"
      >
        <Download size={16} />
        Export
      </button>
    </div>
  );
}