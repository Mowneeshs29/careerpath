import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    nav("/");
  };

  /* shared link style */
  const linkStyle = {
    textDecoration: "none",
    color: "var(--clr-text)",
    fontWeight: 500,
    fontSize: "0.92rem",
    transition: "color var(--transition)",
    padding: "0.3rem 0",
  };

  return (
    <nav style={{
      background: "var(--clr-surface)",
      borderBottom: "1px solid var(--clr-border)",
      position: "sticky",
      top: 0,
      zIndex: 100,
      boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    }}>
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ 
            background: "linear-gradient(135deg, var(--clr-primary), var(--clr-accent))", 
            color: "#fff", 
            borderRadius: "10px", 
            padding: "6px 12px", 
            fontFamily: "var(--font-display)", 
            fontWeight: 700, 
            fontSize: "1.2rem",
            boxShadow: "0 2px 8px rgba(23, 162, 184, 0.3)"
          }}>
            C
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: "var(--clr-text)" }}>
            CareerPath
          </span>
        </Link>

        {/* Desktop links */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.8rem" }} className="desktop-nav">
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/careers" style={linkStyle}>Careers</Link>
          {user && <Link to="/dashboard" style={linkStyle}>Dashboard</Link>}
          {user && user.role === "admin" && <Link to="/admin" style={{ ...linkStyle, color: "var(--clr-accent)", fontWeight: 600 }}>Admin</Link>}

          {!user ? (
            <>
              <Link to="/login" style={linkStyle}>Log In</Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: "0.5rem 1.1rem", fontSize: "0.85rem" }}>Sign Up</Link>
            </>
          ) : (
            <button className="btn btn-outline" style={{ padding: "0.45rem 1rem", fontSize: "0.82rem" }} onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>

        {/* Hamburger – mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: "1.5rem", color: "var(--clr-text)" }} className="hamburger-btn" aria-label="Toggle menu">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "var(--clr-surface)",
          borderTop: "1px solid var(--clr-border)",
          padding: "1rem 1.25rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }} className="mobile-nav">
          <Link to="/" style={linkStyle} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/careers" style={linkStyle} onClick={() => setMenuOpen(false)}>Careers</Link>
          {user && <Link to="/dashboard" style={linkStyle} onClick={() => setMenuOpen(false)}>Dashboard</Link>}
          {user && user.role === "admin" && <Link to="/admin" style={{ ...linkStyle, color: "var(--clr-accent)" }} onClick={() => setMenuOpen(false)}>Admin</Link>}
          {!user ? (
            <>
              <Link to="/login" style={linkStyle} onClick={() => setMenuOpen(false)}>Log In</Link>
              <Link to="/register" className="btn btn-primary" style={{ marginTop: "0.3rem" }} onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          ) : (
            <button className="btn btn-outline" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
          )}
        </div>
      )}

      {/* ─── Responsive overrides ─── */}
      <style>{`
        @media (max-width: 680px) {
          .desktop-nav  { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
        @media (min-width: 681px) {
          .mobile-nav { display: none !important; }
        }
        .desktop-nav a:hover, .desktop-nav button:hover { color: var(--clr-primary); }
      `}</style>
    </nav>
  );
};

export default Navbar;
