import {
  WorkspaceFile,
  WorkspaceTreeNode,
  WorkspaceFolderNode,
  WorkspaceFileNode,
  SearchMatch,
  DiagnosticProblem,
  PlaygroundLanguageId
} from "../types.js";

export class WorkspaceService {
  /**
   * Sanitizes a path string to prevent path traversal and invalid characters.
   */
  public static sanitizePath(rawPath: string): string {
    if (!rawPath) return "";
    // Replace backslashes with forward slashes
    let sanitized = rawPath.replace(/\\/g, "/").trim();
    // Remove leading and trailing slashes
    sanitized = sanitized.replace(/^\/+/, "").replace(/\/+$/, "");
    // Remove consecutive slashes
    sanitized = sanitized.replace(/\/+/g, "/");
    // Strip illegal path traversal sequences
    sanitized = sanitized.replace(/\.\.\//g, "").replace(/\/\.\./g, "");
    // Strip forbidden characters <>:"|?*
    sanitized = sanitized.replace(/[<>:"|?*]/g, "");
    return sanitized;
  }

  /**
   * Validates a candidate filename or relative path
   */
  public static validateFileName(
    fileName: string,
    folderPath: string,
    existingFiles: WorkspaceFile[]
  ): string | null {
    const trimmed = fileName.trim();
    if (!trimmed) {
      return "Filename cannot be empty.";
    }
    if (trimmed.length > 80) {
      return "Filename is too long (maximum 80 characters).";
    }
    // Path traversal check
    if (trimmed.includes("..") || trimmed.startsWith("/") || trimmed.startsWith("\\")) {
      return "Path traversal sequences are not allowed.";
    }
    // Illegal characters check (excluding / if user creates nested file)
    if (/[<>:"|?*]/.test(trimmed)) {
      return 'Filename cannot contain invalid characters: <>:"|?*';
    }

    const fullPath = folderPath ? `${folderPath}/${trimmed}` : trimmed;
    const normalized = this.sanitizePath(fullPath);

    if (existingFiles.some((f) => f.path.toLowerCase() === normalized.toLowerCase())) {
      return `A file already exists at "${normalized}".`;
    }

    return null;
  }

  /**
   * Validates a candidate folder name
   */
  public static validateFolderName(
    folderName: string,
    parentPath: string,
    existingFolderPaths: string[]
  ): string | null {
    const trimmed = folderName.trim();
    if (!trimmed) {
      return "Folder name cannot be empty.";
    }
    if (trimmed.length > 50) {
      return "Folder name is too long (maximum 50 characters).";
    }
    if (trimmed.includes("..") || trimmed.includes("/") || trimmed.includes("\\")) {
      return "Folder name cannot contain path separators or traversal.";
    }
    if (/[<>:"|?*]/.test(trimmed)) {
      return 'Folder name cannot contain invalid characters: <>:"|?*';
    }

    const fullPath = parentPath ? `${parentPath}/${trimmed}` : trimmed;
    const normalized = this.sanitizePath(fullPath);

    if (existingFolderPaths.some((p) => p.toLowerCase() === normalized.toLowerCase())) {
      return `A folder already exists at "${normalized}".`;
    }

    return null;
  }

  /**
   * Resolves language mode and category from filename or extension
   */
  public static getLanguageFromFilename(filename: string): {
    monacoLang: string;
    languageId?: PlaygroundLanguageId;
    fileTypeLabel: string;
  } {
    const lower = filename.toLowerCase();
    const ext = lower.includes(".") ? `.${lower.split(".").pop()}` : "";

    switch (ext) {
      case ".cpp":
      case ".cc":
      case ".cxx":
      case ".c":
      case ".h":
      case ".hpp":
        return { monacoLang: "cpp", languageId: "cpp", fileTypeLabel: "C++ Source" };
      case ".py":
      case ".pyw":
        return { monacoLang: "python", languageId: "python", fileTypeLabel: "Python Script" };
      case ".java":
        return { monacoLang: "java", languageId: "java", fileTypeLabel: "Java Class" };
      case ".kt":
      case ".kts":
        return { monacoLang: "kotlin", languageId: "kotlin", fileTypeLabel: "Kotlin Source" };
      case ".js":
      case ".mjs":
      case ".cjs":
        return { monacoLang: "javascript", languageId: "javascript", fileTypeLabel: "JavaScript" };
      case ".jsx":
        return { monacoLang: "javascript", languageId: "react", fileTypeLabel: "React JSX" };
      case ".ts":
        return { monacoLang: "typescript", fileTypeLabel: "TypeScript" };
      case ".tsx":
        return { monacoLang: "typescript", languageId: "react", fileTypeLabel: "React TSX" };
      case ".html":
      case ".htm":
        return { monacoLang: "html", languageId: "html", fileTypeLabel: "HTML Document" };
      case ".css":
        return { monacoLang: "css", languageId: "css", fileTypeLabel: "CSS Stylesheet" };
      case ".json":
        return { monacoLang: "json", fileTypeLabel: "JSON Configuration" };
      case ".md":
      case ".markdown":
        return { monacoLang: "markdown", fileTypeLabel: "Markdown Document" };
      case ".sql":
        return { monacoLang: "sql", fileTypeLabel: "SQL Script" };
      case ".xml":
      case ".svg":
        return { monacoLang: "xml", fileTypeLabel: "XML / Vector" };
      case ".txt":
      case ".log":
        return { monacoLang: "plaintext", fileTypeLabel: "Plain Text" };
      default:
        return { monacoLang: "plaintext", fileTypeLabel: "Document" };
    }
  }

  /**
   * Returns visual styling, color, and icon badge for a file
   */
  public static getFileVisualInfo(filename: string): {
    colorClass: string;
    bgBadgeClass: string;
    shortBadge: string;
  } {
    const lower = filename.toLowerCase();
    const ext = lower.includes(".") ? `.${lower.split(".").pop()}` : "";

    switch (ext) {
      case ".cpp":
      case ".cc":
      case ".h":
      case ".hpp":
        return {
          colorClass: "text-blue-400",
          bgBadgeClass: "bg-blue-500/10 text-blue-300 border-blue-500/30",
          shortBadge: "C++",
        };
      case ".py":
        return {
          colorClass: "text-amber-400",
          bgBadgeClass: "bg-amber-500/10 text-amber-300 border-amber-500/30",
          shortBadge: "PY",
        };
      case ".java":
        return {
          colorClass: "text-orange-400",
          bgBadgeClass: "bg-orange-500/10 text-orange-300 border-orange-500/30",
          shortBadge: "JAVA",
        };
      case ".kt":
        return {
          colorClass: "text-purple-400",
          bgBadgeClass: "bg-purple-500/10 text-purple-300 border-purple-500/30",
          shortBadge: "KT",
        };
      case ".js":
      case ".mjs":
        return {
          colorClass: "text-yellow-400",
          bgBadgeClass: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
          shortBadge: "JS",
        };
      case ".jsx":
      case ".tsx":
        return {
          colorClass: "text-cyan-400",
          bgBadgeClass: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
          shortBadge: "REACT",
        };
      case ".ts":
        return {
          colorClass: "text-blue-400",
          bgBadgeClass: "bg-blue-500/10 text-blue-300 border-blue-500/30",
          shortBadge: "TS",
        };
      case ".html":
        return {
          colorClass: "text-rose-400",
          bgBadgeClass: "bg-rose-500/10 text-rose-300 border-rose-500/30",
          shortBadge: "HTML",
        };
      case ".css":
        return {
          colorClass: "text-sky-400",
          bgBadgeClass: "bg-sky-500/10 text-sky-300 border-sky-500/30",
          shortBadge: "CSS",
        };
      case ".json":
        return {
          colorClass: "text-emerald-400",
          bgBadgeClass: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
          shortBadge: "JSON",
        };
      case ".md":
        return {
          colorClass: "text-teal-400",
          bgBadgeClass: "bg-teal-500/10 text-teal-300 border-teal-500/30",
          shortBadge: "MD",
        };
      default:
        return {
          colorClass: "text-zinc-400",
          bgBadgeClass: "bg-zinc-800 text-zinc-400 border-zinc-700",
          shortBadge: "TXT",
        };
    }
  }

  /**
   * Builds a structured nested directory tree from a flat list of WorkspaceFiles
   * Folders are sorted first, then files, all in alphabetical order.
   */
  public static buildWorkspaceTree(
    files: WorkspaceFile[],
    openFolderPaths: Set<string>
  ): WorkspaceTreeNode[] {
    const rootNodes: WorkspaceTreeNode[] = [];
    const folderMap = new Map<string, WorkspaceFolderNode>();

    // Helper to ensure a folder node exists in the hierarchy
    const ensureFolder = (folderPath: string): WorkspaceFolderNode => {
      const normalized = this.sanitizePath(folderPath);
      if (folderMap.has(normalized)) {
        return folderMap.get(normalized)!;
      }

      const parts = normalized.split("/");
      const folderName = parts[parts.length - 1];
      const parentPath = parts.slice(0, parts.length - 1).join("/");

      const folderNode: WorkspaceFolderNode = {
        id: `folder-${normalized}`,
        name: folderName,
        path: normalized,
        type: "folder",
        children: [],
        isOpen: openFolderPaths.has(normalized),
      };

      folderMap.set(normalized, folderNode);

      if (parentPath) {
        const parentNode = ensureFolder(parentPath);
        if (!parentNode.children.some((c) => c.path === normalized)) {
          parentNode.children.push(folderNode);
        }
      } else {
        if (!rootNodes.some((n) => n.path === normalized)) {
          rootNodes.push(folderNode);
        }
      }

      return folderNode;
    };

    // 1. Process all files into folders or root
    for (const file of files) {
      const normalizedPath = this.sanitizePath(file.path || file.name);
      const parts = normalizedPath.split("/");
      const fileName = parts[parts.length - 1];
      const folderPath = parts.slice(0, parts.length - 1).join("/");

      const fileNode: WorkspaceFileNode = {
        id: file.id,
        name: fileName,
        path: normalizedPath,
        type: "file",
        file: {
          ...file,
          path: normalizedPath,
          name: fileName,
        },
      };

      if (folderPath) {
        const parentFolder = ensureFolder(folderPath);
        parentFolder.children.push(fileNode);
      } else {
        rootNodes.push(fileNode);
      }
    }

    // 2. Recursive sorting function (Folders first, then files, alphabetical)
    const sortNodes = (nodes: WorkspaceTreeNode[]) => {
      nodes.sort((a, b) => {
        if (a.type === "folder" && b.type === "file") return -1;
        if (a.type === "file" && b.type === "folder") return 1;
        return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
      });

      for (const node of nodes) {
        if (node.type === "folder") {
          sortNodes(node.children);
        }
      }
    };

    sortNodes(rootNodes);
    return rootNodes;
  }

  /**
   * Checks if a folder or any of its descendants contain diagnostic problems
   */
  public static folderHasDiagnostics(
    folderPath: string,
    files: WorkspaceFile[],
    problems: DiagnosticProblem[]
  ): { hasError: boolean; hasWarning: boolean } {
    const normalized = this.sanitizePath(folderPath);
    const descendantFiles = files.filter((f) => {
      const p = this.sanitizePath(f.path || f.name);
      return p.startsWith(`${normalized}/`);
    });

    let hasError = false;
    let hasWarning = false;

    for (const file of descendantFiles) {
      const fileProblems = problems.filter(
        (pr) => pr.file === file.name || pr.file === file.path
      );
      if (fileProblems.some((pr) => pr.severity === "error")) {
        hasError = true;
      }
      if (fileProblems.some((pr) => pr.severity === "warning")) {
        hasWarning = true;
      }
    }

    return { hasError, hasWarning };
  }

  /**
   * Search across all files in the workspace with line/column matches
   */
  public static searchWorkspace(
    files: WorkspaceFile[],
    query: string,
    caseSensitive: boolean = false,
    isRegex: boolean = false
  ): SearchMatch[] {
    const matches: SearchMatch[] = [];
    if (!query || !query.trim()) return matches;

    let regex: RegExp;
    try {
      if (isRegex) {
        regex = new RegExp(query, caseSensitive ? "g" : "gi");
      } else {
        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        regex = new RegExp(escaped, caseSensitive ? "g" : "gi");
      }
    } catch {
      return matches;
    }

    for (const file of files) {
      if (!file.content) continue;
      const lines = file.content.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const lineContent = lines[i];
        regex.lastIndex = 0;
        let match;

        while ((match = regex.exec(lineContent)) !== null) {
          matches.push({
            fileId: file.id,
            fileName: file.name,
            filePath: file.path || file.name,
            line: i + 1,
            column: match.index + 1,
            matchLength: match[0].length,
            lineContent: lineContent,
            matchText: match[0],
          });
          // Prevent infinite loops on zero-length matches
          if (regex.lastIndex === match.index) {
            regex.lastIndex++;
          }
        }
      }
    }

    return matches;
  }

  /**
   * Performs replacement across workspace files with safety checks
   */
  public static replaceInWorkspace(
    files: WorkspaceFile[],
    searchQuery: string,
    replacementText: string,
    caseSensitive: boolean = false,
    isRegex: boolean = false,
    targetFileIds?: string[]
  ): {
    updatedFiles: WorkspaceFile[];
    replacementsCount: number;
    filesAffected: number;
  } {
    if (!searchQuery) {
      return { updatedFiles: files, replacementsCount: 0, filesAffected: 0 };
    }

    let regex: RegExp;
    try {
      if (isRegex) {
        regex = new RegExp(searchQuery, caseSensitive ? "g" : "gi");
      } else {
        const escaped = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        regex = new RegExp(escaped, caseSensitive ? "g" : "gi");
      }
    } catch {
      return { updatedFiles: files, replacementsCount: 0, filesAffected: 0 };
    }

    let totalReplacements = 0;
    let affectedFilesCount = 0;

    const updated = files.map((file) => {
      if (targetFileIds && !targetFileIds.includes(file.id)) {
        return file;
      }

      regex.lastIndex = 0;
      const matches = file.content.match(regex);
      if (matches && matches.length > 0) {
        const newContent = file.content.replace(regex, replacementText);
        totalReplacements += matches.length;
        affectedFilesCount++;
        return {
          ...file,
          content: newContent,
          isModified: true,
        };
      }
      return file;
    });

    return {
      updatedFiles: updated,
      replacementsCount: totalReplacements,
      filesAffected: affectedFilesCount,
    };
  }

  /**
   * Generates a downloadable JSON manifest of the workspace project
   */
  public static exportWorkspaceAsJson(
    files: WorkspaceFile[],
    languageName: string
  ): void {
    const projectPayload = {
      name: `playground-${languageName.toLowerCase()}-project`,
      exportedAt: new Date().toISOString(),
      language: languageName,
      files: files.map((f) => ({
        path: f.path || f.name,
        name: f.name,
        extension: f.extension,
        isEntry: !!f.isEntry,
        content: f.content,
      })),
    };

    const blob = new Blob([JSON.stringify(projectPayload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `playground_${languageName.toLowerCase()}_workspace.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
