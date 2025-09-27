
import { Menu } from 'lucide-react'
import { auth } from '../lib/auth'

interface HeaderProps {
  onMenuClick: () => void
  title: string
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  const user = auth.getCurrentUser()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-20 flex items-center">
      <div className="flex items-center justify-between px-6 w-full">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 mr-2"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            Bienvenido, {user?.name || 'Usuario'}
          </div>
        </div>
      </div>
    </header>
  )
}

