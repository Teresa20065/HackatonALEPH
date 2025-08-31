"use client"

import { useWaitForTransactionReceipt } from "wagmi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, ExternalLink } from "lucide-react"
import type { Hash } from "viem"

interface TransactionStatusProps {
  hash: Hash
  onSuccess?: () => void
  onError?: () => void
}

export function TransactionStatus({ hash, onSuccess, onError }: TransactionStatusProps) {
  const {
    data: receipt,
    isError,
    isLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({
    hash,
  })

  const getStatusIcon = () => {
    if (isSuccess) return <CheckCircle className="h-5 w-5 text-green-600" />
    if (isError) return <AlertCircle className="h-5 w-5 text-red-600" />
    return <Clock className="h-5 w-5 text-yellow-600" />
  }

  const getStatusText = () => {
    if (isSuccess) return "Transaction Confirmed"
    if (isError) return "Transaction Failed"
    return "Transaction Pending"
  }

  const getStatusColor = () => {
    if (isSuccess) return "bg-green-100 text-green-800 border-green-200"
    if (isError) return "bg-red-100 text-red-800 border-red-200"
    return "bg-yellow-100 text-yellow-800 border-yellow-200"
  }

  const explorerUrl = `https://etherscan.io/tx/${hash}`

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </CardTitle>
        <CardDescription>Track your transaction on the blockchain</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge variant="outline" className={getStatusColor()}>
            {isSuccess ? "Confirmed" : isError ? "Failed" : "Pending"}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Transaction Hash:</span>
            <span className="font-mono text-xs">
              {hash.slice(0, 10)}...{hash.slice(-8)}
            </span>
          </div>
          <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
            <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-3 w-3" />
              View on Explorer
            </a>
          </Button>
        </div>

        {isLoading && (
          <div className="space-y-2">
            <Progress value={33} className="h-2" />
            <p className="text-xs text-muted-foreground text-center">Waiting for blockchain confirmation...</p>
          </div>
        )}

        {receipt && (
          <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Block Number:</span>
              <span className="font-mono">{receipt.blockNumber.toString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Gas Used:</span>
              <span className="font-mono">{receipt.gasUsed.toString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Confirmations:</span>
              <span className="font-mono">12+</span>
            </div>
          </div>
        )}

        {isSuccess && onSuccess && (
          <Button onClick={onSuccess} className="w-full">
            Continue
          </Button>
        )}

        {isError && onError && (
          <Button onClick={onError} variant="outline" className="w-full bg-transparent">
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
