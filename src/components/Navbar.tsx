import React from "react";
import {
  Sparkles,
  Flame,
  Search,
  Moon,
  Sun,
  Shield,
  GraduationCap,
  Zap,
  Terminal,
  ArrowRight,
  Bot,
  LogOut
} from "lucide-react";
import { useAuth } from "../context/AuthContext.js";
import { useApp } from "../context/AppContext.js";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, setIsSearchOpen, isTutorOpen, setIsTutorOpen, setCurrentTab, currentTab } = useApp();

  const userRole = user?.role || "student";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#09090b]/95 backdrop-blur-md transition-colors duration-200">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Brand Logo & Main Nav Links */}
        <div className="flex items-center gap-8">
          <button
            id="btn-brand-home"
            onClick={() => setCurrentTab("dashboard")}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-black text-sm tracking-tighter">
              <span className="font-mono">C</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tighter uppercase text-white font-mono flex items-center">
                CHINTAN<span className="text-orange-500">.</span>GPT
              </span>
            </div>
          </button>

          {/* Direct Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <button
              onClick={() => setCurrentTab("courses")}
              className={`px-3 py-1.5 rounded-lg transition-all btn-press-fx ${
                currentTab === "courses"
                  ? "text-white bg-zinc-800/90 border border-zinc-700/70 shadow-sm"
                  : "hover:text-zinc-100 hover:bg-zinc-900/80 border border-transparent"
              }`}
            >
              Courses
            </button>
            <button
              onClick={() => setCurrentTab("coding")}
              className={`px-3 py-1.5 rounded-lg transition-all btn-press-fx ${
                currentTab === "coding"
                  ? "text-white bg-zinc-800/90 border border-zinc-700/70 shadow-sm"
                  : "hover:text-zinc-100 hover:bg-zinc-900/80 border border-transparent"
              }`}
            >
              DSA Platform
            </button>
            <button
              onClick={() => setCurrentTab("company-prep")}
              className={`px-3 py-1.5 rounded-lg transition-all btn-press-fx ${
                currentTab === "company-prep"
                  ? "text-white bg-zinc-800/90 border border-zinc-700/70 shadow-sm"
                  : "hover:text-zinc-100 hover:bg-zinc-900/80 border border-transparent"
              }`}
            >
              Companies
            </button>
            <button
              onClick={() => setCurrentTab("mock-interview")}
              className={`px-3 py-1.5 rounded-lg transition-all btn-press-fx ${
                currentTab === "mock-interview"
                  ? "text-white bg-zinc-800/90 border border-zinc-700/70 shadow-sm"
                  : "hover:text-zinc-100 hover:bg-zinc-900/80 border border-transparent"
              }`}
            >
              AI Interviews
            </button>
          </nav>
        </div>

        {/* Global Quick Search */}
        <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
          <button
            id="btn-global-search"
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs bg-[#0e0e13] text-zinc-400 border border-zinc-800/90 hover:border-zinc-700 hover:text-zinc-200 transition-all btn-press-fx group shadow-inner"
          >
            <span className="flex items-center gap-2 truncate">
              <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors shrink-0" />
              <span className="truncate">Search lessons, DSA, companies...</span>
            </span>
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800/90 rounded border border-zinc-700/80 shadow-sm">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Action Controls & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile search icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:bg-zinc-900 transition btn-press-fx"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User Streaks */}
          {user && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/25 text-xs font-bold font-mono shadow-sm">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-subtleFloat" />
              <span>{user.streak}D STREAK</span>
            </div>
          )}

          {/* Chintan AI Tutor Trigger Button */}
          <button
            id="btn-toggle-ai-tutor"
            onClick={() => setIsTutorOpen(!isTutorOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all btn-press-fx ${
              isTutorOpen
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-md shadow-purple-500/20"
                : "bg-[#111116] text-zinc-300 hover:text-white border border-purple-500/30 hover:border-purple-500/60 shadow-sm hover:shadow-purple-500/10"
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">AI TUTOR</span>
          </button>

          {/* Primary CTA button */}
          <button
            id="btn-primary-header-action"
            onClick={() => setCurrentTab(currentTab === "coding" ? "courses" : "coding")}
            className="px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition-all btn-press-fx shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 flex items-center gap-1"
          >
            <span>{currentTab === "coding" ? "EXPLORE" : "START CODING"}</span>
            <ArrowRight className="w-3 h-3" />
          </button>

          {/* Real Authenticated Role Badge */}
          <div
            id="user-role-badge"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold border border-zinc-800/90 bg-[#0e0e13]"
          >
            {userRole === "admin" ? (
              <>
                <Shield className="w-3.5 h-3.5 text-rose-400" />
                <span className="font-bold text-rose-400 hidden sm:inline">ADMIN</span>
              </>
            ) : (
              <>
                <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-bold text-zinc-300 hidden sm:inline">STUDENT</span>
              </>
            )}
          </div>

          {/* User Profile & Logout */}
          {user && (
            <div className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-lg object-cover ring-1 ring-zinc-700 shadow-sm hidden sm:block"
                title={user.name}
              />
              <button
                id="btn-logout"
                onClick={logout}
                className="p-1.5 rounded-lg border border-zinc-800 hover:border-rose-500/50 bg-[#121215] text-zinc-400 hover:text-rose-400 transition"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
