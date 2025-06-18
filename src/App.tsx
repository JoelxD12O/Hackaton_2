import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import PrivateRoute from './components/PrivateRoute'
import DetailPage from './pages/DetailPage'

export default function App() {
  return (
    <Routes>
      {/* Página de inicio protegida */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />

      {/* Autenticación */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Redireccionar rutas desconocidas a Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<HomePage />} />


        <Route path="/" element={<HomePage />} />
        {/* Ahora la ruta DETAIL no lleva parámetro */}
        <Route path="/detail" element={<DetailPage />} />
      </Routes>   
  )
}
