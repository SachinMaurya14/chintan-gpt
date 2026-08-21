import {
  Course,
  CodingProblem,
  CodingProblemSummary,
  CompanyPrep,
  UserProfile,
  ProblemSubmission,
  QuizAttempt,
  MockInterviewSession,
  Announcement,
  PlatformAnalytics,
  CodeExecutionResult,
  SupportedLanguage,
  AuthResponse,
  TutorResponsePayload,
  VisualDiagramResponse,
  SearchGroundingResponse
} from "../types/index.js";

const BASE_URL = "/api";

function getAuthToken(): string | null {
  try {
    return localStorage.getItem("chintan_auth_token");
  } catch {
    return null;
  }
}

async function request<T>(endpoint: string, options?: RequestInit, retries: number = 2): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: "Request failed" }));
      throw new Error(errorData.error || `HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    // Retry GET or safe requests on network failure
    const isGet = !options?.method || options.method.toUpperCase() === "GET";
    if (isGet && retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 300 * (3 - retries)));
      return request<T>(endpoint, options, retries - 1);
    }
    throw err;
  }
}

// Lightweight in-memory cache store for detailed coding problem data and static collections
const problemMemoryCache = new Map<string, CodingProblem>();
const problemInFlightPromises = new Map<string, Promise<CodingProblem>>();

// Cache stores for courses, companies, playlists, and problem summaries
let coursesCache: { data: Course[]; timestamp: number } | null = null;
const courseDetailsCache = new Map<string, { data: Course; timestamp: number }>();
let companiesCache: { data: CompanyPrep[]; timestamp: number } | null = null;
const companyDetailsCache = new Map<string, { data: CompanyPrep; timestamp: number }>();
let problemSummariesCache: { data: CodingProblemSummary[]; timestamp: number } | null = null;
const playlistCache = new Map<string, { data: { playlistId: string; totalVideos: number; videos: any[] }; timestamp: number }>();

const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

export const api = {
  // Cache utilities
  getCachedProblem: (idOrSlug: string): CodingProblem | undefined => {
    return problemMemoryCache.get(idOrSlug);
  },
  hasCachedProblem: (idOrSlug: string): boolean => {
    return problemMemoryCache.has(idOrSlug);
  },
  prefetchProblem: (idOrSlug: string): void => {
    if (!idOrSlug) return;
    if (problemMemoryCache.has(idOrSlug) || problemInFlightPromises.has(idOrSlug)) {
      return;
    }
    // Background lazy fetch into memory cache without blocking UI
    api.getProblem(idOrSlug).catch((err) => {
      console.warn(`[api.prefetchProblem] Prefetch background error for ${idOrSlug}:`, err);
    });
  },
  clearProblemCache: (idOrSlug?: string): void => {
    if (idOrSlug) {
      problemMemoryCache.delete(idOrSlug);
      problemInFlightPromises.delete(idOrSlug);
    } else {
      problemMemoryCache.clear();
      problemInFlightPromises.clear();
      problemSummariesCache = null;
    }
  },
  clearAllCaches: (): void => {
    problemMemoryCache.clear();
    problemInFlightPromises.clear();
    coursesCache = null;
    courseDetailsCache.clear();
    companiesCache = null;
    companyDetailsCache.clear();
    problemSummariesCache = null;
    playlistCache.clear();
  },
  // Authentication & Session
  register: (data: { name: string; email: string; password: string; role?: "student" | "admin" }) =>
    request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  login: (data: { email: string; password: string }) =>
    request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  logout: () =>
    request<{ success: boolean; message: string }>("/auth/logout", {
      method: "POST",
    }),
  getMe: () => request<UserProfile>("/auth/me"),
  forgotPassword: (email: string) =>
    request<{ success: boolean; message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),

  // User Profile & Preferences
  getProfile: () => request<UserProfile>("/user/profile"),
  switchRole: (role: "student" | "admin") =>
    request<{ success: boolean; token: string; user: UserProfile }>("/user/switch-role", {
      method: "POST",
      body: JSON.stringify({ role }),
    }),
  updateProfile: (data: Partial<UserProfile>) =>
    request<UserProfile>("/user/update-profile", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  setTargetCompanies: (companyIds: string[]) =>
    request<{ success: boolean; user: UserProfile }>("/user/target-companies", {
      method: "POST",
      body: JSON.stringify({ companyIds }),
    }),
  enrollCourse: (courseId: string) =>
    request<{ success: boolean; user: UserProfile }>("/user/enroll-course", {
      method: "POST",
      body: JSON.stringify({ courseId }),
    }),

  // Courses & Lessons & Playlists
  getCourses: async (forceRefresh: boolean = false): Promise<Course[]> => {
    const now = Date.now();
    if (!forceRefresh && coursesCache && now - coursesCache.timestamp < CACHE_TTL_MS) {
      return coursesCache.data;
    }
    const data = await request<Course[]>("/courses");
    coursesCache = { data, timestamp: Date.now() };
    return data;
  },
  getCourse: async (id: string, forceRefresh: boolean = false): Promise<Course> => {
    const now = Date.now();
    const cached = courseDetailsCache.get(id);
    if (!forceRefresh && cached && now - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
    const data = await request<Course>(`/courses/${id}`);
    courseDetailsCache.set(id, { data, timestamp: Date.now() });
    return data;
  },
  getPlaylist: async (playlistId: string): Promise<{ playlistId: string; totalVideos: number; videos: any[] }> => {
    const now = Date.now();
    const cached = playlistCache.get(playlistId);
    if (cached && now - cached.timestamp < 10 * 60 * 1000) { // 10 minutes cache
      return cached.data;
    }
    const data = await request<{ playlistId: string; totalVideos: number; videos: any[] }>(`/playlists/${playlistId}`);
    playlistCache.set(playlistId, { data, timestamp: Date.now() });
    return data;
  },
  completeLesson: (courseId: string, lessonId: string) =>
    request<{ success: boolean; user: UserProfile }>(
      `/courses/${courseId}/lessons/${lessonId}/complete`,
      { method: "POST" }
    ),
  completeVideo: (courseId: string, videoId: string, data?: { playlistId?: string; videoTitle?: string }) =>
    request<{ success: boolean; user: UserProfile }>(
      `/courses/${courseId}/videos/${videoId}/complete`,
      { method: "POST", body: JSON.stringify(data || {}) }
    ),
  recordWatchHistory: (data: { courseId: string; videoId: string; playlistId?: string; videoTitle?: string; completed?: boolean }) =>
    request<{ success: boolean; user: UserProfile }>("/user/watch-history", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Coding Problems & Execution
  getProblems: async (options?: { full?: boolean }, forceRefresh: boolean = false): Promise<CodingProblemSummary[]> => {
    if (options?.full) {
      return request<CodingProblemSummary[]>("/problems?full=true");
    }
    const now = Date.now();
    if (!forceRefresh && problemSummariesCache && now - problemSummariesCache.timestamp < CACHE_TTL_MS) {
      return problemSummariesCache.data;
    }
    const data = await request<CodingProblemSummary[]>("/problems");
    problemSummariesCache = { data, timestamp: Date.now() };
    return data;
  },
  getProblem: async (id: string, forceRefresh: boolean = false): Promise<CodingProblem> => {
    if (!id) throw new Error("Problem ID is required");
    
    // Return from memory cache if available and not forcing refresh
    if (!forceRefresh && problemMemoryCache.has(id)) {
      return problemMemoryCache.get(id)!;
    }

    // Deduplicate in-flight network requests
    if (problemInFlightPromises.has(id)) {
      return problemInFlightPromises.get(id)!;
    }

    const fetchPromise = (async () => {
      try {
        const problemData = await request<CodingProblem>(`/problems/${id}`);
        if (problemData && problemData.id) {
          problemMemoryCache.set(problemData.id, problemData);
          if (problemData.slug) {
            problemMemoryCache.set(problemData.slug, problemData);
          }
        }
        return problemData;
      } finally {
        problemInFlightPromises.delete(id);
      }
    })();

    problemInFlightPromises.set(id, fetchPromise);
    return fetchPromise;
  },
  runCode: (problemId: string, language: SupportedLanguage, code: string, customInput?: string) =>
    request<CodeExecutionResult>("/code/run", {
      method: "POST",
      body: JSON.stringify({ problemId, language, code, customInput }),
    }),
  submitCode: (problemId: string, language: SupportedLanguage, code: string) =>
    request<{ result: CodeExecutionResult; submission: ProblemSubmission; user: UserProfile }>("/code/submit", {
      method: "POST",
      body: JSON.stringify({ problemId, language, code }),
    }),
  getSubmissions: (problemId?: string) =>
    request<ProblemSubmission[]>(problemId ? `/submissions?problemId=${problemId}` : "/submissions"),

  // Chintan AI Tutor (Upgraded with Gemini 3.7 Flash & Gemini 3.1 Flash Image)
  askTutor: (params: {
    problemTitle?: string;
    problemStatement?: string;
    topic?: string;
    difficulty?: string;
    company?: string;
    courseTitle?: string;
    moduleTitle?: string;
    lessonTitle?: string;
    userQuestion: string;
    actionType?: string;
    contextCode?: string;
    recentMistakes?: string;
    conversationHistory?: { sender: "ai" | "user"; text: string }[];
    requestVisual?: boolean;
  }) =>
    request<TutorResponsePayload>("/ai/tutor", {
      method: "POST",
      body: JSON.stringify(params),
    }),

  // Dedicated Visual Diagram (Nano Banana 2: gemini-3.1-flash-image-preview)
  visualizeDiagram: (concept: string, context?: string) =>
    request<VisualDiagramResponse>("/ai/visualize", {
      method: "POST",
      body: JSON.stringify({ concept, context }),
    }),

  // Dedicated Google Search Grounding (gemini-3.5-flash)
  searchGrounding: (query: string, context?: string) =>
    request<SearchGroundingResponse>("/ai/search-grounding", {
      method: "POST",
      body: JSON.stringify({ query, context }),
    }),

  // Dynamic Quiz Generation & Submission
  generateQuiz: (topic: string, difficulty: string, context?: string) =>
    request<{ questions: any[] }>("/quizzes/generate", {
      method: "POST",
      body: JSON.stringify({ topic, difficulty, context }),
    }),
  submitQuiz: (data: {
    topic: string;
    answers: { questionId: string; selectedOption: number }[];
    timeSpentSeconds: number;
    questions?: any[];
  }) =>
    request<{ success: boolean; attempt: QuizAttempt; user: UserProfile }>("/quizzes/submit", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getQuizHistory: () => request<QuizAttempt[]>("/quizzes/history"),

  // AI Coding Assistant
  assistCoding: (data: {
    problemTitle: string;
    problemDescription: string;
    currentCode: string;
    language: string;
    action: string;
    errorOutput?: string;
  }) =>
    request<{ feedback: string }>("/ai/code-assist", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Company Placement Prep
  getCompanies: async (forceRefresh: boolean = false): Promise<CompanyPrep[]> => {
    const now = Date.now();
    if (!forceRefresh && companiesCache && now - companiesCache.timestamp < CACHE_TTL_MS) {
      return companiesCache.data;
    }
    const data = await request<CompanyPrep[]>("/companies");
    companiesCache = { data, timestamp: Date.now() };
    return data;
  },
  getCompany: async (id: string, forceRefresh: boolean = false): Promise<CompanyPrep> => {
    const now = Date.now();
    const cached = companyDetailsCache.get(id);
    if (!forceRefresh && cached && now - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
    const data = await request<CompanyPrep>(`/companies/${id}`);
    companyDetailsCache.set(id, { data, timestamp: Date.now() });
    return data;
  },

  // AI Mock Interview
  startInterview: (data: { company: string; role: string; round: string; difficulty: string }) =>
    request<MockInterviewSession>("/interview/start", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  respondInterview: (sessionId: string, message: string) =>
    request<MockInterviewSession>(`/interview/${sessionId}/respond`, {
      method: "POST",
      body: JSON.stringify({ message }),
    }),
  getInterviews: () => request<MockInterviewSession[]>("/interviews"),
  getInterviewHistory: () => request<MockInterviewSession[]>("/interviews"),

  // Adaptive Recommendations & Analytics
  getRecommendations: () => request<any[]>("/recommendations"),
  getPlatformAnalytics: () => request<PlatformAnalytics>("/analytics/platform"),
  getAnalytics: () => request<PlatformAnalytics>("/analytics/platform"),
  getAnnouncements: () => request<Announcement[]>("/announcements"),

  // Admin Operations
  adminCreateCourse: async (data: Course) => {
    coursesCache = null;
    return request<Course>("/admin/courses", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  adminUpdateCourse: async (id: string, data: Partial<Course>) => {
    coursesCache = null;
    courseDetailsCache.delete(id);
    return request<Course>(`/admin/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  adminDeleteCourse: async (id: string) => {
    coursesCache = null;
    courseDetailsCache.delete(id);
    return request<{ success: boolean }>(`/admin/courses/${id}`, { method: "DELETE" });
  },
  adminCreateProblem: async (data: CodingProblem) => {
    problemSummariesCache = null;
    return request<CodingProblem>("/admin/problems", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
  adminUpdateProblem: async (id: string, data: Partial<CodingProblem>) => {
    problemSummariesCache = null;
    problemMemoryCache.delete(id);
    return request<CodingProblem>(`/admin/problems/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },
  adminDeleteProblem: async (id: string) => {
    problemSummariesCache = null;
    problemMemoryCache.delete(id);
    return request<{ success: boolean }>(`/admin/problems/${id}`, { method: "DELETE" });
  },
  adminGetUsers: () => request<UserProfile[]>("/admin/users"),
};
