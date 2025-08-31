"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { useSession, signIn, signOut } from 'next-auth/react'

export function useWalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isLoading: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: session, status } = useSession()
  
  const [isInitializing, setIsInitializing] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Inicialización controlada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitializing(false)
    }, 1000) // Esperar 1 segundo para que WalletConnect se inicialice

    return () => clearTimeout(timer)
  }, [])

  // Conectar wallet
  const connectWallet = useCallback(async (connectorId: string) => {
    try {
      setError(null)
      const connector = connectors.find(c => c.id === connectorId)
      
      if (!connector) {
        throw new Error('Connector no encontrado')
      }

      await connect({ connector })
    } catch (err) {
      console.error('Error connecting wallet:', err)
      setError(err instanceof Error ? err.message : 'Error al conectar wallet')
    }
  }, [connect, connectors])

  // Desconectar wallet
  const disconnectWallet = useCallback(async () => {
    try {
      await disconnect()
      await signOut({ redirect: false })
      setError(null)
    } catch (err) {
      console.error('Error disconnecting wallet:', err)
    }
  }, [disconnect, signOut])

  // Verificar si está autenticado
  const isAuthenticated = !!session && isConnected

  return {
    // Estado
    isInitializing,
    isConnecting,
    isConnected,
    isAuthenticated,
    error,
    
    // Acciones
    connectWallet,
    disconnectWallet,
    
    // Datos
    address,
    session,
    status,
    connectors: connectors.map(c => ({ id: c.id, name: c.name })),
  }
}
