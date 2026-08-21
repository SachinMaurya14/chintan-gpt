import { PlacementQuestion } from "./tcsPercentagesQuestions.js";
import { BATCH_1_LCM_HCF_QUESTIONS } from "./lcmHcf/batch1_q01_q20.js";
import { BATCH_2_LCM_HCF_QUESTIONS } from "./lcmHcf/batch2_q21_q40.js";
import { BATCH_3_LCM_HCF_QUESTIONS } from "./lcmHcf/batch3_q41_q60.js";
import { BATCH_4_LCM_HCF_QUESTIONS } from "./lcmHcf/batch4_q61_q80.js";
import { BATCH_5_LCM_HCF_QUESTIONS } from "./lcmHcf/batch5_q81_q100.js";

export const TCS_LCM_HCF_QUESTIONS: PlacementQuestion[] = [
  ...BATCH_1_LCM_HCF_QUESTIONS,
  ...BATCH_2_LCM_HCF_QUESTIONS,
  ...BATCH_3_LCM_HCF_QUESTIONS,
  ...BATCH_4_LCM_HCF_QUESTIONS,
  ...BATCH_5_LCM_HCF_QUESTIONS
];
