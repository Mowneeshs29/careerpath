import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const Forum = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ q: "", category: "" });

  const fetchThreads = useCallback(async (f = filter) => {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/forum", { params: f });
      setThreads(data.threads);
    } catch {
      setThreads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    axios.get("/api/forum/categories").then(({ data }) => setCategories(data.categories));
    fetchThreads({ q: "", category: "" });
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value;
    setFilter({ ...filter, q: val });
    fetchThreads({ ...filter, q: val });
  };

  const handleCategoryChange = (cat) => {
    setFilter({ ...filter, category: cat });
    fetchThreads({ ...filter, category: cat });
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="container page-enter">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "1.7rem", margin: "0 0 0.3rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Community Forum
          </h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Ask questions, share knowledge, connect with others
          </p>
        </div>
        {user && (
          <Link to="/forum/new" className="btn btn-primary" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New Thread
          </Link>
        )}
      </div>

      {/* Search & Filter */}
      <div style={{ background: "var(--clr-surface)", padding: "1rem 1.2rem", borderRadius: "var(--radius)", border: "1px solid var(--clr-border)", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <input
            className="input"
            style={{ flex: "1 1 220px" }}
            placeholder="Search discussions..."
            value={filter.q}
            onChange={handleSearch}
          />
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              className={`btn ${!filter.category ? "btn-primary" : "btn-outline"}`}
              style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
              onClick={() => handleCategoryChange("")}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn ${filter.category === cat ? "btn-primary" : "btn-outline"}`}
                style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Threads */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem" }}>
          <div className="spinner" />
        </div>
      ) : threads.length ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {threads.map((t) => (
            <Link
              key={t._id}
              to={`/forum/${t._id}`}
              className="card"
              style={{ padding: "1.2rem 1.4rem", textDecoration: "none", color: "inherit", transition: "transform var(--transition)" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateX(0)"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.75rem", background: "rgba(108,99,255,0.1)", color: "var(--clr-primary)", fontWeight: 700, padding: "0.15rem 0.6rem", borderRadius: "99px" }}>
                      {t.category}
                    </span>
                    <span style={{ fontSize: "0.82rem", color: "var(--clr-text-muted)" }}>
                      by {t.author?.name} · {timeAgo(t.createdAt)}
                    </span>
                  </div>
                  <h3 style={{ fontSize: "1.05rem", margin: "0 0 0.3rem", fontWeight: 600 }}>{t.title}</h3>
                  <p style={{ fontSize: "0.88rem", color: "var(--clr-text-muted)", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {t.content}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "1.2rem", fontSize: "0.82rem", color: "var(--clr-text-muted)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    {t.views}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    {t.replies?.length || 0}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "1rem" }}>
            {filter.q || filter.category ? "No threads found. Try different filters." : "No threads yet. Be the first to start a discussion!"}
          </p>
          {user && (
            <Link to="/forum/new" className="btn btn-primary" style={{ marginTop: "1rem" }}>Start a Discussion</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Forum;