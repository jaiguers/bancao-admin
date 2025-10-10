// Sistema de autenticación con backend real
export interface User {
  id: string
  name: string
  lastname: string
  email: string
  password: string
  phone: string
  role: string
  isActive: boolean
  createdAt: string
}

export interface AuthResponse {
  token: string
  user: User
}

// Claves para localStorage
const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

// Obtener token del localStorage
export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY)
  }
  return null
}

// Obtener usuario del localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem(USER_KEY)
    return userStr ? JSON.parse(userStr) : null
  }
  return null
}

// Guardar datos de autenticación
export const setAuthData = (token: string, user: User): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }
}

// Limpiar datos de autenticación
export const clearAuthData = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }
}

// Verificar si está autenticado
export const isAuthenticated = (): boolean => {
  const token = getToken()
  return !!token
}

// Autenticar usuario con backend
export const authenticateUser = async ({ email, password }: { email: string; password: string }): Promise<AuthResponse | null> => {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_URL_BASE_BACKEND || 'http://localhost:8080/api/'
    const response = await fetch(`${backendUrl}auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    })

    if (response.ok) {
      const data = await response.json()
      return data
    }
    return null
  } catch (error) {
    console.error('Error en autenticación:', error)
    return null
  }
}

// Función de logout
export const logout = (): void => {
  clearAuthData()
}

// Objeto auth para compatibilidad
export const auth = {
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    const result = await authenticateUser({ email, password })
    if (result) {
      setAuthData(result.token, result.user)
      return { success: true, user: result.user }
    }
    return { success: false, error: 'Credenciales inválidas' }
  },
  logout,
  isAuthenticated,
  getCurrentUser
}

export function generateToken(user: User): string {
  // Mock JWT token generation (replace with real implementation as needed)
  // Example: base64 encode user id and email
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({ id: user.id, email: user.email, name: user.name, role: user.role })).toString('base64');
  const signature = 'mock-signature';
  return `${header}.${payload}.${signature}`;
}
