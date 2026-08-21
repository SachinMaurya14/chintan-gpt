import { Router, Request, Response } from "express";
import { db } from "./db.js";
import {
  askChintanTutor,
  generateDynamicQuiz,
  assistCodingAI,
  conductMockInterviewAI,
  getAdaptiveLearningRecommendations,
  generateVisualDiagram,
  performSearchGrounding
} from "./gemini.js";
import { executeCodeSandbox } from "./codeRunner.js";
import { getPlaylistVideos } from "./youtubePlaylistService.js";
import { Course, CodingProblem, CompanyPrep, UserProfile, ProblemSubmission, QuizAttempt, MockInterviewSession, PlaylistVideoItem } from "../src/types/index.js";
import { playgroundRouter } from "./playground/playgroundRouter.js";

export const apiRouter = Router();

// Playground Real Multi-Language Code Execution Engine
apiRouter.use("/playground", playgroundRouter);

// Helper to extract user ID from Authorization header or cookie
function getAuthUserId(req: Request): string {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7).trim();
    if (token && db.users.has(token)) {
      return token;
    }
  }
  // Fallback to default student if none provided
  return "usr_student_1";
}

// Health check
apiRouter.get("/health", (req: Request, res: Response) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString(), platform: "Chintan GPT v2.4" });
});

// ==========================================
// 1. AUTHENTICATION & SESSION ENDPOINTS
// ==========================================

apiRouter.post("/auth/register", (req: Request, res: Response) => {
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

    const existing = db.findUserByEmail(cleanEmail);
    if (existing) {
      return res.status(409).json({ success: false, error: "An account with this email already exists." });
    }

    // Role enforcement: Public registrations are default "student" role unless explicit authorized admin
    const userRole = role === "admin" && cleanEmail === "admin@chintangpt.com" ? "admin" : "student";
    const newUser = db.registerUser(trimmedName, cleanEmail, cleanPass, userRole);

    res.status(201).json({
      success: true,
      token: newUser.id,
      user: newUser,
      message: "Account registered successfully."
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Registration failed" });
  }
});

apiRouter.post("/auth/login", (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Email and password are required." });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }

    const isMatch = db.verifyPassword(email, password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid email or password." });
    }

    // Update lastActive
    user.lastActive = new Date().toISOString();

    res.json({
      success: true,
      token: user.id,
      user,
      message: `Welcome back, ${user.name}!`
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message || "Login failed" });
  }
});

apiRouter.get("/auth/me", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (!user) {
    return res.status(404).json({ error: "User session not found" });
  }
  res.json(user);
});

apiRouter.post("/auth/logout", (req: Request, res: Response) => {
  res.json({ success: true, message: "Logged out successfully" });
});

apiRouter.post("/auth/forgot-password", (req: Request, res: Response) => {
  const { email } = req.body;
  const user = db.findUserByEmail(email || "");
  if (!user) {
    return res.status(404).json({ error: "No account found with this email." });
  }
  res.json({ success: true, message: "Password reset link sent to your registered email." });
});

// Switch role (Allowed only for testing or admin users)
apiRouter.post("/user/switch-role", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const { role } = req.body;
  const targetId = role === "admin" ? "usr_admin_1" : "usr_student_1";
  const user = db.users.get(targetId);
  res.json({ success: true, token: targetId, user });
});

// Update Target Companies for Student
apiRouter.post("/user/target-companies", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const { companyIds } = req.body;
  if (!Array.isArray(companyIds)) {
    return res.status(400).json({ error: "companyIds must be an array" });
  }
  const updated = db.updateUser(userId, { targetCompanies: companyIds });
  res.json({ success: true, user: updated });
});

// Enroll in course
apiRouter.post("/user/enroll-course", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const { courseId } = req.body;
  const user = db.users.get(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const enrolled = user.enrolledCourseIds || [];
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
  }
  const updated = db.updateUser(userId, { enrolledCourseIds: enrolled });
  res.json({ success: true, user: updated });
});

apiRouter.get("/user/profile", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

apiRouter.post("/user/update-profile", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  const { name, email, avatar } = req.body;
  const updated = db.updateUser(userId, {
    ...(name ? { name } : {}),
    ...(email ? { email } : {}),
    ...(avatar ? { avatar } : {})
  });
  res.json(updated);
});

// ==========================================
// 2. COURSES, PLAYLISTS & LESSONS
// ==========================================

