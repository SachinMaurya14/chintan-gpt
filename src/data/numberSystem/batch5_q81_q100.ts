import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_5_NUMBER_SYSTEM_QUESTIONS: PlacementQuestion[] = [
  {
    id: "NS_Q81",
    questionNumber: 81,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "If n is any positive integer, (n^7 - n) is ALWAYS divisible by which of the following?",
    options: [
      { key: "A", text: "42" },
      { key: "B", text: "21" },
      { key: "C", text: "84" },
      { key: "D", text: "14" }
    ],
    correctAnswer: "A",
    solution: "1. By Fermat's Little Theorem, for prime p = 7:\nn^7 ≡ n (mod 7) => (n^7 - n) is divisible by 7.\n\n2. Factorization: n^7 - n = n(n^6 - 1) = n(n^3 - 1)(n^3 + 1) = n(n - 1)(n^2 + n + 1)(n + 1)(n^2 - n + 1).\n3. Contains (n - 1)n(n + 1), which is the product of 3 consecutive integers, hence divisible by 6.\n4. Since gcd(6, 7) = 1, (n^7 - n) is always divisible by 6 × 7 = 42."
  },
  {
    id: "NS_Q82",
    questionNumber: 82,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (2222^5555 + 5555^2222) is divided by 7.",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "2" },
      { key: "C", text: "4" },
      { key: "D", text: "5" }
    ],
    correctAnswer: "A",
    solution: "1. Modulo 7 bases:\n• 2222 = 7 × 317 + 3 ≡ 3 (mod 7)\n• 5555 = 7 × 793 + 4 ≡ 4 ≡ -3 (mod 7)\n\n2. Modulo 6 exponents (since 7 is prime, Fermat period = 6):\n• 5555 mod 6 = 5 (since 5555 = 6 × 925 + 5)\n• 2222 mod 6 = 2 (since 2222 = 6 × 370 + 2)\n\n3. Evaluate terms:\n• 2222^5555 ≡ 3^5 = 243 ≡ 5 (mod 7)\n• 5555^2222 ≡ 4^2 = 16 ≡ 2 (mod 7)\n\n4. Sum = 5 + 2 = 7 ≡ 0 (mod 7).\n5. The remainder is 0."
  },
  {
    id: "NS_Q83",
    questionNumber: 83,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the unit digit of (13^24 × 17^36 × 19^48).",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "3" },
      { key: "C", text: "7" },
      { key: "D", text: "9" }
    ],
    correctAnswer: "A",
    solution: "1. Unit digit of 13^24:\n• 24 mod 4 = 0 => 3^4 = 81 => unit digit = 1.\n\n2. Unit digit of 17^36:\n• 36 mod 4 = 0 => 7^4 = 2401 => unit digit = 1.\n\n3. Unit digit of 19^48:\n• 48 is even => 9^even ends in 1.\n\n4. Product = 1 × 1 × 1 = 1."
  },
  {
    id: "NS_Q84",
    questionNumber: 84,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (3^257) is divided by 17.",
    options: [
      { key: "A", text: "3" },
      { key: "B", text: "9" },
      { key: "C", text: "1" },
      { key: "D", text: "12" }
    ],
    correctAnswer: "A",
    solution: "1. 17 is prime. By Fermat's Little Theorem: 3^16 ≡ 1 (mod 17).\n2. 257 mod 16 = 1 (since 257 = 16 × 16 + 1).\n3. 3^257 ≡ 3^1 = 3 (mod 17).\n4. The remainder is 3."
  },
  {
    id: "NS_Q85",
    questionNumber: 85,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the sum of all prime numbers between 20 and 40.",
    options: [
      { key: "A", text: "120" },
      { key: "B", text: "119" },
      { key: "C", text: "123" },
      { key: "D", text: "121" }
    ],
    correctAnswer: "A",
    solution: "1. Prime numbers between 20 and 40:\n23, 29, 31, 37.\n2. Sum = 23 + 29 + 31 + 37 = 120."
  },
  {
    id: "NS_Q86",
    questionNumber: 86,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the least number which when divided by 12, 16, 18, and 30 leaves remainder 4 in each case.",
    options: [
      { key: "A", text: "724" },
      { key: "B", text: "364" },
      { key: "C", text: "1444" },
      { key: "D", text: "720" }
    ],
    correctAnswer: "A",
    solution: "1. LCM(12, 16, 18, 30):\n• 12 = 2^2 × 3\n• 16 = 2^4\n• 18 = 2 × 3^2\n• 30 = 2 × 3 × 5\n• LCM = 2^4 × 3^2 × 5 = 16 × 9 × 5 = 720.\n\n2. Least number = 720 + 4 = 724."
  },
  {
    id: "NS_Q87",
    questionNumber: 87,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "How many 3-digit numbers are divisible by 6?",
    options: [
      { key: "A", text: "150" },
      { key: "B", text: "149" },
      { key: "C", text: "151" },
      { key: "D", text: "148" }
    ],
    correctAnswer: "A",
    solution: "1. 3-digit numbers range from 100 to 999.\n2. Number of multiples of 6 up to 999 = ⌊999 / 6⌋ = 166.\n3. Number of multiples of 6 up to 99 = ⌊99 / 6⌋ = 16.\n4. Total 3-digit multiples of 6 = 166 - 16 = 150."
  },
  {
    id: "NS_Q88",
    questionNumber: 88,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (8^88) is divided by 7.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "6" },
      { key: "C", text: "2" },
      { key: "D", text: "4" }
    ],
    correctAnswer: "A",
    solution: "1. 8 ≡ 1 (mod 7).\n2. 8^88 ≡ 1^88 = 1 (mod 7).\n3. The remainder is 1."
  },
  {
    id: "NS_Q89",
    questionNumber: 89,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the highest power of 2 that divides 64!.",
    options: [
      { key: "A", text: "63" },
      { key: "B", text: "62" },
      { key: "C", text: "64" },
      { key: "D", text: "60" }
    ],
    correctAnswer: "A",
    solution: "1. Legendre's Formula for E_2(64!):\n= ⌊64/2⌋ + ⌊64/4⌋ + ⌊64/8⌋ + ⌊64/16⌋ + ⌊64/32⌋ + ⌊64/64⌋\n= 32 + 16 + 8 + 4 + 2 + 1 = 63.\n\nShortcut: For n = 2^k, E_2((2^k)!) = 2^k - 1 = 64 - 1 = 63."
  },
  {
    id: "NS_Q90",
    questionNumber: 90,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "What is the remainder when (6^50) is divided by 215?",
    options: [
      { key: "A", text: "36" },
      { key: "B", text: "6" },
      { key: "C", text: "1" },
      { key: "D", text: "214" }
    ],
    correctAnswer: "A",
    solution: "1. Notice that 6^3 = 216 = 215 + 1 ≡ 1 (mod 215).\n2. 50 = 3 × 16 + 2.\n3. 6^50 = (6^3)^16 × 6^2 ≡ 1^16 × 36 ≡ 36 (mod 215).\n4. The remainder is 36."
  },
  {
    id: "NS_Q91",
    questionNumber: 91,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "If a number N = 111...1 (repeated 12 times), which of the following ALWAYS divides N?",
    options: [
      { key: "A", text: "13" },
      { key: "B", text: "17" },
      { key: "C", text: "19" },
      { key: "D", text: "23" }
    ],
    correctAnswer: "A",
    solution: "1. Any number formed by repeating a single digit 6 times (e.g. 111111) is divisible by 3, 7, 11, 13, and 37.\n2. A 12-digit number of all 1s is 111111 × 1000001.\n3. Since 111111 is divisible by 13 (111111 = 13 × 8547), the 12-digit number is also divisible by 13."
  },
  {
    id: "NS_Q92",
    questionNumber: 92,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (15! + 1) is divided by 17.",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "0" },
      { key: "C", text: "1" },
      { key: "D", text: "16" }
    ],
    correctAnswer: "A",
    solution: "1. By Wilson's Theorem on prime 17: 16! ≡ -1 (mod 17).\n2. 16! = 16 × 15! ≡ -1 × 15! (mod 17).\n3. -15! ≡ -1  =>  15! ≡ 1 (mod 17).\n4. (15! + 1) ≡ 1 + 1 = 2 (mod 17).\n5. The remainder is 2."
  },
  {
    id: "NS_Q93",
    questionNumber: 93,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (2^100) is divided by 25.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "7" },
      { key: "C", text: "14" },
      { key: "D", text: "24" }
    ],
    correctAnswer: "A",
    solution: "1. φ(25) = 25 × (1 - 1/5) = 20.\n2. Since gcd(2, 25) = 1, by Euler's Theorem: 2^20 ≡ 1 (mod 25).\n3. 100 = 20 × 5.\n4. 2^100 = (2^20)^5 ≡ 1^5 = 1 (mod 25).\n5. The remainder is 1."
  },
  {
    id: "NS_Q94",
    questionNumber: 94,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the number of positive divisors of N = 12^3 × 15^4.",
    options: [
      { key: "A", text: "280" },
      { key: "B", text: "240" },
      { key: "C", text: "300" },
      { key: "D", text: "320" }
    ],
    correctAnswer: "A",
    solution: "1. Prime factorize N:\n• 12^3 = (2^2 × 3)^3 = 2^6 × 3^3\n• 15^4 = (3 × 5)^4 = 3^4 × 5^4\n• N = 2^6 × 3^7 × 5^4\n\n2. Total divisors d(N) = (6 + 1)(7 + 1)(4 + 1) = 7 × 8 × 5 = 280."
  },
  {
    id: "NS_Q95",
    questionNumber: 95,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the unit digit of (17^17)^17.",
    options: [
      { key: "A", text: "7" },
      { key: "B", text: "9" },
      { key: "C", text: "3" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "A",
    solution: "1. (17^17)^17 = 17^(17 × 17) = 17^289.\n2. Cyclicity of 7 is 4.\n3. 289 mod 4 = 1.\n4. Unit digit = 7^1 = 7."
  },
  {
    id: "NS_Q96",
    questionNumber: 96,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 10^30 is divided by 11.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "10" },
      { key: "C", text: "0" },
      { key: "D", text: "5" }
    ],
    correctAnswer: "A",
    solution: "1. 10 ≡ -1 (mod 11).\n2. 10^30 ≡ (-1)^30 = 1 (mod 11).\n3. The remainder is 1."
  },
  {
    id: "NS_Q97",
    questionNumber: 97,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the smallest natural number N such that N! ends in exactly 6 trailing zeros.",
    options: [
      { key: "A", text: "25" },
      { key: "B", text: "26" },
      { key: "C", text: "30" },
      { key: "D", text: "20" }
    ],
    correctAnswer: "A",
    solution: "1. E_5(24!) = ⌊24/5⌋ = 4 zeros.\n2. E_5(25!) = ⌊25/5⌋ + ⌊25/25⌋ = 5 + 1 = 6 zeros.\n3. Therefore, the smallest such natural number is 25."
  },
  {
    id: "NS_Q98",
    questionNumber: 98,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (2^100) is divided by 7.",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "4" },
      { key: "C", text: "1" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. 2^3 = 8 ≡ 1 (mod 7).\n2. 100 mod 3 = 1.\n3. 2^100 = (2^3)^33 × 2^1 ≡ 1^33 × 2 = 2 (mod 7).\n4. The remainder is 2."
  },
  {
    id: "NS_Q99",
    questionNumber: 99,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (3^68) is divided by 17.",
    options: [
      { key: "A", text: "13" },
      { key: "B", text: "1" },
      { key: "C", text: "9" },
      { key: "D", text: "3" }
    ],
    correctAnswer: "A",
    solution: "1. By Fermat's Little Theorem: 3^16 ≡ 1 (mod 17).\n2. 68 mod 16 = 4 (since 68 = 16 × 4 + 4).\n3. 3^68 ≡ 3^4 = 81 (mod 17).\n4. 81 mod 17: 17 × 4 = 68 => 81 - 68 = 13.\n5. The remainder is 13."
  },
  {
    id: "NS_Q100",
    questionNumber: 100,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 41^77 is divided by 7.",
    options: [
      { key: "A", text: "6" },
      { key: "B", text: "1" },
      { key: "C", text: "2" },
      { key: "D", text: "4" }
    ],
    correctAnswer: "A",
    solution: "1. 41 ≡ -1 (mod 7) (since 41 = 7 × 6 - 1).\n2. 41^77 ≡ (-1)^77 = -1 (mod 7).\n3. -1 ≡ -1 + 7 = 6 (mod 7).\n4. The remainder is 6."
  }
];
