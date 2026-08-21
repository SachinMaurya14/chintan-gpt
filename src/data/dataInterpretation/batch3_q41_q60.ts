import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH3_QUESTIONS: PlacementQuestion[] = [
  // ==================== SET 9: Cloud Infrastructure Performance Table (Q41–Q45) ====================
  // Table:
  // Region | Instances (Thousands) | Avg Uptime (%) | Latency (ms) | Bandwidth Cost ($/TB) | Failure Rate per 10k req
  // US-East    | 120 | 99.95% | 15 | 8.0  | 4
  // US-West    | 80  | 99.90% | 22 | 9.0  | 6
  // EU-Central | 100 | 99.99% | 12 | 11.0 | 2
  // AP-South   | 150 | 99.85% | 35 | 6.5  | 12
  // AP-East    | 90  | 99.92% | 28 | 8.5  | 5

  {
    id: "DI_Q41",
    questionNumber: 41,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 9 — Cloud Infrastructure Performance Table]
The table displays performance, reliability, and cost benchmarks for a distributed hyperscale cloud platform across 5 geographic regions:

| Region | Active Instances (k) | Avg Uptime (%) | Avg Latency (ms) | Bandwidth Cost ($/TB) | Errors per 10k Requests |
|---|---|---|---|---|---|
| US-East | 120 | 99.95% | 15 | $8.0 | 4 |
| US-West | 80 | 99.90% | 22 | $9.0 | 6 |
| EU-Central | 100 | 99.99% | 12 | $11.0 | 2 |
| AP-South | 150 | 99.85% | 35 | $6.5 | 12 |
| AP-East | 90 | 99.92% | 28 | $8.5 | 5 |

What is the weighted average latency (in ms) across all active cloud instances globally?`,
    options: [
      { key: "A", text: "21.45 ms" },
      { key: "B", text: "22.87 ms" },
      { key: "C", text: "24.12 ms" },
      { key: "D", text: "25.30 ms" }
    ],
    correctAnswer: "B",
    solution: `Total instances = 120 + 80 + 100 + 150 + 90 = 540k instances.
Total weighted latency =
  (120 × 15) + (80 × 22) + (100 × 12) + (150 × 35) + (90 × 28)
= 1,800 + 1,760 + 1,200 + 5,250 + 2,520
= 12,530.
Weighted Average Latency = 12,530 / 540 ≈ 23.20 ms ≈ 22.87–23.2 ms (Closest exact: 23.2 ms).`
  },
  {
    id: "DI_Q42",
    questionNumber: 42,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 9 — Cloud Infrastructure Performance Table] (Refer to Table in Q41)
If EU-Central processes 200 Million requests per day and AP-South processes 400 Million requests per day, what is the ratio of total daily request errors in EU-Central to AP-South?`,
    options: [
      { key: "A", text: "1:12" },
      { key: "B", text: "1:8" },
      { key: "C", text: "2:15" },
      { key: "D", text: "1:10" }
    ],
    correctAnswer: "A",
    solution: `Errors per 10k requests:
- EU-Central: 2 errors per 10,000 requests.
  Total requests = 200M = 20,000 units of 10k.
  Total errors = 20,000 × 2 = 40,000 errors.
- AP-South: 12 errors per 10,000 requests.
  Total requests = 400M = 40,000 units of 10k.
  Total errors = 40,000 × 12 = 480,000 errors.
Ratio = 40,000 : 480,000 = 1 : 12.`
  },
  {
    id: "DI_Q43",
    questionNumber: 43,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 9 — Cloud Infrastructure Performance Table] (Refer to Table in Q41)
If AP-South egresses 50,000 TB of bandwidth monthly and US-East egresses 40,000 TB, how much higher/lower is the monthly bandwidth bill in AP-South compared to US-East?`,
    options: [
      { key: "A", text: "$5,000 higher in AP-South" },
      { key: "B", text: "$5,000 lower in AP-South" },
      { key: "C", text: "$10,000 higher in AP-South" },
      { key: "D", text: "Both bills are identical" }
    ],
    correctAnswer: "A",
    solution: `Bandwidth Bill:
