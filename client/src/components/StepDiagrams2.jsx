import React from "react";

/* Part 2: linked list, tree */

function LinkedListPart({ part }) {
  const { label = "Linked List", nodes = [], ptrs = [], broken = [], newLink = [] } = part;
  return (
    <div className="diagram diagram-ll">
      <div className="diagram-label">{label}</div>
      <div className="ll-row">
        {nodes.map((n, i) => (
          <React.Fragment key={i}>
            <div className={`ll-node ${n.hi ? "ll-node-hi" : ""}`}>
              <span className="ll-val">{String(n.v ?? n)}</span>
              <span className="ll-next">{n.next === null ? "null" : "•"}</span>
            </div>
            {i < nodes.length - 1 && (
              <span
                className={`ll-arrow ${broken.includes(i) ? "ll-arrow-broken" : ""} ${
                  newLink.includes(i) ? "ll-arrow-new" : ""
                }`}
              >
                →
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="ll-ptrs">
        {ptrs.map((p, i) => (
          <span key={i} className={`ptr ptr-${p.c || "cur"}`} style={{ marginLeft: `${p.i * 74}px` }}>
            {p.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function TreePart({ part }) {
  const { label = "Tree", nodes = [], edges = [], hi = [], path = [], order, width, height } = part;
  const vb = `${width || 320} ${height || 180}`;
  return (
    <div className="diagram diagram-tree">
      <div className="diagram-label">{label}</div>
      <svg viewBox={vb} className="tree-svg" role="img" aria-label={label}>
        {edges.map((e, i) => {
          /* Accepts either explicit {x1,y1,x2,y2} lines or [fromVal, toVal]
             pairs resolved against the node list. */
          let x1, y1, x2, y2;
          if (Array.isArray(e)) {
            const a = nodes.find((n) => n.v === e[0]);
            const b = nodes.find((n) => n.v === e[1]);
            if (!a || !b) return null;
            ({ x: x1, y: y1 } = a);
            ({ x: x2, y: y2 } = b);
          } else {
            ({ x1, y1, x2, y2 } = e);
          }
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="tree-edge" />;
        })}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r="14"
              className={`tree-node ${hi.includes(n.v) ? "tree-node-hi" : ""} ${
                path.includes(n.v) ? "tree-node-path" : ""
              }`}
            />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="tree-node-text">
              {n.v}
            </text>
          </g>
        ))}
      </svg>
      {order && (
        <div className="vis-order">
          <span>Order: {order.join(" → ")}</span>
        </div>
      )}
    </div>
  );
}

export { LinkedListPart, TreePart };
