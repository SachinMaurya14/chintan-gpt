export interface TopicFormulaItem {
  title: string;
  category: string;
  formula: string;
  description: string;
  example: string;
}

export const TCS_PERMUTATIONS_FORMULAS: TopicFormulaItem[] = [
  {
    title: "Fundamental Principles of Counting",
    category: "Basic Principles",
    formula: "Product Rule (AND): m × n\nSum Rule (OR): m + n",
    description: "Multiplication rule when events occur in succession; Addition rule when mutually exclusive alternative paths exist.",
    example: "3 shirts and 4 trousers: 3 × 4 = 12 outfits. 3 bus routes or 2 train routes: 3 + 2 = 5 ways to travel."
  },
  {
    title: "Linear Permutations & Factorials",
    category: "Arrangements",
    formula: "nPr = n! / (n - r)!\nP(n, n) = n!\nn! = n × (n - 1) × ... × 1, 0! = 1",
    description: "Number of arrangements of n distinct items taken r at a time where order matters.",
    example: "Arranging 5 books on a shelf: 5! = 120 ways. 4-letter code from 6 letters: 6P4 = 360 ways."
  },
  {
    title: "Permutations with Repetition / Repeated Letters",
    category: "Repeated Elements",
    formula: "Ways = n! / (p! × q! × r!...)\nwhere p, q, r are counts of repeated elements",
    description: "Dividing total permutations by factorials of frequencies of identical items.",
    example: "Arrangements of 'SUCCESS': 7 letters (S=3, C=2, U=1, E=1) => 7! / (3! × 2!) = 5040 / 12 = 420."
  },
  {
    title: "String / Tie Method (Together) & Gap Method (Never Together)",
    category: "Constrained Arrangements",
    formula: "Together (String): Tie elements as 1 super-element => (n - k + 1)! × k!\nNever Together (Gap): Arrange others in m! ways, place k in (m + 1) gaps => m! × C(m + 1, k) × k!",
    description: "String method for items that must stay together; Gap method for items that must never be adjacent.",
    example: "4 boys & 3 girls so girls never together: 4 boys in 4! = 24 ways, 5 gaps for 3 girls: C(5,3) × 3! = 60 => 24 × 60 = 1440."
  },
  {
    title: "Combinations (Selection)",
    category: "Selections",
    formula: "nCr = n! / [r! (n - r)!]\nnCr = nC(n - r)\nnC0 = nCn = 1, nCr + nC(r - 1) = (n + 1)Cr",
    description: "Number of ways to choose r items from n distinct items where order DOES NOT matter.",
    example: "Forming a committee of 4 from 10 engineers: C(10, 4) = (10 × 9 × 8 × 7) / 24 = 210."
  },
  {
    title: "Circular Permutations",
    category: "Circular Arrangements",
    formula: "Distinct Circular: (n - 1)!\nNecklace / Garland / Key ring (Flip Symmetry): (n - 1)! / 2",
    description: "Around a circle, rotational equivalence eliminates 1 degree of freedom.",
    example: "6 people around a round table: (6 - 1)! = 5! = 120. 7 colored beads in a necklace: 6! / 2 = 360."
  },
  {
    title: "Distribution & Stars and Bars",
    category: "Partitioning",
    formula: "Non-negative integer solutions (x1 + ... + xr = n, xi >= 0): C(n + r - 1, r - 1)\nPositive integer solutions (xi >= 1): C(n - 1, r - 1)",
    description: "Distributing n identical items into r distinct boxes/groups.",
    example: "Distributing 10 identical chocolates to 3 children (each gets >= 0): C(10 + 3 - 1, 3 - 1) = C(12, 2) = 66."
  },
  {
    title: "Derangements (None in original position)",
    category: "Subfactorial Counting",
    formula: "D(n) = n! [1 - 1/1! + 1/2! - 1/3! + ... + (-1)^n / n!]\nD(1)=0, D(2)=1, D(3)=2, D(4)=9, D(5)=44, D(6)=265",
    description: "Number of permutations where no element appears in its original position.",
    example: "4 letters into 4 wrong envelopes: D(4) = 9 ways."
  },
  {
    title: "Geometry Combinations (Points, Lines, Triangles, Diagonals)",
    category: "Geometric Counting",
    formula: "Straight Lines from n points (no 3 collinear): C(n, 2)\nTriangles from n points: C(n, 3)\nPolygon Diagonals with n vertices: n(n - 3) / 2 = C(n, 2) - n",
    description: "Counting geometric figures formed by non-collinear or collinear point sets.",
    example: "An octagon (n = 8) has: 8(8 - 3) / 2 = (8 × 5) / 2 = 20 diagonals."
  },
  {
    title: "Grid Path Counting (Lattice Paths)",
    category: "Grid Combinatorics",
    formula: "Paths from (0,0) to (m, n) with Right (R) and Up (U) steps = (m + n)! / (m! × n!) = C(m + n, m)",
    description: "Shortest Manhattan grid path routing with directional constraints.",
    example: "Moving from (0,0) to (4,3): C(4 + 3, 3) = C(7, 3) = 35 paths."
  }
];
