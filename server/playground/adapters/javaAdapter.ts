import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";
import { IsolatedExecutionClient } from "../sandbox.js";
import path from "path";

export class JavaAdapter extends BaseLanguageAdapter {
  public readonly languageId = "java";
  public readonly name = "Java (OpenJDK)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const health = await IsolatedExecutionClient.checkServiceHealth();
    return {
      available: health.available,
      version: health.version || "OpenJDK 17.0.6 (Isolated Container)",
      details: health.details,
    };
  }

  private normalizeJavaSource(source: string): string {
    // If source has a public class not named Main, change it to Main for single-file compilation
    if (/public\s+class\s+([A-Za-z0-9_]+)/.test(source)) {
      return source.replace(/public\s+class\s+([A-Za-z0-9_]+)/, (match, className) => {
        if (className === "Main") return match;
        return "public class Main";
      });
    }
    // If no public class, ensure class Main exists or wrap if necessary
    return source;
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const validation = IsolatedExecutionClient.validatePayload(request.files, request.stdin);
    if (!validation.valid) {
      return this.createResponse("error", "", validation.error || "Invalid payload.", -1, 0);
    }

    const javaFiles = request.files.filter((f) => f.name.endsWith(".java"));
    if (javaFiles.length === 0) {
      return this.createResponse(
        "error",
        "",
        "No Java source files (.java) found in project workspace.",
        -1,
        0
      );
    }

    let sourceCode = IsolatedExecutionClient.bundleFiles("java", request.files, request.activeFileName);
    sourceCode = this.normalizeJavaSource(sourceCode);

    const runResult = await IsolatedExecutionClient.execute({
      language: "java",
      sourceCode,
      stdin: request.stdin,
      timeoutMs: options.timeoutMs,
    });

    const sanitizedStdout = IsolatedExecutionClient.sanitizeOutput(runResult.stdout, options.maxOutputBytes);
    const sanitizedStderr = IsolatedExecutionClient.sanitizeOutput(runResult.stderr, options.maxOutputBytes);
    const diagnostics = this.parseJavacDiagnostics(sanitizedStderr);

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
          language: "Java",
          version: "OpenJDK 17 (Isolated Container)",
          timestamp: new Date().toISOString(),
        },
      }
    );
  }

  private parseJavacDiagnostics(errorText: string): DiagnosticItem[] {
    const items: DiagnosticItem[] = [];
    if (!errorText) return items;

    const regex = /^([a-zA-Z0-9_\-./\\]+\.java):(\d+):\s+(error|warning):\s+(.*)$/gim;
    let match;

    while ((match = regex.exec(errorText)) !== null) {
      const fileName = path.basename(match[1]);
      const line = parseInt(match[2], 10);
      const rawSeverity = match[3].toLowerCase();
      const message = match[4].trim();

      items.push({
        id: `diag-java-${items.length + 1}`,
        file: fileName,
        line: isNaN(line) ? 1 : line,
        column: 1,
        severity: rawSeverity === "warning" ? "warning" : "error",
        message,
        source: "javac",
      });
    }

    return items;
  }
}
