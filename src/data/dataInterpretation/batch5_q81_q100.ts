import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH5_QUESTIONS: PlacementQuestion[] = [
  // ==================== SET 17: Dual-Axis Graph: Tech Enterprise Financials (Q81–Q85) ====================
  // 5 Years (2020 to 2024):
  // Year | Total Revenue ($ Millions) | Operating Margin (%)
  // 2020 | $500 M                     | 18.0%
  // 2021 | $650 M                     | 22.0%
  // 2022 | $800 M                     | 25.0%
  // 2023 | $1,000 M                   | 28.0%
  // 2024 | $1,250 M                   | 24.0%
  {
    id: "DI_Q81",
    questionNumber: 81,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 17 — Dual-Axis Graph: Tech Enterprise Financials]
A dual-axis chart presents the annual revenue ($ Millions, left axis) and operating margin (%, right axis) of an enterprise IT conglomerate:

| Year | Total Revenue ($ Millions) | Operating Margin (%) |
|---|---|---|
| 2020 | $500 M | 18.0% |
| 2021 | $650 M | 22.0% |
| 2022 | $800 M | 25.0% |
| 2023 | $1,000 M | 28.0% |
| 2024 | $1,250 M | 24.0% |

What was the absolute operating profit ($ in Millions) generated in 2024?`,
    options: [
      { key: "A", text: "$280 Million" },
      { key: "B", text: "$300 Million" },
      { key: "C", text: "$320 Million" },
      { key: "D", text: "$350 Million" }
    ],
    correctAnswer: "B",
    solution: `Operating Profit = Revenue × Operating Margin:
In 2024: $1,250 Million × 24.0% = 1250 × 0.24 = $300 Million.`
  },
  {
    id: "DI_Q82",
    questionNumber: 82,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 17 — Dual-Axis Graph: Tech Enterprise Financials] (Refer to Table in Q81)
What is the percentage growth in annual operating profit between 2020 and 2023?`,
    options: [
      { key: "A", text: "185.5%" },
      { key: "B", text: "211.11%" },
      { key: "C", text: "220.0%" },
      { key: "D", text: "235.5%" }
    ],
    correctAnswer: "B",
    solution: `Operating Profits:
- 2020 Profit = $500M × 18% = $90M
- 2023 Profit = $1,000M × 28% = $280M
Increase = 280 - 90 = $190M
Percentage growth = (190 / 90) × 100 = (19 / 9) × 100 ≈ 211.11%.`
  },
  {
    id: "DI_Q83",
    questionNumber: 83,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 17 — Dual-Axis Graph: Tech Enterprise Financials] (Refer to Table in Q81)
In which year was the year-on-year dollar increase in total revenue the greatest?`,
    options: [
      { key: "A", text: "2021 (+$150M)" },
      { key: "B", text: "2022 (+$150M)" },
      { key: "C", text: "2023 (+$200M)" },
      { key: "D", text: "2024 (+$250M)" }
    ],
    correctAnswer: "D",
    solution: `YoY dollar revenue increases:
- 2020 to 2021: 650 - 500 = +$150M
- 2021 to 2022: 800 - 650 = +$150M
- 2022 to 2023: 1000 - 800 = +$200M
- 2023 to 2024: 1250 - 1000 = +$250M
Greatest dollar revenue addition occurred in 2024 (+$250M).`
  },
  {
    id: "DI_Q84",
    questionNumber: 84,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 17 — Dual-Axis Graph: Tech Enterprise Financials] (Refer to Table in Q81)
What was the cumulative total operating profit earned across all 5 years combined?`,
    options: [
      { key: "A", text: "$985 Million" },
      { key: "B", text: "$1,013 Million" },
      { key: "C", text: "$1,050 Million" },
      { key: "D", text: "$1,075 Million" }
    ],
    correctAnswer: "B",
    solution: `Annual Operating Profits:
- 2020: 500 × 0.18 = $90M
- 2021: 650 × 0.22 = $143M
- 2022: 800 × 0.25 = $200M
- 2023: 1000 × 0.28 = $280M
- 2024: 1250 × 0.24 = $300M
Total Cumulative Profit = 90 + 143 + 200 + 280 + 300 = $1,013 Million.`
  },
  {
    id: "DI_Q85",
    questionNumber: 85,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 17 — Dual-Axis Graph: Tech Enterprise Financials] (Refer to Table in Q81)
Despite higher revenue in 2024 compared to 2023, by how many percentage points did the operating margin compress?`,
    options: [
      { key: "A", text: "2.5 percentage points" },
      { key: "B", text: "3.0 percentage points" },
      { key: "C", text: "4.0 percentage points" },
      { key: "D", text: "5.0 percentage points" }
    ],
    correctAnswer: "C",
    solution: `Margin in 2023 = 28.0%
