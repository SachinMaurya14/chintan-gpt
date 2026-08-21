import { FormulaItem } from "./tcsLcmHcfFormulas.js";

export const TCS_NUMBER_SYSTEM_FORMULAS: FormulaItem[] = [
  {
    title: "A. Master Divisibility Rules",
    category: "Divisibility",
    formula: "• 2, 4, 8, 16: Last 1, 2, 3, 4 digits divisible\n• 3, 9: Sum of digits divisible\n• 5, 25, 125: Last 1, 2, 3 digits divisible\n• 6: Divisible by 2 AND 3\n• 7, 11, 13: Alternating 3-digit block sum difference divisible\n• 11: (Sum odd pos digits - Sum even pos digits) = 0 or 11k\n• 72: 8 × 9; 88: 8 × 11; 99: 9 × 11",
    description: "Composite divisibility checks require decomposing into pairwise coprime factors (gcd = 1).",
    example: "Check 88 => Last 3 digits div by 8, and alternating digit difference div by 11."
  },
  {
    title: "B. Unit Digit Cyclicity Master Table",
    category: "Unit Digits",
    formula: "• Cyclicity 1: 0, 1, 5, 6 (Always ends in same digit)\n• Cyclicity 2: 4 (4^odd=4, 4^even=6), 9 (9^odd=9, 9^even=1)\n• Cyclicity 4: 2 (2,4,8,6), 3 (3,9,7,1), 7 (7,9,3,1), 8 (8,4,2,6)\nRule: Unit digit = d^(power mod 4) [if power mod 4 = 0, use d^4]",
    description: "Determine the unit digit of large exponential expressions in seconds.",
    example: "7^102 => 102 mod 4 = 2 => 7^2 ends in 9."
  },
  {
    title: "C. Remainder Theorem & Negative Remainders",
    category: "Remainders",
    formula: "• (A × B) mod m = [(A mod m) × (B mod m)] mod m\n• (A + B) mod m = [(A mod m) + (B mod m)] mod m\n• Negative Remainder: -r ≡ m - r (mod m)",
    description: "Using negative remainders drastically simplifies large power computations.",
    example: "67^67 mod 68 ≡ (-1)^67 = -1 ≡ 67 (mod 68)."
  },
  {
    title: "D. Algebraic Divisibility Theorems",
    category: "Algebraic Remainders",
    formula: "• (x^n - a^n) is always divisible by (x - a) for all n.\n• (x^n - a^n) is divisible by (x + a) for EVEN n only.\n• (x^n + a^n) is divisible by (x + a) for ODD n only.\n• (x^n + a^n) is NEVER divisible by (x - a).",
    description: "Core algebraic factor identities for competitive exams.",
    example: "13^73 + 14^73 is divisible by 13 + 14 = 27 (since n = 73 is odd)."
  },
  {
    title: "E. Fermat's Little Theorem",
    category: "Modular Arithmetic",
    formula: "a^(p - 1) ≡ 1 (mod p)\nwhere p is prime and gcd(a, p) = 1.\nCorollary: a^p ≡ a (mod p)",
    description: "Reduces huge powers modulo a prime number by cycling modulo (p - 1).",
    example: "2^100 mod 101 = 1 (since 101 is prime and gcd(2, 101) = 1)."
  },
  {
    title: "F. Euler's Totient Function & Euler's Theorem",
    category: "Totient Theory",
    formula: "φ(n) = n × ∏(1 - 1/p_i)\na^φ(n) ≡ 1 (mod n) for composite n with gcd(a, n) = 1",
    description: "Generalization of Fermat's Little Theorem for composite moduli.",
    example: "φ(100) = 100(1 - 1/2)(1 - 1/5) = 40 => 3^40 ≡ 1 (mod 100)."
  },
  {
    title: "G. Wilson's Theorem & Factorials",
    category: "Factorials",
    formula: "For any prime p:\n• (p - 1)! ≡ -1 ≡ p - 1 (mod p)\n• (p - 2)! ≡ 1 (mod p)\n• (p - 3)! ≡ (p - 1)/2 (mod p)",
    description: "Evaluates factorials modulo prime numbers.",
    example: "16! mod 17: 16! ≡ (17 - 1)/2? No, (p - 2)! = 15! ≡ 1 mod 17; 16! = 16 ≡ -1 mod 17."
  },
  {
    title: "H. Legendre's Prime Exponent Formula",
    category: "Prime Exponent",
    formula: "E_p(n!) = ⌊n/p⌋ + ⌊n/p²⌋ + ⌊n/p³⌋ + ⌊n/p⁴⌋ + ...\nStop when p^k > n.",
    description: "Finds the exact highest power of prime p that divides n!.",
    example: "E_3(50!) = ⌊50/3⌋ + ⌊50/9⌋ + ⌊50/27⌋ = 16 + 5 + 1 = 22."
  },
  {
    title: "I. Trailing Zeros Formula",
    category: "Trailing Zeros",
    formula: "Trailing Zeros in n! = E_5(n!) = ⌊n/5⌋ + ⌊n/25⌋ + ⌊n/125⌋ + ...\nIn general product, Trailing Zeros = min(power of 2, power of 5).",
    description: "Determined by counting 10 = 2 × 5 factor pairs.",
    example: "Trailing zeros in 100! = 20 + 4 = 24 zeros."
  },
  {
    title: "J. Divisor Formulas (Count, Sum, Product)",
    category: "Divisor Theory",
    formula: "For N = p1^a · p2^b · p3^c:\n• Total Divisors d(N) = (a + 1)(b + 1)(c + 1)\n• Odd Divisors = (b + 1)(c + 1) [where p1 = 2]\n• Even Divisors = a(b + 1)(c + 1)\n• Sum of Divisors σ(N) = [(p1^(a+1) - 1)/(p1 - 1)] × ...\n• Product of Divisors = N^(d(N)/2)",
    description: "Complete analytical properties of all factors of any natural number.",
    example: "N = 720 = 2^4 × 3^2 × 5^1 => d(720) = 5 × 3 × 2 = 30."
  },
  {
    title: "K. Perfect Square & Cube Divisors",
    category: "Powers",
    formula: "• Square Divisors = (⌊a/2⌋ + 1)(⌊b/2⌋ + 1)(⌊c/2⌋ + 1)\n• Cube Divisors = (⌊a/3⌋ + 1)(⌊b/3⌋ + 1)(⌊c/3⌋ + 1)",
    description: "Selects only even or multiple-of-3 exponents in prime factorization.",
    example: "N = 2^6 × 3^4 × 5^2 => Square divisors = (3+1)(2+1)(1+1) = 24."
  },
  {
    title: "L. Repeated Digit Numbers (Repunits & Blocks)",
    category: "Repunits",
    formula: "• abcabc = abc × 1001 = abc × 7 × 11 × 13\n• ababab = ab × 10101 = ab × 3 × 7 × 13 × 37\n• 111111 (6 ones) = 3 × 7 × 11 × 13 × 37",
    description: "Special repeating block patterns frequently tested in TCS Digital/Prime.",
    example: "Any 6-digit number formed by repeating 3 digits is divisible by 7, 11, 13, and 1001."
  }
];
