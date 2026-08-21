import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
} from "./types.js";
import { PLAYGROUND_CONFIG } from "./config.js";
import { LanguageAdapterRegistry } from "./adapters/index.js";

export class PlaygroundServerExecutionService {
  /**
   * Validates and executes user code through the appropriate LanguageAdapter sandbox
   */
  public static async execute(
    request: PlaygroundExecutionRequest
  ): Promise<PlaygroundExecutionResponse> {
    // 1. Basic request payload validation
    if (!request || !request.language) {
      return {
        status: "error",
        stdout: "",
        stderr: "Invalid request: Target programming language must be specified.",
        exitCode: -1,
        executionTimeMs: 0,
        diagnostics: [],
        systemMessage: "Execution request payload missing language parameter.",
      };
    }

    if (!Array.isArray(request.files) || request.files.length === 0) {
      return {
        status: "error",
        stdout: "",
        stderr: "No files found in execution payload.",
        exitCode: -1,
        executionTimeMs: 0,
        diagnostics: [],
      };
    }

    // 2. Check limits (files count, file size, total payload)
    if (request.files.length > PLAYGROUND_CONFIG.MAX_FILES_COUNT) {
      return {
        status: "error",
        stdout: "",
        stderr: `Workspace contains too many files (${request.files.length}). Maximum allowed is ${PLAYGROUND_CONFIG.MAX_FILES_COUNT}.`,
        exitCode: -1,
        executionTimeMs: 0,
        diagnostics: [],
      };
    }

    let totalSizeBytes = 0;
    for (const file of request.files) {
      const fileBytes = Buffer.byteLength(file.content || "", "utf-8");
      totalSizeBytes += fileBytes;
      if (fileBytes > PLAYGROUND_CONFIG.MAX_SOURCE_SIZE_BYTES) {
        return {
          status: "error",
          stdout: "",
          stderr: `File "${file.name}" exceeds maximum allowed source size of ${Math.round(PLAYGROUND_CONFIG.MAX_SOURCE_SIZE_BYTES / 1024)} KB.`,
          exitCode: -1,
          executionTimeMs: 0,
          diagnostics: [],
        };
      }
    }

    if (totalSizeBytes > PLAYGROUND_CONFIG.MAX_TOTAL_PAYLOAD_BYTES) {
      return {
        status: "error",
        stdout: "",
        stderr: `Total project payload exceeds maximum allowed size of ${Math.round(PLAYGROUND_CONFIG.MAX_TOTAL_PAYLOAD_BYTES / (1024 * 1024))} MB.`,
        exitCode: -1,
        executionTimeMs: 0,
        diagnostics: [],
      };
    }

    // 3. Resolve Language Adapter
    const adapter = LanguageAdapterRegistry.get(request.language);
    if (!adapter) {
      return {
        status: "runtime_unavailable",
        stdout: "",
        stderr: `Language "${request.language}" is not supported by this execution engine.`,
        exitCode: -1,
        executionTimeMs: 0,
        diagnostics: [],
        systemMessage: `Unrecognized language identifier: ${request.language}.`,
      };
    }

    // 4. Calculate options with bounds
    const timeoutMs = Math.min(
      Math.max(request.timeoutMs || PLAYGROUND_CONFIG.DEFAULT_TIMEOUT_MS, PLAYGROUND_CONFIG.MIN_TIMEOUT_MS),
      PLAYGROUND_CONFIG.MAX_TIMEOUT_MS
    );

    // 5. Execute through adapter
    try {
      return await adapter.execute(request, {
        timeoutMs,
        maxOutputBytes: PLAYGROUND_CONFIG.MAX_OUTPUT_SIZE_BYTES,
      });
    } catch (err: any) {
      console.error(`[Playground Execution Error - ${request.language}]:`, err);
      return {
        status: "error",
        stdout: "",
        stderr: `Internal Execution Exception: ${err.message || "An unexpected error occurred during execution."}`,
        exitCode: -1,
        executionTimeMs: 0,
        diagnostics: [],
        systemMessage: "An internal server error occurred while processing the execution sandbox.",
      };
    }
  }

  /**
   * Returns runtime availability status for all supported languages
   */
  public static async getRuntimesStatus(): Promise<Record<string, { available: boolean; name: string; version?: string; details?: string }>> {
    const statusMap: Record<string, { available: boolean; name: string; version?: string; details?: string }> = {};
    const adapters = LanguageAdapterRegistry.getAll();

    for (const adapter of adapters) {
      try {
        const check = await adapter.isRuntimeAvailable();
        statusMap[adapter.languageId] = {
          name: adapter.name,
          available: check.available,
          version: check.version,
          details: check.details,
        };
      } catch (err) {
        statusMap[adapter.languageId] = {
          name: adapter.name,
          available: false,
          details: "Failed to query runtime status",
        };
      }
    }

    return statusMap;
  }
}
