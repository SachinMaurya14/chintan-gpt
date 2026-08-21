import React, { useState, useMemo, useRef } from "react";
import {
  Folder,
  FolderOpen,
  FolderPlus,
  FileCode,
  FilePlus,
  Trash2,
  ChevronDown,
  ChevronRight,
  Layers,
  Sparkles,
  Copy,
  AlertTriangle,
  Code2,
  ListTree,
  Search,
  RefreshCw,
  FolderMinus,
  Edit2,
  Share2,
  CheckCircle2
} from "lucide-react";
import {
  WorkspaceFile,
  LanguageConfig,
  DiagnosticProblem,
  WorkspaceTreeNode,
  WorkspaceFolderNode,
  WorkspaceFileNode,
  ContextMenuState
} from "../types.js";
import { WorkspaceService } from "../services/workspaceService.js";
import { PlaygroundSymbolService, CodeSymbol } from "../services/symbolService.js";
import { PlaygroundContextMenu } from "./PlaygroundContextMenu.js";
import { PlaygroundProjectSearch } from "./PlaygroundProjectSearch.js";

interface PlaygroundFileExplorerProps {
  files: WorkspaceFile[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  onCreateFile: (folderPath: string, fileName: string) => void;
  onCreateFolder: (parentPath: string, folderName: string) => void;
  onRenameFile: (oldPath: string, newPath: string) => void;
  onRenameFolder: (oldPath: string, newPath: string) => void;
  onDeleteFile: (filePathOrId: string) => void;
  onDeleteFolder: (folderPath: string) => void;
  onDuplicateFile: (filePathOrId: string) => void;
  onMoveItem?: (sourcePath: string, targetFolderPath: string) => void;
  onSetEntryPoint?: (fileId: string) => void;
  onReplaceInFiles?: (
    searchQuery: string,
    replacementText: string,
    caseSensitive: boolean,
    isRegex: boolean
  ) => void;
  onReplaceInFile?: (filePath: string, newContent: string) => void;
  onJumpToLine?: (line: number, column: number) => void;
  currentLanguage: LanguageConfig;
  problems?: DiagnosticProblem[];
  isOpen: boolean;
  onToggle: () => void;
  onJumpToSymbol?: (line: number, column: number) => void;
  onOpenQuickOpen?: () => void;
}

export const PlaygroundFileExplorer: React.FC<PlaygroundFileExplorerProps> = ({
  files,
  activeFileId,
  onSelectFile,
  onCreateFile,
  onCreateFolder,
  onRenameFile,
  onRenameFolder,
  onDeleteFile,
  onDeleteFolder,
  onDuplicateFile,
  onMoveItem,
  onSetEntryPoint,
  onReplaceInFiles,
  onReplaceInFile,
  onJumpToLine,
  currentLanguage,
  problems = [],
  isOpen,
  onToggle,
  onJumpToSymbol,
  onOpenQuickOpen,
}) => {
  const [activeTab, setActiveTab] = useState<"files" | "search" | "outline">("files");

  // Track expanded folder paths
  const [openFolderPaths, setOpenFolderPaths] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    // Auto-open top folders by default (e.g. 'src', 'tests')
    for (const f of files) {
      if (f.path && f.path.includes("/")) {
        const parent = f.path.split("/")[0];
        initial.add(parent);
      }
    }
    return initial;
  });

  // Creation State
  const [creationModal, setCreationModal] = useState<{
    isOpen: boolean;
    type: "file" | "folder";
    parentPath: string;
    inputValue: string;
    error: string | null;
  }>({
    isOpen: false,
    type: "file",
    parentPath: "",
    inputValue: "",
    error: null,
  });

  // Renaming State
  const [renamingState, setRenamingState] = useState<{
    targetPath: string;
    isFolder: boolean;
    inputValue: string;
    error: string | null;
  } | null>(null);

  // Deletion Confirmation Modal
  const [deleteConfirm, setDeleteConfirm] = useState<{
    targetPath: string;
    isFolder: boolean;
    fileId?: string;
    itemCount?: number;
  } | null>(null);

  // Context Menu state
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    itemType: "root",
  });

  // Drag & drop state
  const [draggedItemPath, setDraggedItemPath] = useState<string | null>(null);
  const [dragOverFolderPath, setDragOverFolderPath] = useState<string | null>(null);

  const activeFile = files.find((f) => f.id === activeFileId) || files[0];
  const symbols: CodeSymbol[] = activeFile
    ? PlaygroundSymbolService.extractSymbols(
        activeFile.content,
        activeFile.language || currentLanguage.monacoLang
      )
    : [];

  // Build hierarchical workspace tree
  const treeNodes = useMemo(() => {
    return WorkspaceService.buildWorkspaceTree(files, openFolderPaths);
  }, [files, openFolderPaths]);

  // Expand / collapse folder toggle
  const toggleFolder = (folderPath: string) => {
    setOpenFolderPaths((prev) => {
      const next = new Set(prev);
      if (next.has(folderPath)) {
        next.delete(folderPath);
      } else {
        next.add(folderPath);
      }
      return next;
    });
  };

  const collapseAllFolders = () => {
    setOpenFolderPaths(new Set());
  };

  const expandAllFolders = () => {
    const allFolders = new Set<string>();
    for (const f of files) {
      if (f.path && f.path.includes("/")) {
        const parts = f.path.split("/");
        for (let i = 1; i < parts.length; i++) {
          allFolders.add(parts.slice(0, i).join("/"));
        }
      }
    }
    setOpenFolderPaths(allFolders);
  };

  // Open creation input/modal
  const handleOpenCreate = (type: "file" | "folder", parentPath = "") => {
    setCreationModal({
      isOpen: true,
      type,
      parentPath: WorkspaceService.sanitizePath(parentPath),
      inputValue: "",
      error: null,
    });
    // Ensure parent folder is expanded
    if (parentPath) {
      setOpenFolderPaths((prev) => new Set(prev).add(parentPath));
    }
  };

  // Submit creation
  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { type, parentPath, inputValue } = creationModal;

    if (type === "file") {
      const error = WorkspaceService.validateFileName(inputValue, parentPath, files);
      if (error) {
        setCreationModal((prev) => ({ ...prev, error }));
        return;
      }

      let finalName = inputValue.trim();
      if (!finalName.includes(".")) {
        finalName += currentLanguage.fileExtension;
      }
      onCreateFile(parentPath, finalName);
    } else {
      const existingFolders: string[] = Array.from(openFolderPaths);
      const error = WorkspaceService.validateFolderName(inputValue, parentPath, existingFolders);
      if (error) {
        setCreationModal((prev) => ({ ...prev, error }));
        return;
      }
      onCreateFolder(parentPath, inputValue.trim());
    }

    setCreationModal({ isOpen: false, type: "file", parentPath: "", inputValue: "", error: null });
  };

  // Submit rename
  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!renamingState) return;
    const { targetPath, isFolder, inputValue } = renamingState;
    const trimmed = inputValue.trim();

    if (isFolder) {
      const parts = targetPath.split("/");
      const parentPath = parts.slice(0, -1).join("/");
      const existingFolders: string[] = Array.from(openFolderPaths);
      const error = WorkspaceService.validateFolderName(trimmed, parentPath, existingFolders);
      if (error) {
        setRenamingState((prev) => prev ? { ...prev, error } : null);
        return;
      }
      const newPath = parentPath ? `${parentPath}/${trimmed}` : trimmed;
      onRenameFolder(targetPath, newPath);
    } else {
      const parts = targetPath.split("/");
      const parentPath = parts.slice(0, -1).join("/");
      const error = WorkspaceService.validateFileName(trimmed, parentPath, files);
      if (error) {
        setRenamingState((prev) => prev ? { ...prev, error } : null);
        return;
      }
      let finalName = trimmed;
      if (!finalName.includes(".")) {
        finalName += currentLanguage.fileExtension;
      }
      const newPath = parentPath ? `${parentPath}/${finalName}` : finalName;
      onRenameFile(targetPath, newPath);
    }

    setRenamingState(null);
  };

  // Copy virtual path to clipboard
  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
  };

  // Trigger Context Menu
  const handleContextMenu = (
    e: React.MouseEvent,
    itemType: ContextMenuState["itemType"],
    itemPath?: string,
    fileId?: string,
    itemName?: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      itemType,
      itemPath,
      fileId,
      itemName,
    });
  };

  // Handle Drag & Drop move
  const handleDragStart = (e: React.DragEvent, path: string) => {
    e.stopPropagation();
    setDraggedItemPath(path);
    e.dataTransfer.setData("text/plain", path);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, folderPath: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    if (dragOverFolderPath !== folderPath) {
      setDragOverFolderPath(folderPath);
    }
  };

  const handleDrop = (e: React.DragEvent, targetFolderPath: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverFolderPath(null);

    const sourcePath = draggedItemPath || e.dataTransfer.getData("text/plain");
    if (!sourcePath) return;

    if (onMoveItem) {
      onMoveItem(sourcePath, targetFolderPath);
    }
    setDraggedItemPath(null);
  };

  // Jump to first diagnostic in a file
  const handleJumpToError = (file: WorkspaceFile) => {
    const fileProb = problems.find((p) => p.file === file.name || p.file === file.path);
    onSelectFile(file.id);
    if (fileProb && onJumpToLine) {
      onJumpToLine(fileProb.line, fileProb.column);
    }
  };

  if (!isOpen) {
    return (
      <div className="border-r border-zinc-800/80 bg-[#0c0c0e] flex flex-col items-center py-3 select-none">
        <button
          onClick={onToggle}
          title="Open Explorer & Navigation"
          className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-lg transition"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Recursive Tree Node Renderer
  const renderTreeNode = (node: WorkspaceTreeNode, depth = 0) => {
    const indentStyle = { paddingLeft: `${depth * 14 + 10}px` };

    if (node.type === "folder") {
      const isFolderOpen = openFolderPaths.has(node.path);
      const isDropTarget = dragOverFolderPath === node.path;
      const diagStatus = WorkspaceService.folderHasDiagnostics(node.path, files, problems);

      return (
        <div key={node.id} className="space-y-0.5 select-none">
          {/* Folder Item */}
          <div
            style={indentStyle}
            onClick={() => toggleFolder(node.path)}
            onContextMenu={(e) => handleContextMenu(e, "folder", node.path, undefined, node.name)}
            onDragOver={(e) => handleDragOver(e, node.path)}
            onDrop={(e) => handleDrop(e, node.path)}
            className={`group flex items-center justify-between py-1.5 pr-2 rounded-md text-xs font-mono cursor-pointer transition ${
              isDropTarget
                ? "bg-orange-500/20 text-orange-300 border border-orange-500/50"
                : "text-zinc-300 hover:text-white hover:bg-zinc-800/50"
            }`}
          >
            <div className="flex items-center gap-1.5 truncate">
              {isFolderOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
              )}
              {isFolderOpen ? (
                <FolderOpen className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
              ) : (
                <Folder className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
              )}
              <span className="font-semibold text-zinc-200 truncate">{node.name}</span>
              {diagStatus.hasError && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" title="Contains files with errors" />
              )}
            </div>

            {/* Hover Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenCreate("file", node.path);
                }}
                title="New file in folder"
                className="p-0.5 text-zinc-400 hover:text-orange-400 rounded transition"
              >
                <FilePlus className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenCreate("folder", node.path);
                }}
                title="New subfolder"
                className="p-0.5 text-zinc-400 hover:text-yellow-400 rounded transition"
              >
                <FolderPlus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Children (if open) */}
          {isFolderOpen && (
            <div className="space-y-0.5">
              {node.children.map((child) => renderTreeNode(child, depth + 1))}
              {node.children.length === 0 && (
                <div
                  style={{ paddingLeft: `${(depth + 1) * 14 + 10}px` }}
                  className="py-1 text-[10px] text-zinc-600 italic"
                >
                  (empty folder)
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // File Item
    const file = node.file;
    const isActive = file.id === activeFileId;
    const visualInfo = WorkspaceService.getFileVisualInfo(file.name);
    const fileProblems = problems.filter((p) => p.file === file.name || p.file === file.path);
    const fileHasErrors = fileProblems.some((p) => p.severity === "error");
    const fileHasWarnings = fileProblems.some((p) => p.severity === "warning");

    return (
      <div
        key={file.id}
        style={indentStyle}
        draggable
        onDragStart={(e) => handleDragStart(e, file.path || file.name)}
        onClick={() => onSelectFile(file.id)}
        onContextMenu={(e) =>
          handleContextMenu(e, "file", file.path || file.name, file.id, file.name)
        }
        className={`group flex items-center justify-between py-1.5 pr-2 rounded-md text-xs font-mono cursor-pointer transition select-none ${
          isActive
            ? "bg-orange-500/10 text-orange-300 font-semibold border border-orange-500/30"
            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
        }`}
      >
        <div className="flex items-center gap-2 truncate">
          <FileCode
            className={`w-3.5 h-3.5 shrink-0 ${visualInfo.colorClass}`}
          />
          <span className="truncate">{file.name}</span>
          {file.isEntry && (
            <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 font-normal">
              entry
            </span>
          )}
          {file.isModified && (
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" title="Unsaved changes" />
          )}
          {fileHasErrors && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleJumpToError(file);
              }}
              title="Click to jump to compiler error"
              className="hover:scale-125 transition"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block animate-pulse" />
            </button>
          )}
          {!fileHasErrors && fileHasWarnings && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" title="Has warnings" />
          )}
        </div>

        {/* Hover Quick Action Buttons */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDuplicateFile(file.id);
            }}
            title="Duplicate file"
            className="p-0.5 text-zinc-500 hover:text-zinc-200 transition"
          >
            <Copy className="w-3 h-3" />
          </button>

          {files.length > 1 && !file.isEntry && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteConfirm({
                  targetPath: file.path || file.name,
                  isFolder: false,
                  fileId: file.id,
                });
              }}
              title="Delete file"
              className="p-0.5 text-zinc-500 hover:text-red-400 transition"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <aside
      id="playground-file-explorer"
      className="w-64 border-r border-zinc-800/80 bg-[#0c0c0e] flex flex-col h-full select-none shrink-0"
    >
      {/* Top Header & Tab Navigation */}
      <div className="px-2 py-2 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-0.5 bg-[#141418] p-0.5 rounded-lg border border-zinc-800">
          <button
            onClick={() => setActiveTab("files")}
            className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider transition ${
              activeTab === "files"
                ? "bg-zinc-800 text-orange-400 shadow-xs"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Files
          </button>
          <button
            onClick={() => setActiveTab("search")}
            className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider transition flex items-center gap-1 ${
              activeTab === "search"
                ? "bg-zinc-800 text-orange-400 shadow-xs"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <Search className="w-3 h-3" />
            <span>Search</span>
          </button>
          <button
            onClick={() => setActiveTab("outline")}
            className={`px-2 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider transition flex items-center gap-1 ${
              activeTab === "outline"
                ? "bg-zinc-800 text-orange-400 shadow-xs"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <ListTree className="w-3 h-3" />
            <span>Outline</span>
          </button>
        </div>

        {/* Action icons when in files tab */}
        {activeTab === "files" && (
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => handleOpenCreate("file", "")}
              title="New File (Root)"
              className="p-1 text-zinc-400 hover:text-orange-400 hover:bg-zinc-800 rounded transition"
            >
              <FilePlus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleOpenCreate("folder", "")}
              title="New Folder (Root)"
              className="p-1 text-zinc-400 hover:text-yellow-400 hover:bg-zinc-800 rounded transition"
            >
              <FolderPlus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={collapseAllFolders}
              title="Collapse All Folders"
              className="p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded transition"
            >
              <FolderMinus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Hierarchical Files Tree */}
      {activeTab === "files" && (
        <div
          onContextMenu={(e) => handleContextMenu(e, "root")}
          onDragOver={(e) => handleDragOver(e, "")}
          onDrop={(e) => handleDrop(e, "")}
          className="flex-1 overflow-y-auto py-2 px-1 space-y-0.5"
        >
          {/* Workspace Root Header */}
          <div className="flex items-center justify-between px-2 py-1 text-[11px] font-mono text-zinc-400 font-bold">
            <div className="flex items-center gap-1.5">
              <ChevronDown className="w-3 h-3 text-zinc-500" />
              <span className="truncate">project-workspace</span>
            </div>
            <span className="text-[9px] text-zinc-500 font-normal">
              {files.length} file{files.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Render Full Hierarchy */}
          <div className="space-y-0.5">
            {treeNodes.map((node) => renderTreeNode(node, 0))}
          </div>
        </div>
      )}

      {/* Tab 2: Project Search and Replace */}
      {activeTab === "search" && (
        <div className="flex-1 overflow-hidden">
          <PlaygroundProjectSearch
            files={files}
            onNavigateToMatch={(fileId, line, col) => {
              onSelectFile(fileId);
              if (onJumpToLine) onJumpToLine(line, col);
            }}
            onReplaceInFiles={onReplaceInFiles || (() => {})}
          />
        </div>
      )}

      {/* Tab 3: Code Outline & Symbols */}
      {activeTab === "outline" && (
        <div className="flex-1 overflow-y-auto py-2 px-2 space-y-1 font-mono">
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider px-1 pb-1 border-b border-zinc-800/60">
            Symbols in {activeFile?.name}
          </div>

          {symbols.length > 0 ? (
            <div className="space-y-0.5 pt-1">
              {symbols.map((sym, idx) => (
                <div
                  key={idx}
                  onClick={() => onJumpToSymbol && onJumpToSymbol(sym.line, sym.column)}
                  className="flex items-center justify-between px-2 py-1.5 rounded-md text-xs text-zinc-300 hover:text-orange-300 hover:bg-zinc-800/60 cursor-pointer transition"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        sym.kind === "class"
                          ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                          : sym.kind === "component"
                          ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                          : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      }`}
                    >
                      {sym.kind[0]}
                    </span>
                    <span className="truncate">{sym.name}</span>
                  </div>
                  <span className="text-[10px] text-zinc-600">:{sym.line}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-zinc-500 text-xs">
              No top-level functions or classes detected.
            </div>
          )}
        </div>
      )}

      {/* Bottom Footer Info */}
      <div className="p-2.5 border-t border-zinc-800/80 bg-[#0a0a0c] text-[10px] font-mono text-zinc-500 select-none">
        <div className="flex items-center justify-between">
          <span>Target</span>
          <span className="text-zinc-300 font-semibold">{currentLanguage.shortName}</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <span>Runtime</span>
          <span className="text-emerald-400 font-bold">{currentLanguage.compilerBadge}</span>
        </div>
      </div>

      {/* Context Menu Component */}
      <PlaygroundContextMenu
        state={contextMenu}
        onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onNewFile={(folderPath) => handleOpenCreate("file", folderPath)}
        onNewFolder={(parentPath) => handleOpenCreate("folder", parentPath)}
        onRename={(targetPath, isFolder) => {
          const parts = targetPath.split("/");
          const currentName = parts[parts.length - 1];
          setRenamingState({
            targetPath,
            isFolder,
            inputValue: currentName,
            error: null,
          });
        }}
        onDelete={(targetPath, isFolder, fileId) => {
          setDeleteConfirm({ targetPath, isFolder, fileId });
        }}
        onDuplicate={(fileId) => onDuplicateFile(fileId)}
        onCopyPath={handleCopyPath}
        onSetEntryPoint={onSetEntryPoint}
        onRunFile={(fileId) => {
          onSelectFile(fileId);
        }}
      />

      {/* Create Modal / Dialog */}
      {creationModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <div className="w-full max-w-sm rounded-xl bg-[#141418] border border-zinc-700 shadow-2xl p-4 font-mono space-y-3">
            <div className="flex items-center gap-2 text-zinc-100 font-bold text-sm">
              {creationModal.type === "file" ? (
                <FilePlus className="w-4 h-4 text-orange-400" />
              ) : (
                <FolderPlus className="w-4 h-4 text-yellow-400" />
              )}
              <span>
                New {creationModal.type === "file" ? "File" : "Folder"}
                {creationModal.parentPath ? ` in /${creationModal.parentPath}` : " (Root)"}
              </span>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-2">
              <input
                type="text"
                autoFocus
                placeholder={
                  creationModal.type === "file"
                    ? `helper${currentLanguage.fileExtension}`
                    : "components"
                }
                value={creationModal.inputValue}
                onChange={(e) =>
                  setCreationModal((prev) => ({
                    ...prev,
                    inputValue: e.target.value,
                    error: null,
                  }))
                }
                className="w-full bg-[#1c1c22] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-orange-500"
              />

              {creationModal.error && (
                <div className="text-[11px] text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{creationModal.error}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    setCreationModal({
                      isOpen: false,
                      type: "file",
                      parentPath: "",
                      inputValue: "",
                      error: null,
                    })
                  }
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white bg-zinc-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition"
                >
                  Create {creationModal.type === "file" ? "File" : "Folder"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rename Modal / Dialog */}
      {renamingState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <div className="w-full max-w-sm rounded-xl bg-[#141418] border border-zinc-700 shadow-2xl p-4 font-mono space-y-3">
            <div className="flex items-center gap-2 text-zinc-100 font-bold text-sm">
              <Edit2 className="w-4 h-4 text-orange-400" />
              <span>Rename {renamingState.isFolder ? "Folder" : "File"}</span>
            </div>

            <form onSubmit={handleRenameSubmit} className="space-y-2">
              <input
                type="text"
                autoFocus
                value={renamingState.inputValue}
                onChange={(e) =>
                  setRenamingState((prev) =>
                    prev ? { ...prev, inputValue: e.target.value, error: null } : null
                  )
                }
                className="w-full bg-[#1c1c22] border border-zinc-700 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-orange-500"
              />

              {renamingState.error && (
                <div className="text-[11px] text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{renamingState.error}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRenamingState(null)}
                  className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white bg-zinc-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition"
                >
                  Rename
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
          <div className="w-full max-w-sm rounded-xl bg-[#141418] border border-zinc-700 shadow-2xl p-4 font-mono space-y-3">
            <div className="flex items-center gap-2 text-red-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Confirm Delete</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Are you sure you want to permanently delete{" "}
              {deleteConfirm.isFolder ? "folder" : "file"}{" "}
              <strong className="text-white font-semibold">"{deleteConfirm.targetPath}"</strong>?
              {deleteConfirm.isFolder && (
                <span className="block mt-1 text-red-400 text-[11px]">
                  All nested files and subfolders inside will also be removed.
                </span>
              )}
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.isFolder) {
                    onDeleteFolder(deleteConfirm.targetPath);
                  } else {
                    onDeleteFile(deleteConfirm.targetPath || deleteConfirm.fileId || "");
                  }
                  setDeleteConfirm(null);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-500 text-white transition"
              >
                Delete {deleteConfirm.isFolder ? "Folder" : "File"}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
