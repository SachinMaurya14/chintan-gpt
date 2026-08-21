import { DSAInterviewProblem } from "./dsaQuestionTypes.js";

export const DSA_BATCH_5_GRAPHS_BFS_DFS: DSAInterviewProblem[] = [
  {
    id: "Q81",
    questionNumber: 81,
    title: "Number of Islands",
    statement:
      "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    difficulty: "Medium",
    pattern: "Grid DFS / BFS Connected Components",
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(M * N) worst case for recursion/queue",
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: "1",
        explanation: "All adjacent 1s form a single connected island."
      },
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: "3",
        explanation: "There are three distinct disconnected islands."
      }
    ],
    explanation:
      "Iterate over every cell `(r, c)`. When a land cell `'1'` is found, increment island count and trigger DFS or BFS to traverse and sink all 4-directionally connected land cells by marking them `'0'`. This ensures each connected component is counted exactly once.",
    interviewInsight:
      "Mutating the grid in-place (`grid[r][c] = '0'`) saves auxiliary memory for a separate `visited` matrix.",
    cppSolution: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty() || grid[0].empty()) return 0;
        int m = grid.size(), n = grid[0].size();
        int islands = 0;
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == '1') {
                    islands++;
                    dfs(grid, r, c, m, n);
                }
            }
        }
        return islands;
    }
    
private:
    void dfs(vector<vector<char>>& grid, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;
        
        grid[r][c] = '0'; // Sink island cell
        dfs(grid, r + 1, c, m, n);
        dfs(grid, r - 1, c, m, n);
        dfs(grid, r, c + 1, m, n);
        dfs(grid, r, c - 1, m, n);
    }
};`,
    pythonSolution: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        if not grid or not grid[0]:
            return 0
            
        m, n = len(grid), len(grid[0])
        islands = 0
        
        def dfs(r: int, c: int):
            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
                return
            grid[r][c] = '0'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
            
        for r in range(m):
            for c in range(n):
                if grid[r][c] == '1':
                    islands += 1
                    dfs(r, c)
                    
        return islands`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q82",
    questionNumber: 82,
    title: "Rotting Oranges",
    statement:
      "You are given an m x n grid where each cell can have one of three values: 0 representing an empty cell, 1 representing a fresh orange, or 2 representing a rotten orange. Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.",
    difficulty: "Medium",
    pattern: "Multi-Source BFS Wave Propagation",
    constraints: [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 10",
      "grid[i][j] is 0, 1, or 2."
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(M * N)",
    examples: [
      {
        input: "grid = [[2,1,1],[1,1,0],[0,1,1]]",
        output: "4",
        explanation: "All oranges rot simultaneously in 4 minutes."
      },
      {
        input: "grid = [[2,1,1],[0,1,1],[1,0,1]]",
        output: "-1",
        explanation: "The orange at bottom-left cannot rot because rot cannot reach it."
      }
    ],
    explanation:
      "Initialize a queue with all initial rotten orange coordinates `(r, c)` and count the total fresh oranges. Execute multi-source BFS level-by-level. In each minute/level, dequeue all currently rotten oranges, infect adjacent fresh oranges (`1 -> 2`), decrement fresh orange count, and enqueue the newly rotten oranges. Continue until the queue is empty. Return elapsed minutes if `freshCount == 0`, else `-1`.",
    interviewInsight:
      "Pushing ALL initially rotten oranges into the queue upfront guarantees simultaneous multi-source breadth-first wave expansion.",
    cppSolution: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int, int>> q;
        int fresh = 0;
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) q.push({r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }
        
        if (fresh == 0) return 0;
        
        int minutes = 0;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        
        while (!q.empty() && fresh > 0) {
            int sz = q.size();
            minutes++;
            for (int i = 0; i < sz; i++) {
                auto [r, c] = q.front();
                q.pop();
                
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        q.push({nr, nc});
                    }
                }
            }
        }
        return (fresh == 0) ? minutes : -1;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        m, n = len(grid), len(grid[0])
        q = deque()
        fresh = 0
        
        for r in range(m):
            for c in range(n):
                if grid[r][c] == 2:
                    q.append((r, c))
                elif grid[r][c] == 1:
                    fresh += 1
                    
        if fresh == 0:
            return 0
            
        minutes = 0
        dirs = [(1,0), (-1,0), (0,1), (0,-1)]
        
        while q and fresh > 0:
            minutes += 1
            for _ in range(len(q)):
                r, c = q.popleft()
                for dr, dc in dirs:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                        grid[nr][nc] = 2
                        fresh -= 1
                        q.append((nr, nc))
                        
        return minutes if fresh == 0 else -1`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q83",
    questionNumber: 83,
    title: "Clone Graph",
    statement:
      "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (int) and a list (List[Node]) of its neighbors.",
    difficulty: "Medium",
    pattern: "Hash Map Node Cloning with Graph BFS/DFS",
    constraints: [
      "The number of nodes in the graph is in the range [0, 100].",
      "1 <= Node.val <= 100",
      "Node.val is unique for each node.",
      "There are no repeated edges and no self-loops in the graph."
    ],
    expectedTimeComplexity: "O(V + E)",
    expectedSpaceComplexity: "O(V)",
    examples: [
      {
        input: "adjList = [[2,4],[1,3],[2,4],[1,3]]",
        output: "[[2,4],[1,3],[2,4],[1,3]]",
        explanation: "Graph has 4 nodes. A new identical graph is constructed and cloned node 1 is returned."
      }
    ],
    explanation:
      "Maintain a hash map `unordered_map<Node*, Node*> cloned` mapping original nodes to their cloned copies. In DFS: if the node has already been cloned, return `cloned[node]`. Otherwise, instantiate a new node `new Node(node->val)`, store it in the map, and recursively clone and append all neighbor references.",
    interviewInsight:
      "The hash map serves dual duty: creating the 1-to-1 clone map and acting as the `visited` set to prevent infinite cycles in undirected graphs.",
    cppSolution: `/*
// Definition for a Node.
class Node {
public:
    int val;
    vector<Node*> neighbors;
    Node() { val = 0; neighbors = vector<Node*>(); }
    Node(int _val) { val = _val; neighbors = vector<Node*>(); }
    Node(int _val, vector<Node*> _neighbors) { val = _val; neighbors = _neighbors; }
};
*/

class Solution {
private:
    unordered_map<Node*, Node*> copies;
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (copies.count(node)) return copies[node];
        
        Node* copy = new Node(node->val);
        copies[node] = copy;
        
        for (Node* neighbor : node->neighbors) {
            copy->neighbors.push_back(cloneGraph(neighbor));
        }
        return copy;
    }
};`,
    pythonSolution: `"""
# Definition for a Node.
class Node:
    def __init__(self, val = 0, neighbors = None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []
"""

