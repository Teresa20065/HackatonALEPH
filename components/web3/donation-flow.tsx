"use client"

import { useState } from "react"
import { useAccount, useBalance, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { parseEther } from "viem"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle, Loader2, ArrowRight } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Organization } from "@/lib/types"

interface DonationFlowProps {
  organization: Organization
  goal?: { id: string; title: string; description: string; currentAmount: number; targetAmount: number } | null
  onClose: () => void
}

// Mock contract ABI for demonstration
const DONATION_CONTRACT_ABI = [
  {
    name: "donate",
    type: "function",
    stateMutability: "payable",
    inputs: [
      { name: "organizationId", type: "string" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
] as const

const DONATION_CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890" as const

export function DonationFlow({ organization, goal, onClose }: DonationFlowProps) {
  const [amount, setAmount] = useState("")
  const [selectedProtocol, setSelectedProtocol] = useState("")
  const [step, setStep] = useState<"input" | "confirm" | "processing" | "success">("input")

  const { address, isConnected, chain } = useAccount()
  const { data: balance } = useBalance({ address })
  const { writeContract, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const defiProtocols = [
    { id: "aave", name: "Aave", apy: 8.5, description: "Lending protocol" },
    { id: "compound", name: "Compound", apy: 7.2, description: "Money market protocol" },
    { id: "yearn", name: "Yearn Finance", apy: 9.1, description: "Yield optimization" },
  ]

  const handleDonate = async () => {
    if (!amount || !selectedProtocol || !isConnected) return

    try {
      setStep("processing")
      await writeContract({
        address: DONATION_CONTRACT_ADDRESS,
        abi: DONATION_CONTRACT_ABI,
        functionName: "donate",
        args: [goal ? goal.id : organization.id, parseEther(amount)],
        value: parseEther(amount),
      })
    } catch (error) {
      console.error("Donation failed:", error)
      setStep("input")
    }
  }

  const estimatedYearlyInterest = Number.parseFloat(amount || "0") * (organization.interestRate || 0.08)
  const selectedProtocolData = defiProtocols.find((p) => p.id === selectedProtocol)

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Donation Successful!</CardTitle>
          <CardDescription>
            {goal ? `Your sustainable donation to "${goal.title}" has been processed` : "Your sustainable donation has been processed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold">${amount}</div>
            <div className="text-sm text-muted-foreground">
              Deposited to {goal ? goal.title : organization.name}
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Expected Annual Interest:</span>
              <span className="font-medium">${estimatedYearlyInterest.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Protocol:</span>
              <span className="font-medium">{selectedProtocolData?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Transaction Hash:</span>
              <span className="font-mono text-xs">{hash?.slice(0, 10)}...</span>
            </div>
          </div>

          <Button onClick={onClose} className="w-full">
            View Dashboard
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {goal ? `Donate to ${goal.title}` : `Donate to ${organization.name}`}
        </CardTitle>
        <CardDescription>
          {goal ? goal.description : "Your principal stays safe while interest goes to the cause"}
        </CardDescription>
        {goal && (
          <div className="mt-2 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">
              <div className="flex justify-between mb-1">
                <span>Goal Progress:</span>
                <span className="font-medium">
                  ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                </span>
              </div>
              <Progress 
                value={(goal.currentAmount / goal.targetAmount) * 100} 
                className="h-2"
              />
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {step === "input" && (
          <>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Donation Amount</Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-8"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</div>
                </div>
                {balance && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Balance: {Number.parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="protocol">DeFi Protocol</Label>
                <Select value={selectedProtocol} onValueChange={setSelectedProtocol}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    {defiProtocols.map((protocol) => (
                      <SelectItem key={protocol.id} value={protocol.id}>
                        <div className="flex items-center justify-between w-full">
                          <div>
                            <div className="font-medium">{protocol.name}</div>
                            <div className="text-xs text-muted-foreground">{protocol.description}</div>
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            {protocol.apy}% APY
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {amount && selectedProtocol && (
                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">Donation Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <span className="font-medium">${amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Annual Interest:</span>
                      <span className="font-medium text-primary">${estimatedYearlyInterest.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Destination:</span>
                      <span className="font-medium">
                        {goal ? goal.title : organization.name}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Your ${amount} principal remains yours and can be withdrawn anytime. Only the interest goes to the
                    {goal ? ` "${goal.title}" project` : " organization"}.
                  </div>
                </div>
              )}
            </div>

            {!isConnected && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Please connect your wallet to continue</AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>Transaction failed. Please try again.</AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-3">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handleDonate}
                disabled={!amount || !selectedProtocol || !isConnected || isPending}
                className="flex-1"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Donate Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </>
        )}

        {step === "processing" && (
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
            <div>
              <h3 className="font-medium">Processing Donation</h3>
              <p className="text-sm text-muted-foreground">Please confirm the transaction in your wallet</p>
            </div>
            {isConfirming && (
              <div className="space-y-2">
                <Progress value={66} className="h-2" />
                <p className="text-xs text-muted-foreground">Waiting for blockchain confirmation...</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
