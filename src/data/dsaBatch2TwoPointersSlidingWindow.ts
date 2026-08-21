import { DSAInterviewProblem } from "./dsaQuestionTypes.js";

export const DSA_BATCH_2_TWO_POINTERS_SLIDING_WINDOW: DSAInterviewProblem[] = [
  {
    id: "Q21",
    questionNumber: 21,
    title: "3Sum Zero Triplet Convergence with Deduplication",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Medium",
    pattern: "Opposite-direction Two Pointers + Sorting",
    statement: "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. The solution set must not contain duplicate triplets.",
    constraints: [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    expectedTimeComplexity: "O(n^2)",
    expectedSpaceComplexity: "O(1) auxiliary (excluding output)",
    examples: [
      {
        input: "nums = [-1,0,1,2,-1,-4]",
        output: "[[-1,-1,2],[-1,0,1]]"
      },
      {
        input: "nums = [0,1,1]",
        output: "[]"
      }
    ],
    explanation: "Sort `nums`. Iterate index `i` from 0 to n-3. For each `i`, run two pointers `left = i + 1` and `right = n - 1`. Squeeze pointers inward based on the sum comparison to 0. Skip duplicate values for `i`, `left`, and `right`.",
    interviewInsight: "Sorting allows early termination (`nums[i] > 0` cannot sum to 0) and enables clean O(1) space deduplication by incrementing past identical adjacent values.",
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> threeSum(std::vector<int>& nums) {
        std::sort(nums.begin(), nums.end());
        std::vector<std::vector<int>> result;
        int n = nums.size();
        for (int i = 0; i < n - 2; ++i) {
            if (nums[i] > 0) break;
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    result.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    r--;
                }
            }
        }
        return result;
    }
};`,
    pythonSolution: `class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        res = []
        n = len(nums)
        for i in range(n - 2):
            if nums[i] > 0:
                break
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            l, r = i + 1, n - 1
            while l < r:
                s = nums[i] + nums[l] + nums[r]
                if s == 0:
                    res.append([nums[i], nums[l], nums[r]])
                    while l < r and nums[l] == nums[l + 1]:
                        l += 1
                    while l < r and nums[r] == nums[r - 1]:
                        r -= 1
                    l += 1
                    r -= 1
                elif s < 0:
                    l += 1
                else:
                    r -= 1
        return res`
  },
  {
    id: "Q22",
    questionNumber: 22,
    title: "Container With Most Water Greedy Squeeze",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Medium",
    pattern: "Opposite-direction Two Pointers",
    statement: "You are given an integer array `height` of length `n`. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    constraints: [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "height = [1,8,6,2,5,4,8,3,7]",
        output: "49",
        explanation: "Between index 1 (height 8) and index 8 (height 7), width = 7, min_height = 7, area = 49."
      }
    ],
    explanation: "Initialize `left = 0`, `right = n - 1`. The area is `(right - left) * min(height[left], height[right])`. Inward movement reduces width; thus to potentially increase area, always move the pointer pointing to the shorter vertical line.",
    interviewInsight: "Moving the taller pointer cannot possibly yield a larger area because the height is bottlenecked by the shorter line while the width decreases.",
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int maxArea(std::vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxWater = 0;
        while (left < right) {
            int h = std::min(height[left], height[right]);
            maxWater = std::max(maxWater, h * (right - left));
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxWater;
    }
};`,
    pythonSolution: `class Solution:
    def maxArea(self, height: list[int]) -> int:
        l, r = 0, len(height) - 1
        max_water = 0
        while l < r:
            h = min(height[l], height[r])
            max_water = max(max_water, h * (r - l))
            if height[l] < height[r]:
                l += 1
            else:
                r -= 1
        return max_water`
  },
  {
    id: "Q23",
    questionNumber: 23,
    title: "In-Place String Compression & Run-Length Encoding",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Medium",
    pattern: "Fast / Slow Read-Write Pointers",
    statement: "Given an array of characters `chars`, compress it using run-length encoding. Write the compressed characters in-place and return the new length of the array. Use O(1) extra space.",
    constraints: [
      "1 <= chars.length <= 2000",
      "chars[i] is a lowercase English letter, uppercase English letter, digit, or symbol."
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: 'chars = ["a","a","b","b","c","c","c"]',
        output: '6, chars = ["a","2","b","2","c","3"]'
      },
      {
        input: 'chars = ["a"]',
        output: '1, chars = ["a"]'
      }
    ],
    explanation: "Use a `write` pointer and a `read` pointer. Group identical adjacent characters with `anchor`. Write the character, and if count > 1, write each digit of the count.",
    interviewInsight: "Because compressed length <= original length for all runs (single characters remain length 1, runs of >= 2 compress), `write <= read` always holds true, eliminating risk of overwriting unread data.",
    cppSolution: `#include <vector>
#include <string>

class Solution {
public:
    int compress(std::vector<char>& chars) {
        int write = 0, read = 0, n = chars.size();
        while (read < n) {
            int anchor = read;
            while (read < n && chars[read] == chars[anchor]) {
                read++;
            }
            chars[write++] = chars[anchor];
            int count = read - anchor;
            if (count > 1) {
                for (char digit : std::to_string(count)) {
                    chars[write++] = digit;
                }
            }
        }
        return write;
    }
};`,
    pythonSolution: `class Solution:
    def compress(self, chars: list[str]) -> int:
        write = 0
        read = 0
        n = len(chars)
        while read < n:
            anchor = read
            while read < n and chars[read] == chars[anchor]:
                read += 1
            chars[write] = chars[anchor]
            write += 1
            count = read - anchor
            if count > 1:
                for digit in str(count):
                    chars[write] = digit
                    write += 1
        return write`
  },
  {
    id: "Q24",
    questionNumber: 24,
    title: "Find All Anagram Starting Indices via Sliding Window",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Medium",
    pattern: "Fixed-size Sliding Window + Frequency Vector",
    statement: "Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in any order.",
    constraints: [
      "1 <= s.length, p.length <= 3 * 10^4",
      "s and p consist of lowercase English letters."
    ],
    expectedTimeComplexity: "O(n) where n = s.length",
    expectedSpaceComplexity: "O(1) - fixed 26 letters",
    examples: [
      {
        input: 's = "cbaebabacd", p = "abc"',
        output: "[0, 6]",
        explanation: 'The substring with start index = 0 is "cba", which is an anagram of "abc". The substring with start index = 6 is "bac", which is an anagram of "abc".'
      }
    ],
    explanation: "Maintain a sliding window of length `k = p.length()`. Keep count differences or a 26-element array. As the window slides right, increment the newly entered character and decrement the character left behind.",
    interviewInsight: "Tracking a single scalar `matches` (count of characters with equal frequency) enables O(1) checks per window slide instead of comparing 26 values every time.",
    cppSolution: `#include <vector>
#include <string>

class Solution {
public:
    std::vector<int> findAnagrams(std::string s, std::string p) {
        if (s.length() < p.length()) return {};
        std::vector<int> pCount(26, 0), sCount(26, 0), result;
        for (char c : p) pCount[c - 'a']++;
        int k = p.length();
        for (int i = 0; i < (int)s.length(); ++i) {
            sCount[s[i] - 'a']++;
            if (i >= k) sCount[s[i - k] - 'a']--;
            if (i >= k - 1 && sCount == pCount) {
                result.push_back(i - k + 1);
            }
        }
        return result;
    }
};`,
    pythonSolution: `class Solution:
    def findAnagrams(self, s: str, p: str) -> list[int]:
        if len(s) < len(p):
            return []
        p_count = [0] * 26
        s_count = [0] * 26
        for c in p:
            p_count[ord(c) - ord('a')] += 1
        k = len(p)
        res = []
        for i, c in enumerate(s):
            s_count[ord(c) - ord('a')] += 1
            if i >= k:
                s_count[ord(s[i - k]) - ord('a')] -= 1
            if i >= k - 1 and s_count == p_count:
                res.append(i - k + 1)
        return res`
  },
  {
    id: "Q25",
    questionNumber: 25,
    title: "Longest Substring Without Repeating Characters",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Medium",
    pattern: "Variable-size Sliding Window / Index Map",
    statement: "Given a string `s`, find the length of the longest substring without repeating characters.",
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(min(n, alphabet_size))",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with length of 3.'
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with length of 3.'
      }
    ],
    explanation: "Maintain a map storing the last seen index of each character. When character `s[right]` is seen again within the current window (`last_seen[s[right]] >= left`), jump `left` directly to `last_seen[s[right]] + 1`.",
    interviewInsight: "Jumping `left` directly to `last_seen[char] + 1` avoids step-by-step decrements, ensuring the left pointer only moves forward monotonically.",
    cppSolution: `#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    int lengthOfLongestSubstring(std::string s) {
        std::vector<int> lastIndex(128, -1);
        int left = 0, maxLen = 0;
        for (int right = 0; right < (int)s.length(); ++right) {
            char c = s[right];
            if (lastIndex[c] >= left) {
                left = lastIndex[c] + 1;
            }
            lastIndex[c] = right;
            maxLen = std::max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
    pythonSolution: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        last_index = {}
        left = 0
        max_len = 0
        for right, c in enumerate(s):
            if c in last_index and last_index[c] >= left:
                left = last_index[c] + 1
            last_index[c] = right
            max_len = max(max_len, right - left + 1)
        return max_len`
  },
  {
    id: "Q26",
    questionNumber: 26,
    title: "Longest Repeating Character Replacement with K Flips",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Medium",
    pattern: "Sliding Window + Max Frequency Invariant",
    statement: "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character at most `k` times. Return the length of the longest substring containing the same letter you can get.",
    constraints: [
      "1 <= s.length <= 10^5",
      "s consists of only uppercase English letters.",
      "0 <= k <= s.length"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1) - 26 letters",
    examples: [
      {
        input: 's = "ABAB", k = 2',
        output: "4",
        explanation: 'Replace the two "A"s with two "B"s or vice versa.'
      },
      {
        input: 's = "AABABBA", k = 1',
        output: "4"
      }
    ],
    explanation: "A window `[left, right]` is valid if `(window_length - max_freq_in_window) <= k`. Expand `right`. If invalid, shrink `left` by 1. We only care when `max_freq` increases, so we don't need to decrement `max_freq` when shrinking.",
    interviewInsight: "The non-shrinking window optimization keeps the window size strictly non-decreasing, guaranteeing O(n) total runtime without rescanning frequencies.",
    cppSolution: `#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    int characterReplacement(std::string s, int k) {
        std::vector<int> count(26, 0);
        int maxFreq = 0, left = 0, maxLen = 0;
        for (int right = 0; right < (int)s.length(); ++right) {
            count[s[right] - 'A']++;
            maxFreq = std::max(maxFreq, count[s[right] - 'A']);
            
            while ((right - left + 1) - maxFreq > k) {
                count[s[left] - 'A']--;
                left++;
            }
            maxLen = std::max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};`,
    pythonSolution: `class Solution:
    def characterReplacement(self, s: str, k: int) -> int:
        count = {}
        left = 0
        max_freq = 0
        max_len = 0
        for right, c in enumerate(s):
            count[c] = count.get(c, 0) + 1
            max_freq = max(max_freq, count[c])
            while (right - left + 1) - max_freq > k:
                count[s[left]] -= 1
                left += 1
            max_len = max(max_len, right - left + 1)
        return max_len`
  },
  {
    id: "Q27",
    questionNumber: 27,
    title: "Valid Palindrome with at Most One Character Deletion",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Medium",
    pattern: "Two Pointers Greedy Branching",
    statement: "Given a string `s`, return `true` if the `s` can be palindrome after deleting at most one character from it.",
    constraints: [
      "1 <= s.length <= 10^5",
      "s consists of lowercase English letters."
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: 's = "abca"',
        output: "true",
        explanation: 'You could delete the character "c" or "b".'
      },
      {
        input: 's = "abc"',
        output: "false"
      }
    ],
    explanation: "Compare characters from both ends with `left` and `right`. Upon first mismatch `s[left] != s[right]`, test whether either substring `s[left+1..right]` or `s[left..right-1]` is a strict palindrome.",
    interviewInsight: "Since at most one deletion is permitted, greedy single-level branching checks two candidate segments in O(n) without needing recursive backtracking.",
    cppSolution: `#include <string>

class Solution {
private:
    bool isSubPalindrome(const std::string& s, int l, int r) {
        while (l < r) {
            if (s[l++] != s[r--]) return false;
        }
        return true;
    }
public:
    bool validPalindrome(std::string s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            if (s[l] != s[r]) {
                return isSubPalindrome(s, l + 1, r) || isSubPalindrome(s, l, r - 1);
            }
            l++; r--;
        }
        return true;
    }
};`,
    pythonSolution: `class Solution:
    def validPalindrome(self, s: str) -> bool:
        def is_pal(l: int, r: int) -> bool:
            while l < r:
                if s[l] != s[r]:
                    return False
                l += 1
                r -= 1
            return True
            
        l, r = 0, len(s) - 1
        while l < r:
            if s[l] != s[r]:
                return is_pal(l + 1, r) or is_pal(l, r - 1)
            l += 1
            r -= 1
        return True`
  },
  {
    id: "Q28",
    questionNumber: 28,
    title: "Trapping Rain Water in Constant Auxiliary Space",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Hard",
    pattern: "Two Pointers Height Preservation",
    statement: "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining in O(n) time and O(1) extra space.",
    constraints: [
      "n == height.length",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]",
        output: "6"
      }
    ],
    explanation: "Maintain `left = 0`, `right = n - 1`, `left_max = 0`, `right_max = 0`. If `height[left] < height[right]`, water trapped at `left` is determined solely by `left_max - height[left]` since `right_max >= height[right] > height[left]` guarantees a containment boundary on the right.",
    interviewInsight: "The two-pointer approach eliminates the need for O(n) prefix/suffix max arrays, computing trapped water on-the-fly in a single pass.",
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    int trap(std::vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                if (height[l] >= leftMax) leftMax = height[l];
                else water += leftMax - height[l];
                l++;
            } else {
                if (height[r] >= rightMax) rightMax = height[r];
                else water += rightMax - height[r];
                r--;
            }
        }
        return water;
    }
};`,
    pythonSolution: `class Solution:
    def trap(self, height: list[int]) -> int:
        l, r = 0, len(height) - 1
        left_max = right_max = water = 0
        while l < r:
            if height[l] < height[r]:
                if height[l] >= left_max:
                    left_max = height[l]
                else:
                    water += left_max - height[l]
                l += 1
            else:
                if height[r] >= right_max:
                    right_max = height[r]
                else:
                    water += right_max - height[r]
                r -= 1
        return water`
  },
  {
    id: "Q29",
    questionNumber: 29,
    title: "Minimum Size Subarray Sum >= Target with Positive Integers",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Medium",
    pattern: "Variable-size Sliding Window Shrink",
    statement: "Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a subarray whose sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.",
    constraints: [
      "1 <= target <= 10^9",
      "1 <= nums.length <= 10^5",
      "1 <= nums[i] <= 10^4"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "target = 7, nums = [2,3,1,2,4,3]",
        output: "2",
        explanation: "The subarray [4,3] has the minimal length under the problem constraints."
      }
    ],
    explanation: "Expand `right` and add `nums[right]` to `sum`. While `sum >= target`, record candidate length `right - left + 1`, subtract `nums[left]`, and increment `left`.",
    interviewInsight: "Since all elements are strictly positive, prefix sums are strictly increasing, guaranteeing the sliding window expansion and contraction invariants.",
    cppSolution: `#include <vector>
