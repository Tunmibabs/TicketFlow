import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { StatCard } from "@/components/stat-card"
import { TicketChart } from "@/components/ticket-chart"
import { AlertCircle, CheckCircle2, Clock, Ticket } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
      setUser(JSON.parse(userData))
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">Here's an overview of your ticket management system</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Tickets"
              value="248"
              description="All time"
              icon={Ticket}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Open Tickets"
              value="42"
              description="Awaiting action"
              icon={AlertCircle}
              trend={{ value: 5, isPositive: false }}
            />
            <StatCard
              title="Closed Tickets"
              value="186"
              description="This month"
              icon={CheckCircle2}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Pending"
              value="20"
              description="In progress"
              icon={Clock}
              trend={{ value: 2, isPositive: true }}
            />
          </div>

          {/* Chart */}
          <TicketChart />
        </div>
      </main>
    </div>
  )
}
