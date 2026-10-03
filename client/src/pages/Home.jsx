import React from "react";
import { topics } from "../data/topics";
import TopicCard from "../components/TopicCard";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <p className="hero-kicker">LeetCode 70 · DSA Visualizer</p>
        <h1>Learn algorithms through visual explanations.</h1>
        <p className="hero-sub">
          Pick a topic, open a question, and follow the algorithm step by step —
          with linked Java code, a live visualization, and written dry runs for
          both examples.
        </p>
        <div className="hero-stats">
          <span>
            <strong>15</strong> topics
          </span>
          <span>
            <strong>70</strong> questions
          </span>
          <span>
            <strong>2</strong> examples each
          </span>
        </div>
      </section>

      <div className="topic-grid">
        {topics.map((topic, i) => (
          <TopicCard key={topic.id} topic={topic} index={i} />
        ))}
      </div>
    </main>
  );
}

export default Home;
