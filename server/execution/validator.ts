import { ExecutionRequest } from "./types.js";

export const EXECUTION_LIMITS = {
  MAX_SOURCE_SIZE_BYTES: 64 * 1024,      // 64 KB per source file
  MAX_TOTAL_PAYLOAD_BYTES: 512 * 1024,   // 512 KB total payload
  MAX_FILES_COUNT: 10,                   // 10 files max in workspace
  MAX_STDIN_BYTES: 64 * 1024,            // 64 KB max standard input
  MAX_OUTPUT_BYTES: 64 * 1024,           // 64 KB max stdout/stderr buffer
  DEFAULT_TIMEOUT_MS: 8000,              // 8 seconds default
  MIN_TIMEOUT_MS: 1000,                  // 1 second minimum
  MAX_TIMEOUT_MS: 15000,                 // 15 seconds maximum
};

export const SUPPORTED_LANGUAGES = new Set([
  "python", "py", "python3",
  "javascript", "js", "node",
  "typescript", "ts",
  "cpp", "c++", "cplusplus",
  "java",
  "kotlin", "kt"
]);

export interface ValidationResult {
  valid: boolean;
  error?: string;
  normalizedRequest?: ExecutionRequest;
}

export class ExecutionValidator {
  /**
   * Sanitizes a filename to prevent path traversal or shell injection
   */
  public static sanitizeFileName(fileName: string): string {
    if (!fileName || typeof fileName !== "string") return "main";
    const clean = fileName
      .replace(/\0/g, "")
      .replace(/\\/g, "/")
      .replace(/(\.\.\/)+/g, "")
      .replace(/^\/+/, "")
      .trim();

    return clean.replace(/[^a-zA-Z0-9._\-/]/g, "_") || "main";
  }

  /**
   * Checks for path traversal or malicious character sequences in filenames
   */
  public static containsPathTraversal(fileName: string): boolean {
    if (!fileName || typeof fileName !== "string") return false;
    // Check for traversal markers, null bytes, backslashes attempting escape, or leading slashes
    return (
      fileName.includes("..") ||
      fileName.includes("\0") ||
      fileName.startsWith("/") ||
      fileName.startsWith("\\") ||
      /^[a-zA-Z]:/.test(fileName)
    );
  }

  /**
   * Validates an untrusted execution request against strict limits and security constraints
   */
  public static validate(req: any): ValidationResult {
    if (!req || typeof req !== "object") {
      return { valid: false, error: "Invalid execution payload: request must be a JSON object." };
    }

    if (!req.language || typeof req.language !== "string") {
      return { valid: false, error: "Language specification is required." };
    }

    const langKey = req.language.toLowerCase().trim();
    if (!SUPPORTED_LANGUAGES.has(langKey)) {
      return {
        valid: false,
        error: `Unsupported language: "${req.language}". Supported languages are: Python, JavaScript, TypeScript, C++, Java, Kotlin.`
      };
    }

    // Determine files array
    let files = req.files;
    if (!Array.isArray(files) || files.length === 0) {
      if (typeof req.sourceCode === "string" && req.sourceCode.trim().length > 0) {
        const defaultName = langKey.includes("py") ? "main.py"
          : langKey.includes("cpp") || langKey.includes("c++") ? "main.cpp"
          : langKey.includes("java") ? "Main.java"
          : langKey.includes("kt") ? "Main.kt"
          : langKey.includes("ts") ? "index.ts"
          : "index.js";
        files = [{ name: defaultName, content: req.sourceCode }];
      } else {
        return { valid: false, error: "No source code or files provided for execution." };
      }
    }

    if (files.length > EXECUTION_LIMITS.MAX_FILES_COUNT) {
      return {
        valid: false,
        error: `File count exceeds limit: received ${files.length} files, maximum allowed is ${EXECUTION_LIMITS.MAX_FILES_COUNT}.`
      };
    }

    let totalBytes = 0;
    const sanitizedFiles: { name: string; content: string }[] = [];

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (!f || typeof f !== "object" || typeof f.name !== "string" || typeof f.content !== "string") {
        return { valid: false, error: `Malformed file at index ${i}. Each file must have string 'name' and 'content'.` };
      }

      if (this.containsPathTraversal(f.name)) {
        return { valid: false, error: `Path traversal attempt detected in filename: "${f.name}".` };
      }

      const fileBytes = Buffer.byteLength(f.content, "utf-8");
      if (fileBytes > EXECUTION_LIMITS.MAX_SOURCE_SIZE_BYTES) {
        return {
          valid: false,
          error: `Source code size for "${f.name}" (${Math.round(fileBytes / 1024)} KB) exceeds maximum limit of ${Math.round(EXECUTION_LIMITS.MAX_SOURCE_SIZE_BYTES / 1024)} KB.`
        };
      }

      totalBytes += fileBytes;
      sanitizedFiles.push({
        name: this.sanitizeFileName(f.name),
        content: f.content
      });
    }

    if (totalBytes > EXECUTION_LIMITS.MAX_TOTAL_PAYLOAD_BYTES) {
      return {
        valid: false,
        error: `Total payload size (${Math.round(totalBytes / 1024)} KB) exceeds maximum allowed limit of ${Math.round(EXECUTION_LIMITS.MAX_TOTAL_PAYLOAD_BYTES / 1024)} KB.`
      };
    }

    let stdin = req.stdin;
    if (stdin !== undefined && stdin !== null) {
      if (typeof stdin !== "string") {
        return { valid: false, error: "stdin must be a string." };
      }
      if (Buffer.byteLength(stdin, "utf-8") > EXECUTION_LIMITS.MAX_STDIN_BYTES) {
        return {
          valid: false,
          error: `stdin size exceeds maximum limit of ${Math.round(EXECUTION_LIMITS.MAX_STDIN_BYTES / 1024)} KB.`
        };
      }
    } else {
      stdin = "";
    }

    const rawTimeout = typeof req.timeoutMs === "number" ? req.timeoutMs : EXECUTION_LIMITS.DEFAULT_TIMEOUT_MS;
    const timeoutMs = Math.min(
      Math.max(rawTimeout, EXECUTION_LIMITS.MIN_TIMEOUT_MS),
      EXECUTION_LIMITS.MAX_TIMEOUT_MS
    );

    return {
      valid: true,
      normalizedRequest: {
        language: langKey,
        sourceCode: sanitizedFiles[0]?.content || "",
        files: sanitizedFiles,
        stdin,
        timeoutMs,
        activeFileName: req.activeFileName ? this.sanitizeFileName(req.activeFileName) : undefined
      }
    };
  }

  /**
   * Sanitizes output to scrub server paths, IP addresses, and truncate oversized buffers
   */
  public static sanitizeOutput(output: string, maxBytes = EXECUTION_LIMITS.MAX_OUTPUT_BYTES): string {
    if (!output || typeof output !== "string") return "";
    let sanitized = output
      .replace(/\/home\/[a-zA-Z0-9_-]+/g, "/workspace")
      .replace(/\/tmp\/[a-zA-Z0-9_\-/]+/g, "/tmp/sandbox")
      .replace(/\/app\/[a-zA-Z0-9_\-/]+/g, "/app/isolated");

    if (Buffer.byteLength(sanitized, "utf-8") > maxBytes) {
      sanitized = sanitized.slice(0, maxBytes) + "\n[Output truncated: Exceeded maximum buffer limit]";
    }
    return sanitized;
  }
}
