"use client"

import { useState, useEffect, useCallback } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import { createZeroDevClientInstance, type ZeroDevUser } from '@/lib/zerodev-config'
import { useSession, signIn, signOut } from 'next-auth/react'

export function useZeroDev() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { data: session, status } = useSession()
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [zerodevUser, setZerodevUser] = useState<ZeroDevUser | null>(null)

  // Conectar wallet con ZeroDev
  const connectWithZeroDev = useCallback(async () => {
    if (!address || !chain) {
      setError('Wallet no conectada')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Crear cliente de ZeroDev
      const client = createZeroDevClientInstance(chain.id)
      
      // Crear cuenta abstracta
      const account = await client.createAccount({
        owner: address,
        validator: 'ecdsa', // Usar ECDSA validator
      })

      // Crear usuario ZeroDev
      const user: ZeroDevUser = {
        id: account.address,
        walletAddress: address,
        name: `${address.slice(0, 6)}...${address.slice(-4)}`,
        chainId: chain.id,
      }

      setZerodevUser(user)

      // Iniciar sesión con NextAuth
      await signIn('wallet', {
        address: address,
        signature: account.address, // Usar la dirección de la cuenta como firma
        redirect: false,
      })

    } catch (err) {
      console.error('Error connecting with ZeroDev:', err)
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setIsLoading(false)
    }
  }, [address, chain])

  // Desconectar
  const disconnect = useCallback(async () => {
    try {
      await signOut({ redirect: false })
      setZerodevUser(null)
      setError(null)
    } catch (err) {
      console.error('Error disconnecting:', err)
    }
  }, [])

  // Cambiar red
  const changeNetwork = useCallback(async (chainId: number) => {
    try {
      await switchNetwork?.(chainId)
    } catch (err) {
      console.error('Error switching network:', err)
      setError('Error al cambiar de red')
    }
  }, [switchNetwork])

  // Verificar si el usuario está autenticado
  const isAuthenticated = !!session && !!zerodevUser

  // Efecto para sincronizar con la sesión
  useEffect(() => {
    if (session && address && chain && !zerodevUser) {
      // Usuario ya autenticado, crear ZeroDev user
      const user: ZeroDevUser = {
        id: address,
        walletAddress: address,
        name: (session.user as any).name || `${address.slice(0, 6)}...${address.slice(-4)}`,
        chainId: chain.id,
      }
      setZerodevUser(user)
    }
  }, [session, address, chain, zerodevUser])

  return {
    // Estado
    isLoading,
    error,
    isAuthenticated,
    zerodevUser,
    
    // Acciones
    connectWithZeroDev,
    disconnect,
    changeNetwork,
    
    // Estado de la wallet
    address,
    isConnected,
    chain,
    
    // Estado de la sesión
    session,
    status,
  }
}
