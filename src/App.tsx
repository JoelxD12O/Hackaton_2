import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'

export default function App() {
  return (
    <Routes>
      {/* Página de inicio protegida */}
      <Route path="/" element={<HomePage />} />

      {/* Autenticación */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Redireccionar rutas desconocidas a Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}