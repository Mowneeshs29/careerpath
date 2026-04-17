import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-white border-t border-slate-100 mt-auto py-8">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 px-6">
      <span className="text-sm font-medium text-slate-400">
        © {new Date().getFullYear()} CareerPath. All rights reserved.
      </span>
      <div className="flex gap-6">
        <Link to="/" className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors">Home</Link>
        <Link to="/careers" className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors">Careers</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
