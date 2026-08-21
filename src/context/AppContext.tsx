import React, { createContext, useContext, useState, useEffect } from "react";
import { Course, CodingProblem, Lesson } from "../types/index.js";

export type NavTab = "dashboard" | "playground" | "courses" | "coding" | "company-prep" | "mock-interview" | "admin" | "analytics";

export interface ActiveTutorContext {
  problemTitle?: string;
  problemStatement?: string;
  topic?: string;
  difficulty?: string;
  company?: string;
  courseTitle?: string;
  moduleTitle?: string;
  lessonTitle?: string;
  contextCode?: string;
  userQuestion?: string;
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
  isTutorOpen: boolean;
  setIsTutorOpen: (open: boolean) => void;
  tutorContext: ActiveTutorContext;
  setTutorContext: React.Dispatch<React.SetStateAction<ActiveTutorContext>>;
  theme: "dark" | "light";
  toggleTheme: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  navigateToProblem: (problemId: string) => void;
  navigateToCourse: (courseId: string, lessonId?: string) => void;
  navigateToCompany: (companyId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTabState] = useState<NavTab>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      if (path === "/playground" || path.startsWith("/playground")) {
        return "playground";
      }
      if (window.location.hash === "#playground") {
        return "playground";
      }
    }
    return "dashboard";
  });

  const setCurrentTab = (tab: NavTab) => {
    setCurrentTabState(tab);
    if (typeof window !== "undefined") {
      if (tab === "playground") {
        window.history.replaceState(null, "", "/playground");
      } else if (tab === "dashboard") {
        window.history.replaceState(null, "", "/");
      }
    }
  };
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [tutorContext, setTutorContext] = useState<ActiveTutorContext>({
    topic: "Computer Science & Placement Prep",
    difficulty: "All Levels",
    courseTitle: "Chintan GPT AI Academy",
    lessonTitle: "Interactive Learning",
  });
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Synchronize base tutor context when switching primary tabs without a specific item selected
  useEffect(() => {
    if (currentTab === "coding" && !selectedProblemId) {
      setTutorContext((prev) => ({
        ...prev,
        problemTitle: undefined,
        problemStatement: undefined,
        topic: "Data Structures & Algorithms",
        difficulty: "All Levels",
        courseTitle: "Algorithmic Problem Bank",
        lessonTitle: "DSA Practice Problems",
      }));
    } else if (currentTab === "courses" && !selectedCourseId) {
      setTutorContext((prev) => ({
        ...prev,
        topic: "Full Stack & CS Curriculum",
        difficulty: "All Levels",
        courseTitle: "Computer Science Courses",
        lessonTitle: "Course Catalog",
      }));
    } else if (currentTab === "company-prep" && !selectedCompanyId) {
      setTutorContext((prev) => ({
        ...prev,
        topic: "Company Technical & Placement Prep",
        difficulty: "Placement Level",
        courseTitle: "Company Placement Hub",
        lessonTitle: "Tier-1 Placement Guides",
      }));
    } else if (currentTab === "mock-interview") {
      setTutorContext({
        topic: "Technical & Behavioral Mock Interviews",
        difficulty: "Interview Level",
        courseTitle: "Mock Interview Hub",
        lessonTitle: "Live AI Interviewer",
      });
    } else if (currentTab === "playground") {
      setTutorContext({
        topic: "Frontend & Web Code Playground",
        difficulty: "Interactive Sandbox",
        courseTitle: "Live Code Playground",
        lessonTitle: "HTML/CSS/JS Sandbox",
      });
    } else if (currentTab === "dashboard") {
      setTutorContext((prev) => ({
        ...prev,
        topic: "Computer Science & Placement Prep",
        difficulty: "All Levels",
        courseTitle: "Chintan GPT AI Academy",
        lessonTitle: "Dashboard Overview",
      }));
    }
  }, [currentTab, selectedProblemId, selectedCourseId, selectedCompanyId]);

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
        isTutorOpen,
        setIsTutorOpen,
        tutorContext,
        setTutorContext,
        theme,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
        toastMessage,
        showToast,
        navigateToProblem,
        navigateToCourse,
        navigateToCompany,
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
