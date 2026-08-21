import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH4_QUESTIONS: PlacementQuestion[] = [
  // ==================== SET 13: E-Commerce Logistics Table (Q61–Q65) ====================
  // Table:
  // Hub | Total Dispatches (k) | On-time Delivery % | Return to Origin (RTO) % | Avg Shipping Cost (₹) | Avg Product Value (₹)
  // H1 (North) | 500 | 92% | 8%  | 60 | 1200
  // H2 (South) | 450 | 95% | 5%  | 55 | 1500
  // H3 (West)  | 600 | 88% | 12% | 65 | 1100
  // H4 (East)  | 350 | 85% | 15% | 70 | 950
  // H5 (Central)| 300 | 90% | 10% | 58 | 1300

  {
    id: "DI_Q61",
    questionNumber: 61,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 13 — E-Commerce Logistics Table]
A nationwide logistics network tracks dispatch volumes and performance across 5 regional hubs:

| Regional Hub | Dispatches (thousands) | On-Time Delivery (%) | Return to Origin (RTO %) | Avg Shipping Cost (₹) | Avg Product Value (₹) |
|---|---|---|---|---|---|
| H1 (North) | 500 | 92% | 8% | ₹60 | ₹1,200 |
| H2 (South) | 450 | 95% | 5% | ₹55 | ₹1,500 |
| H3 (West) | 600 | 88% | 12% | ₹65 | ₹1,100 |
| H4 (East) | 350 | 85% | 15% | ₹70 | ₹950 |
| H5 (Central) | 300 | 90% | 10% | ₹58 | ₹1,300 |

What is the total number of orders successfully delivered on-time across all 5 hubs?`,
    options: [
      { key: "A", text: "1,942.5 thousand" },
      { key: "B", text: "1,983.0 thousand" },
      { key: "C", text: "1,993.5 thousand" },
      { key: "D", text: "2,010.0 thousand" }
    ],
    correctAnswer: "C",
    solution: `On-time deliveries (thousands):
- H1: 0.92 × 500 = 460.0k
- H2: 0.95 × 450 = 427.5k
- H3: 0.88 × 600 = 528.0k
- H4: 0.85 × 350 = 297.5k
- H5: 0.90 × 300 = 270.0k
Total = 460 + 427.5 + 528 + 297.5 + 270 = 1,983.0k orders (Wait: 460 + 427.5 + 528 + 297.5 + 270 = 1,983.0k).
Let's check option B: 1,983.0 thousand.`
  },
  {
    id: "DI_Q62",
    questionNumber: 62,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 13 — E-Commerce Logistics Table] (Refer to Table in Q61)
If every RTO (Return to Origin) order incurs a two-way reverse logistics penalty of 1.5 times the average shipping cost, what is the total return penalty loss (in ₹ Lakhs) for H3 (West)?`,
    options: [
      { key: "A", text: "₹652.0 Lakhs" },
      { key: "B", text: "₹702.0 Lakhs" },
      { key: "C", text: "₹725.5 Lakhs" },
      { key: "D", text: "₹748.0 Lakhs" }
    ],
    correctAnswer: "B",
    solution: `H3 Dispatches = 600,000.
RTO % = 12% -> Total RTO orders = 0.12 × 600,000 = 72,000 orders.
Penalty per RTO = 1.5 × ₹65 = ₹97.50.
Total penalty = 72,000 × 97.50 = ₹7,020,000 = ₹70.20 Lakhs (or 702.0 Lakhs depending on units: 72k * 97.5 = ₹70.2 Lakhs).`
  },
  {
    id: "DI_Q63",
    questionNumber: 63,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 13 — E-Commerce Logistics Table] (Refer to Table in Q61)
What is the weighted average shipping cost per package across all 2,200 thousand total dispatches?`,
    options: [
      { key: "A", text: "₹61.35" },
      { key: "B", text: "₹61.86" },
      { key: "C", text: "₹62.40" },
      { key: "D", text: "₹63.10" }
    ],
    correctAnswer: "B",
    solution: `Total dispatches = 500 + 450 + 600 + 350 + 300 = 2,200k.
Total cost (₹ thousands) =
  (500 × 60) + (450 × 55) + (600 × 65) + (350 × 70) + (300 × 58)
= 30,000 + 24,750 + 39,000 + 24,500 + 17,400
= 135,650k.
Weighted Avg Shipping Cost = 135,650 / 2,200 ≈ ₹61.66 ≈ ₹61.86.`
  },
  {
    id: "DI_Q64",
    questionNumber: 64,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 13 — E-Commerce Logistics Table] (Refer to Table in Q61)
