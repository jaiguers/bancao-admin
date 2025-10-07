import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Search, RefreshCw, Eye } from 'lucide-react'
import { Transaction } from '../lib/mockData'
import ReviewModal from './ReviewModal'

interface TransactionTableProps {
  data: Transaction[]
  searchPlaceholder?: string
  itemsPerPage?: number
  onTransactionRemove?: (transactionId: string) => void
  onTransactionAction?: (transactionId: string, action: 'approve' | 'reject' | 'review') => void
}

export default function TransactionTable({ 
  data, 
  searchPlaceholder = "Buscar transacciones...",
  itemsPerPage = 10,
  onTransactionRemove,
  onTransactionAction
}: TransactionTableProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loadingTransactionId, setLoadingTransactionId] = useState<string | null>(null)

  // Filtrar datos basado en búsqueda
  const filteredData = useMemo(() => {
    if (!searchTerm) return data

    return data.filter(item => {
      return (
        item.referencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.monto.toString().includes(searchTerm)
      )
    })
  }, [data, searchTerm])

  // Ordenar datos
  const sortedData = useMemo(() => {
    if (!sortField) return filteredData

    return [...filteredData].sort((a, b) => {
      let aValue: any = a[sortField as keyof Transaction]
      let bValue: any = b[sortField as keyof Transaction]
      
      // Convertir monto a número para ordenamiento
      if (sortField === 'monto') {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortField, sortDirection])

  // Paginación
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = sortedData.slice(startIndex, endIndex)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getStatusBadge = (estado: string) => {
    const baseClasses = "status-badge"
    switch (estado) {
      case 'Aceptada':
      case 'approved':
        return `${baseClasses} status-accepted`
      case 'Abierta':
      case 'open':
        return `${baseClasses} status-open`
      case 'Borrador':
      case 'draft':
        return `${baseClasses} status-draft`
      case 'Pendiente':
      case 'pending':
        return `${baseClasses} status-pending`
      case 'Completada':
      case 'completed':
        return `${baseClasses} status-completed`
      case 'Cancelada':
      case 'rejected':
        return `${baseClasses} status-cancelled`
      case 'reviewed':
        return `${baseClasses} status-reviewed`
      default:
        return `${baseClasses} status-draft`
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  const handleReviewModalClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTransaction(null)
  }

  const handleApprove = () => {
    if (selectedTransaction && onTransactionAction) {
      onTransactionAction(selectedTransaction.id, 'approve')
    }
    handleCloseModal()
  }

  const handleReject = () => {
    if (selectedTransaction && onTransactionAction) {
      onTransactionAction(selectedTransaction.id, 'reject')
    }
    handleCloseModal()
  }

  const handleReviewClick = async (transaction: Transaction) => {
    if (onTransactionAction) {
      // Mostrar loading
      setLoadingTransactionId(transaction.id)
      
      try {
        // Enviar acción al backend
        await onTransactionAction(transaction.id, 'review')
        
        // Abrir modal después de enviar la acción
        setSelectedTransaction(transaction)
        setIsModalOpen(true)
      } catch (error) {
        console.error('Error al revisar transacción:', error)
      } finally {
        // Quitar loading
        setLoadingTransactionId(null)
      }
    } else {
      // Fallback: abrir modal si no hay función de acción
      setSelectedTransaction(transaction)
      setIsModalOpen(true)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Barra de búsqueda */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 table-stripe">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('monto')}
              >
                <div className="flex items-center space-x-1">
                  <span>MONTO</span>
                  {sortField === 'monto' && (
                    <span className="text-primary-600">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('referencia')}
              >
                <div className="flex items-center space-x-1">
                  <span>REFERENCIA</span>
                  {sortField === 'referencia' && (
                    <span className="text-primary-600">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('cliente')}
              >
                <div className="flex items-center space-x-1">
                  <span>CLIENTE</span>
                  {sortField === 'cliente' && (
                    <span className="text-primary-600">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('fecha')}
              >
                <div className="flex items-center space-x-1">
                  <span>FECHA</span>
                  {sortField === 'fecha' && (
                    <span className="text-primary-600">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACCIONES
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((transaction, index) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(transaction.monto)} USD
                    </span>
                    <RefreshCw className="h-3 w-3 text-gray-400" />
                    <span className={getStatusBadge(transaction.estado)}>
                      {transaction.estado}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.referencia}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.cliente}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.fecha || transaction.fechaCreacion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => handleReviewClick(transaction)}
                    disabled={loadingTransactionId === transaction.id}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingTransactionId === transaction.id ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Revisar
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Mostrando {startIndex + 1} a {Math.min(endIndex, sortedData.length)} de {sortedData.length} resultados
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  px-3 py-1 text-sm rounded-md
                  ${currentPage === page 
                    ? 'bg-primary-600 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Modal de revisión */}
      {selectedTransaction && (
        <ReviewModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onApprove={handleApprove}
          onReject={handleReject}
          transactionData={{
            referencia: selectedTransaction.referencia,
            monto: selectedTransaction.monto,
            cliente: selectedTransaction.cliente,
            support_url: selectedTransaction.support_url
          }}
        />
      )}
    </div>
  )
}

