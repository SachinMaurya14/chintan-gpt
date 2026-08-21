import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  X,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  AlertTriangle,
  Award,
  BookOpen,
  Target,
  BarChart2,
  ChevronDown,
  ChevronUp,
  Filter,
  Check,
  Sparkles,
  Clock,
  Bookmark,
  Eraser,
  HelpCircle,
  Layers,
  Search,
  Flag,
  Play,
  FileCheck
} from "lucide-react";
import { PlacementQuestion } from "../../data/tcsPercentagesQuestions.js";

interface TopicQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  topicTitle: string;
  categoryTitle: string;
  companyName: string;
  questions: PlacementQuestion[];
}

interface UserAnswer {
  questionId: string;
  selectedOption: "A" | "B" | "C" | "D" | null;
  isCorrect: boolean;
  isMarkedForReview: boolean;
  isVisited: boolean;
  submittedAt?: string;
}

export const TopicQuizModal: React.FC<TopicQuizModalProps> = ({
  isOpen,
  onClose,
  topicTitle,
  categoryTitle,
  companyName,
  questions
}) => {
  // Mode: "practice" (immediate feedback) vs "mock" (timed, solutions hidden until test end)
  const [testMode, setTestMode] = useState<"practice" | "mock">("practice");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);
  const [activeTierFilter, setActiveTierFilter] = useState<string>("All");
  const [reviewFilter, setReviewFilter] = useState<"all" | "correct" | "incorrect" | "unattempted" | "flagged">("all");
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);
  const [showQuestionPalette, setShowQuestionPalette] = useState<boolean>(false);

  // Timer for Mock Mode (60 minutes = 3600 seconds)
  const [timeRemaining, setTimeRemaining] = useState<number>(3600);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const timerRef = useRef<any>(null);

  // Filtered questions according to tier
  const filteredQuestions = useMemo(() => {
    if (!questions || questions.length === 0) return [];
    if (activeTierFilter === "All") return questions;
    return questions.filter((q) => {
      const num = q.questionNumber;
      if (activeTierFilter === "Foundation") return num >= 1 && num <= 20;
      if (activeTierFilter === "Moderate") return num >= 21 && num <= 40;
      if (activeTierFilter === "Advanced") return num >= 41 && num <= 60;
      if (activeTierFilter === "Placement Level") return num >= 61 && num <= 80;
      if (activeTierFilter === "Mixed Advanced") return num >= 81 && num <= 100;
      return true;
    });
  }, [questions, activeTierFilter]);

  const activeQuestions = filteredQuestions.length > 0 ? filteredQuestions : questions;
  const currentQuestion = activeQuestions[Math.min(currentIndex, activeQuestions.length - 1)] || questions[0];

  // Initialize or update visited state for the current question
  useEffect(() => {
    if (!isOpen || !currentQuestion) return;
    setAnswers((prev) => {
      const existing = prev[currentQuestion.id];
      if (!existing) {
        return {
          ...prev,
          [currentQuestion.id]: {
            questionId: currentQuestion.id,
            selectedOption: null,
            isCorrect: false,
            isMarkedForReview: false,
            isVisited: true
          }
        };
      } else if (!existing.isVisited) {
        return {
          ...prev,
          [currentQuestion.id]: {
            ...existing,
            isVisited: true
          }
        };
      }
      return prev;
    });
  }, [isOpen, currentQuestion?.id]);

  // Sync selectedOption state when moving between questions
  useEffect(() => {
    if (currentQuestion) {
      setSelectedOption(answers[currentQuestion.id]?.selectedOption || null);
    }
  }, [currentIndex, currentQuestion?.id]);

  // Timer logic for Mock Test Mode
  useEffect(() => {
    if (isOpen && testMode === "mock" && !isQuizCompleted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsQuizCompleted(true);
            return 0;
          }
          return prev - 1;
        });
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen, testMode, isQuizCompleted]);

  if (!isOpen || !questions || questions.length === 0) return null;

  const totalQuestions = activeQuestions.length;
  const currentAnswer = answers[currentQuestion.id];
  const isPracticeSubmitted = testMode === "practice" && !!currentAnswer?.submittedAt;

  // Stats calculation
  const allAnsweredList = (Object.values(answers) as UserAnswer[]).filter((a) => a.selectedOption !== null);
  const attemptedCount = allAnsweredList.length;
  const correctCount = allAnsweredList.filter((a) => a.isCorrect).length;
  const wrongCount = attemptedCount - correctCount;
  const unattemptedCount = questions.length - attemptedCount;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  const score = correctCount; // 1 mark per correct

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // State evaluation for Question Palette (5 TCS states)
  const getQuestionPaletteState = (q: PlacementQuestion) => {
    const ans = answers[q.id];
    if (!ans || !ans.isVisited) return "not_visited";
    if (ans.isMarkedForReview && ans.selectedOption) return "answered_and_marked";
    if (ans.isMarkedForReview) return "marked_for_review";
    if (ans.selectedOption) return "answered";
    return "not_answered";
  };

  const handleSelectOption = (key: "A" | "B" | "C" | "D") => {
    if (testMode === "practice" && isPracticeSubmitted) return;
    setSelectedOption(key);

    if (testMode === "mock") {
      const isCorrect = key === currentQuestion.correctAnswer;
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          ...(prev[currentQuestion.id] || { isMarkedForReview: false }),
          questionId: currentQuestion.id,
          selectedOption: key,
          isCorrect,
          isVisited: true
        }
      }));
    }
  };

  const handleClearResponse = () => {
    if (testMode === "practice" && isPracticeSubmitted) return;
    setSelectedOption(null);
    setAnswers((prev) => {
      const existing = prev[currentQuestion.id];
      if (!existing) return prev;
      return {
        ...prev,
        [currentQuestion.id]: {
          ...existing,
          selectedOption: null,
          isCorrect: false,
          submittedAt: undefined
        }
      };
    });
  };

  const handleToggleMarkForReview = () => {
    setAnswers((prev) => {
      const existing = prev[currentQuestion.id] || {
        questionId: currentQuestion.id,
        selectedOption: selectedOption,
        isCorrect: selectedOption === currentQuestion.correctAnswer,
        isMarkedForReview: false,
        isVisited: true
      };
      return {
        ...prev,
        [currentQuestion.id]: {
          ...existing,
          isMarkedForReview: !existing.isMarkedForReview
        }
      };
    });
  };

  const handleSubmitPracticeAnswer = () => {
    if (!selectedOption || isPracticeSubmitted) return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || { isMarkedForReview: false, isVisited: true }),
        questionId: currentQuestion.id,
        selectedOption,
        isCorrect,
        isVisited: true,
        submittedAt: new Date().toISOString()
      }
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsQuizCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIndex(index);
    setShowQuestionPalette(false);
  };

  const handleRestartQuiz = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsQuizCompleted(false);
    setExpandedReviewId(null);
    setTimeRemaining(3600);
    setElapsedTime(0);
  };

  // Tier-wise breakdown for result page
  const getTierStats = (startQ: number, endQ: number) => {
    const tierQuestions = questions.filter((q) => q.questionNumber >= startQ && q.questionNumber <= endQ);
    const tierAttempted = tierQuestions.filter((q) => answers[q.id]?.selectedOption).length;
    const tierCorrect = tierQuestions.filter((q) => answers[q.id]?.isCorrect).length;
    const tierAccuracy = tierAttempted > 0 ? Math.round((tierCorrect / tierAttempted) * 100) : 0;
    return { total: tierQuestions.length, attempted: tierAttempted, correct: tierCorrect, accuracy: tierAccuracy };
  };

  const foundationStats = getTierStats(1, 20);
  const moderateStats = getTierStats(21, 40);
  const advancedStats = getTierStats(41, 60);
  const placementStats = getTierStats(61, 80);
  const mixedStats = getTierStats(81, 100);

  // Filtered review list
  const filteredReviewQuestions = useMemo(() => {
    return questions.filter((q) => {
      const ans = answers[q.id];
      if (reviewFilter === "correct") return ans?.isCorrect === true;
      if (reviewFilter === "incorrect") return ans && ans.selectedOption !== null && ans.isCorrect === false;
      if (reviewFilter === "unattempted") return !ans || ans.selectedOption === null;
      if (reviewFilter === "flagged") return q.isInconsistent;
      return true;
    });
  }, [questions, answers, reviewFilter]);

  const getDifficultyBadgeColor = (diff: string) => {
    switch (diff) {
      case "Foundation":
      case "Easy":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Moderate":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "Advanced":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Placement Level":
      case "Tricky":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "Mixed Advanced":
      case "High-level":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-zinc-800 text-zinc-300 border-zinc-700";
    }
  };

  return (
    <div
      id="topic-quiz-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div className="relative w-full max-w-6xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden text-zinc-100 font-sans">
        
        {/* Top Assessment Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800 bg-[#121218] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                  {companyName} • {categoryTitle}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                  {topicTitle}
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold font-mono text-white leading-tight mt-0.5">
                TCS NQT Question Bank ({questions.length} Questions)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Selector Toggle */}
            {!isQuizCompleted && (
              <div className="hidden sm:flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5 text-xs font-mono">
                <button
                  id="btn-mode-practice"
                  onClick={() => setTestMode("practice")}
                  className={`px-3 py-1 rounded-md transition font-semibold flex items-center gap-1.5 ${
                    testMode === "practice" ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Play className="w-3 h-3" />
                  <span>Practice Mode</span>
                </button>
                <button
                  id="btn-mode-mock"
                  onClick={() => setTestMode("mock")}
                  className={`px-3 py-1 rounded-md transition font-semibold flex items-center gap-1.5 ${
                    testMode === "mock" ? "bg-orange-500 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span>Mock Exam Mode</span>
                </button>
              </div>
            )}

            {/* Timer Display for Mock Mode */}
            {!isQuizCompleted && testMode === "mock" && (
              <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 animate-pulse" />
                <span>{formatTimer(timeRemaining)}</span>
              </div>
            )}

            {!isQuizCompleted && (
              <button
                id="btn-toggle-question-palette"
                onClick={() => setShowQuestionPalette(!showQuestionPalette)}
                className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700 text-xs font-mono text-zinc-200 transition flex items-center gap-1.5"
                title="TCS Question Palette"
              >
                <Target className="w-3.5 h-3.5 text-orange-400" />
                <span>Palette</span>
              </button>
            )}

            <button
              id="btn-close-topic-quiz"
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tier & Difficulty Filter Tabs */}
        {!isQuizCompleted && (
          <div className="bg-[#0f0f15] border-b border-zinc-800 px-5 py-2 flex flex-wrap items-center justify-between gap-2 shrink-0 text-xs font-mono">
            <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
              <span className="text-zinc-400 text-[11px] uppercase mr-1.5 flex items-center gap-1">
                <Filter className="w-3 h-3 text-orange-400" /> Tier:
              </span>
              {[
                { key: "All", label: `All (${questions.length})` },
                { key: "Foundation", label: "Foundation (Q01–Q20)" },
                { key: "Moderate", label: "Moderate (Q21–Q40)" },
                { key: "Advanced", label: "Advanced (Q41–Q60)" },
                { key: "Placement Level", label: "Placement (Q61–Q80)" },
                { key: "Mixed Advanced", label: "Mixed Adv (Q81–Q100)" }
              ].map((tier) => (
                <button
                  key={tier.key}
                  onClick={() => {
                    setActiveTierFilter(tier.key);
                    setCurrentIndex(0);
                  }}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition whitespace-nowrap ${
                    activeTierFilter === tier.key
                      ? "bg-orange-500/20 text-orange-400 border border-orange-500/40 font-bold"
                      : "bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80"
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>

            {/* Live Progress Bar */}
            <div className="flex items-center gap-2">
              <span className="text-zinc-400 text-[11px]">
                Question {currentIndex + 1} of {totalQuestions}
              </span>
              <div className="w-24 bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-orange-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.round(((currentIndex + 1) / totalQuestions) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {!isQuizCompleted ? (
            /* ACTIVE QUESTION INTERFACE */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-6xl mx-auto">
              
              {/* Question & Options Area (Left 8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                
                {/* Question Info Bar */}
                <div className="flex items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2.5 py-1 rounded-lg">
                      Question {currentQuestion.questionNumber}
                    </span>
                    <span className={`text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-lg border ${getDifficultyBadgeColor(currentQuestion.difficulty)}`}>
                      {currentQuestion.difficulty}
                    </span>
                    {currentAnswer?.isMarkedForReview && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-1 font-bold">
                        <Bookmark className="w-3 h-3 fill-current" />
                        <span>Marked for Review</span>
                      </span>
                    )}
                  </div>

                  {testMode === "practice" && isPracticeSubmitted && (
                    <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg flex items-center gap-1.5 ${
                      currentAnswer?.isCorrect
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>
                      {currentAnswer?.isCorrect ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correct (+1)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrect</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <div className="bg-[#14141a] p-5 sm:p-6 rounded-2xl border border-zinc-800 text-sm sm:text-base leading-relaxed text-zinc-100 font-medium shadow-sm">
                  {currentQuestion.question}
                </div>

                {/* Options List */}
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                    <span>Options:</span>
                    {selectedOption && !isPracticeSubmitted && (
                      <button
                        onClick={handleClearResponse}
                        className="text-[11px] text-zinc-400 hover:text-orange-400 flex items-center gap-1 transition"
                      >
                        <Eraser className="w-3 h-3" />
                        <span>Clear Response</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {currentQuestion.options.map((opt) => {
                      const isSelected = selectedOption === opt.key;
                      const isCorrectOpt = opt.key === currentQuestion.correctAnswer;
                      
                      let cardStyles = "bg-[#131318] border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-[#181820]";
                      let keyBadgeStyles = "bg-zinc-800 text-zinc-300 border-zinc-700";

                      if (testMode === "mock") {
                        if (isSelected) {
                          cardStyles = "bg-orange-500/15 border-orange-500 text-orange-200 shadow-md shadow-orange-500/10";
                          keyBadgeStyles = "bg-orange-500 text-white border-orange-400";
                        }
                      } else {
                        // Practice Mode
                        if (!isPracticeSubmitted) {
                          if (isSelected) {
                            cardStyles = "bg-orange-500/15 border-orange-500 text-orange-200 shadow-md shadow-orange-500/10";
                            keyBadgeStyles = "bg-orange-500 text-white border-orange-400";
                          }
                        } else {
                          // After submit in practice mode
                          if (isCorrectOpt) {
                            cardStyles = "bg-emerald-500/15 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10";
                            keyBadgeStyles = "bg-emerald-500 text-white border-emerald-400";
                          } else if (isSelected && !currentAnswer.isCorrect) {
                            cardStyles = "bg-rose-500/15 border-rose-500 text-rose-200 shadow-md shadow-rose-500/10";
                            keyBadgeStyles = "bg-rose-500 text-white border-rose-400";
                          } else {
                            cardStyles = "bg-[#0f0f13] border-zinc-800/60 text-zinc-500 opacity-60";
                            keyBadgeStyles = "bg-zinc-900 text-zinc-600 border-zinc-800";
                          }
                        }
                      }

                      return (
                        <button
                          key={opt.key}
                          id={`btn-option-${opt.key}`}
                          onClick={() => handleSelectOption(opt.key)}
                          disabled={testMode === "practice" && isPracticeSubmitted}
                          className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition ${cardStyles}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 border transition ${keyBadgeStyles}`}>
                              {opt.key}
                            </span>
                            <span className="text-sm font-medium leading-snug">{opt.text}</span>
                          </div>

                          {testMode === "practice" && isPracticeSubmitted && isCorrectOpt && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          )}
                          {testMode === "practice" && isPracticeSubmitted && isSelected && !currentAnswer.isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inconsistency Warning (if flagged) */}
                {testMode === "practice" && isPracticeSubmitted && currentQuestion.isInconsistent && currentQuestion.inconsistencyNote && (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
                    <div className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Official Source Key Inconsistency Flag</span>
                    </div>
                    <p className="leading-relaxed text-zinc-300 font-sans">
                      {currentQuestion.inconsistencyNote}
                    </p>
                  </div>
                )}

                {/* Practice Mode Solution Card (Rendered After Submit) */}
                {testMode === "practice" && isPracticeSubmitted && (
                  <div className="p-5 rounded-2xl bg-[#121218] border border-zinc-800 space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                        <Sparkles className="w-4 h-4" />
                        <span>Step-by-Step Solution & Concept</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        Correct Answer: Option {currentQuestion.correctAnswer}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-zinc-300 leading-relaxed whitespace-pre-line font-mono bg-[#0b0b0e] p-4 rounded-xl border border-zinc-800/80">
                      {currentQuestion.solution}
                    </div>
                  </div>
                )}

                {/* Action Controls Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800">
                  <div className="flex items-center gap-2">
                    <button
                      id="btn-quiz-prev"
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      className="px-3.5 py-2 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed transition flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Previous</span>
                    </button>

                    <button
                      id="btn-mark-for-review"
                      onClick={handleToggleMarkForReview}
                      className={`px-3.5 py-2 rounded-xl border text-xs font-mono transition flex items-center gap-1.5 ${
                        currentAnswer?.isMarkedForReview
                          ? "bg-purple-500/20 border-purple-500 text-purple-300 font-bold"
                          : "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{currentAnswer?.isMarkedForReview ? "Marked" : "Mark for Review"}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {testMode === "practice" && !isPracticeSubmitted ? (
                      <button
                        id="btn-quiz-submit"
                        onClick={handleSubmitPracticeAnswer}
                        disabled={!selectedOption}
                        className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Submit Answer</span>
                      </button>
                    ) : (
                      <button
                        id="btn-quiz-next"
                        onClick={handleNext}
                        className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-md shadow-orange-500/20"
                      >
                        <span>{currentIndex === totalQuestions - 1 ? "Finish Test" : "Save & Next"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {testMode === "mock" && (
                      <button
                        id="btn-submit-mock-test"
                        onClick={() => setIsQuizCompleted(true)}
                        className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-1.5"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Submit Test</span>
                      </button>
                    )}
                  </div>
                </div>

              </div>

              {/* Right Side: TCS Style Question Palette (4 cols) */}
              <div className="lg:col-span-4 bg-[#111116] border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-orange-400" />
                      <h3 className="font-bold text-xs font-mono uppercase text-white">
                        Question Palette ({totalQuestions})
                      </h3>
                    </div>
                  </div>

                  {/* TCS Palette State Legend */}
                  <div className="grid grid-cols-2 gap-2 my-3 text-[10px] font-mono text-zinc-400 bg-[#0d0d12] p-2.5 rounded-xl border border-zinc-800/80">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-emerald-600 inline-block shrink-0" />
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-amber-600 inline-block shrink-0" />
                      <span>Not Answered</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-purple-600 inline-block shrink-0" />
                      <span>Marked Review</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3.5 h-3.5 rounded bg-zinc-800 border border-zinc-700 inline-block shrink-0" />
                      <span>Not Visited</span>
                    </div>
                  </div>

                  {/* Question Grid Buttons */}
                  <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-1.5 max-h-[300px] overflow-y-auto pr-1 py-1">
                    {activeQuestions.map((q, idx) => {
                      const state = getQuestionPaletteState(q);
                      const isCurrent = idx === currentIndex;

                      let btnStyle = "bg-zinc-800/70 border-zinc-700 text-zinc-400";
                      if (state === "answered") {
                        btnStyle = "bg-emerald-600 text-white border-emerald-500";
                      } else if (state === "answered_and_marked") {
                        btnStyle = "bg-purple-600 text-white border-emerald-400 ring-1 ring-emerald-400";
                      } else if (state === "marked_for_review") {
                        btnStyle = "bg-purple-600 text-white border-purple-500";
                      } else if (state === "not_answered") {
                        btnStyle = "bg-amber-600 text-white border-amber-500";
                      }

                      return (
                        <button
                          key={q.id}
                          id={`palette-q-${q.questionNumber}`}
                          onClick={() => handleJumpToQuestion(idx)}
                          className={`h-8 rounded-lg font-mono text-xs font-bold border transition flex items-center justify-center relative ${btnStyle} ${
                            isCurrent ? "ring-2 ring-orange-400 ring-offset-1 ring-offset-[#111116] scale-105" : ""
                          }`}
                        >
                          {q.questionNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Score / Status Summary Footer */}
                <div className="pt-3 border-t border-zinc-800 text-[11px] font-mono text-zinc-400 space-y-1.5">
                  <div className="flex justify-between">
                    <span>Attempted:</span>
                    <span className="text-white font-bold">{attemptedCount} / {questions.length}</span>
                  </div>
                  {testMode === "practice" && (
                    <>
                      <div className="flex justify-between">
                        <span>Correct:</span>
                        <span className="text-emerald-400 font-bold">{correctCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Accuracy:</span>
                        <span className="text-orange-400 font-bold">{accuracy}%</span>
                      </div>
                    </>
                  )}
                </div>

              </div>

            </div>
          ) : (
            /* ================= RESULT & DIAGNOSTIC PAGE ================= */
            <div className="space-y-8 max-w-4xl mx-auto py-2">
              
              {/* Result Summary Hero Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#181824] to-[#111116] border border-zinc-800 text-center space-y-5 shadow-xl">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center mx-auto shadow-inner">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400">
                    TCS Numerical Ability Assessment Scorecard
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black font-mono text-white">
                    {topicTitle}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono">
                    Time Taken: {formatTimer(elapsedTime)} • Mode: {testMode === "mock" ? "Mock Exam" : "Practice Drill"}
                  </p>
                </div>

                {/* Key Metric Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 max-w-3xl mx-auto">
                  <div className="p-3.5 rounded-2xl bg-[#0d0d12] border border-zinc-800/80 font-mono">
                    <div className="text-[10px] text-zinc-400 uppercase">Total Questions</div>
                    <div className="text-xl sm:text-2xl font-bold text-white mt-1">{questions.length}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#0d0d12] border border-zinc-800/80 font-mono">
                    <div className="text-[10px] text-zinc-400 uppercase">Attempted</div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-400 mt-1">{attemptedCount}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#0d0d12] border border-zinc-800/80 font-mono">
                    <div className="text-[10px] text-emerald-400 uppercase">Correct</div>
                    <div className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1">{correctCount}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#0d0d12] border border-zinc-800/80 font-mono">
                    <div className="text-[10px] text-rose-400 uppercase">Incorrect</div>
                    <div className="text-xl sm:text-2xl font-bold text-rose-400 mt-1">{wrongCount}</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-[#0d0d12] border border-zinc-800/80 font-mono">
                    <div className="text-[10px] text-orange-400 uppercase">Accuracy</div>
                    <div className="text-xl sm:text-2xl font-bold text-orange-400 mt-1">{accuracy}%</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    id="btn-retake-topic-quiz"
                    onClick={handleRestartQuiz}
                    className="px-5 py-2.5 rounded-xl border border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-bold text-white transition flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Question Bank</span>
                  </button>
                  <button
                    id="btn-finish-topic-quiz"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs font-mono font-bold text-white uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-orange-500/20"
                  >
                    <Check className="w-4 h-4" />
                    <span>Back to TCS Hub</span>
                  </button>
                </div>
              </div>

              {/* Tier Performance Diagnostic Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-orange-400" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                    Difficulty Tier Diagnostic Breakdown
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {[
                    { title: "Foundation", range: "Q01–Q20", stats: foundationStats, color: "emerald" },
                    { title: "Moderate", range: "Q21–Q40", stats: moderateStats, color: "blue" },
                    { title: "Advanced", range: "Q41–Q60", stats: advancedStats, color: "amber" },
                    { title: "Placement Level", range: "Q61–Q80", stats: placementStats, color: "purple" },
                    { title: "Mixed Advanced", range: "Q81–Q100", stats: mixedStats, color: "rose" }
                  ].map((tier, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#121217] border border-zinc-800 font-mono space-y-1.5">
                      <div className="text-xs font-bold text-white">{tier.title}</div>
                      <div className="text-[10px] text-zinc-400">{tier.range}</div>
                      <div className="pt-2 flex items-baseline justify-between border-t border-zinc-800/60">
                        <span className="text-[11px] text-zinc-400">Score:</span>
                        <span className="text-xs font-bold text-emerald-400">
                          {tier.stats.correct} / {tier.stats.total}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="text-[11px] text-zinc-400">Accuracy:</span>
                        <span className="text-xs font-bold text-orange-400">
                          {tier.stats.accuracy}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Detailed Review Section */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-orange-400" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                      Detailed Solutions & Explanations ({filteredReviewQuestions.length})
                    </h4>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {(["all", "correct", "incorrect", "unattempted", "flagged"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setReviewFilter(f)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition uppercase tracking-wider ${
                          reviewFilter === f
                            ? "bg-orange-500 text-white"
                            : "bg-[#141419] text-zinc-400 hover:text-white border border-zinc-800"
                        }`}
                      >
                        {f === "all" ? `All (${questions.length})` : f === "correct" ? `Correct (${correctCount})` : f === "incorrect" ? `Wrong (${wrongCount})` : f === "unattempted" ? `Skipped (${unattemptedCount})` : "Flagged"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Review Questions List */}
                <div className="space-y-3">
                  {filteredReviewQuestions.map((q) => {
                    const ans = answers[q.id];
                    const isExpanded = expandedReviewId === q.id;
                    const isUserCorrect = ans?.isCorrect === true;
                    const isSkipped = !ans || ans.selectedOption === null;

                    return (
                      <div
                        key={q.id}
                        className="rounded-2xl bg-[#121217] border border-zinc-800 overflow-hidden transition"
                      >
                        <div
                          onClick={() => setExpandedReviewId(isExpanded ? null : q.id)}
                          className="p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-zinc-900/50 transition"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                              Q{q.questionNumber}
                            </span>
                            <span className="text-xs font-medium text-zinc-200 line-clamp-1">
                              {q.question}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {isSkipped ? (
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                                Unattempted
                              </span>
                            ) : isUserCorrect ? (
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 font-bold">
                                <CheckCircle2 className="w-3 h-3" /> Correct
                              </span>
                            ) : (
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center gap-1 font-bold">
                                <XCircle className="w-3 h-3" /> Incorrect
                              </span>
                            )}

                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-zinc-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-zinc-400" />
                            )}
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="p-4 sm:p-5 border-t border-zinc-800 bg-[#0e0e13] space-y-4 font-sans text-xs sm:text-sm">
                            <div className="p-4 rounded-xl bg-[#141419] border border-zinc-800 text-zinc-200 leading-relaxed font-medium">
                              {q.question}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {q.options.map((opt) => {
                                const isUserPick = ans?.selectedOption === opt.key;
                                const isCorrectChoice = opt.key === q.correctAnswer;

                                let optStyle = "bg-zinc-900/60 border-zinc-800 text-zinc-400";
                                if (isCorrectChoice) {
                                  optStyle = "bg-emerald-500/15 border-emerald-500 text-emerald-300 font-bold";
                                } else if (isUserPick && !isCorrectChoice) {
                                  optStyle = "bg-rose-500/15 border-rose-500 text-rose-300 line-through";
                                }

                                return (
                                  <div
                                    key={opt.key}
                                    className={`p-3 rounded-xl border flex items-center gap-2.5 ${optStyle}`}
                                  >
                                    <span className="w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-xs shrink-0 bg-black/40 border border-white/10">
                                      {opt.key}
                                    </span>
                                    <span>{opt.text}</span>
                                  </div>
                                );
                              })}
                            </div>

                            {q.isInconsistent && q.inconsistencyNote && (
                              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                                <span className="font-bold font-mono">Flag: </span>
                                {q.inconsistencyNote}
                              </div>
                            )}

                            <div className="p-4 rounded-xl bg-[#121217] border border-zinc-800 space-y-2">
                              <div className="font-mono font-bold text-orange-400 text-xs uppercase flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Detailed Mathematical Solution:</span>
                              </div>
                              <div className="font-mono text-zinc-300 leading-relaxed whitespace-pre-line text-xs bg-black/40 p-3.5 rounded-lg border border-zinc-800/80">
                                {q.solution}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
