import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={{ background: "var(--clr-surface)", borderBottom: "1px solid var(--clr-border)", position: "sticky", top: 0, zIndex: 100 }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.9rem 1.25rem" }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", color: "var(--clr-text)" }}>
          <div style={{ width: 36, height: 36, borderRadius: "8px", background: "linear-gradient(135deg, var(--clr-primary), var(--clr-accent))", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: "1.2rem" }}>
            C
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem" }}>CareerPath</span>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <Link to="/" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--clr-text)", textDecoration: "none", transition: "color var(--transition)" }}
            onMouseEnter={(e) => { e.target.style.color = "var(--clr-primary)"; }}
            onMouseLeave={(e) => { e.target.style.color = "var(--clr-text)"; }}
          >
            Home
          </Link>

          <Link to="/careers" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--clr-text)", textDecoration: "none", transition: "color var(--transition)" }}
            onMouseEnter={(e) => { e.target.style.color = "var(--clr-primary)"; }}
            onMouseLeave={(e) => { e.target.style.color = "var(--clr-text)"; }}
          >
            Careers
          </Link>

          <Link to="/forum" style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.9rem", fontWeight: 500, color: "var(--clr-text)", textDecoration: "none", transition: "color var(--transition)" }}
            onMouseEnter={(e) => { e.target.style.color = "var(--clr-primary)"; }}
            onMouseLeave={(e) => { e.target.style.color = "var(--clr-text)"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Forum
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--clr-text)", textDecoration: "none", transition: "color var(--transition)" }}
                onMouseEnter={(e) => { e.target.style.color = "var(--clr-primary)"; }}
                onMouseLeave={(e) => { e.target.style.color = "var(--clr-text)"; }}
              >
                Dashboard
              </Link>

              {user.role === "admin" && (
                <Link to="/admin" style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--clr-accent)", textDecoration: "none" }}>
                  Admin
                </Link>
              )}

              <button onClick={handleLogout} className="btn btn-outline" style={{ padding: "0.5rem 1.1rem", fontSize: "0.85rem" }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ padding: "0.5rem 1.1rem", fontSize: "0.85rem" }}>
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: "0.5rem 1.1rem", fontSize: "0.85rem" }}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;