import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "../types/index.js";
import { api } from "../services/api.js";
import {
  auth,
  googleProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  syncUserProfileToFirestore,
  getUserProfileFromFirestore,
  updateUserFirestoreData
} from "../services/firebase.js";

interface AuthContextType {
  user: UserProfile | null;
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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    const token = localStorage.getItem("chintan_auth_token");
    
    // If no token exists, the user is unauthenticated
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // 1. Try server session
      const data = await api.getProfile();
      if (data) {
        // Also sync or overlay with Firestore if available
        try {
          const firestoreProfile = await getUserProfileFromFirestore(data.id);
          if (firestoreProfile) {
            const merged: UserProfile = {
              ...firestoreProfile,
              ...data,
              solvedProblemIds: Array.from(new Set([...(data.solvedProblemIds || []), ...(firestoreProfile.solvedProblemIds || [])])),
              completedLessonIds: Array.from(new Set([...(data.completedLessonIds || []), ...(firestoreProfile.completedLessonIds || [])])),
              completedVideoIds: Array.from(new Set([...(data.completedVideoIds || []), ...(firestoreProfile.completedVideoIds || [])])),
              enrolledCourseIds: Array.from(new Set([...(data.enrolledCourseIds || []), ...(firestoreProfile.enrolledCourseIds || [])])),
              targetCompanies: Array.from(new Set([...(data.targetCompanies || []), ...(firestoreProfile.targetCompanies || [])])),
              streak: Math.max(data.streak || 0, firestoreProfile.streak || 0),
              longestStreak: Math.max(data.longestStreak || 0, firestoreProfile.longestStreak || 0),
              xp: Math.max(data.xp || 0, firestoreProfile.xp || 0),
              level: Math.max(data.level || 1, firestoreProfile.level || 1),
              quizzesCompleted: Math.max(data.quizzesCompleted || 0, firestoreProfile.quizzesCompleted || 0),
              learningMinutes: Math.max(data.learningMinutes || 0, firestoreProfile.learningMinutes || 0),
              problemsAttempted: Math.max(data.problemsAttempted || 0, firestoreProfile.problemsAttempted || 0),
              lastWatchedVideos: { ...(firestoreProfile.lastWatchedVideos || {}), ...(data.lastWatchedVideos || {}) },
            };
            setUser(merged);
            setLoading(false);
            return;
          }
        } catch {}
        setUser(data);
      }
    } catch (err) {
      // Handle graceful recovery if server is cold-starting or offline
      if (token === "usr_student_1") {
        setUser({
          id: "usr_student_1",
          name: "Demo Student",
          email: "student@chintangpt.com",
          role: "student",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&fit=crop",
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          streak: 1,
          longestStreak: 1,
          xp: 150,
          level: 1,
          solvedProblemIds: ["prob_two_sum"],
          problemsAttempted: 1,
          completedLessonIds: ["les_web_1_1"],
          enrolledCourseIds: ["course_fullstack_webdev"],
          targetCompanies: ["comp_google", "comp_tcs"],
          quizzesCompleted: 1,
          learningMinutes: 30,
          weakTopics: [],
          streakHistory: [{ date: new Date().toISOString().split("T")[0], count: 1 }]
        });
      } else if (token === "usr_admin_1") {
        setUser({
          id: "usr_admin_1",
          name: "Platform Admin",
          email: "admin@chintangpt.com",
          role: "admin",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop",
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          streak: 5,
          longestStreak: 10,
          xp: 1200,
          level: 3,
          solvedProblemIds: ["prob_two_sum", "prob_valid_anagram", "prob_reverse_linked_list"],
          problemsAttempted: 5,
          completedLessonIds: ["les_web_1_1", "les_web_1_2"],
          enrolledCourseIds: ["course_fullstack_webdev", "course_dsa_1"],
          targetCompanies: ["comp_google", "comp_microsoft", "comp_tcs"],
          quizzesCompleted: 3,
          learningMinutes: 120,
          weakTopics: [],
          streakHistory: [{ date: new Date().toISOString().split("T")[0], count: 1 }]
        });
      } else {
        try {
          const firestoreProfile = await getUserProfileFromFirestore(token);
          if (firestoreProfile) {
            setUser(firestoreProfile);
            setLoading(false);
            return;
          }
        } catch {}
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  const login = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const res = await api.login({ email: cleanEmail, password: pass });
      if (res.success && res.user) {
        if (res.token) {
          localStorage.setItem("chintan_auth_token", res.token);
        }
        setUser(res.user);
        // Persist to Firestore in background
        syncUserProfileToFirestore(res.user);
        return { success: true };
      }
      return { success: false, error: res.error || "Invalid email or password." };
    } catch (err: any) {
      // 1. Check demo credentials fallback
      if (cleanEmail === "student@chintangpt.com" && pass === "student123") {
        const demoStudent: UserProfile = {
          id: "usr_student_1",
          name: "Demo Student",
          email: "student@chintangpt.com",
          role: "student",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&fit=crop",
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          streak: 1,
          longestStreak: 1,
          xp: 150,
          level: 1,
          solvedProblemIds: ["prob_two_sum"],
          problemsAttempted: 1,
          completedLessonIds: ["les_web_1_1"],
          enrolledCourseIds: ["course_fullstack_webdev"],
          targetCompanies: ["comp_google", "comp_tcs"],
          quizzesCompleted: 1,
          learningMinutes: 30,
          weakTopics: [],
          streakHistory: [{ date: new Date().toISOString().split("T")[0], count: 1 }]
        };
        localStorage.setItem("chintan_auth_token", demoStudent.id);
        setUser(demoStudent);
        syncUserProfileToFirestore(demoStudent);
        return { success: true };
      } else if (cleanEmail === "admin@chintangpt.com" && pass === "admin123") {
        const demoAdmin: UserProfile = {
          id: "usr_admin_1",
          name: "Platform Admin",
          email: "admin@chintangpt.com",
          role: "admin",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop",
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          streak: 5,
          longestStreak: 10,
          xp: 1200,
          level: 3,
          solvedProblemIds: ["prob_two_sum", "prob_valid_anagram", "prob_reverse_linked_list"],
          problemsAttempted: 5,
          completedLessonIds: ["les_web_1_1", "les_web_1_2"],
          enrolledCourseIds: ["course_fullstack_webdev", "course_dsa_1"],
          targetCompanies: ["comp_google", "comp_microsoft", "comp_tcs"],
          quizzesCompleted: 3,
          learningMinutes: 120,
          weakTopics: [],
          streakHistory: [{ date: new Date().toISOString().split("T")[0], count: 1 }]
        };
        localStorage.setItem("chintan_auth_token", demoAdmin.id);
        setUser(demoAdmin);
        syncUserProfileToFirestore(demoAdmin);
        return { success: true };
      }

      // 2. Check if user profile is cached in Firestore
      try {
        const potentialId = `usr_${cleanEmail.replace(/[^a-zA-Z0-9]/g, "_")}`;
        const firestoreProfile = await getUserProfileFromFirestore(potentialId);
        if (firestoreProfile) {
          localStorage.setItem("chintan_auth_token", firestoreProfile.id);
          setUser(firestoreProfile);
          return { success: true };
        }
      } catch {}

      return { success: false, error: err.message || "Invalid email or password." };
    }
  };

  const register = async (name: string, email: string, pass: string, role: "student" | "admin" = "student") => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();
    try {
      const res = await api.register({ name: cleanName, email: cleanEmail, password: pass, role });
      if (res.success && res.user) {
        if (res.token) {
          localStorage.setItem("chintan_auth_token", res.token);
        }
        setUser(res.user);
        // Persist to Firestore in background
        syncUserProfileToFirestore(res.user);
        return { success: true };
      }
      return { success: false, error: res.error || "Registration failed" };
    } catch (err: any) {
      // Fallback user creation if offline/static deployment mode
      if (cleanEmail && pass.length >= 6) {
        const newUser: UserProfile = {
          id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
          name: cleanName,
          email: cleanEmail,
          role,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(cleanEmail)}`,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          streak: 1,
          longestStreak: 1,
          xp: 100,
          level: 1,
          solvedProblemIds: [],
          problemsAttempted: 0,
          completedLessonIds: [],
          enrolledCourseIds: ["course_fullstack_webdev"],
          targetCompanies: ["comp_google"],
          quizzesCompleted: 0,
          learningMinutes: 10,
          weakTopics: [],
          streakHistory: [{ date: new Date().toISOString().split("T")[0], count: 1 }]
        };
        localStorage.setItem("chintan_auth_token", newUser.id);
        setUser(newUser);
        syncUserProfileToFirestore(newUser);
        return { success: true };
      }
      return { success: false, error: err.message || "Failed to create account" };
    }
  };

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const fbUser = result.user;

      if (!fbUser) {
        return { success: false, error: "Google Sign-In was cancelled or failed." };
      }

      // Check if user profile already exists in Firestore
      let existingProfile = await getUserProfileFromFirestore(fbUser.uid);

      if (!existingProfile) {
        // Create a new authentic profile
        existingProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || "Google Scholar",
          email: fbUser.email || `${fbUser.uid}@chintangpt.com`,
          role: "student",
          avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${fbUser.uid}`,
          createdAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          streak: 1,
          longestStreak: 1,
          xp: 150,
          level: 1,
          solvedProblemIds: [],
          problemsAttempted: 0,
          completedLessonIds: [],
          enrolledCourseIds: ["course_dsa_1", "course_fullstack_1"],
          targetCompanies: ["google", "microsoft", "tcs"],
          quizzesCompleted: 0,
          learningMinutes: 10,
          weakTopics: [],
          streakHistory: [{ date: new Date().toISOString().split("T")[0], count: 1 }]
        };
        await syncUserProfileToFirestore(existingProfile);
      }

      // Store auth session
      localStorage.setItem("chintan_auth_token", existingProfile.id);
      setUser(existingProfile);
      return { success: true };
    } catch (err: any) {
      console.warn("[Firebase Google Auth] Popup failed or closed:", err);
      return { success: false, error: err.message || "Google Sign-In failed" };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch {}
    try {
      await api.logout();
    } catch (err) {
      console.error("Logout error", err);
    } finally {
      localStorage.removeItem("chintan_auth_token");
      await refreshProfile();
    }
  };

  const switchRole = async (newRole: UserRole) => {
    try {
      const res = await api.switchRole(newRole);
      if (res.success) {
        if (res.token) {
          localStorage.setItem("chintan_auth_token", res.token);
        }
        setUser(res.user);
        syncUserProfileToFirestore(res.user);
      }
    } catch (err) {
      console.error("Failed to switch role:", err);
    }
  };

  const updateUser = async (data: Partial<UserProfile>) => {
    try {
      const updated = await api.updateProfile(data);
      setUser(updated);
      if (user?.id) {
        updateUserFirestoreData(user.id, data);
      }
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const setTargetCompanies = async (companyIds: string[]) => {
    try {
      const res = await api.setTargetCompanies(companyIds);
      if (res.success && res.user) {
        setUser(res.user);
        if (user?.id) {
          updateUserFirestoreData(user.id, { targetCompanies: companyIds });
        }
      }
    } catch (err) {
      console.error("Failed to set target companies:", err);
    }
  };

  const enrollCourse = async (courseId: string) => {
    try {
      const res = await api.enrollCourse(courseId);
      if (res.success && res.user) {
        setUser(res.user);
        if (user?.id) {
          updateUserFirestoreData(user.id, { enrolledCourseIds: res.user.enrolledCourseIds });
        }
      }
    } catch (err) {
      console.error("Failed to enroll in course:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        loading,
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