apiRouter.get("/playlists/:playlistId", async (req: Request, res: Response) => {
  try {
    const { playlistId } = req.params;
    const videos = await getPlaylistVideos(playlistId);
    res.json({
      playlistId,
      totalVideos: videos.length,
      videos
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to fetch playlist items" });
  }
});

apiRouter.get("/courses", async (req: Request, res: Response) => {
  const courses = db.getCourses();
  res.json(courses);
});

apiRouter.get("/courses/:id", async (req: Request, res: Response) => {
  const course = db.getCourseById(req.params.id) || db.courses.find(c => c.slug === req.params.id);
  if (!course) return res.status(404).json({ error: "Course not found" });

  // Attach dynamically resolved playlist items for each playlist resource if needed
  try {
    if (course.resources && course.resources.length > 0) {
      for (const resItem of course.resources) {
        if (resItem.type === "youtube_playlist" && resItem.playlistId) {
          const vids = await getPlaylistVideos(resItem.playlistId);
          resItem.videoCount = vids.length;
          resItem.videos = vids;
          if (!course.playlistVideos || course.playlistVideos.length === 0) {
            course.playlistVideos = vids;
          }
        }
      }
    }
  } catch (err) {
    console.warn("Could not dynamically resolve playlist videos for course:", err);
  }

  res.json(course);
});

// Record user watch history and resume state
apiRouter.post("/user/watch-history", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { courseId, playlistId, videoId, videoTitle, completed } = req.body;
  if (!courseId || !videoId) {
    return res.status(400).json({ error: "courseId and videoId are required." });
  }

  const lastWatchedMap = user.lastWatchedVideos || {};
  lastWatchedMap[courseId] = {
    videoId,
    playlistId: playlistId || undefined,
    videoTitle: videoTitle || undefined,
    lastWatchedAt: new Date().toISOString()
  };

  const completedVids = user.completedVideoIds || [];
  if (completed && !completedVids.includes(videoId)) {
    completedVids.push(videoId);
  }

  const enrolled = user.enrolledCourseIds || [];
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
  }

  const updated = db.updateUser(userId, {
    lastWatchedVideos: lastWatchedMap,
    completedVideoIds: completedVids,
    enrolledCourseIds: enrolled
  });

  res.json({ success: true, user: updated });
});

// Mark video complete - Triggers dynamic streak!
apiRouter.post("/courses/:courseId/videos/:videoId/complete", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { videoId, courseId } = req.params;
  const { playlistId, videoTitle } = req.body || {};

  const completedVideos = user.completedVideoIds || [];
  if (!completedVideos.includes(videoId)) {
    completedVideos.push(videoId);
  }

  // Also maintain completedLessonIds for backwards compatibility
  const completedLessons = user.completedLessonIds || [];
  if (!completedLessons.includes(videoId)) {
    completedLessons.push(videoId);
  }

  const enrolled = user.enrolledCourseIds || [];
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
  }

  const lastWatchedMap = user.lastWatchedVideos || {};
  lastWatchedMap[courseId] = {
    videoId,
    playlistId: playlistId || undefined,
    videoTitle: videoTitle || undefined,
    lastWatchedAt: new Date().toISOString()
  };

  // Update user state and record qualifying activity for streak & XP
  db.updateUser(userId, {
    completedVideoIds: completedVideos,
    completedLessonIds: completedLessons,
    enrolledCourseIds: enrolled,
    lastWatchedVideos: lastWatchedMap
  });
  const updated = db.recordQualifyingActivity(userId, 50, 25);

  res.json({ success: true, user: updated });
});

// Mark lesson complete - Triggers dynamic streak!
apiRouter.post("/courses/:courseId/lessons/:lessonId/complete", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const { lessonId, courseId } = req.params;
  const completed = user.completedLessonIds || [];
  if (!completed.includes(lessonId)) {
    completed.push(lessonId);
  }

  const completedVideos = user.completedVideoIds || [];
  if (!completedVideos.includes(lessonId)) {
    completedVideos.push(lessonId);
  }

  const enrolled = user.enrolledCourseIds || [];
  if (!enrolled.includes(courseId)) {
    enrolled.push(courseId);
  }

  // Update lesson completed list and trigger dynamic streak
  db.updateUser(userId, { completedLessonIds: completed, completedVideoIds: completedVideos, enrolledCourseIds: enrolled });
  const updated = db.recordQualifyingActivity(userId, 50, 25);

  res.json({ success: true, user: updated });
});

