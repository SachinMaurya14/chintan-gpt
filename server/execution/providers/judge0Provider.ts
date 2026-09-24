import { IExecutionProvider, ExecutionRequest, ExecutionResult } from "../types.js";
import { ExecutionValidator } from "../validator.js";

export class Judge0ExecutionProvider implements IExecutionProvider {
  public readonly name = "judge0";
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl?: string, apiKey?: string) {
    this.baseUrl = (baseUrl || process.env.CODE_EXECUTION_BASE_URL || "").trim().replace(/\/+$/, "");
    this.apiKey = apiKey || process.env.CODE_EXECUTION_API_KEY || undefined;
  }

  public isConfigured(): boolean {
    return this.baseUrl.length > 0;
  }

  private static readonly LANGUAGE_MAP: Record<string, number> = {
    python: 92,
    py: 92,
    python3: 92,
    javascript: 102,
    js: 102,
    node: 102,
    typescript: 101,
    ts: 101,
    cpp: 105,
    "c++": 105,
    cplusplus: 105,
    java: 91,
    kotlin: 111,
    kt: 111,
  };

  public async checkHealth(): Promise<{ available: boolean; version?: string; details?: string }> {
    if (!this.isConfigured()) {
      return {
        available: false,
        details: "Judge0 endpoint is not configured (CODE_EXECUTION_BASE_URL is unset)."
      };
    }

    try {
      const url = `${this.baseUrl}/about`;
      const headers: Record<string, string> = { Accept: "application/json" };
      if (this.apiKey) {
        headers["X-Auth-Token"] = this.apiKey;
        headers["X-RapidAPI-Key"] = this.apiKey;
      }

      const res = await fetch(url, {
        headers,
        signal: AbortSignal.timeout(4000)
      });

      if (res.ok) {
        const data = await res.json().catch(() => ({}));
        return {
          available: true,
          version: data.version ? `Judge0 v${data.version}` : "Judge0 Remote Sandbox",
          details: "Remote isolated Judge0 container runtime online"
        };
      }
      return { available: false, details: `Judge0 returned HTTP status ${res.status}` };
    } catch (err: any) {
      return { available: false, details: `Judge0 health check error: ${err.message}` };
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

    const langKey = req.language.toLowerCase().trim();
    const languageId = Judge0ExecutionProvider.LANGUAGE_MAP[langKey];

    if (!languageId) {
      return {
        success: false,
        status: "runtime_unavailable",
        stdout: "",
        stderr: `Language "${req.language}" is not supported by the configured execution provider.`,
        exitCode: -1,
        executionTimeMs: 0,
        systemMessage: `Unsupported language: ${req.language}`
      };
    }

    // Determine primary source code
    let sourceCode = req.sourceCode || "";
    if (!sourceCode && req.files && req.files.length > 0) {
      sourceCode = req.files[0].content;
    }

    // Single file normalization for Java public class
    if (langKey === "java" && /public\s+class\s+([A-Za-z0-9_]+)/.test(sourceCode)) {
      sourceCode = sourceCode.replace(/public\s+class\s+([A-Za-z0-9_]+)/, (match, className) => {
        return className === "Main" ? match : "public class Main";
      });
    }

    const timeoutMs = req.timeoutMs || 8000;
    const cpuTimeoutSec = Math.max(1, Math.min(10, Math.ceil(timeoutMs / 1000)));

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (this.apiKey) {
      headers["X-Auth-Token"] = this.apiKey;
      headers["X-RapidAPI-Key"] = this.apiKey;
    }

    const payload = {
      source_code: sourceCode,
      language_id: languageId,
      stdin: req.stdin || "",
      cpu_time_limit: cpuTimeoutSec,
      wall_time_limit: cpuTimeoutSec + 3,
      memory_limit: 128000,
    };

    const apiUrl = `${this.baseUrl}/submissions?wait=true`;
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
          stderr: `Execution service error (${response.status}): ${ExecutionValidator.sanitizeOutput(errText, 500)}`,
          exitCode: -1,
          executionTimeMs: durationMs,
          systemMessage: "Remote execution service returned non-200 status code.",
          error: "Execution provider error"
        };
      }

      const data = await response.json();
      const stdout = ExecutionValidator.sanitizeOutput(data.stdout || "");
      const stderr = ExecutionValidator.sanitizeOutput(data.stderr || "");
      const compileOutput = ExecutionValidator.sanitizeOutput(data.compile_output || "");
      const statusId = data.status?.id || 0;
      const timedOut = statusId === 5;

      let status: ExecutionResult["status"] = "success";
      if (timedOut) {
        status = "timeout";
      } else if (statusId === 6 || compileOutput) {
        status = "compile_error";
      } else if (statusId !== 3 && statusId !== 0) {
        status = "runtime_error";
      }

      const exitCode = statusId === 3 ? 0 : timedOut ? 124 : statusId === 6 ? 1 : 1;

      return {
        success: status === "success",
        status,
        stdout,
        stderr: stderr || compileOutput,
        compileOutput: compileOutput || undefined,
        exitCode,
        executionTimeMs: data.time ? Math.round(parseFloat(data.time) * 1000) : durationMs,
        memoryKb: data.memory,
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
