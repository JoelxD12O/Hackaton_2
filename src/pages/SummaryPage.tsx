// src/pages/SummaryPage.tsx
import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useSummary, type SummaryItem } from "../hooks/useSummary"
import SummaryView from "../components/Summary/SummaryView"
import { YearMonthFilter } from "../components/Filters/YearMonthFilter"
import { useNavigate } from "react-router-dom"

export default function SummaryPage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // 1) estados para filtros
  const [year,  setYear]  = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)

  // 2) consulta react-query con año/mes dinámicos
  const {
    data: summary = [],
    isLoading,
    isFetching,
    isError,
    error
  } = useSummary(year, month)

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg">

        {/* Saludo */}
        <h1 className="text-2xl font-bold mb-4 text-center">
          Bienvenido{user?.email ? `, ${user.email}` : ''}
        </h1>

        {/* Filtros de año y mes */}
        <YearMonthFilter
          year={year}
          month={month}
          onYearChange={setYear}
          onMonthChange={setMonth}
        />

        {/* Loader durante la petición */}
        {(isLoading || isFetching) && (
          <p className="text-center text-gray-500">
            Cargando resumen de gastos…
          </p>
        )}

        {/* Error */}
        {isError && (
          <p className="text-center text-red-600">
            Error: {error.message}
          </p>
        )}

        {/* Vista de datos (sólo una vez que ya no esté cargando ni fetch-eando) */}
        {!isError && !(isLoading || isFetching) && (
          <SummaryView data={summary} year={year} month={month} />
        )}

        {/* Botón genérico a detalle */}
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/detail')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Ver detalle de gastos por categoría
          </button>
        </div>

      </div>
    </div>
  )
}
