import React, { useState } from "react";
import {
  Brain,
  Plus,
  Trash2,
  X,
  Check,
  Target,
  AlertCircle,
  Sliders,
  FolderGit2,
  Award,
  Sparkles
} from "lucide-react";
import { LearningMemoryItem, MemoryCategory } from "../../types/tutor.js";
import { MemoryService } from "../../services/memoryService.js";

interface LearningMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  isMemoryEnabled: boolean;
  onToggleMemory: (enabled: boolean) => void;
  memoryItems: LearningMemoryItem[];
  onUpdateItems: (items: LearningMemoryItem[]) => void;
}

export const LearningMemoryModal: React.FC<LearningMemoryModalProps> = ({
  isOpen,
  onClose,
  isMemoryEnabled,
  onToggleMemory,
  memoryItems,
  onUpdateItems,
}) => {
  const [newCategory, setNewCategory] = useState<MemoryCategory>("goal");
  const [newText, setNewText] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  if (!isOpen) return null;

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const added = MemoryService.addMemoryItem(newCategory, newText.trim());
    onUpdateItems([added, ...memoryItems]);
    setNewText("");
  };

  const handleDeleteItem = (id: string) => {
    MemoryService.removeMemoryItem(id);
    onUpdateItems(memoryItems.filter((m) => m.id !== id));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all learning memory items?")) {
      MemoryService.clearAllMemory();
      onUpdateItems([]);
    }
  };

  const filteredItems = filterCategory === "all"
    ? memoryItems
    : memoryItems.filter((m) => m.category === filterCategory);

  const getCategoryBadge = (cat: MemoryCategory) => {
    switch (cat) {
      case "goal":
        return {
          icon: Target,
          label: "Goal",
          color: "bg-blue-500/15 text-blue-400 border-blue-500/30",
        };
      case "weakness":
        return {
          icon: AlertCircle,
          label: "Weakness",
          color: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        };
      case "preference":
        return {
          icon: Sliders,
          label: "Preference",
          color: "bg-purple-500/15 text-purple-400 border-purple-500/30",
        };
      case "mastered":
        return {
          icon: Award,
          label: "Mastered",
          color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        };
      case "project":
        return {
          icon: FolderGit2,
          label: "Project",
          color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
        };
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="w-full max-w-2xl bg-[#0e1017] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shadow-inner">
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Learning Memory</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
                  Adaptive
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Personalized study goals, recurring focus areas, and coding preferences.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master ON/OFF Toggle Strip */}
        <div className="px-5 py-3 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between">
          <div className="text-xs text-zinc-300 flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isMemoryEnabled ? "bg-emerald-400 shadow-sm shadow-emerald-400/50" : "bg-zinc-600"
              }`}
            />
            <span className="font-semibold">
              Learning Memory is {isMemoryEnabled ? "Active & Injecting" : "Disabled"}
            </span>
          </div>

          <button
            onClick={() => onToggleMemory(!isMemoryEnabled)}
            className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
              isMemoryEnabled
                ? "bg-purple-500 text-white shadow-md shadow-purple-500/20"
                : "bg-zinc-800 text-zinc-400 hover:text-white"
            }`}
          >
            {isMemoryEnabled ? "TURN OFF" : "TURN ON"}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 scrollbar-thin">
          {/* Add New Memory Form */}
          <form onSubmit={handleAddItem} className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-orange-400" />
                <span>Add Study Profile Item</span>
              </span>
              <div className="flex items-center gap-1 text-[11px]">
                <label className="text-zinc-500">Category:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as MemoryCategory)}
                  className="bg-zinc-800 text-zinc-200 px-2 py-0.5 rounded border border-zinc-700 outline-none text-xs"
                >
                  <option value="goal">Goal</option>
                  <option value="weakness">Weakness</option>
                  <option value="preference">Preference</option>
                  <option value="mastered">Mastered</option>
                  <option value="project">Project</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="e.g. Preparing for TCS Prime & Google L3. Focus on Tree DFS and System Design."
                className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-950 text-xs text-zinc-200 border border-zinc-800 focus:border-orange-500/50 outline-none placeholder:text-zinc-600"
              />
              <button
                type="submit"
                disabled={!newText.trim()}
                className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-xs font-bold transition shadow-sm"
              >
                Add
              </button>
            </div>
          </form>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-[11px] text-zinc-500 font-mono mr-1">Filter:</span>
            {["all", "goal", "weakness", "preference", "mastered", "project"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-0.5 rounded-full text-[11px] capitalize font-medium transition ${
                  filterCategory === cat
                    ? "bg-zinc-700 text-white"
                    : "bg-zinc-900 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* List of Memory Items */}
          <div className="space-y-2 pt-1">
            {filteredItems.length === 0 ? (
              <div className="py-8 text-center text-zinc-600 text-xs font-mono">
                No items in this category.
              </div>
            ) : (
              filteredItems.map((item) => {
                const badge = getCategoryBadge(item.category);
                const Icon = badge.icon;
                return (
                  <div
                    key={item.id}
                    className="group flex items-start justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 text-xs transition"
                  >
                    <div className="flex items-start gap-2.5 min-w-0 mr-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold border shrink-0 mt-0.5 ${badge.color}`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{badge.label}</span>
                      </span>
                      <p className="text-zinc-300 leading-relaxed break-words">{item.text}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-rose-400 rounded transition"
                      title="Delete Item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-[#090a0f] flex items-center justify-between">
          <button
            onClick={handleClearAll}
            className="text-[11px] font-mono text-zinc-500 hover:text-rose-400 transition"
          >
            Clear all memory
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
