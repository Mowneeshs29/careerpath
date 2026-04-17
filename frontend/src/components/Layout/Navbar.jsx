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
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm font-sans backdrop-blur-md bg-white/90">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline text-slate-900 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center font-bold text-white text-lg shadow-md group-hover:shadow-blue-500/30 transition-all">
            C
          </div>
          <span className="font-extrabold text-xl tracking-tight">CareerPath</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
            Home
          </Link>

          <Link to="/careers" className="text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
            Careers
          </Link>

          <Link to="/forum" className="flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Forum
          </Link>

          <div className="h-6 w-px bg-slate-200 mx-2"></div>

          {user ? (
            <>
              <Link to="/dashboard" className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors">
                Dashboard
              </Link>

              {user.role === "admin" && (
                <Link to="/admin" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">
                  Admin
                </Link>
              )}

              <button onClick={handleLogout} className="px-5 py-2.5 text-sm font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                Log In
              </Link>
              <Link to="/register" className="px-5 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-200 transition-all hover:-translate-y-0.5">
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