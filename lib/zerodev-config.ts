import { ZeroDevProvider, createZeroDevClient } from '@zerodev/sdk'
import { ECDSAValidator } from '@zerodev/ecdsa-validator'
import { WebAuthnValidator } from '@zerodev/webauthn-key'

// Configuración de ZeroDev
export const zerodevConfig = {
  // Project ID de ZeroDev (necesitarás crear uno en https://dashboard.zerodev.app)
  projectId: process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID || 'your-zerodev-project-id',
  
  // RPC URLs para diferentes redes
  rpcUrls: {
    mainnet: process.env.NEXT_PUBLIC_MAINNET_RPC || 'https://eth-mainnet.g.alchemy.com/v2/your-api-key',
    polygon: process.env.NEXT_PUBLIC_POLYGON_RPC || 'https://polygon-mainnet.g.alchemy.com/v2/your-api-key',
    optimism: process.env.NEXT_PUBLIC_OPTIMISM_RPC || 'https://opt-mainnet.g.alchemy.com/v2/your-api-key',
    arbitrum: process.env.NEXT_PUBLIC_ARBITRUM_RPC || 'https://arb-mainnet.g.alchemy.com/v2/your-api-key',
  },
  
  // Configuración de validadores
  validators: {
    ecdsa: ECDSAValidator,
    webauthn: WebAuthnValidator,
  },
  
  // Configuración de bundler
  bundlerUrl: process.env.NEXT_PUBLIC_BUNDLER_URL || 'https://api.zerodev.app',
  
  // Configuración de paymaster
  paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL || 'https://api.zerodev.app',
}

// Crear cliente de ZeroDev
export const createZeroDevClientInstance = (chainId: number) => {
  const rpcUrl = Object.values(zerodevConfig.rpcUrls).find(url => url.includes('alchemy'))
  
  return createZeroDevClient({
    projectId: zerodevConfig.projectId,
    chainId,
    rpcUrl: rpcUrl || 'https://eth-mainnet.g.alchemy.com/v2/demo',
    bundlerUrl: zerodevConfig.bundlerUrl,
    paymasterUrl: zerodevConfig.paymasterUrl,
  })
}

// Tipos para la autenticación
export interface ZeroDevUser {
  id: string
  email?: string
  walletAddress: string
  name: string
  avatar?: string
  chainId: number
}

// Configuración de redes soportadas
export const supportedChains = [
  { id: 1, name: 'Ethereum', rpc: zerodevConfig.rpcUrls.mainnet },
  { id: 137, name: 'Polygon', rpc: zerodevConfig.rpcUrls.polygon },
  { id: 10, name: 'Optimism', rpc: zerodevConfig.rpcUrls.optimism },
  { id: 42161, name: 'Arbitrum', rpc: zerodevConfig.rpcUrls.arbitrum },
]
