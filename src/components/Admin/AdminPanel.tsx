import React, { useState, useEffect } from "react";
import {
  Shield,
  Plus,
  Trash2,
  BookOpen,
  Code2,
  Bell,
  CheckCircle2,
  Layers,
  Save,
  Loader2
} from "lucide-react";
import { api } from "../../services/api.js";
import { Course, CodingProblemSummary } from "../../types/index.js";
import { useAuth } from "../../context/AuthContext.js";

export const AdminPanel: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const role = user?.role || "student";
  const [activeTab, setActiveTab] = useState<"courses" | "problems" | "announcements">("courses");

  const [courses, setCourses] = useState<Course[]>([]);
  const [problems, setProblems] = useState<CodingProblemSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  // New Course Form State
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseCategory, setNewCourseCategory] = useState("Web Development");
  const [newCourseDesc, setNewCourseDesc] = useState("");
  const [newCourseInstructor, setNewCourseInstructor] = useState("Chintan Team");

  // New Problem Form State
  const [newProblemTitle, setNewProblemTitle] = useState("");
  const [newProblemDifficulty, setNewProblemDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [newProblemTopic, setNewProblemTopic] = useState("Arrays");
  const [newProblemDesc, setNewProblemDesc] = useState("");

  const refreshData = () => {
    api.getCourses().then((c) => setCourses(c || []));
    api.getProblems().then((p) => setProblems(p || []));
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (role !== "admin") {
    return (
      <div className="p-12 text-center text-zinc-500 font-mono">
        <Shield className="w-12 h-12 text-orange-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-white uppercase">Admin Access Restricted</h2>
        <p className="text-xs text-zinc-400 mt-1">Log in with an Administrator account (e.g. admin@chintangpt.com) to access this CMS.</p>
      </div>
    );
  }

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle) return;
    setLoading(true);
    try {
      const courseId = `course_${Date.now()}`;
      await api.adminCreateCourse({
        id: courseId,
        title: newCourseTitle,
        slug: newCourseTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: newCourseCategory as any,
        description: newCourseDesc,
        instructor: newCourseInstructor,
        instructorTitle: "Senior Curriculum Engineer",
        level: "Beginner",
        thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60",
        durationHours: 12,
        totalLessons: 1,
        tags: [newCourseCategory, "Full Stack", "Placement Prep"],
        modules: [
          {
            id: `mod_${courseId}_1`,
            courseId,
            title: "Module 1: Foundations",
            description: "Core conceptual walkthroughs",
            order: 1,
            lessons: [
              {
                id: `les_${courseId}_1`,
                moduleId: `mod_${courseId}_1`,
                courseId,
                title: "Introduction & Environment Setup",
                description: "Getting started with core principles",
                youtubeUrl: "https://www.youtube.com/watch?v=kUMe1FH4CHE",
                durationMinutes: 20,
                topic: newCourseCategory,
                difficulty: "Beginner",
                notesMarkdown: "### Key Notes\nMaster the basic primitives and setup your development workflow.",
                keyTakeaways: ["Core execution flow", "Performance boundaries"],
                order: 1,
              }
            ]
          }
        ]
      });
      setMsg("Course successfully created!");
      setNewCourseTitle("");
      setNewCourseDesc("");
      refreshData();
    } catch (e: any) {
      setMsg(`Error: ${e.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(null), 3000);
    }
  };

  const handleCreateProblem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProblemTitle) return;
    setLoading(true);
    try {
      const probId = `prob_${Date.now()}`;
      await api.adminCreateProblem({
        id: probId,
        title: newProblemTitle,
        slug: newProblemTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        difficulty: newProblemDifficulty,
        topics: [newProblemTopic],
        companyTags: ["Google", "TCS", "Amazon"],
        acceptanceRate: 75,
        description: newProblemDesc,
        examples: [{ input: "nums = [1, 2, 3]", output: "6", explanation: "Sample explanation" }],
        constraints: ["1 <= nums.length <= 10^5"],
        hints: ["Think about optimal time complexity."],
        starterCode: {
          python: "class Solution:\n    def solve(self, nums):\n        # Write logic\n        pass",
          javascript: "function solve(nums) {\n  // Write logic\n}",
          cpp: "class Solution {\npublic:\n    int solve(vector<int>& nums) {\n        return 0;\n    }\n};",
          java: "class Solution {\n    public int solve(int[] nums) {\n        return 0;\n    }\n}"
        },
        testCases: [
          { id: "tc_1", input: "[1, 2, 3]", expectedOutput: "6", isHidden: false },
          { id: "tc_2", input: "[4, 5, 6]", expectedOutput: "15", isHidden: true }
        ],
        timeLimitMs: 2000,
        memoryLimitMb: 256
      });
      setMsg("DSA Problem added to global repository!");
      setNewProblemTitle("");
      setNewProblemDesc("");
      refreshData();
    } catch (e: any) {
      setMsg(`Error: ${e.message}`);
    } finally {
      setLoading(false);
      setTimeout(() => setMsg(null), 3000);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      await api.adminDeleteCourse(id);
      refreshData();
    }
  };

  const handleDeleteProblem = async (id: string) => {
    if (confirm("Are you sure you want to delete this coding problem?")) {
      await api.adminDeleteProblem(id);
      refreshData();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-fadeIn text-zinc-100 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-orange-500">
            <Shield className="w-4 h-4" />
            <span>ADMIN CONTROL CONSOLE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase font-mono tracking-tight text-white">
            Content & Repository CMS
          </h1>
          <p className="text-sm text-zinc-400 max-w-2xl font-normal leading-relaxed">
            Publish courses, video syllabus modules, and DSA problem specifications.
          </p>
        </div>

        {msg && (
          <div className="px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 text-xs font-mono font-bold border border-orange-500/30 animate-fadeIn">
            {msg}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 font-mono">
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
            activeTab === "courses" ? "border-orange-500 text-orange-400" : "border-transparent text-zinc-500 hover:text-white"
          }`}
        >
          Manage Courses ({courses.length})
        </button>
        <button
          onClick={() => setActiveTab("problems")}
          className={`px-5 py-3 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
            activeTab === "problems" ? "border-orange-500 text-orange-400" : "border-transparent text-zinc-500 hover:text-white"
          }`}
        >
          Manage DSA Bank ({problems.length})
        </button>
      </div>

      {/* Content Form & Lists */}
      {activeTab === "courses" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Course Form */}
          <form onSubmit={handleCreateCourse} className="p-6 rounded-2xl bg-[#121215] border border-zinc-800 space-y-4 font-mono">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-orange-500" />
              <span>Create New Course</span>
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 uppercase">Course Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Next.js 15 & Cloud Microservices"
                value={newCourseTitle}
                onChange={(e) => setNewCourseTitle(e.target.value)}
                className="w-full p-2.5 bg-[#09090b] border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 uppercase">Category</label>
              <select
                value={newCourseCategory}
                onChange={(e) => setNewCourseCategory(e.target.value)}
                className="w-full p-2.5 bg-[#09090b] border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
              >
                <option value="Web Development">Web Development</option>
                <option value="DSA">Data Structures & Algorithms</option>
                <option value="System Design">System Design & Cloud</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 uppercase">Description</label>
              <textarea
                rows={3}
                required
                placeholder="Course curriculum summary..."
                value={newCourseDesc}
                onChange={(e) => setNewCourseDesc(e.target.value)}
                className="w-full p-2.5 bg-[#09090b] border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>PUBLISH COURSE</span>
            </button>
          </form>

          {/* Courses List */}
          <div className="lg:col-span-2 space-y-3 font-mono">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-300">Live Published Courses</h3>
            {courses.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-[#121215] border border-zinc-800 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img src={c.thumbnail} alt={c.title} className="w-14 h-10 rounded-lg object-cover border border-zinc-800" />
                  <div>
                    <div className="font-bold text-xs text-white">{c.title}</div>
                    <div className="text-[10px] text-zinc-500">{c.category} • {(c.modules || []).length} Modules • {c.totalLessons} Lessons</div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteCourse(c.id)}
                  className="p-2 text-zinc-500 hover:text-orange-500 transition"
                  title="Delete Course"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "problems" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-mono">
          {/* Create Problem Form */}
          <form onSubmit={handleCreateProblem} className="p-6 rounded-2xl bg-[#121215] border border-zinc-800 space-y-4">
            <h3 className="font-bold text-xs uppercase tracking-wider text-white flex items-center gap-2">
              <Plus className="w-4 h-4 text-orange-500" />
              <span>Add DSA Challenge</span>
            </h3>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 uppercase">Problem Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Longest Palindromic Substring"
                value={newProblemTitle}
                onChange={(e) => setNewProblemTitle(e.target.value)}
                className="w-full p-2.5 bg-[#09090b] border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 uppercase">Difficulty</label>
                <select
                  value={newProblemDifficulty}
                  onChange={(e) => setNewProblemDifficulty(e.target.value as any)}
                  className="w-full p-2.5 bg-[#09090b] border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-400 uppercase">Topic</label>
                <input
                  type="text"
                  value={newProblemTopic}
                  onChange={(e) => setNewProblemTopic(e.target.value)}
                  className="w-full p-2.5 bg-[#09090b] border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-400 uppercase">Description & Constraints</label>
              <textarea
                rows={3}
                required
                placeholder="Problem statement..."
                value={newProblemDesc}
                onChange={(e) => setNewProblemDesc(e.target.value)}
                className="w-full p-2.5 bg-[#09090b] border border-zinc-800 rounded-lg text-xs text-white focus:outline-none focus:border-orange-500 font-sans"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>SAVE PROBLEM</span>
            </button>
          </form>

          {/* Problem List */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-zinc-300">Live DSA Problem Repository</h3>
            {problems.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-[#121215] border border-zinc-800 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{p.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 font-bold text-orange-400 border border-zinc-700">
                      {p.difficulty}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-0.5 font-mono">{(p.topics || []).join(", ")}</div>
                </div>

                <button
                  onClick={() => handleDeleteProblem(p.id)}
                  className="p-2 text-zinc-500 hover:text-orange-500 transition"
                  title="Delete Problem"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
