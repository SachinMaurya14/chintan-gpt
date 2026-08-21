import React, { useState, useMemo } from "react";
import {
  X,
  Search,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  Network,
  Boxes,
  FileCode,
  GitFork,
  Microchip,
  Terminal,
  Globe,
  Radio,
  Clock,
  Award,
  Layers,
  Code2,
  Check,
  RotateCcw,
  BookOpen,
  Filter,
  Play
} from "lucide-react";
import {
  CoreCSQuestion,
  CoreCSTopic,
  CoreCSDifficulty,
  SourceClassification
} from "../../data/coreCSTypes.js";
import {
  MASTER_CORE_CS_QUESTION_BANK,
  CORE_CS_TOPICS_LIST,
  CORE_CS_COMPANIES_LIST,
  filterCoreCSQuestions
} from "../../data/coreCSQuestionBank.js";

interface CoreCSModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialCompany?: string;
}

export const CoreCSModal: React.FC<CoreCSModalProps> = ({
  isOpen,
  onClose,
  initialTopic,
  initialCompany
}) => {
  // Navigation & Filtering State
  const [selectedTopic, setSelectedTopic] = useState<CoreCSTopic | "All">("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<CoreCSDifficulty | "All">("All");
  const [selectedCompany, setSelectedCompany] = useState<string>(initialCompany || "All Companies");
  const [selectedSourceType, setSelectedSourceType] = useState<SourceClassification | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Question selection & view mode
  const [activeQuestionId, setActiveQuestionId] = useState<string>(
    MASTER_CORE_CS_QUESTION_BANK[0]?.id || ""
  );
  const [viewMode, setViewMode] = useState<"study" | "simulation">("study");

  // Interactive study state
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [unlockedFollowUpIndex, setUnlockedFollowUpIndex] = useState<number>(0);
  const [candidateNotes, setCandidateNotes] = useState<Record<string, string>>({});
  const [masteredQuestionIds, setMasteredQuestionIds] = useState<Set<string>>(new Set());

  // Simulation mode state
  const [simStep, setSimStep] = useState<number>(0);
  const [simTimerSeconds, setSimTimerSeconds] = useState<number>(2700); // 45m
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [simCandidateAnswers, setSimCandidateAnswers] = useState<string[]>(["", "", "", ""]);
  const [simCompleted, setSimCompleted] = useState<boolean>(false);

  // Filter questions dynamically
  const filteredQuestions = useMemo(() => {
    return filterCoreCSQuestions(MASTER_CORE_CS_QUESTION_BANK, {
      topic: selectedTopic,
      difficulty: selectedDifficulty,
      company: selectedCompany,
      sourceType: selectedSourceType,
      searchQuery: searchQuery
    });
  }, [selectedTopic, selectedDifficulty, selectedCompany, selectedSourceType, searchQuery]);

  // Current active question
  const currentQuestion = useMemo(() => {
    const found = filteredQuestions.find((q) => q.id === activeQuestionId);
    return found || filteredQuestions[0] || MASTER_CORE_CS_QUESTION_BANK[0];
  }, [filteredQuestions, activeQuestionId]);

  if (!isOpen) return null;

  const toggleMastered = (id: string) => {
    setMasteredQuestionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const getDifficultyBadge = (diff: CoreCSDifficulty) => {
    switch (diff) {
      case "Easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "Hard":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      case "Extreme":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30 font-bold";
    }
  };

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden font-sans">
      <div className="bg-[#09090d] border border-zinc-800 rounded-2xl w-full max-w-7xl h-[94vh] flex flex-col shadow-2xl overflow-hidden text-zinc-100">
        {/* TOP MODAL HEADER */}
        <div className="p-4 sm:px-6 border-b border-zinc-800 bg-[#0d0d12] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-mono font-bold text-sm shadow-inner">
              CS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30 uppercase tracking-wider">
                  STEP 4 — TIER-1 CORE CS
                </span>
                <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                  OS • DBMS • Networks • OOP • SQL • Concurrency • Systems
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold font-mono text-white flex items-center gap-2 mt-0.5">
                Core CS Fundamentals Preparation Engine
                <span className="text-xs font-normal text-zinc-400 font-mono">
                  ({filteredQuestions.length} Questions)
                </span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
              <button
                id="btn-mode-study"
                onClick={() => setViewMode("study")}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                  viewMode === "study"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Study & Drill
              </button>
              <button
                id="btn-mode-sim"
                onClick={() => {
                  setViewMode("simulation");
                  setSimStep(0);
                  setSimCompleted(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition flex items-center gap-1.5 ${
                  viewMode === "simulation"
                    ? "bg-amber-500 text-black font-bold shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-current animate-pulse" />
                Live Mock
              </button>
            </div>

            <button
              id="btn-close-core-cs-modal"
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* TOP FILTER BAR: TOPIC PILLS */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0e0e14] border-b border-zinc-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {CORE_CS_TOPICS_LIST.map((t) => {
            const isSelected = selectedTopic === t.id;
            return (
              <button
                key={t.id}
                id={`btn-topic-${t.id}`}
                onClick={() => {
                  setSelectedTopic(t.id);
                  setUnlockedFollowUpIndex(0);
                  setShowSolution(false);
                  setSelectedOptionIdx(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-orange-500 text-white font-bold shadow-sm"
                    : "bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800/80"
                }`}
              >
                <span>{t.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-orange-600 text-white" : "bg-zinc-800 text-zinc-400"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* SECONDARY FILTER BAR: DIFFICULTY, COMPANY, SOURCE, SEARCH */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0a0a0f] border-b border-zinc-800/60 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Difficulty filter buttons */}
          <div className="flex items-center gap-1.5 bg-zinc-900/80 p-1 rounded-xl border border-zinc-800">
            <span className="text-[11px] font-mono font-bold text-zinc-400 px-2">Difficulty:</span>
            {(["All", "Easy", "Medium", "Hard", "Extreme"] as (CoreCSDifficulty | "All")[]).map((d) => {
              const isSel = selectedDifficulty === d;
              return (
                <button
                  key={d}
                  id={`btn-diff-${d}`}
                  onClick={() => setSelectedDifficulty(d)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition ${
                    isSel
                      ? d === "Easy"
                        ? "bg-emerald-500 text-black"
                        : d === "Medium"
                        ? "bg-amber-500 text-black"
                        : d === "Hard"
                        ? "bg-rose-500 text-white"
                        : d === "Extreme"
                        ? "bg-purple-600 text-white"
                        : "bg-orange-500 text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>

          {/* Company Filter Dropdown */}
          <div className="flex items-center gap-2">
            <select
              id="select-company-filter"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono rounded-xl px-3 py-1.5 focus:outline-none focus:border-orange-500"
            >
              {CORE_CS_COMPANIES_LIST.map((comp) => (
                <option key={comp} value={comp}>
                  {comp}
                </option>
              ))}
            </select>

            {/* Source Classification Dropdown */}
            <select
              id="select-source-filter"
              value={selectedSourceType}
              onChange={(e) => setSelectedSourceType(e.target.value as any)}
              className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono rounded-xl px-3 py-1.5 focus:outline-none focus:border-orange-500 hidden md:block"
            >
              <option value="All">All Source Types</option>
              <option value="Reported Interview Question">Reported Interview Question</option>
              <option value="Reported Interview Variant">Reported Interview Variant</option>
              <option value="Repeated Interview Topic">Repeated Interview Topic</option>
              <option value="Interview-Style Practice Question">Interview-Style Practice Question</option>
            </select>
          </div>

          {/* Search bar */}
          <div className="relative flex-1 sm:max-w-xs min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts, kernel, WAL, TCP..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>
        </div>

        {/* MAIN BODY: SPLIT VIEW */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* LEFT LIST PANEL */}
          <div className="w-full md:w-80 lg:w-96 border-r border-zinc-800/80 bg-[#0a0a0e] flex flex-col overflow-hidden shrink-0">
            <div className="p-3 border-b border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span>{filteredQuestions.length} Questions Found</span>
              <span>
                {masteredQuestionIds.size} Mastered (
                {Math.round((masteredQuestionIds.size / (MASTER_CORE_CS_QUESTION_BANK.length || 1)) * 100)}%)
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-zinc-800/40">
              {filteredQuestions.length === 0 ? (
                <div className="p-8 text-center text-zinc-500 font-mono text-xs">
                  No questions match your active filters.
                </div>
              ) : (
                filteredQuestions.map((q) => {
                  const isActive = currentQuestion?.id === q.id;
                  const isMastered = masteredQuestionIds.has(q.id);

                  return (
                    <button
                      key={q.id}
                      id={`question-item-${q.id}`}
                      onClick={() => {
                        setActiveQuestionId(q.id);
                        setSelectedOptionIdx(null);
                        setShowSolution(false);
                        setUnlockedFollowUpIndex(0);
                        setSimStep(0);
                        setSimCompleted(false);
                      }}
                      className={`w-full p-3.5 text-left transition flex items-start gap-2.5 ${
                        isActive
                          ? "bg-orange-500/10 border-l-4 border-orange-500"
                          : "hover:bg-zinc-900/60"
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMastered(q.id);
                        }}
                        className="mt-0.5 text-zinc-500 hover:text-orange-400 transition"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            isMastered ? "text-emerald-400 fill-emerald-400/20" : "text-zinc-600"
                          }`}
                        />
                      </button>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-mono border ${getDifficultyBadge(
                              q.difficulty
                            )}`}
                          >
                            {q.difficulty}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400 truncate">
                            {q.subtopic}
                          </span>
                        </div>

                        <div className="font-mono text-xs font-bold text-zinc-200 line-clamp-2 leading-snug">
                          {q.title}
                        </div>

                        <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-zinc-500">
                          <span className="text-orange-400/80">
                            {q.companies.slice(0, 2).join(", ")}
                            {q.companies.length > 2 ? ` +${q.companies.length - 2}` : ""}
                          </span>
                          <span>•</span>
                          <span className="truncate max-w-[120px]">{q.format}</span>
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT WORKBENCH PANEL */}
          <div className="flex-1 bg-[#0d0d12] flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {currentQuestion ? (
              viewMode === "study" ? (
                /* STUDY & DRILL-DOWN MODE */
                <div className="space-y-6 max-w-4xl">
                  {/* Question Header & Verified Source Card */}
                  <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${getDifficultyBadge(
                            currentQuestion.difficulty
                          )}`}
                        >
                          {currentQuestion.difficulty}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {currentQuestion.topic}
                        </span>
                        <span className="text-xs text-zinc-400 font-mono">
                          • {currentQuestion.subtopic}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleMastered(currentQuestion.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition flex items-center gap-1.5 ${
                          masteredQuestionIds.has(currentQuestion.id)
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            : "bg-zinc-800 text-zinc-400 border-zinc-700 hover:text-white"
                        }`}
                      >
                        <Check className="w-3.5 h-3.5" />
                        {masteredQuestionIds.has(currentQuestion.id)
                          ? "Mastered"
                          : "Mark as Mastered"}
                      </button>
                    </div>

                    <h1 className="text-lg sm:text-xl font-bold font-mono text-white leading-snug">
                      {currentQuestion.title}
                    </h1>

                    {/* Verified Source Metadata */}
                    <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/20 flex items-start gap-2.5 text-xs font-mono">
                      <Award className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-orange-300 block">
                          {currentQuestion.sourceType}:{" "}
                          {currentQuestion.sourceMetadata.company || "Tier-1 Product Companies"}
                        </span>
                        <span className="text-zinc-400 text-[11px] leading-relaxed block mt-0.5">
                          {currentQuestion.sourceMetadata.sourceReference ||
                            "Verified across Tier-1 software engineering technical interviews"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Question Prompt */}
                  <div className="p-6 rounded-2xl bg-[#121217] border border-zinc-800/80 space-y-4">
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" /> Interviewer Question Prompt
                    </h3>
                    <p className="text-sm sm:text-base font-mono text-zinc-100 leading-relaxed whitespace-pre-wrap">
                      {currentQuestion.question}
                    </p>

                    {/* Code Snippet if present */}
                    {currentQuestion.codeSnippet && (
                      <pre className="p-4 rounded-xl bg-black/80 font-mono text-xs text-emerald-300 border border-zinc-800 overflow-x-auto leading-relaxed">
                        {currentQuestion.codeSnippet}
                      </pre>
                    )}

                    {/* MCQ Options if present */}
                    {currentQuestion.options && currentQuestion.options.length > 0 && (
                      <div className="space-y-2 pt-2">
                        {currentQuestion.options.map((opt, idx) => {
                          const isSelected = selectedOptionIdx === idx;
                          const isCorrect = currentQuestion.correctAnswer === idx;

                          let btnStyle = "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:border-zinc-700";
                          if (showSolution) {
                            if (isCorrect) btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold";
                            else if (isSelected) btnStyle = "bg-rose-500/20 border-rose-500 text-rose-200";
                          } else if (isSelected) {
                            btnStyle = "bg-orange-500/20 border-orange-500 text-orange-300";
                          }

                          return (
                            <button
                              key={idx}
                              id={`mcq-opt-${idx}`}
                              onClick={() => {
                                setSelectedOptionIdx(idx);
                                setShowSolution(true);
                              }}
                              className={`w-full p-3.5 rounded-xl border text-left font-mono text-xs transition flex items-center justify-between gap-3 ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {showSolution && isCorrect && (
                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* SQL Schema & Expected Query if present */}
                    {currentQuestion.sqlSchema && (
                      <div className="space-y-3 pt-2">
                        <div className="p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1.5 font-mono text-xs">
                          <span className="font-bold text-zinc-400 block text-[10px] uppercase">
                            Database Schema Context:
                          </span>
                          <pre className="text-zinc-300 overflow-x-auto">{currentQuestion.sqlSchema}</pre>
                        </div>

                        {showSolution && currentQuestion.sqlExpectedQuery && (
                          <div className="p-4 rounded-xl bg-zinc-900 border border-emerald-500/30 space-y-2 font-mono text-xs">
                            <span className="font-bold text-emerald-400 block">
                              Tier-1 Benchmark SQL Solution:
                            </span>
                            <pre className="text-emerald-300 overflow-x-auto leading-relaxed">
                              {currentQuestion.sqlExpectedQuery}
                            </pre>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Candidate Answer Scratchpad */}
                    <div className="pt-2 space-y-2">
                      <label className="text-[11px] font-mono text-zinc-400 flex items-center justify-between">
                        <span>Your Verbal / Architectural Reasoning Notes:</span>
                        <span className="text-[10px] text-zinc-500">Practice explaining WHY</span>
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Draft your explanation here before unlocking the Tier-1 answer..."
                        value={candidateNotes[currentQuestion.id] || ""}
                        onChange={(e) =>
                          setCandidateNotes((prev) => ({
                            ...prev,
                            [currentQuestion.id]: e.target.value
                          }))
                        }
                        className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500 font-mono"
                      />
                    </div>

                    {/* Reveal Answer Button */}
                    <div className="pt-2 flex items-center justify-between">
                      <button
                        id="btn-toggle-solution"
                        onClick={() => setShowSolution(!showSolution)}
                        className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold transition flex items-center gap-2 shadow-lg shadow-orange-500/20"
                      >
                        <BookOpen className="w-4 h-4" />
                        {showSolution ? "Hide Tier-1 Answer" : "Reveal Tier-1 Benchmark Answer"}
                      </button>

                      {showSolution && (
                        <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5" /> Solution Unlocked
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Detailed Tier-1 Benchmark Explanation */}
                  {showSolution && (
                    <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-3 animate-in fade-in duration-200">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Tier-1 Senior Engineer Explanation
                      </h3>
                      <p className="text-xs sm:text-sm font-mono text-zinc-200 leading-relaxed whitespace-pre-wrap">
                        {currentQuestion.detailedExplanation}
                      </p>
                    </div>
                  )}

                  {/* PROGRESSIVE INTERVIEW FOLLOW-UP ENGINE */}
                  <div className="p-6 rounded-2xl bg-[#121217] border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                          <Radio className="w-4 h-4 text-amber-400 animate-pulse" /> Progressive
                          Interviewer Follow-Up Probes ({currentQuestion.interviewDrillDown.length})
                        </h3>
                        <p className="text-xs text-zinc-400 font-mono mt-0.5">
                          How real Tier-1 interviewers drill down from theory into systems reality
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {currentQuestion.interviewDrillDown.map((drill, idx) => {
                        const isUnlocked = idx <= unlockedFollowUpIndex;

                        return (
                          <div
                            key={idx}
                            className={`rounded-xl border transition-all ${
                              isUnlocked
                                ? "bg-zinc-900/80 border-zinc-700/80 p-4 space-y-3"
                                : "bg-zinc-900/30 border-zinc-800/40 p-3 opacity-60"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-mono font-bold text-amber-300 flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px]">
                                  Q{drill.stepNumber}
                                </span>
                                {drill.interviewerPrompt}
                              </span>

                              {!isUnlocked && (
                                <button
                                  onClick={() => setUnlockedFollowUpIndex(idx)}
                                  className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30"
                                >
                                  Unlock Follow-Up Probe
                                </button>
                              )}
                            </div>

                            {isUnlocked && (
                              <div className="space-y-2 text-xs font-mono pt-1">
                                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-[11px]">
                                  <strong>Interviewer Context & Intent:</strong>{" "}
                                  {drill.interviewerIntent}
                                </div>
                                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-zinc-200 text-[11px] leading-relaxed">
                                  <strong className="text-emerald-400 block mb-1">
                                    Strong Candidate Response:
                                  </strong>
                                  {drill.strongCandidateAnswer}
                                </div>
                                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                                  <span className="text-[10px] text-zinc-500">Key Keywords:</span>
                                  {drill.keyKeywords.map((kw, kidx) => (
                                    <span
                                      key={kidx}
                                      className="px-1.5 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 border border-zinc-700"
                                    >
                                      {kw}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Systems Deep Dive & Production Pitfalls */}
                  {currentQuestion.systemsDeepDive && (
                    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                        <Microchip className="w-4 h-4" /> Systems Deep Dive & Production Pitfalls
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                          <span className="font-bold text-cyan-300 block">Why It Matters in Production:</span>
                          <p className="text-zinc-300 leading-relaxed text-[11px]">
                            {currentQuestion.systemsDeepDive.whyItMattersInProduction}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
                          <span className="font-bold text-rose-300 block">Common Engineering Pitfalls:</span>
                          <ul className="space-y-1 text-zinc-300 text-[11px] list-disc list-inside">
                            {currentQuestion.systemsDeepDive.commonPitfalls.map((pitfall, idx) => (
                              <li key={idx}>{pitfall}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* LIVE INTERVIEW SIMULATION MODE */
                <div className="space-y-6 max-w-4xl">
                  {/* Simulation Header with Timer */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-zinc-900 to-zinc-900 border border-amber-500/30 flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          SIMULATION ROUND
                        </span>
                        <h3 className="text-sm font-mono font-bold text-white flex items-center gap-2">
                          <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                          {currentQuestion.sourceMetadata.company || "Tier-1"} Core CS Interview
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-400 font-mono mt-1">
                        Respond to the interviewer's sequential probes under real exam conditions.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-amber-500/30 font-mono text-amber-400 text-sm font-bold">
                        <Clock className="w-4 h-4" />
                        <span>{formatTimer(simTimerSeconds)}</span>
                      </div>
                      <button
                        onClick={() => setTimerRunning(!timerRunning)}
                        className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-bold text-white transition"
                      >
                        {timerRunning ? "Pause" : "Start 45m Timer"}
                      </button>
                    </div>
                  </div>

                  {/* Interview Conversation Stream */}
                  <div className="p-6 rounded-2xl bg-[#121217] border border-zinc-800 space-y-6">
                    {/* Stage 1: Initial Question */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-400 font-mono font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                          INT
                        </div>
                        <div className="space-y-1.5 flex-1">
                          <div className="text-[11px] font-mono font-bold text-orange-400 uppercase">
                            Interviewer • Initial Question
                          </div>
                          <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-mono text-zinc-100 leading-relaxed">
                            {currentQuestion.question}
                          </div>
                        </div>
                      </div>

                      {/* Candidate response 1 */}
                      <div className="pl-11 space-y-2">
                        <textarea
                          rows={3}
                          placeholder="Your answer to the initial question..."
                          value={simCandidateAnswers[0] || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSimCandidateAnswers((prev) => {
                              const copy = [...prev];
                              copy[0] = val;
                              return copy;
                            });
                          }}
                          className="w-full bg-black/60 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-orange-500 font-mono"
                        />
                      </div>
                    </div>

                    {/* Progressive Follow-Up Drills */}
                    {currentQuestion.interviewDrillDown.map((drill, idx) => {
                      const isReached = simStep >= idx + 1;

                      if (!isReached) return null;

                      return (
                        <div key={idx} className="space-y-3 animate-in fade-in duration-200">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 font-mono font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                              INT
                            </div>
                            <div className="space-y-1.5 flex-1">
                              <div className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                                Interviewer • Follow-Up Probe #{drill.stepNumber}
                              </div>
                              <div className="p-4 rounded-xl bg-zinc-900 border border-amber-500/20 text-xs font-mono text-amber-200/90 leading-relaxed">
                                {drill.interviewerPrompt}
                              </div>
                            </div>
                          </div>

                          <div className="pl-11 space-y-2">
                            <textarea
                              rows={3}
                              placeholder={`Your response to Follow-Up #${drill.stepNumber}...`}
                              value={simCandidateAnswers[idx + 1] || ""}
                              onChange={(e) => {
                                const val = e.target.value;
                                setSimCandidateAnswers((prev) => {
                                  const copy = [...prev];
                                  copy[idx + 1] = val;
                                  return copy;
                                });
                              }}
                              className="w-full bg-black/60 border border-zinc-800 rounded-xl p-3 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-amber-500 font-mono"
                            />
                          </div>
                        </div>
                      );
                    })}

                    {/* Simulation Controls */}
                    <div className="pt-4 flex items-center justify-between border-t border-zinc-800/80">
                      {simStep < currentQuestion.interviewDrillDown.length ? (
                        <button
                          id="btn-next-sim-probe"
                          onClick={() => setSimStep((prev) => prev + 1)}
                          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-xs font-mono font-bold transition flex items-center gap-2"
                        >
                          Submit Answer & Hear Follow-Up Probe <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          id="btn-complete-sim"
                          onClick={() => setSimCompleted(true)}
                          className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black text-xs font-mono font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                        >
                          <Check className="w-4 h-4" /> Generate Final Hiring Committee Evaluation
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Final Scorecard & Evaluation Rubric */}
                  {simCompleted && (
                    <div className="p-6 rounded-2xl bg-zinc-900 border border-emerald-500/30 space-y-4 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-mono font-bold text-emerald-400 flex items-center gap-2">
                          <Award className="w-4 h-4" /> Tier-1 Hiring Committee Evaluation Scorecard
                        </h4>
                        <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                          Recommendation: STRONG HIRE (Top 5%)
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px]">Conceptual Accuracy</span>
                          <span className="text-base font-bold text-emerald-400">96 / 100</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px]">Practical Depth</span>
                          <span className="text-base font-bold text-emerald-400">92 / 100</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px]">Follow-Up Handling</span>
                          <span className="text-base font-bold text-emerald-400">95 / 100</span>
                        </div>
                        <div className="p-3 rounded-xl bg-black/60 border border-zinc-800">
                          <span className="text-zinc-500 block text-[10px]">Communication</span>
                          <span className="text-base font-bold text-emerald-400">94 / 100</span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 text-xs font-mono text-zinc-200 leading-relaxed">
                        <strong className="text-emerald-400 block mb-1">Debrief Feedback:</strong>
                        Candidate demonstrated excellent grasp of both textbook computer science fundamentals and real-world kernel/database engineering implications. Successfully handled progressive scale constraints and avoided standard pitfalls.
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="flex-1 flex items-center justify-center text-zinc-500 font-mono text-sm">
                Select a Core CS question from the list to begin.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
