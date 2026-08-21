import React, { useState, useMemo } from "react";
import {
  Search,
  Replace,
  CaseSensitive,
  Regex,
  ChevronDown,
  ChevronRight,
  FileCode,
  CheckCircle,
  AlertTriangle,
  X
} from "lucide-react";
import { WorkspaceFile, SearchMatch } from "../types.js";
import { WorkspaceService } from "../services/workspaceService.js";

interface PlaygroundProjectSearchProps {
  files: WorkspaceFile[];
  onNavigateToMatch: (fileId: string, line: number, column: number) => void;
  onReplaceInFiles: (
    searchQuery: string,
    replacementText: string,
    caseSensitive: boolean,
    isRegex: boolean
  ) => void;
  onClose?: () => void;
}

export const PlaygroundProjectSearch: React.FC<PlaygroundProjectSearchProps> = ({
  files,
  onNavigateToMatch,
  onReplaceInFiles,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [replaceQuery, setReplaceQuery] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [isRegex, setIsRegex] = useState(false);
  const [showReplaceBar, setShowReplaceBar] = useState(true);
  const [collapsedFiles, setCollapsedFiles] = useState<Set<string>>(new Set());
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Search results computed in real-time
  const matches: SearchMatch[] = useMemo(() => {
    return WorkspaceService.searchWorkspace(files, searchQuery, caseSensitive, isRegex);
  }, [files, searchQuery, caseSensitive, isRegex]);

  // Group matches by file
  const groupedMatches = useMemo(() => {
    const map = new Map<string, { file: WorkspaceFile; matches: SearchMatch[] }>();
    for (const match of matches) {
      if (!map.has(match.fileId)) {
        const file = files.find((f) => f.id === match.fileId);
        if (file) {
          map.set(match.fileId, { file, matches: [] });
        }
      }
      map.get(match.fileId)?.matches.push(match);
    }
    return Array.from(map.values());
  }, [matches, files]);

  const toggleCollapse = (fileId: string) => {
    setCollapsedFiles((prev) => {
      const next = new Set(prev);
      if (next.has(fileId)) {
        next.delete(fileId);
      } else {
        next.add(fileId);
      }
      return next;
    });
  };

  const handleConfirmReplace = () => {
    onReplaceInFiles(searchQuery, replaceQuery, caseSensitive, isRegex);
    setShowConfirmModal(false);
  };

  return (
    <div id="playground-project-search" className="h-full flex flex-col bg-[#0f0f12] text-xs font-mono text-zinc-300">
      {/* Header */}
      <div className="p-3 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-orange-400" />
          <span className="font-bold text-zinc-100 uppercase tracking-wider text-[11px]">
            Search Workspace
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 text-zinc-500 hover:text-zinc-200 rounded transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Input controls */}
      <div className="p-3 space-y-2 border-b border-zinc-800/80 bg-[#121215]">
        {/* Search input with modifiers */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search across files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#18181c] border border-zinc-700 rounded-lg px-2.5 py-1.5 pr-16 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-orange-500/60"
          />
          <div className="absolute right-1.5 flex items-center gap-1">
            <button
              onClick={() => setCaseSensitive(!caseSensitive)}
              className={`p-1 rounded text-[10px] transition ${
                caseSensitive
                  ? "bg-orange-500/20 text-orange-400 font-bold border border-orange-500/40"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Match Case"
            >
              <CaseSensitive className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsRegex(!isRegex)}
              className={`p-1 rounded text-[10px] transition ${
                isRegex
                  ? "bg-orange-500/20 text-orange-400 font-bold border border-orange-500/40"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              title="Use Regular Expression"
            >
              <Regex className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Replace input and action */}
        {showReplaceBar && (
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              placeholder="Replace with..."
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              className="flex-1 bg-[#18181c] border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-hidden focus:border-orange-500/60"
            />
            <button
              onClick={() => {
                if (matches.length > 0) {
                  setShowConfirmModal(true);
                }
              }}
              disabled={matches.length === 0}
              className="px-2.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 disabled:opacity-40 disabled:hover:bg-orange-600 text-white text-[11px] font-semibold flex items-center gap-1 transition shrink-0"
              title="Replace all occurrences"
            >
              <Replace className="w-3 h-3" />
              <span>Replace All</span>
            </button>
          </div>
        )}

        {/* Status bar */}
        <div className="flex items-center justify-between text-[10px] text-zinc-500 pt-0.5">
          <span>
            {searchQuery ? (
              <>
                <strong className="text-orange-400">{matches.length}</strong> results in{" "}
                <strong className="text-zinc-300">{groupedMatches.length}</strong> files
              </>
            ) : (
              "Type to search workspace"
            )}
          </span>
          <button
            onClick={() => setShowReplaceBar(!showReplaceBar)}
            className="text-zinc-400 hover:text-zinc-200 underline"
          >
            {showReplaceBar ? "Hide Replace" : "Show Replace"}
          </button>
        </div>
      </div>

      {/* Results Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {groupedMatches.length > 0 ? (
          groupedMatches.map(({ file, matches }) => {
            const isCollapsed = collapsedFiles.has(file.id);
            const visualInfo = WorkspaceService.getFileVisualInfo(file.name);

            return (
              <div key={file.id} className="rounded-lg bg-[#141418] border border-zinc-800/80 overflow-hidden">
                {/* File Header */}
                <button
                  onClick={() => toggleCollapse(file.id)}
                  className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#18181c] hover:bg-zinc-800 text-left transition"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    {isCollapsed ? (
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    )}
                    <FileCode className={`w-3.5 h-3.5 ${visualInfo.colorClass} shrink-0`} />
                    <span className="font-semibold text-zinc-200 truncate">{file.name}</span>
                    <span className="text-[10px] text-zinc-500 truncate">
                      {file.path || file.name}
                    </span>
                  </div>
                  <span className="px-1.5 py-0.2 rounded-full bg-zinc-800 text-[10px] text-orange-400 font-bold shrink-0 ml-2">
                    {matches.length}
                  </span>
                </button>

                {/* Match lines */}
                {!isCollapsed && (
                  <div className="divide-y divide-zinc-800/40">
                    {matches.map((match, mIdx) => (
                      <button
                        key={mIdx}
                        onClick={() => onNavigateToMatch(match.fileId, match.line, match.column)}
                        className="w-full flex items-start gap-2 px-3 py-1.5 hover:bg-zinc-800/50 text-left transition group"
                      >
                        <span className="text-[10px] text-zinc-500 font-mono w-7 text-right shrink-0 mt-0.5 group-hover:text-orange-400">
                          {match.line}:
                        </span>
                        <div className="font-mono text-[11px] text-zinc-300 truncate w-full">
                          {match.lineContent.trim()}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : searchQuery ? (
          <div className="p-8 text-center text-xs text-zinc-500">
            No matches found for "{searchQuery}".
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-zinc-500 space-y-1">
            <p>Enter text or regex above to search all workspace files.</p>
            <p className="text-[10px] text-zinc-600">Supports multi-file search and safe mass replacement.</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Replace All */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
          <div className="w-full max-w-sm rounded-xl bg-[#141418] border border-zinc-700 shadow-2xl p-4 space-y-3 font-mono">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Confirm Project Replace</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Are you sure you want to replace{" "}
              <strong className="text-orange-400">{matches.length}</strong> occurrence(s) of "
              <span className="text-white font-semibold">{searchQuery}</span>" with "
              <span className="text-white font-semibold">{replaceQuery}</span>" across{" "}
              <strong className="text-zinc-200">{groupedMatches.length}</strong> files?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReplace}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition"
              >
                Replace All ({matches.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
