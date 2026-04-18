import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { forumAPI } from "../services/api";

const Forum = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ q: "", category: "" });

  const fetchThreads = useCallback(async (f = filter) => {
    setLoading(true);
    try {
      const { data } = await forumAPI.list(f);
      setThreads(data.threads);
    } catch {
      setThreads([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    forumAPI.categories().then(({ data }) => setCategories(data.categories));
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
    <div className="max-w-7xl mx-auto px-6 py-12 page-enter">
      {/* Header */}
      <div className="mb-10 relative flex flex-wrap justify-between items-end gap-6">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-violet-100 blur-2xl opacity-40 rounded-3xl -z-10"></div>
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-3 flex items-center gap-3">
            <span className="text-5xl tracking-normal">💬</span> Community Forum
          </h1>
          <p className="text-lg font-medium text-slate-500 max-w-xl">
            Ask questions, share knowledge, and connect with other professionals.
          </p>
        </div>
        
        {user && (
          <Link to="/forum/new" className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/40 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            New Thread
          </Link>
        )}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4 bg-white p-3 md:p-4 rounded-2xl shadow-md border border-slate-100 shadow-blue-500/5 transition-shadow hover:shadow-lg hover:shadow-blue-500/10 mb-8">
        <div className="flex-1 relative min-w-[200px]">
           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-medium placeholder:font-normal placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            placeholder="Search discussions..."
            value={filter.q}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2 flex-wrap items-center bg-slate-50 p-1.5 rounded-xl border border-slate-200">
          <button
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${!filter.category ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-800"}`}
            onClick={() => handleCategoryChange("")}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${filter.category === cat ? "bg-white text-blue-600 shadow-sm border border-slate-200" : "text-slate-500 hover:text-slate-800"}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Threads */}
      {loading ? (
        <div className="py-20 flex justify-center">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      ) : threads.length ? (
        <div className="flex flex-col gap-4">
          {threads.map((t) => (
            <Link
              key={t._id}
              to={`/forum/${t._id}`}
              className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all hover:-translate-y-1 block"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-600 rounded-full">
                      {t.category}
                    </span>
                    <span className="text-sm font-medium text-slate-400">
                      by <span className="text-slate-600 font-semibold">{t.author?.name}</span> • {timeAgo(t.createdAt)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2 leading-tight">{t.title}</h3>
                  <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed max-w-4xl">
                    {t.content}
                  </p>
                </div>
                
                <div className="flex items-center gap-6 mt-2 md:mt-0 pt-4 border-t border-slate-50 md:border-none md:pt-0">
                  <div className="flex items-center gap-2 text-slate-400 font-medium text-sm group-hover:text-slate-500 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    {t.views}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 font-medium text-sm group-hover:text-slate-500 transition-colors">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No discussions found</h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            {filter.q || filter.category ? "We couldn't find any threads matching your filters. Try adjusting your search." : "It's quiet here. Be the first to start a conversation!"}
          </p>
          {user && (
            <Link to="/forum/new" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all inline-flex items-center gap-2 hover:-translate-y-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12h14"/>
              </svg>
              Start a Discussion
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Forum;