import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";
import { IsolatedExecutionClient } from "../sandbox.js";
import path from "path";

export class PythonAdapter extends BaseLanguageAdapter {
  public readonly languageId = "python";
  public readonly name = "Python 3";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const health = await IsolatedExecutionClient.checkServiceHealth();
    return {
      available: health.available,
      version: health.version || "Python 3.11.2 (Isolated Container)",
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

    const pyFiles = request.files.filter((f) => f.name.endsWith(".py"));
    if (pyFiles.length === 0) {
      return this.createResponse(
        "error",
        "",
        "No Python source files (.py) found in project workspace.",
        -1,
        0
      );
    }

    const sourceCode = IsolatedExecutionClient.bundleFiles("python", request.files, request.activeFileName);

    const runResult = await IsolatedExecutionClient.execute({
      language: "python",
      sourceCode,
      stdin: request.stdin,
      timeoutMs: options.timeoutMs,
    });

    const sanitizedStdout = IsolatedExecutionClient.sanitizeOutput(runResult.stdout, options.maxOutputBytes);
    const sanitizedStderr = IsolatedExecutionClient.sanitizeOutput(runResult.stderr, options.maxOutputBytes);
    const diagnostics = this.parsePythonDiagnostics(sanitizedStderr);

    let status: PlaygroundExecutionResponse["status"] = "success";
    let systemMessage: string | undefined;

    if (runResult.timedOut) {
      status = "timeout";
      systemMessage = `Execution timed out after ${options.timeoutMs}ms (infinite loop or unhandled input prompt).`;
    } else if (runResult.statusDescription === "Service Unavailable" || runResult.error) {
      status = "runtime_unavailable";
      systemMessage = "Secure execution service is currently unavailable. Untrusted host execution is disabled for security.";
    } else if (runResult.exitCode !== 0) {
      status = sanitizedStderr.includes("SyntaxError:") ? "compile_error" : "runtime_error";
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
          language: "Python 3",
          version: "3.11.2 (Isolated Container)",
          timestamp: new Date().toISOString(),
        },
      }
    );
  }

  /**
   * Parses Python Traceback and SyntaxError diagnostics
   */
  private parsePythonDiagnostics(errorText: string): DiagnosticItem[] {
    const items: DiagnosticItem[] = [];
    if (!errorText) return items;

    const fileLineRegex = /File\s+["']([^"']+)["'],\s+line\s+(\d+)(?:,\s+in\s+([^\n]+))?/gi;
    let match;

    const errorLines = errorText.trim().split("\n");
    const lastLine = errorLines[errorLines.length - 1]?.trim() || "Python Exception";

    while ((match = fileLineRegex.exec(errorText)) !== null) {
      const fileName = path.basename(match[1]);
      const line = parseInt(match[2], 10);

      items.push({
        id: `diag-py-${items.length + 1}`,
        file: fileName,
        line: isNaN(line) ? 1 : line,
        column: 1,
        severity: "error",
        message: lastLine,
        source: "python3",
      });
    }

    return items;
  }
}
