import { X } from 'lucide-react'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  onApprove: () => void
  onReject: () => void
  transactionData: {
    referencia: string
    monto: number
    cliente: string
    support_url?: string
  }
}

export default function ReviewModal({ 
  isOpen, 
  onClose, 
  onApprove, 
  onReject, 
  transactionData 
}: ReviewModalProps) {
  if (!isOpen) return null

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Revisar Transacción
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Transaction Image */}
          <div className="flex justify-center mb-6">
            <div className="w-96 h-96 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200 overflow-hidden">
              <img 
                src={transactionData.support_url || "https://images.ctfassets.net/h9i30ml9c3lu/7qyJQDzrFkrLUEHLjTFNfW/ab29db116d437148473d2e2f67463dfb/NEQUI.jpg"}
                alt="Comprobante de transacción"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="text-center p-4">
                        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <p class="text-sm text-gray-600 font-medium mb-3">Comprobante de transacción</p>
                        <div class="bg-gray-50 rounded-lg p-3 border">
                          <div class="text-xs text-gray-600 space-y-1">
                            <p><strong>Para:</strong> ${transactionData.cliente}</p>
                            <p><strong>Monto:</strong> ${formatCurrency(transactionData.monto)}</p>
                            <p><strong>Referencia:</strong> ${transactionData.referencia}</p>
                          </div>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-3 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-600">
                ¿Deseas aprobar o rechazar esta transacción?
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={onApprove}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Aprobar
            </button>
            <button
              onClick={onReject}
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
