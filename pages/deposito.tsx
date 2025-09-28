import { useState, useEffect } from 'react'
import Head from 'next/head'
import CryptoJS from 'crypto-js'

// Declarar WidgetCheckout como global para TypeScript
declare global {
  interface Window {
    WidgetCheckout: any
  }
}

export default function DepositoPage() {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  // Función para generar GUID
  const generarGUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

  // Función para generar hash SHA256
  const generarHashSHA256 = (cadena: string): string => {
    return CryptoJS.SHA256(cadena).toString()
  }

  // Función para inicializar Wompi Checkout
  const inicializarWompiCheckout = async () => {
    try {
      // Generar referencia única
      const referencia = `BANCAW-A-${generarGUID()}`
      
      // Monto fijo de ejemplo (10 COP = 1000 centavos)
      const montoEnCentavos = 1000000
      
      // Obtener secreto de integridad desde variable de entorno
      const secretoIntegridad = process.env.NEXT_PUBLIC_INTEGRITY_KEY_WOMPI || 'tu_secreto_integridad'
      const currency = 'COP'
      // Crear cadena para hash: Referencia + Monto + COP + SecretoIntegridad
      const cadenaParaHash = `${referencia}${montoEnCentavos}${currency}${secretoIntegridad}`
      
      // Generar hash SHA256
      const hashIntegridad = generarHashSHA256(cadenaParaHash)
      console.log('Hash de integridad: ', hashIntegridad)
      console.log('Cadena PUBLIC KEY: ', process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY ) 

      // Configurar WidgetCheckout
      const checkout = new window.WidgetCheckout({
        currency: currency,
        amountInCents: montoEnCentavos,
        reference: referencia,
        publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || 'pub_fENJ3hdTJxdzs3hd35PxDBSMB4f85VrgiY3b6s1',
        signature: {
          integrity: hashIntegridad
        },
        redirectUrl: `${window.location.origin}/deposito?success=true`,
        customerData: {
          email: 'usuario@bancao.com',
          fullName: 'Usuario Bancao',
          phoneNumber: '3001234567',
          phoneNumberPrefix: '+57',
          legalId: '1130647276',
          legalIdType: 'CC'
        }
      })

      // Abrir checkout
      checkout.open(function (result: any) {
        const transaction = result.transaction
        console.log("Transaction ID: ", transaction.id)
        console.log("Transaction object: ", transaction)
        
        if (transaction.status === 'APPROVED') {
          setSuccess('¡Pago procesado exitosamente!')
        } else {
          setError('El pago no fue aprobado')
        }
        setLoading(false)
      })

    } catch (err) {
      console.error('Error:', err)
      setError('Error al inicializar el pago. Por favor intenta nuevamente.')
      setLoading(false)
    }
  }

  // Cargar script de Wompi y inicializar checkout
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://checkout.wompi.co/widget.js'
    script.async = true
    
    script.onload = () => {
      console.log('Wompi Widget cargado correctamente')
      // Inicializar checkout cuando el script esté cargado
      inicializarWompiCheckout()
    }
    
    script.onerror = () => {
      setError('Error al cargar Wompi Widget')
      setLoading(false)
    }
    
    document.head.appendChild(script)

    // Verificar si hay parámetros de éxito en la URL
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get('success') === 'true') {
      setSuccess('¡Pago procesado exitosamente!')
      setLoading(false)
    }

    return () => {
      // Limpiar script al desmontar componente
      const existingScript = document.querySelector('script[src="https://checkout.wompi.co/widget.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>Depositar Saldo - Bancao</title>
        <meta name="description" content="Deposita saldo a tu cuenta de forma segura" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Depositar Saldo
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Procesando tu depósito de $10,000 COP
            </p>
          </div>

          <div className="bg-white py-8 px-6 shadow-xl rounded-lg">
            {loading && (
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <p className="text-gray-600 mb-2">Inicializando pago...</p>
                <p className="text-sm text-gray-500">Se abrirá el widget de Wompi en unos segundos</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm">{success}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Pago seguro procesado por{' '}
                  <span className="font-medium text-blue-600">Wompi</span>
                </p>
                <div className="mt-2 flex justify-center space-x-4 text-xs text-gray-400">
                  <span>🔒 SSL</span>
                  <span>💳 Tarjetas</span>
                  <span>🏦 Bancos</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Necesitas ayuda?{' '}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Contacta soporte
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
