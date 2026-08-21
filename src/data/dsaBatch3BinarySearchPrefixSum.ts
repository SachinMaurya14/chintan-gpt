import { DSAInterviewProblem } from "./dsaQuestionTypes.js";

export const DSA_BATCH_3_BINARY_SEARCH_PREFIX_SUM: DSAInterviewProblem[] = [
  {
    id: "Q41",
    questionNumber: 41,
    title: "Search in Rotated Sorted Array",
    statement:
      "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]. Given the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums. You must write an algorithm with O(log n) runtime complexity.",
    difficulty: "Medium",
    pattern: "Rotated Array Binary Search",
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated.",
      "-10^4 <= target <= 10^4"
    ],
    expectedTimeComplexity: "O(log N)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [4,5,6,7,0,1,2], target = 0",
        output: "4",
        explanation: "0 is located at index 4 in the rotated array."
      },
      {
        input: "nums = [4,5,6,7,0,1,2], target = 3",
        output: "-1",
        explanation: "3 does not exist in nums."
      }
    ],
    explanation:
      "At any midpoint `mid` in a rotated sorted array, at least one half (left `[low..mid]` or right `[mid..high]`) is strictly sorted. We identify which half is sorted by checking `nums[low] <= nums[mid]`. If the left half is sorted, we check if the target falls within `[nums[low], nums[mid])`. If it does, we search left (`high = mid - 1`); otherwise, we search right (`low = mid + 1`). If the right half is sorted, we symmetrically check if target falls in `(nums[mid], nums[high]]`.",
    interviewInsight:
      "Always check which half is sorted first before checking whether target lies inside that sorted segment. Since elements are distinct, `nums[low] <= nums[mid]` guarantees the left half is monotonically increasing.",
    cppSolution: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int low = 0, high = (int)nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return mid;
            
            // Check if left half is sorted
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } 
            // Otherwise right half must be sorted
            else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }
};`,
    pythonSolution: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid
            
            # Left half is sorted
            if nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            # Right half is sorted
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1
        return -1`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q42",
    questionNumber: 42,
    title: "Find Minimum in Rotated Sorted Array",
    statement:
      "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Notice that rotating an array [a[0], a[1], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], ..., a[n-2]]. Given the sorted rotated array nums of unique elements, return the minimum element of this array. You must write an algorithm that runs in O(log n) time.",
    difficulty: "Medium",
    pattern: "Pivot Binary Search",
    constraints: [
      "n == nums.length",
      "1 <= n <= 5000",
      "-5000 <= nums[i] <= 5000",
      "All the integers of nums are unique."
    ],
    expectedTimeComplexity: "O(log N)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [3,4,5,1,2]",
        output: "1",
        explanation: "The original array was [1,2,3,4,5] rotated 3 times."
      },
      {
        input: "nums = [4,5,6,7,0,1,2]",
        output: "0",
        explanation: "The minimum value in the array is 0."
      }
    ],
    explanation:
      "We compare `nums[mid]` against `nums[high]`. If `nums[mid] > nums[high]`, the inflection point (minimum element) must lie strictly to the right of `mid`, so we set `low = mid + 1`. If `nums[mid] <= nums[high]`, `mid` itself could be the minimum or the minimum lies to the left of `mid`, so we set `high = mid`. The loop terminates when `low == high`, converging directly on the minimum.",
    interviewInsight:
      "Comparing with `nums[high]` directly reveals whether the right partition contains the wrap-around drop. Comparing with `nums[low]` fails when the array is already fully sorted.",
    cppSolution: `class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0, high = (int)nums.size() - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] > nums[high]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return nums[low];
    }
};`,
    pythonSolution: `class Solution:
    def findMin(self, nums: list[int]) -> int:
        low, high = 0, len(nums) - 1
        while low < high:
            mid = (low + high) // 2
            if nums[mid] > nums[high]:
                low = mid + 1
            else:
                high = mid
        return nums[low]`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q43",
    questionNumber: 43,
    title: "Search in Rotated Sorted Array II (With Duplicates)",
    statement:
      "There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values). Given the array nums after rotation and an integer target, return true if target is in nums, or false if it is not in nums. You must decrease the overall operation steps as much as possible.",
    difficulty: "Medium",
    pattern: "Rotated Binary Search with Duplicates",
    constraints: [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "nums is guaranteed to be rotated at some pivot.",
      "-10^4 <= target <= 10^4"
    ],
    expectedTimeComplexity: "O(log N) average, O(N) worst case",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [2,5,6,0,0,1,2], target = 0",
        output: "true",
        explanation: "0 exists in nums."
      },
      {
        input: "nums = [2,5,6,0,0,1,2], target = 3",
        output: "false",
        explanation: "3 does not exist in nums."
      }
    ],
    explanation:
      "When duplicates are present, `nums[low] == nums[mid] == nums[high]` can occur (e.g., `[1,0,1,1,1]`), making it impossible to determine which half is sorted. In this ambiguous case, we safely shrink the search space by executing `low++` and `high--`. In all other cases, standard rotated binary search applies.",
    interviewInsight:
      "Interviewers use this problem to test your awareness of worst-case complexity degradation when duplicate values destroy the monotonic boundary information.",
    cppSolution: `class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int low = 0, high = (int)nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return true;

            // Handle ambiguous duplicate boundaries
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++;
                high--;
            } else if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target < nums[mid]) {
                    high = mid - 1;
                } else {
                    low = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[high]) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
        }
        return false;
    }
};`,
    pythonSolution: `class Solution:
    def search(self, nums: list[int], target: int) -> bool:
        low, high = 0, len(nums) - 1
        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return True
            
            # Ambiguity due to duplicates
            if nums[low] == nums[mid] == nums[high]:
                low += 1
                high -= 1
            elif nums[low] <= nums[mid]:
                if nums[low] <= target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            else:
                if nums[mid] < target <= nums[high]:
                    low = mid + 1
                else:
                    high = mid - 1
        return False`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q44",
    questionNumber: 44,
    title: "Find First and Last Position of Element in Sorted Array",
    statement:
      "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found in the array, return [-1, -1]. You must write an algorithm with O(log n) runtime complexity.",
    difficulty: "Medium",
    pattern: "Lower & Upper Bound Binary Search",
    constraints: [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "nums is a non-decreasing array.",
      "-10^9 <= target <= 10^9"
    ],
    expectedTimeComplexity: "O(log N)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [5,7,7,8,8,10], target = 8",
        output: "[3,4]",
        explanation: "8 starts at index 3 and ends at index 4."
      },
      {
        input: "nums = [5,7,7,8,8,10], target = 6",
        output: "[-1,-1]",
        explanation: "6 is not in the array."
      }
    ],
    explanation:
      "We implement two helper binary search routines: one to find the first occurrence (lower bound where `nums[mid] == target` continues searching left `high = mid - 1`) and one to find the last occurrence (upper bound where `nums[mid] == target` continues searching right `low = mid + 1`).",
    interviewInsight:
      "Avoid linear scanning once a match is found. In degenerate cases where all elements equal target (e.g. 10^5 elements), a linear scan degrades from O(log N) to O(N).",
    cppSolution: `class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        auto findBound = [&](bool isFirst) {
            int low = 0, high = (int)nums.size() - 1, res = -1;
            while (low <= high) {
                int mid = low + (high - low) / 2;
                if (nums[mid] == target) {
                    res = mid;
                    if (isFirst) high = mid - 1;
                    else low = mid + 1;
                } else if (nums[mid] < target) {
                    low = mid + 1;
                } else {
                    high = mid - 1;
                }
            }
            return res;
        };
        return {findBound(true), findBound(false)};
    }
};`,
    pythonSolution: `class Solution:
    def searchRange(self, nums: list[int], target: int) -> list[int]:
        def find_bound(is_first: bool) -> int:
            low, high, res = 0, len(nums) - 1, -1
            while low <= high:
                mid = (low + high) // 2
                if nums[mid] == target:
                    res = mid
                    if is_first:
                        high = mid - 1
                    else:
                        low = mid + 1
                elif nums[mid] < target:
                    low = mid + 1
                else:
                    high = mid - 1
            return res
            
        return [find_bound(True), find_bound(False)]`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q45",
    questionNumber: 45,
    title: "Search a 2D Matrix",
    statement:
      "You are given an m x n integer matrix with the following two properties: (1) Each row is sorted in non-decreasing order. (2) The first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in matrix or false otherwise. You must write a solution in O(log(m * n)) time complexity.",
    difficulty: "Medium",
    pattern: "2D Coordinate Mapping Binary Search",
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 100",
      "-10^4 <= matrix[i][j], target <= 10^4"
    ],
    expectedTimeComplexity: "O(log(M * N))",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3",
        output: "true",
        explanation: "3 is found at position [0,1]."
      },
      {
        input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13",
        output: "false",
        explanation: "13 is not present in the matrix."
      }
    ],
    explanation:
      "Treat the entire m x n matrix as a single 1D virtual sorted array of length `m * n` from index 0 to `m * n - 1`. For any 1D index `mid`, the 2D coordinates are `row = mid / n` and `col = mid % n`. We execute standard binary search in `O(log(m * n))`.",
    interviewInsight:
      "Coordinate transformation formula: `1D -> 2D: (index / cols, index % cols)`. `2D -> 1D: row * cols + col`.",
    cppSolution: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int m = matrix.size(), n = matrix[0].size();
        int low = 0, high = m * n - 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int val = matrix[mid / n][mid % n];
            if (val == target) return true;
            if (val < target) low = mid + 1;
            else high = mid - 1;
        }
        return false;
    }
};`,
    pythonSolution: `class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False
        m, n = len(matrix), len(matrix[0])
        low, high = 0, m * n - 1
        
        while low <= high:
            mid = (low + high) // 2
            val = matrix[mid // n][mid % n]
            if val == target:
                return True
            elif val < target:
                low = mid + 1
            else:
                high = mid - 1
        return False`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q46",
    questionNumber: 46,
    title: "Search a 2D Matrix II",
    statement:
      "Write an efficient algorithm that searches for a value target in an m x n integer matrix. This matrix has the following properties: (1) Integers in each row are sorted in ascending from left to right. (2) Integers in each column are sorted in ascending from top to bottom.",
    difficulty: "Medium",
    pattern: "Top-Right Pointer Elimination / Step-Wise Search",
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= n, m <= 300",
      "-10^9 <= matrix[i][j] <= 10^9",
      "-10^9 <= target <= 10^9"
    ],
    expectedTimeComplexity: "O(M + N)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5",
        output: "true",
        explanation: "5 is present at [1,1]."
      },
      {
        input: "matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20",
        output: "false",
        explanation: "20 is not present in the matrix."
      }
    ],
    explanation:
      "Start at the top-right corner `(0, n - 1)`. At this position, all elements to the left are smaller and all elements below are larger. If `matrix[r][c] == target`, return true. If `matrix[r][c] > target`, the target cannot be in this column, so decrement `c`. If `matrix[r][c] < target`, the target cannot be in this row, so increment `r`.",
    interviewInsight:
      "Starting at top-right (or bottom-left) creates a binary decision tree at each step because one direction increases values while the orthogonal direction decreases them.",
    cppSolution: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        if (matrix.empty() || matrix[0].empty()) return false;
        int r = 0, c = (int)matrix[0].size() - 1;
        while (r < (int)matrix.size() && c >= 0) {
            if (matrix[r][c] == target) return true;
            if (matrix[r][c] > target) c--;
            else r++;
        }
        return false;
    }
};`,
    pythonSolution: `class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False
        r, c = 0, len(matrix[0]) - 1
        while r < len(matrix) and c >= 0:
            if matrix[r][c] == target:
                return True
            elif matrix[r][c] > target:
                c -= 1
            else:
                r += 1
        return False`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q47",
    questionNumber: 47,
    title: "Find Peak Element",
    statement:
      "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks. You may imagine that nums[-1] = nums[n] = -infinity. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array. You must write an algorithm that runs in O(log n) time.",
    difficulty: "Medium",
    pattern: "Slope / Gradient Binary Search",
    constraints: [
      "1 <= nums.length <= 1000",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "nums[i] != nums[i + 1] for all valid i."
    ],
    expectedTimeComplexity: "O(log N)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "2",
        explanation: "3 is a peak element and your function should return index number 2."
      },
      {
        input: "nums = [1,2,1,3,5,6,4]",
        output: "5",
        explanation: "Your function can return index 1 where element is 2, or index 5 where element is 6."
      }
    ],
    explanation:
      "Compare `nums[mid]` with `nums[mid + 1]`. If `nums[mid] < nums[mid + 1]`, we are on an ascending slope, meaning a peak is guaranteed to exist to the right, so we set `low = mid + 1`. If `nums[mid] > nums[mid + 1]`, we are on a descending slope, so `mid` could be the peak or a peak exists to the left, so we set `high = mid`.",
    interviewInsight:
      "Binary search does not strictly require a globally sorted array—it only requires a decision property that eliminates one half of the search space with guaranteed preservation of the target.",
    cppSolution: `class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int low = 0, high = (int)nums.size() - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] < nums[mid + 1]) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        return low;
    }
};`,
    pythonSolution: `class Solution:
    def findPeakElement(self, nums: list[int]) -> int:
        low, high = 0, len(nums) - 1
        while low < high:
            mid = (low + high) // 2
            if nums[mid] < nums[mid + 1]:
                low = mid + 1
            else:
                high = mid
        return low`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q48",
    questionNumber: 48,
    title: "Koko Eating Bananas",
    statement:
      "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours. Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour. Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return. Return the minimum integer k such that she can eat all the bananas within h hours.",
    difficulty: "Medium",
    pattern: "Binary Search on Monotonic Answer Range",
    constraints: [
      "1 <= piles.length <= 10^4",
      "piles.length <= h <= 10^9",
      "1 <= piles[i] <= 10^9"
    ],
    expectedTimeComplexity: "O(N * log(max(piles)))",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "piles = [3,6,7,11], h = 8",
        output: "4",
        explanation: "At speed 4, Koko takes ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 hours."
      },
      {
        input: "piles = [30,11,23,4,20], h = 5",
        output: "30",
        explanation: "To finish 5 piles in 5 hours, she must eat at least max(piles) = 30 bananas/hr."
      }
    ],
    explanation:
      "The minimum speed `k` is 1 and the maximum is `max(piles)`. The time taken to eat all bananas at speed `k` is a monotonically decreasing function: as speed increases, total time decreases. We binary search for the smallest `k` such that `sum(ceil(pile / k)) <= h`.",
    interviewInsight:
      "Use integer ceiling arithmetic `(pile + k - 1) / k` or `(pile - 1) / k + 1` to avoid floating-point inaccuracies.",
    cppSolution: `class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        long long low = 1, high = *max_element(piles.begin(), piles.end());
        int ans = high;
        
        while (low <= high) {
            long long mid = low + (high - low) / 2;
            long long hours = 0;
            for (int p : piles) {
                hours += (p + mid - 1) / mid;
            }
            if (hours <= h) {
                ans = mid;
                high = mid - 1; // Try slower speed
            } else {
                low = mid + 1; // Need faster speed
            }
        }
        return ans;
    }
};`,
    pythonSolution: `class Solution:
    def minEatingSpeed(self, piles: list[int], h: int) -> int:
        low, high = 1, max(piles)
        ans = high
        
        while low <= high:
            mid = (low + high) // 2
            hours = sum((p + mid - 1) // mid for p in piles)
            if hours <= h:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q49",
    questionNumber: 49,
    title: "Capacity To Ship Packages Within D Days",
    statement:
      "A conveyor belt has packages that must be shipped from one port to another within days days. The ith package on the conveyor belt has a weight of weights[i]. Each day, we load the ship with packages on the conveyor belt (in the order given by weights). We may not load more weight than the maximum weight capacity of the ship. Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within days days.",
    difficulty: "Medium",
    pattern: "Binary Search on Answer / Greedy Feasibility",
    constraints: [
      "1 <= days <= weights.length <= 5 * 10^4",
      "1 <= weights[i] <= 500"
    ],
    expectedTimeComplexity: "O(N * log(sum(weights)))",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "weights = [1,2,3,4,5,6,7,8,9,10], days = 5",
        output: "15",
        explanation: "Capacity 15 allows shipping: Day 1: 1..5 (15), Day 2: 6,7 (13), Day 3: 8 (8), Day 4: 9 (9), Day 5: 10 (10)."
      },
      {
        input: "weights = [3,2,2,4,1,4], days = 3",
        output: "6",
        explanation: "Capacity 6 allows: Day 1: 3,2; Day 2: 2,4; Day 3: 1,4."
      }
    ],
    explanation:
      "The lower bound of capacity is `max(weights)` (since every individual package must fit) and the upper bound is `sum(weights)` (all packages in 1 day). We binary search the capacity range. For a candidate capacity, we greedily count how many consecutive days are needed to pack the conveyor items.",
    interviewInsight:
      "Whenever problem asks for 'minimum X to satisfy condition within K steps' and larger values always satisfy the condition, binary search on answer is the primary pattern.",
    cppSolution: `class Solution {
public:
    int shipWithinDays(vector<int>& weights, int days) {
        int low = 0, high = 0;
        for (int w : weights) {
            low = max(low, w);
            high += w;
        }
        
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int requiredDays = 1, currentWeight = 0;
            for (int w : weights) {
                if (currentWeight + w > mid) {
                    requiredDays++;
                    currentWeight = 0;
                }
                currentWeight += w;
            }
            
            if (requiredDays <= days) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
};`,
    pythonSolution: `class Solution:
    def shipWithinDays(self, weights: list[int], days: int) -> int:
        low = max(weights)
        high = sum(weights)
        ans = high
        
        while low <= high:
            mid = (low + high) // 2
            required_days = 1
            current_weight = 0
            for w in weights:
                if current_weight + w > mid:
                    required_days += 1
                    current_weight = 0
                current_weight += w
            
            if required_days <= days:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q50",
    questionNumber: 50,
    title: "Split Array Largest Sum (Painter's Partition Problem)",
    statement:
      "Given an integer array nums and an integer k, split nums into k non-empty subarrays such that the largest sum of any subarray is minimized. Return the minimized largest sum of the split. A subarray is a contiguous part of the array.",
    difficulty: "Hard",
    pattern: "Binary Search on Answer / Dynamic Range Minimax",
    constraints: [
      "1 <= nums.length <= 1000",
      "0 <= nums[i] <= 10^6",
      "1 <= k <= min(50, nums.length)"
    ],
    expectedTimeComplexity: "O(N * log(sum(nums)))",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [7,2,5,10,8], k = 2",
        output: "18",
        explanation: "There are four ways to split nums into two subarrays: [7,2,5] and [10,8] with largest sum 18."
      },
      {
        input: "nums = [1,2,3,4,5], k = 2",
        output: "9",
        explanation: "The best split is [1,2,3] and [4,5] giving largest sum 9."
      }
    ],
    explanation:
      "The answer is bounded in `[max(nums), sum(nums)]`. For a test max sum `mid`, we greedily form subarrays. If adding `nums[i]` exceeds `mid`, we end the current subarray and start a new one. If the total number of subarrays needed is `<= k`, `mid` is feasible, so we record it and search smaller (`high = mid - 1`).",
    interviewInsight:
      "This exact algorithmic paradigm is identical to 'Book Allocation Problem', 'Painter Partition Problem', and 'Capacity To Ship Packages'. Recognising this isomorphism saves massive interview time.",
    cppSolution: `class Solution {
public:
    int splitArray(vector<int>& nums, int k) {
        long long low = 0, high = 0;
        for (int x : nums) {
            low = max(low, (long long)x);
            high += x;
        }
        
        long long ans = high;
        while (low <= high) {
            long long mid = low + (high - low) / 2;
            int count = 1;
            long long currentSum = 0;
            for (int x : nums) {
                if (currentSum + x > mid) {
                    count++;
                    currentSum = 0;
                }
                currentSum += x;
            }
            
            if (count <= k) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return (int)ans;
    }
};`,
    pythonSolution: `class Solution:
    def splitArray(self, nums: list[int], k: int) -> int:
        low, high = max(nums), sum(nums)
        ans = high
        
        while low <= high:
            mid = (low + high) // 2
            count = 1
            curr_sum = 0
            for x in nums:
                if curr_sum + x > mid:
                    count += 1
                    curr_sum = 0
                curr_sum += x
            
            if count <= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q51",
    questionNumber: 51,
    title: "Aggressive Cows / Magnetic Force Between Two Balls",
    statement:
      "In the universe, you have n empty baskets placed at positions position[0], position[1], ..., position[n-1] on a 1D line. You want to distribute m balls into these baskets such that the minimum magnetic force between any two balls is maximized. The magnetic force between two balls at position x and y is |x - y|. Given the integer array position and the integer m, return the required maximum minimum magnetic force.",
    difficulty: "Medium",
    pattern: "Maximizing Minimum Distance Binary Search",
    constraints: [
      "n == position.length",
      "2 <= n <= 10^5",
      "1 <= position[i] <= 10^9",
      "All integers in position are distinct.",
      "2 <= m <= position.length"
    ],
    expectedTimeComplexity: "O(N log N + N log(max_pos))",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "position = [1,2,3,4,7], m = 3",
        output: "3",
        explanation: "Placing balls at positions 1, 4, 7 yields minimum distance 3."
      },
      {
        input: "position = [5,4,3,2,1,1000000000], m = 2",
        output: "999999999",
        explanation: "Placing at 1 and 1000000000 gives 999999999."
      }
    ],
    explanation:
      "Sort the basket coordinates. The minimum feasible distance between adjacent balls is `1` and the maximum is `position.back() - position.front()`. We binary search on this distance `mid`. In our greedy check, place the first ball at `position[0]`, then place each subsequent ball at the earliest basket whose position is at least `last_pos + mid`. If at least `m` balls can be placed, search for a larger distance (`low = mid + 1`).",
    interviewInsight:
      "Sorting the positions first allows a clean single-pass greedy validation in O(N).",
    cppSolution: `class Solution {
public:
    int maxDistance(vector<int>& position, int m) {
        sort(position.begin(), position.end());
        int low = 1, high = position.back() - position.front();
        int ans = 1;
        
        while (low <= high) {
            int mid = low + (high - low) / 2;
            int count = 1, last = position[0];
            for (size_t i = 1; i < position.size(); i++) {
                if (position[i] - last >= mid) {
                    count++;
                    last = position[i];
                }
            }
            
            if (count >= m) {
                ans = mid;
                low = mid + 1; // Try to maximize distance
            } else {
                high = mid - 1;
            }
        }
        return ans;
    }
};`,
    pythonSolution: `class Solution:
    def maxDistance(self, position: list[int], m: int) -> int:
        position.sort()
        low, high = 1, position[-1] - position[0]
        ans = 1
        
        while low <= high:
            mid = (low + high) // 2
            count = 1
            last = position[0]
            for i in range(1, len(position)):
                if position[i] - last >= mid:
                    count += 1
                    last = position[i]
            
            if count >= m:
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q52",
    questionNumber: 52,
    title: "Minimum Speed to Arrive on Time",
    statement:
      "You are reaching an office that requires taking n trains in sequential order. You are given an integer array dist of length n, where dist[i] represents the distance of the ith train ride. You are also given an integer hour representing the total amount of time you have. Each train can only depart at an integer hour (so you must wait for the next integer hour), except the last train. Return the minimum positive integer speed (in km/h) that all the trains must achieve, or -1 if impossible.",
    difficulty: "Medium",
    pattern: "Ceiling Train Departure Binary Search",
    constraints: [
      "n == dist.length",
      "1 <= n <= 10^5",
      "1 <= dist[i] <= 10^5",
      "1 <= hour <= 10^9",
      "hour has at most two digits after the decimal point."
    ],
    expectedTimeComplexity: "O(N log(10^7))",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "dist = [1,3,2], hour = 6",
        output: "1",
        explanation: "At speed 1: 1hr + wait(0) + 3hr + wait(0) + 2hr = 6hr."
      },
      {
        input: "dist = [1,3,2], hour = 2.7",
        output: "3",
        explanation: "At speed 3: 1/3 -> 1hr + 3/3 -> 1hr + 2/3 (0.67hr) = 2.67hr <= 2.7hr."
      }
    ],
    explanation:
      "For all rides except the last one, the time spent is `ceil(dist[i] / speed)`. For the final ride `n - 1`, the time is the exact fraction `dist[n - 1] / speed`. If `hour <= n - 1`, it is impossible to complete the journey because the first `n - 1` trains take at least `n - 1` hours. Otherwise, binary search speed in range `[1, 10^7]`.",
    interviewInsight:
      "Watch out for precision: intermediate trains require integer ceiling `(dist[i] + speed - 1) / speed`, while the last train requires floating division.",
    cppSolution: `class Solution {
public:
    int minSpeedOnTime(vector<int>& dist, double hour) {
        int n = dist.size();
        if (hour <= n - 1) return -1;
        
        int low = 1, high = 1e7, ans = -1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            double time = 0.0;
            for (int i = 0; i < n - 1; i++) {
                time += (dist[i] + mid - 1) / mid;
            }
            time += (double)dist[n - 1] / mid;
            
            if (time <= hour) {
                ans = mid;
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return ans;
    }
};`,
    pythonSolution: `import math

class Solution:
    def minSpeedOnTime(self, dist: list[int], hour: float) -> int:
        n = len(dist)
        if hour <= n - 1:
            return -1
        
        low, high = 1, 10**7
        ans = -1
        while low <= high:
            mid = (low + high) // 2
            time = sum(math.ceil(d / mid) for d in dist[:-1]) + dist[-1] / mid
            if time <= hour:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q53",
    questionNumber: 53,
    title: "Find the Duplicate Number (Pigeonhole Binary Search)",
    statement:
      "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive. There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array nums and uses only constant extra space.",
    difficulty: "Medium",
    pattern: "Pigeonhole Principle Binary Search on Range [1, n]",
    constraints: [
      "1 <= n <= 10^5",
      "nums.length == n + 1",
      "1 <= nums[i] <= n",
      "All the integers in nums appear only once except for precisely one integer which appears two or more times."
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [1,3,4,2,2]",
        output: "2",
        explanation: "2 is the duplicated element."
      },
      {
        input: "nums = [3,1,3,4,2]",
        output: "3",
        explanation: "3 is the duplicated element."
      }
    ],
    explanation:
      "Instead of searching on array indices, binary search on the numerical value range `[1, n]`. For a candidate midpoint `mid`, count how many elements in `nums` are `<= mid`. By Pigeonhole Principle, if `count > mid`, the duplicate must lie in `[1, mid]`, so we set `high = mid`. Otherwise, the duplicate lies in `[mid + 1, n]`, so we set `low = mid + 1`.",
    interviewInsight:
      "While Floyd's Cycle Detection is O(N) time and O(1) space, this Range Binary Search technique is critical when array elements cannot be treated as graph pointer indices.",
    cppSolution: `class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int low = 1, high = (int)nums.size() - 1;
        while (low < high) {
            int mid = low + (high - low) / 2;
            int count = 0;
            for (int x : nums) {
                if (x <= mid) count++;
            }
            if (count > mid) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return low;
    }
};`,
    pythonSolution: `class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        low, high = 1, len(nums) - 1
        while low < high:
            mid = (low + high) // 2
            count = sum(1 for x in nums if x <= mid)
            if count > mid:
                high = mid
            else:
                low = mid + 1
        return low`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q54",
    questionNumber: 54,
    title: "Subarray Sum Equals K",
    statement:
      "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k. A subarray is a contiguous non-empty sequence of elements within an array.",
    difficulty: "Medium",
    pattern: "Prefix Sum + Hash Map Frequency",
    constraints: [
      "1 <= nums.length <= 2 * 10^4",
      "-1000 <= nums[i] <= 1000",
      "-10^7 <= k <= 10^7"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "nums = [1,1,1], k = 2",
        output: "2",
        explanation: "[1,1] at indices [0,1] and [1,2] both sum to 2."
      },
      {
        input: "nums = [1,2,3], k = 3",
        output: "2",
        explanation: "[1,2] and [3] both sum to 3."
      }
    ],
    explanation:
      "Let `prefixSum[i]` be the sum of elements from 0 to i. The sum of subarray `(j..i]` is `prefixSum[i] - prefixSum[j]`. We want `prefixSum[i] - prefixSum[j] == k`, which rearranges to `prefixSum[j] == prefixSum[i] - k`. We maintain a hash map storing the frequency of observed prefix sums, initialized with `{0: 1}`.",
    interviewInsight:
      "Sliding window FAILS when numbers can be negative because window expansion does not monotonically increase the sum. Prefix Sum + Hash Map is the universal O(N) solution.",
    cppSolution: `class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixFreq;
        prefixFreq[0] = 1;
        int currentSum = 0, totalCount = 0;
        
        for (int x : nums) {
            currentSum += x;
            if (prefixFreq.count(currentSum - k)) {
                totalCount += prefixFreq[currentSum - k];
            }
            prefixFreq[currentSum]++;
        }
        return totalCount;
    }
};`,
    pythonSolution: `class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        prefix_freq = {0: 1}
        current_sum = 0
        total_count = 0
        
        for x in nums:
            current_sum += x
            if (current_sum - k) in prefix_freq:
                total_count += prefix_freq[current_sum - k]
            prefix_freq[current_sum] = prefix_freq.get(current_sum, 0) + 1
            
        return total_count`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q55",
    questionNumber: 55,
    title: "Continuous Subarray Sum (Modulo Prefix Sum)",
    statement:
      "Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise. A good subarray is a subarray where: (1) its length is at least two, and (2) the sum of the elements of the subarray is a multiple of k (i.e. sum == n * k for some integer n).",
    difficulty: "Medium",
    pattern: "Prefix Sum Modulo + Hash Map Index Tracking",
    constraints: [
      "1 <= nums.length <= 10^5",
      "0 <= nums[i] <= 10^9",
      "0 <= sum(nums[i]) <= 2^31 - 1",
      "1 <= k <= 2^31 - 1"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(min(N, K))",
    examples: [
      {
        input: "nums = [23,2,4,6,7], k = 6",
        output: "true",
        explanation: "[2,4] is a continuous subarray of size 2 whose sum is 6."
      },
      {
        input: "nums = [23,2,6,4,7], k = 6",
        output: "true",
        explanation: "[23, 2, 6, 4, 7] sums to 42, which is a multiple of 6."
      }
    ],
    explanation:
      "By remainder theorem: `(prefixSum[i] - prefixSum[j]) % k == 0` iff `prefixSum[i] % k == prefixSum[j] % k`. We store the earliest index `j` where each remainder `rem = prefixSum[i] % k` was first seen in a hash map initialized with `{0: -1}`. If the same remainder is seen again at index `i` with `i - j >= 2`, return true.",
    interviewInsight:
      "Initializing `{0: -1}` cleanly accounts for subarrays starting at index 0 without needing special conditional checks.",
    cppSolution: `class Solution {
public:
    bool checkSubarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> remainderIndex;
        remainderIndex[0] = -1;
        int runningSum = 0;
        
        for (int i = 0; i < (int)nums.size(); i++) {
            runningSum += nums[i];
            int rem = runningSum % k;
            if (remainderIndex.count(rem)) {
                if (i - remainderIndex[rem] >= 2) return true;
            } else {
                remainderIndex[rem] = i;
            }
        }
        return false;
    }
};`,
    pythonSolution: `class Solution:
    def checkSubarraySum(self, nums: list[int], k: int) -> bool:
        remainder_index = {0: -1}
        running_sum = 0
        
        for i, x in enumerate(nums):
            running_sum += x
            rem = running_sum % k
            if rem in remainder_index:
                if i - remainder_index[rem] >= 2:
                    return True
            else:
                remainder_index[rem] = i
        return False`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q56",
    questionNumber: 56,
    title: "Subarray Sums Divisible by K",
    statement:
      "Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k. A subarray is a contiguous part of an array.",
    difficulty: "Medium",
    pattern: "Modulo Normalization with Prefix Sums",
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "2 <= k <= 10^4"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(K)",
    examples: [
      {
        input: "nums = [4,5,0,-2,-3,1], k = 5",
        output: "7",
        explanation: "There are 7 subarrays with sum divisible by 5: [4,5,0,-2,-3,1], [5], [5,0], [5,0,-2,-3], [0], [0,-2,-3], [-2,-3]."
      }
    ],
    explanation:
      "Maintain a frequency array `remCount` of size `k`. When calculating remainder `(runningSum % k)`, negative values in C++ must be normalized via `((runningSum % k) + k) % k`. For each step, adding `remCount[normalizedRem]` to the total result accounts for all previously seen matching prefix remainders.",
    interviewInsight:
      "Remember in C++ `%` on negative integers produces negative remainders (e.g., `-2 % 5 = -2`). The standard formula `((x % k) + k) % k` ensures positive remainders `[0, k - 1]`.",
    cppSolution: `class Solution {
public:
    int subarraysDivByK(vector<int>& nums, int k) {
        vector<int> remFreq(k, 0);
        remFreq[0] = 1;
        int runningSum = 0, count = 0;
        
        for (int x : nums) {
            runningSum += x;
            int rem = ((runningSum % k) + k) % k;
            count += remFreq[rem];
            remFreq[rem]++;
        }
        return count;
    }
};`,
    pythonSolution: `class Solution:
    def subarraysDivByK(self, nums: list[int], k: int) -> int:
        rem_freq = [0] * k
        rem_freq[0] = 1
        running_sum = 0
        count = 0
        
        for x in nums:
            running_sum += x
            rem = running_sum % k # Python % is always non-negative for positive k
            count += rem_freq[rem]
            rem_freq[rem] += 1
            
        return count`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q57",
    questionNumber: 57,
    title: "Range Sum Query 2D - Immutable (2D Prefix Matrix)",
    statement:
      "Given a 2D matrix matrix, handle multiple queries of the following type: Calculate the sum of the elements of matrix inside the rectangle defined by its upper left corner (row1, col1) and lower right corner (row2, col2). Implement the NumMatrix class: NumMatrix(int[][] matrix) initializes the object with the integer matrix matrix. int sumRegion(int row1, int col1, int row2, int col2) returns the sum of the elements of matrix inside the rectangle in O(1) query time.",
    difficulty: "Hard",
    pattern: "2D Inclusion-Exclusion Prefix Sum",
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 200",
      "-10^4 <= matrix[i][j] <= 10^4",
      "0 <= row1 <= row2 < m",
      "0 <= col1 <= col2 < n",
      "At most 10^4 calls will be made to sumRegion."
    ],
    expectedTimeComplexity: "O(M * N) preprocessing, O(1) per query",
    expectedSpaceComplexity: "O(M * N)",
    examples: [
      {
        input: "NumMatrix matrix = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]); matrix.sumRegion(2,1,4,3);",
        output: "8",
        explanation: "Sum of submatrix [2,1] to [4,3] is 8."
      }
    ],
    explanation:
      "Construct a 2D prefix table `dp` of size `(m + 1) x (n + 1)` where `dp[i][j]` is the sum of rectangle from `(0,0)` to `(i-1, j-1)`: `dp[i][j] = matrix[i-1][j-1] + dp[i-1][j] + dp[i][j-1] - dp[i-1][j-1]`. Any query `(r1, c1)` to `(r2, c2)` is answered in O(1) by `dp[r2+1][c2+1] - dp[r1][c2+1] - dp[r2+1][c1] + dp[r1][c1]` using 2D Principle of Inclusion-Exclusion.",
    interviewInsight:
      "Using 1-based indexing for the DP matrix avoids tedious out-of-bounds boundary checks on row/column zero.",
    cppSolution: `class NumMatrix {
private:
    vector<vector<int>> dp;
public:
    NumMatrix(vector<vector<int>>& matrix) {
        if (matrix.empty() || matrix[0].empty()) return;
        int m = matrix.size(), n = matrix[0].size();
        dp.assign(m + 1, vector<int>(n + 1, 0));
        
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dp[i + 1][j + 1] = matrix[i][j] + dp[i][j + 1] + dp[i + 1][j] - dp[i][j];
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return dp[row2 + 1][col2 + 1] - dp[row1][col2 + 1] - dp[row2 + 1][col1] + dp[row1][col1];
    }
};`,
    pythonSolution: `class NumMatrix:
    def __init__(self, matrix: list[list[int]]):
        if not matrix or not matrix[0]:
            return
        m, n = len(matrix), len(matrix[0])
        self.dp = [[0] * (n + 1) for _ in range(m + 1)]
        
        for i in range(m):
            for j in range(n):
                self.dp[i + 1][j + 1] = (matrix[i][j] 
                                        + self.dp[i][j + 1] 
                                        + self.dp[i + 1][j] 
                                        - self.dp[i][j])

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return (self.dp[row2 + 1][col2 + 1] 
                - self.dp[row1][col2 + 1] 
                - self.dp[row2 + 1][col1] 
                + self.dp[row1][col1])`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q58",
    questionNumber: 58,
    title: "Count of Range Sum (Prefix Sum + Merge Sort)",
    statement:
      "Given an integer array nums and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive. Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j inclusive, where i <= j.",
    difficulty: "Hard",
    pattern: "Prefix Sum with Modified Merge Sort / BIT",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "-10^5 <= lower <= upper <= 10^5",
      "The answer is guaranteed to fit in a 32-bit integer."
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "nums = [-2,5,-1], lower = -2, upper = 2",
        output: "3",
        explanation: "The three ranges are: [0,0] -> -2, [2,2] -> -1, and [0,2] -> 2."
      }
    ],
    explanation:
      "Compute the prefix sum array `P` of size `n + 1`. The condition `lower <= P[j] - P[i] <= upper` (for `i < j`) is equivalent to `P[i] + lower <= P[j] <= P[i] + upper`. We apply Divide and Conquer (Merge Sort on prefix array). During the merge step of two sorted halves `[left..mid]` and `[mid+1..right]`, for each element in the left half, we use two pointers in the right half to find the window of valid `P[j]` values in O(N).",
    interviewInsight:
      "Prefix arrays can have 64-bit integer values; use `long long` for all prefix sum calculations to prevent integer overflow.",
    cppSolution: `class Solution {
public:
    int countRangeSum(vector<int>& nums, int lower, int upper) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
        
        vector<long long> temp(n + 1);
        return mergeSortCount(prefix, temp, 0, n, lower, upper);
    }
    
