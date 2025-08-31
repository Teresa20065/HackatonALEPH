"use client"

import { useState } from "react"
import { useAccount, useNetwork, useBalance } from "wagmi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Heart, Coins, AlertCircle } from "lucide-react"
import { donationTokens, supportedChains } from "@/lib/web3-config"

interface DonationFormProps {
  organizationId: string
  organizationName: string
  onSuccess?: (txHash: string) => void
}

export function DonationForm({ organizationId, organizationName, onSuccess }: DonationFormProps) {
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const [amount, setAmount] = useState("")
  const [token, setToken] = useState("USDC")
  const [isLoading, setIsLoading] = useState(false)

  const { data: balance } = useBalance({
    address,
    token: donationTokens[chain?.id as keyof typeof donationTokens]?.[token as keyof typeof donationTokens.mainnet] as any,
    watch: true,
  })

  const currentChain = Object.values(supportedChains).find(c => c.id === chain?.id)
  const availableTokens = chain ? donationTokens[chain.id as keyof typeof donationTokens] || {} : {}

  const handleDonation = async () => {
    if (!isConnected || !address || !amount) return

    setIsLoading(true)
    
    try {
      // Simular transacción de donación
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`
      
      // Aquí iría la lógica real de la transacción
      console.log(`Donating ${amount} ${token} to ${organizationName}`)
      console.log(`Transaction hash: ${mockTxHash}`)
      
      onSuccess?.(mockTxHash)
      setAmount("")
    } catch (error) {
      console.error("Donation failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isConnected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Make a Donation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Connect your wallet to make a donation to {organizationName}.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (!currentChain) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Unsupported Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please switch to a supported network to make donations.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Donate to {organizationName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Network Info */}
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            {currentChain.icon} {currentChain.name}
          </Badge>
        </div>

        {/* Token Selection */}
        <div className="space-y-2">
          <Label htmlFor="token">Token</Label>
          <Select value={token} onValueChange={setToken}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(availableTokens).map((tokenSymbol) => (
                <SelectItem key={tokenSymbol} value={tokenSymbol}>
                  {tokenSymbol}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />
          {balance && (
            <p className="text-sm text-muted-foreground">
              Balance: {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </p>
          )}
        </div>

        {/* Donation Button */}
        <Button
          onClick={handleDonation}
          disabled={!amount || parseFloat(amount) <= 0 || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Coins className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Heart className="h-4 w-4 mr-2" />
              Donate {amount} {token}
            </>
          )}
        </Button>

        {/* Info */}
        <p className="text-xs text-muted-foreground text-center">
          Your donation will be used to generate interest for environmental causes while keeping your principal intact.
        </p>
      </CardContent>
    </Card>
  )
}
