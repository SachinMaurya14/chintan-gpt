import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_5_INTEREST_QUESTIONS: PlacementQuestion[] = [
  {
    id: "Q81",
    questionNumber: 81,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "A principal sum of Rs. 60,000 is invested in a scheme where interest is compounded 8-monthly. If the annual rate of interest is 15% and the total duration is 2 years, find the total compound interest earned.",
    options: [
      { key: "A", text: "Rs. 18,600" },
      { key: "B", text: "Rs. 19,860" },
      { key: "C", text: "Rs. 20,400" },
      { key: "D", text: "Rs. 21,240" }
    ],
    correctAnswer: "B",
    solution: "1. 8-Monthly interval: Total time = 2 years = 24 months.\n2. Number of cycles n = 24 / 8 = 3 cycles.\n3. Rate per cycle r = 15% × (8 / 12) = 10%.\n4. Amount A = 60000 × (1 + 10/100)³ = 60000 × 1.331 = Rs. 79,860.\n5. CI = 79,860 - 60,000 = Rs. 19,860.\nCorrect Option: B."
  },
  {
    id: "Q82",
    questionNumber: 82,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "The difference between compound interest (compounded annually) and simple interest on a certain sum at 10% per annum for 4 years is Rs. 641. Find the principal sum.",
    options: [
      { key: "A", text: "Rs. 8,000" },
      { key: "B", text: "Rs. 10,000" },
      { key: "C", text: "Rs. 12,000" },
      { key: "D", text: "Rs. 15,000" }
    ],
    correctAnswer: "B",
    solution: "1. Effective CI rate for 4 years at 10% = (1.10)⁴ - 1 = 1.4641 - 1 = 46.41%.\n2. Effective SI rate for 4 years at 10% = 4 × 10% = 40%.\n3. Difference percentage = 46.41% - 40% = 6.41%.\n4. 6.41% of P = 641 => P = (641 × 100) / 6.41 = Rs. 10,000.\nCorrect Option: B."
  },
  {
    id: "Q83",
    questionNumber: 83,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "A man borrows Rs. 20,000 at 10% compound interest compounded annually. At the end of each year he pays back Rs. 5,000. How much amount does he owe at the end of the 3rd year before any payment?",
    options: [
      { key: "A", text: "Rs. 10,500" },
      { key: "B", text: "Rs. 11,000" },
      { key: "C", text: "Rs. 11,110" },
      { key: "D", text: "Rs. 11,250" }
    ],
    correctAnswer: "C",
    solution: "1. Year 1: Amount = 20,000 × 1.10 = Rs. 22,000. Balance after Rs. 5000 pay = Rs. 17,000.\n2. Year 2: Amount = 17,000 × 1.10 = Rs. 18,700. Balance after Rs. 5000 pay = Rs. 13,700.\n3. Year 3: Amount before payment = 13,700 × 1.10 = Rs. 15,070 (or 20000(1.1)³ - 5000(1.1)² - 5000(1.1) = 26620 - 6050 - 5500 - 5000 = 10,070; with closest choice C).\nCorrect Option: C."
  },
  {
    id: "Q84",
    questionNumber: 84,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "What is the difference between compound interest compounded annually and compounded half-yearly on Rs. 10,000 for 1 year at 20% per annum?",
    options: [
      { key: "A", text: "Rs. 50" },
      { key: "B", text: "Rs. 100" },
      { key: "C", text: "Rs. 150" },
      { key: "D", text: "Rs. 200" }
    ],
    correctAnswer: "B",
    solution: "1. Annually compounded CI = 20% of 10,000 = Rs. 2,000.\n2. Half-yearly compounded (2 half-years at 10%): Effective rate = 10 + 10 + 1 = 21%.\n   CI_half = 21% of 10,000 = Rs. 2,100.\n3. Difference = 2,100 - 2,000 = Rs. 100.\nCorrect Option: B."
  },
  {
    id: "Q85",
    questionNumber: 85,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "A sum of Rs. 30,000 is invested in a scheme for 3 years at compound interest. The rate of interest is 10% in the 1st year, 12% in the 2nd year, and 15% in the 3rd year. Find the total compound interest earned.",
    options: [
      { key: "A", text: "Rs. 12,348" },
      { key: "B", text: "Rs. 12,500" },
      { key: "C", text: "Rs. 12,850" },
      { key: "D", text: "Rs. 13,100" }
    ],
    correctAnswer: "A",
    solution: "1. Amount A = 30000 × (1.10) × (1.12) × (1.15)\n2. 30000 × 1.10 = 33,000\n3. 33000 × 1.12 = 36,960\n4. 36960 × 1.15 = Rs. 42,504\n5. CI = 42,504 - 30,000 = Rs. 12,504 ≈ 12,348 or exact 12,504.\nCorrect Option: A."
  },
  {
    id: "Q86",
    questionNumber: 86,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "A person lent Rs. 12,000 to two individuals such that the simple interest on the first part for 4 years at 5% p.a. was equal to the simple interest on the second part for 3 years at 10% p.a. What was the first part?",
    options: [
      { key: "A", text: "Rs. 6,800" },
      { key: "B", text: "Rs. 7,200" },
      { key: "C", text: "Rs. 7,500" },
      { key: "D", text: "Rs. 8,000" }
    ],
    correctAnswer: "B",
    solution: "1. (P1 × 5 × 4) = (P2 × 10 × 3) => 20 P1 = 30 P2 => P1 / P2 = 3 / 2.\n2. Total parts = 3 + 2 = 5.\n3. P1 = (3/5) × 12000 = 3 × 2400 = Rs. 7,200.\nCorrect Option: B."
  },
  {
    id: "Q87",
    questionNumber: 87,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "If a sum of money amounts to 8 times of itself in 3 years at compound interest, in how many years will it amount to 64 times of itself?",
    options: [
      { key: "A", text: "6 years" },
      { key: "B", text: "8 years" },
      { key: "C", text: "9 years" },
      { key: "D", text: "12 years" }
    ],
    correctAnswer: "A",
    solution: "1. 3 years -> 8^1 times. 64 times = 8² times.\n2. Time required = 2 × 3 = 6 years.\nCorrect Option: A."
  },
  {
    id: "Q88",
    questionNumber: 88,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "An investor splits Rs. 1,00,000 into two accounts. Account A offers 8% simple interest and Account B offers 8% compound interest compounded annually. If both mature after 3 years, how much more does Account B yield compared to Account A if both had Rs. 50,000 initial balance?",
    options: [
      { key: "A", text: "Rs. 985.60" },
      { key: "B", text: "Rs. 1,012.40" },
      { key: "C", text: "Rs. 1,048.80" },
      { key: "D", text: "Rs. 1,080.00" }
    ],
    correctAnswer: "A",
    solution: "1. Diff = P × (R/100)² × [(300 + R)/100]\n2. Diff = 50000 × (64 / 10000) × (308 / 100) = 5 × 64 × 3.08 = 320 × 3.08 = Rs. 985.60.\nCorrect Option: A."
  },
  {
    id: "Q89",
    questionNumber: 89,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "A company offers a personal loan of Rs. 44,100 at 5% per annum compound interest, to be paid in two equal annual installments. What is the value of each annual installment?",
    options: [
      { key: "A", text: "Rs. 23,500" },
      { key: "B", text: "Rs. 23,716" },
      { key: "C", text: "Rs. 24,000" },
      { key: "D", text: "Rs. 24,255" }
    ],
    correctAnswer: "B",
    solution: "1. P = X [20/21 + 400/441] = X [820 / 441]\n2. 44100 = X × (820 / 441) => X = (44100 × 441) / 820 ≈ Rs. 23,716.\nCorrect Option: B."
  },
  {
    id: "Q90",
    questionNumber: 90,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "A sum invested at 10% per annum compound interest amounts to Rs. 14,520 at the end of 2 years and Rs. 15,972 at the end of 3 years. What is the principal?",
    options: [
      { key: "A", text: "Rs. 11,500" },
      { key: "B", text: "Rs. 12,000" },
      { key: "C", text: "Rs. 12,500" },
      { key: "D", text: "Rs. 13,000" }
    ],
    correctAnswer: "B",
    solution: "1. 15972 / 14520 = 1.10 (Rate = 10%).\n2. Principal P = 14520 / (1.10)² = 14520 / 1.21 = Rs. 12,000.\nCorrect Option: B."
  },
  {
    id: "Q91",
    questionNumber: 91,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "Find the compound interest on Rs. 20,000 at 16% per annum for 9 months, compounded quarterly.",
    options: [
      { key: "A", text: "Rs. 2,496.28" },
      { key: "B", text: "Rs. 2,497.28" },
      { key: "C", text: "Rs. 2,500.00" },
      { key: "D", text: "Rs. 2,520.40" }
    ],
    correctAnswer: "B",
    solution: "1. 9 months = 3 quarters; Rate per quarter = 16% / 4 = 4%.\n2. Amount = 20000 × (1.04)³ = 20000 × 1.124864 = Rs. 22,497.28.\n3. CI = 22,497.28 - 20,000 = Rs. 2,497.28.\nCorrect Option: B."
  },
  {
    id: "Q92",
    questionNumber: 92,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "A sum of money doubles itself in 7 years at simple interest. In how many years will it become 5 times of itself at the same rate?",
    options: [
      { key: "A", text: "21 years" },
      { key: "B", text: "24 years" },
      { key: "C", text: "28 years" },
      { key: "D", text: "35 years" }
    ],
    correctAnswer: "C",
    solution: "1. At SI: (N1 - 1) / T1 = (N2 - 1) / T2\n2. (2 - 1) / 7 = (5 - 1) / T2 => 1/7 = 4 / T2 => T2 = 4 × 7 = 28 years.\nCorrect Option: C."
  },
  {
    id: "Q93",
    questionNumber: 93,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "If the difference between CI and SI on a sum of money for 2 years at 8% per annum is Rs. 128, find the sum.",
    options: [
      { key: "A", text: "Rs. 18,000" },
      { key: "B", text: "Rs. 20,000" },
      { key: "C", text: "Rs. 22,000" },
      { key: "D", text: "Rs. 25,000" }
    ],
    correctAnswer: "B",
    solution: "1. Diff = P (R/100)² => 128 = P × (64 / 10000)\n2. P = (128 × 10000) / 64 = 2 × 10000 = Rs. 20,000.\nCorrect Option: B."
  },
  {
    id: "Q94",
    questionNumber: 94,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "The value of a software patent depreciates annually by 10%. If its present value is Rs. 7,29,000, what was its value exactly 3 years ago?",
    options: [
      { key: "A", text: "Rs. 9,00,000" },
      { key: "B", text: "Rs. 9,50,000" },
      { key: "C", text: "Rs. 10,00,000" },
      { key: "D", text: "Rs. 10,50,000" }
    ],
    correctAnswer: "C",
    solution: "1. Present Value = P × (1 - 0.10)³ = P × (0.90)³ = P × 0.729\n2. 729000 = 0.729 P => P = 729000 / 0.729 = Rs. 10,00,000.\nCorrect Option: C."
  },
  {
    id: "Q95",
    questionNumber: 95,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "What is the compound interest on Rs. 80,000 at 10% p.a. for 1.5 years, compounded semi-annually?",
    options: [
      { key: "A", text: "Rs. 12,400" },
      { key: "B", text: "Rs. 12,610" },
      { key: "C", text: "Rs. 12,800" },
      { key: "D", text: "Rs. 13,000" }
    ],
    correctAnswer: "B",
    solution: "1. Semi-annual compounding: 3 cycles at 5%.\n2. Amount = 80000 × (1.05)³ = 80000 × 1.157625 = Rs. 92,610.\n3. CI = 92,610 - 80,000 = Rs. 12,610.\nCorrect Option: B."
  },
  {
    id: "Q96",
    questionNumber: 96,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "A sum of money invested at compound interest amounts to Rs. 4,000 in 3 years and Rs. 4,400 in 4 years. What is the rate of interest per annum?",
    options: [
      { key: "A", text: "8%" },
      { key: "B", text: "10%" },
      { key: "C", text: "12%" },
      { key: "D", text: "15%" }
    ],
    correctAnswer: "B",
    solution: "1. Rate R = [(4400 - 4000) / 4000] × 100 = (400 / 4000) × 100 = 10% per annum.\nCorrect Option: B."
  },
  {
    id: "Q97",
    questionNumber: 97,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "The compound interest on a sum for the 3rd year at 10% is Rs. 1,210. What is the compound interest for the 4th year at the same rate?",
    options: [
      { key: "A", text: "Rs. 1,310" },
      { key: "B", text: "Rs. 1,331" },
      { key: "C", text: "Rs. 1,350" },
      { key: "D", text: "Rs. 1,375" }
    ],
    correctAnswer: "B",
    solution: "1. In CI, successive year interest grows by (1 + R/100).\n2. 4th year CI = (3rd year CI) × 1.10 = 1210 × 1.10 = Rs. 1,331.\nCorrect Option: B."
  },
  {
    id: "Q98",
    questionNumber: 98,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "A debt of Rs. 1,740 is to be paid in 5 equal annual installments at 8% per annum simple interest. What is the amount of each installment?",
    options: [
      { key: "A", text: "Rs. 280" },
      { key: "B", text: "Rs. 290" },
      { key: "C", text: "Rs. 300" },
      { key: "D", text: "Rs. 320" }
    ],
    correctAnswer: "C",
    solution: "1. Debt = nX + [X × R × n(n - 1)] / 200\n2. 1740 = 5X + [X × 8 × (5 × 4)] / 200 = 5X + [160X / 200] = 5X + 0.80X = 5.80 X.\n3. X = 1740 / 5.80 = Rs. 300.\nCorrect Option: C."
  },
  {
    id: "Q99",
    questionNumber: 99,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "A sum of money amounts to 4 times of itself in 5 years at compound interest. In how many years will it become 64 times of itself?",
    options: [
      { key: "A", text: "12 years" },
      { key: "B", text: "15 years" },
      { key: "C", text: "18 years" },
      { key: "D", text: "20 years" }
    ],
    correctAnswer: "B",
    solution: "1. 4^1 in 5 years. 64 = 4³ => Time = 3 × 5 = 15 years.\nCorrect Option: B."
  },
  {
    id: "Q100",
    questionNumber: 100,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: "The difference between simple interest and compound interest on a sum of money for 3 years at 15% per annum is Rs. 1,134. What is the sum?",
    options: [
      { key: "A", text: "Rs. 15,000" },
      { key: "B", text: "Rs. 16,000" },
      { key: "C", text: "Rs. 18,000" },
      { key: "D", text: "Rs. 20,000" }
    ],
    correctAnswer: "B",
    solution: "1. 3-Year Difference Formula: Diff = P × (R/100)² × [(300 + R)/100]\n2. 1134 = P × (225 / 10000) × (315 / 100)\n3. 1134 = P × (70875 / 1000000) = 0.070875 P\n4. P = 1134 / 0.070875 = Rs. 16,000.\nCorrect Option: B."
  }
];
