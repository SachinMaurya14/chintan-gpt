import React, { useState, useMemo } from "react";
import {
  X,
  Sparkles,
  Search,
  Layers,
  Server,
  Database,
  Cpu,
  ShieldCheck,
  Activity,
  Code2,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Clock,
  Play,
  Award,
  AlertTriangle,
  FileText,
  Boxes,
  Lock,
  GitBranch,
  Radio,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import {
  SystemDesignProblem,
  SystemDesignDifficulty,
  SystemDesignType
} from "../../data/systemDesignTypes.js";

interface SystemDesignModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle: string;
  categoryTitle: string;
  companyName: string;
  questions: SystemDesignProblem[];
}

export const SystemDesignModal: React.FC<SystemDesignModalProps> = ({
  isOpen,
  onClose,
  topicTitle,
  categoryTitle,
  companyName,
  questions
}) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<"All" | SystemDesignDifficulty>("All");
  const [selectedDesignType, setSelectedDesignType] = useState<"All" | SystemDesignType>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"architecture" | "api_data" | "scalability" | "code_lld" | "followups" | "simulation">("architecture");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [expandedFollowUp, setExpandedFollowUp] = useState<number | null>(0);

  // Simulation mode states
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simTimerSeconds, setSimTimerSeconds] = useState<number>(45 * 60); // 45 min interview timer
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [unlockedSolution, setUnlockedSolution] = useState<boolean>(false);
  const [candidateNotes, setCandidateNotes] = useState<{ [key: number]: string }>({});
  const [checkedRequirements, setCheckedRequirements] = useState<{ [key: string]: boolean }>({});

  // Reset or initialize step when current question changes
  React.useEffect(() => {
    setSimStep(0);
    setUnlockedSolution(false);
    setCandidateNotes({});
    setCheckedRequirements({});
  }, [selectedQuestionId]);

  // Timer effect for simulation mode
  React.useEffect(() => {
    let interval: any = null;
    if (timerRunning && simTimerSeconds > 0) {
      interval = setInterval(() => {
        setSimTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (simTimerSeconds === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, simTimerSeconds]);

  // Filtering
  const filteredQuestions = useMemo(() => {
    if (!questions || questions.length === 0) return [];
    return questions.filter((q) => {
      const matchesDiff = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
      const matchesType = selectedDesignType === "All" || q.designType === selectedDesignType;
      const matchesSearch =
        searchQuery.trim() === "" ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.categoryTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.companyRelevance.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesDiff && matchesType && matchesSearch;
    });
  }, [questions, selectedDifficulty, selectedDesignType, searchQuery]);

  const currentQuestion = useMemo(() => {
    if (filteredQuestions.length === 0) return null;
    const found = filteredQuestions.find((q) => q.id === selectedQuestionId);
    return found || filteredQuestions[0];
  }, [filteredQuestions, selectedQuestionId]);

  React.useEffect(() => {
    if (filteredQuestions.length > 0 && (!selectedQuestionId || !filteredQuestions.some(q => q.id === selectedQuestionId))) {
      setSelectedQuestionId(filteredQuestions[0].id);
    }
  }, [filteredQuestions, selectedQuestionId]);

  if (!isOpen || !questions || questions.length === 0) return null;

  const currentIdxInFiltered = filteredQuestions.findIndex((q) => q.id === currentQuestion?.id);

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

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const getDifficultyBadge = (diff: SystemDesignDifficulty) => {
    switch (diff) {
      case "Easy":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">Easy</span>;
      case "Medium":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30">Medium</span>;
      case "Hard":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/30">Hard</span>;
      case "Extreme":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">Extreme</span>;
    }
  };

  const getTypeBadge = (type: SystemDesignType) => {
    return (
      <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
        {type}
      </span>
    );
  };

  const simulationSteps = [
    { num: 1, title: "STEP 1: Show Problem", desc: "Understand initial problem statement, target scale, and system scope." },
    { num: 2, title: "STEP 2: Clarify Requirements", desc: "Candidate clarifies functional/non-functional bounds and scale assumptions." },
    { num: 3, title: "STEP 3: Additional Constraints", desc: "Interviewer gives real-world constraints (QPS, SLA latency, 99.999% availability)." },
    { num: 4, title: "STEP 4: Propose Architecture", desc: "Candidate proposes high-level components, APIs, and data flow." },
    { num: 5, title: "STEP 5: Interviewer Challenge", desc: "Interviewer probes database bottlenecks, race conditions, and single points of failure." },
    { num: 6, title: "STEP 6: Discuss Trade-offs", desc: "Candidate defends SQL vs NoSQL, PACELC theorem, and caching strategies." },
    { num: 7, title: "STEP 7: Scale / Failure Scenario", desc: "Interviewer injects 10x-100x traffic spike or node partition failure." },
    { num: 8, title: "STEP 8: Modify Design", desc: "Candidate applies circuit breakers, read replicas, and distributed idempotency." },
    { num: 9, title: "STEP 9: Final Evaluation", desc: "Tier-1 rubric evaluation and unlock complete reference solution." }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="system-design-modal-container"
        className="relative w-full max-w-7xl h-[94vh] flex flex-col bg-slate-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden text-slate-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 text-cyan-400">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  {topicTitle || "System Design & Architecture"}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  STEP 3 • Tier-1 Master Question Bank
                </span>
                {companyName && (
                  <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {companyName}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Comprehensive HLD, LLD, OOD, SOLID, and Real-World Distributed Systems Interview Framework
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="simulate-interview-btn"
              onClick={() => {
                setIsSimulating(!isSimulating);
                if (!isSimulating) {
                  setTimerRunning(true);
                  setActiveTab("simulation");
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSimulating
                  ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10"
                  : "bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600/30 border-indigo-500/30"
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${isSimulating ? "animate-pulse text-amber-400" : ""}`} />
              {isSimulating ? `Mock Interview (${formatTime(simTimerSeconds)})` : "Simulate Interview"}
            </button>

            <button
              id="close-system-design-modal"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-Header: Difficulty & Design Type Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-2.5 border-b border-slate-800/80 bg-slate-900/60 text-xs shrink-0">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium mr-1">Difficulty:</span>
              {(["All", "Easy", "Medium", "Hard", "Extreme"] as const).map((diff) => (
                <button
                  key={diff}
                  id={`filter-diff-${diff}`}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    selectedDifficulty === diff
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-slate-800" />

            {/* Design Type Filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-slate-400 font-medium mr-1">Type:</span>
              {(["All", "Fundamentals", "LLD", "OOD", "HLD", "HLD + LLD", "OOD + LLD"] as const).map((dt) => (
                <button
                  key={dt}
                  id={`filter-type-${dt}`}
                  onClick={() => setSelectedDesignType(dt)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    selectedDesignType === dt
                      ? "bg-cyan-600 text-white shadow-sm"
                      : "bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {dt}
                </button>
              ))}
            </div>
          </div>

          <div className="text-slate-400 text-xs font-medium">
            Showing <span className="text-white font-bold">{filteredQuestions.length}</span> / {questions.length} problems
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar: Problem List */}
          <div className="w-80 sm:w-96 border-r border-slate-800 bg-slate-900/40 flex flex-col shrink-0">
            <div className="p-3 border-b border-slate-800">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                <input
                  type="text"
                  id="system-design-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problem, company, topic..."
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-800/80 border border-slate-700/60 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1.5 custom-scrollbar">
              {filteredQuestions.map((q, idx) => {
                const isSelected = q.id === currentQuestion?.id;
                return (
                  <button
                    key={q.id}
                    id={`sd-list-item-${q.id}`}
                    onClick={() => setSelectedQuestionId(q.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      isSelected
                        ? "bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-500/5"
                        : "bg-slate-800/30 hover:bg-slate-800/60 border-slate-800/80 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-semibold text-slate-400">
                        {q.id.toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {getTypeBadge(q.designType)}
                        {getDifficultyBadge(q.difficulty)}
                      </div>
                    </div>

                    <h4 className={`text-xs font-semibold leading-snug line-clamp-2 ${isSelected ? "text-indigo-200" : "text-slate-200"}`}>
                      {q.title}
                    </h4>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
                      <span className="text-slate-400 font-medium truncate max-w-[140px]">
                        {q.categoryTag}
                      </span>
                      <span className="truncate max-w-[120px] text-slate-500">
                        {q.companyRelevance.slice(0, 2).join(", ")}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Main Content Area */}
          {currentQuestion ? (
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-900/60">
              {/* Problem Title Bar */}
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex items-start justify-between gap-4 shrink-0">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-400 font-semibold border border-slate-700">
                      {currentQuestion.id.toUpperCase()}
                    </span>
                    {getTypeBadge(currentQuestion.designType)}
                    {getDifficultyBadge(currentQuestion.difficulty)}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                      {currentQuestion.sourceType}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 font-medium">
                      {currentQuestion.categoryTag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {currentQuestion.title}
                  </h3>

                  {currentQuestion.reportedMetadata && (
                    <div className="text-[11px] text-slate-400 flex items-center gap-3 flex-wrap">
                      <span className="text-amber-400 font-medium flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> {currentQuestion.reportedMetadata.company} ({currentQuestion.reportedMetadata.role})
                      </span>
                      <span>• {currentQuestion.reportedMetadata.round}</span>
                      <span>• ~{currentQuestion.reportedMetadata.approxYear}</span>
                    </div>
                  )}
                </div>

                {/* Prev / Next navigation */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    id="prev-sd-question"
                    onClick={handlePrev}
                    disabled={currentIdxInFiltered <= 0}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-400 px-1">
                    {currentIdxInFiltered + 1}/{filteredQuestions.length}
                  </span>
                  <button
                    id="next-sd-question"
                    onClick={handleNext}
                    disabled={currentIdxInFiltered >= filteredQuestions.length - 1}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none text-slate-300 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 px-6 border-b border-slate-800 bg-slate-900/40 text-xs shrink-0 overflow-x-auto custom-scrollbar">
                <button
                  id="tab-architecture"
                  onClick={() => setActiveTab("architecture")}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all ${
                    activeTab === "architecture"
                      ? "text-indigo-400 border-indigo-500 bg-indigo-500/5"
                      : "text-slate-400 border-transparent hover:text-slate-200"
                  }`}
                >
                  <Server className="w-3.5 h-3.5" /> Architecture & Flow
                </button>

                <button
                  id="tab-api-data"
                  onClick={() => setActiveTab("api_data")}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all ${
                    activeTab === "api_data"
                      ? "text-indigo-400 border-indigo-500 bg-indigo-500/5"
                      : "text-slate-400 border-transparent hover:text-slate-200"
                  }`}
                >
                  <Database className="w-3.5 h-3.5" /> API & Data Model
                </button>

                <button
                  id="tab-scalability"
                  onClick={() => setActiveTab("scalability")}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all ${
                    activeTab === "scalability"
                      ? "text-indigo-400 border-indigo-500 bg-indigo-500/5"
                      : "text-slate-400 border-transparent hover:text-slate-200"
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" /> Scalability & Reliability
                </button>

                {currentQuestion.lldOodDetails && (
                  <button
                    id="tab-code-lld"
                    onClick={() => setActiveTab("code_lld")}
                    className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all ${
                      activeTab === "code_lld"
                        ? "text-indigo-400 border-indigo-500 bg-indigo-500/5"
                        : "text-slate-400 border-transparent hover:text-slate-200"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" /> LLD & OOP Code
                  </button>
                )}

                <button
                  id="tab-followups"
                  onClick={() => setActiveTab("followups")}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all ${
                    activeTab === "followups"
                      ? "text-indigo-400 border-indigo-500 bg-indigo-500/5"
                      : "text-slate-400 border-transparent hover:text-slate-200"
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" /> Interview Follow-Ups & Evaluation
                </button>

                <button
                  id="tab-simulation"
                  onClick={() => setActiveTab("simulation")}
                  className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition-all ${
                    activeTab === "simulation"
                      ? "text-amber-400 border-amber-500 bg-amber-500/5"
                      : "text-slate-400 border-transparent hover:text-slate-200"
                  }`}
                >
                  <Radio className="w-3.5 h-3.5" /> Mock Simulation
                </button>
              </div>

              {/* Tab Content Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar text-slate-200">
                {/* LOCKED STATE BANNER IF SIMULATION IS ACTIVE AND NOT YET UNLOCKED */}
                {isSimulating && !unlockedSolution && activeTab !== "simulation" && (
                  <div className="p-6 rounded-2xl bg-slate-950/90 border border-amber-500/40 text-center space-y-4 shadow-xl">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div className="max-w-md mx-auto space-y-1">
                      <h4 className="text-base font-bold text-white">
                        Interview Simulation in Progress
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Reference architecture and solution tabs are locked during active simulation mode to simulate real Tier-1 whiteboard interview conditions.
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
                      <button
                        onClick={() => setActiveTab("simulation")}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2"
                      >
                        <Radio className="w-4 h-4" /> Go to Active Step ({simStep + 1}/9)
                      </button>
                      <button
                        onClick={() => setUnlockedSolution(true)}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-all"
                      >
                        Unlock Full Reference Solution Now
                      </button>
                    </div>
                  </div>
                )}

                {/* TAB 1: ARCHITECTURE & FLOW */}
                {(!isSimulating || unlockedSolution || activeTab === "architecture") && activeTab === "architecture" && (
                  <div className="space-y-6">
                    {/* Problem Statement Card */}
                    <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                        <FileText className="w-4 h-4" /> Problem Statement
                      </h4>
                      <p className="text-sm leading-relaxed text-slate-200">
                        {currentQuestion.problemStatement}
                      </p>
                    </div>

                    {/* Requirements Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                          <Check className="w-4 h-4" /> Functional Requirements
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {currentQuestion.functionalRequirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-400 font-bold">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2.5 flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4" /> Non-Functional Requirements
                        </h4>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {currentQuestion.nonFunctionalRequirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Scale Estimation */}
                    {currentQuestion.scaleEstimation && (
                      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-800/40">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-3 flex items-center gap-1.5">
                          <Activity className="w-4 h-4" /> Scale Estimation & Capacity Planning
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
                          {currentQuestion.scaleEstimation.dauMau && (
                            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                              <span className="text-slate-400 text-[10px] block">DAU / MAU</span>
                              <span className="font-semibold text-slate-200">{currentQuestion.scaleEstimation.dauMau}</span>
                            </div>
                          )}
                          {currentQuestion.scaleEstimation.avgQps && (
                            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                              <span className="text-slate-400 text-[10px] block">Average QPS</span>
                              <span className="font-semibold text-emerald-400">{currentQuestion.scaleEstimation.avgQps}</span>
                            </div>
                          )}
                          {currentQuestion.scaleEstimation.peakQps && (
                            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                              <span className="text-slate-400 text-[10px] block">Peak QPS</span>
                              <span className="font-semibold text-amber-400">{currentQuestion.scaleEstimation.peakQps}</span>
                            </div>
                          )}
                          {currentQuestion.scaleEstimation.readsWritesRatio && (
                            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                              <span className="text-slate-400 text-[10px] block">Read / Write Ratio</span>
                              <span className="font-semibold text-cyan-400">{currentQuestion.scaleEstimation.readsWritesRatio}</span>
                            </div>
                          )}
                          {currentQuestion.scaleEstimation.storagePerDay && (
                            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                              <span className="text-slate-400 text-[10px] block">Storage / Day</span>
                              <span className="font-semibold text-slate-200">{currentQuestion.scaleEstimation.storagePerDay}</span>
                            </div>
                          )}
                          {currentQuestion.scaleEstimation.storagePerYear && (
                            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                              <span className="text-slate-400 text-[10px] block">Storage / Year</span>
                              <span className="font-semibold text-slate-200">{currentQuestion.scaleEstimation.storagePerYear}</span>
                            </div>
                          )}
                          {currentQuestion.scaleEstimation.bandwidth && (
                            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                              <span className="text-slate-400 text-[10px] block">Bandwidth</span>
                              <span className="font-semibold text-slate-200">{currentQuestion.scaleEstimation.bandwidth}</span>
                            </div>
                          )}
                          {currentQuestion.scaleEstimation.cacheMemory && (
                            <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50">
                              <span className="text-slate-400 text-[10px] block">Cache RAM (80/20 Rule)</span>
                              <span className="font-semibold text-indigo-300">{currentQuestion.scaleEstimation.cacheMemory}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Architecture Diagram (ASCII Art) */}
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                          <Layers className="w-4 h-4" /> High-Level Architecture Diagram
                        </h4>
                        <span className="text-[10px] text-slate-500 font-mono">ASCII Architecture Flow</span>
                      </div>
                      <pre className="p-4 rounded-lg bg-slate-900/90 text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                        {currentQuestion.architecture.diagramAscii}
                      </pre>
                      <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                        {currentQuestion.architecture.description}
                      </p>
                    </div>

                    {/* Component Breakdown */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Core System Components & Responsibilities
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {currentQuestion.architecture.components.map((comp, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-slate-800/40 border border-slate-700/60 text-xs">
                            <div className="font-bold text-indigo-300 mb-0.5">{comp.name}</div>
                            <div className="text-[11px] font-semibold text-cyan-400 mb-1.5">{comp.role}</div>
                            <div className="text-slate-300 text-[11px] leading-relaxed">{comp.details}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: API & DATA MODEL */}
                {activeTab === "api_data" && (
                  <div className="space-y-6">
                    {/* API Endpoints Spec */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                        <Radio className="w-4 h-4" /> API Interface & Contract Design
                      </h4>
                      <div className="space-y-3">
                        {currentQuestion.apiDesign.map((api, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`px-2 py-0.5 rounded text-xs font-bold font-mono ${
                                  api.method === "GET"
                                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                                    : api.method === "POST"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                    : api.method === "PUT"
                                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                                    : "bg-purple-500/20 text-purple-400 border border-purple-500/40"
                                }`}
                              >
                                {api.method}
                              </span>
                              <code className="text-xs font-mono font-bold text-slate-100 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                {api.endpoint}
                              </code>
                              <span className="text-xs text-slate-400 ml-auto">{api.description}</span>
                            </div>

                            {api.headers && (
                              <div className="text-xs">
                                <span className="text-[10px] text-slate-500 block font-mono">Headers:</span>
                                <pre className="p-2 rounded bg-slate-950 font-mono text-[11px] text-slate-300 border border-slate-800">
                                  {api.headers}
                                </pre>
                              </div>
                            )}

                            {api.requestBody && (
                              <div className="text-xs">
                                <span className="text-[10px] text-slate-500 block font-mono">Request Payload:</span>
                                <pre className="p-2 rounded bg-slate-950 font-mono text-[11px] text-emerald-300 border border-slate-800 overflow-x-auto">
                                  {api.requestBody}
                                </pre>
                              </div>
                            )}

                            {api.responseBody && (
                              <div className="text-xs">
                                <span className="text-[10px] text-slate-500 block font-mono">Response Payload:</span>
                                <pre className="p-2 rounded bg-slate-950 font-mono text-[11px] text-cyan-300 border border-slate-800 overflow-x-auto">
                                  {api.responseBody}
                                </pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Data Model & Entities */}
                    <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/60 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                          <Database className="w-4 h-4" /> Data Schema & Storage Architecture ({currentQuestion.dataModel.type})
                        </h4>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {currentQuestion.dataModel.explanation}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentQuestion.dataModel.entities.map((entity, idx) => (
                          <div key={idx} className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                            <div className="font-bold text-indigo-300 flex items-center justify-between">
                              <span>{entity.name}</span>
                              <span className="text-[10px] text-slate-500 font-normal">{entity.description}</span>
                            </div>
                            <div className="space-y-1 font-mono text-[11px]">
                              {entity.fields.map((f, fIdx) => (
                                <div key={fIdx} className="text-slate-300 flex items-center gap-1.5">
                                  <span className="text-indigo-400">▸</span> {f}
                                </div>
                              ))}
                            </div>
                            {entity.indexes && entity.indexes.length > 0 && (
                              <div className="pt-2 border-t border-slate-800 text-[10px] text-amber-400/90 font-mono">
                                Indexes: {entity.indexes.join(" | ")}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Database Choice Rationale */}
                    <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-2 text-xs">
                      <h4 className="font-bold text-slate-200 flex items-center gap-2">
                        <Server className="w-4 h-4 text-emerald-400" /> Database Choice Rationale: <span className="text-emerald-400">{currentQuestion.databaseChoice.primaryDb}</span>
                      </h4>
                      <p className="text-slate-300 leading-relaxed">
                        <strong className="text-slate-200">Why this DB:</strong> {currentQuestion.databaseChoice.rationale}
                      </p>
                      <p className="text-slate-400 leading-relaxed">
                        <strong className="text-slate-300">Alternative Considered:</strong> {currentQuestion.databaseChoice.alternativeConsidered} — {currentQuestion.databaseChoice.tradeoff}
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 3: SCALABILITY & RELIABILITY */}
                {activeTab === "scalability" && (
                  <div className="space-y-6">
                    {/* Concurrency & Consistency */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/60 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <Lock className="w-4 h-4" /> Concurrency & Thread Safety
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {currentQuestion.concurrencyAndThreadSafety}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/60 space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                          <GitBranch className="w-4 h-4" /> Consistency & PACELC Model
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {currentQuestion.consistencyModel}
                        </p>
                      </div>
                    </div>

                    {/* Cache & Queue Strategies */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentQuestion.cacheStrategy && (
                        <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/60 space-y-2 text-xs">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                            <Cpu className="w-4 h-4" /> Caching Strategy
                          </h4>
                          <div><strong className="text-slate-300">Type:</strong> {currentQuestion.cacheStrategy.cacheType}</div>
                          <div><strong className="text-slate-300">Eviction:</strong> {currentQuestion.cacheStrategy.evictionPolicy}</div>
                          <div><strong className="text-slate-300">Key Schema:</strong> <code className="font-mono text-indigo-300">{currentQuestion.cacheStrategy.keyStructure}</code></div>
                          <div><strong className="text-slate-300">TTL:</strong> {currentQuestion.cacheStrategy.ttl}</div>
                        </div>
                      )}

                      {currentQuestion.queueEventStrategy && (
                        <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/60 space-y-2 text-xs">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                            <Radio className="w-4 h-4" /> Event Streaming & Queues
                          </h4>
                          <div><strong className="text-slate-300">Technology:</strong> {currentQuestion.queueEventStrategy.technology}</div>
                          <div><strong className="text-slate-300">Topics / Queues:</strong> {currentQuestion.queueEventStrategy.topicsQueues.join(", ")}</div>
                          <div><strong className="text-slate-300">Partition Key:</strong> <code className="font-mono text-purple-300">{currentQuestion.queueEventStrategy.partitionKey}</code></div>
                          <div><strong className="text-slate-300">Idempotency:</strong> {currentQuestion.queueEventStrategy.idempotencyMechanism}</div>
                        </div>
                      )}
                    </div>

                    {/* Failure Scenarios & Mitigations */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" /> Failure Scenarios & Mitigations
                      </h4>
                      <div className="space-y-2">
                        {currentQuestion.failureScenarios.map((sc, idx) => (
                          <div key={idx} className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-xs grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div>
                              <span className="text-[10px] text-rose-400 font-bold block uppercase">Failure Event</span>
                              <span className="text-slate-200 font-semibold">{sc.failure}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-amber-400 font-bold block uppercase">Impact</span>
                              <span className="text-slate-300">{sc.impact}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-emerald-400 font-bold block uppercase">Mitigation Strategy</span>
                              <span className="text-slate-300">{sc.mitigation}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trade-Offs Matrix */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Architectural Trade-Offs & Decisions
                      </h4>
                      <div className="space-y-2">
                        {currentQuestion.tradeOffs.map((to, idx) => (
                          <div key={idx} className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/60 text-xs space-y-1.5">
                            <div className="font-bold text-indigo-300">{to.topic}</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                                <span className="text-slate-400 font-medium">Option A:</span> {to.optionA}
                              </div>
                              <div className="p-2 rounded bg-slate-900/60 border border-slate-800">
                                <span className="text-slate-400 font-medium">Option B:</span> {to.optionB}
                              </div>
                            </div>
                            <div className="text-[11px] text-emerald-300 font-medium pt-1">
                              <strong>Decision:</strong> {to.choiceMade} — <span className="text-slate-300">{to.why}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: LLD & OOP CODE */}
                {activeTab === "code_lld" && currentQuestion.lldOodDetails && (
                  <div className="space-y-6">
                    {/* SOLID Principles */}
                    <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/60 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> SOLID Principles Applied
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {currentQuestion.lldOodDetails.solidPrinciplesApplied.map((sp, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                            <span className="font-bold text-indigo-300 block">{sp.principle}</span>
                            <span className="text-slate-300 text-[11px]">{sp.application}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Design Patterns Used */}
                    <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/60 space-y-2.5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <Boxes className="w-4 h-4" /> Design Patterns & Rationale
                      </h4>
                      <div className="space-y-2">
                        {currentQuestion.lldOodDetails.designPatterns.map((dp, idx) => (
                          <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs space-y-1">
                            <div className="font-bold text-cyan-300">{dp.pattern}</div>
                            <div className="text-slate-300 text-[11px]"><strong className="text-slate-200">Why Used:</strong> {dp.whyUsed}</div>
                            <div className="text-slate-400 text-[11px]"><strong className="text-slate-300">Why Not Alternative:</strong> {dp.whyNotAlternative}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Code Implementation */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <Code2 className="w-4 h-4" /> Clean Code Implementation ({currentQuestion.lldOodDetails.codeImplementation.language.toUpperCase()})
                        </h4>
                        <button
                          id="copy-sd-code-btn"
                          onClick={() => handleCopyCode(currentQuestion.lldOodDetails!.codeImplementation.code)}
                          className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          {copiedCode ? "Copied!" : "Copy Code"}
                        </button>
                      </div>
                      <pre className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-emerald-300 border border-slate-800 overflow-x-auto leading-relaxed">
                        {currentQuestion.lldOodDetails.codeImplementation.code}
                      </pre>
                    </div>
                  </div>
                )}

                {/* TAB 5: FOLLOW-UPS & EVALUATION */}
                {activeTab === "followups" && (
                  <div className="space-y-6">
                    {/* Follow-up Questions Accordion */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4" /> Realistic Interviewer Follow-Up Probes ({currentQuestion.interviewFollowUps.length})
                      </h4>
                      <div className="space-y-2.5">
                        {currentQuestion.interviewFollowUps.map((fu, idx) => {
                          const isExpanded = expandedFollowUp === idx;
                          return (
                            <div
                              key={idx}
                              className="rounded-xl bg-slate-800/40 border border-slate-700/60 overflow-hidden transition-colors"
                            >
                              <button
                                onClick={() => setExpandedFollowUp(isExpanded ? null : idx)}
                                className="w-full p-3.5 text-left flex items-center justify-between gap-3 hover:bg-slate-800/60"
                              >
                                <span className="text-xs font-bold text-slate-100 flex items-center gap-2">
                                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] shrink-0 font-mono">
                                    Q{idx + 1}
                                  </span>
                                  {fu.question}
                                </span>
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                                )}
                              </button>

                              {isExpanded && (
                                <div className="p-4 bg-slate-900/90 border-t border-slate-800 text-xs space-y-2.5 animate-in fade-in duration-150">
                                  <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300/90 text-[11px]">
                                    <strong>Interviewer Context / Intent:</strong> {fu.interviewerContext}
                                  </div>
                                  <div className="text-slate-200 leading-relaxed">
                                    <strong className="text-emerald-400 block mb-1">Tier-1 Strong Candidate Answer:</strong>
                                    {fu.strongAnswer}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interviewer Evaluation Scorecard Rubrics */}
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                        <Award className="w-4 h-4" /> Tier-1 Hiring Committee Evaluation Rubrics
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-lg bg-rose-950/20 border border-rose-900/40">
                          <span className="font-bold text-rose-400 block">Weak (Reject):</span>
                          <span className="text-slate-300 text-[11px]">{currentQuestion.interviewerEvaluation.weak}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-900/40">
                          <span className="font-bold text-amber-400 block">Needs Improvement (Leaning No):</span>
                          <span className="text-slate-300 text-[11px]">{currentQuestion.interviewerEvaluation.needsImprovement}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-900/40">
                          <span className="font-bold text-blue-400 block">Good (Hire):</span>
                          <span className="text-slate-300 text-[11px]">{currentQuestion.interviewerEvaluation.good}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                          <span className="font-bold text-emerald-400 block">Strong (Strong Hire):</span>
                          <span className="text-slate-300 text-[11px]">{currentQuestion.interviewerEvaluation.strong}</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-purple-950/30 border border-purple-800/40">
                          <span className="font-bold text-purple-300 block">Tier-1 Ready (Top 1% Benchmark):</span>
                          <span className="text-slate-200 text-[11px]">{currentQuestion.interviewerEvaluation.tier1Ready}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 6: MOCK SIMULATION (9-STEP INTERVIEW FLOW) */}
                {activeTab === "simulation" && (
                  <div className="space-y-6">
                    {/* Header with Timer and Phase Navigation */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 via-indigo-500/10 to-slate-900 border border-amber-500/30 flex items-center justify-between flex-wrap gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            STEP {simStep + 1} OF 9
                          </span>
                          <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                            <Radio className="w-4 h-4 text-amber-400 animate-pulse" /> {simulationSteps[simStep].title}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                          {simulationSteps[simStep].desc}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-amber-500/30">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <div className="text-sm font-mono font-bold text-amber-400">
                            {formatTime(simTimerSeconds)}
                          </div>
                        </div>
                        <button
                          onClick={() => setTimerRunning(!timerRunning)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
                        >
                          {timerRunning ? "Pause" : "Start 45m Timer"}
                        </button>
                        {unlockedSolution ? (
                          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5" /> Solution Unlocked
                          </span>
                        ) : (
                          <button
                            onClick={() => setUnlockedSolution(true)}
                            className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-xs font-semibold text-indigo-300 border border-indigo-500/40 transition-colors"
                          >
                            Unlock Reference Tabs
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Step Timeline Pills */}
                    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5 bg-slate-950 p-2 rounded-xl border border-slate-800">
                      {simulationSteps.map((step, idx) => {
                        const isCurrent = simStep === idx;
                        const isPassed = simStep > idx;
                        return (
                          <button
                            key={idx}
                            id={`sim-step-pill-${idx + 1}`}
                            onClick={() => setSimStep(idx)}
                            className={`p-2 rounded-lg text-center transition-all text-xs flex flex-col items-center gap-0.5 ${
                              isCurrent
                                ? "bg-amber-500/20 text-amber-300 border border-amber-500/50 font-bold shadow-sm"
                                : isPassed
                                ? "bg-indigo-950/40 text-indigo-300 border border-indigo-800/40 hover:bg-indigo-900/40"
                                : "bg-slate-900/60 text-slate-500 border border-slate-800/60 hover:text-slate-300"
                            }`}
                          >
                            <span className="text-[10px] font-mono">STEP {idx + 1}</span>
                            <span className="text-[11px] font-medium truncate max-w-[80px]">
                              {idx === 0 ? "Problem" : idx === 1 ? "Clarify" : idx === 2 ? "Constraints" : idx === 3 ? "Arch" : idx === 4 ? "Challenge" : idx === 5 ? "Trade-offs" : idx === 6 ? "Scale/Fail" : idx === 7 ? "Modify" : "Eval"}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* STEP 1: SHOW PROBLEM */}
                    {simStep === 0 && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Interviewer Prompt
                            </span>
                            <span className="text-xs text-slate-400">
                              {currentQuestion.reportedMetadata?.company ? `${currentQuestion.reportedMetadata.company} Interview Standard` : "Tier-1 Interview Standard"}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white leading-snug">
                            {currentQuestion.problemStatement}
                          </h3>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Treat this as an open whiteboard conversation. Start by asking clarifying questions to establish functional requirements, non-functional latency and scale targets, and system boundaries.
                          </p>
                        </div>

                        <div className="flex justify-end">
                          <button
                            id="sim-next-step-1"
                            onClick={() => setSimStep(1)}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 flex items-center gap-2 transition-all"
                          >
                            Proceed to Step 2: Clarify Requirements <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: CANDIDATE CLARIFIES REQUIREMENTS */}
                    {simStep === 1 && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                            <Check className="w-4 h-4" /> Requirements Discovery Checklist
                          </h4>
                          <p className="text-xs text-slate-300">
                            Check the requirements you would articulate to the interviewer before proceeding to architecture:
                          </p>

                          <div className="space-y-2">
                            {currentQuestion.functionalRequirements.map((req, idx) => {
                              const key = `func_${idx}`;
                              const checked = checkedRequirements[key] || false;
                              return (
                                <div
                                  key={idx}
                                  onClick={() => setCheckedRequirements({ ...checkedRequirements, [key]: !checked })}
                                  className={`p-3 rounded-lg border cursor-pointer transition-all flex items-start gap-2.5 text-xs ${
                                    checked ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-200" : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900"
                                  }`}
                                >
                                  <input type="checkbox" checked={checked} readOnly className="mt-0.5 accent-emerald-500" />
                                  <span>{req}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Candidate Notes */}
                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                            Your Notes / Whiteboard Scratches:
                          </label>
                          <textarea
                            value={candidateNotes[1] || ""}
                            onChange={(e) => setCandidateNotes({ ...candidateNotes, 1: e.target.value })}
                            placeholder="Draft your functional bounds, non-functional SLAs, and assumptions..."
                            rows={3}
                            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <button onClick={() => setSimStep(0)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                            <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
                          </button>
                          <button
                            id="sim-next-step-2"
                            onClick={() => setSimStep(2)}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg flex items-center gap-2"
                          >
                            Submit Requirements & Get Interviewer Constraints <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: INTERVIEWER GIVES ADDITIONAL CONSTRAINTS */}
                    {simStep === 2 && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-xl bg-indigo-950/30 border border-indigo-700/50 space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              Interviewer Response & Scale Constraints
                            </span>
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            "Great scope definition. Let's design for production scale with the following strict Service Level Agreements (SLAs):"
                          </p>

                          {currentQuestion.scaleEstimation ? (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs pt-1">
                              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                                <span className="text-[10px] text-slate-400 block">Read/Write SLA:</span>
                                <span className="font-bold text-cyan-400">{currentQuestion.scaleEstimation.readsWritesRatio || "10 : 1"}</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                                <span className="text-[10px] text-slate-400 block">Peak QPS:</span>
                                <span className="font-bold text-amber-400">{currentQuestion.scaleEstimation.peakQps || "10,000 QPS"}</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                                <span className="text-[10px] text-slate-400 block">Daily Storage:</span>
                                <span className="font-bold text-slate-200">{currentQuestion.scaleEstimation.storagePerDay || "50 GB/day"}</span>
                              </div>
                              <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
                                <span className="text-[10px] text-slate-400 block">Cache RAM:</span>
                                <span className="font-bold text-indigo-300">{currentQuestion.scaleEstimation.cacheMemory || "16 GB RAM"}</span>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs text-slate-300">Target 99.999% availability, P99 latency &lt; 50ms, and zero data loss on node failovers.</p>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <button onClick={() => setSimStep(1)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                            <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
                          </button>
                          <button
                            id="sim-next-step-3"
                            onClick={() => setSimStep(3)}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg flex items-center gap-2"
                          >
                            Propose High-Level Architecture <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: CANDIDATE PROPOSES ARCHITECTURE */}
                    {simStep === 3 && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                            <Layers className="w-4 h-4" /> Whiteboard Component Orchestration
                          </h4>
                          <p className="text-xs text-slate-300">
                            Structure the end-to-end pipeline: Client Gateway -&gt; Microservices -&gt; Distributed Cache -&gt; Database &amp; Event Queues.
                          </p>

                          <textarea
                            value={candidateNotes[3] || ""}
                            onChange={(e) => setCandidateNotes({ ...candidateNotes, 3: e.target.value })}
                            placeholder="Draft your component interactions, API signatures, and cache write policies..."
                            rows={5}
                            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <button onClick={() => setSimStep(2)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                            <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
                          </button>
                          <button
                            id="sim-next-step-4"
                            onClick={() => setSimStep(4)}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg flex items-center gap-2"
                          >
                            Submit Architecture for Interviewer Challenge <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: INTERVIEWER CHALLENGES THE ARCHITECTURE */}
                    {simStep === 4 && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-xl bg-amber-950/20 border border-amber-700/50 space-y-3">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                              Interviewer Critical Probes &amp; Bottlenecks
                            </span>
                          </div>

                          <div className="space-y-2.5 text-xs text-slate-300">
                            {currentQuestion.interviewFollowUps.slice(0, 2).map((fu, idx) => (
                              <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                                <span className="font-bold text-amber-200 block">Probe #{idx + 1}: {fu.question}</span>
                                <span className="text-slate-400 text-[11px] block">{fu.interviewerContext}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                            Your Defense Strategy:
                          </label>
                          <textarea
                            value={candidateNotes[4] || ""}
                            onChange={(e) => setCandidateNotes({ ...candidateNotes, 4: e.target.value })}
                            placeholder="Explain how your design handles race conditions, cache stampedes, or database connection pool exhaustion..."
                            rows={3}
                            className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <button onClick={() => setSimStep(3)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                            <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
                          </button>
                          <button
                            id="sim-next-step-5"
                            onClick={() => setSimStep(5)}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg flex items-center gap-2"
                          >
                            Proceed to Trade-offs Defense <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 6: CANDIDATE DISCUSSES TRADE-OFFS */}
                    {simStep === 5 && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                            <GitBranch className="w-4 h-4" /> Architectural Trade-Off Analysis
                          </h4>
                          <p className="text-xs text-slate-300">
                            Defend your architectural trade-offs across database models, consistency theorems (PACELC), and synchronous vs asynchronous patterns:
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                              <span className="font-bold text-cyan-400 block">Primary Database Rationale:</span>
                              <span className="text-slate-300">{currentQuestion.databaseChoice.primaryDb}</span>
                              <p className="text-slate-400 text-[11px]">{currentQuestion.databaseChoice.rationale}</p>
                            </div>
                            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                              <span className="font-bold text-amber-400 block">Alternative &amp; Trade-off:</span>
                              <span className="text-slate-300">{currentQuestion.databaseChoice.alternativeConsidered}</span>
                              <p className="text-slate-400 text-[11px]">{currentQuestion.databaseChoice.tradeoff}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <button onClick={() => setSimStep(4)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                            <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
                          </button>
                          <button
                            id="sim-next-step-6"
                            onClick={() => setSimStep(6)}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg flex items-center gap-2"
                          >
                            Receive Live Failure / Scale Shock <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 7: INTERVIEWER INTRODUCES SCALE/FAILURE SCENARIO */}
                    {simStep === 6 && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-700/50 space-y-3">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-rose-400" />
                            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                              Interviewer Injects Live Shock / Disaster Scenario
                            </span>
                          </div>

                          <div className="space-y-2 text-xs text-slate-200">
                            {currentQuestion.failureScenarios.slice(0, 2).map((fs, idx) => (
                              <div key={idx} className="p-3 rounded-lg bg-slate-900/90 border border-rose-900/40 space-y-1">
                                <span className="font-bold text-rose-300 block">Scenario #{idx + 1}: {fs.failure}</span>
                                <span className="text-slate-300 block">Impact: {fs.impact}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <button onClick={() => setSimStep(5)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                            <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
                          </button>
                          <button
                            id="sim-next-step-7"
                            onClick={() => setSimStep(7)}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg flex items-center gap-2"
                          >
                            Modify Design &amp; Add Mitigations <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 8: CANDIDATE MODIFIES DESIGN */}
                    {simStep === 7 && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4" /> Resilience &amp; Fault Mitigation Plan
                          </h4>
                          <p className="text-xs text-slate-300">
                            Incorporate circuit breakers, read replicas, consistent hashing virtual nodes, and backpressure buffering:
                          </p>

                          <div className="space-y-2 text-xs">
                            {currentQuestion.failureScenarios.map((fs, idx) => (
                              <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                                <span className="font-bold text-indigo-300 block">{fs.failure}</span>
                                <span className="text-emerald-300 font-medium block">Mitigation: {fs.mitigation}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <button onClick={() => setSimStep(6)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300">
                            <ChevronLeft className="w-4 h-4 inline mr-1" /> Back
                          </button>
                          <button
                            id="sim-next-step-8"
                            onClick={() => {
                              setSimStep(8);
                              setUnlockedSolution(true);
                            }}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg flex items-center gap-2"
                          >
                            Complete Simulation &amp; View Final Evaluation <Check className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* STEP 9: FINAL EVALUATION & REFERENCE UNLOCK */}
                    {simStep === 8 && (
                      <div className="space-y-6 animate-in fade-in duration-300">
                        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-indigo-950/30 to-slate-900 border border-emerald-500/40 space-y-4">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <Award className="w-5 h-5 text-emerald-400" />
                              <h3 className="text-base font-bold text-white">
                                Interview Simulation Completed!
                              </h3>
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              All Reference Solution Tabs Unlocked
                            </span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed">
                            Review your performance against Tier-1 hiring committee expectations below. You can now freely inspect the complete reference architecture, API contracts, data models, scalability formulas, and production code in the tabs above.
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <button
                              id="unlock-view-architecture-btn"
                              onClick={() => {
                                setUnlockedSolution(true);
                                setActiveTab("architecture");
                              }}
                              className="p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white text-center shadow-md transition-all flex items-center justify-center gap-2"
                            >
                              <Server className="w-4 h-4" /> View Full Architecture &amp; Diagrams
                            </button>
                            <button
                              id="unlock-view-code-btn"
                              onClick={() => {
                                setUnlockedSolution(true);
                                setActiveTab(currentQuestion.lldOodDetails ? "code_lld" : "api_data");
                              }}
                              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 text-center border border-slate-700 transition-all flex items-center justify-center gap-2"
                            >
                              <Code2 className="w-4 h-4" /> View API &amp; Code Implementations
                            </button>
                          </div>
                        </div>

                        {/* 5-Tier Rubric Breakdown */}
                        <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                            <Award className="w-4 h-4" /> Tier-1 Hiring Committee Evaluation Scorecard
                          </h4>
                          <div className="space-y-2 text-xs">
                            <div className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40">
                              <span className="font-bold text-rose-400 block mb-0.5">Weak (Reject):</span>
                              <span className="text-slate-300 text-[11px] leading-relaxed">{currentQuestion.interviewerEvaluation.weak}</span>
                            </div>
                            <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-900/40">
                              <span className="font-bold text-amber-400 block mb-0.5">Needs Improvement (Leaning No):</span>
                              <span className="text-slate-300 text-[11px] leading-relaxed">{currentQuestion.interviewerEvaluation.needsImprovement}</span>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-900/40">
                              <span className="font-bold text-blue-400 block mb-0.5">Good (Hire):</span>
                              <span className="text-slate-300 text-[11px] leading-relaxed">{currentQuestion.interviewerEvaluation.good}</span>
                            </div>
                            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40">
                              <span className="font-bold text-emerald-400 block mb-0.5">Strong (Strong Hire):</span>
                              <span className="text-slate-300 text-[11px] leading-relaxed">{currentQuestion.interviewerEvaluation.strong}</span>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-800/40">
                              <span className="font-bold text-purple-300 block mb-0.5">Tier-1 Ready (Top 1% Benchmark):</span>
                              <span className="text-slate-200 text-[11px] leading-relaxed">{currentQuestion.interviewerEvaluation.tier1Ready}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-slate-500 text-sm">
              No matching System Design problems found. Adjust filters or search terms.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
