
import { useAuth } from "../contexts/AuthContext";
import { useSummary } from "../hooks/useSummary";
import SummaryView from "../components/Summary/SummaryView";
import { useNavigate } from "react-router-dom";
import React from 'react'

export default function HomePage() {
  const { user } = useAuth()
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  const navigate = useNavigate();
  const { summary, loading } = useSummary(user!);


  const {
    data: summary = [],
    isLoading,
    isError,
    error
  } = useSummary(year, month)

  if (isLoading) return <p>Cargando resumen de gastos...</p>
  if (isError)   return <p>Error: {error.message}</p>

  return (
    <div>
      <h1>Bienvenido{user?.email ? `, ${user.email}` : ''}</h1>
      <SummaryView data={summary} />
      <div className="mt-6">
        <button
          onClick={() => navigate('/detail')}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Ver detalle de gastos por categoría
        </button>
      </div>
    </div>
  )
}
