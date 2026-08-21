import { DSAInterviewProblem } from "./dsaQuestionTypes.js";

export const DSA_BATCH_1_ARRAYS_HASHING: DSAInterviewProblem[] = [
  {
    id: "Q01",
    questionNumber: 1,
    title: "Pair Target Difference in Streaming Array",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "Hash Map / Complement Lookups",
    statement: "Given an unsorted integer array `nums` and an integer `target`, return `true` if there exists any pair of distinct indices `(i, j)` such that `|nums[i] - nums[j]| == target`. Otherwise, return `false`. Handle duplicates and ensure optimal single-pass linear time.",
    constraints: [
      "2 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9",
      "0 <= target <= 10^9"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      {
        input: "nums = [1, 8, 30, 40, 100], target = 60",
        output: "true",
        explanation: "nums[3] - nums[1] = 40 - 8 = 32 (no), but 100 - 40 = 60 (indices 4 and 3)."
      },
      {
        input: "nums = [5, 20, 3, 2, 50, 80], target = 78",
        output: "true",
        explanation: "80 - 2 = 78."
      }
    ],
    explanation: "For each element `x`, check if either `x - target` or `x + target` is already present in our hash set. If target == 0, count frequencies to verify if any number appears at least twice.",
    interviewInsight: "Handling target == 0 is the classic edge case interviewers test. A single hash set tracking seen numbers or frequency map cleanly resolves both positive targets and zero-difference duplicates.",
    cppSolution: `#include <vector>
#include <unordered_set>
#include <cmath>

class Solution {
public:
    bool findPairDifference(std::vector<int>& nums, int target) {
        std::unordered_set<int> seen;
        if (target == 0) {
            std::unordered_set<int> duplicates;
            for (int x : nums) {
                if (seen.count(x)) return true;
                seen.insert(x);
            }
            return false;
        }
        for (int x : nums) {
            if (seen.count(x - target) || seen.count(x + target)) {
                return true;
            }
            seen.insert(x);
        }
        return false;
    }
};`,
    pythonSolution: `class Solution:
    def findPairDifference(self, nums: list[int], target: int) -> bool:
        seen = set()
        if target == 0:
            dup = set()
            for x in nums:
                if x in dup:
                    return True
                dup.add(x)
            return False
            
        for x in nums:
            if (x - target) in seen or (x + target) in seen:
                return True
            seen.add(x)
        return False`
  },
  {
    id: "Q02",
    questionNumber: 2,
    title: "Group Anagrams by Character Frequency Fingerprint",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "Frequency Counting / Categorization Hash",
    statement: "Given an array of strings `strs`, group the anagrams together in any order. An anagram is a word formed by rearranging the letters of another word, using all original letters exactly once.",
    constraints: [
      "1 <= strs.length <= 10^4",
      "0 <= strs[i].length <= 100",
      "strs[i] consists of lowercase English letters."
    ],
    expectedTimeComplexity: "O(n * k) where k is max string length",
    expectedSpaceComplexity: "O(n * k)",
    examples: [
      {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["bat"],["nat","tan"],["ate","eat","tea"]]'
      }
    ],
    explanation: "Instead of sorting each string in O(k log k), build a 26-element frequency tuple/delimiter string `#1#0#0...` in O(k) time. Use this count representation as the hash table key.",
    interviewInsight: "Sorting strings takes O(n * k log k). Character count hashing reduces the per-string processing time to strictly linear O(k), which is crucial when string lengths are large.",
    cppSolution: `#include <vector>
#include <string>
#include <unordered_map>

class Solution {
public:
    std::vector<std::vector<std::string>> groupAnagrams(std::vector<std::string>& strs) {
        std::unordered_map<std::string, std::vector<std::string>> groups;
        for (const std::string& s : strs) {
            std::string key(26, 0);
            for (char c : s) key[c - 'a']++;
            groups[key].push_back(s);
        }
        std::vector<std::vector<std::string>> result;
        for (auto& pair : groups) {
            result.push_back(std::move(pair.second));
        }
        return result;
    }
};`,
    pythonSolution: `from collections import defaultdict

class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        groups = defaultdict(list)
        for s in strs:
            count = [0] * 26
            for c in s:
                count[ord(c) - ord('a')] += 1
            groups[tuple(count)].append(s)
        return list(groups.values())`
  },
  {
    id: "Q03",
    questionNumber: 3,
    title: "Top K Frequent Elements in O(n) Time",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "Frequency Counting / Bucket Sort",
    statement: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. Your algorithm's time complexity must be better than O(n log n).",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array].",
      "It is guaranteed that the answer is unique."
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]"
      }
    ],
    explanation: "Count frequencies with a hash map. Create buckets where index `i` stores a list of numbers that appear `i` times. Iterate backwards from the largest bucket `n` down to 1 until `k` numbers are collected.",
    interviewInsight: "While a min-heap takes O(n log k), bucket sort takes strictly O(n) because the maximum possible frequency of any element is bounded by n.",
    cppSolution: `#include <vector>
#include <unordered_map>

class Solution {
public:
    std::vector<int> topKFrequent(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> count;
        for (int n : nums) count[n]++;
        
        int n = nums.size();
        std::vector<std::vector<int>> buckets(n + 1);
        for (auto& [num, freq] : count) {
            buckets[freq].push_back(num);
        }
        
        std::vector<int> result;
        for (int i = n; i >= 0 && result.size() < k; --i) {
            for (int num : buckets[i]) {
                result.push_back(num);
                if (result.size() == k) break;
            }
        }
        return result;
    }
};`,
    pythonSolution: `class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        count = {}
        for n in nums:
            count[n] = count.get(n, 0) + 1
            
        buckets = [[] for _ in range(len(nums) + 1)]
        for num, freq in count.items():
            buckets[freq].append(num)
            
        result = []
        for i in range(len(buckets) - 1, 0, -1):
            for num in buckets[i]:
                result.append(num)
                if len(result) == k:
                    return result
        return result`
  },
  {
    id: "Q04",
    questionNumber: 4,
    title: "Subarray Sum Equals K with Negative Numbers",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "Prefix Sum + Hash Map",
    statement: "Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals to `k`.",
    constraints: [
      "1 <= nums.length <= 2 * 10^4",
      "-1000 <= nums[i] <= 1000",
      "-10^7 <= k <= 10^7"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      {
        input: "nums = [1,1,1], k = 2",
        output: "2"
      },
      {
        input: "nums = [1,-1,0], k = 0",
        output: "3",
        explanation: "[1, -1], [0], and [1, -1, 0] all sum to 0."
      }
    ],
    explanation: "Let current prefix sum be `P`. Any prior prefix sum equal to `P - k` denotes a subarray ending at the current index with sum `k`. Maintain a frequency map of prefix sums initialized with `{0: 1}`.",
    interviewInsight: "Sliding window fails when array contains negative integers because prefix sums are non-monotonic. Prefix Sum + Hash Map is the standard pattern for handling arbitrary integers.",
    cppSolution: `#include <vector>
#include <unordered_map>

class Solution {
public:
    int subarraySum(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> prefixCounts;
        prefixCounts[0] = 1;
        int currentSum = 0, count = 0;
        for (int x : nums) {
            currentSum += x;
            if (prefixCounts.count(currentSum - k)) {
                count += prefixCounts[currentSum - k];
            }
            prefixCounts[currentSum]++;
        }
        return count;
    }
};`,
    pythonSolution: `class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        prefix_counts = {0: 1}
        current_sum = 0
        ans = 0
        for x in nums:
            current_sum += x
            ans += prefix_counts.get(current_sum - k, 0)
            prefix_counts[current_sum] = prefix_counts.get(current_sum, 0) + 1
        return ans`
  },
  {
    id: "Q05",
    questionNumber: 5,
    title: "Longest Contiguous Subarray with Equal 0s and 1s",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "Prefix Sum / Coordinate Transformation",
    statement: "Given a binary array `nums`, return the maximum length of a contiguous subarray with an equal number of `0` and `1`.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "nums[i] is either 0 or 1."
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      {
        input: "nums = [0,1,0,1,1,1,0,0]",
        output: "8"
      },
      {
        input: "nums = [0,1]",
        output: "2"
      }
    ],
    explanation: "Transform all `0`s to `-1`. The problem reduces to finding the longest subarray with sum equal to 0. Store the earliest index where each prefix sum was seen in a hash map.",
    interviewInsight: "Mapping `0 -> -1` transforms count balance into an algebraic zero-sum prefix problem. To maximize length, only record the *first* occurrence of each prefix sum.",
    cppSolution: `#include <vector>
#include <unordered_map>
#include <algorithm>

class Solution {
public:
    int findMaxLength(std::vector<int>& nums) {
        std::unordered_map<int, int> firstSeen;
        firstSeen[0] = -1;
        int maxLen = 0, sum = 0;
        for (int i = 0; i < (int)nums.size(); ++i) {
            sum += (nums[i] == 1 ? 1 : -1);
            if (firstSeen.count(sum)) {
                maxLen = std::max(maxLen, i - firstSeen[sum]);
            } else {
                firstSeen[sum] = i;
            }
        }
        return maxLen;
    }
};`,
    pythonSolution: `class Solution:
    def findMaxLength(self, nums: list[int]) -> int:
        first_seen = {0: -1}
        max_len = 0
        curr_sum = 0
        for i, val in enumerate(nums):
            curr_sum += 1 if val == 1 else -1
            if curr_sum in first_seen:
                max_len = max(max_len, i - first_seen[curr_sum])
            else:
                first_seen[curr_sum] = i
        return max_len`
  },
  {
    id: "Q06",
    questionNumber: 6,
    title: "Product of Array Except Self without Division",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "Prefix & Suffix Accumulation",
    statement: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]`. You must solve it in O(n) without using the division operation.",
    constraints: [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums fits in a 32-bit integer."
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1) auxiliary (excluding output array)",
    examples: [
      {
        input: "nums = [1,2,3,4]",
        output: "[24,12,8,6]"
      },
      {
        input: "nums = [-1,1,0,-3,3]",
        output: "[0,0,9,0,0]"
      }
    ],
    explanation: "Compute running prefix products from left to right directly inside the output array. Then, iterate right to left with a single running suffix multiplier variable.",
    interviewInsight: "By accumulating suffixes dynamically in a scalar variable on the backward pass, auxiliary space drops from O(n) to O(1).",
    cppSolution: `#include <vector>

