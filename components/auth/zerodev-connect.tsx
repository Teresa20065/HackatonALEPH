"use client"

import { Button } from "@/components/ui/button"
import { useZeroDev } from "@/hooks/use-zerodev"
import { useWalletConnect } from "@/hooks/use-wallet-connect"
import { Wallet, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function ZeroDevConnect() {
  const {
    isLoading: isZeroDevLoading,
    error: zeroDevError,
    isAuthenticated,
    zerodevUser,
    connectWithZeroDev,
    disconnect: disconnectZeroDev,
    address,
    isConnected,
    chain,
  } = useZeroDev()

  const {
    isInitializing,
    isConnecting,
    error: walletError,
    connectWallet,
    disconnectWallet,
    connectors,
  } = useWalletConnect()

  // Usar el error más relevante
  const error = walletError || zeroDevError
  const isLoading = isInitializing || isConnecting || isZeroDevLoading

  if (isAuthenticated && zerodevUser) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-sm font-medium">
            {zerodevUser.name}
          </span>
          <Badge variant="outline" className="text-xs">
            {chain?.name || 'Unknown'}
          </Badge>
        </div>
        <Button variant="outline" size="sm" onClick={disconnectWallet}>
          Disconnect
        </Button>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet First
      </Button>
    )
  }

  if (error) {
    return (
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-red-500" />
        <span className="text-sm text-red-600">{error}</span>
        <Button variant="outline" size="sm" onClick={connectWithZeroDev}>
          Retry
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={connectWithZeroDev}
      disabled={isLoading}
      className="gap-2"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Wallet className="h-4 w-4" />
          Connect with ZeroDev
        </>
      )}
    </Button>
  )
}
