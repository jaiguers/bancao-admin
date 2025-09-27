import { useState, useEffect } from 'react'
import TransactionTable from '../components/TransactionTable'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ProtectedRoute from '../components/ProtectedRoute'
import { mockTransactions, Transaction, delay } from '../lib/mockData'

export default function TransaccionesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true)
      // Simular delay de API
      await delay(1000)
      setTransactions(mockTransactions)
      setLoading(false)
    }

    loadTransactions()
  }, [])

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
          <div className="flex-1 flex flex-col">
            <Header onMenuClick={toggleSidebar} title="Transacciones" />
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
          <Header onMenuClick={toggleSidebar} title="Transacciones" />
          
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Gestión de Transacciones</h2>
                  <p className="text-gray-600">Administra las transacciones del sistema</p>
                </div>
                <div className="text-sm text-gray-500">
                  Total: {transactions.length} transacciones
                </div>
              </div>

              <TransactionTable
                data={transactions}
                searchPlaceholder="Buscar por referencia, cliente, estado o monto..."
                itemsPerPage={10}
              />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

