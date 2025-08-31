"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, TrendingUp } from "lucide-react"
import { mockOrganizations } from "@/lib/mock-data"
import Image from "next/image"

export function RecommendedOrganizations() {
  // Show organizations that user hasn't donated to yet
  const recommendedOrgs = mockOrganizations.slice(0, 2)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Heart className="h-5 w-5" />
          <span>Recommended</span>
        </CardTitle>
        <CardDescription>New organizations that match your interests</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendedOrgs.map((org) => {
          const fundingPercentage = (org.currentFunding / org.fundingGoal) * 100

          return (
            <div key={org.id} className="space-y-3 p-3 border rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                  <Image src={org.image || "/placeholder.svg"} alt={org.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm truncate">{org.name}</h4>
                  <Badge variant="outline" className="text-xs mt-1">
                    {org.category}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{Math.round(fundingPercentage)}%</span>
                </div>
                <Progress value={fundingPercentage} className="h-1" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>{(org.interestRate * 100).toFixed(1)}% APY</span>
                </div>
                <Button size="sm" variant="outline">
                  Donate
                </Button>
              </div>
            </div>
          )
        })}

        <Button variant="ghost" className="w-full text-sm">
          View All Organizations
        </Button>
      </CardContent>
    </Card>
  )
}
