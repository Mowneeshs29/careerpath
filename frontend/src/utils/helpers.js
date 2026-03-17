/* ─── Debounce ─── */
export const debounce = (fn, ms = 300) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
};

/* ─── Number formatting ─── */
export const formatCurrency = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

/* ─── Category icons (emoji fallback) ─── */
const CAT_ICONS = {
  Technology: "💻",
  Finance: "📊",
  Healthcare: "🏥",
  Design: "🎨",
  Marketing: "📣",
  Business: "📋",
  Education: "🎓",
};
export const categoryIcon = (cat) => CAT_ICONS[cat] || "📌";

/* ─── Match score colour ─── */
export const scoreColor = (score) => {
  if (score >= 70) return "var(--clr-success)";
  if (score >= 40) return "var(--clr-warning)";
  return "var(--clr-danger)";
};
