import { Card, CardContent } from "@/components/ui/card"
import { Trees, Zap, Droplets, Users } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Trees,
      value: "47,500+",
      label: "Trees Planted",
      color: "text-green-600",
    },
    {
      icon: Zap,
      value: "12.3 GWh",
      label: "Clean Energy Generated",
      color: "text-primary",
    },
    {
      icon: Droplets,
      value: "2.1M L",
      label: "Water Saved",
      color: "text-blue-600",
    },
    {
      icon: Users,
      value: "8,400+",
      label: "People Helped",
      color: "text-secondary",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-montserrat mb-4">Real Impact, Measurable Results</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the tangible environmental impact created through our sustainable donation platform
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-background p-3 shadow-sm">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
