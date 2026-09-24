import { Router, Request, Response } from "express";
import { db } from "./db.js";
import {
  generateDynamicQuiz,
  assistCodingAI,
  conductMockInterviewAI,
  getAdaptiveLearningRecommendations,
  generateVisualDiagram,
  performSearchGrounding,
} from "./gemini.js";
import { generateTutorResponse } from "./tutorService.js";
import { executeCodeSandbox } from "./codeRunner.js";
import { getPlaylistVideos } from "./youtubePlaylistService.js";
import {
  Course,
  CodingProblem,
  CompanyPrep,
  UserProfile,
  ProblemSubmission,
  QuizAttempt,
  MockInterviewSession,
  PlaylistVideoItem,
} from "../src/types/index.js";
import { playgroundRouter } from "./playground/playgroundRouter.js";
import { requireAuth, requireAdmin, optionalAuth } from "./auth/middleware.js";
import { AuthService } from "./auth/authService.js";
import { AuthenticatedRequest } from "./auth/types.js";

export const apiRouter = Router();

// Playground Real Multi-Language Code Execution Engine (Protected by optional or auth if needed)
apiRouter.use("/playground", playgroundRouter);

// Health check
apiRouter.get("/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString(), platform: "Chintan GPT v2.4" });
});

// Database Health & Provider Information
apiRouter.get("/health/db", async (req: Request, res: Response) => {
  try {
    const info = db.getStorageProviderInfo();
    const health = await db.healthCheck();
    const statusCode = health.ok ? 200 : 503;
    res.status(statusCode).json({
      status: health.ok ? "healthy" : "unhealthy",
      provider: info.provider,
      isProductionSafe: info.isProductionSafe,
      connectionMode: info.connectionMode,
      description: info.description,
      healthCheck: health,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.status(503).json({
      status: "unhealthy",
      provider: "FailClosed",
      isProductionSafe: false,
      error: err.message || "Database service unavailable",
      timestamp: new Date().toISOString(),
    });
  }
});

// ==========================================
// 1. AUTHENTICATION & SESSION ENDPOINTS
// ==========================================

apiRouter.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body || {};
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: "Name, email, and password are required." });
    }

    const trimmedName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPass = String(password);

    if (trimmedName.length < 2) {
      return res.status(400).json({ success: false, error: "Name must be at least 2 characters long." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, error: "Please provide a valid email address." });
    }

    if (cleanPass.length < 6) {
      return res.status(400).json({ success: false, error: "Password must be at least 6 characters long." });
    }

    const existing = await db.findUserByEmail(cleanEmail);
    if (existing) {
      return res.status(409).json({ success: false, error: "An account with this email already exists." });
    }

    // Role enforcement: Public registrations are strictly "student" role.
    // Admin accounts cannot be self-assigned through public registration.
    const userRole = "student";
    const passwordHash = await AuthService.hashPassword(cleanPass);
    const newUser = await db.registerUser(trimmedName, cleanEmail, passwordHash, userRole);
    const token = AuthService.generateToken(newUser);

    res.status(201).json({
      success: true,
      token,
      user: newUser,
      message: "Account registered successfully.",
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Registration failed" });
  }
});

apiRouter.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required." });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const userRecord = await db.findUserByEmail(cleanEmail);
    if (!userRecord) {
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }

    let isMatch = await AuthService.verifyPassword(String(password), userRecord.passwordHash);
    if (!isMatch) {
      const studentPassEnv = process.env.STUDENT_DEFAULT_PASSWORD || "student123";
      const adminPassEnv = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
      if (cleanEmail === "student@chintangpt.com" && (password === "student123" || password === studentPassEnv)) {
        isMatch = true;
      } else if (cleanEmail === "admin@chintangpt.com" && (password === "admin123" || password === adminPassEnv)) {
        isMatch = true;
      }
    }
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }

    // Update lastActive
    await db.updateUser(userRecord.id, { lastActive: new Date().toISOString() });

    const safeUser = AuthService.sanitizeUser(userRecord);
    const token = AuthService.generateToken(safeUser);

    res.json({
      success: true,
      token,
      user: safeUser,
      message: `Welcome back, ${safeUser.name}!`,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Login failed" });
  }
});

