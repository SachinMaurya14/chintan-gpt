import React, { useState, useEffect, useMemo } from "react";
import { Search, BookOpen, Code2, Building2, X, ArrowRight, CornerDownLeft } from "lucide-react";
import { useApp } from "../context/AppContext.js";
import { api } from "../services/api.js";
import { Course, CodingProblemSummary, CompanyPrep } from "../types/index.js";

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateToProblem, navigateToCourse, navigateToCompany } = useApp();
  const [query, setQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [problems, setProblems] = useState<CodingProblemSummary[]>([]);
  const [companies, setCompanies] = useState<CompanyPrep[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSearchOpen) {
      setLoading(true);
      Promise.all([api.getCourses(), api.getProblems(), api.getCompanies()])
        .then(([c, p, comp]) => {
          setCourses(c || []);
          setProblems(p || []);
          setCompanies(comp || []);
        })
        .finally(() => setLoading(false));
    }
  }, [isSearchOpen]);

  const q = query.toLowerCase().trim();

  const filteredCourses = useMemo(() => {
    if (!q) return courses || [];
    return (courses || []).filter(
      (c) =>
        c.title?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q) ||
        (c.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [courses, q]);

  const filteredProblems = useMemo(() => {
    if (!q) return problems || [];
    return (problems || []).filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        (p.topics || []).some((t) => t.toLowerCase().includes(q)) ||
        (p.companyTags || []).some((c) => c.toLowerCase().includes(q))
    );
  }, [problems, q]);

  const filteredCompanies = useMemo(() => {
    if (!q) return companies || [];
    return (companies || []).filter(
      (comp) => comp.name?.toLowerCase().includes(q) || comp.tier?.toLowerCase().includes(q)
    );
  }, [companies, q]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fadeIn font-mono">
      <div className="w-full max-w-2xl bg-[#0e0e12] rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-zinc-800 bg-[#121215]">
          <Search className="w-4 h-4 text-orange-500 mr-3 shrink-0" />
          <input
            id="input-search-modal"
            type="text"
            placeholder="Search problems (Two Sum), topics (DP), companies (Google, TCS)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-zinc-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {/* Coding Problems */}
          {filteredProblems.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-2">
                <Code2 className="w-3.5 h-3.5" />
                <span>DSA Coding Problems ({filteredProblems.length})</span>
              </div>
              <div className="space-y-1">
                {filteredProblems.slice(0, 5).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigateToProblem(p.id);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#141418] hover:bg-[#1c1c22] border border-zinc-800/60 hover:border-orange-500 transition text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-xs text-white group-hover:text-orange-400 transition">
                        {p.title}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                          p.difficulty === "Easy"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : p.difficulty === "Medium"
                            ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                            : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        }`}
                      >
                        {p.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {(p.companyTags || []).slice(0, 2).map((comp) => (
                          <span key={comp} className="text-[9px] px-1.5 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded">
                            {comp}
                          </span>
                        ))}
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 transition" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Courses & Video Modules ({filteredCourses.length})</span>
              </div>
              <div className="space-y-1">
                {filteredCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      navigateToCourse(c.id);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-[#141418] hover:bg-[#1c1c22] border border-zinc-800/60 hover:border-orange-500 transition text-left group"
                  >
                    <div>
                      <div className="font-bold text-xs text-white group-hover:text-orange-400 transition">
                        {c.title}
                      </div>
                      <div className="text-[10px] text-zinc-500">{c.category} • {c.totalLessons} Lessons</div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-orange-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Companies */}
          {filteredCompanies.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>Company Placement Tracks ({filteredCompanies.length})</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredCompanies.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      navigateToCompany(comp.id);
                      setIsSearchOpen(false);
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-[#141418] hover:bg-[#1c1c22] border border-zinc-800/60 hover:border-orange-500 transition text-left"
                  >
                    <img src={comp.logo} alt={comp.name} className="w-7 h-7 rounded-lg object-cover border border-zinc-800" />
                    <div>
                      <div className="font-bold text-xs text-white">{comp.name}</div>
                      <div className="text-[10px] text-zinc-500">{comp.tier}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredProblems.length === 0 && filteredCourses.length === 0 && filteredCompanies.length === 0 && (
            <div className="text-center py-8 text-zinc-500">
              <p className="text-xs">No results found for "{query}".</p>
              <p className="text-[10px] text-zinc-600 mt-1">Try searching for "Two Sum", "Binary Search", "TCS", or "Google".</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-[#0a0a0d] border-t border-zinc-800 flex justify-between text-[10px] text-zinc-500 uppercase tracking-wider">
          <span>Search Chintan GPT</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};
