/* Part 3: graph, DP grid, bars, variables */

function GraphPart({ part }) {
  const {
    label = "Graph",
    nodes = [],
    edges = [],
    visited = {},
    current,
    queue = [],
    queueLabel = "Queue"
  } = part;
  return (
    <div className="diagram diagram-graph">
      <div className="diagram-label">{label}</div>
      <svg viewBox="0 0 320 200" className="graph-svg" role="img" aria-label={label}>
        {edges.map((e, i) => {
          const a = nodes.find((n) => n.id === e[0]);
          const b = nodes.find((n) => n.id === e[1]);
          if (!a || !b) return null;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={`graph-edge ${e[2] === "on" ? "graph-edge-on" : ""}`}
            />
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle
              cx={n.x}
              cy={n.y}
              r="16"
              className={[
                "graph-node",
                visited[n.id] ? "graph-visited" : "",
                current === n.id ? "graph-current" : ""
              ]
                .filter(Boolean)
                .join(" ")}
            />
            <text x={n.x} y={n.y + 4} textAnchor="middle" className="tree-node-text">
              {n.label ?? n.id}
            </text>
          </g>
        ))}
      </svg>
      {queue.length > 0 && (
        <div className="graph-queue">
          <span className="diagram-label-inline">{queueLabel}:</span>
          <span className="graph-queue-items">{queue.join(", ")}</span>
        </div>
      )}
    </div>
  );
}

function DPGridPart({ part }) {
  const { label = "DP", rows = [], cell, deps = [], filled = [], note } = part;
  const isCell = (r, c) => cell && cell[0] === r && cell[1] === c;
  const isDep = (r, c) => deps.some((d) => d[0] === r && d[1] === c);
  const isFilled = (r, c) => filled.some((d) => d[0] === r && d[1] === c);
  return (
    <div className="diagram diagram-dp">
      <div className="diagram-label">{label}</div>
      <div className="dp-grid">
        {rows.map((row, r) => (
          <div key={r} className="dp-row">
            {row.map((v, c) => (
              <div
                key={c}
                className={[
                  "dp-cell",
                  isCell(r, c) ? "dp-cell-cur" : "",
                  isDep(r, c) ? "dp-cell-dep" : "",
                  isFilled(r, c) ? "dp-cell-filled" : "",
                  v === null || v === undefined || v === Infinity ? "dp-cell-empty" : ""
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {v === null || v === undefined || v === Infinity ? "•" : String(v)}
              </div>
            ))}
          </div>
        ))}
      </div>
      {note && <div className="diagram-note">{note}</div>}
    </div>
  );
}

function BarsPart({ part }) {
  const { label, values = [], marks = {}, ptrs = [] } = part;
  const max = Math.max(...values.map((v) => Math.abs(v)), 1);
  return (
    <div className="diagram diagram-bars">
      <div className="diagram-label">{label}</div>
      <div className="bars-row">
        {values.map((v, i) => (
          <div key={i} className="bar-col">
            <div className="bar-val">{v}</div>
            <div
              className={`bar ${marks[i] ? `bar-${marks[i]}` : ""}`}
              style={{ height: `${Math.max(6, (Math.abs(v) / max) * 70)}px` }}
            />
            <div className="abox-idx">{i}</div>
          </div>
        ))}
      </div>
      <div
        className="ptr-slots"
        style={{ gridTemplateColumns: `repeat(${values.length}, minmax(0,1fr))` }}
      >
        {values.map((_, i) => (
          <div key={i} className="ptr-cell">
            {(ptrs || [])
              .filter((p) => p.i === i)
              .map((p, k) => (
                <span key={k} className={`ptr ptr-${p.c || "cur"}`}>
                  {p.label}
                </span>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function VarsPart({ part }) {
  const { label = "Variables", items = [] } = part;
  return (
    <div className="diagram diagram-vars">
      {label && <div className="diagram-label">{label}</div>}
      <div className="vars-row">
        {items.map((it, i) => (
          <span key={i} className={`var-chip ${it.c ? `var-${it.c}` : ""}`}>
            <span className="var-k">{it.k}</span>
            <span className="var-eq">=</span>
            <span className="var-v">{String(it.v)}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export { GraphPart, DPGridPart, BarsPart, VarsPart };
