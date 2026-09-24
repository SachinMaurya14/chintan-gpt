import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";
import { IsolatedExecutionClient } from "../sandbox.js";
import path from "path";

export class CppAdapter extends BaseLanguageAdapter {
  public readonly languageId = "cpp";
  public readonly name = "C++ (GCC/Clang)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const health = await IsolatedExecutionClient.checkServiceHealth();
    return {
      available: health.available,
      version: health.version || "GCC 14.1.0 C++ (Isolated Container)",
      details: health.details,
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const validation = IsolatedExecutionClient.validatePayload(request.files, request.stdin);
    if (!validation.valid) {
      return this.createResponse("error", "", validation.error || "Invalid payload.", -1, 0);
    }

    const cppFiles = request.files.filter((f) => f.name.endsWith(".cpp") || f.name.endsWith(".cc") || f.name.endsWith(".c"));
    if (cppFiles.length === 0) {
      return this.createResponse(
        "error",
        "",
        "No C++ source files (.cpp, .cc) found in project workspace.",
        -1,
        0
      );
    }

    const sourceCode = IsolatedExecutionClient.bundleFiles("cpp", request.files, request.activeFileName);

    const runResult = await IsolatedExecutionClient.execute({
      language: "cpp",
      sourceCode,
      stdin: request.stdin,
      timeoutMs: options.timeoutMs,
    });

    const sanitizedStdout = IsolatedExecutionClient.sanitizeOutput(runResult.stdout, options.maxOutputBytes);
    const sanitizedStderr = IsolatedExecutionClient.sanitizeOutput(runResult.stderr, options.maxOutputBytes);
    const diagnostics = this.parseCompilerDiagnostics(sanitizedStderr);

    let status: PlaygroundExecutionResponse["status"] = "success";
    let systemMessage: string | undefined;

    if (runResult.timedOut) {
      status = "timeout";
      systemMessage = `Execution timed out after ${options.timeoutMs}ms (infinite loop or unhandled input prompt).`;
    } else if (runResult.statusDescription === "Service Unavailable" || runResult.error) {
      status = "runtime_unavailable";
      systemMessage = "Secure execution service is currently unavailable. Untrusted host execution is disabled for security.";
    } else if (runResult.exitCode !== 0) {
      status = (sanitizedStderr.includes("error:") || !!runResult.compileOutput) ? "compile_error" : "runtime_error";
    }

    return this.createResponse(
      status,
      sanitizedStdout,
      sanitizedStderr,
      runResult.exitCode,
      runResult.durationMs,
      diagnostics,
      systemMessage,
      {
        metadata: {
          language: "C++",
          version: "GCC 14.1.0 C++ (Isolated Container)",
          timestamp: new Date().toISOString(),
        },
      }
    );
  }

  private parseCompilerDiagnostics(errorText: string): DiagnosticItem[] {
    const items: DiagnosticItem[] = [];
    if (!errorText) return items;

    const regex = /^([a-zA-Z0-9_\-./\\]+):(\d+):(\d+):\s+(error|warning|fatal error|note):\s+(.*)$/gim;
    let match;

    while ((match = regex.exec(errorText)) !== null) {
      const filePath = path.basename(match[1]);
      const line = parseInt(match[2], 10);
      const column = parseInt(match[3], 10);
      const rawSeverity = match[4].toLowerCase();
      const message = match[5].trim();

      const severity: "error" | "warning" | "info" =
        rawSeverity.includes("error")
          ? "error"
          : rawSeverity.includes("warning")
          ? "warning"
          : "info";

      items.push({
        id: `diag-cpp-${items.length + 1}`,
        file: filePath,
        line: isNaN(line) ? 1 : line,
        column: isNaN(column) ? 1 : column,
        severity,
        message,
        source: "g++",
      });
    }

    return items;
  }
}
