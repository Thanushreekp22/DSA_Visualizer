export const hashingQuestions = [
  {
    id: "two-sum",
    title: "Two Sum",
    leetcode: "LeetCode #1",
    difficulty: "Easy",
    problem:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume exactly one solution exists and you may not use the same element twice.",
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9." },
      { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]", explanation: "nums[1] + nums[2] = 2 + 4 = 6." }
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "Only one valid answer exists."],
    approaches: [
      {
        name: "Brute Force — Check All Pairs",
        kind: "brute",
        time: "O(n^2)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] == target) {
                    return new int[] { i, j };
                }
            }
        }
        return new int[] {};
    }
}`
      },
      {
        name: "Optimal — Hash Map of Complements",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[] { seen.get(need), i };
            }
            seen.put(nums[i], i);
        }
        return new int[] {};
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
      const seen = {};
      const entries = [];
      let found = null;

      steps.push({ line: 3, title: "Initialize", action: `Find two numbers adding to ${target}.`, parts: [
        { t: "array", label: "nums", values: [...nums] },
        { t: "map", label: "seen (value → index)", entries: [] }
      ] });

      for (let i = 0; i < nums.length; i++) {
        const need = target - nums[i];
        steps.push({ line: 5, title: `i = ${i}, need = ${need}`, action: `${target} - ${nums[i]} = ${need}. Is ${need} already in the map?`, parts: [
          { t: "array", label: "nums", values: [...nums], marks: { [i]: "cur" }, ptrs: [{ i, label: "i", c: "cur" }] },
          { t: "map", label: "seen (value → index)", entries: [...entries], hiKey: String(need) }
        ] });

        if (Object.prototype.hasOwnProperty.call(seen, need)) {
          found = [seen[need], i];
          steps.push({ line: 7, title: "Found!", action: `seen[${need}] = ${seen[need]} and i = ${i} → [${found.join(", ")}].`, parts: [
            { t: "array", label: "nums", values: [...nums], marks: { [seen[need]]: "ok", [i]: "ok" } },
            { t: "map", label: "seen (value → index)", entries: [...entries], hiKey: String(need) },
            { t: "result", label: "Answer", value: `[${found.join(", ")}]` }
          ] });
          break;
        }

        seen[nums[i]] = i;
        entries.push([nums[i], i]);
        steps.push({ line: 9, title: `Store ${nums[i]} → ${i}`, action: `Add nums[${i}] = ${nums[i]} with index ${i} to the map.`, parts: [
          { t: "array", label: "nums", values: [...nums], marks: { [i]: "ok" } },
          { t: "map", label: "seen (value → index)", entries: [...entries], hiKey: String(nums[i]) }
        ] });
      }

      if (found) {
        steps.push({ line: 7, title: "Result", action: `Return the two indices [${found.join(", ")}].`, parts: [
          { t: "result", label: "Answer", value: `[${found.join(", ")}]` }
        ] });
      }
      return steps;
    }
  },
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    leetcode: "LeetCode #217",
    difficulty: "Easy",
    problem:
      "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    examples: [
      { input: "nums = [1, 2, 3, 1]", output: "true", explanation: "1 appears twice." },
      { input: "nums = [1, 2, 3, 4]", output: "false", explanation: "All elements are distinct." }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    approaches: [
      {
        name: "Brute Force — Compare All Pairs",
        kind: "brute",
        time: "O(n^2)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        for (int i = 0; i < nums.length; i++) {
            for (int j = i + 1; j < nums.length; j++) {
                if (nums[i] == nums[j]) return true;
            }
        }
        return false;
    }
}`
      },
      {
        name: "Optimal — HashSet",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int num : nums) {
            if (!seen.add(num)) {
                return true;
            }
        }
        return false;
    }
}`
      }
    ],
    defaultInput: { nums: [1, 2, 3, 1] },
    dryRunInputs: [
      { nums: [1, 2, 3, 1] },
      { nums: [1, 2, 3, 4] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const seen = [];
      let dup = null;

      steps.push({ line: 3, title: "Initialize", action: "An empty set tracks the values seen so far.", parts: [
        { t: "array", label: "nums", values: [...nums] },
        { t: "set", label: "seen", values: [] }
      ] });

      for (let i = 0; i < nums.length; i++) {
        const v = nums[i];
        const already = seen.includes(v);
        steps.push({ line: 5, title: `Check ${v}`, action: already ? `seen already contains ${v}.` : `seen does not contain ${v}.`, parts: [
          { t: "array", label: "nums", values: [...nums], marks: { [i]: already ? "cur" : "ok" }, ptrs: [{ i, label: "num", c: "cur" }] },
          { t: "set", label: "seen", values: [...seen], hi: already ? v : undefined }
        ] });
        if (already) {
          dup = v;
          steps.push({ line: 6, title: "Duplicate found", action: `seen.add(${v}) failed → ${v} is a duplicate.`, parts: [
            { t: "set", label: "seen", values: [...seen], hi: v },
            { t: "result", label: "containsDuplicate", value: "true" }
          ] });
          break;
        }
        seen.push(v);
        steps.push({ line: 5, title: `Add ${v}`, action: `seen.add(${v}) succeeded, so add it to the set.`, parts: [
          { t: "array", label: "nums", values: [...nums], marks: { [i]: "ok" } },
          { t: "set", label: "seen", values: [...seen], hi: v }
        ] });
      }

      if (dup === null) {
        steps.push({ line: 9, title: "Result", action: "Every value was distinct, so return false.", parts: [
          { t: "set", label: "seen", values: [...seen] },
          { t: "result", label: "containsDuplicate", value: "false" }
        ] });
      }
      return steps;
    }
  },
  {
    id: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    leetcode: "LeetCode #3",
    difficulty: "Medium",
    problem:
      "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'The answer is "abc", with length 3.' },
      { input: 's = "bbbbb"', output: "1", explanation: 'The answer is "b", with length 1.' }
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    approaches: [
      {
        name: "Optimal — Sliding Window with Hash Map",
        kind: "optimal",
        time: "O(n)",
        space: "O(min(n, k))",
        runs: true,
        javaCode: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> last = new HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (last.containsKey(c) && last.get(c) >= left) {
                left = last.get(c) + 1;
            }
            last.put(c, right);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }
}`
      }
    ],
    defaultInput: { s: "abcabcbb" },
    dryRunInputs: [
      { s: "abcabcbb" },
      { s: "bbbbb" }
    ],
    generateSteps({ s }) {
      const steps = [];
      const chars = s.split("");
      const last = {};
      const entries = [];
      let left = 0;
      let best = 0;

      steps.push({ line: 3, title: "Initialize", action: "A map tracks the last seen index of each character.", parts: [
        { t: "array", label: "s", values: [...chars] },
        { t: "map", label: "last (char → index)", entries: [] },
        { t: "vars", items: [{ k: "left", v: 0 }, { k: "best", v: 0 }] }
      ] });

      if (chars.length === 0) {
        steps.push({ line: 13, title: "Empty string", action: "The longest substring has length 0.", parts: [
          { t: "result", label: "Answer", value: 0 }
        ] });
        return steps;
      }

      for (let right = 0; right < chars.length; right++) {
        const c = chars[right];
        const repeated = Object.prototype.hasOwnProperty.call(last, c) && last[c] >= left;
        steps.push({ line: 7, title: `right = ${right}, c = '${c}'`, action: repeated ? `'${c}' was last seen at ${last[c]} (>= left = ${left}), so shrink the window.` : `'${c}' is not inside the current window.`, parts: [
          { t: "array", label: "s", values: [...chars], marks: { [right]: "cur" }, window: [left, right], ptrs: [{ i: left, label: "left", c: "l" }, { i: right, label: "right", c: "r" }] },
          { t: "map", label: "last (char → index)", entries: [...entries], hiKey: c }
        ] });

        if (repeated) {
          left = last[c] + 1;
          steps.push({ line: 8, title: "Move left", action: `left = last['${c}'] + 1 = ${left}.`, parts: [
            { t: "array", label: "s", values: [...chars], window: [left, right], marks: { [left - 1]: "bad" }, ptrs: [{ i: left, label: "left", c: "l" }, { i: right, label: "right", c: "r" }] },
            { t: "vars", items: [{ k: "left", v: left, c: "hi" }, { k: "best", v: best }] }
          ] });
        }

        last[c] = right;
        const idx = entries.findIndex((e) => e[0] === c);
        if (idx >= 0) entries[idx] = [c, right];
        else entries.push([c, right]);

        const len = right - left + 1;
        if (len > best) best = len;
        steps.push({ line: 11, title: `Update best = ${best}`, action: `Window length = ${right} - ${left} + 1 = ${len}; best becomes ${best}.`, parts: [
          { t: "array", label: "s", values: [...chars], window: [left, right], marks: { [right]: "ok" } },
          { t: "map", label: "last (char → index)", entries: [...entries], hiKey: c },
          { t: "vars", items: [{ k: "left", v: left }, { k: "best", v: best, c: "hi" }] }
        ] });
      }

      steps.push({ line: 13, title: "Result", action: `The longest substring without repeating characters has length ${best}.`, parts: [
        { t: "result", label: "Answer", value: best }
      ] });
      return steps;
    }
  },
  {
    id: "subarray-sum-equals-k",
    title: "Subarray Sum Equals K",
    leetcode: "LeetCode #560",
    difficulty: "Medium",
    problem:
      "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals k.",
    examples: [
      { input: "nums = [1, 1, 1], k = 2", output: "2", explanation: "The two subarrays [1,1] at indices (0,1) and (1,2)." },
      { input: "nums = [1, 2, 3], k = 3", output: "2", explanation: "[1,2] and [3] both sum to 3." }
    ],
    constraints: ["1 <= nums.length <= 2 * 10^4", "-1000 <= nums[i] <= 1000", "-10^7 <= k <= 10^7"],
    approaches: [
      {
        name: "Optimal — Prefix Sum + Hash Map",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefix = new HashMap<>();
        prefix.put(0, 1);
        int sum = 0, count = 0;
        for (int num : nums) {
            sum += num;
            if (prefix.containsKey(sum - k)) {
                count += prefix.get(sum - k);
            }
            prefix.put(sum, prefix.getOrDefault(sum, 0) + 1);
        }
        return count;
    }
}`
      }
    ],
    defaultInput: { nums: [1, 1, 1], k: 2 },
    dryRunInputs: [
      { nums: [1, 1, 1], k: 2 },
      { nums: [1, 2, 3], k: 3 }
    ],
    generateSteps({ nums, k }) {
      const steps = [];
      const prefix = { 0: 1 };
      let entries = [[0, 1]];
      let sum = 0;
      let count = 0;

      const mapPart = () => ({ t: "map", label: "prefix (sum → count)", entries: entries.map((e) => [e[0], e[1]]) });
      const varsPart = (hi) => ({ t: "vars", items: [
        { k: "sum", v: sum, c: hi === "sum" ? "hi" : undefined },
        { k: "target sum-k", v: sum - k },
        { k: "count", v: count, c: hi === "count" ? "hi" : undefined }
      ] });

      steps.push({ line: 4, title: "Seed the map", action: "prefix[0] = 1 counts the empty prefix, which covers subarrays starting at index 0.", parts: [
        { t: "array", label: "nums", values: [...nums] },
        mapPart(),
        varsPart()
      ] });

      for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
        steps.push({ line: 7, title: `sum += ${nums[i]} → ${sum}`, action: `Running prefix sum is now ${sum}. We need an earlier prefix equal to ${sum} - ${k} = ${sum - k}.`, parts: [
          { t: "array", label: "nums", values: [...nums], marks: { [i]: "cur" }, ptrs: [{ i, label: "num", c: "cur" }] },
          mapPart(),
          varsPart("sum")
        ] });

        const need = sum - k;
        if (Object.prototype.hasOwnProperty.call(prefix, need)) {
          count += prefix[need];
          steps.push({ line: 9, title: `${need} found ${prefix[need]} time(s)`, action: `count += ${prefix[need]} → ${count}.`, parts: [
            { t: "array", label: "nums", values: [...nums], marks: { [i]: "ok" } },
            { t: "map", label: "prefix (sum → count)", entries: entries.map((e) => [e[0], e[1]]), hiKey: need },
            varsPart("count")
          ] });
        } else {
          steps.push({ line: 9, title: `${need} not in map`, action: "No subarray ending here sums to k, so count stays the same.", parts: [
            { t: "array", label: "nums", values: [...nums] },
            mapPart(),
            varsPart()
          ] });
        }

        prefix[sum] = (prefix[sum] || 0) + 1;
        const idx = entries.findIndex((e) => e[0] === sum);
        if (idx >= 0) entries[idx] = [sum, prefix[sum]];
        else entries.push([sum, prefix[sum]]);
        steps.push({ line: 11, title: `Store prefix ${sum}`, action: `prefix[${sum}] becomes ${prefix[sum]}.`, parts: [
          { t: "map", label: "prefix (sum → count)", entries: entries.map((e) => [e[0], e[1]]), hiKey: sum },
          varsPart()
        ] });
      }

      steps.push({ line: 13, title: "Result", action: `Total subarrays whose sum equals ${k}: ${count}.`, parts: [
        { t: "result", label: "Answer", value: count }
      ] });
      return steps;
    }
  },
  {
    id: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    leetcode: "LeetCode #347",
    difficulty: "Medium",
    problem:
      "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    examples: [
      { input: "nums = [1, 1, 1, 2, 2, 3], k = 2", output: "[1, 2]", explanation: "1 appears 3 times and 2 appears 2 times, the two most frequent." },
      { input: "nums = [1], k = 1", output: "[1]", explanation: "Only one element exists." }
    ],
    constraints: ["1 <= nums.length <= 10^5", "k is in the range [1, the number of unique elements]", "The answer is guaranteed to be unique."],
    approaches: [
      {
        name: "Optimal — Hash Map + Min-Heap of size k",
        kind: "optimal",
        time: "O(n log k)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int num : nums) {
            freq.put(num, freq.getOrDefault(num, 0) + 1);
        }
        PriorityQueue<Integer> heap = new PriorityQueue<>((a, b) -> freq.get(a) - freq.get(b));
        for (int key : freq.keySet()) {
            heap.add(key);
            if (heap.size() > k) heap.poll();
        }
        int[] res = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            res[i] = heap.poll();
        }
        return res;
    }
}`
      }
    ],
    defaultInput: { nums: [1, 1, 1, 2, 2, 3], k: 2 },
    dryRunInputs: [
      { nums: [1, 1, 1, 2, 2, 3], k: 2 },
      { nums: [4, 4, 4, 5, 5, 6], k: 1 }
    ],
    generateSteps({ nums, k }) {
      const steps = [];
      const freq = {};
      for (const num of nums) freq[num] = (freq[num] || 0) + 1;
      const freqEntries = () => Object.entries(freq).map(([key, v]) => [key, v]);
      let heap = [];

      steps.push({ line: 3, title: "Count frequencies", action: "Build a map from value to how often it appears.", parts: [
        { t: "array", label: "nums", values: [...nums] },
        { t: "map", label: "freq (value → count)", entries: freqEntries() }
      ] });

      for (const key of Object.keys(freq)) {
        heap.push(Number(key));
        heap.sort((a, b) => freq[a] - freq[b]);
        let evicted = null;
        if (heap.length > k) evicted = heap.shift();
        steps.push({ line: 10, title: evicted === null ? `Push ${key}` : `Push ${key}, evict ${evicted}`, action: `Min-heap keeps at most k = ${k} elements, so the least frequent is removed.`, parts: [
          { t: "bars", label: "heap (by frequency)", values: heap.map((v) => freq[v]), marks: Object.fromEntries(heap.map((v, i) => [i, "cur"])), ptrs: heap.map((v, i) => ({ i, label: String(v), c: "cur" })) },
          { t: "map", label: "freq (value → count)", entries: freqEntries(), hiKey: key },
          { t: "set", label: "heap values", values: [...heap] }
        ] });
      }

      const res = [...heap].sort((a, b) => freq[b] - freq[a]);
      steps.push({ line: 16, title: "Result", action: `The k = ${k} most frequent elements are [${res.join(", ")}].`, parts: [
        { t: "set", label: "top k", values: res },
        { t: "result", label: "Answer", value: `[${res.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    leetcode: "LeetCode #128",
    difficulty: "Medium",
    problem:
      "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. Your algorithm must run in O(n) time.",
    examples: [
      { input: "nums = [100, 4, 200, 1, 3, 2]", output: "4", explanation: "The longest run is [1, 2, 3, 4]." },
      { input: "nums = [0, 3, 7, 2, 5, 8, 4, 6, 0, 1]", output: "9", explanation: "The sequence [0..8] has length 9." }
    ],
    constraints: ["0 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    approaches: [
      {
        name: "Optimal — HashSet + Only Start Runs",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int num : nums) set.add(num);
        int best = 0;
        for (int num : nums) {
            if (!set.contains(num - 1)) {
                int cur = num;
                int len = 1;
                while (set.contains(cur + 1)) {
                    cur++;
                    len++;
                }
                best = Math.max(best, len);
            }
        }
        return best;
    }
}`
      }
    ],
    defaultInput: { nums: [100, 4, 200, 1, 3, 2] },
    dryRunInputs: [
      { nums: [100, 4, 200, 1, 3, 2] },
      { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const setValues = [...new Set(nums)].sort((a, b) => a - b);
      const set = new Set(nums);
      let best = 0;
      let run = [];

      steps.push({ line: 3, title: "Build the set", action: "Put every number into a hash set for O(1) lookups.", parts: [
        { t: "array", label: "nums", values: [...nums] },
        { t: "set", label: "set (sorted for display)", values: setValues }
      ] });

      for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const isStart = !set.has(num - 1);
        steps.push({ line: 7, title: `num = ${num}`, action: isStart ? `${num - 1} is not in the set, so ${num} starts a run.` : `${num - 1} is present, so skip ${num} (it is not a run start).`, parts: [
          { t: "array", label: "nums", values: [...nums], marks: { [i]: "cur" }, ptrs: [{ i, label: "num", c: "cur" }] },
          { t: "set", label: "set", values: setValues, hi: num },
          { t: "vars", items: [{ k: "num-1", v: num - 1 }, { k: "best", v: best, c: "hi" }] }
        ] });

        if (!isStart) continue;

        let cur = num;
        let len = 1;
        run = [cur];
        while (set.has(cur + 1)) {
          cur += 1;
          len += 1;
          run.push(cur);
          steps.push({ line: 11, title: `${cur - 1} + 1 = ${cur} exists`, action: `Extend the run to length ${len}.`, parts: [
            { t: "set", label: "set", values: setValues, hi: cur },
            { t: "set", label: "current run", values: [...run] },
            { t: "vars", items: [{ k: "cur", v: cur, c: "cur" }, { k: "len", v: len, c: "hi" }] }
          ] });
        }
        const prevBest = best;
        if (len > best) best = len;
        steps.push({ line: 14, title: `Longest run from ${num} = ${len}`, action: `best = max(${prevBest}, ${len}) → ${best}.`, parts: [
          { t: "set", label: "current run", values: run },
          { t: "vars", items: [{ k: "len", v: len }, { k: "best", v: best, c: "hi" }] }
        ] });
      }

      steps.push({ line: 17, title: "Result", action: `The longest consecutive sequence has length ${best}.`, parts: [
        { t: "result", label: "Answer", value: best }
      ] });
      return steps;
    }
  },
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    leetcode: "LeetCode #49",
    difficulty: "Medium",
    problem:
      "Given an array of strings strs, group the anagrams together. You can return the answer in any order. An anagram is a word formed by rearranging the letters of another word.",
    examples: [
      { input: 'strs = ["eat", "tea", "tan", "ate", "nat", "bat"]', output: '[["eat","tea","ate"], ["tan","nat"], ["bat"]]', explanation: "Words sharing the same sorted letters are grouped." },
      { input: 'strs = [""]', output: '[[""]]', explanation: "A single empty string forms one group." }
    ],
    constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters."],
    approaches: [
      {
        name: "Optimal — Sorted String Key",
        kind: "optimal",
        time: "O(n · k log k)",
        space: "O(n · k)",
        runs: true,
        javaCode: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(groups.values());
    }
}`
      }
    ],
    defaultInput: { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] },
    dryRunInputs: [
      { strs: ["eat", "tea", "tan", "ate", "nat", "bat"] },
      { strs: ["abc", "bca", "cab", "xyz"] }
    ],
    generateSteps({ strs }) {
      const steps = [];
      const groups = {};
      const order = [];
      const entries = () => order.map((k) => [k, groups[k].join(", ")]);

      steps.push({ line: 3, title: "Initialize", action: "The key of a group is its letters sorted alphabetically.", parts: [
        { t: "array", label: "strs", values: [...strs] },
        { t: "map", label: "groups (key → words)", entries: [] }
      ] });

      for (let i = 0; i < strs.length; i++) {
        const s = strs[i];
        const key = s.split("").sort().join("");
        steps.push({ line: 7, title: `key("${s}") = "${key}"`, action: `Sorting the letters of "${s}" gives the hash key "${key}".`, parts: [
          { t: "array", label: "strs", values: [...strs], marks: { [i]: "cur" }, ptrs: [{ i, label: "s", c: "cur" }] },
          { t: "map", label: "groups (key → words)", entries: entries(), hiKey: key }
        ] });

        if (!groups[key]) {
          groups[key] = [];
          order.push(key);
        }
        groups[key].push(s);
        steps.push({ line: 8, title: `Add "${s}" to group "${key}"`, action: `Group "${key}" now holds [${groups[key].join(", ")}].`, parts: [
          { t: "array", label: "strs", values: [...strs], marks: { [i]: "ok" } },
          { t: "map", label: "groups (key → words)", entries: entries(), hiKey: key }
        ] });
      }

      const result = order.map((k) => `[${groups[k].join(", ")}]`).join("  ");
      steps.push({ line: 10, title: "Result", action: `Groups: ${result}`, parts: [
        { t: "map", label: "groups (key → words)", entries: entries() },
        { t: "result", label: "Answer", value: result }
      ] });
      return steps;
    }
  }
];

