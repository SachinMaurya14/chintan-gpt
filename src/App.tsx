import React, { Suspense } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.js";
import { AppProvider, useApp } from "./context/AppContext.js";
import { Navbar } from "./components/Navbar.js";
import { Sidebar } from "./components/Sidebar.js";
import { SearchModal } from "./components/SearchModal.js";
import { AuthModal } from "./components/AuthModal.js";
import { ErrorBoundary } from "./components/ErrorBoundary.js";
import { Loader2 } from "lucide-react";

import { DashboardHome } from "./components/Dashboard/DashboardHome.js";
import { CourseCatalog } from "./components/Courses/CourseCatalog.js";
import { CoursePlayer } from "./components/Courses/CoursePlayer.js";
import { ProblemList } from "./components/Coding/ProblemList.js";
import { CodeWorkspace } from "./components/Coding/CodeWorkspace.js";
import { CompanyPrepHub } from "./components/CompanyPrep/CompanyPrepHub.js";
import { MockInterviewHub } from "./components/Interview/MockInterviewHub.js";
import { AnalyticsView } from "./components/Analytics/AnalyticsView.js";
import { AdminPanel } from "./components/Admin/AdminPanel.js";
import { PlaygroundPage } from "./components/Playground/PlaygroundPage.js";
import { ChintanTutorView } from "./components/ChintanTutor/ChintanTutorView.js";

const ViewLoadingFallback: React.FC = () => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] text-zinc-400 font-mono space-y-3">
    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
    <div className="text-xs uppercase tracking-widest">Loading view...</div>
  </div>
);

const MainAppContent: React.FC = () => {
  const { user } = useAuth();
  const {
    currentTab,
    setCurrentTab,
    selectedCourseId,
    selectedLessonId,
    selectedProblemId,
  } = useApp();

  const renderActiveView = () => {
    // If in coding tab and a problem is selected -> open LeetCode workspace
    if (currentTab === "coding" && selectedProblemId) {
      return <CodeWorkspace problemId={selectedProblemId} />;
    }

    // If in courses tab and a course is selected -> open Course Player
    if (currentTab === "courses" && selectedCourseId) {
      return <CoursePlayer courseId={selectedCourseId} initialLessonId={selectedLessonId || undefined} />;
    }

    switch (currentTab) {
      case "dashboard":
        return <DashboardHome />;
      case "tutor":
        return <ChintanTutorView />;
      case "playground":
        return <PlaygroundPage />;
      case "courses":
        return <CourseCatalog />;
      case "coding":
        return <ProblemList />;
      case "company-prep":
        return <CompanyPrepHub />;
      case "mock-interview":
        return <MockInterviewHub />;
      case "analytics":
        return <AnalyticsView />;
      case "admin":
        return <AdminPanel />;
      default:
        return <DashboardHome />;
    }
  };

  const isFullBleedView =
    (currentTab === "coding" && !!selectedProblemId) ||
    (currentTab === "courses" && !!selectedCourseId) ||
    currentTab === "tutor";

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b] text-zinc-100 font-sans antialiased selection:bg-orange-500 selection:text-white transition-colors duration-200">
      {/* Global Navbar */}
      <Navbar />

      {/* Body Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Navigation Sidebar (hidden in full-bleed workspace on smaller screens or shown conditionally) */}
        {!isFullBleedView && <Sidebar />}

        {/* Dynamic Viewport */}
        <main className={`flex-1 ${currentTab === "tutor" ? "overflow-hidden h-[calc(100vh-4rem)]" : "overflow-y-auto min-h-[calc(100vh-4rem)]"}`}>
          <ErrorBoundary>
            <Suspense fallback={<ViewLoadingFallback />}>
              {renderActiveView()}
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>

      {/* Global Cmd+K Search Modal */}
      <SearchModal />

      {/* Global Auth Modal */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </AuthProvider>
  );
}
