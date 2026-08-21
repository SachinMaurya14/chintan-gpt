import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
} from "../types.js";

export class HtmlAdapter extends BaseLanguageAdapter {
  public readonly languageId = "html";
  public readonly name = "HTML5 Standard (Isolated Preview)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    return {
      available: true,
      version: "HTML5 W3C Standard",
      details: "Client-side sandboxed iframe preview runtime",
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const startTime = performance.now();

    // Assemble multi-file HTML workspace (e.g. index.html + style.css + script.js)
    let mainHtml = "";
    let linkedCss = "";
    let linkedJs = "";

    for (const file of request.files) {
      if (file.name.endsWith(".html")) {
        if (!mainHtml || file.name === "index.html" || file.name === request.activeFileName) {
          mainHtml = file.content;
        }
      } else if (file.name.endsWith(".css")) {
        linkedCss += `\n/* ${file.name} */\n${file.content}\n`;
      } else if (file.name.endsWith(".js")) {
        linkedJs += `\n// ${file.name}\n${file.content}\n`;
      }
    }

    if (!mainHtml.trim()) {
      mainHtml = "<!DOCTYPE html>\n<html>\n<head></head>\n<body>\n</body>\n</html>";
    }

    // Inject CSS & JS into HTML head/body safely for sandboxed iframe
    let bundledHtml = mainHtml;
    if (linkedCss.trim()) {
      bundledHtml = bundledHtml.includes("</head>")
        ? bundledHtml.replace("</head>", `<style>${linkedCss}</style></head>`)
        : `<style>${linkedCss}</style>` + bundledHtml;
    }
    if (linkedJs.trim()) {
      bundledHtml = bundledHtml.includes("</body>")
        ? bundledHtml.replace("</body>", `<script>${linkedJs}</script></body>`)
        : bundledHtml + `<script>${linkedJs}</script>`;
    }

    const durationMs = Math.round(performance.now() - startTime);

    return this.createResponse(
      "success",
      `Rendered ${request.files.length} workspace file(s) into isolated client preview.`,
      "",
      0,
      durationMs,
      [],
      `[SANDBOX] Sandboxed browser preview prepared.`,
      {
        isClientPreview: true,
        previewHtml: bundledHtml,
        metadata: {
          language: "HTML5",
          version: "Living Standard",
          timestamp: new Date().toISOString(),
        },
      }
    );
  }
}
