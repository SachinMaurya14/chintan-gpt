import { SystemDesignProblem, SystemDesignDifficulty, SystemDesignType } from "./systemDesignTypes.js";
import { SYSTEM_DESIGN_FUNDAMENTALS } from "./systemDesignFundamentals.js";
import { SYSTEM_DESIGN_LLD_OOD } from "./systemDesignLldOod.js";
import { SYSTEM_DESIGN_HLD } from "./systemDesignHld.js";
import { SYSTEM_DESIGN_MULTI_LAYER } from "./systemDesignMultiLayer.js";
import { SYSTEM_DESIGN_EXTRA } from "./systemDesignExtraQuestions.js";

export * from "./systemDesignTypes.js";
export * from "./systemDesignFundamentals.js";
export * from "./systemDesignLldOod.js";
export * from "./systemDesignHld.js";
export * from "./systemDesignMultiLayer.js";
export * from "./systemDesignExtraQuestions.js";

export const SYSTEM_DESIGN_QUESTION_BANK: SystemDesignProblem[] = [
  ...SYSTEM_DESIGN_FUNDAMENTALS,
  ...SYSTEM_DESIGN_LLD_OOD,
  ...SYSTEM_DESIGN_HLD,
  ...SYSTEM_DESIGN_MULTI_LAYER,
  ...SYSTEM_DESIGN_EXTRA
];

export function getSystemDesignQuestionsByFilter(
  difficulty: "All" | SystemDesignDifficulty = "All",
  designType: "All" | SystemDesignType = "All",
  companySearch?: string
): SystemDesignProblem[] {
  return SYSTEM_DESIGN_QUESTION_BANK.filter((q) => {
    const matchesDifficulty = difficulty === "All" || q.difficulty === difficulty;
    const matchesType = designType === "All" || q.designType === designType;
    const matchesCompany =
      !companySearch ||
      companySearch === "All" ||
      q.companyRelevance.some((c) => c.toLowerCase().includes(companySearch.toLowerCase()));

    return matchesDifficulty && matchesType && matchesCompany;
  });
}
