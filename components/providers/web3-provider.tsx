"use client"

import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ConnectKitProvider } from "connectkit"
import { wagmiConfig } from "@/lib/web3-config"
import type { ReactNode } from "react"
import { useState, useEffect } from "react"

// Crear un QueryClient estable
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      retry: 1,
    },
  },
})

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider 
          theme="soft" 
          mode="light"
          customTheme={{
            "--ck-connectbutton-background": "hsl(var(--primary))",
            "--ck-connectbutton-hover-background": "hsl(var(--primary) / 0.8)",
            "--ck-connectbutton-active-background": "hsl(var(--primary) / 0.9)",
            "--ck-connectbutton-border-radius": "0.5rem",
            "--ck-connectbutton-font-weight": "600",
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
