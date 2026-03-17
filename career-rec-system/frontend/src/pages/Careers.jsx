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
    <div className="container page-enter">
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "1.7rem", margin: "0 0 0.3rem" }}>🗂️ All Careers</h1>
        <p style={{ color: "var(--clr-text-muted)", fontSize: "0.9rem", margin: 0 }}>Browse and search our career catalog</p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "1.5rem" }}>
        <SearchBar categories={categories} onChange={handleFilterChange} />
      </div>

      {/* Results count */}
      {!loading && (
        <p style={{ fontSize: "0.83rem", color: "var(--clr-text-muted)", marginBottom: "0.8rem" }}>
          {meta.total || 0} career{meta.total !== 1 ? "s" : ""} found
        </p>
      )}

      {/* Grid */}
      {loading ? (
        <Loader />
      ) : careers.length ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.1rem" }}>
          {careers.map((c) => <CareerCard key={c._id} career={c} />)}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--clr-text-muted)" }}>
          No careers match your search. Try different keywords or clear the filter.
        </div>
      )}

      {/* Pagination */}
      {meta.pages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {Array.from({ length: meta.pages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => goToPage(p)} style={{
              width: 36, height: 36, borderRadius: "var(--radius-sm)", border: "1.5px solid var(--clr-border)",
              background: p === page ? "var(--clr-primary)" : "var(--clr-surface)",
              color: p === page ? "#fff" : "var(--clr-text)",
              fontWeight: 600, cursor: "pointer", fontSize: "0.85rem",
            }}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Careers;
