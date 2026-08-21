import React, { Suspense, lazy, useRef, useEffect, useState, useCallback } from "react";
import {
  FileCode,
  Plus,
  X,
  Loader2,
  Sparkles,
  AlertCircle,
  AlertTriangle,
  Check,
  Search,
  Layers,
  ShieldAlert,
  FileQuestion,
  Command
} from "lucide-react";
import {
  LanguageConfig,
  EditorSettings,
  WorkspaceFile,
  DiagnosticProblem,
  CursorPosition,
  ContextMenuState,
  DebugBreakpoint
} from "../types.js";
import { registerPlaygroundCompletions } from "../services/autocompleteService.js";
import { WorkspaceService } from "../services/workspaceService.js";
import { PlaygroundBreadcrumbs } from "./PlaygroundBreadcrumbs.js";
import { PlaygroundContextMenu } from "./PlaygroundContextMenu.js";

// Lazy load Monaco Editor from @monaco-editor/react
const MonacoEditor = lazy(() =>
  import("@monaco-editor/react").then((mod) => ({ default: mod.default || mod.Editor }))
);

const MAX_FILE_SIZE_CHARS = 2 * 1024 * 1024; // 2MB protection limit

interface PlaygroundEditorProps {
  currentLanguage: LanguageConfig;
  files: WorkspaceFile[];
  openTabFileIds: string[];
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  onNewFile: () => void;
  onCloseTab: (fileId: string) => void;
  onCloseOtherTabs: (fileId: string) => void;
  onCloseAllTabs: () => void;
  onCloseTabsToRight: (fileId: string) => void;
  onRenameFile: (oldPath: string, newPath: string) => void;
  activeFile?: WorkspaceFile;
  onChangeCode: (value: string) => void;
  onInsertBoilerplate: () => void;
  settings: EditorSettings;
  setEditorSettings: React.Dispatch<React.SetStateAction<EditorSettings>>;
  problems: DiagnosticProblem[];
  cursorTarget?: { line: number; column: number; timestamp: number } | null;
  editorRefCallback?: (editor: any) => void;
  onNextProblem?: () => void;
  onPrevProblem?: () => void;
  onOpenGoToLine?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenQuickOpen?: () => void;
  breakpoints?: DebugBreakpoint[];
  onToggleBreakpoint?: (fileId: string, lineNumber: number) => void;
}

