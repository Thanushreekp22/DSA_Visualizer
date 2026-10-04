/* Cheat-sheet style concept sheets for every topic card. Layout mirrors the
   reference images: title, Definition | Structure columns, "How X is Stored
   in Memory" with an example + labelled rows table and a dashed notes box,
   key points | visual representation columns, and a bottom tip box.
   Row kinds: index (cyan), boxed (bordered cells), addr (green), mark (cyan
   pointer row), text (plain). Optional `highlights` shades specific cells. */

export const topicCheatSheets = {
  arrays: {
    title: "ARRAYS",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "An array is a collection of elements of the same data type stored in contiguous memory locations.",
        "Elements can be accessed using an index."
      ]
    },
    structure: {
      heading: "Structure of Array:",
      bullets: [
        "Stores homogenous elements.",
        "Elements are stored in contiguous memory locations.",
        "Uses zero-based indexing.",
        "Fixed size (in most programming languages)."
      ]
    },
    storage: {
      heading: "How Array is Stored in Memory",
      exampleLabel: "Example:",
      exampleCode: "int arr[5] = {10, 20, 30, 40, 50};",
      rows: [
        { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4"] },
        { label: "Element:", kind: "boxed", values: ["10", "20", "30", "40", "50"] },
        { label: "Memory Address:", kind: "addr", values: ["1000", "1004", "1008", "1012", "1016"] }
      ],
      notes: [
        "Each element is stored in a contiguous memory location.",
        "If the size of each element is 4 bytes (int), the next element is stored after the previous address + 4 bytes.",
        "We access elements using their index."
      ]
    },
    keyPoints: {
      heading: "Indexing in Array",
      bullets: [
        "Arrays use zero-based indexing.",
        "The first element is at index 0.",
        "For an array of size n:",
        { text: "Valid index range is 0 to n - 1", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "…", "n-2", "n-1"] },
      boxed: { label: "Element:", kind: "boxed", values: ["a₀", "a₁", "a₂", "a₃", "…", "aₙ₋₂", "aₙ₋₁"] },
      caption: "Contiguous Memory"
    },
    tip: {
      lines: [
        { label: "Direct Access:", text: "Access any element in O(1) time using index." },
        { label: "Example:", text: "arr[2] will access the element at index 2 (third element)." }
      ]
    }
  },
  strings: {
    title: "STRINGS",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "A string is a sequence of characters.",
        "In most programming languages, strings are stored as an array of characters.",
        "String elements can be accessed using an index."
      ]
    },
    structure: {
      heading: "Structure of String:",
      bullets: [
        "Strings are stored as an array of characters.",
        "Characters are stored in contiguous memory locations.",
        "Uses zero-based indexing.",
        "In C/C++ strings end with a null character '\\0'.",
        "In Java, Python, JavaScript strings are immutable."
      ]
    },
    storage: {
      heading: "How String is Stored in Memory",
      exampleLabel: "Example:",
      exampleCode: "String: \"HELLO\"",
      rows: [
        { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4"] },
        { label: "Character:", kind: "boxed", values: ["H", "E", "L", "L", "O"] },
        { label: "Memory Address:", kind: "addr", values: ["1000", "1001", "1002", "1003", "1004"] }
      ],
      extraTables: [
        {
          heading: "In C/C++ (with null character)",
          rows: [
            { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4", "5"] },
            { label: "Character:", kind: "boxed", values: ["H", "E", "L", "L", "O", "\\0"] },
            { label: "Memory Address:", kind: "addr", values: ["1000", "1001", "1002", "1003", "1004", "1005"] }
          ]
        }
      ],
      notes: [
        "Each character is stored in a contiguous memory location.",
        "If the size of each character is 1 byte (char), the next character is stored at the next address.",
        "Strings in C/C++ are terminated by the null character '\\0'."
      ]
    },
    keyPoints: {
      heading: "Indexing in String",
      bullets: [
        "Strings use zero-based indexing.",
        "The first character is at index 0.",
        "For a string of length n:",
        { text: "Valid index range is 0 to n - 1", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4", "…", "n-2", "n-1"] },
      boxed: { label: "Character:", kind: "boxed", values: ["s[0]", "s[1]", "s[2]", "s[3]", "s[4]", "…", "s[n-2]", "s[n-1]"] },
      caption: "Contiguous Memory"
    },
    tip: {
      lines: [
        { label: "Direct Access:", text: "Access any character in O(1) time using index." },
        { label: "Example:", text: "str[1] will access the character at index 1 (second character)." }
      ]
    }
  },
  "sliding-window": {
    title: "SLIDING WINDOW",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "A sliding window keeps a contiguous range [left, right] over the data.",
        "The right edge moves forward to include new elements while the left edge shrinks so the window always satisfies a condition."
      ]
    },
    structure: {
      heading: "Structure of the Window:",
      bullets: [
        "Works on contiguous data (arrays and strings).",
        "Two pointers mark the edges: left and right.",
        "Window size is fixed (k) or variable depending on the condition.",
        "Each element enters and leaves the window at most once."
      ]
    },
    storage: {
      heading: "How the Window Moves Over the Array",
      exampleLabel: "Example:",
      exampleCode: "int arr[] = {2, 1, 5, 1, 3, 2};   k = 3;",
      rows: [
        { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4", "5"] },
        { label: "Element:", kind: "boxed", values: ["2", "1", "5", "1", "3", "2"] },
        { label: "Window:", kind: "mark", values: ["", "", "★", "★", "★", ""], highlights: [2, 3, 4] }
      ],
      notes: [
        "right expands to pull the next element into the window.",
        "left shrinks until the condition holds again.",
        "A window of size k ending at i covers [i - k + 1, i].",
        "No nested loops — each index is processed at most twice."
      ]
    },
    keyPoints: {
      heading: "Window Rules",
      bullets: [
        "Fix a condition the window must satisfy.",
        "Expand with right, shrink with left.",
        "Record the answer whenever the window is valid.",
        { text: "Each element is touched at most twice → O(n) time.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "…", "n-1"] },
      boxed: { label: "Element:", kind: "boxed", values: ["a₀", "a₁", "a₂", "a₃", "…", "aₙ₋₁"], highlights: [2, 3] },
      caption: "Window Slides Left → Right"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "The window always covers a contiguous range — no sorting or extra space needed." },
        { label: "Example:", text: "Largest sum of any 3 adjacent elements is found in a single O(n) pass." }
      ]
    }
  },
  "two-pointers": {
    title: "TWO POINTERS",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "Two pointers traverse the input together, moving according to a condition.",
        "They usually start at opposite ends or at the same end of a sorted array / string."
      ]
    },
    structure: {
      heading: "Structure of the Technique:",
      bullets: [
        "Pointers i and j mark the current positions.",
        "Works on sorted input or opposite-end scans.",
        "Both pointers only move forward — never backtrack.",
        "Replaces a nested loop, turning O(n²) into O(n)."
      ]
    },
    storage: {
      heading: "How the Pointers Move",
      exampleLabel: "Example:",
      exampleCode: "int arr[] = {1, 3, 5, 7, 9, 11};   target = 12;",
      rows: [
        { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4", "5"] },
        { label: "Element:", kind: "boxed", values: ["1", "3", "5", "7", "9", "11"] },
        { label: "Pointer:", kind: "mark", values: ["i", "", "", "", "", "j"], highlights: [0, 5] }
      ],
      notes: [
        "left starts at 0, right starts at n - 1.",
        "Sum too small → move left; sum too big → move right.",
        "Each step discards every pair involving the moved pointer.",
        "Sorted input is what makes the discard safe."
      ]
    },
    keyPoints: {
      heading: "Choosing the Pair",
      bullets: [
        "Opposite ends → pair sum, palindrome, container with most water.",
        "Same direction → remove duplicates, in-place partition.",
        "Usually needs a sorted array or string.",
        { text: "Two pointers replace a nested loop: O(n²) → O(n).", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Index:", kind: "index", values: ["0", "1", "2", "…", "n-2", "n-1"] },
      boxed: { label: "Element:", kind: "boxed", values: ["a₀", "a₁", "a₂", "…", "aₙ₋₂", "aₙ₋₁"] },
      caption: "Pointers Converge Toward the Middle"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Time: O(n) on pre-sorted input (or O(n log n) with sorting), space O(1)." },
        { label: "Example:", text: "Two Sum on a sorted array: move the pointer with the smaller sum." }
      ]
    }
  },
  "stack-queue": {
    title: "STACK & QUEUE",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "A stack is LIFO — the last element in is the first one out.",
        "A queue is FIFO — the first element in is the first one out."
      ]
    },
    structure: {
      heading: "Structure:",
      bullets: [
        "Stack: push and pop from the same end (the top).",
        "Queue: enqueue at the rear, dequeue from the front.",
        "Both can be built on arrays or linked lists.",
        "No random access — only the ends are reachable."
      ]
    },
    storage: {
      heading: "How a Stack Grows in Memory",
      exampleLabel: "Example:",
      exampleCode: "push(10);  push(20);  push(30);",
      rows: [
        { label: "Index:", kind: "index", values: ["0", "1", "2"] },
        { label: "Element:", kind: "boxed", values: ["10", "20", "30"] },
        { label: "Operation:", kind: "addr", values: ["push", "push", "push"] },
        { label: "Top:", kind: "mark", values: ["", "", "Top"], highlights: [2] }
      ],
      notes: [
        "30 sits at the top — pop() returns 30 first (LIFO).",
        "In a queue, enqueue(10, 20, 30) then dequeue() returns 10 first (FIFO).",
        "Array implementation: push / pop at the end is O(1) amortized.",
        "Both grow and shrink with the number of operations."
      ]
    },
    keyPoints: {
      heading: "Operations & Complexity",
      bullets: [
        "Stack: push, pop, peek — O(1) each.",
        "Queue: enqueue, dequeue, front — O(1) each.",
        "Brackets, undo and DFS use stacks; BFS and scheduling use queues.",
        { text: "Only the top (stack) / front (queue) element is accessible.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Index:", kind: "index", values: ["0", "1", "2", "…", "n-1"] },
      boxed: { label: "Element:", kind: "boxed", values: ["e₀", "e₁", "e₂", "…", "eₙ₋₁"] },
      caption: "Push/Pop at Top · Enqueue Rear, Dequeue Front"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Access: O(1) push / pop at one end — no shifting, no searching." },
        { label: "Example:", text: "push(30) then pop() returns 30 — last in, first out." }
      ]
    }
  },
  "linked-list": {
    title: "LINKED LIST",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "A linked list is a chain of nodes where each node stores a value plus the address of the next node.",
        "Nodes are connected by pointers, not by memory layout."
      ]
    },
    structure: {
      heading: "Structure of a Node:",
      bullets: [
        "Each node = { data, next }.",
        "Nodes can live anywhere in memory — not contiguous.",
        "head points to the first node; the last node points to NULL.",
        "No index math — you move node by node."
      ]
    },
    storage: {
      heading: "How a Linked List is Stored in Memory",
      exampleLabel: "Example:",
      exampleCode: "head → [10] → [20] → [30] → [40] → NULL",
      rows: [
        { label: "Node:", kind: "index", values: ["N1", "N2", "N3", "N4"] },
        { label: "Content:", kind: "boxed", values: ["10", "20", "30", "40"] },
        { label: "Memory Address:", kind: "addr", values: ["1000", "1040", "1012", "1070"] },
        { label: "Next Pointer:", kind: "addr", values: ["1040", "1012", "1070", "NULL"] }
      ],
      notes: [
        "Nodes live at scattered addresses (1000, 1040, 1012 …).",
        "Each next field stores the address of the following node.",
        "Traversal follows next from head until NULL.",
        "Insert / delete only relinks pointers — nothing is shifted."
      ]
    },
    keyPoints: {
      heading: "Access Cost",
      bullets: [
        "No O(1) indexing — walking to index i costs O(n).",
        "Insert / delete at head: O(1).",
        "Search: O(n) — no binary search on a linked list.",
        { text: "Reached by following pointers, not by address math.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Address:", kind: "index", values: ["1000", "1040", "1012", "1070"] },
      boxed: { label: "Node:", kind: "boxed", values: ["[10|•]", "[20|•]", "[30|•]", "[40|∅]"] },
      caption: "Linked by Pointers — Not Contiguous"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Traversal: follow next pointers — O(n) time, O(1) extra space." },
        { label: "Example:", text: "Delete 20: set 10.next = 30 — one relink after reaching the node." }
      ]
    }
  },
  hashing: {
    title: "HASHING",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "Hashing maps a key to a bucket index with a hash function.",
        "Because the index is computed directly, lookup, insert and delete take average O(1) time."
      ]
    },
    structure: {
      heading: "Structure of a Hash Table:",
      bullets: [
        "index = hash(key) % tableSize.",
        "Collisions (same index) are handled by chaining or open addressing.",
        "Average case O(1), worst case O(n).",
        "The load factor decides when the table grows."
      ]
    },
    storage: {
      heading: "How Key-Value Pairs Are Stored",
      exampleLabel: "Example:",
      exampleCode: "keys = {\"apple\", \"banana\", \"cat\"};   tableSize = 5;",
      rows: [
        { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4"] },
        { label: "Key:", kind: "boxed", values: ["", "banana", "apple", "", "cat"] },
        { label: "hash(key) % 5:", kind: "addr", values: ["", "1", "2", "", "0"] }
      ],
      notes: [
        "hash(\"banana\") % 5 = 1 → stored at bucket 1.",
        "Empty buckets stay blank.",
        "Collisions: chain each bucket with a linked list.",
        "Resize (rehash) when the load factor grows too big."
      ]
    },
    keyPoints: {
      heading: "Complexity",
      bullets: [
        "Average: O(1) search, insert, delete.",
        "Worst: O(n) when every key lands in the same bucket.",
        "Frequency maps, sets and two-sum all rely on hashing.",
        { text: "One hash computation replaces a full scan.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Index:", kind: "index", values: ["0", "1", "2", "…", "m-1"] },
      boxed: { label: "Bucket:", kind: "boxed", values: ["[]", "[k,v]", "[]", "…", "[k,v]"] },
      caption: "Direct Access via hash(key) % m"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Direct Access: the hash function computes the bucket in O(1)." },
        { label: "Example:", text: "map[\"apple\"] → hash(\"apple\") % 5 = 2 — no scanning." }
      ]
    }
  },
  "binary-search": {
    title: "BINARY SEARCH",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "Binary search finds a target in a sorted array by repeatedly halving the search range.",
        "Each step compares against the middle element and discards the half that cannot contain the target."
      ]
    },
    structure: {
      heading: "Structure of the Algorithm:",
      bullets: [
        "The array must be sorted.",
        "Keeps lo, hi and mid = lo + (hi - lo) / 2.",
        "Each step discards half of the remaining range.",
        "O(log n) time, O(1) space."
      ]
    },
    storage: {
      heading: "How the Search Range Shrinks",
      exampleLabel: "Example:",
      exampleCode: "int arr[] = {2, 5, 8, 12, 16, 23, 38};   target = 23;",
      rows: [
        { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4", "5", "6"] },
        { label: "Element:", kind: "boxed", values: ["2", "5", "8", "12", "16", "23", "38"] },
        { label: "Pointer:", kind: "mark", values: ["lo", "", "mid", "", "", "", "hi"], highlights: [0, 2, 6] }
      ],
      notes: [
        "Step 1: mid = 12 < 23 → discard the left half.",
        "Step 2: lo = 3, mid = 23 → found at index 5.",
        "n elements need at most ⌈log₂ n⌉ comparisons.",
        "The loop runs while lo ≤ hi."
      ]
    },
    keyPoints: {
      heading: "Loop & Variants",
      bullets: [
        "mid = lo + (hi - lo) / 2 avoids integer overflow.",
        "lower_bound → first index with value ≥ target.",
        "upper_bound → first index with value > target.",
        { text: "Sorted input is mandatory — otherwise O(log n) breaks.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Index:", kind: "index", values: ["0", "1", "2", "…", "n-2", "n-1"] },
      boxed: { label: "Element:", kind: "boxed", values: ["a₀", "a₁", "a₂", "…", "aₙ₋₂", "aₙ₋₁"] },
      caption: "Search Range Halves Every Step"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Time: O(log n) — 1,000,000 elements need only ~20 comparisons." },
        { label: "Example:", text: "search(arr, 23) returns index 5 after 2 steps." }
      ]
    }
  },
  trees: {
    title: "BINARY TREE & BST",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "A binary tree is a hierarchy of nodes where every node has at most two children, left and right.",
        "In a BST every left value is smaller and every right value is larger than its parent."
      ]
    },
    structure: {
      heading: "Structure of a Tree:",
      bullets: [
        "The root has no parent; nodes without children are leaves.",
        "BST rule: left < node < right.",
        "Complete trees are stored in an array without pointers.",
        "A balanced tree of height h holds up to 2ʰ − 1 nodes."
      ]
    },
    storage: {
      heading: "How a Binary Tree is Stored",
      exampleLabel: "Example:",
      exampleCode: "Complete tree in an array: {A, B, C, D, E, F, G}",
      rows: [
        { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4", "5", "6"] },
        { label: "Node:", kind: "boxed", values: ["A", "B", "C", "D", "E", "F", "G"] },
        { label: "Children:", kind: "addr", values: ["B,C", "D,E", "F,G", "—", "—", "—", "—"] }
      ],
      notes: [
        "In array form: left(i) = 2i + 1, right(i) = 2i + 2.",
        "Pointer form: node = { val, left, right } — suits sparse trees.",
        "Array order equals level order of the tree.",
        "Traversals: inorder, preorder, postorder, level order."
      ]
    },
    keyPoints: {
      heading: "Search & Traversal",
      bullets: [
        "BST search follows one root-to-leaf path.",
        "Balanced BST: O(log n); skewed tree: O(n).",
        "Inorder traversal of a BST yields sorted values.",
        { text: "Height decides the cost of every tree operation.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Level:", kind: "index", values: ["0", "1", "1", "2", "2", "2", "2"] },
      boxed: { label: "Node:", kind: "boxed", values: ["A", "B", "C", "D", "E", "F", "G"] },
      caption: "Level Order — Root A, then B C, then D E F G"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Access: O(log n) in a balanced tree — go left or right at each node." },
        { label: "Example:", text: "Search 7: A → B → D …, comparing once per level." }
      ]
    }
  },
  recursion: {
    title: "RECURSION",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "A recursive function is a function that calls itself on a smaller input.",
        "It keeps calling itself until it reaches a base case that returns directly."
      ]
    },
    structure: {
      heading: "Structure of a Recursive Function:",
      bullets: [
        "Every recursive function needs a base case.",
        "Each call works on a strictly smaller input.",
        "Calls are stored on the call stack (LIFO).",
        "Depth = number of nested calls before the base case."
      ]
    },
    storage: {
      heading: "How the Call Stack Grows",
      exampleLabel: "Example:",
      exampleCode: "fact(n) = n <= 1 ? 1 : n * fact(n - 1);   fact(4);",
      rows: [
        { label: "Depth:", kind: "index", values: ["1", "2", "3", "4"] },
        { label: "Call:", kind: "boxed", values: ["fact(4)", "fact(3)", "fact(2)", "fact(1)"] },
        { label: "State:", kind: "addr", values: ["waiting", "waiting", "waiting", "base case"] }
      ],
      notes: [
        "Each call pauses until the one above it returns.",
        "The base case returns first, then results unwind downward.",
        "Stack depth: O(n) for linear recursion, O(log n) when the input halves.",
        "Too many calls → StackOverflowError."
      ]
    },
    keyPoints: {
      heading: "Writing Recursion",
      bullets: [
        "1. Define the base case.",
        "2. Call yourself with a smaller input.",
        "3. Combine the returned results.",
        { text: "Base case + smaller subproblem = guaranteed termination.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Level:", kind: "index", values: ["0", "1", "2", "3"] },
      boxed: { label: "Call:", kind: "boxed", values: ["f(4)", "f(3)", "f(2)", "f(1)"] },
      caption: "Each Call Waits for the One Below"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Time: T(n) = T(n − 1) + O(1) → O(n); memoize repeated calls." },
        { label: "Example:", text: "fib(5) = fib(4) + fib(3) — repeated work unless results are cached." }
      ]
    }
  },
  backtracking: {
    title: "BACKTRACKING",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "Backtracking builds a candidate solution step by step and undoes any choice that cannot lead to a valid answer.",
        "It explores the recursion tree of partial solutions and prunes branches early."
      ]
    },
    structure: {
      heading: "Structure:",
      bullets: [
        "Pattern: choose → explore → un-choose (undo).",
        "A shared path holds the current partial solution.",
        "Invalid partial states stop the branch immediately.",
        "The same skeleton as recursion with state to revert."
      ]
    },
    storage: {
      heading: "How the Choice Path Is Tracked",
      exampleLabel: "Example:",
      exampleCode: "subsets({1, 2, 3})",
      rows: [
        { label: "Depth:", kind: "index", values: ["0", "1", "2", "3"] },
        { label: "Path:", kind: "boxed", values: ["{ }", "{1}", "{1,2}", "{ }"] },
        { label: "Action:", kind: "addr", values: ["start", "choose 1", "choose 2", "backtrack"] }
      ],
      notes: [
        "At each depth pick one candidate and recurse.",
        "After returning, undo the pick (remove it from the path).",
        "If the partial path is already invalid, stop — that is pruning.",
        "When candidates run out, record or discard the path."
      ]
    },
    keyPoints: {
      heading: "Backtracking Template",
      bullets: [
        "Pick a candidate that is still valid.",
        "Recurse with the pick applied to the path.",
        "Undo the pick after the call returns.",
        { text: "Pruning removes whole branches early → much faster.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Step:", kind: "index", values: ["1", "2", "3", "4"] },
      boxed: { label: "Choice:", kind: "boxed", values: ["1", "2", "3", "undo"] },
      caption: "Choose → Explore → Undo"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Complexity: subsets O(2ⁿ), permutations O(n!) — pruning cuts the tree." },
        { label: "Example:", text: "N-Queens rejects a cell the moment two queens share a diagonal." }
      ]
    }
  },
  greedy: {
    title: "GREEDY",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "A greedy algorithm always takes the locally best choice at the current step.",
        "It never revisits a choice, hoping the local optimum gives the global optimum."
      ]
    },
    structure: {
      heading: "Structure:",
      bullets: [
        "Usually sort by a key first (earliest finish, best ratio …).",
        "Pick the best available option, then move on.",
        "No backtracking — choices are final.",
        "Correct only when the greedy-choice property holds."
      ]
    },
    storage: {
      heading: "How Greedy Picks Elements",
      exampleLabel: "Example:",
      exampleCode: "Activity selection: intervals sorted by end time",
      rows: [
        { label: "Index:", kind: "index", values: ["1", "2", "3", "4", "5"] },
        { label: "Interval:", kind: "boxed", values: ["1-3", "2-5", "3-6", "4-8", "6-9"] },
        { label: "Pick:", kind: "addr", values: ["✓", "·", "·", "✓", "✓"], highlights: [0, 3, 4] }
      ],
      notes: [
        "Pick the activity that finishes first.",
        "Skip every activity that overlaps it.",
        "Repeat the same rule on what is left.",
        "Sorting O(n log n) + one O(n) selection pass."
      ]
    },
    keyPoints: {
      heading: "When Greedy Works",
      bullets: [
        "Greedy-choice property: a local optimum extends to a global one.",
        "Optimal substructure: subproblems stay optimal.",
        "Prove it with an exchange argument.",
        { text: "Without those properties greedy can fail.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Time:", kind: "index", values: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] },
      boxed: { label: "Booked:", kind: "boxed", values: ["✓", "", "", "✓", "", "", "✓", "", ""], highlights: [0, 3, 6] },
      caption: "Take the Earliest Finish, Skip Overlaps"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Time: sorting dominates — O(n log n), then a single O(n) scan." },
        { label: "Example:", text: "Fractional knapsack picks the best value/weight ratio first." }
      ]
    }
  },
  heaps: {
    title: "HEAPS",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "A heap is a complete binary tree stored in an array.",
        "The parent is always ≥ its children in a max-heap and ≤ them in a min-heap."
      ]
    },
    structure: {
      heading: "Structure of a Heap:",
      bullets: [
        "Complete tree — every level filled left to right.",
        "Stored in an array — no pointers needed.",
        "parent = (i − 1) / 2, children = 2i + 1 and 2i + 2.",
        "The root is always the max (or min) element."
      ]
    },
    storage: {
      heading: "How a Heap Is Stored in an Array",
      exampleLabel: "Example:",
      exampleCode: "max-heap: {90, 70, 80, 50, 60, 40}",
      rows: [
        { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4", "5"] },
        { label: "Element:", kind: "boxed", values: ["90", "70", "80", "50", "60", "40"] },
        { label: "Parent:", kind: "addr", values: ["—", "0", "0", "1", "1", "2"] }
      ],
      notes: [
        "The root lives at index 0.",
        "Children of i sit at 2i + 1 and 2i + 2.",
        "The last parent is at n / 2 − 1.",
        "Sift up / sift down restore the heap after every change."
      ]
    },
    keyPoints: {
      heading: "Operations",
      bullets: [
        "peek (max / min): O(1).",
        "push: O(log n) — sift up.",
        "pop root: O(log n) — sift down.",
        "build heap from n items: O(n).",
        { text: "Heapify keeps parent ≥ children after each move.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4", "5"] },
      boxed: { label: "Element:", kind: "boxed", values: ["90", "70", "80", "50", "60", "40"] },
      caption: "Level Order of a Complete Binary Tree"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Access: only the root is guaranteed extreme — O(1) peek." },
        { label: "Example:", text: "pop() returns 90, then 80 sifts up to become the new root." }
      ]
    }
  },
  graphs: {
    title: "GRAPHS",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "A graph is a set of vertices V connected by edges E.",
        "Edges may be directed or undirected and may carry weights."
      ]
    },
    structure: {
      heading: "Structure of a Graph:",
      bullets: [
        "G = (V, E) — vertices and edges.",
        "Adjacency list: O(V + E) space — the usual choice.",
        "Adjacency matrix: O(V²) space — suits dense graphs.",
        "Graphs may contain cycles."
      ]
    },
    storage: {
      heading: "How a Graph Is Stored (Adjacency List)",
      exampleLabel: "Example:",
      exampleCode: "V = {0, 1, 2, 3},   E = {(0,1), (0,2), (1,2), (2,3)}",
      rows: [
        { label: "Vertex:", kind: "index", values: ["0", "1", "2", "3"] },
        { label: "Neighbors:", kind: "boxed", values: ["1 → 2", "0 → 2", "0 → 1 → 3", "2"] },
        { label: "Degree:", kind: "addr", values: ["2", "2", "3", "1"] }
      ],
      notes: [
        "Each vertex keeps a list of its neighbours.",
        "In an undirected graph every edge appears in both lists.",
        "Scanning the neighbours of v costs O(degree(v)).",
        "Matrix form: matrix[u][v] holds the weight when an edge exists."
      ]
    },
    keyPoints: {
      heading: "Traversal",
      bullets: [
        "BFS with a queue → shortest path in an unweighted graph.",
        "DFS with a stack / recursion → cycles, topological order, components.",
        "Mark a node visited when it enters the queue or stack.",
        { text: "Adjacency list O(V + E) · Adjacency matrix O(V²).", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Vertex:", kind: "index", values: ["0", "1", "2", "3"] },
      boxed: { label: "Edge to:", kind: "boxed", values: ["1, 2", "0, 2", "0, 1, 3", "2"] },
      caption: "Adjacency List — Neighbours Side by Side"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Traversal: visit every vertex and edge once — O(V + E)." },
        { label: "Example:", text: "BFS from 0 visits 0, then 1 and 2, then 3." }
      ]
    }
  },
  dp: {
    title: "DYNAMIC PROGRAMMING",
    accent: "#3b82f6",
    definition: {
      heading: "Definition:",
      paras: [
        "Dynamic programming solves overlapping subproblems once and stores their answers.",
        "Reusing those answers turns exponential brute force into a polynomial pass."
      ]
    },
    structure: {
      heading: "Structure of a DP Solution:",
      bullets: [
        "Optimal substructure — the answer builds on subproblem answers.",
        "Overlapping subproblems — the same state appears many times.",
        "Needs a state definition, a recurrence and a base case.",
        "Bottom-up (table) or top-down (memoization)."
      ]
    },
    storage: {
      heading: "How the DP Table Is Filled",
      exampleLabel: "Example:",
      exampleCode: "Fibonacci: dp[i] = dp[i-1] + dp[i-2]",
      rows: [
        { label: "Index:", kind: "index", values: ["0", "1", "2", "3", "4", "5", "6"] },
        { label: "dp[i]:", kind: "boxed", values: ["0", "1", "1", "2", "3", "5", "8"] },
        { label: "Computed From:", kind: "addr", values: ["base", "base", "0+1", "1+1", "1+2", "2+3", "3+5"] }
      ],
      notes: [
        "Each cell is computed exactly once.",
        "Fill the base cases first, then follow dependency order.",
        "Table size = number of states.",
        "Memoization caches the same states on demand."
      ]
    },
    keyPoints: {
      heading: "Steps to Solve",
      bullets: [
        "Define the state — what dp[i] means.",
        "Write the recurrence from smaller states.",
        "Fill the base case(s).",
        { text: "Time = number of states × work per state.", highlight: true }
      ]
    },
    visual: {
      heading: "Visual Representation",
      top: { label: "Index:", kind: "index", values: ["0", "1", "2", "…", "n"] },
      boxed: { label: "State:", kind: "boxed", values: ["dp[0]", "dp[1]", "dp[2]", "…", "dp[n]"] },
      caption: "One Pass Over All States"
    },
    tip: {
      lines: [
        { label: "Key Point:", text: "Time: O(n) states × O(1) work = O(n) instead of exponential." },
        { label: "Example:", text: "Coin Change with amount t → O(t × coins) using one table." }
      ]
    }
  }
};
