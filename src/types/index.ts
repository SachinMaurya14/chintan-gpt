export type UserRole = 'student' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  lastActive: string;
  streak: number;
  longestStreak: number;
  lastQualifyingDate?: string | null;
  xp: number;
  level: number;
  solvedProblemIds: string[];
  problemsAttempted: number;
  completedLessonIds: string[];
  completedVideoIds?: string[];
  lastWatchedVideos?: Record<string, { videoId: string; playlistId?: string; videoTitle?: string; lastWatchedAt: string }>;
  enrolledCourseIds: string[];
  targetCompanies: string[];
  quizzesCompleted: number;
  learningMinutes: number;
  weakTopics: { topic: string; score: number; recommendations: string }[];
  streakHistory: { date: string; count: number }[];
}

export interface PlaylistVideoItem {
  id: string;
  playlistId: string;
  videoId: string;
  title: string;
  thumbnail: string;
  position: number;
  publishedAt?: string;
  channelTitle?: string;
  durationMinutes?: number;
  type: 'youtube_video';
}

export interface Lesson {
  id: string;
  moduleId: string;
  courseId: string;
  title: string;
  description: string;
  youtubeUrl: string;
  durationMinutes: number;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  notesMarkdown: string;
  keyTakeaways: string[];
  practiceProblemIds?: string[];
  quiz?: Quiz;
  order: number;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface CourseResource {
  id: string;
  courseId: string;
  title: string;
  type: 'youtube_video' | 'youtube_playlist';
  url: string;
  playlistId?: string;
  videoId?: string;
  videoCount?: number;
  videos?: PlaylistVideoItem[];
  order: number;
  description?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: string;
  track?: string;
  description: string;
  thumbnail: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: number;
  totalLessons: number;
  instructor: string;
  instructorTitle: string;
  tags: string[];
  resources?: CourseResource[];
  playlistVideos?: PlaylistVideoItem[];
  modules: Module[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Quiz {
  id: string;
  lessonId?: string;
  title: string;
  topic: string;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  topic: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  answers: { questionId: string; selectedOption: number; isCorrect: boolean }[];
  completedAt: string;
}

export type SupportedLanguage = 'python' | 'javascript' | 'cpp' | 'java';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface CodingProblemSummary {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: string[];
  companyTags: string[];
  acceptanceRate: number;
  category?: string;
}

export interface CodingProblem extends CodingProblemSummary {
  description?: string;
  examples?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints?: string[];
  starterCode?: Record<SupportedLanguage, string>;
  testCases?: TestCase[];
  sampleTestCases?: TestCase[];
  timeLimitMs?: number;
  memoryLimitMb?: number;
  hints?: string[];
  solutionApproach?: {
    intuition: string;
    algorithm: string;
    timeComplexity: string;
    spaceComplexity: string;
    codeReference: Record<SupportedLanguage, string>;
  };
}

export type SubmissionStatus = 
  | 'Accepted'
  | 'Wrong Answer'
  | 'Time Limit Exceeded'
  | 'Runtime Error'
  | 'Compilation Error'
  | 'Pending';

export interface CodeExecutionResult {
  status: SubmissionStatus;
  passedCount?: number;
  testCasesPassed?: number;
  totalTestCases: number;
  runtimeMs: number;
  memoryMb?: number;
  memoryKb?: number;
  output?: string;
  stdout?: string;
  stderr?: string;
  error?: string;
  failedTestCase?: {
    input: string;
    expected: string;
    actual: string;
  };
  details?: {
    testCaseIndex: number;
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
    runtimeMs: number;
  }[];
}

export interface ProblemSubmission {
  id: string;
  userId: string;
  problemId: string;
  problemTitle: string;
  language: SupportedLanguage;
  code: string;
  status: SubmissionStatus;
  runtimeMs: number;
  memoryMb: number;
  memoryKb?: number;
  passedTestCases: number;
  totalTestCases: number;
  submittedAt: string;
}

export interface CompanyCategory {
  name: string;
  description: string;
  topics: string[];
  sampleQuestionsCount: number;
}

export interface CompanyPrep {
  id: string;
  name: string;
  logo: string;
  tier: 'Tier 1' | 'Tier 2' | 'Service Based' | 'Product Tech' | 'Fintech';
  description: string;
  hiringProcess: string[];
  categories: CompanyCategory[];
  recommendedProblemIds: string[];
  aptitudeSyllabus: string[];
  interviewTips: string[];
}

export interface MockInterviewMessage {
  id?: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export interface MockInterviewSession {
  id: string;
  userId: string;
  company: string;
  role: string;
  round: 'Technical Coding' | 'CS Fundamentals & Architecture' | 'Aptitude & Problem Solving' | 'HR & Behavioral';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'in_progress' | 'completed';
  messages: MockInterviewMessage[];
  currentQuestionIndex: number;
  totalQuestions: number;
  createdAt: string;
  feedback?: {
    overallScore: number;
    technicalAccuracy: number;
    problemSolving: number;
    communication: number;
    completeness: number;
    strengths: string[];
    weaknesses: string[];
    areasOfImprovement?: string[];
    recommendations: string[];
    detailedSummary: string;
  };
}

export interface PlatformAnalytics {
  totalStudents: number;
  activeToday: number;
  totalSubmissions: number;
  totalQuizzesTaken: number;
  totalInterviewsCompleted: number;
  acceptanceRateGlobal: number;
  topCompaniesPracticed: { name: string; count: number }[];
  topicDistribution: { topic: string; totalProblems: number; avgPassRate: number }[];
  totalUsers?: number;
  totalProblemsSolved?: number;
  totalCoursesCompleted?: number;
  totalAiInterviewsConducted?: number;
}


export interface Announcement {
  id: string;
  title: string;
  content: string;
  tag: 'Contest' | 'Update' | 'Placement Drive' | 'Feature';
  date: string;
  active: boolean;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface VisualDiagramResponse {
  imageUrl: string;
  concept: string;
  isSvgFallback?: boolean;
}

export interface SearchGroundingResponse {
  answer: string;
  sources: GroundingSource[];
  query: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: UserProfile;
  message?: string;
  error?: string;
}