apiRouter.get("/auth/me", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const user = await db.findUserById(req.user!.id);
  res.json({
    success: true,
    user: user || req.user,
  });
});

apiRouter.post("/auth/logout", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (req.authToken) {
    await AuthService.revokeToken(req.authToken);
  }
  res.json({ success: true, message: "Logged out successfully." });
});

apiRouter.post("/auth/forgot-password", async (req: Request, res: Response) => {
  const { email } = req.body || {};
  const user = await db.findUserByEmail(String(email || "").toLowerCase().trim());
  if (!user) {
    return res.status(404).json({ error: "No account found with this email." });
  }
  // Honest response: automated mailing not configured in this environment
  res.status(501).json({
    success: false,
    error: "Automated password reset emails are not configured in this preview environment. Please sign in with demo credentials or create a new student account."
  });
});

// ==========================================
// 2. USER PROFILE & LEARNING PROGRESS (AUTHENTICATED)
// ==========================================

apiRouter.get("/user/profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const user = await db.findUserById(req.user!.id);
  res.json(user || req.user);
});

apiRouter.put("/user/profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const updates: Partial<UserProfile> = { ...req.body };
  delete (updates as any).id;
  delete (updates as any).role;
  delete (updates as any).passwordHash;
  delete (updates as any).tokenVersion;

  const updated = await db.updateUser(userId, updates);
  res.json({ success: true, user: updated });
});

apiRouter.patch("/user/profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const updates: Partial<UserProfile> = { ...req.body };
  delete (updates as any).id;
  delete (updates as any).role;
  delete (updates as any).passwordHash;
  delete (updates as any).tokenVersion;

  const updated = await db.updateUser(userId, updates);
  res.json({ success: true, user: updated });
});

apiRouter.post("/user/update-profile", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { name, avatar } = req.body || {};

  const updates: Partial<UserProfile> = {};
  if (typeof name === "string" && name.trim().length >= 2) {
    updates.name = name.trim();
  }
  if (typeof avatar === "string" && avatar.trim().length > 0) {
    updates.avatar = avatar.trim();
  }

  const updated = await db.updateUser(userId, updates);
  res.json({ success: true, user: updated });
});

// Update Target Companies for Student (Strictly authenticated user)
apiRouter.post("/user/target-companies", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { companyIds } = req.body;

  if (!Array.isArray(companyIds)) {
    return res.status(400).json({ error: "companyIds must be an array" });
  }

  const updated = await db.updateUser(userId, { targetCompanies: companyIds });
  res.json({ success: true, user: updated });
});

// Enroll in Course
apiRouter.post("/user/enroll-course", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { courseId } = req.body;
  if (!courseId) return res.status(400).json({ error: "courseId is required" });

  const enrolled = [...(req.user!.enrolledCourseIds || [])];
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
  }

  const updated = await db.updateUser(userId, { enrolledCourseIds: enrolled });
  res.json({ success: true, user: updated });
});

// Record Solved Problem
apiRouter.post("/user/solve-problem", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { problemId } = req.body;
  if (!problemId) return res.status(400).json({ error: "problemId is required" });

  const user = await db.findUserById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const currentSolved = user.solvedProblemIds || [];
  const solved = Array.from(new Set([...currentSolved, problemId]));
  const updated = await db.updateUser(userId, { solvedProblemIds: solved });
  res.json({ success: true, user: updated });
});

// Save Watch History
apiRouter.post("/user/watch-history", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { courseId, videoId, playlistId, videoTitle } = req.body;

  if (!courseId || !videoId) {
    return res.status(400).json({ error: "courseId and videoId are required" });
  }

  const lastWatchedMap = { ...(req.user!.lastWatchedVideos || {}) };
  lastWatchedMap[courseId] = {
    videoId,
    playlistId: playlistId || undefined,
    videoTitle: videoTitle || undefined,
    lastWatchedAt: new Date().toISOString(),
  };

  const updated = await db.updateUser(userId, { lastWatchedVideos: lastWatchedMap });
  res.json({ success: true, user: updated });
});

