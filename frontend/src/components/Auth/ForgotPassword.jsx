import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../Shared/InputField";
import Button from "../Shared/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setLoading(true);
    
    // Simulate API call (backend endpoint not implemented yet)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="page-enter" style={{ maxWidth: 480, margin: "3rem auto", padding: "0 1.25rem", textAlign: "center" }}>
        <div className="card" style={{ padding: "3rem 2rem" }}>
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📧</div>
          <h1 style={{ fontSize: "1.6rem", marginBottom: "0.6rem" }}>Check Your Email</h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.8rem" }}>
            We've sent a password reset link to <strong>{email}</strong>. Click the link in the email to reset your password.
          </p>
          <Link to="/login" className="btn btn-primary">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ maxWidth: 440, margin: "2.5rem auto", padding: "0 1.25rem" }}>
      <div className="card" style={{ padding: "2.2rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <h1 style={{ fontSize: "1.6rem", marginBottom: "0.3rem" }}>Forgot Password?</h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "0.9rem" }}>
            No worries, we'll send you reset instructions
          </p>
        </div>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", padding: "0.6rem 0.8rem", marginBottom: "1rem", fontSize: "0.85rem", color: "var(--clr-danger)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <InputField 
            label="Email" 
            type="email" 
            name="email" 
            value={email} 
            placeholder="you@example.com" 
            required 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <Button type="submit" variant="primary" disabled={loading} style={{ marginTop: "0.4rem" }}>
            {loading ? "Sending…" : "Send Reset Link"}
          </Button>

          <Link to="/login" style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--clr-text-muted)", textDecoration: "none", marginTop: "0.4rem" }}>
            ← Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;