import React, { useState, useEffect } from "react";
import {
  Mic,
  Volume2,
  VolumeX,
  Send,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  BarChart3,
  Bot,
  RefreshCw,
  Building2
} from "lucide-react";
import { api } from "../../services/api.js";
import { MockInterviewSession } from "../../types/index.js";
import { useAuth } from "../../context/AuthContext.js";
import confetti from "canvas-confetti";

export const MockInterviewHub: React.FC = () => {
  const { user, refreshProfile } = useAuth();
  const [history, setHistory] = useState<MockInterviewSession[]>([]);
  const [activeSession, setActiveSession] = useState<MockInterviewSession | null>(null);

  // Setup options
  const [company, setCompany] = useState("Google");
  const [role, setRole] = useState("Software Development Engineer (SDE-1)");
  const [round, setRound] = useState("Technical & DSA Architecture");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [starting, setStarting] = useState(false);

  // Active interaction
  const [answerInput, setAnswerInput] = useState("");
  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    api.getInterviewHistory().then((h) => setHistory(h || []));

    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleStart = async () => {
    setStarting(true);
    try {
      const session = await api.startInterview({
        company,
        role,
        round,
        difficulty,
      });
      setActiveSession(session);
      if ("speechSynthesis" in window) {
        speakText(session.messages[session.messages.length - 1]?.text || "");
      }
    } catch (e) {
      console.error("Error starting interview:", e);
    } finally {
      setStarting(false);
    }
  };

  const speakText = (text: string) => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#`_\[\]()]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stopVoice = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  const handleSendResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSession || !answerInput.trim() || submittingAnswer) return;

    setSubmittingAnswer(true);
    try {
      const res = await api.respondInterview(activeSession.id, answerInput);
      setActiveSession(res);
      setAnswerInput("");

      if (res.status === "completed" && res.feedback) {
        if (res.feedback.overallScore >= 75) {
          confetti({ particleCount: 90, spread: 80 });
        }
        await refreshProfile();
        api.getInterviewHistory().then((h) => setHistory(h || []));
      } else {
        const lastAiMsg = res.messages[res.messages.length - 1];
        if (lastAiMsg?.sender === "ai") {
          speakText(lastAiMsg.text);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingAnswer(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-zinc-100 font-sans">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-orange-500">
          <Mic className="w-4 h-4" />
          <span>REAL-TIME INTERVIEW SIMULATOR</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
          AI Mock Placement Interview
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Multi-turn technical & behavioral rounds with company-calibrated rubrics, speech synthesis, and real-time feedback.
        </p>
      </div>

      {!activeSession ? (
        /* Configuration Wizard & History */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Setup Card */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-[#121215] border border-zinc-800 shadow-sm space-y-6">
            <h2 className="text-base font-bold font-mono uppercase text-white">Configure Your Mock Session</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 font-mono">
                <label className="text-xs font-bold text-zinc-300 uppercase">Target Company</label>
                <select
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#09090b] border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  <option value="Google">Google (Product Architecture & DSA)</option>
                  <option value="TCS">TCS (Prime / Digital / Ninja Track)</option>
                  <option value="Amazon">Amazon (Leadership Principles & Coding)</option>
                  <option value="Microsoft">Microsoft (Data Structures & Systems)</option>
                  <option value="HCL">HCL Technologies (Core CS & Aptitude)</option>
                  <option value="Infosys">Infosys (Specialist Programmer)</option>
                </select>
              </div>

              <div className="space-y-1.5 font-mono">
                <label className="text-xs font-bold text-zinc-300 uppercase">Target Job Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#09090b] border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  <option value="Software Development Engineer (SDE-1)">Software Development Engineer (SDE-1)</option>
                  <option value="SDE Intern">SDE Intern (2026 Batch)</option>
                  <option value="Full Stack Web Engineer">Full Stack Web Engineer</option>
                  <option value="Backend Systems Engineer">Backend Systems Engineer</option>
                </select>
              </div>

              <div className="space-y-1.5 font-mono">
                <label className="text-xs font-bold text-zinc-300 uppercase">Interview Round Type</label>
                <select
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#09090b] border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  <option value="Technical & DSA Architecture">Technical DSA & Problem Solving</option>
                  <option value="CS Core (OS, DBMS, CN)">CS Core Fundamentals (OS, DBMS, Networks)</option>
                  <option value="System Design & Web Architecture">System Design & Web Scalability</option>
                  <option value="HR & STAR Behavioral">HR & Behavioral (STAR Method)</option>
                </select>
              </div>

              <div className="space-y-1.5 font-mono">
                <label className="text-xs font-bold text-zinc-300 uppercase">Calibrated Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full p-3 rounded-lg bg-[#09090b] border border-zinc-800 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                >
                  <option value="Beginner">Beginner (Campus Graduate Level)</option>
                  <option value="Intermediate">Intermediate (Tier-1 SDE-1 Standard)</option>
                  <option value="Advanced">Advanced (SDE-2 / High Bar)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
              <div className="text-xs font-mono text-zinc-500">
                Duration: ~10 minutes (3 interactive questions)
              </div>
              <button
                id="btn-start-interview"
                onClick={handleStart}
                disabled={starting}
                className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                {starting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bot className="w-4 h-4" />}
                <span>BEGIN SIMULATION</span>
              </button>
            </div>
          </div>

          {/* Past Interview History */}
          <div className="p-6 rounded-3xl bg-[#121215] border border-zinc-800 shadow-sm space-y-4 font-mono">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-300">Past Interview Sessions</h3>
            <div className="space-y-3">
              {(history || []).map((sess, sIdx) => (
                <div
                  key={sess.id || `interview-sess-${sIdx}`}
                  className="p-3.5 rounded-xl bg-[#09090b] border border-zinc-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{sess.company}</span>
                    {sess.feedback && (
                      <span className="text-xs font-bold text-orange-400">{sess.feedback.overallScore}/100</span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400">{sess.round}</div>
                  <div className="text-[10px] text-zinc-500">{new Date(sess.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
              {(!history || history.length === 0) && (
                <div className="text-center py-6 text-xs text-zinc-500">
                  No previous mock interviews recorded yet.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Active Interview Simulator Session */
        <div className="max-w-4xl mx-auto space-y-6 font-mono">
          {/* Top Session Bar */}
          <div className="p-4 rounded-2xl bg-[#121215] border border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-white">{activeSession.company} AI Interviewer</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-orange-500/20">
                    Question {activeSession.currentQuestionIndex + 1} of {activeSession.totalQuestions}
                  </span>
                </div>
                <p className="text-xs text-zinc-400">{activeSession.round} • {activeSession.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={speaking ? stopVoice : () => speakText(activeSession.messages[activeSession.messages.length - 1]?.text || "")}
                className="p-2 rounded-lg bg-[#18181c] text-zinc-300 hover:text-white border border-zinc-700 transition"
                title={speaking ? "Stop speech" : "Read aloud"}
              >
                {speaking ? <VolumeX className="w-4 h-4 text-orange-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  stopVoice();
                  setActiveSession(null);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#18181c] hover:bg-zinc-800 text-xs text-zinc-300 font-bold uppercase border border-zinc-700"
              >
                Exit Session
              </button>
            </div>
          </div>

          {/* Conversation Feed */}
          <div className="p-6 rounded-3xl bg-[#0e0e12] border border-zinc-800 space-y-4 max-h-[500px] overflow-y-auto">
            {(activeSession.messages || []).map((m, idx) => (
              <div
                key={m.id || `msg-${idx}-${m.timestamp || ''}`}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className="text-[10px] font-bold text-zinc-500 mb-1 px-1">
                  {m.sender === "ai" ? `${activeSession.company} Interviewer` : user?.name || "Candidate"}
                </div>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[85%] ${
                    m.sender === "user"
                      ? "bg-orange-500 text-white rounded-br-none"
                      : "bg-[#18181c] text-zinc-100 rounded-bl-none border border-zinc-700"
                  }`}
                >
                  <div className="prose prose-invert prose-sm whitespace-pre-wrap font-sans">{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Answer Input or Scorecard */}
          {activeSession.status === "completed" && activeSession.feedback ? (
            /* Completed Scorecard */
            <div className="p-6 sm:p-8 rounded-3xl bg-[#121215] border border-orange-500/40 shadow-2xl space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-orange-400 uppercase tracking-widest">Evaluation Scorecard</div>
                  <h3 className="text-2xl font-bold text-white">Interview Completed</h3>
                </div>
                <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/40 text-center">
                  <div className="text-3xl font-extrabold text-orange-400">
                    {activeSession.feedback.overallScore}/100
                  </div>
                  <div className="text-[10px] uppercase font-bold text-zinc-400">Overall Score</div>
                </div>
              </div>

              {/* Rubric metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#09090b] border border-zinc-800 text-center">
                  <div className="text-lg font-bold text-emerald-400">{activeSession.feedback.technicalAccuracy}%</div>
                  <div className="text-[10px] text-zinc-400">Accuracy</div>
                </div>
                <div className="p-3 rounded-xl bg-[#09090b] border border-zinc-800 text-center">
                  <div className="text-lg font-bold text-blue-400">{activeSession.feedback.problemSolving}%</div>
                  <div className="text-[10px] text-zinc-400">Problem Solving</div>
                </div>
                <div className="p-3 rounded-xl bg-[#09090b] border border-zinc-800 text-center">
                  <div className="text-lg font-bold text-amber-400">{activeSession.feedback.communication}%</div>
                  <div className="text-[10px] text-zinc-400">Communication</div>
                </div>
                <div className="p-3 rounded-xl bg-[#09090b] border border-zinc-800 text-center">
                  <div className="text-lg font-bold text-orange-400">{activeSession.feedback.completeness}%</div>
                  <div className="text-[10px] text-zinc-400">Completeness</div>
                </div>
              </div>

              {/* Detailed Qualitative Feedback */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl bg-[#09090b] border border-emerald-500/30 space-y-2">
                  <h4 className="font-bold text-emerald-400 font-mono uppercase text-xs">Identified Strengths:</h4>
                  <ul className="space-y-1 text-zinc-300">
                    {(activeSession.feedback.strengths || []).map((s, i) => (
                      <li key={`str-${i}-${s.slice(0, 15)}`}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-[#09090b] border border-orange-500/30 space-y-2">
                  <h4 className="font-bold text-orange-400 font-mono uppercase text-xs">Areas for Improvement:</h4>
                  <ul className="space-y-1 text-zinc-300">
                    {(activeSession.feedback.areasOfImprovement || activeSession.feedback.weaknesses || []).map((a, i) => (
                      <li key={`imp-${i}-${a.slice(0, 15)}`}>• {a}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setActiveSession(null)}
                  className="px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition shadow-lg shadow-orange-500/25"
                >
                  Start Another Session
                </button>
              </div>
            </div>
          ) : (
            /* Active Answer Submission */
            <form onSubmit={handleSendResponse} className="space-y-3">
              <textarea
                rows={4}
                placeholder="Type your response here (you can write code snippets or explain your technical approach)..."
                value={answerInput}
                onChange={(e) => setAnswerInput(e.target.value)}
                disabled={submittingAnswer}
                className="w-full p-4 rounded-2xl bg-[#121215] border border-zinc-800 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-orange-500 font-mono"
              />
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">Provide structured explanations with edge case reasoning.</span>
                <button
                  type="submit"
                  disabled={!answerInput.trim() || submittingAnswer}
                  className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-lg shadow-orange-500/25 disabled:opacity-50"
                >
                  {submittingAnswer ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>SUBMIT RESPONSE</span>
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
