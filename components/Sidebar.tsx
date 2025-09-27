
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { auth } from '../lib/auth'
import { 
  Users, 
  CreditCard, 
  Menu, 
  X, 
  LogOut,
  Home
} from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const router = useRouter()
  const pathname = router.pathname

  const handleLogout = () => {
    auth.logout()
    window.location.href = '/login'
  }

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home,
    },
    {
      name: 'Usuarios',
      href: '/usuarios',
      icon: Users,
    },
    {
      name: 'Transacciones',
      href: '/transacciones',
      icon: CreditCard,
    },
  ]

  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/*   Sidebar   */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:shadow-lg lg:flex-shrink-0
      `}>
        {/* Header del Sidebar */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-gray-200 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
              <span className="text-primary-600 font-bold text-lg">B</span>
            </div>
            <h1 className="text-xl font-bold text-white">Bancao Admin</h1>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-md hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <X className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Navegación */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer
                      ${isActive 
                        ? 'bg-primary-100 text-primary-700 shadow-sm border border-primary-200' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                      }
                    `}
                    onClick={() => {
                      // Cerrar sidebar en móvil al hacer clic en un enlace
                      if (window.innerWidth < 1024) {
                        onToggle()
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </nav>
        </div>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="mb-3">
            <div className="flex items-center px-3 py-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-primary-600 font-semibold text-sm">
                  {auth.getCurrentUser()?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {auth.getCurrentUser()?.name || 'Usuario'}
                </p>
                <p className="text-xs text-gray-500">
                  {auth.getCurrentUser()?.email || 'usuario@email.com'}
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors border border-transparent hover:border-red-200"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  )
}

