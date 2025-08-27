// src/api/resellerApi.js
import api from './axiosInstance';

export const getAllResellers = () => {
  return api.get('/reseller/get');
};