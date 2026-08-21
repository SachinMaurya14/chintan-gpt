export interface GeometryRawQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  formulaUsed?: string;
  difficulty: string;
  category: string;
  yearAsked?: string;
}
