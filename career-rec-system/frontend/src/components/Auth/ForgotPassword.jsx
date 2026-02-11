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
    
    // Simulate API call (backend endpoint not yet implemented)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="page-enter" style={{ 
        minHeight: "calc(100vh - 140px)", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
        padding: "2rem 1.25rem"
      }}>
        <div style={{ maxWidth: 460, width: "100%", textAlign: "center" }}>
          <div style={{
            width: 80,
            height: 80,
            background: "linear-gradient(135deg, var(--clr-success), #34d399)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.5rem",
            boxShadow: "0 8px 16px rgba(16, 185, 129, 0.3)"
          }}>
            <span style={{ fontSize: "2.5rem" }}>✉️</span>
          </div>
          <h1 style={{ fontSize: "1.75rem", marginBottom: "0.8rem", fontWeight: 700 }}>Check Your Email</h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "0.95rem", marginBottom: "2rem", lineHeight: 1.6 }}>
            We've sent a password reset link to <strong>{email}</strong>. 
            Click the link in the email to create a new password.
          </p>
          <Link to="/login" className="btn btn-primary">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ 
      minHeight: "calc(100vh - 140px)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      padding: "2rem 1.25rem"
    }}>
      <div style={{ maxWidth: 460, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 72,
            height: 72,
            background: "linear-gradient(135deg, var(--clr-primary), var(--clr-accent))",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.2rem",
            boxShadow: "0 8px 16px rgba(23, 162, 184, 0.3)"
          }}>
            <span style={{ fontSize: "2rem" }}>🔑</span>
          </div>
          <h1 style={{ 
            fontSize: "1.75rem", 
            marginBottom: "0.4rem",
            background: "linear-gradient(135deg, var(--clr-primary), var(--clr-accent))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700
          }}>Forgot Password?</h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "0.95rem" }}>
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        <div className="card" style={{ padding: "2.5rem 2rem", boxShadow: "var(--shadow-lg)" }}>
          {error && (
            <div style={{ 
              background: "linear-gradient(135deg, #fef2f2, #fee2e2)", 
              border: "1px solid #fca5a5", 
              borderRadius: "var(--radius-sm)", 
              padding: "0.75rem 1rem", 
              marginBottom: "1.5rem", 
              fontSize: "0.88rem", 
              color: "var(--clr-danger)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <InputField 
              label="Email Address" 
              type="email" 
              name="email" 
              value={email} 
              placeholder="you@example.com" 
              required 
              onChange={(e) => setEmail(e.target.value)} 
            />

            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading} 
              style={{ width: "100%", padding: "0.85rem" }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </Button>

            <Link 
              to="/login" 
              style={{ 
                textAlign: "center", 
                fontSize: "0.9rem", 
                color: "var(--clr-text-muted)", 
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.3rem",
                transition: "color var(--transition)"
              }}
              onMouseEnter={(e) => e.target.style.color = "var(--clr-primary)"}
              onMouseLeave={(e) => e.target.style.color = "var(--clr-text-muted)"}
            >
              ← Back to Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
