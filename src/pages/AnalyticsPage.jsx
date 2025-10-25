import DashboardSidebar from "../components/DashboardSidebar";

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-slate-950">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-8">Analytics</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">
                Ticket Trends
              </h2>
              <div className="h-64 bg-slate-800 rounded flex items-center justify-center text-slate-400">
                Chart placeholder
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">
                Resolution Time
              </h2>
              <div className="h-64 bg-slate-800 rounded flex items-center justify-center text-slate-400">
                Chart placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
