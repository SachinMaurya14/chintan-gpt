import { CoreCSQuestion } from "./coreCSTypes.js";

export const CORE_CS_LANGUAGE_RUNTIME_QUESTIONS: CoreCSQuestion[] = [
  {
    id: "lang-01",
    title: "Java JVM Memory Model & Generational Garbage Collection",
    topic: "Language / Runtime Fundamentals",
    subtopic: "JVM & Garbage Collection",
    difficulty: "Hard",
    format: "Explanation",
    companies: ["Amazon", "Uber", "Salesforce", "LinkedIn", "Oracle"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE II / Backend Services",
      year: 2024,
      sourceReference: "Amazon Java / JVM Production Performance Loop"
    },
    question: "Explain the JVM Heap Memory layout (Eden, Survivor S0/S1, Tenured/Old Gen, Metaspace) and the Weak Generational Hypothesis in Garbage Collection.",
    detailedExplanation: "The Weak Generational Hypothesis states that most allocated objects have very short lifespans (temporary request objects die young), while objects that survive multiple GC cycles tend to live for a very long time. The JVM splits Heap into: 1. Young Generation (Eden + Survivor spaces S0/S1): New objects are allocated in Eden via fast bump-the-pointer. Minor GC (Stop-The-World) reclaims dead objects, copying survivors back and forth between S0 and S1 with an aging counter. 2. Old/Tenured Generation: Objects that survive past a tenure threshold (e.g. 15 cycles) are promoted to Old Gen, collected via Major/Full GC (e.g. G1GC, ZGC). 3. Metaspace (Native RAM): Stores class metadata, bytecode, and method tables (replacing PermGen).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How does ZGC / Shenandoah achieve sub-millisecond Stop-The-World (STW) pauses even on terabyte-sized heaps?",
        interviewerIntent: "Modern concurrent GC mechanics.",
        strongCandidateAnswer: "They perform almost all GC phases (Marking, Relocation/Compaction) concurrently with running application threads using Colored Pointers (storing GC metadata in reference pointer bits) and Load Barriers (intercepting object dereferences to transparently update pointers to relocated objects).",
        keyKeywords: ["Colored pointers", "Load barriers", "Concurrent compaction", "Sub-millisecond STW"]
      }
    ]
  },
  {
    id: "lang-02",
    title: "JavaScript Event Loop: Call Stack, Microtasks & Macrotasks",
    topic: "Language / Runtime Fundamentals",
    subtopic: "Asynchronous Runtimes",
    difficulty: "Medium",
    format: "Output Prediction",
    companies: ["Google", "Meta", "Uber", "Atlassian"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Meta",
      role: "Frontend / Full-Stack SWE",
      year: 2024,
      sourceReference: "Meta Core JavaScript Async Execution Model"
    },
    question: "Predict the exact console output order and explain why:\n\n```js\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3')).then(() => console.log('4'));\nconsole.log('5');\n```",
    codeSnippet: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3')).then(() => console.log('4'));
console.log('5');`,
    language: "javascript",
    detailedExplanation: "Exact Output Order: 1, 5, 3, 4, 2. Execution steps: 1. Synchronous code runs on the Call Stack: prints '1', schedules setTimeout to Macrotask (Task) queue, schedules Promise.then to Microtask queue, prints '5'. 2. Call Stack becomes empty. 3. Event Loop processes ALL Microtasks before any Macrotask: executes first Promise.then (prints '3') which enqueues second then, continues draining microtask queue (prints '4'). 4. Microtask queue is empty; Event Loop picks next Macrotask: executes setTimeout callback (prints '2').",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What happens to the browser UI rendering if a microtask recursively schedules another microtask indefinitely?",
        interviewerIntent: "Event loop starvation knowledge.",
        strongCandidateAnswer: "The browser freezes completely (Event Loop Starvation). The Event Loop will NEVER yield to UI rendering or Macrotasks as long as the Microtask queue has pending items, leading to an unresponsive page crash.",
        keyKeywords: ["Microtask starvation", "UI rendering blocked", "Infinite microtask recursion"]
      }
    ]
  },
  {
    id: "lang-03",
    title: "Python GIL (Global Interpreter Lock) & CPU vs I/O Bound Concurrency",
    topic: "Language / Runtime Fundamentals",
    subtopic: "Python Internals",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Google", "Meta", "Netflix", "Uber"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Google",
      role: "Python / Backend SWE",
      year: 2024,
      sourceReference: "Python GIL & Concurrency Mechanics"
    },
    question: "What is the CPython Global Interpreter Lock (GIL)? Why does multi-threading NOT speed up CPU-bound tasks in Python, and how does `multiprocessing` bypass it?",
    detailedExplanation: "CPython memory management is not thread-safe (reference counting `Py_INCREF`/`Py_DECREF` would suffer race conditions). The GIL is a mutual exclusion lock that allows only ONE native OS thread to execute Python bytecode at any given moment, even on a 64-core CPU. For CPU-bound tasks (e.g. matrix multiplication), multi-threading in Python actually runs slower than single-threaded code due to GIL acquisition lock contention and CPU context switching overhead. For I/O-bound tasks (network, disk), Python releases the GIL while waiting for OS system calls. To achieve true multi-core CPU parallelism, Python uses `multiprocessing` (spawning separate OS processes with distinct Python interpreters and isolated memory spaces) or C-extensions (NumPy/Cython) that release the GIL.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is the trade-off of `multiprocessing` over multi-threading?",
        interviewerIntent: "Process memory overhead and IPC serialization.",
        strongCandidateAnswer: "`multiprocessing` incurs high memory overhead (each process loads its own Python runtime) and high IPC communication cost because data passed between processes must be serialized (pickled) across pipes/sockets.",
        keyKeywords: ["Pickling overhead", "Memory duplication", "IPC serialization cost"]
      }
    ]
  }
];
