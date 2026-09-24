import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import {
  IDatabaseAdapter,
  StorageProviderInfo,
  DatabaseConfigurationError,
  PaginationOptions,
  RevokedTokenRecord,
} from "./types.js";
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
} from "../../src/types/index.js";
import { UserRecord } from "../auth/types.js";
import { SEED_PROBLEMS } from "../data/problems.js";
import { SEED_COMPANIES } from "../data/companies.js";
import { SEED_COURSES } from "../data/courses.js";

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

interface DatabaseSchema {
  version: number;
  users: Record<string, UserRecord>;
  courses: Course[];
  problems: CodingProblem[];
  companies: CompanyPrep[];
  submissions: ProblemSubmission[];
  quizAttempts: QuizAttempt[];
  mockInterviews: MockInterviewSession[];
  announcements: Announcement[];
  revokedTokens?: RevokedTokenRecord[];
}

export class LocalJsonAdapter implements IDatabaseAdapter {
  readonly providerName = "LocalJsonAdapter";
  private static instance: LocalJsonAdapter | null = null;
  private dbFilePath: string;
  private usersMap: Map<string, UserRecord> = new Map();

  public static getInstance(customPath?: string): LocalJsonAdapter {
    if (!LocalJsonAdapter.instance) {
      LocalJsonAdapter.instance = new LocalJsonAdapter(customPath);
    }
    return LocalJsonAdapter.instance;
  }
  private coursesList: Course[] = [];
  private problemsList: CodingProblem[] = [];
  private companiesList: CompanyPrep[] = [];
  private submissionsList: ProblemSubmission[] = [];
  private quizAttemptsList: QuizAttempt[] = [];
  private mockInterviewsList: MockInterviewSession[] = [];
  private announcementsList: Announcement[] = [];
  private revokedTokensList: RevokedTokenRecord[] = [];
  private initialized = false;

  constructor(customPath?: string) {
    // Strict production safeguard
    if (process.env.NODE_ENV === "production") {
      throw new DatabaseConfigurationError(
        "CRITICAL ERROR: LocalJsonAdapter cannot be instantiated in production mode. A real managed cloud database (Firestore) is mandatory."
      );
    }
    this.dbFilePath =
      customPath ||
      process.env.DB_FILE_PATH ||
      path.join(process.cwd(), "server", "data", "persistent_db.json");
  }

  async init(): Promise<void> {
    if (this.initialized) return;
    this.initializeSync();
    this.initialized = true;
  }

  isProductionSafe(): boolean {
    return false;
  }

  getStorageProviderInfo(): StorageProviderInfo {
    const isVercel = Boolean(
      process.env.VERCEL || process.env.NOW_REGION || process.env.AWS_LAMBDA_FUNCTION_NAME
    );
    return {
      provider: "LocalJsonAdapter",
      isProductionSafe: false,
      status: isVercel ? "degraded" : "connected",
      connectionMode: "local_file",
      description: isVercel
        ? "Ephemeral local filesystem. State will be discarded on serverless cold starts. Switch to managed Firestore for production."
        : `Local file-backed atomic JSON storage active at ${this.dbFilePath}. Development mode only.`,
    };
  }

  async healthCheck(): Promise<{ ok: boolean; message?: string }> {
    try {
      const exists = fs.existsSync(this.dbFilePath);
      return {
        ok: true,
        message: exists ? "Local database file accessible" : "Local database initialized in memory",
      };
    } catch (err: any) {
      return { ok: false, message: err.message };
    }
  }

