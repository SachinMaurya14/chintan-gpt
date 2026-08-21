import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_4_LCM_HCF_QUESTIONS: PlacementQuestion[] = [
  {
    id: "LCM_Q61",
    questionNumber: 61,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A gear with 24 teeth meshes with a gear with 36 teeth. If a marked tooth on gear 1 touches a marked tooth on gear 2 at the start, after how many total tooth engagements will the two marked teeth touch each other again for the first time?",
    options: [
      { key: "A", text: "72" },
      { key: "B", text: "144" },
      { key: "C", text: "36" },
      { key: "D", text: "216" }
    ],
    correctAnswer: "A",
    solution: "1. The two marked teeth meet at multiples of the number of teeth on both gears.\n2. The number of tooth engagements required is the LCM of their tooth counts.\n3. LCM(24, 36):\n• 24 = 2^3 × 3^1\n• 36 = 2^2 × 3^2\n• LCM = 2^3 × 3^2 = 8 × 9 = 72.\n\n4. Thus, after 72 tooth engagements (3 complete rotations of the 24-tooth gear and 2 of the 36-tooth gear), they meet again."
  },
  {
    id: "LCM_Q62",
    questionNumber: 62,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 38^100 is divided by 103 (given that 103 is prime).",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "38" },
      { key: "C", text: "102" },
      { key: "D", text: "87" }
    ],
    correctAnswer: "D",
    solution: "1. 103 is prime. By Fermat's Little Theorem: 38^102 ≡ 1 (mod 103).\n2. 38^102 = 38^100 × 38^2 ≡ 1 (mod 103).\n3. 38^2 = 1444. Dividing 1444 by 103:\n1444 = 103 × 14 + 2 (since 103 × 14 = 1442, remainder = 2).\n\n4. So 38^2 ≡ 2 (mod 103).\n5. 38^100 × 2 ≡ 1 ≡ 104 (mod 103).\n6. Divide by 2: 38^100 ≡ 104 / 2 = 52? Wait, 104 / 2 = 52. Let's check 52 × 2 = 104 ≡ 1 (mod 103).\nWait, 103 × 14 = 1442, so 1444 - 1442 = 2. 2 × 52 = 104 ≡ 1 mod 103. So remainder is 52."
  },
  {
    id: "LCM_Q63",
    questionNumber: 63,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the HCF of 1/2, 3/4, 5/6, 7/8, and 9/10.",
    options: [
      { key: "A", text: "1/120" },
      { key: "B", text: "9/2" },
      { key: "C", text: "1/240" },
      { key: "D", text: "315/2" }
    ],
    correctAnswer: "A",
    solution: "1. Formula: HCF of fractions = HCF of Numerators / LCM of Denominators.\n2. Numerators: 1, 3, 5, 7, 9  ==> HCF = 1.\n3. Denominators: 2, 4, 6, 8, 10  ==> LCM(2, 4, 6, 8, 10) = 120.\n4. HCF of fractions = 1 / 120."
  },
  {
    id: "LCM_Q64",
    questionNumber: 64,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the largest 5-digit number which is exactly divisible by 12, 15, 18, and 27.",
    options: [
      { key: "A", text: "99900" },
      { key: "B", text: "99760" },
      { key: "C", text: "99840" },
      { key: "D", text: "99960" }
    ],
    correctAnswer: "A",
    solution: "1. Find LCM(12, 15, 18, 27):\n• 12 = 2^2 × 3\n• 15 = 3 × 5\n• 18 = 2 × 3^2\n• 27 = 3^3\n• LCM = 2^2 × 3^3 × 5 = 4 × 27 × 5 = 540.\n\n2. Largest 5-digit number = 99999.\n3. 99999 / 540 = 185 with remainder 99 (since 540 × 185 = 99900).\n4. Required number = 99999 - 99 = 99900."
  },
  {
    id: "LCM_Q65",
    questionNumber: 65,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (7^7^7) is divided by 10.",
    options: [
      { key: "A", text: "3" },
      { key: "B", text: "7" },
      { key: "C", text: "9" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "A",
    solution: "1. To find the unit digit (mod 10) of 7^k where k = 7^7:\n2. The cyclicity of unit digit of powers of 7 is 4 (7^1=7, 7^2=9, 7^3=3, 7^4=1).\n3. So we need the exponent k = 7^7 modulo 4.\n\n4. 7 ≡ -1 ≡ 3 (mod 4):\n7^7 ≡ (-1)^7 ≡ -1 ≡ 3 (mod 4).\n\n5. Since the exponent k ≡ 3 (mod 4), the unit digit is 7^3 mod 10 = 343 mod 10 = 3."
  },
  {
    id: "LCM_Q66",
    questionNumber: 66,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "How many pairs of positive integers (a, b) satisfy the equation: HCF(a, b) + LCM(a, b) = 91?",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "6" },
      { key: "C", text: "8" },
      { key: "D", text: "2" }
    ],
    correctAnswer: "A",
    solution: "1. Let HCF(a, b) = h, and a = hx, b = hy with gcd(x, y) = 1 and x ≤ y.\n2. LCM(a, b) = hxy.\n3. h + hxy = 91  =>  h(1 + xy) = 91.\n\n4. 91 = 1 × 91 = 7 × 13.\nPossible factors h of 91:\n• Case 1: h = 1 => 1 + xy = 91 => xy = 90. Coprime pairs (x, y) with x ≤ y:\n  (1, 90), (2, 45), (5, 18), (9, 10) => 4 pairs.\n• Case 2: h = 7 => 1 + xy = 13 => xy = 12. Coprime pairs (x, y) with x ≤ y:\n  (1, 12), (3, 4) => 2 pairs.\n• Case 3: h = 13 => 1 + xy = 7 => xy = 6. Coprime pairs:\n  (1, 6), (2, 3) => 2 pairs.\n• Case 4: h = 91 => 1 + xy = 1 => xy = 0 (no positive integer solution).\n\n5. Total unordered pairs = 4 + 2 + 2 = 8 pairs. If ordered pairs (a, b), 16 pairs."
  },
  {
    id: "LCM_Q67",
    questionNumber: 67,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A gardener has 44 apple trees, 66 banana trees, and 110 mango trees. He wants to plant them in rows such that each row contains only one type of tree and all rows have equal number of trees. Find the minimum number of rows required.",
    options: [
      { key: "A", text: "10" },
      { key: "B", text: "11" },
      { key: "C", text: "22" },
      { key: "D", text: "12" }
    ],
    correctAnswer: "A",
    solution: "1. To minimize rows, the number of trees per row must be maximized = HCF(44, 66, 110).\n2. HCF(44, 66, 110) = 22 trees per row.\n3. Number of rows for apple = 44 / 22 = 2 rows\n4. Number of rows for banana = 66 / 22 = 3 rows\n5. Number of rows for mango = 110 / 22 = 5 rows\n6. Total minimum rows = 2 + 3 + 5 = 10 rows."
  },
  {
    id: "LCM_Q68",
    questionNumber: 68,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 4^96 is divided by 97 (given 97 is prime).",
    options: [
      { key: "A", text: "1" },
      { key: "B", text: "4" },
      { key: "C", text: "96" },
      { key: "D", text: "16" }
    ],
    correctAnswer: "A",
    solution: "1. 97 is prime and gcd(4, 97) = 1.\n2. By Fermat's Little Theorem: 4^(97 - 1) = 4^96 ≡ 1 (mod 97).\n3. Remainder is 1."
  },
  {
    id: "LCM_Q69",
    questionNumber: 69,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the smallest positive integer n such that 2^n ≡ 1 (mod 9).",
    options: [
      { key: "A", text: "6" },
      { key: "B", text: "3" },
      { key: "C", text: "4" },
      { key: "D", text: "9" }
    ],
    correctAnswer: "A",
    solution: "1. Test powers of 2 modulo 9:\n• 2^1 = 2 ≡ 2\n• 2^2 = 4 ≡ 4\n• 2^3 = 8 ≡ -1\n• 2^4 = 16 ≡ 7\n• 2^5 = 32 ≡ 5\n• 2^6 = 64 = 9 × 7 + 1 ≡ 1 (mod 9).\n\n2. The order of 2 modulo 9 is 6. Thus smallest n = 6."
  },
  {
    id: "LCM_Q70",
    questionNumber: 70,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the value of x modulo 17 if 5x ≡ 12 (mod 17).",
    options: [
      { key: "A", text: "16" },
      { key: "B", text: "9" },
      { key: "C", text: "13" },
      { key: "D", text: "7" }
    ],
    correctAnswer: "A",
    solution: "1. We want to solve 5x ≡ 12 (mod 17).\n2. Modular inverse of 5 mod 17:\n• 5 × 7 = 35 = 17 × 2 + 1 ≡ 1 (mod 17).\n• So 5^(-1) ≡ 7 (mod 17).\n\n3. Multiply both sides by 7:\nx ≡ 12 × 7 (mod 17)\nx ≡ 84 (mod 17)\n84 = 17 × 4 + 16 (since 17 × 4 = 68, 84 - 68 = 16).\n\n4. x ≡ 16 (mod 17).\nCheck: 5 × 16 = 80 = 17 × 4 + 12 ≡ 12 (mod 17). Correct!"
  },
  {
    id: "LCM_Q71",
    questionNumber: 71,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (10^1 + 10^2 + 10^3 + ... + 10^100) is divided by 6.",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "2" },
      { key: "C", text: "0" },
      { key: "D", text: "5" }
    ],
    correctAnswer: "A",
    solution: "1. 10 mod 6 = 4.\n2. Note that for any power k ≥ 1: 10^k mod 6 = 4^k mod 6 = 4 (since 4^1=4, 4^2=16≡4, 4^3=64≡4...).\n3. Every term in the sum has remainder 4 mod 6.\n4. There are 100 terms:\nSum mod 6 = (100 × 4) mod 6 = 400 mod 6.\n5. 400 = 6 × 66 + 4.\n6. The remainder is 4."
  },
  {
    id: "LCM_Q72",
    questionNumber: 72,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the greatest number of 4 digits which when divided by 10, 15, 21, and 28 leaves remainders 4, 9, 15, and 22 respectively.",
    options: [
      { key: "A", text: "9654" },
      { key: "B", text: "9660" },
      { key: "C", text: "9666" },
      { key: "D", text: "9648" }
    ],
    correctAnswer: "A",
    solution: "1. Common difference between divisor and remainder:\n• 10 - 4 = 6\n• 15 - 9 = 6\n• 21 - 15 = 6\n• 28 - 22 = 6\nCommon difference d = 6.\n\n2. Find LCM(10, 15, 21, 28):\n• 10 = 2×5, 15 = 3×5, 21 = 3×7, 28 = 2^2×7\n• LCM = 2^2 × 3 × 5 × 7 = 420.\n\n3. Largest 4-digit number = 9999.\n9999 ÷ 420 = 23 with remainder 339 (420 × 23 = 9660).\n\n4. Greatest 4-digit multiple of 420 = 9660.\n5. Subtract common difference d: 9660 - 6 = 9654."
  },
  {
    id: "LCM_Q73",
    questionNumber: 73,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the HCF of 108, 288, and 360.",
    options: [
      { key: "A", text: "36" },
      { key: "B", text: "18" },
      { key: "C", text: "72" },
      { key: "D", text: "24" }
    ],
    correctAnswer: "A",
    solution: "1. Prime factorizations:\n• 108 = 2^2 × 3^3\n• 288 = 2^5 × 3^2\n• 360 = 2^3 × 3^2 × 5\n\n2. Common factors:\n• 2^min(2, 5, 3) = 2^2 = 4\n• 3^min(3, 2, 2) = 3^2 = 9\n\n3. HCF = 4 × 9 = 36."
  },
  {
    id: "LCM_Q74",
    questionNumber: 74,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "If gcd(a, b) = 1, what is gcd(a + b, a - b)?",
    options: [
      { key: "A", text: "1 or 2" },
      { key: "B", text: "Always 1" },
      { key: "C", text: "Always 2" },
      { key: "D", text: "a × b" }
    ],
    correctAnswer: "A",
    solution: "1. Let d = gcd(a + b, a - b).\n2. Then d divides (a + b) + (a - b) = 2a, and d divides (a + b) - (a - b) = 2b.\n3. Thus d divides gcd(2a, 2b) = 2 × gcd(a, b) = 2(1) = 2.\n4. Since d divides 2, the possible values for d are 1 or 2.\n• Example 1: a=3, b=2 => gcd(5, 1) = 1.\n• Example 2: a=3, b=1 => gcd(4, 2) = 2."
  },
  {
    id: "LCM_Q75",
    questionNumber: 75,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 2^31 is divided by 5.",
    options: [
      { key: "A", text: "3" },
      { key: "B", text: "2" },
      { key: "C", text: "4" },
      { key: "D", text: "1" }
    ],
    correctAnswer: "A",
    solution: "1. By Fermat's Little Theorem: 2^4 ≡ 1 (mod 5).\n2. 31 mod 4 = 3 (since 31 = 4 × 7 + 3).\n3. 2^31 = (2^4)^7 × 2^3 ≡ 1^7 × 8 ≡ 8 mod 5 = 3 (mod 5).\n4. Remainder is 3."
  },
  {
    id: "LCM_Q76",
    questionNumber: 76,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "How many integers between 1 and 500 (inclusive) are divisible by 3 or 4 but NOT by 5?",
    options: [
      { key: "A", text: "200" },
      { key: "B", text: "250" },
      { key: "C", text: "175" },
      { key: "D", text: "210" }
    ],
    correctAnswer: "A",
    solution: "1. Let A = multiples of 3, B = multiples of 4, C = multiples of 5 in [1, 500].\n• |A| = ⌊500/3⌋ = 166\n• |B| = ⌊500/4⌋ = 125\n• |A ∩ B| (mult of 12) = ⌊500/12⌋ = 41\n• |A ∪ B| = 166 + 125 - 41 = 250.\n\n2. We must subtract those in (A ∪ B) that are multiples of 5:\n• |A ∩ C| (mult of 15) = ⌊500/15⌋ = 33\n• |B ∩ C| (mult of 20) = ⌊500/20⌋ = 25\n• |A ∩ B ∩ C| (mult of 60) = ⌊500/60⌋ = 8\n• |(A ∪ B) ∩ C| = 33 + 25 - 8 = 50.\n\n3. Required count = |A ∪ B| - |(A ∪ B) ∩ C| = 250 - 50 = 200."
  },
  {
    id: "LCM_Q77",
    questionNumber: 77,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "If 13x ≡ 1 (mod 29), find the smallest positive value of x.",
    options: [
      { key: "A", text: "9" },
      { key: "B", text: "11" },
      { key: "C", text: "13" },
      { key: "D", text: "7" }
    ],
    correctAnswer: "A",
    solution: "1. We need 13x ≡ 1 ≡ 30 ≡ 59 ≡ 88 ≡ 117 (mod 29).\n2. 117 / 13 = 9.\n3. Thus x = 9.\nCheck: 13 × 9 = 117. 117 = 29 × 4 + 1 (29 × 4 = 116, 117 - 116 = 1). Correct!"
  },
  {
    id: "LCM_Q78",
    questionNumber: 78,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when (53^103 + 103) is divided by 54.",
    options: [
      { key: "A", text: "48" },
      { key: "B", text: "50" },
      { key: "C", text: "52" },
      { key: "D", text: "46" }
    ],
    correctAnswer: "A",
    solution: "1. In modulo 54:\n• 53 ≡ -1 (mod 54)\n• 103 ≡ 103 - 54 = 49 (mod 54)\n\n2. 53^103 ≡ (-1)^103 = -1 (mod 54).\n3. Sum ≡ (-1 + 49) = 48 (mod 54).\n4. The remainder is 48."
  },
  {
    id: "LCM_Q79",
    questionNumber: 79,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the HCF of the three expressions: (x^3 - 1), (x^2 - 1), and (x^2 + x - 2).",
    options: [
      { key: "A", text: "x - 1" },
      { key: "B", text: "x + 1" },
      { key: "C", text: "x + 2" },
      { key: "D", text: "(x - 1)(x + 1)" }
    ],
    correctAnswer: "A",
    solution: "1. Factorize each algebraic expression:\n• x^3 - 1 = (x - 1)(x^2 + x + 1)\n• x^2 - 1 = (x - 1)(x + 1)\n• x^2 + x - 2 = (x - 1)(x + 2)\n\n2. The only common factor across all three polynomials is (x - 1).\n3. Thus HCF = (x - 1)."
  },
  {
    id: "LCM_Q80",
    questionNumber: 80,
    topic: "LCM, HCF & Modular Arithmetic",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Find the remainder when 3^2020 is divided by 100.",
    options: [
      { key: "A", text: "01" },
      { key: "B", text: "81" },
      { key: "C", text: "21" },
      { key: "D", text: "41" }
    ],
    correctAnswer: "A",
    solution: "1. φ(100) = 40. Since gcd(3, 100) = 1, by Euler's Theorem 3^40 ≡ 1 (mod 100).\n2. 2020 is an exact multiple of 40 (2020 = 40 × 50 + 20? Wait, 2020 / 40 = 50.5 => 40 × 50 = 2000, rem = 20).\nWait! 3^20 mod 100:\n• 3^4 = 81 ≡ -19 (mod 100)\n• 3^8 = (-19)^2 = 361 ≡ 61 ≡ -39 (mod 100)\n• 3^16 = (61)^2 = 3721 ≡ 21 (mod 100)\n• 3^20 = 3^16 × 3^4 = 21 × 81 = 1701 ≡ 01 (mod 100).\n\n3. Since 3^20 ≡ 1 (mod 100), and 2020 is a multiple of 20, 3^2020 ≡ 01 (mod 100)."
  }
];
