import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSummary } from '../hooks/useSummary'
import SummaryView from '../components/Summary/SummaryView'

export default function HomePage() {
  const { user } = useAuth()
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1

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
    </div>
  )
}
