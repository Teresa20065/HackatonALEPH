"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Trees, Droplets, Zap, Users } from "lucide-react"

const impactData = [
  { month: "Jan", trees: 1200, water: 4500, energy: 850, people: 120 },
  { month: "Feb", trees: 1450, water: 5200, energy: 920, people: 145 },
  { month: "Mar", trees: 1680, water: 4800, energy: 1100, people: 168 },
  { month: "Apr", trees: 1920, water: 6100, energy: 1250, people: 192 },
  { month: "May", trees: 2150, water: 5800, energy: 1400, people: 215 },
  { month: "Jun", trees: 2400, water: 6500, energy: 1580, people: 240 },
]

const categoryData = [
  { name: "Forest Conservation", value: 45, color: "#10b981" },
  { name: "Renewable Energy", value: 30, color: "#3b82f6" },
  { name: "Ocean Conservation", value: 15, color: "#06b6d4" },
  { name: "Community Support", value: 10, color: "#f59e0b" },
]

const monthlyGrowth = [
  { month: "Jan", growth: 12 },
  { month: "Feb", growth: 18 },
  { month: "Mar", growth: 15 },
  { month: "Apr", growth: 22 },
  { month: "May", growth: 28 },
  { month: "Jun", growth: 35 },
]

const chartConfig = {
  trees: {
    label: "Trees Planted",
    color: "hsl(var(--chart-3))",
  },
  water: {
    label: "Water Saved (L)",
    color: "hsl(var(--chart-2))",
  },
  energy: {
    label: "Clean Energy (kWh)",
    color: "hsl(var(--chart-4))",
  },
  people: {
    label: "People Helped",
    color: "hsl(var(--chart-5))",
  },
}

export function ImpactDashboard() {
  const totalTrees = impactData.reduce((sum, month) => sum + month.trees, 0)
  const totalWater = impactData.reduce((sum, month) => sum + month.water, 0)
  const totalEnergy = impactData.reduce((sum, month) => sum + month.energy, 0)
  const totalPeople = impactData.reduce((sum, month) => sum + month.people, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-montserrat mb-2">Impact Visualization</h2>
        <p className="text-muted-foreground">
          Track the real-world environmental impact of your sustainable donations
        </p>
      </div>

      {/* Impact Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Trees className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{totalTrees.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Trees Planted</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Droplets className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{(totalWater / 1000).toFixed(1)}K</div>
                <div className="text-xs text-muted-foreground">Liters Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">{(totalEnergy / 1000).toFixed(1)}K</div>
                <div className="text-xs text-muted-foreground">kWh Generated</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{totalPeople.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">People Helped</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Impact Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Impact Trends</CardTitle>
            <CardDescription>Environmental impact over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={impactData}>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                  <Bar dataKey="trees" fill="var(--color-chart-3)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Impact Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Impact Distribution</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <div className="bg-background border rounded-lg p-2 shadow-md">
                          <p className="font-medium">{data.name}</p>
                          <p className="text-sm text-muted-foreground">{data.value}% of total impact</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {categoryData.map((category, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                  <span className="text-xs text-muted-foreground">{category.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Growth Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Impact Growth Rate</CardTitle>
            <CardDescription>Month-over-month growth percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyGrowth}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `${value}%`} />
                <ChartTooltip
                  cursor={false}
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-primary">{payload[0].value}% growth</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="growth"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Real-time Impact Feed */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Impact Feed</CardTitle>
            <CardDescription>Live updates from supported organizations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium">Amazon Rainforest Foundation</p>
                  <p className="text-xs text-muted-foreground">Planted 150 trees in the last hour</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium">Solar Villages Initiative</p>
                  <p className="text-xs text-muted-foreground">Generated 2.5 MWh of clean energy today</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 animate-pulse"></div>
                <div>
                  <p className="text-sm font-medium">Ocean Cleanup Project</p>
                  <p className="text-xs text-muted-foreground">Removed 500kg of plastic waste</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
