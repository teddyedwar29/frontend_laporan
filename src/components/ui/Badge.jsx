// src/components/ui/Badge.jsx
import clsx from 'clsx';

const Badge = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider";
  
  const statusClasses = {
    'Excellent': 'bg-emerald-100 text-emerald-800',
    'Good': 'bg-blue-100 text-blue-800',
    'Needs Improvement': 'bg-red-100 text-red-800',
  };

  return (
    <span className={clsx(baseClasses, statusClasses[status])}>
      {status}
    </span>
  );
};

export default Badge;