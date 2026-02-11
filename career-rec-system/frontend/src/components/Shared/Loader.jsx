import React from "react";

const Loader = ({ message = "Loading…" }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "3rem 0", gap: "1rem" }}>
    <div className="spinner" />
    <p style={{ color: "var(--clr-text-muted)", fontSize: "0.9rem" }}>{message}</p>
  </div>
);

export default Loader;
