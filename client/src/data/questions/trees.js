/* Shared tree helpers: build a nested tree from a level-order array,
   serialize back to level-order, and compute an SVG layout. */
function buildTree(arr) {
  const make = (i) => {
    if (i >= arr.length || arr[i] === null || arr[i] === undefined) return null;
    return { v: arr[i], l: make(2 * i + 1), r: make(2 * i + 2) };
  };
  return make(0);
}

function toArray(root) {
  const out = [];
  const q = [root];
  while (q.length) {
    const n = q.shift();
    if (n === null || n === undefined) {
      out.push(null);
      continue;
    }
    out.push(n.v);
    q.push(n.l ?? null);
    q.push(n.r ?? null);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

const treeDepth = (i) => Math.floor(Math.log2(i + 1));

function layout(arr) {
  const pos = {};
  let rank = 0;
  const assign = (i) => {
    if (i >= arr.length || arr[i] === null || arr[i] === undefined) return;
    assign(2 * i + 1);
    pos[i] = { x: rank * 42 + 26, y: treeDepth(i) * 46 + 26 };
    rank += 1;
    assign(2 * i + 2);
  };
  assign(0);
  const nodes = [];
  const edges = [];
  let maxDepth = 0;
  arr.forEach((v, i) => {
    if (v === null || v === undefined) return;
    maxDepth = Math.max(maxDepth, treeDepth(i));
    nodes.push({ x: pos[i].x, y: pos[i].y, v, i });
    [2 * i + 1, 2 * i + 2].forEach((c) => {
      if (c < arr.length && arr[c] !== null && arr[c] !== undefined) {
        edges.push({ x1: pos[i].x, y1: pos[i].y, x2: pos[c].x, y2: pos[c].y });
      }
    });
  });
  return {
    nodes,
    edges,
    width: Math.max(rank * 42 + 20, 120),
    height: (maxDepth + 1) * 46 + 16
  };
}

function treePart(label, root, opts = {}) {
  const arr = toArray(root);
  const { nodes, edges, width, height } = layout(arr);
  return {
    t: "tree",
    label,
    nodes,
    edges,
    width,
    height,
    ...(opts.hi ? { hi: opts.hi } : {}),
    ...(opts.path ? { path: opts.path } : {}),
    ...(opts.order ? { order: opts.order } : {})
  };
}

export const treesQuestions = [
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    leetcode: "LeetCode #226",
    difficulty: "Easy",
    problem:
      "Given the root of a binary tree, invert the tree (mirror it) and return its root. Every node's left and right children are swapped.",
    examples: [
      { input: "root = [4, 2, 7, 1, 3, 6, 9]", output: "[4, 7, 2, 9, 6, 3, 1]", explanation: "Children of each node are swapped." },
      { input: "root = [2, 1, 3]", output: "[2, 3, 1]", explanation: "The two children of the root swap." }
    ],
    constraints: ["The number of nodes is in [0, 100]", "-100 <= Node.val <= 100"],
    approaches: [
      {
        name: "Optimal — Recursive DFS Swap",
        kind: "optimal",
        time: "O(n)",
        space: "O(h)",
        runs: true,
        javaCode: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode temp = root.left;
        root.left = root.right;
        root.right = temp;
        invertTree(root.left);
        invertTree(root.right);
        return root;
    }
}`
      }
    ],
    defaultInput: { tree: [4, 2, 7, 1, 3, 6, 9] },
    dryRunInputs: [
      { tree: [4, 2, 7, 1, 3, 6, 9] },
      { tree: [2, 1, 3] }
    ],
    generateSteps({ tree }) {
      const steps = [];
      const root = buildTree(tree);
      const swapped = [];

      steps.push({ line: 3, title: "Start", action: "Invert = swap the left and right child of every node.", parts: [
        treePart("tree", root)
      ] });

      const dfs = (node) => {
        if (!node) return;
        const temp = node.l;
        node.l = node.r;
        node.r = temp;
        swapped.push(node.v);
        steps.push({ line: 5, title: `Swap children of ${node.v}`, action: `left ↔ right at node ${node.v}.`, parts: [
          treePart("tree", root, { hi: [node.v] }),
          { t: "vars", items: [{ k: "node", v: node.v, c: "cur" }, { k: "swapped", v: `[${swapped.join(", ")}]` }] }
        ] });
        dfs(node.l);
        dfs(node.r);
      };
      dfs(root);

      const result = toArray(root);
      steps.push({ line: 9, title: "Result", action: `Inverted level-order = [${result.join(", ")}]`, parts: [
        treePart("inverted tree", root, { hi: swapped }),
        { t: "result", label: "Answer", value: `[${result.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    leetcode: "LeetCode #104",
    difficulty: "Easy",
    problem:
      "Given the root of a binary tree, return its maximum depth. The maximum depth is the number of nodes along the longest path from the root down to the farthest leaf node.",
    examples: [
      { input: "root = [3, 9, 20, null, null, 15, 7]", output: "3", explanation: "The longest path is 3 → 20 → 15 (or 7)." },
      { input: "root = [1, null, 2]", output: "2", explanation: "The path 1 → 2 has length 2." }
    ],
    constraints: ["The number of nodes is in [0, 10^4]", "-100 <= Node.val <= 100"],
    approaches: [
      {
        name: "Optimal — Post-order Recursion",
        kind: "optimal",
        time: "O(n)",
        space: "O(h)",
        runs: true,
        javaCode: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        int left = maxDepth(root.left);
        int right = maxDepth(root.right);
        return 1 + Math.max(left, right);
    }
}`
      }
    ],
    defaultInput: { tree: [3, 9, 20, null, null, 15, 7] },
    dryRunInputs: [
      { tree: [3, 9, 20, null, null, 15, 7] },
      { tree: [1, null, 2] }
    ],
    generateSteps({ tree }) {
      const steps = [];
      const root = buildTree(tree);

      steps.push({ line: 3, title: "Start DFS", action: "Depth of a node = 1 + max(depth of left, depth of right).", parts: [
        treePart("tree", root)
      ] });

      const dfs = (node) => {
        if (!node) return 0;
        steps.push({ line: 4, title: `Visit ${node.v}`, action: `Compute maxDepth of node ${node.v}.`, parts: [
          treePart("tree", root, { hi: [node.v] })
        ] });
        const l = dfs(node.l);
        const r = dfs(node.r);
        const d = 1 + Math.max(l, r);
        steps.push({ line: 6, title: `depth(${node.v}) = ${d}`, action: `left = ${l}, right = ${r}, so 1 + max(${l}, ${r}) = ${d}.`, parts: [
          treePart("tree", root, { hi: [node.v] }),
          { t: "vars", items: [{ k: "left", v: l }, { k: "right", v: r }, { k: "depth", v: d, c: "hi" }] }
        ] });
        return d;
      };
      const ans = dfs(root);

      steps.push({ line: 6, title: "Result", action: `The maximum depth of the tree is ${ans}.`, parts: [
        treePart("tree", root),
        { t: "result", label: "Answer", value: ans }
      ] });
      return steps;
    }
  },
  {
    id: "same-tree",
    title: "Same Tree",
    leetcode: "LeetCode #100",
    difficulty: "Easy",
    problem:
      "Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical and the nodes have the same value.",
    examples: [
      { input: "p = [1, 2, 3], q = [1, 2, 3]", output: "true", explanation: "Both trees match node for node." },
      { input: "p = [1, 2], q = [1, null, 2]", output: "false", explanation: "Node 2 is a left child in p but a right child in q." }
    ],
    constraints: ["The number of nodes in both trees is in [0, 100]", "-10^4 <= Node.val <= 10^4"],
    approaches: [
      {
        name: "Optimal — Parallel DFS",
        kind: "optimal",
        time: "O(n)",
        space: "O(h)",
        runs: true,
        javaCode: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`
      }
    ],
    defaultInput: { p: [1, 2, 3], q: [1, 2, 3] },
    dryRunInputs: [
      { p: [1, 2, 3], q: [1, 2, 3] },
      { p: [1, 2], q: [1, null, 2] }
    ],
    generateSteps({ p, q }) {
      const steps = [];
      const rootP = buildTree(p);
      const rootQ = buildTree(q);
      let same = true;

      steps.push({ line: 3, title: "Start", action: "Walk both trees together, comparing matching nodes.", parts: [
        treePart("tree p", rootP),
        treePart("tree q", rootQ)
      ] });

      const dfs = (a, b) => {
        if (a === null && b === null) {
          steps.push({ line: 3, title: "Both null", action: "These subtrees match (both empty).", parts: [
            treePart("tree p", rootP),
            treePart("tree q", rootQ),
            { t: "result", label: "subtree equal", value: "true" }
          ] });
          return true;
        }
        if (a === null || b === null) {
          same = false;
          steps.push({ line: 4, title: "One side null", action: `p is ${a === null ? "null" : a.v} but q is ${b === null ? "null" : b.v} → mismatch.`, parts: [
            treePart("tree p", rootP, { hi: a ? [a.v] : [] }),
            treePart("tree q", rootQ, { hi: b ? [b.v] : [] }),
            { t: "result", label: "subtree equal", value: "false" }
          ] });
          return false;
        }
        steps.push({ line: 5, title: `Compare ${a.v} with ${b.v}`, action: a.v === b.v ? "Values match, recurse into children." : "Values differ → not the same tree.", parts: [
          treePart("tree p", rootP, { hi: [a.v] }),
          treePart("tree q", rootQ, { hi: [b.v] }),
          { t: "vars", items: [{ k: "p.val", v: a.v, c: "cur" }, { k: "q.val", v: b.v, c: "cur" }] }
        ] });
        if (a.v !== b.v) {
          same = false;
          return false;
        }
        const left = dfs(a.l, b.l);
        const right = dfs(a.r, b.r);
        return left && right;
      };
      same = dfs(rootP, rootQ) && same;

      steps.push({ line: 6, title: "Result", action: same ? "All compared nodes matched → the trees are the same." : "A mismatch was found → the trees differ.", parts: [
        treePart("tree p", rootP),
        treePart("tree q", rootQ),
        { t: "result", label: "isSameTree", value: same ? "true" : "false" }
      ] });
      return steps;
    }
  },
  {
    id: "symmetric-tree",
    title: "Symmetric Tree",
    leetcode: "LeetCode #101",
    difficulty: "Easy",
    problem:
      "Given the root of a binary tree, check whether it is a mirror of itself (symmetric around its center).",
    examples: [
      { input: "root = [1, 2, 2, 3, 4, 4, 3]", output: "true", explanation: "The left subtree mirrors the right subtree." },
      { input: "root = [1, 2, 2, null, 3, null, 3]", output: "false", explanation: "Node 3 sits below different parents on each side." }
    ],
    constraints: ["The number of nodes is in [1, 1000]", "-100 <= Node.val <= 100"],
    approaches: [
      {
        name: "Optimal — Mirror Check",
        kind: "optimal",
        time: "O(n)",
        space: "O(h)",
        runs: true,
        javaCode: `class Solution {
    public boolean isSymmetric(TreeNode root) {
        return isMirror(root, root);
    }

    private boolean isMirror(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null) return false;
        return a.val == b.val
            && isMirror(a.left, b.right)
            && isMirror(a.right, b.left);
    }
}`
      }
    ],
    defaultInput: { tree: [1, 2, 2, 3, 4, 4, 3] },
    dryRunInputs: [
      { tree: [1, 2, 2, 3, 4, 4, 3] },
      { tree: [1, 2, 2, null, 3, null, 3] }
    ],
    generateSteps({ tree }) {
      const steps = [];
      const root = buildTree(tree);
      let symmetric = true;

      steps.push({ line: 3, title: "Start", action: "Compare the tree against itself, but going opposite directions (left vs right).", parts: [
        treePart("tree", root)
      ] });

      const mirror = (a, b) => {
        if (a === null && b === null) {
          steps.push({ line: 6, title: "Both null", action: "Mirror positions are both empty → match.", parts: [
            treePart("tree", root),
            { t: "result", label: "mirror", value: "true" }
          ] });
          return true;
        }
        if (a === null || b === null) {
          symmetric = false;
          steps.push({ line: 7, title: "One side null", action: `Mirror positions differ: ${a === null ? "null" : a.v} vs ${b === null ? "null" : b.v}.`, parts: [
            treePart("tree", root, { hi: [a ? a.v : b.v] }),
            { t: "result", label: "mirror", value: "false" }
          ] });
          return false;
        }
        const isEq = a.v === b.v;
        steps.push({ line: 8, title: `Compare ${a.v} with ${b.v}`, action: isEq ? "Values match; check opposite children next." : "Values differ → not symmetric.", parts: [
          treePart("tree", root, { hi: [a.v, b.v] }),
          { t: "vars", items: [{ k: "a.val", v: a.v, c: "cur" }, { k: "b.val", v: b.v, c: "cur" }] }
        ] });
        if (!isEq) {
          symmetric = false;
          return false;
        }
        const outer = mirror(a.l, b.r);
        const inner = mirror(a.r, b.l);
        return outer && inner;
      };
      symmetric = mirror(root, root) && symmetric;

      steps.push({ line: 8, title: "Result", action: symmetric ? "Every mirrored pair matched → the tree is symmetric." : "A mirrored pair differed → the tree is not symmetric.", parts: [
        treePart("tree", root),
        { t: "result", label: "isSymmetric", value: symmetric ? "true" : "false" }
      ] });
      return steps;
    }
  },
  {
    id: "diameter-of-binary-tree",
    title: "Diameter of Binary Tree",
    leetcode: "LeetCode #543",
    difficulty: "Easy",
    problem:
      "Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes, measured by the number of edges.",
    examples: [
      { input: "root = [1, 2, 3, 4, 5]", output: "3", explanation: "The path 4 → 2 → 1 → 3 has 3 edges." },
      { input: "root = [1, 2]", output: "1", explanation: "The single edge between 1 and 2." }
    ],
    constraints: ["The number of nodes is in [1, 10^4]", "-100 <= Node.val <= 100"],
    approaches: [
      {
        name: "Optimal — DFS computing height and diameter together",
        kind: "optimal",
        time: "O(n)",
        space: "O(h)",
        runs: true,
        javaCode: `class Solution {
    int diameter = 0;
    public int diameterOfBinaryTree(TreeNode root) {
        height(root);
        return diameter;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;
        int left = height(node.left);
        int right = height(node.right);
        diameter = Math.max(diameter, left + right);
        return 1 + Math.max(left, right);
    }
}`
      }
    ],
    defaultInput: { tree: [1, 2, 3, 4, 5] },
    dryRunInputs: [
      { tree: [1, 2, 3, 4, 5] },
      { tree: [1, 2] }
    ],
    generateSteps({ tree }) {
      const steps = [];
      const root = buildTree(tree);
      let diameter = 0;

      steps.push({ line: 4, title: "Start", action: "One DFS returns each node's height while updating the global diameter.", parts: [
        treePart("tree", root),
        { t: "vars", items: [{ k: "diameter", v: 0, c: "hi" }] }
      ] });

      const height = (node) => {
        if (!node) return 0;
        steps.push({ line: 9, title: `Descend into ${node.v}`, action: `Compute height of subtree rooted at ${node.v}.`, parts: [
          treePart("tree", root, { hi: [node.v] }),
          { t: "vars", items: [{ k: "diameter", v: diameter }] }
        ] });
        const l = height(node.l);
        const r = height(node.r);
        const through = l + r;
        const before = diameter;
        if (through > diameter) diameter = through;
        steps.push({ line: 11, title: `diameter through ${node.v} = ${through}`, action: `left height ${l} + right height ${r} = ${through}; diameter = max(${before}, ${through}) = ${diameter}.`, parts: [
          treePart("tree", root, { hi: [node.v] }),
          { t: "vars", items: [{ k: "left", v: l }, { k: "right", v: r }, { k: "diameter", v: diameter, c: "hi" }] }
        ] });
        return 1 + Math.max(l, r);
      };
      height(root);

      steps.push({ line: 5, title: "Result", action: `The diameter is the largest (left + right) height seen = ${diameter}.`, parts: [
        treePart("tree", root),
        { t: "result", label: "Answer", value: diameter }
      ] });
      return steps;
    }
  },
  {
    id: "lca-bst",
    title: "Lowest Common Ancestor of a Binary Search Tree",
    leetcode: "LeetCode #235",
    difficulty: "Easy",
    problem:
      "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q in the BST. The LCA is the lowest node that has both p and q as descendants (a node can be a descendant of itself).",
    examples: [
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8", output: "6", explanation: "2 is in the left subtree and 8 in the right, so 6 splits them." },
      { input: "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4", output: "2", explanation: "4 is inside 2's subtree, so 2 is the LCA." }
    ],
    constraints: ["The number of nodes is in [2, 10^5]", "-10^9 <= Node.val <= 10^9", "All Node.val are unique", "p != q, both exist in the BST."],
    approaches: [
      {
        name: "Optimal — Walk the BST",
        kind: "optimal",
        time: "O(h)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        TreeNode cur = root;
        while (cur != null) {
            if (p.val < cur.val && q.val < cur.val) {
                cur = cur.left;
            } else if (p.val > cur.val && q.val > cur.val) {
                cur = cur.right;
            } else {
                return cur;
            }
        }
        return null;
    }
}`
      }
    ],
    defaultInput: { tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 },
    dryRunInputs: [
      { tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 8 },
      { tree: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], p: 2, q: 4 }
    ],
    generateSteps({ tree, p, q }) {
      const steps = [];
      const root = buildTree(tree);
      let cur = root;
      let answer = null;

      steps.push({ line: 3, title: "Start at the root", action: `Find the LCA of ${p} and ${q}. Walk down from the root.`, parts: [
        treePart("BST", root, { hi: [root.v], path: [p, q] }),
        { t: "vars", items: [{ k: "cur", v: root.v, c: "cur" }, { k: "p", v: p }, { k: "q", v: q }] }
      ] });

      let guard = 0;
      while (cur && guard < 40) {
        guard += 1;
        const bothLeft = p < cur.v && q < cur.v;
        const bothRight = p > cur.v && q > cur.v;
        steps.push({ line: 5, title: `cur = ${cur.v}`, action: bothLeft ? `Both ${p} and ${q} are smaller than ${cur.v} → go left.` : bothRight ? `Both ${p} and ${q} are larger than ${cur.v} → go right.` : `${cur.v} splits ${p} and ${q} (or equals one) → this is the LCA.`, parts: [
          treePart("BST", root, { hi: [cur.v], path: [p, q] }),
          { t: "vars", items: [{ k: "cur", v: cur.v, c: "cur" }, { k: "p", v: p }, { k: "q", v: q }] }
        ] });

        if (bothLeft) {
          cur = cur.l;
          steps.push({ line: 6, title: "Move left", action: `cur = ${cur ? cur.v : "null"}.`, parts: [
            treePart("BST", root, { hi: cur ? [cur.v] : [], path: [p, q] })
          ] });
        } else if (bothRight) {
          cur = cur.r;
          steps.push({ line: 8, title: "Move right", action: `cur = ${cur ? cur.v : "null"}.`, parts: [
            treePart("BST", root, { hi: cur ? [cur.v] : [], path: [p, q] })
          ] });
        } else {
          answer = cur.v;
          break;
        }
      }

      steps.push({ line: 10, title: "Result", action: `The lowest common ancestor of ${p} and ${q} is ${answer}.`, parts: [
        treePart("BST", root, { hi: [answer], path: [p, q] }),
        { t: "result", label: "Answer", value: answer }
      ] });
      return steps;
    }
  },
  {
    id: "level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    leetcode: "LeetCode #102",
    difficulty: "Medium",
    problem:
      "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    examples: [
      { input: "root = [3, 9, 20, null, null, 15, 7]", output: "[[3], [9, 20], [15, 7]]", explanation: "Each level becomes its own list." },
      { input: "root = [1]", output: "[[1]]", explanation: "A single node forms one level." }
    ],
    constraints: ["The number of nodes is in [0, 2000]", "-1000 <= Node.val <= 1000"],
    approaches: [
      {
        name: "Optimal — BFS with a Queue",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = queue.poll();
                level.add(node.val);
                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(level);
        }
        return result;
    }
}`
      }
    ],
    defaultInput: { tree: [3, 9, 20, null, null, 15, 7] },
    dryRunInputs: [
      { tree: [3, 9, 20, null, null, 15, 7] },
      { tree: [1] }
    ],
    generateSteps({ tree }) {
      const steps = [];
      const root = buildTree(tree);
      const result = [];
      let queue = root ? [root] : [];

      steps.push({ line: 6, title: "Enqueue the root", action: "BFS starts with the root in the queue.", parts: [
        treePart("tree", root),
        { t: "queue", label: "queue", values: queue.map((n) => n.v), front: 0, hi: queue.length - 1 }
      ] });

      while (queue.length) {
        const size = queue.length;
        const level = [];
        steps.push({ line: 8, title: `Level of ${size} node(s)`, action: `Process exactly ${size} nodes for this level.`, parts: [
          treePart("tree", root),
          { t: "queue", label: "queue", values: queue.map((n) => n.v), front: 0, hi: queue.length - 1 },
          { t: "vars", items: [{ k: "size", v: size, c: "hi" }] }
        ] });

        for (let i = 0; i < size; i++) {
          const node = queue.shift();
          level.push(node.v);
          if (node.l) queue.push(node.l);
          if (node.r) queue.push(node.r);
          steps.push({ line: 12, title: `Visit ${node.v}`, action: `Add ${node.v} to the current level; enqueue its children.`, parts: [
            treePart("tree", root, { hi: [node.v] }),
            { t: "queue", label: "queue", values: queue.map((n) => n.v), front: 0, hi: queue.length - 1 },
            { t: "vars", items: [{ k: "level", v: `[${level.join(", ")}]`, c: "cur" }] }
          ] });
        }
        result.push(level);
        steps.push({ line: 16, title: `Level [${level.join(", ")}] done`, action: "Append this level to the result and move on.", parts: [
          treePart("tree", root),
          { t: "queue", label: "queue", values: queue.map((n) => n.v), front: 0, hi: queue.length - 1 },
          { t: "vars", items: [{ k: "result", v: result.map((l) => `[${l.join(", ")}]`).join(" ") }] }
        ] });
      }

      const answer = result.map((l) => `[${l.join(", ")}]`).join(" ");
      steps.push({ line: 18, title: "Result", action: `Level order = ${answer}`, parts: [
        { t: "result", label: "Answer", value: answer }
      ] });
      return steps;
    }
  }
];

