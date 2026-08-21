import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
} from "../types.js";

export class CssAdapter extends BaseLanguageAdapter {
  public readonly languageId = "css";
  public readonly name = "CSS3 Styling (Preview)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    return {
      available: true,
      version: "CSS3 Cascading Style Sheets",
      details: "Client-side isolated DOM styling preview",
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const startTime = performance.now();
    let cssContent = "";
    let htmlContent = `<div class="container">\n  <h1>CSS Live Preview</h1>\n  <p>Your styles are dynamically injected into this preview canvas.</p>\n  <button class="btn">Sample Button</button>\n  <div class="card">\n    <h3>Preview Card</h3>\n    <p>Inspect typography, spacing, flexbox, and grid styling.</p>\n  </div>\n</div>`;

    for (const file of request.files) {
      if (file.name.endsWith(".css")) {
        cssContent += `\n${file.content}\n`;
      } else if (file.name.endsWith(".html")) {
        htmlContent = file.content;
      }
    }

    const previewDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #fafafa; color: #111; }
    .container { max-width: 600px; margin: 0 auto; }
    .btn { background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
    .card { background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-top: 16px; }
    ${cssContent}
  </style>
</head>
<body>
  ${htmlContent}
</body>
</html>`;

    const durationMs = Math.round(performance.now() - startTime);

    return this.createResponse(
      "success",
      `CSS styles prepared for isolated sandboxed canvas.`,
      "",
      0,
      durationMs,
      [],
      `[SANDBOX] Sandboxed CSS preview initialized.`,
      {
        isClientPreview: true,
        previewHtml: previewDoc,
        metadata: {
          language: "CSS3",
          version: "CSS3",
          timestamp: new Date().toISOString(),
        },
      }
    );
  }
}
