import { IExecutionProvider, ExecutionRequest, ExecutionResult } from "../types.js";
import { ExecutionValidator } from "../validator.js";

export class PistonExecutionProvider implements IExecutionProvider {
  public readonly name = "piston";
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl?: string, apiKey?: string) {
    this.baseUrl = (baseUrl || process.env.CODE_EXECUTION_BASE_URL || "").trim().replace(/\/+$/, "");
    this.apiKey = apiKey || process.env.CODE_EXECUTION_API_KEY || undefined;
  }

  public isConfigured(): boolean {
    return this.baseUrl.length > 0;
  }

  private normalizeLanguage(lang: string): string {
    const l = lang.toLowerCase().trim();
    if (l === "py" || l === "python3") return "python";
    if (l === "js" || l === "node") return "javascript";
    if (l === "ts") return "typescript";
    if (l === "cpp" || l === "cplusplus") return "c++";
    if (l === "kt") return "kotlin";
    return l;
  }

  public async checkHealth(): Promise<{ available: boolean; version?: string; details?: string }> {
    if (!this.isConfigured()) {
      return {
        available: false,
        details: "Piston endpoint is not configured (CODE_EXECUTION_BASE_URL is unset)."
      };
    }

    try {
      const url = `${this.baseUrl}/api/v2/runtimes`;
      const headers: Record<string, string> = { Accept: "application/json" };
      if (this.apiKey) {
        headers["Authorization"] = this.apiKey;
      }

      const res = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(4000)
      });

      if (res.ok) {
        return {
          available: true,
          version: "Piston v2 Isolated Runtime",
          details: "Self-hosted Piston execution cluster online"
        };
      }
      return { available: false, details: `Piston returned HTTP status ${res.status}` };
    } catch (err: any) {
      return { available: false, details: `Piston health check error: ${err.message}` };
    }
  }

  public async execute(req: ExecutionRequest): Promise<ExecutionResult> {
    if (!this.isConfigured()) {
      return {
        success: false,
        status: "runtime_unavailable",
        stdout: "",
        stderr: "Secure code execution service is not configured. Set CODE_EXECUTION_BASE_URL to an isolated execution cluster.",
        exitCode: -1,
        executionTimeMs: 0,
        systemMessage: "Secure code execution service is not configured.",
        error: "Secure code execution service is not configured"
      };
    }

    const language = this.normalizeLanguage(req.language);
    const files = req.files && req.files.length > 0
      ? req.files.map(f => ({ name: f.name, content: f.content }))
      : [{ name: "main", content: req.sourceCode || "" }];

    const timeoutMs = req.timeoutMs || 8000;

    const payload = {
      language,
      version: "*",
      files,
      stdin: req.stdin || "",
      run_timeout: timeoutMs,
      compile_timeout: 10000,
    };

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (this.apiKey) {
      headers["Authorization"] = this.apiKey;
    }

    const apiUrl = `${this.baseUrl}/api/v2/execute`;
    const startTime = performance.now();

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(timeoutMs + 4000),
      });

      const durationMs = Math.round(performance.now() - startTime);

      if (!response.ok) {
        const errText = await response.text();
        return {
          success: false,
          status: "error",
          stdout: "",
          stderr: `Piston execution service error (${response.status}): ${ExecutionValidator.sanitizeOutput(errText, 500)}`,
          exitCode: -1,
          executionTimeMs: durationMs,
          systemMessage: "Piston service returned non-200 status code.",
          error: "Execution provider error"
        };
      }

      const data = await response.json();
      const compile = data.compile;
      const run = data.run;

      if (compile && compile.code !== 0) {
        const compileOut = ExecutionValidator.sanitizeOutput(compile.stderr || compile.output || "");
        return {
          success: false,
          status: "compile_error",
          stdout: "",
          stderr: compileOut,
          compileOutput: compileOut,
          exitCode: compile.code || 1,
          executionTimeMs: durationMs,
        };
      }

      const stdout = ExecutionValidator.sanitizeOutput(run?.stdout || "");
      const stderr = ExecutionValidator.sanitizeOutput(run?.stderr || "");
      const exitCode = run?.code ?? (run?.signal ? 1 : 0);
      const timedOut = run?.signal === "SIGKILL" || run?.signal === "SIGTERM";

      let status: ExecutionResult["status"] = "success";
      if (timedOut) {
        status = "timeout";
      } else if (exitCode !== 0) {
        status = "runtime_error";
      }

      return {
        success: status === "success",
        status,
        stdout,
        stderr,
        exitCode,
        executionTimeMs: durationMs,
      };
    } catch (err: any) {
      const durationMs = Math.round(performance.now() - startTime);
      const isTimeout = err.name === "TimeoutError" || err.message?.includes("timed out");
      return {
        success: false,
        status: isTimeout ? "timeout" : "runtime_unavailable",
        stdout: "",
        stderr: isTimeout
          ? `Execution request timed out after ${timeoutMs + 4000}ms.`
          : `Secure execution service unavailable: ${err.message || "Connection refused"}. Untrusted host execution is permanently disabled for security.`,
        exitCode: -1,
        executionTimeMs: durationMs,
        systemMessage: isTimeout ? "Execution timed out" : "Remote execution service unavailable (fail-closed).",
        error: isTimeout ? "Timeout" : "Service Unavailable"
      };
    }
  }
}
