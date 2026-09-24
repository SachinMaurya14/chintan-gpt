import {
  IDatabaseAdapter,
  StorageProviderInfo,
  DatabaseConfigurationError,
  DatabaseUnavailableError,
  PaginationOptions,
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

export class FailClosedAdapter implements IDatabaseAdapter {
  readonly providerName = "FailClosed";
  private reason: string;

  constructor(reason: string = "Production database is not configured or is unavailable.") {
    this.reason = reason;
  }

  async init(): Promise<void> {
    throw new DatabaseConfigurationError(
      `[FAIL-CLOSED PRODUCTION SAFEGUARD] ${this.reason}. Production environments MUST configure a managed cloud database (Firestore). Refusing to fall back to ephemeral storage or mock data.`
    );
  }

  isProductionSafe(): boolean {
    return false;
  }

  getStorageProviderInfo(): StorageProviderInfo {
    return {
      provider: "FailClosed",
      isProductionSafe: false,
      status: "failed_closed",
      connectionMode: "none",
      description: `Production safeguard active: ${this.reason}`,
    };
  }

  async healthCheck(): Promise<{ ok: boolean; message?: string }> {
    return {
      ok: false,
      message: `Database unavailable: ${this.reason}`,
    };
  }

  private fail(): never {
    throw new DatabaseUnavailableError(
      `[Database Unavailable] ${this.reason}. System has failed closed to protect data integrity.`
    );
  }

  findUserByEmail(email: string): Promise<UserRecord | undefined> {
    this.fail();
  }

  findUserById(id: string): Promise<UserProfile | undefined> {
    this.fail();
  }

  getUserRecordById(id: string): Promise<UserRecord | undefined> {
    this.fail();
  }

  registerUser(name: string, email: string, passHash: string, role?: "student" | "admin"): Promise<UserProfile> {
    this.fail();
  }

  updateUser(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    this.fail();
  }

  recordQualifyingActivity(userId: string, xpGained: number, minutesSpent?: number): Promise<UserProfile | null> {
    this.fail();
  }

  getAllUserRecords(): Promise<UserRecord[]> {
    this.fail();
  }

  incrementTokenVersion(userId: string): Promise<number> {
    this.fail();
  }

  getCourses(): Promise<Course[]> {
    this.fail();
  }

  getCourseById(id: string): Promise<Course | undefined> {
    this.fail();
  }

  addCourse(course: Course): Promise<Course> {
    this.fail();
  }

  updateCourse(id: string, updates: Partial<Course>): Promise<Course | null> {
    this.fail();
  }

  deleteCourse(id: string): Promise<boolean> {
    this.fail();
  }

  getProblems(): Promise<CodingProblem[]> {
    this.fail();
  }

  getProblemsSummary(options?: PaginationOptions): Promise<CodingProblemSummary[]> {
    this.fail();
  }

  getProblemById(id: string): Promise<CodingProblem | undefined> {
    this.fail();
  }

  addProblem(problem: CodingProblem): Promise<CodingProblem> {
    this.fail();
  }

  updateProblem(id: string, updates: Partial<CodingProblem>): Promise<CodingProblem | null> {
    this.fail();
  }

  deleteProblem(id: string): Promise<boolean> {
    this.fail();
  }

  getCompanies(): Promise<CompanyPrep[]> {
    this.fail();
  }

  getCompanyById(id: string): Promise<CompanyPrep | undefined> {
    this.fail();
  }

  addCompany(comp: CompanyPrep): Promise<CompanyPrep> {
    this.fail();
  }

  updateCompany(id: string, updates: Partial<CompanyPrep>): Promise<CompanyPrep | null> {
    this.fail();
  }

  deleteCompany(id: string): Promise<boolean> {
    this.fail();
  }

  addSubmission(sub: ProblemSubmission): Promise<ProblemSubmission> {
    this.fail();
  }

  getSubmissionsByUserId(userId: string, problemId?: string, options?: PaginationOptions): Promise<ProblemSubmission[]> {
    this.fail();
  }

  addQuizAttempt(attempt: QuizAttempt): Promise<QuizAttempt> {
    this.fail();
  }

  getQuizAttemptsByUserId(userId: string, options?: PaginationOptions): Promise<QuizAttempt[]> {
    this.fail();
  }

  saveMockInterview(interview: MockInterviewSession): Promise<MockInterviewSession> {
    this.fail();
  }

  getInterviewById(id: string): Promise<MockInterviewSession | undefined> {
    this.fail();
  }

  getMockInterviewsByUserId(userId: string, options?: PaginationOptions): Promise<MockInterviewSession[]> {
    this.fail();
  }

  getAnnouncements(): Promise<Announcement[]> {
    this.fail();
  }

  addAnnouncement(announcement: Announcement): Promise<void> {
    this.fail();
  }

  deleteAnnouncement(id: string): Promise<boolean> {
    this.fail();
  }

  getPlatformAnalytics(): Promise<PlatformAnalytics> {
    this.fail();
  }

  revokeToken(jti: string, expiresAt: number, userId?: string): Promise<void> {
    this.fail();
  }

  isTokenRevoked(jti: string): Promise<boolean> {
    this.fail();
  }
}
