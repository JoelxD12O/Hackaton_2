import { useQuery } from '@tanstack/react-query'
import { api } from '../api/cliente'

export interface RawExpense {
  id: number
  expenseCategory: { id: number; name: string }
  year: number
  month: number
  amount: number
}

export interface SummaryItem {
  category: string
  total: number
}

/**
 * Devuelve un array de { category, total } 
 * agrupado por categoría para el mes/año dados.
 */
export function useSummary(year: number, month: number) {
  return useQuery<SummaryItem[], Error>({
    queryKey: ['summary', year, month],
    queryFn: async () => {
      // 1) Traemos todos los gastos del mes/año
      const res = await api.get<RawExpense[]>('/expenses_summary', {
        params: { year, month }
      })
      if (!res.data) throw new Error('No llegaron datos de gastos')

      const raw = res.data

      // 2) Agrupamos por nombre de categoría
      const map = new Map<string, number>()
      for (const item of raw) {
        const name = item.expenseCategory?.name ?? 'Sin categoría'
        map.set(name, (map.get(name) || 0) + item.amount)
      }

      // 3) Convertimos el Map a array de SummaryItem
      return Array.from(map, ([category, total]) => ({ category, total }))
    }
  })
}
