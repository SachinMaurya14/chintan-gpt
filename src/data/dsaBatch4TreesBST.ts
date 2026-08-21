import { DSAInterviewProblem } from "./dsaQuestionTypes.js";

export const DSA_BATCH_4_TREES_BST: DSAInterviewProblem[] = [
  {
    id: "Q61",
    questionNumber: 61,
    title: "Maximum Depth of Binary Tree",
    statement:
      "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    difficulty: "Medium",
    pattern: "DFS Height Propagation & BFS Level Slicing",
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H) where H is tree height",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "3",
        explanation: "The longest path is 3 -> 20 -> 15 (or 7), which has 3 nodes."
      },
      {
        input: "root = [1,null,2]",
        output: "2",
        explanation: "Root 1 to child 2 has 2 nodes."
      }
    ],
    explanation:
      "Recursively, the maximum depth of a binary tree is `1 + max(maxDepth(root->left), maxDepth(root->right))`. The base case is an empty root returning depth 0. Iteratively, BFS processes level-by-level using a queue, incrementing depth counter at each level iteration.",
    interviewInsight:
      "DFS is concise and O(H) call stack memory, while BFS uses O(W) queue memory where W is the maximum tree width (up to N/2 in complete binary tree).",
    cppSolution: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,
    pythonSolution: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q62",
    questionNumber: 62,
    title: "Balanced Binary Tree (AVL Height Balance)",
    statement:
      "Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.",
    difficulty: "Medium",
    pattern: "Bottom-Up Postorder Validation with Sentinel Pruning",
    constraints: [
      "The number of nodes in the tree is in the range [0, 5000].",
      "-10^4 <= Node.val <= 10^4"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "true",
        explanation: "Left height is 1, right height is 2. Difference is 1 <= 1."
      },
      {
        input: "root = [1,2,2,3,3,null,null,4,4]",
        output: "false",
        explanation: "Left subtree is significantly deeper than right subtree."
      }
    ],
    explanation:
      "A naive top-down approach computes subtree heights repeatedly causing O(N^2) time. The optimal bottom-up postorder traversal computes subtree heights while simultaneously checking balance. If any subtree is unbalanced, it immediately returns a sentinel value `-1`, short-circuiting further calculations.",
    interviewInsight:
      "Bottom-up DFS avoids redundant re-computation of heights by propagating the failure sentinel `-1` up the call stack.",
    cppSolution: `class Solution {
public:
    bool isBalanced(TreeNode* root) {
        return checkHeight(root) != -1;
    }
    
private:
    int checkHeight(TreeNode* node) {
        if (!node) return 0;
        
        int leftH = checkHeight(node->left);
        if (leftH == -1) return -1;
        
        int rightH = checkHeight(node->right);
        if (rightH == -1) return -1;
        
        if (abs(leftH - rightH) > 1) return -1;
        return 1 + max(leftH, rightH);
    }
};`,
    pythonSolution: `class Solution:
    def isBalanced(self, root: Optional[TreeNode]) -> bool:
        def check_height(node: Optional[TreeNode]) -> int:
            if not node:
                return 0
            
            left_h = check_height(node.left)
            if left_h == -1:
                return -1
            
            right_h = check_height(node.right)
            if right_h == -1:
                return -1
            
            if abs(left_h - right_h) > 1:
                return -1
                
            return 1 + max(left_h, right_h)
            
        return check_height(root) != -1`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q63",
    questionNumber: 63,
    title: "Diameter of Binary Tree",
    statement:
      "Given the root of a binary tree, return the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root. The length of a path between two nodes is represented by the number of edges between them.",
    difficulty: "Medium",
    pattern: "Postorder Subtree Depth Aggregation",
    constraints: [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "-100 <= Node.val <= 100"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [1,2,3,4,5]",
        output: "3",
        explanation: "3 is the length of the path [4,2,1,3] or [5,2,1,3] (3 edges)."
      },
      {
        input: "root = [1,2]",
        output: "1",
        explanation: "1 edge between 1 and 2."
      }
    ],
    explanation:
      "At any node `u`, the longest path passing through `u` as the highest peak is `leftDepth + rightDepth`. We perform a postorder traversal that computes the depth of each subtree (`1 + max(leftDepth, rightDepth)`) while continuously updating a global maximum diameter with `leftDepth + rightDepth`.",
    interviewInsight:
      "Do not confuse number of nodes with number of edges: Diameter in terms of edges is `leftDepth + rightDepth`. If defined by nodes, it would be `leftDepth + rightDepth + 1`.",
    cppSolution: `class Solution {
public:
    int diameterOfBinaryTree(TreeNode* root) {
        int maxDiameter = 0;
        getDepth(root, maxDiameter);
        return maxDiameter;
    }
    
private:
    int getDepth(TreeNode* node, int& maxDiameter) {
        if (!node) return 0;
        int leftH = getDepth(node->left, maxDiameter);
        int rightH = getDepth(node->right, maxDiameter);
        
        maxDiameter = max(maxDiameter, leftH + rightH);
        return 1 + max(leftH, rightH);
    }
};`,
    pythonSolution: `class Solution:
    def diameterOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        max_diameter = 0
        
        def get_depth(node: Optional[TreeNode]) -> int:
            nonlocal max_diameter
            if not node:
                return 0
            left_h = get_depth(node.left)
            right_h = get_depth(node.right)
            
            max_diameter = max(max_diameter, left_h + right_h)
            return 1 + max(left_h, right_h)
            
        get_depth(root)
        return max_diameter`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q64",
    questionNumber: 64,
    title: "Invert Binary Tree",
    statement:
      "Given the root of a binary tree, invert the tree, and return its root. Inverting a binary tree means swapping the left and right children for every node in the tree.",
    difficulty: "Medium",
    pattern: "Recursive & Iterative Subtree Pointer Inversion",
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [4,2,7,1,3,6,9]",
        output: "[4,7,2,9,6,3,1]",
        explanation: "Every node's left and right children are swapped."
      }
    ],
    explanation:
      "For every node, swap `root->left` and `root->right`, then recursively invert both subtrees. In an iterative BFS/DFS approach, push nodes to a queue or stack and swap children at each visited node.",
    interviewInsight:
      "Famous Max Howell Google interview question: Tests pointer manipulation fundamentals and clean recursive base conditions.",
    cppSolution: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        
        TreeNode* temp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(temp);
        
        return root;
    }
};`,
    pythonSolution: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
            
        root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)
        return root`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q65",
    questionNumber: 65,
    title: "Symmetric Tree (Mirror Reflection)",
    statement:
      "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
    difficulty: "Medium",
    pattern: "Dual Subtree Simultaneous Preorder Traversal",
    constraints: [
      "The number of nodes in the tree is in the range [1, 1000].",
      "-100 <= Node.val <= 100"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [1,2,2,3,4,4,3]",
        output: "true",
        explanation: "The tree is symmetrical across the vertical axis."
      },
      {
        input: "root = [1,2,2,null,3,null,3]",
        output: "false",
        explanation: "Subtree structures differ."
      }
    ],
    explanation:
      "Two trees `t1` and `t2` are mirror reflections if: (1) `t1->val == t2->val`, (2) `t1->left` is a mirror of `t2->right`, and (3) `t1->right` is a mirror of `t2->left`. We run a helper function `isMirror(root->left, root->right)`.",
    interviewInsight:
      "Always check both pointers for null: if both are null, return true; if exactly one is null or values differ, return false.",
    cppSolution: `class Solution {
public:
    bool isSymmetric(TreeNode* root) {
        if (!root) return true;
        return isMirror(root->left, root->right);
    }
    
private:
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        if (t1->val != t2->val) return false;
        
        return isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left);
    }
};`,
    pythonSolution: `class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        if not root:
            return True
            
        def is_mirror(t1: Optional[TreeNode], t2: Optional[TreeNode]) -> bool:
            if not t1 and not t2:
                return True
            if not t1 or not t2:
                return False
            if t1.val != t2.val:
                return False
            return is_mirror(t1.left, t2.right) and is_mirror(t1.right, t2.left)
            
        return is_mirror(root.left, root.right)`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q66",
    questionNumber: 66,
    title: "Binary Tree Level Order Traversal",
    statement:
      "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    difficulty: "Medium",
    pattern: "BFS Queue with Dynamic Level Sizing",
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
        explanation: "Level 0: [3], Level 1: [9,20], Level 2: [15,7]."
      }
    ],
    explanation:
      "Use a standard FIFO queue. At the beginning of each outer loop iteration, record the current queue size `levelSize = q.size()`. Loop exactly `levelSize` times to dequeue all nodes belonging to the current level, adding their values to a level array and pushing their non-null children into the queue.",
    interviewInsight:
      "Freezing `levelSize = q.size()` before processing children cleanly isolates each horizontal tree level without needing dummy sentinel nodes.",
    cppSolution: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        
        while (!q.empty()) {
            int levelSize = q.size();
            vector<int> currentLevel;
            
            for (int i = 0; i < levelSize; i++) {
                TreeNode* node = q.front();
                q.pop();
                currentLevel.push_back(node->val);
                
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            result.push_back(currentLevel);
        }
        return result;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:
        result = []
        if not root:
            return result
            
        q = deque([root])
        while q:
            level_size = len(q)
            current_level = []
            for _ in range(level_size):
                node = q.popleft()
                current_level.append(node.val)
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            result.append(current_level)
            
        return result`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q67",
    questionNumber: 67,
    title: "Binary Tree Zigzag Level Order Traversal",
    statement:
      "Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).",
    difficulty: "Medium",
    pattern: "Bidirectional Level Deque / Directional Indexing",
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-100 <= Node.val <= 100"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[3],[20,9],[15,7]]",
        explanation: "Level 0: [3] (left to right), Level 1: [20,9] (right to left), Level 2: [15,7] (left to right)."
      }
    ],
    explanation:
      "Maintain a boolean flag `leftToRight = true`. When collecting elements of size `levelSize`, preallocate a vector of size `levelSize`. If `leftToRight` is true, write into index `i`; if false, write into index `levelSize - 1 - i`. Flip the flag after completing each level.",
    interviewInsight:
      "Direct index calculation `index = leftToRight ? i : (size - 1 - i)` avoids the overhead of reversing vectors in-place.",
    cppSolution: `class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> result;
        if (!root) return result;
        
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        
        while (!q.empty()) {
            int size = q.size();
            vector<int> row(size);
            
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front();
                q.pop();
                
                int index = leftToRight ? i : (size - 1 - i);
                row[index] = node->val;
                
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            
            leftToRight = !leftToRight;
            result.push_back(row);
        }
        return result;
    }
};`,
    pythonSolution: `from collections import deque

