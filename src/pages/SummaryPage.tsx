// src/pages/SummaryPage.tsx
import { useState, useEffect  } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLogout } from '../hooks/useAuth'
import { useSummary } from '../hooks/useSummary'
import SummaryView from '../components/Summary/SummaryView'
import { YearMonthFilter } from '../components/Filters/YearMonthFilter'
import { AddExpenseModal } from '../components/Modal/AddExpenseModal' 


export default function SummaryPage() {
  const { user } = useAuth()
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

  // opcional: cada vez que cambien year/month recarga automáticamente
  useEffect(() => {
  }, [year, month, refetch])
  
    return (
    <div className="p-6 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-lg">
        {/* Header */}
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

        {/* Filtros */}
        <YearMonthFilter
          year={year}
          month={month}
          onYearChange={setYear}
          onMonthChange={setMonth}
        />

        {/* Botón para abrir modal */}
        <div className="text-right my-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Agregar gasto
          </button>
        </div>

        {/* Contenido */}
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

        {/* Modal */}
        <AddExpenseModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSaved={() => {
            refetch() // recarga el resumen después de agregar un gasto
            setShowModal(false) // cierra el modal
          }}
        />
      </div>
    </div>
  )
}