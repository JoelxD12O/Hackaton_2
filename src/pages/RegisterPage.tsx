// src/pages/RegisterPage.tsx
import React, { useState } from 'react'
import { useRegister } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const registerMutation = useRegister()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password.length < 12) {
      return alert('La contraseña debe tener al menos 12 caracteres.')
    }

    try {
      await registerMutation.mutateAsync({ email, passwd: password })
      navigate('/login', { replace: true })
    } catch (error: any) {
      console.error('Register error:', error.response?.data)
      const msg =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        'Error al registrar'
      alert(msg)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        {/* Capa de fondo inclinada en verde */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 shadow-lg
                         transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-green-800">Registro</h1>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSubmit}
                className="py-8 text-base leading-6 space-y-4 text-gray-700
                           sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300
                               text-gray-900 focus:outline-none focus:border-green-500 transition"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm
                               peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                               peer-placeholder-shown:top-2 transition-all
                               peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email
                  </label>
                </div>

                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="Contraseña"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300
                               text-gray-900 focus:outline-none focus:border-green-500 transition"
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm
                               peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                               peer-placeholder-shown:top-2 transition-all
                               peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Contraseña
                  </label>
                </div>

                {registerMutation.isError && (
                  <p className="text-red-600 text-sm">
                    {(registerMutation.error as Error)?.message ||
                      'Error al registrar'}
                  </p>
                )}

                <div className="relative">
                  <button
                    type="submit"
                    disabled={registerMutation.isPending}
                    className="bg-green-500 text-white rounded-md px-6 py-2 w-full
                               font-medium hover:bg-green-600 transition disabled:opacity-50"
                  >
                    {registerMutation.isPending
                      ? 'Registrando...'
                      : 'Registrarse'}
                  </button>
                </div>
              </form>

              <p className="mt-4 text-center text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link
                  to="/login"
                  className="text-green-600 font-medium underline hover:text-green-800"
                >
                  Iniciar sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
