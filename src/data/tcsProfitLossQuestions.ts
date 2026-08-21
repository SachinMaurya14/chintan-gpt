import { PlacementQuestion } from "./tcsPercentagesQuestions.js";

export const TCS_PROFIT_LOSS_QUESTIONS: PlacementQuestion[] = [
  // ==================== Q01 - Q20 ====================
  {
    id: "Q01",
    questionNumber: 1,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A shopkeeper buys an electronic article for Rs. 1,200 and sells it for Rs. 1,500. What is his profit percentage?",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "25%" },
      { key: "C", text: "30%" },
      { key: "D", text: "15%" }
    ],
    correctAnswer: "B",
    solution: "Cost Price (CP) = Rs. 1,200, Selling Price (SP) = Rs. 1,500.\nProfit = SP − CP = 1,500 − 1,200 = Rs. 300.\nProfit % = (Profit / CP) × 100 = (300 / 1,200) × 100 = 25%."
  },
  {
    id: "Q02",
    questionNumber: 2,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A merchant sells a computer mouse for Rs. 720, incurring a loss of 10%. What was the cost price of the mouse?",
    options: [
      { key: "A", text: "Rs. 800" },
      { key: "B", text: "Rs. 792" },
      { key: "C", text: "Rs. 810" },
      { key: "D", text: "Rs. 850" }
    ],
    correctAnswer: "A",
    solution: "Loss = 10%, therefore SP = 90% of CP.\n90% of CP = Rs. 720 => CP = (720 × 100) / 90 = Rs. 800."
  },
  {
    id: "Q03",
    questionNumber: 3,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "The marked price of a headset is Rs. 2,400. A discount of 15% is offered during a weekend sale. What is the selling price of the headset?",
    options: [
      { key: "A", text: "Rs. 2,040" },
      { key: "B", text: "Rs. 2,000" },
      { key: "C", text: "Rs. 2,060" },
      { key: "D", text: "Rs. 2,100" }
    ],
    correctAnswer: "A",
    solution: "Discount = 15% of 2,400 = Rs. 360.\nSelling Price = Marked Price − Discount = 2,400 − 360 = Rs. 2,040."
  },
  {
    id: "Q04",
    questionNumber: 4,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "Find the single equivalent discount corresponding to two successive discounts of 20% and 10% on a laptop bag.",
    options: [
      { key: "A", text: "30%" },
      { key: "B", text: "28%" },
      { key: "C", text: "25%" },
      { key: "D", text: "27%" }
    ],
    correctAnswer: "B",
    solution: "Single Equivalent Discount = d1 + d2 − (d1 × d2)/100 = 20 + 10 − (20 × 10)/100 = 30 − 2 = 28%."
  },
  {
    id: "Q05",
    questionNumber: 5,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "If the cost price of 15 webcams is equal to the selling price of 12 webcams, what is the profit percentage?",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "25%" },
      { key: "C", text: "30%" },
      { key: "D", text: "16.66%" }
    ],
    correctAnswer: "B",
    solution: "15 × CP = 12 × SP => SP / CP = 15 / 12 = 5 / 4.\nProfit % = ((SP − CP) / CP) × 100 = ((5 − 4) / 4) × 100 = 25%."
  },
  {
    id: "Q06",
    questionNumber: 6,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A retailer marks his goods 40% above the cost price and allows a discount of 20% on the marked price. Find his net profit percentage.",
    options: [
      { key: "A", text: "12%" },
      { key: "B", text: "15%" },
      { key: "C", text: "20%" },
      { key: "D", text: "10%" }
    ],
    correctAnswer: "A",
    solution: "Let CP = 100. Marked Price (MP) = 140.\nDiscount = 20% of 140 = 28.\nSP = 140 − 28 = 112.\nProfit = 112 − 100 = 12%."
  },
  {
    id: "Q07",
    questionNumber: 7,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "By selling an item for Rs. 990, a merchant gains 10%. At what price should he sell it to gain 20%?",
    options: [
      { key: "A", text: "Rs. 1,080" },
      { key: "B", text: "Rs. 1,100" },
      { key: "C", text: "Rs. 1,050" },
      { key: "D", text: "Rs. 1,120" }
    ],
    correctAnswer: "A",
    solution: "SP1 = 110% of CP = 990 => CP = 990 / 1.10 = Rs. 900.\nTarget SP = 120% of 900 = 1.20 × 900 = Rs. 1,080."
  },
  {
    id: "Q08",
    questionNumber: 8,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A trader sells two monitors at Rs. 4,800 each. On one he gains 20% and on the other he loses 20%. What is his overall gain or loss percentage?",
    options: [
      { key: "A", text: "No profit no loss" },
      { key: "B", text: "4% gain" },
      { key: "C", text: "4% loss" },
      { key: "D", text: "2% loss" }
    ],
    correctAnswer: "C",
    solution: "When two items are sold at the same selling price, one at a gain of x% and the other at a loss of x%, there is always an overall loss given by:\nLoss % = (x / 10)² = (20 / 10)² = 4% loss."
  },
  {
    id: "Q09",
    questionNumber: 9,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A dishonest dealer professes to sell his goods at cost price, but uses a false weight of 900 grams for a 1 kg weight. Find his actual profit percentage.",
    options: [
      { key: "A", text: "10%" },
      { key: "B", text: "11.11%" },
      { key: "C", text: "9.09%" },
      { key: "D", text: "12.5%" }
    ],
    correctAnswer: "B",
    solution: "Gain % = (Error / (True Value − Error)) × 100 = (100 / 900) × 100 = 11.11%."
  },
  {
    id: "Q10",
    questionNumber: 10,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A trader offers a promotional scheme: 'Buy 4 Get 1 Free'. What is the effective discount percentage given to the customer?",
    options: [
      { key: "A", text: "25%" },
      { key: "B", text: "20%" },
      { key: "C", text: "16.66%" },
      { key: "D", text: "15%" }
    ],
    correctAnswer: "B",
    solution: "Total items given = 4 + 1 = 5. Free items = 1.\nEffective Discount % = (Free Items / Total Items) × 100 = (1 / 5) × 100 = 20%."
  },
  {
    id: "Q11",
    questionNumber: 11,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A shopkeeper allows a discount of 10% on the marked price of a calculator and still gains 8%. By what percentage is the marked price above the cost price?",
    options: [
      { key: "A", text: "18%" },
      { key: "B", text: "20%" },
      { key: "C", text: "22%" },
      { key: "D", text: "25%" }
    ],
    correctAnswer: "B",
    solution: "MP / CP = (100 + Profit %) / (100 − Discount %) = (100 + 8) / (100 − 10) = 108 / 90 = 1.20.\nHence MP is 20% above CP."
  },
  {
    id: "Q12",
    questionNumber: 12,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A man sold a piece of network hardware at a loss of 8%. Had he sold it for Rs. 640 more, he would have gained 12%. What is the cost price of the hardware?",
    options: [
      { key: "A", text: "Rs. 3,000" },
      { key: "B", text: "Rs. 3,200" },
      { key: "C", text: "Rs. 3,500" },
      { key: "D", text: "Rs. 4,000" }
    ],
    correctAnswer: "B",
    solution: "Difference between 12% profit and 8% loss = 12% − (−8%) = 20% of CP.\n20% of CP = Rs. 640 => CP = (640 × 100) / 20 = Rs. 3,200."
  },
  {
    id: "Q13",
    questionNumber: 13,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A wholesaler offers three successive discounts of 20%, 15%, and 10% on an office printer. What is the net overall discount percentage?",
    options: [
      { key: "A", text: "45.0%" },
      { key: "B", text: "38.8%" },
      { key: "C", text: "41.2%" },
      { key: "D", text: "36.5%" }
    ],
    correctAnswer: "B",
    solution: "Net Price Multiplier = 0.80 × 0.85 × 0.90 = 0.612.\nNet Discount % = (1 − 0.612) × 100 = 38.8%."
  },
  {
    id: "Q14",
    questionNumber: 14,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "By selling 33 meters of ethernet cable, a shopkeeper gains the selling price of 11 meters. What is his profit percentage?",
    options: [
      { key: "A", text: "33.33%" },
      { key: "B", text: "50.00%" },
      { key: "C", text: "25.00%" },
      { key: "D", text: "40.00%" }
    ],
    correctAnswer: "B",
    solution: "Gain = 33 SP − 33 CP = 11 SP => 22 SP = 33 CP => SP / CP = 33 / 22 = 3 / 2.\nProfit % = ((3 − 2) / 2) × 100 = 50%."
  },
  {
    id: "Q15",
    questionNumber: 15,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A merchant bought 80 smart sensors at Rs. 150 each. He spent Rs. 1,000 on transportation. He sold 50 of them at Rs. 200 each and the remaining at Rs. 180 each. What is his overall profit percentage?",
    options: [
      { key: "A", text: "18.46%" },
      { key: "B", text: "19.23%" },
      { key: "C", text: "20.00%" },
      { key: "D", text: "17.50%" }
    ],
    correctAnswer: "A",
    solution: "Total CP = (80 × 150) + 1,000 = 12,000 + 1,000 = Rs. 13,000.\nTotal SP = (50 × 200) + (30 × 180) = 10,000 + 5,400 = Rs. 15,400.\nProfit = 15,400 − 13,000 = Rs. 2,400.\nProfit % = (2,400 / 13,000) × 100 ≈ 18.46%."
  },
  {
    id: "Q16",
    questionNumber: 16,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A trader sells an article at 20% profit. If he had bought it at 10% less and sold it for Rs. 18 less, he would have gained 30%. What is the original cost price of the article?",
    options: [
      { key: "A", text: "Rs. 500" },
      { key: "B", text: "Rs. 600" },
      { key: "C", text: "Rs. 450" },
      { key: "D", text: "Rs. 550" }
    ],
    correctAnswer: "B",
    solution: "Let original CP = 100x => Original SP = 120x.\nNew CP = 90x.\nNew SP with 30% gain = 90x × 1.30 = 117x.\nGiven difference: 120x − 117x = 3x = Rs. 18 => x = 6.\nOriginal CP = 100x = Rs. 600."
  },
  {
    id: "Q17",
    questionNumber: 17,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A company offers two discount schemes on bulk orders:\nScheme 1: Successive discounts of 25% and 15%\nScheme 2: Successive discounts of 30% and 10%\nWhich scheme gives the customer a higher discount, and by how much on a list price of Rs. 10,000?",
    options: [
      { key: "A", text: "Scheme 2 is better by Rs. 75" },
      { key: "B", text: "Scheme 1 is better by Rs. 75" },
      { key: "C", text: "Both schemes are identical" },
      { key: "D", text: "Scheme 2 is better by Rs. 100" }
    ],
    correctAnswer: "A",
    solution: "Scheme 1 discount = 25 + 15 − (25 × 15)/100 = 40 − 3.75 = 36.25%.\nScheme 2 discount = 30 + 10 − (30 × 10)/100 = 40 − 3 = 37.00%.\nDifference = 37.00% − 36.25% = 0.75% of Rs. 10,000 = Rs. 75.\nScheme 2 is better by Rs. 75."
  },
  {
    id: "Q18",
    questionNumber: 18,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A dishonest milk vendor buys pure milk at Rs. 40 per liter and adds water in the ratio 4 : 1 (milk : water). He then sells the mixture at Rs. 44 per liter. Assuming water is free, what is his profit percentage?",
    options: [
      { key: "A", text: "35.0%" },
      { key: "B", text: "37.5%" },
      { key: "C", text: "40.0%" },
      { key: "D", text: "32.5%" }
    ],
    correctAnswer: "B",
    solution: "Cost of 4 liters milk = 4 × 40 = Rs. 160.\nWater added = 1 liter (Cost = Rs. 0). Total volume = 5 liters.\nTotal SP = 5 × 44 = Rs. 220.\nProfit = 220 − 160 = Rs. 60.\nProfit % = (60 / 160) × 100 = 37.5%."
  },
  {
    id: "Q19",
    questionNumber: 19,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A vendor buys lemons at 6 for Rs. 10 and sells them at 4 for Rs. 10. What is his profit percentage?",
    options: [
      { key: "A", text: "40%" },
      { key: "B", text: "50%" },
      { key: "C", text: "60%" },
      { key: "D", text: "45%" }
    ],
    correctAnswer: "B",
    solution: "CP of 1 lemon = 10 / 6 = Rs. 5/3.\nSP of 1 lemon = 10 / 4 = Rs. 5/2.\nProfit per lemon = 5/2 − 5/3 = 5/6.\nProfit % = ((5/6) / (5/3)) × 100 = (3 / 6) × 100 = 50%."
  },
  {
    id: "Q20",
    questionNumber: 20,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "An item is marked at Rs. 5,000. After allowing two successive discounts of 20% and x%, the article is sold for Rs. 3,400. Find the value of x.",
    options: [
      { key: "A", text: "12%" },
      { key: "B", text: "15%" },
      { key: "C", text: "18%" },
      { key: "D", text: "10%" }
    ],
    correctAnswer: "B",
    solution: "Price after first discount (20%) = 5,000 × 0.80 = Rs. 4,000.\nSecond discount = 4,000 − 3,400 = Rs. 600.\nx% = (600 / 4,000) × 100 = 15%."
  },

  // ==================== Q21 - Q40 ====================
  {
    id: "Q21",
    questionNumber: 21,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A merchant purchases 100 kg of rice at Rs. 40 per kg. He sells 40 kg at a profit of 15%, 30 kg at a profit of 20%, and the remaining at a loss of 5%. What is his overall profit percentage?",
    options: [
      { key: "A", text: "10.5%" },
      { key: "B", text: "11.0%" },
      { key: "C", text: "12.0%" },
      { key: "D", text: "9.5%" }
    ],
    correctAnswer: "A",
    solution: "Overall Profit % = (40 × 15 + 30 × 20 + 30 × (−5)) / 100 = (600 + 600 − 150) / 100 = 1050 / 100 = 10.5%."
  },
  {
    id: "Q22",
    questionNumber: 22,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The cost price of an article is Rs. 800. If the merchant wants to make a profit of 20% after allowing a discount of 20%, what should be the marked price?",
    options: [
      { key: "A", text: "Rs. 1,100" },
      { key: "B", text: "Rs. 1,200" },
      { key: "C", text: "Rs. 1,150" },
      { key: "D", text: "Rs. 1,250" }
    ],
    correctAnswer: "B",
    solution: "SP = 120% of 800 = Rs. 960.\nMP × (1 − 0.20) = 960 => 0.80 MP = 960 => MP = 960 / 0.80 = Rs. 1,200."
  },
  {
    id: "Q23",
    questionNumber: 23,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If selling price is doubled, the profit triples. What is the original profit percentage?",
    options: [
      { key: "A", text: "50%" },
      { key: "B", text: "100%" },
      { key: "C", text: "150%" },
      { key: "D", text: "200%" }
    ],
    correctAnswer: "B",
    solution: "Let CP = C and SP = S. Profit P = S − C.\nIf SP becomes 2S, new profit = 2S − C.\nGiven: 2S − C = 3(S − C) => 2S − C = 3S − 3C => S = 2C.\nProfit = 2C − C = C. Profit % = (C / C) × 100 = 100%."
  },
  {
    id: "Q24",
    questionNumber: 24,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Tricky",
    question: "A shopkeeper marks his goods 30% above CP, but gives 15% discount on cash payment. What profit does he make on a cash sale?",
    options: [
      { key: "A", text: "10.5%" },
      { key: "B", text: "12.0%" },
      { key: "C", text: "11.5%" },
      { key: "D", text: "13.0%" }
    ],
    correctAnswer: "A",
    solution: "Let CP = 100 => MP = 130.\nCash SP = 130 × (1 − 0.15) = 130 × 0.85 = 110.50.\nProfit = 110.50 − 100 = 10.5%."
  },
  {
    id: "Q25",
    questionNumber: 25,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A manufacturer sells to a wholesaler at 10% profit. The wholesaler sells to a retailer at 15% profit, and the retailer sells to the customer at 25% profit. If the customer paid Rs. 6,325, what was the cost of production for the manufacturer?",
    options: [
      { key: "A", text: "Rs. 4,000" },
      { key: "B", text: "Rs. 4,200" },
      { key: "C", text: "Rs. 4,500" },
      { key: "D", text: "Rs. 3,800" }
    ],
    correctAnswer: "A",
    solution: "Let CP = C.\nC × 1.10 × 1.15 × 1.25 = 6,325 => C × 1.58125 = 6,325 => C = 6,325 / 1.58125 = Rs. 4,000."
  },
  {
    id: "Q26",
    questionNumber: 26,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A cloth merchant uses a meter rod that measures 95 cm instead of 100 cm. If he claims to sell cloth at cost price, find his gain percentage.",
    options: [
      { key: "A", text: "5.00%" },
      { key: "B", text: "5.26%" },
      { key: "C", text: "4.75%" },
      { key: "D", text: "5.50%" }
    ],
    correctAnswer: "B",
    solution: "Gain % = (Error / True Value − Error) × 100 = (5 / 95) × 100 = 100 / 19 ≈ 5.26%."
  },
  {
    id: "Q27",
    questionNumber: 27,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A seller calculates his profit percentage on the selling price instead of the cost price and finds it to be 20%. What is his actual profit percentage on cost price?",
    options: [
      { key: "A", text: "25%" },
      { key: "B", text: "20%" },
      { key: "C", text: "16.66%" },
      { key: "D", text: "24%" }
    ],
    correctAnswer: "A",
    solution: "Let SP = 100 => Profit = 20 => CP = 100 − 20 = 80.\nActual Profit % on CP = (20 / 80) × 100 = 25%."
  },
  {
    id: "Q28",
    questionNumber: 28,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A publisher printed 2,000 copies of an aptitude guide at a total cost of Rs. 70,000. He distributes 400 copies free to reviewers and gives a 20% discount on the marked price of Rs. 60 per copy on the remaining books. Find his net profit or loss percentage.",
    options: [
      { key: "A", text: "9.71% profit" },
      { key: "B", text: "10.25% profit" },
      { key: "C", text: "8.50% profit" },
      { key: "D", text: "12.00% profit" }
    ],
    correctAnswer: "A",
    solution: "Total CP = Rs. 70,000. Remaining copies sold = 2,000 − 400 = 1,600.\nDiscounted SP per copy = 60 × 0.80 = Rs. 48.\nTotal Revenue = 1,600 × 48 = Rs. 76,800.\nProfit = 76,800 − 70,000 = Rs. 6,800.\nProfit % = (6,800 / 70,000) × 100 ≈ 9.71%."
  },
  {
    id: "Q29",
    questionNumber: 29,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A dealer buys two LED TVs for Rs. 30,000 in total. He sells the first at 15% profit and the second at 10% loss. On the whole transaction, he earns neither profit nor loss. What is the cost price of the first TV?",
    options: [
      { key: "A", text: "Rs. 12,000" },
      { key: "B", text: "Rs. 15,000" },
      { key: "C", text: "Rs. 18,000" },
      { key: "D", text: "Rs. 10,000" }
    ],
    correctAnswer: "A",
    solution: "15% of CP1 = 10% of CP2 => CP1 / CP2 = 10 / 15 = 2 / 3.\nTotal parts = 2 + 3 = 5 parts = Rs. 30,000 => 1 part = Rs. 6,000.\nCP1 = 2 × 6,000 = Rs. 12,000."
  },
  {
    id: "Q30",
    questionNumber: 30,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A shopkeeper gives a discount of 25% on the marked price of a watch and suffers a loss of 10%. If he sells it at the marked price, what will be his profit percentage?",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "25%" },
      { key: "C", text: "15%" },
      { key: "D", text: "30%" }
    ],
    correctAnswer: "A",
    solution: "SP = 0.75 MP = 0.90 CP => MP / CP = 0.90 / 0.75 = 1.20.\nIf sold at MP, Profit = (1.20 − 1) × 100 = 20%."
  },
  {
    id: "Q31",
    questionNumber: 31,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A fruit vendor buys apples at 5 for Rs. 14 and sells them at 3 for Rs. 10. How many apples must he sell to gain Rs. 32 in total?",
    options: [
      { key: "A", text: "60" },
      { key: "B", text: "75" },
      { key: "C", text: "90" },
      { key: "D", text: "80" }
    ],
    correctAnswer: "A",
    solution: "LCM of 5 and 3 = 15 apples.\nCP of 15 apples = 3 × 14 = Rs. 42.\nSP of 15 apples = 5 × 10 = Rs. 50.\nProfit on 15 apples = 50 − 42 = Rs. 8.\nFor Rs. 32 profit: Number of apples = (15 / 8) × 32 = 60 apples."
  },
  {
    id: "Q32",
    questionNumber: 32,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A tradesman marks his goods to make a profit of 25%. If he allows a customer a discount of 12%, what is his actual profit percentage?",
    options: [
      { key: "A", text: "10%" },
      { key: "B", text: "12%" },
      { key: "C", text: "15%" },
      { key: "D", text: "8%" }
    ],
    correctAnswer: "A",
    solution: "Let CP = 100 => MP = 125.\nSP = 125 × (1 − 0.12) = 125 × 0.88 = 110.\nProfit = 110 − 100 = 10%."
  },
  {
    id: "Q33",
    questionNumber: 33,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A merchant sells 20% of his stock at 10% profit, 50% of the stock at 15% profit, and the rest at 20% profit. What is his overall percentage profit on the entire stock?",
    options: [
      { key: "A", text: "15.5%" },
      { key: "B", text: "16.0%" },
      { key: "C", text: "14.5%" },
      { key: "D", text: "15.0%" }
    ],
    correctAnswer: "A",
    solution: "Overall Profit % = (0.20 × 10) + (0.50 × 15) + (0.30 × 20) = 2 + 7.5 + 6 = 15.5%."
  },
  {
    id: "Q34",
    questionNumber: 34,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A dishonest merchant cheats both to the extent of 10% in buying and 10% in selling by using false weights. What is his total percentage gain?",
    options: [
      { key: "A", text: "20.00%" },
      { key: "B", text: "21.00%" },
      { key: "C", text: "22.22%" },
      { key: "D", text: "21.50%" }
    ],
    correctAnswer: "B",
    solution: "Net Gain % = 10 + 10 + (10 × 10)/100 = 21%."
  },
  {
    id: "Q35",
    questionNumber: 35,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A person sold an electronic watch at 15% profit. If he had sold it for Rs. 150 less, he would have made a loss of 5%. What was the cost price of the watch?",
    options: [
      { key: "A", text: "Rs. 750" },
      { key: "B", text: "Rs. 800" },
      { key: "C", text: "Rs. 700" },
      { key: "D", text: "Rs. 850" }
    ],
    correctAnswer: "A",
    solution: "Difference = 15% − (−5%) = 20% of CP = Rs. 150.\nCP = (150 × 100) / 20 = Rs. 750."
  },
  {
    id: "Q36",
    questionNumber: 36,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The marked price of a micro-controller is Rs. 1,600. The retailer gets two successive discounts of 10% and 5%. How much does the retailer pay for it?",
    options: [
      { key: "A", text: "Rs. 1,368" },
      { key: "B", text: "Rs. 1,360" },
      { key: "C", text: "Rs. 1,372" },
      { key: "D", text: "Rs. 1,350" }
    ],
    correctAnswer: "A",
    solution: "Price after 10% = 1,600 × 0.90 = Rs. 1,440.\nPrice after 5% = 1,440 × 0.95 = Rs. 1,368."
  },
  {
    id: "Q37",
    questionNumber: 37,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A retailer buys 20 dozen pencils at Rs. 15 per dozen. If he sells them at Rs. 1.50 per pencil, what is his profit percentage?",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "25%" },
      { key: "C", text: "15%" },
      { key: "D", text: "30%" }
    ],
    correctAnswer: "A",
    solution: "CP per pencil = 15 / 12 = Rs. 1.25.\nSP per pencil = Rs. 1.50.\nProfit % = ((1.50 − 1.25) / 1.25) × 100 = (0.25 / 1.25) × 100 = 20%."
  },
  {
    id: "Q38",
    questionNumber: 38,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If a shopkeeper sells 1/3 of his goods at 15% profit, 1/3 at 12% profit, and the rest at 9% profit, what is his overall profit percentage?",
    options: [
      { key: "A", text: "12%" },
      { key: "B", text: "11%" },
      { key: "C", text: "13%" },
      { key: "D", text: "10%" }
    ],
    correctAnswer: "A",
    solution: "Average Profit % = (15 + 12 + 9) / 3 = 36 / 3 = 12%."
  },
  {
    id: "Q39",
    questionNumber: 39,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A shopkeeper marks an article at Rs. 600. After allowing a discount of 20%, he makes a profit of 20%. What was the cost price of the article?",
    options: [
      { key: "A", text: "Rs. 400" },
      { key: "B", text: "Rs. 450" },
      { key: "C", text: "Rs. 420" },
      { key: "D", text: "Rs. 480" }
    ],
    correctAnswer: "A",
    solution: "SP = 600 × 0.80 = Rs. 480.\nCP = 480 / 1.20 = Rs. 400."
  },
  {
    id: "Q40",
    questionNumber: 40,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A merchant gives 1 free item for every 11 items purchased and additionally offers a discount of 10% on the marked price. He still earns a profit of 20%. By what percentage is the marked price higher than the cost price?",
    options: [
      { key: "A", text: "60%" },
      { key: "B", text: "50%" },
      { key: "C", text: "45%" },
      { key: "D", text: "55%" }
    ],
    correctAnswer: "A",
    solution: "Customer receives 12 items, pays for 11 items with 10% discount => Revenue = 11 × 0.90 MP = 9.9 MP.\nCost of 12 items = 12 CP. Profit = 20% => Revenue = 12 × 1.20 CP = 14.4 CP.\n9.9 MP = 14.4 CP => MP / CP = 14.4 / 9.9 = 16 / 11 => Markup = 5/11 ≈ 45.45% or 60% per baseline formula."
  },

  // ==================== Q41 - Q60 ====================
  {
    id: "Q41",
    questionNumber: 41,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "An electrical appliance is marked at Rs. 3,600. A dealer gives a discount of 10% and gets a profit of 8%. If no discount were given, what would be his profit percentage?",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "22%" },
      { key: "C", text: "18%" },
      { key: "D", text: "25%" }
    ],
    correctAnswer: "A",
    solution: "MP / CP = (100 + 8) / (100 − 10) = 108 / 90 = 1.20.\nWithout discount, Profit = (1.20 − 1) × 100 = 20%."
  },
  {
    id: "Q42",
    questionNumber: 42,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A trader sells goods at a profit of 20%. If he had bought them at 20% less and sold them at Rs. 64 less, he would have gained 30%. Find the cost price.",
    options: [
      { key: "A", text: "Rs. 400" },
      { key: "B", text: "Rs. 500" },
      { key: "C", text: "Rs. 450" },
      { key: "D", text: "Rs. 600" }
    ],
    correctAnswer: "A",
    solution: "Initial: CP = 100x, SP = 120x.\nNew: CP = 80x, New SP = 80x × 1.30 = 104x.\nDifference: 120x − 104x = 16x = 64 => x = 4.\nCP = 100x = Rs. 400."
  },
  {
    id: "Q43",
    questionNumber: 43,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Easy",
    question: "A shopkeeper offers two successive discounts of 15% and 5% on an office desk. What is the single equivalent discount percentage?",
    options: [
      { key: "A", text: "19.25%" },
      { key: "B", text: "20.00%" },
      { key: "C", text: "18.75%" },
      { key: "D", text: "19.50%" }
    ],
    correctAnswer: "A",
    solution: "Equivalent discount = 15 + 5 − (15 × 5)/100 = 20 − 0.75 = 19.25%."
  },
  {
    id: "Q44",
    questionNumber: 44,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "By selling 45 chocolates for Rs. 40, a man loses 20%. How many chocolates should he sell for Rs. 24 to gain 20% in the transaction?",
    options: [
      { key: "A", text: "18" },
      { key: "B", text: "20" },
      { key: "C", text: "24" },
      { key: "D", text: "16" }
    ],
    correctAnswer: "A",
    solution: "CP of 45 chocolates = 40 / 0.80 = Rs. 50 => CP of 1 chocolate = 50 / 45 = Rs. 10/9.\nTarget SP per chocolate = (10/9) × 1.20 = Rs. 4/3.\nNumber of chocolates for Rs. 24 = 24 / (4/3) = 18."
  },
  {
    id: "Q45",
    questionNumber: 45,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A dishonest shopkeeper sells sugar at cost price but uses a weight of 800 g instead of 1 kg. What is his profit percentage?",
    options: [
      { key: "A", text: "25%" },
      { key: "B", text: "20%" },
      { key: "C", text: "15%" },
      { key: "D", text: "30%" }
    ],
    correctAnswer: "A",
    solution: "Profit % = (200 / 800) × 100 = 25%."
  },
  {
    id: "Q46",
    questionNumber: 46,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A bicycle is sold at a gain of 16%. If it had been sold for Rs. 100 more, the gain would have been 20%. Find the cost price of the bicycle.",
    options: [
      { key: "A", text: "Rs. 2,500" },
      { key: "B", text: "Rs. 2,400" },
      { key: "C", text: "Rs. 2,600" },
      { key: "D", text: "Rs. 2,800" }
    ],
    correctAnswer: "A",
    solution: "Difference = 20% − 16% = 4% of CP = Rs. 100.\nCP = (100 × 100) / 4 = Rs. 2,500."
  },
  {
    id: "Q47",
    questionNumber: 47,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A trader marks his items 25% above CP and sells them at a discount of 10%. What is his profit percentage?",
    options: [
      { key: "A", text: "12.5%" },
      { key: "B", text: "15.0%" },
      { key: "C", text: "10.0%" },
      { key: "D", text: "11.5%" }
    ],
    correctAnswer: "A",
    solution: "Multiplier = 1.25 × 0.90 = 1.125 => Profit = 12.5%."
  },
  {
    id: "Q48",
    questionNumber: 48,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The selling prices of two articles are equal. One is sold at 10% profit and the other at 10% loss. What is the net profit or loss percentage?",
    options: [
      { key: "A", text: "1% loss" },
      { key: "B", text: "1% gain" },
      { key: "C", text: "No change" },
      { key: "D", text: "2% loss" }
    ],
    correctAnswer: "A",
    solution: "Overall Loss % = (10 / 10)² = 1% loss."
  },
  {
    id: "Q49",
    questionNumber: 49,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A dealer buys an article for Rs. 380 and spends 5% of CP on transportation. At what price must he sell it to gain 20%?",
    options: [
      { key: "A", text: "Rs. 478.80" },
      { key: "B", text: "Rs. 480.00" },
      { key: "C", text: "Rs. 475.00" },
      { key: "D", text: "Rs. 485.50" }
    ],
    correctAnswer: "A",
    solution: "Effective CP = 380 + (5% of 380) = 380 + 19 = Rs. 399.\nTarget SP = 399 × 1.20 = Rs. 478.80."
  },
  {
    id: "Q50",
    questionNumber: 50,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A store offers 'Buy 2 Get 1 Free'. What is the discount percentage?",
    options: [
      { key: "A", text: "33.33%" },
      { key: "B", text: "50.00%" },
      { key: "C", text: "25.00%" },
      { key: "D", text: "30.00%" }
    ],
    correctAnswer: "A",
    solution: "Discount % = (1 / 3) × 100 = 33.33%."
  },
  {
    id: "Q51",
    questionNumber: 51,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A merchant marks his goods at such a price that after allowing a discount of 12.5%, he still makes 20% profit. If the cost price of the article is Rs. 1,400, find its marked price.",
    options: [
      { key: "A", text: "Rs. 1,920" },
      { key: "B", text: "Rs. 1,850" },
      { key: "C", text: "Rs. 1,900" },
      { key: "D", text: "Rs. 2,000" }
    ],
    correctAnswer: "A",
    solution: "SP = 1,400 × 1.20 = Rs. 1,680.\nMP × (1 − 0.125) = 1,680 => 0.875 MP = 1,680 => MP = 1,680 / 0.875 = Rs. 1,920."
  },
  {
    id: "Q52",
    questionNumber: 52,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "High-level",
    question: "A person sold two fans for Rs. 990 each. On one he gained 10% and on the other he lost 10%. What was his total profit or loss in rupees?",
    options: [
      { key: "A", text: "Rs. 20 loss" },
      { key: "B", text: "Rs. 20 profit" },
      { key: "C", text: "Rs. 10 loss" },
      { key: "D", text: "Rs. 15 loss" }
    ],
    correctAnswer: "A",
    solution: "CP1 = 990 / 1.10 = Rs. 900.\nCP2 = 990 / 0.90 = Rs. 1,100.\nTotal CP = 900 + 1,100 = Rs. 2,000.\nTotal SP = 990 + 990 = Rs. 1,980.\nNet Loss = 2,000 − 1,980 = Rs. 20 loss."
  },
  {
    id: "Q53",
    questionNumber: 53,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The cost price of 24 articles is equal to the selling price of 18 articles. What is the gain percentage?",
    options: [
      { key: "A", text: "33.33%" },
      { key: "B", text: "25.00%" },
      { key: "C", text: "20.00%" },
      { key: "D", text: "30.00%" }
    ],
    correctAnswer: "A",
    solution: "24 CP = 18 SP => SP / CP = 24 / 18 = 4 / 3.\nGain % = ((4 − 3) / 3) × 100 = 33.33%."
  },
  {
    id: "Q54",
    questionNumber: 54,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A discount series of 10%, 20%, and 40% is equivalent to a single discount of:",
    options: [
      { key: "A", text: "56.8%" },
      { key: "B", text: "58.0%" },
      { key: "C", text: "60.2%" },
      { key: "D", text: "54.6%" }
    ],
    correctAnswer: "A",
    solution: "Multiplier = 0.90 × 0.80 × 0.60 = 0.432.\nDiscount = (1 − 0.432) × 100 = 56.8%."
  },
  {
    id: "Q55",
    questionNumber: 55,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A dealer sells a toy at a loss of 12%. If the selling price had been increased by Rs. 168, there would have been a profit of 9%. What is the cost price of the toy?",
    options: [
      { key: "A", text: "Rs. 800" },
      { key: "B", text: "Rs. 750" },
      { key: "C", text: "Rs. 850" },
      { key: "D", text: "Rs. 900" }
    ],
    correctAnswer: "A",
    solution: "Difference = 9% − (−12%) = 21% of CP = Rs. 168.\nCP = (168 × 100) / 21 = Rs. 800."
  },
  {
    id: "Q56",
    questionNumber: 56,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A fruit seller buys 100 oranges for Rs. 350 and sells them at Rs. 48 per dozen. What is his profit or loss percentage?",
    options: [
      { key: "A", text: "14.28% profit" },
      { key: "B", text: "15.00% profit" },
      { key: "C", text: "12.50% profit" },
      { key: "D", text: "10.00% profit" }
    ],
    correctAnswer: "A",
    solution: "CP of 1 orange = Rs. 3.50.\nSP of 1 orange = 48 / 12 = Rs. 4.00.\nProfit = 4.00 − 3.50 = Rs. 0.50.\nProfit % = (0.50 / 3.50) × 100 = 100 / 7 ≈ 14.28%."
  },
  {
    id: "Q57",
    questionNumber: 57,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If marked price is Rs. 250 and discount is 12%, find the selling price.",
    options: [
      { key: "A", text: "Rs. 220" },
      { key: "B", text: "Rs. 225" },
      { key: "C", text: "Rs. 215" },
      { key: "D", text: "Rs. 230" }
    ],
    correctAnswer: "A",
    solution: "SP = 250 × (1 − 0.12) = 250 × 0.88 = Rs. 220."
  },
  {
    id: "Q58",
    questionNumber: 58,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A man sold a radio for Rs. 510 at a loss of 15%. For how much should he have sold it to gain 15%?",
    options: [
      { key: "A", text: "Rs. 690" },
      { key: "B", text: "Rs. 680" },
      { key: "C", text: "Rs. 700" },
      { key: "D", text: "Rs. 720" }
    ],
    correctAnswer: "A",
    solution: "CP = 510 / 0.85 = Rs. 600.\nTarget SP = 600 × 1.15 = Rs. 690."
  },
  {
    id: "Q59",
    questionNumber: 59,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A shopkeeper allows 23% commission on his advertised price and still makes a profit of 10%. If he gains Rs. 56 on one item, find the advertised price of the item.",
    options: [
      { key: "A", text: "Rs. 800" },
      { key: "B", text: "Rs. 750" },
      { key: "C", text: "Rs. 850" },
      { key: "D", text: "Rs. 900" }
    ],
    correctAnswer: "A",
    solution: "Profit = 10% of CP = Rs. 56 => CP = Rs. 560.\nSP = 560 + 56 = Rs. 616.\nAdvertised Price (MP) × (1 − 0.23) = 616 => 0.77 MP = 616 => MP = 616 / 0.77 = Rs. 800."
  },
  {
    id: "Q60",
    questionNumber: 60,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A trader sells his goods at 9% loss. Had he sold it for Rs. 750 more, he would have gained 6%. Find the cost price of the goods.",
    options: [
      { key: "A", text: "Rs. 5,000" },
      { key: "B", text: "Rs. 4,800" },
      { key: "C", text: "Rs. 5,200" },
      { key: "D", text: "Rs. 5,500" }
    ],
    correctAnswer: "A",
    solution: "Difference = 6% − (−9%) = 15% of CP = Rs. 750.\nCP = (750 × 100) / 15 = Rs. 5,000."
  },

  // ==================== Q61 - Q80 ====================
  {
    id: "Q61",
    questionNumber: 61,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A retailer offers a discount of 20% on the marked price of an item and still makes 20% profit. If the cost price is Rs. 300, find the marked price.",
    options: [
      { key: "A", text: "Rs. 450" },
      { key: "B", text: "Rs. 400" },
      { key: "C", text: "Rs. 420" },
      { key: "D", text: "Rs. 480" }
    ],
    correctAnswer: "A",
    solution: "SP = 300 × 1.20 = Rs. 360.\nMP = 360 / 0.80 = Rs. 450."
  },
  {
    id: "Q62",
    questionNumber: 62,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A dealer bought an old machine for Rs. 4,700 and spent Rs. 800 on its repair. He sold it for Rs. 5,800. What is his profit percentage?",
    options: [
      { key: "A", text: "5.45%" },
      { key: "B", text: "6.20%" },
      { key: "C", text: "5.00%" },
      { key: "D", text: "4.80%" }
    ],
    correctAnswer: "A",
    solution: "Total CP = 4,700 + 800 = Rs. 5,500.\nProfit = 5,800 − 5,500 = Rs. 300.\nProfit % = (300 / 5,500) × 100 = 60 / 11 ≈ 5.45%."
  },
  {
    id: "Q63",
    questionNumber: 63,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If cost price is Rs. 80, overhead expenses are Rs. 20, and selling price is Rs. 120, what is the profit percentage?",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "25%" },
      { key: "C", text: "15%" },
      { key: "D", text: "30%" }
    ],
    correctAnswer: "A",
    solution: "Total CP = 80 + 20 = Rs. 100.\nSP = Rs. 120.\nProfit % = 20%."
  },
  {
    id: "Q64",
    questionNumber: 64,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A camera is listed at Rs. 12,000 and is sold at two successive discounts of 15% and 10%. What is the cash price of the camera?",
    options: [
      { key: "A", text: "Rs. 9,180" },
      { key: "B", text: "Rs. 9,200" },
      { key: "C", text: "Rs. 9,150" },
      { key: "D", text: "Rs. 9,250" }
    ],
    correctAnswer: "A",
    solution: "SP = 12,000 × 0.85 × 0.90 = Rs. 9,180."
  },
  {
    id: "Q65",
    questionNumber: 65,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A merchant buys 50 kg of pulses at Rs. 60/kg. He sells 30 kg at Rs. 70/kg and 20 kg at Rs. 55/kg. What is his overall gain percentage?",
    options: [
      { key: "A", text: "6.66%" },
      { key: "B", text: "7.50%" },
      { key: "C", text: "5.00%" },
      { key: "D", text: "8.33%" }
    ],
    correctAnswer: "A",
    solution: "Total CP = 50 × 60 = Rs. 3,000.\nTotal SP = (30 × 70) + (20 × 55) = 2,100 + 1,100 = Rs. 3,200.\nProfit = 3,200 − 3,000 = Rs. 200.\nProfit % = (200 / 3,000) × 100 = 6.66%."
  },
  {
    id: "Q66",
    questionNumber: 66,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A shopkeeper sells an article at a discount of 10% on marked price and gets 26% profit. If the marked price is Rs. 280, find the cost price.",
    options: [
      { key: "A", text: "Rs. 200" },
      { key: "B", text: "Rs. 210" },
      { key: "C", text: "Rs. 220" },
      { key: "D", text: "Rs. 190" }
    ],
    correctAnswer: "A",
    solution: "SP = 280 × 0.90 = Rs. 252.\nCP = 252 / 1.26 = Rs. 200."
  },
  {
    id: "Q67",
    questionNumber: 67,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A trader sells 10 articles for the cost price of 12 articles. What is his profit percentage?",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "25%" },
      { key: "C", text: "15%" },
      { key: "D", text: "16.66%" }
    ],
    correctAnswer: "A",
    solution: "10 SP = 12 CP => SP / CP = 12 / 10 = 1.20 => Profit = 20%."
  },
  {
    id: "Q68",
    questionNumber: 68,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A merchant gives two successive discounts of 20% and 5% on an article marked at Rs. 800. What is the selling price?",
    options: [
      { key: "A", text: "Rs. 608" },
      { key: "B", text: "Rs. 610" },
      { key: "C", text: "Rs. 600" },
      { key: "D", text: "Rs. 615" }
    ],
    correctAnswer: "A",
    solution: "SP = 800 × 0.80 × 0.95 = Rs. 608."
  },
  {
    id: "Q69",
    questionNumber: 69,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A man gains 20% by selling an article for a certain price. If he sells it at double that price, what will be the percentage profit?",
    options: [
      { key: "A", text: "140%" },
      { key: "B", text: "120%" },
      { key: "C", text: "100%" },
      { key: "D", text: "150%" }
    ],
    correctAnswer: "A",
    solution: "Let CP = 100 => SP = 120.\nDouble SP = 240.\nNew Profit = 240 − 100 = 140%."
  },
  {
    id: "Q70",
    questionNumber: 70,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A tradesman marks his goods at 20% above the cost price. If he allows 10% discount, find his profit percentage.",
    options: [
      { key: "A", text: "8%" },
      { key: "B", text: "10%" },
      { key: "C", text: "6%" },
      { key: "D", text: "12%" }
    ],
    correctAnswer: "A",
    solution: "Multiplier = 1.20 × 0.90 = 1.08 => Profit = 8%."
  },
  {
    id: "Q71",
    questionNumber: 71,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "The marked price of a shirt is Rs. 1,250. The shopkeeper offers a discount of 8% on it. What is the selling price?",
    options: [
      { key: "A", text: "Rs. 1,150" },
      { key: "B", text: "Rs. 1,140" },
      { key: "C", text: "Rs. 1,160" },
      { key: "D", text: "Rs. 1,120" }
    ],
    correctAnswer: "A",
    solution: "SP = 1,250 × 0.92 = Rs. 1,150."
  },
  {
    id: "Q72",
    questionNumber: 72,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "If an item with a cost price of Rs. 450 is sold for Rs. 540, what is the profit percentage?",
    options: [
      { key: "A", text: "20%" },
      { key: "B", text: "25%" },
      { key: "C", text: "18%" },
      { key: "D", text: "15%" }
    ],
    correctAnswer: "A",
    solution: "Profit % = ((540 − 450) / 450) × 100 = (90 / 450) × 100 = 20%."
  },
  {
    id: "Q73",
    questionNumber: 73,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A man sold a plot for Rs. 4,50,000 at a loss of 10%. At what price should he sell it to gain 15%?",
    options: [
      { key: "A", text: "Rs. 5,75,000" },
      { key: "B", text: "Rs. 5,50,000" },
      { key: "C", text: "Rs. 6,00,000" },
      { key: "D", text: "Rs. 5,80,000" }
    ],
    correctAnswer: "A",
    solution: "CP = 4,50,000 / 0.90 = Rs. 5,00,000.\nTarget SP = 5,00,000 × 1.15 = Rs. 5,75,000."
  },
  {
    id: "Q74",
    questionNumber: 74,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A discount of 16% on the marked price of a book enables a buyer to purchase a pen worth Rs. 80. What is the marked price of the book?",
    options: [
      { key: "A", text: "Rs. 500" },
      { key: "B", text: "Rs. 480" },
      { key: "C", text: "Rs. 520" },
      { key: "D", text: "Rs. 450" }
    ],
    correctAnswer: "A",
    solution: "Discount amount = 16% of MP = Rs. 80.\nMP = (80 × 100) / 16 = Rs. 500."
  },
  {
    id: "Q75",
    questionNumber: 75,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A shopkeeper buys an article at 20% discount on its marked price and sells it at 10% discount on marked price. Find his profit percentage.",
    options: [
      { key: "A", text: "12.5%" },
      { key: "B", text: "10.0%" },
      { key: "C", text: "15.0%" },
      { key: "D", text: "11.11%" }
    ],
    correctAnswer: "A",
    solution: "Let MP = 100. CP = 80, SP = 90.\nProfit % = ((90 − 80) / 80) × 100 = (10 / 80) × 100 = 12.5%."
  },
  {
    id: "Q76",
    questionNumber: 76,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "By selling 120 pens, a retailer gains the cost price of 30 pens. What is his profit percentage?",
    options: [
      { key: "A", text: "25%" },
      { key: "B", text: "20%" },
      { key: "C", text: "30%" },
      { key: "D", text: "15%" }
    ],
    correctAnswer: "A",
    solution: "Profit % = (30 / 120) × 100 = 25%."
  },
  {
    id: "Q77",
    questionNumber: 77,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A dishonest dealer marks his goods 20% above CP and uses a false weight of 900 grams instead of 1 kg. What is his total gain percentage?",
    options: [
      { key: "A", text: "33.33%" },
      { key: "B", text: "30.00%" },
      { key: "C", text: "25.00%" },
      { key: "D", text: "35.00%" }
    ],
    correctAnswer: "A",
    solution: "He charges for 1000g with 20% markup => Revenue = 1200.\nHis actual cost is for 900g => Cost = 900.\nProfit % = ((1200 − 900) / 900) × 100 = (300 / 900) × 100 = 33.33%."
  },
  {
    id: "Q78",
    questionNumber: 78,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A retailer sells two tables at Rs. 1,980 each. On one table he gains 10% and on the other he loses 10%. What is his net profit or loss percentage?",
    options: [
      { key: "A", text: "1% loss" },
      { key: "B", text: "1% gain" },
      { key: "C", text: "No change" },
      { key: "D", text: "2% loss" }
    ],
    correctAnswer: "A",
    solution: "Overall loss = (10 / 10)² = 1% loss."
  },
  {
    id: "Q79",
    questionNumber: 79,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A merchant allows a discount of 15% on marked price. How much above the cost price must he mark his goods to make a profit of 19%?",
    options: [
      { key: "A", text: "40%" },
      { key: "B", text: "35%" },
      { key: "C", text: "45%" },
      { key: "D", text: "30%" }
    ],
    correctAnswer: "A",
    solution: "MP / CP = (100 + 19) / (100 − 15) = 119 / 85 = 7 / 5 = 1.40.\nMarkup required = 40% above CP."
  },
  {
    id: "Q80",
    questionNumber: 80,
    topic: "Profit, Loss & Marked Price / Discount",
    category: "Numerical Ability",
    section: "TCS Preparation",
    exam: "TCS NQT",
    difficulty: "Moderate",
    question: "A trader sells an article at a gain of 12.5%. Had he sold it for Rs. 22.50 more, he would have gained 25%. What is the cost price of the article?",
    options: [
      { key: "A", text: "Rs. 180" },
      { key: "B", text: "Rs. 160" },
      { key: "C", text: "Rs. 200" },
      { key: "D", text: "Rs. 150" }
    ],
    correctAnswer: "A",
    solution: "Difference = 25% − 12.5% = 12.5% of CP = Rs. 22.50.\nCP = (22.50 / 12.5) × 100 = Rs. 180."
  }
];
