import { BaseLanguageAdapter } from "./baseAdapter.js";
import {
  PlaygroundExecutionRequest,
  PlaygroundExecutionResponse,
} from "../types.js";

export class ReactAdapter extends BaseLanguageAdapter {
  public readonly languageId = "react";
  public readonly name = "React (Sandboxed JSX Preview)";

  public async isRuntimeAvailable(): Promise<{
    available: boolean;
    version?: string;
    details?: string;
  }> {
    return {
      available: true,
      version: "React 19 / JSX Standalone",
      details: "Client-side isolated iframe React runtime",
    };
  }

  public async execute(
    request: PlaygroundExecutionRequest,
    options: { timeoutMs: number; maxOutputBytes: number }
  ): Promise<PlaygroundExecutionResponse> {
    const startTime = performance.now();

    // Assemble JSX/JS code and CSS styles
    let jsxCode = "";
    let cssStyles = "";

    for (const file of request.files) {
      if (file.name.endsWith(".jsx") || file.name.endsWith(".tsx") || file.name.endsWith(".js")) {
        if (!jsxCode || file.name === "App.jsx" || file.name === request.activeFileName) {
          jsxCode = file.content;
        }
      } else if (file.name.endsWith(".css")) {
        cssStyles += `\n/* ${file.name} */\n${file.content}\n`;
      }
    }

    if (!jsxCode.trim()) {
      jsxCode = `export default function App() {\n  return (\n    <div style={{ padding: 20 }}>\n      <h2>React Sandbox</h2>\n      <p>Start editing App.jsx to render dynamic React components.</p>\n    </div>\n  );\n}`;
    }

    // Wrap the React component in a self-contained isolated HTML document with Babel transpilation and error catching
    const previewDocument = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://unpkg.com/react@18/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js" crossorigin></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; background: #fafafa; color: #09090b; }
    #root { min-height: 100vh; }
    #react-error-boundary { display: none; padding: 20px; background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; margin: 16px; border-radius: 8px; font-family: monospace; font-size: 13px; }
    ${cssStyles}
  </style>
</head>
<body>
  <div id="root"></div>
  <div id="react-error-boundary"></div>

  <script>
    window.onerror = function(msg, url, line, col, error) {
      var errBox = document.getElementById("react-error-boundary");
      if (errBox) {
        errBox.style.display = "block";
        errBox.innerHTML = "<strong>Runtime Error:</strong> " + msg + "<br/><small>Line " + line + ", Column " + col + "</small>";
      }
    };
  </script>

  <script type="text/babel">
    const { useState, useEffect, useRef, useMemo, useCallback } = React;

    try {
      ${jsxCode.replace(/export\s+default\s+function\s+([A-Za-z0-9_]+)/g, "function $1")
              .replace(/export\s+default\s+class\s+([A-Za-z0-9_]+)/g, "class $1")
              .replace(/export\s+default\s+([A-Za-z0-9_]+);?/g, "window.__DefaultExport = $1;")}

      let ComponentToMount = typeof App !== 'undefined' ? App : (typeof window.__DefaultExport !== 'undefined' ? window.__DefaultExport : null);

      if (ComponentToMount) {
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<ComponentToMount />);
      } else {
        document.getElementById('root').innerHTML = '<div style="padding: 20px; color: #666;">No default component found to render. Define an <code>App</code> function or export default component.</div>';
      }
    } catch (err) {
      const errBox = document.getElementById("react-error-boundary");
      if (errBox) {
        errBox.style.display = "block";
        errBox.innerHTML = "<strong>JSX Compilation / Evaluation Error:</strong><pre>" + err.message + "</pre>";
      }
    }
  </script>
</body>
</html>`;

    const durationMs = Math.round(performance.now() - startTime);

    return this.createResponse(
      "success",
      `React component transpiled and mounted in sandboxed canvas.`,
      "",
      0,
      durationMs,
      [],
      `[REACT PREVIEW] Sandboxed React 18 / JSX runtime active.`,
      {
        isClientPreview: true,
        previewHtml: previewDocument,
        metadata: {
          language: "React",
          version: "React 18 / JSX",
          timestamp: new Date().toISOString(),
        },
      }
    );
  }
}
