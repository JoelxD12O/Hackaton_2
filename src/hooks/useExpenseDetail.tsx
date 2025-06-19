// src/hooks/useExpenseDetail.tsx
import { useEffect, useState, useCallback } from 'react'

export interface DetailExpense {
  id: number
  date: string
  amount: number
}

/**
 * Custom hook para obtener el detalle de gastos por categoría/año/mes.
 * Extrae la lógica de fetch y estados (loading/error) y expone refetch.
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

  const loadDetails = useCallback(async () => {
    if (!token) {
      setDetails([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      if (!res.ok) throw new Error('Error al cargar detalle')
      const data: DetailExpense[] = await res.json()
      setDetails(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [categoryId, year, month, token])

  // Carga inicial y recarga cuando cambian parámetros
  useEffect(() => {
    loadDetails()
  }, [loadDetails])

  return { details, isLoading, isError, refetch: loadDetails }
}
