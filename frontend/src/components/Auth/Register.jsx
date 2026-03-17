import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import InputField from "../Shared/InputField";
import Button from "../Shared/Button";

const Register = () => {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "user" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "At least 6 characters";
    if (form.password !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
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
      await register({ name: form.name, email: form.email, password: form.password, role: form.role });
      nav("/dashboard");
    } catch (err) {
      setApiError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter" style={{ maxWidth: 480, margin: "2.5rem auto", padding: "0 1.25rem" }}>
      <div className="card" style={{ padding: "2.2rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
          <h1 style={{ fontSize: "1.6rem", marginBottom: "0.3rem" }}>Create account</h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "0.9rem" }}>Start discovering your ideal career path</p>
        </div>

        {apiError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", padding: "0.6rem 0.8rem", marginBottom: "1rem", fontSize: "0.85rem", color: "var(--clr-danger)" }}>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <InputField label="Full Name" name="name" value={form.name} placeholder="" required error={errors.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <InputField label="Email" type="email" name="email" value={form.email} placeholder="you@example.com" required error={errors.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <InputField label="Password" type="password" name="password" value={form.password} placeholder="password" required error={errors.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />

          <InputField label="Confirm Password" type="password" name="confirmPassword" value={form.confirmPassword} placeholder="password" required error={errors.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />

          {/* Role selector — in production this would be admin-invite-only */}
          <InputField label="Role" type="select" name="role" value={form.role} options={[{ value: "user", label: "User" }, { value: "admin", label: "Admin" }]}
            onChange={(e) => setForm({ ...form, role: e.target.value })} />

          <Button type="submit" variant="primary" disabled={loading} style={{ marginTop: "0.4rem" }}>
            {loading ? "Creating…" : "Sign Up"}
          </Button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1.4rem", fontSize: "0.85rem", color: "var(--clr-text-muted)" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--clr-primary)", textDecoration: "none", fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
