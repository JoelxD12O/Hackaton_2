// src/components/LoginForm.tsx
import React, { useState } from 'react'

export interface Credentials {
  email: string
  passwd: string
}

interface LoginFormProps {
  onSubmit: (creds: Credentials) => void
  isPending: boolean
  isError: boolean
  error: Error | null
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isPending,
  isError,
  error,
}) => {
  const [email, setEmail] = useState('')
  const [passwd, setPasswd] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, passwd })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          placeholder="usuario@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <input
          type="password"
          placeholder="••••••••••••"
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
          required
          className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
      </div>

      {isError && (
        <p className="text-red-600 text-sm">
          {error?.message || 'Error al iniciar sesión'}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 bg-green-600 text-white font-medium rounded-lg shadow hover:shadow-md transition disabled:opacity-50"
      >
        {isPending ? 'Entrando...' : 'Entrar'}
      </button>

      <p className="mt-4 text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <a
          href="/register"
          className="text-green-600 font-medium underline hover:text-green-800"
        >
          Regístrate
        </a>
      </p>
    </form>
  )
}

export default LoginForm
