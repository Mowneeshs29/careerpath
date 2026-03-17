import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import InputField from "../Shared/InputField";
import Button from "../Shared/Button";

const Login = () => {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    setLoading(true);
    setApiError("");
    try {
      await login(form);
      nav("/dashboard");
    } catch (err) {
      setApiError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 440, margin: "2.5rem auto", padding: "0 1.25rem" }}>
      <div className="card" style={{ padding: "2.2rem 2rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <h1 style={{ fontSize: "1.6rem", marginBottom: "0.3rem" }}>Welcome back</h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "0.9rem" }}>Sign in to continue your journey</p>
        </div>

        {apiError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", padding: "0.6rem 0.8rem", marginBottom: "1rem", fontSize: "0.85rem", color: "var(--clr-danger)" }}>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <InputField label="Email" type="email" name="email" value={form.email} placeholder="you@example.com" required error={errors.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <div>
            <InputField label="Password" type="password" name="password" value={form.password} placeholder="password" required error={errors.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
            
            {/* FORGOT PASSWORD LINK */}
            <div style={{ textAlign: "right", marginTop: "0.4rem" }}>
              <Link to="/forgot-password" style={{ fontSize: "0.85rem", color: "var(--clr-primary)", textDecoration: "none", fontWeight: 500 }}>
                Forgot password?
              </Link>
            </div>
          </div>

          <Button type="submit" variant="primary" disabled={loading} style={{ marginTop: "0.4rem" }}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.4rem", fontSize: "0.85rem", color: "var(--clr-text-muted)" }}>
          Don't have an account? <Link to="/register" style={{ color: "var(--clr-primary)", textDecoration: "none", fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;