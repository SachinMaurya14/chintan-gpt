import { ExecutionRequest, ExecutionResponse } from "../types.js";

export interface IPlaygroundExecutionService {
  execute(request: ExecutionRequest): Promise<ExecutionResponse>;
  stop(): void;
}

export class RealPlaygroundExecutionService implements IPlaygroundExecutionService {
  private activeAbortController: AbortController | null = null;

  public async execute(request: ExecutionRequest): Promise<ExecutionResponse> {
    // Cancel any previous in-flight execution request
    if (this.activeAbortController) {
      this.activeAbortController.abort();
    }

    this.activeAbortController = new AbortController();

    const startTime = performance.now();

    // Map languageId for nodejs -> node or nextjs -> nextjs
    const normalizedLang = request.languageId === "nodejs" ? "node" : request.languageId;

    const payload = {
      language: normalizedLang,
      files: request.files.map((f) => ({
        name: f.path || f.name,
        content: f.content,
        extension: f.extension,
        isEntry: f.isEntry,
      })),
      activeFileName: request.activeFile?.path || request.activeFile?.name,
      stdin: request.stdin,
      timeoutMs: request.timeoutMs || 8000,
    };

    try {
      const response = await fetch("/api/playground/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: this.activeAbortController.signal,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const durationMs = Math.round(performance.now() - startTime);
        return {
          status: "error",
          stdout: "",
          stderr: errorBody.stderr || `Execution server error: HTTP ${response.status} (${response.statusText})`,
          exitCode: -1,
          executionTimeMs: durationMs,
          diagnostics: errorBody.diagnostics || [],
          systemMessage: errorBody.systemMessage || "The execution endpoint returned an error response.",
        };
      }

      const result: ExecutionResponse = await response.json();
      return result;
    } catch (err: any) {
      const durationMs = Math.round(performance.now() - startTime);

      if (err.name === "AbortError") {
        return {
          status: "idle",
          stdout: "",
          stderr: "Execution aborted by user.",
          exitCode: null,
          executionTimeMs: durationMs,
          systemMessage: "Process termination signaled.",
          diagnostics: [],
        };
      }

      return {
        status: "error",
        stdout: "",
        stderr: `Network / Connectivity Error: ${err.message || String(err)}`,
        exitCode: -1,
        executionTimeMs: durationMs,
        diagnostics: [],
        systemMessage: "Failed to communicate with Playground Execution API.",
      };
    } finally {
      this.activeAbortController = null;
    }
  }

  public stop(): void {
    if (this.activeAbortController) {
      this.activeAbortController.abort();
      this.activeAbortController = null;
    }
  }
}

export const playgroundExecutionService = new RealPlaygroundExecutionService();
