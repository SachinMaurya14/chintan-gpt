import React, { useState, useEffect, useMemo } from "react";
import {
  Play,
  CheckCircle2,
  Code2,
  Trophy,
  Flame,
  Zap,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Building2,
  Target,
  Sparkles,
  RefreshCw,
  Clock,
  Award,
  Terminal,
  Activity,
  Layers,
  Check,
  Compass,
  MessageSquare
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.js";
import { useApp } from "../../context/AppContext.js";
import { api } from "../../services/api.js";
import {
  Course,
  CodingProblemSummary,
  CompanyPrep,
  ProblemSubmission,
  MockInterviewSession
} from "../../types/index.js";

export const DashboardHome: React.FC = () => {
  const { user, setIsAuthModalOpen, setAuthModalMode } = useAuth();
  const { navigateToCourse, navigateToProblem, navigateToCompany, setCurrentTab } = useApp();

  const [courses, setCourses] = useState<Course[]>([]);
  const [problems, setProblems] = useState<CodingProblemSummary[]>([]);
  const [companies, setCompanies] = useState<CompanyPrep[]>([]);
  const [submissions, setSubmissions] = useState<ProblemSubmission[]>([]);
  const [interviews, setInterviews] = useState<MockInterviewSession[]>([]);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchDashboardData = () => {
    setLoading(true);
    setLoadError(null);

    Promise.allSettled([
      api.getCourses(),
      api.getProblems(),
      api.getCompanies(),
      api.getSubmissions(),
      api.getRecommendations(),
      api.getInterviews(),
    ])
      .then(([cRes, pRes, compRes, subsRes, recsRes, intvRes]) => {
        if (cRes.status === "fulfilled" && cRes.value) setCourses(cRes.value);
        if (pRes.status === "fulfilled" && pRes.value) setProblems(pRes.value);
        if (compRes.status === "fulfilled" && compRes.value) setCompanies(compRes.value);
        if (subsRes.status === "fulfilled" && subsRes.value) setSubmissions(subsRes.value);
        if (intvRes.status === "fulfilled" && intvRes.value) setInterviews(intvRes.value);
        if (recsRes.status === "fulfilled" && recsRes.value) {
          setRecommendations(recsRes.value);
        } else {
          // Default fallback recommendations if AI service is pending
          setRecommendations([
            {
              type: "problem",
              title: "Solve Two Sum",
              reason: "Essential array hash-map problem frequently asked in placement drives.",
              priority: "High",
              id: "prob_two_sum"
            },
            {
              type: "course",
              title: "Module 1: Web Foundation & JavaScript Event Loop",
              reason: "Core foundation for frontend engineering and full-stack interviews.",
              priority: "High",
              id: "course_fullstack_webdev"
            }
          ]);
        }
      })
      .catch((err) => {
        console.warn("Dashboard data partial load notice:", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Authenticated User Isolation & Guest Support
  const effectiveUser = useMemo(() => {
    return (
      user || {
        id: "guest",
        name: "Student",
        email: "",
        role: "student" as const,
        streak: 0,
        points: 0,
        level: 1,
        completedLessonIds: [],
        solvedProblemIds: [],
        enrolledCourseIds: [],
        weakTopics: [],
        targetCompanies: [],
      }
    );
  }, [user]);

  // Real, authentic user statistics
  const solvedProblemIds = effectiveUser.solvedProblemIds || [];
  const completedLessonIds = effectiveUser.completedLessonIds || [];
  const enrolledCourseIds = effectiveUser.enrolledCourseIds || [];
  const weakTopics = effectiveUser.weakTopics || [];
  const targetCompanies = effectiveUser.targetCompanies || [];

  const {
    totalSolved,
    easyCount,
    mediumCount,
    hardCount,
    totalEasy,
    totalMed,
    totalHard
  } = useMemo(() => {
    const solvedSet = new Set(solvedProblemIds);
    let easy = 0, med = 0, hard = 0;
    let tEasy = 0, tMed = 0, tHard = 0;

    for (const p of problems || []) {
      if (p.difficulty === "Easy") {
        tEasy++;
        if (solvedSet.has(p.id)) easy++;
      } else if (p.difficulty === "Medium") {
        tMed++;
        if (solvedSet.has(p.id)) med++;
      } else if (p.difficulty === "Hard") {
        tHard++;
        if (solvedSet.has(p.id)) hard++;
      }
    }

    return {
      totalSolved: solvedProblemIds.length,
      easyCount: easy,
      mediumCount: med,
      hardCount: hard,
      totalEasy: tEasy || 1,
      totalMed: tMed || 1,
      totalHard: tHard || 1
    };
  }, [problems, solvedProblemIds]);

  // Catalog and user level statistics
  const totalCatalogLessons = useMemo(() => {
    return (courses || []).reduce((acc, c) => {
      const lessons = c.modules?.reduce((mAcc, m) => mAcc + (m.lessons?.length || 0), 0) || c.totalLessons || 0;
      return acc + lessons;
    }, 0);
  }, [courses]);

  const overallCourseProgressPct = totalCatalogLessons > 0
    ? Math.min(100, Math.round((completedLessonIds.length / totalCatalogLessons) * 100))
    : 0;

  const placementReadinessText = useMemo(() => {
    if (totalSolved === 0 && interviews.length === 0 && completedLessonIds.length === 0) {
      return "Not Evaluated";
    }
    const score = Math.min(100, Math.round(
      Math.min(50, (totalSolved / 25) * 50) +
      Math.min(25, (completedLessonIds.length / 15) * 25) +
      Math.min(25, (interviews.length / 2) * 25)
    ));
    return `${score}% Readiness`;
  }, [totalSolved, interviews.length, completedLessonIds.length]);

  const userSubmissions = useMemo(() => {
    return (submissions || []).filter(s => !s.userId || s.userId === effectiveUser.id);
  }, [submissions, effectiveUser.id]);

  const userInterviews = useMemo(() => {
    return (interviews || []).filter(i => !i.userId || i.userId === effectiveUser.id);
  }, [interviews, effectiveUser.id]);

  const recentActivities = useMemo(() => {
    const list: Array<{ id: string; type: "problem" | "lesson" | "interview"; title: string; subtitle: string; time: string; status?: string }> = [];

    for (const sub of userSubmissions.slice(0, 5)) {
      list.push({
        id: sub.id,
        type: "problem",
        title: sub.problemTitle || "DSA Problem",
        subtitle: `Language: ${sub.language} • Status: ${sub.status}`,
        time: sub.submittedAt,
        status: sub.status,
      });
    }

    for (const intv of userInterviews.slice(0, 3)) {
      list.push({
        id: intv.id,
        type: "interview",
        title: `${intv.role || "Technical"} Mock Interview`,
        subtitle: intv.company ? `Target: ${intv.company}` : "General Engineering",
        time: intv.createdAt || new Date().toISOString(),
        status: intv.status,
      });
    }

    return list.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 5);
  }, [userSubmissions, userInterviews]);

  // Determine active course to resume (priority to last watched, then enrolled, then first available)
  const {
    activeCourse,
    nextLesson,
    targetVideoId,
    activeCourseProgress
  } = useMemo(() => {
    const lastWatchedEntries = Object.entries(user?.lastWatchedVideos || {});
    const lastWatchedEntry = lastWatchedEntries.length > 0 ? lastWatchedEntries[lastWatchedEntries.length - 1] : null;
    const lastWatchedCourseId = lastWatchedEntry ? lastWatchedEntry[0] : null;
    const lastWatchedVideoData = lastWatchedEntry ? (lastWatchedEntry[1] as { videoId: string; videoTitle?: string; playlistId?: string }) : null;

    const course = (courses || []).find(c => c.id === lastWatchedCourseId) || (courses || []).find(c => enrolledCourseIds.includes(c.id)) || courses?.[0];
    
    let lesson = course?.modules?.[0]?.lessons?.[0];

    if (course) {
      if (lastWatchedVideoData && course.id === lastWatchedCourseId) {
        const matched = course.modules?.flatMap(m => m.lessons || []).find(l => l.id.includes(lastWatchedVideoData.videoId) || l.youtubeUrl.includes(lastWatchedVideoData.videoId));
        if (matched) {
          lesson = matched;
        } else if (lastWatchedVideoData.videoTitle) {
          lesson = {
            id: `les_${course.id}_${lastWatchedVideoData.videoId}`,
            moduleId: "mod_playlist",
            courseId: course.id,
            title: lastWatchedVideoData.videoTitle,
            description: "Continue where you left off in your playlist curriculum.",
            youtubeUrl: `https://www.youtube.com/watch?v=${lastWatchedVideoData.videoId}`,
            durationMinutes: 30,
            topic: course.category,
            difficulty: "Beginner",
            order: 1,
            notesMarkdown: "",
            keyTakeaways: []
          };
        }
      } else {
        const completedSet = new Set(completedLessonIds);
        for (const mod of course.modules || []) {
          for (const les of mod.lessons || []) {
            if (!completedSet.has(les.id)) {
              lesson = les;
              break;
            }
          }
          if (lesson && !completedSet.has(lesson.id)) break;
        }
      }
    }

    const totalLessonsInActiveCourse = course?.totalLessons || (course?.modules || []).reduce((acc, m) => acc + (m.lessons?.length || 0), 0) || 1;
    const completedSet = new Set(completedLessonIds);
    const completedLessonsInActiveCourse = (course?.modules || []).reduce(
      (acc, m) => acc + (m.lessons?.filter(l => completedSet.has(l.id))?.length || 0),
      0
    );
    const progress = Math.min(100, Math.round((completedLessonsInActiveCourse / totalLessonsInActiveCourse) * 100));

    return {
      activeCourse: course,
      nextLesson: lesson,
      targetVideoId: lastWatchedVideoData?.videoId,
      activeCourseProgress: progress
    };
  }, [courses, user?.lastWatchedVideos, enrolledCourseIds, completedLessonIds]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-zinc-100">
        {/* Skeleton Hero */}
        <div className="rounded-3xl border border-zinc-800/80 p-8 sm:p-12 skeleton-shimmer min-h-[260px] rounded-3xl" />
        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl border border-zinc-800/80 p-6 skeleton-shimmer min-h-[220px]" />
          <div className="rounded-2xl border border-zinc-800/80 p-6 skeleton-shimmer min-h-[220px]" />
        </div>
        {/* Skeleton Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-zinc-800/80 p-6 skeleton-shimmer min-h-[180px]" />
          <div className="md:col-span-2 rounded-2xl border border-zinc-800/80 p-6 skeleton-shimmer min-h-[180px]" />
        </div>
      </div>
    );
  }

  const isNewStudent = totalSolved === 0 && completedLessonIds.length === 0;

  return (
    <div id="student-dashboard-home" className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-10 animate-fadeIn text-zinc-100">
      {/* Guest Mode Notice */}
      {!user && (
        <div className="p-4 rounded-2xl bg-[#121218] border border-orange-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            <span className="text-xs text-zinc-300 font-mono">
              Exploring Chintan GPT in Guest Mode. All courses, DSA practice, and Chintan AI Tutor are active.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAuthModalMode("login");
                setIsAuthModalOpen(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase transition"
            >
              Sign In / Register
            </button>
          </div>
        </div>
      )}

      {/* 1. PERSONALIZED STUDENT HERO SECTION */}
      <section className="relative rounded-3xl bg-gradient-to-b from-[#111118] to-[#0a0a0e] border border-zinc-800/90 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
        {/* Subtle geometric grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f28_1px,transparent_1px),linear-gradient(to_bottom,#1f1f28_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Micro-Tag */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold tracking-widest text-amber-500 uppercase px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
                STUDENT DASHBOARD • LEVEL {effectiveUser.level || 1}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>

            {/* Personalized Greeting */}
            <h1 className="text-3xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white uppercase font-mono leading-[1.05] select-none">
              WELCOME BACK,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
                {effectiveUser.name.toUpperCase()}
              </span>
            </h1>

            {/* Authentic Status Summary */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-2xl font-normal leading-relaxed">
              {isNewStudent
                ? "Your preparation journey begins today. Choose a target track below, solve your first LeetCode problem, or watch an architecture lesson to kickstart your streak."
                : `You have completed ${completedLessonIds.length} lessons and solved ${totalSolved} algorithmic problems. Keep the momentum going!`}
            </p>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                id="btn-home-start-dsa"
                onClick={() => setCurrentTab("coding")}
                className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold font-mono uppercase tracking-widest transition-all btn-press-fx shadow-lg shadow-orange-500/25 flex items-center gap-2"
              >
                <span>SOLVE DSA PROBLEMS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-home-explore-courses"
                onClick={() => setCurrentTab("courses")}
                className="px-6 py-3 rounded-xl bg-[#121218] hover:bg-[#181822] text-zinc-300 hover:text-white text-xs font-bold font-mono uppercase tracking-widest border border-zinc-800 hover:border-zinc-700 transition-all btn-press-fx shadow-sm"
              >
                BROWSE COURSES
              </button>

              <button
                id="btn-home-company-prep"
                onClick={() => setCurrentTab("company-prep")}
                className="px-6 py-3 rounded-xl bg-[#121218] hover:bg-[#181822] text-zinc-300 hover:text-white text-xs font-bold font-mono uppercase tracking-widest border border-zinc-800 hover:border-zinc-700 transition-all btn-press-fx shadow-sm"
              >
                COMPANY TRACKS
              </button>
            </div>
          </div>

          {/* Right Real Dynamic Activity Metric Card */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="w-full max-w-xs p-5 rounded-2xl bg-[#0e0e14]/90 border border-zinc-800/90 space-y-4 shadow-xl card-hover-fx backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-zinc-400 uppercase">Current Streak</span>
                <span className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-subtleFloat" />
                  {effectiveUser.streak || 0} DAYS
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#14141c] border border-zinc-800/90">
                  <div className="text-2xl font-black font-mono text-cyan-400">{totalSolved}</div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Solved Probs</div>
                </div>
                <div className="p-3 rounded-xl bg-[#14141c] border border-zinc-800/90">
                  <div className="text-2xl font-black font-mono text-amber-400">{effectiveUser.xp || 0}</div>
                  <div className="text-[10px] font-mono uppercase text-zinc-400">Total XP</div>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span>Level {effectiveUser.level || 1} Progress</span>
                  <span className="text-zinc-300 font-semibold">{((effectiveUser.xp || 0) % 500)} / 500 XP</span>
                </div>
                <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-400 h-1.5 rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.min(100, (((effectiveUser.xp || 0) % 500) / 500) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE SYSTEM METRICS (Guarantees zero-state visibility with authentic data) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-orange-400" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
              Preparation Progress Overview
            </h2>
          </div>
          <span className="text-[11px] font-mono text-zinc-500">
            Real-time verified candidate progress
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
          {/* Progress: Problems Solved */}
          <div className="p-4 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 space-y-1.5 card-hover-fx">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span className="uppercase text-[10px] font-bold">Progress</span>
              <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <div className="text-lg sm:text-xl font-black text-white">
              {totalSolved}
            </div>
            <div className="text-[10px] text-zinc-400 truncate">
              {totalSolved === 1 ? "1 Problem Solved" : `${totalSolved} Problems Solved`}
            </div>
          </div>

          {/* Learning: Topics Completed */}
          <div className="p-4 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 space-y-1.5 card-hover-fx">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span className="uppercase text-[10px] font-bold">Learning</span>
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-lg sm:text-xl font-black text-white">
              {completedLessonIds.length}
            </div>
            <div className="text-[10px] text-zinc-400 truncate">
              {completedLessonIds.length === 1 ? "1 Topic Completed" : `${completedLessonIds.length} Topics Completed`}
            </div>
          </div>

          {/* Interviews: Completed */}
          <div className="p-4 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 space-y-1.5 card-hover-fx">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span className="uppercase text-[10px] font-bold">Interviews</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-lg sm:text-xl font-black text-white">
              {interviews.length}
            </div>
            <div className="text-[10px] text-zinc-400 truncate">
              {interviews.length === 1 ? "1 Completed" : `${interviews.length} Completed`}
            </div>
          </div>

          {/* Courses: % Completed */}
          <div className="p-4 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 space-y-1.5 card-hover-fx">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span className="uppercase text-[10px] font-bold">Courses</span>
              <Layers className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-lg sm:text-xl font-black text-white">
              {overallCourseProgressPct}%
            </div>
            <div className="text-[10px] text-zinc-400 truncate">
              {overallCourseProgressPct}% Completed
            </div>
          </div>

          {/* Placement Readiness */}
          <div className="p-4 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 space-y-1.5 card-hover-fx">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span className="uppercase text-[10px] font-bold">Readiness</span>
              <Target className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-base sm:text-lg font-black text-white truncate">
              {placementReadinessText}
            </div>
            <div className="text-[10px] text-zinc-400 truncate">
              Placement Benchmark
            </div>
          </div>

          {/* Target Goals */}
          <div className="p-4 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 space-y-1.5 card-hover-fx">
            <div className="flex items-center justify-between text-zinc-400 text-xs">
              <span className="uppercase text-[10px] font-bold">Target Tracks</span>
              <Building2 className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <div className="text-lg sm:text-xl font-black text-white">
              {targetCompanies.length}
            </div>
            <div className="text-[10px] text-zinc-400 truncate">
              {targetCompanies.length > 0 ? `${targetCompanies.length} Selected` : "Select Targets"}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Next Actions Row */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0e0e14] border border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-xs font-mono font-bold text-zinc-300 uppercase">
            Recommended Next Actions:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="btn-quick-start-dsa"
            onClick={() => setCurrentTab("coding")}
            className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Start DSA</span>
          </button>
          <button
            id="btn-quick-explore-courses"
            onClick={() => setCurrentTab("courses")}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold uppercase transition border border-zinc-700 flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Explore Courses</span>
          </button>
          <button
            id="btn-quick-mock-interview"
            onClick={() => setCurrentTab("mock-interview")}
            className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-bold uppercase transition border border-zinc-700 flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice Interview</span>
          </button>
          <button
            id="btn-quick-tutor"
            onClick={() => setCurrentTab("tutor")}
            className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-xs font-mono font-bold uppercase transition border border-purple-500/30 flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
            <span>Ask Chintan AI Tutor</span>
          </button>
        </div>
      </div>

      {/* 2. RESUME LEARNING OR GET STARTED */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Active Card */}
        <div className="lg:col-span-2 p-6 sm:p-7 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 shadow-sm flex flex-col justify-between space-y-6 card-hover-fx">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
                <Play className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                <span>{completedLessonIds.length > 0 ? "RESUME LEARNING" : "GET STARTED"}</span>
              </span>
              {activeCourse && (
                <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-semibold">
                  {activeCourse.category}
                </span>
              )}
            </div>

            {activeCourse && nextLesson ? (
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <img
                  src={activeCourse.thumbnail}
                  alt={activeCourse.title}
                  className="w-full sm:w-44 h-28 rounded-xl object-cover border border-zinc-800 shadow-md"
                />
                <div className="space-y-2 flex-1">
                  <div className="text-xs font-mono text-zinc-500 uppercase">{activeCourse.title}</div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {nextLesson.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{nextLesson.description}</p>
                  <div className="flex items-center gap-3 text-xs text-zinc-400 pt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{nextLesson.durationMinutes} mins</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[10px] font-bold">
                      {nextLesson.topic}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
            <div className="text-xs font-mono text-zinc-400">
              Course Progress: <strong className="text-amber-400 font-bold">{activeCourseProgress}%</strong>
            </div>
            <button
              id="btn-resume-lesson"
              onClick={() => activeCourse && navigateToCourse(activeCourse.id, targetVideoId || nextLesson?.id)}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all btn-press-fx shadow-md shadow-orange-500/20 flex items-center gap-1.5"
            >
              <span>{completedLessonIds.length > 0 ? "Resume Lesson" : "Start First Lesson"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Real Dynamic Practice Statistics */}
        <div className="p-6 sm:p-7 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 shadow-sm space-y-5 card-hover-fx">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider font-mono text-zinc-300">Your Activity</h3>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase font-semibold">
              Real-Time
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#121218] border border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono text-zinc-300">Completed Lessons</span>
              </div>
              <span className="font-bold font-mono text-white text-sm">{completedLessonIds.length}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#121218] border border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono text-zinc-300">Quizzes Passed</span>
              </div>
              <span className="font-bold font-mono text-white text-sm">{user.quizzesCompleted || 0}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#121218] border border-zinc-800/80">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-zinc-300">Learning Time</span>
              </div>
              <span className="font-bold font-mono text-white text-sm">{user.learningMinutes || 0} mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DSA PROBLEM SOLVING STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LeetCode DSA Solve Ratio */}
        <div className="p-6 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 shadow-sm space-y-4 card-hover-fx">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider font-mono text-zinc-300 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span>DSA Problem Stats</span>
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">Solved: {totalSolved} / {problems.length}</span>
          </div>

          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-xl bg-[#121218] border border-emerald-500/20">
              <div className="text-lg font-black font-mono text-emerald-400">{easyCount}</div>
              <div className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Easy</div>
              <div className="text-[9px] font-mono text-zinc-500">/{totalEasy}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#121218] border border-amber-500/20">
              <div className="text-lg font-black font-mono text-amber-400">{mediumCount}</div>
              <div className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Med</div>
              <div className="text-[9px] font-mono text-zinc-500">/{totalMed}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#121218] border border-rose-500/20">
              <div className="text-lg font-black font-mono text-rose-400">{hardCount}</div>
              <div className="text-[10px] font-bold font-mono text-zinc-400 uppercase">Hard</div>
              <div className="text-[9px] font-mono text-zinc-500">/{totalHard}</div>
            </div>
          </div>

          <button
            id="btn-dashboard-explore-bank"
            onClick={() => setCurrentTab("coding")}
            className="w-full py-2.5 rounded-xl border border-zinc-800 text-xs font-mono uppercase tracking-wider font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800/80 transition-all btn-press-fx text-center"
          >
            Explore 100+ Problem Bank
          </button>
        </div>

        {/* Personalized Learning Recommendations */}
        <div className="md:col-span-2 p-6 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 shadow-sm space-y-4 card-hover-fx">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-purple-400" />
              <h3 className="font-bold text-xs uppercase tracking-wider font-mono text-zinc-300">
                Personalized Study Suggestions
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold uppercase">
              ADAPTIVE AI
            </span>
          </div>

          <div className="space-y-2.5">
            {recommendations.slice(0, 3).map((rec: any, idx: number) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#121218] border border-zinc-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors hover:border-zinc-700"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-white">{rec.title}</span>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400">
                      {rec.priority || "Recommended"}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{rec.reason}</p>
                </div>
                <button
                  onClick={() => {
                    if (rec.type === "problem" && rec.id) {
                      navigateToProblem(rec.id);
                    } else if (rec.type === "course" && rec.id) {
                      navigateToCourse(rec.id);
                    } else {
                      setCurrentTab("coding");
                    }
                  }}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono uppercase font-bold transition-all btn-press-fx shadow-sm"
                >
                  Start Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. TARGET COMPANY PLACEMENT TRACKS */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#121215] border border-zinc-800/80 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider font-mono text-zinc-300">
              {targetCompanies.length > 0 ? "My Target Company Tracks" : "Target Placement Tracks"}
            </h3>
            <p className="text-xs text-zinc-400">
              {targetCompanies.length > 0
                ? "Customized placement syllabi, aptitude drills, and technical interview questions"
                : "Select the dream companies you are targeting for upcoming placement drives"}
            </p>
          </div>
          <button
            onClick={() => setCurrentTab("company-prep")}
            className="text-xs font-mono uppercase tracking-wider font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
          >
            <span>{targetCompanies.length > 0 ? "Manage Targets" : "Select Targets"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {targetCompanies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(companies || [])
              .filter((comp) => targetCompanies.includes(comp.id))
              .map((comp) => (
                <div
                  key={comp.id}
                  onClick={() => navigateToCompany(comp.id)}
                  className="p-4 rounded-xl bg-[#0e0e12] border border-zinc-800 hover:border-orange-500/50 transition cursor-pointer group flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <img src={comp.logo} alt={comp.name} className="w-9 h-9 rounded-lg object-cover border border-zinc-800" />
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-orange-400 transition font-mono">
                        {comp.name}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                        {comp.tier}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] font-mono text-zinc-500">{comp.categories?.length || 0} Detailed Syllabi</div>
                    <div className="text-xs text-zinc-400 truncate font-mono">
                      {comp.categories?.map((c) => c.name).slice(0, 2).join(", ") || "Aptitude & Coding"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono font-bold text-orange-400 pt-2 border-t border-zinc-800">
                    <span>Open Track</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-[#0e0e12] border border-dashed border-zinc-800 text-center space-y-3">
            <Building2 className="w-8 h-8 text-zinc-600 mx-auto" />
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="text-sm font-bold text-zinc-200 font-mono">No Target Companies Selected</h4>
              <p className="text-xs text-zinc-500">
                Choose TCS, Google, Amazon, Infosys, or other top tech companies to customize your placement preparation roadmap.
              </p>
            </div>
            <button
              onClick={() => setCurrentTab("company-prep")}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition inline-flex items-center gap-1.5 shadow-md shadow-orange-500/20"
            >
              <span>Explore & Select Companies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
