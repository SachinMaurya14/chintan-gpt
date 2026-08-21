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
  Quiz
} from "../src/types/index.js";
import { SEED_PROBLEMS } from "./data/problems.js";
import { SEED_COMPANIES } from "./data/companies.js";
import { SEED_COURSES } from "./data/courses.js";

// Helper to format date string YYYY-MM-DD
function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

class InMemoryDatabase {
  users: Map<string, UserProfile> = new Map();
  credentials: Map<string, string> = new Map(); // email -> password
  courses: Course[] = [];
  problems: CodingProblem[] = [];
  companies: CompanyPrep[] = [];
  submissions: ProblemSubmission[] = [];
  quizAttempts: QuizAttempt[] = [];
  mockInterviews: MockInterviewSession[] = [];
  announcements: Announcement[] = [];

  constructor() {
    this.seedInitialData();
  }

  private seedInitialData() {
    // 1. Initial Courses, Problems, Companies
    this.courses = [...SEED_COURSES];
    this.problems = [...SEED_PROBLEMS];
    this.companies = [...SEED_COMPANIES];

    // 2. Announcements
    this.announcements = [
      {
        id: "ann_1",
        title: "TCS Digital & Prime Comprehensive Placement Drive 2026",
        content: "New deep syllabus tracks for TCS Numerical, Verbal, Reasoning, and Coding are now live with sample testcases.",
        tag: "Placement Drive",
        date: "2026-08-18",
        active: true
      },
      {
        id: "ann_2",
        title: "100+ LeetCode DSA Algorithmic Problem Bank Live",
        content: "Practice 100+ categorized algorithmic challenges with Python, C++, Java, and JavaScript support.",
        tag: "Feature",
        date: "2026-08-17",
        active: true
      }
    ];

    // 3. Admin Account (Pre-configured for admin access)
    const adminUser: UserProfile = {
      id: "usr_admin_1",
      name: "Admin",
      email: "admin@chintangpt.com",
      role: "admin",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop",
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      streak: 1,
      longestStreak: 1,
      lastQualifyingDate: getTodayDateString(),
      xp: 500,
      level: 2,
      solvedProblemIds: ["prob_two_sum", "prob_valid_anagram"],
      problemsAttempted: 2,
      completedLessonIds: ["les_web_1_1"],
      enrolledCourseIds: ["course_fullstack_webdev"],
      targetCompanies: ["comp_google", "comp_tcs"],
      quizzesCompleted: 1,
      learningMinutes: 60,
      weakTopics: [],
      streakHistory: [{ date: getTodayDateString(), count: 1 }]
    };

    // 4. Default Demo Student Account
    const demoStudent: UserProfile = {
      id: "usr_student_1",
      name: "Student",
      email: "student@chintangpt.com",
      role: "student",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&fit=crop",
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      streak: 0,
      longestStreak: 0,
      lastQualifyingDate: null,
      xp: 0,
      level: 1,
      solvedProblemIds: [],
      problemsAttempted: 0,
      completedLessonIds: [],
      enrolledCourseIds: [],
      targetCompanies: [],
      quizzesCompleted: 0,
      learningMinutes: 0,
      weakTopics: [],
      streakHistory: []
    };

    this.users.set(adminUser.id, adminUser);
    this.credentials.set(adminUser.email.toLowerCase(), "admin123");

    this.users.set(demoStudent.id, demoStudent);
    this.credentials.set(demoStudent.email.toLowerCase(), "student123");
  }

  // --- Auth & User Management ---
  public findUserByEmail(email: string): UserProfile | undefined {
    const normEmail = email.toLowerCase().trim();
    for (const user of this.users.values()) {
      if (user.email.toLowerCase() === normEmail) {
        return user;
      }
    }
    return undefined;
  }

  public findUserById(id: string): UserProfile | undefined {
    return this.users.get(id);
  }

  public verifyPassword(email: string, pass: string): boolean {
    const saved = this.credentials.get(email.toLowerCase().trim());
    return saved === pass;
  }

  public registerUser(name: string, email: string, pass: string, role: "student" | "admin" = "student"): UserProfile {
    const id = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const newUser: UserProfile = {
      id,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      createdAt: now,
      lastActive: now,
      streak: 0,
      longestStreak: 0,
      lastQualifyingDate: null,
      xp: 0,
      level: 1,
      solvedProblemIds: [],
      problemsAttempted: 0,
      completedLessonIds: [],
      enrolledCourseIds: [],
      targetCompanies: [],
      quizzesCompleted: 0,
      learningMinutes: 0,
      weakTopics: [],
      streakHistory: []
    };

    this.users.set(id, newUser);
    this.credentials.set(email.toLowerCase().trim(), pass);
    return newUser;
  }

