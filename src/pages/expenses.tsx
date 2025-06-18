import React, { useEffect, useState } from 'react'
import { api } from '../api/cliente'
import axios, { AxiosError } from 'axios'
import { useLocation } from 'react-router-dom'

interface Category {
  id: number
  name: string
}

interface ExpenseItem {
  id: number
  expenseCategory?: Category   // lo que viene al leer
  category?: Category          // lo que enviamos al crear
  year: number
  month: number
  amount: number
}


export default function Expenses() {
  const location = useLocation()
  const initialCategoryId = location.state?.categoryId || 0
  const initialCategoryName = location.state?.categoryName || ''

  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState(initialCategoryId)
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [amount, setAmount] = useState(0)
  const [expenses, setExpenses] = useState<ExpenseItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [refreshFlag, setRefreshFlag] = useState(false)

  const [year, month] = date.split('-').map(Number)

  useEffect(() => {
    api.get<Category[]>('/expenses_category')
      .then(res => setCategories(res.data))
      .catch((err: AxiosError) => {
        console.error('Error cargando categorías:', err)
        setError('No se pudieron cargar las categorías.')
      })
  }, [])

  useEffect(() => {
    if (selectedCategory === 0) {
      setExpenses([])
      return
    }

    setLoading(true)
    setError(null)

    api.get<ExpenseItem[]>('/expenses/detail', {
      params: { year, month, categoryId: selectedCategory }
    })
      .then(res => setExpenses(res.data))
      .catch((err: AxiosError) => {
        console.error('Error cargando gastos:', err)
        setError('No se pudieron cargar los gastos.')
      })
      .finally(() => setLoading(false))
  }, [selectedCategory, year, month, refreshFlag])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCategory === 0) {
      alert('Selecciona una categoría antes de agregar un gasto.')
      return
    }

    try {
      const payload = {
        category: { id: selectedCategory },
        amount,
        year,
        month
      }
      await api.post('/expenses', payload)
      setAmount(0)
      setRefreshFlag(prev => !prev)
    } catch (err: any) {
      const resp = err.response?.data
      console.group('Errores de validación en POST /expenses')
      if (resp?.errors?.length) {
        resp.errors.forEach((e: any) =>
          console.error(`Campo "${e.field}": ${e.defaultMessage}`)
        )
        const first = resp.errors[0]
        alert(`Error en ${first.field}: ${first.defaultMessage}`)
      } else {
        console.error('Error registrando gasto:', resp || err)
        alert(resp?.message || 'Error al registrar el gasto')
      }
      console.groupEnd()
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/expenses/${id}`)
      setExpenses(es => es.filter(e => e.id !== id))
    } catch (err) {
      console.error('Error eliminando gasto:', err)
      alert('No se pudo eliminar el gasto')
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-2">Gestión de Gastos</h2>
      {selectedCategory !== 0 && (
        <p className="text-center text-sm text-gray-500 mb-4">
          Mostrando gastos de <span className="font-semibold">{initialCategoryName}</span>
        </p>
      )}

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block mb-1">Fecha</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Categoría</label>
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(+e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value={0}>– Selecciona categoría –</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Monto (S/.)</label>
          <input
            type="number"
            value={Number.isNaN(amount) ? 0 : amount}
            onChange={e => {
              const v = e.currentTarget.valueAsNumber
              setAmount(Number.isNaN(v) ? 0 : v)
            }}
            className="w-full p-2 border rounded"
            step="0.01"
            min="0"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          ➕ Agregar Gasto
        </button>
      </form>

      {/* Lista de gastos */}
      {loading && <p>Cargando gastos…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && selectedCategory === 0 && (
        <p className="text-center text-gray-500">
          Selecciona una categoría para ver sus gastos.
        </p>
      )}
      {!loading && !error && selectedCategory !== 0 && (
        <ul className="divide-y divide-gray-200">
          {expenses.length === 0 ? (
            <li className="py-2 text-center text-gray-500">
              No hay gastos para la categoría seleccionada.
            </li>
          ) : (
            expenses.map(g => {
              const catName =
                g.category?.name ?? g.expenseCategory?.name ?? 'Sin categoría'
              return (
                <li key={g.id} className="py-2 flex justify-between items-center">
                  <div>
                    <p className="font-medium">{catName}</p>
                    {g.year != null && g.month != null && (
                      <p className="text-sm text-gray-500">
                        {g.year}-{String(g.month).padStart(2, '0')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>S/. {g.amount.toFixed(2)}</span>
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Eliminar gasto"
                    >
                      🗑️
                    </button>
                  </div>
                </li>
              )
            })
          )}
        </ul>
      )}
    </div>
  )
}
