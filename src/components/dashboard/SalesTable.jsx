// src/components/dashboard/SalesTable.jsx
import { Table, User, ArrowRight } from 'lucide-react';

const SalesTable = ({ reports }) => {
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="text-center py-10">
        <Table className="mx-auto text-slate-400 mb-2" size={40}/>
        <p className="text-slate-500">Tidak ada data untuk ditampilkan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-slate-500">
        <thead className="text-xs text-slate-700 uppercase bg-slate-50">
          <tr>
            <th scope="col" className="px-6 py-3">Tanggal</th>
            <th scope="col" className="px-6 py-3">Reseller</th>
            <th scope="col" className="px-6 py-3 text-right">Cash</th>
            <th scope="col" className="px-6 py-3 text-right">Transfer</th>
            <th scope="col" className="px-6 py-3 text-right">QRIS</th>
            <th scope="col" className="px-6 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index} className="bg-white border-b hover:bg-slate-50">
              <td className="px-6 py-4">{new Date(report.tanggal).toLocaleDateString('id-ID')}</td>
              <td className="px-6 py-4 font-medium text-slate-900">
                <div className="flex items-center">
                  <User size={14} className="mr-2 text-slate-400" />
                  <div>
                    <div>{report.nama_reseller}</div>
                    <div className="text-xs text-slate-400">{report.kode}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-right">{formatCurrency(report.cash)}</td>
              <td className="px-6 py-4 text-right">{formatCurrency(report.transfer)}</td>
              <td className="px-6 py-4 text-right">{formatCurrency(report.qris)}</td>
              <td className="px-6 py-4 text-right font-semibold text-slate-800">{formatCurrency(report.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;