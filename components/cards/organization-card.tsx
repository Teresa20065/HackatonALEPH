"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Trees, Users, Droplets, Zap } from "lucide-react"
import type { Organization } from "@/lib/types"
import Image from "next/image"
import { useSession, signIn } from "next-auth/react"
import { useAccount } from "wagmi"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface OrganizationCardProps {
  organization: Organization
}

export function OrganizationCard({ organization }: OrganizationCardProps) {
  const { data: session } = useSession()
  const { isConnected } = useAccount()
  const [showDonationFlow, setShowDonationFlow] = useState(false)
  const fundingPercentage = (organization.currentFunding / organization.fundingGoal) * 100

  const getImpactIcon = (metric: string) => {
    switch (metric) {
      case "treesPlanted":
        return Trees
      case "peopleHelped":
        return Users
      case "waterSaved":
        return Droplets
      case "carbonOffset":
        return Zap
      default:
        return Trees
    }
  }

  const formatMetricValue = (key: string, value: number) => {
    switch (key) {
      case "treesPlanted":
        return `${value.toLocaleString()} trees`
      case "peopleHelped":
        return `${value.toLocaleString()} people`
      case "waterSaved":
        return `${value.toLocaleString()}L water`
      case "carbonOffset":
        return `${value.toLocaleString()}t CO₂`
      default:
        return value.toString()
    }
  }

  const handleDonate = () => {
    if (!session) {
      signIn()
      return
    }

    if (!isConnected) {
      // Show wallet connection prompt
      console.log("Please connect your wallet")
      return
    }

    setShowDonationFlow(true)
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image src={organization.image || "/placeholder.svg"} alt={organization.name} fill className="object-cover" />
          <div className="absolute top-4 right-4">
            {organization.verified && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                <CheckCircle className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">{organization.name}</h3>
              <Badge variant="outline" className="mb-3">
                {organization.category}
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">{organization.description}</p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Funding Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Funding Progress</span>
              <span className="font-medium">{Math.round(fundingPercentage)}%</span>
            </div>
            <Progress value={fundingPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>${organization.currentFunding.toLocaleString()}</span>
              <span>${organization.fundingGoal.toLocaleString()}</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div className="flex justify-between items-center py-2 px-3 bg-muted/50 rounded-lg">
            <span className="text-sm text-muted-foreground">Expected APY</span>
            <span className="font-semibold text-primary">{(organization.interestRate * 100).toFixed(1)}%</span>
          </div>

          {/* Impact Metrics */}
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(organization.impactMetrics).map(([key, value]) => {
              if (!value) return null
              const Icon = getImpactIcon(key)
              return (
                <div key={key} className="flex items-center gap-2 text-xs">
                  <Icon className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{formatMetricValue(key, value)}</span>
                </div>
              )
            })}
          </div>
        </CardContent>

        <CardFooter>
          <Button onClick={handleDonate} className="w-full">
            {!session ? "Sign In to Donate" : !isConnected ? "Connect Wallet" : "Donate Interest"}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showDonationFlow} onOpenChange={setShowDonationFlow}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Make a Sustainable Donation</DialogTitle>
            <DialogDescription>Your principal stays safe while interest supports the cause</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-center">
              <h4 className="font-semibold mb-2">Donation Coming Soon!</h4>
              <p className="text-sm text-muted-foreground">
                We're working on integrating ZeroDev for seamless donations. 
                Stay tuned for the full Web3 experience!
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowDonationFlow(false)}
                className="flex-1"
              >
                Close
              </Button>
              <Button 
                onClick={() => setShowDonationFlow(false)}
                className="flex-1"
              >
                Learn More
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
