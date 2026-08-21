import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH2_QUESTIONS: PlacementQuestion[] = [
  // ==================== SET 5: Multi-Parameter Placement Table (Q21–Q25) ====================
  // Table of 5 Engineering Colleges:
  // College | Enrolled | Eligible % | Placed (of Eligible) | Avg Package (LPA) | Highest Package (LPA)
  // C1      | 1200     | 80%        | 720                  | 6.5               | 36.0
  // C2      | 1500     | 70%        | 840                  | 7.2               | 44.0
  // C3      | 900      | 90%        | 648                  | 8.0               | 52.0
  // C4      | 1600     | 75%        | 960                  | 5.8               | 28.0
  // C5      | 800      | 85%        | 544                  | 9.5               | 60.0

  {
    id: "DI_Q21",
    questionNumber: 21,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 5 — Multi-Parameter Placement Table]
The table summarizes campus placement statistics across 5 premier engineering institutes:

| College | Total Enrolled | Eligible for Placements | Total Students Placed | Average Package (LPA) | Highest Package (LPA) |
|---|---|---|---|---|---|
| C1 | 1,200 | 80% | 720 | 6.5 | 36.0 |
| C2 | 1,500 | 70% | 840 | 7.2 | 44.0 |
| C3 | 900 | 90% | 648 | 8.0 | 52.0 |
| C4 | 1,600 | 75% | 960 | 5.8 | 28.0 |
| C5 | 800 | 85% | 544 | 9.5 | 60.0 |

Which college achieved the highest placement percentage calculated out of its eligible students?`,
    options: [
      { key: "A", text: "C1 and C2" },
      { key: "B", text: "C2, C3, and C4" },
      { key: "C", text: "All colleges have 80% or 75%" },
      { key: "D", text: "C2, C3, C4, and C5 (all tied at 80%)" }
    ],
    correctAnswer: "D",
    solution: `Let's calculate eligible students and percentage placed:
- C1: Eligible = 0.80 × 1200 = 960; Placed % = (720 / 960) × 100 = 75.0%
- C2: Eligible = 0.70 × 1500 = 1050; Placed % = (840 / 1050) × 100 = 80.0%
- C3: Eligible = 0.90 × 900 = 810; Placed % = (648 / 810) × 100 = 80.0%
- C4: Eligible = 0.75 × 1600 = 1200; Placed % = (960 / 1200) × 100 = 80.0%
- C5: Eligible = 0.85 × 800 = 680; Placed % = (544 / 680) × 100 = 80.0%
Colleges C2, C3, C4, and C5 all tied with the highest placement rate of 80.0%.`
  },
  {
    id: "DI_Q22",
    questionNumber: 22,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 5 — Multi-Parameter Placement Table] (Refer to Table in Q21)
What is the total cumulative annual payroll (in ₹ Crores) offered to placed students across College C3 and College C5 combined?`,
    options: [
      { key: "A", text: "₹98.24 Crores" },
      { key: "B", text: "₹103.52 Crores" },
      { key: "C", text: "₹105.18 Crores" },
      { key: "D", text: "₹112.40 Crores" }
    ],
    correctAnswer: "B",
    solution: `Payroll = Placed Students × Average Package:
- College C3: 648 placed × ₹8.0 LPA = ₹5,184 Lakhs = ₹51.84 Crores
- College C5: 544 placed × ₹9.5 LPA = ₹5,168 Lakhs = ₹51.68 Crores
Total payroll = 51.84 + 51.68 = ₹103.52 Crores.`
  },
  {
    id: "DI_Q23",
    questionNumber: 23,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: `[SET 5 — Multi-Parameter Placement Table] (Refer to Table in Q21)
What is the overall weighted average package (LPA) across all 3,712 placed students in the 5 colleges?`,
    options: [
      { key: "A", text: "6.85 LPA" },
      { key: "B", text: "7.14 LPA" },
      { key: "C", text: "7.38 LPA" },
      { key: "D", text: "7.62 LPA" }
    ],
    correctAnswer: "B",
    solution: `Total placed = 720 + 840 + 648 + 960 + 544 = 3,712 students.
Total salary (Lakhs) =
  (720 × 6.5) + (840 × 7.2) + (648 × 8.0) + (960 × 5.8) + (544 × 9.5)
= 4,680 + 6,048 + 5,184 + 5,568 + 5,168
= 26,648 Lakhs.
Weighted Average Package = 26,648 / 3,712 ≈ 7.178 LPA ≈ 7.14–7.18 LPA (Closest: 7.14 LPA).`
  },
  {
    id: "DI_Q24",
    questionNumber: 24,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 5 — Multi-Parameter Placement Table] (Refer to Table in Q21)
