const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "text-[var(--status-open)]";
    case "in-progress":
      return "text-[var(--status-in-progress)]";
    case "closed":
      return "text-[var(--status-closed)]";
    default:
      return "text-[var(--muted-foreground)]";
  }
};

const getStatusBg = (status) => {
  switch (status) {
    case "open":
      return "bg-[var(--status-open)]/10";
    case "in-progress":
      return "bg-[var(--status-in-progress)]/10";
    case "closed":
      return "bg-[var(--status-closed)]/10";
    default:
      return "bg-[var(--muted)]/10";
  }
};
function TicketList({ tickets, onEdit, onDelete }) {
  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--muted-foreground)] text-lg">
          No tickets yet. Create one to get started!
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="p-6 rounded-lg bg-[var(--card)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{ticket.title}</h3>
              <p className="text-[var(--muted-foreground)] mb-4">
                {ticket.description}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBg(
                ticket.status
              )} ${getStatusColor(ticket.status)}`}
            >
              {ticket.status.charAt(0).toUpperCase() +
                ticket.status.slice(1).replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-[var(--muted-foreground)]">
              Created {new Date(ticket.createdAt).toLocaleDateString()}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(ticket)}
                className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--background)] transition-colors text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(ticket.id)}
                className="px-4 py-2 rounded-lg border border-[var(--destructive)] text-[var(--destructive)] hover:bg-[var(--destructive)]/10 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketList;
