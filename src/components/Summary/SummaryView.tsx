import React from 'react'
import type { SummaryItem } from '../../hooks/useSummary'

export default function SummaryView({ data }: { data: SummaryItem[] }) {
  if (!data || data.length === 0) {
    return <p>No hay gastos para mostrar.</p>
  }

  return (
    <div>
      <h2>Resumen de Gastos</h2>
      <ul>
        {data.map((item, idx) => (
          <li key={idx}>
            {item.category}: S/. {item.total.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  )
}
