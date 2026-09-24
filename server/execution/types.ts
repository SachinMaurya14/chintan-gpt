export interface ExecutionFile {
  name: string;
  content: string;
}

export interface ExecutionRequest {
  language: string;
  sourceCode?: string;
  files?: ExecutionFile[];
  stdin?: string;
  timeoutMs?: number;
  activeFileName?: string;
}

export interface ExecutionResult {
  success: boolean;
  status: "success" | "timeout" | "compile_error" | "runtime_error" | "runtime_unavailable" | "error";
  stdout: string;
  stderr: string;
  compileOutput?: string;
  exitCode: number | null;
  executionTimeMs: number;
  memoryKb?: number;
  systemMessage?: string;
  error?: string;
}

export interface IExecutionProvider {
  readonly name: string;
  isConfigured(): boolean;
  checkHealth(): Promise<{ available: boolean; version?: string; details?: string }>;
  execute(req: ExecutionRequest): Promise<ExecutionResult>;
}
