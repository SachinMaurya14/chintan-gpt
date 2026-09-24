import React, { useState } from "react";
import {
  MessageSquare,
  Plus,
  Search,
  Trash2,
  Edit2,
  Check,
  X,
  Brain,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar
} from "lucide-react";
import { ChatSession, DateGroupedSessions } from "../../types/tutor.js";
import { ChatHistoryService } from "../../services/chatHistoryService.js";

interface ChatHistorySidebarProps {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onRenameSession: (id: string, newTitle: string) => void;
  onClearAll: () => void;
  onOpenMemoryModal: () => void;
  isMemoryEnabled: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatHistorySidebar: React.FC<ChatHistorySidebarProps> = ({
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onRenameSession,
  onClearAll,
  onOpenMemoryModal,
  isMemoryEnabled,
  isOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [confirmClearAll, setConfirmClearAll] = useState(false);

  const filteredSessions = ChatHistoryService.searchSessions(searchQuery, sessions);
  const grouped = ChatHistoryService.groupSessionsByDate(filteredSessions);

  const handleStartRename = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(session.id);
    setEditTitle(session.title);
  };

  const handleSaveRename = (id: string, e: React.MouseEvent | React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (editTitle.trim()) {
      onRenameSession(id, editTitle.trim());
    }
    setEditingSessionId(null);
  };

  const handleCancelRename = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingSessionId(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteSession(id);
  };

  const renderSessionItem = (session: ChatSession) => {
    const isActive = session.id === activeSessionId;
    const isEditing = session.id === editingSessionId;

    if (isEditing) {
      return (
        <form
          key={session.id}
          onSubmit={(e) => handleSaveRename(session.id, e)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-800 border border-orange-500/50"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-1 bg-transparent text-xs text-white outline-none font-medium"
            autoFocus
          />
          <button
            type="submit"
            className="p-1 text-emerald-400 hover:text-emerald-300 rounded"
            title="Save"
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCancelRename}
            className="p-1 text-zinc-400 hover:text-zinc-300 rounded"
            title="Cancel"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </form>
      );
    }

    return (
      <div
        key={session.id}
        onClick={() => onSelectSession(session.id)}
        className={`group relative flex items-center justify-between px-3 py-2 rounded-lg text-xs cursor-pointer transition-all duration-150 ${
          isActive
            ? "bg-orange-500/10 text-white font-semibold border border-orange-500/30 shadow-sm"
            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/80 border border-transparent"
        }`}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
          <MessageSquare
            className={`w-3.5 h-3.5 shrink-0 ${
              isActive ? "text-orange-400" : "text-zinc-500 group-hover:text-zinc-400"
            }`}
          />
          <span className="truncate">{session.title}</span>
        </div>

        {/* Action icons on hover or active */}
        <div className="opacity-0 group-hover:opacity-100 flex items-center gap-1 shrink-0 transition-opacity">
          <button
            type="button"
            onClick={(e) => handleStartRename(session, e)}
            className="p-1 text-zinc-500 hover:text-zinc-300 rounded hover:bg-zinc-800"
            title="Rename Chat"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={(e) => handleDelete(session.id, e)}
            className="p-1 text-zinc-500 hover:text-rose-400 rounded hover:bg-zinc-800"
            title="Delete Chat"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  };

  const renderGroup = (label: string, items: ChatSession[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-4">
        <div className="px-3 mb-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1.5">
          <Calendar className="w-3 h-3" />
          <span>{label}</span>
          <span className="text-[9px] text-zinc-600">({items.length})</span>
        </div>
        <div className="space-y-0.5">{items.map(renderSessionItem)}</div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-72 md:w-64 flex flex-col bg-[#0b0c10] border-r border-zinc-800/80 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Top Header & Actions */}
        <div className="p-3.5 border-b border-zinc-800/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                Chat History
              </span>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onClose}
              className="md:hidden p-1 text-zinc-400 hover:text-white rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* New Chat Button */}
          <button
            onClick={() => {
              onNewChat();
              if (window.innerWidth < 768) onClose();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-orange-500/15"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Chat</span>
          </button>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-900 text-zinc-200 rounded-lg border border-zinc-800 focus:border-zinc-700 outline-none placeholder:text-zinc-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
          {sessions.length === 0 ? (
            <div className="py-12 text-center text-zinc-600 text-xs font-mono space-y-2">
              <MessageSquare className="w-6 h-6 mx-auto text-zinc-700" />
              <p>No chat history yet.</p>
              <p className="text-[11px] text-zinc-600">Start asking questions!</p>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="py-8 text-center text-zinc-500 text-xs font-mono">
              No conversations match "{searchQuery}"
            </div>
          ) : (
            <>
              {renderGroup("Today", grouped.today)}
              {renderGroup("Yesterday", grouped.yesterday)}
              {renderGroup("Previous 7 Days", grouped.previous7Days)}
              {renderGroup("Older", grouped.older)}
            </>
          )}
        </div>

        {/* Bottom Footer: Learning Memory & Clear All */}
        <div className="p-3 border-t border-zinc-800/80 bg-[#090a0e] space-y-2">
          {/* Learning Memory Quick Trigger */}
          <button
            onClick={onOpenMemoryModal}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 transition-colors group"
          >
            <span className="flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-purple-400 group-hover:text-purple-300" />
              <span>Learning Memory</span>
            </span>
            <span
              className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                isMemoryEnabled
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                  : "bg-zinc-800 text-zinc-500"
              }`}
            >
              {isMemoryEnabled ? "Active" : "Off"}
            </span>
          </button>

          {/* Clear All Chats with confirmation */}
          {sessions.length > 0 && (
            <div>
              {confirmClearAll ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      onClearAll();
                      setConfirmClearAll(false);
                    }}
                    className="flex-1 py-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 rounded border border-rose-500/30"
                  >
                    Confirm Clear All
                  </button>
                  <button
                    onClick={() => setConfirmClearAll(false)}
                    className="px-2 py-1 text-[11px] text-zinc-400 bg-zinc-800 hover:bg-zinc-700 rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmClearAll(true)}
                  className="w-full text-center py-1 text-[11px] text-zinc-500 hover:text-rose-400 transition-colors font-mono"
                >
                  Clear all chat history
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
