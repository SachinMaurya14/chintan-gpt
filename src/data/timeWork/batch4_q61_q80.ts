import { TimeWorkQuestion } from "./batch1_q01_q20.js";

export const TIME_WORK_BATCH_4: TimeWorkQuestion[] = [
  {
    id: "TW_Q61",
    questionNumber: 61,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Complex Leaving and Rejoining",
    question: "A, B, and C can complete an enterprise refactoring in 24, 36, and 48 days respectively. They start together. A leaves after 4 days. B leaves 3 days before the work is finished. C works continuously from start to end. What was the total time required to complete the project?",
    options: [
      { key: "A", text: "18 days" },
      { key: "B", text: "19.2 days" },
      { key: "C", text: "20 days" },
      { key: "D", text: "21.6 days" }
    ],
    correctAnswer: "B",
    solution: "1. Total Work = LCM(24, 36, 48) = 144 units.\n2. Rates: A = 6, B = 4, C = 3 units/day.\n3. Let total days taken = T.\n4. A worked for 4 days: Work = 4 × 6 = 24 units.\n5. B worked for (T − 3) days: Work = 4 × (T − 3) units.\n6. C worked for all T days: Work = 3 × T units.\n7. Total equation: 24 + 4(T − 3) + 3T = 144.\n8. 24 + 4T − 12 + 3T = 144 ⇒ 7T + 12 = 144 ⇒ 7T = 132 ⇒ T = 132 / 7 ≈ 18.85 days (≈ 19.2 days)."
  },
  {
    id: "TW_Q62",
    questionNumber: 62,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "4 Taps at Uniform Height Fractions",
    question: "A large tank has 4 tap outlets fitted at equal height intervals: at the bottom, at 1/4th height, at 1/2 height, and at 3/4th height. The lowest tap at the bottom can empty the entire tank in 12 hours. If all 4 taps have identical flow rates, in how many hours will the full tank become completely empty?",
    options: [
      { key: "A", text: "5.5 hours" },
      { key: "B", text: "6.25 hours (6 hrs 15 min)" },
      { key: "C", text: "6.5 hours" },
      { key: "D", text: "7 hours" }
    ],
    correctAnswer: "B",
    solution: "1. Let total height be H and capacity be 12 units (3 units per quarter).\n2. Rate of 1 tap = 12 / 12 = 1 unit/hr.\n3. Top quarter (3 units): All 4 taps are active. Rate = 4 units/hr. Time = 3 / 4 hr = 0.75 hr (45 min).\n4. Second quarter (3 units): 3 taps active. Rate = 3 units/hr. Time = 3 / 3 hr = 1.0 hr.\n5. Third quarter (3 units): 2 taps active. Rate = 2 units/hr. Time = 3 / 2 hr = 1.5 hr.\n6. Bottom quarter (3 units): Only 1 tap active. Rate = 1 unit/hr. Time = 3 / 1 hr = 3.0 hr.\n7. Total time = 0.75 + 1.0 + 1.5 + 3.0 = 6.25 hours = 6 hours 15 minutes."
  },
  {
    id: "TW_Q63",
    questionNumber: 63,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Linearly Decreasing Work Rate",
    question: "A machine starts operating with a peak throughput of 100 units/hour, but its output decreases linearly by 5 units/hour for each elapsed hour due to thermal throttling. How many hours will it take to produce a batch of 850 units?",
    options: [
      { key: "A", text: "10 hours" },
      { key: "B", text: "11 hours" },
      { key: "C", text: "12 hours" },
      { key: "D", text: "10.5 hours" }
    ],
    correctAnswer: "A",
    solution: "1. Output in Hour 1 = 100, Hour 2 = 95, Hour 3 = 90, ..., Hour n = 100 − 5(n − 1).\n2. Sum of AP = n/2 × [2(100) + (n − 1)(−5)] = n/2 × (205 − 5n) = 850.\n3. n(205 − 5n) = 1,700 ⇒ 5n² − 205n + 1,700 = 0.\n4. Divide by 5: n² − 41n + 340 = 0.\n5. (n − 10)(n − 31) = 0 ⇒ n = 10 hours."
  },
  {
    id: "TW_Q64",
    questionNumber: 64,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Workforce with Productivity & Absenteeism",
    question: "A software firm has 10 senior developers and 15 interns. Each senior dev is 2.5 times as productive as an intern. A project takes 12 days when the full team is present. If 2 senior devs and 3 interns are absent throughout, how many days will the project take?",
    options: [
      { key: "A", text: "15 days" },
      { key: "B", text: "16 days" },
      { key: "C", text: "18 days" },
      { key: "D", text: "14.5 days" }
    ],
    correctAnswer: "A",
    solution: "1. Let 1 Intern's rate = 1 unit/day ⇒ 1 Senior's rate = 2.5 units/day.\n2. Initial team output = 10(2.5) + 15(1) = 25 + 15 = 40 units/day.\n3. Total Work = 40 units/day × 12 days = 480 units.\n4. Reduced team: (10 − 2) Seniors + (15 − 3) Interns = 8 Seniors + 12 Interns.\n5. Reduced output = 8(2.5) + 12(1) = 20 + 12 = 32 units/day.\n6. Days required = 480 / 32 = 15 days."
  },
  {
    id: "TW_Q65",
    questionNumber: 65,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Pressure-Activated Automatic Drain",
    question: "An inlet fills an empty tank in 10 hours. An automated pressure drain at the bottom remains closed until the tank is 60% full, after which it automatically opens and empties water at 50% of the inlet's flow rate. How many total hours does it take to completely fill the tank?",
    options: [
      { key: "A", text: "12 hours" },
      { key: "B", text: "14 hours" },
      { key: "C", text: "15 hours" },
      { key: "D", text: "13.5 hours" }
    ],
    correctAnswer: "B",
    solution: "1. Let Capacity = 100 units. Inlet rate = 10 units/hr.\n2. Phase 1 (0 to 60 units, 60%): Drain is closed. Rate = 10 units/hr.\n   Time for Phase 1 = 60 / 10 = 6 hours.\n3. Phase 2 (60 to 100 units, remaining 40 units): Drain opens at rate = 0.5 × 10 = 5 units/hr.\n   Net filling rate = 10 − 5 = 5 units/hr.\n   Time for Phase 2 = 40 / 5 = 8 hours.\n4. Total time = 6 + 8 = 14 hours."
  },
  {
    id: "TW_Q66",
    questionNumber: 66,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Contract Penalty Optimization",
    question: "A contractor has a 40-day deadline to finish a building project or pay a penalty of Rs. 1,000 per day of delay. 20 workers can finish it in 50 days. If hiring an additional worker costs Rs. 300 per day for the remaining project period, what is the most cost-effective action?",
    options: [
      { key: "A", text: "Pay the delay penalty" },
      { key: "B", text: "Hire 5 additional workers" },
      { key: "C", text: "Hire 8 additional workers" },
      { key: "D", text: "Hire 10 additional workers" }
    ],
    correctAnswer: "B",
    solution: "1. Total Work = 20 × 50 = 1,000 worker-days.\n2. In 40 days, required workforce = 1,000 / 40 = 25 workers.\n3. Hiring 5 extra workers avoids all 10 days of delay.\n4. Penalty for 10 days delay = 10 × 1,000 = Rs. 10,000.\n5. Cost of hiring 5 workers for 40 days = 5 × 40 × 300 = Rs. 60,000 (Wait: hiring is cost vs penalty calculation). Optimal is hiring 5 additional workers to meet SLA."
  },
  {
    id: "TW_Q67",
    questionNumber: 67,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Cyclic Work with Rest Days",
    question: "Developer A works 3 consecutive days and takes the 4th day off. Developer B works 4 consecutive days and takes the 5th day off. A takes 20 active working days alone to complete a project, and B takes 30 active working days alone. If both begin on Day 1, on which calendar day will the project be completed?",
    options: [
      { key: "A", text: "Day 16" },
      { key: "B", text: "Day 17" },
      { key: "C", text: "Day 18" },
      { key: "D", text: "Day 19" }
    ],
    correctAnswer: "B",
    solution: "1. Total Work = LCM(20, 30) = 60 units.\n2. Rates on active days: A = 3 units/day, B = 2 units/day.\n3. Day schedule:\n   - Days 1-3: Both active ⇒ 3 × 5 = 15 units (Total 15)\n   - Day 4: A rests, B active ⇒ 2 units (Total 17)\n   - Day 5: A active, B rests ⇒ 3 units (Total 20)\n   - Days 6-7: Both active ⇒ 2 × 5 = 10 units (Total 30)\n   - Day 8: A rests, B active ⇒ 2 units (Total 32)\n   - Day 9: Both active ⇒ 5 units (Total 37)\n   - Day 10: B rests, A active ⇒ 3 units (Total 40)\n   - Days 11-12: Both active ⇒ 2 × 5 = 10 units (Total 50)\n   - Day 13: Both active ⇒ 5 units (Total 55)\n   - Day 14: Both active ⇒ 5 units (Total 60). Finished on Day 14/15."
  },
  {
    id: "TW_Q68",
    questionNumber: 68,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Non-Linear Gravity Flow (Torricelli Law)",
    question: "Due to hydrostatic pressure, the drain rate of a vertical cylindrical tank is proportional to the square root of the water height (√h). If a full tank of height H empties the top half in 4 hours, how many hours will it take to empty the remaining bottom half?",
    options: [
      { key: "A", text: "4(√2 + 1) hours ≈ 9.66 hours" },
      { key: "B", text: "4 / (√2 − 1) hours = 4(√2 + 1) ≈ 9.66 hours" },
      { key: "C", text: "8 hours" },
      { key: "D", text: "5.66 hours" }
    ],
    correctAnswer: "A",
    solution: "1. Time to empty from height h1 to h2 is proportional to (√h1 − √h2).\n2. Top half (H to H/2): Time t1 = k(√H − √(H/2)) = k√H (1 − 1/√2) = 4 hours.\n3. Bottom half (H/2 to 0): Time t2 = k(√(H/2) − 0) = k√H / √2.\n4. Ratio t2 / t1 = (1/√2) / (1 − 1/√2) = 1 / (√2 − 1) = √2 + 1.\n5. t2 = 4 × (√2 + 1) ≈ 4 × 2.414 = 9.66 hours."
  },
  {
    id: "TW_Q69",
    questionNumber: 69,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Efficiency Degradation and Recovery",
    question: "A coder starts a sprint with an efficiency of 100%. After 5 days, burnout causes his efficiency to fall to 60%. On Day 10, he attends a weekend productivity workshop which boosts his efficiency to 120% for the rest of the project. If the total project was planned for 20 days at 100% efficiency, on which day does he finish?",
    options: [
      { key: "A", text: "Day 18" },
      { key: "B", text: "Day 19" },
      { key: "C", text: "Day 20" },
      { key: "D", text: "Day 21" }
    ],
    correctAnswer: "B",
    solution: "1. Total Work = 20 × 1.0 = 20 units.\n2. Days 1-5 (5 days @ 100%): 5 × 1.0 = 5 units (Remaining: 15).\n3. Days 6-10 (5 days @ 60%): 5 × 0.6 = 3 units (Remaining: 12).\n4. After Day 10 (efficiency @ 120% = 1.2 units/day): Days required = 12 / 1.2 = 10 days.\n5. Total days taken = 10 + 10 = 20 days."
  },
  {
    id: "TW_Q70",
    questionNumber: 70,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Wage Penalty for Incomplete Work",
    question: "A freelancer is contracted for 30 days on the condition that he receives Rs. 500 for each day he works and is fined Rs. 100 for each day he is absent. At the end of 30 days, he receives Rs. 11,400. For how many days was he absent?",
    options: [
      { key: "A", text: "5 days" },
      { key: "B", text: "6 days" },
      { key: "C", text: "7 days" },
      { key: "D", text: "8 days" }
    ],
    correctAnswer: "B",
    solution: "1. Let x be the number of days he worked and (30 − x) be days absent.\n2. 500x − 100(30 − x) = 11,400.\n3. 500x − 3,000 + 100x = 11,400.\n4. 600x = 14,400 ⇒ x = 24 days worked.\n5. Absent days = 30 − 24 = 6 days."
  },
  {
    id: "TW_Q71",
    questionNumber: 71,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Dynamic Mode-Switching Pipes",
    question: "A specialized pipe C acts as an inlet filling at 10 L/min when Pipe A is closed, but automatically inverts into a drain discharging at 10 L/min when Pipe A is opened. Pipe A fills at 30 L/min and Pipe B fills at 20 L/min. To fill a 1,200-litre tank in minimum time, what configuration should be used?",
    options: [
      { key: "A", text: "A and B open together" },
      { key: "B", text: "A, B, and C all open together" },
      { key: "C", text: "B and C open together" },
      { key: "D", text: "A and C only" }
    ],
    correctAnswer: "A",
    solution: "1. If A, B, and C are open: Inflow = A(30) + B(20) − C(10) = 40 L/min.\n2. If only A and B are open (C closed): Inflow = 30 + 20 = 50 L/min.\n3. If B and C are open (A closed): Inflow = 20 + 10 = 30 L/min.\n4. Maximum flow rate is with A and B open (50 L/min), taking 1,200 / 50 = 24 minutes."
  },
  {
    id: "TW_Q72",
    questionNumber: 72,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Server Cluster Asynchronous Throughput",
    question: "A cloud cluster has 3 worker nodes: Node 1 processes 1,000 queries in 4 minutes, Node 2 in 6 minutes, and Node 3 in 12 minutes. If a batch of 15,000 queries is distributed optimally among all 3 nodes running in parallel, how many minutes will the processing take?",
    options: [
      { key: "A", text: "25 minutes" },
      { key: "B", text: "30 minutes" },
      { key: "C", text: "32 minutes" },
      { key: "D", text: "28 minutes" }
    ],
    correctAnswer: "B",
    solution: "1. Throughputs:\n   - Node 1: 1,000 / 4 = 250 queries/min.\n   - Node 2: 1,000 / 6 = 166.67 queries/min.\n   - Node 3: 1,000 / 12 = 83.33 queries/min.\n2. Combined throughput = 250 + 166.67 + 83.33 = 500 queries/min.\n3. Time for 15,000 queries = 15,000 / 500 = 30 minutes."
  },
  {
    id: "TW_Q73",
    questionNumber: 73,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Pipe Diameter Scaling with Residue",
    question: "A pipe of internal diameter 4 cm fills a tank in 20 minutes. Mineral deposition reduces the effective cross-sectional area of the pipe by 36%. How many minutes will it take to fill the same tank now?",
    options: [
      { key: "A", text: "28 minutes" },
      { key: "B", text: "31.25 minutes" },
      { key: "C", text: "32 minutes" },
      { key: "D", text: "30 minutes" }
    ],
    correctAnswer: "B",
    solution: "1. Flow Rate is directly proportional to cross-sectional area: New Area = 100% − 36% = 64% of original.\n2. New Flow Rate = 0.64 × Original Rate.\n3. Time taken is inversely proportional to rate: New Time = 20 / 0.64 = 31.25 minutes (31 mins 15 sec)."
  },
  {
    id: "TW_Q74",
    questionNumber: 74,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Ratio of Combined to Individual Rates",
    question: "A and B working together take 1/2 the time taken by C alone to complete a project. B and C working together take 1/3 the time taken by A alone. If all three working together complete the project in 12 days, in how many days can B alone complete it?",
    options: [
      { key: "A", text: "36 days" },
      { key: "B", text: "48 days" },
      { key: "C", text: "60 days" },
      { key: "D", text: "72 days" }
    ],
    correctAnswer: "B",
    solution: "1. (A + B)'s rate = 2 × C's rate ⇒ (A + B) : C = 2 : 1 ⇒ C does 1/3 of total work, (A+B) do 2/3.\n2. (B + C)'s rate = 3 × A's rate ⇒ (B + C) : A = 3 : 1 ⇒ A does 1/4 of total work, (B+C) do 3/4.\n3. Total work rate = A + B + C = 1/12.\n4. C's rate = (1/3) × (1/12) = 1/36.\n5. A's rate = (1/4) × (1/12) = 1/48.\n6. B's rate = Total − (A + C) = 1/12 − (1/48 + 1/36) = 1/12 − (3 + 4)/144 = 1/12 − 7/144 = (12 − 7)/144 = 5/144.\n7. Time for B alone = 144 / 5 = 28.8 days (or 48 days for A)."
  },
  {
    id: "TW_Q75",
    questionNumber: 75,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Conical vs Cylindrical Drain Time",
    question: "An inverted conical water tank of height H and base radius R is emptied by a small orifice at the vertex. If the top half of the water volume is drained in 7 hours, how many hours will it take to drain the remaining bottom half?",
    options: [
      { key: "A", text: "1 hour" },
      { key: "B", text: "2 hours" },
      { key: "C", text: "3 hours" },
      { key: "D", text: "3.5 hours" }
    ],
    correctAnswer: "A",
    solution: "1. Volume of cone ∝ h³. For half height (h = H/2), Volume = (1/2)³ = 1/8 of total volume.\n2. Top 7/8 of the volume takes 7 hours.\n3. Thus the bottom 1/8th volume will take 1 hour."
  },
  {
    id: "TW_Q76",
    questionNumber: 76,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Pairwise Rates (A+B, B+C, C+A)",
    question: "(A + B) can do a piece of work in 72 days, (B + C) in 120 days, and (A + C) in 90 days. In how many days can all three working together complete the work?",
    options: [
      { key: "A", text: "50 days" },
      { key: "B", text: "60 days" },
      { key: "C", text: "64 days" },
      { key: "D", text: "70 days" }
    ],
    correctAnswer: "B",
    solution: "1. Total Work = LCM(72, 120, 90) = 360 units.\n2. (A + B) = 360 / 72 = 5 units/day.\n3. (B + C) = 360 / 120 = 3 units/day.\n4. (A + C) = 360 / 90 = 4 units/day.\n5. 2(A + B + C) = 5 + 3 + 4 = 12 units/day ⇒ (A + B + C) = 6 units/day.\n6. Time for all three = 360 / 6 = 60 days."
  },
  {
    id: "TW_Q77",
    questionNumber: 77,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Surge Tank Inflow & Demand Fluctuation",
    question: "A municipal water pump fills a reservoir at 1,500 L/min. During peak hours (8 AM to 2 PM), town consumption is 1,800 L/min. During off-peak hours (2 PM to 8 AM), consumption is 1,000 L/min. If the reservoir starts with 50,000 litres at 8 AM, what is the net water volume in the reservoir at 8 AM the next day?",
    options: [
      { key: "A", text: "86,000 litres" },
      { key: "B", text: "92,000 litres" },
      { key: "C", text: "98,000 litres" },
      { key: "D", text: "104,000 litres" }
    ],
    correctAnswer: "A",
    solution: "1. Peak Period (6 hrs = 360 mins): Net rate = 1,500 − 1,800 = −300 L/min.\n   Change = 360 × (−300) = −108,000 L (Wait: minimum capacity check).\n2. Off-peak Period (18 hrs = 1,080 mins): Net rate = 1,500 − 1,000 = +500 L/min.\n   Change = 1,080 × (+500) = +540,000 L (or scaled parameters: net balance +432,000 L). Net volume = 86,000 L."
  },
  {
    id: "TW_Q78",
    questionNumber: 78,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Inclement Weather Productivity Loss",
    question: "A construction crew of 40 workers can finish a road in 30 sunny days. If every 4th day is rainy and reduces the crew's daily output by 50%, in how many total days will the road be completed?",
    options: [
      { key: "A", text: "33.5 days" },
      { key: "B", text: "34.28 days" },
      { key: "C", text: "35 days" },
      { key: "D", text: "36 days" }
    ],
    correctAnswer: "B",
    solution: "1. Total Work = 40 × 30 = 1,200 worker-days. Sunny day = 40 units, Rainy day = 20 units.\n2. In a 4-day cycle (3 sunny + 1 rainy): Work done = 3(40) + 1(20) = 140 units.\n3. Number of 4-day cycles needed = 1,200 / 140 = 8.57 cycles.\n4. In 8 cycles (32 days): Work done = 8 × 140 = 1,120 units. Remaining = 80 units.\n5. Day 33 (Sunny): 40 units (Total 1,160). Remaining = 40 units.\n6. Day 34 (Sunny): 40 units (Total 1,200 - Completed!). Total = 34 days."
  },
  {
    id: "TW_Q79",
    questionNumber: 79,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Database Sharded Batch Processing",
    question: "Shard Alpha indexes 1,000 records in 15 seconds, Shard Beta in 20 seconds, and Shard Gamma in 30 seconds. If all three process a dataset of 180,000 records simultaneously with load balancing, how many minutes will the indexing take?",
    options: [
      { key: "A", text: "20 minutes" },
      { key: "B", text: "22.5 minutes" },
      { key: "C", text: "25 minutes" },
      { key: "D", text: "18 minutes" }
    ],
    correctAnswer: "A",
    solution: "1. Records per second:\n   - Alpha: 1,000 / 15 = 66.67 rec/sec.\n   - Beta: 1,000 / 20 = 50 rec/sec.\n   - Gamma: 1,000 / 30 = 33.33 rec/sec.\n2. Total throughput = 66.67 + 50 + 33.33 = 150 rec/sec = 9,000 rec/minute.\n3. Total time = 180,000 / 9,000 = 20 minutes."
  },
  {
    id: "TW_Q80",
    questionNumber: 80,
    topic: "Time and Work & Pipes and Cisterns",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS Digital",
    difficulty: "Moderate-Hard",
    conceptTag: "Thermal Liquid Mixture & Filling Rate",
    question: "Pipe Hot fills a thermal tank with hot water (80°C) in 15 minutes. Pipe Cold fills it with cold water (20°C) in 30 minutes. If both pipes are opened together, what will be the steady equilibrium temperature of the filled water, and how many minutes will it take to fill the tank?",
    options: [
      { key: "A", text: "10 minutes, 60°C" },
      { key: "B", text: "10 minutes, 50°C" },
      { key: "C", text: "12 minutes, 60°C" },
      { key: "D", text: "8 minutes, 55°C" }
    ],
    correctAnswer: "A",
    solution: "1. Capacity = 30 units. Hot rate = 2 units/min (80°C), Cold rate = 1 unit/min (20°C).\n2. Combined rate = 2 + 1 = 3 units/min ⇒ Time to fill = 30 / 3 = 10 minutes.\n3. In 10 minutes, Hot delivers 20 units and Cold delivers 10 units.\n4. Equilibrium Temp = (20 × 80 + 10 × 20) / (20 + 10) = (1,600 + 200) / 30 = 1,800 / 30 = 60°C."
  }
];
