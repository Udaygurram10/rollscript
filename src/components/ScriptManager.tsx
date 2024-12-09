import React, { useState } from 'react';
import { Save, Trash2, Clock, FileText } from 'lucide-react';

interface Script {
  id: string;
  title: string;
  content: string;
  lastModified: number;
}

interface ScriptManagerProps {
  scripts: Script[];
  currentText: string;
  onSave: (title: string, content: string) => void;
  onLoad: (content: string) => void;
  onDelete: (id: string) => void;
}

export function ScriptManager({
  scripts,
  currentText,
  onSave,
  onLoad,
  onDelete,
}: ScriptManagerProps) {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleSave = () => {
    if (newTitle.trim()) {
      onSave(newTitle, currentText);
      setNewTitle('');
      setShowSaveDialog(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Saved Scripts</h2>
        <button
          onClick={() => setShowSaveDialog(true)}
          className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <Save size={16} />
          Save Current
        </button>
      </div>

      {showSaveDialog && (
        <div className="mb-4">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter script title"
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setShowSaveDialog(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {scripts.map((script) => (
          <div
            key={script.id}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
          >
            <div className="flex-1">
              <h3 className="font-medium">{script.title}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock size={14} />
                <span>
                  {new Date(script.lastModified).toLocaleDateString()}
                </span>
                <FileText size={14} />
                <span>{script.content.split(' ').length} words</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onLoad(script.content)}
                className="px-2 py-1 text-blue-500 hover:text-blue-600"
              >
                Load
              </button>
              <button
                onClick={() => onDelete(script.id)}
                className="p-1 text-red-500 hover:text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}