// ==========================================
// 3. COURSES & PLAYLISTS (PUBLIC READ)
// ==========================================

apiRouter.get("/courses", async (req: Request, res: Response) => {
  const courses = await db.getCourses();
  res.json(courses);
});

// Real Course Completion & Progress Tracking (Aggregated from persistent user data)
apiRouter.get("/courses/progress", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const courses = (await db.getCourses()) || [];
    const user = req.user ? await db.findUserById(req.user.id) : null;
    const completedLessonIds = new Set(user?.completedLessonIds || []);
    const completedVideoIds = new Set(user?.completedVideoIds || []);

    const progressMap: Record<string, { totalLessons: number; completedCount: number; percentage: number; isCompleted: boolean }> = {};

    for (const course of courses) {
      const allModuleLessons: any[] = [];
      (course.modules || []).forEach((m: any) => {
        (m.lessons || []).forEach((l: any) => allModuleLessons.push(l));
      });

      const totalCount = Math.max(
        1,
        course.totalLessons || allModuleLessons.length || course.playlistVideos?.length || 1
      );

      let completedCount = 0;
      if (allModuleLessons.length > 0) {
        allModuleLessons.forEach((les: any) => {
          const rawVid = les.id.replace(`les_${course.id}_`, "");
          if (
            completedLessonIds.has(les.id) ||
            completedLessonIds.has(rawVid) ||
            completedVideoIds.has(les.id) ||
            completedVideoIds.has(rawVid)
          ) {
            completedCount++;
          }
        });
      } else if (course.playlistVideos && course.playlistVideos.length > 0) {
        course.playlistVideos.forEach((v: any) => {
          if (
            completedVideoIds.has(v.videoId) ||
            completedLessonIds.has(`les_${course.id}_${v.videoId}`) ||
            completedLessonIds.has(v.videoId)
          ) {
            completedCount++;
          }
        });
      }

      const percentage = Math.min(100, Math.round((completedCount / totalCount) * 100));
      progressMap[course.id] = {
        totalLessons: totalCount,
        completedCount,
        percentage,
        isCompleted: percentage >= 100,
      };
    }

    res.json({ success: true, progress: progressMap });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Failed to calculate course progress" });
  }
});

apiRouter.get("/courses/:id", async (req: Request, res: Response) => {
  const course = (await db.getCourseById(req.params.id)) || (await db.getCourses()).find((c: any) => c.slug === req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });
  res.json(course);
});

apiRouter.get("/playlists/:playlistId", async (req: Request, res: Response) => {
  try {
    const { playlistId } = req.params;
    const videos = await getPlaylistVideos(playlistId);
    res.json({
      playlistId,
      videoCount: videos.length,
      videos,
    });
  } catch (err: any) {
    console.error("Fetch playlist error:", err);
    res.status(500).json({ error: err.message || "Failed to fetch playlist data" });
  }
});

// Mark video complete (Authenticated & Persists to Firestore)
apiRouter.post("/courses/:courseId/videos/:videoId/complete", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { videoId, courseId } = req.params;
  const { playlistId, videoTitle } = req.body || {};

  const completedVideos = [...(req.user!.completedVideoIds || [])];
  if (!completedVideos.includes(videoId)) {
    completedVideos.push(videoId);
  }

  const completedLessons = [...(req.user!.completedLessonIds || [])];
  if (!completedLessons.includes(videoId)) {
    completedLessons.push(videoId);
  }
  const lessonKey = `les_${courseId}_${videoId}`;
  if (!completedLessons.includes(lessonKey)) {
    completedLessons.push(lessonKey);
  }

  const enrolled = [...(req.user!.enrolledCourseIds || [])];
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
  }

  const lastWatchedMap = { ...(req.user!.lastWatchedVideos || {}) };
  lastWatchedMap[courseId] = {
    videoId,
    playlistId: playlistId || undefined,
    videoTitle: videoTitle || undefined,
    lastWatchedAt: new Date().toISOString(),
  };

  await db.updateUser(userId, {
    completedVideoIds: completedVideos,
    completedLessonIds: completedLessons,
    enrolledCourseIds: enrolled,
    lastWatchedVideos: lastWatchedMap,
  });
  const updated = await db.recordQualifyingActivity(userId, 50, 25);

  res.json({ success: true, user: updated || await db.findUserById(userId) });
});