export const PlaygroundEditor: React.FC<PlaygroundEditorProps> = ({
  currentLanguage,
  files,
  openTabFileIds,
  activeFileId,
  onSelectFile,
  onNewFile,
  onCloseTab,
  onCloseOtherTabs,
  onCloseAllTabs,
  onCloseTabsToRight,
  onRenameFile,
  activeFile,
  onChangeCode,
  onInsertBoilerplate,
  settings,
  setEditorSettings,
  problems,
  cursorTarget,
  editorRefCallback,
  onNextProblem,
  onPrevProblem,
  onOpenGoToLine,
  onOpenCommandPalette,
  onOpenQuickOpen,
  breakpoints = [],
  onToggleBreakpoint,
}) => {
  const monacoEditorRef = useRef<any>(null);
  const monacoInstanceRef = useRef<any>(null);
  const decorationsRef = useRef<string[]>([]);
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ lineNumber: 1, column: 1 });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Tab Context Menu state
  const [tabContextMenu, setTabContextMenu] = useState<ContextMenuState>({
    isOpen: false,
    x: 0,
    y: 0,
    itemType: "tab",
  });

  // Track viewport size for mobile-responsive minimap suppression
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle mounting of the Monaco Editor instance
  const handleEditorMount = (editor: any, monaco: any) => {
    monacoEditorRef.current = editor;
    monacoInstanceRef.current = monaco;

    // Register language intelligence completions
    registerPlaygroundCompletions(monaco);

    if (editorRefCallback) {
      editorRefCallback(editor);
    }

    // Real-time cursor position tracking
    editor.onDidChangeCursorPosition((e: any) => {
      setCursorPos({
        lineNumber: e.position.lineNumber,
        column: e.position.column,
      });
    });

    // Breakpoint gutter toggle via mouse down on gutter / glyph margin
    editor.onMouseDown((e: any) => {
      if (
        onToggleBreakpoint &&
        activeFile &&
        (e.target.type === 2 || e.target.type === 3 || e.target.type === 4) && // GlyphMargin, LineNumbers, LineDecorations
        e.target.position?.lineNumber
      ) {
        onToggleBreakpoint(activeFile.id, e.target.position.lineNumber);
      }
    });

    // Register IDE Keyboard Shortcuts in Monaco
    editor.addCommand(monaco.KeyCode.F8, () => {
      if (onNextProblem) onNextProblem();
    });
    editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.F8, () => {
      if (onPrevProblem) onPrevProblem();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG, () => {
      if (onOpenGoToLine) onOpenGoToLine();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyP, () => {
      if (onOpenCommandPalette) onOpenCommandPalette();
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => {
      if (onOpenQuickOpen) onOpenQuickOpen();
    });
    editor.addCommand(monaco.KeyCode.F1, () => {
      if (onOpenCommandPalette) onOpenCommandPalette();
    });

    // Scoped zoom controls: Cmd + Plus / Minus / 0
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Equal, () => {
      setEditorSettings((s) => ({ ...s, fontSize: Math.min(22, s.fontSize + 1) }));
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Minus, () => {
      setEditorSettings((s) => ({ ...s, fontSize: Math.max(11, s.fontSize - 1) }));
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Digit0, () => {
      setEditorSettings((s) => ({ ...s, fontSize: 14 }));
    });
  };

  // Jump to specific line/column if requested by diagnostic or symbol click
  useEffect(() => {
    if (cursorTarget && monacoEditorRef.current) {
      const editor = monacoEditorRef.current;
      editor.focus();
      editor.setPosition({
        lineNumber: cursorTarget.line,
        column: cursorTarget.column || 1,
      });
      editor.revealPositionInCenter({
        lineNumber: cursorTarget.line,
        column: cursorTarget.column || 1,
      });
    }
  }, [cursorTarget]);

  // Synchronize error markers with Monaco when problems change
  useEffect(() => {
    if (monacoEditorRef.current && monacoInstanceRef.current && activeFile) {
      const monaco = monacoInstanceRef.current;
      const model = monacoEditorRef.current.getModel();
      if (model) {
        const fileProblems = problems.filter(
          (p) => !p.file || p.file === activeFile.name || p.file === activeFile.path
        );
        const markers = fileProblems.map((p) => ({
          startLineNumber: Math.max(1, p.line),
          startColumn: Math.max(1, p.column || 1),
          endLineNumber: Math.max(1, p.endLine || p.line),
          endColumn: Math.max(p.column ? p.column + 4 : 5, p.endColumn || (p.column || 1) + 5),
          message: p.message,
          severity:
            p.severity === "error"
              ? monaco.MarkerSeverity.Error
              : p.severity === "warning"
              ? monaco.MarkerSeverity.Warning
              : monaco.MarkerSeverity.Info,
          source: p.source || "compiler",
        }));
        monaco.editor.setModelMarkers(model, "diagnostics", markers);
      }
    }
  }, [problems, activeFile?.name, activeFile?.path]);

  // Synchronize breakpoint gutter decorations
  useEffect(() => {
    if (monacoEditorRef.current && monacoInstanceRef.current && activeFile) {
      const monaco = monacoInstanceRef.current;
      const editor = monacoEditorRef.current;
      const fileBreakpoints = breakpoints.filter(
        (b) => b.fileId === activeFile.id || b.fileName === activeFile.name
      );

      const newDecorations = fileBreakpoints.map((bp) => ({
        range: new monaco.Range(bp.lineNumber, 1, bp.lineNumber, 1),
        options: {
          isWholeLine: false,
          glyphMarginClassName: bp.enabled ? "bg-red-500 rounded-full w-3 h-3 m-1" : "bg-zinc-600 rounded-full w-3 h-3 m-1",
          glyphMarginHoverMessage: { value: `Breakpoint at line ${bp.lineNumber}` },
        },
      }));

      decorationsRef.current = editor.deltaDecorations(decorationsRef.current, newDecorations);
    }
  }, [breakpoints, activeFile?.id, activeFile?.name]);

  // Handle right-click on tab
  const handleTabContextMenu = (e: React.MouseEvent, file: WorkspaceFile) => {
    e.preventDefault();
    e.stopPropagation();
    setTabContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      itemType: "tab",
      fileId: file.id,
      itemName: file.name,
      itemPath: file.path || file.name,
    });
  };

  // Open tabs list
  const openTabs = files.filter((f) => openTabFileIds.includes(f.id));

  const isBlank = activeFile ? activeFile.content.trim().length === 0 : false;
  const isOversized = activeFile ? activeFile.content.length > MAX_FILE_SIZE_CHARS : false;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#09090b] overflow-hidden relative select-none">
      {/* Multi-File Tab Bar */}
      <div
        id="playground-tab-bar"
        className="px-2 border-b border-zinc-800 bg-[#0c0c0e] flex items-center justify-between overflow-x-auto gap-2"
      >
        <div className="flex items-center gap-1 py-1">
          {openTabs.map((file) => {
            const isActive = file.id === activeFileId;
            const visualInfo = WorkspaceService.getFileVisualInfo(file.name);
            const fileProblems = problems.filter(
              (p) => !p.file || p.file === file.name || p.file === file.path
            );
            const hasErrors = fileProblems.some((p) => p.severity === "error");
            const hasWarnings = !hasErrors && fileProblems.some((p) => p.severity === "warning");

            return (
              <div
                key={file.id}
                onClick={() => onSelectFile(file.id)}
                onContextMenu={(e) => handleTabContextMenu(e, file)}
                onMouseDown={(e) => {
                  // Middle-click to close tab
                  if (e.button === 1) {
                    e.preventDefault();
                    onCloseTab(file.id);
                  }
                }}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-t-md text-xs font-mono transition border-t-2 cursor-pointer ${
                  isActive
                    ? "bg-[#09090b] text-white font-semibold border-t-orange-500 border-x border-zinc-800"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-[#141418] border-t-transparent"
                }`}
              >
                <FileCode className={`w-3.5 h-3.5 shrink-0 ${visualInfo.colorClass}`} />

                <span className="truncate max-w-[130px]" title={file.path || file.name}>
                  {file.name}
                </span>

                {/* Modified Indicator */}
                {file.isModified && (
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" title="Modified" />
                )}

                {/* Error & Warning Badges on Tab */}
                {hasErrors && (
                  <span title="File has compiler errors" className="inline-flex items-center">
                    <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
                  </span>
                )}
                {hasWarnings && (
                  <span title="File has compiler warnings" className="inline-flex items-center">
                    <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                  </span>
                )}

                {/* Tab Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(file.id);
                  }}
                  title="Close tab (Middle click)"
                  className="opacity-0 group-hover:opacity-100 p-0.5 text-zinc-500 hover:text-red-400 transition rounded ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}

          {/* New Tab Button */}
          <button
            onClick={onNewFile}
            title="Create New File Tab"
            className="flex items-center gap-1 px-2 py-1.5 rounded text-zinc-500 hover:text-zinc-200 hover:bg-[#141418] transition text-xs font-mono ml-0.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">New File</span>
          </button>
        </div>

        {/* Right Stats & Quick Open button */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 pr-2 shrink-0">
          {onOpenQuickOpen && (
            <button
              onClick={onOpenQuickOpen}
              title="Quick Open File (Cmd+P)"
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#141418] hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 text-[10px] transition"
            >
              <Search className="w-3 h-3 text-orange-400" />
              <span>Go to File (⌘P)</span>
            </button>
          )}

          {activeFile && (
            <span className="hidden md:inline text-zinc-400">
              {isBlank ? "0 Lines" : `${activeFile.content.split("\n").length} Lines`}
            </span>
          )}
        </div>
      </div>

      {/* Breadcrumbs Navigation Bar */}
      {activeFile && (
        <PlaygroundBreadcrumbs
          activeFile={activeFile}
          onNavigateFolder={() => {}}
        />
      )}

      {/* Oversized File Protection Warning */}
      {isOversized && (
        <div className="p-3 bg-red-950/80 border-b border-red-800 text-red-200 text-xs font-mono flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <span>
            File is too large for the Playground editor (&gt;2MB). Performance may degrade.
          </span>
        </div>
      )}

      {/* Editor Canvas Area or Empty State */}
      {activeFile ? (
        <div className="flex-1 relative w-full h-full overflow-hidden bg-[#09090b]">
          <Suspense
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 font-mono gap-2 bg-[#09090b]">
                <Loader2 className="w-5 h-5 text-orange-500 animate-spin" />
                <span className="text-xs">Initializing Monaco Editor Workspace...</span>
              </div>
            }
          >
            <MonacoEditor
              height="100%"
              language={activeFile.language || currentLanguage.monacoLang}
              value={activeFile.content}
              onChange={(val) => onChangeCode(val ?? "")}
              onMount={handleEditorMount}
              theme={settings.theme || "vs-dark"}
              options={{
                fontSize: settings.fontSize,
                minimap: { enabled: !isMobile && settings.minimap },
                lineNumbers: settings.lineNumbers ? "on" : "off",
                tabSize: settings.tabSize,
                insertSpaces: settings.insertSpaces,
                wordWrap: settings.wordWrap,
                autoClosingBrackets: settings.autoClosingBrackets,
                autoClosingQuotes: settings.autoClosingBrackets,
                autoClosingOvertype: "always",
                cursorBlinking: settings.cursorBlinking,
                cursorSmoothCaretAnimation: "on",
                bracketPairColorization: { enabled: true },
                matchBrackets: "always",
                folding: true,
                foldingHighlight: true,
                foldingStrategy: "auto",
                showFoldingControls: "always",
                renderLineHighlight: "all",
                smoothScrolling: true,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                selectOnLineNumbers: true,
                glyphMargin: true,
                multiCursorModifier: "alt",
                autoIndent: "full",
                fontFamily: "JetBrains Mono, 'Fira Code', Menlo, Monaco, Consolas, monospace",
                fontLigatures: true,
                padding: { top: 12, bottom: 12 },
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
                suggest: {
                  showWords: true,
                  showSnippets: true,
                  showClasses: true,
                  showFunctions: true,
                  showMethods: true,
                  showVariables: true,
                  snippetsPreventQuickSuggestions: false,
                },
                quickSuggestions: {
                  other: true,
                  comments: false,
                  strings: true,
                },
                find: {
                  addExtraSpaceOnTop: true,
                  autoFindInSelection: "always",
                  seedSearchStringFromSelection: "always",
                },
              }}
            />
          </Suspense>

          {/* Quick Starter Template if file is blank */}
          {isBlank && (
            <div className="absolute bottom-4 right-4 pointer-events-auto z-10">
              <button
                onClick={onInsertBoilerplate}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141418]/90 hover:bg-[#1e1e24] border border-zinc-700/80 hover:border-orange-500/50 text-xs font-mono text-zinc-300 hover:text-orange-300 backdrop-blur-md transition shadow-lg"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>Insert {currentLanguage.shortName} Starter Template</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Empty State when no files are open */
        <div className="flex-1 flex flex-col items-center justify-center bg-[#09090b] text-zinc-500 font-mono gap-3 p-6 select-none">
          <FileQuestion className="w-12 h-12 text-zinc-700 stroke-1" />
          <h3 className="text-zinc-300 font-bold text-sm">No Files Open</h3>
          <p className="text-xs text-zinc-500 text-center max-w-sm">
            Select a file from the explorer on the left, or use Quick Open to search by filename.
          </p>
          <div className="flex items-center gap-2 mt-2">
            {onOpenQuickOpen && (
              <button
                onClick={onOpenQuickOpen}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold transition shadow-md"
              >
                <Command className="w-3.5 h-3.5" />
                <span>Quick Open (⌘P)</span>
              </button>
            )}
            <button
              onClick={onNewFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create File</span>
            </button>
          </div>
        </div>
      )}

      {/* Editor Status Bar */}
      {activeFile && (
        <div className="px-4 py-1.5 border-t border-zinc-800/80 bg-[#0c0c0e] flex items-center justify-between text-[10px] font-mono text-zinc-500 select-none">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Ready
            </span>
            <span className="text-zinc-600">|</span>
            <button
              onClick={onOpenGoToLine}
              title="Jump to line (Cmd+G)"
              className="text-zinc-400 hover:text-white transition"
            >
              Ln {cursorPos.lineNumber}, Col {cursorPos.column}
            </button>
            <span className="hidden md:inline text-zinc-600">|</span>
            <span className="hidden md:inline">UTF-8</span>
          </div>

          <div className="flex items-center gap-3">
            <span>{activeFile.content.length} chars</span>
            <span className="text-zinc-600">|</span>
            <span>{settings.insertSpaces ? "Spaces" : "Tabs"}: {settings.tabSize}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-orange-400 font-semibold">{currentLanguage.shortName}</span>
          </div>
        </div>
      )}

      {/* Tab Context Menu */}
      <PlaygroundContextMenu
        state={tabContextMenu}
        onClose={() => setTabContextMenu((prev) => ({ ...prev, isOpen: false }))}
        onNewFile={() => onNewFile()}
        onNewFolder={() => {}}
        onRename={() => {}}
        onDelete={() => {}}
        onDuplicate={() => {}}
        onCopyPath={(p) => navigator.clipboard.writeText(p)}
        onCloseTab={(fileId) => onCloseTab(fileId)}
        onCloseOtherTabs={(fileId) => onCloseOtherTabs(fileId)}
        onCloseAllTabs={() => onCloseAllTabs()}
        onCloseTabsToRight={(fileId) => onCloseTabsToRight(fileId)}
      />
    </div>
  );
};
