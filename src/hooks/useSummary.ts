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
  categoryId: number
  category: string
  total: number
}

export function useSummary(year: number, month: number) {
  return useQuery<SummaryItem[], Error>({
    queryKey: ['summary', year, month],
    queryFn: async () => {
      const res = await api.get<RawExpense[]>('/expenses_summary', {
        params: { year, month }
      })
      if (!res.data) throw new Error('No llegaron datos de gastos')

      const raw = res.data

      const map = new Map<number, { name: string; total: number }>()
      for (const item of raw) {
        const id = item.expenseCategory?.id ?? 0
        const name = item.expenseCategory?.name ?? 'Sin categoría'
        const current = map.get(id) || { name, total: 0 }
        current.total += item.amount
        map.set(id, current)
      }

      return Array.from(map, ([categoryId, { name, total }]) => ({
        categoryId,
        category: name,
        total
      }))
    }
  })
}