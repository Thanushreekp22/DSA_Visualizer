/* Arrays topic — 15 questions in the agreed order.
   Each question carries its Java solution plus a `generateSteps(input)`
   trace used by BOTH the live Visualization and the static DryRun. */

export const arraysQuestions = [
  {
    id: "two-sum",
    title: "Two Sum",
    leetcode: "LeetCode #1",
    difficulty: "Easy",
    problem:
      "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation: "nums[0] + nums[1] = 9"
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
        explanation: "nums[1] + nums[2] = 6"
      }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "Exactly one valid answer exists."
    ],
    approaches: [
      {
        name: "Brute Force",
        kind: "brute",
        time: "O(n^2)",
        space: "O(1)",
        runs: false,
        javaCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[] { i, j };
                }
            }
        }
        return new int[]{};
    }
}`
      },
      {
        name: "Optimal — HashMap",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];

            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }

            map.put(nums[i], i);
        }

        return new int[]{};
    }
}`
      }
    ],
    defaultInput: { nums: [2, 7, 11, 15], target: 9 },
    dryRunInputs: [
      { nums: [2, 7, 11, 15], target: 9 },
      { nums: [3, 2, 4], target: 6 }
    ],
    generateSteps({ nums, target }) {
      const steps = [];
      const map = new Map();
      const entries = () => Array.from(map.entries());

      const arrPart = (i, marks = {}) => ({
        t: "array",
        label: "nums",
        values: nums,
        marks,
        ptrs: i === null ? [] : [{ i, label: "i", c: "cur" }]
      });

      steps.push({
        line: 3,
        title: "Initialize",
        action: "Create an empty HashMap to store value → index.",
        parts: [arrPart(null), { t: "map", label: "HashMap", entries: entries() }]
      });

      for (let i = 0; i < nums.length; i++) {
        steps.push({
          line: 5,
          title: `i = ${i}`,
          action: `Move the pointer to index ${i} (value ${nums[i]}).`,
          parts: [arrPart(i), { t: "map", label: "HashMap", entries: entries() }]
        });

        const complement = target - nums[i];
        steps.push({
          line: 6,
          title: "Compute complement",
          action: `complement = ${target} − ${nums[i]} = ${complement}`,
          parts: [
            arrPart(i),
            { t: "map", label: "HashMap", entries: entries() },
            { t: "vars", items: [{ k: "complement", v: complement, c: "hi" }] }
          ]
        });

        const found = map.has(complement);
        steps.push({
          line: 8,
          title: "Check the map",
          action: found
            ? `The map contains ${complement} at index ${map.get(complement)}.`
            : `The map does not contain ${complement}, so the pair is not complete yet.`,
          parts: [
            arrPart(i),
            { t: "map", label: "HashMap", entries: entries(), hiKey: found ? complement : undefined }
          ]
        });

        if (found) {
          const a = map.get(complement);
          steps.push({
            line: 9,
            title: "Pair found",
            action: `${nums[a]} + ${nums[i]} = ${target}. Return [${a}, ${i}].`,
            parts: [
              arrPart(i, { [a]: "ok", [i]: "ok" }),
              { t: "map", label: "HashMap", entries: entries(), hiKey: complement },
              { t: "result", label: "Answer", value: `[${a}, ${i}]` }
            ]
          });
          return steps;
        }

        map.set(nums[i], i);
        steps.push({
          line: 12,
          title: "Insert into map",
          action: `Store ${nums[i]} → ${i} and continue the loop.`,
          parts: [
            arrPart(i, { [i]: "cur" }),
            { t: "map", label: "HashMap", entries: entries(), hiKey: nums[i] }
          ]
        });
      }

      return steps;
    }
  },
  {
    id: "majority-element",
    title: "Majority Element",
    leetcode: "LeetCode #169",
    difficulty: "Easy",
    problem:
      "Given an array nums of size n, return the majority element — the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.",
    examples: [
      { input: "nums = [3, 2, 3]", output: "3", explanation: "3 appears 2 times out of 3 elements." },
      { input: "nums = [2, 2, 1, 1, 1, 2, 2]", output: "2", explanation: "2 appears 4 times out of 7 elements." }
    ],
    constraints: ["n == nums.length", "1 <= n <= 5 * 10^4", "The majority element always exists."],
    approaches: [
      {
        name: "Optimal — Boyer-Moore Vote",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
        Integer candidate = null;

        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            count += (num == candidate) ? 1 : -1;
        }

        return candidate;
    }
}`
      }
    ],
    defaultInput: { nums: [2, 2, 1, 1, 1, 2, 2] },
    dryRunInputs: [
      { nums: [3, 2, 3] },
      { nums: [2, 2, 1, 1, 1, 2, 2] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      let count = 0;
      let candidate = null;
      const vars = () => ({
        t: "vars",
        items: [
          { k: "candidate", v: candidate === null ? "null" : candidate, c: candidate === null ? "" : "hi" },
          { k: "count", v: count, c: count === 0 ? "bad" : "ok" }
        ]
      });
      const arr = (i, marks = {}) => ({ t: "array", label: "nums", values: nums, marks, ptrs: [{ i, label: "num", c: "cur" }] });

      steps.push({ line: 3, title: "Initialize", action: "Set count = 0 and candidate = null.", parts: [{ t: "array", label: "nums", values: nums }, vars()] });

      for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        steps.push({ line: 6, title: `Read nums[${i}] = ${num}`, action: "Look at the next number.", parts: [arr(i), vars()] });

        if (count === 0) {
          candidate = num;
          steps.push({ line: 8, title: "Set candidate", action: `count was 0, so candidate becomes ${num}.`, parts: [arr(i, { [i]: "cur" }), vars()] });
        }

        count += num === candidate ? 1 : -1;
        steps.push({ line: 10, title: "Update count", action: `${num} ${num === candidate ? "matches" : "does not match"} the candidate → count = ${count}.`, parts: [arr(i, { [i]: count >= 0 ? "ok" : "bad" }), vars()] });
      }

      steps.push({ line: 13, title: "Result", action: `The surviving candidate is ${candidate}.`, parts: [{ t: "array", label: "nums", values: nums }, vars(), { t: "result", label: "Answer", value: String(candidate) }] });
      return steps;
    }
  },
  {
    id: "find-pivot-index",
    title: "Find Pivot Index",
    leetcode: "LeetCode #724",
    difficulty: "Easy",
    problem:
      "Given an array of integers nums, calculate the pivot index where the sum of the numbers strictly to the left equals the sum strictly to the right. Return the leftmost such index, or -1 if none exists.",
    examples: [
      { input: "nums = [1, 7, 3, 6, 5, 6]", output: "3", explanation: "Left sum = 1+7+3 = 11, right sum = 5+6 = 11." },
      { input: "nums = [1, 2, 3]", output: "-1", explanation: "No index satisfies the condition." }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-1000 <= nums[i] <= 1000"],
    approaches: [
      {
        name: "Optimal — Prefix Sum",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int pivotIndex(int[] nums) {
        int total = 0;
        for (int num : nums) total += num;

        int leftSum = 0;
        for (int i = 0; i < nums.length; i++) {
            if (leftSum == total - leftSum - nums[i]) {
                return i;
            }
            leftSum += nums[i];
        }
        return -1;
    }
}`
      }
    ],
    defaultInput: { nums: [1, 7, 3, 6, 5, 6] },
    dryRunInputs: [
      { nums: [1, 7, 3, 6, 5, 6] },
      { nums: [1, 2, 3] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const total = nums.reduce((a, b) => a + b, 0);
      let leftSum = 0;

      steps.push({ line: 3, title: "Compute total", action: `total = ${total}`, parts: [{ t: "array", label: "nums", values: nums }, { t: "vars", items: [{ k: "total", v: total, c: "hi" }] }] });

      for (let i = 0; i < nums.length; i++) {
        const right = total - leftSum - nums[i];
        steps.push({ line: 7, title: `i = ${i}`, action: `leftSum = ${leftSum}, rightSum = ${total} − ${leftSum} − ${nums[i]} = ${right}`, parts: [
          { t: "array", label: "nums", values: nums, ptrs: [{ i, label: "i", c: "cur" }] },
          { t: "vars", items: [{ k: "leftSum", v: leftSum }, { k: "rightSum", v: right }] }
        ] });

        const match = leftSum === right;
        steps.push({ line: 8, title: "Compare", action: match ? `${leftSum} == ${right} — condition holds.` : `${leftSum} ≠ ${right}.`, parts: [
          { t: "array", label: "nums", values: nums, marks: { [i]: match ? "ok" : "bad" }, ptrs: [{ i, label: "i", c: "cur" }] },
          { t: "vars", items: [{ k: "leftSum", v: leftSum }, { k: "rightSum", v: right, c: match ? "ok" : "bad" }] }
        ] });

        if (match) {
          steps.push({ line: 9, title: "Return pivot", action: `Return index ${i}.`, parts: [
            { t: "array", label: "nums", values: nums, marks: { [i]: "ok" }, ptrs: [{ i, label: "i", c: "ok" }] },
            { t: "result", label: "Answer", value: String(i) }
          ] });
          return steps;
        }

        leftSum += nums[i];
        steps.push({ line: 11, title: "Accumulate left", action: `leftSum += ${nums[i]} → ${leftSum}`, parts: [
          { t: "array", label: "nums", values: nums, ptrs: [{ i, label: "i", c: "cur" }] },
          { t: "vars", items: [{ k: "leftSum", v: leftSum, c: "hi" }] }
        ] });
      }

      steps.push({ line: 13, title: "No pivot", action: "No index matched, so return -1.", parts: [{ t: "array", label: "nums", values: nums }, { t: "result", label: "Answer", value: "-1" }] });
      return steps;
    }
  },
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    leetcode: "LeetCode #53",
    difficulty: "Medium",
    problem:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    examples: [
      { input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", output: "6", explanation: "The subarray [4, -1, 2, 1] has the largest sum 6." },
      { input: "nums = [1]", output: "1", explanation: "The single element is the answer." }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    approaches: [
      {
        name: "Optimal — Kadane's Algorithm",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int maxSubArray(int[] nums) {
        int current = nums[0];
        int best = nums[0];

        for (int i = 1; i < nums.length; i++) {
            current = Math.max(nums[i], current + nums[i]);
            best = Math.max(best, current);
        }

        return best;
    }
}`
      }
    ],
    defaultInput: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
    dryRunInputs: [
      { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
      { nums: [5, 4, -1, 7, 8] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      let current = nums[0];
      let best = nums[0];
      const vars = (i) => ({
        t: "vars",
        items: [
          { k: "current", v: current, c: current < 0 ? "bad" : "ok" },
          { k: "best", v: best, c: "hi" }
        ]
      });

      steps.push({ line: 3, title: "Initialize", action: `current = best = ${nums[0]}`, parts: [{ t: "array", label: "nums", values: nums, marks: { 0: "cur" } }, vars(0)] });

      for (let i = 1; i < nums.length; i++) {
        const extend = current + nums[i];
        steps.push({ line: 6, title: `i = ${i} → nums[${i}] = ${nums[i]}`, action: `Extend? current ${current} + ${nums[i]} = ${extend}.`, parts: [
          { t: "array", label: "nums", values: nums, marks: { [i]: "cur" }, ptrs: [{ i, label: "i", c: "cur" }] },
          vars(i),
          { t: "vars", items: [{ k: "extend", v: extend }] }
        ] });

        current = Math.max(nums[i], extend);
        steps.push({ line: 7, title: "Update current", action: extend < nums[i] ? `Restart here: ${nums[i]} > ${extend}, so current = ${nums[i]}.` : `Keep extending: current = ${extend}.`, parts: [
          { t: "array", label: "nums", values: nums, marks: { [i]: current < 0 ? "bad" : "ok" }, ptrs: [{ i, label: "i", c: "cur" }] },
          vars(i)
        ] });

        best = Math.max(best, current);
        steps.push({ line: 8, title: "Update best", action: `best = max(${best}, ${current}) → ${best}.`, parts: [
          { t: "array", label: "nums", values: nums, marks: { [i]: "cur" }, ptrs: [{ i, label: "i", c: "cur" }] },
          vars(i)
        ] });
      }

      steps.push({ line: 12, title: "Result", action: `The maximum subarray sum is ${best}.`, parts: [{ t: "array", label: "nums", values: nums }, vars(-1), { t: "result", label: "Answer", value: String(best) }] });
      return steps;
    }
  },
  {
    id: "remove-duplicates-sorted",
    title: "Remove Duplicates from Sorted Array",
    leetcode: "LeetCode #26",
    difficulty: "Easy",
    problem:
      "Given an integer array nums sorted in non-decreasing order, remove the duplicates in-place such that each element appears only once. Return the number of unique elements k — the first k positions of nums hold the final result.",
    examples: [
      { input: "nums = [1, 1, 2]", output: "k = 2, nums = [1, 2, _]", explanation: "The first two elements become 1 and 2." },
      { input: "nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]", output: "k = 5, nums = [0, 1, 2, 3, 4, _]", explanation: "The first five elements are modified." }
    ],
    constraints: ["0 <= nums.length <= 3 * 10^4", "-100 <= nums[i] <= 100"],
    approaches: [
      {
        name: "Optimal — Two Pointers",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int write = 1;
        for (int read = 1; read < nums.length; read++) {
            if (nums[read] != nums[write - 1]) {
                nums[write] = nums[read];
                write++;
            }
        }
        return write;
    }
}`
      }
    ],
    defaultInput: { nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] },
    dryRunInputs: [
      { nums: [1, 1, 2] },
      { nums: [0, 0, 1, 1, 1, 2, 2, 3, 3, 4] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const view = [...nums];
      let write = 1;
      const ptrs = (read) => [
        { i: Math.min(write, view.length - 1), label: "write", c: "l" },
        ...(read !== undefined ? [{ i: read, label: "read", c: "r" }] : [])
      ];

      steps.push({ line: 5, title: "Initialize", action: "write = 1 points to the next free slot.", parts: [{ t: "array", label: "nums", values: view, ptrs: ptrs() }, { t: "vars", items: [{ k: "write", v: write, c: "hi" }] }] });

      for (let read = 1; read < nums.length; read++) {
        const dup = nums[read] === nums[write - 1];
        steps.push({ line: 7, title: `read = ${read} → ${nums[read]}`, action: dup ? `Same as nums[write-1] = ${nums[write - 1]}, so it is a duplicate — skip.` : `Different from nums[write-1] = ${nums[write - 1]}, so keep it.`, parts: [
          { t: "array", label: "nums", values: view, marks: { [read]: dup ? "bad" : "ok" }, ptrs: ptrs(read) },
          { t: "vars", items: [{ k: "write", v: write }] }
        ] });

        if (!dup) {
          view[write] = nums[read];
          steps.push({ line: 8, title: "Copy value", action: `Copy ${nums[read]} to index ${write}.`, parts: [
            { t: "array", label: "nums", values: view, marks: { [write]: "ok", [read]: "cur" }, ptrs: ptrs(read) },
            { t: "vars", items: [{ k: "write", v: write, c: "ok" }] }
          ] });
          write++;
          steps.push({ line: 9, title: "Advance write", action: `write becomes ${write}.`, parts: [
            { t: "array", label: "nums", values: view, ptrs: ptrs(read) },
            { t: "vars", items: [{ k: "write", v: write, c: "hi" }] }
          ] });
        }
      }

      steps.push({ line: 12, title: "Result", action: `k = ${write}. The first ${write} entries are unique.`, parts: [
        { t: "array", label: "nums (first k)", values: view.slice(0, write) },
        { t: "result", label: "k", value: String(write) }
      ] });
      return steps;
    }
  },
  {
    id: "richest-customer-wealth",
    title: "Richest Customer Wealth",
    leetcode: "LeetCode #1672",
    difficulty: "Easy",
    problem:
      "You are given an m x n integer grid accounts where accounts[i][j] is the amount of money the i-th customer has in the j-th bank. Return the wealth of the richest customer, where a customer's wealth is the sum of all their bank accounts.",
    examples: [
      { input: "accounts = [[1, 2, 3], [3, 2, 1]]", output: "6", explanation: "The first customer has wealth 6, the second also 6." },
      { input: "accounts = [[1, 5], [7, 3], [3, 5]]", output: "10", explanation: "The second customer has wealth 7 + 3 = 10." }
    ],
    constraints: ["m == accounts.length", "n == accounts[i].length", "1 <= m, n <= 50"],
    approaches: [
      {
        name: "Optimal — Sum Each Row",
        kind: "optimal",
        time: "O(m * n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int maximumWealth(int[][] accounts) {
        int best = 0;
        for (int[] person : accounts) {
            int sum = 0;
            for (int money : person) sum += money;
            best = Math.max(best, sum);
        }
        return best;
    }
}`
      }
    ],
    defaultInput: { accounts: [[1, 5], [7, 3], [3, 5]] },
    dryRunInputs: [
      { accounts: [[1, 2, 3], [3, 2, 1]] },
      { accounts: [[1, 5], [7, 3], [3, 5]] }
    ],
    generateSteps({ accounts }) {
      const steps = [];
      let best = 0;

      steps.push({ line: 3, title: "Initialize", action: "best = 0", parts: [{ t: "vars", items: [{ k: "best", v: 0 }] }] });

      accounts.forEach((person, idx) => {
        let sum = 0;
        steps.push({ line: 4, title: `Customer ${idx}`, action: `Look at accounts[${idx}] = [${person.join(", ")}]`, parts: [
          { t: "bars", label: `Customer ${idx}`, values: person },
          { t: "vars", items: [{ k: "best", v: best, c: "hi" }] }
        ]});

        person.forEach((money, j) => {
          sum += money;
          steps.push({ line: 6, title: `Add bank ${j}`, action: `sum += ${money} → ${sum}`, parts: [
            { t: "bars", label: `Customer ${idx}`, values: person, marks: { [j]: "cur" } },
            { t: "vars", items: [{ k: "sum", v: sum, c: "ok" }, { k: "best", v: best }] }
          ]});
        });

        const better = sum > best;
        best = Math.max(best, sum);
        steps.push({ line: 7, title: "Compare with best", action: better ? `sum ${sum} > best ${best === sum ? best : best} — new richest!` : `sum ${sum} ≤ best, keep best.`, parts: [
          { t: "bars", label: `Customer ${idx} wealth`, values: person, marks: Object.fromEntries(person.map((_, k) => [k, better ? "ok" : "cur"])) },
          { t: "vars", items: [{ k: "sum", v: sum }, { k: "best", v: best, c: better ? "ok" : "hi" }] }
        ]});
      });

      steps.push({ line: 9, title: "Result", action: `The richest wealth is ${best}.`, parts: [{ t: "vars", items: [{ k: "best", v: best, c: "ok" }] }, { t: "result", label: "Answer", value: String(best) }] });
      return steps;
    }
  },
  {
    id: "missing-number",
    title: "Missing Number",
    leetcode: "LeetCode #268",
    difficulty: "Easy",
    problem:
      "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
    examples: [
      { input: "nums = [3, 0, 1]", output: "2", explanation: "n = 3, range is [0, 3], 2 is missing." },
      { input: "nums = [0, 1]", output: "2", explanation: "n = 2, range is [0, 2], 2 is missing." }
    ],
    constraints: ["n == nums.length", "1 <= n <= 10^4", "0 <= nums[i] <= n"],
    approaches: [
      {
        name: "Optimal — Sum Formula",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int missingNumber(int[] nums) {
        int n = nums.length;
        int expected = n * (n + 1) / 2;
        int sum = 0;
        for (int num : nums) sum += num;
        return expected - sum;
    }
}`
      }
    ],
    defaultInput: { nums: [3, 0, 1] },
    dryRunInputs: [
      { nums: [3, 0, 1] },
      { nums: [9, 6, 4, 2, 3, 5, 7, 0, 1] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const n = nums.length;
      const expected = (n * (n + 1)) / 2;
      let sum = 0;

      steps.push({ line: 3, title: "Set n", action: `n = ${n}, so the range is [0, ${n}].`, parts: [{ t: "array", label: "nums", values: nums }, { t: "vars", items: [{ k: "n", v: n }] }] });
      steps.push({ line: 4, title: "Expected sum", action: `expected = ${n}×${n + 1}÷2 = ${expected}`, parts: [{ t: "array", label: "nums", values: nums }, { t: "vars", items: [{ k: "expected", v: expected, c: "hi" }] }] });

      nums.forEach((num, i) => {
        sum += num;
        steps.push({ line: 6, title: `Add nums[${i}] = ${num}`, action: `sum becomes ${sum}.`, parts: [
          { t: "array", label: "nums", values: nums, marks: { [i]: "cur" }, ptrs: [{ i, label: "i", c: "cur" }] },
          { t: "vars", items: [{ k: "sum", v: sum, c: "ok" }, { k: "expected", v: expected }] }
        ] });
      });

      const missing = expected - sum;
      steps.push({ line: 7, title: "Result", action: `${expected} − ${sum} = ${missing}`, parts: [
        { t: "array", label: "nums", values: nums },
        { t: "vars", items: [{ k: "expected", v: expected }, { k: "sum", v: sum }] },
        { t: "result", label: "Answer", value: String(missing) }
      ] });
      return steps;
    }
  },
  {
    id: "find-disappeared-numbers",
    title: "Find All Numbers Disappeared in an Array",
    leetcode: "LeetCode #448",
    difficulty: "Easy",
    problem:
      "Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.",
    examples: [
      { input: "nums = [4, 3, 2, 7, 8, 2, 3, 1]", output: "[5, 6]", explanation: "5 and 6 never appear, so they are missing." },
      { input: "nums = [1, 1]", output: "[2]", explanation: "2 is missing from the range [1, 2]." }
    ],
    constraints: ["n == nums.length", "1 <= n <= 10^5", "1 <= nums[i] <= n"],
    approaches: [
      {
        name: "Optimal — Mark Negatives (Index Sign)",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public List<Integer> findDisappearedNumbers(int[] nums) {
        List<Integer> result = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            int idx = Math.abs(nums[i]) - 1;
            if (nums[idx] > 0) nums[idx] = -nums[idx];
        }
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] > 0) result.add(i + 1);
        }
        return result;
    }
}`
      }
    ],
    defaultInput: { nums: [4, 3, 2, 7, 8, 2, 3, 1] },
    dryRunInputs: [
      { nums: [4, 3, 2, 7, 8, 2, 3, 1] },
      { nums: [1, 1] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const view = [...nums];

      steps.push({ line: 3, title: "Initialize", action: "Create an empty result list.", parts: [{ t: "array", label: "nums", values: view }, { t: "set", label: "result", values: [] }] });

      for (let i = 0; i < nums.length; i++) {
        const idx = Math.abs(nums[i]) - 1;
        steps.push({ line: 5, title: `i = ${i} → mark index ${idx}`, action: `nums[${i}] = ${nums[i]} points to index ${idx}.`, parts: [
          { t: "array", label: "nums", values: view, marks: { [i]: "cur", [idx]: "dep" }, ptrs: [{ i, label: "i", c: "cur" }, { i: idx, label: "mark", c: "l" }] }
        ] });

        if (view[idx] > 0) {
          view[idx] = -view[idx];
          steps.push({ line: 6, title: "Negate", action: `Make nums[${idx}] negative to mark that ${idx + 1} was seen.`, parts: [
            { t: "array", label: "nums", values: view, marks: { [idx]: "bad" }, ptrs: [{ i, label: "i", c: "cur" }] }
          ] });
        }
      }

      const result = [];
      for (let i = 0; i < nums.length; i++) {
        const present = view[i] > 0;
        steps.push({ line: 9, title: `Check index ${i}`, action: present ? `nums[${i}] is still positive → ${i + 1} is missing!` : `nums[${i}] is negative → ${i + 1} was seen.`, parts: [
          { t: "array", label: "nums", values: view, marks: { [i]: present ? "ok" : "cur" }, ptrs: [{ i, label: "i", c: present ? "ok" : "cur" }] },
          { t: "set", label: "result", values: present ? [...result, i + 1] : result, hi: present ? i + 1 : undefined }
        ] });
        if (present) result.push(i + 1);
      }

      steps.push({ line: 11, title: "Result", action: `Missing numbers: [${result.join(", ")}]`, parts: [{ t: "set", label: "result", values: result }, { t: "result", label: "Answer", value: `[${result.join(", ")}]` }] });
      return steps;
    }
  },
  {
    id: "max-product-two-elements",
    title: "Maximum Product of Two Elements in an Array",
    leetcode: "LeetCode #1464",
    difficulty: "Easy",
    problem:
      "Given the array nums, choose two different indices i and j and return the maximum value of (nums[i] - 1) * (nums[j] - 1).",
    examples: [
      { input: "nums = [3, 4, 5, 2]", output: "12", explanation: "(5 - 1) * (4 - 1) = 12" },
      { input: "nums = [1, 5, 4, 5]", output: "16", explanation: "(5 - 1) * (5 - 1) = 16" }
    ],
    constraints: ["2 <= nums.length <= 500", "1 <= nums[i] <= 10^3"],
    approaches: [
      {
        name: "Optimal — Track Two Largest",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int maxProduct(int[] nums) {
        int first = 0, second = 0;
        for (int num : nums) {
            if (num >= first) { second = first; first = num; }
            else if (num > second) second = num;
        }
        return (first - 1) * (second - 1);
    }
}`
      }
    ],
    defaultInput: { nums: [3, 4, 5, 2] },
    dryRunInputs: [
      { nums: [3, 4, 5, 2] },
      { nums: [1, 5, 4, 5] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      let first = 0;
      let second = 0;
      const vars = () => ({ t: "vars", items: [{ k: "first", v: first, c: "ok" }, { k: "second", v: second, c: "hi" }] });

      steps.push({ line: 3, title: "Initialize", action: "first = second = 0", parts: [{ t: "array", label: "nums", values: nums }, vars()] });

      nums.forEach((num, i) => {
        if (num >= first) {
          const old = first;
          second = first;
          first = num;
          steps.push({ line: 5, title: `num = ${num} is the new largest`, action: `Shift: second = ${old}, first = ${num}.`, parts: [
            { t: "array", label: "nums", values: nums, marks: { [i]: "ok" }, ptrs: [{ i, label: "i", c: "ok" }] },
            vars()
          ] });
        } else if (num > second) {
          second = num;
          steps.push({ line: 6, title: `num = ${num} is the new second`, action: `second becomes ${num}.`, parts: [
            { t: "array", label: "nums", values: nums, marks: { [i]: "cur" }, ptrs: [{ i, label: "i", c: "cur" }] },
            vars()
          ] });
        } else {
          steps.push({ line: 5, title: `num = ${num} is smaller`, action: `${num} is not bigger than first (${first}) or second (${second}).`, parts: [
            { t: "array", label: "nums", values: nums, marks: { [i]: "bad" }, ptrs: [{ i, label: "i", c: "cur" }] },
            vars()
          ] });
        }
      });

      const ans = (first - 1) * (second - 1);
      steps.push({ line: 8, title: "Result", action: `(${first} − 1) × (${second} − 1) = ${ans}`, parts: [vars(), { t: "result", label: "Answer", value: String(ans) }] });
      return steps;
    }
  },
  {
    id: "product-except-self",
    title: "Product of Array Except Self",
    leetcode: "LeetCode #238",
    difficulty: "Medium",
    problem:
      "Given an integer array nums, return an array answer where answer[i] is the product of all the elements of nums except nums[i]. Solve it without using division and in O(n) time.",
    examples: [
      { input: "nums = [1, 2, 3, 4]", output: "[24, 12, 8, 6]", explanation: "answer[0] = 2×3×4 = 24, and so on." },
      { input: "nums = [-1, 1, 0, -3, 3]", output: "[0, 0, 9, 0, 0]", explanation: "The 0 makes every other product 0." }
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
    approaches: [
      {
        name: "Optimal — Prefix & Suffix Pass",
        kind: "optimal",
        time: "O(n)",
        space: "O(1) extra",
        runs: true,
        javaCode: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
}`
      }
    ],
    defaultInput: { nums: [1, 2, 3, 4] },
    dryRunInputs: [
      { nums: [1, 2, 3, 4] },
      { nums: [-1, 1, 0, -3, 3] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const n = nums.length;
      const res = new Array(n).fill(1);

      steps.push({ line: 4, title: "Create result array", action: "res starts filled with 1s.", parts: [
        { t: "array", label: "nums", values: nums },
        { t: "array", label: "res (prefix)", values: res }
      ] });

      for (let i = 1; i < n; i++) {
        res[i] = res[i - 1] * nums[i - 1];
        steps.push({ line: 6, title: `Prefix pass i = ${i}`, action: `res[${i}] = res[${i - 1}] (${res[i] / nums[i - 1] || 1}) × nums[${i - 1}] (${nums[i - 1]}) → ${res[i]}`, parts: [
          { t: "array", label: "nums", values: nums, marks: { [i - 1]: "cur" } },
          { t: "array", label: "res (prefix)", values: [...res], marks: { [i]: "ok" }, ptrs: [{ i, label: "i", c: "ok" }] }
        ] });
      }

      let right = 1;
      for (let i = n - 1; i >= 0; i--) {
        res[i] *= right;
        steps.push({ line: 9, title: `Suffix pass i = ${i}`, action: `res[${i}] *= right (${right}) → ${res[i]}`, parts: [
          { t: "array", label: "nums", values: nums, marks: { [i]: "cur" } },
          { t: "array", label: "res", values: [...res], marks: { [i]: "ok" }, ptrs: [{ i, label: "i", c: "ok" }] },
          { t: "vars", items: [{ k: "right", v: right, c: "hi" }] }
        ] });
        right *= nums[i];
      }

      steps.push({ line: 12, title: "Result", action: `answer = [${res.join(", ")}]`, parts: [
        { t: "array", label: "nums", values: nums },
        { t: "array", label: "answer", values: [...res], marks: Object.fromEntries(res.map((_, k) => [k, "ok"])) },
        { t: "result", label: "Answer", value: `[${res.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "search-insert-position",
    title: "Search Insert Position",
    leetcode: "LeetCode #35",
    difficulty: "Easy",
    problem:
      "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be inserted in order.",
    examples: [
      { input: "nums = [1, 3, 5, 6], target = 5", output: "2", explanation: "5 is found at index 2." },
      { input: "nums = [1, 3, 5, 6], target = 2", output: "1", explanation: "2 would be inserted at index 1." }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4"],
    approaches: [
      {
        name: "Optimal — Binary Search",
        kind: "optimal",
        time: "O(log n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int searchInsert(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return lo;
    }
}`
      }
    ],
    defaultInput: { nums: [1, 3, 5, 6], target: 5 },
    dryRunInputs: [
      { nums: [1, 3, 5, 6], target: 5 },
      { nums: [1, 3, 5, 6], target: 2 }
    ],
    generateSteps({ nums, target }) {
      const steps = [];
      let lo = 0;
      let hi = nums.length - 1;
      const ptrs = (mid) => [
        { i: lo, label: "lo", c: "l" },
        { i: hi, label: "hi", c: "r" },
        ...(mid !== undefined ? [{ i: mid, label: "mid", c: "ok" }] : [])
      ];

      steps.push({ line: 3, title: "Set bounds", action: `lo = 0, hi = ${hi}. Search range is the whole array.`, parts: [{ t: "array", label: "nums", values: nums, window: [lo, hi], ptrs: ptrs() }] });

      while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        steps.push({ line: 5, title: `mid = ${mid}`, action: `mid = ${lo} + (${hi} − ${lo}) ÷ 2 = ${mid}, value ${nums[mid]}.`, parts: [
          { t: "array", label: "nums", values: nums, window: [lo, hi], marks: { [mid]: "cur" }, ptrs: ptrs(mid) }
        ] });

        if (nums[mid] === target) {
          steps.push({ line: 6, title: "Target found", action: `nums[${mid}] = ${target}. Return ${mid}.`, parts: [
            { t: "array", label: "nums", values: nums, marks: { [mid]: "ok" }, ptrs: [{ i: mid, label: "mid", c: "ok" }] },
            { t: "result", label: "Answer", value: String(mid) }
          ] });
          return steps;
        }

        if (nums[mid] < target) {
          lo = mid + 1;
          steps.push({ line: 7, title: "Search right half", action: `${nums[mid]} < ${target}, so move lo to ${lo}. Right side is discarded.`, parts: [
            { t: "array", label: "nums", values: nums, marks: { [mid]: "bad" }, window: [lo, hi], ptrs: ptrs() }
          ] });
        } else {
          hi = mid - 1;
          steps.push({ line: 8, title: "Search left half", action: `${nums[mid]} > ${target}, so move hi to ${hi}. Left side is discarded.`, parts: [
            { t: "array", label: "nums", values: nums, marks: { [mid]: "bad" }, window: [lo, hi], ptrs: ptrs() }
          ] });
        }
      }

      steps.push({ line: 10, title: "Result", action: `Search range is empty. The target belongs at index ${lo}.`, parts: [
        { t: "array", label: "nums", values: nums },
        { t: "result", label: "Answer", value: String(lo) }
      ] });
      return steps;
    }
  },
  {
    id: "plus-one",
    title: "Plus One",
    leetcode: "LeetCode #66",
    difficulty: "Easy",
    problem:
      "You are given a large integer represented as an integer array digits where each digits[i] is the i-th digit of the integer. Increment the large integer by one and return the resulting array of digits.",
    examples: [
      { input: "digits = [1, 2, 3]", output: "[1, 2, 4]", explanation: "123 + 1 = 124" },
      { input: "digits = [9, 9, 9]", output: "[1, 0, 0, 0]", explanation: "999 + 1 = 1000, so a new digit is added." }
    ],
    constraints: ["1 <= digits.length <= 100", "0 <= digits[i] <= 9"],
    approaches: [
      {
        name: "Optimal — Carry from the Right",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int[] result = new int[digits.length + 1];
        result[0] = 1;
        return result;
    }
}`
      }
    ],
    defaultInput: { digits: [9, 9, 9] },
    dryRunInputs: [
      { digits: [1, 2, 3] },
      { digits: [9, 9, 9] }
    ],
    generateSteps({ digits }) {
      const steps = [];
      const view = [...digits];

      steps.push({ line: 3, title: "Start from the right", action: "We add 1 starting at the last digit.", parts: [{ t: "array", label: "digits", values: view }] });

      for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
          view[i] += 1;
          steps.push({ line: 5, title: `Increment index ${i}`, action: `${digits[i]} < 9, so digits[${i}] becomes ${view[i]}. No carry remains.`, parts: [
            { t: "array", label: "digits", values: view, marks: { [i]: "ok" }, ptrs: [{ i, label: "i", c: "ok" }] }
          ] });
          steps.push({ line: 6, title: "Return", action: `Result is [${view.join(", ")}].`, parts: [
            { t: "array", label: "digits", values: view, marks: { [i]: "ok" } },
            { t: "result", label: "Answer", value: `[${view.join(", ")}]` }
          ] });
          return steps;
        }

        view[i] = 0;
        steps.push({ line: 8, title: `Carry over index ${i}`, action: `digits[${i}] was 9 → set to 0 and carry 1 left.`, parts: [
          { t: "array", label: "digits", values: view, marks: { [i]: "bad" }, ptrs: [{ i, label: "i", c: "cur" }] }
        ] });
      }

      steps.push({ line: 11, title: "Add new leading 1", action: "All digits were 9, so the result starts with 1.", parts: [
        { t: "array", label: "result", values: [1, ...view] },
        { t: "result", label: "Answer", value: `[1, ${view.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "rotate-array",
    title: "Rotate Array",
    leetcode: "LeetCode #189",
    difficulty: "Medium",
    problem:
      "Given an integer array nums, rotate the array to the right by k steps, where k is non-negative. Do it in place.",
    examples: [
      { input: "nums = [1, 2, 3, 4, 5, 6, 7], k = 3", output: "[5, 6, 7, 1, 2, 3, 4]", explanation: "Rotating right by 3 moves each element 3 slots right." },
      { input: "nums = [-1, -100, 3, 99], k = 2", output: "[3, 99, -1, -100]", explanation: "Rotating right by 2." }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-2^31 <= nums[i] <= 2^31 - 1", "0 <= k <= 10^5"],
    approaches: [
      {
        name: "Optimal — Three Reversals",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public void rotate(int[] nums, int k) {
        int n = nums.length;
        k = k % n;
        reverse(nums, 0, n - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, n - 1);
    }

    private void reverse(int[] nums, int i, int j) {
        while (i < j) {
            int t = nums[i];
            nums[i] = nums[j];
            nums[j] = t;
            i++;
            j--;
        }
    }
}`
      }
    ],
    defaultInput: { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 },
    dryRunInputs: [
      { nums: [1, 2, 3, 4, 5, 6, 7], k: 3 },
      { nums: [-1, -100, 3, 99], k: 2 }
    ],
    generateSteps({ nums, k }) {
      const steps = [];
      const n = nums.length;
      const view = [...nums];
      k = k % n;
      const snap = (title, action, line, marks = {}) => steps.push({ line, title, action, parts: [{ t: "array", label: "nums", values: [...view], marks }] });

      snap("Start", `n = ${n}, k = ${k} after k % n.`, 4);

      const reverse = (lo, hi, callLine) => {
        snap(`Reverse(${lo}, ${hi})`, `Reverse this segment.`, callLine, Object.fromEntries(Array.from({ length: hi - lo + 1 }, (_, x) => [lo + x, "dep"])));
        let i = lo;
        let j = hi;
        while (i < j) {
          const t = view[i];
          view[i] = view[j];
          view[j] = t;
          snap(`Swap ${i} ↔ ${j}`, `Swap ${t} and ${view[i]}.`, 12, { [i]: "ok", [j]: "ok" });
          i++;
          j--;
        }
      };

      reverse(0, n - 1, 5);
      reverse(0, k - 1, 6);
      reverse(k, n - 1, 7);

      snap("Result", `Rotated array = [${view.join(", ")}]`, 6, Object.fromEntries(view.map((_, i) => [i, "ok"])));
      steps[steps.length - 1].parts.push({ t: "result", label: "Answer", value: `[${view.join(", ")}]` });
      return steps;
    }
  },
  {
    id: "search-rotated-sorted",
    title: "Search in Rotated Sorted Array",
    leetcode: "LeetCode #33",
    difficulty: "Medium",
    problem:
      "There is an integer array nums sorted in ascending order (with distinct values), possibly rotated at an unknown pivot. Given nums after rotation and a target, return the index of target if it is in nums, otherwise -1. You must run in O(log n) time.",
    examples: [
      { input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 0", output: "4", explanation: "0 is found at index 4." },
      { input: "nums = [4, 5, 6, 7, 0, 1, 2], target = 3", output: "-1", explanation: "3 is not in the array." }
    ],
    constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i] <= 10^4"],
    approaches: [
      {
        name: "Optimal — Modified Binary Search",
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
            if (nums[lo] <= nums[mid]) {
                if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
                else lo = mid + 1;
            } else {
                if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
                else hi = mid - 1;
            }
        }
        return -1;
    }
}`
      }
    ],
    defaultInput: { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
    dryRunInputs: [
      { nums: [4, 5, 6, 7, 0, 1, 2], target: 0 },
      { nums: [4, 5, 6, 7, 0, 1, 2], target: 3 }
    ],
    generateSteps({ nums, target }) {
      const steps = [];
      let lo = 0;
      let hi = nums.length - 1;
      const ptrs = (mid) => [
        { i: lo, label: "lo", c: "l" },
        { i: hi, label: "hi", c: "r" },
        ...(mid !== undefined ? [{ i: mid, label: "mid", c: "ok" }] : [])
      ];

      steps.push({ line: 3, title: "Set bounds", action: `lo = 0, hi = ${hi}`, parts: [{ t: "array", label: "nums", values: nums, window: [lo, hi], ptrs: ptrs() }] });

      while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        steps.push({ line: 5, title: `mid = ${mid}`, action: `value = ${nums[mid]}`, parts: [
          { t: "array", label: "nums", values: nums, window: [lo, hi], marks: { [mid]: "cur" }, ptrs: ptrs(mid) }
        ] });

        if (nums[mid] === target) {
          steps.push({ line: 6, title: "Found", action: `Return ${mid}.`, parts: [
            { t: "array", label: "nums", values: nums, marks: { [mid]: "ok" }, ptrs: [{ i: mid, label: "mid", c: "ok" }] },
            { t: "result", label: "Answer", value: String(mid) }
          ] });
          return steps;
        }

        const leftSorted = nums[lo] <= nums[mid];
        steps.push({ line: 7, title: "Which half is sorted?", action: leftSorted ? `nums[lo]=${nums[lo]} ≤ nums[mid]=${nums[mid]}, so the LEFT half is sorted.` : `nums[lo]=${nums[lo]} > nums[mid]=${nums[mid]}, so the RIGHT half is sorted.`, parts: [
          { t: "array", label: "nums", values: nums, window: [lo, hi], marks: { [mid]: "cur", ...(leftSorted ? { [lo]: "ok" } : { [hi]: "ok" }) }, ptrs: ptrs(mid) }
        ] });

        if (leftSorted) {
          const inRange = nums[lo] <= target && target < nums[mid];
          if (inRange) hi = mid - 1;
          else lo = mid + 1;
          steps.push({ line: 8, title: inRange ? "Target in left half" : "Target in right half", action: inRange ? `${target} lies in [${nums[lo]}, ${nums[mid]}), so hi = ${hi}.` : `${target} is not in the left half, so lo = ${lo}.`, parts: [
            { t: "array", label: "nums", values: nums, marks: { [mid]: "bad" }, window: [lo, hi], ptrs: ptrs() }
          ] });
        } else {
          const inRange = nums[mid] < target && target <= nums[hi];
          if (inRange) lo = mid + 1;
          else hi = mid - 1;
          steps.push({ line: 11, title: inRange ? "Target in right half" : "Target in left half", action: inRange ? `${target} lies in (${nums[mid]}, ${nums[hi]}], so lo = ${lo}.` : `${target} is not in the right half, so hi = ${hi}.`, parts: [
            { t: "array", label: "nums", values: nums, marks: { [mid]: "bad" }, window: [lo, hi], ptrs: ptrs() }
          ] });
        }
      }

      steps.push({ line: 15, title: "Not found", action: "Search range is empty — return -1.", parts: [{ t: "array", label: "nums", values: nums }, { t: "result", label: "Answer", value: "-1" }] });
      return steps;
    }
  },
  {
    id: "kth-missing-positive",
    title: "Kth Missing Positive Number",
    leetcode: "LeetCode #1539",
    difficulty: "Easy",
    problem:
      "Given an array arr of positive integers sorted in strictly increasing order and an integer k, return the k-th positive integer that is missing from this array.",
    examples: [
      { input: "arr = [2, 3, 4, 7, 11], k = 5", output: "9", explanation: "Missing positives: 1, 5, 6, 8, 9. The 5th is 9." },
      { input: "arr = [1, 2, 3, 4], k = 2", output: "6", explanation: "Missing positives: 5, 6. The 2nd is 6." }
    ],
    constraints: ["1 <= arr.length <= 1000", "1 <= arr[i] <= 1000", "1 <= k <= 1000"],
    approaches: [
      {
        name: "Optimal — Binary Search",
        kind: "optimal",
        time: "O(log n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int findKthPositive(int[] arr, int k) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int missing = arr[mid] - mid - 1;
            if (missing < k) lo = mid + 1;
            else hi = mid - 1;
        }
        return lo + k;
    }
}`
      }
    ],
    defaultInput: { arr: [2, 3, 4, 7, 11], k: 5 },
    dryRunInputs: [
      { arr: [2, 3, 4, 7, 11], k: 5 },
      { arr: [1, 2, 3, 4], k: 2 }
    ],
    generateSteps({ arr, k }) {
      const steps = [];
      let lo = 0;
      let hi = arr.length - 1;
      const ptrs = (mid) => [
        { i: lo, label: "lo", c: "l" },
        { i: hi, label: "hi", c: "r" },
        ...(mid !== undefined ? [{ i: mid, label: "mid", c: "ok" }] : [])
      ];

      steps.push({ line: 3, title: "Set bounds", action: `lo = 0, hi = ${hi}`, parts: [{ t: "array", label: "arr", values: arr, window: [lo, hi], ptrs: ptrs() }] });

      while (lo <= hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        const missing = arr[mid] - mid - 1;
        steps.push({ line: 6, title: `mid = ${mid}`, action: `missing = arr[${mid}] − ${mid} − 1 = ${arr[mid]} − ${mid} − 1 = ${missing}`, parts: [
          { t: "array", label: "arr", values: arr, window: [lo, hi], marks: { [mid]: "cur" }, ptrs: ptrs(mid) },
          { t: "vars", items: [{ k: "missing", v: missing, c: "hi" }, { k: "k", v: k }] }
        ] });

        if (missing < k) {
          lo = mid + 1;
          steps.push({ line: 7, title: "Fewer than k missing", action: `${missing} < ${k}, so move right: lo = ${lo}.`, parts: [
            { t: "array", label: "arr", values: arr, marks: { [mid]: "bad" }, window: [lo, hi], ptrs: ptrs() }
          ] });
        } else {
          hi = mid - 1;
          steps.push({ line: 8, title: "k or more missing", action: `${missing} ≥ ${k}, so move left: hi = ${hi}.`, parts: [
            { t: "array", label: "arr", values: arr, marks: { [mid]: "bad" }, window: [lo, hi], ptrs: ptrs() }
          ] });
        }
      }

      const ans = lo + k;
      steps.push({ line: 10, title: "Result", action: `lo + k = ${lo} + ${k} = ${ans}`, parts: [
        { t: "array", label: "arr", values: arr },
        { t: "result", label: "Answer", value: String(ans) }
      ] });
      return steps;
    }
  }
];
