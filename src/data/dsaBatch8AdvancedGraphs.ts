import { DSAInterviewProblem } from "./dsaQuestionTypes.js";

export const DSA_BATCH_8_ADVANCED_GRAPHS: DSAInterviewProblem[] = [
  {
    id: "Q141",
    questionNumber: 141,
    title: "Minimum Genetic Mutation (Unweighted State Space BFS)",
    statement:
      "A gene string can be represented by an 8-character long string, with choices from 'A', 'C', 'G', and 'T'.\n\nSuppose we need to investigate a mutation from a gene string startGene to a gene string endGene where one mutation is defined as one single character changed in the gene string.\n\nFor example, \"AACCGGTT\" --> \"AACCGGTA\" is 1 mutation.\nThere is also a gene bank bank that records all the valid gene mutations. A gene must be in bank to make it a valid gene string.\n\nGiven the two gene strings startGene and endGene and the gene bank bank, return the minimum number of mutations needed to mutate from startGene to endGene. If there is no such a mutation, return -1.\n\nNote that the starting point is not required to be in the bank, but the target mutation must be in the bank.",
    difficulty: "Medium",
    pattern: "Unweighted Graph State Space / Breadth-First Search (BFS)",
    constraints: [
      "startGene.length == 8",
      "endGene.length == 8",
      "0 <= bank.length <= 10",
      "bank[i].length == 8",
      "startGene, endGene, and bank[i] consist of only ['A', 'C', 'G', 'T']."
    ],
    expectedTimeComplexity: "O(B * L * 4) where B = bank size, L = 8",
    expectedSpaceComplexity: "O(B * L)",
    examples: [
      {
        input: "startGene = \"AACCGGTT\", endGene = \"AACCGGTA\", bank = [\"AACCGGTA\"]",
        output: "1"
      },
      {
        input: "startGene = \"AACCGGTT\", endGene = \"AAACGGTA\", bank = [\"AACCGGTA\",\"AACCGCTA\",\"AAACGGTA\"]",
        output: "2"
      }
    ],
    explanation:
      "### State Space Modeling\nEach valid 8-character string in `bank` is a node in an implicit unweighted graph. An undirected edge exists between two gene strings if they differ by exactly 1 character.\n- Store `bank` in a hash set for O(1) membership lookup.\n- If `endGene` is not in the bank set, return -1 immediately.\n- Use a standard BFS queue starting from `(startGene, 0)`.\n- At each step, generate all $8 \\times 3 = 24$ possible single-nucleotide mutations. If a mutation exists in the bank set, remove it from the set (marking as visited) and enqueue `(mutatedGene, steps + 1)`.\n- Since BFS explores level-by-level, the first time `endGene` is dequeued is guaranteed to be the minimum mutation count.",
    interviewInsight:
      "Removing visited nodes from the lookup set in-place avoids maintaining a separate visited hash set, preventing redundant allocations.",
    cppSolution: `class Solution {
public:
    int minMutation(string startGene, string endGene, vector<string>& bank) {
        unordered_set<string> validBank(bank.begin(), bank.end());
        if (!validBank.count(endGene)) return -1;
        
        queue<pair<string, int>> q;
        q.push({startGene, 0});
        char choices[4] = {'A', 'C', 'G', 'T'};
        
        while (!q.empty()) {
            auto [curr, steps] = q.front();
            q.pop();
            
            if (curr == endGene) return steps;
            
            for (int i = 0; i < 8; ++i) {
                char orig = curr[i];
                for (char c : choices) {
                    if (c == orig) continue;
                    curr[i] = c;
                    if (validBank.count(curr)) {
                        validBank.erase(curr);
                        q.push({curr, steps + 1});
                    }
                }
                curr[i] = orig;
            }
        }
        return -1;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: list[str]) -> int:
        valid_bank = set(bank)
        if endGene not in valid_bank:
            return -1
            
        queue = deque([(startGene, 0)])
        choices = ['A', 'C', 'G', 'T']
        
        while queue:
            curr, steps = queue.popleft()
            if curr == endGene:
                return steps
                
            for i in range(8):
                orig = curr[i]
                for c in choices:
                    if c == orig:
                        continue
                    mutated = curr[:i] + c + curr[i+1:]
                    if mutated in valid_bank:
                        valid_bank.remove(mutated)
                        queue.append((mutated, steps + 1))
                        
        return -1`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q142",
    questionNumber: 142,
    title: "01 Matrix (Multi-Source Distance Field)",
    statement:
      "Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.\n\nThe distance between two adjacent cells is 1.",
    difficulty: "Medium",
    pattern: "Multi-Source BFS / Wavefront Distance Propagation",
    constraints: [
      "m == mat.length",
      "n == mat[i].length",
      "1 <= m, n <= 10^4",
      "1 <= m * n <= 10^4",
      "mat[i][j] is either 0 or 1.",
      "There is at least one 0 in mat."
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(M * N)",
    examples: [
      {
        input: "mat = [[0,0,0],[0,1,0],[0,0,0]]",
        output: "[[0,0,0],[0,1,0],[0,0,0]]"
      },
      {
        input: "mat = [[0,0,0],[0,1,0],[1,1,1]]",
        output: "[[0,0,0],[0,1,0],[1,2,1]]"
      }
    ],
    explanation:
      "### Multi-Source BFS vs Single-Source BFS\nIf we ran BFS from every '1' to search for the closest '0', runtime would be $O((M \\times N)^2)$, which times out.\n\n**Optimal Inversion (Multi-Source Wavefront)**:\n1. Initialize `dist[m][n]` matrix with -1 (unvisited).\n2. Enqueue all cells `(r, c)` where `mat[r][c] == 0` simultaneously with distance `0`.\n3. Expand outwards level-by-level in 4 directions. When visiting an adjacent cell `(nr, nc)` with `dist[nr][nc] == -1`:\n   - Set `dist[nr][nc] = dist[r][c] + 1`.\n   - Enqueue `(nr, nc)`.\n4. Every cell is visited at most once, achieving strict $O(M \\times N)$ complexity.",
    interviewInsight:
      "When finding distances from many sources to nearest targets, invert the search by enqueuing all targets simultaneously as multi-sources.",
    cppSolution: `class Solution {
public:
    vector<vector<int>> updateMatrix(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        vector<vector<int>> dist(m, vector<int>(n, -1));
        queue<pair<int, int>> q;
        
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (mat[r][c] == 0) {
                    dist[r][c] = 0;
                    q.push({r, c});
                }
            }
        }
        
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
        return dist;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def updateMatrix(self, mat: list[list[int]]) -> list[list[int]]:
        m, n = len(mat), len(mat[0])
        dist = [[-1] * n for _ in range(m)]
        queue = deque()
        
        for r in range(m):
            for c in range(n):
                if mat[r][c] == 0:
                    dist[r][c] = 0
                    queue.append((r, c))
                    
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        while queue:
            r, c = queue.popleft()
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and dist[nr][nc] == -1:
                    dist[nr][nc] = dist[r][c] + 1
                    queue.append((nr, nc))
                    
        return dist`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q143",
    questionNumber: 143,
    title: "Find Eventual Safe States",
    statement:
      "There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is a directed edge from node i to each node in graph[i].\n\nA node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).\n\nReturn an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.",
    difficulty: "Medium",
    pattern: "Directed Graph Cycle Detection / 3-State Node Coloring",
    constraints: [
      "n == graph.length",
      "1 <= n <= 10^4",
      "0 <= graph[i].length <= n",
      "0 <= graph[i][j] <= n - 1",
      "graph[i] is sorted in a strictly increasing order.",
      "The graph may contain self-loops."
    ],
    expectedTimeComplexity: "O(V + E)",
    expectedSpaceComplexity: "O(V)",
    examples: [
      {
        input: "graph = [[1,2],[2,3],[5],[0],[5],[],[]]",
        output: "[2,4,5,6]",
        explanation: "Nodes 5 and 6 are terminal nodes. Paths from 2 and 4 only lead to 5 or 6. Nodes 0, 1, 3 are part of a cycle or lead to a cycle."
      },
      {
        input: "graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]",
        output: "[4]"
      }
    ],
    explanation:
      "### 3-State DFS Coloring Method\nNodes can be categorized using tri-color states:\n- `State 0 (WHITE)`: Unvisited node.\n- `State 1 (GRAY)`: Currently being processed in the active DFS recursion stack. If we encounter a gray node, a cycle is detected!\n- `State 2 (BLACK)`: Safe node (all outgoing branches confirmed to terminate without cycles).\n\nAlgorithm:\n1. For each node `i` from 0 to `N-1`, execute `dfs(i)`.\n2. In `dfs(u)`:\n   - If `state[u] > 0`, return `state[u] == 2`.\n   - Mark `state[u] = 1` (actively visiting).\n   - For each neighbor `v` of `u`, if `!dfs(v)`, return `false` (leads to a cycle).\n   - Mark `state[u] = 2` (safe) and return `true`.\n3. Collect all nodes with `state[i] == 2`.",
    interviewInsight:
      "This problem can also be solved using reverse-edge Kahn's algorithm (Topological sort from terminal in-degree 0 nodes backwards).",
    cppSolution: `class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> state(n, 0); // 0: unvisited, 1: visiting, 2: safe
        
        function<bool(int)> dfs = [&](int u) -> bool {
            if (state[u] > 0) return state[u] == 2;
            state[u] = 1;
            
            for (int v : graph[u]) {
                if (!dfs(v)) return false;
            }
            state[u] = 2;
            return true;
        };
        
        vector<int> safeNodes;
        for (int i = 0; i < n; ++i) {
            if (dfs(i)) safeNodes.push_back(i);
        }
        return safeNodes;
    }
};`,
    pythonSolution: `class Solution:
    def eventualSafeNodes(self, graph: list[list[int]]) -> list[int]:
        n = len(graph)
        state = [0] * n # 0: unvisited, 1: visiting, 2: safe
        
        def dfs(u: int) -> bool:
            if state[u] > 0:
                return state[u] == 2
            state[u] = 1
            for v in graph[u]:
                if not dfs(v):
                    return False
            state[u] = 2
            return True
            
        return [i for i in range(n) if dfs(i)]`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q144",
    questionNumber: 144,
    title: "Shortest Path in a Grid with Obstacles Elimination",
    statement:
      "You are given an m x n integer matrix grid where each cell is either 0 (empty) or 1 (obstacle). You can move up, down, left, or right from and to an empty cell in one step.\n\nGiven an integer k, return the minimum number of steps to walk from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1) given that you can eliminate at most k obstacles. If it is not possible to find such a walk, return -1.",
    difficulty: "Hard",
    pattern: "3D State BFS / Obstacle Elimination Budgeting",
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 40",
      "1 <= k <= m * n",
      "grid[i][j] is either 0 or 1.",
      "grid[0][0] == grid[m - 1][n - 1] == 0"
    ],
    expectedTimeComplexity: "O(M * N * K)",
    expectedSpaceComplexity: "O(M * N * K)",
    examples: [
      {
        input: "grid = [[0,0,0],[1,1,0],[0,0,0],[0,1,1],[0,0,0]], k = 1",
        output: "6",
        explanation: "The shortest path without eliminating any obstacle is 10. The shortest path with one obstacle elimination at (3,2) is 6."
      },
      {
        input: "grid = [[0,1,1],[1,1,1],[1,0,0]], k = 1",
        output: "-1",
        explanation: "We need to eliminate at least two obstacles to find such a walk."
      }
    ],
    explanation:
      "### Multi-Dimensional State Representation\nInstead of a 2D position `(r, c)`, the state must include the remaining elimination budget: `(r, c, k_remaining)`.\n\n**Manhattan Distance Shortcut**:\nIf $k \\ge m + n - 3$, we have enough elimination budget to walk the direct Manhattan path without detouring around any obstacle: return $m + n - 2$.\n\n**3D State BFS**:\n- Maintain `visited[r][c][k]` or `max_k_visited[r][c]` (tracking the maximum remaining $k$ observed at `(r, c)`).\n- Enqueue `(0, 0, k, steps = 0)`.\n- For neighbor `(nr, nc)`:\n  - New budget: `next_k = curr_k - grid[nr][nc]`.\n  - If `next_k >= 0` and `next_k > max_k_visited[nr][nc]`:\n    Update `max_k_visited[nr][nc] = next_k` and enqueue `(nr, nc, next_k, steps + 1)`.\n- First time reaching `(m-1, n-1)` yields the optimal minimum steps.",
    interviewInsight:
      "State-space pruning by tracking `max_k[r][c]` instead of full boolean array `visited[r][c][k]` saves up to 80% memory and eliminates suboptimal branches immediately.",
    cppSolution: `class Solution {
public:
    int shortestPath(vector<vector<int>>& grid, int k) {
        int m = grid.size(), n = grid[0].size();
        if (k >= m + n - 3) return m + n - 2;
        
        vector<vector<int>> maxK(m, vector<int>(n, -1));
        queue<tuple<int, int, int, int>> q; // r, c, k, steps
        q.push({0, 0, k, 0});
        maxK[0][0] = k;
        
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.empty()) {
            auto [r, c, curK, steps] = q.front();
            q.pop();
            
            if (r == m - 1 && c == n - 1) return steps;
            
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    int nextK = curK - grid[nr][nc];
                    if (nextK >= 0 && nextK > maxK[nr][nc]) {
                        maxK[nr][nc] = nextK;
                        q.push({nr, nc, nextK, steps + 1});
                    }
                }
            }
        }
        return -1;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def shortestPath(self, grid: list[list[int]], k: int) -> int:
        m, n = len(grid), len(grid[0])
        if k >= m + n - 3:
            return m + n - 2
            
        max_k = [[-1] * n for _ in range(m)]
        queue = deque([(0, 0, k, 0)]) # r, c, k, steps
        max_k[0][0] = k
        
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        while queue:
            r, c, cur_k, steps = queue.popleft()
            if r == m - 1 and c == n - 1:
                return steps
                
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    next_k = cur_k - grid[nr][nc]
                    if next_k >= 0 and next_k > max_k[nr][nc]:
                        max_k[nr][nc] = next_k
                        queue.append((nr, nc, next_k, steps + 1))
                        
        return -1`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q145",
    questionNumber: 145,
    title: "Path with Minimum Effort",
    statement:
      "You are a hiker preparing for an upcoming hike. You are given heights, a 2D array of size rows x columns, where heights[row][col] represents the height of cell (row, col). You are situated in the top-left cell, (0, 0), and you hope to travel to the bottom-right cell, (rows-1, columns-1) (i.e., 0-indexed). You can move up, down, left, or right, and you wish to find a route that requires the minimum effort.\n\nA route's effort is the maximum absolute difference in heights between two consecutive cells of the route.\n\nReturn the minimum effort required to travel from the top-left cell to the bottom-right cell.",
    difficulty: "Hard",
    pattern: "Minimax Shortest Path / Modified Dijkstra's Algorithm",
    constraints: [
      "rows == heights.length",
      "columns == heights[i].length",
      "1 <= rows, columns <= 100",
      "1 <= heights[i][j] <= 10^6"
    ],
    expectedTimeComplexity: "O(R * C * log(R * C))",
    expectedSpaceComplexity: "O(R * C)",
    examples: [
      {
        input: "heights = [[1,2,2],[3,8,2],[5,3,5]]",
        output: "2",
        explanation: "The route of [1,2,2,2,5] has a maximum absolute difference of 2 in consecutive cells."
      },
      {
        input: "heights = [[1,2,3],[3,8,4],[5,3,5]]",
        output: "1",
        explanation: "The route of [1,2,3,4,5] has a maximum absolute difference of 1."
      }
    ],
    explanation:
      "### Minimax Dijkstra Formulation\nInstead of accumulating sum of edge weights, the path cost is defined as $\\max(\\text{path\\_effort}, |\\text{height}[nr][nc] - \\text{height}[r][c]|)$.\n- Let `dist[r][c]` be the minimum effort needed to reach cell `(r, c)`.\n- Initialize `dist[r][c] = \\infty`, `dist[0][0] = 0`.\n- Use a min-priority queue storing tuples `(effort, r, c)`.\n- At each step, pop the cell with smallest current effort. If `(r, c) == (rows-1, cols-1)`, return `effort`.\n- For each 4-directional neighbor `(nr, nc)`:\n  `next_effort = max(effort, abs(heights[nr][nc] - heights[r][c]))`.\n  If `next_effort < dist[nr][nc]`:\n  `dist[nr][nc] = next_effort` and push `(next_effort, nr, nc)` into the priority queue.",
    interviewInsight:
      "Dijkstra's greedy property holds whenever the path aggregation operator is monotonic (such as standard addition or minimax bottleneck functions).",
    cppSolution: `class Solution {
public:
    int minimumEffortPath(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<int>> dist(m, vector<int>(n, 1e9));
        dist[0][0] = 0;
        
        using Node = tuple<int, int, int>; // effort, r, c
        priority_queue<Node, vector<Node>, greater<Node>> pq;
        pq.push({0, 0, 0});
        
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        
        while (!pq.empty()) {
            auto [effort, r, c] = pq.top();
            pq.pop();
            
            if (effort > dist[r][c]) continue;
            if (r == m - 1 && c == n - 1) return effort;
            
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n) {
                    int nextEffort = max(effort, abs(heights[nr][nc] - heights[r][c]));
                    if (nextEffort < dist[nr][nc]) {
                        dist[nr][nc] = nextEffort;
                        pq.push({nextEffort, nr, nc});
                    }
                }
            }
        }
        return 0;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def minimumEffortPath(self, heights: list[list[int]]) -> int:
        m, n = len(heights), len(heights[0])
        dist = [[float('inf')] * n for _ in range(m)]
        dist[0][0] = 0
        
        pq = [(0, 0, 0)] # effort, r, c
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        
        while pq:
            effort, r, c = heapq.heappop(pq)
            if effort > dist[r][c]:
                continue
            if r == m - 1 and c == n - 1:
                return effort
                
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n:
                    next_effort = max(effort, abs(heights[nr][nc] - heights[r][c]))
                    if next_effort < dist[nr][nc]:
                        dist[nr][nc] = next_effort
                        heapq.heappush(pq, (next_effort, nr, nc))
                        
        return 0`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q146",
    questionNumber: 146,
    title: "Minimum Cost to Connect All Points (Manhattan MST)",
    statement:
      "You are given an array points representing integer coordinates of some points on a 2D-plane, where points[i] = [xi, yi].\n\nThe cost of connecting two points [xi, yi] and [xj, yj] is the Manhattan distance between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.\n\nReturn the minimum cost to make all points connected. All points are connected if there is exactly one simple path between any two points.",
    difficulty: "Hard",
    pattern: "Minimum Spanning Tree (MST) / Dense Graph Prim's Algorithm",
    constraints: [
      "1 <= points.length <= 1000",
      "-10^6 <= xi, yi <= 10^6",
      "All pairs (xi, yi) are distinct."
    ],
    expectedTimeComplexity: "O(V^2) via Prim's without Heap / O(E log V) with Kruskal",
    expectedSpaceComplexity: "O(V)",
    examples: [
      {
        input: "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]",
        output: "20",
        explanation: "Connect (0,0)-(2,2):4, (2,2)-(5,2):3, (5,2)-(7,0):4, (2,2)-(3,10):9. Total cost = 4 + 3 + 4 + 9 = 20."
      },
      {
        input: "points = [[3,12],[-2,5],[-4,1]]",
        output: "18"
      }
    ],
    explanation:
      "### Prim's Algorithm on Complete (Dense) Graphs\nSince every point can connect to every other point, $E = V(V-1)/2 \\approx 500,000$ edges. On dense complete graphs, array-based Prim's algorithm runs in $O(V^2)$ without priority queue overhead.\n- Maintain `minCost[i]` (minimum distance from MST component to vertex `i`) and `inMST[i]` (boolean flag).\n- Start with `minCost[0] = 0`, all others $\\infty$.\n- For $V$ iterations:\n  1. Find unvisited vertex `u` with smallest `minCost[u]`.\n  2. Mark `inMST[u] = true` and add `minCost[u]` to total cost.\n  3. For all other unvisited vertices `v`, relax `minCost[v] = min(minCost[v], dist(u, v))`.\nTotal time is $O(V^2) \\approx 10^6$ operations, far faster than sorting all $E$ edges.",
    interviewInsight:
      "Always analyze graph density: sparse graphs ($E \\ll V^2$) favor Kruskal's with DSU ($O(E \\log V)$), whereas complete dense graphs ($E \\approx V^2$) favor Prim's without heap ($O(V^2)$).",
    cppSolution: `class Solution {
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size();
        vector<int> minCost(n, 1e9);
        vector<bool> inMST(n, false);
        minCost[0] = 0;
        int totalCost = 0;
        
        for (int i = 0; i < n; ++i) {
            int u = -1;
            for (int j = 0; j < n; ++j) {
                if (!inMST[j] && (u == -1 || minCost[j] < minCost[u])) {
                    u = j;
                }
            }
            
            inMST[u] = true;
            totalCost += minCost[u];
            
            for (int v = 0; v < n; ++v) {
                if (!inMST[v]) {
                    int dist = abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1]);
                    minCost[v] = min(minCost[v], dist);
                }
            }
        }
        return totalCost;
    }
};`,
    pythonSolution: `class Solution:
    def minCostConnectPoints(self, points: list[list[int]]) -> int:
        n = len(points)
        min_cost = [float('inf')] * n
        in_mst = [False] * n
        min_cost[0] = 0
        total_cost = 0
        
        for _ in range(n):
            u = -1
            for j in range(n):
                if not in_mst[j] and (u == -1 or min_cost[j] < min_cost[u]):
                    u = j
                    
            in_mst[u] = True
            total_cost += min_cost[u]
            
            ux, uy = points[u]
            for v in range(n):
                if not in_mst[v]:
                    dist = abs(ux - points[v][0]) + abs(uy - points[v][1])
                    if dist < min_cost[v]:
                        min_cost[v] = dist
                        
        return total_cost`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q147",
    questionNumber: 147,
    title: "Swim in Rising Water",
    statement:
      "You are given an n x n integer matrix grid where each term grid[i][j] represents the elevation at that point (i, j).\n\nThe rain starts to fall. At time t, the depth of the water everywhere is t. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most t. You can swim infinite distances in zero time.\n\nReturn the least time until you can reach the bottom right square (n - 1, n - 1) if you start at the top left square (0, 0).",
    difficulty: "Hard",
    pattern: "Modified Dijkstra / Priority Queue Bottleneck Search",
    constraints: [
      "n == grid.length",
      "n == grid[i].length",
      "1 <= n <= 50",
      "0 <= grid[i][j] < n^2",
      "Each value grid[i][j] is unique."
    ],
    expectedTimeComplexity: "O(N^2 log N)",
    expectedSpaceComplexity: "O(N^2)",
    examples: [
      {
        input: "grid = [[0,2],[1,3]]",
        output: "3",
        explanation: "At time 0, you are at (0, 0). You cannot move to any other cell because their heights are > 0. At time 3, water height is 3, allowing swimming to (1,1)."
      },
      {
        input: "grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]",
        output: "16"
      }
    ],
    explanation:
      "### Dijkstra vs Binary Search on Answer\nTwo clean optimal approaches exist:\n1. **Modified Dijkstra (Priority Queue)**:\n   Let `t` be the maximum elevation encountered along a path. At cell `(r, c)`, expanding to `(nr, nc)` requires water level `next_t = max(t, grid[nr][nc])`. Using a min-heap, we greedily pop the lowest elevation frontier.\n2. **Binary Search on Time $T \\in [0, N^2 - 1]$**:\n   Check if target `(n-1, n-1)` is reachable from `(0, 0)` via BFS considering only cells with `grid[r][c] <= T`.",
    interviewInsight:
      "Whenever the problem asks for the minimum maximum along a path ('minimax'), both Dijkstra and Binary Search on the answer are optimal interchangeable templates.",
    cppSolution: `class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<bool>> visited(n, vector<bool>(n, false));
        
        using Node = tuple<int, int, int>; // max_t, r, c
        priority_queue<Node, vector<Node>, greater<Node>> pq;
        pq.push({grid[0][0], 0, 0});
        visited[0][0] = true;
        
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        
        while (!pq.empty()) {
            auto [t, r, c] = pq.top();
            pq.pop();
            
            if (r == n - 1 && c == n - 1) return t;
            
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    pq.push({max(t, grid[nr][nc]), nr, nc});
                }
            }
        }
        return -1;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def swimInWater(self, grid: list[list[int]]) -> int:
        n = len(grid)
        visited = [[False] * n for _ in range(n)]
        visited[0][0] = True
        
        pq = [(grid[0][0], 0, 0)] # t, r, c
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        
        while pq:
            t, r, c = heapq.heappop(pq)
            if r == n - 1 and c == n - 1:
                return t
                
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and not visited[nr][nc]:
                    visited[nr][nc] = True
                    heapq.heappush(pq, (max(t, grid[nr][nc]), nr, nc))
                    
        return -1`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q148",
    questionNumber: 148,
    title: "Connecting Cities with Minimum Cost",
    statement:
      "There are n cities labeled from 1 to n. You are given the integer n and an array connections where connections[i] = [xi, yi, costi] indicates that the cost of connecting city xi and city yi (bidirectional connection) is costi.\n\nReturn the minimum cost to connect all the n cities such that there is at least one path between each pair of cities. If it is impossible to connect all the n cities, return -1,",
    difficulty: "Hard",
    pattern: "Kruskal's Algorithm / Disjoint Set Union (DSU) by Rank",
    constraints: [
      "1 <= n <= 10^4",
      "1 <= connections.length <= 10^4",
      "connections[i].length == 3",
      "1 <= xi, yi <= n",
      "xi != yi",
      "0 <= costi <= 10^5"
    ],
    expectedTimeComplexity: "O(E log E) where E = connections.length",
    expectedSpaceComplexity: "O(V)",
    examples: [
      {
        input: "n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]",
        output: "6",
        explanation: "Choosing 2-3 (cost 1) and 1-2 (cost 5) connects all 3 cities with total cost 6."
      },
      {
        input: "n = 4, connections = [[1,2,3],[3,4,4]]",
        output: "-1",
        explanation: "There is no way to connect all cities together."
      }
    ],
    explanation:
      "### Kruskal's Algorithm with DSU\n1. Sort all edges in ascending order of `cost`.\n2. Initialize Disjoint Set Union (DSU) with $n$ distinct components.\n3. Iterate through sorted edges `(u, v, cost)`:\n   - Find representatives `rootU = find(u)` and `rootV = find(v)`.\n   - If `rootU != rootV`, union the two sets, accumulate `totalCost += cost`, and decrement `componentsCount`.\n   - If `componentsCount == 1`, return `totalCost` early.\n4. After examining all edges, if `componentsCount > 1`, return -1 (graph is disconnected).",
    interviewInsight:
      "Path compression with union by rank guarantees near $O(1)$ amortized operations per query ($O(\\alpha(V))$ via Inverse Ackermann function).",
    cppSolution: `class Solution {
public:
    int minimumCost(int n, vector<vector<int>>& connections) {
        sort(connections.begin(), connections.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[2] < b[2];
        });
        
        vector<int> parent(n + 1), rank(n + 1, 0);
        for (int i = 1; i <= n; ++i) parent[i] = i;
        
        function<int(int)> findRoot = [&](int u) -> int {
            return parent[u] == u ? u : (parent[u] = findRoot(parent[u]));
        };
        
        auto unite = [&](int u, int v) -> bool {
            int rootU = findRoot(u), rootV = findRoot(v);
            if (rootU == rootV) return false;
            if (rank[rootU] < rank[rootV]) swap(rootU, rootV);
            parent[rootV] = rootU;
            if (rank[rootU] == rank[rootV]) rank[rootU]++;
            return true;
        };
        
        int totalCost = 0;
        int edgesCount = 0;
        
        for (auto& edge : connections) {
            if (unite(edge[0], edge[1])) {
                totalCost += edge[2];
                edgesCount++;
                if (edgesCount == n - 1) return totalCost;
            }
        }
        return -1;
    }
};`,
    pythonSolution: `class Solution:
    def minimumCost(self, n: int, connections: list[list[int]]) -> int:
        connections.sort(key=lambda x: x[2])
        parent = list(range(n + 1))
        rank = [0] * (n + 1)
        
        def find(u: int) -> int:
            if parent[u] != u:
                parent[u] = find(parent[u])
            return parent[u]
            
        def union(u: int, v: int) -> bool:
            ru, rv = find(u), find(v)
            if ru == rv:
                return False
            if rank[ru] < rank[rv]:
                ru, rv = rv, ru
            parent[rv] = ru
            if rank[ru] == rank[rv]:
                rank[ru] += 1
            return True
            
        total_cost = 0
        edges_count = 0
        
        for u, v, cost in connections:
            if union(u, v):
                total_cost += cost
                edges_count += 1
                if edges_count == n - 1:
                    return total_cost
                    
        return -1`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q149",
    questionNumber: 149,
    title: "Number of Operations to Make Network Connected",
    statement:
      "There are n computers numbered from 0 to n - 1 connected by ethernet cables connections forming a network where connections[i] = [ai, bi] represents a connection between computers ai and bi. Any computer can reach any other computer directly or indirectly through the network.\n\nYou are given an initial computer network connections. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected.\n\nReturn the minimum number of times you need to do this in order to make all the computers connected. If it is not possible, return -1.",
    difficulty: "Hard",
    pattern: "Disjoint Set Union (DSU) / Graph Invariant Analysis",
    constraints: [
      "1 <= n <= 10^5",
      "1 <= connections.length <= min(n * (n - 1) / 2, 10^5)",
      "connections[i].length == 2",
      "0 <= ai, bi <= n - 1",
      "ai != bi",
      "There are no repeated connections."
    ],
    expectedTimeComplexity: "O(V + E * alpha(V))",
    expectedSpaceComplexity: "O(V)",
    examples: [
      {
        input: "n = 4, connections = [[0,1],[0,2],[1,2]]",
        output: "1",
        explanation: "Remove cable between [1,2] and place between [1,3]."
      },
      {
        input: "n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]",
        output: "2"
      },
      {
        input: "n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]",
        output: "-1",
        explanation: "Total cables = 4. To connect 6 nodes requires at least 5 cables, so impossible."
      }
    ],
    explanation:
      "### Graph Invariant & Redundant Edge Counting\nTo connect $N$ nodes into a single connected component, we strictly require at least $N - 1$ total edges.\n- If `connections.length < n - 1`, return -1 immediately.\n- Use DSU to count the number of connected components $C$.\n- Each union of two previously separate components reduces $C$ by 1.\n- To join $C$ independent components into 1 single component, we need exactly $C - 1$ operations.\n- Since `connections.length >= n - 1`, there are guaranteed to be enough redundant cycles to provide these $C - 1$ cables!",
    interviewInsight:
      "Recognizing global topological invariants (like $E \\ge V - 1$) simplifies complex graph modification problems into basic component counting.",
    cppSolution: `class Solution {
public:
    int makeConnected(int n, vector<vector<int>>& connections) {
        if ((int)connections.size() < n - 1) return -1;
        
        vector<int> parent(n);
        for (int i = 0; i < n; ++i) parent[i] = i;
        
        function<int(int)> findRoot = [&](int u) -> int {
            return parent[u] == u ? u : (parent[u] = findRoot(parent[u]));
        };
        
        int components = n;
        for (auto& edge : connections) {
            int ru = findRoot(edge[0]), rv = findRoot(edge[1]);
            if (ru != rv) {
                parent[ru] = rv;
                components--;
            }
        }
        return components - 1;
    }
};`,
    pythonSolution: `class Solution:
    def makeConnected(self, n: int, connections: list[list[int]]) -> int:
        if len(connections) < n - 1:
            return -1
            
        parent = list(range(n))
        
        def find(u: int) -> int:
            if parent[u] != u:
                parent[u] = find(parent[u])
            return parent[u]
            
        components = n
        for u, v in connections:
            ru, rv = find(u), find(v)
            if ru != rv:
                parent[ru] = rv
                components -= 1
                
        return components - 1`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q150",
    questionNumber: 150,
    title: "Evaluate Division (Weighted DSU / Graph Query)",
    statement:
      "You are given an array of variable pairs equations and an array of real numbers values, where equations[i] = [Ai, Bi] and values[i] represent the equation Ai / Bi = values[i]. Each Ai or Bi is a string representing a single variable.\n\nYou are also given some queries, where queries[j] = [Cj, Dj] represents the jth query where you must find the answer for Cj / Dj = ?.\n\nReturn the answers to all queries. If a single answer cannot be determined, return -1.0.",
    difficulty: "Hard",
    pattern: "Weighted Directed Graph / DSU with Multiplicative Weights",
    constraints: [
      "1 <= equations.length <= 20",
      "equations[i].length == 2",
      "1 <= Ai.length, Bi.length <= 5",
      "values.length == equations.length",
      "0.0 < values[i] <= 20.0",
      "1 <= queries.length <= 20",
      "queries[j].length == 2",
      "1 <= Cj.length, Dj.length <= 5",
      "Ai, Bi, Cj, Dj consist of lower case English letters and digits."
    ],
    expectedTimeComplexity: "O(E + Q * V) via DFS / O((E + Q) * alpha(V)) via Weighted DSU",
    expectedSpaceComplexity: "O(V + E)",
    examples: [
      {
        input: "equations = [[\"a\",\"b\"],[\"b\",\"c\"]], values = [2.0,3.0], queries = [[\"a\",\"c\"],[\"b\",\"a\"],[\"a\",\"e\"],[\"a\",\"a\"],[\"x\",\"x\"]]",
        output: "[6.00000,0.50000,-1.00000,1.00000,-1.00000]"
      }
    ],
    explanation:
      "### Weighted DSU with Path Compression\nLet each variable be a node. In a weighted DSU:\n`parent[u]` stores parent representative, and `weight[u]` stores $u / parent[u]$.\n- During `findRoot(u)`:\n  `weight[u] *= weight[original_parent]`\n  `parent[u] = root`.\n- In `unite(u, v, val)` ($u / v = val$):\n  `rootU = find(u)`, `rootV = find(v)`.\n  `parent[rootU] = rootV`\n  `weight[rootU] = (val * weight[v]) / weight[u]`.\n- For each query `(C, D)`:\n  If $C$ or $D$ unknown, or `findRoot(C) != findRoot(D)` -> return `-1.0`.\n  Else return `weight[C] / weight[D]`.",
    interviewInsight:
      "Weighted DSU allows exact ratio evaluations across long variable chains in $O(\\alpha(V))$ amortized query time.",
    cppSolution: `class Solution {
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        unordered_map<string, string> parent;
        unordered_map<string, double> weight; // u / parent[u]
        
        function<string(const string&)> findRoot = [&](const string& u) -> string {
            if (parent[u] == u) return u;
            string origParent = parent[u];
            string root = findRoot(origParent);
            weight[u] *= weight[origParent];
            return parent[u] = root;
        };
        
        auto unite = [&](const string& u, const string& v, double val) {
            if (!parent.count(u)) { parent[u] = u; weight[u] = 1.0; }
            if (!parent.count(v)) { parent[v] = v; weight[v] = 1.0; }
            
            string ru = findRoot(u), rv = findRoot(v);
            if (ru != rv) {
                parent[ru] = rv;
                weight[ru] = (val * weight[v]) / weight[u];
            }
        };
        
        for (size_t i = 0; i < equations.size(); ++i) {
            unite(equations[i][0], equations[i][1], values[i]);
        }
        
        vector<double> results;
        for (auto& q : queries) {
            string c = q[0], d = q[1];
            if (!parent.count(c) || !parent.count(d)) {
                results.push_back(-1.0);
            } else {
                string rc = findRoot(c), rd = findRoot(d);
                if (rc != rd) {
                    results.push_back(-1.0);
                } else {
                    results.push_back(weight[c] / weight[d]);
                }
            }
        }
        return results;
    }
};`,
    pythonSolution: `class Solution:
    def calcEquation(self, equations: list[list[str]], values: list[float], queries: list[list[str]]) -> list[float]:
        parent = {}
        weight = {}
        
        def find(u: str) -> str:
            if parent[u] != u:
                orig_parent = parent[u]
                root = find(orig_parent)
                weight[u] *= weight[orig_parent]
                parent[u] = root
            return parent[u]
            
        def union(u: str, v: str, val: float):
            if u not in parent: parent[u] = u; weight[u] = 1.0
            if v not in parent: parent[v] = v; weight[v] = 1.0
            
            ru, rv = find(u), find(v)
            if ru != rv:
                parent[ru] = rv
                weight[ru] = (val * weight[v]) / weight[u]
                
        for (u, v), val in zip(equations, values):
            union(u, v, val)
            
        results = []
        for c, d in queries:
            if c not in parent or d not in parent:
                results.append(-1.0)
            else:
                rc, rd = find(c), find(d)
                if rc != rd:
                    results.append(-1.0)
                else:
                    results.append(weight[c] / weight[d])
                    
        return results`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q151",
    questionNumber: 151,
    title: "Shortest Path with Alternating Colors",
    statement:
      "You are given an integer n, the number of nodes in a directed graph where the nodes are labeled from 0 to n - 1. Each edge is red or blue in this graph, and there could be self-edges and parallel edges.\n\nYou are given two 2D arrays redEdges and blueEdges where:\n- redEdges[i] = [ai, bi] indicates that there is a directed red edge from node ai to node bi\n- blueEdges[j] = [uj, vj] indicates that there is a directed blue edge from node uj to node vj\n\nReturn an array answer of length n, where each answer[x] is the length of the shortest path from node 0 to node x such that the edge colors alternate along the path, or -1 if such a path does not exist.",
    difficulty: "Hard",
    pattern: "Layered State Space BFS / Multi-State Graph Modeling",
    constraints: [
      "1 <= n <= 100",
      "0 <= redEdges.length, blueEdges.length <= 400",
      "redEdges[i].length == blueEdges[j].length == 2",
      "0 <= ai, bi, uj, vj < n"
    ],
    expectedTimeComplexity: "O(V + E)",
    expectedSpaceComplexity: "O(V + E)",
    examples: [
      {
        input: "n = 3, redEdges = [[0,1],[1,2]], blueEdges = []",
        output: "[0,1,-1]",
        explanation: "Path 0->1 is length 1. Node 2 cannot be reached with alternating colors because there are no blue edges."
      },
      {
        input: "n = 3, redEdges = [[0,1]], blueEdges = [[2,1]]",
        output: "[0,1,-1]"
      }
    ],
    explanation:
      "### State Duplication Technique\nBecause color state matters, each vertex $u$ is split into two states:\n- `(u, RED)`: reached node $u$ via a RED edge (next edge MUST be BLUE).\n- `(u, BLUE)`: reached node $u$ via a BLUE edge (next edge MUST be RED).\n\nBFS Traversal:\n1. Maintain `dist[n][2]` initialized to -1.\n2. Enqueue both starting states `(0, RED, dist = 0)` and `(0, BLUE, dist = 0)`.\n3. When expanding `(u, last_color)`:\n   - If `last_color == RED`, explore only BLUE outgoing edges `(u -> v)`. If `dist[v][BLUE] == -1`, set `dist[v][BLUE] = dist[u][RED] + 1` and enqueue `(v, BLUE)`.\n   - If `last_color == BLUE`, explore only RED outgoing edges `(u -> v)`.\n4. For each node $i$, `answer[i] = min(valid dist[i][RED], dist[i][BLUE])`.",
    interviewInsight:
      "Whenever graph traversal rules constrain consecutive edges or transitions, duplicate each vertex into `(node, transition_state)` in the state graph.",
    cppSolution: `class Solution {
public:
    vector<int> shortestAlternatingPaths(int n, vector<vector<int>>& redEdges, vector<vector<int>>& blueEdges) {
        vector<vector<int>> redAdj(n), blueAdj(n);
        for (auto& e : redEdges) redAdj[e[0]].push_back(e[1]);
        for (auto& e : blueEdges) blueAdj[e[0]].push_back(e[1]);
        
        vector<vector<int>> dist(n, vector<int>(2, -1));
        queue<pair<int, int>> q; // node, lastColor (0: RED, 1: BLUE)
        
        q.push({0, 0}); dist[0][0] = 0;
        q.push({0, 1}); dist[0][1] = 0;
        
        while (!q.empty()) {
            auto [u, color] = q.front();
            q.pop();
            
            int nextColor = 1 - color;
            auto& adj = (nextColor == 1) ? blueAdj[u] : redAdj[u];
            
            for (int v : adj) {
                if (dist[v][nextColor] == -1) {
                    dist[v][nextColor] = dist[u][color] + 1;
                    q.push({v, nextColor});
                }
            }
        }
        
        vector<int> ans(n);
        for (int i = 0; i < n; ++i) {
            int d0 = dist[i][0], d1 = dist[i][1];
            if (d0 == -1 && d1 == -1) ans[i] = -1;
            else if (d0 == -1) ans[i] = d1;
            else if (d1 == -1) ans[i] = d0;
            else ans[i] = min(d0, d1);
        }
        return ans;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def shortestAlternatingPaths(self, n: int, redEdges: list[list[int]], blueEdges: list[list[int]]) -> list[int]:
        red_adj = [[] for _ in range(n)]
        blue_adj = [[] for _ in range(n)]
        for u, v in redEdges: red_adj[u].append(v)
        for u, v in blueEdges: blue_adj[u].append(v)
        
        dist = [[-1, -1] for _ in range(n)] # [dist_via_red, dist_via_blue]
        queue = deque([(0, 0), (0, 1)]) # (node, last_color: 0=red, 1=blue)
        dist[0][0] = 0
        dist[0][1] = 0
        
        while queue:
            u, color = queue.popleft()
            next_color = 1 - color
            adj = blue_adj[u] if next_color == 1 else red_adj[u]
            
            for v in adj:
                if dist[v][next_color] == -1:
                    dist[v][next_color] = dist[u][color] + 1
                    queue.append((v, next_color))
                    
        ans = []
        for d0, d1 in dist:
            if d0 == -1 and d1 == -1: ans.append(-1)
            elif d0 == -1: ans.append(d1)
            elif d1 == -1: ans.append(d0)
            else: ans.append(min(d0, d1))
        return ans`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q152",
    questionNumber: 152,
    title: "Making A Large Island",
    statement:
      "You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.\n\nReturn the size of the largest island in grid after applying this operation.\n\nAn island is a 4-directionally connected group of 1s.",
    difficulty: "Hard",
    pattern: "Connected Components Coloring & Boundary Neighborhood Merging",
    constraints: [
      "n == grid.length",
      "n == grid[i].length",
      "1 <= n <= 500",
      "grid[i][j] is either 0 or 1."
    ],
    expectedTimeComplexity: "O(N^2)",
    expectedSpaceComplexity: "O(N^2)",
    examples: [
      {
        input: "grid = [[1,0],[0,1]]",
        output: "3",
        explanation: "Change one 0 to 1 and connect two 1s, then we get an island with area = 3."
      },
      {
        input: "grid = [[1,1],[1,0]]",
        output: "4",
        explanation: "Change the 0 to 1 and make the island bigger, area = 4."
      },
      {
        input: "grid = [[1,1],[1,1]]",
        output: "4"
      }
    ],
    explanation:
      "### Two-Pass Island Component Tagging\n1. **Pass 1 (Tagging Islands)**:\n   Traverse grid. When encountering an unvisited '1', run DFS/BFS to compute its area and label all cells of that island with a unique `islandId` (starting from 2).\n   Store `areaMap[islandId] = area`.\n2. **Pass 2 (Testing Zeroes)**:\n   For each cell `(r, c)` where `grid[r][c] == 0`:\n   - Inspect its 4 neighbors.\n   - Collect unique adjacent `islandId`s into a set (to avoid double-counting the same island).\n   - Potential area = $1 + \\sum_{id \\in \\text{set}} \\text{areaMap}[id]$.\n   - Update global maximum.\n3. Handle edge case: if the entire grid is already '1's, return $N^2$.",
    interviewInsight:
      "Using unique component identifiers avoids re-running expensive graph traversals for every '0' candidate.",
    cppSolution: `class Solution {
public:
    int largestIsland(vector<vector<int>>& grid) {
        int n = grid.size();
        unordered_map<int, int> areaMap;
        int islandId = 2;
        int maxArea = 0;
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        
        function<int(int, int)> dfs = [&](int r, int c) -> int {
            grid[r][c] = islandId;
            int count = 1;
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                    count += dfs(nr, nc);
                }
            }
            return count;
        };
        
        for (int r = 0; r < n; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 1) {
                    int area = dfs(r, c);
                    areaMap[islandId] = area;
                    maxArea = max(maxArea, area);
                    islandId++;
                }
            }
        }
        
        for (int r = 0; r < n; ++r) {
            for (int c = 0; c < n; ++c) {
                if (grid[r][c] == 0) {
                    unordered_set<int> neighborIslands;
                    for (auto& d : dirs) {
                        int nr = r + d[0], nc = c + d[1];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] > 1) {
                            neighborIslands.insert(grid[nr][nc]);
                        }
                    }
                    int combined = 1;
                    for (int id : neighborIslands) {
                        combined += areaMap[id];
                    }
                    maxArea = max(maxArea, combined);
                }
            }
        }
        return maxArea == 0 ? n * n : maxArea;
    }
};`,
    pythonSolution: `class Solution:
    def largestIsland(self, grid: list[list[int]]) -> int:
        n = len(grid)
        area_map = {}
        island_id = 2
        max_area = 0
        dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        
        def dfs(r: int, c: int) -> int:
            grid[r][c] = island_id
            count = 1
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] == 1:
                    count += dfs(nr, nc)
            return count
            
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 1:
                    area = dfs(r, c)
                    area_map[island_id] = area
                    max_area = max(max_area, area)
                    island_id += 1
                    
        for r in range(n):
            for c in range(n):
                if grid[r][c] == 0:
                    neighbors = set()
                    for dr, dc in dirs:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n and grid[nr][nc] > 1:
                            neighbors.add(grid[nr][nc])
                    combined = 1 + sum(area_map[i] for i in neighbors)
                    max_area = max(max_area, combined)
                    
        return n * n if max_area == 0 else max_area`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q153",
    questionNumber: 153,
    title: "All-Pairs Shortest Path with Negative Cycle Detection",
    statement:
      "You are given a directed weighted graph with n nodes (0 to n - 1) and an array edges where edges[i] = [ui, vi, wi]. There may be negative edge weights.\n\nCompute the shortest distance between all pairs of nodes (u, v). If the graph contains a negative weight cycle reachable between a pair (u, v), assign distance -INF (-1e9). If node v is unreachable from node u, assign distance INF (1e9).\n\nReturn the n x n distance matrix.",
    difficulty: "Hard",
    pattern: "Floyd-Warshall Dynamic Programming / All-Pairs Shortest Path",
    constraints: [
      "1 <= n <= 100",
      "0 <= edges.length <= n * (n - 1)",
      "-10^4 <= wi <= 10^4"
    ],
    expectedTimeComplexity: "O(V^3)",
    expectedSpaceComplexity: "O(V^2)",
    examples: [
      {
        input: "n = 4, edges = [[0,1,3],[1,2,-2],[2,3,2],[0,3,7]]",
        output: "[[0,3,1,3],[1e9,0,-2,0],[1e9,1e9,0,2],[1e9,1e9,1e9,0]]"
      }
    ],
    explanation:
      "### Floyd-Warshall Algorithm with Negative Cycle Propagation\n1. Initialize `dist[u][v] = INF` for $u \\ne v$, `dist[u][u] = 0`.\n2. For each edge `(u, v, w)`: `dist[u][v] = min(dist[u][v], w)`.\n3. Dynamic Programming over intermediate nodes $k \\in [0, n-1]$:\n   For each $u$, for each $v$:\n   `if (dist[u][k] < INF && dist[k][v] < INF)`:\n   `dist[u][v] = min(dist[u][v], dist[u][k] + dist[k][v])`.\n4. Negative Cycle Detection:\n   If `dist[i][i] < 0` for any node $i$, node $i$ is part of a negative cycle.\n   In a second pass, for any pair `(u, v)` where `dist[u][k] < INF && dist[k][v] < INF` with `dist[k][k] < 0`, set `dist[u][v] = -1e9`.",
    interviewInsight:
      "Floyd-Warshall is the quintessential $O(V^3)$ DP for small graphs ($V \\le 100$) where all-pairs queries or intermediate node routing is required.",
    cppSolution: `class Solution {
public:
    vector<vector<long long>> floydWarshall(int n, vector<vector<int>>& edges) {
        long long INF = 1e14;
        vector<vector<long long>> dist(n, vector<long long>(n, INF));
        for (int i = 0; i < n; ++i) dist[i][i] = 0;
        
        for (auto& e : edges) {
            dist[e[0]][e[1]] = min(dist[e[0]][e[1]], (long long)e[2]);
        }
        
        for (int k = 0; k < n; ++k) {
            for (int i = 0; i < n; ++i) {
                for (int j = 0; j < n; ++j) {
                    if (dist[i][k] < INF && dist[k][j] < INF) {
                        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
                    }
                }
            }
        }
        
        // Propagate negative cycles
        for (int k = 0; k < n; ++k) {
            if (dist[k][k] < 0) {
                for (int i = 0; i < n; ++i) {
                    for (int j = 0; j < n; ++j) {
                        if (dist[i][k] < INF && dist[k][j] < INF) {
                            dist[i][j] = -1e9;
                        }
                    }
                }
            }
        }
        return dist;
    }
};`,
    pythonSolution: `class Solution:
    def floydWarshall(self, n: int, edges: list[list[int]]) -> list[list[float]]:
        INF = float('inf')
        dist = [[INF] * n for _ in range(n)]
        for i in range(n): dist[i][i] = 0
        
        for u, v, w in edges:
            dist[u][v] = min(dist[u][v], w)
            
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    if dist[i][k] < INF and dist[k][j] < INF:
                        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])
                        
        for k in range(n):
            if dist[k][k] < 0:
                for i in range(n):
                    for j in range(n):
                        if dist[i][k] < INF and dist[k][j] < INF:
                            dist[i][j] = -1e9
                            
        return dist`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q154",
    questionNumber: 154,
    title: "Minimum Cost to Reach Destination in Time",
    statement:
      "There is a country of n cities numbered from 0 to n - 1 where all the cities are connected by bi-directional roads. The roads are represented by a 2D integer array edges where edges[i] = [xi, yi, timei] denotes a road between cities xi and yi that takes timei minutes to travel. There may be multiple roads between two cities, and there may be roads leading to the same city.\n\nYou are also given an integer maxTime and a 0-indexed integer array passingFees, where passingFees[j] is the fee you must pay to cross city j.\n\nThe cost of a path is the sum of the passing fees of all the cities you visited on the path (including the start and destination cities).\n\nReturn the minimum cost to travel from city 0 to city n - 1 such that the total time taken does not exceed maxTime. If no such path exists, return -1.",
    difficulty: "Hard",
    pattern: "Constrained Shortest Path / 2D Dijkstra State Pruning",
    constraints: [
      "1 <= maxTime <= 1000",
      "n == passingFees.length",
      "2 <= n <= 1000",
      "n - 1 <= edges.length <= 1000",
      "0 <= xi, yi <= n - 1",
      "1 <= timei <= 1000",
      "1 <= passingFees[j] <= 1000"
    ],
    expectedTimeComplexity: "O(E * maxTime * log(V * maxTime))",
    expectedSpaceComplexity: "O(V * maxTime)",
    examples: [
      {
        input: "maxTime = 30, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]",
        output: "11",
        explanation: "Path 0 -> 1 -> 2 -> 5 has total time 30 <= 30 and fee 5 + 1 + 2 + 3 = 11."
      },
      {
        input: "maxTime = 29, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]",
        output: "48"
      }
    ],
    explanation:
      "### Multi-Criteria State Optimization\nWe want minimum fee under a strict `maxTime` constraint.\n- Let `minTime[node]` be the minimum time recorded so far to reach `node` with a given fee.\n- Min-Priority Queue stores: `(cost, time, node)`.\n- Initialize `minTime` array with $\\infty$, set `minTime[0] = 0`.\n- Pop lowest cost state `(cost, time, u)`.\n  - If `u == n - 1`, return `cost` immediately (Dijkstra guarantees minimum fee).\n  - If `time >= minTime[u]`, prune branch.\n  - `minTime[u] = time`.\n  - For each neighbor `(v, roadTime)` of `u`:\n    `nextTime = time + roadTime`\n    `nextCost = cost + passingFees[v]`\n    If `nextTime <= maxTime` and `nextTime < minTime[v]`:\n    push `(nextCost, nextTime, v)` into priority queue.",
    interviewInsight:
      "Sorting priority queue by primary objective (fee) while pruning on secondary resource (time) guarantees optimal solution upon first reaching the destination.",
    cppSolution: `class Solution {
public:
    int minCost(int maxTime, vector<vector<int>>& edges, vector<int>& passingFees) {
        int n = passingFees.size();
        vector<vector<pair<int, int>>> adj(n);
        for (auto& e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }
        
        vector<int> minTime(n, 1e9);
        using State = tuple<int, int, int>; // cost, time, node
        priority_queue<State, vector<State>, greater<State>> pq;
        
        pq.push({passingFees[0], 0, 0});
        minTime[0] = 0;
        
        while (!pq.empty()) {
            auto [cost, time, u] = pq.top();
            pq.pop();
            
            if (u == n - 1) return cost;
            if (time > minTime[u]) continue;
            
            for (auto& [v, roadTime] : adj[u]) {
                int nextTime = time + roadTime;
                if (nextTime <= maxTime && nextTime < minTime[v]) {
                    minTime[v] = nextTime;
                    pq.push({cost + passingFees[v], nextTime, v});
                }
            }
        }
        return -1;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def minCost(self, maxTime: int, edges: list[list[int]], passingFees: list[int]) -> int:
        n = len(passingFees)
        adj = [[] for _ in range(n)]
        for u, v, t in edges:
            adj[u].append((v, t))
            adj[v].append((u, t))
            
        min_time = [float('inf')] * n
        min_time[0] = 0
        
        pq = [(passingFees[0], 0, 0)] # cost, time, node
        
        while pq:
            cost, time, u = heapq.heappop(pq)
            if u == n - 1:
                return cost
            if time > min_time[u]:
                continue
                
            for v, road_time in adj[u]:
                next_time = time + road_time
                if next_time <= maxTime and next_time < min_time[v]:
                    min_time[v] = next_time
                    heapq.heappush(pq, (cost + passingFees[v], next_time, v))
                    
        return -1`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q155",
    questionNumber: 155,
    title: "Optimize Water Distribution in a Village",
    statement:
      "There are n houses in a village. We want to supply water to all the houses by building wells and laying pipes.\n\nFor each house i, we can either build a well inside it directly with cost wells[i - 1] (for 1 <= i <= n), or pipe in water from another well to it. The cost to lay pipes between houses are given by the array pipes where each pipes[j] = [house1j, house2j, costj] represents the cost to connect house1j and house2j together. Connections are bidirectional.\n\nReturn the minimum total cost to supply water to all houses.",
    difficulty: "Hard",
    pattern: "Super-Source Reduction / Minimum Spanning Tree (MST)",
    constraints: [
      "2 <= n <= 10^4",
      "wells.length == n",
      "0 <= wells[i] <= 10^5",
      "1 <= pipes.length <= 10^4",
      "pipes[j].length == 3",
      "1 <= house1j, house2j <= n",
      "0 <= costj <= 10^5",
      "house1j != house2j"
    ],
    expectedTimeComplexity: "O((V + E) log(V + E))",
    expectedSpaceComplexity: "O(V + E)",
    examples: [
      {
        input: "n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]",
        output: "3",
        explanation: "Build a well in house 1 with cost 1. Connect house 1 to 2 (cost 1) and 2 to 3 (cost 1). Total cost = 1 + 1 + 1 = 3."
      }
    ],
    explanation:
      "### The Super-Source Modeling Transformation\nBuilding a well inside house $i$ at cost `wells[i-1]` is identical to connecting house $i$ to a virtual **Super-Source (node 0)** with edge weight `wells[i-1]`!\n\n**Algorithm**:\n1. Create a dummy node `0` representing the global water reservoir.\n2. For each house $i \\in [1, n]$, add edge `(0, i, wells[i-1])`.\n3. Add all given pipe edges `(house1, house2, cost)`.\n4. Run Kruskal's algorithm on the augmented $(N+1)$-node graph.\n5. The MST on this $(N+1)$ graph precisely decides which houses get their own wells (edges connected to 0) and which share water via pipes, minimizing total cost globally.",
    interviewInsight:
      "Introducing a virtual super-source/super-sink converts heterogeneous cost models (node activation costs + edge connection costs) into standard homogeneous MST problems.",
    cppSolution: `class Solution {
public:
    int minCostToSupplyWater(int n, vector<int>& wells, vector<vector<int>>& pipes) {
        vector<vector<int>> edges = pipes;
        for (int i = 0; i < n; ++i) {
            edges.push_back({0, i + 1, wells[i]});
        }
        
        sort(edges.begin(), edges.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[2] < b[2];
        });
        
        vector<int> parent(n + 1);
        for (int i = 0; i <= n; ++i) parent[i] = i;
        
        function<int(int)> findRoot = [&](int u) -> int {
            return parent[u] == u ? u : (parent[u] = findRoot(parent[u]));
        };
        
        int totalCost = 0;
        int edgesUsed = 0;
        
        for (auto& edge : edges) {
            int ru = findRoot(edge[0]), rv = findRoot(edge[1]);
            if (ru != rv) {
                parent[ru] = rv;
                totalCost += edge[2];
                edgesUsed++;
                if (edgesUsed == n) break;
            }
        }
        return totalCost;
    }
};`,
    pythonSolution: `class Solution:
    def minCostToSupplyWater(self, n: int, wells: list[int], pipes: list[list[int]]) -> int:
        edges = pipes.copy()
        for i, cost in enumerate(wells):
            edges.append([0, i + 1, cost])
            
        edges.sort(key=lambda x: x[2])
        parent = list(range(n + 1))
        
        def find(u: int) -> int:
            if parent[u] != u:
                parent[u] = find(parent[u])
            return parent[u]
            
        total_cost = 0
        edges_used = 0
        
        for u, v, cost in edges:
            ru, rv = find(u), find(v)
            if ru != rv:
                parent[ru] = rv
                total_cost += cost
                edges_used += 1
                if edges_used == n:
                    break
                    
        return total_cost`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q156",
    questionNumber: 156,
    title: "Checking Existence of Edge Length Limited Paths",
    statement:
      "An undirected graph of n nodes is defined by edgeList, where edgeList[i] = [ui, vi, disi] denotes an edge between nodes ui and vi with distance disi. Note that there may be multiple edges between two nodes.\n\nGiven an array queries, where queries[j] = [pj, qj, limitj], find for each query whether there is a path between pj and qj such that each edge on the path has a distance strictly less than limitj.\n\nReturn a boolean array answer, where answer.length == queries.length and answer[j] is true if there is a path for the jth query, and false otherwise.",
    difficulty: "Extreme",
    pattern: "Offline Query Sorting + Incremental DSU Edge Activation",
    constraints: [
      "2 <= n <= 10^5",
      "1 <= edgeList.length, queries.length <= 10^5",
      "edgeList[i].length == 3",
      "queries[j].length == 3",
      "0 <= ui, vi, pj, qj <= n - 1",
      "ui != vi, pj != qj",
      "1 <= disi, limitj <= 10^9"
    ],
    expectedTimeComplexity: "O(E log E + Q log Q + (E + Q) * alpha(V))",
    expectedSpaceComplexity: "O(V + Q)",
    examples: [
      {
        input: "n = 3, edgeList = [[0,1,2],[1,2,4],[2,0,8],[1,0,16]], queries = [[0,1,2],[0,2,5]]",
        output: "[false,true]",
        explanation: "For query [0,1,2], the edge weight 2 is not strictly less than limit 2 -> false. For query [0,2,5], path 0-1-2 uses edge weights 2 and 4 (both < 5) -> true."
      },
      {
        input: "n = 5, edgeList = [[0,1,10],[1,2,5],[2,3,9],[3,4,13]], queries = [[0,4,14],[1,4,13]]",
        output: "[true,false]"
      }
    ],
    explanation:
      "### Why Online Search Fails & Offline DSU Sorting\nRunning BFS/Dijkstra per query takes $O(Q \\times (V + E)) \\approx 10^{10}$ operations (TLE).\n\n**The Offline Invariant**:\nBecause queries are independent, sort both `edgeList` and `queries` by weight/limit in ascending order:\n1. Sort `edgeList` by weight `dis`.\n2. Store queries along with original index: `queriesWithIndex = [[p, q, limit, originalIdx], ...]` and sort by `limit`.\n3. Maintain DSU across all $N$ nodes.\n4. For each query `(p, q, limit, originalIdx)`:\n   - While `edgeIndex < edgeList.length` and `edgeList[edgeIndex].dis < limit`:\n     Union the endpoints of `edgeList[edgeIndex]` in DSU.\n     `edgeIndex++`.\n   - Check if `find(p) == find(q)`. Record answer at `ans[originalIdx]`.\n5. Each edge is inserted into DSU exactly once across all queries.",
    interviewInsight:
      "Offline query sorting combined with monotonic DSU activations is a signature technique for large-scale multi-query graph path queries.",
    cppSolution: `class Solution {
public:
    vector<bool> distanceLimitedPathsExist(int n, vector<vector<int>>& edgeList, vector<vector<int>>& queries) {
        int qLen = queries.size();
        vector<int> qIdx(qLen);
        iota(qIdx.begin(), qIdx.end(), 0);
        
        sort(edgeList.begin(), edgeList.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[2] < b[2];
        });
        
        sort(qIdx.begin(), qIdx.end(), [&](int i, int j) {
            return queries[i][2] < queries[j][2];
        });
        
        vector<int> parent(n);
        iota(parent.begin(), parent.end(), 0);
        
        function<int(int)> findRoot = [&](int u) -> int {
            return parent[u] == u ? u : (parent[u] = findRoot(parent[u]));
        };
        
        auto unite = [&](int u, int v) {
            int ru = findRoot(u), rv = findRoot(v);
            if (ru != rv) parent[ru] = rv;
        };
        
        vector<bool> ans(qLen);
        int edgeIdx = 0;
        int numEdges = edgeList.size();
        
        for (int idx : qIdx) {
            int p = queries[idx][0], q = queries[idx][1], limit = queries[idx][2];
            
            while (edgeIdx < numEdges && edgeList[edgeIdx][2] < limit) {
                unite(edgeList[edgeIdx][0], edgeList[edgeIdx][1]);
                edgeIdx++;
            }
            ans[idx] = (findRoot(p) == findRoot(q));
        }
        return ans;
    }
};`,
    pythonSolution: `class Solution:
    def distanceLimitedPathsExist(self, n: int, edgeList: list[list[int]], queries: list[list[int]]) -> list[bool]:
        edgeList.sort(key=lambda x: x[2])
        q_indexed = sorted(enumerate(queries), key=lambda x: x[1][2])
        
        parent = list(range(n))
        
        def find(u: int) -> int:
            if parent[u] != u:
                parent[u] = find(parent[u])
            return parent[u]
            
        def union(u: int, v: int):
            ru, rv = find(u), find(v)
            if ru != rv:
                parent[ru] = rv
                
        ans = [False] * len(queries)
        edge_idx = 0
        num_edges = len(edgeList)
        
        for orig_idx, (p, q, limit) in q_indexed:
            while edge_idx < num_edges and edgeList[edge_idx][2] < limit:
                union(edgeList[edge_idx][0], edgeList[edge_idx][1])
                edge_idx += 1
            ans[orig_idx] = (find(p) == find(q))
            
        return ans`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q157",
    questionNumber: 157,
    title: "Critical and Pseudo-Critical Edges in MST",
    statement:
      "Given a weighted undirected connected graph with n vertices numbered from 0 to n - 1, and an array edges where edges[i] = [ai, bi, weighti] represents a bidirectional and weighted edge between nodes ai and bi. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.\n\nFind all the critical and pseudo-critical edges in the given graph's minimum spanning tree (MST).\n- An MST edge whose deletion from the graph would cause the MST weight to increase is called a critical edge.\n- A pseudo-critical edge, on the other hand, is that which can appear in some MSTs but not all.",
    difficulty: "Extreme",
    pattern: "MST Invariance / Kruskal Force & Forbid Edge Analysis",
    constraints: [
      "2 <= n <= 100",
      "1 <= edges.length <= min(200, n * (n - 1) / 2)",
      "edges[i].length == 3",
      "0 <= ai < bi < n",
      "1 <= weighti <= 1000",
      "All pairs (ai, bi) are distinct."
    ],
    expectedTimeComplexity: "O(E^2 * alpha(V))",
    expectedSpaceComplexity: "O(V + E)",
    examples: [
      {
        input: "n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]",
        output: "[[0,1],[2,3,4,5]]",
        explanation: "Critical edges: [0, 1]. Pseudo-critical edges: [2, 3, 4, 5]."
      },
      {
        input: "n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]",
        output: "[[],[0,1,2,3]]"
      }
    ],
    explanation:
      "### Edge Force & Forbid Kruskal Invariants\n1. Append original index to each edge: `[u, v, weight, origIdx]` and sort by weight.\n2. Calculate baseline `baseMSTWeight` using standard Kruskal's algorithm.\n3. For each edge $e$:\n   - **Test Critical (Forbid Edge $e$)**:\n     Run Kruskal without using edge $e$. If graph becomes disconnected OR `newMSTWeight > baseMSTWeight`, edge $e$ is **CRITICAL**.\n   - **Test Pseudo-Critical (Force Edge $e$)**:\n     If edge $e$ is not critical, force edge $e$ into the initial DSU (pre-adding its weight). Run Kruskal on remaining edges. If `forcedMSTWeight == baseMSTWeight`, edge $e$ is **PSEUDO-CRITICAL**.",
    interviewInsight:
      "Categorizing edges via force/forbid perturbations around the optimal cost baseline is a core technique in combinatorial optimization and sensitivity analysis.",
    cppSolution: `class Solution {
public:
    vector<vector<int>> findCriticalAndPseudoCriticalEdges(int n, vector<vector<int>>& edges) {
        int m = edges.size();
        vector<vector<int>> newEdges(m);
        for (int i = 0; i < m; ++i) {
            newEdges[i] = {edges[i][0], edges[i][1], edges[i][2], i};
        }
        
        sort(newEdges.begin(), newEdges.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[2] < b[2];
        });
        
        auto runKruskal = [&](int forbidIdx, int forceIdx) -> int {
            vector<int> parent(n);
            iota(parent.begin(), parent.end(), 0);
            
            function<int(int)> findRoot = [&](int u) -> int {
                return parent[u] == u ? u : (parent[u] = findRoot(parent[u]));
            };
            
            int weight = 0, edgesCount = 0;
            
            if (forceIdx != -1) {
                parent[newEdges[forceIdx][0]] = newEdges[forceIdx][1];
                weight += newEdges[forceIdx][2];
                edgesCount++;
            }
            
            for (int i = 0; i < m; ++i) {
                if (i == forbidIdx) continue;
                int ru = findRoot(newEdges[i][0]), rv = findRoot(newEdges[i][1]);
                if (ru != rv) {
                    parent[ru] = rv;
                    weight += newEdges[i][2];
                    edgesCount++;
                }
            }
            return edgesCount == n - 1 ? weight : 1e9;
        };
        
        int baseWeight = runKruskal(-1, -1);
        vector<int> critical, pseudoCritical;
        
        for (int i = 0; i < m; ++i) {
            if (runKruskal(i, -1) > baseWeight) {
                critical.push_back(newEdges[i][3]);
            } else if (runKruskal(-1, i) == baseWeight) {
                pseudoCritical.push_back(newEdges[i][3]);
            }
        }
        return {critical, pseudoCritical};
    }
};`,
    pythonSolution: `class Solution:
    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: list[list[int]]) -> list[list[int]]:
        m = len(edges)
        new_edges = [[edges[i][0], edges[i][1], edges[i][2], i] for i in range(m)]
        new_edges.sort(key=lambda x: x[2])
        
        def run_kruskal(forbid_idx: int, force_idx: int) -> int:
            parent = list(range(n))
            
            def find(u: int) -> int:
                if parent[u] != u:
                    parent[u] = find(parent[u])
                return parent[u]
                
            weight = 0
            edges_count = 0
            
            if force_idx != -1:
                parent[new_edges[force_idx][0]] = new_edges[force_idx][1]
                weight += new_edges[force_idx][2]
                edges_count += 1
                
            for i in range(m):
                if i == forbid_idx:
                    continue
                ru, rv = find(new_edges[i][0]), find(new_edges[i][1])
                if ru != rv:
                    parent[ru] = rv
                    weight += new_edges[i][2]
                    edges_count += 1
                    
            return weight if edges_count == n - 1 else float('inf')
            
        base_weight = run_kruskal(-1, -1)
        critical, pseudo_critical = [], []
        
        for i in range(m):
            if run_kruskal(i, -1) > base_weight:
                critical.append(new_edges[i][3])
            elif run_kruskal(-1, i) == base_weight:
                pseudo_critical.append(new_edges[i][3])
                
        return [critical, pseudo_critical]`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q158",
    questionNumber: 158,
    title: "Cut Off Trees for Golf Event",
    statement:
      "You are asked to cut off all the trees in a forest for a golf event. The forest is represented as an m x n matrix. In this matrix:\n- 0 means the cell cannot be walked through.\n- 1 represents an empty cell that can be walked through.\n- A number greater than 1 represents a tree that can be walked through, and this number represents the tree's height.\n\nIn one step you can walk in any of the four directions at the same time. You cannot walk through cells with value 0.\n\nYou are asked to cut off all the trees in the forest in the order of tree's height, always starting from the smallest height. Return the minimum steps you need to walk to cut off all the trees. If you cannot cut off all the trees, return -1.",
    difficulty: "Extreme",
    pattern: "Chained Multi-Goal BFS / Dynamic Obstacle Matrix Routing",
    constraints: [
      "m == forest.length",
      "n == forest[i].length",
      "1 <= m, n <= 50",
      "0 <= forest[i][j] <= 10^9"
    ],
    expectedTimeComplexity: "O(T * M * N) where T <= M * N is total trees",
    expectedSpaceComplexity: "O(M * N)",
    examples: [
      {
        input: "forest = [[1,2,3],[0,0,4],[7,6,5]]",
        output: "6",
        explanation: "Order of trees: 2 -> 3 -> 4 -> 5 -> 6 -> 7. Total steps = 6."
      },
      {
        input: "forest = [[1,2,3],[0,0,0],[7,6,5]]",
        output: "-1",
        explanation: "Trees in bottom row cannot be reached due to impassable 0s."
      }
    ],
    explanation:
      "### Chained Multi-Goal Shortest Path\n1. Find all cells with `height > 1`. Store as tuples `(height, r, c)` and sort ascending by `height`.\n2. You must visit the trees in strictly sorted order: `start (0, 0) -> Tree[0] -> Tree[1] -> ... -> Tree[T-1]`.\n3. For each sequential leg from `(curR, curC)` to `(targetR, targetC)`:\n   - Execute BFS or A* Search on the grid avoiding '0' cells.\n   - If target cannot be reached, return -1 immediately.\n   - Add path length to `totalSteps`.\n   - Update current position to target.",
    interviewInsight:
      "A* search with Manhattan distance heuristic $h(r, c) = |r - tr| + |c - tc|$ provides up to 5x acceleration over standard BFS on large grids.",
    cppSolution: `class Solution {
public:
    int cutOffTree(vector<vector<int>>& forest) {
        int m = forest.size(), n = forest[0].size();
        vector<tuple<int, int, int>> trees;
        
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (forest[r][c] > 1) {
                    trees.push_back({forest[r][c], r, c});
                }
            }
        }
        
        sort(trees.begin(), trees.end());
        
        auto bfs = [&](int sr, int sc, int tr, int tc) -> int {
            if (sr == tr && sc == tc) return 0;
            vector<vector<bool>> visited(m, vector<bool>(n, false));
            queue<tuple<int, int, int>> q;
            q.push({sr, sc, 0});
            visited[sr][sc] = true;
            int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
            
            while (!q.empty()) {
                auto [r, c, steps] = q.front();
                q.pop();
                
                if (r == tr && c == tc) return steps;
                
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && forest[nr][nc] != 0) {
                        visited[nr][nc] = true;
                        q.push({nr, nc, steps + 1});
                    }
                }
            }
            return -1;
        };
        
        int curR = 0, curC = 0;
        int totalSteps = 0;
        
        for (auto& [h, tr, tc] : trees) {
            int steps = bfs(curR, curC, tr, tc);
            if (steps == -1) return -1;
            totalSteps += steps;
            curR = tr;
            curC = tc;
        }
        return totalSteps;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def cutOffTree(self, forest: list[list[int]]) -> int:
        m, n = len(forest), len(forest[0])
        trees = []
        for r in range(m):
            for c in range(n):
                if forest[r][c] > 1:
                    trees.append((forest[r][c], r, c))
                    
        trees.sort()
        
        def bfs(sr: int, sc: int, tr: int, tc: int) -> int:
            if sr == tr and sc == tc:
                return 0
            visited = [[False] * n for _ in range(m)]
            visited[sr][sc] = True
            queue = deque([(sr, sc, 0)])
            dirs = [(1, 0), (-1, 0), (0, 1), (0, -1)]
            
            while queue:
                r, c, steps = queue.popleft()
                if r == tr and c == tc:
                    return steps
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc] and forest[nr][nc] != 0:
                        visited[nr][nc] = True
                        queue.append((nr, nc, steps + 1))
            return -1
            
        cur_r, cur_c = 0, 0
        total_steps = 0
        
        for h, tr, tc in trees:
            steps = bfs(cur_r, cur_c, tr, tc)
            if steps == -1:
                return -1
            total_steps += steps
            cur_r, cur_c = tr, tc
            
        return total_steps`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q159",
    questionNumber: 159,
    title: "Minimum Weighted Subgraph With the Required Paths",
    statement:
      "You are given an integer n denoting the number of nodes in a directed weighted graph with nodes labeled from 0 to n - 1. You are also given a 2D integer array edges where edges[i] = [fromi, toi, weighti] denotes a directed edge from fromi to toi with integer weight weighti.\n\nLastly, you are given three distinct integers src1, src2, and dest.\n\nReturn the minimum weight of a subgraph of the graph such that it is possible to reach dest from both src1 and src2 via edges that belong to this subgraph. If there are no such paths, return -1.",
    difficulty: "Extreme",
    pattern: "Tri-Directional Dijkstra / Intermediate Convergence Point",
    constraints: [
      "3 <= n <= 10^5",
      "0 <= edges.length <= 10^5",
      "edges[i].length == 3",
      "0 <= fromi, toi, src1, src2, dest <= n - 1",
      "src1, src2, and dest are pairwise distinct.",
      "1 <= weighti <= 10^5"
    ],
    expectedTimeComplexity: "O((V + E) log V)",
    expectedSpaceComplexity: "O(V + E)",
    examples: [
      {
        input: "n = 6, edges = [[0,2,2],[0,5,6],[1,0,3],[1,4,5],[2,1,1],[2,3,3],[2,3,4],[3,4,2],[4,5,1]], src1 = 0, src2 = 1, dest = 5",
        output: "9",
        explanation: "The optimal subgraph uses paths: 0 -> 2 -> 3 -> 4 -> 5 and 1 -> 0 -> 2 -> 3 -> 4 -> 5, converging at node 0 and sharing the rest of the path."
      }
    ],
    explanation:
      "### Intermediate Node Convergence Principle\nAny subgraph enabling `src1 -> dest` and `src2 -> dest` can be viewed as two paths from `src1` and `src2` meeting at some intermediate convergence node `X` ($0 \\le X < n$), and then sharing a single optimal path from `X -> dest`.\n\n**Algorithm**:\n1. Build standard adjacency list `adj` and reversed graph `revAdj`.\n2. Run Dijkstra from `src1` on `adj` -> `d1[X]` (shortest distance `src1 -> X`).\n3. Run Dijkstra from `src2` on `adj` -> `d2[X]` (shortest distance `src2 -> X`).\n4. Run Dijkstra from `dest` on `revAdj` -> `dDest[X]` (shortest distance `X -> dest`).\n5. Iterate through all possible meeting points $X \\in [0, n-1]$:\n   $\\text{minWeight} = \\min_X (d1[X] + d2[X] + dDest[X])$.\n6. If minimum weight remains $\\infty$, return -1.",
    interviewInsight:
      "Running Dijkstra on the transposed (reversed) graph from the target allows precomputing shortest paths from all vertices to `dest` in a single pass.",
    cppSolution: `class Solution {
public:
    long long minimumWeight(int n, vector<vector<int>>& edges, int src1, int src2, int dest) {
        vector<vector<pair<int, long long>>> adj(n), revAdj(n);
        for (auto& e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            revAdj[e[1]].push_back({e[0], e[2]});
        }
        
        long long INF = 1e18;
        auto dijkstra = [&](int start, const vector<vector<pair<int, long long>>>& graph) -> vector<long long> {
            vector<long long> dist(n, INF);
            priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<pair<long long, int>>> pq;
            dist[start] = 0;
            pq.push({0, start});
            
            while (!pq.empty()) {
                auto [d, u] = pq.top();
                pq.pop();
                if (d > dist[u]) continue;
                
                for (auto& [v, w] : graph[u]) {
                    if (dist[u] + w < dist[v]) {
                        dist[v] = dist[u] + w;
                        pq.push({dist[v], v});
                    }
                }
            }
            return dist;
        };
        
        vector<long long> d1 = dijkstra(src1, adj);
        vector<long long> d2 = dijkstra(src2, adj);
        vector<long long> dDest = dijkstra(dest, revAdj);
        
        long long minTotal = INF;
        for (int x = 0; x < n; ++x) {
            if (d1[x] < INF && d2[x] < INF && dDest[x] < INF) {
                minTotal = min(minTotal, d1[x] + d2[x] + dDest[x]);
            }
        }
        return minTotal >= INF ? -1 : minTotal;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def minimumWeight(self, n: int, edges: list[list[int]], src1: int, src2: int, dest: int) -> int:
        adj = [[] for _ in range(n)]
        rev_adj = [[] for _ in range(n)]
        for u, v, w in edges:
            adj[u].append((v, w))
            rev_adj[v].append((u, w))
            
        INF = float('inf')
        def dijkstra(start: int, graph: list[list[tuple[int, int]]]) -> list[int]:
            dist = [INF] * n
            dist[start] = 0
            pq = [(0, start)]
            
            while pq:
                d, u = heapq.heappop(pq)
                if d > dist[u]:
                    continue
                for v, w in graph[u]:
                    if dist[u] + w < dist[v]:
                        dist[v] = dist[u] + w
                        heapq.heappush(pq, (dist[v], v))
            return dist
            
        d1 = dijkstra(src1, adj)
        d2 = dijkstra(src2, adj)
        d_dest = dijkstra(dest, rev_adj)
        
        min_total = INF
        for x in range(n):
            if d1[x] < INF and d2[x] < INF and d_dest[x] < INF:
                min_total = min(min_total, d1[x] + d2[x] + d_dest[x])
                
        return -1 if min_total == INF else min_total`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  },
  {
    id: "Q160",
    questionNumber: 160,
    title: "Strongly Connected Components (Tarjan's Low-Link Algorithm)",
    statement:
      "Given a directed graph with n vertices numbered from 0 to n - 1 and an array of directed edges edges, partition all vertices into Strongly Connected Components (SCCs).\n\nA strongly connected component is a maximal subgraph where every vertex is reachable from every other vertex in the component.\n\nReturn a list of all strongly connected components (each component as a list of vertex IDs). Components should be ordered topologically from sinks to sources.",
    difficulty: "Extreme",
    pattern: "Tarjan's SCC Algorithm / Depth-First Low-Link DFS",
    constraints: [
      "1 <= n <= 10^5",
      "0 <= edges.length <= 2 * 10^5",
      "0 <= edges[i][0], edges[i][1] < n"
    ],
    expectedTimeComplexity: "O(V + E)",
    expectedSpaceComplexity: "O(V)",
    examples: [
      {
        input: "n = 5, edges = [[1,0],[0,2],[2,1],[0,3],[3,4]]",
        output: "[[4],[3],[0,1,2]]",
        explanation: "Component {4} has no outgoing edges. Component {3} leads to {4}. Component {0,1,2} forms a 3-cycle."
      }
    ],
    explanation:
      "### Tarjan's Single-Pass SCC Theory\nMaintain:\n- `tin[u]`: Discovery timestamp of node `u`.\n- `low[u]`: Lowest discovery time reachable from `u` via its subtree and at most one back-edge.\n- `inStack[u]`: Boolean flag indicating if `u` is on the active SCC stack.\n\n**DFS Invariants**:\n1. When exploring node `u`, set `tin[u] = low[u] = ++timer`, push `u` to stack.\n2. For each directed neighbor `v`:\n   - If unvisited: recursively call `dfs(v)`, then `low[u] = min(low[u], low[v])`.\n   - Else if `v` is on the active stack: `low[u] = min(low[u], tin[v])`.\n3. **Root of SCC**:\n   If `low[u] == tin[u]`, node `u` is the root of an SCC!\n   Pop nodes from stack until node `u` is popped. All popped nodes form a single complete strongly connected component.",
    interviewInsight:
      "Tarjan's SCC algorithm forms the foundational engine for 2-SAT solvers, topological condensation of cyclic graphs, and compiler dead-code elimination.",
    cppSolution: `class Solution {
public:
    vector<vector<int>> findSCCs(int n, vector<vector<int>>& edges) {
        vector<vector<int>> adj(n);
        for (auto& e : edges) adj[e[0]].push_back(e[1]);
        
        vector<int> tin(n, -1), low(n, -1);
        vector<bool> inStack(n, false);
        stack<int> st;
        int timer = 0;
        vector<vector<int>> sccs;
        
        function<void(int)> dfs = [&](int u) {
            tin[u] = low[u] = ++timer;
            st.push(u);
            inStack[u] = true;
            
            for (int v : adj[u]) {
                if (tin[v] == -1) {
                    dfs(v);
                    low[u] = min(low[u], low[v]);
                } else if (inStack[v]) {
                    low[u] = min(low[u], tin[v]);
                }
            }
            
            if (low[u] == tin[u]) {
                vector<int> scc;
                while (true) {
                    int node = st.top();
                    st.pop();
                    inStack[node] = false;
                    scc.push_back(node);
                    if (node == u) break;
                }
                sccs.push_back(scc);
            }
        };
        
        for (int i = 0; i < n; ++i) {
            if (tin[i] == -1) dfs(i);
        }
        return sccs;
    }
};`,
    pythonSolution: `class Solution:
    def findSCCs(self, n: int, edges: list[list[int]]) -> list[list[int]]:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            
        tin = [-1] * n
        low = [-1] * n
        in_stack = [False] * n
        stack = []
        timer = 0
        sccs = []
        
        def dfs(u: int):
            nonlocal timer
            timer += 1
            tin[u] = low[u] = timer
            stack.append(u)
            in_stack[u] = True
            
            for v in adj[u]:
                if tin[v] == -1:
                    dfs(v)
                    low[u] = min(low[u], low[v])
                elif in_stack[v]:
                    low[u] = min(low[u], tin[v])
                    
            if low[u] == tin[u]:
                scc = []
                while True:
                    node = stack.pop()
                    in_stack[node] = False
                    scc.append(node)
                    if node == u:
                        break
                sccs.append(scc)
                
        for i in range(n):
            if tin[i] == -1:
                dfs(i)
                
        return sccs`,
    topic: "Graphs & Disjoint Sets",
    batch: 8
  }
];
