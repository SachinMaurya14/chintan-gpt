import React, { useState } from "react";
import {
  Play,
  Plus,
  Trash2,
  Check,
  XCircle,
  AlertTriangle,
  Timer,
  RotateCcw,
  Sparkles,
  Layers,
  FileCode,
  ArrowRight,
  SplitSquareVertical,
  Maximize2,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import { TestCase, LanguageConfig } from "../types.js";

interface PlaygroundTestsTabProps {
  testCases: TestCase[];
  selectedTestId: string | null;
  onSelectTest: (testId: string) => void;
  onAddTest: () => void;
  onDeleteTest: (testId: string) => void;
  onClearTests: () => void;
  onUpdateTest: (testId: string, updates: Partial<TestCase>) => void;
  onRunSingleTest: (testId: string) => void;
  onRunAllTests: () => void;
  isRunningTests: boolean;
  onLoadDsaPreset: (preset: "array_sum" | "two_sum" | "palindrome" | "matrix") => void;
  currentLanguage: LanguageConfig;
}

export const PlaygroundTestsTab: React.FC<PlaygroundTestsTabProps> = ({
  testCases,
  selectedTestId,
  onSelectTest,
  onAddTest,
  onDeleteTest,
  onClearTests,
  onUpdateTest,
  onRunSingleTest,
  onRunAllTests,
  isRunningTests,
  onLoadDsaPreset,
  currentLanguage,
}) => {
  const [diffMode, setDiffMode] = useState<"stacked" | "side-by-side">("side-by-side");

  const selectedTest = testCases.find((t) => t.id === selectedTestId) || testCases[0];

  // Stats calculation
  const totalCount = testCases.length;
  const passedCount = testCases.filter((t) => t.status === "passed").length;
  const failedCount = testCases.filter((t) => t.status === "failed").length;
  const errorCount = testCases.filter((t) => t.status === "error" || t.status === "timeout").length;
  const passRate = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;

  const renderStatusBadge = (test: TestCase) => {
    switch (test.status) {
      case "passed":
        return (
          <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2 py-0.5 rounded font-mono font-bold">
            <Check className="w-3 h-3" />
            <span>PASSED</span>
          </span>
        );
      case "failed":
        return (
          <span className="flex items-center gap-1 text-[10px] text-red-400 bg-red-950/60 border border-red-800/80 px-2 py-0.5 rounded font-mono font-bold">
            <XCircle className="w-3 h-3" />
            <span>FAILED</span>
          </span>
        );
      case "error":
        return (
          <span className="flex items-center gap-1 text-[10px] text-amber-400 bg-amber-950/60 border border-amber-800/80 px-2 py-0.5 rounded font-mono font-bold">
            <AlertTriangle className="w-3 h-3" />
            <span>ERROR</span>
          </span>
        );
      case "timeout":
        return (
          <span className="flex items-center gap-1 text-[10px] text-purple-400 bg-purple-950/60 border border-purple-800/80 px-2 py-0.5 rounded font-mono font-bold">
            <Timer className="w-3 h-3" />
            <span>TIMEOUT</span>
          </span>
        );
      case "running":
        return (
          <span className="flex items-center gap-1 text-[10px] text-orange-400 bg-orange-950/60 border border-orange-800/80 px-2 py-0.5 rounded font-mono font-bold animate-pulse">
            <RotateCcw className="w-3 h-3 animate-spin" />
            <span>RUNNING</span>
          </span>
        );
      default:
        return (
          <span className="text-[10px] text-zinc-500 bg-zinc-800/60 border border-zinc-700/60 px-2 py-0.5 rounded font-mono">
            NOT RUN
          </span>
        );
    }
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-3 overflow-hidden">
      {/* Left Column: Test Case List & Suite Actions */}
      <div className="w-full md:w-72 flex flex-col border border-zinc-800 rounded-lg bg-[#0e0e12] overflow-hidden shrink-0">
        {/* Suite Header & Run All Button */}
        <div className="p-2.5 border-b border-zinc-800 bg-[#121216] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">Test Suite</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400 font-mono">
              {totalCount}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="btn-run-all-tests"
              onClick={onRunAllTests}
              disabled={isRunningTests || totalCount === 0}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition shadow-xs"
              title="Execute all test cases sequentially (Isolated stdin/stdout)"
            >
              <Play className={`w-3 h-3 fill-current ${isRunningTests ? "animate-spin" : ""}`} />
              <span>Run All</span>
            </button>
            <button
              onClick={onAddTest}
              className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition"
              title="Add New Test Case"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Progress / Summary Bar */}
        {totalCount > 0 && (
          <div className="px-3 py-2 border-b border-zinc-800/80 bg-[#101014] space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-mono">
              <span className="text-zinc-400">
                <strong className={passedCount === totalCount && totalCount > 0 ? "text-emerald-400" : "text-white"}>
                  {passedCount}/{totalCount}
                </strong>{" "}
                Tests Passed
              </span>
              <span className="text-zinc-500 font-bold">{passRate}%</span>
            </div>
            {/* Progress Visual Bar */}
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${(passedCount / totalCount) * 100}%` }}
                className="bg-emerald-500 transition-all duration-300"
              />
              <div
                style={{ width: `${(failedCount / totalCount) * 100}%` }}
                className="bg-red-500 transition-all duration-300"
              />
              <div
                style={{ width: `${(errorCount / totalCount) * 100}%` }}
                className="bg-amber-500 transition-all duration-300"
              />
            </div>
          </div>
        )}

        {/* Test Cases List */}
        <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
          {testCases.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-4 text-center text-zinc-500 text-xs">
              <Layers className="w-6 h-6 mb-2 text-zinc-600" />
              <p>No test cases created yet.</p>
              <button
                onClick={onAddTest}
                className="mt-2 px-2.5 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition"
              >
                + Add Test Case
              </button>
            </div>
          ) : (
            testCases.map((test, index) => {
              const isSelected = test.id === selectedTest?.id;
              return (
                <div
                  key={test.id}
                  onClick={() => onSelectTest(test.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-mono transition cursor-pointer border ${
                    isSelected
                      ? "bg-zinc-800/90 border-orange-500/50 text-white shadow-xs"
                      : "bg-zinc-900/50 border-zinc-800/60 text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-[10px] text-zinc-500 font-bold">#{index + 1}</span>
                    <span className="font-semibold truncate">{test.name || `Case ${index + 1}`}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {test.executionTimeMs !== undefined && (
                      <span className="text-[9px] text-zinc-500">{test.executionTimeMs}ms</span>
                    )}
                    {renderStatusBadge(test)}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Preset DSA Samples */}
        <div className="p-2 border-t border-zinc-800 bg-[#121216]">
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-orange-400" />
            DSA Presets
          </div>
          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => onLoadDsaPreset("array_sum")}
              className="px-2 py-1 rounded bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 text-[10px] transition text-left truncate"
            >
              Array Sum
            </button>
            <button
              onClick={() => onLoadDsaPreset("two_sum")}
              className="px-2 py-1 rounded bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 text-[10px] transition text-left truncate"
            >
              Two Sum
            </button>
            <button
              onClick={() => onLoadDsaPreset("palindrome")}
              className="px-2 py-1 rounded bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 text-[10px] transition text-left truncate"
            >
              Palindrome
            </button>
            <button
              onClick={() => onLoadDsaPreset("matrix")}
              className="px-2 py-1 rounded bg-zinc-800/70 hover:bg-zinc-700 text-zinc-300 text-[10px] transition text-left truncate"
            >
              Matrix Sum
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Selected Test Case Editor & Diff Viewer */}
      {selectedTest ? (
        <div className="flex-1 flex flex-col border border-zinc-800 rounded-lg bg-[#0e0e12] overflow-hidden">
          {/* Header */}
          <div className="p-2.5 border-b border-zinc-800 bg-[#121216] flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={selectedTest.name}
                onChange={(e) => onUpdateTest(selectedTest.id, { name: e.target.value })}
                className="bg-transparent border-b border-zinc-700 focus:border-orange-500 text-xs font-bold text-white px-1 py-0.5 outline-none font-mono"
                placeholder="Test Case Name"
              />
              {renderStatusBadge(selectedTest)}
              {selectedTest.executionTimeMs !== undefined && (
                <span className="text-[10px] text-zinc-500 font-mono">
                  ⏱ {selectedTest.executionTimeMs}ms
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() =>
                  setDiffMode(diffMode === "side-by-side" ? "stacked" : "side-by-side")
                }
                className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs transition"
                title={`Switch diff layout (Current: ${diffMode})`}
              >
                <SplitSquareVertical className="w-3 h-3" />
                <span className="hidden sm:inline capitalize">{diffMode}</span>
              </button>

              <button
                onClick={() => onRunSingleTest(selectedTest.id)}
                disabled={isRunningTests}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold transition shadow-xs"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Run Test</span>
              </button>

              <button
                onClick={() => onDeleteTest(selectedTest.id)}
                className="p-1 rounded bg-zinc-800 hover:bg-red-900/60 text-zinc-400 hover:text-red-300 transition"
                title="Delete Test Case"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Test Case Inputs & Output Grid */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 font-mono">
            {/* Input (stdin) */}
            <div>
              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-bold mb-1">
                <span>Input (stdin):</span>
                <span className="text-zinc-500 text-[10px] font-normal">
                  {selectedTest.input.split("\n").length} lines • {selectedTest.input.length} chars
                </span>
              </div>
              <textarea
                value={selectedTest.input}
                onChange={(e) => onUpdateTest(selectedTest.id, { input: e.target.value })}
                rows={3}
                placeholder="Enter input parameters..."
                className="w-full bg-[#141418] border border-zinc-700/80 focus:border-blue-500 rounded-lg p-2.5 text-xs text-zinc-200 font-mono outline-none resize-y"
              />
            </div>

            {/* Expected vs Actual Outputs */}
            <div
              className={`grid gap-3 ${
                diffMode === "side-by-side" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
              }`}
            >
              {/* Expected Output */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-bold mb-1">
                  <span>Expected Output:</span>
                  <span className="text-zinc-500 text-[10px] font-normal">
                    {selectedTest.expectedOutput.split("\n").length} lines
                  </span>
                </div>
                <textarea
                  value={selectedTest.expectedOutput}
                  onChange={(e) =>
                    onUpdateTest(selectedTest.id, { expectedOutput: e.target.value })
                  }
                  rows={4}
                  placeholder="Enter expected stdout result..."
                  className="w-full bg-[#141418] border border-zinc-700/80 focus:border-emerald-500 rounded-lg p-2.5 text-xs text-zinc-200 font-mono outline-none resize-y"
                />
              </div>

              {/* Actual Output */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-bold mb-1">
                  <span className="flex items-center gap-1">
                    Actual Output:
                    {selectedTest.status === "passed" && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                    {selectedTest.status === "failed" && (
                      <XCircle className="w-3.5 h-3.5 text-red-400" />
                    )}
                  </span>
                  {selectedTest.actualOutput !== undefined && (
                    <span className="text-zinc-500 text-[10px] font-normal">
                      {selectedTest.actualOutput.split("\n").length} lines
                    </span>
                  )}
                </div>
                <div
                  className={`w-full min-h-[96px] rounded-lg p-2.5 text-xs font-mono overflow-auto border ${
                    selectedTest.status === "passed"
                      ? "bg-emerald-950/20 border-emerald-800/60 text-emerald-200"
                      : selectedTest.status === "failed"
                      ? "bg-red-950/20 border-red-800/60 text-red-200"
                      : "bg-[#141418] border-zinc-800 text-zinc-400"
                  }`}
                >
                  {selectedTest.actualOutput !== undefined ? (
                    <pre className="whitespace-pre-wrap">{selectedTest.actualOutput || "(empty stdout)"}</pre>
                  ) : (
                    <span className="italic text-zinc-600">Run test case to view actual output.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Error / Stderr Details if failed/error */}
            {selectedTest.stderr && (
              <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-800/60 text-red-300 text-xs">
                <div className="font-bold mb-1 flex items-center gap-1 text-[10px] uppercase tracking-wider text-red-400">
                  <AlertTriangle className="w-3 h-3" />
                  Runtime / Stderr Trace:
                </div>
                <pre className="whitespace-pre-wrap font-mono text-[11px]">{selectedTest.stderr}</pre>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center border border-zinc-800 rounded-lg bg-[#0e0e12] p-6 text-center text-zinc-500">
          <Layers className="w-8 h-8 mb-2 text-zinc-700" />
          <p className="text-sm font-semibold text-zinc-400">No Test Case Selected</p>
          <p className="text-xs text-zinc-600 mt-1">Select a test from the left or create a new test case.</p>
        </div>
      )}
    </div>
  );
};
