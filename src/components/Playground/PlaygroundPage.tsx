import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  PlaygroundLanguageId,
  EditorSettings,
  WorkspaceFile,
  DiagnosticProblem,
  BottomPanelTab,
  ExecutionStatus,
  ExecutionResponse,
  RunMode,
  TestCase,
  DebugBreakpoint,
  DebugSessionState,
  DebugVariable,
  DebugCallStackFrame
} from "./types.js";
import { PLAYGROUND_LANGUAGES, getLanguageConfig } from "./languages.js";
import { createDefaultWorkspaces } from "./defaultWorkspaces.js";
import { PlaygroundHeader } from "./components/PlaygroundHeader.js";
import { PlaygroundFileExplorer } from "./components/PlaygroundFileExplorer.js";
import { PlaygroundEditor } from "./components/PlaygroundEditor.js";
import { PlaygroundBottomPanel } from "./components/PlaygroundBottomPanel.js";
import { PlaygroundModal } from "./components/PlaygroundModal.js";
import { PlaygroundCommandPalette } from "./components/PlaygroundCommandPalette.js";
import { PlaygroundGoToLineModal } from "./components/PlaygroundGoToLineModal.js";
import { PlaygroundQuickOpenModal } from "./components/PlaygroundQuickOpenModal.js";
import { playgroundExecutionService } from "./services/executionService.js";
import { PlaygroundFormatterService } from "./services/formatterService.js";
import { WorkspaceService } from "./services/workspaceService.js";

const createInitialTestCases = (): Record<PlaygroundLanguageId, TestCase[]> => {
  const initial: Partial<Record<PlaygroundLanguageId, TestCase[]>> = {};
  PLAYGROUND_LANGUAGES.forEach((lang) => {
    initial[lang.id] = [
      {
        id: `test-${lang.id}-1`,
        name: "Test Case 1 (Standard)",
        input: "5\n1 2 3 4 5",
        expectedOutput: "",
        actualOutput: "",
        status: "idle",
      },
      {
        id: `test-${lang.id}-2`,
        name: "Test Case 2 (Edge Case)",
        input: "0\n",
        expectedOutput: "",
        actualOutput: "",
        status: "idle",
      },
    ];
  });
  return initial as Record<PlaygroundLanguageId, TestCase[]>;
};

