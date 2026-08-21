import React, { useState, useEffect, useRef } from "react";
import { Layers, ArrowRight, X } from "lucide-react";

interface PlaygroundGoToLineModalProps {
  isOpen: boolean;
  totalLines: number;
  currentLine: number;
  onConfirm: (line: number, column?: number) => void;
  onCancel: () => void;
}

export const PlaygroundGoToLineModal: React.FC<PlaygroundGoToLineModalProps> = ({
  isOpen,
  totalLines,
  currentLine,
  onConfirm,
  onCancel,
}) => {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setValue(String(currentLine));
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
    }
  }, [isOpen, currentLine]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    const parts = value.split(":");
    const line = parseInt(parts[0], 10);
    const col = parts.length > 1 ? parseInt(parts[1], 10) : 1;

    if (!isNaN(line) && line >= 1) {
      onConfirm(line, isNaN(col) ? 1 : col);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-100">
      <div className="fixed inset-0" onClick={onCancel} />
      <div
        className="relative w-full max-w-sm bg-[#121216] border border-zinc-700 rounded-xl shadow-2xl p-4 font-mono z-10 space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-300">
            <Layers className="w-4 h-4 text-orange-400" />
            <span>Go to Line / Column</span>
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-zinc-500 hover:text-white rounded"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 25 or 25:10"
              className="w-full bg-[#18181e] border border-zinc-700 focus:border-orange-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-hidden font-mono"
            />
          </div>

          <div className="text-[11px] text-zinc-500 flex items-center justify-between">
            <span>File range: 1 – {Math.max(1, totalLines)} lines</span>
            <span>Format: line[:col]</span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1.5 transition shadow-sm"
            >
              <span>Jump to Line</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
