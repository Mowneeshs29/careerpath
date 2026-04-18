import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { careerAPI } from "../services/api";
import { Link } from "react-router-dom";
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

  const tabStyle = (active) => `px-6 py-2.5 font-semibold text-sm rounded-lg transition-all ${active ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`;

  return (
    <div className="max-w-6xl mx-auto px-6 page-enter pb-16 font-sans">
      {/* ─── Welcome ─── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8 mb-8 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 m-0">👋 Hello, {user?.name}</h1>
          <p className="text-slate-500 font-medium mt-2">
            {profileComplete ? "Your profile is set up — check your recommendations!" : "Complete your profile to unlock personalised recommendations."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {user?.role === "admin" && (
            <Link 
              to="/admin" 
              className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-slate-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Admin Panel
            </Link>
          )}
          <span className={`text-xs font-bold px-4 py-1.5 rounded-full ${user?.role === "admin" ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"}`}>
            {user?.role === "admin" ? "Admin" : "User"}
          </span>
        </div>
      </div>

      {/* ─── Tabs ─── */}
      <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-xl border border-slate-100 w-fit shadow-sm">
        <button className={tabStyle(tab === "profile")} onClick={() => setTab("profile")}>📝 Profile</button>
        <button className={tabStyle(tab === "recs")} onClick={() => setTab("recs")}>🚀 Recommendations</button>
      </div>

      {/* ─── Profile Tab ─── */}
      {tab === "profile" && <ProfileForm />}

      {/* ─── Recommendations Tab ─── */}
      {tab === "recs" && (
        <div className="animate-in fade-in duration-300">
          {!profileComplete && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-5 mb-6 text-sm font-medium">
              ⚠️ Add at least one <strong>skill</strong> or <strong>interest</strong> in your profile to see recommendations.
            </div>
          )}

          {recsLoading && <Loader message="Calculating your matches…" />}

          {recsError && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-5 text-sm font-medium mb-6">
              {recsError}
            </div>
          )}

          {!recsLoading && !recsError && recs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recs.map((c) => <CareerCard key={c._id} career={c} />)}
            </div>
          )}

          {!recsLoading && !recsError && recs.length === 0 && profileComplete && (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-500 font-medium shadow-sm">
              No matching careers found. Try adding more skills or interests.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
