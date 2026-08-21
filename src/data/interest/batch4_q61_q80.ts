import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_4_INTEREST_QUESTIONS: PlacementQuestion[] = [
  {
    id: "Q61",
    questionNumber: 61,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "Find the compound interest on Rs. 48,000 for 2 years and 6 months at 12% per annum, compounded 10-monthly.",
    options: [
      { key: "A", text: "Rs. 15,280" },
      { key: "B", text: "Rs. 15,888" },
      { key: "C", text: "Rs. 16,120" },
      { key: "D", text: "Rs. 16,500" }
    ],
    correctAnswer: "B",
    solution: "1. 10-Monthly Rule: Total time = 2.5 years = 30 months.\n2. Number of compounding periods n = 30 / 10 = 3 cycles.\n3. Rate per 10 months r = 12% × (10 / 12) = 10%.\n4. Amount A = 48000 × (1 + 10/100)³ = 48000 × 1.331 = Rs. 63,888.\n5. CI = 63,888 - 48,000 = Rs. 15,888.\nCorrect Option: B."
  },
  {
    id: "Q62",
    questionNumber: 62,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "What annual payment will discharge a debt of Rs. 6,450 due in 4 years at 5% per annum simple interest?",
    options: [
      { key: "A", text: "Rs. 1,450" },
      { key: "B", text: "Rs. 1,500" },
      { key: "C", text: "Rs. 1,550" },
      { key: "D", text: "Rs. 1,600" }
    ],
    correctAnswer: "B",
    solution: "1. SI Installment Formula: Debt Amount = n × X + [X × R × n(n - 1)] / 200\n2. Here Debt = 6450, n = 4, R = 5%.\n3. 6450 = 4X + [X × 5 × (4 × 3)] / 200 = 4X + [60X / 200] = 4X + 0.30X = 4.30 X.\n4. X = 6450 / 4.30 = Rs. 1,500.\nCorrect Option: B."
  },
  {
    id: "Q63",
    questionNumber: 63,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "A sum of money invested at compound interest grows to Rs. 4,900 in 4 years and to Rs. 7,000 in 8 years. What will be the amount at the end of 12 years?",
    options: [
      { key: "A", text: "Rs. 9,800" },
      { key: "B", text: "Rs. 10,000" },
      { key: "C", text: "Rs. 10,500" },
      { key: "D", text: "Rs. 11,200" }
    ],
    correctAnswer: "B",
    solution: "1. In geometric progression of CI amounts: A(4) = P k⁴ = 4900, A(8) = P k⁸ = 7000.\n2. Ratio of growth across equal 4-year block: A(8) / A(4) = 7000 / 4900 = 10 / 7.\n3. Amount at 12 years A(12) = A(8) × (10 / 7) = 7000 × (10 / 7) = Rs. 10,000.\nCorrect Option: B."
  },
  {
    id: "Q64",
    questionNumber: 64,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "A man borrows Rs. 25,500 at 4% per annum compound interest to be paid back in two equal annual installments. Find the interest paid in the whole transaction.",
    options: [
      { key: "A", text: "Rs. 1,020" },
      { key: "B", text: "Rs. 1,530" },
      { key: "C", text: "Rs. 1,540" },
      { key: "D", text: "Rs. 1,560" }
    ],
    correctAnswer: "C",
    solution: "1. PV Formula: 25500 = X × (25/26) + X × (625/676) = X × (1275 / 676)\n2. X = (25500 × 676) / 1275 = 20 × 676 = Rs. 13,520 per installment.\n3. Total payment for 2 installments = 13520 × 2 = Rs. 27,040.\n4. Total Interest = 27,040 - 25,500 = Rs. 1,540.\nCorrect Option: C."
  },
  {
    id: "Q65",
    questionNumber: 65,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "The compound interest on a certain sum for the 2nd year at 10% per annum is Rs. 1,320. What was the original principal sum?",
    options: [
      { key: "A", text: "Rs. 11,000" },
      { key: "B", text: "Rs. 12,000" },
      { key: "C", text: "Rs. 12,500" },
      { key: "D", text: "Rs. 13,200" }
    ],
    correctAnswer: "B",
    solution: "1. Amount at the end of 1st year = P × 1.10.\n2. Interest during 2nd year = 10% of (P × 1.10) = 0.11 P.\n3. 0.11 P = 1320 => P = 1320 / 0.11 = Rs. 12,000.\nCorrect Option: B."
  },
  {
    id: "Q66",
    questionNumber: 66,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "A sum of Rs. 13,360 was borrowed at 8.75% per annum compound interest and paid back in two equal annual installments. What was the value of each installment?",
    options: [
      { key: "A", text: "Rs. 7,396" },
      { key: "B", text: "Rs. 7,450" },
      { key: "C", text: "Rs. 7,569" },
      { key: "D", text: "Rs. 7,624" }
    ],
    correctAnswer: "C",
    solution: "1. Rate R = 8.75% = 35/4% = 7/80. Multiplier = 1 + 7/80 = 87/80.\n2. P = X × (80/87) + X × (6400/7569) = X × [(6960 + 6400) / 7569] = X × [13360 / 7569].\n3. 13360 = X × [13360 / 7569] => X = Rs. 7,569.\nCorrect Option: C."
  },
  {
    id: "Q67",
    questionNumber: 67,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "A sum of money invested at compound interest doubles itself in 6 years. How many times will it become in 24 years?",
    options: [
      { key: "A", text: "8 times" },
      { key: "B", text: "12 times" },
      { key: "C", text: "16 times" },
      { key: "D", text: "32 times" }
    ],
    correctAnswer: "C",
    solution: "1. In CI: 6 years -> 2^1 times. 24 years = 4 × 6 years -> 2⁴ = 16 times.\nCorrect Option: C."
  },
  {
    id: "Q68",
    questionNumber: 68,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "A sum of Rs. 16,820 is split into two parts and invested at 5% compound interest per annum, such that the amount of the first part after 3 years equals the amount of the second part after 5 years. What is the smaller part?",
    options: [
      { key: "A", text: "Rs. 8,000" },
      { key: "B", text: "Rs. 8,200" },
      { key: "C", text: "Rs. 8,400" },
      { key: "D", text: "Rs. 8,620" }
    ],
    correctAnswer: "A",
    solution: "1. P1 × (1.05)³ = P2 × (1.05)⁵ => P1 / P2 = (1.05)² = (21/20)² = 441 / 400.\n2. Total parts = 441 + 400 = 841.\n3. Smaller part P2 = (400 / 841) × 16820 = 400 × 20 = Rs. 8,000.\nCorrect Option: A."
  },
  {
    id: "Q69",
    questionNumber: 69,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "The compound interest on a certain principal for 2 years at 15% per annum is Rs. 3,225. What is the simple interest on the same sum at the same rate for the same time?",
    options: [
      { key: "A", text: "Rs. 2,800" },
      { key: "B", text: "Rs. 3,000" },
      { key: "C", text: "Rs. 3,100" },
      { key: "D", text: "Rs. 3,150" }
    ],
    correctAnswer: "B",
    solution: "1. Effective rate of CI for 2 yrs at 15% = 15 + 15 + (225/100) = 32.25%.\n2. 32.25% of P = 3225 => P = Rs. 10,000.\n3. SI for 2 years at 15% = 30% of 10,000 = Rs. 3,000.\nCorrect Option: B."
  },
  {
    id: "Q70",
    questionNumber: 70,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "A person deposited Rs. 50,000 in a scheme that compounds quarterly at 12% per annum. What is the total interest accrued in 6 months?",
    options: [
      { key: "A", text: "Rs. 3,000" },
      { key: "B", text: "Rs. 3,045" },
      { key: "C", text: "Rs. 3,090" },
      { key: "D", text: "Rs. 3,120" }
    ],
    correctAnswer: "B",
    solution: "1. 6 months = 2 quarters; Rate per quarter = 12% / 4 = 3%.\n2. Amount = 50000 × (1.03)² = 50000 × 1.0609 = Rs. 53,045.\n3. CI = 53,045 - 50,000 = Rs. 3,045.\nCorrect Option: B."
  },
  {
    id: "Q71",
    questionNumber: 71,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "A sum of money amounts to Rs. 2,420 in 2 years and to Rs. 2,662 in 3 years at compound interest compounded annually. Find the principal sum.",
    options: [
      { key: "A", text: "Rs. 1,800" },
      { key: "B", text: "Rs. 1,950" },
      { key: "C", text: "Rs. 2,000" },
      { key: "D", text: "Rs. 2,100" }
    ],
    correctAnswer: "C",
    solution: "1. Rate R = [(2662 - 2420) / 2420] × 100 = (242 / 2420) × 100 = 10%.\n2. P = 2420 / (1.10)² = 2420 / 1.21 = Rs. 2,000.\nCorrect Option: C."
  },
  {
    id: "Q72",
    questionNumber: 72,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "At what rate of compound interest per annum will Rs. 32,000 yield a compound interest of Rs. 5,044 in 9 months compounded quarterly?",
    options: [
      { key: "A", text: "15%" },
      { key: "B", text: "18%" },
      { key: "C", text: "20%" },
      { key: "D", text: "24%" }
    ],
    correctAnswer: "C",
    solution: "1. 9 months = 3 quarters (n = 3). Amount = 32000 + 5044 = Rs. 37,044.\n2. (1 + r/100)³ = 37044 / 32000 = 9261 / 8000 = (21 / 20)³.\n3. 1 + r/100 = 21 / 20 => r = 5% per quarter.\n4. Annual Rate R = 4 × 5% = 20% per annum.\nCorrect Option: C."
  },
  {
    id: "Q73",
    questionNumber: 73,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "An investor deposits Rs. 20,000 at 10% per annum compound interest. If 20% tax is deducted at source (TDS) on the interest earned at the end of each financial year, what is the amount after 2 years?",
    options: [
      { key: "A", text: "Rs. 23,200" },
      { key: "B", text: "Rs. 23,328" },
      { key: "C", text: "Rs. 23,450" },
      { key: "D", text: "Rs. 23,600" }
    ],
    correctAnswer: "B",
    solution: "1. Nominal rate = 10%. After 20% TDS, effective net interest rate credited = 10% × (1 - 0.20) = 8% per annum.\n2. Net amount after 2 years = 20000 × (1 + 8/100)² = 20000 × 1.1664 = Rs. 23,328.\nCorrect Option: B."
  },
  {
    id: "Q74",
    questionNumber: 74,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "A sum of money at compound interest amounts to Rs. 4,500 in 2 years and Rs. 6,750 in 4 years. What is the sum?",
    options: [
      { key: "A", text: "Rs. 2,800" },
      { key: "B", text: "Rs. 3,000" },
      { key: "C", text: "Rs. 3,200" },
      { key: "D", text: "Rs. 3,375" }
    ],
    correctAnswer: "B",
    solution: "1. P k² = 4500 and P k⁴ = 6750 => k² = 6750 / 4500 = 1.5 = 3/2.\n2. Principal P = 4500 / k² = 4500 / 1.5 = Rs. 3,000.\nCorrect Option: B."
  },
  {
    id: "Q75",
    questionNumber: 75,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "The simple interest on a certain sum for 3 years at 10% per annum is Rs. 1,500. What is the difference between CI and SI on this sum for the same duration and rate?",
    options: [
      { key: "A", text: "Rs. 145" },
      { key: "B", text: "Rs. 150" },
      { key: "C", text: "Rs. 155" },
      { key: "D", text: "Rs. 160" }
    ],
    correctAnswer: "C",
    solution: "1. SI = 1500 => Principal P = (1500 × 100) / (10 × 3) = Rs. 5,000.\n2. 3-Year Difference = P × (R/100)² × [(300 + R)/100] = 5000 × (1/100) × (310/100) = 50 × 3.10 = Rs. 155.\nCorrect Option: C."
  },
  {
    id: "Q76",
    questionNumber: 76,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "If a loan of Rs. 1,00,000 is repaid in 3 equal annual installments at 10% per annum compound interest, what is the approximate amount of each installment?",
    options: [
      { key: "A", text: "Rs. 38,210" },
      { key: "B", text: "Rs. 40,211" },
      { key: "C", text: "Rs. 42,300" },
      { key: "D", text: "Rs. 44,500" }
    ],
    correctAnswer: "B",
    solution: "1. PV = X [1/1.1 + 1/1.21 + 1/1.331] = X [0.90909 + 0.82645 + 0.75131] = 2.48685 X.\n2. X = 100000 / 2.48685 ≈ Rs. 40,211.\nCorrect Option: B."
  },
  {
    id: "Q77",
    questionNumber: 77,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "A sum of money amounts to 9 times itself in 2 years at compound interest compounded annually. In how many years will it become 27 times itself?",
    options: [
      { key: "A", text: "3 years" },
      { key: "B", text: "4 years" },
      { key: "C", text: "5 years" },
      { key: "D", text: "6 years" }
    ],
    correctAnswer: "A",
    solution: "1. In 2 years, (1 + R/100)² = 9 = 3² => 1 + R/100 = 3 (triples in 1 year).\n2. For 27 times = 3³ times, time required = 3 × 1 = 3 years.\nCorrect Option: A."
  },
  {
    id: "Q78",
    questionNumber: 78,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "The value of a vehicle depreciates by 10% in the 1st year, 15% in the 2nd year, and 20% in the 3rd year. If its initial purchase price was Rs. 2,00,000, what is its value at the end of 3 years?",
    options: [
      { key: "A", text: "Rs. 1,20,000" },
      { key: "B", text: "Rs. 1,22,400" },
      { key: "C", text: "Rs. 1,24,600" },
      { key: "D", text: "Rs. 1,26,000" }
    ],
    correctAnswer: "B",
    solution: "1. Value = 200000 × (1 - 0.10) × (1 - 0.15) × (1 - 0.20)\n2. 200000 × 0.90 × 0.85 × 0.80 = 180000 × 0.85 × 0.80 = 153000 × 0.80 = Rs. 1,22,400.\nCorrect Option: B."
  },
  {
    id: "Q79",
    questionNumber: 79,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "What is the difference between simple interest and compound interest on Rs. 10,000 for 1.5 years at 8% per annum compounded half-yearly?",
    options: [
      { key: "A", text: "Rs. 32.64" },
      { key: "B", text: "Rs. 48.64" },
      { key: "C", text: "Rs. 52.48" },
      { key: "D", text: "Rs. 64.00" }
    ],
    correctAnswer: "B",
    solution: "1. SI for 1.5 years at 8% = (10000 × 8 × 1.5) / 100 = Rs. 1,200.\n2. Half-yearly compounding: 3 cycles at 4% => Amount = 10000 × (1.04)³ = 10000 × 1.124864 = Rs. 11,248.64.\n3. CI = Rs. 1,248.64.\n4. Difference = 1248.64 - 1200 = Rs. 48.64.\nCorrect Option: B."
  },
  {
    id: "Q80",
    questionNumber: 80,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: "A sum of money invested at compound interest grows to Rs. 7,200 in 1 year and Rs. 8,640 in 2 years. What was the original principal amount?",
    options: [
      { key: "A", text: "Rs. 5,800" },
      { key: "B", text: "Rs. 6,000" },
      { key: "C", text: "Rs. 6,200" },
      { key: "D", text: "Rs. 6,400" }
    ],
    correctAnswer: "B",
    solution: "1. Multiplier (1 + R/100) = 8640 / 7200 = 1.20 (Rate = 20%).\n2. Principal P = 7200 / 1.20 = Rs. 6,000.\nCorrect Option: B."
  }
];
