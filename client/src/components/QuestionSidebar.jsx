import React from "react";

function QuestionSidebar({ questions, selectedQuestion, onSelect, onClose }) {
  return (
    <aside className="question-sidebar">
      <div className="sidebar-head">
        <h3 className="sidebar-title">☰ Questions</h3>
        {onClose && (
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Hide questions panel"
            title="Hide questions"
          >
            ✕
          </button>
        )}
      </div>

      {questions.length === 0 && (
        <p className="sidebar-empty">No questions added yet.</p>
      )}

      <div className="sidebar-list">
        {questions.map((question, i) => (
          <button
            key={question.id}
            className={
              selectedQuestion?.id === question.id
                ? "question-item active"
                : "question-item"
            }
            onClick={() => onSelect(question)}
          >
            <span className="q-index">{i + 1}</span>
            <span className="q-body">
              <span className="q-title">{question.title}</span>
              <small className={`q-diff diff-${question.difficulty.toLowerCase()}`}>
                {question.difficulty}
              </small>
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}

export default QuestionSidebar;
