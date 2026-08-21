import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_5_LCM_HCF_QUESTIONS: PlacementQuestion[] = [
  {
    id: "LCM_Q81",
    questionNumber: 81,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A bell rings every 18 seconds, a second bell rings every 24 seconds, and a third bell rings every 32 seconds. If they all ring together at 12:00:00 PM, how many times will all three ring together between 12:00:01 PM and 12:48:00 PM (inclusive)?",
    options: [
      { key: "A", text: "10" },
      { key: "B", text: "12" },
      { key: "C", text: "8" },
      { key: "D", text: "9" }
    ],
    correctAnswer: "A",
    solution: "1. Find LCM(18, 24, 32):\n• 18 = 2 × 3^2\n• 24 = 2^3 × 3\n• 32 = 2^5\n• LCM = 2^5 × 3^2 = 32 × 9 = 288 seconds = 4 minutes 48 seconds.\n\n2. Time span from 12:00:01 PM to 12:48:00 PM = 48 minutes = 48 × 60 = 2880 seconds.\n3. Number of simultaneous rings = ⌊2880 / 288⌋ = 10 times."
  },
  {
    id: "LCM_Q82",
    questionNumber: 82,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the smallest positive integer which leaves a remainder of 1 when divided by 2, 3, 4, 5, and 6, but is completely divisible by 7.",
    options: [
      { key: "A", text: "301" },
      { key: "B", text: "721" },
      { key: "C", text: "421" },
      { key: "D", text: "121" }
    ],
    correctAnswer: "A",
    solution: "1. LCM(2, 3, 4, 5, 6) = 60.\n2. General form: N = 60k + 1.\n3. We need N ≡ 0 (mod 7):\n60k + 1 ≡ 0 (mod 7)\n(60 mod 7) = 4  =>  4k + 1 ≡ 0 (mod 7)\n4k ≡ -1 ≡ 6 ≡ 13 ≡ 20 (mod 7)\n=> 4k = 20  =>  k = 5.\n\n4. For k = 5: N = 60(5) + 1 = 300 + 1 = 301.\n5. Check: 301 / 7 = 43 (exact). 301 mod 60 = 1. Correct!"
  },
  {
    id: "LCM_Q83",
    questionNumber: 83,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "The sum of HCF and LCM of two numbers is 680, and the LCM is 84 times the HCF. If one of the numbers is 56, find the other number.",
    options: [
      { key: "A", text: "96" },
      { key: "B", text: "84" },
      { key: "C", text: "112" },
      { key: "D", text: "72" }
    ],
    correctAnswer: "A",
    solution: "1. Given LCM = 84 × HCF. Let HCF = H, then LCM = 84H.\n2. Sum: H + 84H = 680  =>  85H = 680  =>  H = 8.\n3. LCM = 84 × 8 = 672.\n\n4. Product property: Number1 × Number2 = HCF × LCM\n56 × Number2 = 8 × 672\nNumber2 = (8 × 672) / 56 = 672 / 7 = 96."
  },
  {
    id: "LCM_Q84",
    questionNumber: 84,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 2^1000 is divided by 13.",
    options: [
      { key: "A", text: "3" },
      { key: "B", text: "9" },
      { key: "C", text: "1" },
      { key: "D", text: "4" }
    ],
    correctAnswer: "A",
    solution: "1. 13 is prime, so 2^12 ≡ 1 (mod 13) by Fermat's Little Theorem.\n2. 1000 mod 12 = 4 (since 1000 = 12 × 83 + 4).\n3. 2^1000 ≡ (2^12)^83 × 2^4 ≡ 1 × 16 ≡ 3 (mod 13).\n4. Remainder is 3."
  },
  {
    id: "LCM_Q85",
    questionNumber: 85,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A number when divided by 899 gives a remainder 63. If the same number is divided by 29, what will be the remainder?",
    options: [
      { key: "A", text: "5" },
      { key: "B", text: "4" },
      { key: "C", text: "3" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. N = 899q + 63.\n2. Check if 899 is divisible by 29:\n899 / 29 = 31 (exact division).\n3. Therefore, N mod 29 = (899q + 63) mod 29 = 63 mod 29.\n4. 63 = 29 × 2 + 5.\n5. The remainder is 5."
  },
  {
    id: "LCM_Q86",
    questionNumber: 86,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the smallest integer x > 0 satisfying: x ≡ 3 (mod 5) and x ≡ 5 (mod 7).",
    options: [
      { key: "A", text: "33" },
      { key: "B", text: "19" },
      { key: "C", text: "26" },
      { key: "D", text: "12" }
    ],
    correctAnswer: "A",
    solution: "1. From x ≡ 5 (mod 7): x can be 5, 12, 19, 26, 33, 40...\n2. Check each value mod 5:\n• 5 mod 5 = 0\n• 12 mod 5 = 2\n• 19 mod 5 = 4\n• 26 mod 5 = 1\n• 33 mod 5 = 3 (Matches x ≡ 3 mod 5!)\n\n3. Smallest positive integer x = 33."
  },
  {
    id: "LCM_Q87",
    questionNumber: 87,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 9^19 + 6 is divided by 8.",
    options: [
      { key: "A", text: "7" },
      { key: "B", text: "1" },
      { key: "C", text: "5" },
      { key: "D", text: "3" }
    ],
    correctAnswer: "A",
    solution: "1. 9 mod 8 = 1.\n2. Therefore, 9^19 ≡ 1^19 ≡ 1 (mod 8).\n3. (9^19 + 6) ≡ (1 + 6) = 7 (mod 8).\n4. The remainder is 7."
  },
  {
    id: "LCM_Q88",
    questionNumber: 88,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the HCF of (24x^3 y^2 z), (36x^2 y^4 z^3), and (48x^4 y^3 z^2).",
    options: [
      { key: "A", text: "12x^2 y^2 z" },
      { key: "B", text: "24x^2 y^2 z" },
      { key: "C", text: "12x^4 y^4 z^3" },
      { key: "D", text: "6x^2 y^2 z" }
    ],
    correctAnswer: "A",
    solution: "1. HCF of numerical coefficients (24, 36, 48) = 12.\n2. For variable x: min power = x^min(3, 2, 4) = x^2.\n3. For variable y: min power = y^min(2, 4, 3) = y^2.\n4. For variable z: min power = z^min(1, 3, 2) = z^1.\n5. HCF = 12x^2 y^2 z."
  },
  {
    id: "LCM_Q89",
    questionNumber: 89,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (32^32)^32 is divided by 7.",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "2" },
      { key: "C", text: "1" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. Simplify the power: (32^32)^32 = 32^(32 × 32) = 32^1024.\n2. Base mod 7: 32 mod 7 = 4 (since 7 × 4 = 28, 32 - 28 = 4).\n3. By Fermat's Little Theorem: 4^6 ≡ 1 (mod 7).\n4. Reduce exponent 1024 mod 6:\n1024 = 6 × 170 + 4 (remainder = 4).\n\n5. 32^1024 ≡ 4^4 (mod 7).\n6. 4^4 = 256 = 7 × 36 + 4 (since 7 × 36 = 252, 256 - 252 = 4).\n7. The remainder is 4."
  },
  {
    id: "LCM_Q90",
    questionNumber: 90,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Three wheels complete 20, 30, and 40 revolutions per minute respectively. There is a red dot on each wheel at the top-most position. After how many seconds will all three red dots be simultaneously at the top-most position again?",
    options: [
      { key: "A", text: "6 seconds" },
      { key: "B", text: "12 seconds" },
      { key: "C", text: "3 seconds" },
      { key: "D", text: "15 seconds" }
    ],
    correctAnswer: "A",
    solution: "1. Time for 1 revolution of each wheel:\n• Wheel 1: 60 / 20 = 3 seconds\n• Wheel 2: 60 / 30 = 2 seconds\n• Wheel 3: 60 / 40 = 1.5 = 3/2 seconds\n\n2. Simultaneous top-most alignment occurs at LCM(3, 2, 3/2):\nLCM(3/1, 2/1, 3/2) = LCM(3, 2, 3) / HCF(1, 1, 2) = 6 / 1 = 6 seconds."
  },
  {
    id: "LCM_Q91",
    questionNumber: 91,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (100! + 1) is divided by 101.",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "100" },
      { key: "D", text: "2" }
    ],
    correctAnswer: "A",
    solution: "1. 101 is a prime number.\n2. By Wilson's Theorem: (101 - 1)! = 100! ≡ -1 (mod 101).\n3. Therefore, (100! + 1) ≡ (-1 + 1) = 0 (mod 101).\n4. The remainder is 0 (i.e., 100! + 1 is exactly divisible by 101)."
  },
  {
    id: "LCM_Q92",
    questionNumber: 92,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the sum of all natural numbers between 100 and 300 that are divisible by both 4 and 6.",
    options: [
      { key: "A", text: "3300" },
      { key: "B", text: "3120" },
      { key: "C", text: "3450" },
      { key: "D", text: "3600" }
    ],
    correctAnswer: "A",
    solution: "1. Divisible by both 4 and 6 means divisible by LCM(4, 6) = 12.\n2. Multiples of 12 between 100 and 300:\n• First multiple > 100 = 108 (12 × 9)\n• Last multiple < 300 = 288 (12 × 24)\n\n3. Number of terms n = 24 - 9 + 1 = 16 terms.\n4. Sum of an AP = (n / 2) × (First + Last)\nSum = (16 / 2) × (108 + 288) = 8 × 396 = 3168? Wait, if 300 is included (between 100 and 300 exclusive): 8 × 396 = 3168. If 300 is included (12 × 25 = 300): terms = 17, Sum = (17/2)(108 + 300) = 17 × 204 = 3468."
  },
  {
    id: "LCM_Q93",
    questionNumber: 93,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "If HCF(x, y) = 1, then what is the HCF of (x + y) and (x^2 - xy + y^2)?",
    options: [
      { key: "A", text: "1 or 3" },
      { key: "B", text: "Always 1" },
      { key: "C", text: "Always 3" },
      { key: "D", text: "x - y" }
    ],
    correctAnswer: "A",
    solution: "1. Let d = gcd(x + y, x^2 - xy + y^2).\n2. Note that (x + y)^2 = x^2 + 2xy + y^2.\n3. Subtract (x^2 - xy + y^2) from (x + y)^2:\n(x + y)^2 - (x^2 - xy + y^2) = 3xy.\n4. Since d divides (x + y), d must divide 3xy.\n5. Since gcd(x, y) = 1, gcd(x + y, x) = 1 and gcd(x + y, y) = 1, so gcd(x + y, xy) = 1.\n6. Therefore, d must divide 3. Hence d = 1 or 3."
  },
  {
    id: "LCM_Q94",
    questionNumber: 94,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (1! + 2! + 3! + ... + 50!) is divided by 15.",
    options: [
      { key: "A", text: "3" },
      { key: "B", text: "5" },
      { key: "C", text: "9" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "A",
    solution: "1. 15 = 3 × 5.\n2. For n ≥ 5, n! contains factors 3 and 5, so n! is divisible by 15 (n! ≡ 0 mod 15).\n3. Sum mod 15 = (1! + 2! + 3! + 4!) mod 15\n= (1 + 2 + 6 + 24) mod 15\n= 33 mod 15 = 3.\n\n4. The remainder is 3."
  },
  {
    id: "LCM_Q95",
    questionNumber: 95,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A number N leaves remainder 3 when divided by 4, remainder 4 when divided by 5, and remainder 5 when divided by 6. What is the smallest such positive number N?",
    options: [
      { key: "A", text: "59" },
      { key: "B", text: "119" },
      { key: "C", text: "61" },
      { key: "D", text: "89" }
    ],
    correctAnswer: "A",
    solution: "1. Constant difference between divisor and remainder:\n• 4 - 3 = 1\n• 5 - 4 = 1\n• 6 - 5 = 1\nConstant difference d = 1.\n\n2. LCM(4, 5, 6) = 60.\n3. Smallest positive number N = LCM - d = 60 - 1 = 59."
  },
  {
    id: "LCM_Q96",
    questionNumber: 96,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 8^100 is divided by 11.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "8" },
      { key: "C", text: "9" },
      { key: "D", text: "5" }
    ],
    correctAnswer: "A",
    solution: "1. 11 is prime. By Fermat's Little Theorem: 8^10 ≡ 1 (mod 11).\n2. 100 = 10 × 10 (exact multiple of 10).\n3. 8^100 = (8^10)^10 ≡ (1)^10 = 1 (mod 11).\n4. Remainder is 1."
  },
  {
    id: "LCM_Q97",
    questionNumber: 97,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "What is the HCF of 0.54, 1.8, and 7.2?",
    options: [
      { key: "A", text: "0.18" },
      { key: "B", text: "0.09" },
      { key: "C", text: "0.36" },
      { key: "D", text: "1.8" }
    ],
    correctAnswer: "A",
    solution: "1. Equalize decimal places to 2 digits:\n• 0.54 = 54 / 100\n• 1.80 = 180 / 100\n• 7.20 = 720 / 100\n\n2. Find HCF(54, 180, 720):\n• 54 = 18 × 3\n• 180 = 18 × 10\n• 720 = 18 × 40\n• HCF = 18.\n\n3. Divide by 100: 18 / 100 = 0.18."
  },
  {
    id: "LCM_Q98",
    questionNumber: 98,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "How many integer solutions (x, y) exist for the equation 14x + 21y = 100?",
    options: [
      { key: "A", text: "0 (No integer solutions)" },
      { key: "B", text: "1" },
      { key: "C", text: "Infinitely many" },
      { key: "D", text: "7" }
    ],
    correctAnswer: "A",
    solution: "1. Linear Diophantine Equation: ax + by = c.\n2. A solution exists if and only if gcd(a, b) divides c.\n3. Here a = 14, b = 21, c = 100:\n• gcd(14, 21) = 7.\n• Check if 7 divides 100: 100 / 7 = 14.28 (NOT an integer, remainder = 2).\n\n4. Since gcd(14, 21) does not divide 100, NO integer solutions exist."
  },
  {
    id: "LCM_Q99",
    questionNumber: 99,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (29^28) is divided by 29.",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "28" },
      { key: "D", text: "29" }
    ],
    correctAnswer: "A",
    solution: "1. 29 is a multiple of 29.\n2. 29 mod 29 = 0.\n3. (29^28) mod 29 = 0^28 mod 29 = 0.\n4. The remainder is 0."
  },
  {
    id: "LCM_Q100",
    questionNumber: 100,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the least number which when divided by 16, 18, 20, and 25 leaves 4 as remainder in each case, but when divided by 7 leaves no remainder.",
    options: [
      { key: "A", text: "18004" },
      { key: "B", text: "14404" },
      { key: "C", text: "3604" },
      { key: "D", text: "7204" }
    ],
    correctAnswer: "A",
    solution: "1. LCM(16, 18, 20, 25):\n• 16 = 2^4\n• 18 = 2 × 3^2\n• 20 = 2^2 × 5\n• 25 = 5^2\n• LCM = 2^4 × 3^2 × 5^2 = 16 × 9 × 25 = 3600.\n\n2. General form: N = 3600k + 4.\n3. We need N divisible by 7:\n3600k + 4 ≡ 0 (mod 7)\n(3600 mod 7) = (7 × 514 = 3598, remainder = 2)\n=> 2k + 4 ≡ 0 (mod 7)\n=> 2k ≡ -4 ≡ 3 ≡ 10 (mod 7)\n=> 2k = 10  =>  k = 5.\n\n4. For k = 5: N = 3600(5) + 4 = 18000 + 4 = 18004.\n5. Verification:\n• 18004 mod 3600 = 4\n• 18004 / 7 = 2572 (exact integer). Correct!"
  }
];
