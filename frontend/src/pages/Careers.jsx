import React, { useState, useEffect, useCallback } from "react";
import { careerAPI } from "../services/api";
import SearchBar from "../components/Career/SearchBar";
import CareerCard from "../components/Career/CareerCard";
import Loader from "../components/Shared/Loader";

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({});
  const [filters, setFilters] = useState({ q: "", category: "" });

  const fetchCareers = useCallback(async (p = 1, f = filters) => {
    setLoading(true);
    try {
      const { data } = await careerAPI.list({ ...f, page: p, limit: 12 });
      setCareers(data.careers);
      setMeta(data.meta);
    } catch {
      setCareers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* initial load: categories + first page */
  useEffect(() => {
    careerAPI.categories().then(({ data }) => setCategories(data.categories)).catch(() => {});
    fetchCareers(1, { q: "", category: "" });
  }, []);

  /* when filters change, reset page */
  const handleFilterChange = (f) => {
    setFilters(f);
    setPage(1);
    fetchCareers(1, f);
  };

  /* pagination */
  const goToPage = (p) => {
    setPage(p);
    fetchCareers(p, filters);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 page-enter">
      {/* Header */}
      <div className="mb-10 relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-violet-100 blur-2xl opacity-40 rounded-3xl -z-10"></div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight mb-3 flex items-center gap-3">
          <span className="text-5xl tracking-normal">🔭</span> Discover Careers
        </h1>
        <p className="text-lg font-medium text-slate-500 max-w-xl">
          Browse our extensive catalog of roles, uncover the skills you need, and find your next big opportunity.
        </p>
      </div>

      {/* Search */}
      <SearchBar categories={categories} onChange={handleFilterChange} />

      {/* Results count */}
      {!loading && (
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px bg-slate-200 flex-1"></div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
            {meta.total || 0} career{meta.total !== 1 ? "s" : ""} found
          </p>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>
      )}

      {/* Grid */}
      {loading ? (
        <div className="py-20 flex justify-center"><Loader /></div>
      ) : careers.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {careers.map((c) => <CareerCard key={c._id} career={c} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
          <div className="text-4xl mb-4">🌪️</div>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No careers match your search</h3>
          <p className="text-slate-500">Try adjusting your keywords or clearing the category filter.</p>
        </div>
      )}

      {/* Pagination */}
      {meta.pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
          {Array.from({ length: meta.pages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => goToPage(p)} className={`
              w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center
              ${p === page 
                ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 -translate-y-0.5" 
                : "bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:-translate-y-0.5 shadow-sm"}
            `}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Careers;
