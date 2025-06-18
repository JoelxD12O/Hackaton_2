// src/api/cliente.ts
import axios from 'axios'

// Lee la URL del .env (Vite expone las VITE_* en import.meta.env)
const BASE_URL = import.meta.env.VITE_BACKEND_URL as string

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor para inyectar el token en cada petición
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
