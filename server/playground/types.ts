export interface PlaygroundFilePayload {
  name: string;
  content: string;
  extension?: string;
  isEntry?: boolean;
}

export interface PlaygroundExecutionRequest {
  language: string;
  files: PlaygroundFilePayload[];
  activeFileName?: string;
  stdin?: string;
  timeoutMs?: number;
}

export interface DiagnosticItem {
  id: string;
  file: string;
  line: number;
  column: number;
  severity: "error" | "warning" | "info";
  message: string;
  source: string;
  errorCode?: string;
}

export type ExecutionStatusType =
  | "success"
  | "compile_error"
  | "runtime_error"
  | "timeout"
  | "memory_limit"
  | "runtime_unavailable"
  | "error";

export interface PlaygroundExecutionResponse {
  status: ExecutionStatusType;
  stdout: string;
  stderr: string;
  exitCode: number | null;
  executionTimeMs: number;
  systemMessage?: string;
  diagnostics: DiagnosticItem[];
  isClientPreview?: boolean;
  previewHtml?: string;
  metadata?: {
    language: string;
    runtime?: string;
    version?: string;
    timestamp: string;
  };
}

export interface ILanguageAdapter {
  readonly languageId: string;
  readonly name: string;
  isRuntimeAvailable(): Promise<{ available: boolean; version?: string; details?: string }>;
  execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse>;
}
