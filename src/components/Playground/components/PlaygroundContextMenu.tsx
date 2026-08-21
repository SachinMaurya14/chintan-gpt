import React, { useEffect, useRef } from "react";
import {
  FilePlus,
  FolderPlus,
  Edit2,
  Trash2,
  Copy,
  CheckCircle2,
  Play,
  Share2,
  X,
  FileCode,
  Folder
} from "lucide-react";
import { ContextMenuState } from "../types.js";

interface PlaygroundContextMenuProps {
  state: ContextMenuState;
  onClose: () => void;
  onNewFile: (folderPath?: string) => void;
  onNewFolder: (parentPath?: string) => void;
  onRename: (targetPath: string, isFolder: boolean) => void;
  onDelete: (targetPath: string, isFolder: boolean, fileId?: string) => void;
  onDuplicate: (fileId: string) => void;
  onCopyPath: (path: string) => void;
  onSetEntryPoint?: (fileId: string) => void;
  onCloseTab?: (fileId: string) => void;
  onCloseOtherTabs?: (fileId: string) => void;
  onCloseAllTabs?: () => void;
  onCloseTabsToRight?: (fileId: string) => void;
  onRunFile?: (fileId: string) => void;
}

export const PlaygroundContextMenu: React.FC<PlaygroundContextMenuProps> = ({
  state,
  onClose,
  onNewFile,
  onNewFolder,
  onRename,
  onDelete,
  onDuplicate,
  onCopyPath,
  onSetEntryPoint,
  onCloseTab,
  onCloseOtherTabs,
  onCloseAllTabs,
  onCloseTabsToRight,
  onRunFile,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Esc
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!state.isOpen) return null;

  // Ensure menu stays within screen boundaries
  const menuWidth = 190;
  const menuHeight = 260;
  const posX = Math.min(state.x, window.innerWidth - menuWidth - 10);
  const posY = Math.min(state.y, window.innerHeight - menuHeight - 10);

  return (
    <div
      ref={menuRef}
      style={{ top: `${posY}px`, left: `${posX}px` }}
      className="fixed z-50 w-48 rounded-xl bg-[#121215] border border-zinc-700 shadow-2xl p-1.5 font-mono text-xs text-zinc-300 select-none animate-in fade-in zoom-in-95 duration-100"
    >
      {/* 1. File Context Menu */}
      {state.itemType === "file" && (
        <div className="space-y-0.5">
          <div className="px-2 py-1 text-[10px] text-zinc-500 font-bold uppercase truncate border-b border-zinc-800 mb-1">
            {state.itemName || state.itemPath}
          </div>

          {onRunFile && state.fileId && (
            <button
              onClick={() => {
                onRunFile(state.fileId!);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-emerald-500/10 hover:text-emerald-300 text-left transition"
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              <span>Run This File</span>
            </button>
          )}

          {onSetEntryPoint && state.fileId && (
            <button
              onClick={() => {
                onSetEntryPoint(state.fileId!);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-orange-500/10 hover:text-orange-300 text-left transition"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
              <span>Set as Entry Point</span>
            </button>
          )}

          {state.fileId && (
            <button
              onClick={() => {
                onDuplicate(state.fileId!);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
            >
              <Copy className="w-3.5 h-3.5 text-zinc-400" />
              <span>Duplicate</span>
            </button>
          )}

          {state.itemPath && (
            <button
              onClick={() => {
                onRename(state.itemPath!, false);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
            >
              <Edit2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Rename</span>
            </button>
          )}

          {state.itemPath && (
            <button
              onClick={() => {
                onCopyPath(state.itemPath!);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
            >
              <Share2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Copy Virtual Path</span>
            </button>
          )}

          <div className="h-px bg-zinc-800 my-1" />

          {state.itemPath && (
            <button
              onClick={() => {
                onDelete(state.itemPath!, false, state.fileId);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300 text-left transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete File</span>
            </button>
          )}
        </div>
      )}

      {/* 2. Folder Context Menu */}
      {state.itemType === "folder" && (
        <div className="space-y-0.5">
          <div className="px-2 py-1 text-[10px] text-zinc-500 font-bold uppercase truncate border-b border-zinc-800 mb-1">
            📁 {state.itemName || state.itemPath}
          </div>

          <button
            onClick={() => {
              onNewFile(state.itemPath);
              onClose();
            }}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
          >
            <FilePlus className="w-3.5 h-3.5 text-orange-400" />
            <span>New File in Folder</span>
          </button>

          <button
            onClick={() => {
              onNewFolder(state.itemPath);
              onClose();
            }}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
          >
            <FolderPlus className="w-3.5 h-3.5 text-yellow-400" />
            <span>New Subfolder</span>
          </button>

          {state.itemPath && (
            <button
              onClick={() => {
                onRename(state.itemPath!, true);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
            >
              <Edit2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Rename Folder</span>
            </button>
          )}

          {state.itemPath && (
            <button
              onClick={() => {
                onCopyPath(state.itemPath!);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
            >
              <Share2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Copy Path</span>
            </button>
          )}

          <div className="h-px bg-zinc-800 my-1" />

          {state.itemPath && (
            <button
              onClick={() => {
                onDelete(state.itemPath!, true);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-red-400 hover:bg-red-500/10 hover:text-red-300 text-left transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Folder</span>
            </button>
          )}
        </div>
      )}

      {/* 3. Editor Tab Context Menu */}
      {state.itemType === "tab" && (
        <div className="space-y-0.5">
          <div className="px-2 py-1 text-[10px] text-zinc-500 font-bold uppercase truncate border-b border-zinc-800 mb-1">
            Tab: {state.itemName}
          </div>

          {onCloseTab && state.fileId && (
            <button
              onClick={() => {
                onCloseTab(state.fileId!);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
            >
              <X className="w-3.5 h-3.5 text-zinc-400" />
              <span>Close Tab</span>
            </button>
          )}

          {onCloseOtherTabs && state.fileId && (
            <button
              onClick={() => {
                onCloseOtherTabs(state.fileId!);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
            >
              <span>Close Other Tabs</span>
            </button>
          )}

          {onCloseTabsToRight && state.fileId && (
            <button
              onClick={() => {
                onCloseTabsToRight(state.fileId!);
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
            >
              <span>Close Tabs to the Right</span>
            </button>
          )}

          {onCloseAllTabs && (
            <button
              onClick={() => {
                onCloseAllTabs();
                onClose();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
            >
              <span>Close All Tabs</span>
            </button>
          )}
        </div>
      )}

      {/* 4. Root / Blank Explorer Context Menu */}
      {state.itemType === "root" && (
        <div className="space-y-0.5">
          <div className="px-2 py-1 text-[10px] text-zinc-500 font-bold uppercase truncate border-b border-zinc-800 mb-1">
            Workspace Root
          </div>

          <button
            onClick={() => {
              onNewFile("");
              onClose();
            }}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
          >
            <FilePlus className="w-3.5 h-3.5 text-orange-400" />
            <span>New File</span>
          </button>

          <button
            onClick={() => {
              onNewFolder("");
              onClose();
            }}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-zinc-800 hover:text-white text-left transition"
          >
            <FolderPlus className="w-3.5 h-3.5 text-yellow-400" />
            <span>New Folder</span>
          </button>
        </div>
      )}
    </div>
  );
};
