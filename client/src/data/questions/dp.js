export const dpQuestions = [
  {
    id: "climbing-stairs-dp",
    title: "Climbing Stairs",
    leetcode: "LeetCode #70",
    difficulty: "Easy",
    problem:
      "You are climbing a staircase with n steps. Each time you can climb 1 or 2 steps. In how many distinct ways can you reach the top?",
    examples: [
      { input: "n = 5", output: "8", explanation: "Ways follow Fibonacci: dp = [1,1,2,3,5,8]; dp[5] = 8." },
      { input: "n = 2", output: "2", explanation: "1+1 or 2." }
    ],
    constraints: ["1 <= n <= 45"],
    approaches: [
      {
        name: "Optimal — DP bottom-up",
        kind: "optimal",
        time: "O(n)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int[] dp = new int[n + 1];
        dp[0] = 1;
        dp[1] = 1;
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }
}`
      }
    ],
    defaultInput: { n: 5 },
    dryRunInputs: [
      { n: 5 },
      { n: 2 }
    ],
    generateSteps({ n }) {
      const steps = [];
      const dp = new Array(n + 1).fill(null);
      dp[0] = 1;
      if (n >= 1) dp[1] = 1;
      const dpPart = (cur = -1) => ({
        t: "array",
        label: "dp[i] = ways to reach step i",
        values: dp.map((v) => (v === null ? "·" : v)),
        marks: cur >= 0 ? { [cur]: "cur", ...(cur - 1 >= 0 ? { [cur - 1]: "hi" } : {}), ...(cur - 2 >= 0 ? { [cur - 2]: "hi" } : {}) } : { 0: "hi", 1: "hi" }
      });
      steps.push({ line: 4, title: "Base cases", action: "dp[0] = 1 (ground), dp[1] = 1 (one way).", parts: [
        dpPart(),
        { t: "vars", items: [{ k: "n", v: n }] }
      ] });
      for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
        steps.push({ line: 7, title: `Step ${i}`, action: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}.`, parts: [
          dpPart(i),
          { t: "vars", items: [{ k: "dp[i-1]", v: dp[i - 1] }, { k: "dp[i-2]", v: dp[i - 2] }, { k: "dp[i]", v: dp[i], c: "cur" }] }
        ] });
      }
      steps.push({ line: 9, title: "Result", action: `There are ${dp[n]} ways to climb ${n} steps.`, parts: [
        dpPart(n),
        { t: "result", label: "Answer", value: dp[n] }
      ] });
      return steps;
    }
  },
  {
    id: "house-robber",
    title: "House Robber",
    leetcode: "LeetCode #198",
    difficulty: "Medium",
    problem:
      "Given nums[i] money in house i, compute max loot without robbing two adjacent houses.",
    examples: [
      { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob houses 0 and 2: 1 + 3 = 4." },
      { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob 2 + 9 + 1 = 12." }
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    approaches: [
      {
        name: "Optimal — DP",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public int rob(int[] nums) {
        int prev2 = 0;
        int prev1 = 0;

        for (int money : nums) {
            int current = Math.max(
                prev1,
                prev2 + money
            );

            prev2 = prev1;
            prev1 = current;
        }

        return prev1;
    }
}`
      }
    ],
    defaultInput: { nums: [2, 7, 9, 3, 1] },
    dryRunInputs: [
      { nums: [1, 2, 3, 1] },
      { nums: [2, 7, 9, 3, 1] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      let prev2 = 0;
      let prev1 = 0;
      const housesPart = (cur = -1) => ({
        t: "array",
        label: "houses",
        values: [...nums],
        marks: cur >= 0 ? { [cur]: "cur" } : {},
        ...(cur >= 0 ? { ptrs: [{ i: cur, label: "money", c: "cur" }] } : {})
      });
      const varsPart = (money = null, current = null) => ({
        t: "vars",
        items: [
          { k: "prev2", v: prev2 },
          { k: "prev1", v: prev1 },
          ...(money !== null ? [{ k: "money", v: money, c: "cur" }] : []),
          ...(current !== null ? [{ k: "current", v: current, c: "cur" }] : [])
        ]
      });
      steps.push({ line: 3, title: "Initialize", action: "prev2 = 0 (two houses back), prev1 = 0 (one house back).", parts: [
        housesPart(),
        varsPart()
      ] });
      for (let i = 0; i < nums.length; i++) {
        const money = nums[i];
        const current = Math.max(prev1, prev2 + money);
        steps.push({ line: 7, title: `House ${i} ($${money})`, action: `current = max(prev1=${prev1}, prev2 + money=${prev2}+${money}) = ${current}. Then roll: prev2=${prev1}, prev1=${current}.`, parts: [
          housesPart(i),
          { t: "vars", items: [{ k: "prev2", v: prev2 }, { k: "prev1", v: prev1 }, { k: "money", v: money, c: "cur" }, { k: "current", v: current, c: "cur" }] }
        ] });
        prev2 = prev1;
        prev1 = current;
      }
      steps.push({ line: 16, title: "Result", action: `Max loot = ${prev1}.`, parts: [
        housesPart(nums.length - 1),
        varsPart(),
        { t: "result", label: "Answer", value: prev1 }
      ] });
      return steps;
    }
  },
  {
    id: "coin-change",
    title: "Coin Change",
    leetcode: "LeetCode #322",
    difficulty: "Medium",
    problem:
      "Given coin denominations and an amount, return the fewest coins needed to make that amount, or -1 if impossible. Unlimited coins of each type.",
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1, three coins." },
      { input: "coins = [2], amount = 3", output: "-1", explanation: "3 cannot be formed with 2s." }
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31-1", "0 <= amount <= 10^4"],
    approaches: [
      {
        name: "Optimal — DP bottom-up",
        kind: "optimal",
        time: "O(amount × n)",
        space: "O(amount)",
        runs: true,
        javaCode: `import java.util.*;

class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];

        Arrays.fill(dp, amount + 1);
        dp[0] = 0;

        for (int current = 1; current <= amount; current++) {
            for (int coin : coins) {
                if (coin <= current) {
                    dp[current] = Math.min(
                        dp[current],
                        dp[current - coin] + 1
                    );
                }
            }
        }

        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
      }
    ],
    defaultInput: { coins: [1, 2, 5], amount: 11 },
    dryRunInputs: [
      { coins: [1, 2, 5], amount: 11 },
      { coins: [2], amount: 3 }
    ],
    generateSteps({ coins, amount }) {
      const steps = [];
      const INF = amount + 1;
      const dp = new Array(amount + 1).fill(INF);
      dp[0] = 0;
      const dpPart = (cur = -1) => ({
        t: "array",
        label: "dp[a] = fewest coins (· = INF)",
        values: dp.map((v) => (v >= INF ? "·" : v)),
        marks: cur >= 0 ? { [cur]: "cur" } : { 0: "hi" }
      });
      steps.push({ line: 5, title: "Initialize", action: `dp[0] = 0, rest = INF. Coins: [${coins.join(", ")}].`, parts: [
        dpPart(),
        { t: "vars", items: [{ k: "amount", v: amount }] }
      ] });
      for (let i = 1; i <= amount; i++) {
        let best = INF;
        let bestCoin = null;
        for (const c of coins) {
          if (c <= i && dp[i - c] + 1 < best) { best = dp[i - c] + 1; bestCoin = c; }
        }
        dp[i] = best;
        if (i <= 12 || i === amount || i % Math.ceil(amount / 8) === 0 || amount <= 12) {
          steps.push({ line: 8, title: `Amount ${i}`, action: best >= INF ? `No coin fits a solvable subproblem → dp[${i}] = INF.` : `Best: use coin ${bestCoin}, dp[${i}] = dp[${i - bestCoin}] + 1 = ${best}.`, parts: [
            dpPart(i),
            { t: "vars", items: [{ k: "dp[i]", v: best >= INF ? "INF" : best, c: "cur" }, ...(bestCoin !== null ? [{ k: "coin", v: bestCoin }] : [])] }
          ] });
        }
      }
      const ans = dp[amount] > amount ? -1 : dp[amount];
      steps.push({ line: 20, title: "Result", action: ans === -1 ? `Amount ${amount} cannot be formed → -1.` : `Fewest coins for ${amount} = ${ans}.`, parts: [
        dpPart(amount),
        { t: "result", label: "Answer", value: ans }
      ] });
      return steps;
    }
  },
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    leetcode: "LeetCode #300",
    difficulty: "Medium",
    problem:
      "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    examples: [
      { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "One LIS is [2,3,7,101], length 4." },
      { input: "nums = [0,1,0,3,2,3]", output: "4", explanation: "One LIS is [0,1,2,3]." }
    ],
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    approaches: [
      {
        name: "Optimal — DP O(n^2)",
        kind: "optimal",
        time: "O(n^2)",
        space: "O(n)",
        runs: true,
        javaCode: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        int best = 1;
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
            }
            best = Math.max(best, dp[i]);
        }
        return best;
    }
}`
      }
    ],
    defaultInput: { nums: [10, 9, 2, 5, 3, 7, 101, 18] },
    dryRunInputs: [
      { nums: [10, 9, 2, 5, 3, 7, 101, 18] },
      { nums: [0, 1, 0, 3, 2, 3] }
    ],
    generateSteps({ nums }) {
      const steps = [];
      const n = nums.length;
      const dp = new Array(n).fill(1);
      let best = 1;
      const parts = (cur = -1, prev = -1) => ([
        { t: "array", label: "nums", values: [...nums], marks: { ...(cur >= 0 ? { [cur]: "cur" } : {}), ...(prev >= 0 ? { [prev]: "hi" } : {}) }, ptrs: cur >= 0 ? [{ i: cur, label: "i", c: "cur" }] : [] },
        { t: "array", label: "dp (LIS ending at i)", values: [...dp], marks: cur >= 0 ? { [cur]: "cur" } : { 0: "hi" } }
      ]);
      steps.push({ line: 4, title: "Initialize", action: "Every element alone is an LIS of length 1.", parts: [
        ...parts(),
        { t: "vars", items: [{ k: "best", v: 1 }] }
      ] });
      for (let i = 1; i < n; i++) {
        let improved = false;
        for (let j = 0; j < i; j++) {
          if (nums[j] < nums[i] && dp[j] + 1 > dp[i]) { dp[i] = dp[j] + 1; improved = true; }
        }
        best = Math.max(best, dp[i]);
        steps.push({ line: 8, title: `i = ${i} (num ${nums[i]})`, action: improved ? `Best extension gives dp[${i}] = ${dp[i]}. Best so far = ${best}.` : `No smaller element before → dp[${i}] stays ${dp[i]}. Best = ${best}.`, parts: [
          ...parts(i),
          { t: "vars", items: [{ k: "dp[i]", v: dp[i], c: "cur" }, { k: "best", v: best }] }
        ] });
      }
      steps.push({ line: 12, title: "Result", action: `Longest increasing subsequence has length ${best}.`, parts: [
        { t: "array", label: "dp (LIS ending at i)", values: [...dp], marks: Object.fromEntries(dp.map((v, i) => (v === best ? [i, "hi"] : [])).filter((x) => x.length)) },
        { t: "result", label: "Answer", value: best }
      ] });
      return steps;
    }
  },
  {
    id: "unique-paths",
    title: "Unique Paths",
    leetcode: "LeetCode #62",
    difficulty: "Medium",
    problem:
      "A robot on an m x n grid moves only right or down from the top-left to the bottom-right. Return the number of unique paths.",
    examples: [
      { input: "m = 3, n = 7", output: "28", explanation: "There are 28 paths in a 3 x 7 grid." },
      { input: "m = 3, n = 2", output: "3", explanation: "Paths: RD R, R RD, D RR variants = 3." }
    ],
    constraints: ["1 <= m, n <= 100", "Answer fits in 32-bit int"],
    approaches: [
      {
        name: "Optimal — DP grid",
        kind: "optimal",
        time: "O(m × n)",
        space: "O(m × n)",
        runs: true,
        javaCode: `class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];
        for (int r = 0; r < m; r++) dp[r][0] = 1;
        for (int c = 0; c < n; c++) dp[0][c] = 1;
        for (int r = 1; r < m; r++) {
            for (int c = 1; c < n; c++) {
                dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
            }
        }
        return dp[m - 1][n - 1];
    }
}`
      }
    ],
    defaultInput: { m: 3, n: 4 },
    dryRunInputs: [
      { m: 3, n: 4 },
      { m: 3, n: 2 }
    ],
    generateSteps({ m, n }) {
      const steps = [];
      const dp = Array.from({ length: m }, () => new Array(n).fill(0));
      for (let r = 0; r < m; r++) dp[r][0] = 1;
      for (let c = 0; c < n; c++) dp[0][c] = 1;
      const gridPart = (cell, deps = []) => ({
        t: "dp",
        label: "dp[r][c] = paths to cell",
        rows: dp.map((row) => row.map((v) => (v === 0 ? "·" : v))),
        ...(cell ? { cell } : {}),
        deps,
        filled: dp.flatMap((row, r) => row.map((v, c) => (v !== 0 ? [r, c] : null)).filter(Boolean)),
        note: `answer: dp[${m - 1}][${n - 1}]`
      });
      steps.push({ line: 4, title: "First row + column", action: "Only one path along the borders: all 1s.", parts: [
        gridPart(),
        { t: "vars", items: [{ k: "m", v: m }, { k: "n", v: n }] }
      ] });
      for (let r = 1; r < m; r++) {
        for (let c = 1; c < n; c++) {
          dp[r][c] = dp[r - 1][c] + dp[r][c - 1];
          if (m * n <= 30 || r === m - 1 || c === n - 1) {
            steps.push({ line: 7, title: `Cell (${r},${c})`, action: `dp[${r}][${c}] = ${dp[r - 1][c]} (top) + ${dp[r][c - 1]} (left) = ${dp[r][c]}.`, parts: [
              gridPart([r, c], [[r - 1, c], [r, c - 1]]),
              { t: "vars", items: [{ k: "top", v: dp[r - 1][c] }, { k: "left", v: dp[r][c - 1] }, { k: "dp", v: dp[r][c], c: "cur" }] }
            ] });
          }
        }
      }
      steps.push({ line: 11, title: "Result", action: `Unique paths = ${dp[m - 1][n - 1]}.`, parts: [
        gridPart([m - 1, n - 1]),
        { t: "result", label: "Answer", value: dp[m - 1][n - 1] }
      ] });
      return steps;
    }
  }
];
