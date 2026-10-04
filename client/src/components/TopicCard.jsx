import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { topicCheatSheets } from "../data/topicCheatSheets";

function TopicCard({ topic, index }) {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);
  const sheet = topicCheatSheets[topic.id];
  const accent = sheet && sheet.accent;

  function go() {
    setPressed(true);
    window.setTimeout(() => navigate(`/topic/${topic.id}`), 180);
  }

  function onKey(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      go();
    }
  }

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`Open ${topic.name} theory`}
      style={accent ? { "--topic-accent": accent } : undefined}
      className={`topic-card${pressed ? " topic-card-pressed" : ""}`}
      onClick={go}
      onKeyDown={onKey}
      onAnimationEnd={() => setPressed(false)}
    >
      <div className="topic-card-top">
        <span className="topic-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="topic-arrow">→</span>
      </div>
      <h3>{topic.name}</h3>
      <p>{topic.count} Questions</p>
      <span className="topic-card-hint">Click to open theory →</span>
      {/* Keep a real link for accessibility / right-click-open */}
      <Link
        to={`/topic/${topic.id}`}
        className="topic-card-link"
        tabIndex={-1}
        aria-hidden="true"
        onClick={(e) => e.stopPropagation()}
      >
        Open
      </Link>
    </div>
  );
}

export default TopicCard;
