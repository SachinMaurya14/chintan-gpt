export type DSADifficulty = "Medium" | "Hard" | "Extreme";

export interface DSAExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface DSAInterviewProblem {
  id: string; // e.g. "Q01", "Q02", ... "Q40"
  questionNumber: number;
  title: string;
  statement: string;
  difficulty: DSADifficulty;
  pattern: string;
  constraints: string[];
  expectedTimeComplexity: string;
  expectedSpaceComplexity: string;
  examples: DSAExample[];
  explanation: string;
  interviewInsight: string;
  cppSolution: string;
  pythonSolution: string;
  topic: string;
  batch: number;
}
