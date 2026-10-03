import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { topics, topicTheory } from "../data/topics";
import { topicLessons } from "../data/topicLessons";
import { questionData } from "../data/questionData";
import QuestionSidebar from "../components/QuestionSidebar";
import QuestionWorkspace from "../components/QuestionWorkspace";
import TheoryViz from "../components/TheoryViz";

function TopicPage() {
  const { topicId } = useParams();

  const topic = topics.find((item) => item.id === topicId);
  const questions = questionData[topicId] || [];
  const theory = topicTheory[topicId];
  const pack = topicLessons[topicId];
  const lesson = pack && pack.lesson;
  const lessonViz = pack && pack.viz;

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  if (!topic) {
    return (
      <main className="home-page">
        <h2>Topic not found</h2>
        <Link to="/" className="btn btn-primary">
          Back home
        </Link>
      </main>
    );
  }

  return (
    <div className="topic-page">
      <header className="topic-header">
        <div className="topic-header-text">
          <h2>{topic.name}</h2>
          <span className="topic-count">{topic.count} questions</span>
        </div>
        <Link to="/" className="topic-back">
          ← All topics
        </Link>
      </header>

      <div className={`topic-layout ${sidebarOpen ? "" : "sidebar-closed"}`}>
        {sidebarOpen && (
          <QuestionSidebar
            questions={questions}
            selectedQuestion={selectedQuestion}
            onSelect={setSelectedQuestion}
            onClose={selectedQuestion ? () => setSidebarOpen(false) : null}
          />
        )}

        <section className="topic-content">
          {selectedQuestion && (
            <button
              className="sidebar-toggle-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? "⟨ Hide Questions" : "☰ Show Questions"}
            </button>
          )}
          {selectedQuestion ? (
            <QuestionWorkspace question={selectedQuestion} />
          ) : (
            <div className="topic-theory">
              <h2>{topic.name}</h2>
              {lesson ? (
                <>
                  <p className="theory-intro">{lesson.intro}</p>
                  {lesson.sections.map((s, i) => (
                    <article key={i} className="theory-section">
                      <h4>{s.title}</h4>
                      <p>{s.body}</p>
                    </article>
                  ))}

                  {lesson.example && (
                    <article className="theory-section theory-example">
                      <h4>{lesson.example.title}</h4>
                      <p>{lesson.example.body}</p>
                    </article>
                  )}

                  {lesson.compare && lesson.compare.length > 0 && (
                    <div className="theory-compare">
                      <h4>Comparison</h4>
                      {lesson.compare.map((c, i) => (
                        <div key={i} className="compare-row">
                          <span className="compare-label">{c.label}</span>
                          <div className="compare-cols">
                            <p>{c.a}</p>
                            <p>{c.b}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {lessonViz && <TheoryViz viz={lessonViz} />}
                </>
              ) : theory ? (
                <>
                  <p className="theory-intro">{theory.intro}</p>
                  {theory.sections.map((s, i) => (
                    <article key={i} className="theory-section">
                      <h4>{s.title}</h4>
                      <p>{s.body}</p>
                    </article>
                  ))}
                </>
              ) : (
                <p>Learn the basic concepts and techniques used in {topic.name}.</p>
              )}

              <div className="theory-cta">
                <span>Open ☰ and pick a question to start visualizing.</span>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default TopicPage;