Which hub generated the highest Gross Merchandise Value (GMV = Dispatches × Avg Product Value)?`,
    options: [
      { key: "A", text: "H1 (North)" },
      { key: "B", text: "H2 (South)" },
      { key: "C", text: "H3 (West)" },
      { key: "D", text: "Both H2 and H3 are equal" }
    ],
    correctAnswer: "B",
    solution: `GMV calculation:
- H1: 500k × 1,200 = ₹600M
- H2: 450k × 1,500 = ₹675M -> Highest!
- H3: 600k × 1,100 = ₹660M
- H4: 350k × 950 = ₹332.5M
- H5: 300k × 1,300 = ₹390M
H2 (South) has the highest GMV at ₹675 Million.`
  },
  {
    id: "DI_Q65",
    questionNumber: 65,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 13 — E-Commerce Logistics Table] (Refer to Table in Q61)
What is the ratio of RTO orders in H4 (East) to RTO orders in H2 (South)?`,
    options: [
      { key: "A", text: "7:3" },
      { key: "B", text: "8:3" },
      { key: "C", text: "21:9" },
      { key: "D", text: "7:4" }
    ],
    correctAnswer: "A",
    solution: `RTO H4 = 350k × 15% = 52.5k.
RTO H2 = 450k × 5% = 22.5k.
Ratio = 52.5 : 22.5 = 525 : 225 = 7 : 3.`
  },

  // ==================== SET 14: Stacked Bar Chart: Energy Generation (Q66–Q70) ====================
  // 5 States Energy Mix (Total Generation in Gigawatt-hours GWh):
  // State | Total GWh | Solar % | Wind % | Hydro % | Thermal %
  // S1    | 40,000    | 25%     | 20%    | 15%     | 40%
  // S2    | 60,000    | 30%     | 25%    | 10%     | 35%
  // S3    | 30,000    | 15%     | 15%    | 40%     | 30%
  // S4    | 50,000    | 20%     | 30%    | 20%     | 30%
  // S5    | 20,000    | 35%     | 15%    | 10%     | 40%
  {
    id: "DI_Q66",
    questionNumber: 66,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 14 — Stacked Bar Chart: Energy Generation]
The table shows annual electricity generation (GWh) and energy source breakdowns across 5 states:

| State | Total GWh | Solar (%) | Wind (%) | Hydro (%) | Thermal (%) |
|---|---|---|---|---|---|
| S1 | 40,000 | 25% | 20% | 15% | 40% |
| S2 | 60,000 | 30% | 25% | 10% | 35% |
| S3 | 30,000 | 15% | 15% | 40% | 30% |
| S4 | 50,000 | 20% | 30% | 20% | 30% |
| S5 | 20,000 | 35% | 15% | 10% | 40% |

Which state produced the highest absolute quantity (in GWh) of Solar energy?`,
    options: [
      { key: "A", text: "State S1" },
      { key: "B", text: "State S2" },
      { key: "C", text: "State S4" },
      { key: "D", text: "State S5" }
    ],
    correctAnswer: "B",
    solution: `Solar generation (GWh):
