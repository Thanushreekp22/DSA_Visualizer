import React from "react";

/* ------------------------------------------------------------------
   StepRenderer draws ONE algorithm step.
   A step is { line, title, action, parts: [...] }.
   Each part declares a diagram type so every question reuses the
   same drawing code: array, map, stack, queue, ll, tree, graph, dp,
   bars, vars, text, result.
-------------------------------------------------------------------*/

function PtrRow({ ptrs }) {
  if (!ptrs || ptrs.length === 0) return null;
  return (
    <div className="ptr-row">
      {ptrs.map((p, idx) => (
        <span key={idx} className={`ptr ptr-${p.c || "cur"}`}>
          {p.label}
        </span>
      ))}
    </div>
  );
}

function ArrayPart({ part }) {
  const { label, values, marks = {}, ptrs = [], window: win, indices = true } = part;
  return (
    <div className="diagram diagram-array">
      {label && <div className="diagram-label">{label}</div>}
      <div className="array-boxes">
        {values.map((v, i) => {
          const cls = [
            "abox",
            marks[i] ? `abox-${marks[i]}` : "",
            win && i >= win[0] && i <= win[1] ? "abox-window" : ""
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <div key={i} className="abox-wrap">
              <div className={cls}>{String(v)}</div>
              {indices && <div className="abox-idx">{i}</div>}
            </div>
          );
        })}
      </div>
      <div className="ptr-slots" style={{ gridTemplateColumns: `repeat(${values.length}, minmax(0,1fr))` }}>
        {values.map((_, i) => {
          const here = (ptrs || []).filter((p) => p.i === i);
          return (
            <div key={i} className="ptr-cell">
              {here.map((p, k) => (
                <span key={k} className={`ptr ptr-${p.c || "cur"}`}>
                  {p.label}
                </span>
              ))}
            </div>
          );
        })}
      </div>
      {part.note && <div className="diagram-note">{part.note}</div>}
    </div>
  );
}

function MapPart({ part }) {
  const { label = "HashMap", entries = [], hiKey } = part;
  return (
    <div className="diagram diagram-map">
      <div className="diagram-label">{label}</div>
      <div className="map-box">
        {entries.length === 0 && <div className="map-empty">{"{ }"}</div>}
        {entries.map(([k, v], i) => (
          <div key={i} className={`map-entry ${String(k) === String(hiKey) ? "map-entry-hi" : ""}`}>
            <span className="map-key">{k}</span>
            <span className="map-arrow">→</span>
            <span className="map-val">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SetPart({ part }) {
  const { label = "Set", values = [], hi } = part;
  return (
    <div className="diagram diagram-map">
      <div className="diagram-label">{label}</div>
      <div className="map-box">
        {values.length === 0 && <div className="map-empty">{"{ }"}</div>}
        {values.map((v, i) => (
          <div key={i} className={`map-entry ${String(v) === String(hi) ? "map-entry-hi" : ""}`}>
            <span className="map-key">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackPart({ part }) {
  const { label = "Stack", values = [], hi } = part;
  return (
    <div className="diagram diagram-stack">
      <div className="diagram-label">{label}</div>
      <div className="stack-col">
        {values.length === 0 && <div className="stack-empty">(empty)</div>}
        {values
          .slice()
          .reverse()
          .map((v, i) => {
            const realIdx = values.length - 1 - i;
            return (
              <div key={realIdx} className={`stack-cell ${realIdx === hi ? "stack-cell-hi" : ""}`}>
                {String(v)}
                {realIdx === values.length - 1 && <span className="stack-top-tag">top</span>}
              </div>
            );
          })}
      </div>
    </div>
  );
}

function QueuePart({ part }) {
  const { label = "Queue", values = [], front, rear, hi } = part;
  return (
    <div className="diagram diagram-queue">
      <div className="diagram-label">{label}</div>
      <div className="queue-row">
        {values.length === 0 && <div className="stack-empty">(empty)</div>}
        {values.map((v, i) => (
          <div
            key={i}
            className={[
              "queue-cell",
              i === hi ? "queue-cell-hi" : "",
              i === front ? "queue-front" : "",
              i === rear ? "queue-rear" : ""
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {String(v)}
            {i === front && <span className="q-tag q-front">front</span>}
            {i === rear && <span className="q-tag q-rear">rear</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export { ArrayPart, MapPart, SetPart, StackPart, QueuePart };
