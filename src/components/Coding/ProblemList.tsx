import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  Code2,
  Search,
  CheckCircle2,
  Circle,
  Building2,
  Sparkles,
  ArrowRight,
  Filter,
  Shuffle,
  Layers,
  Loader2,
  Zap,
  RefreshCw
} from "lucide-react";
import { api } from "../../services/api.js";
import { CodingProblemSummary } from "../../types/index.js";
import { useAuth } from "../../context/AuthContext.js";
import { useApp } from "../../context/AppContext.js";
import { ProblemCard } from "./ProblemCard.js";
import { DifficultyBadge } from "./DifficultyBadge.js";

const ROW_HEIGHT = 70;
const OVERSCAN = 6;

export const ProblemList: React.FC = () => {
  const { user } = useAuth();
  const { navigateToProblem, setTutorContext } = useApp();
  const [problems, setProblems] = useState<CodingProblemSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedCompany, setSelectedCompany] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [cachedIds, setCachedIds] = useState<Set<string>>(new Set());

  // Virtualization state & refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(640);

  // Synchronize AI Tutor context with current active filters
  useEffect(() => {
    setTutorContext({
      topic: selectedCategory !== "All" ? selectedCategory : "Data Structures & Algorithms",
      difficulty: selectedDifficulty !== "All" ? selectedDifficulty : "All Levels",
      company: selectedCompany !== "All" ? selectedCompany : undefined,
      courseTitle: "Algorithmic Problem Bank",
      lessonTitle: selectedCompany !== "All" ? `${selectedCompany} DSA Questions` : (selectedCategory !== "All" ? `${selectedCategory} Problems` : "DSA Problem Catalog"),
    });
  }, [selectedCategory, selectedDifficulty, selectedCompany, setTutorContext]);

  const fetchProblemMetadata = useCallback(() => {
    setLoading(true);
    setError(null);
    // Fetch only minimal metadata (id, title, difficulty, acceptanceRate, topic, companyTags)
    api.getProblems()
      .then((p) => {
        setProblems(p || []);
      })
      .catch((err) => {
        console.error("Failed to load problem metadata:", err);
        setError("Unable to load problem metadata. Please retry.");
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProblemMetadata();
  }, [fetchProblemMetadata]);

  // Update container height dynamically on resize
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          setViewportHeight(entry.contentRect.height);
        }
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const categories = [
    "All",
    "Arrays & Hashing",
    "Two Pointers",
    "Sliding Window",
    "Stack",
    "Binary Search",
    "Linked List",
    "Trees & BST",
    "Heap / Priority Queue",
    "Backtracking",
    "Graphs",
    "Dynamic Programming",
    "Greedy",
    "Math & Geometry",
    "Bit Manipulation"
  ];

  const companies = ["All", "TCS", "Google", "Amazon", "Microsoft", "Infosys", "Accenture", "InMobi", "American Express", "HCLTech", "Meta", "Uber", "Apple"];

  const filtered = useMemo(() => {
    const solvedSet = new Set(user?.solvedProblemIds || []);
    const q = searchQuery.toLowerCase().trim();

    return (problems || []).filter((p) => {
      const isSolved = solvedSet.has(p.id);
      const matchSearch =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        (p.topics || []).some((t) => t.toLowerCase().includes(q)) ||
        (p.companyTags || []).some((c) => c.toLowerCase().includes(q));

      const matchDiff = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
      const matchCat = selectedCategory === "All" || p.category === selectedCategory || (p.topics || []).includes(selectedCategory);
      const matchComp = selectedCompany === "All" || (p.companyTags || []).includes(selectedCompany);
      const matchStatus =
        selectedStatus === "All" ||
        (selectedStatus === "Solved" && isSolved) ||
        (selectedStatus === "Todo" && !isSolved);

      return matchSearch && matchDiff && matchCat && matchComp && matchStatus;
    });
  }, [problems, user?.solvedProblemIds, searchQuery, selectedDifficulty, selectedCategory, selectedCompany, selectedStatus]);

  // Reset scroll position when filter criteria change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
      setScrollTop(0);
    }
  }, [searchQuery, selectedDifficulty, selectedCategory, selectedCompany, selectedStatus]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Compute virtual window slices
  const totalCount = filtered.length;
  const totalVirtualHeight = totalCount * ROW_HEIGHT;
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const endIndex = Math.min(totalCount, Math.ceil((scrollTop + viewportHeight) / ROW_HEIGHT) + OVERSCAN);
  const visibleItems = useMemo(() => filtered.slice(startIndex, endIndex), [filtered, startIndex, endIndex]);
  const offsetY = startIndex * ROW_HEIGHT;

  // Lazy prefetch problem full payload on hover / focus
  const handlePrefetch = useCallback((id: string) => {
    if (!api.hasCachedProblem(id)) {
      api.prefetchProblem(id);
      setCachedIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }
  }, []);

  // Problem selection triggers immediate navigation & background lazy load
  const handleSelectProblem = useCallback((id: string) => {
    // Trigger lazy fetch into in-memory cache if not already present
    api.prefetchProblem(id);
    navigateToProblem(id);
  }, [navigateToProblem]);

  const handleRandomProblem = () => {
    if (filtered.length > 0) {
      const randomIdx = Math.floor(Math.random() * filtered.length);
      const target = filtered[randomIdx];
      handleSelectProblem(target.id);
    } else if (problems.length > 0) {
      const randomIdx = Math.floor(Math.random() * problems.length);
      const target = problems[randomIdx];
      handleSelectProblem(target.id);
    }
  };

  const solvedCount = (user?.solvedProblemIds || []).length;
  const solvedSet = useMemo(() => new Set(user?.solvedProblemIds || []), [user?.solvedProblemIds]);

  return (
    <div id="dsa-problem-bank-view" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6 animate-fadeIn text-zinc-100 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#0e0e12] border border-zinc-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-orange-500">
            <Code2 className="w-4 h-4" />
            <span>LEETCODE DSA PLATFORM • 100+ PROBLEMS</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 lowercase">
              <Zap className="w-3 h-3 text-emerald-400" /> lazy-loaded
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black uppercase font-mono tracking-tight text-white">
            Algorithmic Problem Bank
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
            Practice 100+ curated algorithmic problems categorized across Two Pointers, Sliding Window, Trees, Graphs, and DP with Python, C++, Java, and JavaScript sandboxed evaluation.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-right">
            <div className="text-xs font-mono text-zinc-400">Solved Ratio</div>
            <div className="text-base font-black font-mono text-orange-400">
              {solvedCount} / {problems.length}
            </div>
          </div>

          <button
            id="btn-random-dsa-problem"
            onClick={handleRandomProblem}
            className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95"
          >
            <Shuffle className="w-4 h-4" />
            <span>PICK RANDOM</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="space-y-3 bg-[#121215] p-4 sm:p-5 rounded-2xl border border-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search problems (Two Sum, BFS, DP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono"
            />
          </div>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500 font-mono"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Company Filter */}
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500 font-mono"
          >
            {companies.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All Companies" : c}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-zinc-300 focus:outline-none focus:border-orange-500 font-mono"
          >
            <option value="All">All Status</option>
            <option value="Solved">Solved</option>
            <option value="Todo">Todo</option>
          </select>
        </div>

        {/* Topic / Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`btn-category-${cat.replace(/\s+/g, "-").toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-bold shrink-0 transition ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white shadow-sm"
                  : "bg-[#18181c] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub-counter display */}
        <div className="flex items-center justify-between pt-1 text-[11px] font-mono text-zinc-400">
          <span>Showing {filtered.length} of {problems.length} problems</span>
          {selectedCategory !== "All" && (
            <span className="text-orange-400">Category: {selectedCategory}</span>
          )}
        </div>
      </div>

      {/* Problem Table with Virtualization */}
      <div className="bg-[#121215] rounded-2xl border border-zinc-800 overflow-hidden shadow-sm flex flex-col">
        {/* Sticky Table Header */}
        <div className="grid grid-cols-12 px-5 py-3 text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest bg-[#0e0e12] border-b border-zinc-800 shrink-0">
          <div className="col-span-1">Status</div>
          <div className="col-span-6 sm:col-span-6">Title & Category</div>
          <div className="col-span-2 sm:col-span-2">Difficulty</div>
          <div className="col-span-3">Company Tags</div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-zinc-500 text-xs font-mono flex flex-col items-center justify-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
            <span>Loading problem metadata...</span>
          </div>
        ) : error ? (
          <div className="p-12 text-center text-zinc-400 text-xs font-mono flex flex-col items-center justify-center space-y-3">
            <p className="text-rose-400">{error}</p>
            <button
              onClick={fetchProblemMetadata}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-mono transition flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 text-xs font-mono">
            No DSA problems match your filter criteria.
          </div>
        ) : (
          /* Scrollable Virtualized Viewport */
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="max-h-[640px] overflow-y-auto divide-y divide-zinc-800/80 custom-scrollbar"
            style={{ contain: "strict", height: "640px" }}
          >
            <div style={{ height: `${totalVirtualHeight}px`, position: "relative", width: "100%" }}>
              <div
                style={{
                  transform: `translateY(${offsetY}px)`,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  willChange: "transform"
                }}
              >
                {visibleItems.map((p) => (
                  <ProblemCard
                    key={p.id}
                    problem={p}
                    isSolved={solvedSet.has(p.id)}
                    onSelect={handleSelectProblem}
                    onPrefetch={handlePrefetch}
                    isCached={cachedIds.has(p.id) || api.hasCachedProblem(p.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
