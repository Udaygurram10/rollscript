import React, { useState, useCallback, useRef } from 'react';
import { TeleprompterDisplay } from './components/TeleprompterDisplay';
import { ScriptEditor } from './components/ScriptEditor';
import { SpeedControl } from './components/SpeedControl';
import { ScriptManager } from './components/ScriptManager';
import { Settings } from './components/Settings';
import { TextControls } from './components/TextControls';
import { ScriptStats } from './components/ScriptStats';
import { ImportExport } from './components/ImportExport';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { useScriptStorage } from './hooks/useScriptStorage';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState(5);
  const [fontSize, setFontSize] = useState(32);
  const [isMirrored, setIsMirrored] = useState(false);
  const [textColor, setTextColor] = useState('#000000');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [lineHeight, setLineHeight] = useState(1.5);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [bgOpacity, setBgOpacity] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const { scripts, saveScript, deleteScript } = useScriptStorage();
  const teleprompterRef = useRef<{ togglePlay: () => void } | null>(null);

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(Math.max(1, Math.min(10, newSpeed)));
  }, []);

  const handleFontSizeChange = useCallback((newSize: number) => {
    setFontSize(Math.max(16, Math.min(72, newSize)));
  }, []);

  const handleTogglePlay = useCallback(() => {
    if (teleprompterRef.current) {
      teleprompterRef.current.togglePlay();
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleImport = (content: string) => {
    setText(content);
  };

  const handleExport = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useKeyboardShortcuts({
    onTogglePlay: handleTogglePlay,
    onSpeedUp: () => handleSpeedChange(speed + 1),
    onSpeedDown: () => handleSpeedChange(speed - 1),
    onFontSizeUp: () => handleFontSizeChange(fontSize + 2),
    onFontSizeDown: () => handleFontSizeChange(fontSize - 2),
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Roll Script
            </h1>
            <div className="flex items-center gap-4">
              <KeyboardShortcutsHelp />
              <Settings
                isMirrored={isMirrored}
                onToggleMirror={() => setIsMirrored(!isMirrored)}
                textColor={textColor}
                onTextColorChange={setTextColor}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
              <SpeedControl speed={speed} onChange={handleSpeedChange} />
              <ImportExport onImport={handleImport} onExport={handleExport} />
            </div>
            
            <div className="space-y-4">
              <TextControls
                fontFamily={fontFamily}
                onFontFamilyChange={setFontFamily}
                lineHeight={lineHeight}
                onLineHeightChange={setLineHeight}
                textAlign={textAlign}
                onTextAlignChange={setTextAlign}
                bgOpacity={bgOpacity}
                onBgOpacityChange={setBgOpacity}
              />
              <ScriptStats text={text} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <TeleprompterDisplay
                  ref={teleprompterRef}
                  text={text}
                  speed={speed}
                  fontSize={fontSize}
                  onFontSizeChange={handleFontSizeChange}
                  isMirrored={isMirrored}
                  textColor={textColor}
                  fontFamily={fontFamily}
                  lineHeight={lineHeight}
                  textAlign={textAlign}
                  bgOpacity={bgOpacity}
                  isPlaying={isPlaying}
                  onPlayChange={setIsPlaying}
                />
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                <ScriptEditor value={text} onChange={setText} />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                <ScriptManager
                  scripts={scripts}
                  currentText={text}
                  onSave={saveScript}
                  onLoad={setText}
                  onDelete={deleteScript}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
