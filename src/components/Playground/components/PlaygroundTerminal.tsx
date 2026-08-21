import React, { useState } from "react";
import {
  Terminal,
  Play,
  RotateCcw,
  Copy,
  Check,
  Cpu,
  Info,
  Layers,
  Sparkles,
  Zap,
  CornerDownLeft,
  Trash2
} from "lucide-react";
import { LanguageConfig, TerminalTab } from "../types.js";

interface PlaygroundTerminalProps {
  currentLanguage: LanguageConfig;
  outputLog: string;
  onClearOutput: () => void;
  stdinValue: string;
  setStdinValue: (val: string) => void;
}

export const PlaygroundTerminal: React.FC<PlaygroundTerminalProps> = ({
  currentLanguage,
  outputLog,
  onClearOutput,
  stdinValue,
  setStdinValue,
}) => {
  const [activeTab, setActiveTab] = useState<TerminalTab>("console");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyOutput = () => {
    if (!outputLog) return;
    navigator.clipboard.writeText(outputLog);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0c0c0e] overflow-hidden">
      {/* Terminal Header Tabs */}
      <div className="px-3 py-2 border-b border-zinc-800 bg-[#0e0e12] flex items-center justify-between select-none">
        <div className="flex items-center gap-1">
          <button
            id="tab-terminal-console"
            onClick={() => setActiveTab("console")}
            className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition flex items-center gap-1.5 ${
              activeTab === "console"
                ? "bg-[#18181c] text-orange-400 border border-zinc-700/80 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Console Output</span>
          </button>

          <button
            id="tab-terminal-stdin"
            onClick={() => setActiveTab("stdin")}
            className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition flex items-center gap-1.5 ${
              activeTab === "stdin"
                ? "bg-[#18181c] text-orange-400 border border-zinc-700/80 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
            <span>Standard Input (stdin)</span>
            {stdinValue.trim().length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            )}
          </button>

          <button
            id="tab-terminal-info"
            onClick={() => setActiveTab("info")}
            className={`px-3 py-1 rounded-md text-xs font-mono font-bold transition flex items-center gap-1.5 ${
              activeTab === "info"
                ? "bg-[#18181c] text-orange-400 border border-zinc-700/80 shadow-sm"
                : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Environment Spec</span>
          </button>
        </div>

        {/* Terminal Quick Actions */}
        <div className="flex items-center gap-1.5">
          {activeTab === "console" && (
            <>
              <button
                onClick={handleCopyOutput}
                title="Copy terminal output"
                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={onClearOutput}
                title="Clear console"
                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Terminal Content Area */}
      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-zinc-300 space-y-3">
        {activeTab === "console" && (
          <div className="space-y-4">
            {/* Environment Status Banner */}
            <div className="p-3.5 rounded-xl bg-[#141418] border border-zinc-800/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-orange-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5" /> {currentLanguage.name} Runtime Ready
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {currentLanguage.runtimeMode}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                {currentLanguage.description}
              </p>
            </div>

            {/* Output Screen */}
            <div className="p-4 rounded-xl bg-[#09090b] border border-zinc-800 font-mono text-xs space-y-2 min-h-[160px]">
              <div className="text-zinc-500 text-[11px] flex items-center justify-between border-b border-zinc-900 pb-2">
                <span>[STDOUT / STDERR STREAM]</span>
                <span className="text-emerald-400 text-[10px]">Ready for Execution Pipeline</span>
              </div>

              {outputLog ? (
                <pre className="text-orange-300 whitespace-pre-wrap leading-relaxed">
                  {outputLog}
                </pre>
              ) : (
                <div className="py-6 text-center space-y-2 text-zinc-500">
                  <Terminal className="w-8 h-8 mx-auto text-zinc-700 opacity-60" />
                  <div className="text-xs">No execution output yet.</div>
                  <div className="text-[11px] text-zinc-600 max-w-sm mx-auto">
                    Click <strong className="text-orange-400">Run</strong> or press <strong className="text-orange-400">⌘+Enter</strong> to trigger execution simulator.
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "stdin" && (
          <div className="space-y-3 h-full flex flex-col">
            <div className="text-[11px] text-zinc-400 flex items-center justify-between">
              <span>Standard Input Stream (stdin)</span>
              <span className="text-[10px] text-zinc-500">Passed to program at execution runtime</span>
            </div>
            <textarea
              id="input-playground-stdin"
              value={stdinValue}
              onChange={(e) => setStdinValue(e.target.value)}
              placeholder="Enter custom inputs for competitive programming problems or scripts here..."
              className="flex-1 w-full min-h-[180px] p-3.5 rounded-xl bg-[#09090b] border border-zinc-800 text-zinc-200 font-mono text-xs focus:outline-none focus:border-orange-500 resize-none leading-relaxed"
            />
            <div className="text-[10px] text-zinc-500 font-mono flex items-center gap-1.5">
              <span>Supports multiline inputs, integers, test cases, and JSON strings.</span>
            </div>
          </div>
        )}

        {activeTab === "info" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#141418] border border-zinc-800 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                {currentLanguage.name} Architecture
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                <div className="p-2.5 rounded-lg bg-[#0e0e12] border border-zinc-800 space-y-1">
                  <div className="text-zinc-500 text-[10px] uppercase">Language Version</div>
                  <div className="text-zinc-200 font-bold">{currentLanguage.version}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#0e0e12] border border-zinc-800 space-y-1">
                  <div className="text-zinc-500 text-[10px] uppercase">Default File</div>
                  <div className="text-zinc-200 font-bold">{currentLanguage.defaultFileName}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#0e0e12] border border-zinc-800 space-y-1">
                  <div className="text-zinc-500 text-[10px] uppercase">Execution Model</div>
                  <div className="text-zinc-200 font-bold">{currentLanguage.runtimeMode}</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#0e0e12] border border-zinc-800 space-y-1">
                  <div className="text-zinc-500 text-[10px] uppercase">Compiler Toolchain</div>
                  <div className="text-zinc-200 font-bold">{currentLanguage.compilerBadge}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 space-y-2">
                <div className="text-[10px] font-bold text-zinc-400 uppercase">Planned Execution Features:</div>
                <ul className="space-y-1 text-zinc-400">
                  {currentLanguage.plannedFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-4 py-1.5 border-t border-zinc-800/80 bg-[#0e0e12] flex items-center justify-between text-[10px] font-mono text-zinc-500 select-none">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          Terminal Shell Active
        </span>
        <span>Chintan.GPT Playground UI Foundation</span>
      </div>
    </div>
  );
};
