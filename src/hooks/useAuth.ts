// src/hooks/useAuth.ts
import type { AxiosResponse } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../contexts/AuthContext'
import { api } from '../api/cliente'

export interface Credentials {
  email: string
  password: string
}

export interface TokenRes {
  access_token: string
  token_type: string
}

export interface User {
  id: number
  email: string
}

/**
 * Hook to register a new user and auto-login.
 */
export function useRegister() {
  const { login } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<TokenRes, Error, Credentials>({
    mutationFn: async (credentials) => {
      const response: AxiosResponse<TokenRes> = await api.post('/api/auth/register', credentials)
      return response.data
    },
    onSuccess: (data) => {
      login(data.access_token)
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}
export function useLogin() {
  const { login } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<TokenRes, Error, Credentials>({
    mutationFn: async (credentials) => {
      const response: AxiosResponse<TokenRes> = await api.post('/api/auth/login', credentials)
      return response.data
    },
    onSuccess: (data) => {
      login(data.access_token)
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}


/**
 * Hook to perform logout.
 */
export function useLogout() {
  const { logout } = useAuth()
  return () => logout()
}
