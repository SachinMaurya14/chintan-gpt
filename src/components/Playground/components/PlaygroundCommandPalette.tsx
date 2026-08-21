import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Play,
  Square,
  AlignLeft,
  Trash2,
  Sparkles,
  Layers,
  FileCode,
  Plus,
  X,
  Type,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Code2,
  AlertCircle,
  WrapText,
  Eye,
  FileSearch,
  Replace
} from "lucide-react";
import { PlaygroundLanguageId, EditorSettings } from "../types.js";
import { PLAYGROUND_LANGUAGES } from "../languages.js";

export interface CommandItem {
  id: string;
  title: string;
  category: "Execution" | "Editor" | "Navigation" | "Language" | "File" | "View";
  shortcut?: string;
  icon: React.ReactNode;
  action: () => void;
}

interface PlaygroundCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onRunCode: () => void;
  onStopExecution: () => void;
  isRunning: boolean;
  onFormatCode: () => void;
  onInsertBoilerplate: () => void;
  onClearCode: () => void;
  onClearOutput: () => void;
  onGoToLine: () => void;
  onFind: () => void;
  onReplace: () => void;
  onNewFile: () => void;
  onCloseFile: () => void;
  onNextProblem: () => void;
  onPrevProblem: () => void;
  onLanguageSelect: (langId: PlaygroundLanguageId) => void;
  editorSettings: EditorSettings;
  setEditorSettings: React.Dispatch<React.SetStateAction<EditorSettings>>;
}

