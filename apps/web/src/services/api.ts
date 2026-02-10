import axios from 'axios';

let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
  withCredentials: true, // Importante para enviar cookies (refresh token)
});

api.interceptors.request.use((config) => {
  // Proteção CSRF: O backend exige este cabeçalho para validar a origem
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
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
        setAccessToken(data.tokens.accessToken);
        
        originalRequest.headers.Authorization = `Bearer ${data.tokens.accessToken}`;
        
        return api(originalRequest);
      } catch (refreshError) {
        // Se refresh falhar, logout
        setAccessToken(null);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
