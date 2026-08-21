import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";
import { PlaygroundSandbox } from "../sandbox.js";
import path from "path";

export class CppAdapter extends BaseLanguageAdapter {
  public readonly languageId = "cpp";
  public readonly name = "C++ (GCC/Clang)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const hasGpp = await PlaygroundSandbox.isBinaryAvailable("g++");
    if (hasGpp) {
      const version = await PlaygroundSandbox.getBinaryVersion("g++");
      return { available: true, version, details: "GCC C++ Compiler" };
    }

    const hasClang = await PlaygroundSandbox.isBinaryAvailable("clang++");
    if (hasClang) {
      const version = await PlaygroundSandbox.getBinaryVersion("clang++");
      return { available: true, version, details: "Clang++ Compiler" };
    }

    return {
      available: false,
      details: "Neither g++ nor clang++ was found on system PATH.",
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const runtimeCheck = await this.isRuntimeAvailable();
    if (!runtimeCheck.available) {
      return this.createUnavailableResponse(
        "C++ (g++)",
        "System requires g++ or clang++ installed on the container host."
      );
    }

    const { dir, id } = await PlaygroundSandbox.createTempWorkspace("cpp");

    try {
      // 1. Write workspace files
      const written = await PlaygroundSandbox.writeProjectFiles(dir, request.files);
      const cppFiles = written.filter((f) => f.endsWith(".cpp") || f.endsWith(".cc") || f.endsWith(".c"));

      if (cppFiles.length === 0) {
        return this.createResponse(
          "error",
          "",
          "No C++ source files (.cpp, .cc) found in project workspace.",
          -1,
          0
        );
      }

      // 2. Compilation phase
      const compilerBin = (await PlaygroundSandbox.isBinaryAvailable("g++")) ? "g++" : "clang++";
      const compileArgs = [
        "-std=c++20",
        "-O2",
        "-Wall",
        ...cppFiles,
        "-o",
        "main_exec",
      ];

      const compileResult = await PlaygroundSandbox.executeCommand(compilerBin, compileArgs, {
        cwd: dir,
        timeoutMs: 10000,
        maxOutputBytes: options.maxOutputBytes,
      });

      // Parse diagnostics from compiler output
      const sanitizedCompileErr = PlaygroundSandbox.sanitizeOutput(compileResult.stderr, dir);
      const diagnostics = this.parseCompilerDiagnostics(sanitizedCompileErr);

      if (compileResult.exitCode !== 0 || compileResult.timedOut) {
        return this.createResponse(
          "compile_error",
          "",
          sanitizedCompileErr || "Compilation failed with errors.",
          compileResult.exitCode,
          compileResult.durationMs,
          diagnostics,
          compileResult.timedOut ? "Compilation timed out." : undefined,
          {
            metadata: {
              language: "C++",
              version: runtimeCheck.version,
              timestamp: new Date().toISOString(),
            },
          }
        );
      }

      // 3. Execution phase
      const runResult = await PlaygroundSandbox.executeCommand("./main_exec", [], {
        cwd: dir,
        stdin: request.stdin,
        timeoutMs: options.timeoutMs,
        maxOutputBytes: options.maxOutputBytes,
      });

      const sanitizedStdout = PlaygroundSandbox.sanitizeOutput(runResult.stdout, dir);
      let sanitizedStderr = PlaygroundSandbox.sanitizeOutput(runResult.stderr, dir);

      let status: PlaygroundExecutionResponse["status"] = "success";
      let systemMessage: string | undefined;

      if (runResult.timedOut) {
        status = "timeout";
        systemMessage = `Execution timed out after ${options.timeoutMs}ms (infinite loop or blocked I/O).`;
      } else if (runResult.signal) {
        status = "runtime_error";
        sanitizedStderr += `\nProcess terminated with signal: ${runResult.signal} (e.g. Segmentation fault or floating-point error).`;
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
            language: "C++",
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
   * Parses GCC/Clang standard compiler diagnostic messages
   * Example: main.cpp:8:15: error: expected ';' before 'return'
   */
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
