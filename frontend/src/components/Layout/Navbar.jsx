import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Careers", path: "/careers" },
    { name: "Forum", path: "/forum" },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.03)] font-sans transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-transparent to-violet-50/50 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 no-underline text-slate-900 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center font-black text-white text-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 group-hover:-translate-y-0.5 transition-all duration-300 ring-4 ring-white">
            C
          </div>
          <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">CareerPath</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
            return (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-sm font-bold transition-all relative py-1 flex flex-col justify-center ${isActive ? "text-blue-600" : "text-slate-500 hover:text-slate-900"}`}
              >
                {link.name}
                <span className={`absolute -bottom-1.5 left-0 w-full h-0.5 bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)] transform origin-left transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 hover:scale-x-50"}`}></span>
              </Link>
            );
          })}

          <div className="h-8 w-px bg-slate-200/80 mx-2 rounded-full"></div>

          {user ? (
            <div className="flex items-center gap-5">
              <Link to="/dashboard" className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-2 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-100 hover:border-blue-100">
                <span className="w-6 h-6 rounded-md bg-white shadow-sm flex items-center justify-center text-xs">📊</span>
                Dashboard
              </Link>

              {user.role === "admin" && (
                <Link to="/admin" className="text-sm font-bold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-colors border border-emerald-100">
                  Admin
                </Link>
              )}

              <button onClick={handleLogout} className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all shadow-sm cursor-pointer">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors px-2">
                Log In
              </Link>
              <Link to="/register" className="px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/40 ring-1 ring-white/20">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;