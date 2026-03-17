import React from "react";
import { Link } from "react-router-dom";
import { categoryIcon, formatCurrency, scoreColor } from "../../utils/helpers";

const CareerCard = ({ career }) => {
  const { _id, title, category, description, requiredSkills, salaryRange, matchScore } = career;

  return (
    <Link to={`/careers/${_id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card" style={{ padding: "1.4rem", display: "flex", flexDirection: "column", gap: "0.7rem", height: "100%", transition: "transform var(--transition), box-shadow var(--transition)" }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <span style={{ fontSize: "1.4rem" }}>{categoryIcon(category)}</span>
          {matchScore !== undefined && (
            <span style={{
              background: "rgba(108,99,255,0.08)",
              color: scoreColor(matchScore),
              fontSize: "0.78rem",
              fontWeight: 700,
              padding: "0.22rem 0.6rem",
              borderRadius: "99px",
            }}>
              {matchScore}% match
            </span>
          )}
        </div>

        {/* Title + category */}
        <div>
          <h3 style={{ fontSize: "1.05rem", margin: 0, color: "var(--clr-text)" }}>{title}</h3>
          <span style={{ fontSize: "0.78rem", color: "var(--clr-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{category}</span>
        </div>

        {/* Description snippet */}
        <p style={{ fontSize: "0.85rem", color: "var(--clr-text-muted)", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {description}
        </p>

        {/* Skills */}
        {requiredSkills?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {requiredSkills.slice(0, 4).map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
            {requiredSkills.length > 4 && (
              <span className="tag" style={{ background: "var(--clr-bg)", color: "var(--clr-text-muted)" }}>+{requiredSkills.length - 4}</span>
            )}
          </div>
        )}

        {/* Salary */}
        {salaryRange?.min && (
          <div style={{ marginTop: "auto", fontSize: "0.84rem", color: "var(--clr-text-muted)" }}>
            💰 {formatCurrency(salaryRange.min)} – {formatCurrency(salaryRange.max)}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CareerCard;
