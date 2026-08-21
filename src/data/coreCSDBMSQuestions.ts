import { CoreCSQuestion } from "./coreCSTypes.js";

export const CORE_CS_DBMS_QUESTIONS: CoreCSQuestion[] = [
  {
    id: "dbms-01",
    title: "ACID Properties & Transaction Guarantees",
    topic: "DBMS",
    subtopic: "Transactions & Concurrency",
    difficulty: "Easy",
    format: "Explanation",
    companies: ["Google", "Amazon", "Microsoft", "Oracle", "Uber"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE I / SDE II",
      year: 2024,
      sourceReference: "Amazon Database Fundamentals & Low-Level Design"
    },
    question: "Explain the four ACID properties of a database transaction. How does the database engine technically guarantee Durability and Atomicity in case of sudden power loss?",
    detailedExplanation: "Atomicity: All operations in a transaction succeed or all are rolled back. Consistency: The database transitions from one valid state to another satisfying all schema constraints and foreign keys. Isolation: Concurrent transactions execute without interfering with one another. Durability: Once committed, updates are permanently saved even across power crashes. Atomicity and Durability are achieved using Write-Ahead Logging (WAL) and Undo/Redo logs: before any data page in RAM is modified on disk, the intent log record is sequentially flushed to non-volatile disk storage (fsync). On reboot, REDO logs replay committed transactions and UNDO logs rollback uncommitted transactions.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Why does WAL flush to disk faster than writing the actual table data pages?",
        interviewerIntent: "Storage mechanics and sequential vs random I/O.",
        strongCandidateAnswer: "WAL is strictly sequential append-only disk I/O, which achieves maximum disk throughput (especially on HDDs and SSD block storage). Table data pages are scattered randomly across the B+ Tree files, so updating pages directly would require slow random I/O.",
        keyKeywords: ["Sequential append-only", "Random I/O avoidance", "fsync", "Redo log"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "What is the purpose of Checkpointing in WAL?",
        interviewerIntent: "Assess understanding of crash recovery time.",
        strongCandidateAnswer: "Checkpointing flushes all dirty RAM pages to disk and records a safe watermark. During crash recovery, the database only needs to replay WAL entries after the latest checkpoint watermark, preventing unbounded recovery replay times.",
        keyKeywords: ["Dirty pages flush", "Watermark", "Crash recovery time", "Bounded replay"]
      }
    ],
    systemsDeepDive: {
      whyItMattersInProduction: "Fundamental for configuring database fsync latency, write amplification, and high-availability database cluster replication.",
      commonPitfalls: ["Assuming 'auto-commit' makes individual statements faster (it actually incurs a WAL fsync per statement)."],
      tradeoffsOrPerformanceImpact: "Strict ACID durability requires disk fsync per commit, bounding write throughput to disk IOPS without group committing."
    }
  },
  {
    id: "dbms-02",
    title: "SQL Isolation Levels: Dirty Reads, Non-Repeatable Reads & Phantom Reads",
    topic: "DBMS",
    subtopic: "Transactions & Isolation",
    difficulty: "Medium",
    format: "Scenario",
    companies: ["Microsoft", "Google", "Amazon", "Salesforce", "Atlassian"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Microsoft",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Microsoft Core Engineering Interview (Transactional Integrity)"
    },
    question: "Define the 4 standard ANSI SQL isolation levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable). What specific anomalies (Dirty Read, Non-Repeatable Read, Phantom Read) are allowed or prevented at each level?",
    detailedExplanation: "1. Read Uncommitted: Allows Dirty Reads (reading uncommitted changes of another Tx that might be rolled back). 2. Read Committed: Prevents Dirty Reads; allows Non-Repeatable Reads (reading the same row twice gives different values if another Tx commits an update) and Phantom Reads. 3. Repeatable Read: Prevents Dirty Reads and Non-Repeatable Reads; standard ANSI allows Phantom Reads (new rows inserted matching a query condition), though MySQL InnoDB prevents phantoms using Next-Key Locks. 4. Serializable: Strictly isolates transactions, preventing all anomalies via two-phase locking or serializable snapshot isolation.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Give a concrete example of a Phantom Read vs a Non-Repeatable Read.",
        interviewerIntent: "Validate exact distinction.",
        strongCandidateAnswer: "Non-Repeatable Read involves modifying an EXISTING row (Tx1 reads balance=$100, Tx2 updates balance=$200 and commits, Tx1 reads again and sees $200). Phantom Read involves INSERTING a NEW row (Tx1 counts 5 active users, Tx2 inserts a 6th user and commits, Tx1 counts again with same WHERE clause and sees 6 rows).",
        keyKeywords: ["Existing row update", "New row insert", "Predicate query"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "How does MVCC (Multi-Version Concurrency Control) implement Repeatable Read without locking rows during reads?",
        interviewerIntent: "Deep MVCC mechanics (PostgreSQL / MySQL InnoDB).",
        strongCandidateAnswer: "Each transaction is assigned a Transaction ID / Read View timestamp. Each row stores creation and deletion transaction IDs (e.g. xmin/xmax in Postgres). When Tx reads, it only sees row versions created BEFORE its read view snapshot and not deleted by a committed transaction, so reads never block writes and writes never block reads.",
        keyKeywords: ["Read View snapshot", "xmin/xmax", "Non-blocking reads", "Row versions"]
      }
    ]
  },
  {
    id: "dbms-03",
    title: "B+ Tree vs B-Tree Indexing Internals in Relational Databases",
    topic: "DBMS",
    subtopic: "Indexing & Storage",
    difficulty: "Hard",
    format: "Design / Systems Reasoning",
    companies: ["Google", "Amazon", "Uber", "Apple", "Oracle"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Google",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Google Database Engine & Storage Systems Interview"
    },
    question: "Why do relational database engines (like MySQL InnoDB and PostgreSQL) use B+ Trees instead of standard B-Trees or Hash tables for primary index storage?",
    detailedExplanation: "In a B+ Tree: 1. Data records (or row pointers) are ONLY stored in the leaf nodes; internal nodes only store keys and routing pointers. This maximizes the fan-out (branching factor) of internal nodes, making the tree very short (depth 3-4 for billions of rows) and fitting internal nodes in RAM. 2. All leaf nodes are linked sequentially via a Doubly Linked List, enabling extremely fast range scans (e.g., `WHERE age BETWEEN 20 AND 30` only requires finding the lower bound with O(log N) search and then traversing the linked list). In contrast, standard B-Trees store data in internal nodes (reducing fan-out) and require full in-order tree traversal for range queries. Hash indexes only support O(1) exact equality (`=`) and cannot do range queries (`<`, `>`, `BETWEEN`, `ORDER BY`).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How many disk I/O operations are needed to read a row from an InnoDB B+ Tree of depth 3?",
        interviewerIntent: "Cache & B+ tree traversal calculation.",
        strongCandidateAnswer: "At most 1 disk I/O. The root node and second-level branch nodes are heavily accessed and almost permanently cached in the Buffer Pool (RAM). Only the target leaf page might require a single random disk read if it is not already in RAM.",
        keyKeywords: ["Buffer pool caching", "Depth 3-4", "Single leaf disk I/O", "Fan-out ~1000"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "What is an LSM-Tree (Log-Structured Merge-Tree) and why is it preferred over B+ Tree in write-heavy databases (Cassandra, RocksDB)?",
        interviewerIntent: "B+ Tree vs LSM Tree trade-offs.",
        strongCandidateAnswer: "B+ Trees suffer from random disk writes and write amplification during page splits. LSM-Trees buffer writes in RAM (MemTable) and flush them to disk sequentially as immutable SSTables (Sorted String Tables). Background compaction merges SSTables, converting random writes into high-speed sequential writes at the cost of slightly slower point reads.",
        keyKeywords: ["MemTable", "SSTables", "Sequential writes", "Compaction", "Write amplification"]
      }
    ]
  },
  {
    id: "dbms-04",
    title: "Clustered vs Non-Clustered (Secondary) Index Mechanics",
    topic: "DBMS",
    subtopic: "Indexing",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Microsoft", "Amazon", "Adobe", "Salesforce"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Microsoft",
      role: "SDE II",
      year: 2024,
      sourceReference: "Microsoft Database Design & SQL Optimization Loop"
    },
    question: "What is the structural difference between a Clustered Index and a Non-Clustered (Secondary) Index? Why can a table have only ONE Clustered Index?",
    detailedExplanation: "A Clustered Index dictates the physical ordering of the actual data rows on disk. In InnoDB, the leaf nodes of the Clustered Index B+ Tree contain the complete table row data. Because physical rows can only be sorted in one physical sequence on disk, there can only be ONE clustered index per table (usually the Primary Key). A Non-Clustered (Secondary) Index is a separate B+ Tree where the leaf nodes contain the indexed column key and a reference to the Clustered Key (Primary Key). Querying via a secondary index that needs unindexed columns requires a 'Bookmark Lookup' (searching the secondary index, getting the PK, then traversing the clustered index).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is a 'Covering Index' and how does it eliminate the secondary index lookup overhead?",
        interviewerIntent: "Query optimization mastery.",
        strongCandidateAnswer: "A Covering Index contains all the columns requested in the SELECT clause (either in the index key or via INCLUDE clause). The query engine satisfies the entire query directly from the secondary index leaf node without performing any secondary lookup into the clustered index table.",
        keyKeywords: ["Covering index", "Index-only scan", "No table lookup", "INCLUDE columns"]
      }
    ]
  },
  {
    id: "dbms-05",
    title: "Why Adding an Index Slows Down Write Operations",
    topic: "DBMS",
    subtopic: "Performance & Tuning",
    difficulty: "Medium",
    format: "Scenario",
    companies: ["Google", "Amazon", "Uber", "Meta"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Uber",
      role: "Backend SWE",
      year: 2023,
      sourceReference: "Uber High-Volume Payments & Trip Ledger Interview"
    },
    question: "Why does adding multiple indexes improve SELECT performance but degrade INSERT, UPDATE, and DELETE throughput? What occurs under the hood?",
    detailedExplanation: "Every index on a table is a distinct B+ Tree data structure stored on disk. When a row is INSERTED: 1. The row is written to the Clustered Index B+ Tree (which may trigger page splits). 2. For EVERY secondary index on the table, a new entry must be inserted into that index's B+ Tree. If the secondary index page is not in the Buffer Pool, it incurs random disk I/O and potential B+ Tree page rebalancing. For UPDATES: modifying an indexed column requires deleting the old key and inserting the new key in that index tree. For DELETES: the entry must be removed from all index trees. Thus, N indexes multiply the write cost by N.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is Index Selectivity and why would a database query optimizer ignore an index on a boolean column (e.g. `is_active`)?",
        interviewerIntent: "Optimizer heuristics & table scans.",
        strongCandidateAnswer: "Index Selectivity is `(Count of Distinct Values) / (Total Rows)`. A boolean column has terrible selectivity (only 2 distinct values, ~50% rows match). Using a secondary index would require traversing the index and doing random table lookups for 50% of the rows, which is far slower than a single sequential Full Table Scan.",
        keyKeywords: ["Selectivity", "Full table scan cheaper", "Random I/O penalty"]
      }
    ]
  },
  {
    id: "dbms-06",
    title: "Database Normalization: 1NF, 2NF, 3NF, BCNF & Denormalization",
    topic: "DBMS",
    subtopic: "Schema Design",
    difficulty: "Medium",
    format: "Short Answer",
    companies: ["Oracle", "Microsoft", "Amazon", "Adobe"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Oracle",
      role: "Database Kernel / Application SWE",
      year: 2024,
      sourceReference: "Oracle Relational Database Schema Design"
    },
    question: "Explain 1NF, 2NF, 3NF, and BCNF. When and why is intentional Denormalization practiced in high-scale systems?",
    detailedExplanation: "1NF: Atomic values (no repeating groups/arrays in columns). 2NF: In 1NF and no Partial Functional Dependency (all non-key attributes depend on the entire candidate key, relevant for composite keys). 3NF: In 2NF and no Transitive Functional Dependency (no non-key attribute depends on another non-key attribute: A -> B -> C). BCNF (Boyce-Codd): Stricter 3NF where for every functional dependency X -> Y, X must be a super key. Denormalization intentionally re-introduces controlled redundancy in read-heavy OLAP/production systems to avoid expensive multi-table JOINs and reduce query latency.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What anomalies occur if a table is not normalized to 3NF?",
        interviewerIntent: "Identify concrete CRUD anomalies.",
        strongCandidateAnswer: "Insertion Anomaly (cannot insert a department without an employee), Deletion Anomaly (deleting the last employee accidentally deletes the department data), and Update Anomaly (updating department name requires updating thousands of employee rows, risking inconsistent data).",
        keyKeywords: ["Insertion anomaly", "Deletion anomaly", "Update anomaly", "Data redundancy"]
      }
    ]
  },
  {
    id: "dbms-07",
    title: "Two-Phase Locking (2PL) vs Two-Phase Commit (2PC)",
    topic: "DBMS",
    subtopic: "Concurrency & Distributed Transactions",
    difficulty: "Hard",
    format: "Explanation",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Google",
      role: "Staff SWE / Distributed DB",
      year: 2024,
      sourceReference: "Google Spanner & Transactional Systems Interview"
    },
    question: "Distinguish Two-Phase Locking (2PL) from Two-Phase Commit (2PC). What distinct problems do they solve?",
    detailedExplanation: "Two-Phase Locking (2PL) is a single-database concurrency control protocol that guarantees Serializability. It has two phases: Growing Phase (acquires locks, releases none) and Shrinking Phase (releases locks, acquires no new locks). Strict 2PL holds all exclusive locks until commit/rollback to prevent cascading aborts. Two-Phase Commit (2PC) is a distributed consensus protocol ensuring Atomicity across MULTIPLE independent database nodes/services. It has two phases: 1. Prepare Phase (Coordinator asks all participants if they can commit; participants write prepare log and vote YES/NO), 2. Commit Phase (If all vote YES, coordinator sends COMMIT; if any votes NO or times out, sends ROLLBACK).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is the major vulnerability of basic 2PC if the coordinator crashes during the Commit phase?",
        interviewerIntent: "Distributed blocking coordinator failure.",
        strongCandidateAnswer: "2PC is a blocking protocol. If the coordinator crashes after participants have voted YES in the Prepare phase, the participant nodes are left in doubt (holding locks on local data) unable to commit or abort until the coordinator recovers.",
        keyKeywords: ["Blocking protocol", "Coordinator single point of failure", "Participant locks held in doubt"]
      }
    ]
  },
  {
    id: "dbms-08",
    title: "Database Deadlock Detection & Deadlock Graphs (Wait-For Graph)",
    topic: "DBMS",
    subtopic: "Transactions & Locks",
    difficulty: "Hard",
    format: "Scenario",
    companies: ["Amazon", "Uber", "Microsoft"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE II",
      year: 2024,
      sourceReference: "Amazon Database Concurrency & Deadlocks"
    },
    question: "How does a database engine detect deadlocks among concurrent transactions, and how does it resolve them?",
    detailedExplanation: "The database builds a dynamic directed graph called a 'Wait-For Graph' (WFG). Nodes represent active transactions; a directed edge from Tx1 -> Tx2 means Tx1 is waiting for a lock held by Tx2. A background thread runs periodic cycle-detection algorithms (e.g. Tarjan's DFS for strongly connected components). If a cycle is detected (e.g. Tx1 -> Tx2 -> Tx1), a deadlock exists. The database resolves it by selecting a 'victim' transaction based on lowest cost (e.g., fewest updates made or lowest priority), rolling back the victim transaction, releasing its locks, and returning a Serialization/Deadlock error (SQLSTATE 40P01 / Error 1213) to the client.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How should client application code gracefully handle deadlock errors?",
        interviewerIntent: "Client-side resilience.",
        strongCandidateAnswer: "Implement exponential backoff with jitter and retry the entire transaction. Because deadlocks are transient race conditions, retrying almost always succeeds on the subsequent attempt.",
        keyKeywords: ["Exponential backoff", "Jitter", "Client retry", "Transient error"]
      }
    ]
  }
];
