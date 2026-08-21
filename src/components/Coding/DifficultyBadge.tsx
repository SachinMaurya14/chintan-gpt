import React from "react";

export interface DifficultyBadgeProps {
  difficulty: "Easy" | "Medium" | "Hard" | string;
  className?: string;
  acceptanceRate?: number;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = React.memo(
  ({ difficulty, className = "", acceptanceRate }) => {
    const badgeColor =
      difficulty === "Easy"
        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
        : difficulty === "Medium"
        ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
        : difficulty === "Extreme"
        ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
        : "bg-rose-500/15 text-rose-300 border-rose-500/30";

    return (
      <span
        className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${badgeColor} ${className}`}
      >
        {difficulty}
        {acceptanceRate !== undefined && (
          <span className="ml-1 opacity-70 font-normal">({acceptanceRate}%)</span>
        )}
      </span>
    );
  }
);

DifficultyBadge.displayName = "DifficultyBadge";
