import React, { useEffect, useRef, useState } from "react";
import StepRenderer from "./StepRenderer";

/* Interactive player for the topic-theory visualizations.
   Renders one step at a time with Play / Prev / Next / Reset controls. */
export default function TheoryViz({ viz }) {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    setIdx(0);
    setPlaying(false);
  }, [viz]);

  useEffect(() => {
    if (playing) {
      timer.current = setInterval(() => {
        setIdx((prev) => {
          if (prev >= viz.steps.length - 1) {
            setPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 1200);
    }
    return () => clearInterval(timer.current);
  }, [playing, viz]);

  if (!viz || !viz.steps || viz.steps.length === 0) return null;

  const step = viz.steps[idx];

  return (
    <section className="theory-viz">
      <div className="viz-head">
        <h3 className="section-title">Interactive visualization — {viz.title}</h3>
        <span className="viz-counter">
          Step {idx + 1} / {viz.steps.length}
        </span>
      </div>

      <div className="viz-stage">
        <StepRenderer step={step} />
      </div>

      <div className="viz-progress">
        <div
          className="viz-progress-fill"
          style={{ width: `${((idx + 1) / viz.steps.length) * 100}%` }}
        />
      </div>

      <div className="viz-controls">
        <button
          className="ctrl"
          onClick={() => {
            setPlaying(false);
            setIdx(0);
          }}
          disabled={idx === 0 && !playing}
        >
          ⏮ Reset
        </button>
        <button
          className="ctrl"
          onClick={() => {
            setPlaying(false);
            setIdx((p) => Math.max(0, p - 1));
          }}
          disabled={idx === 0}
        >
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
              if (idx >= viz.steps.length - 1) setIdx(0);
              setPlaying(true);
            }}
          >
            ▶ Play
          </button>
        )}
        <button
          className="ctrl"
          onClick={() => {
            setPlaying(false);
            setIdx((p) => Math.min(viz.steps.length - 1, p + 1));
          }}
          disabled={idx >= viz.steps.length - 1}
        >
          Next ▶
        </button>
        <button
          className="ctrl"
          onClick={() => {
            setPlaying(false);
            setIdx(viz.steps.length - 1);
          }}
          disabled={idx >= viz.steps.length - 1}
        >
          ⏭ End
        </button>
      </div>
    </section>
  );
}
