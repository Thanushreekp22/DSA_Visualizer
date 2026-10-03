import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import TopicPage from "./src/pages/TopicPage";
import Home from "./src/pages/Home";
import CustomCursor from "./src/components/CustomCursor";
import { topicLessons } from "./src/data/topicLessons";

const ids = Object.keys(topicLessons);
let fail = 0;

function check(name, el) {
  try {
    const html = renderToString(el);
    if (!html || html.length < 50) {
      console.log("EMPTY  " + name);
      fail++;
    } else {
      console.log("ok     " + name + " (" + html.length + " chars)");
    }
  } catch (e) {
    console.log("CRASH  " + name + " -> " + e.message + "\n" + e.stack.split("\n").slice(0, 6).join("\n"));
    fail++;
  }
}

check("CustomCursor", <CustomCursor />);
check("Home", <MemoryRouter initialEntries={["/"]}><Home /></MemoryRouter>);

for (const id of ids) {
  check(
    "TopicPage " + id,
    <MemoryRouter initialEntries={["/topic/" + id]}>
      <Routes>
        <Route path="/topic/:topicId" element={<TopicPage />} />
      </Routes>
    </MemoryRouter>
  );
}

// Verify each topic page actually shows lesson content + viz
for (const id of ids) {
  try {
    const html = renderToString(
      <MemoryRouter initialEntries={["/topic/" + id]}>
        <Routes>
          <Route path="/topic/:topicId" element={<TopicPage />} />
        </Routes>
      </MemoryRouter>
    );
    const hasViz = html.includes("Interactive visualization");
    const hasSections = html.includes("theory-section");
    if (!hasSections) { console.log("NO LESSON SECTIONS " + id); fail++; }
    if (!hasViz) { console.log("NO VIZ " + id); fail++; }
  } catch (e) {
    console.log("CRASH2 " + id + " -> " + e.message);
    fail++;
  }
}

console.log(fail === 0 ? "SMOKE ALL OK" : "SMOKE FAILURES: " + fail);
process.exit(fail === 0 ? 0 : 1);
