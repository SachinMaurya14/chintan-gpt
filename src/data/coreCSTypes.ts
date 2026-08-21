export type CoreCSTopic =
  | "Operating Systems"
  | "DBMS"
  | "Computer Networks"
  | "OOP"
  | "SQL"
  | "Concurrency / Multithreading"
  | "Computer Architecture / Systems"
  | "Language / Runtime Fundamentals"
  | "Distributed Systems Fundamentals"
  | "Mixed Core CS Drill";

export type CoreCSDifficulty = "Easy" | "Medium" | "Hard" | "Extreme";

export type CoreCSQuestionFormat =
  | "MCQ"
  | "Short Answer"
  | "Scenario"
  | "Output Prediction"
  | "Debugging"
  | "SQL Coding"
  | "Explanation"
  | "Design / Systems Reasoning";

export type SourceClassification =
  | "Reported Interview Question"
  | "Reported Interview Variant"
  | "Repeated Interview Topic"
  | "Interview-Style Practice Question"
  | "Original Practice Question";

export interface ReportedContext {
  company?: string;
  role?: string;
  year?: number;
  location?: string;
  sourceReference?: string;
}

export interface FollowUpStep {
  stepNumber: number;
  interviewerPrompt: string;
  interviewerIntent: string;
  strongCandidateAnswer: string;
  keyKeywords: string[];
}

export interface SystemsDeepDive {
  whyItMattersInProduction: string;
  commonPitfalls: string[];
  tradeoffsOrPerformanceImpact: string;
}

export interface CoreCSQuestion {
  id: string;
  title: string;
  topic: CoreCSTopic;
  subtopic: string;
  difficulty: CoreCSDifficulty;
  format: CoreCSQuestionFormat;
  companies: string[];
  sourceType: SourceClassification;
  sourceMetadata: ReportedContext;
  question: string;
  codeSnippet?: string;
  language?: string;
  options?: string[];
  correctAnswer?: string | number;
  detailedExplanation: string;
  interviewDrillDown: FollowUpStep[];
  systemsDeepDive?: SystemsDeepDive;
  sqlSchema?: string;
  sqlExpectedQuery?: string;
}

export interface InterviewEvaluationScorecard {
  conceptualAccuracy: number; // 0-100
  practicalDepth: number;     // 0-100
  followUpHandling: number;   // 0-100
  communication: number;      // 0-100
  tier1Recommendation: "Strong Hire" | "Hire" | "Leaning No" | "Reject";
  feedbackSummary: string;
}
