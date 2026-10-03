import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      localStorage.setItem("dsa_token", data.token);
      localStorage.setItem("dsa_user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h2>Create account</h2>
        <p className="auth-sub">Track your progress across all 70 questions.</p>

        {error && <div className="auth-error">{error}</div>}

        <label>
          Name
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            required
            minLength={6}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
          />
        </label>

        <button className="btn btn-primary btn-block" disabled={busy}>
          {busy ? "Creating…" : "Register"}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