class Solution:
    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:
        result = []
        if not root:
            return result
            
        q = deque([root])
        left_to_right = True
        
        while q:
            size = len(q)
            row = [0] * size
            for i in range(size):
                node = q.popleft()
                idx = i if left_to_right else (size - 1 - i)
                row[idx] = node.val
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
            left_to_right = not left_to_right
            result.append(row)
            
        return result`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q68",
    questionNumber: 68,
    title: "Binary Tree Right Side View",
    statement:
      "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
    difficulty: "Medium",
    pattern: "Reverse Preorder DFS (Root -> Right -> Left) / BFS Level Tail",
    constraints: [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [1,2,3,null,5,null,4]",
        output: "[1,3,4]",
        explanation: "Rightmost nodes visible from top to bottom are 1, 3, and 4."
      },
      {
        input: "root = [1,null,3]",
        output: "[1,3]",
        explanation: "Nodes visible are 1, 3."
      }
    ],
    explanation:
      "We can use Reverse Preorder DFS (`root -> right -> left`). We track the current tree `depth` starting at 0. When `depth == result.size()`, this is the very first node visited at this depth (which is guaranteed to be the rightmost node because we visited right subtrees first), so we push its value.",
    interviewInsight:
      "Visiting right child before left child during DFS guarantees the first node encountered at each depth level is the rightmost visible node.",
    cppSolution: `class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> result;
        dfs(root, 0, result);
        return result;
    }
    
