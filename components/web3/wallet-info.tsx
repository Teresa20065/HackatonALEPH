"use client"

import { useAccount, useBalance, useNetwork, useSwitchNetwork } from "wagmi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wallet, Coins, Network } from "lucide-react"
import { supportedChains } from "@/lib/web3-config"

export function WalletInfo() {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { data: balance } = useBalance({
    address,
    watch: true,
  })

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Wallet Not Connected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Connect your wallet to view your balance and manage donations.
          </p>
        </CardContent>
      </Card>
    )
  }

  const currentChain = Object.values(supportedChains).find(c => c.id === chain?.id)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Wallet Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Address */}
        <div>
          <p className="text-sm font-medium text-muted-foreground">Address</p>
          <p className="font-mono text-sm">{address}</p>
        </div>

        {/* Network */}
        <div>
          <p className="text-sm font-medium text-muted-foreground">Network</p>
          <div className="flex items-center gap-2">
            <Badge variant="outline">
              {currentChain?.icon} {currentChain?.name}
            </Badge>
            {chain && !currentChain && (
              <Badge variant="destructive">Unsupported Network</Badge>
            )}
          </div>
        </div>

        {/* Balance */}
        <div>
          <p className="text-sm font-medium text-muted-foreground">Balance</p>
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            <span className="font-mono">
              {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : "Loading..."}
            </span>
          </div>
        </div>

        {/* Network Switcher */}
        {chain && !currentChain && (
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Switch to Supported Network</p>
            <div className="flex flex-wrap gap-2">
              {Object.values(supportedChains).map((supportedChain) => (
                <Button
                  key={supportedChain.id}
                  variant="outline"
                  size="sm"
                  onClick={() => switchNetwork?.(supportedChain.id)}
                  className="text-xs"
                >
                  {supportedChain.icon} {supportedChain.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
