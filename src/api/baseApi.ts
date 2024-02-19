import axios from 'axios';
import { toast } from 'react-toastify';
import { toastifyOptions } from '../constants/toastify';

const baseApi = axios.create({
  baseURL: 'http://localhost:4000', 
  headers: { 'Content-Type': 'application/json' }
});

// Add an interceptor to inject authorization token (if available)
baseApi.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add an interceptor to catch error and extract error message
baseApi.interceptors.response.use(null, error => {
  let firstError;
  if (Array.isArray(error.response?.data?.error?.message)) {
    firstError = error.response?.data?.error?.message[0]
  } else {
    firstError = error.response?.data?.error?.message || error.response?.data?.error || "An unexpected error occurred!"
  }      
    toast.error(firstError, toastifyOptions)
    return Promise.reject(error)
})

export default baseApi;
