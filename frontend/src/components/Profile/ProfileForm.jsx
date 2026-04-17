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
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((t) => (
        <span key={t} className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100">
          {t}
          <button type="button" onClick={() => onRemove(t)} className="text-blue-500 hover:text-blue-800 text-lg leading-none cursor-pointer p-0 mb-0.5 outline-none">&times;</button>
        </span>
      ))}
    </div>
  );

  return (
    <div className="animate-in fade-in duration-300">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg py-3 px-4 text-sm font-medium">
            {apiError}
          </div>
        )}

        {/* ─ Education ─ */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-5">🎓 Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-2">💻 Technical Skills</h3>
          <p className="text-sm text-slate-500 mb-4 font-medium">Type a skill and press Enter or comma to add</p>
          <input
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-slate-700"
            value={skillInput}
            placeholder="e.g. python, react, sql…"
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, skillInput, skills, setSkills, setSkillInput)}
          />
          <TagRow tags={skills} onRemove={(t) => removeTag(t, skills, setSkills)} />
        </div>

        {/* ─ Interests ─ */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-2">🎯 Interests</h3>
          <p className="text-sm text-slate-500 mb-4 font-medium">What topics excite you?</p>
          <input
            className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium text-slate-700"
            value={interestInput}
            placeholder="e.g. data analysis, design…"
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, interestInput, interests, setInterests, setInterestInput)}
          />
          <TagRow tags={interests} onRemove={(t) => removeTag(t, interests, setInterests)} />
        </div>

        {/* ─ Salary ─ */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-5">💰 Salary Expectation (USD)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputField label="Minimum" type="number" name="min" value={salary.min} placeholder="30000"
              onChange={(e) => setSalary({ ...salary, min: e.target.value })} />
            <InputField label="Maximum" type="number" name="max" value={salary.max} placeholder="120000"
              onChange={(e) => setSalary({ ...salary, max: e.target.value })} />
          </div>
        </div>

        {/* ─ Save ─ */}
        <div className="flex items-center gap-4">
          <button type="submit" disabled={loading} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm shadow-blue-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? "Saving…" : "Save Profile"}
          </button>
          {saved && <span className="text-sm text-emerald-600 font-bold bg-emerald-50 px-3 py-1.5 rounded-md">✓ Saved successfully</span>}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
