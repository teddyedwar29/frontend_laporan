// src/api/authApi.js
import api from './axiosInstance';

/**
 * Mengirim kredensial login ke backend.
 * @param {object} credentials - Data untuk login, contoh: { kode: 'MR001', pin: '123456' }
 */
export const loginUser = (credentials) => {
  return api.post('/auth/login', credentials);
};