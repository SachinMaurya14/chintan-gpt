import { CoreCSQuestion } from "./coreCSTypes.js";

export const CORE_CS_MIXED_DRILL_QUESTIONS: CoreCSQuestion[] = [
  {
    id: "mix-01",
    title: "Linux Memory Limits: cgroups OOM Killer vs JVM Heap Heap Exhaustion",
    topic: "Mixed Core CS Drill",
    subtopic: "OS + Runtime + Systems",
    difficulty: "Extreme",
    format: "Scenario",
    companies: ["Google", "Amazon", "Uber", "Meta"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Google",
      role: "SRE / Production Infra Engineer",
      year: 2024,
      sourceReference: "Container Memory Limits & Linux Kernel OOM Killer Loop"
    },
    question: "A Kubernetes pod running a Java service with `-Xmx4g` is killed with Exit Code 137 on a node with 8 GB RAM, but the JVM heap never threw `java.lang.OutOfMemoryError`. Explain what happened at the Linux kernel level.",
    detailedExplanation: "Exit Code 137 indicates the process was killed by SIGKILL (128 + 9). The JVM `-Xmx4g` flag ONLY limits the Java managed heap. A Java process consumes significant Off-Heap / Native Memory: Metaspace (class bytecode), Thread Stacks (e.g. 1000 threads * 1MB = 1GB), Direct ByteBuffers (Netty network I/O), JIT compiler code cache, and native C-library allocations (e.g. snappy/zstd compression). If the Kubernetes pod has a memory limit of `5Gi` in cgroups (`memory.max`), total native RSS memory exceeded 5 GB. The Linux kernel cgroups controller triggered the Out-of-Memory (OOM) Killer, sending SIGKILL directly to the container process before the JVM even realized it was out of memory.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How can you debug and inspect off-heap memory consumption inside a running JVM?",
        interviewerIntent: "Production diagnostic tooling.",
        strongCandidateAnswer: "Enable Native Memory Tracking (NMT) via `-XX:NativeMemoryTracking=detail` and inspect the breakdown with `jcmd <PID> VM.native_memory baseline` and `jcmd <PID> VM.native_memory detail.diff`, or analyze `/proc/<PID>/smaps`.",
        keyKeywords: ["Native Memory Tracking (NMT)", "jcmd VM.native_memory", "/proc/PID/smaps", "Off-heap RSS"]
      }
    ],
    systemsDeepDive: {
      whyItMattersInProduction: "One of the top 3 production outage causes in modern containerized microservices.",
      commonPitfalls: ["Setting container memory limit equal to -Xmx without leaving 1-2GB headroom for off-heap and native stacks."],
      tradeoffsOrPerformanceImpact: "OOM killed pods restart abruptly, dropping in-flight HTTP requests and causing cascaded failover storms."
    }
  },
  {
    id: "mix-02",
    title: "Database Connection Pool Exhaustion & Thread Pool Starvation",
    topic: "Mixed Core CS Drill",
    subtopic: "DBMS + Concurrency + OS",
    difficulty: "Hard",
    format: "Design / Systems Reasoning",
    companies: ["Amazon", "Uber", "Microsoft", "Stripe"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE II",
      year: 2024,
      sourceReference: "Amazon High-Concurrency Microservices Failure Modes"
    },
    question: "Why does configuring a database connection pool (e.g. HikariCP) with 500 connections often result in LOWER throughput and higher latency than 50 connections on a 16-core database server?",
    detailedExplanation: "A 16-core database server can physically execute only 16 instructions concurrently in hardware. Having 500 concurrent active connections causes 500 database threads to compete for 16 CPU cores and shared disk I/O channels. This triggers severe CPU Context Switching overhead, OS runqueue thrashing, B+ Tree latch contention in the database buffer pool, and disk queue head stalls. As Little's Law dictates, bounding the connection pool to `(Core Count * 2) + Effective Disk Spindle Count` (e.g. ~34 connections) ensures threads execute with minimal context switching and maximum CPU cache warmth, maximizing overall queries per second (QPS).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is Connection Pool Leak and how is it detected in production?",
        interviewerIntent: "Operational resource leak diagnostics.",
        strongCandidateAnswer: "A Connection Leak occurs when application code borrows a connection from the pool and fails to return it (missing `try-with-resources` or exception in unclosed block). Detected via connection leak detection thresholds (e.g. HikariCP `leakDetectionThreshold=2000ms`) which logs a stack trace if a connection is held longer than threshold without closing.",
        keyKeywords: ["leakDetectionThreshold", "Unclosed connection", "try-with-resources", "Pool exhaustion"]
      }
    ]
  }
];