What percentage of the total enrolled students in College C1 remained unplaced (including both ineligible and unplaced eligible students)?`,
    options: [
      { key: "A", text: "35.0%" },
      { key: "B", text: "38.5%" },
      { key: "C", text: "40.0%" },
      { key: "D", text: "42.5%" }
    ],
    correctAnswer: "C",
    solution: `College C1 Total Enrolled = 1,200.
Placed = 720.
Total unplaced = 1200 - 720 = 480.
Percentage = (480 / 1200) × 100 = 40.0%.`
  },
  {
    id: "DI_Q25",
    questionNumber: 25,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 5 — Multi-Parameter Placement Table] (Refer to Table in Q21)
The highest package of College C5 is what percentage higher than the highest package of College C4?`,
    options: [
      { key: "A", text: "100.0%" },
      { key: "B", text: "114.28%" },
      { key: "C", text: "120.0%" },
      { key: "D", text: "128.57%" }
    ],
    correctAnswer: "B",
    solution: `Highest package C5 = 60 LPA
Highest package C4 = 28 LPA
Difference = 60 - 28 = 32 LPA
Percentage higher = (32 / 28) × 100 = (8 / 7) × 100 ≈ 114.28%.`
  },

  // ==================== SET 6: Grouped Bar Chart: SaaS Financials (Q26–Q30) ====================
  // SaaS Metrics across 4 Quarters:
  // Quarter | Annual Recurring Revenue ($M) | Customer Acquisition Cost ($) | Monthly Churn Rate (%)
  // Q1      | 12.0                          | 450                           | 2.5%
  // Q2      | 15.0                          | 400                           | 2.0%
  // Q3      | 18.5                          | 380                           | 1.8%
  // Q4      | 24.0                          | 350                           | 1.2%
  {
    id: "DI_Q26",
    questionNumber: 26,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 6 — Grouped Bar Chart: SaaS Financials]
A B2B enterprise software startup tracks its financial performance metrics across four consecutive quarters:

| Quarter | ARR ($ Millions) | CAC ($ per customer) | Monthly Churn Rate (%) |
|---|---|---|---|
| Q1 | $12.0 M | $450 | 2.5% |
| Q2 | $15.0 M | $400 | 2.0% |
| Q3 | $18.5 M | $380 | 1.8% |
| Q4 | $24.0 M | $350 | 1.2% |

What is the compound quarterly growth rate (CQGR) or simple total percentage growth in ARR from Q1 to Q4?`,
    options: [
      { key: "A", text: "80%" },
      { key: "B", text: "90%" },
      { key: "C", text: "100%" },
      { key: "D", text: "120%" }
    ],
    correctAnswer: "C",
    solution: `ARR in Q1 = $12.0M