Margin in 2024 = 24.0%
Compression = 28.0 - 24.0 = 4.0 percentage points.`
  },

  // ==================== SET 18: Semiconductor Fabrication Yield Table (Q86–Q90) ====================
  // Table for 4 Semiconductor Fab Nodes:
  // Node | Wafer Diameter | Gross Dies / Wafer | Defect Yield % | Cost / Processed Wafer ($) | Sale Price / Working Die ($)
  // 28nm | 300 mm         | 800                | 90%            | $3,000                     | $8.0
  // 14nm | 300 mm         | 1,200              | 85%            | $4,500                     | $10.0
  // 7nm  | 300 mm         | 2,000              | 75%            | $8,000                     | $14.0
  // 3nm  | 300 mm         | 3,200              | 60%            | $16,000                    | $22.0
  {
    id: "DI_Q86",
    questionNumber: 86,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 18 — Semiconductor Fabrication Yield Table]
Semiconductor foundry yield and manufacturing economics across four process nodes:

| Node | Gross Dies per Wafer | Defect Yield (%) | Cost per Processed Wafer ($) | Sale Price per Working Die ($) |
|---|---|---|---|---|
| 28nm | 800 | 90% | $3,000 | $8.0 |
| 14nm | 1,200 | 85% | $4,500 | $10.0 |
| 7nm | 2,000 | 75% | $8,000 | $14.0 |
| 3nm | 3,200 | 60% | $16,000 | $22.0 |

How many functional (good/working) dies are produced from a single 3nm wafer?`,
    options: [
      { key: "A", text: "1,600 dies" },
      { key: "B", text: "1,800 dies" },
      { key: "C", text: "1,920 dies" },
      { key: "D", text: "2,040 dies" }
    ],
    correctAnswer: "C",
    solution: `Working dies = Gross dies × Yield %:
For 3nm: 3,200 × 60% = 3,200 × 0.60 = 1,920 functional dies.`
  },
  {
    id: "DI_Q87",
    questionNumber: 87,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 18 — Semiconductor Fabrication Yield Table] (Refer to Table in Q86)
What is the net profit per processed wafer for the 7nm node?`,
    options: [
      { key: "A", text: "$11,000" },
      { key: "B", text: "$12,500" },
      { key: "C", text: "$13,000" },
      { key: "D", text: "$14,500" }
    ],
    correctAnswer: "C",
    solution: `7nm Node:
- Working dies = 2,000 × 75% = 1,500 dies.
- Revenue per wafer = 1,500 dies × $14.0 = $21,000.
- Cost per wafer = $8,000.
Net profit = 21,000 - 8,000 = $13,000 per wafer.`
  },
  {
    id: "DI_Q88",
    questionNumber: 88,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 18 — Semiconductor Fabrication Yield Table] (Refer to Table in Q86)
What is the manufacturing cost per working die on the 14nm node?`,
    options: [
      { key: "A", text: "$3.85" },
      { key: "B", text: "$4.12" },
      { key: "C", text: "$4.41" },
      { key: "D", text: "$4.75" }
    ],
    correctAnswer: "C",
    solution: `14nm Node:
- Working dies = 1,200 × 85% = 1,020 dies.
- Wafer cost = $4,500.
Cost per working die = $4,500 / 1,020 ≈ $4.4117 ≈ $4.41.`
  },
  {
    id: "DI_Q89",
    questionNumber: 89,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 18 — Semiconductor Fabrication Yield Table] (Refer to Table in Q86)
Which node yields the highest profit margin percentage ((Revenue - Cost) / Revenue × 100)?`,
    options: [
      { key: "A", text: "28nm" },
      { key: "B", text: "14nm" },
      { key: "C", text: "7nm" },
      { key: "D", text: "3nm" }
    ],
    correctAnswer: "D",
    solution: `Profit margin % for each node:
