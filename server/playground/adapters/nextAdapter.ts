import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
} from "../types.js";

export class NextAdapter extends BaseLanguageAdapter {
  public readonly languageId = "nextjs";
  public readonly name = "Next.js (App Router / Pages Router)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    // A complete Next.js production/dev server requires a dedicated isolated container with node_modules + Next daemon.
    return {
      available: false,
      details: "Next.js full-stack SSR server container is not provisioned on this single-process container host.",
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    // Strictly comply with NO FAKE EXECUTION mandate
    const fileCount = request.files.length;
    const structureSummary = request.files.map((f) => f.name).join(", ");

    return this.createResponse(
      "runtime_unavailable",
      "",
      "Next.js full-stack project runtime (App Router / SSR) is not currently available in this deployment environment.\n\nNext.js requires a multi-threaded Node.js server container with build-step caching and Next server instances.",
      null,
      0,
      [],
      `[NEXT.JS ARCHITECTURE NOTICE]\nReceived project workspace with ${fileCount} file(s): [${structureSummary}].\n\nFull Next.js server compilation requires an isolated Next daemon container. To experiment with client-side React UI components in this sandbox, switch language to 'React'.`
    );
  }
}
