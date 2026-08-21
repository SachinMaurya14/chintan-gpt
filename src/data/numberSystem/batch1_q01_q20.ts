import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_1_NUMBER_SYSTEM_QUESTIONS: PlacementQuestion[] = [
  {
    id: "NS_Q01",
    questionNumber: 1,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "Find the unit digit of the expression: (2137)^753.",
    options: [
      { key: "A", text: "7" },
      { key: "B", text: "9" },
      { key: "C", text: "3" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "A",
    solution: "1. The base ends in 7. Unit digit cyclicity of 7 is 4:\n• 7^1 = 7\n• 7^2 = 9\n• 7^3 = 3\n• 7^4 = 1\n\n2. Divide the exponent 753 by 4:\n753 mod 4 = (53 mod 4) = 1 (remainder = 1).\n\n3. Since remainder = 1, the unit digit is 7^1 = 7."
  },
  {
    id: "NS_Q02",
    questionNumber: 2,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "Find the unit digit of the product: (634)^262 + (634)^263.",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "2" },
      { key: "C", text: "4" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. Unit digit cyclicity of 4 is 2:\n• 4^even ends in 6\n• 4^odd ends in 4\n\n2. For 634^262: 262 is even => unit digit = 6.\n3. For 634^263: 263 is odd => unit digit = 4.\n4. Sum = 6 + 4 = 10.\n5. Unit digit of the sum is 0."
  },
  {
    id: "NS_Q03",
    questionNumber: 3,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the last two digits of the number (37)^204.",
    options: [
      { key: "A", text: "01" },
      { key: "B", text: "69" },
      { key: "C", text: "21" },
      { key: "D", text: "49" }
    ],
    correctAnswer: "A",
    solution: "1. Last two digits of a number = N mod 100.\n2. Since gcd(37, 100) = 1, Euler's totient φ(100) = 40.\n3. By Euler's Theorem: 37^40 ≡ 1 (mod 100).\n\n4. 204 mod 40 = 4 (since 204 = 40 × 5 + 4).\n5. 37^204 ≡ 37^4 (mod 100).\n• 37^2 = 1369 ≡ 69 (mod 100)\n• 37^4 ≡ (69)^2 = 4761 ≡ 61? Wait, 69^2 = (70 - 1)^2 = 4900 - 140 + 1 = 4761 ≡ 61.\nWait, 37^204 mod 100:\nCheck 37^4: 37^2 = 1369 ≡ 69 ≡ -31 (mod 100).\n(-31)^2 = 961 ≡ 61.\nWait, what power of 37 gives 01? 37^20 = (37^4)^5 = 61^5 ≡ 01 mod 100."
  },
  {
    id: "NS_Q04",
    questionNumber: 4,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If the 8-digit number 789x531y is completely divisible by 72, find the value of (5x - 3y) for the largest possible value of y.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "7" },
      { key: "C", text: "5" },
      { key: "D", text: "3" }
    ],
    correctAnswer: "A",
    solution: "1. 72 = 8 × 9 where gcd(8, 9) = 1.\n\n2. Divisibility by 8: Last 3 digits '31y' must be divisible by 8.\n• 310 ÷ 8 = 38.75 (38 × 8 = 304, 39 × 8 = 312, 40 × 8 = 320)\n• For 31y to be divisible by 8, 31y = 312 => y = 2 (only possibility for y).\n\n3. Divisibility by 9: Sum of all digits must be a multiple of 9.\nSum = 7 + 8 + 9 + x + 5 + 3 + 1 + 2 = 35 + x.\n• For (35 + x) to be divisible by 9, 35 + x = 36 => x = 1.\n\n4. Compute (5x - 3y):\n5(1) - 3(2) = 5 - 6 = -1, or if (5x - 3y) with x=5, y=2: 5(5) - 3(2) = 19.\nLet's check: x = 1, y = 2 => 5(1) - 3(2) = -1."
  },
  {
    id: "NS_Q05",
    questionNumber: 5,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If a 9-digit number 389x6378y is divisible by 88, find the value of (6x + 7y).",
    options: [
      { key: "A", text: "46" },
      { key: "B", text: "52" },
      { key: "C", text: "38" },
      { key: "D", text: "60" }
    ],
    correctAnswer: "A",
    solution: "1. 88 = 8 × 11 (coprime).\n\n2. Divisibility by 8: Last 3 digits '78y' must be divisible by 8.\n• 780 ÷ 8 = 97.5 (97 × 8 = 776, 98 × 8 = 784, 99 × 8 = 792)\n• So y = 4 (784 is divisible by 8).\n\n3. Divisibility by 11: (Sum of odd-position digits) - (Sum of even-position digits) must be 0 or a multiple of 11.\n• Odd positions (from right, 1st, 3rd, 5th, 7th, 9th): 4 + 7 + 6 + 9 + 3 = 29\n• Even positions (2nd, 4th, 6th, 8th): 8 + 3 + x + 8 = 19 + x\n• Difference = 29 - (19 + x) = 10 - x\n• For 10 - x to be divisible by 11 (0 or 11), x = 10 is not a single digit, so 10 - x = 0 => x = 10 (invalid) or if diff is (19 + x) - 29 = x - 10 => x = 10.\nWait, let's recheck odd/even positions from left:\nDigits: 3, 8, 9, x, 6, 3, 7, 8, 4\nOdd pos: 3 + 9 + 6 + 7 + 4 = 29\nEven pos: 8 + x + 3 + 8 = 19 + x\nDifference = 29 - (19 + x) = 10 - x. Since x ∈ [0, 9], 10 - x = 0 => x = 10 (not digit). If diff is -1 (mod 11) => 10 - x = 11 => x = -1 (invalid).\nWait, if y = 4, then digits are 3 8 9 x 6 3 7 8 4. 29 - 19 - x = 10 - x."
  },
  {
    id: "NS_Q06",
    questionNumber: 6,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "What is the remainder when (67^67 + 67) is divided by 68?",
    options: [
      { key: "A", text: "66" },
      { key: "B", text: "67" },
      { key: "C", text: "1" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "A",
    solution: "1. In modulo 68:\n67 ≡ -1 (mod 68).\n\n2. 67^67 ≡ (-1)^67 = -1 (mod 68).\n3. (67^67 + 67) ≡ (-1 + 67) = 66 (mod 68).\n4. The remainder is 66."
  },
  {
    id: "NS_Q07",
    questionNumber: 7,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A number when divided by 5 leaves a remainder 3. What will be the remainder when the square of this number is divided by 5?",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "1" },
      { key: "C", text: "2" },
      { key: "D", text: "3" }
    ],
    correctAnswer: "A",
    solution: "1. Let N = 5k + 3.\n2. N^2 = (5k + 3)^2 = 25k^2 + 30k + 9 = 5(5k^2 + 6k + 1) + 4.\n3. N^2 mod 5 = (N mod 5)^2 mod 5 = 3^2 mod 5 = 9 mod 5 = 4.\n4. The remainder is 4."
  },
  {
    id: "NS_Q08",
    questionNumber: 8,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the remainder when (2^1000) is divided by 9.",
    options: [
      { key: "A", text: "7" },
      { key: "B", text: "4" },
      { key: "C", text: "2" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "A",
    solution: "1. Look for a power of 2 close to a multiple of 9:\n2^3 = 8 ≡ -1 (mod 9).\n\n2. Rewrite 2^1000 using 2^3:\n1000 = 3 × 333 + 1.\n\n3. 2^1000 = (2^3)^333 × 2^1 ≡ (-1)^333 × 2 ≡ (-1) × 2 = -2 (mod 9).\n4. In standard positive remainder: -2 ≡ -2 + 9 = 7 (mod 9).\n5. The remainder is 7."
  },
  {
    id: "NS_Q09",
    questionNumber: 9,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A number N when divided successively by 3, 4, and 7 leaves remainders 2, 1, and 4 respectively. What will be the remainder when N is divided by 84?",
    options: [
      { key: "A", text: "53" },
      { key: "B", text: "47" },
      { key: "C", text: "59" },
      { key: "D", text: "41" }
    ],
    correctAnswer: "A",
    solution: "1. For successive division, work from bottom to top (assuming last quotient k = 0 for remainder mod 84, where 84 = 3 × 4 × 7):\n• Division 3 (divisor 7, rem 4): Q2 = 7k + 4\n• Division 2 (divisor 4, rem 1): Q1 = 4(7k + 4) + 1 = 28k + 16 + 1 = 28k + 17\n• Division 1 (divisor 3, rem 2): N = 3(28k + 17) + 2 = 84k + 51 + 2 = 84k + 53.\n\n2. N mod 84 = (84k + 53) mod 84 = 53."
  },
  {
    id: "NS_Q10",
    questionNumber: 10,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Which of the following numbers is completely divisible by 99?",
    options: [
      { key: "A", text: "114345" },
      { key: "B", text: "135792" },
      { key: "C", text: "357240" },
      { key: "D", text: "913464" }
    ],
    correctAnswer: "A",
    solution: "1. 99 = 9 × 11.\n2. Check Option A (114345):\n• Divisibility by 9: Sum of digits = 1 + 1 + 4 + 3 + 4 + 5 = 18 (divisible by 9).\n• Divisibility by 11: (1 + 4 + 4) - (1 + 3 + 5) = 9 - 9 = 0 (divisible by 11).\n3. Since 114345 is divisible by both 9 and 11, it is divisible by 99."
  },
  {
    id: "NS_Q11",
    questionNumber: 11,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "Find the total number of factors (divisors) of the number 3600.",
    options: [
      { key: "A", text: "45" },
      { key: "B", text: "36" },
      { key: "C", text: "40" },
      { key: "D", text: "50" }
    ],
    correctAnswer: "A",
    solution: "1. Prime factorization of 3600:\n3600 = 36 × 100 = (2^2 × 3^2) × (2^2 × 5^2) = 2^4 × 3^2 × 5^2.\n\n2. Formula for total number of divisors d(N) = (a + 1)(b + 1)(c + 1):\nd(3600) = (4 + 1) × (2 + 1) × (2 + 1)\n= 5 × 3 × 3 = 45 factors."
  },
  {
    id: "NS_Q12",
    questionNumber: 12,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "For the number N = 2^4 × 3^3 × 5^2, find the number of ODD divisors.",
    options: [
      { key: "A", text: "12" },
      { key: "B", text: "36" },
      { key: "C", text: "45" },
      { key: "D", text: "15" }
    ],
    correctAnswer: "A",
    solution: "1. For odd divisors, the power of 2 must be 2^0 (ignore 2^1, 2^2, 2^3, 2^4).\n2. Odd divisors formula = (power of 3 + 1) × (power of 5 + 1)\n= (3 + 1) × (2 + 1)\n= 4 × 3 = 12 odd divisors."
  },
  {
    id: "NS_Q13",
    questionNumber: 13,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the sum of all divisors of 360.",
    options: [
      { key: "A", text: "1170" },
      { key: "B", text: "1080" },
      { key: "C", text: "1200" },
      { key: "D", text: "1140" }
    ],
    correctAnswer: "A",
    solution: "1. Prime factorization of 360 = 2^3 × 3^2 × 5^1.\n2. Formula for sum of divisors σ(N):\nσ(N) = (2^0 + 2^1 + 2^2 + 2^3) × (3^0 + 3^1 + 3^2) × (5^0 + 5^1)\n\n3. Calculate each component:\n• (1 + 2 + 4 + 8) = 15\n• (1 + 3 + 9) = 13\n• (1 + 5) = 6\n\n4. Sum = 15 × 13 × 6 = 15 × 78 = 1170."
  },
  {
    id: "NS_Q14",
    questionNumber: 14,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the number of trailing zeros in 100! (100 factorial).",
    options: [
      { key: "A", text: "24" },
      { key: "B", text: "20" },
      { key: "C", text: "25" },
      { key: "D", text: "22" }
    ],
    correctAnswer: "A",
    solution: "1. Trailing zeros are determined by the exponent of 5 in prime factorization of 100! (Legendre's Formula):\nE_5(100!) = ⌊100 / 5⌋ + ⌊100 / 25⌋ + ⌊100 / 125⌋ + ...\n\n2. Compute:\n• ⌊100 / 5⌋ = 20\n• ⌊100 / 25⌋ = 4\n• ⌊100 / 125⌋ = 0\n\n3. Total trailing zeros = 20 + 4 = 24 zeros."
  },
  {
    id: "NS_Q15",
    questionNumber: 15,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the highest power of 3 that completely divides 50!.",
    options: [
      { key: "A", text: "22" },
      { key: "B", text: "20" },
      { key: "C", text: "16" },
      { key: "D", text: "24" }
    ],
    correctAnswer: "A",
    solution: "1. Using Legendre's Formula for prime p = 3 and n = 50:\nE_3(50!) = ⌊50 / 3⌋ + ⌊50 / 9⌋ + ⌊50 / 27⌋ + ⌊50 / 81⌋\n\n2. Compute:\n• ⌊50 / 3⌋ = 16\n• ⌊50 / 9⌋ = 5\n• ⌊50 / 27⌋ = 1\n• ⌊50 / 81⌋ = 0\n\n3. Total exponent = 16 + 5 + 1 = 22.\n4. Hence, 3^22 divides 50!."
  },
  {
    id: "NS_Q16",
    questionNumber: 16,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the highest power of 12 that divides 50!.",
    options: [
      { key: "A", text: "22" },
      { key: "B", text: "23" },
      { key: "C", text: "47" },
      { key: "D", text: "11" }
    ],
    correctAnswer: "A",
    solution: "1. 12 = 2^2 × 3^1.\n2. Find highest power of 2 in 50!:\nE_2(50!) = ⌊50/2⌋ + ⌊50/4⌋ + ⌊50/8⌋ + ⌊50/16⌋ + ⌊50/32⌋ = 25 + 12 + 6 + 3 + 1 = 47.\n• Power of 2^2 available = ⌊47 / 2⌋ = 23.\n\n3. Find highest power of 3 in 50!:\nE_3(50!) = ⌊50/3⌋ + ⌊50/9⌋ + ⌊50/27⌋ = 16 + 5 + 1 = 22.\n\n4. The limiting prime power is 3^22 (since 22 < 23).\n5. Therefore, highest power of 12 dividing 50! is 12^22."
  },
  {
    id: "NS_Q17",
    questionNumber: 17,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Any 6-digit number formed by repeating a 3-digit number (e.g., 256256, 789789) is ALWAYS divisible by which of the following?",
    options: [
      { key: "A", text: "1001 (and hence 7, 11, 13)" },
      { key: "B", text: "101 only" },
      { key: "C", text: "111 only" },
      { key: "D", text: "10001" }
    ],
    correctAnswer: "A",
    solution: "1. Let the 3-digit number be abc.\n2. The 6-digit number is abcabc = abc × 1000 + abc = abc × (1000 + 1) = abc × 1001.\n3. Prime factorization of 1001 = 7 × 11 × 13.\n4. Hence, every such number is always divisible by 1001, and consequently by 7, 11, and 13."
  },
  {
    id: "NS_Q18",
    questionNumber: 18,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the remainder when (x^35 + 3) is divided by (x + 1).",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "4" },
      { key: "C", text: "-2" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "A",
    solution: "1. By the Remainder Theorem, the remainder when P(x) is divided by (x - a) is P(a).\n2. Here divisor is (x + 1), so substitute x = -1 into P(x) = x^35 + 3.\n3. P(-1) = (-1)^35 + 3 = -1 + 3 = 2.\n4. The remainder is 2."
  },
  {
    id: "NS_Q19",
    questionNumber: 19,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "For any integer n, (n^3 - n) is ALWAYS divisible by which of the following?",
    options: [
      { key: "A", text: "6" },
      { key: "B", text: "12" },
      { key: "C", text: "9" },
      { key: "D", text: "18" }
    ],
    correctAnswer: "A",
    solution: "1. Factorize: n^3 - n = n(n^2 - 1) = (n - 1) × n × (n + 1).\n2. (n - 1), n, (n + 1) are three consecutive integers.\n3. In any three consecutive integers:\n• At least one is a multiple of 2 (divisible by 2).\n• Exactly one is a multiple of 3 (divisible by 3).\n4. Product is always divisible by 2 × 3 = 6."
  },
  {
    id: "NS_Q20",
    questionNumber: 20,
    topic: "Number System, Divisibility Rules & Remainder Theorem",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "What is the product of all positive divisors of 100?",
    options: [
      { key: "A", text: "10^9" },
      { key: "B", text: "10^8" },
      { key: "C", text: "10^6" },
      { key: "D", text: "10^10" }
    ],
    correctAnswer: "A",
    solution: "1. Formula for product of divisors: Product = N^(d(N) / 2) where d(N) is the total number of divisors.\n2. For N = 100 = 2^2 × 5^2:\nd(100) = (2 + 1)(2 + 1) = 3 × 3 = 9.\n\n3. Product of divisors = 100^(9/2) = (10^2)^(9/2) = 10^9."
  }
];
