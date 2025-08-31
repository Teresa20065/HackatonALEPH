import { HeroSection } from "@/components/sections/hero-section"
import { OrganizationsSection } from "@/components/sections/organizations-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { StatsSection } from "@/components/sections/stats-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <OrganizationsSection />
      </main>
      <Footer />
    </div>
  )
}
