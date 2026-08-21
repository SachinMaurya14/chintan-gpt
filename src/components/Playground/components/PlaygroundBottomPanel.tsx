import React, { useState, useRef, useEffect } from "react";
import {
  Terminal,
  PlaySquare,
  AlertCircle,
  AlertTriangle,
  Info,
  Edit3,
  Trash2,
  ChevronDown,
  ChevronUp,
  XCircle,
  Clock,
  Loader2,
  Copy,
  Check,
  Eye,
  ShieldAlert,
  ServerCrash,
  Timer,
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  FileCode,
  Layers,
  Download,
  RotateCw,
  WrapText,
  Sparkles,
  Cpu,
  CornerDownLeft,
  Bug,
  CheckSquare
} from "lucide-react";
import {
  BottomPanelTab,
  DiagnosticProblem,
  LanguageConfig,
  ExecutionStatus,
  TestCase,
  DebugBreakpoint,
  DebugSessionState,
  WorkspaceFile
} from "../types.js";
import { PlaygroundPreview } from "./PlaygroundPreview.js";
import { PlaygroundTestsTab } from "./PlaygroundTestsTab.js";
import { PlaygroundProblemsTab } from "./PlaygroundProblemsTab.js";
import { PlaygroundDebugTab } from "./PlaygroundDebugTab.js";

interface PlaygroundBottomPanelProps {
  currentLanguage: LanguageConfig;
  activeTab: BottomPanelTab;
  setActiveTab: (tab: BottomPanelTab) => void;
  outputLog: string;
  stderrLog?: string;
  systemMessage?: string;
  previewHtml?: string;
  executionStatus: ExecutionStatus;
  executionTimeMs?: number;
  exitCode?: number | null;
  isRunning: boolean;
  onRunCode?: () => void;
  onStopExecution?: () => void;
  onRestartExecution?: () => void;
  onClearOutput: () => void;
  consoleLog: string[];
  onClearConsole: () => void;
  stdinValue: string;
  setStdinValue: (value: string) => void;
  problems: DiagnosticProblem[];
  onSelectProblem: (problem: DiagnosticProblem) => void;
  onNextProblem?: () => void;
  onPrevProblem?: () => void;
  selectedProblemIndex?: number;
  isOpen: boolean;
  onToggleOpen: () => void;
  panelHeight: number;
  setPanelHeight: (height: number) => void;

  // Tests Tab Props
  testCases?: TestCase[];
  selectedTestId?: string | null;
  onSelectTest?: (testId: string) => void;
  onAddTest?: () => void;
  onDeleteTest?: (testId: string) => void;
  onClearTests?: () => void;
  onUpdateTest?: (testId: string, updates: Partial<TestCase>) => void;
  onRunSingleTest?: (testId: string) => void;
  onRunAllTests?: () => void;
  isRunningTests?: boolean;
  onLoadDsaPreset?: (preset: "array_sum" | "two_sum" | "palindrome" | "matrix") => void;

  // Debug Tab Props
  files?: WorkspaceFile[];
  breakpoints?: DebugBreakpoint[];
  onToggleBreakpoint?: (fileId: string, lineNumber: number) => void;
  onRemoveBreakpoint?: (fileId: string, lineNumber: number) => void;
  onClearAllBreakpoints?: () => void;
  debugState?: DebugSessionState;
  onStartDebug?: () => void;
  onStopDebug?: () => void;
  onContinueDebug?: () => void;
  onStepOver?: () => void;
  onStepInto?: () => void;
  onStepOut?: () => void;
}

