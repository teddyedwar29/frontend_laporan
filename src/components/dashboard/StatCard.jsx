// src/components/dashboard/StatCard.jsx
import { ArrowUpRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const StatCard = ({ title, value, change, icon, color }) => {
  const IconComponent = LucideIcons[icon];
  
  const colorClasses = {
    emerald: 'border-emerald-500 bg-gradient-to-br from-emerald-500 to-emerald-700',
    blue: 'border-blue-500 bg-gradient-to-br from-blue-500 to-blue-700',
    violet: 'border-violet-500 bg-gradient-to-br from-violet-500 to-violet-700',
    amber: 'border-amber-500 bg-gradient-to-br from-amber-500 to-amber-700',
  };

  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 border-l-4 ${colorClasses[color]} hover:-translate-y-2 transition-transform duration-300`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 font-semibold">{title}</p>
          <p className="text-3xl font-bold text-slate-800 my-2">{value}</p>
          <div className="flex items-center gap-1 text-emerald-600 font-semibold text-sm">
            <ArrowUpRight size={16} />
            <span>{change}</span>
          </div>
        </div>
        <div className={`grid place-items-center w-12 h-12 rounded-lg text-white ${colorClasses[color]}`}>
          {IconComponent && <IconComponent size={24} />}
        </div>
      </div>
    </div>
  );
};

export default StatCard;