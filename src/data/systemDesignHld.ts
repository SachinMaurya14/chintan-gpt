import { SystemDesignProblem } from "./systemDesignTypes.js";

export const SYSTEM_DESIGN_HLD: SystemDesignProblem[] = [
  {
    id: "sd_hld_001",
    title: "Design a Scalable URL Shortener (TinyURL / Bitly)",
    difficulty: "Medium",
    designType: "HLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Google", "Amazon", "Microsoft", "Meta", "Uber", "Salesforce", "Atlassian"],
    reportedMetadata: {
      company: "Google / Amazon",
      role: "Software Engineer (L4/L5 / SDE II)",
      approxYear: "2024",
      round: "System Design (HLD)",
      sourceNote: "The quintessential Tier-1 HLD question used to evaluate scale estimation, Base62 encoding vs Key Generation Service, and read-heavy caching."
    },
    categoryTag: "Distributed Systems & API Design",
    problemStatement:
      "Design a highly available, low-latency URL shortening service (like TinyURL or Bitly). The system must accept long URLs, generate short 7-character aliases, redirect users upon accessing the short link via HTTP 301/302, track click analytics, and support custom aliases with TTL expiration at 100M new URLs/month and 100:1 read-to-write ratio.",
    functionalRequirements: [
      "URL Shortening: Given a long URL, generate a unique, short 7-character alias (e.g., https://tiny.url/7bXk9a).",
      "Redirection: When a client navigates to the short URL, redirect them to the original long URL with sub-10ms latency.",
      "Custom Alias: Support optional user-defined custom aliases (e.g., https://tiny.url/my-custom-link).",
      "Expiration / TTL: Support optional link expiry date; expired links return HTTP 404.",
      "Click Analytics: Track click counts, referrer, geographic country, and timestamp asynchronously."
    ],
    nonFunctionalRequirements: [
      "High Availability: 99.999% availability (short link redirections must never fail).",
      "Low Latency: Redirection latency < 10ms (P99).",
      "Scale: 100M new URLs created per month (~40 writes/sec avg, 500 writes/sec peak); 10 Billion reads per month (~4,000 reads/sec avg, 50,000 reads/sec peak).",
      "Non-Predictable: Short URLs should not be easily sequential or guessable to prevent scraping."
    ],
    assumptions: [
      "Read to Write ratio: 100:1 (heavily read-intensive).",
      "Default link retention: 5 years.",
      "Character set: Base62 [a-z, A-Z, 0-9] (62^7 = ~3.52 Trillion unique URLs)."
    ],
    scaleEstimation: {
      dauMau: "100 Million MAU creating URLs; 500 Million MAU clicking links",
      readsWritesRatio: "100 : 1 (Read Intensive)",
      avgQps: "Write: ~40 QPS | Read: ~4,000 QPS",
      peakQps: "Write: 500 QPS | Read: 50,000 QPS",
      storagePerDay: "100M URLs / 30 days = 3.33M writes/day * 500 bytes = ~1.66 GB / day",
      storagePerYear: "1.66 GB * 365 = ~600 GB / year (3 TB for 5-year retention)",
      bandwidth: "Read Bandwidth: 50,000 RPS * 500 bytes = 25 MB/sec | Write: 500 RPS * 500 bytes = 250 KB/sec",
      cacheMemory: "80-20 Rule: 20% of hot daily URLs generate 80% of reads. 4,000 RPS * 86,400s * 0.2 * 500 bytes = ~34.5 GB RAM for Redis cache",
      replicationFactor: "3 (Multi-AZ replication across 3 Availability Zones)"
    },
    apiDesign: [
      {
        method: "POST",
        endpoint: "/api/v1/shorten",
        description: "Create a shortened URL.",
        requestBody: '{\n  "longUrl": "https://www.example.com/very/long/path/to/resource?id=9941",\n  "customAlias": "tech-talk-2026",\n  "expireAt": "2027-01-01T00:00:00Z"\n}',
        responseBody: '{\n  "shortUrl": "https://tiny.url/tech-talk-2026",\n  "alias": "tech-talk-2026",\n  "expiresAt": "2027-01-01T00:00:00Z"\n}'
      },
      {
        method: "GET",
        endpoint: "/{shortAlias}",
        description: "Redirect to target long URL.",
        responseBody: "HTTP/1.1 302 Found\nLocation: https://www.example.com/very/long/path/to/resource?id=9941\nCache-Control: private, max-age=90"
      },
      {
        method: "GET",
        endpoint: "/api/v1/analytics/{shortAlias}",
        description: "Fetch aggregate click metrics for an alias.",
        responseBody: '{\n  "alias": "tech-talk-2026",\n  "totalClicks": 184920,\n  "topReferrers": { "twitter": 94100, "linkedin": 45000 },\n  "topCountries": { "US": 89000, "IN": 42000 }\n}'
      }
    ],
    dataModel: {
      type: "NoSQL (Document/Key-Value)",
      entities: [
        {
          name: "UrlMapping",
          description: "Primary key-value mapping from alias to destination URL.",
          fields: [
            "short_alias (VARCHAR(7), PRIMARY KEY)",
            "original_url (VARCHAR(2048))",
            "user_id (VARCHAR(64), NULLABLE)",
            "created_at (TIMESTAMP)",
            "expires_at (TIMESTAMP, INDEX)",
            "click_count (BIGINT)"
          ],
          indexes: ["PRIMARY KEY (short_alias)", "INDEX (expires_at)", "INDEX (user_id)"]
        },
        {
          name: "ClickEvent",
          description: "Append-only clickstream event for analytics (Cassandra / ClickHouse).",
          fields: ["event_id (UUID)", "short_alias (VARCHAR)", "timestamp (TIMESTAMP)", "ip_address (VARCHAR)", "country (VARCHAR(2))", "referrer (VARCHAR)"]
        }
      ],
      explanation: "NoSQL Key-Value store (DynamoDB / Cassandra / Redis) or sharded PostgreSQL. Lookups are simple primary key point queries (`GET short_alias`). No relational joins required."
    },
    architecture: {
      diagramAscii: `
                                   +---------------------+
                                   |       Clients       |
                                   +---------------------+
                                              |
                                              v
                                   [ Cloudflare CDN / Edge ]
                                              |
                                              v
                                  [ Application Load Balancer ]
                                              |
                               +--------------+--------------+
                               |                             |
                               v                             v
                   +-----------------------+     +-----------------------+
                   |  Write Service (POST) |     |  Read Service (GET)   |
                   +-----------------------+     +-----------------------+
                     /                   \\                   |
                    v                     v                  v
          +-------------------+   +----------------+  +-------------------+
          |  Key Gen Service  |   | NoSQL Database |  | Redis Read Cache  |
          |  (KGS Pre-Gen)    |   | (DynamoDB /    |  | (Hot 20% URLs)    |
          +-------------------+   |  Cassandra)    |  +-------------------+
                                  +----------------+
                                          |
                                          v (Async Click Event)
                                  [ Kafka / SQS Queue ]
                                          |
                                          v
                                  [ ClickHouse Analytics Worker ]
      `,
      description: "Separated Read and Write microservices with Key Generation Service (KGS) and Redis Cache-Aside.",
      components: [
        { name: "Key Generation Service (KGS)", role: "Pre-allocated ID Engine", details: "Pre-generates random 7-character Base62 keys and holds them in memory. When a write occurs, KGS assigns an unused key in O(1) time without DB lock contention or MD5 hashing collisions." },
        { name: "Read Service", role: "Redirect Engine", details: "Reads from Redis cache; on miss, queries DynamoDB and updates cache, returning HTTP 302 Found." },
        { name: "Kafka + ClickHouse", role: "Asynchronous Analytics", details: "Decouples click logging from redirect path to ensure zero latency penalty." }
      ]
    },
    databaseChoice: {
      primaryDb: "Amazon DynamoDB / Apache Cassandra",
      rationale: "Point-lookup queries by primary key (`short_alias`) scale linearly with zero join overhead; handles multi-region active-active replication easily.",
      alternativeConsidered: "PostgreSQL",
      tradeoff: "PostgreSQL handles 3TB easily, but requires explicit horizontal sharding and connection pooling under 50,000 read RPS."
    },
    cacheStrategy: {
      cacheType: "Redis Cluster (Cache-Aside)",
      evictionPolicy: "LRU (Least Recently Used)",
      invalidationPattern: "Write-through / Invalidate on deletion or expiration",
      keyStructure: "url:{short_alias} -> {original_url}",
      ttl: "86400s (24 hours)"
    },
    queueEventStrategy: {
      technology: "Apache Kafka",
      topicsQueues: ["url-click-events"],
      partitionKey: "short_alias",
      idempotencyMechanism: "Event deduplication via event_id in ClickHouse"
    },
    concurrencyAndThreadSafety: "KGS uses two tables (`used_keys` and `unused_keys`) and loads ranges into memory buffers with atomic CAS pointer increments, guaranteeing zero duplicate key generation.",
    consistencyModel: "Eventual consistency for analytics click counts; Strong consistency for newly created custom aliases.",
    availabilityAndFailover: "Multi-region active-active deployment behind Anycast DNS and Cloudflare edge workers.",
    failureScenarios: [
      { failure: "KGS instance crashes", impact: "Unused keys currently loaded in its memory buffer are lost.", mitigation: "Acceptable loss: 62^7 (3.5T) keys is massive; lost keys are simply skipped and never reused." },
      { failure: "Redis cache node fails", impact: "Temporary read miss spike hitting DB.", mitigation: "Redis Cluster with master-replica auto-failover and circuit breaking." }
    ],
    security: [
      "Malicious URL Detection: Asynchronously scan destination URLs against Google Safe Browsing API.",
      "Rate limiting on write endpoints (e.g. max 100 shortens/minute per IP) to prevent spam generation."
    ],
    monitoringObservability: [
      "Redirect latency histogram (P50 < 2ms, P99 < 8ms)",
      "Cache Hit Ratio (Target > 90%)",
      "KGS remaining unused keys threshold alert"
    ],
    bottlenecks: ["Hot celebrity short URL receiving 100,000 clicks/second (solved by CDN Edge caching and Redis multi-read replicas)."],
    tradeOffs: [
      {
        topic: "HTTP 301 Permanent vs HTTP 302 Temporary Redirect",
        optionA: "HTTP 301 Permanent Redirect",
        optionB: "HTTP 302 Temporary (or 307 Temporary) Redirect",
        choiceMade: "HTTP 302 (Found) / 307 (Temporary)",
        why: "HTTP 301 causes browser to cache redirect locally permanently, bypassing our servers and making click analytics impossible to collect. HTTP 302 forces subsequent requests through our server for accurate telemetry."
      },
      {
        topic: "Hashing (MD5/SHA256) vs Key Generation Service (KGS)",
        optionA: "Hash long URL with MD5 and take first 7 chars",
        optionB: "Dedicated Key Generation Service (KGS) with pre-generated Base62 keys",
        choiceMade: "Key Generation Service (KGS)",
        why: "MD5 hashing requires collision resolution (appending salts and re-hashing in a loop). KGS pre-generates guaranteed unique keys in advance, making writes O(1) with zero collisions."
      }
    ],
    interviewFollowUps: [
      {
        question: "Why is 7 characters in Base62 sufficient for TinyURL?",
        interviewerContext: "Verifying mathematical scale capacity calculation.",
        strongAnswer: "Base62 uses [0-9, a-z, A-Z] = 62 characters. With 7 characters, total combinations = 62^7 = 3,521,614,606,208 (~3.52 Trillion URLs). At our write rate of 100 Million URLs/month (1.2 Billion/year), 3.52 Trillion keys will last for ~2,934 years without running out."
      },
      {
        question: "How do you handle expired URLs and cleanup without locking the database?",
        interviewerContext: "Database maintenance and background sweeping.",
        strongAnswer: "1. Lazy Deletion: When a user visits a link, check `if (now > expires_at)`, return HTTP 404 and trigger async delete. 2. Active Scheduled Sweep: Run a daily Apache Spark / background batch worker that scans range partitions for expired links during off-peak hours and writes them back to KGS for recycling or hard deletion."
      },
      {
        question: "How do you handle a sudden viral short URL (e.g. posted by a celebrity with 100M followers)?",
        interviewerContext: "Hot key mitigation in distributed caching.",
        strongAnswer: "1. Edge CDN Caching: Set `Cache-Control: public, max-age=60` at Cloudflare/CloudFront to absorb 99% of requests at the edge. 2. Local In-Memory Cache on App Servers: Cache top 1,000 viral keys in local process memory (Go sync.Map / Guava cache) for 10 seconds to eliminate Redis network socket saturation."
      }
    ],
    finalAnswerSummary:
      "A complete High-Level Architecture for TinyURL featuring separated Read/Write microservices, a pre-generating Key Generation Service (KGS) eliminating hash collisions, Base62 7-character encoding, Redis Cache-Aside for sub-5ms 302 redirects, and Kafka-based asynchronous clickstream analytics.",
    interviewerEvaluation: {
      weak: "Hashes URL with MD5 and does not handle hash collisions or explains 301 vs 302.",
      needsImprovement: "Calculates storage but uses single MySQL DB without caching or explains how KGS operates.",
      good: "Designs KGS, implements Redis cache-aside, calculates 80-20 RAM cache sizing, and separates read/write paths.",
      strong: "Analyzes 301 vs 302 analytics trade-off, details Base62 math, handles viral hot keys with CDN edge rules, and details DB sharding.",
      tier1Ready: "Mastery of KGS dual-buffer memory allocation, Kafka clickstream deduplication, ClickHouse analytical aggregation, and multi-region Anycast routing."
    }
  },
  {
    id: "sd_hld_002",
    title: "Design Google Autocomplete / Typeahead Search Suggestion System",
    difficulty: "Hard",
    designType: "HLD + LLD",
    sourceType: "Reported Interview Question",
    companyRelevance: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Uber", "LinkedIn"],
    reportedMetadata: {
      company: "Google",
      role: "Software Engineer (L5)",
      approxYear: "2024",
      round: "System Design & Distributed Data Structures",
      sourceNote: "Flagship Google HLD problem evaluating Trie data structures, prefix trees, distributed caching, and offline MapReduce query frequency updates."
    },
    categoryTag: "Search & Information Retrieval",
    problemStatement:
      "Design a real-time Autocomplete / Typeahead search suggestion system (like Google Search or Amazon Search Bar). As a user types each keystroke, return the top 5-10 most relevant search query suggestions within 30 milliseconds. Handle 5 Billion searches per day, frequent trending queries, and personalization.",
    functionalRequirements: [
      "Real-Time Prefix Matching: Return top 10 search suggestions based on the user's typed prefix (e.g., 'sys' -> 'system design', 'system of a down', 'system software').",
      "Frequency & Ranking: Order suggestions by historic search query popularity/frequency and freshness.",
      "Real-Time Analytics & Updates: As millions of users search, query frequencies must update within minutes/hours without freezing search lookups.",
      "Filter & Moderation: Filter offensive, toxic, or banned keywords in real time."
    ],
    nonFunctionalRequirements: [
      "Ultra-Low Latency: Response time must be < 30ms (P99) from keystroke to UI display.",
      "High Availability: 99.99% availability.",
      "Scale: 5 Billion searches/day (~60,000 QPS avg, 150,000 QPS peak). Assuming 4 keystrokes per query = ~600,000 typeahead lookups/sec peak.",
      "Scalability: Support 100 Million unique search phrases in memory."
    ],
    scaleEstimation: {
      dauMau: "1 Billion DAU",
      readsWritesRatio: "1000 : 1 (Read massive typeahead lookups; write search logs asynchronously)",
      avgQps: "250,000 Typeahead Query QPS",
      peakQps: "600,000 Typeahead Query QPS",
      storagePerDay: "100M unique terms * 30 bytes avg length = 3 GB raw string data; with Trie node pointers & top-10 caches = ~30 GB RAM total",
      storagePerYear: "Search query log archive: 5 Billion searches/day * 50 bytes = 250 GB/day = ~90 TB/year",
      bandwidth: "600,000 QPS * 200 bytes (JSON response) = 120 MB/sec outgoing network bandwidth",
      cacheMemory: "Top 20% prefixes cached at Browser & CDN Edge + 30 GB Trie in-memory cluster"
    },
    apiDesign: [
      {
        method: "GET",
        endpoint: "/v1/search/suggest?q={prefix}&limit=10",
        description: "Retrieve top typeahead suggestions for prefix.",
        headers: "Cache-Control: public, max-age=60",
        responseBody: '{\n  "prefix": "sys",\n  "suggestions": [\n    { "query": "system design interview", "score": 98400 },\n    { "query": "system of a down", "score": 76200 },\n    { "query": "system requirements", "score": 54100 },\n    { "query": "system administrator", "score": 38900 }\n  ]\n}'
      }
    ],
    dataModel: {
      type: "In-Memory / Distributed Map",
      entities: [
        {
          name: "TrieNode",
          description: "Prefix tree node holding character transitions and precomputed top-10 queries.",
          fields: [
            "char (CHAR)",
            "children (MAP<CHAR, TrieNode>)",
            "is_end_of_word (BOOLEAN)",
            "top_suggestions (ARRAY<{ query: STRING, frequency: INT64 }>, MAX 10)"
          ]
        },
        {
          name: "QueryFrequencyLog",
          description: "Aggregated daily query frequencies stored in Cassandra / ClickHouse.",
          fields: ["query_text (VARCHAR, PRIMARY KEY)", "frequency (BIGINT)", "updated_at (TIMESTAMP)"]
        }
      ],
      explanation: "Trie nodes store precomputed top-K suggestions directly at every node, eliminating runtime tree traversals and sorting during search queries."
    },
    architecture: {
      diagramAscii: `
[ Client Browser (Debounce 100ms) ]
              |
              v
[ Cloudflare CDN Edge Cache ]
              | (Cache Miss)
              v
   [ API Gateway / Envoy ]
              |
              v
    +----------------------------------+
    |   Typeahead Query Service        |
    +----------------------------------+
         |                       |
         v                       v
[ Redis Prefix Cache ]   [ Distributed Trie Cluster ]
 (Hot 1-3 letter prefix)   (Sharded by Prefix a-z)
                                 ^
                                 | (Weekly / Hourly Snapshot Load)
                    +--------------------------+
                    | Trie Builder Service     |
                    +--------------------------+
                                 ^
                                 | (Aggregated Frequencies)
                    +--------------------------+
                    | Spark / Flink Streaming  |
                    +--------------------------+
                                 ^
                                 |
                    [ Kafka Query Log Stream ]
      `,
      description: "Separated Real-Time In-Memory Trie Query Cluster from Asynchronous Batch MapReduce/Spark Trie Building Pipeline.",
      components: [
        { name: "Distributed Trie Service", role: "In-Memory Read Engine", details: "Hosts partitioned Trie trees in RAM. Sharded by prefix (e.g. Server 1 handles 'a'-'c', Server 2 handles 'd'-'f')." },
        { name: "Kafka + Apache Spark", role: "Aggregation Pipeline", details: "Collects real-time search queries, counts frequencies using Sliding Window Aggregations, and updates historical frequency databases." },
        { name: "Trie Builder & Dynamic Swapper", role: "Offline Indexer", details: "Rebuilds Trie daily, serializes to S3, and notifies Trie servers to reload snapshots into memory using double-buffering (zero downtime)." }
      ]
    },
    databaseChoice: {
      primaryDb: "In-Memory Trie + Cassandra (for raw historic query frequencies)",
      rationale: "Trie in RAM provides sub-millisecond prefix searches; Cassandra handles multi-million write-per-second append-only query logs.",
      alternativeConsidered: "Elasticsearch Prefix / Edge N-gram Query",
      tradeoff: "Elasticsearch is easier to set up but consumes 4-5x more memory and has higher P99 search latency compared to a custom C++/Rust in-memory Trie with precomputed top-K nodes."
    },
    cacheStrategy: {
      cacheType: "Browser LocalStorage (5 min) + CDN Edge + Redis Cluster",
      evictionPolicy: "LRU",
      invalidationPattern: "TTL-based (5 to 15 minutes)",
      keyStructure: "suggest:{prefix} -> JSON array of suggestions",
      ttl: "300s"
    },
    queueEventStrategy: {
      technology: "Apache Kafka",
      topicsQueues: ["search-query-logs"],
      partitionKey: "query_text",
      idempotencyMechanism: "At-least-once with Spark Structured Streaming watermarking"
    },
    concurrencyAndThreadSafety: "Double-buffering: Trie query workers read from an immutable snapshot `ActiveTriePtr`. Background loader builds `StagingTrie` and atomically swaps the pointer via CAS (`std::atomic<Trie*>`).",
    consistencyModel: "Eventual consistency. Frequency updates propagate to Trie replicas within minutes to hours.",
    availabilityAndFailover: "Each Trie shard has 3 identical read replicas behind a consistent hashing router.",
    failureScenarios: [
      { failure: "Trie server crashes", impact: "Prefix queries mapped to that node fail.", mitigation: "Consistent hashing router immediately fails over to hot standby replica in same AZ." }
    ],
    security: [
      "Bloom Filter for Inappropriate / Toxic Word Filtering before suggestions are served.",
      "PII Scrubbing: Strip email addresses, phone numbers, and SSNs from search logs before Trie aggregation."
    ],
    monitoringObservability: [
      "P99 Autocomplete Latency (Target < 20ms)",
      "Debounced keystroke ratio",
      "Cache hit ratio at CDN vs Origin"
    ],
    bottlenecks: ["Memory consumption if storing all words (mitigated by pruning words with frequency < 50)."],
    tradeOffs: [
      {
        topic: "Traverse Subtree at Runtime vs Store Top-K at Every Trie Node",
        optionA: "Traverse all children at query time and sort",
        optionB: "Precompute and store Top-10 queries at every TrieNode",
        choiceMade: "Store Top-10 at every TrieNode",
        why: "Runtime traversal requires visiting thousands of child nodes and sorting in O(M + N log K) time. Storing Top-10 directly on the prefix node makes lookups instant O(L) where L is prefix length (< 10 operations)."
      }
    ],
    interviewFollowUps: [
      {
        question: "How do you optimize Trie memory consumption?",
        interviewerContext: "Deep data structure engineering.",
        strongAnswer: "1. Prune unpopular queries (discard any query searched < 50 times/month). 2. Use Compact Prefix Trees (Radix Tree / Patricia Trie) to combine single-child node chains (e.g. 'c-l-o-u-d' into one node 'cloud'). 3. Store Top-10 queries as 4-byte integer IDs referencing a global string dictionary instead of storing full duplicate strings at every node."
      },
      {
        question: "How do you handle breaking news / trending queries (e.g. World Cup earthquake) before the daily batch rebuild?",
        interviewerContext: "Real-time stream processing vs batch pipeline.",
        strongAnswer: "Deploy a Real-Time Trending Stream using Apache Flink. Flink consumes Kafka search logs and computes a 10-minute Exponential Moving Average (EMA) of query acceleration. High-acceleration trending queries are injected directly into a small Redis Real-Time Overlay Trie that merges with the static main Trie at query time."
      },
      {
        question: "Why is client-side debouncing crucial for autocomplete?",
        interviewerContext: "Frontend-backend network optimization.",
        strongAnswer: "Without debouncing, typing 'system' generates 6 immediate API requests ('s', 'sy', 'sys', 'syst', 'syste', 'system'). Adding a 100ms debounce timer ensures the request is sent only after the user pauses typing, reducing backend server query load by over 60-70%."
      }
    ],
    finalAnswerSummary:
      "A world-class Google Autocomplete architecture featuring in-memory Trie nodes storing precomputed Top-10 suggestions for O(L) lookup speed, client-side debouncing, CDN caching, double-buffered atomic pointer swapping, and an asynchronous Spark/Flink aggregation pipeline for real-time trending queries.",
    interviewerEvaluation: {
      weak: "Uses SQL `SELECT * FROM queries WHERE text LIKE 'prefix%' ORDER BY count DESC LIMIT 10`, which fails catastrophically at scale.",
      needsImprovement: "Knows basic Trie structure but traverses the entire subtree at runtime, resulting in severe latency under load.",
      good: "Implements Trie with precomputed Top-K at every node, details scale estimation, and uses Kafka for search logging.",
      strong: "Explains Radix Tree memory optimizations, double-buffered atomic swapping, client debouncing, and CDN caching.",
      tier1Ready: "Mastery of Google-scale Typeahead: Flink streaming trending injection overlay, Bloom filters for safe-search, and distributed prefix sharding."
    }
  }
];
