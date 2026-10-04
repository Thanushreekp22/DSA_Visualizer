import React from "react";
import { topicCheatSheets } from "../data/topicCheatSheets";

/* Renders the image-style concept sheet for a topic. Returns null when no
   sheet data exists so TopicPage can fall back to the plain theory view. */

function CsRow({ row }) {
  const kind = row.kind || "text";
  const highlights = row.highlights || [];
  return (
    <div className={`cs-row cs-row--${kind}`}>
      <span className="cs-row-label">{row.label}</span>
      <div
        className="cs-row-cells"
        style={{ gridTemplateColumns: `repeat(${row.values.length}, minmax(0, 1fr))` }}
      >
        {row.values.map((v, i) => (
          <span
            key={i}
            className={`cs-cell${highlights.includes(i) ? " cs-cell-hi" : ""}`}
          >
            {v === "" ? "\u00A0" : v}
          </span>
        ))}
      </div>
    </div>
  );
}

function CsTable({ rows }) {
  return (
    <div className="cs-table-scroll">
      <div className="cs-table">
        {rows.map((row, i) => (
          <CsRow key={i} row={row} />
        ))}
      </div>
    </div>
  );
}

function bulletText(b) {
  return typeof b === "string" ? b : b.text;
}

function bulletHighlighted(b) {
  return typeof b !== "string" && b.highlight;
}

export default function TopicCheatSheet({ topicId }) {
  const sheet = topicCheatSheets[topicId];
  if (!sheet) return null;

  const { definition, structure, storage, keyPoints, visual, tip } = sheet;

  return (
    <section className="cheat-sheet" aria-label={`${sheet.title} concept sheet`}>
      <h2 className="cs-title" style={{ color: sheet.accent }}>
        {sheet.title}
      </h2>

      <div className="cs-grid2">
        <div>
          <h3 className="cs-h cs-h--label">{definition.heading}</h3>
          {definition.paras.map((p, i) => (
            <p key={i} className="cs-p">
              {p}
            </p>
          ))}
        </div>
        <div>
          <h3 className="cs-h cs-h--label">{structure.heading}</h3>
          <ul className="cs-list">
            {structure.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="cs-rule" />

      <h3 className="cs-section-title">{storage.heading}</h3>

      <div className="cs-grid2 cs-grid2--mid">
        <div>
          <h4 className="cs-h cs-h--pink">{storage.exampleLabel}</h4>
          <p className="cs-code">{storage.exampleCode}</p>
          <CsTable rows={storage.rows} />
          {(storage.extraTables || []).map((t, i) => (
            <div key={i}>
              <h4 className="cs-h cs-h--pink cs-extra-h">{t.heading}</h4>
              <CsTable rows={t.rows} />
            </div>
          ))}
        </div>
        <div className="cs-notes">
          <ul className="cs-list">
            {storage.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="cs-rule" />

      <div className="cs-grid2">
        <div>
          <h3 className="cs-h cs-h--pink">{keyPoints.heading}</h3>
          <ul className="cs-list">
            {keyPoints.bullets.map((b, i) => (
              <li key={i} className={bulletHighlighted(b) ? "cs-li-hi" : undefined}>
                {bulletText(b)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="cs-h cs-h--pink">{visual.heading}</h3>
          <CsTable rows={[visual.top, visual.boxed]} />
          <div className="cs-caption">
            <span className="cs-cap-line" />
            <span>{visual.caption}</span>
            <span className="cs-cap-line" />
          </div>
        </div>
      </div>

      <div className="cs-tip">
        <span className="cs-tip-icon" aria-hidden="true">
          💡
        </span>
        <div>
          {tip.lines.map((l, i) => (
            <p key={i} className="cs-tip-line">
              <span className="cs-tip-label">{l.label}</span> {l.text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