  public updateUser(id: string, updates: Partial<UserProfile>): UserProfile | null {
    const user = this.users.get(id);
    if (!user) return null;
    const updated = { ...user, ...updates, lastActive: new Date().toISOString() };
    this.users.set(id, updated);
    return updated;
  }

  // --- Dynamic Streak Engine ---
  public recordQualifyingActivity(userId: string, xpGained: number, minutesSpent: number = 10): UserProfile | null {
    const user = this.users.get(userId);
    if (!user) return null;

    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    let newStreak = user.streak;
    const lastDate = user.lastQualifyingDate;

    if (lastDate === today) {
      // Already recorded qualifying activity today, streak stays the same
    } else if (lastDate === yesterday) {
      // Activity on consecutive day: increment streak
      newStreak = (user.streak || 0) + 1;
    } else {
      // First activity ever or broke streak: starts at 1
      newStreak = 1;
    }

    const newLongest = Math.max(user.longestStreak || 0, newStreak);
    const newXp = (user.xp || 0) + xpGained;
    const newLevel = Math.floor(newXp / 500) + 1;
    const newMinutes = (user.learningMinutes || 0) + minutesSpent;

    // Update streak history
    const history = [...(user.streakHistory || [])];
    const todayIndex = history.findIndex(h => h.date === today);
    if (todayIndex >= 0) {
      history[todayIndex].count += 1;
    } else {
      history.push({ date: today, count: 1 });
      if (history.length > 30) history.shift();
    }

    const updated: UserProfile = {
      ...user,
      streak: newStreak,
      longestStreak: newLongest,
      lastQualifyingDate: today,
      xp: newXp,
      level: newLevel,
      learningMinutes: newMinutes,
      streakHistory: history,
      lastActive: new Date().toISOString()
    };

    this.users.set(userId, updated);
    return updated;
  }

  // --- Courses ---
  public getCourses(): Course[] {
    return this.courses;
  }

  public getCourseById(id: string): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  public addCourse(course: Course): Course {
    this.courses.push(course);
    return course;
  }

  public updateCourse(id: string, updates: Partial<Course>): Course | null {
    const idx = this.courses.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.courses[idx] = { ...this.courses[idx], ...updates };
    return this.courses[idx];
  }

  public deleteCourse(id: string): boolean {
    const idx = this.courses.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this.courses.splice(idx, 1);
    return true;
  }

  // --- Problems ---
  public getProblems(): CodingProblem[] {
    return this.problems;
  }

  public getProblemsSummary(): CodingProblemSummary[] {
    return this.problems.map(p => ({
      id: p.id,
      title: p.title,
      slug: p.slug,
      difficulty: p.difficulty,
      topics: p.topics,
      companyTags: p.companyTags,
      acceptanceRate: p.acceptanceRate,
      category: (p as any).category || (p.topics && p.topics[0]) || "Algorithms",
    }));
  }

  public getProblemById(id: string): CodingProblem | undefined {
    return this.problems.find(p => p.id === id);
  }

  public addProblem(problem: CodingProblem): CodingProblem {
    this.problems.push(problem);
    return problem;
  }

  public updateProblem(id: string, updates: Partial<CodingProblem>): CodingProblem | null {
    const idx = this.problems.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.problems[idx] = { ...this.problems[idx], ...updates };
    return this.problems[idx];
  }

  public deleteProblem(id: string): boolean {
    const idx = this.problems.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.problems.splice(idx, 1);
    return true;
  }

  // --- Companies ---
  public getCompanies(): CompanyPrep[] {
    return this.companies;
  }

  public getCompanyById(id: string): CompanyPrep | undefined {
    return this.companies.find(c => c.id === id);
  }

  public addCompany(comp: CompanyPrep): CompanyPrep {
    this.companies.push(comp);
    return comp;
  }

  public updateCompany(id: string, updates: Partial<CompanyPrep>): CompanyPrep | null {
    const idx = this.companies.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.companies[idx] = { ...this.companies[idx], ...updates };
    return this.companies[idx];
  }

  public deleteCompany(id: string): boolean {
    const idx = this.companies.findIndex(c => c.id === id);
    if (idx === -1) return false;
    this.companies.splice(idx, 1);
    return true;
  }

  // --- Submissions ---
  public addSubmission(sub: ProblemSubmission): ProblemSubmission {
    this.submissions.unshift(sub);
    return sub;
  }

  public getSubmissionsByUserId(userId: string, problemId?: string): ProblemSubmission[] {
    return this.submissions.filter(s => s.userId === userId && (!problemId || s.problemId === problemId));
  }

