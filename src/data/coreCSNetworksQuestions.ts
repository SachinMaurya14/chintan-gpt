import { CoreCSQuestion } from "./coreCSTypes.js";

export const CORE_CS_NETWORKS_QUESTIONS: CoreCSQuestion[] = [
  {
    id: "net-01",
    title: "Anatomy of a URL: What Happens When You Type https://www.google.com?",
    topic: "Computer Networks",
    subtopic: "End-to-End Web Stack",
    difficulty: "Hard",
    format: "Explanation",
    companies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Uber"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Google",
      role: "Software Engineer / SRE",
      year: 2024,
      sourceReference: "Classic Tier-1 Full-Stack Networking & Systems Probe"
    },
    question: "Walk through the exact, full journey from when a user enters https://www.google.com in a browser to the first pixel rendering on the screen.",
    detailedExplanation: "1. Browser URL Parsing & HSTS check. 2. DNS Resolution: Checks browser cache -> OS cache -> hosts file -> Recursive DNS Resolver (ISP/8.8.8.8). If miss, queries Root Server -> .com TLD -> Google Authoritative Nameserver, returning IP. 3. ARP Resolution: OS resolves Default Gateway MAC address if not in ARP cache. 4. TCP 3-Way Handshake: SYN -> SYN-ACK -> ACK establishes connection on port 443. 5. TLS 1.3 Handshake: Client Hello (cipher suites, DH key share) -> Server Hello (server certificate, DH key share, encrypted extensions) -> Certificate validation via CA -> Symmetric session key established. 6. HTTP/2 Request: GET / sent with headers over encrypted TLS. 7. Server-side: Anycast routing -> Edge CDN/Load Balancer (Layer 4/Layer 7) -> Reverse Proxy -> Web application cluster. 8. HTTP Response: 200 OK + HTML payload sent. 9. Client Browser: DOM parsing -> CSSOM -> Render Tree -> Layout -> Painting -> JS execution.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Why does the browser prefer TLS 1.3 over TLS 1.2?",
        interviewerIntent: "Validate modern cryptographic handshake efficiency.",
        strongCandidateAnswer: "TLS 1.3 reduces the cryptographic handshake from 2 round trips (2-RTT) to 1 round trip (1-RTT), and supports 0-RTT resumption for returning clients. It also removes obsolete, insecure cipher suites (like RSA key exchange and CBC ciphers), mandating Perfect Forward Secrecy via Ephemeral Diffie-Hellman (ECDHE).",
        keyKeywords: ["1-RTT", "0-RTT", "Perfect Forward Secrecy", "ECDHE", "Removal of RSA key exchange"]
      },
      {
        stepNumber: 2,
        interviewerPrompt: "What is the purpose of the SYN backlog queue and accept queue in the OS kernel during the TCP handshake?",
        interviewerIntent: "Assess kernel socket mechanics and SYN Flood defense.",
        strongCandidateAnswer: "The SYN Backlog queue holds half-open connections (SYN received, SYN-ACK sent, waiting for final ACK). The Accept queue holds fully established connections ready for `accept()` syscall. If the SYN queue fills up (e.g. in a SYN flood attack), the kernel can enable `SYN Cookies` to avoid dropping connections without allocating kernel state.",
        keyKeywords: ["SYN queue", "Accept queue", "SYN Cookies", "Half-open connections"]
      }
    ],
    systemsDeepDive: {
      whyItMattersInProduction: "Crucial for debugging latency regressions, SSL termination architecture, CDN edge caching, and browser rendering optimization.",
      commonPitfalls: ["Failing to mention ARP, default gateway MAC address resolution, or TLS 1.3 key exchange."],
      tradeoffsOrPerformanceImpact: "TLS session reuse and HTTP/2 multiplexing eliminate hundreds of milliseconds of connection setup overhead on mobile networks."
    }
  },
  {
    id: "net-02",
    title: "TCP 3-Way Handshake & 4-Way Teardown (TIME_WAIT State)",
    topic: "Computer Networks",
    subtopic: "Transport Layer",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Microsoft", "Amazon", "Google", "Oracle"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Microsoft",
      role: "Software Engineer",
      year: 2024,
      sourceReference: "Microsoft Core CS Interview (Transport Layer Mechanics)"
    },
    question: "Explain the TCP 3-Way Handshake and 4-Way Teardown. Why does the initiating party enter the TIME_WAIT state for 2*MSL (Maximum Segment Lifetime)?",
    detailedExplanation: "Handshake: 1. Client sends SYN (seq=x), 2. Server sends SYN-ACK (seq=y, ack=x+1), 3. Client sends ACK (ack=y+1). Teardown (4-way): 1. Active closer sends FIN (seq=u), 2. Passive closer sends ACK (ack=u+1) and enters CLOSE_WAIT, 3. Passive closer finishes sending remaining data and sends FIN (seq=v, ack=u+1), 4. Active closer sends ACK (ack=v+1) and enters TIME_WAIT state for 2*MSL (typically 60s-120s) before transitioning to CLOSED. TIME_WAIT is essential for two reasons: 1. Reliability: If the final ACK is lost, the server will retransmit FIN; the client must remain in TIME_WAIT to resend ACK. 2. Isolation: Ensures all delayed or duplicated packets in the network have expired before the same (IP, Port) 4-tuple is reused by a new connection.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What happens if a high-throughput server makes thousands of outgoing HTTP requests and runs out of ephemeral ports due to TIME_WAIT?",
        interviewerIntent: "High-scale port exhaustion knowledge.",
        strongCandidateAnswer: "Ephemeral port exhaustion (`EADDRNOTAVAIL`). Solved by using HTTP connection pooling (Keep-Alive), enabling `tcp_tw_reuse` in sysctl, or distributing traffic across multiple local IP addresses.",
        keyKeywords: ["Ephemeral port exhaustion", "Connection pooling", "Keep-Alive", "tcp_tw_reuse"]
      }
    ]
  },
  {
    id: "net-03",
    title: "HTTP/1.1 vs HTTP/2 vs HTTP/3 (QUIC) Protocol Evolution",
    topic: "Computer Networks",
    subtopic: "Application Layer",
    difficulty: "Hard",
    format: "Design / Systems Reasoning",
    companies: ["Google", "Meta", "Cloudflare", "Uber", "Apple"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Cloudflare / Google",
      role: "Network / Infra SWE",
      year: 2024,
      sourceReference: "Modern Web Protocols & Transport Optimization"
    },
    question: "What specific problems with HTTP/1.1 did HTTP/2 solve, and why was HTTP/3 created over UDP (QUIC) to solve TCP-level Head-of-Line (HOL) blocking?",
    detailedExplanation: "HTTP/1.1 suffered from Application-level Head-of-Line (HOL) blocking (each TCP connection could only process one request-response at a time, requiring browsers to open 6 parallel TCP connections). HTTP/2 introduced Binary Framing and Multiplexing over a single TCP connection, allowing multiple concurrent request streams with prioritization and HPACK header compression. However, HTTP/2 still suffered from TCP-level HOL blocking: because TCP guarantees in-order byte delivery, if a single packet is lost on the network, the OS kernel stalls ALL concurrent HTTP/2 streams on that connection until the lost packet is retransmitted. HTTP/3 replaced TCP with QUIC over UDP: QUIC implements independent streams directly inside user space, so a lost packet on Stream 1 only stalls Stream 1 while Streams 2, 3, and 4 proceed with zero latency interruption.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How does QUIC achieve Connection Migration when a mobile device switches from Wi-Fi to 4G/5G Cellular?",
        interviewerIntent: "Assess understanding of Connection IDs vs IP 4-tuples.",
        strongCandidateAnswer: "TCP connections are bound to the 4-tuple (Src IP, Src Port, Dst IP, Dst Port); switching networks changes IP, causing TCP reset. QUIC uses a 64-bit Connection ID (CID) independent of IP/Port, allowing seamless session migration across network interfaces without re-handshaking.",
        keyKeywords: ["Connection ID (CID)", "Seamless migration", "4-tuple independence"]
      }
    ]
  },
  {
    id: "net-04",
    title: "TCP Flow Control (Sliding Window) vs Congestion Control (CUBIC / BBR)",
    topic: "Computer Networks",
    subtopic: "Transport Layer",
    difficulty: "Hard",
    format: "Explanation",
    companies: ["Google", "Amazon", "Microsoft", "Meta"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Google",
      role: "Systems / Networking SWE",
      year: 2023,
      sourceReference: "Google Transport Protocols & Congestion Analysis"
    },
    question: "Explain the fundamental difference between TCP Flow Control and TCP Congestion Control. What are the 4 phases of traditional TCP Congestion Control (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery)?",
    detailedExplanation: "Flow Control protects the RECEIVER from being overwhelmed by a fast sender. The receiver advertises its available buffer space in the `Receive Window (rwnd)` field of TCP headers; the sender never sends more than `min(cwnd, rwnd)`. Congestion Control protects the INTERMEDIATE NETWORK from being overwhelmed. The sender maintains a `Congestion Window (cwnd)` dynamically adjusted based on network feedback. 1. Slow Start: Starts with small cwnd (e.g. 10 MSS) and doubles cwnd every RTT (exponential growth) until reaching `ssthresh`. 2. Congestion Avoidance: Increases cwnd linearly by 1 MSS per RTT (Additive Increase). 3. Fast Retransmit: On receiving 3 duplicate ACKs, assumes single packet loss and retransmits immediately without waiting for RTO timeout. 4. Fast Recovery: Halves ssthresh and sets cwnd = ssthresh + 3 (Multiplicative Decrease - AIMD).",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "How does Google's BBR (Bottleneck Bandwidth and RTT) algorithm differ from loss-based algorithms like CUBIC?",
        interviewerIntent: "Modern congestion control algorithms.",
        strongCandidateAnswer: "Loss-based algorithms (CUBIC) equate packet loss with network congestion, causing bufferbloat on high-bandwidth links. BBR models the physical network by continuously estimating maximum bottleneck bandwidth and minimum propagation round-trip time (RTprop), sending data at the exact pacing rate to maximize throughput without filling switch buffers.",
        keyKeywords: ["BBR", "Bufferbloat elimination", "Pacing rate", "Bottleneck bandwidth", "RTprop"]
      }
    ]
  },
  {
    id: "net-05",
    title: "DNS Resolution Flow: Iterative vs Recursive Queries",
    topic: "Computer Networks",
    subtopic: "Application Layer & Infrastructure",
    difficulty: "Medium",
    format: "Explanation",
    companies: ["Amazon", "Microsoft", "Cloudflare", "Atlassian"],
    sourceType: "Repeated Interview Topic",
    sourceMetadata: {
      company: "Amazon",
      role: "SDE II",
      year: 2024,
      sourceReference: "Amazon Core Fundamentals Interview (DNS Architecture)"
    },
    question: "Differentiate Recursive DNS queries from Iterative DNS queries. What is the role of Root Nameservers, TLD Nameservers, and Authoritative Nameservers?",
    detailedExplanation: "In a Recursive Query (Client -> Resolver), the client delegates the entire resolution to the Recursive Resolver (e.g. ISP DNS or 1.1.1.1), demanding a complete answer (IP address or error). In Iterative Queries (Resolver -> Hierarchy), the resolver queries: 1. Root Server (13 root IP clusters), which returns the referral IP of the TLD Server (e.g., .com servers). 2. TLD Server, which returns the Authoritative Nameserver IP (e.g., ns1.google.com). 3. Authoritative Nameserver, which holds the actual DNS Zone file (A, AAAA, CNAME records) and returns the definitive IP address.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "What is DNS TTL (Time To Live) and what happens during a DNS Cache Poisoning attack?",
        interviewerIntent: "DNS security & caching dynamics.",
        strongCandidateAnswer: "TTL defines how long resolvers and clients may cache a DNS record. In DNS Cache Poisoning (Kaminsky attack), an attacker floods a resolver with fake DNS responses containing forged Transaction IDs before the real authoritative response arrives, redirecting victims to malicious IPs. Mitigated by DNSSEC (cryptographic signing of DNS records) and source port randomization.",
        keyKeywords: ["TTL", "Cache poisoning", "DNSSEC", "Transaction ID forgery", "Port randomization"]
      }
    ]
  },
  {
    id: "net-06",
    title: "WebSockets vs Server-Sent Events (SSE) vs HTTP Long Polling",
    topic: "Computer Networks",
    subtopic: "Real-Time Communication",
    difficulty: "Medium",
    format: "Design / Systems Reasoning",
    companies: ["Uber", "Meta", "Google", "Atlassian"],
    sourceType: "Reported Interview Question",
    sourceMetadata: {
      company: "Uber",
      role: "Frontend / Backend SWE",
      year: 2024,
      sourceReference: "Uber Real-time Driver Location & Dispatch Architecture"
    },
    question: "Compare WebSockets, Server-Sent Events (SSE), and Long Polling for real-time web applications. When should you choose SSE over WebSockets?",
    detailedExplanation: "Long Polling: Client opens HTTP request; server holds it open until data is available, sends response, client immediately opens new request (heavy HTTP header overhead). WebSockets: Full-duplex bidirectional TCP communication established via HTTP Upgrade handshake (ws:// or wss://); lightweight 2-byte frame overhead; ideal for chat, multiplayer gaming, financial trading. Server-Sent Events (SSE): Unidirectional server-to-client streaming over standard HTTP/2 (Content-Type: text/event-stream); built-in auto-reconnection, event IDs, and proxy/firewall friendly. Choose SSE over WebSockets when data flow is strictly unidirectional (e.g., AI token streaming like ChatGPT, live sports score ticker, stock price dashboard) because SSE runs over standard HTTP, needs no custom protocol upgrade, and handles reconnects natively.",
    interviewDrillDown: [
      {
        stepNumber: 1,
        interviewerPrompt: "Why does SSE have issues with HTTP/1.1 when opening multiple browser tabs?",
        interviewerIntent: "Browser connection limits.",
        strongCandidateAnswer: "HTTP/1.1 enforces a maximum of 6 concurrent TCP connections per domain in standard browsers. Opening 6 SSE tabs exhausts all domain connections, blocking all regular HTTP API requests. HTTP/2 solves this completely via multiplexing all SSE streams over a single connection.",
        keyKeywords: ["6 connection limit", "HTTP/1.1 exhaustion", "HTTP/2 multiplexing"]
      }
    ]
  }
];
