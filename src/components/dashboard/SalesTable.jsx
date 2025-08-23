// src/components/dashboard/SalesTable.jsx
import { useState } from 'react';
import { Search, SlidersHorizontal, Download } from 'lucide-react';
import Badge from '../ui/Badge';
import { salesData } from '../../data/mockData';

const SalesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = salesData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk format mata uang
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Table Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-xl font-bold text-slate-800">Detail Performa Tim Sales</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Cari nama atau ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg hover:bg-slate-200 transition">
            <SlidersHorizontal size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#193cb0] to-[#4361ee] text-white font-semibold rounded-lg hover:opacity-90 transition shadow-md">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['ID MR', 'Nama MR', 'Jml Transaksi', 'Jml Outlet Aktif', 'Akuisisi', 'Akuisisi Aktif', 'Profit', 'Status'].map((head) => (
                <th key={head} className="p-4 text-sm font-semibold text-slate-600 uppercase tracking-wider">{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row.id} className="border-b border-slate-200 hover:bg-slate-50 transition">
                <td className="p-4 font-bold text-slate-700">{row.id}</td>
                <td className="p-4 text-slate-800">{row.name}</td>
                <td className="p-4 text-slate-600">{row.transactions}</td>
                <td className="p-4 text-slate-600">{row.activeOutlets}</td>
                <td className="p-4 text-slate-600">{row.acquisition}</td>
                <td className="p-4 text-slate-600">{row.activeAcquisition}</td>
                <td className="p-4 font-semibold text-emerald-600">{formatCurrency(row.profit)}</td>
                <td className="p-4">
                  <Badge status={row.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesTable;