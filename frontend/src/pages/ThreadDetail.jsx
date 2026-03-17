import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const ThreadDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`/api/forum/${id}`);
        setThread(data.thread);
      } catch {
        navigate("/forum");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, navigate]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await axios.post(`/api/forum/${id}/reply`, { content: replyContent });
      setThread(data.thread);
      setReplyContent("");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to post reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this thread?")) return;
    try {
      await axios.delete(`/api/forum/${id}`);
      navigate("/forum");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete");
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (!window.confirm("Delete this reply?")) return;
    try {
      await axios.delete(`/api/forum/${id}/reply/${replyId}`);
      setThread((prev) => ({ ...prev, replies: prev.replies.filter((r) => r._id !== replyId) }));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete");
    }
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

  if (loading) return <div style={{ textAlign: "center", padding: "3rem" }}><div className="spinner" /></div>;
  if (!thread) return null;

  const canDelete = user && (thread.author._id === user._id || user.role === "admin");

  return (
    <div className="container page-enter" style={{ maxWidth: 900 }}>
      <Link to="/forum" style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", color: "var(--clr-primary)", textDecoration: "none", marginBottom: "1rem" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Forum
      </Link>

      {/* Thread */}
      <div className="card" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.75rem", background: "rgba(108,99,255,0.1)", color: "var(--clr-primary)", fontWeight: 700, padding: "0.2rem 0.7rem", borderRadius: "99px" }}>
              {thread.category}
            </span>
          </div>
          {canDelete && (
            <button className="btn" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem", background: "#fef2f2", color: "var(--clr-danger)", border: "1.5px solid #fecaca" }} onClick={handleDelete}>
              Delete Thread
            </button>
          )}
        </div>

        <h1 style={{ fontSize: "1.6rem", margin: "0 0 0.8rem" }}>{thread.title}</h1>

        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", fontSize: "0.85rem", color: "var(--clr-text-muted)", marginBottom: "1.2rem" }}>
          <span style={{ fontWeight: 600, color: "var(--clr-text)" }}>{thread.author.name}</span>
          <span>·</span>
          <span>{timeAgo(thread.createdAt)}</span>
          <span>·</span>
          <span>{thread.views} views</span>
        </div>

        <p style={{ color: "var(--clr-text)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{thread.content}</p>
      </div>

      {/* Replies */}
      <div style={{ marginTop: "1.5rem" }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>
          {thread.replies?.length || 0} {thread.replies?.length === 1 ? "Reply" : "Replies"}
        </h3>

        {thread.replies?.map((reply) => {
          const canDeleteReply = user && (reply.author._id === user._id || user.role === "admin");
          return (
            <div key={reply._id} className="card" style={{ padding: "1.3rem", marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{reply.author.name}</span>
                  {reply.author.role === "admin" && (
                    <span style={{ fontSize: "0.7rem", background: "rgba(0,201,167,0.1)", color: "var(--clr-accent)", fontWeight: 700, padding: "0.1rem 0.5rem", borderRadius: "99px" }}>
                      Admin
                    </span>
                  )}
                  <span style={{ fontSize: "0.8rem", color: "var(--clr-text-muted)" }}>· {timeAgo(reply.createdAt)}</span>
                </div>
                {canDeleteReply && (
                  <button
                    style={{ background: "none", border: "none", color: "var(--clr-danger)", cursor: "pointer", fontSize: "0.8rem" }}
                    onClick={() => handleDeleteReply(reply._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
              <p style={{ margin: 0, color: "var(--clr-text)", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{reply.content}</p>
            </div>
          );
        })}
      </div>

      {/* Reply Form */}
      {user ? (
        <div className="card" style={{ padding: "1.5rem", marginTop: "1.5rem" }}>
          <h4 style={{ fontSize: "1rem", marginBottom: "0.8rem" }}>Add a Reply</h4>
          <form onSubmit={handleReply}>
            <textarea
              className="input"
              rows={4}
              placeholder="Share your thoughts..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              required
              style={{ marginBottom: "0.8rem" }}
            />
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Posting..." : "Post Reply"}
            </button>
          </form>
        </div>
      ) : (
        <div className="card" style={{ padding: "1.5rem", marginTop: "1.5rem", textAlign: "center" }}>
          <p style={{ color: "var(--clr-text-muted)", marginBottom: "0.8rem" }}>Sign in to join the discussion</p>
          <Link to="/login" className="btn btn-primary">Sign In</Link>
        </div>
      )}
    </div>
  );
};

export default ThreadDetail;