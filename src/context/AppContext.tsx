import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { Course, CodingProblem, Lesson } from "../types/index.js";
import { useAuth } from "./AuthContext.js";
import { api } from "../services/api.js";

export type NavTab = "dashboard" | "playground" | "courses" | "coding" | "company-prep" | "mock-interview" | "admin" | "analytics" | "tutor";

export interface CourseProgressDetail {
  totalLessons: number;
  completedCount: number;
  percentage: number;
  isCompleted: boolean;
}

interface AppContextType {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
  selectedLessonId: string | null;
  setSelectedLessonId: (id: string | null) => void;
  selectedProblemId: string | null;
  setSelectedProblemId: (id: string | null) => void;
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string | null) => void;
  theme: "dark" | "light";
  toggleTheme: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  navigateToProblem: (problemId: string) => void;
  navigateToCourse: (courseId: string, lessonId?: string) => void;
  navigateToCompany: (companyId: string) => void;
  navigateToTutor: (initialPrompt?: string) => void;
  previousTab: NavTab;
  returnFromTutor: () => void;

  // Course Completion Tracking
  courseProgressMap: Record<string, CourseProgressDetail>;
  getCourseProgress: (courseId: string) => number;
  getCourseProgressDetails: (courseId: string) => CourseProgressDetail;
  isCourseCompleted: (courseId: string) => boolean;
  isLessonCompleted: (courseId: string, lessonOrVideoId: string) => boolean;
  markVideoComplete: (courseId: string, videoId: string, data?: { playlistId?: string; videoTitle?: string }) => Promise<void>;
  markLessonComplete: (courseId: string, lessonId: string) => Promise<void>;
  refreshCourseProgress: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, refreshProfile, isAuthenticated } = useAuth();

  const [currentTab, setCurrentTabState] = useState<NavTab>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      if (path === "/playground" || path.startsWith("/playground")) {
        return "playground";
      }
      if (path === "/tutor" || path.startsWith("/tutor")) {
        return "tutor";
      }
      if (window.location.hash === "#playground") {
        return "playground";
      }
      if (window.location.hash === "#tutor") {
        return "tutor";
      }
    }
    return "dashboard";
  });

  const [previousTab, setPreviousTab] = useState<NavTab>("dashboard");

  const setCurrentTab = (tab: NavTab) => {
    if (tab === "tutor" && currentTab !== "tutor") {
      setPreviousTab(currentTab);
    }
    setCurrentTabState(tab);
    if (typeof window !== "undefined") {
      if (tab === "playground") {
        window.history.replaceState(null, "", "/playground");
      } else if (tab === "tutor") {
        window.history.replaceState(null, "", "/tutor");
      } else if (tab === "dashboard") {
        window.history.replaceState(null, "", "/");
      }
    }
  };

  const returnFromTutor = () => {
    const target = previousTab && previousTab !== "tutor" ? previousTab : "dashboard";
    setCurrentTab(target);
  };

  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cached courses list for calculating progress across catalog
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [serverProgressMap, setServerProgressMap] = useState<Record<string, CourseProgressDetail>>({});

  useEffect(() => {
    let mounted = true;
    api.getCourses().then((courses) => {
      if (mounted && Array.isArray(courses)) {
        setAllCourses(courses);
      }
    }).catch(() => {});

    return () => {
      mounted = false;
    };
  }, []);

  // Fetch server-calculated progress from Firestore
  const refreshCourseProgress = useCallback(async () => {
    try {
      const progress = await api.getCourseProgress();
      if (progress && typeof progress === "object") {
        setServerProgressMap(progress);
      }
    } catch {
      // Ignore background refresh failure
    }
  }, []);

  useEffect(() => {
    refreshCourseProgress();
  }, [user?.id, user?.completedLessonIds?.length, user?.completedVideoIds?.length, refreshCourseProgress]);

  // Compute reactive progress map combining local state and server progress
  const courseProgressMap = useMemo<Record<string, CourseProgressDetail>>(() => {
    const result: Record<string, CourseProgressDetail> = {};
    const completedLessonIds = new Set(user?.completedLessonIds || []);
    const completedVideoIds = new Set(user?.completedVideoIds || []);

    for (const course of allCourses) {
      const allModuleLessons: any[] = [];
      (course.modules || []).forEach((m) => {
        (m.lessons || []).forEach((l) => allModuleLessons.push(l));
      });

      const totalCount = Math.max(
        1,
        course.totalLessons || allModuleLessons.length || course.playlistVideos?.length || 1
      );

      let completedCount = 0;
      if (allModuleLessons.length > 0) {
        allModuleLessons.forEach((les) => {
          const rawVid = les.id.replace(`les_${course.id}_`, "");
          if (
            completedLessonIds.has(les.id) ||
            completedLessonIds.has(rawVid) ||
            completedVideoIds.has(les.id) ||
            completedVideoIds.has(rawVid)
          ) {
            completedCount++;
          }
        });
      } else if (course.playlistVideos && course.playlistVideos.length > 0) {
        course.playlistVideos.forEach((v) => {
          if (
            completedVideoIds.has(v.videoId) ||
            completedLessonIds.has(`les_${course.id}_${v.videoId}`) ||
            completedLessonIds.has(v.videoId)
          ) {
            completedCount++;
          }
        });
      }

      // If server returned progress for this course, prefer whichever has higher completedCount (to avoid sync delay)
      const serverDetail = serverProgressMap[course.id];
      if (serverDetail && serverDetail.completedCount > completedCount) {
        result[course.id] = serverDetail;
      } else {
        const percentage = Math.min(100, Math.round((completedCount / totalCount) * 100));
        result[course.id] = {
          totalLessons: totalCount,
          completedCount,
          percentage,
          isCompleted: percentage >= 100,
        };
      }
    }

    return result;
  }, [allCourses, user?.completedLessonIds, user?.completedVideoIds, serverProgressMap]);

  const getCourseProgress = useCallback((courseId: string): number => {
    return courseProgressMap[courseId]?.percentage || 0;
  }, [courseProgressMap]);

  const getCourseProgressDetails = useCallback((courseId: string): CourseProgressDetail => {
    return courseProgressMap[courseId] || {
      totalLessons: 1,
      completedCount: 0,
      percentage: 0,
      isCompleted: false,
    };
  }, [courseProgressMap]);

  const isCourseCompleted = useCallback((courseId: string): boolean => {
    return (courseProgressMap[courseId]?.percentage || 0) >= 100;
  }, [courseProgressMap]);

  const isLessonCompleted = useCallback((courseId: string, lessonOrVideoId: string): boolean => {
    if (!user) return false;
    const completedLessons = user.completedLessonIds || [];
    const completedVideos = user.completedVideoIds || [];
    const rawId = lessonOrVideoId.replace(`les_${courseId}_`, "");
    const formattedKey = `les_${courseId}_${rawId}`;

    return (
      completedLessons.includes(lessonOrVideoId) ||
      completedLessons.includes(rawId) ||
      completedLessons.includes(formattedKey) ||
      completedVideos.includes(lessonOrVideoId) ||
      completedVideos.includes(rawId)
    );
  }, [user]);

  const markVideoComplete = useCallback(async (courseId: string, videoId: string, data?: { playlistId?: string; videoTitle?: string }) => {
    if (!isAuthenticated) {
      showToast("Please log in to track course completion and save progress.");
      return;
    }

    try {
      const res = await api.completeVideo(courseId, videoId, data);
      if (res?.success) {
        await refreshProfile();
        await refreshCourseProgress();
        const prevProgress = courseProgressMap[courseId]?.percentage || 0;
        if (prevProgress < 100 && (prevProgress + (100 / (courseProgressMap[courseId]?.totalLessons || 10))) >= 99) {
          showToast("🏆 Congratulations! Course Completed! 🎓");
        } else {
          showToast("🎉 Lesson completed! +50 XP");
        }
      }
    } catch (err: any) {
      showToast(`Could not save progress: ${err.message || "Network error"}`);
      throw err;
    }
  }, [isAuthenticated, refreshProfile, refreshCourseProgress, courseProgressMap]);

  const markLessonComplete = useCallback(async (courseId: string, lessonId: string) => {
    if (!isAuthenticated) {
      showToast("Please log in to track course completion and save progress.");
      return;
    }

    try {
      const res = await api.completeLesson(courseId, lessonId);
      if (res?.success) {
        await refreshProfile();
        await refreshCourseProgress();
        showToast("🎉 Lesson completed! +50 XP");
      }
    } catch (err: any) {
      showToast(`Could not save progress: ${err.message || "Network error"}`);
      throw err;
    }
  }, [isAuthenticated, refreshProfile, refreshCourseProgress]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Keyboard shortcut Cmd+K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const navigateToProblem = (problemId: string) => {
    setSelectedProblemId(problemId);
    setCurrentTab("coding");
  };

  const navigateToCourse = (courseId: string, lessonId?: string) => {
    setSelectedCourseId(courseId);
    if (lessonId) setSelectedLessonId(lessonId);
    setCurrentTab("courses");
  };

  const navigateToCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setCurrentTab("company-prep");
  };

  const navigateToTutor = (initialPrompt?: string) => {
    if (currentTab !== "tutor") {
      setPreviousTab(currentTab);
    }
    setCurrentTab("tutor");
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        selectedCourseId,
        setSelectedCourseId,
        selectedLessonId,
        setSelectedLessonId,
        selectedProblemId,
        setSelectedProblemId,
        selectedCompanyId,
        setSelectedCompanyId,
        theme,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
        navigateToProblem,
        navigateToCourse,
        navigateToCompany,
        navigateToTutor,
        previousTab,
        returnFromTutor,

        // Course completion tracking
        courseProgressMap,
        getCourseProgress,
        getCourseProgressDetails,
        isCourseCompleted,
        isLessonCompleted,
        markVideoComplete,
        markLessonComplete,
        refreshCourseProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