private:
    void dfs(TreeNode* node, int depth, vector<int>& result) {
        if (!node) return;
        if (depth == (int)result.size()) {
            result.push_back(node->val);
        }
        dfs(node->right, depth + 1, result);
        dfs(node->left, depth + 1, result);
    }
};`,
    pythonSolution: `class Solution:
    def rightSideView(self, root: Optional[TreeNode]) -> list[int]:
        result = []
        
        def dfs(node: Optional[TreeNode], depth: int):
            if not node:
                return
            if depth == len(result):
                result.append(node.val)
            dfs(node->right if hasattr(node, 'right') else node.right, depth + 1)
            dfs(node.left, depth + 1)
            
        dfs(root, 0)
        return result`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q69",
    questionNumber: 69,
    title: "Lowest Common Ancestor of a Binary Tree",
    statement:
      "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q. The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).",
    difficulty: "Medium",
    pattern: "Postorder Search & Propagate",
    constraints: [
      "The number of nodes in the tree is in the range [2, 10^5].",
      "-10^9 <= Node.val <= 10^9",
      "All Node.val are unique.",
      "p != q",
      "p and q will exist in the tree."
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1",
        output: "3",
        explanation: "The LCA of nodes 5 and 1 is 3."
      },
      {
        input: "root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4",
        output: "5",
        explanation: "The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself."
      }
    ],
    explanation:
      "Perform a recursive search. If `root == nullptr || root == p || root == q`, return `root`. Recursively find LCA in `root->left` and `root->right`. If both left and right return non-null, `root` is the split point where `p` and `q` diverge, so return `root`. If only one side returns non-null, return that non-null node.",
    interviewInsight:
      "This postorder pattern elegantly bubbles up found nodes in O(N) without requiring explicit parent pointer structures.",
    cppSolution: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        
        if (left && right) return root;
        return left ? left : right;
    }
};`,
    pythonSolution: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        if not root or root == p or root == q:
            return root
            
        left = self.lowestCommonAncestor(root.left, p, q)
        right = self.lowestCommonAncestor(root.right, p, q)
        
        if left and right:
            return root
        return left if left else right`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q70",
    questionNumber: 70,
    title: "Validate Binary Search Tree",
    statement:
      "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: (1) The left subtree of a node contains only nodes with keys strictly less than the node's key. (2) The right subtree of a node contains only nodes with keys strictly greater than the node's key. (3) Both the left and right subtrees must also be binary search trees.",
    difficulty: "Medium",
    pattern: "Range Bounding [minVal, maxVal] & Inorder Monotonicity",
    constraints: [
      "The number of nodes in the tree is in the range [1, 10^4].",
      "-2^31 <= Node.val <= 2^31 - 1"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [2,1,3]",
        output: "true",
        explanation: "1 < 2 < 3, valid BST."
      },
      {
        input: "root = [5,1,4,null,null,3,6]",
        output: "false",
        explanation: "The root node's value is 5 but its right child's value is 4."
      }
    ],
    explanation:
      "Checking only immediate children is incorrect because all ancestors enforce global upper and lower bounds. We propagate valid value ranges `[minVal, maxVal]` during DFS: when moving to the left child, `maxVal = node->val`; when moving to the right child, `minVal = node->val`. If `node->val <= minVal || node->val >= maxVal`, return false.",
    interviewInsight:
      "Use `long long` or `nullptr`/`None` sentinels for initial bounds to handle test cases containing `INT_MIN` and `INT_MAX` root values.",
    cppSolution: `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
    
