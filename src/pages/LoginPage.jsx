// src/pages/LoginPage.jsx
import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email dan Password tidak boleh kosong!');
      return;
    }
    
    setIsLoading(true);
    setError('');

    // --- SIMULASI PANGGIL API ---
    // Di aplikasi beneran, di sini lo bakal panggil API backend
    // pake fetch atau axios.
    setTimeout(() => {
      if (email === 'admin@gmail.com' && password === '123') {
        Swal.fire({
          icon: 'success',
          title: 'Login Berhasil!',
          text: 'Selamat datang kembali, Admin!',
          timer: 2000, // Alert otomatis tertutup setelah 2 detik
          showConfirmButton: false,
          allowOutsideClick: false, // Mencegah user klik di luar box
        }).then(() => {
          // Arahkan ke dashboard SETELAH alert tertutup
          navigate('/dashboard'); 
        });
      } else {
        setError('Email atau Password salah!');
        setIsLoading(false);
      }

    }, 2000); // Simulasi delay 2 detik
    // ----------------------------
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        
        {/* Header & Logo */}
        <div className="text-center">
          <div className="flex justify-center mx-auto mb-4">
            <div className="flex-shrink-0 grid place-items-center w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl text-3xl font-bold text-white">
              T
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">Selamat Datang Kembali!</h1>
          <p className="mt-2 text-slate-500">Silakan login untuk melanjutkan ke dashboard.</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Email */}
          <div className="relative">
            <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-slate-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 pl-10 pr-10 text-slate-700 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Opsi Tambahan */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              Ingat saya
            </label>
            <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">
              Lupa Password?
            </a>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 text-sm text-center text-red-800 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          {/* Tombol Login */}
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