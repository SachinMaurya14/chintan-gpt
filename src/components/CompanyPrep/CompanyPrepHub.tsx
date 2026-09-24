import React, { useState, useEffect, useMemo } from "react";
import {
  Building2,
  Search,
  CheckCircle2,
  Code2,
  BookOpen,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Briefcase,
  Layers,
  Bot,
  Target,
  FileText,
  Lightbulb,
  Check,
  Play,
  X,
  Cpu,
  Globe
} from "lucide-react";
import { api } from "../../services/api.js";
import { CompanyPrep, CodingProblem } from "../../types/index.js";
import { useApp } from "../../context/AppContext.js";
import { useAuth } from "../../context/AuthContext.js";
import { TopicQuizModal } from "./TopicQuizModal.js";
import { PlacementQuestion } from "../../data/tcsPercentagesQuestions.js";
import { TCS_AVERAGES_FORMULAS } from "../../data/tcsAveragesFormulas.js";
import { TCS_TIME_WORK_FORMULAS } from "../../data/tcsTimeWorkFormulas.js";
import { TCS_TIME_SPEED_DISTANCE_FORMULAS } from "../../data/tcsTimeSpeedFormulas.js";
import { TCS_INTEREST_FORMULAS } from "../../data/tcsInterestFormulas.js";
import { TCS_PROBABILITY_FORMULAS } from "../../data/tcsProbabilityFormulas.js";
import { TCS_PERMUTATIONS_FORMULAS } from "../../data/tcsPermutationsFormulas.js";
import { TCS_LCM_HCF_FORMULAS } from "../../data/tcsLcmHcfFormulas.js";
import { TCS_NUMBER_SYSTEM_FORMULAS } from "../../data/tcsNumberSystemFormulas.js";
import { TCS_DATA_INTERPRETATION_FORMULAS } from "../../data/tcsDataInterpretationFormulas.js";
import { TCS_PROGRESSIONS_FORMULAS } from "../../data/tcsProgressionsFormulas.js";
import { TCS_GEOMETRY_FORMULAS } from "../../data/tcsGeometryFormulas.js";
import { DSAQuestionBankModal } from "./DSAQuestionBankModal.js";
import { SystemDesignModal } from "./SystemDesignModal.js";
import { CoreCSModal } from "./CoreCSModal.js";
import { DSAInterviewProblem } from "../../data/dsaQuestionTypes.js";
import { SystemDesignProblem } from "../../data/systemDesignTypes.js";
import {
  loadDSABatch,
  loadSystemDesignQuestions,
  loadTCSQuestions
} from "../../data/questionLoaders.js";

