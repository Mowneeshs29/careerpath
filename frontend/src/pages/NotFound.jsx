import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="page-enter" style={{ textAlign: "center", padding: "5rem 1.25rem" }}>
    <span style={{ fontSize: "6rem", display: "block", lineHeight: 1 }}>🧭</span>
    <h1 style={{ fontSize: "2.2rem", marginTop: "1rem", marginBottom: "0.4rem" }}>404</h1>
    <p style={{ color: "var(--clr-text-muted)", fontSize: "1rem", marginBottom: "1.8rem" }}>
      This page doesn't exist — but your ideal career path does.
    </p>
    <Link to="/" className="btn btn-primary" style={{ padding: "0.65rem 1.5rem" }}>Back to Home</Link>
  </div>
);

export default NotFound;
