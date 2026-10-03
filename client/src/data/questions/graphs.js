export const graphsQuestions = [
  {
    id: "number-of-islands",
    title: "Number of Islands",
    leetcode: "LeetCode #200",
    difficulty: "Medium",
    problem:
      "Given an m x n grid of '1' (land) and '0' (water), count the number of islands. An island is 4-directionally connected land surrounded by water. Note: this solution modifies the input grid by marking visited land as water.",
    examples: [
      { input: 'grid = [["1","1","0"],["1","0","0"],["0","0","1"]]', output: "2", explanation: "Two separate land groups: top-left block and bottom-right cell." },
      { input: '[["1","1","1"],["1","0","1"],["1","1","1"]]', output: "1", explanation: "All land is connected in a ring." }
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", 'grid[i][j] is "0" or "1"'],
    approaches: [
      {
        name: "Optimal — DFS flood fill",
        kind: "optimal",
        time: "O(m × n)",
        space: "O(m × n)",
        runs: true,
        javaCode: `class Solution {
    public int numIslands(char[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        int islands = 0;

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (grid[i][j] == '1') {
                    islands++;
                    dfs(grid, i, j);
                }
            }
        }

        return islands;
    }

    private void dfs(char[][] grid, int row, int col) {
        if (row < 0 || row >= grid.length ||
            col < 0 || col >= grid[0].length ||
            grid[row][col] != '1') {
            return;
        }

        grid[row][col] = '0';

        dfs(grid, row - 1, col);
        dfs(grid, row + 1, col);
        dfs(grid, row, col - 1);
        dfs(grid, row, col + 1);
    }
}`
      }
    ],
    defaultInput: { grid: [["1", "1", "0"], ["1", "0", "0"], ["0", "0", "1"]] },
    dryRunInputs: [
      { grid: [["1", "1", "0"], ["1", "0", "0"], ["0", "0", "1"]] },
      { grid: [["1", "1", "1"], ["1", "0", "1"], ["1", "1", "1"]] }
    ],
    generateSteps({ grid }) {
      const steps = [];
      const m = grid.length, n = grid[0].length;
      const g = grid.map((row) => [...row]);
      const visited = new Set();
      let count = 0;
      const key = (r, c) => r + "," + c;
      const gridPart = (cur, sunk = []) => ({
        t: "dp",
        label: "grid (1 = land, sunk = filled)",
        rows: g.map((row, r) => row.map((v, c) => {
          if (v === "0" && visited.has(key(r, c))) return "×";
          return v;
        })),
        ...(cur ? { cell: cur } : {}),
        filled: sunk.map(([r, c]) => [r, c]),
        note: `islands so far: ${count}`
      });
      steps.push({ line: 8, title: "Scan the grid", action: "Every time we find unvisited land, it starts a new island; flood-fill it.", parts: [
        gridPart(),
        { t: "vars", items: [{ k: "islands", v: 0 }] }
      ] });
      const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
          if (g[r][c] !== "1") continue;
          count++;
          const sunk = [];
          const stack = [[r, c]];
          visited.add(key(r, c));
          while (stack.length) {
            const [cr, cc] = stack.pop();
            g[cr][cc] = "0";
            sunk.push([cr, cc]);
            for (const [dr, dc] of dirs) {
              const nr = cr + dr, nc = cc + dc;
              if (nr < 0 || nc < 0 || nr >= m || nc >= n) continue;
              if (g[nr][nc] !== "1" || visited.has(key(nr, nc))) continue;
              visited.add(key(nr, nc));
              stack.push([nr, nc]);
            }
          }
          steps.push({ line: 11, title: `Island ${count} at (${r},${c})`, action: `Flood-fill sinks ${sunk.length} land cell(s). Islands = ${count}.`, parts: [
            gridPart([r, c], sunk),
            { t: "vars", items: [{ k: "islands", v: count }, { k: "sunk", v: sunk.length }] }
          ] });
        }
      }
      steps.push({ line: 17, title: "Result", action: `Total islands = ${count}.`, parts: [
        gridPart(),
        { t: "result", label: "Answer", value: count }
      ] });
      return steps;
    }
  },
  {
    id: "clone-graph",
    title: "Clone Graph",
    leetcode: "LeetCode #133",
    difficulty: "Medium",
    problem:
      "Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph. Each node has a value and a list of neighbors.",
    examples: [
      { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "cloned graph with same adjacency", explanation: "A 4-node cycle is copied node by node." },
      { input: "adjList = [[]]", output: "single node with no neighbors", explanation: "One isolated node is cloned." }
    ],
    constraints: ["0 <= nodes <= 100", "1 <= Node.val <= 100", "No repeated edges or self loops"],
    approaches: [
      {
        name: "Optimal — DFS + hash map",
        kind: "optimal",
        time: "O(V + E)",
        space: "O(V)",
        runs: true,
        javaCode: `class Solution {
    Map<Node, Node> map = new HashMap<>();
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        if (map.containsKey(node)) return map.get(node);
        Node copy = new Node(node.val);
        map.put(node, copy);
        for (Node nei : node.neighbors) {
            copy.neighbors.add(cloneGraph(nei));
        }
        return copy;
    }
}`
      }
    ],
    defaultInput: { adjList: [[2, 4], [1, 3], [2, 4], [1, 3]] },
    dryRunInputs: [
      { adjList: [[2, 4], [1, 3], [2, 4], [1, 3]] },
      { adjList: [[]] }
    ],
    generateSteps({ adjList }) {
      const steps = [];
      const n = adjList.length;
      const cx = [60, 160, 160, 60];
      const cy = [50, 50, 150, 150];
      const nodes = adjList.map((_, i) => ({ id: i + 1, x: cx[i % 4], y: cy[i % 4], label: String(i + 1) }));
      const edges = [];
      adjList.forEach((neis, i) => {
        neis.forEach((v) => {
          if (v > i + 1) edges.push([i + 1, v]);
        });
      });
      const cloned = {};
      const order = [];
      if (n > 0) {
        const stack = [1];
        const seen = new Set([1]);
        while (stack.length) {
          const u = stack.pop();
          cloned[u] = true;
          order.push(u);
          for (const v of (adjList[u - 1] || [])) {
            if (!seen.has(v)) { seen.add(v); stack.push(v); }
          }
        }
      }
      const graphPart = (cur) => ({
        t: "graph",
        label: n === 0 ? "Empty graph" : "Original graph",
        nodes,
        edges: edges.map(([a, b]) => (cur && (a === cur || b === cur) ? [a, b, "on"] : [a, b])),
        visited: Object.fromEntries(order.filter((x) => cloned[x]).slice(0, order.indexOf(cur) + 1 > 0 ? order.indexOf(cur) + 1 : order.length).map((x) => [x, true])),
        ...(cur ? { current: cur } : {}),
        queue: order.filter((x) => cloned[x]),
        queueLabel: "Cloned"
      });
      steps.push({ line: 3, title: "Start from node 1", action: n ? "DFS from node 1; copy each node once using a map old → new." : "Empty graph → return null.", parts: [
        graphPart(),
        { t: "map", label: "Clone map", entries: [], hiKey: undefined }
      ] });
      order.forEach((u, i) => {
        const done = order.slice(0, i + 1);
        steps.push({ line: 7, title: `Clone node ${u}`, action: `Copy node ${u} with neighbors [${(adjList[u - 1] || []).join(", ")}].`, parts: [
          {
            t: "graph",
            label: "Original graph",
            nodes,
            edges: edges.map(([a, b]) => (a === u || b === u ? [a, b, "on"] : [a, b])),
            visited: Object.fromEntries(done.map((x) => [x, true])),
            current: u,
            queue: done,
            queueLabel: "Cloned"
          },
          { t: "map", label: "Clone map", entries: done.map((x) => [String(x), "copy " + x]), hiKey: String(u) }
        ] });
      });
      steps.push({ line: 12, title: "Result", action: n ? `All ${n} node(s) cloned with identical adjacency.` : "Nothing to clone.", parts: [
        graphPart(),
        { t: "result", label: "Answer", value: n ? `${n} nodes cloned` : "null" }
      ] });
      return steps;
    }
  },
  {
    id: "course-schedule",
    title: "Course Schedule",
    leetcode: "LeetCode #207",
    difficulty: "Medium",
    problem:
      "There are numCourses courses labeled 0 to numCourses - 1. Given prerequisites [a, b] meaning take b before a, decide if all courses can be finished (i.e. the graph has no cycle).",
    examples: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", explanation: "Take 0 then 1." },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false", explanation: "A cycle 0 → 1 → 0 makes it impossible." }
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000"],
    approaches: [
      {
        name: "Optimal — Kahn's BFS topological sort",
        kind: "optimal",
        time: "O(V + E)",
        space: "O(V + E)",
        runs: true,
        javaCode: `import java.util.*;

class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> graph = new ArrayList<>();
        int[] indegree = new int[numCourses];

        for (int i = 0; i < numCourses; i++) {
            graph.add(new ArrayList<>());
        }

        for (int[] pair : prerequisites) {
            int course = pair[0];
            int prerequisite = pair[1];

            graph.get(prerequisite).add(course);
            indegree[course]++;
        }

        Queue<Integer> queue = new LinkedList<>();

        for (int i = 0; i < numCourses; i++) {
            if (indegree[i] == 0) {
                queue.offer(i);
            }
        }

        int completed = 0;

        while (!queue.isEmpty()) {
            int current = queue.poll();
            completed++;

            for (int next : graph.get(current)) {
                indegree[next]--;

                if (indegree[next] == 0) {
                    queue.offer(next);
                }
            }
        }

        return completed == numCourses;
    }
}`
      }
    ],
    defaultInput: { numCourses: 4, prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]] },
    dryRunInputs: [
      { numCourses: 4, prerequisites: [[1, 0], [2, 0], [3, 1], [3, 2]] },
      { numCourses: 2, prerequisites: [[1, 0], [0, 1]] }
    ],
    generateSteps({ numCourses, prerequisites }) {
      const steps = [];
      const adj = Array.from({ length: numCourses }, () => []);
      const indeg = new Array(numCourses).fill(0);
      for (const [a, b] of prerequisites) { adj[b].push(a); indeg[a]++; }
      const pos = [[60, 100], [160, 50], [160, 150], [260, 100], [60, 170], [220, 170]];
      const nodes = Array.from({ length: numCourses }, (_, i) => ({ id: i, x: pos[i % pos.length][0], y: pos[i % pos.length][1], label: String(i) }));
      const edges = prerequisites.map(([a, b]) => [b, a]);
      let queue = [];
      for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) queue.push(i);
      const taken = [];
      const indegNow = [...indeg];
      steps.push({ line: 16, title: "Build graph + indegrees", action: `Edge prerequisite → course for each pair. Start with zero-indegree courses [${queue.join(", ")}].`, parts: [
        { t: "graph", label: "Prerequisite graph (b → a)", nodes, edges, visited: {}, queue: [...queue], queueLabel: "Queue" },
        { t: "array", label: "indegree", values: [...indegNow], marks: Object.fromEntries(queue.map((q) => [q, "hi"])) }
      ] });
      let guard = 0;
      while (queue.length && guard < 12) {
        guard++;
        const u = queue.shift();
        taken.push(u);
        for (const v of adj[u]) {
          indegNow[v]--;
          if (indegNow[v] === 0) queue.push(v);
        }
        steps.push({ line: 36, title: `Take course ${u}`, action: `Remove ${u}; decrease its neighbors. Completed: [${taken.join(", ")}].`, parts: [
          { t: "graph", label: "Prerequisite graph (b → a)", nodes, edges, visited: Object.fromEntries(taken.map((x) => [x, true])), current: u, queue: [...queue], queueLabel: "Queue" },
          { t: "array", label: "indegree", values: [...indegNow], marks: { [u]: "cur" } },
          { t: "vars", items: [{ k: "taken", v: taken.length + "/" + numCourses }] }
        ] });
      }
      const ok = taken.length === numCourses;
      steps.push({ line: 46, title: "Result", action: ok ? `All ${numCourses} courses taken → true.` : `Only ${taken.length}/${numCourses} taken → cycle exists → false.`, parts: [
        { t: "graph", label: "Prerequisite graph (b → a)", nodes, edges, visited: Object.fromEntries(taken.map((x) => [x, true])), queue: [...queue], queueLabel: "Queue" },
        { t: "result", label: "Answer", value: String(ok) }
      ] });
      return steps;
    }
  },
  {
    id: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    leetcode: "LeetCode #417",
    difficulty: "Medium",
    problem:
      "Given heights grid, rain flows to 4-neighbors with height <= current. Pacific touches top + left edges, Atlantic touches bottom + right edges. Return cells that can flow to both oceans.",
    examples: [
      { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", explanation: "These 7 cells reach both oceans." },
      { input: "heights = [[1]]", output: "[[0,0]]", explanation: "Single cell touches both oceans." }
    ],
    constraints: ["1 <= m, n <= 200", "0 <= heights[r][c] <= 10^5"],
    approaches: [
      {
        name: "Optimal — Two DFS/BFS from oceans",
        kind: "optimal",
        time: "O(m × n)",
        space: "O(m × n)",
        runs: true,
        javaCode: `class Solution {
    public List<List<Integer>> pacificAtlantic(int[][] h) {
        int m = h.length, n = h[0].length;
        boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];
        for (int c = 0; c < n; c++) { dfs(h, 0, c, pac); dfs(h, m - 1, c, atl); }
        for (int r = 0; r < m; r++) { dfs(h, r, 0, pac); dfs(h, r, n - 1, atl); }
        List<List<Integer>> res = new ArrayList<>();
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                if (pac[r][c] && atl[r][c]) res.add(List.of(r, c));
        return res;
    }
    private void dfs(int[][] h, int r, int c, boolean[][] seen) {
        if (r < 0 || c < 0 || r >= h.length || c >= h[0].length || seen[r][c]) return;
        seen[r][c] = true;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        for (int[] d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr < 0 || nc < 0 || nr >= h.length || nc >= h[0].length) continue;
            if (h[nr][nc] >= h[r][c]) dfs(h, nr, nc, seen);
        }
    }
}`
      }
    ],
    defaultInput: { heights: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]] },
    dryRunInputs: [
      { heights: [[1, 2, 2, 3, 5], [3, 2, 3, 4, 4], [2, 4, 5, 3, 1], [6, 7, 1, 4, 5], [5, 1, 1, 2, 4]] },
      { heights: [[1]] }
    ],
    generateSteps({ heights }) {
      const steps = [];
      const m = heights.length, n = heights[0].length;
      const reach = (starts) => {
        const seen = Array.from({ length: m }, () => new Array(n).fill(false));
        const stack = [...starts];
        for (const [r, c] of starts) seen[r][c] = true;
        while (stack.length) {
          const [r, c] = stack.pop();
          for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nr = r + dr, nc = c + dc;
            if (nr < 0 || nc < 0 || nr >= m || nc >= n || seen[nr][nc]) continue;
            if (heights[nr][nc] >= heights[r][c]) { seen[nr][nc] = true; stack.push([nr, nc]); }
          }
        }
        return seen;
      };
      const pacStarts = [];
      for (let c = 0; c < n; c++) pacStarts.push([0, c]);
      for (let r = 0; r < m; r++) pacStarts.push([r, 0]);
      const atlStarts = [];
      for (let c = 0; c < n; c++) atlStarts.push([m - 1, c]);
      for (let r = 0; r < m; r++) atlStarts.push([r, n - 1]);
      const pac = reach(pacStarts);
      const atl = reach(atlStarts);
      const both = [];
      for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) if (pac[r][c] && atl[r][c]) both.push([r, c]);
      const gridPart = (mode) => ({
        t: "dp",
        label: mode === "pac" ? "Pacific reach (filled)" : mode === "atl" ? "Atlantic reach (filled)" : "Both oceans (cell = reaches both)",
        rows: heights.map((row, r) => row.map((v, c) => {
          if (mode === "pac") return pac[r][c] ? v : "·";
          if (mode === "atl") return atl[r][c] ? v : "·";
          return pac[r][c] && atl[r][c] ? v : "·";
        })),
        filled: heights.flatMap((row, r) => row.map((_, c) => {
          if (mode === "pac") return pac[r][c] ? [r, c] : null;
          if (mode === "atl") return atl[r][c] ? [r, c] : null;
          return pac[r][c] && atl[r][c] ? [r, c] : null;
        }).filter(Boolean)),
        note: mode === "both" ? `${both.length} cell(s) reach both` : mode === "pac" ? "reverse-flow from top + left" : "reverse-flow from bottom + right"
      });
      steps.push({ line: 5, title: "Flow from Pacific edges", action: "Reverse-DFS uphill from top row + left column.", parts: [
        gridPart("pac"),
        { t: "vars", items: [{ k: "pacCells", v: pac.flat().filter(Boolean).length }] }
      ] });
      steps.push({ line: 6, title: "Flow from Atlantic edges", action: "Reverse-DFS uphill from bottom row + right column.", parts: [
        gridPart("atl"),
        { t: "vars", items: [{ k: "atlCells", v: atl.flat().filter(Boolean).length }] }
      ] });
      steps.push({ line: 10, title: "Result", action: `Intersection = ${both.length} cell(s): ${both.map(([r, c]) => `[${r},${c}]`).join(", ") || "none"}.`, parts: [
        gridPart("both"),
        { t: "result", label: "Answer", value: `[${both.map(([r, c]) => `[${r},${c}]`).join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "rotting-oranges",
    title: "Rotting Oranges",
    leetcode: "LeetCode #994",
    difficulty: "Medium",
    problem:
      "Given grid with 0 = empty, 1 = fresh orange, 2 = rotten orange. Every minute, fresh oranges 4-adjacent to a rotten one become rotten. Return minutes until no fresh orange remains, or -1 if impossible.",
    examples: [
      { input: "grid = [[2,1,1],[1,1,0],[0,1,1]]", output: "4", explanation: "Takes 4 minutes to rot all oranges." },
      { input: "grid = [[2,1,1],[0,1,1],[1,0,1]]", output: "-1", explanation: "One fresh orange can never be reached." }
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 10"],
    approaches: [
      {
        name: "Optimal — Multi-source BFS",
        kind: "optimal",
        time: "O(m × n)",
        space: "O(m × n)",
        runs: true,
        javaCode: `class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        Queue<int[]> q = new LinkedList<>();
        int fresh = 0;
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 2) q.offer(new int[]{r, c});
                if (grid[r][c] == 1) fresh++;
            }
        int minutes = 0;
        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.isEmpty() && fresh > 0) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                int[] cur = q.poll();
                for (int[] d : dirs) {
                    int nr = cur[0] + d[0], nc = cur[1] + d[1];
                    if (nr < 0 || nc < 0 || nr >= m || nc >= n || grid[nr][nc] != 1) continue;
                    grid[nr][nc] = 2;
                    fresh--;
                    q.offer(new int[]{nr, nc});
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}`
      }
    ],
    defaultInput: { grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] },
    dryRunInputs: [
      { grid: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] },
      { grid: [[2, 1, 1], [0, 1, 1], [1, 0, 1]] }
    ],
    generateSteps({ grid }) {
      const steps = [];
      const m = grid.length, n = grid[0].length;
      const g = grid.map((row) => [...row]);
      let queue = [];
      let fresh = 0;
      for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) {
        if (g[r][c] === 2) queue.push([r, c]);
        if (g[r][c] === 1) fresh++;
      }
      const gridPart = (cur) => ({
        t: "dp",
        label: "grid (0 empty, 1 fresh, 2 rotten)",
        rows: g.map((row) => [...row]),
        ...(cur ? { cell: cur } : {}),
        filled: g.flatMap((row, r) => row.map((v, c) => (v === 2 ? [r, c] : null)).filter(Boolean)),
        note: `fresh: ${fresh}`
      });
      steps.push({ line: 5, title: "Seed the queue", action: `${queue.length} rotten source(s), ${fresh} fresh orange(s).`, parts: [
        gridPart(),
        { t: "vars", items: [{ k: "fresh", v: fresh }, { k: "minutes", v: 0 }] }
      ] });
      let minutes = 0;
      let guard = 0;
      while (queue.length && fresh > 0 && guard < 10) {
        guard++;
        const next = [];
        const rotted = [];
        for (const [r, c] of queue) {
          for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const nr = r + dr, nc = c + dc;
            if (nr < 0 || nc < 0 || nr >= m || nc >= n || g[nr][nc] !== 1) continue;
            g[nr][nc] = 2;
            fresh--;
            next.push([nr, nc]);
            rotted.push([nr, nc]);
          }
        }
        queue = next;
        if (rotted.length) minutes++;
        steps.push({ line: 14, title: `Minute ${minutes}`, action: rotted.length ? `Rotted ${rotted.length} orange(s): ${rotted.map(([r, c]) => `(${r},${c})`).join(", ")}. Fresh left: ${fresh}.` : "No new oranges rotted.", parts: [
          gridPart(rotted[0]),
          { t: "vars", items: [{ k: "fresh", v: fresh }, { k: "minutes", v: minutes }] }
        ] });
        if (!rotted.length) break;
      }
      const ans = fresh === 0 ? minutes : -1;
      steps.push({ line: 26, title: "Result", action: fresh === 0 ? `All rotted in ${minutes} minute(s).` : `${fresh} fresh orange(s) unreachable → -1.`, parts: [
        gridPart(),
        { t: "result", label: "Answer", value: ans }
      ] });
      return steps;
    }
  }
];