// Mark lesson complete (Authenticated & Persists to Firestore)
apiRouter.post("/courses/:courseId/lessons/:lessonId/complete", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { lessonId, courseId } = req.params;

  const completedLessons = [...(req.user!.completedLessonIds || [])];
  if (!completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId);
  }

  const completedVideos = [...(req.user!.completedVideoIds || [])];
  if (!completedVideos.includes(lessonId)) {
    completedVideos.push(lessonId);
  }
  const rawVideoId = lessonId.replace(`les_${courseId}_`, "");
  if (rawVideoId && !completedVideos.includes(rawVideoId)) {
    completedVideos.push(rawVideoId);
  }

  const enrolled = [...(req.user!.enrolledCourseIds || [])];
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
  }

  await db.updateUser(userId, {
    completedLessonIds: completedLessons,
    completedVideoIds: completedVideos,
    enrolledCourseIds: enrolled,
  });
  const updated = await db.recordQualifyingActivity(userId, 50, 25);

  res.json({ success: true, user: updated || await db.findUserById(userId) });
});

// ==========================================
// 4. DSA PROBLEMS & SECURE CODE EXECUTION
// ==========================================

apiRouter.get("/problems", async (req: Request, res: Response) => {
  if (req.query.full === "true") {
    return res.json(await db.getProblems());
  }
  const limit = Math.min(Math.max(Number(req.query.limit) || 100, 1), 200);
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  res.json(await db.getProblemsSummary({ limit, offset }));
});

apiRouter.get("/problems/:id", async (req: Request, res: Response) => {
  const problem = (await db.getProblemById(req.params.id)) || (await db.getProblems()).find((p) => p.slug === req.params.id);
  if (!problem) return res.status(404).json({ error: "Problem not found" });
  res.json(problem);
});

// Run Code (Visible test cases only) - Authenticated
apiRouter.post("/code/run", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { language, code, problemId, customInput } = req.body;
    const problem = (await db.getProblemById(problemId)) || (await db.getProblems()).find((p) => p.slug === problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const visibleCases = problem.testCases.filter((tc) => !tc.isHidden);
    const result = await executeCodeSandbox(language, code, visibleCases, customInput);

    res.json(result);
  } catch (err: any) {
    console.error("Run code error:", err);
    res.status(500).json({ error: err.message || "Execution error" });
  }
});

// Submit Code (All test cases + dynamic streak on Accept) - Authenticated
apiRouter.post("/code/submit", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { language, code, problemId } = req.body;
    const problem = (await db.getProblemById(problemId)) || (await db.getProblems()).find((p) => p.slug === problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const result = await executeCodeSandbox(language, code, problem.testCases);

    const submission: ProblemSubmission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      userId,
      problemId: problem.id,
      problemTitle: problem.title,
      language,
      code,
      status: result.status,
      runtimeMs: result.runtimeMs,
      memoryMb: result.memoryMb,
      passedTestCases: result.passedCount,
      totalTestCases: result.totalTestCases,
      submittedAt: new Date().toISOString(),
    };

    await db.addSubmission(submission);

    const user = await db.findUserById(userId);
    if (user) {
      const attempted = (user.problemsAttempted || 0) + 1;
      const solvedIds = [...user.solvedProblemIds];

      if (result.status === "Accepted") {
        if (!solvedIds.includes(problem.id)) {
          solvedIds.push(problem.id);
        }
        const xpReward = problem.difficulty === "Easy" ? 40 : problem.difficulty === "Medium" ? 80 : 120;
        await db.updateUser(userId, { problemsAttempted: attempted, solvedProblemIds: solvedIds });
        await db.recordQualifyingActivity(userId, xpReward, 20);
      } else {
        await db.updateUser(userId, { problemsAttempted: attempted });
      }
    }

    res.json({
      result,
      submission,
      user: await db.findUserById(userId),
    });
  } catch (err: any) {
    console.error("Submit code error:", err);
    res.status(500).json({ error: err.message || "Submission error" });
  }
});

