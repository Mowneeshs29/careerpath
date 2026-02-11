import React from "react";

const Button = ({ variant = "primary", size = "md", disabled = false, onClick, children, type = "button", style = {}, className = "" }) => {
  const sizeMap = { sm: { padding: "0.4rem 0.9rem", fontSize: "0.82rem" }, md: {}, lg: { padding: "0.8rem 1.8rem", fontSize: "1rem" } };

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      style={{ ...sizeMap[size], ...style }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
