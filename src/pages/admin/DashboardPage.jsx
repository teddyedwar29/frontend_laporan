// src/pages/admin/DashboardPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import ReportFilter from '../../components/dashboard/ReportFilter';
import ReportTable from '../../components/dashboard/ReportTable';
import Pagination from '../../components/common/Pagination';
import OverviewCards from '../../components/dashboard/OverviewCards';

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Tambahkan state untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchReport = async (filters) => {
    setIsLoading(true);
    setError(null);
    try {
      // Menggunakan parameter yang diterima langsung dari ReportFilter
      const response = await axios.get('http://127.0.0.1:9999/v1/report/reseller/summary/custom', {
        params: filters,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (response.data && response.data.data) {
        console.log('Data from API:', response.data.data);
        setReportData(response.data.data);
      } else {
        setError('Format data tidak sesuai');
      }
    } catch (err) {
      setError('Gagal mengambil data laporan: ' + (err.response?.data?.message || err.message));
      console.error('Error fetching report:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filters) => {
    fetchReport(filters);
  };

  // Hitung data yang akan ditampilkan di halaman sekarang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reportData.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk mengubah halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <div className="p-8">
          <Header />
          
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard Overview</h1>
            {!isLoading && !error && <OverviewCards data={reportData} />}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Laporan Reseller</h2>
              <ReportFilter onFilterChange={handleFilterChange} />
            </div>
            
            {isLoading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-4">
                {error}
              </div>
            )}
            
            {!isLoading && !error && (
              <>
                <ReportTable data={currentItems} />
                <Pagination 
                  itemsPerPage={itemsPerPage}
                  totalItems={reportData.length}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;