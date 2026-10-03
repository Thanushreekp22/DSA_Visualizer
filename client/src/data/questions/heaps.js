export const heapsQuestions = [
  {
    id: "kth-largest-element",
    title: "Kth Largest Element in an Array",
    leetcode: "LeetCode #215",
    difficulty: "Medium",
    problem:
      "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest in sorted order, not the kth distinct element.",
    examples: [
      { input: "nums = [3, 2, 1, 5, 6, 4], k = 2", output: "5", explanation: "Sorted descending: 6, 5 → the 2nd largest is 5." },
      { input: "nums = [3, 2, 3, 1, 2, 4, 5, 5, 6], k = 4", output: "4", explanation: "The 4th largest value is 4." }
    ],
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    approaches: [
      {
        name: "Optimal — Min-Heap of size k",
        kind: "optimal",
        time: "O(n log k)",
        space: "O(k)",
        runs: true,
        javaCode: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }
        return minHeap.peek();
    }
}`
      }
    ],
    defaultInput: { nums: [3, 2, 1, 5, 6, 4], k: 2 },
    dryRunInputs: [
      { nums: [3, 2, 1, 5, 6, 4], k: 2 },
      { nums: [3, 2, 3, 1, 2, 4, 5, 5, 6], k: 4 }
    ],
    generateSteps({ nums, k }) {
      const steps = [];
      let heap = [];

      const heapPart = () => ({
        t: "array",
        label: `min-heap (smallest first, size ≤ ${k})`,
        values: [...heap],
        marks: heap.length === k ? { 0: "hi" } : {}
      });

      steps.push({ line: 3, title: "Initialize", action: `Keep only the ${k} largest values seen so far in a min-heap.`, parts: [
        { t: "array", label: "nums", values: [...nums] },
        heapPart()
      ] });

      for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        heap.push(num);
        heap.sort((a, b) => a - b);
        let evicted = null;
        if (heap.length > k) evicted = heap.shift();
        steps.push({ line: evicted === null ? 5 : 7, title: evicted === null ? `Add ${num}` : `Add ${num}, evict ${evicted}`, action: evicted === null ? `Heap size is ${heap.length} ≤ ${k}, keep it.` : `Heap exceeded ${k}, so the smallest (${evicted}) is removed.`, parts: [
          { t: "array", label: "nums", values: [...nums], marks: { [i]: "cur" }, ptrs: [{ i, label: "num", c: "cur" }] },
          heapPart()
        ] });
      }

      steps.push({ line: 10, title: "Result", action: `The heap holds the ${k} largest; its smallest is the ${k}th largest = ${heap[0]}.`, parts: [
        heapPart(),
        { t: "result", label: "Answer", value: heap[0] }
      ] });
      return steps;
    }
  },
  {
    id: "last-stone-weight",
    title: "Last Stone Weight",
    leetcode: "LeetCode #1046",
    difficulty: "Easy",
    problem:
      "You are given an array of integers stones where stones[i] is the weight of the ith stone. Each turn, pick the two heaviest stones and smash them together. If x == y both are destroyed; if x != y a stone of weight y - x remains. Return the weight of the last remaining stone, or 0 if none remain.",
    examples: [
      { input: "stones = [2, 7, 4, 1, 8, 1]", output: "1", explanation: "Repeated smashing leaves a single stone of weight 1." },
      { input: "stones = [1]", output: "1", explanation: "A single stone is returned directly." }
    ],
    constraints: ["1 <= stones.length <= 30", "1 <= stones[i] <= 1000"],
    approaches: [
      {
        name: "Optimal — Max-Heap",
        kind: "optimal",
        time: "O(n log n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int stone : stones) maxHeap.offer(stone);
        while (maxHeap.size() > 1) {
            int a = maxHeap.poll();
            int b = maxHeap.poll();
            if (a != b) {
                maxHeap.offer(a - b);
            }
        }
        return maxHeap.isEmpty() ? 0 : maxHeap.peek();
    }
}`
      }
    ],
    defaultInput: { stones: [2, 7, 4, 1, 8, 1] },
    dryRunInputs: [
      { stones: [2, 7, 4, 1, 8, 1] },
      { stones: [10, 4, 2, 10] }
    ],
    generateSteps({ stones }) {
      const steps = [];
      let heap = [...stones].sort((a, b) => b - a);

      const heapPart = () => ({
        t: "bars",
        label: "max-heap (largest first)",
        values: [...heap],
        marks: Object.fromEntries(heap.map((_, i) => [i, i === 0 || i === 1 ? "hi" : "cur"]))
      });

      steps.push({ line: 3, title: "Build the max-heap", action: "The two heaviest stones are always at the front.", parts: [
        heapPart(),
        { t: "vars", items: [{ k: "size", v: heap.length }] }
      ] });

      while (heap.length > 1) {
        const a = heap.shift();
        const b = heap.shift();
        const diff = a - b;
        let msg;
        if (a === b) {
          msg = `${a} and ${b} are equal → both destroyed.`;
        } else {
          heap.push(diff);
          heap.sort((x, y) => y - x);
          msg = `${a} and ${b} differ → a stone of weight ${a} - ${b} = ${diff} remains.`;
        }
        steps.push({ line: 8, title: `Smash ${a} and ${b}`, action: msg, parts: [
          heapPart(),
          { t: "vars", items: [{ k: "a", v: a, c: "cur" }, { k: "b", v: b, c: "cur" }, { k: "a - b", v: diff }] }
        ] });
      }

      const ans = heap.length === 0 ? 0 : heap[0];
      steps.push({ line: 12, title: "Result", action: heap.length ? `One stone of weight ${ans} remains.` : "No stones remain.", parts: [
        heapPart(),
        { t: "result", label: "Answer", value: ans }
      ] });
      return steps;
    }
  },
  {
    id: "k-closest-points",
    title: "K Closest Points to Origin",
    leetcode: "LeetCode #973",
    difficulty: "Medium",
    problem:
      "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0). The distance formula is the Euclidean distance, but comparing squared distances is enough.",
    examples: [
      { input: "points = [[1,3],[-2,2],[2,-2]], k = 2", output: "[[-2,2],[2,-2]]", explanation: "Squared distances are 10, 8, 8 → keep the two with distance 8." },
      { input: "points = [[3,3],[5,-1],[-2,4]], k = 2", output: "[[3,3],[-2,4]]", explanation: "Squared distances are 18, 26, 20 → keep 18 and 20." }
    ],
    constraints: ["1 <= k <= points.length <= 10^4", "-10^4 <= xi, yi <= 10^4"],
    approaches: [
      {
        name: "Optimal — Max-Heap of size k",
        kind: "optimal",
        time: "O(n log k)",
        space: "O(k)",
        runs: true,
        javaCode: `import java.util.*;

class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>(
            (a, b) -> Long.compare(distance(b), distance(a))
        );

        for (int[] point : points) {
            maxHeap.offer(point);

            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }

        int[][] result = new int[k][2];

        for (int i = 0; i < k; i++) {
            result[i] = maxHeap.poll();
        }

        return result;
    }

    private long distance(int[] point) {
        return (long) point[0] * point[0]
             + (long) point[1] * point[1];
    }
}`
      }
    ],
    defaultInput: { points: [[1, 3], [-2, 2], [2, -2]], k: 2 },
    dryRunInputs: [
      { points: [[1, 3], [-2, 2], [2, -2]], k: 2 },
      { points: [[3, 3], [5, -1], [-2, 4]], k: 2 }
    ],
    generateSteps({ points, k }) {
      const steps = [];
      const dist = (p) => p[0] * p[0] + p[1] * p[1];
      let heap = [];

      const pointsPart = (curIdx) => ({
        t: "array",
        label: "points (shown as x,y)",
        values: points.map((p) => `(${p[0]},${p[1]})`),
        ...(curIdx != null ? { marks: { [curIdx]: "cur" }, ptrs: [{ i: curIdx, label: "p", c: "cur" }] } : {})
      });
      const heapPart = () => ({
        t: "array",
        label: `max-heap by distance (size ≤ ${k})`,
        values: heap.map((p) => `(${p[0]},${p[1]})d${dist(p)}`),
        marks: heap.length === k ? { 0: "hi" } : {}
      });

      steps.push({ line: 5, title: "Initialize", action: `Keep the ${k} closest points in a max-heap so the farthest is always on top.`, parts: [
        pointsPart(),
        heapPart()
      ] });

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        heap.push(p);
        heap.sort((a, b) => dist(b) - dist(a));
        let evicted = null;
        if (heap.length > k) evicted = heap.shift();
        steps.push({ line: evicted === null ? 10 : 13, title: `Add (${p[0]},${p[1]}) d=${dist(p)}`, action: evicted === null ? `Heap size is ${heap.length} ≤ ${k}, keep it.` : `Heap exceeded ${k}, evict the farthest (${evicted[0]},${evicted[1]}) d=${dist(evicted)}.`, parts: [
          pointsPart(i),
          heapPart()
        ] });
      }

      const res = [...heap].sort((a, b) => dist(a) - dist(b));
      const answer = res.map((p) => `[${p[0]}, ${p[1]}]`).join(", ");
      steps.push({ line: 23, title: "Result", action: `The ${k} closest points are ${answer}.`, parts: [
        heapPart(),
        { t: "result", label: "Answer", value: `[${answer}]` }
      ] });
      return steps;
    }
  },
  {
    id: "task-scheduler",
    title: "Task Scheduler",
    leetcode: "LeetCode #621",
    difficulty: "Medium",
    problem:
      "Given tasks (letters A-Z) and cooldown n, the CPU runs one task per unit and the same task must wait at least n units before running again. Idle time is allowed. Return the minimum total time to finish all tasks.",
    examples: [
      { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: "8", explanation: "Order A B idle A B idle A B takes 8 units." },
      { input: 'tasks = ["A","A","A","B","B","B"], n = 0', output: "6", explanation: "No cooldown, run all 6 back to back." }
    ],
    constraints: ["1 <= tasks.length <= 10^4", "tasks[i] is A-Z", "0 <= n <= 100"],
    approaches: [
      {
        name: "Optimal — Max-Heap + cooldown cycles",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] freq = new int[26];
        for (char t : tasks) freq[t - 'A']++;
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int f : freq) if (f > 0) maxHeap.offer(f);
        int time = 0;
        while (!maxHeap.isEmpty()) {
            List<Integer> wait = new ArrayList<>();
            int used = 0;
            for (int i = 0; i < n + 1 && !maxHeap.isEmpty(); i++) {
                int f = maxHeap.poll() - 1;
                if (f > 0) wait.add(f);
                used++;
                time++;
            }
            for (int f : wait) maxHeap.offer(f);
            if (!maxHeap.isEmpty()) time += (n + 1 - used);
        }
        return time;
    }
}`
      }
    ],
    defaultInput: { tasks: ["A", "A", "A", "B", "B", "B"], n: 2 },
    dryRunInputs: [
      { tasks: ["A", "A", "A", "B", "B", "B"], n: 2 },
      { tasks: ["A", "A", "A", "B", "B", "B"], n: 0 }
    ],
    generateSteps({ tasks, n }) {
      const steps = [];
      const freq = {};
      for (const t of tasks) freq[t] = (freq[t] || 0) + 1;
      let heap = Object.entries(freq).map(([ch, f]) => ({ ch, f })).sort((a, b) => b.f - a.f);
      let time = 0;
      const heapPart = () => ({
        t: "bars",
        label: "max-heap of remaining counts",
        values: heap.map((h) => h.f),
        marks: heap.length ? { 0: "hi" } : {}
      });
      const freqPart = () => ({
        t: "map",
        label: "Remaining",
        entries: heap.map((h) => [h.ch, String(h.f)]),
        hiKey: heap.length ? heap[0].ch : undefined
      });
      steps.push({ line: 3, title: "Count frequencies", action: `Most frequent task sets the frame; cooldown n = ${n}.`, parts: [
        { t: "array", label: "tasks", values: [...tasks] },
        freqPart(),
        { t: "vars", items: [{ k: "n", v: n }, { k: "time", v: 0 }] }
      ] });
      let round = 0;
      while (heap.length && round < 12) {
        round++;
        const cycle = n + 1;
        const run = [];
        const rest = [];
        for (let i = 0; i < cycle && heap.length; i++) {
          heap.sort((a, b) => b.f - a.f);
          const cur = heap.shift();
          run.push(cur.ch);
          time++;
          if (cur.f - 1 > 0) rest.push({ ch: cur.ch, f: cur.f - 1 });
        }
        const used = run.length;
        const idle = (heap.length || rest.length) ? Math.max(0, cycle - used) : 0;
        time += idle;
        heap = [...heap, ...rest].sort((a, b) => b.f - a.f);
        steps.push({ line: 11, title: `Cycle ${round}: run ${run.join(", ") || "-"}`, action: idle > 0 ? `Ran ${used} in window ${cycle}; idle ${idle}. Time = ${time}.` : `Ran ${used}; no idle. Time = ${time}.`, parts: [
          freqPart(),
          heapPart(),
          { t: "vars", items: [{ k: "ran", v: run.join(" ") || "-" }, { k: "idle", v: idle }, { k: "time", v: time }] }
        ] });
        if (!heap.length) break;
      }
      steps.push({ line: 22, title: "Result", action: `All tasks finish in ${time} unit(s).`, parts: [
        { t: "result", label: "Answer", value: time }
      ] });
      return steps;
    }
  },
  {
    id: "merge-k-sorted-lists",
    title: "Merge K Sorted Lists",
    leetcode: "LeetCode #23",
    difficulty: "Hard",
    problem:
      "You are given k sorted linked lists (shown here as sorted arrays). Merge them into one sorted list.",
    examples: [
      { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]", explanation: "Merge all three sorted lists into one." },
      { input: "lists = [[],[1]]", output: "[1]", explanation: "The empty list contributes nothing." }
    ],
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500"],
    approaches: [
      {
        name: "Optimal — Min-Heap of heads",
        kind: "optimal",
        time: "O(N log k)",
        space: "O(k)",
        runs: true,
        javaCode: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode head : lists) {
            if (head != null) minHeap.offer(head);
        }
        ListNode dummy = new ListNode(0), tail = dummy;
        while (!minHeap.isEmpty()) {
            ListNode cur = minHeap.poll();
            tail.next = cur;
            tail = tail.next;
            if (cur.next != null) minHeap.offer(cur.next);
        }
        return dummy.next;
    }
}`
      }
    ],
    defaultInput: { lists: [[1, 4, 5], [1, 3, 4], [2, 6]] },
    dryRunInputs: [
      { lists: [[1, 4, 5], [1, 3, 4], [2, 6]] },
      { lists: [[], [1]] }
    ],
    generateSteps({ lists }) {
      const steps = [];
      const idx = lists.map(() => 0);
      const merged = [];
      let heap = [];
      lists.forEach((arr, li) => {
        if (arr.length) heap.push({ v: arr[0], li });
      });
      heap.sort((a, b) => a.v - b.v);
      const listsParts = (hiLi = -1, hiIdx = -1) => lists.map((arr, li) => ({
        t: "array",
        label: `list ${li}`,
        values: arr.length ? [...arr] : ["(empty)"],
        marks: arr.length && li === hiLi && hiIdx >= 0 ? { [hiIdx]: "cur" } : {},
        ptrs: arr.length && idx[li] < arr.length ? [{ i: idx[li], label: li === hiLi ? "pop" : "head", c: li === hiLi ? "cur" : "hi" }] : []
      }));
      const heapPart = () => ({
        t: "array",
        label: "min-heap of heads",
        values: heap.length ? heap.map((h) => `${h.v}(L${h.li})`) : ["(empty)"],
        marks: heap.length ? { 0: "hi" } : {}
      });
      steps.push({ line: 3, title: "Push all heads", action: "Push the first element of each non-empty list into the min-heap.", parts: [
        ...listsParts(),
        heapPart()
      ] });
      let guard = 0;
      while (heap.length && guard < 40) {
        guard++;
        heap.sort((a, b) => a.v - b.v);
        const cur = heap.shift();
        merged.push(cur.v);
        const li = cur.li;
        const usedIdx = idx[li];
        idx[li]++;
        if (idx[li] < lists[li].length) {
          heap.push({ v: lists[li][idx[li]], li });
          heap.sort((a, b) => a.v - b.v);
        }
        steps.push({ line: 9, title: `Pop ${cur.v} from list ${li}`, action: idx[li] < lists[li].length ? `Append ${cur.v}; push next ${lists[li][idx[li]]} from list ${li}.` : `Append ${cur.v}; list ${li} exhausted.`, parts: [
          ...listsParts(li, usedIdx),
          heapPart(),
          { t: "array", label: "merged", values: [...merged], marks: { [merged.length - 1]: "hi" } }
        ] });
      }
      steps.push({ line: 15, title: "Result", action: `Merged into one sorted list of length ${merged.length}.`, parts: [
        { t: "array", label: "merged", values: merged.length ? [...merged] : ["(empty)"], marks: merged.length ? Object.fromEntries(merged.map((_, i) => [i, "hi"])) : {} },
        { t: "result", label: "Answer", value: `[${merged.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "k-weakest-rows",
    title: "The K Weakest Rows in a Matrix",
    leetcode: "LeetCode #1337",
    difficulty: "Easy",
    problem:
      "You are given an m x n binary matrix mat of 1s (soldiers) and 0s (civilians). Soldiers are always to the left of civilians in each row. A row i is weaker than row j if it has fewer soldiers, breaking ties by the smaller index. Return the indices of the k weakest rows.",
    examples: [
      { input: 'mat = [[1,1,0,0,0],[1,1,1,1,0],[1,0,0,0,0],[1,1,0,0,0],[1,1,1,1,1]], k = 3', output: "[2,0,3]", explanation: "Soldier counts are [2,4,1,2,5]; the 3 weakest rows are 2 (1 soldier), then 0 and 3 (2 soldiers each, index order)." },
      { input: "mat = [[1,0],[1,0],[1,0],[1,1]], k = 2", output: "[0,1]", explanation: "Counts are [1,1,1,2]; rows 0 and 1 win the tie by smaller index." }
    ],
    constraints: ["m == mat.length", "n == mat[i].length", "2 <= m, n <= 100", "1 <= k <= m", "mat[i][j] is 0 or 1"],
    approaches: [
      {
        name: "Optimal — Min-Heap by (soldiers, index)",
        kind: "optimal",
        time: "O(m × n + m log m + k log m)",
        space: "O(m)",
        runs: true,
        javaCode: `import java.util.*;

class Solution {
    public int[] kWeakestRows(int[][] mat, int k) {
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(
            (a, b) -> {
                if (a[0] != b[0]) {
                    return Integer.compare(a[0], b[0]);
                }
                return Integer.compare(a[1], b[1]);
            }
        );

        for (int i = 0; i < mat.length; i++) {
            int soldiers = 0;

            for (int value : mat[i]) {
                soldiers += value;
            }

            minHeap.offer(new int[]{soldiers, i});
        }

        int[] result = new int[k];

        for (int i = 0; i < k; i++) {
            result[i] = minHeap.poll()[1];
        }

        return result;
    }
}`
      }
    ],
    defaultInput: { mat: [[1, 1, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 1, 0, 0, 0], [1, 1, 1, 1, 1]], k: 3 },
    dryRunInputs: [
      { mat: [[1, 1, 0, 0, 0], [1, 1, 1, 1, 0], [1, 0, 0, 0, 0], [1, 1, 0, 0, 0], [1, 1, 1, 1, 1]], k: 3 },
      { mat: [[1, 0], [1, 0], [1, 0], [1, 1]], k: 2 }
    ],
    generateSteps({ mat, k }) {
      const steps = [];
      const counts = mat.map((row) => row.reduce((a, b) => a + b, 0));
      let heap = counts.map((s, i) => ({ s, i }));
      heap.sort((a, b) => (a.s !== b.s ? a.s - b.s : a.i - b.i));
      const heapPart = (top = 0) => ({
        t: "array",
        label: "min-heap (soldiers,row)",
        values: heap.length ? heap.map((h) => `(${h.s},${h.i})`) : ["(empty)"],
        marks: heap.length ? { [top]: "hi" } : {}
      });
      const matPart = (cur = -1) => ({
        t: "dp",
        label: "mat (row: soldiers)",
        rows: mat.map((row, r) => [...row]),
        ...(cur >= 0 ? { cell: [cur, 0] } : {}),
        note: `counts: [${counts.map((s, r) => `r${r}:${s}`).join(", ")}]`
      });
      steps.push({ line: 14, title: "Initialize", action: "The heap orders rows by (soldiers, index): fewer soldiers first, ties by smaller row.", parts: [
        matPart(),
        { t: "vars", items: [{ k: "k", v: k }] }
      ] });
      for (let i = 0; i < mat.length; i++) {
        steps.push({ line: 23, title: `Count row ${i}`, action: `Row ${i} has ${counts[i]} soldier(s) → push (${counts[i]},${i}) into the heap.`, parts: [
          matPart(i),
          heapPart(),
          { t: "vars", items: [{ k: "soldiers", v: counts[i] }, { k: "row", v: i }] }
        ] });
      }
      const result = [];
      for (let t = 0; t < k; t++) {
        heap.sort((a, b) => (a.s !== b.s ? a.s - b.s : a.i - b.i));
        const cur = heap.shift();
        result.push(cur.i);
        steps.push({ line: 30, title: `Pick #${t + 1}: row ${cur.i}`, action: `Pop (${cur.s},${cur.i}) — the weakest remaining row. Result so far: [${result.join(", ")}].`, parts: [
          heapPart(),
          { t: "array", label: "result", values: [...result], marks: { [result.length - 1]: "hi" } }
        ] });
      }
      steps.push({ line: 33, title: "Result", action: `The ${k} weakest rows are [${result.join(", ")}].`, parts: [
        { t: "array", label: "result", values: [...result], marks: Object.fromEntries(result.map((_, i) => [i, "hi"])) },
        { t: "result", label: "Answer", value: `[${result.join(", ")}]` }
      ] });
      return steps;
    }
  }
];

