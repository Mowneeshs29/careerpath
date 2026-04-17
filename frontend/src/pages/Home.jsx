import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const features = [
  { icon: "🎯", title: "Personalized Paths", desc: "Our engine scores careers against your unique skills, education, and interests to surface the best matches." },
  { icon: "🗺️", title: "Skill Mapping", desc: "See exactly which skills each career requires and where you stand — gaps become your roadmap." },
  { icon: "📚", title: "Learning Resources", desc: "Every recommended career comes with curated courses, certifications, and hands-on resources." },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="page-enter animate-in fade-in duration-500 font-sans bg-slate-50 min-h-screen -mt-8 pt-8">
      {/* ─── Hero ─── */}
      <section className="text-center py-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 flex flex-col items-center">
          <span>Discover the career</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 mt-2">
            made for you
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          Build your profile, share your skills and interests, and let our recommendation engine match you with careers that fit your future.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {user ? (
            <>
              <Link to="/dashboard" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm shadow-blue-200 transition-all hover:-translate-y-0.5">
                Go to Dashboard
              </Link>
              <Link to="/careers" className="px-8 py-3.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg shadow-sm transition-all">
                Browse Careers
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm shadow-blue-200 transition-all hover:-translate-y-0.5">
                Get Started Free
              </Link>
              <Link to="/careers" className="px-8 py-3.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg shadow-sm transition-all">
                Browse Careers
              </Link>
            </>
          )}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, index) => (
              <div 
                key={f.title} 
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 bg-blue-50 group-hover:bg-blue-100 transition-colors flex items-center justify-center rounded-2xl text-3xl mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {f.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      {!user && (
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-900 rounded-[2rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden border border-slate-800">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 via-violet-600/20 to-transparent mix-blend-overlay"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
                  Ready to find your path?
                </h2>
                <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto font-medium">
                  Sign up in seconds and unlock personalised career recommendations tailored to you.
                </p>
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-lg shadow-xl shadow-black/20 transition-transform hover:-translate-y-1"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;