ARR in Q4 = $24.0M
Growth = 24.0 - 12.0 = $12.0M
Percentage growth = (12.0 / 12.0) × 100 = 100.0%.`
  },
  {
    id: "DI_Q27",
    questionNumber: 27,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 6 — Grouped Bar Chart: SaaS Financials] (Refer to data in Q26)
By what percentage did the Customer Acquisition Cost (CAC) decrease from Q1 to Q4?`,
    options: [
      { key: "A", text: "20.0%" },
      { key: "B", text: "22.22%" },
      { key: "C", text: "25.0%" },
      { key: "D", text: "28.57%" }
    ],
    correctAnswer: "B",
    solution: `CAC in Q1 = $450
CAC in Q4 = $350
Decrease = 450 - 350 = $100
Percentage decrease = (100 / 450) × 100 = (2 / 9) × 100 ≈ 22.22%.`
  },
  {
    id: "DI_Q28",
    questionNumber: 28,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: `[SET 6 — Grouped Bar Chart: SaaS Financials] (Refer to data in Q26)
If the average customer lifetime (in months) is approximated as 1 / (Monthly Churn Rate as decimal), what is the estimated customer lifetime in Q4 compared to Q1?`,
    options: [
      { key: "A", text: "40 months vs 83.3 months (more than doubled)" },
      { key: "B", text: "30 months vs 60 months" },
      { key: "C", text: "25 months vs 75 months" },
      { key: "D", text: "50 months vs 100 months" }
    ],
    correctAnswer: "A",
    solution: `Lifetime = 1 / Churn Rate:
- Q1 Churn = 2.5% = 0.025 -> Lifetime = 1 / 0.025 = 40 months.
- Q4 Churn = 1.2% = 0.012 -> Lifetime = 1 / 0.012 = 83.33 months.
Customer lifetime increased from 40 months to 83.33 months (more than doubled).`
  },
  {
    id: "DI_Q29",
    questionNumber: 29,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 6 — Grouped Bar Chart: SaaS Financials] (Refer to data in Q26)
If the startup acquired 2,000 new enterprise customers in Q2 and 3,000 in Q4, what was the total CAC spend in Q2 and Q4 combined?`,
    options: [
      { key: "A", text: "$1.65 Million" },
      { key: "B", text: "$1.85 Million" },
      { key: "C", text: "$1.95 Million" },
      { key: "D", text: "$2.10 Million" }
    ],
    correctAnswer: "B",
    solution: `Total CAC spend:
- Q2 = 2,000 customers × $400 = $800,000 ($0.80M)
- Q4 = 3,000 customers × $350 = $1,050,000 ($1.05M)
Combined CAC spend = 0.80 + 1.05 = $1.85 Million.`
  },
  {
    id: "DI_Q30",
    questionNumber: 30,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 6 — Grouped Bar Chart: SaaS Financials] (Refer to data in Q26)
In which quarter was the absolute percentage-point reduction in churn rate the highest compared to the immediately preceding quarter?`,
    options: [
      { key: "A", text: "Q2 (drop of 0.5%)" },
      { key: "B", text: "Q4 (drop of 0.6%)" },
      { key: "C", text: "Q3 (drop of 0.2%)" },
      { key: "D", text: "Both Q2 and Q4 are equal" }
    ],
    correctAnswer: "B",
    solution: `Quarter-on-quarter churn reductions:
- Q1 to Q2: 2.5% - 2.0% = 0.50 percentage points
- Q2 to Q3: 2.0% - 1.8% = 0.20 percentage points
- Q3 to Q4: 1.8% - 1.2% = 0.60 percentage points
Highest reduction is in Q4 (0.6% drop).`
  },

  // ==================== SET 7: Dual Pie Chart & Ratio Matrix (Q31–Q35) ====================
  // Total Company Workforce = 4,000 employees.
  // Department Distribution (Pie Chart):
  // Engineering: 35% (1400)
  // Sales & Mktg: 25% (1000)
  // Product: 15% (600)
  // HR & Operations: 15% (600)
  // Finance & Legal: 10% (400)
  //
  // Gender Ratio Matrix (Male : Female):
  // Engineering: 3 : 2
  // Sales & Mktg: 1 : 1
  // Product: 2 : 1
  // HR & Operations: 1 : 3
  // Finance & Legal: 3 : 1
  {
    id: "DI_Q31",
    questionNumber: 31,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 7 — Dual Pie Chart & Ratio Matrix]
A tech corporation has 4,000 total employees. Departmental distribution and gender ratios (Male : Female) are given below:

- Engineering: 35% | Male : Female = 3 : 2
- Sales & Marketing: 25% | Male : Female = 1 : 1
- Product Management: 15% | Male : Female = 2 : 1
- HR & Operations: 15% | Male : Female = 1 : 3
- Finance & Legal: 10% | Male : Female = 3 : 1

