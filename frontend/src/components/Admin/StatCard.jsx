import React from 'react';

const StatCard = ({ title, value, trend, icon, color }) => {
  
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100'
  };

  const selectedColor = colorMap[color] || colorMap.indigo;

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-default">
      <div className="flex justify-between items-start">
        
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            {title}
          </span>
          <h2 className="text-3xl font-extrabold text-[#1e293b] tracking-tight group-hover:text-indigo-600 transition-colors">
            {value}
          </h2>
          
          {/* Trend Section */}
          <div className="mt-2 flex items-center gap-1">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
              trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
            }`}>
              {trend}
            </span>
            <span className="text-[11px] font-medium text-slate-400">from last month</span>
          </div>
        </div>

        {/* Icon Container */}
        <div className={`p-4 rounded-xl border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${selectedColor}`}>
          <span className="text-xl">
            {icon}
          </span>
        </div>

      </div>
    </div>
  );
};

export default StatCard;