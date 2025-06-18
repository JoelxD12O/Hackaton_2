// src/hooks/useAuth.ts
import type { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../api/cliente'

export interface Credentials {
  email: string
  passwd: string
}

export interface AuthResponse {
  status: number
  message: string
  data?:    { token: string; email: string }
  result?:  { token: string; username?: string }
}

// 1) Hook para registro
export function useRegister() {
  const { login } = useAuth()
  const qc = useQueryClient()

  return useMutation<AxiosResponse<AuthResponse>, Error, Credentials>({
    mutationFn: creds => api.post<AuthResponse>('/authentication/register', creds),
    onSuccess: (res) => {
      const payload = res.data.data ?? res.data.result
      if (!payload?.token) {
        throw new Error('No se encontró token tras el registro')
      }
      login(payload.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
      qc.invalidateQueries({ queryKey: ['me'] })
    }
  })
}

// 2) Hook para login
export function useLogin() {
  const { login } = useAuth()
  const qc = useQueryClient()

  return useMutation<AxiosResponse<AuthResponse>, Error, Credentials>({
    mutationFn: creds => api.post<AuthResponse>('/authentication/login', creds),
    onSuccess: (res) => {
      const payload = res.data.data ?? res.data.result
      if (!payload?.token) {
        throw new Error('No se encontró token tras el login')
      }
      login(payload.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${payload.token}`
      qc.invalidateQueries({ queryKey: ['me'] })
    }
  })
}

// 3) Hook para logout
export function useLogout() {
  const { logout } = useAuth()
  const qc = useQueryClient()

  return () => {
    logout()
    delete api.defaults.headers.common['Authorization']
    qc.invalidateQueries({ queryKey: ['me'] })
  }
}
