// src/api/axiosClient.ts
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://localhost:7243/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Add access token to every request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Extract response data and handle errors
axiosClient.interceptors.response.use(
  (response) => {
    const apiResponse = response.data;
    if (apiResponse && apiResponse.data !== undefined) {
      return apiResponse.data;
    }
    return response;
  },
  (error) => {
    const res = error.response;

    // ✅ Auto logout on 401
    if (res?.status === 401) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
    }

    // ✅ Return validation errors if any
    if (res?.data?.errors) return Promise.reject(res.data);

    return Promise.reject(error);
  }
);

export default axiosClient;
