import React, { useState, useEffect, useRef } from "react";
import { Search, FileCode, CornerDownLeft, X, Check } from "lucide-react";
import { WorkspaceFile } from "../types.js";
import { WorkspaceService } from "../services/workspaceService.js";

interface PlaygroundQuickOpenModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: WorkspaceFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
}

export const PlaygroundQuickOpenModal: React.FC<PlaygroundQuickOpenModalProps> = ({
  isOpen,
  onClose,
  files,
  activeFileId,
  onSelectFile,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter files by query
  const filteredFiles = files.filter((f) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const nameMatch = f.name.toLowerCase().includes(q);
    const pathMatch = (f.path || f.name).toLowerCase().includes(q);
    return nameMatch || pathMatch;
  });

  useEffect(() => {
    if (isOpen) {
      setSearchQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (filteredFiles.length > 0 ? (prev + 1) % filteredFiles.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        filteredFiles.length > 0 ? (prev - 1 + filteredFiles.length) % filteredFiles.length : 0
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredFiles[selectedIndex]) {
        onSelectFile(filteredFiles[selectedIndex].id);
        onClose();
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs select-none">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg rounded-xl bg-[#121215] border border-zinc-700 shadow-2xl overflow-hidden font-mono z-10 animate-in fade-in zoom-in-95 duration-100">
        {/* Search Header */}
        <div className="p-3 border-b border-zinc-800 flex items-center gap-2.5 bg-[#0f0f12]">
          <Search className="w-4 h-4 text-orange-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type filename to open (e.g. main.cpp, utils...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-hidden"
          />
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-white rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5">
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file, idx) => {
              const isSelected = idx === selectedIndex;
              const isActive = file.id === activeFileId;
              const visualInfo = WorkspaceService.getFileVisualInfo(file.name);

              return (
                <div
                  key={file.id}
                  onClick={() => {
                    onSelectFile(file.id);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition text-xs ${
                    isSelected
                      ? "bg-orange-500/10 text-orange-300 border border-orange-500/30"
                      : "text-zinc-300 hover:bg-zinc-800/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileCode className={`w-4 h-4 ${visualInfo.colorClass} shrink-0`} />
                    <div className="truncate">
                      <span className="font-semibold text-zinc-100">{file.name}</span>
                      <span className="text-[10px] text-zinc-500 ml-2 truncate">
                        {file.path || file.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-[10px]">
                    {file.isEntry && (
                      <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                        entry
                      </span>
                    )}
                    {file.isModified && (
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" title="Modified" />
                    )}
                    {isActive && (
                      <span className="text-emerald-400 font-bold text-[9px] uppercase">
                        active
                      </span>
                    )}
                    {isSelected && (
                      <CornerDownLeft className="w-3.5 h-3.5 text-orange-400" />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-zinc-500">
              No matching files found in Playground workspace.
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-2 bg-[#0a0a0c] border-t border-zinc-800 text-[10px] text-zinc-500 flex items-center justify-between px-3">
          <span>Navigate: <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">↑</kbd> <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">↓</kbd></span>
          <span>Open: <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">↵ Enter</kbd></span>
          <span>Close: <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">Esc</kbd></span>
        </div>
      </div>
    </div>
  );
};
