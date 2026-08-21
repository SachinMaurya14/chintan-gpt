import React, { useState } from "react";
import { RefreshCw, ExternalLink, ShieldCheck, Eye } from "lucide-react";

interface PlaygroundPreviewProps {
  previewHtml: string;
  languageName: string;
  isStreaming?: boolean;
}

export const PlaygroundPreview: React.FC<PlaygroundPreviewProps> = ({
  previewHtml,
  languageName,
}) => {
  const [reloadKey, setReloadKey] = useState<number>(0);

  const handleRefresh = () => {
    setReloadKey((prev) => prev + 1);
  };

  if (!previewHtml) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-zinc-500 font-mono gap-2 text-center p-6">
        <Eye className="w-8 h-8 text-zinc-700 stroke-[1.5]" />
        <p className="text-zinc-300 font-medium">Sandboxed Preview Canvas</p>
        <p className="text-xs text-zinc-600 max-w-md">
          Click <span className="text-orange-400 font-bold">▶ Run</span> to transpile and render this {languageName} project in an isolated browser sandbox.
        </p>
      </div>
    );
  }

  return (
    <div id="playground-preview-container" className="h-full w-full flex flex-col bg-white overflow-hidden select-none">
      {/* Preview Sub-toolbar */}
      <div className="px-3 py-1.5 bg-[#141418] border-b border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-200 font-semibold">{languageName} Sandboxed Viewport</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-1.5 py-0.5 rounded">
            <ShieldCheck className="w-3 h-3" />
            Isolated iframe Sandbox
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            title="Reload Preview Frame"
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition text-[11px]"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reload</span>
          </button>
        </div>
      </div>

      {/* Sandboxed iframe canvas */}
      <div className="flex-1 w-full h-full relative bg-white">
        <iframe
          key={reloadKey}
          id="playground-sandboxed-iframe"
          title="Playground Isolated Preview"
          srcDoc={previewHtml}
          sandbox="allow-scripts"
          className="w-full h-full border-0 bg-white"
        />
      </div>
    </div>
  );
};
