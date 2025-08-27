// src/api/axiosInstance.js

import axios from 'axios';
import Swal from 'sweetalert2';

// 1. Buat instance dengan konfigurasi dasar
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ambil URL dasar dari file .env
});

// 2. Interceptor untuk Request (Menyisipkan Token Otomatis)
// Kode ini akan jalan SETIAP KALI ada request yang DIKIRIM
axiosInstance.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem('authToken');
    
    // Jika token ada, tambahkan ke header Authorization
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    // Lakukan sesuatu jika ada error saat request
    return Promise.reject(error);
  }
);

// 3. Interceptor untuk Response (Menangani Error Terpusat)
// Kode ini akan jalan SETIAP KALI ada response yang DITERIMA
axiosInstance.interceptors.response.use(
  (response) => {
    // Jika response sukses (status 2xx), langsung kembalikan response-nya
    return response;
  },
  (error) => {
    // Tangani error di sini, biar gak perlu nulis try-catch di semua komponen
    
    // Contoh: Kalo error 401 (Unauthorized), artinya token gak valid atau expired
    if (error.response && error.response.status === 401) {
      // Hapus token yang salah
      localStorage.removeItem('authToken');
      
      // Tampilkan notifikasi ke user
      Swal.fire({
        icon: 'error',
        title: 'Sesi Anda Habis',
        text: 'Silakan login kembali untuk melanjutkan.',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      }).then(() => {
        // Arahkan user ke halaman login setelah notifikasi hilang
        // window.location.href = '/'; // Ini akan me-reload halaman
        
        // Cara yang lebih "React": gunakan event custom jika perlu state management lebih kompleks
        // Untuk sekarang, reload adalah cara paling simpel dan efektif
        window.location.assign('/');

      });
    }
    
    // Kembalikan error agar bisa ditangani juga di komponen jika perlu
    return Promise.reject(error);
  }
);

export default axiosInstance;