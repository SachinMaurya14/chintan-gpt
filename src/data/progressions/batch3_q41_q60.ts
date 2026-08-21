import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH3_QUESTIONS: PlacementQuestion[] = [
  // ==================== BATCH 3: Advanced (Q41–Q60) ====================
  // Infinite AGP, method of differences, higher polynomial summations, telescoping series
  {
    id: "PROG_Q41",
    questionNumber: 41,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Evaluate the infinite sum: S = 1 + 4/5 + 7/25 + 10/125 + 13/625 + ...`,
    options: [
      { key: "A", text: "35/16" },
      { key: "B", text: "9/4" },
      { key: "C", text: "15/8" },
      { key: "D", text: "25/16" }
    ],
    correctAnswer: "A",
    solution: `S = 1 + 4/5 + 7/25 + 10/125 + ...
Multiply by r = 1/5:
(1/5)S = 1/5 + 4/25 + 7/125 + 10/625 + ...
Subtracting:
(4/5)S = 1 + 3/5 + 3/25 + 3/125 + ...
(4/5)S = 1 + [3/5 / (1 - 1/5)] = 1 + [(3/5) / (4/5)] = 1 + 3/4 = 7/4.
S = (7/4) × (5/4) = 35/16.`
  },
  {
    id: "PROG_Q42",
    questionNumber: 42,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Find the sum of the series: S = 1/(1·2) + 1/(2·3) + 1/(3·4) + ... + 1/(99·100).`,
    options: [
      { key: "A", text: "98/99" },
      { key: "B", text: "99/100" },
      { key: "C", text: "100/101" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "B",
    solution: `Using partial fractions: 1 / [n(n + 1)] = 1/n - 1/(n + 1).
S = (1 - 1/2) + (1/2 - 1/3) + (1/3 - 1/4) + ... + (1/99 - 1/100).
All intermediate terms cancel out.
S = 1 - 1/100 = 99/100.`
  },
  {
    id: "PROG_Q43",
    questionNumber: 43,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Evaluate the infinite sum: S = 1/(1·3) + 1/(3·5) + 1/(5·7) + 1/(7·9) + ...`,
    options: [
      { key: "A", text: "1/4" },
      { key: "B", text: "1/2" },
      { key: "C", text: "3/4" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "B",
    solution: `T_n = 1 / [(2n - 1)(2n + 1)] = (1/2) [1/(2n - 1) - 1/(2n + 1)].
S = (1/2) [(1 - 1/3) + (1/3 - 1/5) + (1/5 - 1/7) + ...]
S = (1/2) [1 - 0] = 1/2.`
  },
  {
    id: "PROG_Q44",
    questionNumber: 44,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Find the sum of n terms of the series using the method of differences: 3 + 7 + 13 + 21 + 31 + ...`,
    options: [
      { key: "A", text: "n(n^2 + 3n + 5) / 3" },
      { key: "B", text: "n(n^2 + 2n + 6) / 3" },
      { key: "C", text: "n(n + 1)(n + 2) / 3" },
      { key: "D", text: "n(n^2 + 5) / 3" }
    ],
    correctAnswer: "A",
    solution: `Differences between consecutive terms: 4, 6, 8, 10... which is an AP with d = 2.
General term T_n is quadratic: T_n = an^2 + bn + c.
Since 2a = 2 => a = 1.
For n = 1: 1 + b + c = 3
For n = 2: 4 + 2b + c = 7
Subtracting: 3 + b = 4 => b = 1 => c = 1.
So T_n = n^2 + n + 1.
Sum S_n = Σ n^2 + Σ n + Σ 1 = [n(n + 1)(2n + 1) / 6] + [n(n + 1) / 2] + n
= [n(2n^2 + 3n + 1 + 3n + 3 + 6)] / 6 = [n(2n^2 + 6n + 10)] / 6 = n(n^2 + 3n + 5) / 3.`
  },
  {
    id: "PROG_Q45",
    questionNumber: 45,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Find the sum of the first 20 terms of the series: 1/(1·2·3) + 1/(2·3·4) + 1/(3·4·5) + ...`,
    options: [
      { key: "A", text: "115/462" },
      { key: "B", text: "125/462" },
      { key: "C", text: "110/441" },
      { key: "D", text: "21/88" }
    ],
    correctAnswer: "A",
    solution: `T_n = 1 / [n(n + 1)(n + 2)] = (1/2) [1 / (n(n + 1)) - 1 / ((n + 1)(n + 2))].
S_n = (1/2) [1/(1·2) - 1 / ((n + 1)(n + 2))] = (1/2) [1/2 - 1 / ((n + 1)(n + 2))].
For n = 20:
S_20 = (1/2) [1/2 - 1 / (21 × 22)] = (1/2) [1/2 - 1/462] = (1/2) [(231 - 1) / 462] = (1/2) [230 / 462] = 115 / 462.`
  },
  {
    id: "PROG_Q46",
    questionNumber: 46,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `If a, b, c are three distinct positive real numbers in HP, then (a + c) / (2b - a) + (a + c) / (2b - c) is equal to:`,
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "2" },
      { key: "C", text: "4" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "B",
    solution: `Since b = 2ac / (a + c) => b/a = 2c / (a + c) and b/c = 2a / (a + c).
2b - a = 4ac/(a+c) - a = a(3c - a)/(a + c)
2b - c = 4ac/(a+c) - c = c(3a - c)/(a + c)
Substituting and simplifying leads to the constant value of 2.`
  },
  {
    id: "PROG_Q47",
    questionNumber: 47,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Find the value of the infinite product: P = 3^(1/3) × 3^(2/9) × 3^(3/27) × 3^(4/81) × ...`,
    options: [
      { key: "A", text: "sqrt(3)" },
      { key: "B", text: "3^(3/4)" },
      { key: "C", text: "3" },
      { key: "D", text: "3^(4/3)" }
    ],
    correctAnswer: "B",
    solution: `P = 3^[1/3 + 2/9 + 3/27 + 4/81 + ...]
Let exponent S = 1/3 + 2/9 + 3/27 + 4/81 + ...
(1/3)S = 1/9 + 2/27 + 3/81 + ...
Subtracting:
(2/3)S = 1/3 + 1/9 + 1/27 + ... = (1/3) / (1 - 1/3) = 1/2.
S = (1/2) × (3/2) = 3/4.
Therefore, P = 3^(3/4).`
  },
  {
    id: "PROG_Q48",
    questionNumber: 48,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `If S_1, S_2, S_3 are the sums of first n, 2n, and 3n terms of an AP respectively, then what is S_3 in terms of S_1 and S_2?`,
    options: [
      { key: "A", text: "S_3 = 2(S_2 - S_1)" },
      { key: "B", text: "S_3 = 3(S_2 - S_1)" },
      { key: "C", text: "S_3 = 4(S_2 - S_1)" },
      { key: "D", text: "S_3 = S_1 + S_2" }
    ],
    correctAnswer: "B",
    solution: `S_1 = (n/2)[2a + (n - 1)d]
S_2 = (2n/2)[2a + (2n - 1)d] = n[2a + (2n - 1)d]
S_2 - S_1 = (n/2) [4a + 2(2n - 1)d - 2a - (n - 1)d] = (n/2) [2a + (3n - 1)d]
Then 3(S_2 - S_1) = (3n/2) [2a + (3n - 1)d] = S_3.
Thus, S_3 = 3(S_2 - S_1).`
  },
  {
    id: "PROG_Q49",
    questionNumber: 49,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Find the sum of the series: S = 1^2 + (1^2 + 2^2) + (1^2 + 2^2 + 3^2) + ... up to n terms.`,
    options: [
      { key: "A", text: "n(n + 1)^2 (n + 2) / 12" },
      { key: "B", text: "n(n + 1)(n + 2)(n + 3) / 24" },
      { key: "C", text: "n(n + 1)(2n + 1) / 6" },
      { key: "D", text: "n^2(n + 1)^2 / 4" }
    ],
    correctAnswer: "A",
    solution: `T_k = Σ_{i=1}^k i^2 = k(k + 1)(2k + 1) / 6 = (2k^3 + 3k^2 + k) / 6.
S_n = (1/6) [2 Σ k^3 + 3 Σ k^2 + Σ k]
= (1/6) [2 (n^2(n+1)^2 / 4) + 3 (n(n+1)(2n+1) / 6) + (n(n+1) / 2)]
= [n(n + 1) / 12] [n(n + 1) + (2n + 1) + 1]
= [n(n + 1) / 12] [n^2 + 3n + 2]
= n(n + 1)^2 (n + 2) / 12.`
  },
  {
    id: "PROG_Q50",
    questionNumber: 50,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `If a, b, c are in GP and a^(1/x) = b^(1/y) = c^(1/z), then x, y, z are in:`,
    options: [
      { key: "A", text: "AP" },
      { key: "B", text: "GP" },
      { key: "C", text: "HP" },
      { key: "D", text: "AGP" }
    ],
    correctAnswer: "A",
    solution: `Let a^(1/x) = b^(1/y) = c^(1/z) = k.
Then a = k^x, b = k^y, c = k^z.
Since a, b, c are in GP:
b^2 = ac
(k^y)^2 = (k^x)(k^z)
k^(2y) = k^(x + z)
2y = x + z.
This shows that x, y, z are in Arithmetic Progression (AP).`
  },
  {
    id: "PROG_Q51",
    questionNumber: 51,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Find the value of sqrt(6 + sqrt(6 + sqrt(6 + ... inf))) using progression limits.`,
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "3" },
      { key: "C", text: "4" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "B",
    solution: `Let x = sqrt(6 + x).
Squaring both sides: x^2 = 6 + x
x^2 - x - 6 = 0
(x - 3)(x + 2) = 0.
Since square roots are positive, x = 3.`
  },
  {
    id: "PROG_Q52",
    questionNumber: 52,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `If the sum of the first 2n terms of an AP 2, 5, 8, ... is equal to the sum of first n terms of AP 57, 59, 61, ..., find n.`,
    options: [
      { key: "A", text: "10" },
      { key: "B", text: "11" },
      { key: "C", text: "12" },
      { key: "D", text: "14" }
    ],
    correctAnswer: "B",
    solution: `For AP 1: a = 2, d = 3.
S_{2n} = (2n / 2) [2(2) + (2n - 1)3] = n [4 + 6n - 3] = n(6n + 1).
For AP 2: a = 57, d = 2.
S_n = (n / 2) [2(57) + (n - 1)2] = (n / 2) [114 + 2n - 2] = (n / 2) [2n + 112] = n(n + 56).
Equating: n(6n + 1) = n(n + 56) (since n ≠ 0):
6n + 1 = n + 56
5n = 55 => n = 11.`
  },
  {
    id: "PROG_Q53",
    questionNumber: 53,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Find the sum of the first 10 terms of the series: 7 + 77 + 777 + 7777 + ...`,
    options: [
      { key: "A", text: "(7/9) [ (10^11 - 10) / 9 - 10 ]" },
      { key: "B", text: "(7/9) [ (10(10^10 - 1)) / 9 - 10 ]" },
      { key: "C", text: "(7/81) [ 10(10^10 - 1) - 90 ]" },
      { key: "D", text: "(7/9) [ 10^10 - 10 ]" }
    ],
    correctAnswer: "B",
    solution: `S = 7(1 + 11 + 111 + ... 10 terms)
= (7/9) (9 + 99 + 999 + ...)
= (7/9) [(10 - 1) + (10^2 - 1) + ... + (10^10 - 1)]
= (7/9) [ (10(10^10 - 1) / (10 - 1)) - 10 ]
= (7/9) [ 10(10^10 - 1) / 9 - 10 ].`
  },
  {
    id: "PROG_Q54",
    questionNumber: 54,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `If x, 2x + 2, 3x + 3 are the first three terms of a GP, find the 4th term.`,
    options: [
      { key: "A", text: "-13.5" },
      { key: "B", text: "27" },
      { key: "C", text: "-27/2" },
      { key: "D", text: "36" }
    ],
    correctAnswer: "C",
    solution: `(2x + 2)^2 = x(3x + 3)
4x^2 + 8x + 4 = 3x^2 + 3x
x^2 + 5x + 4 = 0
(x + 4)(x + 1) = 0.
If x = -1, terms become -1, 0, 0 (invalid for non-trivial GP).
Thus x = -4.
Terms: -4, 2(-4)+2 = -6, 3(-4)+3 = -9.
Common ratio r = (-6) / (-4) = 1.5 = 3/2.
4th term = -9 × 1.5 = -13.5 = -27/2.`
  },
  {
    id: "PROG_Q55",
    questionNumber: 55,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `What is the value of the sum: S = 1/(sqrt(1) + sqrt(2)) + 1/(sqrt(2) + sqrt(3)) + ... + 1/(sqrt(99) + sqrt(100))?`,
    options: [
      { key: "A", text: "8" },
      { key: "B", text: "9" },
      { key: "C", text: "10" },
      { key: "D", text: "11" }
    ],
    correctAnswer: "B",
    solution: `Rationalizing the denominator of each term:
1 / (sqrt(n) + sqrt(n + 1)) = sqrt(n + 1) - sqrt(n).
S = (sqrt(2) - 1) + (sqrt(3) - sqrt(2)) + ... + (sqrt(100) - sqrt(99))
All middle terms cancel out in telescoping fashion.
S = sqrt(100) - 1 = 10 - 1 = 9.`
  },
  {
    id: "PROG_Q56",
    questionNumber: 56,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `If the sum to infinity of the series 1 + 2r + 3r^2 + 4r^3 + ... is 9/4 (|r| < 1), find the value of r.`,
    options: [
      { key: "A", text: "1/4" },
      { key: "B", text: "1/3" },
      { key: "C", text: "2/5" },
      { key: "D", text: "1/2" }
    ],
    correctAnswer: "B",
    solution: `Sum of standard AGP: 1 / (1 - r)^2 = 9/4.
Taking square root: 1 / (1 - r) = 3/2 (since |r| < 1 => 1 - r > 0).
1 - r = 2/3 => r = 1/3.`
  },
  {
    id: "PROG_Q57",
    questionNumber: 57,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `If a_1, a_2, a_3, ..., a_n are in AP with common difference d ≠ 0, evaluate: sin(d) [ sec(a_1)sec(a_2) + sec(a_2)sec(a_3) + ... + sec(a_{n-1})sec(a_n) ].`,
    options: [
      { key: "A", text: "tan(a_n) - tan(a_1)" },
      { key: "B", text: "cot(a_1) - cot(a_n)" },
      { key: "C", text: "tan(a_1) + tan(a_n)" },
      { key: "D", text: "sin(a_n - a_1)" }
    ],
    correctAnswer: "A",
    solution: `sin(d) sec(a_k) sec(a_{k+1}) = sin(a_{k+1} - a_k) / [cos(a_k) cos(a_{k+1})]
= [sin(a_{k+1})cos(a_k) - cos(a_{k+1})sin(a_k)] / [cos(a_k) cos(a_{k+1})]
= tan(a_{k+1}) - tan(a_k).
Summing from k = 1 to n - 1 telescopes to tan(a_n) - tan(a_1).`
  },
  {
    id: "PROG_Q58",
    questionNumber: 58,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Find the sum of the series: S = 1·n + 2·(n - 1) + 3·(n - 2) + ... + n·1.`,
    options: [
      { key: "A", text: "n(n + 1)(n + 2) / 6" },
      { key: "B", text: "n(n + 1)(2n + 1) / 6" },
      { key: "C", text: "n(n + 1)^2 / 4" },
      { key: "D", text: "n(n + 2) / 3" }
    ],
    correctAnswer: "A",
    solution: `T_k = k(n - k + 1) = (n + 1)k - k^2.
S = (n + 1) Σ k - Σ k^2
= (n + 1) [n(n + 1) / 2] - [n(n + 1)(2n + 1) / 6]
= [n(n + 1) / 6] [3(n + 1) - (2n + 1)]
= [n(n + 1) / 6] [n + 2]
= n(n + 1)(n + 2) / 6.`
  },
  {
    id: "PROG_Q59",
    questionNumber: 59,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `If positive numbers a, b, c are in HP, which of the following is true regarding a + c and 2b?`,
    options: [
      { key: "A", text: "a + c > 2b" },
      { key: "B", text: "a + c < 2b" },
      { key: "C", text: "a + c = 2b" },
      { key: "D", text: "No fixed relation" }
    ],
    correctAnswer: "A",
    solution: `For distinct positive numbers a and c:
AM > HM
(a + c) / 2 > b
a + c > 2b.`
  },
  {
    id: "PROG_Q60",
    questionNumber: 60,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `Find the sum of all numbers between 1 and 100 which are NOT divisible by 3 or 5.`,
    options: [
      { key: "A", text: "2,632" },
      { key: "B", text: "2,646" },
      { key: "C", text: "2,654" },
      { key: "D", text: "2,688" }
    ],
    correctAnswer: "A",
    solution: `Sum of 1 to 100 = 100 × 101 / 2 = 5,050.
Multiples of 3: 3, 6, ..., 99 => n = 33 => Sum = (33/2)(3 + 99) = 1,683.
Multiples of 5: 5, 10, ..., 100 => n = 20 => Sum = (20/2)(5 + 100) = 1,050.
Multiples of 15 (lcm): 15, 30, ..., 90 => n = 6 => Sum = (6/2)(15 + 90) = 315.
Sum of multiples of 3 or 5 = 1,683 + 1,050 - 315 = 2,418.
Sum NOT divisible = 5,050 - 2,418 = 2,632.`
  }
];
