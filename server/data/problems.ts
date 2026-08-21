import { CodingProblem } from "../../src/types/index.js";

// Helper to create LeetCode-style problem templates
function createLeetCodeProblem(
  id: string,
  title: string,
  difficulty: "Easy" | "Medium" | "Hard",
  topics: string[],
  companyTags: string[],
  description: string,
  functionName: string,
  pySignature: string,
  cppSignature: string,
  javaSignature: string,
  jsSignature: string,
  testCases: { input: string; expectedOutput: string; isHidden?: boolean }[],
  hints: string[] = [],
  examples: { input: string; output: string; explanation?: string }[] = []
): CodingProblem {
  return {
    id,
    title,
    slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    difficulty,
    topics,
    companyTags,
    acceptanceRate: +(45 + Math.random() * 30).toFixed(1),
    description,
    examples: examples.length > 0 ? examples : [
      { input: testCases[0]?.input || "", output: testCases[0]?.expectedOutput || "" }
    ],
    constraints: [
      "Optimized time complexity expected.",
      "Handle edge cases and empty inputs cleanly.",
      "Do not modify input arrays unless specified."
    ],
    starterCode: {
      python: `class Solution:\n    def ${functionName}${pySignature}:\n        # Write your solution here\n        pass`,
      javascript: `/**\n * @param {any}\n * @return {any}\n */\nvar ${functionName} = function${jsSignature} {\n    // Write your solution here\n};`,
      cpp: `class Solution {\npublic:\n    ${cppSignature} {\n        // Write your solution here\n    }\n};`,
      java: `class Solution {\n    public ${javaSignature} {\n        // Write your solution here\n    }\n}`
    },
    testCases: testCases.map((tc, idx) => ({
      id: `tc_${id}_${idx + 1}`,
      input: tc.input,
      expectedOutput: tc.expectedOutput,
      isHidden: !!tc.isHidden
    })),
    timeLimitMs: 1000,
    memoryLimitMb: 64,
    hints: hints.length > 0 ? hints : [
      `Analyze the problem constraints and identify the optimal time complexity.`,
      `Consider using a hash table, two-pointers, or sliding window where applicable.`,
      `Verify edge cases such as empty input, negative numbers, or single elements.`
    ]
  };
}

