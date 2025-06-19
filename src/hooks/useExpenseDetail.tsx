// src/hooks/useExpenseDetail.tsx
import { useEffect, useState } from 'react'

export interface DetailExpense {
  id: number
  date: string
  amount: number
}

/**
 * Custom hook para obtener el detalle de gastos por categoría/año/mes.
 * Extrae la lógica de fetch y estados (loading/error).
 */
export function useExpenseDetail(
  categoryId: number,
  year: number,
  month: number,
  token: string
) {
  const [details, setDetails] = useState<DetailExpense[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  useEffect(() => {
    if (!token) {
      setDetails([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(res => {
        if (!res.ok) throw new Error('Error al cargar detalle')
        return res.json()
      })
      .then((data: DetailExpense[]) => setDetails(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [categoryId, year, month, token])

  return { details, isLoading, isError }
}
