export const slidingWindowQuestions = [
  {
    id: "max-average-subarray-i",
    title: "Maximum Average Subarray I",
    leetcode: "LeetCode #643",
    difficulty: "Easy",
    problem:
      "You are given an integer array nums consisting of n elements and an integer k. Find a contiguous subarray of length k that has the maximum average value and return that value.",
    examples: [
      { input: "nums = [1, 12, -5, -6, 50], k = 3", output: "53.33333", explanation: "The subarray [12, -5, -6] has the maximum average." },
      { input: "nums = [5], k = 1", output: "5.00000", explanation: "The only subarray has average 5." }
    ],
    constraints: ["n == nums.length", "1 <= k <= n <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    approaches: [
      {
        name: "Optimal — Fixed Sliding Window",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public double findMaxAverage(int[] nums, int k) {
        double windowSum = 0;
        for (int i = 0; i < k; i++) windowSum += nums[i];
        double best = windowSum;
        for (int i = k; i < nums.length; i++) {
            windowSum += nums[i] - nums[i - k];
            best = Math.max(best, windowSum);
        }
        return best / k;
    }
}`
      }
    ],
    defaultInput: { nums: [1, 12, -5, -6, 50], k: 3 },
    dryRunInputs: [
      { nums: [1, 12, -5, -6, 50], k: 3 },
      { nums: [5], k: 1 }
    ],
    generateSteps({ nums, k }) {
      const steps = [];
      if (k > nums.length) k = nums.length;
      let windowSum = 0;
      for (let i = 0; i < k; i++) windowSum += nums[i];
      let best = windowSum;
      const win = [0, k - 1];

      steps.push({ line: 4, title: "Build first window", action: `First window [0..${k - 1}] sum = ${windowSum}`, parts: [
        { t: "array", label: "nums", values: nums, window: win, marks: Object.fromEntries(Array.from({ length: k }, (_, x) => [x, "cur"])) },
        { t: "vars", items: [{ k: "windowSum", v: windowSum, c: "hi" }, { k: "best", v: best, c: "ok" }] }
      ] });

      for (let i = k; i < nums.length; i++) {
        windowSum += nums[i] - nums[i - k];
        const w = [i - k + 1, i];
        steps.push({ line: 7, title: `Slide to [${w[0]}..${w[1]}]`, action: `Add ${nums[i]}, remove ${nums[i - k]} → windowSum = ${windowSum}`, parts: [
          { t: "array", label: "nums", values: nums, window: w, marks: { [i]: "ok", [i - k]: "bad" }, ptrs: [{ i, label: "in", c: "ok" }, { i: i - k, label: "out", c: "r" }] },
          { t: "vars", items: [{ k: "windowSum", v: windowSum, c: "hi" }] }
        ] });

        const improved = windowSum > best;
        best = Math.max(best, windowSum);
        steps.push({ line: 8, title: "Update best", action: improved ? `New best sum ${best}!` : `Best stays ${best}.`, parts: [
          { t: "array", label: "nums", values: nums, window: w },
          { t: "vars", items: [{ k: "windowSum", v: windowSum }, { k: "best", v: best, c: improved ? "ok" : "hi" }] }
        ] });
      }

      const avg = best / k;
      steps.push({ line: 10, title: "Result", action: `${best} ÷ ${k} = ${avg.toFixed(5)}`, parts: [
        { t: "vars", items: [{ k: "best", v: best }, { k: "k", v: k }] },
        { t: "result", label: "Answer", value: avg.toFixed(5) }
      ] });
      return steps;
    }
  },
  {
    id: "subarray-product-less-than-k",
    title: "Subarray Product Less Than K",
    leetcode: "LeetCode #713",
    difficulty: "Medium",
    problem:
      "Given an array of integers nums and an integer k, return the number of contiguous subarrays where the product of all the elements is strictly less than k.",
    examples: [
      { input: "nums = [10, 5, 2, 6], k = 100", output: "8", explanation: "There are 8 subarrays with product < 100." },
      { input: "nums = [1, 2, 3], k = 0", output: "0", explanation: "No product can be less than 0." }
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4", "1 <= nums[i] <= 1000", "0 <= k <= 10^6"],
    approaches: [
      {
        name: "Optimal — Sliding Window",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int numSubarrayProductLessThanK(int[] nums, int k) {
        if (k <= 1) return 0;
        int product = 1, count = 0, left = 0;
        for (int right = 0; right < nums.length; right++) {
            product *= nums[right];
            while (product >= k && left <= right) product /= nums[left++];
            count += right - left + 1;
        }
        return count;
    }
}`
      }
    ],
    defaultInput: { nums: [10, 5, 2, 6], k: 100 },
    dryRunInputs: [
      { nums: [10, 5, 2, 6], k: 100 },
      { nums: [1, 2, 3], k: 0 }
    ],
    generateSteps({ nums, k }) {
      const steps = [];
      if (k <= 1) {
        steps.push({ line: 3, title: "k <= 1", action: "No subarray product can be less than k.", parts: [{ t: "result", label: "Answer", value: "0" }] });
        return steps;
      }
      let product = 1;
      let count = 0;
      let left = 0;

      for (let right = 0; right < nums.length; right++) {
        product *= nums[right];
        let w = [left, right];
        steps.push({ line: 6, title: `right = ${right}`, action: `Multiply by ${nums[right]} → product = ${product}`, parts: [
          { t: "array", label: "nums", values: nums, window: w, marks: { [right]: "cur" }, ptrs: [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }] },
          { t: "vars", items: [{ k: "product", v: product, c: "hi" }, { k: "count", v: count }] }
        ] });

        while (product >= k && left <= right) {
          product = product / nums[left];
          left++;
          steps.push({ line: 7, title: "Shrink window", action: `Product ≥ ${k}, so move left to ${left} → product = ${product}`, parts: [
            { t: "array", label: "nums", values: nums, window: [left, right], marks: { [left - 1]: "bad" }, ptrs: [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }] },
            { t: "vars", items: [{ k: "product", v: product, c: "ok" }] }
          ] });
        }

        const added = right - left + 1;
        count += added;
        steps.push({ line: 8, title: "Count subarrays", action: `Window [${left}..${right}] gives ${added} subarrays → count = ${count}`, parts: [
          { t: "array", label: "nums", values: nums, window: [left, right], ptrs: [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }] },
          { t: "vars", items: [{ k: "count", v: count, c: "ok" }] }
        ] });
      }

      steps.push({ line: 10, title: "Result", action: `${count} subarrays have product < ${k}.`, parts: [{ t: "result", label: "Answer", value: String(count) }] });
      return steps;
    }
  },
  {
    id: "permutation-in-string",
    title: "Permutation in String",
    leetcode: "LeetCode #567",
    difficulty: "Medium",
    problem:
      "Given two strings s1 and s2, return true if s2 contains a permutation of s1. In other words, return true if one of s1's permutations is a substring of s2.",
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: "true", explanation: '"ba" is a permutation of "ab" and appears in s2.' },
      { input: 's1 = "ab", s2 = "eidboaoo"', output: "false", explanation: "No window in s2 is a permutation of s1." }
    ],
    constraints: ["1 <= s1.length, s2.length <= 10^4", "s1 and s2 consist of lowercase English letters."],
    approaches: [
      {
        name: "Optimal — Sliding Window + Frequency",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        int[] need = new int[26];
        int[] win = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            need[s1.charAt(i) - 'a']++;
            win[s2.charAt(i) - 'a']++;
        }
        int left = 0;
        for (int right = s1.length(); right < s2.length(); right++) {
            if (matches(need, win)) return true;
            win[s2.charAt(right) - 'a']++;
            win[s2.charAt(left) - 'a']--;
            left++;
        }
        return matches(need, win);
    }

    private boolean matches(int[] a, int[] b) {
        for (int i = 0; i < 26; i++) {
            if (a[i] != b[i]) return false;
        }
        return true;
    }
}`
      }
    ],
    defaultInput: { s1: "ab", s2: "eidbaooo" },
    dryRunInputs: [
      { s1: "ab", s2: "eidbaooo" },
      { s1: "ab", s2: "eidboaoo" }
    ],
    generateSteps({ s1, s2 }) {
      const steps = [];
      const n = s1.length;
      if (n > s2.length) {
        steps.push({ line: 3, title: "Too short", action: "s1 is longer than s2, so return false.", parts: [{ t: "result", label: "Answer", value: "false" }] });
        return steps;
      }
      const need = {};
      const win = {};
      const bump = (m, ch, d) => { m[ch] = (m[ch] || 0) + d; if (m[ch] === 0) delete m[ch]; };
      const view = s2.split("");

      for (let i = 0; i < n; i++) {
        bump(need, s1[i], 1);
        bump(win, s2[i], 1);
      }
      steps.push({ line: 9, title: "Initial window", action: `Window [0..${n - 1}] = "${s2.slice(0, n)}"`, parts: [
        { t: "array", label: "s2", values: view, window: [0, n - 1] },
        { t: "map", label: "need (s1)", entries: Object.entries(need) },
        { t: "map", label: "window", entries: Object.entries(win) }
      ] });

      let left = 0;
      for (let right = n; right <= s2.length; right++) {
        const same = JSON.stringify(Object.entries(need).sort()) === JSON.stringify(Object.entries(win).sort());
        steps.push({ line: 11, title: "Compare frequencies", action: same ? "The window is an exact permutation of s1!" : "The frequencies do not match yet.", parts: [
          { t: "array", label: "s2", values: view, window: [left, right - 1] },
          { t: "map", label: "need (s1)", entries: Object.entries(need), hiKey: same ? undefined : Object.entries(need).find(([k]) => (win[k] || 0) !== need[k])?.[0] },
          { t: "map", label: "window", entries: Object.entries(win) },
          { t: "result", label: "Match", value: String(same) }
        ] });
        if (same) return steps;
        if (right === s2.length) break;
        bump(win, s2[right], 1);
        bump(win, s2[left], -1);
        left++;
        steps.push({ line: 13, title: `Slide window to [${left}..${right}]`, action: `Add '${s2[right]}', remove '${s2[right - n]}'`, parts: [
          { t: "array", label: "s2", values: view, window: [left, right], marks: { [right]: "ok", [right - n]: "bad" } },
          { t: "map", label: "window", entries: Object.entries(win), hiKey: s2[right] }
        ] });
      }

      steps.push({ line: 17, title: "No permutation found", action: "Every window was checked without a match.", parts: [{ t: "result", label: "Answer", value: "false" }] });
      return steps;
    }
  },
  {
    id: "longest-repeating-replacement",
    title: "Longest Repeating Character Replacement",
    leetcode: "LeetCode #424",
    difficulty: "Medium",
    problem:
      "You are given a string s and an integer k. You may change any character to any other uppercase English letter. Return the length of the longest substring containing the same letter you can get after performing at most k replacements.",
    examples: [
      { input: 's = "AABABBA", k = 1', output: "4", explanation: "Replace one 'A' to get four matching letters in a row." },
      { input: 's = "ABAB", k = 2', output: "4", explanation: "Replace all letters with one character." }
    ],
    constraints: ["1 <= s.length <= 10^5", "s consists of uppercase English letters", "0 <= k <= s.length"],
    approaches: [
      {
        name: "Optimal — Sliding Window",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] count = new int[26];
        int left = 0, maxCount = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            maxCount = Math.max(maxCount, ++count[s.charAt(right) - 'a']);
            while (right - left + 1 - maxCount > k) {
                count[s.charAt(left) - 'a']--;
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`
      }
    ],
    defaultInput: { s: "AABABBA", k: 1 },
    dryRunInputs: [
      { s: "AABABBA", k: 1 },
      { s: "ABAB", k: 2 }
    ],
    generateSteps({ s, k }) {
      const steps = [];
      const count = {};
      let left = 0;
      let maxCount = 0;
      let best = 0;
      const view = s.split("");
      const entries = () => Object.entries(count).filter(([, v]) => v > 0);

      for (let right = 0; right < s.length; right++) {
        count[s[right]] = (count[s[right]] || 0) + 1;
        maxCount = Math.max(maxCount, count[s[right]]);
        steps.push({ line: 6, title: `right = ${right} → '${s[right]}'`, action: `Most common letter in the window now appears ${maxCount} times.`, parts: [
          { t: "array", label: "s", values: view, window: [left, right], marks: { [right]: "cur" }, ptrs: [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }] },
          { t: "map", label: "counts", entries: entries(), hiKey: s[right] }
        ] });

        while (right - left + 1 - maxCount > k) {
          count[s[left]]--;
          left++;
          steps.push({ line: 9, title: "Shrink window", action: `Needs more than ${k} changes, move left to ${left}.`, parts: [
            { t: "array", label: "s", values: view, window: [left, right], marks: { [left - 1]: "bad" }, ptrs: [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }] },
            { t: "map", label: "counts", entries: entries() }
          ] });
        }

        const len = right - left + 1;
        best = Math.max(best, len);
        steps.push({ line: 11, title: "Update best", action: `Window length ${len}, best = ${best}`, parts: [
          { t: "array", label: "s", values: view, window: [left, right] },
          { t: "vars", items: [{ k: "best", v: best, c: "ok" }, { k: "maxCount", v: maxCount }] }
        ] });
      }

      steps.push({ line: 13, title: "Result", action: `The longest valid substring has length ${best}.`, parts: [{ t: "result", label: "Answer", value: String(best) }] });
      return steps;
    }
  },
  {
    id: "fruit-into-baskets",
    title: "Fruit Into Baskets",
    leetcode: "LeetCode #904",
    difficulty: "Medium",
    problem:
      "You are given an array fruits where fruits[i] is the type of fruit the i-th tree produces. You have two baskets, each holding one type of fruit, and you must pick from contiguous trees. Return the maximum number of fruits you can collect.",
    examples: [
      { input: "fruits = [1, 2, 1]", output: "3", explanation: "Pick all three trees using types {1, 2}." },
      { input: "fruits = [0, 1, 2, 2]", output: "3", explanation: "Pick the last three trees [1, 2, 2]." }
    ],
    constraints: ["1 <= fruits.length <= 10^5", "0 <= fruits[i] < fruits.length"],
    approaches: [
      {
        name: "Optimal — Sliding Window (max 2 types)",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int totalFruit(int[] fruits) {
        Map<Integer, Integer> basket = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < fruits.length; right++) {
            basket.put(fruits[right], basket.getOrDefault(fruits[right], 0) + 1);
            while (basket.size() > 2) {
                int out = fruits[left];
                basket.put(out, basket.get(out) - 1);
                if (basket.get(out) == 0) basket.remove(out);
                left++;
            }
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`
      }
    ],
    defaultInput: { fruits: [1, 2, 1] },
    dryRunInputs: [
      { fruits: [1, 2, 1] },
      { fruits: [0, 1, 2, 2] }
    ],
    generateSteps({ fruits }) {
      const steps = [];
      const basket = {};
      let left = 0;
      let best = 0;

      for (let right = 0; right < fruits.length; right++) {
        basket[fruits[right]] = (basket[fruits[right]] || 0) + 1;
        steps.push({ line: 6, title: `Pick tree ${right} (type ${fruits[right]})`, action: `Basket holds ${Object.keys(basket).length} type(s).`, parts: [
          { t: "array", label: "fruits", values: fruits, window: [left, right], marks: { [right]: "cur" }, ptrs: [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }] },
          { t: "map", label: "basket", entries: Object.entries(basket), hiKey: String(fruits[right]) }
        ] });

        while (Object.keys(basket).length > 2) {
          const out = fruits[left];
          basket[out]--;
          if (basket[out] === 0) delete basket[out];
          left++;
          steps.push({ line: 9, title: "Remove a type", action: `Over 2 types — drop type ${out}. left → ${left}.`, parts: [
            { t: "array", label: "fruits", values: fruits, window: [left, right], marks: { [left - 1]: "bad" }, ptrs: [{ i: left, label: "L", c: "l" }, { i: right, label: "R", c: "r" }] },
            { t: "map", label: "basket", entries: Object.entries(basket) }
          ] });
        }

        const len = right - left + 1;
        best = Math.max(best, len);
        steps.push({ line: 13, title: "Update best", action: `Window of ${len} fruits → best = ${best}`, parts: [
          { t: "array", label: "fruits", values: fruits, window: [left, right] },
          { t: "vars", items: [{ k: "best", v: best, c: "ok" }] }
        ] });
      }

      steps.push({ line: 15, title: "Result", action: `Maximum fruits collected = ${best}.`, parts: [{ t: "result", label: "Answer", value: String(best) }] });
      return steps;
    }
  }
];

