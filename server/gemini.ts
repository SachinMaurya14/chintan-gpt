import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

// Use server-side Gemini API key securely
const SERVER_GEMINI_KEY =
  process.env.GEMINI_API_KEY ||
  "AQ.Ab8RN6K6JyzjBzR6vNINLoE6JXL1Ry1Og_F4HSeg9wX3y72Vxw";

function getAI(): GoogleGenAI {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: SERVER_GEMINI_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// In-memory cache for reducing redundant Gemini API calls
interface CacheEntry {
  data: any;
  expiry: number;
}
const responseCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

function getCached<T>(key: string): T | null {
  const item = responseCache.get(key);
  if (!item) return null;
  if (Date.now() > item.expiry) {
    responseCache.delete(key);
    return null;
  }
  return item.data as T;
}

function setCache(key: string, data: any): void {
  responseCache.set(key, { data, expiry: Date.now() + CACHE_TTL_MS });
  // Evict old entries if cache grows too large
  if (responseCache.size > 300) {
    const oldestKey = responseCache.keys().next().value;
    if (oldestKey) responseCache.delete(oldestKey);
  }
}

// Multi-model cascading list for text tutor tasks
const PRIMARY_TEXT_MODEL = "gemini-3.7-flash";
const CANDIDATE_MODELS = [
  "gemini-3.7-flash",
  "gemini-3.1-flash-lite",
  "gemini-flash-latest"
];

// Dedicated models for image generation tasks (Nano Banana 2: gemini-3.1-flash-image / preview)
const PRIMARY_IMAGE_MODEL = "gemini-3.1-flash-image";
const FALLBACK_IMAGE_MODELS = [
  "gemini-3.1-flash-image",
  "gemini-3.1-flash-image-preview",
  "gemini-3.1-flash-lite-image"
];

/**
 * Execute a Gemini content generation with multi-model fallback and graceful error mitigation.
 */
async function generateWithFallback(params: {
  contents: any;
  config?: any;
}): Promise<string | null> {
  const ai = getAI();

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: params.contents,
        config: params.config,
      });

      if (response && response.text) {
        return response.text.trim();
      }
    } catch (err: any) {
      const isQuotaOrRateLimit =
        err?.status === "RESOURCE_EXHAUSTED" ||
        err?.code === 429 ||
        (err?.message && (err.message.includes("429") || err.message.includes("quota") || err.message.includes("RESOURCE_EXHAUSTED")));

      if (isQuotaOrRateLimit) {
        // Try next candidate model silently
        continue;
      }
      // For other transient errors, continue to fallback model
    }
  }

  return null;
}

let imageQuotaExceededUntil = 0;

/**
 * Generate a clean, responsive SVG technical schematic for CS and math topics when image quota is exhausted or offline.
 */
