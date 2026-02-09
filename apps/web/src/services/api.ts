import { axiosInstance as api } from '@repo/api-sdk';
import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

api.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login')
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await api.post('/auth/refresh');
        
        localStorage.setItem('accessToken', data.tokens.accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${data.tokens.accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export { api };
