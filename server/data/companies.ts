import { CompanyPrep } from "../../src/types/index.js";

export const COMMON_SERVICE_APTITUDE_CATEGORIES = [
  {
    name: "Numerical Ability (Quantitative Aptitude)",
    description: "Core arithmetic, algebra, modern math, and data analysis concepts required for placement assessments.",
    topics: [
      "Percentages & Successive Percentage Changes",
      "Profit, Loss & Marked Price / Discount",
      "Ratio, Proportion & Variations",
      "Averages, Mixtures & Alligations",
      "Time and Work & Pipes and Cisterns",
      "Time, Speed and Distance & Relative Speed (Trains, Boats)",
      "Simple & Compound Interest (Half-yearly/Quarterly compounding)",
      "Probability & Conditional Probability",
      "Permutations & Combinations (Arrangements & Selections)",
      "Number System, Divisibility Rules & Remainder Theorem",
      "LCM, HCF & Modular Arithmetic",
      "Data Interpretation (Bar Charts, Pie Charts, Line Graphs, Tables)",
      "Progressions (Arithmetic, Geometric, Harmonic Series)",
      "Geometry, Mensuration (2D/3D Surface Areas and Volumes)"
    ],
    sampleQuestionsCount: 120
  },
  {
    name: "Verbal Ability (English Communication)",
    description: "Grammar rules, sentence reconstruction, vocabulary, and reading comprehension passages.",
    topics: [
      "Reading Comprehension (Inference, Central Theme, Tone)",
      "Sentence Correction & Error Spotting (Subject-Verb Agreement, Tenses)",
      "Sentence Completion & Vocabulary in Context",
      "Para Jumbles & Sentence Rearrangement",
      "Synonyms, Antonyms & Contextual Usage",
      "Idioms, Phrases & Phrasal Verbs",
      "Prepositions, Conjunctions & Modifiers",
      "Active & Passive Voice, Direct & Indirect Speech"
    ],
    sampleQuestionsCount: 95
  },
  {
    name: "Reasoning Ability (Logical & Analytical)",
    description: "Deductive, analytical, and pattern recognition problems frequently tested in placement tests.",
    topics: [
      "Coding-Decoding & Letter-Number Series",
      "Blood Relations & Family Tree Deduction",
      "Direction Sense & Coordinate Mapping",
      "Syllogisms (Venn Diagrams, Deductive Logic)",
      "Linear & Circular Seating Arrangements",
      "Data Sufficiency & Analytical Puzzles",
      "Statement and Assumptions / Inferences / Conclusions",
      "Visual & Non-Verbal Spatial Reasoning (Pattern Matrix, Folding)"
    ],
    sampleQuestionsCount: 110
  }
];

