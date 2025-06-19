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
      <div className="bg-amber-15 rounded-2xl shadow-2xl/100 p-8 w-full max-w-2xl space-y-6 mt-16">
      {/* Botón de regreso */}
      <button
        onClick={() => navigate(-1)}
            className="px-5 py-2 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
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