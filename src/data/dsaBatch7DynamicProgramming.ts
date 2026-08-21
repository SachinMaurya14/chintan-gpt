import { DSAInterviewProblem } from "./dsaQuestionTypes.js";

export const DSA_BATCH_7_DYNAMIC_PROGRAMMING: DSAInterviewProblem[] = [
  {
    id: "Q121",
    questionNumber: 121,
    title: "House Robber II (Circular Houses)",
    statement:
      "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.",
    difficulty: "Medium",
    pattern: "1D Dynamic Programming / Circular State Reduction",
    constraints: [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 1000"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1) auxiliary space",
    examples: [
      {
        input: "nums = [2,3,2]",
        output: "3",
        explanation: "You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent neighbors in a circle."
      },
      {
        input: "nums = [1,2,3,1]",
        output: "4",
        explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total amount = 1 + 3 = 4."
      },
      {
        input: "nums = [1,2,3]",
        output: "3"
      }
    ],
    explanation:
      "### Brute Force vs Subproblem Breakdown\nBecause houses 0 and N-1 are adjacent, robbing house 0 precludes robbing house N-1, and vice versa. This mutual exclusion breaks the circular dependency into two linear subproblems:\n1. Rob houses in range `[0, N-2]` (ignore house N-1).\n2. Rob houses in range `[1, N-1]` (ignore house 0).\n\nFor any linear range `[start, end]`, let `dp[i]` be the maximum loot up to house `i`. The transition is:\n`dp[i] = max(dp[i-1], dp[i-2] + nums[i])`.\nSince each state depends only on the previous two values, we maintain two rolling variables (`prev1`, `prev2`), optimizing space to O(1). The answer is `max(robLinear(0, N-2), robLinear(1, N-1))`.",
    interviewInsight:
      "Circular DP questions almost always reduce to a small number of linear DP instances by breaking the circular link on a forced decision or case boundary.",
    cppSolution: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 0) return 0;
        if (n == 1) return nums[0];
        
        auto robLinear = [&](int start, int end) -> int {
            int prev2 = 0, prev1 = 0;
            for (int i = start; i <= end; ++i) {
                int curr = max(prev1, prev2 + nums[i]);
                prev2 = prev1;
                prev1 = curr;
            }
            return prev1;
        };
        
        return max(robLinear(0, n - 2), robLinear(1, n - 1));
    }
};`,
    pythonSolution: `class Solution:
    def rob(self, nums: list[int]) -> int:
        if not nums:
            return 0
        if len(nums) == 1:
            return nums[0]
            
        def rob_linear(start: int, end: int) -> int:
            prev2, prev1 = 0, 0
            for i in range(start, end + 1):
                curr = max(prev1, prev2 + nums[i])
                prev2, prev1 = prev1, curr
            return prev1
            
        return max(rob_linear(0, len(nums) - 2), rob_linear(1, len(nums) - 1))`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q122",
    questionNumber: 122,
    title: "Coin Change (Minimum Coins)",
    statement:
      "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nYou may assume that you have an infinite number of each kind of coin.",
    difficulty: "Medium",
    pattern: "Unbounded Knapsack / 1D Bottom-Up DP",
    constraints: [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    expectedTimeComplexity: "O(amount * coins.length)",
    expectedSpaceComplexity: "O(amount)",
    examples: [
      {
        input: "coins = [1,2,5], amount = 11",
        output: "3",
        explanation: "11 = 5 + 5 + 1 (3 coins total)."
      },
      {
        input: "coins = [2], amount = 3",
        output: "-1"
      },
      {
        input: "coins = [1], amount = 0",
        output: "0"
      }
    ],
    explanation:
      "### State Definition & Transition\nLet `dp[a]` be the minimum number of coins needed to form amount `a`.\n- Base case: `dp[0] = 0` (0 coins for 0 amount), all other entries initialized to `amount + 1` (infinity sentinel).\n- Transition: For every target `a` from 1 to `amount`, and for every coin `c` in `coins` where `c <= a`:\n  `dp[a] = min(dp[a], dp[a - c] + 1)`.\n- Result: If `dp[amount] > amount`, return -1, otherwise `dp[amount]`.",
    interviewInsight:
      "Unbounded knapsack iterates the outer loop over targets and inner over items (or vice-versa), while 0/1 knapsack must traverse target space backwards in 1D arrays to prevent duplicate item reuse.",
    cppSolution: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        
        for (int a = 1; a <= amount; ++a) {
            for (int c : coins) {
                if (c <= a) {
                    dp[a] = min(dp[a], dp[a - c] + 1);
                }
            }
        }
        
        return dp[amount] > amount ? -1 : dp[amount];
    }
};`,
    pythonSolution: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        dp = [amount + 1] * (amount + 1)
        dp[0] = 0
        
        for a in range(1, amount + 1):
            for c in coins:
                if c <= a:
                    dp[a] = min(dp[a], dp[a - c] + 1)
                    
        return dp[amount] if dp[amount] <= amount else -1`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q123",
    questionNumber: 123,
    title: "Longest Common Subsequence",
    statement:
      "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. A common subsequence of two strings is a subsequence that is common to both strings.",
    difficulty: "Medium",
    pattern: "2D Grid / String DP with Rolling Array Space Optimization",
    constraints: [
      "1 <= text1.length, text2.length <= 1000",
      "text1 and text2 consist of only lowercase English characters."
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(min(M, N))",
    examples: [
      {
        input: "text1 = \"abcde\", text2 = \"ace\"",
        output: "3",
        explanation: "The longest common subsequence is \"ace\" and its length is 3."
      },
      {
        input: "text1 = \"abc\", text2 = \"abc\"",
        output: "3",
        explanation: "The longest common subsequence is \"abc\" and its length is 3."
      },
      {
        input: "text1 = \"abc\", text2 = \"def\"",
        output: "0"
      }
    ],
    explanation:
      "### State Definition & Transition\nLet `dp[i][j]` be the LCS length between prefix `text1[0...i-1]` and `text2[0...j-1]`.\n- If `text1[i-1] == text2[j-1]`: `dp[i][j] = 1 + dp[i-1][j-1]` (extend the match).\n- Else: `dp[i][j] = max(dp[i-1][j], dp[i][j-1])` (drop one character from either string).\n\nSince `dp[i][j]` only depends on row `i-1` and the current row `i`, we can compress space to a single 1D array of size `min(M, N)` with a temporary variable to store the diagonal value `dp[i-1][j-1]`.",
    interviewInsight:
      "LCS forms the foundational core of diff algorithms (Git diff), bioinformatics sequence alignment (Needleman-Wunsch), and Edit Distance.",
    cppSolution: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        if (m < n) {
            swap(text1, text2);
            swap(m, n);
        }
        
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= m; ++i) {
            int prevDiag = 0;
            for (int j = 1; j <= n; ++j) {
                int temp = dp[j];
                if (text1[i - 1] == text2[j - 1]) {
                    dp[j] = 1 + prevDiag;
                } else {
                    dp[j] = max(dp[j], dp[j - 1]);
                }
                prevDiag = temp;
            }
        }
        return dp[n];
    }
};`,
    pythonSolution: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        if len(text1) < len(text2):
            text1, text2 = text2, text1
            
        m, n = len(text1), len(text2)
        dp = [0] * (n + 1)
        
        for i in range(1, m + 1):
            prev_diag = 0
            for j in range(1, n + 1):
                temp = dp[j]
                if text1[i - 1] == text2[j - 1]:
                    dp[j] = 1 + prev_diag
                else:
                    dp[j] = max(dp[j], dp[j - 1])
                prev_diag = temp
                
        return dp[n]`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q124",
    questionNumber: 124,
    title: "Unique Paths II (Grid DP with Obstacles)",
    statement:
      "You are given an m x n integer array obstacleGrid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.\n\nAn obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.\n\nReturn the number of possible unique paths that the robot can take to reach the bottom-right corner.",
    difficulty: "Medium",
    pattern: "2D Grid DP / 1D Rolling State Accumulation",
    constraints: [
      "m == obstacleGrid.length",
      "n == obstacleGrid[i].length",
      "1 <= m, n <= 100",
      "obstacleGrid[i][j] is 0 or 1"
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]",
        output: "2",
        explanation: "There is one obstacle in the middle of the 3x3 grid. Paths: Right->Right->Down->Down or Down->Down->Right->Right."
      },
      {
        input: "obstacleGrid = [[0,1],[0,0]]",
        output: "1"
      }
    ],
    explanation:
      "### Transition & Space Compression\nLet `dp[j]` store the number of ways to reach column `j` in the current row.\n- Base condition: If `obstacleGrid[0][0] == 1`, return 0. Otherwise `dp[0] = 1`.\n- For each cell `(i, j)`:\n  - If `obstacleGrid[i][j] == 1`, set `dp[j] = 0` (blocked path).\n  - Else if `j > 0`, `dp[j] += dp[j - 1]` (ways from top cell `dp[j]` + ways from left cell `dp[j-1]`).\n- Result: `dp[n - 1]`.",
    interviewInsight:
      "1D rolling DP on grid problems reduces space from O(M*N) to O(N) by implicitly keeping the top neighbor in `dp[j]` before it is updated with the left neighbor `dp[j-1]`.",
    cppSolution: `class Solution {
public:
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        int m = obstacleGrid.size();
        int n = obstacleGrid[0].size();
        if (obstacleGrid[0][0] == 1 || obstacleGrid[m - 1][n - 1] == 1) return 0;
        
        vector<long long> dp(n, 0);
        dp[0] = 1;
        
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (obstacleGrid[i][j] == 1) {
                    dp[j] = 0;
                } else if (j > 0) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return dp[n - 1];
    }
};`,
    pythonSolution: `class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: list[list[int]]) -> int:
        m, n = len(obstacleGrid), len(obstacleGrid[0])
        if obstacleGrid[0][0] == 1 or obstacleGrid[m - 1][n - 1] == 1:
            return 0
            
        dp = [0] * n
        dp[0] = 1
        
        for i in range(m):
            for j in range(n):
                if obstacleGrid[i][j] == 1:
                    dp[j] = 0
                elif j > 0:
                    dp[j] += dp[j - 1]
                    
        return dp[-1]`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q125",
    questionNumber: 125,
    title: "Longest Increasing Subsequence (Patience Sorting)",
    statement:
      "Given an integer array nums, return the length of the longest strictly increasing subsequence.\n\nA subsequence is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.",
    difficulty: "Hard",
    pattern: "DP + Binary Search / Patience Sorting",
    constraints: [
      "1 <= nums.length <= 2500",
      "-10^4 <= nums[i] <= 10^4"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "nums = [10,9,2,5,3,7,101,18]",
        output: "4",
        explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4."
      },
      {
        input: "nums = [0,1,0,3,2,3]",
        output: "4"
      },
      {
        input: "nums = [7,7,7,7,7,7,7]",
        output: "1"
      }
    ],
    explanation:
      "### Why O(N^2) Fails & Patience Sorting O(N log N)\nStandard DP maintains `dp[i]` = LIS ending at index `i` via nested loops in O(N^2). To achieve O(N log N), maintain array `tails` where `tails[k]` stores the smallest tail element of all increasing subsequences of length `k + 1`.\n- `tails` is strictly monotonically increasing.\n- For each number `x` in `nums`, find the smallest index `idx` such that `tails[idx] >= x` using `std::lower_bound` (binary search).\n- If `idx == tails.size()`, append `x` (we extended the longest known subsequence).\n- Else, update `tails[idx] = x` (we found a smaller tail for subsequences of length `idx + 1`, opening wider room for future elements).\n- Result: `tails.size()`.",
    interviewInsight:
      "Patience sorting doesn't necessarily construct the actual LIS in `tails`, but its final size is guaranteed to equal the maximum LIS length.",
    cppSolution: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) {
                tails.push_back(x);
            } else {
                *it = x;
            }
        }
        return tails.size();
    }
};`,
    pythonSolution: `import bisect

class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect.bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q126",
    questionNumber: 126,
    title: "Partition Equal Subset Sum",
    statement:
      "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.",
    difficulty: "Hard",
    pattern: "0/1 Knapsack Decision Space / Bitset DP Optimization",
    constraints: [
      "1 <= nums.length <= 200",
      "1 <= nums[i] <= 100"
    ],
    expectedTimeComplexity: "O(N * Target)",
    expectedSpaceComplexity: "O(Target)",
    examples: [
      {
        input: "nums = [1,5,11,5]",
        output: "true",
        explanation: "The array can be partitioned as [1, 5, 5] and [11]."
      },
      {
        input: "nums = [1,2,3,5]",
        output: "false",
        explanation: "The array cannot be partitioned into equal sum subsets."
      }
    ],
    explanation:
      "### Mathematical Reduction to 0/1 Knapsack\nLet `totalSum = sum(nums)`. If `totalSum % 2 != 0`, partitioning into two equal integer sums is impossible -> return `false`.\nTarget sum is `target = totalSum / 2`. We need to determine if any subset sums to `target`.\n- Let `dp[s]` be a boolean indicating if sum `s` is achievable.\n- Base case: `dp[0] = true`.\n- For each number `num` in `nums`:\n  Traverse `s` **backwards** from `target` down to `num`:\n  `dp[s] = dp[s] || dp[s - num]`.\n  (Backwards traversal ensures each number is counted at most once).\n- Early exit: If `dp[target]` becomes true, return `true` immediately.",
    interviewInsight:
      "In C++, `std::bitset<10001> dp` executes the 0/1 knapsack in single-instruction parallel bit shifts (`dp |= (dp << num)`), giving 64x hardware acceleration.",
    cppSolution: `class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int totalSum = 0;
        for (int x : nums) totalSum += x;
        if (totalSum % 2 != 0) return false;
        
        int target = totalSum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int num : nums) {
            for (int s = target; s >= num; --s) {
                if (dp[s - num]) {
                    dp[s] = true;
                }
            }
            if (dp[target]) return true;
        }
        return dp[target];
    }
};`,
    pythonSolution: `class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total_sum = sum(nums)
        if total_sum % 2 != 0:
            return False
            
        target = total_sum // 2
        dp = [False] * (target + 1)
        dp[0] = True
        
        for num in nums:
            for s in range(target, num - 1, -1):
                if dp[s - num]:
                    dp[s] = True
            if dp[target]:
                return True
                
        return dp[target]`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q127",
    questionNumber: 127,
    title: "Edit Distance (Levenshtein Distance)",
    statement:
      "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character",
    difficulty: "Hard",
    pattern: "2D Multi-Choice String DP / Rolling Memory Compression",
    constraints: [
      "0 <= word1.length, word2.length <= 500",
      "word1 and word2 consist of lowercase English letters."
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "word1 = \"horse\", word2 = \"ros\"",
        output: "3",
        explanation: "horse -> rorse (replace 'h' with 'r') -> rose (remove 'r') -> ros (remove 'e')"
      },
      {
        input: "word1 = \"intention\", word2 = \"execution\"",
        output: "5",
        explanation: "intention -> inention (remove 't') -> enention (replace 'i' with 'e') -> exention (replace 'n' with 'x') -> exection (replace 'n' with 'c') -> execution (insert 'u')"
      }
    ],
    explanation:
      "### State Machine & DP Transitions\nLet `dp[i][j]` be the minimum operations to convert `word1[0...i-1]` to `word2[0...j-1]`.\n- If `word1[i-1] == word2[j-1]`: `dp[i][j] = dp[i-1][j-1]` (no cost).\n- Else: `dp[i][j] = 1 + min({`\n  1. `dp[i][j-1]` (Insert into word1)\n  2. `dp[i-1][j]` (Delete from word1)\n  3. `dp[i-1][j-1]` (Replace character)\n  `})`.\n- Base cases: Converting empty prefix requires `j` insertions (`dp[0][j] = j`) and `i` deletions (`dp[i][0] = i`). Space is compressed to 1D row buffer using a diagonal accumulator.",
    interviewInsight:
      "Notice how the three subproblem coordinates correspond visually to the 2D grid neighbors: left (insert), top (delete), and top-left diagonal (replace).",
    cppSolution: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<int> dp(n + 1);
        for (int j = 0; j <= n; ++j) dp[j] = j;
        
        for (int i = 1; i <= m; ++i) {
            int prevDiag = dp[0];
            dp[0] = i;
            for (int j = 1; j <= n; ++j) {
                int temp = dp[j];
                if (word1[i - 1] == word2[j - 1]) {
                    dp[j] = prevDiag;
                } else {
                    dp[j] = 1 + min({dp[j - 1], dp[j], prevDiag});
                }
                prevDiag = temp;
            }
        }
        return dp[n];
    }
};`,
    pythonSolution: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        m, n = len(word1), len(word2)
        dp = list(range(n + 1))
        
        for i in range(1, m + 1):
            prev_diag = dp[0]
            dp[0] = i
            for j in range(1, n + 1):
                temp = dp[j]
                if word1[i - 1] == word2[j - 1]:
                    dp[j] = prev_diag
                else:
                    dp[j] = 1 + min(dp[j - 1], dp[j], prev_diag)
                prev_diag = temp
                
        return dp[n]`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q128",
    questionNumber: 128,
    title: "Best Time to Buy and Sell Stock with Cooldown",
    statement:
      "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nFind the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:\n- After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).\n- Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).",
    difficulty: "Hard",
    pattern: "State-Machine Dynamic Programming",
    constraints: [
      "1 <= prices.length <= 5000",
      "0 <= prices[i] <= 1000"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "prices = [1,2,3,0,2]",
        output: "3",
        explanation: "transactions = [buy, sell, cooldown, buy, sell]"
      },
      {
        input: "prices = [1]",
        output: "0"
      }
    ],
    explanation:
      "### State Machine Modeling\nAt the end of day `i`, the agent can be in one of 3 states:\n1. `held[i]`: Currently holding a stock.\n   - Transition: `max(held[i-1], reset[i-1] - prices[i])`.\n2. `sold[i]`: Just sold a stock today (triggers cooldown tomorrow).\n   - Transition: `held[i-1] + prices[i]`.\n3. `reset[i]`: In cooldown or empty-handed waiting to buy.\n   - Transition: `max(reset[i-1], sold[i-1])`.\n\nBase cases at day 0: `held = -prices[0]`, `sold = 0`, `reset = 0`.\nSince each day only depends on previous day states, space is strictly O(1).",
    interviewInsight:
      "State-machine DP simplifies multi-step business logic by turning sequential rules (like mandatory cooldowns or fees) into clear directed graph state nodes.",
    cppSolution: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        if (prices.empty()) return 0;
        int held = -prices[0];
        int sold = 0;
        int reset = 0;
        
        for (size_t i = 1; i < prices.size(); ++i) {
            int prevHeld = held;
            int prevSold = sold;
            int prevReset = reset;
            
            held = max(prevHeld, prevReset - prices[i]);
            sold = prevHeld + prices[i];
            reset = max(prevReset, prevSold);
        }
        return max(sold, reset);
    }
};`,
    pythonSolution: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        if not prices:
            return 0
        held = -prices[0]
        sold = 0
        reset = 0
        
        for price in prices[1:]:
            prev_held, prev_sold, prev_reset = held, sold, reset
            held = max(prev_held, prev_reset - price)
            sold = prev_held + price
            reset = max(prev_reset, prev_sold)
            
        return max(sold, reset)`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q129",
    questionNumber: 129,
    title: "Decode Ways II (Wildcard Multi-Branch DP)",
    statement:
      "A message containing letters from A-Z is being encoded to numbers using the mapping 'A' -> 1, 'B' -> 2, ..., 'Z' -> 26.\n\nTo decode an encoded message, all the digits must be grouped then mapped back into letters. In addition to the digits 1-9, the encoded message may also contain the '*' character, which can represent any digit from '1' to '9' ('1', '2', ..., '9').\n\nGiven a string s containing digits and '*' characters, return the number of ways to decode it. Since the answer may be very large, return it modulo 10^9 + 7.",
    difficulty: "Hard",
    pattern: "String Parsing DP / Modulo State Transitions",
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a digit or '*'"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1) auxiliary space",
    examples: [
      {
        input: "s = \"*\"",
        output: "9",
        explanation: "The encoded message can represent any of the encoded messages \"1\", \"2\", \"3\", \"4\", \"5\", \"6\", \"7\", \"8\", or \"9\"."
      },
      {
        input: "s = \"1*\"",
        output: "18",
        explanation: "The encoded message can represent \"11\" through \"19\" (9 ways for 2-digit) or \"1\" followed by \"1\"-\"9\" (9 ways for single digits) -> 18 total."
      },
      {
        input: "s = \"2*\"",
        output: "15",
        explanation: "Single digits: 9 ways. Valid 2-digit pairs \"21\" through \"26\": 6 ways. Total = 9 + 6 = 15."
      }
    ],
    explanation:
      "### Comprehensive Transition Matrix\nLet `dp[i]` be the ways to decode prefix `s[0...i-1]`.\nEach step considers single-character decoding `s[i-1]` (combining with `dp[i-1]`) and double-character decoding `s[i-2...i-1]` (combining with `dp[i-2]`).\n1. Single character `s[i-1]`:\n   - '*' -> 9 ways.\n   - '1'-'9' -> 1 way.\n   - '0' -> 0 ways.\n2. Double character pair `(c1, c2) = (s[i-2], s[i-1])`:\n   - `* *` -> 15 ways (11-19: 9 ways, 21-26: 6 ways).\n   - `* d` -> if `d <= 6`, 2 ways ('1d', '2d'), else 1 way ('1d').\n   - `1 *` -> 9 ways (11-19).\n   - `2 *` -> 6 ways (21-26).\n   - `1 d` -> 1 way.\n   - `2 d` -> 1 way if `d <= 6`, else 0.\n   - Otherwise -> 0 ways.\nModulo arithmetic `10^9 + 7` must be applied after every addition.",
    interviewInsight:
      "Breaking complex parsing rules into modular helper functions `ways1(c)` and `ways2(c1, c2)` prevents convoluted nested if-else ladders and regression bugs.",
    cppSolution: `class Solution {
public:
    int numDecodings(string s) {
        long long MOD = 1e9 + 7;
        long long prev2 = 1;
        long long prev1 = (s[0] == '*') ? 9 : (s[0] == '0' ? 0 : 1);
        
        auto ways1 = [](char c) -> long long {
            if (c == '*') return 9;
            if (c == '0') return 0;
            return 1;
        };
        
        auto ways2 = [](char c1, char c2) -> long long {
            if (c1 == '*' && c2 == '*') return 15;
            if (c1 == '*') {
                return (c2 <= '6') ? 2 : 1;
            }
            if (c2 == '*') {
                if (c1 == '1') return 9;
                if (c1 == '2') return 6;
                return 0;
            }
            int val = (c1 - '0') * 10 + (c2 - '0');
            return (val >= 10 && val <= 26) ? 1 : 0;
        };
        
        for (size_t i = 1; i < s.size(); ++i) {
            long long curr = (prev1 * ways1(s[i])) % MOD;
            curr = (curr + prev2 * ways2(s[i - 1], s[i])) % MOD;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};`,
    pythonSolution: `class Solution:
    def numDecodings(self, s: str) -> int:
        MOD = 10**9 + 7
        prev2 = 1
        prev1 = 9 if s[0] == '*' else (0 if s[0] == '0' else 1)
        
        def ways1(c: str) -> int:
            if c == '*': return 9
            if c == '0': return 0
            return 1
            
        def ways2(c1: str, c2: str) -> int:
            if c1 == '*' and c2 == '*': return 15
            if c1 == '*': return 2 if c2 <= '6' else 1
            if c2 == '*':
                if c1 == '1': return 9
                if c1 == '2': return 6
                return 0
            val = int(c1 + c2)
            return 1 if 10 <= val <= 26 else 0
            
        for i in range(1, len(s)):
            curr = (prev1 * ways1(s[i]) + prev2 * ways2(s[i - 1], s[i])) % MOD
            prev2, prev1 = prev1, curr
            
        return prev1`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q130",
    questionNumber: 130,
    title: "Maximum Subarray Sum with One Deletion",
    statement:
      "Given an array of integers, return the maximum sum for a non-empty subarray (contiguous elements) with at most one element deletion. In other words, you want to choose a subarray and optionally delete one element from it so that there is still at least one element left and the sum of the remaining elements is maximum.\n\nNote that the subarray needs to be non-empty after deleting one element.",
    difficulty: "Hard",
    pattern: "Bidirectional Kadane / Multi-State 1D DP",
    constraints: [
      "1 <= arr.length <= 10^5",
      "-10^4 <= arr[i] <= 10^4"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "arr = [1,-2,0,3]",
        output: "4",
        explanation: "Because we can delete -2, and get subarray [1, 0, 3] which sum is 4."
      },
      {
        input: "arr = [1,-2,-2,3]",
        output: "3",
        explanation: "Subarray [3] gives sum 3."
      },
      {
        input: "arr = [-1,-1,-1,-1]",
        output: "-1",
        explanation: "The final subarray cannot be empty, so we must pick at least one element [-1]."
      }
    ],
    explanation:
      "### Multi-State DP Formulation\nLet `noDel` be the maximum subarray sum ending at the current element with 0 deletions (standard Kadane's algorithm).\nLet `oneDel` be the maximum subarray sum ending at the current element with exactly 1 deletion.\nFor each element `x`:\n- `oneDel = max(oneDel + x, noDel)` (either we extend a previously deleted subarray by taking `x`, or we delete current element `x` from the previous contiguous subarray).\n- `noDel = max(x, noDel + x)` (standard Kadane extension or reset).\n- Global maximum `ans = max({ans, noDel, oneDel})`.\nInitialized with `noDel = arr[0]`, `oneDel = 0`, `ans = arr[0]`.",
    interviewInsight:
      "Whenever a problem permits 'at most K operations / deletions / reversals' on a stream or array, split the current DP state into K distinct tracked state variables.",
    cppSolution: `class Solution {
public:
    int maximumSum(vector<int>& arr) {
        int noDel = arr[0];
        int oneDel = 0;
        int ans = arr[0];
        
        for (size_t i = 1; i < arr.size(); ++i) {
            int x = arr[i];
            oneDel = max(oneDel + x, noDel);
            noDel = max(x, noDel + x);
            ans = max({ans, noDel, oneDel});
        }
        return ans;
    }
};`,
    pythonSolution: `class Solution:
    def maximumSum(self, arr: list[int]) -> int:
        no_del = arr[0]
        one_del = 0
        ans = arr[0]
        
        for x in arr[1:]:
            one_del = max(one_del + x, no_del)
            no_del = max(x, no_del + x)
            ans = max(ans, no_del, one_del)
            
        return ans`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q131",
    questionNumber: 131,
    title: "Target Sum",
    statement:
      "You are given an integer array nums and an integer target.\n\nYou want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.\n\nFor example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression \"+2-1\" = 1.\n\nReturn the number of different expressions that you can build, which evaluates to target.",
    difficulty: "Hard",
    pattern: "Algebraic Subset Sum Reduction / 0/1 Knapsack Count DP",
    constraints: [
      "1 <= nums.length <= 20",
      "0 <= nums[i] <= 1000",
      "0 <= sum(nums[i]) <= 1000",
      "-1000 <= target <= 1000"
    ],
    expectedTimeComplexity: "O(N * SubsetTarget)",
    expectedSpaceComplexity: "O(SubsetTarget)",
    examples: [
      {
        input: "nums = [1,1,1,1,1], target = 3",
        output: "5",
        explanation: "-1+1+1+1+1 = 3, +1-1+1+1+1 = 3, +1+1-1+1+1 = 3, +1+1+1-1+1 = 3, +1+1+1+1-1 = 3 (5 ways)."
      },
      {
        input: "nums = [1], target = 1",
        output: "1"
      }
    ],
    explanation:
      "### Mathematical Reduction\nLet $P$ be the subset assigned '+' and $N$ be the subset assigned '-'.\n$Sum(P) - Sum(N) = target$\n$Sum(P) + Sum(N) = totalSum$\nAdding both equations:\n$2 * Sum(P) = target + totalSum \\implies Sum(P) = (target + totalSum) / 2$.\n\nThus, the problem reduces to finding the number of subsets with sum equal to $S = (target + totalSum) / 2$.\nValid bounds: $totalSum \\ge |target|$ and $(target + totalSum) \\pmod 2 == 0$.\n- Run 1D 0/1 knapsack counting: `dp[s] += dp[s - num]` in reverse direction.",
    interviewInsight:
      "Converting signed partition problems into positive subset sum expressions eliminates negative array index offsetting completely.",
    cppSolution: `class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int totalSum = 0;
        for (int x : nums) totalSum += x;
        
        if (abs(target) > totalSum || (target + totalSum) % 2 != 0) {
            return 0;
        }
        
        int subsetTarget = (target + totalSum) / 2;
        vector<int> dp(subsetTarget + 1, 0);
        dp[0] = 1;
        
        for (int num : nums) {
            for (int s = subsetTarget; s >= num; --s) {
                dp[s] += dp[s - num];
            }
        }
        return dp[subsetTarget];
    }
};`,
    pythonSolution: `class Solution:
    def findTargetSumWays(self, nums: list[int], target: int) -> int:
        total_sum = sum(nums)
        if abs(target) > total_sum or (target + total_sum) % 2 != 0:
            return 0
            
        subset_target = (target + total_sum) // 2
        dp = [0] * (subset_target + 1)
        dp[0] = 1
        
        for num in nums:
            for s in range(subset_target, num - 1, -1):
                dp[s] += dp[s - num]
                
        return dp[subset_target]`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q132",
    questionNumber: 132,
    title: "Maximal Square",
    statement:
      "Given an m x n binary matrix filled with 0's and 1's, find the largest square containing only 1's and return its area.",
    difficulty: "Hard",
    pattern: "2D Geometry DP / Rolling 1D Array Optimization",
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 300",
      "matrix[i][j] is '0' or '1'"
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "matrix = [[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]",
        output: "4",
        explanation: "The maximal square has side length 2 and area 4."
      },
      {
        input: "matrix = [[\"0\",\"1\"],[\"1\",\"0\"]]",
        output: "1"
      },
      {
        input: "matrix = [[\"0\"]]",
        output: "0"
      }
    ],
    explanation:
      "### State Definition & Geometric Invariant\nLet `dp[i][j]` be the side length of the largest square whose bottom-right corner is at `matrix[i-1][j-1]`.\n- If `matrix[i-1][j-1] == '1'`:\n  `dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]})`.\n  (A square of size $k$ requires valid squares of size $k-1$ at its top, left, and top-left diagonal).\n- Else: `dp[i][j] = 0`.\n- Maximum area is `maxSide * maxSide`.\nSpace is compressed to 1D using a diagonal cache.",
    interviewInsight:
      "The min-of-three transition guarantees that all four quadrants overlap consistently, proving the square is completely filled with '1's.",
    cppSolution: `class Solution {
public:
    int maximalSquare(vector<vector<char>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<int> dp(n + 1, 0);
        int maxSide = 0;
        int prevDiag = 0;
        
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                int temp = dp[j];
                if (matrix[i - 1][j - 1] == '1') {
                    dp[j] = 1 + min({dp[j], dp[j - 1], prevDiag});
                    maxSide = max(maxSide, dp[j]);
                } else {
                    dp[j] = 0;
                }
                prevDiag = temp;
            }
        }
        return maxSide * maxSide;
    }
};`,
    pythonSolution: `class Solution:
    def maximalSquare(self, matrix: list[list[str]]) -> int:
        m, n = len(matrix), len(matrix[0])
        dp = [0] * (n + 1)
        max_side = 0
        
        for i in range(1, m + 1):
            prev_diag = 0
            for j in range(1, n + 1):
                temp = dp[j]
                if matrix[i - 1][j - 1] == '1':
                    dp[j] = 1 + min(dp[j], dp[j - 1], prev_diag)
                    max_side = max(max_side, dp[j])
                else:
                    dp[j] = 0
                prev_diag = temp
                
        return max_side * max_side`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q133",
    questionNumber: 133,
    title: "Word Break II (Sentence Reconstruction)",
    statement:
      "Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.",
    difficulty: "Hard",
    pattern: "Memoized DFS / DP with Trie/Prefix Backtracking",
    constraints: [
      "1 <= s.length <= 20",
      "1 <= wordDict.length <= 1000",
      "1 <= wordDict[i].length <= 10",
      "s and wordDict[i] consist of only lowercase English letters.",
      "All strings of wordDict are unique."
    ],
    expectedTimeComplexity: "O(2^N * N) worst case, heavily pruned by memoization",
    expectedSpaceComplexity: "O(2^N * N) to store all valid reconstructed combinations",
    examples: [
      {
        input: "s = \"catsanddog\", wordDict = [\"cat\",\"cats\",\"and\",\"sand\",\"dog\"]",
        output: "[\"cats and dog\",\"cat sand dog\"]"
      },
      {
        input: "s = \"pineapplepenapple\", wordDict = [\"apple\",\"pen\",\"applepen\",\"pine\",\"pineapple\"]",
        output: "[\"pine apple pen apple\",\"pineapple pen apple\",\"pine applepen apple\"]"
      },
      {
        input: "s = \"catsandog\", wordDict = [\"cats\",\"dog\",\"sand\",\"and\",\"cat\"]",
        output: "[]"
      }
    ],
    explanation:
      "### Top-Down Memoized Search\nLet `memo[start]` map index `start` to all valid sentence suffix segmentations of `s[start...]`.\n- Base case: `start == s.length() -> {\"\"}` (one valid empty sentence).\n- For each prefix `s[start...end-1]` in `wordSet`:\n  Recursively fetch all sentences from `dfs(end)`.\n  Combine prefix with each returned suffix sentence (adding space if suffix non-empty).\n- Memoize result in hash table `memo[start]`.\n- Early pruning via dictionary word lookup prevents re-exploring duplicate suffixes.",
    interviewInsight:
      "While Word Break I is solvable in O(N^2) boolean DP, Word Break II requires memoized backtracking to accumulate all valid structural parse trees without redundant traversals.",
    cppSolution: `class Solution {
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        unordered_map<int, vector<string>> memo;
        
        function<vector<string>(int)> dfs = [&](int start) -> vector<string> {
            if (memo.count(start)) return memo[start];
            if (start == (int)s.size()) return {""};
            
            vector<string> res;
            for (int end = start + 1; end <= (int)s.size(); ++end) {
                string prefix = s.substr(start, end - start);
                if (dict.count(prefix)) {
                    vector<string> suffixes = dfs(end);
                    for (const string& suf : suffixes) {
                        res.push_back(prefix + (suf.empty() ? "" : " ") + suf);
                    }
                }
            }
            return memo[start] = res;
        };
        
        return dfs(0);
    }
};`,
    pythonSolution: `class Solution:
    def wordBreak(self, s: str, wordDict: list[str]) -> list[str]:
        word_set = set(wordDict)
        memo = {}
        
        def dfs(start: int) -> list[str]:
            if start in memo:
                return memo[start]
            if start == len(s):
                return [""]
                
            res = []
            for end in range(start + 1, len(s) + 1):
                prefix = s[start:end]
                if prefix in word_set:
                    suffixes = dfs(end)
                    for suf in suffixes:
                        res.append(prefix + (" " + suf if suf else ""))
                        
            memo[start] = res
            return res
            
        return dfs(0)`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q134",
    questionNumber: 134,
    title: "Palindrome Partitioning II (Minimum Cuts)",
    statement:
      "Given a string s, partition s such that every substring of the partition is a palindrome.\n\nReturn the minimum cuts needed for a palindrome partitioning of s.",
    difficulty: "Hard",
    pattern: "Dual DP: Palindrome Expand / 1D Minimum Cut Partition",
    constraints: [
      "1 <= s.length <= 2000",
      "s consists of lowercase English letters only."
    ],
    expectedTimeComplexity: "O(N^2)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "s = \"aab\"",
        output: "1",
        explanation: "The palindrome partitioning [\"aa\",\"b\"] could be produced using 1 cut."
      },
      {
        input: "s = \"a\"",
        output: "0"
      },
      {
        input: "s = \"ab\"",
        output: "1"
      }
    ],
    explanation:
      "### Two-Phase DP Architecture\n1. Let `minCuts[i]` be the minimum cuts required for prefix `s[0...i]`.\n2. Initialize `minCuts[i] = i` (worst-case: single character cuts).\n3. Expand palindromes centered at every index `mid`:\n   - Odd length: Expand `(l = mid, r = mid)` while `s[l] == s[r]`.\n   - Even length: Expand `(l = mid, r = mid + 1)` while `s[l] == s[r]`.\n4. When substring `s[l...r]` is a valid palindrome:\n   - If `l == 0`: `minCuts[r] = 0` (entire prefix is a palindrome, 0 cuts).\n   - Else: `minCuts[r] = min(minCuts[r], minCuts[l - 1] + 1)`.\nExpanding around centers merges palindrome verification and DP updates into a single pass in O(N^2) time and O(N) space.",
    interviewInsight:
      "Expanding around palindrome centers directly updates the DP array in-place, eliminating the O(N^2) 2D boolean palindrome matrix entirely.",
    cppSolution: `class Solution {
public:
    int minCut(string s) {
        int n = s.size();
        vector<int> minCuts(n);
        for (int i = 0; i < n; ++i) minCuts[i] = i;
        
        auto expand = [&](int l, int r) {
            while (l >= 0 && r < n && s[l] == s[r]) {
                if (l == 0) {
                    minCuts[r] = 0;
                } else {
                    minCuts[r] = min(minCuts[r], minCuts[l - 1] + 1);
                }
                --l;
                ++r;
            }
        };
        
        for (int i = 0; i < n; ++i) {
            expand(i, i);     // Odd length
            expand(i, i + 1); // Even length
        }
        return minCuts[n - 1];
    }
};`,
    pythonSolution: `class Solution:
    def minCut(self, s: str) -> int:
        n = len(s)
        min_cuts = list(range(n))
        
        def expand(l: int, r: int):
            while l >= 0 and r < n and s[l] == s[r]:
                if l == 0:
                    min_cuts[r] = 0
                else:
                    min_cuts[r] = min(min_cuts[r], min_cuts[l - 1] + 1)
                l -= 1
                r += 1
                
        for i in range(n):
            expand(i, i)
            expand(i, i + 1)
            
        return min_cuts[-1]`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q135",
    questionNumber: 135,
    title: "Distinct Subsequences",
    statement:
      "Given two strings s and t, return the number of distinct subsequences of s which equals t.\n\nThe test cases are generated so that the answer fits on a 64-bit signed integer.",
    difficulty: "Hard",
    pattern: "2D Matching String DP / 1D Reverse State Accumulation",
    constraints: [
      "1 <= s.length, t.length <= 1000",
      "s and t consist of English letters."
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "s = \"rabbbit\", t = \"rabbit\"",
        output: "3",
        explanation: "There are 3 ways you can generate \"rabbit\" from s by dropping one of the three 'b's."
      },
      {
        input: "s = \"babgbag\", t = \"bag\"",
        output: "5"
      }
    ],
    explanation:
      "### State Definition & Recurrence\nLet `dp[j]` be the number of distinct subsequences matching prefix `t[0...j-1]` using the processed characters of `s`.\n- Base case: `dp[0] = 1` (an empty string `t` is matched by exactly 1 empty subsequence).\n- For each character `c` in `s`:\n  Traverse `j` backwards from `N` down to 1:\n  If `c == t[j - 1]`:\n    `dp[j] = dp[j] + dp[j - 1]`\n    (Accumulate previous matches of `t[0...j-1]` without using `c`, plus new matches formed by appending `c` to `t[0...j-2]`).\n- Result: `dp[N]` (using unsigned long long in C++ to prevent intermediate 64-bit overflow).",
    interviewInsight:
      "Traversing `j` backwards in 1D array converts standard 2D string matching into an in-place space-efficient single row accumulator.",
    cppSolution: `class Solution {
public:
    int numDistinct(string s, string t) {
        int m = s.size(), n = t.size();
        vector<unsigned long long> dp(n + 1, 0);
        dp[0] = 1;
        
        for (char c : s) {
            for (int j = n; j >= 1; --j) {
                if (c == t[j - 1]) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return dp[n];
    }
};`,
    pythonSolution: `class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        m, n = len(s), len(t)
        dp = [0] * (n + 1)
        dp[0] = 1
        
        for c in s:
            for j in range(n, 0, -1):
                if c == t[j - 1]:
                    dp[j] += dp[j - 1]
                    
        return dp[n]`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q136",
    questionNumber: 136,
    title: "Minimum Cost to Cut a Stick",
    statement:
      "Given a wooden stick of length n, labeled from 0 to n. The stick also has some cuts given in an array cuts where cuts[i] is the position of the ith cut that you should make.\n\nYou should perform the cuts in any order you want. The cost of one cut is the length of the stick to be cut, the total cost is the sum of costs of all cuts. When you cut a stick, it will be split into two smaller sticks (i.e. the sum of their lengths is the length of the stick before the cut).\n\nReturn the minimum total cost of the cuts.",
    difficulty: "Hard",
    pattern: "Interval Dynamic Programming / Range Boundary Partition",
    constraints: [
      "2 <= n <= 10^6",
      "1 <= cuts.length <= 100",
      "1 <= cuts[i] <= n - 1",
      "All the integers in cuts are distinct."
    ],
    expectedTimeComplexity: "O(K^3) where K = cuts.length",
    expectedSpaceComplexity: "O(K^2)",
    examples: [
      {
        input: "n = 7, cuts = [1,3,4,5]",
        output: "16",
        explanation: "Cutting at 3 gives cost 7. Sticks: [0,3] and [3,7]. Cut [0,3] at 1 gives cost 3. Cut [3,7] at 4 and 5 gives cost 4 + 2 = 6. Total = 7 + 3 + 4 + 2 = 16."
      },
      {
        input: "n = 9, cuts = [5,6,1,4,2]",
        output: "22"
      }
    ],
    explanation:
      "### Interval DP Formulation\nAdd boundary points `0` and `n` to `cuts` and sort the array: `A = [0, cuts[0], cuts[1], ..., cuts[k-1], n]`.\nLet `dp[i][j]` be the minimum cost to make all cuts between indices `i` and `j` in array `A`.\n- Base case: If `j <= i + 1`, there are no cuts to make between `A[i]` and `A[j]` -> `dp[i][j] = 0`.\n- Transition: For all cut positions `k` between `i` and `j` (`i < k < j`):\n  `dp[i][j] = min_{i < k < j}(dp[i][k] + dp[k][j]) + (A[j] - A[i])`.\n- Iterate over interval lengths `len` from 2 to `A.size() - 1`.",
    interviewInsight:
      "Sorting cut positions transforms arbitrary stick lengths into discrete interval indices `[i, j]`, turning a continuous space problem into standard polynomial interval DP.",
    cppSolution: `class Solution {
public:
    int minCost(int n, vector<int>& cuts) {
        cuts.push_back(0);
        cuts.push_back(n);
        sort(cuts.begin(), cuts.end());
        int m = cuts.size();
        
        vector<vector<int>> dp(m, vector<int>(m, 0));
        
        for (int len = 2; len < m; ++len) {
            for (int i = 0; i + len < m; ++i) {
                int j = i + len;
                int minCostVal = 1e9;
                for (int k = i + 1; k < j; ++k) {
                    minCostVal = min(minCostVal, dp[i][k] + dp[k][j]);
                }
                dp[i][j] = minCostVal + (cuts[j] - cuts[i]);
            }
        }
        return dp[0][m - 1];
    }
};`,
    pythonSolution: `class Solution:
    def minCost(self, n: int, cuts: list[int]) -> int:
        A = sorted([0] + cuts + [n])
        m = len(A)
        dp = [[0] * m for _ in range(m)]
        
        for length in range(2, m):
            for i in range(m - length):
                j = i + length
                min_cost = float('inf')
                for k in range(i + 1, j):
                    min_cost = min(min_cost, dp[i][k] + dp[k][j])
                dp[i][j] = min_cost + (A[j] - A[i])
                
        return dp[0][m - 1]`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q137",
    questionNumber: 137,
    title: "Burst Balloons (Reverse Interval DP)",
    statement:
      "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it represented by an array nums. You are asked to burst all the balloons.\n\nIf you burst the ith balloon, you will get nums[i - 1] * nums[i] * nums[i + 1] coins. If i - 1 or i + 1 goes out of bounds of the array, then treat it as if there is a balloon with a 1 painted on it.\n\nReturn the maximum coins you can collect by bursting the balloons wisely.",
    difficulty: "Extreme",
    pattern: "Reverse Interval DP / Last-Burst Partitioning",
    constraints: [
      "n == nums.length",
      "1 <= n <= 300",
      "0 <= nums[i] <= 100"
    ],
    expectedTimeComplexity: "O(N^3)",
    expectedSpaceComplexity: "O(N^2)",
    examples: [
      {
        input: "nums = [3,1,5,8]",
        output: "167",
        explanation: "nums = [3,1,5,8] -> [3,5,8] -> [3,8] -> [8] -> []\ncoins = 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 15 + 120 + 24 + 8 = 167."
      },
      {
        input: "nums = [1,5]",
        output: "10"
      }
    ],
    explanation:
      "### Why Top-Down Bursting Fails & Reverse Thinking\nIf we think 'which balloon to burst first?', bursting balloon `k` concatenates the remaining elements `[... k-1]` and `[k+1 ...]`, creating inter-subproblem boundary dependencies that ruin dynamic programming.\n\n**The Crucial Inversion (Last Balloon to Burst)**:\nThink: 'Which balloon `k` in range `(i, j)` is burst **LAST**?'\nIf balloon `k` is burst last in open interval `(i, j)`, all other balloons in `(i, k)` and `(k, j)` are already burst. Therefore, balloon `k` will be flanked directly by boundary balloons `A[i]` and `A[j]`!\n- Let `A = [1, nums[0], ..., nums[n-1], 1]`.\n- `dp[i][j]` = max coins obtained by bursting all balloons strictly between index `i` and `j`.\n- `dp[i][j] = max_{i < k < j} (dp[i][k] + dp[k][j] + A[i] * A[k] * A[j])`.\n- Base cases: when `j <= i + 1`, `dp[i][j] = 0`.",
    interviewInsight:
      "Inverting the sequence of operations from 'first to happen' to 'last to remain' is one of the most powerful paradigms in advanced interval DP.",
    cppSolution: `class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> A(n + 2, 1);
        for (int i = 0; i < n; ++i) A[i + 1] = nums[i];
        
        int m = n + 2;
        vector<vector<int>> dp(m, vector<int>(m, 0));
        
        for (int len = 2; len < m; ++len) {
            for (int i = 0; i + len < m; ++i) {
                int j = i + len;
                for (int k = i + 1; k < j; ++k) {
                    int coins = dp[i][k] + dp[k][j] + A[i] * A[k] * A[j];
                    dp[i][j] = max(dp[i][j], coins);
                }
            }
        }
        return dp[0][m - 1];
    }
};`,
    pythonSolution: `class Solution:
    def maxCoins(self, nums: list[int]) -> int:
        A = [1] + nums + [1]
        m = len(A)
        dp = [[0] * m for _ in range(m)]
        
        for length in range(2, m):
            for i in range(m - length):
                j = i + length
                for k in range(i + 1, j):
                    coins = dp[i][k] + dp[k][j] + A[i] * A[k] * A[j]
                    if coins > dp[i][j]:
                        dp[i][j] = coins
                        
        return dp[0][m - 1]`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q138",
    questionNumber: 138,
    title: "Regular Expression Matching ('.' and '*')",
    statement:
      "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n- '.' Matches any single character.\n- '*' Matches zero or more of the preceding element.\n\nThe matching should cover the entire input string (not partial).",
    difficulty: "Extreme",
    pattern: "2D Nondeterministic Finite Automata DP / Dual String State Matrix",
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
      },
      {
        input: "s = \"aab\", p = \"c*a*b\"",
        output: "true",
        explanation: "c can be repeated 0 times, a can be repeated 2 times, then b."
      }
    ],
    explanation:
      "### State Transitions & '*' Handling\nLet `dp[i][j]` denote whether `s[0...i-1]` matches `p[0...j-1]`.\n- Base case: `dp[0][0] = true`.\n- Empty `s` against pattern `p`: If `p[j-1] == '*'`: `dp[0][j] = dp[0][j-2]` (matching 0 occurrences of preceding char).\n- For `i` from 1 to `M`, `j` from 1 to `N`:\n  1. If `p[j-1] != '*'`: Direct match if `p[j-1] == s[i-1] || p[j-1] == '.'`:\n     `dp[i][j] = dp[i-1][j-1]`.\n  2. If `p[j-1] == '*'`: Let preceding character be `prev = p[j-2]`.\n     - Case 0 matches: `dp[i][j] = dp[i][j-2]`\n     - Case 1+ matches: If `prev == s[i-1] || prev == '.'`:\n       `dp[i][j] = dp[i][j] || dp[i-1][j]` (consume one char from `s` while keeping pattern active).",
    interviewInsight:
      "The recurrence `dp[i-1][j]` under '*' captures unbounded non-deterministic character consumption without requiring an explicit loop over counts.",
    cppSolution: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        
        for (int j = 2; j <= n; j += 2) {
            if (p[j - 1] == '*') {
                dp[0][j] = dp[0][j - 2];
            }
        }
        
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (p[j - 1] != '*') {
                    if (p[j - 1] == s[i - 1] || p[j - 1] == '.') {
                        dp[i][j] = dp[i - 1][j - 1];
                    }
                } else {
                    // Match 0 occurrences
                    dp[i][j] = dp[i][j - 2];
                    // Match 1 or more occurrences
                    char prev = p[j - 2];
                    if (prev == s[i - 1] || prev == '.') {
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
                if p[j - 1] != '*':
                    if p[j - 1] == s[i - 1] or p[j - 1] == '.':
                        dp[i][j] = dp[i - 1][j - 1]
                else:
                    dp[i][j] = dp[i][j - 2]
                    prev = p[j - 2]
                    if prev == s[i - 1] or prev == '.':
                        dp[i][j] = dp[i][j] or dp[i - 1][j]
                        
        return dp[m][n]`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q139",
    questionNumber: 139,
    title: "Shortest Common Supersequence",
    statement:
      "Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. If there are multiple valid strings, return any of them.\n\nA string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.",
    difficulty: "Extreme",
    pattern: "LCS Matrix Construction & Optimal DP Traceback",
    constraints: [
      "1 <= str1.length, str2.length <= 1000",
      "str1 and str2 consist of lowercase English letters."
    ],
    expectedTimeComplexity: "O(M * N)",
    expectedSpaceComplexity: "O(M * N)",
    examples: [
      {
        input: "str1 = \"abac\", str2 = \"cab\"",
        output: "\"cabac\"",
        explanation: "str1 = \"abac\" is a subsequence of \"cabac\" because we can delete the first 'c'. str2 = \"cab\" is a subsequence of \"cabac\" because we can delete the last \"ac\"."
      },
      {
        input: "str1 = \"aaaaaaaa\", str2 = \"aaaaaaaa\"",
        output: "\"aaaaaaaa\""
      }
    ],
    explanation:
      "### Two-Phase Algorithm: Table Build + Pointer Traceback\n1. Construct the 2D LCS dynamic programming table `dp[i][j]` for `str1` and `str2` in $O(M \\times N)$.\n2. The Shortest Common Supersequence length is $M + N - LCS(str1, str2)$.\n3. **Backtracking Reconstruction**:\n   Start at `(i = M, j = N)`:\n   - If `str1[i-1] == str2[j-1]`: Character belongs to LCS -> append once to result, move `(i-1, j-1)`.\n   - Else if `dp[i-1][j] >= dp[i][j-1]`: Character `str1[i-1]` must be included -> append `str1[i-1]`, move `(i-1, j)`.\n   - Else: Character `str2[j-1]` must be included -> append `str2[j-1]`, move `(i, j-1)`.\n4. Flush remaining characters of `str1` or `str2` and reverse the reconstructed string.",
    interviewInsight:
      "Shortest Common Supersequence is the dual problem of LCS; understanding how to walk backwards through a DP table to reconstruct solutions is an essential Tier-1 interview skill.",
    cppSolution: `class Solution {
public:
    string shortestCommonSupersequence(string str1, string str2) {
        int m = str1.size(), n = str2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (str1[i - 1] == str2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        
        string res = "";
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (str1[i - 1] == str2[j - 1]) {
                res += str1[i - 1];
                --i; --j;
            } else if (dp[i - 1][j] >= dp[i][j - 1]) {
                res += str1[i - 1];
                --i;
            } else {
                res += str2[j - 1];
                --j;
            }
        }
        
        while (i > 0) { res += str1[i - 1]; --i; }
        while (j > 0) { res += str2[j - 1]; --j; }
        
        reverse(res.begin(), res.end());
        return res;
    }
};`,
    pythonSolution: `class Solution:
    def shortestCommonSupersequence(self, str1: str, str2: str) -> str:
        m, n = len(str1), len(str2)
        dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                if str1[i - 1] == str2[j - 1]:
                    dp[i][j] = 1 + dp[i - 1][j - 1]
                else:
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
                    
        res = []
        i, j = m, n
        while i > 0 and j > 0:
            if str1[i - 1] == str2[j - 1]:
                res.append(str1[i - 1])
                i -= 1
                j -= 1
            elif dp[i - 1][j] >= dp[i][j - 1]:
                res.append(str1[i - 1])
                i -= 1
            else:
                res.append(str2[j - 1])
                j -= 1
                
        while i > 0:
            res.append(str1[i - 1])
            i -= 1
        while j > 0:
            res.append(str2[j - 1])
            j -= 1
            
        return "".join(reversed(res))`,
    topic: "Dynamic Programming",
    batch: 7
  },
  {
    id: "Q140",
    questionNumber: 140,
    title: "Super Egg Drop (Minimax Inversion DP)",
    statement:
      "You are given k identical eggs and you have access to a building with n floors labeled from 1 to n.\n\nYou know that there exists a floor f where 0 <= f <= n such that any egg dropped at a floor higher than f will break, and any egg dropped at or below floor f will not break.\n\nEach move, you may take an unbroken egg and drop it from any floor x (where 1 <= x <= n). If the egg breaks, you can no longer use it. However, if the egg does not break, you may use it again in future moves.\n\nReturn the minimum number of moves that you need to determine with certainty what the value of f is.",
    difficulty: "Extreme",
    pattern: "State Inversion DP / Binomial Coefficient Exploration",
    constraints: [
      "1 <= k <= 100",
      "1 <= n <= 10^4"
    ],
    expectedTimeComplexity: "O(K * moves) where moves <= 14 for K=100, N=10000",
    expectedSpaceComplexity: "O(K)",
    examples: [
      {
        input: "k = 1, n = 2",
        output: "2",
        explanation: "Drop egg from floor 1. If breaks, f = 0. If not, drop from floor 2. If breaks, f = 1, else f = 2."
      },
      {
        input: "k = 2, n = 6",
        output: "3"
      },
      {
        input: "k = 3, n = 14",
        output: "4"
      }
    ],
    explanation:
      "### State Inversion (The Crucial Leap)\nDirect minimax DP asks: `dp(k, n) = 1 + min_x max(dp(k-1, x-1), dp(k, n-x))`, which is O(K * N^2) and TLEs.\n\n**Invert the Question**:\nInstead of asking 'given $K$ eggs and $N$ floors, how many moves $M$ are needed?', ask:\n**'Given $K$ eggs and $M$ moves, what is the MAXIMUM number of floors $N$ we can test?'**\n\nLet `dp[m][k]` be the max testable floors with $m$ moves and $k$ eggs.\nWhen we drop an egg from floor $X$:\n- If it breaks: we test `dp[m-1][k-1]` floors below.\n- If it survives: we test `dp[m-1][k]` floors above.\n- Plus the current floor $X$ itself.\n$\\implies dp[m][k] = dp[m-1][k-1] + dp[m-1][k] + 1$.\n\nIterate $m = 1, 2, 3, ...$ until $dp[m][k] \\ge n$. Returns in at most $\\log_2(n) \\le 14$ steps for $K \\ge \\log N$!",
    interviewInsight:
      "Inverting DP state from (Input Dimension -> Answer) to (Move Budget -> Solvable Problem Size) transforms impossible $O(K N^2)$ problems into lightning-fast $O(K \\log N)$ solutions.",
    cppSolution: `class Solution {
public:
    int superEggDrop(int k, int n) {
        vector<int> dp(k + 1, 0);
        int moves = 0;
        
        while (dp[k] < n) {
            ++moves;
            for (int eggs = k; eggs >= 1; --eggs) {
                dp[eggs] = dp[eggs - 1] + dp[eggs] + 1;
            }
        }
        return moves;
    }
};`,
    pythonSolution: `class Solution:
    def superEggDrop(self, k: int, n: int) -> int:
        dp = [0] * (k + 1)
        moves = 0
        
        while dp[k] < n:
            moves += 1
            for eggs in range(k, 0, -1):
                dp[eggs] = dp[eggs - 1] + dp[eggs] + 1
                
        return moves`,
    topic: "Dynamic Programming",
    batch: 7
  }
];
