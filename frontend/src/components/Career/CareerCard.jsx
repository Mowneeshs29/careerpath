import React from "react";
import { Link } from "react-router-dom";
import { categoryIcon, formatCurrency, scoreColor } from "../../utils/helpers";

const CareerCard = ({ career }) => {
  const { _id, title, category, description, requiredSkills, salaryRange, matchScore } = career;

  return (
    <Link to={`/careers/${_id}`} className="block h-full group outline-none">
      <div className="relative overflow-hidden bg-white rounded-3xl p-7 flex flex-col gap-5 h-full transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:-translate-y-2 border border-slate-100 group-hover:border-indigo-100">
        
        {/* Decorative Background Blob (appears on hover) */}
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Header row */}
        <div className="flex justify-between items-start relative z-10">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-slate-50 text-3xl group-hover:scale-110 transition-transform duration-500 shadow-sm border border-slate-100">
            {categoryIcon(category)}
          </div>
          
          {matchScore !== undefined && (
            <div className="text-right">
              <div 
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-sm shadow-sm transition-all duration-300 group-hover:shadow-md"
                style={{
                  color: scoreColor(matchScore),
                  backgroundColor: `${scoreColor(matchScore)}12`,
                  border: `1px solid ${scoreColor(matchScore)}30`
                }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: scoreColor(matchScore) }} />
                {matchScore}% match
              </div>
            </div>
          )}
        </div>

        {/* Title + category */}
        <div className="relative z-10">
          <h3 className="text-xl font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight mb-2">
            {title}
          </h3>
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest rounded-lg">
            {category}
          </span>
        </div>

        {/* Description snippet */}
        <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed relative z-10">
          {description}
        </p>

        {/* Skills */}
        {requiredSkills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto relative z-10">
            {requiredSkills.slice(0, 3).map((s) => (
              <span key={s} className="bg-white text-slate-600 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-slate-200 group-hover:border-indigo-200 transition-colors">
                {s}
              </span>
            ))}
            {requiredSkills.length > 3 && (
              <span className="bg-slate-50 text-slate-400 text-[11px] font-bold px-3 py-1.5 rounded-xl border border-slate-100">
                +{requiredSkills.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer info */}
        <div className="pt-5 border-t border-slate-50 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-green-50 text-green-600 rounded-lg text-xs">💰</span>
            <span className="text-sm font-bold text-slate-700">
              {formatCurrency(salaryRange.min)}
              <span className="text-slate-400 font-medium mx-1">-</span>
              {formatCurrency(salaryRange.max)}
            </span>
          </div>
          
          <div className="text-indigo-600 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CareerCard;
