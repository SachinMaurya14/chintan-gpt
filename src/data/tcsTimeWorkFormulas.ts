import { FormulaItem } from "./tcsAveragesFormulas.js";

export const TCS_TIME_WORK_FORMULAS: FormulaItem[] = [
  {
    title: "Basic Work Rate & Reciprocal Rule",
    category: "Time and Work Basics",
    formula: "If a person completes a work in D days:\n• 1 Day's Work = 1 / D\n• Total Days = 1 / (1 Day's Work)\n• Total Work = Rate × Time",
    description: "The fundamental reciprocal relationship between time taken and rate of work.",
    example: "If Amit can finish a task in 12 days, his 1-day work output is 1/12 of the entire project."
  },
  {
    title: "The LCM Method (Total Work Units)",
    category: "LCM Method",
    formula: "1. Assume Total Work = LCM(Time_A, Time_B, Time_C, ...)\n2. Efficiency of Worker = Total Units / Individual Days\n3. Combined Time = Total Work Units / Sum of Efficiencies",
    description: "Converts fractional arithmetic into clean, rapid integer calculations.",
    example: "A in 10 days, B in 15 days: LCM(10, 15) = 30 units. A = 3 units/day, B = 2 units/day. Together = 30 / (3 + 2) = 6 days."
  },
  {
    title: "Efficiency & Time Inverse Ratio",
    category: "Efficiency Ratios",
    formula: "Efficiency ∝ 1 / Time\nEfficiency Ratio A : B = Time Ratio B : A\nIf A is k times as efficient as B: Time_A = Time_B / k",
    description: "Faster workers have higher efficiency and take fewer days in inverse proportion.",
    example: "If A is 3 times as efficient as B (Eff 3:1), the time ratio is 1:3. If B takes 30 days, A takes 10 days."
  },
  {
    title: "Men-Days-Hours-Work Formula (Chain Rule)",
    category: "Chain Rule",
    formula: "(M1 × D1 × H1 × E1) / W1 = (M2 × D2 × H2 × E2) / W2\nwhere M = Men/Workers, D = Days, H = Hours/day, E = Efficiency, W = Work Done/Output.",
    description: "Solves multi-variable workforce, duration, and output scaling problems.",
    example: "12 men working 8 hrs/day complete 1 job in 10 days. 16 men working 6 hrs/day take: (12×8×10)/1 = (16×6×D2)/1 ⇒ D2 = 10 days."
  },
  {
    title: "Pipes & Cisterns: Net Inflow Rate",
    category: "Pipes & Cisterns",
    formula: "Net Rate = ∑(Inlet Rates) − ∑(Outlet Rates)\nNet Time = Total Capacity / Net Rate\nPositive = Filling, Negative = Emptying",
    description: "Inlets perform positive work (filling); drains/outlets perform negative work (emptying).",
    example: "Inlet A fills in 10 hrs (+6 units/hr on 60L), Outlet B empties in 15 hrs (−4 units/hr). Net rate = +2 units/hr. Fill time = 60 / 2 = 30 hrs."
  },
  {
    title: "Tank with Leak at Bottom",
    category: "Leak Problems",
    formula: "1/Time_Leak = 1/Time_Inlet − 1/Time_With_Leak\nEmptying Time of Leak = (T_inlet × T_combined) / (T_combined − T_inlet)",
    description: "Finds how quickly a leak drains a full cistern when the inlet is closed.",
    example: "Tap fills in 6 hrs, but with leak takes 8 hrs. Leak empties full tank in: (6 × 8) / (8 − 6) = 48 / 2 = 24 hrs."
  },
  {
    title: "Work & Wages Division",
    category: "Wages Allocation",
    formula: "Wages Share ∝ Total Work Contributed = (Efficiency × Number of Days Worked)\nIf all work for same duration: Wage Share ∝ Efficiency Ratio",
    description: "Money is always distributed strictly in proportion to the actual work done by each participant.",
    example: "A (eff 3) and B (eff 2) work together on a $500 project. A gets (3/5)×500 = $300, B gets $200."
  },
  {
    title: "Alternate Working Days / Cycles",
    category: "Cyclic Work",
    formula: "1. Find Work Done in 1 Complete Cycle (e.g., 2 days for A then B).\n2. Number of full cycles = ⌊Total Units / Cycle Units⌋\n3. Calculate remaining units and assign to next worker in sequence.",
    description: "Prevents fractional cycle miscalculations when workers rotate shifts.",
    example: "Total 25 units. A (3 u/d), B (2 u/d). 1 cycle (2 days) = 5 units. 4 cycles (8 days) = 20 units. Day 9: A does 3 units (23 total). Day 10: B needs 2/2 = 1 day (or fractional)."
  },
  {
    title: "Leaving Before Completion (T minus x)",
    category: "Leaving & Joining",
    formula: "Method 1: Total Work = Work_remaining_workers × Total_Time + Work_early_leaver × (Total_Time − x)\nMethod 2 (Virtual Work): Add virtual work done by leaver to Total Work, then divide by combined efficiency.",
    description: "Solves problems where a member departs x days prior to project finish.",
    example: "A (10d, 3u), B (15d, 2u), Total 30u. A leaves 2 days before finish. Total time = (30 + 2×3) / (3 + 2) = 36 / 5 = 7.2 days."
  },
  {
    title: "Special Formula: A & B vs Combined (√(a × b))",
    category: "Special Shortcuts",
    formula: "If A takes 'a' days more than (A+B) together, and B takes 'b' days more than (A+B) together:\nTime Taken by (A + B) Together = √(a × b)",
    description: "Instant shortcut for reciprocal relative day deviation problems.",
    example: "A takes 9 days more than (A+B), and B takes 4 days more than (A+B). Time for (A+B) = √(9 × 4) = √36 = 6 days."
  }
];