class Solution {
public:
    std::vector<int> productExceptSelf(std::vector<int>& nums) {
        int n = nums.size();
        std::vector<int> res(n, 1);
        for (int i = 1; i < n; ++i) {
            res[i] = res[i - 1] * nums[i - 1];
        }
        int right = 1;
        for (int i = n - 1; i >= 0; --i) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
};`,
    pythonSolution: `class Solution:
    def productExceptSelf(self, nums: list[int]) -> list[int]:
        n = len(nums)
        res = [1] * n
        for i in range(1, n):
            res[i] = res[i - 1] * nums[i - 1]
        right = 1
        for i in range(n - 1, -1, -1):
            res[i] *= right
            right *= nums[i]
        return res`
  },
  {
    id: "Q07",
    questionNumber: 7,
    title: "Longest Consecutive Sequence in O(n)",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "Hash Set Sequence Expansion",
    statement: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
    constraints: [
      "0 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      {
        input: "nums = [100,4,200,1,3,2]",
        output: "4",
        explanation: "The longest consecutive sequence is [1, 2, 3, 4]. Length = 4."
      }
    ],
    explanation: "Insert all numbers into a hash set. For each number `x`, check if `x - 1` exists. Only start counting the streak if `x - 1` is absent (meaning `x` is the sequence head).",
    interviewInsight: "Checking `!set.count(x - 1)` ensures that every consecutive chain is traversed only once from its true starting element, guaranteeing strict O(n) total operations.",
    cppSolution: `#include <vector>
#include <unordered_set>
#include <algorithm>

class Solution {
public:
    int longestConsecutive(std::vector<int>& nums) {
        std::unordered_set<int> numSet(nums.begin(), nums.end());
        int longest = 0;
        for (int num : numSet) {
            if (!numSet.count(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;
                while (numSet.count(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }
                longest = std::max(longest, currentStreak);
            }
        }
        return longest;
    }
};`,
    pythonSolution: `class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        num_set = set(nums)
        longest = 0
        for num in num_set:
            if num - 1 not in num_set:
                curr = num
                streak = 1
                while curr + 1 in num_set:
                    curr += 1
                    streak += 1
                longest = max(longest, streak)
        return longest`
  },
  {
    id: "Q08",
    questionNumber: 8,
    title: "Next Lexicographical Permutation In-Place",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "In-place Array Manipulation",
    statement: "Given an array of integers `nums`, rearrange it into the lexicographically next greater permutation of numbers. If no such permutation is possible (array sorted descending), rearrange it as the lowest possible order (sorted ascending). Must modify in-place.",
    constraints: [
      "1 <= nums.length <= 100",
      "0 <= nums[i] <= 100"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [1,2,3]",
        output: "[1,3,2]"
      },
      {
        input: "nums = [3,2,1]",
        output: "[1,2,3]"
      }
    ],
    explanation: "1. Find largest index `i` from right where `nums[i] < nums[i+1]`. 2. If found, find largest index `j > i` where `nums[j] > nums[i]`, and swap `nums[i]` and `nums[j]`. 3. Reverse the suffix from `i + 1` to end.",
    interviewInsight: "The pivot point `i` breaks the descending suffix. Reversing the suffix after the swap guarantees the minimal lexicographical increment in O(n) without sorting.",
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    void nextPermutation(std::vector<int>& nums) {
        int n = nums.size(), i = n - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = n - 1;
            while (nums[j] <= nums[i]) j--;
            std::swap(nums[i], nums[j]);
        }
        std::reverse(nums.begin() + i + 1, nums.end());
    }
};`,
    pythonSolution: `class Solution:
    def nextPermutation(self, nums: list[int]) -> None:
        n = len(nums)
        i = n - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = n - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[i + 1:] = reversed(nums[i + 1:])`
  },
  {
    id: "Q09",
    questionNumber: 9,
    title: "Find Missing and Repeated Values in Linear Time and O(1) Space",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "In-place Sign-Inversion Hashing",
    statement: "Given an array `nums` of size `n` containing numbers from `1` to `n` where one number appears twice and one is missing, find both in O(n) time and O(1) extra space.",
    constraints: [
      "2 <= n <= 10^5",
      "1 <= nums[i] <= n"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [3,1,2,5,3]",
        output: "[3, 4]",
        explanation: "3 is repeated, 4 is missing."
      }
    ],
    explanation: "Use array indices as a hash table. For each element `x = |nums[i]|`, flip the sign of `nums[x - 1]`. If it's already negative, `x` is the duplicate. On second pass, the positive index + 1 is the missing number.",
    interviewInsight: "Sign inversion leverages the sign bit of integers to encode presence without allocating secondary hash memory, a signature Tier-1 interview technique.",
    cppSolution: `#include <vector>
#include <cmath>

class Solution {
public:
    std::vector<int> findErrorNums(std::vector<int>& nums) {
        int dup = -1, missing = -1;
        for (int i = 0; i < (int)nums.size(); ++i) {
            int val = std::abs(nums[i]);
            if (nums[val - 1] < 0) {
                dup = val;
            } else {
                nums[val - 1] = -nums[val - 1];
            }
        }
        for (int i = 0; i < (int)nums.size(); ++i) {
            if (nums[i] > 0) {
                missing = i + 1;
                break;
            }
        }
        return {dup, missing};
    }
};`,
    pythonSolution: `class Solution:
    def findErrorNums(self, nums: list[int]) -> list[int]:
        dup = missing = -1
        for x in nums:
            val = abs(x)
            if nums[val - 1] < 0:
                dup = val
            else:
                nums[val - 1] = -nums[val - 1]
        for i, val in enumerate(nums):
            if val > 0:
                missing = i + 1
                break
        return [dup, missing]`
  },
  {
    id: "Q10",
    questionNumber: 10,
    title: "Continuous Subarray Sum Divisible by K with Length >= 2",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "Prefix Sum Modulo Hash Map",
    statement: "Given an integer array `nums` and an integer `k`, return `true` if `nums` has a continuous subarray of size at least two whose elements sum up to a multiple of `k`, or `false` otherwise.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "0 <= nums[i] <= 10^9",
      "1 <= k <= 2^31 - 1"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(min(n, k))",
    examples: [
      {
        input: "nums = [23,2,4,6,7], k = 6",
        output: "true",
        explanation: "[2, 4] sums to 6 which is a multiple of 6."
      },
      {
        input: "nums = [23,2,6,4,7], k = 13",
        output: "false"
      }
    ],
    explanation: "If `(prefix[j] - prefix[i]) % k == 0`, then `prefix[j] % k == prefix[i] % k`. Store the first seen index of each modulo remainder. If the same remainder is seen at index `j` where `j - i >= 2`, return true.",
    interviewInsight: "Initialize map with `{0: -1}` so that a valid subarray starting at index 0 (e.g. `nums = [23, 1], k = 6 -> sum = 24 % 6 = 0`) correctly computes length `1 - (-1) = 2`.",
    cppSolution: `#include <vector>
#include <unordered_map>

class Solution {
public:
    bool checkSubarraySum(std::vector<int>& nums, int k) {
        std::unordered_map<int, int> remainderMap;
        remainderMap[0] = -1;
        int runningSum = 0;
        for (int i = 0; i < (int)nums.size(); ++i) {
            runningSum += nums[i];
            int rem = runningSum % k;
            if (remainderMap.count(rem)) {
                if (i - remainderMap[rem] >= 2) return true;
            } else {
                remainderMap[rem] = i;
            }
        }
        return false;
    }
};`,
    pythonSolution: `class Solution:
    def checkSubarraySum(self, nums: list[int], k: int) -> bool:
        rem_map = {0: -1}
        running_sum = 0
        for i, val in enumerate(nums):
            running_sum += val
            rem = running_sum % k
            if rem in rem_map:
                if i - rem_map[rem] >= 2:
                    return True
            else:
                rem_map[rem] = i
        return False`
  },
  {
    id: "Q11",
    questionNumber: 11,
    title: "Maximum Product Subarray with Negative Alternation",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "Kadane's Dynamic State Tracking",
    statement: "Given an integer array `nums`, find a contiguous non-empty subarray within the array that has the largest product, and return the product.",
    constraints: [
      "1 <= nums.length <= 2 * 10^4",
      "-10 <= nums[i] <= 10"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [2,3,-2,4]",
        output: "6",
        explanation: "[2, 3] gives the largest product 6."
      },
      {
        input: "nums = [-2,0,-1]",
        output: "0"
      }
    ],
    explanation: "Because multiplying by a negative number turns a minimum product into a maximum product and vice-versa, maintain both `max_prod` and `min_prod` ending at each position.",
    interviewInsight: "When encountering a negative number, swap `max_prod` and `min_prod` before updating. This handles odd/even negative count flips in constant space.",
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxProduct(std::vector<int>& nums) {
        int maxProd = nums[0], minProd = nums[0], ans = nums[0];
        for (size_t i = 1; i < nums.size(); ++i) {
            if (nums[i] < 0) std::swap(maxProd, minProd);
            maxProd = std::max(nums[i], maxProd * nums[i]);
            minProd = std::min(nums[i], minProd * nums[i]);
            ans = std::max(ans, maxProd);
        }
        return ans;
    }
};`,
    pythonSolution: `class Solution:
    def maxProduct(self, nums: list[int]) -> int:
        cur_max = cur_min = ans = nums[0]
        for x in nums[1:]:
            if x < 0:
                cur_max, cur_min = cur_min, cur_max
            cur_max = max(x, cur_max * x)
            cur_min = min(x, cur_min * x)
            ans = max(ans, cur_max)
        return ans`
  },
  {
    id: "Q12",
    questionNumber: 12,
    title: "Valid Sudoku Configuration with Bitmask Hashing",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "2D Matrix Hashing / Bitmasking",
    statement: "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to standard Sudoku rules (unique digits 1-9 per row, column, and 3x3 subgrid).",
    constraints: [
      "board.length == 9",
      "board[i].length == 9",
      "board[i][j] is a digit '1'-'9' or '.'."
    ],
    expectedTimeComplexity: "O(1) - fixed 81 cells",
    expectedSpaceComplexity: "O(1) - fixed 9x9 masks",
    examples: [
      {
        input: 'board with valid 9x9 placements',
        output: 'true'
      }
    ],
    explanation: "Use bitmasks for each row, column, and 3x3 block `(r / 3) * 3 + (c / 3)`. For each digit `d`, check if bit `1 << d` is already set. If set, return false; otherwise set the bit.",
    interviewInsight: "Bitmasks eliminate hash set allocation overhead and allow single-pass bitwise OR checks in CPU registers.",
    cppSolution: `#include <vector>

