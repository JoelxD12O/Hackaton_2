// src/pages/RegisterPage.tsx
import React, { useState } from 'react'
import { useRegister } from '../hooks/UseAuth'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const registerMutation = useRegister()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await registerMutation.mutateAsync({ email, password })
      // registration auto-logs in, so redirect
      navigate('/anime', { replace: true })
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Error al registrar')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-2xl mb-4">Registro</h1>
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
          disabled={registerMutation.isPending}
          className="w-full py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {registerMutation.isPending ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
      <p className="mt-4 text-center">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Iniciar sesión
        </Link>
      </p>
    </div>
  )
}
