// src/pages/SummaryPage.tsx
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useSummary } from '../hooks/useSummary'
import SummaryView from '../components/Summary/SummaryView'
import { YearMonthFilter } from '../components/Filters/YearMonthFilter'

export default function SummaryPage() {
  const { user } = useAuth()
  const [year,  setYear]  = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  const { data: summary = [], isLoading, isError } = useSummary(year, month)

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Bienvenido{user?.email ? `, ${user.email}` : ''}
        </h1>

        <YearMonthFilter
          year={year}
          month={month}
          onYearChange={setYear}
          onMonthChange={setMonth}
        />

        {isLoading && (
          <p className="text-center text-gray-500">
            Cargando resumen de gastos…
          </p>
        )}

        {isError && (
          <p className="text-center text-red-600">
            Error cargando datos
          </p>
        )}

        {!isLoading && !isError && (
          <SummaryView data={summary} year={year} month={month} />
        )}

      </div>
    </div>
  )
}
