import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  RotateCcw,
  Bug,
  Lightbulb,
  FileCode,
  Terminal,
  Loader2,
  HelpCircle,
  Award,
  Zap,
  Check,
  Bot,
  Layers
} from "lucide-react";
import { CodingProblem, SupportedLanguage, CodeExecutionResult, ProblemSubmission } from "../../types/index.js";
import { useAuth } from "../../context/AuthContext.js";
import { useApp } from "../../context/AppContext.js";
import { api } from "../../services/api.js";
import { DifficultyBadge } from "./DifficultyBadge.js";
import confetti from "canvas-confetti";

export const CodeWorkspace: React.FC<{ problemId: string }> = ({ problemId }) => {
  const { user, refreshProfile } = useAuth();
  const { setSelectedProblemId, navigateToTutor } = useApp();

  const cached = api.getCachedProblem(problemId);
  const [problem, setProblem] = useState<CodingProblem | null>(cached || null);
  const [language, setLanguage] = useState<SupportedLanguage>("python");
  const [code, setCode] = useState<string>(cached?.starterCode?.["python"] || "");
  const [activeLeftTab, setActiveLeftTab] = useState<"description" | "hints" | "submissions" | "solution">("description");
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState<number>(0);
  const [customInput, setCustomInput] = useState<string>("");
  const [isCustomInputMode, setIsCustomInputMode] = useState<boolean>(false);

  // Execution states
  const [running, setRunning] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<CodeExecutionResult | null>(null);
  const [submissions, setSubmissions] = useState<ProblemSubmission[]>([]);

  // AI Assistant states
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Progressive hints
  const [revealedHints, setRevealedHints] = useState<number[]>([]);

  useEffect(() => {
    let isMounted = true;
    setExecutionResult(null);
    setRevealedHints([]);
    setAiFeedback(null);
    
    api.getProblem(problemId).then((p) => {
      if (!isMounted) return;
      setProblem(p);
      const defaultLang: SupportedLanguage = "python";
      setLanguage(defaultLang);
      const initialCode = p?.starterCode?.[defaultLang] || "";
      setCode(initialCode);
    });
    
    api.getSubmissions(problemId).then((s) => {
      if (isMounted) setSubmissions(s || []);
    });

    return () => {
      isMounted = false;
    };
  }, [problemId]);

  const handleLanguageChange = (newLang: SupportedLanguage) => {
    setLanguage(newLang);
    if (problem?.starterCode?.[newLang]) {
      const newCode = problem.starterCode[newLang];
      setCode(newCode);
    }
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleResetCode = () => {
    if (problem?.starterCode?.[language]) {
      const defaultCode = problem.starterCode[language];
      setCode(defaultCode);
    }
  };

  const handleRunCode = async () => {
    if (!problem || running) return;
    setRunning(true);
    setExecutionResult(null);
    try {
      const res = await api.runCode(problem.id, language, code, isCustomInputMode ? customInput : undefined);
      setExecutionResult(res);
    } catch (e: any) {
      setExecutionResult({
        status: "Runtime Error",
        runtimeMs: 0,
        memoryKb: 0,
        testCasesPassed: 0,
        totalTestCases: 0,
        stdout: "",
        stderr: e.message || "Failed to execute code",
      });
    } finally {
      setRunning(false);
    }
  };

  const handleSubmitCode = async () => {
    if (!problem || submitting) return;
    setSubmitting(true);
    setExecutionResult(null);
    try {
      const res = await api.submitCode(problem.id, language, code);
      setExecutionResult(res.result);
      if (res.result?.status === "Accepted") {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      await refreshProfile();
      api.getSubmissions(problem.id).then((s) => setSubmissions(s || []));
    } catch (e: any) {
      setExecutionResult({
        status: "Runtime Error",
        runtimeMs: 0,
        memoryKb: 0,
        testCasesPassed: 0,
        totalTestCases: 0,
        stdout: "",
        stderr: e.message || "Failed to submit code",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAIAssist = async (action: string) => {
    if (!problem || aiLoading) return;
    setAiLoading(true);
    setAiAssistantOpen(true);
    setAiFeedback(null);
    try {
      const res = await api.assistCoding({
        problemTitle: problem.title,
        problemDescription: problem.description,
        currentCode: code,
        language,
        action,
        errorOutput: executionResult?.stderr || executionResult?.stdout,
      });
      setAiFeedback(res.feedback);
    } catch (e) {
      setAiFeedback("Unable to reach Chintan AI Coding mentor. Please retry!");
    } finally {
      setAiLoading(false);
    }
  };

  if (!problem) {
    return (
      <div className="p-12 text-center text-zinc-500 font-mono">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-500 mb-2" />
        <p>Loading code workspace...</p>
      </div>
    );
  }

  const isSolved = (user?.solvedProblemIds || []).includes(problem.id);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      {/* Top Action Bar */}
      <div className="px-4 py-2.5 bg-[#0e0e12] border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSelectedProblemId(null)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-white uppercase">{problem.title}</span>
            <DifficultyBadge difficulty={problem.difficulty} />
            {isSolved && (
              <span className="flex items-center gap-1 text-[9px] font-mono text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">
                <CheckCircle2 className="w-3 h-3" /> Solved
              </span>
            )}
          </div>
        </div>

        {/* AI Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAIAssist("Give Hint")}
            className="px-2.5 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1a1a20] border border-zinc-800 text-zinc-300 text-xs font-mono font-bold flex items-center gap-1.5 transition"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">AI Hint</span>
          </button>
          <button
            onClick={() => handleAIAssist("Debug Code")}
            className="px-2.5 py-1.5 rounded-lg bg-[#141418] hover:bg-[#1a1a20] border border-zinc-800 text-zinc-300 text-xs font-mono font-bold flex items-center gap-1.5 transition"
          >
            <Bug className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">AI Debug</span>
          </button>
          <button
            onClick={() => handleAIAssist("Explain Approach")}
            className="px-2.5 py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold flex items-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Review</span>
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Pane: Description, Hints, Submissions */}
        <div className="w-full lg:w-[45%] flex flex-col border-r border-zinc-800 bg-[#0c0c0e] overflow-hidden">
          <div className="flex border-b border-zinc-800 bg-[#0e0e12] px-3">
            <button
              onClick={() => setActiveLeftTab("description")}
              className={`px-3 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition ${
                activeLeftTab === "description" ? "border-orange-500 text-orange-400" : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveLeftTab("hints")}
              className={`px-3 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition ${
                activeLeftTab === "hints" ? "border-orange-500 text-orange-400" : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Hints ({(problem.hints || []).length})
            </button>
            <button
              onClick={() => setActiveLeftTab("submissions")}
              className={`px-3 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition ${
                activeLeftTab === "submissions" ? "border-orange-500 text-orange-400" : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Submissions ({(submissions || []).length})
            </button>
            <button
              onClick={() => setActiveLeftTab("solution")}
              className={`px-3 py-2.5 text-xs font-mono font-bold uppercase tracking-wider border-b-2 transition ${
                activeLeftTab === "solution" ? "border-orange-500 text-orange-400" : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Editorial
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {activeLeftTab === "description" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold font-mono text-white mb-2">{problem.title}</h2>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {(problem.companyTags || []).map((c) => (
                      <span key={c} className="text-[9px] font-mono font-bold px-2 py-0.5 bg-[#18181c] text-zinc-300 border border-zinc-800 rounded">
                        {c}
                      </span>
                    ))}
                    {(problem.topics || []).map((t) => (
                      <span key={t} className="text-[9px] font-mono px-2 py-0.5 bg-[#121215] text-zinc-400 border border-zinc-800 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="prose prose-invert prose-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">
                    {problem.description}
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Sample Testcases:</h4>
                  {(problem.examples || []).map((ex, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#121215] border border-zinc-800 text-xs space-y-1.5 font-mono">
                      <div><strong className="text-zinc-500 uppercase">Input:</strong> <span className="text-orange-400">{ex.input}</span></div>
                      <div><strong className="text-zinc-500 uppercase">Output:</strong> <span className="text-cyan-400">{ex.output}</span></div>
                      {ex.explanation && (
                        <div className="text-zinc-400 font-sans text-[11px] pt-1 border-t border-zinc-800/80">
                          <strong>Explanation:</strong> {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Constraints:</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-zinc-400 font-mono">
                    {(problem.constraints || []).map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeLeftTab === "hints" && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Progressive Step Hints:</h4>
                {(problem.hints || []).map((hint, idx) => {
                  const isRevealed = revealedHints.includes(idx);
                  return (
                    <div key={idx} className="p-4 rounded-xl bg-[#121215] border border-zinc-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold font-mono text-xs text-orange-400">Hint {idx + 1}</span>
                        {!isRevealed && (
                          <button
                            onClick={() => setRevealedHints((prev) => [...prev, idx])}
                            className="px-3 py-1 rounded bg-[#18181c] hover:bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-200 uppercase font-bold transition"
                          >
                            Reveal Hint
                          </button>
                        )}
                      </div>
                      {isRevealed && (
                        <p className="text-xs text-zinc-300 leading-relaxed font-mono animate-fadeIn">{hint}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {activeLeftTab === "submissions" && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Recent Executions:</h4>
                {(submissions || []).map((sub) => (
                  <div key={sub.id} className="p-3 rounded-xl bg-[#121215] border border-zinc-800 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className={`font-bold ${sub.status === "Accepted" ? "text-emerald-400" : "text-rose-400"}`}>
                        {sub.status}
                      </span>
                      <div className="text-[10px] text-zinc-500">{sub.language} • {new Date(sub.submittedAt).toLocaleTimeString()}</div>
                    </div>
                    <div className="text-right text-[11px] text-zinc-400">
                      <div>{sub.runtimeMs ?? 0} ms</div>
                      <div>{(((sub.memoryKb || 0) / 1024)).toFixed(1)} MB</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeLeftTab === "solution" && (
              <div className="space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">Optimal Editorial Approach</h4>
                <div className="p-4 rounded-xl bg-[#121215] border border-zinc-800 space-y-2 font-mono">
                  <div className="text-xs font-bold text-orange-400">Target Time & Space Complexity:</div>
                  <p className="text-xs text-zinc-300">Time Complexity: O(n)</p>
                  <p className="text-xs text-zinc-300">Space Complexity: O(n) using Hash Map storage</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane: Code Editor & Test Cases */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#09090b]">
          {/* Editor Header */}
          <div className="px-4 py-2 bg-[#0e0e12] border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
                className="bg-[#09090b] border border-zinc-700 text-xs text-zinc-200 px-3 py-1 rounded-lg focus:outline-none focus:border-orange-500 font-mono"
              >
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript (Node.js)</option>
                <option value="cpp">C++ (GCC 12)</option>
                <option value="java">Java (OpenJDK 17)</option>
              </select>
              <button
                onClick={handleResetCode}
                className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800"
                title="Reset starter template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono">SANDBOX IDE ENGINE</span>
          </div>

          {/* Code Textarea / Monaco Container */}
          <div className="flex-1 relative bg-[#09090b] font-mono text-xs">
            <textarea
              id="input-code-editor"
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-full p-4 bg-[#09090b] text-orange-400 focus:outline-none resize-none font-mono text-sm leading-relaxed"
              spellCheck={false}
            />

            {/* AI Assistant Overlay */}
            {aiAssistantOpen && (
              <div className="absolute top-4 right-4 z-20 w-80 max-h-[70%] bg-[#121215] border border-orange-500/40 rounded-2xl shadow-2xl p-4 flex flex-col space-y-2 overflow-y-auto animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-orange-400 flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5" /> Chintan AI Coding Mentor
                  </span>
                  <button onClick={() => setAiAssistantOpen(false)} className="text-zinc-400 hover:text-white text-xs font-bold">
                    ✕
                  </button>
                </div>
                {aiLoading ? (
                  <div className="py-4 text-center text-xs text-zinc-400 flex items-center justify-center gap-2 font-mono">
                    <Loader2 className="w-4 h-4 animate-spin text-orange-500" /> Analyzing algorithmic patterns...
                  </div>
                ) : (
                  <div className="text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed font-mono">
                    {aiFeedback}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => navigateToTutor()}
                  className="mt-2 w-full py-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Discuss in AI Tutor &rarr;</span>
                </button>
              </div>
            )}
          </div>

          {/* Testcases & Execution Verdict Panel */}
          <div className="h-56 border-t border-zinc-800 bg-[#0c0c0e] flex flex-col">
            <div className="px-4 py-2 border-b border-zinc-800 flex items-center justify-between bg-[#0e0e12]">
              <div className="flex items-center gap-2">
                {(problem.sampleTestCases || []).map((tc, idx) => (
                  <button
                    key={tc.id || idx}
                    onClick={() => {
                      setIsCustomInputMode(false);
                      setSelectedTestCaseIdx(idx);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition ${
                      !isCustomInputMode && selectedTestCaseIdx === idx
                        ? "bg-[#18181c] text-orange-400 font-bold border border-orange-500/30"
                        : "text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Case {idx + 1}
                  </button>
                ))}
                <button
                  onClick={() => setIsCustomInputMode(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition ${
                    isCustomInputMode ? "bg-[#18181c] text-orange-400 font-bold border border-orange-500/30" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  Custom Testcase
                </button>
              </div>

              {/* Execution Status Badge */}
              {executionResult && (
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span
                    className={`font-bold ${
                      executionResult.status === "Accepted"
                        ? "text-emerald-400"
                        : executionResult.status === "Wrong Answer"
                        ? "text-rose-400"
                        : "text-amber-400"
                    }`}
                  >
                    {executionResult.status}
                  </span>
                  <span className="text-[11px] text-zinc-500">({executionResult.runtimeMs} ms)</span>
                </div>
              )}
            </div>

            {/* Testcase I/O view */}
            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-zinc-300">
              {isCustomInputMode ? (
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 font-mono uppercase">Enter Custom Input:</label>
                  <textarea
                    rows={3}
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="[2, 7, 11, 15]&#10;9"
                    className="w-full p-2 bg-[#09090b] border border-zinc-800 rounded-lg text-xs text-orange-400 font-mono"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-500 font-mono">Input:</span>
                    <pre className="p-2 bg-[#09090b] rounded border border-zinc-800 text-zinc-300 mt-1">
                      {problem.sampleTestCases?.[selectedTestCaseIdx]?.input}
                    </pre>
                  </div>
                  {executionResult?.stdout && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-zinc-500 font-mono">Stdout:</span>
                      <pre className="p-2 bg-[#09090b] rounded border border-zinc-800 text-zinc-300 mt-1">
                        {executionResult.stdout}
                      </pre>
                    </div>
                  )}
                  {executionResult?.stderr && (
                    <div>
                      <span className="text-[10px] uppercase font-bold text-rose-500 font-mono">Error Output:</span>
                      <pre className="p-2 bg-rose-950/20 rounded border border-rose-900/50 text-rose-400 mt-1">
                        {executionResult.stderr}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="px-4 py-2.5 bg-[#0e0e12] border-t border-zinc-800 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500 font-mono">Press Ctrl + Enter to Run</span>
              <div className="flex items-center gap-3">
                <button
                  id="btn-run-code"
                  onClick={handleRunCode}
                  disabled={running || submitting}
                  className="px-4 py-2 rounded-lg bg-[#18181c] hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2 disabled:opacity-50"
                >
                  {running ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                  <span>RUN CODE</span>
                </button>
                <button
                  id="btn-submit-code"
                  onClick={handleSubmitCode}
                  disabled={running || submitting}
                  className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition shadow-lg shadow-orange-500/25 flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                  <span>SUBMIT SOLUTION</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
