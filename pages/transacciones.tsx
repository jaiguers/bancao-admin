import { useState, useEffect, useRef } from 'react'
import TransactionTable from '../components/TransactionTable'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ProtectedRoute from '../components/ProtectedRoute'
import { Transaction } from '../lib/mockData'

export default function TransaccionesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const eventSourceRef = useRef<EventSource | null>(null)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  useEffect(() => {
    // Configurar conexión SSE
    const setupSSE = () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_URL_BASE_BACKEND || 'http://localhost:8080/api/'
        const sseUrl = `${backendUrl}sse`
        eventSourceRef.current = new EventSource(sseUrl)
        
        eventSourceRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            console.log('Evento recibido:', data)
            
            // Convertir datos del backend al formato de la tabla
            const newTransaction: Transaction = {
              id: data.id,
              referencia: data.reference,
              monto: data.amount,
              fecha: data.date,
              estado: data.status,
              cliente: data.destination_account,
              vencimiento: '', // No disponible en el backend
              fechaCreacion: data.date,
              // Campos adicionales del backend
              payment_method: data.payment_method,
              amount: data.amount,
              destination_account: data.destination_account,
              source_account: data.source_account,
              beneficiary: data.beneficiary,
              whatsapp_phone: data.whatsapp_phone,
              support_url: data.support_url,
              date: data.date,
              userId: data.userId,
              createdAt: data.createdAt,
              updatedAt: data.updatedAt
            }
            
            // Agregar la nueva transacción a la tabla
            setTransactions(prevTransactions => {
              // Verificar si la transacción ya existe para evitar duplicados
              const exists = prevTransactions.some(t => t.id === newTransaction.id)
              if (exists) {
                // Actualizar transacción existente
                return prevTransactions.map(t => 
                  t.id === newTransaction.id ? newTransaction : t
                )
              } else {
                // Agregar nueva transacción al inicio
                return [newTransaction, ...prevTransactions]
              }
            })
          } catch (error) {
            console.error('Error al parsear datos SSE:', error)
            console.log('Datos raw recibidos:', event.data)
          }
        }

        eventSourceRef.current.onerror = (error) => {
          console.error('Error en conexión SSE:', error)
        }

        eventSourceRef.current.onopen = () => {
          console.log('Conexión SSE establecida con:', sseUrl)
        }
      } catch (error) {
        console.error('Error al configurar SSE:', error)
      }
    }

    setupSSE()

    // Cleanup al desmontar el componente
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close()
        console.log('Conexión SSE cerrada')
      }
    }
  }, [])

  const handleTransactionRemove = (transactionId: string) => {
    setTransactions(prevTransactions => 
      prevTransactions.filter(transaction => transaction.id !== transactionId)
    )
  }

  // Funciones para manejar las acciones de la API
  const handleTransactionAction = async (transactionId: string, action: 'approve' | 'reject' | 'review'): Promise<void> => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_URL_BASE_BACKEND || 'http://localhost:8080/api/'
      const url = `${backendUrl}transactions/${transactionId}/${action}`
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        console.log(`Transacción ${action} exitosamente`)
        // La actualización se manejará automáticamente por SSE
      } else {
        console.error(`Error al ${action} la transacción:`, response.statusText)
        throw new Error(`Error al ${action} la transacción: ${response.statusText}`)
      }
    } catch (error) {
      console.error(`Error al ${action} la transacción:`, error)
      throw error
    }
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

              {transactions.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No hay transacciones</h3>
                  <p className="text-gray-500">Las transacciones aparecerán aquí cuando lleguen del sistema.</p>
                </div>
              ) : (
                <TransactionTable
                  data={transactions}
                  searchPlaceholder="Buscar por referencia, cliente, estado o monto..."
                  itemsPerPage={10}
                  onTransactionRemove={handleTransactionRemove}
                  onTransactionAction={handleTransactionAction}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

