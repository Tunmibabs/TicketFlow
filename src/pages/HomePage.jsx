import { Link } from "react-router-dom";
import WavyBackground from "../components/WavyBackground";

function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="text-4xl font-bold text-[var(--primary)]">
          TicketFlow
        </div>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-0 max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--primary)] rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--accent)] rounded-full opacity-5 blur-3xl"></div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
          Manage Your Tickets with{" "}
          <span className="text-[var(--primary)]">Ease</span>
        </h1>
        <p className="text-xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto text-balance">
          A modern ticket management system designed to streamline your workflow
          and keep your team organized.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/signup"
            className="px-8 py-3 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90 transition-opacity"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-semibold hover:bg-[var(--card)] transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          <div className="p-6 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
            <div className="text-3xl mb-4">📋</div>
            <h3 className="text-lg font-semibold mb-2">Easy Management</h3>
            <p className="text-[var(--muted-foreground)]">
              Create, update, and organize tickets effortlessly
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
            <p className="text-[var(--muted-foreground)]">
              Track ticket status and progress instantly
            </p>
          </div>

          <div className="p-6 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
            <p className="text-[var(--muted-foreground)]">
              Your data is protected with secure authentication
            </p>
          </div>
        </div>
      </div>

      {/* Wave Background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-10">
        <WavyBackground />
      </div>
    </div>
  );
}

export default HomePage;
