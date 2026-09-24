import { IDatabaseAdapter, StorageProviderInfo, PaginationOptions } from "./types.js";
import { FirestoreAdapter, FirestoreAdapterConfig } from "./firestoreAdapter.js";
import { LocalJsonAdapter } from "./localJsonAdapter.js";
import { FailClosedAdapter } from "./failClosedAdapter.js";
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

export * from "./types.js";
export * from "./firestoreAdapter.js";
export * from "./localJsonAdapter.js";
export * from "./failClosedAdapter.js";

let activeAdapter: IDatabaseAdapter;

export function resolveDatabaseAdapter(): IDatabaseAdapter {
  const isProduction = process.env.NODE_ENV === "production";
  const requestedAdapter = process.env.DB_ADAPTER?.toLowerCase();

  // Test simulation of fail-closed
  if (requestedAdapter === "fail_closed") {
    return new FailClosedAdapter("Simulated fail-closed mode via DB_ADAPTER=fail_closed");
  }

  // Check if Firestore environment is configured
  const firestoreProjectId =
    process.env.FIRESTORE_PROJECT_ID ||
    process.env.GOOGLE_CLOUD_PROJECT ||
    process.env.FIREBASE_PROJECT_ID;
  const hasFirestoreCreds = Boolean(
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY ||
    process.env.FIRESTORE_EMULATOR_HOST
  );

  const firestoreAvailable = Boolean(firestoreProjectId || hasFirestoreCreds);

  if (isProduction) {
    // STRICT PRODUCTION SAFEGUARD:
    // Production MUST NOT silently fall back to persistent_db.json or LocalJsonAdapter or in-memory maps.
    if (!firestoreAvailable) {
      console.error(
        "[Production Database Error] Missing managed Firestore configuration in production mode. Refusing fallback. Failing closed."
      );
      return new FailClosedAdapter(
        "Missing required production cloud database configuration (FIRESTORE_PROJECT_ID or GOOGLE_APPLICATION_CREDENTIALS)"
      );
    }
    return new FirestoreAdapter();
  }

  // In non-production (development / test)
  if (requestedAdapter === "firestore" || (firestoreAvailable && requestedAdapter !== "local_json")) {
    try {
      return new FirestoreAdapter();
    } catch (err: any) {
      console.warn("[Database] Firestore initialization skipped in non-production, falling back to LocalJsonAdapter:", err.message);
      return new LocalJsonAdapter();
    }
  }

  // Default to LocalJsonAdapter for local dev/testing
  return new LocalJsonAdapter();
}

// Initialize active adapter singleton
activeAdapter = resolveDatabaseAdapter();
if (typeof (activeAdapter as any).init === "function") {
  (activeAdapter as any).init().catch((err: any) => {
    if (process.env.NODE_ENV === "production") {
      console.error("[Database] Initialization failed in production:", err.message);
      activeAdapter = new FailClosedAdapter(`Database initialization failed: ${err.message}`);
    } else {
      console.warn("[Database] Adapter initialization deferred:", err.message);
    }
  });
}

export function getDatabaseAdapter(): IDatabaseAdapter {
  return activeAdapter;
}

export function setDatabaseAdapter(adapter: IDatabaseAdapter): void {
  activeAdapter = adapter;
}

/**
 * Unified Database Facade:
 * Guarantees backward compatibility with existing route handlers and middleware
 * while seamlessly supporting async Firestore and high-concurrency pagination.
 */
class UnifiedDatabaseFacade implements IDatabaseAdapter {
  get providerName(): string {
    return activeAdapter.providerName;
  }

  async init(): Promise<void> {
    return activeAdapter.init();
  }

  isProductionSafe(): boolean {
    return activeAdapter.isProductionSafe();
  }

  getStorageProviderInfo(): StorageProviderInfo {
    return activeAdapter.getStorageProviderInfo();
  }

  async healthCheck(): Promise<{ ok: boolean; message?: string }> {
    return activeAdapter.healthCheck();
  }

  // --- Users ---
  findUserByEmail(email: string): any {
    return activeAdapter.findUserByEmail(email);
  }

  findUserById(id: string): any {
    return activeAdapter.findUserById(id);
  }

  getUserRecordById(id: string): any {
    return activeAdapter.getUserRecordById(id);
  }

  registerUser(name: string, email: string, passHash: string, role: "student" | "admin" = "student"): any {
    return activeAdapter.registerUser(name, email, passHash, role);
  }

