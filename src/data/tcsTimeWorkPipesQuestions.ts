import { PlacementQuestion } from "./tcsPercentagesQuestions.js";
import { TIME_WORK_BATCH_1, TimeWorkQuestion } from "./timeWork/batch1_q01_q20.js";
import { TIME_WORK_BATCH_2 } from "./timeWork/batch2_q21_q40.js";
import { TIME_WORK_BATCH_3 } from "./timeWork/batch3_q41_q60.js";
import { TIME_WORK_BATCH_4 } from "./timeWork/batch4_q61_q80.js";
import { TIME_WORK_BATCH_5 } from "./timeWork/batch5_q81_q100.js";

export type { TimeWorkQuestion };

export const TCS_TIME_WORK_PIPES_QUESTIONS: TimeWorkQuestion[] = [
  ...TIME_WORK_BATCH_1,
  ...TIME_WORK_BATCH_2,
  ...TIME_WORK_BATCH_3,
  ...TIME_WORK_BATCH_4,
  ...TIME_WORK_BATCH_5
];
