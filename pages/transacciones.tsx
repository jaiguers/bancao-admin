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
    // Cargar transacciones iniciales (pending) y configurar conexión SSE
    const setupSSE = () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_URL_BASE_BACKEND || '/api/'
        const sseUrl = `${backendUrl}sse`
        eventSourceRef.current = new EventSource(sseUrl)

        eventSourceRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            console.log('Evento recibido:', data)

            // Convertir datos del backend al formato de la tabla
            const newTransaction: Transaction = {
              id: data._id,
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

            // Mantener solo pendientes: si no está en pending, eliminar de la tabla
            const statusLower = String(newTransaction.estado || '').toLowerCase()
            if (statusLower !== 'pending' && statusLower !== 'review') {
              setTransactions(prevTransactions =>
                prevTransactions.filter(t => t.id !== newTransaction.id)
              )
              return
            }

            // Agregar/actualizar si está pending o review
            setTransactions(prevTransactions => {
              const exists = prevTransactions.some(t => t.id === newTransaction.id)
              if (exists) {
                return prevTransactions.map(t =>
                  t.id === newTransaction.id ? newTransaction : t
                )
              }
              return [newTransaction, ...prevTransactions]
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

    const loadInitialTransactions = async () => {
      setLoading(true)
      try {
        const backendUrl = process.env.NEXT_PUBLIC_URL_BASE_BACKEND || '/api/'
        const url = `${backendUrl}transactions`
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
          const data = await response.json()
          const mapped: Transaction[] = (Array.isArray(data) ? data : []).map((item: any) => ({
            id: item.id,
            referencia: item.reference,
            monto: item.amount,
            fecha: item.date,
            estado: item.status,
            cliente: item.destination_account,
            vencimiento: '',
            fechaCreacion: item.date,
            payment_method: item.payment_method,
            amount: item.amount,
            destination_account: item.destination_account,
            source_account: item.source_account,
            beneficiary: item.beneficiary,
            whatsapp_phone: item.whatsapp_phone,
            support_url: item.support_url,
            date: item.date,
            userId: item.userId,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
          }))
          // Mantener solo transacciones en estado pending
          const onlyPending = mapped.filter(t => String(t.estado || '').toLowerCase() === 'pending')
          setTransactions(onlyPending)
        } else {
          const text = await response.text().catch(() => response.statusText)
          console.error('Error al cargar transacciones iniciales:', text)
        }
      } catch (error) {
        console.error('Error al cargar transacciones iniciales:', error)
      } finally {
        setLoading(false)
      }
    }

    loadInitialTransactions()
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
  const handleTransactionAction = async (
    transactionId: string,
    action: 'approve' | 'reject' | 'review'
  ): Promise<{ outcome: 'ok' | 'disableReview' | 'removed', transaction?: Transaction }> => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_URL_BASE_BACKEND || '/api/'
      const url = `${backendUrl}transactions/${transactionId}/${action}`

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        console.log(`Transacción ${action} exitosamente`)
        // Eliminar transacción de la tabla cuando es aprobada o rechazada
        if (action === 'approve' || action === 'reject') {
          setTransactions(prev => prev.filter(t => t.id !== transactionId))
          return { outcome: 'removed' }
        }

        if (action === 'review') {
          console.log('Transacción en revisión')
          const body = await response.json()
          
          // Buscar la transacción original antes de actualizar
          const originalTransaction = transactions.find(t => t.id === transactionId)
          
          // Actualizar la transacción en el estado local con los datos del backend
          setTransactions(prevTransactions => {
            return prevTransactions.map(t => {
              if (t.id === body._id) {
                // Mapear los datos del backend al formato de Transaction
                const updatedTransaction = {
                  ...t,
                  id: body._id || t.id,
                  referencia: body.reference || t.referencia,
                  monto: body.amount || t.monto,
                  fecha: body.date || t.fecha,
                  estado: body.status || t.estado,
                  cliente: body.destination_account || t.cliente,
                  payment_method: body.payment_method || t.payment_method,
                  amount: body.amount || t.amount,
                  destination_account: body.destination_account || t.destination_account,
                  source_account: body.source_account || t.source_account,
                  beneficiary: body.beneficiary || t.beneficiary,
                  whatsapp_phone: body.whatsapp_phone || t.whatsapp_phone,
                  support_url: body.support_url || t.support_url,
                  date: body.date || t.date,
                  userId: body.userId || t.userId,
                  createdAt: body.createdAt || t.createdAt,
                  updatedAt: body.updatedAt || t.updatedAt
                }
                return updatedTransaction
              }
              return t
            })
          })
          
          // Crear la transacción actualizada para retornarla
          const updatedTransactionForReturn: Transaction = {
            ...originalTransaction!,
            id: body._id || originalTransaction!.id,
            referencia: body.reference || originalTransaction!.referencia,
            monto: body.amount || originalTransaction!.monto,
            fecha: body.date || originalTransaction!.fecha,
            estado: body.status || originalTransaction!.estado,
            cliente: body.destination_account || originalTransaction!.cliente,
            payment_method: body.payment_method || originalTransaction!.payment_method,
            amount: body.amount || originalTransaction!.amount,
            destination_account: body.destination_account || originalTransaction!.destination_account,
            source_account: body.source_account || originalTransaction!.source_account,
            beneficiary: body.beneficiary || originalTransaction!.beneficiary,
            whatsapp_phone: body.whatsapp_phone || originalTransaction!.whatsapp_phone,
            support_url: body.support_url ?? originalTransaction!.support_url,
            date: body.date || originalTransaction!.date,
            userId: body.userId || originalTransaction!.userId,
            createdAt: body.createdAt || originalTransaction!.createdAt,
            updatedAt: body.updatedAt || originalTransaction!.updatedAt
          }
          
          return { outcome: 'ok', transaction: updatedTransactionForReturn }
        }
        // La actualización se manejará automáticamente por SSE
        return { outcome: 'ok' }
      }

      // Manejo especial para 409
      if (response.status === 409) {
        const message = (await response.text()).toLowerCase()

        // Si ya está aprobada, eliminar de la tabla
        if (message.includes('approved')) {
          setTransactions(prev => prev.filter(t => t.id !== transactionId))
          return { outcome: 'removed' }
        }
        if (message.includes('rejected')) {
          setTransactions(prev => prev.filter(t => t.id !== transactionId))
          return { outcome: 'removed' }
        }

        // Si está en revisión, deshabilitar botón revisar
        if (message.includes('review')) {
          return { outcome: 'disableReview' }
        }

        // Otro 409 desconocido
        throw new Error(`409: ${message}`)
      }

      // Otros errores
      const fallbackText = await response.text().catch(() => response.statusText)
      console.error(`Error al ${action} la transacción:`, fallbackText)
      throw new Error(`Error al ${action} la transacción: ${fallbackText}`)
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

