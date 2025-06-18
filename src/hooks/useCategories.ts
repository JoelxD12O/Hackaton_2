// src/hooks/useCategories.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '../api/cliente'

export interface Category {
  id: number
  name: string
}

export function useCategories() {
  return useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/expenses_category')
      if (res.status !== 200) throw new Error('No se pudo cargar categorías')
      return res.data as Category[]
    }
  })
}
