import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-config"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { PortfolioOverview } from "@/components/dashboard/portfolio-overview"
import { DonationHistory } from "@/components/dashboard/donation-history"
import { ImpactChart } from "@/components/dashboard/impact-chart"
import { WithdrawFunds } from "@/components/dashboard/withdraw-funds"
import { RecommendedOrganizations } from "@/components/dashboard/recommended-organizations"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={session.user} />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PortfolioOverview />
            <ImpactChart />
            <DonationHistory />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <WithdrawFunds />
            <RecommendedOrganizations />
          </div>
        </div>
      </main>
    </div>
  )
}
