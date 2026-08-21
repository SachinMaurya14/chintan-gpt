import {
  ILanguageAdapter,
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
  DiagnosticItem,
} from "../types.js";

export abstract class BaseLanguageAdapter implements ILanguageAdapter {
  public abstract readonly languageId: string;
  public abstract readonly name: string;

  public abstract isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }>;

  public abstract execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse>;

  /**
   * Helper to format standard execution response
   */
  protected createResponse(
    status: PlaygroundExecutionResponse["status"],
    stdout: string,
    stderr: string,
    exitCode: number | null,
    executionTimeMs: number,
    diagnostics: DiagnosticItem[] = [],
    systemMessage?: string,
    extra?: Partial<PlaygroundExecutionResponse>
  ): PlaygroundExecutionResponse {
    return {
      status,
      stdout: stdout || "",
      stderr: stderr || "",
      exitCode,
      executionTimeMs,
      diagnostics,
      systemMessage,
      ...extra,
    };
  }

  /**
   * Helper for runtime unavailable responses (NO FAKE EXECUTION)
   */
  protected createUnavailableResponse(
    runtimeName: string,
    installGuide: string
  ): PlaygroundExecutionResponse {
    return {
      status: "runtime_unavailable",
      stdout: "",
      stderr: `${runtimeName} runtime / compiler is not installed or available on this host environment.`,
      exitCode: null,
      executionTimeMs: 0,
      diagnostics: [],
      systemMessage: `[ENVIRONMENT NOTICE] The ${runtimeName} runtime is not currently provisioned.\n${installGuide}`,
    };
  }
}
