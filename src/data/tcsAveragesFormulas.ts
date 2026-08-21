export interface FormulaItem {
  title: string;
  category: string;
  formula: string;
  description: string;
  example: string;
}

export const TCS_AVERAGES_FORMULAS: FormulaItem[] = [
  {
    title: "Basic Average & Sum",
    category: "Average Basics",
    formula: "Average = Sum of observations / Number of observations (N)\nSum = Average × N",
    description: "The arithmetic mean of an evenly or unevenly distributed set of numbers.",
    example: "Average of 10, 15, 20, 25, 30 = (100)/5 = 20."
  },
  {
    title: "Average after Replacement",
    category: "Replacement & Deviation",
    formula: "New Value = Replaced Value + (Total Count × Change in Average)",
    description: "When a member leaves and a new one enters, use the net deviation on the total group.",
    example: "If avg weight of 10 men increases by 1.5 kg when a 60 kg man is replaced: New = 60 + 10(1.5) = 75 kg."
  },
  {
    title: "Adding a New Member / Value",
    category: "Group Additions",
    formula: "New Value = (New Average × New Count) − (Old Average × Old Count)\nShortcut: New Value = New Avg + Old Count × (New Avg − Old Avg)",
    description: "Calculates the contribution of an added member to lift or lower the group average.",
    example: "Avg age of 24 students is 12. If teacher joins, avg becomes 13: Teacher = 13 + 24(1) = 37 years."
  },
  {
    title: "Removing / Leaving a Member",
    category: "Group Exclusions",
    formula: "Removed Value = (Old Average × Old Count) − (New Average × New Count)\nShortcut: Removed Value = Old Avg + New Count × (Old Avg − New Avg)",
    description: "Determines the value of a member who exits the group.",
    example: "Avg weight of 5 people is 50 kg. If 1 leaves and avg becomes 48: Removed = 50 + 4(50 − 48) = 58 kg."
  },
  {
    title: "Combined / Weighted Average",
    category: "Combined Groups",
    formula: "A_combined = (n1·A1 + n2·A2 + ... + nk·Ak) / (n1 + n2 + ... + nk)",
    description: "Finds the unified average when multiple groups of distinct sizes and averages merge.",
    example: "Class A (20 students, avg 60) and Class B (30 students, avg 70): (20×60 + 30×70)/50 = 3300/50 = 66."
  },
  {
    title: "Correcting Wrongly Entered Data",
    category: "Data Correction",
    formula: "Correct Average = Recorded Average + (Correct Value − Incorrect Value) / N",
    description: "Fixes clerical errors without recalculating the entire dataset from scratch.",
    example: "Avg of 50 items was 40. Later 83 was misread as 38: New Avg = 40 + (83 − 38)/50 = 40 + 0.9 = 40.9."
  },
  {
    title: "The Alligation Rule (Cross Ratio)",
    category: "Alligation & Mixtures",
    formula: "Quantity of Cheaper (Q_c) / Quantity of Dearer (Q_d) = (Price_Dearer − Mean Price) / (Mean Price − Price_Cheaper)",
    description: "Determines the mixing ratio of two ingredients at differing price/concentration points to produce a target mixture.",
    example: "Mix pulse at Rs. 15/kg with Rs. 20/kg to get Rs. 16.50/kg: Q15 / Q20 = (20 − 16.5) / (16.5 − 15) = 3.5 / 1.5 = 7 : 3."
  },
  {
    title: "Mixture Unit Cost (Weighted Cost)",
    category: "Alligation & Mixtures",
    formula: "Cost per unit = (q1·c1 + q2·c2 + ... + qk·ck) / (q1 + q2 + ... + qk)",
    description: "Computes the net cost price (CP) per liter/kg of an amalgamated batch.",
    example: "5L milk at Rs. 40 + 3L milk at Rs. 48 = (200 + 144)/8 = Rs. 43/L."
  },
  {
    title: "Selling Price & CP with Profit in Mixtures",
    category: "Mixture Profitability",
    formula: "CP_mixture = SP_mixture / (1 + Profit% / 100)\nThen apply Alligation using CP_mixture as the Mean Price.",
    description: "Converts the given Selling Price with marked profit into the pure Cost Price before applying Alligation.",
    example: "If a merchant sells mixture at Rs. 22/kg making 10% profit: CP_mix = 22 / 1.10 = Rs. 20/kg."
  },
  {
    title: "Repeated Liquid Replacement",
    category: "Successive Dilutions",
    formula: "Final Pure Quantity = Initial Quantity × [1 − (x / V)]^n\nRatio of Pure to Total = [1 − (x / V)]^n",
    description: "Calculates the residual amount of original pure liquid after 'x' units are repeatedly removed and replaced with water 'n' times in a vessel of volume 'V'.",
    example: "40L pure milk. 4L replaced with water 3 times: Milk left = 40 × (1 − 4/40)³ = 40 × (0.9)³ = 29.16 L."
  },
  {
    title: "Average Speed (Total Distance / Total Time)",
    category: "Kinematics & Speed",
    formula: "Average Speed = Total Distance Covered / Total Time Taken\nFor 2 equal distances at speeds v1, v2: Avg Speed = 2·v1·v2 / (v1 + v2) (Harmonic Mean)\nFor 3 equal distances at speeds v1, v2, v3: 3·v1·v2·v3 / (v1·v2 + v2·v3 + v3·v1)",
    description: "Average rate of motion across segmented journeys with variable velocities.",
    example: "Travel to office at 60 km/h and return at 40 km/h: 2(60)(40)/(60+40) = 4800/100 = 48 km/h."
  },
  {
    title: "Free Water / Zero Cost Adulteration",
    category: "Adulteration",
    formula: "If pure milk is sold at Cost Price with water added (cost = 0):\nProfit % = (Quantity of Water / Quantity of Milk) × 100\nRatio of Water : Milk = Profit % : 100",
    description: "Profit earned purely stems from the proportion of free water substituted into the volume.",
    example: "To gain 25% profit selling at CP: Water : Milk = 25 : 100 = 1 : 4."
  }
];
