import React, { useEffect, useMemo, useState } from "react";
import StepRenderer from "./StepRenderer";

/* Static dry run: runs the same trace generator against each example's
   input and renders EVERY step at once as written diagrams (no tables).
   Two selectable examples via a dropdown. */

export default function DryRun({ question }) {
  const examples = question?.examples || [];

  const traces = useMemo(() => {
    if (!question || typeof question.generateSteps !== "function") return [];
    const inputFor = question.dryRunInputs || examples.map((e) => e.inputValue);
    return examples.map((ex, i) => {
      let steps = [];
      try {
        const input = inputFor[i] !== undefined ? inputFor[i] : question.defaultInput;
        steps = question.generateSteps(input) || [];
      } catch (err) {
        console.error("dry run failed", question.id, err);
        steps = [];
      }
      return { label: `Example ${i + 1} dry run`, example: ex, steps };
    });
  }, [question, examples]);

  const [sel, setSel] = useState(0);

  // reset to example 1 whenever the question changes
  useEffect(() => {
    setSel(0);
  }, [question]);

  if (!question || traces.length === 0) {
    return (
      <section className="dryrun-section">
        <h3 className="section-title">Dry Run</h3>
        <p className="viz-empty">Dry run is not available for this question yet.</p>
      </section>
    );
  }

  const current = traces[Math.min(sel, traces.length - 1)];

  return (
    <section className="dryrun-section">
      <div className="dryrun-head">
        <h3 className="section-title">Dry Run</h3>
        <label className="dryrun-select-wrap">
          <span className="dryrun-select-label">Choose example:</span>
          <select
            className="dryrun-select"
            value={Math.min(sel, traces.length - 1)}
            onChange={(e) => setSel(Number(e.target.value))}
          >
            {traces.map((t, i) => (
              <option key={i} value={i}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="dryrun-input">
        <span className="ex-tag">Input</span>
        <code>{current.example.input}</code>
        <span className="ex-tag ex-tag-out">Output</span>
        <code>{current.example.output}</code>
      </div>

      <div className="dryrun-steps">
        {current.steps.map((step, i) => (
          <div key={i} className="dryrun-step">
            <span className="dryrun-step-no">Step {i + 1}</span>
            <StepRenderer step={{ ...step, title: step.title || `Step ${i + 1}` }} />
          </div>
        ))}
        {current.steps.length === 0 && (
          <p className="viz-empty">No trace steps for this example.</p>
        )}
      </div>
    </section>
  );
}