export const PlaygroundCommandPalette: React.FC<PlaygroundCommandPaletteProps> = ({
  isOpen,
  onClose,
  onRunCode,
  onStopExecution,
  isRunning,
  onFormatCode,
  onInsertBoilerplate,
  onClearCode,
  onClearOutput,
  onGoToLine,
  onFind,
  onReplace,
  onNewFile,
  onCloseFile,
  onNextProblem,
  onPrevProblem,
  onLanguageSelect,
  editorSettings,
  setEditorSettings,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build command list
  const commands: CommandItem[] = [
    {
      id: "run-code",
      title: isRunning ? "Stop Execution" : "Run Code",
      category: "Execution",
      shortcut: "⌘↵ / Ctrl+Enter",
      icon: isRunning ? <Square className="w-4 h-4 text-red-400" /> : <Play className="w-4 h-4 text-emerald-400" />,
      action: isRunning ? onStopExecution : onRunCode,
    },
    {
      id: "format-code",
      title: "Format Document",
      category: "Editor",
      shortcut: "⇧⌥F / Ctrl+Shift+F",
      icon: <AlignLeft className="w-4 h-4 text-blue-400" />,
      action: onFormatCode,
    },
    {
      id: "find-file",
      title: "Find in File",
      category: "Navigation",
      shortcut: "⌘F / Ctrl+F",
      icon: <FileSearch className="w-4 h-4 text-cyan-400" />,
      action: onFind,
    },
    {
      id: "replace-file",
      title: "Find and Replace",
      category: "Navigation",
      shortcut: "⌥⌘F / Ctrl+H",
      icon: <Replace className="w-4 h-4 text-amber-400" />,
      action: onReplace,
    },
    {
      id: "goto-line",
      title: "Go to Line / Column...",
      category: "Navigation",
      shortcut: "⌘G / Ctrl+G",
      icon: <Layers className="w-4 h-4 text-purple-400" />,
      action: onGoToLine,
    },
    {
      id: "next-problem",
      title: "Go to Next Diagnostic / Problem",
      category: "Navigation",
      shortcut: "F8",
      icon: <AlertCircle className="w-4 h-4 text-red-400" />,
      action: onNextProblem,
    },
    {
      id: "prev-problem",
      title: "Go to Previous Diagnostic / Problem",
      category: "Navigation",
      shortcut: "⇧F8",
      icon: <AlertCircle className="w-4 h-4 text-amber-400" />,
      action: onPrevProblem,
    },
    {
      id: "insert-boilerplate",
      title: "Insert Language Starter Template",
      category: "Editor",
      icon: <Sparkles className="w-4 h-4 text-orange-400" />,
      action: onInsertBoilerplate,
    },
    {
      id: "new-file",
      title: "Create New Workspace File",
      category: "File",
      icon: <Plus className="w-4 h-4 text-emerald-400" />,
      action: onNewFile,
    },
    {
      id: "close-file",
      title: "Close Active File Tab",
      category: "File",
      shortcut: "⌘W / Ctrl+W",
      icon: <X className="w-4 h-4 text-red-400" />,
      action: onCloseFile,
    },
    {
      id: "toggle-minimap",
      title: `Toggle Minimap (${editorSettings.minimap ? "Currently ON" : "Currently OFF"})`,
      category: "View",
      icon: <Eye className="w-4 h-4 text-zinc-400" />,
      action: () => setEditorSettings((s) => ({ ...s, minimap: !s.minimap })),
    },
    {
      id: "toggle-wordwrap",
      title: `Toggle Word Wrap (${editorSettings.wordWrap === "on" ? "Currently ON" : "Currently OFF"})`,
      category: "View",
      icon: <WrapText className="w-4 h-4 text-zinc-400" />,
      action: () =>
        setEditorSettings((s) => ({
          ...s,
          wordWrap: s.wordWrap === "on" ? "off" : "on",
        })),
    },
    {
      id: "zoom-in",
      title: "Increase Editor Font Size",
      category: "View",
      shortcut: "⌘+ / Ctrl++",
      icon: <ZoomIn className="w-4 h-4 text-zinc-400" />,
      action: () => setEditorSettings((s) => ({ ...s, fontSize: Math.min(22, s.fontSize + 1) })),
    },
    {
      id: "zoom-out",
      title: "Decrease Editor Font Size",
      category: "View",
      shortcut: "⌘- / Ctrl+-",
      icon: <ZoomOut className="w-4 h-4 text-zinc-400" />,
      action: () => setEditorSettings((s) => ({ ...s, fontSize: Math.max(11, s.fontSize - 1) })),
    },
    {
      id: "zoom-reset",
      title: "Reset Editor Font Size (14px)",
      category: "View",
      shortcut: "⌘0 / Ctrl+0",
      icon: <RotateCcw className="w-4 h-4 text-zinc-400" />,
      action: () => setEditorSettings((s) => ({ ...s, fontSize: 14 })),
    },
    {
      id: "clear-output",
      title: "Clear Terminal Output Streams",
      category: "Execution",
      icon: <Trash2 className="w-4 h-4 text-zinc-400" />,
      action: onClearOutput,
    },
    {
      id: "clear-code",
      title: "Clear Active Editor Code",
      category: "Editor",
      icon: <Trash2 className="w-4 h-4 text-red-400" />,
      action: onClearCode,
    },
    // Languages
    ...PLAYGROUND_LANGUAGES.map((lang) => ({
      id: `switch-lang-${lang.id}`,
      title: `Switch Language: ${lang.name}`,
      category: "Language" as const,
      icon: <Code2 className="w-4 h-4 text-orange-400" />,
      action: () => onLanguageSelect(lang.id),
    })),
  ];

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filteredCommands[selectedIndex];
      if (selected) {
        onClose();
        selected.action();
      }
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-100">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-xl bg-[#121216] border border-zinc-700/90 rounded-2xl shadow-2xl overflow-hidden font-mono z-10 flex flex-col max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="p-3 border-b border-zinc-800 flex items-center gap-2.5 bg-[#0f0f13]">
          <Search className="w-4 h-4 text-orange-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search actions..."
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-hidden"
          />
          <kbd className="text-[10px] text-zinc-500 bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={command.id}
                  onClick={() => {
                    onClose();
                    command.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition text-xs ${
                    isSelected
                      ? "bg-orange-500/15 text-orange-200 border border-orange-500/30"
                      : "text-zinc-300 hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {command.icon}
                    <div>
                      <span className="font-semibold">{command.title}</span>
                      <span className="ml-2 text-[10px] text-zinc-500 uppercase tracking-wider">
                        {command.category}
                      </span>
                    </div>
                  </div>

                  {command.shortcut && (
                    <kbd className="text-[10px] text-zinc-400 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-zinc-700/60">
                      {command.shortcut}
                    </kbd>
                  )}
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-xs text-zinc-500">
              No matching IDE commands found for &quot;{searchQuery}&quot;
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-3 py-2 border-t border-zinc-800 bg-[#0d0d10] text-[10px] text-zinc-500 flex items-center justify-between">
          <span>Navigate with ↑ ↓ • Execute with ↵</span>
          <span>{filteredCommands.length} commands available</span>
        </div>
      </div>
    </div>
  );
};
