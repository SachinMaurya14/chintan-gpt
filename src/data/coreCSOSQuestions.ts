import { CoreCSQuestion } from "./coreCSTypes.js";

export const CORE_CS_OS_QUESTIONS: CoreCSQuestion[] = [
  {
    id: "os-01",
    title: "Process vs Thread Internal State & Memory Layout",
    topic: "Operating Systems",
    subtopic: "Process Management",
    difficulty: "Easy",
    format: "Explanation",
    companies: ["Google", "Microsoft", "Amazon", "Meta"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Google",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Repeated topic across Google SWE interview loops (Process lifecycle & concurrency)"
    },
    question: "Explain the exact difference between a process and a thread in terms of address space, memory layout, resource ownership, and scheduling.",
    detailedExplanation: "A process is an execution environment with its own isolated virtual address space (Code, Data, Heap, Stack), file descriptors, security context, and environment variables. A thread (Lightweight Process or LWP) is the smallest unit of CPU scheduling that lives inside a process. All threads within a process share the text/code segment, heap memory, global variables, and open file descriptors, but each thread has its own unique Program Counter (PC), CPU registers set, and Stack frame.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "If threads share heap and open files, what is strictly private to a single thread?",
        interviewerIntent: "Verify candidate knows thread execution boundaries.",
        strongCandidateAnswer: "Only the execution context: the Thread ID (TID), CPU Register state (including stack pointer SP and program counter PC), the Thread Stack (for local variables and function call frames), scheduling priority, signal mask, and Thread-Local Storage (TLS).",
        keyKeywords: ["Stack", "Registers", "PC", "SP", "TLS", "Signal Mask"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "Why does creating a thread take significantly less time than creating a process?",
        interviewerIntent: "Assess understanding of kernel resource allocation and memory pagetable setup.",
        strongCandidateAnswer: "Process creation (fork/exec) requires creating a new Memory Management Unit (MMU) page table hierarchy, duplicating or copy-on-write mapping virtual memory descriptors, and initializing security handles. Thread creation (e.g. pthread_create / clone with CLONE_VM) shares the existing page directory and file table, needing only a new stack allocation and task struct initialization.",
        keyKeywords: ["Page table", "CLONE_VM", "task_struct", "MMU", "Copy-on-write"]
      },
      {
        stepNumber: 3,
        interviewerPrompt: "What happens if one thread encounters a Segmentation Fault (SIGSEGV)?",
        interviewerIntent: "Evaluate knowledge of process-wide fault handling.",
        strongCandidateAnswer: "Unless a thread-specific signal handler catches it, an unhandled SIGSEGV terminates the entire process and all of its sibling threads, because illegal memory access invalidates the integrity of the shared address space.",
        keyKeywords: ["SIGSEGV", "Process termination", "Shared address space"]
      }
    ],
    systemsDeepDive: {
      whyItMattersInProduction: "Critical for choosing between multi-process (e.g., Nginx, Chrome tab isolation) and multi-threaded architectures (e.g., Redis async IO threads, Netty, Java web servers).",
      commonPitfalls: ["Assuming thread stacks are hardware-protected from other threads (a thread can technically read another thread's stack if it has a raw pointer).", "Ignoring memory leak when threads exit without cleanup."],
      tradeoffsOrPerformanceImpact: "Threads provide microsecond context switching and easy data sharing at the risk of race conditions; processes provide fault isolation at the cost of heavier IPC."
    }
  },
  {
    id: "os-02",
    title: "Context Switching Mechanism & Overhead Anatomy",
    topic: "Operating Systems",
    subtopic: "CPU Scheduling",
    difficulty: "Medium",
    format: "Scenario",
    companies: ["Google", "Amazon", "Uber", "Apple"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE II",
      year: 2024,
      sourceReference: "Amazon Core Systems & Low-Level Performance Interview Loop"
    },
    question: "Why does context switching have noticeable performance overhead, and why is a process context switch significantly more expensive than a thread context switch?",
    detailedExplanation: "Context switching requires saving the execution state (General purpose registers, SP, PC, FP, floating point registers) of the currently running entity into its Process Control Block (PCB) or Thread Control Block (TCB) and loading the state of the next runnable task. For a process switch, the OS must also switch the Virtual Memory space by updating the CPU CR3 register (page table base pointer), which flushes or invalidates the Translation Lookaside Buffer (TLB), causing subsequent memory accesses to suffer cold cache and TLB miss penalties.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What exact hardware registers are involved when switching virtual address spaces on x86-64?",
        interviewerIntent: "Deep architecture validation.",
        strongCandidateAnswer: "The CR3 control register holds the physical address of the Level 4 Page Map Table (PML4). Loading a new value into CR3 triggers the virtual address space switch and flushes non-global TLB entries unless PCID (Process Context Identifiers) is enabled in CR4.",
        keyKeywords: ["CR3 register", "PML4", "TLB flush", "PCID"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "How does CPU cache pollution impact system throughput after a context switch?",
        interviewerIntent: "Assess understanding of L1/L2/L3 cache misses.",
        strongCandidateAnswer: "The incoming process touches different working set data, causing cache lines (L1/L2/L3) to miss repeatedly until its working set is re-warmed, resulting in memory pipeline stalls.",
        keyKeywords: ["Cache pollution", "Working set", "L1/L2 miss", "Memory stall"]
      }
    ],
    systemsDeepDive: {
      whyItMattersInProduction: "Explains why having 10,000 active OS threads causes severe CPU degradation (thread thrashing) and why async event-driven I/O models (epoll, goroutines, virtual threads) are favored.",
      commonPitfalls: ["Creating thread-per-request models for millions of connections without thread pools."],
      tradeoffsOrPerformanceImpact: "Kernel context switch takes ~1-2 microseconds, but indirect cache/TLB miss cost can be tens of microseconds."
    }
  },
  {
    id: "os-03",
    title: "User Mode vs Kernel Mode & System Call Transition",
    topic: "Operating Systems",
    subtopic: "Kernel Architecture",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Microsoft", "Google", "Apple", "Nvidia"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Microsoft",
      role: "Software Engineer - OS Core",
      year: 2023,
      sourceReference: "Microsoft Core Fundamentals & OS Internals Interview"
    },
    question: "Explain the transition from User Mode (Ring 3) to Kernel Mode (Ring 0). What happens when user code executes read(fd, buf, count)?",
    detailedExplanation: "Modern CPUs implement privilege rings (Ring 0 = Kernel, Ring 3 = User). User applications run in Ring 3 where privileged instructions (e.g., direct disk IO, MMU manipulation, disabling interrupts) are forbidden. Calling read() executes a wrapper in libc that loads system call arguments into CPU registers (e.g. RAX=syscall number, RDI=fd, RSI=buf, RDX=count) and executes the SYSCALL/SYSENTER instruction, switching CPU privilege to Ring 0 and jumping to the kernel's system call dispatcher via the Interrupt Descriptor Table (IDT).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Why does the kernel switch from user stack to kernel stack during a system call?",
        interviewerIntent: "Evaluate understanding of OS security and kernel stack integrity.",
        strongCandidateAnswer: "To prevent malicious or corrupted user stacks from crashing the kernel or tampering with kernel execution frames. The kernel assigns a fixed, isolated kernel stack per thread stored in the TSS (Task State Segment).",
        keyKeywords: ["Kernel stack", "TSS", "Security boundary", "Isolation"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "What is vDSO (Virtual Dynamic Shared Object) and why was it introduced in Linux?",
        interviewerIntent: "Tests advanced knowledge of low-overhead system calls.",
        strongCandidateAnswer: "vDSO maps a read-only kernel page into user space for frequently called, non-destructive syscalls (like gettimeofday or clock_gettime), allowing user space to read kernel-maintained timestamps without triggering a CPU privilege mode switch.",
        keyKeywords: ["vDSO", "clock_gettime", "Zero-overhead syscall", "Read-only page"]
      }
    ]
  },
  {
    id: "os-04",
    title: "Virtual Memory: 4 GB Address Space on 2 GB Physical RAM",
    topic: "Operating Systems",
    subtopic: "Memory Management",
    difficulty: "Medium",
    format: "Scenario",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Oracle"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Google",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Google Technical Phone Screen & Onsite Core Systems"
    },
    question: "Can a process requiring 4 GB of virtual address space run on a machine with only 2 GB of physical RAM? Explain step-by-step how the OS achieves this.",
    detailedExplanation: "Yes, via Virtual Memory with Demand Paging. The 4 GB address space is divided into fixed-size Virtual Pages (typically 4 KB). Physical RAM is divided into matching Physical Frames. The OS only loads active pages into RAM (the 'working set'). Non-resident pages reside on secondary backing storage (swap space or executable file). When the process references an unmapped page, the MMU raises a Page Fault interrupt (#PF). The kernel allocates a physical frame, reads the page from disk, updates the Page Table Entry (PTE with Valid=1), and restarts the faulting instruction.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What happens if all 2 GB of physical frames are full when a page fault occurs?",
        interviewerIntent: "Examine understanding of page replacement algorithms and dirty bit write-back.",
        strongCandidateAnswer: "The OS page replacement algorithm (e.g. Clock / LRU approximation) selects a victim frame. If the victim page's Dirty Bit is 1 (modified), it is written back to swap disk before the frame is repurposed. If clean, it is discarded immediately.",
        keyKeywords: ["Page replacement", "Dirty bit", "Swap write", "Victim frame"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "What is Thrashing and how does the OS detect and mitigate it?",
        interviewerIntent: "Practical operational diagnostics.",
        strongCandidateAnswer: "Thrashing occurs when the sum of working sets of all running processes exceeds physical RAM. The CPU spends almost 100% of its time servicing page faults and disk I/O rather than executing instructions. Mitigation: Working Set Model monitoring, reducing multi-programming degree by suspending low-priority processes, or adding physical RAM.",
        keyKeywords: ["Thrashing", "Working set", "Page fault storm", "Multi-programming degree"]
      }
    ]
  },
  {
    id: "os-05",
    title: "Deadlock: Four Coffman Conditions & Banker's Algorithm",
    topic: "Operating Systems",
    subtopic: "Synchronization & Concurrency",
    difficulty: "Hard",
    format: "Explanation",
    companies: ["Amazon", "Microsoft", "Uber", "Apple"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE II",
      year: 2023,
      sourceReference: "Amazon Concurrency & Systems Interview Loop"
    },
    question: "State the four Coffman conditions necessary and sufficient for a Deadlock. How does Banker's Algorithm achieve deadlock avoidance?",
    detailedExplanation: "The four Coffman conditions: 1. Mutual Exclusion (resources cannot be shared simultaneously), 2. Hold and Wait (processes hold allocated resources while requesting new ones), 3. No Preemption (resources cannot be forcibly confiscated), 4. Circular Wait (a closed chain of processes each waiting for a resource held by the next). Banker's Algorithm avoids deadlock by dynamically testing if resource allocation leaves the system in a 'Safe State'—where at least one sequence of process completions exists such that all can finish without deadlock.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How can we architect software to mathematically eliminate the Circular Wait condition?",
        interviewerIntent: "Practical lock ordering discipline.",
        strongCandidateAnswer: "Impose a global total ordering on all lockable resources (e.g., Lock ID 1 < Lock ID 2 < Lock ID 3) and enforce that threads must always acquire locks in strictly increasing numerical order. This makes a circular dependency graph impossible.",
        keyKeywords: ["Global lock ordering", "Resource hierarchy", "Strict acquisition order"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "What is the difference between Deadlock Prevention and Deadlock Avoidance?",
        interviewerIntent: "Verify theoretical distinction.",
        strongCandidateAnswer: "Deadlock Prevention statically eliminates at least one Coffman condition by design (e.g. lock ordering). Deadlock Avoidance allows all four conditions to potentially exist but makes runtime dynamic checks (e.g. Banker's safety check) before granting allocations.",
        keyKeywords: ["Static prevention", "Dynamic avoidance", "Safe state check"]
      }
    ]
  },
  {
    id: "os-06",
    title: "Mutex vs Semaphore vs Spinlock vs Monitor",
    topic: "Operating Systems",
    subtopic: "Synchronization",
    difficulty: "Medium",
    format: "Short Answer",
    companies: ["Google", "Microsoft", "Meta", "Atlassian"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Microsoft",
      role: "SWE II",
      year: 2024,
      sourceReference: "Microsoft Core Engineering Interview"
    },
    question: "Differentiate Mutex, Counting Semaphore, Spinlock, and Monitor. When is a spinlock superior to a mutex?",
    detailedExplanation: "A Mutex is a locking mechanism with ownership (only the locking thread can unlock it). A Semaphore is a signaling mechanism (counter value, can be signaled by any thread, no ownership). A Spinlock repeatedly loops checking a lock variable without putting the thread to sleep. A Monitor is a high-level language construct combining mutual exclusion and condition variables (e.g. Java synchronized). A Spinlock is superior in low-latency multicore systems when the critical section is extremely short (a few CPU instructions) and context-switch sleep overhead (>1 microsecond) exceeds busy-wait time.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Can a spinlock ever be useful on a single-core uniprocessor machine?",
        interviewerIntent: "Detect edge-case architectural reasoning.",
        strongCandidateAnswer: "No! On a single CPU core, spinning monopolizes the only CPU, preventing the lock-holding thread from ever running and releasing the lock (unless preempted by timer interrupt).",
        keyKeywords: ["Uniprocessor", "CPU starvation", "Useless spinning"]
      }
    ]
  },
  {
    id: "os-07",
    title: "mmap vs read()/write() File I/O Internals",
    topic: "Operating Systems",
    subtopic: "File Systems & Virtual Memory",
    difficulty: "Hard",
    format: "Design / Systems Reasoning",
    companies: ["Google", "Meta", "Nvidia", "Uber"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Meta",
      role: "Systems / Infra Engineer",
      year: 2024,
      sourceReference: "Meta Core Systems Phone Screen"
    },
    question: "How does memory-mapped I/O (mmap) work internally compared to standard read() and write() system calls, and why does mmap achieve zero-copy reads?",
    detailedExplanation: "Standard read() involves: 1. System call trap to kernel, 2. Kernel reads data from disk into kernel Page Cache, 3. Kernel copies data from Page Cache to user-space buffer (CPU memory copy). mmap() maps the kernel Page Cache pages directly into the process's virtual address space page table. When user space reads from the mapped pointer, the CPU accesses the Page Cache directly without copying across user/kernel boundary. Disk reads happen via demand paging page faults.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is the primary downside or risk of using mmap on large files on 32-bit systems?",
        interviewerIntent: "Address space saturation knowledge.",
        strongCandidateAnswer: "Virtual address space exhaustion. A 32-bit architecture only has 4 GB of address space (often 2-3 GB for user space), so mapping a 10 GB file fails due to lack of contiguous virtual addresses.",
        keyKeywords: ["Address space exhaustion", "32-bit limit", "4GB boundary"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "What happens if another process truncates a file while your program is reading via mmap?",
        interviewerIntent: "Evaluate fault handling expertise.",
        strongCandidateAnswer: "Accessing the memory beyond the new end of file triggers a SIGBUS signal, which immediately terminates the process unless a SIGBUS signal handler is specifically configured.",
        keyKeywords: ["SIGBUS", "File truncation", "Invalid memory address"]
      }
    ]
  },
  {
    id: "os-08",
    title: "Inter-Process Communication (IPC) Mechanisms & Performance",
    topic: "Operating Systems",
    subtopic: "IPC",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Amazon", "Google", "Apple", "Microsoft"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Google",
      role: "SRE / SWE",
      year: 2023,
      sourceReference: "Google Systems Engineering Interview"
    },
    question: "Rank the common IPC mechanisms (Pipes, Unix Domain Sockets, Message Queues, Shared Memory) in terms of throughput and explain why Shared Memory is the fastest.",
    detailedExplanation: "Performance ranking (Fastest to Slowest): 1. Shared Memory, 2. Unix Domain Sockets, 3. Named/Anonymous Pipes, 4. Network Sockets. Shared Memory is the fastest because once the shared memory region is mapped into both processes' virtual address spaces, data exchange requires ZERO kernel system calls and ZERO data copying—processes read and write directly to RAM. Synchronization must be coordinated using user-space semaphores or mutexes (e.g. futex).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Why are Unix Domain Sockets often preferred over Shared Memory in real microservices despite being slightly slower?",
        interviewerIntent: "Practical engineering trade-offs.",
        strongCandidateAnswer: "Unix Domain Sockets provide built-in OS buffering, standard stream/datagram semantics, access control (file permissions), and automatic synchronization without complex user-space lock management or crash corruption risks.",
        keyKeywords: ["Built-in buffering", "Simplicity", "Access control", "No corruption"]
      }
    ]
  },
  {
    id: "os-09",
    title: "Copy-on-Write (COW) during fork() & exec()",
    topic: "Operating Systems",
    subtopic: "Process Management",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Microsoft", "Google", "Uber", "Oracle"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Microsoft",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Microsoft Core CS Interview Loop"
    },
    question: "What is Copy-on-Write (COW) and how does it optimize process creation with fork() in Linux?",
    detailedExplanation: "Without COW, fork() would have to duplicate the entire physical RAM of the parent process, which is very slow and wasteful (especially if followed immediately by exec()). With COW, the kernel creates child page tables pointing to the parent's existing physical frames, but marks all writable pages as Read-Only. When either parent or child attempts to write to a page, the MMU triggers a Page Fault. The kernel traps this, allocates a new physical frame, copies the 4 KB page data, and marks the PTE as Writable for that process.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How does Redis take advantage of COW when saving background snapshots (BGSAVE)?",
        interviewerIntent: "Real-world database application of OS concepts.",
        strongCandidateAnswer: "Redis forks a child process to write the RDB file. The child has a point-in-time snapshot of the database without copying all RAM. The parent Redis process continues serving writes; only modified pages trigger COW duplication in physical memory.",
        keyKeywords: ["Redis BGSAVE", "Point-in-time snapshot", "Minimal RAM overhead"]
      }
    ]
  },
  {
    id: "os-10",
    title: "epoll vs select vs poll: High-Concurrency I/O Multiplexing",
    topic: "Operating Systems",
    subtopic: "I/O Management",
    difficulty: "Extreme",
    format: "Design / Systems Reasoning",
    companies: ["Meta", "Google", "Uber", "Amazon"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Google",
      role: "Senior SWE / Distributed Systems",
      year: 2024,
      sourceReference: "Google High-Throughput Networking & Systems Onsite"
    },
    question: "Why does select()/poll() have O(N) complexity for N file descriptors while epoll achieves O(1) event notification? Explain the underlying kernel data structures.",
    detailedExplanation: "select() and poll() require the user process to pass an array/bitmask of all N descriptors to the kernel on every call. The kernel scans all N descriptors, registers callbacks on each socket's wait queue, and upon wake-up, user space must linearly scan O(N) descriptors to discover which ones are ready. epoll splits this into epoll_create (creates an epoll instance with an in-kernel Red-Black Tree to store registered FDs and an event Ready List implemented as a Doubly Linked List), epoll_ctl (O(log N) registration), and epoll_wait (O(1) retrieval of only active ready descriptors via the ready list populated by NIC interrupt callbacks).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is the difference between Edge-Triggered (ET) and Level-Triggered (LT) mode in epoll?",
        interviewerIntent: "Deep I/O state handling.",
        strongCandidateAnswer: "Level-Triggered (default) returns an FD in epoll_wait as long as there is unread data in the buffer. Edge-Triggered only triggers once when new data arrives (state transition from not-ready to ready). In ET mode, the application MUST drain the socket until EAGAIN/EWOULDBLOCK, otherwise data will hang unread indefinitely.",
        keyKeywords: ["Edge-triggered", "Level-triggered", "EAGAIN", "Non-blocking drain"]
      }
    ]
  },
  {
    id: "os-11",
    title: "TLB (Translation Lookaside Buffer) & HugePages Optimization",
    topic: "Operating Systems",
    subtopic: "Memory Management",
    difficulty: "Hard",
    format: "Explanation",
    companies: ["Google", "Nvidia", "Meta", "Amazon"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Google",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Google Low-Level Systems & Performance"
    },
    question: "What is the role of the TLB in memory translation? How do HugePages (2 MB / 1 GB) improve memory-intensive database performance?",
    detailedExplanation: "Virtual-to-physical address translation requires a 4-level page table walk in x86-64 (up to 4 memory lookups for a single virtual address). The TLB is an on-chip associative cache that stores recent virtual-to-physical page frame translations. A TLB hit resolves translation in ~1 cycle. HugePages (2MB or 1GB instead of standard 4KB) reduce the number of page table entries required by 512x to 262,144x. This allows the TLB to cover vast amounts of working memory, drastically cutting TLB miss rates in large databases (like Postgres, Redis, MySQL).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is the trade-off of using HugePages?",
        interviewerIntent: "Assess understanding of internal memory fragmentation.",
        strongCandidateAnswer: "Internal fragmentation (wasting unused memory if a 2MB page is allocated for small data) and memory allocation latency when the kernel struggles to find contiguous physical memory blocks.",
        keyKeywords: ["Internal fragmentation", "Contiguous physical memory", "Compaction"]
      }
    ]
  },
  {
    id: "os-12",
    title: "CPU Scheduling: CFS (Completely Fair Scheduler) & Virtual Runtime",
    topic: "Operating Systems",
    subtopic: "CPU Scheduling",
    difficulty: "Hard",
    format: "Explanation",
    companies: ["Google", "Microsoft", "Meta", "Red Hat"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Google",
      role: "Kernel / Infra SWE",
      year: 2023,
      sourceReference: "Google OS Internals Interview"
    },
    question: "How does the Linux Completely Fair Scheduler (CFS) use Red-Black trees and 'vruntime' (virtual runtime) to schedule tasks fairly without traditional fixed time slices?",
    detailedExplanation: "CFS models an 'ideal multi-tasking CPU'. Each runnable task has a metric called `vruntime` (the amount of CPU time the task has consumed, scaled by its nice/priority weight). All runnable tasks are stored in a Red-Black Tree keyed by `vruntime`. CFS always picks the leftmost node (task with the smallest vruntime). As that task executes, its vruntime increases. When it exceeds other tasks, it is re-inserted into the RB-tree and the CPU switches to the new leftmost task.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What happens when an I/O-bound process wakes up after sleeping for 10 seconds?",
        interviewerIntent: "Evaluate latency sensitivity vs fairness.",
        strongCandidateAnswer: "If its old vruntime remained unchanged, it would monopolize the CPU for 10 seconds. To prevent this, CFS resets its vruntime to `min_vruntime` (the minimum vruntime among active tasks) minus a small latency bonus, giving it quick interactive responsiveness without starving other tasks.",
        keyKeywords: ["min_vruntime", "Interactive bonus", "I/O bound responsiveness"]
      }
    ]
  },
  {
    id: "os-13",
    title: "Zombie Processes vs Orphan Processes & waitpid() Reaper",
    topic: "Operating Systems",
    subtopic: "Process Management",
    difficulty: "Medium",
    format: "Scenario",
    companies: ["Amazon", "Microsoft", "Uber", "Atlassian"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE I / SDE II",
      year: 2024,
      sourceReference: "Amazon Core CS Fundamentals Loop"
    },
    question: "What is the difference between a Zombie process and an Orphan process? Why can an accumulation of Zombie processes harm a Linux production server?",
    detailedExplanation: "An Orphan process is a running child process whose parent terminated before it; it is immediately adopted by `init` (PID 1 or systemd), which reaps its exit status. A Zombie process is a process that has completed execution via `exit()`, but its entry remains in the Process Table because its parent has not yet read its exit status code via `wait()` or `waitpid()`. A zombie consumes zero CPU and zero RAM, but it consumes a Process ID (PID). If zombies accumulate, the system runs out of PIDs (`PID exhaustion`), preventing any new processes or threads from being created.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How can you kill a zombie process if `kill -9 <PID>` does nothing?",
        interviewerIntent: "Operational knowledge of signals.",
        strongCandidateAnswer: "You cannot kill a zombie with SIGKILL because it is already dead. You must either: 1. Send SIGCHLD to the parent process so it calls waitpid(), or 2. Kill the parent process, causing the zombie child to be adopted by init/PID 1, which immediately reaps it.",
        keyKeywords: ["SIGCHLD", "SIGKILL ineffective", "Kill parent", "Adopted by PID 1"]
      }
    ]
  },
  {
    id: "os-14",
    title: "Inodes, File Descriptors, Hard Links vs Soft (Symbolic) Links",
    topic: "Operating Systems",
    subtopic: "File Systems",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Google", "Apple", "Microsoft", "Oracle"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Apple",
      role: "Software Engineer - CoreOS",
      year: 2023,
      sourceReference: "Apple Low-Level Systems & OS Interview"
    },
    question: "Explain the relationship between File Descriptors, File Table Entries, and Inodes. What is the fundamental difference between Hard Links and Soft (Symbolic) Links?",
    detailedExplanation: "An Inode (Index Node) stores file metadata (file size, permissions, owner, timestamps, and pointers to disk data blocks), but does NOT store the filename or file contents. A directory is simply a table mapping filenames to Inode numbers. A Hard Link creates a new directory entry pointing to the SAME Inode number (increasing the Inode's `link_count`). Deleting the original filename does NOT delete the data until link_count hits 0. A Soft Link (Symlink) is a distinct Inode whose data block contains the string path to another target file; deleting the target creates a broken link.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Can you create a Hard Link across different filesystems or partitions? Why or why not?",
        interviewerIntent: "Inode scoping across disk partitions.",
        strongCandidateAnswer: "No. Inode numbers are unique only within a specific filesystem instance. Different partitions have independent Inode numbering tables, so hard links across filesystems are forbidden. Soft links work across filesystems because they store path strings.",
        keyKeywords: ["Cross-filesystem limitation", "Inode scoping", "Path resolution"]
      }
    ]
  },
  {
    id: "os-15",
    title: "Belady's Anomaly & Page Replacement (FIFO vs LRU vs Optimal)",
    topic: "Operating Systems",
    subtopic: "Memory Management",
    difficulty: "Medium",
    format: "MCQ",
    companies: ["Microsoft", "Google", "Amazon"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Microsoft",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Microsoft Technical Screening"
    },
    question: "What is Belady's Anomaly in page replacement algorithms, and which algorithm exhibits it?",
    options: [
      "A. Increasing physical frames causes more page faults in FIFO",
      "B. Increasing physical frames causes more page faults in LRU",
      "C. Decreasing physical frames eliminates page faults in Optimal",
      "D. LRU performs worse than Random under high memory pressure"
    ],
    correctAnswer: 0,
    detailedExplanation: "Belady's Anomaly is the phenomenon where increasing the number of physical page frames results in an INCREASE (rather than a decrease) in the number of page faults for certain access patterns. It occurs in FIFO (First-In, First-Out) replacement because FIFO is not a 'Stack Algorithm'. Stack algorithms (like LRU and Optimal) satisfy the inclusion property: the set of pages in memory for N frames is always a subset of pages for N+1 frames, mathematically guaranteeing no Belady's Anomaly.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Why do production kernels use Clock Algorithm (Second Chance) instead of strict LRU for page replacement?",
        interviewerIntent: "Real-world algorithm trade-offs.",
        strongCandidateAnswer: "Strict LRU requires updating a doubly linked list or timestamp on EVERY single memory access, causing intolerable memory bus overhead. The Clock algorithm approximates LRU using a hardware-supported 1-bit 'Access Bit' in page table entries with circular pointer traversal, achieving near-LRU efficiency with O(1) negligible overhead.",
        keyKeywords: ["Access bit", "Clock algorithm", "Hardware PTE support", "Zero-overhead approximation"]
      }
    ]
  }
];
