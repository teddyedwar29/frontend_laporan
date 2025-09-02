// src/pages/admin/HierarchyPage.jsx

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import Pagination from '../../components/common/Pagination';
import { getHierarchyReport } from '../../api/reportApi';

// Komponen untuk loading spinner
const Loader = () => (
  <div className="text-center py-10">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    <p className="mt-4 text-gray-600">Memuat data hirarki...</p>
  </div>
);

// Komponen untuk pesan error
const ErrorMessage = ({ message }) => (
  <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center m-4">
    {message}
  </div>
);

// --- PERUBAHAN UTAMA DIMULAI DARI SINI ---
// Baris untuk Upline dalam tabel utama, sekarang dengan paginasi downline
const UplineRow = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { upline, downlines } = item;

  // State untuk paginasi downline
  const [downlineCurrentPage, setDownlineCurrentPage] = useState(1);
  const downlinesPerPage = 2; // Tampilkan 5 downline per halaman

  // Logika untuk menghitung downline yang akan ditampilkan
  const indexOfLastDownline = downlineCurrentPage * downlinesPerPage;
  const indexOfFirstDownline = indexOfLastDownline - downlinesPerPage;
  const currentDownlines = downlines.slice(indexOfFirstDownline, indexOfLastDownline);

  // Handler untuk mengubah halaman downline
  const handleDownlinePageChange = (pageNumber) => {
    setDownlineCurrentPage(pageNumber);
  };
  
  // Pengaman jika data tidak sesuai format
  if (!upline) {
    return null;
  }

  return (
    <>
      {/* Upline Row */}
      <tr className="bg-white hover:bg-gray-50 border-b">
        <td className="px-6 py-4 whitespace-nowrap">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center text-left w-full">
            {isOpen ? <ChevronDown size={16} className="mr-3 flex-shrink-0" /> : <ChevronRight size={16} className="mr-3 flex-shrink-0" />}
            <div>
              <div className="font-medium text-gray-900">{upline.nama}</div>
              <div className="text-sm text-gray-500">{upline.kode}</div>
            </div>
          </button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center">
          {downlines.length}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-green-600 font-medium">
          Rp {upline.total_profit.toLocaleString('id-ID')}
        </td>
      </tr>
      {/* Downlines Sub-table */}
      {isOpen && (
        <tr>
          <td colSpan="3" className="p-0 bg-slate-50">
            <div className="m-4 p-4 bg-white border border-gray-300 rounded-lg shadow-inner">
              <table className="min-w-full">
                <thead className="bg-gray-200">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Downline</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Transaksi</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Profit</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentDownlines.length > 0 ? currentDownlines.map(downline => (
                    <tr key={downline.kode}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-800">{downline.nama}</div>
                        <div className="text-sm text-gray-500">{downline.kode}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{downline.jumlah_transaksi}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-600">Rp {downline.total_profit.toLocaleString('id-ID')}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-gray-500">Tidak ada data downline.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Tambahkan Paginasi jika downline lebih banyak dari `downlinesPerPage` */}
              {downlines.length > downlinesPerPage && (
                <Pagination
                  itemsPerPage={downlinesPerPage}
                  totalItems={downlines.length}
                  currentPage={downlineCurrentPage}
                  onPageChange={handleDownlinePageChange}
                />
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};
// --- AKHIR DARI PERUBAHAN UTAMA ---


const HierarchyPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [hierarchyData, setHierarchyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchHierarchy = async (page) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getHierarchyReport({ page, limit: itemsPerPage });
        if (response.data && response.data.data) {
          setHierarchyData(response.data.data);
          setTotalItems(response.data.total);
          setItemsPerPage(response.data.limit);
          setCurrentPage(response.data.page);
        } else {
          setHierarchyData([]);
          setError('Format data tidak sesuai dari API.');
        }
      } catch (err) {
        setHierarchyData([]);
        setError('Gagal mengambil data hirarki: ' + (err.response?.data?.message || err.message));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHierarchy(currentPage);
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const renderContent = () => {
    if (isLoading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;
    
    if (hierarchyData.length === 0) {
      return (
        <div className="text-center py-10 text-gray-500">
          Tidak ada data hirarki untuk ditampilkan.
        </div>
      );
    }
    
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Upline</th>
              <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Downline</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Profit</th>
            </tr>
          </thead>
          <tbody>
            {hierarchyData.map((item, index) => (
              <UplineRow key={`${item.upline?.kode}-${index}`} item={item} />
            ))}
          </tbody>
        </table>
        {totalItems > itemsPerPage && (
          <Pagination 
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    );
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <div className="p-8">
          <Header />
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Laporan Hirarki Upline & Downline</h1>
            <p className="text-gray-600 mt-1">Lihat struktur jaringan reseller Anda dalam format tabel.</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HierarchyPage;