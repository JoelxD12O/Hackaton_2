// src/pages/DetailPage.tsx
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import ExpenseDetail from '../components/ExpenseDetail/ExpenseDetail'

export default function DetailPage() {
  const { token } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  // Extraemos los params que vienen de SummaryView
  const categoryId = Number(searchParams.get('categoryId'))
  const year       = Number(searchParams.get('year'))
  const month      = Number(searchParams.get('month'))

   return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Botón de regreso */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        ← Volver al resumen
      </button>

      <h1 className="text-3xl font-semibold mb-6 text-center">Detalle de Gastos</h1>

      {!categoryId || !year || !month ? (
        <p className="text-red-600 text-center">Parámetros inválidos en la URL.</p>
      ) : (
        <ExpenseDetail
          categoryId={categoryId}
          year={year}
          month={month}
          token={token ?? ''}
        />
      )}
    </div>
  )
}