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
    <div className="page-enter max-w-[480px] mx-auto my-10 px-5">
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-extrabold text-slate-800 mb-1 tracking-tight">Create account</h1>
          <p className="text-sm font-medium text-slate-500">Start discovering your ideal career path</p>
        </div>

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg px-4 py-3 mb-5 text-sm font-medium">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField label="Full Name" name="name" value={form.name} placeholder="John Doe" required error={errors.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })} />

          <InputField label="Email" type="email" name="email" value={form.email} placeholder="you@example.com" required error={errors.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })} />

          <InputField label="Password" type="password" name="password" value={form.password} placeholder="••••••••" required error={errors.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })} />

          <InputField label="Confirm Password" type="password" name="confirmPassword" value={form.confirmPassword} placeholder="••••••••" required error={errors.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />

          {/* Role selector — in production this would be admin-invite-only */}
          <InputField label="Role" type="select" name="role" value={form.role} options={[{ value: "user", label: "User" }, { value: "admin", label: "Admin" }]}
            onChange={(e) => setForm({ ...form, role: e.target.value })} />

          <button type="submit" disabled={loading} className="mt-2 w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm shadow-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? "Creating…" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm font-medium text-slate-500">
          Already have an account? <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