  private initializeSync(): void {
    try {
      const dir = path.dirname(this.dbFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      if (fs.existsSync(this.dbFilePath)) {
        const raw = fs.readFileSync(this.dbFilePath, "utf-8");
        const parsed: DatabaseSchema = JSON.parse(raw);
        this.loadFromSchema(parsed);
      } else {
        this.seedInitialData();
        this.persistSync();
      }
    } catch (err) {
      console.warn("[LocalJsonAdapter] Re-initializing with seed data:", err);
      this.seedInitialData();
      try {
        this.persistSync();
      } catch (saveErr) {
        console.error("[LocalJsonAdapter] Could not write seed to disk:", saveErr);
      }
    }
  }

  private loadFromSchema(schema: DatabaseSchema): void {
    this.usersMap.clear();
    if (schema.users) {
      for (const [id, u] of Object.entries(schema.users)) {
        this.usersMap.set(id, u);
      }
    }

    this.coursesList =
      Array.isArray(schema.courses) && schema.courses.length > 0 ? schema.courses : [...SEED_COURSES];
    this.problemsList =
      Array.isArray(schema.problems) && schema.problems.length > 0
        ? schema.problems
        : [...SEED_PROBLEMS];
    this.companiesList =
      Array.isArray(schema.companies) && schema.companies.length > 0
        ? schema.companies
        : [...SEED_COMPANIES];
    this.submissionsList = Array.isArray(schema.submissions) ? schema.submissions : [];
    this.quizAttemptsList = Array.isArray(schema.quizAttempts) ? schema.quizAttempts : [];
    this.mockInterviewsList = Array.isArray(schema.mockInterviews) ? schema.mockInterviews : [];
    this.announcementsList =
      Array.isArray(schema.announcements) ? schema.announcements : this.getDefaultAnnouncements();
    const now = Date.now();
    this.revokedTokensList = Array.isArray(schema.revokedTokens)
      ? schema.revokedTokens.filter((t) => t && t.expiresAt > now)
      : [];

    this.ensureDefaultUsers();
  }

  private getDefaultAnnouncements(): Announcement[] {
    return [
      {
        id: "ann_1",
        title: "TCS Digital & Prime Comprehensive Placement Drive 2026",
        content:
          "New deep syllabus tracks for TCS Numerical, Verbal, Reasoning, and Coding are now live with sample testcases.",
        tag: "Placement Drive",
        date: "2026-08-18",
        active: true,
      },
      {
        id: "ann_2",
        title: "100+ LeetCode DSA Algorithmic Problem Bank Live",
        content:
          "Practice 100+ categorized algorithmic challenges with Python, C++, Java, and JavaScript support.",
        tag: "Feature",
        date: "2026-08-17",
        active: true,
      },
    ];
  }

  private ensureDefaultUsers(): void {
    const adminPass = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
    const studentPass = process.env.STUDENT_DEFAULT_PASSWORD || "student123";

    const adminHash = bcrypt.hashSync(adminPass, 10);
    const studentHash = bcrypt.hashSync(studentPass, 10);

    let hasAdmin = false;
    let hasStudent = false;

    let updatedHash = false;
    for (const u of this.usersMap.values()) {
      if (u.email.toLowerCase() === "admin@chintangpt.com") {
        hasAdmin = true;
        if (!bcrypt.compareSync(adminPass, u.passwordHash)) {
          u.passwordHash = adminHash;
          updatedHash = true;
        }
      }
      if (u.email.toLowerCase() === "student@chintangpt.com") {
        hasStudent = true;
        if (!bcrypt.compareSync(studentPass, u.passwordHash)) {
          u.passwordHash = studentHash;
          updatedHash = true;
        }
      }
    }
    if (updatedHash) {
      this.persistSync();
    }

    if (!hasAdmin) {
      const adminUser: UserRecord = {
        id: "usr_admin_1",
        name: "Platform Admin",
        email: "admin@chintangpt.com",
        role: "admin",
        passwordHash: adminHash,
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop",
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
        streakHistory: [{ date: getTodayDateString(), count: 1 }],
        tokenVersion: 1,
      };
      this.usersMap.set(adminUser.id, adminUser);
    }

    if (!hasStudent) {
      const demoStudent: UserRecord = {
        id: "usr_student_1",
        name: "Student Scholar",
        email: "student@chintangpt.com",
        role: "student",
        passwordHash: studentHash,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&fit=crop",
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
        streakHistory: [],
        tokenVersion: 1,
      };
      this.usersMap.set(demoStudent.id, demoStudent);
    }
  }

  private seedInitialData(): void {
    this.coursesList = [...SEED_COURSES];
    this.problemsList = [...SEED_PROBLEMS];
    this.companiesList = [...SEED_COMPANIES];
    this.announcementsList = this.getDefaultAnnouncements();
    this.submissionsList = [];
    this.quizAttemptsList = [];
    this.mockInterviewsList = [];
    this.usersMap.clear();

    this.ensureDefaultUsers();
  }

  public persistSync(): void {
    try {
      const usersObj: Record<string, UserRecord> = {};
      for (const [id, user] of this.usersMap.entries()) {
        usersObj[id] = user;
      }

      const now = Date.now();
      const schema: DatabaseSchema = {
        version: 1,
        users: usersObj,
        courses: this.coursesList,
        problems: this.problemsList,
        companies: this.companiesList,
        submissions: this.submissionsList,
        quizAttempts: this.quizAttemptsList,
        mockInterviews: this.mockInterviewsList,
        announcements: this.announcementsList,
        revokedTokens: this.revokedTokensList.filter((t) => t && t.expiresAt > now),
      };

      const serialized = JSON.stringify(schema, null, 2);
      const tempPath = `${this.dbFilePath}.tmp.${Date.now()}`;
      fs.writeFileSync(tempPath, serialized, "utf-8");
      fs.renameSync(tempPath, this.dbFilePath);
    } catch (err) {
      console.error("[LocalJsonAdapter] Error writing data to disk:", err);
    }
  }

  // --- Users ---
  findUserByEmail(email: string): UserRecord | undefined {
    if (!this.initialized) this.initializeSync();
    const normEmail = email.toLowerCase().trim();
    for (const user of this.usersMap.values()) {
      if (user.email.toLowerCase() === normEmail) {
        return user;
      }
    }
    return undefined;
  }

  findUserById(id: string): UserProfile | undefined {
    if (!this.initialized) this.initializeSync();
    const record = this.usersMap.get(id);
    if (!record) return undefined;
    const { passwordHash, ...safeUser } = record;
    return safeUser;
  }

  getUserById(id: string): UserProfile | undefined {
    return this.findUserById(id);
  }

  getUserRecordById(id: string): UserRecord | undefined {
    if (!this.initialized) this.initializeSync();
    return this.usersMap.get(id);
  }

  registerUser(
    name: string,
    email: string,
    passHash: string,
    role: "student" | "admin" = "student"
  ): UserProfile {
    if (!this.initialized) this.initializeSync();
    const id = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const newUserRecord: UserRecord = {
      id,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role,
      passwordHash: passHash,
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
      streakHistory: [],
      tokenVersion: 1,
    };

    this.usersMap.set(id, newUserRecord);
    this.persistSync();

    const { passwordHash, ...safeUser } = newUserRecord;
    return safeUser;
  }

  updateUser(id: string, updates: Partial<UserProfile>): UserProfile | null {
    if (!this.initialized) this.initializeSync();
    const user = this.usersMap.get(id);
    if (!user) return null;
    const updated: UserRecord = {
      ...user,
      ...updates,
      lastActive: new Date().toISOString(),
    };
    this.usersMap.set(id, updated);
    this.persistSync();

    const { passwordHash, ...safeUser } = updated;
    return safeUser;
  }

  recordQualifyingActivity(
    userId: string,
    xpGained: number,
    minutesSpent: number = 10
  ): UserProfile | null {
    if (!this.initialized) this.initializeSync();
    const user = this.usersMap.get(userId);
    if (!user) return null;

    const today = getTodayDateString();
    const yesterday = getYesterdayDateString();

    let newStreak = user.streak;
    const lastDate = user.lastQualifyingDate;

    if (lastDate === today) {
      // already recorded today
    } else if (lastDate === yesterday) {
      newStreak = (user.streak || 0) + 1;
    } else {
      newStreak = 1;
    }

    const newLongest = Math.max(user.longestStreak || 0, newStreak);
    const newXp = (user.xp || 0) + xpGained;
    const newLevel = Math.floor(newXp / 500) + 1;
    const newMinutes = (user.learningMinutes || 0) + minutesSpent;

    const history = [...(user.streakHistory || [])];
    const todayIndex = history.findIndex((h) => h.date === today);
    if (todayIndex >= 0) {
      history[todayIndex].count += 1;
    } else {
      history.push({ date: today, count: 1 });
      if (history.length > 30) history.shift();
    }

    const updated: UserRecord = {
      ...user,
      streak: newStreak,
      longestStreak: newLongest,
      lastQualifyingDate: today,
      xp: newXp,
      level: newLevel,
      learningMinutes: newMinutes,
      streakHistory: history,
      lastActive: new Date().toISOString(),
    };

    this.usersMap.set(userId, updated);
    this.persistSync();

    const { passwordHash, ...safeUser } = updated;
    return safeUser;
  }

  getAllUserRecords(): UserRecord[] {
    if (!this.initialized) this.initializeSync();
    return Array.from(this.usersMap.values());
  }

  incrementTokenVersion(userId: string): number {
    if (!this.initialized) this.initializeSync();
    const user = this.usersMap.get(userId);
    if (!user) return 1;
    user.tokenVersion = (user.tokenVersion ?? 1) + 1;
    this.persistSync();
    return user.tokenVersion;
  }

  // --- Courses ---
  getCourses(): Course[] {
    if (!this.initialized) this.initializeSync();
    return this.coursesList;
  }

  getCourseById(id: string): Course | undefined {
    if (!this.initialized) this.initializeSync();
    return this.coursesList.find((c) => c.id === id || c.slug === id);
  }

  addCourse(course: Course): Course {
    if (!this.initialized) this.initializeSync();
    this.coursesList.push(course);
    this.persistSync();
    return course;
  }

  updateCourse(id: string, updates: Partial<Course>): Course | null {
    if (!this.initialized) this.initializeSync();
    const idx = this.coursesList.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.coursesList[idx] = { ...this.coursesList[idx], ...updates };
    this.persistSync();
    return this.coursesList[idx];
  }

  deleteCourse(id: string): boolean {
    if (!this.initialized) this.initializeSync();
    const idx = this.coursesList.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    this.coursesList.splice(idx, 1);
    this.persistSync();
    return true;
  }

  // --- Problems ---
  getProblems(): CodingProblem[] {
    if (!this.initialized) this.initializeSync();
    return this.problemsList;
  }

  getProblemsSummary(options?: PaginationOptions): CodingProblemSummary[] {
    if (!this.initialized) this.initializeSync();
    const limit = Math.min(Math.max(options?.limit || 100, 1), 200);
    const offset = options?.offset || 0;
    return this.problemsList.slice(offset, offset + limit).map((p) => ({
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

  getProblemById(id: string): CodingProblem | undefined {
    if (!this.initialized) this.initializeSync();
    return this.problemsList.find((p) => p.id === id || p.slug === id);
  }

  addProblem(problem: CodingProblem): CodingProblem {
    if (!this.initialized) this.initializeSync();
    this.problemsList.push(problem);
    this.persistSync();
    return problem;
  }

  updateProblem(id: string, updates: Partial<CodingProblem>): CodingProblem | null {
    if (!this.initialized) this.initializeSync();
    const idx = this.problemsList.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.problemsList[idx] = { ...this.problemsList[idx], ...updates };
    this.persistSync();
    return this.problemsList[idx];
  }

  deleteProblem(id: string): boolean {
    if (!this.initialized) this.initializeSync();
    const idx = this.problemsList.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    this.problemsList.splice(idx, 1);
    this.persistSync();
    return true;
  }

  // --- Companies ---
  getCompanies(): CompanyPrep[] {
    if (!this.initialized) this.initializeSync();
    return this.companiesList;
  }

  getCompanyById(id: string): CompanyPrep | undefined {
    if (!this.initialized) this.initializeSync();
    return this.companiesList.find((c) => c.id === id);
  }

  addCompany(comp: CompanyPrep): CompanyPrep {
    if (!this.initialized) this.initializeSync();
    this.companiesList.push(comp);
    this.persistSync();
    return comp;
  }

  updateCompany(id: string, updates: Partial<CompanyPrep>): CompanyPrep | null {
    if (!this.initialized) this.initializeSync();
    const idx = this.companiesList.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    this.companiesList[idx] = { ...this.companiesList[idx], ...updates };
    this.persistSync();
    return this.companiesList[idx];
  }

  deleteCompany(id: string): boolean {
    if (!this.initialized) this.initializeSync();
    const idx = this.companiesList.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    this.companiesList.splice(idx, 1);
    this.persistSync();
    return true;
  }

  // --- Submissions (User Isolated with Pagination) ---
  addSubmission(sub: ProblemSubmission): ProblemSubmission {
    if (!this.initialized) this.initializeSync();
    this.submissionsList.unshift(sub);
    this.persistSync();
    return sub;
  }

  getSubmissionsByUserId(
    userId: string,
    problemId?: string,
    options?: PaginationOptions
  ): ProblemSubmission[] {
    if (!this.initialized) this.initializeSync();
    const filtered = this.submissionsList.filter(
      (s) => s.userId === userId && (!problemId || s.problemId === problemId)
    );
    const limit = Math.min(Math.max(options?.limit || 50, 1), 100);
    const offset = options?.offset || 0;
    return filtered.slice(offset, offset + limit);
  }

  // --- Quiz Attempts (User Isolated with Pagination) ---
  addQuizAttempt(attempt: QuizAttempt): QuizAttempt {
    if (!this.initialized) this.initializeSync();
    this.quizAttemptsList.unshift(attempt);
    this.persistSync();
    return attempt;
  }

  getQuizAttemptsByUserId(userId: string, options?: PaginationOptions): QuizAttempt[] {
    if (!this.initialized) this.initializeSync();
    const filtered = this.quizAttemptsList.filter((q) => q.userId === userId);
    const limit = Math.min(Math.max(options?.limit || 50, 1), 100);
    const offset = options?.offset || 0;
    return filtered.slice(offset, offset + limit);
  }

  // --- Mock Interviews (User Isolated with Pagination) ---
  saveMockInterview(interview: MockInterviewSession): MockInterviewSession {
    if (!this.initialized) this.initializeSync();
    const idx = this.mockInterviewsList.findIndex((m) => m.id === interview.id);
    if (idx >= 0) {
      this.mockInterviewsList[idx] = interview;
    } else {
      this.mockInterviewsList.unshift(interview);
    }
    this.persistSync();
    return interview;
  }

  getInterviewById(id: string): MockInterviewSession | undefined {
    if (!this.initialized) this.initializeSync();
    return this.mockInterviewsList.find((m) => m.id === id);
  }

  getMockInterviewsByUserId(userId: string, options?: PaginationOptions): MockInterviewSession[] {
    if (!this.initialized) this.initializeSync();
    const filtered = this.mockInterviewsList.filter((m) => m.userId === userId);
    const limit = Math.min(Math.max(options?.limit || 50, 1), 100);
    const offset = options?.offset || 0;
    return filtered.slice(offset, offset + limit);
  }

  // --- Announcements ---
  getAnnouncements(): Announcement[] {
    if (!this.initialized) this.initializeSync();
    return this.announcementsList.filter((a) => a.active);
  }

  addAnnouncement(announcement: Announcement): void {
    if (!this.initialized) this.initializeSync();
    this.announcementsList.unshift(announcement);
    this.persistSync();
  }

  deleteAnnouncement(id: string): boolean {
    if (!this.initialized) this.initializeSync();
    const prevLen = this.announcementsList.length;
    this.announcementsList = this.announcementsList.filter((a) => a.id !== id);
    if (this.announcementsList.length !== prevLen) {
      this.persistSync();
      return true;
    }
    return false;
  }

  // --- Analytics ---
  getPlatformAnalytics(): PlatformAnalytics {
    if (!this.initialized) this.initializeSync();
    const totalSubmissions = this.submissionsList.length;
    const acceptedSubmissions = this.submissionsList.filter((s) => s.status === "Accepted").length;
    const acceptanceRateGlobal =
      totalSubmissions > 0 ? +((acceptedSubmissions / totalSubmissions) * 100).toFixed(1) : 0;

    const topicProblemMap = new Map<string, CodingProblem[]>();
    for (const p of this.problemsList) {
      const topic = p.category || (p.topics && p.topics[0]) || "Algorithms";
      if (!topicProblemMap.has(topic)) topicProblemMap.set(topic, []);
      topicProblemMap.get(topic)!.push(p);
    }

    const topicDistribution = Array.from(topicProblemMap.entries()).map(([topic, probs]) => {
      const probIds = new Set(probs.map((p) => p.id));
      const topicSubs = this.submissionsList.filter((s) => probIds.has(s.problemId));
      const topicAccepted = topicSubs.filter((s) => s.status === "Accepted").length;
      const avgPassRate =
        topicSubs.length > 0 ? Math.round((topicAccepted / topicSubs.length) * 100) : 0;
      return {
        topic,
        totalProblems: probs.length,
        avgPassRate,
      };
    });

    const companyCountMap = new Map<string, number>();
    for (const sub of this.submissionsList) {
      const p = this.problemsList.find((prob) => prob.id === sub.problemId);
      if (p?.companyTags) {
        for (const c of p.companyTags) {
          const compName = c.charAt(0).toUpperCase() + c.slice(1);
          companyCountMap.set(compName, (companyCountMap.get(compName) || 0) + 1);
        }
      }
    }
    for (const mi of this.mockInterviewsList) {
      if (mi.company) {
        const compName = mi.company.charAt(0).toUpperCase() + mi.company.slice(1);
        companyCountMap.set(compName, (companyCountMap.get(compName) || 0) + 1);
      }
    }

    const defaultCompanies = ["Google", "Amazon", "Microsoft", "TCS", "Infosys"];
    const topCompaniesPracticed = defaultCompanies
      .map((name) => ({
        name,
        count: companyCountMap.get(name) || 0,
      }))
      .sort((a, b) => b.count - a.count);

    return {
      totalStudents: Array.from(this.usersMap.values()).filter((u) => u.role === "student").length,
      totalUsers: this.usersMap.size,
      activeToday: Math.max(
        1,
        Array.from(this.usersMap.values()).filter((u) =>
          u.lastActive?.startsWith(getTodayDateString())
        ).length || 1
      ),
      totalSubmissions,
      totalProblemsSolved: acceptedSubmissions,
      totalQuizzesTaken: this.quizAttemptsList.length,
      totalCoursesCompleted: this.coursesList.length,
      totalInterviewsCompleted: this.mockInterviewsList.filter((m) => m.status === "completed")
        .length,
      totalAiInterviewsConducted: this.mockInterviewsList.length,
      acceptanceRateGlobal,
      topCompaniesPracticed,
      topicDistribution:
        topicDistribution.length > 0
          ? topicDistribution
          : [
              { topic: "Arrays & Hashing", totalProblems: 10, avgPassRate: 0 },
              { topic: "Two Pointers", totalProblems: 8, avgPassRate: 0 },
              { topic: "Sliding Window", totalProblems: 7, avgPassRate: 0 },
              { topic: "Binary Search", totalProblems: 6, avgPassRate: 0 },
              { topic: "Trees & BST", totalProblems: 10, avgPassRate: 0 },
              { topic: "Graphs", totalProblems: 6, avgPassRate: 0 },
              { topic: "Dynamic Programming", totalProblems: 12, avgPassRate: 0 },
            ],
    };
  }

  // --- Revocations ---
  revokeToken(jti: string, expiresAt: number, userId?: string): void {
    if (!jti) return;
    if (!this.initialized) this.initializeSync();
    const now = Date.now();
    this.revokedTokensList = this.revokedTokensList.filter((t) => t.expiresAt > now);
    if (!this.revokedTokensList.some((t) => t.jti === jti)) {
      this.revokedTokensList.push({
        jti,
        expiresAt,
        revokedAt: new Date().toISOString(),
        userId,
      });
      this.persistSync();
    }
  }

  isTokenRevoked(jti: string): boolean {
    if (!jti) return false;
    if (!this.initialized) this.initializeSync();
    const now = Date.now();
    return this.revokedTokensList.some((t) => t.jti === jti && t.expiresAt > now);
  }
}
