import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("dsa_user"));
    } catch {
      return null;
    }
  })();

  const [darkMode, setDarkMode] = useState(
    () => document.documentElement.getAttribute("data-theme") === "dark"
  );

  function toggleTheme() {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("dsa_theme", next ? "dark" : "light");
    } catch {
      /* ignore storage errors */
    }
  }

  function logout() {
    localStorage.removeItem("dsa_token");
    localStorage.removeItem("dsa_user");
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-mark">◧</span> DSA Visualizer
      </Link>

      <div className="nav-links">
        <button
          className="btn btn-ghost theme-toggle"
          onClick={toggleTheme}
          aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
          title={darkMode ? "Switch to light theme" : "Switch to dark theme"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        {user && (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="btn btn-ghost" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