// ==========================================
// 3. DSA PROBLEMS & EXECUTION
// ==========================================

apiRouter.get("/problems", (req: Request, res: Response) => {
  if (req.query.full === "true") {
    return res.json(db.getProblems());
  }
  res.json(db.getProblemsSummary());
});

apiRouter.get("/problems/:id", (req: Request, res: Response) => {
  const problem = db.getProblemById(req.params.id) || db.problems.find(p => p.slug === req.params.id);
  if (!problem) return res.status(404).json({ error: "Problem not found" });
  res.json(problem);
});

// Run Code (Visible test cases only)
apiRouter.post("/code/run", async (req: Request, res: Response) => {
  try {
    const { language, code, problemId, customInput } = req.body;
    const problem = db.getProblemById(problemId) || db.problems.find(p => p.slug === problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const visibleCases = problem.testCases.filter(tc => !tc.isHidden);
    const result = await executeCodeSandbox(language, code, visibleCases, customInput);

    res.json(result);
  } catch (err: any) {
    console.error("Run code error:", err);
    res.status(500).json({ error: err.message || "Execution error" });
  }
});

// Submit Code (All test cases + dynamic streak on Accept)
apiRouter.post("/code/submit", async (req: Request, res: Response) => {
  try {
    const userId = getAuthUserId(req);
    const { language, code, problemId } = req.body;
    const problem = db.getProblemById(problemId) || db.problems.find(p => p.slug === problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const result = await executeCodeSandbox(language, code, problem.testCases);

    const submission: ProblemSubmission = {
      id: `sub_${Date.now()}`,
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
      submittedAt: new Date().toISOString()
    };

    db.addSubmission(submission);

    const user = db.users.get(userId);
    if (user) {
      user.problemsAttempted = (user.problemsAttempted || 0) + 1;
      if (result.status === "Accepted") {
        if (!user.solvedProblemIds.includes(problem.id)) {
          user.solvedProblemIds.push(problem.id);
        }
        // Qualifying activity triggers dynamic streak!
        const xpReward = problem.difficulty === "Easy" ? 40 : problem.difficulty === "Medium" ? 80 : 120;
        db.recordQualifyingActivity(userId, xpReward, 20);
      }
    }

    res.json({
      result,
      submission,
      user: db.users.get(userId)
    });
  } catch (err: any) {
    console.error("Submit code error:", err);
    res.status(500).json({ error: err.message || "Submission error" });
  }
});

apiRouter.get("/submissions", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const problemId = req.query.problemId as string | undefined;
  const submissions = db.getSubmissionsByUserId(userId, problemId);
  res.json(submissions);
});

// ==========================================
// 4. COMPANIES & HIRING TRACKS
// ==========================================

apiRouter.get("/companies", (req: Request, res: Response) => {
  res.json(db.getCompanies());
});

apiRouter.get("/companies/:id", (req: Request, res: Response) => {
  const comp = db.getCompanyById(req.params.id);
  if (!comp) return res.status(404).json({ error: "Company not found" });
  res.json(comp);
});

// ==========================================
// 5. QUIZZES & DYNAMIC ASSESSMENTS
// ==========================================

apiRouter.post("/quizzes/generate", async (req: Request, res: Response) => {
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

apiRouter.post("/quizzes/submit", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
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
    id: `qa_${Date.now()}`,
    userId,
    quizId: `quiz_${Date.now()}`,
    topic: topic || "General",
    scorePercentage,
    totalQuestions,
    correctAnswers: correctCount,
    timeSpentSeconds: timeSpentSeconds || 60,
    completedAt: new Date().toISOString(),
    answers: answers || []
  };

  db.addQuizAttempt(attempt);

  const user = db.users.get(userId);
  if (user) {
    user.quizzesCompleted = (user.quizzesCompleted || 0) + 1;
    // Qualifying activity records streak
    db.recordQualifyingActivity(userId, Math.max(20, Math.round(scorePercentage / 2)), Math.round((timeSpentSeconds || 60) / 60));
  }

  res.json({
    success: true,
    attempt,
    user: db.users.get(userId)
  });
});

apiRouter.get("/quizzes/history", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  res.json(db.getQuizAttemptsByUserId(userId));
});

// ==========================================
// 6. CHINTAN AI TUTOR & CODING ASSISTANT
// ==========================================

