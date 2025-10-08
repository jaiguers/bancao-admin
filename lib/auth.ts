// Simulación simple de autenticación para el frontend
// En producción, esto se manejará desde el backend

export interface User {
  id: string
  email: string
  name: string
}

// Simular autenticación de usuario
export const authenticateUser = async ({ email, password }: { email: string; password: string }): Promise<User | null> => {
  // Simular validación de credenciales
  if (email && password) {
    return {
      id: '1',
      email: email,
      name: 'Administrador'
    }
  }
  return null
}

// Simular generación de token
export const generateToken = (user: User): string => {
  // En producción, esto sería un JWT real
  return `token_${user.id}_${Date.now()}`
}

// Simular estado de autenticación
let isAuthenticated = false
let currentUser: User | null = null

export const auth = {
  // Simular login
  login: (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    return new Promise((resolve) => {
      // Simular delay de API
      setTimeout(() => {
        // Simular credenciales válidas
        if (email && password) {
          isAuthenticated = true
          currentUser = {
            id: '1',
            email: email,
            name: 'Administrador'
          }
          resolve({ success: true, user: currentUser })
        } else {
          resolve({ success: false, error: 'Credenciales requeridas' })
        }
      }, 1000)
    })
  },

  // Simular logout
  logout: (): void => {
    isAuthenticated = false
    currentUser = null
  },

  // Verificar si está autenticado
  isAuthenticated: (): boolean => {
    return isAuthenticated
  },

  // Obtener usuario actual
  getCurrentUser: (): User | null => {
    return currentUser
  }
}
