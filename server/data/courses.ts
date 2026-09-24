import { Course, PlaylistVideoItem, Lesson } from "../../src/types/index.js";
import playlistDataRaw from "./playlistData.json";

const playlistMap: Record<string, PlaylistVideoItem[]> = playlistDataRaw as any;

function createLessonsFromPlaylist(courseId: string, playlistId: string, topicName: string): Lesson[] {
  const vids = playlistMap[playlistId] || [];
  return vids.map((v, idx) => ({
    id: `les_${courseId}_${v.videoId}`,
    moduleId: `mod_${courseId}_playlist`,
    courseId,
    title: v.title,
    description: `Official playlist video #${v.position}: ${v.title}`,
    youtubeUrl: `https://www.youtube.com/watch?v=${v.videoId}&list=${playlistId}`,
    durationMinutes: 30,
    topic: topicName,
    difficulty: idx < 3 ? "Beginner" : idx < 10 ? "Intermediate" : "Advanced",
    order: v.position,
    notesMarkdown: `### ${v.title}\n\n- **Course Track**: ${topicName}\n- **Playlist Video**: #${v.position}\n- **YouTube Video ID**: \`${v.videoId}\`\n\nTake notes while watching the video, practice problem exercises, and test your understanding with dynamic quizzes.`,
    keyTakeaways: [
      `Master core concepts explained in "${v.title}"`,
      "Apply code examples locally or in sandbox",
      "Solve practical DSA exercises related to this topic"
    ]
  }));
}

