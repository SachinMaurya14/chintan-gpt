import React, { useState } from "react";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  FileCode,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  CheckCircle2,
  ExternalLink,
  ChevronLeft,
  Terminal
} from "lucide-react";
import { DiagnosticProblem } from "../types.js";

interface PlaygroundProblemsTabProps {
  problems: DiagnosticProblem[];
  onSelectProblem: (problem: DiagnosticProblem) => void;
  onNextProblem?: () => void;
  onPrevProblem?: () => void;
  selectedProblemIndex?: number;
}

export const PlaygroundProblemsTab: React.FC<PlaygroundProblemsTabProps> = ({
  problems,
  onSelectProblem,
  onNextProblem,
  onPrevProblem,
  selectedProblemIndex = -1,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<"all" | "error" | "warning" | "info">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [collapsedFiles, setCollapsedFiles] = useState<Record<string, boolean>>({});

  // Filter problems
  const filteredProblems = problems.filter((p) => {
    if (filterSeverity !== "all" && p.severity !== filterSeverity) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.message.toLowerCase().includes(q) ||
        (p.file && p.file.toLowerCase().includes(q)) ||
        (p.errorCode && p.errorCode.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Group by file
  const groupedByFile = filteredProblems.reduce((acc: Record<string, DiagnosticProblem[]>, p: DiagnosticProblem) => {
    const fileName = p.file || "workspace";
    if (!acc[fileName]) acc[fileName] = [];
    acc[fileName].push(p);
    return acc;
  }, {});

  const toggleCollapseFile = (fileName: string) => {
    setCollapsedFiles((prev) => ({ ...prev, [fileName]: !prev[fileName] }));
  };

  const totalErrors = problems.filter((p) => p.severity === "error").length;
  const totalWarnings = problems.filter((p) => p.severity === "warning").length;
  const totalInfos = problems.filter((p) => p.severity === "info").length;

  return (
    <div className="h-full flex flex-col font-mono select-none overflow-hidden">
      {/* Top Filter Bar */}
      <div className="px-3 py-2 border-b border-zinc-800 bg-[#121216] flex flex-wrap items-center justify-between gap-2 shrink-0">
        {/* Severity Filter Tabs */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterSeverity("all")}
            className={`px-2.5 py-1 rounded text-xs font-semibold transition ${
              filterSeverity === "all"
                ? "bg-zinc-800 text-white border border-zinc-700"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            All ({problems.length})
          </button>

          <button
            onClick={() => setFilterSeverity("error")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
              filterSeverity === "error"
                ? "bg-red-950/80 text-red-300 border border-red-800"
                : "text-zinc-400 hover:text-red-300"
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            <span>Errors ({totalErrors})</span>
          </button>

          <button
            onClick={() => setFilterSeverity("warning")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
              filterSeverity === "warning"
                ? "bg-amber-950/80 text-amber-300 border border-amber-800"
                : "text-zinc-400 hover:text-amber-300"
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Warnings ({totalWarnings})</span>
          </button>

          {totalInfos > 0 && (
            <button
              onClick={() => setFilterSeverity("info")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold transition ${
                filterSeverity === "info"
                  ? "bg-blue-950/80 text-blue-300 border border-blue-800"
                  : "text-zinc-400 hover:text-blue-300"
              }`}
            >
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <span>Info ({totalInfos})</span>
            </button>
          )}
        </div>

        {/* Search & Navigation Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Problem Filter Search */}
          <div className="relative">
            <Search className="w-3 h-3 text-zinc-500 absolute left-2 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter problems..."
              className="pl-7 pr-2 py-0.5 rounded bg-zinc-900 border border-zinc-700/80 text-[11px] text-zinc-200 focus:border-orange-500 outline-none w-36 sm:w-44"
            />
          </div>

          {/* Previous / Next Diagnostic Buttons */}
          {problems.length > 0 && (
            <div className="flex items-center gap-0.5 bg-zinc-900 border border-zinc-800 rounded px-1 py-0.5">
              <button
                onClick={onPrevProblem}
                title="Previous Diagnostic (Shift+F8)"
                className="p-0.5 text-zinc-400 hover:text-white rounded transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-zinc-500 px-1 font-mono">
                {selectedProblemIndex >= 0 ? `${selectedProblemIndex + 1}/${problems.length}` : "F8"}
              </span>
              <button
                onClick={onNextProblem}
                title="Next Diagnostic (F8)"
                className="p-0.5 text-zinc-400 hover:text-white rounded transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Diagnostics List Grouped by File */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredProblems.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500">
            <CheckCircle2 className="w-8 h-8 mb-2 text-emerald-500/60" />
            <p className="text-sm font-semibold text-zinc-300">No Problems Detected</p>
            <p className="text-xs text-zinc-600 mt-1">
              Compiler and static diagnostics reported no syntax or semantic errors.
            </p>
          </div>
        ) : (
          (Object.entries(groupedByFile) as [string, DiagnosticProblem[]][]).map(([fileName, fileProblems]) => {
            const isCollapsed = collapsedFiles[fileName];
            const fileErrorCount = fileProblems.filter((p) => p.severity === "error").length;
            const fileWarnCount = fileProblems.filter((p) => p.severity === "warning").length;

            return (
              <div
                key={fileName}
                className="border border-zinc-800/80 rounded-lg overflow-hidden bg-[#0f0f13]"
              >
                {/* File Header */}
                <div
                  onClick={() => toggleCollapseFile(fileName)}
                  className="px-3 py-1.5 bg-[#141418] hover:bg-[#18181e] cursor-pointer flex items-center justify-between border-b border-zinc-800/60 transition"
                >
                  <div className="flex items-center gap-2">
                    {isCollapsed ? (
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
                    )}
                    <FileCode className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-xs font-bold text-zinc-200">{fileName}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {fileErrorCount > 0 && (
                      <span className="text-[10px] bg-red-950/60 text-red-400 border border-red-800/60 px-1.5 py-0.2 rounded font-bold">
                        {fileErrorCount} {fileErrorCount === 1 ? "error" : "errors"}
                      </span>
                    )}
                    {fileWarnCount > 0 && (
                      <span className="text-[10px] bg-amber-950/60 text-amber-400 border border-amber-800/60 px-1.5 py-0.2 rounded font-bold">
                        {fileWarnCount} {fileWarnCount === 1 ? "warning" : "warnings"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Problems List in File */}
                {!isCollapsed && (
                  <div className="divide-y divide-zinc-800/40">
                    {fileProblems.map((problem) => (
                      <div
                        key={problem.id}
                        onClick={() => onSelectProblem(problem)}
                        className="p-2.5 hover:bg-zinc-800/40 cursor-pointer transition flex items-start gap-2.5 group"
                      >
                        {/* Severity Icon */}
                        <div className="mt-0.5 shrink-0">
                          {problem.severity === "error" ? (
                            <AlertCircle className="w-4 h-4 text-red-400" />
                          ) : problem.severity === "warning" ? (
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                          ) : (
                            <Info className="w-4 h-4 text-blue-400" />
                          )}
                        </div>

                        {/* Problem Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                              Ln {problem.line}, Col {problem.column}
                            </span>
                            {problem.errorCode && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-950/50 text-red-300 border border-red-800/40 font-bold">
                                {problem.errorCode}
                              </span>
                            )}
                            <span className="text-[10px] text-zinc-500 font-normal">
                              [{problem.source || "compiler"}]
                            </span>
                          </div>

                          <p className="text-xs text-zinc-200 font-mono whitespace-pre-wrap leading-relaxed group-hover:text-white transition">
                            {problem.message}
                          </p>
                        </div>

                        {/* Jump Icon Hint */}
                        <div className="shrink-0 opacity-0 group-hover:opacity-100 transition text-orange-400 p-1">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
