import { Link, useNavigate } from "react-router-dom"

export default function DashboardSidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    navigate("/")
  }

  const user = localStorage.getItem("userEmail") || "User"

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 p-6 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">TicketHub</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <Link
          to="/dashboard"
          className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
        >
          Dashboard
        </Link>
        <Link
          to="/tickets"
          className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
        >
          Tickets
        </Link>
        <Link
          to="/analytics"
          className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
        >
          Analytics
        </Link>
        <Link
          to="/settings"
          className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
        >
          Settings
        </Link>
      </nav>

      <div className="border-t border-slate-700 pt-4">
        <div className="mb-4">
          <p className="text-sm text-slate-400">Logged in as</p>
          <p className="text-slate-100 font-medium truncate">{user}</p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
