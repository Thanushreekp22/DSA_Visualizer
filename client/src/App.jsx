import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import TopicPage from "./pages/TopicPage";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topic/:topicId" element={<TopicPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