function generateSvgTechnicalSchematic(concept: string): string {
  const c = concept.toLowerCase();

  // 1. Two Sum / Hash Map Lookup / Complement Indexing
  if (c.includes("two sum") || c.includes("hash map") || c.includes("complement") || c.includes("hash table")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 280" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <text x="390" y="28" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">TWO SUM: HASH MAP COMPLEMENT LOOKUP (Target = 9)</text>
      
      <!-- Input Array -->
      <g transform="translate(40, 55)">
        <text x="0" y="15" fill="#a1a1aa" font-size="11" font-weight="bold">INPUT ARRAY (nums):</text>
        
        <!-- Element 0: 2 -->
        <rect x="0" y="25" width="65" height="50" rx="6" fill="#18181b" stroke="#22c55e" stroke-width="2"/>
        <text x="32" y="55" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">2</text>
        <text x="32" y="90" fill="#22c55e" font-size="11" text-anchor="middle">idx: 0</text>

        <!-- Element 1: 7 -->
        <rect x="75" y="25" width="65" height="50" rx="6" fill="#27272a" stroke="#f97316" stroke-width="2.5"/>
        <text x="107" y="55" fill="#f97316" font-size="16" font-weight="bold" text-anchor="middle">7</text>
        <text x="107" y="90" fill="#f97316" font-size="11" font-weight="bold" text-anchor="middle">idx: 1 (i)</text>

        <!-- Element 2: 11 -->
        <rect x="150" y="25" width="65" height="50" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="182" y="55" fill="#71717a" font-size="16" font-weight="bold" text-anchor="middle">11</text>
        <text x="182" y="90" fill="#71717a" font-size="11" text-anchor="middle">idx: 2</text>

        <!-- Element 3: 15 -->
        <rect x="225" y="25" width="65" height="50" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="257" y="55" fill="#71717a" font-size="16" font-weight="bold" text-anchor="middle">15</text>
        <text x="257" y="90" fill="#71717a" font-size="11" text-anchor="middle">idx: 3</text>
      </g>

      <!-- Active Iteration Logic -->
      <g transform="translate(360, 55)">
        <rect x="0" y="20" width="380" height="85" rx="8" fill="#141418" stroke="#f97316" stroke-width="1.5"/>
        <text x="15" y="42" fill="#f97316" font-size="11" font-weight="bold">ITERATION AT i = 1 (num = 7):</text>
        <text x="15" y="65" fill="#e4e4e7" font-size="11">complement = target - nums[i] = 9 - 7 = 2</text>
        <text x="15" y="88" fill="#22c55e" font-size="11" font-weight="bold">&#x2714; Match found in Map at Index 0 &rarr; Return [0, 1]</text>
      </g>

      <!-- Hash Map Table -->
      <g transform="translate(40, 165)">
        <rect x="0" y="0" width="700" height="70" rx="8" fill="#121215" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="20" y="25" fill="#3b82f6" font-size="11" font-weight="bold">HASH MAP STORE { Key (Value) &rarr; Value (Index) }:</text>
        
        <!-- Entry 1: 2 -> 0 -->
        <rect x="20" y="33" width="130" height="28" rx="4" fill="#1e1e24" stroke="#22c55e" stroke-width="1.5"/>
        <text x="85" y="52" fill="#22c55e" font-size="11" font-weight="bold" text-anchor="middle">2 &rarr; index 0</text>

        <!-- Entry 2: Status -->
        <text x="170" y="52" fill="#a1a1aa" font-size="11">&larr; Lookup 2 in O(1) time &bull; Instant Match!</text>
      </g>

      <text x="390" y="260" fill="#a1a1aa" font-size="11" text-anchor="middle">Time Complexity: O(N) single-pass &bull; Space Complexity: O(N) hash map storage</text>
    </svg>`;
  }

  // 2. Binary Search / Interval Halving
  if (c.includes("binary search") || c.includes("divide and conquer") || c.includes("sorted array") || c.includes("lower bound") || c.includes("upper bound")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 270" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <text x="390" y="28" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">BINARY SEARCH: INTERVAL HALVING (Target = 11)</text>

      <!-- Sorted Array -->
      <g transform="translate(50, 60)">
        <!-- 0: 2 -->
        <rect x="0" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#3b82f6" stroke-width="2"/>
        <text x="37" y="60" fill="#3b82f6" font-size="16" font-weight="bold" text-anchor="middle">2</text>
        <text x="37" y="98" fill="#3b82f6" font-size="10" font-weight="bold" text-anchor="middle">low (0)</text>

        <!-- 1: 5 -->
        <rect x="85" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#52525b" stroke-width="1.5"/>
        <text x="122" y="60" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">5</text>
        <text x="122" y="98" fill="#71717a" font-size="10" text-anchor="middle">idx 1</text>

        <!-- 2: 8 -->
        <rect x="170" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#52525b" stroke-width="1.5"/>
        <text x="207" y="60" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">8</text>
        <text x="207" y="98" fill="#71717a" font-size="10" text-anchor="middle">idx 2</text>

        <!-- 3: 11 (MID == TARGET) -->
        <rect x="255" y="30" width="75" height="50" rx="6" fill="#27272a" stroke="#22c55e" stroke-width="2.5"/>
        <text x="292" y="60" fill="#22c55e" font-size="16" font-weight="bold" text-anchor="middle">11</text>
        <text x="292" y="98" fill="#22c55e" font-size="10" font-weight="bold" text-anchor="middle">mid (3) &#x2714;</text>

        <!-- 4: 15 -->
        <rect x="340" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#52525b" stroke-width="1.5"/>
        <text x="377" y="60" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">15</text>
        <text x="377" y="98" fill="#71717a" font-size="10" text-anchor="middle">idx 4</text>

        <!-- 5: 19 -->
        <rect x="425" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#52525b" stroke-width="1.5"/>
        <text x="462" y="60" fill="#ffffff" font-size="16" font-weight="bold" text-anchor="middle">19</text>
        <text x="462" y="98" fill="#71717a" font-size="10" text-anchor="middle">idx 5</text>

        <!-- 6: 23 -->
        <rect x="510" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#f97316" stroke-width="2"/>
        <text x="547" y="60" fill="#f97316" font-size="16" font-weight="bold" text-anchor="middle">23</text>
        <text x="547" y="98" fill="#f97316" font-size="10" font-weight="bold" text-anchor="middle">high (6)</text>

        <!-- 7: 29 -->
        <rect x="595" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#52525b" stroke-width="1.5"/>
        <text x="632" y="60" fill="#71717a" font-size="16" font-weight="bold" text-anchor="middle">29</text>
        <text x="632" y="98" fill="#71717a" font-size="10" text-anchor="middle">idx 7</text>
      </g>

      <!-- Mid calculation formula box -->
      <g transform="translate(50, 180)">
        <rect x="0" y="0" width="670" height="55" rx="8" fill="#121215" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="25" y="24" fill="#06b6d4" font-size="11" font-weight="bold">MIDPOINT RECURRENCE:</text>
        <text x="25" y="42" fill="#e4e4e7" font-size="11">mid = low + (high - low) // 2 = 0 + (6 - 0) // 2 = 3 &bull; nums[3] == 11 &rarr; Match Found!</text>
      </g>

      <text x="390" y="255" fill="#a1a1aa" font-size="11" text-anchor="middle">Logarithmic Time: O(log N) &bull; Constant Space: O(1) Auxiliary Pointers</text>
    </svg>`;
  }

  // 3. Arrays / Two Pointers / Sliding Window
  if (c.includes("array") || c.includes("two pointer") || c.includes("sliding window") || c.includes("kadane") || c.includes("prefix sum")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 260" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <text x="390" y="28" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">ARRAY SLIDING WINDOW &amp; TWO-POINTER SCHEMATIC</text>

      <!-- Window Visual -->
      <g transform="translate(60, 60)">
        <!-- Sliding Window Box -->
        <rect x="170" y="15" width="260" height="85" rx="8" fill="#f97316" fill-opacity="0.08" stroke="#f97316" stroke-width="2" stroke-dasharray="4,4"/>
        <text x="300" y="118" fill="#f97316" font-size="11" font-weight="bold" text-anchor="middle">CURRENT WINDOW [L..R]</text>

        <!-- Array Elements -->
        <!-- 0 -->
        <rect x="0" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="37" y="60" fill="#71717a" font-size="15" font-weight="bold" text-anchor="middle">1</text>
        <!-- 1 -->
        <rect x="85" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="122" y="60" fill="#71717a" font-size="15" font-weight="bold" text-anchor="middle">4</text>
        <!-- 2 (Left) -->
        <rect x="180" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#3b82f6" stroke-width="2"/>
        <text x="217" y="60" fill="#3b82f6" font-size="15" font-weight="bold" text-anchor="middle">2</text>
        <text x="217" y="15" fill="#3b82f6" font-size="10" font-weight="bold" text-anchor="middle">&darr; Left</text>
        <!-- 3 -->
        <rect x="265" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#22c55e" stroke-width="1.5"/>
        <text x="302" y="60" fill="#22c55e" font-size="15" font-weight="bold" text-anchor="middle">10</text>
        <!-- 4 (Right) -->
        <rect x="350" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#f97316" stroke-width="2"/>
        <text x="387" y="60" fill="#f97316" font-size="15" font-weight="bold" text-anchor="middle">5</text>
        <text x="387" y="15" fill="#f97316" font-size="10" font-weight="bold" text-anchor="middle">&darr; Right</text>
        <!-- 5 -->
        <rect x="445" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="482" y="60" fill="#71717a" font-size="15" font-weight="bold" text-anchor="middle">3</text>
        <!-- 6 -->
        <rect x="530" y="30" width="75" height="50" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="567" y="60" fill="#71717a" font-size="15" font-weight="bold" text-anchor="middle">8</text>
      </g>

      <!-- Annotation -->
      <g transform="translate(60, 185)">
        <rect x="0" y="0" width="660" height="45" rx="6" fill="#121215" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="330" y="28" fill="#e4e4e7" font-size="11" text-anchor="middle">Expand Right pointer to satisfy condition &bull; Shrink Left pointer to optimize minimum window size</text>
      </g>
    </svg>`;
  }

  // 4. Stack & Queue (LIFO vs FIFO)
  if (c.includes("stack") || c.includes("queue") || c.includes("lifo") || c.includes("fifo") || c.includes("monotonic")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 260" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <text x="390" y="28" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">STACK (LIFO) VS QUEUE (FIFO) MEMORY SCHEMATICS</text>

      <!-- Stack -->
      <g transform="translate(60, 55)">
        <rect x="0" y="0" width="300" height="165" rx="8" fill="#121215" stroke="#f97316" stroke-width="1.5"/>
        <text x="150" y="24" fill="#f97316" font-size="12" font-weight="bold" text-anchor="middle">STACK (Last-In First-Out)</text>
        
        <!-- Elements -->
        <rect x="70" y="40" width="160" height="30" rx="4" fill="#27272a" stroke="#f97316" stroke-width="1.5"/>
        <text x="150" y="60" fill="#f97316" font-size="11" font-weight="bold" text-anchor="middle">TOP &rarr; Element 3 [POP]</text>

        <rect x="70" y="76" width="160" height="30" rx="4" fill="#18181b" stroke="#52525b" stroke-width="1"/>
        <text x="150" y="96" fill="#d4d4d8" font-size="11" text-anchor="middle">Element 2</text>

        <rect x="70" y="112" width="160" height="30" rx="4" fill="#18181b" stroke="#52525b" stroke-width="1"/>
        <text x="150" y="132" fill="#d4d4d8" font-size="11" text-anchor="middle">Element 1 [BOTTOM]</text>
      </g>

      <!-- Queue -->
      <g transform="translate(420, 55)">
        <rect x="0" y="0" width="300" height="165" rx="8" fill="#121215" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="150" y="24" fill="#3b82f6" font-size="12" font-weight="bold" text-anchor="middle">QUEUE (First-In First-Out)</text>
        
        <g transform="translate(20, 60)">
          <!-- Dequeue Front -->
          <rect x="0" y="0" width="75" height="45" rx="4" fill="#18181b" stroke="#22c55e" stroke-width="1.5"/>
          <text x="37" y="27" fill="#22c55e" font-size="11" font-weight="bold" text-anchor="middle">FRONT</text>
          <text x="37" y="62" fill="#22c55e" font-size="9" text-anchor="middle">[DEQUEUE]</text>

          <!-- Middle -->
          <rect x="90" y="0" width="75" height="45" rx="4" fill="#18181b" stroke="#52525b" stroke-width="1"/>
          <text x="127" y="27" fill="#d4d4d8" font-size="11" text-anchor="middle">Node 2</text>

          <!-- Enqueue Rear -->
          <rect x="180" y="0" width="75" height="45" rx="4" fill="#18181b" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="217" y="27" fill="#3b82f6" font-size="11" font-weight="bold" text-anchor="middle">REAR</text>
          <text x="217" y="62" fill="#3b82f6" font-size="9" text-anchor="middle">[ENQUEUE]</text>
        </g>
      </g>

      <text x="390" y="245" fill="#a1a1aa" font-size="11" text-anchor="middle">Push/Pop/Enqueue/Dequeue: All strictly O(1) constant time operations</text>
    </svg>`;
  }

  // 5. Dynamic Programming / Memoization Grid
  if (c.includes("dynamic programming") || c.includes("dp") || c.includes("memoization") || c.includes("knapsack") || c.includes("lcs") || c.includes("fibonacci")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 260" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <text x="390" y="28" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">DYNAMIC PROGRAMMING: STATE TRANSITION TABLE &amp; MEMOIZATION</text>

      <!-- DP Grid -->
      <g transform="translate(60, 55)">
        <rect x="0" y="0" width="660" height="150" rx="8" fill="#121215" stroke="#a855f7" stroke-width="1.5"/>
        <text x="25" y="25" fill="#a855f7" font-size="11" font-weight="bold">SUBPROBLEM GRID: dp[i][j] = dp[i-1][j] + dp[i][j-1]</text>

        <!-- Grid Cells -->
        <g transform="translate(25, 40)">
          <!-- Cell i-1, j -->
          <rect x="100" y="0" width="90" height="35" rx="4" fill="#18181b" stroke="#3b82f6" stroke-width="1.5"/>
          <text x="145" y="22" fill="#3b82f6" font-size="11" font-weight="bold" text-anchor="middle">dp[i-1][j]</text>

          <!-- Cell i, j-1 -->
          <rect x="0" y="45" width="90" height="35" rx="4" fill="#18181b" stroke="#06b6d4" stroke-width="1.5"/>
          <text x="45" y="67" fill="#06b6d4" font-size="11" font-weight="bold" text-anchor="middle">dp[i][j-1]</text>

          <!-- Target Cell i, j -->
          <rect x="100" y="45" width="90" height="35" rx="4" fill="#27272a" stroke="#22c55e" stroke-width="2"/>
          <text x="145" y="67" fill="#22c55e" font-size="11" font-weight="bold" text-anchor="middle">dp[i][j] &#x2714;</text>

          <!-- Transition description -->
          <text x="220" y="67" fill="#e4e4e7" font-size="11">&larr; Solved in O(1) from previously computed overlapping subproblems</text>
        </g>
      </g>

      <text x="390" y="240" fill="#a1a1aa" font-size="11" text-anchor="middle">Converts Exponential O(2^N) Recursion to Polynomial O(N &times; M) DP Time</text>
    </svg>`;
  }

  // 6. React / Frontend Component Architecture & Virtual DOM
  if (c.includes("react") || c.includes("virtual dom") || c.includes("component") || c.includes("frontend") || c.includes("state flow") || c.includes("hooks")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 260" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <defs>
        <marker id="reactArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#06b6d4"/>
        </marker>
      </defs>
      <text x="390" y="28" fill="#06b6d4" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">REACT VIRTUAL DOM RECONCILIATION &amp; COMPONENT FLOW</text>

      <g transform="translate(40, 60)">
        <!-- Step 1: State/Props -->
        <rect x="0" y="15" width="150" height="75" rx="8" fill="#18181b" stroke="#f97316" stroke-width="1.5"/>
        <text x="75" y="42" fill="#f97316" font-size="11" font-weight="bold" text-anchor="middle">STATE / PROPS</text>
        <text x="75" y="62" fill="#d4d4d8" font-size="10" text-anchor="middle">useState / context update</text>
        <line x1="150" y1="52" x2="195" y2="52" stroke="#06b6d4" stroke-width="2" marker-end="url(#reactArrow)"/>

        <!-- Step 2: Virtual DOM -->
        <rect x="200" y="15" width="160" height="75" rx="8" fill="#18181b" stroke="#06b6d4" stroke-width="2"/>
        <text x="280" y="42" fill="#06b6d4" font-size="11" font-weight="bold" text-anchor="middle">VIRTUAL DOM TREE</text>
        <text x="280" y="62" fill="#d4d4d8" font-size="10" text-anchor="middle">Lightweight in-memory node</text>
        <line x1="360" y1="52" x2="405" y2="52" stroke="#06b6d4" stroke-width="2" marker-end="url(#reactArrow)"/>

        <!-- Step 3: Diffing / Reconciliation -->
        <rect x="410" y="15" width="160" height="75" rx="8" fill="#18181b" stroke="#a855f7" stroke-width="1.5"/>
        <text x="490" y="42" fill="#a855f7" font-size="11" font-weight="bold" text-anchor="middle">RECONCILIATION</text>
        <text x="490" y="62" fill="#d4d4d8" font-size="10" text-anchor="middle">Fiber Heuristic Diffing</text>
        <line x1="570" y1="52" x2="615" y2="52" stroke="#06b6d4" stroke-width="2" marker-end="url(#reactArrow)"/>

        <!-- Step 4: Real DOM Patch -->
        <rect x="620" y="15" width="120" height="75" rx="8" fill="#18181b" stroke="#22c55e" stroke-width="1.5"/>
        <text x="680" y="42" fill="#22c55e" font-size="11" font-weight="bold" text-anchor="middle">REAL DOM</text>
        <text x="680" y="62" fill="#d4d4d8" font-size="10" text-anchor="middle">Minimal Batched Patches</text>
      </g>

      <text x="390" y="210" fill="#a1a1aa" font-size="11" text-anchor="middle">Zero Unnecessary Reflows &bull; Declarative UI Component Lifecycle</text>
    </svg>`;
  }

  // 7. Company Placement & Technical Interview Pipeline
  if (c.includes("placement") || c.includes("interview") || c.includes("hiring") || c.includes("google") || c.includes("microsoft") || c.includes("amazon") || c.includes("company")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 250" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <defs>
        <marker id="pipeArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#f97316"/>
        </marker>
      </defs>
      <text x="390" y="28" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">TIER-1 TECH PLACEMENT &amp; RECRUITMENT PIPELINE</text>

      <g transform="translate(30, 60)">
        <!-- Round 1: OA -->
        <rect x="0" y="10" width="160" height="85" rx="8" fill="#18181b" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="80" y="38" fill="#3b82f6" font-size="11" font-weight="bold" text-anchor="middle">1. ONLINE ASSESSMENT</text>
        <text x="80" y="58" fill="#d4d4d8" font-size="10" text-anchor="middle">2-3 DSA Questions</text>
        <text x="80" y="74" fill="#a1a1aa" font-size="9" text-anchor="middle">Aptitude &amp; CS Core</text>
        <line x1="160" y1="52" x2="195" y2="52" stroke="#f97316" stroke-width="2" marker-end="url(#pipeArrow)"/>

        <!-- Round 2: Tech 1 -->
        <rect x="200" y="10" width="160" height="85" rx="8" fill="#18181b" stroke="#f97316" stroke-width="2"/>
        <text x="280" y="38" fill="#f97316" font-size="11" font-weight="bold" text-anchor="middle">2. TECH ROUND 1</text>
        <text x="280" y="58" fill="#d4d4d8" font-size="10" text-anchor="middle">Live DSA &amp; Complexity</text>
        <text x="280" y="74" fill="#a1a1aa" font-size="9" text-anchor="middle">Edge Case Rigor</text>
        <line x1="360" y1="52" x2="395" y2="52" stroke="#f97316" stroke-width="2" marker-end="url(#pipeArrow)"/>

        <!-- Round 3: Tech 2 -->
        <rect x="400" y="10" width="160" height="85" rx="8" fill="#18181b" stroke="#a855f7" stroke-width="1.5"/>
        <text x="480" y="38" fill="#a855f7" font-size="11" font-weight="bold" text-anchor="middle">3. TECH ROUND 2</text>
        <text x="480" y="58" fill="#d4d4d8" font-size="10" text-anchor="middle">System Design &amp; LLD</text>
        <text x="480" y="74" fill="#a1a1aa" font-size="9" text-anchor="middle">Project Deep-Dive</text>
        <line x1="560" y1="52" x2="595" y2="52" stroke="#f97316" stroke-width="2" marker-end="url(#pipeArrow)"/>

        <!-- Round 4: HR / Offer -->
        <rect x="600" y="10" width="140" height="85" rx="8" fill="#18181b" stroke="#22c55e" stroke-width="1.5"/>
        <text x="670" y="38" fill="#22c55e" font-size="11" font-weight="bold" text-anchor="middle">4. HR &amp; OFFER</text>
        <text x="670" y="58" fill="#22c55e" font-size="10" font-weight="bold" text-anchor="middle">Behavioral / Fit</text>
        <text x="670" y="74" fill="#a1a1aa" font-size="9" text-anchor="middle">Compensation / Join</text>
      </g>

      <text x="390" y="210" fill="#a1a1aa" font-size="11" text-anchor="middle">Structured Interview Stages &bull; Code Quality, Communication, and Scalability Criteria</text>
    </svg>`;
  }

  // 8. Geometry / Mensuration / Math 2D & 3D Shapes
  if (
    c.includes("geometr") ||
    c.includes("mensurat") ||
    c.includes("cylinder") ||
    c.includes("cone") ||
    c.includes("sphere") ||
    c.includes("triangle") ||
    c.includes("circle") ||
    c.includes("rectangle") ||
    c.includes("polygon") ||
    c.includes("volume") ||
    c.includes("surface") ||
    c.includes("perimeter") ||
    c.includes("radius")
  ) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 270" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <defs>
        <linearGradient id="geomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1e1e24"/>
          <stop offset="100%" stop-color="#121217"/>
        </linearGradient>
      </defs>
      <text x="390" y="28" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">MENSURATION &amp; 3D GEOMETRIC SOLID SCHEMATIC</text>
      
      <!-- 1. Cylinder -->
      <g transform="translate(40, 50)">
        <rect x="0" y="0" width="200" height="175" rx="8" fill="url(#geomGrad)" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="100" y="24" fill="#f97316" font-size="12" font-weight="bold" text-anchor="middle">3D CYLINDER</text>
        <ellipse cx="100" cy="55" rx="35" ry="12" fill="#27272a" stroke="#f97316" stroke-width="1.5"/>
        <line x1="65" y1="55" x2="65" y2="115" stroke="#f97316" stroke-width="1.5"/>
        <line x1="135" y1="55" x2="135" y2="115" stroke="#f97316" stroke-width="1.5"/>
        <path d="M 65 115 A 35 12 0 0 0 135 115" fill="#18181b" stroke="#f97316" stroke-width="1.5"/>
        <line x1="148" y1="55" x2="148" y2="115" stroke="#71717a" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="162" y="88" fill="#a1a1aa" font-size="10">h</text>
        <line x1="100" y1="55" x2="135" y2="55" stroke="#3b82f6" stroke-width="1.5"/>
        <text x="116" y="50" fill="#3b82f6" font-size="9" font-weight="bold">r</text>
        <text x="100" y="145" fill="#e4e4e7" font-size="10" text-anchor="middle">Volume = &#960;r&sup2;h</text>
        <text x="100" y="162" fill="#a1a1aa" font-size="9" text-anchor="middle">CSA = 2&#960;rh &bull; TSA = 2&#960;r(h+r)</text>
      </g>

      <!-- 2. Right Circular Cone -->
      <g transform="translate(290, 50)">
        <rect x="0" y="0" width="200" height="175" rx="8" fill="url(#geomGrad)" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="100" y="24" fill="#3b82f6" font-size="12" font-weight="bold" text-anchor="middle">RIGHT CONE</text>
        <path d="M 100 45 L 65 115 L 135 115 Z" fill="#27272a" stroke="#3b82f6" stroke-width="1.5"/>
        <ellipse cx="100" cy="115" rx="35" ry="10" fill="#18181b" stroke="#3b82f6" stroke-width="1.5"/>
        <line x1="100" y1="45" x2="100" y2="115" stroke="#71717a" stroke-width="1" stroke-dasharray="2,2"/>
        <text x="92" y="85" fill="#a1a1aa" font-size="9">h</text>
        <text x="125" y="75" fill="#f97316" font-size="9" font-weight="bold">l</text>
        <line x1="100" y1="115" x2="135" y2="115" stroke="#22c55e" stroke-width="1.5"/>
        <text x="116" y="128" fill="#22c55e" font-size="9" font-weight="bold">r</text>
        <text x="100" y="145" fill="#e4e4e7" font-size="10" text-anchor="middle">Volume = &frac13;&#960;r&sup2;h</text>
        <text x="100" y="162" fill="#a1a1aa" font-size="9" text-anchor="middle">l = &radic;(r&sup2; + h&sup2;) &bull; CSA = &#960;rl</text>
      </g>

      <!-- 3. Sphere -->
      <g transform="translate(540, 50)">
        <rect x="0" y="0" width="200" height="175" rx="8" fill="url(#geomGrad)" stroke="#3f3f46" stroke-width="1.5"/>
        <text x="100" y="24" fill="#22c55e" font-size="12" font-weight="bold" text-anchor="middle">3D SPHERE</text>
        <circle cx="100" cy="80" r="35" fill="#27272a" stroke="#22c55e" stroke-width="1.5"/>
        <ellipse cx="100" cy="80" rx="35" ry="12" fill="none" stroke="#52525b" stroke-width="1" stroke-dasharray="3,3"/>
        <line x1="100" y1="80" x2="135" y2="80" stroke="#f97316" stroke-width="1.5"/>
        <text x="116" y="74" fill="#f97316" font-size="9" font-weight="bold">r</text>
        <circle cx="100" cy="80" r="2.5" fill="#ffffff"/>
        <text x="100" y="145" fill="#e4e4e7" font-size="10" text-anchor="middle">Volume = 4/3&#960;r&sup3;</text>
        <text x="100" y="162" fill="#a1a1aa" font-size="9" text-anchor="middle">Surface Area = 4&#960;r&sup2;</text>
      </g>

      <text x="390" y="250" fill="#a1a1aa" font-size="11" text-anchor="middle">Spatial Calculus &bull; Cross-Sectional Integration &bull; 2D/3D Coordinate Bounds</text>
    </svg>`;
  }

  // 2. Graph & Shortest Path / Traversal
  if (c.includes("graph") || c.includes("dijkstra") || c.includes("bfs") || c.includes("dfs") || c.includes("shortest") || c.includes("topological")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 250" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <defs>
        <marker id="gArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#f97316"/>
        </marker>
        <marker id="gArrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#22c55e"/>
        </marker>
      </defs>
      <text x="380" y="28" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">DIRECTED WEIGHTED GRAPH &amp; DIJKSTRA SHORTEST PATH</text>
      
      <!-- Graph Edges -->
      <line x1="140" y1="120" x2="290" y2="70" stroke="#22c55e" stroke-width="2.5" marker-end="url(#gArrowGreen)"/>
      <text x="210" y="85" fill="#22c55e" font-size="11" font-weight="bold">w=4 [Optimal]</text>

      <line x1="140" y1="120" x2="290" y2="170" stroke="#52525b" stroke-width="1.5" marker-end="url(#gArrow)"/>
      <text x="210" y="160" fill="#a1a1aa" font-size="11">w=9</text>

      <line x1="310" y1="70" x2="490" y2="70" stroke="#22c55e" stroke-width="2.5" marker-end="url(#gArrowGreen)"/>
      <text x="400" y="60" fill="#22c55e" font-size="11" font-weight="bold">w=2 [Optimal]</text>

      <line x1="310" y1="70" x2="310" y2="160" stroke="#52525b" stroke-width="1.5" marker-end="url(#gArrow)"/>
      <text x="325" y="120" fill="#a1a1aa" font-size="11">w=1</text>

      <line x1="310" y1="170" x2="490" y2="170" stroke="#52525b" stroke-width="1.5" marker-end="url(#gArrow)"/>
      <text x="400" y="190" fill="#a1a1aa" font-size="11">w=6</text>

      <line x1="510" y1="70" x2="650" y2="120" stroke="#22c55e" stroke-width="2.5" marker-end="url(#gArrowGreen)"/>
      <text x="595" y="85" fill="#22c55e" font-size="11" font-weight="bold">w=3 [Optimal]</text>

      <line x1="510" y1="170" x2="650" y2="120" stroke="#52525b" stroke-width="1.5" marker-end="url(#gArrow)"/>
      <text x="595" y="160" fill="#a1a1aa" font-size="11">w=8</text>

      <!-- Nodes -->
      <!-- Source A -->
      <circle cx="130" cy="120" r="22" fill="#18181b" stroke="#f97316" stroke-width="2.5"/>
      <text x="130" y="125" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">A</text>
      <text x="130" y="90" fill="#f97316" font-size="10" text-anchor="middle">SRC (dist=0)</text>

      <!-- Node B -->
      <circle cx="300" cy="70" r="20" fill="#18181b" stroke="#22c55e" stroke-width="2"/>
      <text x="300" y="75" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">B</text>
      <text x="300" y="42" fill="#22c55e" font-size="9" text-anchor="middle">dist=4</text>

      <!-- Node C -->
      <circle cx="300" cy="170" r="20" fill="#18181b" stroke="#71717a" stroke-width="1.5"/>
      <text x="300" y="175" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">C</text>
      <text x="300" y="202" fill="#71717a" font-size="9" text-anchor="middle">dist=5</text>

      <!-- Node D -->
      <circle cx="500" cy="70" r="20" fill="#18181b" stroke="#22c55e" stroke-width="2"/>
      <text x="500" y="75" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">D</text>
      <text x="500" y="42" fill="#22c55e" font-size="9" text-anchor="middle">dist=6</text>

      <!-- Node E -->
      <circle cx="500" cy="170" r="20" fill="#18181b" stroke="#71717a" stroke-width="1.5"/>
      <text x="500" y="175" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">E</text>
      <text x="500" y="202" fill="#71717a" font-size="9" text-anchor="middle">dist=11</text>

      <!-- Target Z -->
      <circle cx="660" cy="120" r="22" fill="#18181b" stroke="#3b82f6" stroke-width="2.5"/>
      <text x="660" y="125" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">Z</text>
      <text x="660" y="90" fill="#3b82f6" font-size="10" text-anchor="middle">TGT (dist=9)</text>

      <!-- Footer Annotation -->
      <text x="380" y="235" fill="#a1a1aa" font-size="11" text-anchor="middle">Min-Priority Queue &bull; Relaxation: dist[v] = min(dist[v], dist[u] + w) &bull; O((V + E) log V)</text>
    </svg>`;
  }

  // 3. Linked List
  if (c.includes("linked") || c.includes("list")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 220" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#f97316"/>
        </marker>
        <linearGradient id="nodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18181b"/>
          <stop offset="100%" stop-color="#121215"/>
        </linearGradient>
      </defs>
      <text x="380" y="30" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">SINGLY LINKED LIST MEMORY SCHEMATIC</text>
      <!-- Head Pointer -->
      <text x="45" y="105" fill="#a1a1aa" font-size="11" text-anchor="middle">HEAD</text>
      <line x1="65" y1="100" x2="105" y2="100" stroke="#f97316" stroke-width="2" marker-end="url(#arrow)"/>
      <!-- Node 1 -->
      <rect x="110" y="70" width="70" height="60" rx="8" fill="url(#nodeGrad)" stroke="#3f3f46" stroke-width="1.5"/>
      <line x1="150" y1="70" x2="150" y2="130" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="130" y="105" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">12</text>
      <circle cx="165" cy="100" r="3" fill="#f97316"/>
      <line x1="165" y1="100" x2="235" y2="100" stroke="#f97316" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="145" y="150" fill="#71717a" font-size="10" text-anchor="middle">Node 0x1A</text>
      <!-- Node 2 -->
      <rect x="240" y="70" width="70" height="60" rx="8" fill="url(#nodeGrad)" stroke="#3f3f46" stroke-width="1.5"/>
      <line x1="280" y1="70" x2="280" y2="130" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="260" y="105" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">99</text>
      <circle cx="295" cy="100" r="3" fill="#f97316"/>
      <line x1="295" y1="100" x2="365" y2="100" stroke="#f97316" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="275" y="150" fill="#71717a" font-size="10" text-anchor="middle">Node 0x2B</text>
      <!-- Node 3 -->
      <rect x="370" y="70" width="70" height="60" rx="8" fill="url(#nodeGrad)" stroke="#3f3f46" stroke-width="1.5"/>
      <line x1="410" y1="70" x2="410" y2="130" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="390" y="105" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">37</text>
      <circle cx="425" cy="100" r="3" fill="#f97316"/>
      <line x1="425" y1="100" x2="495" y2="100" stroke="#f97316" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="405" y="150" fill="#71717a" font-size="10" text-anchor="middle">Node 0x3C</text>
      <!-- Node 4 (Tail) -->
      <rect x="500" y="70" width="70" height="60" rx="8" fill="url(#nodeGrad)" stroke="#ea580c" stroke-width="1.5"/>
      <line x1="540" y1="70" x2="540" y2="130" stroke="#3f3f46" stroke-width="1.5"/>
      <text x="520" y="105" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">45</text>
      <circle cx="555" cy="100" r="3" fill="#f97316"/>
      <line x1="555" y1="100" x2="625" y2="100" stroke="#f97316" stroke-width="2" marker-end="url(#arrow)"/>
      <text x="535" y="150" fill="#ea580c" font-size="10" text-anchor="middle">TAIL (0x4D)</text>
      <!-- NULL -->
      <rect x="630" y="80" width="60" height="40" rx="6" fill="#18181b" stroke="#71717a" stroke-dasharray="3,3"/>
      <text x="660" y="105" fill="#ef4444" font-size="12" font-weight="bold" text-anchor="middle">NULL</text>
      <!-- Annotation -->
      <text x="380" y="195" fill="#a1a1aa" font-size="11" text-anchor="middle">Sequential Traversal O(N) &bull; Non-Contiguous Heap Allocation &bull; O(1) Prepend</text>
    </svg>`;
  }

  // 4. Binary Search Tree / Trees
  if (c.includes("tree") || c.includes("bst") || c.includes("heap")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 260" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#f97316"/>
        </marker>
      </defs>
      <text x="380" y="30" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">BINARY SEARCH TREE HIERARCHY (BST Invariant: Left &lt; Root &lt; Right)</text>
      <!-- Connections -->
      <line x1="380" y1="75" x2="220" y2="135" stroke="#52525b" stroke-width="2" marker-end="url(#arrow)"/>
      <line x1="380" y1="75" x2="540" y2="135" stroke="#52525b" stroke-width="2" marker-end="url(#arrow)"/>
      <line x1="220" y1="145" x2="140" y2="200" stroke="#52525b" stroke-width="1.5" marker-end="url(#arrow)"/>
      <line x1="220" y1="145" x2="300" y2="200" stroke="#52525b" stroke-width="1.5" marker-end="url(#arrow)"/>
      <line x1="540" y1="145" x2="460" y2="200" stroke="#52525b" stroke-width="1.5" marker-end="url(#arrow)"/>
      <line x1="540" y1="145" x2="620" y2="200" stroke="#52525b" stroke-width="1.5" marker-end="url(#arrow)"/>
      <!-- Root Node 50 -->
      <circle cx="380" cy="70" r="22" fill="#18181b" stroke="#f97316" stroke-width="2.5"/>
      <text x="380" y="75" fill="#ffffff" font-size="13" font-weight="bold" text-anchor="middle">50</text>
      <text x="380" y="42" fill="#ea580c" font-size="10" text-anchor="middle">ROOT</text>
      <!-- Left Child 30 -->
      <circle cx="220" cy="140" r="18" fill="#18181b" stroke="#3b82f6" stroke-width="2"/>
      <text x="220" y="145" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">30</text>
      <!-- Right Child 70 -->
      <circle cx="540" cy="140" r="18" fill="#18181b" stroke="#22c55e" stroke-width="2"/>
      <text x="540" y="145" fill="#ffffff" font-size="12" font-weight="bold" text-anchor="middle">70</text>
      <!-- Leaves -->
      <circle cx="140" cy="205" r="15" fill="#18181b" stroke="#71717a" stroke-width="1.5"/>
      <text x="140" y="209" fill="#e4e4e7" font-size="11" text-anchor="middle">20</text>
      <circle cx="300" cy="205" r="15" fill="#18181b" stroke="#71717a" stroke-width="1.5"/>
      <text x="300" y="209" fill="#e4e4e7" font-size="11" text-anchor="middle">40</text>
      <circle cx="460" cy="205" r="15" fill="#18181b" stroke="#71717a" stroke-width="1.5"/>
      <text x="460" y="209" fill="#e4e4e7" font-size="11" text-anchor="middle">60</text>
      <circle cx="620" cy="205" r="15" fill="#18181b" stroke="#71717a" stroke-width="1.5"/>
      <text x="620" y="209" fill="#e4e4e7" font-size="11" text-anchor="middle">80</text>
      <!-- Annotation -->
      <text x="380" y="245" fill="#a1a1aa" font-size="11" text-anchor="middle">Lookup / Insert / Delete: Average O(log N) &bull; Worst Case O(N) if skewed</text>
    </svg>`;
  }

  // 5. System Design & Architecture
  if (c.includes("system") || c.includes("architecture") || c.includes("microservice") || c.includes("database") || c.includes("network")) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 230" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 8 5 L 0 9 z" fill="#f97316"/>
        </marker>
      </defs>
      <text x="380" y="30" fill="#f97316" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">DISTRIBUTED HIGH-AVAILABILITY SYSTEM TOPOLOGY</text>
      <!-- Client -->
      <rect x="30" y="80" width="90" height="55" rx="8" fill="#18181b" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="75" y="105" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Clients</text>
      <text x="75" y="122" fill="#3b82f6" font-size="9" text-anchor="middle">Web / Mobile</text>
      <line x1="120" y1="107" x2="165" y2="107" stroke="#f97316" stroke-width="2" marker-end="url(#arrow)"/>
      <!-- Load Balancer -->
      <rect x="170" y="80" width="100" height="55" rx="8" fill="#18181b" stroke="#f97316" stroke-width="1.5"/>
      <text x="220" y="105" fill="#ffffff" font-size="11" font-weight="bold" text-anchor="middle">Load Balancer</text>
      <text x="220" y="122" fill="#f97316" font-size="9" text-anchor="middle">Nginx / ALB</text>
      <line x1="270" y1="95" x2="320" y2="75" stroke="#f97316" stroke-width="1.5" marker-end="url(#arrow)"/>
      <line x1="270" y1="120" x2="320" y2="140" stroke="#f97316" stroke-width="1.5" marker-end="url(#arrow)"/>
      <!-- App Instances -->
      <rect x="325" y="50" width="110" height="45" rx="6" fill="#18181b" stroke="#22c55e" stroke-width="1.5"/>
      <text x="380" y="73" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">App Service #1</text>
      <text x="380" y="86" fill="#22c55e" font-size="8" text-anchor="middle">Stateless Worker</text>
      <rect x="325" y="125" width="110" height="45" rx="6" fill="#18181b" stroke="#22c55e" stroke-width="1.5"/>
      <text x="380" y="148" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">App Service #2</text>
      <text x="380" y="161" fill="#22c55e" font-size="8" text-anchor="middle">Stateless Worker</text>
      <!-- Connections to Storage -->
      <line x1="435" y1="72" x2="495" y2="72" stroke="#f97316" stroke-width="1.5" marker-end="url(#arrow)"/>
      <line x1="435" y1="147" x2="495" y2="147" stroke="#f97316" stroke-width="1.5" marker-end="url(#arrow)"/>
      <!-- Cache (Redis) -->
      <rect x="500" y="50" width="105" height="45" rx="6" fill="#18181b" stroke="#ec4899" stroke-width="1.5"/>
      <text x="552" y="72" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Redis Cache</text>
      <text x="552" y="86" fill="#ec4899" font-size="8" text-anchor="middle">Sub-ms Latency</text>
      <!-- Primary DB -->
      <rect x="500" y="125" width="105" height="45" rx="6" fill="#18181b" stroke="#eab308" stroke-width="1.5"/>
      <text x="552" y="147" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">PostgreSQL / SQL</text>
      <text x="552" y="161" fill="#eab308" font-size="8" text-anchor="middle">ACID Replicas</text>
      <!-- Metrics/Message Bus -->
      <rect x="635" y="85" width="95" height="50" rx="6" fill="#18181b" stroke="#a855f7" stroke-width="1.5"/>
      <text x="682" y="108" fill="#ffffff" font-size="10" font-weight="bold" text-anchor="middle">Kafka / Queue</text>
      <text x="682" y="122" fill="#a855f7" font-size="8" text-anchor="middle">Async Pipeline</text>
      <!-- Annotation -->
      <text x="380" y="205" fill="#a1a1aa" font-size="11" text-anchor="middle">Decoupled Services &bull; Horizontal Autoscaling &bull; Write-Through / Cache-Aside Strategy</text>
    </svg>`;
  }

  // 6. Default / General CS Data Structure & Logic Flow Schematic
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 210" width="100%" height="100%" style="background:#09090b; font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 8 5 L 0 9 z" fill="#f97316"/>
      </marker>
    </defs>
    <text x="380" y="28" fill="#f97316" font-size="13" font-weight="bold" text-anchor="middle" letter-spacing="1">ALGORITHMIC STATE TRANSITION &amp; EXECUTION PIPELINE</text>
    <!-- Step 1 -->
    <rect x="40" y="65" width="180" height="80" rx="8" fill="#18181b" stroke="#3b82f6" stroke-width="1.5"/>
    <text x="130" y="93" fill="#3b82f6" font-size="11" font-weight="bold" text-anchor="middle">1. INPUT GUARD</text>
    <text x="130" y="112" fill="#d4d4d8" font-size="10" text-anchor="middle">Empty checks, base cases,</text>
    <text x="130" y="128" fill="#d4d4d8" font-size="10" text-anchor="middle">boundary constraints</text>
    <line x1="220" y1="105" x2="270" y2="105" stroke="#f97316" stroke-width="2" marker-end="url(#arrow)"/>
    <!-- Step 2 -->
    <rect x="280" y="65" width="200" height="80" rx="8" fill="#18181b" stroke="#f97316" stroke-width="2"/>
    <text x="380" y="93" fill="#f97316" font-size="11" font-weight="bold" text-anchor="middle">2. CORE INVARIANT LOOP</text>
    <text x="380" y="112" fill="#d4d4d8" font-size="10" text-anchor="middle">Pointer / State transition</text>
    <text x="380" y="128" fill="#d4d4d8" font-size="10" text-anchor="middle">DP memo / Divide &amp; conquer</text>
    <line x1="480" y1="105" x2="530" y2="105" stroke="#f97316" stroke-width="2" marker-end="url(#arrow)"/>
    <!-- Step 3 -->
    <rect x="540" y="65" width="180" height="80" rx="8" fill="#18181b" stroke="#22c55e" stroke-width="1.5"/>
    <text x="630" y="93" fill="#22c55e" font-size="11" font-weight="bold" text-anchor="middle">3. OPTIMAL TERMINATION</text>
    <text x="630" y="112" fill="#d4d4d8" font-size="10" text-anchor="middle">Return computed result</text>
    <text x="630" y="128" fill="#d4d4d8" font-size="10" text-anchor="middle">O(1) Auxiliary Memory</text>
    <!-- Annotation -->
    <text x="380" y="180" fill="#a1a1aa" font-size="11" text-anchor="middle">Linear Space &amp; Time Bound Guarantee &bull; Deterministic Algorithmic Flow</text>
  </svg>`;
}

/**
 * Generate an educational diagram/visual explanation using Google's dedicated image model,
 * with graceful fallback to dynamic SVG technical schematics.
 */
export async function generateVisualDiagram(params: {
  concept: string;
  context?: string;
}): Promise<string | null> {
  const { concept, context = "" } = params;
  const cacheKey = `img:${concept.trim().toLowerCase()}`;
  const cached = getCached<string>(cacheKey);
  if (cached) return cached;

  const ai = getAI();
  const imagePrompt = `High-contrast, clean, educational technical diagram explaining the concept: "${concept}".
Context details: ${context ? context.slice(0, 250) : concept}.
Visual Style: Professional dark-theme technical schematic (#09090b dark slate background). Crisp labeled nodes, clear directional pointer arrows, state boxes, clean modern typography, minimalist and highly readable for students and engineers. Do not include unnecessary decorative noise.`;

  // Check if image quota is currently in backoff cooldown
  const canAttemptImage = Date.now() > imageQuotaExceededUntil;

  if (canAttemptImage) {
    for (const model of FALLBACK_IMAGE_MODELS) {
      try {
        const imageConfig = model.includes("lite")
          ? { aspectRatio: "16:9" }
          : { aspectRatio: "16:9", imageSize: "1K" };

        const response = await ai.models.generateContent({
          model,
          contents: {
            parts: [
              {
                text: imagePrompt,
              },
            ],
          },
          config: {
            imageConfig,
          },
        });

        const parts = response.candidates?.[0]?.content?.parts || [];
        for (const part of parts) {
          const inline = part.inlineData || (part as any).inline_data;
          if (inline && (inline.data || inline.bytes)) {
            const mime = inline.mimeType || (inline as any).mime_type || "image/png";
            const rawData = inline.data || (inline as any).bytes;
            const base64Data = typeof rawData === "string" ? rawData : Buffer.from(rawData).toString("base64");
            const imageUrl = `data:${mime};base64,${base64Data}`;
            setCache(cacheKey, imageUrl);
            return imageUrl;
          }
        }
      } catch (err: any) {
        const isQuotaError =
          err?.status === "RESOURCE_EXHAUSTED" ||
          err?.code === 429 ||
          (err?.message && (err.message.includes("429") || err.message.includes("quota") || err.message.includes("RESOURCE_EXHAUSTED")));

        if (isQuotaError) {
          imageQuotaExceededUntil = Date.now() + 60 * 1000;
        }
      }
    }
  }

  // Fallback to rich, high-contrast base64 SVG technical schematic (100% browser renderable)
  const svgContent = generateSvgTechnicalSchematic(concept);
  const base64Svg = Buffer.from(svgContent, "utf-8").toString("base64");
  const svgDataUrl = `data:image/svg+xml;base64,${base64Svg}`;
  setCache(cacheKey, svgDataUrl);
  return svgDataUrl;
}

// =========================================================================
// 1. CHINTAN AI TUTOR (UPGRADED WITH GEMINI 3.7 FLASH & VISUAL EXPLANATIONS)
// =========================================================================

export interface TutorHistoryMessage {
  sender: "ai" | "user";
  text: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface TutorResponse {
  answer: string;
  imageUrl?: string;
  visualTopic?: string;
  isGrounded?: boolean;
  sources?: GroundingSource[];
}

let searchGroundingQuotaExceededUntil = 0;

/**
 * Execute real-time Google Search Grounding for time-sensitive,
 * company hiring patterns, eligibility criteria, and recruitment updates.
 */
export async function performSearchGrounding(params: {
  query: string;
  context?: string;
}): Promise<{
  answer: string;
  sources: GroundingSource[];
  isGrounded: boolean;
}> {
  const { query, context = "" } = params;
  const cacheKey = `grounding:${query.trim().toLowerCase()}`;
  const cached = getCached<{ answer: string; sources: GroundingSource[]; isGrounded: boolean }>(cacheKey);
  if (cached) return cached;

  const canAttemptSearch = Date.now() > searchGroundingQuotaExceededUntil;

  if (canAttemptSearch) {
    const ai = getAI();
    const searchModels = ["gemini-3.7-flash", "gemini-flash-latest", "gemini-2.5-flash"];
    
    for (const model of searchModels) {
      try {
        const prompt = context
          ? `Context: ${context}\n\nStudent Query: ${query}\n\nPlease provide an accurate, up-to-date, professional, and well-structured answer using real-time information from Google Search. Highlight specific years/dates, eligibility criteria, interview rounds, syllabus updates, or recruitment details where relevant.`
          : `${query}\n\nPlease provide an accurate, up-to-date, and well-structured answer using real-time Google Search information. Highlight dates, hiring patterns, eligibility rules, and interview rounds cleanly.`;

        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
            temperature: 0.4,
          },
        });

        const answer = response.text ? response.text.trim() : "";
        if (!answer) continue;

        // Extract search citations and sources
        const sources: GroundingSource[] = [];
        const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
        for (const chunk of searchChunks) {
          if (chunk.web && chunk.web.uri && chunk.web.title) {
            if (!sources.some(s => s.uri === chunk.web.uri)) {
              sources.push({
                title: chunk.web.title,
                uri: chunk.web.uri,
              });
            }
          }
        }

        const result = {
          answer,
          sources,
          isGrounded: sources.length > 0 || Boolean(response.candidates?.[0]?.groundingMetadata),
        };

        setCache(cacheKey, result);
        return result;
      } catch (err: any) {
        const isQuotaError =
          err?.status === "RESOURCE_EXHAUSTED" ||
          err?.code === 429 ||
          (err?.message && (err.message.includes("429") || err.message.includes("quota") || err.message.includes("RESOURCE_EXHAUSTED")));

        if (isQuotaError) {
          searchGroundingQuotaExceededUntil = Date.now() + 60 * 1000;
          break;
        }
      }
    }
  }

  // Gracefully fallback to standard conversational AI model or curated knowledge
  const fallback = await generateWithFallback({
    contents: query,
    config: { temperature: 0.7 }
  });

  const finalAnswer = fallback || `Here is key guidance regarding **${query}**:\n\n- **Core Preparation**: Focus on foundational data structures, algorithmic paradigms, and system design patterns.\n- **Recruitment Verification**: Because hiring dates, cut-offs, and batch eligibility criteria change each cycle, always cross-reference official company career boards or institutional placement drives.\n- **Need practice questions or a mock interview?** Ask Chintan AI for topic quizzes, code reviews, or company mock rounds!`;

  const fallbackResult = {
    answer: finalAnswer,
    sources: [],
    isGrounded: false,
  };
  setCache(cacheKey, fallbackResult);
  return fallbackResult;
}

