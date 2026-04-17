import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import InputField from "../Shared/InputField";

const Login = () => {
  const { login, loginWithGoogle } = useAuth();
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

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setApiError("");
      await loginWithGoogle();
      nav("/dashboard");
    } catch (err) {
      setApiError(err?.message || "Google authentication failed. Have you configured your Firebase credentials in src/config/firebase.js?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-enter max-w-[440px] mx-auto my-10 px-5">
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 md:p-10 relative overflow-hidden">
        {/* Aesthetic background glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-violet-500"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-60"></div>
        
        {/* Header */}
        <div className="text-center mb-8 relative z-10">
          <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Welcome back</h1>
          <p className="text-base font-medium text-slate-500">Sign in to continue your journey</p>
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3.5 mb-6 text-sm font-bold flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 relative z-10">
          <InputField label="Email Address" type="email" name="email" value={form.email} placeholder="you@example.com" required error={errors.email}
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

          <button type="submit" disabled={loading} className="mt-4 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <div className="mt-8 mb-6 flex items-center gap-4 relative z-10">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Or continue with</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        <button 
          onClick={handleGoogleAuth}
          className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-all relative z-10"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>

        <p className="text-center mt-8 text-sm font-medium text-slate-500 relative z-10">
          Don't have an account? <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;