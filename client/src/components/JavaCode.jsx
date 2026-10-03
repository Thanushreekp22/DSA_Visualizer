import React from "react";

/* Lightweight Java syntax highlighter.
   Splits the source into tokens, then colours keywords, types, strings,
   comments, numbers and annotations. The active line (from the current
   visualization step) gets a highlighted background. */

const KEYWORDS = new Set([
  "abstract","assert","boolean","break","byte","case","catch","char","class","const","continue",
  "default","do","double","else","enum","extends","final","finally","float","for","goto","if",
  "implements","import","instanceof","int","interface","long","native","new","package","private",
  "protected","public","return","short","static","strictfp","super","switch","synchronized","this",
  "throw","throws","transient","try","void","volatile","while","var","record","yield"
]);

const LITERAL = new Set(["true", "false", "null"]);

const TYPE_RE = /^[A-Z][A-Za-z0-9_]*$/;

function tokenize(line) {
  const out = [];
  let i = 0;
  const n = line.length;
  while (i < n) {
    const ch = line[i];

    // line comment
    if (ch === "/" && line[i + 1] === "/") {
      out.push({ t: "comment", v: line.slice(i) });
      break;
    }
    // string or char literal
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < n && line[j] !== quote) {
        if (line[j] === "\\") j++;
        j++;
      }
      out.push({ t: "string", v: line.slice(i, Math.min(j + 1, n)) });
      i = j + 1;
      continue;
    }
    // annotation
    if (ch === "@") {
      let j = i + 1;
      while (j < n && /[A-Za-z0-9_]/.test(line[j])) j++;
      out.push({ t: "annot", v: line.slice(i, j) });
      i = j;
      continue;
    }
    // number
    if (/[0-9]/.test(ch)) {
      let j = i;
      while (j < n && /[0-9._a-fA-FxX]/.test(line[j])) j++;
      out.push({ t: "num", v: line.slice(i, j) });
      i = j;
      continue;
    }
    // word
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i;
      while (j < n && /[A-Za-z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);
      let t = "ident";
      if (KEYWORDS.has(word)) t = "kw";
      else if (LITERAL.has(word)) t = "num";
      else if (TYPE_RE.test(word)) t = "type";
      out.push({ t, v: word });
      i = j;
      continue;
    }
    // operator / punctuation
    out.push({ t: "op", v: ch });
    i++;
  }
  return out;
}

export default function JavaCode({ approaches, activeLine }) {
  if (!approaches || approaches.length === 0) return null;

  const runsIdx = approaches.findIndex((a) => a.runs);
  const target = runsIdx >= 0 ? runsIdx : approaches.length - 1;

  return (
    <section className="code-section">
      <h3 className="section-title">Java Code</h3>

      {approaches.map((ap, aIdx) => (
        <div key={aIdx} className="approach-block">
          <div className="approach-head">
            <span className={`approach-name ${ap.kind ? `approach-${ap.kind}` : ""}`}>
              {ap.name}
            </span>
            {ap.time && <span className="cx-badge">Time {ap.time}</span>}
            {ap.space && <span className="cx-badge">Space {ap.space}</span>}
          </div>

          <pre className="code-block">
            <code>
              {ap.javaCode.split("\n").map((line, idx) => {
                const lineNo = idx + 1;
                const isActive = aIdx === target && activeLine === lineNo;
                return (
                  <span
                    key={idx}
                    className={`code-line ${isActive ? "code-line-active" : ""}`}
                  >
                    <span className="code-gutter">{lineNo}</span>
                    <span className="code-text">
                      {tokenize(line).map((tok, k) => (
                        <span key={k} className={`tok-${tok.t}`}>
                          {tok.v}
                        </span>
                      ))}
                      {line.length === 0 ? " " : ""}
                    </span>
                  </span>
                );
              })}
            </code>
          </pre>
        </div>
      ))}
    </section>
  );
}
