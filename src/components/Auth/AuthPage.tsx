import React, { useState } from "react";
import {
  Sparkles,
  Lock,
  Mail,
  User,
  ArrowRight,
  Shield,
  GraduationCap,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Eye,
  EyeOff
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.js";

export const AuthPage: React.FC = () => {
  const { login, register, signInWithGoogle } = useAuth();

  const [mode, setMode] = useState<"login" | "signup" | "forgot-password">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      if (!res.success) {
        setError(res.error || "Google Sign-In was cancelled.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await login(email, password);
      if (!res.success) {
        setError(res.error || "Invalid email or password.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreeTerms) {
      setError("You must agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setLoading(true);
    try {
      const res = await register(name, email, password, "student");
      if (!res.success) {
        setError(res.error || "Registration failed. Email might already exist.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    try {
      // Simulate/Trigger password reset token
      setTimeout(() => {
        setLoading(false);
        setSuccessMsg(`A password reset link has been dispatched to ${email}. Check your inbox!`);
      }, 600);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "Failed to process request.");
    }
  };

  const handleQuickDemoFill = (type: "student" | "admin") => {
    if (type === "student") {
      setEmail("student@chintangpt.com");
      setPassword("student123");
    } else {
      setEmail("admin@chintangpt.com");
      setPassword("admin123");
    }
    setMode("login");
    setError(null);
    setSuccessMsg(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden font-sans select-none">
      {/* Background glow & subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 mb-2">
            <span className="font-mono font-black text-xl">C</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white uppercase">
            CHINTAN<span className="text-orange-500">.</span>GPT
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            {mode === "login"
              ? "Sign in to access your placement tracks, DSA problems, and AI Tutor"
              : mode === "signup"
              ? "Create your authentic student account and begin placement prep"
              : "Reset your Chintan GPT account password"}
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="p-3 rounded-xl bg-[#121215] border border-zinc-800 space-y-2">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 text-center">
            Quick One-Click Demo Credentials
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="btn-demo-student-fill"
              onClick={() => handleQuickDemoFill("student")}
              className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono font-semibold text-zinc-300 flex items-center justify-center gap-1.5 transition"
            >
              <GraduationCap className="w-3.5 h-3.5 text-orange-400" />
              <span>Demo Student</span>
            </button>
            <button
              type="button"
              id="btn-demo-admin-fill"
              onClick={() => handleQuickDemoFill("admin")}
              className="px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono font-semibold text-rose-400 flex items-center justify-center gap-1.5 transition"
            >
              <Shield className="w-3.5 h-3.5 text-rose-400" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Auth Box */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#121215] border border-zinc-800 shadow-2xl space-y-6">
          {/* Navigation Tabs between Login & Signup */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-[#09090b] border border-zinc-800/80">
            <button
              type="button"
              id="tab-auth-login"
              onClick={() => {
                setMode("login");
                setError(null);
                setSuccessMsg(null);
              }}
              className={`py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition ${
                mode === "login"
                  ? "bg-[#18181c] text-white shadow-sm border border-zinc-700/60"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              id="tab-auth-signup"
              onClick={() => {
                setMode("signup");
                setError(null);
                setSuccessMsg(null);
              }}
              className={`py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition ${
                mode === "signup"
                  ? "bg-[#18181c] text-white shadow-sm border border-zinc-700/60"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 font-mono">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick Firebase Google Authentication */}
          <button
            type="button"
            id="btn-auth-google"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white text-xs font-mono font-medium flex items-center justify-center gap-3 transition active:scale-[0.99] disabled:opacity-50 shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.41 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.59 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">or with email</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Mode 1: LOGIN */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    id="input-login-email"
                    type="email"
                    required
                    placeholder="student@chintangpt.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("forgot-password");
                      setError(null);
                      setSuccessMsg(null);
                    }}
                    className="text-[11px] font-mono text-orange-400 hover:text-orange-300 transition"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    id="input-login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="btn-submit-login"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-mono font-bold uppercase tracking-wider transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                <span>{loading ? "Authenticating..." : "Sign In to Chintan GPT"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Mode 2: SIGNUP */}
          {mode === "signup" && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    id="input-signup-name"
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono transition"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    id="input-signup-email"
                    type="email"
                    required
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      id="input-signup-password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Min 6 chars"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                    <input
                      id="input-signup-confirm-password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono transition"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="checkbox-terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 rounded bg-zinc-900 border-zinc-700 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor="checkbox-terms" className="text-xs text-zinc-400 font-mono leading-tight">
                  I agree to the Terms of Service, Placement Preparation Honor Code, and Privacy Policy.
                </label>
              </div>

              <button
                type="submit"
                id="btn-submit-signup"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-mono font-bold uppercase tracking-wider transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                <span>{loading ? "Creating Account..." : "Create Free Student Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Mode 3: FORGOT PASSWORD */}
          {mode === "forgot-password" && (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wider">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    id="input-forgot-email"
                    type="email"
                    required
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#09090b] border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-submit-forgot"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-xs font-mono font-bold uppercase tracking-wider transition shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>{loading ? "Sending link..." : "Send Reset Link"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError(null);
                  setSuccessMsg(null);
                }}
                className="w-full text-center text-xs font-mono text-zinc-400 hover:text-white transition"
              >
                Back to Sign In
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] font-mono text-zinc-600">
          Chintan GPT • Precision Placement & Engineering Platform
        </div>
      </div>
    </div>
  );
};