class Solution {
public:
    bool isValidSudoku(std::vector<std::vector<char>>& board) {
        int rows[9] = {0}, cols[9] = {0}, boxes[9] = {0};
        for (int r = 0; r < 9; ++r) {
            for (int c = 0; c < 9; ++c) {
                if (board[r][c] == '.') continue;
                int val = board[r][c] - '1';
                int bit = 1 << val;
                int boxIdx = (r / 3) * 3 + (c / 3);
                if ((rows[r] & bit) || (cols[c] & bit) || (boxes[boxIdx] & bit)) {
                    return false;
                }
                rows[r] |= bit;
                cols[c] |= bit;
                boxes[boxIdx] |= bit;
            }
        }
        return true;
    }
};`,
    pythonSolution: `class Solution:
    def isValidSudoku(self, board: list[list[str]]) -> bool:
        rows = [0] * 9
        cols = [0] * 9
        boxes = [0] * 9
        for r in range(9):
            for c in range(9):
                if board[r][c] == '.':
                    continue
                val = int(board[r][c]) - 1
                bit = 1 << val
                box_idx = (r // 3) * 3 + (c // 3)
                if (rows[r] & bit) or (cols[c] & bit) or (boxes[box_idx] & bit):
                    return False
                rows[r] |= bit
                cols[c] |= bit
                boxes[box_idx] |= bit
        return True`
  },
  {
    id: "Q13",
    questionNumber: 13,
    title: "Set Matrix Zeroes in O(1) Auxiliary Space",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "In-place State Encoding",
    statement: "Given an `m x n` integer matrix `matrix`, if an element is `0`, set its entire row and column to `0`s. You must do it in place without allocating extra m+n arrays.",
    constraints: [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 <= m, n <= 200",
      "-2^31 <= matrix[i][j] <= 2^31 - 1"
    ],
    expectedTimeComplexity: "O(m * n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        output: "[[1,0,1],[0,0,0],[1,0,1]]"
      }
    ],
    explanation: "Use row 0 and column 0 of the matrix as marker arrays. Use two boolean flags to record whether row 0 and col 0 originally contained zeroes. Process markers, then zero out inner cells.",
    interviewInsight: "The order of zeroing cells matters: update rows `1..m-1` and cols `1..n-1` first using `matrix[i][0]` and `matrix[0][j]`, and only zero out row 0 / col 0 at the very end.",
    cppSolution: `#include <vector>

class Solution {
public:
    void setZeroes(std::vector<std::vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool firstRowZero = false, firstColZero = false;
        
        for (int r = 0; r < m; ++r) if (matrix[r][0] == 0) firstColZero = true;
        for (int c = 0; c < n; ++c) if (matrix[0][c] == 0) firstRowZero = true;
        
        for (int r = 1; r < m; ++r) {
            for (int c = 1; c < n; ++c) {
                if (matrix[r][c] == 0) {
                    matrix[r][0] = 0;
                    matrix[0][c] = 0;
                }
            }
        }
        for (int r = 1; r < m; ++r) {
            for (int c = 1; c < n; ++c) {
                if (matrix[r][0] == 0 || matrix[0][c] == 0) {
                    matrix[r][c] = 0;
                }
            }
        }
        if (firstColZero) for (int r = 0; r < m; ++r) matrix[r][0] = 0;
        if (firstRowZero) for (int c = 0; c < n; ++c) matrix[0][c] = 0;
    }
};`,
    pythonSolution: `class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        m, n = len(matrix), len(matrix[0])
        first_row_zero = any(matrix[0][c] == 0 for c in range(n))
        first_col_zero = any(matrix[r][0] == 0 for r in range(m))
        
        for r in range(1, m):
            for c in range(1, n):
                if matrix[r][c] == 0:
                    matrix[r][0] = 0
                    matrix[0][c] = 0
                    
        for r in range(1, m):
            for c in range(1, n):
                if matrix[r][0] == 0 or matrix[0][c] == 0:
                    matrix[r][c] = 0
                    
        if first_col_zero:
            for r in range(m):
                matrix[r][0] = 0
        if first_row_zero:
            for c in range(n):
                matrix[0][c] = 0`
  },
  {
    id: "Q14",
    questionNumber: 14,
    title: "Spiral Matrix Traversal with Dynamic Boundaries",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "2D Matrix Layer Slicing",
    statement: "Given an `m x n` matrix, return all elements of the matrix in spiral order (clockwise starting from top-left).",
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 10",
      "-100 <= matrix[i][j] <= 100"
    ],
    expectedTimeComplexity: "O(m * n)",
    expectedSpaceComplexity: "O(1) auxiliary",
    examples: [
      {
        input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        output: "[1,2,3,6,9,8,7,4,5]"
      }
    ],
    explanation: "Maintain four boundaries: `top`, `bottom`, `left`, `right`. Traverse top row (left->right), right column (top->bottom), bottom row (right->left), and left column (bottom->top), contracting borders inward.",
    interviewInsight: "Always guard the bottom and left traverses with `if (top <= bottom)` and `if (left <= right)` checks to avoid double-processing single rows or columns in non-square matrices.",
    cppSolution: `#include <vector>

class Solution {
public:
    std::vector<int> spiralOrder(std::vector<std::vector<int>>& matrix) {
        std::vector<int> result;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;
        
        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; ++c) result.push_back(matrix[top][c]);
            top++;
            for (int r = top; r <= bottom; ++r) result.push_back(matrix[r][right]);
            right--;
            if (top <= bottom) {
                for (int c = right; c >= left; --c) result.push_back(matrix[bottom][c]);
                bottom--;
            }
            if (left <= right) {
                for (int r = bottom; r >= top; --r) result.push_back(matrix[r][left]);
                left++;
            }
        }
        return result;
    }
};`,
    pythonSolution: `class Solution:
    def spiralOrder(self, matrix: list[list[int]]) -> list[int]:
        res = []
        top, bottom = 0, len(matrix) - 1
        left, right = 0, len(matrix[0]) - 1
        while top <= bottom and left <= right:
            for c in range(left, right + 1):
                res.append(matrix[top][c])
            top += 1
            for r in range(top, bottom + 1):
                res.append(matrix[r][right])
            right -= 1
            if top <= bottom:
                for c in range(right, left - 1, -1):
                    res.append(matrix[bottom][c])
                bottom -= 1
            if left <= right:
                for r in range(bottom, top - 1, -1):
                    res.append(matrix[r][left])
                left += 1
        return res`
  },
  {
    id: "Q15",
    questionNumber: 15,
    title: "Longest Subarray with Absolute Difference <= Limit",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Hard",
    pattern: "Monotonic Deque Window Hashing",
    statement: "Given an array of integers `nums` and an integer `limit`, return the size of the longest non-empty subarray such that the absolute difference between any two elements of this subarray is less than or equal to `limit`.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= 10^9",
      "0 <= limit <= 10^9"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      {
        input: "nums = [8,2,4,7], limit = 4",
        output: "2",
        explanation: "[2,4] has max diff |4-2|=2 <= 4. [4,7] has max diff |7-4|=3 <= 4."
      }
    ],
    explanation: "Use two monotonic deques: `max_dq` (monotonic decreasing to track max) and `min_dq` (monotonic increasing to track min). Expand right window pointer. If `max_dq.front() - min_dq.front() > limit`, pop from left.",
    interviewInsight: "While a `std::multiset` achieves O(n log n), two monotonic deques yield amortized O(1) per element, bringing total time to strict O(n).",
    cppSolution: `#include <vector>
