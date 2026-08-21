import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";
import { PlaygroundSandbox } from "../sandbox.js";
import { PLAYGROUND_CONFIG } from "../config.js";
import path from "path";

export class JavaScriptAdapter extends BaseLanguageAdapter {
  public readonly languageId = "javascript";
  public readonly name = "JavaScript (V8 / Node)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const hasNode = await PlaygroundSandbox.isBinaryAvailable("node");
    if (hasNode) {
      const version = await PlaygroundSandbox.getBinaryVersion("node");
      return { available: true, version, details: "Node.js JavaScript Engine" };
    }
    return {
      available: false,
      details: "node binary was not found on system PATH.",
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const runtimeCheck = await this.isRuntimeAvailable();
    if (!runtimeCheck.available) {
      return this.createUnavailableResponse(
        "JavaScript / Node.js",
        "System requires Node.js installed on the container host."
      );
    }

    const { dir } = await PlaygroundSandbox.createTempWorkspace("js");

    try {
      const written = await PlaygroundSandbox.writeProjectFiles(dir, request.files);
      const jsFiles = written.filter((f) => f.endsWith(".js") || f.endsWith(".mjs") || f.endsWith(".cjs"));

      if (jsFiles.length === 0) {
        return this.createResponse(
          "error",
          "",
          "No JavaScript source files (.js) found in project workspace.",
          -1,
          0
        );
      }

      const entryFile =
        (request.activeFileName && jsFiles.includes(request.activeFileName))
          ? request.activeFileName
          : jsFiles.includes("index.js")
          ? "index.js"
          : jsFiles.includes("script.js")
          ? "script.js"
          : jsFiles[0];

      // Execute in isolated child process with memory limits
      const runResult = await PlaygroundSandbox.executeCommand(
        "node",
        [`--max-old-space-size=${PLAYGROUND_CONFIG.NODE_MAX_OLD_SPACE_MB}`, entryFile],
        {
          cwd: dir,
          stdin: request.stdin,
          timeoutMs: options.timeoutMs,
          maxOutputBytes: options.maxOutputBytes,
        }
      );

      const sanitizedStdout = PlaygroundSandbox.sanitizeOutput(runResult.stdout, dir);
      const sanitizedStderr = PlaygroundSandbox.sanitizeOutput(runResult.stderr, dir);
      const diagnostics = this.parseNodeDiagnostics(sanitizedStderr);

      let status: PlaygroundExecutionResponse["status"] = "success";
      let systemMessage: string | undefined;

      if (runResult.timedOut) {
        status = "timeout";
        systemMessage = `Execution timed out after ${options.timeoutMs}ms (infinite loop or hanging promise).`;
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
            language: "JavaScript",
            version: runtimeCheck.version,
            timestamp: new Date().toISOString(),
          },
        }
      );
    } finally {
      await PlaygroundSandbox.cleanup(dir);
    }
  }

  private parseNodeDiagnostics(errorText: string): DiagnosticItem[] {
    const items: DiagnosticItem[] = [];
    if (!errorText) return items;

    // Pattern: /path/to/file.js:5:10 or file.js:5
    const regex = /([a-zA-Z0-9_\-./\\]+\.js):(\d+)(?::(\d+))?/gim;
    let match;

    const lines = errorText.trim().split("\n");
    const headerError = lines[0] || "JavaScript Error";

    while ((match = regex.exec(errorText)) !== null) {
      const fileName = path.basename(match[1]);
      const line = parseInt(match[2], 10);
      const column = match[3] ? parseInt(match[3], 10) : 1;

      items.push({
        id: `diag-js-${items.length + 1}`,
        file: fileName,
        line: isNaN(line) ? 1 : line,
        column: isNaN(column) ? 1 : column,
        severity: "error",
        message: headerError,
        source: "node",
      });
      break; // Only capture primary failure site
    }

    return items;
  }
}