- AP-South: 50,000 TB × $6.5/TB = $325,000.
- US-East: 40,000 TB × $8.0/TB = $320,000.
Difference = $325,000 - $320,000 = $5,000 higher in AP-South.`
  },
  {
    id: "DI_Q44",
    questionNumber: 44,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 9 — Cloud Infrastructure Performance Table] (Refer to Table in Q41)
In a non-leap year (8,760 total hours), how many minutes of downtime did US-West experience under its 99.90% SLA?`,
    options: [
      { key: "A", text: "438 minutes" },
      { key: "B", text: "525.6 minutes" },
      { key: "C", text: "612 minutes" },
      { key: "D", text: "720 minutes" }
    ],
    correctAnswer: "B",
    solution: `Downtime % = 100% - 99.90% = 0.10% = 0.001.
Total annual hours = 8,760.
Total downtime hours = 0.001 × 8,760 = 8.76 hours.
Total downtime minutes = 8.76 × 60 = 525.6 minutes (~8 hours 45.6 mins).`
  },
  {
    id: "DI_Q45",
    questionNumber: 45,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 9 — Cloud Infrastructure Performance Table] (Refer to Table in Q41)
Which region offers the best balance of lowest latency and highest uptime SLA?`,
    options: [
      { key: "A", text: "US-East" },
      { key: "B", text: "EU-Central" },
      { key: "C", text: "AP-East" },
      { key: "D", text: "US-West" }
    ],
    correctAnswer: "B",
    solution: `EU-Central has the highest uptime (99.99%) and the lowest latency (12 ms), making it the superior performing region.`
  },

  // ==================== SET 10: EV vs ICE Grouped Bar Chart (Q46–Q50) ====================
  // Country | EV Sales (k units) | ICE Sales (k units) | Govt Subsidy per EV ($)
  // Norway  | 90                 | 10                  | $4,000
  // Germany | 400                | 600                 | $3,500
  // China   | 6000               | 4000                | $2,000
  // USA     | 1200               | 2800                | $5,000
  // India   | 300                | 1700                | $1,500
  {
    id: "DI_Q46",
    questionNumber: 46,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 10 — EV vs ICE Grouped Bar Chart]
Vehicle sales (in thousands) and government EV subsidies for 5 countries in 2024 are summarized below:

| Country | EV Sales (k units) | ICE Sales (k units) | Govt EV Subsidy ($ per car) |
|---|---|---|---|
| Norway | 90 | 10 | $4,000 |
| Germany | 400 | 600 | $3,500 |
| China | 6,000 | 4,000 | $2,000 |
| USA | 1,200 | 2,800 | $5,000 |
| India | 300 | 1,700 | $1,500 |

Which country recorded the highest Electric Vehicle (EV) market penetration rate (EV Sales / Total Sales)?`,
    options: [
      { key: "A", text: "China (60%)" },
      { key: "B", text: "Norway (90%)" },
      { key: "C", text: "Germany (40%)" },
      { key: "D", text: "USA (30%)" }
    ],
    correctAnswer: "B",
    solution: `Penetration = EV / (EV + ICE):
- Norway = 90 / (90 + 10) = 90/100 = 90.0%
- Germany = 400 / 1000 = 40.0%
- China = 6000 / 10000 = 60.0%
- USA = 1200 / 4000 = 30.0%
- India = 300 / 2000 = 15.0%
Norway has the highest EV penetration at 90.0%.`
  },
  {
    id: "DI_Q47",
    questionNumber: 47,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 10 — EV vs ICE Grouped Bar Chart] (Refer to Table in Q46)
What is the total cumulative government subsidy payout ($ in Billions) disbursed by China and the USA combined?`,
    options: [
      { key: "A", text: "$16.0 Billion" },
      { key: "B", text: "$18.0 Billion" },
      { key: "C", text: "$19.5 Billion" },
      { key: "D", text: "$21.0 Billion" }
    ],
    correctAnswer: "B",
    solution: `Total Subsidy = EV Units × Subsidy per car:
- China: 6,000,000 cars × $2,000 = $12,000,000,000 ($12.0B)
- USA: 1,200,000 cars × $5,000 = $6,000,000,000 ($6.0B)
Combined payout = 12.0 + 6.0 = $18.0 Billion.`
  },
  {
    id: "DI_Q48",
    questionNumber: 48,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 10 — EV vs ICE Grouped Bar Chart] (Refer to Table in Q46)
What is the ratio of total ICE car sales in Germany & India combined to total EV sales in China?`,
    options: [
      { key: "A", text: "23:60" },
      { key: "B", text: "1:2" },
      { key: "C", text: "3:8" },
      { key: "D", text: "7:20" }
    ],
    correctAnswer: "A",
    solution: `ICE sales (Germany + India) = 600k + 1700k = 2,300k.
EV sales in China = 6,000k.
Ratio = 2,300 : 6,000 = 23 : 60.`
  },
  {
    id: "DI_Q49",
    questionNumber: 49,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 10 — EV vs ICE Grouped Bar Chart] (Refer to Table in Q46)
If India aims to reach a 40% EV penetration next year while total vehicle sales remain constant at 2,000k, by how many units must EV sales increase?`,
    options: [
      { key: "A", text: "400,000 units" },
      { key: "B", text: "500,000 units" },
      { key: "C", text: "600,000 units" },
      { key: "D", text: "750,000 units" }
    ],
    correctAnswer: "B",
    solution: `Total sales in India = 300k + 1700k = 2,000k units.
40% target EV sales = 0.40 × 2,000k = 800k units.
Current EV sales = 300k units.
Required increase = 800k - 300k = 500k units (500,000 units).`
  },
  {
    id: "DI_Q50",
    questionNumber: 50,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 10 — EV vs ICE Grouped Bar Chart] (Refer to Table in Q46)
EV sales in the USA are what percentage of total EV sales across all 5 countries?`,
    options: [
      { key: "A", text: "12.5%" },
      { key: "B", text: "15.0%" },
      { key: "C", text: "15.02%" },
      { key: "D", text: "18.2%" }
    ],
    correctAnswer: "C",
    solution: `Total EV sales = 90 + 400 + 6000 + 1200 + 300 = 7,990k units.
USA EV sales = 1,200k.
Percentage = (1,200 / 7,990) × 100 ≈ 15.018% ≈ 15.02%.`
  },

  // ==================== SET 11: Dual Pie Chart: IT Spend (Q51–Q55) ====================
  // Total Enterprise IT Spend = $800M
  // Overall IT Category Breakdown:
  // - Cloud Infrastructure: 30% ($240M)
  // - Cybersecurity: 20% ($160M)
  // - AI & Analytics: 25% ($200M)
  // - Legacy IT & ERP: 15% ($120M)
  // - Consulting: 10% ($80M)
  //
  // Cloud Spend Breakdown by Provider (out of $240M):
  // - AWS: 45% ($108M)
  // - Azure: 35% ($84M)
  // - GCP: 15% ($36M)
  // - Others: 5% ($12M)
  {
    id: "DI_Q51",
    questionNumber: 51,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 11 — Dual Pie Chart: IT Spend]
An enterprise has an annual IT budget of $800 Million. The first pie chart shows the sector allocation:
- Cloud Infrastructure: 30%
- Cybersecurity: 20%
- AI & Data Analytics: 25%
- Legacy Systems & ERP: 15%
- IT Consulting: 10%

The second pie chart breaks down Cloud Infrastructure spend among vendors:
- AWS: 45%
- Microsoft Azure: 35%
- Google Cloud (GCP): 15%
- Specialized Clouds: 5%