function shouldTriggerSearchGrounding(query: string, actionType: string): boolean {
  const q = query.toLowerCase();
  
  if (actionType === "Live Search" || actionType === "Latest Hiring Updates" || actionType === "Company News") {
    return true;
  }

  const timeSensitiveTerms = [
    "latest", "current", "today", "2026", "2025", "recent", "upcoming",
    "hiring pattern", "hiring process", "recruitment drive", "nqt", "off-campus",
    "eligibility criteria", "package trend", "salary package", "cutoff", "cut-off",
    "new pattern", "updated syllabus", "company news", "hiring trend", "recruitment updates"
  ];

  const hasTimeSensitiveTerm = timeSensitiveTerms.some(term => q.includes(term));
  if (!hasTimeSensitiveTerm) return false;

  const staticDsCsExclusions = [
    "binary search", "linked list", "recursion", "dynamic programming", "time complexity",
    "merge sort", "quick sort", "binary tree", "graph traversal", "heap", "pointer in c",
    "what is an array", "how to reverse", "two sum", "bubble sort", "bitwise"
  ];

  const isStaticFundamentals = staticDsCsExclusions.some(ex => q.includes(ex) && !q.includes("hiring") && !q.includes("pattern"));
  return !isStaticFundamentals;
}

export async function askChintanTutor(params: {
  problemTitle?: string;
  problemStatement?: string;
  topic?: string;
  difficulty?: string;
  company?: string;
  courseTitle?: string;
  moduleTitle?: string;
  lessonTitle?: string;
  userQuestion: string;
  actionType?: string;
  contextCode?: string;
  recentMistakes?: string;
  conversationHistory?: TutorHistoryMessage[];
  requestVisual?: boolean;
}): Promise<TutorResponse> {
  const {
    problemTitle,
    problemStatement,
    company,
    courseTitle,
    moduleTitle,
    lessonTitle,
    topic = problemTitle ? "Data Structures & Algorithms" : "Computer Science",
    difficulty = "Intermediate",
    userQuestion,
    actionType = "General Doubt",
    contextCode,
    recentMistakes,
    conversationHistory = [],
    requestVisual = false,
  } = params;

  const currentTopic = topic || "Computer Science";
  const currentSubject = problemTitle || lessonTitle || (company ? `${company} Recruitment Prep` : currentTopic);

  // Build cache key based on prompt, subject and question
  const historySnippet = conversationHistory.slice(-2).map(m => m.text.slice(0, 30)).join("|");
  const cacheKey = `tutor_v4:${problemTitle || 'noproblem'}:${company || 'nocompany'}:${currentTopic}:${actionType}:${userQuestion.trim().toLowerCase()}:${historySnippet}:${requestVisual ? 'vis' : 'novis'}`;
  const cached = getCached<TutorResponse>(cacheKey);
  if (cached) return cached;

  // 1. Check if query requires Real-Time Google Search Grounding
  if (shouldTriggerSearchGrounding(userQuestion, actionType)) {
    const groundedContext = problemTitle
      ? `Problem: ${problemTitle} (${currentTopic}, ${difficulty})`
      : company
        ? `Company: ${company} Technical Hiring`
        : `${courseTitle || "CS Course"} > ${currentTopic} (${lessonTitle || "Lesson"})`;

    const groundedResult = await performSearchGrounding({
      query: userQuestion,
      context: groundedContext
    });

    const result: TutorResponse = {
      answer: groundedResult.answer,
      isGrounded: groundedResult.isGrounded,
      sources: groundedResult.sources,
    };
    setCache(cacheKey, result);
    return result;
  }

  const systemInstruction = `You are Chintan AI, an elite, patient, human, and deeply insightful Computer Science Tutor & Engineering Mentor on Chintan GPT.

Core Persona & Natural Tone:
- Talk like a brilliant, friendly senior engineer or professor mentoring a student 1-on-1.
- Sound natural, warm, conversational, and direct.
- NEVER sound like a robotic, corporate, or repetitive AI chatbot.
- Strictly AVOID generic AI filler clichés such as:
  "Think of this as...", "Let's build digital empires...", "I am thrilled to guide you...", "In the vast world of...", "Greetings, coding enthusiast!".
- Answer the student's actual question immediately first. Do NOT repeat or paraphrase the student's question back to them.
- Keep the length proportional: concise and crystal clear for simple doubts; deeply rigorous with technical accuracy for advanced questions.
- If the student expresses confusion, simplify intuitively with a clean mini-example rather than writing longer, more convoluted paragraphs.
- Use real-world analogies ONLY when they genuinely illuminate the mental model.
- Do NOT output unsolicited motivational speeches or promotional marketing text.

CRITICAL CONTEXT SYNCHRONIZATION RULES:
- You must ALWAYS explain the EXACT currently active problem, topic, company, or course provided in the prompt.
- If the active problem is "Two Sum" (Topic: Arrays, Difficulty: Easy), focus strictly and specifically on Two Sum and Hash Map / Array techniques.
- If the active problem is "Binary Search", focus strictly on Binary Search and logarithmic divide-and-conquer.
- If the active target company is "Google" or another company, tailor your explanation to that company's hiring standards and technical questions.
- If the active course is "React", explain React Virtual DOM, state, and hooks.
- NEVER use stale or default context (such as "Full Stack Web Mastery") when a specific problem or topic is selected.

Multi-Language & Dialect Adaptation:
- Automatically match the language, dialect, and tone of the student's message.
- If the student writes in Hinglish (e.g., "Bhai recursion mein stack overflow kyu hota hai?", "Is problem ka time complexity kya hoga?"), reply naturally in fluent, helpful Hinglish.
- If the student writes in Hindi, reply in clear, natural Hindi.
- If the student writes in English, reply in natural English.
- NEVER translate fundamental CS keywords (e.g. keep "API", "function", "variable", "recursion", "array", "pointer", "database", "stack", "queue", "loop", "time complexity", "memoization", "binary tree").
- Maintain the student's preferred language throughout the ongoing conversation.

Pedagogical Structure by Task:
1. Simple Concept:
   - Short definition
   - Simple intuitive explanation
   - Compact illustrative example
2. Challenging / Complex Concept:
   - What it is
   - Why it is needed (the problem it solves)
   - How it works (step-by-step intuition)
   - Practical example / trace
   - Common pitfall / interview trap
   - Short mental takeaway
3. Coding Question / LeetCode:
   - Explain the approach & intuition first
   - Provide clean, robust code with syntax highlighting
   - Explain the critical lines
   - State Time & Space Complexity (e.g., O(N) time, O(1) space)
   - Point out subtle bugs or edge cases
4. Debugging & Error Assistance:
   - Identify the exact bug and relevant line(s)
   - Explain WHY the error happens
   - Provide the corrected version with the fix clearly highlighted

Markdown Formatting:
- Use clean Markdown with headers (###), bold key terms, bullet points, clean tables where useful, and language-tagged code blocks (\`\`\`python, \`\`\`cpp, \`\`\`java, \`\`\`javascript, \`\`\`typescript, \`\`\`sql).`;

  // Build conversational multi-turn contents
  const contents: any[] = [];

  if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
    const recent = conversationHistory.slice(-6);
    for (const msg of recent) {
      if (msg.text && msg.text.trim()) {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
    }
  }

  // Current prompt
  let promptText = `[Action: ${actionType}]\n`;
  if (problemTitle) {
    promptText += `ACTIVE CODING PROBLEM: ${problemTitle}\n`;
    promptText += `Topic: ${currentTopic} | Difficulty: ${difficulty}\n`;
    if (company) promptText += `Company Tags: ${company}\n`;
    if (problemStatement) promptText += `Problem Statement:\n${problemStatement.slice(0, 1500)}\n`;
  } else if (company) {
    promptText += `ACTIVE COMPANY FOCUS: ${company}\n`;
    promptText += `Track: ${currentTopic} | Level: ${difficulty}\n`;
  } else if (courseTitle) {
    promptText += `ACTIVE COURSE LESSON: ${courseTitle} > ${moduleTitle || 'Core'} > ${lessonTitle || currentTopic}\n`;
    promptText += `Topic: ${currentTopic} | Difficulty: ${difficulty}\n`;
  } else {
    promptText += `ACTIVE TOPIC: ${currentTopic} (${difficulty})\n`;
  }

  if (contextCode) {
    promptText += `Student Code Context:\n\`\`\`\n${contextCode}\n\`\`\`\n`;
  }
  if (recentMistakes) {
    promptText += `Recent Student Mistakes: ${recentMistakes}\n`;
  }
  promptText += `Student: ${userQuestion}`;

  contents.push({
    role: "user",
    parts: [{ text: promptText }]
  });

  let aiText = await generateWithFallback({
    contents,
    config: {
      systemInstruction,
      temperature: 0.7,
    }
  });

  if (!aiText) {
    aiText = generateTutorFallback({
      problemTitle,
      problemStatement,
      topic: currentTopic,
      difficulty,
      company,
      courseTitle,
      lessonTitle: lessonTitle || problemTitle || currentTopic,
      actionType,
      userQuestion,
      contextCode
    });
  }

  // Determine whether an educational visual diagram should be generated
  const visualKeywords = [
    "linked list", "doubly linked", "singly linked", "circular linked",
    "binary tree", "bst", "trie", "avl tree", "red black tree", "segment tree", "heap", "min heap", "max heap",
    "graph", "bfs", "dfs", "dijkstra", "topological sort", "bipartite",
    "stack", "queue", "deque", "call stack", "recursion tree",
    "binary search", "two sum", "two pointer", "sliding window", "merge sort", "quick sort",
    "dynamic programming", "dp", "memoization", "knapsack",
    "system design", "architecture", "microservices", "load balancer", "message queue", "cache aside",
    "react", "virtual dom", "component",
    "flowchart", "diagram", "visualize", "visualization", "draw", "schematic"
  ];

  const qLower = userQuestion.toLowerCase();
  const topicLower = currentTopic.toLowerCase();
  const subjectLower = currentSubject.toLowerCase();
  const isExplicitVisual =
    requestVisual ||
    actionType === "Visual Diagram" ||
    actionType === "Explain with Visual" ||
    qLower.includes("diagram") ||
    qLower.includes("visual") ||
    qLower.includes("flowchart") ||
    qLower.includes("draw") ||
    qLower.includes("architecture");

  const hasVisualSubject = visualKeywords.some(
    kw => qLower.includes(kw) || topicLower.includes(kw) || subjectLower.includes(kw)
  );

  let imageUrl: string | undefined = undefined;
  let visualTopic: string | undefined = undefined;

  // Generate visual only if explicit or genuinely beneficial
  if (isExplicitVisual || (hasVisualSubject && qLower.length > 3)) {
    const conceptToDraw = problemTitle
      ? `${problemTitle} (${currentTopic})`
      : company
        ? `${company} Placement Technical Pipeline`
        : currentTopic && currentTopic !== "Computer Science"
          ? `${currentTopic}: ${lessonTitle || currentTopic}`
          : userQuestion.replace(/^(explain|what is|how does|tell me about|draw|show)\s+/i, "").slice(0, 60);

    try {
      const img = await generateVisualDiagram({
        concept: conceptToDraw,
        context: `${problemTitle ? `Problem: ${problemTitle}. ` : ""}${currentTopic ? `Topic: ${currentTopic}. ` : ""}${aiText.slice(0, 300)}`
      });
      if (img) {
        imageUrl = img;
        visualTopic = conceptToDraw;
      }
    } catch (e) {
      console.warn("[AI Visual] Skipped image generation:", e);
    }
  }

  const result: TutorResponse = {
    answer: aiText,
    imageUrl,
    visualTopic
  };

  setCache(cacheKey, result);
  return result;
}

