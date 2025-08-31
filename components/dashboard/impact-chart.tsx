"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "Jan", interest: 45, donated: 40 },
  { month: "Feb", interest: 52, donated: 48 },
  { month: "Mar", interest: 48, donated: 45 },
  { month: "Apr", interest: 61, donated: 58 },
  { month: "May", interest: 55, donated: 52 },
  { month: "Jun", interest: 67, donated: 63 },
  { month: "Jul", interest: 72, donated: 68 },
  { month: "Aug", interest: 69, donated: 65 },
  { month: "Sep", interest: 76, donated: 72 },
  { month: "Oct", interest: 82, donated: 78 },
  { month: "Nov", interest: 78, donated: 74 },
  { month: "Dec", interest: 85, donated: 80 },
]

const chartConfig = {
  interest: {
    label: "Interest Generated",
    color: "hsl(var(--primary))",
  },
  donated: {
    label: "Interest Donated",
    color: "hsl(var(--secondary))",
  },
}

export function ImpactChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interest Generation & Donations</CardTitle>
        <CardDescription>Monthly breakdown of your sustainable impact</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="fillInterest" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillDonated" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value}`} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="donated"
                type="monotone"
                fill="url(#fillDonated)"
                fillOpacity={0.4}
                stroke="hsl(var(--secondary))"
                stackId="a"
              />
              <Area
                dataKey="interest"
                type="monotone"
                fill="url(#fillInterest)"
                fillOpacity={0.4}
                stroke="hsl(var(--primary))"
                stackId="a"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
