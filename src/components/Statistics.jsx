function Statistics({ tickets }) {
  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "open").length;
  const inProgress = tickets.filter((t) => t.status === "in-progress").length;
  const closed = tickets.filter((t) => t.status === "closed").length;

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-8">
      <div className="p-6 rounded-lg bg-[var(--card)] border border-[var(--border)]">
        <p className="text-[var(--muted-foreground)] text-sm mb-2">
          Total Tickets
        </p>
        <p className="text-3xl font-bold">{total}</p>
      </div>

      <div className="p-6 rounded-lg bg-[var(--card)] border border-[var(--border)]">
        <p className="text-[var(--muted-foreground)] text-sm mb-2">Open</p>
        <p className="text-3xl font-bold text-[var(--status-open)]">{open}</p>
      </div>

      <div className="p-6 rounded-lg bg-[var(--card)] border border-[var(--border)]">
        <p className="text-[var(--muted-foreground)] text-sm mb-2">
          In Progress
        </p>
        <p className="text-3xl font-bold text-[var(--status-in-progress)]">
          {inProgress}
        </p>
      </div>

      <div className="p-6 rounded-lg bg-[var(--card)] border border-[var(--border)]">
        <p className="text-[var(--muted-foreground)] text-sm mb-2">Closed</p>
        <p className="text-3xl font-bold text-[var(--status-closed)]">
          {closed}
        </p>
      </div>
    </div>
  );
}

export default Statistics;
