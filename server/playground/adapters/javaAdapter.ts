import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
  PlaygroundFilePayload,
} from "../types.js";
import { PlaygroundSandbox } from "../sandbox.js";
import { PLAYGROUND_CONFIG } from "../config.js";
import path from "path";

export class JavaAdapter extends BaseLanguageAdapter {
  public readonly languageId = "java";
  public readonly name = "Java (OpenJDK)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const hasJavac = await PlaygroundSandbox.isBinaryAvailable("javac");
    const hasJava = await PlaygroundSandbox.isBinaryAvailable("java");

    if (hasJavac && hasJava) {
      const version = await PlaygroundSandbox.getBinaryVersion("javac", "-version");
      return { available: true, version, details: "OpenJDK Compiler" };
    }

    return {
      available: false,
      details: "javac / java was not found on system PATH.",
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const runtimeCheck = await this.isRuntimeAvailable();
    if (!runtimeCheck.available) {
      return this.createUnavailableResponse(
        "Java (OpenJDK)",
        "System requires OpenJDK / javac installed on the container host."
      );
    }

    const { dir } = await PlaygroundSandbox.createTempWorkspace("java");

    try {
      // Normalize Java file names to match public class names if needed
      const normalizedFiles: PlaygroundFilePayload[] = request.files.map((file) => {
        if (file.name.endsWith(".java")) {
          const publicClassMatch = file.content.match(/public\s+class\s+([A-Za-z0-9_]+)/);
          if (publicClassMatch && publicClassMatch[1]) {
            const expectedName = `${publicClassMatch[1]}.java`;
            return { ...file, name: expectedName };
          }
        }
        return file;
      });

      const written = await PlaygroundSandbox.writeProjectFiles(dir, normalizedFiles);
      const javaFiles = written.filter((f) => f.endsWith(".java"));

      if (javaFiles.length === 0) {
        return this.createResponse(
          "error",
          "",
          "No Java source files (.java) found in project workspace.",
          -1,
          0
        );
      }

      // 1. Compilation
      const compileArgs = ["-encoding", "UTF-8", ...javaFiles];
      const compileResult = await PlaygroundSandbox.executeCommand("javac", compileArgs, {
        cwd: dir,
        timeoutMs: 10000,
        maxOutputBytes: options.maxOutputBytes,
      });

      const sanitizedCompileErr = PlaygroundSandbox.sanitizeOutput(compileResult.stderr, dir);
      const diagnostics = this.parseJavacDiagnostics(sanitizedCompileErr);

      if (compileResult.exitCode !== 0 || compileResult.timedOut) {
        return this.createResponse(
          "compile_error",
          "",
          sanitizedCompileErr || "Java compilation failed with errors.",
          compileResult.exitCode,
          compileResult.durationMs,
          diagnostics,
          compileResult.timedOut ? "Compilation timed out." : undefined,
          {
            metadata: {
              language: "Java",
              version: runtimeCheck.version,
              timestamp: new Date().toISOString(),
            },
          }
        );
      }

      // 2. Identify main class to execute
      let mainClass = "Main";
      for (const file of normalizedFiles) {
        if (file.content.includes("public static void main")) {
          const classMatch = file.content.match(/class\s+([A-Za-z0-9_]+)/);
          if (classMatch && classMatch[1]) {
            mainClass = classMatch[1];
            break;
          }
        }
      }

      // 3. Execution
      const runArgs = [
        `-Xmx${PLAYGROUND_CONFIG.JAVA_MAX_HEAP_MB}m`,
        "-Dfile.encoding=UTF-8",
        mainClass,
      ];

      const runResult = await PlaygroundSandbox.executeCommand("java", runArgs, {
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
        systemMessage = `Execution timed out after ${options.timeoutMs}ms (infinite loop or blocked I/O).`;
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
            language: "Java",
            version: runtimeCheck.version,
            timestamp: new Date().toISOString(),
          },
        }
      );
    } finally {
      await PlaygroundSandbox.cleanup(dir);
    }
  }

  private parseJavacDiagnostics(errorText: string): DiagnosticItem[] {
    const items: DiagnosticItem[] = [];
    if (!errorText) return items;

    // Pattern: Main.java:7: error: ';' expected
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