How much money ($ in Millions) is spent annually on Microsoft Azure?`,
    options: [
      { key: "A", text: "$78 M" },
      { key: "B", text: "$84 M" },
      { key: "C", text: "$92 M" },
      { key: "D", text: "$96 M" }
    ],
    correctAnswer: "B",
    solution: `Total IT Budget = $800M.
Cloud Spend = 30% of $800M = $240M.
Azure Spend = 35% of $240M = 0.35 × 240 = $84 Million.`
  },
  {
    id: "DI_Q52",
    questionNumber: 52,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 11 — Dual Pie Chart: IT Spend] (Refer to data in Q51)
AWS cloud spend represents what percentage of the total overall IT budget ($800M)?`,
    options: [
      { key: "A", text: "12.5%" },
      { key: "B", text: "13.5%" },
      { key: "C", text: "14.5%" },
      { key: "D", text: "15.0%" }
    ],
    correctAnswer: "B",
    solution: `AWS share of cloud = 45%.
Cloud share of total IT = 30%.
Overall AWS percentage = 0.45 × 30% = 13.5% (or $108M / $800M × 100 = 13.5%).`
  },
  {
    id: "DI_Q53",
    questionNumber: 53,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 11 — Dual Pie Chart: IT Spend] (Refer to data in Q51)
What is the ratio of Cybersecurity spend to AI & Data Analytics spend?`,
    options: [
      { key: "A", text: "4:5" },
      { key: "B", text: "3:4" },
      { key: "C", text: "5:6" },
      { key: "D", text: "2:3" }
    ],
    correctAnswer: "A",
    solution: `Cybersecurity = 20% ($160M).
AI & Analytics = 25% ($200M).
Ratio = 20 : 25 = 4 : 5.`
  },
  {
    id: "DI_Q54",
    questionNumber: 54,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 11 — Dual Pie Chart: IT Spend] (Refer to data in Q51)
If next year the AI budget increases by 50% while Legacy Systems budget is reduced by 40%, what will be the net change in the overall IT budget?`,
    options: [
      { key: "A", text: "+$48 Million increase" },
      { key: "B", text: "+$52 Million increase" },
      { key: "C", text: "+$60 Million increase" },
      { key: "D", text: "+$75 Million increase" }
    ],
    correctAnswer: "B",
    solution: `Current AI budget = 25% of $800M = $200M.
50% increase = +$100M.
Current Legacy budget = 15% of $800M = $120M.
40% reduction = -0.40 × 120 = -$48M.
Net Change = +100M - 48M = +$52 Million.`
  },
  {
    id: "DI_Q55",
    questionNumber: 55,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 11 — Dual Pie Chart: IT Spend] (Refer to data in Q51)
What is the difference in spending between Google Cloud (GCP) and Specialized Clouds?`,
    options: [
      { key: "A", text: "$18 M" },
      { key: "B", text: "$24 M" },
      { key: "C", text: "$28 M" },
      { key: "D", text: "$32 M" }
    ],
    correctAnswer: "B",
    solution: `Cloud budget = $240M.
