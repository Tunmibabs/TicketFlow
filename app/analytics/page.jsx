import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const analyticsData = [
  { week: "Week 1", resolved: 12, created: 15, pending: 8 },
  { week: "Week 2", resolved: 18, created: 20, pending: 10 },
  { week: "Week 3", resolved: 25, created: 18, pending: 7 },
  { week: "Week 4", resolved: 32, created: 22, pending: 5 },
]

export default function AnalyticsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
    } else {
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
            <p className="text-muted-foreground">Track your ticket management metrics and trends</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-xl border border-border bg-card">
              <p className="text-sm text-muted-foreground mb-2">Avg Resolution Time</p>
              <p className="text-3xl font-bold text-foreground">2.4 days</p>
              <p className="text-xs text-primary mt-2">↓ 12% from last month</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <p className="text-sm text-muted-foreground mb-2">Customer Satisfaction</p>
              <p className="text-3xl font-bold text-foreground">94%</p>
              <p className="text-xs text-primary mt-2">↑ 5% from last month</p>
            </div>
            <div className="p-6 rounded-xl border border-border bg-card">
              <p className="text-sm text-muted-foreground mb-2">Total Resolved</p>
              <p className="text-3xl font-bold text-foreground">186</p>
              <p className="text-xs text-primary mt-2">↑ 23% from last month</p>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-border bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-6">Tickets Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `1px solid var(--color-border)`,
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "var(--color-foreground)" }}
                />
                <Legend />
                <Line type="monotone" dataKey="resolved" stroke="var(--color-primary)" strokeWidth={2} />
                <Line type="monotone" dataKey="created" stroke="var(--color-chart-2)" strokeWidth={2} />
                <Line type="monotone" dataKey="pending" stroke="var(--color-chart-3)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  )
}
