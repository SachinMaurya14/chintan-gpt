import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Mic,
  MicOff,
  Globe,
  X,
  Sparkles,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { MessageAttachment } from "../../types/tutor.js";
import { VoiceService } from "../../services/voiceService.js";

interface ChatInputAreaProps {
  onSendMessage: (content: string, attachment?: MessageAttachment) => void;
  isLoading: boolean;
  enableSearchGrounding: boolean;
  onToggleSearchGrounding: (enabled: boolean) => void;
  onOpenVoiceModal: () => void;
  placeholder?: string;
}

export const ChatInputArea: React.FC<ChatInputAreaProps> = ({
  onSendMessage,
  isLoading,
  enableSearchGrounding,
  onToggleSearchGrounding,
  onOpenVoiceModal,
  placeholder = "Ask Chintan AI Tutor anything (code, algorithms, placements, concepts, or stories)...",
}) => {
  const [input, setInput] = useState("");
  const [attachment, setAttachment] = useState<MessageAttachment | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const nextHeight = Math.min(textareaRef.current.scrollHeight, 180);
      textareaRef.current.style.height = `${nextHeight}px`;
    }
  }, [input]);

  // Handle paste image from clipboard (Ctrl+V screenshot)
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith("image/")) {
        const file = items[i].getAsFile();
        if (file) {
          processImageFile(file);
          e.preventDefault();
          break;
        }
      }
    }
  };

  const processImageFile = (file: File) => {
    if (file.size > 8 * 1024 * 1024) {
      alert("Image size exceeds 8MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setAttachment({
          name: file.name || "screenshot.png",
          mimeType: file.type || "image/png",
          dataUrl,
          sizeBytes: file.size,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleToggleVoice = () => {
    if (isListening) {
      VoiceService.stopListening();
      setIsListening(false);
    } else {
      setVoiceError(null);
      const started = VoiceService.startListening(
        (transcript, isFinal) => {
          setInput((prev) => {
            const trimmed = prev.trim();
            return trimmed ? `${trimmed} ${transcript}` : transcript;
          });
          if (isFinal) {
            setIsListening(false);
          }
        },
        (error) => {
          setVoiceError(error);
          setIsListening(false);
        },
        () => setIsListening(false)
      );
      if (started) {
        setIsListening(true);
      }
    }
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if ((!trimmed && !attachment) || isLoading) return;

    onSendMessage(trimmed, attachment || undefined);
    setInput("");
    setAttachment(null);
    if (isListening) {
      VoiceService.stopListening();
      setIsListening(false);
    }

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      {/* Voice error banner */}
      {voiceError && (
        <div className="mb-2 px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
          <span>{voiceError}</span>
          <button onClick={() => setVoiceError(null)} className="p-0.5 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Input Container */}
      <div className="relative rounded-2xl bg-[#12131a] border border-zinc-800 focus-within:border-orange-500/60 transition-all shadow-xl shadow-black/40">
        {/* Attachment preview strip */}
        {attachment && (
          <div className="p-2.5 border-b border-zinc-800/80 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
              <img src={attachment.dataUrl} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={() => setAttachment(null)}
                className="absolute top-0.5 right-0.5 p-0.5 bg-black/80 hover:bg-black text-white rounded-full transition"
                title="Remove Image"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
            <div className="text-xs text-zinc-300 truncate">
              <div className="font-semibold truncate">{attachment.name}</div>
              <div className="text-[10px] text-zinc-500">
                {attachment.sizeBytes ? `${Math.round(attachment.sizeBytes / 1024)} KB • ` : ""}
                Ready for multimodal reasoning
              </div>
            </div>
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          placeholder={isListening ? "Listening... Speak now..." : placeholder}
          rows={1}
          disabled={isLoading}
          className="w-full pt-3.5 pb-2 px-4 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 resize-none outline-none max-h-44 min-h-[48px] scrollbar-thin"
        />

        {/* Action Controls Bar */}
        <div className="px-3 pb-2.5 pt-1 flex items-center justify-between border-t border-zinc-800/40">
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Attach Image button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-1.5 text-zinc-400 hover:text-orange-400 hover:bg-zinc-800 rounded-lg transition"
              title="Attach screenshot or code image"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Voice Input button */}
            <button
              type="button"
              onClick={handleToggleVoice}
              className={`p-1.5 rounded-lg transition ${
                isListening
                  ? "bg-rose-500 text-white animate-pulse shadow-md shadow-rose-500/30"
                  : "text-zinc-400 hover:text-orange-400 hover:bg-zinc-800"
              }`}
              title={isListening ? "Stop listening" : "Speak question"}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Full Hands-Free Voice Dialogue Trigger */}
            <button
              type="button"
              onClick={onOpenVoiceModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-mono font-semibold bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/25 transition"
              title="Open full interactive voice conversation"
            >
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span>Voice Mode</span>
            </button>

            {/* Google Search Grounding toggle */}
            <button
              type="button"
              onClick={() => onToggleSearchGrounding(!enableSearchGrounding)}
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-mono font-semibold transition ${
                enableSearchGrounding
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 border border-transparent"
              }`}
              title="Toggle Google Search real-time web grounding"
            >
              <Globe className="w-3 h-3" />
              <span className="hidden sm:inline">Web Grounding</span>
            </button>
          </div>

          {/* Right Action: Send Button */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-[10px] text-zinc-500 font-mono">
              ↵ Enter to send
            </span>
            <button
              type="button"
              onClick={handleSend}
              disabled={(!input.trim() && !attachment) || isLoading}
              className={`p-2 rounded-xl flex items-center justify-center transition-all ${
                (input.trim() || attachment) && !isLoading
                  ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
              title="Send message"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-zinc-400" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