  // --- Quiz Attempts ---
  public addQuizAttempt(attempt: QuizAttempt): QuizAttempt {
    this.quizAttempts.unshift(attempt);
    return attempt;
  }

  public getQuizAttemptsByUserId(userId: string): QuizAttempt[] {
    return this.quizAttempts.filter(q => q.userId === userId);
  }

  // --- Mock Interviews ---
  public saveMockInterview(interview: MockInterviewSession): MockInterviewSession {
    const idx = this.mockInterviews.findIndex(m => m.id === interview.id);
    if (idx >= 0) {
      this.mockInterviews[idx] = interview;
    } else {
      this.mockInterviews.unshift(interview);
    }
    return interview;
  }

  public getMockInterviewsByUserId(userId: string): MockInterviewSession[] {
    return this.mockInterviews.filter(m => m.userId === userId);
  }

  // --- Announcements ---
  public getAnnouncements(): Announcement[] {
    return this.announcements.filter(a => a.active);
  }

  // --- Platform Analytics ---
  public getPlatformAnalytics(): PlatformAnalytics {
    const totalSubmissions = this.submissions.length;
    const acceptedSubmissions = this.submissions.filter(s => s.status === "Accepted").length;
    const acceptanceRateGlobal = totalSubmissions > 0 ? +((acceptedSubmissions / totalSubmissions) * 100).toFixed(1) : 0;

    // Calculate real topic distribution from problems and submissions
    const topicProblemMap = new Map<string, CodingProblem[]>();
    for (const p of this.problems) {
      const topic = p.category || (p.topics && p.topics[0]) || "Algorithms";
      if (!topicProblemMap.has(topic)) topicProblemMap.set(topic, []);
      topicProblemMap.get(topic)!.push(p);
    }

    const topicDistribution = Array.from(topicProblemMap.entries()).map(([topic, probs]) => {
      const probIds = new Set(probs.map(p => p.id));
      const topicSubs = this.submissions.filter(s => probIds.has(s.problemId));
      const topicAccepted = topicSubs.filter(s => s.status === "Accepted").length;
      const avgPassRate = topicSubs.length > 0 ? Math.round((topicAccepted / topicSubs.length) * 100) : 0;
      return {
        topic,
        totalProblems: probs.length,
        avgPassRate
      };
    });

    // Calculate real company practice counts
    const companyCountMap = new Map<string, number>();
    for (const sub of this.submissions) {
      const p = this.problems.find(prob => prob.id === sub.problemId);
      if (p?.companyTags) {
        for (const c of p.companyTags) {
          const compName = c.charAt(0).toUpperCase() + c.slice(1);
          companyCountMap.set(compName, (companyCountMap.get(compName) || 0) + 1);
        }
      }
    }
    for (const mi of this.mockInterviews) {
      if (mi.company) {
        const compName = mi.company.charAt(0).toUpperCase() + mi.company.slice(1);
        companyCountMap.set(compName, (companyCountMap.get(compName) || 0) + 1);
      }
    }

    // Default company list if empty
    const defaultCompanies = ["Google", "Amazon", "Microsoft", "TCS", "Infosys"];
    const topCompaniesPracticed = defaultCompanies.map(name => ({
      name,
      count: companyCountMap.get(name) || 0
    })).sort((a, b) => b.count - a.count);

    return {
      totalStudents: this.users.size,
      totalUsers: this.users.size,
      activeToday: Math.max(1, Array.from(this.users.values()).filter(u => u.lastActive?.startsWith(getTodayDateString())).length || 1),
      totalSubmissions,
      totalProblemsSolved: acceptedSubmissions,
      totalQuizzesTaken: this.quizAttempts.length,
      totalCoursesCompleted: this.courses.length,
      totalInterviewsCompleted: this.mockInterviews.filter(m => m.status === "completed").length,
      totalAiInterviewsConducted: this.mockInterviews.length,
      acceptanceRateGlobal,
      topCompaniesPracticed,
      topicDistribution: topicDistribution.length > 0 ? topicDistribution : [
        { topic: "Arrays & Hashing", totalProblems: 10, avgPassRate: 0 },
        { topic: "Two Pointers", totalProblems: 8, avgPassRate: 0 },
        { topic: "Sliding Window", totalProblems: 7, avgPassRate: 0 },
        { topic: "Binary Search", totalProblems: 6, avgPassRate: 0 },
        { topic: "Trees & BST", totalProblems: 10, avgPassRate: 0 },
        { topic: "Graphs", totalProblems: 6, avgPassRate: 0 },
        { topic: "Dynamic Programming", totalProblems: 12, avgPassRate: 0 }
      ]
    };
  }
}

export const db = new InMemoryDatabase();
