import { arraysQuestions } from "./questions/arrays";
import { stringsQuestions } from "./questions/strings";
import { slidingWindowQuestions } from "./questions/sliding-window";
import { twoPointersQuestions } from "./questions/two-pointers";
import { stackQueueQuestions } from "./questions/stack-queue";
import { linkedListQuestions } from "./questions/linked-list";
import { hashingQuestions } from "./questions/hashing";
import { binarySearchQuestions } from "./questions/binary-search";
import { treesQuestions } from "./questions/trees";
import { recursionQuestions } from "./questions/recursion";
import { backtrackingQuestions } from "./questions/backtracking";
import { greedyQuestions } from "./questions/greedy";
import { heapsQuestions } from "./questions/heaps";
import { graphsQuestions } from "./questions/graphs";
import { dpQuestions } from "./questions/dp";

export const questionData = {
  arrays: arraysQuestions,
  strings: stringsQuestions,
  "sliding-window": slidingWindowQuestions,
  "two-pointers": twoPointersQuestions,
  "stack-queue": stackQueueQuestions,
  "linked-list": linkedListQuestions,
  hashing: hashingQuestions,
  "binary-search": binarySearchQuestions,
  trees: treesQuestions,
  recursion: recursionQuestions,
  backtracking: backtrackingQuestions,
  greedy: greedyQuestions,
  heaps: heapsQuestions,
  graphs: graphsQuestions,
  dp: dpQuestions
};