- 28nm: Revenue = 720 × 8 = $5,760. Profit = 5760 - 3000 = $2,760. Margin = 2760 / 5760 = 47.9%
- 14nm: Revenue = 1020 × 10 = $10,200. Profit = 10200 - 4500 = $5,700. Margin = 5700 / 10200 = 55.88%
- 7nm: Revenue = 1500 × 14 = $21,000. Profit = 21000 - 8000 = $13,000. Margin = 13000 / 21000 = 61.9%
- 3nm: Revenue = 1920 × 22 = $42,240. Profit = 42240 - 16000 = $26,240. Margin = 26240 / 42240 = 62.12%
Highest margin is on the 3nm node at 62.12%.`
  },
  {
    id: "DI_Q90",
    questionNumber: 90,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 18 — Semiconductor Fabrication Yield Table] (Refer to Table in Q86)
If a fab processes 10,000 wafers on 3nm and 10,000 wafers on 28nm, what is the ratio of total good dies produced on 3nm to 28nm?`,
    options: [
      { key: "A", text: "8:3" },
      { key: "B", text: "7:3" },
      { key: "C", text: "2:1" },
      { key: "D", text: "9:4" }
    ],
    correctAnswer: "A",
    solution: `Good dies per wafer:
- 3nm = 1,920 dies
- 28nm = 800 × 90% = 720 dies
Ratio = 1,920 : 720 = 192 : 72 = 8 : 3.`
  },

  // ==================== SET 19: Caselet DI: AI Data Center Power (Q91–Q95) ====================
  // Caselet Text:
  // An AI hyperscale data center operates 10,000 GPU server racks.
  // - Total facility power = 150 MegaWatts (MW).
  // - Total IT Compute power = 120 MW.
  // - Power Usage Effectiveness (PUE) = Total Facility Power / IT Compute Power.
  // - The remaining 30 MW non-compute power is divided between Cooling (70%), Power Distribution Losses (20%), and Lighting/Auxiliary (10%).
  // - Electricity cost is $0.08 per kWh ($80 per MWh).
  {
    id: "DI_Q91",
    questionNumber: 91,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 19 — Caselet DI: AI Data Center Power]
Read the scenario below and answer the questions:
An AI hyperscale data center consumes a total continuous facility power of 150 MegaWatts (MW), of which 120 MW directly powers IT compute servers.
- Power Usage Effectiveness (PUE) is defined as (Total Facility Power / IT Compute Power).
- The remaining 30 MW overhead power is split into Cooling (70%), Electrical Losses (20%), and Auxiliary/Lighting (10%).
- Commercial power is billed at $80 per MWh ($0.08/kWh).

What is the Power Usage Effectiveness (PUE) metric of this data center?`,
    options: [
      { key: "A", text: "1.15" },
      { key: "B", text: "1.20" },
      { key: "C", text: "1.25" },
      { key: "D", text: "1.30" }
    ],
    correctAnswer: "C",
    solution: `PUE = Total Facility Power / IT Compute Power
PUE = 150 MW / 120 MW = 1.25.`
  },
  {
    id: "DI_Q92",
    questionNumber: 92,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 19 — Caselet DI: AI Data Center Power] (Refer to Caselet in Q91)
How much continuous power (in MW) is consumed purely by the data center's Cooling systems?`,
    options: [
      { key: "A", text: "18 MW" },
      { key: "B", text: "21 MW" },
      { key: "C", text: "24 MW" },
      { key: "D", text: "27 MW" }
    ],
    correctAnswer: "B",
    solution: `Overhead power = 30 MW.
Cooling share = 70% of 30 MW = 0.70 × 30 = 21 MW.`
  },
  {
    id: "DI_Q93",
    questionNumber: 93,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 19 — Caselet DI: AI Data Center Power] (Refer to Caselet in Q91)
What is the total electricity cost per day (24 hours) for operating this entire 150 MW facility?`,
    options: [
      { key: "A", text: "$264,000" },
      { key: "B", text: "$288,000" },
      { key: "C", text: "$312,000" },
      { key: "D", text: "$360,000" }
    ],
    correctAnswer: "B",
    solution: `Total energy consumed in 24 hours = 150 MW × 24 hours = 3,600 MWh.
Rate per MWh = $80.
Daily cost = 3,600 MWh × $80/MWh = $288,000.`
  },
  {
    id: "DI_Q94",
    questionNumber: 94,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 19 — Caselet DI: AI Data Center Power] (Refer to Caselet in Q91)
If liquid cooling upgrades reduce cooling power consumption by 33.33% (1/3rd reduction) while IT compute remains 120 MW, what will be the new total facility power and new PUE?`,
    options: [
      { key: "A", text: "143 MW and PUE ≈ 1.192" },
      { key: "B", text: "140 MW and PUE ≈ 1.167" },
      { key: "C", text: "145 MW and PUE ≈ 1.208" },
      { key: "D", text: "138 MW and PUE ≈ 1.150" }
    ],
    correctAnswer: "A",
    solution: `Current cooling = 21 MW.
1/3rd reduction = 7 MW saved.
New cooling = 14 MW.
Other overheads = 9 MW (losses 6 MW + aux 3 MW).
New total overhead = 14 + 9 = 23 MW.
New total facility power = 120 + 23 = 143 MW.
New PUE = 143 / 120 ≈ 1.1917 ≈ 1.192.`
  },
  {
    id: "DI_Q95",
    questionNumber: 95,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 19 — Caselet DI: AI Data Center Power] (Refer to Caselet in Q91)
