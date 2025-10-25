import { useState, useEffect } from "react"
import { useToast } from "../components/ToastProvider"
import DeleteConfirmation from "../components/DeleteConfirmation"
import TicketForm from "../components/TicketForm"

export default function TicketsPage() {
  const [tickets, setTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [editingTicket, setEditingTicket] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    ticketId: null,
  })
  const [isDeleting, setIsDeleting] = useState(false)
  const { addToast } = useToast()

  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

  useEffect(() => {
    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]")
    const userTickets = allTickets.filter((t) => t.userId === currentUser.id)
    setTickets(userTickets)
  }, [currentUser.id])

  const handleAddTicket = (ticketData) => {
    const newTicket = {
      ...ticketData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      userId: currentUser.id,
    }

    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]")
    allTickets.push(newTicket)
    localStorage.setItem("tickets", JSON.stringify(allTickets))

    setTickets([...tickets, newTicket])
    setShowForm(false)
    addToast("Ticket created successfully", "success")
  }

  const handleUpdateTicket = (ticketData) => {
    if (!editingTicket) return

    const updatedTicket = {
      ...editingTicket,
      ...ticketData,
    }

    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]")
    const index = allTickets.findIndex((t) => t.id === editingTicket.id)
    allTickets[index] = updatedTicket
    localStorage.setItem("tickets", JSON.stringify(allTickets))

    setTickets(tickets.map((t) => (t.id === editingTicket.id ? updatedTicket : t)))
    setEditingTicket(null)
    setShowForm(false)
    addToast("Ticket updated successfully", "success")
  }

  const handleDeleteClick = (ticketId) => {
    setDeleteConfirm({ isOpen: true, ticketId })
  }

  const handleConfirmDelete = async () => {
    if (!deleteConfirm.ticketId) return

    setIsDeleting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    const allTickets = JSON.parse(localStorage.getItem("tickets") || "[]")
    const filtered = allTickets.filter((t) => t.id !== deleteConfirm.ticketId)
    localStorage.setItem("tickets", JSON.stringify(filtered))

    setTickets(tickets.filter((t) => t.id !== deleteConfirm.ticketId))
    setDeleteConfirm({ isOpen: false, ticketId: null })
    setIsDeleting(false)
    addToast("Ticket deleted successfully", "success")
  }

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-900 text-green-200"
      case "in-progress":
        return "bg-amber-900 text-amber-200"
      case "closed":
        return "bg-slate-700 text-slate-200"
      default:
        return "bg-slate-700 text-slate-200"
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-100">Tickets</h1>
        <button
          onClick={() => {
            setEditingTicket(null)
            setShowForm(!showForm)
          }}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Cancel" : "+ New Ticket"}
        </button>
      </div>

      {showForm && (
        <div className="mb-8">
          <TicketForm
            onSubmit={editingTicket ? handleUpdateTicket : handleAddTicket}
            initialData={editingTicket}
            onCancel={() => {
              setShowForm(false)
              setEditingTicket(null)
            }}
          />
        </div>
      )}

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
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => (
              <tr key={ticket.id} className="border-b border-slate-700 hover:bg-slate-800">
                <td className="px-6 py-4 text-slate-100">{ticket.title}</td>
                <td className="px-6 py-4 text-slate-300 truncate">{ticket.description}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => {
                      setEditingTicket(ticket)
                      setShowForm(true)
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                  >
                    Edit
                  </button>
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

      <DeleteConfirmation
        isOpen={deleteConfirm.isOpen}
        title="Delete Ticket"
        message="Are you sure you want to delete this ticket? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteConfirm({ isOpen: false, ticketId: null })}
        isLoading={isDeleting}
      />
    </div>
  )
}