private:
    bool validate(TreeNode* node, long long minVal, long long maxVal) {
        if (!node) return true;
        if (node->val <= minVal || node->val >= maxVal) return false;
        
        return validate(node->left, minVal, node->val) &&
               validate(node->right, node->val, maxVal);
    }
};`,
    pythonSolution: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        def validate(node: Optional[TreeNode], min_val: float, max_val: float) -> bool:
            if not node:
                return True
            if node.val <= min_val or node.val >= max_val:
                return False
            return validate(node.left, min_val, node.val) and validate(node.right, node.val, max_val)
            
        return validate(root, float('-inf'), float('inf'))`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q71",
    questionNumber: 71,
    title: "Kth Smallest Element in a BST",
    statement:
      "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
    difficulty: "Medium",
    pattern: "Iterative Inorder Traversal with Explicit Stack",
    constraints: [
      "The number of nodes in the tree is n.",
      "1 <= k <= n <= 10^4",
      "0 <= Node.val <= 10^4"
    ],
    expectedTimeComplexity: "O(H + K)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [3,1,4,null,2], k = 1",
        output: "1",
        explanation: "1 is the smallest element in the BST."
      },
      {
        input: "root = [5,3,6,2,4,null,null,1], k = 3",
        output: "3",
        explanation: "Inorder sequence is [1,2,3,4,5,6], so 3rd smallest is 3."
      }
    ],
    explanation:
      "An inorder traversal of a BST visits nodes in strictly increasing order. We use an explicit stack to perform iterative inorder traversal: traverse down the left subtree pushing nodes. When no left child remains, pop the top node, decrement `k`. When `k == 0`, return `node->val`. Otherwise, move to `node->right`.",
    interviewInsight:
      "Iterative traversal allows early termination after visiting exactly `k` nodes, saving unnecessary traversal of the rest of the tree.",
    cppSolution: `class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        TreeNode* curr = root;
        
        while (curr || !st.empty()) {
            while (curr) {
                st.push(curr);
                curr = curr->left;
            }
            
            curr = st.top();
            st.pop();
            if (--k == 0) return curr->val;
            
            curr = curr->right;
        }
        return -1;
    }
};`,
    pythonSolution: `class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        stack = []
        curr = root
        
        while curr or stack:
            while curr:
                stack.append(curr)
                curr = curr.left
                
            curr = stack.pop()
            k -= 1
            if k == 0:
                return curr.val
                
            curr = curr.right
            
        return -1`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q72",
    questionNumber: 72,
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    statement:
      "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
    difficulty: "Medium",
    pattern: "Divide & Conquer with Precomputed Hash Map",
    constraints: [
      "1 <= preorder.length <= 3000",
      "inorder.length == preorder.length",
      "-3000 <= preorder[i], inorder[i] <= 3000",
      "preorder and inorder consist of unique values.",
      "Each value of inorder also appears in preorder."
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
        output: "[3,9,20,null,null,15,7]",
        explanation: "Root is 3. Left inorder is [9], right inorder is [15,20,7]."
      }
    ],
    explanation:
      "Preorder traversal visits `[root, left subtree, right subtree]`. The first element in preorder is always the root. Inorder traversal visits `[left subtree, root, right subtree]`. Finding `root` in inorder divides the array into left and right subtree partitions. We pre-index inorder positions in a hash map for O(1) lookups.",
    interviewInsight:
      "Storing inorder indices in an `unordered_map` reduces the time complexity from naive O(N^2) to optimal O(N).",
    cppSolution: `class Solution {
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        unordered_map<int, int> inMap;
        for (int i = 0; i < (int)inorder.size(); i++) {
            inMap[inorder[i]] = i;
        }
        int preIndex = 0;
        return build(preorder, preIndex, 0, (int)inorder.size() - 1, inMap);
    }
    
private:
    TreeNode* build(vector<int>& preorder, int& preIndex, int inStart, int inEnd, unordered_map<int, int>& inMap) {
        if (inStart > inEnd) return nullptr;
        
        int rootVal = preorder[preIndex++];
        TreeNode* root = new TreeNode(rootVal);
        int inIndex = inMap[rootVal];
        
        root->left = build(preorder, preIndex, inStart, inIndex - 1, inMap);
        root->right = build(preorder, preIndex, inIndex + 1, inEnd, inMap);
        
        return root;
    }
};`,
    pythonSolution: `class Solution:
    def buildTree(self, preorder: list[int], inorder: list[int]) -> Optional[TreeNode]:
        in_map = {val: idx for idx, val in enumerate(inorder)}
        pre_idx = 0
        
        def build(in_start: int, in_end: int) -> Optional[TreeNode]:
            nonlocal pre_idx
            if in_start > in_end:
                return None
                
            root_val = preorder[pre_idx]
            pre_idx += 1
            root = TreeNode(root_val)
            
            in_idx = in_map[root_val]
            root.left = build(in_start, in_idx - 1)
            root.right = build(in_idx + 1, in_end)
            
            return root
            
        return build(0, len(inorder) - 1)`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q73",
    questionNumber: 73,
    title: "Binary Tree Maximum Path Sum",
    statement:
      "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root. The path sum of a path is the sum of the node's values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.",
    difficulty: "Hard",
    pattern: "Postorder Subtree Gain Calculation with Global Maxima",
    constraints: [
      "The number of nodes in the tree is in the range [1, 3 * 10^4].",
      "-1000 <= Node.val <= 1000"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [1,2,3]",
        output: "6",
        explanation: "The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6."
      },
      {
        input: "root = [-10,9,20,null,null,15,7]",
        output: "42",
        explanation: "The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42."
      }
    ],
    explanation:
      "At any node `root`, the maximum path where `root` acts as the arch (turning point) is `root->val + max(0, leftGain) + max(0, rightGain)`. We update the global maximum path sum with this arch value. However, the recursive function can only return the single branch gain `root->val + max(0, max(leftGain, rightGain))` to its parent.",
    interviewInsight:
      "Crucial trick: Discard negative subtree contributions by wrapping child gains with `max(0, gain)`. Also, initialize the global maximum with `INT_MIN` (not 0) because all tree nodes can be negative.",
    cppSolution: `class Solution {
public:
    int maxPathSum(TreeNode* root) {
        int maxSum = INT_MIN;
        maxGain(root, maxSum);
        return maxSum;
    }
    
private:
    int maxGain(TreeNode* node, int& maxSum) {
        if (!node) return 0;
        
        int leftGain = max(0, maxGain(node->left, maxSum));
        int rightGain = max(0, maxGain(node->right, maxSum));
        
        // Path through node as highest root
        int currentPathSum = node->val + leftGain + rightGain;
        maxSum = max(maxSum, currentPathSum);
        
        // Single branch return to parent
        return node->val + max(leftGain, rightGain);
    }
};`,
    pythonSolution: `class Solution:
    def maxPathSum(self, root: Optional[TreeNode]) -> int:
        max_sum = float('-inf')
        
        def max_gain(node: Optional[TreeNode]) -> int:
            nonlocal max_sum
            if not node:
                return 0
                
            left_gain = max(0, max_gain(node.left))
            right_gain = max(0, max_gain(node.right))
            
            # Arch path through this node
            current_path = node.val + left_gain + right_gain
            max_sum = max(max_sum, current_path)
            
            return node.val + max(left_gain, right_gain)
            
        max_gain(root)
        return int(max_sum)`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q74",
    questionNumber: 74,
    title: "Binary Search Tree Iterator",
    statement:
      "Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST): (1) BSTIterator(TreeNode root) Initializes an object of the BSTIterator class. The root of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST. (2) boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false. (3) int next() Moves the pointer to the right, then returns the number at the pointer. You must implement next() and hasNext() to run in, average O(1) time and use O(h) memory, where h is the height of the tree.",
    difficulty: "Hard",
    pattern: "Controlled Explicit Stack Simulation / Amortized O(1)",
    constraints: [
      "The number of nodes in the tree is in the range [1, 10^5].",
      "0 <= Node.val <= 10^6",
      "At most 10^5 calls will be made to hasNext, and next."
    ],
    expectedTimeComplexity: "Amortized O(1) per next(), O(1) for hasNext()",
    expectedSpaceComplexity: "O(H) stack space",
    examples: [
      {
        input: "BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]); bSTIterator.next(); // return 3\nbSTIterator.next(); // return 7\nbSTIterator.hasNext(); // return True\nbSTIterator.next(); // return 9",
        output: "[null, 3, 7, true, 9]",
        explanation: "Iterates in-order through BST."
      }
    ],
    explanation:
      "Store an internal stack of `TreeNode*`. In the constructor, push all nodes along the left spine from root. In `next()`, pop the top node `node = st.top()`, and if `node->right` exists, push all left spine nodes of `node->right`. In `hasNext()`, return `!st.empty()`. Each node is pushed and popped exactly once, guaranteeing amortized O(1) time per element.",
    interviewInsight:
      "This pattern lazy-loads the traversal stream without flattening the entire tree into an O(N) array upfront, strictly honoring the O(H) memory budget.",
    cppSolution: `class BSTIterator {
private:
    stack<TreeNode*> st;
    
    void pushAllLeft(TreeNode* node) {
        while (node) {
            st.push(node);
            node = node->left;
        }
    }

public:
    BSTIterator(TreeNode* root) {
        pushAllLeft(root);
    }
    
    int next() {
        TreeNode* topNode = st.top();
        st.pop();
        if (topNode->right) {
            pushAllLeft(topNode->right);
        }
        return topNode->val;
    }
    
    bool hasNext() {
        return !st.empty();
    }
};`,
    pythonSolution: `class BSTIterator:
    def __init__(self, root: Optional[TreeNode]):
        self.stack = []
        self._push_all_left(root)

    def _push_all_left(self, node: Optional[TreeNode]):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        top_node = self.stack.pop()
        if top_node.right:
            self._push_all_left(top_node.right)
        return top_node.val

    def hasNext(self) -> bool:
        return len(self.stack) > 0`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q75",
    questionNumber: 75,
    title: "Serialize and Deserialize Binary Tree",
    statement:
      "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
    difficulty: "Hard",
    pattern: "Preorder Stream DFS with Sentinel Null Tokens",
    constraints: [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-1000 <= Node.val <= 1000"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "root = [1,2,3,null,null,4,5]",
        output: "[1,2,3,null,null,4,5]",
        explanation: "Deserialized tree reconstructs exact binary tree structure."
      }
    ],
    explanation:
      "Serialize: Perform a preorder DFS traversal. If `node == nullptr`, append `'#'` followed by a delimiter `','`. Otherwise, append `to_string(node->val) + ','` and recurse left then right. Deserialize: Tokenize string by delimiter. Read tokens recursively: if token is `'#'`, return `nullptr`; otherwise create `new TreeNode(stoi(token))` and build left and right children recursively.",
    interviewInsight:
      "Preorder serialization with null markers is self-describing and does NOT require a second traversal (like inorder) to reconstruct unambiguously.",
    cppSolution: `class Codec {
public:
    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        string out = "";
        serializeDfs(root, out);
        return out;
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        stringstream ss(data);
        return deserializeDfs(ss);
    }
    
private:
    void serializeDfs(TreeNode* node, string& out) {
        if (!node) {
            out += "#,";
            return;
        }
        out += to_string(node->val) + ",";
        serializeDfs(node->left, out);
        serializeDfs(node->right, out);
    }
    
    TreeNode* deserializeDfs(stringstream& ss) {
        string token;
        if (!getline(ss, token, ',')) return nullptr;
        if (token == "#") return nullptr;
        
        TreeNode* root = new TreeNode(stoi(token));
        root->left = deserializeDfs(ss);
        root->right = deserializeDfs(ss);
        return root;
    }
};`,
    pythonSolution: `class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        vals = []
        def dfs(node: Optional[TreeNode]):
            if not node:
                vals.append('#')
                return
            vals.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ','.join(vals)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        vals = iter(data.split(','))
        def dfs() -> Optional[TreeNode]:
            val = next(vals)
            if val == '#':
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q76",
    questionNumber: 76,
    title: "Vertical Order Traversal of a Binary Tree",
    statement:
      "Given the root of a binary tree, calculate the vertical order traversal of the binary tree. For each node at position (row, col), its left child will be at (row + 1, col - 1), and its right child will be at (row + 1, col + 1). The root of the tree is at (0, 0). The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.",
    difficulty: "Hard",
    pattern: "2D Coordinate Mapping (Col, Row, Val) + Multiset Sorting",
    constraints: [
      "The number of nodes in the tree is in the range [1, 1000].",
      "0 <= Node.val <= 1000"
    ],
    expectedTimeComplexity: "O(N log N)",
    expectedSpaceComplexity: "O(N)",
    examples: [
      {
        input: "root = [3,9,20,null,null,15,7]",
        output: "[[9],[3,15],[20],[7]]",
        explanation: "Column -1: [9], Column 0: [3,15], Column 1: [20], Column 2: [7]."
      },
      {
        input: "root = [1,2,3,4,5,6,7]",
        output: "[[4],[2],[1,5,6],[3],[7]]",
        explanation: "Col 0 contains nodes 5 and 6 at same depth, sorted as [1,5,6]."
      }
    ],
    explanation:
      "We assign coordinates `(row, col)` to each node. We use a nested map `map<int, map<int, multiset<int>>> nodes` where outer key is `col` (ordered column-wise), inner key is `row` (ordered top-to-bottom), and `multiset` sorts values when both `row` and `col` collide. A BFS or DFS populates this structure.",
    interviewInsight:
      "Beware: Unlike simple Vertical Order, Tier-1 interview variants require tie-breaking duplicate `(row, col)` nodes by value in ascending order.",
    cppSolution: `class Solution {
public:
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        map<int, map<int, multiset<int>>> nodes;
        queue<pair<TreeNode*, pair<int, int>>> q; // {node, {col, row}}
        if (root) q.push({root, {0, 0}});
        
        while (!q.empty()) {
            auto p = q.front();
            q.pop();
            TreeNode* node = p.first;
            int col = p.second.first, row = p.second.second;
            
            nodes[col][row].insert(node->val);
            if (node->left) q.push({node->left, {col - 1, row + 1}});
            if (node->right) q.push({node->right, {col + 1, row + 1}});
        }
        
        vector<vector<int>> result;
        for (auto& colPair : nodes) {
            vector<int> colValues;
            for (auto& rowPair : colPair.second) {
                colValues.insert(colValues.end(), rowPair.second.begin(), rowPair.second.end());
            }
            result.push_back(colValues);
        }
        return result;
    }
};`,
    pythonSolution: `from collections import defaultdict, deque

