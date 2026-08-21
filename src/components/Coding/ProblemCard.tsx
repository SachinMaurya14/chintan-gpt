import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { CodingProblemSummary } from "../../types/index.js";
import { DifficultyBadge } from "./DifficultyBadge.js";

export interface ProblemCardProps {
  problem: CodingProblemSummary;
  isSolved: boolean;
  onSelect: (id: string) => void;
  onPrefetch?: (id: string) => void;
  isCached?: boolean;
  style?: React.CSSProperties;
}

export const ProblemCard: React.FC<ProblemCardProps> = React.memo(
  ({ problem, isSolved, onSelect, onPrefetch, isCached, style }) => {
    return (
      <div
        id={`problem-row-${problem.id}`}
        onClick={() => onSelect(problem.id)}
        onMouseEnter={() => onPrefetch?.(problem.id)}
        onFocus={() => onPrefetch?.(problem.id)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(problem.id);
          }
        }}
        style={style || { height: "70px" }}
        className="grid grid-cols-12 items-center px-5 py-3 hover:bg-[#15151c] focus:bg-[#15151c] focus:outline-none transition-all cursor-pointer group border-b border-zinc-800/60 select-none"
      >
        {/* Status */}
        <div className="col-span-1 flex items-center">
          {isSolved ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <Circle className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 transition-colors" />
          )}
        </div>

        {/* Title and Category */}
        <div className="col-span-6 sm:col-span-6 space-y-1 pr-2">
          <div className="font-bold text-xs sm:text-sm text-zinc-100 group-hover:text-amber-400 transition-colors font-mono truncate">
            {problem.title}
          </div>
          <div className="flex flex-wrap gap-1 items-center">
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#0b0b10] border border-cyan-500/20 text-cyan-300 truncate max-w-[140px]">
              {problem.category || "Algorithms"}
            </span>
            {(problem.topics || []).slice(0, 2).map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#0b0b10] border border-zinc-800 text-zinc-400 truncate max-w-[120px]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div className="col-span-2 sm:col-span-2">
          <DifficultyBadge difficulty={problem.difficulty} />
          <div className="text-[10px] font-mono text-zinc-500 mt-0.5">
            {problem.acceptanceRate}% accept
          </div>
        </div>

        {/* Company Tags */}
        <div className="col-span-3 flex flex-wrap gap-1 items-center">
          {(problem.companyTags || []).slice(0, 3).map((comp) => (
            <span
              key={comp}
              className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#18181c] text-zinc-300 border border-zinc-800"
            >
              {comp}
            </span>
          ))}
          {(problem.companyTags || []).length > 3 && (
            <span className="text-[9px] font-mono text-zinc-500 self-center">
              +{(problem.companyTags || []).length - 3}
            </span>
          )}
        </div>
      </div>
    );
  }
);

ProblemCard.displayName = "ProblemCard";
