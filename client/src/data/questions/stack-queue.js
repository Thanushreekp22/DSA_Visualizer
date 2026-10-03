export const stackQueueQuestions = [
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    leetcode: "LeetCode #20",
    difficulty: "Easy",
    problem:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of bracket and in the correct order.",
    examples: [
      { input: 's = "()[]{}"', output: "true", explanation: "Each bracket is closed by its matching type." },
      { input: 's = "(]"', output: "false", explanation: "'(' is closed by ']' — mismatch." }
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only: '()[]{}'"],
    approaches: [
      {
        name: "Optimal — Stack Matching",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char top = stack.pop();
                if (c == ')' && top != '(') return false;
                if (c == ']' && top != '[') return false;
                if (c == '}' && top != '{') return false;
            }
        }
        return stack.isEmpty();
    }
}`
      }
    ],
    defaultInput: { s: "()[]{}" },
    dryRunInputs: [
      { s: "()[]{}" },
      { s: "(]" }
    ],
    generateSteps({ s }) {
      const steps = [];
      const stack = [];
      const view = s.split("");
      const match = { ")": "(", "]": "[", "}": "{" };

      steps.push({ line: 3, title: "Create stack", action: "The stack holds opening brackets waiting to be closed.", parts: [
        { t: "array", label: "s", values: view },
        { t: "stack", label: "stack", values: [] }
      ] });

      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        const isOpen = "([{".includes(c);
        steps.push({ line: 5, title: `Read '${c}'`, action: isOpen ? "It is an opening bracket — push it." : "It is a closing bracket — try to match.", parts: [
          { t: "array", label: "s", values: view, marks: { [i]: isOpen ? "cur" : "bad" }, ptrs: [{ i, label: "i", c: "cur" }] },
          { t: "stack", label: "stack", values: [...stack] }
        ] });

        if (isOpen) {
          stack.push(c);
          steps.push({ line: 6, title: `Push '${c}'`, action: `Stack is now [${stack.join(", ")}] (top first).`, parts: [
            { t: "array", label: "s", values: view, marks: { [i]: "cur" } },
            { t: "stack", label: "stack", values: [...stack], hi: stack.length - 1 }
          ] });
        } else {
          if (stack.length === 0) {
            steps.push({ line: 8, title: "Stack is empty", action: `Closing '${c}' has nothing to match.`, parts: [
              { t: "array", label: "s", values: view, marks: { [i]: "bad" } },
              { t: "stack", label: "stack", values: [] },
              { t: "result", label: "Answer", value: "false" }
            ] });
            return steps;
          }
          const top = stack.pop();
          const ok = top === match[c];
          steps.push({ line: 9, title: `Pop '${top}' and match`, action: ok ? `'${top}' matches '${c}'.` : `'${top}' does not match '${c}'.`, parts: [
            { t: "array", label: "s", values: view, marks: { [i]: ok ? "ok" : "bad" }, ptrs: [{ i, label: "i", c: ok ? "ok" : "cur" }] },
            { t: "stack", label: "stack", values: [...stack] },
            { t: "vars", items: [{ k: "top", v: top }, { k: "char", v: c, c: ok ? "ok" : "bad" }] }
          ] });
          if (!ok) {
            steps.push({ line: 10, title: "Return false", action: "The brackets do not match.", parts: [{ t: "result", label: "Answer", value: "false" }] });
            return steps;
          }
        }
      }

      const valid = stack.length === 0;
      steps.push({ line: 15, title: "Final check", action: valid ? "The stack is empty — every bracket was closed." : `Unclosed brackets remain: [${stack.join(", ")}].`, parts: [
        { t: "stack", label: "stack", values: [...stack] },
        { t: "result", label: "Answer", value: String(valid) }
      ] });
      return steps;
    }
  },
  {
    id: "evaluate-rpn",
    title: "Evaluate Reverse Polish Notation",
    leetcode: "LeetCode #150",
    difficulty: "Medium",
    problem:
      "You are given an array of strings tokens that represents a valid arithmetic expression in Reverse Polish Notation. Evaluate the expression and return an integer representing its value.",
    examples: [
      { input: 'tokens = ["2","1","+","3","*"]', output: "9", explanation: "((2 + 1) × 3) = 9" },
      { input: 'tokens = ["4","13","5","/","+"]', output: "6", explanation: "4 + (13 / 5) = 4 + 2 = 6" }
    ],
    constraints: ["1 <= tokens.length <= 10^4", "Each token is an operator or a 32-bit integer."],
    approaches: [
      {
        name: "Optimal — Stack Evaluation",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int evalRPN(String[] tokens) {
        Deque<Integer> stack = new ArrayDeque<>();
        for (String t : tokens) {
            if (t.equals("+") || t.equals("-") || t.equals("*") || t.equals("/")) {
                int b = stack.pop();
                int a = stack.pop();
                switch (t) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    case "/": stack.push(a / b); break;
                }
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`
      }
    ],
    defaultInput: { tokens: ["2", "1", "+", "3", "*"] },
    dryRunInputs: [
      { tokens: ["2", "1", "+", "3", "*"] },
      { tokens: ["4", "13", "5", "/", "+"] }
    ],
    generateSteps({ tokens }) {
      const steps = [];
      const stack = [];
      const ops = "+-*/";

      steps.push({ line: 3, title: "Create stack", action: "Numbers are pushed; operators pop two values.", parts: [{ t: "array", label: "tokens", values: tokens }, { t: "stack", label: "stack", values: [] }] });

      for (let i = 0; i < tokens.length; i++) {
        const t = tokens[i];
        const isOp = ops.includes(t) && t.length === 1;
        steps.push({ line: 5, title: `Token '${t}'`, action: isOp ? "Operator — pop two operands." : "Operand — push it onto the stack.", parts: [
          { t: "array", label: "tokens", values: tokens, marks: { [i]: isOp ? "bad" : "cur" }, ptrs: [{ i, label: "i", c: isOp ? "cur" : "ok" }] },
          { t: "stack", label: "stack", values: [...stack] }
        ] });

        if (isOp) {
          const b = stack.pop();
          const a = stack.pop();
          let r;
          if (t === "+") r = a + b;
          else if (t === "-") r = a - b;
          else if (t === "*") r = a * b;
          else r = Math.trunc(a / b);
          stack.push(r);
          steps.push({ line: 9, title: `Apply ${t}`, action: `${a} ${t} ${b} = ${r}, push the result.`, parts: [
            { t: "array", label: "tokens", values: tokens, marks: { [i]: "bad" } },
            { t: "stack", label: "stack", values: [...stack], hi: stack.length - 1 },
            { t: "vars", items: [{ k: "a", v: a }, { k: "b", v: b }, { k: "result", v: r, c: "ok" }] }
          ] });
        } else {
          stack.push(Number(t));
          steps.push({ line: 15, title: `Push ${t}`, action: `Stack is now [${stack.join(", ")}].`, parts: [
            { t: "array", label: "tokens", values: tokens, marks: { [i]: "ok" } },
            { t: "stack", label: "stack", values: [...stack], hi: stack.length - 1 }
          ] });
        }
      }

      const ans = stack.pop();
      steps.push({ line: 18, title: "Result", action: `The evaluated value is ${ans}.`, parts: [
        { t: "stack", label: "stack", values: [...stack] },
        { t: "result", label: "Answer", value: String(ans) }
      ] });
      return steps;
    }
  },
  {
    id: "next-greater-element-i",
    title: "Next Greater Element I",
    leetcode: "LeetCode #496",
    difficulty: "Easy",
    problem:
      "The next greater element of some element x in an array is the first greater element that is to the right of x in the same array. You are given two distinct integer arrays nums1 and nums2, where nums1 is a subset of nums2. For each element in nums1, find its next greater element in nums2.",
    examples: [
      { input: "nums1 = [4, 1, 2], nums2 = [1, 3, 4, 2]", output: "[-1, 3, -1]", explanation: "4 has none, 1 → 3, 2 has none." },
      { input: "nums1 = [2, 4], nums2 = [1, 2, 3, 4]", output: "[3, -1]", explanation: "2 → 3, 4 has none." }
    ],
    constraints: ["1 <= nums1.length <= nums2.length <= 1000", "All values are unique."],
    approaches: [
      {
        name: "Optimal — Monotonic Stack",
        kind: "optimal",
        time: "O(n + m)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Map<Integer, Integer> map = new HashMap<>();
        Deque<Integer> stack = new ArrayDeque<>();
        for (int num : nums2) {
            while (!stack.isEmpty() && stack.peek() < num) {
                map.put(stack.pop(), num);
            }
            stack.push(num);
        }
        int[] res = new int[nums1.length];
        for (int i = 0; i < nums1.length; i++) {
            res[i] = map.getOrDefault(nums1[i], -1);
        }
        return res;
    }
}`
      }
    ],
    defaultInput: { nums1: [4, 1, 2], nums2: [1, 3, 4, 2] },
    dryRunInputs: [
      { nums1: [4, 1, 2], nums2: [1, 3, 4, 2] },
      { nums1: [2, 4], nums2: [1, 2, 3, 4] }
    ],
    generateSteps({ nums1, nums2 }) {
      const steps = [];
      const stack = [];
      const map = {};

      steps.push({ line: 4, title: "Create empty stack", action: "The stack keeps a decreasing sequence of values.", parts: [
        { t: "array", label: "nums2", values: nums2 },
        { t: "stack", label: "stack", values: [] },
        { t: "map", label: "next greater", entries: [] }
      ] });

      for (let i = 0; i < nums2.length; i++) {
        const num = nums2[i];
        steps.push({ line: 5, title: `num = ${num}`, action: "Pop smaller values that now have their next greater.", parts: [
          { t: "array", label: "nums2", values: nums2, marks: { [i]: "cur" }, ptrs: [{ i, label: "i", c: "cur" }] },
          { t: "stack", label: "stack", values: [...stack] },
          { t: "map", label: "next greater", entries: Object.entries(map) }
        ] });

        while (stack.length > 0 && stack[stack.length - 1] < num) {
          const small = stack.pop();
          map[small] = num;
          steps.push({ line: 7, title: `Pop ${small}`, action: `${num} is the next greater element of ${small}.`, parts: [
            { t: "array", label: "nums2", values: nums2, marks: { [i]: "ok" } },
            { t: "stack", label: "stack", values: [...stack] },
            { t: "map", label: "next greater", entries: Object.entries(map), hiKey: small }
          ] });
        }

        stack.push(num);
        steps.push({ line: 9, title: `Push ${num}`, action: `Stack (bottom→top): [${stack.join(", ")}]`, parts: [
          { t: "array", label: "nums2", values: nums2, marks: { [i]: "cur" } },
          { t: "stack", label: "stack", values: [...stack], hi: stack.length - 1 },
          { t: "map", label: "next greater", entries: Object.entries(map) }
        ] });
      }

      const res = nums1.map((v) => (map[v] !== undefined ? map[v] : -1));
      steps.push({ line: 13, title: "Answer nums1", action: `Result = [${res.join(", ")}]`, parts: [
        { t: "array", label: "nums1", values: nums1, marks: Object.fromEntries(nums1.map((_, i) => [i, "ok"])) },
        { t: "map", label: "next greater", entries: Object.entries(map) },
        { t: "result", label: "Answer", value: `[${res.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "implement-queue-using-stacks",
    title: "Implement Queue Using Stacks",
    leetcode: "LeetCode #232",
    difficulty: "Easy",
    problem:
      "Implement a first-in-first-out (FIFO) queue using only two stacks. The implemented queue should support push, pop, peek, and empty operations using the standard stack operations.",
    examples: [
      {
        input: 'ops = ["push","push","peek","pop","empty"], vals = [1, 2, -, -, -]',
        output: "[null, null, 1, 1, false]",
        explanation: "Push 1 then 2; peek returns the front (1); pop removes 1; queue is not empty."
      },
      {
        input: 'ops = ["push","pop","empty"], vals = [1, -, -]',
        output: "[null, 1, true]",
        explanation: "Push 1, pop it, then the queue is empty."
      }
    ],
    constraints: ["1 <= push, pop, peek <= 100", "At most 100 calls will be made to each method."],
    approaches: [
      {
        name: "Optimal — Two Stacks (in / out)",
        kind: "optimal",
        time: "O(1) amortized",
        space: "O(n)",
        runs: true,
        javaCode: `class MyQueue {
    private Stack<Integer> in = new Stack<>();
    private Stack<Integer> out = new Stack<>();

    public void push(int x) {
        in.push(x);
    }

    public int pop() {
        shift();
        return out.pop();
    }

    public int peek() {
        shift();
        return out.peek();
    }

    public boolean empty() {
        return in.isEmpty() && out.isEmpty();
    }

    private void shift() {
        if (out.isEmpty()) {
            while (!in.isEmpty()) out.push(in.pop());
        }
    }
}`
      }
    ],
    defaultInput: { script: [{ op: "push", val: 1 }, { op: "push", val: 2 }, { op: "peek" }, { op: "pop" }, { op: "empty" }] },
    dryRunInputs: [
      { script: [{ op: "push", val: 1 }, { op: "push", val: 2 }, { op: "peek" }, { op: "pop" }, { op: "empty" }] },
      { script: [{ op: "push", val: 1 }, { op: "pop" }, { op: "empty" }] }
    ],
    generateSteps({ script }) {
      const steps = [];
      const inStack = [];
      const outStack = [];
      const outputs = [];

      const shift = (fromLine) => {
        if (outStack.length === 0) {
          while (inStack.length > 0) outStack.push(inStack.pop());
          steps.push({ line: fromLine, title: "Shift in → out", action: "Move everything so the oldest item reaches the front.", parts: [
            { t: "stack", label: "in stack", values: [...inStack] },
            { t: "stack", label: "out stack", values: [...outStack], hi: outStack.length - 1 },
            { t: "set", label: "outputs", values: outputs }
          ] });
        }
      };

      steps.push({ line: 3, title: "Start", action: "Two empty stacks: 'in' receives pushes, 'out' serves pops.", parts: [
        { t: "stack", label: "in stack", values: [] },
        { t: "stack", label: "out stack", values: [] },
        { t: "set", label: "outputs", values: [] }
      ] });

      for (const step of script) {
        if (step.op === "push") {
          inStack.push(step.val);
          steps.push({ line: 6, title: `push(${step.val})`, action: `Push onto the in stack → [${inStack.join(", ")}]`, parts: [
            { t: "stack", label: "in stack", values: [...inStack], hi: inStack.length - 1 },
            { t: "stack", label: "out stack", values: [...outStack] },
            { t: "set", label: "outputs", values: [...outputs, "null"], hi: "null" }
          ] });
          outputs.push("null");
        } else if (step.op === "pop") {
          shift(21);
          const v = outStack.pop();
          outputs.push(String(v));
          steps.push({ line: 9, title: `pop() → ${v}`, action: "Remove the front element (oldest).", parts: [
            { t: "stack", label: "in stack", values: [...inStack] },
            { t: "stack", label: "out stack", values: [...outStack] },
            { t: "set", label: "outputs", values: [...outputs], hi: String(v) },
            { t: "result", label: "popped", value: String(v) }
          ] });
        } else if (step.op === "peek") {
          shift(14);
          const v = outStack[outStack.length - 1];
          outputs.push(String(v));
          steps.push({ line: 14, title: `peek() → ${v}`, action: "Read the front element without removing it.", parts: [
            { t: "stack", label: "in stack", values: [...inStack] },
            { t: "stack", label: "out stack", values: [...outStack], hi: outStack.length - 1 },
            { t: "set", label: "outputs", values: [...outputs], hi: String(v) },
            { t: "result", label: "front", value: String(v) }
          ] });
        } else if (step.op === "empty") {
          const empty = inStack.length === 0 && outStack.length === 0;
          outputs.push(String(empty));
          steps.push({ line: 19, title: `empty() → ${empty}`, action: empty ? "Both stacks are empty." : "There are still elements.", parts: [
            { t: "stack", label: "in stack", values: [...inStack] },
            { t: "stack", label: "out stack", values: [...outStack] },
            { t: "set", label: "outputs", values: [...outputs], hi: String(empty) },
            { t: "result", label: "Answer", value: String(empty) }
          ] });
        }
      }

      steps.push({ line: 24, title: "Result", action: `Output sequence: [${outputs.join(", ")}]`, parts: [
        { t: "set", label: "outputs", values: outputs },
        { t: "result", label: "Answer", value: `[${outputs.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "largest-rectangle-histogram",
    title: "Largest Rectangle in Histogram",
    leetcode: "LeetCode #84",
    difficulty: "Hard",
    problem:
      "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, compute the area of the largest rectangle in the histogram.",
    examples: [
      { input: "heights = [2, 1, 5, 6, 2, 3]", output: "10", explanation: "The rectangle between index 2 and 3 (height 5, 6) spans width 2 → 5 × 2 = 10." },
      { input: "heights = [2, 4]", output: "4", explanation: "The bar of height 2 spans both columns: 2 × 2 = 4." }
    ],
    constraints: ["1 <= heights.length <= 10^5", "0 <= heights[i] <= 10^4"],
    approaches: [
      {
        name: "Optimal — Monotonic Stack",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int largestRectangleArea(int[] heights) {
        Deque<Integer> stack = new ArrayDeque<>();
        int best = 0;
        for (int i = 0; i <= heights.length; i++) {
            int h = (i == heights.length) ? 0 : heights[i];
            while (!stack.isEmpty() && heights[stack.peek()] > h) {
                int height = heights[stack.pop()];
                int left = stack.isEmpty() ? 0 : stack.peek() + 1;
                best = Math.max(best, height * (i - left));
            }
            stack.push(i);
        }
        return best;
    }
}`
      }
    ],
    defaultInput: { heights: [2, 1, 5, 6, 2, 3] },
    dryRunInputs: [
      { heights: [2, 1, 5, 6, 2, 3] },
      { heights: [2, 4] }
    ],
    generateSteps({ heights }) {
      const steps = [];
      const stack = [];
      let best = 0;

      steps.push({ line: 4, title: "Initialize", action: "best = 0, stack holds bar indices.", parts: [
        { t: "bars", label: "heights", values: heights },
        { t: "stack", label: "index stack", values: [] },
        { t: "vars", items: [{ k: "best", v: best }] }
      ] });

      for (let i = 0; i <= heights.length; i++) {
        const h = i === heights.length ? 0 : heights[i];
        if (i < heights.length) {
          steps.push({ line: 6, title: `i = ${i}, h = ${h}`, action: "Resolve any bars taller than the current one.", parts: [
            { t: "bars", label: "heights", values: heights, marks: { [i]: "cur" }, ptrs: [{ i, label: "i", c: "cur" }] },
            { t: "stack", label: "index stack", values: [...stack] }
          ] });
        }

        while (stack.length > 0 && heights[stack[stack.length - 1]] > h) {
          const idx = stack.pop();
          const height = heights[idx];
          const left = stack.length === 0 ? 0 : stack[stack.length - 1] + 1;
          const area = height * (i - left);
          best = Math.max(best, area);
          steps.push({ line: 10, title: `Pop index ${idx}`, action: `height ${height} × width ${i - left} = ${area} → best = ${best}`, parts: [
            { t: "bars", label: "heights", values: heights, marks: { [idx]: "ok" }, ptrs: Array.from({ length: i - left }, (_, x) => ({ i: left + x, label: "", c: "ok" })) },
            { t: "stack", label: "index stack", values: [...stack] },
            { t: "vars", items: [{ k: "area", v: area, c: "hi" }, { k: "best", v: best, c: "ok" }] }
          ] });
        }

        if (i < heights.length) {
          stack.push(i);
          steps.push({ line: 12, title: `Push index ${i}`, action: `Stack (bottom→top): [${stack.join(", ")}]`, parts: [
            { t: "bars", label: "heights", values: heights, marks: { [i]: "cur" } },
            { t: "stack", label: "index stack", values: [...stack], hi: stack.length - 1 },
            { t: "vars", items: [{ k: "best", v: best, c: "ok" }] }
          ] });
        }
      }

      steps.push({ line: 14, title: "Result", action: `Largest rectangle area = ${best}.`, parts: [
        { t: "bars", label: "heights", values: heights },
        { t: "result", label: "Answer", value: String(best) }
      ] });
      return steps;
    }
  },
  {
    id: "first-non-repeating-stream",
    title: "First Non-Repeating Character in a Stream",
    leetcode: "GeeksforGeeks",
    difficulty: "Easy",
    problem:
      "Given a string s consisting of lowercase letters, read it character by character and for each character find the first non-repeating character seen so far in the processed part of the stream. If no such character exists, use '#'.",
    examples: [
      { input: 's = "aabc"', output: '"a#bb"', explanation: "a → a; second a repeats → #; b is first non-repeating; c leaves b in front." },
      { input: 's = "aabb"', output: '"a#b#"', explanation: "After each pair repeats, the front becomes non-repeating again." }
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of lowercase English letters."],
    approaches: [
      {
        name: "Optimal — Queue + Counts",
        kind: "optimal",
        time: "O(n)",
        space: "O(k)",
        runs: true,
        javaCode: `class Solution {
    public String FirstNonRepeating(String s) {
        int[] count = new int[26];
        Queue<Character> q = new LinkedList<>();
        StringBuilder res = new StringBuilder();
        for (char c : s.toCharArray()) {
            count[c - 'a']++;
            q.add(c);
            while (!q.isEmpty() && count[q.peek() - 'a'] > 1) q.poll();
            res.append(q.isEmpty() ? '#' : q.peek());
        }
        return res.toString();
    }
}`
      }
    ],
    defaultInput: { s: "aabc" },
    dryRunInputs: [
      { s: "aabc" },
      { s: "aabb" }
    ],
    generateSteps({ s }) {
      const steps = [];
      const count = {};
      const q = [];
      const result = [];
      const view = s.split("");

      steps.push({ line: 3, title: "Initialize", action: "A count map and a queue of candidates.", parts: [
        { t: "array", label: "stream", values: view },
        { t: "queue", label: "queue", values: [] },
        { t: "map", label: "count", entries: [] },
        { t: "set", label: "result", values: [] }
      ] });

      for (let i = 0; i < s.length; i++) {
        const c = s[i];
        count[c] = (count[c] || 0) + 1;
        q.push(c);
        steps.push({ line: 8, title: `Read '${c}'`, action: `count[${c}] = ${count[c]}, push '${c}' to the queue.`, parts: [
          { t: "array", label: "stream", values: view, marks: { [i]: "cur" }, ptrs: [{ i, label: "i", c: "cur" }] },
          { t: "queue", label: "queue", values: [...q], front: 0, rear: q.length - 1, hi: 0 },
          { t: "map", label: "count", entries: Object.entries(count), hiKey: c },
          { t: "set", label: "result", values: [...result] }
        ] });

        while (q.length > 0 && count[q[0]] > 1) {
          const gone = q.shift();
          steps.push({ line: 9, title: `Drop '${gone}'`, action: `'${gone}' already repeats, remove it from the front.`, parts: [
            { t: "array", label: "stream", values: view },
            { t: "queue", label: "queue", values: [...q], front: 0, rear: Math.max(q.length - 1, 0) },
            { t: "map", label: "count", entries: Object.entries(count) },
            { t: "set", label: "result", values: [...result] }
          ] });
        }

        const ch = q.length === 0 ? "#" : q[0];
        result.push(ch);
        steps.push({ line: 10, title: `Append '${ch}'`, action: q.length === 0 ? "The queue is empty, so use '#'." : `'${ch}' is the front and is unique so far.`, parts: [
          { t: "array", label: "stream", values: view, marks: { [i]: "ok" } },
          { t: "queue", label: "queue", values: [...q], front: 0, rear: Math.max(q.length - 1, 0) },
          { t: "set", label: "result", values: [...result], hi: ch },
          { t: "result", label: "Answer so far", value: result.join("") }
        ] });
      }

      steps.push({ line: 12, title: "Result", action: `Final string = "${result.join("")}"`, parts: [
        { t: "set", label: "result", values: result },
        { t: "result", label: "Answer", value: `"${result.join("")}"` }
      ] });
      return steps;
    }
  },
  {
    id: "interleave-queue-halves",
    title: "Interleave the First Half of the Queue with the Second Half",
    leetcode: "GeeksforGeeks",
    difficulty: "Medium",
    problem:
      "Given a queue of integers, rearrange it so that the first half and the second half are interleaved: the result starts with the first element of the first half, then the first element of the second half, then the second of each half, and so on. The queue size is even.",
    examples: [
      { input: "queue = [1, 2, 3, 4, 5, 6]", output: "[1, 4, 2, 5, 3, 6]", explanation: "First half [1,2,3] interleaved with second half [4,5,6]." },
      { input: "queue = [11, 12, 13, 14, 15, 16, 17, 18]", output: "[11, 15, 12, 16, 13, 17, 14, 18]", explanation: "Two halves of four are interleaved." }
    ],
    constraints: ["1 <= queue.size <= 10^5", "The queue size is even."],
    approaches: [
      {
        name: "Optimal — Helper Queue Interleave",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public void interLeave(Queue<Integer> q) {
        int n = q.size();
        Queue<Integer> firstHalf = new LinkedList<>();
        for (int i = 0; i < n / 2; i++) firstHalf.add(q.remove());
        for (int i = 0; i < n / 2; i++) {
            q.add(firstHalf.remove());
            q.add(q.remove());
        }
    }
}`
      }
    ],
    defaultInput: { queue: [1, 2, 3, 4, 5, 6] },
    dryRunInputs: [
      { queue: [1, 2, 3, 4, 5, 6] },
      { queue: [11, 12, 13, 14, 15, 16, 17, 18] }
    ],
    generateSteps({ queue }) {
      const steps = [];
      const q = [...queue];
      const half = q.length / 2;
      const firstHalf = [];

      steps.push({ line: 3, title: "Start", action: `Queue has ${q.length} elements, so each half has ${half}.`, parts: [
        { t: "queue", label: "queue", values: [...q], front: 0, rear: q.length - 1 }
      ] });

      for (let i = 0; i < half; i++) {
        const v = q.shift();
        firstHalf.push(v);
        steps.push({ line: 5, title: `Move ${v} to firstHalf`, action: "Detach the first half into a helper queue.", parts: [
          { t: "queue", label: "queue", values: [...q], front: 0, rear: Math.max(q.length - 1, 0) },
          { t: "queue", label: "firstHalf", values: [...firstHalf], front: 0, rear: firstHalf.length - 1, hi: firstHalf.length - 1 }
        ] });
      }

      for (let i = 0; i < half; i++) {
        const fromFirst = firstHalf.shift();
        q.push(fromFirst);
        steps.push({ line: 7, title: `Add firstHalf head ${fromFirst}`, action: "Append the next first-half element to the back.", parts: [
          { t: "queue", label: "queue", values: [...q], front: 0, rear: q.length - 1, hi: q.length - 1 },
          { t: "queue", label: "firstHalf", values: [...firstHalf], front: 0, rear: Math.max(firstHalf.length - 1, 0) }
        ] });

        const rotated = q.shift();
        q.push(rotated);
        steps.push({ line: 8, title: `Rotate front ${rotated} to back`, action: "Move the queue's front element to the back to make room.", parts: [
          { t: "queue", label: "queue", values: [...q], front: 0, rear: q.length - 1, hi: q.length - 1 },
          { t: "queue", label: "firstHalf", values: [...firstHalf], front: 0, rear: Math.max(firstHalf.length - 1, 0) },
          { t: "set", label: "interleaved so far", values: [...q] }
        ] });
      }

      steps.push({ line: 10, title: "Result", action: `Interleaved queue = [${q.join(", ")}]`, parts: [
        { t: "queue", label: "queue", values: [...q], front: 0, rear: q.length - 1 },
        { t: "result", label: "Answer", value: `[${q.join(", ")}]` }
      ] });
      return steps;
    }
  }
];

