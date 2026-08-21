import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_1_INTEREST_QUESTIONS: PlacementQuestion[] = [
  {
    id: "Q01",
    questionNumber: 1,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A sum of Rs. 15,000 is invested in a fixed deposit at a simple interest rate of 8% per annum for 3 years. What is the total simple interest earned and the final maturity amount?",
    options: [
      { key: "A", text: "SI = Rs. 3,600, Amount = Rs. 18,600" },
      { key: "B", text: "SI = Rs. 3,200, Amount = Rs. 18,200" },
      { key: "C", text: "SI = Rs. 3,800, Amount = Rs. 18,800" },
      { key: "D", text: "SI = Rs. 4,000, Amount = Rs. 19,000" }
    ],
    correctAnswer: "A",
    solution: "1. Formula: SI = (P × R × T) / 100\n2. Here P = 15,000, R = 8%, T = 3 years.\n3. SI = (15000 × 8 × 3) / 100 = 150 × 24 = Rs. 3,600.\n4. Amount = P + SI = 15,000 + 3,600 = Rs. 18,600.\nCorrect Option: A."
  },
  {
    id: "Q02",
    questionNumber: 2,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "At what rate of simple interest per annum will a principal amount double itself in exactly 8 years?",
    options: [
      { key: "A", text: "10%" },
      { key: "B", text: "12.5%" },
      { key: "C", text: "14%" },
      { key: "D", text: "15%" }
    ],
    correctAnswer: "B",
    solution: "1. Concept: For a sum to become N times at Simple Interest, R × T = (N - 1) × 100.\n2. Here N = 2 (doubles), T = 8 years.\n3. R × 8 = (2 - 1) × 100 = 100 => R = 100 / 8 = 12.5% per annum.\nCorrect Option: B."
  },
  {
    id: "Q03",
    questionNumber: 3,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "In how many years will a sum of money triple itself at 10% per annum simple interest?",
    options: [
      { key: "A", text: "15 years" },
      { key: "B", text: "18 years" },
      { key: "C", text: "20 years" },
      { key: "D", text: "25 years" }
    ],
    correctAnswer: "C",
    solution: "1. Formula: T = [(N - 1) × 100] / R\n2. Here N = 3 (triples), R = 10%.\n3. T = (3 - 1) × 100 / 10 = 200 / 10 = 20 years.\nCorrect Option: C."
  },
  {
    id: "Q04",
    questionNumber: 4,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "Calculate the compound interest on a principal of Rs. 8,000 for 2 years at 10% per annum compounded annually.",
    options: [
      { key: "A", text: "Rs. 1,600" },
      { key: "B", text: "Rs. 1,680" },
      { key: "C", text: "Rs. 1,720" },
      { key: "D", text: "Rs. 1,760" }
    ],
    correctAnswer: "B",
    solution: "1. Formula: Amount A = P (1 + R/100)^n\n2. A = 8000 × (1 + 10/100)² = 8000 × (1.10)² = 8000 × 1.21 = Rs. 9,680.\n3. CI = Amount - Principal = 9,680 - 8,000 = Rs. 1,680.\n(Shortcut: Effective rate for 2 years at 10% = 10 + 10 + (10×10)/100 = 21%. CI = 21% of 8000 = Rs. 1,680).\nCorrect Option: B."
  },
  {
    id: "Q05",
    questionNumber: 5,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "What will be the compound interest on Rs. 20,000 at 12% per annum for 1 year, compounded half-yearly?",
    options: [
      { key: "A", text: "Rs. 2,400" },
      { key: "B", text: "Rs. 2,472" },
      { key: "C", text: "Rs. 2,520" },
      { key: "D", text: "Rs. 2,544" }
    ],
    correctAnswer: "B",
    solution: "1. Compounded half-yearly rule: Rate per half-year r = 12 / 2 = 6%; Periods n = 1 × 2 = 2 cycles.\n2. Amount A = 20000 × (1 + 6/100)² = 20000 × (1.06)² = 20000 × 1.1236 = Rs. 22,472.\n3. CI = 22,472 - 20,000 = Rs. 2,472.\n(Shortcut: Effective rate = 6 + 6 + 0.36 = 12.36%. CI = 12.36% of 20000 = Rs. 2,472).\nCorrect Option: B."
  },
  {
    id: "Q06",
    questionNumber: 6,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "Find the compound interest on Rs. 16,000 at 20% per annum for 9 months, compounded quarterly.",
    options: [
      { key: "A", text: "Rs. 2,480" },
      { key: "B", text: "Rs. 2,522" },
      { key: "C", text: "Rs. 2,560" },
      { key: "D", text: "Rs. 2,640" }
    ],
    correctAnswer: "B",
    solution: "1. Compounded quarterly rule: Rate per quarter r = 20% / 4 = 5%; Time = 9 months = 3 quarters (n = 3).\n2. Amount A = 16000 × (1 + 5/100)³ = 16000 × (21/20)³ = 16000 × (9261 / 8000) = 2 × 9261 = Rs. 18,522.\n3. CI = 18,522 - 16,000 = Rs. 2,522.\nCorrect Option: B."
  },
  {
    id: "Q07",
    questionNumber: 7,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The difference between the compound interest and simple interest on a certain principal amount at 10% per annum for 2 years is Rs. 65. What is the principal amount?",
    options: [
      { key: "A", text: "Rs. 6,000" },
      { key: "B", text: "Rs. 6,500" },
      { key: "C", text: "Rs. 7,000" },
      { key: "D", text: "Rs. 7,500" }
    ],
    correctAnswer: "B",
    solution: "1. 2-Year SI vs CI Difference Formula: Diff = P × (R / 100)²\n2. 65 = P × (10 / 100)² = P × (1/100)\n3. P = 65 × 100 = Rs. 6,500.\nCorrect Option: B."
  },
  {
    id: "Q08",
    questionNumber: 8,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A sum of money invested at compound interest doubles itself in 4 years. In how many years will it become 8 times of itself at the same compound interest rate?",
    options: [
      { key: "A", text: "8 years" },
      { key: "B", text: "12 years" },
      { key: "C", text: "16 years" },
      { key: "D", text: "20 years" }
    ],
    correctAnswer: "B",
    solution: "1. Concept: In Compound Interest, if a sum becomes k times in T years, it becomes k^m times in (m × T) years.\n2. Here k = 2, T = 4 years.\n3. We want 8 times = 2³ times (so m = 3).\n4. Total time = 3 × 4 = 12 years.\nCorrect Option: B."
  },
  {
    id: "Q09",
    questionNumber: 9,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A sum of money amounts to Rs. 4,800 in 2 years and to Rs. 5,520 in 3 years at simple interest. What is the principal sum and the rate of interest?",
    options: [
      { key: "A", text: "Principal = Rs. 3,360, Rate = 21.4%" },
      { key: "B", text: "Principal = Rs. 3,400, Rate = 20.5%" },
      { key: "C", text: "Principal = Rs. 3,360, Rate = 20%" },
      { key: "D", text: "Principal = Rs. 3,600, Rate = 15%" }
    ],
    correctAnswer: "A",
    solution: "1. Interest for 1 year (3rd year) = 5,520 - 4,800 = Rs. 720.\n2. Interest for 2 years = 720 × 2 = Rs. 1,440.\n3. Principal P = Amount after 2 years - 2 years interest = 4,800 - 1,440 = Rs. 3,360.\n4. Rate R = (1 year SI × 100) / P = (720 × 100) / 3360 = 7200 / 336 ≈ 21.43%.\nCorrect Option: A."
  },
  {
    id: "Q10",
    questionNumber: 10,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "If a sum of Rs. 12,000 yields a simple interest of Rs. 2,880 in 3 years, what is the annual rate of interest?",
    options: [
      { key: "A", text: "7%" },
      { key: "B", text: "8%" },
      { key: "C", text: "8.5%" },
      { key: "D", text: "9%" }
    ],
    correctAnswer: "B",
    solution: "1. Formula: R = (SI × 100) / (P × T)\n2. R = (2880 × 100) / (12000 × 3) = 288000 / 36000 = 8% per annum.\nCorrect Option: B."
  },
  {
    id: "Q11",
    questionNumber: 11,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "What is the effective annual rate of interest corresponding to a nominal rate of 8% per annum compounded half-yearly?",
    options: [
      { key: "A", text: "8.08%" },
      { key: "B", text: "8.16%" },
      { key: "C", text: "8.24%" },
      { key: "D", text: "8.32%" }
    ],
    correctAnswer: "B",
    solution: "1. Effective Annual Rate (EAR) = [1 + R / (100 × m)]^m - 1\n2. Here R = 8%, m = 2 (semi-annual).\n3. EAR = (1 + 0.04)² - 1 = 1.0816 - 1 = 0.0816 = 8.16%.\nCorrect Option: B."
  },
  {
    id: "Q12",
    questionNumber: 12,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A sum of Rs. 25,000 is invested for 3 years at compound interest, where the rate of interest is 4% in the 1st year, 5% in the 2nd year, and 10% in the 3rd year. What is the total amount at maturity?",
    options: [
      { key: "A", text: "Rs. 30,030" },
      { key: "B", text: "Rs. 30,150" },
      { key: "C", text: "Rs. 30,250" },
      { key: "D", text: "Rs. 30,500" }
    ],
    correctAnswer: "A",
    solution: "1. Variable Rate Formula: A = P × (1 + R1/100) × (1 + R2/100) × (1 + R3/100)\n2. A = 25000 × (1.04) × (1.05) × (1.10)\n3. 25000 × 1.04 = 26,000\n4. 26000 × 1.05 = 27,300\n5. 27300 × 1.10 = Rs. 30,030.\nCorrect Option: A."
  },
  {
    id: "Q13",
    questionNumber: 13,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A person borrowed Rs. 10,000 at 12% p.a. simple interest and immediately lent it to another person at 12% p.a. compound interest compounded annually for 2 years. What was his overall gain in this transaction?",
    options: [
      { key: "A", text: "Rs. 120" },
      { key: "B", text: "Rs. 144" },
      { key: "C", text: "Rs. 160" },
      { key: "D", text: "Rs. 180" }
    ],
    correctAnswer: "B",
    solution: "1. Gain = Difference between CI and SI on the same sum for 2 years at 12%.\n2. Diff = P × (R / 100)² = 10000 × (12 / 100)² = 10000 × (144 / 10000) = Rs. 144.\nCorrect Option: B."
  },
  {
    id: "Q14",
    questionNumber: 14,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The value of an industrial server machine depreciates at the rate of 10% per annum. If its current value is Rs. 1,00,000, what will be its value after 2 years?",
    options: [
      { key: "A", text: "Rs. 80,000" },
      { key: "B", text: "Rs. 81,000" },
      { key: "C", text: "Rs. 82,500" },
      { key: "D", text: "Rs. 85,000" }
    ],
    correctAnswer: "B",
    solution: "1. Depreciation Formula: Value after n years = P × (1 - R/100)^n\n2. Value = 100000 × (1 - 10/100)² = 100000 × (0.90)² = 100000 × 0.81 = Rs. 81,000.\nCorrect Option: B."
  },
  {
    id: "Q15",
    questionNumber: 15,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A certain sum invested at compound interest grows to Rs. 6,500 at the end of the 1st year and to Rs. 7,150 at the end of the 2nd year. What is the rate of interest per annum?",
    options: [
      { key: "A", text: "8%" },
      { key: "B", text: "9%" },
      { key: "C", text: "10%" },
      { key: "D", text: "12%" }
    ],
    correctAnswer: "C",
    solution: "1. In compound interest, the amount at the end of Year 1 serves as the principal for Year 2.\n2. Interest earned in Year 2 = 7,150 - 6,500 = Rs. 650.\n3. Rate R = (650 / 6500) × 100 = 10% per annum.\nCorrect Option: C."
  },
  {
    id: "Q16",
    questionNumber: 16,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "If simple interest on a certain sum for 2 years at 5% per annum is Rs. 500, what will be the compound interest on the same sum at the same rate and for the same duration?",
    options: [
      { key: "A", text: "Rs. 510.50" },
      { key: "B", text: "Rs. 512.50" },
      { key: "C", text: "Rs. 515.00" },
      { key: "D", text: "Rs. 520.00" }
    ],
    correctAnswer: "B",
    solution: "1. 2-Year Relation: CI = SI × [1 + R/200]\n2. CI = 500 × [1 + 5/200] = 500 × (205 / 200) = 500 × 1.025 = Rs. 512.50.\n(Alternatively: SI = 500 => Principal P = (500×100)/(2×5) = 5000. CI = 5000 × [(1.05)² - 1] = 5000 × 0.1025 = Rs. 512.50).\nCorrect Option: B."
  },
  {
    id: "Q17",
    questionNumber: 17,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A lender charges simple interest such that an initial amount of Rs. 4,500 becomes Rs. 5,400 in 4 years. What would Rs. 6,000 become in 2.5 years at the same interest rate?",
    options: [
      { key: "A", text: "Rs. 6,600" },
      { key: "B", text: "Rs. 6,750" },
      { key: "C", text: "Rs. 6,800" },
      { key: "D", text: "Rs. 6,900" }
    ],
    correctAnswer: "B",
    solution: "1. Initial interest = 5,400 - 4,500 = Rs. 900 in 4 years.\n2. Rate R = (900 × 100) / (4500 × 4) = 90000 / 18000 = 5% p.a.\n3. For Rs. 6,000 in 2.5 years: SI = (6000 × 5 × 2.5) / 100 = 60 × 12.5 = Rs. 750.\n4. Total Amount = 6,000 + 750 = Rs. 6,750.\nCorrect Option: B."
  },
  {
    id: "Q18",
    questionNumber: 18,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A sum of money at compound interest triples itself in 3 years. In how many years will it become 27 times of itself?",
    options: [
      { key: "A", text: "6 years" },
      { key: "B", text: "9 years" },
      { key: "C", text: "12 years" },
      { key: "D", text: "15 years" }
    ],
    correctAnswer: "B",
    solution: "1. In CI, if sum becomes 3 times in 3 years, it becomes 3³ = 27 times in 3 × 3 = 9 years.\nCorrect Option: B."
  },
  {
    id: "Q19",
    questionNumber: 19,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "What is the simple interest on Rs. 7,300 from 5th January 2024 to 19th March 2024 at 5% per annum?",
    options: [
      { key: "A", text: "Rs. 72" },
      { key: "B", text: "Rs. 73" },
      { key: "C", text: "Rs. 74" },
      { key: "D", text: "Rs. 75" }
    ],
    correctAnswer: "C",
    solution: "1. Note: 2024 is a leap year (February has 29 days).\n2. Number of days:\n   - January: 31 - 5 = 26 days\n   - February: 29 days\n   - March: 19 days\n   - Total days = 26 + 29 + 19 = 74 days.\n3. Time T = 74 / 366 years (leap year) or on standard standard 74/365 => 7300 × 5 × (74/365)/100 = 20 × 5 × (74/100) = Rs. 74.\nCorrect Option: C."
  },
  {
    id: "Q20",
    questionNumber: 20,
    topic: "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A sum of Rs. 10,000 is lent partly at 6% per annum and the rest at 8% per annum. If the total annual simple interest received is Rs. 750, what was the amount lent at 8% per annum?",
    options: [
      { key: "A", text: "Rs. 6,500" },
      { key: "B", text: "Rs. 7,000" },
      { key: "C", text: "Rs. 7,500" },
      { key: "D", text: "Rs. 8,000" }
    ],
    correctAnswer: "C",
    solution: "1. Alligation Method:\n   - Effective overall rate = (750 / 10000) × 100 = 7.5%.\n   - Ratio of parts at 6% and 8% = |8 - 7.5| : |7.5 - 6| = 0.5 : 1.5 = 1 : 3.\n2. Amount at 8% = [3 / (1 + 3)] × 10,000 = (3/4) × 10,000 = Rs. 7,500.\nCorrect Option: C."
  }
];