apiRouter.post("/ai/tutor", async (req: Request, res: Response) => {
  try {
    const {
      problemTitle,
      problemStatement,
      topic,
      difficulty,
      company,
      courseTitle,
      moduleTitle,
      lessonTitle,
      userQuestion,
      actionType,
      contextCode,
      recentMistakes,
      conversationHistory,
      requestVisual
    } = req.body || {};

    const cleanQuestion = typeof userQuestion === "string" && userQuestion.trim()
      ? userQuestion.trim()
      : (actionType === "Explain Concept" ? `Explain the core intuition and approach for ${problemTitle || lessonTitle || topic || "this topic"}` : "Help me understand this concept and approach step by step.");

    const result = await askChintanTutor({
      problemTitle: problemTitle ? String(problemTitle) : undefined,
      problemStatement: problemStatement ? String(problemStatement) : undefined,
      topic: topic ? String(topic) : (problemTitle ? "Data Structures & Algorithms" : undefined),
      difficulty: difficulty ? String(difficulty) : undefined,
      company: company ? String(company) : undefined,
      courseTitle: courseTitle ? String(courseTitle) : undefined,
      moduleTitle: moduleTitle ? String(moduleTitle) : undefined,
      lessonTitle: lessonTitle ? String(lessonTitle) : (problemTitle ? String(problemTitle) : undefined),
      userQuestion: cleanQuestion,
      actionType: actionType ? String(actionType) : "General Doubt",
      contextCode: typeof contextCode === "string" ? contextCode : undefined,
      recentMistakes: typeof recentMistakes === "string" ? recentMistakes : undefined,
      conversationHistory: Array.isArray(conversationHistory) ? conversationHistory : [],
      requestVisual: Boolean(requestVisual)
    });

    res.json({
      answer: result.answer || "I have analyzed this concept. Let me know which specific area you would like to explore deeper!",
      imageUrl: result.imageUrl,
      visualTopic: result.visualTopic,
      isGrounded: Boolean(result.isGrounded),
      sources: Array.isArray(result.sources) ? result.sources : []
    });
  } catch (err: any) {
    console.error("AI tutor error:", err);
    res.status(500).json({ error: err?.message || "Failed to contact AI Tutor" });
  }
});

// Dedicated Diagram Generation & Technical Schematic Endpoint (Gemini 3.1 Flash Image Preview)
apiRouter.post("/ai/visualize", async (req: Request, res: Response) => {
  try {
    const { concept, context } = req.body;
    if (!concept || typeof concept !== "string") {
      return res.status(400).json({ error: "Concept is required for visualization" });
    }

    const imageUrl = await generateVisualDiagram({
      concept: concept.trim(),
      context: typeof context === "string" ? context : ""
    });

    res.json({
      success: true,
      concept,
      imageUrl
    });
  } catch (err: any) {
    console.error("AI visualize error:", err);
    res.status(500).json({ error: err.message || "Failed to generate visualization" });
  }
});

// Dedicated Google Search Grounding Endpoint (Gemini 3.5 Flash)
apiRouter.post("/ai/search-grounding", async (req: Request, res: Response) => {
  try {
    const { query, context } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query is required for search grounding" });
    }

    const result = await performSearchGrounding({
      query: query.trim(),
      context: typeof context === "string" ? context : ""
    });

    res.json(result);
  } catch (err: any) {
    console.error("Search Grounding error:", err);
    res.status(500).json({ error: err.message || "Failed to execute search grounding" });
  }
});

apiRouter.post("/ai/code-assist", async (req: Request, res: Response) => {
  try {
    const { problemTitle, problemDescription, currentCode, language, action, errorOutput } = req.body;
    const feedback = await assistCodingAI({
      problemTitle: problemTitle || "Algorithm",
      problemDescription: problemDescription || "",
      currentCode: currentCode || "",
      language: language || "python",
      action: action || "hint1",
      errorOutput
    });
    res.json({ feedback });
  } catch (err: any) {
    console.error("AI code assist error:", err);
    res.status(500).json({ error: err.message || "Failed to get AI coding assistance" });
  }
});

// ==========================================
// 7. MOCK INTERVIEWS
// ==========================================

apiRouter.post("/interview/start", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const { company, role, round, difficulty } = req.body;

  const session: MockInterviewSession = {
    id: `mock_${Date.now()}`,
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
        timestamp: new Date().toISOString()
      }
    ],
    currentQuestionIndex: 1,
    totalQuestions: 5,
    createdAt: new Date().toISOString()
  };

  db.saveMockInterview(session);
  res.json(session);
});

