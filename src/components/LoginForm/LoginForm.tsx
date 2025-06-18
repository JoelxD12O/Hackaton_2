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
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Login</h1>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSubmit}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="email"
                    name="email"
                    type="email"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                    placeholder="Email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-placeholder-shown:top-2 transition-all
                      peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-cyan-600"
                    placeholder="Password"
                    value={passwd}
                    onChange={e => setPasswd(e.target.value)}
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm
                      peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                      peer-placeholder-shown:top-2 transition-all
                      peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>

                {isError && (
                  <p className="text-red-600 text-sm">
                    {error?.message || 'Error al iniciar sesión'}
                  </p>
                )}

                <div className="relative">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="bg-cyan-500 text-white rounded-md px-6 py-2 w-full font-medium transition disabled:opacity-50"
                  >
                    {isPending ? 'Entrando...' : 'Entrar'}
                  </button>
                  
                </div>
              </form>
            </div>
          </div>
        <div className="mt-4 text-center">
            <span className="text-gray-600 text-sm">¿No tienes una cuenta? </span>
            <a
                href="/register"
                className="text-cyan-600 hover:underline font-medium"
            >
                Regístrate
            </a>
        </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
