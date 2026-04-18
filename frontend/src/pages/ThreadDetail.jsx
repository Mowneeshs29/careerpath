import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { forumAPI } from "../services/api";

const ThreadDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await forumAPI.getById(id);
        setThread(data.thread);
      } catch {
        navigate("/forum");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, navigate]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    setSubmitting(true);
    try {
      const { data } = await forumAPI.reply(id, { content: replyContent });
      setThread(data.thread);
      setReplyContent("");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to post reply");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this thread?")) return;
    try {
      await forumAPI.removeThread(id);
      navigate("/forum");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete");
    }
  };

  const handleDeleteReply = async (replyId) => {
    if (!window.confirm("Delete this reply?")) return;
    try {
      await forumAPI.removeReply(id, replyId);
      setThread((prev) => ({ ...prev, replies: prev.replies.filter((r) => r._id !== replyId) }));
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete");
    }
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

  if (loading) return <div style={{ textAlign: "center", padding: "3rem" }}><div className="spinner" /></div>;
  if (!thread) return null;

  const canDelete = user && (thread.author._id === user._id || user.role === "admin");

  return (
    <div className="min-h-screen bg-slate-50 pt-10 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation / Back */}
        <Link to="/forum" className="group inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-semibold text-sm transition-colors mb-8">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 group-hover:border-blue-100 group-hover:bg-blue-50 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          Back to Discussions
        </Link>

        {/* Main Thread Card */}
        <article className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden mb-12 relative">
          {/* Accent Header */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500"></div>
          
          <div className="p-8 md:p-12">
            <header className="mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
                  {thread.category}
                </span>
                
                {canDelete && (
                  <button 
                    onClick={handleDelete}
                    className="px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Delete Discussion
                  </button>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight mb-6">
                {thread.title}
              </h1>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center font-black text-slate-500 border-2 border-white shadow-sm">
                  {thread.author?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{thread.author?.name}</span>
                    {thread.author?.role === 'admin' && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded uppercase">Admin</span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mt-0.5">
                    Posted {timeAgo(thread.createdAt)} • {thread.views} Views
                  </div>
                </div>
              </div>
            </header>

            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap font-medium">
                {thread.content}
              </p>
            </div>
          </div>
        </article>

        {/* Replies Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between mb-2 px-4">
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              Community Contributions 
              <span className="ml-2 px-2 py-0.5 bg-slate-200 text-slate-500 text-xs rounded-lg">{thread.replies?.length || 0}</span>
            </h2>
          </div>

          <div className="space-y-4">
            {thread.replies?.map((reply) => {
              const canDeleteReply = user && (reply.author._id === user._id || user.role === "admin");
              return (
                <div key={reply._id} className="group bg-white p-6 md:p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center font-bold text-slate-400 text-sm border border-slate-100">
                        {reply.author?.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-700">{reply.author?.name}</span>
                          {reply.author?.role === 'admin' && (
                            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded uppercase">Staff</span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{timeAgo(reply.createdAt)}</span>
                      </div>
                    </div>
                    
                    {canDeleteReply && (
                      <button 
                        onClick={() => handleDeleteReply(reply._id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-rose-400 hover:text-rose-600 transition-all"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                  <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-wrap ml-12">
                    {reply.content}
                  </p>
                </div>
              );
            })}

            {!thread.replies?.length && (
              <div className="bg-white/50 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                <p className="text-slate-400 font-bold italic">No replies yet. Be the first to share your insights!</p>
              </div>
            )}
          </div>

          {/* Add Reply Card */}
          {user ? (
            <div className="mt-12 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/40 relative">
              <div className="absolute top-0 left-10 w-6 h-6 bg-white border-t border-l border-slate-100 transform -translate-y-1/2 rotate-45"></div>
              <h3 className="text-lg font-black text-slate-800 mb-4 ml-2">Your Reply</h3>
              <form onSubmit={handleReply}>
                <textarea
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-slate-700 font-medium placeholder:text-slate-400 focus:border-blue-500 focus:ring-0 transition-all outline-none resize-none mb-4"
                  rows={4}
                  placeholder="Type your response here..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  required
                />
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="w-full sm:w-auto px-10 py-4 bg-slate-900 border-none hover:bg-black text-white font-black rounded-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {submitting ? "Posting..." : "Post Contribution"}
                </button>
              </form>
            </div>
          ) : (
            <div className="mt-12 bg-slate-900 rounded-[2rem] p-10 text-center text-white relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent"></div>
               <div className="relative z-10">
                  <h3 className="text-xl font-black mb-2">Join the Discussion</h3>
                  <p className="text-slate-400 font-medium mb-6">Sign in to share your thoughts and connect with others.</p>
                  <Link to="/login" className="inline-block px-10 py-3.5 bg-white text-slate-900 font-black rounded-xl hover:bg-slate-100 transition-all">Sign In</Link>
               </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ThreadDetail;