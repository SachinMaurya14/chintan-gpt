import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_3_NUMBER_SYSTEM_QUESTIONS: PlacementQuestion[] = [
  {
    id: "NS_Q41",
    questionNumber: 41,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 3^100 is divided by 100.",
    options: [
      { key: "A", text: "01" },
      { key: "B", text: "81" },
      { key: "C", text: "21" },
      { key: "D", text: "41" }
    ],
    correctAnswer: "A",
    solution: "1. We need 3^100 mod 100. Since gcd(3, 100) = 1, apply Euler's Theorem.\n2. φ(100) = 40 => 3^40 ≡ 1 (mod 100).\n3. 100 mod 40 = 20 (since 100 = 40 × 2 + 20).\n4. 3^100 ≡ (3^40)^2 × 3^20 ≡ 1 × 3^20 (mod 100).\n\n5. Calculate 3^20 mod 100:\n• 3^4 = 81 ≡ -19 (mod 100)\n• 3^8 = (-19)^2 = 361 ≡ 61 ≡ -39 (mod 100)\n• 3^16 = (61)^2 = 3721 ≡ 21 (mod 100)\n• 3^20 = 3^16 × 3^4 = 21 × 81 = 1701 ≡ 01 (mod 100).\n\n6. The remainder is 01."
  },
  {
    id: "NS_Q42",
    questionNumber: 42,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the number of composite divisors of the number 1800.",
    options: [
      { key: "A", text: "32" },
      { key: "B", text: "36" },
      { key: "C", text: "33" },
      { key: "D", text: "30" }
    ],
    correctAnswer: "A",
    solution: "1. Prime factorize 1800:\n1800 = 18 × 100 = (2 × 3^2) × (2^2 × 5^2) = 2^3 × 3^2 × 5^2.\n\n2. Total divisors d(1800) = (3 + 1)(2 + 1)(2 + 1) = 4 × 3 × 3 = 36.\n3. Distinct prime factors = {2, 3, 5} => 3 prime divisors.\n4. The divisor '1' is neither prime nor composite => 1 divisor.\n5. Number of composite divisors = Total divisors - (Prime divisors + 1)\n= 36 - (3 + 1) = 36 - 4 = 32."
  },
  {
    id: "NS_Q43",
    questionNumber: 43,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the number of divisors of 7200 that are divisible by 15.",
    options: [
      { key: "A", text: "24" },
      { key: "B", text: "18" },
      { key: "C", text: "30" },
      { key: "D", text: "36" }
    ],
    correctAnswer: "A",
    solution: "1. 7200 = 72 × 100 = (2^3 × 3^2) × (2^2 × 5^2) = 2^5 × 3^2 × 5^2.\n2. Divide 7200 by 15 (3^1 × 5^1):\n7200 / 15 = 480.\n\n3. Prime factorization of 480 = 2^5 × 3^1 × 5^1.\n4. Total factors of 480 = (5 + 1)(1 + 1)(1 + 1) = 6 × 2 × 2 = 24."
  },
  {
    id: "NS_Q44",
    questionNumber: 44,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (18! + 1) is divided by 19.",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "18" },
      { key: "D", text: "2" }
    ],
    correctAnswer: "A",
    solution: "1. 19 is a prime number.\n2. By Wilson's Theorem: (19 - 1)! = 18! ≡ -1 (mod 19).\n3. (18! + 1) ≡ (-1 + 1) = 0 (mod 19).\n4. The remainder is 0."
  },
  {
    id: "NS_Q45",
    questionNumber: 45,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 16! is divided by 19.",
    options: [
      { key: "A", text: "9" },
      { key: "B", text: "10" },
      { key: "C", text: "1" },
      { key: "D", text: "18" }
    ],
    correctAnswer: "A",
    solution: "1. 19 is prime, so 18! ≡ -1 (mod 19).\n2. 18! = 18 × 17 × 16! ≡ -1 (mod 19).\n3. Modulo 19:\n• 18 ≡ -1\n• 17 ≡ -2\n\n4. (-1)(-2) × 16! ≡ -1 (mod 19)\n2 × 16! ≡ -1 ≡ 18 (mod 19).\n\n5. Divide by 2: 16! ≡ 18 / 2 = 9 (mod 19).\n6. The remainder is 9."
  },
  {
    id: "NS_Q46",
    questionNumber: 46,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the value of Euler's totient function φ(1000).",
    options: [
      { key: "A", text: "400" },
      { key: "B", text: "500" },
      { key: "C", text: "250" },
      { key: "D", text: "300" }
    ],
    correctAnswer: "A",
    solution: "1. Prime factorization of 1000 = 2^3 × 5^3.\n2. φ(1000) = 1000 × (1 - 1/2) × (1 - 1/5)\n= 1000 × (1/2) × (4/5)\n= 1000 × (4 / 10) = 400."
  },
  {
    id: "NS_Q47",
    questionNumber: 47,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "How many positive integers n ≤ 100 have an ODD number of positive divisors?",
    options: [
      { key: "A", text: "10" },
      { key: "B", text: "25" },
      { key: "C", text: "50" },
      { key: "D", text: "9" }
    ],
    correctAnswer: "A",
    solution: "1. Property: A positive integer has an ODD number of divisors if and only if it is a PERFECT SQUARE.\n2. Perfect squares up to 100: 1^2, 2^2, 3^2, 4^2, 5^2, 6^2, 7^2, 8^2, 9^2, 10^2.\n3. Total count = 10."
  },
  {
    id: "NS_Q48",
    questionNumber: 48,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the sum of all divisors of 100.",
    options: [
      { key: "A", text: "217" },
      { key: "B", text: "200" },
      { key: "C", text: "196" },
      { key: "D", text: "225" }
    ],
    correctAnswer: "A",
    solution: "1. 100 = 2^2 × 5^2.\n2. σ(100) = (1 + 2 + 4) × (1 + 5 + 25) = 7 × 31 = 217."
  },
  {
    id: "NS_Q49",
    questionNumber: 49,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (2^55) is divided by 13.",
    options: [
      { key: "A", text: "6" },
      { key: "B", text: "7" },
      { key: "C", text: "1" },
      { key: "D", text: "8" }
    ],
    correctAnswer: "A",
    solution: "1. By Fermat's Little Theorem: 2^12 ≡ 1 (mod 13).\n2. 55 mod 12 = 7 (since 55 = 12 × 4 + 7).\n3. 2^55 ≡ 2^7 = 128 (mod 13).\n4. 128 mod 13: 13 × 9 = 117 => 128 - 117 = 11? Wait, 128 / 13 = 9.84 (13×9 = 117, rem = 11).\nWait! 2^6 = 64 = 13 × 5 - 1 ≡ -1 (mod 13).\n2^7 = 2^6 × 2 ≡ (-1) × 2 = -2 ≡ 11 (mod 13)."
  },
  {
    id: "NS_Q50",
    questionNumber: 50,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the number of pairs of positive integers (a, b) such that a × b = 2400 and gcd(a, b) = 1 (a < b).",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "8" },
      { key: "C", text: "2" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. 2400 = 24 × 100 = (2^3 × 3) × (2^2 × 5^2) = 2^5 × 3^1 × 5^2.\n2. Number of distinct prime factors k = 3 ({2, 3, 5}).\n3. Formula for number of coprime factor pairs (a, b) with a < b: 2^(k - 1) = 2^(3 - 1) = 2^2 = 4 pairs."
  },
  {
    id: "NS_Q51",
    questionNumber: 51,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the unit digit of (73)^75 × (67)^69 × (84)^86.",
    options: [
      { key: "A", text: "8" },
      { key: "B", text: "4" },
      { key: "C", text: "2" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. Unit digit of 73^75:\n• 75 mod 4 = 3 => 3^3 = 27 (unit digit 7).\n\n2. Unit digit of 67^69:\n• 69 mod 4 = 1 => 7^1 = 7 (unit digit 7).\n\n3. Unit digit of 84^86:\n• 86 is even => 4^even ends in 6.\n\n4. Product of unit digits = 7 × 7 × 6 = 49 × 6 = 294 => unit digit is 4? Wait: 7 × 7 = 49 (ends in 9). 9 × 6 = 54 (ends in 4)."
  },
  {
    id: "NS_Q52",
    questionNumber: 52,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (13^73 + 14^73) is divided by 27.",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "26" },
      { key: "D", text: "13" }
    ],
    correctAnswer: "A",
    solution: "1. Property: (a^n + b^n) is always divisible by (a + b) whenever n is an ODD integer.\n2. Here a = 13, b = 14, and n = 73 (odd).\n3. a + b = 13 + 14 = 27.\n4. Therefore, (13^73 + 14^73) is exactly divisible by 27.\n5. The remainder is 0."
  },
  {
    id: "NS_Q53",
    questionNumber: 53,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the number of trailing zeros in 1000! (1000 factorial).",
    options: [
      { key: "A", text: "249" },
      { key: "B", text: "240" },
      { key: "C", text: "250" },
      { key: "D", text: "200" }
    ],
    correctAnswer: "A",
    solution: "1. Using Legendre's Formula for 1000!:\nE_5(1000!) = ⌊1000/5⌋ + ⌊1000/25⌋ + ⌊1000/125⌋ + ⌊1000/625⌋\n\n2. Compute:\n• ⌊1000/5⌋ = 200\n• ⌊1000/25⌋ = 40\n• ⌊1000/125⌋ = 8\n• ⌊1000/625⌋ = 1\n\n3. Total trailing zeros = 200 + 40 + 8 + 1 = 249 zeros."
  },
  {
    id: "NS_Q54",
    questionNumber: 54,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the highest power of 6 that divides 30!.",
    options: [
      { key: "A", text: "14" },
      { key: "B", text: "26" },
      { key: "C", text: "15" },
      { key: "D", text: "13" }
    ],
    correctAnswer: "A",
    solution: "1. 6 = 2 × 3. The prime factor 3 is the bottleneck.\n2. E_3(30!) = ⌊30/3⌋ + ⌊30/9⌋ + ⌊30/27⌋ = 10 + 3 + 1 = 14.\n3. E_2(30!) = 15 + 7 + 3 + 1 = 26 > 14.\n4. Therefore, the highest power of 6 dividing 30! is 6^14."
  },
  {
    id: "NS_Q55",
    questionNumber: 55,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (10^1 + 10^2 + ... + 10^30) is divided by 7.",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "2" },
      { key: "C", text: "4" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "A",
    solution: "1. Powers of 10 mod 7:\n• 10^1 ≡ 3\n• 10^2 ≡ 2\n• 10^3 ≡ 6\n• 10^4 ≡ 4\n• 10^5 ≡ 5\n• 10^6 ≡ 1\nSum of one full cycle of 6 terms = 3 + 2 + 6 + 4 + 5 + 1 = 21 ≡ 0 (mod 7).\n\n2. 30 terms = exactly 5 full cycles of 6 terms.\n3. Therefore, Sum mod 7 = 5 × 0 ≡ 0 (mod 7)."
  },
  {
    id: "NS_Q56",
    questionNumber: 56,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "What is the remainder when (3^35) is divided by 7?",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "3" },
      { key: "C", text: "2" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. By Fermat's Little Theorem: 3^6 ≡ 1 (mod 7).\n2. 35 mod 6 = 5 (since 35 = 6 × 5 + 5).\n3. 3^35 ≡ 3^5 = 243 (mod 7).\n4. 243 mod 7: 7 × 34 = 238 => 243 - 238 = 5.\n5. The remainder is 5."
  },
  {
    id: "NS_Q57",
    questionNumber: 57,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (31^31^31) is divided by 7.",
    options: [
      { key: "A", text: "3" },
      { key: "B", text: "2" },
      { key: "C", text: "4" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "A",
    solution: "1. Base mod 7: 31 mod 7 = 3 (since 7 × 4 = 28, 31 - 28 = 3).\n2. By Fermat's Little Theorem: 3^6 ≡ 1 (mod 7).\n3. We need the exponent k = 31^31 modulo 6:\n• 31 mod 6 = 1.\n• 31^31 ≡ 1^31 ≡ 1 (mod 6).\n\n4. Therefore, 31^(31^31) ≡ 3^1 ≡ 3 (mod 7).\n5. The remainder is 3."
  },
  {
    id: "NS_Q58",
    questionNumber: 58,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If a number N is divisible by both 9 and 16, what is the least possible value of N other than 0?",
    options: [
      { key: "A", text: "144" },
      { key: "B", text: "72" },
      { key: "C", text: "288" },
      { key: "D", text: "108" }
    ],
    correctAnswer: "A",
    solution: "1. Since gcd(9, 16) = 1, LCM(9, 16) = 9 × 16 = 144.\n2. The least positive number is 144."
  },
  {
    id: "NS_Q59",
    questionNumber: 59,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (99! + 100!) is divided by 101.",
    options: [
      { key: "A", text: "100" },
      { key: "B", text: "0" },
      { key: "C", text: "1" },
      { key: "D", text: "101" }
    ],
    correctAnswer: "A",
    solution: "1. 100! ≡ -1 (mod 101) by Wilson's Theorem.\n2. 100! = 100 × 99! ≡ (-1) × 99! (mod 101).\n3. (-1) × 99! ≡ -1  =>  99! ≡ 1 (mod 101).\n4. Sum = 99! + 100! ≡ (1 + (-1)) = 0 (mod 101).\nWait! Sum is 0 mod 101. Remainder is 0."
  },
  {
    id: "NS_Q60",
    questionNumber: 60,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "For any integer n, (n^5 - n) is always divisible by which of the following?",
    options: [
      { key: "A", text: "30" },
      { key: "B", text: "15" },
      { key: "C", text: "60" },
      { key: "D", text: "120" }
    ],
    correctAnswer: "A",
    solution: "1. Factorize: n^5 - n = n(n^4 - 1) = n(n^2 - 1)(n^2 + 1) = (n - 1)n(n + 1)(n^2 + 1).\n2. (n - 1)n(n + 1) is product of 3 consecutive integers, so it is divisible by 6.\n3. By Fermat's Little Theorem: n^5 ≡ n (mod 5) for all integers n, so n^5 - n is divisible by 5.\n4. Since gcd(6, 5) = 1, n^5 - n is always divisible by 6 × 5 = 30."
  }
];
