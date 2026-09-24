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

export interface RevokedTokenRecord {
  jti: string;
  expiresAt: number;
  revokedAt: string;
  userId?: string;
}

export interface PaginationOptions {
  limit?: number;
  cursor?: string;
  offset?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total?: number;
  nextCursor?: string;
  hasMore: boolean;
}

export interface StorageProviderInfo {
  provider: "Firestore" | "LocalJsonAdapter" | "FailClosed";
  isProductionSafe: boolean;
  status: "connected" | "degraded" | "unconfigured" | "failed_closed";
  connectionMode: "managed_cloud" | "local_file" | "none";
  description: string;
}

export class DatabaseConfigurationError extends Error {
  public statusCode = 503;
  constructor(message: string) {
    super(message);
    this.name = "DatabaseConfigurationError";
  }
}

export class DatabaseUnavailableError extends Error {
  public statusCode = 503;
  constructor(message: string) {
    super(message);
    this.name = "DatabaseUnavailableError";
  }
}

export interface IDatabaseAdapter {
  readonly providerName: string;
  init(): Promise<void>;
  isProductionSafe(): boolean;
  getStorageProviderInfo(): StorageProviderInfo;
  healthCheck(): Promise<{ ok: boolean; message?: string }>;

  // --- Users ---
  findUserByEmail(email: string): Promise<UserRecord | undefined> | UserRecord | undefined;
  findUserById(id: string): Promise<UserProfile | undefined> | UserProfile | undefined;
  getUserRecordById(id: string): Promise<UserRecord | undefined> | UserRecord | undefined;
  registerUser(name: string, email: string, passHash: string, role?: "student" | "admin"): Promise<UserProfile> | UserProfile;
  updateUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> | UserProfile | null;
  recordQualifyingActivity(userId: string, xpGained: number, minutesSpent?: number): Promise<UserProfile | null> | UserProfile | null;
  getAllUserRecords(): Promise<UserRecord[]> | UserRecord[];
  incrementTokenVersion(userId: string): Promise<number> | number;

  // --- Courses ---
  getCourses(): Promise<Course[]> | Course[];
  getCourseById(id: string): Promise<Course | undefined> | Course | undefined;
  addCourse(course: Course): Promise<Course> | Course;
  updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> | Course | null;
  deleteCourse(id: string): Promise<boolean> | boolean;

  // --- Problems ---
  getProblems(): Promise<CodingProblem[]> | CodingProblem[];
  getProblemsSummary(options?: PaginationOptions): Promise<CodingProblemSummary[]> | CodingProblemSummary[];
  getProblemById(id: string): Promise<CodingProblem | undefined> | CodingProblem | undefined;
  addProblem(problem: CodingProblem): Promise<CodingProblem> | CodingProblem;
  updateProblem(id: string, updates: Partial<CodingProblem>): Promise<CodingProblem | null> | CodingProblem | null;
  deleteProblem(id: string): Promise<boolean> | boolean;

  // --- Companies ---
  getCompanies(): Promise<CompanyPrep[]> | CompanyPrep[];
  getCompanyById(id: string): Promise<CompanyPrep | undefined> | CompanyPrep | undefined;
  addCompany(comp: CompanyPrep): Promise<CompanyPrep> | CompanyPrep;
  updateCompany(id: string, updates: Partial<CompanyPrep>): Promise<CompanyPrep | null> | CompanyPrep | null;
  deleteCompany(id: string): Promise<boolean> | boolean;

  // --- Submissions (User Isolated) ---
  addSubmission(sub: ProblemSubmission): Promise<ProblemSubmission> | ProblemSubmission;
  getSubmissionsByUserId(userId: string, problemId?: string, options?: PaginationOptions): Promise<ProblemSubmission[]> | ProblemSubmission[];

  // --- Quiz Attempts (User Isolated) ---
  addQuizAttempt(attempt: QuizAttempt): Promise<QuizAttempt> | QuizAttempt;
  getQuizAttemptsByUserId(userId: string, options?: PaginationOptions): Promise<QuizAttempt[]> | QuizAttempt[];

  // --- Mock Interviews (User Isolated) ---
  saveMockInterview(interview: MockInterviewSession): Promise<MockInterviewSession> | MockInterviewSession;
  getInterviewById(id: string): Promise<MockInterviewSession | undefined> | MockInterviewSession | undefined;
  getMockInterviewsByUserId(userId: string, options?: PaginationOptions): Promise<MockInterviewSession[]> | MockInterviewSession[];

  // --- Announcements ---
  getAnnouncements(): Promise<Announcement[]> | Announcement[];
  addAnnouncement(announcement: Announcement): Promise<void> | void;
  deleteAnnouncement(id: string): Promise<boolean> | boolean;

  // --- Analytics ---
  getPlatformAnalytics(): Promise<PlatformAnalytics> | PlatformAnalytics;

  // --- Token Revocation ---
  revokeToken(jti: string, expiresAt: number, userId?: string): Promise<void> | void;
  isTokenRevoked(jti: string): Promise<boolean> | boolean;
}
