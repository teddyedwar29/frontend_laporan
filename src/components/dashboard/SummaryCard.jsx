// src/components/dashboard/SummaryCard.jsx
const SummaryCard = ({ summary }) => {
  // JIKA TIDAK ADA DATA SUMMARY, JANGAN RENDER APAPUN
  if (!summary) {
    return null;
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value || 0);
  }

  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="bg-blue-50 p-3 rounded-md">
        <p className="text-slate-500">Total Penjualan</p>
        <p className="font-bold text-blue-700">{formatCurrency(summary.total_sales)}</p>
      </div>
      <div className="bg-green-50 p-3 rounded-md">
        <p className="text-slate-500">Total Cash</p>
        <p className="font-bold text-green-700">{formatCurrency(summary.total_cash)}</p>
      </div>
      <div className="bg-yellow-50 p-3 rounded-md">
        <p className="text-slate-500">Total Transfer</p>
        <p className="font-bold text-yellow-700">{formatCurrency(summary.total_transfer)}</p>
      </div>
      <div className="bg-purple-50 p-3 rounded-md">
        <p className="text-slate-500">Total QRIS</p>
        <p className="font-bold text-purple-700">{formatCurrency(summary.total_qris)}</p>
      </div>
    </div>
  );
};

export default SummaryCard;