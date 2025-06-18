// src/hooks/useExpensesDetail.tsx
import { useState, useEffect } from 'react'

const BACKEND = import.meta.env.VITE_BACKEND_URL as string

// Tipos de los gastos que devuelve el backend
export interface ExpenseDetail {
  id: number
  date: string
  amount: number
  description: string
  category: {
    id: number
    name: string
  }
}

interface ExpenseDetailProps {
  year: number
  month: number
  categoryId: number | null
  token: string
}

export default function ExpenseDetail({
  year,
  month,
  categoryId,
  token,
}: ExpenseDetailProps) {
  const [gastos, setGastos] = useState<ExpenseDetail[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (categoryId == null) return

    setLoading(true)
    setError(null)

    fetch(
      `${BACKEND}/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || 'Error al cargar detalle')
          })
        }
        return res.json() as Promise<ExpenseDetail[]>
      })
      .then((data) => {
        setGastos(data)
      })
      .catch((err: Error) => {
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [year, month, categoryId, token])

  if (categoryId == null) return null
  if (loading) return <p>Cargando detalle…</p>
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>
  if (!gastos || gastos.length === 0) return <p>No hay gastos.</p>

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Descripción</th>
          <th style={{ textAlign: 'right' }}>Monto</th>
        </tr>
      </thead>
      <tbody>
        {gastos.map((g) => (
          <tr key={g.id}>
            <td>{g.date}</td>
            <td>{g.category.name}</td>
            <td style={{ textAlign: 'right' }}>{g.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
