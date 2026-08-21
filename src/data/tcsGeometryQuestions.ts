import { PlacementQuestion } from "./tcsPercentagesQuestions.js";
import { GEOMETRY_BATCH1 } from "./geometry/batch1_q01_q20.js";
import { GEOMETRY_BATCH2 } from "./geometry/batch2_q21_q40.js";
import { GEOMETRY_BATCH3 } from "./geometry/batch3_q41_q60.js";
import { GEOMETRY_BATCH4 } from "./geometry/batch4_q61_q80.js";
import { GEOMETRY_BATCH5 } from "./geometry/batch5_q81_q100.js";

const ALL_RAW_GEOMETRY = [
  ...GEOMETRY_BATCH1,
  ...GEOMETRY_BATCH2,
  ...GEOMETRY_BATCH3,
  ...GEOMETRY_BATCH4,
  ...GEOMETRY_BATCH5
];

export const TCS_GEOMETRY_QUESTIONS: PlacementQuestion[] = ALL_RAW_GEOMETRY.map((q, idx) => {
  const qNum = idx + 1;
  const numStr = String(qNum).padStart(2, "0");
  const isInc = q.explanation?.includes("⚠️") || q.question?.includes("⚠️");
  return {
    id: q.id || `GEOM_Q${numStr}`,
    questionNumber: qNum,
    topic: "Geometry & Mensuration (2D/3D Surface Areas and Volumes)",
    category: "Numerical Ability (Quantitative Aptitude)",
    section: "Quantitative Aptitude",
    exam: q.yearAsked || "TCS NQT",
    difficulty: (q.difficulty as "Easy" | "Moderate" | "Advanced") || "Moderate",
    question: q.question,
    options: [
      { key: "A", text: q.options[0] || "" },
      { key: "B", text: q.options[1] || "" },
      { key: "C", text: q.options[2] || "" },
      { key: "D", text: q.options[3] || "" }
    ],
    correctAnswer: (q.correctAnswer as "A" | "B" | "C" | "D") || "A",
    solution: `${q.explanation}${q.formulaUsed ? `\n\nFormula Used: ${q.formulaUsed}` : ""}`,
    isInconsistent: isInc,
    inconsistencyNote: isInc ? "Mathematical inconsistency noted in source problem data." : undefined
  };
});

