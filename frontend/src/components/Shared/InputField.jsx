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
  const baseClasses = "w-full bg-slate-50 border rounded-xl text-slate-800 font-medium placeholder:font-normal placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed";
  
  const errorClasses = error 
    ? "border-red-300 focus:border-red-500 focus:ring-red-500/30" 
    : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/30 hover:border-slate-300";

  const shared = {
    className: `${baseClasses} ${errorClasses} ${multiline ? 'py-3 px-4' : 'px-4 py-3.5'}`,
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
      <div className="relative">
        <select {...shared} className={`${shared.className} appearance-none cursor-pointer pb-3.5`}>
          <option value="">{placeholder || "Select…"}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    );
  } else if (multiline) {
    control = <textarea {...shared} rows={rows} className={`${shared.className} resize-y min-h-[100px]`} />;
  } else {
    control = <input type={type} {...shared} />;
  }

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-bold text-slate-700 ml-1">
          {label} {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}
      {control}
      {error && (
        <span className="text-xs font-bold text-red-500 ml-1 flex items-center gap-1 mt-0.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          {error}
        </span>
      )}
    </div>
  );
};

export default InputField;
