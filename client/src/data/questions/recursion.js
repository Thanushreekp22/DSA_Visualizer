export const recursionQuestions = [
  {
    id: "fibonacci-number",
    title: "Fibonacci Number",
    leetcode: "LeetCode #509",
    difficulty: "Easy",
    problem:
      "The Fibonacci numbers, commonly denoted F(n), form a sequence where F(0) = 0, F(1) = 1 and F(n) = F(n - 1) + F(n - 2) for n > 1. Given n, calculate F(n).",
    examples: [
      { input: "n = 4", output: "3", explanation: "F(4) = F(3) + F(2) = 2 + 1 = 3." },
      { input: "n = 6", output: "8", explanation: "0, 1, 1, 2, 3, 5, 8." }
    ],
    constraints: ["0 <= n <= 30"],
    approaches: [
      {
        name: "Recursive — Direct Definition",
        kind: "brute",
        time: "O(2^n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
}`
      },
      {
        name: "Optimal — Iterative Rolling Variables",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int fib(int n) {
        if (n <= 1) return n;
        int a = 0, b = 1;
        for (int i = 2; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`
      }
    ],
    defaultInput: { n: 4 },
    dryRunInputs: [
      { n: 4 },
      { n: 6 }
    ],
    generateSteps({ n }) {
      const steps = [];
      const frames = [];

      steps.push({ line: 3, title: `fib(${n})`, action: "Recursion explores fib(n-1) and fib(n-2) until the base cases.", parts: [
        { t: "stack", label: "call stack", values: [] },
        { t: "vars", items: [{ k: "n", v: n, c: "cur" }] }
      ] });

      const fib = (k) => {
        frames.push(k);
        steps.push({ line: 3, title: `Call fib(${k})`, action: k <= 1 ? `Base case: fib(${k}) = ${k}.` : `Push fib(${k}) and solve its subproblems.`, parts: [
          { t: "stack", label: "call stack", values: [...frames], hi: frames.length - 1 },
          { t: "vars", items: [{ k: "n", v: k, c: "cur" }] }
        ] });
        let val;
        if (k <= 1) {
          val = k;
        } else {
          const a = fib(k - 1);
          const b = fib(k - 2);
          val = a + b;
          steps.push({ line: 4, title: `fib(${k}) = ${a} + ${b}`, action: `Combine subresults: ${a} + ${b} = ${val}.`, parts: [
            { t: "stack", label: "call stack", values: [...frames], hi: frames.length - 1 },
            { t: "vars", items: [{ k: `fib(${k - 1})`, v: a }, { k: `fib(${k - 2})`, v: b }, { k: `fib(${k})`, v: val, c: "hi" }] }
          ] });
        }
        frames.pop();
        steps.push({ line: 3, title: `Return ${val}`, action: `fib(${k}) = ${val}; pop the frame.`, parts: [
          { t: "stack", label: "call stack", values: [...frames] },
          { t: "result", label: `fib(${k})`, value: val }
        ] });
        return val;
      };
      const ans = fib(n);

      steps.push({ line: 3, title: "Result", action: `F(${n}) = ${ans}.`, parts: [
        { t: "result", label: "Answer", value: ans }
      ] });
      return steps;
    }
  },
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    leetcode: "LeetCode #70",
    difficulty: "Easy",
    problem:
      "You are climbing a staircase with n steps. Each time you can climb either 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      { input: "n = 3", output: "3", explanation: "1+1+1, 1+2, and 2+1." },
      { input: "n = 5", output: "8", explanation: "The count follows the Fibonacci recurrence." }
    ],
    constraints: ["1 <= n <= 45"],
    approaches: [
      {
        name: "Optimal — Rolling Fibonacci",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int one = 1, two = 2;
        for (int i = 3; i <= n; i++) {
            int cur = one + two;
            one = two;
            two = cur;
        }
        return two;
    }
}`
      }
    ],
    defaultInput: { n: 4 },
    dryRunInputs: [
      { n: 4 },
      { n: 5 }
    ],
    generateSteps({ n }) {
      const steps = [];
      const ways = new Array(n + 1).fill(null);
      ways[0] = 1;
      if (n >= 1) ways[1] = 1;

      steps.push({ line: 3, title: "Base cases", action: "ways[0] = 1 (one way to stand still) and ways[1] = 1 (one single step).", parts: [
        { t: "array", label: "ways (index = step)", values: ways.map((v) => (v === null ? "•" : v)), marks: { 0: "ok", 1: "ok" } },
        { t: "vars", items: [{ k: "n", v: n, c: "cur" }] }
      ] });

      for (let i = 2; i <= n; i++) {
        ways[i] = ways[i - 1] + ways[i - 2];
        const one = ways[i - 1];
        const two = ways[i - 2];
        steps.push({ line: 6, title: `ways[${i}] = ${one} + ${two}`, action: `Reach step ${i} from step ${i - 1} (+1) or step ${i - 2} (+2) → ${ways[i]} ways.`, parts: [
          { t: "array", label: "ways (index = step)", values: ways.map((v) => (v === null ? "•" : v)), marks: { [i]: "cur", [i - 1]: "ok", [i - 2]: "ok" }, ptrs: [{ i, label: "i", c: "cur" }] },
          { t: "vars", items: [{ k: "ways[i-1]", v: one }, { k: "ways[i-2]", v: two }, { k: "ways[i]", v: ways[i], c: "hi" }] }
        ] });
      }

      steps.push({ line: 10, title: "Result", action: `There are ${ways[n]} distinct ways to climb ${n} stairs.`, parts: [
        { t: "array", label: "ways (index = step)", values: ways.map((v) => (v === null ? "•" : v)), marks: { [n]: "ok" } },
        { t: "result", label: "Answer", value: ways[n] }
      ] });
      return steps;
    }
  },
  {
    id: "power-of-two",
    title: "Power of Two",
    leetcode: "LeetCode #231",
    difficulty: "Easy",
    problem:
      "Given an integer n, return true if it is a power of two. Otherwise, return false. An integer n is a power of two if there exists an integer x such that n == 2^x.",
    examples: [
      { input: "n = 16", output: "true", explanation: "16 = 2^4." },
      { input: "n = 3", output: "false", explanation: "3 is not a power of two." }
    ],
    constraints: ["-2^31 <= n <= 2^31 - 1"],
    approaches: [
      {
        name: "Optimal — Divide by 2 Repeatedly",
        kind: "optimal",
        time: "O(log n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public boolean isPowerOfTwo(int n) {
        if (n <= 0) return false;
        while (n % 2 == 0) {
            n /= 2;
        }
        return n == 1;
    }
}`
      }
    ],
    defaultInput: { n: 16 },
    dryRunInputs: [
      { n: 16 },
      { n: 3 }
    ],
    generateSteps({ n }) {
      const steps = [];
      let cur = n;

      steps.push({ line: 3, title: `n = ${n}`, action: n <= 0 ? `${n} ≤ 0, so it cannot be a power of two.` : "Keep halving while n is even.", parts: [
        { t: "vars", items: [{ k: "n", v: cur, c: "cur" }, { k: "n % 2", v: n <= 0 ? "-" : cur % 2 }] }
      ] });

      if (n <= 0) {
        steps.push({ line: 3, title: "Result", action: "Non-positive numbers are never powers of two.", parts: [
          { t: "result", label: "isPowerOfTwo", value: "false" }
        ] });
        return steps;
      }

      while (cur % 2 === 0) {
        const next = cur / 2;
        steps.push({ line: 5, title: `${cur} is even`, action: `${cur} ÷ 2 = ${next}. Divide again.`, parts: [
          { t: "vars", items: [{ k: "n", v: next, c: "hi" }] }
        ] });
        cur = next;
      }

      const ans = cur === 1;
      steps.push({ line: 7, title: `Stop at ${cur}`, action: ans ? `${n} reduced all the way to 1 → it is a power of two.` : `${cur} is odd and not 1 → ${n} is not a power of two.`, parts: [
        { t: "vars", items: [{ k: "n", v: cur, c: cur === 1 ? "ok" : "bad" }] },
        { t: "result", label: "isPowerOfTwo", value: ans ? "true" : "false" }
      ] });
      return steps;
    }
  },
  {
    id: "pow-x-n",
    title: "Pow(x, n)",
    leetcode: "LeetCode #50",
    difficulty: "Medium",
    problem:
      "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n), using fast exponentiation.",
    examples: [
      { input: "x = 2.0, n = 10", output: "1024", explanation: "2^10 = 1024." },
      { input: "x = 2.0, n = -2", output: "0.25", explanation: "2^-2 = 1 / 4 = 0.25." }
    ],
    constraints: ["-100.0 < x < 100.0", "-2^31 <= n <= 2^31 - 1", "Either x is not 0 or n > 0."],
    approaches: [
      {
        name: "Optimal — Fast Exponentiation",
        kind: "optimal",
        time: "O(log n)",
        space: "O(log n)",
        runs: true,
        javaCode: `class Solution {
    public double myPow(double x, int n) {
        long N = n;
        if (N < 0) {
            x = 1 / x;
            N = -N;
        }
        return fastPow(x, N);
    }

    private double fastPow(double x, long n) {
        if (n == 0) return 1.0;
        double half = fastPow(x, n / 2);
        if (n % 2 == 0) return half * half;
        return half * half * x;
    }
}`
      }
    ],
    defaultInput: { x: 2, n: 10 },
    dryRunInputs: [
      { x: 2, n: 10 },
      { x: 2, n: -2 }
    ],
    generateSteps({ x, n }) {
      const steps = [];
      let base = x;
      let exp = n;

      steps.push({ line: 3, title: `myPow(${x}, ${n})`, action: n < 0 ? "Negative exponent: invert x and make n positive." : "Exponent is already non-negative.", parts: [
        { t: "vars", items: [{ k: "x", v: base, c: "cur" }, { k: "n", v: exp, c: "cur" }] }
      ] });

      if (exp < 0) {
        base = 1 / x;
        exp = -exp;
        steps.push({ line: 5, title: "Invert base", action: `x = 1 / ${x} = ${base}, n = ${exp}.`, parts: [
          { t: "vars", items: [{ k: "x", v: base, c: "hi" }, { k: "n", v: exp, c: "hi" }] }
        ] });
      }

      const frames = [];
      const fastPow = (b, e) => {
        frames.push(`x^${e}`);
        steps.push({ line: 12, title: `fastPow(${b}, ${e})`, action: e === 0 ? "Exponent 0 is the base case → 1." : `Recurse into x^${Math.floor(e / 2)}.`, parts: [
          { t: "stack", label: "call stack", values: [...frames], hi: frames.length - 1 },
          { t: "vars", items: [{ k: "n", v: e, c: "cur" }] }
        ] });
        let val;
        if (e === 0) {
          val = 1;
        } else {
          const half = fastPow(b, Math.floor(e / 2));
          const even = e % 2 === 0;
          val = half * half * (even ? 1 : b);
          steps.push({ line: even ? 14 : 15, title: `x^${e} = ${val}`, action: even ? `n is even: half² = ${half} × ${half} = ${val}.` : `n is odd: half² × x = ${half} × ${half} × ${b} = ${val}.`, parts: [
            { t: "stack", label: "call stack", values: [...frames], hi: frames.length - 1 },
            { t: "vars", items: [{ k: "half", v: half }, { k: "n % 2", v: e % 2 }, { k: `x^${e}`, v: val, c: "hi" }] }
          ] });
        }
        frames.pop();
        return val;
      };
      const ans = fastPow(base, exp);

      steps.push({ line: 8, title: "Result", action: `${x}^${n} = ${ans}.`, parts: [
        { t: "result", label: "Answer", value: ans }
      ] });
      return steps;
    }
  },
  {
    id: "swap-nodes-in-pairs",
    title: "Swap Nodes in Pairs",
    leetcode: "LeetCode #24",
    difficulty: "Medium",
    problem:
      "Given a linked list, swap every two adjacent nodes and return its head. You must solve the problem without modifying the values in the list's nodes (only the nodes themselves may be changed).",
    examples: [
      { input: "head = [1, 2, 3, 4]", output: "[2, 1, 4, 3]", explanation: "Swap (1,2) → (2,1) and (3,4) → (4,3)." },
      { input: "head = [1, 2, 3]", output: "[2, 1, 3]", explanation: "The last unpaired node stays in place." }
    ],
    constraints: ["The number of nodes is in [0, 100]", "0 <= Node.val <= 100"],
    approaches: [
      {
        name: "Optimal — Recursive Pair Swap",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public ListNode swapPairs(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode second = head.next;
        head.next = swapPairs(second.next);
        second.next = head;
        return second;
    }
}`
      }
    ],
    defaultInput: { head: [1, 2, 3, 4] },
    dryRunInputs: [
      { head: [1, 2, 3, 4] },
      { head: [1, 2, 3] }
    ],
    generateSteps({ head }) {
      const steps = [];

      const ll = (label, arr) => ({ t: "ll", label, nodes: arr.map((v) => ({ v })) });

      steps.push({ line: 3, title: "Start", action: "Swap each adjacent pair; recurse on the rest of the list.", parts: [
        ll("list", head)
      ] });

      const rec = (a) => {
        if (a.length < 2) {
          steps.push({ line: 3, title: `Base case (${a.length} node)`, action: a.length === 0 ? "Empty list, nothing to swap." : `Single node ${a[0]} stays as is.`, parts: [
            ll("suffix", a)
          ] });
          return a.slice();
        }
        const [first, second, ...rest] = a;
        steps.push({ line: 4, title: `Pair (${first}, ${second})`, action: "Recurse on the remaining list before finishing this pair.", parts: [
          ll("current pair", [first, second]),
          ll("rest", rest)
        ] });
        const sub = rec(rest);
        const out = [second, first, ...sub];
        steps.push({ line: 6, title: `Link ${second} → ${first}`, action: `Swap the pair and attach the returned suffix [${sub.join(", ")}].`, parts: [
          ll("built so far", out),
          { t: "vars", items: [{ k: "second", v: second, c: "cur" }, { k: "first", v: first }, { k: "rest of result", v: `[${sub.join(", ")}]` }] }
        ] });
        return out;
      };
      const result = rec(head);

      steps.push({ line: 7, title: "Result", action: `Swapped list = [${result.join(", ")}]`, parts: [
        ll("result", result),
        { t: "result", label: "Answer", value: `[${result.join(", ")}]` }
      ] });
      return steps;
    }
  }
];

