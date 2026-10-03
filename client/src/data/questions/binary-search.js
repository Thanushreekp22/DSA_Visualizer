export const binarySearchQuestions = [
  {
    id: "binary-search",
    title: "Binary Search",
    leetcode: "LeetCode #704",
    difficulty: "Easy",
    problem:
      "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, return its index, otherwise return -1.",
    examples: [
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 9", output: "4", explanation: "9 is at index 4." },
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 2", output: "-1", explanation: "2 is not in the array." }
    ],
    constraints: ["1 <= nums.length <= 10^4", "nums is sorted in ascending order", "All values are unique."],
    approaches: [
      {
        name: "Optimal — Halve the Search Space",
        kind: "optimal",
        time: "O(log n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int search(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}`
      }
    ],
    defaultInput: { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
    dryRunInputs: [
      { nums: [-1, 0, 3, 5, 9, 12], target: 9 },
      { nums: [-1, 0, 3, 5, 9, 12], target: 2 }
    ],
    generateSteps({ nums, target }) {
      const steps = [];
      let lo = 0;
      let hi = nums.length - 1;
      let found = -1;

      const ptrs = (mid) => {
        const p = [{ i: lo, label: "lo", c: "l" }, { i: hi, label: "hi", c: "r" }];
        if (mid !== undefined && mid !== null && mid >= 0 && mid < nums.length) p.push({ i: mid, label: "mid", c: "cur" });
        return p;
      };

      steps.push({ line: 3, title: "Set bounds", action: `Search the whole array: [${lo}, ${hi}].`, parts: [
        { t: "array", label: "nums", values: [...nums], window: [lo, hi], ptrs: ptrs() }
      ] });

      while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        steps.push({ line: 5, title: `mid = ${mid}`, action: `mid = ${lo} + (${hi} − ${lo}) ÷ 2 = ${mid}, value ${nums[mid]}.`, parts: [
          { t: "array", label: "nums", values: [...nums], window: [lo, hi], marks: { [mid]: "cur" }, ptrs: ptrs(mid) },
          { t: "vars", items: [{ k: "nums[mid]", v: nums[mid], c: "cur" }, { k: "target", v: target }] }
        ] });

        if (nums[mid] === target) {
          found = mid;
          steps.push({ line: 6, title: "Found", action: `nums[${mid}] = ${target}, return ${mid}.`, parts: [
            { t: "array", label: "nums", values: [...nums], marks: { [mid]: "ok" }, ptrs: ptrs(mid) },
            { t: "result", label: "Answer", value: mid }
          ] });
          break;
        } else if (nums[mid] < target) {
          lo = mid + 1;
          steps.push({ line: 7, title: "Go right", action: `${nums[mid]} < ${target}, so lo = ${lo}.`, parts: [
            { t: "array", label: "nums", values: [...nums], marks: { [mid]: "bad" }, window: [lo, hi], ptrs: ptrs() }
          ] });
        } else {
          hi = mid - 1;
          steps.push({ line: 8, title: "Go left", action: `${nums[mid]} > ${target}, so hi = ${hi}.`, parts: [
            { t: "array", label: "nums", values: [...nums], marks: { [mid]: "bad" }, window: [lo, hi], ptrs: ptrs() }
          ] });
        }
      }

      if (found === -1) {
        steps.push({ line: 10, title: "Result", action: `lo (${lo}) passed hi (${hi}), so ${target} is not present.`, parts: [
          { t: "result", label: "Answer", value: -1 }
        ] });
      }
      return steps;
    }
  },
  {
    id: "first-bad-version",
    title: "First Bad Version",
    leetcode: "LeetCode #278",
    difficulty: "Easy",
    problem:
      "You are a product manager leading a team. Unfortunately, the latest version of your product fails the quality check. All versions after a bad version are also bad. Given n versions [1, 2, ..., n] and an API isBadVersion(version), find the first bad version, minimizing the number of calls.",
    examples: [
      { input: "n = 5, bad = 4", output: "4", explanation: "Versions 4 and 5 are bad; the first bad version is 4." },
      { input: "n = 1, bad = 1", output: "1", explanation: "The only version is bad." }
    ],
    constraints: ["1 <= bad <= n <= 2^31 - 1"],
    approaches: [
      {
        name: "Optimal — Binary Search on the Boundary",
        kind: "optimal",
        time: "O(log n)",
        space: "O(1)",
        runs: true,
        javaCode: `public class Solution extends VersionControl {
    public int firstBadVersion(int n) {
        int lo = 1, hi = n;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (isBadVersion(mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
}`
      }
    ],
    defaultInput: { n: 5, bad: 4 },
    dryRunInputs: [
      { n: 5, bad: 4 },
      { n: 8, bad: 6 }
    ],
    generateSteps({ n, bad }) {
      const steps = [];
      const versions = Array.from({ length: n }, (_, i) => i + 1);
      let lo = 1;
      let hi = n;

      const marks = () => {
        const m = {};
        for (let i = 0; i < n; i++) m[i] = versions[i] >= bad ? "bad" : "ok";
        return m;
      };
      const ptrs = () => [
        { i: lo - 1, label: "lo", c: "l" },
        { i: hi - 1, label: "hi", c: "r" }
      ];

      steps.push({ line: 3, title: "Set bounds", action: `Search versions [1, ${n}]. Green = good, red = bad.`, parts: [
        { t: "array", label: "versions", values: versions, marks: marks(), window: [lo - 1, hi - 1], ptrs: ptrs() }
      ] });

      while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const isBad = mid >= bad;
        steps.push({ line: 6, title: `isBadVersion(${mid}) = ${isBad}`, action: isBad ? `Version ${mid} is bad, so the answer is at or before ${mid}.` : `Version ${mid} is good, so the answer is after ${mid}.`, parts: [
          { t: "array", label: "versions", values: versions, marks: { ...marks(), [mid - 1]: "cur" }, window: [lo - 1, hi - 1], ptrs: [...ptrs(), { i: mid - 1, label: "mid", c: "cur" }] }
        ] });

        if (isBad) {
          hi = mid;
          steps.push({ line: 7, title: `hi = ${hi}`, action: `Keep the left half, hi moves to ${hi}.`, parts: [
            { t: "array", label: "versions", values: versions, marks: marks(), window: [lo - 1, hi - 1], ptrs: ptrs() }
          ] });
        } else {
          lo = mid + 1;
          steps.push({ line: 9, title: `lo = ${lo}`, action: `Discard the left half, lo moves to ${lo}.`, parts: [
            { t: "array", label: "versions", values: versions, marks: marks(), window: [lo - 1, hi - 1], ptrs: ptrs() }
          ] });
        }
      }

      steps.push({ line: 12, title: "Result", action: `lo == hi == ${lo}, the first bad version.`, parts: [
        { t: "array", label: "versions", values: versions, marks: { ...marks(), [lo - 1]: "cur" }, ptrs: [{ i: lo - 1, label: "first bad", c: "cur" }] },
        { t: "result", label: "Answer", value: lo }
      ] });
      return steps;
    }
  },
  {
    id: "find-peak-element",
    title: "Find Peak Element",
    leetcode: "LeetCode #162",
    difficulty: "Medium",
    problem:
      "A peak element is an element that is strictly greater than its neighbors. Given a 0-indexed integer array nums, find a peak element and return its index. You may imagine nums[-1] = nums[n] = -∞. The algorithm must run in O(log n) time.",
    examples: [
      { input: "nums = [1, 2, 3, 1]", output: "2", explanation: "3 is greater than both of its neighbors." },
      { input: "nums = [1, 2, 1, 3, 5, 6, 4]", output: "5", explanation: "6 is a peak; index 5 works." }
    ],
    constraints: ["1 <= nums.length <= 1000", "-2^31 <= nums[i] <= 2^31 - 1", "nums[i] != nums[i + 1] for all valid i."],
    approaches: [
      {
        name: "Optimal — Binary Search on the Slope",
        kind: "optimal",
        time: "O(log n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int findPeakElement(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[mid + 1]) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }
}`
      }
    ],
    defaultInput: { nums: [1, 2, 3, 1] },
    dryRunInputs: [
      { nums: [1, 2, 3, 1] },
      { nums: [1, 2, 1, 3, 5, 6, 4] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      let lo = 0;
      let hi = nums.length - 1;

      const ptrs = (mid) => {
        const p = [{ i: lo, label: "lo", c: "l" }, { i: hi, label: "hi", c: "r" }];
        if (mid != null) p.push({ i: mid, label: "mid", c: "cur" });
        return p;
      };

      steps.push({ line: 3, title: "Set bounds", action: "Treat the ends as -∞, so a peak is guaranteed.", parts: [
        { t: "array", label: "nums", values: [...nums], window: [lo, hi], ptrs: ptrs() }
      ] });

      while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const rising = nums[mid] < nums[mid + 1];
        steps.push({ line: 6, title: `nums[${mid}]=${nums[mid]} vs nums[${mid + 1}]=${nums[mid + 1]}`, action: rising ? "Going uphill, so a peak lies to the right." : "Going downhill, so a peak lies at or left of mid.", parts: [
          { t: "array", label: "nums", values: [...nums], window: [lo, hi], marks: { [mid]: "cur", [mid + 1]: rising ? "ok" : "bad" }, ptrs: ptrs(mid) }
        ] });

        if (!rising) {
          hi = mid;
          steps.push({ line: 7, title: `hi = ${hi}`, action: `nums[${mid}] > nums[${mid + 1}], search the left half.`, parts: [
            { t: "array", label: "nums", values: [...nums], window: [lo, hi], ptrs: ptrs() }
          ] });
        } else {
          lo = mid + 1;
          steps.push({ line: 9, title: `lo = ${lo}`, action: `nums[${mid}] < nums[${mid + 1}], search the right half.`, parts: [
            { t: "array", label: "nums", values: [...nums], marks: { [mid]: "bad" }, window: [lo, hi], ptrs: ptrs() }
          ] });
        }
      }

      steps.push({ line: 12, title: "Result", action: `lo == hi == ${lo}; nums[${lo}] = ${nums[lo]} is a peak.`, parts: [
        { t: "array", label: "nums", values: [...nums], marks: { [lo]: "ok" }, ptrs: [{ i: lo, label: "peak", c: "cur" }] },
        { t: "result", label: "Answer", value: lo }
      ] });
      return steps;
    }
  },
  {
    id: "find-min-rotated-sorted",
    title: "Find Minimum in Rotated Sorted Array",
    leetcode: "LeetCode #153",
    difficulty: "Medium",
    problem:
      "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the sorted rotated array nums of unique elements, return the minimum element of this array. Your algorithm must run in O(log n) time.",
    examples: [
      { input: "nums = [3, 4, 5, 1, 2]", output: "1", explanation: "The original array was [1,2,3,4,5], rotated 3 times." },
      { input: "nums = [4, 5, 6, 7, 0, 1, 2]", output: "0", explanation: "The minimum element is 0." }
    ],
    constraints: ["n == nums.length", "1 <= n <= 5000", "All values are unique", "nums is a rotated sorted array."],
    approaches: [
      {
        name: "Optimal — Compare mid with hi",
        kind: "optimal",
        time: "O(log n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int findMin(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return nums[lo];
    }
}`
      }
    ],
    defaultInput: { nums: [3, 4, 5, 1, 2] },
    dryRunInputs: [
      { nums: [3, 4, 5, 1, 2] },
      { nums: [4, 5, 6, 7, 0, 1, 2] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      let lo = 0;
      let hi = nums.length - 1;

      const ptrs = (mid) => {
        const p = [{ i: lo, label: "lo", c: "l" }, { i: hi, label: "hi", c: "r" }];
        if (mid != null) p.push({ i: mid, label: "mid", c: "cur" });
        return p;
      };

      steps.push({ line: 3, title: "Set bounds", action: "The minimum hides on the side that is out of order.", parts: [
        { t: "array", label: "nums", values: [...nums], window: [lo, hi], ptrs: ptrs() }
      ] });

      while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const goRight = nums[mid] > nums[hi];
        steps.push({ line: 6, title: `nums[mid]=${nums[mid]} vs nums[hi]=${nums[hi]}`, action: goRight ? `mid element > last element, so the minimum is to the right.` : `mid element <= last element, so the minimum is at mid or to the left.`, parts: [
          { t: "array", label: "nums", values: [...nums], window: [lo, hi], marks: { [mid]: "cur", [hi]: goRight ? "ok" : "bad" }, ptrs: ptrs(mid) }
        ] });

        if (goRight) {
          lo = mid + 1;
          steps.push({ line: 7, title: `lo = ${lo}`, action: `Discard [${lo - 1}...] left of the new lo.`, parts: [
            { t: "array", label: "nums", values: [...nums], marks: { [mid]: "bad" }, window: [lo, hi], ptrs: ptrs() }
          ] });
        } else {
          hi = mid;
          steps.push({ line: 9, title: `hi = ${hi}`, action: `Keep the left part including mid.`, parts: [
            { t: "array", label: "nums", values: [...nums], window: [lo, hi], ptrs: ptrs() }
          ] });
        }
      }

      steps.push({ line: 12, title: "Result", action: `lo == hi == ${lo}, and nums[${lo}] = ${nums[lo]} is the minimum.`, parts: [
        { t: "array", label: "nums", values: [...nums], marks: { [lo]: "ok" }, ptrs: [{ i: lo, label: "min", c: "cur" }] },
        { t: "result", label: "Answer", value: nums[lo] }
      ] });
      return steps;
    }
  },
  {
    id: "search-2d-matrix",
    title: "Search a 2D Matrix",
    leetcode: "LeetCode #74",
    difficulty: "Medium",
    problem:
      "You are given an m x n integer matrix with the following properties: each row is sorted in non-decreasing order, and the first integer of each row is greater than the last integer of the previous row. Given an integer target, return true if target is in the matrix, else false.",
    examples: [
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true", explanation: "3 is present at row 0, column 1." },
      { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", output: "false", explanation: "13 is not in the matrix." }
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 100", "-10^4 <= matrix[i][j], target <= 10^4"],
    approaches: [
      {
        name: "Optimal — Binary Search on Flattened Index",
        kind: "optimal",
        time: "O(log(m · n))",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int rows = matrix.length, cols = matrix[0].length;
        int lo = 0, hi = rows * cols - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int val = matrix[mid / cols][mid % cols];
            if (val == target) return true;
            else if (val < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;
    }
}`
      }
    ],
    defaultInput: { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 3 },
    dryRunInputs: [
      { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 3 },
      { matrix: [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], target: 13 }
    ],
    generateSteps({ matrix, target }) {
      const steps = [];
      const rows = matrix.length;
      const cols = matrix[0].length;
      const total = rows * cols;
      let lo = 0;
      let hi = total - 1;
      let found = false;

      const grid = (cellR, cellC, extra) => ({
        t: "dp",
        label: "matrix (flattened index order)",
        rows: matrix.map((r) => [...r]),
        cell: cellR == null ? undefined : [cellR, cellC],
        ...extra
      });

      steps.push({ line: 4, title: "Flatten the search", action: `Treat the matrix as a sorted array of ${total} cells (index = row * ${cols} + col).`, parts: [
        grid(),
        { t: "vars", items: [{ k: "lo", v: lo }, { k: "hi", v: hi }, { k: "target", v: target }] }
      ] });

      while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const r = Math.floor(mid / cols);
        const c = mid % cols;
        const val = matrix[r][c];
        steps.push({ line: 7, title: `mid = ${mid} → (${r}, ${c}) = ${val}`, action: `row = ${mid} ÷ ${cols} = ${r}, col = ${mid} % ${cols} = ${c}.`, parts: [
          grid(r, c, { note: `mid = ${mid}` }),
          { t: "vars", items: [{ k: "lo", v: lo }, { k: "mid", v: mid, c: "hi" }, { k: "hi", v: hi }] }
        ] });

        if (val === target) {
          found = true;
          steps.push({ line: 8, title: "Found", action: `matrix[${r}][${c}] = ${target}, return true.`, parts: [
            grid(r, c),
            { t: "result", label: "Answer", value: "true" }
          ] });
          break;
        } else if (val < target) {
          lo = mid + 1;
          steps.push({ line: 9, title: "Go right", action: `${val} < ${target}, so lo = ${lo}.`, parts: [
            grid(r, c),
            { t: "vars", items: [{ k: "lo", v: lo, c: "hi" }, { k: "hi", v: hi }] }
          ] });
        } else {
          hi = mid - 1;
          steps.push({ line: 10, title: "Go left", action: `${val} > ${target}, so hi = ${hi}.`, parts: [
            grid(r, c),
            { t: "vars", items: [{ k: "lo", v: lo }, { k: "hi", v: hi, c: "hi" }] }
          ] });
        }
      }

      if (!found) {
        steps.push({ line: 12, title: "Result", action: `${target} is not in the matrix, return false.`, parts: [
          grid(),
          { t: "result", label: "Answer", value: "false" }
        ] });
      }
      return steps;
    }
  },
  {
    id: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    leetcode: "LeetCode #875",
    difficulty: "Medium",
    problem:
      "Koko loves bananas. There are n piles of bananas with piles[i] bananas. The guards leave and return in h hours. Koko can decide her bananas-per-hour eating speed k. Each hour she picks a pile and eats k bananas from it; if the pile has fewer than k, she still spends the whole hour. Return the minimum integer k such that she can eat all the bananas within h hours.",
    examples: [
      { input: "piles = [3, 6, 7, 11], h = 8", output: "4", explanation: "At speed 4 she finishes in 8 hours; speed 3 needs 10." },
      { input: "piles = [30, 11, 23, 4, 20], h = 6", output: "23", explanation: "At speed 23 she finishes in exactly 6 hours." }
    ],
    constraints: ["1 <= piles.length <= 10^4", "piles.length <= h <= 10^9", "1 <= piles[i] <= 10^9"],
    approaches: [
      {
        name: "Optimal — Binary Search on the Speed",
        kind: "optimal",
        time: "O(n log max(piles))",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int lo = 1, hi = 0;
        for (int p : piles) hi = Math.max(hi, p);
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (canFinish(piles, mid, h)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private boolean canFinish(int[] piles, int speed, int h) {
        int hours = 0;
        for (int p : piles) {
            hours += (p + speed - 1) / speed;
        }
        return hours <= h;
    }
}`
      }
    ],
    defaultInput: { piles: [3, 6, 7, 11], h: 8 },
    dryRunInputs: [
      { piles: [3, 6, 7, 11], h: 8 },
      { piles: [30, 11, 23, 4, 20], h: 6 }
    ],
    generateSteps({ piles, h }) {
      const steps = [];
      let lo = 1;
      let hi = Math.max(...piles);
      let best = null;

      const hoursList = (speed) => piles.map((p) => Math.ceil(p / speed));

      steps.push({ line: 4, title: "Search range for speed", action: `Minimum speed 1, maximum needed ${hi} (the largest pile).`, parts: [
        { t: "bars", label: "piles", values: [...piles], ptrs: piles.map((p, i) => ({ i, label: String(p), c: "cur" })) },
        { t: "vars", items: [{ k: "lo", v: lo }, { k: "hi", v: hi }, { k: "h", v: h }] }
      ] });

      while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const hoursListNow = hoursList(mid);
        const hours = hoursListNow.reduce((a, b) => a + b, 0);
        const ok = hours <= h;
        steps.push({ line: 6, title: `speed = ${mid} → ${hours} hours`, action: ok ? `${hours} ≤ ${h}, so speed ${mid} works; try lower.` : `${hours} > ${h}, so speed ${mid} is too slow; try higher.`, parts: [
          { t: "bars", label: `hours per pile at speed ${mid}`, values: hoursListNow, ptrs: piles.map((p, i) => ({ i, label: `⌈${p}/${mid}⌉`, c: "cur" })) },
          { t: "array", label: "piles", values: [...piles], marks: Object.fromEntries(hoursListNow.map((_, i) => [i, ok ? "ok" : "bad"])) },
          { t: "vars", items: [{ k: "lo", v: lo }, { k: "mid", v: mid, c: "hi" }, { k: "hi", v: hi }, { k: "hours", v: hours }] }
        ] });

        if (ok) {
          best = mid;
          hi = mid;
          steps.push({ line: 8, title: `hi = ${hi}`, action: `Speed ${mid} finishes in time, so keep searching left.`, parts: [
            { t: "vars", items: [{ k: "lo", v: lo }, { k: "hi", v: hi, c: "hi" }, { k: "best", v: best }] }
          ] });
        } else {
          lo = mid + 1;
          steps.push({ line: 10, title: `lo = ${lo}`, action: `Speed ${mid} is too slow, so lo = ${lo}.`, parts: [
            { t: "vars", items: [{ k: "lo", v: lo, c: "hi" }, { k: "hi", v: hi }] }
          ] });
        }
      }

      if (best === null || lo < best) best = lo;
      steps.push({ line: 13, title: "Result", action: `The minimum working speed is ${best}.`, parts: [
        { t: "bars", label: `hours per pile at speed ${best}`, values: hoursList(best), ptrs: piles.map((p, i) => ({ i, label: `⌈${p}/${best}⌉`, c: "ok" })) },
        { t: "result", label: "Answer", value: best }
      ] });
      return steps;
    }
  },
  {
    id: "find-first-last-position",
    title: "Find First and Last Position of Element in Sorted Array",
    leetcode: "LeetCode #34",
    difficulty: "Medium",
    problem:
      "Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value. If target is not found return [-1, -1]. Your algorithm must run in O(log n) time.",
    examples: [
      { input: "nums = [5, 7, 7, 8, 8, 10], target = 8", output: "[3, 4]", explanation: "8 appears from index 3 through 4." },
      { input: "nums = [5, 7, 7, 8, 8, 10], target = 6", output: "[-1, -1]", explanation: "6 is not in the array." }
    ],
    constraints: ["0 <= nums.length <= 10^5", "nums is sorted in non-decreasing order", "-10^9 <= nums[i], target <= 10^9"],
    approaches: [
      {
        name: "Optimal — Two Lower Bounds",
        kind: "optimal",
        time: "O(log n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int[] searchRange(int[] nums, int target) {
        int first = lowerBound(nums, target);
        if (first == nums.length || nums[first] != target) return new int[] { -1, -1 };
        int last = lowerBound(nums, target + 1) - 1;
        return new int[] { first, last };
    }

    private int lowerBound(int[] nums, int target) {
        int lo = 0, hi = nums.length;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }
}`
      }
    ],
    defaultInput: { nums: [5, 7, 7, 8, 8, 10], target: 8 },
    dryRunInputs: [
      { nums: [5, 7, 7, 8, 8, 10], target: 8 },
      { nums: [5, 7, 7, 8, 8, 10], target: 6 }
    ],
    generateSteps({ nums, target }) {
      const steps = [];
      const n = nums.length;

      const lowerBound = (value, label) => {
        let lo = 0;
        let hi = n;
        const ptrs = (mid) => {
          const p = [{ i: lo, label: "lo", c: "l" }];
          if (hi <= n - 1) p.push({ i: hi, label: "hi", c: "r" });
          if (mid != null) p.push({ i: mid, label: "mid", c: "cur" });
          return p;
        };

        steps.push({ line: 10, title: `${label}: lo = 0, hi = ${hi}`, action: `Find the leftmost index where a value ≥ ${value} could sit.`, parts: [
          { t: "array", label: "nums", values: [...nums], window: [0, Math.min(hi, n - 1)], ptrs: ptrs() }
        ] });

        while (lo < hi) {
          const mid = lo + Math.floor((hi - lo) / 2);
          steps.push({ line: 13, title: `${label}: mid = ${mid}`, action: `nums[${mid}] = ${nums[mid]} ${nums[mid] < value ? "<" : "≥"} ${value}.`, parts: [
            { t: "array", label: "nums", values: [...nums], window: [lo, Math.min(hi, n - 1)], marks: { [mid]: "cur" }, ptrs: ptrs(mid) },
            { t: "vars", items: [{ k: "lo", v: lo }, { k: "hi", v: hi }, { k: "target", v: value }] }
          ] });
          if (nums[mid] < value) lo = mid + 1;
          else hi = mid;
        }
        steps.push({ line: 16, title: `${label}: return ${lo}`, action: `Lower bound of ${value} is index ${lo}.`, parts: [
          { t: "array", label: "nums", values: [...nums], marks: lo < n ? { [lo]: "ok" } : {}, ptrs: lo < n ? [{ i: lo, label: "lb", c: "cur" }] : [] },
          { t: "vars", items: [{ k: "lowerBound", v: lo, c: "hi" }] }
        ] });
        return lo;
      };

      const first = lowerBound(target, "first");
      if (first === n || nums[first] !== target) {
        steps.push({ line: 4, title: "Not found", action: `nums[${first}] ${first === n ? "is out of range" : `= ${nums[first]} ≠ ${target}`}, return [-1, -1].`, parts: [
          { t: "result", label: "Answer", value: "[-1, -1]" }
        ] });
        return steps;
      }

      const last = lowerBound(target + 1, "last") - 1;
      steps.push({ line: 6, title: "Result", action: `Target ${target} spans indices [${first}, ${last}].`, parts: [
        { t: "array", label: "nums", values: [...nums], marks: Object.fromEntries(Array.from({ length: last - first + 1 }, (_, k) => [first + k, "ok"])) },
        { t: "result", label: "Answer", value: `[${first}, ${last}]` }
      ] });
      return steps;
    }
  }
];

