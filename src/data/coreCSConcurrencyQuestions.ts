import { CoreCSQuestion } from "./coreCSTypes.js";

export const CORE_CS_CONCURRENCY_QUESTIONS: CoreCSQuestion[] = [
  {
    id: "conc-01",
    title: "Producer-Consumer Pattern with Condition Variables & Spurious Wakeups",
    topic: "Concurrency / Multithreading",
    subtopic: "Synchronization Primitives",
    difficulty: "Hard",
    format: "Scenario",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Uber"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Google",
      role: "Software Engineer - Concurrency & Systems",
      year: 2024,
      sourceReference: "Google Multi-threaded Systems Screening"
    },
    question: "Why MUST condition variable wait calls (e.g. `pthread_cond_wait` or `condition.await()`) ALWAYS be enclosed in a `while` loop instead of an `if` statement? What are Spurious Wakeups?",
    detailedExplanation: "1. Spurious Wakeups: Under POSIX and OS kernel implementations, a waiting thread may wake up without any thread having signaled or broadcasted the condition variable (due to internal signal delivery or kernel thread scheduling). 2. Race Conditions / Stolen Signals: Between the moment Thread A is signaled and the moment Thread A actually acquires the mutex lock to wake up, another Thread B might run and consume the produced item (emptying the buffer). If Thread A checked with `if`, it would proceed assuming an item exists and attempt to read from an empty buffer, crashing the program. A `while` loop re-checks the predicate after re-acquiring the lock.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What exact atomic operations does `pthread_cond_wait(cond, mutex)` perform internally?",
        interviewerIntent: "Validate deep atomic sleep and unlock.",
        strongCandidateAnswer: "It atomically: 1. Releases the mutex lock, and 2. Enqueues the calling thread onto the condition variable's wait queue and puts the thread to sleep. When signaled, it wakes up and automatically re-acquires the mutex lock before returning to user code.",
        keyKeywords: ["Atomic unlock and sleep", "Re-acquire mutex", "Wait queue"]
      }
    ],
    systemsDeepDive: {
      whyItMattersInProduction: "Core pattern for thread pools, async message ingestion buffers (Disruptor, BlockingQueue), and background worker pipelines.",
      commonPitfalls: ["Using `if (queue.isEmpty()) wait();` resulting in NoSuchElementException / buffer underflow crashes."],
      tradeoffsOrPerformanceImpact: "Condition variables avoid busy spinning, putting idle threads to sleep at ~1us wake-up latency."
    }
  },
  {
    id: "conc-02",
    title: "Lock-Free Programming: CAS (Compare-And-Swap) & ABA Problem",
    topic: "Concurrency / Multithreading",
    subtopic: "Lock-Free Data Structures",
    difficulty: "Extreme",
    format: "Explanation",
    companies: ["Meta", "Google", "Nvidia", "Citadel", "Apple"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Meta",
      role: "Core Infra SWE",
      year: 2024,
      sourceReference: "Meta Low-Latency Concurrent Systems Loop"
    },
    question: "How do lock-free data structures use hardware Compare-And-Swap (CAS) instructions? What is the ABA Problem, and how is it resolved using Tagged Pointers / Versioning?",
    detailedExplanation: "CAS is an atomic CPU instruction (e.g. `LOCK CMPXCHG` on x86) that takes an address, expected old value, and new value. If memory == expected, it writes new value and returns true; otherwise false. The ABA Problem occurs in memory-managed/pointer-based lock-free stacks (Treiber stack): 1. Thread 1 reads top pointer A (which points to B) and prepares CAS(A, B). 2. Thread 1 gets preempted. 3. Thread 2 pops A, pops B, and pushes a newly allocated node that happens to be allocated at memory address A. 4. Thread 1 resumes: memory is address A, so CAS(A, B) succeeds, but it sets top to B (which was already freed/reused!), corrupting the stack. Resolution: Tagged Pointers / AtomicStampedReference pairing the 64-bit pointer with a 64-bit monotonically increasing version/counter tag (Double-width CAS `CMPXCHG16B`).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is the difference between Lock-Free and Wait-Free guarantees?",
        interviewerIntent: "Formal progress guarantees.",
        strongCandidateAnswer: "Lock-Free guarantees that at least ONE thread in the system makes progress in a finite number of steps (system-wide progress, but individual threads may starve). Wait-Free is stronger: EVERY thread is guaranteed to make progress in a bounded number of steps (per-thread progress guarantee).",
        keyKeywords: ["System-wide progress", "Per-thread bounded progress", "Starvation freedom"]
      }
    ]
  },
  {
    id: "conc-03",
    title: "Volatile, Memory Barriers (Fences) & CPU Instruction Reordering",
    topic: "Concurrency / Multithreading",
    subtopic: "Memory Visibility & Hardware",
    difficulty: "Hard",
    format: "Scenario",
    companies: ["Microsoft", "Google", "Amazon", "Oracle"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Microsoft",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Microsoft Concurrency & Memory Models"
    },
    question: "Why is Double-Checked Locking broken in multi-threaded code without `volatile` or memory barriers? What happens due to CPU/Compiler out-of-order instruction reordering?",
    detailedExplanation: "In `instance = new Singleton()`: 1. Allocate memory, 2. Run constructor to initialize fields, 3. Assign memory address to `instance` pointer. Compilers and out-of-order CPUs can reorder steps 2 and 3: 1 -> 3 -> 2. If Thread 1 is preempted immediately after step 3 (pointer assigned but constructor not yet finished), Thread 2 checks `if (instance != null)`, sees true, and returns a partially initialized object, reading garbage data or crashing! Declaring `instance` as `volatile` (or using acquire/release memory fences) injects a Memory Barrier instruction (e.g. `MFENCE`), forbidding instruction reordering across the barrier and ensuring writes to memory are immediately visible across CPU core caches.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Does `volatile` guarantee atomicity for operations like `count++`?",
        interviewerIntent: "Visibility vs Atomicity.",
        strongCandidateAnswer: "No! `volatile` only guarantees Visibility (reading fresh value from RAM/cache) and Ordering (forbidding reordering). `count++` is a 3-step operation: Read, Increment, Write. Two threads reading simultaneously will both write `count+1`, losing an update. Atomicity requires `AtomicInteger` (CAS) or a Mutex.",
        keyKeywords: ["Visibility vs Atomicity", "Read-Modify-Write", "AtomicInteger", "Lost update"]
      }
    ]
  }
];
