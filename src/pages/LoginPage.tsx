// src/pages/LoginPage.tsx
import { useLogin } from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm/LoginForm'

// solo utilizamos el hook de login para la lógica global
function LoginPage() {
  const { mutate, isPending, isError, error } = useLogin()

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo */}
      <div className="w-1/2 bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center p-10">
        <img src="/logo.svg" alt="MyWallet" className="h-24 mb-6" />
        <h1 className="text-4xl font-bold text-green-700 mb-2">¡Bienvenido!</h1>
        <p className="text-green-600">Regístrate para usar MyWallet</p>
        <Link
          to="/register"
          className="mt-6 inline-block px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:shadow-md transition"
        >
          Registrarse
        </Link>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-6">
            Iniciar Sesión
          </h2>
          <LoginForm
            onSubmit={(credentials) =>
              mutate(credentials, {
                onError: (err) => {
                  // manejo de errores ya descrito antes
                  alert(
                    'Error al iniciar sesión: ' +
                      (err instanceof Error ? err.message : 'desconocido')
                  )
                },
              })
            }
            isPending={isPending}
            isError={isError}
            error={error as Error | null}
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