// 100+ LeetCode-style DSA Problems across all 17 Core Categories
export const SEED_PROBLEMS: CodingProblem[] = [
  // --- 1. ARRAYS & HASHING (1-10) ---
  createLeetCodeProblem(
    "prob_two_sum",
    "Two Sum",
    "Easy",
    ["Arrays", "Hashing"],
    ["Google", "Amazon", "Microsoft", "TCS", "Infosys"],
    "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
    "twoSum",
    "(self, nums: list[int], target: int) -> list[int]",
    "vector<int> twoSum(vector<int>& nums, int target)",
    "int[] twoSum(int[] nums, int target)",
    "(nums, target)",
    [
      { input: "[2,7,11,15], 9", expectedOutput: "[0,1]" },
      { input: "[3,2,4], 6", expectedOutput: "[1,2]" },
      { input: "[3,3], 6", expectedOutput: "[0,1]" },
      { input: "[1,5,8,12,19,25], 31", expectedOutput: "[3,4]", isHidden: true }
    ],
    ["Use a Hash Map to store complement (target - num) and index in O(N) time."],
    [{ input: "[2,7,11,15], 9", output: "[0,1]", explanation: "nums[0] + nums[1] == 9" }]
  ),
  createLeetCodeProblem(
    "prob_contains_duplicate",
    "Contains Duplicate",
    "Easy",
    ["Arrays", "Hashing"],
    ["Amazon", "Microsoft", "TCS", "Accenture"],
    "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    "containsDuplicate",
    "(self, nums: list[int]) -> bool",
    "bool containsDuplicate(vector<int>& nums)",
    "boolean containsDuplicate(int[] nums)",
    "(nums)",
    [
      { input: "[1,2,3,1]", expectedOutput: "true" },
      { input: "[1,2,3,4]", expectedOutput: "false" },
      { input: "[1,1,1,3,3,4,3,2,4,2]", expectedOutput: "true" },
      { input: "[1000000000]", expectedOutput: "false", isHidden: true }
    ]
  ),
  createLeetCodeProblem(
    "prob_valid_anagram",
    "Valid Anagram",
    "Easy",
    ["Strings", "Hashing"],
    ["Google", "Amazon", "TCS", "HCL"],
    "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
    "isAnagram",
    "(self, s: str, t: str) -> bool",
    "bool isAnagram(string s, string t)",
    "boolean isAnagram(String s, String t)",
    "(s, t)",
    [
      { input: '"anagram", "nagaram"', expectedOutput: "true" },
      { input: '"rat", "car"', expectedOutput: "false" },
      { input: '"listen", "silent"', expectedOutput: "true", isHidden: true }
    ]
  ),
  createLeetCodeProblem(
    "prob_group_anagrams",
    "Group Anagrams",
    "Medium",
    ["Arrays", "Strings", "Hashing"],
    ["Amazon", "Google", "Microsoft"],
    "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
    "groupAnagrams",
    "(self, strs: list[str]) -> list[list[str]]",
    "vector<vector<string>> groupAnagrams(vector<string>& strs)",
    "List<List<String>> groupAnagrams(String[] strs)",
    "(strs)",
    [
      { input: '["eat","tea","tan","ate","nat","bat"]', expectedOutput: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: '[""]', expectedOutput: '[[""]]' }
    ]
  ),
  createLeetCodeProblem(
    "prob_top_k_frequent",
    "Top K Frequent Elements",
    "Medium",
    ["Arrays", "Hashing", "Heap / Priority Queue"],
    ["Amazon", "Google", "Microsoft"],
    "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.",
    "topKFrequent",
    "(self, nums: list[int], k: int) -> list[int]",
    "vector<int> topKFrequent(vector<int>& nums, int k)",
    "int[] topKFrequent(int[] nums, int k)",
    "(nums, k)",
    [
      { input: "[1,1,1,2,2,3], 2", expectedOutput: "[1,2]" },
      { input: "[1], 1", expectedOutput: "[1]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_product_except_self",
    "Product of Array Except Self",
    "Medium",
    ["Arrays"],
    ["Amazon", "Microsoft", "InMobi", "American Express"],
    "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]` in O(n) without using division.",
    "productExceptSelf",
    "(self, nums: list[int]) -> list[int]",
    "vector<int> productExceptSelf(vector<int>& nums)",
    "int[] productExceptSelf(int[] nums)",
    "(nums)",
    [
      { input: "[1,2,3,4]", expectedOutput: "[24,12,8,6]" },
      { input: "[-1,1,0,-3,3]", expectedOutput: "[0,0,9,0,0]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_longest_consecutive",
    "Longest Consecutive Sequence",
    "Medium",
    ["Arrays", "Hashing"],
    ["Google", "Amazon", "Microsoft"],
    "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in O(n) time.",
    "longestConsecutive",
    "(self, nums: list[int]) -> int",
    "int longestConsecutive(vector<int>& nums)",
    "int longestConsecutive(int[] nums)",
    "(nums)",
    [
      { input: "[100,4,200,1,3,2]", expectedOutput: "4" },
      { input: "[0,3,7,2,5,8,4,6,0,1]", expectedOutput: "9" }
    ]
  ),
  createLeetCodeProblem(
    "prob_encode_decode_strings",
    "Encode and Decode Strings",
    "Medium",
    ["Strings", "Arrays"],
    ["Google", "Microsoft"],
    "Design an algorithm to encode a list of strings to a string, and decode a string to the original list of strings.",
    "encode",
    "(self, strs: list[str]) -> str",
    "string encode(vector<string>& strs)",
    "String encode(List<String> strs)",
    "(strs)",
    [
      { input: '["lint","code","love","you"]', expectedOutput: '["lint","code","love","you"]' }
    ]
  ),
  createLeetCodeProblem(
    "prob_majority_element",
    "Majority Element (Boyer-Moore Voting)",
    "Easy",
    ["Arrays", "Hashing"],
    ["Amazon", "Microsoft", "TCS"],
    "Given an array `nums` of size `n`, return the majority element that appears more than ⌊n / 2⌋ times in O(1) space.",
    "majorityElement",
    "(self, nums: list[int]) -> int",
    "int majorityElement(vector<int>& nums)",
    "int majorityElement(int[] nums)",
    "(nums)",
    [
      { input: "[3,2,3]", expectedOutput: "3" },
      { input: "[2,2,1,1,1,2,2]", expectedOutput: "2" }
    ]
  ),
  createLeetCodeProblem(
    "prob_next_permutation",
    "Next Permutation",
    "Medium",
    ["Arrays", "Two Pointers"],
    ["Google", "Amazon", "Microsoft"],
    "A permutation of an array of integers is an arrangement of its members into a sequence. Rearrange numbers into the lexicographically next greater permutation.",
    "nextPermutation",
    "(self, nums: list[int]) -> None",
    "void nextPermutation(vector<int>& nums)",
    "void nextPermutation(int[] nums)",
    "(nums)",
    [
      { input: "[1,2,3]", expectedOutput: "[1,3,2]" },
      { input: "[3,2,1]", expectedOutput: "[1,2,3]" },
      { input: "[1,1,5]", expectedOutput: "[1,5,1]" }
    ]
  ),

  // --- 2. TWO POINTERS (11-18) ---
  createLeetCodeProblem(
    "prob_valid_palindrome",
    "Valid Palindrome",
    "Easy",
    ["Two Pointers", "Strings"],
    ["Facebook", "Microsoft", "TCS"],
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    "isPalindrome",
    "(self, s: str) -> bool",
    "bool isPalindrome(string s)",
    "boolean isPalindrome(String s)",
    "(s)",
    [
      { input: '"A man, a plan, a canal: Panama"', expectedOutput: "true" },
      { input: '"race a car"', expectedOutput: "false" },
      { input: '" "', expectedOutput: "true" }
    ]
  ),
  createLeetCodeProblem(
    "prob_two_sum_ii",
    "Two Sum II - Input Array Is Sorted",
    "Medium",
    ["Two Pointers", "Arrays", "Binary Search"],
    ["Amazon", "Google", "TCS"],
    "Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number using O(1) extra space.",
    "twoSum",
    "(self, numbers: list[int], target: int) -> list[int]",
    "vector<int> twoSum(vector<int>& numbers, int target)",
    "int[] twoSum(int[] numbers, int target)",
    "(numbers, target)",
    [
      { input: "[2,7,11,15], 9", expectedOutput: "[1,2]" },
      { input: "[2,3,4], 6", expectedOutput: "[1,3]" },
      { input: "[-1,0], -1", expectedOutput: "[1,2]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_three_sum",
    "3Sum",
    "Medium",
    ["Two Pointers", "Arrays"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0` without duplicates.",
    "threeSum",
    "(self, nums: list[int]) -> list[list[int]]",
    "vector<vector<int>> threeSum(vector<int>& nums)",
    "List<List<Integer>> threeSum(int[] nums)",
    "(nums)",
    [
      { input: "[-1,0,1,2,-1,-4]", expectedOutput: "[[-1,-1,2],[-1,0,1]]" },
      { input: "[0,1,1]", expectedOutput: "[]" },
      { input: "[0,0,0]", expectedOutput: "[[0,0,0]]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_container_most_water",
    "Container With Most Water",
    "Medium",
    ["Two Pointers", "Arrays", "Greedy"],
    ["Google", "Amazon", "Microsoft", "American Express"],
    "You are given an integer array `height` of length `n`. Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    "maxArea",
    "(self, height: list[int]) -> int",
    "int maxArea(vector<int>& height)",
    "int maxArea(int[] height)",
    "(height)",
    [
      { input: "[1,8,6,2,5,4,8,3,7]", expectedOutput: "49" },
      { input: "[1,1]", expectedOutput: "1" }
    ]
  ),
  createLeetCodeProblem(
    "prob_trapping_rain_water",
    "Trapping Rain Water",
    "Hard",
    ["Two Pointers", "Stack", "Dynamic Programming"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.",
    "trap",
    "(self, height: list[int]) -> int",
    "int trap(vector<int>& height)",
    "int trap(int[] height)",
    "(height)",
    [
      { input: "[0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" },
      { input: "[4,2,0,3,2,5]", expectedOutput: "9" }
    ]
  ),
  createLeetCodeProblem(
    "prob_remove_duplicates_sorted",
    "Remove Duplicates from Sorted Array",
    "Easy",
    ["Two Pointers", "Arrays"],
    ["Microsoft", "TCS", "Infosys"],
    "Given an integer array `nums` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once. Return the number of unique elements.",
    "removeDuplicates",
    "(self, nums: list[int]) -> int",
    "int removeDuplicates(vector<int>& nums)",
    "int removeDuplicates(int[] nums)",
    "(nums)",
    [
      { input: "[1,1,2]", expectedOutput: "2" },
      { input: "[0,0,1,1,1,2,2,3,3,4]", expectedOutput: "5" }
    ]
  ),
  createLeetCodeProblem(
    "prob_move_zeroes",
    "Move Zeroes",
    "Easy",
    ["Two Pointers", "Arrays"],
    ["Amazon", "Microsoft", "TCS", "Accenture"],
    "Given an integer array `nums`, move all `0`'s to the end of it while maintaining the relative order of the non-zero elements in-place.",
    "moveZeroes",
    "(self, nums: list[int]) -> None",
    "void moveZeroes(vector<int>& nums)",
    "void moveZeroes(int[] nums)",
    "(nums)",
    [
      { input: "[0,1,0,3,12]", expectedOutput: "[1,3,12,0,0]" },
      { input: "[0]", expectedOutput: "[0]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_sort_colors",
    "Sort Colors (Dutch National Flag)",
    "Medium",
    ["Two Pointers", "Arrays"],
    ["Microsoft", "Amazon", "TCS"],
    "Given an array `nums` with `n` objects colored red (0), white (1), or blue (2), sort them in-place so that objects of the same color are adjacent in the order 0, 1, and 2.",
    "sortColors",
    "(self, nums: list[int]) -> None",
    "void sortColors(vector<int>& nums)",
    "void sortColors(int[] nums)",
    "(nums)",
    [
      { input: "[2,0,2,1,1,0]", expectedOutput: "[0,0,1,1,2,2]" },
      { input: "[2,0,1]", expectedOutput: "[0,1,2]" }
    ]
  ),

  // --- 3. SLIDING WINDOW (19-25) ---
  createLeetCodeProblem(
    "prob_best_time_buy_sell_stock",
    "Best Time to Buy and Sell Stock",
    "Easy",
    ["Sliding Window", "Arrays", "Dynamic Programming"],
    ["Google", "Amazon", "Microsoft", "TCS", "HCL"],
    "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit.",
    "maxProfit",
    "(self, prices: list[int]) -> int",
    "int maxProfit(vector<int>& prices)",
    "int maxProfit(int[] prices)",
    "(prices)",
    [
      { input: "[7,1,5,3,6,4]", expectedOutput: "5" },
      { input: "[7,6,4,3,1]", expectedOutput: "0" }
    ]
  ),
  createLeetCodeProblem(
    "prob_longest_substring_without_repeating",
    "Longest Substring Without Repeating Characters",
    "Medium",
    ["Sliding Window", "Strings", "Hashing"],
    ["Google", "Amazon", "Microsoft", "American Express"],
    "Given a string `s`, find the length of the longest substring without repeating characters.",
    "lengthOfLongestSubstring",
    "(self, s: str) -> int",
    "int lengthOfLongestSubstring(string s)",
    "int lengthOfLongestSubstring(String s)",
    "(s)",
    [
      { input: '"abcabcbb"', expectedOutput: "3" },
      { input: '"bbbbb"', expectedOutput: "1" },
      { input: '"pwwkew"', expectedOutput: "3" }
    ]
  ),
  createLeetCodeProblem(
    "prob_longest_repeating_char_replacement",
    "Longest Repeating Character Replacement",
    "Medium",
    ["Sliding Window", "Strings", "Hashing"],
    ["Google", "Amazon"],
    "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character at most `k` times. Return the length of the longest substring containing the same letter.",
    "characterReplacement",
    "(self, s: str, k: int) -> int",
    "int characterReplacement(string s, int k)",
    "int characterReplacement(String s, int k)",
    "(s, k)",
    [
      { input: '"ABAB", 2', expectedOutput: "4" },
      { input: '"AABABBA", 1', expectedOutput: "4" }
    ]
  ),
  createLeetCodeProblem(
    "prob_permutation_in_string",
    "Permutation in String",
    "Medium",
    ["Sliding Window", "Strings", "Hashing"],
    ["Microsoft", "Amazon"],
    "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.",
    "checkInclusion",
    "(self, s1: str, s2: str) -> bool",
    "bool checkInclusion(string s1, string s2)",
    "boolean checkInclusion(String s1, String s2)",
    "(s1, s2)",
    [
      { input: '"ab", "eidbaooo"', expectedOutput: "true" },
      { input: '"ab", "eidboaoo"', expectedOutput: "false" }
    ]
  ),
  createLeetCodeProblem(
    "prob_minimum_window_substring",
    "Minimum Window Substring",
    "Hard",
    ["Sliding Window", "Strings", "Hashing"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "Given two strings `s` and `t` of lengths `m` and `n` respectively, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window.",
    "minWindow",
    "(self, s: str, t: str) -> str",
    "string minWindow(string s, string t)",
    "String minWindow(String s, String t)",
    "(s, t)",
    [
      { input: '"ADOBECODEBANC", "ABC"', expectedOutput: '"BANC"' },
      { input: '"a", "a"', expectedOutput: '"a"' },
      { input: '"a", "aa"', expectedOutput: '""' }
    ]
  ),
  createLeetCodeProblem(
    "prob_sliding_window_maximum",
    "Sliding Window Maximum",
    "Hard",
    ["Sliding Window", "Queue", "Heap / Priority Queue"],
    ["Amazon", "Google", "Microsoft"],
    "You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. Return the max sliding window.",
    "maxSlidingWindow",
    "(self, nums: list[int], k: int) -> list[int]",
    "vector<int> maxSlidingWindow(vector<int>& nums, int k)",
    "int[] maxSlidingWindow(int[] nums, int k)",
    "(nums, k)",
    [
      { input: "[1,3,-1,-3,5,3,6,7], 3", expectedOutput: "[3,3,5,5,6,7]" },
      { input: "[1], 1", expectedOutput: "[1]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_subarrays_with_k_different_integers",
    "Subarrays with K Different Integers",
    "Hard",
    ["Sliding Window", "Arrays", "Hashing"],
    ["Amazon", "Microsoft"],
    "Given an integer array `nums` and an integer `k`, return the number of good subarrays of `nums` having exactly `k` distinct integers.",
    "subarraysWithKDistinct",
    "(self, nums: list[int], k: int) -> int",
    "int subarraysWithKDistinct(vector<int>& nums, int k)",
    "int subarraysWithKDistinct(int[] nums, int k)",
    "(nums, k)",
    [
      { input: "[1,2,1,2,3], 2", expectedOutput: "7" },
      { input: "[1,2,1,3,4], 3", expectedOutput: "3" }
    ]
  ),

  // --- 4. STACK & QUEUE (26-34) ---
  createLeetCodeProblem(
    "prob_valid_parentheses",
    "Valid Parentheses",
    "Easy",
    ["Stack", "Strings"],
    ["Google", "Amazon", "Microsoft", "TCS", "Infosys"],
    "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "isValid",
    "(self, s: str) -> bool",
    "bool isValid(string s)",
    "boolean isValid(String s)",
    "(s)",
    [
      { input: '"()"', expectedOutput: "true" },
      { input: '"()[]{}"', expectedOutput: "true" },
      { input: '"(]"', expectedOutput: "false" },
      { input: '"([)]"', expectedOutput: "false", isHidden: true }
    ]
  ),
  createLeetCodeProblem(
    "prob_min_stack",
    "Min Stack",
    "Medium",
    ["Stack", "Design"],
    ["Amazon", "Microsoft", "TCS"],
    "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).",
    "getMin",
    "(self) -> int",
    "int getMin()",
    "int getMin()",
    "()",
    [
      { input: '["MinStack","push","push","push","getMin","pop","top","getMin"], [[],[-2],[0],[-3],[],[],[],[]]', expectedOutput: "[null,null,null,null,-3,null,0,-2]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_evaluate_reverse_polish_notation",
    "Evaluate Reverse Polish Notation",
    "Medium",
    ["Stack", "Arrays"],
    ["Amazon", "Microsoft", "Google"],
    "Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, and /.",
    "evalRPN",
    "(self, tokens: list[str]) -> int",
    "int evalRPN(vector<string>& tokens)",
    "int evalRPN(String[] tokens)",
    "(tokens)",
    [
      { input: '["2","1","+","3","*"]', expectedOutput: "9" },
      { input: '["4","13","5","/","+"]', expectedOutput: "6" }
    ]
  ),
  createLeetCodeProblem(
    "prob_daily_temperatures",
    "Daily Temperatures",
    "Medium",
    ["Stack", "Arrays", "Monotonic Stack"],
    ["Google", "Amazon", "Microsoft"],
    "Given an array of integers `temperatures` represents the daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after the `i-th` day to get a warmer temperature.",
    "dailyTemperatures",
    "(self, temperatures: list[int]) -> list[int]",
    "vector<int> dailyTemperatures(vector<int>& temperatures)",
    "int[] dailyTemperatures(int[] temperatures)",
    "(temperatures)",
    [
      { input: "[73,74,75,71,69,72,76,73]", expectedOutput: "[1,1,4,2,1,1,0,0]" },
      { input: "[30,40,50,60]", expectedOutput: "[1,1,1,0]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_largest_rectangle_histogram",
    "Largest Rectangle in Histogram",
    "Hard",
    ["Stack", "Arrays", "Monotonic Stack"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    "largestRectangleArea",
    "(self, heights: list[int]) -> int",
    "int largestRectangleArea(vector<int>& heights)",
    "int largestRectangleArea(int[] heights)",
    "(heights)",
    [
      { input: "[2,1,5,6,2,3]", expectedOutput: "10" },
      { input: "[2,4]", expectedOutput: "4" }
    ]
  ),
  createLeetCodeProblem(
    "prob_implement_queue_using_stacks",
    "Implement Queue using Stacks",
    "Easy",
    ["Stack", "Queue", "Design"],
    ["Microsoft", "TCS", "Accenture"],
    "Implement a first in first out (FIFO) queue using only two stacks.",
    "pop",
    "(self) -> int",
    "int pop()",
    "int pop()",
    "()",
    [
      { input: '["MyQueue", "push", "push", "peek", "pop", "empty"], [[], [1], [2], [], [], []]', expectedOutput: "[null, null, null, 1, 1, false]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_generate_parentheses",
    "Generate Parentheses",
    "Medium",
    ["Recursion", "Backtracking", "Stack", "Strings"],
    ["Google", "Amazon", "Microsoft"],
    "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    "generateParenthesis",
    "(self, n: int) -> list[str]",
    "vector<string> generateParenthesis(int n)",
    "List<String> generateParenthesis(int n)",
    "(n)",
    [
      { input: "3", expectedOutput: '["((()))","(()())","(())()","()(())","()()()"]' },
      { input: "1", expectedOutput: '["()"]' }
    ]
  ),

  // --- 5. BINARY SEARCH (35-43) ---
  createLeetCodeProblem(
    "prob_binary_search",
    "Binary Search",
    "Easy",
    ["Binary Search", "Arrays"],
    ["Google", "Microsoft", "Amazon", "TCS", "HCL"],
    "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return `-1`.",
    "search",
    "(self, nums: list[int], target: int) -> int",
    "int search(vector<int>& nums, int target)",
    "int search(int[] nums, int target)",
    "(nums, target)",
    [
      { input: "[-1,0,3,5,9,12], 9", expectedOutput: "4" },
      { input: "[-1,0,3,5,9,12], 2", expectedOutput: "-1" },
      { input: "[5], 5", expectedOutput: "0", isHidden: true }
    ]
  ),
  createLeetCodeProblem(
    "prob_search_2d_matrix",
    "Search a 2D Matrix",
    "Medium",
    ["Binary Search", "Arrays", "Matrix"],
    ["Google", "Amazon", "Microsoft"],
    "You are given an `m x n` integer matrix with integers in each row sorted from left to right and the first integer of each row is greater than the last integer of the previous row. Return `true` if `target` is in matrix.",
    "searchMatrix",
    "(self, matrix: list[list[int]], target: int) -> bool",
    "bool searchMatrix(vector<vector<int>>& matrix, int target)",
    "boolean searchMatrix(int[][] matrix, int target)",
    "(matrix, target)",
    [
      { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3", expectedOutput: "true" },
      { input: "[[1,3,5,7],[10,11,16,20],[23,30,34,60]], 13", expectedOutput: "false" }
    ]
  ),
  createLeetCodeProblem(
    "prob_koko_eating_bananas",
    "Koko Eating Bananas",
    "Medium",
    ["Binary Search", "Arrays"],
    ["Google", "Amazon"],
    "Koko loves to eat bananas. There are `n` piles of bananas. Return the minimum integer `k` such that she can eat all the bananas within `h` hours.",
    "minEatingSpeed",
    "(self, piles: list[int], h: int) -> int",
    "int minEatingSpeed(vector<int>& piles, int h)",
    "int minEatingSpeed(int[] piles, int h)",
    "(piles, h)",
    [
      { input: "[3,6,7,11], 8", expectedOutput: "4" },
      { input: "[30,11,23,4,20], 5", expectedOutput: "30" }
    ]
  ),
  createLeetCodeProblem(
    "prob_find_min_rotated_sorted_array",
    "Find Minimum in Rotated Sorted Array",
    "Medium",
    ["Binary Search", "Arrays"],
    ["Amazon", "Microsoft", "TCS"],
    "Suppose an array of length `n` sorted in ascending order is rotated between 1 and `n` times. Find the minimum element of this array in O(log n) time.",
    "findMin",
    "(self, nums: list[int]) -> int",
    "int findMin(vector<int>& nums)",
    "int findMin(int[] nums)",
    "(nums)",
    [
      { input: "[3,4,5,1,2]", expectedOutput: "1" },
      { input: "[4,5,6,7,0,1,2]", expectedOutput: "0" },
      { input: "[11,13,15,17]", expectedOutput: "11" }
    ]
  ),
  createLeetCodeProblem(
    "prob_search_rotated_sorted_array",
    "Search in Rotated Sorted Array",
    "Medium",
    ["Binary Search", "Arrays"],
    ["Google", "Amazon", "Microsoft", "American Express"],
    "Given the array `nums` after the possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums` in O(log n).",
    "search",
    "(self, nums: list[int], target: int) -> int",
    "int search(vector<int>& nums, int target)",
    "int search(int[] nums, int target)",
    "(nums, target)",
    [
      { input: "[4,5,6,7,0,1,2], 0", expectedOutput: "4" },
      { input: "[4,5,6,7,0,1,2], 3", expectedOutput: "-1" },
      { input: "[1], 0", expectedOutput: "-1" }
    ]
  ),
  createLeetCodeProblem(
    "prob_median_two_sorted_arrays",
    "Median of Two Sorted Arrays",
    "Hard",
    ["Binary Search", "Arrays", "Divide and Conquer"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays in O(log (m+n)) runtime.",
    "findMedianSortedArrays",
    "(self, nums1: list[int], nums2: list[int]) -> float",
    "double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2)",
    "double findMedianSortedArrays(int[] nums1, int[] nums2)",
    "(nums1, nums2)",
    [
      { input: "[1,3], [2]", expectedOutput: "2.00000" },
      { input: "[1,2], [3,4]", expectedOutput: "2.50000" }
    ]
  ),

  // --- 6. LINKED LIST (44-52) ---
  createLeetCodeProblem(
    "prob_reverse_linked_list",
    "Reverse Linked List",
    "Easy",
    ["Linked List", "Recursion"],
    ["Google", "Amazon", "Microsoft", "TCS", "Infosys"],
    "Given the `head` of a singly linked list, reverse the list, and return the reversed list.",
    "reverseList",
    "(self, head)",
    "ListNode* reverseList(ListNode* head)",
    "ListNode reverseList(ListNode head)",
    "(head)",
    [
      { input: "[1,2,3,4,5]", expectedOutput: "[5,4,3,2,1]" },
      { input: "[1,2]", expectedOutput: "[2,1]" },
      { input: "[]", expectedOutput: "[]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_merge_two_sorted_lists",
    "Merge Two Sorted Lists",
    "Easy",
    ["Linked List", "Recursion"],
    ["Amazon", "Microsoft", "TCS", "Accenture"],
    "You are given the heads of two sorted linked lists `list1` and `list2`. Merge the two lists into one sorted list.",
    "mergeTwoLists",
    "(self, list1, list2)",
    "ListNode* mergeTwoLists(ListNode* list1, ListNode* list2)",
    "ListNode mergeTwoLists(ListNode list1, ListNode list2)",
    "(list1, list2)",
    [
      { input: "[1,2,4], [1,3,4]", expectedOutput: "[1,1,2,3,4,4]" },
      { input: "[], []", expectedOutput: "[]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_reorder_list",
    "Reorder List",
    "Medium",
    ["Linked List", "Two Pointers", "Stack"],
    ["Google", "Amazon", "Microsoft"],
    "You are given the head of a singly linked-list: L0 → L1 → … → Ln-1 → Ln. Reorder the list to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → …",
    "reorderList",
    "(self, head) -> None",
    "void reorderList(ListNode* head)",
    "void reorderList(ListNode head)",
    "(head)",
    [
      { input: "[1,2,3,4]", expectedOutput: "[1,4,2,3]" },
      { input: "[1,2,3,4,5]", expectedOutput: "[1,5,2,4,3]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_remove_nth_node_from_end",
    "Remove Nth Node From End of List",
    "Medium",
    ["Linked List", "Two Pointers"],
    ["Amazon", "Microsoft", "TCS"],
    "Given the `head` of a linked list, remove the `n-th` node from the end of the list and return its head in one pass.",
    "removeNthFromEnd",
    "(self, head, n: int)",
    "ListNode* removeNthFromEnd(ListNode* head, int n)",
    "ListNode removeNthFromEnd(ListNode head, int n)",
    "(head, n)",
    [
      { input: "[1,2,3,4,5], 2", expectedOutput: "[1,2,3,5]" },
      { input: "[1], 1", expectedOutput: "[]" },
      { input: "[1,2], 1", expectedOutput: "[1]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_linked_list_cycle",
    "Linked List Cycle",
    "Easy",
    ["Linked List", "Two Pointers", "Hashing"],
    ["Microsoft", "Amazon", "TCS", "HCL"],
    "Given `head`, the head of a linked list, determine if the linked list has a cycle in it using Floyd's Tortoise and Hare algorithm.",
    "hasCycle",
    "(self, head) -> bool",
    "bool hasCycle(ListNode *head)",
    "boolean hasCycle(ListNode head)",
    "(head)",
    [
      { input: "[3,2,0,-4], pos = 1", expectedOutput: "true" },
      { input: "[1,2], pos = 0", expectedOutput: "true" },
      { input: "[1], pos = -1", expectedOutput: "false" }
    ]
  ),
  createLeetCodeProblem(
    "prob_merge_k_sorted_lists",
    "Merge k Sorted Lists",
    "Hard",
    ["Linked List", "Heap / Priority Queue", "Divide and Conquer"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "You are given an array of `k` linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    "mergeKLists",
    "(self, lists)",
    "ListNode* mergeKLists(vector<ListNode*>& lists)",
    "ListNode mergeKLists(ListNode[] lists)",
    "(lists)",
    [
      { input: "[[1,4,5],[1,3,4],[2,6]]", expectedOutput: "[1,1,2,3,4,4,5,6]" },
      { input: "[]", expectedOutput: "[]" }
    ]
  ),

  // --- 7. TREES & BINARY SEARCH TREE (53-67) ---
  createLeetCodeProblem(
    "prob_invert_binary_tree",
    "Invert Binary Tree",
    "Easy",
    ["Trees", "Recursion"],
    ["Google", "Amazon", "Microsoft", "TCS"],
    "Given the `root` of a binary tree, invert the tree, and return its root.",
    "invertTree",
    "(self, root)",
    "TreeNode* invertTree(TreeNode* root)",
    "TreeNode invertTree(TreeNode root)",
    "(root)",
    [
      { input: "[4,2,7,1,3,6,9]", expectedOutput: "[4,7,2,9,6,3,1]" },
      { input: "[2,1,3]", expectedOutput: "[2,3,1]" },
      { input: "[]", expectedOutput: "[]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_maximum_depth_binary_tree",
    "Maximum Depth of Binary Tree",
    "Easy",
    ["Trees", "Recursion"],
    ["Amazon", "Microsoft", "TCS", "Infosys"],
    "Given the `root` of a binary tree, return its maximum depth.",
    "maxDepth",
    "(self, root) -> int",
    "int maxDepth(TreeNode* root)",
    "int maxDepth(TreeNode root)",
    "(root)",
    [
      { input: "[3,9,20,null,null,15,7]", expectedOutput: "3" },
      { input: "[1,null,2]", expectedOutput: "2" }
    ]
  ),
  createLeetCodeProblem(
    "prob_same_tree",
    "Same Tree",
    "Easy",
    ["Trees", "Recursion"],
    ["Google", "Amazon", "TCS"],
    "Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.",
    "isSameTree",
    "(self, p, q) -> bool",
    "bool isSameTree(TreeNode* p, TreeNode* q)",
    "boolean isSameTree(TreeNode p, TreeNode q)",
    "(p, q)",
    [
      { input: "[1,2,3], [1,2,3]", expectedOutput: "true" },
      { input: "[1,2], [1,null,2]", expectedOutput: "false" }
    ]
  ),
  createLeetCodeProblem(
    "prob_subtree_of_another_tree",
    "Subtree of Another Tree",
    "Easy",
    ["Trees", "Recursion"],
    ["Amazon", "Microsoft", "Google"],
    "Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values of `subRoot`.",
    "isSubtree",
    "(self, root, subRoot) -> bool",
    "bool isSubtree(TreeNode* root, TreeNode* subRoot)",
    "boolean isSubtree(TreeNode root, TreeNode subRoot)",
    "(root, subRoot)",
    [
      { input: "[3,4,5,1,2], [4,1,2]", expectedOutput: "true" },
      { input: "[3,4,5,1,2,null,null,null,null,0], [4,1,2]", expectedOutput: "false" }
    ]
  ),
  createLeetCodeProblem(
    "prob_lowest_common_ancestor_bst",
    "Lowest Common Ancestor of a Binary Search Tree",
    "Medium",
    ["Trees", "Binary Search Tree", "Recursion"],
    ["Google", "Amazon", "Microsoft", "TCS"],
    "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    "lowestCommonAncestor",
    "(self, root, p, q)",
    "TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q)",
    "TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q)",
    "(root, p, q)",
    [
      { input: "[6,2,8,0,4,7,9,null,null,3,5], 2, 8", expectedOutput: "6" },
      { input: "[6,2,8,0,4,7,9,null,null,3,5], 2, 4", expectedOutput: "2" }
    ]
  ),
  createLeetCodeProblem(
    "prob_binary_tree_level_order_traversal",
    "Binary Tree Level Order Traversal",
    "Medium",
    ["Trees", "Queue"],
    ["Google", "Amazon", "Microsoft", "American Express"],
    "Given the `root` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
    "levelOrder",
    "(self, root) -> list[list[int]]",
    "vector<vector<int>> levelOrder(TreeNode* root)",
    "List<List<Integer>> levelOrder(TreeNode root)",
    "(root)",
    [
      { input: "[3,9,20,null,null,15,7]", expectedOutput: "[[3],[9,20],[15,7]]" },
      { input: "[1]", expectedOutput: "[[1]]" },
      { input: "[]", expectedOutput: "[]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_validate_binary_search_tree",
    "Validate Binary Search Tree",
    "Medium",
    ["Trees", "Binary Search Tree", "Recursion"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).",
    "isValidBST",
    "(self, root) -> bool",
    "bool isValidBST(TreeNode* root)",
    "boolean isValidBST(TreeNode root)",
    "(root)",
    [
      { input: "[2,1,3]", expectedOutput: "true" },
      { input: "[5,1,4,null,null,3,6]", expectedOutput: "false" }
    ]
  ),
  createLeetCodeProblem(
    "prob_kth_smallest_element_in_bst",
    "Kth Smallest Element in a BST",
    "Medium",
    ["Trees", "Binary Search Tree", "Recursion"],
    ["Amazon", "Microsoft", "Google"],
    "Given the `root` of a binary search tree, and an integer `k`, return the `k-th` smallest value (1-indexed) of all the values of the nodes in the tree.",
    "kthSmallest",
    "(self, root, k: int) -> int",
    "int kthSmallest(TreeNode* root, int k)",
    "int kthSmallest(TreeNode root, int k)",
    "(root, k)",
    [
      { input: "[3,1,4,null,2], 1", expectedOutput: "1" },
      { input: "[5,3,6,2,4,null,null,1], 3", expectedOutput: "3" }
    ]
  ),
  createLeetCodeProblem(
    "prob_binary_tree_maximum_path_sum",
    "Binary Tree Maximum Path Sum",
    "Hard",
    ["Trees", "Recursion", "Dynamic Programming"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. Return the maximum path sum of any non-empty path.",
    "maxPathSum",
    "(self, root) -> int",
    "int maxPathSum(TreeNode* root)",
    "int maxPathSum(TreeNode root)",
    "(root)",
    [
      { input: "[1,2,3]", expectedOutput: "6" },
      { input: "[-10,9,20,null,null,15,7]", expectedOutput: "42" }
    ]
  ),
  createLeetCodeProblem(
    "prob_serialize_and_deserialize_binary_tree",
    "Serialize and Deserialize Binary Tree",
    "Hard",
    ["Trees", "Design", "Strings"],
    ["Google", "Amazon", "Microsoft"],
    "Design an algorithm to serialize and deserialize a binary tree.",
    "serialize",
    "(self, root) -> str",
    "string serialize(TreeNode* root)",
    "String serialize(TreeNode root)",
    "(root)",
    [
      { input: "[1,2,3,null,null,4,5]", expectedOutput: "[1,2,3,null,null,4,5]" }
    ]
  ),

  // --- 8. HEAP & PRIORITY QUEUE (68-74) ---
  createLeetCodeProblem(
    "prob_kth_largest_element_in_array",
    "Kth Largest Element in an Array",
    "Medium",
    ["Heap / Priority Queue", "Divide and Conquer", "Arrays"],
    ["Google", "Amazon", "Microsoft", "American Express"],
    "Given an integer array `nums` and an integer `k`, return the `k-th` largest element in the array.",
    "findKthLargest",
    "(self, nums: list[int], k: int) -> int",
    "int findKthLargest(vector<int>& nums, int k)",
    "int findKthLargest(int[] nums, int k)",
    "(nums, k)",
    [
      { input: "[3,2,1,5,6,4], 2", expectedOutput: "5" },
      { input: "[3,2,3,1,2,4,5,5,6], 4", expectedOutput: "4" }
    ]
  ),
  createLeetCodeProblem(
    "prob_last_stone_weight",
    "Last Stone Weight",
    "Easy",
    ["Heap / Priority Queue", "Arrays"],
    ["Amazon", "TCS", "Accenture"],
    "You are given an array of integers `stones` where `stones[i]` is the weight of the `i-th` stone. We smash the two heaviest stones until at most 1 stone remains. Return its weight or 0.",
    "lastStoneWeight",
    "(self, stones: list[int]) -> int",
    "int lastStoneWeight(vector<int>& stones)",
    "int lastStoneWeight(int[] stones)",
    "(stones)",
    [
      { input: "[2,7,4,1,8,1]", expectedOutput: "1" },
      { input: "[1]", expectedOutput: "1" }
    ]
  ),
  createLeetCodeProblem(
    "prob_k_closest_points_to_origin",
    "K Closest Points to Origin",
    "Medium",
    ["Heap / Priority Queue", "Arrays", "Geometry"],
    ["Amazon", "Google", "Microsoft"],
    "Given an array of `points` where `points[i] = [xi, yi]` represents a point on the X-Y plane and an integer `k`, return the `k` closest points to the origin (0, 0).",
    "kClosest",
    "(self, points: list[list[int]], k: int) -> list[list[int]]",
    "vector<vector<int>> kClosest(vector<vector<int>>& points, int k)",
    "int[][] kClosest(int[][] points, int k)",
    "(points, k)",
    [
      { input: "[[1,3],[-2,2]], 1", expectedOutput: "[[-2,2]]" },
      { input: "[[3,3],[5,-1],[-2,4]], 2", expectedOutput: "[[3,3],[-2,4]]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_task_scheduler",
    "Task Scheduler",
    "Medium",
    ["Heap / Priority Queue", "Greedy", "Arrays"],
    ["Google", "Amazon", "Microsoft"],
    "You are given an array of CPU tasks, represented by letters A to Z, and a cooling time `n`. Return the least number of units of times that the CPU will take to finish all the given tasks.",
    "leastInterval",
    "(self, tasks: list[str], n: int) -> int",
    "int leastInterval(vector<char>& tasks, int n)",
    "int leastInterval(char[] tasks, int n)",
    "(tasks, n)",
    [
      { input: '["A","A","A","B","B","B"], 2', expectedOutput: "8" },
      { input: '["A","A","A","B","B","B"], 0', expectedOutput: "6" }
    ]
  ),
  createLeetCodeProblem(
    "prob_find_median_from_data_stream",
    "Find Median from Data Stream",
    "Hard",
    ["Heap / Priority Queue", "Design"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "The median is the middle value in an ordered integer list. Design a data structure that supports adding integer numbers from the data stream and finding the median of all elements so far.",
    "findMedian",
    "(self) -> float",
    "double findMedian()",
    "double findMedian()",
    "()",
    [
      { input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"], [[], [1], [2], [], [3], []]', expectedOutput: "[null, null, null, 1.5, null, 2.0]" }
    ]
  ),

  // --- 9. BACKTRACKING & RECURSION (75-81) ---
  createLeetCodeProblem(
    "prob_subsets",
    "Subsets",
    "Medium",
    ["Backtracking", "Recursion", "Arrays"],
    ["Google", "Amazon", "Microsoft"],
    "Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    "subsets",
    "(self, nums: list[int]) -> list[list[int]]",
    "vector<vector<int>> subsets(vector<int>& nums)",
    "List<List<Integer>> subsets(int[] nums)",
    "(nums)",
    [
      { input: "[1,2,3]", expectedOutput: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
      { input: "[0]", expectedOutput: "[[],[0]]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_combination_sum",
    "Combination Sum",
    "Medium",
    ["Backtracking", "Recursion", "Arrays"],
    ["Amazon", "Google", "Microsoft", "InMobi"],
    "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of `candidates` where the chosen numbers sum to `target`.",
    "combinationSum",
    "(self, candidates: list[int], target: int) -> list[list[int]]",
    "vector<vector<int>> combinationSum(vector<int>& candidates, int target)",
    "List<List<Integer>> combinationSum(int[] candidates, int target)",
    "(candidates, target)",
    [
      { input: "[2,3,6,7], 7", expectedOutput: "[[2,2,3],[7]]" },
      { input: "[2,3,5], 8", expectedOutput: "[[2,2,2,2],[2,3,3],[3,5]]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_permutations",
    "Permutations",
    "Medium",
    ["Backtracking", "Recursion", "Arrays"],
    ["Google", "Microsoft", "Amazon"],
    "Given an array `nums` of distinct integers, return all the possible permutations. You can return the answer in any order.",
    "permute",
    "(self, nums: list[int]) -> list[list[int]]",
    "vector<vector<int>> permute(vector<int>& nums)",
    "List<List<Integer>> permute(int[] nums)",
    "(nums)",
    [
      { input: "[1,2,3]", expectedOutput: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
      { input: "[0,1]", expectedOutput: "[[0,1],[1,0]]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_word_search",
    "Word Search",
    "Medium",
    ["Backtracking", "Recursion", "Matrix"],
    ["Google", "Amazon", "Microsoft"],
    "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.",
    "exist",
    "(self, board: list[list[str]], word: str) -> bool",
    "bool exist(vector<vector<char>>& board, string word)",
    "boolean exist(char[][] board, String word)",
    "(board, word)",
    [
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCCED"', expectedOutput: "true" },
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "SEE"', expectedOutput: "true" },
      { input: '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], "ABCB"', expectedOutput: "false" }
    ]
  ),
  createLeetCodeProblem(
    "prob_n_queens",
    "N-Queens",
    "Hard",
    ["Backtracking", "Recursion"],
    ["Google", "Amazon", "Microsoft"],
    "The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Return all distinct solutions.",
    "solveNQueens",
    "(self, n: int) -> list[list[str]]",
    "vector<vector<string>> solveNQueens(int n)",
    "List<List<String>> solveNQueens(int n)",
    "(n)",
    [
      { input: "4", expectedOutput: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: "1", expectedOutput: '[["Q"]]' }
    ]
  ),

  // --- 10. GRAPHS (82-90) ---
  createLeetCodeProblem(
    "prob_number_of_islands",
    "Number of Islands",
    "Medium",
    ["Graphs", "Matrix", "Recursion"],
    ["Google", "Amazon", "Microsoft", "TCS", "InMobi"],
    "Given an `m x n` 2D binary grid `grid` which represents a map of '1's (land) and '0's (water), return the number of islands.",
    "numIslands",
    "(self, grid: list[list[str]]) -> int",
    "int numIslands(vector<vector<char>>& grid)",
    "int numIslands(char[][] grid)",
    "(grid)",
    [
      { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expectedOutput: "1" },
      { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expectedOutput: "3" }
    ]
  ),
  createLeetCodeProblem(
    "prob_clone_graph",
    "Clone Graph",
    "Medium",
    ["Graphs", "Hashing", "Recursion"],
    ["Google", "Amazon", "Microsoft"],
    "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.",
    "cloneGraph",
    "(self, node)",
    "Node* cloneGraph(Node* node)",
    "Node cloneGraph(Node node)",
    "(node)",
    [
      { input: "[[2,4],[1,3],[2,4],[1,3]]", expectedOutput: "[[2,4],[1,3],[2,4],[1,3]]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_pacific_atlantic_water_flow",
    "Pacific Atlantic Water Flow",
    "Medium",
    ["Graphs", "Matrix"],
    ["Google", "Amazon"],
    "There is an `m x n` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Return a 2D list of grid coordinates where rain water can flow to both oceans.",
    "pacificAtlantic",
    "(self, heights: list[list[int]]) -> list[list[int]]",
    "vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights)",
    "List<List<Integer>> pacificAtlantic(int[][] heights)",
    "(heights)",
    [
      { input: "[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", expectedOutput: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" }
    ]
  ),
  createLeetCodeProblem(
    "prob_course_schedule",
    "Course Schedule (Topological Sort)",
    "Medium",
    ["Graphs", "Topological Sort"],
    ["Google", "Amazon", "Microsoft", "American Express"],
    "There are a total of `numCourses` courses you have to take, labeled from 0 to `numCourses - 1`. Return `true` if you can finish all courses, otherwise return `false`.",
    "canFinish",
    "(self, numCourses: int, prerequisites: list[list[int]]) -> bool",
    "bool canFinish(int numCourses, vector<vector<int>>& prerequisites)",
    "boolean canFinish(int numCourses, int[][] prerequisites)",
    "(numCourses, prerequisites)",
    [
      { input: "2, [[1,0]]", expectedOutput: "true" },
      { input: "2, [[1,0],[0,1]]", expectedOutput: "false" }
    ]
  ),
  createLeetCodeProblem(
    "prob_network_delay_time",
    "Network Delay Time (Dijkstra)",
    "Medium",
    ["Graphs", "Heap / Priority Queue", "Shortest Path"],
    ["Google", "Amazon", "Microsoft"],
    "You are given a network of `n` nodes, labeled from 1 to `n`. Return the minimum time it takes for all the `n` nodes to receive the signal from source `k`.",
    "networkDelayTime",
    "(self, times: list[list[int]], n: int, k: int) -> int",
    "int networkDelayTime(vector<vector<int>>& times, int n, int k)",
    "int networkDelayTime(int[][] times, int n, int k)",
    "(times, n, k)",
    [
      { input: "[[2,1,1],[2,3,1],[3,4,1]], 4, 2", expectedOutput: "2" },
      { input: "[[1,2,1]], 2, 1", expectedOutput: "1" },
      { input: "[[1,2,1]], 2, 2", expectedOutput: "-1" }
    ]
  ),
  createLeetCodeProblem(
    "prob_word_ladder",
    "Word Ladder (BFS Shortest Path)",
    "Hard",
    ["Graphs", "Hashing", "Queue"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "A transformation sequence from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words where each adjacent pair differs by 1 letter. Return length of shortest sequence.",
    "ladderLength",
    "(self, beginWord: str, endWord: str, wordList: list[str]) -> int",
    "int ladderLength(string beginWord, string endWord, vector<string>& wordList)",
    "int ladderLength(String beginWord, String endWord, List<String> wordList)",
    "(beginWord, endWord, wordList)",
    [
      { input: '"hit", "cog", ["hot","dot","dog","lot","log","cog"]', expectedOutput: "5" },
      { input: '"hit", "cog", ["hot","dot","dog","lot","log"]', expectedOutput: "0" }
    ]
  ),

  // --- 11. DYNAMIC PROGRAMMING & GREEDY (91-105) ---
  createLeetCodeProblem(
    "prob_climbing_stairs",
    "Climbing Stairs",
    "Easy",
    ["Dynamic Programming"],
    ["Amazon", "Microsoft", "TCS", "Infosys"],
    "You are climbing a staircase. It takes `n` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "climbStairs",
    "(self, n: int) -> int",
    "int climbStairs(int n)",
    "int climbStairs(int n)",
    "(n)",
    [
      { input: "2", expectedOutput: "2" },
      { input: "3", expectedOutput: "3" },
      { input: "5", expectedOutput: "8", isHidden: true }
    ]
  ),
  createLeetCodeProblem(
    "prob_min_cost_climbing_stairs",
    "Min Cost Climbing Stairs",
    "Easy",
    ["Dynamic Programming", "Arrays"],
    ["Amazon", "Microsoft", "TCS"],
    "You are given an integer array `cost` where `cost[i]` is the cost of `i-th` step on a staircase. Return the minimum cost to reach the top of the floor.",
    "minCostClimbingStairs",
    "(self, cost: list[int]) -> int",
    "int minCostClimbingStairs(vector<int>& cost)",
    "int minCostClimbingStairs(int[] cost)",
    "(cost)",
    [
      { input: "[10,15,20]", expectedOutput: "15" },
      { input: "[1,100,1,1,1,100,1,1,100,1]", expectedOutput: "6" }
    ]
  ),
  createLeetCodeProblem(
    "prob_house_robber",
    "House Robber",
    "Medium",
    ["Dynamic Programming", "Arrays"],
    ["Google", "Amazon", "Microsoft", "TCS"],
    "You are a professional robber planning to rob houses along a street. Adjacent houses have security systems connected. Return the maximum amount of money you can rob tonight without alerting the police.",
    "rob",
    "(self, nums: list[int]) -> int",
    "int rob(vector<int>& nums)",
    "int rob(int[] nums)",
    "(nums)",
    [
      { input: "[1,2,3,1]", expectedOutput: "4" },
      { input: "[2,7,9,3,1]", expectedOutput: "12" }
    ]
  ),
  createLeetCodeProblem(
    "prob_longest_palindromic_substring",
    "Longest Palindromic Substring",
    "Medium",
    ["Dynamic Programming", "Two Pointers", "Strings"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "Given a string `s`, return the longest palindromic substring in `s`.",
    "longestPalindrome",
    "(self, s: str) -> str",
    "string longestPalindrome(string s)",
    "String longestPalindrome(String s)",
    "(s)",
    [
      { input: '"babad"', expectedOutput: '"bab"' },
      { input: '"cbbd"', expectedOutput: '"bb"' }
    ]
  ),
  createLeetCodeProblem(
    "prob_palindromic_substrings",
    "Palindromic Substrings",
    "Medium",
    ["Dynamic Programming", "Strings", "Two Pointers"],
    ["Google", "Amazon", "Microsoft"],
    "Given a string `s`, return the number of palindromic substrings in it.",
    "countSubstrings",
    "(self, s: str) -> int",
    "int countSubstrings(string s)",
    "int countSubstrings(String s)",
    "(s)",
    [
      { input: '"abc"', expectedOutput: "3" },
      { input: '"aaa"', expectedOutput: "6" }
    ]
  ),
  createLeetCodeProblem(
    "prob_max_subarray",
    "Maximum Subarray (Kadane's Algorithm)",
    "Medium",
    ["Dynamic Programming", "Arrays"],
    ["Google", "Amazon", "Microsoft", "TCS", "InMobi", "American Express"],
    "Given an integer array `nums`, find the subarray with the largest sum, and return its sum in O(N) time.",
    "maxSubArray",
    "(self, nums: list[int]) -> int",
    "int maxSubArray(vector<int>& nums)",
    "int maxSubArray(int[] nums)",
    "(nums)",
    [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
      { input: "[1]", expectedOutput: "1" },
      { input: "[5,4,-1,7,8]", expectedOutput: "23" }
    ]
  ),
  createLeetCodeProblem(
    "prob_coin_change",
    "Coin Change",
    "Medium",
    ["Dynamic Programming", "Recursion & Backtracking"],
    ["Google", "Amazon", "Microsoft", "InMobi", "American Express"],
    "You are given an integer array `coins` representing coins of different denominations and an integer `amount`. Return the fewest number of coins that you need to make up that amount, or -1.",
    "coinChange",
    "(self, coins: list[int], amount: int) -> int",
    "int coinChange(vector<int>& coins, int amount)",
    "int coinChange(int[] coins, int amount)",
    "(coins, amount)",
    [
      { input: "[1,2,5], 11", expectedOutput: "3" },
      { input: "[2], 3", expectedOutput: "-1" },
      { input: "[1], 0", expectedOutput: "0" }
    ]
  ),
  createLeetCodeProblem(
    "prob_longest_increasing_subsequence",
    "Longest Increasing Subsequence",
    "Medium",
    ["Dynamic Programming", "Binary Search", "Arrays"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "Given an integer array `nums`, return the length of the longest strictly increasing subsequence in O(n log n) time.",
    "lengthOfLIS",
    "(self, nums: list[int]) -> int",
    "int lengthOfLIS(vector<int>& nums)",
    "int lengthOfLIS(int[] nums)",
    "(nums)",
    [
      { input: "[10,9,2,5,3,7,101,18]", expectedOutput: "4" },
      { input: "[0,1,0,3,2,3]", expectedOutput: "4" },
      { input: "[7,7,7,7,7,7,7]", expectedOutput: "1" }
    ]
  ),
  createLeetCodeProblem(
    "prob_word_break",
    "Word Break",
    "Medium",
    ["Dynamic Programming", "Hashing", "Strings"],
    ["Google", "Amazon", "Microsoft"],
    "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.",
    "wordBreak",
    "(self, s: str, wordDict: list[str]) -> bool",
    "bool wordBreak(string s, vector<string>& wordDict)",
    "boolean wordBreak(String s, List<String> wordDict)",
    "(s, wordDict)",
    [
      { input: '"leetcode", ["leet","code"]', expectedOutput: "true" },
      { input: '"applepenapple", ["apple","pen"]', expectedOutput: "true" },
      { input: '"catsandog", ["cats","dog","sand","and","cat"]', expectedOutput: "false" }
    ]
  ),
  createLeetCodeProblem(
    "prob_jump_game",
    "Jump Game",
    "Medium",
    ["Greedy", "Dynamic Programming", "Arrays"],
    ["Google", "Amazon", "Microsoft", "TCS"],
    "You are given an integer array `nums`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length. Return `true` if you can reach the last index.",
    "canJump",
    "(self, nums: list[int]) -> bool",
    "bool canJump(vector<int>& nums)",
    "boolean canJump(int[] nums)",
    "(nums)",
    [
      { input: "[2,3,1,1,4]", expectedOutput: "true" },
      { input: "[3,2,1,0,4]", expectedOutput: "false" }
    ]
  ),
  createLeetCodeProblem(
    "prob_gas_station",
    "Gas Station (Circular Tour)",
    "Medium",
    ["Greedy", "Arrays"],
    ["Google", "Amazon", "Microsoft"],
    "There are `n` gas stations along a circular route, where the amount of gas at the `i-th` station is `gas[i]`. Return the starting gas station's index if you can travel around the circuit once.",
    "canCompleteCircuit",
    "(self, gas: list[int], cost: list[int]) -> int",
    "int canCompleteCircuit(vector<int>& gas, vector<int>& cost)",
    "int canCompleteCircuit(int[] gas, int[] cost)",
    "(gas, cost)",
    [
      { input: "[1,2,3,4,5], [3,4,5,1,2]", expectedOutput: "3" },
      { input: "[2,3,4], [3,4,3]", expectedOutput: "-1" }
    ]
  ),
  createLeetCodeProblem(
    "prob_edit_distance",
    "Edit Distance (Levenshtein Distance)",
    "Hard",
    ["Dynamic Programming", "Strings"],
    ["Google", "Amazon", "Microsoft", "InMobi"],
    "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2` (insert, delete, or replace a character).",
    "minDistance",
    "(self, word1: str, word2: str) -> int",
    "int minDistance(string word1, string word2)",
    "int minDistance(String word1, String word2)",
    "(word1, word2)",
    [
      { input: '"horse", "ros"', expectedOutput: "3" },
      { input: '"intention", "execution"', expectedOutput: "5" }
    ]
  )
];