class Solution:
    def __init__(self):
        self.visited = {}

    def cloneGraph(self, node: 'Optional[Node]') -> 'Optional[Node]':
        if not node:
            return None
        if node in self.visited:
            return self.visited[node]
            
        copy = Node(node.val)
        self.visited[node] = copy
        
        for neighbor in node.neighbors:
            copy.neighbors.append(self.cloneGraph(neighbor))
            
        return copy`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q84",
    questionNumber: 84,
    title: "Pacific Atlantic Water Flow",
    statement:
      "There is an m x n rectangular island that borders both the Pacific Ocean (top and left edges) and Atlantic Ocean (bottom and right edges). Water can flow from a cell to adjacent cells horizontally or vertically if the neighboring cell's height is less than or equal to the current cell's height. Return a 2D list of grid coordinates result where result[i] = [ri, ci] denotes that rain water can flow from cell (ri, ci) to both the Pacific and Atlantic oceans.",
    difficulty: "Medium",
    pattern: "Dual Reverse DFS from Oceanic Borders",
    constraints: [
      "m == heights.length",
      "n == heights[r].length",
      "1 <= m, n <= 200",
      "0 <= heights[r][c] <= 10^5"
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(M * N)",
    examples: [
      {
        input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]",
        output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
        explanation: "All coordinates can reach both oceans through non-increasing elevation paths."
      }
    ],
    explanation:
      "Instead of flowing down from every internal cell (which causes redundant O((M*N)^2) paths), reverse the problem: start from the ocean borders and flow UPWARDS (height must be greater than or equal). Maintain two boolean matrices `pacific` and `atlantic`. Run DFS from all Pacific border cells, then from all Atlantic border cells. Cells where both matrices are `true` can reach both oceans.",
    interviewInsight:
      "Reversing search direction from destination boundaries inwards is a hallmark graph optimization technique.",
    cppSolution: `class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<bool>> pacific(m, vector<bool>(n, false));
        vector<vector<bool>> atlantic(m, vector<bool>(n, false));
        
        for (int r = 0; r < m; r++) {
            dfs(heights, pacific, r, 0, m, n);
            dfs(heights, atlantic, r, n - 1, m, n);
        }
        for (int c = 0; c < n; c++) {
            dfs(heights, pacific, 0, c, m, n);
            dfs(heights, atlantic, m - 1, c, m, n);
        }
        
        vector<vector<int>> result;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (pacific[r][c] && atlantic[r][c]) {
                    result.push_back({r, c});
                }
            }
        }
        return result;
    }
    
