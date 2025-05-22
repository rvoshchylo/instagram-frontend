import axios from 'axios';

const token = localStorage.getItem('fb_token');

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('fb_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
