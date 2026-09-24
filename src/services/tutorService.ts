import { TutorChatRequest, TutorChatResponse } from "../types/tutor.js";

function getApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    const metaEnv = typeof import.meta !== "undefined" ? (import.meta as any).env : undefined;
    const rawUrl = (metaEnv?.VITE_API_BASE_URL || "").trim();

    // If an external URL is provided, only use it if the browser is actually running on that same origin
    // or if it's explicitly a relative path like "/api"
    if (rawUrl && (rawUrl.startsWith("http://") || rawUrl.startsWith("https://"))) {
      try {
        const parsed = new URL(rawUrl);
        // If current window is on a different domain than the rawUrl (e.g. AI Studio preview vs old Vercel URL),
        // fallback to relative "/api" to communicate with the local host container.
        if (parsed.hostname !== window.location.hostname && !window.location.hostname.includes(parsed.hostname)) {
          return "/api";
        }
        const clean = rawUrl.replace(/\/+$/, "");
        return clean.endsWith("/api") ? clean : `${clean}/api`;
      } catch {
        return "/api";
      }
    }
    return "/api";
  }

  return "/api";
}

function getAuthToken(): string | null {
  try {
    return localStorage.getItem("chintan_auth_token");
  } catch {
    return null;
  }
}

export class TutorService {
  /**
   * Send user message to Chintan AI Tutor backend endpoint.
   */
  static async sendChatMessage(params: TutorChatRequest): Promise<TutorChatResponse> {
    const baseUrl = getApiBaseUrl();
    const token = getAuthToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout for multimodal / deep reasoning

    try {
      const response = await fetch(`${baseUrl}/tutor/chat`, {
        method: "POST",
        headers,
        body: JSON.stringify(params),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      return {
        success: true,
        answer: data.answer || "I have processed your query.",
        intent: data.intent || "learning",
        sources: data.sources || [],
        isGrounded: Boolean(data.isGrounded),
        visualConcept: data.visualConcept,
        visualImageUrl: data.visualImageUrl,
        suggestedFollowUps: data.suggestedFollowUps || [],
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (err.name === "AbortError") {
        throw new Error("Tutor request timed out. Please check your connection and try again.");
      }
      if (err?.name === "TypeError" || err?.message?.includes("Failed to fetch") || err?.message?.includes("network")) {
        throw new Error("Unable to reach the AI service. Please try again.");
      }
      throw err;
    }
  }

  /**
   * Request an educational visual schematic or diagram from backend.
   */
  static async requestVisualization(concept: string, context?: string): Promise<string> {
    const baseUrl = getApiBaseUrl();
    const token = getAuthToken();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}/ai/visualize`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        concept: concept.trim(),
        context: context || "",
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.imageUrl) {
      throw new Error(data.error || "Failed to generate visual schematic");
    }

    return data.imageUrl;
  }
}
