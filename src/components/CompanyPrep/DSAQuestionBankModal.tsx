import React, { useState, useMemo } from "react";
import {
  X,
  Sparkles,
  Search,
  Code2,
  Cpu,
  Layers,
  Lightbulb,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Terminal,
  Clock,
  Database,
  ExternalLink,
  BookOpen
} from "lucide-react";
import { DSAInterviewProblem, DSADifficulty } from "../../data/dsaQuestionTypes.js";

interface DSAQuestionBankModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle: string;
  categoryTitle: string;
  companyName: string;
  questions: DSAInterviewProblem[];
  batchNumber?: number;
}

export const DSAQuestionBankModal: React.FC<DSAQuestionBankModalProps> = ({
  isOpen,
  onClose,
  topicTitle,
  categoryTitle,
  companyName,
  questions,
  batchNumber
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<"All" | DSADifficulty>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [activeCodeLang, setActiveCodeLang] = useState<"cpp" | "python">("cpp");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Dynamic filter for difficulty and search
  const filteredQuestions = useMemo(() => {
    if (!questions || questions.length === 0) return [];
    return questions.filter((q) => {
      const matchesDiff =
        selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
      const matchesSearch =
        searchQuery.trim() === "" ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.pattern.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.statement.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDiff && matchesSearch;
    });
  }, [questions, selectedDifficulty, searchQuery]);

  // Current active question
  const currentQuestion = useMemo(() => {
    if (filteredQuestions.length === 0) return null;
    const found = filteredQuestions.find((q) => q.id === selectedQuestionId);
    return found || filteredQuestions[0];
  }, [filteredQuestions, selectedQuestionId]);

  // Sync selected question if needed
  React.useEffect(() => {
    if (filteredQuestions.length > 0 && (!selectedQuestionId || !filteredQuestions.some(q => q.id === selectedQuestionId))) {
      setSelectedQuestionId(filteredQuestions[0].id);
    }
  }, [filteredQuestions, selectedQuestionId]);

  if (!isOpen || !questions || questions.length === 0) return null;

  const currentIdxInFiltered = filteredQuestions.findIndex(
    (q) => q.id === currentQuestion?.id
  );

  const handlePrev = () => {
    if (currentIdxInFiltered > 0) {
      setSelectedQuestionId(filteredQuestions[currentIdxInFiltered - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIdxInFiltered < filteredQuestions.length - 1) {
      setSelectedQuestionId(filteredQuestions[currentIdxInFiltered + 1].id);
    }
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const difficultyCounts = {
    All: questions.length,
    Medium: questions.filter((q) => q.difficulty === "Medium").length,
    Hard: questions.filter((q) => q.difficulty === "Hard").length,
    Extreme: questions.filter((q) => q.difficulty === "Extreme").length
  };

  const getDifficultyBadge = (diff: DSADifficulty) => {
    switch (diff) {
      case "Medium":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            Medium
          </span>
        );
      case "Hard":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">
            Hard
          </span>
        );
      case "Extreme":
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 shadow-sm shadow-rose-500/10 animate-pulse">
            Extreme
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id="dsa-question-bank-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div
        id="dsa-question-bank-container"
        className="bg-[#0b0c10] border border-zinc-800 w-full max-w-7xl h-[92vh] max-h-[920px] rounded-2xl flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Top Header */}
        <div className="px-5 py-3.5 border-b border-zinc-800/80 bg-[#10121a] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-orange-400 font-semibold">
                  {companyName} • Product Tech Tier-1
                </span>
                {batchNumber && (
                  <span className="px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 font-mono text-[10px]">
                    Batch {batchNumber}
                  </span>
                )}
              </div>
              <h2 className="text-base font-bold text-white truncate flex items-center gap-2">
                <span>{topicTitle}</span>
                <span className="text-xs font-mono font-normal text-zinc-400">
                  ({questions.length} Curated Problems)
                </span>
              </h2>
            </div>
          </div>

          <button
            id="btn-close-dsa-modal"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition shrink-0"
            title="Close Question Bank"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Difficulty Filter Bar & Search */}
        <div className="px-5 py-3 bg-[#0d0f15] border-b border-zinc-800/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Difficulty Filter Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-medium text-zinc-400 mr-1 hidden sm:inline">
              Difficulty:
            </span>
            {(["All", "Medium", "Hard", "Extreme"] as const).map((diff) => {
              const isSelected = selectedDifficulty === diff;
              const count = difficultyCounts[diff];
              return (
                <button
                  key={diff}
                  id={`btn-filter-difficulty-${diff.toLowerCase()}`}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${
                    isSelected
                      ? diff === "Extreme"
                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                        : diff === "Hard"
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                        : diff === "Medium"
                        ? "bg-amber-500 text-zinc-950 shadow-lg shadow-amber-500/20"
                        : "bg-white text-zinc-950 shadow-md shadow-white/10"
                      : "bg-zinc-900/90 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800"
                  }`}
                >
                  <span>{diff}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      isSelected
                        ? "bg-black/30 text-white"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problem, pattern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500/60"
            />
          </div>
        </div>

        {/* Main Body: Split Sidebar & Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Problem Palette / List */}
          <div className="w-72 sm:w-80 border-r border-zinc-800/80 bg-[#0c0d12] flex flex-col shrink-0 overflow-hidden">
            <div className="px-3.5 py-2.5 bg-[#0e1017] border-b border-zinc-800/50 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>
                Showing {filteredQuestions.length} of {questions.length}
              </span>
              <span className="text-[11px] text-zinc-500">Click to view</span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {filteredQuestions.length === 0 ? (
                <div className="py-12 text-center text-xs text-zinc-500">
                  No problems match your filter.
                </div>
              ) : (
                filteredQuestions.map((q) => {
                  const isSelected = q.id === currentQuestion?.id;
                  return (
                    <button
                      key={q.id}
                      id={`btn-select-question-${q.id}`}
                      onClick={() => setSelectedQuestionId(q.id)}
                      className={`w-full text-left p-2.5 rounded-xl border transition flex items-start gap-2.5 ${
                        isSelected
                          ? "bg-orange-500/10 border-orange-500/40 shadow-sm shadow-orange-500/5"
                          : "bg-zinc-900/40 border-zinc-800/40 hover:bg-zinc-900 hover:border-zinc-700"
                      }`}
                    >
                      <span
                        className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded shrink-0 ${
                          isSelected
                            ? "bg-orange-500 text-white"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {q.id}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div
                          className={`text-xs font-medium truncate ${
                            isSelected
                              ? "text-orange-300 font-semibold"
                              : "text-zinc-300"
                          }`}
                        >
                          {q.title}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span
                            className={`text-[10px] font-semibold ${
                              q.difficulty === "Extreme"
                                ? "text-rose-400"
                                : q.difficulty === "Hard"
                                ? "text-orange-400"
                                : "text-amber-400"
                            }`}
                          >
                            {q.difficulty}
                          </span>
                          <span className="text-[10px] text-zinc-500 truncate max-w-[130px]">
                            • {q.pattern}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Main Pane: Problem Details & Solutions */}
          {currentQuestion ? (
            <div className="flex-1 flex flex-col overflow-y-auto bg-[#090a0e] custom-scrollbar">
              {/* Header Info */}
              <div className="p-5 sm:p-6 border-b border-zinc-800/60 bg-[#0d0f15]/50">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-orange-500 text-white">
                      {currentQuestion.id}
                    </span>
                    {getDifficultyBadge(currentQuestion.difficulty)}
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-zinc-700">
                      Pattern: {currentQuestion.pattern}
                    </span>
                  </div>

                  {/* Top Pagination buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handlePrev}
                      disabled={currentIdxInFiltered <= 0}
                      className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
                      title="Previous Problem"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono text-zinc-400 px-1">
                      {currentIdxInFiltered + 1} / {filteredQuestions.length}
                    </span>
                    <button
                      onClick={handleNext}
                      disabled={currentIdxInFiltered >= filteredQuestions.length - 1}
                      className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
                      title="Next Problem"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h1 className="text-lg sm:text-xl font-bold text-white">
                  {currentQuestion.title}
                </h1>

                {/* Complexity Summary Badges */}
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-lg border border-zinc-800">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span className="text-zinc-500">Time:</span>
                    <span className="font-mono text-orange-300">
                      {currentQuestion.expectedTimeComplexity}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-lg border border-zinc-800">
                    <Database className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-zinc-500">Space:</span>
                    <span className="font-mono text-amber-300">
                      {currentQuestion.expectedSpaceComplexity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Problem Content Container */}
              <div className="p-5 sm:p-6 space-y-6 flex-1">
                {/* Problem Statement */}
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                    <span>Problem Statement</span>
                  </h3>
                  <div className="text-sm text-zinc-200 leading-relaxed p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 font-sans">
                    {currentQuestion.statement}
                  </div>
                </div>

                {/* Examples */}
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-orange-400" />
                    <span>Examples</span>
                  </h3>
                  <div className="space-y-2.5">
                    {currentQuestion.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs font-mono space-y-1"
                      >
                        <div className="text-zinc-400">
                          <span className="text-orange-400 font-semibold">
                            Input:{" "}
                          </span>
                          <span className="text-zinc-200">{ex.input}</span>
                        </div>
                        <div className="text-zinc-400">
                          <span className="text-emerald-400 font-semibold">
                            Output:{" "}
                          </span>
                          <span className="text-zinc-200">{ex.output}</span>
                        </div>
                        {ex.explanation && (
                          <div className="text-zinc-400 font-sans pt-1 text-[11px] border-t border-zinc-800/60 mt-1">
                            <span className="text-zinc-500 font-semibold">
                              Explanation:{" "}
                            </span>
                            <span>{ex.explanation}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Constraints */}
                <div>
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-orange-400" />
                    <span>Constraints</span>
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-zinc-300">
                    {currentQuestion.constraints.map((c, cIdx) => (
                      <li
                        key={cIdx}
                        className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                        <span className="truncate">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interview Insight Card */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-orange-950/30 to-amber-950/20 border border-orange-500/30">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-300 uppercase font-mono mb-1.5">
                    <Lightbulb className="w-4 h-4 text-orange-400" />
                    <span>Tier-1 Interview Insight & Pattern Trick</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    {currentQuestion.interviewInsight}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-orange-500/20 text-[11px] text-zinc-400 font-sans">
                    <strong className="text-zinc-300">Approach: </strong>
                    {currentQuestion.explanation}
                  </div>
                </div>

                {/* Optimal Code Solutions */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setActiveCodeLang("cpp")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
                          activeCodeLang === "cpp"
                            ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                            : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                        }`}
                      >
                        C++ (Optimal)
                      </button>
                      <button
                        onClick={() => setActiveCodeLang("python")}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
                          activeCodeLang === "python"
                            ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                            : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
                        }`}
                      >
                        Python (Optimal)
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        handleCopyCode(
                          activeCodeLang === "cpp"
                            ? currentQuestion.cppSolution
                            : currentQuestion.pythonSolution
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs font-mono flex items-center gap-1.5 transition"
                    >
                      {copiedCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#08090d]">
                    <pre className="p-4 text-xs font-mono text-zinc-200 overflow-x-auto custom-scrollbar leading-relaxed">
                      <code>
                        {activeCodeLang === "cpp"
                          ? currentQuestion.cppSolution
                          : currentQuestion.pythonSolution}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Bottom Nav Footer */}
              <div className="p-4 border-t border-zinc-800/80 bg-[#0c0e14] flex items-center justify-between shrink-0">
                <button
                  onClick={handlePrev}
                  disabled={currentIdxInFiltered <= 0}
                  className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Problem</span>
                </button>

                <div className="text-xs font-mono text-zinc-400">
                  Problem {currentIdxInFiltered + 1} of {filteredQuestions.length}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentIdxInFiltered >= filteredQuestions.length - 1}
                  className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-semibold disabled:opacity-30 disabled:pointer-events-none transition flex items-center gap-1.5 shadow-md shadow-orange-600/20"
                >
                  <span>Next Problem</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-zinc-500">
              Select a question to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
