import { createConfig, http } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import { getDefaultConfig } from 'connectkit'

// Crear la configuración de Wagmi usando ConnectKit
export const wagmiConfig = createConfig(
  getDefaultConfig({
    chains: [mainnet, polygon, optimism, arbitrum],
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || 'your-project-id',
    appName: 'Suma',
    appDescription: 'Sustainable Donations Platform',
    appUrl: 'https://suma.app',
    appIcon: '/logo.png',
    // Configuración ultra-optimizada para evitar múltiples inicializaciones
    enableWalletConnect: true,
    enableInjected: true,
    enableEIP6963: true,
    enableCoinbase: false,
    // Configuraciones adicionales para estabilidad
    enableExplorer: false,
    explorerRecommendedWalletIds: 'NONE',
    explorerExcludedWalletIds: 'ALL',
    // Configuraciones críticas para estabilidad
    enableAnalytics: false,
    enableOnramp: false,
    enableSwap: false,
    enableSmartAccount: false,
  })
)

// Tipos para las cadenas
export const supportedChains = {
  mainnet: {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '🔷',
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    icon: '🟣',
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    symbol: 'ETH',
    icon: '🔴',
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum',
    symbol: 'ETH',
    icon: '🔵',
  },
}

// Configuración de tokens para donaciones
export const donationTokens = {
  mainnet: {
    USDC: '0xA0b86a33E6441b8C4C8C8C8C8C8C8C8C8C8C8C8',
    DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  polygon: {
    USDC: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    DAI: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    WMATIC: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
  },
}

// Configuración de contratos de staking (mock)
export const stakingContracts = {
  mainnet: {
    address: '0x1234567890123456789012345678901234567890',
    name: 'Suma Staking Pool',
    apy: 8.5,
  },
  polygon: {
    address: '0x0987654321098765432109876543210987654321',
    name: 'Suma Staking Pool',
    apy: 12.0,
  },
}
