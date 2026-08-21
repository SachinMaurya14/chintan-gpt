export interface TopicFormulaItem {
  title: string;
  category: string;
  formula: string;
  description: string;
  example: string;
}

export const TCS_INTEREST_FORMULAS: TopicFormulaItem[] = [
  {
    title: "Simple Interest (SI) Fundamental Formula",
    category: "Simple Interest",
    formula: "SI = (P × R × T) / 100\nAmount (A) = P + SI = P [1 + (R × T)/100]",
    description: "Interest calculated strictly on the initial Principal (P) across Time (T in years) at annual rate R%.",
    example: "Rs. 10,000 at 8% p.a. for 3 years: SI = (10000 × 8 × 3)/100 = Rs. 2,400."
  },
  {
    title: "Sum Doubling / Tripling at Simple Interest",
    category: "Simple Interest",
    formula: "To become N times: (N - 1) × 100 = R × T\nOr: T = [(N - 1) × 100] / R",
    description: "Since interest earned is (N - 1)P, the product of R and T equals (N - 1) × 100.",
    example: "To double (N=2) at 10%: T = (2-1)×100/10 = 10 years. To triple (N=3): T = 20 years."
  },
  {
    title: "Compound Interest (CI) Annual Compounding",
    category: "Compound Interest",
    formula: "Amount (A) = P [1 + R/100]^n\nCI = A - P = P [(1 + R/100)^n - 1]",
    description: "Interest earned in each period is added to the principal for calculating future interest.",
    example: "Rs. 8,000 at 10% for 2 years: A = 8000(1.1)² = Rs. 9,680; CI = Rs. 1,680."
  },
  {
    title: "Half-Yearly & Quarterly Compounding Rules",
    category: "Compounding Frequencies",
    formula: "Half-Yearly: Rate = R/2 %, Periods = 2n => A = P [1 + R/200]^(2n)\nQuarterly: Rate = R/4 %, Periods = 4n => A = P [1 + R/400]^(4n)",
    description: "Divide annual rate by compounding frequency per year and multiply years by same factor.",
    example: "12% p.a. compounded half-yearly for 1 year uses 6% for 2 periods."
  },
  {
    title: "Compounding Every 'm' Months (e.g. 8-Monthly, 10-Monthly)",
    category: "Compounding Frequencies",
    formula: "Rate per cycle = R × (m / 12) %\nNumber of cycles = (Total months) / m",
    description: "Used heavily in TCS Digital/Prime for non-standard intervals like 8 months, 9 months, or 10 months.",
    example: "15% p.a. for 2 years (24 mos) compounded 8-monthly: Rate = 15×(8/12) = 10%, Cycles = 24/8 = 3."
  },
  {
    title: "Difference between CI and SI for 2 and 3 Years",
    category: "SI vs CI Shortcuts",
    formula: "2 Years: Diff = P (R / 100)²\n3 Years: Diff = P (R / 100)² [3 + R/100] = P(R/100)² [(300 + R)/100]",
    description: "Instant shortcut for TCS Numerical Ability difference problems between compound and simple interest.",
    example: "P = 5000, R = 10%, 2-yr Diff = 5000 × (10/100)² = 5000 × 0.01 = Rs. 50."
  },
  {
    title: "Variable Interest Rates for Successive Years",
    category: "Multi-Year Growth",
    formula: "A = P [1 + R1/100] [1 + R2/100] [1 + R3/100]...",
    description: "When interest rates change per annum (e.g., 4% in 1st year, 5% in 2nd year, 10% in 3rd year).",
    example: "Rs. 10,000 at 5% year 1 and 10% year 2: A = 10000 × 1.05 × 1.10 = Rs. 11,550."
  },
  {
    title: "Sum Multiplication at Compound Interest",
    category: "Compound Interest",
    formula: "If sum becomes 'k' times in 'T' years, it becomes 'k^m' times in (m × T) years.",
    description: "In compound interest, multiplier powers correlate directly with linear multiples of time.",
    example: "If sum doubles in 4 years, it becomes 8 times (2³) in 3 × 4 = 12 years."
  },
  {
    title: "Equal Annual Installments in Compound Interest (Annuity Present Value)",
    category: "Installments",
    formula: "P = X / (1 + R/100) + X / (1 + R/100)² + ... + X / (1 + R/100)^n\nWhere X = Equal annual installment amount",
    description: "The borrowed sum equals the discounted present value sum of each future installment payment.",
    example: "2 equal installments at 10%: P = X/1.1 + X/1.21 = X(1.1 + 1)/1.21 = X(2.1)/1.21."
  },
  {
    title: "Effective Annual Rate (EAR)",
    category: "Effective Yield",
    formula: "EAR = [1 + R / (100 × m)]^m - 1\nWhere m = number of compounding cycles per year",
    description: "The actual annualized interest rate realized when compounding occurs more frequently than once a year.",
    example: "10% compounded semi-annually: EAR = (1 + 0.05)² - 1 = 1.1025 - 1 = 10.25%."
  }
];
