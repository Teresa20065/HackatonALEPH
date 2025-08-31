"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownToLine, Wallet } from "lucide-react"
import { mockUserPortfolio } from "@/lib/mock-data"
import { useState } from "react"

export function WithdrawFunds() {
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [withdrawType, setWithdrawType] = useState("")

  const portfolio = mockUserPortfolio
  const maxWithdrawable = portfolio.availableToWithdraw

  const handleWithdraw = () => {
    // TODO: Implement withdrawal logic
    console.log("Withdrawing", withdrawAmount, "as", withdrawType)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Wallet className="h-5 w-5" />
          <span>Withdraw Funds</span>
        </CardTitle>
        <CardDescription>Withdraw your unused interest earnings or principal amount</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground">Available to withdraw</div>
          <div className="text-2xl font-bold text-primary">${maxWithdrawable.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1">Unused interest earnings</div>
        </div>

        <div className="space-y-3">
          <div>
            <Label htmlFor="withdraw-type">Withdrawal Type</Label>
            <Select value={withdrawType} onValueChange={setWithdrawType}>
              <SelectTrigger>
                <SelectValue placeholder="Select withdrawal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="interest">Interest Only</SelectItem>
                <SelectItem value="principal">Principal + Interest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="withdraw-amount">Amount</Label>
            <div className="relative">
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="pl-8"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">Max: ${maxWithdrawable.toLocaleString()}</div>
          </div>

          <Button onClick={handleWithdraw} className="w-full" disabled={!withdrawAmount || !withdrawType}>
            <ArrowDownToLine className="mr-2 h-4 w-4" />
            Withdraw Funds
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Interest withdrawals are instant</p>
          <p>• Principal withdrawals may take 1-3 days</p>
          <p>• Gas fees apply for blockchain transactions</p>
        </div>
      </CardContent>
    </Card>
  )
}
