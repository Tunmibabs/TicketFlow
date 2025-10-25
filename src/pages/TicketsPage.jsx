import { useState, useEffect } from "react";
import { useToast } from "../components/ToastProvider";
import DeleteConfirmation from "../components/DeleteConfirmation";
import DashboardSidebar from "../components/DashboardSidebar";

export default function TicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    ticketId: null,
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("tickets");
    if (stored) {
      setTickets(JSON.parse(stored));
    } else {
      const sampleTickets = [
        {
          id: "1",
          title: "Fix login bug",
          description: "Users unable to login with special characters",
          status: "open",
          priority: "high",
          assignee: "John Doe",
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Update dashboard UI",
          description: "Redesign dashboard for better UX",
          status: "in-progress",
          priority: "medium",
          assignee: "Jane Smith",
          createdAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Database optimization",
          description: "Optimize slow queries",
          status: "closed",
          priority: "low",
          assignee: "Bob Johnson",
          createdAt: new Date().toISOString(),
        },
      ];
      setTickets(sampleTickets);
      localStorage.setItem("tickets", JSON.stringify(sampleTickets));
    }
  }, []);

  const handleAddTicket = () => {
    if (!newTicket.title.trim()) {
      addToast("Please enter a ticket title", "error");
      return;
    }

    const ticket = {
      id: Date.now().toString(),
      title: newTicket.title,
      description: newTicket.description,
      status: "open",
      priority: newTicket.priority,
      assignee: "Unassigned",
      createdAt: new Date().toISOString(),
    };

    const updated = [...tickets, ticket];
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
    setNewTicket({ title: "", description: "", priority: "medium" });
    setShowDialog(false);
    addToast("Ticket created successfully", "success");
  };

  const handleDeleteClick = (ticketId) => {
    setDeleteConfirm({ isOpen: true, ticketId });
  };

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.ticketId) return;

    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const updated = tickets.filter((t) => t.id !== deleteConfirm.ticketId);
    setTickets(updated);
    localStorage.setItem("tickets", JSON.stringify(updated));
    setDeleteConfirm({ isOpen: false, ticketId: null });
    setIsDeleting(false);
    addToast("Ticket deleted successfully", "success");
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-900 text-green-200";
      case "in-progress":
        return "bg-amber-900 text-amber-200";
      case "closed":
        return "bg-slate-700 text-slate-200";
      default:
        return "bg-slate-700 text-slate-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-slate-400";
    }
  };

  return (
    <div className="flex h-screen bg-slate-950">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-100">Tickets</h1>
            <button
              onClick={() => setShowDialog(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + New Ticket
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 text-slate-100 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="bg-slate-900 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700 bg-slate-800">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                    Assignee
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b border-slate-700 hover:bg-slate-800"
                  >
                    <td className="px-6 py-4 text-slate-100">{ticket.title}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td
                      className={`px-6 py-4 font-medium ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {ticket.assignee}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteClick(ticket.id)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400">No tickets found</p>
            </div>
          )}
        </div>
      </div>

      {/* New Ticket Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-slate-900 rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-slate-100 mb-4">
              Create New Ticket
            </h2>
            <input
              type="text"
              placeholder="Ticket title"
              value={newTicket.title}
              onChange={(e) =>
                setNewTicket({ ...newTicket, title: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-800 text-slate-100 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none mb-4"
            />
            <textarea
              placeholder="Description"
              value={newTicket.description}
              onChange={(e) =>
                setNewTicket({ ...newTicket, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-800 text-slate-100 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none mb-4 h-24"
            />
            <select
              value={newTicket.priority}
              onChange={(e) =>
                setNewTicket({ ...newTicket, priority: e.target.value })
              }
              className="w-full px-4 py-2 bg-slate-800 text-slate-100 rounded-lg border border-slate-700 focus:border-blue-500 focus:outline-none mb-6"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-slate-100 hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTicket}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmation
        isOpen={deleteConfirm.isOpen}
        title="Delete Ticket"
        message="Are you sure you want to delete this ticket? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, ticketId: null })}
        isLoading={isDeleting}
      />
    </div>
  );
}
