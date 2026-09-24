import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.js";
import { X, Lock, Mail, User, Shield, GraduationCap, AlertCircle, Loader2 } from "lucide-react";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode, setAuthModalMode, login, register } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (authModalMode === "login") {
        const res = await login(email, password);
        if (!res.success) {
          setError(res.error || "Login failed. Please check your credentials.");
        } else {
          setIsAuthModalOpen(false);
          setEmail("");
          setPassword("");
        }
      } else {
        const res = await register(name, email, password);
        if (!res.success) {
          setError(res.error || "Registration failed. Please try again.");
        } else {
          setIsAuthModalOpen(false);
          setName("");
          setEmail("");
          setPassword("");
        }
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = (fillEmail: string, fillPass: string) => {
    setEmail(fillEmail);
    setPassword(fillPass);
    setError(null);
  };

  return (
    <div
      id="auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={() => setIsAuthModalOpen(false)}
    >
      <div
        id="auth-modal-dialog"
        className="w-full max-w-md rounded-2xl bg-[#0e0e13] border border-zinc-800 text-zinc-100 shadow-2xl p-6 sm:p-7 space-y-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="btn-close-auth-modal"
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition"
          aria-label="Close auth dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-orange-500/10 border border-orange-500/25 text-orange-500 mb-2">
            <Lock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-white font-mono uppercase">
            {authModalMode === "login" ? "Sign In to Chintan GPT" : "Create Your Account"}
          </h2>
          <p className="text-xs text-zinc-400">
            {authModalMode === "login"
              ? "Access your isolated learning tracks, submissions & streaks"
              : "Start preparing for top tier tech companies with AI"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-[#16161d] rounded-xl border border-zinc-800/80 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setAuthModalMode("login");
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authModalMode === "login"
                ? "bg-orange-500 text-white shadow-sm font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthModalMode("register");
              setError(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authModalMode === "register"
                ? "bg-orange-500 text-white shadow-sm font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs flex items-start gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authModalMode === "register" && (
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  id="input-auth-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#14141b] border border-zinc-800 focus:border-orange-500 focus:outline-none text-xs text-white transition placeholder:text-zinc-600"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              <input
                id="input-auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@chintangpt.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#14141b] border border-zinc-800 focus:border-orange-500 focus:outline-none text-xs text-white transition placeholder:text-zinc-600"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
              <input
                id="input-auth-password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#14141b] border border-zinc-800 focus:border-orange-500 focus:outline-none text-xs text-white transition placeholder:text-zinc-600"
              />
            </div>
          </div>

          <button
            id="btn-submit-auth"
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-orange-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{authModalMode === "login" ? "Sign In" : "Create Student Account"}</span>
            )}
          </button>
        </form>

        {/* Quick Demo Logins for Evaluator Ease */}
        <div className="pt-2 border-t border-zinc-800/80 space-y-2">
          <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider text-center">
            Demo Credentials (Click to fill)
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="btn-fill-student-demo"
              onClick={() => handleQuickFill("student@chintangpt.com", "student123")}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left text-[11px] text-zinc-300 hover:text-white transition flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">Student Demo</span>
            </button>
            <button
              type="button"
              id="btn-fill-admin-demo"
              onClick={() => handleQuickFill("admin@chintangpt.com", "admin123")}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-left text-[11px] text-zinc-300 hover:text-white transition flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span className="truncate">Admin Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
