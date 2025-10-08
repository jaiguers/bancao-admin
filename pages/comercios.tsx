import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import ProtectedRoute from '../components/ProtectedRoute'
import { Plus, Edit, Trash2, Eye, Phone } from 'lucide-react'
import Swal from 'sweetalert2'

interface Merchant {
  id: string
  responsible: string
  name: string
  phone: string
  accounts: string[]
}

interface CreateMerchantModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (merchant: Omit<Merchant, 'id'>) => void
}

interface ViewAccountsModalProps {
  isOpen: boolean
  onClose: () => void
  merchant: Merchant | null
}

interface EditMerchantModalProps {
  isOpen: boolean
  onClose: () => void
  merchant: Merchant | null
  onUpdate: (merchant: Merchant) => void
}


function CreateMerchantModal({ isOpen, onClose, onCreate }: CreateMerchantModalProps) {
  const [formData, setFormData] = useState({
    responsible: '',
    name: '',
    phone: '',
    accounts: ['']
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.responsible || !formData.name || !formData.phone) {
      Swal.fire({
        icon: 'error',
        title: 'Required fields',
        text: 'Please complete all required fields',
        confirmButtonText: 'OK'
      })
      return
    }

    const filteredAccounts = formData.accounts.filter(account => account.trim() !== '')
    onCreate({
      responsible: formData.responsible,
      name: formData.name,
      phone: formData.phone,
      accounts: filteredAccounts
    })
    
    setFormData({
      responsible: '',
      name: '',
      phone: '',
      accounts: ['']
    })
    onClose()
  }

  const addAccount = () => {
    setFormData(prev => ({
      ...prev,
      accounts: [...prev.accounts, '']
    }))
  }

  const removeAccount = (index: number) => {
    setFormData(prev => ({
      ...prev,
      accounts: prev.accounts.filter((_, i) => i !== index)
    }))
  }

  const updateAccount = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      accounts: prev.accounts.map((account, i) => i === index ? value : account)
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Create Merchant
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsible *
            </label>
            <input
              type="text"
              value={formData.responsible}
              onChange={(e) => setFormData(prev => ({ ...prev, responsible: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Responsible person name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Merchant Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Merchant name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accounts (Phone numbers)
            </label>
            {formData.accounts.map((account, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="tel"
                  value={account}
                  onChange={(e) => updateAccount(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Phone number"
                />
                {formData.accounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAccount(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addAccount}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              + Add account
            </button>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Create Merchant
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function ViewAccountsModal({ isOpen, onClose, merchant }: ViewAccountsModalProps) {
  if (!isOpen || !merchant) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Accounts for {merchant.name}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {merchant.accounts.map((account, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-gray-900 font-medium">{account}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function EditMerchantModal({ isOpen, onClose, merchant, onUpdate }: EditMerchantModalProps) {
  const [formData, setFormData] = useState({
    responsible: '',
    name: '',
    phone: '',
    accounts: ['']
  })

  useEffect(() => {
    if (merchant && isOpen) {
      setFormData({
        responsible: merchant.responsible,
        name: merchant.name,
        phone: merchant.phone,
        accounts: merchant.accounts.length > 0 ? merchant.accounts : ['']
      })
    }
  }, [merchant, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.responsible || !formData.name || !formData.phone) {
      Swal.fire({
        icon: 'error',
        title: 'Required fields',
        text: 'Please complete all required fields',
        confirmButtonText: 'OK'
      })
      return
    }

    if (!merchant) return

    try {
      const backendUrl = process.env.NEXT_PUBLIC_URL_BASE_BACKEND || 'http://localhost:8080/api/'
      const filteredAccounts = formData.accounts.filter(account => account.trim() !== '')
      
      const updatedMerchant = {
        ...merchant,
        responsible: formData.responsible,
        name: formData.name,
        phone: formData.phone,
        accounts: filteredAccounts
      }

      const response = await fetch(`${backendUrl}merchants/${merchant.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMerchant)
      })

      if (response.ok) {
        const result = await response.json()
        onUpdate(result)
        onClose()
        
        Swal.fire({
          icon: 'success',
          title: 'Merchant updated',
          text: 'The merchant has been updated successfully',
          timer: 2000,
          showConfirmButton: false
        })
      } else {
        const errorText = await response.text()
        Swal.fire({
          icon: 'error',
          title: 'Error updating merchant',
          text: errorText || 'Failed to update merchant',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      console.error('Error updating merchant:', error)
      Swal.fire({
        icon: 'error',
        title: 'Connection error',
        text: 'Could not connect to the server',
        confirmButtonText: 'OK'
      })
    }
  }

  const addAccount = () => {
    setFormData(prev => ({
      ...prev,
      accounts: [...prev.accounts, '']
    }))
  }

  const removeAccount = (index: number) => {
    setFormData(prev => ({
      ...prev,
      accounts: prev.accounts.filter((_, i) => i !== index)
    }))
  }

  const updateAccount = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      accounts: prev.accounts.map((account, i) => i === index ? value : account)
    }))
  }

  if (!isOpen || !merchant) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Edit Merchant
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsible *
            </label>
            <input
              type="text"
              value={formData.responsible}
              onChange={(e) => setFormData(prev => ({ ...prev, responsible: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Responsible person name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Merchant Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Merchant name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Phone number"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Accounts (Phone numbers)
            </label>
            {formData.accounts.map((account, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="tel"
                  value={account}
                  onChange={(e) => updateAccount(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Phone number"
                />
                {formData.accounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAccount(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addAccount}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              + Add account
            </button>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Update Merchant
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function MerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAccountsModal, setShowAccountsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null)

  useEffect(() => {
    // Load merchants from backend
    loadMerchants()
  }, [])

  const loadMerchants = async () => {
    setLoading(true)
    try {
      const backendUrl = process.env.NEXT_PUBLIC_URL_BASE_BACKEND || 'http://localhost:8080/api/'
      const response = await fetch(`${backendUrl}merchants`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Backend response:', data)
        // Extract merchants array from response object
        const merchantsArray = Array.isArray(data.merchants) ? data.merchants : []
        setMerchants(merchantsArray)
        
        // Extract pagination data if available
        if (data.pagination) {
          setPagination({
            page: data.pagination.page || 1,
            limit: data.pagination.limit || 10,
            total: data.pagination.total || 0,
            totalPages: data.pagination.totalPages || 0
          })
        }
      } else {
        console.error('Error loading merchants:', response.statusText)
        setMerchants([])
      }
    } catch (error) {
      console.error('Error loading merchants:', error)
      setMerchants([])
    } finally {
      setLoading(false)
    }
  }

  const handleCreateMerchant = async (newMerchant: Omit<Merchant, 'id'>) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_URL_BASE_BACKEND || 'http://localhost:8080/api/'
      const response = await fetch(`${backendUrl}merchants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMerchant)
      })

      if (response.ok) {
        const createdMerchant = await response.json()
        setMerchants(prev => [createdMerchant, ...prev])
        
        Swal.fire({
          icon: 'success',
          title: 'Merchant created',
          text: 'The merchant has been created successfully',
          timer: 2000,
          showConfirmButton: false
        })
      } else {
        const errorText = await response.text()
        Swal.fire({
          icon: 'error',
          title: 'Error creating merchant',
          text: errorText || 'Failed to create merchant',
          confirmButtonText: 'OK'
        })
      }
    } catch (error) {
      console.error('Error creating merchant:', error)
      Swal.fire({
        icon: 'error',
        title: 'Connection error',
        text: 'Could not connect to the server',
        confirmButtonText: 'OK'
      })
    }
  }

  const handleEdit = (merchant: Merchant) => {
    setSelectedMerchant(merchant)
    setShowEditModal(true)
  }

  const handleUpdateMerchant = (updatedMerchant: Merchant) => {
    setMerchants(prev => prev.map(m => m.id === updatedMerchant.id ? updatedMerchant : m))
  }

  const handleDelete = (merchant: Merchant) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete the merchant "${merchant.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setMerchants(prev => prev.filter(m => m.id !== merchant.id))
        Swal.fire({
          icon: 'success',
          title: 'Deleted',
          text: 'The merchant has been deleted',
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

  const handleViewAccounts = (merchant: Merchant) => {
    setSelectedMerchant(merchant)
    setShowAccountsModal(true)
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex-1 flex flex-col">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} title="Merchants" />
          
          <main className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Merchant Management</h2>
                  <p className="text-gray-600">Manage system merchants</p>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create
                </button>
              </div>

              {loading ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading merchants...</p>
                </div>
              ) : !Array.isArray(merchants) || merchants.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No merchants found</h3>
                  <p className="text-gray-500">Start by creating your first merchant.</p>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Responsible
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Phone
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Verify Accounts
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Array.isArray(merchants) && merchants.map((merchant) => (
                          <tr key={merchant.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {merchant.responsible}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {merchant.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {merchant.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <button
                                onClick={() => handleViewAccounts(merchant)}
                                className="text-primary-600 hover:text-primary-700 font-medium"
                              >
                                View details
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEdit(merchant)}
                                  className="text-blue-600 hover:text-blue-700 p-1"
                                  title="Edit"
                                >
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDelete(merchant)}
                                  className="text-red-600 hover:text-red-700 p-1"
                                  title="Delete"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <CreateMerchantModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateMerchant}
      />

      <ViewAccountsModal
        isOpen={showAccountsModal}
        onClose={() => setShowAccountsModal(false)}
        merchant={selectedMerchant}
      />

      <EditMerchantModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        merchant={selectedMerchant}
        onUpdate={handleUpdateMerchant}
      />
    </ProtectedRoute>
  )
}
