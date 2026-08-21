import { PlacementQuestion } from "./tcsPercentagesQuestions.js";
import { BATCH_1_PROBABILITY_QUESTIONS } from "./probability/batch1_q01_q20.js";
import { BATCH_2_PROBABILITY_QUESTIONS } from "./probability/batch2_q21_q40.js";
import { BATCH_3_PROBABILITY_QUESTIONS } from "./probability/batch3_q41_q60.js";
import { BATCH_4_PROBABILITY_QUESTIONS } from "./probability/batch4_q61_q80.js";
import { BATCH_5_PROBABILITY_QUESTIONS } from "./probability/batch5_q81_q100.js";

export const TCS_PROBABILITY_QUESTIONS: PlacementQuestion[] = [
  ...BATCH_1_PROBABILITY_QUESTIONS,
  ...BATCH_2_PROBABILITY_QUESTIONS,
  ...BATCH_3_PROBABILITY_QUESTIONS,
  ...BATCH_4_PROBABILITY_QUESTIONS,
  ...BATCH_5_PROBABILITY_QUESTIONS
];
