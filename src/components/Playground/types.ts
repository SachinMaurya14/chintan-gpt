export type PlaygroundLanguageId =
  | "cpp"
  | "python"
  | "java"
  | "kotlin"
  | "html"
  | "css"
  | "javascript"
  | "react"
  | "nodejs"
  | "nextjs";

export type LanguageCategory =
  | "Systems & Native"
  | "Backend & General"
  | "Web & Frontend"
  | "Mobile & Modern"
  | "Frameworks & Fullstack";

export interface LanguageConfig {
  id: PlaygroundLanguageId;
  name: string;
  shortName: string;
  category: LanguageCategory;
  monacoLang: string;
  version: string;
  fileExtension: string;
  defaultFileName: string;
  defaultCode: string;
  runtimeMode: "client-preview" | "compiled-native" | "interpreted" | "node-vm" | "ssr-ready";
  compilerBadge: string;
  description: string;
  plannedFeatures: string[];
}

export interface WorkspaceFile {
  id: string;
  name: string; // e.g. "main.cpp"
  path: string; // e.g. "src/main.cpp" or "README.md"
  extension: string; // e.g. ".cpp"
  content: string;
  language: string;
  isEntry?: boolean;
  isModified?: boolean;
}

export interface WorkspaceFolderNode {
  id: string;
  name: string;
  path: string; // e.g. "src" or "src/components"
  type: "folder";
  children: (WorkspaceFolderNode | WorkspaceFileNode)[];
  isOpen: boolean;
}

export interface WorkspaceFileNode {
  id: string;
  name: string;
  path: string;
  type: "file";
  file: WorkspaceFile;
}

export type WorkspaceTreeNode = WorkspaceFolderNode | WorkspaceFileNode;

export interface SearchMatch {
  fileId: string;
  fileName: string;
  filePath: string;
  line: number;
  column: number;
  matchLength: number;
  lineContent: string;
  matchText: string;
}

export interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
  itemType: "file" | "folder" | "tab" | "root";
  fileId?: string;
  itemPath?: string;
  itemName?: string;
}

export type LayoutOrientation = "horizontal-split" | "vertical-split" | "editor-max" | "panel-max";

export type BottomPanelTab =
  | "output"
  | "errors"
  | "input"
  | "tests"
  | "problems"
  | "debug"
  | "preview"
  | "console";

export type TerminalTab = "console" | "stdin" | "stats" | "info";

export interface TestCase {
  id: string;
  name: string;
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  stderr?: string;
  status: "idle" | "running" | "passed" | "failed" | "error" | "timeout";
  executionTimeMs?: number;
  errorDetails?: string;
  errorMessage?: string;
  exitCode?: number | null;
}

export interface DebugBreakpoint {
  fileId: string;
  fileName: string;
  lineNumber: number;
  enabled: boolean;
  condition?: string;
}

export interface DebugVariable {
  name: string;
  value: string;
  type: string;
  scope?: "local" | "closure" | "global";
}

export interface DebugCallStackFrame {
  id: string;
  functionName: string;
  fileName: string;
  filePath?: string;
  lineNumber: number;
  column?: number;
  columnNumber?: number;
}

export interface DebugSessionState {
  isActive: boolean;
  isPaused: boolean;
  currentLine?: number;
  currentFileId?: string;
  variables: DebugVariable[];
  callStack: DebugCallStackFrame[];
  supported: boolean;
  reason?: string;
}

export interface DiagnosticProblem {
  id: string;
  severity: "error" | "warning" | "info";
  message: string;
  file: string;
  line: number;
  column: number;
  endLine?: number;
  endColumn?: number;
  errorCode?: string;
  source: string;
}

export type ExecutionStatus =
  | "idle"
  | "running"
  | "success"
  | "compile_error"
  | "runtime_error"
  | "timeout"
  | "memory_limit"
  | "runtime_unavailable"
  | "error"
  | "unsupported";

export type RunMode = "project" | "file";
export type BuildMode = "build" | "run" | "test" | "debug";

export interface ExecutionRequest {
  languageId: PlaygroundLanguageId;
  files: WorkspaceFile[];
  activeFile: WorkspaceFile;
  stdin: string;
  timeoutMs?: number;
  runMode?: RunMode;
}

export interface ExecutionResponse {
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  exitCode?: number | null;
  executionTimeMs?: number;
  memoryUsedKb?: number;
  diagnostics?: DiagnosticProblem[];
  systemMessage?: string;
  isClientPreview?: boolean;
  previewHtml?: string;
  metadata?: {
    language: string;
    runtime?: string;
    version?: string;
    timestamp?: string;
  };
}

export interface EditorSettings {
  fontSize: number;
  minimap: boolean;
  lineNumbers: boolean;
  wordWrap: "on" | "off";
  tabSize: number;
  insertSpaces: boolean;
  autoClosingBrackets: "always" | "never";
  cursorBlinking: "smooth" | "blink" | "solid";
  formatOnSave: boolean;
  theme: "vs-dark" | "light" | "hc-black";
}

export interface CursorPosition {
  lineNumber: number;
  column: number;
}
