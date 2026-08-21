export interface TopicFormulaItem {
  title: string;
  category: string;
  formula: string;
  description: string;
  example: string;
}

export const TCS_TIME_SPEED_DISTANCE_FORMULAS: TopicFormulaItem[] = [
  {
    title: "Basic Speed, Distance, and Time Relations",
    category: "Fundamental Rules",
    formula: "Speed (S) = Distance (D) / Time (T)\nDistance (D) = S × T\nTime (T) = D / S",
    description: "Fundamental dimensional relationship. For constant distance, Speed is inversely proportional to Time (S1/S2 = T2/T1).",
    example: "If speed ratio is 4 : 5, time ratio for same distance is 5 : 4."
  },
  {
    title: "Unit Conversion Factors",
    category: "Conversions",
    formula: "1 km/h = 5/18 m/s ≈ 0.2778 m/s\n1 m/s = 18/5 km/h = 3.6 km/h",
    description: "Direct conversion multipliers between metric units for train and vehicle kinematic problems.",
    example: "72 km/h = 72 × (5/18) = 20 m/s; 25 m/s = 25 × (18/5) = 90 km/h."
  },
  {
    title: "Average Speed (Equal Distances & Harmonic Mean)",
    category: "Average Speed",
    formula: "Equal 2 Halves: Avg Speed = 2xy / (x + y)\nEqual 3 Parts: Avg Speed = 3xyz / (xy + yz + zx)",
    description: "Harmonic mean of speeds when distances covered are strictly equal.",
    example: "Going at 60 km/h and returning at 40 km/h: Avg Speed = 2(60)(40)/(60+40) = 48 km/h."
  },
  {
    title: "Relative Speed (Collinear & Same/Opposite Directions)",
    category: "Relative Speed",
    formula: "Opposite Directions: S_rel = S1 + S2\nSame Direction: S_rel = |S1 - S2|",
    description: "Effective velocity between two moving bodies along a straight path or track.",
    example: "Two trains moving towards each other at 50 km/h and 40 km/h close the gap at 90 km/h."
  },
  {
    title: "Train Crossing Objects (Stationary & Moving)",
    category: "Trains",
    formula: "Crossing Point Object (Pole/Person): Time = L_train / S_train\nCrossing Platform/Bridge: Time = (L_train + L_platform) / S_train\nCrossing Moving Train: Time = (L1 + L2) / S_rel",
    description: "Total distance covered equals sum of lengths of train and target object.",
    example: "A 200m train at 72 km/h (20 m/s) crosses a 300m platform in (200+300)/20 = 25 seconds."
  },
  {
    title: "Boats & Streams (Upstream & Downstream)",
    category: "Boats & Streams",
    formula: "Downstream Speed (D) = u + v\nUpstream Speed (U) = u - v\nStill Water Speed (u) = (D + U) / 2\nStream Speed (v) = (D - U) / 2",
    description: "u is speed of boat in still water; v is speed of water current/stream.",
    example: "If Downstream is 18 km/h and Upstream is 12 km/h, Still Water speed is 15 km/h, Current is 3 km/h."
  },
  {
    title: "Late and Early Departure/Arrival Rule",
    category: "Time Variations",
    formula: "Distance (D) = (S1 × S2 / |S1 - S2|) × (ΔT in hours)",
    description: "Quick calculation of exact distance when traveling at speed S1 makes one late by t1 and S2 makes one early by t2.",
    example: "At 4 km/h late by 10 min, at 5 km/h early by 5 min: ΔT = 15 min = 1/4 hr. D = (4×5/1) × (1/4) = 5 km."
  },
  {
    title: "Stoppage Time per Hour",
    category: "Stoppages",
    formula: "Stoppage Time (min/hr) = [(Speed_without - Speed_with) / Speed_without] × 60",
    description: "Calculates total rest/halt duration per hour when average speed decreases due to stops.",
    example: "Speed without stops = 54 km/h, with stops = 45 km/h: Stoppage = (9/54) × 60 = 10 min/hour."
  },
  {
    title: "Races and Head Starts",
    category: "Races & Tracks",
    formula: "Distance Head-start: A gives B 'x' meters in race of L => B runs (L - x) while A runs L.\nTime Head-start: A gives B 't' seconds => Time_B = Time_A + t.",
    description: "Comparison of velocities, distance offsets, and time allowances in linear track races.",
    example: "In a 100m race, A beats B by 10m or 2s => B's speed = 10m / 2s = 5 m/s."
  },
  {
    title: "Circular Track Overlap & First Meeting",
    category: "Circular Tracks",
    formula: "Time to Meet at Start: LCM(L/S1, L/S2)\nTime to First Meet Anywhere (Opposite): L / (S1 + S2)\nTime to First Meet Anywhere (Same): L / |S1 - S2|",
    description: "Periodic alignment intervals for multiple runners on a closed loop of circumference L.",
    example: "Track 600m, speeds 15 m/s and 10 m/s in same direction: Meet anywhere every 600/5 = 120s."
  }
];