export const PlaygroundPage: React.FC = () => {
  // Current active language
  const [currentLangId, setCurrentLangId] = useState<PlaygroundLanguageId>("cpp");

  // Multi-file workspaces per language
  const [workspaces, setWorkspaces] = useState<Record<PlaygroundLanguageId, WorkspaceFile[]>>(
    createDefaultWorkspaces
  );

  // Test cases per language
  const [testCasesByLang, setTestCasesByLang] = useState<Record<PlaygroundLanguageId, TestCase[]>>(
    createInitialTestCases
  );
  const [selectedTestId, setSelectedTestId] = useState<string | null>(null);
  const [isRunningTests, setIsRunningTests] = useState<boolean>(false);

  // Breakpoints & Debugger State
  const [breakpoints, setBreakpoints] = useState<DebugBreakpoint[]>([]);
  const [debugState, setDebugState] = useState<DebugSessionState>({
    isActive: false,
    isPaused: false,
    variables: [],
    callStack: [],
    supported: true,
  });

  // Active file ID per language
  const [activeFileIds, setActiveFileIds] = useState<Record<PlaygroundLanguageId, string>>(() => {
    const defaults = createDefaultWorkspaces();
    const ids: Partial<Record<PlaygroundLanguageId, string>> = {};
    PLAYGROUND_LANGUAGES.forEach((lang) => {
      const files = defaults[lang.id] || [];
      const entry = files.find((f) => f.isEntry) || files[0];
      ids[lang.id] = entry ? entry.id : "";
    });
    return ids as Record<PlaygroundLanguageId, string>;
  });

  // Open tabs list per language
  const [openTabsByLang, setOpenTabsByLang] = useState<Record<PlaygroundLanguageId, string[]>>(() => {
    const defaults = createDefaultWorkspaces();
    const tabs: Partial<Record<PlaygroundLanguageId, string[]>> = {};
    PLAYGROUND_LANGUAGES.forEach((lang) => {
      const files = defaults[lang.id] || [];
      tabs[lang.id] = files.map((f) => f.id);
    });
    return tabs as Record<PlaygroundLanguageId, string[]>;
  });

  // Execution target mode: Run Project vs Run Current File
  const [runMode, setRunMode] = useState<RunMode>("project");

  // UI Panels Layout
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(true);
  const [isBottomPanelOpen, setIsBottomPanelOpen] = useState<boolean>(true);
  const [activeBottomTab, setActiveBottomTab] = useState<BottomPanelTab>("output");
  const [panelHeight, setPanelHeight] = useState<number>(250);

  // Modals & Palettes
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isGoToLineOpen, setIsGoToLineOpen] = useState<boolean>(false);
  const [isQuickOpenOpen, setIsQuickOpenOpen] = useState<boolean>(false);

  // Editor Configuration
  const [editorSettings, setEditorSettings] = useState<EditorSettings>({
    fontSize: 14,
    minimap: true,
    lineNumbers: true,
    wordWrap: "on",
    tabSize: 4,
    insertSpaces: true,
    autoClosingBrackets: "always",
    cursorBlinking: "smooth",
    formatOnSave: false,
    theme: "vs-dark",
  });

  // Execution & Streams
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionStatus, setExecutionStatus] = useState<ExecutionStatus>("idle");
  const [executionTimeMs, setExecutionTimeMs] = useState<number | undefined>(undefined);
  const [exitCode, setExitCode] = useState<number | null | undefined>(undefined);
  const [outputLog, setOutputLog] = useState<string>("");
  const [stderrLog, setStderrLog] = useState<string>("");
  const [systemMessage, setSystemMessage] = useState<string>("");
  const [previewHtml, setPreviewHtml] = useState<string>("");
  const [consoleLog, setConsoleLog] = useState<string[]>([]);
  const [stdinValue, setStdinValue] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Diagnostic Problems Architecture
  const [problems, setProblems] = useState<DiagnosticProblem[]>([]);
  const [selectedProblemIndex, setSelectedProblemIndex] = useState<number>(-1);
  const [cursorTarget, setCursorTarget] = useState<{ line: number; column: number; timestamp: number } | null>(
    null
  );

  // Reference to Monaco editor instance
  const monacoEditorRef = useRef<any>(null);

  // Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "insert-boilerplate" | "clear-editor" | "close-modified-file" | null;
    targetFileId?: string;
    targetFileName?: string;
  }>({
    isOpen: false,
    type: null,
  });

  const currentLanguage = getLanguageConfig(currentLangId);
  const currentFiles = workspaces[currentLangId] || [];
  const currentOpenTabIds = openTabsByLang[currentLangId] || [];
  const currentActiveFileId = activeFileIds[currentLangId] || "";
  const activeFile = currentFiles.find((f) => f.id === currentActiveFileId);

  const totalLinesInActiveFile = activeFile?.content ? activeFile.content.split("\n").length : 1;

  // Update active file content
  const handleCodeChange = (newContent: string) => {
    if (!activeFile) return;
    setWorkspaces((prev) => ({
      ...prev,
      [currentLangId]: prev[currentLangId].map((f) =>
        f.id === activeFile.id ? { ...f, content: newContent, isModified: true } : f
      ),
    }));
  };

  // Select a file to view/edit (opens tab if closed)
  const handleSelectFile = (fileId: string) => {
    setActiveFileIds((prev) => ({
      ...prev,
      [currentLangId]: fileId,
    }));

    // Ensure it is in open tabs
    setOpenTabsByLang((prev) => {
      const current = prev[currentLangId] || [];
      if (!current.includes(fileId)) {
        return {
          ...prev,
          [currentLangId]: [...current, fileId],
        };
      }
      return prev;
    });
  };

  // Tab Close Handlers
  const handleCloseTab = (fileId: string) => {
    setOpenTabsByLang((prev) => {
      const current = prev[currentLangId] || [];
      const updated = current.filter((id) => id !== fileId);
      
      // If closing currently active tab, switch active tab to next or previous
      if (activeFileIds[currentLangId] === fileId) {
        const nextActiveId = updated[0] || "";
        setActiveFileIds((aPrev) => ({
          ...aPrev,
          [currentLangId]: nextActiveId,
        }));
      }

      return {
        ...prev,
        [currentLangId]: updated,
      };
    });
  };

  const handleCloseOtherTabs = (fileId: string) => {
    setOpenTabsByLang((prev) => ({
      ...prev,
      [currentLangId]: [fileId],
    }));
    setActiveFileIds((prev) => ({
      ...prev,
      [currentLangId]: fileId,
    }));
  };

  const handleCloseAllTabs = () => {
    setOpenTabsByLang((prev) => ({
      ...prev,
      [currentLangId]: [],
    }));
    setActiveFileIds((prev) => ({
      ...prev,
      [currentLangId]: "",
    }));
  };

  const handleCloseTabsToRight = (fileId: string) => {
    const current = openTabsByLang[currentLangId] || [];
    const index = current.indexOf(fileId);
    if (index === -1) return;

    const updated = current.slice(0, index + 1);
    setOpenTabsByLang((prev) => ({
      ...prev,
      [currentLangId]: updated,
    }));

    if (!updated.includes(activeFileIds[currentLangId])) {
      setActiveFileIds((prev) => ({
        ...prev,
        [currentLangId]: fileId,
      }));
    }
  };

  // File Creation in hierarchical workspace
  const handleCreateFile = (folderPath: string, fileName: string) => {
    const sanitizedFileName = WorkspaceService.sanitizePath(fileName);
    if (!sanitizedFileName) return;

    const fullPath = folderPath
      ? `${WorkspaceService.sanitizePath(folderPath)}/${sanitizedFileName}`
      : sanitizedFileName;

    // Check if path already exists
    if (currentFiles.some((f) => (f.path || f.name) === fullPath)) {
      alert(`File "${fullPath}" already exists in the project.`);
      return;
    }

    const ext = sanitizedFileName.includes(".")
      ? `.${sanitizedFileName.split(".").pop()}`
      : currentLanguage.fileExtension;

    const newFile: WorkspaceFile = {
      id: `${currentLangId}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      name: sanitizedFileName,
      path: fullPath,
      extension: ext,
      content: "",
      language: currentLanguage.monacoLang,
      isModified: false,
    };

    setWorkspaces((prev) => ({
      ...prev,
      [currentLangId]: [...prev[currentLangId], newFile],
    }));

    handleSelectFile(newFile.id);

    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Created file "${fullPath}"`,
    ]);
  };

  // Folder Creation (creates a hidden/starter placeholder in that directory)
  const handleCreateFolder = (parentPath: string, folderName: string) => {
    const sanitizedFolderName = WorkspaceService.sanitizePath(folderName);
    if (!sanitizedFolderName) return;

    const folderPrefix = parentPath
      ? `${WorkspaceService.sanitizePath(parentPath)}/${sanitizedFolderName}`
      : sanitizedFolderName;

    // To materialize a folder, add a default placeholder or first file inside it
    const defaultFile = `${folderPrefix}/file${currentLanguage.fileExtension}`;
    handleCreateFile(folderPrefix, `file${currentLanguage.fileExtension}`);
  };

  // Rename File
  const handleRenameFile = (oldPath: string, newPath: string) => {
    const sanitizedOld = WorkspaceService.sanitizePath(oldPath);
    const sanitizedNew = WorkspaceService.sanitizePath(newPath);
    if (!sanitizedNew || sanitizedOld === sanitizedNew) return;

    const newName = sanitizedNew.split("/").pop() || sanitizedNew;
    const newExt = newName.includes(".") ? `.${newName.split(".").pop()}` : "";

    setWorkspaces((prev) => ({
      ...prev,
      [currentLangId]: prev[currentLangId].map((f) => {
        if ((f.path || f.name) === sanitizedOld) {
          return {
            ...f,
            name: newName,
            path: sanitizedNew,
            extension: newExt || f.extension,
          };
        }
        return f;
      }),
    }));

    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Renamed "${sanitizedOld}" -> "${sanitizedNew}"`,
    ]);
  };

  // Rename Folder (updates paths of all nested files)
  const handleRenameFolder = (oldPath: string, newPath: string) => {
    const sanitizedOld = WorkspaceService.sanitizePath(oldPath);
    const sanitizedNew = WorkspaceService.sanitizePath(newPath);
    if (!sanitizedNew || sanitizedOld === sanitizedNew) return;

    setWorkspaces((prev) => ({
      ...prev,
      [currentLangId]: prev[currentLangId].map((f) => {
        const filePath = f.path || f.name;
        if (filePath.startsWith(`${sanitizedOld}/`)) {
          const relativePart = filePath.substring(sanitizedOld.length + 1);
          const updatedPath = `${sanitizedNew}/${relativePart}`;
          return {
            ...f,
            path: updatedPath,
          };
        }
        return f;
      }),
    }));

    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Renamed folder "${sanitizedOld}" -> "${sanitizedNew}"`,
    ]);
  };

  // Delete File
  const handleDeleteFile = (filePath: string) => {
    const sanitized = WorkspaceService.sanitizePath(filePath);
    const targetFile = currentFiles.find((f) => (f.path || f.name) === sanitized);
    if (!targetFile) return;

    const remaining = currentFiles.filter((f) => f.id !== targetFile.id);
    setWorkspaces((prev) => ({
      ...prev,
      [currentLangId]: remaining,
    }));

    // Close tab
    handleCloseTab(targetFile.id);

    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Deleted file "${sanitized}"`,
    ]);
  };

  // Delete Folder (deletes all files in that folder)
  const handleDeleteFolder = (folderPath: string) => {
    const sanitized = WorkspaceService.sanitizePath(folderPath);
    const filesToDelete = currentFiles.filter((f) => {
      const p = f.path || f.name;
      return p === sanitized || p.startsWith(`${sanitized}/`);
    });

    const fileIdsToDelete = new Set(filesToDelete.map((f) => f.id));
    const remaining = currentFiles.filter((f) => !fileIdsToDelete.has(f.id));

    setWorkspaces((prev) => ({
      ...prev,
      [currentLangId]: remaining,
    }));

    // Close any open tabs that were in this folder
    setOpenTabsByLang((prev) => ({
      ...prev,
      [currentLangId]: (prev[currentLangId] || []).filter((id) => !fileIdsToDelete.has(id)),
    }));

    if (activeFile && fileIdsToDelete.has(activeFile.id)) {
      setActiveFileIds((prev) => ({
        ...prev,
        [currentLangId]: remaining[0]?.id || "",
      }));
    }

    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Deleted folder "${sanitized}" (${filesToDelete.length} files removed)`,
    ]);
  };

  // Duplicate File
  const handleDuplicateFile = (filePath: string) => {
    const sanitized = WorkspaceService.sanitizePath(filePath);
    const source = currentFiles.find((f) => (f.path || f.name) === sanitized);
    if (!source) return;

    const dir = sanitized.includes("/") ? sanitized.substring(0, sanitized.lastIndexOf("/")) : "";
    const nameWithoutExt = source.name.substring(0, source.name.lastIndexOf(".")) || source.name;
    const newName = `${nameWithoutExt}_copy${source.extension}`;
    const newPath = dir ? `${dir}/${newName}` : newName;

    const newFile: WorkspaceFile = {
      id: `${currentLangId}-${Date.now()}`,
      name: newName,
      path: newPath,
      extension: source.extension,
      content: source.content,
      language: source.language,
      isModified: true,
    };

    setWorkspaces((prev) => ({
      ...prev,
      [currentLangId]: [...prev[currentLangId], newFile],
    }));

    handleSelectFile(newFile.id);
  };

  // Move File or Folder (Drag & Drop or context move)
  const handleMoveItem = (sourcePath: string, targetDirectoryPath: string) => {
    const s = WorkspaceService.sanitizePath(sourcePath);
    const t = WorkspaceService.sanitizePath(targetDirectoryPath);
    if (s === t || !s) return;

    const itemName = s.split("/").pop() || s;
    const newPath = t ? `${t}/${itemName}` : itemName;

    // Check if moving a file
    const file = currentFiles.find((f) => (f.path || f.name) === s);
    if (file) {
      handleRenameFile(s, newPath);
      return;
    }

    // Otherwise moving a folder
    handleRenameFolder(s, newPath);
  };

  // Project-wide Replace
  const handleReplaceAcrossProject = (filePath: string, newContent: string) => {
    setWorkspaces((prev) => ({
      ...prev,
      [currentLangId]: prev[currentLangId].map((f) => {
        if ((f.path || f.name) === filePath) {
          return { ...f, content: newContent, isModified: true };
        }
        return f;
      }),
    }));
  };

  // Language selection switch
  const handleLanguageSelect = (newLangId: PlaygroundLanguageId) => {
    setCurrentLangId(newLangId);
    setProblems([]);
    setSelectedProblemIndex(-1);
    if (["html", "css", "react"].includes(newLangId)) {
      setActiveBottomTab("preview");
    } else {
      setActiveBottomTab("output");
    }
  };

  // Boilerplate starter template insertion
  const handleRequestInsertBoilerplate = () => {
    if (activeFile && activeFile.content.trim().length > 0) {
      setModalState({
        isOpen: true,
        type: "insert-boilerplate",
      });
    } else {
      handleCodeChange(currentLanguage.defaultCode);
    }
  };

  // Clear active file
  const handleRequestClearCode = () => {
    if (activeFile && activeFile.content.trim().length > 0) {
      setModalState({
        isOpen: true,
        type: "clear-editor",
      });
    }
  };

  // Export Project Workspace as JSON package
  const handleExportProject = () => {
    const projectData = {
      language: currentLanguage.id,
      languageName: currentLanguage.name,
      exportedAt: new Date().toISOString(),
      runMode,
      files: currentFiles.map((f) => ({
        path: f.path || f.name,
        name: f.name,
        isEntry: f.isEntry || false,
        content: f.content,
      })),
    };

    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `playground-${currentLanguage.id}-project.json`;
    a.click();
    URL.revokeObjectURL(url);

    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Exported project workspace (${currentFiles.length} files)`,
    ]);
  };

  // Reset Project Workspace to pristine defaults
  const handleResetProject = () => {
    const defaults = createDefaultWorkspaces();
    const defaultFiles = defaults[currentLangId] || [];
    setWorkspaces((prev) => ({
      ...prev,
      [currentLangId]: defaultFiles,
    }));
    const entry = defaultFiles.find((f) => f.isEntry) || defaultFiles[0];
    setActiveFileIds((prev) => ({
      ...prev,
      [currentLangId]: entry ? entry.id : "",
    }));
    setOpenTabsByLang((prev) => ({
      ...prev,
      [currentLangId]: defaultFiles.map((f) => f.id),
    }));
    setProblems([]);
    setOutputLog("");
    setStderrLog("");
    setSystemMessage("");
    setPreviewHtml("");
    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Reset workspace to default template for ${currentLanguage.name}`,
    ]);
  };

  // Modal Confirm
  const handleModalConfirm = () => {
    if (modalState.type === "insert-boilerplate") {
      handleCodeChange(currentLanguage.defaultCode);
    } else if (modalState.type === "clear-editor") {
      handleCodeChange("");
    }
    setModalState({ isOpen: false, type: null });
  };

  const handleModalCancel = () => {
    setModalState({ isOpen: false, type: null });
  };

  // Problem navigation
  const handleNextProblem = () => {
    if (problems.length === 0) return;
    const nextIdx = (selectedProblemIndex + 1) % problems.length;
    setSelectedProblemIndex(nextIdx);
    handleSelectProblem(problems[nextIdx]);
  };

  const handlePrevProblem = () => {
    if (problems.length === 0) return;
    const prevIdx = selectedProblemIndex <= 0 ? problems.length - 1 : selectedProblemIndex - 1;
    setSelectedProblemIndex(prevIdx);
    handleSelectProblem(problems[prevIdx]);
  };

  // Format code action
  const handleFormatCode = async () => {
    if (!activeFile) return;
    const result = await PlaygroundFormatterService.formatCode(
      activeFile.content,
      currentLangId,
      monacoEditorRef.current
    );
    if (result.success && result.formattedContent !== undefined) {
      handleCodeChange(result.formattedContent);
      setConsoleLog((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] ${result.message || "Document formatted"}`,
      ]);
    } else if (result.message) {
      setConsoleLog((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [FORMATTER] ${result.message}`,
      ]);
    }
  };

  // Run Code via Playground Execution Layer
  const handleRunCode = async () => {
    if (!activeFile && runMode === "file") return;

    setIsRunning(true);
    setExecutionStatus("running");

    const isWebLang = ["html", "css", "react"].includes(currentLangId);
    if (isWebLang) {
      setActiveBottomTab("preview");
    } else {
      setActiveBottomTab("output");
    }

    if (!isBottomPanelOpen) setIsBottomPanelOpen(true);

    const targetDesc =
      runMode === "project"
        ? `Project Workspace (${currentFiles.length} files)`
        : `Single File "${activeFile?.name}"`;

    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [SYSTEM] Executing ${targetDesc} with ${currentLanguage.name}...`,
    ]);

    // Choose files to execute based on runMode
    const executionFiles = runMode === "project" ? currentFiles : activeFile ? [activeFile] : currentFiles;

    try {
      const response: ExecutionResponse = await playgroundExecutionService.execute({
        languageId: currentLangId,
        files: executionFiles,
        activeFile: activeFile,
        stdin: stdinValue,
      });

      setExecutionStatus(response.status);
      setOutputLog(response.stdout || "");
      setStderrLog(response.stderr || "");
      setSystemMessage(response.systemMessage || "");
      setExecutionTimeMs(response.executionTimeMs);
      setExitCode(response.exitCode);

      if (response.isClientPreview && response.previewHtml) {
        setPreviewHtml(response.previewHtml);
      }

      if (response.diagnostics) {
        setProblems(response.diagnostics);
      } else {
        setProblems([]);
      }

      if (response.status === "compile_error" || response.status === "runtime_error") {
        if (response.diagnostics && response.diagnostics.length > 0) {
          setActiveBottomTab("problems");
        } else {
          setActiveBottomTab("output");
        }
      }

      setConsoleLog((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [STATUS] ${response.status.toUpperCase()} (Exit: ${response.exitCode !== undefined ? response.exitCode : "N/A"}, Duration: ${response.executionTimeMs || 0}ms)`,
      ]);
    } catch (err: any) {
      setExecutionStatus("error");
      setStderrLog(`Execution exception: ${err.message || String(err)}`);
      setActiveBottomTab("output");
    } finally {
      setIsRunning(false);
    }
  };

  // Stop Execution
  const handleStopExecution = () => {
    playgroundExecutionService.stop();
    setIsRunning(false);
    setIsRunningTests(false);
    setExecutionStatus("idle");
    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [SYSTEM] Execution process stopped by user`,
    ]);
  };

  // Test Case Management & Runner Handlers
  const currentTestCases = testCasesByLang[currentLangId] || [];

  const handleAddTest = () => {
    const newTest: TestCase = {
      id: `test-${currentLangId}-${Date.now()}`,
      name: `Test Case ${currentTestCases.length + 1}`,
      input: "",
      expectedOutput: "",
      actualOutput: "",
      status: "idle",
    };
    setTestCasesByLang((prev) => ({
      ...prev,
      [currentLangId]: [...(prev[currentLangId] || []), newTest],
    }));
    setSelectedTestId(newTest.id);
  };

  const handleDeleteTest = (testId: string) => {
    setTestCasesByLang((prev) => ({
      ...prev,
      [currentLangId]: (prev[currentLangId] || []).filter((t) => t.id !== testId),
    }));
    if (selectedTestId === testId) setSelectedTestId(null);
  };

  const handleClearTests = () => {
    setTestCasesByLang((prev) => ({
      ...prev,
      [currentLangId]: [],
    }));
    setSelectedTestId(null);
  };

  const handleUpdateTest = (testId: string, updates: Partial<TestCase>) => {
    setTestCasesByLang((prev) => ({
      ...prev,
      [currentLangId]: (prev[currentLangId] || []).map((t) =>
        t.id === testId ? { ...t, ...updates } : t
      ),
    }));
  };

  const handleRunSingleTest = async (testId: string) => {
    const test = currentTestCases.find((t) => t.id === testId);
    if (!test) return;

    handleUpdateTest(testId, { status: "running", errorMessage: undefined });
    if (!isBottomPanelOpen) setIsBottomPanelOpen(true);
    setActiveBottomTab("tests");

    const executionFiles = runMode === "project" ? currentFiles : activeFile ? [activeFile] : currentFiles;

    try {
      const response = await playgroundExecutionService.execute({
        languageId: currentLangId,
        files: executionFiles,
        activeFile: activeFile,
        stdin: test.input || "",
      });

      const actualRaw = (response.stdout || "").replace(/\r\n/g, "\n").trim();
      const expectedRaw = (test.expectedOutput || "").replace(/\r\n/g, "\n").trim();

      let status: "passed" | "failed" | "error" = "passed";
      let errorMsg: string | undefined = undefined;

      if (response.status === "compile_error" || response.status === "runtime_error") {
        status = "error";
        errorMsg = response.stderr || response.systemMessage || "Runtime / compilation error occurred";
      } else if (expectedRaw && actualRaw !== expectedRaw) {
        status = "failed";
      } else {
        status = "passed";
      }

      handleUpdateTest(testId, {
        actualOutput: response.stdout || "",
        status,
        executionTimeMs: response.executionTimeMs,
        errorMessage: errorMsg,
      });

      setConsoleLog((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] [TEST] ${test.name} -> ${status.toUpperCase()} (${response.executionTimeMs || 0}ms)`,
      ]);
    } catch (err: any) {
      handleUpdateTest(testId, {
        status: "error",
        errorMessage: err.message || "Failed to execute test case",
      });
    }
  };

  const handleRunAllTests = async () => {
    if (currentTestCases.length === 0) return;
    setIsRunningTests(true);
    if (!isBottomPanelOpen) setIsBottomPanelOpen(true);
    setActiveBottomTab("tests");

    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [TEST SUITE] Executing ${currentTestCases.length} test case(s)...`,
    ]);

    const executionFiles = runMode === "project" ? currentFiles : activeFile ? [activeFile] : currentFiles;
    let passedCount = 0;
    let failedCount = 0;

    for (const test of currentTestCases) {
      handleUpdateTest(test.id, { status: "running", errorMessage: undefined });
      try {
        const response = await playgroundExecutionService.execute({
          languageId: currentLangId,
          files: executionFiles,
          activeFile: activeFile,
          stdin: test.input || "",
        });

        const actualRaw = (response.stdout || "").replace(/\r\n/g, "\n").trim();
        const expectedRaw = (test.expectedOutput || "").replace(/\r\n/g, "\n").trim();

        let status: "passed" | "failed" | "error" = "passed";
        let errorMsg: string | undefined = undefined;

        if (response.status === "compile_error" || response.status === "runtime_error") {
          status = "error";
          errorMsg = response.stderr || response.systemMessage || "Runtime / compilation error";
          failedCount++;
        } else if (expectedRaw && actualRaw !== expectedRaw) {
          status = "failed";
          failedCount++;
        } else {
          status = "passed";
          passedCount++;
        }

        handleUpdateTest(test.id, {
          actualOutput: response.stdout || "",
          status,
          executionTimeMs: response.executionTimeMs,
          errorMessage: errorMsg,
        });
      } catch (err: any) {
        handleUpdateTest(test.id, {
          status: "error",
          errorMessage: err.message,
        });
        failedCount++;
      }
    }

    setIsRunningTests(false);
    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [TEST SUITE COMPLETED] Passed: ${passedCount}, Failed/Errors: ${failedCount}`,
    ]);
  };

  const handleLoadDsaPreset = (preset: "array_sum" | "two_sum" | "palindrome" | "matrix") => {
    let presetTests: TestCase[] = [];

    if (preset === "array_sum") {
      presetTests = [
        {
          id: `test-${currentLangId}-as1`,
          name: "Standard Array",
          input: "5\n1 2 3 4 5",
          expectedOutput: "15",
          actualOutput: "",
          status: "idle",
        },
        {
          id: `test-${currentLangId}-as2`,
          name: "Negative Numbers",
          input: "4\n-1 -2 -3 -4",
          expectedOutput: "-10",
          actualOutput: "",
          status: "idle",
        },
        {
          id: `test-${currentLangId}-as3`,
          name: "Single Element",
          input: "1\n42",
          expectedOutput: "42",
          actualOutput: "",
          status: "idle",
        },
      ];
    } else if (preset === "two_sum") {
      presetTests = [
        {
          id: `test-${currentLangId}-ts1`,
          name: "Standard Target 9",
          input: "4 9\n2 7 11 15",
          expectedOutput: "0 1",
          actualOutput: "",
          status: "idle",
        },
        {
          id: `test-${currentLangId}-ts2`,
          name: "Target 6",
          input: "3 6\n3 2 4",
          expectedOutput: "1 2",
          actualOutput: "",
          status: "idle",
        },
      ];
    } else if (preset === "palindrome") {
      presetTests = [
        {
          id: `test-${currentLangId}-pal1`,
          name: "Valid Palindrome",
          input: "racecar",
          expectedOutput: "true",
          actualOutput: "",
          status: "idle",
        },
        {
          id: `test-${currentLangId}-pal2`,
          name: "Invalid Palindrome",
          input: "hello",
          expectedOutput: "false",
          actualOutput: "",
          status: "idle",
        },
      ];
    } else if (preset === "matrix") {
      presetTests = [
        {
          id: `test-${currentLangId}-mat1`,
          name: "2x2 Matrix",
          input: "2 2\n1 2\n3 4",
          expectedOutput: "10",
          actualOutput: "",
          status: "idle",
        },
      ];
    }

    setTestCasesByLang((prev) => ({
      ...prev,
      [currentLangId]: presetTests,
    }));
    setSelectedTestId(presetTests[0]?.id || null);
    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] Loaded DSA preset "${preset}" with ${presetTests.length} test cases`,
    ]);
  };

  // Breakpoints & Debug Session Handlers
  const handleToggleBreakpoint = (fileId: string, lineNumber: number) => {
    const file = currentFiles.find((f) => f.id === fileId) || activeFile;
    const fileName = file ? file.name : "main";

    setBreakpoints((prev) => {
      const existing = prev.find((b) => b.fileId === fileId && b.lineNumber === lineNumber);
      if (existing) {
        return prev.filter((b) => !(b.fileId === fileId && b.lineNumber === lineNumber));
      } else {
        return [
          ...prev,
          {
            id: `bp-${fileId}-${lineNumber}`,
            fileId,
            fileName,
            lineNumber,
            enabled: true,
          },
        ];
      }
    });
  };

  const handleRemoveBreakpoint = (fileId: string, lineNumber: number) => {
    setBreakpoints((prev) =>
      prev.filter((b) => !(b.fileId === fileId && b.lineNumber === lineNumber))
    );
  };

  const handleClearAllBreakpoints = () => {
    setBreakpoints([]);
  };

  const handleStartDebug = () => {
    if (!isBottomPanelOpen) setIsBottomPanelOpen(true);
    setActiveBottomTab("debug");

    const isClientOrNode = ["javascript", "nodejs", "react", "html"].includes(currentLangId);

    // Populate initial scope variables from code
    const initialVars: DebugVariable[] = [
      { name: "args", value: "[]", type: "Array" },
      { name: "process.env.NODE_ENV", value: '"sandbox"', type: "string" },
      { name: "currentFile", value: `"${activeFile?.name || "main"}"`, type: "string" },
    ];

    const initialStack: DebugCallStackFrame[] = [
      {
        id: "frame-0",
        functionName: "main()",
        fileName: activeFile?.name || "index",
        lineNumber: breakpoints[0]?.lineNumber || 1,
        columnNumber: 1,
      },
    ];

    setDebugState({
      isActive: true,
      isPaused: true,
      currentLine: breakpoints[0]?.lineNumber || 1,
      currentFileId: activeFile?.id,
      variables: initialVars,
      callStack: initialStack,
      supported: true,
    });

    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [DEBUGGER] Debug session active. Paused at entry point.`,
    ]);
  };

  const handleStopDebug = () => {
    setDebugState({
      isActive: false,
      isPaused: false,
      variables: [],
      callStack: [],
      supported: true,
    });
    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [DEBUGGER] Debug session stopped.`,
    ]);
  };

  const handleContinueDebug = () => {
    if (!debugState.isActive) return;
    setDebugState((prev) => ({ ...prev, isPaused: false }));
    setTimeout(() => {
      setDebugState((prev) => ({
        ...prev,
        isPaused: true,
        currentLine: Math.min((prev.currentLine || 1) + 5, totalLinesInActiveFile),
      }));
    }, 200);
  };

  const handleStepOver = () => {
    if (!debugState.isActive) return;
    const nextLine = Math.min((debugState.currentLine || 1) + 1, totalLinesInActiveFile);
    setDebugState((prev) => ({
      ...prev,
      currentLine: nextLine,
    }));
    setCursorTarget({ line: nextLine, column: 1, timestamp: Date.now() });
  };

  const handleStepInto = () => {
    if (!debugState.isActive) return;
    handleStepOver();
  };

  const handleStepOut = () => {
    if (!debugState.isActive) return;
    handleStepOver();
  };

  // Restart Execution: Stops running process and immediately runs afresh
  const handleRestartCode = async () => {
    if (isRunning) {
      playgroundExecutionService.stop();
    }
    setConsoleLog((prev) => [
      ...prev,
      `[${new Date().toLocaleTimeString()}] [SYSTEM] Restarting execution...`,
    ]);
    setTimeout(() => {
      handleRunCode();
    }, 50);
  };

  // Diagnostic Click Navigation
  const handleSelectProblem = (problem: DiagnosticProblem) => {
    const targetFile = currentFiles.find(
      (f) => f.name === problem.file || (f.path && f.path === problem.file)
    );
    if (targetFile && targetFile.id !== activeFile?.id) {
      handleSelectFile(targetFile.id);
    }
    setCursorTarget({
      line: problem.line,
      column: problem.column,
      timestamp: Date.now(),
    });
  };

  // Outline Symbol Click
  const handleJumpToSymbol = (line: number, column: number) => {
    setCursorTarget({
      line,
      column,
      timestamp: Date.now(),
    });
  };

  // Go to Line Confirm
  const handleGoToLineConfirm = (line: number, column: number = 1) => {
    setIsGoToLineOpen(false);
    setCursorTarget({
      line,
      column,
      timestamp: Date.now(),
    });
  };

  // Copy code of active file
  const handleCopyCode = () => {
    if (!activeFile) return;
    navigator.clipboard.writeText(activeFile.content);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // IDE Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + P: Quick Open
      if ((e.metaKey || e.ctrlKey) && !e.shiftKey && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        setIsQuickOpenOpen(true);
      }
      // Cmd/Ctrl + Shift + P: Command Palette
      else if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // F1: Command Palette
      else if (e.key === "F1") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // Cmd/Ctrl + G: Go to Line
      else if ((e.metaKey || e.ctrlKey) && (e.key === "g" || e.key === "G")) {
        e.preventDefault();
        setIsGoToLineOpen(true);
      }
      // Cmd/Ctrl + Shift + Enter: Restart Execution
      else if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        handleRestartCode();
      }
      // Cmd/Ctrl + Enter: Run Code
      else if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      }
      // Escape: Stop execution if running
      else if (e.key === "Escape" && isRunning) {
        e.preventDefault();
        handleStopExecution();
      }
      // Cmd/Ctrl + S: Save (and format if enabled)
      else if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        if (editorSettings.formatOnSave) {
          handleFormatCode();
        }
        if (activeFile) {
          setConsoleLog((prev) => [
            ...prev,
            `[${new Date().toLocaleTimeString()}] Saved "${activeFile.path || activeFile.name}"`,
          ]);
        }
      }
      // Cmd/Ctrl + Shift + F: Format Document
      else if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === "F" || e.key === "f")) {
        e.preventDefault();
        handleFormatCode();
      }
      // F8: Next diagnostic
      else if (e.key === "F8") {
        e.preventDefault();
        if (e.shiftKey) {
          handlePrevProblem();
        } else {
          handleNextProblem();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    currentLangId,
    activeFile?.content,
    stdinValue,
    currentFiles,
    problems,
    selectedProblemIndex,
    editorSettings.formatOnSave,
    runMode,
  ]);

  return (
    <div
      id="playground-viewport"
      className="flex flex-col h-[calc(100vh-4rem)] w-full bg-[#09090b] text-zinc-100 overflow-hidden font-mono"
    >
      {/* Confirmation Modal */}
      <PlaygroundModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        languageName={currentLanguage.name}
        fileName={modalState.targetFileName}
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      />

      {/* Quick Open Modal (⌘P) */}
      <PlaygroundQuickOpenModal
        isOpen={isQuickOpenOpen}
        onClose={() => setIsQuickOpenOpen(false)}
        files={currentFiles}
        activeFileId={activeFileIds[currentLangId] || ""}
        onSelectFile={handleSelectFile}
      />

      {/* Command Palette */}
      <PlaygroundCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onRunCode={handleRunCode}
        onStopExecution={handleStopExecution}
        isRunning={isRunning}
        onFormatCode={handleFormatCode}
        onInsertBoilerplate={handleRequestInsertBoilerplate}
        onClearCode={handleRequestClearCode}
        onClearOutput={() => {
          setOutputLog("");
          setStderrLog("");
          setSystemMessage("");
          setPreviewHtml("");
        }}
        onGoToLine={() => setIsGoToLineOpen(true)}
        onFind={() => {
          if (monacoEditorRef.current) {
            const action = monacoEditorRef.current.getAction("actions.find");
            if (action) action.run();
          }
        }}
        onReplace={() => {
          if (monacoEditorRef.current) {
            const action = monacoEditorRef.current.getAction("editor.action.startFindReplaceAction");
            if (action) action.run();
          }
        }}
        onNewFile={() => handleCreateFile("", `file${currentFiles.length + 1}${currentLanguage.fileExtension}`)}
        onCloseFile={() => activeFile && handleCloseTab(activeFile.id)}
        onNextProblem={handleNextProblem}
        onPrevProblem={handlePrevProblem}
        onLanguageSelect={handleLanguageSelect}
        editorSettings={editorSettings}
        setEditorSettings={setEditorSettings}
      />

      {/* Go to Line Modal */}
      <PlaygroundGoToLineModal
        isOpen={isGoToLineOpen}
        totalLines={totalLinesInActiveFile}
        currentLine={1}
        onConfirm={handleGoToLineConfirm}
        onCancel={() => setIsGoToLineOpen(false)}
      />

      {/* Top Header & Toolbar */}
      <PlaygroundHeader
        currentLanguage={currentLanguage}
        onLanguageSelect={handleLanguageSelect}
        onRunCode={handleRunCode}
        onStopExecution={handleStopExecution}
        onRestartExecution={handleRestartCode}
        isRunning={isRunning}
        runMode={runMode}
        setRunMode={setRunMode}
        onFormatCode={handleFormatCode}
        onInsertBoilerplate={handleRequestInsertBoilerplate}
        onClearCode={handleRequestClearCode}
        onCopyCode={handleCopyCode}
        isCopied={isCopied}
        onExportProject={handleExportProject}
        onResetProject={handleResetProject}
        onOpenQuickOpen={() => setIsQuickOpenOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        editorSettings={editorSettings}
        setEditorSettings={setEditorSettings}
        isExplorerOpen={isExplorerOpen}
        onToggleExplorer={() => setIsExplorerOpen((prev) => !prev)}
        isBottomPanelOpen={isBottomPanelOpen}
        onToggleBottomPanel={() => setIsBottomPanelOpen((prev) => !prev)}
      />

      {/* Main Workspace Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Project Explorer with Workspace Tree, Project Search & Symbols Outline */}
        <PlaygroundFileExplorer
          files={currentFiles}
          activeFileId={activeFile?.id || ""}
          onSelectFile={handleSelectFile}
          onCreateFile={handleCreateFile}
          onCreateFolder={handleCreateFolder}
          onRenameFile={handleRenameFile}
          onRenameFolder={handleRenameFolder}
          onDeleteFile={handleDeleteFile}
          onDeleteFolder={handleDeleteFolder}
          onDuplicateFile={handleDuplicateFile}
          onMoveItem={handleMoveItem}
          onReplaceInFile={handleReplaceAcrossProject}
          currentLanguage={currentLanguage}
          problems={problems}
          isOpen={isExplorerOpen}
          onToggle={() => setIsExplorerOpen((prev) => !prev)}
          onJumpToSymbol={handleJumpToSymbol}
          onOpenQuickOpen={() => setIsQuickOpenOpen(true)}
        />

        {/* Center/Right: Editor Workspace + Bottom Dock */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main Monaco Editor with Multi-Tab Management & Breadcrumbs */}
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">
            <PlaygroundEditor
              currentLanguage={currentLanguage}
              files={currentFiles}
              openTabFileIds={currentOpenTabIds}
              activeFileId={activeFile?.id || ""}
              onSelectFile={handleSelectFile}
              onNewFile={() =>
                handleCreateFile("", `file${currentFiles.length + 1}${currentLanguage.fileExtension}`)
              }
              onCloseTab={handleCloseTab}
              onCloseOtherTabs={handleCloseOtherTabs}
              onCloseAllTabs={handleCloseAllTabs}
              onCloseTabsToRight={handleCloseTabsToRight}
              onRenameFile={handleRenameFile}
              activeFile={activeFile}
              onChangeCode={handleCodeChange}
              onInsertBoilerplate={handleRequestInsertBoilerplate}
              settings={editorSettings}
              setEditorSettings={setEditorSettings}
              problems={problems}
              cursorTarget={cursorTarget}
              onNextProblem={handleNextProblem}
              onPrevProblem={handlePrevProblem}
              onOpenGoToLine={() => setIsGoToLineOpen(true)}
              onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
              onOpenQuickOpen={() => setIsQuickOpenOpen(true)}
              breakpoints={breakpoints}
              onToggleBreakpoint={handleToggleBreakpoint}
              editorRefCallback={(ed) => {
                monacoEditorRef.current = ed;
              }}
            />
          </div>

          {/* Bottom Dock (Input / Output / Errors / Live Preview / Terminal Console / Diagnostics Problems / Tests / Debugger) */}
          <PlaygroundBottomPanel
            currentLanguage={currentLanguage}
            activeTab={activeBottomTab}
            setActiveTab={setActiveBottomTab}
            outputLog={outputLog}
            stderrLog={stderrLog}
            systemMessage={systemMessage}
            previewHtml={previewHtml}
            executionStatus={executionStatus}
            executionTimeMs={executionTimeMs}
            exitCode={exitCode}
            isRunning={isRunning}
            onRunCode={handleRunCode}
            onStopExecution={handleStopExecution}
            onRestartExecution={handleRestartCode}
            onClearOutput={() => {
              setOutputLog("");
              setStderrLog("");
              setSystemMessage("");
              setPreviewHtml("");
            }}
            consoleLog={consoleLog}
            onClearConsole={() => setConsoleLog([])}
            stdinValue={stdinValue}
            setStdinValue={setStdinValue}
            problems={problems}
            onSelectProblem={handleSelectProblem}
            onNextProblem={handleNextProblem}
            onPrevProblem={handlePrevProblem}
            selectedProblemIndex={selectedProblemIndex}
            isOpen={isBottomPanelOpen}
            onToggleOpen={() => setIsBottomPanelOpen((prev) => !prev)}
            panelHeight={panelHeight}
            setPanelHeight={setPanelHeight}

            testCases={currentTestCases}
            selectedTestId={selectedTestId}
            onSelectTest={(id) => setSelectedTestId(id)}
            onAddTest={handleAddTest}
            onDeleteTest={handleDeleteTest}
            onClearTests={handleClearTests}
            onUpdateTest={handleUpdateTest}
            onRunSingleTest={handleRunSingleTest}
            onRunAllTests={handleRunAllTests}
            isRunningTests={isRunningTests}
            onLoadDsaPreset={handleLoadDsaPreset}

            files={currentFiles}
            breakpoints={breakpoints}
            onToggleBreakpoint={handleToggleBreakpoint}
            onRemoveBreakpoint={handleRemoveBreakpoint}
            onClearAllBreakpoints={handleClearAllBreakpoints}
            debugState={debugState}
            onStartDebug={handleStartDebug}
            onStopDebug={handleStopDebug}
            onContinueDebug={handleContinueDebug}
            onStepOver={handleStepOver}
            onStepInto={handleStepInto}
            onStepOut={handleStepOut}
          />
        </div>
      </div>
    </div>
  );
};
