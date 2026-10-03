/* Rich, topic-specific theory + interactive visualization step traces
   for each of the 15 topics. Steps reuse the existing StepRenderer part
   types (array, map, set, stack, queue, ll, tree, graph, dp, bars, vars,
   text, result) so the theory player renders with the same diagram code. */

export const topicLessons = {
  arrays: {
    lesson: {
      intro:
        "An array is a contiguous block of memory holding a fixed number of same-type elements. Because every element sits at base + i × size, reading any element takes the same work regardless of its position.",
      sections: [
        {
          title: "Storage and access",
          body:
            "Elements are stored back-to-back with no gaps, so arr[i] computes the address arithmetically: O(1). Iterating touches consecutive addresses, giving excellent cache locality — a plain loop over an array usually beats traversing the same values through pointers."
        },
        {
          title: "Indexing and traversal",
          body:
            "Indices run 0 to n − 1. Zero-based indexing makes arr[j] − arr[i] equal the count of elements between them. Traversal is one O(n) pass; nested loops over one array give O(n²) pair enumeration."
        },
        {
          title: "Insertion, deletion, updating",
          body:
            "Updating arr[i] is O(1). Inserting or deleting at position i must shift every later element to keep contiguity: O(n). Appending to a dynamic array is amortized O(1) — the backing buffer doubles when it fills."
        },
        {
          title: "Static vs dynamic arrays",
          body:
            "A static array (int[10]) has fixed capacity chosen at creation. A dynamic array (ArrayList) grows by allocating a bigger buffer and copying: n appends cost O(n) total, so one append is O(1) amortized."
        },
        {
          title: "Prefix sums",
          body:
            "pref[i] = a[0] + … + a[i−1] is built in one O(n) pass. Then any range sum a[l … r] = pref[r+1] − pref[l] in O(1). Classic time-for-space exchange: O(n) preprocessing for O(1) queries."
        },
        {
          title: "Kadane's algorithm",
          body:
            "cur = max(a[i], cur + a[i]) asks at each index: extend the running subarray, or restart here? best = max(best, cur) keeps the global maximum. One pass, O(n) time, O(1) space — dynamic programming collapsed into two variables."
        },
        {
          title: "Two-pointer and in-place patterns",
          body:
            "Opposite pointers converge on a sorted pair-sum; same-direction pointers maintain a valid window while a slow writer compacts values in place. Both pointers only move forward, so the scan stays O(n). Always confirm writing at i will not overwrite data you still need to read."
        },
        {
          title: "Common patterns and complexity",
          body:
            "Linear scan → prefix sum → frequency map → two pointers → sort-then-scan → Kadane covers most array problems. Complexity: access O(1), search O(n) unsorted / O(log n) sorted, insert O(n), space O(1) in place or O(n) for extra tables."
        }
      ],
      example: {
        title: "Example — range sums with a prefix array",
        body:
          "a = [2, 4, 6, 8] builds pref = [0, 2, 6, 12, 20]. Sum of indices 1..2 = pref[3] − pref[1] = 12 − 2 = 10, which equals 4 + 6. Every later query is the same subtraction."
      },
      compare: [
        {
          label: "Static vs dynamic",
          a: "Static: fixed size, no copy cost, size known upfront.",
          b: "Dynamic: grows automatically, occasional O(n) reallocation."
        },
        {
          label: "Array vs linked list",
          a: "Array: O(1) index, cache friendly, O(n) insert.",
          b: "Linked list: O(n) index, poor locality, O(1) insert given a node."
        }
      ]
    },
    viz: {
      title: "Array traversal and Kadane's algorithm",
      steps: [
        {
          title: "Creation and indexing",
          action: "Allocate the array; index i points at the first slot.",
          parts: [
            { t: "array", label: "arr = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], ptrs: [{ i: 0, label: "i", c: "cur" }] },
            { t: "text", value: "arr[0] is O(1): address = base + 0 × 4 bytes." }
          ]
        },
        {
          title: "Traversal",
          action: "Move i one slot at a time; each element is read exactly once.",
          parts: [
            { t: "array", label: "Traversing", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], marks: { 2: "cur" }, ptrs: [{ i: 2, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "i", v: 2, c: "cur" }, { k: "visited", v: 3 }] }
          ]
        },
        {
          title: "Kadane — start subarray",
          action: "cur = max(-2, cur + -2) → restart at -2; best = -2.",
          parts: [
            { t: "array", label: "Kadane pass", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], marks: { 0: "cur" }, ptrs: [{ i: 0, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "cur", v: -2, c: "bad" }, { k: "best", v: -2, c: "bad" }] }
          ]
        },
        {
          title: "Kadane — extend",
          action: "cur = max(1, -2 + 1) = 1; best = max(-2, 1) = 1.",
          parts: [
            { t: "array", label: "Kadane pass", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], marks: { 0: "dim", 1: "ok" }, ptrs: [{ i: 1, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "cur", v: 1, c: "ok" }, { k: "best", v: 1, c: "ok" }] }
          ]
        },
        {
          title: "Kadane — best window grows",
          action: "Window 3..6 sums to 4 −1 + 2 + 1 = 6; best updates to 6.",
          parts: [
            { t: "array", label: "Best subarray", values: [-2, 1, -3, 4, -1, 2, 1, -5, 4], marks: { 3: "ok", 4: "ok", 5: "ok", 6: "ok", 8: "dim", 0: "dim", 1: "dim", 2: "dim", 7: "dim" }, ptrs: [{ i: 6, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "cur", v: 6, c: "ok" }, { k: "best", v: 6, c: "ok" }] }
          ]
        },
        {
          title: "Result",
          action: "Negative tail is dropped; the maximum subarray sum is 6.",
          parts: [{ t: "result", label: "Kadane answer", value: 6 }]
        }
      ]
    }
  },
  strings: {
    lesson: {
      intro:
        "A string is an array of characters with extra operations attached. Almost every string problem reduces to three moves: scan with pointers, count with a frequency table, or compare a window of characters.",
      sections: [
        {
          title: "Characters, indices, traversal",
          body:
            "s.charAt(i) reaches character i in O(1). A loop visits each character once: O(n). Treat length, charAt, and substring as O(1)/O(k) building blocks so you can reason about cost precisely."
        },
        {
          title: "Immutability in Java",
          body:
            "Java Strings are immutable: every replace, substring, or + allocates a new String. Inside a loop this turns O(n) work into O(n²) allocations. Use StringBuilder (amortized O(1) append) when building strings character by character."
        },
        {
          title: "Frequency counting",
          body:
            "freq[c]++ in one pass builds a 26-slot array (fixed alphabet) or a HashMap (any Unicode). Anagram and uniqueness checks become a single O(n) pass over the table afterwards."
        },
        {
          title: "Anagrams",
          body:
            "Two strings are anagrams iff they share length and character multiset. Sort both and compare (O(n log n)), or count with one shared table — increment for s, decrement for t, and confirm every count is zero (O(n))."
        },
        {
          title: "Palindindromes and reversal",
          body:
            "Two pointers from the ends skip non-alphanumeric characters, compare lowercased characters, and move inwards; meeting in the middle confirms a palindrome. Reversal swaps s[i] with s[n−1−i] — the same opposite-direction motion, O(n) time, O(1) space."
        },
        {
          title: "Hashing for strings",
          body:
            "A polynomial hash h = ((c₀·B + c₁)·B + …) mod M maps any string to one integer, enabling O(1) bucket lookups for grouping anagrams or detecting repeated substrings. Collisions are resolved by comparing the real strings in the bucket."
        },
        {
          title: "Complexity",
          body:
            "Single pass: O(n) time and O(1) space for a fixed alphabet (O(k) for a map of distinct characters). Comparing two strings is O(n). In Java, concatenation inside loops is O(n²) unless you use StringBuilder."
        }
      ],
      example: {
        title: "Example — palindrome check with cleanup",
        body:
          "s = \"A man, a plan, a canal: Panama\". Left and right skip non-letters, compare lowercased pairs (a/a, n/n, m/m …) and move inwards. Both pointers meet with no mismatch, so the string is a palindrome."
      },
      compare: [
        {
          label: "Counting vs sorting for anagrams",
          a: "Frequency tables: O(n) time, O(1) space for 26 letters.",
          b: "Sorting both: O(n log n) time, O(n) space for copies."
        },
        {
          label: "String vs StringBuilder",
          a: "String: immutable, each + allocates → O(n²) in loops.",
          b: "StringBuilder: mutable buffer, amortized O(1) append."
        }
      ]
    },
    viz: {
      title: "Palindrome two-pointers and frequency counting",
      steps: [
        {
          title: "Character traversal",
          action: "Index i walks the string; each character is visited once.",
          parts: [
            { t: "array", label: "\"racecar\"", values: ["r", "a", "c", "e", "c", "a", "r"], ptrs: [{ i: 0, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "i", v: 0, c: "cur" }, { k: "len", v: 7 }] }
          ]
        },
        {
          title: "Two pointers compare ends",
          action: "left = r matches right = r → move both inwards.",
          parts: [
            { t: "array", label: "Palindrome check", values: ["r", "a", "c", "e", "c", "a", "r"], marks: { 0: "ok", 6: "ok" }, ptrs: [{ i: 0, label: "L", c: "l" }, { i: 6, label: "R", c: "r" }] }
          ]
        },
        {
          title: "Meeting in the middle",
          action: "All pairs matched and L crossed R → palindrome confirmed.",
          parts: [
            { t: "array", label: "All matched", values: ["r", "a", "c", "e", "c", "a", "r"], marks: { 0: "ok", 1: "ok", 2: "ok", 3: "ok", 4: "ok", 5: "ok", 6: "ok" }, ptrs: [{ i: 3, label: "L", c: "l" }, { i: 3, label: "R", c: "r" }] },
            { t: "result", label: "Palindrome", value: "true" }
          ]
        },
        {
          title: "Frequency counting",
          action: "Walk \"aab\" and increment freq[c] for each character.",
          parts: [
            { t: "array", label: "\"aab\"", values: ["a", "a", "b"], marks: { 0: "cur" }, ptrs: [{ i: 0, label: "i", c: "cur" }] },
            { t: "map", label: "freq[26]", entries: [["a", 1]], hiKey: "a" }
          ]
        },
        {
          title: "Frequency table complete",
          action: "Final counts: a → 2, b → 1. The table IS the character multiset.",
          parts: [
            { t: "map", label: "freq[26] final", entries: [["a", 2], ["b", 1]] },
            { t: "result", label: "Distinct chars", value: 2 }
          ]
        },
        {
          title: "Anagram comparison",
          action: "Increment for s, decrement for t; every count back to 0 means anagram.",
          parts: [
            { t: "map", label: "shared count (listen / silent)", entries: [["l", 0], ["i", 0], ["s", 0], ["t", 0], ["e", 0], ["n", 0]] },
            { t: "result", label: "Anagram", value: "true" }
          ]
        }
      ]
    }
  },
  "sliding-window": {
    lesson: {
      intro:
        "A sliding window keeps a contiguous range [left, right] over the data and moves the right edge forward while adjusting the left edge so the range always satisfies a condition. Each element enters and leaves once, so an O(n²) brute force collapses to O(n).",
      sections: [
        {
          title: "The technique in one sentence",
          body:
            "Instead of recomputing over every subarray, maintain the answer incrementally: add the new element on the right, remove the element falling off the left. The window is just two indices plus whatever state (sum, counts) you carry with them."
        },
        {
          title: "Fixed-size windows",
          body:
            "When the window length is constant k (max of every k-element slice), slide both edges together: add a[i], and once i ≥ k subtract a[i−k]. One pass, O(n) time, O(1) extra state."
        },
        {
          title: "Variable-size windows",
          body:
            "right expands while the window is invalid; left contracts until it is valid again. The invariant 'window is valid' is restored after every move of either edge — this expand/shrink dance is the heart of the pattern."
        },
        {
          title: "Window state and frequency maps",
          body:
            "State can be a running sum, a count of distinct characters, or a frequency map. Update it in O(1) per edge move: sum += in, sum -= out; map[c]++, map[c]-- (delete the key when it hits zero if you track distinctness)."
        },
        {
          title: "When to apply it",
          body:
            "The keyword is contiguous: longest/shortest subarray or substring satisfying a constraint, at most k distinct, sum ≥ target, no repeating characters. If the problem asks for a non-contiguous subset, sliding window does not apply."
        },
        {
          title: "Common mistakes",
          body:
            "Forgetting to shrink after moving right (window invalid), off-by-one at the boundaries (use inclusive [l, r] consistently), losing O(n) by resetting the window instead of sliding it, and assuming sorted input is required (it is not)."
        },
        {
          title: "Complexity",
          body:
            "Time O(n) because each index is added and removed at most once. Space O(1) for sums, O(k) for a frequency map bounded by alphabet or window size."
        }
      ],
      example: {
        title: "Example — longest substring without repeats",
        body:
          "s = \"abcabcbb\". right walks the string; when a repeat appears inside [left, right], left jumps past the previous occurrence. The best window seen is \"abc\" with length 3."
      },
      compare: [
        {
          label: "Fixed vs variable window",
          a: "Fixed: size k known, just add and subtract at distance k.",
          b: "Variable: expand to grow, shrink to restore validity."
        },
        {
          label: "Sliding window vs nested loops",
          a: "Brute force recomputes each window: O(n·k) or O(n²).",
          b: "Sliding maintains incrementally: O(n), each element touched twice."
        }
      ]
    },
    viz: {
      title: "Fixed and variable windows",
      steps: [
        {
          title: "Window opens",
          action: "left = 0, right = 0 — window holds one element.",
          parts: [
            { t: "array", label: "arr", values: [2, 1, 5, 1, 3, 2], win: [0, 0], ptrs: [{ i: 0, label: "L", c: "l" }, { i: 0, label: "R", c: "r" }] },
            { t: "vars", items: [{ k: "sum", v: 2, c: "cur" }] }
          ]
        },
        {
          title: "Expanding (fixed window k = 3)",
          action: "Move right; sum += a[right].",
          parts: [
            { t: "array", label: "k = 3 window", values: [2, 1, 5, 1, 3, 2], win: [0, 2], ptrs: [{ i: 0, label: "L", c: "l" }, { i: 2, label: "R", c: "r" }] },
            { t: "vars", items: [{ k: "sum", v: 8, c: "cur" }, { k: "size", v: 3 }] }
          ]
        },
        {
          title: "Sliding forward",
          action: "Add a[3], subtract a[0]: window moves without rescanning.",
          parts: [
            { t: "array", label: "k = 3 window", values: [2, 1, 5, 1, 3, 2], win: [1, 3], marks: { 0: "dim" }, ptrs: [{ i: 1, label: "L", c: "l" }, { i: 3, label: "R", c: "r" }] },
            { t: "vars", items: [{ k: "sum", v: 7, c: "cur" }] }
          ]
        },
        {
          title: "Variable window shrinks",
          action: "Constraint broken → advance left until valid again.",
          parts: [
            { t: "array", label: "restoring validity", values: [2, 1, 5, 1, 3, 2], win: [3, 5], marks: { 0: "dim", 1: "dim", 2: "dim" }, ptrs: [{ i: 3, label: "L", c: "l" }, { i: 5, label: "R", c: "r" }] },
            { t: "vars", items: [{ k: "sum", v: 6, c: "ok" }, { k: "valid", v: "true", c: "ok" }] }
          ]
        },
        {
          title: "Frequency map tracks distinct chars",
          action: "Each edge move updates one entry in O(1).",
          parts: [
            { t: "array", label: "\"abba\"", values: ["a", "b", "b", "a"], marks: { 0: "dim", 1: "ok", 2: "ok", 3: "cur" }, ptrs: [{ i: 1, label: "L", c: "l" }, { i: 3, label: "R", c: "r" }] },
            { t: "map", label: "window freq", entries: [["a", 1], ["b", 1]], hiKey: "a" }
          ]
        },
        {
          title: "Best window recorded",
          action: "Track the maximum window length seen across the scan.",
          parts: [
            { t: "result", label: "max length", value: 3 }
          ]
        }
      ]
    }
  },
  "two-pointers": {
    lesson: {
      intro:
        "Two pointers are two indices that move through the data with a shared invariant — usually towards each other, or one chasing the other. Coordinated motion turns pair enumeration from O(n²) into O(n).",
      sections: [
        {
          title: "Opposite-direction pointers",
          body:
            "left starts at 0, right at n−1, and they converge. On sorted data the sum tells you which way to move: too small → left++ (bigger), too large → right-- (smaller). Sorted input is what makes the decision safe — you know exactly what each move does."
        },
        {
          title: "Same-direction (fast/slow writer)",
          body:
            "Both pointers start at the left and only move forward; a gap between them means work. Removing duplicates or moving zeroes uses slow as the write head and fast as the scan head: arr[slow++] = arr[fast]."
        },
        {
          title: "Fast and slow (cycle detection)",
          body:
            "slow moves one step, fast moves two. If they ever meet, a cycle exists (Floyd's algorithm); if fast runs off the end, there is none. In a linked list the same idea finds the cycle start at distance μ from the head once they meet."
        },
        {
          title: "Sorted-array applications",
          body:
            "Pair with a target sum, removing duplicates in place, merging two sorted arrays, comparing version strings, and trapping rain water all run on two pointers with an O(n) sweep."
        },
        {
          title: "In-place modification patterns",
          body:
            "The write pointer never passes the read pointer, so overwritten values have already been consumed. Partitioning (Dutch national flag) uses three pointers to bucket values below, equal to, and above a pivot in one pass."
        },
        {
          title: "Complexity and pitfalls",
          body:
            "Time O(n) after any required sort (total O(n log n)); space O(1). Pitfalls: moving both pointers in one branch (skips candidates), forgetting to stop when pointers cross, and using opposite pointers on unsorted data."
        }
      ],
      example: {
        title: "Example — two-sum in a sorted array",
        body:
          "arr = [1, 2, 4, 6, 8, 11], target = 10. 1 + 11 = 12 too big → right--. 1 + 8 = 9 too small → left++. 2 + 8 = 10 → found in 4 moves instead of 15 pairs."
      },
      compare: [
        {
          label: "Two pointers vs brute force pairs",
          a: "Nested loops: every pair checked, O(n²).",
          b: "Two pointers: each pointer moves n times, O(n)."
        },
        {
          label: "Fast/slow vs opposite",
          a: "Opposite: converge on a target from both ends (sorted).",
          b: "Fast/slow: scan and compact, or detect cycles."
        }
      ]
    },
    viz: {
      title: "Opposite pointers, fast/slow, and partitioning",
      steps: [
        {
          title: "Converging on a target",
          action: "sum too large → right--; sum too small → left++.",
          parts: [
            { t: "array", label: "target = 10", values: [1, 2, 4, 6, 8, 11], marks: { 0: "cur", 5: "cur" }, ptrs: [{ i: 0, label: "L", c: "l" }, { i: 5, label: "R", c: "r" }] },
            { t: "vars", items: [{ k: "sum", v: 12, c: "bad" }] }
          ]
        },
        {
          title: "right moves in",
          action: "1 + 8 = 9 < 10 → left++.",
          parts: [
            { t: "array", label: "target = 10", values: [1, 2, 4, 6, 8, 11], marks: { 0: "cur", 4: "cur", 5: "dim" }, ptrs: [{ i: 0, label: "L", c: "l" }, { i: 4, label: "R", c: "r" }] },
            { t: "vars", items: [{ k: "sum", v: 9, c: "cur" }] }
          ]
        },
        {
          title: "Match found",
          action: "2 + 8 = 10 — pair (2, 8) satisfies the target.",
          parts: [
            { t: "array", label: "target = 10", values: [1, 2, 4, 6, 8, 11], marks: { 1: "ok", 4: "ok" }, ptrs: [{ i: 1, label: "L", c: "l" }, { i: 4, label: "R", c: "r" }] },
            { t: "result", label: "pair", value: "(2, 8)" }
          ]
        },
        {
          title: "Fast/slow pointers",
          action: "fast takes 2 steps, slow 1 — meeting proves a cycle.",
          parts: [
            { t: "array", label: "cycle list indices", values: [0, 1, 2, 3, 4, 5], marks: { 1: "cur", 4: "cur" }, ptrs: [{ i: 1, label: "slow", c: "l" }, { i: 4, label: "fast", c: "r" }] }
          ]
        },
        {
          title: "Dutch national flag",
          action: "Three regions: < pivot | unknown | > pivot; swap to grow the equal band.",
          parts: [
            { t: "array", label: "sort colors [2,0,2,1,1,0]", values: [2, 0, 2, 1, 1, 0], marks: { 0: "bad", 4: "ok" }, ptrs: [{ i: 0, label: "L", c: "l" }, { i: 3, label: "cur", c: "cur" }, { i: 5, label: "R", c: "r" }] }
          ]
        },
        {
          title: "Partition complete",
          action: "All zeroes left, ones middle, twos right — one pass, O(1) space.",
          parts: [
            { t: "array", label: "sorted", values: [0, 0, 1, 1, 2, 2], marks: { 0: "ok", 1: "ok", 2: "ok", 3: "ok", 4: "ok", 5: "ok" } },
            { t: "result", label: "passes", value: 1 }
          ]
        }
      ]
    }
  },
  "stack-queue": {
    lesson: {
      intro:
        "A stack is Last-In-First-Out — the most recent item is the one you get. A queue is First-In-First-Out — items come out in the order they arrived. Both are access disciplines, not storage: you can build either on arrays or linked lists.",
      sections: [
        {
          title: "Stack: LIFO",
          body:
            "Only the top is accessible: push adds to the top, pop removes from the top, peek reads it without removing. Undo history, browser back, and function calls are all stacks. Array-backed push/pop is amortized O(1)."
        },
        {
          title: "Queue: FIFO",
          body:
            "Enqueue adds at the rear, dequeue removes from the front — a waiting line. BFS, print spooling, and task scheduling are queues. A naive array dequeue shifts every element (O(n)); a linked list or circular buffer makes it O(1)."
        },
        {
          title: "Circular queues",
          body:
            "Keep front and rear indices modulo capacity so the buffer wraps around instead of wasting the space in front. One slot is left empty (or a size counter is kept) to distinguish full from empty. Both operations become O(1) with no shifting."
        },
        {
          title: "Monotonic stacks",
          body:
            "A stack whose values only ever increase (or only decrease) top-to-bottom. For next-greater-element, push indices while the current value beats the top — each index is pushed and popped once, giving O(n) instead of the O(n²) nested scan."
        },
        {
          title: "Stack vs queue as tools",
          body:
            "Reach for a stack when the newest information decides the next move (nested structure, undo, previous greater). Reach for a queue when the oldest information must be processed first (level order, shortest path in an unweighted graph)."
        },
        {
          title: "Applications",
          body:
            "Stacks: balanced parentheses, expression evaluation, DFS, undo. Queues: BFS, caching (LRU uses a doubly linked list + hash map), rate limiting. Queue from two stacks: pop by pouring one stack into the other, amortized O(1)."
        },
        {
          title: "Complexity",
          body:
            "All four operations are O(1) (amortized for dynamic arrays). Space O(n). Monotonic-stack scans are O(n) total because every element enters and leaves the stack at most once."
        }
      ],
      example: {
        title: "Example — balanced parentheses",
        body:
          "s = \"{[()]}\". Push every opening bracket; on a closing bracket, check it matches the top, then pop. Empty stack at the end → balanced. \"{[(])}\" fails because ']' does not match '(' on top."
      },
      compare: [
        {
          label: "Stack vs queue",
          a: "Stack: LIFO, newest first — nested/undo problems.",
          b: "Queue: FIFO, oldest first — level order / scheduling."
        },
        {
          label: "Monotonic stack vs brute force",
          a: "Nested loop for next greater: O(n²).",
          b: "Monotonic stack: each index pushed once, O(n)."
        }
      ]
    },
    viz: {
      title: "Push/pop, enqueue/dequeue, and next greater",
      steps: [
        {
          title: "Stack push",
          action: "push(3) — the new element becomes the top.",
          parts: [{ t: "stack", label: "Stack after push(3)", values: [3], hi: 0 }]
        },
        {
          title: "Stack grows",
          action: "push(5), push(7) — LIFO order builds.",
          parts: [{ t: "stack", label: "Stack", values: [3, 5, 7], hi: 2 }]
        },
        {
          title: "Pop returns the top",
          action: "pop() → 7, then the new top is 5.",
          parts: [{ t: "stack", label: "after pop()", values: [3, 5], hi: 1 }, { t: "result", label: "popped", value: 7 }]
        },
        {
          title: "Queue enqueue",
          action: "enqueue(A), enqueue(B), enqueue(C) — rear grows.",
          parts: [{ t: "queue", label: "Queue", values: ["A", "B", "C"], front: 0, rear: 2 }]
        },
        {
          title: "Dequeue from the front",
          action: "dequeue() → A; front advances, order preserved.",
          parts: [{ t: "queue", label: "after dequeue", values: ["A", "B", "C"], front: 1, rear: 2, hi: 1 }, { t: "result", label: "dequeued", value: "A" }]
        },
        {
          title: "Next greater element",
          action: "While top < current, pop and set its answer = current; then push the index.",
          parts: [
            { t: "array", label: "[2, 1, 2, 4, 3]", values: [2, 1, 2, 4, 3], marks: { 3: "ok" }, ptrs: [{ i: 3, label: "i", c: "cur" }] },
            { t: "stack", label: "monotonic stack (indices)", values: [0, 1, 2], hi: 2 }
          ]
        },
        {
          title: "Monotonic result",
          action: "4 resolves indices 2 and 3; remaining indices get -1.",
          parts: [
            { t: "array", label: "next greater", values: [4, 2, 4, -1, -1], marks: { 0: "ok", 1: "ok", 2: "ok", 3: "dim", 4: "dim" } },
            { t: "result", label: "complexity", value: "O(n)" }
          ]
        }
      ]
    }
  },
  "linked-list": {
    lesson: {
      intro:
        "A linked list stores each value in a node that also holds a pointer to the next node. Nothing is contiguous — the list lives wherever nodes were allocated, and the pointers are the only thing holding it together.",
      sections: [
        {
          title: "Nodes and pointers",
          body:
            "A singly node holds { value, next }. Walking the list follows next until null: O(n) traversal, no random access — reaching element i costs i hops. A doubly node adds prev, enabling backward scans and O(1) deletion when you already hold the node."
        },
        {
          title: "Insertion and deletion",
          body:
            "Given a position, insertion relinks: new.next = curr.next; curr.next = new — O(1) after the O(n) walk. Deletion is cur.next = cur.next.next. The classic bug is losing the rest of the list by overwriting a pointer before saving what it pointed to."
        },
        {
          title: "Reversal",
          body:
            "Three pointers — prev = null, cur = head, next = cur.next — walk the list flipping cur.next = prev. Iterative reversal is O(n) time, O(1) space. The recursive version reverses the tail first, then relinks on the way back: O(n) stack space."
        },
        {
          title: "Fast and slow pointers",
          body:
            "slow moves 1, fast moves 2. Meeting proves a cycle. Finding the middle: when fast reaches the end, slow is halfway. Finding the cycle start: reset one pointer to head, advance both one step — they meet at the cycle entrance."
        },
        {
          title: "Singly vs doubly",
          body:
            "Singly: half the memory per node, deletion needs the predecessor. Doubly: O(1) deletion given the node and easy reverse iteration — used by LRU caches and Java's LinkedList."
        },
        {
          title: "Applications",
          body:
            "Undo stacks, adjacency lists, LRU caches (hash map + doubly linked list), polynomial arithmetic, and as the backing structure for stacks/queues when size is unknown. Hash collision chains are linked lists too."
        },
        {
          title: "Complexity",
          body:
            "Traversal O(n), insert/delete at a known node O(1), search O(n), no cache locality (each hop is a pointer chase). Space O(n) plus O(1) working memory for iterative algorithms."
        }
      ],
      example: {
        title: "Example — reverse 1 → 2 → 3",
        body:
          "prev=null, cur=1: 1→null. Move: prev=1, cur=2: 2→1. Move: prev=2, cur=3: 3→2. Done: head=prev=3, list reads 3 → 2 → 1 → null."
      },
      compare: [
        {
          label: "Array vs linked list",
          a: "Array: O(1) index, contiguous, O(n) middle insert.",
          b: "Linked list: O(n) index, scattered, O(1) insert at a node."
        },
        {
          label: "Iterative vs recursive reversal",
          a: "Iterative: O(1) space, three pointers.",
          b: "Recursive: elegant, but O(n) call-stack space."
        }
      ]
    },
    viz: {
      title: "Reversal, cycle detection, and rotation",
      steps: [
        {
          title: "List creation",
          action: "Head points to the first node; each node points right.",
          parts: [{ t: "ll", label: "1 → 2 → 3 → 4", nodes: [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }], ptrs: [{ i: 0, label: "head", c: "cur" }] }]
        },
        {
          title: "Reversal step 1",
          action: "cur.next = prev — node 1 now points to null.",
          parts: [{ t: "ll", label: "reversing", nodes: [{ v: 1, hi: true }, { v: 2 }, { v: 3 }, { v: 4 }], broken: [0], ptrs: [{ i: 0, label: "prev", c: "l" }, { i: 1, label: "cur", c: "cur" }] }]
        },
        {
          title: "Reversal step 2",
          action: "Pointer 1→2 flipped to 2→1; advance all three pointers.",
          parts: [{ t: "ll", label: "reversing", nodes: [{ v: 1, hi: true }, { v: 2, hi: true }, { v: 3 }, { v: 4 }], broken: [0, 1], newLink: [1], ptrs: [{ i: 1, label: "prev", c: "l" }, { i: 2, label: "cur", c: "cur" }] }]
        },
        {
          title: "Reversal complete",
          action: "cur became null → new head = prev = 4.",
          parts: [{ t: "ll", label: "4 → 3 → 2 → 1", nodes: [{ v: 4, hi: true }, { v: 3 }, { v: 2 }, { v: 1 }], ptrs: [{ i: 0, label: "head", c: "cur" }] }, { t: "result", label: "new head", value: 4 }]
        },
        {
          title: "Cycle detection",
          action: "fast moves 2, slow moves 1 — they meet inside the cycle.",
          parts: [{ t: "ll", label: "cycle: 3 → 1", nodes: [{ v: 1 }, { v: 2, hi: true }, { v: 3, hi: true }, { v: 4 }], ptrs: [{ i: 1, label: "slow", c: "l" }, { i: 2, label: "fast", c: "r" }] }, { t: "result", label: "cycle", value: "detected" }]
        },
        {
          title: "Linked-list rotation",
          action: "Rotate 1→2→3→4→5 by 2: walk to node 3, make it head, old tail links to old head.",
          parts: [{ t: "ll", label: "rotate k = 2", nodes: [{ v: 3, hi: true }, { v: 4 }, { v: 5 }, { v: 1 }, { v: 2 }], ptrs: [{ i: 0, label: "head", c: "cur" }] }]
        }
      ]
    }
  },
  hashing: {
    lesson: {
      intro:
        "Hashing maps a key to a bucket index with a hash function, so lookups skip searching entirely: compute the index, go straight there. It is the idea behind HashMap, HashSet, and counting tables.",
      sections: [
        {
          title: "Hash functions",
          body:
            "A good hash spreads keys evenly across buckets and is cheap to compute: h(key) = key % capacity for integers, a polynomial rolling hash for strings. Same key must always produce the same index — that is the contract that makes lookup O(1)."
        },
        {
          title: "HashMap and HashSet",
          body:
            "HashMap stores key → value pairs; HashSet stores just keys (backed by a map with a dummy value). get/put/remove are O(1) average. HashSet membership checking answers 'have I seen this?' in one step — the workhorse of two-sum and duplicate detection."
        },
        {
          title: "Collisions",
          body:
            "Two keys can hash to the same bucket. Java 8 resolves with chaining: each bucket is a list (treeified to a red-black tree beyond 8 entries). With n entries and m buckets, average chain length is n/m; keeping m proportional to n keeps operations O(1)."
        },
        {
          title: "Frequency counting",
          body:
            "map.merge(key, 1, Integer::sum) in a single pass builds a histogram. Anagram grouping, top-k frequent elements, and 'first unique character' all read from this histogram afterwards."
        },
        {
          title: "Prefix sum with hashing",
          body:
            "Store prefix sums in a map with count of occurrences: subarrays summing to k correspond to prefix[i] − prefix[j] = k, so for each prefix check whether prefix − k was seen before. This turns the O(n²) subarray count into O(n)."
        },
        {
          title: "Average vs worst case",
          body:
            "Average O(1) assumes a good hash and uniform buckets. Worst case — every key collides — degrades to O(n) per operation. Adversarial keys (sequential integers with a poor hash) are why hash quality matters."
        },
        {
          title: "Complexity",
          body:
            "get/put/remove: O(1) average, O(n) worst. Space O(n). Iteration order is unspecified — never rely on HashMap ordering for output."
        }
      ],
      example: {
        title: "Example — two-sum with a map",
        body:
          "Walk [2, 7, 11, 15] once: for each value v ask if target − v is already in the map. At 7 the map holds {2 → 0}, and 10 − 7 = 3 is absent; the answer appears the moment the complement was stored earlier — a single O(n) pass."
      },
      compare: [
        {
          label: "HashMap vs direct-address array",
          a: "Array: O(1) but needs known, bounded keys and O(range) space.",
          b: "HashMap: O(1) average for any key type, O(n) space."
        },
        {
          label: "Average vs worst case",
          a: "Average: uniform hash → O(1) operations.",
          b: "Worst: all keys collide → O(n) chains, O(n²) scan."
        }
      ]
    },
    viz: {
      title: "Map insertion, searching, and prefix-sum counting",
      steps: [
        {
          title: "First insertion",
          action: "hash(2) picks a bucket; the map stores 2 → index 0.",
          parts: [{ t: "array", label: "[2, 7, 11, 15]", values: [2, 7, 11, 15], marks: { 0: "cur" }, ptrs: [{ i: 0, label: "i", c: "cur" }] }, { t: "map", label: "seen", entries: [["2", 0]], hiKey: "2" }]
        },
        {
          title: "Search for a key",
          action: "Looking up 7: hash(7) → bucket → O(1) hit.",
          parts: [{ t: "map", label: "seen", entries: [["2", 0], ["7", 1]], hiKey: "7" }, { t: "result", label: "contains(7)", value: "true" }]
        },
        {
          title: "Frequency map updates",
          action: "Each arrival increments its counter in O(1).",
          parts: [{ t: "map", label: "freq", entries: [["a", 3], ["b", 1], ["c", 2]], hiKey: "a" }]
        },
        {
          title: "HashSet membership",
          action: "add(x) reports false if x already present → duplicate found.",
          parts: [{ t: "set", label: "visited", values: [4, 9, 12], hi: 9 }, { t: "result", label: "duplicate", value: 9 }]
        },
        {
          title: "Prefix sum tracking",
          action: "Register prefix sum 6 with count 1; later prefixes reuse it.",
          parts: [{ t: "array", label: "arr = [1, 2, 3, -1]", values: [1, 2, 3, -1], marks: { 0: "ok", 1: "ok", 2: "ok" }, ptrs: [{ i: 2, label: "i", c: "cur" }] }, { t: "map", label: "prefix → count", entries: [["0", 1], ["1", 1], ["3", 1], ["6", 1]], hiKey: "6" }]
        },
        {
          title: "Subarrays with sum k = 5",
          action: "For each prefix p, count of (p − 5) answers how many subarrays end here.",
          parts: [{ t: "map", label: "counts used", entries: [["1", 1], ["6", 1]] }, { t: "result", label: "subarrays sum 5", value: 2 }]
        }
      ]
    }
  },
  "binary-search": {
    lesson: {
      intro:
        "Binary search checks the middle of a sorted range and discards the half that cannot contain the answer. Each step halves the search space, so a million elements need at most 20 comparisons.",
      sections: [
        {
          title: "Why sorted data matters",
          body:
            "Comparing the middle with the target only tells you which side to keep if the data is ordered — that comparison is what lets you throw away half the array safely. Without sorted order there is no information to discard with."
        },
        {
          title: "low, mid, high",
          body:
            "mid = low + (high − low) / 2 (the subtraction form avoids overflow that low + high can cause). On a match, return mid; otherwise narrow the half that still brackets the target. The loop ends when the range is empty."
        },
        {
          title: "Iterative vs recursive",
          body:
            "Iterative is the interview default: O(1) space, no stack frames. Recursive mirrors the logic with the range as arguments and is easier to read for variants, but costs O(log n) call-stack space."
        },
        {
          title: "Search boundaries",
          body:
            "first occurrence: when a[mid] matches, record mid and keep searching the left half. last occurrence: record and go right. Search insert position: find the first index where a[i] ≥ target — the lower-bound pattern that most variants reduce to."
        },
        {
          title: "Binary search on answer",
          body:
            "When the input is not sorted but the predicate 'is x feasible?' is monotonic, binary search the answer space instead: minimum capacity for shipping, minimum days to eat piles, smallest maximum subarray sum. Sort or evaluate the predicate per mid."
        },
        {
          title: "Rotated arrays, peaks, matrices",
          body:
            "A rotated sorted array is two sorted halves — decide which half mid belongs to, then recurse into the sorted side. Peak element: discard the half where a[mid] < a[mid] (a rise exists there). Row-sorted matrix: treat it as a virtual 1-D array."
        },
        {
          title: "Off-by-one errors",
          body:
            "Pick one convention and keep it: while (low ≤ high) with exclusive high, or while (low < high) with half-open ranges. Mixing 'last index' and 'one past the end' semantics is where infinite loops and skipped elements come from."
        }
      ],
      example: {
        title: "Example — searching for 23",
        body:
          "arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target = 23. mid = 16 < 23 → search right; mid = 38 > 23 → search left; mid = 23 → found at index 5. Three comparisons instead of six on average."
      },
      compare: [
        {
          label: "Linear vs binary search",
          a: "Linear: O(n), works unsorted, simplest code.",
          b: "Binary: O(log n), requires sorted data, O(n log n) to sort first."
        },
        {
          label: "Boundary vs exact match",
          a: "Exact: return the index where a[mid] == target.",
          b: "Boundary: keep moving low/high to find first/last position."
        }
      ]
    },
    viz: {
      title: "Range halving and boundary search",
      steps: [
        {
          title: "Full range",
          action: "low = 0, high = 9, mid = 4 — 16 < 23, discard the left half.",
          parts: [
            { t: "array", label: "target = 23", values: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], marks: { 4: "cur", 0: "dim", 1: "dim", 2: "dim", 3: "dim" }, ptrs: [{ i: 0, label: "low", c: "l" }, { i: 4, label: "mid", c: "cur" }, { i: 9, label: "high", c: "r" }] },
            { t: "vars", items: [{ k: "size", v: 10 }] }
          ]
        },
        {
          title: "Half discarded",
          action: "low = 5, high = 9, mid = 7 — 56 > 23, discard the right half.",
          parts: [
            { t: "array", label: "target = 23", values: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], marks: { 5: "ok", 6: "dim", 7: "cur", 8: "dim", 9: "dim", 0: "dim", 1: "dim", 2: "dim", 3: "dim", 4: "dim" }, ptrs: [{ i: 5, label: "low", c: "l" }, { i: 7, label: "mid", c: "cur" }, { i: 9, label: "high", c: "r" }] }
          ]
        },
        {
          title: "Narrowing again",
          action: "low = 5, high = 6, mid = 5 — 23 == 23, found.",
          parts: [
            { t: "array", label: "target = 23", values: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], marks: { 5: "ok", 6: "dim" }, ptrs: [{ i: 5, label: "low/mid", c: "cur" }, { i: 6, label: "high", c: "r" }] },
            { t: "result", label: "index", value: 5 }
          ]
        },
        {
          title: "First occurrence",
          action: "Match → record mid, keep searching left for an earlier copy.",
          parts: [
            { t: "array", label: "find first 23", values: [2, 5, 8, 12, 16, 23, 23, 56], marks: { 5: "ok", 6: "cur" }, ptrs: [{ i: 5, label: "first", c: "ok" }, { i: 6, label: "mid", c: "cur" }] }
          ]
        },
        {
          title: "Binary search on answer",
          action: "Predicate 'can ship in 15 days?' monotonic — discard the failing half.",
          parts: [
            { t: "vars", items: [{ k: "low", v: 15, c: "cur" }, { k: "high", v: 45, c: "r" }, { k: "mid", v: 30, c: "cur" }] },
            { t: "text", value: "Search space = possible answers, not input indices." }
          ]
        },
        {
          title: "Done",
          action: "log₂(1000000) ≈ 20 steps — the range collapses fast.",
          parts: [{ t: "result", label: "steps for 10^6", value: 20 }]
        }
      ]
    }
  },
  trees: {
    lesson: {
      intro:
        "A tree is a set of nodes connected by edges with no cycles — one root, everything else reachable downward. A binary tree gives every node at most two children; a binary search tree adds the ordering rule that makes search O(log n).",
      sections: [
        {
          title: "Nodes, edges, roots, leaves, height",
          body:
            "The root has no parent; leaves have no children. Height = longest path down to a leaf (a single node has height 0). Edges = n − 1 for any tree with n nodes. Depth is distance from the root; level usually counts the root as level 0."
        },
        {
          title: "Binary search tree invariant",
          body:
            "Every node in the left subtree is smaller, every node in the right is larger. That invariant makes search, insert, and delete follow one root-to-leaf path: O(h) — O(log n) when balanced, O(n) if the tree degenerates into a chain."
        },
        {
          title: "Traversals",
          body:
            "Preorder: visit, left, right (structure copy). Inorder: left, visit, right (sorted output for a BST). Postorder: left, right, visit (children before parent, delete-safe). Level-order: BFS with a queue. All four are O(n)."
        },
        {
          title: "Recursion in tree problems",
          body:
            "Nearly every tree question is 'solve left, solve right, combine'. height = 1 + max(height(left), height(right)) with null → −1 as the base case. Reason about what a call returns at node n — not the whole walk — and the logic stays simple."
        },
        {
          title: "Height, diameter, balancing",
          body:
            "Diameter = max over nodes of leftHeight + rightHeight, computed in one postorder pass, O(n). AVL and Red-Black trees rotate when the balance factor exceeds ±1, keeping h = O(log n) so operations never degrade to O(n)."
        },
        {
          title: "BST insertion, search, deletion",
          body:
            "Search/insert walk down comparing until null or the target slot. Delete: leaf → unlink; one child → replace with the child; two children → replace with the inorder successor (smallest in the right subtree), then delete that successor."
        },
        {
          title: "Lowest common ancestor",
          body:
            "LCA(a, b) is the deepest node with both below it. Recurse: null or node equals a or b → return it; one answer from each side → the current node is the split point; otherwise bubble up the side that produced a result."
        },
        {
          title: "Complexity",
          body:
            "Traversal/search O(n) or O(h). Balanced: O(log n) operations; skewed: O(n). Space is the recursion stack: O(h); level-order adds O(w) for the queue (w = max width)."
        }
      ],
      example: {
        title: "Example — inorder of a BST",
        body:
          "BST with root 8, left 3 (children 1, 4), right 10 (children 6, 14): inorder visits left subtree, then 8, then right subtree. For any valid BST the output is always sorted — that is the fastest way to verify the ordering invariant by hand."
      },
      compare: [
        {
          label: "BFS vs DFS traversal",
          a: "Level-order (BFS): queue, O(w) space, level by level.",
          b: "Pre/in/post (DFS): stack/recursion, O(h) space, depth first."
        },
        {
          label: "Balanced vs skewed tree",
          a: "Balanced: h = log n → search O(log n).",
          b: "Sorted insertions without balance: h = n → O(n) search."
        }
      ]
    },
    viz: {
      title: "Traversals, BST search, and LCA",
      steps: [
        {
          title: "Tree shape",
          action: "Root 8; left subtree 3(1,4); right subtree 10(6,14).",
          parts: [
            {
              t: "tree", label: "Binary tree", width: 320, height: 190,
              nodes: [{ v: 8, x: 160, y: 30 }, { v: 3, x: 90, y: 90 }, { v: 10, x: 230, y: 90 }, { v: 1, x: 50, y: 150 }, { v: 4, x: 120, y: 150 }, { v: 6, x: 195, y: 150 }, { v: 14, x: 265, y: 150 }],
              edges: [[8, 3], [8, 10], [3, 1], [3, 4], [10, 6], [10, 14]],
              hi: [8]
            }
          ]
        },
        {
          title: "Preorder (visit, left, right)",
          action: "Visit the node before descending: 8, 3, 1, 4, 10, 6, 14.",
          parts: [
            {
              t: "tree", label: "Preorder", width: 320, height: 190,
              nodes: [{ v: 8, x: 160, y: 30 }, { v: 3, x: 90, y: 90 }, { v: 10, x: 230, y: 90 }, { v: 1, x: 50, y: 150 }, { v: 4, x: 120, y: 150 }, { v: 6, x: 195, y: 150 }, { v: 14, x: 265, y: 150 }],
              edges: [[8, 3], [8, 10], [3, 1], [3, 4], [10, 6], [10, 14]],
              hi: [8, 3, 1], order: [8, 3, 1, 4, 10, 6, 14]
            }
          ]
        },
        {
          title: "Inorder (left, visit, right)",
          action: "BST inorder always yields sorted values.",
          parts: [
            {
              t: "tree", label: "Inorder", width: 320, height: 190,
              nodes: [{ v: 8, x: 160, y: 30 }, { v: 3, x: 90, y: 90 }, { v: 10, x: 230, y: 90 }, { v: 1, x: 50, y: 150 }, { v: 4, x: 120, y: 150 }, { v: 6, x: 195, y: 150 }, { v: 14, x: 265, y: 150 }],
              edges: [[8, 3], [8, 10], [3, 1], [3, 4], [10, 6], [10, 14]],
              hi: [1, 3, 4], order: [1, 3, 4, 6, 8, 10, 14]
            }
          ]
        },
        {
          title: "Level-order with a queue",
          action: "Dequeue a node, enqueue its children — level by level.",
          parts: [
            {
              t: "tree", label: "Level-order", width: 320, height: 190,
              nodes: [{ v: 8, x: 160, y: 30 }, { v: 3, x: 90, y: 90 }, { v: 10, x: 230, y: 90 }, { v: 1, x: 50, y: 150 }, { v: 4, x: 120, y: 150 }, { v: 6, x: 195, y: 150 }, { v: 14, x: 265, y: 150 }],
              edges: [[8, 3], [8, 10], [3, 1], [3, 4], [10, 6], [10, 14]],
              hi: [8, 3, 10], order: [8, 3, 10]
            },
            { t: "queue", label: "queue", values: [1, 4, 6, 14], front: 0, rear: 3 }
          ]
        },
        {
          title: "BST search for 4",
          action: "4 < 8 → left; 4 > 3 → right; found as 3's right child.",
          parts: [
            {
              t: "tree", label: "search(4)", width: 320, height: 190,
              nodes: [{ v: 8, x: 160, y: 30 }, { v: 3, x: 90, y: 90 }, { v: 10, x: 230, y: 90 }, { v: 1, x: 50, y: 150 }, { v: 4, x: 120, y: 150 }, { v: 6, x: 195, y: 150 }, { v: 14, x: 265, y: 150 }],
              edges: [[8, 3], [8, 10], [3, 1], [3, 4], [10, 6], [10, 14]],
              path: [8, 3, 4], hi: [4]
            },
            { t: "result", label: "found at depth", value: 2 }
          ]
        },
        {
          title: "LCA of 1 and 4",
          action: "Both answers bubble from different sides of 3 → 3 is the LCA.",
          parts: [
            {
              t: "tree", label: "LCA(1, 4)", width: 320, height: 190,
              nodes: [{ v: 8, x: 160, y: 30 }, { v: 3, x: 90, y: 90 }, { v: 10, x: 230, y: 90 }, { v: 1, x: 50, y: 150 }, { v: 4, x: 120, y: 150 }, { v: 6, x: 195, y: 150 }, { v: 14, x: 265, y: 150 }],
              edges: [[8, 3], [8, 10], [3, 1], [3, 4], [10, 6], [10, 14]],
              hi: [3], path: [3, 1, 4]
            },
            { t: "result", label: "LCA", value: 3 }
          ]
        }
      ]
    },
  },
  recursion: {
    lesson: {
      intro:
        "Recursion is a function that solves a problem by calling itself on a smaller instance of the same problem, until it reaches a case simple enough to answer directly. The call stack does the bookkeeping.",
      sections: [
        {
          title: "Base case",
          body:
            "The condition that returns without recursing. Without it the function calls itself forever until the stack overflows. The base case must be reachable — every recursive step must move strictly closer to it (n → n − 1, not n → n)."
        },
        {
          title: "Recursive case",
          body:
            "Decompose the input: factorial(n) = n × factorial(n − 1), fib(n) = fib(n−1) + fib(n−2). Write the recurrence first in math, then transliterate — the code is usually the one-line recurrence plus the base case."
        },
        {
          title: "Call stack",
          body:
            "Each call pushes a frame with parameters, locals, and the return address; a return pops it. Depth equals the maximum nesting — O(n) for a linear recursion, O(log n) for a halving one, O(b^d) total frames for branching before returns."
        },
        {
          title: "Recursion tree",
          body:
            "Draw calls as a tree: root is the initial call, children are its subcalls, leaves are base cases. Counting nodes gives the time complexity; the height gives the stack depth. fib(5)'s tree has repeated subtrees — the signature of overlapping subproblems."
        },
        {
          title: "Recursion vs iteration",
          body:
            "Anything recursive can be iterative with an explicit stack. Recursion shines for naturally nested data (trees, expressions, backtracking); iteration is cheaper for flat loops. Tail calls can be optimized, but Java does not — so deep recursion there still costs frames."
        },
        {
          title: "Stack overflow",
          body:
            "Too many frames → StackOverflowError. n = 100,000 factorial calls will crash in Java. Fix: convert to iteration, reduce depth (halve the input), or add memoization so repeated subtrees are not re-expanded."
        },
        {
          title: "Complexity",
          body:
            "Time = number of nodes in the recursion tree × work per call. Space = tree height (active frames). fib(2) without memo is O(2ⁿ); with memo it is O(n) — the same recursion, one order of magnitude apart."
        }
      ],
      example: {
        title: "Example — factorial(4)",
        body:
          "f(4) → 4 × f(3) → 4 × (3 × f(2)) → 4 × (3 × (2 × f(1))) → base f(1) = 1, then the multiplications unwind: 2, 6, 24. Four frames deep, each waiting for its child to return."
      },
      compare: [
        {
          label: "Recursion vs iteration",
          a: "Recursion: clearer for nested structure, O(depth) frames.",
          b: "Iteration: O(1) extra memory, usually faster in practice."
        },
        {
          label: "Plain vs memoized recursion",
          a: "Plain fib: exponential time, subtrees recomputed.",
          b: "Memoized: each subproblem solved once, O(n) time."
        }
      ]
    },
    viz: {
      title: "Call stack and Fibonacci recursion tree",
      steps: [
        {
          title: "factorial(3) call",
          action: "Push frame (n = 3) and descend: needs factorial(2).",
          parts: [{ t: "stack", label: "call stack", values: ["f(3)"], hi: 0 }, { t: "vars", items: [{ k: "n", v: 3, c: "cur" }] }]
        },
        {
          title: "Deeper call",
          action: "Push frame (n = 2), descend again.",
          parts: [{ t: "stack", label: "call stack", values: ["f(3)", "f(2)"], hi: 1 }, { t: "vars", items: [{ k: "n", v: 2, c: "cur" }] }]
        },
        {
          title: "Base case hit",
          action: "n = 1 → return 1 without recursing; frames start popping.",
          parts: [{ t: "stack", label: "call stack", values: ["f(3)", "f(2)", "f(1)"], hi: 2 }, { t: "result", label: "f(1)", value: 1 }]
        },
        {
          title: "Return unwinds",
          action: "f(2) = 2 × 1 = 2, f(3) = 3 × 2 = 6 — each pop computes one multiply.",
          parts: [{ t: "stack", label: "popping", values: ["f(3)"], hi: 0 }, { t: "result", label: "f(3)", value: 6 }]
        },
        {
          title: "Fibonacci tree",
          action: "fib(4) branches into fib(3) + fib(2); fib(3) repeats fib(2) — overlap.",
          parts: [
            { t: "text", value: "              fib(4)\n           /        \\\n      fib(3)        fib(2)\n     /     \\        /    \\\n  fib(2)  fib(1)  fib(1) fib(0)\n  /   \\\nfib(1) fib(0)" },
            { t: "vars", items: [{ k: "calls", v: 9, c: "bad" }, { k: "unique", v: 4, c: "ok" }] }
          ]
        },
        {
          title: "Memoization prunes the tree",
          action: "Cache fib(2): the second subtree becomes a lookup, not a recursion.",
          parts: [
            { t: "map", label: "memo", entries: [["fib(0)", 0], ["fib(1)", 1], ["fib(2)", 1], ["fib(3)", 2], ["fib(4)", 3]], hiKey: "fib(4)" },
            { t: "result", label: "fib(4)", value: 3 }
          ]
        }
      ]
    }
  },
  backtracking: {
    lesson: {
      intro:
        "Backtracking is depth-first exploration of an implicit decision tree: make a choice, recurse, then undo it so the next branch starts from the same state. It turns exponential search into disciplined exponential search — complete, but with dead branches cut early.",
      sections: [
        {
          title: "Decision trees",
          body:
            "At each position you face a finite set of choices (include/exclude, pick any unused number, place a queen). The recursion explores one choice fully before trying the next, so the recursion tree enumerates every valid sequence exactly once."
        },
        {
          title: "Choose, explore, unchoose",
          body:
            "The three-step template: (1) choose — record the decision in your path; (2) explore — recurse to the next position; (3) unchoose — remove the decision before returning. Skipping step 3 corrupts the state for sibling branches — the classic bug."
        },
        {
          title: "Subsets and permutations",
          body:
            "Subsets: at each index, branch include vs exclude → 2ⁿ leaves, path at each node is a subset. Permutations: at each depth pick any unused element → n! leaves. N-Queens: place a row, prune columns under attack."
        },
        {
          title: "Pruning",
          body:
            "Check partial paths early and return as soon as they cannot lead to a solution: stop extending a sum once it exceeds the target. Pruning does not change worst-case complexity but routinely changes real runs from impossible to instant."
        },
        {
          title: "Backtracking vs brute force",
          body:
            "Brute force builds every candidate fully then filters; backtracking discards the moment a prefix fails. Same worst case (all combinations), far fewer complete constructions — pruning is why backtracking solves 4-sum-style problems that pure enumeration cannot."
        },
        {
          title: "Complexity",
          body:
            "Subsets O(2ⁿ · n) (each subset costs O(n) to copy), permutations O(n! · n), N-Queens ~O(n!) with pruning. Space is O(n) for the path plus O(n) recursion depth."
        }
      ],
      example: {
        title: "Example — subsets of {1, 2, 3}",
        body:
          "Branch include 1 → {1}, include 2 → {1,2}, include 3 → {1,2,3}; backtrack, exclude 3 → {1,2}; backtrack, exclude 2 → {1}, exclude 3 → {}. Then repeat from {2}, {3} — the path shown at each node is the subset built so far."
      },
      compare: [
        {
          label: "Backtracking vs brute force",
          a: "Brute force: build everything, filter at the end.",
          b: "Backtracking: abandon the branch the moment it fails."
        },
        {
          label: "Subsets vs permutations",
          a: "Subsets: ordered by index, 2ⁿ branches, no reuse.",
          b: "Permutations: any unused element at each depth, n! branches."
        }
      ]
    },
    viz: {
      title: "Subset decision tree with undo",
      steps: [
        {
          title: "Root — nothing chosen",
          action: "path = []. At each element: include or exclude.",
          parts: [
            { t: "array", label: "[1, 2, 3]", values: [1, 2, 3], marks: {}, ptrs: [{ i: 0, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "path", v: "[]", c: "cur" }] }
          ]
        },
        {
          title: "Choose: include 1",
          action: "path.push(1) → recurse on index 1.",
          parts: [
            { t: "array", label: "[1, 2, 3]", values: [1, 2, 3], marks: { 0: "ok" }, ptrs: [{ i: 1, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "path", v: "[1]", c: "ok" }, { k: "depth", v: 1 }] }
          ]
        },
        {
          title: "Descend: include 2",
          action: "path = [1, 2], recurse on index 2.",
          parts: [
            { t: "array", label: "[1, 2, 3]", values: [1, 2, 3], marks: { 0: "ok", 1: "ok" }, ptrs: [{ i: 2, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "path", v: "[1, 2]", c: "ok" }] }
          ]
        },
        {
          title: "Leaf found, then undo",
          action: "include 3 → subset [1,2,3] recorded; pop 3 to backtrack.",
          parts: [
            { t: "vars", items: [{ k: "path", v: "[1, 2, 3]", c: "ok" }, { k: "chosen", v: 1, c: "ok" }] },
            { t: "result", label: "subset", value: "[1, 2, 3]" }
          ]
        },
        {
          title: "Backtrack: exclude 3",
          action: "path back to [1, 2]; branch exclude 3 → subset [1, 2].",
          parts: [
            { t: "array", label: "[1, 2, 3]", values: [1, 2, 3], marks: { 0: "ok", 1: "ok", 2: "dim" }, ptrs: [{ i: 2, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "path", v: "[1, 2]", c: "cur" }] },
            { t: "result", label: "subset", value: "[1, 2]" }
          ]
        },
        {
          title: "Full tree enumerated",
          action: "2³ = 8 subsets; current path always visible, siblings share one path array.",
          parts: [
            { t: "text", value: "[] → [1] → [1,2] → [1,2,3]\n              ↘ [1,3]\n         [2] → [2,3]\n         [3]\n(plus the empty exclude branch)" },
            { t: "vars", items: [{ k: "subsets", v: 8, c: "ok" }] }
          ]
        }
      ]
    }
  },
  greedy: {
    lesson: {
      intro:
        "A greedy algorithm commits to the best-looking local choice at every step and never reconsiders it. It works only when local optimality provably leads to the global optimum — otherwise it silently returns a wrong answer.",
      sections: [
        {
          title: "Local vs global optimum",
          body:
            "Greedy makes the choice that looks best right now (earliest finish, smallest coin, largest gain) and trusts that the future will take care of itself. Dynamic programming, by contrast, keeps multiple candidate states and picks the best at the end."
        },
        {
          title: "Greedy-choice property",
          body:
            "Some optimal solution contains the greedy choice. Proving this is usually an exchange argument: take any optimal solution and swap in the greedy pick — the result is never worse. No such argument means no greedy algorithm."
        },
        {
          title: "Optimal substructure",
          body:
            "After the greedy choice, the remaining problem is the same problem on smaller input: after scheduling the earliest-finishing job, you only need to schedule the rest among jobs that start after it finishes."
        },
        {
          title: "Sorting-based greedy",
          body:
            "Most greedy solutions are 'sort, then one pass': intervals by end time, activities by start, differences by absolute value, candy by rating. The sort encodes the ordering principle; the pass makes the choice."
        },
        {
          title: "When greedy works",
          body:
            "Interval scheduling (earliest finish), Huffman coding, Dijkstra's shortest path, fractional knapsack, gas station with a feasible tour. Each has a clean exchange proof — look for the proof pattern before trusting the code."
        },
        {
          title: "Limitations",
          body:
            "0/1 knapsack greedy by value or weight fails (the last item's indivisibility breaks the argument); coin systems that are not canonical make 'largest coin first' suboptimal; minimum spanning tree needs the right greedy (Kruskal/Prim), not arbitrary choices."
        },
        {
          title: "Complexity",
          body:
            "Sorting dominates: O(n log n), followed by an O(n) scan. Space O(1) for the scan, O(n) for results — far cheaper than DP's table when the greedy condition holds."
        }
      ],
      example: {
        title: "Example — maximum non-overlapping activities",
        body:
          "Jobs [(1,3), (2,5), (4,7), (6,9)]. Sort by end: pick (1,3). (2,5) starts before 3 ends — reject. (4,7) starts after 3 — pick. (6,9) overlaps 7 — reject. Result {(1,3), (4,7)}: two jobs, provably optimal."
      },
      compare: [
        {
          label: "Greedy vs dynamic programming",
          a: "Greedy: one path, no reconsideration, O(n log n).",
          b: "DP: explores all viable states, guarantees the optimum."
        },
        {
          label: "Fractional vs 0/1 knapsack",
          a: "Fractional: greedy by value/weight is optimal.",
          b: "0/1: greedy fails — DP over capacities is required."
        }
      ]
    },
    viz: {
      title: "Interval scheduling and greedy choices",
      steps: [
        {
          title: "Sort by end time",
          action: "Sorting by finish time is the greedy ordering principle.",
          parts: [
            { t: "array", label: "after sort by end", values: ["1-3", "2-5", "4-7", "6-9"], marks: { 0: "cur" }, ptrs: [{ i: 0, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "lastEnd", v: 0 }] }
          ]
        },
        {
          title: "Select first job",
          action: "1 ≥ lastEnd=0 → select (1,3), lastEnd = 3.",
          parts: [
            { t: "array", label: "selected: green", values: ["1-3", "2-5", "4-7", "6-9"], marks: { 0: "ok", 1: "dim" }, ptrs: [{ i: 1, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "lastEnd", v: 3, c: "ok" }, { k: "picked", v: 1, c: "ok" }] }
          ]
        },
        {
          title: "Reject overlapping",
          action: "(2,5) starts at 2 < 3 — rejected without further thought.",
          parts: [
            { t: "array", label: "candidate (2,5) rejected", values: ["1-3", "2-5", "4-7", "6-9"], marks: { 0: "ok", 1: "bad" }, ptrs: [{ i: 2, label: "i", c: "cur" }] },
            { t: "text", value: "Greedy never revisits the rejected job." }
          ]
        },
        {
          title: "Next feasible job",
          action: "4 ≥ 3 → select (4,7), lastEnd = 7.",
          parts: [
            { t: "array", label: "two jobs selected", values: ["1-3", "2-5", "4-7", "6-9"], marks: { 0: "ok", 1: "bad", 2: "ok", 3: "dim" }, ptrs: [{ i: 3, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "lastEnd", v: 7, c: "ok" }, { k: "picked", v: 2, c: "ok" }] }
          ]
        },
        {
          title: "Minimum absolute difference",
          action: "Sort values — smallest gaps are always between neighbors.",
          parts: [
            { t: "array", label: "sorted", values: [1, 4, 8, 9], marks: { 0: "ok", 1: "dim", 2: "ok", 3: "ok" }, ptrs: [{ i: 2, label: "i", c: "cur" }, { i: 3, label: "i+1", c: "r" }] },
            { t: "vars", items: [{ k: "minDiff", v: 1, c: "ok" }] }
          ]
        },
        {
          title: "Final selection",
          action: "Picked = {(1,3), (4,7)}; rejected shown in red.",
          parts: [
            { t: "result", label: "max jobs", value: 2 },
            { t: "text", value: "Exchange argument: any optimal schedule can be swapped to the greedy pick without losing a job." }
          ]
        }
      ]
    }
  },
  heaps: {
    lesson: {
      intro:
        "A heap is a complete binary tree stored in an array that keeps the largest (max-heap) or smallest (min-heap) element at the root. It is the data structure behind priority queues: always give me the extreme element, fast.",
      sections: [
        {
          title: "Min-heap and max-heap",
          body:
            "Min-heap: every parent ≤ its children, so the root is the global minimum. Max-heap: parents ≥ children, root is the maximum. Only the root is guaranteed — siblings have no defined order, which is exactly what priority queues need."
        },
        {
          title: "Complete binary tree and array layout",
          body:
            "Every level is filled except possibly the last, filled left to right. That lets you store it in an array with no pointers: children of i are 2i+1 and 2i+2, parent of i is (i−1)/2. No wasted space, all index math O(1)."
        },
        {
          title: "Insertion (bubble up / sift up)",
          body:
            "Place the value at the next free slot (the end of the array) and swap it with its parent while it violates the order. Depth is log n, so bubble-up costs O(log n)."
        },
        {
          title: "Deletion and heapify-down (sift down)",
          body:
            "Remove the root: move the last element to the root, then swap it down with its smaller (min-heap) child until the order holds. Sift-down also O(log n). Peek at the root is O(1)."
        },
        {
          title: "Heapify (build heap)",
          body:
            "Starting from the last parent and sifting each down gives a valid heap from an arbitrary array in O(n), not O(n log n) — most nodes are near the bottom and sift down only a short distance. This is what PriorityQueue's constructor does."
        },
        {
          title: "Priority queues and top-K",
          body:
            "PriorityQueue in Java is a min-heap by default. Top-K largest: keep a size-k min-heap — its root is the kth largest, so anything bigger enters and evicts the root. Total O(n log k), far better than sorting's O(n log n) when k ≪ n."
        },
        {
          title: "Complexity",
          body:
            "push/pop O(log n), peek O(1), build O(n), heap sort O(n log n) time and O(1) space. K-way merge of n lists: O(n log k)."
        }
      ],
      example: {
        title: "Example — insert into a min-heap",
        body:
          "Heap [1, 3, 5], insert 0: place at index 3 → [1, 3, 5, 0]; parent of 3 is index 1? (3−1)/2 = 1 holds 3 > 0 → swap → [1, 0, 5, 3]; parent index 0 holds 1 > 0 → swap → [0, 1, 5, 3]. Two swaps = log n."
      },
      compare: [
        {
          label: "Min-heap vs max-heap",
          a: "Min-heap: root is smallest — k smallest, Dijkstra.",
          b: "Max-heap: root is largest — k largest, scheduling by priority."
        },
        {
          label: "Heap vs sorted array",
          a: "Heap: O(1) extreme, O(log n) insert — dynamic data.",
          b: "Sorted array: O(n) insert, O(log n) search — static data."
        }
      ]
    },
    viz: {
      title: "Heap as tree and array, bubble-up and top-K",
      steps: [
        {
          title: "Heap as a tree",
          action: "Min-heap property: every parent ≤ its children.",
          parts: [
            {
              t: "tree", label: "min-heap", width: 320, height: 170,
              nodes: [{ v: 1, x: 160, y: 30 }, { v: 3, x: 90, y: 90 }, { v: 5, x: 230, y: 90 }, { v: 7, x: 50, y: 150 }, { v: 4, x: 130, y: 150 }],
              edges: [[1, 3], [1, 5], [3, 7], [3, 4]],
              hi: [1]
            }
          ]
        },
        {
          title: "The same heap as an array",
          action: "children of i are 2i+1, 2i+2 — no pointer storage needed.",
          parts: [
            { t: "array", label: "array view", values: [1, 3, 5, 7, 4], marks: { 0: "ok" }, ptrs: [{ i: 0, label: "root", c: "cur" }] },
            { t: "text", value: "parent(3) = (3−1)/2 = 1 → value 3. children(1) = 3, 4." }
          ]
        },
        {
          title: "Insert 0 — bubble up",
          action: "Append at index 5, then swap with parent while smaller.",
          parts: [
            { t: "array", label: "after append", values: [1, 3, 5, 7, 4, 0], marks: { 5: "bad" }, ptrs: [{ i: 5, label: "new", c: "cur" }, { i: 2, label: "parent", c: "l" }] },
            { t: "vars", items: [{ k: "swaps", v: 1, c: "cur" }] }
          ]
        },
        {
          title: "Bubble-up finishes",
          action: "0 swaps past 1 → root restored: [0, 3, 5, 7, 4, 1].",
          parts: [
            { t: "array", label: "heap valid", values: [0, 3, 5, 7, 4, 1], marks: { 0: "ok" } },
            { t: "result", label: "min", value: 0 }
          ]
        },
        {
          title: "Extract-min — heapify down",
          action: "Move last element to root, sift down to the smaller child.",
          parts: [
            { t: "array", label: "sifting", values: [1, 3, 5, 7, 4], marks: { 0: "cur" }, ptrs: [{ i: 0, label: "cur", c: "cur" }, { i: 1, label: "child", c: "l" }, { i: 2, label: "child", c: "r" }] }
          ]
        },
        {
          title: "Top-K with a size-k heap",
          action: "k = 2: root is the 2nd largest; bigger values evict it.",
          parts: [
            { t: "array", label: "stream: 5, 1, 9, 3", values: [1, 9], marks: { 0: "cur", 1: "ok" }, ptrs: [] },
            { t: "vars", items: [{ k: "k", v: 2 }, { k: "top2", v: "9, 5", c: "ok" }] },
            { t: "result", label: "cost", value: "O(n log k)" }
          ]
        }
      ]
    }
  },
  graphs: {
    lesson: {
      intro:
        "A graph is vertices connected by edges — the most general data structure there is. Networks, maps, dependencies, and state spaces are all graphs; trees and lists are just graphs with extra constraints.",
      sections: [
        {
          title: "Vertices and edges",
          body:
            "Vertices are things; edges are relationships. Directed edges go one way (follows, prerequisites); undirected edges go both ways (friends, roads). Weighted edges carry a cost — distance, price, time."
        },
        {
          title: "Adjacency matrix vs list",
          body:
            "Matrix: V×V grid, edge check O(1), but O(V²) space even for sparse graphs. List: array of neighbor lists, O(V + E) space, neighbor iteration proportional to actual edges. Matrix for dense graphs, list almost everywhere else."
        },
        {
          title: "BFS",
          body:
            "Queue expands level by level from the source: mark visited when enqueued (not dequeued!), then dequeue and explore neighbors. BFS gives shortest path in unweighted graphs — first arrival is via fewest edges."
        },
        {
          title: "DFS",
          body:
            "Stack or recursion dives down one branch before backtracking. Natural for cycle detection, topological order, and components. Mark visited when pushing so the same node is never pushed twice."
        },
        {
          title: "Connected components and cycles",
          body:
            "Run DFS/BFS from every unvisited node — each sweep is one component. Cycle detection: undirected → edge to an already-visited non-parent node; directed → gray node on the current recursion stack (white/gray/black coloring)."
        },
        {
          title: "Topological sorting",
          body:
            "A linear order of a DAG where every edge u → v has u before v. Only exists for acyclic directed graphs. Kahn's algorithm: repeatedly remove indegree-0 nodes; if fewer than V came out, there is a cycle."
        },
        {
          title: "Graph applications",
          body:
            "Shortest paths (Dijkstra, Bellman-Ford), MST (Kruskal, Prim), course scheduling via topological sort, image segmentation via components, and grid DFS for number-of-islands."
        },
        {
          title: "Complexity",
          body:
            "Adjacency list: O(V + E) — every vertex and edge touched a constant number of times. Matrix: O(V²). Space O(V + E) plus queue/stack O(V). Grid problems: O(rows × cols)."
        }
      ],
      example: {
        title: "Example — BFS from vertex A",
        body:
          "Edges A–B, A–C, B–D, C–E. Queue: [A] → visit A, enqueue B, C → visit B, enqueue D → visit C, enqueue E → visit D, E. Order A, B, C, D, E — strictly level by level."
      },
      compare: [
        {
          label: "BFS vs DFS",
          a: "BFS: queue, level order, shortest path in unweighted graphs.",
          b: "DFS: stack/recursion, deep paths, cycles and topological sort."
        },
        {
          label: "Matrix vs adjacency list",
          a: "Matrix: O(1) edge query, O(V²) space.",
          b: "List: O(degree) iteration, O(V + E) space — sparse-friendly."
        }
      ]
    },
    viz: {
      title: "BFS, DFS, and topological order",
      steps: [
        {
          title: "Graph construction",
          action: "Vertices A–E with edges A-B, A-C, B-D, C-E.",
          parts: [
            {
              t: "graph", label: "graph",
              nodes: [{ id: "A", x: 60, y: 40 }, { id: "B", x: 160, y: 40 }, { id: "C", x: 60, y: 140 }, { id: "D", x: 240, y: 40 }, { id: "E", x: 160, y: 140 }],
              edges: [["A", "B"], ["A", "C"], ["B", "D"], ["C", "E"]],
              visited: {}, current: "A"
            },
            { t: "map", label: "adjacency list", entries: [["A", "B,C"], ["B", "A,D"], ["C", "A,E"], ["D", "B"], ["E", "C"]] }
          ]
        },
        {
          title: "BFS — level 1",
          action: "Dequeue A, mark visited, enqueue neighbors B and C.",
          parts: [
            {
              t: "graph", label: "BFS",
              nodes: [{ id: "A", x: 60, y: 40 }, { id: "B", x: 160, y: 40 }, { id: "C", x: 60, y: 140 }, { id: "D", x: 240, y: 40 }, { id: "E", x: 160, y: 140 }],
              edges: [["A", "B"], ["A", "C"], ["B", "D"], ["C", "E"]],
              visited: { A: true }, current: "B", queue: ["B", "C"]
            }
          ]
        },
        {
          title: "BFS — level 2",
          action: "Dequeue B → enqueue D; dequeue C → enqueue E.",
          parts: [
            {
              t: "graph", label: "BFS",
              nodes: [{ id: "A", x: 60, y: 40 }, { id: "B", x: 160, y: 40 }, { id: "C", x: 60, y: 140 }, { id: "D", x: 240, y: 40 }, { id: "E", x: 160, y: 140 }],
              edges: [["A", "B"], ["A", "C"], ["B", "D"], ["C", "E"]],
              visited: { A: true, B: true, C: true }, current: "D", queue: ["D", "E"]
            },
            { t: "result", label: "BFS order", value: "A B C D E" }
          ]
        },
        {
          title: "DFS — dive deep",
          action: "From A go to B, then D; backtrack only when D has no unvisited neighbors.",
          parts: [
            {
              t: "graph", label: "DFS",
              nodes: [{ id: "A", x: 60, y: 40 }, { id: "B", x: 160, y: 40 }, { id: "C", x: 60, y: 140 }, { id: "D", x: 240, y: 40 }, { id: "E", x: 160, y: 140 }],
              edges: [["A", "B"], ["A", "C"], ["B", "D"], ["C", "E"]],
              visited: { A: true, B: true }, current: "D"
            },
            { t: "vars", items: [{ k: "stack", v: "A,B,D", c: "cur" }] }
          ]
        },
        {
          title: "Visited tracking",
          action: "Mark on push/enqueue — never let the same node queue twice.",
          parts: [
            {
              t: "graph", label: "visited set",
              nodes: [{ id: "A", x: 60, y: 40 }, { id: "B", x: 160, y: 40 }, { id: "C", x: 60, y: 140 }, { id: "D", x: 240, y: 40 }, { id: "E", x: 160, y: 140 }],
              edges: [["A", "B"], ["A", "C"], ["B", "D"], ["C", "E"]],
              visited: { A: true, B: true, C: true, D: true }, current: "E"
            },
            { t: "set", label: "visited", values: ["A", "B", "C", "D"], hi: "E" }
          ]
        },
        {
          title: "Topological order (Kahn)",
          action: "Repeatedly take an indegree-0 vertex; leftovers imply a cycle.",
          parts: [
            { t: "array", label: "topo order", values: ["A", "B", "C", "D", "E"], marks: { 0: "ok", 1: "ok", 2: "ok", 3: "ok", 4: "ok" } },
            { t: "result", label: "acyclic", value: "true" }
          ]
        }
      ]
    },
  },
  dp: {
    lesson: {
      intro:
        "Dynamic programming solves a problem by breaking it into overlapping subproblems, solving each once, and reusing the answers. It is recursion plus memory — the memory is what stops the exponential blowup.",
      sections: [
        {
          title: "Overlapping subproblems",
          body:
            "The naive recursion asks the same question many times: fib(40) computes fib(38) twice and fib(37) three times. If subproblems repeat, memoize or tabulate and the cost drops from exponential to linear in distinct states."
        },
        {
          title: "Optimal substructure",
          body:
            "The optimum is built from optima of subproblems: the shortest path A→C through B is the shortest A→B plus the shortest B→C. That property lets a DP store one best value per state instead of every path."
        },
        {
          title: "Memoization (top-down)",
          body:
            "Write the recursive solution first, then cache results keyed by state. You compute only the states actually reached, in natural call order, and the base cases come from the recursion itself. Cost: call-stack space."
        },
        {
          title: "Tabulation (bottom-up)",
          body:
            "Fill a table from the base case upward: dp[0], dp[1], … dp[n]. Iterative, no stack, cache-friendly. The fill order must be a topological order of the state graph so dependencies exist before they are read."
        },
        {
          title: "State definition and transitions",
          body:
            "The craft is choosing what dp[i] means in one sentence ('best sum using the first i houses'), then writing the recurrence: dp[i] = max(dp[i−1], dp[i−2] + val[i]). A vague state makes the transition impossible."
        },
        {
          title: "Space optimization",
          body:
            "If dp[i] reads only the last k states, keep just those: House Robber needs two previous values, Coin Change one array. Space falls from O(n) to O(1) while time stays the same."
        },
        {
          title: "Recognizing DP",
          body:
            "Ask three questions: do choices build on each other (optimal substructure), does the same subproblem recur (overlap), and is the answer a min/max/count over combinations? Count paths, min cost, LCS, coin change — all yes."
        },
        {
          title: "Complexity",
          body:
            "Time = states × work per transition. Coin Change O(amount × coins), LCS O(n × m), Fibonacci O(n). Memo and table have identical time; they differ in computed states and stack usage."
        }
      ],
      example: {
        title: "Example — House Robber",
        body:
          "houses = [2, 7, 9, 3, 1]. dp[i] = best loot using the first i houses: dp[0]=0, dp[1]=2, dp[2]=max(2,7)=7, dp[3]=max(7, 2+9)=11, dp[4]=max(11, 7+3)=11, dp[5]=max(11, 11+1)=12. The i−2 rule guarantees no two chosen houses are adjacent: rob indices 0, 2, 4 → 2 + 9 + 1 = 12."
      },
      compare: [
        {
          label: "Memoization vs tabulation",
          a: "Top-down: only needed states, recursion stack, natural order.",
          b: "Bottom-up: all states, no stack, controllable order, faster."
        },
        {
          label: "DP vs greedy vs brute force",
          a: "Greedy: fastest when local choice provably suffices.",
          b: "DP: guarantees optimum when choices interact; brute force enumerates everything."
        }
      ]
    },
    viz: {
      title: "Memo table, tabulation, and state transitions",
      steps: [
        {
          title: "Recursive Fibonacci call tree",
          action: "fib(5) expands; fib(3) appears twice — overlapping subproblems.",
          parts: [
            { t: "text", value: "            fib(5)\n         /        \\\n      fib(4)      fib(3)\n     /     \\      /    \\\n  fib(3)  fib(2) fib(2) fib(1)\n  /   \\\nfib(2) fib(1)" },
            { t: "vars", items: [{ k: "calls", v: 9, c: "bad" }, { k: "distinct", v: 4, c: "ok" }] }
          ]
        },
        {
          title: "Memoization table fills on demand",
          action: "First computation of each n is cached; later hits are O(1).",
          parts: [
            { t: "map", label: "memo (top-down)", entries: [["fib(1)", 1], ["fib(2)", 1], ["fib(3)", 2], ["fib(4)", 3], ["fib(5)", 5]], hiKey: "fib(5)" },
            { t: "result", label: "fib(5)", value: 5 }
          ]
        },
        {
          title: "Bottom-up Fibonacci table",
          action: "Start from dp[0], dp[1]; each cell reads the two before it.",
          parts: [
            { t: "dp", label: "fib table", rows: [[0, 1, 1, 2, 3, 5]], cell: [0, 4], deps: [[0, 2], [0, 3]], filled: [[0, 0], [0, 1], [0, 2], [0, 3]], note: "dp[i] = dp[i−1] + dp[i−2]" }
          ]
        },
        {
          title: "House Robber states",
          action: "dp[i] = max(skip house i, rob house i + best of i−2).",
          parts: [
            { t: "array", label: "houses [2, 7, 9, 3, 1]", values: [2, 7, 9, 3, 1], marks: { 0: "ok", 2: "ok", 4: "ok" } },
            { t: "dp", label: "dp[i] best for first i houses", rows: [[0, 2, 7, 11, 11, 12]], cell: [0, 5], deps: [[0, 3], [0, 4]], filled: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]], note: "dp[5] = max(dp[4], dp[3] + 1) = max(11, 12) = 12" }
          ]
        },
        {
          title: "Coin Change DP",
          action: "dp[a] = fewest coins for amount a; each coin tries one step.",
          parts: [
            { t: "dp", label: "coins [1, 3, 4], amount 6", rows: [[0, 1, 1, 1, 1, 2, 2]], cell: [0, 6], deps: [[0, 5], [0, 3], [0, 2]], filled: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]], note: "dp[6] = 1 + dp[2] = 2 → coins 3 + 3" }
          ]
        },
        {
          title: "Memoization vs tabulation",
          action: "Same states, same time — different evaluation order and stack use.",
          parts: [
            { t: "vars", items: [{ k: "memo_time", v: "O(n)", c: "ok" }, { k: "table_time", v: "O(n)", c: "ok" }, { k: "memo_space", v: "O(n) stack+cache", c: "cur" }, { k: "table_space", v: "O(n) or O(1)", c: "ok" }] },
            { t: "result", label: "answer", value: "identical" }
          ]
        }
      ]
    }
  }
};
