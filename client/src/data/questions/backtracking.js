export const backtrackingQuestions = [
  {
    id: "subsets",
    title: "Subsets",
    leetcode: "LeetCode #78",
    difficulty: "Medium",
    problem:
      "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets. Return the solution in any order.",
    examples: [
      { input: "nums = [1, 2, 3]", output: "[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]", explanation: "All 2^3 = 8 subsets." },
      { input: "nums = [0]", output: "[[], [0]]", explanation: "Just the empty set and {0}." }
    ],
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All the numbers of nums are unique."],
    approaches: [
      {
        name: "Optimal — Backtracking",
        kind: "optimal",
        time: "O(n · 2^n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        result.add(new ArrayList<>(path));
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);
            backtrack(nums, i + 1, path, result);
            path.remove(path.size() - 1);
        }
    }
}`
      }
    ],
    defaultInput: { nums: [1, 2, 3] },
    dryRunInputs: [
      { nums: [1, 2, 3] },
      { nums: [0, 5] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const path = [];
      const result = [];

      const arrayPart = (curIdx) => ({
        t: "array",
        label: "nums",
        values: [...nums],
        marks: Object.fromEntries(path.map((v) => [nums.indexOf(v), "ok"]).concat(curIdx != null ? [[curIdx, "cur"]] : []))
      });
      const subsetPart = () => ({ t: "set", label: "current subset", values: [...path] });
      const resultPart = () => ({ t: "text", value: result.length ? result.map((s) => `{${s.join(",")}}`).join("  ") : "(none yet)" });

      steps.push({ line: 4, title: "Start backtracking", action: "At every node of the decision tree, record the current subset.", parts: [
        arrayPart(),
        subsetPart(),
        resultPart()
      ] });

      const backtrack = (start) => {
        result.push([...path]);
        steps.push({ line: 9, title: `Record subset {${path.join(",")}}`, action: `Add the current path {${path.join(", ")}} to the result.`, parts: [
          arrayPart(),
          subsetPart(),
          resultPart()
        ] });

        for (let i = start; i < nums.length; i++) {
          path.push(nums[i]);
          steps.push({ line: 11, title: `Include ${nums[i]}`, action: `Choose nums[${i}] = ${nums[i]} for the subset.`, parts: [
            arrayPart(i),
            subsetPart()
          ] });
          backtrack(i + 1);
          path.pop();
          steps.push({ line: 13, title: `Exclude ${nums[i]}`, action: `Undo the choice of ${nums[i]} and try the next element.`, parts: [
            arrayPart(i),
            subsetPart(),
            resultPart()
          ] });
        }
      };
      backtrack(0);

      const answer = result.map((s) => `[${s.join(", ")}]`).join(" ");
      steps.push({ line: 5, title: "Result", action: `All ${result.length} subsets = ${answer}`, parts: [
        { t: "result", label: "Answer", value: answer }
      ] });
      return steps;
    }
  },
  {
    id: "permutations",
    title: "Permutations",
    leetcode: "LeetCode #46",
    difficulty: "Medium",
    problem:
      "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    examples: [
      { input: "nums = [1, 2, 3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "All 3! = 6 orderings." },
      { input: "nums = [0, 1]", output: "[[0,1],[1,0]]", explanation: "Both orderings of two elements." }
    ],
    constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10", "All the integers of nums are unique."],
    approaches: [
      {
        name: "Optimal — Backtracking with a used[] Array",
        kind: "optimal",
        time: "O(n · n!)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, new boolean[nums.length], new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, boolean[] used, List<Integer> path, List<List<Integer>> result) {
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            path.add(nums[i]);
            backtrack(nums, used, path, result);
            path.remove(path.size() - 1);
            used[i] = false;
        }
    }
}`
      }
    ],
    defaultInput: { nums: [1, 2, 3] },
    dryRunInputs: [
      { nums: [1, 2, 3] },
      { nums: [0, 1] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const used = new Array(nums.length).fill(false);
      const path = [];
      const result = [];

      const arrayPart = (curIdx) => ({
        t: "array",
        label: "nums",
        values: [...nums],
        marks: {
          ...Object.fromEntries(used.map((u, i) => (u ? [i, "bad"] : null)).filter(Boolean)),
          ...(curIdx != null ? { [curIdx]: "cur" } : {})
        }
      });
      const resultPart = () => ({ t: "text", value: result.length ? result.map((p) => `(${p.join(",")})`).join("  ") : "(none yet)" });

      steps.push({ line: 4, title: "Start", action: "Build a permutation by choosing unused numbers one position at a time.", parts: [
        arrayPart(),
        { t: "set", label: "current path", values: [] },
        resultPart()
      ] });

      const backtrack = () => {
        if (path.length === nums.length) {
          result.push([...path]);
          steps.push({ line: 10, title: `Complete permutation (${path.join(",")})`, action: "Path has n elements → record it as a permutation.", parts: [
            arrayPart(),
            { t: "set", label: "current path", values: [...path] },
            resultPart()
          ] });
          return;
        }
        for (let i = 0; i < nums.length; i++) {
          if (used[i]) continue;
          used[i] = true;
          path.push(nums[i]);
          steps.push({ line: 15, title: `Choose ${nums[i]}`, action: `Place nums[${i}] = ${nums[i]} at position ${path.length - 1}.`, parts: [
            arrayPart(i),
            { t: "set", label: "current path", values: [...path], hi: nums[i] }
          ] });
          backtrack();
          path.pop();
          used[i] = false;
          steps.push({ line: 19, title: `Undo ${nums[i]}`, action: `Remove ${nums[i]} from the path so the next choice can use it.`, parts: [
            arrayPart(),
            { t: "set", label: "current path", values: [...path] },
            resultPart()
          ] });
        }
      };
      backtrack();

      const answer = result.map((p) => `[${p.join(", ")}]`).join(" ");
      steps.push({ line: 5, title: "Result", action: `${result.length} permutations: ${answer}`, parts: [
        { t: "result", label: "Answer", value: answer }
      ] });
      return steps;
    }
  },
  {
    id: "combination-sum",
    title: "Combination Sum",
    leetcode: "LeetCode #39",
    difficulty: "Medium",
    problem:
      "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen an unlimited number of times.",
    examples: [
      { input: "candidates = [2, 3, 6, 7], target = 7", output: "[[2, 2, 3], [7]]", explanation: "2+2+3 = 7 and 7 = 7." },
      { input: "candidates = [2, 3, 5], target = 8", output: "[[2,2,2,2], [2,3,3], [3,5]]", explanation: "All ways to reach 8." }
    ],
    constraints: ["1 <= candidates.length <= 30", "2 <= candidates[i] <= 40", "1 <= target <= 40", "All elements of candidates are distinct."],
    approaches: [
      {
        name: "Optimal — Backtracking with Reuse",
        kind: "optimal",
        time: "O(n^(t/m))",
        space: "O(t/m)",
        runs: true,
        javaCode: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] candidates, int remain, int start, List<Integer> path, List<List<Integer>> result) {
        if (remain == 0) {
            result.add(new ArrayList<>(path));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remain) continue;
            path.add(candidates[i]);
            backtrack(candidates, remain - candidates[i], i, path, result);
            path.remove(path.size() - 1);
        }
    }
}`
      }
    ],
    defaultInput: { candidates: [2, 3, 6, 7], target: 7 },
    dryRunInputs: [
      { candidates: [2, 3, 6, 7], target: 7 },
      { candidates: [2, 3, 5], target: 8 }
    ],
    generateSteps({ candidates, target }) {
      const steps = [];
      const path = [];
      const result = [];

      const arrayPart = (curIdx) => ({
        t: "array",
        label: "candidates",
        values: [...candidates],
        ...(curIdx != null ? { marks: { [curIdx]: "cur" }, ptrs: [{ i: curIdx, label: "i", c: "cur" }] } : {})
      });
      const resultPart = () => ({ t: "text", value: result.length ? result.map((p) => `(${p.join("+")})`).join("  ") : "(none yet)" });
      const sumPart = () => ({
        t: "vars",
        items: [
          { k: "remain", v: target - path.reduce((a, b) => a + b, 0), c: "hi" },
          { k: "path sum", v: path.reduce((a, b) => a + b, 0) }
        ]
      });

      steps.push({ line: 4, title: `Target = ${target}`, action: "Pick numbers (reusing allowed) until the sum hits the target.", parts: [
        arrayPart(),
        { t: "set", label: "current path", values: [] },
        sumPart(),
        resultPart()
      ] });

      const backtrack = (start, remain) => {
        if (remain === 0) {
          result.push([...path]);
          steps.push({ line: 10, title: `Found (${path.join("+")})`, action: "Remaining is 0 → record this combination.", parts: [
            arrayPart(),
            { t: "set", label: "current path", values: [...path] },
            sumPart(),
            resultPart()
          ] });
          return;
        }
        for (let i = start; i < candidates.length; i++) {
          if (candidates[i] > remain) {
            steps.push({ line: 14, title: `Skip ${candidates[i]}`, action: `${candidates[i]} > remain ${remain}, so it cannot be used.`, parts: [
              arrayPart(i),
              { t: "set", label: "current path", values: [...path] },
              sumPart()
            ] });
            continue;
          }
          path.push(candidates[i]);
          steps.push({ line: 15, title: `Take ${candidates[i]}`, action: `Add ${candidates[i]}; remain becomes ${remain - candidates[i]}.`, parts: [
            arrayPart(i),
            { t: "set", label: "current path", values: [...path], hi: candidates[i] },
            sumPart()
          ] });
          backtrack(i, remain - candidates[i]);
          path.pop();
          steps.push({ line: 17, title: `Undo ${candidates[i]}`, action: `Backtrack: remove ${candidates[i]} and try the next candidate.`, parts: [
            arrayPart(),
            { t: "set", label: "current path", values: [...path] },
            sumPart(),
            resultPart()
          ] });
        }
      };
      backtrack(0, target);

      const answer = result.map((p) => `[${p.join(", ")}]`).join(" ");
      steps.push({ line: 5, title: "Result", action: `${result.length} combination(s): ${answer}`, parts: [
        { t: "result", label: "Answer", value: answer }
      ] });
      return steps;
    }
  },
  {
    id: "generate-parentheses",
    title: "Generate Parentheses",
    leetcode: "LeetCode #22",
    difficulty: "Medium",
    problem:
      "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    examples: [
      { input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]', explanation: "All 5 valid strings of 3 pairs." },
      { input: "n = 1", output: '["()"]', explanation: "Only one valid pair." }
    ],
    constraints: ["1 <= n <= 8"],
    approaches: [
      {
        name: "Optimal — Backtracking with Counters",
        kind: "optimal",
        time: "O(4^n / √n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<>();
        backtrack(result, "", 0, 0, n);
        return result;
    }

    private void backtrack(List<String> result, String cur, int open, int close, int n) {
        if (cur.length() == 2 * n) {
            result.add(cur);
            return;
        }
        if (open < n) backtrack(result, cur + "(", open + 1, close, n);
        if (close < open) backtrack(result, cur + ")", open, close + 1, n);
    }
}`
      }
    ],
    defaultInput: { n: 3 },
    dryRunInputs: [
      { n: 3 },
      { n: 2 }
    ],
    generateSteps({ n }) {
      const steps = [];
      const result = [];

      const varsPart = (open, close) => ({ t: "vars", items: [
        { k: "open", v: open, c: "hi" },
        { k: "close", v: close, c: "hi" },
        { k: "n", v: n },
        { k: "2n", v: 2 * n }
      ] });
      const textPart = (cur) => ({ t: "text", value: `"${cur}"` });
      const resultPart = () => ({ t: "text", value: result.length ? result.join("  ") : "(none yet)" });

      steps.push({ line: 4, title: `n = ${n}`, action: "Add '(' if we still have budget; add ')' only if it stays balanced.", parts: [
        textPart(""),
        varsPart(0, 0),
        resultPart()
      ] });

      const backtrack = (cur, open, close) => {
        if (cur.length === 2 * n) {
          result.push(cur);
          steps.push({ line: 10, title: `Complete: ${cur}`, action: "Length reached 2n → a well-formed string is recorded.", parts: [
            textPart(cur),
            varsPart(open, close),
            resultPart()
          ] });
          return;
        }
        if (open < n) {
          steps.push({ line: 13, title: `Add '(' → "${cur}("`, action: `open (${open}) < n (${n}), so a '(' is allowed.`, parts: [
            textPart(cur + "("),
            varsPart(open + 1, close),
            resultPart()
          ] });
          backtrack(cur + "(", open + 1, close);
        }
        if (close < open) {
          steps.push({ line: 14, title: `Add ')' → "${cur})"`, action: `close (${close}) < open (${open}), so a ')' keeps it valid.`, parts: [
            textPart(cur + ")"),
            varsPart(open, close + 1),
            resultPart()
          ] });
          backtrack(cur + ")", open, close + 1);
        }
      };
      backtrack("", 0, 0);

      const answer = result.map((s) => `"${s}"`).join(" ");
      steps.push({ line: 5, title: "Result", action: `${result.length} well-formed strings: ${answer}`, parts: [
        { t: "result", label: "Answer", value: answer }
      ] });
      return steps;
    }
  },
  {
    id: "letter-combinations-phone",
    title: "Letter Combinations of a Phone Number",
    leetcode: "LeetCode #17",
    difficulty: "Medium",
    problem:
      "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent (a phone keypad mapping). Return the answer in any order.",
    examples: [
      { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]', explanation: "2 → abc, 3 → def, so 3 × 3 = 9 combinations." },
      { input: 'digits = "2"', output: '["a","b","c"]', explanation: "A single digit gives its three letters." }
    ],
    constraints: ["0 <= digits.length <= 4", "digits[i] is a digit in the range ['2', '9']."],
    approaches: [
      {
        name: "Optimal — Backtracking over the Keypad",
        kind: "optimal",
        time: "O(4^n · n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    private static final String[] MAP = {
        "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
    };

    public List<String> letterCombinations(String digits) {
        List<String> result = new ArrayList<>();
        if (digits.isEmpty()) return result;
        backtrack(digits, 0, new StringBuilder(), result);
        return result;
    }

    private void backtrack(String digits, int idx, StringBuilder path, List<String> result) {
        if (idx == digits.length()) {
            result.add(path.toString());
            return;
        }
        String letters = MAP[digits.charAt(idx) - '0'];
        for (char c : letters.toCharArray()) {
            path.append(c);
            backtrack(digits, idx + 1, path, result);
            path.deleteCharAt(path.length() - 1);
        }
    }
}`
      }
    ],
    defaultInput: { digits: "23" },
    dryRunInputs: [
      { digits: "23" },
      { digits: "2" }
    ],
    generateSteps({ digits }) {
      const MAP = ["", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
      const steps = [];
      const d = digits.split("");
      const path = [];
      const result = [];

      const arrayPart = (idx) => ({
        t: "array",
        label: "digits",
        values: [...d],
        ...(idx != null ? { marks: { [idx]: "cur" }, ptrs: [{ i: idx, label: "idx", c: "cur" }] } : {})
      });
      const lettersPart = (idx) => idx < d.length
        ? { t: "text", value: `digit ${d[idx]} → "${MAP[Number(d[idx])]}"` }
        : { t: "text", value: "(all digits used)" };
      const resultPart = () => ({ t: "text", value: result.length ? result.map((s) => `"${s}"`).join("  ") : "(none yet)" });

      steps.push({ line: 8, title: `digits = "${digits}"`, action: "Each digit maps to letters; combine one letter per digit.", parts: [
        arrayPart(0),
        lettersPart(0),
        { t: "text", value: `path: "${path.join("")}"` },
        resultPart()
      ] });

      if (digits.length === 0) {
        steps.push({ line: 7, title: "Empty input", action: "No digits → no combinations.", parts: [
          { t: "result", label: "Answer", value: "[]" }
        ] });
        return steps;
      }

      const backtrack = (idx) => {
        if (idx === d.length) {
          result.push(path.join(""));
          steps.push({ line: 14, title: `Complete "${path.join("")}"`, action: "Used a letter for every digit → record the combination.", parts: [
            arrayPart(),
            { t: "text", value: `path: "${path.join("")}"` },
            resultPart()
          ] });
          return;
        }
        const letters = MAP[Number(d[idx])];
        for (const c of letters) {
          path.push(c);
          steps.push({ line: 19, title: `Append '${c}'`, action: `Digit ${d[idx]} offers "${letters}"; pick '${c}'.`, parts: [
            arrayPart(idx),
            lettersPart(idx),
            { t: "text", value: `path: "${path.join("")}"` },
            resultPart()
          ] });
          backtrack(idx + 1);
          path.pop();
          steps.push({ line: 21, title: `Backtrack '${c}'`, action: "Remove the last letter and try the next option.", parts: [
            arrayPart(idx),
            { t: "text", value: `path: "${path.join("")}"` },
            resultPart()
          ] });
        }
      };
      backtrack(0);

      const answer = result.map((s) => `"${s}"`).join(" ");
      steps.push({ line: 9, title: "Result", action: `${result.length} combinations: ${answer}`, parts: [
        { t: "result", label: "Answer", value: answer }
      ] });
      return steps;
    }
  }
];

