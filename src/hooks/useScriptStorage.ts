import { useState, useEffect } from 'react';

interface Script {
  id: string;
  title: string;
  content: string;
  lastModified: number;
}

export function useScriptStorage() {
  const [scripts, setScripts] = useState<Script[]>(() => {
    const saved = localStorage.getItem('teleprompter-scripts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('teleprompter-scripts', JSON.stringify(scripts));
  }, [scripts]);

  const saveScript = (title: string, content: string) => {
    const newScript: Script = {
      id: Date.now().toString(),
      title,
      content,
      lastModified: Date.now(),
    };
    setScripts(prev => [...prev, newScript]);
    return newScript;
  };

  const updateScript = (id: string, content: string) => {
    setScripts(prev =>
      prev.map(script =>
        script.id === id
          ? { ...script, content, lastModified: Date.now() }
          : script
      )
    );
  };

  const deleteScript = (id: string) => {
    setScripts(prev => prev.filter(script => script.id !== id));
  };

  return { scripts, saveScript, updateScript, deleteScript };
}