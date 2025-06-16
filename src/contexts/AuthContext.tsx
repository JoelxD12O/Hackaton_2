// src/contexts/AuthContext.tsx
import React, { createContext, useContext, type ReactNode, useState, useCallback } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

type JwtPayload = { id: number; email: string; exp?: number }

interface AuthContextType {
  token: string | null
  user: JwtPayload | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
  const [user, setUser] = useState<JwtPayload | null>(() => {
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token)
      } catch {
        return null
      }
    }
    return null
  })

  const login = useCallback((newToken: string) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    const decoded = jwtDecode<JwtPayload>(newToken)
    setUser(decoded)
    navigate('/anime', { replace: true })
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    navigate('/login', { replace: true })
  }, [navigate])

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
