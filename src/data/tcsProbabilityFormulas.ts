export interface TopicFormulaItem {
  title: string;
  category: string;
  formula: string;
  description: string;
  example: string;
}

export const TCS_PROBABILITY_FORMULAS: TopicFormulaItem[] = [
  {
    title: "Classical Definition & Complement Rule",
    category: "Basic Probability",
    formula: "P(E) = n(E) / n(S)\nP(E') = 1 - P(E)\n0 <= P(E) <= 1",
    description: "Ratio of favorable outcomes n(E) to total equally likely elementary outcomes in sample space n(S).",
    example: "Rolling an even number on a 6-sided die: n(E) = {2,4,6} = 3, n(S) = 6 => P = 3/6 = 1/2."
  },
  {
    title: "Addition Rule of Probability",
    category: "Set-Theoretic Probability",
    formula: "P(A U B) = P(A) + P(B) - P(A ∩ B)\nFor Mutually Exclusive Events (A ∩ B = ∅): P(A U B) = P(A) + P(B)",
    description: "Probability of event A or event B (or both) occurring.",
    example: "Drawing a King or Heart from 52 cards: P = 4/52 + 13/52 - 1/52 = 16/52 = 4/13."
  },
  {
    title: "Conditional Probability",
    category: "Conditional Probability",
    formula: "P(A | B) = P(A ∩ B) / P(B), where P(B) > 0\nP(A ∩ B) = P(B) × P(A | B) = P(A) × P(B | A)",
    description: "Probability of event A occurring given that event B has already occurred.",
    example: "If P(Pass QA) = 0.8 and P(Pass QA & Code Review) = 0.6 => P(Review | QA) = 0.6 / 0.8 = 0.75."
  },
  {
    title: "Independent Events",
    category: "Independence",
    formula: "P(A ∩ B) = P(A) × P(B)\nP(A | B) = P(A) and P(B | A) = P(B)\nP(At least one of A, B) = 1 - [1 - P(A)][1 - P(B)]",
    description: "Occurrence of event A does not alter the likelihood of event B.",
    example: "Tossing a coin (P=1/2) and rolling a die (P=1/6): P(Head & 6) = 1/2 × 1/6 = 1/12."
  },
  {
    title: "Bayes' Theorem & Law of Total Probability",
    category: "Bayesian Inference",
    formula: "Total Prob: P(B) = ∑ [P(Ai) × P(B | Ai)]\nBayes': P(Ak | B) = [P(Ak) × P(B | Ak)] / ∑ [P(Ai) × P(B | Ai)]",
    description: "Calculates the posterior probability of a cause given an observed effect.",
    example: "Testing bug origin: Machine A makes 60% with 2% defect, Machine B 40% with 5% defect. P(Defect) = 0.6(0.02) + 0.4(0.05) = 0.032."
  },
  {
    title: "Binomial Distribution Probability",
    category: "Discrete Probability",
    formula: "P(X = k) = C(n, k) × p^k × (1 - p)^(n - k)\nMean = n × p, Variance = n × p × (1 - p)",
    description: "Probability of getting exactly k successes in n independent Bernoulli trials with constant success probability p.",
    example: "Tossing 5 coins, probability of exactly 3 heads: C(5,3) × (1/2)³ × (1/2)² = 10 / 32 = 5/16."
  },
  {
    title: "Geometric Distribution (First Success)",
    category: "Discrete Probability",
    formula: "P(X = k) = (1 - p)^(k - 1) × p\nExpected Trials = 1 / p",
    description: "Probability that the first success occurs on the k-th independent trial.",
    example: "Probability first 6 appears on 3rd roll of die: (5/6)² × (1/6) = 25 / 216."
  },
  {
    title: "System Reliability (Series & Parallel Networks)",
    category: "Reliability Engineering",
    formula: "Series (All must work): R_sys = R1 × R2 × ... × Rn\nParallel (At least one works): R_sys = 1 - [(1 - R1) × (1 - R2) × ... × (1 - Rn)]",
    description: "Used in cloud servers, microservice pipelines, and network link availability.",
    example: "Two redundant servers with 90% uptime: R = 1 - (0.10 × 0.10) = 1 - 0.01 = 99% uptime."
  },
  {
    title: "Selection & Urn Problems without Replacement",
    category: "Combinatorics",
    formula: "P(k red from R red, W white) = [C(R, k) × C(W, m - k)] / C(R + W, m)",
    description: "Hypergeometric selection of items drawn simultaneously without replacement.",
    example: "Drawing 2 blue balls from 4 blue & 6 green: [C(4,2) × C(6,0)] / C(10,2) = 6 / 45 = 2/15."
  },
  {
    title: "At Least One Success Shortcut",
    category: "Aptitude Shortcut",
    formula: "P(At least 1) = 1 - P(None) = 1 - (1 - p)^n",
    description: "Whenever a question asks for 'at least one', calculating the complement is often 3x faster.",
    example: "Probability of getting at least one 6 in 4 rolls of a die = 1 - (5/6)⁴ = 1 - 625/1296 = 671/1296."
  }
];
