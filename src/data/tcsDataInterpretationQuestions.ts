import { PlacementQuestion } from "./tcsPercentagesQuestions.js";
import { BATCH1_QUESTIONS } from "./dataInterpretation/batch1_q01_q20.js";
import { BATCH2_QUESTIONS } from "./dataInterpretation/batch2_q21_q40.js";
import { BATCH3_QUESTIONS } from "./dataInterpretation/batch3_q41_q60.js";
import { BATCH4_QUESTIONS } from "./dataInterpretation/batch4_q61_q80.js";
import { BATCH5_QUESTIONS } from "./dataInterpretation/batch5_q81_q100.js";

export const TCS_DATA_INTERPRETATION_QUESTIONS: PlacementQuestion[] = [
  ...BATCH1_QUESTIONS,
  ...BATCH2_QUESTIONS,
  ...BATCH3_QUESTIONS,
  ...BATCH4_QUESTIONS,
  ...BATCH5_QUESTIONS
];
