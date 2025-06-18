// src/hooks/useSummary.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '../api/cliente'

export interface SummaryItem {
  category: string
  total: number
}

export function useSummary(year: number, month: number) {
  return useQuery<SummaryItem[], Error>({
    queryKey: ['summary', year, month],
    queryFn: async () => {
      const res = await api.get('/expenses_summary', {
        params: { year, month }
      })
      if (res.status !== 200) throw new Error('Error al cargar el resumen')

      // Raw es el array tal como viene de la API
      const raw: any[] = res.data

      // Normalizamos cada elemento a { category: string, total: number }
      const normalized: SummaryItem[] = raw.map(item => {
        // extraemos el nombre de la categoría
        let cat: string
        if (typeof item.category === 'string') {
          cat = item.category
        } else if (item.category?.name) {
          cat = item.category.name
        } else {
          cat = 'Categoría desconocida'
        }

        // nos aseguramos de que total sea número
        const tot = typeof item.total === 'number'
          ? item.total
          : parseFloat(item.total) || 0

        return { category: cat, total: tot }
      })

      return normalized
    }
  })
}
