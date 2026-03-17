import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{
    background: "var(--clr-surface)",
    borderTop: "1px solid var(--clr-border)",
    marginTop: "auto",
  }}>
    <div className="container" style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      padding: "1.4rem 1.25rem",
    }}>
      <span style={{ fontSize: "0.82rem", color: "var(--clr-text-muted)" }}>
        © {new Date().getFullYear()} CareerPath. All rights reserved.
      </span>
      <div style={{ display: "flex", gap: "1.4rem" }}>
        <Link to="/" style={{ fontSize: "0.82rem", color: "var(--clr-text-muted)", textDecoration: "none" }}>Home</Link>
        <Link to="/careers" style={{ fontSize: "0.82rem", color: "var(--clr-text-muted)", textDecoration: "none" }}>Careers</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
