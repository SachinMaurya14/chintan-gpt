export interface ProgressionsFormulaItem {
  title: string;
  category: string;
  formula: string;
  description: string;
  example: string;
}

export const TCS_PROGRESSIONS_FORMULAS: ProgressionsFormulaItem[] = [
  {
    title: "Arithmetic Progression (AP)",
    category: "AP Core",
    formula: "T_n = a + (n − 1)d\nS_n = (n/2)[2a + (n − 1)d] = (n/2)[a + l]",
    description: "Common difference d = T_n − T_{n-1}. Arithmetic Mean between a and b is (a + b)/2. If S_n = An² + Bn, then d = 2A.",
    example: "For 3, 7, 11... T_20 = 3 + 19(4) = 79. S_20 = 10(6 + 19×4) = 820."
  },
  {
    title: "Geometric Progression (GP)",
    category: "GP Core",
    formula: "T_n = a · r^(n − 1)\nS_n = a(r^n − 1) / (r − 1)  [r ≠ 1]\nS_∞ = a / (1 − r)  [for |r| < 1]",
    description: "Common ratio r = T_n / T_{n-1}. Geometric Mean between a and b is √(ab).",
    example: "For 18, 6, 2... S_∞ = 18 / (1 − 1/3) = 27."
  },
  {
    title: "Harmonic Progression (HP) & Means",
    category: "HP & Means",
    formula: "T_n of HP = 1 / [a + (n − 1)d]\nHM(a, b) = 2ab / (a + b)\nRelation: GM² = AM × HM and AM ≥ GM ≥ HM",
    description: "Reciprocals of terms in HP form an AP. Equality AM = GM = HM holds iff all numbers are identical.",
    example: "For numbers 4 and 16: AM = 10, GM = 8, HM = 6.4 (Notice: 8² = 10 × 6.4 = 64)."
  },
  {
    title: "Arithmetico-Geometric Progression (AGP)",
    category: "AGP",
    formula: "S_∞ = a / (1 − r) + d · r / (1 − r)²  [|r| < 1]",
    description: "For series S = a + (a+d)r + (a+2d)r² + ... Multiply by r and subtract (1 − r)S to compute.",
    example: "1 + 4/5 + 7/25 + 10/125... a=1, d=3, r=1/5 => S_∞ = 35/16."
  },
  {
    title: "Standard Power Sums",
    category: "Summations",
    formula: "Σ n = n(n + 1) / 2\nΣ n² = n(n + 1)(2n + 1) / 6\nΣ n³ = [n(n + 1) / 2]²\nΣ (2n − 1) = n² (Sum of first n odds)",
    description: "Essential closed forms for polynomial difference method and double summations.",
    example: "Sum of squares up to 20: (20 × 21 × 41) / 6 = 2,870."
  },
  {
    title: "Telescoping Sums & Partial Fractions",
    category: "Telescoping",
    formula: "Σ 1 / [n(n + 1)] = 1 − 1/(n + 1)\nΣ 1 / [n(n + 1)(n + 2)] = 1/4 − 1 / [2(n + 1)(n + 2)]\nΣ k · k! = (n + 1)! − 1",
    description: "Write each term as a difference T_n = f(n) − f(n+1) so all intermediate terms cancel out.",
    example: "1/(1·2) + 1/(2·3) + ... + 1/(99·100) = 1 − 1/100 = 99/100."
  },
  {
    title: "AM-GM Optimization Inequality",
    category: "Inequalities",
    formula: "(x₁ + x₂ + ... + x_n) / n ≥ (x₁ · x₂ · ... · x_n)^(1/n)",
    description: "Used to find minimum value of sum when product is constant, or maximum value of product when sum is fixed.",
    example: "Min of 4x + 9/x for x > 0: AM ≥ GM => (4x + 9/x)/2 ≥ √(36) = 6 => Min = 12."
  }
];
