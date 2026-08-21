import React, { useState, useEffect } from "react";
import {
  Globe,
  ArrowLeft,
  BookOpen,
  Play,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  Server,
  Database,
  Layout,
  Cpu,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { Course } from "../../types/index.js";
import { useAuth } from "../../context/AuthContext.js";
import { useApp } from "../../context/AppContext.js";
import { api } from "../../services/api.js";

interface WebDevHubProps {
  onBack?: () => void;
}

export const WebDevHub: React.FC<WebDevHubProps> = ({ onBack }) => {
  const { user } = useAuth();
  const { navigateToCourse } = useApp();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCourses()
      .then((all) => {
        // Filter courses belonging to Web Development track
        const webCourses = (all || []).filter(
          (c) =>
            c.track === "Web Development" ||
            c.category === "Web Development" ||
            c.id === "course_html_css" ||
            c.id === "course_javascript" ||
            c.id === "course_react" ||
            c.id === "course_backend" ||
            c.id === "course_system_design"
        );
        setCourses(webCourses);
      })
      .finally(() => setLoading(false));
  }, []);

  // Ordered sequence of the 5 key courses
  const trackOrder = [
    "course_html_css",
    "course_javascript",
    "course_react",
    "course_backend",
    "course_system_design"
  ];

  const sortedCourses = [...courses].sort((a, b) => {
    const idxA = trackOrder.indexOf(a.id);
    const idxB = trackOrder.indexOf(b.id);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return 0;
  });

  const getTrackIcon = (id: string) => {
    switch (id) {
      case "course_html_css":
        return <Layout className="w-5 h-5 text-orange-400" />;
      case "course_javascript":
        return <Code2 className="w-5 h-5 text-amber-400" />;
      case "course_react":
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case "course_backend":
        return <Server className="w-5 h-5 text-emerald-400" />;
      case "course_system_design":
        return <Cpu className="w-5 h-5 text-purple-400" />;
      default:
        return <Globe className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-zinc-100">
      {/* Top Breadcrumb / Back Button */}
      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141418] border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white hover:border-zinc-700 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Courses</span>
          </button>
        )}
      </div>

      {/* Hub Hero Header */}
      <div className="bg-gradient-to-br from-[#141418] to-[#0c0c0e] border border-zinc-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5" />
            <span>Curated Full-Stack Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
            Web Development Learning Hub
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed font-sans">
            Master modern web development step by step. From fundamental HTML/CSS semantics and deep JavaScript engine internals to modern React.js architecture, robust backend APIs, and distributed System Design.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-orange-500" />
              <span>5 Dedicated Independent Tracks</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Curated Video Series & Playlists</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-lg border border-zinc-800">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span>Chintan AI Tutor Integrated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Courses List - 5 Dedicated Clickable Tracks */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold uppercase font-mono tracking-wide text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-orange-500" />
            <span>All 5 Web Development Tracks</span>
          </h2>
          <span className="text-xs font-mono text-zinc-500">
            Independent Progress Tracking
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCourses.map((course, index) => {
            let totalLessons = 0;
            let completedInCourse = 0;
            const completedLessonIds = user?.completedLessonIds || [];

            (course.modules || []).forEach((mod) => {
              (mod.lessons || []).forEach((les) => {
                totalLessons++;
                if (completedLessonIds.includes(les.id)) {
                  completedInCourse++;
                }
              });
            });

            const progressPercent = totalLessons > 0 ? Math.round((completedInCourse / totalLessons) * 100) : 0;
            const isStarted = progressPercent > 0;

            return (
              <div
                key={course.id}
                className="group flex flex-col justify-between bg-[#121215] border border-zinc-800 hover:border-orange-500/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-200"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono font-bold text-orange-400 uppercase tracking-wider border border-zinc-800">
                      {getTrackIcon(course.id)}
                      <span>Track {index + 1}</span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-zinc-300">
                      <span className="bg-black/70 px-2 py-0.5 rounded border border-zinc-800/80">{course.level}</span>
                      <span className="bg-black/70 px-2 py-0.5 rounded border border-zinc-800/80">{course.durationHours} Hours</span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-white group-hover:text-orange-400 transition font-mono">
                        {course.title}
                      </h3>
                    </div>

                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Resources Count / Highlights */}
                    <div className="p-2.5 rounded-xl bg-[#16161c] border border-zinc-800/60 space-y-1.5">
                      <div className="text-[10px] font-mono font-bold uppercase text-zinc-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-orange-400" />
                        <span>Included Learning Resources</span>
                      </div>
                      <div className="text-xs font-mono text-zinc-300 space-y-1">
                        {(course.resources || []).map((res, rIdx) => (
                          <div key={res.id || rIdx} className="flex items-center gap-1.5 truncate text-[11px]">
                            <Play className="w-3 h-3 text-orange-500 shrink-0" />
                            <span className="truncate">{res.title}</span>
                          </div>
                        ))}
                        {(!course.resources || course.resources.length === 0) && (
                          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                            <Play className="w-3 h-3 text-orange-500 shrink-0" />
                            <span>Structured Video Modules & Notes</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(course.tags || []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#18181c] border border-zinc-800 text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer & Action */}
                <div className="p-5 pt-3 border-t border-zinc-800/80 bg-[#0e0e12] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">Course Progress</span>
                    <span className="font-bold text-orange-400">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-orange-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <button
                    onClick={() => navigateToCourse(course.id)}
                    className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-md shadow-orange-500/10"
                  >
                    <span>{isStarted ? "CONTINUE COURSE" : "START COURSE"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
