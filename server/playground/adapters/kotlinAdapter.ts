import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";
import { IsolatedExecutionClient } from "../sandbox.js";
import path from "path";

export class KotlinAdapter extends BaseLanguageAdapter {
  public readonly languageId = "kotlin";
  public readonly name = "Kotlin (kotlinc)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const health = await IsolatedExecutionClient.checkServiceHealth();
    return {
      available: health.available,
      version: health.version || "Kotlin 2.1 (Isolated Container)",
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

    const ktFiles = request.files.filter((f) => f.name.endsWith(".kt"));
    if (ktFiles.length === 0) {
      return this.createResponse(
        "error",
        "",
        "No Kotlin source files (.kt) found in project workspace.",
        -1,
        0
      );
    }

    const sourceCode = IsolatedExecutionClient.bundleFiles("kotlin", request.files, request.activeFileName);

    const runResult = await IsolatedExecutionClient.execute({
      language: "kotlin",
      sourceCode,
      stdin: request.stdin,
      timeoutMs: options.timeoutMs,
    });

    const sanitizedStdout = IsolatedExecutionClient.sanitizeOutput(runResult.stdout, options.maxOutputBytes);
    const sanitizedStderr = IsolatedExecutionClient.sanitizeOutput(runResult.stderr, options.maxOutputBytes);
    const diagnostics = this.parseKotlincDiagnostics(sanitizedStderr);

    let status: PlaygroundExecutionResponse["status"] = "success";
    let systemMessage: string | undefined;

    if (runResult.timedOut) {
      status = "timeout";
      systemMessage = `Execution timed out after ${options.timeoutMs}ms (infinite loop or unhandled I/O).`;
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
          language: "Kotlin",
          version: "Kotlin 2.1 (Isolated Container)",
          timestamp: new Date().toISOString(),
        },
      }
    );
  }

  private parseKotlincDiagnostics(errorText: string): DiagnosticItem[] {
    const items: DiagnosticItem[] = [];
    if (!errorText) return items;

    const regex = /^([a-zA-Z0-9_\-./\\]+\.kt):(\d+):(\d+):\s+(error|warning):\s+(.*)$/gim;
    let match;

    while ((match = regex.exec(errorText)) !== null) {
      const fileName = path.basename(match[1]);
      const line = parseInt(match[2], 10);
      const column = parseInt(match[3], 10);
      const rawSeverity = match[4].toLowerCase();
      const message = match[5].trim();

      items.push({
        id: `diag-kt-${items.length + 1}`,
        file: fileName,
        line: isNaN(line) ? 1 : line,
        column: isNaN(column) ? 1 : column,
        severity: rawSeverity === "warning" ? "warning" : "error",
        message,
        source: "kotlinc",
      });
    }

    return items;
  }
}