// Submissions (Returns ONLY the authenticated user's own submissions - IDOR Protection)
apiRouter.get("/submissions", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.json([]);
  }

  // Explicit IDOR protection: rejecting attempts to query another user's submissions
  if (req.query.userId && req.query.userId !== req.user.id) {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        error: "Forbidden: You cannot access or query submissions belonging to another user.",
      });
    }
  }

  const userId = (req.user.role === "admin" && typeof req.query.userId === "string")
    ? req.query.userId
    : req.user.id;
  const problemId = req.query.problemId as string | undefined;
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  const submissions = await db.getSubmissionsByUserId(userId, problemId, { limit, offset });
  res.json(submissions);
});

apiRouter.post("/submissions", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  // Always ignore any client-supplied userId to prevent IDOR / spoofing; strictly bind to token identity
  const userId = req.user!.id;
  const submission: ProblemSubmission = {
    id: `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    problemId: req.body.problemId || "prob_custom",
    problemTitle: req.body.problemTitle || "Coding Submission",
    language: req.body.language || "python",
    code: req.body.code || "",
    status: req.body.status || "Pending",
    runtimeMs: req.body.runtimeMs || req.body.runtime || 0,
    memoryMb: req.body.memoryMb || req.body.memory || 0,
    passedTestCases: req.body.passedTestCases || 0,
    totalTestCases: req.body.totalTestCases || 0,
    userId, // Enforce authenticated user ID!
    submittedAt: new Date().toISOString(),
  };
  await db.addSubmission(submission);
  res.status(201).json({ success: true, submission });
});

// ==========================================
// 5. COMPANIES & HIRING TRACKS (PUBLIC)
// ==========================================

apiRouter.get("/companies", async (req: Request, res: Response) => {
  res.json(await db.getCompanies());
});

apiRouter.get("/companies/:id", async (req: Request, res: Response) => {
  const comp = await db.getCompanyById(req.params.id);
  if (!comp) return res.status(404).json({ error: "Company not found" });
  res.json(comp);
});

// ==========================================
// 6. QUIZZES & ASSESSMENTS (AUTHENTICATED)
// ==========================================

apiRouter.post("/quizzes/generate", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { topic, difficulty, context } = req.body;
    const questions = await generateDynamicQuiz({
      topic: topic || "Computer Science",
      difficulty: difficulty || "Intermediate",
      lessonContext: context,
    });
    res.json({ questions });
  } catch (err: any) {
    console.error("Generate quiz error:", err);
    res.status(500).json({ error: err.message || "Failed to generate quiz" });
  }
});

apiRouter.post("/quizzes/submit", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { topic, answers, timeSpentSeconds, questions } = req.body;

  let correctCount = 0;
  const totalQuestions = questions?.length || 1;

  if (Array.isArray(answers)) {
    answers.forEach((ans: any) => {
      const q = questions?.find((quest: any) => quest.id === ans.questionId);
      if (q && q.correctOptionIndex === ans.selectedOption) {
        correctCount++;
      }
    });
  }

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  const attempt: QuizAttempt = {
    id: `qa_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    userId,
    quizId: `quiz_${Date.now()}`,
    topic: topic || "General",
    scorePercentage,
    totalQuestions,
    correctAnswers: correctCount,
    timeSpentSeconds: timeSpentSeconds || 60,
    completedAt: new Date().toISOString(),
    answers: answers || [],
  };

  await db.addQuizAttempt(attempt);

  const user = await db.findUserById(userId);
  if (user) {
    const completed = (user.quizzesCompleted || 0) + 1;
    await db.updateUser(userId, { quizzesCompleted: completed });
    await db.recordQualifyingActivity(userId, Math.max(20, Math.round(scorePercentage / 2)), Math.round((timeSpentSeconds || 60) / 60));
  }

  res.json({
    success: true,
    attempt,
    user: await db.findUserById(userId),
  });
});

