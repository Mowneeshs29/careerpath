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
    <div className="page-enter">
      {/* ─── Keyframe Animations ─── */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animated-gradient {
          background: linear-gradient(
            135deg,
            var(--clr-primary),
            var(--clr-accent),
            var(--clr-primary-light),
            var(--clr-accent)
          );
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }

        .fade-in-up-delay-1 {
          animation: fadeInUp 0.8s ease-out 0.2s both;
        }

        .fade-in-up-delay-2 {
          animation: fadeInUp 0.8s ease-out 0.4s both;
        }

        .scale-in {
          animation: scaleIn 0.6s ease-out;
        }

        .scale-in-delay {
          animation: scaleIn 0.6s ease-out 0.6s both;
        }
      `}</style>

      {/* ─── Hero ─── */}
      <section style={{ textAlign: "center", padding: "4rem 1.25rem 3rem" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h1 
            className="fade-in-up"
            style={{ 
              fontSize: "clamp(2rem, 5vw, 2.9rem)", 
              fontFamily: "'Poppins', sans-serif", 
              lineHeight: 1.15, 
              margin: "0 0 1rem",
              fontWeight: 700
            }}
          >
            Discover the career{" "}
            <span className="animated-gradient" style={{ fontWeight: 800 }}>
              made for you
            </span>
          </h1>

          <p 
            className="fade-in-up-delay-1"
            style={{ 
              color: "var(--clr-text-muted)", 
              fontSize: "1.05rem", 
              lineHeight: 1.65, 
              margin: "0 0 2rem", 
              maxWidth: 540, 
              marginLeft: "auto", 
              marginRight: "auto",
              fontFamily: "'Inter', sans-serif"
            }}
          >
            Build your profile, share your skills and interests, and let our recommendation engine match you with careers that fit your future.
          </p>

          <div 
            className="fade-in-up-delay-2"
            style={{ display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            {user ? (
              <>
                <Link to="/dashboard" className="btn btn-primary" style={{ padding: "0.7rem 1.6rem", fontSize: "0.95rem" }}>
                  Go to Dashboard
                </Link>
                <Link to="/careers" className="btn btn-outline" style={{ padding: "0.7rem 1.6rem", fontSize: "0.95rem" }}>
                  Browse Careers
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary" style={{ padding: "0.7rem 1.6rem", fontSize: "0.95rem" }}>
                  Get Started Free
                </Link>
                <Link to="/careers" className="btn btn-outline" style={{ padding: "0.7rem 1.6rem", fontSize: "0.95rem" }}>
                  Browse Careers
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── Features ─── */}
      <section style={{ padding: "2rem 1.25rem 3.5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.2rem" }}>
            {features.map((f, index) => (
              <div 
                key={f.title} 
                className={`card scale-in${index > 0 ? '-delay' : ''}`}
                style={{ 
                  padding: "1.8rem 1.5rem", 
                  textAlign: "center",
                  animationDelay: `${0.8 + index * 0.15}s`
                }}
              >
                <span style={{ fontSize: "2.2rem" }}>{f.icon}</span>
                <h3 style={{ 
                  fontSize: "1.05rem", 
                  margin: "0.7rem 0 0.4rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600
                }}>
                  {f.title}
                </h3>
                <p style={{ 
                  color: "var(--clr-text-muted)", 
                  fontSize: "0.88rem", 
                  margin: 0, 
                  lineHeight: 1.6,
                  fontFamily: "'Inter', sans-serif"
                }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      {!user && (
        <section style={{ padding: "0 1.25rem 3rem" }}>
          <div className="container">
            <div 
              className="scale-in-delay"
              style={{ 
                background: "linear-gradient(135deg, var(--clr-primary), var(--clr-accent))", 
                borderRadius: "var(--radius-lg)", 
                padding: "3rem 2rem", 
                textAlign: "center", 
                color: "#fff",
                boxShadow: "0 10px 30px rgba(108, 99, 255, 0.3)"
              }}
            >
              <h2 style={{ 
                fontSize: "1.6rem", 
                margin: "0 0 0.6rem",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700
              }}>
                Ready to find your path?
              </h2>
              <p style={{ 
                opacity: 0.9, 
                fontSize: "0.95rem", 
                margin: "0 0 1.4rem", 
                maxWidth: 460, 
                marginLeft: "auto", 
                marginRight: "auto",
                fontFamily: "'Inter', sans-serif"
              }}>
                Sign up in seconds and unlock personalised career recommendations tailored to you.
              </p>
              <Link 
                to="/register" 
                className="btn" 
                style={{ 
                  background: "#fff", 
                  color: "var(--clr-primary)", 
                  padding: "0.7rem 1.8rem", 
                  fontSize: "0.95rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600
                }}
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;