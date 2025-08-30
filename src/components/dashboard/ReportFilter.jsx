import { useState } from 'react';

const ReportFilter = ({ onFilterChange }) => {
  const [filterType, setFilterType] = useState('day');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [week, setWeek] = useState(1);
  const [startDate, setStartDate] = useState('');

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    let params = {};

    switch (filterType) {
      case 'month':
        params = {
          period: filterType,
          year: year,
          month: month
        };
        break;
      case 'week':
        params = {
          period: filterType,
          year: year,
          month: month,
          week: week
        };
        break;
      case 'day':
        params = {
          period: filterType,
          day: startDate
        };
        break;
    }

    onFilterChange(params);
  };

  const renderFilterInputs = () => {
    switch (filterType) {
      case 'month':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bulan
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {months.map((monthName, index) => (
                  <option key={index + 1} value={index + 1}>
                    {monthName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tahun
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'week':
        return (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minggu Ke-
              </label>
              <select
                value={week}
                onChange={(e) => setWeek(Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5].map((weekNum) => (
                  <option key={weekNum} value={weekNum}>
                    {weekNum}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bulan
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {months.map((monthName, index) => (
                  <option key={index + 1} value={index + 1}>
                    {monthName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tahun
              </label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      default: // case 'day'
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="rounded-lg border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="day">Harian</option>
        <option value="week">Mingguan</option>
        <option value="month">Bulanan</option>
      </select>

      {renderFilterInputs()}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
      >
        Terapkan Filter
      </button>
    </form>
  );
};

export default ReportFilter;