  updateUser(id: string, updates: Partial<UserProfile>): any {
    return activeAdapter.updateUser(id, updates);
  }

  recordQualifyingActivity(userId: string, xpGained: number, minutesSpent: number = 10): any {
    return activeAdapter.recordQualifyingActivity(userId, xpGained, minutesSpent);
  }

  getAllUserRecords(): any {
    return activeAdapter.getAllUserRecords();
  }

  incrementTokenVersion(userId: string): any {
    return activeAdapter.incrementTokenVersion(userId);
  }

  // --- Backward-Compatible Array Getters ---
  get courses(): Course[] {
    const res = activeAdapter.getCourses();
    return Array.isArray(res) ? res : [];
  }

  get problems(): CodingProblem[] {
    const res = activeAdapter.getProblems();
    return Array.isArray(res) ? res : [];
  }

  get companies(): CompanyPrep[] {
    const res = activeAdapter.getCompanies();
    return Array.isArray(res) ? res : [];
  }

  // --- Courses ---
  getCourses(): any {
    return activeAdapter.getCourses();
  }

  getCourseById(id: string): any {
    return activeAdapter.getCourseById(id);
  }

  addCourse(course: Course): any {
    return activeAdapter.addCourse(course);
  }

  updateCourse(id: string, updates: Partial<Course>): any {
    return activeAdapter.updateCourse(id, updates);
  }

  deleteCourse(id: string): any {
    return activeAdapter.deleteCourse(id);
  }

  // --- Problems ---
  getProblems(): any {
    return activeAdapter.getProblems();
  }

  getProblemsSummary(options?: PaginationOptions): any {
    return activeAdapter.getProblemsSummary(options);
  }

  getProblemById(id: string): any {
    return activeAdapter.getProblemById(id);
  }

  addProblem(problem: CodingProblem): any {
    return activeAdapter.addProblem(problem);
  }

  updateProblem(id: string, updates: Partial<CodingProblem>): any {
    return activeAdapter.updateProblem(id, updates);
  }

  deleteProblem(id: string): any {
    return activeAdapter.deleteProblem(id);
  }

  // --- Companies ---
  getCompanies(): any {
    return activeAdapter.getCompanies();
  }

  getCompanyById(id: string): any {
    return activeAdapter.getCompanyById(id);
  }

  addCompany(comp: CompanyPrep): any {
    return activeAdapter.addCompany(comp);
  }

  updateCompany(id: string, updates: Partial<CompanyPrep>): any {
    return activeAdapter.updateCompany(id, updates);
  }

  deleteCompany(id: string): any {
    return activeAdapter.deleteCompany(id);
  }

  // --- Submissions ---
  addSubmission(sub: ProblemSubmission): any {
    return activeAdapter.addSubmission(sub);
  }

  getSubmissionsByUserId(userId: string, problemId?: string, options?: PaginationOptions): any {
    return activeAdapter.getSubmissionsByUserId(userId, problemId, options);
  }

  // --- Quiz Attempts ---
  addQuizAttempt(attempt: QuizAttempt): any {
    return activeAdapter.addQuizAttempt(attempt);
  }

  getQuizAttemptsByUserId(userId: string, options?: PaginationOptions): any {
    return activeAdapter.getQuizAttemptsByUserId(userId, options);
  }

  // --- Mock Interviews ---
  saveMockInterview(interview: MockInterviewSession): any {
    return activeAdapter.saveMockInterview(interview);
  }

  getInterviewById(id: string): any {
    return activeAdapter.getInterviewById(id);
  }

  getMockInterviewsByUserId(userId: string, options?: PaginationOptions): any {
    return activeAdapter.getMockInterviewsByUserId(userId, options);
  }

  // --- Announcements ---
  getAnnouncements(): any {
    return activeAdapter.getAnnouncements();
  }

  addAnnouncement(announcement: Announcement): any {
    return activeAdapter.addAnnouncement(announcement);
  }

  deleteAnnouncement(id: string): any {
    return activeAdapter.deleteAnnouncement(id);
  }

  // --- Analytics ---
  getPlatformAnalytics(): any {
    return activeAdapter.getPlatformAnalytics();
  }

  // --- Revocations ---
  revokeToken(jti: string, expiresAt: number, userId?: string): any {
    return activeAdapter.revokeToken(jti, expiresAt, userId);
  }

  isTokenRevoked(jti: string): any {
    return activeAdapter.isTokenRevoked(jti);
  }
}

export const db = new UnifiedDatabaseFacade();