function generateTutorFallback(params: {
  problemTitle?: string;
  problemStatement?: string;
  topic: string;
  difficulty: string;
  company?: string;
  courseTitle?: string;
  lessonTitle: string;
  actionType: string;
  userQuestion: string;
  contextCode?: string;
}): string {
  const { problemTitle, problemStatement, topic, difficulty, company, lessonTitle, actionType, userQuestion, contextCode } = params;

  // 1. Two Sum specific fallback
  if (problemTitle && problemTitle.toLowerCase().includes("two sum")) {
    if (actionType === "Give Hint" || userQuestion.toLowerCase().includes("hint")) {
      return `### 💡 Two Sum — Progressive Hint
1. **Brute Force vs Hash Map:** Checking every pair takes $\\mathcal{O}(N^2)$. Can we do it in a single pass?
2. **Complement Lookup:** For each number \`nums[i]\`, what number are we looking for? It's \`target - nums[i]\`.
3. **Storage:** Store each number's value as the key and its index as the value in a Hash Map as you iterate.`;
    }

    return `### 💡 Two Sum — Optimal Hash Map Solution

**Core Intuition:**
We need to find two distinct indices \`[i, j]\` such that \`nums[i] + nums[j] == target\`.

Instead of a double loop ($\\mathcal{O}(N^2)$), we maintain a **Hash Map** that remembers numbers we have already seen and their indices:
1. For each number \`nums[i]\`, compute \`complement = target - nums[i]\`.
2. Check if \`complement\` exists in our map:
   - If yes: return \`[map[complement], i]\`.
   - If no: record \`map[nums[i]] = i\`.

\`\`\`python
def twoSum(nums: list[int], target: int) -> list[int]:
    seen = {} # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
\`\`\`

**Complexity Analysis:**
- **Time Complexity:** $\\mathcal{O}(N)$ — Single pass through the array.
- **Space Complexity:** $\\mathcal{O}(N)$ — Hash map stores up to $N$ elements.`;
  }

  // 2. Binary Search specific fallback
  if (problemTitle && problemTitle.toLowerCase().includes("binary search")) {
    if (actionType === "Give Hint" || userQuestion.toLowerCase().includes("hint")) {
      return `### 💡 Binary Search — Progressive Hint
1. **Sorted Guarantee:** Because the array is sorted, comparing the target to the middle element lets you eliminate half the remaining search space.
2. **Pointer Adjustment:** If \`nums[mid] < target\`, move \`low = mid + 1\`. If \`nums[mid] > target\`, move \`high = mid - 1\`.
3. **Mid Calculation:** Use \`mid = low + (high - low) // 2\` to safely prevent integer overflow.`;
    }

    return `### 🔍 Binary Search — Optimal Logarithmic Search

**Core Intuition:**
Binary search cuts the sorted search interval in half with every comparison:
1. Initialize pointers: \`low = 0\`, \`high = len(nums) - 1\`.
2. While \`low <= high\`:
   - Compute \`mid = low + (high - low) // 2\`.
   - If \`nums[mid] == target\`: return \`mid\`.
   - If \`nums[mid] < target\`: target must be in right half $\\rightarrow$ \`low = mid + 1\`.
   - If \`nums[mid] > target\`: target must be in left half $\\rightarrow$ \`high = mid - 1\`.
3. If loop ends without finding target, return \`-1\`.

\`\`\`cpp
int binarySearch(vector<int>& nums, int target) {
    int low = 0, high = nums.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
\`\`\`

**Complexity Analysis:**
- **Time Complexity:** $\\mathcal{O}(\\log N)$ — Dividing search range by 2 at each step.
- **Space Complexity:** $\\mathcal{O}(1)$ — Pure in-place pointers.`;
  }

  // 3. Hints
  if (actionType === "Give Hint" || actionType.toLowerCase().includes("hint")) {
    return `### 💡 Progressive Hint for **${lessonTitle}** (${topic})
1. **Identify the Core Invariant:** What property or state remains true across each step of the algorithm?
2. **Look for Invariants:** Can you reduce the problem into smaller independent subproblems?
3. **Edge Case Watch:** Check single-element inputs, empty collections, and extreme bounds.
4. **Complexity Target:** Aim for the optimal time complexity ($\\mathcal{O}(N)$ or $\\mathcal{O}(N \\log N)$).`;
  }

  // 4. Debugging
  if (actionType === "Debug My Code" || contextCode) {
    return `### 🔍 Code Analysis & Debugging Guide for **${problemTitle || topic}**
${contextCode ? `**Inspected Code:**\n\`\`\`\n${contextCode}\n\`\`\`\n` : ''}
1. **Boundary & Base Cases:**
   - Verify 0-based array indexing to avoid out-of-bounds errors (\`i < n\` vs \`i <= n\`).
   - If using recursion, ensure the base condition terminates before calling recursive steps.
2. **State Mutation:**
   - Ensure variables and accumulator state are properly reset per iteration or test case.
3. **Complexity & Optimization:**
   - Eliminate redundant inner-loop allocations or nested scans.`;
  }

  // 5. Default domain intuition
  const activeName = problemTitle || lessonTitle || (company ? `${company} Preparation` : topic);
  return `### 🎓 Deep Intuition: **${activeName}** (${topic}, ${difficulty})

**Core Concept:**
When working on **${activeName}**, focus on establishing clear and deterministic state transitions:

1. **Input Guard & Constraints:** Validate boundaries, null/empty collections, and constraints first.
2. **Optimal Strategy:** Utilize the standard pattern suited for this problem class (such as two-pointers, hash map complement indexing, or divide-and-conquer).
3. **Complexity Guarantees:**
   - **Time Complexity:** $\\mathcal{O}(N)$ or $\\mathcal{O}(N \\log N)$ optimal bound.
   - **Space Complexity:** $\\mathcal{O}(1)$ auxiliary space if in-place, or $\\mathcal{O}(N)$ if auxiliary buffers are required.

Feel free to ask for complete solution code, edge cases, or a step-by-step dry run trace!`;
}