export const SEED_COURSES: Course[] = [
  // 1. HTML & CSS
  {
    id: "course_html_css",
    title: "HTML & CSS",
    slug: "html-css-modern-frontend-foundations",
    category: "HTML & CSS",
    track: "Web Development",
    description: "Learn HTML, CSS, modern layouts, responsive web design, Flexbox, CSS Grid, and frontend fundamentals from the complete playlist.",
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=340&fit=crop",
    level: "Beginner",
    durationHours: 24,
    totalLessons: (playlistMap["PLbtI3_MArDOkxh7XzixN2G4NAGIVqTFon"] || []).length || 16,
    instructor: "Hitesh Choudhary",
    instructorTitle: "Lead Frontend Instructor",
    tags: ["HTML5", "CSS3", "Flexbox", "CSS Grid", "Responsive Design", "Modern CSS"],
    resources: [
      {
        id: "res_html_css_1",
        courseId: "course_html_css",
        title: "Complete HTML & CSS Playlist",
        type: "youtube_playlist",
        url: "https://youtube.com/playlist?list=PLbtI3_MArDOkxh7XzixN2G4NAGIVqTFon&si=9WwSozhEZ0doG0Gp",
        playlistId: "PLbtI3_MArDOkxh7XzixN2G4NAGIVqTFon",
        videoCount: (playlistMap["PLbtI3_MArDOkxh7XzixN2G4NAGIVqTFon"] || []).length || 16,
        order: 1,
        description: "Official complete HTML & CSS video playlist covering semantic markup, styling, box model, Flexbox, and responsive web design."
      }
    ],
    playlistVideos: playlistMap["PLbtI3_MArDOkxh7XzixN2G4NAGIVqTFon"] || [],
    modules: [
      {
        id: "mod_html_css_playlist",
        courseId: "course_html_css",
        title: "Playlist Content",
        description: "Complete sequential video curriculum from the official YouTube playlist.",
        order: 1,
        lessons: createLessonsFromPlaylist("course_html_css", "PLbtI3_MArDOkxh7XzixN2G4NAGIVqTFon", "HTML & CSS")
      }
    ]
  },

  // 2. JavaScript
  {
    id: "course_javascript",
    title: "JavaScript",
    slug: "javascript-fundamentals-to-advanced",
    category: "JavaScript",
    track: "Web Development",
    description: "Master JavaScript from foundations to advanced real-world projects: execution context, DOM manipulation, asynchronous programming, and placement interview prep.",
    thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&h=340&fit=crop",
    level: "Beginner",
    durationHours: 36,
    totalLessons: (playlistMap["PLbtI3_MArDOnNvk8CCCSR01CQ8B8iNh-A"] || []).length || 7,
    instructor: "Hitesh Choudhary",
    instructorTitle: "Lead JavaScript Instructor",
    tags: ["JavaScript", "ES6+", "Async/Await", "Event Loop", "Closures", "DOM APIs"],
    resources: [
      {
        id: "res_js_1",
        courseId: "course_javascript",
        title: "Complete JavaScript Playlist",
        type: "youtube_playlist",
        url: "https://youtube.com/playlist?list=PLbtI3_MArDOnNvk8CCCSR01CQ8B8iNh-A&si=ekZmP6Fg3_7hsJZ_",
        playlistId: "PLbtI3_MArDOnNvk8CCCSR01CQ8B8iNh-A",
        videoCount: (playlistMap["PLbtI3_MArDOnNvk8CCCSR01CQ8B8iNh-A"] || []).length || 7,
        order: 1,
        description: "Official complete JavaScript video playlist with real projects, advanced syntax, and placement readiness."
      }
    ],
    playlistVideos: playlistMap["PLbtI3_MArDOnNvk8CCCSR01CQ8B8iNh-A"] || [],
    modules: [
      {
        id: "mod_js_playlist",
        courseId: "course_javascript",
        title: "Playlist Content",
        description: "Complete sequential video curriculum from the official YouTube playlist.",
        order: 1,
        lessons: createLessonsFromPlaylist("course_javascript", "PLbtI3_MArDOnNvk8CCCSR01CQ8B8iNh-A", "JavaScript")
      }
    ]
  },

  // 3. React.js (Contains both single video and full playlist)
  {
    id: "course_react",
    title: "React.js",
    slug: "reactjs-modern-frontend-engineering",
    category: "React.js",
    track: "Web Development",
    description: "Learn modern React.js: JSX, components, state, hooks, context API, performance optimization, and full-stack application development.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=340&fit=crop",
    level: "Intermediate",
    durationHours: 32,
    totalLessons: 1 + ((playlistMap["PLbtI3_MArDOm777bemDCy1abP1t1Rnnbx"] || []).length || 5),
    instructor: "Hitesh Choudhary",
    instructorTitle: "Lead React Instructor",
    tags: ["React", "Hooks", "Context API", "Virtual DOM", "Tailwind CSS", "Frontend"],
    resources: [
      {
        id: "res_react_video",
        courseId: "course_react",
        title: "React Complete Course (Individual Video)",
        type: "youtube_video",
        url: "https://youtu.be/E6tAtRi82QY?si=ffz1tRLoRy8GsGiP",
        videoId: "E6tAtRi82QY",
        order: 1,
        description: "Complete standalone React.js video course covering complete frontend engineering in one master lesson."
      },
      {
        id: "res_react_playlist",
        courseId: "course_react",
        title: "Complete React.js Playlist",
        type: "youtube_playlist",
        url: "https://youtube.com/playlist?list=PLbtI3_MArDOm777bemDCy1abP1t1Rnnbx&si=V9zRJ0LrbwpRpNZE",
        playlistId: "PLbtI3_MArDOm777bemDCy1abP1t1Rnnbx",
        videoCount: (playlistMap["PLbtI3_MArDOm777bemDCy1abP1t1Rnnbx"] || []).length || 5,
        order: 2,
        description: "Official comprehensive React.js multi-part video series."
      }
    ],
    playlistVideos: playlistMap["PLbtI3_MArDOm777bemDCy1abP1t1Rnnbx"] || [],
    modules: [
      {
        id: "mod_react_single",
        courseId: "course_react",
        title: "React Complete Course",
        description: "Standalone master video resource.",
        order: 1,
        lessons: [
          {
            id: "les_react_single_video",
            moduleId: "mod_react_single",
            courseId: "course_react",
            title: "React Complete Course | Full Tutorial for Beginners to Pro",
            description: "Full in-depth video covering components, state, hooks, props, and UI mechanics.",
            youtubeUrl: "https://youtu.be/E6tAtRi82QY?si=ffz1tRLoRy8GsGiP",
            durationMinutes: 180,
            topic: "React Foundations",
            difficulty: "Beginner",
            order: 1,
            notesMarkdown: `### React Complete Course\n\n- Component architecture & JSX syntax\n- useState, useEffect, useCallback, useMemo\n- Props drilling vs React Context API\n- Building modern responsive user interfaces`,
            keyTakeaways: [
              "Understand React virtual DOM reconciler",
              "Maintain unidirectional data flow",
              "Leverage hooks for modular reusable state logic"
            ]
          }
        ]
      },
      {
        id: "mod_react_playlist",
        courseId: "course_react",
        title: "Playlist Content",
        description: "Complete sequential video curriculum from the official YouTube playlist.",
        order: 2,
        lessons: createLessonsFromPlaylist("course_react", "PLbtI3_MArDOm777bemDCy1abP1t1Rnnbx", "React.js")
      }
    ]
  },

  // 4. Backend Development
  {
    id: "course_backend",
    title: "Backend Development",
    slug: "backend-engineering-nodejs-express-databases",
    category: "Backend Development",
    track: "Web Development",
    description: "Learn Node.js, Express.js, MongoDB/PostgreSQL, authentication, RESTful APIs, middleware architecture, and production deployment.",
    thumbnail: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=340&fit=crop",
    level: "Intermediate",
    durationHours: 48,
    totalLessons: (playlistMap["PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH"] || []).length || 29,
    instructor: "Hitesh Choudhary",
    instructorTitle: "Lead Backend Instructor",
    tags: ["Node.js", "Express", "REST APIs", "Authentication", "MongoDB", "Backend"],
    resources: [
      {
        id: "res_backend_1",
        courseId: "course_backend",
        title: "Complete Backend Development Playlist",
        type: "youtube_playlist",
        url: "https://youtube.com/playlist?list=PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH&si=IneipvA-euaVQy-0",
        playlistId: "PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH",
        videoCount: (playlistMap["PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH"] || []).length || 29,
        order: 1,
        description: "Official comprehensive backend engineering playlist covering Node.js, Express, databases, and microservices."
      }
    ],
    playlistVideos: playlistMap["PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH"] || [],
    modules: [
      {
        id: "mod_backend_playlist",
        courseId: "course_backend",
        title: "Playlist Content",
        description: "Complete sequential video curriculum from the official YouTube playlist.",
        order: 1,
        lessons: createLessonsFromPlaylist("course_backend", "PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH", "Backend Development")
      }
    ]
  },

  // 5. System Design
  {
    id: "course_system_design",
    title: "System Design",
    slug: "system-design-distributed-systems-architecture",
    category: "System Design",
    track: "Web Development",
    description: "Master High-Level and Low-Level System Design, distributed systems, caching, message queues, database sharding, and scalability.",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=340&fit=crop",
    level: "Advanced",
    durationHours: 40,
    totalLessons: (playlistMap["PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"] || []).length || 40,
    instructor: "Gaurav Sen",
    instructorTitle: "System Design Architect",
    tags: ["System Design", "HLD", "LLD", "Scalability", "Microservices", "Distributed Systems"],
    resources: [
      {
        id: "res_sd_1",
        courseId: "course_system_design",
        title: "Complete System Design Playlist",
        type: "youtube_playlist",
        url: "https://youtube.com/playlist?list=PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT&si=f_iWZt1yr85lpar5",
        playlistId: "PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT",
        videoCount: (playlistMap["PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"] || []).length || 40,
        order: 1,
        description: "Official comprehensive system design playlist by Gaurav Sen covering design patterns, scaling, databases, and real-world architectures."
      }
    ],
    playlistVideos: playlistMap["PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT"] || [],
    modules: [
      {
        id: "mod_sd_playlist",
        courseId: "course_system_design",
        title: "Playlist Content",
        description: "Complete sequential video curriculum from the official YouTube playlist.",
        order: 1,
        lessons: createLessonsFromPlaylist("course_system_design", "PLQEaRBV9gAFvzp6XhcNFpk1WdOcyVo9qT", "System Design")
      }
    ]
  },

  // 6. Data Structures & Algorithms
  {
    id: "course_dsa",
    title: "Data Structures & Algorithms",
    slug: "data-structures-and-algorithms-complete-mastery",
    category: "Data Structures & Algorithms",
    track: "DSA Track",
    description: "Complete 100-video DSA course covering C++, Arrays, Strings, 2D Arrays, Recursion, Backtracking, Linked Lists, Stacks, Queues, Trees, and BSTs with LeetCode problems.",
    thumbnail: "https://images.unsplash.com/photo-1516116211227-bbc13c7c4c34?w=600&h=340&fit=crop",
    level: "Intermediate",
    durationHours: 75,
    totalLessons: (playlistMap["PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt"] || []).length || 100,
    instructor: "Shradha Khapra",
    instructorTitle: "DSA & Algorithmic Mentor",
    tags: ["DSA", "LeetCode", "Algorithms", "C++", "Interview Prep", "Data Structures"],
    resources: [
      {
        id: "res_dsa_1",
        courseId: "course_dsa",
        title: "Complete DSA Video Playlist (100 Videos)",
        type: "youtube_playlist",
        url: "https://youtube.com/playlist?list=PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt&si=bP2Jl4BcshARANSg",
        playlistId: "PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt",
        videoCount: (playlistMap["PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt"] || []).length || 100,
        order: 1,
        description: "Official complete 100-video DSA placement series by Shradha Khapra."
      }
    ],
    playlistVideos: playlistMap["PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt"] || [],
    modules: [
      {
        id: "mod_dsa_playlist",
        courseId: "course_dsa",
        title: "Playlist Content",
        description: "Complete sequential 100-video curriculum from the official YouTube playlist.",
        order: 1,
        lessons: createLessonsFromPlaylist("course_dsa", "PLfqMhTWNBTe137I_EPQd34TsgV6IO55pt", "DSA")
      }
    ]
  }
];