#include <algorithm>
#include <climits>

class Solution {
public:
    int minSubArrayLen(int target, std::vector<int>& nums) {
        int left = 0, currentSum = 0, minLen = INT_MAX;
        for (int right = 0; right < (int)nums.size(); ++right) {
            currentSum += nums[right];
            while (currentSum >= target) {
                minLen = std::min(minLen, right - left + 1);
                currentSum -= nums[left++];
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};`,
    pythonSolution: `class Solution:
    def minSubArrayLen(self, target: int, nums: list[int]) -> int:
        left = 0
        curr_sum = 0
        min_len = float('inf')
        for right, val in enumerate(nums):
            curr_sum += val
            while curr_sum >= target:
                min_len = min(min_len, right - left + 1)
                curr_sum -= nums[left]
                left += 1
        return 0 if min_len == float('inf') else min_len`
  },
  {
    id: "Q30",
    questionNumber: 30,
    title: "Count Subarrays with Exactly K Distinct Integers",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Hard",
    pattern: "Exact K to AtMost(K) - AtMost(K-1) Reduction",
    statement: "Given an integer array `nums` and an integer `k`, return the number of good subarrays of `nums`. A good array is an array where the number of different integers in that array is exactly `k`.",
    constraints: [
      "1 <= nums.length <= 2 * 10^4",
      "1 <= nums[i], k <= nums.length"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(k)",
    examples: [
      {
        input: "nums = [1,2,1,2,3], k = 2",
        output: "7",
        explanation: "Subarrays: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]"
      }
    ],
    explanation: "Directly counting 'exactly K' distinct elements is hard because windows cannot shrink monotonically. Use the reduction: `exactly(k) = atMost(k) - atMost(k - 1)`. `atMost(k)` is computed in standard linear sliding window.",
    interviewInsight: "The `atMost(k) - atMost(k - 1)` algebraic decomposition is a universal Tier-1 template for exact-constraint substring and subarray counting problems.",
    cppSolution: `#include <vector>
#include <unordered_map>

class Solution {
private:
    int atMostK(const std::vector<int>& nums, int k) {
        std::unordered_map<int, int> count;
        int left = 0, ans = 0;
        for (int right = 0; right < (int)nums.size(); ++right) {
            if (count[nums[right]]++ == 0) k--;
            while (k < 0) {
                if (--count[nums[left]] == 0) k++;
                left++;
            }
            ans += right - left + 1;
        }
        return ans;
    }
public:
    int subarraysWithKDistinct(std::vector<int>& nums, int k) {
        return atMostK(nums, k) - atMostK(nums, k - 1);
    }
};`,
    pythonSolution: `class Solution:
    def subarraysWithKDistinct(self, nums: list[int], k: int) -> int:
        def at_most(k_limit: int) -> int:
            count = {}
            left = 0
            ans = 0
            for right, val in enumerate(nums):
                count[val] = count.get(val, 0) + 1
                while len(count) > k_limit:
                    count[nums[left]] -= 1
                    if count[nums[left]] == 0:
                        del count[nums[left]]
                    left += 1
                ans += right - left + 1
            return ans
            
        return at_most(k) - at_most(k - 1)`
  },
  {
    id: "Q31",
    questionNumber: 31,
    title: "Minimum Window Substring Covering Target Multiset",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Hard",
    pattern: "Sliding Window + Character Debt Counter",
    statement: "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `\"\"`.",
    constraints: [
      "m == s.length, n == t.length",
      "1 <= m, n <= 10^5",
      "s and t consist of uppercase and lowercase English letters."
    ],
    expectedTimeComplexity: "O(m + n)",
    expectedSpaceComplexity: "O(1) - fixed 128 ASCII",
    examples: [
      {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"'
      },
      {
        input: 's = "a", t = "aa"',
        output: '""'
      }
    ],
    explanation: "Build frequency table for `t`. Maintain `required = t.length()`. Expand `right`; if `tCount[s[right]] > 0`, decrement `required`. When `required == 0`, try shrinking `left` while maintaining validity, updating minimum window length.",
    interviewInsight: "Tracking a scalar debt count `required` makes checking window validity an O(1) comparison (`required == 0`) rather than scanning a hash table.",
    cppSolution: `#include <string>
#include <vector>
#include <climits>

class Solution {
public:
    std::string minWindow(std::string s, std::string t) {
        std::vector<int> targetMap(128, 0);
        for (char c : t) targetMap[c]++;
        
        int left = 0, minLen = INT_MAX, minStart = 0;
        int required = t.length();
        
        for (int right = 0; right < (int)s.length(); ++right) {
            if (targetMap[s[right]] > 0) required--;
            targetMap[s[right]]--;
            
            while (required == 0) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minStart = left;
                }
                targetMap[s[left]]++;
                if (targetMap[s[left]] > 0) required++;
                left++;
            }
        }
        return minLen == INT_MAX ? "" : s.substr(minStart, minLen);
    }
};`,
    pythonSolution: `class Solution:
    def minWindow(self, s: str, t: str) -> str:
        if not t or not s:
            return ""
        from collections import Counter
        target_map = Counter(t)
        required = len(t)
        left = 0
        min_len = float('inf')
        min_start = 0
        
        for right, c in enumerate(s):
            if target_map[c] > 0:
                required -= 1
            target_map[c] -= 1
            
            while required == 0:
                if right - left + 1 < min_len:
                    min_len = right - left + 1
                    min_start = left
                target_map[s[left]] += 1
                if target_map[s[left]] > 0:
                    required += 1
                left += 1
                
        return "" if min_len == float('inf') else s[min_start:min_start + min_len]`
  },
  {
    id: "Q32",
    questionNumber: 32,
    title: "Permutation Inclusion Check via Frequency Window Invariant",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Medium",
    pattern: "Fixed Sliding Window Matching",
    statement: "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.",
    constraints: [
      "1 <= s1.length, s2.length <= 10^4",
      "s1 and s2 consist of lowercase English letters."
    ],
    expectedTimeComplexity: "O(n) where n = s2.length",
    expectedSpaceComplexity: "O(1) - 26 letters",
    examples: [
      {
        input: 's1 = "ab", s2 = "eidbaooo"',
        output: "true",
        explanation: 's2 contains one permutation of s1 ("ba").'
      }
    ],
    explanation: "Maintain a fixed window of size `len(s1)` over `s2`. Maintain a count of matching frequencies among the 26 lowercase characters. Update the match count as the window slides.",
    interviewInsight: "By keeping track of `matches` (count of letters whose frequency in `s2`'s window equals that in `s1`), we can detect full matches in O(1) time per window slide.",
    cppSolution: `#include <string>
#include <vector>

class Solution {
public:
    bool checkInclusion(std::string s1, std::string s2) {
        if (s1.length() > s2.length()) return false;
        std::vector<int> count1(26, 0), count2(26, 0);
        for (char c : s1) count1[c - 'a']++;
        int k = s1.length();
        for (int i = 0; i < (int)s2.length(); ++i) {
            count2[s2[i] - 'a']++;
            if (i >= k) count2[s2[i - k] - 'a']--;
            if (i >= k - 1 && count1 == count2) return true;
        }
        return false;
    }
};`,
    pythonSolution: `class Solution:
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s1) > len(s2):
            return False
        c1 = [0] * 26
        c2 = [0] * 26
        for c in s1:
            c1[ord(c) - ord('a')] += 1
        k = len(s1)
        for i, c in enumerate(s2):
            c2[ord(c) - ord('a')] += 1
            if i >= k:
                c2[ord(s2[i - k]) - ord('a')] -= 1
            if i >= k - 1 and c1 == c2:
                return True
        return False`
  },
  {
    id: "Q33",
    questionNumber: 33,
    title: "4Sum Quadruplets with Target Boundary Pruning",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Hard",
    pattern: "Multi-Pointer + Early Pruning",
    statement: "Given an array `nums` of `n` integers, return an array of all the unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that `nums[a] + nums[b] + nums[c] + nums[d] == target`. Prevent integer overflow and eliminate duplicate tuples.",
    constraints: [
      "1 <= nums.length <= 200",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9"
    ],
    expectedTimeComplexity: "O(n^3)",
    expectedSpaceComplexity: "O(1) auxiliary",
    examples: [
      {
        input: "nums = [1,0,-1,0,-2,2], target = 0",
        output: "[[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]"
      }
    ],
    explanation: "Sort `nums`. Fix `i` and `j`, then run two pointers for `left` and `right`. Apply mathematical branch pruning: if `nums[i] + nums[i+1] + nums[i+2] + nums[i+3] > target`, break early; if `nums[i] + nums[n-1] + nums[n-2] + nums[n-3] < target`, continue.",
    interviewInsight: "Extreme value pruning (checking min and max possible 4-sums for the current index) cuts 80%+ of iterations on large inputs.",
    cppSolution: `#include <vector>
#include <algorithm>

class Solution {
public:
    std::vector<std::vector<int>> fourSum(std::vector<int>& nums, int target) {
        std::sort(nums.begin(), nums.end());
        std::vector<std::vector<int>> res;
        int n = nums.size();
        for (int i = 0; i < n - 3; ++i) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            long long minSum = (long long)nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3];
            if (minSum > target) break;
            long long maxSum = (long long)nums[i] + nums[n - 1] + nums[n - 2] + nums[n - 3];
            if (maxSum < target) continue;
            
            for (int j = i + 1; j < n - 2; ++j) {
                if (j > i + 1 && nums[j] == nums[j - 1]) continue;
                int l = j + 1, r = n - 1;
                while (l < r) {
                    long long sum = (long long)nums[i] + nums[j] + nums[l] + nums[r];
                    if (sum == target) {
                        res.push_back({nums[i], nums[j], nums[l], nums[r]});
                        while (l < r && nums[l] == nums[l + 1]) l++;
                        while (l < r && nums[r] == nums[r - 1]) r--;
                        l++; r--;
                    } else if (sum < target) {
                        l++;
                    } else {
                        r--;
                    }
                }
            }
        }
        return res;
    }
};`,
    pythonSolution: `class Solution:
    def fourSum(self, nums: list[int], target: int) -> list[list[int]]:
        nums.sort()
        n = len(nums)
        res = []
        for i in range(n - 3):
            if i > 0 and nums[i] == nums[i - 1]:
                continue
            if nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3] > target:
                break
            if nums[i] + nums[n - 1] + nums[n - 2] + nums[n - 3] < target:
                continue
            for j in range(i + 1, n - 2):
                if j > i + 1 and nums[j] == nums[j - 1]:
                    continue
                l, r = j + 1, n - 1
                while l < r:
                    s = nums[i] + nums[j] + nums[l] + nums[r]
                    if s == target:
                        res.append([nums[i], nums[j], nums[l], nums[r]])
                        while l < r and nums[l] == nums[l + 1]:
                            l += 1
                        while l < r and nums[r] == nums[r - 1]:
                            r -= 1
                        l += 1
                        r -= 1
                    elif s < target:
                        l += 1
                    else:
                        r -= 1
        return res`
  },
  {
    id: "Q34",
    questionNumber: 34,
    title: "Longest Palindromic Substring via Center Expansion",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Medium",
    pattern: "Outward Two-Pointer Center Expansion",
    statement: "Given a string `s`, return the longest palindromic substring in `s`.",
    constraints: [
      "1 <= s.length <= 1000",
      "s consist of only digits and English letters."
    ],
    expectedTimeComplexity: "O(n^2)",
    expectedSpaceComplexity: "O(1) auxiliary",
    examples: [
      {
        input: 's = "babad"',
        output: '"bab"',
        explanation: '"aba" is also a valid answer.'
      },
      {
        input: 's = "cbbd"',
        output: '"bb"'
      }
    ],
    explanation: "A palindrome centers either on a single character (odd length) or between two characters (even length). For each of the `2n - 1` possible centers, expand two pointers outward as long as characters match.",
    interviewInsight: "Expanding from centers is simpler and faster in practice than 2D DP because it uses O(1) space and avoids cache misses.",
    cppSolution: `#include <string>
#include <algorithm>

class Solution {
private:
    std::pair<int, int> expand(const std::string& s, int l, int r) {
        while (l >= 0 && r < (int)s.length() && s[l] == s[r]) {
            l--; r++;
        }
        return {l + 1, r - l - 1};
    }
public:
    std::string longestPalindrome(std::string s) {
        int start = 0, maxLen = 0;
        for (int i = 0; i < (int)s.length(); ++i) {
            auto [s1, len1] = expand(s, i, i);
            auto [s2, len2] = expand(s, i, i + 1);
            if (len1 > maxLen) { start = s1; maxLen = len1; }
            if (len2 > maxLen) { start = s2; maxLen = len2; }
        }
        return s.substr(start, maxLen);
    }
};`,
    pythonSolution: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        start = 0
        max_len = 0
        
        def expand(l: int, r: int):
            nonlocal start, max_len
            while l >= 0 and r < len(s) and s[l] == s[r]:
                l -= 1
                r += 1
            cur_len = r - l - 1
            if cur_len > max_len:
                max_len = cur_len
                start = l + 1
                
        for i in range(len(s)):
            expand(i, i)
            expand(i, i + 1)
            
        return s[start:start + max_len]`
  },
  {
    id: "Q35",
    questionNumber: 35,
    title: "Sliding Window Maximum with Monotonic Queue",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Hard",
    pattern: "Monotonic Decreasing Deque",
    statement: "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. You can only see the `k` numbers in the window. Return the max sliding window.",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "1 <= k <= nums.length"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(k)",
    examples: [
      {
        input: "nums = [1,3,-1,-3,5,3,6,7], k = 3",
        output: "[3,3,5,5,6,7]"
      }
    ],
    explanation: "Store array indices in a deque maintained in strictly descending order of their values. Before adding index `i`, pop all indices from the back whose values `<= nums[i]`. If the front index is older than `i - k + 1`, pop it from the front.",
    interviewInsight: "Every element is pushed and popped at most once, making total operations across all window movements strictly 2n = O(n).",
    cppSolution: `#include <vector>
#include <deque>

class Solution {
public:
    std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
        std::deque<int> dq;
        std::vector<int> res;
        for (int i = 0; i < (int)nums.size(); ++i) {
            while (!dq.empty() && nums[i] >= nums[dq.back()]) {
                dq.pop_back();
            }
            dq.push_back(i);
            if (dq.front() <= i - k) {
                dq.pop_front();
            }
            if (i >= k - 1) {
                res.push_back(nums[dq.front()]);
            }
        }
        return res;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        dq = deque()
        res = []
        for i, val in enumerate(nums):
            while dq and val >= nums[dq[-1]]:
                dq.pop()
            dq.append(i)
            if dq[0] <= i - k:
                dq.popleft()
            if i >= k - 1:
                res.append(nums[dq[0]])
        return res`
  },
  {
    id: "Q36",
    questionNumber: 36,
    title: "Longest Substring with At Least K Repeating Characters",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Hard",
    pattern: "Constrained Unique Count Sliding Window",
    statement: "Given a string `s` and an integer `k`, return the length of the longest substring of `s` such that the frequency of each character in this substring is greater than or equal to `k`.",
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of only lowercase English letters.",
      "1 <= k <= 10^5"
    ],
    expectedTimeComplexity: "O(26 * n) = O(n)",
    expectedSpaceComplexity: "O(1) - 26 letters",
    examples: [
      {
        input: 's = "aaabb", k = 3',
        output: "3",
        explanation: 'The longest substring is "aaa", as "a" is repeated 3 times.'
      },
      {
        input: 's = "ababbc", k = 2',
        output: "5",
        explanation: 'The longest substring is "ababb", as "a" is repeated 2 times and "b" is repeated 3 times.'
      }
    ],
    explanation: "Iterate over `target_unique_chars` from 1 to 26. For a fixed number of unique characters, maintain a sliding window. Expand `right`. If `unique_chars > target`, increment `left`. Check if all unique chars in window have frequency >= `k`.",
    interviewInsight: "Fixing the number of unique characters in the window restores monotonicity, transforming an otherwise intractable divide-and-conquer problem into a clean linear sliding window.",
    cppSolution: `#include <string>
#include <vector>
#include <algorithm>

class Solution {
public:
    int longestSubstring(std::string s, int k) {
        int maxLen = 0;
        for (int targetUnique = 1; targetUnique <= 26; ++targetUnique) {
            std::vector<int> count(26, 0);
            int left = 0, right = 0;
            int uniqueCount = 0, countAtLeastK = 0;
            
            while (right < (int)s.length()) {
                if (uniqueCount <= targetUnique) {
                    int idx = s[right] - 'a';
                    if (count[idx] == 0) uniqueCount++;
                    count[idx]++;
                    if (count[idx] == k) countAtLeastK++;
                    right++;
                } else {
                    int idx = s[left] - 'a';
                    if (count[idx] == k) countAtLeastK--;
                    count[idx]--;
                    if (count[idx] == 0) uniqueCount--;
                    left++;
                }
                if (uniqueCount == targetUnique && uniqueCount == countAtLeastK) {
                    maxLen = std::max(maxLen, right - left);
                }
            }
        }
        return maxLen;
    }
};`,
    pythonSolution: `class Solution:
    def longestSubstring(self, s: str, k: int) -> int:
        max_len = 0
        for target_unique in range(1, 27):
            count = [0] * 26
            left = right = 0
            unique_count = count_at_least_k = 0
            while right < len(s):
                if unique_count <= target_unique:
                    idx = ord(s[right]) - ord('a')
                    if count[idx] == 0:
                        unique_count += 1
                    count[idx] += 1
                    if count[idx] == k:
                        count_at_least_k += 1
                    right += 1
                else:
                    idx = ord(s[left]) - ord('a')
                    if count[idx] == k:
                        count_at_least_k -= 1
                    count[idx] -= 1
                    if count[idx] == 0:
                        unique_count -= 1
                    left += 1
                if unique_count == target_unique == count_at_least_k:
                    max_len = max(max_len, right - left)
        return max_len`
  },
  {
    id: "Q37",
    questionNumber: 37,
    title: "Minimum Window Subsequence with Forward-Backward Two Pointers",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Hard",
    pattern: "Two Pointers Forward Match & Reverse Optimization",
    statement: "Given strings `s1` and `s2`, return the minimum contiguous substring of `s1` such that `s2` is a subsequence of that substring. If there are multiple windows of the same minimum length, return the one with the smallest starting index.",
    constraints: [
      "1 <= s1.length <= 2 * 10^4",
      "1 <= s2.length <= 100",
      "s1 and s2 consist of lowercase English letters."
    ],
    expectedTimeComplexity: "O(n * m)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: 's1 = "abcdebdde", s2 = "bde"',
        output: '"bcde"',
        explanation: '"bcde" is the substring and "bde" is a subsequence of "bcde". "bdde" is also a candidate, but "bcde" occurs earlier.'
      }
    ],
    explanation: "Advance forward pointer in `s1` until all characters of `s2` are matched in order. Then, step backward through `s1` from the right match endpoint to find the latest valid starting index for `s2[0]`. Record window, and resume search.",
    interviewInsight: "The backward traversal compresses the window to its minimal valid left boundary in O(m) time without expensive nested scans.",
    cppSolution: `#include <string>
#include <climits>

class Solution {
public:
    std::string minWindow(std::string s1, std::string s2) {
        int n = s1.length(), m = s2.length();
        int minLen = INT_MAX, minStart = -1;
        int i = 0, j = 0;
        
        while (i < n) {
            if (s1[i] == s2[j]) {
                j++;
                if (j == m) {
                    int end = i + 1;
                    j--;
                    while (j >= 0) {
                        if (s1[i] == s2[j]) j--;
                        i--;
                    }
                    i++; j++;
                    if (end - i < minLen) {
                        minLen = end - i;
                        minStart = i;
                    }
                }
            }
            i++;
        }
        return minStart == -1 ? "" : s1.substr(minStart, minLen);
    }
};`,
    pythonSolution: `class Solution:
    def minWindow(self, s1: str, s2: str) -> str:
        n, m = len(s1), len(s2)
        min_len = float('inf')
        min_start = -1
        i = j = 0
        
        while i < n:
            if s1[i] == s2[j]:
                j += 1
                if j == m:
                    end = i + 1
                    j -= 1
                    while j >= 0:
                        if s1[i] == s2[j]:
                            j -= 1
                        i -= 1
                    i += 1
                    j += 1
                    if end - i < min_len:
                        min_len = end - i
                        min_start = i
            i += 1
        return "" if min_start == -1 else s1[min_start:min_start + min_len]`
  },
  {
    id: "Q38",
    questionNumber: 38,
    title: "Largest Rectangle in Histogram with Monotonic Stack Boundaries",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Extreme",
    pattern: "Monotonic Increasing Stack + Linear Sweep",
    statement: "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram in strict O(n) time.",
    constraints: [
      "1 <= heights.length <= 10^5",
      "0 <= heights[i] <= 10^4"
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(n)",
    examples: [
      {
        input: "heights = [2,1,5,6,2,3]",
        output: "10",
        explanation: "The largest rectangle is formed by heights [5,6] with height 5 and width 2 -> area = 10."
      }
    ],
    explanation: "For each bar `i`, find the nearest smaller bar to the left and right. Maintain a monotonic increasing stack of bar indices. When a shorter bar is encountered, pop the top index `h = heights[stack.top()]`. The width is `i - stack.top() - 1`.",
    interviewInsight: "Appending a sentinel `0` at the end of the heights array forces all remaining bars to be popped and evaluated cleanly without extra post-loop logic.",
    cppSolution: `#include <vector>
#include <stack>
#include <algorithm>

class Solution {
public:
    int largestRectangleArea(std::vector<int>& heights) {
        heights.push_back(0);
        std::stack<int> st;
        int maxArea = 0, n = heights.size();
        for (int i = 0; i < n; ++i) {
            while (!st.empty() && heights[i] < heights[st.top()]) {
                int h = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : (i - st.top() - 1);
                maxArea = std::max(maxArea, h * width);
            }
            st.push(i);
        }
        return maxArea;
    }
};`,
    pythonSolution: `class Solution:
    def largestRectangleArea(self, heights: list[int]) -> int:
        heights.append(0)
        stack = []
        max_area = 0
        for i, h in enumerate(heights):
            while stack and h < heights[stack[-1]]:
                cur_h = heights[stack.pop()]
                w = i if not stack else (i - stack[-1] - 1)
                max_area = max(max_area, cur_h * w)
            stack.append(i)
        return max_area`
  },
  {
    id: "Q39",
    questionNumber: 39,
    title: "Minimum Window Substring with Repeat Constraints and Wildcards",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Extreme",
    pattern: "Dynamic Sliding Window + Stateful Multi-Constraint Ledger",
    statement: "Given string `s` and pattern `p` containing lowercase letters and wildcards `'*'` (where `'*'` matches any single character), find the minimum length contiguous substring in `s` that satisfies all pattern character counts while minimizing wildcard substitutions.",
    constraints: [
      "1 <= s.length <= 10^5",
      "1 <= p.length <= 10^4",
      "s contains lowercase English letters; p contains lowercase English letters and '*'."
    ],
    expectedTimeComplexity: "O(n)",
    expectedSpaceComplexity: "O(1) - alphabet bound",
    examples: [
      {
        input: 's = "axbxcxdye", p = "a*c*e"',
        output: '"axbxcxdye"',
        explanation: 'The entire string covers "a", "c", "e" and two arbitrary interstitial wildcards.'
      }
    ],
    explanation: "Count fixed character constraints and total wildcard count. Use a two-pointer sliding window with an available surplus character tally. Match fixed characters first; any leftover window positions satisfy wildcard requirements.",
    interviewInsight: "Partitioning requirements into exact-letter quotas and a generic quota counter maintains linear O(1) state transitions during window expansion and contraction.",
    cppSolution: `#include <string>
#include <vector>
#include <climits>

class Solution {
public:
    std::string minWindowWithWildcard(std::string s, std::string p) {
        std::vector<int> target(26, 0);
        int wildcards = 0, fixedCount = 0;
        for (char c : p) {
            if (c == '*') wildcards++;
            else { target[c - 'a']++; fixedCount++; }
        }
        int totalNeeded = fixedCount + wildcards;
        std::vector<int> window(26, 0);
        int matchedFixed = 0, left = 0;
        int minLen = INT_MAX, minStart = -1;
        
        for (int right = 0; right < (int)s.length(); ++right) {
            int rIdx = s[right] - 'a';
            window[rIdx]++;
            if (window[rIdx] <= target[rIdx]) matchedFixed++;
            
            while (matchedFixed == fixedCount && (right - left + 1) >= totalNeeded) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minStart = left;
                }
                int lIdx = s[left] - 'a';
                if (window[lIdx] <= target[lIdx]) matchedFixed--;
                window[lIdx]--;
                left++;
            }
        }
        return minStart == -1 ? "" : s.substr(minStart, minLen);
    }
};`,
    pythonSolution: `class Solution:
    def minWindowWithWildcard(self, s: str, p: str) -> str:
        target = [0] * 26
        wildcards = 0
        fixed_count = 0
        for c in p:
            if c == '*':
                wildcards += 1
            else:
                target[ord(c) - ord('a')] += 1
                fixed_count += 1
        total_needed = fixed_count + wildcards
        window = [0] * 26
        matched_fixed = 0
        left = 0
        min_len = float('inf')
        min_start = -1
        
        for right, c in enumerate(s):
            r_idx = ord(c) - ord('a')
            window[r_idx] += 1
            if window[r_idx] <= target[r_idx]:
                matched_fixed += 1
            while matched_fixed == fixed_count and (right - left + 1) >= total_needed:
                if right - left + 1 < min_len:
                    min_len = right - left + 1
                    min_start = left
                l_idx = ord(s[left]) - ord('a')
                if window[l_idx] <= target[l_idx]:
                    matched_fixed -= 1
                window[l_idx] -= 1
                left += 1
                
        return "" if min_start == -1 else s[min_start:min_start + min_len]`
  },
  {
    id: "Q40",
    questionNumber: 40,
    title: "Trapping Rain Water II (3D Grid Elevation Frontier)",
    topic: "Two Pointers & Sliding Window",
    batch: 2,
    difficulty: "Extreme",
    pattern: "Boundary Min-Heap BFS Frontier",
    statement: "Given an `m x n` integer matrix `heightMap` representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.",
    constraints: [
      "m == heightMap.length, n == heightMap[i].length",
      "1 <= m, n <= 200",
      "0 <= heightMap[i][j] <= 2 * 10^4"
    ],
    expectedTimeComplexity: "O(m * n * log(m + n))",
    expectedSpaceComplexity: "O(m * n)",
    examples: [
      {
        input: "heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]",
        output: "4",
        explanation: "Cells (1,1), (1,2), (1,4) and (2,3) hold water totaling 4 units."
      }
    ],
    explanation: "The 2D two-pointer approach generalizes to 3D by pushing all outer perimeter boundary cells into a min-priority queue. Pop the lowest boundary cell `(r, c)` with height `h`. For each unvisited 4-directional neighbor `(nr, nc)`, trapped water is `max(0, h - heightMap[nr][nc])`. Push the neighbor with effective height `max(h, heightMap[nr][nc])`.",
    interviewInsight: "Water always leaks from the lowest point on the boundary. A min-heap acts as a dynamic contracting boundary, ensuring cells are visited in non-decreasing order of spill height.",
    cppSolution: `#include <vector>
#include <queue>
#include <algorithm>

struct Cell {
    int r, c, height;
    bool operator>(const Cell& other) const {
        return height > other.height;
    }
};

class Solution {
public:
    int trapRainWater(std::vector<std::vector<int>>& heightMap) {
        int m = heightMap.size(), n = heightMap[0].size();
        if (m <= 2 || n <= 2) return 0;
        
        std::priority_queue<Cell, std::vector<Cell>, std::greater<Cell>> pq;
        std::vector<std::vector<bool>> visited(m, std::vector<bool>(n, false));
        
        for (int r = 0; r < m; ++r) {
            pq.push({r, 0, heightMap[r][0]});
            pq.push({r, n - 1, heightMap[r][n - 1]});
            visited[r][0] = visited[r][n - 1] = true;
        }
        for (int c = 1; c < n - 1; ++c) {
            pq.push({0, c, heightMap[0][c]});
            pq.push({m - 1, c, heightMap[m - 1][c]});
            visited[0][c] = visited[m - 1][c] = true;
        }
        
        int water = 0;
        int dr[4] = {-1, 1, 0, 0};
        int dc[4] = {0, 0, -1, 1};
        
        while (!pq.empty()) {
            auto [r, c, h] = pq.top();
            pq.pop();
            
            for (int k = 0; k < 4; ++k) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    water += std::max(0, h - heightMap[nr][nc]);
                    pq.push({nr, nc, std::max(h, heightMap[nr][nc])});
                }
            }
        }
        return water;
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
            
        visited = [[False] * n for _ in range(m)]
        heap = []
        
        for r in range(m):
            heapq.heappush(heap, (heightMap[r][0], r, 0))
            heapq.heappush(heap, (heightMap[r][n - 1], r, n - 1))
            visited[r][0] = visited[r][n - 1] = True
            
        for c in range(1, n - 1):
            heapq.heappush(heap, (heightMap[0][c], 0, c))
            heapq.heappush(heap, (heightMap[m - 1][c], m - 1, c))
            visited[0][c] = visited[m - 1][c] = True
            
        water = 0
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
        
        while heap:
            h, r, c = heapq.heappop(heap)
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
                    visited[nr][nc] = True
                    water += max(0, h - heightMap[nr][nc])
                    heapq.heappush(heap, (max(h, heightMap[nr][nc]), nr, nc))
                    
        return water`
  }
];
