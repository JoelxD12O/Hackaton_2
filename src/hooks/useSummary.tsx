// src/hooks/useSummary.tsx
import { useMemo } from 'react'
import { useExpensesContext} from '../contexts/ExpensesContext'

export interface SummaryItem {
  categoryId: number
  category: string
  total: number
}

export function useSummary(year: number, month: number) {
  const { entries, isLoading, isError } = useExpensesContext()

  const data = useMemo<SummaryItem[]>(() => {
    // Filtramos sólo las entradas que coinciden con year/month
    const map = new Map<number, { name: string; total: number }>()
    entries
      .filter(e => e.year === year && e.month === month)
      .forEach(item => {
        const id   = item.expenseCategory.id
        const name = item.expenseCategory.name
        const cur  = map.get(id) ?? { name, total: 0 }
        cur.total += item.amount
        map.set(id, cur)
      })
    // Construimos el arreglo final
    return Array.from(map, ([categoryId, { name, total }]) => ({
      categoryId,
      category: name,
      total,
    }))
  }, [entries, year, month])

  return { data, isLoading, isError }
}