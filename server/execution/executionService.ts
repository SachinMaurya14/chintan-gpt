import { ExecutionRequest, ExecutionResult, IExecutionProvider } from "./types.js";
import { ExecutionValidator } from "./validator.js";
import { Judge0ExecutionProvider } from "./providers/judge0Provider.js";
import { PistonExecutionProvider } from "./providers/pistonProvider.js";
import { NullExecutionProvider } from "./providers/nullProvider.js";

export class UnifiedExecutionService {
  private static providerInstance: IExecutionProvider | null = null;
  private static lastProviderConfig = "";

  /**
   * Resolves the configured execution provider based on environment variables:
   * - CODE_EXECUTION_PROVIDER: 'judge0' | 'piston' | 'none'
   * - CODE_EXECUTION_BASE_URL: Base URL of self-hosted Judge0 or Piston cluster
   * - CODE_EXECUTION_API_KEY: Optional authentication token or secret
   * 
   * STRICT SECURITY RULE:
   * If CODE_EXECUTION_BASE_URL is not set or provider is 'none', returns NullExecutionProvider (fails closed).
   * Host processes (spawn, exec, node:vm) are NEVER executed.
   */
  public static getProvider(): IExecutionProvider {
    const providerType = (process.env.CODE_EXECUTION_PROVIDER || "").toLowerCase().trim();
    const baseUrl = (process.env.CODE_EXECUTION_BASE_URL || process.env.JUDGE0_API_URL || "").trim();
    const apiKey = (process.env.CODE_EXECUTION_API_KEY || process.env.JUDGE0_API_KEY || "").trim();

    const configKey = `${providerType}:${baseUrl}:${apiKey}`;

    if (this.providerInstance && this.lastProviderConfig === configKey) {
      return this.providerInstance;
    }

    this.lastProviderConfig = configKey;

    if (providerType === "none" || !baseUrl) {
      this.providerInstance = new NullExecutionProvider();
      return this.providerInstance;
    }

    if (providerType === "piston") {
      this.providerInstance = new PistonExecutionProvider(baseUrl, apiKey);
    } else {
      // Default to Judge0 provider when base URL is configured
      this.providerInstance = new Judge0ExecutionProvider(baseUrl, apiKey);
    }

    return this.providerInstance;
  }

  /**
   * Main entry point for all untrusted user-submitted code.
   * Enforces server-side input validation, dispatches over HTTP to isolated cluster,
   * and guarantees a fail-closed response if the executor is unavailable or unconfigured.
   */
  public static async execute(rawRequest: any): Promise<ExecutionResult> {
    // 1. Strict Server-Side Input Validation
    const validation = ExecutionValidator.validate(rawRequest);
    if (!validation.valid || !validation.normalizedRequest) {
      return {
        success: false,
        status: "error",
        stdout: "",
        stderr: validation.error || "Input validation failed.",
        exitCode: -1,
        executionTimeMs: 0,
        systemMessage: "Request rejected by server-side validation.",
        error: validation.error || "Validation error"
      };
    }

    const provider = this.getProvider();

    // 2. Enforce Fail-Closed: If provider is unconfigured, reject immediately
    if (!provider.isConfigured()) {
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

    // 3. Dispatch to remote isolated execution cluster over HTTP
    try {
      const result = await provider.execute(validation.normalizedRequest);

      // Final security pass on outputs to prevent internal path leaks
      return {
        ...result,
        stdout: ExecutionValidator.sanitizeOutput(result.stdout),
        stderr: ExecutionValidator.sanitizeOutput(result.stderr),
        compileOutput: result.compileOutput ? ExecutionValidator.sanitizeOutput(result.compileOutput) : undefined,
      };
    } catch (err: any) {
      return {
        success: false,
        status: "runtime_unavailable",
        stdout: "",
        stderr: `Remote execution cluster error: ${err.message || "Unknown error"}. Untrusted host execution is permanently disabled for security.`,
        exitCode: -1,
        executionTimeMs: 0,
        systemMessage: "Secure remote executor failed.",
        error: "Execution service failure"
      };
    }
  }

  /**
   * Returns runtime health status without revealing server internals
   */
  public static async getHealthStatus(): Promise<{
    configured: boolean;
    provider: string;
    available: boolean;
    details: string;
  }> {
    const provider = this.getProvider();
    const configured = provider.isConfigured();

    if (!configured) {
      return {
        configured: false,
        provider: provider.name,
        available: false,
        details: "Secure code execution service is not configured"
      };
    }

    const health = await provider.checkHealth();
    return {
      configured: true,
      provider: provider.name,
      available: health.available,
      details: health.details || (health.available ? "Online" : "Unavailable")
    };
  }
}
