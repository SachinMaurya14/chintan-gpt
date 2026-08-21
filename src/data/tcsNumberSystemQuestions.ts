import { PlacementQuestion } from "./tcsPercentagesQuestions.js";
import { BATCH_1_NUMBER_SYSTEM_QUESTIONS } from "./numberSystem/batch1_q01_q20.js";
import { BATCH_2_NUMBER_SYSTEM_QUESTIONS } from "./numberSystem/batch2_q21_q40.js";
import { BATCH_3_NUMBER_SYSTEM_QUESTIONS } from "./numberSystem/batch3_q41_q60.js";
import { BATCH_4_NUMBER_SYSTEM_QUESTIONS } from "./numberSystem/batch4_q61_q80.js";
import { BATCH_5_NUMBER_SYSTEM_QUESTIONS } from "./numberSystem/batch5_q81_q100.js";

export const TCS_NUMBER_SYSTEM_QUESTIONS: PlacementQuestion[] = [
  ...BATCH_1_NUMBER_SYSTEM_QUESTIONS,
  ...BATCH_2_NUMBER_SYSTEM_QUESTIONS,
  ...BATCH_3_NUMBER_SYSTEM_QUESTIONS,
  ...BATCH_4_NUMBER_SYSTEM_QUESTIONS,
  ...BATCH_5_NUMBER_SYSTEM_QUESTIONS
];
