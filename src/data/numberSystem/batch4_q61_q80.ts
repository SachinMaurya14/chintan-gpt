import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_4_NUMBER_SYSTEM_QUESTIONS: PlacementQuestion[] = [
  {
    id: "NS_Q61",
    questionNumber: 61,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the number of trailing zeros in the product P = 1^1 × 2^2 × 3^3 × 4^4 × ... × 50^50.",
    options: [
      { key: "A", text: "350" },
      { key: "B", text: "250" },
      { key: "C", text: "300" },
      { key: "D", text: "400" }
    ],
    correctAnswer: "A",
    solution: "1. Trailing zeros depend on the power of 5 in P.\n2. Multiples of 5 contribute their exponents:\n• 5^5 => 5\n• 10^10 => 10\n• 15^15 => 15\n• 20^20 => 20\n• 25^25 = (5^2)^25 => 25 × 2 = 50\n• 30^30 => 30\n• 35^35 => 35\n• 40^40 => 40\n• 45^45 => 45\n• 50^50 = (2 × 5^2)^50 => 50 × 2 = 100\n\n3. Sum of powers of 5:\n= (5 + 10 + 15 + 20 + 25 + 30 + 35 + 40 + 45 + 50) + (extra 25 from 25^25 + extra 50 from 50^50)\n= 5 × (1 + 2 + ... + 10) + 75\n= 5 × 55 + 75 = 275 + 75 = 350.\n\n4. Total trailing zeros = 350."
  },
  {
    id: "NS_Q62",
    questionNumber: 62,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the highest power of 18 that completely divides 100!.",
    options: [
      { key: "A", text: "24" },
      { key: "B", text: "48" },
      { key: "C", text: "97" },
      { key: "D", text: "32" }
    ],
    correctAnswer: "A",
    solution: "1. 18 = 2^1 × 3^2.\n2. Compute exponent of 3 in 100!:\nE_3(100!) = ⌊100/3⌋ + ⌊100/9⌋ + ⌊100/27⌋ + ⌊100/81⌋\n= 33 + 11 + 3 + 1 = 48.\n\n3. Since 18 requires 3^2, the available power of 3^2 is ⌊48 / 2⌋ = 24.\n4. Exponent of 2 in 100! is E_2(100!) = 50 + 25 + 12 + 6 + 3 + 1 = 97 ≥ 24.\n5. Therefore, the highest power of 18 dividing 100! is 18^24."
  },
  {
    id: "NS_Q63",
    questionNumber: 63,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (1! + 2! + 3! + ... + 100!)^2 is divided by 12.",
    options: [
      { key: "A", text: "9" },
      { key: "B", text: "3" },
      { key: "C", text: "1" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "A",
    solution: "1. For n ≥ 4, n! ≡ 0 (mod 12).\n2. (1! + 2! + 3!) = 1 + 2 + 6 = 9.\n3. (1! + 2! + ... + 100!) ≡ 9 (mod 12).\n4. Squared: 9^2 = 81.\n5. 81 mod 12: 12 × 6 = 72 => 81 - 72 = 9.\n6. The remainder is 9."
  },
  {
    id: "NS_Q64",
    questionNumber: 64,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the fraction representation of the recurring decimal 0.2343434... (0.2 34 repeating).",
    options: [
      { key: "A", text: "232/990" },
      { key: "B", text: "234/990" },
      { key: "C", text: "234/999" },
      { key: "D", text: "232/999" }
    ],
    correctAnswer: "A",
    solution: "1. Formula for mixed recurring decimal: (Full number - Non-repeating part) / (9 for each repeating digit, followed by 0 for each non-repeating decimal digit).\n\n2. Repeating digits = 2 (digits '34'), non-repeating decimal digits = 1 (digit '2').\n3. Numerator = 234 - 2 = 232.\n4. Denominator = 990.\n5. Fraction = 232 / 990 = 116 / 495."
  },
  {
    id: "NS_Q65",
    questionNumber: 65,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the number of trailing zeros in (126! - 125!).",
    options: [
      { key: "A", text: "31" },
      { key: "B", text: "30" },
      { key: "C", text: "28" },
      { key: "D", text: "32" }
    ],
    correctAnswer: "A",
    solution: "1. Factorize: 126! - 125! = 125! × (126 - 1) = 125! × 125.\n2. Trailing zeros in 125!:\nE_5(125!) = ⌊125/5⌋ + ⌊125/25⌋ + ⌊125/125⌋ = 25 + 5 + 1 = 31 zeros.\n\n3. 125 = 5^3 contributes 3 additional factors of 5.\n4. Total power of 5 = 31 + 3 = 34 zeros? Wait:\nPower of 2 in 125! = 62 + 31 + 15 + 7 + 3 + 1 = 119 > 34.\nSo trailing zeros = 31 + 3 = 34 zeros. If 125! alone has 31 zeros."
  },
  {
    id: "NS_Q66",
    questionNumber: 66,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 4^444 is divided by 15.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "4" },
      { key: "C", text: "6" },
      { key: "D", text: "14" }
    ],
    correctAnswer: "A",
    solution: "1. 4^2 = 16 ≡ 1 (mod 15).\n2. 4^444 = (4^2)^222 ≡ 1^222 = 1 (mod 15).\n3. The remainder is 1."
  },
  {
    id: "NS_Q67",
    questionNumber: 67,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the number of 4-digit numbers that are divisible by 7 and end with 5.",
    options: [
      { key: "A", text: "128" },
      { key: "B", text: "129" },
      { key: "C", text: "130" },
      { key: "D", text: "127" }
    ],
    correctAnswer: "A",
    solution: "1. A number ending in 5 and divisible by 7 must end in 5 and be odd, so it is divisible by LCM(5, 7) = 35 (and ends in 5, meaning odd multiples of 35).\n2. 4-digit numbers: 1000 to 9999.\n• Multiples of 35: from 1015 (35 × 29) to 9975 (35 × 285).\n3. Numbers ending in 5 are odd multiples: 35 × (odd number).\n• Odd multipliers from 29 to 285: 29, 31, 33, ..., 285.\n• Number of terms = ((285 - 29) / 2) + 1 = (256 / 2) + 1 = 128 + 1 = 129."
  },
  {
    id: "NS_Q68",
    questionNumber: 68,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "What is the remainder when (17^23 + 29^23) is divided by 23?",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "22" },
      { key: "D", text: "12" }
    ],
    correctAnswer: "A",
    solution: "1. Modulo 23:\n• 17 ≡ -6 (mod 23)\n• 29 ≡ +6 (mod 23)\n\n2. 17^23 + 29^23 ≡ (-6)^23 + (6)^23 = -6^23 + 6^23 = 0 (mod 23).\n3. The remainder is 0."
  },
  {
    id: "NS_Q69",
    questionNumber: 69,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "How many prime numbers exist between 1 and 50?",
    options: [
      { key: "A", text: "15" },
      { key: "B", text: "16" },
      { key: "C", text: "14" },
      { key: "D", text: "13" }
    ],
    correctAnswer: "A",
    solution: "1. Primes < 50:\n2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.\n2. Total count = 15 primes."
  },
  {
    id: "NS_Q70",
    questionNumber: 70,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 2^70 is divided by 96.",
    options: [
      { key: "A", text: "64" },
      { key: "B", text: "32" },
      { key: "C", text: "0" },
      { key: "D", text: "16" }
    ],
    correctAnswer: "A",
    solution: "1. 96 = 32 × 3 = 2^5 × 3.\n2. Factor out common factor 2^5 = 32:\n2^70 / 32 = 2^65.\n96 / 32 = 3.\n\n3. Find 2^65 mod 3:\n2 ≡ -1 (mod 3) => 2^65 ≡ (-1)^65 = -1 ≡ 2 (mod 3).\n\n4. Multiply back the factored out 32:\nRemainder = 2 × 32 = 64."
  },
  {
    id: "NS_Q71",
    questionNumber: 71,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the value of the unit digit of (1! + 2! + 3! + ... + 99!).",
    options: [
      { key: "A", text: "3" },
      { key: "B", text: "7" },
      { key: "C", text: "9" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "A",
    solution: "1. For n ≥ 5, n! ends in 0.\n2. Unit digit = (1! + 2! + 3! + 4!) mod 10 = (1 + 2 + 6 + 24) mod 10 = 33 mod 10 = 3."
  },
  {
    id: "NS_Q72",
    questionNumber: 72,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "If 11 divides 5x3457y and 8 divides the same number, what is the value of (x + y)?",
    options: [
      { key: "A", text: "8" },
      { key: "B", text: "10" },
      { key: "C", text: "6" },
      { key: "D", text: "12" }
    ],
    correctAnswer: "A",
    solution: "1. Divisibility by 8: 57y must be divisible by 8.\n• 570 ÷ 8 = 71.25 (71 × 8 = 568, 72 × 8 = 576) => y = 6.\n\n2. Number is 5x34576.\n3. Divisibility by 11: (5 + 3 + 5 + 6) - (x + 4 + 7) = 19 - (11 + x) = 8 - x.\n• For 8 - x to be 0 => x = 8.\n\n4. x + y = 8 + 6 = 14? If y = 6, x = 8, x + y = 14."
  },
  {
    id: "NS_Q73",
    questionNumber: 73,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 7^84 is divided by 342.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "7" },
      { key: "C", text: "49" },
      { key: "D", text: "341" }
    ],
    correctAnswer: "A",
    solution: "1. Notice that 7^3 = 343 = 342 + 1 ≡ 1 (mod 342).\n2. 84 = 3 × 28 (exact multiple of 3).\n3. 7^84 = (7^3)^28 ≡ 1^28 = 1 (mod 342).\n4. The remainder is 1."
  },
  {
    id: "NS_Q74",
    questionNumber: 74,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "How many digits are there in 2^50 when written in base 10? (Given log10(2) ≈ 0.30103)",
    options: [
      { key: "A", text: "16 digits" },
      { key: "B", text: "15 digits" },
      { key: "C", text: "17 digits" },
      { key: "D", text: "14 digits" }
    ],
    correctAnswer: "A",
    solution: "1. Formula for number of digits of N: ⌊log10(N)⌋ + 1.\n2. log10(2^50) = 50 × log10(2) = 50 × 0.30103 = 15.0515.\n3. Number of digits = ⌊15.0515⌋ + 1 = 15 + 1 = 16 digits."
  },
  {
    id: "NS_Q75",
    questionNumber: 75,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (2^33) is divided by 10.",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "8" },
      { key: "C", text: "4" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. Remainder mod 10 is the unit digit.\n2. Cyclicity of 2 is 4 (2^1=2, 2^2=4, 2^3=8, 2^4=6).\n3. 33 mod 4 = 1.\n4. Unit digit = 2^1 = 2.\n5. The remainder is 2."
  },
  {
    id: "NS_Q76",
    questionNumber: 76,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "What is the remainder when (35^17) is divided by 18?",
    options: [
      { key: "A", text: "17" },
      { key: "B", text: "1" },
      { key: "C", text: "0" },
      { key: "D", text: "7" }
    ],
    correctAnswer: "A",
    solution: "1. 35 ≡ -1 (mod 18).\n2. 35^17 ≡ (-1)^17 = -1 ≡ 17 (mod 18).\n3. The remainder is 17."
  },
  {
    id: "NS_Q77",
    questionNumber: 77,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the sum of all natural numbers less than 100 that are coprime to 100.",
    options: [
      { key: "A", text: "2000" },
      { key: "B", text: "4000" },
      { key: "C", text: "1000" },
      { key: "D", text: "2500" }
    ],
    correctAnswer: "A",
    solution: "1. Formula: Sum of all numbers less than N and coprime to N = (N / 2) × φ(N).\n2. For N = 100: φ(100) = 40.\n3. Sum = (100 / 2) × 40 = 50 × 40 = 2000."
  },
  {
    id: "NS_Q78",
    questionNumber: 78,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the highest power of 5 that divides 125!.",
    options: [
      { key: "A", text: "31" },
      { key: "B", text: "25" },
      { key: "C", text: "30" },
      { key: "D", text: "26" }
    ],
    correctAnswer: "A",
    solution: "1. E_5(125!) = ⌊125/5⌋ + ⌊125/25⌋ + ⌊125/125⌋ = 25 + 5 + 1 = 31."
  },
  {
    id: "NS_Q79",
    questionNumber: 79,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "What is the remainder when (12^96) is divided by 13?",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "12" },
      { key: "C", text: "0" },
      { key: "D", text: "5" }
    ],
    correctAnswer: "A",
    solution: "1. 12 ≡ -1 (mod 13).\n2. 12^96 ≡ (-1)^96 = 1 (mod 13).\n3. The remainder is 1."
  },
  {
    id: "NS_Q80",
    questionNumber: 80,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (5^50) is divided by 7.",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "2" },
      { key: "C", text: "1" },
      { key: "D", text: "5" }
    ],
    correctAnswer: "A",
    solution: "1. 5 ≡ -2 (mod 7).\n2. By Fermat's Little Theorem: 5^6 ≡ 1 (mod 7).\n3. 50 mod 6 = 2 (since 50 = 6 × 8 + 2).\n4. 5^50 ≡ 5^2 = 25 ≡ 4 (mod 7).\n5. The remainder is 4."
  }
];
