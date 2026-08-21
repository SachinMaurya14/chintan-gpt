import React, { useState } from "react";
import {
  Play,
  Square,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Settings2,
  ChevronDown,
  Cpu,
  Code2,
  AlignLeft,
  Columns,
  Maximize2,
  Terminal,
  Download,
  RotateCcw,
  Search,
  FolderTree,
  FileCode2,
  FolderSync
} from "lucide-react";
import { LanguageConfig, EditorSettings, PlaygroundLanguageId, RunMode } from "../types.js";
import { PLAYGROUND_LANGUAGES } from "../languages.js";

interface PlaygroundHeaderProps {
  currentLanguage: LanguageConfig;
  onLanguageSelect: (langId: PlaygroundLanguageId) => void;
  onRunCode: () => void;
  onStopExecution: () => void;
  onRestartExecution?: () => void;
  isRunning: boolean;
  runMode: RunMode;
  setRunMode: (mode: RunMode) => void;
  onFormatCode: () => void;
  onInsertBoilerplate: () => void;
  onClearCode: () => void;
  onCopyCode: () => void;
  isCopied: boolean;
  onExportProject: () => void;
  onResetProject: () => void;
  onOpenQuickOpen: () => void;
  onOpenCommandPalette: () => void;
  editorSettings: EditorSettings;
  setEditorSettings: React.Dispatch<React.SetStateAction<EditorSettings>>;
  isExplorerOpen: boolean;
  onToggleExplorer: () => void;
  isBottomPanelOpen: boolean;
  onToggleBottomPanel: () => void;
}