private:
    int mergeSortCount(vector<long long>& p, vector<long long>& temp, int low, int high, int lower, int upper) {
        if (low >= high) return 0;
        int mid = low + (high - low) / 2;
        int count = mergeSortCount(p, temp, low, mid, lower, upper) + 
                    mergeSortCount(p, temp, mid + 1, high, lower, upper);
        
        int j1 = mid + 1, j2 = mid + 1;
        for (int i = low; i <= mid; i++) {
            while (j1 <= high && p[j1] - p[i] < lower) j1++;
            while (j2 <= high && p[j2] - p[i] <= upper) j2++;
            count += (j2 - j1);
        }
        
        // Merge sorted halves
        int i = low, j = mid + 1, k = low;
        while (i <= mid && j <= high) {
            if (p[i] <= p[j]) temp[k++] = p[i++];
            else temp[k++] = p[j++];
        }
        while (i <= mid) temp[k++] = p[i++];
        while (j <= high) temp[k++] = p[j++];
        for (int idx = low; idx <= high; idx++) p[idx] = temp[idx];
        
        return count;
    }
};`,
    pythonSolution: `class Solution:
    def countRangeSum(self, nums: list[int], lower: int, upper: int) -> int:
        prefix = [0]
        for x in nums:
            prefix.append(prefix[-1] + x)
            
        def merge_sort(low: int, high: int) -> int:
            if low >= high:
                return 0
            mid = (low + high) // 2
            count = merge_sort(low, mid) + merge_sort(mid + 1, high)
            
            j1 = j2 = mid + 1
            for i in range(low, mid + 1):
                while j1 <= high and prefix[j1] - prefix[i] < lower:
                    j1 += 1
                while j2 <= high and prefix[j2] - prefix[i] <= upper:
                    j2 += 1
                count += (j2 - j1)
                
            prefix[low:high + 1] = sorted(prefix[low:high + 1])
            return count

        return merge_sort(0, len(prefix) - 1)`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q59",
    questionNumber: 59,
    title: "Median of Two Sorted Arrays",
    statement:
      "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    difficulty: "Extreme",
    pattern: "Binary Search on Smaller Array Partition Boundary",
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
      "Ensure `nums1` is the shorter array. We partition both arrays such that the combined left half has `(m + n + 1) / 2` elements. Let partition of `nums1` be `i` (from 0 to m) and `nums2` be `j = (m + n + 1)/2 - i`. The partition is valid when `maxLeft1 <= minRight2` and `maxLeft2 <= minRight1`. If `maxLeft1 > minRight2`, we moved too far right in `nums1`, so `high = i - 1`. Otherwise `low = i + 1`.",
    interviewInsight:
      "Using `INT_MIN` and `INT_MAX` for empty left or right partitions avoids out-of-bound edge cases at array extremities.",
    cppSolution: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.size(), n = nums2.size();
        int low = 0, high = m;
        
        while (low <= high) {
            int i = low + (high - low) / 2;
            int j = (m + n + 1) / 2 - i;
            
            int maxLeft1 = (i == 0) ? INT_MIN : nums1[i - 1];
            int minRight1 = (i == m) ? INT_MAX : nums1[i];
            
            int maxLeft2 = (j == 0) ? INT_MIN : nums2[j - 1];
            int minRight2 = (j == n) ? INT_MAX : nums2[j];
            
            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
                if ((m + n) % 2 == 1) {
                    return max(maxLeft1, maxLeft2);
                } else {
                    return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;
                }
            } else if (maxLeft1 > minRight2) {
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
        
        while low <= high:
            i = (low + high) // 2
            j = (m + n + 1) // 2 - i
            
            max_left1 = float('-inf') if i == 0 else nums1[i - 1]
            min_right1 = float('inf') if i == m else nums1[i]
            
            max_left2 = float('-inf') if j == 0 else nums2[j - 1]
            min_right2 = float('inf') if j == n else nums2[j]
            
            if max_left1 <= min_right2 and max_left2 <= min_right1:
                if (m + n) % 2 == 1:
                    return float(max(max_left1, max_left2))
                else:
                    return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2.0
            elif max_left1 > min_right2:
                high = i - 1
            else:
                low = i + 1
        return 0.0`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  },
  {
    id: "Q60",
    questionNumber: 60,
    title: "Shortest Subarray with Sum at Least K",
    statement:
      "Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. If there is no such subarray, return -1. A subarray is a contiguous part of an array.",
    difficulty: "Extreme",
    pattern: "Prefix Sum + Monotonic Increasing Deque",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^5 <= nums[i] <= 10^5",
      "1 <= k <= 10^9"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "nums = [2,-1,2], k = 3",
        output: "3",
        explanation: "Subarray [2,-1,2] has sum 3 and length 3."
      },
      {
        input: "nums = [1,2], k = 4",
        output: "-1",
        explanation: "No subarray sums to >= 4."
      }
    ],
    explanation:
      "Compute prefix sums `P`. We want `P[i] - P[j] >= k` with minimal `i - j`. We maintain a double-ended queue `dq` storing indices of increasing prefix sums: (1) While `P[i] - P[dq.front()] >= k`, we update `minLength = min(minLength, i - dq.front())` and pop front (since any future right endpoint `i' > i` with `dq.front()` would yield a strictly longer subarray). (2) While `P[i] <= P[dq.back()]`, pop back to maintain strict monotonicity.",
    interviewInsight:
      "Because numbers can be negative, a simple two-pointer sliding window breaks. Combining prefix sums with a monotonic deque guarantees each index is pushed and popped at most once, achieving optimal O(N).",
    cppSolution: `class Solution {
public:
    int shortestSubarray(vector<int>& nums, int k) {
        int n = nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
        
        deque<int> dq;
        int minLen = n + 1;
        
        for (int i = 0; i <= n; i++) {
            while (!dq.empty() && prefix[i] - prefix[dq.front()] >= k) {
                minLen = min(minLen, i - dq.front());
                dq.pop_front();
            }
            while (!dq.empty() && prefix[i] <= prefix[dq.back()]) {
                dq.pop_back();
            }
            dq.push_back(i);
        }
        return (minLen <= n) ? minLen : -1;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def shortestSubarray(self, nums: list[int], k: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = prefix[i] + nums[i]
            
        dq = deque()
        min_len = n + 1
        
        for i in range(n + 1):
            while dq and prefix[i] - prefix[dq[0]] >= k:
                min_len = min(min_len, i - dq.popleft())
            while dq and prefix[i] <= prefix[dq[-1]]:
                dq.pop()
            dq.append(i)
            
        return min_len if min_len <= n else -1`,
    topic: "Binary Search & Prefix Sum",
    batch: 3
  }
];
