import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ProtectedRoute from '../components/ProtectedRoute'
import { mockUsers, User, delay } from '../lib/mockData'

export default function UsuariosPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true)
      // Simular delay de API
      await delay(1000)
      setUsers(mockUsers)
      setLoading(false)
    }

    loadUsers()
  }, [])

  const columns = [
    {
      key: 'nombre',
      label: 'Nombre',
      sortable: true
    },
    {
      key: 'cedula',
      label: 'Cédula',
      sortable: true
    },
    {
      key: 'celular',
      label: 'Celular',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'fechaRegistro',
      label: 'Fecha de Registro',
      sortable: true
    }
  ]

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
          <div className="flex-1 flex flex-col">
            <Header onMenuClick={toggleSidebar} title="Usuarios" />
            <main className="flex-1 p-6">
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
              </div>
            </main>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        
        <div className="flex-1 flex flex-col">
          <Header onMenuClick={toggleSidebar} title="Usuarios" />
          
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h2>
                  <p className="text-gray-600">Administra los usuarios del sistema</p>
                </div>
                <div className="text-sm text-gray-500">
                  Total: {users.length} usuarios
                </div>
              </div>

              <DataTable
                data={users}
                columns={columns}
                searchPlaceholder="Buscar por nombre, cédula, celular o email..."
                searchFields={['nombre', 'cedula', 'celular', 'email']}
                itemsPerPage={10}
              />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

