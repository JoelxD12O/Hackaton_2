import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Gasto {
  id: number
  description: string
  amount: number
  category: {
    name: string
  }
  date: string
}

interface Categoria {
  id: number
  name: string
}

const API = 'http://198.211.105.95:8080'
const token = localStorage.getItem('token')

export default function Expenses() {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState<number>(0)
  const [categoryId, setCategoryId] = useState<number>(0)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [reload, setReload] = useState(false)

  // Obtener categorías
  useEffect(() => {
    axios.get(`${API}/expenses_category`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setCategorias(res.data))
  }, [])

  // Obtener gastos del mes (ejemplo: junio 2024)
  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1

    axios.get(`${API}/expenses/detail?year=${year}&month=${month}&categoryId=0`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setGastos(res.data))
  }, [reload])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post(`${API}/expenses`, {
      description,
      amount,
      categoryId,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setDescription('')
    setAmount(0)
    setCategoryId(0)
    setReload(!reload)
  }

  const eliminarGasto = async (id: number) => {
    await axios.delete(`${API}/expenses/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setReload(!reload)
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-blue-300">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Gastos del mes</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value))}
          required
          className="w-full p-2 border rounded"
        />
        <select
          value={categoryId}
          onChange={e => setCategoryId(Number(e.target.value))}
          required
          className="w-full p-2 border rounded"
        >
          <option value={0}>Selecciona una categoría</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          ➕ Registrar Gasto
        </button>
      </form>

      <ul className="divide-y divide-gray-200">
        {gastos.map(gasto => (
          <li key={gasto.id} className="py-2 flex justify-between items-center">
            <div>
              <p className="font-medium">{gasto.description}</p>
              <p className="text-sm text-gray-500">
                {gasto.category?.name || 'Sin categoría'} – {gasto.amount} soles
              </p>
            </div>
            <button
              onClick={() => eliminarGasto(gasto.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}