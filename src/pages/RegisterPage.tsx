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

    // 1. Validación mínima de longitud
    if (password.length < 12) {
      return alert('La contraseña debe tener al menos 12 caracteres.')
    }

    // 2. Construimos el payload
    const payload = { email, passwd: password }
    console.log('🚀 Register payload:', payload)

    try {
      // 3. Intentamos registrar
      await registerMutation.mutateAsync(payload)
      // Si todo OK, el hook ya guardó el token y podemos redirigir
      navigate('/anime', { replace: true })
    } catch (error: any) {
      // 4. Debug: muestra el objeto completo que llega del servidor
      console.error('Register error response:', error.response?.data)

      // 5. Muestra el mensaje de error correcto
      const errData = error.response?.data
      const userMsg =
        errData?.message /* backend usa "message" */ ||
        errData?.detail  /* fallback si detalle existe */ ||
        'Error al registrar'
      alert(userMsg)
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
          placeholder="Contraseña (mín. 12 caracteres)"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          minLength={12}
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
