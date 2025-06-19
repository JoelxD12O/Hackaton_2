// src/pages/SummaryPage.tsx
import { useState, useEffect } from 'react'
import { useLogout } from '../hooks/useAuth'
import { useSummary } from '../hooks/useSummary'
import SummaryView from '../components/Summary/SummaryView'
import { YearMonthFilter } from '../components/Filters/YearMonthFilter'
import { AddExpenseModal } from '../components/Modal/AddExpenseModal'

export default function SummaryPage() {
  const logout = useLogout()

  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [showModal, setShowModal] = useState(false)

  const {
    data: summary = [],
    isLoading,
    isError,
    refetch,
  } = useSummary(year, month)

  useEffect(() => {
    // Aquí se podría recargar automáticamente al cambiar año/mes
  }, [year, month, refetch])

  return (
    <div className="min-h-screen bg-gray-100 relative p-4 flex justify-center items-start">
      {/* Botón Cerrar sesión en la esquina superior derecha */}
      <div className="absolute top-4 right-6">
        <button
          onClick={logout}
            className="px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Contenedor central */}
      <div className="bg-amber-15 rounded-2xl shadow-2xl/100 p-8 w-full max-w-2xl space-y-6 mt-16">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800 text-center">Bienvenido, Ahorrador</h1>

        {/* Filtros */}
        <div className="flex justify-center">
          <YearMonthFilter
            year={year}
            month={month}
            onYearChange={setYear}
            onMonthChange={setMonth}
          />
        </div>

        {/* Botón Agregar gasto */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            + Agregar gasto
          </button>
        </div>

        {/* Contenido */}
        <div className="min-h-[100px]">
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

        {/* Modal */}
        <AddExpenseModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSaved={() => {
            refetch()
            setShowModal(false)
          }}
        />
      </div>
    </div>
  )
}