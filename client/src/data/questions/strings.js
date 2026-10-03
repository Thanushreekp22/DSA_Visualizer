export const stringsQuestions = [
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    leetcode: "LeetCode #242",
    difficulty: "Easy",
    problem:
      "Given two strings s and t, return true if t is an anagram of s. An anagram is a word formed by rearranging the letters of another, using all the original letters exactly once.",
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: "true", explanation: "Same letters with the same frequencies." },
      { input: 's = "rat", t = "car"', output: "false", explanation: "Different letter frequencies." }
    ],
    constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."],
    approaches: [
      {
        name: "Optimal — Frequency Count",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] count = new int[26];
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        for (int c : count) if (c != 0) return false;
        return true;
    }
}`
      }
    ],
    defaultInput: { s: "anagram", t: "nagaram" },
    dryRunInputs: [
      { s: "anagram", t: "nagaram" },
      { s: "rat", t: "car" }
    ],
    generateSteps({ s, t }) {
      const steps = [];
      const count = {};
      const bump = (ch, d) => { count[ch] = (count[ch] || 0) + d; };
      const entries = () => Object.entries(count).filter(([, v]) => v !== 0);

      if (s.length !== t.length) {
        steps.push({ line: 3, title: "Length mismatch", action: `${s.length} ≠ ${t.length}, so return false.`, parts: [{ t: "vars", items: [{ k: "s", v: s }, { k: "t", v: t }] }, { t: "result", label: "Answer", value: "false" }] });
        return steps;
      }

      steps.push({ line: 4, title: "Create count array", action: "A 26-slot array tracks letter frequencies.", parts: [{ t: "map", label: "count", entries: [] }] });

      for (let i = 0; i < s.length; i++) {
        bump(s[i], 1);
        steps.push({ line: 6, title: `s[${i}] = ${s[i]}`, action: `Increment ${s[i]} → count[${s[i]}] = ${count[s[i]]}`, parts: [
          { t: "vars", items: [{ k: "s char", v: s[i], c: "ok" }] },
          { t: "map", label: "count", entries: entries(), hiKey: s[i] }
        ] });
        bump(t[i], -1);
        steps.push({ line: 7, title: `t[${i}] = ${t[i]}`, action: `Decrement ${t[i]} → count[${t[i]}] = ${count[t[i]]}`, parts: [
          { t: "vars", items: [{ k: "t char", v: t[i], c: "bad" }] },
          { t: "map", label: "count", entries: entries(), hiKey: t[i] }
        ] });
      }

      const allZero = entries().length === 0;
      steps.push({ line: 9, title: "Check frequencies", action: allZero ? "Every count is zero — the letters match." : `Non-zero counts remain: ${entries().map(([k, v]) => `${k}:${v}`).join(", ")}`, parts: [
        { t: "map", label: "count", entries: entries() },
        { t: "result", label: "Answer", value: String(allZero) }
      ] });
      return steps;
    }
  },
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    leetcode: "LeetCode #125",
    difficulty: "Easy",
    problem:
      "A phrase is a palindrome if, after converting uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string s, return true if it is a palindrome.",
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" reads the same both ways.' },
      { input: 's = "race a car"', output: "false", explanation: '"raceacar" is not the same backwards.' }
    ],
    constraints: ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters."],
    approaches: [
      {
        name: "Optimal — Two Pointers",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) return false;
            left++;
            right--;
        }
        return true;
    }
}`
      }
    ],
    defaultInput: { s: "A man, a plan, a canal: Panama" },
    dryRunInputs: [
      { s: "A man, a plan, a canal: Panama" },
      { s: "race a car" }
    ],
    generateSteps({ s }) {
      const steps = [];
      const alnum = (ch) => /[a-z0-9]/i.test(ch);
      let left = 0;
      let right = s.length - 1;
      const view = s.split("");
      const ptrs = () => [{ i: left, label: "left", c: "l" }, { i: right, label: "right", c: "r" }];

      steps.push({ line: 2, title: "Set pointers", action: `left = 0, right = ${right}`, parts: [{ t: "array", label: "chars", values: view, ptrs: ptrs() }] });

      while (left < right) {
        while (left < right && !alnum(s[left])) {
          const skipped = s[left];
          left++;
          steps.push({ line: 5, title: "Skip non-alphanumeric", action: `'${skipped}' is skipped, left → ${left}.`, parts: [{ t: "array", label: "chars", values: view, marks: { [left - 1]: "bad" }, ptrs: ptrs() }] });
        }
        while (left < right && !alnum(s[right])) {
          const skipped = s[right];
          right--;
          steps.push({ line: 6, title: "Skip non-alphanumeric", action: `'${skipped}' is skipped, right → ${right}.`, parts: [{ t: "array", label: "chars", values: view, marks: { [right + 1]: "bad" }, ptrs: ptrs() }] });
        }

        const a = s[left].toLowerCase();
        const b = s[right].toLowerCase();
        const same = a === b;
        steps.push({ line: 7, title: `Compare '${a}' and '${b}'`, action: same ? "They match — move both pointers inward." : "They differ — not a palindrome.", parts: [
          { t: "array", label: "chars", values: view, marks: { [left]: same ? "ok" : "bad", [right]: same ? "ok" : "bad" }, ptrs: ptrs() },
          { t: "vars", items: [{ k: "left", v: a }, { k: "right", v: b, c: same ? "ok" : "bad" }] }
        ] });

        if (!same) {
          steps.push({ line: 7, title: "Return false", action: "The two characters do not match.", parts: [{ t: "result", label: "Answer", value: "false" }] });
          return steps;
        }
        left++;
        right--;
      }

      steps.push({ line: 11, title: "Result", action: "All pairs matched — it is a palindrome.", parts: [{ t: "array", label: "chars", values: view }, { t: "result", label: "Answer", value: "true" }] });
      return steps;
    }
  },
  {
    id: "first-unique-character",
    title: "First Unique Character in a String",
    leetcode: "LeetCode #387",
    difficulty: "Easy",
    problem:
      "Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.",
    examples: [
      { input: 's = "leetcode"', output: "0", explanation: '"l" appears once and is the first such character.' },
      { input: 's = "loveleetcode"', output: "2", explanation: '"l" repeats, "o" repeats, "v" is the first unique.' }
    ],
    constraints: ["1 <= s.length <= 10^5", "s consists of only English letters."],
    approaches: [
      {
        name: "Optimal — Two Pass Count",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int firstUniqChar(String s) {
        int[] count = new int[26];
        for (char c : s.toCharArray()) count[c - 'a']++;
        for (int i = 0; i < s.length(); i++) {
            if (count[s.charAt(i) - 'a'] == 1) return i;
        }
        return -1;
    }
}`
      }
    ],
    defaultInput: { s: "loveleetcode" },
    dryRunInputs: [
      { s: "leetcode" },
      { s: "loveleetcode" }
    ],
    generateSteps({ s }) {
      const steps = [];
      const count = {};

      steps.push({ line: 3, title: "Create count array", action: "Count the frequency of every letter.", parts: [{ t: "map", label: "count", entries: [] }] });

      for (const ch of s) {
        count[ch] = (count[ch] || 0) + 1;
        steps.push({ line: 4, title: `Count '${ch}'`, action: `count[${ch}] → ${count[ch]}`, parts: [
          { t: "map", label: "count", entries: Object.entries(count), hiKey: ch }
        ] });
      }

      const view = s.split("");
      for (let i = 0; i < s.length; i++) {
        const uniq = count[s[i]] === 1;
        steps.push({ line: 6, title: `Check index ${i} → '${s[i]}'`, action: uniq ? `count[${s[i]}] = 1, so it is unique!` : `count[${s[i]}] = ${count[s[i]]}, so it repeats.`, parts: [
          { t: "array", label: "chars", values: view, marks: { [i]: uniq ? "ok" : "bad" }, ptrs: [{ i, label: "i", c: uniq ? "ok" : "cur" }] },
          { t: "map", label: "count", entries: Object.entries(count), hiKey: s[i] }
        ] });
        if (uniq) {
          steps.push({ line: 6, title: "Return index", action: `The first unique character is at index ${i}.`, parts: [
            { t: "array", label: "chars", values: view, marks: { [i]: "ok" } },
            { t: "result", label: "Answer", value: String(i) }
          ] });
          return steps;
        }
      }

      steps.push({ line: 8, title: "No unique character", action: "Every character repeats, so return -1.", parts: [{ t: "map", label: "count", entries: Object.entries(count) }, { t: "result", label: "Answer", value: "-1" }] });
      return steps;
    }
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    leetcode: "LeetCode #344",
    difficulty: "Easy",
    problem:
      "Write a function that reverses a input array of characters s. Do not allocate extra space for another array — you must do this by modifying the input array in place with O(1) extra memory.",
    examples: [
      { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: "The characters are reversed in place." },
      { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]', explanation: "A palindrome stays the same." }
    ],
    constraints: ["1 <= s.length <= 10^5", "s[i] is a printable ASCII character."],
    approaches: [
      {
        name: "Optimal — Two Pointers Swap",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char t = s[left];
            s[left] = s[right];
            s[right] = t;
            left++;
            right--;
        }
    }
}`
      }
    ],
    defaultInput: { s: ["h", "e", "l", "l", "o"] },
    dryRunInputs: [
      { s: ["h", "e", "l", "l", "o"] },
      { s: ["H", "a", "n", "n", "a", "h"] }
    ],
    generateSteps({ s }) {
      const steps = [];
      const view = [...s];
      let left = 0;
      let right = view.length - 1;
      const ptrs = () => [{ i: left, label: "left", c: "l" }, { i: right, label: "right", c: "r" }];

      steps.push({ line: 3, title: "Set pointers", action: `left = 0, right = ${right}`, parts: [{ t: "array", label: "chars", values: view, ptrs: ptrs() }] });

      while (left < right) {
        const t = view[left];
        view[left] = view[right];
        view[right] = t;
        steps.push({ line: 6, title: `Swap ${left} ↔ ${right}`, action: `Swap '${t}' and '${view[left]}'`, parts: [
          { t: "array", label: "chars", values: view, marks: { [left]: "ok", [right]: "ok" }, ptrs: ptrs() }
        ] });
        left++;
        right--;
        steps.push({ line: 8, title: "Move pointers inward", action: `left → ${left}, right → ${right}`, parts: [
          { t: "array", label: "chars", values: view, ptrs: ptrs() }
        ] });
      }

      steps.push({ line: 10, title: "Result", action: `Reversed = [${view.join(", ")}]`, parts: [
        { t: "array", label: "chars", values: view, marks: Object.fromEntries(view.map((_, i) => [i, "ok"])) },
        { t: "result", label: "Answer", value: `[${view.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "jewels-and-stones",
    title: "Jewels and Stones",
    leetcode: "LeetCode #771",
    difficulty: "Easy",
    problem:
      "You are given a string jewels representing the types of stones that are jewels, and a string stones representing the stones you have. Each character in stones is a type of stone you have. Return how many of the stones you have are also jewels.",
    examples: [
      { input: 'jewels = "aA", stones = "aAAbbbb"', output: "3", explanation: "'a' and 'A' are jewels; 3 stones match." },
      { input: 'jewels = "z", stones = "ZZ"', output: "0", explanation: "No stone is a jewel." }
    ],
    constraints: ["1 <= jewels.length, stones.length <= 50", "jewels and stones consist of only English letters."],
    approaches: [
      {
        name: "Optimal — HashSet Lookup",
        kind: "optimal",
        time: "O(n + m)",
        space: "O(k)",
        runs: true,
        javaCode: `class Solution {
    public int numJewelsInStones(String jewels, String stones) {
        Set<Character> set = new HashSet<>();
        for (char c : jewels.toCharArray()) set.add(c);
        int count = 0;
        for (char c : stones.toCharArray()) if (set.contains(c)) count++;
        return count;
    }
}`
      }
    ],
    defaultInput: { jewels: "aA", stones: "aAAbbbb" },
    dryRunInputs: [
      { jewels: "aA", stones: "aAAbbbb" },
      { jewels: "z", stones: "ZZ" }
    ],
    generateSteps({ jewels, stones }) {
      const steps = [];
      const set = new Set();

      steps.push({ line: 3, title: "Create a set", action: "Store the jewel types for O(1) lookup.", parts: [{ t: "set", label: "jewels set", values: [] }] });

      for (const ch of jewels) {
        set.add(ch);
        steps.push({ line: 4, title: `Add jewel '${ch}'`, action: `The set now holds: ${[...set].join(", ")}`, parts: [{ t: "set", label: "jewels set", values: [...set], hi: ch }] });
      }

      let count = 0;
      const view = stones.split("");
      for (let i = 0; i < stones.length; i++) {
        const ch = stones[i];
        const isJewel = set.has(ch);
        if (isJewel) count++;
        steps.push({ line: 6, title: `Stone '${ch}' ${isJewel ? "IS a jewel" : "is not a jewel"}`, action: isJewel ? `count → ${count}` : "Not in the set, skip.", parts: [
          { t: "array", label: "stones", values: view, marks: { [i]: isJewel ? "ok" : "bad" }, ptrs: [{ i, label: "i", c: isJewel ? "ok" : "cur" }] },
          { t: "set", label: "jewels set", values: [...set], hi: isJewel ? ch : undefined },
          { t: "vars", items: [{ k: "count", v: count, c: isJewel ? "ok" : "hi" }] }
        ] });
      }

      steps.push({ line: 7, title: "Result", action: `You have ${count} jewel stones.`, parts: [
        { t: "set", label: "jewels set", values: [...set] },
        { t: "result", label: "Answer", value: String(count) }
      ] });
      return steps;
    }
  }
];

