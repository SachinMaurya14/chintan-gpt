import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Bot,
  User,
  Copy,
  Check,
  Volume2,
  VolumeX,
  RotateCw,
  ExternalLink,
  Globe,
  Sparkles,
  Eye,
  Maximize2,
  X,
  FileCode,
  Loader2
} from "lucide-react";
import { TutorMessage, GroundingSource } from "../../types/tutor.js";
import { VoiceService } from "../../services/voiceService.js";

interface ChatMessageItemProps {
  message: TutorMessage;
  isLastAssistantMessage?: boolean;
  onRetry?: () => void;
  onVisualize?: (concept: string, context: string) => void;
  onSelectFollowUp?: (prompt: string) => void;
}

export const ChatMessageItem: React.FC<ChatMessageItemProps> = ({
  message,
  isLastAssistantMessage,
  onRetry,
  onVisualize,
  onSelectFollowUp,
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  const isUser = message.role === "user";

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      VoiceService.stopSpeaking();
      setIsSpeaking(false);
    } else {
      VoiceService.speakText(
        message.content,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false),
        () => setIsSpeaking(false)
      );
    }
  };

  // Custom renderer for code blocks in Markdown
  let codeBlockCounter = 0;

  return (
    <div
      className={`group w-full py-4 px-4 sm:px-6 transition-colors ${
        isUser ? "bg-transparent" : "bg-[#0d0e14]/60 border-y border-zinc-800/40"
      }`}
    >
      <div className="max-w-4xl mx-auto flex items-start gap-3.5 sm:gap-4">
        {/* Avatar */}
        <div className="shrink-0 pt-0.5">
          {isUser ? (
            <div className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-xs border border-zinc-700">
              <User className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Message Content Body */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Header Row: Sender label & Timestamp */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-200">
                {isUser ? "You" : "Chintan AI Tutor"}
              </span>
              {message.isGrounded && (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold">
                  <Globe className="w-2.5 h-2.5" />
                  <span>Google Grounded</span>
                </span>
              )}
              {message.timestamp && (
                <span className="text-[10px] text-zinc-500 font-mono">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>

            {/* Top quick copy button */}
            {!isUser && !message.isPending && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
                <button
                  onClick={handleCopyMessage}
                  className="p-1 text-zinc-500 hover:text-zinc-200 rounded transition"
                  title="Copy response"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={handleToggleSpeak}
                  className={`p-1 rounded transition ${
                    isSpeaking ? "text-orange-400 bg-orange-500/10" : "text-zinc-500 hover:text-zinc-200"
                  }`}
                  title={isSpeaking ? "Stop Speaking" : "Read Aloud"}
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            )}
          </div>

          {/* User Attached Image (Multimodal) */}
          {message.attachment && (
            <div className="relative inline-block max-w-sm rounded-xl overflow-hidden border border-zinc-700/80 bg-zinc-900 group/img">
              <img
                src={message.attachment.dataUrl}
                alt={message.attachment.name || "Attachment"}
                className="max-h-60 w-auto object-contain cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-2 flex items-center justify-between text-[11px] text-zinc-300">
                <span className="truncate">{message.attachment.name}</span>
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="p-1 hover:text-white"
                  title="Enlarge Image"
                >
                  <Maximize2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Pending Typing Indicator */}
          {message.isPending && (
            <div className="flex items-center gap-2 py-2 text-zinc-400 text-xs font-mono">
              <Loader2 className="w-4 h-4 animate-spin text-orange-500" />
              <span>Chintan AI Tutor is formulating an intelligent response...</span>
            </div>
          )}

          {/* Error State */}
          {message.isError && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2">
              <p className="font-semibold">{message.content}</p>
              {onRetry && (
                <button
                  onClick={onRetry}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold transition"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Retry Question</span>
                </button>
              )}
            </div>
          )}

          {/* Normal Markdown Text Content */}
          {!message.isPending && !message.isError && (
            <div className="prose prose-invert max-w-none text-zinc-200 text-sm leading-relaxed space-y-2 break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    const codeString = String(children).replace(/\n$/, "");
                    const currentIdx = ++codeBlockCounter;

                    if (!inline && match) {
                      return (
                        <div className="my-3 rounded-xl overflow-hidden border border-zinc-800 bg-[#07080b] shadow-lg">
                          <div className="flex items-center justify-between px-3.5 py-1.5 bg-zinc-900/90 border-b border-zinc-800 text-[11px] font-mono text-zinc-400">
                            <span className="flex items-center gap-1.5 uppercase font-bold text-orange-400">
                              <FileCode className="w-3.5 h-3.5" />
                              {match[1]}
                            </span>
                            <button
                              onClick={() => handleCopyCode(codeString, currentIdx)}
                              className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition"
                            >
                              {copiedCodeIdx === currentIdx ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-400">Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="p-3.5 overflow-x-auto text-xs font-mono leading-relaxed bg-[#07080b] text-zinc-200">
                            <code>{children}</code>
                          </pre>
                        </div>
                      );
                    }
                    return (
                      <code className="px-1.5 py-0.5 rounded text-xs font-mono bg-zinc-800/90 text-orange-300 border border-zinc-700/50" {...props}>
                        {children}
                      </code>
                    );
                  },
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 mb-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 mb-2">{children}</ol>,
                  li: ({ children }) => <li className="pl-0.5">{children}</li>,
                  h1: ({ children }) => <h1 className="text-lg font-bold text-white mt-4 mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-bold text-white mt-3 mb-1.5">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-bold text-orange-300 mt-2 mb-1">{children}</h3>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-orange-500/50 pl-3 py-0.5 my-2 text-zinc-400 italic">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}

          {/* Visual Diagram Schematic Display */}
          {message.visualImageUrl && (
            <div className="mt-3 p-3 rounded-xl bg-zinc-900/90 border border-zinc-800 shadow-md space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-1.5 font-bold text-orange-400">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Educational Schematic: {message.visualConcept || "Concept Visual"}</span>
                </span>
                <button
                  onClick={() => setIsImageModalOpen(true)}
                  className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Expand</span>
                </button>
              </div>

              <div
                className="w-full flex items-center justify-center rounded-lg overflow-hidden bg-[#09090b] border border-zinc-800/80 cursor-pointer"
                onClick={() => setIsImageModalOpen(true)}
              >
                <img
                  src={message.visualImageUrl}
                  alt={message.visualConcept || "Concept Diagram"}
                  className="w-full h-auto max-h-96 object-contain"
                />
              </div>
            </div>
          )}

          {/* Google Search Grounding Sources Box */}
          {message.sources && message.sources.length > 0 && (
            <div className="mt-3 p-3 rounded-xl bg-[#090c12] border border-cyan-500/25 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400">
                <Globe className="w-3.5 h-3.5" />
                <span>Verified Sources & Google Grounding Citations:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {message.sources.map((src, idx) => (
                  <a
                    key={idx}
                    href={src.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800/80 text-xs text-zinc-300 hover:text-cyan-300 transition-colors group/link"
                  >
                    <span className="truncate pr-2">{src.title || src.uri}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 text-zinc-500 group-hover/link:text-cyan-400" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Action Toolbar on Assistant Messages */}
          {!isUser && !message.isPending && (
            <div className="pt-1 flex flex-wrap items-center gap-2 text-xs">
              {/* Visualize Button */}
              {onVisualize && !message.visualImageUrl && (
                <button
                  onClick={() => onVisualize(message.visualConcept || "Algorithm", message.content)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-orange-300 border border-zinc-800 text-[11px] font-semibold transition"
                >
                  <Eye className="w-3 h-3 text-orange-400" />
                  <span>Visualize This</span>
                </button>
              )}

              {/* Read Aloud */}
              <button
                onClick={handleToggleSpeak}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                  isSpeaking
                    ? "bg-orange-500/20 text-orange-300 border-orange-500/40 animate-pulse"
                    : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border-zinc-800"
                }`}
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-3 h-3 text-orange-400" />
                    <span>Stop Speaking</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3 h-3 text-zinc-400" />
                    <span>Read Aloud</span>
                  </>
                )}
              </button>

              {/* Copy Full Message */}
              <button
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 text-[11px] transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          )}

          {/* Suggested Follow-Ups */}
          {!isUser && message.suggestedFollowUps && message.suggestedFollowUps.length > 0 && onSelectFollowUp && (
            <div className="pt-2 flex flex-wrap gap-1.5">
              {message.suggestedFollowUps.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectFollowUp(chip)}
                  className="px-2.5 py-1 rounded-full bg-zinc-900/90 hover:bg-orange-500/10 hover:border-orange-500/40 text-zinc-300 hover:text-orange-300 border border-zinc-800 text-[11px] transition-all duration-150"
                >
                  {chip} &rarr;
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-zinc-950 p-2 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={message.visualImageUrl || message.attachment?.dataUrl}
              alt="Enlarged Visual"
              className="max-h-[82vh] w-auto mx-auto object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};
