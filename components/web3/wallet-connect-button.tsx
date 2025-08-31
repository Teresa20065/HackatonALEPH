"use client"

import { ConnectKitButton } from "connectkit"
import { Button } from "@/components/ui/button"
import { Wallet, ChevronDown } from "lucide-react"
import { useAccount, useBalance, useDisconnect } from "wagmi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export function WalletConnectButton() {
  const { address, isConnected, chain } = useAccount()
  const { data: balance } = useBalance({ address })
  const { disconnect } = useDisconnect()

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, truncatedAddress, ensName }) => {
        if (isConnected && address) {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-mono text-sm">{ensName ?? truncatedAddress}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <span className="font-mono text-sm">{ensName ?? truncatedAddress}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {chain?.name || "Unknown"}
                      </Badge>
                      {balance && (
                        <span className="text-xs text-muted-foreground">
                          {Number.parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                        </span>
                      )}
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(address)}>Copy Address</DropdownMenuItem>
                <DropdownMenuItem onClick={() => show?.()}>Switch Wallet</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => disconnect()} className="text-red-600">
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        }

        return (
          <Button onClick={show} className="flex items-center space-x-2">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
        )
      }}
    </ConnectKitButton.Custom>
  )
}
