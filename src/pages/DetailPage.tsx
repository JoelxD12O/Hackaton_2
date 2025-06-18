// src/pages/DetailPage.tsx
import { useEffect, useState } from 'react'
import ExpenseDetail from '../components/ExpenseDetail/ExpenseDetail'

interface Category {
  id: number
  name: string
}

export default function DetailPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryId, setCategoryId] = useState<number | null>(null)
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1)
  const token = localStorage.getItem('token') || ''

  // 1️⃣ Al montar, cargo las categorías disponibles
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/expenses_category`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then((data: Category[]) => setCategories(data))
      .catch(console.error)
  }, [token])

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Detalle de Gastos</h1>

      {/* Selector de Categoría */}
      <label className="block mb-4">
        Categoría:{' '}
        <select
          value={categoryId ?? ''}
          onChange={e => setCategoryId(Number(e.target.value))}
          className="border p-1 rounded"
        >
          <option value="" disabled>
            -- Elige categoría --
          </option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>

      {/* Selector de Año y Mes */}
      <div className="flex gap-4 mb-6">
        <label>
          Año:{' '}
          <select
            value={year}
            onChange={e => setYear(+e.target.value)}
            className="border p-1 rounded"
          >
            {Array.from({ length: 5 }).map((_, i) => {
              const y = new Date().getFullYear() - i
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              )
            })}
          </select>
        </label>

        <label>
          Mes:{' '}
          <select
            value={month}
            onChange={e => setMonth(+e.target.value)}
            className="border p-1 rounded"
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const m = i + 1
              return (
                <option key={m} value={m}>
                  {m}
                </option>
              )
            })}
          </select>
        </label>
      </div>

      {/* Solo muestro ExpenseDetail cuando tengo categoría */}
      {categoryId && (
        <ExpenseDetail
          year={year}
          month={month}
          categoryId={categoryId}
          token={token}
        />
      )}
    </div>
  )
}