export const PlaygroundBottomPanel: React.FC<PlaygroundBottomPanelProps> = ({
  currentLanguage,
  activeTab,
  setActiveTab,
  outputLog,
  stderrLog,
  systemMessage,
  previewHtml,
  executionStatus,
  executionTimeMs,
  exitCode,
  isRunning,
  onRunCode,
  onStopExecution,
  onRestartExecution,
  onClearOutput,
  consoleLog,
  onClearConsole,
  stdinValue,
  setStdinValue,
  problems,
  onSelectProblem,
  onNextProblem,
  onPrevProblem,
  selectedProblemIndex = -1,
  isOpen,
  onToggleOpen,
  panelHeight,
  setPanelHeight,

  testCases = [],
  selectedTestId = null,
  onSelectTest = () => {},
  onAddTest = () => {},
  onDeleteTest = () => {},
  onClearTests = () => {},
  onUpdateTest = () => {},
  onRunSingleTest = () => {},
  onRunAllTests = () => {},
  isRunningTests = false,
  onLoadDsaPreset = () => {},

  files = [],
  breakpoints = [],
  onToggleBreakpoint = () => {},
  onRemoveBreakpoint = () => {},
  onClearAllBreakpoints = () => {},
  debugState = {
    isActive: false,
    isPaused: false,
    variables: [],
    callStack: [],
    supported: true,
  },
  onStartDebug = () => {},
  onStopDebug = () => {},
  onContinueDebug = () => {},
  onStepOver = () => {},
  onStepInto = () => {},
  onStepOut = () => {},
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [wordWrap, setWordWrap] = useState(true);
  const dragStartYRef = useRef<number>(0);
  const startHeightRef = useRef<number>(panelHeight);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  const isWebOrReact = ["html", "css", "react"].includes(currentLanguage.id);
  const errorCount = problems.filter((p) => p.severity === "error").length;
  const warningCount = problems.filter((p) => p.severity === "warning").length;
  const hasErrors = Boolean(stderrLog && stderrLog.trim().length > 0) || executionStatus === "compile_error" || executionStatus === "runtime_error";

  // Auto-scroll to bottom when logs or output update if autoScroll is active
  useEffect(() => {
    if (autoScroll && contentContainerRef.current) {
      contentContainerRef.current.scrollTop = contentContainerRef.current.scrollHeight;
    }
  }, [outputLog, stderrLog, consoleLog, activeTab, autoScroll]);

  // Handle Drag Resizing of the bottom panel
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaY = dragStartYRef.current - e.clientY;
      const newHeight = Math.min(Math.max(startHeightRef.current + deltaY, 140), 650);
      setPanelHeight(newHeight);
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
      }
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, setPanelHeight]);

  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartYRef.current = e.clientY;
    startHeightRef.current = panelHeight;
  };

  const handleCopyCurrentTab = () => {
    let textToCopy = "";
    if (activeTab === "output") {
      textToCopy = outputLog || "";
    } else if (activeTab === "errors") {
      textToCopy = stderrLog || "";
    } else if (activeTab === "input") {
      textToCopy = stdinValue || "";
    } else if (activeTab === "console") {
      textToCopy = consoleLog.join("\n");
    } else if (activeTab === "problems") {
      textToCopy = problems
        .map((p) => `[${p.severity.toUpperCase()}] ${p.file}:${p.line}:${p.column} - ${p.message}`)
        .join("\n");
    }

    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownloadOutput = () => {
    const timestamp = new Date().toISOString();
    const content = [
      `============================================================`,
      `Chintan Playground IDE — Runtime Execution Report`,
      `Language: ${currentLanguage.name}`,
      `Status: ${executionStatus.toUpperCase()}`,
      `Duration: ${executionTimeMs ?? 0}ms`,
      `Exit Code: ${exitCode !== undefined && exitCode !== null ? exitCode : "N/A"}`,
      `Timestamp: ${timestamp}`,
      `============================================================\n`,
      `--- STANDARD INPUT (stdin) ---`,
      stdinValue || "(none)",
      `\n--- STANDARD OUTPUT (stdout) ---`,
      outputLog || "(empty)",
      `\n--- STANDARD ERROR (stderr) ---`,
      stderrLog || "(none)",
      `\n--- DIAGNOSTICS & SYSTEM ---`,
      systemMessage || "(none)",
    ].join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `playground-execution-${currentLanguage.id}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleScrollToBottom = () => {
    if (contentContainerRef.current) {
      contentContainerRef.current.scrollTo({
        top: contentContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleSelectAll = () => {
    if (contentContainerRef.current) {
      const range = document.createRange();
      range.selectNodeContents(contentContainerRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  // Stdin helper templates
  const handleInsertStdinTemplate = (template: "array" | "matrix" | "string" | "pair") => {
    let sample = "";
    if (template === "array") {
      sample = "5\n10 20 30 40 50";
    } else if (template === "matrix") {
      sample = "3 3\n1 2 3\n4 5 6\n7 8 9";
    } else if (template === "string") {
      sample = "hello world\nchintan_playground";
    } else if (template === "pair") {
      sample = "4\n1 10\n2 20\n3 30\n4 40";
    }
    setStdinValue(sample);
  };

  // Helper function to render exit status badge
  const renderExitBadge = () => {
    if (executionStatus === "idle") return null;

    if (executionStatus === "running") {
      return (
        <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/40 border border-amber-800/60 px-2 py-0.5 rounded font-mono font-bold">
          <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
          <span>RUNNING</span>
        </span>
      );
    }

    if (executionStatus === "success") {
      return (
        <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded font-mono font-bold">
          <Check className="w-3 h-3" />
          <span>EXIT 0 (SUCCESS)</span>
        </span>
      );
    }

    if (executionStatus === "timeout") {
      return (
        <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded font-mono font-bold">
          <Timer className="w-3 h-3" />
          <span>TIMED OUT (SIGXCPU)</span>
        </span>
      );
    }

    if (executionStatus === "memory_limit") {
      return (
        <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded font-mono font-bold">
          <AlertTriangle className="w-3 h-3" />
          <span>SIGKILL (OOM)</span>
        </span>
      );
    }

    if (executionStatus === "compile_error") {
      return (
        <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded font-mono font-bold">
          <XCircle className="w-3 h-3" />
          <span>COMPILE FAILED</span>
        </span>
      );
    }

    if (executionStatus === "runtime_error") {
      const code = exitCode !== undefined && exitCode !== null ? exitCode : 1;
      return (
        <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded font-mono font-bold">
          <ServerCrash className="w-3 h-3" />
          <span>EXIT {code} (RUNTIME ERROR)</span>
        </span>
      );
    }

    return null;
  };

  if (!isOpen) {
    return (
      <div className="border-t border-zinc-800/80 bg-[#0c0c0e] px-4 py-1.5 flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setActiveTab("output");
              onToggleOpen();
            }}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition"
          >
            <PlaySquare className="w-3.5 h-3.5 text-orange-400" />
            <span>Output</span>
            {isRunning && <Loader2 className="w-3 h-3 text-orange-400 animate-spin" />}
          </button>

          {hasErrors && (
            <button
              onClick={() => {
                setActiveTab("errors");
                onToggleOpen();
              }}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 transition"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Errors</span>
            </button>
          )}

          {isWebOrReact && (
            <button
              onClick={() => {
                setActiveTab("preview");
                onToggleOpen();
              }}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Preview</span>
            </button>
          )}

          <button
            onClick={() => {
              setActiveTab("input");
              onToggleOpen();
            }}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition"
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
            <span>Input</span>
            {stdinValue.trim().length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab("problems");
              onToggleOpen();
            }}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition"
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Problems ({problems.length})</span>
          </button>

          {renderExitBadge()}
        </div>

        <button
          onClick={onToggleOpen}
          className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition"
          title="Expand Terminal Panel"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      id="playground-bottom-panel"
      style={{ height: `${panelHeight}px` }}
      className="border-t border-zinc-800/80 bg-[#0c0c0e] flex flex-col font-mono select-none shrink-0 relative transition-[height] duration-75"
    >
      {/* Resizable Drag Handle Bar */}
      <div
        onMouseDown={handleMouseDownResize}
        className={`h-1.5 w-full cursor-ns-resize hover:bg-orange-500/60 active:bg-orange-500 transition flex items-center justify-center -mt-1 z-20 ${
          isDragging ? "bg-orange-500" : "bg-transparent"
        }`}
        title="Drag to resize panel"
      >
        <div className="w-10 h-0.5 bg-zinc-600/50 rounded-full" />
      </div>

      {/* Panel Tab Bar */}
      <div className="px-3 py-1.5 border-b border-zinc-800/80 bg-[#101014] flex flex-wrap items-center justify-between gap-2">
        {/* Tab Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {/* 1. Output Tab */}
          <button
            id="tab-btn-output"
            onClick={() => setActiveTab("output")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === "output"
                ? "bg-zinc-800 text-orange-400 border border-zinc-700/80"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
          >
            <PlaySquare className="w-3.5 h-3.5 text-orange-400" />
            <span>Output</span>
            {isRunning && <Loader2 className="w-3 h-3 text-orange-400 animate-spin" />}
          </button>

          {/* 2. Errors Tab */}
          <button
            id="tab-btn-errors"
            onClick={() => setActiveTab("errors")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === "errors"
                ? "bg-zinc-800 text-red-400 border border-zinc-700/80"
                : hasErrors
                ? "text-red-400 hover:text-red-300 hover:bg-zinc-800/40"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
          >
            <XCircle className="w-3.5 h-3.5 text-red-400" />
            <span>Errors</span>
            {hasErrors && <span className="w-1.5 h-1.5 rounded-full bg-red-400" />}
          </button>

          {/* 3. Input (stdin) Tab */}
          <button
            id="tab-btn-input"
            onClick={() => setActiveTab("input")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === "input"
                ? "bg-zinc-800 text-blue-400 border border-zinc-700/80"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5 text-blue-400" />
            <span>Input</span>
            {stdinValue.trim().length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            )}
          </button>

          {/* 4. Test Cases Suite Tab */}
          <button
            id="tab-btn-tests"
            onClick={() => setActiveTab("tests")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === "tests"
                ? "bg-zinc-800 text-emerald-400 border border-zinc-700/80"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Tests</span>
            {testCases.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-zinc-800 text-zinc-400">
                {testCases.filter((t) => t.status === "passed").length}/{testCases.length}
              </span>
            )}
          </button>

          {/* 5. Problems (Diagnostics) Tab */}
          <button
            id="tab-btn-problems"
            onClick={() => setActiveTab("problems")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === "problems"
                ? "bg-zinc-800 text-amber-400 border border-zinc-700/80"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Diagnostics</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                errorCount > 0
                  ? "bg-red-500/20 text-red-400"
                  : warningCount > 0
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {problems.length}
            </span>
          </button>

          {/* 6. Debugger Tab */}
          <button
            id="tab-btn-debug"
            onClick={() => setActiveTab("debug")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === "debug"
                ? "bg-zinc-800 text-purple-400 border border-zinc-700/80"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
          >
            <Bug className="w-3.5 h-3.5 text-purple-400" />
            <span>Debug</span>
            {breakpoints.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            )}
          </button>

          {/* 7. Sandboxed Preview Tab (HTML, CSS, React) */}
          {isWebOrReact && (
            <button
              id="tab-btn-preview"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
                activeTab === "preview"
                  ? "bg-zinc-800 text-cyan-400 border border-zinc-700/80"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>Preview</span>
              {previewHtml && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
            </button>
          )}

          {/* 8. Console Tab */}
          <button
            id="tab-btn-console"
            onClick={() => setActiveTab("console")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              activeTab === "console"
                ? "bg-zinc-800 text-emerald-400 border border-zinc-700/80"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40"
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span>Console</span>
            {consoleLog.length > 0 && (
              <span className="text-[10px] text-zinc-500 font-normal">
                ({consoleLog.length})
              </span>
            )}
          </button>
        </div>

        {/* Right Toolbar Controls */}
        <div className="flex items-center gap-1.5">
          {/* Status & Exit Badge */}
          {renderExitBadge()}

          {/* Diagnostic Navigation: Previous / Next Error (F8 / Shift+F8) */}
          {problems.length > 0 && (
            <div className="flex items-center gap-0.5 bg-zinc-900 border border-zinc-800 rounded px-1 py-0.5 mr-1">
              <button
                onClick={onPrevProblem}
                title="Previous Error / Problem (Shift+F8)"
                className="p-0.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] text-zinc-400 px-1">
                {selectedProblemIndex >= 0 ? `${selectedProblemIndex + 1}/${problems.length}` : `${problems.length}`}
              </span>
              <button
                onClick={onNextProblem}
                title="Next Error / Problem (F8)"
                className="p-0.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Execution Time indicator */}
          {executionTimeMs !== undefined && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-zinc-400 bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700/50">
              <Clock className="w-3 h-3 text-orange-400" />
              <span>{executionTimeMs}ms</span>
            </span>
          )}

          {/* Restart Execution Action */}
          {onRestartExecution && (
            <button
              onClick={onRestartExecution}
              title="Restart Execution (⌘⇧↵ / Ctrl+Shift+Enter)"
              className="flex items-center gap-1 px-2 py-0.5 text-zinc-400 hover:text-orange-400 bg-zinc-800/50 hover:bg-zinc-800 rounded transition text-[11px]"
            >
              <RotateCw className={`w-3 h-3 ${isRunning ? "animate-spin text-orange-400" : ""}`} />
              <span className="hidden md:inline">Restart</span>
            </button>
          )}

          {/* Word Wrap Toggle */}
          <button
            onClick={() => setWordWrap(!wordWrap)}
            title={`Word Wrap: ${wordWrap ? "ON" : "OFF"}`}
            className={`p-1 rounded transition ${
              wordWrap ? "bg-zinc-800 text-orange-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>

          {/* Auto-Scroll Toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            title={`Sticky Auto-scroll: ${autoScroll ? "Enabled" : "Paused"}`}
            className={`px-1.5 py-0.5 rounded text-[10px] transition ${
              autoScroll ? "bg-zinc-800 text-emerald-400" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            Auto-Scroll
          </button>

          {/* Copy Button */}
          <button
            onClick={handleCopyCurrentTab}
            title={`Copy ${activeTab} content`}
            className="flex items-center gap-1 px-2 py-0.5 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded transition text-[11px]"
          >
            {isCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          {/* Download Output */}
          <button
            onClick={handleDownloadOutput}
            title="Download Execution Report (.txt)"
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Select All */}
          <button
            onClick={handleSelectAll}
            title="Select all text"
            className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] text-zinc-400 hover:text-white bg-zinc-800/40 hover:bg-zinc-800 rounded transition"
          >
            Select All
          </button>

          {/* Scroll to Bottom */}
          <button
            onClick={handleScrollToBottom}
            title="Scroll to bottom"
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          {/* Clear Output Action */}
          <button
            onClick={() => {
              if (activeTab === "console") {
                onClearConsole();
              } else if (activeTab === "input") {
                setStdinValue("");
              } else {
                onClearOutput();
              }
            }}
            title="Clear current tab"
            className="p-1 text-zinc-500 hover:text-red-400 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Preset Height Buttons */}
          <div className="hidden lg:flex items-center gap-1 border-l border-zinc-800 pl-1.5">
            <button
              onClick={() => setPanelHeight(160)}
              title="Compact Height"
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                panelHeight === 160 ? "bg-zinc-800 text-orange-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              S
            </button>
            <button
              onClick={() => setPanelHeight(280)}
              title="Standard Height"
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                panelHeight === 280 ? "bg-zinc-800 text-orange-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              M
            </button>
            <button
              onClick={() => setPanelHeight(420)}
              title="Expanded Height"
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                panelHeight === 420 ? "bg-zinc-800 text-orange-400" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              L
            </button>
          </div>

          {/* Toggle Panel Collapse */}
          <button
            onClick={onToggleOpen}
            className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded transition ml-0.5"
            title="Collapse Panel"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tab Body Container */}
      <div
        ref={contentContainerRef}
        className="flex-1 overflow-y-auto p-3 text-xs bg-[#09090b]"
      >
        {/* 1. Output Tab */}
        {activeTab === "output" && (
          <div className="h-full">
            {isRunning ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 font-mono gap-2 py-6">
                <Loader2 className="w-6 h-6 text-orange-400 animate-spin" />
                <p className="text-zinc-300 font-medium">● Running {currentLanguage.name} in sandbox...</p>
                <p className="text-[11px] text-zinc-500">Compiling and piping standard streams</p>
              </div>
            ) : outputLog ? (
              <div className="space-y-3 select-text font-mono leading-relaxed">
                {/* Standard Output (stdout) */}
                <div className="p-3 rounded-lg bg-[#101014] border border-zinc-800">
                  <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <PlaySquare className="w-3 h-3 text-orange-400" />
                      Standard Output (stdout)
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-500 font-normal">{outputLog.length} chars</span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-zinc-500 font-normal">{outputLog.split("\n").length} lines</span>
                    </div>
                  </div>
                  <pre
                    className={`text-zinc-200 font-mono leading-relaxed ${
                      wordWrap ? "whitespace-pre-wrap" : "whitespace-pre overflow-x-auto"
                    }`}
                  >
                    {outputLog}
                  </pre>
                </div>

                {/* System Message & Diagnostics */}
                {systemMessage && (
                  <div className="p-2.5 rounded bg-[#121216] border border-zinc-800 text-zinc-400 text-[11px]">
                    <div className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      <span>Diagnostics & System Summary</span>
                    </div>
                    <pre className="whitespace-pre-wrap leading-relaxed font-mono">{systemMessage}</pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 font-mono gap-2 text-center py-6">
                <PlaySquare className="w-6 h-6 text-zinc-700 stroke-[1.5]" />
                <p className="text-zinc-400 font-medium">No output yet. Run your code to see the result.</p>
                <div className="flex items-center gap-2 mt-1">
                  {onRunCode && (
                    <button
                      onClick={onRunCode}
                      className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
                    >
                      ▶ Run Program (⌘↵)
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Errors Tab */}
        {activeTab === "errors" && (
          <div className="h-full">
            {isRunning ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-400 font-mono gap-2 py-6">
                <Loader2 className="w-6 h-6 text-red-400 animate-spin" />
                <p className="text-zinc-300 font-medium">Monitoring error streams...</p>
              </div>
            ) : stderrLog || executionStatus === "compile_error" || executionStatus === "runtime_error" || executionStatus === "timeout" || executionStatus === "memory_limit" ? (
              <div className="space-y-3 select-text font-mono leading-relaxed">
                {/* Stderr Content */}
                {stderrLog ? (
                  <div className="p-3 rounded-lg bg-red-950/20 border border-red-800/50 text-red-300">
                    <div className="text-[10px] font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1 text-red-400">
                      <AlertTriangle className="w-3 h-3" />
                      <span>
                        {executionStatus === "compile_error"
                          ? "Compiler Output (Diagnostics)"
                          : executionStatus === "runtime_unavailable"
                          ? "Environment Status"
                          : "Standard Error (stderr)"}
                      </span>
                    </div>
                    <pre
                      className={`font-mono text-xs leading-relaxed ${
                        wordWrap ? "whitespace-pre-wrap" : "whitespace-pre overflow-x-auto"
                      }`}
                    >
                      {stderrLog}
                    </pre>
                  </div>
                ) : (
                  <p className="text-zinc-500">No stderr output captured.</p>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 font-mono gap-1 text-center py-6">
                <Check className="w-6 h-6 text-emerald-600 stroke-[1.5]" />
                <p className="text-zinc-400 font-medium">No errors detected</p>
                <p className="text-[11px] text-zinc-600">Compiler diagnostics and runtime exceptions will be logged here.</p>
              </div>
            )}
          </div>
        )}

        {/* 3. Input (stdin) Tab */}
        {activeTab === "input" && (
          <div className="h-full flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400">
              <span className="font-semibold flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-blue-400" />
                Standard Input Stream (stdin)
              </span>

              {/* Input Preset Templates */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-zinc-500">Presets:</span>
                <button
                  onClick={() => handleInsertStdinTemplate("array")}
                  className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-[10px] transition"
                >
                  Array
                </button>
                <button
                  onClick={() => handleInsertStdinTemplate("matrix")}
                  className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-[10px] transition"
                >
                  Matrix
                </button>
                <button
                  onClick={() => handleInsertStdinTemplate("string")}
                  className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-[10px] transition"
                >
                  Strings
                </button>
                <button
                  onClick={() => handleInsertStdinTemplate("pair")}
                  className="px-2 py-0.5 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 text-[10px] transition"
                >
                  Pairs
                </button>

                <span className="text-zinc-600">|</span>
                <span className="text-zinc-500 font-mono text-[10px]">
                  {stdinValue.split("\n").length} lines • {stdinValue.length} chars
                </span>
              </div>
            </div>
            <textarea
              id="playground-stdin-textarea"
              value={stdinValue}
              onChange={(e) => setStdinValue(e.target.value)}
              placeholder={`Enter input for ${currentLanguage.name} here (e.g. cin >>, input(), Scanner). Input is preserved across runs...`}
              className="flex-1 w-full p-3 rounded-lg bg-[#121215] border border-zinc-800 text-zinc-200 text-xs font-mono focus:outline-hidden focus:border-blue-500/60 resize-none leading-relaxed"
            />
          </div>
        )}

        {/* 4. Test Cases Suite Tab */}
        {activeTab === "tests" && (
          <div className="h-full">
            <PlaygroundTestsTab
              testCases={testCases}
              selectedTestId={selectedTestId}
              onSelectTest={onSelectTest}
              onAddTest={onAddTest}
              onDeleteTest={onDeleteTest}
              onClearTests={onClearTests}
              onUpdateTest={onUpdateTest}
              onRunSingleTest={onRunSingleTest}
              onRunAllTests={onRunAllTests}
              isRunningTests={isRunningTests}
              onLoadDsaPreset={onLoadDsaPreset}
              currentLanguage={currentLanguage}
            />
          </div>
        )}

        {/* 5. Diagnostics / Problems Tab */}
        {activeTab === "problems" && (
          <div className="h-full">
            <PlaygroundProblemsTab
              problems={problems}
              onSelectProblem={onSelectProblem}
              onNextProblem={onNextProblem}
              onPrevProblem={onPrevProblem}
              selectedProblemIndex={selectedProblemIndex}
            />
          </div>
        )}

        {/* 6. Debugger Tab */}
        {activeTab === "debug" && (
          <div className="h-full">
            <PlaygroundDebugTab
              currentLanguage={currentLanguage}
              files={files}
              breakpoints={breakpoints}
              onToggleBreakpoint={onToggleBreakpoint}
              onRemoveBreakpoint={onRemoveBreakpoint}
              onClearAllBreakpoints={onClearAllBreakpoints}
              debugState={debugState}
              onStartDebug={onStartDebug}
              onStopDebug={onStopDebug}
              onContinueDebug={onContinueDebug}
              onStepOver={onStepOver}
              onStepInto={onStepInto}
              onStepOut={onStepOut}
            />
          </div>
        )}

        {/* 7. Sandboxed Preview Tab */}
        {activeTab === "preview" && (
          <div className="h-full">
            <PlaygroundPreview
              previewHtml={previewHtml || ""}
              languageName={currentLanguage.name}
            />
          </div>
        )}

        {/* 8. Console Tab */}
        {activeTab === "console" && (
          <div className="h-full">
            {consoleLog.length > 0 ? (
              <div className="space-y-1.5 select-text font-mono text-xs">
                {consoleLog.map((log, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-zinc-300">
                    <span className="text-zinc-600 shrink-0 select-none">[{idx + 1}]</span>
                    <span className="whitespace-pre-wrap leading-relaxed">{log}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 font-mono gap-1 text-center py-6">
                <Terminal className="w-6 h-6 text-zinc-700 stroke-[1.5]" />
                <p className="text-zinc-400 font-medium">Console is clean</p>
                <p className="text-[11px] text-zinc-600">Runtime logs, events, and lifecycle signals will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
