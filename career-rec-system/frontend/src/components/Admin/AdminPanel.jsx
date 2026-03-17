import React, { useState, useEffect, useCallback } from "react";
import { adminAPI } from "../../services/api";
import { formatCurrency } from "../../utils/helpers";
import Loader from "../Shared/Loader";
import Button from "../Shared/Button";
import InputField from "../Shared/InputField";

const EDU_OPTIONS = [
  { value: "High School", label: "High School" },
  { value: "Associate", label: "Associate" },
  { value: "Bachelor's", label: "Bachelor's" },
  { value: "Master's", label: "Master's" },
  { value: "PhD", label: "PhD" },
  { value: "Certification", label: "Certification" },
];

const emptyForm = { title: "", category: "", description: "", requiredSkills: "", educationLevel: "Bachelor's", salaryMin: "", salaryMax: "" };

const AdminPanel = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [apiError, setApiError] = useState("");

  const fetchCareers = useCallback(async () => {
    try {
      const { data } = await adminAPI.list();
      setCareers(data.careers);
    } catch (e) {
      setApiError(e?.response?.data?.message || "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCareers(); }, [fetchCareers]);

  /* ─── Open create / edit ─── */
  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (career) => {
    setEditId(career._id);
    setForm({
      title: career.title,
      category: career.category,
      description: career.description,
      requiredSkills: (career.requiredSkills || []).join(", "),
      educationLevel: career.educationLevel || "Bachelor's",
      salaryMin: career.salaryRange?.min || "",
      salaryMax: career.salaryRange?.max || "",
    });
    setModalOpen(true);
  };

  /* ─── Save ─── */
  const handleSave = async (e) => {
    e.preventDefault();
    setApiError("");
    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      requiredSkills: form.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean),
      educationLevel: form.educationLevel,
      salaryRange: { min: Number(form.salaryMin) || 0, max: Number(form.salaryMax) || 0, currency: "USD" },
    };
    try {
      if (editId) {
        await adminAPI.update(editId, payload);
      } else {
        await adminAPI.create(payload);
      }
      setModalOpen(false);
      await fetchCareers();
    } catch (err) {
      setApiError(err?.response?.data?.message || "Save failed");
    }
  };

  /* ─── Delete ─── */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this career?")) return;
    try {
      await adminAPI.remove(id);
      setCareers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setApiError(err?.response?.data?.message || "Delete failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container page-enter">
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.8rem" }}>
        <h1 style={{ fontSize: "1.5rem", margin: 0 }}>⚙️ Admin — Career Management</h1>
        <Button variant="accent" onClick={openCreate}>+ Add Career</Button>
      </div>

      {apiError && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", padding: "0.6rem 0.8rem", marginBottom: "1rem", fontSize: "0.85rem", color: "var(--clr-danger)" }}>
          {apiError}
        </div>
      )}

      {/* Table */}
      <div className="card" style={{ overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--clr-border)", background: "var(--clr-bg)" }}>
              {["Title", "Category", "Education", "Salary", "Actions"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "0.75rem 1rem", fontWeight: 600, color: "var(--clr-text-muted)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {careers.map((c) => (
              <tr key={c._id} style={{ borderBottom: "1px solid var(--clr-border)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>{c.title}</td>
                <td style={{ padding: "0.75rem 1rem", color: "var(--clr-text-muted)" }}>{c.category}</td>
                <td style={{ padding: "0.75rem 1rem", color: "var(--clr-text-muted)" }}>{c.educationLevel}</td>
                <td style={{ padding: "0.75rem 1rem", color: "var(--clr-text-muted)", whiteSpace: "nowrap" }}>
                  {formatCurrency(c.salaryRange?.min)} – {formatCurrency(c.salaryRange?.max)}
                </td>
                <td style={{ padding: "0.75rem 1rem", display: "flex", gap: "0.5rem" }}>
                  <button className="btn btn-outline" style={{ padding: "0.3rem 0.7rem", fontSize: "0.78rem" }} onClick={() => openEdit(c)}>Edit</button>
                  <button className="btn" style={{ padding: "0.3rem 0.7rem", fontSize: "0.78rem", background: "#fef2f2", color: "var(--clr-danger)", border: "1.5px solid #fecaca" }} onClick={() => handleDelete(c._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {!careers.length && (
              <tr><td colSpan={5} style={{ padding: "2rem", textAlign: "center", color: "var(--clr-text-muted)" }}>No careers yet</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Modal ─── */}
      {modalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setModalOpen(false)}>
          <div className="card" style={{ width: "100%", maxWidth: 540, padding: "2rem", maxHeight: "90vh", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "1.2rem" }}>{editId ? "Edit Career" : "New Career"}</h2>

            {apiError && (
              <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", padding: "0.5rem 0.7rem", marginBottom: "0.8rem", fontSize: "0.82rem", color: "var(--clr-danger)" }}>
                {apiError}
              </div>
            )}

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
              <InputField label="Title" name="title" value={form.title} placeholder="e.g. Full-Stack Developer" required
                onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <InputField label="Category" name="category" value={form.category} placeholder="e.g. Technology" required
                onChange={(e) => setForm({ ...form, category: e.target.value })} />
              <InputField label="Description" name="description" value={form.description} multiline rows={3} placeholder="Describe the role…" required
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
              <InputField label="Required Skills (comma-separated)" name="requiredSkills" value={form.requiredSkills} placeholder="javascript, react, node.js"
                onChange={(e) => setForm({ ...form, requiredSkills: e.target.value })} />
              <InputField label="Education Level" type="select" name="educationLevel" value={form.educationLevel} options={EDU_OPTIONS}
                onChange={(e) => setForm({ ...form, educationLevel: e.target.value })} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem" }}>
                <InputField label="Salary Min (USD)" type="number" name="salaryMin" value={form.salaryMin} placeholder="60000"
                  onChange={(e) => setForm({ ...form, salaryMin: e.target.value })} />
                <InputField label="Salary Max (USD)" type="number" name="salaryMax" value={form.salaryMax} placeholder="120000"
                  onChange={(e) => setForm({ ...form, salaryMax: e.target.value })} />
              </div>

              <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.5rem" }}>
                <Button type="submit" variant="primary">Save</Button>
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
