import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  FileText,
  HelpCircle,
  Code2,
  Clock,
  Send,
  Loader2,
  ChevronRight,
  ChevronLeft,
  ExternalLink,
  Video,
  ListVideo,
  Search,
  RotateCcw,
  Check,
  Bookmark,
  Share2,
  Sparkles
} from "lucide-react";
import { Course, Lesson, QuizQuestion, CourseResource, PlaylistVideoItem } from "../../types/index.js";
import { useAuth } from "../../context/AuthContext.js";
import { useApp } from "../../context/AppContext.js";
import { api } from "../../services/api.js";
import confetti from "canvas-confetti";

export const CoursePlayer: React.FC<{ courseId: string; initialLessonId?: string; initialVideoId?: string }> = ({
  courseId,
  initialLessonId,
  initialVideoId,
}) => {
  const { user, refreshProfile } = useAuth();
  const { setSelectedCourseId, navigateToProblem, markVideoComplete, isLessonCompleted } = useApp();

  const [course, setCourse] = useState<Course | null>(null);
  const [activeResource, setActiveResource] = useState<CourseResource | null>(null);
  const [playlistVideos, setPlaylistVideos] = useState<PlaylistVideoItem[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string>("");
  const [activeVideoTitle, setActiveVideoTitle] = useState<string>("");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Search filter for playlist videos
  const [searchQuery, setSearchQuery] = useState("");

  // Tabs
  const [activeTab, setActiveTab] = useState<"notes" | "quiz" | "practice">("notes");

  // Dynamic Quiz State
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);

  // Personal Notes state
  const [personalNotes, setPersonalNotes] = useState<string>("");
  const [notesSaved, setNotesSaved] = useState(false);

  // Fetch course & playlist data
  useEffect(() => {
    let isMounted = true;
    api.getCourse(courseId).then(async (c) => {
      if (!isMounted) return;
      setCourse(c);

      // Identify initial resource
      const initialRes = c.resources?.[0] || null;
      setActiveResource(initialRes);

      // Load playlist videos
      let videos: PlaylistVideoItem[] = [];
      if (initialRes && initialRes.type === "youtube_playlist" && initialRes.playlistId) {
        try {
          const plData = await api.getPlaylist(initialRes.playlistId);
          videos = plData.videos || [];
        } catch {
          videos = c.playlistVideos || [];
        }
      } else if (c.playlistVideos && c.playlistVideos.length > 0) {
        videos = c.playlistVideos;
      }

      setPlaylistVideos(videos);

      // Determine initial video ID:
      // Priority 1: initialVideoId prop
      // Priority 2: user's lastWatchedVideos for this course
      // Priority 3: initialLessonId matching video or lesson
      // Priority 4: first video of playlist
      const lastWatched = user?.lastWatchedVideos?.[c.id];
      let selectedVid = initialVideoId || lastWatched?.videoId || "";

      if (!selectedVid && initialLessonId) {
        // Try match initialLessonId to videoId
        const matched = videos.find(v => v.videoId === initialLessonId || `les_${courseId}_${v.videoId}` === initialLessonId);
        if (matched) {
          selectedVid = matched.videoId;
        }
      }

      if (!selectedVid && videos.length > 0) {
        selectedVid = videos[0].videoId;
      } else if (!selectedVid && initialRes?.videoId) {
        selectedVid = initialRes.videoId;
      }

      const activeItem = videos.find(v => v.videoId === selectedVid) || videos[0];
      const targetVidId = activeItem?.videoId || selectedVid || "E6tAtRi82QY";
      const targetTitle = activeItem?.title || initialRes?.title || c.title;

      setActiveVideoId(targetVidId);
      setActiveVideoTitle(targetTitle);

      // Set fallback activeLesson for tabs
      const targetLesson: Lesson = {
        id: `les_${c.id}_${targetVidId}`,
        moduleId: "mod_playlist",
        courseId: c.id,
        title: targetTitle,
        description: `Curriculum video #${activeItem?.position || 1}: ${targetTitle}`,
        youtubeUrl: `https://www.youtube.com/watch?v=${targetVidId}`,
        durationMinutes: 30,
        topic: c.category,
        difficulty: (activeItem?.position || 1) < 3 ? "Beginner" : (activeItem?.position || 1) < 10 ? "Intermediate" : "Advanced",
        order: activeItem?.position || 1,
        notesMarkdown: `### ${targetTitle}\n\n- **Course Track**: ${c.track || c.category}\n- **Video Number**: #${activeItem?.position || 1}\n- **YouTube Video ID**: \`${targetVidId}\`\n\nTake active notes while watching and test your understanding with dynamic quizzes.`,
        keyTakeaways: [
          `Understand key concepts explained in "${targetTitle}"`,
          "Follow along with live coding and implementation examples"
        ]
      };
      setActiveLesson(targetLesson);

      // Load saved notes for this video from localStorage
      try {
        const savedNote = localStorage.getItem(`notes_${c.id}_${targetVidId}`);
        if (savedNote) setPersonalNotes(savedNote);
        else setPersonalNotes("");
      } catch {}
    });

    return () => {
      isMounted = false;
    };
  }, [courseId, initialLessonId, initialVideoId]);

  // Handle switching learning resources (e.g. React single video vs playlist)
  const handleSelectResource = async (resource: CourseResource) => {
    setActiveResource(resource);
    if (resource.type === "youtube_playlist" && resource.playlistId) {
      try {
        const plData = await api.getPlaylist(resource.playlistId);
        const vids = plData.videos || [];
        setPlaylistVideos(vids);
        if (vids.length > 0) {
          handleSelectVideo(vids[0]);
        }
      } catch {
        if (course?.playlistVideos) {
          setPlaylistVideos(course.playlistVideos);
          if (course.playlistVideos.length > 0) {
            handleSelectVideo(course.playlistVideos[0]);
          }
        }
      }
    } else if (resource.type === "youtube_video" && resource.videoId) {
      setPlaylistVideos([]);
      setActiveVideoId(resource.videoId);
      setActiveVideoTitle(resource.title);
      if (course) {
        const customLesson: Lesson = {
          id: `les_${course.id}_${resource.videoId}`,
          moduleId: "mod_single",
          courseId: course.id,
          title: resource.title,
          description: resource.description || resource.title,
          youtubeUrl: resource.url,
          durationMinutes: 180,
          topic: course.category,
          difficulty: "Beginner",
          order: 1,
          notesMarkdown: `### ${resource.title}\n\nComprehensive single-video masterclass covering all fundamental concepts.`,
          keyTakeaways: [
            "Comprehensive end-to-end masterclass tutorial",
            "Build practical projects alongside the video"
          ]
        };
        setActiveLesson(customLesson);
      }
    }
  };

  // Switch active video in playlist
  const handleSelectVideo = (video: PlaylistVideoItem) => {
    setActiveVideoId(video.videoId);
    setActiveVideoTitle(video.title);

    if (course) {
      const lesson: Lesson = {
        id: `les_${course.id}_${video.videoId}`,
        moduleId: "mod_playlist",
        courseId: course.id,
        title: video.title,
        description: `Official playlist video #${video.position}: ${video.title}`,
        youtubeUrl: `https://www.youtube.com/watch?v=${video.videoId}&list=${video.playlistId}`,
        durationMinutes: 30,
        topic: course.category,
        difficulty: video.position < 3 ? "Beginner" : video.position < 10 ? "Intermediate" : "Advanced",
        order: video.position,
        notesMarkdown: `### ${video.title}\n\n- **Course Track**: ${course.track || course.category}\n- **Video Number**: #${video.position}\n- **YouTube Video ID**: \`${video.videoId}\`\n\nTake active notes while watching and test your understanding with dynamic quizzes.`,
        keyTakeaways: [
          `Master core concepts in "${video.title}"`,
          "Follow code examples and build practical intuition"
        ]
      };
      setActiveLesson(lesson);

      // Record watch history to backend
      api.recordWatchHistory({
        courseId: course.id,
        playlistId: video.playlistId,
        videoId: video.videoId,
        videoTitle: video.title,
      }).catch(console.warn);

      // Load saved notes for this video
      try {
        const savedNote = localStorage.getItem(`notes_${course.id}_${video.videoId}`);
        if (savedNote) setPersonalNotes(savedNote);
        else setPersonalNotes("");
      } catch {}
    }
  };

  // Find current index in playlist
  const currentIndex = useMemo(() => {
    return playlistVideos.findIndex(v => v.videoId === activeVideoId);
  }, [playlistVideos, activeVideoId]);

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < playlistVideos.length - 1;

  const handlePreviousVideo = () => {
    if (hasPrevious) {
      handleSelectVideo(playlistVideos[currentIndex - 1]);
    }
  };

  const handleNextVideo = () => {
    if (hasNext) {
      handleSelectVideo(playlistVideos[currentIndex + 1]);
    }
  };

  // Completion calculation
  const completedIds = useMemo(() => {
    const fromUser = user?.completedVideoIds || user?.completedLessonIds || [];
    return new Set(fromUser);
  }, [user]);

  const isCurrentVideoCompleted = isLessonCompleted(courseId, activeVideoId) || (activeLesson ? isLessonCompleted(courseId, activeLesson.id) : false);

  const totalVideosCount = playlistVideos.length > 0 ? playlistVideos.length : (course?.totalLessons || 1);
  const completedCount = useMemo(() => {
    if (playlistVideos.length > 0) {
      return playlistVideos.filter(v => isLessonCompleted(courseId, v.videoId)).length;
    }
    return isCurrentVideoCompleted ? 1 : 0;
  }, [playlistVideos, courseId, isLessonCompleted, isCurrentVideoCompleted]);

  const progressPercentage = Math.min(100, Math.round((completedCount / (totalVideosCount || 1)) * 100));

  // Mark video complete handler
  const handleCompleteVideo = async () => {
    if (!course || isCurrentVideoCompleted) return;
    try {
      await markVideoComplete(course.id, activeVideoId, {
        playlistId: activeResource?.playlistId,
        videoTitle: activeVideoTitle,
      });
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (e) {
      console.error("Failed to mark video complete:", e);
    }
  };

  // Save personal notes
  const handleSaveNotes = () => {
    if (!course || !activeVideoId) return;
    try {
      localStorage.setItem(`notes_${course.id}_${activeVideoId}`, personalNotes);
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
    } catch {}
  };

  // Dynamic Quiz Generator
  const handleGenerateQuiz = async () => {
    if (!course) return;
    setQuizLoading(true);
    setQuizSubmitted(false);
    setQuizAnswers({});
    try {
      const res = await api.generateQuiz(
        course.category,
        activeLesson?.difficulty || "Beginner",
        `Video: "${activeVideoTitle}". Track: ${course.track || course.category}`
      );
      setQuizQuestions(res.questions || []);
    } catch (e) {
      console.error(e);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleQuizSubmit = async () => {
    if (!course) return;
    let correct = 0;
    const answersPayload = (quizQuestions || []).map((q, idx) => {
      const isCor = quizAnswers[idx] === q.correctOptionIndex;
      if (isCor) correct++;
      return { questionId: q.id, selectedOption: quizAnswers[idx] ?? -1 };
    });

    const score = Math.round((correct / (quizQuestions.length || 1)) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);

    if (score >= 70) {
      confetti({ particleCount: 70, spread: 70 });
    }

    await api.submitQuiz({
      topic: course.category,
      answers: answersPayload,
      timeSpentSeconds: 90,
      questions: quizQuestions,
    });
    await refreshProfile();
  };

  // Filter videos by search query
  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return playlistVideos;
    const q = searchQuery.toLowerCase();
    return playlistVideos.filter(v => v.title.toLowerCase().includes(q) || `#${v.position}`.includes(q));
  }, [playlistVideos, searchQuery]);

  if (!course) {
    return (
      <div className="p-12 text-center text-zinc-500 font-mono">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-orange-500 mb-2" />
        <p>Loading course content...</p>
      </div>
    );
  }

  // Construct iframe embed URL
  const embedUrl = `https://www.youtube-nocookie.com/embed/${activeVideoId}?rel=0&autoplay=0${
    activeResource?.playlistId ? `&list=${activeResource.playlistId}` : ""
  }`;

  const youtubeDirectUrl = activeResource?.playlistId
    ? `https://www.youtube.com/watch?v=${activeVideoId}&list=${activeResource.playlistId}`
    : `https://www.youtube.com/watch?v=${activeVideoId}`;

  // Check if returning user has last watched video that is different from current
  const lastWatchedItem = user?.lastWatchedVideos?.[course.id];
  const showResumePrompt = lastWatchedItem && lastWatchedItem.videoId !== activeVideoId && playlistVideos.some(v => v.videoId === lastWatchedItem.videoId);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden bg-[#09090b] text-zinc-100 font-sans">
      {/* Left / Main: Video Player, Resource Switcher, Controls & Tabs */}
      <div className="flex-1 flex flex-col overflow-y-auto border-r border-zinc-800">
        {/* Top Header Bar */}
        <div className="px-4 py-3 bg-[#0e0e12] border-b border-zinc-800 flex items-center justify-between gap-3 sticky top-0 z-20">
          <div className="flex items-center gap-3 truncate">
            <button
              onClick={() => setSelectedCourseId(null)}
              className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
            <span className="text-zinc-700">/</span>
            <span className="text-xs font-mono font-bold text-orange-400 truncate">{course.title}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Progress indicator */}
            <div className="hidden sm:flex items-center gap-2 bg-[#141418] px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-mono">
              <span className="text-zinc-400">Progress:</span>
              <span className="font-bold text-orange-400">{completedCount}/{totalVideosCount}</span>
              <div className="w-16 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
              </div>
              <span className="text-[11px] text-zinc-500">{progressPercentage}%</span>
            </div>

            <button
              id="btn-mark-video-complete"
              onClick={handleCompleteVideo}
              disabled={isCurrentVideoCompleted}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition ${
                isCurrentVideoCompleted
                  ? "bg-zinc-800 text-orange-400 border border-orange-500/30"
                  : "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCurrentVideoCompleted ? "COMPLETED" : "MARK COMPLETE (+50 XP)"}</span>
            </button>
          </div>
        </div>

        {/* Resume learning notification banner */}
        {showResumePrompt && (
          <div className="bg-orange-500/10 border-b border-orange-500/30 px-4 py-2.5 flex items-center justify-between gap-3 text-xs font-mono text-orange-300">
            <div className="flex items-center gap-2 truncate">
              <Bookmark className="w-4 h-4 text-orange-400 shrink-0" />
              <span className="truncate">
                Resume where you left off: <strong className="text-white">{lastWatchedItem.videoTitle || "Last watched video"}</strong>
              </span>
            </div>
            <button
              onClick={() => {
                const target = playlistVideos.find(v => v.videoId === lastWatchedItem.videoId);
                if (target) handleSelectVideo(target);
              }}
              className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded font-bold uppercase text-[11px] shrink-0 transition"
            >
              Resume Video
            </button>
          </div>
        )}

        {/* Embedded Video Area */}
        <div className="w-full bg-black aspect-video max-h-[480px] relative">
          <iframe
            key={activeVideoId}
            src={embedUrl}
            title={activeVideoTitle}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Player Navigation Controls Bar */}
        <div className="px-4 py-3 bg-[#111116] border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              id="btn-prev-video"
              onClick={handlePreviousVideo}
              disabled={!hasPrevious}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181e] hover:bg-[#22222a] disabled:opacity-40 disabled:hover:bg-[#18181e] text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono font-bold transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs font-mono text-zinc-400 px-2 py-1 bg-[#09090b] rounded border border-zinc-800">
              {currentIndex >= 0 ? `Video ${currentIndex + 1} of ${playlistVideos.length}` : "Video Course"}
            </span>

            <button
              id="btn-next-video"
              onClick={handleNextVideo}
              disabled={!hasNext}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181e] hover:bg-[#22222a] disabled:opacity-40 disabled:hover:bg-[#18181e] text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono font-bold transition"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={youtubeDirectUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#18181e] text-zinc-400 hover:text-white border border-zinc-800 text-xs font-mono transition"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Learning Resources Selector (For courses with multiple tracks like React.js) */}
        {course.resources && course.resources.length > 1 && (
          <div className="bg-[#121216] border-b border-zinc-800 p-4 space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-orange-400">
              <Video className="w-3.5 h-3.5" />
              <span>Course Tracks & Resources ({course.resources.length})</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {course.resources.map((res, idx) => {
                const isSelected = activeResource?.id === res.id;
                return (
                  <div
                    key={res.id || idx}
                    onClick={() => handleSelectResource(res)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? "bg-[#1c1c24] border-orange-500 text-white shadow-md shadow-orange-500/10"
                        : "bg-[#141418] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className={`p-2 rounded-lg shrink-0 ${isSelected ? "bg-orange-500 text-white" : "bg-zinc-800 text-zinc-400"}`}>
                        {res.type === "youtube_playlist" ? <ListVideo className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-mono font-bold truncate text-white">{res.title}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">
                          {res.type === "youtube_playlist" ? `YouTube Playlist (${res.videoCount || playlistVideos.length} Videos)` : "Complete Standalone Video"}
                        </div>
                      </div>
                    </div>

                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded shrink-0 ${
                      isSelected ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "bg-black/50 text-zinc-500"
                    }`}>
                      {isSelected ? "ACTIVE" : "SELECT"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Video Info Header */}
        <div className="p-5 border-b border-zinc-800 bg-[#0e0e12]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-orange-400 mb-1.5">
            <span>{course.category}</span>
            <span>•</span>
            <span>{course.track || "Curriculum"}</span>
            {currentIndex >= 0 && (
              <>
                <span>•</span>
                <span className="text-zinc-400">Position #{currentIndex + 1}</span>
              </>
            )}
          </div>
          <h2 className="text-xl font-bold text-white font-mono tracking-tight leading-snug">{activeVideoTitle}</h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed max-w-3xl">
            {course.description}
          </p>
        </div>

        {/* Interactive Tabs Navigation */}
        <div className="flex border-b border-zinc-800 bg-[#09090b] px-5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition shrink-0 ${
              activeTab === "notes"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notes & Scratchpad</span>
          </button>
          <button
            onClick={() => {
              setActiveTab("quiz");
              if (quizQuestions.length === 0) handleGenerateQuiz();
            }}
            className={`px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition shrink-0 ${
              activeTab === "quiz"
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Dynamic Quiz</span>
          </button>
          {activeLesson?.practiceProblemIds && activeLesson.practiceProblemIds.length > 0 && (
            <button
              onClick={() => setActiveTab("practice")}
              className={`px-4 py-3 text-xs font-mono font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition shrink-0 ${
                activeTab === "practice"
                  ? "border-orange-500 text-orange-400"
                  : "border-transparent text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>DSA Practice ({activeLesson.practiceProblemIds.length})</span>
            </button>
          )}
        </div>

        {/* Tab Contents */}
        <div className="p-5 flex-1 overflow-y-auto">
          {activeTab === "notes" && (
            <div className="space-y-6 max-w-3xl">
              {/* Technical Takeaways */}
              {activeLesson?.keyTakeaways && activeLesson.keyTakeaways.length > 0 && (
                <div className="p-4 rounded-xl bg-[#121215] border border-orange-500/20 space-y-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-orange-400">
                    Core Technical Takeaways:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                    {activeLesson.keyTakeaways.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Personal Notes Scratchpad */}
              <div className="p-4 rounded-xl bg-[#121215] border border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-orange-400" />
                    <span>Personal Notes & Code Snippets</span>
                  </h4>
                  {notesSaved && (
                    <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Saved!
                    </span>
                  )}
                </div>
                <textarea
                  rows={6}
                  placeholder="Take timestamped notes or write code snippets while watching this video..."
                  value={personalNotes}
                  onChange={(e) => setPersonalNotes(e.target.value)}
                  className="w-full bg-[#09090b] text-xs text-zinc-200 p-3 rounded-lg border border-zinc-800 focus:outline-none focus:border-orange-500 font-mono leading-relaxed resize-y"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded text-xs font-mono font-bold uppercase transition"
                  >
                    Save Notes
                  </button>
                </div>
              </div>

              {/* Overview Markdown */}
              {activeLesson?.notesMarkdown && (
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap font-sans text-zinc-300 leading-relaxed">
                  {activeLesson.notesMarkdown}
                </div>
              )}
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold font-mono text-white">Video Mastery Quiz</h4>
                  <p className="text-xs text-zinc-400">Dynamic assessment generated specifically for this video.</p>
                </div>
                <button
                  onClick={handleGenerateQuiz}
                  disabled={quizLoading}
                  className="px-3 py-1.5 rounded-lg bg-[#18181c] border border-zinc-800 hover:bg-zinc-800 text-xs font-mono font-bold text-orange-400 flex items-center gap-1.5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Regenerate</span>
                </button>
              </div>

              {quizLoading ? (
                <div className="py-8 text-center text-zinc-400 text-xs font-mono">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto text-orange-500 mb-2" />
                  Generating dynamic quiz questions...
                </div>
              ) : (
                <div className="space-y-6">
                  {(quizQuestions || []).map((q, qIdx) => (
                    <div key={q.id || qIdx} className="p-4 rounded-xl bg-[#121215] border border-zinc-800 space-y-3">
                      <div className="text-xs font-mono font-bold text-white">
                        {qIdx + 1}. {q.question}
                      </div>
                      <div className="space-y-2">
                        {(q.options || []).map((opt, optIdx) => {
                          const isSelected = quizAnswers[qIdx] === optIdx;
                          const isCorrect = q.correctOptionIndex === optIdx;

                          let btnStyle = "bg-[#09090b] border-zinc-800 text-zinc-300 hover:border-zinc-700";
                          if (quizSubmitted) {
                            if (isCorrect) btnStyle = "bg-zinc-900 border-emerald-500 text-emerald-400";
                            else if (isSelected) btnStyle = "bg-zinc-900 border-rose-500 text-rose-400";
                          } else if (isSelected) {
                            btnStyle = "bg-[#18181c] border-orange-500 text-orange-400";
                          }

                          return (
                            <button
                              key={optIdx}
                              disabled={quizSubmitted}
                              onClick={() => setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                              className={`w-full text-left p-3 rounded-lg border text-xs font-mono transition flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {quizSubmitted && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-3 rounded-lg bg-[#09090b] border border-zinc-800 text-xs text-zinc-400 font-mono">
                          <strong className="text-orange-400">Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  ))}

                  {!quizSubmitted && quizQuestions.length > 0 && (
                    <button
                      onClick={handleQuizSubmit}
                      className="px-6 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition shadow-lg shadow-orange-500/25"
                    >
                      Submit Quiz for Evaluation
                    </button>
                  )}

                  {quizSubmitted && (
                    <div className="p-4 rounded-xl bg-[#121215] border border-orange-500/30 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold font-mono text-orange-400">Score: {quizScore}%</div>
                        <p className="text-xs text-zinc-400">
                          {quizScore! >= 70
                            ? "Great job! Your understanding is verified."
                            : "Review the video concepts and try again!"}
                        </p>
                      </div>
                      <button
                        onClick={handleGenerateQuiz}
                        className="px-4 py-2 rounded-lg bg-[#18181c] border border-zinc-800 text-xs font-mono font-bold text-white hover:bg-zinc-800"
                      >
                        Try Another Set
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "practice" && activeLesson?.practiceProblemIds && (
            <div className="space-y-4 max-w-2xl">
              <h4 className="text-sm font-bold font-mono text-white">Linked DSA Practice Challenges</h4>
              {activeLesson.practiceProblemIds.map((pid) => (
                <div
                  key={pid}
                  className="p-4 rounded-xl bg-[#121215] border border-zinc-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-bold text-xs text-white font-mono">Linked Placement Problem</h5>
                      <p className="text-[11px] text-zinc-400 font-mono">{course.category} • Placement Bridge</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigateToProblem(pid)}
                    className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold uppercase tracking-wider transition"
                  >
                    Solve in Sandbox
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right: Complete Sequential YouTube Playlist Video List */}
      <div className="w-full lg:w-96 shrink-0 bg-[#0c0c0e] border-l border-zinc-800 flex flex-col h-full overflow-hidden">
        {/* Playlist Header */}
        <div className="p-4 border-b border-zinc-800 bg-[#101014] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListVideo className="w-4 h-4 text-orange-500" />
              <h3 className="font-bold text-xs uppercase font-mono tracking-wider text-white">Playlist Content</h3>
            </div>
            <span className="text-[11px] font-mono text-zinc-400 bg-[#18181f] px-2 py-0.5 rounded border border-zinc-800">
              {completedCount}/{totalVideosCount} Done
            </span>
          </div>

          {/* Quick Search */}
          {playlistVideos.length > 5 && (
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-500" />
              <input
                type="text"
                placeholder="Search playlist videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#09090b] text-xs font-mono text-white pl-8 pr-3 py-1.5 rounded-lg border border-zinc-800 focus:outline-none focus:border-orange-500"
              />
            </div>
          )}
        </div>

        {/* Video Items List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {playlistVideos.length === 0 ? (
            <div className="p-6 text-center text-zinc-500 font-mono text-xs">
              {activeResource?.type === "youtube_video" ? (
                <div className="space-y-2">
                  <Play className="w-6 h-6 mx-auto text-orange-500 fill-current" />
                  <p>Standalone Video Course</p>
                  <p className="text-[11px] text-zinc-600">This track is a single complete masterclass video.</p>
                </div>
              ) : (
                <p>No playlist videos found.</p>
              )}
            </div>
          ) : (
            filteredVideos.map((vid) => {
              const isActive = activeVideoId === vid.videoId;
              const isDone = completedIds.has(vid.videoId) || completedIds.has(`les_${courseId}_${vid.videoId}`);

              return (
                <button
                  key={vid.id || vid.videoId}
                  onClick={() => handleSelectVideo(vid)}
                  className={`w-full text-left p-2.5 rounded-xl border transition flex items-start gap-3 ${
                    isActive
                      ? "bg-[#1c1c24] border-orange-500 shadow-md shadow-orange-500/10"
                      : "bg-[#121216] border-zinc-800/80 hover:bg-[#18181e] hover:border-zinc-700"
                  }`}
                >
                  {/* Thumbnail / Position */}
                  <div className="relative w-16 h-10 shrink-0 rounded-lg overflow-hidden bg-black border border-zinc-800">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      {isActive ? (
                        <div className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center">
                          <Play className="w-2.5 h-2.5 text-white fill-current" />
                        </div>
                      ) : isDone ? (
                        <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                        </div>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-white drop-shadow">
                          {String(vid.position).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-mono text-zinc-500 font-bold">
                        #{String(vid.position).padStart(2, "0")}
                      </span>
                      {isDone && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
                          Done
                        </span>
                      )}
                      {isActive && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold uppercase">
                          Playing
                        </span>
                      )}
                    </div>
                    <h4 className={`text-xs font-mono line-clamp-2 leading-snug ${
                      isActive ? "text-orange-400 font-bold" : "text-zinc-300"
                    }`}>
                      {vid.title}
                    </h4>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
