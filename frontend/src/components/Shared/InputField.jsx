import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  onChange,
  error,
  multiline = false,
  rows = 3,
  options = [],          // for <select>
  required = false,
  disabled = false,
}) => {
  const shared = {
    className: "input",
    name,
    value,
    placeholder,
    onChange,
    disabled,
    "aria-invalid": !!error,
  };

  let control;
  if (type === "select") {
    control = (
      <select {...shared} style={{ appearance: "auto" }}>
        <option value="">{placeholder || "Select…"}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    );
  } else if (multiline) {
    control = <textarea {...shared} rows={rows} style={{ resize: "vertical" }} />;
  } else {
    control = <input type={type} {...shared} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
      {label && (
        <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--clr-text)" }}>
          {label} {required && <span style={{ color: "var(--clr-danger)" }}>*</span>}
        </label>
      )}
      {control}
      {error && <span style={{ fontSize: "0.78rem", color: "var(--clr-danger)" }}>{error}</span>}
    </div>
  );
};

export default InputField;
