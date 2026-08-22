import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "../types/index.js";
import { api } from "../services/api.js";

interface AuthContextType {
  user: UserProfile;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, pass: string, role?: "student" | "admin") => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchRole: (newRole: UserRole) => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateUser: (data: Partial<UserProfile>) => Promise<void>;
  setTargetCompanies: (companyIds: string[]) => Promise<void>;
  enrollCourse: (courseId: string) => Promise<void>;
}

const STORAGE_KEY = "chintan_user_profile_v2";

const DEFAULT_PROFILE: UserProfile = {
  id: "usr_student_main",
  name: "Student Scholar",
  email: "student@chintangpt.com",
  role: "student",
  avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=chintan_student_1",
  createdAt: new Date().toISOString(),
  lastActive: new Date().toISOString(),
  streak: 3,
  longestStreak: 5,
  xp: 350,
  level: 2,
  solvedProblemIds: ["prob_two_sum", "prob_valid_anagram"],
  problemsAttempted: 3,
  completedLessonIds: ["les_web_1_1", "les_web_1_2"],
  completedVideoIds: [],
  enrolledCourseIds: ["course_fullstack_webdev", "course_dsa_1", "course_system_design_1"],
  targetCompanies: ["comp_google", "comp_microsoft", "comp_tcs"],
  quizzesCompleted: 2,
  learningMinutes: 75,
  weakTopics: [],
  streakHistory: [
    { date: new Date(Date.now() - 86400000 * 2).toISOString().split("T")[0], count: 1 },
    { date: new Date(Date.now() - 86400000).toISOString().split("T")[0], count: 1 },
    { date: new Date().toISOString().split("T")[0], count: 1 }
  ],
  lastWatchedVideos: {}
};

function getInitialProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.id) {
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          solvedProblemIds: Array.isArray(parsed.solvedProblemIds) ? parsed.solvedProblemIds : DEFAULT_PROFILE.solvedProblemIds,
          completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : DEFAULT_PROFILE.completedLessonIds,
          enrolledCourseIds: Array.isArray(parsed.enrolledCourseIds) ? parsed.enrolledCourseIds : DEFAULT_PROFILE.enrolledCourseIds,
          targetCompanies: Array.isArray(parsed.targetCompanies) ? parsed.targetCompanies : DEFAULT_PROFILE.targetCompanies
        };
      }
    }
  } catch (err) {
    console.warn("[AuthContext] Local profile parsing notice:", err);
  }
  return DEFAULT_PROFILE;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(getInitialProfile);

  // Sync profile state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch {}
  }, [user]);

  const refreshProfile = async () => {
    try {
      const serverProfile = await api.getProfile();
      if (serverProfile) {
        setUser((prev) => {
          const merged: UserProfile = {
            ...prev,
            ...serverProfile,
            solvedProblemIds: Array.from(new Set([...(prev.solvedProblemIds || []), ...(serverProfile.solvedProblemIds || [])])),
            completedLessonIds: Array.from(new Set([...(prev.completedLessonIds || []), ...(serverProfile.completedLessonIds || [])])),
            enrolledCourseIds: Array.from(new Set([...(prev.enrolledCourseIds || []), ...(serverProfile.enrolledCourseIds || [])])),
            targetCompanies: Array.from(new Set([...(prev.targetCompanies || []), ...(serverProfile.targetCompanies || [])])),
            streak: Math.max(prev.streak || 0, serverProfile.streak || 0),
            longestStreak: Math.max(prev.longestStreak || 0, serverProfile.longestStreak || 0),
            xp: Math.max(prev.xp || 0, serverProfile.xp || 0),
          };
          return merged;
        });
      }
    } catch {
      // Offline/client mode: keep local state
    }
  };

  const login = async (_email: string, _pass: string) => {
    return { success: true };
  };

  const register = async (name: string, email: string, _pass: string, role: "student" | "admin" = "student") => {
    const updated: UserProfile = {
      ...user,
      name: name || user.name,
      email: email || user.email,
      role
    };
    setUser(updated);
    return { success: true };
  };

  const signInWithGoogle = async () => {
    return { success: true };
  };

  const logout = async () => {
    // Reset to default active student
    setUser(DEFAULT_PROFILE);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROFILE));
    } catch {}
  };

  const switchRole = async (newRole: UserRole) => {
    setUser((prev) => {
      const updated: UserProfile = {
        ...prev,
        role: newRole,
        name: newRole === "admin" ? "Platform Admin" : "Student Scholar",
        email: newRole === "admin" ? "admin@chintangpt.com" : "student@chintangpt.com",
        avatar: newRole === "admin"
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop"
          : "https://api.dicebear.com/7.x/bottts/svg?seed=chintan_student_1"
      };
      return updated;
    });
    try {
      await api.switchRole(newRole);
    } catch {}
  };

  const updateUser = async (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
    try {
      await api.updateProfile(data);
    } catch {}
  };

  const setTargetCompanies = async (companyIds: string[]) => {
    setUser((prev) => ({ ...prev, targetCompanies: companyIds }));
    try {
      await api.setTargetCompanies(companyIds);
    } catch {}
  };

  const enrollCourse = async (courseId: string) => {
    setUser((prev) => {
      const current = prev.enrolledCourseIds || [];
      if (!current.includes(courseId)) {
        return { ...prev, enrolledCourseIds: [...current, courseId] };
      }
      return prev;
    });
    try {
      await api.enrollCourse(courseId);
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: true,
        isAdmin: user.role === "admin",
        loading: false,
        login,
        register,
        signInWithGoogle,
        logout,
        switchRole,
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
