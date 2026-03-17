import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const features = [
  { 
    icon: "🎯", 
    title: "Personalized Recommendations", 
    desc: "Our intelligent scoring engine matches careers to your unique skills, education, and interests—helping you find the perfect path forward." 
  },
  { 
    icon: "📊", 
    title: "Skill Gap Analysis", 
    desc: "See exactly which skills each career requires and identify your gaps. Turn missing skills into your personalized learning roadmap." 
  },
  { 
    icon: "📚", 
    title: "Curated Learning Paths", 
    desc: "Every recommended career includes hand-picked courses, certifications, and resources to help you build the skills you need." 
  },
  { 
    icon: "🚀", 
    title: "Career Exploration", 
    desc: "Browse our comprehensive database of career paths across technology, business, healthcare, and more—all with detailed insights." 
  },
];

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="page-enter">
      {/* ─── Hero Section ─── */}
      <section style={{ 
        background: "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #14b8a6 100%)",
        padding: "5rem 1.25rem 4rem",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative elements */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          opacity: 0.4
        }} />
        
        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div style={{ 
            display: "inline-block", 
            background: "rgba(255, 255, 255, 0.25)", 
            backdropFilter: "blur(10px)",
            color: "#fff", 
            fontSize: "0.8rem", 
            fontWeight: 700, 
            padding: "0.4rem 1.2rem", 
            borderRadius: "99px", 
            letterSpacing: "0.1em", 
            marginBottom: "1.5rem",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
          }}>
            AI-POWERED CAREER GUIDANCE
          </div>

          <h1 style={{ 
            fontSize: "clamp(2.2rem, 6vw, 3.5rem)", 
            fontFamily: "var(--font-display)", 
            lineHeight: 1.15, 
            margin: "0 0 1.2rem",
            color: "#fff",
            fontWeight: 800,
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
          }}>
            Discover Your{" "}
            <span style={{ 
              display: "inline-block",
              background: "rgba(255, 255, 255, 0.95)",
              color: "var(--clr-primary-dark)",
              padding: "0 0.3em",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
            }}>
              Perfect Career
            </span>
          </h1>

          <p style={{ 
            color: "rgba(255, 255, 255, 0.95)", 
            fontSize: "1.15rem", 
            lineHeight: 1.7, 
            margin: "0 0 2.5rem", 
            maxWidth: 600, 
            marginLeft: "auto", 
            marginRight: "auto",
            textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)"
          }}>
            Build your profile, let our intelligent recommendation engine analyze your strengths, and find careers perfectly matched to your skills and interests.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            {user ? (
              <>
                <Link to="/dashboard" className="btn" style={{ 
                  background: "#fff", 
                  color: "var(--clr-primary)", 
                  padding: "0.9rem 2rem", 
                  fontSize: "1rem",
                  fontWeight: 700,
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)"
                }}>
                  Go to Dashboard →
                </Link>
                <Link to="/careers" className="btn" style={{ 
                  background: "rgba(255, 255, 255, 0.2)", 
                  backdropFilter: "blur(10px)",
                  color: "#fff", 
                  padding: "0.9rem 2rem", 
                  fontSize: "1rem",
                  border: "2px solid rgba(255, 255, 255, 0.5)"
                }}>
                  Browse Careers
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn" style={{ 
                  background: "#fff", 
                  color: "var(--clr-primary)", 
                  padding: "0.9rem 2rem", 
                  fontSize: "1rem",
                  fontWeight: 700,
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)"
                }}>
                  Get Started Free →
                </Link>
                <Link to="/careers" className="btn" style={{ 
                  background: "rgba(255, 255, 255, 0.2)", 
                  backdropFilter: "blur(10px)",
                  color: "#fff", 
                  padding: "0.9rem 2rem", 
                  fontSize: "1rem",
                  border: "2px solid rgba(255, 255, 255, 0.5)"
                }}>
                  Browse Careers
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── Features Grid ─── */}
      <section style={{ padding: "4rem 1.25rem" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ 
              fontSize: "2rem", 
              fontWeight: 700, 
              marginBottom: "0.8rem",
              background: "linear-gradient(135deg, var(--clr-primary), var(--clr-accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}>
              Why Choose CareerPath?
            </h2>
            <p style={{ color: "var(--clr-text-muted)", fontSize: "1rem", maxWidth: 600, margin: "0 auto" }}>
              Powerful features designed to help you make informed career decisions
            </p>
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "1.8rem" 
          }}>
            {features.map((f) => (
              <div key={f.title} className="card" style={{ 
                padding: "2.2rem 1.8rem", 
                textAlign: "center",
                background: "linear-gradient(135deg, #fff 0%, #f8fafc 100%)"
              }}>
                <div style={{
                  width: 70,
                  height: 70,
                  background: "linear-gradient(135deg, var(--clr-primary), var(--clr-accent))",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.2rem",
                  fontSize: "2rem",
                  boxShadow: "0 8px 16px rgba(23, 162, 184, 0.25)"
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "1.15rem", margin: "0 0 0.7rem", fontWeight: 600 }}>{f.title}</h3>
                <p style={{ color: "var(--clr-text-muted)", fontSize: "0.92rem", margin: 0, lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      {!user && (
        <section style={{ padding: "0 1.25rem 4rem" }}>
          <div className="container">
            <div style={{ 
              background: "linear-gradient(135deg, var(--clr-primary), var(--clr-accent))", 
              borderRadius: "var(--radius-lg)", 
              padding: "3.5rem 2.5rem", 
              textAlign: "center", 
              color: "#fff",
              boxShadow: "0 20px 40px rgba(23, 162, 184, 0.3)",
              position: "relative",
              overflow: "hidden"
            }}>
              <div style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.05\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
                opacity: 0.3
              }} />
              
              <div style={{ position: "relative", zIndex: 1 }}>
                <h2 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 1rem" }}>
                  Ready to Find Your Path?
                </h2>
                <p style={{ 
                  opacity: 0.95, 
                  fontSize: "1.05rem", 
                  margin: "0 0 2rem", 
                  maxWidth: 520, 
                  marginLeft: "auto", 
                  marginRight: "auto",
                  lineHeight: 1.6
                }}>
                  Create your free account in seconds and get personalized career recommendations tailored to your unique profile.
                </p>
                <Link to="/register" className="btn" style={{ 
                  background: "#fff", 
                  color: "var(--clr-primary)", 
                  padding: "0.9rem 2.2rem", 
                  fontSize: "1rem",
                  fontWeight: 700,
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.2)"
                }}>
                  Create Free Account →
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