apiRouter.post("/interview/:id/respond", async (req: Request, res: Response) => {
  try {
    const userId = getAuthUserId(req);
    const { message } = req.body || {};
    const session = db.mockInterviews.find(m => m.id === req.params.id);

    if (!session) return res.status(404).json({ error: "Interview session not found" });

    const cleanMessage = typeof message === "string" ? message.trim() : "I am ready to proceed.";

    // Append user message
    session.messages.push({
      id: `msg_user_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      sender: "user",
      text: cleanMessage,
      timestamp: new Date().toISOString()
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
      userAnswer: cleanMessage
    });

    // Append AI response
    session.messages.push({
      id: `msg_ai_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      sender: "ai",
      text: typeof reply === "string" ? reply : "Thank you for your response.",
      timestamp: new Date().toISOString()
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
        isEvaluation: true
      });
      session.feedback = feedback;
      // Record qualifying activity
      db.recordQualifyingActivity(userId, 150, 30);
    }

    db.saveMockInterview(session);
    res.json(session);
  } catch (err: any) {
    console.error("Interview respond error:", err);
    res.status(500).json({ error: err.message || "Failed to process interview response" });
  }
});

apiRouter.get("/interviews", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  res.json(db.getMockInterviewsByUserId(userId));
});

// ==========================================
// 8. ADAPTIVE RECOMMENDATIONS & ANALYTICS
// ==========================================

apiRouter.get("/recommendations", async (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    const recs = await getAdaptiveLearningRecommendations({
      weakTopics: user.weakTopics || [],
      completedCount: (user.completedLessonIds || []).length,
      solvedProblemsCount: (user.solvedProblemIds || []).length,
      targetCompany: user.targetCompanies?.[0] || "TCS"
    });
    res.json(recs);
  } catch (err) {
    res.json([
      {
        type: "problem",
        title: "Solve Two Sum",
        reason: "Essential array hash-map problem frequently asked in placement drives.",
        priority: "High",
        id: "prob_two_sum"
      },
      {
        type: "course",
        title: "Module 1: Web Foundation & JavaScript Event Loop",
        reason: "Core foundation for frontend engineering and full-stack interviews.",
        priority: "High",
        id: "course_fullstack_webdev"
      }
    ]);
  }
});

apiRouter.get("/analytics/platform", (req: Request, res: Response) => {
  res.json(db.getPlatformAnalytics());
});

apiRouter.get("/announcements", (req: Request, res: Response) => {
  res.json(db.getAnnouncements());
});

// ==========================================
// 9. ADMIN CMS ENDPOINTS (Protected)
// ==========================================

apiRouter.post("/admin/courses", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (user?.role !== "admin") return res.status(403).json({ error: "Unauthorized. Admin role required." });

  const newCourse: Course = req.body;
  if (!newCourse.id) newCourse.id = `crs_${Date.now()}`;
  db.addCourse(newCourse);
  res.status(201).json(newCourse);
});

apiRouter.put("/admin/courses/:id", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (user?.role !== "admin") return res.status(403).json({ error: "Unauthorized. Admin role required." });

  const updated = db.updateCourse(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Course not found" });
  res.json(updated);
});

apiRouter.delete("/admin/courses/:id", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (user?.role !== "admin") return res.status(403).json({ error: "Unauthorized. Admin role required." });

  const deleted = db.deleteCourse(req.params.id);
  res.json({ success: deleted });
});

apiRouter.post("/admin/problems", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (user?.role !== "admin") return res.status(403).json({ error: "Unauthorized. Admin role required." });

  const newProb: CodingProblem = req.body;
  if (!newProb.id) newProb.id = `prob_${Date.now()}`;
  db.addProblem(newProb);
  res.status(201).json(newProb);
});

apiRouter.put("/admin/problems/:id", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (user?.role !== "admin") return res.status(403).json({ error: "Unauthorized. Admin role required." });

  const updated = db.updateProblem(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Problem not found" });
  res.json(updated);
});

apiRouter.delete("/admin/problems/:id", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (user?.role !== "admin") return res.status(403).json({ error: "Unauthorized. Admin role required." });

  const deleted = db.deleteProblem(req.params.id);
  res.json({ success: deleted });
});

apiRouter.get("/admin/users", (req: Request, res: Response) => {
  const userId = getAuthUserId(req);
  const user = db.users.get(userId);
  if (user?.role !== "admin") return res.status(403).json({ error: "Unauthorized. Admin role required." });

  res.json(Array.from(db.users.values()));
});
