import React from 'react'
import type { SummaryItem } from '../../hooks/useSummary'
import { useNavigate } from 'react-router-dom'

export default function SummaryView({ data }: { data: SummaryItem[] }) {
  const navigate = useNavigate()
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-gray-500 text-lg">No hay gastos para mostrar.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Resumen de Gastos</h2>
      <ul className="divide-y divide-gray-200">
        {data.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between py-3 px-2 hover:bg-indigo-50 rounded transition cursor-pointer"
            onClick={() =>
              navigate(`/detail?categoryId=${item.categoryId}&year=${year}&month=${month}`)
            }
          >
            <span className="text-gray-700 font-medium">{item.category}</span>
            <span className="text-indigo-700 font-semibold">
              S/. {item.total.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
