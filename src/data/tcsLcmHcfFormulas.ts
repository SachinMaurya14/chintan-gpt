export interface FormulaItem {
  title: string;
  category: string;
  formula: string;
  description: string;
  example: string;
}

export const TCS_LCM_HCF_FORMULAS: FormulaItem[] = [
  {
    title: "1. Fundamental Product Rule",
    category: "Two-Number Theorem",
    formula: "Product of two numbers (A × B) = HCF(A, B) × LCM(A, B)",
    description: "Applicable strictly for two positive integers. For 3 or more numbers, A × B × C ≠ HCF × LCM in general.",
    example: "If HCF=12, LCM=180, one number=36 => Other number = (12 × 180)/36 = 60."
  },
  {
    title: "2. Ratio & Co-prime Factor Representation",
    category: "Ratio Method",
    formula: "Numbers = a·H and b·H (where gcd(a, b) = 1)\nLCM = a × b × H\nSum = H(a + b)\nProduct = H²(a × b)",
    description: "When two numbers are in ratio a : b, their common multiplier is their HCF (H), where a and b are mutually prime (coprime).",
    example: "Ratio = 3 : 5, HCF = 8 => LCM = 3 × 5 × 8 = 120; Numbers = 24 and 40."
  },
  {
    title: "3. Fractions & Decimals HCF / LCM",
    category: "Fractions & Decimals",
    formula: "HCF of Fractions = HCF(Numerators) / LCM(Denominators)\nLCM of Fractions = LCM(Numerators) / HCF(Denominators)",
    description: "Fractions must first be converted into their irreducible standard form. For decimals, equalize decimal places before finding HCF/LCM.",
    example: "HCF(2/3, 8/9, 10/27) = HCF(2,8,10)/LCM(3,9,27) = 2/27."
  },
  {
    title: "4. Remainder Cases in HCF (Greatest Divisor)",
    category: "Remainder Cases",
    formula: "Case I (Different Remainder): Greatest divisor leaving r1, r2 on A, B = HCF(A - r1, B - r2)\nCase II (Same Remainder 'r' unknown): Greatest divisor = HCF(|A - B|, |B - C|, |C - A|)",
    description: "Subtract remainders before taking HCF. When remainder is unknown but identical, take differences of numbers first.",
    example: "Divide 62, 132, 237 leaving same remainder => HCF(70, 105, 175) = 35."
  },
  {
    title: "5. Remainder Cases in LCM (Least Number)",
    category: "Remainder Cases",
    formula: "Case I (Leaves same remainder r): N = LCM(a, b, c) × k + r\nCase II (Constant diff d = divisor - rem): N = LCM(a, b, c) × k - d",
    description: "For condition 'divisible by D', set N mod D = 0 and solve for the smallest positive integer multiplier k.",
    example: "Div by 20, 25, 35 leaves rem 14, 19, 29 (diff d=6) => N = LCM(20,25,35) - 6 = 700 - 6 = 694."
  },
  {
    title: "6. Cyclic Events, Bells & Traffic Lights",
    category: "Cyclic Intervals",
    formula: "Simultaneous Toll Time = LCM(T₁, T₂, T₃, ...)\nNumber of occurrences in duration T = ⌊Total Time / LCM⌋ + 1 (if start included)",
    description: "Traffic lights, bells, circular lap times meet simultaneously at multiples of the LCM of their cycle times.",
    example: "Bells toll at 2, 4, 6s => LCM = 12s. In 60s, tolls = (60/12) + 1 = 6 times (with initial toll)."
  },
  {
    title: "7. Euclidean & Extended Euclidean Algorithm",
    category: "Algebraic GCD",
    formula: "gcd(a, b) = gcd(b, a mod b)\nBezout's Identity: a·x + b·y = gcd(a, b)",
    description: "Repeated division computes HCF efficiently. Extended Euclidean finds integer coefficients x, y and modular inverses.",
    example: "55 = 15(3) + 10; 15 = 10(1) + 5; 10 = 5(2) + 0 => gcd(55, 15) = 5."
  },
  {
    title: "8. Linear Congruences & Solvability",
    category: "Modular Systems",
    formula: "ax ≡ b (mod m)\nSolution exists ⟺ d = gcd(a, m) divides b.\nIf d | b, exactly 'd' incongruent solutions exist modulo m.",
    description: "If gcd(a, m) = 1, unique solution x ≡ b·a⁻¹ (mod m).",
    example: "15x ≡ 9 (mod 24) => gcd(15, 24) = 3 divides 9 => exactly 3 incongruent solutions."
  },
  {
    title: "9. Fermat's Little & Euler's Totient Theorems",
    category: "Modular Exponentiation",
    formula: "Fermat: a^(p-1) ≡ 1 (mod p) for prime p, gcd(a, p) = 1\nEuler: a^φ(n) ≡ 1 (mod n) for composite n, gcd(a, n) = 1\nφ(n) = n ∏ (1 - 1/p_i)",
    description: "Used to reduce astronomical exponents modulo prime or composite numbers.",
    example: "2^100 mod 101 = 1 (by Fermat since 101 is prime and gcd(2, 101)=1)."
  },
  {
    title: "10. Wilson's Theorem & Factorial Modulos",
    category: "Factorials",
    formula: "(p - 1)! ≡ -1 ≡ (p - 1) (mod p) for prime p\n(p - 2)! ≡ 1 (mod p)\n(p - 3)! ≡ (p - 1)/2 (mod p)",
    description: "Computes factorials modulo prime numbers with zero manual expansion.",
    example: "28! mod 29 = 28; 27! mod 29 = 1; 26! mod 29 = (29-1)/2 = 14."
  }
];
