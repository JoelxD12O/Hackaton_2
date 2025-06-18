// src/pages/LoginPage.tsx
import React, { useState } from 'react'
import axios from 'axios'
import { useLogin } from '../hooks/useAuth'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState<string>('')
  const [passwd, setPasswd] = useState<string>('')
  // Desestructuramos isPending en vez de isLoading, y también isError y error
  const { mutate, isPending, isError, error } = useLogin()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(
      { email, passwd },
      {
        onError: (err) => {
          if (axios.isAxiosError(err)) {
            const serverMsg = (err.response?.data as any)?.message || err.message
            alert(serverMsg)
          } else if (err instanceof Error) {
            alert(err.message)
          } else {
            alert('Error al iniciar sesión')
          }
        }
      }
    )
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-2xl mb-4">Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={passwd}
          onChange={e => setPasswd(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />

        {isError && (
          <p className="text-red-600">
            {(error as Error)?.message ?? 'Error al iniciar sesión'}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {isPending ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="mt-4 text-center">
        ¿No tienes cuenta?{' '}
        <Link to="/register" className="text-green-600 underline">
          Regístrate
        </Link>
      </p>
    </div>
  )
}
