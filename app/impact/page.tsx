import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-config"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ImpactDashboard } from "@/components/visualizations/impact-dashboard"

export default async function ImpactPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={session.user} />

      <main className="container mx-auto px-4 py-8">
        <ImpactDashboard />
      </main>
    </div>
  )
}
