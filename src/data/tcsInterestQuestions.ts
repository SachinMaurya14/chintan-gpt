import { PlacementQuestion } from "./tcsPercentagesQuestions.js";
import { BATCH_1_INTEREST_QUESTIONS } from "./interest/batch1_q01_q20.js";
import { BATCH_2_INTEREST_QUESTIONS } from "./interest/batch2_q21_q40.js";
import { BATCH_3_INTEREST_QUESTIONS } from "./interest/batch3_q41_q60.js";
import { BATCH_4_INTEREST_QUESTIONS } from "./interest/batch4_q61_q80.js";
import { BATCH_5_INTEREST_QUESTIONS } from "./interest/batch5_q81_q100.js";

export const TCS_INTEREST_QUESTIONS: PlacementQuestion[] = [
  ...BATCH_1_INTEREST_QUESTIONS,
  ...BATCH_2_INTEREST_QUESTIONS,
  ...BATCH_3_INTEREST_QUESTIONS,
  ...BATCH_4_INTEREST_QUESTIONS,
  ...BATCH_5_INTEREST_QUESTIONS
];
