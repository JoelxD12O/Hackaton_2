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
  result: {
    token: string
    username: string
  }
}

/**
 * Hook to register a new user and auto-login.
 */
export function useRegister() {
  const { login } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<AuthResponse, unknown, Credentials>({
    mutationFn: async (credentials) => {
      const response: AxiosResponse<AuthResponse> = await api.post(
        '/authentication/register',
        credentials
      )
      return response.data
    },
    onSuccess: (res) => {
      // Extract JWT from response
      login(res.result.token)
      queryClient.invalidateQueries({ queryKey: ['me'] })
    },
  })
}

/**
 * Hook to perform login and auto-login.
 */
export function useLogin() {
  const { login } = useAuth()
  const queryClient = useQueryClient()

  return useMutation<AuthResponse, unknown, Credentials>({
    mutationFn: async (credentials) => {
      const response: AxiosResponse<AuthResponse> = await api.post(
        '/authentication/login',
        credentials
      )
      return response.data
    },
    onSuccess: (res) => {
      login(res.result.token)
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