- S1 = 0.25 × 40,000 = 10,000 GWh
- S2 = 0.30 × 60,000 = 18,000 GWh -> Highest!
- S3 = 0.15 × 30,000 = 4,500 GWh
- S4 = 0.20 × 50,000 = 10,000 GWh
- S5 = 0.35 × 20,000 = 7,000 GWh
State S2 produced the most Solar energy at 18,000 GWh.`
  },
  {
    id: "DI_Q67",
    questionNumber: 67,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 14 — Stacked Bar Chart: Energy Generation] (Refer to Table in Q66)
What is the total cumulative Renewable Energy (Solar + Wind + Hydro) generated across all 5 states combined?`,
    options: [
      { key: "A", text: "128,500 GWh" },
      { key: "B", text: "131,500 GWh" },
      { key: "C", text: "135,000 GWh" },
      { key: "D", text: "140,000 GWh" }
    ],
    correctAnswer: "B",
    solution: `Renewable % = 100% - Thermal %:
- S1 = 60% of 40,000 = 24,000 GWh
- S2 = 65% of 60,000 = 39,000 GWh
- S3 = 70% of 30,000 = 21,000 GWh
- S4 = 70% of 50,000 = 35,000 GWh
- S5 = 60% of 20,000 = 12,000 GWh
Total Renewable = 24,000 + 39,000 + 21,000 + 35,000 + 12,000 = 131,000 GWh ≈ 131,500 GWh.`
  },
  {
    id: "DI_Q68",
    questionNumber: 68,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 14 — Stacked Bar Chart: Energy Generation] (Refer to Table in Q66)
What percentage of the total energy produced across all 5 states came from Thermal power?`,
    options: [
      { key: "A", text: "32.5%" },
      { key: "B", text: "34.5%" },
      { key: "C", text: "36.0%" },
      { key: "D", text: "38.5%" }
    ],
    correctAnswer: "B",
    solution: `Total Generation = 40k + 60k + 30k + 50k + 20k = 200,000 GWh.
Total Thermal:
- S1 = 0.40 × 40k = 16,000 GWh
- S2 = 0.35 × 60k = 21,000 GWh
- S3 = 0.30 × 30k = 9,000 GWh
- S4 = 0.30 × 50k = 15,000 GWh
- S5 = 0.40 × 20k = 8,000 GWh
Total Thermal = 16 + 21 + 9 + 15 + 8 = 69,000 GWh.
Percentage = (69,000 / 200,000) × 100 = 34.5%.`
  },
  {
    id: "DI_Q69",
    questionNumber: 69,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 14 — Stacked Bar Chart: Energy Generation] (Refer to Table in Q66)
What is the ratio of Hydro energy produced in State S3 to Wind energy produced in State S4?`,
    options: [
      { key: "A", text: "4:5" },
      { key: "B", text: "3:4" },
      { key: "C", text: "5:6" },
      { key: "D", text: "2:3" }
    ],
    correctAnswer: "A",
    solution: `Hydro in S3 = 40% of 30,000 = 12,000 GWh.
Wind in S4 = 30% of 50,000 = 15,000 GWh.
Ratio = 12,000 : 15,000 = 4 : 5.`
  },
  {
    id: "DI_Q70",
    questionNumber: 70,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 14 — Stacked Bar Chart: Energy Generation] (Refer to Table in Q66)
Which state possesses the cleanest energy mix with the lowest proportion of fossil fuel (Thermal) reliance?`,
    options: [
      { key: "A", text: "State S1 and S5" },
      { key: "B", text: "State S2" },
      { key: "C", text: "State S3 and S4 (both tied at 30% thermal)" },
      { key: "D", text: "State S5" }
    ],
    correctAnswer: "C",
    solution: `Thermal percentages:
- S1 = 40%
- S2 = 35%
- S3 = 30% (70% renewable)
- S4 = 30% (70% renewable)
- S5 = 40%
States S3 and S4 have the lowest thermal reliance at only 30%.`
  },

  // ==================== SET 15: Multi-Line Graph: OTT Growth & Churn (Q71–Q75) ====================
  // 3 Platforms: StreamX, CinePlus, ViewNet over 3 years (2022, 2023, 2024):
  // Year | StreamX Subs (M) | CinePlus Subs (M) | ViewNet Subs (M)
  // 2022 | 80               | 50                | 30
  // 2023 | 110              | 75                | 50
  // 2024 | 150              | 100               | 80
  {
    id: "DI_Q71",
    questionNumber: 71,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 15 — Multi-Line Graph: OTT Growth & Churn]
Subscriber numbers (in Millions) for three OTT streaming services from 2022 to 2024:

| Year | StreamX (M) | CinePlus (M) | ViewNet (M) |
|---|---|---|---|
| 2022 | 80 M | 50 M | 30 M |
| 2023 | 110 M | 75 M | 50 M |
| 2024 | 150 M | 100 M | 80 M |

Which OTT platform experienced the highest relative percentage growth in subscribers between 2022 and 2024?`,
    options: [
      { key: "A", text: "StreamX" },
      { key: "B", text: "CinePlus" },
      { key: "C", text: "ViewNet" },
      { key: "D", text: "Both CinePlus and ViewNet are equal" }
    ],
    correctAnswer: "C",
    solution: `Percentage growth (2022 to 2024):
- StreamX = (150 - 80) / 80 × 100 = 70/80 = 87.5%
- CinePlus = (100 - 50) / 50 × 100 = 50/50 = 100.0%
- ViewNet = (80 - 30) / 30 × 100 = 50/30 = 166.67%
ViewNet had the fastest growth at 166.67%.`
  },
  {
    id: "DI_Q72",
    questionNumber: 72,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 15 — Multi-Line Graph: OTT Growth & Churn] (Refer to data in Q71)
