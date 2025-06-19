// src/components/ExpenseDetail/ExpenseDetail.tsx
import { useMemo } from 'react'
import { useExpenseDetail, type DetailExpense } from '../../hooks/useExpenseDetail'
import { ExpenseRow } from '../delete/ExpenseRow'

interface Props {
  categoryId: number
  year: number
  month: number
  token: string
}

export default function ExpenseDetail({ categoryId, year, month, token }: Props) {
  // obtenemos detalles y refetch
  const { details, isLoading, isError, refetch } =
    useExpenseDetail(categoryId, year, month, token)

  // ordenamos las fechas de manera ascendente
  const sortedDetails = useMemo(() => {
    return [...details].sort((a, b) => {
      const da = new Date(a.date).getTime()
      const db = new Date(b.date).getTime()
      return da - db
    })
  }, [details])

  if (isLoading)
    return <p className="text-center py-8">Cargando detalles…</p>
  if (isError)
    return <p className="text-center text-red-600 py-8">Error al cargar los detalles</p>
  if (sortedDetails.length === 0)
    return <p className="text-center py-8 text-gray-500">No hay gastos para esta categoría.</p>

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
        <thead className="bg-gray-50 border-b border-gray-300">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Monto (S/.)
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Eliminar
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {sortedDetails.map((item: DetailExpense) => (
            <ExpenseRow
              key={item.id}
              entry={{
                id: item.id,
                year,
                month,
                expenseCategory: { id: categoryId, name: '' },
                date: item.date.slice(0, 10),
                amount: item.amount,
              }}
              onDelete={() => refetch()}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
