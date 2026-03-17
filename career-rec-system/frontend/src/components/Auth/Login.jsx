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
    <div className="page-enter" style={{ 
      minHeight: "calc(100vh - 140px)", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
      padding: "2rem 1.25rem"
    }}>
      <div style={{ 
        maxWidth: 460, 
        width: "100%",
      }}>
        {/* Header with icon */}
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
            <span style={{ fontSize: "2rem" }}>🚀</span>
          </div>
          <h1 style={{ 
            fontSize: "1.75rem", 
            marginBottom: "0.4rem",
            background: "linear-gradient(135deg, var(--clr-primary), var(--clr-accent))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700
          }}>Welcome Back</h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "0.95rem" }}>
            Sign in to continue your career journey
          </p>
        </div>

        <div className="card" style={{ padding: "2.5rem 2rem", boxShadow: "var(--shadow-lg)" }}>
          {apiError && (
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
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <InputField 
              label="Email Address" 
              type="email" 
              name="email" 
              value={form.email} 
              placeholder="you@example.com" 
              required 
              error={errors.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} 
            />

            <div>
              <InputField 
                label="Password" 
                type="password" 
                name="password" 
                value={form.password} 
                placeholder="Enter your password" 
                required 
                error={errors.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })} 
              />
              <div style={{ textAlign: "right", marginTop: "0.5rem" }}>
                <Link 
                  to="/forgot-password" 
                  style={{ 
                    fontSize: "0.85rem", 
                    color: "var(--clr-primary)", 
                    textDecoration: "none",
                    fontWeight: 500,
                    transition: "color var(--transition)"
                  }}
                  onMouseEnter={(e) => e.target.style.color = "var(--clr-accent)"}
                  onMouseLeave={(e) => e.target.style.color = "var(--clr-primary)"}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              disabled={loading} 
              style={{ marginTop: "0.5rem", width: "100%", padding: "0.85rem" }}
            >
              {loading ? (
                <>
                  <div className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </div>

        <p style={{ 
          textAlign: "center", 
          marginTop: "1.8rem", 
          fontSize: "0.9rem", 
          color: "var(--clr-text-muted)" 
        }}>
          Don't have an account?{" "}
          <Link 
            to="/register" 
            style={{ 
              color: "var(--clr-primary)", 
              textDecoration: "none", 
              fontWeight: 600,
              transition: "color var(--transition)"
            }}
            onMouseEnter={(e) => e.target.style.color = "var(--clr-accent)"}
            onMouseLeave={(e) => e.target.style.color = "var(--clr-primary)"}
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
