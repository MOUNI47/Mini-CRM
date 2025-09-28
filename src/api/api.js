
import axios from 'axios';
// Default base - change to your machine IP if testing on physical device
const API_BASE = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 5000,
});

export default api;