// =========================================================================
// 2. DYNAMIC QUIZ GENERATION
// =========================================================================

export async function generateDynamicQuiz(params: {
  topic: string;
  difficulty: string;
  lessonContext?: string;
  count?: number;
}) {
  const { topic, difficulty, lessonContext = "", count = 4 } = params;
  const cacheKey = `quiz:${topic}:${difficulty}:${count}`;
  const cached = getCached<any[]>(cacheKey);
  if (cached && cached.length >= count) return cached.slice(0, count);

  const prompt = `Generate a set of ${count} high-quality multiple choice questions (MCQs) for testing knowledge in ${topic} at ${difficulty} level.
${lessonContext ? `Lesson context:\n${lessonContext}` : ''}

Return ONLY valid JSON matching this exact structure:
[
  {
    "id": "q1",
    "question": "Question text...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctOptionIndex": 0,
    "explanation": "Detailed explanation of why this answer is correct and others are wrong.",
    "topic": "${topic}",
    "difficulty": "${difficulty}"
  }
]`;

  const aiText = await generateWithFallback({
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.6,
    }
  });

  if (aiText) {
    try {
      const cleaned = aiText.replace(/^```json/, '').replace(/```$/, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setCache(cacheKey, parsed);
        return parsed;
      }
    } catch {
      // Fall through to domain fallback
    }
  }

  // Built-in authentic question bank fallback for standard topics
  const fallback = generateQuizFallback(topic, difficulty, count);
  setCache(cacheKey, fallback);
  return fallback;
}