private:
    void dfs(vector<vector<int>>& h, vector<vector<bool>>& visited, int r, int c, int m, int n) {
        visited[r][c] = true;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        for (auto& d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc] && h[nr][nc] >= h[r][c]) {
                dfs(h, visited, nr, nc, m, n);
            }
        }
    }
};`,
    pythonSolution: `class Solution:
    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:
        m, n = len(heights), len(heights[0])
        pacific = set()
        atlantic = set()
        
        def dfs(r: int, c: int, visit_set: set):
            visit_set.add((r, c))
            for dr, dc in [(1,0), (-1,0), (0,1), (0,-1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and (nr, nc) not in visit_set and heights[nr][nc] >= heights[r][c]:
                    dfs(nr, nc, visit_set)
                    
        for r in range(m):
            dfs(r, 0, pacific)
            dfs(r, n - 1, atlantic)
        for c in range(n):
            dfs(0, c, pacific)
            dfs(m - 1, c, atlantic)
            
        return [[r, c] for r in range(m) for c in range(n) if (r, c) in pacific and (r, c) in atlantic]`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q85",
    questionNumber: 85,
    title: "Surrounded Regions (In-Place Island Capture)",
    statement:
      "Given an m x n matrix board containing 'X' and 'O', capture all regions that are 4-directionally surrounded by 'X'. A region is captured by flipping all 'O's into 'X's in that surrounded region. An 'O' is NOT captured if it is on the border or connected to a border 'O'.",
    difficulty: "Medium",
    pattern: "Boundary-First DFS / In-Place Island Flipping",
    constraints: [
      "m == board.length",
      "n == board[i].length",
      "1 <= m, n <= 200",
      "board[i][j] is 'X' or 'O'."
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(M * N)",
    examples: [
      {
        input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]',
        output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]',
        explanation: "All interior 'O's are captured and flipped to 'X', while bottom 'O' on border is preserved."
      }
    ],
    explanation:
      "Any 'O' connected to the boundary of the board can never be surrounded. We traverse all four outer boundaries of the board and trigger DFS on any 'O' cell, temporarily renaming them to `'E'` (escaped). After checking all boundaries, we iterate through the entire matrix: convert remaining `'O'` to `'X'` (captured), and convert `'E'` back to `'O'` (saved).",
    interviewInsight:
      "Three-pass in-place state transformation (`'O' -> 'E' -> 'X' / 'O'`) solves the problem with zero extra memory allocation.",
    cppSolution: `class Solution {
public:
    void solve(vector<vector<char>>& board) {
        if (board.empty() || board[0].empty()) return;
        int m = board.size(), n = board[0].size();
        
        for (int r = 0; r < m; r++) {
            if (board[r][0] == 'O') dfs(board, r, 0, m, n);
            if (board[r][n - 1] == 'O') dfs(board, r, n - 1, m, n);
        }
        for (int c = 0; c < n; c++) {
            if (board[0][c] == 'O') dfs(board, 0, c, m, n);
            if (board[m - 1][c] == 'O') dfs(board, m - 1, c, m, n);
        }
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (board[r][c] == 'O') board[r][c] = 'X';
                else if (board[r][c] == 'E') board[r][c] = 'O';
            }
        }
    }
    
private:
    void dfs(vector<vector<char>>& b, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || b[r][c] != 'O') return;
        b[r][c] = 'E'; // Mark escaped
        dfs(b, r + 1, c, m, n);
        dfs(b, r - 1, c, m, n);
        dfs(b, r, c + 1, m, n);
        dfs(b, r, c - 1, m, n);
    }
};`,
    pythonSolution: `class Solution:
    def solve(self, board: list[list[str]]) -> None:
        if not board or not board[0]:
            return
        m, n = len(board), len(board[0])
        
        def dfs(r: int, c: int):
            if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != 'O':
                return
            board[r][c] = 'E'
            dfs(r + 1, c)
            dfs(r - 1, c)
            dfs(r, c + 1)
            dfs(r, c - 1)
            
        for r in range(m):
            if board[r][0] == 'O': dfs(r, 0)
            if board[r][n - 1] == 'O': dfs(r, n - 1)
        for c in range(n):
            if board[0][c] == 'O': dfs(0, c)
            if board[m - 1][c] == 'O': dfs(m - 1, c)
            
        for r in range(m):
            for c in range(n):
                if board[r][c] == 'O':
                    board[r][c] = 'X'
                elif board[r][c] == 'E':
                    board[r][c] = 'O'`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q86",
    questionNumber: 86,
    title: "Course Schedule (Cycle Detection in Directed Graph)",
    statement:
      "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses. Otherwise, return false.",
    difficulty: "Medium",
    pattern: "Cycle Detection / Kahn's In-Degree BFS",
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
      "0 <= ai, bi < numCourses",
      "All the pairs prerequisites[i] are unique."
    ],
    expectedTimeComplexity: "O(V + E)",
    expectedSpaceComplexity: "O(V + E)",
    examples: [
      {
        input: "numCourses = 2, prerequisites = [[1,0]]",
        output: "true",
        explanation: "To take course 1 you should have finished course 0. So it is possible."
      },
      {
        input: "numCourses = 2, prerequisites = [[1,0],[0,1]]",
        output: "false",
        explanation: "Circular prerequisite dependency creates a cycle."
      }
    ],
    explanation:
      "Build a directed adjacency list and compute the in-degree of every node. Enqueue all courses with `inDegree == 0`. While the queue is non-empty, dequeue course `u`, increment completed count, and decrement the in-degree of each neighbor `v`. If `v`'s in-degree drops to 0, push `v` to the queue. If total completed courses equals `numCourses`, the graph is a Directed Acyclic Graph (DAG) and all courses can be taken.",
    interviewInsight:
      "Kahn's algorithm detects cycles because nodes involved in cycles will never have their in-degree reach 0 and will never be enqueued.",
    cppSolution: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        int taken = 0;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            taken++;
            
            for (int v : adj[u]) {
                if (--inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }
        return taken == numCourses;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        adj = [[] for _ in range(numCourses)]
        in_degree = [0] * numCourses
        
        for course, prereq in prerequisites:
            adj[prereq].append(course)
            in_degree[course] += 1
            
        q = deque([i for i in range(numCourses) if in_degree[i] == 0])
        taken = 0
        
        while q:
            u = q.popleft()
            taken += 1
            for v in adj[u]:
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    q.append(v)
                    
        return taken == numCourses`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q87",
    questionNumber: 87,
    title: "Course Schedule II (Topological Ordering)",
    statement:
      "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return the ordering of courses you should take to finish all courses. If there are many valid answers, return any of them. If it is impossible to finish all courses, return an empty array.",
    difficulty: "Medium",
    pattern: "Topological Sort / Kahn's Algorithm Ordering",
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= numCourses * (numCourses - 1)",
      "prerequisites[i].length == 2",
      "0 <= ai, bi < numCourses",
      "ai != bi",
      "All the pairs [ai, bi] are distinct."
    ],
    expectedTimeComplexity: "O(V + E)",
    expectedSpaceComplexity: "O(V + E)",
    examples: [
      {
        input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]",
        output: "[0,2,1,3]",
        explanation: "Course 0 must be taken first, followed by 1 and 2, then course 3."
      }
    ],
    explanation:
      "Maintain a result list `order`. Using Kahn's Algorithm, every time a node `u` is popped from the queue with `inDegree == 0`, append `u` to `order`. If the final size of `order == numCourses`, return `order`; otherwise a cycle exists, so return `[]`.",
    interviewInsight:
      "Topological sort linearizes the dependency DAG such that for every directed edge u -> v, u appears before v in the order.",
    cppSolution: `class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        
        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            inDegree[p[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        vector<int> order;
        while (!q.empty()) {
            int u = q.front();
            q.pop();
            order.push_back(u);
            
            for (int v : adj[u]) {
                if (--inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }
        return ((int)order.size() == numCourses) ? order : vector<int>();
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:
        adj = [[] for _ in range(numCourses)]
        in_degree = [0] * numCourses
        
        for course, prereq in prerequisites:
            adj[prereq].append(course)
            in_degree[course] += 1
            
        q = deque([i for i in range(numCourses) if in_degree[i] == 0])
        order = []
        
        while q:
            u = q.popleft()
            order.append(u)
            for v in adj[u]:
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    q.append(v)
                    
        return order if len(order) == numCourses else []`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q88",
    questionNumber: 88,
    title: "Is Graph Bipartite?",
    statement:
      "There is an undirected graph with n nodes, where each node is numbered between 0 and n - 1. You are given a 2D array graph, where graph[u] is an array of nodes that node u is adjacent to. Return true if and only if it is bipartite. A graph is bipartite if the nodes can be partitioned into two independent sets A and B such that every edge in the graph connects a node in set A and a node in set B.",
    difficulty: "Medium",
    pattern: "2-Coloring BFS / Odd-Length Cycle Detection",
    constraints: [
      "graph.length == n",
      "1 <= n <= 100",
      "0 <= graph[u].length < n",
      "0 <= graph[u][i] <= n - 1",
      "graph[u] does not contain u.",
      "The graph may not be connected."
    ],
    expectedTimeComplexity: "O(V + E)",
    expectedSpaceComplexity: "O(V)",
    examples: [
      {
        input: "graph = [[1,2,3],[0,2],[0,1,3],[0,2]]",
        output: "false",
        explanation: "Nodes cannot be divided into two independent sets due to odd cycles."
      },
      {
        input: "graph = [[1,3],[0,2],[1,3],[0,2]]",
        output: "true",
        explanation: "We can divide nodes into sets {0, 2} and {1, 3}."
      }
    ],
    explanation:
      "A graph is bipartite if and only if it contains no odd-length cycles. We use a `color` array initialized to 0 (uncolored). Loop through all nodes (to handle disconnected components). If node `i` is uncolored, color it with 1 and run BFS. For each neighbor `v` of `u`: if `color[v] == 0`, set `color[v] = -color[u]` and enqueue `v`. If `color[v] == color[u]`, a monochromatic conflict occurred, returning `false`.",
    interviewInsight:
      "Always loop from `0` to `n - 1` to trigger BFS on all components, since real-world interview graphs may be disconnected.",
    cppSolution: `class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> color(n, 0); // 0: uncolored, 1: red, -1: blue
        
        for (int i = 0; i < n; i++) {
            if (color[i] != 0) continue;
            
            queue<int> q;
            q.push(i);
            color[i] = 1;
            
            while (!q.empty()) {
                int u = q.front();
                q.pop();
                
                for (int v : graph[u]) {
                    if (color[v] == 0) {
                        color[v] = -color[u];
                        q.push(v);
                    } else if (color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def isBipartite(self, graph: list[list[int]]) -> bool:
        n = len(graph)
        color = [0] * n
        
        for i in range(n):
            if color[i] != 0:
                continue
                
            q = deque([i])
            color[i] = 1
            
            while q:
                u = q.popleft()
                for v in graph[u]:
                    if color[v] == 0:
                        color[v] = -color[u]
                        q.append(v)
                    elif color[v] == color[u]:
                        return False
                        
        return True`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q89",
    questionNumber: 89,
    title: "Number of Connected Components in an Undirected Graph",
    statement:
      "You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph. Return the number of connected components in the graph.",
    difficulty: "Medium",
    pattern: "Disjoint Set Union (DSU) with Path Compression & Rank",
    constraints: [
      "1 <= n <= 2000",
      "1 <= edges.length <= 5000",
      "edges[i].length == 2",
      "0 <= ai <= bi < n",
      "ai != bi",
      "There are no repeated edges."
    ],
    expectedTimeComplexity: "O(E * alpha(V)) practically O(E)",
    expectedSpaceComplexity: "O(V)",
    examples: [
      {
        input: "n = 5, edges = [[0,1],[1,2],[3,4]]",
        output: "2",
        explanation: "Two components: {0, 1, 2} and {3, 4}."
      },
      {
        input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]",
        output: "1",
        explanation: "Single connected component."
      }
    ],
    explanation:
      "Initialize `components = n`. Maintain a DSU parent array `parent[i] = i` and `rank[i] = 1`. For each edge `(u, v)`, find the representative roots of `u` and `v`. If `find(u) != find(v)`, union their sets and decrement `components--`. Return `components`.",
    interviewInsight:
      "DSU with path compression (`parent[x] = find(parent[x])`) and union by rank provides inverse Ackermann runtime $\\mathcal{O}(\\alpha(N))$, outperforming explicit BFS/DFS graph traversals on dynamic edge updates.",
    cppSolution: `class Solution {
    struct DSU {
        vector<int> parent, rank;
        int count;
        DSU(int n) : parent(n), rank(n, 1), count(n) {
            iota(parent.begin(), parent.end(), 0);
        }
        int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }
        bool unite(int x, int y) {
            int rootX = find(x), rootY = find(y);
            if (rootX == rootY) return false;
            if (rank[rootX] < rank[rootY]) swap(rootX, rootY);
            parent[rootY] = rootX;
            if (rank[rootX] == rank[rootY]) rank[rootX]++;
            count--;
            return true;
        }
    };
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        DSU dsu(n);
        for (auto& e : edges) {
            dsu.unite(e[0], e[1]);
        }
        return dsu.count;
    }
};`,
    pythonSolution: `class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [1] * n
        self.count = n
        
    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
        
    def union(self, x: int, y: int) -> bool:
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x == root_y:
            return False
        if self.rank[root_x] < self.rank[root_y]:
            root_x, root_y = root_y, root_x
        self.parent[root_y] = root_x
        if self.rank[root_x] == self.rank[root_y]:
            self.rank[root_x] += 1
        self.count -= 1
        return True

class Solution:
    def countComponents(self, n: int, edges: list[list[int]]) -> int:
        dsu = DSU(n)
        for u, v in edges:
            dsu.union(u, v)
        return dsu.count`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q90",
    questionNumber: 90,
    title: "Redundant Connection",
    statement:
      "In this problem, a tree is an undirected graph that is connected and has no cycles. You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph. Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.",
    difficulty: "Medium",
    pattern: "Union-Find / Cycle-Creating Edge Detection",
    constraints: [
      "n == edges.length",
      "3 <= n <= 1000",
      "edges[i].length == 2",
      "1 <= ai < bi <= edges.length",
      "ai != bi",
      "There are no repeated edges.",
      "The given graph is connected."
    ],
    expectedTimeComplexity: "O(N * alpha(N))",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "edges = [[1,2],[1,3],[2,3]]",
        output: "[2,3]",
        explanation: "Edge [2,3] creates a cycle."
      },
      {
        input: "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]",
        output: "[1,4]",
        explanation: "Removing [1,4] breaks the cycle."
      }
    ],
    explanation:
      "Initialize DSU for nodes 1 to n. Process edges sequentially: for edge `(u, v)`, find their roots. If `find(u) == find(v)`, both nodes already belong to the same connected component, meaning adding `(u, v)` immediately closes a cycle. Since we process edges in given order, this edge is returned immediately.",
    interviewInsight:
      "Kruskal's cycle check principle: An edge whose endpoints already share a common root in DSU is by definition a redundant back-edge creating a cycle.",
    cppSolution: `class Solution {
    struct DSU {
        vector<int> parent;
        DSU(int n) : parent(n + 1) {
            iota(parent.begin(), parent.end(), 0);
        }
        int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }
        bool unite(int x, int y) {
            int rootX = find(x), rootY = find(y);
            if (rootX == rootY) return false;
            parent[rootY] = rootX;
            return true;
        }
    };
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        DSU dsu(n);
        for (auto& e : edges) {
            if (!dsu.unite(e[0], e[1])) {
                return e;
            }
        }
        return {};
    }
};`,
    pythonSolution: `class Solution:
    def findRedundantConnection(self, edges: list[list[int]]) -> list[int]:
        n = len(edges)
        parent = list(range(n + 1))
        
        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
            
        def union(x: int, y: int) -> bool:
            root_x = find(x)
            root_y = find(y)
            if root_x == root_y:
                return False
            parent[root_y] = root_x
            return True
            
        for u, v in edges:
            if not union(u, v):
                return [u, v]
                
        return []`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q91",
    questionNumber: 91,
    title: "Network Delay Time",
    statement:
      "You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target. We will send a signal from a given node k. Return the minimum time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.",
    difficulty: "Medium",
    pattern: "Dijkstra's Single Source Shortest Path with Min-Priority Queue",
    constraints: [
      "1 <= k <= n <= 100",
      "1 <= times.length <= 6000",
      "times[i].length == 3",
      "1 <= ui, vi <= n",
      "ui != vi",
      "0 <= wi <= 100",
      "All the pairs (ui, vi) are unique."
    ],
    expectedTimeComplexity: "O((V + E) log V)",
    expectedSpaceComplexity: "O(V + E)",
    examples: [
      {
        input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2",
        output: "2",
        explanation: "Signal reaches node 1 and 3 in 1 unit, and reaches node 4 in 2 units."
      },
      {
        input: "times = [[1,2,1]], n = 2, k = 2",
        output: "-1",
        explanation: "Signal cannot reach node 1 from node 2."
      }
    ],
    explanation:
      "Maintain a `dist` array initialized to infinity with `dist[k] = 0`. Use a min-priority queue storing `{distance, node}`. Dequeue the closest unvisited node `u`. For each neighbor `v` with edge weight `w`: if `dist[u] + w < dist[v]`, update `dist[v] = dist[u] + w` and push `{dist[v], v}` to the priority queue. The answer is the maximum value in `dist` (if any node remains infinity, return -1).",
    interviewInsight:
      "Always check `if (d > dist[u]) continue;` when popping from priority queue to skip stale entries.",
    cppSolution: `class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (auto& t : times) {
            adj[t[0]].push_back({t[1], t[2]}); // {neighbor, weight}
        }
        
        vector<int> dist(n + 1, INT_MAX);
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        
        dist[k] = 0;
        pq.push({0, k}); // {dist, node}
        
        while (!pq.empty()) {
            auto [d, u] = pq.top();
            pq.pop();
            
            if (d > dist[u]) continue;
            
            for (auto& edge : adj[u]) {
                int v = edge.first, w = edge.second;
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
        
        int maxDelay = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == INT_MAX) return -1;
            maxDelay = max(maxDelay, dist[i]);
        }
        return maxDelay;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def networkDelayTime(self, times: list[list[int]], n: int, k: int) -> int:
        adj = [[] for _ in range(n + 1)]
        for u, v, w in times:
            adj[u].append((v, w))
            
        dist = {i: float('inf') for i in range(1, n + 1)}
        dist[k] = 0
        pq = [(0, k)] # (dist, node)
        
        while pq:
            d, u = heapq.heappop(pq)
            if d > dist[u]:
                continue
                
            for v, w in adj[u]:
                if dist[u] + w < dist[v]:
                    dist[v] = dist[u] + w
                    heapq.heappush(pq, (dist[v], v))
                    
        max_delay = max(dist.values())
        return max_delay if max_delay < float('inf') else -1`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q92",
    questionNumber: 92,
    title: "Graph Valid Tree",
    statement:
      "Given n nodes labeled from 0 to n - 1 and a list of undirected edges (each edge is a pair of nodes), write a function to check whether these edges make up a valid tree.",
    difficulty: "Medium",
    pattern: "Graph Properties (E == V - 1 and Single Connected Component)",
    constraints: [
      "1 <= n <= 2000",
      "0 <= edges.length <= 5000",
      "edges[i].length == 2",
      "0 <= ai, bi < n",
      "ai != bi",
      "There are no self-loops or repeated edges."
    ],
    expectedTimeComplexity: "O(V + E)",
    expectedSpaceComplexity: "O(V)",
    examples: [
      {
        input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
        output: "true",
        explanation: "Graph is connected and has 4 edges (n - 1) with no cycles."
      },
      {
        input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]",
        output: "false",
        explanation: "Graph has a cycle (1-2-3)."
      }
    ],
    explanation:
      "A graph with `n` nodes is a valid tree if and only if: (1) `edges.length == n - 1`, and (2) all `n` nodes form a single connected component (no cycles). If `edges.size() != n - 1`, return false immediately. Run DSU: unite each edge's endpoints. If any edge already connects two nodes in the same set, a cycle exists. If all edges unite successfully and `dsu.count == 1`, return true.",
    interviewInsight:
      "Checking `edges.length == n - 1` first cuts runtime to O(1) for all under-connected or over-connected inputs.",
    cppSolution: `class Solution {
    struct DSU {
        vector<int> parent;
        int count;
        DSU(int n) : parent(n), count(n) {
            iota(parent.begin(), parent.end(), 0);
        }
        int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }
        bool unite(int x, int y) {
            int rootX = find(x), rootY = find(y);
            if (rootX == rootY) return false;
            parent[rootY] = rootX;
            count--;
            return true;
        }
    };
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if ((int)edges.size() != n - 1) return false;
        
        DSU dsu(n);
        for (auto& e : edges) {
            if (!dsu.unite(e[0], e[1])) return false;
        }
        return dsu.count == 1;
    }
};`,
    pythonSolution: `class Solution:
    def validTree(self, n: int, edges: list[list[int]]) -> bool:
        if len(edges) != n - 1:
            return False
            
        parent = list(range(n))
        count = n
        
        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
            
        for u, v in edges:
            root_u = find(u)
            root_v = find(v)
            if root_u == root_v:
                return False
            parent[root_v] = root_u
            count -= 1
            
        return count == 1`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q93",
    questionNumber: 93,
    title: "Cheapest Flights Within K Stops",
    statement:
      "There are n cities connected by some number of flights. You are given an array flights where flights[i] = [fromi, toi, pricei] indicates that there is a flight from city fromi to city toi with cost pricei. You are also given three integers src, dst, and k, return the cheapest price from src to dst with at most k stops. If there is no such route, return -1.",
    difficulty: "Hard",
    pattern: "Modified Bellman-Ford / BFS Level Distance Relaxation",
    constraints: [
      "1 <= n <= 100",
      "0 <= flights.length <= (n * (n - 1) / 2)",
      "flights[i].length == 3",
      "0 <= fromi, toi < n",
      "fromi != toi",
      "1 <= pricei <= 10^4",
      "0 <= src, dst, k < n",
      "src != dst"
    ],
    expectedTimeComplexity: "O(K * E)",
    expectedSpaceComplexity: "O(V)",
    examples: [
      {
        input: "n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1",
        output: "700",
        explanation: "Path [0,1,3] costs 700 with 1 stop. Path [0,1,2,3] costs 400 but has 2 stops."
      }
    ],
    explanation:
      "Use Bellman-Ford algorithm for `k + 1` iterations (since `k` stops equals at most `k + 1` flight segments). Maintain a `prices` array initialized to infinity with `prices[src] = 0`. In each round, create a copy `temp = prices`. For each edge `(u, v, price)`, if `prices[u] != inf`, update `temp[v] = min(temp[v], prices[u] + price)`. Update `prices = temp`. After `k + 1` rounds, return `prices[dst]` if reachable, else `-1`.",
    interviewInsight:
      "Using a temporary snapshot `temp` prevents chaining multiple flight segments within a single iteration round, ensuring exact stop-count bounds.",
    cppSolution: `class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> prices(n, 1e9);
        prices[src] = 0;
        
        for (int i = 0; i <= k; i++) {
            vector<int> temp = prices;
            for (auto& f : flights) {
                int u = f[0], v = f[1], w = f[2];
                if (prices[u] != 1e9 && prices[u] + w < temp[v]) {
                    temp[v] = prices[u] + w;
                }
            }
            prices = temp;
        }
        return (prices[dst] >= 1e9) ? -1 : prices[dst];
    }
};`,
    pythonSolution: `class Solution:
    def findCheapestPrice(self, n: int, flights: list[list[int]], src: int, dst: int, k: int) -> int:
        prices = [float('inf')] * n
        prices[src] = 0
        
        for _ in range(k + 1):
            temp = prices[:]
            for u, v, w in flights:
                if prices[u] != float('inf') and prices[u] + w < temp[v]:
                    temp[v] = prices[u] + w
            prices = temp
            
        return prices[dst] if prices[dst] < float('inf') else -1`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q94",
    questionNumber: 94,
    title: "Accounts Merge",
    statement:
      "Given a list of accounts where each element accounts[i] is a list of strings, where the first element accounts[i][0] is a name, and the rest of the elements are emails representing emails of the account. Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Return the merged accounts with sorted emails and name as the first element.",
    difficulty: "Hard",
    pattern: "Graph Modeling + DSU / Email Component DFS",
    constraints: [
      "1 <= accounts.length <= 1000",
      "2 <= accounts[i].length <= 10",
      "1 <= accounts[i][j].length <= 30",
      "accounts[i][0] consists of English letters.",
      "accounts[i][j] (for j > 0) is a valid email."
    ],
    expectedTimeComplexity: "O(N * L * log(N * L)) where L is email length",
    expectedSpaceComplexity: "O(N * L)",
    examples: [
      {
        input: 'accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]',
        output: '[["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]',
        explanation: "The first two John accounts are merged because they share 'johnsmith@mail.com'."
      }
    ],
    explanation:
      "Map every unique email to a unique integer ID and store `emailToName[email]`. For each account, connect all its emails together in a DSU by unioning the first email with all other emails in that account. Group emails by their DSU root representative, sort emails alphabetically for each group, and prepend the owner's name.",
    interviewInsight:
      "Names cannot be used as DSU keys because different people can share the same name (e.g., two distinct 'John's); emails are the sole universal keys.",
    cppSolution: `class Solution {
    struct DSU {
        vector<int> parent;
        DSU(int n) : parent(n) { iota(parent.begin(), parent.end(), 0); }
        int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }
        void unite(int x, int y) {
            parent[find(y)] = find(x);
        }
    };
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        unordered_map<string, int> emailToId;
        unordered_map<string, string> emailToName;
        int id = 0;
        
        for (auto& acc : accounts) {
            string name = acc[0];
            for (size_t i = 1; i < acc.size(); i++) {
                if (!emailToId.count(acc[i])) {
                    emailToId[acc[i]] = id++;
                    emailToName[acc[i]] = name;
                }
            }
        }
        
        DSU dsu(id);
        for (auto& acc : accounts) {
            int firstId = emailToId[acc[1]];
            for (size_t i = 2; i < acc.size(); i++) {
                dsu.unite(firstId, emailToId[acc[i]]);
            }
        }
        
        unordered_map<int, vector<string>> groups;
        for (auto& [email, emailId] : emailToId) {
            int root = dsu.find(emailId);
            groups[root].push_back(email);
        }
        
        vector<vector<string>> result;
        for (auto& [root, emailList] : groups) {
            sort(emailList.begin(), emailList.end());
            vector<string> merged = {emailToName[emailList[0]]};
            merged.insert(merged.end(), emailList.begin(), emailList.end());
            result.push_back(merged);
        }
        return result;
    }
};`,
    pythonSolution: `class DSU:
    def __init__(self):
        self.parent = {}
    def find(self, x):
        if self.parent.setdefault(x, x) != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    def union(self, x, y):
        self.parent[self.find(y)] = self.find(x)

class Solution:
    def accountsMerge(self, accounts: list[list[str]]) -> list[list[str]]:
        dsu = DSU()
        email_to_name = {}
        
        for acc in accounts:
            name = acc[0]
            first_email = acc[1]
            for email in acc[1:]:
                dsu.union(first_email, email)
                email_to_name[email] = name
                
        groups = {}
        for email in email_to_name:
            root = dsu.find(email)
            groups.setdefault(root, []).append(email)
            
        result = []
        for root, emails in groups.items():
            result.append([email_to_name[root]] + sorted(emails))
        return result`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q95",
    questionNumber: 95,
    title: "Word Ladder",
    statement:
      "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that: (1) Every adjacent pair of words differs by a single letter. (2) Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList. (3) sk == endWord. Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, or 0 if no such sequence exists.",
    difficulty: "Hard",
    pattern: "Shortest Transformation Sequence BFS with Wildcard Map",
    constraints: [
      "1 <= beginWord.length <= 10",
      "endWord.length == beginWord.length",
      "1 <= wordList.length <= 5000",
      "wordList[i].length == beginWord.length",
      "beginWord, endWord, and wordList[i] consist of lowercase English letters.",
      "beginWord != endWord",
      "All the words in wordList are unique."
    ],
    expectedTimeComplexity: "O(M^2 * N) where M is word length, N is word list size",
    expectedSpaceComplexity: "O(M^2 * N)",
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: "5",
        explanation: 'One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> "cog", which is 5 words long.'
      },
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]',
        output: "0",
        explanation: '"cog" is not in wordList, so no valid sequence exists.'
      }
    ],
    explanation:
      "Store words in an `unordered_set<string> wordSet` for O(1) removals. Run BFS starting with `{beginWord, 1}`. For the current word, mutate each of its `M` character positions to all 26 lowercase letters `'a'` through `'z'`. If a mutated candidate matches `endWord`, return `length + 1`. If it exists in `wordSet`, erase it immediately from `wordSet` (to mark visited) and push to the BFS queue.",
    interviewInsight:
      "Erasing words from the hash set at the moment of discovery prevents duplicate visits and eliminates the need for a separate visited set.",
    cppSolution: `class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> words(wordList.begin(), wordList.end());
        if (!words.count(endWord)) return 0;
        
        queue<pair<string, int>> q;
        q.push({beginWord, 1});
        
        while (!q.empty()) {
            auto [curr, steps] = q.front();
            q.pop();
            
            if (curr == endWord) return steps;
            
            for (size_t i = 0; i < curr.size(); i++) {
                char orig = curr[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    curr[i] = c;
                    if (words.count(curr)) {
                        words.erase(curr);
                        q.push({curr, steps + 1});
                    }
                }
                curr[i] = orig;
            }
        }
        return 0;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:
        words = set(wordList)
        if endWord not in words:
            return 0
            
        q = deque([(beginWord, 1)])
        
        while q:
            curr, steps = q.popleft()
            if curr == endWord:
                return steps
                
            for i in range(len(curr)):
                for c in 'abcdefghijklmnopqrstuvwxyz':
                    next_word = curr[:i] + c + curr[i+1:]
                    if next_word in words:
                        words.remove(next_word)
                        q.append((next_word, steps + 1))
                        
        return 0`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q96",
    questionNumber: 96,
    title: "Reconstruct Itinerary (Eulerian Path)",
    statement:
      "You are given a list of airline tickets where tickets[i] = [fromi, toi] represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it. All of the tickets belong to a man who departs from 'JFK', thus, the itinerary must begin with 'JFK'. If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order when read as a single string. You may assume all tickets form at least one valid itinerary.",
    difficulty: "Hard",
    pattern: "Hierholzer's Algorithm for Eulerian Path / Greedy Postorder DFS",
    constraints: [
      "1 <= tickets.length <= 300",
      "tickets[i].length == 2",
      "fromi.length == 3",
      "toi.length == 3",
      "fromi and toi consist of uppercase English letters.",
      "fromi != toi"
    ],
    expectedTimeComplexity: "O(E log E)",
    expectedSpaceComplexity: "O(V + E)",
    examples: [
      {
        input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]',
        output: '["JFK","MUC","LHR","SFO","SJC"]',
        explanation: "All tickets are used in sequence starting at JFK."
      },
      {
        input: 'tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]',
        output: '["JFK","ATL","JFK","SFO","ATL","SFO"]',
        explanation: 'Lexicographically smaller itinerary is preferred.'
      }
    ],
    explanation:
      "This problem reduces to finding an Eulerian path in a directed multigraph. We build an adjacency list where destination airports are stored in a min-heap or multiset (for lexical ordering). We apply Hierholzer's Algorithm: greedily follow the smallest lexical edge popping it from the graph. When a node has no outgoing edges remaining, push it to the `route` stack. Finally, reverse `route`.",
    interviewInsight:
      "Hierholzer's algorithm ensures that dead-end nodes are pushed onto the postorder stack first, guaranteeing complete Eulerian traversal without premature termination.",
    cppSolution: `class Solution {
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        unordered_map<string, multiset<string>> adj;
        for (auto& t : tickets) {
            adj[t[0]].insert(t[1]);
        }
        
        vector<string> route;
        dfs("JFK", adj, route);
        reverse(route.begin(), route.end());
        return route;
    }
    
private:
    void dfs(string airport, unordered_map<string, multiset<string>>& adj, vector<string>& route) {
        while (!adj[airport].empty()) {
            string nextAirport = *adj[airport].begin();
            adj[airport].erase(adj[airport].begin());
            dfs(nextAirport, adj, route);
        }
        route.push_back(airport);
    }
};`,
    pythonSolution: `from collections import defaultdict

class Solution:
    def findItinerary(self, tickets: list[list[str]]) -> list[str]:
        adj = defaultdict(list)
        for src, dst in sorted(tickets, reverse=True):
            adj[src].append(dst)
            
        route = []
        def dfs(airport: str):
            while adj[airport]:
                next_airport = adj[airport].pop()
                dfs(next_airport)
            route.append(airport)
            
        dfs("JFK")
        return route[::-1]`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q97",
    questionNumber: 97,
    title: "Alien Dictionary",
    statement:
      "There is a new alien language that uses the English alphabet. However, the order among letters is unknown to you. You are given a list of strings words from the alien language's dictionary, where the strings in words are sorted lexicographically by the rules of this new language. Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If there is no solution, return \"\". If there are multiple solutions, return any of them.",
    difficulty: "Hard",
    pattern: "Topological Sort / Dependency DAG with Prefix Invalidation",
    constraints: [
      "1 <= words.length <= 100",
      "1 <= words[i].length <= 100",
      "words[i] consists of only lowercase English letters."
    ],
    expectedTimeComplexity: "O(C) where C is total characters across all words",
    expectedSpaceComplexity: "O(U + E) where U is unique characters (<= 26)",
    examples: [
      {
        input: 'words = ["wrt","wrf","er","ett","rftt"]',
        output: '"wertf"',
        explanation: 'Letters ordered by Alien Dictionary: w -> e -> r -> t -> f.'
      },
      {
        input: 'words = ["z","x","z"]',
        output: '""',
        explanation: 'Cycle detected: z -> x -> z, invalid dictionary order.'
      }
    ],
    explanation:
      "Compare adjacent word pairs `words[i]` and `words[i+1]`. Find the first differing character `w1[j] != w2[j]`, adding directed edge `w1[j] -> w2[j]` and incrementing in-degree of `w2[j]`. Corner case: If `w2` is a strict prefix of `w1` (e.g. `['abc', 'ab']`), the dictionary is inherently invalid -> return `\"\"`. Run Kahn's topological sort on the character graph. If topological order length equals unique character count, return the string; otherwise return `\"\"`.",
    interviewInsight:
      "Crucial edge case: If a longer word appears before its prefix (e.g. `[\"apple\", \"app\"]`), the list is invalid and MUST return `\"\"` immediately.",
    cppSolution: `class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> inDegree;
        
        for (const string& w : words) {
            for (char c : w) inDegree[c] = 0;
        }
        
        for (size_t i = 0; i < words.size() - 1; i++) {
            string w1 = words[i], w2 = words[i + 1];
            if (w1.size() > w2.size() && w1.substr(0, w2.size()) == w2) return "";
            
            for (size_t j = 0; j < min(w1.size(), w2.size()); j++) {
                if (w1[j] != w2[j]) {
                    if (!adj[w1[j]].count(w2[j])) {
                        adj[w1[j]].insert(w2[j]);
                        inDegree[w2[j]]++;
                    }
                    break;
                }
            }
        }
        
        queue<char> q;
        for (auto& [c, deg] : inDegree) {
            if (deg == 0) q.push(c);
        }
        
        string order = "";
        while (!q.empty()) {
            char u = q.front();
            q.pop();
            order += u;
            
            for (char v : adj[u]) {
                if (--inDegree[v] == 0) {
                    q.push(v);
                }
            }
        }
        
        return (order.size() == inDegree.size()) ? order : "";
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def alienOrder(self, words: list[str]) -> str:
        adj = {c: set() for w in words for c in w}
        in_degree = {c: 0 for w in words for c in w}
        
        for i in range(len(words) - 1):
            w1, w2 = words[i], words[i + 1]
            if len(w1) > len(w2) and w1.startswith(w2):
                return ""
                
            for c1, c2 in zip(w1, w2):
                if c1 != c2:
                    if c2 not in adj[c1]:
                        adj[c1].add(c2)
                        in_degree[c2] += 1
                    break
                    
        q = deque([c for c in in_degree if in_degree[c] == 0])
        order = []
        
        while q:
            u = q.popleft()
            order.append(u)
            for v in adj[u]:
                in_degree[v] -= 1
                if in_degree[v] == 0:
                    q.append(v)
                    
        return "".join(order) if len(order) == len(in_degree) else ""`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q98",
    questionNumber: 98,
    title: "Word Ladder II (All Shortest Transformation Paths)",
    statement:
      "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk. Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words [beginWord, s1, s2, ..., sk].",
    difficulty: "Hard",
    pattern: "Layered BFS Predecessor Graph Construction + Backtracking DFS",
    constraints: [
      "1 <= beginWord.length <= 5",
      "endWord.length == beginWord.length",
      "1 <= wordList.length <= 500",
      "wordList[i].length == beginWord.length",
      "All words consist of lowercase English letters.",
      "All the words in wordList are unique."
    ],
    expectedTimeComplexity: "O(N * K + Total Paths)",
    expectedSpaceComplexity: "O(N * K)",
    examples: [
      {
        input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]',
        output: '[["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]',
        explanation: "There are 2 shortest transformation paths of length 5."
      }
    ],
    explanation:
      "Step 1: Run layer-by-layer BFS from `beginWord` to record shortest distance `dist[word]` and build parents map `parents[child] = {parents}`. Remove words from `wordSet` only AFTER an entire BFS level completes so parallel shortest branches are preserved. Step 2: Backtrack using DFS starting from `endWord` back to `beginWord` using `parents` map to assemble all shortest path sequences.",
    interviewInsight:
      "Deferred level-wise removal from dictionary is required to allow multiple nodes in the same level to connect to the same parent without redundant exploration.",
    cppSolution: `class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return {};
        
        unordered_map<string, vector<string>> parents;
        unordered_set<string> currentLevel = {beginWord};
        dict.erase(beginWord);
        bool found = false;
        
        while (!currentLevel.empty() && !found) {
            unordered_set<string> nextLevel;
            for (const string& w : currentLevel) dict.erase(w);
            
            for (const string& w : currentLevel) {
                string temp = w;
                for (size_t i = 0; i < temp.size(); i++) {
                    char orig = temp[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        temp[i] = c;
                        if (dict.count(temp)) {
                            if (temp == endWord) found = true;
                            nextLevel.insert(temp);
                            parents[temp].push_back(w);
                        }
                    }
                    temp[i] = orig;
                }
            }
            currentLevel = nextLevel;
        }
        
        vector<vector<string>> results;
        if (found) {
            vector<string> path = {endWord};
            backtrack(endWord, beginWord, parents, path, results);
        }
        return results;
    }
    
private:
    void backtrack(const string& curr, const string& beginWord, unordered_map<string, vector<string>>& parents, vector<string>& path, vector<vector<string>>& results) {
        if (curr == beginWord) {
            vector<string> r = path;
            reverse(r.begin(), r.end());
            results.push_back(r);
            return;
        }
        for (const string& p : parents[curr]) {
            path.push_back(p);
            backtrack(p, beginWord, parents, path, results);
            path.pop_back();
        }
    }
};`,
    pythonSolution: `from collections import defaultdict

class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: list[str]) -> list[list[str]]:
        word_set = set(wordList)
        if endWord not in word_set:
            return []
            
        parents = defaultdict(list)
        current_level = {beginWord}
        word_set.discard(beginWord)
        found = False
        
        while current_level and not found:
            word_set -= current_level
            next_level = set()
            for word in current_level:
                for i in range(len(word)):
                    for c in 'abcdefghijklmnopqrstuvwxyz':
                        cand = word[:i] + c + word[i+1:]
                        if cand in word_set:
                            if cand == endWord:
                                found = True
                            next_level.add(cand)
                            parents[cand].append(word)
            current_level = next_level
            
        results = []
        def backtrack(curr: str, path: list[str]):
            if curr == beginWord:
                results.append(path[::-1])
                return
            for p in parents[curr]:
                backtrack(p, path + [p])
                
        if found:
            backtrack(endWord, [endWord])
        return results`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q99",
    questionNumber: 99,
    title: "Critical Connections in a Network (Tarjan's Bridge Algorithm)",
    statement:
      "There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents a connection between servers ai and bi. Any server can reach other servers directly or indirectly through the network. A critical connection is a connection that, if removed, will make some servers unable to reach other servers. Return all critical connections in the network in any order.",
    difficulty: "Extreme",
    pattern: "Tarjan's Bridge-Finding Algorithm with Low-Link Values & Discovery Times",
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
        explanation: "[1,3] is the only bridge; removing it disconnects server 3 from the rest."
      }
    ],
    explanation:
      "An edge `(u, v)` is a critical bridge iff `low[v] > discovery[u]`, meaning node `v` and its descendants have no back-edges reaching `u` or ancestors of `u`. We maintain `discovery[u]` (timestamp when `u` was first visited) and `low[u]` (lowest discovery time reachable from `u` via back-edges). In DFS: for neighbor `v` (excluding immediate parent), if `v` is unvisited, recurse on `v`, update `low[u] = min(low[u], low[v])`. If `low[v] > discovery[u]`, edge `(u, v)` is a bridge. If `v` is visited, update `low[u] = min(low[u], discovery[v])`.",
    interviewInsight:
      "Tarjan's algorithm solves bridge finding in a single linear O(V + E) pass without brute-force edge removal testing.",
    cppSolution: `class Solution {
public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>> adj(n);
        for (auto& c : connections) {
            adj[c[0]].push_back(c[1]);
            adj[c[1]].push_back(c[0]);
        }
        
        vector<int> disc(n, -1), low(n, -1);
        vector<vector<int>> bridges;
        int timer = 0;
        
        dfs(0, -1, timer, adj, disc, low, bridges);
        return bridges;
    }
    
private:
    void dfs(int u, int p, int& timer, vector<vector<int>>& adj, vector<int>& disc, vector<int>& low, vector<vector<int>>& bridges) {
        disc[u] = low[u] = ++timer;
        
        for (int v : adj[u]) {
            if (v == p) continue;
            
            if (disc[v] != -1) {
                low[u] = min(low[u], disc[v]);
            } else {
                dfs(v, u, timer, adj, disc, low, bridges);
                low[u] = min(low[u], low[v]);
                if (low[v] > disc[u]) {
                    bridges.push_back({u, v});
                }
            }
        }
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
            
        disc = [-1] * n
        low = [-1] * n
        bridges = []
        timer = 0
        
        def dfs(u: int, p: int):
            nonlocal timer
            timer += 1
            disc[u] = low[u] = timer
            
            for v in adj[u]:
                if v == p:
                    continue
                if disc[v] != -1:
                    low[u] = min(low[u], disc[v])
                else:
                    dfs(v, u)
                    low[u] = min(low[u], low[v])
                    if low[v] > disc[u]:
                        bridges.append([u, v])
                        
        dfs(0, -1)
        return bridges`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  },
  {
    id: "Q100",
    questionNumber: 100,
    title: "Shortest Path Visiting All Nodes",
    statement:
      "You have an undirected, connected graph of n nodes labeled from 0 to n - 1. You are given an array graph where graph[i] is a list of all the nodes connected with node i by an edge. Return the length of the shortest path that visits every node. You may start and stop at any node, you may revisit nodes multiple times, and you may reuse edges.",
    difficulty: "Extreme",
    pattern: "State-Space BFS with Bitmask (node, visited_mask)",
    constraints: [
      "n == graph.length",
      "1 <= n <= 12",
      "0 <= graph[i].length < n",
      "graph[i] does not contain i.",
      "The graph is connected."
    ],
    expectedTimeComplexity: "O(N * 2^N)",
    expectedSpaceComplexity: "O(N * 2^N)",
    examples: [
      {
        input: "graph = [[1,2,3],[0],[0],[0]]",
        output: "4",
        explanation: "One shortest path is [1,0,2,0,3] which has 4 edges."
      },
      {
        input: "graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]",
        output: "4",
        explanation: "One shortest path is [0,1,4,2,3] which has 4 edges."
      }
    ],
    explanation:
      "Since `n <= 12`, represent the set of visited nodes using a bitmask of `n` bits. Target state is `all_visited = (1 << n) - 1`. Initialize a multi-source BFS queue with all possible starting states `(i, 1 << i, 0)` for `i` from `0` to `n - 1`. Maintain a `visited[node][mask]` matrix. At each BFS step, transition to neighbor `v` with new mask `next_mask = mask | (1 << v)`. The first state that satisfies `next_mask == all_visited` is guaranteed to have minimal path length.",
    interviewInsight:
      "Representing state as `(current_node, visited_bitmask)` transforms a non-polynomial TSP problem into an exact O(N * 2^N) state-space BFS.",
    cppSolution: `class Solution {
public:
    int shortestPathLength(vector<vector<int>>& graph) {
        int n = graph.size();
        if (n == 1) return 0;
        
        int allVisited = (1 << n) - 1;
        queue<tuple<int, int, int>> q; // {node, mask, dist}
        vector<vector<bool>> visited(n, vector<bool>(1 << n, false));
        
        for (int i = 0; i < n; i++) {
            q.push({i, 1 << i, 0});
            visited[i][1 << i] = true;
        }
        
        while (!q.empty()) {
            auto [u, mask, dist] = q.front();
            q.pop();
            
            for (int v : graph[u]) {
                int nextMask = mask | (1 << v);
                if (nextMask == allVisited) {
                    return dist + 1;
                }
                
                if (!visited[v][nextMask]) {
                    visited[v][nextMask] = true;
                    q.push({v, nextMask, dist + 1});
                }
            }
        }
        return 0;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def shortestPathLength(self, graph: list[list[int]]) -> int:
        n = len(graph)
        if n == 1:
            return 0
            
        all_visited = (1 << n) - 1
        q = deque([(i, 1 << i, 0) for i in range(n)]) # (node, mask, dist)
        visited = {(i, 1 << i) for i in range(n)}
        
        while q:
            u, mask, dist = q.popleft()
            for v in graph[u]:
                next_mask = mask | (1 << v)
                if next_mask == all_visited:
                    return dist + 1
                    
                if (v, next_mask) not in visited:
                    visited.add((v, next_mask))
                    q.append((v, next_mask, dist + 1))
                    
        return 0`,
    topic: "Graphs, BFS, DFS & Graph Algorithms",
    batch: 5
  }
];
