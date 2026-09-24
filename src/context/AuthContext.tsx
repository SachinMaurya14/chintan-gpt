import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "../types/index.js";
import { api } from "../services/api.js";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: "login" | "register";
  setAuthModalMode: (mode: "login" | "register") => void;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
  setTargetCompanies: (companyIds: string[]) => Promise<void>;
  enrollCourse: (courseId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<"login" | "register">("login");

  // On initial mount, verify existing session token with server
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("chintan_auth_token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await api.getMe();
        if (res && res.user) {
          setUser(res.user);
        } else {
          localStorage.removeItem("chintan_auth_token");
          setUser(null);
        }
      } catch (err) {
        console.warn("[Auth] Existing session verification failed:", err);
        localStorage.removeItem("chintan_auth_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const refreshProfile = async () => {
    try {
      const res = await api.getMe();
      if (res && res.user) {
        setUser(res.user);
      }
    } catch {
      // Session expired or offline
    }
  };

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await api.login({ email, password: pass });
      if (res && res.success && res.user) {
        setUser(res.user);
        return { success: true };
      }
      return { success: false, error: res.error || "Invalid credentials." };
    } catch (err: any) {
      return { success: false, error: err?.message || "Login failed. Please try again." };
    }
  };

  const register = async (name: string, email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await api.register({ name, email, password: pass });
      if (res && res.success && res.user) {
        setUser(res.user);
        return { success: true };
      }
      return { success: false, error: res.error || "Registration failed." };
    } catch (err: any) {
      return { success: false, error: err?.message || "Registration failed. Please try again." };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // Clear client session regardless
    } finally {
      localStorage.removeItem("chintan_auth_token");
      setUser(null);
    }
  };

  const updateUser = async (data: Partial<UserProfile>) => {
    if (!user) return;
    try {
      const res = await api.updateProfile(data);
      if (res && res.user) {
        setUser(res.user);
      }
    } catch (err) {
      console.error("[Auth] Failed to update profile:", err);
    }
  };

  const setTargetCompanies = async (companyIds: string[]) => {
    if (!user) return;
    try {
      const res = await api.setTargetCompanies(companyIds);
      if (res && res.user) {
        setUser(res.user);
      }
    } catch (err) {
      console.error("[Auth] Failed to set target companies:", err);
    }
  };

  const enrollCourse = async (courseId: string) => {
    if (!user) return;
    try {
      const res = await api.enrollCourse(courseId);
      if (res && res.user) {
        setUser(res.user);
      }
    } catch (err) {
      console.error("[Auth] Failed to enroll in course:", err);
    }
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        loading,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        login,
        register,
        logout,
        refreshProfile,
        updateUser,
        setTargetCompanies,
        enrollCourse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
