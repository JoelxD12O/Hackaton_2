// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage   from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import SummaryPage from './pages/SummaryPage'
import DetailPage  from './pages/DetailPage'
import PrivateRoute from './components/PrivateRoute'

export function App() {
  return (
    <Routes>
      {/* 1. Ruta pública */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />


      {/* 2. Rutas protegidas: todo lo que vaya dentro de este Route usará PrivateRoute */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<SummaryPage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Route>

      {/* 3. Cualquier otra ruta */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
