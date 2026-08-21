import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Search,
  Clock,
  Layers,
  Sparkles,
  Play,
  ArrowRight,
  Globe,
  Code2,
  Cpu,
  CheckCircle2,
  Server,
  ChevronRight
} from "lucide-react";
import { api } from "../../services/api.js";
import { Course } from "../../types/index.js";
import { useAuth } from "../../context/AuthContext.js";
import { useApp } from "../../context/AppContext.js";
import { WebDevHub } from "./WebDevHub.js";

export const CourseCatalog: React.FC = () => {
  const { user } = useAuth();
  const { navigateToCourse, navigateToProblem } = useApp();
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewingHub, setViewingHub] = useState<"web-dev" | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCourses()
      .then((c) => setCourses(c || []))
      .finally(() => setLoading(false));
  }, []);

  if (viewingHub === "web-dev") {
    return <WebDevHub onBack={() => setViewingHub(null)} />;
  }

  const categories = [
    "All",
    "Web Development Hub",
    "DSA",
    "HTML & CSS",
    "JavaScript",
    "React.js",
    "Backend Development",
    "System Design"
  ];

  const handleCategorySelect = (cat: string) => {
    if (cat === "Web Development Hub") {
      setViewingHub("web-dev");
      return;
    }
    setSelectedCategory(cat);
  };

  const filtered = (courses || []).filter((c) => {
    const matchCat =
      selectedCategory === "All" ||
      c.category === selectedCategory ||
      (selectedCategory === "DSA" && c.category === "DSA") ||
      (selectedCategory === "Backend Development" && (c.category === "Backend Development" || c.title.includes("Backend"))) ||
      (selectedCategory === "System Design" && (c.category === "System Design" || c.title.includes("System Design"))) ||
      (selectedCategory === "React.js" && (c.category === "React.js" || c.title.includes("React"))) ||
      (selectedCategory === "JavaScript" && (c.category === "JavaScript" || c.title.includes("JavaScript"))) ||
      (selectedCategory === "HTML & CSS" && (c.category === "HTML & CSS" || c.title.includes("HTML")));

    const matchSearch =
      c.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCat && matchSearch;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-zinc-100 font-sans">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-orange-500">
          <BookOpen className="w-4 h-4" />
          <span>Curated Curriculum</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
          Courses & Learning Tracks
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Production-grade video curricula with integrated YouTube playback, real-time AI Tutor assistance, interactive quizzes, and placement-calibrated coding bridges.
        </p>
      </div>

      {/* Featured Learning Hubs Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Web Development Learning Hub Feature Card */}
        <div
          onClick={() => setViewingHub("web-dev")}
          className="group relative bg-gradient-to-br from-[#18181f] to-[#101014] border border-orange-500/30 hover:border-orange-500 rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 shadow-xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                <Globe className="w-3 h-3" />
                <span>Major Learning Hub</span>
              </span>
              <span className="text-xs font-mono text-zinc-500">5 Tracks</span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase font-mono text-white group-hover:text-orange-400 transition">
                Web Development Learning Hub
              </h2>
              <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                Master HTML & CSS, JavaScript Engine Internals, React.js Architecture, Backend APIs, and Distributed System Design.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-zinc-300">
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-zinc-800">HTML & CSS</span>
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-zinc-800">JavaScript</span>
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-zinc-800">React.js</span>
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-zinc-800">Backend</span>
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-zinc-800">System Design</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-orange-400 flex items-center gap-1">
                <span>EXPLORE ALL 5 TRACKS</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>

        {/* DSA Learning Track Feature Card */}
        <div
          onClick={() => navigateToCourse("course_dsa")}
          className="group relative bg-gradient-to-br from-[#141418] to-[#0c0c0e] border border-zinc-800 hover:border-orange-500/50 rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-300 shadow-xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                <Code2 className="w-3 h-3" />
                <span>Algorithmic Track</span>
              </span>
              <span className="text-xs font-mono text-zinc-500">100 Videos</span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase font-mono text-white group-hover:text-orange-400 transition">
                Data Structures & Algorithms
              </h2>
              <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed">
                Comprehensive DSA masterclass with video playlists, time/space complexity intuition, and 100+ LeetCode coding problem bridges.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-[10px] font-mono text-zinc-300">
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-zinc-800">Big-O Complexity</span>
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-zinc-800">Sliding Window</span>
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-zinc-800">Trees & Graphs</span>
              <span className="bg-black/50 px-2.5 py-1 rounded-md border border-zinc-800">DP</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-orange-400 flex items-center gap-1">
                <span>OPEN DSA TRACK</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono uppercase font-bold tracking-wider transition shrink-0 ${
                selectedCategory === cat
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-[#121215] border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search tracks, stacks, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#121215] border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => {
          let totalCourseLessons = 0;
          let completedInCourse = 0;
          const completedLessonIds = user?.completedLessonIds || [];
          (course.modules || []).forEach((mod) => {
            (mod.lessons || []).forEach((les) => {
              totalCourseLessons++;
              if (completedLessonIds.includes(les.id)) {
                completedInCourse++;
              }
            });
          });

          const progressPercent = totalCourseLessons > 0 ? Math.round((completedInCourse / totalCourseLessons) * 100) : 0;
          const isStarted = progressPercent > 0;

          return (
            <div
              key={course.id}
              onClick={() => navigateToCourse(course.id)}
              className="group flex flex-col justify-between bg-[#121215] border border-zinc-800 hover:border-orange-500/50 rounded-2xl overflow-hidden shadow-sm transition cursor-pointer"
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider border border-zinc-800">
                    {course.category}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                    <span className="bg-black/70 px-2 py-0.5 rounded border border-zinc-800/80">{course.level}</span>
                    <span className="bg-black/70 px-2 py-0.5 rounded border border-zinc-800/80">{course.durationHours} Hours</span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-base text-white group-hover:text-orange-400 transition font-mono">
                    {course.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {course.description}
                  </p>

                  {course.resources && course.resources.length > 0 && (
                    <div className="text-[11px] font-mono text-zinc-400 bg-black/40 p-2 rounded-lg border border-zinc-800 flex items-center gap-1.5">
                      <Play className="w-3 h-3 text-orange-400 shrink-0" />
                      <span className="truncate">{course.resources[0].title}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 pt-1">
                    {(course.tags || []).slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#18181c] border border-zinc-800 text-zinc-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Progress</span>
                  <span className="font-bold text-orange-400">{progressPercent}%</span>
                </div>
                <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <button className="w-full py-2 rounded-lg bg-[#18181c] group-hover:bg-orange-500 text-zinc-300 group-hover:text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition">
                  <span>{isStarted ? "CONTINUE COURSE" : "START COURSE"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
