import DashboardSidebar from "../components/DashboardSidebar";

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-slate-950">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-8">Settings</h1>
          <div className="max-w-2xl">
            <div className="bg-slate-900 rounded-lg p-6 border border-slate-700">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">
                Profile Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={localStorage.getItem("userEmail") || ""}
                    disabled
                    className="w-full px-4 py-2 bg-slate-800 text-slate-100 rounded-lg border border-slate-700 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Theme
                  </label>
                  <select className="w-full px-4 py-2 bg-slate-800 text-slate-100 rounded-lg border border-slate-700">
                    <option>Dark</option>
                    <option>Light</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
