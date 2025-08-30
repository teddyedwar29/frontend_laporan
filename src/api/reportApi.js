// src/api/reportApi.js
import api from './axiosInstance';

/**
 * Mengambil data laporan berdasarkan rentang tanggal.
 * @param {object} params - Contoh: { start_date: '2024-08-01', end_date: '2024-08-28' }
 */
export const getReports = (params) => {
  return api.get('/report/', { params });
};

/**
 * Mengambil data perbandingan laporan antar dua bulan.
 * @param {object} params - Contoh: { month1: 3, year1: 2024, month2: 6, year2: 2024 }
 */
export const compareReports = (params) => {
  return api.get('/report/compare', { params });
};