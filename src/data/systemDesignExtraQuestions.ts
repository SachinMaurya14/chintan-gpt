import { SystemDesignProblem } from "./systemDesignTypes.js";

export const SYSTEM_DESIGN_EXTRA: SystemDesignProblem[] = [
  {
    id: "sd_extra_001",
    title: "Design Amazon Locker Delivery System (LLD)",
    difficulty: "Medium",
    designType: "LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Amazon", "Walmart Global Tech", "Target", "Microsoft", "Google"],
    reportedMetadata: {
      company: "Amazon",
      role: "SDE I / SDE II",
      approxYear: "2023",
      round: "Object-Oriented Design (LLD)",
      sourceNote: "Classic Amazon-specific LLD problem evaluating spatial locker fitting, OTP token verification, and package lifecycle state machines."
    },
    categoryTag: "Object-Oriented Design & State Machine",
    problemStatement:
      "Design an Amazon Locker automated self-service package delivery system. Package delivery drivers deposit parcels into appropriate-sized physical locker compartments (Small, Medium, Large, Extra Large). Customers receive a 6-digit cryptographic pickup code or barcode. Support package sizing, locker assignment algorithms, 3-day pickup expiration, and return workflows.",
    functionalRequirements: [
      "Locker Sizing & Allocation: Fit incoming package into the smallest available locker compartment that safely accommodates its dimensions (W x H x D).",
      "Delivery Ingestion: Driver scans package barcode; system unlocks designated locker door; driver places package and closes door; system verifies closure via sensor.",
      "Customer Pickup: Customer enters 6-digit OTP code or scans barcode at locker kiosk; system unlocks matching locker door; customer retrieves item.",
      "Expiration & Return: If uncollected after 72 hours, mark for return pickup and notify delivery driver to clear the compartment."
    ],
    nonFunctionalRequirements: [
      "Security: One-time pickup codes must be cryptographically non-guessable and single-use.",
      "Reliability: Physical door sensors must confirm closure before marking state as OCCUPIED.",
      "Concurrency: Thread-safe locker compartment state transitions."
    ],
    assumptions: [
      "Each physical Amazon Locker station has 60 compartments (25 Small, 20 Medium, 10 Large, 5 Extra-Large)."
    ],
    apiDesign: [
      {
        method: "POST",
        endpoint: "/lockers/deposit",
        description: "Delivery driver deposits package into assigned locker.",
        requestBody: '{ "stationId": "LOC_STATION_SEA_01", "packageId": "PKG_99182", "dimensions": { "w": 10, "h": 15, "d": 20 } }',
        responseBody: '{ "assignedCompartmentId": "COMP_14", "doorUnlocked": true, "pickupCode": "849102" }'
      },
      {
        method: "POST",
        endpoint: "/lockers/pickup",
        description: "Customer enters pickup code to retrieve package.",
        requestBody: '{ "stationId": "LOC_STATION_SEA_01", "pickupCode": "849102" }',
        responseBody: '{ "status": "RETRIEVED", "unlockedCompartmentId": "COMP_14" }'
      }
    ],
    dataModel: {
      type: "Relational (SQL)",
      entities: [
        {
          name: "LockerCompartment",
          description: "Physical compartment slot.",
          fields: ["compartment_id (VARCHAR, PK)", "station_id (VARCHAR)", "size (SMALL, MEDIUM, LARGE, XL)", "is_occupied (BOOLEAN)", "current_package_id (VARCHAR, NULLABLE)"]
        },
        {
          name: "LockerReservation",
          description: "Tracks active pickup codes and expiration.",
          fields: ["reservation_id (UUID)", "compartment_id (VARCHAR)", "package_id (VARCHAR)", "pickup_code (VARCHAR(6))", "status (ACTIVE, PICKED_UP, EXPIRED)", "expires_at (TIMESTAMP)"]
        }
      ],
      explanation: "Relational schema maintaining atomic lock states for physical compartments."
    },
    architecture: {
      diagramAscii: `
[ Delivery Driver ]               [ Customer ]
        \\                             /
         v                           v
      +---------------------------------+
      |    Locker Kiosk Controller      |
      +---------------------------------+
                       |
                       v
      +---------------------------------+
      |      LockerStationManager       |
      +---------------------------------+
         /             |              \\
        v              v               v
  +-----------+  +------------+  +--------------+
  | Compartment| | CodeVerifier| | ExpiryWorker |
  | Allocator |  | (Crypto OTP)| | (72h Expiry) |
  +-----------+  +------------+  +--------------+
      `,
      description: "Embedded Edge Locker Controller communicating with AWS cloud backend via IoT Core.",
      components: [
        { name: "CompartmentAllocator", role: "Best-Fit Allocator", details: "Selects the tightest fitting available compartment to preserve larger slots for larger parcels." },
        { name: "CodeVerifier", role: "Security Token Manager", details: "Validates 6-digit SHA-256 HMAC tokens generated at delivery time." }
      ]
    },
    databaseChoice: {
      primaryDb: "Embedded SQLite on Kiosk + AWS DynamoDB Cloud Synchronization",
      rationale: "Ensures locker kiosk remains fully functional even during intermittent cellular network disconnects.",
      alternativeConsidered: "Pure Cloud Postgres",
      tradeoff: "Cloud-only would prevent customers from opening lockers during local internet outages."
    },
    concurrencyAndThreadSafety: "Hardware mutex lock on compartment door latch actuators.",
    consistencyModel: "Strong consistency locally on the physical kiosk controller.",
    availabilityAndFailover: "Offline-first capability with battery backup UPS.",
    failureScenarios: [
      { failure: "Customer enters wrong pickup code 5 times", impact: "Risk of brute force attack.", mitigation: "Lock keypad for 15 minutes and send security alert to customer's registered email/phone." }
    ],
    security: ["HMAC-SHA256 time-limited OTP tokens.", "Tamper detection door vibration sensors."],
    monitoringObservability: ["Station capacity utilization percentage", "Average pickup latency", "Unclaimed package expiration rate"],
    bottlenecks: ["Peak holiday season station capacity saturation (mitigated by dynamic routing to neighboring stations)."],
    tradeOffs: [
      {
        topic: "First-Available vs Best-Fit Sizing Allocation",
        optionA: "First Available Compartment",
        optionB: "Best-Fit (Tightest Fitting Compartment)",
        choiceMade: "Best-Fit Compartment Allocation",
        why: "Prevents small envelopes from occupying Extra-Large compartments, maximizing overall station package capacity."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you handle packages that exceed the maximum Extra-Large locker dimension?",
        interviewerContext: "Edge case handling in physical systems.",
        strongAnswer: "The order checkout system checks parcel dimension metadata against locker station max limits. Oversized packages are marked ineligible for locker pickup at the time of purchase and restricted to standard doorstep delivery."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "LockerSize", type: "enum", responsibility: "Compartment and package size classes", methods: ["SMALL", "MEDIUM", "LARGE", "XL"] },
        { name: "LockerCompartment", type: "class", responsibility: "Manages physical door state and assigned package", methods: ["deposit(pkg: Package): boolean", "vacate(): Package | null"] }
      ],
      relationshipsUml: "LockerStation *-- LockerCompartment\nLockerStation o-- Package",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "LockerCompartment handles physical state; Allocation strategy handles size matching." }
      ],
      designPatterns: [
        { pattern: "State Pattern", whyUsed: "Governs AVAILABLE, RESERVED, OCCUPIED, and MAINTENANCE door states." }
      ],
      threadSafetyMechanisms: ["Synchronized compartment allocation lock"],
      codeImplementation: {
        language: "typescript",
        code: `export enum LockerSize {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
  XL = 4
}

export class LockerCompartment {
  public isOccupied: boolean = false;
  public assignedPackageId: string | null = null;

  constructor(
    public readonly id: string,
    public readonly size: LockerSize
  ) {}

  public canFit(pkgSize: LockerSize): boolean {
    return !this.isOccupied && this.size >= pkgSize;
  }
}

export class LockerStation {
  private compartments: LockerCompartment[] = [];
  private activeCodes: Map<string, { compartmentId: string; expiresAt: number }> = new Map();

  public addCompartment(comp: LockerCompartment): void {
    this.compartments.push(comp);
    // Sort so smaller compartments are evaluated first for best-fit
    this.compartments.sort((a, b) => a.size - b.size);
  }

  public depositPackage(packageId: string, size: LockerSize): { success: boolean; compartmentId?: string; code?: string } {
    // Best-fit allocation: Find smallest compartment that can fit
    const compartment = this.compartments.find(c => c.canFit(size));
    if (!compartment) {
      return { success: false }; // Station full for this size
    }

    compartment.isOccupied = true;
    compartment.assignedPackageId = packageId;

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 72 * 3600 * 1000; // 3 days
    this.activeCodes.set(code, { compartmentId: compartment.id, expiresAt });

    return { success: true, compartmentId: compartment.id, code };
  }

  public pickupPackage(code: string): { success: boolean; compartmentId?: string; error?: string } {
    const entry = this.activeCodes.get(code);
    if (!entry) return { success: false, error: "Invalid pickup code" };
    if (Date.now() > entry.expiresAt) return { success: false, error: "Pickup code has expired" };

    const comp = this.compartments.find(c => c.id === entry.compartmentId);
    if (comp) {
      comp.isOccupied = false;
      comp.assignedPackageId = null;
    }

    this.activeCodes.delete(code);
    return { success: true, compartmentId: entry.compartmentId };
  }
}`
      }
    },
    finalAnswerSummary:
      "A complete Low-Level Object-Oriented design for an Amazon Locker delivery station using Best-Fit compartment allocation, offline-first SQLite synchronization, cryptographic OTP pickup codes, and 72-hour automated return workflows.",
    interviewerEvaluation: {
      weak: "Fails to model different compartment sizes or does not handle expiration.",
      needsImprovement: "Implements basic classes but uses first-available allocation instead of best-fit.",
      good: "Implements best-fit allocation, OTP token validation, and state machine transitions.",
      strong: "Details offline-first IoT kiosk architecture, brute-force lockout safeguards, and UPS battery failover.",
      tier1Ready: "Mastery of physical IoT locker architectures, AWS IoT Greengrass edge synchronization, and hardware tamper sensors."
    }
  },
  {
    id: "sd_extra_002",
    title: "Design Dropbox / Google Drive (Online File Repository & Sync)",
    difficulty: "Hard",
    designType: "HLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Google", "Dropbox", "Microsoft", "Amazon", "Apple", "Meta"],
    reportedMetadata: {
      company: "Google / Dropbox",
      role: "Software Engineer (L5)",
      approxYear: "2024",
      round: "Distributed Storage & File Systems",
      sourceNote: "Famous distributed systems problem testing 4MB chunking, rolling hash deduplication (Rabin Fingerprints), block storage, and cross-device sync."
    },
    categoryTag: "Distributed Storage & Sync",
    problemStatement:
      "Design a cloud file storage and synchronization platform like Dropbox or Google Drive. Users upload, download, edit, and share files across multiple devices (Desktop, Mobile, Web). Support automatic differential sync (chunking and uploading only modified blocks), file versioning, deduplication, and offline editing conflict resolution.",
    functionalRequirements: [
      "Upload & Download: Users upload and download large files (up to 50 GB) reliably with resume capability.",
      "File Synchronization: When a file is modified on Device A, all other connected devices sync the changes automatically in real time.",
      "Chunking & Deduplication: Split files into 4MB chunks; compute content hashes (SHA-256) to eliminate duplicate storage across the entire cloud.",
      "Differential Sync: Only upload modified chunks of an edited file rather than re-uploading the entire file.",
      "File Version History: Keep historic versions for 30 days; support 1-click rollback."
    ],
    nonFunctionalRequirements: [
      "Reliability & Durability: 99.999999999% (11 9's) data durability on raw block storage (Amazon S3 / Google Cloud Storage).",
      "Low Latency & Bandwidth Efficiency: Minimal network transfer on small edits.",
      "Scale: 100M active users, 1 Billion files stored, 100 PB total data."
    ],
    scaleEstimation: {
      dauMau: "50 Million DAU",
      readsWritesRatio: "1 : 1 (Upload edits vs multi-device sync downloads)",
      avgQps: "Sync Notification Reads: 50,000 QPS | Chunk Uploads: 10,000 QPS",
      peakQps: "25,000 Chunk Uploads/sec Peak",
      storagePerDay: "10M active files edited/day * avg 2 modified chunks * 4MB = 80 TB / day new chunk data",
      storagePerYear: "80 TB * 365 = ~29 PB / year (Deduplication reduces this by ~40% to ~17 PB/year)",
      bandwidth: "Chunk Uploads: 10,000 * 4MB = 40 GB/sec inbound network throughput",
      cacheMemory: "Active metadata & chunk index: Redis Cluster with 100 GB RAM"
    },
    apiDesign: [
      {
        method: "POST",
        endpoint: "/v1/files/upload-session",
        description: "Initiate chunked file upload and check chunk existence.",
        requestBody: '{\n  "fileName": "large_video.mp4",\n  "fileSizeBytes": 104857600,\n  "chunkHashes": ["sha256_hash_1", "sha256_hash_2", "..."]\n}',
        responseBody: '{\n  "uploadId": "up_session_9918",\n  "missingChunkHashes": ["sha256_hash_2"]\n}'
      },
      {
        method: "PUT",
        endpoint: "/v1/files/chunks/{chunkHash}",
        description: "Upload raw binary 4MB missing chunk directly to object store via pre-signed URL.",
        headers: "Content-Type: application/octet-stream"
      }
    ],
    dataModel: {
      type: "Relational (SQL)",
      entities: [
        {
          name: "FileMetadata",
          description: "Logical directory hierarchy and file versions.",
          fields: ["file_id (UUID, PK)", "user_id (UUID)", "parent_folder_id (UUID)", "file_name (VARCHAR)", "version (INT)", "is_deleted (BOOLEAN)", "updated_at (TIMESTAMP)"]
        },
        {
          name: "FileChunkMapping",
          description: "Maps a specific file version to an ordered sequence of content-addressed chunk hashes.",
          fields: ["file_id (UUID)", "version (INT)", "chunk_index (INT)", "chunk_hash (VARCHAR(64), FK)"],
          indexes: ["PRIMARY KEY (file_id, version, chunk_index)"]
        },
        {
          name: "ChunkStorageRecord",
          description: "Global content-addressed chunk deduplication registry.",
          fields: ["chunk_hash (VARCHAR(64), PK)", "s3_object_key (VARCHAR)", "size_bytes (INT)", "ref_count (BIGINT)"]
        }
      ],
      explanation: "Content-Addressed Storage (CAS) ensures identical chunks across all global users are stored only once in S3."
    },
    architecture: {
      diagramAscii: `
[ Client Desktop / Mobile ]
  | (Watches local filesystem)
  v
+----------------------------------------------------+
| Client Sync Engine (Chunker + Local SQLite DB)     |
+----------------------------------------------------+
       | (1) Check Chunk Hashes           | (3) Direct Upload Chunks
       v                                  v
+-----------------------+     +-----------------------------+
| Metadata Service      |     | Object Storage (Amazon S3)  |
+-----------------------+     +-----------------------------+
       | (2) Update DB (Postgres)         ^
       v                                  |
+-----------------------+                 |
| Notification Service  | ----------------+
| (Long Polling / WS)   | (4) Broadcast "File Updated"
+-----------------------+
       |
       v
[ Other Connected Devices (Syncs Modified Chunks) ]
      `,
      description: "Separated Metadata Control Plane from Direct-to-S3 Chunk Data Plane with real-time Long Polling / WebSocket sync.",
      components: [
        { name: "Client Sync Engine", role: "Local Daemon", details: "Splits files into 4MB blocks using Rabin Fingerprints; checks local SQLite cache before transmitting." },
        { name: "Metadata Service", role: "Hierarchy Manager", details: "Maintains folder trees, user permissions, and file-to-chunk version maps." },
        { name: "Notification Service", role: "Real-Time Broadcaster", details: "Pushes real-time change events to all client devices via WebSockets." }
      ]
    },
    databaseChoice: {
      primaryDb: "PostgreSQL (for Metadata & Folder Tree) + Amazon S3 (for Raw Chunk Storage)",
      rationale: "PostgreSQL ensures ACID transactional consistency when renaming/moving folders; S3 provides 11 9's durability for petabytes of chunks.",
      alternativeConsidered: "Cassandra for metadata",
      tradeoff: "Cassandra makes recursive folder renames and transaction rollbacks extremely difficult."
    },
    cacheStrategy: {
      cacheType: "Redis Cluster for hot chunk metadata and active user WebSocket session mappings.",
      evictionPolicy: "LRU",
      invalidationPattern: "Invalidate on version increment",
      keyStructure: "file:chunks:{file_id}:{version} -> Array of chunk hashes",
      ttl: "86400s"
    },
    queueEventStrategy: {
      technology: "Apache Kafka",
      topicsQueues: ["file-change-events"],
      partitionKey: "user_id",
      idempotencyMechanism: "File version monotonic ordering"
    },
    concurrencyAndThreadSafety: "Optimistic concurrency locking (`version` counter) on FileMetadata records.",
    consistencyModel: "Strong consistency for metadata; Eventual consistency across offline syncing devices.",
    availabilityAndFailover: "Multi-region S3 cross-region replication + PostgreSQL warm standby.",
    failureScenarios: [
      { failure: "Two users edit the same file offline simultaneously", impact: "Sync conflict.", mitigation: "Create a conflict copy (e.g. `document (John's conflicted copy 2026-08-19).docx`) and allow users to manually merge." }
    ],
    security: ["Chunk encryption at rest using AES-256 with per-user envelope encryption keys."],
    monitoringObservability: ["Chunk upload bandwidth (GB/sec)", "Sync completion time (P95 < 2s for small edits)", "Deduplication ratio savings percentage"],
    bottlenecks: ["Large folder moves containing 100,000 files (mitigated by referencing folder IDs rather than full string paths)."],
    tradeOffs: [
      {
        topic: "Fixed 4MB Chunks vs Dynamic Content-Defined Chunking (Rabin Fingerprints)",
        optionA: "Fixed 4MB Chunks",
        optionB: "Dynamic Content-Defined Chunking (Rabin)",
        choiceMade: "Content-Defined Chunking",
        why: "Inserting 1 byte at the start of a file with fixed chunking shifts all subsequent chunk boundaries, forcing a 100% re-upload. Dynamic chunking shifts only the first chunk and preserves all remaining chunk hashes."
      }
    ],
    interviewFollowUps: [
      {
        question: "How does Deduplication save petabytes of storage?",
        interviewerContext: "Storage engineering.",
        strongAnswer: "Before uploading a chunk, the client computes its SHA-256 hash and asks the server: 'Do you already have hash H?'. If yes, the server simply increments `ref_count` in the database and skips the 4MB upload entirely. For popular files (e.g. viral PDF textbooks or OS updates), 10,000 users upload 1 physical copy."
      }
    ],
    finalAnswerSummary:
      "A complete High-Level Architecture for Dropbox / Google Drive featuring Content-Defined Chunking (Rabin Fingerprints), global Content-Addressed S3 deduplication, pre-signed upload URLs, separated metadata microservices in PostgreSQL, and real-time WebSocket sync notifications.",
    interviewerEvaluation: {
      weak: "Uploads whole files monolithically without chunking or deduplication.",
      needsImprovement: "Understands chunking but cannot explain differential sync, dynamic chunk boundary shifts, or offline conflict resolution.",
      good: "Implements 4MB chunking, Content-Addressed Storage, metadata database mapping, and WebSocket notifications.",
      strong: "Explains Rabin Fingerprints for boundary shift immunity, pre-signed direct-to-S3 uploads, and optimistic versioning.",
      tier1Ready: "Mastery of Dropbox's actual infrastructure (Magic Pocket, block servers, Edgestore metadata, and delta sync protocols)."
    }
  },
  {
    id: "sd_extra_003",
    title: "Design a Distributed Logging & Aggregation Framework",
    difficulty: "Hard",
    designType: "HLD + LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Google", "Amazon", "Datadog", "Splunk", "Microsoft", "Meta", "Elastic"],
    reportedMetadata: {
      company: "Google / Datadog",
      role: "SDE II / Infrastructure Engineer",
      approxYear: "2024",
      round: "Observability & Big Data Infrastructure",
      sourceNote: "High-throughput telemetry problem evaluating Log Agent buffering, Kafka streaming, Elasticsearch / ClickHouse inverted indexing, and cold storage archival."
    },
    categoryTag: "Observability & Distributed Systems",
    problemStatement:
      "Design an enterprise-scale distributed log aggregation and search platform (like Datadog, Splunk, or the ELK Stack). Ingest 500,000 log events per second (10 TB/day) from 5,000 microservice containers, parse structured JSON logs, provide full-text search with < 500ms query latency, dynamic alerting rules, and hot/warm/cold storage tiering.",
    functionalRequirements: [
      "Log Ingestion: Collect logs from thousands of app servers without impacting application execution latency.",
      "Structured Parsing: Extract timestamp, log level (INFO, WARN, ERROR), trace ID, service name, and message body.",
      "Full-Text Search: Query logs by keywords, time ranges, and tag filters (e.g. `service:order-api AND level:ERROR AND latency > 500ms`).",
      "Real-Time Alerting: Trigger alerts (PagerDuty / Slack) when error count exceeds threshold within a 5-minute sliding window."
    ],
    nonFunctionalRequirements: [
      "Zero Log Loss on App Side: Local non-blocking ring buffer on application side.",
      "High Throughput: Ingest 500,000 logs/sec with P99 search latency < 500ms.",
      "Cost Efficiency: Hot storage for 7 days, Warm storage for 30 days, Cold S3 archive for 1 year."
    ],
    assumptions: [
      "500,000 log events/sec avg, 1,000,000 peak; average log size 500 bytes = 250 MB/sec ingestion."
    ],
    apiDesign: [
      {
        method: "POST",
        endpoint: "/v1/logs/search",
        description: "Search logs with full-text query and filters.",
        requestBody: '{\n  "query": "NullPointerException",\n  "filters": { "service": "payment-api", "level": "ERROR" },\n  "timeRange": { "from": "2026-08-19T09:00:00Z", "to": "2026-08-19T10:00:00Z" },\n  "limit": 50\n}',
        responseBody: '{\n  "totalHits": 142,\n  "logs": [\n    { "timestamp": "2026-08-19T09:14:22Z", "service": "payment-api", "traceId": "tr_9918", "message": "NullPointerException at OrderProcessor.java:42" }\n  ]\n}'
      }
    ],
    dataModel: {
      type: "NoSQL (Document/Key-Value)",
      entities: [
        {
          name: "LogDocument (Elasticsearch / ClickHouse)",
          description: "Indexed log event.",
          fields: ["timestamp (TIMESTAMP)", "service_name (KEYWORD)", "log_level (KEYWORD)", "trace_id (KEYWORD)", "host_ip (IP)", "message (TEXT, INVERTED INDEX)", "attributes (JSON)"]
        }
      ],
      explanation: "Inverted Index (Lucene / Elasticsearch) for instant word-level search + Columnar store (ClickHouse) for aggregate metric queries."
    },
    architecture: {
      diagramAscii: `
[ 5,000 App Containers ]
  | (Writes to stdout / local domain socket)
  v
[ FluentBit / Vector Sidecar Agent ]
  | (Batches & Compresses)
  v
[ Load Balancer ]
  |
  v
+-------------------------------------------------------------+
|                Kafka Log Buffer (3-Day Retention)           |
+-------------------------------------------------------------+
               /                               \\
              v                                 v
+-----------------------------+   +---------------------------+
| Flink Real-Time Alert Engine|   | Logstash / Indexer Worker |
+-----------------------------+   +---------------------------+
              |                                 |
              v                                 v
      [ PagerDuty Alert ]         [ Elasticsearch / OpenSearch ]
                                  (Hot / Warm Storage Tier)
                                                |
                                                v (Lifecycle Rollover)
                                  [ Amazon S3 Glacier (Cold) ]
      `,
      description: "Log streaming pipeline with FluentBit sidecars, Kafka buffering, Flink alerting, and OpenSearch indexing.",
      components: [
        { name: "Vector / FluentBit", role: "Lightweight Sidecar", details: "Runs inside container; consumes logs from stdout; buffers in memory and pushes compressed batches to Kafka." },
        { name: "Kafka Ingestion Buffer", role: "Backpressure Shield", details: "Absorbs traffic spikes during outages without dropping logs or overwhelming Elasticsearch." },
        { name: "OpenSearch / Elasticsearch", role: "Search Index", details: "Time-based indices (`logs-2026.08.19`) with automatic shard rollover." }
      ]
    },
    databaseChoice: {
      primaryDb: "OpenSearch / ClickHouse",
      rationale: "OpenSearch provides full-text inverted indexing; ClickHouse provides 10x higher compression and faster SQL aggregations.",
      alternativeConsidered: "MongoDB",
      tradeoff: "MongoDB indexing overhead and storage footprint are 4x higher for raw text log ingestion."
    },
    concurrencyAndThreadSafety: "Asynchronous, lock-free ring buffer (LMAX Disruptor) inside client-side logging libraries.",
    consistencyModel: "Eventual consistency (logs appear in search results within 2-5 seconds of generation).",
    availabilityAndFailover: "Kafka partition replication factor 3 + OpenSearch primary-replica shard distribution.",
    failureScenarios: [
      { failure: "Elasticsearch indexing cluster slows down", impact: "Backpressure.", mitigation: "Kafka absorbs the backlog for up to 72 hours while auto-scaling additional OpenSearch ingestion nodes." }
    ],
    security: ["Automated regex masking of credit card numbers, passwords, and API keys before transmission."],
    monitoringObservability: ["Kafka consumer group lag", "Ingestion rate in MB/sec", "P99 search response latency"],
    bottlenecks: ["Elasticsearch segment merging I/O during heavy write bursts."],
    tradeOffs: [
      {
        topic: "Synchronous App Logging vs Asynchronous Sidecar Agent",
        optionA: "App directly sends HTTP POST to Logging Cluster",
        optionB: "App writes to stdout -> Local Sidecar Agent aggregates & sends",
        choiceMade: "Asynchronous Local Sidecar Agent",
        why: "Direct HTTP calls block application request threads and crash user traffic if the logging cluster experiences latency spikes."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you manage storage costs for 10 TB of logs per day?",
        interviewerContext: "Cost optimization and data lifecycle management.",
        strongAnswer: "Implement an Index Lifecycle Management (ILM) policy: 1. Hot Tier (Days 1-7): NVMe SSDs with primary + replica for high-speed search. 2. Warm Tier (Days 8-30): HDDs with read-only replicas and force-merge Lucene segments to 1 segment per shard (40% disk reduction). 3. Cold Tier (Day 31+): Dump raw Parquet/Zstandard compressed files to Amazon S3 (cost: $0.023/GB/month). 4. Delete after 365 days."
      }
    ],
    finalAnswerSummary:
      "A complete High-Level and Low-Level architecture for a Distributed Logging Platform. Uses FluentBit/Vector sidecar agents, Kafka backpressure buffering, OpenSearch inverted indexing with Hot/Warm/Cold ILM tiers, and Flink real-time alerting.",
    interviewerEvaluation: {
      weak: "App makes direct synchronous HTTP calls to write logs into a single SQL table.",
      needsImprovement: "Understands ELK stack but lacks Kafka buffering, resulting in dropped logs during Elasticsearch maintenance.",
      good: "Implements FluentBit sidecars, Kafka buffering, and time-based index partitioning.",
      strong: "Calculates realistic throughput/storage, details ILM lifecycle tiers (Hot/Warm/Cold), and explains PII masking.",
      tier1Ready: "Mastery of Lucene inverted index internals, ClickHouse sparse indexing, LMAX disruptor ring buffers, and Flink sliding window alerting."
    }
  },
  {
    id: "sd_extra_004",
    title: "Design Video Streaming Platform (YouTube / Netflix)",
    difficulty: "Hard",
    designType: "HLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Google", "Netflix", "Amazon", "Meta", "Disney+", "Apple", "Microsoft"],
    reportedMetadata: {
      company: "Google / Netflix",
      role: "Senior Software Engineer (L5 / SDE II-III)",
      approxYear: "2024",
      round: "High-Level System Design (HLD)",
      sourceNote: "Signature video engineering architecture problem assessing chunked transcoding, Adaptive Bitrate Streaming (HLS/DASH), and globally distributed CDN edge caching."
    },
    categoryTag: "Media Streaming & Content Delivery",
    problemStatement:
      "Design a global video streaming platform like YouTube or Netflix. Support video upload, asynchronous multi-resolution chunked transcoding (1080p, 720p, 480p, 360p in H.264/AV1/VP9), Adaptive Bitrate Streaming (HLS/DASH), CDN edge caching, video metadata indexing, view count deduplication, and playback telemetry for 500M DAU and 1 Billion daily video streams.",
    functionalRequirements: [
      "Video Ingestion: Creators upload raw video files (up to 4K / 50GB) via chunked multipart presigned S3 URLs.",
      "Asynchronous Transcoding: Split video into 4-second TS/MP4 chunks and transcode into multiple bitrates & resolutions with Master Playlist manifests (m3u8).",
      "Adaptive Bitrate Playback: Client video player dynamically switches resolution based on current client network bandwidth (HLS / MPEG-DASH).",
      "Video Metadata & Search: Store titles, tags, thumbnails, timestamps, and creator references.",
      "View Counting: Accurate, deduplicated view counts updated asynchronously without write bottlenecks."
    ],
    nonFunctionalRequirements: [
      "High Availability: 99.999% video playback availability across global regions.",
      "Ultra-Low Buffering: Time-To-First-Frame (TTFF) < 200ms; zero playback stalls via CDN edge PoPs.",
      "Scale: 500M DAU, 1 Billion video plays/day, 10,000 video hours uploaded/day.",
      "Cost Efficiency: Multi-tiered storage (Hot CDN -> Warm S3 Standard -> Cold Glacier)."
    ],
    assumptions: [
      "Average video length: 10 minutes.",
      "100:1 read to write ratio (video views vs video uploads).",
      "Top 20% popular videos generate 80% of total bandwidth (80/20 Zipf distribution for CDN caching)."
    ],
    scaleEstimation: {
      dauMau: "500 Million DAU | 2 Billion MAU",
      readsWritesRatio: "100 : 1 (Read Intensive Video Streams)",
      avgQps: "Video Streaming QPS: ~12,000 requests/sec | Video Uploads: ~15 uploads/sec",
      peakQps: "Streaming Peak: 100,000 RPS | Video Ingestion Peak: 200 RPS",
      storagePerDay: "10,000 hours/day * 60 min * 50 MB/min (transcoded multi-resolution) = ~30 TB / day storage",
      storagePerYear: "30 TB/day * 365 = ~10.95 PB / year",
      bandwidth: "Peak Egress Bandwidth: 100,000 streams * 5 Mbps (1080p avg) = 500 Gbps (handled primarily by CDN Edge PoPs)",
      cacheMemory: "Hot Video Manifests & Top Chunk Cache: 20% of daily active video chunks = ~6 TB CDN edge memory cache",
      replicationFactor: "3 (Multi-region S3 bucket replication + Geo-redundant Edge PoPs)"
    },
    apiDesign: [
      {
        method: "POST",
        endpoint: "/api/v1/videos/upload-init",
        description: "Initialize multipart upload and generate presigned S3 URLs.",
        requestBody: '{\n  "title": "System Design Masterclass",\n  "fileSize": 1048576000,\n  "chunkCount": 10,\n  "format": "mp4"\n}',
        responseBody: '{\n  "videoId": "vid_9941",\n  "uploadId": "upl_8849",\n  "presignedUrls": ["https://s3.bucket/vid_9941?part=1", "..."]\n}'
      },
      {
        method: "GET",
        endpoint: "/api/v1/videos/{videoId}/master.m3u8",
        description: "Retrieve HLS master playlist with bitrate stream variants.",
        responseBody: '#EXTM3U\n#EXT-X-STREAM-INF:BANDWIDTH=5000000,RESOLUTION=1920x1080\n1080p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=2500000,RESOLUTION=1280x720\n720p.m3u8\n#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360\n360p.m3u8'
      }
    ],
    dataModel: {
      type: "Hybrid / Polyglot",
      entities: [
        {
          name: "VideoMetadata",
          description: "Relational metadata table.",
          fields: ["video_id (VARCHAR, PK)", "creator_id (VARCHAR)", "title (VARCHAR)", "duration_sec (INT)", "status (PROCESSING, READY, FAILED)", "hls_manifest_url (VARCHAR)", "created_at (TIMESTAMP)"],
          indexes: ["creator_id", "created_at DESC"]
        },
        {
          name: "VideoViewAnalytics",
          description: "Aggregated view analytics table.",
          fields: ["video_id (VARCHAR, PK)", "view_count (BIGINT)", "like_count (BIGINT)", "last_updated (TIMESTAMP)"]
        }
      ],
      explanation: "PostgreSQL/MySQL stores transactional video and channel metadata. Video raw files and transcoded chunk manifests reside in Amazon S3 / Google Cloud Storage."
    },
    architecture: {
      diagramAscii: `
[ Creator Client ] ---> [ API Gateway ] ---> [ Ingestion Service ] ---> [ Raw Video S3 ]
                                                                                |
                                                                                v
                                                                        [ Kafka Task Topic ]
                                                                                |
                                                                                v
                                                                     [ Transcoding Cluster ]
                                                                   (FFmpeg / GPU Workers)
                                                                                |
                                                                                v
                                                                     [ Transcoded Chunks S3 ]
                                                                                |
[ Viewer Client ] <--- [ CDN Edge PoPs (Cloudflare/CloudFront) ] <---------------+
      `,
      description: "Asynchronous microservices architecture separating direct client uploads, distributed transcoding workers, and CDN edge delivery.",
      components: [
        { name: "Ingestion Service", role: "Upload Coordinator", details: "Issues presigned chunk URLs so upload traffic flows directly into S3 without burdening application servers." },
        { name: "Transcoder Pool", role: "GPU/CPU Worker Fleet", details: "Consumes jobs from Kafka; slices video into 4s chunks; encodes in parallel into 1080p/720p/480p HLS manifests." },
        { name: "Global CDN (Edge PoPs)", role: "Content Delivery", details: "Caches video chunks closest to user ISP nodes, absorbing 95%+ of video streaming bandwidth." }
      ]
    },
    databaseChoice: {
      primaryDb: "PostgreSQL (Metadata) + ScyllaDB (Analytics) + S3 (Video Chunks)",
      rationale: "PostgreSQL provides ACID relational integrity for user channels and metadata. S3 provides 99.999999999% object durability for petabyte video blobs.",
      alternativeConsidered: "Storing video blobs in MongoDB GridFS",
      tradeoff: "Database-backed blob storage is significantly more expensive and less optimized for CDN streaming than native cloud object storage."
    },
    cacheStrategy: {
      cacheType: "CDN Edge Cache (CloudFront / Fastly) + Redis Cluster",
      evictionPolicy: "LRU (Least Recently Used) for video chunks at edge servers",
      invalidationPattern: "Manifest URLs versioned with immutable query hashes; chunk files are static and never invalidated",
      keyStructure: "video:{videoId}:manifest | chunk:{videoId}:{resolution}:{chunkId}",
      ttl: "Video manifests: 10 minutes | Video chunks: 30 days"
    },
    queueEventStrategy: {
      technology: "Apache Kafka + RabbitMQ Priority Queue",
      topicsQueues: ["video-transcode-tasks", "view-event-stream", "video-copyright-scan"],
      partitionKey: "video_id",
      idempotencyMechanism: "Deduplication via video_id + part_number"
    },
    concurrencyAndThreadSafety: "Asynchronous worker polling with Redis distributed locks on video processing state machines.",
    consistencyModel: "Eventual consistency for view counts and search indexes; Strong consistency for video publication status.",
    availabilityAndFailover: "Multi-region S3 replication; Cloudflare multi-CDN DNS routing with automated failover.",
    failureScenarios: [
      { failure: "Transcoding worker node crashes during 4K video rendering", impact: "Transcoding job stalls.", mitigation: "Kafka consumer heartbeat timeout triggers automatic job re-assignment to healthy worker." },
      { failure: "Hot viral video causes sudden CDN origin stampede", impact: "High S3 egress costs and origin latency.", mitigation: "CDN Request Collapsing (Origin Shielding) ensures only 1 request fetches missing chunk while all concurrent requests wait on edge cache." }
    ],
    security: ["Signed Cookie / Token Authentication for premium content.", "Widevine / FairPlay DRM encryption on video chunks."],
    monitoringObservability: ["Rebuffer Rate (< 0.5%)", "Time-to-First-Frame (TTFF < 200ms)", "Transcoding queue latency", "CDN Cache Hit Ratio (> 95%)"],
    bottlenecks: ["Transcoding worker compute bottlenecks during prime-time upload surges (solved by auto-scaling spot EC2/GPU instances)."],
    tradeOffs: [
      {
        topic: "Pre-Transcoding All Resolutions vs Dynamic Just-In-Time (JIT) Transcoding",
        optionA: "Pre-Transcode all resolutions immediately on upload",
        optionB: "Transcode only 720p upfront; transcode 4K only if video reaches > 10,000 views",
        choiceMade: "Hybrid Tiered Transcoding",
        why: "Saves 70% of compute/storage costs since 90% of user uploads receive under 100 views."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you count video views accurately without locking a SQL row for millions of concurrent viewers?",
        interviewerContext: "High-throughput write mitigation and streaming aggregation.",
        strongAnswer: "Client sends a heartbeat beacon after 30 seconds of playback. The beacon hits an Ingestion Gateway that writes to Kafka (`view-event-stream`). Apache Flink or Spark Streaming consumes the stream, deduplicates by `(user_id, video_id, timestamp_window)`, aggregates views in 1-minute memory tumbling windows, and periodically flushes bulk increment updates (`UPDATE video_views SET count = count + N WHERE video_id = X`) to ScyllaDB and Redis."
      },
      {
        question: "What happens if a major undersea fiber-optic cable is severed, causing a regional CDN outage?",
        interviewerContext: "Global distributed resilience and disaster recovery.",
        strongAnswer: "Anycast DNS routing with GeoDNS automatically withdraws BGP routes for the affected edge PoP, seamlessly diverting viewer DNS resolution to the nearest active adjacent regional PoP with fallback origin replication."
      }
    ],
    finalAnswerSummary:
      "A complete High-Level Design for a Tier-1 Video Streaming Platform. Leverages multipart direct-to-S3 uploads, Kafka-driven distributed transcoding pipelines producing HLS manifests, Tier-1 CDN edge caching with Origin Shielding, and Flink streaming view aggregation.",
    interviewerEvaluation: {
      weak: "Uploads raw MP4 directly to web server memory and streams monolithic files over HTTP.",
      needsImprovement: "Understands S3 and CDN, but does not split video into HLS chunks or explain Adaptive Bitrate Streaming.",
      good: "Designs multipart upload, HLS/DASH chunking, multi-resolution transcoding with Kafka, and CDN caching.",
      strong: "Calculates precise storage/bandwidth, designs Origin Shielding for cache stampede prevention, and explains DRM security.",
      tier1Ready: "Mastery of Adaptive Bitrate algorithms, JIT vs upfront transcoding cost trade-offs, Flink stream deduplication, and Anycast BGP CDN failover."
    }
  },
  {
    id: "sd_extra_005",
    title: "Design a Distributed Job Scheduler & Async Task Queue",
    difficulty: "Hard",
    designType: "HLD + LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Uber", "Amazon", "Microsoft", "Stripe", "Google", "Meta", "Airbnb"],
    reportedMetadata: {
      company: "Uber / Stripe",
      role: "Senior Backend / Infrastructure Engineer",
      approxYear: "2024",
      round: "Distributed Systems & Scheduling Engine (HLD + LLD)",
      sourceNote: "Evaluates delayed task scheduling, distributed worker heartbeats, leader election, and at-least-once idempotency execution."
    },
    categoryTag: "Distributed Infrastructure & Concurrency",
    problemStatement:
      "Design a scalable, fault-tolerant Distributed Job Scheduler (like Temporal, Celery, or Quartz). Support recurring Cron jobs, one-off delayed tasks (e.g. 'execute in 2 hours'), priority queues, worker failure detection with automated task reallocation, backpressure, and at-least-once execution guarantees with idempotency tokens.",
    functionalRequirements: [
      "Task Submission: Submit one-off instant, delayed (scheduled timestamp `t`), or recurring Cron jobs with customizable payload and priority.",
      "Execution Guarantees: At-least-once task execution with configurable retry policies (exponential backoff, jitter, max attempts).",
      "Worker Pool Management: Dynamically register worker nodes, track heartbeats, and distribute workload based on worker capacity.",
      "Task State Management: Track lifecycle states: `SCHEDULED`, `QUEUED`, `RUNNING`, `COMPLETED`, `FAILED`, `DEAD_LETTER`.",
      "Cancellation & Timeouts: Support cancellation of scheduled tasks and execution hard timeouts."
    ],
    nonFunctionalRequirements: [
      "High Availability: 99.999% scheduler availability; zero single point of failure.",
      "High Precision: Scheduled tasks must execute within +/- 500ms of their designated trigger time.",
      "Scale: 100M scheduled jobs/day, 50,000 active concurrent worker nodes, 10,000 tasks dispatched/sec peak.",
      "Durability: No task lost even during complete data center reboot."
    ],
    assumptions: [
      "Task execution duration ranges from 100ms to 30 minutes.",
      "Network partitions can occur between scheduler coordinator and worker nodes."
    ],
    scaleEstimation: {
      dauMau: "Internal Infrastructure: 100 Million Tasks / Day",
      readsWritesRatio: "1 : 1 (State updates per task lifecycle)",
      avgQps: "Task Submission: 1,200 QPS | Task Dispatch: 1,200 QPS | Worker Heartbeats: 5,000 QPS",
      peakQps: "Peak Dispatch: 15,000 QPS",
      storagePerDay: "100M tasks * 2 KB = 200 GB / day metadata",
      storagePerYear: "73 TB / year (retained for 30 days active, then archived)",
      bandwidth: "Task Payload Streams: 1,200 * 2 KB = 2.4 MB/sec",
      cacheMemory: "Active Delayed Task Index: Redis Sorted Set with timestamps: ~4 GB RAM for next 24h jobs",
      replicationFactor: "3 (Raft consensus across Scheduler Coordinators)"
    },
    apiDesign: [
      {
        method: "POST",
        endpoint: "/api/v1/jobs/schedule",
        description: "Submit a new delayed or cron task.",
        requestBody: '{\n  "jobType": "SEND_MONTHLY_INVOICE",\n  "payload": { "userId": "usr_99", "amount": 149.00 },\n  "executeAt": "2026-08-19T14:00:00Z",\n  "cronExpr": "0 0 1 * *",\n  "priority": "HIGH",\n  "maxRetries": 3,\n  "timeoutSec": 60\n}',
        responseBody: '{\n  "jobId": "job_884910",\n  "status": "SCHEDULED",\n  "scheduledTime": "2026-08-19T14:00:00Z"\n}'
      }
    ],
    dataModel: {
      type: "Hybrid / Polyglot",
      entities: [
        {
          name: "ScheduledJob",
          description: "Persistent job record.",
          fields: ["job_id (UUID, PK)", "job_type (VARCHAR)", "payload (JSONB)", "status (VARCHAR)", "cron_expr (VARCHAR)", "scheduled_at (TIMESTAMP)", "assigned_worker_id (VARCHAR)", "retry_count (INT)", "lock_timeout (TIMESTAMP)"],
          indexes: ["status, scheduled_at", "assigned_worker_id"]
        },
        {
          name: "WorkerNode",
          description: "Registered worker instance metadata.",
          fields: ["worker_id (VARCHAR, PK)", "ip_address (VARCHAR)", "status (HEALTHY, UNRESPONSIVE)", "last_heartbeat (TIMESTAMP)", "active_task_count (INT)"]
        }
      ],
      explanation: "PostgreSQL stores durable state with transactional row-level locks (`SELECT FOR UPDATE SKIP LOCKED`). Redis Sorted Sets (`ZADD scheduled_time job_id`) provide microsecond delayed task indexing."
    },
    architecture: {
      diagramAscii: `
[ Client Service ] ---> [ API Gateway ] ---> [ Job Coordinator Cluster ]
                                                        |
                              +-------------------------+-------------------------+
                              |                                                   |
                              v                                                   v
                  [ Redis Delayed Tasks Ring ]                         [ PostgreSQL Metadata ]
                 (ZSET: score=execute_timestamp)                               (ACID Ledger)
                              |
                              v
                  [ Time-Wheel Dispatcher ] ---> [ Priority Kafka Queues ]
                                                        |
                                                        v
                                             [ Worker Fleet (K8s Pods) ]
                                             (Heartbeat -> Coordinator)
      `,
      description: "Distributed Leader-Follower Coordinator architecture utilizing Redis Sorted Sets for delayed dispatch and Kafka for worker task distribution.",
      components: [
        { name: "Coordinator Leader", role: "Leader Election via Raft/Etcd", details: "Scans Redis Sorted Set via Hashed Time Wheel; moves ready tasks into Kafka Priority Queues." },
        { name: "Worker Fleet", role: "Task Executors", details: "Pulls tasks from Kafka; claims row in DB with fencing token; executes task and renews heartbeat lease." },
        { name: "Dead-Letter Queue (DLQ)", role: "Failure Sink", details: "Tasks that fail all 3 retries are placed into DLQ for alert triage and manual replay." }
      ]
    },
    databaseChoice: {
      primaryDb: "PostgreSQL (Durable Store) + Redis (Time-Wheel Queue)",
      rationale: "Postgres provides ACID guarantees and `SKIP LOCKED` concurrency. Redis Sorted Sets allow `ZRANGEBYSCORE 0 {current_time} LIMIT 100` in O(log N + M) time.",
      alternativeConsidered: "Cassandra",
      tradeoff: "Cassandra lacks atomic compare-and-swap transactions and row locking needed to avoid duplicate job dispatch."
    },
    concurrencyAndThreadSafety: "Optimistic locking with Version columns + Distributed Fencing Tokens to prevent split-brain dual execution.",
    consistencyModel: "Strict Consistency for job lock assignment; Eventual consistency for completed job analytics.",
    availabilityAndFailover: "Etcd-backed active-passive coordinator failover; 30s heartbeat timeout marks dead workers and reassigns jobs.",
    failureScenarios: [
      { failure: "Worker node dies while executing a 10-minute task", impact: "Task hangs in RUNNING state.", mitigation: "Visibility Timeout / Heartbeat Lease: If worker stops sending heartbeats for 60s, lease expires and Coordinator re-queues task with incremented retry count." },
      { failure: "Redis delayed task cluster crashes", impact: "Delayed tasks delayed.", mitigation: "Redis Sentinel/Cluster with AOF persistence every second + periodic reconciler querying Postgres for unscheduled jobs." }
    ],
    security: ["HMAC cryptographic signature validation on webhook job callbacks.", "Encrypted JSON payload storage in DB."],
    monitoringObservability: ["Job execution latency P95/P99", "DLQ arrival rate", "Worker fleet CPU/memory utilization", "Scheduling delay jitter (< 50ms)"],
    bottlenecks: ["Single Redis Sorted Set contention (mitigated by sharding delayed tasks into 16 hash-partitioned Redis buckets)."],
    tradeOffs: [
      {
        topic: "Push-Based vs Pull-Based Worker Distribution",
        optionA: "Push: Coordinator pushes task via gRPC directly to worker",
        optionB: "Pull: Workers pull tasks from partitioned Kafka/RabbitMQ queue",
        choiceMade: "Pull-Based Architecture with Kafka",
        why: "Provides natural backpressure buffer; slow or dying workers don't get overwhelmed with pushed jobs."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you guarantee that a recurring Cron job executes exactly once during network glitches?",
        interviewerContext: "Distributed consensus and idempotency enforcement.",
        strongAnswer: "Distributed systems provide at-least-once delivery; exactly-once is achieved via Idempotency Keys (`job_id:scheduled_timestamp`). When a worker starts, it acquires a unique DB lock row with this key. If another node tries to run the same instance, the unique constraint violates and it safely aborts."
      }
    ],
    finalAnswerSummary:
      "A complete High-Level and Low-Level architecture for a Distributed Job Scheduler. Employs Etcd leader election, Redis Hashed Time-Wheels for delayed execution, Kafka priority queues for pull-based worker distribution, and Visibility Timeout leases for fault recovery.",
    interviewerEvaluation: {
      weak: "Uses a single cron daemon with `sleep()` loop on a single server without persistence.",
      needsImprovement: "Understands message queues, but fails to address delayed scheduling, worker heartbeats, or lease timeouts.",
      good: "Implements Redis Sorted Sets for delayed tasks, Kafka queues, and worker heartbeat checks.",
      strong: "Explains Fencing Tokens, DB `SKIP LOCKED`, Visibility Timeouts, and DLQ retry backoff strategies.",
      tier1Ready: "Mastery of Hashed Time Wheel data structures, Etcd Raft leader election, distributed idempotency keys, and multi-tenant rate limiting."
    }
  },
  {
    id: "sd_extra_006",
    title: "Design Automated Teller Machine (ATM) & Cash Dispenser (LLD)",
    difficulty: "Medium",
    designType: "LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Microsoft", "Amazon", "Goldman Sachs", "Morgan Stanley", "Visa", "Google"],
    reportedMetadata: {
      company: "Microsoft / Goldman Sachs",
      role: "SDE I / SDE II",
      approxYear: "2023",
      round: "Low-Level Design (LLD & Design Patterns)",
      sourceNote: "Classic OOP design interview problem evaluating the State Pattern for hardware workflow and Chain of Responsibility for banknote denomination dispensation."
    },
    categoryTag: "Object-Oriented Design & Design Patterns",
    problemStatement:
      "Design an Automated Teller Machine (ATM) software architecture. Model the complete user transaction workflow (Card Insertion, PIN Authentication, Balance Inquiry, Cash Withdrawal, Deposit, Card Ejection). Implement the State Pattern for ATM states and the Chain of Responsibility Pattern for cash denomination dispensation ($100, $50, $20, $10 notes), ensuring thread safety and hardware fault recovery.",
    functionalRequirements: [
      "Hardware State Transitions: Model states: `IDLE`, `HAS_CARD`, `PIN_AUTHENTICATED`, `SELECTING_TRANSACTION`, `DISPENSING_CASH`.",
      "Authentication: Validate debit card number and 4-digit PIN against Bank Core API; lock card after 3 invalid attempts.",
      "Cash Dispensation: Dispense requested amount using available cash cassettes ($100, $50, $20, $10) with minimal note count.",
      "Balance Deduction: Atomically deduct balance from user account and print physical receipt.",
      "Card Ejection: Safely eject card at transaction end or upon user cancellation."
    ],
    nonFunctionalRequirements: [
      "Thread Safety: Synchronized transaction processing to prevent double-dispensation.",
      "Extensibility: Adding new denomination cassettes ($5, $200) without modifying core dispensing logic.",
      "Fault Tolerance: Roll back transaction if cash dispenser mechanism jams mid-operation."
    ],
    assumptions: [
      "ATM cash vault contains 4 cassettes: $100 notes (1000 count), $50 notes (1000 count), $20 notes (1000 count), $10 notes (1000 count)."
    ],
    apiDesign: [
      {
        method: "POST",
        endpoint: "/atm/insert-card",
        description: "Insert card into ATM card reader.",
        requestBody: '{ "cardNumber": "4532-XXXX-XXXX-9912", "expiry": "08/28" }',
        responseBody: '{ "status": "CARD_ACCEPTED", "prompt": "ENTER_PIN" }'
      },
      {
        method: "POST",
        endpoint: "/atm/withdraw",
        description: "Request cash withdrawal.",
        requestBody: '{ "amount": 380.00 }',
        responseBody: '{ "status": "SUCCESS", "dispensed": { "$100": 3, "$50": 1, "$20": 1, "$10": 1 }, "remainingBalance": 1620.00 }'
      }
    ],
    dataModel: {
      type: "Relational (SQL)",
      entities: [
        {
          name: "ATMInventory",
          description: "Physical note count in cash cassettes.",
          fields: ["atm_id (VARCHAR, PK)", "note_denomination (INT)", "available_count (INT)", "last_refilled_at (TIMESTAMP)"]
        },
        {
          name: "ATMTransaction",
          description: "Audit ledger of ATM actions.",
          fields: ["txn_id (UUID, PK)", "atm_id (VARCHAR)", "account_number (VARCHAR)", "txn_type (WITHDRAWAL, DEPOSIT, BALANCE)", "amount (DECIMAL)", "status (SUCCESS, FAILED, CANCELLED)", "timestamp (TIMESTAMP)"]
        }
      ],
      explanation: "Relational audit schema ensuring dual-entry bookkeeping and physical cash reconciliation."
    },
    architecture: {
      diagramAscii: `
[ Customer ] ---> [ ATM Hardware Controller ]
                           |
            +--------------+--------------+
            |                             |
            v                             v
  [ State Machine ]             [ Bank Core Gateway ]
  (Idle -> CardInserted ->       (PIN Auth / Balance Txn)
   PinEntered -> Dispensing)              |
            |                             v
            v                    [ Chain of Responsibility ]
    [ Hardware Devices ]         (100 Dispenser -> 50 Dispenser ->
    - Card Reader                 20 Dispenser -> 10 Dispenser)
    - Cash Dispenser
    - Receipt Printer
      `,
      description: "Edge ATM Client communicating with centralized Bank Core Switch via ISO 8583 banking protocol.",
      components: [
        { name: "ATMStateMachine", role: "Workflow Controller", details: "Implements State Pattern to guarantee valid transaction sequencing (e.g. cannot withdraw before entering PIN)." },
        { name: "DispenserChain", role: "Cash Dispenser", details: "Chain of Responsibility passing withdrawal balance to successively smaller denomination handlers." }
      ]
    },
    databaseChoice: {
      primaryDb: "Embedded SQLite on ATM Kiosk + Bank Core Oracle/Postgres",
      rationale: "Maintains local encrypted journal file for crash recovery and audit compliance.",
      alternativeConsidered: "Pure Remote DB",
      tradeoff: "Local audit journal is legally required for ATM forensic reconciliation."
    },
    concurrencyAndThreadSafety: "Single-threaded state machine per ATM kiosk with synchronized hardware mutexes.",
    consistencyModel: "Strong ACID consistency via Two-Phase Commit with Bank Switch.",
    availabilityAndFailover: "Offline safe-mode that rejects cash operations but allows emergency card ejection if network drops.",
    failureScenarios: [
      { failure: "Cash dispenser physical jam mid-count", impact: "User card charged but cash not dispensed.", mitigation: "Optical sensor verifies bills passed shutter. If sensor fails, trigger automatic reverse API transaction to credit back user account and flag ATM out-of-service." }
    ],
    security: ["Hardware Encrypted PIN Pad (EPP) using Triple-DES / AES-256.", "Anti-skimming card reader sensors."],
    monitoringObservability: ["Cash cassette depletion alerts", "Hardware error rate (jams/shutter errors)", "Average transaction duration"],
    bottlenecks: ["Bank core network timeout during high-volume banking switch hours."],
    tradeOffs: [
      {
        topic: "Greedy Dispensation vs Dynamic Programming Exact Change",
        optionA: "Greedy: Always exhaust largest available note ($100 first)",
        optionB: "DP: Find combination matching exact note distribution",
        choiceMade: "Greedy Chain of Responsibility",
        why: "Simple, fast, and mathematically optimal when currency denominations are canonical standard multiples."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you apply the State Pattern to prevent race conditions when a user presses Cancel while cash is dispensing?",
        interviewerContext: "State machine concurrency and atomic hardware state.",
        strongAnswer: "In `DispensingState`, the `cancelTransaction()` method is explicitly implemented as a No-Op or returns an error (`TRANSACTION_IN_PROGRESS`). The cancel button is only active during `HasCardState` and `PinAuthenticatedState` before hardware actuation begins."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "ATMState", type: "interface", responsibility: "Defines transition actions for ATM lifecycle", methods: ["insertCard()", "enterPin(pin)", "withdraw(amount)", "ejectCard()"] },
        { name: "CashDispenser", type: "abstract class", responsibility: "Chain of Responsibility node for bill dispensation", methods: ["setNext(dispenser)", "dispense(currency)"] },
        { name: "ATMContext", type: "class", responsibility: "Singleton ATM machine state holder", methods: ["changeState(state)", "getInventory()"] }
      ],
      relationshipsUml: "ATMContext o-- ATMState\nCashDispenser <|-- HundredDollarDispenser\nCashDispenser <|-- FiftyDollarDispenser\nCashDispenser <|-- TwentyDollarDispenser",
      solidPrinciplesApplied: [
        { principle: "Open/Closed Principle (OCP)", application: "Add new cash denominations by adding new Dispenser classes into the chain without modifying existing dispensers." },
        { principle: "Single Responsibility Principle (SRP)", application: "Each State class handles logic strictly for that specific interaction step." }
      ],
      designPatterns: [
        { pattern: "State Pattern", whyUsed: "Encapsulates state-specific behavior and cleanly prevents invalid operations (e.g. withdraw before PIN auth)." },
        { pattern: "Chain of Responsibility", whyUsed: "Decouples note dispensation across $100, $50, $20, $10 cassettes." }
      ],
      threadSafetyMechanisms: ["Synchronized transaction block locks during cash counting"],
      codeImplementation: {
        language: "typescript",
        code: `// --- STATE PATTERN ---
export interface ATMState {
  insertCard(atm: ATM, card: DebitCard): void;
  enterPin(atm: ATM, pin: string): boolean;
  withdrawCash(atm: ATM, amount: number): boolean;
  ejectCard(atm: ATM): void;
}

export class IdleState implements ATMState {
  insertCard(atm: ATM, card: DebitCard): void {
    atm.currentCard = card;
    atm.setState(new CardInsertedState());
    console.log("Card accepted. Please enter 4-digit PIN.");
  }
  enterPin(): boolean { throw new Error("Insert card first."); }
  withdrawCash(): boolean { throw new Error("Insert card first."); }
  ejectCard(): void { console.log("No card inserted."); }
}

export class CardInsertedState implements ATMState {
  insertCard(): void { console.log("Card already inserted."); }
  enterPin(atm: ATM, pin: string): boolean {
    if (atm.bankService.verifyPin(atm.currentCard!, pin)) {
      atm.setState(new PinAuthenticatedState());
      console.log("PIN Verified. Select Transaction.");
      return true;
    }
    console.log("Invalid PIN.");
    return false;
  }
  withdrawCash(): boolean { throw new Error("Authenticate PIN first."); }
  ejectCard(atm: ATM): void {
    atm.currentCard = null;
    atm.setState(new IdleState());
  }
}

export class PinAuthenticatedState implements ATMState {
  insertCard(): void { console.log("Card already inserted."); }
  enterPin(): boolean { console.log("Already authenticated."); return true; }
  withdrawCash(atm: ATM, amount: number): boolean {
    atm.setState(new DispensingState());
    const success = atm.dispenserChain.dispense(amount);
    if (success) {
      atm.bankService.deductBalance(atm.currentCard!, amount);
      console.log(\`Successfully dispensed $\${amount}.\`);
    }
    atm.setState(new IdleState());
    atm.currentCard = null;
    return success;
  }
  ejectCard(atm: ATM): void {
    atm.currentCard = null;
    atm.setState(new IdleState());
  }
}

export class DispensingState implements ATMState {
  insertCard(): void { throw new Error("Dispensing in progress."); }
  enterPin(): boolean { throw new Error("Dispensing in progress."); }
  withdrawCash(): boolean { throw new Error("Dispensing in progress."); }
  ejectCard(): void { console.log("Wait for cash to dispense."); }
}

// --- CHAIN OF RESPONSIBILITY PATTERN ---
export abstract class CashDispenser {
  protected next: CashDispenser | null = null;

  constructor(protected denomination: number, protected count: number) {}

  public setNext(next: CashDispenser): CashDispenser {
    this.next = next;
    return next;
  }

  public dispense(amount: number): boolean {
    const needed = Math.floor(amount / this.denomination);
    const toDispense = Math.min(needed, this.count);
    const remainder = amount - (toDispense * this.denomination);

    this.count -= toDispense;

    if (remainder === 0) return true;
    if (this.next) return this.next.dispense(remainder);
    return false; // Unable to provide exact change
  }
}

export class HundredDollarDispenser extends CashDispenser { constructor(count: number) { super(100, count); } }
export class FiftyDollarDispenser extends CashDispenser { constructor(count: number) { super(50, count); } }
export class TwentyDollarDispenser extends CashDispenser { constructor(count: number) { super(20, count); } }
export class TenDollarDispenser extends CashDispenser { constructor(count: number) { super(10, count); } }`
      }
    },
    finalAnswerSummary:
      "A complete Low-Level Object-Oriented design for an ATM Cash Dispenser. Leverages the State Pattern for hardware lifecycle flows, the Chain of Responsibility Pattern for banknote allocation, and ACID Two-Phase commit transactions for bank balance reconciliation.",
    interviewerEvaluation: {
      weak: "Uses a bunch of nested if-else statements inside a single monolithic class.",
      needsImprovement: "Implements classes, but does not use State Pattern or Chain of Responsibility, hardcoding note subtractions.",
      good: "Implements State Pattern and Chain of Responsibility with clean TypeScript/Java code.",
      strong: "Considers hardware failures, physical jam rollback, optical sensor verification, and thread synchronization.",
      tier1Ready: "Mastery of ISO 8583 banking switch protocols, EPP hardware security modules, and formal State transition invariants."
    }
  },
  {
    id: "sd_extra_007",
    title: "Design Multi-Channel Notification Engine (HLD + LLD)",
    difficulty: "Medium",
    designType: "HLD + LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Amazon", "Google", "Microsoft", "Uber", "Airbnb", "DoorDash"],
    reportedMetadata: {
      company: "Amazon / Uber",
      role: "SDE II",
      approxYear: "2024",
      round: "System Architecture (HLD + LLD)",
      sourceNote: "Evaluates multi-channel abstraction (APNS, FCM, SendGrid, Twilio), priority queues, user preferences, rate limiting, and deduplication."
    },
    categoryTag: "Messaging & Event-Driven Architecture",
    problemStatement:
      "Design a high-throughput, multi-channel notification platform capable of delivering Push (APNS / FCM), SMS (Twilio), Email (SendGrid / SES), and In-App notifications. Support priority delivery (Transactional OTP vs Marketing Blasts), user notification preferences, rate limiting per user (max 3 pushes/hour), deduplication windows, and Dead-Letter Queue retry management at 50M notifications/day.",
    functionalRequirements: [
      "Multi-Channel Delivery: Route notifications across Push, SMS, Email, and In-App websockets.",
      "Priority Routing: HIGH (OTP, Password Reset) must deliver in < 2 seconds; LOW (Marketing, Newsletter) in < 15 minutes.",
      "User Preference Engine: Honor user opt-outs and quiet hours (e.g. no promotional SMS between 10 PM - 8 AM).",
      "Deduplication Window: Prevent sending duplicate notifications within a 5-minute sliding window.",
      "Delivery Status Tracking: Ingest vendor webhooks (Sent, Delivered, Opened, Bounced, Failed)."
    ],
    nonFunctionalRequirements: [
      "High Availability: 99.99% service availability.",
      "Low Latency: OTP delivery P99 < 2 seconds.",
      "Reliability: Zero dropped transactional notifications with Kafka persistence.",
      "Scale: 50M notifications/day, 10,000 notifications/sec peak burst."
    ],
    assumptions: [
      "Third-party vendor rate limits and transient outages are expected.",
      "Transactional notifications (10% volume) take absolute priority over bulk marketing (90% volume)."
    ],
    scaleEstimation: {
      dauMau: "50 Million Notifications / Day",
      readsWritesRatio: "1 : 1 (Write to Kafka -> Read by channel workers)",
      avgQps: "Ingestion: ~600 QPS | Peak: 10,000 QPS",
      peakQps: "10,000 notifications/sec",
      storagePerDay: "50M * 1 KB = 50 GB / day notification delivery history",
      storagePerYear: "18.25 TB / year",
      bandwidth: "Ingestion: 600 * 1 KB = 600 KB/sec | Peak: 10 MB/sec",
      cacheMemory: "User Preferences & Deduplication Hashes: Redis Cluster ~8 GB RAM",
      replicationFactor: "3 (Multi-region Kafka partitions)"
    },
    apiDesign: [
      {
        method: "POST",
        endpoint: "/api/v1/notifications/send",
        description: "Dispatch notification request.",
        requestBody: '{\n  "userId": "usr_9918",\n  "type": "TRANSACTIONAL",\n  "channels": ["PUSH", "EMAIL"],\n  "templateId": "ORDER_CONFIRMATION",\n  "params": { "orderId": "ord_101", "total": "$45.00" },\n  "idempotencyKey": "order_ord_101_confirm"\n}',
        responseBody: '{\n  "notificationId": "notif_8849102",\n  "status": "QUEUED"\n}'
      }
    ],
    dataModel: {
      type: "Hybrid / Polyglot",
      entities: [
        {
          name: "NotificationLog",
          description: "Tracks individual notification delivery lifecycle.",
          fields: ["notification_id (UUID, PK)", "user_id (VARCHAR)", "channel (PUSH, SMS, EMAIL)", "status (QUEUED, SENT, DELIVERED, FAILED)", "vendor_message_id (VARCHAR)", "created_at (TIMESTAMP)"],
          indexes: ["user_id", "created_at DESC"]
        },
        {
          name: "UserNotificationPreference",
          description: "User opt-in/opt-out configuration.",
          fields: ["user_id (VARCHAR, PK)", "push_enabled (BOOLEAN)", "sms_enabled (BOOLEAN)", "email_enabled (BOOLEAN)", "quiet_hours_start (TIME)", "quiet_hours_end (TIME)"]
        }
      ],
      explanation: "PostgreSQL stores durable delivery logs. Redis caches user preferences and active idempotency keys."
    },
    architecture: {
      diagramAscii: `
[ Internal Services ] ---> [ API Gateway ] ---> [ Notification Ingestion Service ]
                                                        |
                                           [ Redis Deduplication & Prefs ]
                                                        |
                                          [ Kafka Priority Topics ]
                               +------------------------+------------------------+
                               |                                                 |
                               v                                                 v
                     [ High-Priority Topic ]                           [ Low-Priority Topic ]
                               |                                                 |
                               v                                                 v
                     [ Email Workers (SES) ]                           [ Bulk Push (FCM/APNS) ]
                     [ SMS Workers (Twilio) ]                          [ Marketing Email ]
      `,
      description: "Priority-queued event-driven notification architecture using Kafka, Redis rate limiters, and decoupled channel worker fleets.",
      components: [
        { name: "Ingestion Service", role: "Validator & Router", details: "Checks Redis deduplication key; queries User Preference Engine; attaches template; routes to High or Low priority Kafka topic." },
        { name: "Channel Worker Fleets", role: "Vendor Dispatchers", details: "Consumes from Kafka; manages vendor API rate limits via Token Bucket; falls back to secondary vendor if primary vendor fails." }
      ]
    },
    databaseChoice: {
      primaryDb: "PostgreSQL (Logs) + Redis (Deduplication & Rate Limiting)",
      rationale: "Postgres maintains delivery audit logs; Redis provides sub-millisecond atomic checks for sliding window deduplication.",
      alternativeConsidered: "MongoDB",
      tradeoff: "Postgres handles index lookups and time partitioning cleanly with lower memory overhead."
    },
    cacheStrategy: {
      cacheType: "Redis Cluster",
      evictionPolicy: "volatile-ttl",
      invalidationPattern: "Write-through cache on user settings update",
      keyStructure: "dedup:{userId}:{hash(message)} | pref:{userId}",
      ttl: "Deduplication: 300 seconds (5 min) | Preferences: 24 hours"
    },
    queueEventStrategy: {
      technology: "Apache Kafka",
      topicsQueues: ["notifications.high-priority", "notifications.low-priority", "notifications.dlq"],
      partitionKey: "user_id (ensures ordered delivery per user)",
      idempotencyMechanism: "Redis key check: `SET dedup:key 1 EX 300 NX`"
    },
    concurrencyAndThreadSafety: "Thread-safe asynchronous worker pools with non-blocking HTTP clients (Netty/Axios).",
    consistencyModel: "Eventual consistency for delivery status updates; At-least-once delivery guarantee.",
    availabilityAndFailover: "Multi-vendor fallback (e.g. If Twilio fails, automatically route SMS via AWS SNS or Infobip).",
    failureScenarios: [
      { failure: "Apple APNS gateway returns HTTP 503", impact: "Push notifications cannot be delivered.", mitigation: "Exponential backoff retry with jitter; after 3 failures, move to Dead-Letter Queue (DLQ) and fallback to In-App notification." }
    ],
    security: ["TLS 1.3 encryption on all vendor API connections.", "PII redaction in delivery logs."],
    monitoringObservability: ["Delivery Success Rate (> 99.5%)", "Vendor Latency P99", "DLQ arrival rate", "Kafka Consumer Group Lag"],
    bottlenecks: ["Third-party vendor rate limit ceilings (mitigated by Leaky Bucket client-side throttling)."],
    tradeOffs: [
      {
        topic: "Unified Kafka Topic vs Segregated Priority Topics",
        optionA: "Single Topic with priority tag",
        optionB: "Dedicated High and Low Priority Kafka Topics",
        choiceMade: "Dedicated Segregated Priority Topics",
        why: "Prevents a massive marketing blast of 10M emails from stalling critical OTP password reset messages in the queue."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you prevent duplicate notifications if a client retries due to a network timeout?",
        interviewerContext: "Idempotency and deduplication mechanisms.",
        strongAnswer: "The client generates an `Idempotency-Key` (e.g., `order_101_dispatch`). The Ingestion Gateway executes `SETNX dedup:{key} 1 EX 300` in Redis. If the key already exists, the gateway returns the cached previous `notification_id` and HTTP 200 without pushing a duplicate message to Kafka."
      }
    ],
    finalAnswerSummary:
      "A complete High-Level and Low-Level architecture for a Multi-Channel Notification Platform. Features separated Kafka priority topics, Redis deduplication windows, user preference quiet-hours filtering, and multi-vendor automatic failover.",
    interviewerEvaluation: {
      weak: "Synchronously calls SendGrid and Twilio APIs inside the web request handler.",
      needsImprovement: "Uses a single queue where large marketing broadcasts block high-priority OTP messages.",
      good: "Separates High and Low priority queues, uses Redis for deduplication, and stores delivery logs.",
      strong: "Designs multi-vendor fallback, token-bucket vendor rate limiting, and detailed Kafka partition key strategy.",
      tier1Ready: "Mastery of distributed idempotency, sliding window user rate limiting, Dead-Letter Queue reconciliation, and APNS HTTP/2 multiplexing."
    }
  }
];
