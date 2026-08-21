import { SystemDesignProblem } from "./systemDesignTypes.js";

export const SYSTEM_DESIGN_FUNDAMENTALS: SystemDesignProblem[] = [
  {
    id: "sd_fund_001",
    title: "SOLID Principles & Clean Architectural Decomposition",
    difficulty: "Easy",
    designType: "Fundamentals",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Amazon", "Microsoft", "Google", "Atlassian", "Adobe", "Salesforce"],
    reportedMetadata: {
      company: "Amazon",
      role: "SDE I / SDE II",
      approxYear: "2023",
      round: "Object-Oriented Design & Code Quality Screening",
      sourceNote: "Commonly tested across Amazon LLD rounds to evaluate code maintainability and adherence to OOP best practices."
    },
    categoryTag: "OOP & Clean Code",
    problemStatement:
      "Explain and demonstrate the five SOLID principles in real-world software engineering with architectural code examples. Illustrate how violating each principle introduces fragile coupling, regression bugs, and impedance to refactoring, and show the clean refactored design.",
    functionalRequirements: [
      "Demonstrate Single Responsibility Principle (SRP): A class should have only one reason to change.",
      "Demonstrate Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.",
      "Demonstrate Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering program correctness.",
      "Demonstrate Interface Segregation Principle (ISP): Clients should not be forced to depend upon interfaces they do not use.",
      "Demonstrate Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules; both should depend on abstractions."
    ],
    nonFunctionalRequirements: [
      "Extensibility: Adding new requirements should require zero modifications to tested core abstractions.",
      "Testability: Every component must be isolated and mockable via dependency injection.",
      "Maintainability: Clear boundaries between presentation, domain logic, and infrastructure."
    ],
    assumptions: [
      "We are modeling an e-commerce order checkout and invoice notification pipeline.",
      "Payment methods (Credit Card, UPI, PayPal) and notification channels (Email, SMS, Webhook) must be extensible without modifying core order processing logic."
    ],
    apiDesign: [
      {
        method: "POST",
        endpoint: "/orders/checkout",
        description: "Process order checkout, trigger payment, deduct inventory, and dispatch notification.",
        requestBody: '{\n  "orderId": "ord_9941",\n  "userId": "usr_102",\n  "items": [{ "sku": "prod_1", "qty": 2 }],\n  "paymentMethod": "UPI",\n  "paymentDetails": { "vpa": "alex@upi" }\n}',
        responseBody: '{\n  "status": "SUCCESS",\n  "transactionId": "txn_884910",\n  "receiptSent": true\n}'
      }
    ],
    dataModel: {
      type: "Relational (SQL)",
      entities: [
        {
          name: "Order",
          description: "Encapsulates order aggregate root domain state.",
          fields: ["order_id (VARCHAR)", "user_id (VARCHAR)", "total_amount (DECIMAL)", "status (ENUM)", "created_at (TIMESTAMP)"]
        },
        {
          name: "PaymentRecord",
          description: "Stores decoupled payment provider transaction references.",
          fields: ["payment_id (VARCHAR)", "order_id (VARCHAR)", "gateway (VARCHAR)", "amount (DECIMAL)", "status (VARCHAR)"]
        }
      ],
      explanation: "Domain entities strictly maintain business invariants. Database repositories are injected behind interfaces to adhere to DIP."
    },
    architecture: {
      diagramAscii: `
+-------------------------------------------------------------+
|                     OrderService (High-Level)               |
+-------------------------------------------------------------+
               |                       |              |
               v                       v              v
     +-------------------+    +----------------+  +-------------------+
     | IPaymentProcessor |    | INotification  |  | IOrderRepository  |
     +-------------------+    +----------------+  +-------------------+
               ^                       ^                  ^
       +-------+-------+               |                  |
       |               |        +------+-------+   +------+--------+
  [StripeAdapter]  [UPIAdapter] [EmailService] [SMSService] [PostgresOrderRepo]
      `,
      description: "Clean Onion / Hexagonal Architecture decoupling domain orchestration from external infrastructure gateways.",
      components: [
        { name: "OrderProcessor", role: "Domain Orchestrator", details: "Implements SRP by orchestrating checkout without handling raw SQL queries or HTTP socket calls." },
        { name: "PaymentProcessor Interface", role: "Abstraction (OCP/DIP)", details: "Allows plugging in new payment gateways without altering OrderProcessor." },
        { name: "NotificationChannel Interface", role: "Interface Segregation (ISP)", details: "Separates push, SMS, and email dispatchers so clients only subscribe to relevant protocols." }
      ]
    },
    databaseChoice: {
      primaryDb: "PostgreSQL (or any ACID relational store)",
      rationale: "Ensures transactional consistency for financial transactions and order state updates.",
      alternativeConsidered: "MongoDB (Document DB)",
      tradeoff: "MongoDB provides flexible schemas but lacks multi-table foreign key constraints and requires explicit two-phase commits for cross-document consistency."
    },
    concurrencyAndThreadSafety: "Thread-safe stateless service beans; state is confined to method stack frames and immutable Value Objects.",
    consistencyModel: "Strong consistency within the single database transaction boundary; eventual consistency for asynchronous notification dispatch.",
    availabilityAndFailover: "Stateless microservice instances running behind an Application Load Balancer with automated horizontal scaling.",
    failureScenarios: [
      { failure: "Payment Gateway Timeout", impact: "Order remains in PENDING state.", mitigation: "Exponential backoff retry with idempotent transaction keys and circuit breaking." },
      { failure: "Notification Service Outage", impact: "Email notification fails.", mitigation: "Transactional Outbox Pattern with Kafka/SQS dead-letter queue ensures notifications are retried asynchronously without blocking the checkout transaction." }
    ],
    security: [
      "PCI-DSS compliance: Never log or store raw CVV or plaintext card credentials.",
      "Input validation at the boundary using schema validators."
    ],
    monitoringObservability: [
      "Prometheus metrics for checkout latency (P50, P95, P99) and payment failure rate.",
      "Distributed tracing via OpenTelemetry correlation IDs across payment gateways."
    ],
    bottlenecks: [
      "Synchronous external HTTP calls to 3rd party payment gateways blocking application threads."
    ],
    tradeOffs: [
      {
        topic: "Synchronous Payment vs Event-Driven Asynchronous Settlement",
        optionA: "Synchronous HTTP RPC to Gateway",
        optionB: "Asynchronous Webhook Settlement",
        choiceMade: "Synchronous authorization with async webhook confirmation",
        why: "Provides immediate UX feedback while safeguarding against network disconnects via webhook idempotency."
      }
    ],
    interviewFollowUps: [
      {
        question: "How does the Open/Closed Principle prevent regression bugs in large teams?",
        interviewerContext: "Testing candidate's understanding of polymorphism vs conditional switches.",
        strongAnswer: "By introducing abstract interfaces (e.g., `IPaymentStrategy`), new providers are implemented as distinct classes. Existing code in `OrderProcessor` remains untouched, meaning existing unit tests cannot break and compiler guarantees isolation."
      },
      {
        question: "Explain a real violation of Liskov Substitution Principle (LSP).",
        interviewerContext: "Looking beyond the classic Rectangle-Square example to real system engineering.",
        strongAnswer: "Suppose `ReadOnlyRepository` extends `Repository`, but calling `delete()` throws `UnsupportedOperationException`. Any client expecting a general `Repository` will crash at runtime. LSP dictates that subclasses must honor all behavioral contracts and pre/post-conditions of the parent."
      },
      {
        question: "How do you apply Dependency Inversion with modern dependency injection frameworks?",
        interviewerContext: "Practical engineering experience.",
        strongAnswer: "Define interfaces in the domain core layer. Infrastructure adapters (e.g., `PostgresRepository`, `StripeClient`) implement these interfaces. The DI container binds the concrete classes at startup, decoupling business logic from third-party vendor libraries."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "IPaymentStrategy", type: "interface", responsibility: "Contract for executing monetary payments", methods: ["processPayment(amount: number, details: PaymentDetails): PaymentResult"] },
        { name: "INotificationSender", type: "interface", responsibility: "Contract for dispatching receipts", methods: ["sendReceipt(userId: string, receipt: Receipt): Promise<void>"] },
        { name: "OrderProcessor", type: "class", responsibility: "Coordinates order lifecycle using injected dependencies", methods: ["checkout(order: Order, paymentStrategy: IPaymentStrategy): Promise<CheckoutResult>"] }
      ],
      relationshipsUml: "OrderProcessor --> IPaymentStrategy (Dependency Injection)\nOrderProcessor --> INotificationSender (Dependency Injection)\nUPIPaymentStrategy ..|> IPaymentStrategy\nStripePaymentStrategy ..|> IPaymentStrategy\nEmailNotificationSender ..|> INotificationSender",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "OrderProcessor only coordinates checkout. Billing logic is isolated to PaymentStrategy; notification logic is isolated to NotificationSender." },
        { principle: "OCP", application: "New payment methods (e.g., ApplePay, Crypto) are added by implementing IPaymentStrategy without altering OrderProcessor." },
        { principle: "LSP", application: "All IPaymentStrategy implementations return standard PaymentResult with success/failure statuses without throwing unhandled domain errors." },
        { principle: "ISP", application: "Separated IPaymentStrategy from IRefundablePaymentStrategy so non-refundable methods don't have stubbed refund() methods." },
        { principle: "DIP", application: "OrderProcessor depends on IPaymentStrategy interface, not on concrete StripeClient or PayPalSdk." }
      ],
      designPatterns: [
        { pattern: "Strategy Pattern", whyUsed: "Allows runtime selection of payment algorithms based on user choice.", whyNotAlternative: "Avoids messy if-else / switch cascades on payment types.", tradeoff: "Increases total number of classes." },
        { pattern: "Dependency Injection", whyUsed: "Decouples creation of external adapters from consumption.", whyNotAlternative: "Avoids hardcoded 'new StripeClient()' in domain classes.", tradeoff: "Requires a DI container or manual composition root configuration." }
      ],
      threadSafetyMechanisms: ["Immutability of Value Objects", "Stateless Singleton service instances in Spring / NestJS / Express"],
      codeImplementation: {
        language: "typescript",
        code: `// --- 1. Domain Interfaces (DIP & ISP) ---
export interface PaymentDetails {
  vpa?: string;
  cardNumber?: string;
  cvv?: string;
  token?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId: string;
  errorMessage?: string;
}

export interface IPaymentStrategy {
  process(amount: number, details: PaymentDetails): Promise<PaymentResult>;
}

export interface INotificationSender {
  sendReceipt(recipient: string, message: string): Promise<void>;
}

// --- 2. Concrete Strategy Implementations (OCP & LSP) ---
export class StripePaymentStrategy implements IPaymentStrategy {
  async process(amount: number, details: PaymentDetails): Promise<PaymentResult> {
    // Integration with Stripe SDK
    if (!details.token && !details.cardNumber) {
      return { success: false, transactionId: "", errorMessage: "Missing payment token" };
    }
    return { success: true, transactionId: \`stripe_txn_\${Date.now()}\` };
  }
}

export class UPIPaymentStrategy implements IPaymentStrategy {
  async process(amount: number, details: PaymentDetails): Promise<PaymentResult> {
    // Integration with NPCI UPI Gateway
    if (!details.vpa || !details.vpa.includes("@")) {
      return { success: false, transactionId: "", errorMessage: "Invalid VPA identifier" };
    }
    return { success: true, transactionId: \`upi_txn_\${Date.now()}\` };
  }
}

// --- 3. Notification Senders (ISP & SRP) ---
export class EmailNotificationSender implements INotificationSender {
  async sendReceipt(recipient: string, message: string): Promise<void> {
    console.log(\`[EmailService] Sent receipt to \${recipient}: \${message}\`);
  }
}

// --- 4. Core Domain Service (SRP & DIP) ---
export class OrderProcessor {
  constructor(
    private readonly notificationSender: INotificationSender
  ) {}

  async checkout(
    orderId: string,
    amount: number,
    customerEmail: string,
    paymentStrategy: IPaymentStrategy,
    paymentDetails: PaymentDetails
  ): Promise<{ success: boolean; txnId?: string; error?: string }> {
    // 1. Delegate payment processing to the strategy
    const result = await paymentStrategy.process(amount, paymentDetails);

    if (!result.success) {
      return { success: false, error: result.errorMessage };
    }

    // 2. Delegate notification dispatch (asynchronous)
    await this.notificationSender.sendReceipt(
      customerEmail,
      \`Your payment for Order #\${orderId} was successful. Txn ID: \${result.transactionId}\`
    );

    return { success: true, txnId: result.transactionId };
  }
}`
      }
    },
    finalAnswerSummary:
      "Adhering to SOLID principles ensures modularity, testability, and zero-regression extensibility. By combining Dependency Inversion with the Strategy and Repository patterns, domain logic remains immune to changes in database drivers, third-party payment gateways, and messaging protocols.",
    interviewerEvaluation: {
      weak: "Merely defines the acronym letters (S-O-L-I-D) without demonstrating real code refactoring or explaining why violations cause production bugs.",
      needsImprovement: "Provides textbook definitions but mixes payment and notification logic directly inside Order class without abstraction.",
      good: "Correctly isolates responsibilities, uses interfaces for payments and notifications, and provides working code with clean separation.",
      strong: "Explains real trade-offs (class explosion vs extensibility), mentions LSP edge cases (unsupported exceptions), and discusses DI container lifecycle.",
      tier1Ready: "Flawlessly integrates SOLID with Hexagonal Architecture, discusses thread safety, immutability, Transactional Outbox for decoupled notifications, and error-handling paradigms."
    }
  },
  {
    id: "sd_fund_002",
    title: "CAP vs PACELC Theorem & Distributed Trade-offs",
    difficulty: "Medium",
    designType: "Fundamentals",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Google", "Amazon", "Meta", "Microsoft", "Uber", "Netflix", "Apple"],
    reportedMetadata: {
      company: "Google",
      role: "Software Engineer (L4/L5)",
      approxYear: "2024",
      round: "Distributed Systems Architecture",
      sourceNote: "Foundational theoretical question tested before deep diving into Spanner, Bigtable, or DynamoDB architectures."
    },
    categoryTag: "Distributed Systems",
    problemStatement:
      "Differentiate the CAP Theorem and PACELC Theorem in modern distributed systems. Explain why 'picking CA' is a myth during network partitions, how PACELC addresses latency during normal operations, and categorize real databases (Spanner, Cassandra, DynamoDB, MongoDB, Redis Cluster, CockroachDB).",
    functionalRequirements: [
      "Define Consistency (Linearizability), Availability (every non-failing node returns a non-error response), and Partition Tolerance.",
      "Explain PACELC: If Partition (P) -> choose between Availability (A) and Consistency (C); Else (E) -> choose between Latency (L) and Consistency (C).",
      "Demonstrate why network partitions are inevitable in distributed systems across physical networks.",
      "Map real-world storage engines to PC/EC, PA/EL, PC/EL, PA/EC quadrants."
    ],
    nonFunctionalRequirements: [
      "Clarity on latency SLAs (P99 < 10ms vs Linearizable read penalties).",
      "Correct understanding of read/write quorum equations (R + W > N)."
    ],
    assumptions: [
      "System operates across multiple data centers subject to fiber cuts, packet drops, and switch reboots."
    ],
    apiDesign: [
      {
        method: "GET",
        endpoint: "/v1/data/{key}",
        description: "Fetch key with configurable consistency level (ONE, QUORUM, ALL).",
        headers: "X-Consistency-Level: QUORUM"
      }
    ],
    dataModel: {
      type: "Hybrid / Polyglot",
      entities: [
        {
          name: "DistributedNodeRecord",
          description: "Tracks node replica state and vector clock version.",
          fields: ["node_id (UUID)", "data_key (STRING)", "value (BLOB)", "vector_clock (MAP<NodeID, Counter>)", "timestamp (INT64)"]
        }
      ],
      explanation: "Data replicated across N nodes with configurable read (R) and write (W) quorums."
    },
    architecture: {
      diagramAscii: `
               +------------------------------------+
               |          PACELC THEOREM            |
               +------------------------------------+
                                 |
         +-----------------------+-----------------------+
         |                                               |
  IF PARTITION (P)                                 ELSE NORMAL (E)
   /            \\                                   /             \\
[PC: Spanner]  [PA: Cassandra]             [EC: Spanner, RDBMS]  [EL: DynamoDB, Cassandra]
(Yields Avail) (Yields Consist)             (Wait for Sync Repl)  (Async Replication)
      `,
      description: "PACELC quadrant map illustrating real-time distributed storage trade-offs.",
      components: [
        { name: "Spanner (PC/EC)", role: "Strong Consistency", details: "Uses TrueTime GPS/Atomic clocks with Paxos consensus to deliver strict external consistency even during normal ops at the cost of write latency." },
        { name: "Cassandra / DynamoDB (PA/EL)", role: "High Availability & Low Latency", details: "Uses tunable quorums, hinted handoff, and read repair to prioritize availability and single-digit millisecond latency." },
        { name: "MongoDB (PC/EC)", role: "Configurable Primary-Secondary", details: "With writeConcern: 'majority', enforces linearizable consistency but blocks during primary election." }
      ]
    },
    databaseChoice: {
      primaryDb: "Database choice depends on PACELC classification",
      rationale: "Financial transactions require PC/EC (Spanner/Postgres); Social media likes/views thrive on PA/EL (Cassandra/DynamoDB).",
      alternativeConsidered: "N/A - Comparative foundational study.",
      tradeoff: "Latency vs Consistency."
    },
    concurrencyAndThreadSafety: "Raft / Paxos consensus logs or Vector Clocks with Last-Write-Wins (LWW) resolution.",
    consistencyModel: "Tunable from Eventual -> Read-Your-Writes -> Causal -> Linearizable (Strict Serializable).",
    availabilityAndFailover: "Leader election via Paxos/Raft (for PC) or Gossip Protocol peer discovery (for PA).",
    failureScenarios: [
      { failure: "Cross-Region Network Partition", impact: "Nodes in isolated region cannot reach quorum.", mitigation: "PC system rejects writes to maintain integrity; PA system accepts local writes and reconciles later via CRDTs or Vector Clocks." }
    ],
    security: ["Mutual TLS (mTLS) for all inter-node RPC replication traffic."],
    monitoringObservability: ["Replication lag metrics (lag in milliseconds and byte offset)", "Quorum consensus latency histograms"],
    bottlenecks: ["WAN round-trip times during multi-region synchronous consensus writes."],
    tradeOffs: [
      {
        topic: "Linearizability vs Read Latency",
        optionA: "Linearizable Reads (Leader Lease / Paxos Read)",
        optionB: "Local Replica Stale Reads",
        choiceMade: "Domain-specific",
        why: "Inventory decrement requires Linearizable reads; user profile display accepts 500ms stale replica reads."
      }
    ],
    interviewFollowUps: [
      {
        question: "Why can a distributed system never truly choose 'CA'?",
        interviewerContext: "Verifying that the candidate understands that physical networks are fallible.",
        strongAnswer: "A network partition (P) is not a design choice; it is an unavoidable physical reality (cable cuts, GC pauses, router misconfigurations). When a partition occurs, a system MUST either reject requests (choose C over A) or accept conflicting writes (choose A over C). 'CA' only exists when assuming zero network failures, which is impossible in distributed systems."
      },
      {
        question: "What is PACELC and why did Daniel Abadi formulate it?",
        interviewerContext: "Testing knowledge beyond basic 3-letter CAP.",
        strongAnswer: "CAP only describes behavior when a partition (P) is active. However, systems operate in normal mode 99.99% of the time. PACELC states: If Partition (P), choose Availability (A) or Consistency (C); Else (E), choose Latency (L) or Consistency (C). This explains why systems like DynamoDB choose low latency (L) via async replication even when no network partition exists."
      },
      {
        question: "Explain the Quorum formula: R + W > N.",
        interviewerContext: "Evaluating mathematical rigor in distributed storage.",
        strongAnswer: "If N is the replication factor, W is write quorum, and R is read quorum: when R + W > N, the read set and write set must overlap in at least one node by the Pigeonhole Principle. That node contains the latest write version. If R + W <= N, you may read stale data without detecting newer writes."
      }
    ],
    finalAnswerSummary:
      "The CAP theorem dictates that under network partitions, systems must choose between Consistency and Availability. PACELC extends this to normal operations, exposing the fundamental trade-off between Latency and Consistency.",
    interviewerEvaluation: {
      weak: "Claims an engineer can pick 'CA' as a valid option for a distributed database.",
      needsImprovement: "Knows CAP definitions but cannot explain PACELC or the quorum formula R + W > N.",
      good: "Explains PACELC, categorizes Spanner vs Cassandra accurately, and details quorum consistency.",
      strong: "Calculates latency impacts of cross-region synchronous Paxos vs asynchronous replication and explains monotonic read consistency.",
      tier1Ready: "Masters TrueTime, Google Spanner uncertainty windows, CRDTs, Raft leader leases, and PACELC trade-offs across tier-1 production systems."
    }
  },
  {
    id: "sd_fund_003",
    title: "Consistent Hashing with Virtual Nodes",
    difficulty: "Medium",
    designType: "Fundamentals",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Amazon", "Google", "Meta", "Uber", "Microsoft", "Apple", "Netflix"],
    reportedMetadata: {
      company: "Amazon",
      role: "SDE II",
      approxYear: "2023",
      round: "System Design / Core Architecture",
      sourceNote: "Classic building block question tested as a foundation for Dynamo, distributed caches, and load balancers."
    },
    categoryTag: "Distributed Algorithms",
    problemStatement:
      "Design a Consistent Hashing ring with Virtual Nodes to distribute keys uniformly across a dynamic cluster of cache/storage servers. Explain why naive modulo hashing (hash(key) % N) fails during scale up/down, calculate key redistribution percentages, and implement the data structure.",
    functionalRequirements: [
      "Add Node (server): Dynamically register new servers on the hash ring.",
      "Remove Node: Gracefully decommission or detect crashed servers.",
      "Get Node: Map a data key to its corresponding server in O(log(V*N)) time.",
      "Virtual Nodes (vnodes): Allocate multiple virtual tokens per physical node (e.g. 100-300 vnodes) to prevent hot-spotting and ensure uniform variance (< 5%)."
    ],
    nonFunctionalRequirements: [
      "Minimal key movement: When adding/removing 1 server from N servers, only k/N keys should move on average.",
      "High performance: Routing lookup latency < 0.1ms."
    ],
    assumptions: [
      "Hash function used is cryptographic or high-distribution non-cryptographic (e.g., MD5, SHA-256, or MurmurHash3) spanning [0, 2^32 - 1] or [0, 2^64 - 1]."
    ],
    apiDesign: [
      {
        method: "POST",
        endpoint: "/cluster/nodes",
        description: "Register a physical node into the hash ring with specified virtual node count.",
        requestBody: '{ "nodeId": "node-us-east-1a", "weight": 200 }',
        responseBody: '{ "status": "ADDED", "totalVNodesOnRing": 1200 }'
      },
      {
        method: "GET",
        endpoint: "/cluster/route?key={cacheKey}",
        description: "Resolve which physical server owns the given key.",
        responseBody: '{ "key": "user_session_9921", "assignedNode": "node-us-east-1a", "vnodeHash": 2984910283 }'
      }
    ],
    dataModel: {
      type: "In-Memory / Distributed Map",
      entities: [
        {
          name: "HashRingState",
          description: "Sorted map / red-black tree storing token -> physical node mapping.",
          fields: ["token (UINT64)", "physical_node_id (STRING)", "weight (INT32)"]
        }
      ],
      explanation: "Implemented as a Red-Black Tree (`std::map` in C++, `TreeMap` in Java, or sorted array with binary search in TypeScript/Python)."
    },
    architecture: {
      diagramAscii: `
                         [0 / 2^32-1]
                        /            \\
              (vnode_A3)              (vnode_B1)
             /                                  \\
     (Node A)                                    (Node B)
           |                                        |
      (vnode_B2)                                (vnode_A1)
             \\                                  /
              (vnode_A2)              (vnode_C1)
                        \\            /
                           (Node C)
      `,
      description: "Consistent Hashing Ring spanning integer hash space [0, 2^32 - 1]. Lookups traverse clockwise to the nearest token.",
      components: [
        { name: "Hash Function (Murmur3)", role: "Token Generator", details: "Maps server identifiers (e.g., 'serverA#vnode12') and cache keys to 32-bit integers." },
        { name: "Sorted Token Index (TreeMap)", role: "Routing Engine", details: "Maintains ordered list of tokens to perform O(log M) ceiling lookups." }
      ]
    },
    databaseChoice: {
      primaryDb: "In-Memory Red-Black Tree replicated via Gossip or ZooKeeper / Consul",
      rationale: "Ring metadata is small (e.g., 1,000 servers * 200 vnodes = 200,000 integers = ~1.6MB RAM) and must be accessed at ultra-low latency.",
      alternativeConsidered: "Centralized routing database",
      tradeoff: "Centralized DB creates a single point of failure and adds network hops to every request."
    },
    concurrencyAndThreadSafety: "Read-Write Locks (`std::shared_mutex` or `ReentrantReadWriteLock`) allow thousands of concurrent lock-free reads, locking only during server addition/removal.",
    consistencyModel: "Eventual consistency for ring topology updates via Gossip protocol or strong consistency via etcd/Consul watches.",
    availabilityAndFailover: "If a node fails, clockwise neighbor automatically absorbs its keys; hinted handoff or replication factor R > 1 ensures data availability.",
    failureScenarios: [
      { failure: "Server Crash", impact: "Requests for its keys hit next node in ring.", mitigation: "Replicate key across the next K distinct physical nodes on the ring." }
    ],
    security: ["HMAC authentication on cluster membership join packets."],
    monitoringObservability: ["Standard deviation of key distribution per physical node", "Ring lookup latency P99"],
    bottlenecks: ["Memory consumption if vnode count exceeds millions (mitigated by setting vnodes = 100-300)."],
    tradeOffs: [
      {
        topic: "Virtual Node Count vs Memory/CPU Overhead",
        optionA: "Low VNode Count (e.g., 5 vnodes/server)",
        optionB: "High VNode Count (e.g., 500 vnodes/server)",
        choiceMade: "150–250 vnodes per physical node",
        why: "Achieves < 4% standard deviation in load distribution while keeping ring lookups and memory footprints negligible."
      }
    ],
    interviewFollowUps: [
      {
        question: "What happens in naive modulo hashing: hash(key) % N when a server is added?",
        interviewerContext: "Validating baseline understanding.",
        strongAnswer: "When N changes to N+1, almost all existing keys (approx N/(N+1), or ~99% for large N) hash to different bucket indices. This causes a massive cache stampede where nearly all cache lookups miss simultaneously and overwhelm downstream databases. Consistent hashing ensures only 1/(N+1) keys move."
      },
      {
        question: "Why are virtual nodes necessary?",
        interviewerContext: "Understanding non-uniformity and heterogeneity.",
        strongAnswer: "Without virtual nodes, a few physical nodes will randomly receive disproportionately large segments of the hash ring, leading to severe hot-spotting. Virtual nodes interleave tokens evenly around the ring and allow assigning more vnodes to more powerful servers (heterogeneous hardware support)."
      },
      {
        question: "How do you handle data replication with Consistent Hashing?",
        interviewerContext: "Connecting hashing with distributed storage (Dynamo/Cassandra).",
        strongAnswer: "A key is mapped to its primary coordinator node on the ring. The coordinator replicates the key to the next N-1 distinct *physical* nodes going clockwise along the ring, skipping virtual nodes belonging to already-selected physical servers."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "ConsistentHashRouter<T>", type: "class", responsibility: "Manages the virtual node ring and routes keys", methods: ["addNode(node: T, vnodeCount?: number): void", "removeNode(node: T): void", "getNode(key: string): T | null"] }
      ],
      relationshipsUml: "ConsistentHashRouter o-- SortedTokenMap\nConsistentHashRouter --> HashFunction",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "Router only manages token placement and lookup; actual data storage is decoupled." },
        { principle: "DIP", application: "Router accepts generic hash function interface (`(input: string) => number`)." }
      ],
      designPatterns: [
        { pattern: "Strategy Pattern", whyUsed: "Allows swapping hash algorithms (Murmur3, SHA-256, FNV-1a).", whyNotAlternative: "Decouples cryptographic requirements from ring logic.", tradeoff: "Slight indirect function call overhead." }
      ],
      threadSafetyMechanisms: ["Immutable snapshot swapping on ring mutation or ReadWriteLock guarding the token array."],
      codeImplementation: {
        language: "typescript",
        code: `import * as crypto from "crypto";

export class ConsistentHashRing<T extends { id: string }> {
  private ring: Map<number, T> = new Map();
  private sortedKeys: number[] = [];
  private readonly vnodesPerNode: number;

  constructor(vnodesPerNode: number = 150) {
    this.vnodesPerNode = vnodesPerNode;
  }

  private hash(key: string): number {
    const md5 = crypto.createHash("md5").update(key).digest();
    // Read first 4 bytes as unsigned 32-bit big-endian integer
    return md5.readUInt32BE(0);
  }

  public addNode(node: T): void {
    for (let i = 0; i < this.vnodesPerNode; i++) {
      const vnodeKey = \`\${node.id}#vnode-\${i}\`;
      const token = this.hash(vnodeKey);
      this.ring.set(token, node);
      this.sortedKeys.push(token);
    }
    this.sortedKeys.sort((a, b) => a - b);
  }

  public removeNode(node: T): void {
    for (let i = 0; i < this.vnodesPerNode; i++) {
      const vnodeKey = \`\${node.id}#vnode-\${i}\`;
      const token = this.hash(vnodeKey);
      this.ring.delete(token);
    }
    this.sortedKeys = this.sortedKeys.filter((k) => this.ring.has(k));
  }

  public getNode(key: string): T | null {
    if (this.sortedKeys.length === 0) return null;

    const token = this.hash(key);
    // Binary search for first token >= key token (clockwise lookup)
    let low = 0;
    let high = this.sortedKeys.length - 1;
    let targetIdx = 0;

    if (token > this.sortedKeys[high]) {
      // Wrap around to start of the ring
      targetIdx = 0;
    } else {
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (this.sortedKeys[mid] >= token) {
          targetIdx = mid;
          high = mid - 1; // look for earlier match
        } else {
          low = mid + 1;
        }
      }
    }

    const matchedToken = this.sortedKeys[targetIdx];
    return this.ring.get(matchedToken) || null;
  }
}`
      }
    },
    finalAnswerSummary:
      "Consistent hashing solves the dynamic scaling problem in distributed caching and storage. By projecting nodes and keys onto a 360-degree token ring with virtual nodes, it minimizes key migrations to O(K/N) during node churn and ensures balanced key distribution.",
    interviewerEvaluation: {
      weak: "Does not know why hash(key)%N fails or cannot explain what a virtual node does.",
      needsImprovement: "Understands ring concept but struggles with binary search lookup complexity or replication across distinct physical servers.",
      good: "Implements ring with binary search O(log V*N), explains virtual nodes clearly, and calculates key churn percentages.",
      strong: "Discusses Murmur3 vs cryptographic hashes, cascading failures on node death, and integration with Gossip protocol.",
      tier1Ready: "Masterfully connects consistent hashing with Amazon Dynamo paper: sloppy quorums, hinted handoff, preference lists, and vnode weight balancing."
    }
  },
  {
    id: "sd_fund_004",
    title: "Distributed Caching & Invalidation Patterns",
    difficulty: "Medium",
    designType: "Fundamentals",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Meta", "Google", "Amazon", "Microsoft", "Uber", "Apple", "Stripe"],
    reportedMetadata: {
      company: "Meta",
      role: "Production Engineer / SDE II",
      approxYear: "2024",
      round: "High Level System Design",
      sourceNote: "Critical caching architecture tested across high-traffic social media, feed generation, and e-commerce rounds."
    },
    categoryTag: "Caching & Performance",
    problemStatement:
      "Compare and contrast the four primary caching patterns: Cache-Aside (Lazy Loading), Write-Through, Write-Behind (Write-Back), and Refresh-Ahead. Detail cache invalidation strategies (TTL, event-based, write-invalidation vs update), cache penetration/avalanche/stampede mitigations, and dual-write race conditions.",
    functionalRequirements: [
      "Cache-Aside: Application reads from cache; on miss, reads DB and populates cache.",
      "Write-Through: Application writes to cache; cache synchronously writes to DB before returning.",
      "Write-Behind (Write-Back): Application writes to cache; cache acknowledges immediately and batches async writes to DB.",
      "Refresh-Ahead: Cache automatically refreshes hot keys before TTL expiry based on predicted access."
    ],
    nonFunctionalRequirements: [
      "Low Latency: Cache read < 1ms.",
      "Consistency: Minimize window of stale reads and eliminate split-brain dual-write anomalies.",
      "Resilience: Zero single point of failure under cache node restarts."
    ],
    assumptions: [
      "System serves 100,000 RPS read-heavy traffic (95% read, 5% write) with Redis Cluster."
    ],
    apiDesign: [
      {
        method: "GET",
        endpoint: "/users/{id}",
        description: "Retrieve user profile with Cache-Aside strategy.",
        responseBody: '{ "id": "u_101", "name": "Elena", "source": "CACHE_HIT" }'
      }
    ],
    dataModel: {
      type: "NoSQL (Document/Key-Value)",
      entities: [
        {
          name: "RedisCacheEntry",
          description: "Serialized JSON or Protobuf payload in Redis with TTL.",
          fields: ["key: 'user:profile:{id}' (STRING)", "val: '{...}' (STRING/BINARY)", "ttl: 3600 (INT32)"]
        }
      ],
      explanation: "Redis Key-Value storage with explicit namespacing and deterministic TTL."
    },
    architecture: {
      diagramAscii: `
[CACHE-ASIDE PATTERN]
           (1) Read Cache
Client --------------> [ Redis Cache ]
  |                          |
  | (2) Cache Miss           | (3) Populate Cache
  v                          v
[ Application Server ] ---> [ Primary Database ]
        (4) Read DB
      `,
      description: "Cache-Aside flow: App coordinates reads and writes between cache and database.",
      components: [
        { name: "Application Server", role: "Orchestrator", details: "Handles cache miss fallback and updates." },
        { name: "Redis Cluster", role: "In-Memory Store", details: "Sub-millisecond key-value retrieval." },
        { name: "CDC Debezium / Kafka", role: "Cache Invalidator", details: "Streams database WAL logs to invalidate cache entries asynchronously, eliminating dual-write race conditions." }
      ]
    },
    databaseChoice: {
      primaryDb: "PostgreSQL + Redis Cluster",
      rationale: "PostgreSQL holds source of truth; Redis Cluster provides 100K+ RPS in-memory read acceleration.",
      alternativeConsidered: "Memcached",
      tradeoff: "Memcached is simpler multi-threaded key-value store, but Redis offers rich data structures (Hashes, Sets, Sorted Sets), persistence (RDB/AOF), and pub-sub."
    },
    concurrencyAndThreadSafety: "Single-flight / Mutex locking on cache miss prevents cache stampede on expired hot keys.",
    consistencyModel: "Eventual consistency. Cache invalidation happens within milliseconds via CDC or post-commit event.",
    availabilityAndFailover: "Redis Sentinel / Redis Cluster master-replica auto-failover with standby nodes.",
    failureScenarios: [
      { failure: "Cache Stampede (Thundering Herd)", impact: "Hot key expires; 10,000 concurrent threads query DB simultaneously.", mitigation: "Use distributed mutex / singleflight or probabilistic early expiration (XFetch algorithm)." },
      { failure: "Cache Avalanche", impact: "Mass simultaneous expiration of thousands of keys.", mitigation: "Add random jitter to TTL (e.g., TTL = baseTTL + rand(0, 300s))." },
      { failure: "Cache Penetration", impact: "Queries for non-existent IDs bypass cache and hit DB continuously.", mitigation: "Cache null objects with short TTL (60s) or deploy a Bloom Filter at the API Gateway." }
    ],
    security: ["Redis AUTH password, TLS encryption in transit, VPC subnet isolation."],
    monitoringObservability: ["Cache Hit Ratio (Target > 95%)", "Redis memory usage & fragmentation ratio", "Evicted keys count"],
    bottlenecks: ["Large Redis keys (big JSON blobs) causing network bandwidth saturation and blocking single-threaded Redis event loop."],
    tradeOffs: [
      {
        topic: "Cache Invalidation: Delete vs Update",
        optionA: "Update Cache on DB Write",
        optionB: "Delete (Invalidate) Cache on DB Write",
        choiceMade: "Delete from Cache",
        why: "Deleting is idempotent and immune to race conditions where older writes overwrite newer writes due to network jitter."
      }
    ],
    interviewFollowUps: [
      {
        question: "Explain the classic Dual-Write Race Condition in Cache-Aside and how to fix it.",
        interviewerContext: "Deep concurrency testing.",
        strongAnswer: "Thread 1 updates DB, Thread 2 updates DB. Thread 2 updates cache, then Thread 1 updates cache late due to network latency. The cache now holds Thread 1's stale data permanently. Fix: (1) Always DELETE from cache on write instead of updating, and (2) Use Change Data Capture (CDC via Debezium) listening to DB WAL to trigger deletions asynchronously."
      },
      {
        question: "How does the XFetch (probabilistic early expiration) algorithm work?",
        interviewerContext: "Advanced caching optimization used at Meta / Google.",
        strongAnswer: "Instead of waiting for a hot key to expire, a reader probabilistically recomputes the value before expiration: if `rand() * delta * beta * log(rnd()) > (expiry - now)`, the background worker recalculates and refreshes the cache before any client observes a miss."
      },
      {
        question: "When is Write-Behind (Write-Back) appropriate and what are its risks?",
        interviewerContext: "Evaluating understanding of high-throughput write caching.",
        strongAnswer: "Write-Behind is ideal for heavy write workloads like counting video views or real-time game leaderboards. It delivers ultra-fast write responses and coalesces updates. However, if the cache server crashes before flushing dirty writes to persistent disk, data loss occurs."
      }
    ],
    finalAnswerSummary:
      "Distributed caching is essential for sub-millisecond read scalability. Cache-Aside with cache deletion on write is the industry standard for general apps, guarded by TTL jitter, Bloom filters, and singleflight mutexes to mitigate avalanche, penetration, and stampede failure modes.",
    interviewerEvaluation: {
      weak: "Only knows basic key-value caching; cannot explain what happens when a key expires.",
      needsImprovement: "Lists the 4 patterns but cannot articulate cache stampede, penetration, or dual-write race conditions.",
      good: "Explains cache stampede fixes (mutex/jitter/Bloom filter) and why cache deletion is superior to cache update.",
      strong: "Deeply explains CDC-based WAL invalidation, XFetch probabilistic refreshing, and Redis single-thread event loop dynamics.",
      tier1Ready: "Master-level depth across Meta's Tao/Memcached architectures, multi-region cache invalidation leases, and lease-based token invalidations."
    }
  },
  {
    id: "sd_fund_005",
    title: "Database Sharding, Replication & Distributed Partitioning",
    difficulty: "Hard",
    designType: "Fundamentals",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Uber", "Amazon", "Google", "Meta", "Microsoft", "Salesforce", "Stripe"],
    reportedMetadata: {
      company: "Uber",
      role: "Senior Staff Engineer (L5/L6)",
      approxYear: "2024",
      round: "Database & Storage Systems",
      sourceNote: "Essential scaling architecture for high-volume transactions, rider-driver matching, and financial ledgers."
    },
    categoryTag: "Database & Storage",
    problemStatement:
      "Design a horizontal database sharding and replication architecture capable of handling 50TB of transactional data and 50,000 write QPS. Detail Shard Key selection, Range vs Hash vs Directory-based Sharding, Cross-Shard Joins & Transactions (2PC vs Sagas), Replication Lag, and Re-sharding strategies without downtime.",
    functionalRequirements: [
      "Select Shard Key: Minimize cross-shard queries and eliminate hot partitions.",
      "Partitioning Strategy: Implement Hash-based (Consistent Hashing) or Directory-based lookup.",
      "Replication: Configure primary-replica replication (sync or semi-sync) with automated failover.",
      "Cross-Shard Transactions: Orchestrate distributed transactions via 2-Phase Commit (2PC) or Saga Pattern."
    ],
    nonFunctionalRequirements: [
      "High Write Throughput: Scale horizontally by adding shard instances.",
      "Availability: 99.99% uptime with automated replica promotion via Raft/Paxos.",
      "Zero Downtime Resharding: Support splitting shards online without service interruption."
    ],
    assumptions: [
      "Order/Payment ledger system growing at 100GB/day with 90-day hot query window."
    ],
    apiDesign: [
      {
        method: "POST",
        endpoint: "/shards/rebalance",
        description: "Initiate online split of shard #04 into #04A and #04B via CDC replication.",
        requestBody: '{ "sourceShardId": "shard_04", "targetShards": ["shard_04A", "shard_04B"] }',
        responseBody: '{ "status": "REBALANCING", "syncedRecords": 849102 }'
      }
    ],
    dataModel: {
      type: "Relational (SQL)",
      entities: [
        {
          name: "UserOrdersTable (Sharded by user_id)",
          description: "Physical tables partitioned across 16 DB shards.",
          fields: ["order_id (UUID)", "user_id (UUID, SHARD KEY)", "merchant_id (UUID)", "amount (DECIMAL)", "status (VARCHAR)", "created_at (TIMESTAMP)"],
          indexes: ["PRIMARY KEY (user_id, order_id)", "INDEX (created_at)"]
        }
      ],
      explanation: "Compound primary key including shard key ensures all queries for a given user map to a single database node."
    },
    architecture: {
      diagramAscii: `
                     [ Client Application ]
                               |
                               v
                     [ Sharding Proxy / Vitess ]
                    /             |            \\
          Hash(user_id) % 16      |             \\
                 /                v              \\
        [ Shard 01 ]         [ Shard 02 ]      [ Shard 16 ]
         (Primary)            (Primary)         (Primary)
         /       \\            /       \\         /       \\
    [Replica] [Replica]  [Replica] [Replica] [Replica] [Replica]
      `,
      description: "Sharded Database Architecture managed by an intelligent proxy layer (e.g., Vitess, Citus, or Spqr).",
      components: [
        { name: "Vitess / Sharding Proxy", role: "Query Router & Coordinator", details: "Parses incoming SQL, computes shard routing target via Murmur3(shard_key), rewrites queries, and executes scatter-gather for multi-shard aggregations." },
        { name: "Primary Database Nodes", role: "Write Masters", details: "Handles ACID transactions for its assigned partition." },
        { name: "Read Replicas", role: "Read Scalability", details: "Serves analytics and non-real-time reads via asynchronous replication streams." }
      ]
    },
    databaseChoice: {
      primaryDb: "Sharded PostgreSQL (via Citus) or MySQL (via Vitess)",
      rationale: "Maintains full relational ACID properties within single shards while enabling infinite horizontal capacity scaling.",
      alternativeConsidered: "Native Distributed SQL (CockroachDB / Google Cloud Spanner)",
      tradeoff: "CockroachDB eliminates custom sharding logic but incurs ~10-20ms multi-node Raft consensus overhead on every write."
    },
    concurrencyAndThreadSafety: "Row-level locking (`SELECT ... FOR UPDATE`) inside single-shard transactions; distributed 2PC or Saga orchestrator for cross-shard updates.",
    consistencyModel: "Strong consistency within single shard; Read-Your-Writes on replicas by routing immediate post-write queries to Primary.",
    availabilityAndFailover: "Orchestrator / Patroni monitoring with Raft consensus promoting a replica to primary within 5 seconds of master failure.",
    failureScenarios: [
      { failure: "Hot Partition (Celebrity Problem)", impact: "A single merchant or power-user drives 80% of write traffic to one shard.", mitigation: "Compound Shard Key (e.g. `hash(user_id + date)` or salt the shard key with a random suffix `merchant_id_0..9`)." },
      { failure: "Replication Lag on Read Replica", impact: "User writes data, refreshes page, reads from replica, and sees stale data.", mitigation: "Route reads to primary for 5 seconds post-write or track replication LSN (Log Sequence Number) before serving read." }
    ],
    security: ["Transparent Data Encryption (TDE) at rest, SSL/TLS database connections."],
    monitoringObservability: ["Replication lag in milliseconds per replica", "Query execution plan scatter-gather ratio", "Per-shard disk utilization"],
    bottlenecks: ["Cross-shard distributed joins and multi-shard aggregations (`COUNT(*) GROUP BY`)."],
    tradeOffs: [
      {
        topic: "Range-Based Sharding vs Hash-Based Sharding",
        optionA: "Range-Based Sharding (e.g., user_id 1-1000 -> Shard 1)",
        optionB: "Hash-Based Sharding (e.g., hash(user_id) % 16)",
        choiceMade: "Hash-Based Sharding",
        why: "Range sharding causes massive write bottlenecks on the newest range for auto-increment IDs; Hash sharding spreads writes uniformly across all nodes."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you execute an Online Zero-Downtime Re-sharding (e.g. doubling from 16 to 32 shards)?",
        interviewerContext: "High-level database infrastructure operational expertise.",
        strongAnswer: "1. Provision 16 new target shard instances. 2. Set up CDC (Change Data Capture) replication from old shards to new shards. 3. Backfill historic snapshot data. 4. Verify replication lag reaches near zero. 5. Flip the application sharding proxy to dual-write mode. 6. Make new shards authoritative and decommission old shards."
      },
      {
        question: "Why are distributed transactions (Two-Phase Commit / 2PC) considered an anti-pattern at massive scale?",
        interviewerContext: "Understanding distributed locking and availability trade-offs.",
        strongAnswer: "2PC is a blocking protocol. During Phase 1 (Prepare), all participating shards lock the involved rows. If the coordinator crashes or network partition occurs before Phase 2 (Commit), all locked resources remain held indefinitely, causing cascading lock queues and bringing down throughput. Sagas with compensating transactions are preferred."
      },
      {
        question: "How do you handle secondary index queries across a sharded database?",
        interviewerContext: "Realistic query planning.",
        strongAnswer: "Local secondary index: Each shard indexes its own subset of data; queries require a 'scatter-gather' to all shards. Global secondary index: Maintain a separate table sharded by the secondary key, populated asynchronously via Kafka/CDC, which routes directly to the primary shard key."
      }
    ],
    finalAnswerSummary:
      "Horizontal database sharding divides large datasets across isolated physical nodes using deterministic hash partitioning. Pairing compound shard keys with a routing proxy like Vitess or Citus preserves relational query power while enabling linear scale.",
    interviewerEvaluation: {
      weak: "Suggests vertical scaling or cannot explain how to choose a shard key.",
      needsImprovement: "Understands hash sharding but cannot handle cross-shard queries, secondary indexes, or hot partitions.",
      good: "Designs compound shard keys, details scatter-gather vs routing proxy, and solves replica lag.",
      strong: "Flawlessly walks through 6-step online zero-downtime resharding with CDC and compares 2PC vs Saga transactions.",
      tier1Ready: "Elite mastery of Vitess vttablet architecture, Citus distributed query pushdown, Google Spanner multi-Paxos directory splits, and global index consistency models."
    }
  }
];
