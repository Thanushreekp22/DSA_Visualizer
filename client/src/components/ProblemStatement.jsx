import React from "react";

export default function ProblemStatement({ question }) {
  if (!question) return null;
  return (
    <section className="problem-section">
      <div className="problem-head">
        <h2 className="problem-title">{question.title}</h2>
        <span className={`difficulty diff-${question.difficulty.toLowerCase()}`}>
          {question.difficulty}
        </span>
        {question.leetcode && <span className="lc-badge">{question.leetcode}</span>}
      </div>

      <p className="problem-text">{question.problem}</p>

      <h4 className="examples-title">Examples</h4>
      <div className="examples">
        {question.examples.map((ex, i) => (
          <div key={i} className="example-card">
            <div className="example-label">Example {i + 1}</div>
            <div className="ex-line">
              <span className="ex-tag">Input</span>
              <code>{ex.input}</code>
            </div>
            <div className="ex-line">
              <span className="ex-tag">Output</span>
              <code>{ex.output}</code>
            </div>
            {ex.explanation && (
              <div className="ex-line">
                <span className="ex-tag">Explanation</span>
                <span>{ex.explanation}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {question.constraints && (
        <>
          <h4 className="examples-title">Constraints</h4>
          <ul className="constraints">
            {question.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
