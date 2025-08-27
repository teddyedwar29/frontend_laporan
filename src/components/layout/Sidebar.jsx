// src/components/layout/Sidebar.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart2, Users, FileText, MapPin, LogOut, FileDown } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import clsx from 'clsx';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <BarChart2 size={20} /> },
  ];

//   handle logout
  const handleLogout = (e) => {
     e.preventDefault(); // Mencegah link pindah halaman
    Swal.fire({
      title: 'Yakin mau keluar?',
      text: "Anda akan diarahkan kembali ke halaman login.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, keluar!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika user klik "Ya, keluar!"
        navigate('/'); // Arahkan ke halaman login
      }
    });
  }
  return (
    <aside className={`fixed top-0 left-0 h-screen z-50 bg-gradient-to-b from-[#193cb0] to-[#2952cc] text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-72' : 'w-20'}`}>
      <div className="relative h-full flex flex-col">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-4 top-8 grid z-50 place-items-center w-8 h-8 bg-white text-[#193cb0] rounded-full shadow-lg hover:bg-slate-100 transition-transform hover:scale-110"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>

        {/* Logo */}
        <div className={`flex items-center gap-3 h-24 p-6 border-b border-white/10 ${!isOpen && 'justify-center'}`}>
          <div className="flex-shrink-0 grid place-items-center w-9 h-9 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg text-lg font-bold">T</div>
          <span className={`text-xl font-bold transition-opacity duration-200 ${!isOpen && 'opacity-0 w-0'}`}>TEKMO</span>
        </div>
        
        {/* Menu */}
        <nav className="flex-1 py-6 space-y-1">
          <h3 className={clsx('px-6 mb-2 text-xs font-semibold uppercase text-white/60 transition-opacity', !isOpen && 'opacity-0')}>
            Menu Utama
          </h3>
          {menuItems.map(item => (
            // 3. GUNAKAN NavLink AGAR LEBIH CANGGIH
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                clsx(
                  'flex items-center gap-4 py-3 px-6 mx-3 rounded-lg transition-colors',
                  !isOpen && 'justify-center',
                  isActive ? 'bg-white/15 shadow-inner' : 'hover:bg-white/10'
                )
              }
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className={clsx('transition-all duration-200 overflow-hidden', !isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100')}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>


        {/* Footer Menu */}
        <div className="p-3 border-t border-white/10">
          <a href="#" onClick={handleLogout} className="flex items-center gap-4 py-3 px-6 rounded-lg hover:bg-white/10">
            <LogOut className='flex-shrink-0' size={20} />
            <span className={`transition-opacity duration-200 overflow-hidden ${!isOpen ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>Keluar</span>
          </a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;