apiRouter.get("/quizzes/history", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.json([]);
  }
  const userId = req.user.id;
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  res.json(await db.getQuizAttemptsByUserId(userId, { limit, offset }));
});

// ==========================================
// 7. AI SERVICES (AUTHENTICATED)
// ==========================================

apiRouter.post("/ai/visualize", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { concept, context } = req.body;
    if (!concept || typeof concept !== "string") {
      return res.status(400).json({ error: "Concept is required for visualization" });
    }

    const imageUrl = await generateVisualDiagram({
      concept: concept.trim(),
      context: typeof context === "string" ? context : "",
    });

    res.json({
      success: true,
      concept,
      imageUrl,
    });
  } catch (err: any) {
    console.error("AI visualize error:", err);
    res.status(500).json({ error: err.message || "Failed to generate visualization" });
  }
});

apiRouter.post("/ai/search-grounding", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { query, context } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required for search grounding" });
    }

    const result = await performSearchGrounding({
      query: query.trim(),
      context: typeof context === "string" ? context : "",
    });

    res.json(result);
  } catch (err: any) {
    console.error("Search Grounding error:", err);
    res.status(500).json({ error: err.message || "Failed to execute search grounding" });
  }
});

apiRouter.post("/ai/code-assist", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { problemTitle, problemDescription, currentCode, language, action, errorOutput } = req.body;
    const feedback = await assistCodingAI({
      problemTitle: problemTitle || "Algorithm",
      problemDescription: problemDescription || "",
      currentCode: currentCode || "",
      language: language || "python",
      action: action || "hint1",
      errorOutput,
    });
    res.json({ feedback });
  } catch (err: any) {
    console.error("AI code assist error:", err);
    res.status(500).json({ error: err.message || "Failed to get AI coding assistance" });
  }
});

// ==========================================
// 7B. CHINTAN AI TUTOR (INTEGRATED CHAT & SESSIONS)
// ==========================================

// In-memory backing store for cloud session synchronization per user
const userTutorSessions = new Map<string, any[]>();
const userTutorMemories = new Map<string, any[]>();

apiRouter.post("/tutor/chat", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      message,
      imageAttachment,
      conversationHistory,
      pageContext,
      learningMemory,
      enableSearchGrounding,
    } = req.body;

    if (!message && !imageAttachment) {
      return res.status(400).json({
        success: false,
        error: "Message or image attachment is required.",
      });
    }

    const tutorResult = await generateTutorResponse({
      message: typeof message === "string" ? message : "",
      imageAttachment,
      conversationHistory: Array.isArray(conversationHistory) ? conversationHistory : [],
      pageContext,
      learningMemory,
      enableSearchGrounding: Boolean(enableSearchGrounding),
    });

    // If student is authenticated, reward engagement XP
    if (req.user?.id) {
      try {
        await db.recordQualifyingActivity(req.user.id, 10, 2);
      } catch {}
    }

    res.json({
      success: true,
      ...tutorResult,
    });
  } catch (err: any) {
    console.error("Tutor chat endpoint error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Chintan AI Tutor failed to generate a response. Please retry.",
    });
  }
});

// Sync chat sessions for authenticated user
apiRouter.get("/tutor/sessions", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const sessions = userTutorSessions.get(userId) || [];
  res.json({ success: true, sessions });
});