export const CompanyPrepHub: React.FC = () => {
  const { selectedCompanyId, setSelectedCompanyId, navigateToProblem, setCurrentTab } = useApp();
  const { user, setTargetCompanies } = useAuth();
  const [companies, setCompanies] = useState<CompanyPrep[]>([]);
  const [problems, setProblems] = useState<CodingProblem[]>([]);
  const [activeCompany, setActiveCompany] = useState<CompanyPrep | null>(null);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState<string>("All");
  
  // State for active question-bank quiz modal
  const [quizModalOpen, setQuizModalOpen] = useState<boolean>(false);
  const [quizTopic, setQuizTopic] = useState<string>("");
  const [quizCategory, setQuizCategory] = useState<string>("");
  const [quizQuestions, setQuizQuestions] = useState<PlacementQuestion[]>([]);
  const [formulaSheetOpen, setFormulaSheetOpen] = useState<boolean>(false);
  const [timeWorkFormulaSheetOpen, setTimeWorkFormulaSheetOpen] = useState<boolean>(false);
  const [timeSpeedFormulaSheetOpen, setTimeSpeedFormulaSheetOpen] = useState<boolean>(false);
  const [interestFormulaSheetOpen, setInterestFormulaSheetOpen] = useState<boolean>(false);
  const [probabilityFormulaSheetOpen, setProbabilityFormulaSheetOpen] = useState<boolean>(false);
  const [permutationsFormulaSheetOpen, setPermutationsFormulaSheetOpen] = useState<boolean>(false);
  const [lcmHcfFormulaSheetOpen, setLcmHcfFormulaSheetOpen] = useState<boolean>(false);
  const [numberSystemFormulaSheetOpen, setNumberSystemFormulaSheetOpen] = useState<boolean>(false);
  const [dataInterpretationFormulaSheetOpen, setDataInterpretationFormulaSheetOpen] = useState<boolean>(false);
  const [progressionsFormulaSheetOpen, setProgressionsFormulaSheetOpen] = useState<boolean>(false);
  const [geometryFormulaSheetOpen, setGeometryFormulaSheetOpen] = useState<boolean>(false);
  
  // State for DSA Question Bank Modal
  const [dsaModalOpen, setDsaModalOpen] = useState<boolean>(false);
  const [dsaTopicTitle, setDsaTopicTitle] = useState<string>("");
  const [dsaCategoryTitle, setDsaCategoryTitle] = useState<string>("");
  const [dsaQuestions, setDsaQuestions] = useState<DSAInterviewProblem[]>([]);
  const [dsaBatchNumber, setDsaBatchNumber] = useState<number>(1);

  // State for System Design Modal
  const [systemDesignModalOpen, setSystemDesignModalOpen] = useState<boolean>(false);
  const [systemDesignTopicTitle, setSystemDesignTopicTitle] = useState<string>("");
  const [systemDesignCategoryTitle, setSystemDesignCategoryTitle] = useState<string>("");
  const [systemDesignQuestions, setSystemDesignQuestions] = useState<SystemDesignProblem[]>([]);

  // State for Core CS Fundamentals Modal (STEP 4)
  const [coreCSModalOpen, setCoreCSModalOpen] = useState<boolean>(false);
  const [coreCSInitialTopic, setCoreCSInitialTopic] = useState<string>("All");

  const handleOpenDSA = async (topic: string, batchNum: number) => {
    setDsaTopicTitle(topic);
    setDsaCategoryTitle(activeCompany?.categories?.[activeCategoryIdx]?.name || "DSA");
    setDsaBatchNumber(batchNum);
    const questions = await loadDSABatch(batchNum);
    setDsaQuestions(questions);
    setDsaModalOpen(true);
  };

  const handleOpenSystemDesign = async (topic: string) => {
    setSystemDesignTopicTitle(topic);
    setSystemDesignCategoryTitle(activeCompany?.categories?.[activeCategoryIdx]?.name || "System Design");
    const questions = await loadSystemDesignQuestions();
    setSystemDesignQuestions(questions);
    setSystemDesignModalOpen(true);
  };

  const handleOpenQuiz = async (topic: string, category: string, topicKey: string) => {
    setQuizTopic(topic);
    setQuizCategory(category);
    const questions = await loadTCSQuestions(topicKey);
    setQuizQuestions(questions);
    setQuizModalOpen(true);
  };

  useEffect(() => {
    Promise.all([api.getCompanies(), api.getProblems()]).then(([comps, probs]) => {
      setCompanies(comps || []);
      setProblems(probs || []);
      if (selectedCompanyId) {
        const found = (comps || []).find((c) => c.id === selectedCompanyId);
        if (found) setActiveCompany(found);
      } else if (comps && comps.length > 0) {
        setActiveCompany(comps[0]);
      }
    });
  }, [selectedCompanyId]);

  const filteredCompanies = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return (companies || []).filter((c) => {
      const matchesSearch = !q ||
        c.name.toLowerCase().includes(q) ||
        c.tier.toLowerCase().includes(q);
      const matchesTier = filterTier === "All" || c.tier.toLowerCase().includes(filterTier.toLowerCase());
      return matchesSearch && matchesTier;
    });
  }, [companies, searchQuery, filterTier]);

  const isTarget = user?.targetCompanies?.includes(activeCompany?.id || "");

  const toggleTargetCompany = async () => {
    if (!activeCompany || !user) return;
    const current = [...(user.targetCompanies || [])];
    const exists = current.includes(activeCompany.id);
    const updated = exists ? current.filter((id) => id !== activeCompany.id) : [...current, activeCompany.id];
    await setTargetCompanies(updated);
  };

  return (
    <div id="company-prep-hub" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-zinc-100 font-sans">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-orange-500">
          <Building2 className="w-4 h-4" />
          <span>ENTERPRISE PLACEMENT TRACKS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
          Company Placement Hub
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Comprehensive, topic-by-topic placement syllabi for TCS (NQT, Digital, Prime) and Tier-1 Product organizations with curated LeetCode coding problem sets.
        </p>
      </div>

      {/* Filter Tier Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["All", "Service Based", "Tier 1", "Product Tech", "Fintech"].map((tier) => (
          <button
            key={tier}
            onClick={() => setFilterTier(tier)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
              filterTier === tier
                ? "bg-orange-500 text-white"
                : "bg-[#121215] text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            {tier}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Company Selection Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search companies (TCS, Google, Amazon)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-[#121215] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          <div className="space-y-2 max-h-[680px] overflow-y-auto pr-1">
            {filteredCompanies.map((comp) => {
              const isSelected = activeCompany?.id === comp.id;
              const isUserTarget = user?.targetCompanies?.includes(comp.id);
              return (
                <button
                  key={comp.id}
                  id={`btn-company-select-${comp.id}`}
                  onClick={() => {
                    setActiveCompany(comp);
                    setActiveCategoryIdx(0);
                    setSelectedCompanyId(comp.id);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                    isSelected
                      ? "bg-[#18181c] border-orange-500 text-orange-400 shadow-md"
                      : "bg-[#121215] border-zinc-800/80 text-zinc-300 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={comp.logo} alt={comp.name} className="w-9 h-9 rounded-lg object-cover border border-zinc-800" />
                    <div>
                      <div className="font-bold text-xs font-mono text-white flex items-center gap-1.5">
                        <span>{comp.name}</span>
                        {isUserTarget && <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">{comp.tier}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? "text-orange-400" : "text-zinc-500"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Company Curriculum & Rounds Deep Dive */}
        {activeCompany && (
          <div className="lg:col-span-8 space-y-6">
            {/* Company Hero Card */}
            <div className="p-6 rounded-2xl bg-[#121215] border border-zinc-800 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <img src={activeCompany.logo} alt={activeCompany.name} className="w-16 h-16 rounded-xl object-cover border border-zinc-700" />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold font-mono text-white">{activeCompany.name}</h2>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-orange-500/20">
                      {activeCompany.tier}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1 max-w-xl leading-relaxed">{activeCompany.description}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0 w-full sm:w-auto">
                <button
                  id="btn-toggle-target-goal"
                  onClick={toggleTargetCompany}
                  className={`w-full sm:w-auto px-3.5 py-2.5 rounded-lg border text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 ${
                    isTarget
                      ? "bg-orange-500/10 border-orange-500 text-orange-400"
                      : "bg-[#141418] border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>{isTarget ? "Target Selected" : "Set As Target"}</span>
                </button>

                <button
                  id="btn-launch-core-cs-engine"
                  onClick={() => {
                    setCoreCSInitialTopic("All");
                    setCoreCSModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-3.5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Cpu className="w-3.5 h-3.5 text-amber-400" />
                  <span>Core CS Engine</span>
                </button>

                <button
                  id="btn-simulate-company-interview"
                  onClick={() => setCurrentTab("mock-interview")}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Mock Interview</span>
                </button>
              </div>
            </div>

            {/* Hiring Process Rounds */}
            <div className="p-5 rounded-2xl bg-[#121215] border border-zinc-800 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider font-mono text-zinc-300">
                Evaluation Pipeline & Rounds
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {(activeCompany.hiringProcess || []).map((step, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#0e0e12] border border-zinc-800/80 space-y-1 font-mono">
                    <div className="text-[10px] font-bold text-orange-400 uppercase">Stage {idx + 1}</div>
                    <div className="font-bold text-xs text-white leading-snug">{step}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Syllabus Categories Tabs */}
            <div className="bg-[#121215] rounded-2xl border border-zinc-800 overflow-hidden">
              <div className="flex border-b border-zinc-800 bg-[#0e0e12] overflow-x-auto no-scrollbar">
                {(activeCompany.categories || []).map((cat, idx) => (
                  <button
                    key={cat.name}
                    id={`btn-syllabus-tab-${idx}`}
                    onClick={() => setActiveCategoryIdx(idx)}
                    className={`px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition ${
                      activeCategoryIdx === idx
                        ? "border-orange-500 text-orange-400 bg-orange-500/5"
                        : "border-transparent text-zinc-400 hover:text-white"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Active Category Content */}
              {activeCompany.categories?.[activeCategoryIdx] && (
                <div className="p-6 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold font-mono text-white">
                        {activeCompany.categories[activeCategoryIdx].name}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        {activeCompany.categories[activeCategoryIdx].description}
                      </p>
                    </div>
                    {activeCompany.categories[activeCategoryIdx].sampleQuestionsCount && (
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
                        {activeCompany.categories[activeCategoryIdx].sampleQuestionsCount}+ Questions Tested
                      </span>
                    )}
                  </div>

                  {/* Syllabus Topics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {(activeCompany.categories[activeCategoryIdx].topics || []).map((topic, idx) => {
                      const isAptitudeCompany =
                        activeCompany.id === "comp_tcs" ||
                        activeCompany.id === "comp_infosys" ||
                        activeCompany.id === "comp_accenture" ||
                        activeCompany.id === "comp_hcl" ||
                        activeCompany.tier === "Service Based";

                      const isPercentagesTopic =
                        isAptitudeCompany && topic.toLowerCase().includes("percentage");
                      const isProfitLossTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("profit") || topic.toLowerCase().includes("marked price"));
                      const isRatioProportionTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("ratio") || topic.toLowerCase().includes("proportion") || topic.toLowerCase().includes("variation"));
                      const isAveragesTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("average") || topic.toLowerCase().includes("mixture") || topic.toLowerCase().includes("alligation"));
                      const isTimeWorkTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("time and work") || topic.toLowerCase().includes("pipes") || topic.toLowerCase().includes("cistern"));
                      const isTimeSpeedTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("speed") || topic.toLowerCase().includes("distance") || topic.toLowerCase().includes("train") || topic.toLowerCase().includes("boat"));
                      const isInterestTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("interest") || topic.toLowerCase().includes("simple & compound") || topic.toLowerCase().includes("compounding"));
                      const isProbabilityTopic =
                        isAptitudeCompany && topic.toLowerCase().includes("probability");
                      const isPermutationsTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("permutation") || topic.toLowerCase().includes("combination") || topic.toLowerCase().includes("arrangements"));
                      const isLcmHcfTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("lcm") || topic.toLowerCase().includes("hcf") || topic.toLowerCase().includes("modular arithmetic"));
                      const isNumberSystemTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("number system") || topic.toLowerCase().includes("divisibility") || topic.toLowerCase().includes("remainder"));
                      const isDataInterpretationTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("data interpretation") || topic.toLowerCase().includes("chart") || topic.toLowerCase().includes("graph") || topic.toLowerCase().includes("table"));
                      const isProgressionsTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("progression") || topic.toLowerCase().includes("arithmetic, geometric") || topic.toLowerCase().includes("harmonic series") || topic.toLowerCase().includes("series"));
                      const isGeometryTopic =
                        isAptitudeCompany &&
                        (topic.toLowerCase().includes("geometry") || topic.toLowerCase().includes("mensuration") || topic.toLowerCase().includes("surface area") || topic.toLowerCase().includes("volume"));

                      // Product Tech DSA Batches
                      const isArraysHashingTopic =
                        topic.toLowerCase().includes("array") &&
                        (topic.toLowerCase().includes("hash") || (topic.toLowerCase().includes("prefix sum") && !topic.toLowerCase().includes("binary search")));

                      const isTwoPointersSlidingWindowTopic =
                        topic.toLowerCase().includes("two pointer") || topic.toLowerCase().includes("sliding window");

                      const isBinarySearchTopic =
                        topic.toLowerCase().includes("binary search") || (topic.toLowerCase().includes("prefix sum") && !isArraysHashingTopic);

                      const isTreesTopic =
                        topic.toLowerCase().includes("tree") || topic.toLowerCase().includes("bst");

                      const isAdvancedGraphsTopic =
                        topic.toLowerCase().includes("advanced graph") ||
                        topic.toLowerCase().includes("shortest path") ||
                        topic.toLowerCase().includes("mst") ||
                        topic.toLowerCase().includes("dsu") ||
                        topic.toLowerCase().includes("prim") ||
                        topic.toLowerCase().includes("kruskal") ||
                        topic.toLowerCase().includes("scc") ||
                        topic.toLowerCase().includes("strongly connected");

                      const isGraphsTopic =
                        !isAdvancedGraphsTopic &&
                        (topic.toLowerCase().includes("graph") || topic.toLowerCase().includes("bfs") || topic.toLowerCase().includes("dfs") || topic.toLowerCase().includes("disjoint set") || topic.toLowerCase().includes("islands"));

                      const isHeapsTopic =
                        topic.toLowerCase().includes("heap") || topic.toLowerCase().includes("priority queue") || (topic.toLowerCase().includes("greedy") && !topic.toLowerCase().includes("dp"));

                      const isDpTopic =
                        topic.toLowerCase().includes("dynamic programming") || topic.toLowerCase().includes("dp") || topic.toLowerCase().includes("knapsack") || topic.toLowerCase().includes("subsequence") || topic.toLowerCase().includes("egg drop");

                      const isAdvDataStructuresTopic =
                        topic.toLowerCase().includes("advanced data structure") ||
                        topic.toLowerCase().includes("segment tree") ||
                        topic.toLowerCase().includes("fenwick") ||
                        topic.toLowerCase().includes("binary lifting") ||
                        topic.toLowerCase().includes("sparse table") ||
                        topic.toLowerCase().includes("euler tour");

                      const isFinalExtremeTopic =
                        topic.toLowerCase().includes("final extreme") ||
                        topic.toLowerCase().includes("tier-1 challenge") ||
                        topic.toLowerCase().includes("trapping rain water ii") ||
                        topic.toLowerCase().includes("skyline") ||
                        topic.toLowerCase().includes("3d bfs") ||
                        topic.toLowerCase().includes("median array") ||
                        topic.toLowerCase().includes("lfu");

                      const currentCatName = activeCompany?.categories?.[activeCategoryIdx]?.name || "";
                      const isSystemDesignCategory = currentCatName.toLowerCase().includes("system design");
                      const isSystemDesignTopic =
                        isSystemDesignCategory ||
                        topic.toLowerCase().includes("lld") ||
                        topic.toLowerCase().includes("hld") ||
                        topic.toLowerCase().includes("ood") ||
                        topic.toLowerCase().includes("solid principles") ||
                        topic.toLowerCase().includes("system design") ||
                        topic.toLowerCase().includes("distributed caching") ||
                        topic.toLowerCase().includes("load balancing") ||
                        topic.toLowerCase().includes("database sharding") ||
                        topic.toLowerCase().includes("message queue") ||
                        topic.toLowerCase().includes("rate limit");

                      const isCoreCSCategory =
                        currentCatName.toLowerCase().includes("core cs") ||
                        currentCatName.toLowerCase().includes("cs fundamentals") ||
                        currentCatName.toLowerCase().includes("operating system") ||
                        currentCatName.toLowerCase().includes("dbms") ||
                        currentCatName.toLowerCase().includes("networking") ||
                        currentCatName.toLowerCase().includes("oops");

                      const isCoreCSTopic =
                        !isSystemDesignTopic &&
                        (isCoreCSCategory ||
                          topic.toLowerCase().includes("operating system") ||
                          topic.toLowerCase().includes("process management") ||
                          topic.toLowerCase().includes("virtual memory") ||
                          topic.toLowerCase().includes("dbms") ||
                          topic.toLowerCase().includes("sql") ||
                          topic.toLowerCase().includes("computer network") ||
                          topic.toLowerCase().includes("tcp/ip") ||
                          topic.toLowerCase().includes("oops") ||
                          topic.toLowerCase().includes("multithreading") ||
                          topic.toLowerCase().includes("concurrency") ||
                          topic.toLowerCase().includes("core cs"));

                      const isDsaTopic = !isSystemDesignTopic && !isCoreCSTopic && (isArraysHashingTopic || isTwoPointersSlidingWindowTopic || isBinarySearchTopic || isTreesTopic || isGraphsTopic || isHeapsTopic || isDpTopic || isAdvancedGraphsTopic || isAdvDataStructuresTopic || isFinalExtremeTopic);

                      const dsaBatchNum = isArraysHashingTopic
                        ? 1
                        : isTwoPointersSlidingWindowTopic
                        ? 2
                        : isBinarySearchTopic
                        ? 3
                        : isTreesTopic
                        ? 4
                        : isGraphsTopic
                        ? 5
                        : isHeapsTopic
                        ? 6
                        : isDpTopic
                        ? 7
                        : isAdvancedGraphsTopic
                        ? 8
                        : isAdvDataStructuresTopic
                        ? 9
                        : isFinalExtremeTopic
                        ? 10
                        : 1;

                      const aptitudeTopicKey = isGeometryTopic
                        ? "geometry"
                        : isProgressionsTopic
                        ? "progressions"
                        : isDataInterpretationTopic
                        ? "dataInterpretation"
                        : isNumberSystemTopic
                        ? "numberSystem"
                        : isLcmHcfTopic
                        ? "lcmHcf"
                        : isPermutationsTopic
                        ? "permutations"
                        : isProbabilityTopic
                        ? "probability"
                        : isInterestTopic
                        ? "interest"
                        : isTimeSpeedTopic
                        ? "timeSpeed"
                        : isTimeWorkTopic
                        ? "timeWork"
                        : isAveragesTopic
                        ? "averages"
                        : isRatioProportionTopic
                        ? "ratioProportion"
                        : isProfitLossTopic
                        ? "profitLoss"
                        : isPercentagesTopic
                        ? "percentages"
                        : "";

                      const hasDedicatedBank = Boolean(aptitudeTopicKey) || isDsaTopic || isSystemDesignTopic || isCoreCSTopic;
                      
                      const bankLabel = isCoreCSTopic
                        ? "STEP 4 Core CS Master Question Bank • OS, DBMS, Networks, OOP, SQL, Concurrency & Systems"
                        : isSystemDesignTopic
                        ? "STEP 3 Master Question Bank • HLD, LLD, OOD, SOLID & Distributed Systems"
                        : isArraysHashingTopic
                        ? "20-Problem Batch 1 (Q01–Q20) • Arrays & Hashing"
                        : isTwoPointersSlidingWindowTopic
                        ? "20-Problem Batch 2 (Q21–Q40) • Strings, Two Pointers & Sliding Window"
                        : isBinarySearchTopic
                        ? "20-Problem Batch 3 (Q41–Q60) • Binary Search & Prefix Sum"
                        : isTreesTopic
                        ? "20-Problem Batch 4 (Q61–Q80) • Trees & Binary Search Trees (BST)"
                        : isGraphsTopic
                        ? "20-Problem Batch 5 (Q81–Q100) • Graphs, BFS, DFS & Graph Algorithms"
                        : isHeapsTopic
                        ? "20-Problem Batch 6 (Q101–Q120) • Heaps, Priority Queue & Greedy Algorithms"
                        : isDpTopic
                        ? "20-Problem Batch 7 (Q121–Q140) • Dynamic Programming & Advanced DP"
                        : isAdvancedGraphsTopic
                        ? "20-Problem Batch 8 (Q141–Q160) • Advanced Graphs, Shortest Path, MST & DSU"
                        : isAdvDataStructuresTopic
                        ? "20-Problem Batch 9 (Q161–Q180) • Advanced Data Structures & Multi-Pattern"
                        : isFinalExtremeTopic
                        ? "20-Problem Batch 10 (Q181–Q200) • Final Extreme Tier-1 Challenge"
                        : (isGeometryTopic || isProgressionsTopic || isDataInterpretationTopic || isNumberSystemTopic || isLcmHcfTopic || isPermutationsTopic || isProbabilityTopic || isInterestTopic || isTimeSpeedTopic || isTimeWorkTopic)
                        ? "100-Question Exam Bank (Q01–Q100) • Foundation to Placement Level"
                        : isAveragesTopic
                        ? "100-Question Exam Bank (Q01–Q100) • Basic to Placement Level"
                        : isRatioProportionTopic
                        ? "100-Question Exam Bank (Q01–Q100) • Foundation to Advanced"
                        : isProfitLossTopic
                        ? "80-Question Exam Bank (Q01–Q80)"
                        : "100-Question Exam Bank (Q1–Q100)";

                      const handleLaunchTopic = () => {
                        if (isCoreCSTopic) {
                          setCoreCSInitialTopic("All");
                          setCoreCSModalOpen(true);
                        } else if (isSystemDesignTopic) {
                          handleOpenSystemDesign(topic);
                        } else if (isDsaTopic) {
                          handleOpenDSA(topic, dsaBatchNum);
                        } else if (aptitudeTopicKey) {
                          handleOpenQuiz(topic, activeCompany?.categories?.[activeCategoryIdx]?.name || "Placement Preparation", aptitudeTopicKey);
                        }
                      };

                      return (
                        <div
                          key={idx}
                          id={`topic-item-${idx}`}
                          className={`p-3.5 rounded-xl border flex items-center justify-between gap-2.5 transition group ${
                            hasDedicatedBank
                              ? "bg-gradient-to-r from-[#171722] to-[#121217] border-orange-500/40 hover:border-orange-500 shadow-md shadow-orange-500/5 hover:scale-[1.005]"
                              : "bg-[#0e0e12] border-zinc-800/80 hover:border-zinc-700"
                          }`}
                        >
                          <div
                            className="flex items-start gap-2.5 flex-1 cursor-pointer"
                            onClick={handleLaunchTopic}
                          >
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${hasDedicatedBank ? "text-orange-400" : "text-zinc-500"}`} />
                            <div>
                              <div className={`text-xs font-medium leading-snug ${hasDedicatedBank ? "text-white font-bold group-hover:text-orange-300" : "text-zinc-300"}`}>
                                {topic}
                              </div>
                              {hasDedicatedBank && (
                                <div className="text-[10px] font-mono text-orange-400 mt-0.5 flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  <span>{bankLabel}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            {isAveragesTopic && (
                              <button
                                id="btn-open-averages-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {isTimeWorkTopic && (
                              <button
                                id="btn-open-timework-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTimeWorkFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {isTimeSpeedTopic && (
                              <button
                                id="btn-open-timespeed-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setTimeSpeedFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {isInterestTopic && (
                              <button
                                id="btn-open-interest-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInterestFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {isProbabilityTopic && (
                              <button
                                id="btn-open-probability-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProbabilityFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {isPermutationsTopic && (
                              <button
                                id="btn-open-permutations-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setPermutationsFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {isLcmHcfTopic && (
                              <button
                                id="btn-open-lcmhcf-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLcmHcfFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {isNumberSystemTopic && (
                              <button
                                id="btn-open-numbersystem-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setNumberSystemFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {isDataInterpretationTopic && (
                              <button
                                id="btn-open-datainterpretation-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setDataInterpretationFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {isProgressionsTopic && (
                              <button
                                id="btn-open-progressions-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setProgressionsFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {isGeometryTopic && (
                              <button
                                id="btn-open-geometry-formula-sheet"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setGeometryFormulaSheetOpen(true);
                                }}
                                className="px-2 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-semibold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View Formulas & Concept Sheet"
                              >
                                <FileText className="w-3 h-3" />
                                <span className="hidden sm:inline">Formulas</span>
                              </button>
                            )}

                            {hasDedicatedBank && (
                              <button
                                id={`btn-launch-topic-bank-${idx}`}
                                onClick={handleLaunchTopic}
                                className="px-2.5 py-1 rounded-lg bg-orange-500 text-white text-[11px] font-mono font-bold uppercase tracking-wider shrink-0 flex items-center gap-1 hover:bg-orange-600 transition shadow-sm"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                <span>Practice</span>
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  {/* Interview Pro-Tips */}
                  {activeCompany.interviewTips && activeCompany.interviewTips.length > 0 && (
                    <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-400 uppercase">
                        <Lightbulb className="w-4 h-4" />
                        <span>Placement Strategy Tips</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-zinc-300">
                        {activeCompany.interviewTips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-orange-500 font-bold">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Recommended Practice Problems */}
                  {activeCompany.recommendedProblemIds && activeCompany.recommendedProblemIds.length > 0 && (
                    <div className="pt-4 border-t border-zinc-800 space-y-3">
                      <h4 className="font-bold text-xs font-mono text-zinc-400 uppercase tracking-wider">
                        High-Frequency Coding Problems for {activeCompany.name}
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {activeCompany.recommendedProblemIds.map((pid) => {
                          const prob = (problems || []).find((p) => p.id === pid);
                          const isSolved = user?.solvedProblemIds?.includes(pid);
                          return (
                            <button
                              key={pid}
                              id={`btn-solve-rec-prob-${pid}`}
                              onClick={() => navigateToProblem(pid)}
                              className="p-3 rounded-xl bg-[#141418] border border-zinc-800 hover:border-orange-500 text-left transition flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-2.5">
                                <Code2 className="w-4 h-4 text-orange-500" />
                                <div>
                                  <div className="text-xs font-mono font-bold text-zinc-200 group-hover:text-white">
                                    {prob?.title || pid.replace("prob_", "").replace(/_/g, " ").toUpperCase()}
                                  </div>
                                  <div className="text-[10px] font-mono text-zinc-500">
                                    {prob?.difficulty || "Medium"} • {prob?.category || "Algorithms"}
                                  </div>
                                </div>
                              </div>
                              {isSolved ? (
                                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                  Solved
                                </span>
                              ) : (
                                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 100-Question Diagnostic Bank Modal */}
      {quizModalOpen && (
        <TopicQuizModal
          isOpen={quizModalOpen}
          onClose={() => setQuizModalOpen(false)}
          topicTitle={quizTopic}
          categoryTitle={quizCategory}
          companyName={activeCompany?.name || "TCS"}
          questions={quizQuestions}
        />
      )}

      {/* Averages, Mixtures & Alligations Formula Sheet Modal */}
      {formulaSheetOpen && (
        <div
          id="averages-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Averages, Mixtures & Alligations • Core Formulas & Shortcuts
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-formula-sheet"
                onClick={() => setFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_AVERAGES_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                10 Concept Rules • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-quiz-from-formulas"
                onClick={() => {
                  setFormulaSheetOpen(false);
                  handleOpenQuiz("Averages, Mixtures & Alligations", "Numerical Ability (Quantitative Aptitude)", "averages");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice 100-Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time and Work & Pipes and Cisterns Formula Sheet Modal */}
      {timeWorkFormulaSheetOpen && (
        <div
          id="timework-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Time and Work & Pipes and Cisterns • Core Formulas & Shortcuts
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-timework-formula-sheet"
                onClick={() => setTimeWorkFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_TIME_WORK_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`timework-formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                10 Concept Rules • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-timework-quiz-from-formulas"
                onClick={() => {
                  setTimeWorkFormulaSheetOpen(false);
                  handleOpenQuiz("Time and Work & Pipes and Cisterns", "Numerical Ability (Quantitative Aptitude)", "timeWork");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice 100-Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time, Speed and Distance & Relative Speed Formula Sheet Modal */}
      {timeSpeedFormulaSheetOpen && (
        <div
          id="timespeed-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Time, Speed & Distance, Trains & Boats • Core Formulas
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-timespeed-formula-sheet"
                onClick={() => setTimeSpeedFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_TIME_SPEED_DISTANCE_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`timespeed-formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                10 Concept Rules • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-timespeed-quiz-from-formulas"
                onClick={() => {
                  setTimeSpeedFormulaSheetOpen(false);
                  handleOpenQuiz("Time, Speed and Distance & Relative Speed (Trains, Boats)", "Numerical Ability (Quantitative Aptitude)", "timeSpeed");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple & Compound Interest Formula Sheet Modal */}
      {interestFormulaSheetOpen && (
        <div
          id="interest-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Simple & Compound Interest • Core Formulas & Shortcuts
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-interest-formula-sheet"
                onClick={() => setInterestFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_INTEREST_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`interest-formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                10 Concept Rules • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-interest-quiz-from-formulas"
                onClick={() => {
                  setInterestFormulaSheetOpen(false);
                  handleOpenQuiz("Simple & Compound Interest (Half-yearly/Quarterly compounding)", "Numerical Ability (Quantitative Aptitude)", "interest");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice 100-Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Probability & Conditional Probability Formula Sheet Modal */}
      {probabilityFormulaSheetOpen && (
        <div
          id="probability-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Probability & Conditional Probability • Core Formulas
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-probability-formula-sheet"
                onClick={() => setProbabilityFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_PROBABILITY_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`probability-formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                10 Concept Rules • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-probability-quiz-from-formulas"
                onClick={() => {
                  setProbabilityFormulaSheetOpen(false);
                  handleOpenQuiz("Probability & Conditional Probability", "Numerical Ability (Quantitative Aptitude)", "probability");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice 100-Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permutations & Combinations Formula Sheet Modal */}
      {permutationsFormulaSheetOpen && (
        <div
          id="permutations-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Permutations & Combinations (Arrangements & Selections) • Core Formulas
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-permutations-formula-sheet"
                onClick={() => setPermutationsFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_PERMUTATIONS_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`permutations-formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                10 Concept Rules • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-permutations-quiz-from-formulas"
                onClick={() => {
                  setPermutationsFormulaSheetOpen(false);
                  handleOpenQuiz("Permutations & Combinations (Arrangements & Selections)", "Numerical Ability (Quantitative Aptitude)", "permutations");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice 100-Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LCM, HCF & Modular Arithmetic Formula Sheet Modal */}
      {lcmHcfFormulaSheetOpen && (
        <div
          id="lcmhcf-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    LCM, HCF & Modular Arithmetic • Core Formulas & Shortcuts
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-lcmhcf-formula-sheet"
                onClick={() => setLcmHcfFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_LCM_HCF_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`lcmhcf-formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                12 Concept Rules • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-lcmhcf-quiz-from-formulas"
                onClick={() => {
                  setLcmHcfFormulaSheetOpen(false);
                  handleOpenQuiz("LCM, HCF & Modular Arithmetic", "Numerical Ability (Quantitative Aptitude)", "lcmHcf");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice 100-Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Number System, Divisibility Rules & Remainder Theorem Formula Sheet Modal */}
      {numberSystemFormulaSheetOpen && (
        <div
          id="numbersystem-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Number System, Divisibility Rules & Remainder Theorem • Formulas & Shortcuts
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-numbersystem-formula-sheet"
                onClick={() => setNumberSystemFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_NUMBER_SYSTEM_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`numbersystem-formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                12 Concept Rules • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-numbersystem-quiz-from-formulas"
                onClick={() => {
                  setNumberSystemFormulaSheetOpen(false);
                  handleOpenQuiz("Number System, Divisibility Rules & Remainder Theorem", "Numerical Ability (Quantitative Aptitude)", "numberSystem");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice 100-Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Data Interpretation Formula Sheet Modal */}
      {dataInterpretationFormulaSheetOpen && (
        <div
          id="datainterpretation-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Data Interpretation • Calculations, Ratios & Growth Rules
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-datainterpretation-formula-sheet"
                onClick={() => setDataInterpretationFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_DATA_INTERPRETATION_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`datainterpretation-formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                Core DI Calculation Shortcuts • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-datainterpretation-quiz-from-formulas"
                onClick={() => {
                  setDataInterpretationFormulaSheetOpen(false);
                  handleOpenQuiz("Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)", "Numerical Ability (Quantitative Aptitude)", "dataInterpretation");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice 100-Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Progressions Formula Sheet Modal */}
      {progressionsFormulaSheetOpen && (
        <div
          id="progressions-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Progressions • AP, GP, HP, AGP & Telescoping Series
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-progressions-formula-sheet"
                onClick={() => setProgressionsFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_PROGRESSIONS_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`progressions-formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                Essential Progression & Series Rules • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-progressions-quiz-from-formulas"
                onClick={() => {
                  setProgressionsFormulaSheetOpen(false);
                  handleOpenQuiz("Progressions (Arithmetic, Geometric, Harmonic Series)", "Numerical Ability (Quantitative Aptitude)", "progressions");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice 100-Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Geometry & Mensuration Formula Sheet Modal */}
      {geometryFormulaSheetOpen && (
        <div
          id="geometry-formula-sheet-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
        >
          <div className="relative w-full max-w-4xl bg-[#0d0d12] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#121218]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400">
                    {activeCompany?.name || "Placement"} Numerical Ability Reference Sheet
                  </span>
                  <h3 className="text-base font-bold font-mono text-white">
                    Geometry & Mensuration • 2D/3D Surface Areas, Volumes & Theorems
                  </h3>
                </div>
              </div>
              <button
                id="btn-close-geometry-formula-sheet"
                onClick={() => setGeometryFormulaSheetOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Formula Cards Grid */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TCS_GEOMETRY_FORMULAS.map((item, idx) => (
                  <div
                    key={idx}
                    id={`geometry-formula-item-${idx}`}
                    className="p-4 rounded-xl bg-[#14141a] border border-zinc-800/80 hover:border-orange-500/40 transition space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-orange-400 border border-zinc-700">
                        {item.category}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-black/50 border border-zinc-800 text-xs font-mono text-emerald-400 font-semibold whitespace-pre-line">
                      {item.formula}
                    </div>

                    <p className="text-[11px] text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="pt-2 border-t border-zinc-800/60 text-[11px] text-zinc-300 font-mono">
                      <span className="text-orange-400 font-semibold">Ex: </span>
                      {item.example}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Action */}
            <div className="px-6 py-3.5 border-t border-zinc-800 bg-[#121218] flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400">
                Essential 2D/3D Mensuration & Optimization Rules • Ready for Placement Assessments
              </span>
              <button
                id="btn-start-geometry-quiz-from-formulas"
                onClick={() => {
                  setGeometryFormulaSheetOpen(false);
                  handleOpenQuiz("Geometry, Mensuration (2D/3D Surface Areas and Volumes)", "Numerical Ability (Quantitative Aptitude)", "geometry");
                }}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-md"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Practice 100-Question Bank</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product Tech DSA Question Bank Interactive Modal */}
      <DSAQuestionBankModal
        isOpen={dsaModalOpen}
        onClose={() => setDsaModalOpen(false)}
        topicTitle={dsaTopicTitle}
        categoryTitle={dsaCategoryTitle}
        companyName={activeCompany?.name || "Product Tech"}
        questions={dsaQuestions}
        batchNumber={dsaBatchNumber}
      />

      {/* Product Tech System Design Master Interactive Modal */}
      <SystemDesignModal
        isOpen={systemDesignModalOpen}
        onClose={() => setSystemDesignModalOpen(false)}
        topicTitle={systemDesignTopicTitle}
        categoryTitle={systemDesignCategoryTitle}
        companyName={activeCompany?.name || "Tier-1 Product Tech"}
        questions={systemDesignQuestions}
      />

      {/* Product Tech Core CS Fundamentals Master Interactive Modal (STEP 4) */}
      <CoreCSModal
        isOpen={coreCSModalOpen}
        onClose={() => setCoreCSModalOpen(false)}
        initialTopic={coreCSInitialTopic}
        initialCompany={activeCompany?.name || "Tier-1 Product Tech"}
      />
    </div>
  );
};

