import React from "react";
import { ArrayPart, MapPart, SetPart, StackPart, QueuePart } from "./StepDiagrams1";
import { LinkedListPart, TreePart } from "./StepDiagrams2";
import { GraphPart, DPGridPart, BarsPart, VarsPart } from "./StepDiagrams3";

/* StepRenderer renders the parts of a single step.
   Used by BOTH the live Visualization and the static DryRun. */

function TextPart({ part }) {
  return <div className="diagram diagram-text">{part.value}</div>;
}

function ResultPart({ part }) {
  return (
    <div className="diagram diagram-result">
      <span className="result-tag">{part.label || "Result"}</span>
      <span className="result-value">{String(part.value)}</span>
    </div>
  );
}

function renderPart(part, key) {
  switch (part.t) {
    case "array":
      return <ArrayPart key={key} part={part} />;
    case "map":
      return <MapPart key={key} part={part} />;
    case "set":
      return <SetPart key={key} part={part} />;
    case "stack":
      return <StackPart key={key} part={part} />;
    case "queue":
      return <QueuePart key={key} part={part} />;
    case "ll":
      return <LinkedListPart key={key} part={part} />;
    case "tree":
      return <TreePart key={key} part={part} />;
    case "graph":
      return <GraphPart key={key} part={part} />;
    case "dp":
      return <DPGridPart key={key} part={part} />;
    case "bars":
      return <BarsPart key={key} part={part} />;
    case "vars":
      return <VarsPart key={key} part={part} />;
    case "text":
      return <TextPart key={key} part={part} />;
    case "result":
      return <ResultPart key={key} part={part} />;
    default:
      return null;
  }
}

export default function StepRenderer({ step }) {
  if (!step) return null;
  return (
    <div className="step-renderer">
      {step.title && <div className="step-title">{step.title}</div>}
      {step.action && <div className="step-action">{step.action}</div>}
      <div className="step-parts">
        {(step.parts || []).map((p, i) => renderPart(p, i))}
      </div>
    </div>
  );
}
