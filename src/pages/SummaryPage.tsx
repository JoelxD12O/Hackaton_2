// src/pages/SummaryPage.tsx
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLogout } from '../hooks/useAuth'
import { useSummary } from '../hooks/useSummary'
import SummaryView from '../components/Summary/SummaryView'
import { YearMonthFilter } from '../components/Filters/YearMonthFilter'

export default function SummaryPage() {
  const { user } = useAuth()
  const logout = useLogout()

  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  const { data: summary = [], isLoading, isError } = useSummary(year, month)

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg">

        {/* Header con saludo y botón de logout */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Bienvenido{user?.email ? `, ${user.email}` : ''}
          </h1>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Filtros de año y mes */}
        <YearMonthFilter
          year={year}
          month={month}
          onYearChange={setYear}
          onMonthChange={setMonth}
        />

        {/* Loader */}
        {isLoading && (
          <p className="text-center text-gray-500">
            Cargando resumen de gastos…
          </p>
        )}

        {/* Error */}
        {isError && (
          <p className="text-center text-red-600">
            Error cargando datos
          </p>
        )}

        {/* Vista de datos */}
        {!isLoading && !isError && (
          <SummaryView data={summary} year={year} month={month} />
        )}

      </div>
    </div>
  )
}
