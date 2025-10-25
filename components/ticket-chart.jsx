import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  { name: "Mon", open: 12, closed: 8, pending: 4 },
  { name: "Tue", open: 15, closed: 10, pending: 5 },
  { name: "Wed", open: 10, closed: 12, pending: 3 },
  { name: "Thu", open: 18, closed: 14, pending: 6 },
  { name: "Fri", open: 14, closed: 16, pending: 4 },
  { name: "Sat", open: 8, closed: 10, pending: 2 },
  { name: "Sun", open: 6, closed: 8, pending: 1 },
];

function TicketChart() {
  return (
    <div className="p-6 rounded-xl border border-border bg-card">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        Tickets This Week
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis stroke="var(--color-muted-foreground)" />
          <YAxis stroke="var(--color-muted-foreground)" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-card)",
              border: `1px solid var(--color-border)`,
              borderRadius: "8px",
            }}
            labelStyle={{ color: "var(--color-foreground)" }}
          />
          <Legend />
          <Bar dataKey="open" fill="var(--color-primary)" />
          <Bar dataKey="closed" fill="var(--color-chart-2)" />
          <Bar dataKey="pending" fill="var(--color-chart-3)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TicketChart;
