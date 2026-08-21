import { CoreCSQuestion } from "./coreCSTypes.js";

export const CORE_CS_DISTRIBUTED_QUESTIONS: CoreCSQuestion[] = [
  {
    id: "dist-01",
    title: "CAP Theorem vs PACELC Theorem in Distributed Databases",
    topic: "Distributed Systems Fundamentals",
    subtopic: "Consistency Models",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Uber"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Google",
      role: "Distributed Systems SWE",
      year: 2024,
      sourceReference: "Google Distributed Systems & Spanner vs Bigtable Trade-offs"
    },
    question: "Explain the CAP theorem. Why is the PACELC theorem a more accurate description of distributed database behavior during normal, non-partitioned operations?",
    detailedExplanation: "CAP Theorem states that in a distributed network with network Partitions (P), a database can guarantee Consistency (C) OR Availability (A), but never both. PACELC theorem expands CAP: If there is a Partition (P), choose between Availability (A) and Consistency (C); ELSE (E), when the network is running normally without partitions, choose between Latency (L) and Consistency (C). For example, DynamoDB/Cassandra are PA/EL (choosing Availability during partitions, and Low Latency during normal operations via eventual consistency). Spanner/HBase are PC/EC (choosing Consistency during partitions, and Strong Consistency during normal operations at the cost of higher replication latency).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is Linearizability vs Sequential Consistency?",
        interviewerIntent: "Advanced consistency level definitions.",
        strongCandidateAnswer: "Linearizability (Strict Consistency) requires that if Op1 completes before Op2 starts in real physical time (wall clock), Op2 must see the effects of Op1 across all nodes. Sequential Consistency does not require real physical time ordering, only that all nodes observe operations in the exact same logical program sequence.",
        keyKeywords: ["Linearizability", "Real wall-clock time", "Sequential consistency", "Logical program order"]
      }
    ]
  },
  {
    id: "dist-02",
    title: "Consistent Hashing with Virtual Nodes (VNodes)",
    topic: "Distributed Systems Fundamentals",
    subtopic: "Data Partitioning",
    difficulty: "Hard",
    format: "Design / Systems Reasoning",
    companies: ["Amazon", "Uber", "Meta", "Netflix"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE II - Dynamo / Storage",
      year: 2024,
      sourceReference: "Amazon Dynamo Paper & Distributed Partitioning"
    },
    question: "How does Consistent Hashing minimize data movement when nodes join or leave a cluster compared to `hash(key) % N`? Why are Virtual Nodes (VNodes) necessary?",
    detailedExplanation: "In standard `hash(key) % N`, adding or removing a single node changes N to N+1 or N-1, remapping ~100% of keys across the cluster and triggering massive cache stampedes. Consistent Hashing maps both keys and servers onto a circular 360-degree hash ring [0, 2^32-1]. A key is assigned to the first server encountered moving clockwise. When a node is added/removed, only `K/N` keys (where K is total keys and N is servers) need remapping. Virtual Nodes (assigning each physical server 100-500 points across the ring) solve non-uniform key distribution (hot spots) and enable heterogeneous capacity weighting.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is the time complexity to find the owner node for a key on a consistent hash ring with M virtual nodes?",
        interviewerIntent: "Ring lookup implementation.",
        strongCandidateAnswer: "O(log M) using Binary Search (e.g. `std::map::upper_bound` in C++ or `TreeMap.ceilingKey` in Java) over an array or red-black tree of sorted ring token hashes.",
        keyKeywords: ["O(log M)", "Binary search", "upper_bound", "TreeMap ceilingKey"]
      }
    ]
  }
];
