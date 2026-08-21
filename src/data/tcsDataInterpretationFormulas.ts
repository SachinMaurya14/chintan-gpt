export interface DataInterpretationFormulaItem {
  title: string;
  category: string;
  formula: string;
  description: string;
  example: string;
}

export const TCS_DATA_INTERPRETATION_FORMULAS: DataInterpretationFormulaItem[] = [
  {
    title: "Percentage Change & Growth Rate",
    category: "Percentages",
    formula: "Percentage Change = [(Final Value − Initial Value) / Initial Value] × 100",
    description: "Always divide by the baseline (Initial/Old) value. If asking 'A is what % more than B', denominator is B. If asking 'B is what % less than A', denominator is A.",
    example: "Revenue grew from $80k to $145k: Growth = (65 / 80) × 100 = 81.25%."
  },
  {
    title: "Pie Chart Degree to Percentage Conversion",
    category: "Pie Charts",
    formula: "Value = (Central Angle / 360°) × Total Value\nPercentage (%) = (Central Angle / 360°) × 100 = Angle / 3.6",
    description: "To convert degrees directly to percentage, divide the degree measure by 3.6 (e.g. 72° = 72 / 3.6 = 20%).",
    example: "Central angle of 90° for Education with total budget $540M gives (90 / 360) × 540 = $135M."
  },
  {
    title: "Weighted Average Across Groups",
    category: "Tables & Mixed DI",
    formula: "Weighted Average (X_avg) = (n₁x₁ + n₂x₂ + ... + n_k x_k) / (n₁ + n₂ + ... + n_k)",
    description: "Used when combining groups with different base populations (e.g., college packages, server latencies, product costs).",
    example: "500 units @ ₹60 + 450 units @ ₹55 => (30000 + 24750) / 950 = ₹57.63."
  },
  {
    title: "Ratio of Ratios / Two-Stage Distribution",
    category: "Dual Pie & Matrices",
    formula: "Category Sub-population = Total × (% in Category) × [Sub-ratio / Sum of Ratios]",
    description: "Calculate female/male or tier distributions directly without computing intermediate totals first to save exam time.",
    example: "Total 4000, Engg = 35%, M:F = 3:2 => Females = 4000 × 0.35 × (2/5) = 560."
  },
  {
    title: "Operating Profit Margin & Markup",
    category: "Financial DI",
    formula: "Operating Profit = Revenue − Total Cost\nOperating Margin (%) = (Operating Profit / Total Revenue) × 100",
    description: "Profit margin is calculated on Revenue (Sales), whereas Markup is calculated on Cost.",
    example: "Revenue $1,250M with 24% margin yields Operating Profit = 1250 × 0.24 = $300M."
  },
  {
    title: "Power Usage Effectiveness (PUE) & Caselet Ratios",
    category: "Caselet DI",
    formula: "PUE = Total Facility Power / IT Compute Power\nOverhead Power = Total Facility Power − IT Compute Power",
    description: "Ideal PUE is 1.0 (zero overhead). Lower PUE indicates superior thermal and electrical efficiency.",
    example: "150 MW Total / 120 MW Compute = 1.25 PUE."
  },
  {
    title: "Defect Yield & Good Die Economics",
    category: "Yield & Manufacturing",
    formula: "Working Units = Gross Units Produced × Yield %\nCost per Working Unit = Total Processing Cost / Working Units",
    description: "Found in advanced semiconductor and manufacturing tables in TCS Prime tests.",
    example: "3,200 gross dies × 60% yield = 1,920 working dies."
  },
  {
    title: "Quick Table Approximation: 10% & 1% Rule",
    category: "Mental Arithmetic",
    formula: "Break any number X into 10% (shift decimal 1 left) and 1% (shift decimal 2 left)",
    description: "To find 17.5% of 650: 10% = 65, 5% = 32.5, 2.5% = 16.25 => Sum = 113.75.",
    example: "Fast mental division and percentage scanning prevents manual long division traps."
  }
];