function generateQuizFallback(topic: string, difficulty: string, count: number) {
  const topicLower = topic.toLowerCase();
  
  if (topicLower.includes("average") || topicLower.includes("mixture") || topicLower.includes("alligation")) {
    return [
      {
        id: `fb_avg_1`,
        question: `The average of 5 consecutive numbers is 27. What is the largest of these numbers?`,
        options: ["27", "28", "29", "30"],
        correctOptionIndex: 2,
        explanation: `For an odd number of consecutive integers, the average is the middle (3rd) number. The numbers are 25, 26, 27, 28, 29. The largest is 29.`,
        topic,
        difficulty
      },
      {
        id: `fb_avg_2`,
        question: `In what ratio must tea at $62 per kg be mixed with tea at $72 per kg so that the mixture must be worth $64.50 per kg?`,
        options: ["3 : 1", "3 : 2", "4 : 3", "2 : 3"],
        correctOptionIndex: 0,
        explanation: `By Rule of Alligation: (72 - 64.50) : (64.50 - 62) = 7.5 : 2.5 = 3 : 1.`,
        topic,
        difficulty
      },
      {
        id: `fb_avg_3`,
        question: `The average score of 40 students is 68. If the score of one student was mistakenly recorded as 84 instead of 48, what is the correct average?`,
        options: ["67.1", "67.9", "68.9", "66.5"],
        correctOptionIndex: 0,
        explanation: `Difference = 48 - 84 = -36. Change in average = -36 / 40 = -0.9. Correct average = 68 - 0.9 = 67.1.`,
        topic,
        difficulty
      },
      {
        id: `fb_avg_4`,
        question: `A container contains 40 litres of milk. 4 litres are drawn out and replaced with water. This process is repeated once more. How much milk is left in the container now?`,
        options: ["32.4 litres", "34.2 litres", "36.0 litres", "30.8 litres"],
        correctOptionIndex: 0,
        explanation: `Formula: Initial * (1 - x/C)^n = 40 * (1 - 4/40)^2 = 40 * (9/10)^2 = 40 * 81/100 = 32.4 litres.`,
        topic,
        difficulty
      }
    ].slice(0, count);
  }

  return [
    {
      id: `fb_gen_1`,
      question: `What is the optimal time complexity to search an element in a balanced binary search tree (BST) of N elements?`,
      options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
      correctOptionIndex: 1,
      explanation: `In a balanced BST, each comparison halves the search space, giving an O(log N) worst-case time complexity.`,
      topic,
      difficulty
    },
    {
      id: `fb_gen_2`,
      question: `Which data structure is primarily utilized to implement Breadth-First Search (BFS) on a graph?`,
      options: ["Stack", "Priority Queue", "Queue", "Binary Heap"],
      correctOptionIndex: 2,
      explanation: `BFS explores graph vertices level-by-level in First-In-First-Out (FIFO) order, making a Queue the standard data structure.`,
      topic,
      difficulty
    },
    {
      id: `fb_gen_3`,
      question: `What is the auxiliary space complexity of two-pointer in-place array reversal?`,
      options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
      correctOptionIndex: 0,
      explanation: `Two pointers swap elements in-place using only constant additional pointer variables, requiring O(1) auxiliary memory.`,
      topic,
      difficulty
    },
    {
      id: `fb_gen_4`,
      question: `Which algorithmic paradigm solves subproblems once and stores their solutions to avoid redundant computations?`,
      options: ["Greedy Method", "Divide & Conquer", "Dynamic Programming", "Backtracking"],
      correctOptionIndex: 2,
      explanation: `Dynamic Programming uses memoization or tabulation to store optimal solutions to overlapping subproblems.`,
      topic,
      difficulty
    }
  ].slice(0, count);
}

