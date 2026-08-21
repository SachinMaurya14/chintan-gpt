import React from "react";
import {
  Home as HomeIcon,
  BookOpen,
  Code2,
  Building2,
  Mic,
  BarChart3,
  ShieldCheck,
  Zap,
  Target,
  Terminal
} from "lucide-react";
import { useApp, NavTab } from "../context/AppContext.js";
import { useAuth } from "../context/AuthContext.js";

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab } = useApp();
  const { user, isAdmin } = useAuth();

  const navItems = [
    {
      id: "dashboard" as NavTab,
      label: "Home",
      icon: HomeIcon,
      accentColor: "text-amber-500",
      activeBg: "bg-amber-500/10 border-amber-500/30 text-white",
      badge: null,
    },
    {
      id: "playground" as NavTab,
      label: "Playground",
      icon: Terminal,
      accentColor: "text-cyan-400",
      activeBg: "bg-cyan-500/10 border-cyan-500/30 text-white",
      badge: "IDE",
    },
    {
      id: "courses" as NavTab,
      label: "Interactive Courses",
      icon: BookOpen,
      accentColor: "text-blue-400",
      activeBg: "bg-blue-500/10 border-blue-500/30 text-white",
      badge: "Video",
    },
    {
      id: "coding" as NavTab,
      label: "DSA Coding Platform",
      icon: Code2,
      accentColor: "text-orange-400",
      activeBg: "bg-orange-500/10 border-orange-500/30 text-white",
      badge: "100+ Probs",
    },
    {
      id: "company-prep" as NavTab,
      label: "Company Placement",
      icon: Building2,
      accentColor: "text-emerald-400",
      activeBg: "bg-emerald-500/10 border-emerald-500/30 text-white",
      badge: "TCS / FAANG",
    },
    {
      id: "mock-interview" as NavTab,
      label: "AI Mock Interviews",
      icon: Mic,
      accentColor: "text-purple-400",
      activeBg: "bg-purple-500/10 border-purple-500/30 text-white",
      badge: "AI Voice",
    },
    {
      id: "analytics" as NavTab,
      label: "Learning Analytics",
      icon: BarChart3,
      accentColor: "text-cyan-400",
      activeBg: "bg-cyan-500/10 border-cyan-500/30 text-white",
      badge: null,
    },
  ];

  if (isAdmin) {
    navItems.push({
      id: "admin" as NavTab,
      label: "Admin Management",
      icon: ShieldCheck,
      accentColor: "text-rose-400",
      activeBg: "bg-rose-500/10 border-rose-500/30 text-white",
      badge: "CMS",
    });
  }

  const solvedCount = user?.solvedProblemIds?.length || 0;
  const completedLessons = user?.completedLessonIds?.length || 0;
  const readinessPercent = Math.min(100, Math.round((solvedCount * 4 + completedLessons * 3)));

  return (
    <aside id="sidebar-nav" className="w-full md:w-60 shrink-0 border-r border-zinc-800/80 bg-[#08080b] p-3.5 flex flex-col justify-between select-none">
      <div className="space-y-6">
        {/* Navigation Section */}
        <div>
          <div className="px-2.5 mb-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-500 font-mono flex items-center justify-between">
            <span>Navigation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all btn-press-fx ${
                    isActive
                      ? `${item.activeBg} border shadow-sm font-bold`
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-[#111116] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? item.accentColor : "text-zinc-500"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive ? (
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-sm shadow-orange-500 animate-pulse" />
                  ) : item.badge ? (
                    <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Real Student Preparation Tracker Card */}
        <div id="student-sidebar-prep-card" className="p-3.5 rounded-xl bg-[#0e0e13] border border-zinc-800/90 hidden md:block space-y-2.5 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px] font-mono uppercase">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500 animate-subtleFloat" />
              <span>Target Goal</span>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">
              {user?.targetCompanies?.length ? `${user.targetCompanies.length} Selected` : "No Target"}
            </span>
          </div>

          {user?.targetCompanies && user.targetCompanies.length > 0 ? (
            <div className="flex items-center gap-1.5 text-xs text-zinc-300 font-medium leading-tight">
              <Target className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">
                {user.targetCompanies.map(c => c.replace("comp_", "").toUpperCase()).join(", ")}
              </span>
            </div>
          ) : (
            <div className="space-y-1.5 pt-0.5">
              <div className="text-[11px] text-zinc-400 font-mono">No target selected</div>
              <button
                id="btn-sidebar-choose-target"
                onClick={() => setCurrentTab("company-prep")}
                className="w-full py-1.5 px-2.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[11px] font-mono font-bold uppercase tracking-wider transition-all btn-press-fx text-center shadow-sm"
              >
                Choose Target
              </button>
            </div>
          )}

          <div className="space-y-1 pt-1">
            <div className="w-full bg-zinc-800/80 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-amber-400 h-1.5 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${readinessPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>Placement Readiness</span>
              <span className="text-amber-400 font-bold">{readinessPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Status */}
      <div className="pt-3 border-t border-zinc-800/80 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
        <span className="text-zinc-500">CHINTAN v2.4</span>
        <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          AI ENGINE READY
        </span>
      </div>
    </aside>
  );
};