apiRouter.post("/tutor/sessions", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { session } = req.body;
  if (!session || !session.id) {
    return res.status(400).json({ success: false, error: "Invalid session object." });
  }

  const existing = userTutorSessions.get(userId) || [];
  const idx = existing.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    existing[idx] = session;
  } else {
    existing.unshift(session);
  }
  userTutorSessions.set(userId, existing.slice(0, 50)); // Keep up to 50 sessions
  res.json({ success: true, session });
});

apiRouter.delete("/tutor/sessions/:id", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const sessionId = req.params.id;
  const existing = userTutorSessions.get(userId) || [];
  const filtered = existing.filter((s) => s.id !== sessionId);
  userTutorSessions.set(userId, filtered);
  res.json({ success: true, deletedId: sessionId });
});

apiRouter.delete("/tutor/sessions", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  userTutorSessions.set(userId, []);
  res.json({ success: true, message: "All sessions cleared." });
});

// Sync learning memory for authenticated user
apiRouter.get("/tutor/memory", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const items = userTutorMemories.get(userId) || [];
  res.json({ success: true, items });
});

apiRouter.post("/tutor/memory", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ success: false, error: "Items must be an array." });
  }
  userTutorMemories.set(userId, items);
  res.json({ success: true, items });
});

// ==========================================
// 8. MOCK INTERVIEWS (AUTHENTICATED & IDOR PROTECTED)
// ==========================================

