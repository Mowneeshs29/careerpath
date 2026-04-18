import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const NewThread = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", category: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    axios.get("/api/forum/categories").then(({ data }) => {
      setCategories(data.categories);
      setForm((prev) => ({ ...prev, category: data.categories[0] }));
    });
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const { data } = await axios.post("/api/forum", form);
      navigate(`/forum/${data.thread._id}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create thread");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Breadcrumb / Back Link */}
        <Link to="/forum" className="group inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold text-sm transition-colors mb-8">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover:border-blue-100 group-hover:bg-blue-50 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Back to Community Forum
        </Link>

        <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
          {/* Header Accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>
          
          <div className="p-8 md:p-12">
            <header className="mb-10">
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Start a Discussion</h1>
              <p className="text-slate-500 mt-2 font-medium">Ask a question, share a resource, or start a conversation with the community.</p>
            </header>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-4 mb-8 flex items-center gap-3 text-sm font-bold animate-in shake duration-500">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">!</div>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Category & Title Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Category</label>
                  <select
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 text-slate-700 font-bold focus:border-blue-500 focus:ring-0 transition-all outline-none appearance-none cursor-pointer"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Discussion Title</label>
                  <input
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3.5 text-slate-800 font-bold placeholder:text-slate-400 focus:border-blue-500 focus:ring-0 transition-all outline-none"
                    placeholder="e.g. How do I transition from Marketing to UI Design?"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    minLength={3}
                    maxLength={200}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Detailed Description</label>
                <div className="relative">
                  <textarea
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[1.5rem] px-6 py-5 text-slate-700 font-medium placeholder:text-slate-400 focus:border-blue-500 focus:ring-0 transition-all outline-none resize-none"
                    rows={8}
                    placeholder="Describe your question or topic in detail. You can include links or formatting instructions..."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    required
                    minLength={10}
                    maxLength={5000}
                  />
                  <div className="absolute bottom-4 right-6 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    {form.content.length} / 5000
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="flex-1 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {submitting ? "Publishing..." : "Post Discussion"}
                </button>
                <Link 
                  to="/forum" 
                  className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black rounded-xl transition-all text-center"
                >
                  Discard
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Community Guidelines Tag */}
        <div className="mt-8 text-center">
            <p className="text-xs text-slate-400 font-semibold italic">
              By posting, you agree to follow our Community Guidelines and keep discussions professional.
            </p>
        </div>
      </div>
    </div>
  );
};

export default NewThread;