#include <deque>
#include <algorithm>

class Solution {
public:
    int longestSubarray(std::vector<int>& nums, int limit) {
        std::deque<int> maxDq, minDq;
        int left = 0, maxLen = 0;
        for (int right = 0; right < (int)nums.size(); ++right) {
            while (!maxDq.empty() && nums[right] > maxDq.back()) maxDq.pop_back();
            while (!minDq.empty() && nums[right] < minDq.back()) minDq.pop_back();
            maxDq.push_back(nums[right]);
            minDq.push_back(nums[right]);
            
            while (maxDq.front() - minDq.front() > limit) {
                if (maxDq.front() == nums[left]) maxDq.pop_front();
                if (minDq.front() == nums[left]) minDq.pop_front();
                left++;
            }
            maxLen = std::max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def longestSubarray(self, nums: list[int], limit: int) -> int:
        max_dq = deque()
        min_dq = deque()
        left = 0
        max_len = 0
        for right, val in enumerate(nums):
            while max_dq and val > max_dq[-1]:
                max_dq.pop()
            while min_dq and val < min_dq[-1]:
                min_dq.pop()
            max_dq.append(val)
            min_dq.append(val)
            
            while max_dq[0] - min_dq[0] > limit:
                if max_dq[0] == nums[left]:
                    max_dq.popleft()
                if min_dq[0] == nums[left]:
                    min_dq.popleft()
                left += 1
            max_len = max(max_len, right - left + 1)
        return max_len`
  },
  {
    id: "Q16",
    questionNumber: 16,
    title: "Insert Delete GetRandom O(1) with Frequency Mapping",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Hard",
    pattern: "Hash Map + Dynamic Array Swap-to-Back",
    statement: "Implement the `RandomizedSet` class supporting `insert(val)`, `remove(val)`, and `getRandom()` each in average O(1) time complexity.",
    constraints: [
      "-2^31 <= val <= 2^31 - 1",
      "At most 2 * 10^5 calls will be made to insert, remove, and getRandom.",
      "There will be at least one element in the data structure when getRandom is called."
    ],
    expectedTimeComplexity: "O(1) average for all operations",
    expectedSpaceComplexity: "O(n)",
    examples: [
      {
        input: '["insert(1)", "remove(2)", "insert(2)", "getRandom()", "remove(1)", "insert(2)", "getRandom()"]',
        output: "[true, false, true, 2, true, false, 2]"
      }
    ],
    explanation: "Combine an array (for O(1) random index access) with a hash map mapping `val -> index in array`. For `remove(val)`, overwrite `nums[index]` with `nums.back()`, update the map for the moved back element, and pop the back.",
    interviewInsight: "The swap-and-pop trick is the cornerstone of O(1) deletions in dynamic arrays, preventing expensive O(n) array element shifts.",
    cppSolution: `#include <vector>
#include <unordered_map>
#include <cstdlib>

class RandomizedSet {
private:
    std::vector<int> nums;
    std::unordered_map<int, int> valToIdx;
public:
    RandomizedSet() {}
    
    bool insert(int val) {
        if (valToIdx.count(val)) return false;
        valToIdx[val] = nums.size();
        nums.push_back(val);
        return true;
    }
    
    bool remove(int val) {
        if (!valToIdx.count(val)) return false;
        int idx = valToIdx[val];
        int lastVal = nums.back();
        nums[idx] = lastVal;
        valToIdx[lastVal] = idx;
        nums.pop_back();
        valToIdx.erase(val);
        return true;
    }
    
    int getRandom() {
        return nums[rand() % nums.size()];
    }
};`,
    pythonSolution: `import random

class RandomizedSet:
    def __init__(self):
        self.nums = []
        self.val_to_idx = {}

    def insert(self, val: int) -> bool:
        if val in self.val_to_idx:
            return False
        self.val_to_idx[val] = len(self.nums)
        self.nums.append(val)
        return True

    def remove(self, val: int) -> bool:
        if val not in self.val_to_idx:
            return False
        idx = self.val_to_idx[val]
        last_val = self.nums[-1]
        self.nums[idx] = last_val
        self.val_to_idx[last_val] = idx
        self.nums.pop()
        del self.val_to_idx[val]
        return True

    def getRandom(self) -> int:
        return random.choice(self.nums)`
  },
  {
    id: "Q17",
    questionNumber: 17,
    title: "Subarray Sums Divisible by K with Negative Modulo Handling",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Medium",
    pattern: "Prefix Modulo Frequency Counting",
    statement: "Given an integer array `nums` and an integer `k`, return the number of non-empty subarrays that have a sum divisible by `k`.",
    constraints: [
      "1 <= nums.length <= 3 * 10^4",
      "-10^4 <= nums[i] <= 10^4",
      "2 <= k <= 10^4"
    ],
    expectedTimeComplexity: "O(n + k)",
    expectedSpaceComplexity: "O(k)",
    examples: [
      {
        input: "nums = [4,5,0,-2,-3,1], k = 5",
        output: "7",
        explanation: "Subarrays: [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]"
      }
    ],
    explanation: "Compute running prefix sum modulo `k`. In languages like C++, negative numbers yield negative modulo results (e.g. `-2 % 5 = -2`). Normalize it using `((sum % k) + k) % k`. Add the count of times that remainder was previously seen.",
    interviewInsight: "Standardizing negative remainder via `((rem % k) + k) % k` is an essential interview trick that prevents wrong answer bugs on negative inputs.",
    cppSolution: `#include <vector>

class Solution {
public:
    int subarraysDivByK(std::vector<int>& nums, int k) {
        std::vector<int> count(k, 0);
        count[0] = 1;
        int runningSum = 0, result = 0;
        for (int x : nums) {
            runningSum += x;
            int rem = ((runningSum % k) + k) % k;
            result += count[rem];
            count[rem]++;
        }
        return result;
    }
};`,
    pythonSolution: `class Solution:
    def subarraysDivByK(self, nums: list[int], k: int) -> int:
        count = [0] * k
        count[0] = 1
        running_sum = 0
        ans = 0
        for x in nums:
            running_sum += x
            rem = running_sum % k
            ans += count[rem]
            count[rem] += 1
        return ans`
  },
  {
    id: "Q18",
    questionNumber: 18,
    title: "First Missing Positive in Linear Time and O(1) Space",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Hard",
    pattern: "Cyclic Sort / In-Place Index Hashing",
    statement: "Given an unsorted integer array `nums`, return the smallest positive integer that is not present in `nums`. You must implement an algorithm that runs in O(n) time and uses O(1) auxiliary space.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [3,4,-1,1]",
        output: "2"
      },
      {
        input: "nums = [7,8,9,11,12]",
        output: "1"
      }
    ],
    explanation: "Place each number `x` where `1 <= x <= n` at its correct index `x - 1` by continuously swapping `nums[i]` with `nums[nums[i] - 1]`. Afterwards, the first index `i` where `nums[i] != i + 1` identifies the answer `i + 1`.",
    interviewInsight: "Each swap places at least one number in its permanent destination. Since each number is swapped at most once into place, the loop runs in strictly O(n) amortized time.",
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int firstMissingPositive(std::vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; ++i) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                std::swap(nums[i], nums[nums[i] - 1]);
            }
        }
        for (int i = 0; i < n; ++i) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
};`,
    pythonSolution: `class Solution:
    def firstMissingPositive(self, nums: list[int]) -> int:
        n = len(nums)
        for i in range(n):
            while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
                target = nums[i] - 1
                nums[i], nums[target] = nums[target], nums[i]
        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
        return n + 1`
  },
  {
    id: "Q19",
    questionNumber: 19,
    title: "2D Range Sum Query with Constant Time Lookup",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Hard",
    pattern: "2D Prefix Sum Matrix Geometry",
    statement: "Given a 2D matrix `matrix`, handle multiple queries calculating the sum of elements inside the rectangle defined by top-left `(row1, col1)` and bottom-right `(row2, col2)` in O(1) query time.",
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 200",
      "-10^4 <= matrix[i][j] <= 10^4",
      "At most 10^4 calls will be made to sumRegion."
    ],
    expectedTimeComplexity: "O(m * n) precomputation, O(1) per query",
    expectedSpaceComplexity: "O(m * n)",
    examples: [
      {
        input: 'NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]); sumRegion(2,1,4,3)',
        output: "8"
      }
    ],
    explanation: "Build 2D prefix table `P[r+1][c+1] = matrix[r][c] + P[r][c+1] + P[r+1][c] - P[r][c]`. Then compute any submatrix sum in O(1) using Principle of Inclusion-Exclusion: `P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1]`.",
    interviewInsight: "The `+1` padding in the 2D prefix matrix removes boundary conditional checks for row 0 and column 0 entirely.",
    cppSolution: `#include <vector>

class NumMatrix {
private:
    std::vector<std::vector<int>> dp;
public:
    NumMatrix(std::vector<std::vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        dp.assign(m + 1, std::vector<int>(n + 1, 0));
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                dp[r + 1][c + 1] = matrix[r][c] + dp[r][c + 1] + dp[r + 1][c] - dp[r][c];
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return dp[row2 + 1][col2 + 1] - dp[row1][col2 + 1] - dp[row2 + 1][col1] + dp[row1][col1];
    }
};`,
    pythonSolution: `class NumMatrix:
    def __init__(self, matrix: list[list[int]]):
        m, n = len(matrix), len(matrix[0])
        self.dp = [[0] * (n + 1) for _ in range(m + 1)]
        for r in range(m):
            for c in range(n):
                self.dp[r + 1][c + 1] = matrix[r][c] + self.dp[r][c + 1] + self.dp[r + 1][c] - self.dp[r][c]

    def sumRegion(self, row1: int, col1: int, row2: int, col2: int) -> int:
        return (self.dp[row2 + 1][col2 + 1] 
                - self.dp[row1][col2 + 1] 
                - self.dp[row2 + 1][col1] 
                + self.dp[row1][col1])`
  },
  {
    id: "Q20",
    questionNumber: 20,
    title: "Count Total Subarrays with Given Bitwise XOR Target",
    topic: "Arrays, Hashing & Prefix Sums",
    batch: 1,
    difficulty: "Hard",
    pattern: "Prefix XOR + Hash Map",
    statement: "Given an array of integers `A` and an integer `B`, find the total number of continuous subarrays having bitwise XOR of all elements equal to `B`.",
    constraints: [
      "1 <= A.length <= 10^5",
      "0 <= A[i] <= 10^6",
      "0 <= B <= 10^6"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      {
        input: "A = [4, 2, 2, 6, 4], B = 6",
        output: "4",
        explanation: "Subarrays with XOR = 6 are: [4, 2], [4, 2, 2, 6, 4], [2, 2, 6], and [6]."
      }
    ],
    explanation: "Let `prefixXOR` be the cumulative XOR from index 0 to `i`. If `prefixXOR ^ Y = B`, then `Y = prefixXOR ^ B`. Track prefix XOR frequencies in a hash map.",
    interviewInsight: "XOR properties (`X ^ Y = Z <=> X ^ Z = Y`) mirror addition for prefix sum algorithms, replacing `sum - target` with `currXor ^ target`.",
    cppSolution: `#include <vector>
#include <unordered_map>

class Solution {
public:
    int solve(std::vector<int>& A, int B) {
        std::unordered_map<int, int> xorCount;
        xorCount[0] = 1;
        int currXor = 0, count = 0;
        for (int x : A) {
            currXor ^= x;
            int target = currXor ^ B;
            if (xorCount.count(target)) {
                count += xorCount[target];
            }
            xorCount[currXor]++;
        }
        return count;
    }
};`,
    pythonSolution: `class Solution:
    def solve(self, A: list[int], B: int) -> int:
        xor_map = {0: 1}
        curr_xor = 0
        ans = 0
        for x in A:
            curr_xor ^= x
            target = curr_xor ^ B
            ans += xor_map.get(target, 0)
            xor_map[curr_xor] = xor_map.get(curr_xor, 0) + 1
        return ans`
  }
];
