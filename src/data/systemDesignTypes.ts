export type SystemDesignDifficulty = "Easy" | "Medium" | "Hard" | "Extreme";

export type SystemDesignType =
  | "Fundamentals"
  | "LLD"
  | "OOD"
  | "HLD"
  | "HLD + LLD"
  | "OOD + LLD";

export type SystemDesignSourceType =
  | "Reported Interview Question"
  | "Reported Variant"
  | "Interview-Style Problem"
  | "Original Practice Problem";

export interface ReportedInterviewMetadata {
  company: string;
  role: string;
  approxYear: string;
  round: string;
  sourceNote: string;
}

export interface ApiEndpointSpec {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "WS" | "gRPC";
  endpoint: string;
  description: string;
  headers?: string;
  requestBody?: string;
  responseBody?: string;
}

export interface DataModelEntity {
  name: string;
  description: string;
  fields: string[];
  indexes?: string[];
}

export interface ArchitectureComponent {
  name: string;
  role: string;
  details: string;
}

export interface TradeOffItem {
  topic: string;
  optionA: string;
  optionB: string;
  choiceMade: string;
  why: string;
}

export interface InterviewFollowUpItem {
  question: string;
  interviewerContext: string;
  strongAnswer: string;
}

export interface ClassInterfaceSpec {
  name: string;
  type: "interface" | "class" | "abstract class" | "enum";
  responsibility: string;
  methods: string[];
}

export interface SolidPrincipleItem {
  principle: string;
  application: string;
}

export interface DesignPatternItem {
  pattern: string;
  whyUsed: string;
  whyNotAlternative?: string;
  tradeoff?: string;
}

export interface LldOodDetailSpec {
  classesAndInterfaces: ClassInterfaceSpec[];
  relationshipsUml: string;
  solidPrinciplesApplied: SolidPrincipleItem[];
  designPatterns: DesignPatternItem[];
  threadSafetyMechanisms: string[];
  codeImplementation: {
    language: "typescript" | "java" | "python" | "cpp";
    code: string;
  };
}

export interface FailureScenarioItem {
  failure: string;
  impact: string;
  mitigation: string;
}

export interface SystemDesignProblem {
  id: string;
  title: string;
  difficulty: SystemDesignDifficulty;
  designType: SystemDesignType;
  sourceType: SystemDesignSourceType;
  companyRelevance: string[];
  reportedMetadata?: ReportedInterviewMetadata;
  categoryTag: string;
  problemStatement: string;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  assumptions?: string[];
  scaleEstimation?: {
    dauMau?: string;
    readsWritesRatio?: string;
    avgQps?: string;
    peakQps?: string;
    storagePerDay?: string;
    storagePerYear?: string;
    bandwidth?: string;
    cacheMemory?: string;
    replicationFactor?: string;
  };
  apiDesign: ApiEndpointSpec[];
  dataModel: {
    type: "Relational (SQL)" | "NoSQL (Document/Key-Value)" | "Hybrid / Polyglot" | "In-Memory / Distributed Map";
    entities: DataModelEntity[];
    explanation: string;
  };
  architecture: {
    diagramAscii: string;
    description: string;
    components: ArchitectureComponent[];
  };
  databaseChoice: {
    primaryDb: string;
    rationale: string;
    alternativeConsidered: string;
    tradeoff: string;
  };
  cacheStrategy?: {
    cacheType: string;
    evictionPolicy: string;
    invalidationPattern: string;
    keyStructure: string;
    ttl: string;
  };
  queueEventStrategy?: {
    technology: string;
    topicsQueues: string[];
    partitionKey: string;
    idempotencyMechanism: string;
  };
  concurrencyAndThreadSafety: string;
  consistencyModel: string;
  availabilityAndFailover: string;
  failureScenarios: FailureScenarioItem[];
  security: string[];
  monitoringObservability: string[];
  bottlenecks: string[];
  tradeOffs: TradeOffItem[];
  interviewFollowUps: InterviewFollowUpItem[];
  lldOodDetails?: LldOodDetailSpec;
  finalAnswerSummary: string;
  interviewerEvaluation: {
    weak: string;
    needsImprovement: string;
    good: string;
    strong: string;
    tier1Ready: string;
  };
}
