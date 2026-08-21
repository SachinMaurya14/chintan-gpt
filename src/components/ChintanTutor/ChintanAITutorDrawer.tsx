import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Sparkles,
  X,
  Send,
  Loader2,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Code,
  HelpCircle,
  Lightbulb,
  BookOpen,
  Bug,
  RefreshCw,
  FileText,
  Image as ImageIcon,
  Maximize2,
  Download,
  Languages,
  ArrowRight,
  Globe,
  ExternalLink,
  Layers,
  Eye,
  Sliders
} from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useApp } from "../../context/AppContext.js";
import { useAuth } from "../../context/AuthContext.js";
import { api } from "../../services/api.js";

interface TutorMessage {
  id: string;
  sender: "ai" | "user";
  text: string;
  actionType?: string;
  timestamp: string;
  imageUrl?: string;
  visualTopic?: string;
  isGeneratingImage?: boolean;
  isError?: boolean;
  isGrounded?: boolean;
  sources?: { title: string; uri: string }[];
}

/**
 * Intelligent detector that identifies whether a student's prompt or context
 * warrants generating a conceptual diagram or technical schematic.
 */
function shouldTriggerVisualization(text: string, actionType?: string, visualModeActive: boolean = false): boolean {
  if (visualModeActive) return true;
  if (actionType === "Visual Diagram" || actionType === "Explain with Visual") return true;

  const visualKeywords = [
    /\b(diagram|flowchart|visual|visualize|draw|drawing|schematic|architecture|illustration|tree|graph|layout|topology|osi|pipeline|workflow|wireframe|geometry|mensuration|stack\s*frame|memory\s*layout|pointer\s*diagram)\b/i,
    /show (me )?(a |the )?(visual|diagram|drawing|picture|structure|schematic)/i,
    /how does (it|this) look/i,
    /explain .* (visually|with a diagram|with an illustration|using a diagram)/i,
    /pictorial\s*representation/i,
    /block\s*diagram/i,
    /uml|entity\s*relationship|er\s*diagram/i
  ];

  return visualKeywords.some(pattern => pattern.test(text));
}

/**
 * Clean component container for rendering educational diagrams within the chat thread.
 */
