import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { careerAPI } from "../services/api";
import ProfileForm from "../components/Profile/ProfileForm";
import CareerCard from "../components/Career/CareerCard";
import Loader from "../components/Shared/Loader";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [tab, setTab] = useState("profile"); // "profile" | "recs"
  const [recs, setRecs] = useState([]);
  const [recsLoading, setRecsLoading] = useState(false);
  const [recsError, setRecsError] = useState("");

  const profileComplete = profile && (profile.skills?.length || profile.interests?.length);

  /* ─── fetch recommendations when switching to recs tab ─── */
  useEffect(() => {
    if (tab !== "recs" || !profileComplete) return;
    const fetch = async () => {
      setRecsLoading(true);
      setRecsError("");
      try {
        const { data } = await careerAPI.recommend();
        setRecs(data.recommendations);
      } catch (err) {
        setRecsError(err?.response?.data?.message || "Failed to load recommendations");
      } finally {
        setRecsLoading(false);
      }
    };
    fetch();
  }, [tab, profileComplete]);

  const tabStyle = (active) => ({
    padding: "0.6rem 1.3rem",
    border: "none",
    background: active ? "var(--clr-primary)" : "transparent",
    color: active ? "#fff" : "var(--clr-text-muted)",
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    fontSize: "0.88rem",
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    transition: "background var(--transition), color var(--transition)",
  });

  return (
    <div className="container page-enter">
      {/* ─── Welcome ─── */}
      <div className="card" style={{ padding: "1.4rem 1.6rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.6rem" }}>
        <div>
          <h1 style={{ fontSize: "1.4rem", margin: 0 }}>👋 Hello, {user?.name}</h1>
          <p style={{ color: "var(--clr-text-muted)", fontSize: "0.88rem", margin: "0.2rem 0 0" }}>
            {profileComplete ? "Your profile is set up — check your recommendations!" : "Complete your profile to unlock personalised recommendations."}
          </p>
        </div>
        <span style={{ fontSize: "0.78rem", background: user?.role === "admin" ? "rgba(0,201,167,0.1)" : "rgba(108,99,255,0.1)", color: user?.role === "admin" ? "var(--clr-accent)" : "var(--clr-primary)", fontWeight: 700, padding: "0.25rem 0.7rem", borderRadius: "99px" }}>
          {user?.role === "admin" ? "Admin" : "User"}
        </span>
      </div>

      {/* ─── Tabs ─── */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", background: "var(--clr-bg)", padding: "0.35rem", borderRadius: "var(--radius-sm)", width: "fit-content" }}>
        <button style={tabStyle(tab === "profile")} onClick={() => setTab("profile")}>📝 Profile</button>
        <button style={tabStyle(tab === "recs")} onClick={() => setTab("recs")}>🚀 Recommendations</button>
      </div>

      {/* ─── Profile Tab ─── */}
      {tab === "profile" && <ProfileForm />}

      {/* ─── Recommendations Tab ─── */}
      {tab === "recs" && (
        <div>
          {!profileComplete && (
            <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: "var(--radius-sm)", padding: "1rem 1.2rem", marginBottom: "1.2rem", fontSize: "0.88rem" }}>
              ⚠️ Add at least one <strong>skill</strong> or <strong>interest</strong> in your profile to see recommendations.
            </div>
          )}

          {recsLoading && <Loader message="Calculating your matches…" />}

          {recsError && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", padding: "0.7rem 1rem", fontSize: "0.87rem", color: "var(--clr-danger)" }}>
              {recsError}
            </div>
          )}

          {!recsLoading && !recsError && recs.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.1rem" }}>
              {recs.map((c) => <CareerCard key={c._id} career={c} />)}
            </div>
          )}

          {!recsLoading && !recsError && recs.length === 0 && profileComplete && (
            <p style={{ color: "var(--clr-text-muted)", textAlign: "center", padding: "2rem" }}>No matching careers found. Try adding more skills or interests.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
