import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { auth } from '../lib/auth'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirigir según el estado de autenticación
    if (auth.isAuthenticated()) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  )
}

