# Bancao Admin Dashboard

Dashboard administrativo desarrollado con Next.js 14 (App Router), TypeScript y TailwindCSS. Incluye autenticación JWT, gestión de usuarios y transacciones con diseño responsive.

## Características

- ✅ **Dashboard Responsive**: Diseño adaptable a todos los dispositivos
- ✅ **Gestión de Usuarios**: Tabla con paginación y búsqueda
- ✅ **Gestión de Transacciones**: Tabla tipo stripe con estados visuales
- ✅ **Sidebar Navegable**: Menú lateral responsive
- ✅ **Búsqueda y Filtrado**: Funcionalidad completa en ambas tablas
- ✅ **Paginación**: Navegación por páginas en las tablas
- ✅ **Diseño Moderno**: Interfaz limpia y profesional
- 🔄 **Autenticación**: Preparado para integración con backend

## Tecnologías Utilizadas

- **Next.js 12** con Pages Router
- **TypeScript** para tipado estático
- **TailwindCSS** para estilos
- **Lucide React** para iconos

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd bancao-admin
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## Autenticación

La autenticación se implementará en el backend. Por ahora, cualquier credencial te llevará al dashboard.

## Estructura del Proyecto

```
bancao-admin/
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   │   └── auth/          # Endpoints de autenticación
│   ├── dashboard/         # Página principal del dashboard
│   ├── usuarios/          # Gestión de usuarios
│   ├── transacciones/     # Gestión de transacciones
│   ├── login/             # Página de login
│   └── globals.css        # Estilos globales
├── components/            # Componentes reutilizables
│   ├── Sidebar.tsx        # Barra lateral de navegación
│   ├── Header.tsx         # Encabezado del dashboard
│   ├── DataTable.tsx      # Tabla genérica con paginación
│   └── TransactionTable.tsx # Tabla específica de transacciones
├── lib/                   # Utilidades y lógica de negocio
│   ├── auth.ts           # Funciones de autenticación
│   ├── middleware.ts     # Middleware de autenticación
│   └── mockData.ts       # Datos de prueba
└── middleware.ts         # Middleware principal
```

## Funcionalidades

### Autenticación
- Preparado para integración con backend
- Formulario de login funcional
- Redirección automática al dashboard

### Dashboard
- Vista general con métricas
- Navegación intuitiva
- Diseño responsive

### Gestión de Usuarios
- Lista de usuarios con datos ficticios
- Búsqueda por nombre, cédula, celular o email
- Ordenamiento por columnas
- Paginación

### Gestión de Transacciones
- Lista de transacciones con datos ficticios
- Estados visuales con badges de colores
- Búsqueda por referencia, cliente, estado o monto
- Formato de moneda en USD
- Paginación

## Diseño Responsive

El dashboard está completamente optimizado para:

- **Desktop**: Sidebar fijo, tablas completas
- **Tablet**: Sidebar colapsable, tablas adaptadas
- **Mobile**: Sidebar overlay, tablas con scroll horizontal

## Scripts Disponibles

- `npm run dev`: Ejecuta el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run start`: Ejecuta la aplicación en producción
- `npm run lint`: Ejecuta el linter de ESLint

## Integración con Backend

Para conectar con tu backend de autenticación, actualiza los siguientes archivos:

- `pages/login.tsx`: Implementa la llamada a tu API de login
- `components/Sidebar.tsx`: Implementa la llamada a tu API de logout
- Agrega middleware de autenticación según tus necesidades

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

