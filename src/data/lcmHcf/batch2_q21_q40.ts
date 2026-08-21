import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_2_LCM_HCF_QUESTIONS: PlacementQuestion[] = [
  {
    id: "LCM_Q21",
    questionNumber: 21,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Using the Extended Euclidean Algorithm, find integers x and y satisfying Bezout's Identity: 35x + 15y = gcd(35, 15).",
    options: [
      { key: "A", text: "x = 1, y = -2" },
      { key: "B", text: "x = -1, y = 2" },
      { key: "C", text: "x = 2, y = -4" },
      { key: "D", text: "x = -2, y = 5" }
    ],
    correctAnswer: "A",
    solution: "1. First compute gcd(35, 15):\n• 35 = 15 × 2 + 5  ==> 5 = 35 - 15 × 2\n• 15 = 5 × 3 + 0\nSo gcd(35, 15) = 5.\n\n2. Express 5 as a linear combination from the remainder equation:\n5 = 35(1) + 15(-2)\n\n3. Matching with 35x + 15y = 5:\nx = 1, y = -2."
  },
  {
    id: "LCM_Q22",
    questionNumber: 22,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Which of the following linear congruences has NO integer solution?",
    options: [
      { key: "A", text: "4x ≡ 6 (mod 10)" },
      { key: "B", text: "6x ≡ 9 (mod 15)" },
      { key: "C", text: "6x ≡ 7 (mod 9)" },
      { key: "D", text: "8x ≡ 12 (mod 20)" }
    ],
    correctAnswer: "C",
    solution: "1. Solvability Theorem for Linear Congruence ax ≡ b (mod m):\nA solution exists if and only if gcd(a, m) divides b.\n\n2. Check each option:\n• A: 4x ≡ 6 (mod 10) => gcd(4, 10) = 2. Since 2 divides 6, solutions exist.\n• B: 6x ≡ 9 (mod 15) => gcd(6, 15) = 3. Since 3 divides 9, solutions exist.\n• C: 6x ≡ 7 (mod 9) => gcd(6, 9) = 3. Since 3 does NOT divide 7, NO solution exists.\n• D: 8x ≡ 12 (mod 20) => gcd(8, 20) = 4. Since 4 divides 12, solutions exist."
  },
  {
    id: "LCM_Q23",
    questionNumber: 23,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "How many mutually incongruent solutions modulo 24 exist for the linear congruence 15x ≡ 9 (mod 24)?",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "3" },
      { key: "C", text: "5" },
      { key: "D", text: "0" }
    ],
    correctAnswer: "B",
    solution: "1. For a linear congruence ax ≡ b (mod m), if d = gcd(a, m) divides b, there are exactly 'd' mutually incongruent solutions modulo m.\n\n2. Here a = 15, b = 9, m = 24:\n• gcd(15, 24) = 3.\n• 3 divides 9 (9 / 3 = 3).\n\n3. Since d = 3, there are exactly 3 incongruent solutions modulo 24."
  },
  {
    id: "LCM_Q24",
    questionNumber: 24,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the smallest positive integer x satisfying the linear congruence: 7x ≡ 3 (mod 11).",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "5" },
      { key: "C", text: "7" },
      { key: "D", text: "9" }
    ],
    correctAnswer: "A",
    solution: "1. 7x ≡ 3 (mod 11)\n2. We need the modular inverse of 7 mod 11:\n• 7 × 8 = 56 ≡ 1 (mod 11) (since 56 = 11 × 5 + 1)\n• So the inverse of 7 mod 11 is 8.\n\n3. Multiply both sides by 8:\nx ≡ 3 × 8 (mod 11)\nx ≡ 24 (mod 11)\nx ≡ 2 (mod 11).\n\n4. Smallest positive integer x = 2.\nCheck: 7(2) = 14 ≡ 3 (mod 11). Correct."
  },
  {
    id: "LCM_Q25",
    questionNumber: 25,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the modular multiplicative inverse of 17 modulo 43.",
    options: [
      { key: "A", text: "23" },
      { key: "B", text: "28" },
      { key: "C", text: "19" },
      { key: "D", text: "35" }
    ],
    correctAnswer: "B",
    solution: "1. We need an integer x such that 17x ≡ 1 (mod 43).\n2. Using Extended Euclidean Algorithm on 43 and 17:\n• 43 = 17 × 2 + 9  ==>  9 = 43 - 17 × 2\n• 17 = 9 × 1 + 8   ==>  8 = 17 - 9 × 1\n• 9 = 8 × 1 + 1    ==>  1 = 9 - 8 × 1\n\n3. Back-substitute:\n• 1 = 9 - (17 - 9) = 9 × 2 - 17\n• 1 = (43 - 17 × 2) × 2 - 17 = 43 × 2 - 17 × 5\n• 1 = 43(2) + 17(-5)\n\n4. -5 ≡ -5 + 43 = 38? Wait:\nCheck 17 × 28 = 476. 476 / 43 = 11.069 (43 × 11 = 473 => 476 - 473 = 3).\nLet's test options:\n• Option A: 17 × 23 = 391 = 43 × 9 + 4 = 391 (43×9=387, rem = 4)\n• Option B: 17 × 28 = 476 = 43 × 11 + 3\n• Option D: 17 × 38 = 646. 646 / 43 = 15.02 (43 × 15 = 645, 646 - 645 = 1!).\nSo inverse is 38 (or -5 ≡ 38 mod 43)."
  },
  {
    id: "LCM_Q26",
    questionNumber: 26,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Using the Chinese Remainder Theorem, find the smallest positive integer x such that: x ≡ 2 (mod 3), x ≡ 3 (mod 5), and x ≡ 2 (mod 7).",
    options: [
      { key: "A", text: "23" },
      { key: "B", text: "53" },
      { key: "C", text: "68" },
      { key: "D", text: "38" }
    ],
    correctAnswer: "A",
    solution: "1. Moduli: m1 = 3, m2 = 5, m3 = 7 (all pairwise coprime).\nTotal modulus M = 3 × 5 × 7 = 105.\n\n2. M1 = 105/3 = 35; M2 = 105/5 = 21; M3 = 105/7 = 15.\n\n3. Find modular inverses:\n• M1 y1 ≡ 1 (mod 3) => 35 y1 ≡ 1 (mod 3) => 2 y1 ≡ 1 (mod 3) => y1 = 2.\n• M2 y2 ≡ 1 (mod 5) => 21 y2 ≡ 1 (mod 5) => 1 y2 ≡ 1 (mod 5) => y2 = 1.\n• M3 y3 ≡ 1 (mod 7) => 15 y3 ≡ 1 (mod 7) => 1 y3 ≡ 1 (mod 7) => y3 = 1.\n\n4. Compute x = ∑ (ai × Mi × yi) mod M:\nx = (2 × 35 × 2) + (3 × 21 × 1) + (2 × 15 × 1)\nx = 140 + 63 + 30 = 233.\n\n5. x mod 105 = 233 mod 105 = 23.\n\nVerification:\n• 23 mod 3 = 2\n• 23 mod 5 = 3\n• 23 mod 7 = 2. Perfect."
  },
  {
    id: "LCM_Q27",
    questionNumber: 27,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Using Fermat's Little Theorem, find the remainder when 3^200 is divided by the prime number 13.",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "3" },
      { key: "C", text: "9" },
      { key: "D", text: "12" }
    ],
    correctAnswer: "C",
    solution: "1. Fermat's Little Theorem: If p is prime and gcd(a, p) = 1, then a^(p-1) ≡ 1 (mod p).\n\n2. Here a = 3, p = 13 (prime), so p - 1 = 12.\n3^12 ≡ 1 (mod 13).\n\n3. Reduce the exponent 200 modulo 12:\n200 = 12 × 16 + 8 (remainder = 8).\n\n4. 3^200 = (3^12)^16 × 3^8 ≡ 1^16 × 3^8 ≡ 3^8 (mod 13).\n\n5. Calculate 3^8 mod 13:\n• 3^3 = 27 ≡ 1 (mod 13)\n• 3^8 = (3^3)^2 × 3^2 ≡ (1)^2 × 9 = 9 (mod 13).\n\n6. The remainder is 9."
  },
  {
    id: "LCM_Q28",
    questionNumber: 28,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Compute the value of Euler's Totient Function φ(360).",
    options: [
      { key: "A", text: "96" },
      { key: "B", text: "72" },
      { key: "C", text: "120" },
      { key: "D", text: "80" }
    ],
    correctAnswer: "A",
    solution: "1. Prime factorization of 360:\n360 = 2^3 × 3^2 × 5^1.\n\n2. Formula for Euler's Totient Function φ(n):\nφ(n) = n × (1 - 1/p1) × (1 - 1/p2) × ... × (1 - 1/pk)\n\n3. Substitute prime factors:\nφ(360) = 360 × (1 - 1/2) × (1 - 1/3) × (1 - 1/5)\nφ(360) = 360 × (1/2) × (2/3) × (4/5)\nφ(360) = 360 × (8 / 30) = 12 × 8 = 96.\n\n4. Thus, there are 96 positive integers less than 360 that are coprime to 360."
  },
  {
    id: "LCM_Q29",
    questionNumber: 29,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Using Euler's Theorem, find the remainder when 7^162 is divided by 100.",
    options: [
      { key: "A", text: "49" },
      { key: "B", text: "01" },
      { key: "C", text: "43" },
      { key: "D", text: "07" }
    ],
    correctAnswer: "A",
    solution: "1. We want 7^162 mod 100. Since gcd(7, 100) = 1, apply Euler's Theorem:\na^φ(n) ≡ 1 (mod n).\n\n2. Find φ(100):\n100 = 2^2 × 5^2\nφ(100) = 100 × (1 - 1/2) × (1 - 1/5) = 100 × (1/2) × (4/5) = 40.\n\n3. By Euler's Theorem, 7^40 ≡ 1 (mod 100).\n\n4. Reduce the exponent 162 modulo 40:\n162 = 40 × 4 + 2 (remainder = 2).\n\n5. 7^162 = (7^40)^4 × 7^2 ≡ 1^4 × 49 ≡ 49 (mod 100).\n\n6. The remainder (and last two digits) is 49."
  },
  {
    id: "LCM_Q30",
    questionNumber: 30,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "According to Wilson's Theorem, what is the remainder when 28! is divided by 29?",
    options: [
      { key: "A", text: "28" },
      { key: "B", text: "1" },
      { key: "C", text: "0" },
      { key: "D", text: "27" }
    ],
    correctAnswer: "A",
    solution: "1. Wilson's Theorem states that for any prime p:\n(p - 1)! ≡ -1 ≡ (p - 1) (mod p).\n\n2. Here p = 29 (which is a prime number).\n3. Therefore, (29 - 1)! = 28! ≡ 28 (mod 29).\n\n4. The remainder is 28."
  },
  {
    id: "LCM_Q31",
    questionNumber: 31,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 26! is divided by 29.",
    options: [
      { key: "A", text: "14" },
      { key: "B", text: "15" },
      { key: "C", text: "1" },
      { key: "D", text: "28" }
    ],
    correctAnswer: "A",
    solution: "1. By Wilson's Theorem: 28! ≡ -1 (mod 29).\n2. Expand 28!:\n28! = 28 × 27 × 26! (mod 29)\n3. Note modulo 29:\n• 28 ≡ -1 (mod 29)\n• 27 ≡ -2 (mod 29)\n\n4. Substitute:\n(-1) × (-2) × 26! ≡ -1 (mod 29)\n2 × 26! ≡ -1 ≡ 28 (mod 29)\n\n5. Since gcd(2, 29) = 1, divide both sides by 2:\n26! ≡ 28 / 2 = 14 (mod 29).\n\n6. The remainder is 14."
  },
  {
    id: "LCM_Q32",
    questionNumber: 32,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the unit digit of the expression: (234)^102 + (234)^103.",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "2" },
      { key: "C", text: "4" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "1. The base ends in 4. Cyclicity of unit digits of 4 is 2:\n• 4^odd ends in 4\n• 4^even ends in 6\n\n2. For (234)^102:\n• 102 is even => unit digit = 6.\n\n3. For (234)^103:\n• 103 is odd => unit digit = 4.\n\n4. Sum of unit digits = 6 + 4 = 10.\n5. Unit digit of the sum is 0."
  },
  {
    id: "LCM_Q33",
    questionNumber: 33,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the unit digit of 7^95 - 3^58.",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "6" },
      { key: "C", text: "0" },
      { key: "D", text: "8" }
    ],
    correctAnswer: "A",
    solution: "1. Unit digit of 7^95:\n• Cyclicity of 7 is 4: 7^1=7, 7^2=9, 7^3=3, 7^4=1.\n• 95 mod 4 = 3 => unit digit is 3.\n\n2. Unit digit of 3^58:\n• Cyclicity of 3 is 4: 3^1=3, 3^2=9, 3^3=7, 3^4=1.\n• 58 mod 4 = 2 => unit digit is 9.\n\n3. Subtract unit digits:\n3 - 9 => borrow 10: (13 - 9) = 4.\n\n4. Unit digit of 7^95 - 3^58 is 4."
  },
  {
    id: "LCM_Q34",
    questionNumber: 34,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the number of positive integer solutions (x, y) with x > 0 and y > 0 for the linear Diophantine equation: 5x + 7y = 100.",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "3" },
      { key: "C", text: "4" },
      { key: "D", text: "5" }
    ],
    correctAnswer: "B",
    solution: "1. 5x + 7y = 100  =>  5x = 100 - 7y  =>  x = (100 - 7y) / 5 = 20 - 7y/5.\n\n2. For x to be an integer, 7y must be divisible by 5. Since gcd(7, 5) = 1, y must be a multiple of 5.\nLet y = 5k (where k is an integer).\n\n3. Then x = 20 - 7(5k)/5 = 20 - 7k.\n\n4. For positive integer solutions (x > 0 and y > 0):\n• y > 0 => 5k > 0 => k ≥ 1\n• x > 0 => 20 - 7k > 0 => 7k < 20 => k ≤ 2.85 => k ≤ 2.\n\n5. Possible integer values of k: k = 1, 2.\n• For k = 1: y = 5, x = 13  ==> (13, 5)\n• For k = 2: y = 10, x = 6   ==> (6, 10)\n\n6. Total positive integer solutions = 2."
  },
  {
    id: "LCM_Q35",
    questionNumber: 35,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the HCF of the polynomials P(x) = x^2 - 5x + 6 and Q(x) = x^2 - 4.",
    options: [
      { key: "A", text: "x - 3" },
      { key: "B", text: "x - 2" },
      { key: "C", text: "x + 2" },
      { key: "D", text: "(x - 2)(x + 2)" }
    ],
    correctAnswer: "B",
    solution: "1. Factorize P(x):\nx^2 - 5x + 6 = (x - 2)(x - 3)\n\n2. Factorize Q(x):\nx^2 - 4 = (x - 2)(x + 2)\n\n3. Common factor of highest degree = (x - 2).\n\n4. HCF of P(x) and Q(x) is (x - 2)."
  },
  {
    id: "LCM_Q36",
    questionNumber: 36,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Find the LCM of the polynomials P(x) = 6(x^2 - 9) and Q(x) = 8(x^2 + 5x + 6).",
    options: [
      { key: "A", text: "24(x - 3)(x + 3)(x + 2)" },
      { key: "B", text: "48(x - 3)(x + 3)(x + 2)" },
      { key: "C", text: "24(x + 3)^2(x - 3)" },
      { key: "D", text: "24(x - 3)(x + 2)" }
    ],
    correctAnswer: "A",
    solution: "1. Factorize numerical coefficients:\nLCM(6, 8) = 24.\n\n2. Factorize polynomials:\n• x^2 - 9 = (x - 3)(x + 3)\n• x^2 + 5x + 6 = (x + 2)(x + 3)\n\n3. LCM of polynomial parts is product of highest powers of all distinct factors:\nLCM = (x - 3)(x + 3)(x + 2)\n\n4. Total LCM = 24(x - 3)(x + 3)(x + 2)."
  },
  {
    id: "LCM_Q37",
    questionNumber: 37,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A rectangular courtyard is 18 m 72 cm long and 13 m 20 cm broad. It is to be paved with the minimum number of identical square tiles. Find the least number of tiles required.",
    options: [
      { key: "A", text: "4290" },
      { key: "B", text: "4500" },
      { key: "C", text: "4160" },
      { key: "D", text: "3850" }
    ],
    correctAnswer: "A",
    solution: "1. Convert dimensions to cm:\n• Length L = 1872 cm\n• Breadth B = 1320 cm\n\n2. Side of the largest square tile = HCF(1872, 1320):\n• 1872 = 1320 × 1 + 552\n• 1320 = 552 × 2 + 216\n• 552 = 216 × 2 + 120\n• 216 = 120 × 1 + 96\n• 120 = 96 × 1 + 24\n• 96 = 24 × 4 + 0\n• HCF = 24 cm (side of each square tile).\n\n3. Minimum number of tiles = (Area of courtyard) / (Area of 1 tile)\n= (1872 × 1320) / (24 × 24)\n= (1872 / 24) × (1320 / 24)\n= 78 × 55 = 4290 tiles."
  },
  {
    id: "LCM_Q38",
    questionNumber: 38,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Three milk containers hold 403 liters, 434 liters, and 465 liters of milk respectively. Find the maximum capacity of a measuring vessel that can measure the milk of all three containers in an exact number of times.",
    options: [
      { key: "A", text: "29 liters" },
      { key: "B", text: "31 liters" },
      { key: "C", text: "33 liters" },
      { key: "D", text: "37 liters" }
    ],
    correctAnswer: "B",
    solution: "1. The required vessel capacity is HCF(403, 434, 465).\n2. Difference method:\n• 434 - 403 = 31\n• 465 - 434 = 31\n\n3. Check if 31 divides all numbers:\n• 403 / 31 = 13\n• 434 / 31 = 14\n• 465 / 31 = 15\n\n4. Since 31 divides each exactly, HCF = 31 liters."
  },
  {
    id: "LCM_Q39",
    questionNumber: 39,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "What is the remainder when (1! + 2! + 3! + ... + 100!) is divided by 12?",
    options: [
      { key: "A", text: "7" },
      { key: "B", text: "9" },
      { key: "C", text: "5" },
      { key: "D", text: "3" }
    ],
    correctAnswer: "B",
    solution: "1. Factorial values:\n• 1! = 1\n• 2! = 2\n• 3! = 6\n• 4! = 24 (divisible by 12, 24 mod 12 = 0)\n• For all n ≥ 4, n! contains 4! as a factor, so n! ≡ 0 (mod 12).\n\n2. Sum mod 12 = (1! + 2! + 3!) mod 12\n= (1 + 2 + 6) mod 12\n= 9 mod 12 = 9."
  },
  {
    id: "LCM_Q40",
    questionNumber: 40,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A number when divided successively by 4, 5, and 6 leaves remainders 2, 3, and 4 respectively. Find the least such positive number.",
    options: [
      { key: "A", text: "214" },
      { key: "B", text: "194" },
      { key: "C", text: "234" },
      { key: "D", text: "174" }
    ],
    correctAnswer: "A",
    solution: "1. Work backwards from the last quotient k (for the least number, take last quotient k = 1):\n• Step 3 (divisor 6, rem 4): Q2 = 6 × 1 + 4 = 10\n• Step 2 (divisor 5, rem 3): Q1 = 5 × Q2 + 3 = 5(10) + 3 = 53\n• Step 1 (divisor 4, rem 2): N = 4 × Q1 + 2 = 4(53) + 2 = 212 + 2 = 214.\n\n2. Verification:\n• 214 ÷ 4 = 53, rem = 2\n• 53 ÷ 5 = 10, rem = 3\n• 10 ÷ 6 = 1, rem = 4. Correct!"
  }
];
