import { DSAInterviewProblem } from "./dsaQuestionTypes.js";
import { PlacementQuestion } from "./tcsPercentagesQuestions.js";
import { SystemDesignProblem } from "./systemDesignTypes.js";

// Cache for loaded modules to prevent duplicate dynamic imports
const dsaCache = new Map<number, DSAInterviewProblem[]>();
const tcsQuestionsCache = new Map<string, PlacementQuestion[]>();
let systemDesignCache: SystemDesignProblem[] | null = null;

export async function loadDSABatch(batchNumber: number): Promise<DSAInterviewProblem[]> {
  if (dsaCache.has(batchNumber)) {
    return dsaCache.get(batchNumber)!;
  }

  let questions: DSAInterviewProblem[] = [];
  switch (batchNumber) {
    case 1: {
      const mod = await import("./dsaBatch1ArraysHashing.js");
      questions = mod.DSA_BATCH_1_ARRAYS_HASHING;
      break;
    }
    case 2: {
      const mod = await import("./dsaBatch2TwoPointersSlidingWindow.js");
      questions = mod.DSA_BATCH_2_TWO_POINTERS_SLIDING_WINDOW;
      break;
    }
    case 3: {
      const mod = await import("./dsaBatch3BinarySearchPrefixSum.js");
      questions = mod.DSA_BATCH_3_BINARY_SEARCH_PREFIX_SUM;
      break;
    }
    case 4: {
      const mod = await import("./dsaBatch4TreesBST.js");
      questions = mod.DSA_BATCH_4_TREES_BST;
      break;
    }
    case 5: {
      const mod = await import("./dsaBatch5GraphsBfsDfs.js");
      questions = mod.DSA_BATCH_5_GRAPHS_BFS_DFS;
      break;
    }
    case 6: {
      const mod = await import("./dsaBatch6HeapsPriorityQueueGreedy.js");
      questions = mod.DSA_BATCH_6_HEAPS_PRIORITY_QUEUE_GREEDY;
      break;
    }
    case 7: {
      const mod = await import("./dsaBatch7DynamicProgramming.js");
      questions = mod.DSA_BATCH_7_DYNAMIC_PROGRAMMING;
      break;
    }
    case 8: {
      const mod = await import("./dsaBatch8AdvancedGraphs.js");
      questions = mod.DSA_BATCH_8_ADVANCED_GRAPHS;
      break;
    }
    case 9: {
      const mod = await import("./dsaBatch9AdvancedDataStructures.js");
      questions = mod.DSA_BATCH_9_ADVANCED_DATA_STRUCTURES;
      break;
    }
    case 10: {
      const mod = await import("./dsaBatch10FinalChallenge.js");
      questions = mod.DSA_BATCH_10_FINAL_CHALLENGE;
      break;
    }
    default:
      questions = [];
  }

  dsaCache.set(batchNumber, questions);
  return questions;
}

export async function loadSystemDesignQuestions(): Promise<SystemDesignProblem[]> {
  if (systemDesignCache) {
    return systemDesignCache;
  }
  const mod = await import("./systemDesignQuestions.js");
  systemDesignCache = mod.SYSTEM_DESIGN_QUESTION_BANK;
  return systemDesignCache;
}

export async function loadTCSQuestions(topicKey: string): Promise<PlacementQuestion[]> {
  if (tcsQuestionsCache.has(topicKey)) {
    return tcsQuestionsCache.get(topicKey)!;
  }

  let questions: any[] = [];
  switch (topicKey) {
    case "percentages": {
      const mod = await import("./tcsPercentagesQuestions.js");
      questions = mod.TCS_PERCENTAGES_QUESTIONS;
      break;
    }
    case "profitLoss": {
      const mod = await import("./tcsProfitLossQuestions.js");
      questions = mod.TCS_PROFIT_LOSS_QUESTIONS;
      break;
    }
    case "ratioProportion": {
      const mod = await import("./tcsRatioProportionQuestions.js");
      questions = mod.TCS_RATIO_PROPORTION_QUESTIONS;
      break;
    }
    case "averages": {
      const mod = await import("./tcsAveragesMixturesQuestions.js");
      questions = mod.TCS_AVERAGES_MIXTURES_QUESTIONS;
      break;
    }
    case "timeWork": {
      const mod = await import("./tcsTimeWorkPipesQuestions.js");
      questions = mod.TCS_TIME_WORK_PIPES_QUESTIONS;
      break;
    }
    case "timeSpeed": {
      const mod = await import("./tcsTimeSpeedDistanceQuestions.js");
      questions = mod.TCS_TIME_SPEED_DISTANCE_QUESTIONS;
      break;
    }
    case "interest": {
      const mod = await import("./tcsInterestQuestions.js");
      questions = mod.TCS_INTEREST_QUESTIONS;
      break;
    }
    case "probability": {
      const mod = await import("./tcsProbabilityQuestions.js");
      questions = mod.TCS_PROBABILITY_QUESTIONS;
      break;
    }
    case "permutations": {
      const mod = await import("./tcsPermutationsQuestions.js");
      questions = mod.TCS_PERMUTATIONS_QUESTIONS;
      break;
    }
    case "lcmHcf": {
      const mod = await import("./tcsLcmHcfQuestions.js");
      questions = mod.TCS_LCM_HCF_QUESTIONS;
      break;
    }
    case "numberSystem": {
      const mod = await import("./tcsNumberSystemQuestions.js");
      questions = mod.TCS_NUMBER_SYSTEM_QUESTIONS;
      break;
    }
    case "dataInterpretation": {
      const mod = await import("./tcsDataInterpretationQuestions.js");
      questions = mod.TCS_DATA_INTERPRETATION_QUESTIONS;
      break;
    }
    case "progressions": {
      const mod = await import("./tcsProgressionsQuestions.js");
      questions = mod.TCS_PROGRESSIONS_QUESTIONS;
      break;
    }
    case "geometry": {
      const mod = await import("./tcsGeometryQuestions.js");
      questions = mod.TCS_GEOMETRY_QUESTIONS;
      break;
    }
    default:
      questions = [];
  }

  tcsQuestionsCache.set(topicKey, questions);
  return questions;
}