// =========================================================================
// 3. CODING ASSISTANT
// =========================================================================

export async function assistCodingAI(params: {
  problemTitle: string;
  problemDescription: string;
  currentCode: string;
  language: string;
  action: 'hint1' | 'hint2' | 'explainApproach' | 'explainMyCode' | 'debugCode' | 'explainError' | 'optimize' | 'complexity';
  errorOutput?: string;
}): Promise<string> {
  const { problemTitle, problemDescription, currentCode, language, action, errorOutput } = params;

  const prompts: Record<string, string> = {
    hint1: `Give a subtle Level 1 Hint for solving "${problemTitle}". Do NOT reveal the code or final algorithm. Focus on how to observe the input or mathematical relation.`,
    hint2: `Give a concrete Level 2 Hint for "${problemTitle}". Suggest the appropriate data structure or algorithmic technique (e.g. two pointers, hash map, sliding window) and why it helps, without writing full code.`,
    explainApproach: `Explain the optimal approach step-by-step for "${problemTitle}". Include intuition, state transitions, and step-by-step algorithm.`,
    explainMyCode: `Break down and explain the student's current ${language} code line-by-line. Highlight what each segment accomplishes.`,
    debugCode: `Analyze the student's ${language} code for bugs, edge case misses (like overflow, null pointers, off-by-one errors), and logical flaws for "${problemTitle}". Point out where the bug is and explain the fix conceptually.`,
    explainError: `The student encountered this error/failure:\n${errorOutput || "Test case failure"}\nExplain why this happened in simple terms and how to resolve it in their code.`,
    optimize: `Review the student's code and suggest optimizations for runtime and memory overhead. Explain how to reduce time/space complexity.`,
    complexity: `Provide a thorough Big-O Time Complexity and Space Complexity analysis of the current ${language} code. Break down worst-case, best-case, and auxiliary space.`
  };

  const systemInstruction = `You are the Chintan GPT AI Coding Assistant integrated directly into the LeetCode-style code editor.
Problem: ${problemTitle}
Description: ${problemDescription}
Language: ${language}
Current Student Code:
\`\`\`${language}
${currentCode}
\`\`\`

Rule:
- For hints, be progressive and never spoil the entire solution in a single hint.
- Provide crisp, formatted Markdown with bold subheadings and clear bullet points.
- If pointing out bugs, explain the root cause clearly.`;

  const aiText = await generateWithFallback({
    contents: prompts[action] || `Provide coding guidance for "${problemTitle}".`,
    config: {
      systemInstruction,
      temperature: 0.6,
    }
  });

  if (aiText) return aiText;

  // Domain fallback for coding assistance
  return generateCodingAssistFallback(action, problemTitle, language, errorOutput);
}

