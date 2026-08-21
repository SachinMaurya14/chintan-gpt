import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";
import { PlaygroundSandbox } from "../sandbox.js";
import path from "path";

export class PythonAdapter extends BaseLanguageAdapter {
  public readonly languageId = "python";
  public readonly name = "Python 3";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const hasPython = await PlaygroundSandbox.isBinaryAvailable("python3");
    if (hasPython) {
      const version = await PlaygroundSandbox.getBinaryVersion("python3");
      return { available: true, version, details: "CPython 3" };
    }
    return {
      available: false,
      details: "python3 was not found on the system PATH.",
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const runtimeCheck = await this.isRuntimeAvailable();
    if (!runtimeCheck.available) {
      return this.createUnavailableResponse(
        "Python 3",
        "System requires python3 installed on the container host."
      );
    }

    const { dir } = await PlaygroundSandbox.createTempWorkspace("py");

    try {
      const written = await PlaygroundSandbox.writeProjectFiles(dir, request.files);
      const pyFiles = written.filter((f) => f.endsWith(".py"));

      if (pyFiles.length === 0) {
        return this.createResponse(
          "error",
          "",
          "No Python source files (.py) found in project workspace.",
          -1,
          0
        );
      }

      // Determine entry file: prefer activeFileName, or main.py, or first py file
      const entryFile =
        (request.activeFileName && pyFiles.includes(request.activeFileName))
          ? request.activeFileName
          : pyFiles.includes("main.py")
          ? "main.py"
          : pyFiles[0];

      // Execute with unbuffered Python 3
      const runResult = await PlaygroundSandbox.executeCommand(
        "python3",
        ["-u", entryFile],
        {
          cwd: dir,
          stdin: request.stdin,
          timeoutMs: options.timeoutMs,
          maxOutputBytes: options.maxOutputBytes,
        }
      );

      const sanitizedStdout = PlaygroundSandbox.sanitizeOutput(runResult.stdout, dir);
      const sanitizedStderr = PlaygroundSandbox.sanitizeOutput(runResult.stderr, dir);
      const diagnostics = this.parsePythonDiagnostics(sanitizedStderr);

      let status: PlaygroundExecutionResponse["status"] = "success";
      let systemMessage: string | undefined;

      if (runResult.timedOut) {
        status = "timeout";
        systemMessage = `Execution timed out after ${options.timeoutMs}ms (infinite loop or unhandled input prompt).`;
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
            version: runtimeCheck.version,
            timestamp: new Date().toISOString(),
          },
        }
      );
    } finally {
      await PlaygroundSandbox.cleanup(dir);
    }
  }

  /**
   * Parses Python Traceback and SyntaxError diagnostics
   */
  private parsePythonDiagnostics(errorText: string): DiagnosticItem[] {
    const items: DiagnosticItem[] = [];
    if (!errorText) return items;

    // Pattern 1: Traceback (most recent call last): File "main.py", line 5, in ...
    const fileLineRegex = /File\s+["']([^"']+)["'],\s+line\s+(\d+)(?:,\s+in\s+([^\n]+))?/gi;
    let match;

    // Also look for error name on the last line (e.g. ZeroDivisionError: division by zero)
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
