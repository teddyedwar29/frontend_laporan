// src/pages/admin/DashboardPage.jsx
import { useState } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import Header from '../../components/layout/Header';
import StatCard from '../../components/dashboard/StatCard';
import SalesTable from '../../components/dashboard/SalesTable';
import { statsData } from '../../data/mockData';

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <main className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-72' : 'ml-20'}`}>
        <div className="p-8">
          <Header />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                icon={stat.icon}
                color={stat.color}
              />
            ))}
          </div>

          <SalesTable />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;