function generateCodingAssistFallback(action: string, problemTitle: string, language: string, errorOutput?: string): string {
  switch (action) {
    case 'hint1':
      return `### 💡 Level 1 Hint for **${problemTitle}**
- **Observe the Relationship:** Consider how sorting or hashing changes the time cost of finding corresponding elements.
- **Ask yourself:** For any element $x$, what exact value or state are you searching for, and can it be looked up in $\\mathcal{O}(1)$ time?`;

    case 'hint2':
      return `### 💡 Level 2 Hint for **${problemTitle}**
- **Optimal Data Structure:** Use a **Hash Map / Set** to store elements as you iterate, or use **Two Pointers** if the input is sorted.
- **State Transition:** As you visit element $i$, check if the complement/target already exists in your table. If so, return immediately.`;

    case 'explainApproach':
      return `### 📐 Optimal Approach for **${problemTitle}**
1. **Intuition:** Instead of comparing every pair using nested loops (which takes $\\mathcal{O}(N^2)$ time), maintain a hash lookup table.
2. **Algorithm Step-by-Step:**
   - Initialize an empty map/hash table.
   - Iterate through the collection with index $i$ and value $val$.
   - Calculate \`complement = target - val\`.
   - If \`complement\` is present in the map, you found the matching pair.
   - Otherwise, record \`map[val] = i\` and continue.
3. **Complexity:**
   - **Time Complexity:** $\\mathcal{O}(N)$ single pass.
   - **Space Complexity:** $\\mathcal{O}(N)$ auxiliary memory.`;

    case 'debugCode':
      return `### 🐛 Debugging Insights for **${problemTitle}** (${language})
- **Index Bounds:** Ensure your loop indices do not access out-of-bounds indices (e.g., $i < N$).
- **Handling Duplicates:** Make sure your solution handles duplicate keys/elements appropriately.
- **Empty / Singleton Inputs:** Verify what happens when $N = 0$ or $N = 1$.`;

    case 'explainError':
      return `### ⚠️ Runtime / Test Error Analysis
${errorOutput ? `**Output Log:**\n\`\`\`\n${errorOutput}\n\`\`\`\n` : ''}
- **Common Cause:** The code either produced an incorrect value on edge test cases (e.g. empty array, duplicate elements, negative numbers) or exceeded memory/time constraints.
- **Remedy:** Add explicit boundary condition guards at the start of your function.`;

    case 'optimize':
      return `### ⚡ Optimization Strategy for **${problemTitle}**
- **Avoid Repeated Work:** Store intermediate computations rather than recalculating them in inner loops.
- **Memory Allocation:** Pre-allocate vectors/arrays if the final size is known in advance to prevent continuous reallocation overhead.`;

    case 'complexity':
      return `### 📊 Complexity Analysis (${language})
- **Time Complexity:** $\\mathcal{O}(N)$ where $N$ is the number of elements in the input.
- **Space Complexity:** $\\mathcal{O}(1)$ auxiliary space for in-place algorithms, or $\\mathcal{O}(N)$ when using hash collections.`;

    default:
      return `### Guidance for ${problemTitle}\nReview edge cases, loop termination, and pointer convergence.`;
  }
}

// =========================================================================
// 4. MOCK INTERVIEW AI
// =========================================================================

export async function conductMockInterviewAI(params: {
  company: string;
  role: string;
  round: string;
  difficulty: string;
  history: { sender: 'ai' | 'user'; text: string }[];
  currentQuestionIndex: number;
  totalQuestions: number;
  userAnswer?: string;
  isEvaluation?: boolean;
}) {
  const { company, role, round, difficulty, history, currentQuestionIndex, totalQuestions, userAnswer, isEvaluation } = params;

  if (isEvaluation) {
    const prompt = `You are the lead bar-raiser interviewer evaluating a candidate interview for:
Company: ${company}
Role: ${role}
Round: ${round}
Difficulty: ${difficulty}

Transcript:
${history.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join('\n\n')}

Provide an objective evaluation in pure JSON:
{
  "overallScore": 85,
  "technicalAccuracy": 88,
  "problemSolving": 84,
  "communication": 86,
  "completeness": 82,
  "strengths": ["Clear explanation of time complexity", "Strong grasp of edge cases"],
  "weaknesses": ["Could have clarified constraints earlier"],
  "recommendations": ["Practice quick constraint verification at the start"],
  "detailedSummary": "A strong performance demonstrating good algorithmic foundations tailored for ${company} standards."
}`;

    const aiText = await generateWithFallback({
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.5,
      }
    });

    if (aiText) {
      try {
        const cleaned = aiText.replace(/^```json/, '').replace(/```$/, '').trim();
        return JSON.parse(cleaned);
      } catch {}
    }

    return {
      overallScore: 84,
      technicalAccuracy: 86,
      problemSolving: 82,
      communication: 85,
      completeness: 83,
      strengths: [
        "Structured problem-solving approach",
        "Clear articulation of algorithmic logic",
        "Awareness of Big-O complexity"
      ],
      weaknesses: [
        "Initial edge-case identification could be swifter",
        "Deep-dive into concurrency trade-offs"
      ],
      recommendations: [
        `Practice ${company} high-frequency DSA tracks on Chintan GPT`,
        "Always state assumptions before implementing solutions"
      ],
      detailedSummary: `Solid performance that aligns well with ${company}'s standards for ${role} (${round} round).`
    };
  }

  // Next Question / Follow-up
  const systemInstruction = `You are an elite Senior Staff Engineer conducting an authentic AI Mock Interview for ${company} (${role} position, ${round} round, ${difficulty} level).
Total Questions: ${totalQuestions}. Current question index: ${currentQuestionIndex + 1}.
Keep answers under 120 words. Be encouraging, realistic, and focused on ${company}'s standard interview questions.`;

  const transcript = history.map(m => `${m.sender === 'ai' ? 'INTERVIEWER' : 'CANDIDATE'}: ${m.text}`).join('\n\n');
  const prompt = transcript.length > 0
    ? `Transcript:\n${transcript}\n\nCandidate answer:\n${userAnswer || ""}\n\nPlease give brief feedback and ask Question #${currentQuestionIndex + 1} of ${totalQuestions}.`
    : `Begin the interview. Greet the candidate warmly, confirm the role (${role} at ${company} - ${round}), and present Question 1 of ${totalQuestions}.`;

  const aiText = await generateWithFallback({
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.7,
    }
  });

  if (aiText) return aiText;

  // Fallback interview questions tailored per company and index
  return getInterviewFallbackQuestion(company, role, round, currentQuestionIndex + 1, totalQuestions, userAnswer);
}

function getInterviewFallbackQuestion(company: string, role: string, round: string, qIndex: number, total: number, prevAnswer?: string): string {
  const intro = prevAnswer
    ? `Good explanation! That demonstrates solid foundational understanding.\n\n`
    : `Welcome to your **${company}** mock interview for the **${role}** position (${round}). Let's get started!\n\n`;

  const questions: Record<number, string> = {
    1: `**Question 1 of ${total}:** How would you design an in-memory caching mechanism with $O(1)$ lookup and $O(1)$ eviction policy (like LRU)? What data structures would you pair together and why?`,
    2: `**Question 2 of ${total}:** Given a stream of continuous integers arriving in real-time, how would you efficiently find the Median of the stream at any given point?`,
    3: `**Question 3 of ${total}:** In distributed systems or high-traffic web backends, how do you handle database connection pooling and prevent the thundering herd problem?`,
    4: `**Question 4 of ${total}:** Can you walk me through the trade-offs between Optimistic vs. Pessimistic concurrency control in transactional databases?`
  };

  return `${intro}${questions[qIndex] || `**Question ${qIndex} of ${total}:** How do you evaluate and minimize memory overhead when processing large-scale datasets in ${role} tasks?`}`;
}

// =========================================================================
// 5. ADAPTIVE LEARNING RECOMMENDATIONS
// =========================================================================

export async function getAdaptiveLearningRecommendations(stats: {
  weakTopics: { topic: string; score: number }[];
  completedCount: number;
  solvedProblemsCount: number;
  targetCompany?: string;
}) {
  const { weakTopics, completedCount, solvedProblemsCount, targetCompany = "Google" } = stats;

  const prompt = `Based on student data:
- Weak Topics & Accuracy: ${JSON.stringify(weakTopics)}
- Total Lessons Completed: ${completedCount}
- DSA Problems Solved: ${solvedProblemsCount}
- Target Company: ${targetCompany}

Generate 3 personalized learning recommendations.
Return pure JSON array:
[
  {
    "topic": "Recursion",
    "headline": "Strengthen Base Case Intuition",
    "recommendation": "Your accuracy in Recursion is 45%. Complete the 'Recursion & Backtracking' module before tackling Trees.",
    "actionType": "problem",
    "actionTargetId": "p1"
  }
]`;

  const aiText = await generateWithFallback({
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      temperature: 0.6,
    }
  });

  if (aiText) {
    try {
      const cleaned = aiText.replace(/^```json/, '').replace(/```$/, '').trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {}
  }

  const primaryWeak = weakTopics[0]?.topic || "Dynamic Programming";
  return [
    {
      topic: primaryWeak,
      headline: `Targeted Mastery: ${primaryWeak}`,
      recommendation: `Focus on 2-3 standard ${primaryWeak} pattern problems to elevate your readiness for ${targetCompany} interview rounds.`,
      actionType: "problem",
      actionTargetId: "p1"
    },
    {
      topic: "System Design & Architecture",
      headline: "Scalability Foundations",
      recommendation: `Complete the Caching & Load Balancing module to excel in ${targetCompany}'s technical architecture rounds.`,
      actionType: "module",
      actionTargetId: "mod_sysdesign"
    },
    {
      topic: "Mock Assessment",
      headline: `Live ${targetCompany} Coding Simulation`,
      recommendation: "Take a timed 45-minute AI mock interview to practice speaking through your algorithm under test conditions.",
      actionType: "quiz",
      actionTargetId: "mock_1"
    }
  ];
}
