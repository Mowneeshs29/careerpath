import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import InputField from "../Shared/InputField";
import Button from "../Shared/Button";

const DEGREE_OPTIONS = [
  { value: "High School", label: "High School" },
  { value: "Associate", label: "Associate" },
  { value: "Bachelor's", label: "Bachelor's" },
  { value: "Master's", label: "Master's" },
  { value: "PhD", label: "PhD" },
  { value: "Certification", label: "Certification" },
];

const ProfileForm = () => {
  const { profile, updateProfile } = useAuth();
  const [education, setEducation] = useState(profile?.education?.[0] || { degree: "", field: "", institution: "", year: "" });
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(profile?.skills || []);
  const [interestInput, setInterestInput] = useState("");
  const [interests, setInterests] = useState(profile?.interests || []);
  const [salary, setSalary] = useState({ min: profile?.salaryExpectation?.min || "", max: profile?.salaryExpectation?.max || "" });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (profile) {
      setEducation(profile.education?.[0] || { degree: "", field: "", institution: "", year: "" });
      setSkills(profile.skills || []);
      setInterests(profile.interests || []);
      setSalary({ min: profile.salaryExpectation?.min || "", max: profile.salaryExpectation?.max || "" });
    }
  }, [profile]);

  /* ─── Tag helpers ─── */
  const addTag = (val, list, setList) => {
    const trimmed = val.trim().toLowerCase();
    if (trimmed && !list.includes(trimmed)) setList([...list, trimmed]);
  };

  const removeTag = (tag, list, setList) => setList(list.filter((t) => t !== tag));

  const handleKeyDown = (e, val, list, setList, setVal) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(val, list, setList);
      setVal("");
    }
  };

  /* ─── Submit ─── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");
    try {
      await updateProfile({
        education: education.degree || education.field ? [{ ...education, year: education.year ? Number(education.year) : undefined }] : [],
        skills,
        interests,
        salaryExpectation: { min: salary.min ? Number(salary.min) : undefined, max: salary.max ? Number(salary.max) : undefined },
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setApiError(err?.response?.data?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  /* ─── Tag chip row ─── */
  const TagRow = ({ tags, onRemove }) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.3rem" }}>
      {tags.map((t) => (
        <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", background: "#eef0ff", color: "var(--clr-primary)", fontSize: "0.78rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: "99px" }}>
          {t}
          <button type="button" onClick={() => onRemove(t)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--clr-primary)", fontSize: "0.95rem", lineHeight: 1, padding: 0 }}>×</button>
        </span>
      ))}
    </div>
  );

  return (
    <div className="page-enter">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.8rem" }}>

        {apiError && (
          <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", padding: "0.6rem 0.8rem", fontSize: "0.85rem", color: "var(--clr-danger)" }}>
            {apiError}
          </div>
        )}

        {/* ─ Education ─ */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "1rem" }}>🎓 Education</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
            <InputField label="Degree" type="select" name="degree" value={education.degree} options={DEGREE_OPTIONS} placeholder="Select degree"
              onChange={(e) => setEducation({ ...education, degree: e.target.value })} />
            <InputField label="Field of Study" name="field" value={education.field} placeholder="e.g. Computer Science"
              onChange={(e) => setEducation({ ...education, field: e.target.value })} />
            <InputField label="Institution" name="institution" value={education.institution} placeholder="e.g. MIT"
              onChange={(e) => setEducation({ ...education, institution: e.target.value })} />
            <InputField label="Graduation Year" type="number" name="year" value={education.year} placeholder="2024"
              onChange={(e) => setEducation({ ...education, year: e.target.value })} />
          </div>
        </div>

        {/* ─ Skills ─ */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.6rem" }}>💻 Technical Skills</h3>
          <p style={{ fontSize: "0.82rem", color: "var(--clr-text-muted)", marginBottom: "0.7rem" }}>Type a skill and press Enter or comma to add</p>
          <input
            className="input"
            value={skillInput}
            placeholder="e.g. python, react, sql…"
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, skillInput, skills, setSkills, setSkillInput)}
          />
          <TagRow tags={skills} onRemove={(t) => removeTag(t, skills, setSkills)} />
        </div>

        {/* ─ Interests ─ */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.6rem" }}>🎯 Interests</h3>
          <p style={{ fontSize: "0.82rem", color: "var(--clr-text-muted)", marginBottom: "0.7rem" }}>What topics excite you?</p>
          <input
            className="input"
            value={interestInput}
            placeholder="e.g. data analysis, design…"
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, interestInput, interests, setInterests, setInterestInput)}
          />
          <TagRow tags={interests} onRemove={(t) => removeTag(t, interests, setInterests)} />
        </div>

        {/* ─ Salary ─ */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.8rem" }}>💰 Salary Expectation (USD)</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <InputField label="Minimum" type="number" name="min" value={salary.min} placeholder="60000"
              onChange={(e) => setSalary({ ...salary, min: e.target.value })} />
            <InputField label="Maximum" type="number" name="max" value={salary.max} placeholder="120000"
              onChange={(e) => setSalary({ ...salary, max: e.target.value })} />
          </div>
        </div>

        {/* ─ Save ─ */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            {loading ? "Saving…" : "Save Profile"}
          </Button>
          {saved && <span style={{ fontSize: "0.88rem", color: "var(--clr-success)", fontWeight: 600 }}>✓ Saved</span>}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