export const PlaygroundHeader: React.FC<PlaygroundHeaderProps> = ({
  currentLanguage,
  onLanguageSelect,
  onRunCode,
  onStopExecution,
  onRestartExecution,
  isRunning,
  runMode,
  setRunMode,
  onFormatCode,
  onInsertBoilerplate,
  onClearCode,
  onCopyCode,
  isCopied,
  onExportProject,
  onResetProject,
  onOpenQuickOpen,
  onOpenCommandPalette,
  editorSettings,
  setEditorSettings,
  isExplorerOpen,
  onToggleExplorer,
  isBottomPanelOpen,
  onToggleBottomPanel,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [runDropdownOpen, setRunDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Group languages by category
  const categories = Array.from(new Set(PLAYGROUND_LANGUAGES.map((l) => l.category)));

  return (
    <header className="px-3 md:px-4 py-2 border-b border-zinc-800 bg-[#0c0c0e] flex flex-wrap items-center justify-between gap-2.5 select-none font-mono">
      {/* Left: Explorer Toggle, Branding & Language Dropdown */}
      <div className="flex items-center gap-2">
        {/* Toggle Explorer Button */}
        <button
          id="btn-toggle-explorer"
          onClick={onToggleExplorer}
          title={isExplorerOpen ? "Hide File Explorer" : "Show File Explorer"}
          className={`p-1.5 rounded-lg border transition ${
            isExplorerOpen
              ? "bg-zinc-800/80 text-orange-400 border-zinc-700"
              : "bg-[#141418] text-zinc-400 hover:text-white border-zinc-800"
          }`}
        >
          <Columns className="w-4 h-4" />
        </button>

        {/* Brand Tag */}
        <div className="flex items-center gap-1.5">
          <h1 className="font-bold text-sm text-white font-mono tracking-tight">
            Playground
          </h1>
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
            IDE
          </span>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

        {/* Language Selector Dropdown */}
        <div className="relative">
          <button
            id="btn-playground-language-select"
            onClick={() => setLangDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1a1a20] border border-zinc-700/80 hover:border-zinc-600 text-xs font-mono text-zinc-200 transition shadow-xs"
          >
            <Code2 className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-bold truncate max-w-[120px] sm:max-w-none">{currentLanguage.name}</span>
            <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {langDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-30"
                onClick={() => setLangDropdownOpen(false)}
              />
              <div className="absolute left-0 top-full mt-1.5 w-72 rounded-xl bg-[#121215] border border-zinc-700 shadow-2xl z-40 p-2 max-h-96 overflow-y-auto space-y-2">
                <div className="px-2 py-1 text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  Select Language Environment
                </div>
                {categories.map((cat) => (
                  <div key={cat} className="space-y-1">
                    <div className="px-2 pt-1.5 pb-0.5 text-[9px] font-mono font-bold text-orange-400 uppercase tracking-wider">
                      {cat}
                    </div>
                    {PLAYGROUND_LANGUAGES.filter((l) => l.category === cat).map((lang) => {
                      const isSelected = lang.id === currentLanguage.id;
                      return (
                        <button
                          key={lang.id}
                          id={`btn-lang-${lang.id}`}
                          onClick={() => {
                            onLanguageSelect(lang.id);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition text-left ${
                            isSelected
                              ? "bg-orange-500/10 text-orange-300 border border-orange-500/30 font-bold"
                              : "text-zinc-300 hover:text-white hover:bg-zinc-800/80 border border-transparent"
                          }`}
                        >
                          <div>
                            <div className="font-semibold">{lang.name}</div>
                            <div className="text-[10px] text-zinc-500 truncate max-w-[180px]">
                              {lang.defaultFileName} • {lang.compilerBadge}
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-orange-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Quick Open File */}
        <button
          onClick={onOpenQuickOpen}
          title="Quick Open File (⌘P / Ctrl+P)"
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1a1a20] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 text-xs transition"
        >
          <Search className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-[11px]">Find File</span>
          <kbd className="text-[9px] bg-zinc-800 text-zinc-400 px-1 py-0.2 rounded border border-zinc-700">
            ⌘P
          </kbd>
        </button>
      </div>

      {/* Center/Right: Run Execution & Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Command Palette Button */}
        <button
          id="btn-playground-command-palette"
          onClick={onOpenCommandPalette}
          title="Open Command Palette (⌘⇧P / F1)"
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1a1a20] text-zinc-300 hover:text-orange-400 border border-zinc-800 hover:border-zinc-700 text-xs transition"
        >
          <Terminal className="w-3.5 h-3.5 text-orange-400" />
          <span className="hidden xl:inline text-[11px]">Palette</span>
          <kbd className="text-[9px] bg-zinc-800 text-zinc-400 px-1 py-0.2 rounded border border-zinc-700">
            ⌘⇧P
          </kbd>
        </button>

        {/* Run Controls with Run Project / Run File mode */}
        {isRunning ? (
          <button
            id="btn-playground-stop"
            onClick={onStopExecution}
            className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-md shadow-red-600/25"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Stop</span>
          </button>
        ) : (
          <div className="flex items-center">
            <button
              id="btn-playground-run"
              onClick={onRunCode}
              className="px-3.5 py-1.5 rounded-l-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-1.5 shadow-md shadow-emerald-600/25"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{runMode === "project" ? "Run Project" : "Run File"}</span>
              <kbd className="hidden md:inline-block text-[9px] bg-emerald-700/60 px-1 py-0.2 rounded text-emerald-100 font-mono">
                ⌘↵
              </kbd>
            </button>

            {/* Run Mode Switcher */}
            <div className="relative">
              <button
                onClick={() => setRunDropdownOpen(!runDropdownOpen)}
                className="px-1.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-emerald-100 rounded-r-lg border-l border-emerald-800 transition"
                title="Select execution target (Project vs Standalone File)"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {runDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setRunDropdownOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1.5 w-56 rounded-xl bg-[#121215] border border-zinc-700 shadow-2xl z-40 p-1.5 space-y-1">
                    <button
                      onClick={() => {
                        setRunMode("project");
                        setRunDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition text-left ${
                        runMode === "project"
                          ? "bg-emerald-500/10 text-emerald-300 font-semibold"
                          : "text-zinc-300 hover:bg-zinc-800"
                      }`}
                    >
                      <FolderTree className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div>Run Entire Project</div>
                        <div className="text-[10px] text-zinc-500 font-normal">
                          Executes project entry point with multi-file workspace
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        setRunMode("file");
                        setRunDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition text-left ${
                        runMode === "file"
                          ? "bg-emerald-500/10 text-emerald-300 font-semibold"
                          : "text-zinc-300 hover:bg-zinc-800"
                      }`}
                    >
                      <FileCode2 className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div>Run Active File Only</div>
                        <div className="text-[10px] text-zinc-500 font-normal">
                          Executes currently open tab standalone
                        </div>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Format Document Button */}
        <button
          id="btn-playground-format"
          onClick={onFormatCode}
          title="Format Code (⇧⌥F)"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1a1a20] text-zinc-300 hover:text-white border border-zinc-800 hover:border-zinc-700 text-xs transition"
        >
          <AlignLeft className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden sm:inline">Format</span>
        </button>

        {/* Export Project Button */}
        <button
          id="btn-playground-export"
          onClick={onExportProject}
          title="Export Workspace as JSON"
          className="p-1.5 sm:p-2 rounded-lg bg-[#141418] hover:bg-[#1a1a20] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition"
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        {/* Reset Project Button */}
        <button
          id="btn-playground-reset"
          onClick={() => setResetConfirmOpen(true)}
          title="Reset Project to Defaults"
          className="p-1.5 sm:p-2 rounded-lg bg-[#141418] hover:bg-[#1a1a20] text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-zinc-700 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        {/* Copy Code */}
        <button
          id="btn-playground-copy"
          onClick={onCopyCode}
          title={isCopied ? "Copied to clipboard!" : "Copy active file code"}
          className="p-1.5 sm:p-2 rounded-lg bg-[#141418] hover:bg-[#1a1a20] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition"
        >
          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>

        {/* Toggle Bottom Dock */}
        <button
          id="btn-toggle-bottom-panel"
          onClick={onToggleBottomPanel}
          title={isBottomPanelOpen ? "Hide Output & Terminal Dock" : "Show Output & Terminal Dock"}
          className={`p-1.5 sm:p-2 rounded-lg border transition ${
            isBottomPanelOpen
              ? "bg-zinc-800 text-orange-400 border-zinc-700"
              : "bg-[#141418] text-zinc-400 hover:text-white border-zinc-800"
          }`}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Editor Settings Popover */}
        <div className="relative">
          <button
            id="btn-playground-settings"
            onClick={() => setSettingsOpen((prev) => !prev)}
            title="Editor Settings"
            className="p-1.5 sm:p-2 rounded-lg bg-[#141418] hover:bg-[#1a1a20] text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-700 transition"
          >
            <Settings2 className="w-3.5 h-3.5" />
          </button>

          {settingsOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setSettingsOpen(false)} />
              <div className="absolute right-0 top-full mt-1.5 w-68 rounded-xl bg-[#121215] border border-zinc-700 shadow-2xl z-40 p-3.5 space-y-3 font-mono text-xs max-h-[85vh] overflow-y-auto">
                <div className="font-bold text-zinc-300 pb-1.5 border-b border-zinc-800 text-[11px] uppercase tracking-wider flex items-center justify-between">
                  <span>IDE Settings</span>
                  <span className="text-[9px] text-zinc-500">Playground</span>
                </div>

                {/* Editor Theme */}
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Editor Theme</span>
                  <select
                    value={editorSettings.theme || "vs-dark"}
                    onChange={(e) =>
                      setEditorSettings((s) => ({
                        ...s,
                        theme: e.target.value as "vs-dark" | "light" | "hc-black",
                      }))
                    }
                    className="bg-zinc-900 border border-zinc-700 rounded px-2 py-0.5 text-zinc-200 text-[11px]"
                  >
                    <option value="vs-dark">Dark (vs-dark)</option>
                    <option value="light">Light (vs-light)</option>
                    <option value="hc-black">High Contrast</option>
                  </select>
                </div>

                {/* Font Size */}
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Font Size</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setEditorSettings((s) => ({ ...s, fontSize: Math.max(11, s.fontSize - 1) }))}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 font-bold"
                    >
                      -
                    </button>
                    <span className="text-orange-400 font-bold w-6 text-center">{editorSettings.fontSize}px</span>
                    <button
                      onClick={() => setEditorSettings((s) => ({ ...s, fontSize: Math.min(22, s.fontSize + 1) }))}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 hover:bg-zinc-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Tab Size */}
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Tab Size</span>
                  <select
                    value={editorSettings.tabSize}
                    onChange={(e) => setEditorSettings((s) => ({ ...s, tabSize: Number(e.target.value) }))}
                    className="bg-zinc-900 border border-zinc-700 rounded px-2 py-0.5 text-zinc-200 text-[11px]"
                  >
                    <option value={2}>2 Spaces</option>
                    <option value={4}>4 Spaces</option>
                    <option value={8}>8 Spaces</option>
                  </select>
                </div>

                {/* Indent With Spaces / Tabs */}
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Indentation</span>
                  <button
                    onClick={() =>
                      setEditorSettings((s) => ({ ...s, insertSpaces: !s.insertSpaces }))
                    }
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      editorSettings.insertSpaces
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {editorSettings.insertSpaces ? "Spaces" : "Tabs"}
                  </button>
                </div>

                {/* Word Wrap */}
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Word Wrap</span>
                  <button
                    onClick={() =>
                      setEditorSettings((s) => ({ ...s, wordWrap: s.wordWrap === "on" ? "off" : "on" }))
                    }
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      editorSettings.wordWrap === "on"
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {editorSettings.wordWrap === "on" ? "ON" : "OFF"}
                  </button>
                </div>

                {/* Minimap */}
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Minimap</span>
                  <button
                    onClick={() => setEditorSettings((s) => ({ ...s, minimap: !s.minimap }))}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      editorSettings.minimap
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {editorSettings.minimap ? "ON" : "OFF"}
                  </button>
                </div>

                {/* Line Numbers */}
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Line Numbers</span>
                  <button
                    onClick={() => setEditorSettings((s) => ({ ...s, lineNumbers: !s.lineNumbers }))}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      editorSettings.lineNumbers
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {editorSettings.lineNumbers ? "ON" : "OFF"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs select-none">
          <div className="w-full max-w-sm rounded-xl bg-[#141418] border border-zinc-700 shadow-2xl p-4 space-y-3 font-mono">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
              <RotateCcw className="w-4 h-4" />
              <span>Reset Project Workspace?</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              This will restore all default files and folders for{" "}
              <strong className="text-white">{currentLanguage.name}</strong>. Any unsaved edits will be discarded.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white bg-zinc-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetProject();
                  setResetConfirmOpen(false);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-500 text-white transition"
              >
                Reset Project
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
