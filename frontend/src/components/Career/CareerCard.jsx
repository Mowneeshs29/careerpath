import React from "react";
import { Link } from "react-router-dom";
import { categoryIcon, formatCurrency, scoreColor } from "../../utils/helpers";

const CareerCard = ({ career }) => {
  const { _id, title, category, description, requiredSkills, salaryRange, matchScore } = career;

  return (
    <Link to={`/careers/${_id}`} className="block h-full group outline-none">
      <div className="bg-white rounded-2xl p-6 flex flex-col gap-4 h-full shadow-sm border border-slate-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-md group-hover:border-blue-100 group-focus-visible:ring-2 group-focus-visible:ring-blue-500">
        {/* Header row */}
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 text-2xl group-hover:bg-blue-50 transition-colors">
            {categoryIcon(category)}
          </div>
          {matchScore !== undefined && (
            <span 
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{
                color: scoreColor(matchScore),
                backgroundColor: `${scoreColor(matchScore)}15`
              }}
            >
              {matchScore}% match
            </span>
          )}
        </div>

        {/* Title + category */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight mb-1">{title}</h3>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{category}</span>
        </div>

        {/* Description snippet */}
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed h-10">
          {description}
        </p>

        {/* Skills */}
        {requiredSkills?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {requiredSkills.slice(0, 4).map((s) => (
              <span key={s} className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                {s}
              </span>
            ))}
            {requiredSkills.length > 4 && (
              <span className="bg-slate-50 text-slate-400 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-100">
                +{requiredSkills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Salary */}
        {salaryRange?.min && (
          <div className="mt-auto pt-4 border-t border-slate-50 text-sm font-semibold text-slate-600 flex items-center gap-2">
            <span className="text-slate-400">💰</span>
            {formatCurrency(salaryRange.min)} – {formatCurrency(salaryRange.max)}
          </div>
        )}
      </div>
    </Link>
  );
};

export default CareerCard;
