import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const NewThread = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    axios.get("/api/forum/categories").then(({ data }) => {
      setCategories(data.categories);
      setForm((prev) => ({ ...prev, category: data.categories[0] }));
    });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { data } = await axios.post("/api/forum", form);
      navigate(`/forum/${data.thread._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create thread");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container page-enter" style={{ maxWidth: 720 }}>
      <Link to="/forum" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", color: "var(--clr-primary)", textDecoration: "none", marginBottom: "1rem" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Cancel
      </Link>

      <div className="card" style={{ padding: "2rem" }}>
        <h1 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Start a New Discussion</h1>

        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", padding: "0.7rem 1rem", marginBottom: "1rem", color: "var(--clr-danger)" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.4rem" }}>Category</label>
            <select
              className="input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.4rem" }}>Title</label>
            <input
              className="input"
              placeholder="What's your question or topic?"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              minLength={3}
              maxLength={200}
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: "0.4rem" }}>Description</label>
            <textarea
              className="input"
              rows={8}
              placeholder="Provide more details about your question or topic..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              minLength={10}
              maxLength={5000}
            />
            <div style={{ fontSize: "0.8rem", color: "var(--clr-text-muted)", marginTop: "0.3rem" }}>
              {form.content.length}/5000 characters
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Creating..." : "Create Thread"}
            </button>
            <Link to="/forum" className="btn btn-outline">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewThread;
