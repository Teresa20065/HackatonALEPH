import { Card, CardContent } from "@/components/ui/card"
import { Wallet, Sprout, TrendingUp, Heart } from "lucide-react"
import Image from "next/image"

export function HowItWorksSection() {
  const steps = [
    {
      icon: Wallet,
      title: "Connect & Deposit",
      description: "Connect your wallet or create an account, then deposit funds into our secure DeFi protocols.",
      step: "01",
    },
    {
      icon: Sprout,
      title: "Choose Organizations",
      description:
        "Select from verified environmental organizations working on reforestation, clean energy, and conservation.",
      step: "02",
    },
    {
      icon: TrendingUp,
      title: "Earn Interest",
      description:
        "Your principal generates sustainable returns through carefully selected DeFi protocols (6-12% APY).",
      step: "03",
    },
    {
      icon: Heart,
      title: "Auto-Donate Interest",
      description: "Interest earned automatically goes to your chosen organizations while your principal stays intact.",
      step: "04",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Imagen de fondo con overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/Arqui.png"
          alt="Sustainable Architecture Background"
          fill
          className="object-cover opacity-10"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-montserrat mb-4">How Sustainable Donations Work</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A revolutionary approach to giving that preserves your wealth while maximizing impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    {step.step}
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  <div className="rounded-full bg-primary/10 p-4">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-6 py-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Your principal is always protected and withdrawable</span>
          </div>
        </div>
      </div>
    </section>
  )
}
