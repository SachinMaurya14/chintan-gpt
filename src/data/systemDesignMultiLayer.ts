import { SystemDesignProblem } from "./systemDesignTypes.js";

export const SYSTEM_DESIGN_MULTI_LAYER: SystemDesignProblem[] = [
  {
    id: "sd_multi_001",
    title: "Design Uber / Lyft Real-Time Ride Matching & Geospatial Engine",
    difficulty: "Extreme",
    designType: "HLD + LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Uber", "Google", "Amazon", "Meta", "Grab", "DoorDash", "Microsoft"],
    reportedMetadata: {
      company: "Uber",
      role: "Staff Software Engineer / SDE III",
      approxYear: "2024",
      round: "Full-Stack System Architecture (HLD + LLD)",
      sourceNote: "Signature Uber interview problem evaluating Uber H3 / Google S2 spatial indexing, WebSockets location updates, rider-driver matching, and concurrency."
    },
    categoryTag: "Geospatial & Real-Time Systems",
    problemStatement:
      "Design a real-time ride-hailing and dispatch platform like Uber or Lyft. Handle 1 Million active drivers streaming GPS coordinates every 4 seconds (250,000 location writes/sec), geospatial proximity searches (find top 10 nearest available drivers within 3 km in < 50ms), ride matching transactions, dynamic surge pricing, and trip lifecycle state machines.",
    functionalRequirements: [
      "Location Ingestion: Ingest real-time GPS locations from 1M active drivers every 4 seconds.",
      "Proximity Search: Given a rider's current lat/lon, find the top 10 nearest available drivers within radius R in < 50ms.",
      "Ride Request & Matching: Rider requests ride -> find optimal driver -> send offer with 15-second acceptance countdown.",
      "Trip Lifecycle: Transition through states: REQUESTED, DRIVER_MATCHED, DRIVER_ARRIVED, IN_PROGRESS, COMPLETED, CANCELLED.",
      "Dynamic Surge Pricing: Calculate pricing multiplier based on real-time supply/demand imbalance per hexagonal geo-cell."
    ],
    nonFunctionalRequirements: [
      "High Availability: 99.999% uptime for driver tracking and ride requests.",
      "Low Latency: Location ingestion latency < 100ms; Nearby driver search < 50ms.",
      "Zero Double-Dispatch: A driver can only be assigned to one active ride at a time.",
      "Scale: 1M active drivers, 10M active riders, 50M completed trips per day."
    ],
    scaleEstimation: {
      dauMau: "100 Million MAU, 15 Million DAU",
      readsWritesRatio: "1 : 1 (250K GPS writes/sec vs 250K rider map queries/sec)",
      avgQps: "Driver Location Writes: 250,000 QPS | Rider Location Reads: 200,000 QPS | Ride Bookings: 1,500 QPS",
      peakQps: "Driver Location Writes: 500,000 QPS | Ride Requests Peak: 5,000 QPS",
      storagePerDay: "Driver Telemetry: 1M drivers * (86,400s / 4s) * 64 bytes = ~1.38 TB / day GPS history",
      storagePerYear: "Trip metadata: 50M trips/day * 1 KB = 50 GB/day = 18.25 TB / year",
      bandwidth: "Location Ingestion: 250,000 QPS * 64 bytes = 16 MB/sec incoming network stream",
      cacheMemory: "Active driver location registry: 1M drivers * 128 bytes = ~128 MB RAM (Fits entirely in memory per geo-region)"
    },
    apiDesign: [
      {
        method: "WS",
        endpoint: "/ws/driver/location",
        description: "Bi-directional WebSocket streaming driver GPS coordinates every 4 seconds.",
        requestBody: '{ "driverId": "drv_9918", "lat": 37.7749, "lon": -122.4194, "bearing": 180.5, "status": "AVAILABLE" }'
      },
      {
        method: "POST",
        endpoint: "/api/v1/rides/request",
        description: "Rider requests a ride matching nearest driver.",
        requestBody: '{\n  "riderId": "usr_alex_101",\n  "pickup": { "lat": 37.7749, "lon": -122.4194 },\n  "dropoff": { "lat": 37.7833, "lon": -122.4167 },\n  "tier": "UBER_X"\n}',
        responseBody: '{\n  "tripId": "trip_8849102",\n  "status": "SEARCHING_FOR_DRIVER",\n  "surgeMultiplier": 1.4,\n  "estimatedFare": 24.50\n}'
      }
    ],
    dataModel: {
      type: "Hybrid / Polyglot",
      entities: [
        {
          name: "DriverLocationSpatialIndex",
          description: "In-memory Uber H3 Hexagonal Cell Map storing active driver sets.",
          fields: ["h3_cell_id (UINT64)", "driver_ids (SET<VARCHAR>)", "last_updated_at (INT64)"]
        },
        {
          name: "Trip",
          description: "Persistent transactional trip record.",
          fields: ["trip_id (UUID, PK)", "rider_id (UUID)", "driver_id (UUID, NULLABLE)", "pickup_lat (DOUBLE)", "pickup_lon (DOUBLE)", "dropoff_lat (DOUBLE)", "status (ENUM)", "fare (DECIMAL)", "created_at (TIMESTAMP)"]
        }
      ],
      explanation: "Uber H3 Spatial Hexagonal Index in Redis/Memory for sub-50ms neighbor searches + PostgreSQL for ACID trip state machine."
    },
    architecture: {
      diagramAscii: `
[ 1M Active Drivers ]           [ 10M Active Riders ]
         | (WebSocket GPS 4s)             | (HTTP / SSE)
         v                                v
+----------------------+       +-------------------------+
| Location Gateway     |       | API Gateway             |
| (Netty / Go WS)      |       +-------------------------+
+----------------------+                    |
         |                                  v
         v                         +---------------------+
+----------------------+           | Dispatch & Matcher  |
| Location Ingestor    | --------> | Service             |
| (Kafka Partitioned)  |           +---------------------+
+----------------------+             /                 \\
         |                          v                   v
         v                +--------------------+  +--------------------+
+----------------------+  | Uber H3 Spatial    |  | Trip State Machine |
| Geospatial Service   |  | Index (In-Memory)  |  | (PostgreSQL ACID)  |
| (Uber H3 Index)      |  +--------------------+  +--------------------+
+----------------------+
      `,
      description: "Distributed Geospatial pipeline using Uber H3 discrete global grid system and state machine dispatcher.",
      components: [
        { name: "Location Ingestion Gateway", role: "WebSocket Aggregator", details: "Maintains 1M persistent TCP WebSockets; batches driver locations into Kafka partitioned by H3 Resolution 6 geo-cells." },
        { name: "Uber H3 Geospatial Index", role: "Spatial Engine", details: "Partitions earth into hierarchical hexagons (Resolution 7-9 ~1.2km radius). Finding neighbors is an O(1) `kRing(cell, 1)` lookup." },
        { name: "Dispatch Matcher", role: "Matching Engine", details: "Locks candidate driver with 15-second TTL distributed lock and coordinates rider-driver handshake." }
      ]
    },
    databaseChoice: {
      primaryDb: "In-Memory H3 Hex Index (Redis / Go Memory) + PostgreSQL (for Trips) + Cassandra (for GPS Telemetry)",
      rationale: "Geospatial queries require microsecond memory lookups; Trip payments need ACID transactions; GPS logs are write-heavy append-only streams.",
      alternativeConsidered: "PostGIS `ST_DWithin` spatial queries on PostgreSQL",
      tradeoff: "PostGIS disk indexes cannot handle 250,000 spatial writes per second without database CPU collapse."
    },
    cacheStrategy: {
      cacheType: "Redis Geospatial / In-Memory H3 Shards",
      evictionPolicy: "TTL-based auto-expiration (if no GPS received in 30s, driver considered offline)",
      invalidationPattern: "Direct In-Place Memory Overwrite",
      keyStructure: "geo:h3:{cell_id} -> Set of driver IDs",
      ttl: "30s"
    },
    queueEventStrategy: {
      technology: "Apache Kafka",
      topicsQueues: ["driver-locations", "trip-lifecycle-events", "dispatch-offers"],
      partitionKey: "h3_res6_cell_id (Ensures drivers in same city stay on same Kafka partition)",
      idempotencyMechanism: "Trip state machine version checking"
    },
    concurrencyAndThreadSafety: "Distributed Redis Lock on Driver ID (`SET driver:lock:drv_9918 trip_102 NX EX 15`). Prevents driver from receiving two simultaneous ride offers.",
    consistencyModel: "Strict Linearizability on Driver Dispatch assignment; Eventual consistency for map viewer driver car icons.",
    availabilityAndFailover: "Geographically sharded data centers with city-level routing isolation.",
    failureScenarios: [
      { failure: "Driver declines ride offer or 15-second timer expires", impact: "Rider waiting for match.", mitigation: "Dispatch Matcher immediately picks the 2nd closest candidate from the candidate list without restarting the entire search." }
    ],
    security: ["Rider and Driver phone number masking (VoIP proxy via Twilio) for privacy."],
    monitoringObservability: ["Dispatch matching time (P90 < 5s)", "Supply-to-demand ratio per H3 hexagon", "Driver location drop rate"],
    bottlenecks: ["Flash crowds at concert stadiums / airport arrivals causing massive surge spikes."],
    tradeOffs: [
      {
        topic: "Geohash vs Google S2 vs Uber H3",
        optionA: "Geohash (Rectangular bounding boxes)",
        optionB: "Uber H3 (Hexagonal hierarchical grid)",
        choiceMade: "Uber H3 Hexagonal Grid",
        why: "Hexagons have invariant neighbor distances (all 6 neighbors share identical center distance), eliminating corner distortion anomalies present in square Geohashes."
      }
    ],
    interviewFollowUps: [
      {
        question: "How does Uber H3 find nearby drivers in O(1) time?",
        interviewerContext: "Testing deep geospatial algorithm understanding.",
        strongAnswer: "Convert rider's lat/lon to an H3 index at resolution 8 (~460m radius). Call `h3.kRing(originCell, 2)` which instantly computes the 19 neighboring hexagonal cell IDs in O(1) mathematical coordinate arithmetic without database scans. Look up the driver ID sets for those 19 cells in memory, filter by status AVAILABLE, and compute exact haversine distances to rank the top 10."
      },
      {
        question: "How do you calculate dynamic Surge Pricing?",
        interviewerContext: "Algorithmic economics and stream processing.",
        strongAnswer: "Compute `Supply` (count of available drivers in H3 cell) and `Demand` (count of ride requests in H3 cell over last 5 minutes via Apache Flink). If `Demand / Supply > threshold`, increase multiplier: `surge = max(1.0, 1.0 + alpha * (Demand - Supply))`. Smooth the multiplier across neighboring cells via spatial Gaussian blurring to avoid sharp price cliffs at street corners."
      },
      {
        question: "How do you prevent two riders from matching the same driver simultaneously?",
        interviewerContext: "Distributed locking and race conditions.",
        strongAnswer: "When the matcher selects Driver D, it acquires an atomic distributed lock in Redis: `SET lock:driver:D trip_id NX EX 15`. If acquisition succeeds, the offer is dispatched to Driver D with a 15-second countdown. If another matcher tries to lock Driver D, it fails and immediately selects the next nearest candidate."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "TripStatus", type: "enum", responsibility: "Trip lifecycle state machine", methods: ["REQUESTED", "DRIVER_ASSIGNED", "DRIVER_ARRIVED", "IN_TRIP", "COMPLETED", "CANCELLED"] },
        { name: "IGeohashIndex", type: "interface", responsibility: "Spatial index operations", methods: ["updateLocation(driverId: string, lat: number, lon: number): void", "findNearbyDrivers(lat: number, lon: number, radiusKm: number): string[]"] },
        { name: "TripStateMachine", type: "class", responsibility: "Enforces legal trip transitions", methods: ["transition(trip: Trip, event: TripEvent): void"] }
      ],
      relationshipsUml: "TripController --> TripStateMachine\nTripController --> IGeohashIndex\nTrip *-- TripStatus",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "Geospatial indexing is completely decoupled from Trip financial billing and state transitions." }
      ],
      designPatterns: [
        { pattern: "State Pattern", whyUsed: "Governs Trip lifecycle transitions cleanly.", whyNotAlternative: "Prevents illegal jumps (e.g. going from REQUESTED straight to COMPLETED).", tradeoff: "More state classes." }
      ],
      threadSafetyMechanisms: ["Redis Redlock for driver assignment", "AtomicInteger concurrent cell sets"],
      codeImplementation: {
        language: "typescript",
        code: `export enum TripStatus {
  REQUESTED = "REQUESTED",
  DRIVER_ASSIGNED = "DRIVER_ASSIGNED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export interface GeoLocation {
  lat: number;
  lon: number;
}

export class GeospatialGridIndex {
  // Simulating H3 Cell Buckets: CellID -> Set of Driver IDs
  private cellBuckets: Map<string, Set<string>> = new Map();
  private driverLocations: Map<string, GeoLocation> = new Map();

  private getCellId(loc: GeoLocation): string {
    // 0.01 degree ~ 1.1 km grid cell
    const latGrid = Math.floor(loc.lat * 100);
    const lonGrid = Math.floor(loc.lon * 100);
    return \`cell_\${latGrid}_\${lonGrid}\`;
  }

  public updateDriverLocation(driverId: string, loc: GeoLocation): void {
    const oldLoc = this.driverLocations.get(driverId);
    if (oldLoc) {
      const oldCell = this.getCellId(oldLoc);
      this.cellBuckets.get(oldCell)?.delete(driverId);
    }

    const newCell = this.getCellId(loc);
    if (!this.cellBuckets.has(newCell)) {
      this.cellBuckets.set(newCell, new Set());
    }
    this.cellBuckets.get(newCell)!.add(driverId);
    this.driverLocations.set(driverId, loc);
  }

  public findNearbyDrivers(pickupLoc: GeoLocation): string[] {
    const originCell = this.getCellId(pickupLoc);
    const nearbyDrivers: string[] = [];

    // Check origin cell and adjacent grid cells (3x3 grid)
    const latGrid = Math.floor(pickupLoc.lat * 100);
    const lonGrid = Math.floor(pickupLoc.lon * 100);

    for (let dLat = -1; dLat <= 1; dLat++) {
      for (let dLon = -1; dLon <= 1; dLon++) {
        const cell = \`cell_\${latGrid + dLat}_\${lonGrid + dLon}\`;
        const driversInCell = this.cellBuckets.get(cell);
        if (driversInCell) {
          nearbyDrivers.push(...Array.from(driversInCell));
        }
      }
    }
    return nearbyDrivers;
  }
}`
      }
    },
    finalAnswerSummary:
      "A complete High-Level and Low-Level architecture for Uber's real-time ride-dispatch engine. Uses Uber H3 discrete hexagonal spatial indexing in memory for sub-50ms proximity queries, Kafka-partitioned location ingestion handling 250K writes/sec, Redis distributed locking for zero double-dispatch, and Flink streaming surge pricing.",
    interviewerEvaluation: {
      weak: "Proposes SQL `SELECT * WHERE lat BETWEEN ...` which crashes the database at 250,000 writes/sec.",
      needsImprovement: "Understands Geohash/H3 but lacks distributed locking for driver matching or fails to handle location ingestion scalability.",
      good: "Implements H3 spatial index, separates GPS ingestion stream via Kafka, and uses Redis distributed lock for driver matching.",
      strong: "Calculates realistic throughput and storage, details 15-second match countdown fallback, and explains H3 neighbor O(1) math.",
      tier1Ready: "Mastery of Uber's actual architecture (Ringpop, AresDB, Cherami/Kafka, H3 hex resolutions, dynamic spatial surge smoothing, and WebSockets gateway)."
    }
  },
  {
    id: "sd_multi_002",
    title: "Design Stripe / Global Payment Gateway & Idempotency Engine",
    difficulty: "Extreme",
    designType: "HLD + LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Stripe", "Amazon", "Uber", "Square", "PayPal", "Google", "Airbnb"],
    reportedMetadata: {
      company: "Stripe",
      role: "Staff Infrastructure Engineer",
      approxYear: "2024",
      round: "Payment Infrastructure & Financial Systems",
      sourceNote: "Signature Stripe problem evaluating exactly-once payment processing, idempotency keys, two-phase commits vs Sagas, and reconciliation ledgers."
    },
    categoryTag: "Financial Systems & Distributed Transactions",
    problemStatement:
      "Design a mission-critical, globally distributed Payment Gateway and Processing Platform like Stripe. Process 10,000 payment transactions per second with strict zero double-charge guarantees, end-to-end Idempotency Key validation, asynchronous payment routing (Visa/Mastercard/Banking rails), Webhooks delivery with exponential retry, and double-entry immutable ledger accounting.",
    functionalRequirements: [
      "Process Charge: Accept payment requests via API with card/token, amount, currency, and mandatory `Idempotency-Key` header.",
      "Idempotency Guarantee: Multiple identical requests with the same `Idempotency-Key` must execute the financial transaction exactly once and return the exact same original response.",
      "PSP Routing: Route transactions to optimal Payment Service Providers (Visa, Mastercard, Chase) based on latency and fee structures.",
      "Double-Entry Ledger: Record every cent transferred as balanced debits and credits in an immutable append-only ledger.",
      "Webhook Notification: Deliver cryptographically signed payment outcome webhooks to merchant endpoints with exponential backoff."
    ],
    nonFunctionalRequirements: [
      "Strict Financial Consistency: Under no circumstance can a user be double-charged or money created/lost out of thin air.",
      "High Availability: 99.999% uptime with multi-region active-active deployment.",
      "PCI-DSS Level 1 Compliance: Card PANs and CVVs must be tokenized and encrypted with hardware security modules (HSM)."
    ],
    assumptions: [
      "10,000 transactions/second peak across 150+ currencies.",
      "Idempotency keys retained for 24 hours."
    ],
    scaleEstimation: {
      dauMau: "50 Million transactions/day (~600 TPS avg, 10,000 TPS peak)",
      readsWritesRatio: "5 : 1 (Merchant dashboard reads vs charge writes)",
      avgQps: "Write: 600 TPS | Read: 3,000 QPS",
      peakQps: "Write: 10,000 TPS | Read: 30,000 QPS",
      storagePerDay: "50M transactions/day * 2 KB (audit ledger + metadata) = 100 GB / day",
      storagePerYear: "100 GB * 365 = ~36.5 TB / year (Retained indefinitely for 7-year regulatory compliance)",
      bandwidth: "10,000 TPS * 2 KB = 20 MB/sec payload bandwidth",
      cacheMemory: "Active Idempotency keys (24h): 50M * 500 bytes = ~25 GB RAM in Redis"
    },
    apiDesign: [
      {
        method: "POST",
        endpoint: "/v1/charges",
        description: "Execute a payment charge with idempotency key.",
        headers: "Authorization: Bearer sk_live_99410\nIdempotency-Key: idemp_key_884910283\nContent-Type: application/json",
        requestBody: '{\n  "amount": 2000,\n  "currency": "usd",\n  "source": "tok_visa_4242",\n  "description": "Order #9921"\n}',
        responseBody: '{\n  "id": "ch_3M4102941",\n  "object": "charge",\n  "amount": 2000,\n  "currency": "usd",\n  "status": "succeeded",\n  "created": 1724068800\n}'
      }
    ],
    dataModel: {
      type: "Relational (SQL)",
      entities: [
        {
          name: "IdempotencyRecord",
          description: "Tracks incoming idempotency keys and cached response payloads.",
          fields: [
            "idempotency_key (VARCHAR(128), PK)",
            "merchant_id (VARCHAR(64))",
            "request_hash (VARCHAR(64), SHA-256 of payload)",
            "status (PROCESSING, COMPLETED, FAILED)",
            "response_body (TEXT)",
            "response_status_code (INT)",
            "created_at (TIMESTAMP)"
          ],
          indexes: ["PRIMARY KEY (merchant_id, idempotency_key)"]
        },
        {
          name: "LedgerEntry",
          description: "Immutable double-entry financial ledger.",
          fields: [
            "entry_id (UUID, PK)",
            "transaction_id (UUID)",
            "account_id (VARCHAR)",
            "direction (DEBIT, CREDIT)",
            "amount_cents (BIGINT)",
            "currency (VARCHAR(3))",
            "created_at (TIMESTAMP)"
          ]
        }
      ],
      explanation: "Strict SQL schema ensuring double-entry balancing constraint: `SUM(debits) - SUM(credits) === 0` per transaction."
    },
    architecture: {
      diagramAscii: `
[ Merchant Server ]
       | (POST /v1/charges with Idempotency-Key)
       v
+-------------------------------------------------------------+
|                     API Gateway / Envoy                     |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|             Idempotency Layer (Redis + PostgreSQL)          |
|  - Check Key: If COMPLETED -> return cached response        |
|  - If PROCESSING -> return 409 Conflict / In-Flight retry   |
|  - If NEW -> Insert PROCESSING status atomically            |
+-------------------------------------------------------------+
                               |
                               v
+-------------------------------------------------------------+
|                  Payment Orchestration Core                 |
+-------------------------------------------------------------+
               /               |               \\
              v                v                v
     +-----------------+ +-------------+ +--------------------+
     | Tokenizer (HSM) | | PSP Router  | | Double-Entry       |
     | (PCI Vault)     | | (Visa/Chase)| | Immutable Ledger   |
     +-----------------+ +-------------+ +--------------------+
                               |
                               v
                     [ Bank / Card Network ]
                               |
                               v
                     [ Kafka Webhook Queue ]
                               |
                               v
                     [ Webhook Dispatcher ] ---> [ Merchant Webhook Endpoint ]
      `,
      description: "Mission-critical payment pipeline featuring an atomic Idempotency Layer, PCI Vault Tokenizer, and Double-Entry Ledger.",
      components: [
        { name: "Idempotency Manager", role: "Duplicate Request Gatekeeper", details: "Uses atomic database row lock or Redis `SET NX` to claim processing rights on an idempotency key before dispatching charges." },
        { name: "PCI Vault Tokenizer", role: "Card Security", details: "Isolated environment with Hardware Security Module (HSM) converting raw credit card numbers into single-use opaque tokens." },
        { name: "Double-Entry Ledger", role: "Financial Source of Truth", details: "Immutable append-only ledger guaranteeing every dollar moving from Buyer Account to Merchant Account is accounted for." }
      ]
    },
    databaseChoice: {
      primaryDb: "CockroachDB / Sharded PostgreSQL with Raft Consensus",
      rationale: "Requires strict serializable ACID transactions, zero data loss (RPO = 0), and automated multi-region consensus across cloud zones.",
      alternativeConsidered: "MongoDB / Cassandra",
      tradeoff: "NoSQL document/column stores lack multi-table atomic constraints and risk ledger discrepancies during network partitions."
    },
    concurrencyAndThreadSafety: "Optimistic concurrency locking (`version` column) and unique database index constraints on `(merchant_id, idempotency_key)`.",
    consistencyModel: "Strict Serializable Consistency for all ledger and charge balance transitions.",
    availabilityAndFailover: "Multi-Region Active-Active with Raft quorum across 3 geographical regions (e.g. us-east, us-west, eu-west).",
    failureScenarios: [
      { failure: "Card Network drops connection during charge authorization", impact: "Unknown transaction state.", mitigation: "Automatic query/reversal inquiry to acquiring bank before retrying; mark transaction RECONCILIATION_REQUIRED if ambiguous." }
    ],
    security: [
      "PCI-DSS Level 1 compliance: Complete network isolation of cardholder data environment (CDE).",
      "HMAC-SHA256 signatures on outgoing Webhooks with timestamped replay protection headers."
    ],
    monitoringObservability: ["Transaction authorization success rate", "P99 charge execution latency (< 800ms)", "Ledger balance delta gauge (must equal 0 at all times)"],
    bottlenecks: ["External card network latency (Visa/Mastercard taking 400-800ms per round trip)."],
    tradeOffs: [
      {
        topic: "Single Ledger Entry vs Double-Entry Bookkeeping",
        optionA: "Single balance column on User Account (`balance = balance + amount`)",
        optionB: "Double-Entry Bookkeeping (Debit & Credit rows)",
        choiceMade: "Double-Entry Bookkeeping",
        why: "Single balance columns create race conditions and offer zero audit trails; double-entry provides a mathematically verifiable immutable record where money cannot disappear."
      }
    ],
    interviewFollowUps: [
      {
        question: "Walk through the exact step-by-step algorithm of the Stripe Idempotency Layer.",
        interviewerContext: "Testing deep understanding of race conditions and retry protocols.",
        strongAnswer: "1. Client sends request with `Idempotency-Key: K`. 2. Server begins a DB transaction and executes `INSERT INTO idempotency_keys (key, status, req_hash) VALUES (K, 'PROCESSING', hash)`. 3. If duplicate key error occurs: query existing row. If status is `COMPLETED`, return stored `response_body`. If status is `PROCESSING`, return HTTP 409 (Conflict/In-flight) or hold connection. 4. If insert succeeded: process payment through bank rails. 5. Update row: `status = 'COMPLETED', response_body = {...}` and commit. All network retries safely receive the original response."
      },
      {
        question: "What happens if a client changes the request body but re-uses an old Idempotency Key?",
        interviewerContext: "Payload mismatch security checking.",
        strongAnswer: "The server computes the SHA-256 hash of the request payload and compares it to the stored `request_hash`. If hashes do not match, the server immediately rejects the request with HTTP 400 Bad Request: 'Idempotency key reused with different payload'."
      },
      {
        question: "How do you guarantee Webhook delivery even if the merchant server is down for 6 hours?",
        interviewerContext: "Reliable asynchronous messaging and backoff.",
        strongAnswer: "Push webhook events to a Kafka/SQS topic. A worker attempts delivery. On HTTP 5xx or timeout, schedule retries with Exponential Backoff and Jitter: 1m, 5m, 15m, 1h, 6h, 12h, 24h up to 72 hours. If still failing, move to a Dead Letter Queue (DLQ) and display a warning banner on the Merchant Dashboard."
      }
    ],
    lldOodDetails: {
      classesAndInterfaces: [
        { name: "IdempotencyService", type: "class", responsibility: "Manages atomic idempotency key locks and cached responses", methods: ["claimKey(key: string, payloadHash: string): Promise<KeyStatus>", "completeKey(key: string, response: Response): Promise<void>"] },
        { name: "IPspGateway", type: "interface", responsibility: "Payment Service Provider adapter", methods: ["authorizeCharge(token: string, amountCents: number): Promise<PspResult>"] }
      ],
      relationshipsUml: "PaymentController --> IdempotencyService\nPaymentController --> IPspGateway\nPaymentController --> LedgerService",
      solidPrinciplesApplied: [
        { principle: "SRP", application: "Idempotency enforcement is completely separated from banking network communication." }
      ],
      designPatterns: [
        { pattern: "Adapter Pattern", whyUsed: "Wraps third-party bank APIs (Chase, Visa, Adyen) behind standard IPspGateway interface.", whyNotAlternative: "Decouples domain from vendor SDKs.", tradeoff: "None." }
      ],
      threadSafetyMechanisms: ["Database unique constraint on Idempotency Key", "Serializable transaction isolation level"],
      codeImplementation: {
        language: "typescript",
        code: `import * as crypto from "crypto";

export enum IdempotencyStatus {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED"
}

export interface IdempotencyEntry {
  key: string;
  requestHash: string;
  status: IdempotencyStatus;
  responseStatusCode?: number;
  responseBody?: string;
  createdAt: number;
}

export class IdempotencyEngine {
  // In-memory simulation of SQL Idempotency Table
  private store: Map<string, IdempotencyEntry> = new Map();

  private hashPayload(payload: any): string {
    return crypto.createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  }

  public async claimOrFetch(
    key: string,
    payload: any
  ): Promise<{ action: "PROCEED" } | { action: "RETURN_CACHED"; statusCode: number; body: string } | { action: "REJECT"; error: string }> {
    const payloadHash = this.hashPayload(payload);
    const existing = this.store.get(key);

    if (existing) {
      if (existing.requestHash !== payloadHash) {
        return { action: "REJECT", error: "Idempotency key reused with different request payload." };
      }
      if (existing.status === IdempotencyStatus.COMPLETED) {
        return {
          action: "RETURN_CACHED",
          statusCode: existing.responseStatusCode || 200,
          body: existing.responseBody || ""
        };
      }
      return { action: "REJECT", error: "Transaction is currently in-flight. Please wait before retrying." };
    }

    // Atomically claim key
    this.store.set(key, {
      key,
      requestHash: payloadHash,
      status: IdempotencyStatus.PROCESSING,
      createdAt: Date.now()
    });

    return { action: "PROCEED" };
  }

  public async finalize(key: string, statusCode: number, responseBody: string): Promise<void> {
    const entry = this.store.get(key);
    if (entry) {
      entry.status = IdempotencyStatus.COMPLETED;
      entry.responseStatusCode = statusCode;
      entry.responseBody = responseBody;
    }
  }
}`
      }
    },
    finalAnswerSummary:
      "A complete, Tier-1 system design for Stripe's global payment processing engine. Features atomic Idempotency Key validation to eliminate duplicate charges, PCI-DSS compliant tokenization vaults, double-entry immutable ledgers for mathematical financial integrity, and exponential backoff webhook dispatching.",
    interviewerEvaluation: {
      weak: "Has no idempotency mechanism, resulting in catastrophic duplicate charges on network retries.",
      needsImprovement: "Understands idempotency at a high level but fails to handle payload hash validation or in-flight duplicate requests.",
      good: "Implements full idempotency key lifecycle, designs double-entry ledger, and outlines webhook retries.",
      strong: "Flawlessly walks through SHA-256 payload hash verification, CockroachDB multi-region Raft consensus, and bank network reversal protocols.",
      tier1Ready: "World-class payment systems mastery matching Stripe's engineering blog: immutable double-entry balancing, idempotent distributed Sagas, and zero-downtime ledger reconciliation."
    }
  }
];
