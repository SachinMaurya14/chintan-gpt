import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";
import { PlaygroundSandbox } from "../sandbox.js";
import path from "path";

export class KotlinAdapter extends BaseLanguageAdapter {
  public readonly languageId = "kotlin";
  public readonly name = "Kotlin (kotlinc)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const hasKotlinc = await PlaygroundSandbox.isBinaryAvailable("kotlinc");
    if (hasKotlinc) {
      const version = await PlaygroundSandbox.getBinaryVersion("kotlinc", "-version");
      return { available: true, version, details: "Kotlin Compiler" };
    }

    return {
      available: false,
      details: "kotlinc was not found on system PATH.",
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const runtimeCheck = await this.isRuntimeAvailable();
    if (!runtimeCheck.available) {
      return this.createUnavailableResponse(
        "Kotlin (kotlinc)",
        "System requires kotlinc and Java runtime installed on the container host."
      );
    }

    const { dir } = await PlaygroundSandbox.createTempWorkspace("kt");

    try {
      const written = await PlaygroundSandbox.writeProjectFiles(dir, request.files);
      const ktFiles = written.filter((f) => f.endsWith(".kt"));

      if (ktFiles.length === 0) {
        return this.createResponse(
          "error",
          "",
          "No Kotlin source files (.kt) found in project workspace.",
          -1,
          0
        );
      }

      // 1. Compilation
      const compileArgs = [...ktFiles, "-include-runtime", "-d", "app.jar"];
      const compileResult = await PlaygroundSandbox.executeCommand("kotlinc", compileArgs, {
        cwd: dir,
        timeoutMs: 15000,
        maxOutputBytes: options.maxOutputBytes,
      });

      const sanitizedCompileErr = PlaygroundSandbox.sanitizeOutput(compileResult.stderr, dir);
      const diagnostics = this.parseKotlincDiagnostics(sanitizedCompileErr);

      if (compileResult.exitCode !== 0 || compileResult.timedOut) {
        return this.createResponse(
          "compile_error",
          "",
          sanitizedCompileErr || "Kotlin compilation failed.",
          compileResult.exitCode,
          compileResult.durationMs,
          diagnostics,
          compileResult.timedOut ? "Compilation timed out." : undefined,
          {
            metadata: {
              language: "Kotlin",
              version: runtimeCheck.version,
              timestamp: new Date().toISOString(),
            },
          }
        );
      }

      // 2. Execution
      const runResult = await PlaygroundSandbox.executeCommand("java", ["-jar", "app.jar"], {
        cwd: dir,
        stdin: request.stdin,
        timeoutMs: options.timeoutMs,
        maxOutputBytes: options.maxOutputBytes,
      });

      const sanitizedStdout = PlaygroundSandbox.sanitizeOutput(runResult.stdout, dir);
      const sanitizedStderr = PlaygroundSandbox.sanitizeOutput(runResult.stderr, dir);

      let status: PlaygroundExecutionResponse["status"] = "success";
      let systemMessage: string | undefined;

      if (runResult.timedOut) {
        status = "timeout";
        systemMessage = `Execution timed out after ${options.timeoutMs}ms.`;
      } else if (runResult.exitCode !== 0) {
        status = "runtime_error";
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
            version: runtimeCheck.version,
            timestamp: new Date().toISOString(),
          },
        }
      );
    } finally {
      await PlaygroundSandbox.cleanup(dir);
    }
  }

  private parseKotlincDiagnostics(errorText: string): DiagnosticItem[] {
    const items: DiagnosticItem[] = [];
    if (!errorText) return items;

    // Pattern: Main.kt:3:5: error: unresolved reference: x
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
