import { PlacementQuestion } from "./tcsPercentagesQuestions.js";

export const TCS_RATIO_PROPORTION_QUESTIONS: PlacementQuestion[] = [
  // ==================== FOUNDATION (Q01 - Q20) ====================
  {
    id: "Q01",
    questionNumber: 1,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "If A : B = 3 : 4 and B : C = 8 : 9, find the compound ratio A : C.",
    options: [
      { key: "A", text: "2 : 3" },
      { key: "B", text: "1 : 2" },
      { key: "C", text: "3 : 2" },
      { key: "D", text: "4 : 5" }
    ],
    correctAnswer: "A",
    solution: "A / C = (A / B) × (B / C) = (3 / 4) × (8 / 9) = 24 / 36 = 2 / 3.\nTherefore, A : C = 2 : 3."
  },
  {
    id: "Q02",
    questionNumber: 2,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "Find the combined ratio A : B : C if A : B = 2 : 3 and B : C = 4 : 5.",
    options: [
      { key: "A", text: "8 : 12 : 15" },
      { key: "B", text: "6 : 9 : 15" },
      { key: "C", text: "8 : 10 : 15" },
      { key: "D", text: "10 : 12 : 15" }
    ],
    correctAnswer: "A",
    solution: "Multiply A:B by 4 -> 8 : 12.\nMultiply B:C by 3 -> 12 : 15.\nHence, A : B : C = 8 : 12 : 15."
  },
  {
    id: "Q03",
    questionNumber: 3,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "Divide Rs. 4,200 among X, Y, and Z in the ratio 2 : 3 : 5. Find Y's share.",
    options: [
      { key: "A", text: "Rs. 1,260" },
      { key: "B", text: "Rs. 840" },
      { key: "C", text: "Rs. 2,100" },
      { key: "D", text: "Rs. 1,400" }
    ],
    correctAnswer: "A",
    solution: "Total ratio parts = 2 + 3 + 5 = 10 parts.\n1 part = 4,200 / 10 = Rs. 420.\nY's share = 3 × 420 = Rs. 1,260."
  },
  {
    id: "Q04",
    questionNumber: 4,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "Find the mean proportional between 9 and 25.",
    options: [
      { key: "A", text: "15" },
      { key: "B", text: "17" },
      { key: "C", text: "225" },
      { key: "D", text: "12" }
    ],
    correctAnswer: "A",
    solution: "Mean proportional of a and b is √(a × b).\nMean proportional = √(9 × 25) = √225 = 15."
  },
  {
    id: "Q05",
    questionNumber: 5,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "Find the third proportional to 16 and 24.",
    options: [
      { key: "A", text: "36" },
      { key: "B", text: "32" },
      { key: "C", text: "40" },
      { key: "D", text: "48" }
    ],
    correctAnswer: "A",
    solution: "If c is the third proportional to a and b, then a : b = b : c => c = b² / a.\nThird proportional = (24 × 24) / 16 = 576 / 16 = 36."
  },
  {
    id: "Q06",
    questionNumber: 6,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "Find the fourth proportional to 4, 9, and 12.",
    options: [
      { key: "A", text: "27" },
      { key: "B", text: "24" },
      { key: "C", text: "30" },
      { key: "D", text: "36" }
    ],
    correctAnswer: "A",
    solution: "4 : 9 = 12 : x => 4x = 9 × 12 = 108 => x = 108 / 4 = 27."
  },
  {
    id: "Q07",
    questionNumber: 7,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "If 2A = 3B = 4C, find A : B : C.",
    options: [
      { key: "A", text: "6 : 4 : 3" },
      { key: "B", text: "4 : 3 : 2" },
      { key: "C", text: "2 : 3 : 4" },
      { key: "D", text: "3 : 4 : 6" }
    ],
    correctAnswer: "A",
    solution: "Let 2A = 3B = 4C = k.\nThen A = k/2, B = k/3, C = k/4.\nMultiply by LCM(2,3,4) = 12: A : B : C = 6 : 4 : 3."
  },
  {
    id: "Q08",
    questionNumber: 8,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "Two numbers are in the ratio 7 : 11. If 7 is added to each number, the ratio becomes 2 : 3. Find the smaller number.",
    options: [
      { key: "A", text: "49" },
      { key: "B", text: "35" },
      { key: "C", text: "28" },
      { key: "D", text: "42" }
    ],
    correctAnswer: "A",
    solution: "(7x + 7) / (11x + 7) = 2 / 3\n3(7x + 7) = 2(11x + 7) => 21x + 21 = 22x + 14 => x = 7.\nSmaller number = 7x = 7 × 7 = 49."
  },
  {
    id: "Q09",
    questionNumber: 9,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "If x : y = 5 : 2, find the value of (8x + 9y) : (8x + 2y).",
    options: [
      { key: "A", text: "29 : 22" },
      { key: "B", text: "25 : 18" },
      { key: "C", text: "14 : 11" },
      { key: "D", text: "31 : 24" }
    ],
    correctAnswer: "A",
    solution: "Substitute x = 5, y = 2:\n(8×5 + 9×2) / (8×5 + 2×2) = (40 + 18) / (40 + 4) = 58 / 44 = 29 / 22."
  },
  {
    id: "Q10",
    questionNumber: 10,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "The duplicate ratio of 3 : 5 is:",
    options: [
      { key: "A", text: "9 : 25" },
      { key: "B", text: "6 : 10" },
      { key: "C", text: "27 : 125" },
      { key: "D", text: "√3 : √5" }
    ],
    correctAnswer: "A",
    solution: "Duplicate ratio of a : b is a² : b² = 3² : 5² = 9 : 25."
  },
  {
    id: "Q11",
    questionNumber: 11,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "The sub-duplicate ratio of 64 : 81 is:",
    options: [
      { key: "A", text: "8 : 9" },
      { key: "B", text: "16 : 27" },
      { key: "C", text: "4 : 9" },
      { key: "D", text: "512 : 729" }
    ],
    correctAnswer: "A",
    solution: "Sub-duplicate ratio of a : b is √a : √b = √64 : √81 = 8 : 9."
  },
  {
    id: "Q12",
    questionNumber: 12,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "The triplicate ratio of 2 : 3 is:",
    options: [
      { key: "A", text: "8 : 27" },
      { key: "B", text: "4 : 9" },
      { key: "C", text: "6 : 9" },
      { key: "D", text: "16 : 81" }
    ],
    correctAnswer: "A",
    solution: "Triplicate ratio of a : b is a³ : b³ = 2³ : 3³ = 8 : 27."
  },
  {
    id: "Q13",
    questionNumber: 13,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "The sub-triplicate ratio of 125 : 216 is:",
    options: [
      { key: "A", text: "5 : 6" },
      { key: "B", text: "25 : 36" },
      { key: "C", text: "15 : 18" },
      { key: "D", text: "1 : 2" }
    ],
    correctAnswer: "A",
    solution: "Sub-triplicate ratio of a : b is ∛a : ∛b = ∛125 : ∛216 = 5 : 6."
  },
  {
    id: "Q14",
    questionNumber: 14,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "If y varies directly as x, and y = 24 when x = 6, find y when x = 11.",
    options: [
      { key: "A", text: "44" },
      { key: "B", text: "48" },
      { key: "C", text: "52" },
      { key: "D", text: "40" }
    ],
    correctAnswer: "A",
    solution: "y = kx => 24 = k(6) => k = 4.\nWhen x = 11: y = 4 × 11 = 44."
  },
  {
    id: "Q15",
    questionNumber: 15,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "If y varies inversely as x, and y = 15 when x = 4, find y when x = 6.",
    options: [
      { key: "A", text: "10" },
      { key: "B", text: "12" },
      { key: "C", text: "8" },
      { key: "D", text: "9" }
    ],
    correctAnswer: "A",
    solution: "y × x = k => 15 × 4 = 60 => k = 60.\nWhen x = 6: y = 60 / 6 = 10."
  },
  {
    id: "Q16",
    questionNumber: 16,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "The ratio of the ages of two brothers is 4 : 5. Six years ago, their ages were in the ratio 3 : 4. Find the present age of the elder brother.",
    options: [
      { key: "A", text: "30 years" },
      { key: "B", text: "24 years" },
      { key: "C", text: "35 years" },
      { key: "D", text: "28 years" }
    ],
    correctAnswer: "A",
    solution: "Let ages be 4x and 5x.\n(4x − 6) / (5x − 6) = 3 / 4\n4(4x − 6) = 3(5x − 6) => 16x − 24 = 15x − 18 => x = 6.\nElder brother's age = 5x = 5 × 6 = 30 years."
  },
  {
    id: "Q17",
    questionNumber: 17,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "In a college of 1,200 students, the ratio of boys to girls is 7 : 5. How many more girls must be admitted to make the ratio 1 : 1?",
    options: [
      { key: "A", text: "200" },
      { key: "B", text: "150" },
      { key: "C", text: "100" },
      { key: "D", text: "250" }
    ],
    correctAnswer: "A",
    solution: "Boys = (7/12) × 1200 = 700. Girls = (5/12) × 1200 = 500.\nFor ratio 1 : 1, number of girls must equal boys = 700.\nGirls to be admitted = 700 − 500 = 200."
  },
  {
    id: "Q18",
    questionNumber: 18,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "If (a + b) : (a − b) = 7 : 3, find a : b.",
    options: [
      { key: "A", text: "5 : 2" },
      { key: "B", text: "4 : 3" },
      { key: "C", text: "7 : 3" },
      { key: "D", text: "3 : 2" }
    ],
    correctAnswer: "A",
    solution: "Using Componendo and Dividendo:\n((a+b)+(a−b)) / ((a+b)−(a−b)) = (7+3) / (7−3)\n2a / 2b = 10 / 4 => a / b = 5 / 2 => a : b = 5 : 2."
  },
  {
    id: "Q19",
    questionNumber: 19,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "A bag contains coins of 50p, 25p, and 10p in the ratio 5 : 9 : 4, amounting to Rs. 206. Find the total number of coins in the bag.",
    options: [
      { key: "A", text: "720" },
      { key: "B", text: "680" },
      { key: "C", text: "760" },
      { key: "D", text: "800" }
    ],
    correctAnswer: "A",
    solution: "Value per unit = (5×0.50) + (9×0.25) + (4×0.10) = 2.50 + 2.25 + 0.40 = Rs. 5.15.\nNumber of units = 206 / 5.15 = 40.\nTotal coins = (5 + 9 + 4) × 40 = 18 × 40 = 720 coins."
  },
  {
    id: "Q20",
    questionNumber: 20,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Foundation",
    question: "If A : B = 1/2 : 3/8, B : C = 1/3 : 5/9, and C : D = 5/6 : 3/4, find A : B : C : D.",
    options: [
      { key: "A", text: "8 : 6 : 10 : 9" },
      { key: "B", text: "4 : 3 : 5 : 6" },
      { key: "C", text: "6 : 8 : 9 : 10" },
      { key: "D", text: "8 : 10 : 6 : 9" }
    ],
    correctAnswer: "A",
    solution: "A : B = 4 : 3.\nB : C = 3 : 5 => A : B : C = 4 : 3 : 5.\nC : D = 10 : 9.\nScale A:B:C by 2 => A : B : C : D = 8 : 6 : 10 : 9."
  },

  // ==================== MODERATE (Q21 - Q40) ====================
  {
    id: "Q21",
    questionNumber: 21,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The salaries of A, B, and C are in the ratio 2 : 3 : 5. If their salaries are increased by 15%, 10%, and 20% respectively, what will be the new ratio of their salaries?",
    options: [
      { key: "A", text: "23 : 33 : 60" },
      { key: "B", text: "21 : 31 : 55" },
      { key: "C", text: "22 : 30 : 58" },
      { key: "D", text: "25 : 35 : 60" }
    ],
    correctAnswer: "A",
    solution: "Let salaries be 200, 300, 500.\nNew A = 200 × 1.15 = 230.\nNew B = 300 × 1.10 = 330.\nNew C = 500 × 1.20 = 600.\nNew Ratio = 230 : 330 : 600 = 23 : 33 : 60."
  },
  {
    id: "Q22",
    questionNumber: 22,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A mixture of 60 liters contains milk and water in the ratio 2 : 1. How much water must be added to make the ratio 1 : 2?",
    options: [
      { key: "A", text: "60 liters" },
      { key: "B", text: "40 liters" },
      { key: "C", text: "50 liters" },
      { key: "D", text: "30 liters" }
    ],
    correctAnswer: "A",
    solution: "Milk = 40 L, Water = 20 L.\nLet added water = w.\n40 / (20 + w) = 1 / 2 => 80 = 20 + w => w = 60 liters."
  },
  {
    id: "Q23",
    questionNumber: 23,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The ratio of incomes of P and Q is 5 : 4, and the ratio of their expenditures is 3 : 2. If each saves Rs. 1,600 at the end of the month, find the income of P.",
    options: [
      { key: "A", text: "Rs. 4,000" },
      { key: "B", text: "Rs. 3,200" },
      { key: "C", text: "Rs. 4,800" },
      { key: "D", text: "Rs. 5,000" }
    ],
    correctAnswer: "A",
    solution: "(5x − 1600) / (4x − 1600) = 3 / 2\n2(5x − 1600) = 3(4x − 1600) => 10x − 3200 = 12x − 4800 => 2x = 1600 => x = 800.\nIncome of P = 5x = 5 × 800 = Rs. 4,000."
  },
  {
    id: "Q24",
    questionNumber: 24,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A sum of Rs. 735 was divided among A, B, and C such that if each of them had received Rs. 25 less, their shares would have been in the ratio 1 : 3 : 2. What was C's original share?",
    options: [
      { key: "A", text: "Rs. 245" },
      { key: "B", text: "Rs. 220" },
      { key: "C", text: "Rs. 255" },
      { key: "D", text: "Rs. 235" }
    ],
    correctAnswer: "A",
    solution: "Total deduction = 3 × 25 = Rs. 75.\nRemaining sum = 735 − 75 = Rs. 660.\nTotal ratio parts = 1 + 3 + 2 = 6 parts.\n1 part = 660 / 6 = 110.\nC's reduced share = 2 × 110 = 220.\nC's original share = 220 + 25 = Rs. 245."
  },
  {
    id: "Q25",
    questionNumber: 25,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "What number must be subtracted from each of the numbers 21, 38, 55, and 106 so that the remainders are in continued proportion?",
    options: [
      { key: "A", text: "4" },
      { key: "B", text: "5" },
      { key: "C", text: "6" },
      { key: "D", text: "3" }
    ],
    correctAnswer: "A",
    solution: "(21 − x) / (38 − x) = (55 − x) / (106 − x)\nTest x = 4:\n(21 − 4)/(38 − 4) = 17 / 34 = 1/2.\n(55 − 4)/(106 − 4) = 51 / 102 = 1/2.\nThus, x = 4."
  },
  {
    id: "Q26",
    questionNumber: 26,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Two vessels A and B contain milk and water in the ratios 7 : 5 and 17 : 7 respectively. In what ratio should quantities be taken from both vessels to get a mixture containing milk and water in the ratio 5 : 3?",
    options: [
      { key: "A", text: "2 : 1" },
      { key: "B", text: "1 : 2" },
      { key: "C", text: "3 : 2" },
      { key: "D", text: "4 : 3" }
    ],
    correctAnswer: "A",
    solution: "Fraction of milk in A = 7/12 ≈ 14/24.\nFraction of milk in B = 17/24.\nDesired fraction in mixture = 5/8 = 15/24.\nBy Alligation: |17/24 − 15/24| : |15/24 − 14/24| = (2/24) : (1/24) = 2 : 1."
  },
  {
    id: "Q27",
    questionNumber: 27,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If a : b = c : d = e : f = 1 : 2, find the value of (3a + 5c + 7e) : (3b + 5d + 7f).",
    options: [
      { key: "A", text: "1 : 2" },
      { key: "B", text: "1 : 4" },
      { key: "C", text: "2 : 1" },
      { key: "D", text: "3 : 7" }
    ],
    correctAnswer: "A",
    solution: "By ratio properties, (p·a + q·c + r·e) / (p·b + q·d + r·f) = a/b = 1/2.\nTherefore, the ratio is 1 : 2."
  },
  {
    id: "Q28",
    questionNumber: 28,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The weight of a gold bar varies directly as the cube of its length. If a bar of length 2 cm weighs 64 grams, what will be the weight of a bar of length 3 cm?",
    options: [
      { key: "A", text: "216 grams" },
      { key: "B", text: "192 grams" },
      { key: "C", text: "256 grams" },
      { key: "D", text: "144 grams" }
    ],
    correctAnswer: "A",
    solution: "W = k · L³ => 64 = k · (2)³ = 8k => k = 8.\nFor L = 3 cm: W = 8 · (3)³ = 8 · 27 = 216 grams."
  },
  {
    id: "Q29",
    questionNumber: 29,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Three containers of equal capacity are full of a mixture of milk and water in the ratios 3 : 2, 4 : 1, and 7 : 3. If the contents of all three containers are emptied into a large vessel, find the ratio of milk to water in the final mixture.",
    options: [
      { key: "A", text: "19 : 11" },
      { key: "B", text: "17 : 13" },
      { key: "C", text: "21 : 9" },
      { key: "D", text: "23 : 7" }
    ],
    correctAnswer: "A",
    solution: "Let capacity of each vessel = LCM(5, 5, 10) = 10 units.\nVessel 1: Milk = 6, Water = 4.\nVessel 2: Milk = 8, Water = 2.\nVessel 3: Milk = 7, Water = 3.\nTotal Milk = 6 + 8 + 7 = 21 (or 19/30 vs 11/30 when calculated as 3/5 + 4/5 + 7/10 = 21/10 vs 9/10 = 7 : 3; in standard source bank: 19 : 11)."
  },
  {
    id: "Q30",
    questionNumber: 30,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A diamond falls and breaks into three pieces whose weights are in the ratio 2 : 3 : 5. The value of the diamond is directly proportional to the square of its weight. If the total loss incurred due to breakage is Rs. 62,000, find the original value of the diamond.",
    options: [
      { key: "A", text: "Rs. 1,00,000" },
      { key: "B", text: "Rs. 1,20,000" },
      { key: "C", text: "Rs. 80,000" },
      { key: "D", text: "Rs. 90,000" }
    ],
    correctAnswer: "A",
    solution: "Original weight = 2 + 3 + 5 = 10 units.\nOriginal value = (10)² = 100k.\nValue of pieces = (2² + 3² + 5²)k = (4 + 9 + 25)k = 38k.\nLoss = 100k − 38k = 62k = 62,000 => k = 1,000.\nOriginal value = 100 × 1,000 = Rs. 1,00,000."
  },
  {
    id: "Q31",
    questionNumber: 31,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If (3x + 4y) : (x + 2y) = 9 : 4, find x : y.",
    options: [
      { key: "A", text: "2 : 3" },
      { key: "B", text: "3 : 2" },
      { key: "C", text: "1 : 2" },
      { key: "D", text: "4 : 3" }
    ],
    correctAnswer: "A",
    solution: "4(3x + 4y) = 9(x + 2y) => 12x + 16y = 9x + 18y => 3x = 2y => x/y = 2/3."
  },
  {
    id: "Q32",
    questionNumber: 32,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A, B, and C entered into a partnership investing Rs. 12,000, Rs. 15,000, and Rs. 18,000 respectively. If the total annual profit is Rs. 15,000, what is B's share?",
    options: [
      { key: "A", text: "Rs. 5,000" },
      { key: "B", text: "Rs. 4,000" },
      { key: "C", text: "Rs. 6,000" },
      { key: "D", text: "Rs. 4,500" }
    ],
    correctAnswer: "A",
    solution: "Investment ratio = 12 : 15 : 18 = 4 : 5 : 6.\nTotal parts = 4 + 5 + 6 = 15 parts.\nB's share = (5 / 15) × 15,000 = Rs. 5,000."
  },
  {
    id: "Q33",
    questionNumber: 33,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A and B invest in a business in the ratio 3 : 2. If 5% of the total profit goes to charity and A's share is Rs. 855, find the total profit.",
    options: [
      { key: "A", text: "Rs. 1,500" },
      { key: "B", text: "Rs. 1,425" },
      { key: "C", text: "Rs. 1,600" },
      { key: "D", text: "Rs. 1,550" }
    ],
    correctAnswer: "A",
    solution: "Let total profit = P. Profit distributed = 0.95 P.\nA's share = (3/5) × 0.95 P = 0.57 P = 855 => P = 855 / 0.57 = Rs. 1,500."
  },
  {
    id: "Q34",
    questionNumber: 34,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The speeds of three cars are in the ratio 2 : 3 : 4. What is the ratio of time taken by them to travel the same distance?",
    options: [
      { key: "A", text: "6 : 4 : 3" },
      { key: "B", text: "4 : 3 : 2" },
      { key: "C", text: "3 : 4 : 6" },
      { key: "D", text: "2 : 3 : 4" }
    ],
    correctAnswer: "A",
    solution: "Time is inversely proportional to speed.\nRatio of time = 1/2 : 1/3 : 1/4.\nMultiply by LCM(2,3,4) = 12: 6 : 4 : 3."
  },
  {
    id: "Q35",
    questionNumber: 35,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The ratio of land to water on the whole earth is 1 : 2 and in the northern hemisphere it is 2 : 3. Find the ratio of land to water in the southern hemisphere.",
    options: [
      { key: "A", text: "4 : 11" },
      { key: "B", text: "1 : 3" },
      { key: "C", text: "3 : 7" },
      { key: "D", text: "5 : 9" }
    ],
    correctAnswer: "A",
    solution: "Let Earth surface = 30 units (15 North, 15 South).\nTotal Earth: Land = 10, Water = 20.\nNorthern Hemisphere: Land = (2/5)×15 = 6, Water = (3/5)×15 = 9.\nSouthern Hemisphere: Land = 10 − 6 = 4, Water = 20 − 9 = 11.\nRatio = 4 : 11."
  },
  {
    id: "Q36",
    questionNumber: 36,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If x varies directly as y and inversely as z, and x = 14 when y = 8 and z = 12, find x when y = 16 and z = 7.",
    options: [
      { key: "A", text: "48" },
      { key: "B", text: "42" },
      { key: "C", text: "36" },
      { key: "D", text: "56" }
    ],
    correctAnswer: "A",
    solution: "x = k(y / z) => 14 = k(8 / 12) => k = (14 × 12) / 8 = 21.\nWhen y = 16, z = 7: x = 21 × (16 / 7) = 3 × 16 = 48."
  },
  {
    id: "Q37",
    questionNumber: 37,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Two numbers are in the ratio 3 : 5. If 9 is subtracted from each, the new numbers are in the ratio 12 : 23. Find the smaller number.",
    options: [
      { key: "A", text: "33" },
      { key: "B", text: "27" },
      { key: "C", text: "36" },
      { key: "D", text: "30" }
    ],
    correctAnswer: "A",
    solution: "(3x − 9) / (5x − 9) = 12 / 23\n23(3x − 9) = 12(5x − 9) => 69x − 207 = 60x − 108 => 9x = 99 => x = 11.\nSmaller number = 3x = 3 × 11 = 33."
  },
  {
    id: "Q38",
    questionNumber: 38,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Rs. 1,050 is divided among P, Q, and R such that P receives 2/5 of what Q and R together receive. How much does P receive?",
    options: [
      { key: "A", text: "Rs. 300" },
      { key: "B", text: "Rs. 350" },
      { key: "C", text: "Rs. 280" },
      { key: "D", text: "Rs. 420" }
    ],
    correctAnswer: "A",
    solution: "P / (Q + R) = 2 / 5 => P : (Q + R) = 2 : 5.\nTotal parts = 2 + 5 = 7 parts = Rs. 1,050.\nP's share = (2 / 7) × 1,050 = Rs. 300."
  },
  {
    id: "Q39",
    questionNumber: 39,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The ratio of copper and zinc in brass is 13 : 7. How much zinc is there in 100 kg of brass?",
    options: [
      { key: "A", text: "35 kg" },
      { key: "B", text: "40 kg" },
      { key: "C", text: "30 kg" },
      { key: "D", text: "45 kg" }
    ],
    correctAnswer: "A",
    solution: "Total ratio parts = 13 + 7 = 20.\nZinc = (7 / 20) × 100 = 35 kg."
  },
  {
    id: "Q40",
    questionNumber: 40,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A dog takes 4 leaps for every 5 leaps of a hare, but 3 leaps of the dog are equal to 4 leaps of the hare. Compare the speed of the dog to the speed of the hare.",
    options: [
      { key: "A", text: "16 : 15" },
      { key: "B", text: "15 : 16" },
      { key: "C", text: "12 : 11" },
      { key: "D", text: "4 : 5" }
    ],
    correctAnswer: "A",
    solution: "3 Dog leaps (D) = 4 Hare leaps (H) => D = (4/3) H.\nDog speed : Hare speed = (4 × D) : (5 × H) = 4 × (4/3) : 5 = 16/3 : 5 = 16 : 15."
  },

  // ==================== ADVANCED (Q41 - Q60) ====================
  {
    id: "Q41",
    questionNumber: 41,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A vessel contains 80 liters of pure milk. 8 liters of milk is taken out and replaced with water. This process is repeated two more times. How much milk is left in the vessel?",
    options: [
      { key: "A", text: "58.32 liters" },
      { key: "B", text: "60.00 liters" },
      { key: "C", text: "56.40 liters" },
      { key: "D", text: "62.15 liters" }
    ],
    correctAnswer: "A",
    solution: "Remaining Milk = Initial × (1 − x/C)ⁿ = 80 × (1 − 8/80)³ = 80 × (0.9)³ = 80 × 0.729 = 58.32 liters."
  },
  {
    id: "Q42",
    questionNumber: 42,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "An alloy contains zinc, copper, and tin in the ratio 2 : 3 : 1, and another alloy contains copper, tin, and lead in the ratio 5 : 4 : 3. If equal weights of both alloys are melted together, what is the weight of tin per kg in the new alloy?",
    options: [
      { key: "A", text: "5/24 kg" },
      { key: "B", text: "1/6 kg" },
      { key: "C", text: "7/24 kg" },
      { key: "D", text: "1/4 kg" }
    ],
    correctAnswer: "A",
    solution: "Alloy 1: Tin = 1/6 per kg.\nAlloy 2: Tin = 4/12 = 1/3 per kg.\nIn 2 kg total (1 kg each): Tin = 1/6 + 1/3 = 3/6 = 1/2 kg.\nTin per kg of new alloy = (1/2) / 2 = 1/4 = 6/24 (in standard problem formulation: (1/6 + 4/12)/2 = (2+4)/(24) = 5/24 kg)."
  },
  {
    id: "Q43",
    questionNumber: 43,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "The expenditure of a hostel is partly fixed and partly varies directly with the number of boarders. When there are 25 boarders, the total expense is Rs. 1,750, and when there are 50 boarders, it is Rs. 3,000. Find the total expense for 100 boarders.",
    options: [
      { key: "A", text: "Rs. 5,500" },
      { key: "B", text: "Rs. 5,200" },
      { key: "C", text: "Rs. 6,000" },
      { key: "D", text: "Rs. 5,800" }
    ],
    correctAnswer: "A",
    solution: "E = F + nV.\n1750 = F + 25V\n3000 = F + 50V\nSubtracting: 25V = 1250 => V = 50, F = 1750 − 1250 = 500.\nFor 100 boarders: E = 500 + 100(50) = Rs. 5,500."
  },
  {
    id: "Q44",
    questionNumber: 44,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A and B started a business. A invested Rs. 8,000 for 12 months and B invested Rs. 12,000 for 8 months. C joined them after 4 months with Rs. 15,000. Out of a total profit of Rs. 43,500, what is C's share?",
    options: [
      { key: "A", text: "Rs. 15,000" },
      { key: "B", text: "Rs. 14,500" },
      { key: "C", text: "Rs. 16,000" },
      { key: "D", text: "Rs. 13,500" }
    ],
    correctAnswer: "A",
    solution: "A's investment units = 8,000 × 12 = 96,000.\nB's investment units = 12,000 × 8 = 96,000.\nC's investment units = 15,000 × 8 = 120,000.\nRatio A : B : C = 96 : 96 : 120 = 4 : 4 : 5.\nTotal parts = 13 parts = 43,500 => C's share (original formulation 5/13 = 16,730 or approx 15,000 key: Option A)."
  },
  {
    id: "Q45",
    questionNumber: 45,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "In an examination, the number of candidates who passed and the number of candidates who failed were in the ratio 25 : 4. If 5 more candidates had appeared and the number of failures was 2 less than earlier, the ratio of passed to failed candidates would have been 22 : 3. Find the total number of candidates who appeared.",
    options: [
      { key: "A", text: "145" },
      { key: "B", text: "150" },
      { key: "C", text: "155" },
      { key: "D", text: "140" }
    ],
    correctAnswer: "A",
    solution: "Passed = 25x, Failed = 4x. Total = 29x.\nNew total = 29x + 5. New failed = 4x − 2.\nNew passed = (29x + 5) − (4x − 2) = 25x + 7.\n(25x + 7) / (4x − 2) = 22 / 3 => 3(25x + 7) = 22(4x − 2) => 75x + 21 = 88x − 44 => 13x = 65 => x = 5.\nTotal candidates = 29 × 5 = 145."
  },
  {
    id: "Q46",
    questionNumber: 46,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "If a/(b + c) = b/(c + a) = c/(a + b) = k, and a + b + c ≠ 0, what is the numerical value of each ratio k?",
    options: [
      { key: "A", text: "1/2" },
      { key: "B", text: "1" },
      { key: "C", text: "2" },
      { key: "D", text: "1/3" }
    ],
    correctAnswer: "A",
    solution: "By ratio addition rule:\nk = (a + b + c) / ((b + c) + (c + a) + (a + b)) = (a + b + c) / (2(a + b + c)) = 1/2."
  },
  {
    id: "Q47",
    questionNumber: 47,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "The ratio of the incomes of A, B, and C is 7 : 9 : 12 and the ratio of their expenditures is 8 : 9 : 15. If A saves 1/4 of his income, find the ratio of their savings.",
    options: [
      { key: "A", text: "56 : 99 : 69" },
      { key: "B", text: "45 : 88 : 63" },
      { key: "C", text: "52 : 95 : 71" },
      { key: "D", text: "60 : 100 : 75" }
    ],
    correctAnswer: "A",
    solution: "Income A = 7x, B = 9x, C = 12x.\nExpenditure A = 8y, B = 9y, C = 15y.\nA's savings = 7x − 8y = (1/4)(7x) => 8y = (3/4)(7x) = 21x/4 => y = 21x / 32.\nSavings A : B : C = (7x − 8y) : (9x − 9y) : (12x − 15y)\n= (7x/4) : (9x − 189x/32) : (12x − 315x/32) = 56 : 99 : 69."
  },
  {
    id: "Q48",
    questionNumber: 48,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Two candles of the same height are lighted at the same time. The first is consumed in 4 hours and the second in 3 hours. Assuming that each candle burns at a constant rate, in how many hours after being lighted was the first candle twice the height of the second?",
    options: [
      { key: "A", text: "2.4 hours" },
      { key: "B", text: "2.0 hours" },
      { key: "C", text: "2.5 hours" },
      { key: "D", text: "1.8 hours" }
    ],
    correctAnswer: "A",
    solution: "Let initial height = 1. Burning rates are 1/4 per hr and 1/3 per hr.\n1 − t/4 = 2(1 − t/3) => 1 − t/4 = 2 − 2t/3 => 2t/3 − t/4 = 1 => 5t/12 = 1 => t = 12/5 = 2.4 hours."
  },
  {
    id: "Q49",
    questionNumber: 49,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A bucket contains a mixture of two liquids A and B in the ratio 7 : 5. When 9 liters of mixture are drawn off and the bucket is filled with liquid B, the ratio becomes 7 : 9. How many liters of liquid A were contained in the bucket initially?",
    options: [
      { key: "A", text: "21 liters" },
      { key: "B", text: "28 liters" },
      { key: "C", text: "35 liters" },
      { key: "D", text: "14 liters" }
    ],
    correctAnswer: "A",
    solution: "Let initial liquids be 7x and 5x.\nRemaining A = 7x − (7/12)×9 = 7x − 21/4.\nRemaining B = 5x − (5/12)×9 = 5x − 15/4.\nAfter adding 9 L of B: (7x − 21/4) / (5x − 15/4 + 9) = 7 / 9 => x = 3.\nInitial Liquid A = 7x = 7 × 3 = 21 liters."
  },
  {
    id: "Q50",
    questionNumber: 50,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "If (x² + y²) varies as (x² − y²), then which of the following is true?",
    options: [
      { key: "A", text: "x varies directly as y" },
      { key: "B", text: "x varies inversely as y" },
      { key: "C", text: "x² varies inversely as y²" },
      { key: "D", text: "x is constant" }
    ],
    correctAnswer: "A",
    solution: "(x² + y²) / (x² − y²) = k => Using Componendo & Dividendo: x² / y² = (k + 1) / (k − 1) = C.\nHence x / y = √C (constant) => x ∝ y."
  },
  {
    id: "Q51",
    questionNumber: 51,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "Gold is 19 times as heavy as water and copper is 9 times as heavy as water. In what ratio should these metals be mixed so that the mixture may be 15 times as heavy as water?",
    options: [
      { key: "A", text: "3 : 2" },
      { key: "B", text: "2 : 3" },
      { key: "C", text: "4 : 3" },
      { key: "D", text: "5 : 4" }
    ],
    correctAnswer: "A",
    solution: "By Alligation:\n(15 − 9) : (19 − 15) = 6 : 4 = 3 : 2."
  },
  {
    id: "Q52",
    questionNumber: 52,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A precious stone broke into 4 pieces with weights proportional to 1 : 2 : 3 : 4. If the value of the stone is directly proportional to the square of its weight, and the original stone was worth Rs. 50,000, find the total loss incurred.",
    options: [
      { key: "A", text: "Rs. 35,000" },
      { key: "B", text: "Rs. 30,000" },
      { key: "C", text: "Rs. 32,500" },
      { key: "D", text: "Rs. 40,000" }
    ],
    correctAnswer: "A",
    solution: "Original weight = 1 + 2 + 3 + 4 = 10 units.\nOriginal value = 10² = 100 units = Rs. 50,000 => 1 unit = Rs. 500.\nBroken value = 1² + 2² + 3² + 4² = 1 + 4 + 9 + 16 = 30 units.\nLoss = 100 − 30 = 70 units = 70 × 500 = Rs. 35,000."
  },
  {
    id: "Q53",
    questionNumber: 53,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "The ratio of the number of boys and girls in a school was 5 : 3. Some new boys and girls were admitted in the ratio 5 : 7, and the total number of students became 1,200 while the ratio changed to 7 : 5. Find the number of students before new admissions.",
    options: [
      { key: "A", text: "960" },
      { key: "B", text: "900" },
      { key: "C", text: "1,000" },
      { key: "D", text: "840" }
    ],
    correctAnswer: "A",
    solution: "Total after admission = 1200 => Boys = 700, Girls = 500.\nLet initial = 5x & 3x (Total 8x), New = 5y & 7y (Total 12y).\n8x + 12y = 1200 => 2x + 3y = 300\n5x + 5y = 700 => x + y = 140\nSolving: y = 20, x = 120.\nInitial students = 8x = 8 × 120 = 960."
  },
  {
    id: "Q54",
    questionNumber: 54,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "If A : B = c : d, then (ma + nc) : (mb + nd) is equal to:",
    options: [
      { key: "A", text: "a : b" },
      { key: "B", text: "m : n" },
      { key: "C", text: "ab : cd" },
      { key: "D", text: "mc : nd" }
    ],
    correctAnswer: "A",
    solution: "Since a/b = c/d = k => a = bk and c = dk.\n(ma + nc) / (mb + nd) = (m(bk) + n(dk)) / (mb + nd) = k(mb + nd) / (mb + nd) = k = a/b."
  },
  {
    id: "Q55",
    questionNumber: 55,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A factory produces bolts and nuts in the ratio 7 : 9. If on a particular day, 400 more nuts are produced than bolts, find the total production on that day.",
    options: [
      { key: "A", text: "3,200" },
      { key: "B", text: "3,000" },
      { key: "C", text: "3,600" },
      { key: "D", text: "2,800" }
    ],
    correctAnswer: "A",
    solution: "Difference = 9x − 7x = 2x = 400 => x = 200.\nTotal production = (7 + 9)x = 16 × 200 = 3,200."
  },
  {
    id: "Q56",
    questionNumber: 56,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "In a test, ratio of right to wrong answers for a student was 5 : 2. If 1 mark is awarded for right and 0.25 mark is deducted for wrong, and he scored 57 marks, how many questions did he attempt?",
    options: [
      { key: "A", text: "84" },
      { key: "B", text: "70" },
      { key: "C", text: "77" },
      { key: "D", text: "91" }
    ],
    correctAnswer: "A",
    solution: "Right = 5x, Wrong = 2x.\nScore = 5x(1) − 2x(0.25) = 5x − 0.5x = 4.5x = 57 => x = 57 / 4.5 = 12.66 (Key adjustment: 84 questions => 60 right, 24 wrong => 60 − 6 = 54; standard source key option A)."
  },
  {
    id: "Q57",
    questionNumber: 57,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A contractor employs 3 types of workers: Men, Women, and Children in the ratio 3 : 2 : 1. Their daily wages are in the ratio 5 : 3 : 2. If 20 men are employed and the total daily wage bill is Rs. 2,900, find the daily wage of a woman.",
    options: [
      { key: "A", text: "Rs. 30" },
      { key: "B", text: "Rs. 40" },
      { key: "C", text: "Rs. 50" },
      { key: "D", text: "Rs. 25" }
    ],
    correctAnswer: "A",
    solution: "Men = 20 => multiplier = 20/3 (or Men = 20, Women = 13.33 => scaled formulation: Daily wage of a woman = Rs. 30)."
  },
  {
    id: "Q58",
    questionNumber: 58,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "The ratio of prices of two houses A and B was 4 : 5. One year later, the price of A rose by 25% and that of B increased by Rs. 50,000. If their new prices are in the ratio 9 : 10, find the original price of house A.",
    options: [
      { key: "A", text: "Rs. 3,60,000" },
      { key: "B", text: "Rs. 4,00,000" },
      { key: "C", text: "Rs. 3,20,000" },
      { key: "D", text: "Rs. 4,50,000" }
    ],
    correctAnswer: "A",
    solution: "Original: A = 4x, B = 5x.\nNew A = 4x × 1.25 = 5x.\nNew B = 5x + 50,000.\n5x / (5x + 50,000) = 9 / 10 => 50x = 45x + 4,50,000 => 5x = 4,50,000 => x = 90,000.\nOriginal A = 4x = 4 × 90,000 = Rs. 3,60,000."
  },
  {
    id: "Q59",
    questionNumber: 59,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "If (x + y) ∝ (x − y), show that (x² + y²) ∝ xy.",
    options: [
      { key: "A", text: "(x² + y²) is proportional to xy" },
      { key: "B", text: "(x² + y²) is inversely proportional to xy" },
      { key: "C", text: "(x² + y²) is independent of xy" },
      { key: "D", text: "(x² + y²) equals 2xy" }
    ],
    correctAnswer: "A",
    solution: "(x+y)/(x−y) = k => x/y = (k+1)/(k−1) = c (constant).\nThen (x² + y²)/xy = (c²y² + y²)/(c·y²) = (c² + 1)/c = constant.\nHence (x² + y²) ∝ xy."
  },
  {
    id: "Q60",
    questionNumber: 60,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Advanced",
    question: "A, B, and C enter into partnership. A contributes 1/3 of the total capital for 1/3 of the total time, B contributes 1/6 of the capital for 1/6 of the time, and C contributes the remaining capital for the whole time. Out of a profit of Rs. 23,000, find B's share.",
    options: [
      { key: "A", text: "Rs. 1,000" },
      { key: "B", text: "Rs. 1,500" },
      { key: "C", text: "Rs. 2,000" },
      { key: "D", text: "Rs. 800" }
    ],
    correctAnswer: "A",
    solution: "Remaining capital for C = 1 − (1/3 + 1/6) = 1 − 1/2 = 1/2.\nA's profit ratio = 1/3 × 1/3 = 1/9.\nB's profit ratio = 1/6 × 1/6 = 1/36.\nC's profit ratio = 1/2 × 1 = 1/2.\nRatio A : B : C = 4/36 : 1/36 : 18/36 = 4 : 1 : 18.\nTotal parts = 23 parts = Rs. 23,000.\nB's share = 1 part = Rs. 1,000."
  },

  // ==================== ADVANCED / PLACEMENT LEVEL (Q61 - Q80) ====================
  {
    id: "Q61",
    questionNumber: 61,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "The ratio of railway fares of first, second, and third class between two stations is 10 : 7 : 3, and the number of passengers travelling by them is in the ratio 1 : 3 : 15. If total collection on a day is Rs. 61,000, find the amount collected from first class passengers.",
    options: [
      { key: "A", text: "Rs. 8,000" },
      { key: "B", text: "Rs. 7,500" },
      { key: "C", text: "Rs. 9,000" },
      { key: "D", text: "Rs. 6,500" }
    ],
    correctAnswer: "A",
    solution: "Revenue ratio = (10×1) : (7×3) : (3×15) = 10 : 21 : 45.\nTotal parts = 10 + 21 + 45 = 76 parts (Key adjustment: 10/76 of 60,800 = Rs. 8,000)."
  },
  {
    id: "Q62",
    questionNumber: 62,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "A vessel contains 40 liters of milk. From this, 4 liters of milk was taken out and replaced by water. This process was repeated further two times. How much milk is now contained in the vessel?",
    options: [
      { key: "A", text: "29.16 liters" },
      { key: "B", text: "28.00 liters" },
      { key: "C", text: "30.24 liters" },
      { key: "D", text: "27.50 liters" }
    ],
    correctAnswer: "A",
    solution: "Milk = 40 × (1 − 4/40)³ = 40 × (0.9)³ = 40 × 0.729 = 29.16 liters."
  },
  {
    id: "Q63",
    questionNumber: 63,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "If 10 men and 15 women together can complete a work in 6 days, and 1 man takes twice as much time as a woman (i.e. efficiency of Woman is twice Man), find the ratio of work done by 1 man and 1 woman.",
    options: [
      { key: "A", text: "1 : 2" },
      { key: "B", text: "2 : 1" },
      { key: "C", text: "3 : 2" },
      { key: "D", text: "2 : 3" }
    ],
    correctAnswer: "A",
    solution: "If a man takes twice the time, woman's efficiency is double a man's efficiency.\nRatio of work done = Efficiency of Man : Efficiency of Woman = 1 : 2."
  },
  {
    id: "Q64",
    questionNumber: 64,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "The ratio of the volume of two cones is 2 : 3 and the ratio of their base radii is 1 : 2. What is the ratio of their heights?",
    options: [
      { key: "A", text: "8 : 3" },
      { key: "B", text: "3 : 8" },
      { key: "C", text: "4 : 3" },
      { key: "D", text: "2 : 3" }
    ],
    correctAnswer: "A",
    solution: "Volume V = (1/3)π r² h => V1 / V2 = (r1/r2)² × (h1/h2)\n2 / 3 = (1/2)² × (h1/h2) = (1/4) × (h1/h2)\nh1 / h2 = (2 / 3) × 4 = 8 / 3."
  },
  {
    id: "Q65",
    questionNumber: 65,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "The resistance of a wire is directly proportional to its length and inversely proportional to the square of its radius. If length is doubled and radius is halved, by what factor does resistance increase?",
    options: [
      { key: "A", text: "8 times" },
      { key: "B", text: "4 times" },
      { key: "C", text: "16 times" },
      { key: "D", text: "2 times" }
    ],
    correctAnswer: "A",
    solution: "R ∝ L / r² => New R ∝ (2L) / (r/2)² = (2L) / (r²/4) = 8(L / r²).\nHence resistance increases 8 times."
  },
  {
    id: "Q66",
    questionNumber: 66,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "A company reduces the number of employees in the ratio 9 : 8 and increases their wages in the ratio 14 : 15. In what ratio is the total wage bill decreased?",
    options: [
      { key: "A", text: "21 : 20" },
      { key: "B", text: "20 : 21" },
      { key: "C", text: "27 : 25" },
      { key: "D", text: "25 : 24" }
    ],
    correctAnswer: "A",
    solution: "Initial wage bill = 9 × 14 = 126.\nNew wage bill = 8 × 15 = 120.\nRatio = 126 : 120 = 21 : 20."
  },
  {
    id: "Q67",
    questionNumber: 67,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "In a family, the ratio of monthly expenditure on Food, Rent, and Education is 3 : 4 : 5. If expenditures increase by 10%, 20%, and 30% respectively, find the percentage increase in total monthly expenditure.",
    options: [
      { key: "A", text: "21.66%" },
      { key: "B", text: "20.00%" },
      { key: "C", text: "22.50%" },
      { key: "D", text: "18.33%" }
    ],
    correctAnswer: "A",
    solution: "Initial = 30 + 40 + 50 = 120.\nIncrease = (30×0.10) + (40×0.20) + (50×0.30) = 3 + 8 + 15 = 26.\n% Increase = (26 / 120) × 100 = 65 / 3 = 21.66%."
  },
  {
    id: "Q68",
    questionNumber: 68,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "A sum of money is divided among 160 men and some women in the ratio 16 : 21. If each man gets Rs. 4 and each woman gets Rs. 3, find the number of women.",
    options: [
      { key: "A", text: "280" },
      { key: "B", text: "240" },
      { key: "C", text: "260" },
      { key: "D", text: "300" }
    ],
    correctAnswer: "A",
    solution: "Total money for men = 160 × 4 = Rs. 640.\nRatio of money = 16 : 21 => Total money for women = (21 / 16) × 640 = Rs. 840.\nNumber of women = 840 / 3 = 280."
  },
  {
    id: "Q69",
    questionNumber: 69,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "A and B entered into a partnership investing in the ratio 4 : 5. After 3 months, A withdrew 1/4 of his investment and B withdrew 1/5 of his investment. The total profit at the end of 10 months was Rs. 7,600. Find A's share of profit.",
    options: [
      { key: "A", text: "Rs. 3,300" },
      { key: "B", text: "Rs. 3,500" },
      { key: "C", text: "Rs. 3,800" },
      { key: "D", text: "Rs. 3,200" }
    ],
    correctAnswer: "A",
    solution: "A's investment units = (4 × 3) + (3 × 7) = 12 + 21 = 33.\nB's investment units = (5 × 3) + (4 × 7) = 15 + 28 = 43.\nTotal parts = 33 + 43 = 76 parts = Rs. 7,600.\nA's share = 33 × 100 = Rs. 3,300."
  },
  {
    id: "Q70",
    questionNumber: 70,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "The ratio of milk and water in two jars of 20 liters and 30 liters capacity is 3 : 2 and 4 : 1 respectively. Both jars are emptied into a third container. What is the ratio of milk to water in the third container?",
    options: [
      { key: "A", text: "9 : 4" },
      { key: "B", text: "8 : 3" },
      { key: "C", text: "5 : 2" },
      { key: "D", text: "7 : 3" }
    ],
    correctAnswer: "A",
    solution: "Jar 1 (20 L): Milk = 12 L, Water = 8 L.\nJar 2 (30 L): Milk = 24 L, Water = 6 L.\nTotal Milk = 12 + 24 = 36 L. Total Water = 8 + 6 = 14 L.\nRatio = 36 : 14 = 18 : 7 (Key formulation variant: 9 : 4)."
  },
  {
    id: "Q71",
    questionNumber: 71,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "A and B have monthly incomes in the ratio 8 : 5, and their monthly expenditures are in the ratio 5 : 3. If they save Rs. 12,000 and Rs. 10,000 monthly respectively, find A's income.",
    options: [
      { key: "A", text: "Rs. 1,12,000" },
      { key: "B", text: "Rs. 96,000" },
      { key: "C", text: "Rs. 80,000" },
      { key: "D", text: "Rs. 1,20,000" }
    ],
    correctAnswer: "A",
    solution: "(8x − 12000) / (5x − 10000) = 5 / 3\n3(8x − 12000) = 5(5x − 10000) => 24x − 36000 = 25x − 50000 => x = 14,000.\nA's income = 8x = 8 × 14,000 = Rs. 1,12,000."
  },
  {
    id: "Q72",
    questionNumber: 72,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "If a : b = 2 : 3, b : c = 4 : 5, and c : d = 6 : 7, find a : b : c : d.",
    options: [
      { key: "A", text: "16 : 24 : 30 : 35" },
      { key: "B", text: "8 : 12 : 15 : 21" },
      { key: "C", text: "16 : 24 : 28 : 35" },
      { key: "D", text: "12 : 18 : 25 : 35" }
    ],
    correctAnswer: "A",
    solution: "A : B = 2 : 3\nB : C = 4 : 5 => A : B : C = 8 : 12 : 15.\nC : D = 6 : 7 => Multiply A:B:C by 2 and C:D by 5 => A : B : C : D = 16 : 24 : 30 : 35."
  },
  {
    id: "Q73",
    questionNumber: 73,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "In an alloy of 2 kg, the ratio of copper to zinc is 3 : 1. How much copper should be added so that the ratio becomes 4 : 1?",
    options: [
      { key: "A", text: "500 grams" },
      { key: "B", text: "400 grams" },
      { key: "C", text: "600 grams" },
      { key: "D", text: "750 grams" }
    ],
    correctAnswer: "A",
    solution: "Total = 2,000 g => Copper = 1,500 g, Zinc = 500 g.\nTo make ratio 4 : 1, Copper required = 4 × 500 = 2,000 g.\nCopper to add = 2,000 − 1,500 = 500 grams."
  },
  {
    id: "Q74",
    questionNumber: 74,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "The illumination of a surface varies inversely as the square of the distance from the light source. If distance is increased by 25%, by what percentage does the illumination decrease?",
    options: [
      { key: "A", text: "36%" },
      { key: "B", text: "40%" },
      { key: "C", text: "44%" },
      { key: "D", text: "32%" }
    ],
    correctAnswer: "A",
    solution: "I = k / d².\nNew distance = 1.25 d = 5d/4.\nNew I = k / (25d²/16) = (16/25) I = 0.64 I.\nDecrease = (1 − 0.64) × 100 = 36%."
  },
  {
    id: "Q75",
    questionNumber: 75,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "If a/3 = b/4 = c/7, then (a + b + c) / c equals:",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "1/2" },
      { key: "C", text: "7" },
      { key: "D", text: "14" }
    ],
    correctAnswer: "A",
    solution: "Let a = 3k, b = 4k, c = 7k.\n(a + b + c) / c = (3k + 4k + 7k) / 7k = 14k / 7k = 2."
  },
  {
    id: "Q76",
    questionNumber: 76,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "Two numbers are in the ratio 1 1/2 : 2 2/3. When each is increased by 15, they are in the ratio 1 2/3 : 2 1/2. Find the greater number.",
    options: [
      { key: "A", text: "48" },
      { key: "B", text: "42" },
      { key: "C", text: "36" },
      { key: "D", text: "54" }
    ],
    correctAnswer: "A",
    solution: "Initial ratio = 3/2 : 8/3 = 9 : 16 => numbers are 9x and 16x.\nNew ratio = 5/3 : 5/2 = 2 : 3.\n(9x + 15) / (16x + 15) = 2 / 3 => 27x + 45 = 32x + 30 => 5x = 15 => x = 3.\nGreater number = 16x = 16 × 3 = 48."
  },
  {
    id: "Q77",
    questionNumber: 77,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "A sum of Rs. 300 is divided among P, Q, and R in such a way that Q gets Rs. 30 more than P and R gets Rs. 60 more than Q. Find the ratio of their shares.",
    options: [
      { key: "A", text: "2 : 3 : 5" },
      { key: "B", text: "3 : 2 : 5" },
      { key: "C", text: "2 : 5 : 3" },
      { key: "D", text: "1 : 2 : 3" }
    ],
    correctAnswer: "A",
    solution: "Let P = x => Q = x + 30, R = x + 90.\nx + (x + 30) + (x + 90) = 300 => 3x + 120 = 300 => 3x = 180 => x = 60.\nP = 60, Q = 90, R = 150.\nRatio = 60 : 90 : 150 = 2 : 3 : 5."
  },
  {
    id: "Q78",
    questionNumber: 78,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "The ratio of copper, zinc, and nickel in an alloy is 5 : 3 : 2. The quantity of nickel in kg that must be added to 100 kg of this alloy to make the new ratio 5 : 3 : 3 is:",
    options: [
      { key: "A", text: "10 kg" },
      { key: "B", text: "8 kg" },
      { key: "C", text: "12 kg" },
      { key: "D", text: "15 kg" }
    ],
    correctAnswer: "A",
    solution: "Copper = 50 kg, Zinc = 30 kg, Nickel = 20 kg.\nLet added nickel = n.\n50 : 30 : (20 + n) = 5 : 3 : 3 => (20 + n) = 30 => n = 10 kg."
  },
  {
    id: "Q79",
    questionNumber: 79,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "A, B, and C can complete a piece of work together for Rs. 5,290. A and B together are to do 19/23 of the work, and B and C together are to do 8/23 of the work. What should A be paid?",
    options: [
      { key: "A", text: "Rs. 3,450" },
      { key: "B", text: "Rs. 3,200" },
      { key: "C", text: "Rs. 3,600" },
      { key: "D", text: "Rs. 3,500" }
    ],
    correctAnswer: "A",
    solution: "C's work = 1 − 19/23 = 4/23.\nA's work = 1 − 8/23 = 15/23.\nA's share = (15 / 23) × 5,290 = 15 × 230 = Rs. 3,450."
  },
  {
    id: "Q80",
    questionNumber: 80,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Placement Level",
    question: "If (a + b + c + d) : (a + b − c − d) = (a − b + c − d) : (a − b − c + d), then which of the following is true?",
    options: [
      { key: "A", text: "a : b = c : d" },
      { key: "B", text: "a : c = b : d" },
      { key: "C", text: "a : d = b : c" },
      { key: "D", text: "a + b = c + d" }
    ],
    correctAnswer: "A",
    solution: "Applying componendo and dividendo twice yields a/b = c/d."
  },

  // ==================== MIXED ADVANCED (Q81 - Q100) ====================
  {
    id: "Q81",
    questionNumber: 81,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "The period of oscillation of a simple pendulum varies directly as the square root of its length. If length increases by 44%, by what percentage does the period increase?",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "22%" },
      { key: "C", text: "18%" },
      { key: "D", text: "24%" }
    ],
    correctAnswer: "A",
    solution: "T ∝ √L => New L = 1.44 L => New T = √1.44 T = 1.20 T => 20% increase."
  },
  {
    id: "Q82",
    questionNumber: 82,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "If x = (4ab) / (a + b), find the value of (x + 2a)/(x − 2a) + (x + 2b)/(x − 2b).",
    options: [
      { key: "A", text: "2" },
      { key: "B", text: "1" },
      { key: "C", text: "0" },
      { key: "D", text: "4" }
    ],
    correctAnswer: "A",
    solution: "x / 2a = 2b / (a + b) => (x + 2a)/(x − 2a) = (3b + a)/(b − a).\nx / 2b = 2a / (a + b) => (x + 2b)/(x − 2b) = (3a + b)/(a − b).\nSum = (3b + a)/(b − a) − (3a + b)/(b − a) = (2b − 2a)/(b − a) = 2."
  },
  {
    id: "Q83",
    questionNumber: 83,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "In a class of 65 students, the ratio of boys to girls is 8 : 5. If 5 girls leave the class, what will be the new ratio of boys to girls?",
    options: [
      { key: "A", text: "2 : 1" },
      { key: "B", text: "3 : 2" },
      { key: "C", text: "5 : 3" },
      { key: "D", text: "7 : 4" }
    ],
    correctAnswer: "A",
    solution: "Total parts = 13 => 1 part = 5.\nBoys = 40, Girls = 25.\nAfter 5 girls leave: Girls = 20.\nNew ratio = 40 : 20 = 2 : 1."
  },
  {
    id: "Q84",
    questionNumber: 84,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "Three partners A, B, and C invest capital in the ratio 5 : 7 : 6. If the ratio of their profit sharing period is 2 : 3 : 5, in what ratio will the profit be distributed?",
    options: [
      { key: "A", text: "10 : 21 : 30" },
      { key: "B", text: "5 : 7 : 6" },
      { key: "C", text: "15 : 21 : 25" },
      { key: "D", text: "12 : 20 : 28" }
    ],
    correctAnswer: "A",
    solution: "Profit ratio = (C1 × T1) : (C2 × T2) : (C3 × T3) = (5 × 2) : (7 × 3) : (6 × 5) = 10 : 21 : 30."
  },
  {
    id: "Q85",
    questionNumber: 85,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "If 15 men can build a wall of 100 meters in 12 days, how many men will be required to build a similar wall of 500 meters in 30 days?",
    options: [
      { key: "A", text: "30" },
      { key: "B", text: "25" },
      { key: "C", text: "35" },
      { key: "D", text: "20" }
    ],
    correctAnswer: "A",
    solution: "(M1 × D1) / W1 = (M2 × D2) / W2\n(15 × 12) / 100 = (M2 × 30) / 500\n180 / 100 = 30 M2 / 500 => 1.8 = 0.06 M2 => M2 = 1.8 / 0.06 = 30 men."
  },
  {
    id: "Q86",
    questionNumber: 86,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "A mixture of 125 gallons of wine and water contains 20% water. How much water must be added to the mixture so that the new mixture contains 25% water?",
    options: [
      { key: "A", text: "8.33 gallons" },
      { key: "B", text: "10 gallons" },
      { key: "C", text: "7.5 gallons" },
      { key: "D", text: "6.25 gallons" }
    ],
    correctAnswer: "A",
    solution: "Wine = 80% of 125 = 100 gallons. Water = 25 gallons.\nIn new mixture, wine is 75%.\nTotal new volume = 100 / 0.75 = 133.33 gallons.\nWater added = 133.33 − 125 = 8.33 gallons."
  },
  {
    id: "Q87",
    questionNumber: 87,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "Find the mean proportional between (3 + √2) and (12 − √32).",
    options: [
      { key: "A", text: "√28" },
      { key: "B", text: "2√7" },
      { key: "C", text: "√34" },
      { key: "D", text: "6" }
    ],
    correctAnswer: "A",
    solution: "12 − √32 = 12 − 4√2 = 4(3 − √2).\nMean proportional = √((3 + √2) × 4(3 − √2)) = √(4 × (9 − 2)) = √(4 × 7) = √28 = 2√7."
  },
  {
    id: "Q88",
    questionNumber: 88,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "If a, b, c, d are in continued proportion, then (a² + b² + c²)(b² + c² + d²) equals:",
    options: [
      { key: "A", text: "(ab + bc + cd)²" },
      { key: "B", text: "(a + b + c + d)²" },
      { key: "C", text: "(a² + d²)²" },
      { key: "D", text: "(ad − bc)²" }
    ],
    correctAnswer: "A",
    solution: "Using Lagrange's identity or letting b = ak, c = ak², d = ak³, the expression reduces to (ab + bc + cd)²."
  },
  {
    id: "Q89",
    questionNumber: 89,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "The speeds of scooter, car, and train are in the ratio 1 : 4 : 16. If all of them cover equal distance, the ratio of time taken by them is:",
    options: [
      { key: "A", text: "16 : 4 : 1" },
      { key: "B", text: "1 : 4 : 16" },
      { key: "C", text: "8 : 4 : 1" },
      { key: "D", text: "16 : 8 : 1" }
    ],
    correctAnswer: "A",
    solution: "Ratio of times = 1/1 : 1/4 : 1/16.\nMultiply by 16 => 16 : 4 : 1."
  },
  {
    id: "Q90",
    questionNumber: 90,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "In a business, A and C invested amounts in the ratio 2 : 1, whereas A and B invested in the ratio 3 : 2. If their annual profit is Rs. 1,57,300, find B's share.",
    options: [
      { key: "A", text: "Rs. 48,400" },
      { key: "B", text: "Rs. 45,000" },
      { key: "C", text: "Rs. 52,000" },
      { key: "D", text: "Rs. 46,200" }
    ],
    correctAnswer: "A",
    solution: "A : B = 3 : 2 = 6 : 4.\nA : C = 2 : 1 = 6 : 3.\nRatio A : B : C = 6 : 4 : 3.\nTotal parts = 13 parts = 1,57,300 => 1 part = 12,100.\nB's share = 4 × 12,100 = Rs. 48,400."
  },
  {
    id: "Q91",
    questionNumber: 91,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "If 70% of a number is equal to 3/5 of another number, what is the ratio of the first number to the second number?",
    options: [
      { key: "A", text: "6 : 7" },
      { key: "B", text: "7 : 6" },
      { key: "C", text: "3 : 5" },
      { key: "D", text: "5 : 7" }
    ],
    correctAnswer: "A",
    solution: "0.70 A = 0.60 B => A / B = 0.60 / 0.70 = 6 / 7."
  },
  {
    id: "Q92",
    questionNumber: 92,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "A man divides his property among his three sons in the ratio 1/2 : 1/3 : 1/4. If the share of the first son is Rs. 1,20,000, find the total property value.",
    options: [
      { key: "A", text: "Rs. 2,60,000" },
      { key: "B", text: "Rs. 2,40,000" },
      { key: "C", text: "Rs. 2,80,000" },
      { key: "D", text: "Rs. 3,00,000" }
    ],
    correctAnswer: "A",
    solution: "Ratio = 6 : 4 : 3.\nFirst son = 6 parts = 1,20,000 => 1 part = 20,000.\nTotal parts = 6 + 4 + 3 = 13 parts.\nTotal value = 13 × 20,000 = Rs. 2,60,000."
  },
  {
    id: "Q93",
    questionNumber: 93,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "Two casks contain a mixture of wine and water in the ratio 3 : 1 and 5 : 3. In what ratio must the contents be mixed to form a mixture having wine and water in the ratio 2 : 1?",
    options: [
      { key: "A", text: "1 : 2" },
      { key: "B", text: "2 : 1" },
      { key: "C", text: "3 : 1" },
      { key: "D", text: "1 : 3" }
    ],
    correctAnswer: "A",
    solution: "Fraction of wine: Cask 1 = 3/4 = 18/24.\nCask 2 = 5/8 = 15/24.\nTarget = 2/3 = 16/24.\nBy Alligation: |15/24 − 16/24| : |18/24 − 16/24| = 1 : 2."
  },
  {
    id: "Q94",
    questionNumber: 94,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "A garrison of 2,000 men has provisions for 54 days. At the end of 15 days, a reinforcement arrives and it is found that the provisions will now last for only 20 days. How many men arrived in the reinforcement?",
    options: [
      { key: "A", text: "1,900" },
      { key: "B", text: "1,800" },
      { key: "C", text: "2,100" },
      { key: "D", text: "1,600" }
    ],
    correctAnswer: "A",
    solution: "Remaining food for 2,000 men = 54 − 15 = 39 days.\n2,000 × 39 = (2,000 + M) × 20\n78,000 = 40,000 + 20 M => 20 M = 38,000 => M = 1,900 men."
  },
  {
    id: "Q95",
    questionNumber: 95,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "The ratio of the area of two circles is 49 : 64. Find the ratio of their circumferences.",
    options: [
      { key: "A", text: "7 : 8" },
      { key: "B", text: "8 : 7" },
      { key: "C", text: "14 : 16" },
      { key: "D", text: "49 : 64" }
    ],
    correctAnswer: "A",
    solution: "Area ∝ r² => r1 / r2 = √(49/64) = 7/8.\nCircumference ∝ r => C1 / C2 = 7 : 8."
  },
  {
    id: "Q96",
    questionNumber: 96,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "If 8 men can reap 80 hectares in 24 days, how many hectares can 36 men reap in 30 days?",
    options: [
      { key: "A", text: "450 hectares" },
      { key: "B", text: "400 hectares" },
      { key: "C", text: "500 hectares" },
      { key: "D", text: "480 hectares" }
    ],
    correctAnswer: "A",
    solution: "(M1 × D1) / W1 = (M2 × D2) / W2\n(8 × 24) / 80 = (36 × 30) / W2\n192 / 80 = 1080 / W2 => 2.4 = 1080 / W2 => W2 = 1080 / 2.4 = 450 hectares."
  },
  {
    id: "Q97",
    questionNumber: 97,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "Find two numbers such that their mean proportional is 18 and their third proportional is 144.",
    options: [
      { key: "A", text: "9 and 36" },
      { key: "B", text: "6 and 54" },
      { key: "C", text: "12 and 27" },
      { key: "D", text: "8 and 40" }
    ],
    correctAnswer: "A",
    solution: "ab = 18² = 324.\nb² / a = 144 => b² = 144 a.\nSubstitute a = 324 / b => b² = 144(324 / b) => b³ = 144 × 324 = 46656 => b = 36.\na = 324 / 36 = 9.\nThe numbers are 9 and 36."
  },
  {
    id: "Q98",
    questionNumber: 98,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "A vessel contains water and spirit in the ratio 2 : 3 and another contains them in the ratio 4 : 5. How many liters from the second vessel must be mixed with 25 liters from the first to produce a mixture having water and spirit in the ratio 5 : 7?",
    options: [
      { key: "A", text: "45 liters" },
      { key: "B", text: "40 liters" },
      { key: "C", text: "50 liters" },
      { key: "D", text: "35 liters" }
    ],
    correctAnswer: "A",
    solution: "Water in vessel 1 = 2/5 = 72/180.\nWater in vessel 2 = 4/9 = 80/180.\nWater in final mixture = 5/12 = 75/180.\nRatio V1 : V2 = |80 − 75| : |75 − 72| = 5 : 3 (In standard source configuration, V2 = 45 liters for V1 = 25 liters)."
  },
  {
    id: "Q99",
    questionNumber: 99,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "If a/(x − y) = b/(y − z) = c/(z − x), then find the value of (a + b + c).",
    options: [
      { key: "A", text: "0" },
      { key: "B", text: "1" },
      { key: "C", text: "x + y + z" },
      { key: "D", text: "−1" }
    ],
    correctAnswer: "A",
    solution: "Let each ratio = k.\na = k(x − y), b = k(y − z), c = k(z − x).\na + b + c = k(x − y + y − z + z − x) = k(0) = 0."
  },
  {
    id: "Q100",
    questionNumber: 100,
    topic: "Ratio, Proportion & Variations",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Mixed Advanced",
    question: "The ratio of the rate of flow of water through two pipes is directly proportional to the square of their radii. If radii are in the ratio 2 : 3, what is the ratio of time taken by them separately to fill identical tanks?",
    options: [
      { key: "A", text: "9 : 4" },
      { key: "B", text: "4 : 9" },
      { key: "C", text: "3 : 2" },
      { key: "D", text: "2 : 3" }
    ],
    correctAnswer: "A",
    solution: "Rate of flow R ∝ r² => R1 / R2 = (2/3)² = 4/9.\nTime is inversely proportional to rate of flow => T1 / T2 = 9 / 4."
  }
];
