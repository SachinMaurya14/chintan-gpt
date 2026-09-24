import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Loader2,
  Radio
} from "lucide-react";
import { VoiceService } from "../../services/voiceService.js";
import { TutorService } from "../../services/tutorService.js";
import { TutorMessage, TutorPageContext, LearningMemoryItem } from "../../types/tutor.js";

interface VoiceConversationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageContext?: TutorPageContext;
  learningMemory?: {
    enabled: boolean;
    items: LearningMemoryItem[];
  };
  onMessageLogged?: (role: "user" | "assistant", content: string) => void;
}

export const VoiceConversationModal: React.FC<VoiceConversationModalProps> = ({
  isOpen,
  onClose,
  pageContext,
  learningMemory,
  onMessageLogged,
}) => {
  const [status, setStatus] = useState<"idle" | "listening" | "thinking" | "speaking">("idle");
  const [transcript, setTranscript] = useState("");
  const [assistantReply, setAssistantReply] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      VoiceService.stopListening();
      VoiceService.stopSpeaking();
    };
  }, []);

  if (!isOpen) return null;

  const handleStartListening = () => {
    setErrorMessage(null);
    setTranscript("");
    setStatus("listening");

    const started = VoiceService.startListening(
      (text, isFinal) => {
        if (!isMountedRef.current) return;
        setTranscript(text);
        if (isFinal) {
          VoiceService.stopListening();
          handleSendVoiceQuery(text);
        }
      },
      (err) => {
        if (!isMountedRef.current) return;
        setErrorMessage(err);
        setStatus("idle");
      },
      () => {
        if (status === "listening" && isMountedRef.current) {
          // If ended without final, query if transcript exists
          if (transcript.trim()) {
            handleSendVoiceQuery(transcript);
          } else {
            setStatus("idle");
          }
        }
      }
    );

    if (!started) {
      setStatus("idle");
    }
  };

  const handleStopListening = () => {
    VoiceService.stopListening();
    if (transcript.trim()) {
      handleSendVoiceQuery(transcript);
    } else {
      setStatus("idle");
    }
  };

  const handleSendVoiceQuery = async (queryText: string) => {
    const clean = queryText.trim();
    if (!clean) {
      setStatus("idle");
      return;
    }

    setStatus("thinking");
    if (onMessageLogged) {
      onMessageLogged("user", clean);
    }

    try {
      const response = await TutorService.sendChatMessage({
        message: clean,
        pageContext,
        learningMemory,
      });

      if (!isMountedRef.current) return;

      const reply = response.answer || "I hear you. How else can I assist your learning today?";
      setAssistantReply(reply);

      if (onMessageLogged) {
        onMessageLogged("assistant", reply);
      }

      setStatus("speaking");
      VoiceService.speakText(
        reply,
        () => {
          if (isMountedRef.current) setStatus("speaking");
        },
        () => {
          if (isMountedRef.current) setStatus("idle");
        },
        () => {
          if (isMountedRef.current) setStatus("idle");
        }
      );
    } catch (err: any) {
      if (!isMountedRef.current) return;
      setErrorMessage(err.message || "Failed to process voice query.");
      setStatus("idle");
    }
  };

  const handleInterruptSpeaking = () => {
    VoiceService.stopSpeaking();
    setStatus("idle");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-lg bg-[#0c0d14] border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            VoiceService.stopListening();
            VoiceService.stopSpeaking();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badge */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-xs font-mono font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Voice Session</span>
        </div>

        {/* Central Audio Wave / Orb Indicator */}
        <div className="my-6 relative flex items-center justify-center">
          <div
            className={`w-36 h-36 rounded-full flex items-center justify-center transition-all duration-300 ${
              status === "listening"
                ? "bg-rose-500/20 ring-8 ring-rose-500/30 scale-105 animate-pulse"
                : status === "thinking"
                ? "bg-orange-500/20 ring-8 ring-orange-500/30 animate-spin"
                : status === "speaking"
                ? "bg-purple-500/20 ring-8 ring-purple-500/30 scale-105"
                : "bg-zinc-800/60 ring-4 ring-zinc-800"
            }`}
          >
            {status === "thinking" ? (
              <Loader2 className="w-12 h-12 text-orange-400 animate-spin" />
            ) : status === "speaking" ? (
              <Volume2 className="w-12 h-12 text-purple-400 animate-bounce" />
            ) : status === "listening" ? (
              <Mic className="w-12 h-12 text-rose-400" />
            ) : (
              <Mic className="w-12 h-12 text-zinc-400" />
            )}
          </div>
        </div>

        {/* Status Text */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white mb-1">
            {status === "listening"
              ? "Listening to you..."
              : status === "thinking"
              ? "Formulating explanation..."
              : status === "speaking"
              ? "Chintan AI Tutor is speaking..."
              : "Ready to converse"}
          </h3>
          <p className="text-xs text-zinc-400 font-mono">
            {status === "listening"
              ? "Speak your question clearly"
              : status === "speaking"
              ? "Tap orb or stop button to interrupt"
              : "Tap the microphone below to start speaking"}
          </p>
        </div>

        {/* Live Transcript / Assistant Speech Box */}
        {(transcript || assistantReply) && (
          <div className="w-full max-h-36 overflow-y-auto p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-left mb-6 space-y-2 scrollbar-thin">
            {transcript && (
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">You said:</span>
                <p className="text-zinc-200 mt-0.5">{transcript}</p>
              </div>
            )}
            {assistantReply && (
              <div className="pt-2 border-t border-zinc-800">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Tutor response:</span>
                <p className="text-zinc-300 mt-0.5">{assistantReply}</p>
              </div>
            )}
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="w-full p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
            {errorMessage}
          </div>
        )}

        {/* Bottom Interactive Controls */}
        <div className="flex items-center gap-4">
          {status === "speaking" ? (
            <button
              onClick={handleInterruptSpeaking}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition"
            >
              <VolumeX className="w-4 h-4" />
              <span>Interrupt & Speak</span>
            </button>
          ) : status === "listening" ? (
            <button
              onClick={handleStopListening}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-500/30 transition"
            >
              <MicOff className="w-4 h-4" />
              <span>Done Speaking</span>
            </button>
          ) : (
            <button
              onClick={handleStartListening}
              disabled={status === "thinking"}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-800 text-white font-bold text-xs shadow-lg shadow-orange-500/20 transition"
            >
              <Mic className="w-4 h-4" />
              <span>Start Speaking</span>
            </button>
          )}

          <button
            onClick={() => {
              VoiceService.stopListening();
              VoiceService.stopSpeaking();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold transition"
          >
            End Call
          </button>
        </div>
      </div>
    </div>
  );
};
