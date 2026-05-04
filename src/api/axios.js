// src/api/axios.js (Ya jahan bhi aapka axios base config hai)
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-blog-app-nine.vercel.app', // Apna current backend URL check karein
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
