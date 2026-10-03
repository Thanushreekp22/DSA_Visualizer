export const twoPointersQuestions = [
  {
    id: "move-zeroes",
    title: "Move Zeroes",
    leetcode: "LeetCode #283",
    difficulty: "Easy",
    problem:
      "Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements. Do this in place without making a copy of the array.",
    examples: [
      { input: "nums = [0, 1, 0, 3, 12]", output: "[1, 3, 12, 0, 0]", explanation: "Non-zeroes are shifted left, zeros pushed right." },
      { input: "nums = [0]", output: "[0]", explanation: "A single zero stays put." }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-2^31 <= nums[i] <= 2^31 - 1"],
    approaches: [
      {
        name: "Optimal — Two Pointers",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public void moveZeroes(int[] nums) {
        int write = 0;
        for (int read = 0; read < nums.length; read++) {
            if (nums[read] != 0) {
                nums[write] = nums[read];
                write++;
            }
        }
        while (write < nums.length) nums[write++] = 0;
    }
}`
      }
    ],
    defaultInput: { nums: [0, 1, 0, 3, 12] },
    dryRunInputs: [
      { nums: [0, 1, 0, 3, 12] },
      { nums: [0] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const view = [...nums];
      let write = 0;
      const ptrs = (read) => [
        { i: Math.min(write, view.length - 1), label: "write", c: "l" },
        ...(read !== undefined ? [{ i: read, label: "read", c: "r" }] : [])
      ];

      steps.push({ line: 3, title: "Initialize", action: "write = 0 is the next slot for a non-zero.", parts: [{ t: "array", label: "nums", values: view, ptrs: ptrs() }] });

      for (let read = 0; read < nums.length; read++) {
        const nonZero = nums[read] !== 0;
        steps.push({ line: 5, title: `read = ${read} → ${nums[read]}`, action: nonZero ? `${nums[read]} is non-zero, keep it.` : `${nums[read]} is zero, skip it.`, parts: [
          { t: "array", label: "nums", values: view, marks: { [read]: nonZero ? "ok" : "bad" }, ptrs: ptrs(read) },
          { t: "vars", items: [{ k: "write", v: write }] }
        ] });
        if (nonZero) {
          view[write] = nums[read];
          steps.push({ line: 6, title: "Copy forward", action: `Copy ${nums[read]} to index ${write}.`, parts: [
            { t: "array", label: "nums", values: view, marks: { [write]: "ok", [read]: "cur" }, ptrs: ptrs(read) }
          ] });
          write++;
          steps.push({ line: 7, title: "Advance write", action: `write → ${write}`, parts: [
            { t: "array", label: "nums", values: view, ptrs: ptrs(read) },
            { t: "vars", items: [{ k: "write", v: write, c: "hi" }] }
          ] });
        }
      }

      while (write < view.length) {
        view[write] = 0;
        steps.push({ line: 10, title: "Fill trailing zeroes", action: `Set index ${write} to 0.`, parts: [
          { t: "array", label: "nums", values: view, marks: { [write]: "bad" }, ptrs: [{ i: write, label: "write", c: "l" }] }
        ] });
        write++;
      }

      steps.push({ line: 11, title: "Result", action: `nums = [${view.join(", ")}]`, parts: [
        { t: "array", label: "nums", values: view, marks: Object.fromEntries(view.map((v, i) => [i, v === 0 ? "bad" : "ok"])) },
        { t: "result", label: "Answer", value: `[${view.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "sort-colors",
    title: "Sort Colors",
    leetcode: "LeetCode #75",
    difficulty: "Medium",
    problem:
      "Given an array nums with n objects colored red, white, or blue (represented by 0, 1, and 2), sort them in place so that objects of the same color are adjacent, with the colors in the order red, white, and blue. Do this without using a library sort.",
    examples: [
      { input: "nums = [2, 0, 2, 1, 1, 0]", output: "[0, 0, 1, 1, 2, 2]", explanation: "Dutch national flag three-way partition." },
      { input: "nums = [2, 0, 1]", output: "[0, 1, 2]", explanation: "A simple three-element sort." }
    ],
    constraints: ["n == nums.length", "1 <= n <= 300", "nums[i] is 0, 1, or 2"],
    approaches: [
      {
        name: "Optimal — Dutch National Flag",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public void sortColors(int[] nums) {
        int low = 0, mid = 0, high = nums.length - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums, low++, mid++);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums, mid, high--);
            }
        }
    }

    private void swap(int[] nums, int i, int j) {
        int t = nums[i];
        nums[i] = nums[j];
        nums[j] = t;
    }
}`
      }
    ],
    defaultInput: { nums: [2, 0, 2, 1, 1, 0] },
    dryRunInputs: [
      { nums: [2, 0, 2, 1, 1, 0] },
      { nums: [2, 0, 1] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const view = [...nums];
      let low = 0;
      let mid = 0;
      let high = view.length - 1;
      const ptrs = () => [
        { i: low, label: "low", c: "l" },
        { i: mid, label: "mid", c: "ok" },
        { i: high, label: "high", c: "r" }
      ];

      steps.push({ line: 3, title: "Set pointers", action: `low = 0, mid = 0, high = ${high}`, parts: [{ t: "array", label: "nums", values: view, ptrs: ptrs() }] });

      while (mid <= high) {
        const v = view[mid];
        steps.push({ line: 5, title: `mid → ${v}`, action: v === 0 ? "0 belongs in the low region." : v === 1 ? "1 is already in the middle region." : "2 belongs in the high region.", parts: [
          { t: "array", label: "nums", values: view, marks: { [mid]: "cur" }, ptrs: ptrs() }
        ] });

        if (v === 0) {
          const t = view[low];
          view[low] = view[mid];
          view[mid] = t;
          steps.push({ line: 6, title: "Swap low ↔ mid", action: `Put 0 at index ${low}.`, parts: [
            { t: "array", label: "nums", values: view, marks: { [low]: "ok", [mid]: "ok" }, ptrs: ptrs() }
          ] });
          low++;
          mid++;
        } else if (v === 1) {
          mid++;
          steps.push({ line: 8, title: "Advance mid", action: "1 is in place, move mid forward.", parts: [
            { t: "array", label: "nums", values: view, marks: { [mid - 1]: "ok" }, ptrs: ptrs() }
          ] });
        } else {
          const t = view[mid];
          view[mid] = view[high];
          view[high] = t;
          steps.push({ line: 10, title: "Swap mid ↔ high", action: `Move 2 to index ${high}. mid stays to re-check the swapped value.`, parts: [
            { t: "array", label: "nums", values: view, marks: { [mid]: "ok", [high]: "ok" }, ptrs: ptrs() }
          ] });
          high--;
        }
      }

      steps.push({ line: 13, title: "Result", action: `nums = [${view.join(", ")}]`, parts: [
        { t: "array", label: "nums", values: view, marks: Object.fromEntries(view.map((_, i) => [i, "ok"])) },
        { t: "result", label: "Answer", value: `[${view.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    leetcode: "LeetCode #11",
    difficulty: "Medium",
    problem:
      "You are given an integer array height of length n. There are n vertical lines such that the two endpoints of the i-th line are (i, 0) and (i, height[i]). Find two lines that form a container with the x-axis that holds the maximum amount of water. Return the maximum water the container can store.",
    examples: [
      { input: "height = [1, 8, 6, 2, 5, 4, 8, 3, 7]", output: "49", explanation: "Lines at index 1 and 8 hold 7 × 7 = 49." },
      { input: "height = [1, 1]", output: "1", explanation: "Only one possible container." }
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    approaches: [
      {
        name: "Optimal — Two Pointers",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int maxArea(int[] height) {
        int left = 0, right = height.length - 1, best = 0;
        while (left < right) {
            int area = Math.min(height[left], height[right]) * (right - left);
            best = Math.max(best, area);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return best;
    }
}`
      }
    ],
    defaultInput: { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
    dryRunInputs: [
      { height: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
      { height: [1, 1] }
    ],
    generateSteps({ height }) {
      const steps = [];
      let left = 0;
      let right = height.length - 1;
      let best = 0;
      const ptrs = () => [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }];

      steps.push({ line: 3, title: "Set pointers", action: `left = 0, right = ${right}`, parts: [{ t: "bars", label: "height", values: height, ptrs: ptrs() }] });

      while (left < right) {
        const area = Math.min(height[left], height[right]) * (right - left);
        const w = right - left;
        const h = Math.min(height[left], height[right]);
        steps.push({ line: 5, title: `Compute area`, action: `min(${height[left]}, ${height[right]}) × ${w} = ${h} × ${w} = ${area}`, parts: [
          { t: "bars", label: "height", values: height, marks: { [left]: "ok", [right]: "ok" }, ptrs: ptrs() },
          { t: "vars", items: [{ k: "width", v: w }, { k: "height", v: h }, { k: "area", v: area, c: "hi" }] }
        ] });

        const improved = area > best;
        best = Math.max(best, area);
        steps.push({ line: 6, title: "Update best", action: improved ? `New best area = ${best}!` : `Best stays ${best}.`, parts: [
          { t: "bars", label: "height", values: height, marks: { [left]: "ok", [right]: "ok" }, ptrs: ptrs() },
          { t: "vars", items: [{ k: "best", v: best, c: improved ? "ok" : "hi" }] }
        ] });

        if (height[left] < height[right]) {
          left++;
          steps.push({ line: 7, title: "Move the shorter line", action: `height[${left - 1}] was shorter, so left → ${left}.`, parts: [
            { t: "bars", label: "height", values: height, marks: { [left - 1]: "bad" }, ptrs: ptrs() }
          ] });
        } else {
          right--;
          steps.push({ line: 8, title: "Move the shorter line", action: `height[${right + 1}] was shorter or equal, so right → ${right}.`, parts: [
            { t: "bars", label: "height", values: height, marks: { [right + 1]: "bad" }, ptrs: ptrs() }
          ] });
        }
      }

      steps.push({ line: 10, title: "Result", action: `Maximum area = ${best}.`, parts: [{ t: "bars", label: "height", values: height }, { t: "result", label: "Answer", value: String(best) }] });
      return steps;
    }
  },
  {
    id: "minimum-size-subarray-sum",
    title: "Minimum Size Subarray Sum",
    leetcode: "LeetCode #209",
    difficulty: "Medium",
    problem:
      "Given an array of positive integers nums and a positive integer target, return the minimal length of a contiguous subarray whose sum is greater than or equal to target. If there is no such subarray, return 0.",
    examples: [
      { input: "target = 7, nums = [2, 3, 1, 2, 4, 3]", output: "2", explanation: "The subarray [4, 3] has the minimal length." },
      { input: "target = 4, nums = [1, 4, 4]", output: "1", explanation: "[4] alone reaches the target." }
    ],
    constraints: ["1 <= target <= 10^9", "1 <= nums.length <= 10^5", "1 <= nums[i] <= 10^5"],
    approaches: [
      {
        name: "Optimal — Sliding Window",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0, sum = 0, best = Integer.MAX_VALUE;
        for (int right = 0; right < nums.length; right++) {
            sum += nums[right];
            while (sum >= target) {
                best = Math.min(best, right - left + 1);
                sum -= nums[left++];
            }
        }
        return best == Integer.MAX_VALUE ? 0 : best;
    }
}`
      }
    ],
    defaultInput: { target: 7, nums: [2, 3, 1, 2, 4, 3] },
    dryRunInputs: [
      { target: 7, nums: [2, 3, 1, 2, 4, 3] },
      { target: 4, nums: [1, 4, 4] }
    ],
    generateSteps({ target, nums }) {
      const steps = [];
      let left = 0;
      let sum = 0;
      let best = Infinity;
      const ptrs = () => [{ i: left, label: "L", c: "l" }];

      for (let right = 0; right < nums.length; right++) {
        sum += nums[right];
        steps.push({ line: 5, title: `right = ${right}`, action: `Add ${nums[right]} → sum = ${sum}`, parts: [
          { t: "array", label: "nums", values: nums, window: [left, right], marks: { [right]: "cur" }, ptrs: [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }] },
          { t: "vars", items: [{ k: "sum", v: sum, c: "hi" }, { k: "target", v: target }] }
        ] });

        while (sum >= target) {
          const len = right - left + 1;
          best = Math.min(best, len);
          steps.push({ line: 7, title: "Update best length", action: `sum ${sum} ≥ ${target}: window length ${len} → best = ${best}`, parts: [
            { t: "array", label: "nums", values: nums, window: [left, right], ptrs: [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }] },
            { t: "vars", items: [{ k: "best", v: best, c: "ok" }, { k: "sum", v: sum }] }
          ] });
          sum -= nums[left];
          left++;
          steps.push({ line: 8, title: "Shrink window", action: `Remove ${nums[left - 1]} → sum = ${sum}, left → ${left}`, parts: [
            { t: "array", label: "nums", values: nums, window: [left, right], marks: { [left - 1]: "bad" }, ptrs: [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }] },
            { t: "vars", items: [{ k: "sum", v: sum, c: "hi" }] }
          ] });
        }
      }

      const ans = best === Infinity ? 0 : best;
      steps.push({ line: 11, title: "Result", action: ans === 0 ? "No subarray reached the target." : `Minimal length = ${ans}.`, parts: [
        { t: "result", label: "Answer", value: String(ans) }
      ] });
      return steps;
    }
  },
  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    leetcode: "LeetCode #42",
    difficulty: "Hard",
    problem:
      "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: [
      { input: "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", output: "6", explanation: "The elevation map traps 6 units of water." },
      { input: "height = [4, 2, 0, 3, 2, 5]", output: "9", explanation: "Traps 9 units of water." }
    ],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    approaches: [
      {
        name: "Optimal — Two Pointers",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`
      }
    ],
    defaultInput: { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
    dryRunInputs: [
      { height: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
      { height: [4, 2, 0, 3, 2, 5] }
    ],
    generateSteps({ height }) {
      const steps = [];
      let left = 0;
      let right = height.length - 1;
      let leftMax = 0;
      let rightMax = 0;
      let water = 0;
      const ptrs = () => [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }];

      steps.push({ line: 3, title: "Set pointers", action: `left = 0, right = ${right}`, parts: [{ t: "bars", label: "height", values: height, ptrs: ptrs() }] });

      while (left < right) {
        if (height[left] < height[right]) {
          steps.push({ line: 7, title: `left = ${left} (height ${height[left]})`, action: height[left] >= leftMax ? `New leftMax = ${height[left]}.` : `Water += ${leftMax - height[left]} here.`, parts: [
            { t: "bars", label: "height", values: height, marks: { [left]: height[left] >= leftMax ? "ok" : "bad" }, ptrs: ptrs() },
            { t: "vars", items: [{ k: "leftMax", v: Math.max(leftMax, height[left]), c: "hi" }, { k: "water", v: water + (height[left] >= leftMax ? 0 : leftMax - height[left]), c: "ok" }] }
          ] });
          if (height[left] >= leftMax) leftMax = height[left];
          else water += leftMax - height[left];
          left++;
        } else {
          steps.push({ line: 11, title: `right = ${right} (height ${height[right]})`, action: height[right] >= rightMax ? `New rightMax = ${height[right]}.` : `Water += ${rightMax - height[right]} here.`, parts: [
            { t: "bars", label: "height", values: height, marks: { [right]: height[right] >= rightMax ? "ok" : "bad" }, ptrs: ptrs() },
            { t: "vars", items: [{ k: "rightMax", v: Math.max(rightMax, height[right]), c: "hi" }, { k: "water", v: water + (height[right] >= rightMax ? 0 : rightMax - height[right]), c: "ok" }] }
          ] });
          if (height[right] >= rightMax) rightMax = height[right];
          else water += rightMax - height[right];
          right--;
        }
      }

      steps.push({ line: 16, title: "Result", action: `Total trapped water = ${water}.`, parts: [
        { t: "bars", label: "height", values: height },
        { t: "result", label: "Answer", value: String(water) }
      ] });
      return steps;
    }
  }
];

