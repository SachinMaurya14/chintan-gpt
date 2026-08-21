import React from "react";
import {
  ChevronRight,
  Folder,
  FileCode,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";
import { WorkspaceFile } from "../types.js";
import { WorkspaceService } from "../services/workspaceService.js";

interface PlaygroundBreadcrumbsProps {
  activeFile: WorkspaceFile;
  onNavigateFolder?: (folderPath: string) => void;
}

export const PlaygroundBreadcrumbs: React.FC<PlaygroundBreadcrumbsProps> = ({
  activeFile,
  onNavigateFolder,
}) => {
  const filePath = activeFile.path || activeFile.name;
  const segments = filePath.split("/").filter(Boolean);
  const visualInfo = WorkspaceService.getFileVisualInfo(activeFile.name);

  return (
    <div
      id="playground-breadcrumbs"
      className="px-3 py-1 bg-[#0c0c0e] border-b border-zinc-800/80 flex items-center justify-between text-xs font-mono select-none overflow-x-auto gap-2"
    >
      {/* Breadcrumb Trail */}
      <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] truncate">
        <button
          onClick={() => onNavigateFolder && onNavigateFolder("")}
          className="flex items-center gap-1 hover:text-zinc-200 transition shrink-0"
          title="Workspace Root"
        >
          <Folder className="w-3.5 h-3.5 text-zinc-500" />
          <span>workspace</span>
        </button>

        {segments.map((seg, idx) => {
          const isLast = idx === segments.length - 1;
          const currentFolderPath = segments.slice(0, idx + 1).join("/");

          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-zinc-600 shrink-0" />
              {isLast ? (
                <div className="flex items-center gap-1.5 text-zinc-200 font-semibold truncate shrink-0">
                  <FileCode className={`w-3.5 h-3.5 ${visualInfo.colorClass} shrink-0`} />
                  <span className="truncate">{seg}</span>
                  {activeFile.isEntry && (
                    <span className="text-[9px] px-1 py-0.2 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 font-normal">
                      entry
                    </span>
                  )}
                  {activeFile.isModified && (
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" title="Unsaved changes" />
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onNavigateFolder && onNavigateFolder(currentFolderPath)}
                  className="hover:text-zinc-200 hover:underline transition truncate shrink-0"
                >
                  {seg}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Right File Badge */}
      <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zinc-500 shrink-0">
        <span className={`px-1.5 py-0.5 rounded border text-[9px] font-bold ${visualInfo.bgBadgeClass}`}>
          {visualInfo.shortBadge}
        </span>
        <span>{activeFile.language || "text"}</span>
      </div>
    </div>
  );
};
