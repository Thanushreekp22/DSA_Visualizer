import React from "react";
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
