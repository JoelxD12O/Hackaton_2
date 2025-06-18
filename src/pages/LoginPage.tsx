// src/pages/LoginPage.tsx
import { useLogin } from '../hooks/useAuth'
import LoginForm from '../components/LoginForm/LoginForm'

function LoginPage() {
  const { mutate, isPending, isError, error } = useLogin()

  return (
    <LoginForm
      onSubmit={(credentials) =>
        mutate(credentials, {
          onError: (err) =>
            alert(
              'Error al iniciar sesión: ' +
                (err instanceof Error ? err.message : 'desconocido')
            ),
        })
      }
      isPending={isPending}
      isError={isError}
      error={error as Error | null}
    />
  )
}

export default LoginPage
