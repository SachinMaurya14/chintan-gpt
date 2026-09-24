import { IExecutionProvider, ExecutionRequest, ExecutionResult } from "../types.js";

/**
 * NullExecutionProvider: Active when no remote isolated execution provider is configured.
 * 
 * STRICT SECURITY PRINCIPLE:
 * Fails closed immediately. Never executes untrusted code locally on the host server.
 */
export class NullExecutionProvider implements IExecutionProvider {
  public readonly name = "none";

  public isConfigured(): boolean {
    return false;
  }

  public async checkHealth(): Promise<{ available: boolean; version?: string; details?: string }> {
    return {
      available: false,
      details: "Secure code execution service is not configured. Set CODE_EXECUTION_BASE_URL to an isolated execution cluster (Judge0 or Piston)."
    };
  }

  public async execute(_req: ExecutionRequest): Promise<ExecutionResult> {
    return {
      success: false,
      status: "runtime_unavailable",
      stdout: "",
      stderr: "Secure code execution service is not configured. Untrusted host execution is permanently disabled for security.",
      exitCode: -1,
      executionTimeMs: 0,
      systemMessage: "Secure code execution service is not configured.",
      error: "Secure code execution service is not configured"
    };
  }
}
