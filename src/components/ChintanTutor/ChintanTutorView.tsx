import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu,
  Sparkles,
  Plus,
  Brain,
  Radio,
  BookOpen,
  Code2,
  Building2,
  Compass,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Globe
} from "lucide-react";
import { useApp } from "../../context/AppContext.js";
import { useAuth } from "../../context/AuthContext.js";
import { ChatSession, TutorMessage, MessageAttachment, TutorPageContext, LearningMemoryItem } from "../../types/tutor.js";
import { ChatHistoryService } from "../../services/chatHistoryService.js";
import { MemoryService } from "../../services/memoryService.js";
import { TutorService } from "../../services/tutorService.js";
import { ChatHistorySidebar } from "./ChatHistorySidebar.js";
import { ChatMessageItem } from "./ChatMessageItem.js";
import { ChatInputArea } from "./ChatInputArea.js";
import { LearningMemoryModal } from "./LearningMemoryModal.js";
import { VoiceConversationModal } from "./VoiceConversationModal.js";

export const ChintanTutorView: React.FC = () => {
  const {
    currentTab,
    selectedProblemId,
    selectedCourseId,
    selectedCompanyId,
    returnFromTutor,
  } = useApp();

  const { user } = useAuth();

  // Sessions state
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Learning Memory state
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [isMemoryEnabled, setIsMemoryEnabled] = useState<boolean>(() => MemoryService.isMemoryEnabled());
  const [memoryItems, setMemoryItems] = useState<LearningMemoryItem[]>(() => MemoryService.getMemoryItems());

  // Search Grounding state
  const [enableSearchGrounding, setEnableSearchGrounding] = useState(false);

  // Voice Conversation Modal state
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  // In-flight loading state
  const [isLoading, setIsLoading] = useState(false);

  // Message scroll anchor
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize sessions from storage or create fresh
  useEffect(() => {
    const loadedSessions = ChatHistoryService.getAllSessions();
    setSessions(loadedSessions);

    const savedActiveId = ChatHistoryService.getActiveSessionId();
    if (savedActiveId && loadedSessions.some((s) => s.id === savedActiveId)) {
      setActiveSessionId(savedActiveId);
    } else if (loadedSessions.length > 0) {
      setActiveSessionId(loadedSessions[0].id);
      ChatHistoryService.setActiveSessionId(loadedSessions[0].id);
    } else {
      // Auto-create initial session
      const initial = ChatHistoryService.createSession("New Conversation");
      setSessions([initial]);
      setActiveSessionId(initial.id);
    }
  }, []);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages, isLoading]);

  // Handle creating a new chat session
  const handleNewChat = useCallback(() => {
    const newSession = ChatHistoryService.createSession("New Conversation");
    setSessions(ChatHistoryService.getAllSessions());
    setActiveSessionId(newSession.id);
  }, []);

  // Handle selecting a chat session
  const handleSelectSession = useCallback((id: string) => {
    setActiveSessionId(id);
    ChatHistoryService.setActiveSessionId(id);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  // Handle deleting a chat session
  const handleDeleteSession = useCallback((id: string) => {
    ChatHistoryService.deleteSession(id);
    const updated = ChatHistoryService.getAllSessions();
    setSessions(updated);
    const nextActive = ChatHistoryService.getActiveSessionId();
    setActiveSessionId(nextActive);
  }, []);

  // Handle renaming a chat session
  const handleRenameSession = useCallback((id: string, newTitle: string) => {
    ChatHistoryService.renameSession(id, newTitle);
    setSessions(ChatHistoryService.getAllSessions());
  }, []);

  // Handle clearing all chat sessions
  const handleClearAllSessions = useCallback(() => {
    ChatHistoryService.deleteAllSessions();
    const fresh = ChatHistoryService.createSession("New Conversation");
    setSessions([fresh]);
    setActiveSessionId(fresh.id);
  }, []);

  // Handle memory toggles and updates
  const handleToggleMemory = (enabled: boolean) => {
    MemoryService.setMemoryEnabled(enabled);
    setIsMemoryEnabled(enabled);
  };

  const handleUpdateMemoryItems = (items: LearningMemoryItem[]) => {
    setMemoryItems(items);
  };

  // Compile active page context (supporting context only)
  const getSupportingPageContext = (): TutorPageContext => {
    return {
      tab: currentTab,
      problemTitle: selectedProblemId ? `Problem #${selectedProblemId}` : undefined,
      courseTitle: selectedCourseId ? `Course #${selectedCourseId}` : undefined,
      companyName: selectedCompanyId ? `Company #${selectedCompanyId}` : undefined,
    };
  };

  // Handle sending a message
  const handleSendMessage = async (content: string, attachment?: MessageAttachment) => {
    if (!content.trim() && !attachment) return;
    if (!activeSession) return;

    const userMessageId = `msg_user_${Date.now()}`;
    const userMessage: TutorMessage = {
      id: userMessageId,
      role: "user",
      content: content.trim(),
      timestamp: new Date().toISOString(),
      attachment,
    };

    // If session is still titled "New Conversation", auto-generate title from first prompt
    let updatedTitle = activeSession.title;
    if (activeSession.title === "New Conversation" && activeSession.messages.length === 0) {
      updatedTitle = ChatHistoryService.generateTitleFromMessage(content);
    }

    const pendingBotMessageId = `msg_bot_${Date.now()}`;
    const pendingBotMessage: TutorMessage = {
      id: pendingBotMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
      isPending: true,
    };

    // Update session immediately with user message + pending indicator
    const sessionWithUser = {
      ...activeSession,
      title: updatedTitle,
      messages: [...activeSession.messages, userMessage, pendingBotMessage],
      updatedAt: new Date().toISOString(),
    };

    ChatHistoryService.saveSession(sessionWithUser);
    setSessions(ChatHistoryService.getAllSessions());
    setIsLoading(true);

    try {
      const response = await TutorService.sendChatMessage({
        message: content.trim(),
        imageAttachment: attachment
          ? {
              mimeType: attachment.mimeType,
              base64Data: attachment.dataUrl.split(",")[1] || attachment.dataUrl,
              filename: attachment.name,
            }
          : undefined,
        conversationHistory: activeSession.messages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        pageContext: getSupportingPageContext(),
        learningMemory: {
          enabled: isMemoryEnabled,
          items: memoryItems,
        },
        enableSearchGrounding,
      });

      const finishedBotMessage: TutorMessage = {
        id: pendingBotMessageId,
        role: "assistant",
        content: response.answer,
        timestamp: new Date().toISOString(),
        sources: response.sources,
        isGrounded: response.isGrounded,
        visualConcept: response.visualConcept,
        visualImageUrl: response.visualImageUrl,
        suggestedFollowUps: response.suggestedFollowUps,
        isPending: false,
      };

      const finalSession = {
        ...sessionWithUser,
        messages: [...activeSession.messages, userMessage, finishedBotMessage],
        updatedAt: new Date().toISOString(),
      };

      ChatHistoryService.saveSession(finalSession);
      setSessions(ChatHistoryService.getAllSessions());
    } catch (err: any) {
      const errorText =
        err?.message?.includes("Unable to reach") || err?.message?.includes("Failed to fetch")
          ? "Unable to reach the AI service. Please try again."
          : (err?.message || "Unable to reach the AI service. Please try again.");

      const errorBotMessage: TutorMessage = {
        id: pendingBotMessageId,
        role: "assistant",
        content: errorText,
        timestamp: new Date().toISOString(),
        isPending: false,
        isError: true,
      };

      const errorSession = {
        ...sessionWithUser,
        messages: [...activeSession.messages, userMessage, errorBotMessage],
        updatedAt: new Date().toISOString(),
      };

      ChatHistoryService.saveSession(errorSession);
      setSessions(ChatHistoryService.getAllSessions());
    } finally {
      setIsLoading(false);
    }
  };

  // Handle retry of the last user question
  const handleRetryLastMessage = async () => {
    if (!activeSession || activeSession.messages.length === 0 || isLoading) return;

    // Find the last user message
    const reversed = [...activeSession.messages].reverse();
    const lastUserMsg = reversed.find((m) => m.role === "user");
    if (!lastUserMsg) return;

    // Remove any trailing error message
    const cleanedMessages = activeSession.messages.filter((m) => !m.isError && !m.isPending);

    const pendingBotMessageId = `msg_bot_${Date.now()}`;
    const pendingBotMessage: TutorMessage = {
      id: pendingBotMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
      isPending: true,
    };

    const sessionWithPending = {
      ...activeSession,
      messages: [...cleanedMessages, pendingBotMessage],
      updatedAt: new Date().toISOString(),
    };

    ChatHistoryService.saveSession(sessionWithPending);
    setSessions(ChatHistoryService.getAllSessions());
    setIsLoading(true);

    try {
      const response = await TutorService.sendChatMessage({
        message: lastUserMsg.content,
        imageAttachment: lastUserMsg.attachment
          ? {
              mimeType: lastUserMsg.attachment.mimeType,
              base64Data: lastUserMsg.attachment.dataUrl.split(",")[1] || lastUserMsg.attachment.dataUrl,
              filename: lastUserMsg.attachment.name,
            }
          : undefined,
        conversationHistory: cleanedMessages.slice(0, -1).map((m) => ({
          role: m.role,
          content: m.content,
        })),
        pageContext: getSupportingPageContext(),
        learningMemory: {
          enabled: isMemoryEnabled,
          items: memoryItems,
        },
        enableSearchGrounding,
      });

      const finishedBotMessage: TutorMessage = {
        id: pendingBotMessageId,
        role: "assistant",
        content: response.answer,
        timestamp: new Date().toISOString(),
        sources: response.sources,
        isGrounded: response.isGrounded,
        visualConcept: response.visualConcept,
        visualImageUrl: response.visualImageUrl,
        suggestedFollowUps: response.suggestedFollowUps,
        isPending: false,
      };

      const finalSession = {
        ...activeSession,
        messages: [...cleanedMessages, finishedBotMessage],
        updatedAt: new Date().toISOString(),
      };

      ChatHistoryService.saveSession(finalSession);
      setSessions(ChatHistoryService.getAllSessions());
    } catch (err: any) {
      const errorText =
        err?.message?.includes("Unable to reach") || err?.message?.includes("Failed to fetch")
          ? "Unable to reach the AI service. Please try again."
          : (err?.message || "Unable to reach the AI service. Please try again.");

      const errorBotMessage: TutorMessage = {
        id: pendingBotMessageId,
        role: "assistant",
        content: errorText,
        timestamp: new Date().toISOString(),
        isPending: false,
        isError: true,
      };

      const errorSession = {
        ...activeSession,
        messages: [...cleanedMessages, errorBotMessage],
        updatedAt: new Date().toISOString(),
      };

      ChatHistoryService.saveSession(errorSession);
      setSessions(ChatHistoryService.getAllSessions());
    } finally {
      setIsLoading(false);
    }
  };

  // Handle explicit visualization request from an assistant explanation
  const handleVisualizeConcept = async (concept: string, context: string) => {
    if (!activeSession) return;
    try {
      const imageUrl = await TutorService.requestVisualization(concept, context.slice(0, 300));
      // Append or update visual diagram in the active session
      const visualMessage: TutorMessage = {
        id: `visual_${Date.now()}`,
        role: "assistant",
        content: `Here is the technical architectural schematic for **${concept}**:`,
        timestamp: new Date().toISOString(),
        visualConcept: concept,
        visualImageUrl: imageUrl,
      };

      const updatedSession = {
        ...activeSession,
        messages: [...activeSession.messages, visualMessage],
        updatedAt: new Date().toISOString(),
      };

      ChatHistoryService.saveSession(updatedSession);
      setSessions(ChatHistoryService.getAllSessions());
    } catch (e: any) {
      alert(`Could not generate visualization: ${e.message}`);
    }
  };

  // Quick suggestion prompts for the empty state
  const quickPrompts = [
    {
      title: "DSA & Algorithms",
      desc: "Explain QuickSort vs MergeSort with time complexity and recursion tree",
      prompt: "Explain the difference between QuickSort and MergeSort with their recursion trees, best/worst time complexities, and when to prefer which.",
      icon: Code2,
      color: "from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30",
    },
    {
      title: "Placement Strategy",
      desc: "What are the common coding patterns in TCS Digital & Prime rounds?",
      prompt: "What are the most frequent coding patterns and aptitude requirements for TCS Digital and Prime rounds? Give me high-yield topics.",
      icon: Building2,
      color: "from-amber-500/20 to-orange-500/20 text-orange-400 border-orange-500/30",
    },
    {
      title: "Visual Schematic",
      desc: "Visualize Dijkstra's algorithm and priority queue state transitions",
      prompt: "Visualize Dijkstra's algorithm on a weighted directed graph step-by-step with priority queue states.",
      icon: Compass,
      color: "from-purple-500/20 to-indigo-500/20 text-purple-400 border-purple-500/30",
    },
    {
      title: "Real-time Industry Trends",
      desc: "Current recruitment and technology hiring trends in 2026",
      prompt: "What are the latest hiring trends and in-demand skills in the software industry right now in 2026?",
      icon: Globe,
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    },
  ];

  return (
    <div className="flex h-screen bg-[#08090d] text-zinc-100 overflow-hidden">
      {/* 1. Left Chat History Sidebar */}
      <ChatHistorySidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={handleSelectSession}
        onNewChat={handleNewChat}
        onDeleteSession={handleDeleteSession}
        onRenameSession={handleRenameSession}
        onClearAll={handleClearAllSessions}
        onOpenMemoryModal={() => setIsMemoryModalOpen(true)}
        isMemoryEnabled={isMemoryEnabled}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* 2. Main Chat Column */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Top Navbar / Header */}
        <header className="h-14 px-4 sm:px-6 border-b border-zinc-800/80 bg-[#0a0b10]/90 backdrop-blur-md flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            {/* Back to Chintan GPT Navigation Control */}
            <button
              id="btn-tutor-back"
              onClick={returnFromTutor}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 hover:border-orange-500/50 text-xs font-mono font-bold transition shadow-sm shrink-0 cursor-pointer"
              title="Return to Chintan GPT"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">Back to Chintan GPT</span>
              <span className="sm:hidden">Back</span>
            </button>

            {/* Mobile Sidebar Hamburger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              title="Open Chat History"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Active Session Title */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-orange-400" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
                  {activeSession?.title || "Chintan AI Tutor"}
                </h1>
                <p className="text-[10px] text-zinc-400 hidden sm:block font-mono">
                  Gemini 3.8 Flash • Multimodal & Grounded
                </p>
              </div>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Learning Memory Quick Status Button */}
            <button
              onClick={() => setIsMemoryModalOpen(true)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                isMemoryEnabled
                  ? "bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 border border-purple-500/30"
                  : "bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800"
              }`}
              title="Manage personalized Learning Memory"
            >
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Memory:</span>
              <span className="font-bold">{isMemoryEnabled ? "ON" : "OFF"}</span>
            </button>

            {/* Voice Mode Call Button */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-mono font-bold transition shadow-sm"
              title="Start voice dialogue"
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voice Mode</span>
            </button>

            {/* New Chat Icon Button */}
            <button
              onClick={handleNewChat}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition"
              title="Start a new chat"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Chat Scrollable Message Area */}
        <div className="flex-1 overflow-y-auto scrollbar-thin flex flex-col">
          {activeSession && activeSession.messages.length > 0 ? (
            <div className="flex-1 py-4">
              {activeSession.messages.map((msg, idx) => (
                <ChatMessageItem
                  key={msg.id || idx}
                  message={msg}
                  isLastAssistantMessage={
                    msg.role === "assistant" && idx === activeSession.messages.length - 1
                  }
                  onRetry={handleRetryLastMessage}
                  onVisualize={handleVisualizeConcept}
                  onSelectFollowUp={(prompt) => handleSendMessage(prompt)}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            /* Empty State / Welcome Screen */
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-3xl mx-auto my-auto space-y-8 animate-in fade-in duration-200">
              <div className="space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center mx-auto shadow-2xl shadow-orange-500/25 ring-4 ring-orange-500/20">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Chintan AI Tutor
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
                  Your 24/7 intelligent companion for DSA, coding, placements, and engineering concepts.
                  Ask questions, upload code screenshots, visualize algorithms, or practice voice interviews.
                </p>
              </div>

              {/* Quick suggestion cards */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                {quickPrompts.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(card.prompt)}
                      className={`p-4 rounded-2xl bg-gradient-to-br ${card.color} hover:scale-[1.01] transition-all duration-200 border flex flex-col justify-between group shadow-sm`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4" />
                          <span className="font-bold text-xs uppercase tracking-wider">
                            {card.title}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                        {card.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Input Bar Area */}
        <ChatInputArea
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
          enableSearchGrounding={enableSearchGrounding}
          onToggleSearchGrounding={setEnableSearchGrounding}
          onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        />
      </div>

      {/* 3. Learning Memory Modal */}
      <LearningMemoryModal
        isOpen={isMemoryModalOpen}
        onClose={() => setIsMemoryModalOpen(false)}
        isMemoryEnabled={isMemoryEnabled}
        onToggleMemory={handleToggleMemory}
        memoryItems={memoryItems}
        onUpdateItems={handleUpdateMemoryItems}
      />

      {/* 4. Interactive Hands-Free Voice Conversation Modal */}
      <VoiceConversationModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        pageContext={getSupportingPageContext()}
        learningMemory={{
          enabled: isMemoryEnabled,
          items: memoryItems,
        }}
        onMessageLogged={(role, content) => {
          if (!activeSession) return;
          const newMsg: TutorMessage = {
            id: `voice_${Date.now()}`,
            role,
            content,
            timestamp: new Date().toISOString(),
          };
          const updated = {
            ...activeSession,
            messages: [...activeSession.messages, newMsg],
            updatedAt: new Date().toISOString(),
          };
          ChatHistoryService.saveSession(updated);
          setSessions(ChatHistoryService.getAllSessions());
        }}
      />
    </div>
  );
};
