// src/pages/HomePage.tsx
import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSummary } from '../hooks/useSummary'
import SummaryView from '../components/Summary/SummaryView'

export default function HomePage() {
  const { user } = useAuth()

  // Año y mes actuales
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1  // getMonth() va de 0 a 11

  // Llamamos al hook correctamente:
  const {
    data: summary,        // aquí vendrá Array<{ category: string; total: number }>
    isLoading,
    isError,
    error,
  } = useSummary(year, month)

  if (isLoading) return <p>Cargando resumen de gastos...</p>
  if (isError)    return <p>Error: {(error as Error).message}</p>

  return (
    <div>
      <h1>
        Bienvenido{user?.email ? `, ${user.email}` : ''}
      </h1>
      <SummaryView data={summary!} />
    </div>
  )
}
