import { PlacementQuestion } from "./tcsPercentagesQuestions.js";
import { BATCH_1_PERMUTATIONS_QUESTIONS } from "./permutations/batch1_q01_q20.js";
import { BATCH_2_PERMUTATIONS_QUESTIONS } from "./permutations/batch2_q21_q40.js";
import { BATCH_3_PERMUTATIONS_QUESTIONS } from "./permutations/batch3_q41_q60.js";
import { BATCH_4_PERMUTATIONS_QUESTIONS } from "./permutations/batch4_q61_q80.js";
import { BATCH_5_PERMUTATIONS_QUESTIONS } from "./permutations/batch5_q81_q100.js";

export const TCS_PERMUTATIONS_QUESTIONS: PlacementQuestion[] = [
  ...BATCH_1_PERMUTATIONS_QUESTIONS,
  ...BATCH_2_PERMUTATIONS_QUESTIONS,
  ...BATCH_3_PERMUTATIONS_QUESTIONS,
  ...BATCH_4_PERMUTATIONS_QUESTIONS,
  ...BATCH_5_PERMUTATIONS_QUESTIONS
];
