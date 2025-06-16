import axios from 'axios'

/**
 * Instancia de Axios apuntando a tu backend.
 * VITE_BACKEND_URL viene de tu .env (ej: http://localhost:8000)
 */
export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Interceptor que añade el token JWT (si existe) a cada petición.
 */
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
