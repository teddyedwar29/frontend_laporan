// src/components/dashboard/ReportFilters.jsx
import { useState } from 'react';
import { Calendar, ChevronsRight } from 'lucide-react';

const ReportFilters = ({ onFilterSubmit, onCompareSubmit, isLoading }) => {
  const [viewMode, setViewMode] = useState('filter'); // 'filter' atau 'compare'
  
  // State untuk compare
  const currentYear = new Date().getFullYear();
  const [compare, setCompare] = useState({
    month1: '1', year1: String(currentYear),
    month2: '2', year2: String(currentYear),
  });

  const months = Array.from({ length: 12 }, (_, i) => ({ value: i + 1, name: new Date(0, i).toLocaleString('id-ID', { month: 'long' }) }));
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  const handleFilterClick = (filterType) => {
    setViewMode('filter');
    onFilterSubmit(filterType);
  };

  const handleCompareChange = (e) => {
    const { name, value } = e.target;
    setCompare(prev => ({ ...prev, [name]: value }));
  };

  const handleCompareClick = () => {
    if (isLoading) return;
    onCompareSubmit(compare);
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
      <div className="flex flex-wrap items-center gap-4">
        {/* Tombol Filter Cepat */}
        <div className="flex items-center gap-2">
          <button onClick={() => handleFilterClick('today')} disabled={isLoading} className="btn-filter">Hari Ini</button>
          <button onClick={() => handleFilterClick('this_week')} disabled={isLoading} className="btn-filter">Minggu Ini</button>
          <button onClick={() => handleFilterClick('this_month')} disabled={isLoading} className="btn-filter">Bulan Ini</button>
        </div>

        <div className="h-8 border-l border-slate-200 mx-2"></div>

        {/* Tombol untuk ganti mode */}
        <button 
          onClick={() => setViewMode(viewMode === 'filter' ? 'compare' : 'filter')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            viewMode === 'compare' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {viewMode === 'filter' ? 'Bandingkan Data' : 'Lihat Laporan Biasa'}
        </button>
      </div>

      {/* Form untuk Compare */}
      {viewMode === 'compare' && (
        <div className="mt-4 p-4 bg-slate-50 rounded-md border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
            {/* Periode 1 */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium text-slate-600">Bulan 1</label>
                <select name="month1" value={compare.month1} onChange={handleCompareChange} className="w-full mt-1 p-2 border rounded-md">
                  {months.map(m => <option key={`m1-${m.value}`} value={m.value}>{m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Tahun 1</label>
                <select name="year1" value={compare.year1} onChange={handleCompareChange} className="w-full mt-1 p-2 border rounded-md">
                  {years.map(y => <option key={`y1-${y}`} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            
            <div className="flex justify-center items-end">
              <ChevronsRight className="text-slate-400" size={24}/>
            </div>
            
            {/* Periode 2 */}
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium text-slate-600">Bulan 2</label>
                <select name="month2" value={compare.month2} onChange={handleCompareChange} className="w-full mt-1 p-2 border rounded-md">
                  {months.map(m => <option key={`m2-${m.value}`} value={m.value}>{m.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600">Tahun 2</label>
                <select name="year2" value={compare.year2} onChange={handleCompareChange} className="w-full mt-1 p-2 border rounded-md">
                  {years.map(y => <option key={`y2-${y}`} value={y}>{y}</option>)}
                </select>
              </div>
            </div>

            <button onClick={handleCompareClick} disabled={isLoading} className="btn-primary w-full md:w-auto">
              Bandingkan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportFilters;