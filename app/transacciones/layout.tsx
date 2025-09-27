'use client'

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'

export default function TransaccionesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
      
      <div className="lg:pl-64">
        <Header onMenuClick={toggleSidebar} title="Transacciones" />
        
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

