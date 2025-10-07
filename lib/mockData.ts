export interface User {
  id: string
  nombre: string
  cedula: string
  celular: string
  email: string
  fechaRegistro: string
}

export interface Transaction {
  id: string
  referencia: string
  monto: number
  fecha: string
  estado: 'Aceptada' | 'Abierta' | 'Borrador' | 'Pendiente' | 'Completada' | 'Cancelada' | 'pending' | 'approved' | 'rejected' | 'reviewed'
  cliente: string
  vencimiento: string
  fechaCreacion: string
  // Nuevos campos del backend
  payment_method?: string
  amount?: number
  destination_account?: string
  source_account?: string
  beneficiary?: string
  whatsapp_phone?: string
  support_url?: string
  date?: string
  userId?: string
  createdAt?: string
  updatedAt?: string
}

export const mockUsers: User[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    cedula: '12345678',
    celular: '+57 300 123 4567',
    email: 'juan.perez@email.com',
    fechaRegistro: '2024-01-15'
  },
  {
    id: '2',
    nombre: 'María García',
    cedula: '87654321',
    celular: '+57 300 234 5678',
    email: 'maria.garcia@email.com',
    fechaRegistro: '2024-01-20'
  },
  {
    id: '3',
    nombre: 'Carlos López',
    cedula: '11223344',
    celular: '+57 300 345 6789',
    email: 'carlos.lopez@email.com',
    fechaRegistro: '2024-02-01'
  },
  {
    id: '4',
    nombre: 'Ana Rodríguez',
    cedula: '55667788',
    celular: '+57 300 456 7890',
    email: 'ana.rodriguez@email.com',
    fechaRegistro: '2024-02-10'
  },
  {
    id: '5',
    nombre: 'Luis Martínez',
    cedula: '99887766',
    celular: '+57 300 567 8901',
    email: 'luis.martinez@email.com',
    fechaRegistro: '2024-02-15'
  },
  {
    id: '6',
    nombre: 'Sofia Herrera',
    cedula: '44332211',
    celular: '+57 300 678 9012',
    email: 'sofia.herrera@email.com',
    fechaRegistro: '2024-03-01'
  },
  {
    id: '7',
    nombre: 'Diego Silva',
    cedula: '77889900',
    celular: '+57 300 789 0123',
    email: 'diego.silva@email.com',
    fechaRegistro: '2024-03-05'
  },
  {
    id: '8',
    nombre: 'Valentina Cruz',
    cedula: '00112233',
    celular: '+57 300 890 1234',
    email: 'valentina.cruz@email.com',
    fechaRegistro: '2024-03-10'
  },
  {
    id: '9',
    nombre: 'Andrés Morales',
    cedula: '44556677',
    celular: '+57 300 901 2345',
    email: 'andres.morales@email.com',
    fechaRegistro: '2024-03-15'
  },
  {
    id: '10',
    nombre: 'Camila Vega',
    cedula: '88990011',
    celular: '+57 300 012 3456',
    email: 'camila.vega@email.com',
    fechaRegistro: '2024-03-20'
  },
  {
    id: '11',
    nombre: 'Roberto Jiménez',
    cedula: '22334455',
    celular: '+57 300 123 4567',
    email: 'roberto.jimenez@email.com',
    fechaRegistro: '2024-04-01'
  },
  {
    id: '12',
    nombre: 'Isabella Torres',
    cedula: '66778899',
    celular: '+57 300 234 5678',
    email: 'isabella.torres@email.com',
    fechaRegistro: '2024-04-05'
  },
  {
    id: '13',
    nombre: 'Sebastián Ruiz',
    cedula: '33445566',
    celular: '+57 300 345 6789',
    email: 'sebastian.ruiz@email.com',
    fechaRegistro: '2024-04-10'
  },
  {
    id: '14',
    nombre: 'Natalia Mendoza',
    cedula: '77889900',
    celular: '+57 300 456 7890',
    email: 'natalia.mendoza@email.com',
    fechaRegistro: '2024-04-15'
  },
  {
    id: '15',
    nombre: 'Gabriel Castro',
    cedula: '11223344',
    celular: '+57 300 567 8901',
    email: 'gabriel.castro@email.com',
    fechaRegistro: '2024-04-20'
  }
]

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    referencia: 'E069C287-0001',
    monto: 5000.00,
    fecha: '2024-05-06',
    estado: 'Aceptada',
    cliente: 'bo@bobikeshop.com',
    vencimiento: '12 de julio',
    fechaCreacion: '6 de mayo, 10:53'
  },
  {
    id: '2',
    referencia: '963A2634-0027',
    monto: 99.00,
    fecha: '2024-05-05',
    estado: 'Abierta',
    cliente: 'admin@rollinghills.com',
    vencimiento: '31 de mayo',
    fechaCreacion: '5 de mayo, 14:05'
  },
  {
    id: '3',
    referencia: '6D9E4FE-0005',
    monto: 50.00,
    fecha: '2024-05-04',
    estado: 'Aceptada',
    cliente: 'tyler@moraiwine.com',
    vencimiento: '30 de mayo',
    fechaCreacion: '4 de mayo, 09:36'
  },
  {
    id: '4',
    referencia: 'B2F8A1C3-0012',
    monto: 249.00,
    fecha: '2024-05-04',
    estado: 'Aceptada',
    cliente: 'sue@urbangallery.com',
    vencimiento: '30 de junio',
    fechaCreacion: '4 de mayo, 06:53'
  },
  {
    id: '5',
    referencia: 'F4E7B9D2-0008',
    monto: 99.00,
    fecha: '2024-05-03',
    estado: 'Borrador',
    cliente: 'pj@toysandgames.com',
    vencimiento: '15 de junio',
    fechaCreacion: '3 de mayo, 16:22'
  },
  {
    id: '6',
    referencia: 'A8C5F1E9-0015',
    monto: 50.00,
    fecha: '2024-05-03',
    estado: 'Aceptada',
    cliente: 'ar-team@rocketrides.com',
    vencimiento: '25 de mayo',
    fechaCreacion: '3 de mayo, 11:45'
  },
  {
    id: '7',
    referencia: 'D3B6A8F2-0023',
    monto: 99.00,
    fecha: '2024-05-02',
    estado: 'Abierta',
    cliente: 'accounts@powdur.com',
    vencimiento: '20 de junio',
    fechaCreacion: '2 de mayo, 13:18'
  },
  {
    id: '8',
    referencia: 'C7E4F9A1-0019',
    monto: 1000.00,
    fecha: '2024-05-02',
    estado: 'Aceptada',
    cliente: 'jen@pipersupplies.com',
    vencimiento: '10 de julio',
    fechaCreacion: '2 de mayo, 08:30'
  },
  {
    id: '9',
    referencia: 'F1A5C8E3-0011',
    monto: 99.00,
    fecha: '2024-05-01',
    estado: 'Borrador',
    cliente: 'micaela@rainierco.com',
    vencimiento: '5 de junio',
    fechaCreacion: '1 de mayo, 15:42'
  },
  {
    id: '10',
    referencia: 'B9D2F6A4-0020',
    monto: 99.00,
    fecha: '2024-05-01',
    estado: 'Aceptada',
    cliente: 'email@acmecorp.com',
    vencimiento: '18 de mayo',
    fechaCreacion: '1 de mayo, 09:15'
  },
  {
    id: '11',
    referencia: 'E8A3F7C2-0014',
    monto: 750.00,
    fecha: '2024-04-30',
    estado: 'Pendiente',
    cliente: 'contact@techstart.com',
    vencimiento: '28 de mayo',
    fechaCreacion: '30 de abril, 14:20'
  },
  {
    id: '12',
    referencia: 'D5B1E9F3-0017',
    monto: 150.00,
    fecha: '2024-04-29',
    estado: 'Completada',
    cliente: 'info@designstudio.com',
    vencimiento: '22 de mayo',
    fechaCreacion: '29 de abril, 10:35'
  },
  {
    id: '13',
    referencia: 'A2C6F8B4-0025',
    monto: 300.00,
    fecha: '2024-04-28',
    estado: 'Cancelada',
    cliente: 'support@webdev.com',
    vencimiento: '15 de mayo',
    fechaCreacion: '28 de abril, 16:50'
  },
  {
    id: '14',
    referencia: 'F7E1A9C5-0013',
    monto: 85.00,
    fecha: '2024-04-27',
    estado: 'Aceptada',
    cliente: 'hello@marketing.com',
    vencimiento: '12 de mayo',
    fechaCreacion: '27 de abril, 12:08'
  },
  {
    id: '15',
    referencia: 'B4D8F2A6-0022',
    monto: 2000.00,
    fecha: '2024-04-26',
    estado: 'Abierta',
    cliente: 'sales@enterprise.com',
    vencimiento: '8 de junio',
    fechaCreacion: '26 de abril, 09:25'
  }
]

// Función para simular delay de API
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

