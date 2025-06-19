// src/components/Summary/SummaryView.tsx
import { useNavigate } from 'react-router-dom'
import type { SummaryItem } from '../../hooks/useSummary'

interface SummaryViewProps {
  data: SummaryItem[]
  year: number
  month: number
}

export default function SummaryView({
  data, year, month
}: SummaryViewProps) {
  const navigate = useNavigate()
  const totalMonth = data.reduce((sum, item) => sum + item.total, 0)

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-500">No hay gastos para mostrar.</p>
      </div>
    )
  }

  return (
    <div>
      <p className="text-right text-xl font-bold text-gray-800 mb-4">
        Total gastado: S/. {totalMonth.toFixed(2)}
      </p>
      <ul className="divide-y divide-gray-200">
        {data.map(item => (
          <li
            key={item.categoryId}
            className="flex justify-between py-3 px-2 hover:bg-indigo-50 rounded cursor-pointer transition"
            onClick={() =>
              navigate(`/detail?categoryId=${item.categoryId}&year=${year}&month=${month}`)
            }
          >
            <span className="font-medium">{item.category}</span>
            <span className="font-semibold">
              S/. {item.total.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
