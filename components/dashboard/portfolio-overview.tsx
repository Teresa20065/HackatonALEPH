"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, DollarSign, Percent, ArrowUpRight, BarChart3 } from "lucide-react"
import { mockUserPortfolio } from "@/lib/mock-data"
import Link from "next/link"

export function PortfolioOverview() {
  const portfolio = mockUserPortfolio

  const stats = [
    {
      title: "Total Deposited",
      value: `$${portfolio.totalDonated.toLocaleString()}`,
      description: "Your principal amount",
      icon: DollarSign,
      trend: null,
    },
    {
      title: "Interest Generated",
      value: `$${portfolio.totalInterestGenerated.toLocaleString()}`,
      description: "Total earnings from DeFi",
      icon: TrendingUp,
      trend: "+12.5%",
    },
    {
      title: "Interest Donated",
      value: `$${portfolio.totalInterestDonated.toLocaleString()}`,
      description: "Donated to organizations",
      icon: Percent,
      trend: "+8.2%",
    },
    {
      title: "Available to Withdraw",
      value: `$${portfolio.availableToWithdraw.toLocaleString()}`,
      description: "Unused interest earnings",
      icon: ArrowUpRight,
      trend: null,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-montserrat">Portfolio Overview</h2>
          <p className="text-muted-foreground">Track your sustainable donations and impact</p>
        </div>
        <Link href="/impact">
          <Button variant="outline" size="sm" className="bg-transparent">
            <BarChart3 className="mr-2 h-4 w-4" />
            View Impact Details
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{stat.description}</span>
                {stat.trend && <span className="text-green-600 font-medium">{stat.trend}</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
