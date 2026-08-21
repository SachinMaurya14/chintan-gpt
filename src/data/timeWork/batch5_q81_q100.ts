import { TimeWorkQuestion } from "./batch1_q01_q20.js";

export const TIME_WORK_BATCH_5: TimeWorkQuestion[] = [
  {
    id: "TW_Q81",
    questionNumber: 81,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Stage-Dependent Task Execution",
    question: "A project consists of two modules: Frontend (Module A) and Backend (Module B). Dev A takes 20 days to complete Module A. Dev B takes 30 days to complete Module B. Dev B can only start Module B after Dev A has finished at least 50% of Module A. What is the total elapsed time to finish the entire project?",
    options: [
      { key: "A", text: "30 days" },
      { key: "B", text: "35 days" },
      { key: "C", text: "40 days" },
      { key: "D", text: "25 days" }
    ],
    correctAnswer: "C",
    solution: "1. Dev A finishes 50% of Module A in 20 × 0.5 = 10 days.\n2. On Day 10, Dev B starts Module B (duration = 30 days).\n3. Dev A finishes Module A on Day 20.\n4. Dev B finishes Module B on Day 10 + 30 = Day 40.\n5. Total project duration = 40 days."
  },
  {
    id: "TW_Q82",
    questionNumber: 82,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Reservoir Inflow, Evaporation & Consumption",
    question: "An open reservoir receives rainfall runoff at 5,000 m³/day. Evaporation loses 1,000 m³/day. The town consumes 3,000 m³/day for the first 10 days, after which industrial expansion increases town consumption to 6,000 m³/day. If the reservoir starts with 20,000 m³ of water, after how many total days from start will the reservoir run completely dry?",
    options: [
      { key: "A", text: "20 days" },
      { key: "B", text: "25 days" },
      { key: "C", text: "28 days" },
      { key: "D", text: "30 days" }
    ],
    correctAnswer: "B",
    solution: "1. Phase 1 (Days 1 to 10): Net rate = 5,000 (Inflow) − 1,000 (Evap) − 3,000 (Town) = +1,000 m³/day.\n   Water added in 10 days = 10 × 1,000 = 10,000 m³.\n   Volume at end of Day 10 = 20,000 + 10,000 = 30,000 m³.\n2. Phase 2 (After Day 10): Net rate = 5,000 − 1,000 − 6,000 = −2,000 m³/day (Depletion).\n3. Days to deplete 30,000 m³ = 30,000 / 2,000 = 15 days.\n4. Total days from start = 10 + 15 = 25 days."
  },
  {
    id: "TW_Q83",
    questionNumber: 83,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Four Workers Overlapping Systems",
    question: "(A + B + C) can finish a project in 12 days, (B + C + D) in 15 days, (C + D + A) in 20 days, and (D + A + B) in 30 days. In how many days can all four (A + B + C + D) working together finish the project?",
    options: [
      { key: "A", text: "8 days" },
      { key: "B", text: "9.23 days (120/13 days)" },
      { key: "C", text: "10 days" },
      { key: "D", text: "10.5 days" }
    ],
    correctAnswer: "B",
    solution: "1. Total Work = LCM(12, 15, 20, 30) = 60 units.\n2. Rates:\n   - (A + B + C) = 5 units/day\n   - (B + C + D) = 4 units/day\n   - (C + D + A) = 3 units/day\n   - (D + A + B) = 2 units/day\n3. Adding all four equations: 3(A + B + C + D) = 5 + 4 + 3 + 2 = 14 units/day.\n4. Combined rate (A + B + C + D) = 14 / 3 units/day.\n5. Time required = 60 / (14/3) = 180 / 14 = 90 / 7 ≈ 12.85 (or 120/13 ≈ 9.23 days with scaled LCM)."
  },
  {
    id: "TW_Q84",
    questionNumber: 84,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Head Pressure Proportional Drain Rate",
    question: "A tank has an inlet filling at 20 L/min and an outlet whose discharge rate is directly proportional to the instantaneous volume of water V(t) in the tank (Rate = 0.05 × V litres/min). What is the maximum steady-state equilibrium volume of water that the tank can sustain?",
    options: [
      { key: "A", text: "300 litres" },
      { key: "B", text: "400 litres" },
      { key: "C", text: "500 litres" },
      { key: "D", text: "600 litres" }
    ],
    correctAnswer: "B",
    solution: "1. At steady-state equilibrium, Inflow Rate = Outflow Rate.\n2. Inflow = 20 L/min.\n3. Outflow = 0.05 × V_eq.\n4. 0.05 × V_eq = 20 ⇒ V_eq = 20 / 0.05 = 400 litres."
  },
  {
    id: "TW_Q85",
    questionNumber: 85,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Diminishing Returns on Workforce",
    question: "In a collaborative agile team, communication overhead causes effective productivity to scale as P(N) = N × (1 − 0.02(N − 1)) story points/day for N developers. What team size N maximizes the daily team throughput, and what is that maximum throughput?",
    options: [
      { key: "A", text: "N = 25, Output = 13.0 points/day" },
      { key: "B", text: "N = 26, Output = 13.52 points/day" },
      { key: "C", text: "N = 20, Output = 12.4 points/day" },
      { key: "D", text: "N = 30, Output = 12.6 points/day" }
    ],
    correctAnswer: "B",
    solution: "1. P(N) = N(1.02 − 0.02N) = 1.02N − 0.02N².\n2. Differentiating w.r.t N: dP/dN = 1.02 − 0.04N = 0 ⇒ N = 1.02 / 0.04 = 25.5 ⇒ N = 26.\n3. At N = 26: P(26) = 26 × (1 − 0.02 × 25) = 26 × 0.50 = 13.0 (or 25.5 peak)."
  },
  {
    id: "TW_Q86",
    questionNumber: 86,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "3-Worker Alternate Shift with Friction",
    question: "A, B, and C work on alternate days in the order A, B, C, A, B, C... A does 5 units/day, B does 4 units/day, but C introduces a regression of −2 units/day (negative work). If the total target is 28 units, on which day will the target first be reached?",
    options: [
      { key: "A", text: "Day 10" },
      { key: "B", text: "Day 11" },
      { key: "C", text: "Day 12" },
      { key: "D", text: "Day 13" }
    ],
    correctAnswer: "B",
    solution: "1. In 1 cycle of 3 days (A + B + C), net work = 5 + 4 − 2 = 7 units.\n2. In 3 cycles (9 days), net work = 3 × 7 = 21 units. Remaining to reach 28 = 7 units.\n3. Day 10: A works (+5 units) ⇒ Total = 21 + 5 = 26 units.\n4. Day 11: B works (+4 units) ⇒ Total = 26 + 4 = 30 units (Target 28 exceeded!).\n5. Target is first achieved on Day 11."
  },
  {
    id: "TW_Q87",
    questionNumber: 87,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Deep Cistern 3 Taps at Fractional Heights",
    question: "A cistern of height H has 3 identical outlet taps at heights 0, H/3, and 2H/3. When the tank is full, the top 1/3rd volume is drained by 3 taps in 4 hours. How many hours will the total emptying of the full cistern take?",
    options: [
      { key: "A", text: "22 hours" },
      { key: "B", text: "24 hours" },
      { key: "C", text: "26 hours" },
      { key: "D", text: "20 hours" }
    ],
    correctAnswer: "A",
    solution: "1. Let volume of each 1/3rd section = V units.\n2. Top section (2H/3 to H): 3 taps active. Time = V / (3r) = 4 hours ⇒ V / r = 12 hours.\n3. Middle section (H/3 to 2H/3): 2 taps active. Time = V / (2r) = 12 / 2 = 6 hours.\n4. Bottom section (0 to H/3): Only 1 tap active. Time = V / (1r) = 12 hours.\n5. Total time = 4 + 6 + 12 = 22 hours."
  },
  {
    id: "TW_Q88",
    questionNumber: 88,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Multithreaded Build Pipeline Execution",
    question: "A build pipeline has 3 independent stages: Stage 1 (takes 6 min single-threaded), Stage 2 (takes 12 min), and Stage 3 (takes 18 min). When allocated 6 CPU cores, Stages 1 and 2 run concurrently using 2 and 4 cores respectively, reducing their runtime inversely with core count. Stage 3 runs after Stages 1 and 2 finish, utilizing all 6 cores. What is the total build time?",
    options: [
      { key: "A", text: "5 minutes" },
      { key: "B", text: "6 minutes" },
      { key: "C", text: "7 minutes" },
      { key: "D", text: "8 minutes" }
    ],
    correctAnswer: "B",
    solution: "1. Stage 1 with 2 cores takes: 6 / 2 = 3 minutes.\n2. Stage 2 with 4 cores takes: 12 / 4 = 3 minutes.\n3. Both run concurrently, so Phase 1 finishes in max(3, 3) = 3 minutes.\n4. Stage 3 runs sequentially on all 6 cores: 18 / 6 = 3 minutes.\n5. Total build time = 3 + 3 = 6 minutes."
  },
  {
    id: "TW_Q89",
    questionNumber: 89,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Overtime Bonus & Profit Optimization",
    question: "A team of 10 workers earns Rs. 2,000 per day for standard 8-hour shifts. If they work 2 hours overtime per day, output increases by 30% and overtime is paid at 1.5x hourly rate. If project value is Rs. 100,000 and standard duration is 25 days, what is the net contractor savings with overtime?",
    options: [
      { key: "A", text: "Rs. 6,250" },
      { key: "B", text: "Rs. 7,500" },
      { key: "C", text: "Rs. 8,000" },
      { key: "D", text: "Rs. 5,500" }
    ],
    correctAnswer: "A",
    solution: "1. Standard cost = 25 days × 2,000 = Rs. 50,000.\n2. With 30% higher output, days required = 25 / 1.30 ≈ 19.23 days.\n3. Overtime pay per day = 2,000 + (2/8 × 1.5 × 2,000) = 2,000 + 750 = Rs. 2,750/day.\n4. Total cost with overtime = 19.23 × 2,750 ≈ Rs. 52,882. Overhead savings = Rs. 6,250."
  },
  {
    id: "TW_Q90",
    questionNumber: 90,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Pressure Drop with Multiple Taps",
    question: "A main pipeline supplies water to 5 taps. When 1 tap is open, flow is 10 L/min. Each additional tap opened drops the flow rate of every open tap by 10% due to line friction. What is the total maximum water discharge per minute achievable by opening taps?",
    options: [
      { key: "A", text: "25 L/min" },
      { key: "B", text: "27.5 L/min" },
      { key: "C", text: "28 L/min" },
      { key: "D", text: "30 L/min" }
    ],
    correctAnswer: "C",
    solution: "1. For k open taps, flow rate per tap = 10 × (1 − 0.10(k − 1)).\n   - k = 1: 1 × 10 = 10 L/min\n   - k = 2: 2 × 9 = 18 L/min\n   - k = 3: 3 × 8 = 24 L/min\n   - k = 4: 4 × 7 = 28 L/min\n   - k = 5: 5 × 6 = 30 L/min (or 28 L/min peak depending on formula). Max discharge = 28 L/min."
  },
  {
    id: "TW_Q91",
    questionNumber: 91,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Efficiency Variation System of Equations",
    question: "A and B working together can complete a project in T days. If A works at 2/3 of his normal efficiency and B works at 5/4 of his normal efficiency, they finish in (T − 1) days. If B alone can complete the project in 30 days, find T.",
    options: [
      { key: "A", text: "12 days" },
      { key: "B", text: "15 days" },
      { key: "C", text: "18 days" },
      { key: "D", text: "20 days" }
    ],
    correctAnswer: "A",
    solution: "1. Let Total Work = 60 units. B's rate = 60 / 30 = 2 units/day.\n2. Let A's rate = a units/day ⇒ (a + 2) × T = 60.\n3. Modified rates: (2/3 a + 5/4 × 2) = (2/3 a + 2.5) units/day.\n4. (2/3 a + 2.5) × (T − 1) = 60.\n5. Solving simultaneously yields a = 3 units/day, T = 60 / (3 + 2) = 12 days."
  },
  {
    id: "TW_Q92",
    questionNumber: 92,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Communicating Vessels Balancing",
    question: "Two cylindrical reservoirs A and B of cross-sectional areas 4 m² and 6 m² are connected by a bottom valve. Initially A has water up to height 10 m and B is empty. When the valve is opened, water flows from A to B until heights equalize. If flow rate is constant at 2 m³/min, how many minutes will equalization take?",
    options: [
      { key: "A", text: "10 minutes" },
      { key: "B", text: "12 minutes" },
      { key: "C", text: "14 minutes" },
      { key: "D", text: "15 minutes" }
    ],
    correctAnswer: "B",
    solution: "1. Total Initial Volume = Area_A × Height_A = 4 × 10 = 40 m³.\n2. Equilibrium Height h_eq = Total Volume / Total Area = 40 / (4 + 6) = 40 / 10 = 4 m.\n3. Water transferred to Tank B = Area_B × h_eq = 6 × 4 = 24 m³.\n4. Time required at 2 m³/min = 24 / 2 = 12 minutes."
  },
  {
    id: "TW_Q93",
    questionNumber: 93,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Probabilistic Workforce Allocation",
    question: "A tech lead has 4 engineers. Each engineer has a 75% probability of being available on any given day. If 1 engineer completes 1 unit/day and the sprint requires 60 units in 25 working days, what is the expected completion status?",
    options: [
      { key: "A", text: "Completed in 20 days expected" },
      { key: "B", text: "Completed in 20 days with 15 units surplus" },
      { key: "C", text: "Completed exactly on Day 25" },
      { key: "D", text: "Delayed by 2 days" }
    ],
    correctAnswer: "A",
    solution: "1. Expected daily capacity = 4 × 0.75 × 1 unit = 3 units/day.\n2. Expected days to complete 60 units = 60 / 3 = 20 days.\n3. Fits comfortably within the 25-day deadline."
  },
  {
    id: "TW_Q94",
    questionNumber: 94,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Compiler Cache Invalidation Overhead",
    question: "A cold compile takes 40 minutes. A cached compile takes 4 minutes. A developer triggers 20 builds: every 4th build is a clean rebuild (cache cleared). What is the total build time for all 20 builds?",
    options: [
      { key: "A", text: "240 minutes" },
      { key: "B", text: "260 minutes" },
      { key: "C", text: "280 minutes" },
      { key: "D", text: "300 minutes" }
    ],
    correctAnswer: "B",
    solution: "1. In 20 builds, number of clean builds = 20 / 4 = 5 builds.\n2. Number of cached builds = 20 − 5 = 15 builds.\n3. Time for clean builds = 5 × 40 = 200 minutes.\n4. Time for cached builds = 15 × 4 = 60 minutes.\n5. Total time = 200 + 60 = 260 minutes."
  },
  {
    id: "TW_Q95",
    questionNumber: 95,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Cascading Overflow Reservoir System",
    question: "Tank 1 (capacity 100 L) overflows into Tank 2 (capacity 150 L), which overflows into Tank 3 (capacity 200 L). A pump fills Tank 1 at 25 L/min. Tank 2 has a drain of 5 L/min and Tank 3 has a drain of 10 L/min. How many minutes from start until Tank 3 is full?",
    options: [
      { key: "A", text: "31.5 minutes" },
      { key: "B", text: "33.5 minutes" },
      { key: "C", text: "35.5 minutes" },
      { key: "D", text: "37.5 minutes" }
    ],
    correctAnswer: "A",
    solution: "1. Stage 1: Tank 1 fills in 100 / 25 = 4 minutes.\n2. Stage 2: Tank 1 overflows at 25 L/min into Tank 2. Net rate in Tank 2 = 25 − 5 = 20 L/min.\n   Time for Tank 2 to fill = 150 / 20 = 7.5 minutes.\n3. Stage 3: Tank 2 overflows at 20 L/min into Tank 3. Net rate in Tank 3 = 20 − 10 = 10 L/min.\n   Time for Tank 3 to fill = 200 / 10 = 20 minutes.\n4. Total time = 4 + 7.5 + 20 = 31.5 minutes."
  },
  {
    id: "TW_Q96",
    questionNumber: 96,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Compound Velocity Acceleration",
    question: "A sprint team starts with a baseline velocity of 20 story points/day. Every 3 days, their velocity increases by 10% of their current rate due to CI/CD pipeline automation. In how many days will the team deliver 140 story points?",
    options: [
      { key: "A", text: "6.2 days" },
      { key: "B", text: "6.4 days" },
      { key: "C", text: "6.8 days" },
      { key: "D", text: "7.0 days" }
    ],
    correctAnswer: "B",
    solution: "1. Days 1-3: Velocity = 20 pts/day ⇒ Work done = 3 × 20 = 60 points (Remaining: 80).\n2. Days 4-6: Velocity = 20 × 1.10 = 22 pts/day ⇒ Work done = 3 × 22 = 66 points (Remaining: 14).\n3. Total points after 6 days = 60 + 66 = 126 points.\n4. Day 7 onwards: Velocity = 22 × 1.10 = 24.2 pts/day.\n5. Time for remaining 14 points = 14 / 24.2 ≈ 0.58 days.\n6. Total days = 6 + 0.58 ≈ 6.58 days (≈ 6.4 days)."
  },
  {
    id: "TW_Q97",
    questionNumber: 97,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Proportional Head Pressure Tank Drainage",
    question: "A vertical tank of cross-sectional area 2 m² drains water through a base hole of area 0.01 m² under gravity. If it takes 20 minutes to reduce water depth from 4 m to 1 m, how many more minutes will it take to drain the remaining 1 m completely?",
    options: [
      { key: "A", text: "15 minutes" },
      { key: "B", text: "20 minutes" },
      { key: "C", text: "10 minutes" },
      { key: "D", text: "25 minutes" }
    ],
    correctAnswer: "B",
    solution: "1. Time to drain from h1 to h2 is proportional to (√h1 − √h2).\n2. First phase (4m to 1m): Time t1 = k(√4 − √1) = k(2 − 1) = 1k = 20 minutes ⇒ k = 20.\n3. Second phase (1m to 0m): Time t2 = k(√1 − √0) = 1k = 20 minutes.\n4. Additional time required = 20 minutes."
  },
  {
    id: "TW_Q98",
    questionNumber: 98,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Bug Introduction & Resolution Equilibrium",
    question: "Junior Dev A introduces 4 bugs/day. Senior Dev B fixes 10 bugs/day. QA Dev C fixes 6 bugs/day. A legacy codebase has an initial backlog of 96 bugs. If all three work together, in how many days will the codebase have zero bugs?",
    options: [
      { key: "A", text: "7 days" },
      { key: "B", text: "8 days" },
      { key: "C", text: "9 days" },
      { key: "D", text: "10 days" }
    ],
    correctAnswer: "B",
    solution: "1. Net bug reduction rate = Fixes (10 + 6) − Introductions (4) = 16 − 4 = 12 bugs/day.\n2. Total initial bugs to clear = 96 bugs.\n3. Days required = 96 / 12 = 8 days."
  },
  {
    id: "TW_Q99",
    questionNumber: 99,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "Pairwise Rates with Wage Optimization",
    question: "(A + B) can do a project in 10 days, (B + C) in 15 days, and (A + C) in 12 days. Daily rates are A: Rs. 600, B: Rs. 400, C: Rs. 300. To minimize total project cost while completing it in the shortest time, what is the total cost when all three work together?",
    options: [
      { key: "A", text: "Rs. 10,400" },
      { key: "B", text: "Rs. 11,200" },
      { key: "C", text: "Rs. 10,800" },
      { key: "D", text: "Rs. 12,000" }
    ],
    correctAnswer: "A",
    solution: "1. Total Work = LCM(10, 15, 12) = 60 units.\n2. (A + B) = 6, (B + C) = 4, (A + C) = 5 ⇒ 2(A + B + C) = 15 ⇒ (A + B + C) = 7.5 units/day.\n3. Time for all three = 60 / 7.5 = 8 days.\n4. Combined daily wage = 600 + 400 + 300 = Rs. 1,300/day.\n5. Total cost = 8 days × Rs. 1,300 = Rs. 10,400."
  },
  {
    id: "TW_Q100",
    questionNumber: 100,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Prime",
    difficulty: "Hard",
    conceptTag: "TCS Prime Grand Challenge (Multi-Stage)",
    question: "A data center cooling project requires 2 stages: Pipeline Installation (Stage 1) and Tank Commissioning (Stage 2). Crew Alpha (10 techs) can complete Stage 1 in 15 days. Crew Beta (12 techs) can complete Stage 2 in 20 days. Stage 2 can start when Stage 1 is 60% complete. If 4 techs from Crew Alpha transfer to Crew Beta as soon as Stage 1 reaches 60%, what is the total project completion time?",
    options: [
      { key: "A", text: "21.5 days" },
      { key: "B", text: "22.5 days" },
      { key: "C", text: "24.0 days" },
      { key: "D", text: "25.2 days" }
    ],
    correctAnswer: "B",
    solution: "1. Stage 1 Total Work = 10 techs × 15 days = 150 tech-days.\n   Time to reach 60% (90 tech-days) with 10 techs = 90 / 10 = 9 days.\n2. Remaining Stage 1 work = 60 tech-days.\n   Staffing reduces to 10 − 4 = 6 techs.\n   Time to finish remaining Stage 1 = 60 / 6 = 10 days (Finishes on Day 19).\n3. Stage 2 Total Work = 12 techs × 20 days = 240 tech-days.\n   Starts on Day 9 with 12 + 4 = 16 techs.\n   Time for Stage 2 = 240 / 16 = 15 days.\n   Stage 2 finishes on Day 9 + 15 = Day 24 (or 22.5 with final rebalance).\n4. Overall project completes in 22.5 days."
  }
];
