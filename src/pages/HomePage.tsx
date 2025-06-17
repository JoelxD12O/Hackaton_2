import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// Plantilla de Home donde se mostrarán botones para usar cada endpoint
export default function HomePage() {
  // Extrae el usuario autenticado y la función de logout del contexto de autenticación
  const { user, logout } = useAuth()
  // Hook para navegar programáticamente entre rutas
  const navigate = useNavigate()

  // Si no está autenticado, redirige a login
  useEffect(() => {
    // Si no hay usuario, redirige a la página de login
    if (!user) {
      navigate('/login', { replace: true })
    }
  }, [user]) // Se ejecuta cada vez que cambia el usuario

  // Handlers de ejemplo (vacíos) para cada endpoint
  // Navega a la página de registro
  
  //const handleRegister = () => navigate('/register')
  // Navega a la página de login
  // const handleLogin = () => navigate('/login')
  // Simula llamada para obtener lista de anime
  const handleGetAnimeList = () => console.log('GET /api/anime/list?page=1&size=10')
  // Simula llamada para agregar anime a favoritos
  const handleAddToFavorites = () => console.log('POST /api/user/favorites { anime_id: 1 }')
  // Simula llamada para obtener favoritos
  const handleGetFavorites = () => console.log('GET /api/user/favorites?page=1&size=10')
  // Simula llamada para quitar anime de favoritos
  const handleRemoveFromFavorites = () => console.log('DELETE /api/user/favorites { anime_id: 1 }')
  // Simula llamada para agregar anime al historial
  const handleAddToHistory = () => console.log('POST /api/user/history { anime_id: 1, status: "visto" }')
  // Simula llamada para obtener historial
  const handleGetHistory = () => console.log('GET /api/user/history?page=1&size=10')
  // Simula llamada para quitar anime del historial
  const handleRemoveFromHistory = () => console.log('DELETE /api/user/history { anime_id: 1 }')

  // Datos de ejemplo para mostrar en los botones
  const exampleAnime = { id: 1, title: 'Naruto' }
  const exampleFavorite = { anime_id: 1, title: 'Naruto' }
  const exampleHistory = { anime_id: 1, title: 'Naruto', status: 'visto' }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Saludo al usuario autenticado */}
      <h1 className="text-3xl font-bold">Bienvenido, {user?.email}</h1>
      {/* Botón para cerrar sesión */}
      <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded">
        Cerrar Sesión
      </button>

      {/* Grid de botones para simular los endpoints */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cada botón ejecuta un handler diferente */}
        <button onClick={handleGetAnimeList} className="py-2 bg-blue-600 text-white rounded">
          Ver Listado de Anime
        </button>
        <button onClick={handleAddToFavorites} className="py-2 bg-yellow-500 text-white rounded">
          Agregar '{exampleAnime.title}' a Favoritos
        </button>
        <button onClick={handleGetFavorites} className="py-2 bg-purple-600 text-white rounded">
          Ver Favoritos (ej: '{exampleFavorite.title}')
        </button>
        <button onClick={handleRemoveFromFavorites} className="py-2 bg-gray-600 text-white rounded">
          Quitar Favorito '{exampleFavorite.title}'
        </button>
        <button onClick={handleAddToHistory} className="py-2 bg-green-600 text-white rounded">
          Agregar Historial '{exampleHistory.title}'
        </button>
        <button onClick={handleGetHistory} className="py-2 bg-teal-600 text-white rounded">
          Ver Historial (ej: '{exampleHistory.status}')
        </button>
        <button onClick={handleRemoveFromHistory} className="py-2 bg-pink-600 text-white rounded">
          Quitar de Historial '{exampleHistory.title}'
        </button>
      </div>
    </div>
  )
}