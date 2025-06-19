// src/hooks/useSummary.tsx
import { useMemo } from 'react'
import { useExpensesContext } from '../contexts/ExpensesContext'


export interface SummaryItem {
  categoryId: number
  category: string
  total: number
}

export function useSummary(year: number, month: number) {
  // Ahora extraemos también `refetch` para poder recargar desde el hook
  const { entries, isLoading, isError, refetch } = useExpensesContext()

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

  // Devolvemos también `refetch` para que quien use este hook pueda
  // volver a cargar los datos después de agregar un gasto
  return { data, isLoading, isError, refetch }
}
