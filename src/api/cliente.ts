// src/api/cliente.ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://198.211.105.95:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Si hay token en localStorage al arrancar, lo ponemos en los headers por defecto
const token = localStorage.getItem('token')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
