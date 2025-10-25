import { Ticket } from "./ticket-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

const statusColors = {
  open: "bg-primary/10 text-primary",
  pending: "bg-chart-3/10 text-chart-3",
  closed: "bg-chart-2/10 text-chart-2",
};

const priorityColors = {
  low: "bg-chart-2/10 text-chart-2",
  medium: "bg-chart-3/10 text-chart-3",
  high: "bg-destructive/10 text-destructive",
};

function TicketTable({ tickets, onEdit, onDelete }) {
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-secondary">
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Assignee
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                Created
              </th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b border-border hover:bg-secondary/50 transition"
              >
                <td className="px-6 py-4 text-sm text-foreground font-medium">
                  {ticket.title}
                </td>
                <td className="px-6 py-4">
                  <Badge className={`${statusColors[ticket.status]} border-0`}>
                    {ticket.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    className={`${priorityColors[ticket.priority]} border-0`}
                  >
                    {ticket.priority}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {ticket.assignee || "Unassigned"}
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(ticket)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(ticket.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {tickets.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-muted-foreground">
            No tickets yet. Create one to get started!
          </p>
        </div>
      )}
    </div>
  );
}

export default TicketTable;