Cooling power represents what percentage of the total 150 MW facility power?`,
    options: [
      { key: "A", text: "12.0%" },
      { key: "B", text: "14.0%" },
      { key: "C", text: "15.5%" },
      { key: "D", text: "18.0%" }
    ],
    correctAnswer: "B",
    solution: `Cooling power = 21 MW.
Total facility power = 150 MW.
Percentage = (21 / 150) × 100 = 14.0%.`
  },

  // ==================== SET 20: Combined Bar & Line Chart: Automotive (Q96–Q100) ====================
  // Auto Manufacturer Production and Export Ratio across 5 Quarters (Q1 to Q5):
  // Quarter | Units Produced (Thousands) | Export Percentage (%)
  // Q1      | 200                        | 25%
  // Q2      | 250                        | 30%
  // Q3      | 280                        | 35%
  // Q4      | 320                        | 40%
  // Q5      | 400                        | 45%
  {
    id: "DI_Q96",
    questionNumber: 96,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 20 — Combined Bar & Line Chart: Automotive]
A combination chart illustrates quarterly car production (bars, thousands of units) and international export share (line, %):

| Quarter | Total Production (k units) | Export Percentage (%) |
|---|---|---|
| Q1 | 200 | 25% |
| Q2 | 250 | 30% |
| Q3 | 280 | 35% |
| Q4 | 320 | 40% |
| Q5 | 400 | 45% |

How many units (in thousands) were exported in Q5?`,
    options: [
      { key: "A", text: "160 thousand" },
      { key: "B", text: "175 thousand" },
      { key: "C", text: "180 thousand" },
      { key: "D", text: "190 thousand" }
    ],
    correctAnswer: "C",
    solution: `Export units in Q5 = 400k × 45% = 400 × 0.45 = 180 thousand units.`
  },
  {
    id: "DI_Q97",
    questionNumber: 97,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 20 — Combined Bar & Line Chart: Automotive] (Refer to Table in Q96)
What was the percentage increase in total exported units from Q1 to Q5?`,
    options: [
      { key: "A", text: "220%" },
      { key: "B", text: "240%" },
      { key: "C", text: "260%" },
      { key: "D", text: "280%" }
    ],
    correctAnswer: "C",
    solution: `Q1 Exports = 200k × 25% = 50k units.
Q5 Exports = 400k × 45% = 180k units.
Increase = 180 - 50 = 130k.
Percentage increase = (130 / 50) × 100 = 260.0%.`
  },
  {
    id: "DI_Q98",
    questionNumber: 98,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 20 — Combined Bar & Line Chart: Automotive] (Refer to Table in Q96)
What is the total number of domestic (non-exported) units sold across all 5 quarters combined?`,
    options: [
      { key: "A", text: "889 thousand" },
      { key: "B", text: "919 thousand" },
      { key: "C", text: "935 thousand" },
      { key: "D", text: "960 thousand" }
    ],
    correctAnswer: "B",
    solution: `Domestic units = Total × (100% - Export %):
- Q1 = 200k × 75% = 150k
- Q2 = 250k × 70% = 175k
- Q3 = 280k × 65% = 182k
- Q4 = 320k × 60% = 192k
- Q5 = 400k × 55% = 220k
Total Domestic = 150 + 175 + 182 + 192 + 220 = 919 thousand units.`
  },
  {
    id: "DI_Q99",
    questionNumber: 99,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 20 — Combined Bar & Line Chart: Automotive] (Refer to Table in Q96)
In which quarter was the domestic sales volume the lowest?`,
    options: [
      { key: "A", text: "Q1 (150k units)" },
      { key: "B", text: "Q2 (175k units)" },
      { key: "C", text: "Q3 (182k units)" },
      { key: "D", text: "Q4 (192k units)" }
    ],
    correctAnswer: "A",
    solution: `Domestic volumes:
- Q1: 150k
- Q2: 175k
- Q3: 182k
- Q4: 192k
- Q5: 220k
Lowest domestic volume was in Q1 with 150k units.`
  },
  {
    id: "DI_Q100",
    questionNumber: 100,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced Placement Level",
    question: `[SET 20 — Combined Bar & Line Chart: Automotive] (Refer to Table in Q96)
What is the overall average export percentage across the total cumulative production of 1,450 thousand vehicles?`,
    options: [
      { key: "A", text: "35.25%" },
      { key: "B", text: "36.62%" },
      { key: "C", text: "37.50%" },
      { key: "D", text: "38.10%" }
    ],
    correctAnswer: "B",
    solution: `Total production = 200 + 250 + 280 + 320 + 400 = 1,450k units.
Total exported = 50 + 75 + 98 + 128 + 180 = 531k units.
Overall Export % = (531 / 1450) × 100 ≈ 36.62%.`
  }
];