const VisualDiagramContainer: React.FC<{
  imageUrl?: string;
  visualTopic?: string;
  isGenerating?: boolean;
  onExpand: (url: string, title: string) => void;
  onRegenerate?: () => void;
}> = ({ imageUrl, visualTopic, isGenerating, onExpand, onRegenerate }) => {
  const [hasError, setHasError] = useState(false);
  const topicTitle = visualTopic || "Conceptual Schematic";

  if (isGenerating) {
    return (
      <div className="mt-3 rounded-xl border border-orange-500/30 bg-[#09090b] p-4 flex flex-col items-center justify-center gap-2.5 text-center min-h-[140px] animate-pulse">
        <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
        <div>
          <p className="text-xs font-mono font-bold text-purple-400">Synthesizing Conceptual Diagram...</p>
          <p className="text-[10px] font-mono text-zinc-400 mt-0.5">
            Generating high-precision technical schematic and architecture breakdown
          </p>
        </div>
      </div>
    );
  }

  if (!imageUrl || hasError) {
    if (hasError && onRegenerate) {
      return (
        <div className="mt-3 rounded-xl border border-zinc-800 bg-[#09090b] p-3 text-center">
          <p className="text-xs font-mono text-zinc-400">Diagram rendering encountered an issue.</p>
          <button
            onClick={() => {
              setHasError(false);
              onRegenerate();
            }}
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded bg-purple-500/20 text-purple-400 border border-purple-500/40 text-xs font-mono btn-press-fx"
          >
            <RefreshCw className="w-3 h-3" /> Retry Generation
          </button>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="mt-3 rounded-xl border border-zinc-800/90 bg-[#0a0a0e] overflow-hidden shadow-lg group hover:border-purple-500/40 transition-all card-hover-fx">
      {/* Container Header Bar */}
      <div className="px-3 py-2 bg-[#101016] border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-1.5 min-w-0">
          <div className="w-5 h-5 rounded-md bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
            <ImageIcon className="w-3 h-3" />
          </div>
          <span className="text-[11px] font-mono font-bold text-purple-300 truncate max-w-[210px]">
            {topicTitle}
          </span>
          <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded text-[9px] font-mono bg-zinc-800 text-zinc-400 border border-zinc-700/60">
            AI SCHEMATIC
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {onRegenerate && (
            <button
              onClick={() => {
                setHasError(false);
                onRegenerate();
              }}
              className="p-1 rounded-md text-zinc-400 hover:text-orange-400 hover:bg-zinc-800 transition"
              title="Regenerate diagram"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          )}
          <a
            href={imageUrl}
            download={`diagram-${topicTitle.toLowerCase().replace(/\s+/g, "-")}.png`}
            className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            title="Download image"
          >
            <Download className="w-3 h-3" />
          </a>
          <button
            onClick={() => onExpand(imageUrl, topicTitle)}
            className="px-2 py-1 rounded-md bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 text-[10px] font-mono font-medium flex items-center gap-1 transition"
          >
            <Maximize2 className="w-3 h-3" />
            <span>Expand</span>
          </button>
        </div>
      </div>

      {/* Image Preview Area */}
      <div
        onClick={() => onExpand(imageUrl, topicTitle)}
        className="relative cursor-pointer bg-[#050507] p-2 flex items-center justify-center min-h-[140px] max-h-[280px] overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={topicTitle}
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer"
          className="max-h-[260px] w-full object-contain rounded-lg transition-transform duration-200 group-hover:scale-[1.01]"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-mono font-bold gap-1.5 backdrop-blur-[1px]">
          <Maximize2 className="w-4 h-4 text-orange-400" />
          <span>Click to view full-resolution schematic</span>
        </div>
      </div>

      {/* Caption Footnote */}
      <div className="px-3 py-1.5 bg-[#0e0e12] border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-400">
        <span className="truncate">Visualized to enhance mental model & understanding</span>
        <span className="text-zinc-500">HD Vector & Schematic</span>
      </div>
    </div>
  );
};

export const ChintanAITutorDrawer: React.FC = () => {
  const { isTutorOpen, setIsTutorOpen, tutorContext } = useApp();
  const { user } = useAuth();
  const [inputQuery, setInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [visualModeActive, setVisualModeActive] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeLightboxImg, setActiveLightboxImg] = useState<{ url: string; title: string } | null>(null);
  const [lastQuery, setLastQuery] = useState<{ text: string; action: string } | null>(null);

  const [messages, setMessages] = useState<TutorMessage[]>([
    {
      id: "msg_welcome",
      sender: "ai",
      text: `Hello ${user?.name?.split(" ")[0] || "there"}! I'm **Chintan AI**, your dedicated 24/7 Computer Science Tutor.\n\nI understand you are currently exploring **${tutorContext.topic || "Computer Science"}** (${tutorContext.lessonTitle || tutorContext.courseTitle || "General Concepts"}). What concept would you like to master, debug, or visualize today? Feel free to ask in **English**, **Hinglish**, or **Hindi**!`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!isTutorOpen) return null;

  const quickPrompts = [
    { label: "Explain Concept", action: "Explain Concept", icon: Lightbulb },
    { label: "Visual Diagram", action: "Visual Diagram", icon: ImageIcon },
    { label: "2026 Hiring Patterns", action: "Latest Hiring Updates", icon: Globe },
    { label: "Explain in Hinglish", action: "Explain in Hinglish", icon: Languages },
    { label: "Like I'm a Beginner", action: "Explain Like I'm a Beginner", icon: HelpCircle },
    { label: "Real Example", action: "Give Example", icon: BookOpen },
    { label: "Give Hint", action: "Give Hint", icon: Sparkles },
    { label: "Debug My Code", action: "Debug My Code", icon: Bug },
    { label: "Summarize Lesson", action: "Summarize Lesson", icon: FileText },
  ];

  const handleSendMessage = async (
    customText?: string,
    actionType: string = "General Doubt",
    forceVisual: boolean = false
  ) => {
    const textToSend = customText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const isVisualAction = forceVisual || shouldTriggerVisualization(textToSend, actionType, visualModeActive);

    const userMsg: TutorMessage = {
      id: `usr_${Date.now()}`,
      sender: "user",
      text: textToSend,
      actionType: isVisualAction && actionType === "General Doubt" ? "Visual Diagram" : actionType,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Store for retry
    setLastQuery({ text: textToSend, action: actionType });

    // Snapshot conversation history (last 6 messages) for multi-turn context
    const conversationHistory = messages.slice(-6).map((m) => ({
      sender: m.sender,
      text: m.text,
    }));

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputQuery("");
    setLoading(true);

    try {
      const res = await api.askTutor({
        courseTitle: tutorContext.courseTitle,
        moduleTitle: tutorContext.moduleTitle,
        lessonTitle: tutorContext.lessonTitle,
        topic: tutorContext.topic,
        difficulty: tutorContext.difficulty,
        contextCode: tutorContext.contextCode,
        userQuestion: textToSend,
        actionType,
        conversationHistory,
        requestVisual: isVisualAction,
      });

      const aiMsg: TutorMessage = {
        id: `ai_${Date.now()}`,
        sender: "ai",
        text: res.answer,
        actionType: isVisualAction ? "Visual Diagram" : actionType,
        imageUrl: res.imageUrl,
        visualTopic: res.visualTopic || (isVisualAction ? (tutorContext.topic || "Conceptual Schematic") : undefined),
        isGrounded: res.isGrounded,
        sources: res.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_err_${Date.now()}`,
          sender: "ai",
          text: `⚠️ I encountered a brief issue connecting to the AI Tutor. Please click **Retry** below to ask again!`,
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * On-demand visual schematic generator for any AI explanation in the thread
   */
  const handleGenerateVisualForMessage = async (msgId: string, conceptName: string, contextSummary: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, isGeneratingImage: true } : m))
    );

    try {
      const res = await api.visualizeDiagram(
        conceptName,
        contextSummary.slice(0, 300)
      );

      if (res && res.imageUrl) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === msgId
              ? {
                  ...m,
                  imageUrl: res.imageUrl,
                  visualTopic: conceptName,
                  isGeneratingImage: false,
                }
              : m
          )
        );
      } else {
        setMessages((prev) =>
          prev.map((m) => (m.id === msgId ? { ...m, isGeneratingImage: false } : m))
        );
      }
    } catch (e) {
      console.warn("[Tutor Visual] Failed to generate on-demand diagram:", e);
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, isGeneratingImage: false } : m))
      );
    }
  };

  const handleRetry = () => {
    if (lastQuery) {
      handleSendMessage(lastQuery.text, lastQuery.action);
    }
  };

  const handleSpeak = (id: string, text: string) => {
    if (!("speechSynthesis" in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown, code blocks, and math notations for natural pronunciation
    const cleanText = text
      .replace(/```[\s\S]*?```/g, " [code snippet omitted] ")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[*#_\[\]()~>]/g, "")
      .replace(/\$\$.*?\$\$/g, "")
      .replace(/\$.*?\$/g, "");

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.02;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    window.speechSynthesis.speak(utterance);
    setSpeakingId(id);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[520px] bg-[#09090d] border-l border-zinc-800/90 shadow-2xl flex flex-col animate-slideLeft transition-all font-sans">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800/80 bg-[#0e0e14] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-md shadow-purple-500/10">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm font-mono text-white uppercase tracking-tight">CHINTAN AI TUTOR</h3>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 uppercase">
                  24/7 MENTOR
                </span>
              </div>
              <p className="text-[11px] font-mono text-zinc-400 truncate max-w-[260px]">
                {tutorContext.topic || "Computer Science"} • {tutorContext.difficulty || "Beginner"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Visual Mode Quick Toggle */}
            <button
              id="btn-toggle-visual-mode"
              onClick={() => setVisualModeActive(!visualModeActive)}
              title={visualModeActive ? "Diagram Mode Active: Auto-generates visual schematics" : "Enable Diagram Mode"}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 border transition-all btn-press-fx ${
                visualModeActive
                  ? "bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-md shadow-purple-500/20"
                  : "bg-zinc-900/90 border-zinc-800 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{visualModeActive ? "Diagram ON" : "Visual Mode"}</span>
            </button>

            <button
              id="btn-close-ai-tutor"
              onClick={() => {
                window.speechSynthesis?.cancel();
                setIsTutorOpen(false);
              }}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition btn-press-fx"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Learning Context Banner & Logic Switch Indicator */}
        <div className="px-4 py-2 bg-[#0d0d12] border-b border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
          <span className="font-medium flex items-center gap-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            Context: <span className="text-purple-300 font-bold">{tutorContext.lessonTitle || tutorContext.courseTitle || "General CS"}</span>
          </span>
          <div className="flex items-center gap-2">
            {visualModeActive && (
              <span className="text-[9px] text-purple-300 bg-purple-500/10 px-1.5 py-0.5 rounded border border-purple-500/30 flex items-center gap-1">
                <Layers className="w-2.5 h-2.5" /> Auto-Diagram
              </span>
            )}
            <span className="text-[10px] text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded border border-zinc-700/60 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-purple-400" /> AI REASONING
            </span>
          </div>
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {(messages || []).map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
            >
              {msg.actionType && msg.actionType !== "General Doubt" && (
                <span className="text-[10px] uppercase font-mono font-bold text-orange-400 mb-1 px-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-orange-400" />
                  {msg.actionType}
                </span>
              )}
              <div
                className={`max-w-[94%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-orange-500 text-white rounded-br-none shadow-md shadow-orange-500/20 font-mono"
                    : "bg-[#141418] text-zinc-100 rounded-bl-none border border-zinc-800 shadow-sm"
                }`}
              >
                {/* Formatted Markdown rendering */}
                {msg.sender === "user" ? (
                  <div className="whitespace-pre-wrap font-mono text-xs sm:text-sm">{msg.text}</div>
                ) : (
                  <div className="markdown-body space-y-2 text-xs sm:text-sm leading-relaxed text-zinc-200">
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-sm sm:text-base font-bold text-white mt-3 mb-1.5 pb-1 border-b border-zinc-800">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-xs sm:text-sm font-bold text-orange-400 mt-2.5 mb-1">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xs sm:text-sm font-bold text-zinc-100 mt-2 mb-1">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="mb-2 leading-relaxed text-zinc-300 last:mb-0">{children}</p>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 hover:text-orange-300 underline underline-offset-2 transition-colors"
                          >
                            {children}
                          </a>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside space-y-1 mb-2 text-zinc-300 pl-1">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside space-y-1 mb-2 text-zinc-300 pl-1">{children}</ol>
                        ),
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        strong: ({ children }) => (
                          <strong className="font-semibold text-orange-300">{children}</strong>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-2 border-orange-500 pl-3 my-2 text-zinc-400 italic bg-orange-500/5 py-1 rounded-r">
                            {children}
                          </blockquote>
                        ),
                        table: ({ children }) => (
                          <div className="overflow-x-auto my-2.5">
                            <table className="min-w-full text-xs border border-zinc-800 rounded divide-y divide-zinc-800">
                              {children}
                            </table>
                          </div>
                        ),
                        thead: ({ children }) => (
                          <thead className="bg-zinc-800/80 text-orange-400 font-mono text-[11px]">{children}</thead>
                        ),
                        th: ({ children }) => (
                          <th className="p-2 text-left border-b border-zinc-700 font-semibold">{children}</th>
                        ),
                        td: ({ children }) => (
                          <td className="p-2 border-b border-zinc-800 text-zinc-300 font-mono text-[11px]">{children}</td>
                        ),
                        code({ className, children, ...props }: any) {
                          const isInline = !className && typeof children === "string" && !children.includes("\n");
                          if (isInline) {
                            return (
                              <code
                                className="px-1.5 py-0.5 rounded text-[11px] sm:text-xs font-mono bg-zinc-900 border border-zinc-700/60 text-orange-300"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          }
                          const match = /language-(\w+)/.exec(className || "");
                          const lang = match ? match[1] : "";
                          const codeText = String(children).replace(/\n$/, "");
                          return (
                            <div className="my-2.5 rounded-xl overflow-hidden border border-zinc-800 bg-[#09090b] shadow-inner">
                              <div className="flex items-center justify-between px-3 py-1.5 bg-[#121216] border-b border-zinc-800 text-[10px] font-mono text-zinc-400">
                                <span className="uppercase text-orange-400 font-bold tracking-wider">
                                  {lang || "code"}
                                </span>
                                <button
                                  onClick={() => navigator.clipboard.writeText(codeText)}
                                  className="hover:text-white flex items-center gap-1 transition px-1.5 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700"
                                  title="Copy code"
                                >
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </button>
                              </div>
                              <pre className="p-3 text-xs font-mono overflow-x-auto text-zinc-200 leading-relaxed no-scrollbar">
                                <code>{children}</code>
                              </pre>
                            </div>
                          );
                        },
                      }}
                    >
                      {msg.text}
                    </Markdown>
                  </div>
                )}

                {/* Clean Component Container for Visual Diagram (Gemini 3.1 Flash Image) */}
                {(msg.imageUrl || msg.isGeneratingImage) && (
                  <VisualDiagramContainer
                    imageUrl={msg.imageUrl}
                    visualTopic={msg.visualTopic || tutorContext.topic || "Concept Model"}
                    isGenerating={msg.isGeneratingImage}
                    onExpand={(url, title) => setActiveLightboxImg({ url, title })}
                    onRegenerate={() =>
                      handleGenerateVisualForMessage(
                        msg.id,
                        msg.visualTopic || tutorContext.topic || "Concept Schematic",
                        msg.text
                      )
                    }
                  />
                )}

                {/* Google Search Grounding Sources & Live Badges */}
                {msg.isGrounded && (
                  <div className="mt-3 pt-2.5 border-t border-zinc-800/80 space-y-2">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-semibold">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Google Search Grounded (Real-Time 2026 Data)</span>
                    </div>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.sources.map((src, idx) => (
                          <a
                            key={idx}
                            href={src.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-[10px] font-mono text-zinc-300 hover:text-emerald-400 transition"
                          >
                            <span className="truncate max-w-[180px]">{src.title || "Web Source"}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-70" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Message Footer Controls for AI */}
                {msg.sender === "ai" && (
                  <div className="mt-2.5 pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <div className="flex items-center gap-2">
                      <span>{msg.timestamp}</span>
                      {/* On-Demand Generate Diagram Trigger if no image exists yet */}
                      {!msg.imageUrl && !msg.isGeneratingImage && !msg.isError && (
                        <button
                          onClick={() =>
                            handleGenerateVisualForMessage(
                              msg.id,
                              tutorContext.topic || "Concept Architecture",
                              msg.text
                            )
                          }
                          className="hover:text-orange-400 text-zinc-400 hover:bg-orange-500/10 px-2 py-0.5 rounded border border-zinc-800 hover:border-orange-500/30 flex items-center gap-1 transition"
                          title="Generate a conceptual diagram for this explanation"
                        >
                          <ImageIcon className="w-3 h-3 text-orange-400" />
                          <span>Visualize Diagram</span>
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {msg.isError && (
                        <button
                          onClick={handleRetry}
                          className="hover:text-orange-400 text-orange-500 flex items-center gap-1 font-bold transition px-1.5 py-0.5 rounded bg-orange-500/10"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Retry
                        </button>
                      )}
                      <button
                        onClick={() => handleSpeak(msg.id, msg.text)}
                        className="hover:text-orange-400 transition p-1"
                        title={speakingId === msg.id ? "Stop voice" : "Read aloud"}
                      >
                        {speakingId === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-orange-500" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="hover:text-orange-400 transition p-1"
                        title="Copy response"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-orange-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#141418] border border-zinc-800 text-zinc-400 text-xs font-mono w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
              <span>Chintan AI formulating technical guidance...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Chips */}
        <div className="px-4 py-2 border-t border-zinc-800 bg-[#0e0e12]">
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {quickPrompts.map((qp) => {
              const Icon = qp.icon;
              return (
                <button
                  key={qp.action}
                  onClick={() => {
                    if (qp.action === "Visual Diagram") {
                      handleSendMessage(
                        `Please provide a clean visual diagram and architecture breakdown for: ${tutorContext.topic || "this concept"}.`,
                        qp.action,
                        true
                      );
                    } else if (qp.action === "Explain in Hinglish") {
                      handleSendMessage(
                        `Bhai ${tutorContext.topic || "is concept"} ko simple Hinglish mein intuition aur code ke saath samjhao.`,
                        qp.action
                      );
                    } else {
                      handleSendMessage(
                        `Please ${qp.label.toLowerCase()} for the current topic: ${tutorContext.topic || "this concept"}.`,
                        qp.action
                      );
                    }
                  }}
                  disabled={loading}
                  className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold bg-[#141418] hover:bg-orange-500/10 hover:text-orange-400 border border-zinc-800 text-zinc-300 transition active:scale-95"
                >
                  <Icon className="w-3 h-3 text-orange-500" />
                  <span>{qp.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Form with Visual Switch Indicator */}
        <div className="p-3.5 border-t border-zinc-800 bg-[#0c0c0e]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                id="input-ai-tutor-message"
                type="text"
                placeholder={
                  visualModeActive
                    ? "Ask to visualize any data structure, architecture, or algorithm..."
                    : "Ask anything in English, Hinglish, or Hindi..."
                }
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                disabled={loading}
                className={`w-full bg-[#141418] text-xs text-white px-3.5 py-2.5 rounded-lg border focus:outline-none transition placeholder-zinc-500 font-mono ${
                  visualModeActive
                    ? "border-orange-500/60 focus:border-orange-400 bg-orange-950/10"
                    : "border-zinc-800 focus:border-orange-500"
                }`}
              />
              {visualModeActive && (
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold text-orange-400 bg-orange-500/20 px-1.5 py-0.5 rounded border border-orange-500/30">
                  VISUAL
                </span>
              )}
            </div>

            <button
              id="btn-send-ai-tutor"
              type="submit"
              disabled={!inputQuery.trim() || loading}
              className="p-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white transition shadow-md shadow-orange-500/25"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Lightbox / Modal for Visual Diagram Inspection */}
      {activeLightboxImg && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e0e12] border border-zinc-800 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col">
            <div className="p-3.5 border-b border-zinc-800 flex items-center justify-between bg-[#121216]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-white">
                <ImageIcon className="w-4 h-4 text-orange-400" />
                <span>{activeLightboxImg.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={activeLightboxImg.url}
                  download="chintan-ai-diagram.png"
                  className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save
                </a>
                <button
                  onClick={() => setActiveLightboxImg(null)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 bg-[#09090b] flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src={activeLightboxImg.url}
                alt={activeLightboxImg.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] rounded-lg object-contain border border-zinc-800 shadow-lg"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

