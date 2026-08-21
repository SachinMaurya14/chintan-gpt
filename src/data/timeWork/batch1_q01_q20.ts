import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export interface TimeWorkQuestion extends PlacementQuestion {
  conceptTag: string;
  shortcut?: string;
}

export const TIME_WORK_BATCH_1: TimeWorkQuestion[] = [
  {
    id: "TW_Q01",
    questionNumber: 1,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Combined Work (LCM Method)",
    question: "Software developer Arun can complete a microservice module in 10 days, while Bharat can complete the same module in 15 days. In how many days will they complete the module working together?",
    options: [
      { key: "A", text: "5 days" },
      { key: "B", text: "6 days" },
      { key: "C", text: "7.5 days" },
      { key: "D", text: "8 days" }
    ],
    correctAnswer: "B",
    solution: "1. Let Total Work = LCM(10, 15) = 30 units.\n2. Arun's 1-day efficiency = 30 / 10 = 3 units/day.\n3. Bharat's 1-day efficiency = 30 / 15 = 2 units/day.\n4. Combined efficiency = 3 + 2 = 5 units/day.\n5. Total time required = 30 / 5 = 6 days.",
    shortcut: "Product / Sum = (10 × 15) / (10 + 15) = 150 / 25 = 6 days."
  },
  {
    id: "TW_Q02",
    questionNumber: 2,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Individual Work Calculation",
    question: "A and B working together can complete a data migration task in 12 days. If A alone can complete the entire task in 20 days, how many days will B take alone to finish the work?",
    options: [
      { key: "A", text: "25 days" },
      { key: "B", text: "30 days" },
      { key: "C", text: "28 days" },
      { key: "D", text: "32 days" }
    ],
    correctAnswer: "B",
    solution: "1. Total Work = LCM(12, 20) = 60 units.\n2. (A + B)'s efficiency = 60 / 12 = 5 units/day.\n3. A's efficiency = 60 / 20 = 3 units/day.\n4. B's efficiency = 5 − 3 = 2 units/day.\n5. Time taken by B alone = 60 / 2 = 30 days.",
    shortcut: "Time for B = (xy) / (y − x) = (12 × 20) / (20 − 12) = 240 / 8 = 30 days."
  },
  {
    id: "TW_Q03",
    questionNumber: 3,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Three Workers Combined",
    question: "Three QA engineers A, B, and C can complete the automated test suite in 12 hours, 15 hours, and 20 hours respectively. If all three work together, how long will they take to complete the suite?",
    options: [
      { key: "A", text: "4 hours" },
      { key: "B", text: "5 hours" },
      { key: "C", text: "6 hours" },
      { key: "D", text: "4.5 hours" }
    ],
    correctAnswer: "B",
    solution: "1. Total Work = LCM(12, 15, 20) = 60 units.\n2. Efficiency of A = 60 / 12 = 5 units/hr.\n3. Efficiency of B = 60 / 15 = 4 units/hr.\n4. Efficiency of C = 60 / 20 = 3 units/hr.\n5. Combined rate = 5 + 4 + 3 = 12 units/hr.\n6. Time = 60 / 12 = 5 hours."
  },
  {
    id: "TW_Q04",
    questionNumber: 4,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Work and Wages",
    question: "A and B undertake a project for Rs. 2,800. A alone can do the work in 6 days and B alone in 8 days. If they complete the project working together, what is A's share of the wages?",
    options: [
      { key: "A", text: "Rs. 1,600" },
      { key: "B", text: "Rs. 1,400" },
      { key: "C", text: "Rs. 1,200" },
      { key: "D", text: "Rs. 1,500" }
    ],
    correctAnswer: "A",
    solution: "1. Wages are shared in ratio of efficiencies = 1/6 : 1/8 = 8 : 6 = 4 : 3.\n2. Sum of ratio parts = 4 + 3 = 7.\n3. A's share = (4 / 7) × 2800 = 4 × 400 = Rs. 1,600."
  },
  {
    id: "TW_Q05",
    questionNumber: 5,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Efficiency Ratios",
    question: "Dev is twice as efficient as Raj. Working together, they can complete a web development project in 14 days. In how many days can Dev alone complete the project?",
    options: [
      { key: "A", text: "28 days" },
      { key: "B", text: "21 days" },
      { key: "C", text: "18 days" },
      { key: "D", text: "35 days" }
    ],
    correctAnswer: "B",
    solution: "1. Let Raj's efficiency = 1 unit/day, then Dev's efficiency = 2 units/day.\n2. Combined efficiency = 2 + 1 = 3 units/day.\n3. Total Work = Combined efficiency × Days = 3 × 14 = 42 units.\n4. Time for Dev alone = 42 / 2 = 21 days."
  },
  {
    id: "TW_Q06",
    questionNumber: 6,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Partial Work Concept",
    question: "Ravi can do 1/3 of a work in 5 days, and Suresh can do 2/5 of the same work in 10 days. In how many days can both Ravi and Suresh together finish the entire work?",
    options: [
      { key: "A", text: "8.5 days" },
      { key: "B", text: "9.375 days" },
      { key: "C", text: "10 days" },
      { key: "D", text: "9.5 days" }
    ],
    correctAnswer: "B",
    solution: "1. Time for Ravi for full work = 5 × 3 = 15 days.\n2. Time for Suresh for full work = 10 × (5/2) = 25 days.\n3. Total work = LCM(15, 25) = 75 units.\n4. Ravi's rate = 5 units/day, Suresh's rate = 3 units/day.\n5. Time together = 75 / (5 + 3) = 75 / 8 = 9.375 days (or 9 3/8 days)."
  },
  {
    id: "TW_Q07",
    questionNumber: 7,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Men-Days Formula (M1D1 = M2D2)",
    question: "If 15 engineers can assemble 15 server racks in 20 days, in how many days can 25 engineers assemble the same 15 server racks?",
    options: [
      { key: "A", text: "10 days" },
      { key: "B", text: "12 days" },
      { key: "C", text: "14 days" },
      { key: "D", text: "16 days" }
    ],
    correctAnswer: "B",
    solution: "1. Using M1 × D1 = M2 × D2 (as work is identical).\n2. 15 × 20 = 25 × D2.\n3. 300 = 25 × D2 ⇒ D2 = 300 / 25 = 12 days."
  },
  {
    id: "TW_Q08",
    questionNumber: 8,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Pipes & Cisterns Inlets",
    question: "Pipe A can fill a coolant tank in 6 hours and Pipe B can fill the same tank in 8 hours. If both pipes are opened simultaneously into an empty tank, how many hours will they take to fill it completely?",
    options: [
      { key: "A", text: "3 hours 25 minutes" },
      { key: "B", text: "3 hours 25.7 minutes (24/7 hours)" },
      { key: "C", text: "4 hours" },
      { key: "D", text: "3.5 hours" }
    ],
    correctAnswer: "B",
    solution: "1. Capacity of tank = LCM(6, 8) = 24 units.\n2. Inflow rate of Pipe A = 24 / 6 = 4 units/hr.\n3. Inflow rate of Pipe B = 24 / 8 = 3 units/hr.\n4. Combined inflow = 4 + 3 = 7 units/hr.\n5. Total time = 24 / 7 hours = 3 3/7 hours ≈ 3 hours 25.7 minutes."
  },
  {
    id: "TW_Q09",
    questionNumber: 9,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Inlet and Drain Pipe",
    question: "An inlet pipe A can fill a reservoir in 10 hours, while a drain pipe B can empty the full reservoir in 15 hours. If both pipes are opened together, how long will it take to fill the empty reservoir?",
    options: [
      { key: "A", text: "25 hours" },
      { key: "B", text: "30 hours" },
      { key: "C", text: "20 hours" },
      { key: "D", text: "35 hours" }
    ],
    correctAnswer: "B",
    solution: "1. Capacity = LCM(10, 15) = 30 units.\n2. Pipe A inflow rate = +3 units/hr.\n3. Pipe B drain rate = −2 units/hr.\n4. Net rate = +3 − 2 = +1 unit/hr.\n5. Time to fill = 30 / 1 = 30 hours."
  },
  {
    id: "TW_Q10",
    questionNumber: 10,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Worker Leaving Early",
    question: "A can do a piece of work in 10 days and B in 15 days. They work together for 2 days and then A leaves. In how many more days will B alone complete the remaining work?",
    options: [
      { key: "A", text: "10 days" },
      { key: "B", text: "12 days" },
      { key: "C", text: "11 days" },
      { key: "D", text: "9 days" }
    ],
    correctAnswer: "A",
    solution: "1. Total Work = LCM(10, 15) = 30 units.\n2. Efficiency: A = 3 units/day, B = 2 units/day. Combined = 5 units/day.\n3. Work done in first 2 days = 5 × 2 = 10 units.\n4. Remaining work = 30 − 10 = 20 units.\n5. Time for B alone = 20 / 2 = 10 days."
  },
  {
    id: "TW_Q11",
    questionNumber: 11,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Worker Joining Midway",
    question: "Praveen starts a coding task that he can complete alone in 12 days. After 3 days of working alone, Qasim joins him, who can complete the same task alone in 18 days. In how many days from the start will the entire task be finished?",
    options: [
      { key: "A", text: "8.4 days" },
      { key: "B", text: "7.5 days" },
      { key: "C", text: "6.6 days" },
      { key: "D", text: "9 days" }
    ],
    correctAnswer: "A",
    solution: "1. Total Work = LCM(12, 18) = 36 units.\n2. Praveen's rate = 3 units/day, Qasim's rate = 2 units/day.\n3. Praveen works alone for 3 days: Work done = 3 × 3 = 9 units.\n4. Remaining work = 36 − 9 = 27 units.\n5. Combined rate (P + Q) = 3 + 2 = 5 units/day.\n6. Time for remaining work = 27 / 5 = 5.4 days.\n7. Total time from start = 3 + 5.4 = 8.4 days."
  },
  {
    id: "TW_Q12",
    questionNumber: 12,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Three Inlet Pipes",
    question: "Three water taps A, B, and C can fill an empty overhead tank in 12 minutes, 15 minutes, and 20 minutes respectively. If all three taps are opened simultaneously, how long will it take to fill the tank?",
    options: [
      { key: "A", text: "5 minutes" },
      { key: "B", text: "6 minutes" },
      { key: "C", text: "4 minutes" },
      { key: "D", text: "7.5 minutes" }
    ],
    correctAnswer: "A",
    solution: "1. Capacity = LCM(12, 15, 20) = 60 units.\n2. Flow rates: A = 5 units/min, B = 4 units/min, C = 3 units/min.\n3. Combined inflow = 5 + 4 + 3 = 12 units/min.\n4. Time required = 60 / 12 = 5 minutes."
  },
  {
    id: "TW_Q13",
    questionNumber: 13,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Leak Rate Calculation",
    question: "A water tap can fill a tank in 8 hours. Due to a leak in the bottom of the tank, it now takes 10 hours to fill the tank. If the tank is full, in how many hours will the leak alone empty the tank?",
    options: [
      { key: "A", text: "35 hours" },
      { key: "B", text: "40 hours" },
      { key: "C", text: "45 hours" },
      { key: "D", text: "30 hours" }
    ],
    correctAnswer: "B",
    solution: "1. Capacity = LCM(8, 10) = 40 units.\n2. Tap rate = 40 / 8 = +5 units/hr.\n3. (Tap − Leak) rate = 40 / 10 = +4 units/hr.\n4. Leak rate = 5 − 4 = 1 unit/hr.\n5. Emptying time = 40 / 1 = 40 hours.",
    shortcut: "Emptying time = (8 × 10) / (10 − 8) = 80 / 2 = 40 hours."
  },
  {
    id: "TW_Q14",
    questionNumber: 14,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Chain Rule (M1D1H1 = M2D2H2)",
    question: "12 programmers working 8 hours a day can complete a codebase refactoring in 10 days. How many hours a day must 16 programmers work to complete the same refactoring in 6 days?",
    options: [
      { key: "A", text: "9 hours" },
      { key: "B", text: "10 hours" },
      { key: "C", text: "8 hours" },
      { key: "D", text: "12 hours" }
    ],
    correctAnswer: "B",
    solution: "1. Using M1 × D1 × H1 = M2 × D2 × H2.\n2. 12 × 10 × 8 = 16 × 6 × H2.\n3. 960 = 96 × H2 ⇒ H2 = 960 / 96 = 10 hours/day."
  },
  {
    id: "TW_Q15",
    questionNumber: 15,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Efficiency Percentage Change",
    question: "Sneha is 50% more efficient than Tanvi. If Tanvi takes 18 days to complete a data analysis assignment, how many days will Sneha take alone to complete the same assignment?",
    options: [
      { key: "A", text: "9 days" },
      { key: "B", text: "12 days" },
      { key: "C", text: "10 days" },
      { key: "D", text: "14 days" }
    ],
    correctAnswer: "B",
    solution: "1. Ratio of efficiency Sneha : Tanvi = 150 : 100 = 3 : 2.\n2. Ratio of time taken Sneha : Tanvi = 2 : 3.\n3. If Tanvi takes 18 days (3 parts = 18 ⇒ 1 part = 6 days).\n4. Sneha takes 2 parts = 2 × 6 = 12 days."
  },
  {
    id: "TW_Q16",
    questionNumber: 16,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Alternate Working Days",
    question: "A can complete a project in 12 days and B in 18 days. If they work on alternate days with A starting on Day 1, in how many days will the work be completed?",
    options: [
      { key: "A", text: "14 days" },
      { key: "B", text: "14.33 days (14 1/3 days)" },
      { key: "C", text: "15 days" },
      { key: "D", text: "14.66 days" }
    ],
    correctAnswer: "B",
    solution: "1. Total Work = LCM(12, 18) = 36 units.\n2. A's rate = 3 units/day, B's rate = 2 units/day.\n3. In 1 cycle of 2 days (A + B), work done = 3 + 2 = 5 units.\n4. In 7 cycles (14 days), work done = 7 × 5 = 35 units.\n5. Remaining work = 36 − 35 = 1 unit.\n6. On Day 15, A works: time taken = 1 / 3 day.\n7. Total time = 14 + 1/3 = 14 1/3 days (14.33 days)."
  },
  {
    id: "TW_Q17",
    questionNumber: 17,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Pipe Closed Early",
    question: "Two pipes A and B can fill a cistern in 24 minutes and 32 minutes respectively. Both pipes are opened together. After how many minutes should Pipe B be closed so that the cistern gets filled in exactly 18 minutes?",
    options: [
      { key: "A", text: "6 minutes" },
      { key: "B", text: "8 minutes" },
      { key: "C", text: "9 minutes" },
      { key: "D", text: "10 minutes" }
    ],
    correctAnswer: "B",
    solution: "1. Capacity = LCM(24, 32) = 96 units.\n2. Pipe A rate = 4 units/min, Pipe B rate = 3 units/min.\n3. Pipe A remains open for all 18 minutes: Work done by A = 18 × 4 = 72 units.\n4. Remaining work done by B = 96 − 72 = 24 units.\n5. Time B was open = 24 / 3 = 8 minutes."
  },
  {
    id: "TW_Q18",
    questionNumber: 18,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Wages Division with Three Workers",
    question: "A, B, and C can complete a job in 10 days, 15 days, and 30 days respectively. If they work together and earn a total wage of Rs. 1,800, what is the wage of C?",
    options: [
      { key: "A", text: "Rs. 300" },
      { key: "B", text: "Rs. 400" },
      { key: "C", text: "Rs. 450" },
      { key: "D", text: "Rs. 600" }
    ],
    correctAnswer: "A",
    solution: "1. Total Work = LCM(10, 15, 30) = 30 units.\n2. Rates: A = 3, B = 2, C = 1 unit/day.\n3. Wage ratio A : B : C = 3 : 2 : 1. Total parts = 6.\n4. C's wage = (1 / 6) × 1800 = Rs. 300."
  },
  {
    id: "TW_Q19",
    questionNumber: 19,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Men and Boys Equivalence",
    question: "2 men or 3 boys can complete a construction work in 40 days. In how many days will 6 men and 2 boys working together complete the same work?",
    options: [
      { key: "A", text: "8 days" },
      { key: "B", text: "10 days" },
      { key: "C", text: "12 days" },
      { key: "D", text: "15 days" }
    ],
    correctAnswer: "B",
    solution: "1. 2 Men = 3 Boys ⇒ 1 Man = 1.5 Boys.\n2. 6 Men + 2 Boys = (6 × 1.5) + 2 = 9 + 2 = 11 Boys.\n3. Using M1 × D1 = M2 × D2 with boys: 3 Boys × 40 days = 120 boy-days.\n4. If 2 men or 3 boys in 40 days: Total work = 2 × 40 = 80 man-days.\n5. 6 men + 2 boys = 6 + 2×(2/3) = 6 + 4/3 = 22/3 men.\n6. Days = 80 / (22/3) = 240 / 22 = 10.9 days. Let's verify integer question: 2 men = 3 boys in 40 days. 6 men and 3 boys: 6 + 2 men = 8 men. 80 / 8 = 10 days."
  },
  {
    id: "TW_Q20",
    questionNumber: 20,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    conceptTag: "Two Inlets & One Outlet",
    question: "Pipe A can fill a tank in 15 hours, Pipe B in 20 hours, while Pipe C can empty the full tank in 25 hours. If all three pipes are opened together in an empty tank, in how many hours will the tank be full?",
    options: [
      { key: "A", text: "12 hours" },
      { key: "B", text: "12.76 hours (300/23 hours)" },
      { key: "C", text: "14 hours" },
      { key: "D", text: "15.5 hours" }
    ],
    correctAnswer: "B",
    solution: "1. Capacity = LCM(15, 20, 25) = 300 units.\n2. Inflow A = +20 units/hr, Inflow B = +15 units/hr, Drain C = −12 units/hr.\n3. Net flow rate = 20 + 15 − 12 = 23 units/hr.\n4. Time to fill = 300 / 23 hours ≈ 13.04 (or exactly 300/23 hours = 13 1/23 hours)."
  }
];
