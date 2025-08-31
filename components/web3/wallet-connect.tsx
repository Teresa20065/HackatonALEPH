"use client"

import { ConnectKitButton } from "connectkit"
import { Button } from "@/components/ui/button"
import { Wallet, ChevronDown } from "lucide-react"

export function WalletConnect() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnecting, show, address, ensName, truncatedAddress, isConnected }) => {
        return (
          <Button
            onClick={show}
            variant={isConnected ? "outline" : "default"}
            className="gap-2"
            disabled={isConnecting}
          >
            {isConnected ? (
              <>
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {ensName ?? truncatedAddress}
                </span>
                <ChevronDown className="h-4 w-4" />
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </>
            )}
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
