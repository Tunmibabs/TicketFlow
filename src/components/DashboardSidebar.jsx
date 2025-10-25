import { Link } from "react-router-dom";

export default function DashboardSidebar({ onLogout, isOpen, onToggle }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed md:static top-0 left-0 h-screen bg-slate-900 border-r border-slate-700 p-6 flex flex-col transition-all duration-300 ease-in-out z-50 ${
          isOpen
            ? "w-64 translate-x-0"
            : "-translate-x-full md:translate-x-0 md:w-64"
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-blue-400">TicketFlow</h1>
          <button
            onClick={onToggle}
            className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
            aria-label="Close sidebar"
          >
            <svg
              className="w-5 h-5 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            to="/dashboard"
            className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
            onClick={() => {
              if (window.innerWidth < 768) {
                onToggle();
              }
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/tickets"
            className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
            onClick={() => {
              if (window.innerWidth < 768) {
                onToggle();
              }
            }}
          >
            Tickets
          </Link>
          <Link
            to="/analytics"
            className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
            onClick={() => {
              if (window.innerWidth < 768) {
                onToggle();
              }
            }}
          >
            Analytics
          </Link>
          <Link
            to="/settings"
            className="block px-4 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-colors"
            onClick={() => {
              if (window.innerWidth < 768) {
                onToggle();
              }
            }}
          >
            Settings
          </Link>
        </nav>

        <div className="border-t border-slate-700 pt-4">
          <div className="mb-4">
            <p className="text-sm text-slate-400">Logged in as</p>
            <p className="text-slate-100 font-medium truncate">
              {currentUser.email}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
