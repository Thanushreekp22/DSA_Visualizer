import React, { useCallback, useState } from "react";
import ProblemStatement from "./ProblemStatement";
import JavaCode from "./JavaCode";
import Visualization from "./Visualization";
import DryRun from "./DryRun";

function QuestionWorkspace({ question }) {
  const [activeLine, setActiveLine] = useState(null);

  const handleActiveLine = useCallback((line) => {
    setActiveLine(line);
  }, []);

  if (!question) {
    return (
      <div className="question-workspace">
        <p className="select-hint">Select a question from the ☰ sidebar to begin.</p>
      </div>
    );
  }

  return (
    <main className="question-workspace" key={question.id}>
      <ProblemStatement question={question} />

      <div className="code-viz-row">
        <JavaCode approaches={question.approaches} activeLine={activeLine} />

        <Visualization question={question} onActiveLine={handleActiveLine} />
      </div>

      <DryRun question={question} />
    </main>
  );
}

export default QuestionWorkspace;
