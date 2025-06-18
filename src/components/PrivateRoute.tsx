// src/components/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PrivateRoute() {
  const { token } = useAuth()

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Si sí hay, renderiza la <Outlet/> que serán las rutas hijas
  return <Outlet />
}
