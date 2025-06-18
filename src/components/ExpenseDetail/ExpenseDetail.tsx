import { useEffect, useState } from 'react'
const BACKEND = import.meta.env.VITE_BACKEND_URL as string

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
  categoryId: number
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
    if (!categoryId) return

    setLoading(true)
    setError(null)

    fetch(
      `${BACKEND}/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar detalle')
        return res.json() as Promise<ExpenseDetail[]>
      })
      .then(data => setGastos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [year, month, categoryId, token])

  if (loading) return <p>Cargando detalle…</p>
  if (error) return <p className="text-red-600">Error: {error}</p>
  if (!gastos || gastos.length === 0) return <p>No hay gastos.</p>

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Fecha</th>
          <th className="border p-2">Descripción</th>
          <th className="border p-2 text-right">Monto</th>
        </tr>
      </thead>
      <tbody>
        {gastos.map(g => (
          <tr key={g.id}>
            <td className="border p-2">{g.date}</td>
            <td className="border p-2">{g.description}</td>
            <td className="border p-2 text-right">{g.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
