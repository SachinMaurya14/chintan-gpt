import React from "react";
import { AlertTriangle, Sparkles, Trash2, X } from "lucide-react";

interface PlaygroundModalProps {
  isOpen: boolean;
  type: "insert-boilerplate" | "clear-editor" | "close-modified-file" | null;
  languageName: string;
  fileName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const PlaygroundModal: React.FC<PlaygroundModalProps> = ({
  isOpen,
  type,
  languageName,
  fileName,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen || !type) return null;

  const isBoilerplate = type === "insert-boilerplate";
  const isCloseModified = type === "close-modified-file";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md bg-[#121215] border border-zinc-700/80 rounded-xl shadow-2xl p-5 space-y-4 font-mono text-zinc-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                isBoilerplate
                  ? "bg-orange-500/10 text-orange-400 border border-orange-500/20"
                  : isCloseModified
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {isBoilerplate ? (
                <Sparkles className="w-5 h-5" />
              ) : isCloseModified ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">
                {isBoilerplate
                  ? "Insert Starter Template?"
                  : isCloseModified
                  ? "Discard Unsaved Changes?"
                  : "Clear Editor Content?"}
              </h2>
              <p className="text-xs text-zinc-400 font-sans">
                {isCloseModified && fileName ? `${fileName} (${languageName})` : languageName}
              </p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-1 text-zinc-500 hover:text-zinc-300 transition"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="text-xs text-zinc-400 font-sans leading-relaxed bg-[#0a0a0c] p-3 rounded-lg border border-zinc-800">
          {isBoilerplate ? (
            <p>
              Inserting the official <strong className="text-zinc-200">{languageName}</strong> starter boilerplate will replace your existing editor code for this language.
            </p>
          ) : isCloseModified ? (
            <p>
              The file <strong className="text-zinc-200">{fileName || "active file"}</strong> has unsaved modifications. Closing this tab will discard these changes permanently.
            </p>
          ) : (
            <p>
              Are you sure you want to clear the editor? All typed content in <strong className="text-zinc-200">{languageName}</strong> will be erased.
            </p>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-1">
          <button
            id="btn-modal-cancel"
            onClick={onCancel}
            className="px-3.5 py-1.5 rounded-lg bg-[#18181c] hover:bg-[#202026] text-zinc-300 hover:text-white border border-zinc-700 text-xs font-semibold transition"
          >
            Cancel
          </button>
          <button
            id="btn-modal-confirm"
            onClick={onConfirm}
            className={`px-3.5 py-1.5 rounded-lg text-white text-xs font-semibold transition shadow-sm ${
              isBoilerplate
                ? "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20"
                : isCloseModified
                ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20"
                : "bg-red-600 hover:bg-red-700 shadow-red-600/20"
            }`}
          >
            {isBoilerplate ? "Insert Template" : isCloseModified ? "Discard & Close" : "Clear All Code"}
          </button>
        </div>
      </div>
    </div>
  );
};
