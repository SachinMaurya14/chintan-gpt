import { DSAInterviewProblem } from "./dsaQuestionTypes.js";

export const DSA_BATCH_6_HEAPS_PRIORITY_QUEUE_GREEDY: DSAInterviewProblem[] = [
  {
    id: "Q101",
    questionNumber: 101,
    title: "Kth Largest Element in an Array",
    statement:
      "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in the sorted order, not the kth distinct element. Can you solve it without sorting in O(N) average or O(N log K) time?",
    difficulty: "Medium",
    pattern: "Min-Heap of Size K / QuickSelect Partitioning",
    constraints: [
      "1 <= k <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    expectedTimeComplexity: "O(N log K) with Min-Heap or O(N) average with QuickSelect",
    expectedSpaceComplexity: "O(K) for Min-Heap",
    examples: [
      {
        input: "nums = [3,2,1,5,6,4], k = 2",
        output: "5",
        explanation: "The sorted array is [1,2,3,4,5,6], second largest is 5."
      },
      {
        input: "nums = [3,2,3,1,2,4,5,5,6], k = 4",
        output: "4",
        explanation: "4th largest element is 4."
      }
    ],
    explanation:
      "Maintain a min-heap containing at most `k` elements. Iterate through each number in `nums`, pushing it into the min-heap. If the heap size exceeds `k`, pop the smallest element. After processing all elements, the min-heap retains the `k` largest elements in the array, and its top element is the `k`th largest.",
    interviewInsight:
      "A min-heap of size K guarantees bounded heap operations and is ideal for online streaming inputs where the entire array is not known upfront.",
    cppSolution: `class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int num : nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.top();
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        min_heap = []
        for num in nums:
            heapq.heappush(min_heap, num)
            if len(min_heap) > k:
                heapq.heappop(min_heap)
        return min_heap[0]`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q102",
    questionNumber: 102,
    title: "Top K Frequent Elements",
    statement:
      "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order. Your algorithm's time complexity must be better than O(n log n), where n is the array's size.",
    difficulty: "Medium",
    pattern: "Hash Map Frequency Counting + Min-Heap of Size K",
    constraints: [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
      "k is in the range [1, the number of unique elements in the array].",
      "It is guaranteed that the answer is unique."
    ],
    expectedTimeComplexity: "O(N log K)",
    expectedSpaceComplexity: "O(N + K)",
    examples: [
      {
        input: "nums = [1,1,1,2,2,3], k = 2",
        output: "[1,2]",
        explanation: "1 appears 3 times, 2 appears 2 times, 3 appears 1 time."
      }
    ],
    explanation:
      "Count the frequencies of all numbers in a hash map `freq`. Maintain a min-heap storing `{frequency, number}`. For each entry in `freq`, push it to the min-heap. If heap size exceeds `k`, pop the top element (which has smallest frequency). Finally, extract the `k` numbers remaining in the heap.",
    interviewInsight:
      "Heap-based Top-K maintains optimal performance even when memory is limited or frequencies update dynamically.",
    cppSolution: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> freq;
        for (int x : nums) freq[x]++;
        
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;
        for (auto& [val, count] : freq) {
            minHeap.push({count, val});
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        
        vector<int> result;
        while (!minHeap.empty()) {
            result.push_back(minHeap.top().second);
            minHeap.pop();
        }
        return result;
    }
};`,
    pythonSolution: `import heapq
from collections import Counter

class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        counts = Counter(nums)
        min_heap = []
        
        for num, freq in counts.items():
            heapq.heappush(min_heap, (freq, num))
            if len(min_heap) > k:
                heapq.heappop(min_heap)
                
        return [num for freq, num in min_heap]`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q103",
    questionNumber: 103,
    title: "Task Scheduler",
    statement:
      "Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle. However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the tasks array), that is that there must be at least n units of time between any two identical tasks. Return the least number of units of times that the CPU will take to finish all the given tasks.",
    difficulty: "Medium",
    pattern: "Greedy Most-Frequent Bottleneck / Max-Heap Simulation",
    constraints: [
      "1 <= tasks.length <= 10^4",
      "tasks[i] is uppercase English letter.",
      "0 <= n <= 100"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1) alphabet size",
    examples: [
      {
        input: 'tasks = ["A","A","A","B","B","B"], n = 2',
        output: "8",
        explanation: "A -> B -> idle -> A -> B -> idle -> A -> B. Total time = 8."
      }
    ],
    explanation:
      "Find the maximum frequency `maxFreq` among all tasks. Let `maxCount` be the count of tasks having this `maxFreq`. These bottleneck tasks create `(maxFreq - 1)` frames, each having `(n + 1)` slots. The final frame has `maxCount` tasks. The minimum theoretical time required is `(maxFreq - 1) * (n + 1) + maxCount`. The actual answer is `max((int)tasks.size(), (maxFreq - 1) * (n + 1) + maxCount)`.",
    interviewInsight:
      "The most frequent tasks dictate the minimum frame layout; any remaining lower-frequency tasks fill idle slots without expanding the schedule length.",
    cppSolution: `class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> freq(26, 0);
        int maxFreq = 0;
        for (char c : tasks) {
            freq[c - 'A']++;
            maxFreq = max(maxFreq, freq[c - 'A']);
        }
        
        int maxCount = 0;
        for (int f : freq) {
            if (f == maxFreq) maxCount++;
        }
        
        int minIntervals = (maxFreq - 1) * (n + 1) + maxCount;
        return max((int)tasks.size(), minIntervals);
    }
};`,
    pythonSolution: `from collections import Counter

