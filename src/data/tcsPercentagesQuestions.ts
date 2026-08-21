export interface PlacementQuestion {
  id: string;
  questionNumber: number;
  question: string;
  options: { key: "A" | "B" | "C" | "D"; text: string }[];
  correctAnswer: "A" | "B" | "C" | "D";
  solution: string;
  isInconsistent?: boolean;
  inconsistencyNote?: string;
  topic: string;
  category: string;
  section: string;
  exam: string;
  difficulty: "Easy" | "Moderate" | "Tricky" | "High-level" | "Foundation" | "Advanced" | "Placement Level" | "Mixed Advanced" | string;
}

export const TCS_PERCENTAGES_QUESTIONS: PlacementQuestion[] = [
  // ==================== PART 1: Q1 - Q20 ====================
  {
    id: "Q1",
    questionNumber: 1,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "If the price of cooking oil increases by 25%, by what percentage must a household reduce its consumption so that the overall monthly expenditure on oil remains unchanged?",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "25%" },
      { key: "C", text: "16.66%" },
      { key: "D", text: "15%" }
    ],
    correctAnswer: "A",
    solution: "Reduction required = 25 / (100 + 25) × 100 = 25 / 125 × 100 = 20%."
  },
  {
    id: "Q2",
    questionNumber: 2,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A retailer offers two successive discounts of 20% and 15% on a mechanical keyboard. What single equivalent discount percentage does this correspond to?",
    options: [
      { key: "A", text: "35%" },
      { key: "B", text: "32%" },
      { key: "C", text: "30%" },
      { key: "D", text: "28%" }
    ],
    correctAnswer: "B",
    solution: "Equivalent discount = 20 + 15 − (20 × 15)/100 = 35 − 3 = 32%."
  },
  {
    id: "Q3",
    questionNumber: 3,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "If A's salary is 40% less than that of B, by what percentage is B's salary more than that of A?",
    options: [
      { key: "A", text: "40%" },
      { key: "B", text: "60%" },
      { key: "C", text: "66.66%" },
      { key: "D", text: "75%" }
    ],
    correctAnswer: "C",
    solution: "Let B = 100. A = 60. B is greater than A by 40. Percentage by which B is more than A: = 40/60 × 100 = 66.66%."
  },
  {
    id: "Q4",
    questionNumber: 4,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The strength of a university increased by 10% in the first year and decreased by 10% in the second year due to fee restructuring. What is the net percentage change in total strength over the two years?",
    options: [
      { key: "A", text: "No change" },
      { key: "B", text: "1% increase" },
      { key: "C", text: "1% decrease" },
      { key: "D", text: "2% decrease" }
    ],
    correctAnswer: "C",
    solution: "Successive percentage change: = 10 − 10 − (10 × 10)/100 = −1%. Therefore, there is a 1% decrease."
  },
  {
    id: "Q5",
    questionNumber: 5,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A student required 36% marks to clear an aptitude test. He scored 124 marks and failed by 20 marks. Find the maximum possible marks in the examination.",
    options: [
      { key: "A", text: "360" },
      { key: "B", text: "400" },
      { key: "C", text: "450" },
      { key: "D", text: "500" }
    ],
    correctAnswer: "B",
    solution: "Passing marks = 124 + 20 = 144. 36% of maximum marks = 144. Maximum marks = 144 × 100 / 36 = 400."
  },
  {
    id: "Q6",
    questionNumber: 6,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The length of a rectangular testing laboratory increases by 20% while its breadth decreases by 15%. What is the net percentage change in the area of the laboratory?",
    options: [
      { key: "A", text: "Increases by 5%" },
      { key: "B", text: "Increases by 2%" },
      { key: "C", text: "Decreases by 2%" },
      { key: "D", text: "Decreases by 5%" }
    ],
    correctAnswer: "B",
    solution: "Area is proportional to length × breadth. Multiplier: = 1.20 × 0.85 = 1.02. Therefore area increases by 2%."
  },
  {
    id: "Q7",
    questionNumber: 7,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Aman allocates 30% of his monthly income to rent, 25% of the remaining amount on groceries, and 20% of the rest on loan EMIs. If he finally deposits the remaining Rs. 16,800 into a mutual fund, what is his total monthly income?",
    options: [
      { key: "A", text: "Rs. 40,000" },
      { key: "B", text: "Rs. 45,000" },
      { key: "C", text: "Rs. 50,000" },
      { key: "D", text: "Rs. 60,000" }
    ],
    correctAnswer: "A",
    solution: "After rent: Remaining = 70%. After groceries: Remaining = 70% × 75% = 52.5%. After EMI: Remaining = 52.5% × 80% = 42%. Therefore: 42% of income = Rs. 16,800. Income = 16,800 / 0.42 = Rs. 40,000."
  },
  {
    id: "Q8",
    questionNumber: 8,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In an online assessment, 72% of students cleared the Quantitative Section, and 68% cleared the Reasoning Section. If 15% failed in both sections and 330 students cleared both sections, find the total number of candidates who appeared.",
    options: [
      { key: "A", text: "550" },
      { key: "B", text: "600" },
      { key: "C", text: "650" },
      { key: "D", text: "700" }
    ],
    correctAnswer: "B",
    solution: "Passed at least one section = 100% − 15% = 85%. Using: Quantitative + Reasoning − At least one = Both. Both = 72% + 68% − 85% = 55%. 55% of total candidates = 330. Total candidates = 330 / 0.55 = 600."
  },
  {
    id: "Q9",
    questionNumber: 9,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The entry fee for an IT tech summit was reduced by 20%, which resulted in an increase of 40% in total ticket sales. What was the net percentage change in the total revenue collected by the organizers?",
    options: [
      { key: "A", text: "12% increase" },
      { key: "B", text: "20% increase" },
      { key: "C", text: "16% increase" },
      { key: "D", text: "8% decrease" }
    ],
    correctAnswer: "A",
    solution: "Revenue = price × quantity. New revenue multiplier: = 0.80 × 1.40 = 1.12. Therefore revenue increases by 12%."
  },
  {
    id: "Q10",
    questionNumber: 10,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Due to economic inflation, the price of raw steel increases successively by 10% and then by 20%. To offset transport costs, the distributor further increases the final price by 5%. What is the net overall percentage increase from the base price?",
    options: [
      { key: "A", text: "35.0%" },
      { key: "B", text: "38.6%" },
      { key: "C", text: "37.2%" },
      { key: "D", text: "36.4%" }
    ],
    correctAnswer: "B",
    solution: "Overall multiplier: = 1.10 × 1.20 × 1.05 = 1.386. Net increase: = 1.386 − 1 = 0.386 = 38.6%."
  },
  {
    id: "Q11",
    questionNumber: 11,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "In a municipal corporation election between two contestants, 12% of the registered voters did not turn up to vote, and 600 votes cast were declared invalid. The winning candidate secured 56% of the total valid votes and defeated his opponent by a margin of 1,440 votes. What was the total number of registered voters on the electoral roll?",
    options: [
      { key: "A", text: "14,000" },
      { key: "B", text: "14,318" },
      { key: "C", text: "15,000" },
      { key: "D", text: "15,500" }
    ],
    correctAnswer: "C",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is C (15,000), but exact calculation yields 14,318.18 voters (Option B approximation).",
    solution: "Winning margin = 56% − 44% = 12% of valid votes.\nValid votes = 1440 / 0.12 = 12,000.\nVotes cast = 12,000 + 600 = 12,600.\nSince 12% did not vote: Votes cast = 88% of registered voters.\nRegistered voters = 12,600 / 0.88 ≈ 14,318.18.\n\nNote: The source answer key marks Option C (15,000), but mathematical verification shows ~14,318."
  },
  {
    id: "Q12",
    questionNumber: 12,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "An electronic manufacturing plant imports microchips. In transit, 5% of chips are damaged and discarded. Of the remaining, 80% are utilized in building servers, and the remaining 3,800 chips are stocked as spare parts. What was the initial quantity of imported chips?",
    options: [
      { key: "A", text: "19,000" },
      { key: "B", text: "20,000" },
      { key: "C", text: "21,500" },
      { key: "D", text: "25,000" }
    ],
    correctAnswer: "B",
    solution: "After 5% damage: 95% remain. Of the remaining chips, 20% become spares. Therefore spare chips represent: 95% × 20% = 19%. 19% of initial quantity = 3,800. Initial quantity = 3,800 / 0.19 = 20,000."
  },
  {
    id: "Q13",
    questionNumber: 13,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A data analyst’s gross basic pay is taxed progressively: 0% tax on the first Rs. 3,00,000, 10% on the portion from Rs. 3,00,001 to Rs. 6,00,000, and 20% on any amount exceeding Rs. 6,00,000. If he pays a total income tax of Rs. 65,000 in a financial year, what is his annual gross salary?",
    options: [
      { key: "A", text: "Rs. 7,25,000" },
      { key: "B", text: "Rs. 7,50,000" },
      { key: "C", text: "Rs. 7,75,000" },
      { key: "D", text: "Rs. 8,00,000" }
    ],
    correctAnswer: "C",
    solution: "Tax on Rs. 3,00,000 to Rs. 6,00,000: = 10% × 3,00,000 = Rs. 30,000. Remaining tax = 65,000 − 30,000 = Rs. 35,000. Income above Rs. 6,00,000: = 35,000 / 20% = Rs. 1,75,000. Gross salary = 6,00,000 + 1,75,000 = Rs. 7,75,000."
  },
  {
    id: "Q14",
    questionNumber: 14,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "In a multi-tier distribution network, a producer sells a batch of IoT devices to a national distributor at a 15% profit. The national distributor supplies it to a regional vendor at an 8% profit, who further retails it to an enterprise client at a 20% markup. If the client bought the batch for Rs. 1,49,040, find the manufacturing cost incurred by the original producer.",
    options: [
      { key: "A", text: "Rs. 1,00,000" },
      { key: "B", text: "Rs. 1,05,000" },
      { key: "C", text: "Rs. 1,10,000" },
      { key: "D", text: "Rs. 1,20,000" }
    ],
    correctAnswer: "A",
    solution: "Let manufacturing cost = C. Final price: C × 1.15 × 1.08 × 1.20 = 1,49,040. Combined multiplier = 1.4904. Therefore: C = 1,49,040 / 1.4904 = Rs. 1,00,000."
  },
  {
    id: "Q15",
    questionNumber: 15,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "The population of a metropolitan district changes across three consecutive phases: it grows by 15% during industrial expansion, drops by 10% during an economic migration, and subsequently rises by 20% after smart city deployment. If the final recorded population is 6,21,000, what was the baseline population prior to the first phase?",
    options: [
      { key: "A", text: "4,80,000" },
      { key: "B", text: "5,00,000" },
      { key: "C", text: "5,25,000" },
      { key: "D", text: "5,40,000" }
    ],
    correctAnswer: "B",
    solution: "Overall multiplier: = 1.15 × 0.90 × 1.20 = 1.242. Initial population: = 6,21,000 / 1.242 = 5,00,000."
  },
  {
    id: "Q16",
    questionNumber: 16,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A software company allocates its annual cloud compute budget across three quarters. In Q1, it utilizes 28% of the total budget. In Q2, it uses 40% of the remaining budget. In Q3, due to an AI model fine-tuning workload, consumption increases by 25% over what was consumed in Q2. If the company is left with an unspent surplus of Rs. 3,60,000 at the end of the year, what was the total initial cloud compute budget?",
    options: [
      { key: "A", text: "Rs. 20,00,000" },
      { key: "B", text: "Rs. 25,00,000" },
      { key: "C", text: "Rs. 18,50,000" },
      { key: "D", text: "Rs. 22,50,000" }
    ],
    correctAnswer: "B",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is B (Rs. 25,00,000), but mathematical calculation from problem statement yields Rs. 50,00,000.",
    solution: "Let total budget = B.\nQ1 used = 28% B. Remaining = 72% B.\nQ2 used = 40% of 72% = 28.8% B. Remaining after Q2 = 43.2% B.\nQ3 used = 125% of Q2 = 1.25 × 28.8% = 36% B.\nFinal surplus = 43.2% − 36% = 7.2% B.\n7.2% of B = Rs. 3,60,000 => B = 3,60,000 / 0.072 = Rs. 50,00,000.\n\nNote: Source Answer Key specifies B (Rs. 25,00,000)."
  },
  {
    id: "Q17",
    questionNumber: 17,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "In a tier-1 campus placement drive, 45% of total registered students are female and the rest are male. In the technical coding round, 60% of male candidates and 75% of female candidates qualify for the next stage. If the number of disqualified males exceeds the number of disqualified females by 132, find the total number of students who registered for the placement drive.",
    options: [
      { key: "A", text: "1,100" },
      { key: "B", text: "1,200" },
      { key: "C", text: "1,320" },
      { key: "D", text: "1,500" }
    ],
    correctAnswer: "B",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is B (1,200), though exact solution of 0.1075N = 132 gives ~1,228.",
    solution: "Let total students = N. Male = 55% N, Female = 45% N.\nDisqualified males = 40% of 55% N = 22% N.\nDisqualified females = 25% of 45% N = 11.25% N.\nDifference = 10.75% N = 132 => N = 132 / 0.1075 ≈ 1227.91.\n\nNote: The source answer key records Option B (1,200)."
  },
  {
    id: "Q18",
    questionNumber: 18,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "The cost of raw lithium used in EV battery manufacturing went up by 32%. Simultaneously, due to automated laser assembly, the processing efficiency reduced labor expenses by 15%. If raw lithium accounts for 65% of the total manufacturing cost and labor expenses account for the remaining 35%, what is the net percentage impact on the manufacturing cost of one EV battery pack?",
    options: [
      { key: "A", text: "15.55% increase" },
      { key: "B", text: "17.00% increase" },
      { key: "C", text: "14.80% increase" },
      { key: "D", text: "16.25% increase" }
    ],
    correctAnswer: "A",
    solution: "Assume initial total cost = 100. Lithium = 65, Labor = 35. New lithium = 65 × 1.32 = 85.80. New labor = 35 × 0.85 = 29.75. New total = 85.80 + 29.75 = 115.55. Net increase = 15.55%."
  },
  {
    id: "Q19",
    questionNumber: 19,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "In an election between two candidates in an IT legislative constituency, 20% of the voters on the list did not cast their vote and 800 votes were declared invalid. The successful candidate received 48% of the total registered voter count and defeated his rival by 2,800 votes. How many total votes were polled in the election?",
    options: [
      { key: "A", text: "20,000" },
      { key: "B", text: "16,000" },
      { key: "C", text: "19,200" },
      { key: "D", text: "15,200" }
    ],
    correctAnswer: "D",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is D (15,200), though algebraic derivation gives polled votes = 10,000.",
    solution: "Let registered voters = 100x. Polled votes = 80x. Valid votes = 80x − 800. Winner = 48x. Loser = (80x − 800) − 48x = 32x − 800.\nMargin: 48x − (32x − 800) = 16x + 800 = 2,800 => 16x = 2000 => x = 125.\nPolled votes = 80 × 125 = 10,000.\n\nNote: Source key lists Option D (15,200)."
  },
  {
    id: "Q20",
    questionNumber: 20,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A tech retail chain offers three successive promotional schemes:\nScheme A offers a flat 35% discount.\nScheme B offers successive discounts of 20% and 18%.\nScheme C offers \"Buy 3 Get 2 Free\" along with an additional 5% cashback on the net bill.\nWhich scheme is the most advantageous to the buyer?",
    options: [
      { key: "A", text: "Scheme A" },
      { key: "B", text: "Scheme B" },
      { key: "C", text: "Scheme C" },
      { key: "D", text: "Scheme B and C are identical" }
    ],
    correctAnswer: "C",
    solution: "Scheme A: 35% discount.\nScheme B: 20 + 18 − (20 × 18)/100 = 34.4% discount.\nScheme C: Buy 3 Get 2 Free = 2/5 = 40% discount. With 5% cashback, buyer pays 60% × 0.95 = 57% => effective discount = 43%.\nTherefore Scheme C is the most advantageous."
  },

  // ==================== PART 2: Q21 - Q40 ====================
  {
    id: "Q21",
    questionNumber: 21,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "An enterprise database table contains records where the number of read operations is 60% more than write operations. Over a database migration, read operations increase by 25% while write operations decrease by 30%. By what percentage is the new number of read operations greater than the new number of write operations?",
    options: [
      { key: "A", text: "185.7%" },
      { key: "B", text: "150.0%" },
      { key: "C", text: "162.5%" },
      { key: "D", text: "175.4%" }
    ],
    correctAnswer: "A",
    solution: "Let initial writes = 100. Reads = 160. New reads = 160 × 1.25 = 200. New writes = 100 × 0.70 = 70. Excess = 200 − 70 = 130. Percentage excess = 130 / 70 × 100 ≈ 185.71%."
  },
  {
    id: "Q22",
    questionNumber: 22,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a semester assessment with three subject papers (Math, DSA, OS), maximum marks are in the ratio 3 : 4 : 5. A student scores 60% in Math, 70% in DSA, and 80% in OS. If the minimum aggregate passing score is 75%, how many more marks (as a percentage of the total maximum aggregate) did the student need to clear the examination?",
    options: [
      { key: "A", text: "3.33%" },
      { key: "B", text: "2.50%" },
      { key: "C", text: "4.16%" },
      { key: "D", text: "1.66%" }
    ],
    correctAnswer: "A",
    solution: "Let max marks: Math=300, DSA=400, OS=500. Total=1200. Required: 75% of 1200 = 900. Marks obtained: Math=180, DSA=280, OS=400. Total = 860. Deficit = 40. Deficit % = 40 / 1200 × 100 = 3.33%."
  },
  {
    id: "Q23",
    questionNumber: 23,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The price of a graphics processing unit (GPU) increases by 25% due to high semiconductor demand. A data center manager decides to increase their hardware procurement budget by only 10%. By what percentage will the number of GPUs procured by the data center decrease?",
    options: [
      { key: "A", text: "12%" },
      { key: "B", text: "15%" },
      { key: "C", text: "10%" },
      { key: "D", text: "8%" }
    ],
    correctAnswer: "A",
    solution: "Quantity multiplier = Budget / Price = 1.10 / 1.25 = 0.88. Quantity decreases by: 1 − 0.88 = 0.12 = 12%."
  },
  {
    id: "Q24",
    questionNumber: 24,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a large MNC, 60% of employees are in the technical track and the remaining are in operations. 40% of technical track employees possess cloud certification, while 25% of operations employees possess cloud certification. If an audit reveals that 340 employees across the company have cloud certifications, what is the total employee strength of the MNC?",
    options: [
      { key: "A", text: "950" },
      { key: "B", text: "1,000" },
      { key: "C", text: "1,050" },
      { key: "D", text: "1,200" }
    ],
    correctAnswer: "B",
    solution: "Let total = 100x. Tech = 60x, Ops = 40x. Certified = (0.40 × 60x) + (0.25 × 40x) = 24x + 10x = 34x. 34x = 340 => x = 10. Total = 1,000."
  },
  {
    id: "Q25",
    questionNumber: 25,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A production unit's defective rate rises from 4% to 5% of total units produced. Concurrently, the overall production capacity of the plant expands by 20%. What is the net percentage increase in the absolute count of defective units produced?",
    options: [
      { key: "A", text: "25%" },
      { key: "B", text: "50%" },
      { key: "C", text: "40%" },
      { key: "D", text: "30%" }
    ],
    correctAnswer: "B",
    solution: "Initial production = 100, Defective = 4. New production = 120, Defective = 5% of 120 = 6. Increase = 6 − 4 = 2. Percentage increase = 2 / 4 × 100 = 50%."
  },
  {
    id: "Q26",
    questionNumber: 26,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Fresh computational server liquid coolant contains 90% water and 10% chemical additive by weight. Due to operational heat dissipation over 30 days, evaporation occurs such that water now constitutes 80% of the remaining coolant by weight. If the initial coolant tank weight was 120 kg, what is the weight of the remaining coolant?",
    options: [
      { key: "A", text: "60 kg" },
      { key: "B", text: "80 kg" },
      { key: "C", text: "75 kg" },
      { key: "D", text: "90 kg" }
    ],
    correctAnswer: "A",
    solution: "Initial additive = 10% of 120 kg = 12 kg. After evaporation, additive = 20% of remaining X => 0.20X = 12 => X = 60 kg."
  },
  {
    id: "Q27",
    questionNumber: 27,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Tricky",
    question: "An investor divides capital into three tech startup funds in the ratio 2 : 3 : 5. In the first year, Fund 1 yields a 20% gain, Fund 2 yields a 10% loss, and Fund 3 yields a 15% gain. If the combined capital at the end of the year stands at Rs. 11,70,000, what was the initial capital invested in Fund 2?",
    options: [
      { key: "A", text: "Rs. 3,00,000" },
      { key: "B", text: "Rs. 3,60,000" },
      { key: "C", text: "Rs. 2,80,000" },
      { key: "D", text: "Rs. 3,30,000" }
    ],
    correctAnswer: "A",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is A (Rs. 3,00,000). Note that 108.5x = 11,70,000 gives Fund 2 ≈ Rs. 3,23,502.",
    solution: "Let capitals = 20x, 30x, 50x. Returns: Fund 1 = 24x, Fund 2 = 27x, Fund 3 = 57.5x. Total = 108.5x.\nGiven 108.5x = 11,70,000 => x ≈ 10,783.41 => Fund 2 (30x) ≈ Rs. 3,23,502.\n\nNote: Source key lists Option A (Rs. 3,00,000)."
  },
  {
    id: "Q28",
    questionNumber: 28,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The hourly rate of a contract software architect increases by 25%, but his total billable client hours per week reduce by 16%. What is the net percentage change in his weekly gross billing?",
    options: [
      { key: "A", text: "Increases by 5%" },
      { key: "B", text: "Increases by 9%" },
      { key: "C", text: "Decreases by 4%" },
      { key: "D", text: "Remains unchanged" }
    ],
    correctAnswer: "A",
    solution: "New multiplier = 1.25 × 0.84 = 1.05. Therefore weekly billing increases by 5%."
  },
  {
    id: "Q29",
    questionNumber: 29,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a coding screening test, candidate A scored 30% marks and failed by 15 marks. Candidate B scored 42% marks and secured 21 marks above the minimum passing criteria. What is the minimum passing percentage required for the test?",
    options: [
      { key: "A", text: "33%" },
      { key: "B", text: "35%" },
      { key: "C", text: "36%" },
      { key: "D", text: "38%" }
    ],
    correctAnswer: "B",
    solution: "Difference: 42% − 30% = 12%. Difference in marks = 15 + 21 = 36 marks => 1% = 3 marks => Max = 300 marks. Candidate A scored 90 marks. Passing marks = 90 + 15 = 105. Passing % = 105 / 300 × 100 = 35%."
  },
  {
    id: "Q30",
    questionNumber: 30,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A digital SaaS platform incurs operational cost: 40% server hosting, 30% maintenance, 20% licensing, and 10% miscellaneous. Next year, server hosting rises by 15%, maintenance drops by 10%, licensing rises by 25%, and miscellaneous stays constant. What is the overall percentage change in the SaaS operating budget?",
    options: [
      { key: "A", text: "Increases by 8.0%" },
      { key: "B", text: "Increases by 5.5%" },
      { key: "C", text: "Increases by 6.0%" },
      { key: "D", text: "Increases by 7.2%" }
    ],
    correctAnswer: "A",
    solution: "Base cost = 100. Hosting = 40 × 1.15 = 46, Maintenance = 30 × 0.90 = 27, Licensing = 20 × 1.25 = 25, Misc = 10. New total = 46 + 27 + 25 + 10 = 108. Net increase = 8%."
  },
  {
    id: "Q31",
    questionNumber: 31,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Tricky",
    question: "The numerator of a fraction is increased by 200% and the denominator is increased by 350%. The resultant fraction obtained is 5/12. What was the original fraction?",
    options: [
      { key: "A", text: "5/8" },
      { key: "B", text: "3/4" },
      { key: "C", text: "5/6" },
      { key: "D", text: "7/9" }
    ],
    correctAnswer: "A",
    solution: "New numerator = 3N, New denominator = 4.5D. 3N / 4.5D = 5/12 => 2N / 3D = 5/12 => N/D = 15/24 = 5/8."
  },
  {
    id: "Q32",
    questionNumber: 32,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Tricky",
    question: "An e-commerce platform increases the base price of a smartphone by x%. Later, due to slow sales during a clearance drive, they reduce the new price by x%. If the final selling price is Rs. 23,040 and the initial base price was Rs. 25,000, find the value of x.",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "25%" },
      { key: "C", text: "28%" },
      { key: "D", text: "30%" }
    ],
    correctAnswer: "C",
    solution: "Net multiplier = 1 − x²/10000 = 23040 / 25000 = 0.9216 => x²/10000 = 0.0784 => x² = 784 => x = 28%."
  },
  {
    id: "Q33",
    questionNumber: 33,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a tech company, 70% of engineers know Python, 60% know Java, and 45% know both programming languages. If 45 engineers know neither Python nor Java, what is the total number of engineers in the company?",
    options: [
      { key: "A", text: "300" },
      { key: "B", text: "350" },
      { key: "C", text: "400" },
      { key: "D", text: "450" }
    ],
    correctAnswer: "A",
    solution: "At least one = 70% + 60% − 45% = 85%. Neither = 15%. 15% of total = 45 => Total = 45 / 0.15 = 300."
  },
  {
    id: "Q34",
    questionNumber: 34,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "An engineer’s gross salary is increased by 10% in Year 1, 15% in Year 2, and 20% in Year 3. Due to tax slab modifications, total statutory deductions were 10% in the base year, but increased to 15% by Year 3. By what net percentage did his take-home (net) salary increase over the 3-year period?",
    options: [
      { key: "A", text: "43.34%" },
      { key: "B", text: "41.50%" },
      { key: "C", text: "45.20%" },
      { key: "D", text: "39.80%" }
    ],
    correctAnswer: "A",
    solution: "Initial gross = 100, Net = 90. Year 3 gross = 100 × 1.10 × 1.15 × 1.20 = 151.80. Year 3 net = 151.80 × 0.85 = 129.03. Increase = (129.03 − 90) / 90 × 100 ≈ 43.37% (Option A)."
  },
  {
    id: "Q35",
    questionNumber: 35,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The length, breadth, and height of a server cabinet are increased by 10%, 20%, and 25% respectively. What is the overall percentage increase in the internal storage volume of the server cabinet?",
    options: [
      { key: "A", text: "60%" },
      { key: "B", text: "65%" },
      { key: "C", text: "55%" },
      { key: "D", text: "62.5%" }
    ],
    correctAnswer: "B",
    solution: "Volume multiplier = 1.10 × 1.20 × 1.25 = 1.65. Net increase = 65%."
  },
  {
    id: "Q36",
    questionNumber: 36,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a multi-regional cloud deployment, 35% of the total servers are in the US region, 40% are in the EU region, and the rest are in the APAC region. During a stress test, 8% of US servers, 5% of EU servers, and 12% of APAC servers experienced downtime. What is the overall percentage of servers across all regions that remained operational without any downtime?",
    options: [
      { key: "A", text: "92.20%" },
      { key: "B", text: "91.80%" },
      { key: "C", text: "92.45%" },
      { key: "D", text: "93.10%" }
    ],
    correctAnswer: "A",
    solution: "US operational = 35 × 0.92 = 32.2. EU operational = 40 × 0.95 = 38. APAC operational = 25 × 0.88 = 22. Total operational = 32.2 + 38 + 22 = 92.2%."
  },
  {
    id: "Q37",
    questionNumber: 37,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Due to supply-chain constraints, the price of copper increases by 20%. As a consequence, an electronics firm reduces its monthly consumption by 15% and negotiates an additional 5% bulk rebate on the new price. What is the net percentage change in the firm’s total monthly expenditure on copper?",
    options: [
      { key: "A", text: "Decreases by 3.1%" },
      { key: "B", text: "Decreases by 2.5%" },
      { key: "C", text: "Increases by 1.2%" },
      { key: "D", text: "Decreases by 1.8%" }
    ],
    correctAnswer: "A",
    solution: "Multiplier = 1.20 × 0.85 × 0.95 = 0.969. Net change = 0.969 − 1 = −0.031 = 3.1% decrease."
  },
  {
    id: "Q38",
    questionNumber: 38,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Tricky",
    question: "A data processing pipeline receives records daily. On Monday, processing speed is at base capacity. On Tuesday, incoming traffic increases by 40%, but system optimization improves speed by 16.66%. On Wednesday, traffic drops by 25% relative to Tuesday, while optimization degrades by 20% relative to Tuesday. By what percentage is the processing backlog time on Wednesday different from Monday?",
    options: [
      { key: "A", text: "5.0% higher" },
      { key: "B", text: "5.0% lower" },
      { key: "C", text: "8.0% higher" },
      { key: "D", text: "Unchanged" }
    ],
    correctAnswer: "A",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is A (5.0% higher). Exact relation: Wednesday backlog = (1.40×0.75) / (7/6 × 0.8) = 1.05 / 0.9333 ≈ 1.125 (12.5% higher).",
    solution: "Backlog time ∝ Traffic / Speed. Monday = 1. Tuesday = 1.40 / (7/6) = 1.20. Wednesday traffic = 1.05, speed = 0.9333 => backlog = 1.125.\n\nNote: Source answer states 5% higher (Option A)."
  },
  {
    id: "Q39",
    questionNumber: 39,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "In an election with three candidates, Candidate A secured 45% of the total valid votes. Candidate B received 60% of the remaining valid votes, and Candidate C received the remaining 4,400 votes. If 12% of the total polled votes were invalid and 20% of registered voters did not vote, what was the total number of registered voters?",
    options: [
      { key: "A", text: "31,250" },
      { key: "B", text: "28,500" },
      { key: "C", text: "32,000" },
      { key: "D", text: "35,000" }
    ],
    correctAnswer: "A",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is A (31,250). Note that valid votes = 20,000 => polled = 22,727.27 => registered ≈ 28,409.",
    solution: "Candidate A = 45% valid. Remaining = 55%. Candidate B = 60% of 55% = 33%. Candidate C = 22% = 4,400 => Valid = 20,000.\nPolled = 20,000 / 0.88 ≈ 22,727.27. Registered = 22,727.27 / 0.80 ≈ 28,409.09.\n\nNote: Source key provides Option A (31,250)."
  },
  {
    id: "Q40",
    questionNumber: 40,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "An enterprise data lake contains structured, semi-structured, and unstructured data in the ratio 5 : 3 : 2. In a data expansion drive, structured data increases by 20%, semi-structured data increases by 30%, and unstructured data decreases by 10%. What is the net percentage increase in the total volume of data in the lake?",
    options: [
      { key: "A", text: "17.0%" },
      { key: "B", text: "18.5%" },
      { key: "C", text: "15.0%" },
      { key: "D", text: "16.2%" }
    ],
    correctAnswer: "A",
    solution: "Initial = 50 + 30 + 20 = 100. New structured = 60, semi = 39, unstr = 18. New total = 60 + 39 + 18 = 117. Net increase = 17%."
  },

  // ==================== PART 3: Q41 - Q60 ====================
  {
    id: "Q41",
    questionNumber: 41,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A software developer spends 24% of salary on rent, 16% on loan EMIs, and 28% of the remaining amount on groceries and lifestyle. Of the balance left, he transfers 50% into an emergency fund and is left with Rs. 12,960 for discretionary spending. What is his total monthly salary?",
    options: [
      { key: "A", text: "Rs. 55,000" },
      { key: "B", text: "Rs. 60,000" },
      { key: "C", text: "Rs. 64,000" },
      { key: "D", text: "Rs. 50,000" }
    ],
    correctAnswer: "B",
    solution: "Rent + EMI = 40%. Remaining = 60%. Groceries = 28% of 60% = 16.8%. Balance = 43.2%. Discretionary = 50% of 43.2% = 21.6%. 21.6% of salary = Rs. 12,960 => Salary = 12,960 / 0.216 = Rs. 60,000."
  },
  {
    id: "Q42",
    questionNumber: 42,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The radius of a cylindrical hardware storage module is decreased by 10%, while its height is increased by 25%. What is the net percentage change in the total volume of the cylinder?",
    options: [
      { key: "A", text: "Increases by 1.25%" },
      { key: "B", text: "Decreases by 2.50%" },
      { key: "C", text: "Increases by 3.50%" },
      { key: "D", text: "Decreases by 1.25%" }
    ],
    correctAnswer: "A",
    solution: "Volume ∝ r² × h. Multiplier = (0.90)² × 1.25 = 0.81 × 1.25 = 1.0125. Net change = 1.25% increase."
  },
  {
    id: "Q43",
    questionNumber: 43,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a technical recruitment test of 150 questions, a candidate answered 70% of the first 90 questions correctly. What percentage of the remaining 60 questions must the candidate answer correctly to achieve an overall score of 76% in the test?",
    options: [
      { key: "A", text: "80%" },
      { key: "B", text: "85%" },
      { key: "C", text: "82.5%" },
      { key: "D", text: "88%" }
    ],
    correctAnswer: "B",
    solution: "Total needed = 76% of 150 = 114. First 90 correct = 70% of 90 = 63. Remaining needed = 114 − 63 = 51. Required % = 51 / 60 × 100 = 85%."
  },
  {
    id: "Q44",
    questionNumber: 44,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The price of electricity per unit rises by 20%. A cryptocurrency mining rig cuts its hardware power usage such that the overall electricity expenditure rises by only 8%. What was the percentage reduction in the power consumption of the mining rig?",
    options: [
      { key: "A", text: "8%" },
      { key: "B", text: "10%" },
      { key: "C", text: "12%" },
      { key: "D", text: "15%" }
    ],
    correctAnswer: "B",
    solution: "Expenditure ∝ Price × Consumption. Consumption multiplier = 1.08 / 1.20 = 0.90. Reduction = 1 − 0.90 = 10%."
  },
  {
    id: "Q45",
    questionNumber: 45,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a cybersecurity assessment, 65% of test scenarios targeted network layers and the rest targeted application layers. 80% of network layer attacks were mitigated successfully, while 60% of application layer attacks were mitigated. If 270 attacks bypassed security mechanisms, what was the total number of test scenarios executed?",
    options: [
      { key: "A", text: "900" },
      { key: "B", text: "1,000" },
      { key: "C", text: "1,050" },
      { key: "D", text: "1,200" }
    ],
    correctAnswer: "B",
    solution: "Total = 100x. Network bypassed = 20% of 65x = 13x. App bypassed = 40% of 35x = 14x. Total bypassed = 27x = 270 => x = 10. Total = 1,000."
  },
  {
    id: "Q46",
    questionNumber: 46,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Tricky",
    question: "In a tech firm, 40% of employees are programmers, 35% are quality analysts, and the rest are UI/UX designers. Due to restructuring, the number of programmers increases by 15%, analysts decrease by 20%, and designers increase by 40%. What is the net percentage change in total headcount?",
    options: [
      { key: "A", text: "3.5% increase" },
      { key: "B", text: "4.0% increase" },
      { key: "C", text: "2.5% decrease" },
      { key: "D", text: "No change" }
    ],
    correctAnswer: "A",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is A (3.5% increase). Note that (40×1.15) + (35×0.80) + (25×1.40) = 46 + 28 + 35 = 109 (9% increase).",
    solution: "Initial = 100. Prog = 40 × 1.15 = 46, QA = 35 × 0.80 = 28, Des = 25 × 1.40 = 35. Total = 109.\n\nNote: Source key lists Option A (3.5% increase)."
  },
  {
    id: "Q47",
    questionNumber: 47,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A retail trader marks up his items by 40% above the cost price. During festive sales, he offers two successive discounts of 15% and 10%. If he incurs an additional 2% packaging cost on the base cost price, what is his net percentage profit on the deal?",
    options: [
      { key: "A", text: "5.14%" },
      { key: "B", text: "6.20%" },
      { key: "C", text: "4.86%" },
      { key: "D", text: "7.10%" }
    ],
    correctAnswer: "A",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is A (5.14%), while exact arithmetic (107.10 − 102)/102 gives 5.00%.",
    solution: "Cost = 100 + 2 = 102. Marked price = 140. Selling price = 140 × 0.85 × 0.90 = 107.10. Profit % = 5.10 / 102 × 100 = 5% (Source Option A: 5.14%)."
  },
  {
    id: "Q48",
    questionNumber: 48,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "An open-source project repository has contributors from three time zones: UTC (45%), EST (35%), and IST (20%). In a release cycle, 12% of UTC contributors, 20% of EST contributors, and 25% of IST contributors committed buggy code. What percentage of total contributors committed clean (bug-free) code?",
    options: [
      { key: "A", text: "82.6%" },
      { key: "B", text: "83.2%" },
      { key: "C", text: "84.4%" },
      { key: "D", text: "81.8%" }
    ],
    correctAnswer: "A",
    solution: "Buggy total = (45 × 0.12) + (35 × 0.20) + (20 × 0.25) = 5.4 + 7 + 5 = 17.4%. Clean = 100 − 17.4 = 82.6%."
  },
  {
    id: "Q49",
    questionNumber: 49,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a coding exam, 52% of candidates failed in Data Structures, 42% failed in Algorithms, and 17% failed in both subjects. If the total number of students who passed in both subjects is 138, find the total number of students who appeared for the exam.",
    options: [
      { key: "A", text: "600" },
      { key: "B", text: "550" },
      { key: "C", text: "650" },
      { key: "D", text: "700" }
    ],
    correctAnswer: "A",
    solution: "Failed in at least one = 52% + 42% − 17% = 77%. Passed in both = 23%. 23% of total = 138 => Total = 138 / 0.23 = 600."
  },
  {
    id: "Q50",
    questionNumber: 50,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A hardware firm's revenue dropped by 25% in the first quarter, rose by 30% in the second quarter, and then dropped by 10% in the third quarter. What is the single net percentage change in revenue over the three quarters?",
    options: [
      { key: "A", text: "12.25% decrease" },
      { key: "B", text: "10.50% decrease" },
      { key: "C", text: "8.75% decrease" },
      { key: "D", text: "11.80% decrease" }
    ],
    correctAnswer: "A",
    solution: "Multiplier = 0.75 × 1.30 × 0.90 = 0.8775. Net change = 0.8775 − 1 = −0.1225 = 12.25% decrease."
  },
  {
    id: "Q51",
    questionNumber: 51,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Fresh bio-composite casing material contains 85% solvent and 15% fiber by weight. After curing in an autoclave, solvent content drops to 40% of the total cured weight. How many kilograms of cured casing material will be obtained from 200 kg of fresh composite?",
    options: [
      { key: "A", text: "50 kg" },
      { key: "B", text: "45 kg" },
      { key: "C", text: "55 kg" },
      { key: "D", text: "60 kg" }
    ],
    correctAnswer: "A",
    solution: "Initial fiber = 15% of 200 = 30 kg. After curing, fiber = 60% of cured weight X => 0.60X = 30 => X = 50 kg."
  },
  {
    id: "Q52",
    questionNumber: 52,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The population of an industrial smart city increases by 10% in the first year, increases by 20% in the second year, and then decreases by 30% in the third year due to automation decentralization. If the current population is 4,62,000, what was the population 3 years ago?",
    options: [
      { key: "A", text: "4,80,000" },
      { key: "B", text: "5,00,000" },
      { key: "C", text: "5,20,000" },
      { key: "D", text: "5,50,000" }
    ],
    correctAnswer: "B",
    solution: "Overall multiplier = 1.10 × 1.20 × 0.70 = 0.924. Initial = 4,62,000 / 0.924 = 5,00,000."
  },
  {
    id: "Q53",
    questionNumber: 53,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A student’s test score was mistakenly scaled down by 25%. By what percentage must the incorrect score now be raised to restore it to the original intended value?",
    options: [
      { key: "A", text: "25.00%" },
      { key: "B", text: "33.33%" },
      { key: "C", text: "30.00%" },
      { key: "D", text: "37.50%" }
    ],
    correctAnswer: "B",
    solution: "Original = 100, Reduced = 75. Required increase = 25 / 75 × 100 = 33.33%."
  },
  {
    id: "Q54",
    questionNumber: 54,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A system memory allocation policy charges a base cache access penalty of 15% on non-contiguous blocks. If non-contiguous allocations grow by 40% and the access penalty is revised upward to 25%, what is the net percentage growth in total latency penalty incurred?",
    options: [
      { key: "A", text: "133.3%" },
      { key: "B", text: "140.0%" },
      { key: "C", text: "125.5%" },
      { key: "D", text: "115.0%" }
    ],
    correctAnswer: "A",
    solution: "Initial penalty = 15. New penalty = 25% of 140 = 35. Increase = 20 / 15 × 100 = 133.33%."
  },
  {
    id: "Q55",
    questionNumber: 55,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a tech company, the ratio of male to female employees is 3 : 2. 20% of male employees and 25% of female employees hold post-graduate degrees. What percentage of the total workforce does NOT hold a post-graduate degree?",
    options: [
      { key: "A", text: "78%" },
      { key: "B", text: "75%" },
      { key: "C", text: "80%" },
      { key: "D", text: "82%" }
    ],
    correctAnswer: "A",
    solution: "Male = 60, Female = 40. Male non-PG = 80% of 60 = 48. Female non-PG = 75% of 40 = 30. Total non-PG = 48 + 30 = 78%."
  },
  {
    id: "Q56",
    questionNumber: 56,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "In a multi-stage software build pipeline, 12% of total builds fail at Stage 1 (Linting). Of the builds that pass Stage 1, 15% fail at Stage 2 (Unit Testing). Of the builds passing Stage 2, 20% fail at Stage 3 (Integration Testing). If exactly 2,992 builds successfully pass all three stages and deploy to production, how many total builds were initially triggered?",
    options: [
      { key: "A", text: "5,000" },
      { key: "B", text: "4,800" },
      { key: "C", text: "5,200" },
      { key: "D", text: "4,500" }
    ],
    correctAnswer: "A",
    solution: "Multiplier = 0.88 × 0.85 × 0.80 = 0.5984. Total builds = 2,992 / 0.5984 = 5,000."
  },
  {
    id: "Q57",
    questionNumber: 57,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Tricky",
    question: "In a tech company’s appraisal cycle, a software engineer’s base salary is increased by x%. However, due to a mandatory provident fund hike, deductions increase from 8% to 12% of the base salary. If his net take-home salary increases by precisely 19.6%, what is the value of x?",
    options: [
      { key: "A", text: "25%" },
      { key: "B", text: "30%" },
      { key: "C", text: "28%" },
      { key: "D", text: "24%" }
    ],
    correctAnswer: "A",
    solution: "Initial take-home = 92. New take-home = 92 × 1.196 = 110.032. New base × 0.88 = 110.032 => New base = 125.036 => x ≈ 25%."
  },
  {
    id: "Q58",
    questionNumber: 58,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A cloud storage client has a quota partitioned into Hot, Warm, and Cold storage in the ratio 4 : 3 : 1. Over a quarter, Hot storage data drops by 15%, Warm storage data increases by 25%, and Cold storage data grows by 60%. What is the net percentage change in total data stored across all tiers?",
    options: [
      { key: "A", text: "9.375% increase" },
      { key: "B", text: "8.500% increase" },
      { key: "C", text: "10.250% increase" },
      { key: "D", text: "7.750% increase" }
    ],
    correctAnswer: "A",
    solution: "Initial = 40 + 30 + 10 = 80. New Hot = 34, Warm = 37.5, Cold = 16. New total = 87.5. Increase = 7.5 / 80 × 100 = 9.375%."
  },
  {
    id: "Q59",
    questionNumber: 59,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "An e-commerce seller incurs cost: 50% on raw material, 30% on manufacturing, and 20% on shipping. In a volatile quarter, raw material price rises by 24%, manufacturing costs drop by 10%, and shipping costs surge by 35%. By what percentage must the selling price be increased if the seller wants to maintain the exact same profit percentage as before?",
    options: [
      { key: "A", text: "16.0%" },
      { key: "B", text: "15.5%" },
      { key: "C", text: "14.8%" },
      { key: "D", text: "17.2%" }
    ],
    correctAnswer: "A",
    solution: "Initial cost = 100. New cost = (50×1.24) + (30×0.90) + (20×1.35) = 62 + 27 + 27 = 116. Price must increase by 16%."
  },
  {
    id: "Q60",
    questionNumber: 60,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a university batch, 60% of students opted for AI, 45% opted for Cybersecurity, and 20% opted for neither. If 300 students opted for both specializations, find the total number of students enrolled in the batch.",
    options: [
      { key: "A", text: "1,200" },
      { key: "B", text: "1,000" },
      { key: "C", text: "1,500" },
      { key: "D", text: "800" }
    ],
    correctAnswer: "A",
    solution: "At least one = 80%. Both = 60% + 45% − 80% = 25%. 25% of total = 300 => Total = 300 / 0.25 = 1,200."
  },

  // ==================== PART 4: Q61 - Q80 ====================
  {
    id: "Q61",
    questionNumber: 61,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The tax on an electronic device is reduced by 15%, but its overall market sales increase by 25%. What is the net percentage change in the total tax revenue collected from the product?",
    options: [
      { key: "A", text: "6.25% increase" },
      { key: "B", text: "5.50% increase" },
      { key: "C", text: "7.00% increase" },
      { key: "D", text: "4.75% increase" }
    ],
    correctAnswer: "A",
    solution: "Revenue multiplier = 0.85 × 1.25 = 1.0625. Net increase = 6.25%."
  },
  {
    id: "Q62",
    questionNumber: 62,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "In a regional election, Candidate P received 38% of the total registered votes. Candidate Q secured 42% of the polled votes. If 10% of registered voters did not turn up to vote and 1,200 votes were declared invalid, Candidate Q defeated Candidate P by 1,320 votes. How many voters were registered on the electoral roll?",
    options: [
      { key: "A", text: "60,000" },
      { key: "B", text: "50,000" },
      { key: "C", text: "65,000" },
      { key: "D", text: "55,000" }
    ],
    correctAnswer: "A",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is A (60,000). The algebraic solution from source key is marked as Option A.",
    solution: "Registered = 100x, Polled = 90x. Candidate P = 38x, Candidate Q = 42% of 90x = 37.8x. Per source derivation taking margin and invalid votes into account, registered voters = 60,000."
  },
  {
    id: "Q63",
    questionNumber: 63,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Tricky",
    question: "A cybersecurity audit team detects that 4% of network packets are malicious. An advanced ML firewall filters out 95% of the malicious packets, but erroneously flags 2% of legitimate packets as malicious (false positive). What percentage of total dropped packets are actually legitimate?",
    options: [
      { key: "A", text: "32.87%" },
      { key: "B", text: "33.56%" },
      { key: "C", text: "34.20%" },
      { key: "D", text: "31.45%" }
    ],
    correctAnswer: "B",
    solution: "Total = 1000. Malicious = 40 (dropped 38). Legitimate = 960 (dropped 19.2). Total dropped = 57.2. Legitimate percentage = 19.2 / 57.2 × 100 ≈ 33.56%."
  },
  {
    id: "Q64",
    questionNumber: 64,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The side length of a square microchip die increases by 12%. By what percentage does the total surface area of the chip die increase?",
    options: [
      { key: "A", text: "25.44%" },
      { key: "B", text: "24.00%" },
      { key: "C", text: "26.88%" },
      { key: "D", text: "25.00%" }
    ],
    correctAnswer: "A",
    solution: "Area multiplier = (1.12)² = 1.2544. Area increase = 25.44%."
  },
  {
    id: "Q65",
    questionNumber: 65,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "An employee’s monthly salary is allocated: 20% on rent, 15% of the rest on travel, and 30% of the remaining amount on savings. The rest of the balance, amounting to Rs. 27,132, is spent on utilities and lifestyle. What is the employee’s gross monthly salary?",
    options: [
      { key: "A", text: "Rs. 55,000" },
      { key: "B", text: "Rs. 57,000" },
      { key: "C", text: "Rs. 60,000" },
      { key: "D", text: "Rs. 58,500" }
    ],
    correctAnswer: "B",
    solution: "After rent = 80%. After travel = 0.80 × 0.85 = 68%. After savings = 68% × 0.70 = 47.6%. 47.6% of salary = Rs. 27,132 => Salary = 27,132 / 0.476 = Rs. 57,000."
  },
  {
    id: "Q66",
    questionNumber: 66,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a stress test on a multi-threaded process, memory usage increases by 15% in minute 1, increases by 20% in minute 2, drops by 25% in minute 3 due to garbage collection, and rises by 10% in minute 4. What is the net percentage change in memory consumption over the 4 minutes?",
    options: [
      { key: "A", text: "13.85% increase" },
      { key: "B", text: "15.20% increase" },
      { key: "C", text: "12.50% increase" },
      { key: "D", text: "14.10% increase" }
    ],
    correctAnswer: "A",
    solution: "Multiplier = 1.15 × 1.20 × 0.75 × 1.10 = 1.1385. Net increase = 13.85%."
  },
  {
    id: "Q67",
    questionNumber: 67,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The price of a premium software license rises by 30%. A development team receives a budget increment of only 10.5%. By what percentage must the team reduce the count of procured licenses?",
    options: [
      { key: "A", text: "15%" },
      { key: "B", text: "18%" },
      { key: "C", text: "12%" },
      { key: "D", text: "20%" }
    ],
    correctAnswer: "A",
    solution: "Quantity multiplier = 1.105 / 1.30 = 0.85. Quantity reduction = 15%."
  },
  {
    id: "Q68",
    questionNumber: 68,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In an online quiz of 120 questions, candidate X scores 65% of the first 80 questions correctly. What percentage of the remaining 40 questions must X answer correctly to achieve an overall aggregate score of 75%?",
    options: [
      { key: "A", text: "90%" },
      { key: "B", text: "95%" },
      { key: "C", text: "85%" },
      { key: "D", text: "92.5%" }
    ],
    correctAnswer: "B",
    solution: "Total correct needed = 75% of 120 = 90. First 80 correct = 65% of 80 = 52. Remaining needed = 38. Required % = 38 / 40 × 100 = 95%."
  },
  {
    id: "Q69",
    questionNumber: 69,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A server rack’s power supply units (PSUs) are categorized into Tier-1 (50%), Tier-2 (30%), and Tier-3 (20%). During a power surge, 6% of Tier-1, 10% of Tier-2, and 15% of Tier-3 PSUs experienced circuit failure. What percentage of the overall PSU deployment survived the surge intact?",
    options: [
      { key: "A", text: "91.0%" },
      { key: "B", text: "92.5%" },
      { key: "C", text: "89.5%" },
      { key: "D", text: "90.2%" }
    ],
    correctAnswer: "A",
    solution: "Failed = (50 × 0.06) + (30 × 0.10) + (20 × 0.15) = 3 + 3 + 3 = 9%. Survived = 100 − 9 = 91%."
  },
  {
    id: "Q70",
    questionNumber: 70,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The population of a metropolitan area is 4,80,000. It increases at a rate of 5% per annum in the first 2 years, but in the 3rd year, it declines by 4% due to an industrial shift. What is the total population at the end of 3 years?",
    options: [
      { key: "A", text: "5,08,032" },
      { key: "B", text: "5,12,400" },
      { key: "C", text: "5,05,200" },
      { key: "D", text: "5,09,150" }
    ],
    correctAnswer: "A",
    solution: "Final = 4,80,000 × 1.05 × 1.05 × 0.96 = 4,80,000 × 1.0584 = 5,08,032."
  },
  {
    id: "Q71",
    questionNumber: 71,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a technical institute, 35% of the students study AI, 40% study Data Science, and 20% study both. If 180 students study neither AI nor Data Science, what is the total student count of the institute?",
    options: [
      { key: "A", text: "400" },
      { key: "B", text: "450" },
      { key: "C", text: "500" },
      { key: "D", text: "600" }
    ],
    correctAnswer: "A",
    solution: "At least one = 35 + 40 − 20 = 55%. Neither = 45%. 45% of total = 180 => Total = 180 / 0.45 = 400."
  },
  {
    id: "Q72",
    questionNumber: 72,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A digital camera manufacturer sells sensors to a distributor at 12% profit. The distributor sells to an assembly line at 15% profit. The assembly line sells the finished camera to a retailer at 20% profit. If the retailer bought it for Rs. 38,640, what was the manufacturing cost of the sensor?",
    options: [
      { key: "A", text: "Rs. 25,000" },
      { key: "B", text: "Rs. 26,500" },
      { key: "C", text: "Rs. 24,000" },
      { key: "D", text: "Rs. 28,000" }
    ],
    correctAnswer: "A",
    solution: "Multiplier = 1.12 × 1.15 × 1.20 = 1.5456. Cost = 38,640 / 1.5456 = Rs. 25,000."
  },
  {
    id: "Q73",
    questionNumber: 73,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The radius of a spherical radar antenna dome expands by 10% under thermal stress. By what percentage does its surface area increase?",
    options: [
      { key: "A", text: "21%" },
      { key: "B", text: "20%" },
      { key: "C", text: "22.5%" },
      { key: "D", text: "19%" }
    ],
    correctAnswer: "A",
    solution: "Surface area ∝ r². Multiplier = 1.10² = 1.21. Increase = 21%."
  },
  {
    id: "Q74",
    questionNumber: 74,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "An investor distributes funds across three assets: Equity (40%), Debt (35%), and Gold (25%). In one financial year, Equity returns +22%, Debt yields +8%, and Gold drops by -4%. What is the net percentage return on the overall investment portfolio?",
    options: [
      { key: "A", text: "10.6%" },
      { key: "B", text: "11.2%" },
      { key: "C", text: "9.8%" },
      { key: "D", text: "10.0%" }
    ],
    correctAnswer: "A",
    solution: "Weighted return = (40 × 0.22) + (35 × 0.08) + (25 × −0.04) = 8.8 + 2.8 − 1.0 = 10.6%."
  },
  {
    id: "Q75",
    questionNumber: 75,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The numerator of a fraction is increased by 150% and its denominator is reduced by 20%. If the resultant fraction obtained is 25/16, what was the original fraction?",
    options: [
      { key: "A", text: "1/2" },
      { key: "B", text: "2/3" },
      { key: "C", text: "3/5" },
      { key: "D", text: "4/7" }
    ],
    correctAnswer: "A",
    solution: "2.5N / 0.8D = 25/16 => N/D = (25 × 0.8) / (16 × 2.5) = 20 / 40 = 1/2."
  },
  {
    id: "Q76",
    questionNumber: 76,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "An AI compute cluster spends 45% of its total operational runtime on LLM pre-training, 30% on fine-tuning, and the remaining 25% on real-time inference. Next quarter, pre-training compute needs increase by 20%, fine-tuning compute requirements drop by 15%, and inference workloads surge by 40%. What is the net percentage change in total cluster compute runtime?",
    options: [
      { key: "A", text: "14.5% increase" },
      { key: "B", text: "12.0% increase" },
      { key: "C", text: "13.5% increase" },
      { key: "D", text: "15.0% increase" }
    ],
    correctAnswer: "A",
    solution: "Pre-train = 45 × 1.20 = 54, Fine-tune = 30 × 0.85 = 25.5, Inference = 25 × 1.40 = 35. New total = 54 + 25.5 + 35 = 114.5. Net increase = 14.5%."
  },
  {
    id: "Q77",
    questionNumber: 77,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A candidate in an online technical assessment needs an aggregate of 40% marks to pass. The exam consists of two papers. In Paper 1 (out of 200 marks), the candidate scored 35%. How much percentage must the candidate score in Paper 2 (out of 150 marks) to clear the overall exam?",
    options: [
      { key: "A", text: "46.66%" },
      { key: "B", text: "45.00%" },
      { key: "C", text: "48.33%" },
      { key: "D", text: "50.00%" }
    ],
    correctAnswer: "A",
    solution: "Total max = 350. Required = 40% of 350 = 140. Paper 1 marks = 35% of 200 = 70. Paper 2 needed = 70. Paper 2 % = 70 / 150 × 100 = 46.66%."
  },
  {
    id: "Q78",
    questionNumber: 78,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "An enterprise purchases 1,500 server blades. 10% of them are deemed sub-standard on delivery. From the acceptable blades, 20% are allocated to the staging environment and the remaining are deployed to the production cluster. If another 54 blades in production fail stress tests, how many functional blades remain in production?",
    options: [
      { key: "A", text: "1,026" },
      { key: "B", text: "1,080" },
      { key: "C", text: "1,054" },
      { key: "D", text: "1,134" }
    ],
    correctAnswer: "A",
    solution: "Acceptable = 90% of 1500 = 1350. Production receives 80% = 1080. Functional = 1080 − 54 = 1,026."
  },
  {
    id: "Q79",
    questionNumber: 79,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "In an election between two candidates, 10% of voters on the electoral roll did not cast their votes and 10% of votes cast were found invalid. The winning candidate obtained 54% of the valid votes and won by a majority of 1,620 votes. Find the total number of voters enrolled on the list.",
    options: [
      { key: "A", text: "25,000" },
      { key: "B", text: "24,000" },
      { key: "C", text: "26,500" },
      { key: "D", text: "22,500" }
    ],
    correctAnswer: "A",
    solution: "Valid votes = 0.90 × 0.90 V = 0.81V. Margin = (54% − 46%) of valid = 8% of 0.81V = 0.0648V. 0.0648V = 1620 => V = 25,000."
  },
  {
    id: "Q80",
    questionNumber: 80,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The price of SSD storage modules falls by 20%. As a result, a cloud hosting provider is able to purchase 25 TB more storage for the same total capital outlay of Rs. 1,00,000. What was the original price of 1 TB of storage?",
    options: [
      { key: "A", text: "Rs. 1,000" },
      { key: "B", text: "Rs. 1,250" },
      { key: "C", text: "Rs. 800" },
      { key: "D", text: "Rs. 1,500" }
    ],
    correctAnswer: "A",
    solution: "100000 / (0.80P) − 100000 / P = 25 => (100000 / P) × (1.25 − 1) = 25 => 25000 / P = 25 => P = Rs. 1,000."
  },

  // ==================== PART 5: Q81 - Q100 ====================
  {
    id: "Q81",
    questionNumber: 81,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Due to optimization in database queries, write latency drops by 15% in month 1 and drops further by 20% in month 2. However, index bloat causes latency to increase by 10% in month 3. What is the net percentage decrease in write latency from the baseline?",
    options: [
      { key: "A", text: "25.2%" },
      { key: "B", text: "24.8%" },
      { key: "C", text: "26.5%" },
      { key: "D", text: "23.4%" }
    ],
    correctAnswer: "A",
    solution: "Multiplier = 0.85 × 0.80 × 1.10 = 0.748. Net decrease = 1 − 0.748 = 0.252 = 25.2%."
  },
  {
    id: "Q82",
    questionNumber: 82,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In an IT services firm, 55% of the engineers work on Web Development, 40% work on Mobile Apps, and 30% work on Cloud Infrastructure. 15% work on Web & Mobile, 12% work on Mobile & Cloud, 10% work on Web & Cloud, and 5% work on all three domains. What percentage of engineers do not work on any of these three domains?",
    options: [
      { key: "A", text: "7%" },
      { key: "B", text: "8%" },
      { key: "C", text: "10%" },
      { key: "D", text: "12%" }
    ],
    correctAnswer: "A",
    solution: "At least one = 55 + 40 + 30 − 15 − 12 − 10 + 5 = 93%. None = 100 − 93 = 7%."
  },
  {
    id: "Q83",
    questionNumber: 83,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A tech employee spends 25% of his salary on house rent, 15% of the remaining on loan repayments, and 20% of the rest on lifestyle expenses. If he invests 60% of the remaining balance into equity mutual funds and is left with Rs. 10,200 cash, what is his gross monthly salary?",
    options: [
      { key: "A", text: "Rs. 50,000" },
      { key: "B", text: "Rs. 52,000" },
      { key: "C", text: "Rs. 48,000" },
      { key: "D", text: "Rs. 60,000" }
    ],
    correctAnswer: "A",
    solution: "After rent = 75%. After loan = 75% × 85% = 63.75%. After lifestyle = 63.75% × 80% = 51%. Cash left = 40% of 51% = 20.4%. 20.4% of salary = Rs. 10,200 => Salary = 10,200 / 0.204 = Rs. 50,000."
  },
  {
    id: "Q84",
    questionNumber: 84,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The diagonal of a square silicon wafer decreases by 8% during high-temperature etching. By what percentage does the area of the wafer decrease?",
    options: [
      { key: "A", text: "15.36%" },
      { key: "B", text: "16.00%" },
      { key: "C", text: "14.84%" },
      { key: "D", text: "15.64%" }
    ],
    correctAnswer: "A",
    solution: "Area ∝ diagonal². Multiplier = 0.92² = 0.8464. Decrease = 1 − 0.8464 = 0.1536 = 15.36%."
  },
  {
    id: "Q85",
    questionNumber: 85,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "In an entrance exam, Candidate A scored 32% marks and fell short of passing by 28 marks. Candidate B scored 48% marks and secured 36 marks above the qualifying standard. Find the maximum marks of the exam.",
    options: [
      { key: "A", text: "400" },
      { key: "B", text: "450" },
      { key: "C", text: "500" },
      { key: "D", text: "360" }
    ],
    correctAnswer: "A",
    solution: "Difference in % = 48% − 32% = 16%. Difference in marks = 28 + 36 = 64. Maximum marks = 64 / 0.16 = 400."
  },
  {
    id: "Q86",
    questionNumber: 86,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a factory producing microcontrollers, 3% of the total units are defective. 75% of the remaining non-defective units are exported overseas, leaving 4,365 units for domestic sales. What was the total microcontroller production count?",
    options: [
      { key: "A", text: "18,000" },
      { key: "B", text: "17,500" },
      { key: "C", text: "18,500" },
      { key: "D", text: "19,000" }
    ],
    correctAnswer: "A",
    solution: "Non-defective = 97%. Domestic = 25% of 97% = 24.25%. 24.25% of total = 4,365 => Total = 4,365 / 0.2425 = 18,000."
  },
  {
    id: "Q87",
    questionNumber: 87,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A merchant marks up his hardware units by 35% above the manufacturing cost. He allows a cash discount of 10% on the marked price and pays a trade commission of 5% on the final selling price. What is his net profit percentage?",
    options: [
      { key: "A", text: "15.425%" },
      { key: "B", text: "16.200%" },
      { key: "C", text: "14.850%" },
      { key: "D", text: "15.875%" }
    ],
    correctAnswer: "A",
    solution: "Cost = 100. Marked = 135. After discount = 135 × 0.90 = 121.50. After commission = 121.50 × 0.95 = 115.425. Net profit = 15.425%."
  },
  {
    id: "Q88",
    questionNumber: 88,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A dataset pipeline processes 25% numerical values, 45% textual strings, and the rest image binaries. In an automated compression step, numerical values compress by 10%, text compresses by 40%, and images compress by 50%. What is the net percentage reduction in total dataset storage size?",
    options: [
      { key: "A", text: "35.5%" },
      { key: "B", text: "36.2%" },
      { key: "C", text: "34.8%" },
      { key: "D", text: "37.0%" }
    ],
    correctAnswer: "A",
    solution: "Total saving = (25 × 0.10) + (45 × 0.40) + (30 × 0.50) = 2.5 + 18 + 15 = 35.5%."
  },
  {
    id: "Q89",
    questionNumber: 89,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a coding tournament, 72% of competitors solved the dynamic programming problem and 58% solved the graph problem. Every competitor solved at least one problem. If 120 competitors solved both problems, how many total competitors participated?",
    options: [
      { key: "A", text: "400" },
      { key: "B", text: "350" },
      { key: "C", text: "450" },
      { key: "D", text: "500" }
    ],
    correctAnswer: "A",
    solution: "At least one = 100%. Both = 72 + 58 − 100 = 30%. 30% of total = 120 => Total = 120 / 0.30 = 400."
  },
  {
    id: "Q90",
    questionNumber: 90,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The price of an AI API token increases by 15% in Q1 and increases by another 10% in Q2. In Q3, due to server efficiency optimizations, the price is discounted by 20%. What is the overall percentage change in the token price over the three quarters?",
    options: [
      { key: "A", text: "1.2% increase" },
      { key: "B", text: "1.8% increase" },
      { key: "C", text: "0.8% decrease" },
      { key: "D", text: "2.0% increase" }
    ],
    correctAnswer: "A",
    solution: "Overall multiplier = 1.15 × 1.10 × 0.80 = 1.012. Net change = 1.2% increase."
  },
  {
    id: "Q91",
    questionNumber: 91,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "In a tech company, the salary of employee P is 25% higher than employee Q, and the salary of employee Q is 20% less than employee R. By what percentage is the salary of employee P related to employee R?",
    options: [
      { key: "A", text: "Equal to R" },
      { key: "B", text: "5% more than R" },
      { key: "C", text: "5% less than R" },
      { key: "D", text: "10% more than R" }
    ],
    correctAnswer: "A",
    solution: "Assume R = 100. Q = 80. P = 80 × 1.25 = 100. Therefore P equals R (0% difference)."
  },
  {
    id: "Q92",
    questionNumber: 92,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The radius of a circle increases by 15%. What is the percentage increase in its perimeter (circumference)?",
    options: [
      { key: "A", text: "15%" },
      { key: "B", text: "32.25%" },
      { key: "C", text: "30%" },
      { key: "D", text: "22.5%" }
    ],
    correctAnswer: "A",
    solution: "Circumference C = 2πr is directly linear in r. If radius increases by 15%, circumference increases by 15%."
  },
  {
    id: "Q93",
    questionNumber: 93,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In an election, 8% of the voters did not cast their vote. Two candidates contested, and the winning candidate obtained 48% of the total registered voters on the list and won by 1,100 votes. What was the total number of registered voters?",
    options: [
      { key: "A", text: "27,500" },
      { key: "B", text: "25,000" },
      { key: "C", text: "26,000" },
      { key: "D", text: "28,000" }
    ],
    correctAnswer: "A",
    solution: "Votes polled = 92% V. Winner = 48% V. Loser = 44% V. Margin = 48% − 44% = 4% V = 1,100 => V = 1,100 / 0.04 = 27,500."
  },
  {
    id: "Q94",
    questionNumber: 94,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A laboratory mixture contains 80% alcohol and 20% purified water by volume. If 10 liters of pure water are added to 40 liters of this mixture, what will be the new percentage concentration of alcohol?",
    options: [
      { key: "A", text: "64%" },
      { key: "B", text: "60%" },
      { key: "C", text: "68%" },
      { key: "D", text: "65%" }
    ],
    correctAnswer: "A",
    solution: "Alcohol in 40 L = 80% of 40 = 32 L. Total new volume = 50 L. New concentration = 32 / 50 × 100 = 64%."
  },
  {
    id: "Q95",
    questionNumber: 95,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "Due to power optimization in a datacenter, cooling costs decrease by 12.5% while processor compute consumption increases by 16%. If cooling costs and compute consumption previously accounted for 40% and 60% of total electrical expenditure respectively, what is the net percentage change in total power expenditure?",
    options: [
      { key: "A", text: "4.6% increase" },
      { key: "B", text: "5.2% increase" },
      { key: "C", text: "3.8% increase" },
      { key: "D", text: "4.0% increase" }
    ],
    correctAnswer: "A",
    solution: "Cooling = 40 × 0.875 = 35. Compute = 60 × 1.16 = 69.6. New total = 35 + 69.6 = 104.6. Net increase = 4.6%."
  },
  {
    id: "Q96",
    questionNumber: 96,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The base of a triangle increases by 30% while its altitude (height) is reduced by 20%. By what percentage does the area of the triangle change?",
    options: [
      { key: "A", text: "Increases by 4%" },
      { key: "B", text: "Increases by 5%" },
      { key: "C", text: "Decreases by 4%" },
      { key: "D", text: "Remains unchanged" }
    ],
    correctAnswer: "A",
    solution: "Area multiplier = 1.30 × 0.80 = 1.04. Area increases by 4%."
  },
  {
    id: "Q97",
    questionNumber: 97,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "In a multi-regional survey of 2,400 engineers, 65% preferred remote work, 45% preferred hybrid, and 15% preferred neither. How many engineers preferred BOTH remote and hybrid modes?",
    options: [
      { key: "A", text: "600" },
      { key: "B", text: "550" },
      { key: "C", text: "650" },
      { key: "D", text: "720" }
    ],
    correctAnswer: "A",
    solution: "At least one = 85%. Both = 65 + 45 − 85 = 25%. Count = 25% of 2,400 = 600."
  },
  {
    id: "Q98",
    questionNumber: 98,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A web platform’s daily active users (DAU) grow by 10% in month 1, grow by 20% in month 2, and drop by 15% in month 3. If DAU at the end of month 3 is 2,244, what was the initial DAU prior to month 1?",
    options: [
      { key: "A", text: "2,000" },
      { key: "B", text: "1,900" },
      { key: "C", text: "2,100" },
      { key: "D", text: "1,850" }
    ],
    correctAnswer: "A",
    solution: "Multiplier = 1.10 × 1.20 × 0.85 = 1.122. Initial DAU = 2,244 / 1.122 = 2,000."
  },
  {
    id: "Q99",
    questionNumber: 99,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A hardware vendor incurs an import duty of 15% on a batch of motherboards. He then marks the price up by 40% on his landed cost and gives a direct customer discount of 10%. If he makes a net profit of Rs. 4,140 per batch, what was the original untaxed import price?",
    options: [
      { key: "A", text: "Rs. 15,000" },
      { key: "B", text: "Rs. 16,000" },
      { key: "C", text: "Rs. 14,500" },
      { key: "D", text: "Rs. 18,000" }
    ],
    correctAnswer: "A",
    isInconsistent: true,
    inconsistencyNote: "Source Correct Answer is A (Rs. 15,000). Direct algebra 0.299B = 4,140 yields ~Rs. 13,846.",
    solution: "Let untaxed import price = B. Landed cost = 1.15B. Marked price = 1.15B × 1.40 = 1.61B. Selling price after 10% discount = 1.61B × 0.90 = 1.449B. Profit = 1.449B − 1.15B = 0.299B = 4,140 => B = Rs. 15,000 per source key."
  },
  {
    id: "Q100",
    questionNumber: 100,
    topic: "Percentages & Successive Percentage Changes",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The population of a tech city increases by 20% every decade. In 2000, its population was 1,25,000. What was its population in the year 2030 (after 3 decades)?",
    options: [
      { key: "A", text: "2,16,000" },
      { key: "B", text: "2,10,000" },
      { key: "C", text: "2,20,000" },
      { key: "D", text: "2,25,000" }
    ],
    correctAnswer: "A",
    solution: "3 decades: 2000 → 2010 → 2020 → 2030. Population = 1,25,000 × (1.20)³ = 1,25,000 × 1.728 = 2,16,000."
  }
];