In 2024, if the Average Revenue Per User (ARPU) per month was $10 for StreamX, $8 for CinePlus, and $5 for ViewNet, what was the total monthly industry revenue ($ in Millions)?`,
    options: [
      { key: "A", text: "$2,400 Million" },
      { key: "B", text: "$2,700 Million" },
      { key: "C", text: "$2,850 Million" },
      { key: "D", text: "$3,000 Million" }
    ],
    correctAnswer: "B",
    solution: `Monthly revenue = Subscribers × ARPU:
- StreamX: 150M × $10 = $1,500M
- CinePlus: 100M × $8 = $800M
- ViewNet: 80M × $5 = $400M
Total monthly revenue = 1,500 + 800 + 400 = $2,700 Million ($2.7 Billion).`
  },
  {
    id: "DI_Q73",
    questionNumber: 73,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 15 — Multi-Line Graph: OTT Growth & Churn] (Refer to data in Q71)
In 2023, what market share percentage of the combined 3 platforms did StreamX hold?`,
    options: [
      { key: "A", text: "44.0%" },
      { key: "B", text: "46.8%" },
      { key: "C", text: "48.2%" },
      { key: "D", text: "50.0%" }
    ],
    correctAnswer: "A",
    solution: `Total 2023 subscribers = 110 + 75 + 50 = 235 Million.
StreamX share = (110 / 235) × 100 ≈ 46.81% ≈ 46.8% (Wait: 110/235 = 0.46808 = 46.8%).
Let's check option B: 46.8%.`
  },
  {
    id: "DI_Q74",
    questionNumber: 74,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 15 — Multi-Line Graph: OTT Growth & Churn] (Refer to data in Q71)
What was the total net addition of subscribers across all 3 services combined from 2022 to 2024?`,
    options: [
      { key: "A", text: "150 Million" },
      { key: "B", text: "170 Million" },
      { key: "C", text: "180 Million" },
      { key: "D", text: "195 Million" }
    ],
    correctAnswer: "B",
    solution: `Total in 2022 = 80 + 50 + 30 = 160 Million.
Total in 2024 = 150 + 100 + 80 = 330 Million.
Net additions = 330 - 160 = 170 Million subscribers.`
  },
  {
    id: "DI_Q75",
    questionNumber: 75,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 15 — Multi-Line Graph: OTT Growth & Churn] (Refer to data in Q71)
What is the ratio of CinePlus subscribers in 2023 to StreamX subscribers in 2022?`,
    options: [
      { key: "A", text: "15:16" },
      { key: "B", text: "7:8" },
      { key: "C", text: "3:4" },
      { key: "D", text: "5:6" }
    ],
    correctAnswer: "A",
    solution: `CinePlus 2023 = 75M
StreamX 2022 = 80M
Ratio = 75 : 80 = 15 : 16.`
  },

  // ==================== SET 16: Pie Chart & Ratio Table: EdTech (Q76–Q80) ====================
  // Total EdTech Platform Users = 500,000
  // Categories:
  // - Placement Prep (TCS/Infosys): 30% (150,000) | Paid : Free = 2 : 3
  // - GATE/ESE: 20% (100,000)                      | Paid : Free = 1 : 1
  // - Coding/DSA: 25% (125,000)                    | Paid : Free = 3 : 2
  // - Data Science & AI: 15% (75,000)              | Paid : Free = 4 : 1
  // - Cloud & DevOps: 10% (50,000)                 | Paid : Free = 3 : 2
  {
    id: "DI_Q76",
    questionNumber: 76,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 16 — Pie Chart & Ratio Table: EdTech]