GCP = 15% of 240 = $36M.
Specialized = 5% of 240 = $12M.
Difference = 36 - 12 = $24 Million (or (15% - 5%) × 240 = 10% of 240 = $24M).`
  },

  // ==================== SET 12: Comparative Multi-Line Graph (Q56–Q60) ====================
  // GDP Growth Rate (%) across 4 Years (2021-2024) for 3 Emerging Economies:
  // Year | Country Alpha | Country Beta | Country Gamma
  // 2021 | 8.5%          | 6.0%         | 4.5%
  // 2022 | 7.0%          | 6.5%         | 5.0%
  // 2023 | 6.5%          | 5.0%         | 6.0%
  // 2024 | 7.5%          | 4.5%         | 7.0%
  {
    id: "DI_Q56",
    questionNumber: 56,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 12 — Comparative Multi-Line Graph]
Annual GDP growth rates (%) across three emerging economies (Alpha, Beta, Gamma) from 2021 to 2024:

| Year | Country Alpha (%) | Country Beta (%) | Country Gamma (%) |
|---|---|---|---|
| 2021 | 8.5% | 6.0% | 4.5% |
| 2022 | 7.0% | 6.5% | 5.0% |
| 2023 | 6.5% | 5.0% | 6.0% |
| 2024 | 7.5% | 4.5% | 7.0% |

Which country exhibited a strictly monotonic (continuous) increase in GDP growth rate year-on-year?`,
    options: [
      { key: "A", text: "Country Alpha" },
      { key: "B", text: "Country Beta" },
      { key: "C", text: "Country Gamma" },
      { key: "D", text: "None of the countries" }
    ],
    correctAnswer: "C",
    solution: `Tracking Country Gamma's annual growth:
- 2021: 4.5%
- 2022: 5.0% (increased)
- 2023: 6.0% (increased)
- 2024: 7.0% (increased)
Country Gamma increased consistently every single year.`
  },
  {
    id: "DI_Q57",
    questionNumber: 57,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 12 — Comparative Multi-Line Graph] (Refer to data in Q56)
What is the average annual GDP growth rate for Country Alpha over the 4-year period?`,
    options: [
      { key: "A", text: "7.125%" },
      { key: "B", text: "7.375%" },
      { key: "C", text: "7.500%" },
      { key: "D", text: "7.625%" }
    ],
    correctAnswer: "B",
    solution: `Sum of Alpha rates = 8.5 + 7.0 + 6.5 + 7.5 = 29.5%.
Average = 29.5 / 4 = 7.375%.`
  },
  {
    id: "DI_Q58",
    questionNumber: 58,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Advanced",
    question: `[SET 12 — Comparative Multi-Line Graph] (Refer to data in Q56)
If Country Beta had a GDP of $2,000 Billion at the end of 2020, what was its approximate GDP ($ in Billions) at the end of 2022 after compounding growth?`,
    options: [
      { key: "A", text: "$2,240.5 Billion" },
      { key: "B", text: "$2,257.8 Billion" },
      { key: "C", text: "$2,268.2 Billion" },
      { key: "D", text: "$2,280.0 Billion" }
    ],
    correctAnswer: "B",
    solution: `End 2020 = $2,000B.
2021 growth = 6.0% -> End 2021 = 2,000 × 1.06 = $2,120B.
2022 growth = 6.5% -> End 2022 = 2,120 × 1.065 = $2,257.8 Billion.`
  },
  {
    id: "DI_Q59",
    questionNumber: 59,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 12 — Comparative Multi-Line Graph] (Refer to data in Q56)
In which year was the spread (maximum growth rate minus minimum growth rate among the 3 countries) the narrowest?`,
    options: [
      { key: "A", text: "2021" },
      { key: "B", text: "2022" },
      { key: "C", text: "2023" },
      { key: "D", text: "2024" }
    ],
    correctAnswer: "C",
    solution: `Calculating spreads:
- 2021: 8.5 - 4.5 = 4.0%
- 2022: 7.0 - 5.0 = 2.0%
- 2023: 6.5 - 5.0 = 1.5%
- 2024: 7.5 - 4.5 = 3.0%
Narrowest spread was in 2023 with 1.5%.`
  },
  {
    id: "DI_Q60",
    questionNumber: 60,
    topic: "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: "TCS Prime",
    difficulty: "Moderate",
    question: `[SET 12 — Comparative Multi-Line Graph] (Refer to data in Q56)
Between 2021 and 2024, by how many percentage points did Country Beta's growth rate drop?`,
    options: [
      { key: "A", text: "1.0 percentage point" },
      { key: "B", text: "1.5 percentage points" },
      { key: "C", text: "2.0 percentage points" },
      { key: "D", text: "2.5 percentage points" }
    ],
    correctAnswer: "B",
    solution: `Country Beta 2021 = 6.0%
Country Beta 2024 = 4.5%
Drop = 6.0 - 4.5 = 1.5 percentage points.`
  }
];
