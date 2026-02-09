import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
  withCredentials: true, // Importante para enviar cookies (refresh token)
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Se erro for 401 e não for uma tentativa de refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/login')
    ) {
      originalRequest._retry = true;

      try {
        // Tenta renovar o token
        const { data } = await api.post('/auth/refresh');
        
        // Salva novo token e re-tenta request original
        localStorage.setItem('accessToken', data.tokens.accessToken);
        api.defaults.headers.common.Authorization = `Bearer ${data.tokens.accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // Se refresh falhar, logout
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
