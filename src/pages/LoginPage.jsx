// src/pages/LoginPage.jsx
import { useState } from 'react';
import { User, Lock, Eye, EyeOff, LoaderCircle } from 'lucide-react'; // Ganti Mail dengan User
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loginUser } from '../api/authApi';
import axios from 'axios';

const LoginPage = () => {
  // 1. SESUAIKAN STATE
  const [kode, setKode] = useState('');
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kode || !pin) {
      setError('Kode dan PIN tidak boleh kosong!');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      console.log('Sending credentials:', { kode, pin });
      const response = await axios.post('http://127.0.0.1:9999/v1/auth/login', {
        kode: kode,
        pin: pin
      });
      console.log('Direct axios response:', response);

      // Periksa struktur response yang benar
      if (response.data.token) {
        // Jika token ada di response.data langsung
        localStorage.setItem('authToken', response.data.token);
      } else if (response.data.data && response.data.data.token) {
        // Jika token ada di dalam response.data.data
        localStorage.setItem('authToken', response.data.data.token);
      } else {
        throw new Error('Token tidak ditemukan dalam response');
      }

      await Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: 'Anda akan diarahkan ke dashboard.',
        timer: 1500,
        showConfirmButton: false,
        allowOutsideClick: false,
      });
      
      navigate('/dashboard');

    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || "Terjadi kesalahan pada server.";
      setError(errorMessage);
      console.log('Error details:', {
        status: err.response?.status,
        data: err.response?.data
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        
        <div className="text-center">
          {/* ... Header & Logo (tetap sama) ... */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 3. UBAH INPUT EMAIL MENJADI KODE */}
          <div className="relative">
            <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Kode User / ID"
              value={kode}
              onChange={(e) => setKode(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-slate-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* 4. UBAH INPUT PASSWORD MENJADI PIN */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPin ? 'text' : 'password'}
              placeholder="PIN"
              maxLength="6" // Tambahkan maxLength jika PIN selalu 6 digit
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full py-3 pl-10 pr-10 text-slate-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPin ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          {/* ... Opsi Tambahan, Error, Tombol Login (tetap sama) ... */}

          {error && (
            <div className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 text-white font-semibold bg-gradient-to-br from-[#193cb0] to-[#2952cc] rounded-lg hover:opacity-90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <LoaderCircle size={20} className="animate-spin" />
                  Memproses...
                </>
              ) : (
                'Login'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;