import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";
import { IsolatedExecutionClient } from "../sandbox.js";
import path from "path";

export class NodeAdapter extends BaseLanguageAdapter {
  public readonly languageId = "node";
  public readonly name = "Node.js (Server Runtime)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const health = await IsolatedExecutionClient.checkServiceHealth();
    return {
      available: health.available,
      version: health.version || "Node.js 22 LTS (Isolated Container)",
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

    const jsFiles = request.files.filter((f) => f.name.endsWith(".js") || f.name.endsWith(".mjs") || f.name.endsWith(".cjs") || f.name.endsWith(".json"));
    if (jsFiles.length === 0) {
      return this.createResponse(
        "error",
        "",
        "No Node.js source files (.js, .json) found in project workspace.",
        -1,
        0
      );
    }

    const sourceCode = IsolatedExecutionClient.bundleFiles("node", request.files, request.activeFileName);

    const runResult = await IsolatedExecutionClient.execute({
      language: "node",
      sourceCode,
      stdin: request.stdin,
      timeoutMs: options.timeoutMs,
    });

    const sanitizedStdout = IsolatedExecutionClient.sanitizeOutput(runResult.stdout, options.maxOutputBytes);
    const sanitizedStderr = IsolatedExecutionClient.sanitizeOutput(runResult.stderr, options.maxOutputBytes);
    const diagnostics = this.parseNodeDiagnostics(sanitizedStderr);

    let status: PlaygroundExecutionResponse["status"] = "success";
    let systemMessage: string | undefined;

    if (runResult.timedOut) {
      status = "timeout";
      systemMessage = `Execution timed out after ${options.timeoutMs}ms (infinite loop or unhandled async operation).`;
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
          language: "Node.js",
          version: "Node.js 22 LTS (Isolated Container)",
          timestamp: new Date().toISOString(),
        },
      }
    );
  }

  private parseNodeDiagnostics(errorText: string): DiagnosticItem[] {
    const items: DiagnosticItem[] = [];
    if (!errorText) return items;

    const regex = /([a-zA-Z0-9_\-./\\]+\.js):(\d+)(?::(\d+))?/gim;
    let match;

    const lines = errorText.trim().split("\n");
    const headerError = lines[0] || "Node.js Error";

    while ((match = regex.exec(errorText)) !== null) {
      const fileName = path.basename(match[1]);
      const line = parseInt(match[2], 10);
      const column = match[3] ? parseInt(match[3], 10) : 1;

      items.push({
        id: `diag-node-${items.length + 1}`,
        file: fileName,
        line: isNaN(line) ? 1 : line,
        column: isNaN(column) ? 1 : column,
        severity: "error",
        message: headerError,
        source: "node",
      });
      break;
    }

    return items;
  }
}