class Solution:
    def leastInterval(self, tasks: list[str], n: int) -> int:
        counts = Counter(tasks)
        max_freq = max(counts.values())
        max_count = sum(1 for f in counts.values() if f == max_freq)
        
        min_intervals = (max_freq - 1) * (n + 1) + max_count
        return max(len(tasks), min_intervals)`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q104",
    questionNumber: 104,
    title: "Meeting Rooms II",
    statement:
      "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
    difficulty: "Medium",
    pattern: "Min-Heap of Active End Times / Greedy Interval Scheduling",
    constraints: [
      "1 <= intervals.length <= 10^4",
      "0 <= starti < endi <= 10^6"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "intervals = [[0,30],[5,10],[15,20]]",
        output: "2",
        explanation: "Meeting [0,30] overlaps with [5,10] and [15,20], so at least 2 rooms are needed."
      },
      {
        input: "intervals = [[7,10],[2,4]]",
        output: "1",
        explanation: "No overlap, 1 room suffices."
      }
    ],
    explanation:
      "Sort intervals by start time. Maintain a min-heap `endTimes` storing the end times of active meetings in occupied rooms. For each interval `[start, end]`: if the earliest meeting has already ended (`endTimes.top() <= start`), pop it from the heap to reuse that room. Push the current meeting's `end` time into the heap. The maximum size reached by `endTimes` (its final size) is the minimum rooms required.",
    interviewInsight:
      "The min-heap tracks the room that will free up earliest, making the greedy room-reuse decision $\\mathcal{O}(\\log K)$.",
    cppSolution: `class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end());
        
        priority_queue<int, vector<int>, greater<int>> minHeap;
        minHeap.push(intervals[0][1]);
        
        for (size_t i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] >= minHeap.top()) {
                minHeap.pop(); // Reuse room
            }
            minHeap.push(intervals[i][1]);
        }
        return minHeap.size();
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def minMeetingRooms(self, intervals: list[list[int]]) -> int:
        if not intervals:
            return 0
        intervals.sort(key=lambda x: x[0])
        
        min_heap = []
        heapq.heappush(min_heap, intervals[0][1])
        
        for start, end in intervals[1:]:
            if start >= min_heap[0]:
                heapq.heappop(min_heap)
            heapq.heappush(min_heap, end)
            
        return len(min_heap)`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q105",
    questionNumber: 105,
    title: "Reorganize String",
    statement:
      "Given a string s, rearrange the characters of s so that any two adjacent characters are not the same. Return any possible rearrangement of s or return \"\" if not possible.",
    difficulty: "Medium",
    pattern: "Max-Heap Greedy Most-Frequent Interleaving",
    constraints: [
      "1 <= s.length <= 500",
      "s consists of lowercase English letters."
    ],
    expectedTimeComplexity: "O(N log A) where A <= 26 alphabet size",
    expectedSpaceComplexity: "O(A)",
    examples: [
      {
        input: 's = "aab"',
        output: '"aba"',
        explanation: 'Characters are rearranged so no two adjacent characters are identical.'
      },
      {
        input: 's = "aaab"',
        output: '""',
        explanation: 'Impossible to reorganize without adjacent identical characters.'
      }
    ],
    explanation:
      "Count character frequencies. If any character frequency exceeds `(s.length + 1) / 2`, it is impossible to separate them -> return `\"\"`. Push all `{frequency, char}` into a max-heap. In each step, greedily pop the two most frequent characters, append them to the result string, decrement their frequencies, and push back if their remaining count > 0.",
    interviewInsight:
      "Pairing the top two most frequent elements simultaneously guarantees that the current highest-frequency character is never placed adjacent to itself.",
    cppSolution: `class Solution {
public:
    string reorganizeString(string s) {
        vector<int> freq(26, 0);
        for (char c : s) freq[c - 'a']++;
        
        priority_queue<pair<int, char>> maxHeap;
        for (int i = 0; i < 26; i++) {
            if (freq[i] > (s.size() + 1) / 2) return "";
            if (freq[i] > 0) maxHeap.push({freq[i], 'a' + i});
        }
        
        string result = "";
        while (maxHeap.size() >= 2) {
            auto [f1, c1] = maxHeap.top(); maxHeap.pop();
            auto [f2, c2] = maxHeap.top(); maxHeap.pop();
            
            result += c1;
            result += c2;
            
            if (--f1 > 0) maxHeap.push({f1, c1});
            if (--f2 > 0) maxHeap.push({f2, c2});
        }
        
        if (!maxHeap.empty()) {
            result += maxHeap.top().second;
        }
        return result;
    }
};`,
    pythonSolution: `import heapq
from collections import Counter

class Solution:
    def reorganizeString(self, s: str) -> str:
        counts = Counter(s)
        max_freq = max(counts.values())
        if max_freq > (len(s) + 1) // 2:
            return ""
            
        max_heap = [(-freq, c) for c, freq in counts.items()]
        heapq.heapify(max_heap)
        
        result = []
        while len(max_heap) >= 2:
            f1, c1 = heapq.heappop(max_heap)
            f2, c2 = heapq.heappop(max_heap)
            
            result.extend([c1, c2])
            
            if f1 + 1 < 0:
                heapq.heappush(max_heap, (f1 + 1, c1))
            if f2 + 1 < 0:
                heapq.heappush(max_heap, (f2 + 1, c2))
                
        if max_heap:
            result.append(max_heap[0][1])
            
        return "".join(result)`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q106",
    questionNumber: 106,
    title: "Gas Station (Circular Tour)",
    statement:
      "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i]. You have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations. Given two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1. If there exists a solution, it is guaranteed to be unique.",
    difficulty: "Medium",
    pattern: "Single-Pass Greedy Running Balance / Total Invariant",
    constraints: [
      "n == gas.length == cost.length",
      "1 <= n <= 10^5",
      "0 <= gas[i], cost[i] <= 10^4"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
        output: "3",
        explanation: "Start at station 3 (index 3). Fill 4 gas, cost 1. Tank = 3. Travel to 4, 0, 1, 2 and return to 3 successfully."
      }
    ],
    explanation:
      "1. If `sum(gas) < sum(cost)`, completing a full circle is mathematically impossible -> return -1. 2. Track `currentTank`. As we iterate through stations `i`, update `currentTank += gas[i] - cost[i]`. If `currentTank < 0`, it means starting at any station from `startIndex` up to `i` will fail at `i`. Therefore, greedily reset `startIndex = i + 1` and `currentTank = 0`. Return `startIndex`.",
    interviewInsight:
      "Mathematical invariant: If the overall net gas sum is positive, any station after the last negative deficit point is guaranteed to complete the entire circular tour.",
    cppSolution: `class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int totalSurplus = 0;
        int currentTank = 0;
        int startIndex = 0;
        
        for (size_t i = 0; i < gas.size(); i++) {
            totalSurplus += gas[i] - cost[i];
            currentTank += gas[i] - cost[i];
            
            if (currentTank < 0) {
                startIndex = i + 1;
                currentTank = 0;
            }
        }
        return (totalSurplus >= 0) ? startIndex : -1;
    }
};`,
    pythonSolution: `class Solution:
    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:
        if sum(gas) < sum(cost):
            return -1
            
        total_surplus = 0
        curr_tank = 0
        start_idx = 0
        
        for i in range(len(gas)):
            curr_tank += gas[i] - cost[i]
            if curr_tank < 0:
                start_idx = i + 1
                curr_tank = 0
                
        return start_idx`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q107",
    questionNumber: 107,
    title: "Jump Game II",
    statement:
      "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where: 0 <= j <= nums[i] and i + j < n. Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].",
    difficulty: "Medium",
    pattern: "Greedy BFS Window Jump Progression",
    constraints: [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 1000"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1)",
    examples: [
      {
        input: "nums = [2,3,1,1,4]",
        output: "2",
        explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index."
      }
    ],
    explanation:
      "Think of the indices reachable with `k` jumps as a BFS level window `[currentStart, currentEnd]`. Track `farthest = max(farthest, i + nums[i])`. When loop index `i` reaches `currentEnd`, it means we must take one more jump (`jumps++`), so update `currentEnd = farthest`. Stop when `currentEnd >= n - 1`.",
    interviewInsight:
      "Implicit BFS level-windowing runs in pure O(N) time and O(1) space, avoiding expensive DP or explicit queue overhead.",
    cppSolution: `class Solution {
public:
    int jump(vector<int>& nums) {
        if (nums.size() <= 1) return 0;
        
        int jumps = 0;
        int currentEnd = 0;
        int farthest = 0;
        
        for (int i = 0; i < (int)nums.size() - 1; i++) {
            farthest = max(farthest, i + nums[i]);
            
            if (i == currentEnd) {
                jumps++;
                currentEnd = farthest;
                if (currentEnd >= (int)nums.size() - 1) break;
            }
        }
        return jumps;
    }
};`,
    pythonSolution: `class Solution:
    def jump(self, nums: list[int]) -> int:
        if len(nums) <= 1:
            return 0
            
        jumps = 0
        current_end = 0
        farthest = 0
        
        for i in range(len(nums) - 1):
            farthest = max(farthest, i + nums[i])
            if i == current_end:
                jumps += 1
                current_end = farthest
                if current_end >= len(nums) - 1:
                    break
                    
        return jumps`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q108",
    questionNumber: 108,
    title: "Find Median from Data Stream",
    statement:
      "The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values. Implement the MedianFinder class: (1) MedianFinder() initializes the MedianFinder object. (2) void addNum(int num) adds the integer num from the data stream to the data structure. (3) double findMedian() returns the median of all elements so far.",
    difficulty: "Hard",
    pattern: "Two Heaps Technique (Max-Heap Lower Half + Min-Heap Upper Half)",
    constraints: [
      "-10^5 <= num <= 10^5",
      "There will be at least one element in the data structure before calling findMedian.",
      "At most 5 * 10^4 calls will be made to addNum and findMedian."
    ],
    expectedTimeComplexity: "addNum: O(log N), findMedian: O(1)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]',
        output: "[null, null, null, 1.5, null, 2.0]",
        explanation: "1 -> median 1. 1, 2 -> median 1.5. 1, 2, 3 -> median 2."
      }
    ],
    explanation:
      "Partition incoming numbers into two halves: a max-heap `lowerHalf` (storing the smaller half) and a min-heap `upperHalf` (storing the larger half). Invariant: `lowerHalf.size() == upperHalf.size()` or `lowerHalf.size() == upperHalf.size() + 1`, and every element in `lowerHalf` <= every element in `upperHalf`. On `findMedian()`, if `lowerHalf.size() > upperHalf.size()`, return `lowerHalf.top()`; otherwise return average of tops.",
    interviewInsight:
      "By balancing two heaps, we achieve O(log N) insertion and O(1) query without sorting or maintaining complex self-balancing BSTs.",
    cppSolution: `class MedianFinder {
private:
    priority_queue<int> lowerHalf; // max-heap
    priority_queue<int, vector<int>, greater<int>> upperHalf; // min-heap
public:
    MedianFinder() {}
    
    void addNum(int num) {
        if (lowerHalf.empty() || num <= lowerHalf.top()) {
            lowerHalf.push(num);
        } else {
            upperHalf.push(num);
        }
        
        // Rebalance sizes
        if (lowerHalf.size() > upperHalf.size() + 1) {
            upperHalf.push(lowerHalf.top());
            lowerHalf.pop();
        } else if (upperHalf.size() > lowerHalf.size()) {
            lowerHalf.push(upperHalf.top());
            upperHalf.pop();
        }
    }
    
    double findMedian() {
        if (lowerHalf.size() > upperHalf.size()) {
            return lowerHalf.top();
        }
        return (lowerHalf.top() + upperHalf.top()) / 2.0;
    }
};`,
    pythonSolution: `import heapq

class MedianFinder:
    def __init__(self):
        self.lower = [] # max-heap (negated)
        self.upper = [] # min-heap

    def addNum(self, num: int) -> None:
        if not self.lower or num <= -self.lower[0]:
            heapq.heappush(self.lower, -num)
        else:
            heapq.heappush(self.upper, num)
            
        if len(self.lower) > len(self.upper) + 1:
            val = -heapq.heappop(self.lower)
            heapq.heappush(self.upper, val)
        elif len(self.upper) > len(self.lower):
            val = heapq.heappop(self.upper)
            heapq.heappush(self.lower, -val)

    def findMedian(self) -> float:
        if len(self.lower) > len(self.upper):
            return -self.lower[0]
        return (-self.lower[0] + self.upper[0]) / 2.0`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q109",
    questionNumber: 109,
    title: "Merge k Sorted Lists",
    statement:
      "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    difficulty: "Hard",
    pattern: "K-Way Merge with Min-Priority Queue",
    constraints: [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4",
      "lists[i] is sorted in ascending order.",
      "The sum of lists[i].length will not exceed 10^4."
    ],
    expectedTimeComplexity: "O(N log K) where N is total nodes, K is number of lists",
    expectedSpaceComplexity: "O(K) for priority queue",
    examples: [
      {
        input: "lists = [[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation: "All lists merged into one sorted linked list."
      }
    ],
    explanation:
      "Initialize a min-heap comparing ListNode values. Push the head node of each of the `k` non-empty lists into the min-heap. Pop the smallest node `top`, attach it to the merged list tail, and if `top->next` exists, push `top->next` into the min-heap. Repeat until heap is empty.",
    interviewInsight:
      "Storing only one head node per list in the priority queue bounds heap memory to $\\mathcal{O}(K)$ regardless of list lengths.",
    cppSolution: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
    struct Compare {
        bool operator()(ListNode* a, ListNode* b) {
            return a->val > b->val;
        }
    };
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Compare> minHeap;
        for (ListNode* head : lists) {
            if (head) minHeap.push(head);
        }
        
        ListNode dummy(0);
        ListNode* tail = &dummy;
        
        while (!minHeap.empty()) {
            ListNode* node = minHeap.top();
            minHeap.pop();
            
            tail->next = node;
            tail = tail->next;
            
            if (node->next) {
                minHeap.push(node->next);
            }
        }
        return dummy.next;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def mergeKLists(self, lists: list[Optional[ListNode]]) -> Optional[ListNode]:
        min_heap = []
        for i, node in enumerate(lists):
            if node:
                heapq.heappush(min_heap, (node.val, i, node))
                
        dummy = ListNode(0)
        tail = dummy
        
        while min_heap:
            val, i, node = heapq.heappop(min_heap)
            tail.next = node
            tail = tail.next
            
            if node.next:
                heapq.heappush(min_heap, (node.next.val, i, node.next))
                
        return dummy.next`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q110",
    questionNumber: 110,
    title: "Minimum Cost to Hire K Workers",
    statement:
      "There are n workers. You are given two integer arrays quality and wage where quality[i] is the quality of the ith worker and wage[i] is the minimum wage expectation for the ith worker. We want to hire exactly k workers to form a paid group. Every worker in the paid group should be paid in the ratio of their quality compared to other workers in the paid group, and every worker in the paid group must be paid at least their minimum wage expectation. Return the least amount of money needed to form a paid group satisfying the conditions.",
    difficulty: "Hard",
    pattern: "Wage/Quality Ratio Sorting + Max-Heap Quality Window",
    constraints: [
      "n == quality.length == wage.length",
      "1 <= k <= n <= 10^4",
      "1 <= quality[i], wage[i] <= 10^4"
    ],
    expectedTimeComplexity: "O(N log N + N log K)",
    expectedSpaceComplexity: "O(N + K)",
    examples: [
      {
        input: "quality = [10,20,5], wage = [70,50,30], k = 2",
        output: "105.00000",
        explanation: "We pay 70 to 0th worker and 35 to 2nd worker."
      }
    ],
    explanation:
      "Let ratio `r = wage[i] / quality[i]`. If worker `i` has the maximum ratio in a group of `k` workers, then every worker in that group is paid `quality[j] * r`. To minimize total wage `sum(quality) * r`, we sort all workers by their ratio `r` in ascending order. We iterate through workers, maintaining a max-heap of qualities of size `k` and tracking `qualitySum`. When heap size reaches `k`, calculate `minCost = min(minCost, qualitySum * r)`. If heap size exceeds `k`, evict the worker with largest quality.",
    interviewInsight:
      "Sorting by ratio fixes the wage multiplier, reducing the remaining subproblem to greedily picking the `k` smallest qualities seen so far using a max-heap.",
    cppSolution: `class Solution {
public:
    double mincostToHireWorkers(vector<int>& quality, vector<int>& wage, int k) {
        int n = quality.size();
        vector<pair<double, int>> workers(n);
        for (int i = 0; i < n; i++) {
            workers[i] = {(double)wage[i] / quality[i], quality[i]};
        }
        sort(workers.begin(), workers.end());
        
        priority_queue<int> maxHeap;
        int qualitySum = 0;
        double minTotalCost = DBL_MAX;
        
        for (auto& [ratio, q] : workers) {
            qualitySum += q;
            maxHeap.push(q);
            
            if ((int)maxHeap.size() > k) {
                qualitySum -= maxHeap.top();
                maxHeap.pop();
            }
            
            if ((int)maxHeap.size() == k) {
                minTotalCost = min(minTotalCost, qualitySum * ratio);
            }
        }
        return minTotalCost;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def mincostToHireWorkers(self, quality: list[int], wage: list[int], k: int) -> float:
        workers = sorted([(w / q, q) for q, w in zip(quality, wage)])
        max_heap = []
        quality_sum = 0
        min_cost = float('inf')
        
        for ratio, q in workers:
            quality_sum += q
            heapq.heappush(max_heap, -q)
            
            if len(max_heap) > k:
                quality_sum += heapq.heappop(max_heap)
                
            if len(max_heap) == k:
                min_cost = min(min_cost, quality_sum * ratio)
                
        return min_cost`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q111",
    questionNumber: 111,
    title: "Candy",
    statement:
      "There are n children standing in a line. Each child is assigned a rating value given in the integer array ratings. You are giving candies to these children subjected to the following requirements: (1) Each child must have at least one candy. (2) Children with a higher rating get more candies than their neighbors. Return the minimum number of candies you need to have to distribute the candies to the children.",
    difficulty: "Hard",
    pattern: "Two-Pass Bidirectional Greedy Rating Satisfaction",
    constraints: [
      "n == ratings.length",
      "1 <= n <= 2 * 10^4",
      "0 <= ratings[i] <= 2 * 10^4"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "ratings = [1,0,2]",
        output: "5",
        explanation: "Allocate candies: [2,1,2]."
      },
      {
        input: "ratings = [1,2,2]",
        output: "4",
        explanation: "Allocate candies: [1,2,1]."
      }
    ],
    explanation:
      "Initialize `candies` array with 1 for each child. Left-to-Right pass: if `ratings[i] > ratings[i - 1]`, set `candies[i] = candies[i - 1] + 1` (satisfies left neighbor constraint). Right-to-Left pass: if `ratings[i] > ratings[i + 1]`, update `candies[i] = max(candies[i], candies[i + 1] + 1)` (satisfies right neighbor without violating left neighbor). Sum `candies` array.",
    interviewInsight:
      "Decoupling the left and right neighbor constraints into two independent directional sweeps resolves complex local extrema in linear time.",
    cppSolution: `class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> candies(n, 1);
        
        for (int i = 1; i < n; i++) {
            if (ratings[i] > ratings[i - 1]) {
                candies[i] = candies[i - 1] + 1;
            }
        }
        
        for (int i = n - 2; i >= 0; i--) {
            if (ratings[i] > ratings[i + 1]) {
                candies[i] = max(candies[i], candies[i + 1] + 1);
            }
        }
        
        return accumulate(candies.begin(), candies.end(), 0);
    }
};`,
    pythonSolution: `class Solution:
    def candy(self, ratings: list[int]) -> int:
        n = len(ratings)
        candies = [1] * n
        
        for i in range(1, n):
            if ratings[i] > ratings[i - 1]:
                candies[i] = candies[i - 1] + 1
                
        for i in range(n - 2, -1, -1):
            if ratings[i] > ratings[i + 1]:
                candies[i] = max(candies[i], candies[i + 1] + 1)
                
        return sum(candies)`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q112",
    questionNumber: 112,
    title: "IPO (Maximize Capital)",
    statement:
      "Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since the resources are limited, it can only finish at most k distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most k distinct projects. You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it. Initially, you have w capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital. Pick a list of at most k distinct projects to maximize your final capital.",
    difficulty: "Hard",
    pattern: "Dual Priority Queue (Available vs Capital Thresholds)",
    constraints: [
      "1 <= k <= 10^5",
      "0 <= w <= 10^9",
      "n == profits.length == capital.length",
      "1 <= n <= 10^5",
      "0 <= profits[i] <= 10^4",
      "0 <= capital[i] <= 10^9"
    ],
    expectedTimeComplexity: "O(N log N + K log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]",
        output: "4",
        explanation: "Start project 0 (capital 0, profit 1) -> capital becomes 1. Next start project 2 (capital 1, profit 3) -> final capital = 4."
      }
    ],
    explanation:
      "Pair all projects `(capital[i], profits[i])` and sort them by capital ascending. Use a max-heap `availableProfits`. In each of the `k` project rounds: while projects remain whose `capital <= currentCapital w`, push their profits into `availableProfits`. If `availableProfits` is empty, no further projects can be funded -> break. Otherwise pop the maximum available profit and add it to `w`. Return `w`.",
    interviewInsight:
      "Separating projects into an un-unlockable queue and an unlocked max-profit heap eliminates re-scanning previously considered projects.",
    cppSolution: `class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {
        int n = profits.size();
        vector<pair<int, int>> projects(n);
        for (int i = 0; i < n; i++) {
            projects[i] = {capital[i], profits[i]};
        }
        sort(projects.begin(), projects.end());
        
        priority_queue<int> maxProfit;
        int idx = 0;
        
        for (int step = 0; step < k; step++) {
            while (idx < n && projects[idx].first <= w) {
                maxProfit.push(projects[idx].second);
                idx++;
            }
            
            if (maxProfit.empty()) break;
            
            w += maxProfit.top();
            maxProfit.pop();
        }
        return w;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: list[int], capital: list[int]) -> int:
        projects = sorted(zip(capital, profits))
        max_profit = []
        idx = 0
        n = len(projects)
        
        for _ in range(k):
            while idx < n and projects[idx][0] <= w:
                heapq.heappush(max_profit, -projects[idx][1])
                idx += 1
                
            if not max_profit:
                break
                
            w += -heapq.heappop(max_profit)
            
        return w`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q113",
    questionNumber: 113,
    title: "Minimum Number of Refueling Stops",
    statement:
      "A car travels from a starting position to a destination which is target miles east of the starting position. There are gas stations along the way represented by stations[i] = [positioni, fueli]. The car starts with startFuel liters of fuel. It uses 1 liter of gas per 1 mile. When the car reaches a gas station, it may stop and refuel, transferring all the gas from the station into the car. What is the least number of refueling stops the car must make to reach its destination? If it cannot reach the destination, return -1.",
    difficulty: "Hard",
    pattern: "Greedy Max-Heap Fuel Buffering (Deferred Refuel)",
    constraints: [
      "1 <= target, startFuel <= 10^9",
      "0 <= stations.length <= 500",
      "1 <= positioni < positioni+1 < target",
      "1 <= fueli <= 10^9"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]]",
        output: "2",
        explanation: "Stop at station 0 (fuel 60) and station 3 (fuel 40) to reach target 100."
      }
    ],
    explanation:
      "Simulate continuous driving. Maintain `currentDistance = startFuel` and a max-heap of fuel amounts from stations passed so far. When `currentDistance < nextStationPosition`: greedily refuel from the passed station that has the largest available fuel (`currentDistance += maxHeap.top()`, `stops++`). If the heap becomes empty before reaching the next station/target, return -1.",
    interviewInsight:
      "Treat passed stations as available options stored in a max-heap; we only retroactively refuel at the largest station when our current fuel runs out.",
    cppSolution: `class Solution {
public:
    int minRefuelStops(int target, int startFuel, vector<vector<int>>& stations) {
        priority_queue<int> maxHeap;
        long long currentFuel = startFuel;
        int stops = 0;
        int idx = 0, n = stations.size();
        
        while (currentFuel < target) {
            while (idx < n && stations[idx][0] <= currentFuel) {
                maxHeap.push(stations[idx][1]);
                idx++;
            }
            
            if (maxHeap.empty()) return -1;
            
            currentFuel += maxHeap.top();
            maxHeap.pop();
            stops++;
        }
        return stops;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def minRefuelStops(self, target: int, startFuel: int, stations: list[list[int]]) -> int:
        max_heap = []
        curr_fuel = startFuel
        stops = 0
        idx = 0
        n = len(stations)
        
        while curr_fuel < target:
            while idx < n and stations[idx][0] <= curr_fuel:
                heapq.heappush(max_heap, -stations[idx][1])
                idx += 1
                
            if not max_heap:
                return -1
                
            curr_fuel += -heapq.heappop(max_heap)
            stops += 1
            
        return stops`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q114",
    questionNumber: 114,
    title: "Course Schedule III",
    statement:
      "There are n different online courses numbered from 1 to n. You are given an array courses where courses[i] = [durationi, lastDayi] indicate that the ith course should be taken continuously for durationi days and must be finished before or on lastDayi. You will start on the 1st day and you cannot take two or more courses simultaneously. Return the maximum number of courses that you can take.",
    difficulty: "Hard",
    pattern: "Greedy Deadline Sort + Max-Heap Duration Eviction",
    constraints: [
      "1 <= courses.length <= 10^4",
      "1 <= durationi, lastDayi <= 10^4"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "courses = [[100,200],[200,1300],[1000,1250],[2000,3200]]",
        output: "3",
        explanation: "Take courses [100,200], [1000,1250], and [200,1300] taking total time 1300 <= 1300."
      }
    ],
    explanation:
      "Sort all courses by their deadline `lastDay` ascending. Track `totalTime = 0` and maintain a max-heap of taken course durations. For each course `[duration, lastDay]`: add course to heap and `totalTime += duration`. If `totalTime > lastDay`, greedily evict the course with the longest duration from the heap (`totalTime -= maxHeap.top()`, `maxHeap.pop()`). The final heap size is the maximum courses taken.",
    interviewInsight:
      "Replacing a previously chosen long course with a shorter course frees up the maximum possible time while preserving total course count and valid deadlines.",
    cppSolution: `class Solution {
public:
    int scheduleCourse(vector<vector<int>>& courses) {
        sort(courses.begin(), courses.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        
        priority_queue<int> maxHeap;
        int totalTime = 0;
        
        for (auto& c : courses) {
            int duration = c[0], lastDay = c[1];
            totalTime += duration;
            maxHeap.push(duration);
            
            if (totalTime > lastDay) {
                totalTime -= maxHeap.top();
                maxHeap.pop();
            }
        }
        return maxHeap.size();
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def scheduleCourse(self, courses: list[list[int]]) -> int:
        courses.sort(key=lambda x: x[1])
        max_heap = []
        total_time = 0
        
        for duration, last_day in courses:
            total_time += duration
            heapq.heappush(max_heap, -duration)
            
            if total_time > last_day:
                longest = -heapq.heappop(max_heap)
                total_time -= longest
                
        return len(max_heap)`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q115",
    questionNumber: 115,
    title: "Find K Pairs with Smallest Sums",
    statement:
      "You are given two integer arrays nums1 and nums2 sorted in non-decreasing order and an integer k. Define a pair (u, v) which consists of one element from nums1 and one element from nums2. Return the k pairs (u1, v1), (u2, v2), ..., (uk, vk) with the smallest sums.",
    difficulty: "Hard",
    pattern: "Min-Heap Frontier Expansion on 2D Sorted Coordinate Grid",
    constraints: [
      "1 <= nums1.length, nums2.length <= 10^5",
      "-10^9 <= nums1[i], nums2[i] <= 10^9",
      "nums1 and nums2 are sorted in non-decreasing order.",
      "1 <= k <= 10^4",
      "k <= nums1.length * nums2.length"
    ],
    expectedTimeComplexity: "O(K log K)",
    expectedSpaceComplexity: "O(K)",
    examples: [
      {
        input: "nums1 = [1,7,11], nums2 = [2,4,6], k = 3",
        output: "[[1,2],[1,4],[1,6]]",
        explanation: "The first 3 pairs with smallest sums are [1,2], [1,4], [1,6]."
      }
    ],
    explanation:
      "Represent the Cartesian product `nums1 x nums2` as a 2D matrix where `grid[i][j] = nums1[i] + nums2[j]`. Both rows and columns are sorted. Push initial row heads `(nums1[i] + nums2[0], i, 0)` for `i` from `0` to `min((int)nums1.size(), k)` into a min-heap. In each step, pop the smallest pair `(i, j)`, add `[nums1[i], nums2[j]]` to result. If `j + 1 < nums2.size()`, push the right neighbor `(nums1[i] + nums2[j + 1], i, j + 1)` into the heap.",
    interviewInsight:
      "Advancing only along column indices `j -> j + 1` for each row prevents duplicate coordinate insertions without needing an expensive visited set.",
    cppSolution: `class Solution {
public:
    vector<vector<int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {
        vector<vector<int>> result;
        if (nums1.empty() || nums2.empty() || k == 0) return result;
        
        // {sum, {i, j}}
        auto comp = [&](const tuple<int, int, int>& a, const tuple<int, int, int>& b) {
            return get<0>(a) > get<0>(b);
        };
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, decltype(comp)> minHeap(comp);
        
        for (int i = 0; i < min((int)nums1.size(), k); i++) {
            minHeap.push({nums1[i] + nums2[0], i, 0});
        }
        
        while (!minHeap.empty() && (int)result.size() < k) {
            auto [sum, i, j] = minHeap.top();
            minHeap.pop();
            
            result.push_back({nums1[i], nums2[j]});
            
            if (j + 1 < (int)nums2.size()) {
                minHeap.push({nums1[i] + nums2[j + 1], i, j + 1});
            }
        }
        return result;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def kSmallestPairs(self, nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:
        if not nums1 or not nums2 or k == 0:
            return []
            
        min_heap = []
        for i in range(min(len(nums1), k)):
            heapq.heappush(min_heap, (nums1[i] + nums2[0], i, 0))
            
        result = []
        while min_heap and len(result) < k:
            val, i, j = heapq.heappop(min_heap)
            result.append([nums1[i], nums2[j]])
            
            if j + 1 < len(nums2):
                heapq.heappush(min_heap, (nums1[i] + nums2[j + 1], i, j + 1))
                
        return result`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q116",
    questionNumber: 116,
    title: "Minimum Interval to Include Each Query",
    statement:
      "You are given a 2D integer array intervals, where intervals[i] = [lefti, righti] describes the ith interval starting at lefti and ending at righti (inclusive). The size of an interval is its length righti - lefti + 1. You are also given an integer array queries. The answer to the jth query is the size of the smallest interval i such that lefti <= queries[j] <= righti. If no such interval exists, the answer is -1. Return an array result containing the answers to the queries.",
    difficulty: "Hard",
    pattern: "Offline Query Sorting + Min-Heap Active Interval Sweeping",
    constraints: [
      "1 <= intervals.length <= 10^5",
      "1 <= queries.length <= 10^5",
      "intervals[i].length == 2",
      "1 <= lefti <= righti <= 10^7",
      "1 <= queries[j] <= 10^7"
    ],
    expectedTimeComplexity: "O(N log N + Q log Q)",
    expectedSpaceComplexity: "O(N + Q)",
    examples: [
      {
        input: "intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]",
        output: "[3,3,1,4]",
        explanation: "For query 2: smallest interval [2,4] length 3. For 3: [2,4] length 3. For 4: [4,4] length 1. For 5: [3,6] length 4."
      }
    ],
    explanation:
      "Sort `intervals` by left endpoint. Sort `queries` while tracking their original indices: `sortedQueries = [(q, originalIdx)]`. Use a min-heap storing `{intervalLength, rightBoundary}`. As query point `q` advances: (1) Push all intervals where `left <= q` into the min-heap. (2) Pop expired intervals where `right < q` from the min-heap. (3) The top of the heap is the shortest active interval containing `q`.",
    interviewInsight:
      "Offline sweeping sorts queries monotonically, transforming multi-interval range checking into a linear single-pass heap maintenance problem.",
    cppSolution: `class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        sort(intervals.begin(), intervals.end());
        int qLen = queries.size();
        vector<pair<int, int>> sortedQueries(qLen);
        for (int i = 0; i < qLen; i++) {
            sortedQueries[i] = {queries[i], i};
        }
        sort(sortedQueries.begin(), sortedQueries.end());
        
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap; // {len, right}
        vector<int> result(qLen);
        int idx = 0, n = intervals.size();
        
        for (auto& [q, origIdx] : sortedQueries) {
            while (idx < n && intervals[idx][0] <= q) {
                int len = intervals[idx][1] - intervals[idx][0] + 1;
                minHeap.push({len, intervals[idx][1]});
                idx++;
            }
            
            while (!minHeap.empty() && minHeap.top().second < q) {
                minHeap.pop(); // expired interval
            }
            
            result[origIdx] = minHeap.empty() ? -1 : minHeap.top().first;
        }
        return result;
    }
};`,
    pythonSolution: `import heapq

class Solution:
    def minInterval(self, intervals: list[list[int]], queries: list[int]) -> list[int]:
        intervals.sort()
        sorted_queries = sorted([(q, i) for i, q in enumerate(queries)])
        min_heap = [] # (length, right)
        result = [-1] * len(queries)
        idx = 0
        n = len(intervals)
        
        for q, orig_idx in sorted_queries:
            while idx < n and intervals[idx][0] <= q:
                l, r = intervals[idx]
                heapq.heappush(min_heap, (r - l + 1, r))
                idx += 1
                
            while min_heap and min_heap[0][1] < q:
                heapq.heappop(min_heap)
                
            if min_heap:
                result[orig_idx] = min_heap[0][0]
                
        return result`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q117",
    questionNumber: 117,
    title: "Rearrange String k Distance Apart",
    statement:
      "Given a string s and an integer k, rearrange s such that the same characters are at least distance k from each other. If it is not possible to rearrange the string, return an empty string \"\".",
    difficulty: "Hard",
    pattern: "Max-Heap + Cooldown Deque FIFO Buffer",
    constraints: [
      "1 <= s.length <= 3 * 10^5",
      "0 <= k <= s.length",
      "s consists of lowercase English letters."
    ],
    expectedTimeComplexity: "O(N log A) where A <= 26",
    expectedSpaceComplexity: "O(A)",
    examples: [
      {
        input: 's = "aabbcc", k = 3',
        output: '"abcabc"',
        explanation: 'The same letters are at least distance 3 apart from each other.'
      },
      {
        input: 's = "aaabc", k = 3',
        output: '""',
        explanation: 'It is not possible to rearrange string.'
      }
    ],
    explanation:
      "Count character frequencies and populate a max-heap of `{frequency, char}`. Maintain a FIFO cooldown queue `waitQueue` storing `{frequency, char}` pairs. In each step: pop the most frequent character from the heap, append it to the result string, decrement its frequency, and push to `waitQueue`. Once `waitQueue.size() >= k`, pop the front element from `waitQueue` and push back into the max-heap if its frequency > 0. If result length equals `s.length()`, return result; else `\"\"`.",
    interviewInsight:
      "The FIFO waiting queue enforces the exact sliding spacing window of size $K$ before a character becomes eligible for selection again.",
    cppSolution: `class Solution {
public:
    string rearrangeString(string s, int k) {
        if (k <= 1) return s;
        vector<int> freq(26, 0);
        for (char c : s) freq[c - 'a']++;
        
        priority_queue<pair<int, char>> maxHeap;
        for (int i = 0; i < 26; i++) {
            if (freq[i] > 0) maxHeap.push({freq[i], 'a' + i});
        }
        
        queue<pair<int, char>> waitQueue;
        string result = "";
        
        while (!maxHeap.empty()) {
            auto [f, c] = maxHeap.top();
            maxHeap.pop();
            
            result += c;
            waitQueue.push({f - 1, c});
            
            if ((int)waitQueue.size() >= k) {
                auto [wf, wc] = waitQueue.front();
                waitQueue.pop();
                if (wf > 0) maxHeap.push({wf, wc});
            }
        }
        return (result.size() == s.size()) ? result : "";
    }
};`,
    pythonSolution: `import heapq
from collections import Counter, deque

class Solution:
    def rearrangeString(self, s: str, k: int) -> str:
        if k <= 1:
            return s
            
        counts = Counter(s)
        max_heap = [(-f, c) for c, f in counts.items()]
        heapq.heapify(max_heap)
        
        wait_queue = deque()
        result = []
        
        while max_heap:
            neg_f, c = heapq.heappop(max_heap)
            result.append(c)
            wait_queue.append((neg_f + 1, c))
            
            if len(wait_queue) >= k:
                wf, wc = wait_queue.popleft()
                if wf < 0:
                    heapq.heappush(max_heap, (wf, wc))
                    
        return "".join(result) if len(result) == len(s) else ""`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q118",
    questionNumber: 118,
    title: "Maximum Frequency Stack (FreqStack)",
    statement:
      "Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack. Implement the FreqStack class: (1) FreqStack() constructs an empty frequency stack. (2) void push(int val) pushes an integer val onto the top of the stack. (3) int pop() removes and returns the most frequent element in the stack. If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.",
    difficulty: "Hard",
    pattern: "Frequency Hash Map + Grouped Frequency Stacks (O(1) Operations)",
    constraints: [
      "0 <= val <= 10^9",
      "At most 2 * 10^4 calls will be made to push and pop.",
      "It is guaranteed that there will be at least one element in the stack before calling pop."
    ],
    expectedTimeComplexity: "push: O(1), pop: O(1)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: '["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"]\n[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]',
        output: "[null,null,null,null,null,null,null,5,7,5,4]",
        explanation: "5 is most frequent -> popped. Next most frequent tie (5 and 7) -> 7 popped because closest to top."
      }
    ],
    explanation:
      "Maintain a frequency map `freq[val]` and a map of stacks `group[frequency]`. Track `maxFreq`. On `push(val)`: increment `freq[val]`, update `maxFreq = max(maxFreq, freq[val])`, and push `val` onto `group[freq[val]]`. On `pop()`: pop top element `val` from `group[maxFreq]`, decrement `freq[val]`. If `group[maxFreq]` is now empty, decrement `maxFreq--`. Return `val`.",
    interviewInsight:
      "Grouping elements into dedicated frequency buckets achieves pure O(1) time complexity for both push and pop without needing an O(log N) heap.",
    cppSolution: `class FreqStack {
private:
    unordered_map<int, int> freq;
    unordered_map<int, vector<int>> group;
    int maxFreq;
public:
    FreqStack() : maxFreq(0) {}
    
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
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q119",
    questionNumber: 119,
    title: "Sliding Window Median",
    statement:
      "The median is the middle value in an ordered integer list. You are given an integer array nums and an integer k. There is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position. Return the median array for each window in the original array. Answers within 10^-5 of the actual value will be accepted.",
    difficulty: "Extreme",
    pattern: "Balanced Dual Multisets / Two Heaps with Hash Map Lazy Deletion",
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
        explanation: "Medians of each 3-element sliding window."
      }
    ],
    explanation:
      "Maintain two self-balancing multisets `lower` (contains smaller `(k + 1)/2` elements) and `upper` (contains remaining `k / 2` elements). When the window slides: (1) insert the new incoming element into `lower` or `upper`, (2) locate and remove the outgoing element `nums[i - k]` from whichever multiset contains it, (3) rebalance sizes so `lower.size() == (k + 1) / 2` and `upper.size() == k / 2`. Calculate median in O(1) from multiset boundary iterators.",
    interviewInsight:
      "Dual multisets provide genuine $\\mathcal{O}(\\log K)$ arbitrary value removal, preventing the memory bloat of naive heap rebuilds on dynamic sliding windows.",
    cppSolution: `class Solution {
public:
    vector<double> medianSlidingWindow(vector<int>& nums, int k) {
        multiset<long long> lower, upper;
        vector<double> medians;
        
        auto balance = [&]() {
            while (lower.size() > (k + 1) / 2) {
                auto it = prev(lower.end());
                upper.insert(*it);
                lower.erase(it);
            }
            while (lower.size() < (k + 1) / 2 && !upper.empty()) {
                auto it = upper.begin();
                lower.insert(*it);
                upper.erase(it);
            }
        };
        
        for (int i = 0; i < (int)nums.size(); i++) {
            // Insert
            if (lower.empty() || nums[i] <= *lower.rbegin()) {
                lower.insert(nums[i]);
            } else {
                upper.insert(nums[i]);
            }
            balance();
            
            // Remove old element
            if (i >= k) {
                long long out = nums[i - k];
                auto it = lower.find(out);
                if (it != lower.end()) {
                    lower.erase(it);
                } else {
                    upper.erase(upper.find(out));
                }
                balance();
            }
            
            // Record median
            if (i >= k - 1) {
                if (k % 2 == 1) {
                    medians.push_back(*lower.rbegin());
                } else {
                    medians.push_back(((double)*lower.rbegin() + *upper.begin()) / 2.0);
                }
            }
        }
        return medians;
    }
};`,
    pythonSolution: `import bisect

class Solution:
    def medianSlidingWindow(self, nums: list[int], k: int) -> list[float]:
        window = sorted(nums[:k])
        medians = []
        
        def get_median():
            if k % 2 == 1:
                return float(window[k // 2])
            return (window[k // 2 - 1] + window[k // 2]) / 2.0
            
        medians.append(get_median())
        
        for i in range(k, len(nums)):
            # Remove element going out
            out_idx = bisect.bisect_left(window, nums[i - k])
            window.pop(out_idx)
            # Insert element coming in
            bisect.insort(window, nums[i])
            medians.append(get_median())
            
        return medians`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  },
  {
    id: "Q120",
    questionNumber: 120,
    title: "Trapping Rain Water II (3D Grid Elevation)",
    statement:
      "Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.",
    difficulty: "Extreme",
    pattern: "3D Boundary Inward Relaxation with Min-Heap Priority Queue BFS",
    constraints: [
      "m == heightMap.length",
      "n == heightMap[i].length",
      "1 <= m, n <= 200",
      "0 <= heightMap[i][j] <= 2 * 10^4"
    ],
    expectedTimeComplexity: "O(M * N log(M * N))",
    expectedSpaceComplexity: "O(M * N)",
    examples: [
      {
        input: "heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]",
        output: "4",
        explanation: "After the rain, total trapped water volume is 4 units."
      }
    ],
    explanation:
      "Water level in 3D is bounded by the lowest point along the surrounding boundary (the 'weakest dam wall'). Push all outer boundary cells `(height, r, c)` into a min-heap and mark them visited. In each step, pop the cell with minimum boundary height `(h, r, c)`. For each unvisited neighbor `(nr, nc)`: if `heightMap[nr][nc] < h`, water trapped is `h - heightMap[nr][nc]`. Push neighbor into heap with new boundary height `max(h, heightMap[nr][nc])` and mark visited.",
    interviewInsight:
      "Dijkstra-style inward shrinking: Expanding from the lowest boundary point guarantees that trapped water height at every interior cell is monotonically tight and correct.",
    cppSolution: `class Solution {
public:
    int trapRainWater(vector<vector<int>>& heightMap) {
        if (heightMap.empty() || heightMap[0].empty()) return 0;
        int m = heightMap.size(), n = heightMap[0].size();
        if (m < 3 || n < 3) return 0;
        
        // {height, r, c}
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> pq;
        vector<vector<bool>> visited(m, vector<bool>(n, false));
        
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (r == 0 || r == m - 1 || c == 0 || c == n - 1) {
                    pq.push({heightMap[r][c], r, c});
                    visited[r][c] = true;
                }
            }
        }
        
        int trappedWater = 0;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        
        while (!pq.empty()) {
            auto [h, r, c] = pq.top();
            pq.pop();
            
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    trappedWater += max(0, h - heightMap[nr][nc]);
                    pq.push({max(h, heightMap[nr][nc]), nr, nc});
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
        if m < 3 or n < 3:
            return 0
            
        pq = [] # (height, r, c)
        visited = [[False] * n for _ in range(m)]
        
        for r in range(m):
            for c in range(n):
                if r in (0, m - 1) or c in (0, n - 1):
                    heapq.heappush(pq, (heightMap[r][c], r, c))
                    visited[r][c] = True
                    
        trapped_water = 0
        dirs = [(1,0), (-1,0), (0,1), (0,-1)]
        
        while pq:
            h, r, c = heapq.heappop(pq)
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
                    visited[nr][nc] = True
                    trapped_water += max(0, h - heightMap[nr][nc])
                    heapq.heappush(pq, (max(h, heightMap[nr][nc]), nr, nc))
                    
        return trapped_water`,
    topic: "Heaps, Priority Queue & Greedy Algorithms",
    batch: 6
  }
];