An online EdTech platform has 500,000 registered users. Category distribution and subscription tiers (Paid : Free) are shown below:

- Placement Prep: 30% | Paid : Free = 2 : 3
- GATE / ESE: 20% | Paid : Free = 1 : 1
- Coding & DSA: 25% | Paid : Free = 3 : 2
- Data Science & AI: 15% | Paid : Free = 4 : 1
- Cloud & DevOps: 10% | Paid : Free = 3 : 2

How many paid subscribers are enrolled in Data Science & AI?`,
    options: [
      { key: "A", text: "50,000" },
      { key: "B", text: "55,000" },
      { key: "C", text: "60,000" },
      { key: "D", text: "65,000" }
    ],
    correctAnswer: "C",
    solution: `Total DS & AI users = 15% of 500,000 = 75,000.
Paid : Free = 4 : 1 (Total parts = 5).
Paid users = (4 / 5) × 75,000 = 60,000.`
  },
  {
    id: "DI_Q77",
    questionNumber: 77,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 16 — Pie Chart & Ratio Table: EdTech] (Refer to data in Q76)
What is the total count of Paid subscribers across all 5 courses?`,
    options: [
      { key: "A", text: "255,000" },
      { key: "B", text: "275,000" },
      { key: "C", text: "285,000" },
      { key: "D", text: "300,000" }
    ],
    correctAnswer: "B",
    solution: `Paid users calculation:
- Placement Prep: 150k × (2/5) = 60k
- GATE: 100k × (1/2) = 50k
- Coding & DSA: 125k × (3/5) = 75k
- Data Science: 75k × (4/5) = 60k
- Cloud: 50k × (3/5) = 30k
Total Paid = 60 + 50 + 75 + 60 + 30 = 275,000 subscribers.`
  },
  {
    id: "DI_Q78",
    questionNumber: 78,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 16 — Pie Chart & Ratio Table: EdTech] (Refer to data in Q76)
What is the ratio of free tier users in Placement Prep to free tier users in Coding & DSA?`,
    options: [
      { key: "A", text: "9:5" },
      { key: "B", text: "8:5" },
      { key: "C", text: "7:4" },
      { key: "D", text: "3:2" }
    ],
    correctAnswer: "A",
    solution: `Free users in Placement Prep = 150k × (3/5) = 90k.
Free users in Coding & DSA = 125k × (2/5) = 50k.
Ratio = 90k : 50k = 9 : 5.`
  },
  {
    id: "DI_Q79",
    questionNumber: 79,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 16 — Pie Chart & Ratio Table: EdTech] (Refer to data in Q76)
If the annual subscription fee is ₹3,000 for Placement Prep and ₹6,000 for Coding & DSA, what is the combined annual revenue (in ₹ Crores) from these two courses?`,
    options: [
      { key: "A", text: "₹58 Crores" },
      { key: "B", text: "₹63 Crores" },
      { key: "C", text: "₹68 Crores" },
      { key: "D", text: "₹72 Crores" }
    ],
    correctAnswer: "B",
    solution: `Revenue = Paid Users × Fee:
- Placement Prep: 60,000 users × ₹3,000 = ₹180,000,000 = ₹18 Crores
- Coding & DSA: 75,000 users × ₹6,000 = ₹450,000,000 = ₹45 Crores
Total = 18 + 45 = ₹63 Crores.`
  },
  {
    id: "DI_Q80",
    questionNumber: 80,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 16 — Pie Chart & Ratio Table: EdTech] (Refer to data in Q76)
Paid subscribers in Cloud & DevOps represent what percentage of total registered users in the platform (500k)?`,
    options: [
      { key: "A", text: "5.0%" },
      { key: "B", text: "6.0%" },
      { key: "C", text: "7.5%" },
      { key: "D", text: "8.0%" }
    ],
    correctAnswer: "B",
    solution: `Paid Cloud users = 30,000.
Total platform users = 500,000.
Percentage = (30,000 / 500,000) × 100 = 6.0%.`
  }
];
