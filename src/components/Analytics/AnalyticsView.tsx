import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart3,
  Flame,
  Zap,
  TrendingUp,
  Calendar,
  Layers,
  Code2,
  BookOpen,
  Target
} from "lucide-react";
import { api } from "../../services/api.js";
import {
  PlatformAnalytics,
  ProblemSubmission,
  CodingProblemSummary,
  Course,
  QuizAttempt,
  MockInterviewSession
} from "../../types/index.js";
import { useAuth } from "../../context/AuthContext.js";

export const AnalyticsView: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<PlatformAnalytics | null>(null);
  const [submissions, setSubmissions] = useState<ProblemSubmission[]>([]);
  const [problems, setProblems] = useState<CodingProblemSummary[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [mockInterviews, setMockInterviews] = useState<MockInterviewSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getAnalytics().catch(() => null),
      api.getSubmissions().catch(() => []),
      api.getProblems().catch(() => []),
      api.getCourses().catch(() => []),
      api.getQuizHistory().catch(() => []),
      api.getInterviews().catch(() => []),
    ])
      .then(([a, subs, probs, crs, quizzes, ints]) => {
        setAnalytics(a || null);
        setSubmissions(subs || []);
        setProblems(probs || []);
        setCourses(crs || []);
        setQuizAttempts(quizzes || []);
        setMockInterviews(ints || []);
      })
      .catch((err) => console.error("Error loading analytics data:", err))
      .finally(() => setLoading(false));
  }, []);

  // Compute unified user metrics from the single source of truth
  const metrics = useMemo(() => {
    if (!user) return null;

    // 1. Solved Problems (Unified set between user profile & accepted submissions)
    const acceptedSubmissionProblemIds = submissions
      .filter((s) => s.status === "Accepted")
      .map((s) => s.problemId);
    const solvedSet = new Set([
      ...(user.solvedProblemIds || []),
      ...acceptedSubmissionProblemIds,
    ]);
    const solvedCount = solvedSet.size;

    // 2. Submissions Breakdown
    const totalSubmissionsCount = submissions.length;
    const acceptedSubmissionsCount = submissions.filter((s) => s.status === "Accepted").length;
    const failedSubmissionsCount = submissions.filter((s) => s.status !== "Accepted").length;
    const attemptedProblemIds = Array.from(new Set(submissions.map((s) => s.problemId)));
    const inProgressProblemIds = attemptedProblemIds.filter((id) => !solvedSet.has(id));
    const acceptanceRate =
      totalSubmissionsCount > 0
        ? +((acceptedSubmissionsCount / totalSubmissionsCount) * 100).toFixed(1)
        : 0;

    // 3. Lessons & Courses
    const completedLessonIds = user.completedLessonIds || [];
    const totalLessons = courses.reduce(
      (acc, c) =>
        acc +
        (c.modules?.reduce((mAcc, m) => mAcc + (m.lessons?.length || 0), 0) ||
          c.totalLessons ||
          0),
      0
    );
    const estimatedHoursWatched = +(
      ((user.learningMinutes || 0) + completedLessonIds.length * 25) /
      60
    ).toFixed(1);

    // 4. Quizzes & Mock Interviews
    const quizzesCount = quizAttempts.length || user.quizzesCompleted || 0;
    const passedQuizzesCount = quizAttempts.filter(
      (q) => q.scorePercentage >= 60
    ).length;
    const avgQuizScore =
      quizAttempts.length > 0
        ? Math.round(
            quizAttempts.reduce((acc, q) => acc + q.scorePercentage, 0) /
              quizAttempts.length
          )
        : 0;

    const totalInterviewsCount = mockInterviews.length;
    const completedInterviewsCount = mockInterviews.filter(
      (m) => m.status === "completed"
    ).length;
    const inProgressInterviewsCount = mockInterviews.filter(
      (m) => m.status === "in_progress"
    ).length;
    const completedInterviews = mockInterviews.filter((m) => m.status === "completed");
    const avgInterviewScore =
      completedInterviews.length > 0
        ? Math.round(
            completedInterviews.reduce(
              (acc, m) => acc + (m.feedback?.overallScore || 70),
              0
            ) / completedInterviews.length
          )
        : 0;

    // 5. Placement Readiness (Deterministic weighted formula)
    const dsaWeight = (Math.min(solvedCount, 25) / 25) * 40;
    const courseWeight = (Math.min(completedLessonIds.length, 15) / 15) * 25;
    const quizWeight = quizzesCount > 0 ? (avgQuizScore / 100) * 15 : 0;
    const interviewWeight = (Math.min(completedInterviewsCount, 2) / 2) * 20;
    const placementReadinessScore = Math.min(
      100,
      Math.round(dsaWeight + courseWeight + quizWeight + interviewWeight)
    );

    // 6. Real 7-Day Heatmap from authentic activity
    const today = new Date();
    const currentDayOfWeek = (today.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek);

    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
      (dayName, idx) => {
        const dayDate = new Date(startOfWeek);
        dayDate.setDate(startOfWeek.getDate() + idx);
        const dateString = dayDate.toISOString().split("T")[0];
        const isFuture = idx > currentDayOfWeek;

        // Check if user has streak history on this date
        const historyEntry = (user.streakHistory || []).find(
          (h) => h.date === dateString
        );
        const hasQualifyingDate = user.lastQualifyingDate === dateString;
        const hasSubmissionsOnDate = submissions.some((s) =>
          s.submittedAt?.startsWith(dateString)
        );

        const isActive =
          !isFuture &&
          (Boolean(historyEntry) ||
            hasQualifyingDate ||
            hasSubmissionsOnDate ||
            (user.streak > 0 && idx === currentDayOfWeek));

        const minutes = isActive
          ? Math.max(25, (historyEntry?.count || 1) * 30)
          : 0;

        return {
          day: dayName,
          date: dateString,
          isActive,
          isFuture,
          minutes,
        };
      }
    );

    // 7. Topic Mastery Calculations (Calculated from user's actual activity)
    const topicCategories = [
      "Arrays & Hashing",
      "Two Pointers",
      "Sliding Window",
      "Binary Search",
      "Trees & BST",
      "Graphs",
      "Dynamic Programming",
    ];

    const userTopicMastery = topicCategories.map((topicName) => {
      const topicProblems = problems.filter(
        (p) =>
          p.category === topicName ||
          p.topics?.some((t) => t.toLowerCase() === topicName.toLowerCase())
      );
      const totalTopicProblems = Math.max(1, topicProblems.length);
      const topicProbIds = new Set(topicProblems.map((p) => p.id));

      const topicSolvedCount = Array.from(solvedSet).filter((id) =>
        topicProbIds.has(id)
      ).length;

      const topicSubs = submissions.filter((s) => topicProbIds.has(s.problemId));
      const topicAcceptedSubs = topicSubs.filter((s) => s.status === "Accepted").length;

      const userPassRate =
        topicSubs.length > 0
          ? Math.round((topicAcceptedSubs / topicSubs.length) * 100)
          : 0;

      const masteryPercent = Math.min(
        100,
        Math.round((topicSolvedCount / totalTopicProblems) * 100)
      );

      const hasActivity = topicSolvedCount > 0 || topicSubs.length > 0;

      return {
        topic: topicName,
        totalProblems: totalTopicProblems,
        solvedCount: topicSolvedCount,
        submissionsCount: topicSubs.length,
        userPassRate,
        masteryPercent,
        hasActivity,
      };
    });

    // 8. Company Placement Practice (From real solved problems & mock interviews)
    const companyCountMap = new Map<string, { solved: number; mocks: number }>();
    for (const probId of solvedSet) {
      const prob = problems.find((p) => p.id === probId);
      if (prob?.companyTags) {
        for (const comp of prob.companyTags) {
          const compName = comp.charAt(0).toUpperCase() + comp.slice(1);
          const curr = companyCountMap.get(compName) || { solved: 0, mocks: 0 };
          curr.solved++;
          companyCountMap.set(compName, curr);
        }
      }
    }
    for (const interview of mockInterviews) {
      if (interview.company) {
        const compName =
          interview.company.charAt(0).toUpperCase() + interview.company.slice(1);
        const curr = companyCountMap.get(compName) || { solved: 0, mocks: 0 };
        curr.mocks++;
        companyCountMap.set(compName, curr);
      }
    }

    const defaultTrackNames = ["Google", "Amazon", "Microsoft", "TCS", "Infosys"];
    const userCompanyTracks = defaultTrackNames.map((name) => {
      const stats = companyCountMap.get(name) || { solved: 0, mocks: 0 };
      return {
        name,
        solved: stats.solved,
        mocks: stats.mocks,
        totalActivity: stats.solved + stats.mocks,
        isTarget: (user.targetCompanies || []).some(
          (tc) => tc.toLowerCase() === name.toLowerCase()
        ),
      };
    });

    const hasAnyCompanyPractice = userCompanyTracks.some((c) => c.totalActivity > 0);

    return {
      solvedCount,
      totalSubmissionsCount,
      acceptedSubmissionsCount,
      failedSubmissionsCount,
      attemptedCount: attemptedProblemIds.length,
      inProgressCount: inProgressProblemIds.length,
      acceptanceRate,
      completedLessonsCount: completedLessonIds.length,
      totalLessons,
      estimatedHoursWatched,
      streak: user.streak || 0,
      longestStreak: user.longestStreak || user.streak || 0,
      xp: user.xp || 0,
      level: user.level || 1,
      quizzesCount,
      passedQuizzesCount,
      avgQuizScore,
      totalInterviewsCount,
      completedInterviewsCount,
      inProgressInterviewsCount,
      avgInterviewScore,
      placementReadinessScore,
      weekDays,
      userTopicMastery,
      userCompanyTracks,
      hasAnyCompanyPractice,
      hasRealActivity:
        solvedCount > 0 ||
        totalSubmissionsCount > 0 ||
        completedLessonIds.length > 0 ||
        quizzesCount > 0 ||
        totalInterviewsCount > 0,
    };
  }, [user, submissions, problems, courses, quizAttempts, mockInterviews]);

  if (loading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-zinc-100 font-sans">
        <div className="space-y-2">
          <div className="h-4 w-36 skeleton-shimmer rounded-md" />
          <div className="h-9 w-72 skeleton-shimmer rounded-xl" />
          <div className="h-4 w-96 skeleton-shimmer rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 skeleton-shimmer rounded-2xl border border-zinc-800/80" />
          ))}
        </div>
        <div className="h-44 skeleton-shimmer rounded-3xl border border-zinc-800/80" />
      </div>
    );
  }

  if (!user || !metrics) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-zinc-100 font-sans">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-amber-400">
          <BarChart3 className="w-4 h-4" />
          <span>CANDIDATE INTELLIGENCE</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
          Performance & Analytics
        </h1>
        <p className="text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Comprehensive telemetry of runtime executions, DSA completion percentiles, topic radar, and streak consistency.
        </p>
      </div>

      {/* Primary Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 space-y-2 card-hover-fx">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="uppercase">DSA Solved</span>
            <Code2 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {metrics.solvedCount}{" "}
            <span className="text-xs font-normal text-zinc-500 font-sans">
              / {problems.length || 10} problems
            </span>
          </div>
          <div className="text-[11px] text-cyan-400 font-medium flex items-center justify-between">
            <span>
              {metrics.solvedCount > 0
                ? `${metrics.attemptedCount} attempted (${metrics.inProgressCount} in-progress)`
                : "0 attempted • Start your first problem"}
            </span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 space-y-2 card-hover-fx">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="uppercase">Video Lessons</span>
            <BookOpen className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {metrics.completedLessonsCount}{" "}
            <span className="text-xs font-normal text-zinc-500 font-sans">
              lessons
            </span>
          </div>
          <div className="text-[11px] text-blue-400 font-medium">
            {metrics.estimatedHoursWatched} total hours watched
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 space-y-2 card-hover-fx">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="uppercase">Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">
            {metrics.streak}{" "}
            <span className="text-xs font-normal text-zinc-500 font-sans">
              days active
            </span>
          </div>
          <div className="text-[11px] text-zinc-400">
            {metrics.streak > 0
              ? `Best: ${metrics.longestStreak} days active`
              : "Solve a problem today to start streak"}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d0d12] border border-zinc-800/90 space-y-2 card-hover-fx">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span className="uppercase">Placement Readiness</span>
            <Zap className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white">
            {metrics.placementReadinessScore}%{" "}
            <span className="text-xs font-normal text-zinc-500 font-sans">
              (Lvl {metrics.level})
            </span>
          </div>
          <div className="text-[11px] text-purple-300 font-medium">
            {metrics.xp} XP • {500 - (metrics.xp % 500)} XP to next level
          </div>
        </div>
      </div>

      {/* Real Submissions & Activity Breakdown */}
      <div className="p-6 rounded-3xl bg-[#0d0d12] border border-zinc-800/90 space-y-4 font-mono card-hover-fx">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-400" />
            <span>DSA & Assessment Execution Telemetry</span>
          </h3>
          <span className="text-[11px] text-zinc-500">Source: Verified Candidate Activity</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-[#121218] border border-zinc-800/80">
            <div className="text-lg font-black text-white">{metrics.totalSubmissionsCount}</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-0.5">Total Submissions</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#121218] border border-emerald-500/20">
            <div className="text-lg font-black text-emerald-400">{metrics.acceptedSubmissionsCount}</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-0.5">Accepted (Passed)</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#121218] border border-rose-500/20">
            <div className="text-lg font-black text-rose-400">{metrics.failedSubmissionsCount}</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-0.5">Failed / Errors</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#121218] border border-amber-500/20">
            <div className="text-lg font-black text-amber-400">{metrics.inProgressCount}</div>
            <div className="text-[10px] text-zinc-400 uppercase mt-0.5">In-Progress</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#121218] border border-zinc-800/80">
            <div className="text-lg font-black text-orange-400">
              {metrics.quizzesCount}{" "}
              <span className="text-xs font-normal text-zinc-500 font-sans">
                ({metrics.passedQuizzesCount} passed)
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 uppercase mt-0.5">Quizzes Taken</div>
          </div>
          <div className="p-3.5 rounded-xl bg-[#121218] border border-cyan-500/20">
            <div className="text-lg font-black text-cyan-400">
              {metrics.totalInterviewsCount}{" "}
              <span className="text-xs font-normal text-zinc-500 font-sans">
                ({metrics.completedInterviewsCount} done)
              </span>
            </div>
            <div className="text-[10px] text-zinc-400 uppercase mt-0.5">Mock Interviews</div>
          </div>
        </div>
      </div>

      {/* 7-Day Dynamic Streak & Heatmap */}
      <div className="p-6 rounded-3xl bg-[#121215] border border-zinc-800 space-y-4 font-mono">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-orange-500" />
            <span>7-Day Study Activity Heatmap</span>
          </h3>
          <span className="text-[11px] text-zinc-400">
            {metrics.streak > 0
              ? `${metrics.streak}-Day Active Streak`
              : "No active streak recorded yet"}
          </span>
        </div>
        <div className="grid grid-cols-7 gap-3">
          {metrics.weekDays.map((dayItem) => (
            <div
              key={dayItem.day}
              className={`p-4 rounded-2xl text-center border space-y-1 transition-all ${
                dayItem.isActive
                  ? "bg-orange-500/10 border-orange-500/30 text-orange-400 shadow-sm"
                  : dayItem.isFuture
                  ? "bg-[#09090b]/50 border-zinc-800/50 text-zinc-600"
                  : "bg-[#09090b] border-zinc-800 text-zinc-600"
              }`}
            >
              <div className="text-xs font-bold">{dayItem.day}</div>
              <div className="text-lg font-black">
                {dayItem.isActive ? "✓" : dayItem.isFuture ? "·" : "—"}
              </div>
              <div className="text-[10px] text-zinc-500">
                {dayItem.isActive ? `${dayItem.minutes}m` : dayItem.isFuture ? "Upcoming" : "Idle"}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Topic Mastery & Real Placement Tracks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
        {/* Topic Mastery */}
        <div className="p-6 rounded-3xl bg-[#121215] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-orange-500" />
              <span>DSA Topic Mastery & Pass Rates</span>
            </h3>
            <span className="text-[10px] uppercase font-bold text-orange-400">
              {metrics.solvedCount} Problems Solved
            </span>
          </div>

          <div className="space-y-3">
            {metrics.userTopicMastery.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-300">{item.topic}</span>
                  <span className="text-zinc-400">
                    {item.hasActivity ? (
                      <span className="text-orange-400 font-bold">
                        {item.solvedCount} / {item.totalProblems} solved ({item.masteryPercent}%)
                      </span>
                    ) : (
                      <span className="text-zinc-600">0 / {item.totalProblems} (Not attempted)</span>
                    )}
                  </span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      item.hasActivity
                        ? "bg-gradient-to-r from-orange-500 to-amber-400"
                        : "bg-zinc-700/50"
                    }`}
                    style={{
                      width: `${item.hasActivity ? Math.max(6, item.masteryPercent) : 0}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Placement Tracks */}
        <div className="p-6 rounded-3xl bg-[#121215] border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-500" />
              <span>Candidate Company Placement Tracks</span>
            </h3>
            <span className="text-[10px] uppercase font-bold text-orange-400">
              {metrics.hasAnyCompanyPractice ? "Active Tracks" : "Target Tracks"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {metrics.userCompanyTracks.map((comp, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl bg-[#09090b] border flex items-center justify-between transition ${
                  comp.totalActivity > 0 || comp.isTarget
                    ? "border-zinc-700 bg-zinc-900/60"
                    : "border-zinc-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-[10px] font-bold text-orange-400">
                    #{idx + 1}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">{comp.name}</span>
                    {comp.isTarget && (
                      <span className="text-[9px] text-orange-400 uppercase font-mono">Target Track</span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-zinc-300 block font-bold">
                    {comp.solved} solved
                  </span>
                  <span className="text-[10px] text-zinc-500 block">
                    {comp.mocks} mocks
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Level Telemetry */}
      {analytics && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#121215] border border-zinc-800 space-y-4 font-mono">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-300">
                Live Global Platform Telemetry
              </h3>
              <span className="text-[10px] uppercase text-zinc-500 font-mono">
                Real-Time Network Activity
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[#09090b] border border-zinc-800">
                <div className="text-xl font-black text-white">
                  {(analytics.totalUsers ?? analytics.totalStudents ?? 0).toLocaleString()}
                </div>
                <div className="text-xs text-zinc-500 mt-1 uppercase">Enrolled Engineers</div>
              </div>
              <div className="p-4 rounded-xl bg-[#09090b] border border-zinc-800">
                <div className="text-xl font-black text-orange-400">
                  {(analytics.totalSubmissions ?? 0).toLocaleString()}
                </div>
                <div className="text-xs text-zinc-500 mt-1 uppercase">DSA Submissions</div>
              </div>
              <div className="p-4 rounded-xl bg-[#09090b] border border-zinc-800">
                <div className="text-xl font-black text-white">
                  {(
                    (analytics.totalQuizzesTaken ?? 0) +
                    (analytics.totalCoursesCompleted ?? 0)
                  ).toLocaleString()}
                </div>
                <div className="text-xs text-zinc-500 mt-1 uppercase">Quizzes & Lessons</div>
              </div>
              <div className="p-4 rounded-xl bg-[#09090b] border border-zinc-800">
                <div className="text-xl font-black text-orange-400">
                  {(
                    analytics.totalAiInterviewsConducted ??
                    analytics.totalInterviewsCompleted ??
                    0
                  ).toLocaleString()}
                </div>
                <div className="text-xs text-zinc-500 mt-1 uppercase">Mock Interviews</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
