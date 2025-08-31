# 🚀 Configuración de ZeroDev para Suma

## **¿Qué es ZeroDev?**

ZeroDev es una solución de **Account Abstraction (AA)** que permite a los usuarios conectarse con sus wallets sin necesidad de contraseñas tradicionales. Proporciona:

- ✅ **Autenticación sin contraseña** usando wallets Web3
- ✅ **Cuentas abstractas** para mejor UX
- ✅ **Soporte multi-chain** (Ethereum, Polygon, Optimism, Arbitrum)
- ✅ **Seguridad mejorada** con validadores ECDSA y WebAuthn

## **🔧 Configuración Paso a Paso**

### **1. Crear Proyecto en ZeroDev**

1. Ve a [https://dashboard.zerodev.app](https://dashboard.zerodev.app)
2. Crea una nueva cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Copia el **Project ID**

### **2. Configurar Variables de Entorno**

Copia `.env.example` a `.env.local` y actualiza:

```bash
# ZeroDev Configuration
NEXT_PUBLIC_ZERODEV_PROJECT_ID=tu-project-id-de-zerodev
NEXT_PUBLIC_BUNDLER_URL=https://api.zerodev.app
NEXT_PUBLIC_PAYMASTER_URL=https://api.zerodev.app

# Alchemy RPC URLs (opcional)
NEXT_PUBLIC_MAINNET_RPC=https://eth-mainnet.g.alchemy.com/v2/tu-api-key
NEXT_PUBLIC_POLYGON_RPC=https://polygon-mainnet.g.alchemy.com/v2/tu-api-key
```

### **3. Configurar RPC URLs (Opcional)**

Para mejor rendimiento, puedes configurar tus propios RPC endpoints:

1. Ve a [Alchemy](https://www.alchemy.com/) o [Infura](https://infura.io/)
2. Crea proyectos para las redes que quieras soportar
3. Copia las URLs de RPC a las variables de entorno

## **🎯 Funcionalidades Implementadas**

### **Autenticación Web3**
- **Login con wallet** usando ZeroDev
- **Registro automático** de usuarios
- **Sesiones persistentes** con NextAuth
- **Soporte multi-chain**

### **Componentes Creados**
- `ZeroDevConnect` - Botón de conexión principal
- `useZeroDev` - Hook personalizado para la lógica
- Configuración completa de ZeroDev

### **Integración con NextAuth**
- Provider personalizado para wallets
- Manejo de sesiones JWT
- Sincronización automática de usuarios

## **🚀 Uso en la Aplicación**

### **Página de Login**
```tsx
import { ZeroDevConnect } from "@/components/auth/zerodev-connect"

// En la pestaña de wallet
<ZeroDevConnect />
```

### **Hook Personalizado**
```tsx
import { useZeroDev } from "@/hooks/use-zerodev"

const { connectWithZeroDev, isAuthenticated, zerodevUser } = useZeroDev()
```

## **🔍 Flujo de Autenticación**

1. **Usuario conecta wallet** (MetaMask, WalletConnect, etc.)
2. **ZeroDev crea cuenta abstracta** para la wallet
3. **NextAuth inicia sesión** usando la dirección de la cuenta
4. **Usuario autenticado** puede acceder al dashboard

## **⚠️ Notas Importantes**

- **Project ID requerido**: Debes crear un proyecto en ZeroDev
- **RPC URLs**: Recomendado configurar tus propios endpoints
- **Redes soportadas**: Ethereum, Polygon, Optimism, Arbitrum
- **Validadores**: ECDSA (por defecto) y WebAuthn (opcional)

## **🆘 Solución de Problemas**

### **Error: "Project ID not found"**
- Verifica que `NEXT_PUBLIC_ZERODEV_PROJECT_ID` esté configurado
- Confirma que el Project ID sea válido en el dashboard

### **Error: "RPC connection failed"**
- Verifica las URLs de RPC en las variables de entorno
- Considera usar endpoints públicos como fallback

### **Wallet no se conecta**
- Asegúrate de que MetaMask o WalletConnect estén instalados
- Verifica que estés en una red soportada

## **📚 Recursos Adicionales**

- [Documentación de ZeroDev](https://docs.zerodev.app/)
- [Dashboard de ZeroDev](https://dashboard.zerodev.app/)
- [Account Abstraction EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Alchemy RPC Endpoints](https://www.alchemy.com/)

---

**¡Listo! 🎉** Tu aplicación Suma ahora tiene autenticación Web3 moderna con ZeroDev.
