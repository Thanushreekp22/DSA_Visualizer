import React, { useEffect, useMemo, useRef, useState } from "react";
import StepRenderer from "./StepRenderer";

/* Live visualization: generates the algorithm trace once, then steps
   through it with Play / Pause / Previous / Next / Reset.
   Reports the active Java line to the parent so JavaCode can highlight it. */

export default function Visualization({ question, onActiveLine }) {
  const steps = useMemo(() => {
    if (!question || typeof question.generateSteps !== "function") return [];
    try {
      return question.generateSteps(question.defaultInput) || [];
    } catch (err) {
      console.error("trace failed for", question.id, err);
      return [];
    }
  }, [question]);

  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    setIdx(0);
    setPlaying(false);
  }, [question]);

  useEffect(() => {
    const step = steps[idx];
    if (step && onActiveLine) onActiveLine(step.line ?? null);
  }, [idx, steps, onActiveLine]);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setIdx((prev) => {
          if (prev >= steps.length - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1100);
    }
    return () => clearInterval(timer.current);
  }, [playing, steps.length]);

  if (!question) return null;

  if (steps.length === 0) {
    return (
      <section className="viz-section">
        <h3 className="section-title">Visualization</h3>
        <p className="viz-empty">
          Live visualization is not available for this question yet.
        </p>
      </section>
    );
  }

  const step = steps[idx];

  return (
    <section className="viz-section">
      <div className="viz-head">
        <h3 className="section-title">Visualization</h3>
        <span className="viz-counter">
          Step {idx + 1} / {steps.length}
        </span>
      </div>

      <div className="viz-stage">
        <StepRenderer step={step} />
      </div>

      <div className="viz-progress">
        <div
          className="viz-progress-fill"
          style={{ width: `${((idx + 1) / steps.length) * 100}%` }}
        />
      </div>

      <div className="viz-controls">
        <button className="ctrl" onClick={() => { setPlaying(false); setIdx(0); }} disabled={idx === 0 && !playing}>
          ⏮ Reset
        </button>
        <button className="ctrl" onClick={() => { setPlaying(false); setIdx((p) => Math.max(0, p - 1)); }} disabled={idx === 0}>
          ◀ Prev
        </button>
        {playing ? (
          <button className="ctrl ctrl-primary" onClick={() => setPlaying(false)}>
            ❚❚ Pause
          </button>
        ) : (
          <button
            className="ctrl ctrl-primary"
            onClick={() => {
              if (idx >= steps.length - 1) setIdx(0);
              setPlaying(true);
            }}
          >
            ▶ Play
          </button>
        )}
        <button
          className="ctrl"
          onClick={() => { setPlaying(false); setIdx((p) => Math.min(steps.length - 1, p + 1)); }}
          disabled={idx >= steps.length - 1}
        >
          Next ▶
        </button>
        <button className="ctrl" onClick={() => { setPlaying(false); setIdx(steps.length - 1); }} disabled={idx >= steps.length - 1}>
          ⏭ End
        </button>
      </div>
    </section>
  );
}
