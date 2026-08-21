import { DSAInterviewProblem } from "./dsaQuestionTypes.js";

export const DSA_BATCH_10_FINAL_CHALLENGE: DSAInterviewProblem[] = [
  {
    id: "Q181",
    questionNumber: 181,
    title: "Trapping Rain Water II (3D Grid Water Simulation)",
    statement:
      "Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.",
    difficulty: "Extreme",
    pattern: "3D Boundary Inward BFS + Min-Heap Priority Queue",
    constraints: [
      "m == heightMap.length",
      "n == heightMap[i].length",
      "1 <= m, n <= 200",
      "0 <= heightMap[i][j] <= 2 * 10^4"
    ],
    expectedTimeComplexity: "O(MN log(MN))",
    expectedSpaceComplexity: "O(MN)",
    examples: [
      {
        input: "heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]",
        output: "4",
        explanation: "After raining, the water trapped inside the grid sum to 4 units (cell (1,1) holds 1, cell (1,2) holds 2, cell (1,4) holds 1)."
      },
      {
        input: "heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]",
        output: "10"
      }
    ],
    explanation:
      "### Boundary-Inward Min-Heap Invariant\nWater can only spill out from the lowest boundary cell surrounding a basin.\n1. Push all exterior boundary cells `(r, c)` into a Min-Heap sorted by `heightMap[r][c]`, marking them visited.\n2. While Min-Heap is not empty:\n   - Pop the cell `(r, c)` with lowest height `h`.\n   - For each 4-directional neighbor `(nr, nc)` not yet visited:\n     - Water trapped at `(nr, nc) = max(0, h - heightMap[nr][nc])`.\n     - Push neighbor with effective boundary height `max(h, heightMap[nr][nc])` into the heap.\n     - Mark `(nr, nc)` as visited.\n3. Return cumulative trapped water volume.",
    interviewInsight:
      "Shrinking the outer boundary inwards with a Min-Heap guarantees that interior cells are evaluated with respect to their actual lowest leakage threshold.",
    cppSolution: `class Solution {
    struct Cell {
        int r, c, h;
        bool operator>(const Cell& o) const { return h > o.h; }
    };

public:
    int trapRainWater(vector<vector<int>>& heightMap) {
        int m = heightMap.size(), n = heightMap[0].size();
        if (m <= 2 || n <= 2) return 0;
        
        priority_queue<Cell, vector<Cell>, greater<Cell>> pq;
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (r == 0 || r == m - 1 || c == 0 || c == n - 1) {
                    pq.push({r, c, heightMap[r][c]});
                    visited[r][c] = true;
                }
            }
        }
        
        int trappedWater = 0;
        int dr[] = {-1, 1, 0, 0};
        int dc[] = {0, 0, -1, 1};
        
        while (!pq.empty()) {
            auto [r, c, h] = pq.top();
            pq.pop();
            
            for (int i = 0; i < 4; ++i) {
                int nr = r + dr[i], nc = c + dc[i];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    trappedWater += max(0, h - heightMap[nr][nc]);
                    pq.push({nr, nc, max(h, heightMap[nr][nc])});
                }
            }
        }
        return trappedWater;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def trapRainWater(self, heightMap: list[list[int]]) -> int:
        if not heightMap or not heightMap[0]:
            return 0
        m, n = len(heightMap), len(heightMap[0])
        if m <= 2 or n <= 2:
            return 0
            
        pq = []
        visited = [[False] * n for _ in range(m)]
        
        for r in range(m):
            for c in range(n):
                if r == 0 or r == m - 1 or c == 0 or c == n - 1:
                    heapq.heappush(pq, (heightMap[r][c], r, c))
                    visited[r][c] = True
                    
        trapped_water = 0
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        
        while pq:
            h, r, c = heapq.heappop(pq)
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
                    visited[nr][nc] = True
                    trapped_water += max(0, h - heightMap[nr][nc])
                    heapq.heappush(pq, (max(h, heightMap[nr][nc]), nr, nc))
                    
        return trapped_water`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q182",
    questionNumber: 182,
    title: "Median of Two Sorted Arrays (Dual Binary Search Partition)",
    statement:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be strictly O(log (m+n)).",
    difficulty: "Extreme",
    pattern: "Binary Search on Array Partitions / Dual Splitting Invariant",
    constraints: [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m <= 1000",
      "0 <= n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    expectedTimeComplexity: "O(log(min(M, N)))",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums1 = [1,3], nums2 = [2]",
        output: "2.00000",
        explanation: "merged array = [1,2,3] and median is 2."
      },
      {
        input: "nums1 = [1,2], nums2 = [3,4]",
        output: "2.50000",
        explanation: "merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    explanation:
      "### Cut Partition Invariant\nAssume $nums1$ is smaller array ($M \\le N$). Partition both arrays into left and right halves:\n- Total left half elements: `half = (M + N + 1) / 2`.\n- Binary search cut $i \\in [0, M]$ in $nums1$. Then cut in $nums2$ is $j = half - i$.\n- Partition values:\n  - $L1 = (i > 0) ? nums1[i-1] : -\\infty$\n  - $R1 = (i < M) ? nums1[i] : +\\infty$\n  - $L2 = (j > 0) ? nums2[j-1] : -\\infty$\n  - $R2 = (j < N) ? nums2[j] : +\\infty$\n- Valid Partition condition: $L1 \\le R2$ and $L2 \\le R1$.\n- If $L1 > R2$: $i$ is too large $\\implies$ binary search left (`high = i - 1`).\n- If $L2 > R1$: $i$ is too small $\\implies$ binary search right (`low = i + 1`).\n- When valid: If $(M + N)$ odd, median is $\\max(L1, L2)$. If even, $(\\max(L1, L2) + \\min(R1, R2)) / 2.0$.",
    interviewInsight:
      "Binary searching the partition index $i$ on the smaller array achieves strict $O(\\log(\\min(M, N)))$ time with zero extra memory.",
    cppSolution: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        
        int m = nums1.size(), n = nums2.size();
        int low = 0, high = m;
        int half = (m + n + 1) / 2;
        
        while (low <= high) {
            int i = low + (high - low) / 2;
            int j = half - i;
            
            int L1 = (i == 0) ? INT_MIN : nums1[i - 1];
            int R1 = (i == m) ? INT_MAX : nums1[i];
            int L2 = (j == 0) ? INT_MIN : nums2[j - 1];
            int R2 = (j == n) ? INT_MAX : nums2[j];
            
            if (L1 <= R2 && L2 <= R1) {
                if ((m + n) % 2 == 1) {
                    return max(L1, L2);
                } else {
                    return (max(L1, L2) + min(R1, R2)) / 2.0;
                }
            } else if (L1 > R2) {
                high = i - 1;
            } else {
                low = i + 1;
            }
        }
        return 0.0;
    }
};`,
    pythonSolution: `class Solution:
    def findMedianSortedArrays(self, nums1: list[int], nums2: list[int]) -> float:
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
            
        m, n = len(nums1), len(nums2)
        low, high = 0, m
        half = (m + n + 1) // 2
        
        while low <= high:
            i = (low + high) // 2
            j = half - i
            
            L1 = float('-inf') if i == 0 else nums1[i - 1]
            R1 = float('inf') if i == m else nums1[i]
            L2 = float('-inf') if j == 0 else nums2[j - 1]
            R2 = float('inf') if j == n else nums2[j]
            
            if L1 <= R2 and L2 <= R1:
                if (m + n) % 2 == 1:
                    return float(max(L1, L2))
                else:
                    return (max(L1, L2) + min(R1, R2)) / 2.0
            elif L1 > R2:
                high = i - 1
            else:
                low = i + 1
                
        return 0.0`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q183",
    questionNumber: 183,
    title: "Sliding Window Median (Dual Multiset Balancing)",
    statement:
      "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nGiven an integer array nums and an integer k, return the median array for each window in the original array.",
    difficulty: "Extreme",
    pattern: "Dual Balanced Multisets / Lazy Heap Deletion",
    constraints: [
      "1 <= k <= nums.length <= 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    expectedTimeComplexity: "O(N log K)",
    expectedSpaceComplexity: "O(K)",
    examples: [
      {
        input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        output: "[1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]",
        explanation: "Window positions:\n[1 3 -1] -> median 1\n[3 -1 -3] -> median -1\n[-1 -3 5] -> median -1\n[-3 5 3] -> median 3\n[5 3 6] -> median 5\n[3 6 7] -> median 6"
      }
    ],
    explanation:
      "### Dual Multi-Set Window Balancing\nMaintain two multiset containers `left` (stores smaller half) and `right` (stores larger half):\n- `left` holds $\\lceil k / 2 \\rceil$ elements, `right` holds $\\lfloor k / 2 \\rfloor$ elements.\n- For each window slide:\n  - Insert incoming element $x$: if $x \\le *left.rbegin()$, insert into `left`, else `right`.\n  - Remove outgoing element $y = nums[i - k]$: find and erase from whichever multiset contains it.\n  - Rebalance sizes: if `left.size() > right.size() + 1`, move largest from `left` to `right`. If `left.size() < right.size()`, move smallest from `right` to `left`.\n  - Compute median: if $k$ odd, `*left.rbegin()`; if $k$ even, `(*left.rbegin() + *right.begin()) / 2.0`.",
    interviewInsight:
      "Multisets in C++ provide self-balancing red-black tree operations with logarithmic point deletion, perfectly suited for dynamic order statistics.",
    cppSolution: `class Solution {
public:
    vector<double> medianSlidingWindow(vector<int>& nums, int k) {
        multiset<long long> left, right;
        vector<double> ans;

        auto balance = [&]() {
            while (left.size() > (k + 1) / 2) {
                auto it = prev(left.end());
                right.insert(*it);
                left.erase(it);
            }
            while (left.size() < (k + 1) / 2 && !right.empty()) {
                auto it = right.begin();
                left.insert(*it);
                right.erase(it);
            }
        };

        for (int i = 0; i < nums.size(); ++i) {
            // Insert
            if (left.empty() || nums[i] <= *left.rbegin()) {
                left.insert(nums[i]);
            } else {
                right.insert(nums[i]);
            }
            balance();

            // Erase out of window
            if (i >= k) {
                long long out = nums[i - k];
                auto it = left.find(out);
                if (it != left.end()) {
                    left.erase(it);
                } else {
                    right.erase(right.find(out));
                }
                balance();
            }

            // Record median
            if (i >= k - 1) {
                if (k % 2 == 1) {
                    ans.push_back(*left.rbegin());
                } else {
                    ans.push_back((*left.rbegin() + *right.begin()) / 2.0);
                }
            }
        }
        return ans;
    }
};`,
    pythonSolution: `import bisect

class Solution:
    def medianSlidingWindow(self, nums: list[int], k: int) -> list[float]:
        window = sorted(nums[:k])
        ans = []
        
        def get_median(w):
            if k % 2 == 1:
                return float(w[k // 2])
            return (w[k // 2 - 1] + w[k // 2]) / 2.0
            
        ans.append(get_median(window))
        
        for i in range(k, len(nums)):
            # remove outgoing
            out_val = nums[i - k]
            idx_remove = bisect.bisect_left(window, out_val)
            window.pop(idx_remove)
            
            # insert incoming
            in_val = nums[i]
            bisect.insort(window, in_val)
            
            ans.append(get_median(window))
            
        return ans`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q184",
    questionNumber: 184,
    title: "Shortest Path to Get All Keys (State-Space BFS with Bitmask)",
    statement:
      "You are given an m x n grid grid where:\n- '.' is an empty cell.\n- '#' is a wall.\n- '@' is the starting point.\n- Lowercase letters 'a'-'f' represent keys.\n- Uppercase letters 'A'-'F' represent locks.\n\nYou start at '@' and can move 4-directionally. You can only pass through a lock if you already hold its corresponding key. Return the minimum number of moves to acquire all keys, or -1 if impossible.",
    difficulty: "Extreme",
    pattern: "State-Space BFS + Bitmask State Tracking",
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 30",
      "1 <= keys <= 6"
    ],
    expectedTimeComplexity: "O(M * N * 2^K)",
    expectedSpaceComplexity: "O(M * N * 2^K)",
    examples: [
      {
        input: "grid = [\"@.a..\",\"###.#\",\"b.A.B\"]",
        output: "8",
        explanation: "Starting at (0,0), move right to collect key 'a', unlock 'A', collect key 'b' in 8 steps."
      }
    ],
    explanation:
      "### Multi-Dimensional State-Space BFS\nStandard 2D visited array is insufficient because visiting a cell with a new key state is distinct.\n1. Find start position `@` and count total distinct keys $K$. Target mask is $(1 \\ll K) - 1$.\n2. Queue stores state tuples `(r, c, keysMask, steps)`.\n3. Maintain 3D boolean array `visited[r][c][keysMask]`.\n4. For neighbor `(nr, nc)`:\n   - If cell is `#`: skip.\n   - If cell is lock `'A'-'F'`: check if bit `lock - 'A'` is set in `keysMask`. If not, cannot pass.\n   - If cell is key `'a'-'f'`: new mask is `newMask = keysMask | (1 << (key - 'a'))`.\n   - If `newMask == targetMask`: return `steps + 1` immediately.\n   - Push `(nr, nc, newMask, steps + 1)` into queue.",
    interviewInsight:
      "Expanding the graph into state dimensions $(R \\times C \\times 2^K)$ allows standard BFS to solve dynamic lock-and-key maze navigation optimally.",
    cppSolution: `class Solution {
public:
    int shortestPathAllKeys(vector<string>& grid) {
        int m = grid.size(), n = grid[0].size();
        int totalKeys = 0, startR = 0, startC = 0;
        
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == '@') {
                    startR = r; startC = c;
                } else if (grid[r][c] >= 'a' && grid[r][c] <= 'f') {
                    totalKeys++;
                }
            }
        }
        
        int targetMask = (1 << totalKeys) - 1;
        queue<tuple<int, int, int, int>> q;
        vector<vector<vector<bool>>> visited(m, vector<vector<bool>>(n, vector<bool>(1 << totalKeys, false)));
        
        q.push({startR, startC, 0, 0});
        visited[startR][startC][0] = true;
        
        int dr[] = {-1, 1, 0, 0};
        int dc[] = {0, 0, -1, 1};
        
        while (!q.empty()) {
            auto [r, c, mask, steps] = q.front();
            q.pop();
            
            if (mask == targetMask) return steps;
            
            for (int i = 0; i < 4; ++i) {
                int nr = r + dr[i], nc = c + dc[i];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) continue;
                char ch = grid[nr][nc];
                if (ch == '#') continue;
                
                // Lock check
                if (ch >= 'A' && ch <= 'F') {
                    if (!(mask & (1 << (ch - 'A')))) continue;
                }
                
                int nextMask = mask;
                if (ch >= 'a' && ch <= 'f') {
                    nextMask |= (1 << (ch - 'a'));
                }
                
                if (!visited[nr][nc][nextMask]) {
                    visited[nr][nc][nextMask] = true;
                    q.push({nr, nc, nextMask, steps + 1});
                }
            }
        }
        return -1;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def shortestPathAllKeys(self, grid: list[str]) -> int:
        m, n = len(grid), len(grid[0])
        total_keys = 0
        start_r = start_c = 0
        
        for r in range(m):
            for c in range(n):
                if grid[r][c] == '@':
                    start_r, start_c = r, c
                elif 'a' <= grid[r][c] <= 'f':
                    total_keys += 1
                    
        target_mask = (1 << total_keys) - 1
        q = deque([(start_r, start_c, 0, 0)])
        visited = set([(start_r, start_c, 0)])
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        
        while q:
            r, c, mask, steps = q.popleft()
            if mask == target_mask:
                return steps
                
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if not (0 <= nr < m and 0 <= nc < n):
                    continue
                ch = grid[nr][nc]
                if ch == '#':
                    continue
                    
                if 'A' <= ch <= 'F':
                    if not (mask & (1 << (ord(ch) - ord('A')))):
                        continue
                        
                next_mask = mask
                if 'a' <= ch <= 'f':
                    next_mask |= (1 << (ord(ch) - ord('a')))
                    
                if (nr, nc, next_mask) not in visited:
                    visited.add((nr, nc, next_mask))
                    q.append((nr, nc, next_mask, steps + 1))
                    
        return -1`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q185",
    questionNumber: 185,
    title: "Maximum Vacation Days (2D State Transition DP)",
    statement:
      "You want to maximize your total vacation days over k weeks. There are n cities (0 to n - 1). You start at city 0 in week 0.\n- flights[i][j] = 1 if you can fly from city i to city j in any week; 0 otherwise.\n- days[i][w] is the number of vacation days you can take in city i during week w.\n\nReturn the maximum vacation days you can take during k weeks.",
    difficulty: "Extreme",
    pattern: "Dynamic Programming / 2D Matrix State Transitions",
    constraints: [
      "n == flights.length == flights[i].length",
      "days.length == n",
      "k == days[i].length",
      "1 <= n, k <= 100",
      "0 <= flights[i][j] <= 1",
      "0 <= days[i][j] <= 7"
    ],
    expectedTimeComplexity: "O(K * N^2)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "flights = [[0,1,1],[1,0,1],[1,1,0]], days = [[1,3,1],[6,0,3],[3,3,3]]",
        output: "12",
        explanation: "Start at city 0. Week 1 fly to city 1 (6 days). Week 2 stay in city 1 (0 days) or fly to city 0 (3 days). Max total is 12."
      }
    ],
    explanation:
      "### DP State Transition Across Weeks\nLet `dp[i]` be the maximum vacation days accumulated ending at city `i` at week `w`.\n- Base case week 0: `dp[0] = 0`, all other `dp[i] = -1` (unreachable).\n- For each week $w = 0 \\dots k - 1$:\n  `next_dp[j] = -1` for all $j$.\n  For each destination city $j$:\n    For each source city $i$ where `dp[i] != -1`:\n      If $i == j$ (stay) or `flights[i][j] == 1` (fly):\n        `next_dp[j] = max(next_dp[j], dp[i] + days[j][w])`.\n  `dp = next_dp`.\n- Return $\\max(dp[0 \\dots n-1])$.",
    interviewInsight:
      "Space-optimized DP rolling arrays reduce memory from $O(K \\cdot N)$ to $O(N)$ with simple $O(N^2)$ inner flight transitions.",
    cppSolution: `class Solution {
public:
    int maxVacationDays(vector<vector<int>>& flights, vector<vector<int>>& days) {
        int n = flights.size(), k = days[0].size();
        vector<int> dp(n, -1);
        dp[0] = 0;
        
        for (int w = 0; w < k; ++w) {
            vector<int> nextDp(n, -1);
            for (int j = 0; j < n; ++j) {
                for (int i = 0; i < n; ++i) {
                    if (dp[i] == -1) continue;
                    if (i == j || flights[i][j] == 1) {
                        nextDp[j] = max(nextDp[j], dp[i] + days[j][w]);
                    }
                }
            }
            dp = move(nextDp);
        }
        return *max_element(dp.begin(), dp.end());
    }
};`,
    pythonSolution: `class Solution:
    def maxVacationDays(self, flights: list[list[int]], days: list[list[int]]) -> int:
        n = len(flights)
        k = len(days[0])
        dp = [-1] * n
        dp[0] = 0
        
        for w in range(k):
            next_dp = [-1] * n
            for j in range(n):
                for i in range(n):
                    if dp[i] == -1:
                        continue
                    if i == j or flights[i][j] == 1:
                        next_dp[j] = max(next_dp[j], dp[i] + days[j][w])
            dp = next_dp
            
        return max(dp)`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q186",
    questionNumber: 186,
    title: "Minimum Cost to Hire K Workers (Ratio Sorting + Max-Heap)",
    statement:
      "There are n workers. You are given two integer arrays quality and wage where quality[i] is the quality of the ith worker and wage[i] is the minimum wage expectation for the ith worker.\n\nWe want to hire exactly k workers to form a paid group. Every worker in the paid group must be paid in ratio to their quality, and every worker must receive at least their minimum wage expectation.\n\nReturn the least amount of money needed to form a paid group satisfying these conditions.",
    difficulty: "Extreme",
    pattern: "Wage/Quality Ratio Sorting + Max-Heap Greedy Quality Pruning",
    constraints: [
      "k <= quality.length <= 10^4",
      "quality.length == wage.length",
      "1 <= quality[i] <= 10^4",
      "1 <= wage[i] <= 10^4"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "quality = [10,20,5], wage = [70,50,30], k = 2",
        output: "105.00000",
        explanation: "Hire worker 0 and worker 2 with ratio 7.0. Cost = 7.0 * (10 + 5) = 105."
      },
      {
        input: "quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3",
        output: "30.66667"
      }
    ],
    explanation:
      "### Wage/Quality Ratio & Total Cost Formulation\nIf worker $i$ sets the group ratio $R = \\text{wage}[i] / \\text{quality}[i]$, total group payment is $R \\times \\sum_{w \\in \\text{Group}} \\text{quality}[w]$.\n- To minimize cost, we need the $k$ smallest quality workers among all workers whose individual wage/quality ratio is $\\le R$.\n1. Create worker pairs `(ratio = wage[i] / quality[i], quality[i])` and sort by `ratio` ascending.\n2. Maintain a Max-Heap of qualities of size $k$ and running sum of qualities `qualitySum`.\n3. Iterate sorted workers:\n   - Add `quality[i]` to `qualitySum` and push to Max-Heap.\n   - If Heap size exceeds $k$: pop largest quality and subtract from `qualitySum`.\n   - If Heap size equals $k$: `minTotalCost = min(minTotalCost, ratio * qualitySum)`.",
    interviewInsight:
      "Sorting by ratio fixes the multiplier $R$, enabling a Max-Heap to greedily maintain the minimum quality sum in $O(N \\log K)$ time.",
    cppSolution: `class Solution {
public:
    double mincostToHireWorkers(vector<int>& quality, vector<int>& wage, int k) {
        int n = quality.size();
        vector<pair<double, int>> workers(n);
        for (int i = 0; i < n; ++i) {
            workers[i] = {(double)wage[i] / quality[i], quality[i]};
        }
        sort(workers.begin(), workers.end());
        
        priority_queue<int> maxHeap;
        double minTotal = 1e18;
        int qualitySum = 0;
        
        for (auto& [ratio, q] : workers) {
            qualitySum += q;
            maxHeap.push(q);
            
            if (maxHeap.size() > k) {
                qualitySum -= maxHeap.top();
                maxHeap.pop();
            }
            
            if (maxHeap.size() == k) {
                minTotal = min(minTotal, ratio * qualitySum);
            }
        }
        return minTotal;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def mincostToHireWorkers(self, quality: list[int], wage: list[int], k: int) -> float:
        workers = sorted([(w / q, q) for q, w in zip(quality, wage)])
        max_heap = []
        quality_sum = 0
        min_total = float('inf')
        
        for ratio, q in workers:
            quality_sum += q
            heapq.heappush(max_heap, -q)
            
            if len(max_heap) > k:
                quality_sum += heapq.heappop(max_heap)
                
            if len(max_heap) == k:
                min_total = min(min_total, ratio * quality_sum)
                
        return min_total`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q187",
    questionNumber: 187,
    title: "Expression Add Operators (Precedence DFS & Backtracking)",
    statement:
      "Given a string num that contains only digits and an integer target, return all possible valid expressions that evaluate to target after inserting binary operators '+', '-', and/or '*' between digits.",
    difficulty: "Extreme",
    pattern: "Backtracking DFS with Operator Precedence & Multiplication Tracking",
    constraints: [
      "1 <= num.length <= 10",
      "num consists of only digits.",
      "-2^31 <= target <= 2^31 - 1"
    ],
    expectedTimeComplexity: "O(4^N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "num = \"123\", target = 6",
        output: "[\"1*2*3\",\"1+2+3\"]"
      },
      {
        input: "num = \"232\", target = 8",
        output: "[\"2*3+2\",\"2+3*2\"]"
      },
      {
        input: "num = \"3456237490\", target = 9191",
        output: "[]"
      }
    ],
    explanation:
      "### Tracking Last Multiplied Operand\nBecause multiplication has higher precedence than addition and subtraction, evaluating expressions on the fly requires tracking:\n- `eval`: the current evaluated total.\n- `prevOp`: the value added/subtracted by the most recent step.\n- When inserting `*` with operand $V$:\n  New evaluation is `eval - prevOp + prevOp * V`.\n  New `prevOp` becomes `prevOp * V`.\n- Leading zeros check: Substring operand `num[idx ... i]` cannot start with `'0'` if length $> 1$.",
    interviewInsight:
      "Reversing previous operations (`eval - prev + prev * curr`) avoids building an AST or full shunting-yard evaluator during DFS.",
    cppSolution: `class Solution {
    vector<string> ans;
    string numStr;
    int targetVal;

    void dfs(int idx, string path, long long eval, long long prevOp) {
        if (idx == numStr.size()) {
            if (eval == targetVal) ans.push_back(path);
            return;
        }
        
        for (int i = idx; i < numStr.size(); ++i) {
            if (i > idx && numStr[idx] == '0') break; // No leading zeroes
            
            string currStr = numStr.substr(idx, i - idx + 1);
            long long currVal = stoll(currStr);
            
            if (idx == 0) {
                dfs(i + 1, currStr, currVal, currVal);
            } else {
                dfs(i + 1, path + "+" + currStr, eval + currVal, currVal);
                dfs(i + 1, path + "-" + currStr, eval - currVal, -currVal);
                dfs(i + 1, path + "*" + currStr, eval - prevOp + prevOp * currVal, prevOp * currVal);
            }
        }
    }

public:
    vector<string> addOperators(string num, int target) {
        numStr = num;
        targetVal = target;
        dfs(0, "", 0, 0);
        return ans;
    }
};`,
    pythonSolution: `class Solution:
    def addOperators(self, num: str, target: int) -> list[str]:
        ans = []
        n = len(num)
        
        def dfs(idx: int, path: str, eval_val: int, prev_op: int):
            if idx == n:
                if eval_val == target:
                    ans.append(path)
                return
                
            for i in range(idx, n):
                if i > idx and num[idx] == '0':
                    break
                curr_str = num[idx:i+1]
                curr_val = int(curr_str)
                
                if idx == 0:
                    dfs(i + 1, curr_str, curr_val, curr_val)
                else:
                    dfs(i + 1, path + "+" + curr_str, eval_val + curr_val, curr_val)
                    dfs(i + 1, path + "-" + curr_str, eval_val - curr_val, -curr_val)
                    dfs(i + 1, path + "*" + curr_str, eval_val - prev_op + prev_op * curr_val, prev_op * curr_val)
                    
        dfs(0, "", 0, 0)
        return ans`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q188",
    questionNumber: 188,
    title: "Freedom Trail (Circular Ring Shortest Path DP)",
    statement:
      "In the video game Fallout 4, the quest \"Road to Freedom\" requires players to reach a metal dial called the \"Freedom Trail Ring\" and use the dial to spell a specific keyword.\n\nGiven a string ring representing the code on the ring and a string key representing the keyword, find the minimum number of steps to spell out all characters in key. Rotating clockwise or counter-clockwise takes 1 step, and pressing the center button to lock the character takes 1 step.",
    difficulty: "Extreme",
    pattern: "Dynamic Programming / Circular Distance Ring Optimization",
    constraints: [
      "1 <= ring.length, key.length <= 100",
      "ring and key consist of lowercase English letters.",
      "It is guaranteed that key could always be spelled by rotating ring."
    ],
    expectedTimeComplexity: "O(K * R^2)",
    expectedSpaceComplexity: "O(R)",
    examples: [
      {
        input: "ring = \"godding\", key = \"gd\"",
        output: "4",
        explanation: "1st char 'g': press (1 step). 2nd char 'd': rotate clockwise 2 steps and press (3 steps). Total = 4."
      }
    ],
    explanation:
      "### Circular Ring DP\nLet `dp[i]` be the minimum rotation cost to align dial at ring index `i` after spelling prefix of `key`.\n- Circular distance between two ring indices $i$ and $j$ of length $R$:\n  `dist(i, j) = min(|i - j|, R - |i - j|)`.\n- Base case: `dp[0] = 0`, all other `dp[i] = \\infty`.\n- For each character $ch$ in `key`:\n  `next_dp = [\\infty] * R`.\n  For each position `pos` where `ring[pos] == ch`:\n    For each previous valid position `prev`:\n      `next_dp[pos] = min(next_dp[pos], dp[prev] + dist(prev, pos))`.\n  `dp = next_dp`.\n- Total minimum steps = $\\min(dp) + \\text{key.length}$ (accounting for button presses).",
    interviewInsight:
      "Circular distance formulas `min(abs(i-j), R - abs(i-j))` collapse angular motion into compact 1D dynamic programming.",
    cppSolution: `class Solution {
public:
    int findRotateSteps(string ring, string key) {
        int r = ring.size(), k = key.size();
        unordered_map<char, vector<int>> posMap;
        for (int i = 0; i < r; ++i) posMap[ring[i]].push_back(i);
        
        vector<int> dp(r, 1e9);
        dp[0] = 0;
        
        for (char ch : key) {
            vector<int> nextDp(r, 1e9);
            for (int pos : posMap[ch]) {
                for (int prev = 0; prev < r; ++prev) {
                    if (dp[prev] >= 1e9) continue;
                    int diff = abs(pos - prev);
                    int step = min(diff, r - diff);
                    nextDp[pos] = min(nextDp[pos], dp[prev] + step);
                }
            }
            dp = move(nextDp);
        }
        return *min_element(dp.begin(), dp.end()) + k;
    }
};`,
    pythonSolution: `from collections import defaultdict

class Solution:
    def findRotateSteps(self, ring: str, key: str) -> int:
        r = len(ring)
        pos_map = defaultdict(list)
        for i, ch in enumerate(ring):
            pos_map[ch].append(i)
            
        dp = [float('inf')] * r
        dp[0] = 0
        
        for ch in key:
            next_dp = [float('inf')] * r
            for pos in pos_map[ch]:
                for prev in range(r):
                    if dp[prev] == float('inf'):
                        continue
                    diff = abs(pos - prev)
                    step = min(diff, r - diff)
                    next_dp[pos] = min(next_dp[pos], dp[prev] + step)
            dp = next_dp
            
        return min(dp) + len(key)`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q189",
    questionNumber: 189,
    title: "Longest Duplicate Substring (Rabin-Karp Rolling Hash + Binary Search)",
    statement:
      "Given a string s, consider all duplicated substrings: substrings of s that occur 2 or more times (the occurrences may overlap).\n\nReturn any duplicated substring that has the longest possible length. If no duplicated substring exists, return \"\".",
    difficulty: "Extreme",
    pattern: "Rabin-Karp Rolling Hash + Binary Search on Length",
    constraints: [
      "2 <= s.length <= 3 * 10^4",
      "s consists of lowercase English letters."
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "s = \"banana\"",
        output: "\"ana\""
      },
      {
        input: "s = \"abcd\"",
        output: "\"\""
      }
    ],
    explanation:
      "### Binary Search on Answer + Rolling Hash Collision Detection\n1. If a duplicate substring of length $L$ exists, duplicate substrings of length $< L$ must also exist (monotonicity).\n2. Binary search length $L \\in [1, N-1]$:\n   - Use Rabin-Karp polynomial rolling hash modulo $M = 2^{63} - 1$ (or double hash) to compute hashes of all windows of length $L$ in $O(N)$ time.\n   - Store hashes in an unordered map / hash set.\n   - If a collision occurs, verify the actual substring to guard against hash collisions.\n   - If valid duplicate found: binary search higher $L$; else binary search lower $L$.",
    interviewInsight:
      "Combining binary search on the string length with $O(1)$ polynomial rolling hash window updates reduces duplicate search from quadratic to $O(N \\log N)$.",
    cppSolution: `class Solution {
    int search(int len, const string& s, int n) {
        long long base = 26, mod = 1000000000000037LL; // Large 64-bit prime
        long long hash = 0, power = 1;
        
        for (int i = 0; i < len; ++i) {
            hash = (hash * base + (s[i] - 'a')) % mod;
            if (i < len - 1) power = (power * base) % mod;
        }
        
        unordered_map<long long, vector<int>> seen;
        seen[hash].push_back(0);
        
        for (int i = len; i < n; ++i) {
            hash = (hash - (s[i - len] - 'a') * power % mod + mod) % mod;
            hash = (hash * base + (s[i] - 'a')) % mod;
            
            if (seen.count(hash)) {
                string cur = s.substr(i - len + 1, len);
                for (int prevIdx : seen[hash]) {
                    if (s.compare(prevIdx, len, cur) == 0) return prevIdx;
                }
            }
            seen[hash].push_back(i - len + 1);
        }
        return -1;
    }

public:
    string longestDupSubstring(string s) {
        int n = s.size();
        int low = 1, high = n - 1;
        int bestStart = -1, bestLen = 0;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int start = search(mid, s, n);
            if (start != -1) {
                bestStart = start;
                bestLen = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        return bestLen > 0 ? s.substr(bestStart, bestLen) : "";
    }
};`,
    pythonSolution: `class Solution:
    def longestDupSubstring(self, s: str) -> str:
        n = len(s)
        nums = [ord(c) - ord('a') for c in s]
        mod = 2**63 - 1
        base = 26

        def check(length: int) -> int:
            h = 0
            power = 1
            for i in range(length):
                h = (h * base + nums[i]) % mod
                if i < length - 1:
                    power = (power * base) % mod
                    
            seen = {h: [0]}
            for i in range(length, n):
                h = (h - nums[i - length] * power) % mod
                h = (h * base + nums[i]) % mod
                if h in seen:
                    curr_sub = s[i - length + 1 : i + 1]
                    for prev_idx in seen[h]:
                        if s[prev_idx : prev_idx + length] == curr_sub:
                            return prev_idx
                    seen[h].append(i - length + 1)
                else:
                    seen[h] = [i - length + 1]
            return -1

        low, high = 1, n - 1
        best_start = -1
        best_len = 0
        
        while low <= high:
            mid = (low + high) // 2
            start = check(mid)
            if start != -1:
                best_start = start
                best_len = mid
                low = mid + 1
            else:
                high = mid - 1
                
        return s[best_start : best_start + best_len] if best_len > 0 else ""`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q190",
    questionNumber: 190,
    title: "Russian Doll Envelopes (2D LIS via Custom Sorting & Patience Sort)",
    statement:
      "You are given a 2D array of integers envelopes where envelopes[i] = [wi, hi] represents the width and the height of an envelope.\n\nOne envelope can fit into another if and only if both the width and height of one envelope are strictly greater than the other envelope's width and height.\n\nReturn the maximum number of envelopes you can Russian doll (i.e., put one inside the other).",
    difficulty: "Extreme",
    pattern: "Custom Dual-Key Sorting + Patience Sorting Binary Search LIS",
    constraints: [
      "1 <= envelopes.length <= 10^5",
      "envelopes[i].length == 2",
      "1 <= wi, hi <= 10^5"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "envelopes = [[5,4],[6,4],[6,7],[2,3]]",
        output: "3",
        explanation: "The maximum number of envelopes you can Russian doll is 3 ([2,3] => [5,4] => [6,7])."
      },
      {
        input: "envelopes = [[1,1],[1,1],[1,1]]",
        output: "1"
      }
    ],
    explanation:
      "### Multi-Key Sort Invariant to Reduce 2D to 1D LIS\n1. Sort envelopes by width $w$ **ascending**, and by height $h$ **descending** whenever widths are equal: `(w1 == w2) ? h1 > h2 : w1 < w2`.\n2. **Why descending on height for same width?** Envelopes with identical widths cannot be nested inside one another. By placing larger heights first, a standard strictly increasing subsequence on height will pick at most one envelope per width!\n3. Extract the array of heights and compute the standard Longest Increasing Subsequence (LIS) in $O(N \\log N)$ time using Patience Sorting / `std::lower_bound`.",
    interviewInsight:
      "Sorting the secondary dimension in descending order eliminates the equality edge-case, reducing a 2D dynamic programming problem to 1D LIS.",
    cppSolution: `class Solution {
public:
    int maxEnvelopes(vector<vector<int>>& envelopes) {
        sort(envelopes.begin(), envelopes.end(), [](const vector<int>& a, const vector<int>& b) {
            if (a[0] == b[0]) return a[1] > b[1]; // Descending height on equal width
            return a[0] < b[0]; // Ascending width
        });
        
        vector<int> lis;
        for (auto& env : envelopes) {
            int h = env[1];
            auto it = lower_bound(lis.begin(), lis.end(), h);
            if (it == lis.end()) {
                lis.push_back(h);
            } else {
                *it = h;
            }
        }
        return lis.size();
    }
};`,
    pythonSolution: `import bisect

class Solution:
    def maxEnvelopes(self, envelopes: list[list[int]]) -> int:
        # Sort width asc, height desc
        envelopes.sort(key=lambda x: (x[0], -x[1]))
        
        lis = []
        for w, h in envelopes:
            idx = bisect.bisect_left(lis, h)
            if idx == len(lis):
                lis.append(h)
            else:
                lis[idx] = h
                
        return len(lis)`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q191",
    questionNumber: 191,
    title: "Strange Printer (Interval Dynamic Programming)",
    statement:
      "There is a strange printer with the following two special properties:\n1. The printer can only print a sequence of the same character each time.\n2. At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.\n\nGiven a string s, return the minimum number of turns the printer needed to print it.",
    difficulty: "Extreme",
    pattern: "Interval / Substring Dynamic Programming",
    constraints: [
      "1 <= s.length <= 100",
      "s consists of lowercase English letters."
    ],
    expectedTimeComplexity: "O(N^3)",
    expectedSpaceComplexity: "O(N^2)",
    examples: [
      {
        input: "s = \"aaabbb\"",
        output: "2",
        explanation: "Print \"aaa\" first then \"bbb\"."
      },
      {
        input: "s = \"aba\"",
        output: "2",
        explanation: "Print \"aaa\" first and then print \"b\" at the second position."
      }
    ],
    explanation:
      "### Interval DP Matching\nLet `dp[i][j]` be the minimum turns to print substring `s[i...j]`.\n- Base case: `dp[i][i] = 1`.\n- Transition: Worst case is printing `s[i]` separately: `dp[i][j] = 1 + dp[i+1][j]`.\n- Optimization: If there exists some index $k \\in [i+1, j]$ where `s[k] == s[i]`, we could have extended the initial print stroke from index $i$ to cover $k$ for free:\n  `dp[i][j] = min(dp[i][j], dp[i][k-1] + dp[k+1][j])`.\n- Order of computation: Iterate substring length $len = 1 \\dots N$.",
    interviewInsight:
      "Recognizing that identical start and split characters can share the same base print sweep allows Interval DP to collapse overlapping stroke costs.",
    cppSolution: `class Solution {
public:
    int strangePrinter(string s) {
        // Deduplicate adjacent identical characters
        string cleanS = "";
        for (char c : s) {
            if (cleanS.empty() || cleanS.back() != c) cleanS.push_back(c);
        }
        int n = cleanS.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        
        for (int i = 0; i < n; ++i) dp[i][i] = 1;
        
        for (int len = 2; len <= n; ++len) {
            for (int i = 0; i <= n - len; ++i) {
                int j = i + len - 1;
                dp[i][j] = 1 + dp[i + 1][j];
                for (int k = i + 1; k <= j; ++k) {
                    if (cleanS[k] == cleanS[i]) {
                        dp[i][j] = min(dp[i][j], dp[i][k - 1] + (k + 1 <= j ? dp[k + 1][j] : 0));
                    }
                }
            }
        }
        return dp[0][n - 1];
    }
};`,
    pythonSolution: `class Solution:
    def strangePrinter(self, s: str) -> int:
        clean_s = []
        for c in s:
            if not clean_s or clean_s[-1] != c:
                clean_s.append(c)
        s = "".join(clean_s)
        n = len(s)
        
        dp = [[0] * n for _ in range(n)]
        for i in range(n):
            dp[i][i] = 1
            
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                dp[i][j] = 1 + dp[i + 1][j]
                for k in range(i + 1, j + 1):
                    if s[k] == s[i]:
                        dp[i][j] = min(dp[i][j], dp[i][k - 1] + (dp[k + 1][j] if k + 1 <= j else 0))
                        
        return dp[0][n - 1]`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q192",
    questionNumber: 192,
    title: "Word Break II (Memoized DFS & Sentence Reconstruction)",
    statement:
      "Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.",
    difficulty: "Extreme",
    pattern: "Memoized DFS with Sentence Backtracking & Suffix Cache",
    constraints: [
      "1 <= s.length <= 20",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 10",
      "s and wordDict[i] consist of lowercase English letters."
    ],
    expectedTimeComplexity: "O(2^N)",
    expectedSpaceComplexity: "O(2^N * N)",
    examples: [
      {
        input: "s = \"catsanddog\", wordDict = [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
        output: "[\"cats and dog\",\"cat sand dog\"]"
      },
      {
        input: "s = \"pineapplepenapple\", wordDict = [\"apple\",\"pen\",\"applepen\",\"pine\",\"pineapple\"]",
        output: "[\"pine apple pen apple\",\"pineapple pen apple\",\"pine applepen apple\"]"
      }
    ],
    explanation:
      "### Suffix Memoization DFS\n1. Store words in an `unordered_set<string>` for $O(1)$ prefix validation.\n2. `dfs(idx)` returns all valid sentence combinations formed by suffix `s[idx ... N-1]`.\n3. Cache results in `memo[idx]`.\n4. For prefix length $L$ from 1 to $N - idx$:\n   - Let `word = s.substr(idx, L)`.\n   - If `word` is in dictionary:\n     - Recursively call `subSentences = dfs(idx + L)`.\n     - For each sentence in `subSentences`: combine `word + \" \" + sentence` and add to current results.\n5. Returns cached sentences for `idx = 0`.",
    interviewInsight:
      "Suffix memoization prevents re-evaluating exponentially overlapping paths for identical suffixes.",
    cppSolution: `class Solution {
    unordered_set<string> dict;
    unordered_map<int, vector<string>> memo;

    vector<string> dfs(const string& s, int idx) {
        if (memo.count(idx)) return memo[idx];
        if (idx == s.size()) return {""};
        
        vector<string> res;
        for (int len = 1; idx + len <= s.size(); ++len) {
            string word = s.substr(idx, len);
            if (dict.count(word)) {
                vector<string> subs = dfs(s, idx + len);
                for (const string& sub : subs) {
                    res.push_back(word + (sub.empty() ? "" : " ") + sub);
                }
            }
        }
        return memo[idx] = res;
    }

public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        dict = unordered_set<string>(wordDict.begin(), wordDict.end());
        return dfs(s, 0);
    }
};`,
    pythonSolution: `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> list[str]:
        words = set(wordDict)
        memo = {}
        
        def dfs(idx: int) -> list[str]:
            if idx in memo:
                return memo[idx]
            if idx == len(s):
                return [""]
                
            res = []
            for end in range(idx + 1, len(s) + 1):
                word = s[idx:end]
                if word in words:
                    sub_sentences = dfs(end)
                    for sub in sub_sentences:
                        res.append(word + ("" if not sub else " " + sub))
                        
            memo[idx] = res
            return res
            
        return dfs(0)`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q193",
    questionNumber: 193,
    title: "Maximum Number of Visible Points (Polar Angles + Two Pointers)",
    statement:
      "You are given an array points, an integer angle, and your location location, where location = [posx, posy] and points[i] = [xi, yi] both represent 2D coordinates on the X-Y plane.\n\nInitially, you are at your location facing in some direction. You can see all points that are within your field of view angle. You can rotate around your location 360 degrees to find the orientation that maximizes the number of visible points.\n\nReturn the maximum number of visible points.",
    difficulty: "Extreme",
    pattern: "Polar Coordinate Conversion (atan2) + Circular Sliding Window",
    constraints: [
      "1 <= points.length <= 10^5",
      "0 <= angle <= 360",
      "location.length == 2",
      "-10^9 <= xi, yi, posx, posy <= 10^9"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "points = [[2,1],[2,2],[3,3]], angle = 90, location = [1,1]",
        output: "3",
        explanation: "All points are visible when facing north-east (45 degrees field)."
      },
      {
        input: "points = [[2,1],[2,2],[3,4],[1,1]], angle = 90, location = [1,1]",
        output: "4",
        explanation: "The point at (1,1) is at the observer location, so it is always visible."
      }
    ],
    explanation:
      "### Polar Angles & Circular Array Unwrapping\n1. If a point is at `location`, increment `samePosCount` (always visible regardless of angle).\n2. For all other points, calculate polar angle $\\theta = \\text{atan2}(y - posy, x - posx)$ in degrees $\\in [-180, 180]$.\n3. Sort angles in ascending order.\n4. **Unwrap the circle**: Duplicate all angles with $+360^\\circ$ appended to the list to handle wrap-around across $360^\\circ \\to 0^\\circ$.\n5. Use a two-pointer sliding window $[left, right]$:\n   - While `angles[right] - angles[left] > angle`, increment `left`.\n   - Window size is `right - left + 1`.\n   - Maintain maximum window size.\n6. Return `maxWindow + samePosCount`.",
    interviewInsight:
      "Duplicating angles shifted by $+360^\\circ$ flattens circular geometric ranges into simple 1D sliding windows.",
    cppSolution: `class Solution {
public:
    int visiblePoints(vector<vector<int>>& points, int angle, vector<int>& location) {
        int samePos = 0;
        vector<double> angles;
        double PI = acos(-1.0);
        
        for (auto& p : points) {
            int dx = p[0] - location[0];
            int dy = p[1] - location[1];
            if (dx == 0 && dy == 0) {
                samePos++;
            } else {
                double deg = atan2(dy, dx) * 180.0 / PI;
                angles.push_back(deg);
            }
        }
        
        sort(angles.begin(), angles.end());
        int m = angles.size();
        for (int i = 0; i < m; ++i) {
            angles.push_back(angles[i] + 360.0);
        }
        
        int maxVisible = 0;
        int left = 0;
        for (int right = 0; right < angles.size(); ++right) {
            while (angles[right] - angles[left] > angle) {
                left++;
            }
            maxVisible = max(maxVisible, right - left + 1);
        }
        return maxVisible + samePos;
    }
};`,
    pythonSolution: `import math

class Solution:
    def visiblePoints(self, points: list[list[int]], angle: int, location: list[int]) -> int:
        same_pos = 0
        angles = []
        
        for x, y in points:
            dx = x - location[0]
            dy = y - location[1]
            if dx == 0 and dy == 0:
                same_pos += 1
            else:
                deg = math.degrees(math.atan2(dy, dx))
                angles.append(deg)
                
        angles.sort()
        angles += [a + 360.0 for a in angles]
        
        max_visible = 0
        left = 0
        for right in range(len(angles)):
            while angles[right] - angles[left] > angle:
                left += 1
            max_visible = max(max_visible, right - left + 1)
            
        return max_visible + same_pos`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q194",
    questionNumber: 194,
    title: "Critical Connections in a Network (Tarjan's Bridge-Finding Algorithm)",
    statement:
      "There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents a connection between servers ai and bi.\n\nA critical connection is a connection that, if removed, will make some servers unable to reach some other server.\n\nReturn all critical connections in the network in any order.",
    difficulty: "Extreme",
    pattern: "Tarjan's Low-Link DFS / Bridge Finding Algorithm",
    constraints: [
      "2 <= n <= 10^5",
      "n - 1 <= connections.length <= 10^5",
      "0 <= ai, bi <= n - 1",
      "ai != bi",
      "There are no repeated connections."
    ],
    expectedTimeComplexity: "O(V + E)",
    expectedSpaceComplexity: "O(V + E)",
    examples: [
      {
        input: "n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]",
        output: "[[1,3]]",
        explanation: "Removing [1,3] isolates server 3 from the rest of the network."
      },
      {
        input: "n = 2, connections = [[0,1]]",
        output: "[[0,1]]"
      }
    ],
    explanation:
      "### Tarjan's Discovery Time and Low-Link Invariant\n1. Maintain `tin[u]` (discovery timestamp) and `low[u]` (lowest discovery time reachable from $u$ via DFS tree and back-edges).\n2. Run DFS from node 0 with timer `timer = 0`:\n   - Set `tin[u] = low[u] = ++timer`.\n   - For each adjacent neighbor $v$:\n     - If $v == parent$: continue.\n     - If $v$ already visited: `low[u] = min(low[u], tin[v])` (back-edge).\n     - If $v$ not visited:\n       - Recurse `dfs(v, u)`.\n       - Pull up low-link: `low[u] = min(low[u], low[v])`.\n       - **Bridge Condition**: If `low[v] > tin[u]`, then edge $(u, v)$ is a critical bridge, because subtree $v$ has zero back-edges to ancestors of $u$.",
    interviewInsight:
      "Tarjan's single-pass DFS identifies all 2-edge-connected components and bridges in linear $O(V + E)$ time.",
    cppSolution: `class Solution {
    int timer;
    vector<int> tin, low;
    vector<vector<int>> bridges;

    void dfs(int u, int p, const vector<vector<int>>& adj) {
        tin[u] = low[u] = ++timer;
        for (int v : adj[u]) {
            if (v == p) continue;
            if (tin[v] != 0) {
                low[u] = min(low[u], tin[v]);
            } else {
                dfs(v, u, adj);
                low[u] = min(low[u], low[v]);
                if (low[v] > tin[u]) {
                    bridges.push_back({u, v});
                }
            }
        }
    }

public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>> adj(n);
        for (auto& c : connections) {
            adj[c[0]].push_back(c[1]);
            adj[c[1]].push_back(c[0]);
        }
        
        timer = 0;
        tin.assign(n, 0);
        low.assign(n, 0);
        
        dfs(0, -1, adj);
        return bridges;
    }
};`,
    pythonSolution: `import sys
sys.setrecursionlimit(200000)

class Solution:
    def criticalConnections(self, n: int, connections: list[list[int]]) -> list[list[int]]:
        adj = [[] for _ in range(n)]
        for u, v in connections:
            adj[u].append(v)
            adj[v].append(u)
            
        tin = [0] * n
        low = [0] * n
        timer = 0
        bridges = []
        
        def dfs(u: int, p: int):
            nonlocal timer
            timer += 1
            tin[u] = low[u] = timer
            
            for v in adj[u]:
                if v == p:
                    continue
                if tin[v] != 0:
                    low[u] = min(low[u], tin[v])
                else:
                    dfs(v, u)
                    low[u] = min(low[u], low[v])
                    if low[v] > tin[u]:
                        bridges.append([u, v])
                        
        dfs(0, -1)
        return bridges`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q195",
    questionNumber: 195,
    title: "Alien Dictionary (Topological Sort + Cycle Detection)",
    statement:
      "There is a new alien language that uses the English alphabet. However, the order of letters is unknown to you.\n\nYou are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language.\n\nReturn a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return \"\". If there are multiple solutions, return any of them.",
    difficulty: "Extreme",
    pattern: "Topological Sort (Kahn's Algorithm) + DAG Cycle Validation",
    constraints: [
      "1 <= words.length <= 100",
      "1 <= words[i].length <= 100",
      "words[i] consists of only lowercase English letters."
    ],
    expectedTimeComplexity: "O(C) where C is total characters in words",
    expectedSpaceComplexity: "O(U + E) where U is unique characters (<= 26)",
    examples: [
      {
        input: "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
        output: "\"wertf\"",
        explanation: "1. 'w' before 'e', 2. 'r' before 't', 3. 't' before 'f' -> Order: \"wertf\"."
      },
      {
        input: "words = [\"z\",\"x\",\"z\"]",
        output: "\"\"",
        explanation: "The order is invalid (cycle between z and x)."
      }
    ],
    explanation:
      "### Character Precedence Graph & Topological Sort\n1. Initialize in-degree map for all unique characters appearing in `words`.\n2. Compare adjacent words `w1` and `w2` pairwise:\n   - Find first mismatch character `w1[k] != w2[k]` $\\implies$ add directed edge `w1[k] -> w2[k]` and increment in-degree of `w2[k]`.\n   - **Prefix Invalidity Trap**: If `w2` is a strict prefix of `w1` (e.g. `\"abc\"` before `\"ab\"`), return `\"\"` immediately (invalid dictionary).\n3. Push all nodes with in-degree 0 into a BFS queue (Kahn's algorithm).\n4. Pop node, append to result string, and decrement in-degrees of neighbors. When in-degree reaches 0, push to queue.\n5. If resulting string length equals total unique characters, return it; else return `\"\"` (cycle detected).",
    interviewInsight:
      "Handling the prefix edge-case (`len(w1) > len(w2)` with identical common prefix) is the #1 differentiator in Alien Dictionary interviews.",
    cppSolution: `class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> inDegree;
        
        for (const string& w : words) {
            for (char c : w) inDegree[c] = 0;
        }
        
        for (int i = 0; i < words.size() - 1; ++i) {
            const string& w1 = words[i];
            const string& w2 = words[i + 1];
            int minLen = min(w1.size(), w2.size());
            bool diffFound = false;
            
            for (int j = 0; j < minLen; ++j) {
                if (w1[j] != w2[j]) {
                    if (!adj[w1[j]].count(w2[j])) {
                        adj[w1[j]].insert(w2[j]);
                        inDegree[w2[j]]++;
                    }
                    diffFound = true;
                    break;
                }
            }
            // Invalid prefix condition: "abc" before "ab"
            if (!diffFound && w1.size() > w2.size()) return "";
        }
        
        queue<char> q;
        for (auto& [ch, deg] : inDegree) {
            if (deg == 0) q.push(ch);
        }
        
        string order = "";
        while (!q.empty()) {
            char u = q.front();
            q.pop();
            order.push_back(u);
            
            for (char v : adj[u]) {
                inDegree[v]--;
                if (inDegree[v] == 0) q.push(v);
            }
        }
        return order.size() == inDegree.size() ? order : "";
    }
};`,
    pythonSolution: `from collections import deque, defaultdict

class Solution:
    def alienOrder(self, words: list[str]) -> str:
        adj = defaultdict(set)
        in_degree = {c: 0 for w in words for c in w}
        
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            min_len = min(len(w1), len(w2))
            diff_found = False
            
            for j in range(min_len):
                if w1[j] != w2[j]:
                    if w2[j] not in adj[w1[j]]:
                        adj[w1[j]].add(w2[j])
                        in_degree[w2[j]] += 1
                    diff_found = True
                    break
                    
            if not diff_found and len(w1) > len(w2):
                return ""
                
        q = deque([c for c, deg in in_degree.items() if deg == 0])
        order = []
        
        while q:
            u = q.popleft()
            order.append(u)
            for v in adj[u]:
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    q.append(v)
                    
        return "".join(order) if len(order) == len(in_degree) else ""`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q196",
    questionNumber: 196,
    title: "Sudoku Solver (Optimized Bitmask Backtracking)",
    statement:
      "Write a program to solve a Sudoku puzzle by filling the empty cells (represented by '.').\n\nA sudoku solution must satisfy all of the following rules:\n1. Each of the digits 1-9 must occur exactly once in each row.\n2. Each of the digits 1-9 must occur exactly once in each column.\n3. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.",
    difficulty: "Extreme",
    pattern: "Exact Cover Backtracking with 9-bit Integer Bitmasks",
    constraints: [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit or '.'.",
      "It is guaranteed that the input board has unique solution."
    ],
    expectedTimeComplexity: "O(9^M) with heavy pruning (M = empty cells)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
        output: "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]"
      }
    ],
    explanation:
      "### 9-Bit Mask Row/Col/Box Acceleration\n1. Maintain three 9-element arrays of 9-bit masks: `rowMask[9]`, `colMask[9]`, `boxMask[9]`.\n   - Digit $d \\in [1, 9]$ corresponds to bit mask `1 << (d - 1)`.\n   - Box index is `(r / 3) * 3 + (c / 3)`.\n2. Collect all empty cells `(r, c)` into an array `emptyCells`.\n3. Backtrack with DFS index `idx`:\n   - Check candidates: `validMask = ~(rowMask[r] | colMask[c] | boxMask[box]) & 0x1FF`.\n   - Iterate set bits of `validMask`:\n     - Place digit, set mask bits, recurse to `idx + 1`.\n     - If branch succeeds, return `true`.\n     - Unset mask bits (backtrack).",
    interviewInsight:
      "Bitwise operations turn valid digit testing from $O(27)$ cell scans into a single bitwise OR and bitwise NOT instruction.",
    cppSolution: `class Solution {
    int rowMask[9] = {0}, colMask[9] = {0}, boxMask[9] = {0};
    vector<pair<int, int>> emptyCells;

    bool solve(int idx, vector<vector<char>>& board) {
        if (idx == emptyCells.size()) return true;
        
        auto [r, c] = emptyCells[idx];
        int box = (r / 3) * 3 + (c / 3);
        int available = (~(rowMask[r] | colMask[c] | boxMask[box])) & 0x1FF;
        
        for (int d = 1; d <= 9; ++d) {
            int bit = 1 << (d - 1);
            if (available & bit) {
                rowMask[r] |= bit;
                colMask[c] |= bit;
                boxMask[box] |= bit;
                board[r][c] = '0' + d;
                
                if (solve(idx + 1, board)) return true;
                
                rowMask[r] &= ~bit;
                colMask[c] &= ~bit;
                boxMask[box] &= ~bit;
                board[r][c] = '.';
            }
        }
        return false;
    }

public:
    void solveSudoku(vector<vector<char>>& board) {
        for (int r = 0; r < 9; ++r) {
            for (int c = 0; c < 9; ++c) {
                if (board[r][c] != '.') {
                    int d = board[r][c] - '0';
                    int bit = 1 << (d - 1);
                    int box = (r / 3) * 3 + (c / 3);
                    rowMask[r] |= bit;
                    colMask[c] |= bit;
                    boxMask[box] |= bit;
                } else {
                    emptyCells.push_back({r, c});
                }
            }
        }
        solve(0, board);
    }
};`,
    pythonSolution: `class Solution:
    def solveSudoku(self, board: list[list[str]]) -> None:
        row_mask = [0] * 9
        col_mask = [0] * 9
        box_mask = [0] * 9
        empty_cells = []
        
        for r in range(9):
            for c in range(9):
                if board[r][c] != '.':
                    d = int(board[r][c])
                    bit = 1 << (d - 1)
                    box = (r // 3) * 3 + (c // 3)
                    row_mask[r] |= bit
                    col_mask[c] |= bit
                    box_mask[box] |= bit
                else:
                    empty_cells.append((r, c))
                    
        def solve(idx: int) -> bool:
            if idx == len(empty_cells):
                return True
            r, c = empty_cells[idx]
            box = (r // 3) * 3 + (c // 3)
            available = (~(row_mask[r] | col_mask[c] | box_mask[box])) & 0x1FF
            
            for d in range(1, 10):
                bit = 1 << (d - 1)
                if available & bit:
                    row_mask[r] |= bit
                    col_mask[c] |= bit
                    box_mask[box] |= bit
                    board[r][c] = str(d)
                    
                    if solve(idx + 1):
                        return True
                        
                    row_mask[r] &= ~bit
                    col_mask[c] &= ~bit
                    box_mask[box] &= ~bit
                    board[r][c] = '.'
            return False
            
        solve(0)`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q197",
    questionNumber: 197,
    title: "Maximum Frequency Stack (O(1) Grouped Frequency Stacks)",
    statement:
      "Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.\n\nImplement the FreqStack class:\n- FreqStack() constructs an empty frequency stack.\n- void push(int val) pushes an integer val onto the top of the stack.\n- int pop() removes and returns the most frequent element in the stack. If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.",
    difficulty: "Extreme",
    pattern: "Frequency Grouped Stacks / Multi-Level Bucket Map",
    constraints: [
      "0 <= val <= 10^9",
      "At most 2 * 10^4 calls will be made to push and pop.",
      "It is guaranteed that there will be at least one element in the stack before calling pop."
    ],
    expectedTimeComplexity: "O(1) per push and pop",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "[\"FreqStack\",\"push\",\"push\",\"push\",\"push\",\"push\",\"push\",\"pop\",\"pop\",\"pop\",\"pop\"], [[],[5],[7],[5],[7],[4],[5],[],[],[],[]]",
        output: "[null,null,null,null,null,null,null,5,7,5,4]",
        explanation: "After pushes, 5 has freq 3, 7 has freq 2, 4 has freq 1. 1st pop -> 5. 2nd pop -> 7 (tie broken by recency). 3rd pop -> 5. 4th pop -> 4."
      }
    ],
    explanation:
      "### Frequency Buckets Architecture\nTo achieve strictly $O(1)$ push and pop:\n- `freq[val]`: tracks current frequency of each value.\n- `group[f]`: standard LIFO stack containing all elements that currently reached frequency $f$.\n- `maxFreq`: integer tracking the current highest frequency among all active elements.\n- **Push(val)**:\n  - $f = ++\\text{freq}[val]$.\n  - `maxFreq = max(maxFreq, f)`.\n  - Push `val` onto stack `group[f]`.\n- **Pop()**:\n  - Pop `val` from `group[maxFreq]`.\n  - Decrement $\\text{freq}[val]$.\n  - If `group[maxFreq]` is now empty, decrement `maxFreq--`.\n  - Return `val`.",
    interviewInsight:
      "Bucketizing elements into individual frequency stacks guarantees both frequency dominance and LIFO recency tie-breaking in strictly $O(1)$ time.",
    cppSolution: `class FreqStack {
    unordered_map<int, int> freq;
    unordered_map<int, vector<int>> group;
    int maxFreq = 0;

public:
    FreqStack() {}
    
    void push(int val) {
        int f = ++freq[val];
        maxFreq = max(maxFreq, f);
        group[f].push_back(val);
    }
    
    int pop() {
        int val = group[maxFreq].back();
        group[maxFreq].pop_back();
        freq[val]--;
        if (group[maxFreq].empty()) {
            maxFreq--;
        }
        return val;
    }
};`,
    pythonSolution: `from collections import defaultdict

class FreqStack:
    def __init__(self):
        self.freq = defaultdict(int)
        self.group = defaultdict(list)
        self.max_freq = 0

    def push(self, val: int) -> None:
        f = self.freq[val] + 1
        self.freq[val] = f
        self.max_freq = max(self.max_freq, f)
        self.group[f].append(val)

    def pop(self) -> int:
        val = self.group[self.max_freq].pop()
        self.freq[val] -= 1
        if not self.group[self.max_freq]:
            self.max_freq -= 1
        return val`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q198",
    questionNumber: 198,
    title: "Regular Expression Matching (2D DP with '.' and '*')",
    statement:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n- '.' Matches any single character.\n- '*' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).",
    difficulty: "Extreme",
    pattern: "2D Dynamic Programming / Lookahead Token Validation",
    constraints: [
      "1 <= s.length <= 20",
      "1 <= p.length <= 20",
      "s contains only lowercase English letters.",
      "p contains only lowercase English letters, '.', and '*'.",
      "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match."
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(M * N)",
    examples: [
      {
        input: "s = \"aa\", p = \"a*\"",
        output: "true",
        explanation: "'*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes \"aa\"."
      },
      {
        input: "s = \"ab\", p = \".*\"",
        output: "true",
        explanation: "\".*\" means \"zero or more (*) of any character (.)\"."
      }
    ],
    explanation:
      "### 2D DP State Formulation\nLet `dp[i][j]` be true if string prefix `s[0...i-1]` matches pattern prefix `p[0...j-1]`.\n- Base case: `dp[0][0] = true`.\n- Patterns matching empty string: For $p[j-1] == '*'$: `dp[0][j] = dp[0][j-2]`.\n- Transitions for `i > 0, j > 0`:\n  1. If `p[j-1] == s[i-1]` or `p[j-1] == '.'`:\n     `dp[i][j] = dp[i-1][j-1]`\n  2. If `p[j-1] == '*'`: Let preceding char be $C = p[j-2]$.\n     - Zero occurrences of $C$: `dp[i][j] = dp[i][j-2]`\n     - One or more occurrences (if $C == s[i-1]$ or $C == '.'$):\n       `dp[i][j] = dp[i][j] | dp[i-1][j]`.",
    interviewInsight:
      "Handling '*' in regular expressions requires evaluating both the 0-match skip case (`j - 2`) and the multi-match consumption case (`i - 1`).",
    cppSolution: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        
        for (int j = 2; j <= n; j += 2) {
            if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];
        }
        
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (p[j - 1] == '.' || p[j - 1] == s[i - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else if (p[j - 1] == '*') {
                    dp[i][j] = dp[i][j - 2]; // 0 occurrences
                    char prevChar = p[j - 2];
                    if (prevChar == '.' || prevChar == s[i - 1]) {
                        dp[i][j] = dp[i][j] || dp[i - 1][j];
                    }
                }
            }
        }
        return dp[m][n];
    }
};`,
    pythonSolution: `class Solution:
    def isMatch(self, s: str, p: str) -> bool:
        m, n = len(s), len(p)
        dp = [[False] * (n + 1) for _ in range(m + 1)]
        dp[0][0] = True
        
        for j in range(2, n + 1, 2):
            if p[j - 1] == '*':
                dp[0][j] = dp[0][j - 2]
                
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if p[j - 1] == '.' or p[j - 1] == s[i - 1]:
                    dp[i][j] = dp[i - 1][j - 1]
                elif p[j - 1] == '*':
                    dp[i][j] = dp[i][j - 2]
                    prev_char = p[j - 2]
                    if prev_char == '.' or prev_char == s[i - 1]:
                        dp[i][j] = dp[i][j] or dp[i - 1][j]
                        
        return dp[m][n]`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q199",
    questionNumber: 199,
    title: "LFU Cache (Least Frequently Used) in O(1) Time",
    statement:
      "Design and implement a data structure for a Least Frequently Used (LFU) cache.\n\nImplement the LFUCache class:\n- LFUCache(int capacity) Initializes the object with the capacity of the data structure.\n- int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.\n- void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.\n\nThe functions get and put must each run in O(1) average time complexity.",
    difficulty: "Extreme",
    pattern: "Hash Map + Doubly Linked Frequency Lists / Multi-Level DLL",
    constraints: [
      "1 <= capacity <= 10^4",
      "0 <= key <= 10^5",
      "0 <= value <= 10^9",
      "At most 2 * 10^5 calls will be made to get and put."
    ],
    expectedTimeComplexity: "O(1) strictly per get and put",
    expectedSpaceComplexity: "O(capacity)",
    examples: [
      {
        input: "[\"LFUCache\",\"put\",\"put\",\"get\",\"put\",\"get\",\"get\",\"put\",\"get\",\"get\",\"get\"], [[2],[1,1],[2,2],[1],[3,3],[2],[3],[4,4],[1],[3],[4]]",
        output: "[null,null,null,1,null,-1,3,null,-1,3,4]"
      }
    ],
    explanation:
      "### Dual Hash Map with Doubly-Linked Lists\n1. `keyMap[key] = Node(key, value, freq)`.\n2. `freqMap[freq] = DoublyLinkedList()` storing all nodes with frequency `freq` in LRU order.\n3. `minFreq` tracks the globally lowest active frequency.\n4. **Get(key)** / **Update Frequency**:\n   - Remove node from `freqMap[node.freq]`.\n   - If `freqMap[minFreq]` is empty, increment `minFreq++`.\n   - Increment `node.freq++` and append to `freqMap[node.freq]`.\n5. **Put(key, val)**:\n   - If key exists: update value and promote frequency.\n   - If key new and capacity full: evict head node from `freqMap[minFreq]`, remove from `keyMap`.\n   - Create new node with `freq = 1`, insert into `keyMap` and `freqMap[1]`, set `minFreq = 1`.",
    interviewInsight:
      "Maintaining distinct Doubly Linked Lists for every frequency tier guarantees constant-time eviction of the oldest element in the lowest frequency bucket.",
    cppSolution: `class LFUCache {
    struct Node {
        int key, val, freq;
        Node *prev = nullptr, *next = nullptr;
        Node(int k, int v) : key(k), val(v), freq(1) {}
    };

    struct DList {
        Node *head, *tail;
        int size = 0;
        DList() {
            head = new Node(-1, -1);
            tail = new Node(-1, -1);
            head->next = tail;
            tail->prev = head;
        }
        void addNode(Node* node) {
            node->next = tail;
            node->prev = tail->prev;
            tail->prev->next = node;
            tail->prev = node;
            size++;
        }
        void removeNode(Node* node) {
            node->prev->next = node->next;
            node->next->prev = node->prev;
            size--;
        }
        Node* popHead() {
            if (size == 0) return nullptr;
            Node* res = head->next;
            removeNode(res);
            return res;
        }
    };

    int cap, minFreq = 0;
    unordered_map<int, Node*> keyMap;
    unordered_map<int, DList*> freqMap;

    void updateFreq(Node* node) {
        int f = node->freq;
        freqMap[f]->removeNode(node);
        if (freqMap[f]->size == 0 && f == minFreq) {
            minFreq++;
        }
        node->freq++;
        if (!freqMap.count(node->freq)) freqMap[node->freq] = new DList();
        freqMap[node->freq]->addNode(node);
    }

public:
    LFUCache(int capacity) : cap(capacity) {}
    
    int get(int key) {
        if (!keyMap.count(key)) return -1;
        Node* node = keyMap[key];
        updateFreq(node);
        return node->val;
    }
    
    void put(int key, int value) {
        if (cap == 0) return;
        if (keyMap.count(key)) {
            Node* node = keyMap[key];
            node->val = value;
            updateFreq(node);
        } else {
            if (keyMap.size() == cap) {
                Node* victim = freqMap[minFreq]->popHead();
                keyMap.erase(victim->key);
                delete victim;
            }
            Node* newNode = new Node(key, value);
            keyMap[key] = newNode;
            minFreq = 1;
            if (!freqMap.count(1)) freqMap[1] = new DList();
            freqMap[1]->addNode(newNode);
        }
    }
};`,
    pythonSolution: `from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.min_freq = 0
        self.key_map = {} # key -> (val, freq)
        self.freq_map = defaultdict(OrderedDict) # freq -> OrderedDict(key: None)

    def _update_freq(self, key: int, val: int):
        _, freq = self.key_map[key]
        del self.freq_map[freq][key]
        if not self.freq_map[freq] and freq == self.min_freq:
            self.min_freq += 1
            
        new_freq = freq + 1
        self.key_map[key] = (val, new_freq)
        self.freq_map[new_freq][key] = None

    def get(self, key: int) -> int:
        if key not in self.key_map:
            return -1
        val, _ = self.key_map[key]
        self._update_freq(key, val)
        return val

    def put(self, key: int, value: int) -> None:
        if self.cap == 0:
            return
            
        if key in self.key_map:
            self._update_freq(key, value)
        else:
            if len(self.key_map) == self.cap:
                # Evict oldest from min_freq
                evict_k, _ = self.freq_map[self.min_freq].popitem(last=False)
                del self.key_map[evict_k]
                
            self.key_map[key] = (value, 1)
            self.freq_map[1][key] = None
            self.min_freq = 1`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  },
  {
    id: "Q200",
    questionNumber: 200,
    title: "The Skyline Problem (Sweep-Line + Multiset Height Tracking)",
    statement:
      "A city's skyline is the outer contour of the silhouette formed by all the buildings in that city when viewed from a distance. Given the locations and heights of all the buildings, return the skyline formed by these buildings collectively.\n\nThe geometric information of each building is given in the array buildings where buildings[i] = [lefti, righti, heighti].\n\nReturn the key points that define the skyline, sorted by x-coordinate.",
    difficulty: "Extreme",
    pattern: "Sweep-Line Algorithm + Live Max-Height Multiset Tracking",
    constraints: [
      "1 <= buildings.length <= 10^4",
      "0 <= lefti < righti <= 2^31 - 1",
      "1 <= heighti <= 2^31 - 1",
      "buildings is sorted by lefti in non-decreasing order."
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]",
        output: "[[2,10],[3,15],[7,12],[12,0],[15,10],[20,8],[24,0]]",
        explanation: "Key points mark each x-coordinate where the maximum skyline height changes."
      },
      {
        input: "buildings = [[0,2,3],[2,5,3]]",
        output: "[[0,3],[5,0]]"
      }
    ],
    explanation:
      "### Sweep-Line Contour Detection\nA key point occurs whenever the maximum building height among active buildings changes at a critical X-coordinate.\n1. Break each building $[L, R, H]$ into two vertical boundary events:\n   - Start of building: $(L, -H)$ (negative height to process taller starts first).\n   - End of building: $(R, +H)$ (positive height to process ends after starts at same coordinate).\n2. Sort all events: first by $X$ ascending, then by height event ascending.\n3. Maintain a `multiset<int>` (or Max-Heap with lazy deletion) storing heights of active buildings, initialized with height 0 (ground level).\n4. Process events in order:\n   - If start event: insert $H$ into multiset.\n   - If end event: erase one instance of $H$ from multiset.\n   - Current maximum height $curMax = *multiset.rbegin()$.\n   - If $curMax \\ne prevMax$: recorded contour change! Push $[X, curMax]$ to skyline output and set $prevMax = curMax$.",
    interviewInsight:
      "Encoding start events with negative height and end events with positive height elegantly resolves all tie-break edge cases in a single `std::sort` pass.",
    cppSolution: `class Solution {
public:
    vector<vector<int>> getSkyline(vector<vector<int>>& buildings) {
        vector<pair<int, int>> events;
        for (auto& b : buildings) {
            events.push_back({b[0], -b[2]}); // Start: negative height
            events.push_back({b[1], b[2]});  // End: positive height
        }
        sort(events.begin(), events.end());
        
        multiset<int> heights = {0};
        vector<vector<int>> skyline;
        int prevMax = 0;
        
        for (auto& [x, h] : events) {
            if (h < 0) {
                heights.insert(-h);
            } else {
                heights.erase(heights.find(h));
            }
            
            int curMax = *heights.rbegin();
            if (curMax != prevMax) {
                skyline.push_back({x, curMax});
                prevMax = curMax;
            }
        }
        return skyline;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def getSkyline(self, buildings: list[list[int]]) -> list[list[int]]:
        events = []
        for l, r, h in buildings:
            events.append((l, -h, r)) # start
            events.append((r, 0, 0))   # end mark
            
        events.sort()
        
        # Max-heap: (-height, right_bound)
        live_heap = [(0, float('inf'))]
        skyline = []
        prev_max = 0
        
        for x, neg_h, r in events:
            if neg_h != 0:
                heapq.heappush(live_heap, (neg_h, r))
                
            # Pop expired buildings
            while live_heap[0][1] <= x:
                heapq.heappop(live_heap)
                
            cur_max = -live_heap[0][0]
            if cur_max != prev_max:
                skyline.append([x, cur_max])
                prev_max = cur_max
                
        return skyline`,
    topic: "Final Extreme Tier-1 Challenge",
    batch: 10
  }
];
