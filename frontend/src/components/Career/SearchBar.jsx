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
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "0.75rem",
      background: "var(--clr-surface)",
      padding: "1rem 1.2rem",
      borderRadius: "var(--radius)",
      border: "1px solid var(--clr-border)",
      boxShadow: "var(--shadow)",
    }}>
      {/* Search input */}
      <input
        className="input"
        style={{ flex: "1 1 200px", minWidth: 0 }}
        type="text"
        placeholder="Search careers, skills, or keywords…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {/* Category filter */}
      <select
        className="input"
        style={{ flex: "0 1 200px", appearance: "auto" }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Clear button */}
      {(q || category) && (
        <button
          type="button"
          className="btn btn-outline"
          style={{ padding: "0.5rem 1rem", fontSize: "0.82rem" }}
          onClick={() => { setQ(""); setCategory(""); }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
