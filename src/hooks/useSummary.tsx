import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { api } from '../api/cliente'

// Tipos
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

// Hook de consulta
export function useSummary(year: number, month: number) {
  return useQuery<
    SummaryItem[],
    Error,
    SummaryItem[],
    ['summary', number, number]
  >({
    queryKey: ['summary', year, month],
queryFn: async () => {
  console.log(`⚙️ fetchSummary called with year=${year} month=${month}`)
  const res = await api.get<RawExpense[]>('/expenses_summary', {
    params: { year, month }
  })
  console.log('⚙️ raw API response:', res.data)

  // **1) Filtrar solo los gastos del año y mes seleccionados**
  const filtered = res.data.filter(
    e => e.year === year && e.month === month
  )
  console.log('⚙️ filtered raw:', filtered)

  if (!filtered.length) {
    // Si no hay gastos para ese mes/año:
    return []
  }

  // 2) Agregar por categoría
  const map = new Map<number, { name: string; total: number }>()
  for (const item of filtered) {
    const id   = item.expenseCategory?.id   ?? 0
    const name = item.expenseCategory?.name ?? 'Sin categoría'
    const cur  = map.get(id) || { name, total: 0 }
    cur.total += item.amount
    map.set(id, cur)
  }

  const result = Array.from(map, ([categoryId, { name, total }]) => ({
    categoryId,
    category: name,
    total,
  }))
  console.log('⚙️ summary computed:', result)
  return result
},

    // Opciones de UX al cambiar filtros:
    initialData: [],
    keepPreviousData: true,
    staleTime: 0,
  } as UseQueryOptions<SummaryItem[], Error, SummaryItem[], ['summary', number, number]>)
}