class Solution:
    def verticalTraversal(self, root: Optional[TreeNode]) -> list[list[int]]:
        node_map = defaultdict(lambda: defaultdict(list))
        q = deque([(root, 0, 0)]) # (node, col, row)
        
        while q:
            node, col, row = q.popleft()
            if node:
                node_map[col][row].append(node.val)
                if node.left:
                    q.append((node.left, col - 1, row + 1))
                if node.right:
                    q.append((node.right, col + 1, row + 1))
                    
        result = []
        for col in sorted(node_map.keys()):
            col_vals = []
            for row in sorted(node_map[col].keys()):
                col_vals.extend(sorted(node_map[col][row]))
            result.append(col_vals)
            
        return result`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q77",
    questionNumber: 77,
    title: "Lowest Common Ancestor of a Binary Search Tree",
    statement:
      "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST. According to the definition of LCA on Wikipedia: 'The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).'",
    difficulty: "Medium",
    pattern: "BST Directional Navigation in O(H)",
    constraints: [
      "The number of nodes in the tree is in the range [2, 10^5].",
      "-10^9 <= Node.val <= 10^9",
      "All Node.val are unique.",
      "p != q",
      "p and q will exist in the BST."
    ],
    expectedTimeComplexity: "O(H)",
    expectedSpaceComplexity: "O(1) iterative",
    examples: [
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
        output: "6",
        explanation: "The LCA of nodes 2 and 8 is 6."
      },
      {
        input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4",
        output: "2",
        explanation: "The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself."
      }
    ],
    explanation:
      "Exploit BST ordering: If both `p->val` and `q->val` are strictly less than `root->val`, the LCA must lie in the left subtree (`root = root->left`). If both are strictly greater than `root->val`, the LCA must lie in the right subtree (`root = root->right`). The moment `p` and `q` split on opposite sides of `root` (or one equals `root`), the current node is the LCA.",
    interviewInsight:
      "Unlike general binary trees that require postorder traversal of both subtrees in O(N), BST properties allow O(H) iterative descent with O(1) space.",
    cppSolution: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        while (root) {
            if (p->val < root->val && q->val < root->val) {
                root = root->left;
            } else if (p->val > root->val && q->val > root->val) {
                root = root->right;
            } else {
                return root; // Split point is the LCA
            }
        }
        return nullptr;
    }
};`,
    pythonSolution: `class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        curr = root
        while curr:
            if p.val < curr.val and q.val < curr.val:
                curr = curr.left
            elif p.val > curr.val and q.val > curr.val:
                curr = curr.right
            else:
                return curr
        return None`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q78",
    questionNumber: 78,
    title: "Recover Binary Search Tree (Two Swapped Nodes in O(1) Space)",
    statement:
      "You are given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure. You must solve it in O(1) extra auxiliary space.",
    difficulty: "Hard",
    pattern: "Morris Inorder Traversal / Inorder Anomaly Detection",
    constraints: [
      "The number of nodes in the tree is in the range [2, 1000].",
      "-2^31 <= Node.val <= 2^31 - 1"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(1) extra space",
    examples: [
      {
        input: "root = [1,3,null,null,2]",
        output: "[3,1,null,null,2]",
        explanation: "3 cannot be a left child of 1. Swapping 1 and 3 recovers BST."
      },
      {
        input: "root = [3,1,4,null,null,2]",
        output: "[2,1,4,null,null,3]",
        explanation: "Swapping 2 and 3 recovers BST [2,1,4,null,null,3]."
      }
    ],
    explanation:
      "In an inorder traversal, elements should be strictly increasing. If two nodes are swapped, there are either 1 or 2 inverted adjacent pairs where `prev->val > curr->val`. The first anomaly identifies `first = prev`, and the last anomaly identifies `second = curr`. Using Morris Inorder Traversal (threaded binary trees), we can detect and swap these two nodes using O(1) auxiliary space without recursion stacks.",
    interviewInsight:
      "Morris traversal builds temporary threads from predecessor's right child to current node, allowing tree navigation without stack memory.",
    cppSolution: `class Solution {
public:
    void recoverTree(TreeNode* root) {
        TreeNode *first = nullptr, *second = nullptr, *prev = nullptr;
        TreeNode *curr = root;
        
        while (curr) {
            if (!curr->left) {
                // Visit curr
                if (prev && prev->val > curr->val) {
                    if (!first) first = prev;
                    second = curr;
                }
                prev = curr;
                curr = curr->right;
            } else {
                TreeNode* pred = curr->left;
                while (pred->right && pred->right != curr) {
                    pred = pred->right;
                }
                
                if (!pred->right) {
                    pred->right = curr; // Create thread
                    curr = curr->left;
                } else {
                    pred->right = nullptr; // Break thread
                    if (prev && prev->val > curr->val) {
                        if (!first) first = prev;
                        second = curr;
                    }
                    prev = curr;
                    curr = curr->right;
                }
            }
        }
        
        if (first && second) {
            swap(first->val, second->val);
        }
    }
};`,
    pythonSolution: `class Solution:
    def recoverTree(self, root: Optional[TreeNode]) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        first = second = prev = None
        curr = root
        
        while curr:
            if not curr.left:
                if prev and prev.val > curr.val:
                    if not first:
                        first = prev
                    second = curr
                prev = curr
                curr = curr.right
            else:
                pred = curr.left
                while pred.right and pred.right != curr:
                    pred = pred.right
                    
                if not pred.right:
                    pred.right = curr
                    curr = curr.left
                else:
                    pred.right = None
                    if prev and prev.val > curr.val:
                        if not first:
                            first = prev
                        second = curr
                    prev = curr
                    curr = curr.right
                    
        if first and second:
            first.val, second.val = second.val, first.val`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q79",
    questionNumber: 79,
    title: "Binary Tree Cameras",
    statement:
      "You are given the root of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children. Return the minimum number of cameras needed to monitor all nodes of the tree.",
    difficulty: "Extreme",
    pattern: "Bottom-Up Greedy State Propagation / Vertex Cover on Trees",
    constraints: [
      "The number of nodes in the tree is in the range [1, 1000].",
      "Node.val == 0"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [0,0,null,0,0]",
        output: "1",
        explanation: "One camera placed at parent node monitors all three nodes."
      },
      {
        input: "root = [0,0,null,0,null,0,null,null,0]",
        output: "2",
        explanation: "Two cameras placed strategically cover the vertical tree chain."
      }
    ],
    explanation:
      "We define 3 node states: State 0: Node is NOT covered (needs camera). State 1: Node has a camera installed. State 2: Node is covered (no camera here). We do bottom-up postorder DFS: (1) If any child is State 0, current node MUST install a camera -> returns State 1 (increment camera count). (2) If any child is State 1, current node is covered -> returns State 2. (3) Otherwise, current node is uncovered -> returns State 0. At the root, if root is State 0, we add 1 final camera.",
    interviewInsight:
      "Greedy strategy: Placing cameras on parents of leaf nodes always covers strictly more nodes than placing cameras on leaf nodes themselves.",
    cppSolution: `class Solution {
public:
    int minCameraCover(TreeNode* root) {
        int cameras = 0;
        if (dfs(root, cameras) == 0) {
            cameras++; // Root itself is uncovered
        }
        return cameras;
    }
    
private:
    // 0: Uncovered, 1: Has camera, 2: Covered
    int dfs(TreeNode* node, int& cameras) {
        if (!node) return 2; // Null nodes are considered covered
        
        int left = dfs(node->left, cameras);
        int right = dfs(node->right, cameras);
        
        if (left == 0 || right == 0) {
            cameras++;
            return 1; // Install camera here to cover uncovered child
        }
        
        if (left == 1 || right == 1) {
            return 2; // Covered by child's camera
        }
        
        return 0; // Uncovered, asking parent to place camera
    }
};`,
    pythonSolution: `class Solution:
    def minCameraCover(self, root: Optional[TreeNode]) -> int:
        cameras = 0
        
        # 0: Uncovered, 1: Has Camera, 2: Covered
        def dfs(node: Optional[TreeNode]) -> int:
            nonlocal cameras
            if not node:
                return 2
                
            left = dfs(node.left)
            right = dfs(node.right)
            
            if left == 0 or right == 0:
                cameras += 1
                return 1
                
            if left == 1 or right == 1:
                return 2
                
            return 0
            
        if dfs(root) == 0:
            cameras += 1
            
        return cameras`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  },
  {
    id: "Q80",
    questionNumber: 80,
    title: "Maximum Sum BST in Binary Tree",
    statement:
      "Given a binary tree root, return the maximum sum of all keys of any sub-tree which is also a Binary Search Tree (BST). Assume a BST is defined as follows: The left subtree of a node contains only nodes with keys strictly less than the node's key. The right subtree of a node contains only nodes with keys strictly greater than the node's key. Both the left and right subtrees must also be binary search trees.",
    difficulty: "Extreme",
    pattern: "Bottom-Up Quad-Tuple State Propagation [isBST, sum, min, max]",
    constraints: [
      "The number of nodes in the tree is in the range [1, 4 * 10^4].",
      "-4 * 10^4 <= Node.val <= 4 * 10^4"
    ],
    expectedTimeComplexity: "O(N)",
    expectedSpaceComplexity: "O(H)",
    examples: [
      {
        input: "root = [1,4,3,2,4,2,5,null,null,null,null,null,null,4,6]",
        output: "20",
        explanation: "Maximum sum in a valid BST subtree is 20 (subtree rooted at node 3: 3+2+5+4+6 = 20)."
      },
      {
        input: "root = [4,3,null,1,2]",
        output: "2",
        explanation: "Subtree [2] has max sum 2."
      }
    ],
    explanation:
      "For every node `u`, it forms a valid BST if and only if: (1) Its left subtree is a BST, (2) Its right subtree is a BST, and (3) `max(leftSubtree) < u->val < min(rightSubtree)`. We perform bottom-up postorder DFS returning a quad-tuple `NodeValue(isBST, sum, minVal, maxVal)`. If `u` forms a valid BST, `sum = u->val + leftSum + rightSum` and we update global maximum BST sum.",
    interviewInsight:
      "Base case for null nodes: `{isBST: true, sum: 0, minVal: INT_MAX, maxVal: INT_MIN}`. This guarantees leaf nodes automatically satisfy `maxLeft < node->val < minRight`.",
    cppSolution: `class Solution {
    struct SubtreeInfo {
        bool isBST;
        int sum;
        int minVal;
        int maxVal;
    };
    
public:
    int maxSumBST(TreeNode* root) {
        int maxSum = 0;
        traverse(root, maxSum);
        return maxSum;
    }
    
private:
    SubtreeInfo traverse(TreeNode* node, int& maxSum) {
        if (!node) {
            return {true, 0, INT_MAX, INT_MIN};
        }
        
        SubtreeInfo left = traverse(node->left, maxSum);
        SubtreeInfo right = traverse(node->right, maxSum);
        
        if (left.isBST && right.isBST && node->val > left.maxVal && node->val < right.minVal) {
            int currentSum = node->val + left.sum + right.sum;
            maxSum = max(maxSum, currentSum);
            int minVal = min(node->val, left.minVal);
            int maxVal = max(node->val, right.maxVal);
            return {true, currentSum, minVal, maxVal};
        }
        
        return {false, 0, 0, 0};
    }
};`,
    pythonSolution: `class Solution:
    def maxSumBST(self, root: Optional[TreeNode]) -> int:
        max_sum = 0
        
        # Returns (is_bst, subtree_sum, min_val, max_val)
        def traverse(node: Optional[TreeNode]):
            nonlocal max_sum
            if not node:
                return (True, 0, float('inf'), float('-inf'))
                
            l_bst, l_sum, l_min, l_max = traverse(node.left)
            r_bst, r_sum, r_min, r_max = traverse(node.right)
            
            if l_bst and r_bst and l_max < node.val < r_min:
                curr_sum = node.val + l_sum + r_sum
                max_sum = max(max_sum, curr_sum)
                curr_min = min(node.val, l_min)
                curr_max = max(node.val, r_max)
                return (True, curr_sum, curr_min, curr_max)
                
            return (False, 0, 0, 0)
            
        traverse(root)
        return max_sum`,
    topic: "Trees & Binary Search Trees (BST)",
    batch: 4
  }
];
