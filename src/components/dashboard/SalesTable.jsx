// src/components/dashboard/SalesTable.jsx

import { useState, useEffect } from 'react';
import { Search, Download, LoaderCircle } from 'lucide-react';
import Badge from '../ui/Badge';
import api from '../../api/axiosInstance'; // <-- Pastikan ini ada
import clsx from 'clsx'; // <-- Pastikan ini di-install (npm install clsx)

const SalesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [salesState, setSalesState] = useState({
    loading: true,
    data: [],
    error: null,
  });
  const [timeFilter, setTimeFilter] = useState('day'); // Default filter

  useEffect(() => {
    const fetchData = async () => {
      setSalesState((prevState) => ({ ...prevState, loading: true, error: null }));

      try {
        // --- INI BAGIAN YANG KITA SESUAIKAN ---
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1; // getMonth() = 0-11, jadi +1

        // Endpoint sekarang statis
        const endpoint = '/report/admin/summary';

        // Semua parameter dikirim lewat `params`
        const response = await api.get(endpoint, {
          params: {
            filter: timeFilter, // 'day', 'week', atau 'month'
            year: year,
            month: month,
          },
        });
        
        // Asumsi data ada di dalam response.data.data sesuai screenshot
        setSalesState({ loading: false, data: response.data.data, error: null });

      } catch (err) {
        setSalesState({
          loading: false,
          data: [],
          error: err.response?.data?.message || 'Gagal mengambil data dari server.',
        });
      }
    };

    fetchData();
  }, [timeFilter]); // <-- Tetap di sini, agar fetch ulang saat filter ganti

  // Logika filter di sisi frontend (tetap sama)
  const filteredData = salesState.data?.filter(
    (item) =>
      item.nama_mr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id_mr.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  // Fungsi format mata uang (tetap sama)
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
  
  // Konfigurasi tombol filter (sesuaikan valuenya jika perlu)
  const filterButtons = [
    { label: 'Harian', value: 'day' },
    { label: 'Mingguan', value: 'week' },
    { label: 'Bulanan', value: 'month' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* UI Header Tabel (Tombol, Search, dll) - Tidak ada perubahan */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        {/* ... */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* ... Search Bar ... */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg">
            {filterButtons.map((btn) => (
              <button
                key={btn.value}
                onClick={() => setTimeFilter(btn.value)}
                className={clsx('px-4 py-1 rounded-md text-sm font-semibold transition-colors', timeFilter === btn.value ? 'bg-white text-blue-600 shadow-sm' : 'bg-transparent text-slate-600 hover:bg-slate-200')}
              >
                {btn.label}
              </button>
            ))}
          </div>
          {/* ... Tombol Export ... */}
        </div>
      </div>

      {/* Tampilan Loading & Error - Tidak ada perubahan */}
      {salesState.loading && (
        <div className="flex justify-center items-center p-16">
          <LoaderCircle className="animate-spin text-blue-500" size={48} />
        </div>
      )}
      {salesState.error && <div className="p-8 text-center text-red-800 bg-red-100 rounded-lg">{salesState.error}</div>}

      {/* Tabel Data - Tidak ada perubahan, nama field sudah sesuai */}
      {!salesState.loading && !salesState.error && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>{/* ... */}</thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id_mr} className="border-b border-slate-200 hover:bg-slate-50 transition">
                  <td className="p-4 font-bold text-slate-700">{row.id_mr}</td>
                  <td className="p-4 text-slate-800">{row.nama_mr}</td>
                  <td className="p-4 text-slate-600">{row.jml_transaksi}</td>
                  <td className="p-4 text-slate-600">{row.jml_outlet_aktif}</td>
                  <td className="p-4 text-slate-600">{row.akuisisi}</td>
                  <td className="p-4 text-slate-600">{row.akuisisi_aktif}</td>
                  <td className="p-4 font-semibold text-emerald-600">{formatCurrency(row.profit)}</td>
                  <td className="p-4"><Badge status="Good" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SalesTable;