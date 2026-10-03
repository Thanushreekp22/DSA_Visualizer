export const linkedListQuestions = [
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    leetcode: "LeetCode #206",
    difficulty: "Easy",
    problem:
      "Given the head of a singly linked list, reverse the list and return the reversed list's head.",
    examples: [
      { input: "head = [1, 2, 3, 4, 5]", output: "[5, 4, 3, 2, 1]", explanation: "Every next pointer flips to point backwards." },
      { input: "head = [1, 2]", output: "[2, 1]", explanation: "The two nodes swap direction." }
    ],
    constraints: ["The number of nodes is in [0, 5000]", "-5000 <= Node.val <= 5000"],
    approaches: [
      {
        name: "Optimal — Iterative Three Pointers",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        return prev;
    }
}`
      }
    ],
    defaultInput: { head: [1, 2, 3, 4, 5] },
    dryRunInputs: [
      { head: [1, 2, 3, 4, 5] },
      { head: [1, 2] }
    ],
    generateSteps({ head }) {
      const steps = [];
      const nodes = head.map((v) => ({ v }));
      let prev = null;
      let curr = 0;

      const remaining = () => nodes.slice(curr).map((n) => ({ v: n.v }));
      const reversedList = () => {
        const out = [];
        for (let i = curr - 1; i >= 0; i--) out.push({ v: nodes[i].v });
        return out;
      };
      const vars = () => ({
        t: "vars",
        items: [
          { k: "prev", v: prev === null ? "null" : nodes[prev].v },
          { k: "curr", v: curr < nodes.length ? nodes[curr].v : "null", c: "hi" },
          { k: "next", v: curr + 1 < nodes.length ? nodes[curr + 1].v : "null" }
        ]
      });

      steps.push({ line: 3, title: "Initialize", action: "prev = null, curr = head.", parts: [
        { t: "ll", label: "original list", nodes: nodes.map((n) => ({ v: n.v })) },
        vars()
      ] });

      while (curr < nodes.length) {
        const nextVal = curr + 1 < nodes.length ? nodes[curr + 1].v : "null";
        steps.push({ line: 6, title: `next = ${nextVal}`, action: "Save the next node before breaking the link.", parts: [
          { t: "ll", label: "reversed part", nodes: reversedList() },
          { t: "ll", label: "remaining", nodes: remaining() },
          vars()
        ] });

        steps.push({ line: 7, title: `Reverse link at ${nodes[curr].v}`, action: `Set ${nodes[curr].v}.next → ${prev === null ? "null" : nodes[prev].v}.`, parts: [
          { t: "ll", label: "reversed part", nodes: reversedList() },
          { t: "ll", label: "remaining", nodes: remaining() },
          vars()
        ] });

        prev = curr;
        curr = curr + 1;
        steps.push({ line: 8, title: "Advance prev and curr", action: `prev → ${nodes[prev].v}, curr → ${curr < nodes.length ? nodes[curr].v : "null"}.`, parts: [
          { t: "ll", label: "reversed part", nodes: reversedList() },
          { t: "ll", label: "remaining", nodes: remaining() },
          vars()
        ] });
      }

      const finalList = nodes.slice().reverse().map((n) => n.v);
      steps.push({ line: 11, title: "Result", action: `Reversed list = [${finalList.join(", ")}]`, parts: [
        { t: "ll", label: "reversed list", nodes: finalList.map((v) => ({ v })) },
        { t: "result", label: "Answer", value: `[${finalList.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    leetcode: "LeetCode #21",
    difficulty: "Easy",
    problem:
      "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list by splicing together the nodes of the first two lists, and return the head of the merged list.",
    examples: [
      { input: "list1 = [1, 2, 4], list2 = [1, 3, 4]", output: "[1, 1, 2, 3, 4, 4]", explanation: "Compare the two heads each round and attach the smaller." },
      { input: "list1 = [], list2 = [0]", output: "[0]", explanation: "An empty list means the other is returned as is." }
    ],
    constraints: ["The number of nodes in each list is in [0, 50]", "-100 <= Node.val <= 100", "Both lists are sorted in non-decreasing order."],
    approaches: [
      {
        name: "Optimal — Dummy Head Two Pointers",
        kind: "optimal",
        time: "O(n + m)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(-1);
        ListNode tail = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }
        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`
      }
    ],
    defaultInput: { list1: [1, 2, 4], list2: [1, 3, 4] },
    dryRunInputs: [
      { list1: [1, 2, 4], list2: [1, 3, 4] },
      { list1: [1, 3, 5], list2: [2, 4, 6] }
    ],
    generateSteps({ list1, list2 }) {
      const steps = [];
      const a = [...list1];
      const b = [...list2];
      let i = 0;
      let j = 0;
      const merged = [];

      steps.push({ line: 3, title: "Initialize", action: "Create a dummy node and a tail pointer.", parts: [
        { t: "ll", label: "list1", nodes: a.map((v) => ({ v })) },
        { t: "ll", label: "list2", nodes: b.map((v) => ({ v })) },
        { t: "vars", items: [{ k: "dummy", v: "-1" }, { k: "tail", v: "dummy" }] }
      ] });

      while (i < a.length && j < b.length) {
        const pick = a[i] <= b[j];
        const val = pick ? a[i] : b[j];
        steps.push({ line: 6, title: `Compare ${a[i]} vs ${b[j]}`, action: `${a[i]} <= ${b[j]} is ${pick}, so take ${val}.`, parts: [
          { t: "ll", label: "list1", nodes: a.slice(i).map((v) => ({ v })), ptrs: [{ i: 0, label: "list1", c: "hi" }] },
          { t: "ll", label: "list2", nodes: b.slice(j).map((v) => ({ v })), ptrs: [{ i: 0, label: "list2", c: "hi" }] }
        ] });

        merged.push(val);
        if (pick) i += 1;
        else j += 1;
        steps.push({ line: pick ? 7 : 10, title: `Attach ${val}`, action: `tail.next = ${val}; advance that list.`, parts: [
          { t: "ll", label: "merged", nodes: merged.map((v) => ({ v })), ptrs: [{ i: merged.length - 1, label: "tail", c: "cur" }] },
          { t: "ll", label: "list1", nodes: a.slice(i).map((v) => ({ v })) },
          { t: "ll", label: "list2", nodes: b.slice(j).map((v) => ({ v })) }
        ] });
      }

      const leftover = i < a.length ? a.slice(i) : b.slice(j);
      leftover.forEach((v) => merged.push(v));
      steps.push({ line: 15, title: "Attach the leftover", action: leftover.length ? `Append remaining [${leftover.join(", ")}].` : "Both lists are exhausted.", parts: [
        { t: "ll", label: "merged", nodes: merged.map((v) => ({ v })) },
        { t: "result", label: "Merged list", value: `[${merged.join(", ")}]` }
      ] });

      steps.push({ line: 16, title: "Result", action: `Return dummy.next = [${merged.join(", ")}]`, parts: [
        { t: "ll", label: "merged list", nodes: merged.map((v) => ({ v })) },
        { t: "result", label: "Answer", value: `[${merged.join(", ")}]` }
      ] });
      return steps;
    }
  },
  {
    id: "middle-of-linked-list",
    title: "Middle of the Linked List",
    leetcode: "LeetCode #876",
    difficulty: "Easy",
    problem:
      "Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes (even length), return the second middle node.",
    examples: [
      { input: "head = [1, 2, 3, 4, 5]", output: "3", explanation: "The single middle node is 3." },
      { input: "head = [1, 2, 3, 4]", output: "3", explanation: "Two middles (2 and 3) → return the second, 3." }
    ],
    constraints: ["The number of nodes is in [1, 100]", "1 <= Node.val <= 100"],
    approaches: [
      {
        name: "Optimal — Fast and Slow Pointers",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}`
      }
    ],
    defaultInput: { head: [1, 2, 3, 4, 5] },
    dryRunInputs: [
      { head: [1, 2, 3, 4, 5] },
      { head: [1, 2, 3, 4] }
    ],
    generateSteps({ head }) {
      const steps = [];
      const nodes = head.map((v) => ({ v }));
      let slow = 0;
      let fast = 0;

      const listPart = (label, hiIndexes) => ({
        t: "ll",
        label,
        nodes: nodes.map((n, i) => ({ v: n.v, hi: hiIndexes.includes(i) })),
        ptrs: [
          { i: slow, label: "slow", c: "cur" },
          { i: fast, label: "fast", c: "hi" }
        ]
      });

      steps.push({ line: 3, title: "Initialize", action: "Both pointers start at the head.", parts: [
        listPart("list", [slow, fast])
      ] });

      while (fast < nodes.length && fast + 1 < nodes.length) {
        slow += 1;
        fast += 2;
        steps.push({ line: 6, title: `slow → ${nodes[slow].v}, fast → ${fast < nodes.length ? nodes[fast].v : "null"}`, action: "slow moves one step, fast moves two.", parts: [
          listPart("list", [slow, Math.min(fast, nodes.length - 1)]),
          { t: "vars", items: [
            { k: "slow", v: nodes[slow].v, c: "cur" },
            { k: "fast", v: fast < nodes.length ? nodes[fast].v : "null", c: "hi" }
          ] }
        ] });
      }

      steps.push({ line: 9, title: "Result", action: `fast reached the end, so slow is the middle node: ${nodes[slow].v}.`, parts: [
        listPart("list", [slow]),
        { t: "result", label: "Middle node", value: nodes[slow].v }
      ] });
      return steps;
    }
  },
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    leetcode: "LeetCode #141",
    difficulty: "Easy",
    problem:
      "Given head, the head of a linked list, determine if the linked list has a cycle in it. There is a cycle if some node in the list can be reached again by continuously following the next pointer. pos denotes the index the tail connects to (-1 means no cycle).",
    examples: [
      { input: "head = [3, 2, 0, -4], pos = 1", output: "true", explanation: "The tail connects back to index 1, making a cycle." },
      { input: "head = [1, 2], pos = -1", output: "false", explanation: "The tail points to null, so there is no cycle." }
    ],
    constraints: ["The number of nodes is in [0, 10^4]", "-10^5 <= Node.val <= 10^5", "pos is -1 or a valid index."],
    approaches: [
      {
        name: "Optimal — Floyd's Tortoise and Hare",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `public class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`
      }
    ],
    defaultInput: { head: [3, 2, 0, -4], pos: 1 },
    dryRunInputs: [
      { head: [3, 2, 0, -4], pos: 1 },
      { head: [1, 2], pos: -1 }
    ],
    generateSteps({ head, pos }) {
      const steps = [];
      const n = head.length;
      const nodes = head.map((v) => ({ v }));

      const step1 = (i) => {
        if (i === null) return null;
        if (i < n - 1) return i + 1;
        return pos >= 0 ? pos : null;
      };
      const step2 = (i) => step1(step1(i));

      let slow = n > 0 ? 0 : null;
      let fast = n > 0 ? 0 : null;

      const listPart = () => ({
        t: "ll",
        label: `list (tail → ${pos >= 0 ? `index ${pos}` : "null"})`,
        nodes: nodes.map((x) => ({ v: x.v })),
        ptrs: [
          ...(slow !== null ? [{ i: slow, label: "slow", c: "cur" }] : []),
          ...(fast !== null ? [{ i: fast, label: "fast", c: "hi" }] : [])
        ]
      });

      steps.push({ line: 3, title: "Initialize", action: pos >= 0 ? `The tail links back to index ${pos}.` : "There is no cycle.", parts: [
        listPart()
      ] });

      let guard = 0;
      while (fast !== null && step1(fast) !== null && guard < 30) {
        guard += 1;
        slow = step1(slow);
        fast = step2(fast);
        steps.push({ line: 6, title: `slow → index ${slow}, fast → ${fast === null ? "null" : `index ${fast}`}`, action: "Move slow by one node and fast by two nodes.", parts: [
          listPart(),
          { t: "vars", items: [
            { k: "slow", v: slow, c: "cur" },
            { k: "fast", v: fast === null ? "null" : fast, c: "hi" }
          ] }
        ] });
        if (slow === fast) {
          steps.push({ line: 8, title: "Meet!", action: `slow and fast are both at index ${slow}, so a cycle exists.`, parts: [
            listPart(),
            { t: "result", label: "hasCycle", value: "true" }
          ] });
          return steps;
        }
      }

      steps.push({ line: 10, title: "Result", action: "fast reached the end of the list, so there is no cycle.", parts: [
        listPart(),
        { t: "result", label: "hasCycle", value: "false" }
      ] });
      return steps;
    }
  },
  {
    id: "remove-nth-node-from-end",
    title: "Remove Nth Node From End of List",
    leetcode: "LeetCode #19",
    difficulty: "Medium",
    problem:
      "Given the head of a linked list, remove the n-th node from the end of the list and return its head.",
    examples: [
      { input: "head = [1, 2, 3, 4, 5], n = 2", output: "[1, 2, 3, 5]", explanation: "The 2nd node from the end is 4, so it is unlinked." },
      { input: "head = [1], n = 1", output: "[]", explanation: "The single node is removed and the list becomes empty." }
    ],
    constraints: ["The number of nodes is in [1, 30]", "0 <= Node.val <= 100", "1 <= n <= size of list"],
    approaches: [
      {
        name: "Optimal — Dummy + Two Pointers",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy;
        ListNode slow = dummy;
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`
      }
    ],
    defaultInput: { head: [1, 2, 3, 4, 5], n: 2 },
    dryRunInputs: [
      { head: [1, 2, 3, 4, 5], n: 2 },
      { head: [1, 2, 3, 4], n: 4 }
    ],
    generateSteps({ head, n }) {
      const steps = [];
      const labels = ["dummy(0)", ...head.map((v) => v)];
      const size = labels.length;

      let fast = 0;
      let slow = 0;
      const nullIdx = size;

      const listPart = (label) => ({
        t: "ll",
        label,
        nodes: labels.map((v, i) => ({ v: i === 0 ? "0" : v, hi: i === slow })),
        ptrs: [
          { i: slow, label: "slow", c: "cur" },
          ...(fast < size ? [{ i: fast, label: "fast", c: "hi" }] : [])
        ]
      });

      steps.push({ line: 3, title: "Add a dummy node", action: "A dummy node in front simplifies removing the head.", parts: [
        { t: "ll", label: "list (dummy + head)", nodes: labels.map((v, i) => ({ v: i === 0 ? "0" : v })) }
      ] });

      for (let k = 0; k < n + 1; k++) {
        fast += 1;
        steps.push({ line: 7, title: `Advance fast (${k + 1}/${n + 1})`, action: "Move fast ahead so a gap of n+1 nodes forms.", parts: [
          listPart("list"),
          { t: "vars", items: [
            { k: "fast", v: fast >= size ? "null" : labels[fast], c: "hi" },
            { k: "slow", v: slow === 0 ? "dummy" : labels[slow], c: "cur" }
          ] }
        ] });
      }

      while (fast < nullIdx) {
        fast += 1;
        slow += 1;
        steps.push({ line: 11, title: "Move both pointers", action: "Advance fast and slow together until fast reaches null.", parts: [
          listPart("list"),
          { t: "vars", items: [
            { k: "fast", v: fast >= size ? "null" : labels[fast], c: "hi" },
            { k: "slow", v: slow === 0 ? "dummy" : labels[slow], c: "cur" }
          ] }
        ] });
      }

      const removed = labels[slow + 1];
      steps.push({ line: 14, title: `Unlink ${removed}`, action: "slow.next = slow.next.next skips the target node.", parts: [
        {
          t: "ll",
          label: "list (removing)",
          nodes: labels.map((v, i) => ({ v: i === 0 ? "0" : v })),
          broken: [slow],
          ptrs: [{ i: slow, label: "slow", c: "cur" }]
        }
      ] });

      const result = head.filter((_, idx) => idx !== slow);
      steps.push({ line: 15, title: "Result", action: `Return dummy.next = [${result.join(", ")}]`, parts: [
        { t: "ll", label: "result", nodes: result.map((v) => ({ v })) },
        { t: "result", label: "Answer", value: result.length ? `[${result.join(", ")}]` : "[]" }
      ] });
      return steps;
    }
  },
  {
    id: "palindrome-linked-list",
    title: "Palindrome Linked List",
    leetcode: "LeetCode #234",
    difficulty: "Easy",
    problem:
      "Given the head of a singly linked list, return true if it is a palindrome or false otherwise.",
    examples: [
      { input: "head = [1, 2, 2, 1]", output: "true", explanation: "Reversing the second half gives [1,2] which matches the first half." },
      { input: "head = [1, 2]", output: "false", explanation: "1 != 2, so it is not a palindrome." }
    ],
    constraints: ["The number of nodes is in [1, 10^5]", "0 <= Node.val <= 9"],
    approaches: [
      {
        name: "Optimal — Middle, Reverse Half, Compare",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public boolean isPalindrome(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode prev = null;
        while (slow != null) {
            ListNode next = slow.next;
            slow.next = prev;
            prev = slow;
            slow = next;
        }
        ListNode left = head, right = prev;
        while (right != null) {
            if (left.val != right.val) return false;
            left = left.next;
            right = right.next;
        }
        return true;
    }
}`
      }
    ],
    defaultInput: { head: [1, 2, 2, 1] },
    dryRunInputs: [
      { head: [1, 2, 2, 1] },
      { head: [1, 2] }
    ],
    generateSteps({ head }) {
      const steps = [];
      const nodes = head.map((v) => ({ v }));
      const n = nodes.length;

      let slow = 0;
      let fast = 0;
      while (fast < n && fast + 1 < n) {
        slow += 1;
        fast += 2;
      }
      const mid = slow;

      const llPart = (label, arr, hi) => ({
        t: "ll",
        label,
        nodes: arr.map((v) => ({ v })),
        ...(hi !== undefined ? { ptrs: [{ i: hi, label: "ptr", c: "cur" }] } : {})
      });

      steps.push({ line: 3, title: "Find the middle", action: "slow moves 1 step, fast moves 2 steps, so slow lands on the middle.", parts: [
        { t: "ll", label: "list", nodes: nodes.map((x) => ({ v: x.v })), ptrs: [{ i: mid, label: "slow/mid", c: "cur" }] },
        { t: "vars", items: [{ k: "mid index", v: mid, c: "hi" }] }
      ] });

      const secondHalf = head.slice(mid);
      const reversedSecond = secondHalf.slice().reverse();

      steps.push({ line: 9, title: "Reverse the second half", action: `Reverse [${secondHalf.join(", ")}] → [${reversedSecond.join(", ")}].`, parts: [
        llPart("second half", secondHalf),
        llPart("reversed second half", reversedSecond)
      ] });

      const half = Math.floor(n / 2);
      let ok = true;
      for (let k = 0; k < half; k++) {
        const a = head[k];
        const b = reversedSecond[k];
        const match = a === b;
        if (!match) ok = false;
        steps.push({ line: 17, title: `Compare ${a} and ${b}`, action: match ? "They match, continue." : "Mismatch → not a palindrome.", parts: [
          llPart("left half", head.slice(0, half), k),
          llPart("right half (reversed)", reversedSecond, k),
          { t: "result", label: "match", value: match ? "true" : "false" }
        ] });
        if (!match) break;
      }

      steps.push({ line: 21, title: "Result", action: ok ? "All pairs matched, the list is a palindrome." : "A mismatch was found, so it is not a palindrome.", parts: [
        { t: "result", label: "isPalindrome", value: ok ? "true" : "false" }
      ] });
      return steps;
    }
  },
  {
    id: "reorder-list",
    title: "Reorder List",
    leetcode: "LeetCode #143",
    difficulty: "Medium",
    problem:
      "You are given the head of a singly linked list. Reorder it to: L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ... You may not modify the values in the nodes — only the nodes themselves may be rearranged.",
    examples: [
      { input: "head = [1, 2, 3, 4]", output: "[1, 4, 2, 3]", explanation: "Fold the reversed second half into the first half." },
      { input: "head = [1, 2, 3, 4, 5]", output: "[1, 5, 2, 4, 3]", explanation: "The middle node stays at the end." }
    ],
    constraints: ["The number of nodes is in [1, 5 * 10^4]", "1 <= Node.val <= 1000"],
    approaches: [
      {
        name: "Optimal — Split, Reverse, Merge",
        kind: "optimal",
        time: "O(n)",
        space: "O(1)",
        runs: true,
        javaCode: `class Solution {
    public void reorderList(ListNode head) {
        if (head == null || head.next == null) return;
        ListNode slow = head, fast = head;
        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode second = slow.next;
        slow.next = null;
        ListNode prev = null;
        while (second != null) {
            ListNode next = second.next;
            second.next = prev;
            prev = second;
            second = next;
        }
        ListNode first = head;
        second = prev;
        while (second != null) {
            ListNode t1 = first.next;
            ListNode t2 = second.next;
            first.next = second;
            second.next = t1;
            first = t1;
            second = t2;
        }
    }
}`
      }
    ],
    defaultInput: { head: [1, 2, 3, 4] },
    dryRunInputs: [
      { head: [1, 2, 3, 4] },
      { head: [1, 2, 3, 4, 5] }
    ],
    generateSteps({ head }) {
      const steps = [];
      const n = head.length;

      let slow = 0;
      let fast = 0;
      while (fast + 1 < n && fast + 2 < n) {
        slow += 1;
        fast += 2;
      }
      const mid = slow;

      steps.push({ line: 5, title: "Find the middle", action: `slow stops at index ${mid} (value ${head[mid]}); the list is split after it.`, parts: [
        { t: "ll", label: "list", nodes: head.map((v) => ({ v })), ptrs: [{ i: mid, label: "slow", c: "cur" }] }
      ] });

      const firstHalf = head.slice(0, mid + 1);
      const secondHalf = head.slice(mid + 1);
      steps.push({ line: 9, title: "Split into two halves", action: `first = [${firstHalf.join(", ")}], second = [${secondHalf.join(", ")}].`, parts: [
        { t: "ll", label: "first half", nodes: firstHalf.map((v) => ({ v })) },
        { t: "ll", label: "second half", nodes: secondHalf.map((v) => ({ v })) }
      ] });

      const rev = secondHalf.slice().reverse();
      steps.push({ line: 12, title: "Reverse the second half", action: `[${secondHalf.join(", ")}] → [${rev.join(", ")}].`, parts: [
        { t: "ll", label: "first half", nodes: firstHalf.map((v) => ({ v })) },
        { t: "ll", label: "reversed second half", nodes: rev.map((v) => ({ v })) }
      ] });

      const result = [];
      for (let i = 0; i < firstHalf.length; i++) {
        result.push(firstHalf[i]);
        if (i < rev.length) {
          result.push(rev[i]);
          steps.push({ line: 23, title: `Link ${firstHalf[i]} → ${rev[i]}`, action: `Splice the front of the reversed half after ${firstHalf[i]}.`, parts: [
            { t: "ll", label: "merged so far", nodes: result.map((v) => ({ v })) },
            { t: "vars", items: [{ k: "first", v: firstHalf[i], c: "cur" }, { k: "second", v: rev[i], c: "hi" }] }
          ] });
        }
      }

      steps.push({ line: 28, title: "Result", action: `Reordered list = [${result.join(", ")}]`, parts: [
        { t: "ll", label: "reordered list", nodes: result.map((v) => ({ v })) },
        { t: "result", label: "Answer", value: `[${result.join(", ")}]` }
      ] });
      return steps;
    }
  }
];

