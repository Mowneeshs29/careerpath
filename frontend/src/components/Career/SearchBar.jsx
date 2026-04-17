import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "../../utils/helpers";

const SearchBar = ({ categories = [], onChange }) => {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");

  const emit = useCallback(
    debounce((val, cat) => onChange({ q: val, category: cat }), 320),
    [onChange]
  );

  useEffect(() => {
    emit(q, category);
  }, [q, category]);

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 bg-white p-3 md:p-4 rounded-2xl shadow-md border border-slate-100 shadow-blue-500/5 transition-shadow hover:shadow-lg hover:shadow-blue-500/10 mb-8">
      {/* Search input */}
      <div className="flex-1 relative min-w-[200px]">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input
          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium placeholder:font-normal placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
          type="text"
          placeholder="Search careers, skills, or keywords…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>

      {/* Category filter */}
      <div className="relative min-w-[200px]">
        <select
          className="w-full pl-4 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500 transition-all cursor-pointer"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      {/* Clear button */}
      {(q || category) && (
        <button
          type="button"
          className="px-6 py-3.5 bg-white text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200 hover:bg-red-50 font-bold rounded-xl transition-all"
          onClick={() => { setQ(""); setCategory(""); }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
