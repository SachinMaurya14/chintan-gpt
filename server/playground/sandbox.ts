import { PLAYGROUND_CONFIG } from "./config.js";
import { PlaygroundFilePayload } from "./types.js";
import { UnifiedExecutionService } from "../execution/executionService.js";
import { ExecutionValidator } from "../execution/validator.js";

export interface IsolatedRunResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
  durationMs: number;
  timedOut: boolean;
  statusDescription: string;
  memoryKb?: number;
  compileOutput?: string;
  error?: string;
}

/**
 * IsolatedExecutionClient: Routes untrusted user code through UnifiedExecutionService
 * to a dedicated, unprivileged remote container execution engine (Judge0, Piston, or self-hosted cluster).
 * 
 * STRICT SECURITY BOUNDARY:
 * - ZERO child_process / spawn / exec / fork on the application host.
 * - ZERO writing user files to host os.tmpdir().
 * - ZERO process.env or host secret exposure.
 * - STRICT fail-closed behavior: If isolated execution is unconfigured or unreachable,
 *   execution immediately fails safely rather than falling back to host execution.
 */
export class IsolatedExecutionClient {
  public static sanitizeFileName(fileName: string): string {
    return ExecutionValidator.sanitizeFileName(fileName);
  }

  public static validatePayload(
    files: PlaygroundFilePayload[],
    stdin?: string
  ): { valid: boolean; error?: string } {
    return ExecutionValidator.validate({
      language: "javascript", // placeholder for bounds validation
      files,
      stdin
    });
  }

  public static sanitizeOutput(output: string, maxBytes = 64 * 1024): string {
    return ExecutionValidator.sanitizeOutput(output, maxBytes);
  }

  public static async checkServiceHealth(): Promise<{ available: boolean; details: string; version?: string }> {
    const health = await UnifiedExecutionService.getHealthStatus();
    return {
      available: health.available,
      details: health.details,
      version: health.provider ? `Isolated Provider: ${health.provider}` : undefined,
    };
  }

  /**
   * Bundles workspace files for multi-file projects (alias: bundleFiles)
   */
  public static bundleFiles(
    language: string,
    files: PlaygroundFilePayload[],
    activeFileName?: string
  ): string {
    return this.prepareMultiFilePayload(language, files, activeFileName);
  }

  public static prepareMultiFilePayload(
    language: string,
    files: PlaygroundFilePayload[],
    activeFileName?: string
  ): string {
    if (!files || files.length === 0) return "";
    const sanitizedFiles = files.map(f => ({
      name: this.sanitizeFileName(f.name),
      content: f.content,
    }));

    let entry = activeFileName
      ? sanitizedFiles.find(f => f.name === this.sanitizeFileName(activeFileName))
      : undefined;

    const lang = language.toLowerCase();
    if (!entry) {
      if (lang.includes("py")) {
        entry = sanitizedFiles.find(f => f.name === "main.py" || f.name.endsWith(".py")) || sanitizedFiles[0];
      } else if (lang.includes("js") || lang.includes("node")) {
        entry = sanitizedFiles.find(f => f.name === "index.js" || f.name === "main.js" || f.name.endsWith(".js")) || sanitizedFiles[0];
      } else if (lang.includes("ts")) {
        entry = sanitizedFiles.find(f => f.name === "index.ts" || f.name.endsWith(".ts")) || sanitizedFiles[0];
      } else if (lang.includes("cpp") || lang.includes("c++")) {
        entry = sanitizedFiles.find(f => f.name === "main.cpp" || f.name.endsWith(".cpp")) || sanitizedFiles[0];
      } else if (lang.includes("java")) {
        entry = sanitizedFiles.find(f => f.name === "Main.java" || f.name.endsWith(".java")) || sanitizedFiles[0];
      } else if (lang.includes("kt")) {
        entry = sanitizedFiles.find(f => f.name === "Main.kt" || f.name.endsWith(".kt")) || sanitizedFiles[0];
      } else {
        entry = sanitizedFiles[0];
      }
    }

    if (lang.includes("py")) {
      const helperFiles = sanitizedFiles.filter(f => f !== entry && f.name.endsWith(".py"));
      if (helperFiles.length > 0) {
        const helpersCode = helperFiles.map(h => `# --- ${h.name} ---\n${h.content}`).join("\n\n");
        return `${helpersCode}\n\n# --- Entry: ${entry.name} ---\n${entry.content}`;
      }
    }

    return entry.content;
  }

  /**
   * Executes source code inside an isolated, unprivileged remote container
   */
  public static async execute(params: {
    language: string;
    sourceCode: string;
    files?: PlaygroundFilePayload[];
    stdin?: string;
    timeoutMs?: number;
  }): Promise<IsolatedRunResult> {
    const result = await UnifiedExecutionService.execute({
      language: params.language,
      sourceCode: params.sourceCode,
      files: params.files,
      stdin: params.stdin,
      timeoutMs: params.timeoutMs,
    });

    const timedOut = result.status === "timeout";
    let statusDesc = "Success";
    if (result.status === "runtime_unavailable") {
      statusDesc = "Service Unavailable";
    } else if (timedOut) {
      statusDesc = "Time Limit Exceeded";
    } else if (result.status === "compile_error") {
      statusDesc = "Compilation Error";
    } else if (result.status === "runtime_error") {
      statusDesc = "Runtime Error";
    } else if (result.status === "error") {
      statusDesc = "Validation / Execution Error";
    }

    return {
      stdout: result.stdout,
      stderr: result.stderr,
      compileOutput: result.compileOutput,
      exitCode: result.exitCode,
      durationMs: result.executionTimeMs,
      timedOut,
      statusDescription: statusDesc,
      memoryKb: result.memoryKb,
      error: result.error,
    };
  }
}

/**
 * Backward-compatible PlaygroundSandbox wrapper that delegates directly to UnifiedExecutionService.
 * Contains ZERO host-level process spawning and ZERO disk writes.
 */
export class PlaygroundSandbox {
  public static async executeIsolated(params: {
    language: string;
    sourceCode: string;
    files?: PlaygroundFilePayload[];
    stdin?: string;
    timeoutMs?: number;
  }): Promise<IsolatedRunResult> {
    return IsolatedExecutionClient.execute(params);
  }

  public static sanitizeOutput(output: string, _workspaceDir?: string): string {
    return IsolatedExecutionClient.sanitizeOutput(output);
  }

  public static async isBinaryAvailable(_binName: string): Promise<boolean> {
    const health = await IsolatedExecutionClient.checkServiceHealth();
    return health.available;
  }

  public static async getBinaryVersion(_binName: string): Promise<string | undefined> {
    const health = await IsolatedExecutionClient.checkServiceHealth();
    return health.version || "Isolated Container Sandbox";
  }
}
