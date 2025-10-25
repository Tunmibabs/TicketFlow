import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import Statistics from "../components/Statistics";

function Dashboard({ setIsAuthenticated }) {
  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  useEffect(() => {
    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const userTickets = allTickets.filter((t) => t.userId === currentUser.id);
    setTickets(userTickets);
  }, [currentUser.id]);

  const handleAddTicket = (ticketData) => {
    const newTicket = {
      ...ticketData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: currentUser.id,
    };

    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    allTickets.push(newTicket);
    localStorage.setItem("tickets", JSON.stringify(allTickets));

    setTickets([...tickets, newTicket]);
    setShowForm(false);
  };

  const handleUpdateTicket = (ticketData) => {
    if (!editingTicket) return;

    const updatedTicket = {
      ...editingTicket,
      ...ticketData,
    };

    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const index = allTickets.findIndex((t) => t.id === editingTicket.id);
    allTickets[index] = updatedTicket;
    localStorage.setItem("tickets", JSON.stringify(allTickets));

    setTickets(
      tickets.map((t) => (t.id === editingTicket.id ? updatedTicket : t))
    );
    setEditingTicket(null);
    setShowForm(false);
  };

  const handleDeleteTicket = (id) => {
    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
    const filtered = allTickets.filter((t) => t.id !== id);
    localStorage.setItem("tickets", JSON.stringify(filtered));

    setTickets(tickets.filter((t) => t.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setIsAuthenticated(false);
    navigate("/");
  };
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="border-b border-[var(--border)] sticky top-0 z-20 bg-[var(--background)]/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[var(--primary)]">
            TicketFlow
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-[var(--muted-foreground)]">
              {currentUser.email}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--card)] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button
            onClick={() => {
              setEditingTicket(null);
              setShowForm(!showForm);
            }}
            className="px-6 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90 transition-opacity"
          >
            {showForm ? "Cancel" : "New Ticket"}
          </button>
        </div>

        {/* Statistics */}
        <Statistics tickets={tickets} />

        {/* Ticket Form */}
        {showForm && (
          <div className="mb-8">
            <TicketForm
              onSubmit={editingTicket ? handleUpdateTicket : handleAddTicket}
              initialData={editingTicket}
              onCancel={() => {
                setShowForm(false);
                setEditingTicket(null);
              }}
            />
          </div>
        )}

        {/* Ticket List */}
        <TicketList
          tickets={tickets}
          onEdit={(ticket) => {
            setEditingTicket(ticket);
            setShowForm(true);
          }}
          onDelete={handleDeleteTicket}
        />
      </main>
    </div>
  );
}

export default Dashboard;
