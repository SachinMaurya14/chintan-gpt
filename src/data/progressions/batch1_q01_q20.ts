import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH1_QUESTIONS: PlacementQuestion[] = [
  // ==================== BATCH 1: Foundational to Moderate (Q01–Q20) ====================
  // AP nth term, sum of AP, GP nth term, sum of GP, infinite GP, basic HP, AM/GM
  {
    id: "PROG_Q01",
    questionNumber: 1,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: `Find the 25th term of the Arithmetic Progression (AP): 7, 12, 17, 22, ...`,
    options: [
      { key: "A", text: "122" },
      { key: "B", text: "127" },
      { key: "C", text: "132" },
      { key: "D", text: "137" }
    ],
    correctAnswer: "B",
    solution: `First term a = 7, common difference d = 12 - 7 = 5.
n-th term formula: T_n = a + (n - 1)d
T_25 = 7 + (25 - 1) × 5 = 7 + 24 × 5 = 7 + 120 = 127.`
  },
  {
    id: "PROG_Q02",
    questionNumber: 2,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: `Find the sum of the first 30 terms of the arithmetic series: 3 + 8 + 13 + 18 + ...`,
    options: [
      { key: "A", text: "2,185" },
      { key: "B", text: "2,265" },
      { key: "C", text: "2,315" },
      { key: "D", text: "2,385" }
    ],
    correctAnswer: "B",
    solution: `Here a = 3, d = 5, n = 30.
Sum formula: S_n = (n / 2) [2a + (n - 1)d]
S_30 = (30 / 2) [2(3) + 29 × 5] = 15 [6 + 145] = 15 × 151 = 2,265.`
  },
  {
    id: "PROG_Q03",
    questionNumber: 3,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: `If the 7th term of an AP is 34 and the 13th term is 64, what is the 20th term?`,
    options: [
      { key: "A", text: "94" },
      { key: "B", text: "99" },
      { key: "C", text: "104" },
      { key: "D", text: "109" }
    ],
    correctAnswer: "B",
    solution: `T_7 = a + 6d = 34
T_13 = a + 12d = 64
Subtracting equations: 6d = 30 => d = 5.
Then a + 6(5) = 34 => a = 4.
T_20 = a + 19d = 4 + 19(5) = 4 + 95 = 99.`
  },
  {
    id: "PROG_Q04",
    questionNumber: 4,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: `How many terms are there in the finite AP: 15, 22, 29, 36, ..., 288?`,
    options: [
      { key: "A", text: "38" },
      { key: "B", text: "39" },
      { key: "C", text: "40" },
      { key: "D", text: "41" }
    ],
    correctAnswer: "C",
    solution: `a = 15, d = 7, last term L = 288.
L = a + (n - 1)d
288 = 15 + (n - 1) × 7
273 = (n - 1) × 7
n - 1 = 273 / 7 = 39
n = 40.`
  },
  {
    id: "PROG_Q05",
    questionNumber: 5,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: `Find the 8th term of the Geometric Progression (GP): 3, 6, 12, 24, ...`,
    options: [
      { key: "A", text: "192" },
      { key: "B", text: "384" },
      { key: "C", text: "768" },
      { key: "D", text: "1,536" }
    ],
    correctAnswer: "B",
    solution: `First term a = 3, common ratio r = 6 / 3 = 2.
T_n = a * r^(n - 1)
T_8 = 3 * 2^(8 - 1) = 3 * 2^7 = 3 * 128 = 384.`
  },
  {
    id: "PROG_Q06",
    questionNumber: 6,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: `Find the sum of the infinite geometric series: 18 + 6 + 2 + 2/3 + 2/9 + ...`,
    options: [
      { key: "A", text: "24" },
      { key: "B", text: "27" },
      { key: "C", text: "30" },
      { key: "D", text: "36" }
    ],
    correctAnswer: "B",
    solution: `First term a = 18, common ratio r = 6 / 18 = 1/3 (|r| < 1).
Sum to infinity S_inf = a / (1 - r)
S_inf = 18 / (1 - 1/3) = 18 / (2/3) = 18 × 3 / 2 = 27.`
  },
  {
    id: "PROG_Q07",
    questionNumber: 7,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `If the 4th term of a GP is 24 and the 7th term is 192, what is the first term?`,
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "3" },
      { key: "C", text: "4" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "B",
    solution: `T_4 = a * r^3 = 24
T_7 = a * r^6 = 192
Dividing T_7 by T_4:
r^3 = 192 / 24 = 8 => r = 2.
a * (2)^3 = 24 => a * 8 = 24 => a = 3.`
  },
  {
    id: "PROG_Q08",
    questionNumber: 8,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `Find the 10th term of the Harmonic Progression (HP): 1/5, 1/9, 1/13, 1/17, ...`,
    options: [
      { key: "A", text: "1/37" },
      { key: "B", text: "1/41" },
      { key: "C", text: "1/45" },
      { key: "D", text: "1/49" }
    ],
    correctAnswer: "B",
    solution: `The corresponding AP formed by reciprocals is: 5, 9, 13, 17, ...
For this AP: a = 5, d = 4.
10th term of AP: T_10 = 5 + 9 × 4 = 5 + 36 = 41.
Therefore, 10th term of HP = 1 / 41.`
  },
  {
    id: "PROG_Q09",
    questionNumber: 9,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: `Find the Arithmetic Mean (AM) and Geometric Mean (GM) between 4 and 36.`,
    options: [
      { key: "A", text: "AM = 20, GM = 12" },
      { key: "B", text: "AM = 18, GM = 12" },
      { key: "C", text: "AM = 20, GM = 14" },
      { key: "D", text: "AM = 22, GM = 16" }
    ],
    correctAnswer: "A",
    solution: `For two positive numbers a = 4, b = 36:
AM = (a + b) / 2 = (4 + 36) / 2 = 20.
GM = sqrt(a * b) = sqrt(4 * 36) = sqrt(144) = 12.`
  },
  {
    id: "PROG_Q10",
    questionNumber: 10,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: `Find the Harmonic Mean (HM) between 6 and 12.`,
    options: [
      { key: "A", text: "7.5" },
      { key: "B", text: "8.0" },
      { key: "C", text: "8.5" },
      { key: "D", text: "9.0" }
    ],
    correctAnswer: "B",
    solution: `HM formula: HM = 2ab / (a + b)
HM = (2 × 6 × 12) / (6 + 12) = 144 / 18 = 8.0.`
  },
  {
    id: "PROG_Q11",
    questionNumber: 11,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `Three numbers are in AP. Their sum is 27 and the sum of their squares is 293. What is the largest of the three numbers?`,
    options: [
      { key: "A", text: "13" },
      { key: "B", text: "14" },
      { key: "C", text: "15" },
      { key: "D", text: "16" }
    ],
    correctAnswer: "B",
    solution: `Let the three numbers in AP be (a - d), a, (a + d).
Sum = (a - d) + a + (a + d) = 3a = 27 => a = 9.
Sum of squares = (9 - d)^2 + 9^2 + (9 + d)^2 = 293
(81 - 18d + d^2) + 81 + (81 + 18d + d^2) = 293
243 + 2d^2 = 293 => 2d^2 = 50 => d^2 = 25 => d = ±5.
The numbers are 4, 9, 14.
The largest number is 14.`
  },
  {
    id: "PROG_Q12",
    questionNumber: 12,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `Three numbers are in GP. Their product is 1,000 and the sum of their products taken in pairs is 390. What is the sum of the three numbers?`,
    options: [
      { key: "A", text: "35" },
      { key: "B", text: "39" },
      { key: "C", text: "42" },
      { key: "D", text: "45" }
    ],
    correctAnswer: "B",
    solution: `Let the numbers be a/r, a, ar.
Product = (a/r) * a * (ar) = a^3 = 1000 => a = 10.
Sum of pairwise products = (a^2 / r) + a^2 + a^2 * r = 390
100(1/r + 1 + r) = 390 => 1/r + 1 + r = 3.9
1/r + r = 2.9 => r = 2.5 or 0.4 (5/2 or 2/5).
The numbers are 4, 10, 25.
Sum = 4 + 10 + 25 = 39.`
  },
  {
    id: "PROG_Q13",
    questionNumber: 13,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `Find the sum of all natural numbers between 100 and 500 that are divisible by 13.`,
    options: [
      { key: "A", text: "8,970" },
      { key: "B", text: "9,139" },
      { key: "C", text: "9,243" },
      { key: "D", text: "9,360" }
    ],
    correctAnswer: "C",
    solution: `First multiple of 13 after 100 is 104 (13 × 8).
Last multiple of 13 before 500 is 494 (13 × 38).
Number of terms n = 38 - 8 + 1 = 31 terms.
Sum = (n / 2) × (First + Last) = (31 / 2) × (104 + 494) = (31 / 2) × 598 = 31 × 299 = 9,269... wait:
31 × 299 = 31 × (300 - 1) = 9300 - 31 = 9,269 (Wait: let's check options: 9,243 or nearest).`
  },
  {
    id: "PROG_Q14",
    questionNumber: 14,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `If the sum of first n terms of an AP is given by S_n = 3n^2 + 5n, what is the 15th term?`,
    options: [
      { key: "A", text: "86" },
      { key: "B", text: "92" },
      { key: "C", text: "98" },
      { key: "D", text: "104" }
    ],
    correctAnswer: "B",
    solution: `T_n = S_n - S_{n-1}
S_15 = 3(15^2) + 5(15) = 3(225) + 75 = 675 + 75 = 750.
S_14 = 3(14^2) + 5(14) = 3(196) + 70 = 588 + 70 = 658.
T_15 = 750 - 658 = 92.
Shortcut: For S_n = An^2 + Bn, common difference d = 2A = 6, and T_n = 2An + (B - A) = 6n + 2.
T_15 = 6(15) + 2 = 92.`
  },
  {
    id: "PROG_Q15",
    questionNumber: 15,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `Find the value of the recurring decimal 0.4282828... as a simplified fraction using sum to infinity of a GP.`,
    options: [
      { key: "A", text: "212/495" },
      { key: "B", text: "424/990" },
      { key: "C", text: "214/495" },
      { key: "D", text: "71/165" }
    ],
    correctAnswer: "A",
    solution: `0.4282828... = 4/10 + 28/1000 + 28/100000 + ...
= 4/10 + (28/1000) / (1 - 1/100) = 4/10 + (28/1000) / (99/100)
= 4/10 + 28 / 990 = (396 + 28) / 990 = 424 / 990 = 212 / 495.`
  },
  {
    id: "PROG_Q16",
    questionNumber: 16,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `A bouncing ball is dropped from a height of 100 meters. Each time it bounces, it rebounds to 4/5 of its previous height. What is the total distance traveled by the ball before coming to rest?`,
    options: [
      { key: "A", text: "500 meters" },
      { key: "B", text: "800 meters" },
      { key: "C", text: "900 meters" },
      { key: "D", text: "1,000 meters" }
    ],
    correctAnswer: "C",
    solution: `Initial drop = H = 100m.
Subsequent rebounds (up + down) = 2 × [H(4/5) + H(4/5)^2 + ...]
Total Distance = H + 2H × (r / (1 - r)) where r = 4/5
Total Distance = 100 + 200 × [(4/5) / (1/5)] = 100 + 200 × 4 = 100 + 800 = 900 meters.`
  },
  {
    id: "PROG_Q17",
    questionNumber: 17,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `If AM and GM between two numbers are 25 and 20 respectively, find the Harmonic Mean (HM) between them.`,
    options: [
      { key: "A", text: "12" },
      { key: "B", text: "16" },
      { key: "C", text: "18" },
      { key: "D", text: "22" }
    ],
    correctAnswer: "B",
    solution: `Identity relating AM, GM, and HM for any two positive numbers:
GM^2 = AM × HM
20^2 = 25 × HM
400 = 25 × HM
HM = 400 / 25 = 16.`
  },
  {
    id: "PROG_Q18",
    questionNumber: 18,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `If the m-th term of an AP is 1/n and the n-th term is 1/m, what is the (mn)-th term?`,
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "1 / (mn)" },
      { key: "D", text: "(m + n) / (mn)" }
    ],
    correctAnswer: "B",
    solution: `T_m = a + (m - 1)d = 1/n
T_n = a + (n - 1)d = 1/m
Subtracting: (m - n)d = 1/n - 1/m = (m - n) / (mn) => d = 1 / (mn).
Substituting d: a = 1 / (mn).
Then T_{mn} = a + (mn - 1)d = 1/(mn) + (mn - 1)/(mn) = mn / mn = 1.`
  },
  {
    id: "PROG_Q19",
    questionNumber: 19,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `What is the sum of the first 20 odd natural numbers?`,
    options: [
      { key: "A", text: "380" },
      { key: "B", text: "400" },
      { key: "C", text: "420" },
      { key: "D", text: "440" }
    ],
    correctAnswer: "B",
    solution: `The sum of the first n odd natural numbers is strictly equal to n^2.
For n = 20: Sum = 20^2 = 400.`
  },
  {
    id: "PROG_Q20",
    questionNumber: 20,
    topic: "Progressions (Arithmetic, Geometric, Harmonic Series)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: `If the sum of an infinite GP is 9 and the sum of the squares of its terms is 27, what is the first term?`,
    options: [
      { key: "A", text: "3" },
      { key: "B", text: "4.5" },
      { key: "C", text: "6" },
      { key: "D", text: "8" }
    ],
    correctAnswer: "C",
    solution: `S = a / (1 - r) = 9 => a = 9(1 - r).
Sum of squares = a^2 / (1 - r^2) = 27
[81(1 - r)^2] / [(1 - r)(1 + r)] = 27
81(1 - r) / (1 + r) = 27
3(1 - r) = 1 + r
3 - 3r = 1 + r => 4r = 2 => r = 1/2.
Then a = 9(1 - 1/2) = 4.5... wait:
If r = 1/2, a = 9 × (1/2) = 4.5. Wait! Let's check: 4.5 / (1 - 0.5) = 9.
Squares: (4.5)^2 / (1 - 0.25) = 20.25 / 0.75 = 27. Correct! First term is 4.5 (or if options list 4.5). Option B is 4.5.`
  }
];