export const COMMON_PRODUCT_TECH_CATEGORIES = [
  {
    name: "DSA & Problem Solving — 200 Problems",
    description: "Curated 200-problem algorithmic mastery syllabus covering foundational arrays to advanced dynamic programming and graph theory.",
    topics: [
      "Arrays & Hashing (Two Sum, Group Anagrams, Top K Frequent, Longest Consecutive Sequence)",
      "Strings, Two Pointers & Sliding Window (Trapping Rain Water, 3Sum, Longest Substring Without Repeating)",
      "Binary Search & Prefix Sum (Search in Rotated Array, Koko Eating Bananas, Subarray Sum Equals K)",
      "Trees & Binary Search Trees (Traversals, LCA, Maximum Path Sum, Serialize & Deserialize Tree)",
      "Graphs, BFS, DFS & Graph Algorithms (Number of Islands, Rotting Oranges, Course Schedule, Dijkstra)",
      "Heaps, Priority Queue & Greedy Algorithms (Median Stream, Merge K Sorted Lists, Task Scheduler, Candy)",
      "Dynamic Programming & Advanced DP (1D, 2D, Edit Distance, LIS, Interval DP, Super Egg Drop)",
      "Advanced Graphs, Shortest Path, MST & DSU (Minimax Dijkstra, Prim's MST, Kruskal DSU, Offline Queries, SCC)",
      "Advanced Data Structures & Multi-Pattern (Segment Trees, Fenwick Trees, Binary Lifting, Bitwise Tries)",
      "Final Extreme Tier-1 Challenge (Trapping Rain Water II, 3D BFS, Median Arrays, LFU Cache, Skyline)"
    ],
    sampleQuestionsCount: 200
  },
  {
    name: "System Design",
    description: "Comprehensive Low-Level Object Oriented Design (LLD / OOD) and High-Level Distributed Systems Architecture (HLD).",
    topics: [
      "LLD / OOD: SOLID Principles & Clean Object-Oriented Architecture",
      "LLD / OOD: GoF Design Patterns (Factory, Singleton, Strategy, Observer, Decorator, Adapter)",
      "LLD / OOD: Schema & Class Modeling (Parking Lot, Elevator System, Splitwise, Chess Game)",
      "LLD / OOD: Concurrency Primitives, Thread Pools, Mutexes & Read-Write Locks",
      "HLD: Scalability, Microservices Architecture, API Gateway & Reverse Proxy",
      "HLD: Load Balancing (L4 vs L7, Round Robin, Weighted, Consistent Hashing)",
      "HLD: Distributed Caching (Redis/Memcached), Eviction Policies & Invalidation Patterns",
      "HLD: Database Sharding, Replication, Indexing & CAP / PACELC Theorem",
      "HLD: Message Queues & Streaming (Kafka, RabbitMQ) for Event-Driven Systems",
      "HLD: Rate Limiting Algorithms (Token Bucket, Leaky Bucket, Sliding Window)",
      "HLD: High Availability, Fault Tolerance, Disaster Recovery & Latency Budgeting (SLA/SLO)"
    ],
    sampleQuestionsCount: 65
  },
  {
    name: "Core CS",
    description: "In-depth Computer Science fundamentals tested in Tier 1 and Product Tech technical interview rounds.",
    topics: [
      "OOP / OOD: Encapsulation, Inheritance, Polymorphism, Abstraction & Composition vs Inheritance",
      "DBMS & SQL: ACID Properties, Normalization (1NF to BCNF) & B-Tree / Hash Indexing",
      "DBMS & SQL: Concurrency Control, Transaction Isolation Levels (Dirty Read, Phantom Read) & MVCC",
      "DBMS & SQL: Complex SQL Queries, Joins, Window Functions, CTEs & Query Optimization",
      "Operating Systems: Processes vs Threads, CPU Scheduling & Context Switching Mechanics",
      "Operating Systems: Concurrency, Mutexes, Semaphores, Monitors & Deadlock Avoidance (Banker's)",
      "Operating Systems: Memory Management, Paging, TLB, Virtual Memory & Page Replacement (LRU)",
      "Computer Networks: OSI & TCP/IP 5-Layer Stack, TCP 3-Way Handshake, Flow & Congestion Control",
      "Computer Networks: HTTP/1.1, HTTP/2, HTTP/3 (QUIC), TLS/SSL Handshake, DNS Resolution & CDN",
      "Computer Networks: WebSockets, Long Polling, REST vs GraphQL vs gRPC Protocols",
      "Computer Architecture: CPU Instruction Pipeline, Branch Prediction & L1/L2/L3 Cache Hierarchy",
      "Computer Architecture: Memory Subsystems, Bus Architecture & Interrupt Handling"
    ],
    sampleQuestionsCount: 80
  },
  {
    name: "Machine Coding / Coding Assessment",
    description: "Timed 90-120 minute live implementation rounds evaluating clean code, modular architecture, separation of concerns, and working software.",
    topics: [
      "In-Memory Key-Value Store / Cache with TTL & Eviction (LRU/LFU)",
      "Expense Sharing Application (Splitwise) with Exact, Equal & Percentage Splits",
      "Multi-Level Parking Lot / Locker Management System",
      "Distributed Rate Limiter / Token Bucket with Concurrent Request Handling",
      "Snake and Ladder / Board Game Engine with Extensible Rules",
      "Clean Code, Design Patterns, SOLID Principles & Comprehensive Unit Tests"
    ],
    sampleQuestionsCount: 35
  },
  {
    name: "Company-Specific Interview Prep",
    description: "Tailored interview intelligence, past coding questions, architecture case studies, and assessment tracks.",
    topics: [
      "Company-Specific Past Interview Coding Problems & Pattern Breakdown",
      "Online Assessment (OA) Patterns, Codility/HackerRank/CodeSignal Screenings",
      "Large-Scale System Architecture Case Studies & Technical Trade-offs",
      "Bar Raiser & Senior Engineering Director Interview Strategy"
    ],
    sampleQuestionsCount: 45
  },
  {
    name: "Behavioral / HR / Resume & Project",
    description: "STAR method behavioral frameworks, engineering project defense, cultural values alignment, and leadership competencies.",
    topics: [
      "STAR Method Mastery: Situation, Task, Action & Quantifiable Business Result",
      "Resume Project Architecture Defense: Technical Choices, Bottlenecks & Trade-offs",
      "Leadership Principles & Company Culture Alignment (Ownership, Bias for Action, Customer Obsession)",
      "Handling Ambiguity, Conflicting Priorities, Tight Deadlines & Cross-Functional Alignment",
      "Failure Stories, Production Incident Post-Mortems & Key Engineering Learnings"
    ],
    sampleQuestionsCount: 40
  }
];

