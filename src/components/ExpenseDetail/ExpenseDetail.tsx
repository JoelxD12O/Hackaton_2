// src/components/ExpenseDetail/ExpenseDetail.tsx
import { useExpenseDetail, type DetailExpense } from '../../hooks/useExpenseDetail'

interface Props {
  categoryId: number
  year: number
  month: number
  token: string
}

export default function ExpenseDetail({ categoryId, year, month, token }: Props) {
  const { details, isLoading, isError } =
    useExpenseDetail(categoryId, year, month, token)

  if (isLoading) 
    return <p className="text-center py-8">Cargando detalles…</p>
  if (isError)   
    return <p className="text-center text-red-600 py-8">Error al cargar los detalles</p>
  if (details.length === 0)
    return <p className="text-center py-8 text-gray-500">
      No hay gastos para esta categoría.
    </p>

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Monto (S/.)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {details.map((item: DetailExpense) => (
            <tr key={item.id} className="hover:bg-indigo-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {new Date(item.date).toISOString().slice(0, 10)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800 text-right">
                {item.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
