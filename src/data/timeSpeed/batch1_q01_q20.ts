import { PlacementQuestion } from "../tcsPercentagesQuestions.js";

export const BATCH_1_QUESTIONS: PlacementQuestion[] = [
  {
    id: "Q01",
    questionNumber: 1,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A delivery van travels a distance of 180 km in 4 hours and 30 minutes. What is the speed of the van in meters per second (m/s)?",
    options: [
      { key: "A", text: "10.55 m/s" },
      { key: "B", text: "11.11 m/s" },
      { key: "C", text: "12.50 m/s" },
      { key: "D", text: "14.25 m/s" }
    ],
    correctAnswer: "B",
    solution: "1. Formula: Speed (km/h) = Distance / Time\n2. Time = 4 hours 30 minutes = 4.5 hours = 9/2 hours.\n3. Speed in km/h = 180 / 4.5 = 40 km/h.\n4. Convert km/h to m/s by multiplying with (5/18):\n   Speed in m/s = 40 × (5/18) = 200 / 18 = 100 / 9 ≈ 11.11 m/s.\nCorrect Option: B (11.11 m/s)."
  },
  {
    id: "Q02",
    questionNumber: 2,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "Convert a speed of 27.5 m/s directly into kilometers per hour (km/h).",
    options: [
      { key: "A", text: "95 km/h" },
      { key: "B", text: "98 km/h" },
      { key: "C", text: "99 km/h" },
      { key: "D", text: "102 km/h" }
    ],
    correctAnswer: "C",
    solution: "1. Formula: Speed (km/h) = Speed (m/s) × (18/5).\n2. Speed in km/h = 27.5 × (18/5) = 5.5 × 18 = 99 km/h.\nCorrect Option: C (99 km/h)."
  },
  {
    id: "Q03",
    questionNumber: 3,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "An engineer drives from City A to City B at an average speed of 60 km/h and returns along the exact same route at an average speed of 40 km/h. What is the average speed for the entire round trip?",
    options: [
      { key: "A", text: "48 km/h" },
      { key: "B", text: "50 km/h" },
      { key: "C", text: "52 km/h" },
      { key: "D", text: "54 km/h" }
    ],
    correctAnswer: "A",
    solution: "1. Formula for equal-distance average speed: Avg Speed = (2 × x × y) / (x + y).\n2. Here x = 60 km/h, y = 40 km/h.\n3. Avg Speed = (2 × 60 × 40) / (60 + 40) = 4800 / 100 = 48 km/h.\n(Note: Simple arithmetic average 50 km/h is incorrect because time spent at slower speed is higher).\nCorrect Option: A (48 km/h)."
  },
  {
    id: "Q04",
    questionNumber: 4,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A commuter covers one-third of a journey at 20 km/h, one-third at 30 km/h, and the remaining one-third at 60 km/h. What is the average speed of the commuter for the complete journey?",
    options: [
      { key: "A", text: "28 km/h" },
      { key: "B", text: "30 km/h" },
      { key: "C", text: "32 km/h" },
      { key: "D", text: "36 km/h" }
    ],
    correctAnswer: "B",
    solution: "1. Formula for 3 equal distances: Avg Speed = 3 / [(1/x) + (1/y) + (1/z)].\n2. Let total distance = 3 × LCM(20, 30, 60) = 3 × 60 = 180 km (each part = 60 km).\n3. Time for part 1 = 60 / 20 = 3 hours.\n4. Time for part 2 = 60 / 30 = 2 hours.\n5. Time for part 3 = 60 / 60 = 1 hour.\n6. Total Time = 3 + 2 + 1 = 6 hours.\n7. Avg Speed = Total Distance / Total Time = 180 / 6 = 30 km/h.\nCorrect Option: B (30 km/h)."
  },
  {
    id: "Q05",
    questionNumber: 5,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "Two cars start from points A and B, situated 360 km apart, at the same time and travel towards each other with speeds of 45 km/h and 55 km/h respectively. After how many hours will they cross each other?",
    options: [
      { key: "A", text: "3.2 hours" },
      { key: "B", text: "3.6 hours" },
      { key: "C", text: "4.0 hours" },
      { key: "D", text: "4.5 hours" }
    ],
    correctAnswer: "B",
    solution: "1. Formula: Time to meet = Distance / Relative Speed (opposite direction).\n2. Relative Speed = S1 + S2 = 45 + 55 = 100 km/h.\n3. Distance = 360 km.\n4. Meeting Time = 360 / 100 = 3.6 hours (or 3 hours 36 minutes).\nCorrect Option: B (3.6 hours)."
  },
  {
    id: "Q06",
    questionNumber: 6,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A thief escapes from a police station in a car at 60 km/h. Exactly 45 minutes later, a police squad car pursues the thief from the same point at an average speed of 80 km/h. At what distance from the police station will the police overtake the thief?",
    options: [
      { key: "A", text: "150 km" },
      { key: "B", text: "160 km" },
      { key: "C", text: "180 km" },
      { key: "D", text: "200 km" }
    ],
    correctAnswer: "C",
    solution: "1. Head start of thief in 45 min (3/4 hr) = 60 × (3/4) = 45 km.\n2. Relative speed in same direction = 80 - 60 = 20 km/h.\n3. Time taken to catch thief = Distance / Relative Speed = 45 / 20 = 2.25 hours.\n4. Distance traveled by police car = Speed × Time = 80 × 2.25 = 180 km.\nCorrect Option: C (180 km)."
  },
  {
    id: "Q07",
    questionNumber: 7,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A train 240 meters long is traveling at a uniform speed of 72 km/h. How many seconds will it take to pass a stationary telegraph post beside the tracks?",
    options: [
      { key: "A", text: "10 seconds" },
      { key: "B", text: "12 seconds" },
      { key: "C", text: "14 seconds" },
      { key: "D", text: "15 seconds" }
    ],
    correctAnswer: "B",
    solution: "1. When passing a pole/point object, Distance = Length of Train = 240 m.\n2. Speed in m/s = 72 × (5/18) = 20 m/s.\n3. Time = Distance / Speed = 240 / 20 = 12 seconds.\nCorrect Option: B (12 seconds)."
  },
  {
    id: "Q08",
    questionNumber: 8,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A 350-meter-long express train running at 90 km/h crosses a railway platform in 26 seconds. What is the length of the railway platform?",
    options: [
      { key: "A", text: "250 meters" },
      { key: "B", text: "280 meters" },
      { key: "C", text: "300 meters" },
      { key: "D", text: "320 meters" }
    ],
    correctAnswer: "C",
    solution: "1. Speed in m/s = 90 × (5/18) = 25 m/s.\n2. Total Distance covered in 26 seconds = Speed × Time = 25 × 26 = 650 meters.\n3. Total Distance = Length of Train + Length of Platform.\n4. Length of Platform = 650 - 350 = 300 meters.\nCorrect Option: C (300 meters)."
  },
  {
    id: "Q09",
    questionNumber: 9,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A train passes a 180-meter-long bridge in 20 seconds and a 260-meter-long bridge in 24 seconds at a constant speed. What is the length of the train?",
    options: [
      { key: "A", text: "200 meters" },
      { key: "B", text: "220 meters" },
      { key: "C", text: "240 meters" },
      { key: "D", text: "260 meters" }
    ],
    correctAnswer: "B",
    solution: "1. Let length of train be L and speed be S.\n2. Distance 1 = L + 180 = 20S.\n3. Distance 2 = L + 260 = 24S.\n4. Subtracting equation 1 from 2:\n   (L + 260) - (L + 180) = 24S - 20S\n   80 = 4S => S = 20 m/s.\n5. Substitute S in Eq 1: L + 180 = 20 × 20 = 400 => L = 400 - 180 = 220 meters.\nCorrect Option: B (220 meters)."
  },
  {
    id: "Q10",
    questionNumber: 10,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "Two trains of lengths 160 meters and 140 meters are running towards each other on parallel tracks at speeds of 58 km/h and 50 km/h respectively. In how many seconds will they completely cross each other after meeting?",
    options: [
      { key: "A", text: "8 seconds" },
      { key: "B", text: "10 seconds" },
      { key: "C", text: "12 seconds" },
      { key: "D", text: "15 seconds" }
    ],
    correctAnswer: "B",
    solution: "1. Total Distance = L1 + L2 = 160 + 140 = 300 meters.\n2. Relative Speed (opposite direction) = 58 + 50 = 108 km/h.\n3. Convert relative speed to m/s: 108 × (5/18) = 6 × 5 = 30 m/s.\n4. Time to cross = Total Distance / Relative Speed = 300 / 30 = 10 seconds.\nCorrect Option: B (10 seconds)."
  },
  {
    id: "Q11",
    questionNumber: 11,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Two trains of lengths 200 m and 150 m are running in the same direction on parallel tracks at speeds of 75 km/h and 39 km/h respectively. How long will it take for the faster train to completely pass the slower train?",
    options: [
      { key: "A", text: "25 seconds" },
      { key: "B", text: "30 seconds" },
      { key: "C", text: "35 seconds" },
      { key: "D", text: "40 seconds" }
    ],
    correctAnswer: "C",
    solution: "1. Total Distance = L1 + L2 = 200 + 150 = 350 meters.\n2. Relative Speed in same direction = 75 - 39 = 36 km/h.\n3. Convert to m/s: 36 × (5/18) = 10 m/s.\n4. Time taken = Total Distance / Relative Speed = 350 / 10 = 35 seconds.\nCorrect Option: C (35 seconds)."
  },
  {
    id: "Q12",
    questionNumber: 12,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A train leaves Station X at 7:00 AM traveling towards Station Y at 50 km/h. Another train leaves Station Y at 8:00 AM traveling towards Station X at 60 km/h. The distance between Station X and Station Y is 270 km. At what time will the two trains cross each other?",
    options: [
      { key: "A", text: "9:30 AM" },
      { key: "B", text: "10:00 AM" },
      { key: "C", text: "10:15 AM" },
      { key: "D", text: "10:30 AM" }
    ],
    correctAnswer: "B",
    solution: "1. From 7:00 AM to 8:00 AM (1 hour), the first train travels: 50 km/h × 1 hr = 50 km.\n2. Remaining distance between trains at 8:00 AM = 270 - 50 = 220 km.\n3. Relative speed (opposite directions) = 50 + 60 = 110 km/h.\n4. Time required after 8:00 AM = 220 / 110 = 2 hours.\n5. Crossing time = 8:00 AM + 2 hours = 10:00 AM.\nCorrect Option: B (10:00 AM)."
  },
  {
    id: "Q13",
    questionNumber: 13,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "If an IT professional walks from home to office at 4 km/h, he arrives 10 minutes late. If he increases his walking speed to 5 km/h, he arrives 5 minutes early. What is the distance between his home and office?",
    options: [
      { key: "A", text: "4 km" },
      { key: "B", text: "5 km" },
      { key: "C", text: "6 km" },
      { key: "D", text: "7.5 km" }
    ],
    correctAnswer: "B",
    solution: "1. Formula: Distance = (S1 × S2 / |S1 - S2|) × (Total time difference in hours).\n2. Total time difference = (10 min late) + (5 min early) = 15 minutes = 15/60 = 1/4 hour.\n3. Here S1 = 4 km/h, S2 = 5 km/h, |S1 - S2| = 1 km/h.\n4. Distance = (4 × 5 / 1) × (1/4) = 20 × (1/4) = 5 km.\nCorrect Option: B (5 km)."
  },
  {
    id: "Q14",
    questionNumber: 14,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "Excluding stoppages, the average speed of an interstate bus is 54 km/h, and including stoppages, it is 45 km/h. For how many minutes does the bus stop per hour on average?",
    options: [
      { key: "A", text: "8 minutes" },
      { key: "B", text: "10 minutes" },
      { key: "C", text: "12 minutes" },
      { key: "D", text: "15 minutes" }
    ],
    correctAnswer: "B",
    solution: "1. Formula: Stoppage time (min/hr) = [(Speed without stops - Speed with stops) / Speed without stops] × 60.\n2. Stoppage time = [(54 - 45) / 54] × 60 = (9 / 54) × 60 = (1 / 6) × 60 = 10 minutes.\nCorrect Option: B (10 minutes)."
  },
  {
    id: "Q15",
    questionNumber: 15,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a 1000-meter track race, Athlete A beats Athlete B by 50 meters or 10 seconds. What is the time taken by Athlete A to complete the entire 1000-meter race?",
    options: [
      { key: "A", text: "180 seconds" },
      { key: "B", text: "190 seconds" },
      { key: "C", text: "200 seconds" },
      { key: "D", text: "210 seconds" }
    ],
    correctAnswer: "B",
    solution: "1. B takes 10 seconds to cover the remaining 50 meters.\n2. Speed of B = 50 m / 10 s = 5 m/s.\n3. Total time taken by B to run 1000 m = 1000 / 5 = 200 seconds.\n4. Since A beats B by 10 seconds, Time taken by A = 200 - 10 = 190 seconds.\nCorrect Option: B (190 seconds)."
  },
  {
    id: "Q16",
    questionNumber: 16,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Two cyclists A and B start simultaneously from the same starting point on a circular track of circumference 600 meters in the same direction with speeds of 15 m/s and 10 m/s respectively. After how many seconds will they meet for the first time anywhere on the track?",
    options: [
      { key: "A", text: "60 seconds" },
      { key: "B", text: "100 seconds" },
      { key: "C", text: "120 seconds" },
      { key: "D", text: "150 seconds" }
    ],
    correctAnswer: "C",
    solution: "1. Formula: Time to first meet on circular track (same direction) = Circumference / (Relative Speed).\n2. Relative Speed = |15 - 10| = 5 m/s.\n3. Circumference = 600 meters.\n4. Time = 600 / 5 = 120 seconds (2 minutes).\nCorrect Option: C (120 seconds)."
  },
  {
    id: "Q17",
    questionNumber: 17,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A motorboat can travel at a speed of 14 km/h in still water. If the speed of the river current is 4 km/h, what is the speed of the boat downstream and upstream respectively?",
    options: [
      { key: "A", text: "18 km/h and 10 km/h" },
      { key: "B", text: "16 km/h and 8 km/h" },
      { key: "C", text: "19 km/h and 11 km/h" },
      { key: "D", text: "20 km/h and 12 km/h" }
    ],
    correctAnswer: "A",
    solution: "1. Downstream Speed = Boat Speed in Still Water (u) + Current Speed (v) = 14 + 4 = 18 km/h.\n2. Upstream Speed = Boat Speed in Still Water (u) - Current Speed (v) = 14 - 4 = 10 km/h.\nCorrect Option: A (18 km/h and 10 km/h)."
  },
  {
    id: "Q18",
    questionNumber: 18,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy-Moderate",
    question: "A rower rows 36 km downstream in 3 hours and rows the same distance upstream in 6 hours. What is the speed of the river current?",
    options: [
      { key: "A", text: "2 km/h" },
      { key: "B", text: "3 km/h" },
      { key: "C", text: "4 km/h" },
      { key: "D", text: "4.5 km/h" }
    ],
    correctAnswer: "B",
    solution: "1. Downstream speed (D) = 36 / 3 = 12 km/h.\n2. Upstream speed (U) = 36 / 6 = 6 km/h.\n3. Formula: Speed of stream (v) = (D - U) / 2.\n4. v = (12 - 6) / 2 = 6 / 2 = 3 km/h.\n(Also, still water speed u = (12 + 6)/2 = 9 km/h).\nCorrect Option: B (3 km/h)."
  },
  {
    id: "Q19",
    questionNumber: 19,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A motorboat whose speed in still water is 15 km/h goes 30 km downstream and comes back to the starting point in a total time of 4 hours and 30 minutes. What is the speed of the water current?",
    options: [
      { key: "A", text: "3 km/h" },
      { key: "B", text: "4 km/h" },
      { key: "C", text: "5 km/h" },
      { key: "D", text: "6 km/h" }
    ],
    correctAnswer: "C",
    solution: "1. Let speed of current be v km/h. Total Time = 4.5 hours = 9/2 hours.\n2. Time downstream + Time upstream = 30 / (15 + v) + 30 / (15 - v) = 9/2.\n3. 30 × [(15 - v + 15 + v) / (225 - v²)] = 9/2\n   30 × [30 / (225 - v²)] = 9/2\n   900 / (225 - v²) = 9/2\n   100 / (225 - v²) = 1/2\n   225 - v² = 200\n   v² = 25 => v = 5 km/h.\nCorrect Option: C (5 km/h)."
  },
  {
    id: "Q20",
    questionNumber: 20,
    topic: "Time, Speed and Distance & Relative Speed (Trains, Boats)",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A motorist drove a total distance of 300 km in 5 hours. Part of the journey was covered by national highway at 70 km/h and the remaining through city roads at 45 km/h. What was the distance traveled by the motorist on the national highway?",
    options: [
      { key: "A", text: "190 km" },
      { key: "B", text: "200 km" },
      { key: "C", text: "210 km" },
      { key: "D", text: "225 km" }
    ],
    correctAnswer: "C",
    solution: "1. Let time on highway be t hours, then time on city roads = (5 - t) hours.\n2. Equation: 70(t) + 45(5 - t) = 300\n   70t + 225 - 45t = 300\n   25t = 75 => t = 3 hours.\n3. Distance on national highway = 70 km/h × 3 hours = 210 km.\n(Check: City distance = 45 × 2 = 90 km. Total = 210 + 90 = 300 km).\nCorrect Option: C (210 km)."
  }
];
