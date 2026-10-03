export const greedyQuestions = [
  {
    id: "best-time-to-buy-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    leetcode: "LeetCode #121",
    difficulty: "Easy",
    problem:
      "You are given an array prices where prices[i] is the price of a given stock on day i. You want to maximize profit by choosing a single day to buy and a different day in the future to sell. Return the maximum profit, or 0 if no profit is possible.",
    examples: [
      { input: "prices = [7, 1, 5, 3, 6, 4]", output: "5", explanation: "Buy at 1 (day 1) and sell at 6 (day 4) → 6 - 1 = 5." },
      { input: "prices = [7, 6, 4, 3, 1]", output: "0", explanation: "Prices only fall, so no transaction gives profit." }
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    approaches: [
      {
        name: "Optimal — Track the Minimum Price",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int best = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > best) {
                best = price - minPrice;
            }
        }
        return best;
    }
}`
      }
    ],
    defaultInput: { prices: [7, 1, 5, 3, 6, 4] },
    dryRunInputs: [
      { prices: [7, 1, 5, 3, 6, 4] },
      { prices: [7, 6, 4, 3, 1] }
    ],
    generateSteps({ prices }) {
      const steps = [];
      let minPrice = Infinity;
      let best = 0;

      const ptrs = (i) => [{ i, label: "i", c: "cur" }];

      steps.push({ line: 3, title: "Initialize", action: "Track the lowest price seen so far and the best profit.", parts: [
        { t: "array", label: "prices", values: [...prices], marks: {} },
        { t: "vars", items: [{ k: "minPrice", v: "∞" }, { k: "best", v: best, c: "hi" }] }
      ] });

      for (let i = 0; i < prices.length; i++) {
        const price = prices[i];
        if (price < minPrice) {
          minPrice = price;
          steps.push({ line: 7, title: `New low ${price}`, action: `${price} < previous low, so minPrice = ${price}.`, parts: [
            { t: "array", label: "prices", values: [...prices], marks: { [i]: "cur" }, ptrs: ptrs(i) },
            { t: "vars", items: [{ k: "minPrice", v: minPrice, c: "hi" }, { k: "best", v: best }] }
          ] });
        } else {
          const profit = price - minPrice;
          const better = profit > best;
          if (better) best = profit;
          steps.push({ line: better ? 9 : 8, title: `Sell at ${price}`, action: `profit = ${price} - ${minPrice} = ${profit}; best = ${best}.`, parts: [
            { t: "array", label: "prices", values: [...prices], marks: { [i]: better ? "ok" : "cur" }, ptrs: ptrs(i) },
            { t: "vars", items: [{ k: "buy", v: minPrice }, { k: "sell", v: price }, { k: "best", v: best, c: "hi" }] }
          ] });
        }
      }

      steps.push({ line: 12, title: "Result", action: `The maximum profit is ${best}.`, parts: [
        { t: "array", label: "prices", values: [...prices], marks: {} },
        { t: "result", label: "Answer", value: best }
      ] });
      return steps;
    }
  },
  {
    id: "jump-game",
    title: "Jump Game",
    leetcode: "LeetCode #55",
    difficulty: "Medium",
    problem:
      "You are given an integer array nums. You are initially positioned at the first index, and each element nums[i] represents the maximum jump length from that position. Return true if you can reach the last index, else false.",
    examples: [
      { input: "nums = [2, 3, 1, 1, 4]", output: "true", explanation: "Jump 1 (index 0 → 1) then 3 (index 1 → 4)." },
      { input: "nums = [3, 2, 1, 0, 4]", output: "false", explanation: "Index 3 has value 0 and blocks all progress." }
    ],
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
    approaches: [
      {
        name: "Optimal — Greedy Farthest Reach",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public boolean canJump(int[] nums) {
        int reach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > reach) return false;
            reach = Math.max(reach, i + nums[i]);
            if (reach >= nums.length - 1) return true;
        }
        return true;
    }
}`
      }
    ],
    defaultInput: { nums: [2, 3, 1, 1, 4] },
    dryRunInputs: [
      { nums: [2, 3, 1, 1, 4] },
      { nums: [3, 2, 1, 0, 4] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const n = nums.length;
      let reach = 0;

      const marks = () => {
        const m = {};
        for (let i = 0; i < n; i++) if (i <= reach) m[i] = "ok";
        return m;
      };

      steps.push({ line: 3, title: "Initialize", action: "reach = farthest index we can currently jump to.", parts: [
        { t: "array", label: "nums", values: [...nums], marks: {} },
        { t: "vars", items: [{ k: "reach", v: reach, c: "hi" }, { k: "last index", v: n - 1 }] }
      ] });

      let blocked = false;
      let reached = false;
      for (let i = 0; i < n; i++) {
        if (i > reach) {
          blocked = true;
          steps.push({ line: 5, title: `Stuck at ${i}`, action: `i = ${i} > reach = ${reach}, so index ${i} is unreachable.`, parts: [
            { t: "array", label: "nums", values: [...nums], marks: { ...marks(), [i]: "bad" }, ptrs: [{ i, label: "i", c: "cur" }] },
            { t: "vars", items: [{ k: "reach", v: reach, c: "hi" }] },
            { t: "result", label: "canJump", value: "false" }
          ] });
          break;
        }
        const newReach = Math.max(reach, i + nums[i]);
        const grew = newReach > reach;
        const prev = reach;
        reach = newReach;
        steps.push({ line: 6, title: `i = ${i}, reach = ${reach}`, action: `Farthest = max(${prev}, ${i} + ${nums[i]}) = ${reach}.`, parts: [
          { t: "array", label: "nums", values: [...nums], marks: { ...marks(), [i]: "cur" }, ptrs: [{ i, label: "i", c: "cur" }] },
          { t: "vars", items: [{ k: "i + nums[i]", v: i + nums[i] }, { k: "reach", v: reach, c: grew ? "hi" : undefined }] }
        ] });
        if (reach >= n - 1) {
          reached = true;
          steps.push({ line: 7, title: "Last index reachable", action: `reach = ${reach} ≥ ${n - 1}, so we can reach the end.`, parts: [
            { t: "array", label: "nums", values: [...nums], marks: { ...marks(), [n - 1]: "ok" } },
            { t: "result", label: "canJump", value: "true" }
          ] });
          break;
        }
      }

      if (!blocked && !reached) {
        steps.push({ line: 9, title: "Result", action: "The loop finished while still able to continue → true.", parts: [
          { t: "result", label: "canJump", value: "true" }
        ] });
      }
      return steps;
    }
  },
  {
    id: "gas-station",
    title: "Gas Station",
    leetcode: "LeetCode #134",
    difficulty: "Medium",
    problem:
      "There are n gas stations along a circular route. gas[i] is the gas at station i and cost[i] is the gas needed to travel to station i+1. Starting with an empty tank, return the starting station index if you can travel around the circuit once, else -1. If a solution exists, it is unique.",
    examples: [
      { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3", explanation: "Starting at index 3, the tank never goes negative." },
      { input: "gas = [2,3,4], cost = [3,4,3]", output: "-1", explanation: "Total gas (9) < total cost (10), so no start works." }
    ],
    constraints: ["n == gas.length == cost.length", "1 <= n <= 10^5", "0 <= gas[i], cost[i] <= 10^4"],
    approaches: [
      {
        name: "Optimal — Greedy Reset on Negative Tank",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int total = 0, tank = 0, start = 0;
        for (int i = 0; i < gas.length; i++) {
            int diff = gas[i] - cost[i];
            total += diff;
            tank += diff;
            if (tank < 0) {
                start = i + 1;
                tank = 0;
            }
        }
        return total >= 0 ? start : -1;
    }
}`
      }
    ],
    defaultInput: { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] },
    dryRunInputs: [
      { gas: [1, 2, 3, 4, 5], cost: [3, 4, 5, 1, 2] },
      { gas: [2, 3, 4], cost: [3, 4, 3] }
    ],
    generateSteps({ gas, cost }) {
      const steps = [];
      const n = gas.length;
      let total = 0;
      let tank = 0;
      let start = 0;

      const diffArr = () => gas.map((g, i) => g - cost[i]);
      const varsPart = (extra = {}) => ({ t: "vars", items: [
        { k: "tank", v: tank, c: "hi" },
        { k: "total", v: total },
        { k: "start", v: start, c: "cur" },
        ...(extra.i != null ? [{ k: "diff", v: diffArr()[extra.i] }] : [])
      ] });

      steps.push({ line: 3, title: "Initialize", action: "tank tracks the current segment; total tracks the whole net.", parts: [
        { t: "array", label: "gas", values: [...gas] },
        { t: "array", label: "cost", values: [...cost] },
        varsPart()
      ] });

      for (let i = 0; i < n; i++) {
        const diff = gas[i] - cost[i];
        total += diff;
        tank += diff;
        steps.push({ line: 7, title: `i = ${i}: diff = ${diff}`, action: `tank becomes ${tank}, total becomes ${total}.`, parts: [
          { t: "array", label: "gas - cost", values: diffArr(), marks: { [i]: "cur" }, ptrs: [{ i, label: "i", c: "cur" }] },
          varsPart({ i })
        ] });
        if (tank < 0) {
          start = i + 1;
          tank = 0;
          steps.push({ line: 9, title: `Tank went negative → start = ${start}`, action: `Nothing from ${start - 1} could be a start, so reset the tank.`, parts: [
            { t: "array", label: "gas - cost", values: diffArr(), marks: { [i]: "bad" }, ptrs: [{ i: start < n ? start : n - 1, label: "start", c: "cur" }] },
            varsPart()
          ] });
        }
      }

      const ans = total >= 0 ? start : -1;
      steps.push({ line: 13, title: "Result", action: total >= 0 ? `total gas surplus ${total} ≥ 0, so station ${start} completes the circuit.` : `total gas surplus ${total} < 0, so the trip is impossible.`, parts: [
        { t: "result", label: "Answer", value: ans }
      ] });
      return steps;
    }
  },
  {
    id: "lemonade-change",
    title: "Lemonade Change",
    leetcode: "LeetCode #860",
    difficulty: "Easy",
    problem:
      "At a lemonade stand, each lemonade costs $5. Customers pay with $5, $10, or $20 bills, and you must give correct change using the bills collected so far. Return true if you can provide every customer with correct change.",
    examples: [
      { input: "bills = [5, 5, 5, 10, 20]", output: "true", explanation: "Enough $5 bills accumulate to make change." },
      { input: "bills = [5, 5, 10, 10, 20]", output: "false", explanation: "The $20 needs $15 of change but only $10 is available." }
    ],
    constraints: ["1 <= bills.length <= 10^5", "bills[i] is 5, 10, or 20."],
    approaches: [
      {
        name: "Optimal — Greedy Change Giving",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public boolean lemonadeChange(int[] bills) {
        int five = 0, ten = 0;
        for (int bill : bills) {
            if (bill == 5) {
                five++;
            } else if (bill == 10) {
                if (five == 0) return false;
                five--;
                ten++;
            } else {
                if (ten > 0 && five > 0) {
                    ten--;
                    five--;
                } else if (five >= 3) {
                    five -= 3;
                } else {
                    return false;
                }
            }
        }
        return true;
    }
}`
      }
    ],
    defaultInput: { bills: [5, 5, 5, 10, 20] },
    dryRunInputs: [
      { bills: [5, 5, 5, 10, 20] },
      { bills: [5, 5, 10, 10, 20] }
    ],
    generateSteps({ bills }) {
      const steps = [];
      let five = 0;
      let ten = 0;

      const varsPart = () => ({ t: "vars", items: [
        { k: "$5 bills", v: five, c: "hi" },
        { k: "$10 bills", v: ten }
      ] });

      steps.push({ line: 3, title: "Initialize", action: "Track how many $5 and $10 bills we hold.", parts: [
        { t: "array", label: "bills", values: [...bills] },
        varsPart()
      ] });

      let ok = true;
      for (let i = 0; i < bills.length; i++) {
        const bill = bills[i];
        if (bill === 5) {
          five++;
          steps.push({ line: 6, title: `$5 received`, action: "No change needed; keep the $5.", parts: [
            { t: "array", label: "bills", values: [...bills], marks: { [i]: "ok" }, ptrs: [{ i, label: "bill", c: "cur" }] },
            varsPart()
          ] });
        } else if (bill === 10) {
          if (five === 0) {
            ok = false;
            steps.push({ line: 8, title: "Cannot change $10", action: "No $5 bill for the $5 change → fail.", parts: [
              { t: "array", label: "bills", values: [...bills], marks: { [i]: "bad" }, ptrs: [{ i, label: "bill", c: "cur" }] },
              varsPart(),
              { t: "result", label: "Answer", value: "false" }
            ] });
            break;
          }
          five--;
          ten++;
          steps.push({ line: 10, title: "Change $5 for $10", action: "Give back one $5, receive the $10.", parts: [
            { t: "array", label: "bills", values: [...bills], marks: { [i]: "ok" }, ptrs: [{ i, label: "bill", c: "cur" }] },
            varsPart()
          ] });
        } else {
          if (ten > 0 && five > 0) {
            ten--;
            five--;
            steps.push({ line: 13, title: "$20: give $10 + $5", action: "Greedy: prefer a $10 plus a $5 to preserve $5 bills.", parts: [
              { t: "array", label: "bills", values: [...bills], marks: { [i]: "ok" }, ptrs: [{ i, label: "bill", c: "cur" }] },
              varsPart()
            ] });
          } else if (five >= 3) {
            five -= 3;
            steps.push({ line: 16, title: "$20: give three $5", action: "No $10 available, so hand back three $5 bills.", parts: [
              { t: "array", label: "bills", values: [...bills], marks: { [i]: "ok" }, ptrs: [{ i, label: "bill", c: "cur" }] },
              varsPart()
            ] });
          } else {
            ok = false;
            steps.push({ line: 18, title: "Cannot change $20", action: "Neither $10+$5 nor three $5 are available → fail.", parts: [
              { t: "array", label: "bills", values: [...bills], marks: { [i]: "bad" }, ptrs: [{ i, label: "bill", c: "cur" }] },
              varsPart(),
              { t: "result", label: "Answer", value: "false" }
            ] });
            break;
          }
        }
      }

      if (ok) {
        steps.push({ line: 22, title: "Result", action: "Every customer received correct change.", parts: [
          varsPart(),
          { t: "result", label: "Answer", value: "true" }
        ] });
      }
      return steps;
    }
  },
  {
    id: "assign-cookies",
    title: "Assign Cookies",
    leetcode: "LeetCode #455",
    difficulty: "Easy",
    problem:
      "Assume you are a parent with some cookies. Each child i has a greed factor g[i] and each cookie j has a size s[j]. A cookie can be assigned to a child if s[j] >= g[i]. Maximize the number of content children and return that number.",
    examples: [
      { input: "g = [1, 2, 3], s = [1, 1]", output: "1", explanation: "Only one cookie can satisfy the greed-1 child." },
      { input: "g = [10, 9, 8, 7], s = [5, 6, 7, 8]", output: "2", explanation: "Cookies 7 and 8 satisfy children 7 and 8." }
    ],
    constraints: ["1 <= g.length <= 3 * 10^4", "0 <= s.length <= 3 * 10^4", "1 <= g[i], s[j] <= 2^31 - 1"],
    approaches: [
      {
        name: "Optimal — Sort Both and Use Two Pointers",
        kind: "optimal",
        time: "O(n log n + m log m)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int findContentChildren(int[] g, int[] s) {
        Arrays.sort(g);
        Arrays.sort(s);
        int i = 0, j = 0;
        while (i < g.length && j < s.length) {
            if (s[j] >= g[i]) {
                i++;
            }
            j++;
        }
        return i;
    }
}`
      }
    ],
    defaultInput: { g: [1, 2, 3], s: [1, 1] },
    dryRunInputs: [
      { g: [1, 2, 3], s: [1, 1] },
      { g: [10, 9, 8, 7], s: [5, 6, 7, 8] }
    ],
    generateSteps({ g, s }) {
      const steps = [];
      const gs = [...g].sort((a, b) => a - b);
      const ss = [...s].sort((a, b) => a - b);
      let i = 0;
      let j = 0;

      const ptrs = () => [
        ...(i < gs.length ? [{ i, label: "i (child)", c: "l" }] : []),
        ...(j < ss.length ? [{ i: j, label: "j (cookie)", c: "r" }] : [])
      ];

      steps.push({ line: 3, title: "Sort both arrays", action: "Greedy: give the smallest cookie that satisfies the least greedy child.", parts: [
        { t: "array", label: "greed g (sorted)", values: gs },
        { t: "array", label: "cookies s (sorted)", values: ss },
        { t: "vars", items: [{ k: "i", v: 0 }, { k: "j", v: 0 }, { k: "content", v: 0 }] }
      ] });

      while (i < gs.length && j < ss.length) {
        const fits = ss[j] >= gs[i];
        steps.push({ line: 7, title: `Compare s[${j}]=${ss[j]} with g[${i}]=${gs[i]}`, action: fits ? "Cookie is big enough → satisfy this child." : "Cookie is too small → move to the next cookie.", parts: [
          { t: "array", label: "greed g (sorted)", values: gs, marks: { [i]: fits ? "ok" : "cur" }, ptrs: ptrs() },
          { t: "array", label: "cookies s (sorted)", values: ss, marks: { [j]: fits ? "ok" : "bad" }, ptrs: ptrs() }
        ] });
        if (fits) i++;
        j++;
        steps.push({ line: fits ? 8 : 10, title: fits ? `Child ${i - 1} content` : "Skip cookie", action: `i = ${i}, j = ${j}, content children = ${i}.`, parts: [
          { t: "array", label: "greed g (sorted)", values: gs, marks: Object.fromEntries(Array.from({ length: i }, (_, k) => [k, "ok"])) },
          { t: "array", label: "cookies s (sorted)", values: ss, marks: Object.fromEntries(Array.from({ length: j }, (_, k) => [k, "bad"])) },
          { t: "vars", items: [{ k: "i", v: i, c: "cur" }, { k: "j", v: j }, { k: "content", v: i, c: "hi" }] }
        ] });
      }

      steps.push({ line: 12, title: "Result", action: `Maximum content children = ${i}.`, parts: [
        { t: "array", label: "greed g (sorted)", values: gs, marks: Object.fromEntries(Array.from({ length: i }, (_, k) => [k, "ok"])) },
        { t: "result", label: "Answer", value: i }
      ] });
      return steps;
    }
  }
];