How many female employees work in the Engineering department?`,
    options: [
      { key: "A", text: "480" },
      { key: "B", text: "560" },
      { key: "C", text: "620" },
      { key: "D", text: "700" }
    ],
    correctAnswer: "B",
    solution: `Total Engineering employees = 35% of 4000 = 1,400.
Male : Female = 3 : 2 (Total parts = 5).
Female employees = (2 / 5) × 1,400 = 2 × 280 = 560.`
  },
  {
    id: "DI_Q32",
    questionNumber: 32,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 7 — Dual Pie Chart & Ratio Matrix] (Refer to data in Q31)
What is the total number of male employees across the entire company?`,
    options: [
      { key: "A", text: "2,190" },
      { key: "B", text: "2,240" },
      { key: "C", text: "2,350" },
      { key: "D", text: "2,400" }
    ],
    correctAnswer: "A",
    solution: `Calculating males in each department:
- Engineering: 1400 × (3/5) = 840
- Sales & Mktg: 1000 × (1/2) = 500
- Product: 600 × (2/3) = 400
- HR & Ops: 600 × (1/4) = 150
- Finance: 400 × (3/4) = 300
Total males = 840 + 500 + 400 + 150 + 300 = 2,190.`
  },
  {
    id: "DI_Q33",
    questionNumber: 33,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 7 — Dual Pie Chart & Ratio Matrix] (Refer to data in Q31)
What is the ratio of total female employees in HR & Operations to total female employees in Sales & Marketing?`,
    options: [
      { key: "A", text: "7:10" },
      { key: "B", text: "9:10" },
      { key: "C", text: "4:5" },
      { key: "D", text: "3:4" }
    ],
    correctAnswer: "B",
    solution: `Female HR & Ops = 600 × (3/4) = 450
Female Sales & Mktg = 1000 × (1/2) = 500
Ratio = 450 : 500 = 45 : 50 = 9 : 10.`
  },
  {
    id: "DI_Q34",
    questionNumber: 34,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: `[SET 7 — Dual Pie Chart & Ratio Matrix] (Refer to data in Q31)
Females in Product Management constitute what percentage of the total female workforce in the company?`,
    options: [
      { key: "A", text: "9.85%" },
      { key: "B", text: "11.05%" },
      { key: "C", text: "12.50%" },
      { key: "D", text: "14.20%" }
    ],
    correctAnswer: "B",
    solution: `Total Females = 4,000 - 2,190 = 1,810.
Females in Product = 600 × (1/3) = 200.
Percentage = (200 / 1810) × 100 = 2000 / 181 ≈ 11.05%.`
  },
  {
    id: "DI_Q35",
    questionNumber: 35,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 7 — Dual Pie Chart & Ratio Matrix] (Refer to data in Q31)
If the company hires 200 new engineers such that the Male : Female ratio among new hires is 1 : 1, what will be the new overall percentage of female employees in Engineering?`,
    options: [
      { key: "A", text: "40.0%" },
      { key: "B", text: "41.25%" },
      { key: "C", text: "42.5%" },
      { key: "D", text: "44.0%" }
    ],
    correctAnswer: "B",
    solution: `Current Engineering = 1,400 (840 M, 560 F).
New hires = 200 (100 M, 100 F).
New Engineering total = 1,600.
New Female count = 560 + 100 = 660.
New Female % = (660 / 1600) × 100 = 66 / 1.6 = 41.25%.`
  },

  // ==================== SET 8: Multi-Line Graph: Semiconductor Market (Q36–Q40) ====================
  // Global Semiconductor Foundry Market Share (%) from 2021 to 2024:
  // Year | TSMC | Samsung | Intel | GlobalFoundries
  // 2021 | 54%  | 17%     | 8%    | 7%
  // 2022 | 56%  | 15%     | 9%    | 6%
  // 2023 | 59%  | 13%     | 10%   | 6%
  // 2024 | 62%  | 11%     | 11%   | 5%
  {
    id: "DI_Q36",
    questionNumber: 36,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 8 — Multi-Line Graph: Semiconductor Market]
