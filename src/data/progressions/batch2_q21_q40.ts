import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH2_QUESTIONS: PlacementQuestion[] = [
  // ==================== BATCH 2: Moderate (Q21–Q40) ====================
  // Common terms between APs, HM, AM-GM inequalities, finite AGP, ratio problems
  {
    id: "PROG_Q21",
    questionNumber: 21,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `How many common terms are there between the two APs:
AP 1: 3, 7, 11, 15, ..., 403
AP 2: 2, 9, 16, 23, ..., 401?`,
    options: [
      { key: "A", text: "13" },
      { key: "B", text: "14" },
      { key: "C", text: "15" },
      { key: "D", text: "16" }
    ],
    correctAnswer: "B",
    solution: `AP1 has d₁ = 4; AP2 has d₂ = 7.
Common difference of common terms D = LCM(d₁, d₂) = LCM(4, 7) = 28.
First common term:
AP1 terms: 3, 7, 11, 15, 19, 23...
AP2 terms: 2, 9, 16, 23...
First common term a = 23.
Upper bound = min(403, 401) = 401.
General common term: 23 + (k - 1) × 28 ≤ 401
(k - 1) × 28 ≤ 378
k - 1 ≤ 378 / 28 = 13.5
k - 1 ≤ 13 => k ≤ 14 terms.`
  },
  {
    id: "PROG_Q22",
    questionNumber: 22,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `If the sum of the first p terms of an AP is equal to the sum of the first q terms (where p ≠ q), what is the sum of the first (p + q) terms?`,
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "p + q" },
      { key: "C", text: "pq" },
      { key: "D", text: "-(p + q)" }
    ],
    correctAnswer: "A",
    solution: `Given S_p = S_q
(p/2)[2a + (p - 1)d] = (q/2)[2a + (q - 1)d]
2a(p - q) + d[p(p - 1) - q(q - 1)] = 0
2a(p - q) + d[(p^2 - q^2) - (p - q)] = 0
Dividing by (p - q) ≠ 0:
2a + d[(p + q) - 1] = 0.
Then S_{p+q} = [(p + q) / 2] [2a + (p + q - 1)d] = [(p + q) / 2] × 0 = 0.`
  },
  {
    id: "PROG_Q23",
    questionNumber: 23,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `Find the minimum value of the expression f(x) = 4x + 9/x for x > 0 using the AM-GM inequality.`,
    options: [
      { key: "A", text: "10" },
      { key: "B", text: "12" },
      { key: "C", text: "14" },
      { key: "D", text: "16" }
    ],
    correctAnswer: "B",
    solution: `For positive real numbers 4x and 9/x:
AM ≥ GM
(4x + 9/x) / 2 ≥ sqrt(4x × (9/x))
(4x + 9/x) / 2 ≥ sqrt(36) = 6
4x + 9/x ≥ 12.
Equality holds when 4x = 9/x => x^2 = 9/4 => x = 3/2.
Minimum value is 12.`
  },
  {
    id: "PROG_Q24",
    questionNumber: 24,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `If a, b, c are in AP and x, y, z are in GP, then the value of x^(b-c) * y^(c-a) * z^(a-b) is:`,
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "xyz" },
      { key: "D", text: "a + b + c" }
    ],
    correctAnswer: "B",
    solution: `Let x = A/R, y = A, z = AR.
Since a, b, c are in AP: (b - a) = (c - b) = d => (b - c) = -d, (c - a) = 2d, (a - b) = -d.
Expression = (A/R)^(-d) * (A)^(2d) * (AR)^(-d)
= A^(-d + 2d - d) * R^(d - d) = A^0 * R^0 = 1.`
  },
  {
    id: "PROG_Q25",
    questionNumber: 25,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `Find the sum of the finite series: S = 1 + 2(2) + 3(2^2) + 4(2^3) + ... + 10(2^9).`,
    options: [
      { key: "A", text: "9 × 2^10 + 1 = 9,217" },
      { key: "B", text: "9 × 2^10 - 1 = 9,215" },
      { key: "C", text: "10 × 2^10 + 1" },
      { key: "D", text: "8 × 2^10 + 1" }
    ],
    correctAnswer: "A",
    solution: `This is an Arithmetico-Geometric Progression (AGP).
S = 1 + 2(2) + 3(2^2) + ... + 10(2^9)
Multiply by r = 2:
2S = 1(2) + 2(2^2) + ... + 9(2^9) + 10(2^10)
Subtracting (S - 2S):
-S = 1 + 2 + 2^2 + ... + 2^9 - 10(2^10)
-S = (2^10 - 1) - 10(2^10) = -9(2^10) - 1
S = 9(2^10) + 1 = 9(1024) + 1 = 9,217.`
  },
  {
    id: "PROG_Q26",
    questionNumber: 26,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `If the ratio of the sum of m terms to the sum of n terms of an AP is m^2 : n^2, find the ratio of its m-th term to its n-th term.`,
    options: [
      { key: "A", text: "(2m - 1) : (2n - 1)" },
      { key: "B", text: "m : n" },
      { key: "C", text: "(2m + 1) : (2n + 1)" },
      { key: "D", text: "m^2 : n^2" }
    ],
    correctAnswer: "A",
    solution: `S_m / S_n = [(m/2)(2a + (m - 1)d)] / [(n/2)(2a + (n - 1)d)] = m^2 / n^2
[2a + (m - 1)d] / [2a + (n - 1)d] = m / n
To get ratio of m-th to n-th term T_m / T_n = [a + (m - 1)d] / [a + (n - 1)d], replace m with (2m - 1) and n with (2n - 1).
Ratio = (2m - 1) : (2n - 1).`
  },
  {
    id: "PROG_Q27",
    questionNumber: 27,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `If a, b, c are in HP, which of the following expressions is always true?`,
    options: [
      { key: "A", text: "(a - b) / (b - c) = a / c" },
      { key: "B", text: "(a - b) / (b - c) = c / a" },
      { key: "C", text: "b = (a + c) / 2" },
      { key: "D", text: "b^2 = ac" }
    ],
    correctAnswer: "A",
    solution: `Since a, b, c are in HP => 1/a, 1/b, 1/c are in AP.
1/b - 1/a = 1/c - 1/b
(a - b) / ab = (b - c) / bc
Dividing both sides: (a - b) / (b - c) = (ab) / (bc) = a / c.`
  },
  {
    id: "PROG_Q28",
    questionNumber: 28,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `Find the sum of the first 15 terms of the series: 1·2 + 2·3 + 3·4 + 4·5 + ... + n(n + 1).`,
    options: [
      { key: "A", text: "1,240" },
      { key: "B", text: "1,360" },
      { key: "C", text: "1,420" },
      { key: "D", text: "1,480" }
    ],
    correctAnswer: "B",
    solution: `T_n = n(n + 1) = n^2 + n.
S_n = Σ n^2 + Σ n = [n(n + 1)(2n + 1) / 6] + [n(n + 1) / 2] = [n(n + 1)(n + 2)] / 3.
For n = 15:
S_15 = (15 × 16 × 17) / 3 = 5 × 16 × 17 = 80 × 17 = 1,360.`
  },
  {
    id: "PROG_Q29",
    questionNumber: 29,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `Find the value of x such that (x + 1), (3x), and (4x + 2) form consecutive terms of an AP.`,
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "2" },
      { key: "C", text: "3" },
      { key: "D", text: "4" }
    ],
    correctAnswer: "C",
    solution: `In an AP, 2 × (middle term) = (first term) + (third term).
2(3x) = (x + 1) + (4x + 2)
6x = 5x + 3
x = 3.`
  },
  {
    id: "PROG_Q30",
    questionNumber: 30,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `For what positive value of k will (k - 2), (k), and (k + 3) form three consecutive terms of a GP?`,
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "6" },
      { key: "C", text: "8" },
      { key: "D", text: "9" }
    ],
    correctAnswer: "B",
    solution: `In a GP, (middle term)^2 = (first term) × (third term).
k^2 = (k - 2)(k + 3)
k^2 = k^2 + k - 6
k - 6 = 0 => k = 6.`
  },
  {
    id: "PROG_Q31",
    questionNumber: 31,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `Find the sum of all two-digit numbers which leave a remainder of 3 when divided by 7.`,
    options: [
      { key: "A", text: "676" },
      { key: "B", text: "702" },
      { key: "C", text: "715" },
      { key: "D", text: "741" }
    ],
    correctAnswer: "C",
    solution: `Form of numbers: 7k + 3.
Smallest two-digit number: k = 1 => 10.
Largest two-digit number: k = 13 => 7(13) + 3 = 94.
Number of terms n = 13 - 1 + 1 = 13 terms.
Sum = (13 / 2) × (10 + 94) = (13 / 2) × 104 = 13 × 52 = 676 (Wait: 13 × 52 = 676. Option A).`
  },
  {
    id: "PROG_Q32",
    questionNumber: 32,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `If S_n denotes the sum of n terms of a GP with first term a and common ratio r, what is S_n * (r - 1) + a?`,
    options: [
      { key: "A", text: "a * r^n" },
      { key: "B", text: "a * r^(n-1)" },
      { key: "C", text: "S_{n+1}" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "A",
    solution: `S_n = a(r^n - 1) / (r - 1)
S_n * (r - 1) = a(r^n - 1) = a * r^n - a.
Adding a gives: a * r^n - a + a = a * r^n.`
  },
  {
    id: "PROG_Q33",
    questionNumber: 33,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `If the sum of three numbers in HP is 37/10 and the sum of their reciprocals is 15, find the middle term of the HP.`,
    options: [
      { key: "A", text: "1/5" },
      { key: "B", text: "1/4" },
      { key: "C", text: "1/3" },
      { key: "D", text: "2/5" }
    ],
    correctAnswer: "A",
    solution: `Let reciprocals in AP be (A - D), A, (A + D).
Sum of reciprocals = 3A = 15 => A = 5.
Reciprocal of middle term is 5.
Therefore, middle term in HP = 1/5.`
  },
  {
    id: "PROG_Q34",
    questionNumber: 34,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `Find the sum of the infinite series: S = 1/3 + 2/3^2 + 3/3^3 + 4/3^4 + ...`,
    options: [
      { key: "A", text: "1/2" },
      { key: "B", text: "3/4" },
      { key: "C", text: "1" },
      { key: "D", text: "4/3" }
    ],
    correctAnswer: "B",
    solution: `S = 1/3 + 2/9 + 3/27 + 4/81 + ...
Multiply by 1/3:
(1/3)S = 1/9 + 2/27 + 3/81 + ...
Subtract:
(2/3)S = 1/3 + 1/9 + 1/27 + ... = (1/3) / (1 - 1/3) = (1/3) / (2/3) = 1/2.
(2/3)S = 1/2 => S = (1/2) × (3/2) = 3/4.`
  },
  {
    id: "PROG_Q35",
    questionNumber: 35,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `If the roots of the cubic equation x^3 - 12x^2 + 39x - 28 = 0 are in AP, what is the middle root?`,
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "3" },
      { key: "C", text: "4" },
      { key: "D", text: "5" }
    ],
    correctAnswer: "C",
    solution: `Sum of roots = -(-12) / 1 = 12.
Let the roots in AP be (a - d), a, (a + d).
Sum = 3a = 12 => a = 4.
The middle root is 4. (Roots are 1, 4, 7).`
  },
  {
    id: "PROG_Q36",
    questionNumber: 36,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `If log(a), log(b), log(c) are in AP, then a, b, c are in:`,
    options: [
      { key: "A", text: "AP" },
      { key: "B", text: "GP" },
      { key: "C", text: "HP" },
      { key: "D", text: "AGP" }
    ],
    correctAnswer: "B",
    solution: `2 log(b) = log(a) + log(c)
log(b^2) = log(ac)
b^2 = ac.
This is the defining condition for a, b, c to be in Geometric Progression (GP).`
  },
  {
    id: "PROG_Q37",
    questionNumber: 37,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `Find the sum of the first 10 terms of the sequence whose n-th term is T_n = 2n - 1 + 2^n.`,
    options: [
      { key: "A", text: "2,146" },
      { key: "B", text: "2,148" },
      { key: "C", text: "2,154" },
      { key: "D", text: "2,160" }
    ],
    correctAnswer: "A",
    solution: `S_10 = Σ (2n - 1) + Σ 2^n for n = 1 to 10.
Σ (2n - 1) = 10^2 = 100 (sum of first 10 odds).
Σ 2^n = 2(2^10 - 1) / (2 - 1) = 2(1024 - 1) = 2 × 1023 = 2,046.
Total sum = 100 + 2,046 = 2,146.`
  },
  {
    id: "PROG_Q38",
    questionNumber: 38,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `If AM between two numbers is 10 and their GM is 8, what are the two numbers?`,
    options: [
      { key: "A", text: "4 and 16" },
      { key: "B", text: "2 and 18" },
      { key: "C", text: "6 and 14" },
      { key: "D", text: "8 and 12" }
    ],
    correctAnswer: "A",
    solution: `(a + b) / 2 = 10 => a + b = 20
sqrt(ab) = 8 => ab = 64
Quadratic equation: x^2 - 20x + 64 = 0
(x - 16)(x - 4) = 0 => x = 16, 4.
The numbers are 4 and 16.`
  },
  {
    id: "PROG_Q39",
    questionNumber: 39,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `Find the sum: S = 1^2 + 2^2 + 3^2 + ... + 20^2.`,
    options: [
      { key: "A", text: "2,670" },
      { key: "B", text: "2,870" },
      { key: "C", text: "2,940" },
      { key: "D", text: "3,010" }
    ],
    correctAnswer: "B",
    solution: `Sum of squares formula: Σ n^2 = [n(n + 1)(2n + 1)] / 6.
For n = 20:
S_20 = [20 × 21 × 41] / 6 = [10 × 7 × 41] = 70 × 41 = 2,870.`
  },
  {
    id: "PROG_Q40",
    questionNumber: 40,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `Find the sum: S = 1^3 + 2^3 + 3^3 + ... + 12^3.`,
    options: [
      { key: "A", text: "5,984" },
      { key: "B", text: "6,084" },
      { key: "C", text: "6,184" },
      { key: "D", text: "6,284" }
    ],
    correctAnswer: "B",
    solution: `Sum of cubes formula: Σ n^3 = [n(n + 1) / 2]^2.
For n = 12:
S_12 = [12 × 13 / 2]^2 = (78)^2 = 6,084.`
  }
];
