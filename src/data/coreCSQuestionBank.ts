import { CoreCSQuestion, CoreCSTopic, CoreCSDifficulty, SourceClassification } from "./coreCSTypes.js";
import { CORE_CS_OS_QUESTIONS } from "./coreCSOSQuestions.js";
import { CORE_CS_DBMS_QUESTIONS } from "./coreCSDBMSQuestions.js";
import { CORE_CS_NETWORKS_QUESTIONS } from "./coreCSNetworksQuestions.js";
import { CORE_CS_OOP_QUESTIONS } from "./coreCSOOPQuestions.js";
import { CORE_CS_SQL_QUESTIONS } from "./coreCSSQLQuestions.js";
import { CORE_CS_CONCURRENCY_QUESTIONS } from "./coreCSConcurrencyQuestions.js";
import { CORE_CS_SYSTEMS_QUESTIONS } from "./coreCSSystemsQuestions.js";
import { CORE_CS_LANGUAGE_RUNTIME_QUESTIONS } from "./coreCSLanguageRuntimeQuestions.js";
import { CORE_CS_DISTRIBUTED_QUESTIONS } from "./coreCSDistributedQuestions.js";
import { CORE_CS_MIXED_DRILL_QUESTIONS } from "./coreCSMixedDrillQuestions.js";

// Combine all domain collections into a single unified bank
export const MASTER_CORE_CS_QUESTION_BANK: CoreCSQuestion[] = [
  ...CORE_CS_OS_QUESTIONS,
  ...CORE_CS_DBMS_QUESTIONS,
  ...CORE_CS_NETWORKS_QUESTIONS,
  ...CORE_CS_OOP_QUESTIONS,
  ...CORE_CS_SQL_QUESTIONS,
  ...CORE_CS_CONCURRENCY_QUESTIONS,
  ...CORE_CS_SYSTEMS_QUESTIONS,
  ...CORE_CS_LANGUAGE_RUNTIME_QUESTIONS,
  ...CORE_CS_DISTRIBUTED_QUESTIONS,
  ...CORE_CS_MIXED_DRILL_QUESTIONS,
];

export const CORE_CS_TOPICS_LIST: { id: CoreCSTopic | "All"; label: string; icon: string; count: number }[] = [
  { id: "All", label: "All Core CS Topics", icon: "Layers", count: MASTER_CORE_CS_QUESTION_BANK.length },
  { id: "Operating Systems", label: "Operating Systems", icon: "Cpu", count: CORE_CS_OS_QUESTIONS.length },
  { id: "DBMS", label: "DBMS & Transactions", icon: "Database", count: CORE_CS_DBMS_QUESTIONS.length },
  { id: "Computer Networks", label: "Computer Networks", icon: "Network", count: CORE_CS_NETWORKS_QUESTIONS.length },
  { id: "OOP", label: "OOP & SOLID", icon: "Boxes", count: CORE_CS_OOP_QUESTIONS.length },
  { id: "SQL", label: "SQL & Query Optimization", icon: "FileCode", count: CORE_CS_SQL_QUESTIONS.length },
  { id: "Concurrency / Multithreading", label: "Concurrency & Multithreading", icon: "GitFork", count: CORE_CS_CONCURRENCY_QUESTIONS.length },
  { id: "Computer Architecture / Systems", label: "Systems Architecture", icon: "Microchip", count: CORE_CS_SYSTEMS_QUESTIONS.length },
  { id: "Language / Runtime Fundamentals", label: "Language / Runtime (JVM/V8/GIL)", icon: "Terminal", count: CORE_CS_LANGUAGE_RUNTIME_QUESTIONS.length },
  { id: "Distributed Systems Fundamentals", label: "Distributed Fundamentals (CAP/Raft)", icon: "Globe", count: CORE_CS_DISTRIBUTED_QUESTIONS.length },
  { id: "Mixed Core CS Drill", label: "Mixed Cross-Domain Drill", icon: "Sparkles", count: CORE_CS_MIXED_DRILL_QUESTIONS.length },
];

export const CORE_CS_COMPANIES_LIST = [
  "All Companies",
  "Google",
  "Microsoft",
  "Amazon",
  "Meta",
  "Apple",
  "Uber",
  "Adobe",
  "Atlassian",
  "Nvidia",
  "Oracle",
  "Salesforce",
  "LinkedIn",
  "Stripe",
  "Cloudflare",
  "Other Tier-1"
];

export function filterCoreCSQuestions(
  questions: CoreCSQuestion[],
  options: {
    topic?: CoreCSTopic | "All";
    difficulty?: CoreCSDifficulty | "All";
    company?: string;
    sourceType?: SourceClassification | "All";
    searchQuery?: string;
  }
): CoreCSQuestion[] {
  return questions.filter((q) => {
    // Topic filter
    if (options.topic && options.topic !== "All" && q.topic !== options.topic) {
      return false;
    }

    // Difficulty filter
    if (options.difficulty && options.difficulty !== "All" && q.difficulty !== options.difficulty) {
      return false;
    }

    // Company filter
    if (options.company && options.company !== "All Companies") {
      const match = q.companies.some(
        (c) => c.toLowerCase() === options.company!.toLowerCase()
      );
      if (!match && options.company === "Other Tier-1" && q.companies.length > 0) {
        // match other tier 1
      } else if (!match) {
        return false;
      }
    }

    // Source Type filter
    if (options.sourceType && options.sourceType !== "All" && q.sourceType !== options.sourceType) {
      return false;
    }

    // Search query
    if (options.searchQuery && options.searchQuery.trim() !== "") {
      const query = options.searchQuery.toLowerCase();
      const matchTitle = q.title.toLowerCase().includes(query);
      const matchQuestion = q.question.toLowerCase().includes(query);
      const matchSubtopic = q.subtopic.toLowerCase().includes(query);
      const matchKeywords = q.interviewDrillDown.some((step) =>
        step.keyKeywords.some((k) => k.toLowerCase().includes(query))
      );
      if (!matchTitle && !matchQuestion && !matchSubtopic && !matchKeywords) {
        return false;
      }
    }

    return true;
  });
}