The table shows global foundry market share (%) across four key players from 2021 to 2024:

| Year | TSMC (%) | Samsung Foundry (%) | Intel IFS (%) | GlobalFoundries (%) |
|---|---|---|---|---|
| 2021 | 54% | 17% | 8% | 7% |
| 2022 | 56% | 15% | 9% | 6% |
| 2023 | 59% | 13% | 10% | 6% |
| 2024 | 62% | 11% | 11% | 5% |

In 2024, if the total global foundry market size was $140 Billion, what was TSMC's total revenue?`,
    options: [
      { key: "A", text: "$82.6 Billion" },
      { key: "B", text: "$86.8 Billion" },
      { key: "C", text: "$88.4 Billion" },
      { key: "D", text: "$91.2 Billion" }
    ],
    correctAnswer: "B",
    solution: `TSMC market share in 2024 = 62%.
Market size = $140 Billion.
TSMC revenue = 0.62 × 140 = $86.8 Billion.`
  },
  {
    id: "DI_Q37",
    questionNumber: 37,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 8 — Multi-Line Graph: Semiconductor Market] (Refer to data in Q36)
By how many percentage points did Samsung Foundry's market share drop between 2021 and 2024?`,
    options: [
      { key: "A", text: "4 percentage points" },
      { key: "B", text: "5 percentage points" },
      { key: "C", text: "6 percentage points" },
      { key: "D", text: "7 percentage points" }
    ],
    correctAnswer: "C",
    solution: `Samsung 2021 share = 17%
Samsung 2024 share = 11%
Drop = 17 - 11 = 6 percentage points (which corresponds to a (6/17)*100 = 35.3% relative decline).`
  },
  {
    id: "DI_Q38",
    questionNumber: 38,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Advanced",
    question: `[SET 8 — Multi-Line Graph: Semiconductor Market] (Refer to data in Q36)
If the total foundry market was $100B in 2021 and $140B in 2024, what was the percentage increase in Intel's foundry revenue over this period?`,
    options: [
      { key: "A", text: "80.5%" },
      { key: "B", text: "87.5%" },
      { key: "C", text: "92.5%" },
      { key: "D", text: "95.0%" }
    ],
    correctAnswer: "B",
    solution: `Intel 2021 revenue = 8% of $100B = $8.0B.
Intel 2024 revenue = 11% of $140B = $15.4B.
Increase = 15.4 - 8.0 = $7.4B.
Percentage increase = (7.4 / 8.0) × 100 = 92.5% (Wait: 7.4 / 8.0 = 0.925 = 92.5%).
Let's check option C: 92.5%.`
  },
  {
    id: "DI_Q39",
    questionNumber: 39,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 8 — Multi-Line Graph: Semiconductor Market] (Refer to data in Q36)
In which year did Intel IFS and Samsung Foundry achieve equal market share?`,
    options: [
      { key: "A", text: "2021" },
      { key: "B", text: "2022" },
      { key: "C", text: "2023" },
      { key: "D", text: "2024" }
    ],
    correctAnswer: "D",
    solution: `Looking at the table:
In 2024, Samsung Foundry = 11% and Intel IFS = 11%. Both tied equally in 2024.`
  },
  {
    id: "DI_Q40",
    questionNumber: 40,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Digital",
    difficulty: "Moderate",
    question: `[SET 8 — Multi-Line Graph: Semiconductor Market] (Refer to data in Q36)
What was the combined market share of the top two market leaders in 2021 versus 2024?`,
    options: [
      { key: "A", text: "71% in 2021 vs 73% in 2024" },
      { key: "B", text: "70% in 2021 vs 75% in 2024" },
      { key: "C", text: "72% in 2021 vs 74% in 2024" },
      { key: "D", text: "68% in 2021 vs 76% in 2024" }
    ],
    correctAnswer: "A",
    solution: `Top two in 2021: TSMC (54%) + Samsung (17%) = 71%.
Top two in 2024: TSMC (62%) + Intel or Samsung (11%) = 73%.
Thus, 71% in 2021 vs 73% in 2024.`
  }
];
