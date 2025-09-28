# Página de Depósito - Integración con Wompi

Esta página permite a los usuarios depositar saldo a su cuenta sin necesidad de autenticación, utilizando la pasarela de pagos Wompi con WidgetCheckout.

## Características

- ✅ **Sin autenticación requerida**: Los usuarios pueden depositar sin login
- ✅ **Integración directa con WidgetCheckout**: Usa el widget oficial de Wompi
- ✅ **Generación automática de referencia**: Formato `BANCAW-A-{GUID}`
- ✅ **Hash SHA256 de integridad**: Seguridad en las transacciones
- ✅ **Monto fijo**: Depósito de $10 COP (1000 centavos)
- ✅ **Apertura automática**: El widget se abre automáticamente al cargar la página
- ✅ **Diseño responsive**: Optimizado para móviles y desktop
- ✅ **Manejo de errores**: Feedback claro al usuario

## Configuración

### 1. Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_WOMPI_PUBLIC_KEY=pub_test_tu_clave_publica_aqui
NEXT_PUBLIC_INTEGRITY_KEY_WOMPI=tu_secreto_integridad_aqui
```

### 2. Obtener Credenciales de Wompi

1. Regístrate en [Wompi](https://wompi.co)
2. Ve a la sección "Desarrolladores"
3. Obtén tu clave pública y secreto de integridad
4. Configura las variables de entorno

## Funcionamiento

### Generación de Referencia
- Formato: `BANCAW-A-{GUID}`
- Ejemplo: `BANCAW-A-123e4567-e89b-12d3-a456-426614174000`

### Hash de Integridad
Se genera concatenando en este orden:
1. Referencia
2. Monto (en centavos)
3. "COP"
4. Secreto de integridad

Ejemplo:
```
Referencia: BANCAW-A-123e4567-e89b-12d3-a456-426614174000
Monto: 10000 (para $100 COP)
Moneda: COP
Secreto: tu_secreto_integridad

Cadena: BANCAW-A-123e4567-e89b-12d3-a456-42661417400010000COPtu_secreto_integridad
Hash SHA256: [hash_generado]
```

## Uso

1. Navega a `/deposito`
2. La página se carga automáticamente
3. Se genera la referencia y hash de integridad
4. Se abre automáticamente el widget de Wompi
5. Completa el pago de $10 COP con tu método preferido

## Estructura del Código

### Componentes Principales

- **Carga automática**: Script de Wompi se carga al montar el componente
- **Generación de GUID**: Función para crear referencias únicas
- **Hash SHA256**: Función para generar firma de integridad
- **WidgetCheckout**: Integración directa con el widget de Wompi
- **Monto fijo**: $10 COP (1000 centavos) predefinido

### Flujo de Transacción

1. Usuario navega a `/deposito`
2. Se carga el script de Wompi
3. Se genera referencia única automáticamente
4. Se calcula hash de integridad
5. Se configura WidgetCheckout de Wompi
6. Se abre automáticamente el widget
7. Usuario completa el pago
8. Se maneja respuesta (éxito/error)

## Seguridad

- ✅ Hash SHA256 para verificar integridad
- ✅ Referencias únicas por transacción
- ✅ Validación de montos
- ✅ Manejo seguro de variables de entorno

## Personalización

### Estilos
La página usa TailwindCSS y puede personalizarse modificando las clases en `pages/deposito.tsx`.

### Configuración de Wompi
Puedes modificar la configuración del widget en la función `inicializarWompiCheckout()`:

```javascript
const checkout = new window.WidgetCheckout({
  currency: 'COP',
  amountInCents: 1000, // $10 COP
  reference: referencia,
  publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
  signature: {
    integrity: hashIntegridad
  },
  redirectUrl: `${window.location.origin}/deposito?success=true`,
  expirationTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  customerData: {
    email: 'usuario@bancao.com',
    fullName: 'Usuario Bancao',
    phoneNumber: '3001234567',
    phoneNumberPrefix: '+57',
    legalId: '123456789',
    legalIdType: 'CC'
  }
})
```

## Testing

Para probar en modo desarrollo:
1. Usa las credenciales de prueba de Wompi
2. Utiliza tarjetas de prueba proporcionadas por Wompi
3. Verifica que las transacciones aparezcan en tu dashboard de Wompi

## Soporte

Si tienes problemas:
1. Verifica las variables de entorno
2. Revisa la consola del navegador
3. Consulta la documentación oficial de Wompi
4. Verifica que el script de Wompi se cargue correctamente
