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
    <div className="page-enter max-w-[440px] mx-auto my-10 px-5">
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-slate-800 mb-1 tracking-tight">Welcome back</h1>
          <p className="text-sm font-medium text-slate-500">Sign in to continue your journey</p>
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-5 text-sm font-medium">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField label="Email" type="email" name="email" value={form.email} placeholder="you@example.com" required error={errors.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <div>
            <InputField label="Password" type="password" name="password" value={form.password} placeholder="••••••••" required error={errors.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
            
            {/* FORGOT PASSWORD LINK */}
            <div className="text-right mt-1.5">
              <Link to="/forgot-password" className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                Forgot password?
              </Link>
            </div>
          </div>

          <button type="submit" disabled={loading} className="mt-2 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm shadow-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-medium text-slate-500">
          Don't have an account? <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;