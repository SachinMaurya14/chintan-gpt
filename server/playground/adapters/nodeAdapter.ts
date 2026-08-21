import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";
import { PlaygroundSandbox } from "../sandbox.js";
import { PLAYGROUND_CONFIG } from "../config.js";
import path from "path";

export class NodeAdapter extends BaseLanguageAdapter {
  public readonly languageId = "node";
  public readonly name = "Node.js (Server Runtime)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    const hasNode = await PlaygroundSandbox.isBinaryAvailable("node");
    if (hasNode) {
      const version = await PlaygroundSandbox.getBinaryVersion("node");
      return { available: true, version, details: "Node.js LTS Environment" };
    }
    return {
      available: false,
      details: "node was not found on system PATH.",
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const runtimeCheck = await this.isRuntimeAvailable();
    if (!runtimeCheck.available) {
      return this.createUnavailableResponse(
        "Node.js",
        "System requires Node.js runtime installed on the container host."
      );
    }

    const { dir } = await PlaygroundSandbox.createTempWorkspace("node");

    try {
      const written = await PlaygroundSandbox.writeProjectFiles(dir, request.files);
      const jsFiles = written.filter((f) => f.endsWith(".js") || f.endsWith(".mjs") || f.endsWith(".cjs") || f.endsWith(".json"));

      if (jsFiles.length === 0) {
        return this.createResponse(
          "error",
          "",
          "No Node.js source files (.js, .json) found in project workspace.",
          -1,
          0
        );
      }

      // Determine entrypoint: activeFileName > server.js > index.js > main.js > first js
      const entryFile =
        (request.activeFileName && jsFiles.includes(request.activeFileName))
          ? request.activeFileName
          : jsFiles.includes("server.js")
          ? "server.js"
          : jsFiles.includes("index.js")
          ? "index.js"
          : jsFiles.includes("main.js")
          ? "main.js"
          : jsFiles.find((f) => f.endsWith(".js")) || jsFiles[0];

      // Execute in isolated sandbox
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
        systemMessage = `Node.js execution timed out after ${options.timeoutMs}ms (active server listener or infinite loop).`;
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
