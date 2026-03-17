import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { careerAPI } from "../../services/api";
import { categoryIcon, formatCurrency, scoreColor } from "../../utils/helpers";
import Loader from "../Shared/Loader";

const CareerDetail = () => {
  const { id } = useParams();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await careerAPI.getById(id);
        setCareer(data.career);
      } catch {
        setError("Career not found");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return <Loader />;
  if (error || !career) return (
    <div className="container page-enter" style={{ textAlign: "center", padding: "4rem 1rem" }}>
      <p style={{ color: "var(--clr-danger)", fontSize: "1.1rem" }}>{error || "Not found"}</p>
      <Link to="/careers" className="btn btn-primary" style={{ marginTop: "1rem" }}>← Back to Careers</Link>
    </div>
  );

  return (
    <div className="container page-enter" style={{ maxWidth: 780 }}>
      {/* Back */}
      <Link to="/careers" style={{ fontSize: "0.85rem", color: "var(--clr-primary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.3rem", marginBottom: "1rem" }}>
        ← Back to Careers
      </Link>

      <div className="card" style={{ padding: "2rem" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "0.5rem" }}>
          <span style={{ fontSize: "2rem" }}>{categoryIcon(career.category)}</span>
          <div>
            <h1 style={{ fontSize: "1.7rem", margin: 0 }}>{career.title}</h1>
            <span style={{ fontSize: "0.82rem", color: "var(--clr-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{career.category}</span>
          </div>
          {career.matchScore !== undefined && (
            <span style={{ marginLeft: "auto", background: "rgba(108,99,255,0.08)", color: scoreColor(career.matchScore), fontSize: "0.85rem", fontWeight: 700, padding: "0.3rem 0.75rem", borderRadius: "99px" }}>
              {career.matchScore}% match
            </span>
          )}
        </div>

        <hr style={{ border: "none", borderTop: "1px solid var(--clr-border)", margin: "1.2rem 0" }} />

        {/* Description */}
        <p style={{ color: "var(--clr-text-muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>{career.description}</p>

        {/* Meta grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem", marginTop: "1.2rem" }}>
          <div style={{ background: "var(--clr-bg)", borderRadius: "var(--radius-sm)", padding: "0.9rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--clr-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Education</div>
            <div style={{ fontWeight: 600, marginTop: "0.2rem" }}>{career.educationLevel}</div>
          </div>
          <div style={{ background: "var(--clr-bg)", borderRadius: "var(--radius-sm)", padding: "0.9rem" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--clr-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Salary Range</div>
            <div style={{ fontWeight: 600, marginTop: "0.2rem" }}>{formatCurrency(career.salaryRange?.min)} – {formatCurrency(career.salaryRange?.max)}</div>
          </div>
        </div>

        {/* Required Skills */}
        <div style={{ marginTop: "1.6rem" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.6rem" }}>🛠 Required Skills</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {career.requiredSkills?.map((s) => <span key={s} className="tag">{s}</span>)}
          </div>
        </div>

        {/* Related Interests */}
        {career.relatedInterests?.length > 0 && (
          <div style={{ marginTop: "1.2rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.6rem" }}>🎯 Related Interests</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {career.relatedInterests.map((i) => (
                <span key={i} style={{ display: "inline-block", background: "#f0fdf4", color: "var(--clr-success)", fontSize: "0.78rem", fontWeight: 600, padding: "0.22rem 0.7rem", borderRadius: "99px" }}>{i}</span>
              ))}
            </div>
          </div>
        )}

        {/* Learning Paths */}
        {career.learningPaths?.length > 0 && (
          <div style={{ marginTop: "1.6rem" }}>
            <h3 style={{ fontSize: "1rem", marginBottom: "0.8rem" }}>📚 Suggested Learning Paths</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {career.learningPaths.map((lp, i) => (
                <div key={i} style={{ background: "var(--clr-bg)", borderRadius: "var(--radius-sm)", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.8rem", flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>{lp.title}</div>
                    {lp.description && <div style={{ fontSize: "0.82rem", color: "var(--clr-text-muted)", marginTop: "0.15rem" }}>{lp.description}</div>}
                    {lp.duration && <div style={{ fontSize: "0.78rem", color: "var(--clr-text-light)", marginTop: "0.2rem" }}>⏱ {lp.duration}</div>}
                  </div>
                  {lp.url && (
                    <a href={lp.url} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: "0.35rem 0.8rem", fontSize: "0.78rem" }}>
                      Visit →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerDetail;
