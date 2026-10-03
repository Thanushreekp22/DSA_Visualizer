export const topics = [
  { id: "arrays", name: "Arrays", count: 15 },
  { id: "strings", name: "Strings", count: 5 },
  { id: "sliding-window", name: "Sliding Window", count: 5 },
  { id: "two-pointers", name: "Two Pointers", count: 5 },
  { id: "stack-queue", name: "Stack & Queue", count: 7 },
  { id: "linked-list", name: "Linked List", count: 7 },
  { id: "hashing", name: "Hashing", count: 3 },
  { id: "binary-search", name: "Binary Search", count: 3 },
  { id: "trees", name: "Binary Tree & BST", count: 8 },
  { id: "recursion", name: "Recursion", count: 2 },
  { id: "backtracking", name: "Backtracking", count: 2 },
  { id: "greedy", name: "Greedy", count: 2 },
  { id: "heaps", name: "Heaps", count: 2 },
  { id: "graphs", name: "Graphs", count: 2 },
  { id: "dp", name: "Dynamic Programming", count: 2 }
];

export const topicTheory = {
  arrays: {
    intro:
      "An array is a contiguous block of memory that stores a fixed number of elements of the same type. Each element is reached by an index that starts at 0.",
    sections: [
      {
        title: "Indexing and traversal",
        body:
          "Reading arr[i] is O(1) because the address is computed as base + i * size. Traversing every element once is O(n). Because elements are contiguous, arrays give excellent cache locality, which is why loops over arrays are fast in practice."
      },
      {
        title: "Insertion and deletion",
        body:
          "Accessing by index is O(1), but inserting or deleting in the middle shifts every following element, costing O(n). At the end (amortized) a dynamic array append is O(1)."
      },
      {
        title: "Common patterns",
        body:
          "Linear scan, prefix sums, frequency counting with a hash map, in-place two-pointer writes, sorting before scanning, and Kadane's maximum-subarray idea cover a large share of array problems."
      },
      {
        title: "Complexity",
        body:
          "Time: O(1) access, O(n) search without sorting, O(n log n) with sorting. Space: O(1) for in-place work, O(n) when a map or extra array is used."
      }
    ]
  },
  strings: {
    intro:
      "A string is an array of characters. Most string problems reduce to scanning with two pointers, counting frequencies, or comparing windows of characters.",
    sections: [
      {
        title: "Character counting",
        body:
          "An array of size 26 (or a hash map) stores character frequencies. This turns anagram, uniqueness, and counting checks into a single O(n) pass."
      },
      {
        title: "Two-pointer scanning",
        body:
          "Valid palindrome and reverse problems move one pointer from the front and one from the back, skipping characters that are not letters or digits."
      },
      {
        title: "Complexity",
        body:
          "A single pass is O(n) time and O(1) space when the alphabet size is fixed. Comparing two strings directly costs O(n) time and can cost O(n) extra space."
      }
    ]
  },
  "sliding-window": {
    intro:
      "A sliding window keeps a contiguous range [left, right] over the data and moves the right edge forward while adjusting the left edge so the window always satisfies a condition.",
    sections: [
      {
        title: "Fixed and variable windows",
        body:
          "A fixed window has a constant size k. A variable window grows by moving right and shrinks by moving left until the condition holds again. Each index enters and leaves the window at most once, so the scan is O(n)."
      },
      {
        title: "Window state",
        body:
          "Keep a running sum, a character-frequency map, or a count of distinct elements so the condition can be checked in O(1) instead of recomputing over the whole window."
      },
      {
        title: "Complexity",
        body:
          "Time O(n) for a single pass with two pointers, space O(1) for a fixed alphabet or O(k) for a map."
      }
    ]
  },
  "two-pointers": {
    intro:
      "Two pointers move through a structure from defined positions — often one from the start and one from the end — and shrink the search space using a comparison.",
    sections: [
      {
        title: "Opposite ends",
        body:
          "In sorted arrays, compare the values at the two ends. Move the left pointer right to increase the sum, or the right pointer left to decrease it. This avoids the O(n^2) work of trying every pair."
      },
      {
        title: "Same direction (fast/slow)",
        body:
          "A write pointer lags a read pointer r to compact values in place, as in Move Zeroes or Remove Duplicates."
      },
      {
        title: "Complexity",
        body:
          "Time O(n) because each pointer moves at most n times. Space O(1) when the work is done in place."
      }
    ]
  },
  "stack-queue": {
    intro:
      "A stack is last-in-first-out: push and pop touch only the top. A queue is first-in-first-out: enqueue adds at the rear, dequeue removes from the front.",
    sections: [
      {
        title: "When to use a stack",
        body:
          "Matching parentheses, keeping a monotonic increasing or decreasing sequence, evaluating postfix expressions, and simulating recursion all rely on LIFO order."
      },
      {
        title: "When to use a queue",
        body:
          "Breadth-first search, level-order traversal, and any 'process in arrival order' task use FIFO order. A queue can be built from two stacks."
      },
      {
        title: "Monotonic stack",
        body:
          "While the top of the stack is worse than the current element, pop it and resolve answers. Each element is pushed and popped at most once, giving O(n)."
      },
      {
        title: "Complexity",
        body:
          "Push, pop, enqueue, and dequeue are O(1). Scanning n elements with a stack or queue is O(n) time and O(n) space in the worst case."
      }
    ]
  },
  "linked-list": {
    intro:
      "A linked list stores data in nodes. Each node holds a value and a reference to the next node, so the list is built from scattered memory rather than a contiguous block.",
    sections: [
      {
        title: "Traversal and the dummy node",
        body:
          "Traversal is O(n) with no random access. A dummy head node removes the special case of deleting or reversing the first node."
      },
      {
        title: "Fast and slow pointers",
        body:
          "A slow pointer moves one node at a time and a fast pointer moves two. Their meeting point finds a cycle and the middle of the list."
      },
      {
        title: "Reversal",
        body:
          "Keep prev, curr, and next. Save next, point curr's link back to prev, advance both pointers. The links are rewritten in place with O(1) extra space."
      },
      {
        title: "Complexity",
        body:
          "Time O(n) for a single pass, O(n/2) for fast/slow. Space O(1) in place, O(n) only if recursion is used."
      }
    ]
  },
  hashing: {
    intro:
      "Hashing maps a key to a bucket with a hash function, giving near O(1) average lookup, insert, and delete.",
    sections: [
      {
        title: "Frequency and membership",
        body:
          "Count occurrences with a map, or store seen values in a set to answer 'have I seen this before?' in one pass."
      },
      {
        title: "Prefix sums with a map",
        body:
          "Store prefixSum -> first index. For a target k, check whether prefixSum - k already exists. This converts a subarray-sum search from O(n^2) to O(n)."
      },
      {
        title: "Complexity",
        body:
          "Average O(1) per operation, worst case O(n) under heavy collisions. Space O(n) for the stored keys."
      }
    ]
  },
  "binary-search": {
    intro:
      "Binary search works on a sorted range. It compares the middle element with the target and discards the half that cannot contain the answer.",
    sections: [
      {
        title: "The search range",
        body:
          "Keep lo and hi as the inclusive bounds. Compute mid with lo + (hi - lo) / 2 to avoid overflow, then move lo = mid + 1 or hi = mid - 1 so the range always shrinks."
      },
      {
        title: "Pattern variants",
        body:
          "Exact match, lower bound (first index >= target), upper bound, and 'find the first true in a monotonic predicate' are all the same loop with a different comparison."
      },
      {
        title: "Complexity",
        body:
          "Time O(log n) because the range halves each step. Space O(1) iteratively, O(log n) with recursion."
      }
    ]
  },
  trees: {
    intro:
      "A binary tree is made of nodes that each have at most two children. A binary search tree adds the rule that left is smaller and right is larger, which makes search follow one path.",
    sections: [
      {
        title: "Traversals",
        body:
          "Depth-first: preorder (node, left, right), inorder (left, node, right), postorder (left, right, node). Breadth-first: level order with a queue."
      },
      {
        title: "Recursion on subtrees",
        body:
          "Most tree questions ask a function to return information about its subtree — depth, height, balance, or a found node — and combine the results at the parent."
      },
      {
        title: "BST operations",
        body:
          "Search and insert walk down one path, O(h). Deletion handles three cases: leaf, one child, and two children (replace with the inorder successor)."
      },
      {
        title: "Complexity",
        body:
          "O(n) to visit every node. Height h is O(log n) for a balanced tree and O(n) for a skewed one."
      }
    ]
  },
  recursion: {
    intro:
      "Recursion solves a problem by calling a smaller version of itself until it reaches a base case that can be answered directly.",
    sections: [
      {
        title: "Base case and smaller subproblem",
        body:
          "Every recursive function needs a base case that stops the calls and a recursive case that moves strictly closer to that base case."
      },
      {
        title: "Call stack",
        body:
          "Each call keeps its own local variables on the stack. Deep recursion can overflow the stack, which is why some problems are converted to an explicit loop."
      },
      {
        title: "Complexity",
        body:
          "The time equals the number of calls. Fibonacci by naive recursion is O(2^n), but with memoization it is O(n)."
      }
    ]
  },
  backtracking: {
    intro:
      "Backtracking builds a candidate solution one choice at a time and abandons a branch as soon as it cannot lead to a valid answer.",
    sections: [
      {
        title: "Choose, explore, un-choose",
        body:
          "Push a choice onto the path, recurse, then undo the choice (pop) before trying the next one. This reuses a single path buffer instead of copying at every step."
      },
      {
        title: "Pruning",
        body:
          "Stop early when a partial path already violates a constraint. Pruning is what makes backtracking practical on large inputs."
      },
      {
        title: "Complexity",
        body:
          "Subsets and permutations generate 2^n and n! leaves. Each leaf costs O(n) to copy, so the copy dominates the total work."
      }
    ]
  },
  greedy: {
    intro:
      "A greedy algorithm makes the locally best choice at each step and never revisits that decision.",
    sections: [
      {
        title: "Sorting first",
        body:
          "Most greedy interval and difference problems become correct only after sorting by a key such as start time or value."
      },
      {
        title: "Why it works",
        body:
          "Greedy needs an exchange argument: any optimal solution can be swapped to match the greedy choice without becoming worse. Without that property greedy can fail."
      },
      {
        title: "Complexity",
        body:
          "Sorting dominates: O(n log n). The following single pass is O(n). Space is O(1) or O(n) for results."
      }
    ]
  },
  heaps: {
    intro:
      "A heap is a complete binary tree stored in an array that keeps the smallest (min-heap) or largest (max-heap) element at the root.",
    sections: [
      {
        title: "Operations",
        body:
          "Push and pop cost O(log n) because the element moves along one root-to-leaf path. Peek at the root is O(1)."
      },
      {
        title: "Size-k selection",
        body:
          "Keep a heap of size k. For k smallest with a max-heap of size k, the largest of the small set stays on top and is removed when a smaller value arrives."
      },
      {
        title: "Complexity",
        body:
          "Building a heap from n items is O(n). Processing n items through a size-k heap is O(n log k)."
      }
    ]
  },
  graphs: {
    intro:
      "A graph is vertices connected by edges, either directed or undirected, often weighted. It may be given as an adjacency list or an adjacency matrix.",
    sections: [
      {
        title: "Breadth-first search",
        body:
          "A queue expands level by level. BFS finds the shortest path in an unweighted graph and is the standard way to scan a grid or a component."
      },
      {
        title: "Depth-first search",
        body:
          "A stack or recursion dives down one branch before backtracking. DFS suits cycle detection, topological order, and connected components."
      },
      {
        title: "Visited state",
        body:
          "Mark a node visited when it enters the queue or stack, not when it is removed, otherwise the same node is enqueued many times."
      },
      {
        title: "Complexity",
        body:
          "Adjacency list: O(V + E). Adjacency matrix: O(V^2). Grid problems treat each cell as a vertex, so the work is O(rows * cols)."
      }
    ]
  },
  dp: {
    intro:
      "Dynamic programming solves overlapping subproblems once and reuses their answers. It needs optimal substructure and repeated work.",
    sections: [
      {
        title: "State and transition",
        body:
          "Define dp[i] as the best answer for the first i items. Write the recurrence that builds dp[i] from earlier states, then choose an evaluation order that makes dependencies available."
      },
      {
        title: "Base case",
        body:
          "The smallest subproblem (often dp[0]) is filled directly so every later state has something to read."
      },
      {
        title: "Space optimization",
        body:
          "If dp[i] only depends on the last few states, keep just those variables instead of the whole table, cutting space from O(n) to O(1)."
      },
      {
        title: "Complexity",
        body:
          "Time is the number of states times the work per state. Coin Change over amount t is O(t * coins)."
      }
    ]
  }
};

