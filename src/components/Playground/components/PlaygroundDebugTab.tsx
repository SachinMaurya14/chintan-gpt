import React, { useState } from "react";
import {
  Play,
  Square,
  RotateCw,
  ArrowRight,
  CornerDownRight,
  CornerUpLeft,
  Bug,
  ListFilter,
  Layers,
  CircleDot,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Info,
  ShieldCheck,
  Plus
} from "lucide-react";
import {
  LanguageConfig,
  DebugBreakpoint,
  DebugVariable,
  DebugCallStackFrame,
  DebugSessionState,
  WorkspaceFile
} from "../types.js";

interface PlaygroundDebugTabProps {
  currentLanguage: LanguageConfig;
  files: WorkspaceFile[];
  breakpoints: DebugBreakpoint[];
  onToggleBreakpoint: (fileId: string, lineNumber: number) => void;
  onRemoveBreakpoint: (fileId: string, lineNumber: number) => void;
  onClearAllBreakpoints: () => void;
  debugState: DebugSessionState;
  onStartDebug: () => void;
  onStopDebug: () => void;
  onContinueDebug: () => void;
  onStepOver: () => void;
  onStepInto: () => void;
  onStepOut: () => void;
}

export const PlaygroundDebugTab: React.FC<PlaygroundDebugTabProps> = ({
  currentLanguage,
  files,
  breakpoints,
  onToggleBreakpoint,
  onRemoveBreakpoint,
  onClearAllBreakpoints,
  debugState,
  onStartDebug,
  onStopDebug,
  onContinueDebug,
  onStepOver,
  onStepInto,
  onStepOut,
}) => {
  const isClientOrNode =
    currentLanguage.id === "javascript" ||
    currentLanguage.id === "nodejs" ||
    currentLanguage.id === "react" ||
    currentLanguage.id === "html";

  return (
    <div className="h-full flex flex-col md:flex-row gap-3 overflow-hidden font-mono select-none">
      {/* Left Column: Debug Toolbar & Breakpoint Manager */}
      <div className="w-full md:w-80 flex flex-col border border-zinc-800 rounded-lg bg-[#0e0e12] overflow-hidden shrink-0">
        {/* Debug Action Bar */}
        <div className="p-2.5 border-b border-zinc-800 bg-[#121216] flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Bug className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">Debugger</span>
          </div>

          <div className="flex items-center gap-1">
            {!debugState.isActive ? (
              <button
                onClick={onStartDebug}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition shadow-xs"
                title="Start Debug Session"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Start</span>
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={onContinueDebug}
                  className="p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white transition"
                  title="Continue (F5)"
                >
                  <Play className="w-3 h-3 fill-current" />
                </button>
                <button
                  onClick={onStepOver}
                  className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
                  title="Step Over (F10)"
                >
                  <ArrowRight className="w-3 h-3" />
                </button>
                <button
                  onClick={onStepInto}
                  className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
                  title="Step Into (F11)"
                >
                  <CornerDownRight className="w-3 h-3" />
                </button>
                <button
                  onClick={onStepOut}
                  className="p-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
                  title="Step Out (Shift+F11)"
                >
                  <CornerUpLeft className="w-3 h-3" />
                </button>
                <button
                  onClick={onStopDebug}
                  className="p-1 rounded bg-red-600 hover:bg-red-500 text-white transition"
                  title="Stop Debugger (Shift+F5)"
                >
                  <Square className="w-3 h-3 fill-current" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Breakpoints Header & List */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="p-2 border-b border-zinc-800/80 bg-[#101014] flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1">
              <CircleDot className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              Breakpoints ({breakpoints.length})
            </span>
            {breakpoints.length > 0 && (
              <button
                onClick={onClearAllBreakpoints}
                className="text-[10px] text-zinc-500 hover:text-red-400 transition"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {breakpoints.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center p-4 text-center text-zinc-500 text-xs">
                <CircleDot className="w-6 h-6 mb-1.5 text-zinc-700" />
                <p>No breakpoints set.</p>
                <p className="text-[10px] text-zinc-600 mt-1">
                  Click the left editor margin or use the editor line menu to set breakpoints.
                </p>
              </div>
            ) : (
              breakpoints.map((bp) => (
                <div
                  key={`${bp.fileId}-${bp.lineNumber}`}
                  className="flex items-center justify-between p-1.5 rounded bg-zinc-900/60 border border-zinc-800 text-xs"
                >
                  <div className="flex items-center gap-2 truncate">
                    <input
                      type="checkbox"
                      checked={bp.enabled}
                      onChange={() => onToggleBreakpoint(bp.fileId, bp.lineNumber)}
                      className="accent-red-500"
                    />
                    <span className="text-zinc-300 truncate">{bp.fileName}</span>
                    <span className="text-[10px] font-bold text-orange-400 bg-zinc-800 px-1.5 py-0.2 rounded">
                      Line {bp.lineNumber}
                    </span>
                  </div>

                  <button
                    onClick={() => onRemoveBreakpoint(bp.fileId, bp.lineNumber)}
                    className="text-zinc-500 hover:text-red-400 p-0.5"
                    title="Remove Breakpoint"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Runtime Capability Banner */}
        <div className="p-2 border-t border-zinc-800 bg-[#121216] text-[10px]">
          {isClientOrNode ? (
            <div className="text-emerald-400 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3 h-3" />
              Interactive VM Stepping Supported
            </div>
          ) : (
            <div className="text-zinc-400 flex items-start gap-1">
              <Info className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
              <span>
                Compiled runtime ({currentLanguage.name}): Trace diagnostics enabled. GDB server
                requires dedicated host agent.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Variables & Call Stack */}
      <div className="flex-1 flex flex-col border border-zinc-800 rounded-lg bg-[#0e0e12] overflow-hidden">
        {/* Variables Inspector */}
        <div className="flex-1 flex flex-col border-b border-zinc-800 overflow-hidden">
          <div className="p-2 border-b border-zinc-800/80 bg-[#121216] flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <ListFilter className="w-3.5 h-3.5 text-blue-400" />
              Variables / Watch
            </span>
            <span className="text-[10px] text-zinc-500">
              {debugState.variables.length} active symbols
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {debugState.variables.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-xs text-center p-4">
                <p>No variables in current scope.</p>
                <p className="text-[10px] text-zinc-600 mt-0.5">
                  Start debugging and pause execution at a breakpoint to inspect symbol scopes.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-800/60">
                {debugState.variables.map((v, i) => (
                  <div key={i} className="py-1.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-orange-300">{v.name}</span>
                      <span className="text-[10px] text-zinc-500">({v.type})</span>
                    </div>
                    <span className="text-emerald-400 font-mono bg-[#141418] px-2 py-0.5 rounded border border-zinc-800">
                      {v.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Call Stack Panel */}
        <div className="h-40 flex flex-col bg-[#0e0e12] overflow-hidden">
          <div className="p-2 border-b border-zinc-800/80 bg-[#121216] flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Call Stack
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {debugState.callStack.length === 0 ? (
              <div className="h-full flex items-center justify-center text-zinc-500 text-xs">
                Debugger is not active.
              </div>
            ) : (
              <div className="space-y-1">
                {debugState.callStack.map((frame, i) => (
                  <div
                    key={frame.id || i}
                    className="p-1.5 rounded bg-zinc-900/80 border border-zinc-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-orange-400 font-bold">{frame.functionName}</span>
                      <span className="text-zinc-500 text-[10px]">
                        {frame.fileName}:{frame.lineNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