export const SEED_COMPANIES: CompanyPrep[] = [
  {
    id: "comp_tcs",
    name: "Tata Consultancy Services (TCS)",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&h=128&fit=crop&crop=faces",
    tier: "Service Based",
    description: "TCS National Qualifier Test (NQT), Digital, and Prime placement tracks. Covers high-weightage numerical aptitude, logical reasoning, verbal competency, pseudocode programming logic, and hands-on coding rounds.",
    hiringProcess: [
      "TCS NQT / Cognitive Assessment (Numerical, Reasoning, Verbal)",
      "Technical Pseudocode & Programming Logic Assessment",
      "Advanced Coding Round (1 Easy-Medium + 1 Medium-Hard Problem)",
      "Technical Interview (DSA, OOP, SQL, Web/Cloud Fundamentals)",
      "Managerial & HR Behavioral Interview"
    ],
    categories: [
      ...COMMON_SERVICE_APTITUDE_CATEGORIES,
      {
        name: "Programming Logic & Pseudocode",
        description: "Predicting loop outputs, recursion trees, pointer operations, and computational complexity.",
        topics: [
          "C/C++/Java/Python Output Prediction",
          "Control Structures, Nested Loops & Bitwise Operators",
          "Recursion Stack Tracing & Base Case Analysis",
          "Time & Space Complexity Analysis (Big-O)",
          "Object-Oriented Programming (Polymorphism, Inheritance, Encapsulation)",
          "Pointers, References & Memory Management",
          "Basic Data Structures (Arrays, Strings, Stacks, Queues, Linked Lists)"
        ],
        sampleQuestionsCount: 85
      },
      {
        name: "Hands-on Coding Assessment",
        description: "Algorithmic problems tested in TCS Ninja, Digital, and Prime coding tracks.",
        topics: [
          "Array Manipulations & Subarray Problems",
          "String Parsing, Anagrams & Palindromic Transformations",
          "Mathematical Computations (Primes, Sieve, Base Conversions)",
          "Matrix Rotations & Spiral Traversals",
          "Dynamic Programming & Sliding Window Fundamentals"
        ],
        sampleQuestionsCount: 50
      },
      {
        name: "Technical & Managerial Interview",
        description: "System fundamentals, project defense, database queries, and situational judgment.",
        topics: [
          "Core Computer Science: DBMS (Normalization, ACID, Indexing, Joins)",
          "Operating Systems: Processes vs Threads, Deadlocks, Paging",
          "Computer Networks: OSI Model, TCP/IP vs UDP, HTTP/HTTPS, DNS",
          "Project Architecture Defense & Technology Stack Choices",
          "Situational Judgment, Conflict Resolution & Adaptability"
        ],
        sampleQuestionsCount: 60
      }
    ],
    recommendedProblemIds: [
      "prob_two_sum",
      "prob_valid_anagram",
      "prob_contains_duplicate",
      "prob_valid_palindrome",
      "prob_best_time_buy_sell_stock",
      "prob_valid_parentheses",
      "prob_binary_search",
      "prob_reverse_linked_list",
      "prob_climbing_stairs",
      "prob_max_subarray"
    ],
    aptitudeSyllabus: [
      "Percentages & Profit Loss",
      "Time & Work",
      "Time Speed Distance",
      "Blood Relations & Syllogisms",
      "Reading Comprehension",
      "Bitwise Operations & Pseudocode"
    ],
    interviewTips: [
      "Master Big-O notation; TCS interviewers always ask for time and space optimization.",
      "Be prepared to explain your resume projects end-to-end including database schema and API structure.",
      "In the coding round, focus on getting 100% test cases passed within the time limit."
    ]
  },
  {
    id: "comp_google",
    name: "Google",
    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=128&h=128&fit=crop&crop=faces",
    tier: "Tier 1",
    description: "Software Engineering & Site Reliability roles. Emphasizes clean graph algorithms, dynamic programming, scalable system design, and Googleyness.",
    hiringProcess: [
      "Online Assessment / Google Foobar / Kickstart Screening",
      "Technical Phone Screen (45 mins DSA)",
      "Onsite Coding Rounds (3x 45 mins DSA & Problem Solving)",
      "System Design / Architecture Round (for L4/L5)",
      "Googleyness & Leadership Behavioral Round"
    ],
    categories: COMMON_PRODUCT_TECH_CATEGORIES,
    recommendedProblemIds: [
      "prob_trapping_rain_water",
      "prob_median_two_sorted_arrays",
      "prob_word_search",
      "prob_course_schedule",
      "prob_edit_distance",
      "prob_binary_tree_maximum_path_sum",
      "prob_sliding_window_maximum"
    ],
    aptitudeSyllabus: [
      "Algorithmic Proofs",
      "Probabilistic Data Structures",
      "Graph Theory",
      "Concurrency & Multithreading"
    ],
    interviewTips: [
      "Clarify constraints, edge cases, and ask clarifying questions before writing code.",
      "Think out loud — communicate your thought process and trade-offs.",
      "Write clean, modular, production-ready code with descriptive variable names."
    ]
  },
  {
    id: "comp_amazon",
    name: "Amazon",
    logo: "https://images.unsplash.com/photo-1523474253246-73be9ae72631?w=128&h=128&fit=crop&crop=faces",
    tier: "Tier 1",
    description: "Software Development Engineer (SDE I/II). Evaluates DSA mastery, object-oriented low level design, and 16 Leadership Principles.",
    hiringProcess: [
      "Online Assessment 1 (Code Debugging + 2 Coding Problems)",
      "Online Assessment 2 (Work Simulation & Leadership Assessment)",
      "Onsite Technical Coding Rounds (3x DSA)",
      "Object-Oriented Design (LLD) / System Design Round",
      "Bar Raiser Round (Deep Behavioral + Coding)"
    ],
    categories: COMMON_PRODUCT_TECH_CATEGORIES,
    recommendedProblemIds: [
      "prob_two_sum",
      "prob_group_anagrams",
      "prob_product_except_self",
      "prob_container_most_water",
      "prob_number_of_islands",
      "prob_task_scheduler",
      "prob_k_closest_points_to_origin"
    ],
    aptitudeSyllabus: [
      "OOP & SOLID Principles",
      "Heaps & Priority Queues",
      "Dynamic Programming",
      "STAR Behavioral Scenarios"
    ],
    interviewTips: [
      "Prepare 2 distinct STAR stories for each Amazon Leadership Principle.",
      "Emphasize scalable design and maintainable object-oriented code.",
      "Check boundaries, null inputs, and integer overflows."
    ]
  },
  {
    id: "comp_microsoft",
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1642132652075-2b2260655a6d?w=128&h=128&fit=crop&crop=faces",
    tier: "Tier 1",
    description: "Software Engineer across Azure, Office 365, Windows, and AI platforms. Focuses on tree algorithms, linked lists, string manipulation, and system architecture.",
    hiringProcess: [
      "Codility Online Assessment (3 Coding Questions)",
      "Technical Screening Round (45-60 mins)",
      "Onsite Technical Coding Rounds (3x DSA & LLD)",
      "System Architecture & Cloud Engineering Round",
      "Partner / Engineering Director Interview"
    ],
    categories: COMMON_PRODUCT_TECH_CATEGORIES,
    recommendedProblemIds: [
      "prob_reverse_linked_list",
      "prob_merge_two_sorted_lists",
      "prob_invert_binary_tree",
      "prob_validate_binary_search_tree",
      "prob_search_rotated_sorted_array",
      "prob_coin_change"
    ],
    aptitudeSyllabus: [
      "Pointer Math & Memory",
      "Trees & Graph Traversal",
      "Bit Manipulation",
      "Cloud Design Principles"
    ],
    interviewTips: [
      "Focus heavily on pointers, memory management, and tree recursion.",
      "Microsoft values code correctness and cleanliness over brute speed."
    ]
  },
  {
    id: "comp_infosys",
    name: "Infosys (InfyTQ / HackWithInfy)",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&h=128&fit=crop&crop=faces",
    tier: "Service Based",
    description: "Specialist Programmer (Power Programmer), Digital Specialist Engineer (DSE), and Systems Engineer roles.",
    hiringProcess: [
      "HackWithInfy / InfyTQ Qualifying Examination",
      "Advanced Coding & Algorithmic Problem Assessment",
      "Technical Interview (DSA, Full Stack, OOP, Database)",
      "HR Behavioral Interview"
    ],
    categories: [
      ...COMMON_SERVICE_APTITUDE_CATEGORIES,
      {
        name: "DSE & SP Coding Tracks",
        description: "Greedy algorithms, dynamic programming, arrays, and graph connectivity.",
        topics: [
          "Subarray Kadane Variations",
          "Graph BFS/DFS & Shortest Paths",
          "String Manipulations & Prefix Sums"
        ],
        sampleQuestionsCount: 65
      },
      {
        name: "Quantitative & Analytical Reasoning",
        description: "Number properties, algebra, series, syllogisms.",
        topics: [
          "Arithmetic Progressions & Logarithms",
          "Data Interpretation & Cryptarithmetic Puzzles",
          "Critical Reasoning & Statement Assumptions"
        ],
        sampleQuestionsCount: 75
      }
    ],
    recommendedProblemIds: [
      "prob_two_sum",
      "prob_valid_parentheses",
      "prob_binary_search",
      "prob_max_subarray",
      "prob_climbing_stairs"
    ],
    aptitudeSyllabus: [
      "Cryptarithmetic",
      "Critical Reasoning",
      "Mathematical Logic",
      "OOP Concepts"
    ],
    interviewTips: [
      "Prepare Cryptarithmetic and Sudoku-style reasoning puzzles.",
      "Be confident in explaining time complexity for all written algorithms."
    ]
  },
  {
    id: "comp_accenture",
    name: "Accenture",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&h=128&fit=crop&crop=faces",
    tier: "Service Based",
    description: "Associate Software Engineer (ASE) and Advanced ASE (AASE) recruitment pipeline.",
    hiringProcess: [
      "Cognitive and Technical Assessment (English, Critical Reasoning, Abstract, MS Office, Pseudocode, Networking)",
      "Coding Assessment (2 Questions)",
      "Communication Assessment (Pronunciation, Fluency, Grammar)",
      "Virtual Technical + HR Interview"
    ],
    categories: [
      ...COMMON_SERVICE_APTITUDE_CATEGORIES,
      {
        name: "Cognitive & Technical Fundamentals",
        description: "Cloud, pseudocode, computer networks, and critical reasoning.",
        topics: [
          "Pseudocode Output Tracing",
          "Common Application Security & Cloud Architecture",
          "Abstract & Spatial Reasoning",
          "Verbal Ability & Grammar"
        ],
        sampleQuestionsCount: 80
      },
      {
        name: "Hands-on Coding",
        description: "Array transformations, string counting, and number theory.",
        topics: [
          "Array Sum Differences & Pair Finding",
          "String Replacements & Character Frequencies",
          "Matrix Row/Column Operations"
        ],
        sampleQuestionsCount: 45
      }
    ],
    recommendedProblemIds: [
      "prob_contains_duplicate",
      "prob_move_zeroes",
      "prob_valid_parentheses",
      "prob_climbing_stairs"
    ],
    aptitudeSyllabus: [
      "Pseudocode Logic",
      "Cloud Fundamentals",
      "Network Protocols",
      "Abstract Reasoning"
    ],
    interviewTips: [
      "Practice English pronunciation and clear speech for the automated communication assessment.",
      "Double-check edge cases in pseudocode logic."
    ]
  },
  {
    id: "comp_inmobi",
    name: "InMobi",
    logo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=128&h=128&fit=crop&crop=faces",
    tier: "Product Tech",
    description: "High-throughput mobile advertising & marketing cloud platform. Focuses on low-latency data processing, high-concurrency systems, and deep algorithmic problem solving.",
    hiringProcess: [
      "HackerRank Algorithmic Screening (3 Difficult Problems)",
      "Technical Round 1: Core DSA & Problem Solving",
      "Technical Round 2: Low Level Design & Multi-threading",
      "Technical Round 3: High Level Distributed System Design",
      "Culture & Values Interview with Engineering Leadership"
    ],
    categories: COMMON_PRODUCT_TECH_CATEGORIES,
    recommendedProblemIds: [
      "prob_sliding_window_maximum",
      "prob_trapping_rain_water",
      "prob_network_delay_time",
      "prob_longest_increasing_subsequence",
      "prob_word_ladder"
    ],
    aptitudeSyllabus: [
      "Multi-threaded Programming",
      "Graph Algorithms",
      "Distributed Caching",
      "Big-O Space/Time Optimizations"
    ],
    interviewTips: [
      "Expect questions around handling millions of requests per second.",
      "Understand concurrency primitives, lock-free queues, and cache coherence."
    ]
  },
  {
    id: "comp_meta",
    name: "Meta (Facebook)",
    logo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=128&h=128&fit=crop&crop=faces",
    tier: "Tier 1",
    description: "Software Engineering for global social graphs, Instagram, WhatsApp, and AI infrastructure. Emphasizes speed, clean bug-free coding in 40-minute rounds, and massive scale systems.",
    hiringProcess: [
      "Recruiter Screen & Technical Screening Call (2 Medium DSA Problems in 45 mins)",
      "Virtual Onsite: Coding Round 1 (2 Medium/Hard DSA Problems)",
      "Virtual Onsite: Coding Round 2 (2 Medium/Hard DSA Problems)",
      "System Design / Architecture Round (for E4/E5/E6)",
      "Behavioral & Core Cultural Fit Round"
    ],
    categories: COMMON_PRODUCT_TECH_CATEGORIES,
    recommendedProblemIds: [
      "prob_two_sum",
      "prob_valid_palindrome",
      "prob_number_of_islands",
      "prob_binary_tree_maximum_path_sum",
      "prob_lowest_common_ancestor",
      "prob_k_closest_points_to_origin",
      "prob_sliding_window_maximum"
    ],
    aptitudeSyllabus: [
      "Graph Algorithms & Social Networks",
      "Binary Trees & BST Traversals",
      "Dynamic Programming",
      "Large-Scale System Design"
    ],
    interviewTips: [
      "Aim to solve two coding problems in 45 minutes with optimal time and space complexity.",
      "Communicate clearly, test your code manually against edge cases before declaring completion."
    ]
  },
  {
    id: "comp_uber",
    name: "Uber",
    logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=128&h=128&fit=crop&crop=faces",
    tier: "Product Tech",
    description: "Real-time dispatch, geospatial routing, high-concurrency marketplace systems, and global logistics.",
    hiringProcess: [
      "CodeSignal Online Assessment / HackerRank Screening",
      "Technical Phone Screen (DSA & Problem Solving)",
      "Onsite Technical Coding Rounds (2x DSA & Problem Solving)",
      "Machine Coding / Low Level Design Round",
      "High Level Distributed System Design (Geospatial / Marketplace)",
      "Hiring Manager Behavioral & Culture Fit"
    ],
    categories: COMMON_PRODUCT_TECH_CATEGORIES,
    recommendedProblemIds: [
      "prob_network_delay_time",
      "prob_trapping_rain_water",
      "prob_course_schedule",
      "prob_word_ladder",
      "prob_sliding_window_maximum",
      "prob_meeting_rooms_ii"
    ],
    aptitudeSyllabus: [
      "Geospatial Indexing (H3 / S2 / QuadTrees)",
      "Graph Shortest Paths & Routing",
      "Concurrency & Event Streaming",
      "Low Level Object Oriented Design"
    ],
    interviewTips: [
      "Expect problems involving spatial mapping, Dijkstra's algorithm, and real-time event processing.",
      "Demonstrate deep understanding of thread safety and idempotency in distributed environments."
    ]
  },
  {
    id: "comp_netflix",
    name: "Netflix",
    logo: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=128&h=128&fit=crop&crop=faces",
    tier: "Tier 1",
    description: "Cloud-native microservices architecture, global video streaming CDN, recommendation engines, and chaos engineering.",
    hiringProcess: [
      "Technical Recruiter Assessment",
      "Technical Screening Round (DSA & Architecture)",
      "Full Onsite Interview Loop (2x Deep Technical & Architecture)",
      "System Design & Chaos Engineering Round",
      "Culture & Values Interview with Engineering Director"
    ],
    categories: COMMON_PRODUCT_TECH_CATEGORIES,
    recommendedProblemIds: [
      "prob_lru_cache",
      "prob_sliding_window_maximum",
      "prob_course_schedule",
      "prob_trapping_rain_water",
      "prob_top_k_frequent"
    ],
    aptitudeSyllabus: [
      "Microservices & Resilience Patterns (Circuit Breakers)",
      "Distributed Caching & CDN Invalidation",
      "Concurrency & Asynchronous I/O",
      "Culture of Freedom and Responsibility"
    ],
    interviewTips: [
      "Read the Netflix Culture Memo thoroughly; behavioral alignment is weighed equally with technical prowess.",
      "Be prepared to design fault-tolerant, self-healing distributed systems."
    ]
  },
  {
    id: "comp_apple",
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=128&h=128&fit=crop&crop=faces",
    tier: "Tier 1",
    description: "Core Operating Systems, iOS/macOS frameworks, cloud services, and hardware-software co-design.",
    hiringProcess: [
      "Technical Phone Screening (DSA & Systems)",
      "Technical Coding Rounds (2-3x DSA, Pointers & Memory)",
      "System Design / Low Level Architecture Round",
      "Domain Specific Deep Dive (OS / Concurrency / C++)",
      "Cross-Functional Team & Managerial Interview"
    ],
    categories: COMMON_PRODUCT_TECH_CATEGORIES,
    recommendedProblemIds: [
      "prob_reverse_linked_list",
      "prob_lru_cache",
      "prob_binary_search",
      "prob_validate_binary_search_tree",
      "prob_coin_change"
    ],
    aptitudeSyllabus: [
      "Memory Management & Pointers",
      "Operating Systems & Multithreading",
      "Low Level Optimization",
      "Computer Architecture"
    ],
    interviewTips: [
      "Expect deep questions on memory management, pointer arithmetic, and CPU cache efficiency.",
      "Show passion for user experience, polish, and privacy-first architectural choices."
    ]
  },
  {
    id: "comp_amex",
    name: "American Express (AmEx)",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=128&h=128&fit=crop&crop=faces",
    tier: "Fintech",
    description: "Financial technology, real-time fraud detection, and credit processing systems.",
    hiringProcess: [
      "HackerEarth / Codility Online Technical Assessment",
      "Technical Round 1: DSA, Problem Solving & SQL Queries",
      "Technical Round 2: System Architecture, Spring Boot / Java / Node.js",
      "Hiring Manager & Leadership Fit Round"
    ],
    categories: [
      {
        name: "Fintech Algorithmic & Transaction Logic",
        description: "Sliding window rate limiters, balance calculations, graphs for fraud detection.",
        topics: [
          "Sliding Window & Two Pointers for Transaction Streams",
          "Graph Connectivity for Fraud Network Detection",
          "ACID Transactions, Distributed Locks & Idempotency",
          "Complex SQL Queries (Window Functions, CTEs, Aggregations)"
        ],
        sampleQuestionsCount: 85
      }
    ],
    recommendedProblemIds: [
      "prob_two_sum",
      "prob_best_time_buy_sell_stock",
      "prob_coin_change",
      "prob_course_schedule",
      "prob_top_k_frequent"
    ],
    aptitudeSyllabus: [
      "SQL Window Functions & Indexing",
      "Transaction Processing & ACID",
      "Dynamic Programming",
      "Financial Mathematics"
    ],
    interviewTips: [
      "Know SQL window functions, CTEs, and index optimization thoroughly.",
      "Be prepared to discuss financial data consistency, idempotency, and transactional rollbacks."
    ]
  },
  {
    id: "comp_hcl",
    name: "HCLTech",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=128&h=128&fit=crop&crop=faces",
    tier: "Service Based",
    description: "Graduate Engineer Trainee & Digital Specialist recruitment.",
    hiringProcess: [
      "Online Cognitive & Technical Aptitude Test",
      "Hands-on Coding Assessment",
      "Technical & HR Interview"
    ],
    categories: [
      ...COMMON_SERVICE_APTITUDE_CATEGORIES,
      {
        name: "Quantitative & Technical Aptitude",
        description: "Arithmetic math, logical reasoning, and basic coding.",
        topics: [
          "Percentages, Profit & Loss, Time & Work",
          "Coding-Decoding & Direction Sense",
          "Basic Array & String Programs"
        ],
        sampleQuestionsCount: 70
      }
    ],
    recommendedProblemIds: [
      "prob_two_sum",
      "prob_valid_palindrome",
      "prob_binary_search",
      "prob_reverse_linked_list"
    ],
    aptitudeSyllabus: [
      "Quantitative Aptitude",
      "Logical Reasoning",
      "C/C++/Java Fundamentals"
    ],
    interviewTips: [
      "Demonstrate solid fundamentals in C/C++/Java or Python.",
      "Clear explanation of final year engineering projects."
    ]
  }
];
