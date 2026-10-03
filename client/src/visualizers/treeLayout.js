/* Turn a nested tree definition into fixed x/y node + edge lists so the
   SVG renderer stays generic.

   Input node: { v: 4, l: {v:2}, r: {v:7} }
   Output: { nodes:[{v,x,y}], edges:[{x1,y1,x2,y2}] }  */

const V_GAP = 54;

export function layoutTree(root) {
  if (!root) return { nodes: [], edges: [] };

  let order = 0;

  function depth(n) {
    if (!n) return 0;
    return 1 + Math.max(depth(n.l), depth(n.r));
  }

  // in-order walk assigns a left-to-right column index to each node
  function inOrder(n) {
    if (!n) return;
    inOrder(n.l);
    n.__col = order++;
    inOrder(n.r);
  }
  inOrder(root);

  const maxDepth = depth(root);
  const totalCols = order;
  const hGap = Math.min(58, Math.max(30, 300 / Math.max(totalCols - 1, 1)));

  const nodes = [];
  const edges = [];

  function walk(n, level) {
    if (!n) return null;
    const x = 30 + n.__col * hGap;
    const y = 24 + level * V_GAP;
    const entry = { v: n.v, x, y };
    nodes.push(entry);
    const left = walk(n.l, level + 1);
    const right = walk(n.r, level + 1);
    if (left) edges.push({ x1: x, y1: y, x2: left.x, y2: left.y });
    if (right) edges.push({ x1: x, y1: y, x2: right.x, y2: right.y });
    return entry;
  }
  walk(root, 0);

  const width = 30 + Math.max(totalCols - 1, 0) * hGap + 30;
  const height = 24 + Math.max(maxDepth - 1, 0) * V_GAP + 30;
  return { nodes, edges, width, height };
}

