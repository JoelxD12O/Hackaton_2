// src/contexts/ExpensesContext.tsx
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../api/cliente'
import { useAuth } from './AuthContext'

export interface RawSummaryEntry {
  id: number
  year: number
  month: number
  amount: number
  expenseCategory: { id: number; name: string }
}

interface ExpensesContextType {
  entries: RawSummaryEntry[]
  isLoading: boolean
  isError: boolean
  refetch: () => void
}

const ExpensesContext = createContext<ExpensesContextType|undefined>(undefined)

export function ExpensesProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth()
  const [entries,  setEntries]  = useState<RawSummaryEntry[]>([])
  const [isLoading, setLoading] = useState(true)
  const [isError,   setError]   = useState(false)
  const refetch = () => {
    setLoading(true)
    setError(false)

    api
      .get<RawSummaryEntry[]>('/expenses_summary', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(r => {
        setEntries(r.data)
      })
      .catch(() => {
        setError(true)
      })
      
      .finally(() => {
        setLoading(false)
      })
      
  }

  useEffect(() => {
    if (!token) {
      // Sin token no cargamos nada
      setEntries([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(false)

    api
      .get<RawSummaryEntry[]>('/expenses_summary', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(r => {
        setEntries(r.data)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [token])

  return (
    <ExpensesContext.Provider value={{ entries, isLoading, isError, refetch }}>
      {children}
    </ExpensesContext.Provider>
  )
}

export function useExpensesContext() {
  const ctx = useContext(ExpensesContext)
  if (!ctx) throw new Error('useExpensesContext debe usarse dentro de <ExpensesProvider>')
  return ctx
}
