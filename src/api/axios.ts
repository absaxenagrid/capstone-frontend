import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mock-api-pido.onrender.com/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
