"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, DollarSign } from "lucide-react"
import { mockUserPortfolio, mockOrganizations } from "@/lib/mock-data"
import { format } from "date-fns"

export function DonationHistory() {
  const donations = mockUserPortfolio.donations

  const getOrganizationName = (orgId: string) => {
    const org = mockOrganizations.find((o) => o.id === orgId)
    return org?.name || "Unknown Organization"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getBlockchainColor = (blockchain: string) => {
    switch (blockchain) {
      case "ethereum":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "polygon":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "solana":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation History</CardTitle>
        <CardDescription>Your recent sustainable donations and their performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {donations.map((donation) => (
            <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{getOrganizationName(donation.organizationId)}</h4>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getStatusColor(donation.status)}>
                      {donation.status}
                    </Badge>
                    <Badge variant="outline" className={getBlockchainColor(donation.blockchain)}>
                      {donation.blockchain}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span>Principal: ${donation.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span>Interest: ${donation.interestGenerated.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{format(donation.createdAt, "MMM dd, yyyy")}</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground font-mono">{donation.transactionHash}</div>
              </div>

              <Button variant="ghost" size="sm" className="ml-4">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">View All Transactions</Button>
        </div>
      </CardContent>
    </Card>
  )
}
