# Chintan GPT — AI Learning, Coding & Placement Platform

[![React](https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Google GenAI](https://img.shields.io/badge/Google_Gemini-2.5_%26_3.7_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-0.54.0-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://microsoft.github.io/monaco-editor/)

> **Chintan GPT** is an enterprise-grade EdTech and placement acceleration platform designed for software engineering aspirants, campus graduates, and technical professionals. It consolidates structured video courses, an in-browser LeetCode-style algorithmic coding sandbox, a multi-language Cloud Playground IDE, a 200-question Product Tech DSA roadmap, System Design (HLD/LLD) masteries, Core CS fundamentals, company-specific hiring tracks (Google, Amazon, Microsoft, TCS, Infosys, HCL), and real-time AI mock interviews with speech synthesis and rubric evaluations.

---

## 📑 Table of Contents

- [Overview & Mission](#-overview--mission)
- [Key Value Propositions](#-key-value-propositions)
- [Core Platform Modules](#-core-platform-modules)
  - [1. Native LeetCode-Style Coding Sandbox](#1-native-leetcode-style-coding-sandbox)
  - [2. In-Editor AI Coding Assistant](#2-in-editor-ai-coding-assistant)
  - [3. Multi-Language Cloud Playground IDE](#3-multi-language-cloud-playground-ide)
  - [4. 200-Question Product Tech DSA Roadmap](#4-200-question-product-tech-dsa-roadmap)
  - [5. STEP 3: System Design & Architecture (HLD & LLD)](#5-step-3-system-design--architecture-hld--lld)
  - [6. STEP 4: Core CS Fundamentals](#6-step-4-core-cs-fundamentals)
  - [7. Company Placement Preparation Hub](#7-company-placement-preparation-hub)
  - [8. Real-Time AI Mock Placement Interview Simulator](#8-real-time-ai-mock-placement-interview-simulator)
  - [9. Search-Grounded Recruitment Intelligence](#9-search-grounded-recruitment-intelligence)
  - [10. Interactive Course Hub with YouTube Sync](#10-interactive-course-hub-with-youtube-sync)
  - [11. Analytics, XP, Streaks & Performance Metrics](#11-analytics-xp-streaks--performance-metrics)
  - [12. Admin & Audit Dashboard](#12-admin--audit-dashboard)
- [Technology Stack](#-technology-stack)
- [System Architecture & Resilience](#-system-architecture--resilience)
- [Project Directory Structure](#-project-directory-structure)
- [API Reference](#-api-reference)
- [Getting Started & Local Development](#-getting-started--local-development)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Running the Application](#running-the-application)
- [Demo Credentials](#-demo-credentials)
- [Deployment Guidelines](#-deployment-guidelines)
- [Security & Sandboxing Principles](#-security--sandboxing-principles)

---

## 🎯 Overview & Mission

Technical interviews and campus placement cycles demand multidisciplinary competence: algorithmic dexterity (DSA), core systems understanding (OS, DBMS, Computer Networks), architectural design (HLD/LLD), and behavioral communication under interview conditions.

**Chintan GPT** bridges the gap between passive video tutorials and rigorous technical recruitment standards by providing an integrated, interactive environment where learners can code, evaluate, analyze, simulate, and receive real-time feedback without switching between multiple external tools.

---

## 💎 Key Value Propositions

- **Zero-Friction Algorithmic Practice**: Run and test solutions against public and custom test cases directly in the browser with `node:vm` sandboxed execution.
- **Progressive AI Scaffolding**: Receive Level 1 and Level 2 hints that stimulate algorithmic deduction rather than immediately spoiling code solutions.
- **Enterprise Company Calibration**: Switch between Tier-1 Product Tech (Google, Amazon, Microsoft) and IT Services (TCS Prime/Digital/Ninja, Infosys, HCL) placement syllabi with curated aptitude banks and formula sheets.
- **Voice-Enabled Behavioral & Technical Simulations**: Experience multi-turn interview rounds featuring browser speech synthesis and multi-point rubric evaluations.
- **High-Resilience Multi-Model Fallbacks**: Built with cascading Google Gemini model chains (`gemini-2.5-flash`, `gemini-3.7-flash`, `gemini-flash-lite`, and deterministic SVG generators) to prevent quota disruption.

---

## 🚀 Core Platform Modules

### 1. Native LeetCode-Style Coding Sandbox
The coding workspace provides a focused IDE experience modeled after LeetCode and Codeforces:
- **Monaco Code Editor**: Integrated Microsoft Monaco editor with syntax highlighting, automatic indentation, bracket matching, and theme support.
- **Multi-Language Stubs**: Ready-to-use boilerplate templates for **Python 3**, **JavaScript (ES2024)**, **C++ (C++17/20)**, and **Java (Java 17/21)**.
- **Test Case Execution Engine**: Run code against pre-configured sample inputs, hidden evaluation cases, or user-defined custom test inputs with normalized stdout/stderr streams.
- **Performance Diagnostics**: Measures runtime execution duration (ms), auxiliary memory consumption (MB), and execution status flags (`Accepted`, `Wrong Answer`, `Runtime Error`, `Compilation Error`, `Time Limit Exceeded`).
- **Submissions & Editorial**: Historical submission logs with timestamping, pass ratios, and detailed editorial solution breakdowns.

### 2. In-Editor AI Coding Assistant
Embedded directly within the code editor toolbar to assist candidates in their algorithmic thought process:
- **Progressive Hints (Level 1 & Level 2)**: Subtly guides candidates on invariants, pointer relations, and optimal data structure selection without writing full code.
- **Step-by-Step Approach Explanation**: Outlines optimal intuition, state transitions, and recurrence relations.
- **Line-by-Line Code Breakdown**: Analyzes candidate code line-by-line to explain current mechanics.
- **Targeted Code Debugging**: Scans for off-by-one errors, null dereferences, integer overflow risks, and unbalanced conditions.
- **Runtime Error Diagnostics**: Decodes stack traces and test case discrepancies into actionable remediation steps.
- **Complexity Analysis**: Delivers formal Big-O time complexity and space complexity calculations.
- **Dynamic Visual Schematics**: Generates technical SVG schematics and visual state-transition diagrams to explain complex pointer or DP table states.

### 3. Multi-Language Cloud Playground IDE
A full-featured in-browser software development environment:
- **10+ Supported Runtimes & Frameworks**: Node.js, TypeScript, Python 3, C++, Java, Kotlin, React (with live preview iframe), Next.js, and HTML5/CSS3/Vanilla JS.
- **Multi-File Workspace**: Create, rename, edit, and organize multiple source files within a virtual project tree.
- **Interactive Stdin Console & Terminal**: Stream custom input values to programs and receive standard output and diagnostic errors.
- **Web App Live Sandbox**: Safely renders client-side web applications in an isolated sandboxed iframe.
- **Project Export & Import**: Export workspaces as JSON bundles or import project archives with zero setup.

### 4. 200-Question Product Tech DSA Roadmap
A structured curriculum spanning 10 high-impact batches calibrated for Tier-1 technology companies:
- **Batch 1**: Arrays & Hashing (Two Sum, Group Anagrams, Top K Frequent, Longest Consecutive Sequence)
- **Batch 2**: Two Pointers & Sliding Window (3Sum, Container With Most Water, Trapping Rain Water, Min Window Substring)
- **Batch 3**: Binary Search & Prefix Sum (Search in Rotated Sorted Array, Koko Eating Bananas, Subarray Sum Equals K)
- **Batch 4**: Trees & Binary Search Trees (Invert Tree, Level Order Traversal, Validate BST, Lowest Common Ancestor)
- **Batch 5**: Graphs — BFS & DFS (Number of Islands, Course Schedule, Clone Graph, Word Ladder)
- **Batch 6**: Heaps, Priority Queues & Greedy (Kth Largest Element, Merge K Sorted Lists, Task Scheduler)
- **Batch 7**: Dynamic Programming — 1D & 2D (Coin Change, Longest Increasing Subsequence, Edit Distance, 0/1 Knapsack)
- **Batch 8**: Advanced Graphs (Dijkstra's Algorithm, Bellman-Ford, Disjoint Set Union, Minimum Spanning Trees)
- **Batch 9**: Advanced Data Structures (Trie Prefix Trees, Segment Trees, Fenwick Trees, LRU Cache)
- **Batch 10**: Final Master Drill (Hard Multi-Concept Challenges, Slop-Resistant System Algorithms)

### 5. STEP 3: System Design & Architecture (HLD & LLD)
Dedicated architectural modules covering scalable web applications and distributed backends:
- **High-Level Design (HLD)**: Distributed URL Shortener, Uber/Ride Sharing Geo-dispatch, WhatsApp Chat System, Netflix Video Streaming Architecture, Distributed Rate Limiter.
- **Low-Level Design (LLD) & Object-Oriented Design (OOD)**: Parking Lot System, Movie Ticket Booking (BookMyShow), Splitwise Expense Sharing, Elevator System.
- **Core Scalability Patterns**: Horizontal Scaling, Load Balancing (Round Robin, Least Connections, Consistent Hashing), Caching Strategies (Write-Through, Write-Back, Cache-Aside), Database Sharding & Partitioning, Message Brokers (Kafka, RabbitMQ), CAP Theorem & PACELC.

### 6. STEP 4: Core CS Fundamentals
Curated theoretical and practical interview modules covering computer science pillars:
- **Operating Systems**: Processes vs. Threads, Concurrency & Synchronization (Mutex, Semaphores), Deadlock Avoidance (Banker's Algorithm), CPU Scheduling, Virtual Memory & Page Replacement.
- **Database Management Systems (DBMS)**: ACID Transactions, Normalization (1NF through BCNF), Indexing Mechanisms (B-Trees, Hash Index), SQL vs. NoSQL Trade-offs, Distributed Transactions (2PC).
- **Computer Networks**: OSI & TCP/IP Reference Models, TCP Three-Way Handshake, Flow & Congestion Control, HTTP/1.1 vs. HTTP/2 vs. HTTP/3, WebSockets, DNS Resolution Lifecycle.
- **Object-Oriented Programming (OOP)**: Encapsulation, Abstraction, Polymorphism, Inheritance, SOLID Principles, and Design Patterns (Singleton, Factory, Observer, Strategy).

### 7. Company Placement Preparation Hub
Targeted preparation paths tailored for specific organizational hiring standards:
- **Tier-1 Tech Companies**: Google, Amazon, Microsoft (focusing on DSA, behavioral leadership principles, and high-scale systems).
- **IT Services & Mass Recruiters**: TCS (Prime, Digital, and Ninja tracks), Infosys (Specialist Programmer), HCL Technologies.
- **Aptitude & Technical Question Banks**: Authentic questions with answer keys and complete step-by-step mathematical explanations covering:
  - Percentages & Profit/Loss
  - Averages & Alligations
  - Time, Work & Cisterns
  - Time, Speed & Distance
  - Simple & Compound Interest
  - Permutations & Combinations
  - Probability
  - LCM, HCF & Divisibility
  - Number Systems
  - Progressions (AP, GP, HP)
  - Geometry & Mensuration
  - Data Interpretation (Tables, Bar Graphs, Pie Charts)
- **Interactive Formula Sheets**: Dedicated modal cheatsheets providing quick formula reference during revision.

### 8. Real-Time AI Mock Placement Interview Simulator
Conducts realistic, multi-turn mock technical and behavioral interviews:
- **Company & Role Calibration**: Select target company (Google, Amazon, TCS, etc.), role (SDE-1, SDE Intern, Backend Engineer), round type, and difficulty.
- **Speech Synthesis (TTS)**: Leverages the browser Web Speech API (`SpeechSynthesis`) to vocalize interviewer questions and follow-ups.
- **Multi-Turn Adaptive Dialogues**: Adapts subsequent questions dynamically based on previous candidate answers and technical explanations.
- **Comprehensive Rubric Evaluation Scorecard**:
  - Technical Accuracy Score (%)
  - Problem-Solving Methodology Score (%)
  - Communication Clarity Score (%)
  - Solution Completeness Score (%)
  - Identified Strengths & Specific Areas for Improvement
  - Targeted Remediation Plan

### 9. Search-Grounded Recruitment Intelligence
- **Google Search Grounding**: Connects directly to Google Search to pull real-time company hiring patterns, recent eligibility guidelines, drive schedules, and interview round formats.
- **Source Verification**: Displays authentic web source citations alongside generated recruitment intelligence.

### 10. Interactive Course Hub with YouTube Sync
- **Curated Multi-Module Video Tracks**:
  - *HTML & CSS Foundations* (Hitesh Choudhary — 16 Lessons)
  - *JavaScript Mastery* (Hitesh Choudhary — 7 Lessons)
  - *Modern React.js Engineering* (Hitesh Choudhary — Standalone + Playlist)
  - *Backend Development with Node.js & Express* (Hitesh Choudhary — 29 Lessons)
  - *System Design & Distributed Systems* (Gaurav Sen — 40 Lessons)
  - *Data Structures & Algorithms in C++* (Shradha Khapra — 100 Lessons)
- **Live YouTube Data API v3 Sync**: Automatically fetches playlist updates, video metadata, and thumbnails with built-in fallback data.
- **Embedded Theater Player**: Watch video lectures, take notes in Markdown, review key takeaways, and jump to related coding exercises.

### 11. Analytics, XP, Streaks & Performance Metrics
- **Activity Heatmap & Streak Engine**: Computes daily qualifying activity, maintains consecutive streaks, and records longest streaks.
- **XP & Leveling Progression**: Awards experience points (XP) for lesson completions, problem submissions, and mock interview attempts.
- **Weak-Spot Diagnostic Radar**: Analyzes historical accuracy across algorithmic categories to flag weak topics.
- **Personalized AI Recommendations**: Generates tailored next steps based on candidate performance logs.

### 12. Admin & Audit Dashboard
- **Platform Analytics**: Total registered users, total coding submissions, quiz attempts, and active mock sessions.
- **Course & Playlist Synchronization**: Trigger live YouTube playlist re-syncs.
- **User Directory & Progress Auditing**: Inspect student levels, solved counts, target companies, and last-active timestamps.
- **Broadcast Announcements**: Publish platform announcements and placement drive alerts.

---

## 🛠 Technology Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| **React** | `19.0.1` | Declarative user interface library |
| **TypeScript** | `5.8.2` | Strong type safety across components and models |
| **Vite** | `6.2.3` | Ultra-fast bundling, HMR, and build orchestration |
| **Tailwind CSS** | `v4.1.14` | High-performance CSS utility engine (`@tailwindcss/vite`) |
| **Monaco Editor** | `0.54.0` | In-browser code editing engine (`@monaco-editor/react`) |
| **Motion** | `12.23.24` | Smooth transitions and state animations (`motion/react`) |
| **Canvas Confetti** | `1.9.4` | Milestone and interview completion celebration visual FX |
| **Lucide React** | `0.546.0` | Comprehensive iconography set |
| **React Markdown** | `10.1.0` | Formatted editorial, hints, and curriculum notes rendering |

### Backend & AI Infrastructure
| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | `>=20.0.0` | Server runtime environment (native ESM / CJS bundling) |
| **Express** | `4.21.2` | RESTful API server, routing, and middleware management |
| **Node VM (`node:vm`)**| Native | Sandboxed JavaScript test-case evaluation |
| **Language Adapters** | Custom | Sandboxing service for Python, C++, Java, Node, Kotlin, React |
| **@google/genai** | `2.4.0` | Official Google Gen AI TypeScript SDK |
| **Google Search Tool** | Grounding | Live web grounding for current recruitment patterns |
| **Esbuild** | `0.25.0` | Production backend bundler creating standalone `dist/server.cjs` |
| **TSX** | `4.21.0` | Zero-configuration TypeScript development runtime |

---

## 🏗 System Architecture & Resilience

```
                     ┌───────────────────────────────────────────────┐
                     │          Client Browser (React 19 SPA)        │
                     │  - Monaco Editor  - Web Speech Synthesis      │
                     │  - YouTube Embed  - Interactive Modals        │
                     └───────────────────────┬───────────────────────┘
                                             │ HTTP / JSON API
                                             ▼
                     ┌───────────────────────────────────────────────┐
                     │          Express Backend Server (Node.js)     │
                     │  - REST API Routes  - Auth & Profile Manager  │
                     │  - In-Memory DB     - Analytics & Streaks     │
                     └───┬───────────────────┬───────────────────┬───┘
                         │                   │                   │
         ┌───────────────▼────────┐ ┌────────▼────────┐ ┌────────▼────────┐
         │ Algorithmic Sandbox    │ │ Playground IDE  │ │ Google Gemini   │
         │ - node:vm JS runner    │ │ Execution Engine│ │ Cascading Chain │
         │ - Multi-lang syntax    │ │ - 10+ Runtimes  │ │ - 2.5 / 3.7     │
         │ - Boundary testcases   │ │ - Live Preview  │ │ - Search Ground │
         └────────────────────────┘ └─────────────────┘ └─────────────────┘
```

### High-Resilience AI Model Fallback Architecture
To prevent rate-limit interruptions (HTTP 429 / `RESOURCE_EXHAUSTED`), the backend implements cascading fallbacks:
1. **Primary Model**: `gemini-2.5-flash` for high-speed, cost-effective reasoning.
2. **Secondary Fallback**: `gemini-3.7-flash` for high-depth multi-turn coding analysis.
3. **Tertiary Fallback**: `gemini-flash-lite-preview` / `gemini-2.5-flash-lite` for high-throughput responses.
4. **Offline Deterministic Fallback**: Built-in algorithmic heuristic engines and dynamic SVG technical schematics render even during total network or API disconnections.

---

## 📂 Project Directory Structure

```
chintan-gpt/
├── api/
│   └── index.ts                 # Vercel serverless function entrypoint & CORS handler
├── server/
│   ├── adapters/                # Playground language execution adapters
│   │   ├── baseAdapter.ts       # Abstract sandbox execution adapter
│   │   ├── cppAdapter.ts        # C++ execution sandbox
│   │   ├── javaAdapter.ts       # Java execution sandbox
│   │   ├── pythonAdapter.ts     # Python execution sandbox
│   │   ├── nodeAdapter.ts       # Node.js execution sandbox
│   │   ├── reactAdapter.ts      # React live preview builder
│   │   └── ...                  # Additional language adapters
│   ├── data/                    # Server seed databases and metadata
│   │   ├── companies.ts         # Company placement syllabi & metadata
│   │   ├── courses.ts           # 6 Master courses with module lessons
│   │   ├── playlistData.json    # Cached YouTube playlist items
│   │   └── problems.ts          # Core algorithmic coding problems
│   ├── playground/              # Playground router & execution service
│   ├── codeRunner.ts            # LeetCode-style code execution engine (`node:vm`)
│   ├── db.ts                    # In-memory database with auth & user states
│   ├── gemini.ts                # AI integration, search grounding & fallbacks
│   ├── routes.ts                # Express REST API endpoints
│   └── youtubePlaylistService.ts# YouTube Data API v3 synchronization
├── src/
│   ├── components/
│   │   ├── Admin/               # Admin panel & announcement tools
│   │   ├── Analytics/           # Performance charts, XP & radar diagnostics
│   │   ├── Coding/              # Monaco CodeWorkspace, hints, problem list
│   │   ├── CompanyPrep/         # CompanyPrepHub, DSA & System Design modals
│   │   ├── Courses/             # CourseCatalog, CoursePlayer, WebDevHub
│   │   ├── Dashboard/           # Dashboard home, streaks & dynamic recs
│   │   ├── Interview/           # MockInterviewHub, voice synthesis & rubrics
│   │   ├── Playground/          # PlaygroundPage, files tree, terminal & preview
│   │   ├── Navbar.tsx           # Global navigation & profile indicator
│   │   ├── Sidebar.tsx          # Navigation drawer
│   │   └── SearchModal.tsx      # Global Cmd+K quick search switcher
│   ├── context/
│   │   ├── AppContext.tsx       # Navigation tabs, active course/problem state
│   │   └── AuthContext.tsx      # User authentication, XP, and streak tracking
│   ├── data/                    # Client data loaders, formula sheets, questions
│   ├── services/
│   │   └── api.ts               # Client HTTP communication service
│   ├── types/
│   │   └── index.ts             # Global TypeScript interfaces & data contracts
│   ├── App.tsx                  # Main application router and root layout
│   ├── main.tsx                 # React DOM mount point
│   └── index.css                # Global CSS with Tailwind CSS imports
├── metadata.json                # Platform capabilities and permissions configuration
├── package.json                 # Project dependencies and script declarations
├── server.ts                    # Local development and container production server
├── tsconfig.json                # TypeScript compiler configuration
├── vercel.json                  # Vercel serverless routing rules
└── vite.config.ts               # Vite bundler configuration
```

---

## 🔌 API Reference

### Authentication & Profile
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new student account (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Authenticate existing credentials (`email`, `password`) |
| `GET` | `/api/auth/me` | Fetch currently authenticated user session |
| `POST` | `/api/auth/update-profile` | Update profile information and avatars |
| `POST` | `/api/auth/set-targets` | Update target companies for interview preparation |

### Courses & Curriculum
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/courses` | List all structured courses with lesson counts |
| `GET` | `/api/courses/:id` | Fetch complete course curriculum and module lessons |
| `POST` | `/api/courses/:id/enroll` | Enroll the user in a specified course |
| `POST` | `/api/courses/:id/lessons/:lessonId/complete` | Mark a lesson completed and award XP |
| `POST` | `/api/courses/sync-playlists` | (Admin) Re-sync video playlists via YouTube API |

### Coding Problems & Execution
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/problems` | List all 200+ coding problems with difficulty and tags |
| `GET` | `/api/problems/:id` | Fetch specific problem description, starter stubs, testcases |
| `POST` | `/api/problems/:id/run` | Execute code against public or custom test inputs |
| `POST` | `/api/problems/:id/submit` | Evaluate code against all hidden testcases & record attempt |
| `GET` | `/api/problems/:id/submissions` | Retrieve user submission history for a problem |

### AI Coding Assistant & Interviews
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ai/coding-assist` | Request AI hint, approach explanation, debugging, or Big-O analysis |
| `POST` | `/api/ai/mock-interview/start` | Initialize a new company-calibrated AI mock interview |
| `POST` | `/api/ai/mock-interview/:id/respond` | Submit candidate response, receive feedback & next question |
| `GET` | `/api/ai/mock-interview/history` | Retrieve historical mock interview session scorecards |
| `POST` | `/api/ai/visualize` | Generate dynamic SVG algorithmic schematics or technical diagrams |
| `POST` | `/api/ai/grounding` | Query live recruitment patterns using Google Search Grounding |
| `GET` | `/api/ai/recommendations` | Get personalized adaptive learning recommendations |

### Cloud Playground Engine
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/playground/execute` | Execute multi-file code in Python, C++, Java, Node, etc. |
| `GET` | `/api/playground/health` | Check runtime availability and sandbox health status |

---

## 💻 Getting Started & Local Development

### Prerequisites
- **Node.js**: Version `20.x` or higher
- **npm**: Version `10.x` or higher
- **Google Gemini API Key**: Optional for enhanced AI reasoning (built-in offline fallbacks provided)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/chintan-gpt.git
   cd chintan-gpt
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the root directory (refer to `.env.example`):

```env
# Google Gemini API Key (for in-editor AI coding assistant & mock interviews)
GEMINI_API_KEY="your-gemini-api-key-here"

# Application URL (optional, defaults to local host)
APP_URL="http://localhost:3000"

# External Backend API URL (optional - leave empty to use native same-origin /api)
VITE_API_BASE_URL=""

# YouTube Data API v3 Key (optional - cached playlist metadata included)
YOUTUBE_API_KEY=""
```

### Running the Application

1. **Start the development server**:
   ```bash
   npm run dev
   ```
   The platform will be accessible at: **`http://localhost:3000`**

2. **Build for production**:
   ```bash
   npm run build
   ```
   This compiles the React frontend into `dist/` and bundles the Express server into `dist/server.cjs` via `esbuild`.

3. **Start the production server**:
   ```bash
   npm start
   ```

4. **Verify TypeScript compilation & linting**:
   ```bash
   npm run lint
   ```

---

## 🔑 Demo Credentials

The platform is pre-seeded with instant demo accounts for evaluation:

| Role | Email | Password | Access Privileges |
|---|---|---|---|
| **Admin** | `admin@chintangpt.com` | `admin123` | Full access to Admin Panel, Course Sync, Analytics & Curriculum |
| **Student** | `student@chintangpt.com` | `student123` | Full student workflow (Playground, Coding, Courses, Interviews) |

*You can also register a brand new account directly from the Sign In modal without any email verification required.*

---

## 🌐 Deployment Guidelines

### 1. Vercel Deployment (Serverless Architecture)
The project includes a production-ready `vercel.json` and serverless API bridge in `/api/index.ts`:
1. Import the repository into your **Vercel Dashboard**.
2. Set the Framework Preset to **Vite**.
3. Add environment variables (`GEMINI_API_KEY`, etc.) under **Settings > Environment Variables**.
4. Deploy. Vercel automatically routes `/api/*` to the serverless function and all other routes to the Vite SPA build.

### 2. Google Cloud Run / Docker Deployment
The application binds to host `0.0.0.0` and port `3000` by default:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/server.cjs"]
```

---

## 🔒 Security & Sandboxing Principles

- **Isolated Code Execution**: Client-submitted code in the coding sandbox is evaluated inside isolated `node:vm` contexts with strict execution timeout limits (1,500ms) to prevent infinite loops or memory exhaustion.
- **Server-Side API Key Shielding**: All calls to the Google Gemini API are proxied strictly through the Express backend. Secret API keys are never exposed to browser network tabs.
- **Playground Quota Protection**: Source files submitted to the Cloud Playground are bounded by payload size constraints (max 25 files, max 512KB per file, 10MB total payload).
- **Sanitized Audio & Voice Synthesis**: Interview speech synthesis sanitizes Markdown tags (`*`, `#`, `` ` ``, `_`) before passing text to the Web Speech engine for seamless, human-like voice delivery.

---

## 📄 License

This project is licensed under the **MIT License**. You are free to use, modify, and distribute this software for educational and commercial purposes.