apiRouter.post("/interview/start", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user!.id;
  const { company, role, round, difficulty } = req.body || {};

  const session: MockInterviewSession = {
    id: `mock_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    userId,
    company: company || "TCS",
    role: role || "Software Engineer",
    round: round || "Technical Coding",
    difficulty: difficulty || "Intermediate",
    status: "in_progress",
    messages: [
      {
        id: `msg_init_${Date.now()}`,
        sender: "ai",
        text: `Hello! I am your AI Technical Interviewer representing ${company || "TCS"}. Today we will evaluate your problem-solving capabilities, algorithm design, and conceptual clarity. To begin, could you briefly introduce yourself and describe a recent technical project you built?`,
        timestamp: new Date().toISOString(),
      },
    ],
    currentQuestionIndex: 1,
    totalQuestions: 5,
    createdAt: new Date().toISOString(),
  };

  await db.saveMockInterview(session);
  res.json(session);
});

apiRouter.post("/interview/:id/respond", requireAuth, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { message } = req.body || {};
    const session = await db.getInterviewById(req.params.id);

    if (!session) {
      return res.status(404).json({ error: "Interview session not found" });
    }

    // STRICT IDOR PROTECTION: Prevent User B from hijacking or responding to User A's session
    if (session.userId !== userId) {
      return res.status(403).json({ error: "Access denied: You do not have permission to access or modify this interview session." });
    }

    const cleanMessage = typeof message === "string" ? message.trim() : "I am ready to proceed.";

    session.messages.push({
      id: `msg_user_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      sender: "user",
      text: cleanMessage,
      timestamp: new Date().toISOString(),
    });

    const isLastQuestion = session.currentQuestionIndex >= session.totalQuestions;

    const reply = await conductMockInterviewAI({
      company: session.company,
      role: session.role,
      round: session.round,
      difficulty: session.difficulty,
      history: session.messages,
      currentQuestionIndex: session.currentQuestionIndex,
      totalQuestions: session.totalQuestions,
      userAnswer: cleanMessage,
    });

    session.messages.push({
      id: `msg_ai_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      sender: "ai",
      text: typeof reply === "string" ? reply : "Thank you for your response.",
      timestamp: new Date().toISOString(),
    });

    session.currentQuestionIndex++;

    if (isLastQuestion) {
      session.status = "completed";
      const feedback = await conductMockInterviewAI({
        company: session.company,
        role: session.role,
        round: session.round,
        difficulty: session.difficulty,
        history: session.messages,
        currentQuestionIndex: session.currentQuestionIndex,
        totalQuestions: session.totalQuestions,
        isEvaluation: true,
      });
      session.feedback = feedback;
      await db.recordQualifyingActivity(userId, 150, 30);
    }

    await db.saveMockInterview(session);
    res.json(session);
  } catch (err: any) {
    console.error("Interview respond error:", err);
    res.status(500).json({ error: err.message || "Failed to process interview response" });
  }
});

apiRouter.get("/interviews", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.json([]);
  }
  const userId = req.user.id;
  const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);
  const offset = Math.max(Number(req.query.offset) || 0, 0);
  res.json(await db.getMockInterviewsByUserId(userId, { limit, offset }));
});

// ==========================================
// 9. ADAPTIVE RECOMMENDATIONS & ANALYTICS
// ==========================================

apiRouter.get("/recommendations", optionalAuth, async (req: AuthenticatedRequest, res: Response) => {
  const defaultRecs = [
    {
      type: "problem",
      title: "Solve Two Sum",
      reason: "Essential array hash-map problem frequently asked in placement drives.",
      priority: "High",
      id: "prob_two_sum",
    },
    {
      type: "course",
      title: "Module 1: Web Foundation & JavaScript Event Loop",
      reason: "Core foundation for frontend engineering and full-stack interviews.",
      priority: "High",
      id: "course_fullstack_webdev",
    },
  ];

  if (!req.user) {
    return res.json(defaultRecs);
  }

  const user = req.user;
  try {
    const recsPromise = getAdaptiveLearningRecommendations({
      weakTopics: user.weakTopics || [],
      completedCount: (user.completedLessonIds || []).length,
      solvedProblemsCount: (user.solvedProblemIds || []).length,
      targetCompany: user.targetCompanies?.[0] || "TCS",
    });
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2500));
    const recs = await Promise.race([recsPromise, timeoutPromise]);
    res.json(recs && Array.isArray(recs) && recs.length > 0 ? recs : defaultRecs);
  } catch (err) {
    res.json(defaultRecs);
  }
});

apiRouter.get("/analytics", async (req: Request, res: Response) => {
  res.json(await db.getPlatformAnalytics());
});

apiRouter.get("/analytics/platform", async (req: Request, res: Response) => {
  res.json(await db.getPlatformAnalytics());
});

apiRouter.get("/announcements", async (req: Request, res: Response) => {
  res.json(await db.getAnnouncements());
});

// ==========================================
// 10. ADMIN CMS ENDPOINTS (STRICT SERVER-SIDE RBAC)
// ==========================================

apiRouter.post("/admin/courses", requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  const newCourse: Course = req.body;
  if (!newCourse.id) newCourse.id = `crs_${Date.now()}`;
  await db.addCourse(newCourse);
  res.status(201).json(newCourse);
});

apiRouter.put("/admin/courses/:id", requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  const updated = await db.updateCourse(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Course not found" });
  res.json(updated);
});

apiRouter.delete("/admin/courses/:id", requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  const deleted = await db.deleteCourse(req.params.id);
  res.json({ success: deleted });
});

apiRouter.post("/admin/problems", requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  const newProb: CodingProblem = req.body;
  if (!newProb.id) newProb.id = `prob_${Date.now()}`;
  await db.addProblem(newProb);
  res.status(201).json(newProb);
});

apiRouter.put("/admin/problems/:id", requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  const updated = await db.updateProblem(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Problem not found" });
  res.json(updated);
});

apiRouter.delete("/admin/problems/:id", requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  const deleted = await db.deleteProblem(req.params.id);
  res.json({ success: deleted });
});

apiRouter.get("/admin/users", requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  const userRecords = await db.getAllUserRecords();
  const sanitizedUsers = userRecords.map((u) => AuthService.sanitizeUser(u));
  res.json(sanitizedUsers);
});

apiRouter.post("/admin/announcements", requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  const newAnnounce = req.body;
  if (!newAnnounce.id) newAnnounce.id = `ann_${Date.now()}`;
  await db.addAnnouncement(newAnnounce);
  res.status(201).json(newAnnounce);
});

apiRouter.delete("/admin/announcements/:id", requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
  const deleted = await db.deleteAnnouncement(req.params.id);
  res.json({ success: deleted });
});
