// src/pages/LoginPage.tsx
import React, { useState } from 'react'
import { useLogin } from '../hooks/UseAuth'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useLogin()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await loginMutation.mutateAsync({ email, password })
      navigate('/anime', { replace: true })
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Error al iniciar sesión')
    }
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
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
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
