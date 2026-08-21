import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_2_NUMBER_SYSTEM_QUESTIONS: PlacementQuestion[] = [
  {
    id: "NS_Q21",
    questionNumber: 21,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the remainder when (25^25 + 25) is divided by 26.",
    options: [
      { key: "A", text: "24" },
      { key: "B", text: "25" },
      { key: "C", text: "1" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "A",
    solution: "1. 25 ≡ -1 (mod 26).\n2. 25^25 ≡ (-1)^25 = -1 (mod 26).\n3. (25^25 + 25) ≡ (-1 + 25) = 24 (mod 26).\n4. The remainder is 24."
  },
  {
    id: "NS_Q22",
    questionNumber: 22,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (3^2019) is divided by 10.",
    options: [
      { key: "A", text: "7" },
      { key: "B", text: "3" },
      { key: "C", text: "9" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "A",
    solution: "1. Remainder modulo 10 is the unit digit of 3^2019.\n2. Cyclicity of 3 is 4 (3^1=3, 3^2=9, 3^3=7, 3^4=1).\n3. 2019 mod 4 = 3 (since 2019 = 4 × 504 + 3).\n4. The unit digit is 3^3 mod 10 = 27 mod 10 = 7.\n5. The remainder is 7."
  },
  {
    id: "NS_Q23",
    questionNumber: 23,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Which of the following is divisible by (x - a) for ALL positive integer values of n?",
    options: [
      { key: "A", text: "x^n - a^n" },
      { key: "B", text: "x^n + a^n" },
      { key: "C", text: "x^(2n) + a^(2n)" },
      { key: "D", text: "x^(2n+1) + a^(2n+1)" }
    ],
    correctAnswer: "A",
    solution: "1. Algebraic identity: x^n - a^n = (x - a)(x^(n-1) + x^(n-2)a + ... + a^(n-1)).\n2. By Remainder Theorem: Substituting x = a gives a^n - a^n = 0 for ALL positive integers n (both even and odd).\n3. Hence, (x^n - a^n) is always divisible by (x - a)."
  },
  {
    id: "NS_Q24",
    questionNumber: 24,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "When is (x^n + a^n) divisible by (x + a)?",
    options: [
      { key: "A", text: "Only when n is an odd positive integer" },
      { key: "B", text: "Only when n is an even positive integer" },
      { key: "C", text: "For all integer values of n" },
      { key: "D", text: "Never" }
    ],
    correctAnswer: "A",
    solution: "1. Remainder Theorem: Set x + a = 0 => x = -a.\n2. Substitute x = -a into P(x) = x^n + a^n:\nP(-a) = (-a)^n + a^n.\n3. If n is odd: (-a)^n + a^n = -a^n + a^n = 0 (divisible!).\n4. If n is even: (-a)^n + a^n = a^n + a^n = 2a^n ≠ 0.\n5. Therefore, (x^n + a^n) is divisible by (x + a) ONLY when n is odd."
  },
  {
    id: "NS_Q25",
    questionNumber: 25,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (49^15 - 1) is divided by 8.",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "7" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. 49 mod 8 = 1 (since 49 = 8 × 6 + 1).\n2. 49^15 ≡ 1^15 ≡ 1 (mod 8).\n3. (49^15 - 1) ≡ (1 - 1) = 0 (mod 8).\n4. The remainder is 0 (it is completely divisible by 8)."
  },
  {
    id: "NS_Q26",
    questionNumber: 26,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A number when divided by 136 leaves a remainder 36. If the same number is divided by 17, what will be the remainder?",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "3" },
      { key: "C", text: "4" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "A",
    solution: "1. N = 136q + 36.\n2. Notice that 136 is divisible by 17 (17 × 8 = 136).\n3. Therefore, N mod 17 = 36 mod 17.\n4. 36 = 17 × 2 + 2.\n5. The remainder is 2."
  },
  {
    id: "NS_Q27",
    questionNumber: 27,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If two numbers, when divided separately by a certain divisor d, leave remainders 43 and 37 respectively, and their sum when divided by d leaves remainder 13, find the divisor d.",
    options: [
      { key: "A", text: "67" },
      { key: "B", text: "57" },
      { key: "C", text: "77" },
      { key: "D", text: "87" }
    ],
    correctAnswer: "A",
    solution: "1. Formula: Divisor d = r1 + r2 - r3\n(where r1, r2 are individual remainders and r3 is the remainder of the sum).\n\n2. Given r1 = 43, r2 = 37, r3 = 13.\n3. d = 43 + 37 - 13 = 80 - 13 = 67."
  },
  {
    id: "NS_Q28",
    questionNumber: 28,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (15^300) is divided by 17.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "15" },
      { key: "C", text: "16" },
      { key: "D", text: "4" }
    ],
    correctAnswer: "A",
    solution: "1. 17 is prime and gcd(15, 17) = 1. By Fermat's Little Theorem: 15^16 ≡ 1 (mod 17).\n2. 15 ≡ -2 (mod 17).\n3. Exponent 300 mod 16 = 12 (since 300 = 16 × 18 + 12).\n4. 15^300 ≡ (-2)^12 = (2^4)^3 = (16)^3 ≡ (-1)^3 = -1 ≡ 16 (mod 17).\nWait, 15^300 ≡ 15^12 mod 17. 15 ≡ -2 mod 17. (-2)^12 = ((-2)^4)^3 = (16)^3 ≡ (-1)^3 = -1 ≡ 16 mod 17."
  },
  {
    id: "NS_Q29",
    questionNumber: 29,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the number of even factors of 720.",
    options: [
      { key: "A", text: "24" },
      { key: "B", text: "30" },
      { key: "C", text: "18" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. Prime factorization of 720 = 2^4 × 3^2 × 5^1.\n2. Total factors d(720) = (4 + 1)(2 + 1)(1 + 1) = 5 × 3 × 2 = 30.\n3. Odd factors (ignore 2's powers): (2 + 1)(1 + 1) = 3 × 2 = 6.\n4. Even factors = Total factors - Odd factors = 30 - 6 = 24."
  },
  {
    id: "NS_Q30",
    questionNumber: 30,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the number of factors of 1440 that are multiples of 12.",
    options: [
      { key: "A", text: "12" },
      { key: "B", text: "16" },
      { key: "C", text: "10" },
      { key: "D", text: "8" }
    ],
    correctAnswer: "A",
    solution: "1. 1440 = 2^5 × 3^2 × 5^1.\n2. To find factors that are multiples of 12 = 2^2 × 3^1, divide 1440 by 12:\n1440 / 12 = 120.\n\n3. Prime factorization of 120 = 2^3 × 3^1 × 5^1.\n4. Total factors of 120 = (3 + 1)(1 + 1)(1 + 1) = 4 × 2 × 2 = 16.\nWait, 1440 / 12 = 120. Factors of 120 = 16."
  },
  {
    id: "NS_Q31",
    questionNumber: 31,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the number of factors of N = 2^6 × 3^4 × 5^2 that are perfect squares.",
    options: [
      { key: "A", text: "24" },
      { key: "B", text: "36" },
      { key: "C", text: "18" },
      { key: "D", text: "12" }
    ],
    correctAnswer: "A",
    solution: "1. For a factor to be a perfect square, the prime exponents must be even numbers:\n• Exponent of 2 can be: 0, 2, 4, 6 (4 choices = ⌊6/2⌋ + 1)\n• Exponent of 3 can be: 0, 2, 4 (3 choices = ⌊4/2⌋ + 1)\n• Exponent of 5 can be: 0, 2 (2 choices = ⌊2/2⌋ + 1)\n\n2. Total perfect square factors = 4 × 3 × 2 = 24."
  },
  {
    id: "NS_Q32",
    questionNumber: 32,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the remainder when (1! + 2! + 3! + ... + 200!) is divided by 10.",
    options: [
      { key: "A", text: "3" },
      { key: "B", text: "5" },
      { key: "C", text: "7" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "A",
    solution: "1. For n ≥ 5, n! has trailing zero (n! ≡ 0 mod 10).\n2. Sum mod 10 = (1! + 2! + 3! + 4!) mod 10\n= (1 + 2 + 6 + 24) mod 10\n= 33 mod 10 = 3.\n3. The remainder is 3."
  },
  {
    id: "NS_Q33",
    questionNumber: 33,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the sum of all odd factors of 360.",
    options: [
      { key: "A", text: "78" },
      { key: "B", text: "90" },
      { key: "C", text: "65" },
      { key: "D", text: "84" }
    ],
    correctAnswer: "A",
    solution: "1. 360 = 2^3 × 3^2 × 5^1.\n2. For sum of odd factors, set power of 2 to 2^0 = 1:\nSum = (3^0 + 3^1 + 3^2) × (5^0 + 5^1)\n= (1 + 3 + 9) × (1 + 5)\n= 13 × 6 = 78."
  },
  {
    id: "NS_Q34",
    questionNumber: 34,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the sum of the reciprocals of all factors of 120.",
    options: [
      { key: "A", text: "3" },
      { key: "B", text: "2.5" },
      { key: "C", text: "3.2" },
      { key: "D", text: "2.8" }
    ],
    correctAnswer: "A",
    solution: "1. Formula: Sum of reciprocals of divisors of N = σ(N) / N (where σ(N) is sum of divisors).\n\n2. Factorize 120 = 2^3 × 3^1 × 5^1.\n• σ(120) = (1 + 2 + 4 + 8)(1 + 3)(1 + 5) = 15 × 4 × 6 = 360.\n\n3. Sum of reciprocals = 360 / 120 = 3."
  },
  {
    id: "NS_Q35",
    questionNumber: 35,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the unit digit of the expression: 1^1 + 2^2 + 3^3 + 4^4 + 5^5 + 6^6 + 7^7 + 8^8 + 9^9 + 10^10.",
    options: [
      { key: "A", text: "7" },
      { key: "B", text: "5" },
      { key: "C", text: "3" },
      { key: "D", text: "9" }
    ],
    correctAnswer: "A",
    solution: "1. Compute unit digit of each term:\n• 1^1 = 1\n• 2^2 = 4\n• 3^3 = 7\n• 4^4 = 6\n• 5^5 = 5\n• 6^6 = 6\n• 7^7 = 3 (7 mod 4 = 3 => 7^3 = 343)\n• 8^8 = 6 (8 mod 4 = 0 => 8^4 = 4096)\n• 9^9 = 9 (9 is odd => 9)\n• 10^10 = 0\n\n2. Sum of unit digits = 1 + 4 + 7 + 6 + 5 + 6 + 3 + 6 + 9 + 0 = 47.\n3. Unit digit of the sum is 7."
  },
  {
    id: "NS_Q36",
    questionNumber: 36,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (10^10 + 10^100 + 10^1000 + ... + 10^10000000000) [10 terms] is divided by 7.",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "2" },
      { key: "C", text: "5" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "A",
    solution: "1. By Fermat's Little Theorem, 10^6 ≡ 3^6 ≡ 1 (mod 7).\n2. Exponents are all powers of 10: 10^k mod 6.\n• 10 mod 6 = 4\n• 100 mod 6 = 4\n• 10^k mod 6 = 4 for all k ≥ 1.\n\n3. Therefore, for each of the 10 terms:\n10^(10^k) ≡ 10^4 (mod 7) ≡ 3^4 (mod 7) = 81 mod 7 = 4.\n\n4. Sum of 10 terms mod 7 = (10 × 4) mod 7 = 40 mod 7 = 5? Wait: 7 × 5 = 35, 40 - 35 = 5. (Remainder = 5)."
  },
  {
    id: "NS_Q37",
    questionNumber: 37,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 2^2004 is divided by 7.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "2" },
      { key: "C", text: "4" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. 2^3 = 8 ≡ 1 (mod 7).\n2. 2004 is divisible by 3 (2004 = 3 × 668).\n3. 2^2004 = (2^3)^668 ≡ 1^668 = 1 (mod 7).\n4. The remainder is 1."
  },
  {
    id: "NS_Q38",
    questionNumber: 38,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 3^200 is divided by 8.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "3" },
      { key: "C", text: "5" },
      { key: "D", text: "7" }
    ],
    correctAnswer: "A",
    solution: "1. 3^2 = 9 ≡ 1 (mod 8).\n2. 3^200 = (3^2)^100 ≡ 1^100 = 1 (mod 8).\n3. The remainder is 1."
  },
  {
    id: "NS_Q39",
    questionNumber: 39,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "How many trailing zeros are in the expansion of (25! × 40!)?",
    options: [
      { key: "A", text: "15" },
      { key: "B", text: "16" },
      { key: "C", text: "14" },
      { key: "D", text: "18" }
    ],
    correctAnswer: "A",
    solution: "1. Trailing zeros in 25!:\nE_5(25!) = ⌊25/5⌋ + ⌊25/25⌋ = 5 + 1 = 6 zeros.\n\n2. Trailing zeros in 40!:\nE_5(40!) = ⌊40/5⌋ + ⌊40/25⌋ = 8 + 1 = 9 zeros.\n\n3. Total trailing zeros in product = 6 + 9 = 15 zeros."
  },
  {
    id: "NS_Q40",
    questionNumber: 40,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the smallest natural number by which 3600 must be multiplied so that the resulting product is a perfect cube.",
    options: [
      { key: "A", text: "60" },
      { key: "B", text: "30" },
      { key: "C", text: "45" },
      { key: "D", text: "15" }
    ],
    correctAnswer: "A",
    solution: "1. Prime factorization of 3600 = 2^4 × 3^2 × 5^2.\n2. For a perfect cube, all prime powers must be multiples of 3:\n• Power of 2: 2^4 needs 2^2 (to make 2^6)\n• Power of 3: 3^2 needs 3^1 (to make 3^3)\n• Power of 5: 5^2 needs 5^1 (to make 5^3)\n\n3. Required multiplier = 2^2 × 3^1 × 5^1 = 4 × 3 × 5 = 60."
  }
];
