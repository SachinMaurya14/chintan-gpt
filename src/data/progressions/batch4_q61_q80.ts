import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH4_QUESTIONS: PlacementQuestion[] = [
  // ==================== BATCH 4: Hard to Extreme Hard (Q61–Q80) ====================
  // Factorial telescoping, inverse trig series, linear recurrences, double sums
  {
    id: "PROG_Q61",
    questionNumber: 61,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Evaluate the finite sum: S = 1/2! + 2/3! + 3/4! + ... + n/(n + 1)!.`,
    options: [
      { key: "A", text: "1 - 1/(n + 1)!" },
      { key: "B", text: "1 - 1/n!" },
      { key: "C", text: "1/(n + 1)!" },
      { key: "D", text: "(n - 1)/(n + 1)!" }
    ],
    correctAnswer: "A",
    solution: `Notice that k / (k + 1)! = [(k + 1) - 1] / (k + 1)! = 1/k! - 1/(k + 1)!.
Summing from k = 1 to n:
S = (1/1! - 1/2!) + (1/2! - 1/3!) + ... + (1/n! - 1/(n + 1)!)
= 1 - 1/(n + 1)!.`
  },
  {
    id: "PROG_Q62",
    questionNumber: 62,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Evaluate the infinite series: S = Σ_{n=1}^∞ tan^(-1)[ 1 / (2n^2) ].`,
    options: [
      { key: "A", text: "π / 6" },
      { key: "B", text: "π / 4" },
      { key: "C", text: "π / 3" },
      { key: "D", text: "π / 2" }
    ],
    correctAnswer: "B",
    solution: `Rewrite the argument:
1 / (2n^2) = 2 / (4n^2) = [(2n + 1) - (2n - 1)] / [1 + (2n + 1)(2n - 1)].
Using identity tan^(-1)[(x - y)/(1 + xy)] = tan^(-1)(x) - tan^(-1)(y):
T_n = tan^(-1)(2n + 1) - tan^(-1)(2n - 1).
Summing from n = 1 to N:
S_N = [tan^(-1)(3) - tan^(-1)(1)] + [tan^(-1)(5) - tan^(-1)(3)] + ... + [tan^(-1)(2N + 1) - tan^(-1)(2N - 1)]
S_N = tan^(-1)(2N + 1) - tan^(-1)(1).
As N -> ∞, tan^(-1)(2N + 1) -> π/2.
S = π/2 - π/4 = π/4.`
  },
  {
    id: "PROG_Q63",
    questionNumber: 63,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `A sequence is defined by a_1 = 2 and a_{n+1} = 3 a_n + 4 for all n ≥ 1. Find the closed-form expression for a_n.`,
    options: [
      { key: "A", text: "4 · 3^(n-1) - 2" },
      { key: "B", text: "3^n - 1" },
      { key: "C", text: "2 · 3^n - 4" },
      { key: "D", text: "5 · 3^(n-1) - 3" }
    ],
    correctAnswer: "A",
    solution: `Fixed point: L = 3L + 4 => -2L = 4 => L = -2.
Substitute b_n = a_n - (-2) = a_n + 2.
b_{n+1} = a_{n+1} + 2 = (3a_n + 4) + 2 = 3(a_n + 2) = 3 b_n.
Thus b_n is a GP with common ratio 3.
b_1 = a_1 + 2 = 2 + 2 = 4.
b_n = 4 · 3^(n-1).
Therefore, a_n = b_n - 2 = 4 · 3^(n-1) - 2.`
  },
  {
    id: "PROG_Q64",
    questionNumber: 64,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Evaluate the infinite sum: S = 1/(1·2·3·4) + 1/(2·3·4·5) + 1/(3·4·5·6) + ...`,
    options: [
      { key: "A", text: "1/18" },
      { key: "B", text: "1/24" },
      { key: "C", text: "1/36" },
      { key: "D", text: "1/48" }
    ],
    correctAnswer: "A",
    solution: `T_n = 1 / [n(n + 1)(n + 2)(n + 3)] = (1/3) [1 / (n(n + 1)(n + 2)) - 1 / ((n + 1)(n + 2)(n + 3))].
Summing to infinity:
S = (1/3) [1 / (1·2·3) - 0] = (1/3) [1/6] = 1/18.`
  },
  {
    id: "PROG_Q65",
    questionNumber: 65,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `If a, b, c, d are positive real numbers such that a + b + c + d = 12, what is the maximum value of a^2 b^3 c d^6?`,
    options: [
      { key: "A", text: "2^2 · 3^3 · 1 · 6^6" },
      { key: "B", text: "2^2 · 3^3 · 1 · 6^6 = 4 · 27 · 46,656" },
      { key: "C", text: "2^12 · 3^3" },
      { key: "D", text: "12^12 / 12!" }
    ],
    correctAnswer: "A",
    solution: `Using weighted AM-GM inequality:
Split a into 2 parts of (a/2), b into 3 parts of (b/3), c into 1 part, d into 6 parts of (d/6).
Total parts = 2 + 3 + 1 + 6 = 12 parts.
Sum = 2(a/2) + 3(b/3) + c + 6(d/6) = a + b + c + d = 12.
AM = 12 / 12 = 1.
Equality holds when a/2 = b/3 = c/1 = d/6 = 1 => a = 2, b = 3, c = 1, d = 6.
Maximum value = 2^2 · 3^3 · 1^1 · 6^6 = 4 × 27 × 46,656 = 5,038,848.`
  },
  {
    id: "PROG_Q66",
    questionNumber: 66,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Find the sum of the series: S = Σ_{n=1}^∞ [ n^2 / 2^n ].`,
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "6" },
      { key: "C", text: "8" },
      { key: "D", text: "10" }
    ],
    correctAnswer: "B",
    solution: `Formula for Σ_{n=1}^∞ n^2 r^n when |r| < 1 is [r(1 + r)] / (1 - r)^3.
Here r = 1/2:
Numerator = (1/2) (1 + 1/2) = (1/2) × (3/2) = 3/4.
Denominator = (1 - 1/2)^3 = (1/2)^3 = 1/8.
S = (3/4) / (1/8) = (3/4) × 8 = 6.`
  },
  {
    id: "PROG_Q67",
    questionNumber: 67,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `If x_1 = 1 and x_{n+1} = sqrt(2 + x_n) for n ≥ 1, find the limit L = lim_{n -> ∞} x_n.`,
    options: [
      { key: "A", text: "sqrt(2)" },
      { key: "B", text: "2" },
      { key: "C", text: "1 + sqrt(2)" },
      { key: "D", text: "4" }
    ],
    correctAnswer: "B",
    solution: `Taking limits on both sides: L = sqrt(2 + L)
L^2 = 2 + L
L^2 - L - 2 = 0
(L - 2)(L + 1) = 0.
Since x_n > 0 for all n, L = 2.`
  },
  {
    id: "PROG_Q68",
    questionNumber: 68,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Find the value of the double summation: S = Σ_{i=1}^n Σ_{j=1}^n (i · j).`,
    options: [
      { key: "A", text: "[n(n + 1) / 2]^2" },
      { key: "B", text: "n^2(n + 1)(2n + 1) / 6" },
      { key: "C", text: "n(n + 1)(n + 2) / 6" },
      { key: "D", text: "n^3(n + 1) / 4" }
    ],
    correctAnswer: "A",
    solution: `S = (Σ_{i=1}^n i) · (Σ_{j=1}^n j) = [n(n + 1) / 2] · [n(n + 1) / 2] = [n(n + 1) / 2]^2.`
  },
  {
    id: "PROG_Q69",
    questionNumber: 69,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Find the value of the double summation with strictly inequality condition: S = Σ_{1 ≤ i < j ≤ n} (i · j).`,
    options: [
      { key: "A", text: "(1/2) [ (Σ i)^2 - Σ i^2 ]" },
      { key: "B", text: "(1/2) [ (Σ i)^2 + Σ i^2 ]" },
      { key: "C", text: "[Σ i]^2 - Σ i^2" },
      { key: "D", text: "Σ i^3" }
    ],
    correctAnswer: "A",
    solution: `Identity: (i_1 + i_2 + ... + i_n)^2 = Σ i^2 + 2 Σ_{i < j} (i j).
Thus Σ_{i < j} (i j) = (1/2) [ (Σ_{i=1}^n i)^2 - Σ_{i=1}^n i^2 ].`
  },
  {
    id: "PROG_Q70",
    questionNumber: 70,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Evaluate the product: P = (1 - 1/2^2)(1 - 1/3^2)(1 - 1/4^2) ... (1 - 1/n^2).`,
    options: [
      { key: "A", text: "(n + 1) / (2n)" },
      { key: "B", text: "n / (n + 1)" },
      { key: "C", text: "(n - 1) / (2n)" },
      { key: "D", text: "1 / (2n)" }
    ],
    correctAnswer: "A",
    solution: `Each term 1 - 1/k^2 = (k - 1)(k + 1) / k^2.
Product = [ (1·3 / 2^2) × (2·4 / 3^2) × (3·5 / 4^2) × ... × ((n-1)(n+1) / n^2) ]
Telescoping left and right factors:
= (1/2) × [(n + 1) / n] = (n + 1) / (2n).`
  },
  {
    id: "PROG_Q71",
    questionNumber: 71,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Evaluate the limit as n -> ∞ of the product P_n = (1 - 1/2^2)(1 - 1/3^2)...(1 - 1/n^2).`,
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1/4" },
      { key: "C", text: "1/2" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "C",
    solution: `P_n = (n + 1) / (2n) = 1/2 + 1/(2n).
As n -> ∞, lim P_n = 1/2.`
  },
  {
    id: "PROG_Q72",
    questionNumber: 72,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Find the sum to infinity: S = 1/1! + 2/2! + 3/3! + 4/4! + ...`,
    options: [
      { key: "A", text: "e - 1" },
      { key: "B", text: "e" },
      { key: "C", text: "2e" },
      { key: "D", text: "e + 1" }
    ],
    correctAnswer: "B",
    solution: `T_n = n / n! = 1 / (n - 1)!.
Sum = 1/0! + 1/1! + 1/2! + 1/3! + ...
By definition of exponential constant, this sum is equal to e.`
  },
  {
    id: "PROG_Q73",
    questionNumber: 73,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Find the sum to infinity: S = 1^2/1! + 2^2/2! + 3^2/3! + 4^2/4! + ...`,
    options: [
      { key: "A", text: "e" },
      { key: "B", text: "2e" },
      { key: "C", text: "3e" },
      { key: "D", text: "5e" }
    ],
    correctAnswer: "B",
    solution: `n^2 = n(n - 1) + n.
T_n = [n(n - 1)] / n! + n / n! = 1 / (n - 2)! + 1 / (n - 1)!.
Summing from n = 1 to ∞ gives e + e = 2e.`
  },
  {
    id: "PROG_Q74",
    questionNumber: 74,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Find the coefficient of x^n in the expansion of 1 / [(1 - x)(1 - 2x)].`,
    options: [
      { key: "A", text: "2^(n+1) - 1" },
      { key: "B", text: "2^n - 1" },
      { key: "C", text: "2^(n+1) + 1" },
      { key: "D", text: "2^n + 1" }
    ],
    correctAnswer: "A",
    solution: `Partial fractions:
1 / [(1 - x)(1 - 2x)] = 2 / (1 - 2x) - 1 / (1 - x).
Expanding as geometric series:
= 2 Σ (2x)^n - Σ x^n = Σ [2 · 2^n - 1] x^n = Σ [2^(n+1) - 1] x^n.
Coefficient of x^n is 2^(n+1) - 1.`
  },
  {
    id: "PROG_Q75",
    questionNumber: 75,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `If a, b, c are in AP, b, c, d are in GP, and c, d, e are in HP, prove that a, c, e are in:`,
    options: [
      { key: "A", text: "AP" },
      { key: "B", text: "GP" },
      { key: "C", text: "HP" },
      { key: "D", text: "None of these" }
    ],
    correctAnswer: "B",
    solution: `a, b, c in AP => b = (a + c)/2.
b, c, d in GP => c^2 = bd => d = c^2 / b = 2c^2 / (a + c).
c, d, e in HP => d = 2ce / (c + e).
Equating both expressions for d:
2c^2 / (a + c) = 2ce / (c + e)
c(c + e) = e(a + c)
c^2 + ce = ae + ce
c^2 = ae.
Therefore, a, c, e are in Geometric Progression (GP).`
  },
  {
    id: "PROG_Q76",
    questionNumber: 76,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Find the sum of the series: S = 1/(1·4) + 1/(4·7) + 1/(7·10) + ... + 1/((3n - 2)(3n + 1)).`,
    options: [
      { key: "A", text: "n / (3n + 1)" },
      { key: "B", text: "(n + 1) / (3n + 1)" },
      { key: "C", text: "1 / (3n + 1)" },
      { key: "D", text: "3n / (3n + 1)" }
    ],
    correctAnswer: "A",
    solution: `T_k = (1/3) [ 1/(3k - 2) - 1/(3k + 1) ].
Summing from k = 1 to n:
S = (1/3) [ 1 - 1/(3n + 1) ] = (1/3) [ 3n / (3n + 1) ] = n / (3n + 1).`
  },
  {
    id: "PROG_Q77",
    questionNumber: 77,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `If S_n = Σ_{k=1}^n k! · k, find a closed-form formula for S_n.`,
    options: [
      { key: "A", text: "(n + 1)! - 1" },
      { key: "B", text: "(n + 1)! + 1" },
      { key: "C", text: "(n + 2)! - 2" },
      { key: "D", text: "n · n!" }
    ],
    correctAnswer: "A",
    solution: `k! · k = k! · [(k + 1) - 1] = (k + 1)! - k!.
Summing from k = 1 to n:
S_n = (2! - 1!) + (3! - 2!) + ... + ((n + 1)! - n!) = (n + 1)! - 1! = (n + 1)! - 1.`
  },
  {
    id: "PROG_Q78",
    questionNumber: 78,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `If the sum of an AP of 2n + 1 terms is S, what is the middle term?`,
    options: [
      { key: "A", text: "S / n" },
      { key: "B", text: "S / (2n + 1)" },
      { key: "C", text: "S / (2n - 1)" },
      { key: "D", text: "S / (n + 1)" }
    ],
    correctAnswer: "B",
    solution: `The sum of an AP with an odd number of terms N is always equal to N × (middle term).
Here N = 2n + 1.
S = (2n + 1) × T_{n+1}
Middle term T_{n+1} = S / (2n + 1).`
  },
  {
    id: "PROG_Q79",
    questionNumber: 79,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `Find the sum of the series: S = 1^4 + 2^4 + 3^4 + ... + n^4.`,
    options: [
      { key: "A", text: "n(n + 1)(2n + 1)(3n^2 + 3n - 1) / 30" },
      { key: "B", text: "n(n + 1)(2n + 1)(3n^2 + 2n + 1) / 30" },
      { key: "C", text: "n^2(n + 1)^2(2n + 1) / 24" },
      { key: "D", text: "n(n + 1)(n + 2)(3n + 1) / 24" }
    ],
    correctAnswer: "A",
    solution: `Standard sum of 4th powers of first n natural numbers:
Σ n^4 = n(n + 1)(2n + 1)(3n^2 + 3n - 1) / 30.`
  },
  {
    id: "PROG_Q80",
    questionNumber: 80,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Hard",
    question: `If x + y + z = 1 (where x, y, z > 0), what is the minimum value of (1/x + 1/y + 1/z)?`,
    options: [
      { key: "A", text: "6" },
      { key: "B", text: "9" },
      { key: "C", text: "12" },
      { key: "D", text: "15" }
    ],
    correctAnswer: "B",
    solution: `Using AM-HM inequality:
(x + y + z) / 3 ≥ 3 / (1/x + 1/y + 1/z)
1/3 ≥ 3 / (1/x + 1/y + 1/z)
1/x + 1/y + 1/z ≥ 9.
Minimum value is 9 (achieved when x = y = z = 1/3).`
  }
];
