import { ChatSession, TutorMessage, DateGroupedSessions, DateGroupKey } from "../types/tutor.js";

const SESSIONS_STORAGE_KEY = "chintan_tutor_sessions_v1";
const ACTIVE_SESSION_STORAGE_KEY = "chintan_tutor_active_session_id_v1";

export class ChatHistoryService {
  /**
   * Retrieve all saved sessions from localStorage.
   */
  static getAllSessions(): ChatSession[] {
    try {
      const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (e) {
      console.warn("Failed to read chat history from storage:", e);
      return [];
    }
  }

  /**
   * Get a specific session by its ID.
   */
  static getSessionById(id: string): ChatSession | null {
    const sessions = this.getAllSessions();
    return sessions.find((s) => s.id === id) || null;
  }

  /**
   * Save or update an existing session.
   */
  static saveSession(session: ChatSession): void {
    try {
      const sessions = this.getAllSessions();
      const existingIdx = sessions.findIndex((s) => s.id === session.id);
      if (existingIdx >= 0) {
        sessions[existingIdx] = {
          ...session,
          updatedAt: new Date().toISOString(),
        };
      } else {
        sessions.unshift(session);
      }
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.warn("Failed to persist chat session:", e);
    }
  }

  /**
   * Create a new blank chat session.
   */
  static createSession(initialTitle: string = "New Conversation"): ChatSession {
    const newSession: ChatSession = {
      id: `chat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      title: initialTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
    };
    this.saveSession(newSession);
    this.setActiveSessionId(newSession.id);
    return newSession;
  }

  /**
   * Delete a session by ID.
   */
  static deleteSession(id: string): void {
    try {
      const sessions = this.getAllSessions().filter((s) => s.id !== id);
      localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
      if (this.getActiveSessionId() === id) {
        const nextId = sessions.length > 0 ? sessions[0].id : null;
        if (nextId) {
          this.setActiveSessionId(nextId);
        } else {
          localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
        }
      }
    } catch (e) {
      console.warn("Failed to delete chat session:", e);
    }
  }

  /**
   * Delete all sessions.
   */
  static deleteAllSessions(): void {
    try {
      localStorage.removeItem(SESSIONS_STORAGE_KEY);
      localStorage.removeItem(ACTIVE_SESSION_STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear chat sessions:", e);
    }
  }

  /**
   * Rename a session.
   */
  static renameSession(id: string, newTitle: string): void {
    const cleanTitle = newTitle.trim() || "Untitled Conversation";
    const session = this.getSessionById(id);
    if (session) {
      session.title = cleanTitle;
      this.saveSession(session);
    }
  }

  /**
   * Retrieve active session ID surviving refresh.
   */
  static getActiveSessionId(): string | null {
    try {
      return localStorage.getItem(ACTIVE_SESSION_STORAGE_KEY);
    } catch {
      return null;
    }
  }

  /**
   * Persist active session ID.
   */
  static setActiveSessionId(id: string): void {
    try {
      localStorage.setItem(ACTIVE_SESSION_STORAGE_KEY, id);
    } catch (e) {
      console.warn("Failed to set active session ID:", e);
    }
  }

  /**
   * Generate an intelligent, human-readable title from the first user message.
   */
  static generateTitleFromMessage(message: string): string {
    const clean = message
      .replace(/^(can you|please|tell me|explain|what is|how to|write a|help me with|could you)\s+/i, "")
      .replace(/[\r\n]+/g, " ")
      .trim();

    if (!clean) return "New Conversation";

    // Truncate to first ~35-40 chars at word boundary
    if (clean.length <= 36) {
      return clean.charAt(0).toUpperCase() + clean.slice(1);
    }

    const truncated = clean.slice(0, 34);
    const lastSpace = truncated.lastIndexOf(" ");
    const finalCut = lastSpace > 15 ? truncated.slice(0, lastSpace) : truncated;
    return (finalCut.charAt(0).toUpperCase() + finalCut.slice(1)).trim() + "...";
  }

  /**
   * Group sessions by:
   * - Today
   * - Yesterday
   * - Previous 7 Days
   * - Older
   */
  static groupSessionsByDate(sessions: ChatSession[]): DateGroupedSessions {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
    const startOf7Days = startOfToday - 7 * 24 * 60 * 60 * 1000;

    const grouped: DateGroupedSessions = {
      today: [],
      yesterday: [],
      previous7Days: [],
      older: [],
    };

    // Sort newest updated first
    const sorted = [...sessions].sort((a, b) => {
      const tA = new Date(a.updatedAt || a.createdAt).getTime();
      const tB = new Date(b.updatedAt || b.createdAt).getTime();
      return tB - tA;
    });

    for (const session of sorted) {
      const sessionTime = new Date(session.updatedAt || session.createdAt).getTime();

      if (sessionTime >= startOfToday) {
        grouped.today.push(session);
      } else if (sessionTime >= startOfYesterday) {
        grouped.yesterday.push(session);
      } else if (sessionTime >= startOf7Days) {
        grouped.previous7Days.push(session);
      } else {
        grouped.older.push(session);
      }
    }

    return grouped;
  }

  /**
   * Search across saved conversations by title and message contents.
   */
  static searchSessions(query: string, sessions: ChatSession[]): ChatSession[] {
    const q = query.trim().toLowerCase();
    if (!q) return sessions;

    return sessions.filter((s) => {
      if (s.title.toLowerCase().includes(q)) return true;
      return s.messages.some((m) => m.content.toLowerCase().includes(q));
    });
  }
}
