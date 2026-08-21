import { CoreCSQuestion } from "./coreCSTypes.js";

export const CORE_CS_SYSTEMS_QUESTIONS: CoreCSQuestion[] = [
  {
    id: "sys-01",
    title: "CPU Cache Hierarchy & False Sharing in Multithreading",
    topic: "Computer Architecture / Systems",
    subtopic: "Memory Hierarchy & Hardware",
    difficulty: "Hard",
    format: "Scenario",
    companies: ["Google", "Nvidia", "Meta", "Apple", "Amazon"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Nvidia",
      role: "System Software / High-Performance Computing",
      year: 2024,
      sourceReference: "Nvidia Hardware Architecture & Cache Coherency"
    },
    question: "What is False Sharing in multi-threaded multicore architectures? How does CPU Cache Line size (64 bytes) cause performance collapse between independent threads?",
    detailedExplanation: "CPUs manage memory in fixed-size blocks called Cache Lines (typically 64 bytes). Under cache coherency protocols (MESI/MOESI), when Core 1 modifies any byte in a cache line, that entire 64-byte cache line is marked INVALID in all other CPU cores' L1/L2 caches. False Sharing occurs when two independent threads running on different cores modify two completely distinct variables (e.g. `threadA_counter` and `threadB_counter`) that happen to reside within the same 64-byte cache line in memory. Even though the threads never share logical variables, each write causes a cache coherency storm, bouncing the cache line across the L3 interconnect bus ('cache line ping-pong') and degrading throughput by 10x-50x.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How can software engineers prevent False Sharing in C++ or Java?",
        interviewerIntent: "Practical hardware alignment mitigation.",
        strongCandidateAnswer: "Use Cache Line Padding: In C++ alignas(64) `struct alignas(64) ThreadData { int counter; char pad[60]; };`. In Java, use `@Contended` annotation or manual padding fields (`long p1, p2, p3, p4, p5, p6, p7`) to ensure variables reside on separate 64-byte cache lines.",
        keyKeywords: ["alignas(64)", "@Contended", "Cache line padding", "MESI ping-pong"]
      }
    ]
  },
  {
    id: "sys-02",
    title: "CPU Branch Prediction & Data Structure Layout (Cache Locality)",
    topic: "Computer Architecture / Systems",
    subtopic: "CPU Execution & Pipelining",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Google", "Microsoft", "Meta", "Adobe"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Google",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Classic Branch Prediction & Array vs Linked List Locality"
    },
    question: "Why is iterating through a sorted array significantly faster than iterating through an unsorted array for conditional processing (`if (data[i] >= 128) sum += data[i]`)? What role does the CPU Branch Predictor play?",
    detailedExplanation: "Modern CPUs use deep instruction pipelines (15-20 stages). When encountering an `if` condition (conditional branch), the CPU cannot wait for the condition to evaluate from memory—it uses a Branch Predictor (Branch Target Buffer + 2-bit saturating counters / neural branch predictor) to guess which branch will be taken and speculatively executes ahead. In a sorted array, all numbers < 128 are grouped first (branch uniformly NOT taken) followed by >= 128 (branch uniformly taken), achieving ~99% branch prediction accuracy with zero pipeline stalls. In an unsorted array, the condition flips randomly (50% true, 50% false); branch mispredictions flush the CPU pipeline, incurring a 15-20 cycle penalty per misprediction.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Why does traversing a contiguous `std::vector` or array beat `std::list` (linked list) by 10x even though both are O(N)?",
        interviewerIntent: "Spatial cache locality and hardware prefetching.",
        strongCandidateAnswer: "Spatial Locality and Hardware Prefetchers: Array elements reside in contiguous memory, so loading one element loads 64 bytes (16 integers) into L1 cache, with CPU prefetchers automatically streaming subsequent cache lines into L1. Linked list nodes are scattered randomly across the heap, triggering a cold RAM cache miss (~50-100ns latency) on every pointer dereference.",
        keyKeywords: ["Spatial locality", "Hardware prefetcher", "Cache miss penalty", "Heap fragmentation"]
      }
    ]
  }
];
