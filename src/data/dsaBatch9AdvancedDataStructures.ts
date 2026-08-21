import { DSAInterviewProblem } from "./dsaQuestionTypes.js";

export const DSA_BATCH_9_ADVANCED_DATA_STRUCTURES: DSAInterviewProblem[] = [
  {
    id: "Q161",
    questionNumber: 161,
    title: "Range Sum Query - Mutable (Binary Indexed Tree / Fenwick Tree)",
    statement:
      "Given an integer array nums, handle two types of queries:\n1. Update the value of an element in nums at index index to val.\n2. Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.\n\nImplement the NumArray class:\n- NumArray(int[] nums) Initializes the object with the integer array nums.\n- void update(int index, int val) Updates the value of nums[index] to be val.\n- int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).",
    difficulty: "Medium",
    pattern: "Binary Indexed Tree (Fenwick Tree) / Prefix Sum Structure",
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-100 <= nums[i] <= 100",
      "0 <= index < nums.length",
      "-100 <= val <= 100",
      "0 <= left <= right < nums.length",
      "At most 3 * 10^4 calls will be made to update and sumRange."
    ],
    expectedTimeComplexity: "O(log N) per update and sumRange, O(N) build",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "[\"NumArray\",\"sumRange\",\"update\",\"sumRange\"], [[[1,3,5]],[0,2],[1,2],[0,2]]",
        output: "[null,9,null,8]",
        explanation: "sumRange(0, 2) -> 1+3+5=9. update(1, 2) -> nums becomes [1,2,5]. sumRange(0, 2) -> 1+2+5=8."
      }
    ],
    explanation:
      "### Binary Indexed Tree (Fenwick Tree) Invariant\nA Fenwick tree stores partial prefix sums in an array `bit` of size $N + 1$ (1-indexed).\n- Least Significant Bit: `lsb(i) = i & (-i)`.\n- Query `query(i)`: Sums partial blocks by descending `i -= i & (-i)` in $O(\\log N)$.\n- Update `add(i, delta)`: Propagates point increments to covering parent intervals by ascending `i += i & (-i)` in $O(\\log N)$.\n- `sumRange(left, right) = query(right + 1) - query(left)`.",
    interviewInsight:
      "Fenwick Trees require half the memory and significantly lower constant factor overhead compared to standard Segment Trees when only point updates and prefix sums are needed.",
    cppSolution: `class NumArray {
    int n;
    vector<int> bit;
    vector<int> original;

    void add(int i, int delta) {
        for (; i <= n; i += i & (-i)) bit[i] += delta;
    }

    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & (-i)) sum += bit[i];
        return sum;
    }

public:
    NumArray(vector<int>& nums) {
        n = nums.size();
        original = nums;
        bit.assign(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            add(i + 1, nums[i]);
        }
    }
    
    void update(int index, int val) {
        int delta = val - original[index];
        original[index] = val;
        add(index + 1, delta);
    }
    
    int sumRange(int left, int right) {
        return query(right + 1) - query(left);
    }
};`,
    pythonSolution: `class NumArray:
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.nums = list(nums)
        self.bit = [0] * (self.n + 1)
        for i, val in enumerate(nums):
            self._add(i + 1, val)

    def _add(self, i: int, delta: int):
        while i <= self.n:
            self.bit[i] += delta
            i += i & (-i)

    def _query(self, i: int) -> int:
        total = 0
        while i > 0:
            total += self.bit[i]
            i -= i & (-i)
        return total

    def update(self, index: int, val: int) -> None:
        delta = val - self.nums[index]
        self.nums[index] = val
        self._add(index + 1, delta)

    def sumRange(self, left: int, right: int) -> int:
        return self._query(right + 1) - self._query(left)`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q162",
    questionNumber: 162,
    title: "Range Minimum Query with Point Updates (Segment Tree)",
    statement:
      "Design a dynamic range query data structure for an integer array nums of size n supporting two operations:\n1. update(index, val): Set nums[index] = val.\n2. queryMin(left, right): Return the minimum value among nums[left...right] inclusive.\n\nAll operations must execute in O(log N) time.",
    difficulty: "Hard",
    pattern: "Segment Tree / Dynamic Range Minimum Query",
    constraints: [
      "1 <= n <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "0 <= left <= right < n",
      "Up to 10^5 update and query calls."
    ],
    expectedTimeComplexity: "O(log N) per query and update, O(N) build",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "nums = [2, 5, 1, 4, 9, 3], queryMin(1, 4), update(2, 8), queryMin(1, 4)",
        output: "[1, 4]",
        explanation: "nums[1..4] = [5, 1, 4, 9], min is 1. After setting index 2 to 8, nums becomes [2, 5, 8, 4, 9, 3]. queryMin(1, 4) gives min(5, 8, 4, 9) = 4."
      }
    ],
    explanation:
      "### Segment Tree Divide & Conquer\nA complete binary tree of size $4N$ represents intervals `[l, r]`:\n- Leaf nodes represent single array elements `[i, i]`.\n- Internal node `node` at interval `[l, r]` stores `tree[node] = min(tree[2*node], tree[2*node + 1])`.\n- Point update `update(node, l, r, idx, val)`: Descends to leaf `idx`, updates value, and pulls minimum back up the recursion tree.\n- Range query `query(node, l, r, ql, qr)`: If `[l, r]` falls completely inside `[ql, qr]`, return `tree[node]`. If disjoint, return $\\infty$. Else split and return `min(left_child, right_child)`.",
    interviewInsight:
      "Segment trees generalize to arbitrary associative algebraic monoids (sum, min, max, GCD, matrix multiplication).",
    cppSolution: `class SegmentTreeRMQ {
    int n;
    vector<int> tree;

    void build(const vector<int>& nums, int node, int l, int r) {
        if (l == r) {
            tree[node] = nums[l];
            return;
        }
        int mid = l + (r - l) / 2;
        build(nums, 2 * node, l, mid);
        build(nums, 2 * node + 1, mid + 1, r);
        tree[node] = min(tree[2 * node], tree[2 * node + 1]);
    }

    void update(int node, int l, int r, int idx, int val) {
        if (l == r) {
            tree[node] = val;
            return;
        }
        int mid = l + (r - l) / 2;
        if (idx <= mid) update(2 * node, l, mid, idx, val);
        else update(2 * node + 1, mid + 1, r, idx, val);
        tree[node] = min(tree[2 * node], tree[2 * node + 1]);
    }

    int query(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node];
        if (r < ql || l > qr) return 2e9;
        int mid = l + (r - l) / 2;
        return min(query(2 * node, l, mid, ql, qr), query(2 * node + 1, mid + 1, r, ql, qr));
    }

public:
    SegmentTreeRMQ(const vector<int>& nums) {
        n = nums.size();
        tree.assign(4 * n, 2e9);
        build(nums, 1, 0, n - 1);
    }

    void update(int idx, int val) {
        update(1, 0, n - 1, idx, val);
    }

    int queryMin(int ql, int qr) {
        return query(1, 0, n - 1, ql, qr);
    }
};`,
    pythonSolution: `class SegmentTreeRMQ:
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.tree = [float('inf')] * (4 * self.n)
        self._build(nums, 1, 0, self.n - 1)

    def _build(self, nums: list[int], node: int, l: int, r: int):
        if l == r:
            self.tree[node] = nums[l]
            return
        mid = (l + r) // 2
        self._build(nums, 2 * node, l, mid)
        self._build(nums, 2 * node + 1, mid + 1, r)
        self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])

    def update(self, idx: int, val: int, node: int = 1, l: int = 0, r: int = None):
        if r is None: r = self.n - 1
        if l == r:
            self.tree[node] = val
            return
        mid = (l + r) // 2
        if idx <= mid:
            self.update(idx, val, 2 * node, l, mid)
        else:
            self.update(idx, val, 2 * node + 1, mid + 1, r)
        self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])

    def queryMin(self, ql: int, qr: int, node: int = 1, l: int = 0, r: int = None) -> int:
        if r is None: r = self.n - 1
        if ql <= l and r <= qr:
            return self.tree[node]
        if r < ql or l > qr:
            return float('inf')
        mid = (l + r) // 2
        return min(self.queryMin(ql, qr, 2 * node, l, mid),
                   self.queryMin(ql, qr, 2 * node + 1, mid + 1, r))`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q163",
    questionNumber: 163,
    title: "Maximum XOR of Two Numbers in an Array (Binary Trie)",
    statement:
      "Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < nums.length.",
    difficulty: "Hard",
    pattern: "Binary (Bitwise) Trie / Greedy Prefix Exploration",
    constraints: [
      "1 <= nums.length <= 2 * 10^5",
      "0 <= nums[i] <= 2^31 - 1"
    ],
    expectedTimeComplexity: "O(31 * N)",
    expectedSpaceComplexity: "O(31 * N)",
    examples: [
      {
        input: "nums = [3,10,5,25,2,8]",
        output: "28",
        explanation: "The maximum result is 5 XOR 25 = 28 (00101 XOR 11001 = 11100)."
      },
      {
        input: "nums = [14,70,53,83,49,91,36,80,92,51,66,70]",
        output: "127"
      }
    ],
    explanation:
      "### Bitwise Trie Architecture\nTo maximize $A \\oplus B$, for each bit from 30 down to 0, we want the bits of $A$ and $B$ to differ ($1 \\oplus 0 = 1$).\n1. Insert all numbers into a Binary Trie where each node has children `child[0]` and `child[1]`.\n2. For each number $x$ in `nums`:\n   - Start at the Trie root.\n   - For bit position $b = 30, 29, \\dots, 0$:\n     Extract bit $bit = (x >> b) \\& 1$.\n     Opposite bit is $t = 1 - bit$.\n     If child $t$ exists, take path $t$ and add $2^b$ to current XOR sum.\n     Else take path $bit$.\n3. Return the maximum XOR found across all elements.",
    interviewInsight:
      "Bitwise Tries allow solving maximum XOR pair, subarray XOR, and range XOR constraints in linear $O(32 N)$ time.",
    cppSolution: `class Solution {
    struct TrieNode {
        TrieNode* children[2] = {nullptr, nullptr};
    };

    TrieNode* root = new TrieNode();

    void insert(int num) {
        TrieNode* curr = root;
        for (int i = 30; i >= 0; --i) {
            int bit = (num >> i) & 1;
            if (!curr->children[bit]) {
                curr->children[bit] = new TrieNode();
            }
            curr = curr->children[bit];
        }
    }

    int getMaxXor(int num) {
        TrieNode* curr = root;
        int maxXor = 0;
        for (int i = 30; i >= 0; --i) {
            int bit = (num >> i) & 1;
            int opp = 1 - bit;
            if (curr->children[opp]) {
                maxXor |= (1 << i);
                curr = curr->children[opp];
            } else {
                curr = curr->children[bit];
            }
        }
        return maxXor;
    }

public:
    int findMaximumXOR(vector<int>& nums) {
        for (int x : nums) insert(x);
        int ans = 0;
        for (int x : nums) {
            ans = max(ans, getMaxXor(x));
        }
        return ans;
    }
};`,
    pythonSolution: `class TrieNode:
    def __init__(self):
        self.children = [None, None]

class Solution:
    def findMaximumXOR(self, nums: list[int]) -> int:
        root = TrieNode()
        
        for num in nums:
            curr = root
            for i in range(30, -1, -1):
                bit = (num >> i) & 1
                if not curr.children[bit]:
                    curr.children[bit] = TrieNode()
                curr = curr.children[bit]
                
        ans = 0
        for num in nums:
            curr = root
            max_xor = 0
            for i in range(30, -1, -1):
                bit = (num >> i) & 1
                opp = 1 - bit
                if curr.children[opp]:
                    max_xor |= (1 << i)
                    curr = curr.children[opp]
                else:
                    curr = curr.children[bit]
            ans = max(ans, max_xor)
            
        return ans`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q164",
    questionNumber: 164,
    title: "Count of Smaller Numbers After Self",
    statement:
      "Given an integer array nums, return an integer array counts where counts[i] is the number of smaller elements to the right of nums[i].",
    difficulty: "Hard",
    pattern: "Fenwick Tree (BIT) + Coordinate Compression / Inversion Counting",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "nums = [5,2,6,1]",
        output: "[2,1,1,0]",
        explanation: "To the right of 5 there are 2 smaller elements (2 and 1).\nTo the right of 2 there is only 1 smaller element (1).\nTo the right of 6 there is 1 smaller element (1).\nTo the right of 1 there is 0 smaller element."
      },
      {
        input: "nums = [-1,-1]",
        output: "[0,0]"
      }
    ],
    explanation:
      "### Reverse Traversal + Coordinate Compressed BIT\n1. Find sorted unique values of `nums` to assign discrete ranks $1, 2, \\dots, M$ (coordinate compression).\n2. Maintain a Fenwick tree of size $M$ recording frequencies of numbers seen so far.\n3. Iterate `nums` in **reverse order** from index $N-1$ down to 0:\n   - Let rank $r = \\text{rank}(nums[i])$.\n   - Count of smaller elements to the right is the prefix sum `query(r - 1)`.\n   - Store answer `counts[i] = query(r - 1)`.\n   - Increment frequency of rank $r$ via `add(r, 1)`.\n4. Every operation executes in $O(\\log M)$ time.",
    interviewInsight:
      "Inversion counting problems are solved either via Merge Sort index tracking or Reverse Fenwick Tree with rank compression.",
    cppSolution: `class Solution {
public:
    vector<int> countSmaller(vector<int>& nums) {
        int n = nums.size();
        vector<int> sortedVals = nums;
        sort(sortedVals.begin(), sortedVals.end());
        sortedVals.erase(unique(sortedVals.begin(), sortedVals.end()), sortedVals.end());
        
        int m = sortedVals.size();
        vector<int> bit(m + 1, 0);
        
        auto add = [&](int i, int delta) {
            for (; i <= m; i += i & (-i)) bit[i] += delta;
        };
        
        auto query = [&](int i) -> int {
            int sum = 0;
            for (; i > 0; i -= i & (-i)) sum += bit[i];
            return sum;
        };
        
        vector<int> ans(n);
        for (int i = n - 1; i >= 0; --i) {
            int rank = lower_bound(sortedVals.begin(), sortedVals.end(), nums[i]) - sortedVals.begin() + 1;
            ans[i] = query(rank - 1);
            add(rank, 1);
        }
        return ans;
    }
};`,
    pythonSolution: `import bisect

class Solution:
    def countSmaller(self, nums: list[int]) -> list[int]:
        sorted_vals = sorted(list(set(nums)))
        m = len(sorted_vals)
        bit = [0] * (m + 1)
        
        def add(i: int, delta: int):
            while i <= m:
                bit[i] += delta
                i += i & (-i)
                
        def query(i: int) -> int:
            total = 0
            while i > 0:
                total += bit[i]
                i -= i & (-i)
            return total
            
        ans = [0] * len(nums)
        for i in range(len(nums) - 1, -1, -1):
            rank = bisect.bisect_left(sorted_vals, nums[i]) + 1
            ans[i] = query(rank - 1)
            add(rank, 1)
            
        return ans`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q165",
    questionNumber: 165,
    title: "K-th Ancestor of a Tree Node (Binary Lifting)",
    statement:
      "You are given a tree with n nodes numbered from 0 to n - 1 in the form of a parent array parent where parent[i] is the parent of ith node. The root of the tree is node 0.\n\nFind the kth ancestor of a given node. The kth ancestor of a tree node is the kth node in the path that leads from that node to the root.\n\nImplement the TreeAncestor class:\n- TreeAncestor(int n, int[] parent) Initializes the object with the number of nodes in the tree and the parent array.\n- int getKthAncestor(int node, int k) return the kth ancestor of the given node. If there is no such ancestor, return -1.",
    difficulty: "Hard",
    pattern: "Binary Lifting / Doubling DP Jump Tables",
    constraints: [
      "1 <= k <= n <= 5 * 10^4",
      "parent[0] == -1",
      "0 <= parent[i] < n for all 0 < i < n",
      "0 <= node < n",
      "At most 5 * 10^4 calls will be made to getKthAncestor."
    ],
    expectedTimeComplexity: "O(N log N) preprocessing, O(log K) per query",
    expectedSpaceComplexity: "O(N log N)",
    examples: [
      {
        input: "[\"TreeAncestor\",\"getKthAncestor\",\"getKthAncestor\",\"getKthAncestor\"], [[7,[-1,0,0,1,1,2,2]],[3,1],[5,2],[6,3]]",
        output: "[null,1,0,-1]",
        explanation: "3's 1st ancestor is 1. 5's 2nd ancestor is 0. 6's 3rd ancestor does not exist (-1)."
      }
    ],
    explanation:
      "### Binary Lifting Jump Table\nLet `up[node][j]` denote the $2^j$-th ancestor of `node`.\n- Base case: `up[node][0] = parent[node]`.\n- Dynamic Programming: `up[node][j] = up[up[node][j-1]][j-1]` (jumping $2^j$ steps is two $2^{j-1}$ jumps).\n- Max jump power: $L = \\lceil \\log_2 N \\rceil \\approx 16$.\n- Query `getKthAncestor(node, k)`: Decompose $k$ into binary bits. For bit $j$ where $(k >> j) \\& 1 == 1$, set `node = up[node][j]`. If `node == -1`, return -1 immediately.",
    interviewInsight:
      "Binary lifting is the fundamental building block for $O(\\log N)$ Lowest Common Ancestor (LCA) and tree path aggregation queries.",
    cppSolution: `class TreeAncestor {
    int LOG;
    vector<vector<int>> up;

public:
    TreeAncestor(int n, vector<int>& parent) {
        LOG = 17; // 2^16 = 65536 > 50000
        up.assign(n, vector<int>(LOG, -1));
        
        for (int i = 0; i < n; ++i) {
            up[i][0] = parent[i];
        }
        
        for (int j = 1; j < LOG; ++j) {
            for (int i = 0; i < n; ++i) {
                if (up[i][j - 1] != -1) {
                    up[i][j] = up[up[i][j - 1]][j - 1];
                }
            }
        }
    }
    
    int getKthAncestor(int node, int k) {
        for (int j = 0; j < LOG; ++j) {
            if ((k >> j) & 1) {
                node = up[node][j];
                if (node == -1) return -1;
            }
        }
        return node;
    }
};`,
    pythonSolution: `class TreeAncestor:
    def __init__(self, n: int, parent: list[int]):
        self.LOG = 17
        self.up = [[-1] * self.LOG for _ in range(n)]
        
        for i in range(n):
            self.up[i][0] = parent[i]
            
        for j in range(1, self.LOG):
            for i in range(n):
                if self.up[i][j - 1] != -1:
                    self.up[i][j] = self.up[self.up[i][j - 1]][j - 1]

    def getKthAncestor(self, node: int, k: int) -> int:
        for j in range(self.LOG):
            if (k >> j) & 1:
                node = self.up[node][j]
                if node == -1:
                    return -1
        return node`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q166",
    questionNumber: 166,
    title: "Lowest Common Ancestor via Binary Lifting & Tree Depth",
    statement:
      "Given a rooted tree of n nodes (0 to n - 1) with root at node 0 and an array of directed parent edges, process multiple queries asking for the Lowest Common Ancestor (LCA) of two given nodes u and v.\n\nImplement an LCA solver capable of answering each query in O(log N) time with O(N log N) preprocessing.",
    difficulty: "Hard",
    pattern: "Binary Lifting LCA / Tree Depth Equalization",
    constraints: [
      "1 <= n <= 10^5",
      "Tree is connected and valid.",
      "1 <= queries.length <= 10^5"
    ],
    expectedTimeComplexity: "O(N log N) build, O(log N) per LCA query",
    expectedSpaceComplexity: "O(N log N)",
    examples: [
      {
        input: "n = 5, edges = [[0,1],[0,2],[1,3],[1,4]], query: LCA(3, 4), LCA(3, 2)",
        output: "[1, 0]",
        explanation: "LCA of 3 and 4 is 1. LCA of 3 and 2 is root 0."
      }
    ],
    explanation:
      "### Binary Lifting LCA Algorithm\n1. Run DFS from root to compute `depth[u]` and initial jump table `up[u][0] = parent[u]`.\n2. Fill jump table `up[u][j] = up[up[u][j-1]][j-1]` for $j \\in [1, \\log_2 N]$.\n3. **Query LCA(u, v)**:\n   - Assume without loss of generality `depth[u] >= depth[v]`.\n   - Lift `u` up by `depth[u] - depth[v]` steps using binary lifting so both nodes are at the same depth.\n   - If `u == v`, return `u`.\n   - For $j = \\log_2 N$ down to 0:\n     If `up[u][j] != up[v][j]`, simultaneously lift both: `u = up[u][j]`, `v = up[v][j]`.\n   - Return `up[u][0]` (the parent of the converged pointers).",
    interviewInsight:
      "Binary lifting LCA avoids Euler-tour RMQ segment tree overhead, maintaining a clean $O(N \\log N)$ matrix with direct jump arithmetic.",
    cppSolution: `class LCASolver {
    int n, LOG;
    vector<vector<int>> up;
    vector<int> depth;

    void dfs(int u, int p, int d, const vector<vector<int>>& adj) {
        depth[u] = d;
        up[u][0] = p;
        for (int j = 1; j < LOG; ++j) {
            if (up[u][j - 1] != -1)
                up[u][j] = up[up[u][j - 1]][j - 1];
        }
        for (int v : adj[u]) {
            if (v != p) dfs(v, u, d + 1, adj);
        }
    }

public:
    LCASolver(int n, const vector<vector<int>>& adj) : n(n) {
        LOG = 18;
        up.assign(n, vector<int>(LOG, -1));
        depth.assign(n, 0);
        dfs(0, -1, 0, adj);
    }

    int getLCA(int u, int v) {
        if (depth[u] < depth[v]) swap(u, v);
        
        // Equalize depth
        int diff = depth[u] - depth[v];
        for (int j = 0; j < LOG; ++j) {
            if ((diff >> j) & 1) u = up[u][j];
        }
        if (u == v) return u;
        
        // Lift together
        for (int j = LOG - 1; j >= 0; --j) {
            if (up[u][j] != up[v][j]) {
                u = up[u][j];
                v = up[v][j];
            }
        }
        return up[u][0];
    }
};`,
    pythonSolution: `class LCASolver:
    def __init__(self, n: int, adj: list[list[int]]):
        self.n = n
        self.LOG = 18
        self.up = [[-1] * self.LOG for _ in range(n)]
        self.depth = [0] * n
        
        stack = [(0, -1, 0)]
        visited = [False] * n
        
        # Iterative DFS for deep trees
        while stack:
            u, p, d = stack.pop()
            self.depth[u] = d
            self.up[u][0] = p
            for j in range(1, self.LOG):
                if self.up[u][j - 1] != -1:
                    self.up[u][j] = self.up[self.up[u][j - 1]][j - 1]
            for v in adj[u]:
                if v != p:
                    stack.append((v, u, d + 1))

    def getLCA(self, u: int, v: int) -> int:
        if self.depth[u] < self.depth[v]:
            u, v = v, u
            
        diff = self.depth[u] - self.depth[v]
        for j in range(self.LOG):
            if (diff >> j) & 1:
                u = self.up[u][j]
                
        if u == v:
            return u
            
        for j in range(self.LOG - 1, -1, -1):
            if self.up[u][j] != self.up[v][j]:
                u = self.up[u][j]
                v = self.up[v][j]
                
        return self.up[u][0]`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q167",
    questionNumber: 167,
    title: "Maximum XOR With an Element From Array (Offline Binary Trie)",
    statement:
      "You are given an array nums consisting of non-negative integers. You are also given a queries array, where queries[j] = [xj, mj].\n\nThe answer to the jth query is the maximum bitwise XOR value of xj and any element of nums that does not exceed mj. In other words, the answer is max(nums[i] XOR xj) for all i such that nums[i] <= mj. If all elements in nums are larger than mj, then the answer is -1.\n\nReturn an integer array answer where answer[j] is the answer to the jth query.",
    difficulty: "Hard",
    pattern: "Offline Query Sorting + Incremental Binary Trie",
    constraints: [
      "1 <= nums.length, queries.length <= 10^5",
      "queries[j].length == 2",
      "0 <= nums[i], xj, mj <= 10^9"
    ],
    expectedTimeComplexity: "O(N log N + Q log Q + 31 * (N + Q))",
    expectedSpaceComplexity: "O(31 * N + Q)",
    examples: [
      {
        input: "nums = [0,1,2,3,4], queries = [[3,1],[1,3],[5,6]]",
        output: "[3,3,7]",
        explanation: "1) 0 and 1 are <= 1; 3 XOR 0 = 3.\n2) 0, 1, 2, 3 are <= 3; 1 XOR 2 = 3.\n3) all are <= 6; 5 XOR 2 = 7."
      },
      {
        input: "nums = [5,2,4,6,6,3], queries = [[12,4],[8,1],[6,3]]",
        output: "[15,-1,5]"
      }
    ],
    explanation:
      "### Offline Query Monotonicity\n1. Sort `nums` in ascending order.\n2. Store queries with their original indices: `[[x, m, originalIdx], ...]` and sort by threshold `m` ascending.\n3. Maintain a Binary Trie.\n4. Pointer `idx = 0` walks through `nums`:\n   - For query `(x, m, qIdx)`: Insert all `nums[idx] <= m` into the Trie.\n   - If Trie is empty (no elements $\\le m$), `ans[qIdx] = -1`.\n   - Else query Trie for maximum XOR against `x` in $O(31)$ time.\n5. Every element of `nums` is inserted into the Trie at most once.",
    interviewInsight:
      "Sorting queries by their constraint boundary ($m$) eliminates expensive dynamic filtering, turning multi-threshold queries into single-pass monotonic insertions.",
    cppSolution: `class Solution {
    struct TrieNode {
        TrieNode* children[2] = {nullptr, nullptr};
    };

    void insert(TrieNode* root, int num) {
        TrieNode* curr = root;
        for (int i = 30; i >= 0; --i) {
            int bit = (num >> i) & 1;
            if (!curr->children[bit]) curr->children[bit] = new TrieNode();
            curr = curr->children[bit];
        }
    }

    int queryMaxXor(TrieNode* root, int x) {
        TrieNode* curr = root;
        int maxXor = 0;
        for (int i = 30; i >= 0; --i) {
            int bit = (x >> i) & 1;
            int opp = 1 - bit;
            if (curr->children[opp]) {
                maxXor |= (1 << i);
                curr = curr->children[opp];
            } else {
                curr = curr->children[bit];
            }
        }
        return maxXor;
    }

public:
    vector<int> maximizeXor(vector<int>& nums, vector<vector<int>>& queries) {
        sort(nums.begin(), nums.end());
        int q = queries.size();
        vector<vector<int>> sortedQueries(q);
        for (int i = 0; i < q; ++i) {
            sortedQueries[i] = {queries[i][1], queries[i][0], i}; // m, x, origIdx
        }
        sort(sortedQueries.begin(), sortedQueries.end());
        
        TrieNode* root = new TrieNode();
        vector<int> ans(q);
        int numIdx = 0, n = nums.size();
        
        for (auto& sq : sortedQueries) {
            int m = sq[0], x = sq[1], origIdx = sq[2];
            while (numIdx < n && nums[numIdx] <= m) {
                insert(root, nums[numIdx]);
                numIdx++;
            }
            if (numIdx == 0) {
                ans[origIdx] = -1;
            } else {
                ans[origIdx] = queryMaxXor(root, x);
            }
        }
        return ans;
    }
};`,
    pythonSolution: `class TrieNode:
    def __init__(self):
        self.children = [None, None]

class Solution:
    def maximizeXor(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        nums.sort()
        q_indexed = sorted([(m, x, i) for i, (x, m) in enumerate(queries)])
        
        root = TrieNode()
        def insert(num: int):
            curr = root
            for i in range(30, -1, -1):
                bit = (num >> i) & 1
                if not curr.children[bit]:
                    curr.children[bit] = TrieNode()
                curr = curr.children[bit]
                
        def query(x: int) -> int:
            curr = root
            max_xor = 0
            for i in range(30, -1, -1):
                bit = (x >> i) & 1
                opp = 1 - bit
                if curr.children[opp]:
                    max_xor |= (1 << i)
                    curr = curr.children[opp]
                else:
                    curr = curr.children[bit]
            return max_xor
            
        ans = [-1] * len(queries)
        num_idx = 0
        n = len(nums)
        
        for m, x, orig_idx in q_indexed:
            while num_idx < n and nums[num_idx] <= m:
                insert(nums[num_idx])
                num_idx += 1
            if num_idx > 0:
                ans[orig_idx] = query(x)
                
        return ans`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q168",
    questionNumber: 168,
    title: "Range Sum Query 2D - Mutable (2D Fenwick Tree)",
    statement:
      "Given a 2D matrix matrix, handle multiple queries of two types:\n1. Update the value of a cell [row, col] to val.\n2. Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2).\n\nImplement the NumMatrix class:\n- NumMatrix(int[][] matrix) Initializes the object with the integer matrix.\n- void update(int row, int col, int val) Updates the value of matrix[row][col] to be val.\n- int sumRegion(int row1, int col1, int row2, int col2) Returns the sum of the elements inside the rectangle.",
    difficulty: "Hard",
    pattern: "2D Binary Indexed Tree (2D Fenwick Tree)",
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 200",
      "-10^5 <= matrix[i][j] <= 10^5",
      "0 <= row < m, 0 <= col < n",
      "0 <= row1 <= row2 < m, 0 <= col1 <= col2 < n",
      "At most 10^4 calls will be made to update and sumRegion."
    ],
    expectedTimeComplexity: "O(log M * log N) per update and sumRegion, O(MN log M log N) build",
    expectedSpaceComplexity: "O(M * N)",
    examples: [
      {
        input: "[\"NumMatrix\",\"sumRegion\",\"update\",\"sumRegion\"], [[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[3,2,2],[2,1,4,3]]",
        output: "[null,8,null,10]"
      }
    ],
    explanation:
      "### 2D Binary Indexed Tree (BIT)\nNested loops over LSB indices manage 2D subgrid cumulative sums.\n- `add(r, c, delta)`: for `i = r; i <= m; i += i & -i` and `j = c; j <= n; j += j & -j`, `bit[i][j] += delta`.\n- `query(r, c)`: Prefix sum of bounding box `(0, 0)` to `(r-1, c-1)` via descending LSB steps.\n- Inclusion-Exclusion Principle:\n  `sumRegion(r1, c1, r2, c2) = query(r2+1, c2+1) - query(r1, c2+1) - query(r2+1, c1) + query(r1, c1)`.",
    interviewInsight:
      "2D Fenwick Trees extend 1D prefix logic to grid coordinate planes with minimal lines of code and zero pointer overhead.",
    cppSolution: `class NumMatrix {
    int m, n;
    vector<vector<int>> bit;
    vector<vector<int>> mat;

    void add(int r, int c, int delta) {
        for (int i = r; i <= m; i += i & (-i)) {
            for (int j = c; j <= n; j += j & (-j)) {
                bit[i][j] += delta;
            }
        }
    }

    int query(int r, int c) {
        int sum = 0;
        for (int i = r; i > 0; i -= i & (-i)) {
            for (int j = c; j > 0; j -= j & (-j)) {
                sum += bit[i][j];
            }
        }
        return sum;
    }

public:
    NumMatrix(vector<vector<int>>& matrix) {
        m = matrix.size();
        n = matrix[0].size();
        mat = matrix;
        bit.assign(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                add(i + 1, j + 1, matrix[i][j]);
            }
        }
    }
    
    void update(int row, int col, int val) {
        int delta = val - mat[row][col];
        mat[row][col] = val;
        add(row + 1, col + 1, delta);
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return query(row2 + 1, col2 + 1) 
             - query(row1, col2 + 1) 
             - query(row2 + 1, col1) 
             + query(row1, col1);
    }
};`,
    pythonSolution: `class NumMatrix:
    def __init__(self, matrix: list[list[int]]):
        self.m = len(matrix)
        self.n = len(matrix[0])
        self.mat = [row[:] for row in matrix]
        self.bit = [[0] * (self.n + 1) for _ in range(self.m + 1)]
        
        for i in range(self.m):
            for j in range(self.n):
                self._add(i + 1, j + 1, matrix[i][j])

    def _add(self, r: int, c: int, delta: int):
        i = r
        while i <= self.m:
            j = c
            while j <= self.n:
                self.bit[i][j] += delta
                j += j & (-j)
            i += i & (-i)

    def _query(self, r: int, c: int) -> int:
        total = 0
        i = r
        while i > 0:
            j = c
            while j > 0:
                total += self.bit[i][j]
                j -= j & (-j)
            i -= i & (-i)
        return total

    def update(self, row: int, col: int, val: int) -> None:
        delta = val - self.mat[row][col]
        self.mat[row][col] = val
        self._add(row + 1, col + 1, delta)

    def sumRegion(self, row1: int, col1: int, row2: int col2) -> int:
        return (self._query(row2 + 1, col2 + 1)
                - self._query(row1, col2 + 1)
                - self._query(row2 + 1, col1)
                + self._query(row1, col1))`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q169",
    questionNumber: 169,
    title: "Subtree Sum Dynamic Queries via Euler Tour Flattening",
    statement:
      "You are given a rooted tree with n nodes numbered 0 to n - 1 (rooted at 0), where each node has an initial integer value given by values[i].\n\nSupport two operations dynamically:\n1. updateNode(u, val): Set values[u] = val.\n2. querySubtree(u): Return the sum of all node values in the subtree rooted at node u.",
    difficulty: "Hard",
    pattern: "Euler Tour Technique (Tree Flattening) + Fenwick Tree",
    constraints: [
      "1 <= n <= 10^5",
      "0 <= values[i] <= 10^6",
      "1 <= queries.length <= 10^5"
    ],
    expectedTimeComplexity: "O(N) DFS flattening, O(log N) per query and update",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "n = 4, edges = [[0,1],[0,2],[1,3]], values = [1,2,3,4], querySubtree(1)",
        output: "6",
        explanation: "Subtree rooted at node 1 contains nodes 1 and 3. Sum = values[1] + values[3] = 2 + 4 = 6."
      }
    ],
    explanation:
      "### Euler Tour Linearization\nIn DFS traversal, entry time `tin[u]` and exit time `tout[u]` define a contiguous interval `[tin[u], tout[u]]` in the traversal order that contains **exactly** the subtree of node `u`.\n1. Run DFS from root 0: record `tin[u]`, `tout[u]` with a global timer.\n2. Create a Fenwick Tree of size $N$.\n3. Place each node's initial value at index `tin[u]` in the Fenwick Tree.\n4. `updateNode(u, val)`: Point update Fenwick tree at position `tin[u]` with `val - current_val`.\n5. `querySubtree(u)`: Range sum query on Fenwick tree over `[tin[u], tout[u]]` in $O(\\log N)$.",
    interviewInsight:
      "The Euler Tour technique converts subtree problems into 1D array interval problems, allowing standard Fenwick or Segment Trees to be applied to trees.",
    cppSolution: `class SubtreeQuerySolver {
    int n, timer;
    vector<int> tin, tout, valArr;
    vector<long long> bit;

    void add(int i, long long delta) {
        for (; i <= n; i += i & (-i)) bit[i] += delta;
    }

    long long query(int i) {
        long long sum = 0;
        for (; i > 0; i -= i & (-i)) sum += bit[i];
        return sum;
    }

    void dfs(int u, int p, const vector<vector<int>>& adj) {
        tin[u] = ++timer;
        for (int v : adj[u]) {
            if (v != p) dfs(v, u, adj);
        }
        tout[u] = timer;
    }

public:
    SubtreeQuerySolver(int n, const vector<vector<int>>& adj, const vector<int>& values) : n(n), valArr(values) {
        tin.resize(n);
        tout.resize(n);
        timer = 0;
        dfs(0, -1, adj);
        
        bit.assign(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            add(tin[i], values[i]);
        }
    }

    void updateNode(int u, int newVal) {
        long long delta = newVal - valArr[u];
        valArr[u] = newVal;
        add(tin[u], delta);
    }

    long long querySubtree(int u) {
        return query(tout[u]) - query(tin[u] - 1);
    }
};`,
    pythonSolution: `class SubtreeQuerySolver:
    def __init__(self, n: int, adj: list[list[int]], values: list[int]):
        self.n = n
        self.val_arr = list(values)
        self.tin = [0] * n
        self.tout = [0] * n
        self.timer = 0
        
        # Iterative or recursive DFS
        def dfs(u: int, p: int):
            self.timer += 1
            self.tin[u] = self.timer
            for v in adj[u]:
                if v != p:
                    dfs(v, u)
            self.tout[u] = self.timer
            
        dfs(0, -1)
        self.bit = [0] * (n + 1)
        for i in range(n):
            self._add(self.tin[i], values[i])

    def _add(self, i: int, delta: int):
        while i <= self.n:
            self.bit[i] += delta
            i += i & (-i)

    def _query(self, i: int) -> int:
        total = 0
        while i > 0:
            total += self.bit[i]
            i -= i & (-i)
        return total

    def updateNode(self, u: int, new_val: int):
        delta = new_val - self.val_arr[u]
        self.val_arr[u] = new_val
        self._add(self.tin[u], delta)

    def querySubtree(self, u: int) -> int:
        return self._query(self.tout[u]) - self._query(self.tin[u] - 1)`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q170",
    questionNumber: 170,
    title: "Static Range Minimum Query in O(1) Time (Sparse Table)",
    statement:
      "Given an immutable integer array nums of size n, build a data structure that answers Range Minimum Queries (RMQ) queryMin(left, right) in strictly O(1) query time after O(N log N) preprocessing.",
    difficulty: "Hard",
    pattern: "Sparse Table (ST) / Idempotent Range Aggregation",
    constraints: [
      "1 <= n <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "0 <= left <= right < n",
      "Up to 2 * 10^5 query calls."
    ],
    expectedTimeComplexity: "O(N log N) preprocessing, O(1) per RMQ query",
    expectedSpaceComplexity: "O(N log N)",
    examples: [
      {
        input: "nums = [1, 3, 4, 8, 6, 1, 4, 2], queryMin(1, 4), queryMin(3, 7)",
        output: "[3, 1]",
        explanation: "nums[1..4] = [3, 4, 8, 6] -> min is 3. nums[3..7] = [8, 6, 1, 4, 2] -> min is 1."
      }
    ],
    explanation:
      "### Sparse Table & Idempotency\nLet `st[i][j]` be the minimum in subarray of length $2^j$ starting at index `i`: `nums[i ... i + 2^j - 1]`.\n- Base case: `st[i][0] = nums[i]`.\n- Transition: `st[i][j] = min(st[i][j-1], st[i + 2^(j-1)][j-1])`.\n- **O(1) Query**:\n  For range `[L, R]`, length is $len = R - L + 1$. Let $k = \\lfloor \\log_2 len \\rfloor$.\n  Range `[L, R]` is covered by two overlapping intervals of length $2^k$: `[L, L + 2^k - 1]` and `[R - 2^k + 1, R]`.\n  $\\implies \\text{min}(L, R) = \\min(st[L][k], st[R - 2^k + 1][k])$. Because $\\min(x, x) = x$ (idempotent), the overlap does not affect the answer.",
    interviewInsight:
      "Sparse Tables provide instantaneous $O(1)$ query speeds for idempotent operators (min, max, GCD, bitwise AND/OR).",
    cppSolution: `class SparseTableRMQ {
    int n, LOG;
    vector<vector<int>> st;
    vector<int> logTable;

public:
    SparseTableRMQ(const vector<int>& nums) {
        n = nums.size();
        LOG = 18;
        st.assign(n, vector<int>(LOG));
        logTable.assign(n + 1, 0);
        
        for (int i = 2; i <= n; ++i) logTable[i] = logTable[i / 2] + 1;
        for (int i = 0; i < n; ++i) st[i][0] = nums[i];
        
        for (int j = 1; j < LOG; ++j) {
            for (int i = 0; i + (1 << j) <= n; ++i) {
                st[i][j] = min(st[i][j - 1], st[i + (1 << (j - 1))][j - 1]);
            }
        }
    }

    int queryMin(int L, int R) {
        int len = R - L + 1;
        int k = logTable[len];
        return min(st[L][k], st[R - (1 << k) + 1][k]);
    }
};`,
    pythonSolution: `import math

class SparseTableRMQ:
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.LOG = 18
        self.st = [[0] * self.LOG for _ in range(self.n)]
        self.log_table = [0] * (self.n + 1)
        
        for i in range(2, self.n + 1):
            self.log_table[i] = self.log_table[i // 2] + 1
            
        for i in range(self.n):
            self.st[i][0] = nums[i]
            
        for j in range(1, self.LOG):
            i = 0
            while i + (1 << j) <= self.n:
                self.st[i][j] = min(self.st[i][j - 1], self.st[i + (1 << (j - 1))][j - 1])
                i += 1

    def queryMin(self, L: int, R: int) -> int:
        length = R - L + 1
        k = self.log_table[length]
        return min(self.st[L][k], self.st[R - (1 << k) + 1][k])`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q171",
    questionNumber: 171,
    title: "Range Update & Range Sum Queries (Segment Tree with Lazy Propagation)",
    statement:
      "Design a dynamic range data structure for an array nums of size n supporting two operations:\n1. updateRange(left, right, val): Add val to every element in nums[left...right] inclusive.\n2. querySum(left, right): Return the sum of all elements in nums[left...right] inclusive.\n\nBoth operations must execute in O(log N) time.",
    difficulty: "Hard",
    pattern: "Segment Tree with Lazy Propagation / Deferred Tag Updating",
    constraints: [
      "1 <= n <= 10^5",
      "-10^4 <= nums[i], val <= 10^4",
      "0 <= left <= right < n",
      "Up to 10^5 calls."
    ],
    expectedTimeComplexity: "O(log N) per range update and range sum query",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "nums = [1, 2, 3, 4, 5], querySum(0, 2), updateRange(1, 3, 10), querySum(0, 2)",
        output: "[6, 26]",
        explanation: "Initial sum(0..2) = 1+2+3 = 6. After adding 10 to nums[1..3], array becomes [1, 12, 13, 14, 5]. New sum(0..2) = 1+12+13 = 26."
      }
    ],
    explanation:
      "### Lazy Propagation Mechanism\nWithout lazy propagation, updating $K$ elements takes $O(K \\log N)$. Lazy propagation defers updates to sub-intervals:\n- Each node maintains `tree[node]` (sum of interval) and `lazy[node]` (pending delta to push down).\n- When updating `[l, r]` completely covered by `[ql, qr]`:\n  `tree[node] += val * (r - l + 1)`\n  `lazy[node] += val`\n  Return immediately without traversing children.\n- `pushDown(node, l, r)`: When visiting an internal node with non-zero `lazy[node]`, apply the deferred tag to both children before recurring further down.",
    interviewInsight:
      "Lazy propagation is mandatory whenever operations require both range updates and range queries in logarithmic time.",
    cppSolution: `class LazySegmentTree {
    int n;
    vector<long long> tree, lazy;

    void build(const vector<int>& nums, int node, int l, int r) {
        if (l == r) {
            tree[node] = nums[l];
            return;
        }
        int mid = l + (r - l) / 2;
        build(nums, 2 * node, l, mid);
        build(nums, 2 * node + 1, mid + 1, r);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    void pushDown(int node, int l, int r) {
        if (lazy[node] != 0) {
            int mid = l + (r - l) / 2;
            lazy[2 * node] += lazy[node];
            tree[2 * node] += lazy[node] * (mid - l + 1);
            
            lazy[2 * node + 1] += lazy[node];
            tree[2 * node + 1] += lazy[node] * (r - mid);
            
            lazy[node] = 0;
        }
    }

    void updateRange(int node, int l, int r, int ql, int qr, long long val) {
        if (ql <= l && r <= qr) {
            tree[node] += val * (r - l + 1);
            lazy[node] += val;
            return;
        }
        pushDown(node, l, r);
        int mid = l + (r - l) / 2;
        if (ql <= mid) updateRange(2 * node, l, mid, ql, qr, val);
        if (qr > mid) updateRange(2 * node + 1, mid + 1, r, ql, qr, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    long long querySum(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node];
        if (r < ql || l > qr) return 0;
        pushDown(node, l, r);
        int mid = l + (r - l) / 2;
        return querySum(2 * node, l, mid, ql, qr) + querySum(2 * node + 1, mid + 1, r, ql, qr);
    }

public:
    LazySegmentTree(const vector<int>& nums) {
        n = nums.size();
        tree.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
        build(nums, 1, 0, n - 1);
    }

    void update(int ql, int qr, long long val) {
        updateRange(1, 0, n - 1, ql, qr, val);
    }

    long long query(int ql, int qr) {
        return querySum(1, 0, n - 1, ql, qr);
    }
};`,
    pythonSolution: `class LazySegmentTree:
    def __init__(self, nums: list[int]):
        self.n = len(nums)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        self._build(nums, 1, 0, self.n - 1)

    def _build(self, nums: list[int], node: int, l: int, r: int):
        if l == r:
            self.tree[node] = nums[l]
            return
        mid = (l + r) // 2
        self._build(nums, 2 * node, l, mid)
        self._build(nums, 2 * node + 1, mid + 1, r)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def _push_down(self, node: int, l: int, r: int):
        if self.lazy[node] != 0:
            mid = (l + r) // 2
            val = self.lazy[node]
            self.lazy[2 * node] += val
            self.tree[2 * node] += val * (mid - l + 1)
            self.lazy[2 * node + 1] += val
            self.tree[2 * node + 1] += val * (r - mid)
            self.lazy[node] = 0

    def update(self, ql: int, qr: int, val: int, node: int = 1, l: int = 0, r: int = None):
        if r is None: r = self.n - 1
        if ql <= l and r <= qr:
            self.tree[node] += val * (r - l + 1)
            self.lazy[node] += val
            return
        self._push_down(node, l, r)
        mid = (l + r) // 2
        if ql <= mid:
            self.update(ql, qr, val, 2 * node, l, mid)
        if qr > mid:
            self.update(ql, qr, val, 2 * node + 1, mid + 1, r)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, ql: int, qr: int, node: int = 1, l: int = 0, r: int = None) -> int:
        if r is None: r = self.n - 1
        if ql <= l and r <= qr:
            return self.tree[node]
        if r < ql or l > qr:
            return 0
        self._push_down(node, l, r)
        mid = (l + r) // 2
        return self.query(ql, qr, 2 * node, l, mid) + self.query(ql, qr, 2 * node + 1, mid + 1, r)`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q172",
    questionNumber: 172,
    title: "Count of Range Sum",
    statement:
      "Given an integer array nums and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive.\n\nRange sum S(i, j) is defined as the sum of the elements in nums between indices i and j inclusive, where i <= j.",
    difficulty: "Hard",
    pattern: "Fenwick Tree + Coordinate Compression of Prefix Sums",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "-10^5 <= lower <= upper <= 10^5"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "nums = [-2,5,-1], lower = -2, upper = 2",
        output: "3",
        explanation: "The three ranges are: [0,0]-> -2, [2,2]-> -1, and [0,2]-> 2. All lie in [-2, 2]."
      },
      {
        input: "nums = [0], lower = 0, upper = 0",
        output: "1"
      }
    ],
    explanation:
      "### Prefix Sum Condition & Fenwick Tree\n$S(i, j) = P[j] - P[i-1]$. We require:\n$\\text{lower} \\le P[j] - P[i-1] \\le \\text{upper} \\iff P[j] - \\text{upper} \\le P[i-1] \\le P[j] - \\text{lower}$.\n1. Compute all prefix sums $P$. Collect all query coordinates: $\\{P[j], P[j] - \\text{upper}, P[j] - \\text{lower}\\}$ for all $j$.\n2. Sort and deduplicate coordinates to assign discrete integer ranks.\n3. Insert base prefix sum $P[0] = 0$ into the Fenwick Tree.\n4. For each prefix sum $P[j]$:\n   - Query count of previous prefix sums lying in rank range $[\\text{rank}(P[j] - \\text{upper}), \\text{rank}(P[j] - \\text{lower})]$.\n   - Add to answer.\n   - Insert $P[j]$ into the Fenwick Tree.",
    interviewInsight:
      "Transforming mathematical inequalities into bounded coordinate queries allows Fenwick trees to count complex range conditions in $O(N \\log N)$.",
    cppSolution: `class Solution {
public:
    int countRangeSum(vector<int>& nums, int lower, int upper) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i) prefix[i + 1] = prefix[i] + nums[i];
        
        vector<long long> coords;
        for (long long p : prefix) {
            coords.push_back(p);
            coords.push_back(p - lower);
            coords.push_back(p - upper);
        }
        sort(coords.begin(), coords.end());
        coords.erase(unique(coords.begin(), coords.end()), coords.end());
        
        int m = coords.size();
        vector<int> bit(m + 1, 0);
        
        auto add = [&](int i, int delta) {
            for (; i <= m; i += i & (-i)) bit[i] += delta;
        };
        
        auto query = [&](int i) -> int {
            int sum = 0;
            for (; i > 0; i -= i & (-i)) sum += bit[i];
            return sum;
        };
        
        auto getRank = [&](long long val) -> int {
            return lower_bound(coords.begin(), coords.end(), val) - coords.begin() + 1;
        };
        
        int ans = 0;
        for (long long p : prefix) {
            int leftRank = getRank(p - upper);
            int rightRank = getRank(p - lower);
            ans += query(rightRank) - query(leftRank - 1);
            add(getRank(p), 1);
        }
        return ans;
    }
};`,
    pythonSolution: `import bisect

class Solution:
    def countRangeSum(self, nums: list[int], lower: int, upper: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]
            
        coords = set()
        for p in prefix:
            coords.add(p)
            coords.add(p - lower)
            coords.add(p - upper)
        sorted_coords = sorted(list(coords))
        m = len(sorted_coords)
        
        bit = [0] * (m + 1)
        def add(i: int, delta: int):
            while i <= m:
                bit[i] += delta
                i += i & (-i)
                
        def query(i: int) -> int:
            total = 0
            while i > 0:
                total += bit[i]
                i -= i & (-i)
            return total
            
        def get_rank(val: int) -> int:
            return bisect.bisect_left(sorted_coords, val) + 1
            
        ans = 0
        for p in prefix:
            l_rank = get_rank(p - upper)
            r_rank = get_rank(p - lower)
            ans += query(r_rank) - query(l_rank - 1)
            add(get_rank(p), 1)
            
        return ans`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q173",
    questionNumber: 173,
    title: "Online Majority Element in Subarray",
    statement:
      "Design a data structure that efficiently finds the majority element of a given subarray.\n\nThe majority element of a subarray is defined as an element that occurs threshold times or more in the subarray.\n\nImplement the MajorityChecker class:\n- MajorityChecker(int[] arr) Initializes the instance with the given array arr.\n- int query(int left, int right, int threshold) returns the element in arr[left...right] that occurs at least threshold times, or -1 if no such element exists.",
    difficulty: "Hard",
    pattern: "Segment Tree with Boyer-Moore Voting Node Merging + Binary Search",
    constraints: [
      "1 <= arr.length <= 2 * 10^4",
      "1 <= arr[i] <= 2 * 10^4",
      "0 <= left <= right < arr.length",
      "threshold <= right - left + 1",
      "2 * threshold > right - left + 1",
      "At most 10^4 calls will be made to query."
    ],
    expectedTimeComplexity: "O(log N) candidate identification + O(log N) verification",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "[\"MajorityChecker\",\"query\",\"query\",\"query\"], [[[1,1,2,2,1,1]],[0,5,4],[0,3,3],[2,3,2]]",
        output: "[null,1,-1,2]"
      }
    ],
    explanation:
      "### Segment Tree Boyer-Moore Voting\nEach node in the Segment Tree stores a pair `(candidate, count)`:\n- When combining left child `(c1, count1)` and right child `(c2, count2)`:\n  - If `c1 == c2`: new state is `(c1, count1 + count2)`.\n  - Else if `count1 >= count2`: new state is `(c1, count1 - count2)`.\n  - Else: new state is `(c2, count2 - count1)`.\n- For `query(l, r, threshold)`:\n  - Query Segment Tree over `[l, r]` to obtain the primary majority candidate $C$.\n  - Verify occurrence count of $C$ in `[l, r]` in $O(\\log N)$ using `std::upper_bound - std::lower_bound` on precomputed occurrence indices map `pos[C]`.\n  - If count $\\ge threshold$, return $C$; else return -1.",
    interviewInsight:
      "Merging Boyer-Moore voting states inside Segment Tree nodes allows combining distinct intervals to find candidate majority elements in $O(\\log N)$.",
    cppSolution: `class MajorityChecker {
    struct Node {
        int candidate, count;
    };

    int n;
    vector<Node> tree;
    unordered_map<int, vector<int>> pos;

    Node merge(const Node& a, const Node& b) {
        if (a.candidate == b.candidate) {
            return {a.candidate, a.count + b.count};
        }
        if (a.count >= b.count) {
            return {a.candidate, a.count - b.count};
        }
        return {b.candidate, b.count - a.count};
    }

    void build(const vector<int>& arr, int node, int l, int r) {
        if (l == r) {
            tree[node] = {arr[l], 1};
            return;
        }
        int mid = l + (r - l) / 2;
        build(arr, 2 * node, l, mid);
        build(arr, 2 * node + 1, mid + 1, r);
        tree[node] = merge(tree[2 * node], tree[2 * node + 1]);
    }

    Node queryTree(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node];
        if (r < ql || l > qr) return {0, 0};
        int mid = l + (r - l) / 2;
        return merge(queryTree(2 * node, l, mid, ql, qr), queryTree(2 * node + 1, mid + 1, r, ql, qr));
    }

public:
    MajorityChecker(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n);
        build(arr, 1, 0, n - 1);
        for (int i = 0; i < n; ++i) {
            pos[arr[i]].push_back(i);
        }
    }
    
    int query(int left, int right, int threshold) {
        Node res = queryTree(1, 0, n - 1, left, right);
        int cand = res.candidate;
        if (!pos.count(cand)) return -1;
        
        auto& p = pos[cand];
        int count = upper_bound(p.begin(), p.end(), right) - lower_bound(p.begin(), p.end(), left);
        return count >= threshold ? cand : -1;
    }
};`,
    pythonSolution: `import bisect
from collections import defaultdict

class MajorityChecker:
    def __init__(self, arr: list[int]):
        self.n = len(arr)
        self.tree = [(0, 0)] * (4 * self.n)
        self.pos = defaultdict(list)
        for i, val in enumerate(arr):
            self.pos[val].append(i)
        self._build(arr, 1, 0, self.n - 1)

    def _merge(self, a, b):
        c1, cnt1 = a
        c2, cnt2 = b
        if c1 == c2:
            return (c1, cnt1 + cnt2)
        if cnt1 >= cnt2:
            return (c1, cnt1 - cnt2)
        return (c2, cnt2 - cnt1)

    def _build(self, arr: list[int], node: int, l: int, r: int):
        if l == r:
            self.tree[node] = (arr[l], 1)
            return
        mid = (l + r) // 2
        self._build(arr, 2 * node, l, mid)
        self._build(arr, 2 * node + 1, mid + 1, r)
        self.tree[node] = self._merge(self.tree[2 * node], self.tree[2 * node + 1])

    def _query(self, node: int, l: int, r: int, ql: int, qr: int):
        if ql <= l and r <= qr:
            return self.tree[node]
        if r < ql or l > qr:
            return (0, 0)
        mid = (l + r) // 2
        return self._merge(self._query(2 * node, l, mid, ql, qr),
                           self._query(2 * node + 1, mid + 1, r, ql, qr))

    def query(self, left: int, right: int, threshold: int) -> int:
        cand, _ = self._query(1, 0, self.n - 1, left, right)
        if cand not in self.pos:
            return -1
        p = self.pos[cand]
        cnt = bisect.bisect_right(p, right) - bisect.bisect_left(p, left)
        return cand if cnt >= threshold else -1`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q174",
    questionNumber: 174,
    title: "Tree Path Maximum Query (Binary Lifting Aggregation)",
    statement:
      "Given a weighted tree of n nodes (0 to n - 1) with positive edge weights, support multiple queries asking for the maximum edge weight on the unique simple path between two nodes u and v in O(log N) time per query.",
    difficulty: "Hard",
    pattern: "Binary Lifting Path Aggregation / Tree LCA Maximum",
    constraints: [
      "1 <= n <= 10^5",
      "edges.length == n - 1",
      "1 <= weight <= 10^9",
      "1 <= queries.length <= 10^5"
    ],
    expectedTimeComplexity: "O(N log N) preprocessing, O(log N) per query",
    expectedSpaceComplexity: "O(N log N)",
    examples: [
      {
        input: "n = 5, edges = [[0,1,3],[0,2,8],[1,3,2],[1,4,7]], queryPathMax(3, 4), queryPathMax(3, 2)",
        output: "[7, 8]",
        explanation: "Path 3 -> 1 -> 4 has edge weights [2, 7], max is 7. Path 3 -> 1 -> 0 -> 2 has edge weights [2, 3, 8], max is 8."
      }
    ],
    explanation:
      "### Binary Lifting Jump & Max Weight Cache\nMaintain two jump tables:\n1. `up[u][j]`: $2^j$-th ancestor of node $u$.\n2. `maxWeight[u][j]`: maximum edge weight on path from $u$ to `up[u][j]`.\n- Base case: `up[u][0] = p`, `maxWeight[u][0] = edge_weight(u, p)`.\n- Transition: `maxWeight[u][j] = max(maxWeight[u][j-1], maxWeight[up[u][j-1]][j-1])`.\n- To answer query `(u, v)`:\n  Lift lower node up to equal depth, accumulating `max_weight` along the jumps. If `u != v`, simultaneously lift both pointers upwards below LCA, taking `max` of jump weights.",
    interviewInsight:
      "Binary lifting easily accommodates any associative path reducer (sum, min, max, XOR, GCD) without requiring heavy tree decomposition.",
    cppSolution: `class TreePathMaxSolver {
    int n, LOG;
    vector<vector<int>> up, maxWeight;
    vector<int> depth;

    void dfs(int u, int p, int w, int d, const vector<vector<pair<int, int>>>& adj) {
        depth[u] = d;
        up[u][0] = p;
        maxWeight[u][0] = w;
        for (int j = 1; j < LOG; ++j) {
            if (up[u][j - 1] != -1) {
                up[u][j] = up[up[u][j - 1]][j - 1];
                maxWeight[u][j] = max(maxWeight[u][j - 1], maxWeight[up[u][j - 1]][j - 1]);
            }
        }
        for (auto& [v, weight] : adj[u]) {
            if (v != p) dfs(v, u, weight, d + 1, adj);
        }
    }

public:
    TreePathMaxSolver(int n, const vector<vector<pair<int, int>>>& adj) : n(n) {
        LOG = 18;
        up.assign(n, vector<int>(LOG, -1));
        maxWeight.assign(n, vector<int>(LOG, 0));
        depth.assign(n, 0);
        dfs(0, -1, 0, 0, adj);
    }

    int queryMax(int u, int v) {
        int ans = 0;
        if (depth[u] < depth[v]) swap(u, v);
        
        int diff = depth[u] - depth[v];
        for (int j = 0; j < LOG; ++j) {
            if ((diff >> j) & 1) {
                ans = max(ans, maxWeight[u][j]);
                u = up[u][j];
            }
        }
        if (u == v) return ans;
        
        for (int j = LOG - 1; j >= 0; --j) {
            if (up[u][j] != up[v][j]) {
                ans = max({ans, maxWeight[u][j], maxWeight[v][j]});
                u = up[u][j];
                v = up[v][j];
            }
        }
        return max({ans, maxWeight[u][0], maxWeight[v][0]});
    }
};`,
    pythonSolution: `class TreePathMaxSolver:
    def __init__(self, n: int, adj: list[list[tuple[int, int]]]):
        self.n = n
        self.LOG = 18
        self.up = [[-1] * self.LOG for _ in range(n)]
        self.max_weight = [[0] * self.LOG for _ in range(n)]
        self.depth = [0] * n
        
        stack = [(0, -1, 0, 0)]
        while stack:
            u, p, w, d = stack.pop()
            self.depth[u] = d
            self.up[u][0] = p
            self.max_weight[u][0] = w
            for j in range(1, self.LOG):
                if self.up[u][j - 1] != -1:
                    self.up[u][j] = self.up[self.up[u][j - 1]][j - 1]
                    self.max_weight[u][j] = max(self.max_weight[u][j - 1], self.max_weight[self.up[u][j - 1]][j - 1])
            for v, weight in adj[u]:
                if v != p:
                    stack.append((v, u, weight, d + 1))

    def queryMax(self, u: int, v: int) -> int:
        ans = 0
        if self.depth[u] < self.depth[v]:
            u, v = v, u
            
        diff = self.depth[u] - self.depth[v]
        for j in range(self.LOG):
            if (diff >> j) & 1:
                ans = max(ans, self.max_weight[u][j])
                u = self.up[u][j]
                
        if u == v:
            return ans
            
        for j in range(self.LOG - 1, -1, -1):
            if self.up[u][j] != self.up[v][j]:
                ans = max(ans, self.max_weight[u][j], self.max_weight[v][j])
                u = self.up[u][j]
                v = self.up[v][j]
                
        return max(ans, self.max_weight[u][0], self.max_weight[v][0])`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q175",
    questionNumber: 175,
    title: "Falling Squares (Coordinate Compression + Lazy Segment Tree)",
    statement:
      "There are several squares being dropped onto the X-axis of a 2D plane.\n\nYou are given a 2D integer array positions where positions[i] = [lefti, sideLengthi] represents the ith square with a side length of sideLengthi that is dropped with its left-most edge aligned with X-coordinate lefti.\n\nEach square is dropped sequentially from that height and falls until it lands on the top side of another square or on the X-axis. A square cannot pass through another square.\n\nReturn an integer array ans where ans[i] represents the maximum height of any square on the plane after dropping the ith square.",
    difficulty: "Hard",
    pattern: "Coordinate Compression + Lazy Segment Tree Range Max",
    constraints: [
      "1 <= positions.length <= 1000",
      "1 <= lefti <= 10^8",
      "1 <= sideLengthi <= 10^6"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "positions = [[1,2],[2,3],[6,1]]",
        output: "[2,5,5]",
        explanation: "Drop 1 at [1, 3) height 2. Drop 2 at [2, 5) overlaps with first square (height 2) -> height 2+3=5. Drop 3 at [6, 7) lands on ground -> height 1. Max heights: [2, 5, 5]."
      }
    ],
    explanation:
      "### Segment Tree Interval Stacking\nA square dropped on interval $[L, R)$ where $R = L + \\text{side}$ lands on top of existing obstacles in $[L, R)$:\n1. Collect all boundary coordinates $L$ and $R - 1$, sort and deduplicate them (coordinate compression).\n2. Maintain a Lazy Segment Tree representing the height of each discrete interval supporting:\n   - `queryMax(L, R - 1)`: returns maximum current height in interval $H$.\n   - `updateRange(L, R - 1, H + side)`: sets all points in interval to new height $H + \\text{side}$.\n3. Maintain rolling `maxHeight` and record after each dropped square.",
    interviewInsight:
      "Mapping continuous real-world geometry to discrete compressed coordinates enables Segment Trees to simulate physics and structural drops.",
    cppSolution: `class Solution {
    vector<int> tree, lazy;

    void pushDown(int node) {
        if (lazy[node] != 0) {
            lazy[2 * node] = lazy[node];
            tree[2 * node] = lazy[node];
            lazy[2 * node + 1] = lazy[node];
            tree[2 * node + 1] = lazy[node];
            lazy[node] = 0;
        }
    }

    void update(int node, int l, int r, int ql, int qr, int val) {
        if (ql <= l && r <= qr) {
            tree[node] = val;
            lazy[node] = val;
            return;
        }
        pushDown(node);
        int mid = l + (r - l) / 2;
        if (ql <= mid) update(2 * node, l, mid, ql, qr, val);
        if (qr > mid) update(2 * node + 1, mid + 1, r, ql, qr, val);
        tree[node] = max(tree[2 * node], tree[2 * node + 1]);
    }

    int query(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node];
        if (r < ql || l > qr) return 0;
        pushDown(node);
        int mid = l + (r - l) / 2;
        return max(query(2 * node, l, mid, ql, qr), query(2 * node + 1, mid + 1, r, ql, qr));
    }

public:
    vector<int> fallingSquares(vector<vector<int>>& positions) {
        vector<int> coords;
        for (auto& p : positions) {
            coords.push_back(p[0]);
            coords.push_back(p[0] + p[1] - 1);
        }
        sort(coords.begin(), coords.end());
        coords.erase(unique(coords.begin(), coords.end()), coords.end());
        
        int m = coords.size();
        tree.assign(4 * m, 0);
        lazy.assign(4 * m, 0);
        
        auto getRank = [&](int val) {
            return lower_bound(coords.begin(), coords.end(), val) - coords.begin();
        };
        
        vector<int> ans;
        int curMax = 0;
        
        for (auto& p : positions) {
            int l = getRank(p[0]);
            int r = getRank(p[0] + p[1] - 1);
            int baseH = query(1, 0, m - 1, l, r);
            int newH = baseH + p[1];
            update(1, 0, m - 1, l, r, newH);
            curMax = max(curMax, newH);
            ans.push_back(curMax);
        }
        return ans;
    }
};`,
    pythonSolution: `import bisect

class Solution:
    def fallingSquares(self, positions: list[list[int]]) -> list[int]:
        coords = set()
        for l, side in positions:
            coords.add(l)
            coords.add(l + side - 1)
        sorted_coords = sorted(list(coords))
        m = len(sorted_coords)
        
        tree = [0] * (4 * m)
        lazy = [0] * (4 * m)
        
        def push_down(node):
            if lazy[node] != 0:
                val = lazy[node]
                lazy[2 * node] = val
                tree[2 * node] = val
                lazy[2 * node + 1] = val
                tree[2 * node + 1] = val
                lazy[node] = 0
                
        def update(node, l, r, ql, qr, val):
            if ql <= l and r <= qr:
                tree[node] = val
                lazy[node] = val
                return
            push_down(node)
            mid = (l + r) // 2
            if ql <= mid:
                update(2 * node, l, mid, ql, qr, val)
            if qr > mid:
                update(2 * node + 1, mid + 1, r, ql, qr, val)
            tree[node] = max(tree[2 * node], tree[2 * node + 1])
            
        def query(node, l, r, ql, qr):
            if ql <= l and r <= qr:
                return tree[node]
            if r < ql or l > qr:
                return 0
            push_down(node)
            mid = (l + r) // 2
            return max(query(2 * node, l, mid, ql, qr), query(2 * node + 1, mid + 1, r, ql, qr))
            
        ans = []
        cur_max = 0
        for l_pos, side in positions:
            ql = bisect.bisect_left(sorted_coords, l_pos)
            qr = bisect.bisect_left(sorted_coords, l_pos + side - 1)
            base_h = query(1, 0, m - 1, ql, qr)
            new_h = base_h + side
            update(1, 0, m - 1, ql, qr, new_h)
            cur_max = max(cur_max, new_h)
            ans.append(cur_max)
            
        return ans`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q176",
    questionNumber: 176,
    title: "Rectangle Area II (Sweep-Line + Segment Tree Length Integration)",
    statement:
      "You are given a 2D array of rectangles where rectangles[i] = [xi1, yi1, xi2, yi2] denotes the ith rectangle. The bottom-left corner of the rectangle is at (xi1, yi1) and the top-right corner is at (xi2, yi2).\n\nCalculate the total area covered by all rectangles in the plane. Any area covered by two or more rectangles should only be counted once.\n\nReturn the total area modulo 10^9 + 7.",
    difficulty: "Extreme",
    pattern: "Sweep-Line Algorithm + Segment Tree Length Integration",
    constraints: [
      "1 <= rectangles.length <= 200",
      "0 <= xi1, yi1, xi2, yi2 <= 10^9",
      "xi1 < xi2 and yi1 < yi2"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]",
        output: "6",
        explanation: "Total covered area after union of overlapping regions is 6."
      },
      {
        input: "rectangles = [[0,0,1000000000,1000000000]]",
        output: "49"
      }
    ],
    explanation:
      "### Sweep-Line Along X + 1D Segment Tree on Y\n1. For each rectangle `(x1, y1, x2, y2)`, create two events: `(x1, +1, y1, y2)` (entering) and `(x2, -1, y1, y2)` (exiting).\n2. Collect and sort unique $Y$ boundaries to build a 1D Segment Tree over discrete $Y$-intervals.\n3. Segment Tree Node represents $Y$-interval $[y_l, y_r]$:\n   - `count`: number of active rectangles covering this interval.\n   - `totalLength`: length of this interval active ($y_r - y_l$ if `count > 0`, else sum of children lengths).\n4. Sort sweep-line events by $X$-coordinate. As we step from $X_{prev}$ to $X_{curr}$:\n   - $\\Delta \\text{Area} = \\text{totalActiveYLength} \\times (X_{curr} - X_{prev})$.\n   - Update Segment Tree with event $(y1, y2, \\Delta \\text{count})$.",
    interviewInsight:
      "Sweep-line coupled with Segment Tree integration is the gold standard for multi-dimensional geometric union problems (e.g. Klee's Measure).",
    cppSolution: `class Solution {
    struct Event {
        long long x;
        int type; // +1 enter, -1 exit
        int y1, y2;
        bool operator<(const Event& o) const { return x < o.x; }
    };

    struct SegNode {
        int count = 0;
        long long totalLength = 0;
    };

    vector<SegNode> tree;
    vector<int> yCoords;

    void update(int node, int l, int r, int ql, int qr, int val) {
        if (ql <= l && r <= qr) {
            tree[node].count += val;
        } else {
            int mid = l + (r - l) / 2;
            if (ql <= mid) update(2 * node, l, mid, ql, qr, val);
            if (qr > mid) update(2 * node + 1, mid + 1, r, ql, qr, val);
        }
        
        if (tree[node].count > 0) {
            tree[node].totalLength = (long long)yCoords[r + 1] - yCoords[l];
        } else {
            if (l == r) tree[node].totalLength = 0;
            else tree[node].totalLength = tree[2 * node].totalLength + tree[2 * node + 1].totalLength;
        }
    }

public:
    int rectangleArea(vector<vector<int>>& rectangles) {
        vector<Event> events;
        for (auto& r : rectangles) {
            events.push_back({r[0], 1, r[1], r[3]});
            events.push_back({r[2], -1, r[1], r[3]});
            yCoords.push_back(r[1]);
            yCoords.push_back(r[3]);
        }
        
        sort(events.begin(), events.end());
        sort(yCoords.begin(), yCoords.end());
        yCoords.erase(unique(yCoords.begin(), yCoords.end()), yCoords.end());
        
        int m = yCoords.size() - 1; // number of elementary intervals
        tree.assign(4 * m, SegNode());
        
        auto getRank = [&](int y) {
            return lower_bound(yCoords.begin(), yCoords.end(), y) - yCoords.begin();
        };
        
        long long totalArea = 0, MOD = 1e9 + 7;
        long long lastX = events[0].x;
        
        for (auto& e : events) {
            long long curX = e.x;
            totalArea = (totalArea + tree[1].totalLength % MOD * (curX - lastX)) % MOD;
            int ql = getRank(e.y1);
            int qr = getRank(e.y2) - 1;
            if (ql <= qr) update(1, 0, m - 1, ql, qr, e.type);
            lastX = curX;
        }
        return totalArea;
    }
};`,
    pythonSolution: `class Solution:
    def rectangleArea(self, rectangles: list[list[int]]) -> int:
        events = []
        y_set = set()
        for x1, y1, x2, y2 in rectangles:
            events.append((x1, 1, y1, y2))
            events.append((x2, -1, y1, y2))
            y_set.add(y1)
            y_set.add(y2)
            
        events.sort()
        y_coords = sorted(list(y_set))
        m = len(y_coords) - 1
        
        count = [0] * (4 * m)
        total_len = [0] * (4 * m)
        
        def update(node, l, r, ql, qr, val):
            if ql <= l and r <= qr:
                count[node] += val
            else:
                mid = (l + r) // 2
                if ql <= mid:
                    update(2 * node, l, mid, ql, qr, val)
                if qr > mid:
                    update(2 * node + 1, mid + 1, r, ql, qr, val)
                    
            if count[node] > 0:
                total_len[node] = y_coords[r + 1] - y_coords[l]
            else:
                total_len[node] = 0 if l == r else total_len[2 * node] + total_len[2 * node + 1]
                
        import bisect
        def get_rank(y):
            return bisect.bisect_left(y_coords, y)
            
        MOD = 10**9 + 7
        total_area = 0
        last_x = events[0][0]
        
        for x, event_type, y1, y2 in events:
            total_area = (total_area + (total_len[1] % MOD) * (x - last_x)) % MOD
            ql = get_rank(y1)
            qr = get_rank(y2) - 1
            if ql <= qr:
                update(1, 0, m - 1, ql, qr, event_type)
            last_x = x
            
        return total_area`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q177",
    questionNumber: 177,
    title: "Reverse Pairs (Coordinate Compressed Fenwick Tree)",
    statement:
      "Given an integer array nums, return the number of reverse pairs in the array.\n\nA reverse pair is a pair (i, j) where 0 <= i < j < nums.length and nums[i] > 2 * nums[j].",
    difficulty: "Extreme",
    pattern: "Fenwick Tree + Multi-Scale Coordinate Compression",
    constraints: [
      "1 <= nums.length <= 5 * 10^4",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "nums = [1,3,2,3,1]",
        output: "2",
        explanation: "Pairs are (1, 4): nums[1] = 3 > 2 * nums[4] = 2, and (3, 4): nums[3] = 3 > 2 * nums[4] = 2."
      },
      {
        input: "nums = [2,4,3,5,1]",
        output: "3"
      }
    ],
    explanation:
      "### Multi-Scale Rank Mapping\nFor each $j$, we need to count previous indices $i < j$ such that $nums[i] > 2 \\cdot nums[j]$.\n1. Collect both values $nums[i]$ and $2 \\cdot nums[i]$ in a single list, sort and deduplicate to form a unified coordinate array.\n2. Maintain a Fenwick tree over the ranks recording elements inserted so far.\n3. For each element $x = nums[j]$:\n   - Query count of elements in Fenwick tree with rank strictly greater than $\\text{rank}(2 \\cdot x)$.\n   - Add this count to total reverse pairs.\n   - Insert $x$ at $\\text{rank}(x)$ into the Fenwick tree.\n4. Space is $O(N)$ and total operations take $O(N \\log N)$.",
    interviewInsight:
      "Unifying both scaled coordinates ($2x$) and unscaled coordinates ($x$) into a single discrete rank map prevents runtime branching and floating-point errors.",
    cppSolution: `class Solution {
public:
    int reversePairs(vector<int>& nums) {
        vector<long long> coords;
        for (int x : nums) {
            coords.push_back(x);
            coords.push_back(2LL * x);
        }
        sort(coords.begin(), coords.end());
        coords.erase(unique(coords.begin(), coords.end()), coords.end());
        
        int m = coords.size();
        vector<int> bit(m + 1, 0);
        
        auto add = [&](int i, int delta) {
            for (; i <= m; i += i & (-i)) bit[i] += delta;
        };
        
        auto query = [&](int i) -> int {
            int sum = 0;
            for (; i > 0; i -= i & (-i)) sum += bit[i];
            return sum;
        };
        
        auto getRank = [&](long long val) -> int {
            return lower_bound(coords.begin(), coords.end(), val) - coords.begin() + 1;
        };
        
        int ans = 0;
        for (int x : nums) {
            int doubleRank = getRank(2LL * x);
            ans += query(m) - query(doubleRank);
            add(getRank(x), 1);
        }
        return ans;
    }
};`,
    pythonSolution: `import bisect

class Solution:
    def reversePairs(self, nums: list[int]) -> int:
        coords = set()
        for x in nums:
            coords.add(x)
            coords.add(2 * x)
        sorted_coords = sorted(list(coords))
        m = len(sorted_coords)
        
        bit = [0] * (m + 1)
        def add(i: int, delta: int):
            while i <= m:
                bit[i] += delta
                i += i & (-i)
                
        def query(i: int) -> int:
            total = 0
            while i > 0:
                total += bit[i]
                i -= i & (-i)
            return total
            
        def get_rank(val: int) -> int:
            return bisect.bisect_left(sorted_coords, val) + 1
            
        ans = 0
        for x in nums:
            d_rank = get_rank(2 * x)
            ans += query(m) - query(d_rank)
            add(get_rank(x), 1)
            
        return ans`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q178",
    questionNumber: 178,
    title: "Subtree Range Updates & Queries (Euler Tour + Lazy Segment Tree)",
    statement:
      "You are given a rooted tree with n nodes (0 to n - 1, rooted at 0). Each node initially has value 0.\n\nSupport two operations dynamically:\n1. updateSubtree(u, val): Add val to every node in the subtree of u.\n2. querySubtreeSum(u): Return the sum of values of all nodes in the subtree of u.",
    difficulty: "Extreme",
    pattern: "Euler Tour Tree Flattening + Lazy Propagation Segment Tree",
    constraints: [
      "1 <= n <= 10^5",
      "-10^4 <= val <= 10^4",
      "1 <= queries.length <= 10^5"
    ],
    expectedTimeComplexity: "O(N) DFS, O(log N) per update and query",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "n = 3, edges = [[0,1],[0,2]], updateSubtree(0, 5), updateSubtree(1, 2), querySubtreeSum(0)",
        output: "17",
        explanation: "After adding 5 to entire tree: [5, 5, 5]. After adding 2 to subtree 1: [5, 7, 5]. Total subtree sum at root 0 = 5 + 7 + 5 = 17."
      }
    ],
    explanation:
      "### Subtree Linearization + Lazy Segment Tree\n1. Run DFS to assign entry/exit timestamps `[tin[u], tout[u]]`.\n2. Subtree rooted at $u$ corresponds directly to contiguous range $[tin[u], tout[u]]$ in the Euler tour array.\n3. Maintain a Lazy Segment Tree over the interval $[1, N]$:\n   - `updateSubtree(u, val)` $\\implies$ `updateRange(tin[u], tout[u], val)` in $O(\\log N)$.\n   - `querySubtreeSum(u)` $\\implies$ `querySum(tin[u], tout[u])` in $O(\\log N)$.",
    interviewInsight:
      "Euler Tour maps complex tree subtree modifications directly into standard 1D range update and query operations.",
    cppSolution: `class SubtreeLazyManager {
    int n, timer;
    vector<int> tin, tout;
    vector<long long> tree, lazy;

    void dfs(int u, int p, const vector<vector<int>>& adj) {
        tin[u] = ++timer;
        for (int v : adj[u]) {
            if (v != p) dfs(v, u, adj);
        }
        tout[u] = timer;
    }

    void pushDown(int node, int l, int r) {
        if (lazy[node] != 0) {
            int mid = l + (r - l) / 2;
            lazy[2 * node] += lazy[node];
            tree[2 * node] += lazy[node] * (mid - l + 1);
            lazy[2 * node + 1] += lazy[node];
            tree[2 * node + 1] += lazy[node] * (r - mid);
            lazy[node] = 0;
        }
    }

    void update(int node, int l, int r, int ql, int qr, long long val) {
        if (ql <= l && r <= qr) {
            tree[node] += val * (r - l + 1);
            lazy[node] += val;
            return;
        }
        pushDown(node, l, r);
        int mid = l + (r - l) / 2;
        if (ql <= mid) update(2 * node, l, mid, ql, qr, val);
        if (qr > mid) update(2 * node + 1, mid + 1, r, ql, qr, val);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    long long query(int node, int l, int r, int ql, int qr) {
        if (ql <= l && r <= qr) return tree[node];
        if (r < ql || l > qr) return 0;
        pushDown(node, l, r);
        int mid = l + (r - l) / 2;
        return query(2 * node, l, mid, ql, qr) + query(2 * node + 1, mid + 1, r, ql, qr);
    }

public:
    SubtreeLazyManager(int n, const vector<vector<int>>& adj) : n(n) {
        tin.resize(n);
        tout.resize(n);
        timer = 0;
        dfs(0, -1, adj);
        tree.assign(4 * n + 4, 0);
        lazy.assign(4 * n + 4, 0);
    }

    void updateSubtree(int u, long long val) {
        update(1, 1, n, tin[u], tout[u], val);
    }

    long long querySubtreeSum(int u) {
        return query(1, 1, n, tin[u], tout[u]);
    }
};`,
    pythonSolution: `class SubtreeLazyManager:
    def __init__(self, n: int, adj: list[list[int]]):
        self.n = n
        self.tin = [0] * n
        self.tout = [0] * n
        self.timer = 0
        
        def dfs(u: int, p: int):
            self.timer += 1
            self.tin[u] = self.timer
            for v in adj[u]:
                if v != p:
                    dfs(v, u)
            self.tout[u] = self.timer
            
        dfs(0, -1)
        self.tree = [0] * (4 * n + 4)
        self.lazy = [0] * (4 * n + 4)

    def _push_down(self, node: int, l: int, r: int):
        if self.lazy[node] != 0:
            mid = (l + r) // 2
            val = self.lazy[node]
            self.lazy[2 * node] += val
            self.tree[2 * node] += val * (mid - l + 1)
            self.lazy[2 * node + 1] += val
            self.tree[2 * node + 1] += val * (r - mid)
            self.lazy[node] = 0

    def updateSubtree(self, u: int, val: int, node: int = 1, l: int = 1, r: int = None):
        if r is None: r = self.n
        ql, qr = self.tin[u], self.tout[u]
        if ql <= l and r <= qr:
            self.tree[node] += val * (r - l + 1)
            self.lazy[node] += val
            return
        self._push_down(node, l, r)
        mid = (l + r) // 2
        if ql <= mid:
            self.updateSubtree(u, val, 2 * node, l, mid)
        if qr > mid:
            self.updateSubtree(u, val, 2 * node + 1, mid + 1, r)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def querySubtreeSum(self, u: int, node: int = 1, l: int = 1, r: int = None) -> int:
        if r is None: r = self.n
        ql, qr = self.tin[u], self.tout[u]
        if ql <= l and r <= qr:
            return self.tree[node]
        if r < ql or l > qr:
            return 0
        self._push_down(node, l, r)
        mid = (l + r) // 2
        return self.querySubtreeSum(u, 2 * node, l, mid) + self.querySubtreeSum(u, 2 * node + 1, mid + 1, r)`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q179",
    questionNumber: 179,
    title: "Maximum Subarray XOR (Prefix XOR + Binary Trie)",
    statement:
      "Given an integer array nums, find the maximum bitwise XOR sum of any contiguous non-empty subarray in O(N log(max_val)) time.",
    difficulty: "Extreme",
    pattern: "Prefix XOR + Bitwise Trie Traversal",
    constraints: [
      "1 <= nums.length <= 10^5",
      "0 <= nums[i] <= 10^9"
    ],
    expectedTimeComplexity: "O(31 * N)",
    expectedSpaceComplexity: "O(31 * N)",
    examples: [
      {
        input: "nums = [1, 2, 3, 4]",
        output: "7",
        explanation: "Subarray [3, 4] has XOR sum 3 XOR 4 = 7."
      },
      {
        input: "nums = [8, 1, 2, 12, 7, 6]",
        output: "15",
        explanation: "Subarray [1, 2, 12] has XOR sum 1 XOR 2 XOR 12 = 15."
      }
    ],
    explanation:
      "### Subarray XOR to Prefix Inversion\nAny subarray XOR from index $i$ to $j$ is $P[j] \\oplus P[i-1]$ where $P$ is the prefix XOR array.\n- The problem reduces to finding two prefix XOR values $P[j]$ and $P[k]$ that maximize $P[j] \\oplus P[k]$.\n- Initialize a Binary Trie containing $P[0] = 0$.\n- Running prefix XOR $curr = 0$.\n- For each number $x$ in `nums`:\n  - $curr = curr \\oplus x$.\n  - Query Binary Trie for prefix with maximum XOR against $curr$.\n  - Update answer with result.\n  - Insert $curr$ into the Binary Trie.",
    interviewInsight:
      "Prefix XOR transforms 1D contiguous range XOR queries into pairwise XOR maximization on Bitwise Tries.",
    cppSolution: `class Solution {
    struct TrieNode {
        TrieNode* children[2] = {nullptr, nullptr};
    };

    void insert(TrieNode* root, int num) {
        TrieNode* curr = root;
        for (int i = 30; i >= 0; --i) {
            int bit = (num >> i) & 1;
            if (!curr->children[bit]) curr->children[bit] = new TrieNode();
            curr = curr->children[bit];
        }
    }

    int queryMaxXor(TrieNode* root, int num) {
        TrieNode* curr = root;
        int maxXor = 0;
        for (int i = 30; i >= 0; --i) {
            int bit = (num >> i) & 1;
            int opp = 1 - bit;
            if (curr->children[opp]) {
                maxXor |= (1 << i);
                curr = curr->children[opp];
            } else {
                curr = curr->children[bit];
            }
        }
        return maxXor;
    }

public:
    int maxSubarrayXOR(vector<int>& nums) {
        TrieNode* root = new TrieNode();
        insert(root, 0);
        
        int currXor = 0;
        int maxAns = 0;
        
        for (int x : nums) {
            currXor ^= x;
            maxAns = max(maxAns, queryMaxXor(root, currXor));
            insert(root, currXor);
        }
        return maxAns;
    }
};`,
    pythonSolution: `class TrieNode:
    def __init__(self):
        self.children = [None, None]

class Solution:
    def maxSubarrayXOR(self, nums: list[int]) -> int:
        root = TrieNode()
        
        def insert(num: int):
            curr = root
            for i in range(30, -1, -1):
                bit = (num >> i) & 1
                if not curr.children[bit]:
                    curr.children[bit] = TrieNode()
                curr = curr.children[bit]
                
        def query(num: int) -> int:
            curr = root
            max_xor = 0
            for i in range(30, -1, -1):
                bit = (num >> i) & 1
                opp = 1 - bit
                if curr.children[opp]:
                    max_xor |= (1 << i)
                    curr = curr.children[opp]
                else:
                    curr = curr.children[bit]
            return max_xor
            
        insert(0)
        curr_xor = 0
        max_ans = 0
        
        for x in nums:
            curr_xor ^= x
            max_ans = max(max_ans, query(curr_xor))
            insert(curr_xor)
            
        return max_ans`,
    topic: "Advanced Data Structures",
    batch: 9
  },
  {
    id: "Q180",
    questionNumber: 180,
    title: "Distinct Numbers in Range Queries (Offline Fenwick Tree)",
    statement:
      "Given an integer array nums of size n and an array of queries where queries[i] = [li, ri], return the number of distinct elements in nums[li...ri] for each query.\n\nProcess all queries in O((N + Q) log N) time.",
    difficulty: "Extreme",
    pattern: "Offline Query Sorting + Fenwick Tree Last-Seen Deduplication",
    constraints: [
      "1 <= nums.length, queries.length <= 10^5",
      "0 <= nums[i] <= 10^6",
      "0 <= li <= ri < nums.length"
    ],
    expectedTimeComplexity: "O((N + Q) log N + Q log Q)",
    expectedSpaceComplexity: "O(N + Q)",
    examples: [
      {
        input: "nums = [1, 2, 1, 3, 4, 2, 3], queries = [[0, 4], [1, 3], [2, 6]]",
        output: "[4, 3, 4]",
        explanation: "nums[0..4] = [1, 2, 1, 3, 4] has 4 distinct elements {1, 2, 3, 4}. nums[1..3] = [2, 1, 3] has 3. nums[2..6] = [1, 3, 4, 2, 3] has 4."
      }
    ],
    explanation:
      "### Right-Endpoint Offline Sorting & Last-Seen Indexing\n1. Sort queries by right boundary $R$ in ascending order: `queries = [[L, R, originalIdx], ...]`.\n2. Maintain a Fenwick Tree of size $N$ and a hash map `lastSeen` tracking the most recent index of each value.\n3. Sweep index $r$ from 0 to $N-1$:\n   - Value $x = nums[r]$.\n   - If $x$ appeared previously at `prev = lastSeen[x]`, remove it from the Fenwick Tree via `add(prev + 1, -1)`.\n   - Insert current occurrence via `add(r + 1, +1)` and update `lastSeen[x] = r`.\n   - For all queries ending at $R = r$:\n     The distinct elements in range $[L, R]$ equals the number of active singletons in $[L, R]$: `query(R + 1) - query(L)`.",
    interviewInsight:
      "Sorting queries by right endpoint and maintaining only the rightmost instance of each duplicate eliminates Mo's $O(N \\sqrt{Q})$ algorithm in favor of pure $O((N + Q) \\log N)$ Fenwick processing.",
    cppSolution: `class Solution {
public:
    vector<int> distinctNumbersQueries(vector<int>& nums, vector<vector<int>>& queries) {
        int n = nums.size(), q = queries.size();
        vector<vector<int>> sortedQueries(q);
        for (int i = 0; i < q; ++i) {
            sortedQueries[i] = {queries[i][1], queries[i][0], i}; // R, L, origIdx
        }
        sort(sortedQueries.begin(), sortedQueries.end());
        
        vector<int> bit(n + 1, 0);
        auto add = [&](int i, int delta) {
            for (; i <= n; i += i & (-i)) bit[i] += delta;
        };
        auto query = [&](int i) -> int {
            int sum = 0;
            for (; i > 0; i -= i & (-i)) sum += bit[i];
            return sum;
        };
        
        unordered_map<int, int> lastSeen;
        vector<int> ans(q);
        int rPtr = 0;
        
        for (auto& sq : sortedQueries) {
            int R = sq[0], L = sq[1], origIdx = sq[2];
            while (rPtr <= R) {
                int val = nums[rPtr];
                if (lastSeen.count(val)) {
                    add(lastSeen[val] + 1, -1);
                }
                add(rPtr + 1, 1);
                lastSeen[val] = rPtr;
                rPtr++;
            }
            ans[origIdx] = query(R + 1) - query(L);
        }
        return ans;
    }
};`,
    pythonSolution: `class Solution:
    def distinctNumbersQueries(self, nums: list[int], queries: list[list[int]]) -> list[int]:
        n = len(nums)
        q = len(queries)
        sorted_queries = sorted([(r, l, i) for i, (l, r) in enumerate(queries)])
        
        bit = [0] * (n + 1)
        def add(i: int, delta: int):
            while i <= n:
                bit[i] += delta
                i += i & (-i)
                
        def query(i: int) -> int:
            total = 0
            while i > 0:
                total += bit[i]
                i -= i & (-i)
            return total
            
        last_seen = {}
        ans = [0] * q
        r_ptr = 0
        
        for R, L, orig_idx in sorted_queries:
            while r_ptr <= R:
                val = nums[r_ptr]
                if val in last_seen:
                    add(last_seen[val] + 1, -1)
                add(r_ptr + 1, 1)
                last_seen[val] = r_ptr
                r_ptr += 1
            ans[orig_idx] = query(R + 1) - query(L)
            
        return ans`,
    topic: "Advanced Data Structures",
    batch: 9
  }
];
