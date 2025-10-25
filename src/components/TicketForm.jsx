import React from "react";
import { useState, useEffect } from "react";

function TicketForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] =
    (useState < "open") | "in-progress" | ("closed" > "open");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    onSubmit({
      title,
      description,
      status,
    });

    setTitle("");
    setDescription("");
    setStatus("open");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 rounded-lg bg-[var(--card)] border border-[var(--border)]"
    >
      <h3 className="text-lg font-semibold mb-4">
        {initialData ? "Edit Ticket" : "Create New Ticket"}
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
            placeholder="Ticket title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] resize-none"
            rows={4}
            placeholder="Ticket description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)]"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90 transition-opacity"
          >
            {initialData ? "Update Ticket" : "Create Ticket"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] font-semibold hover:bg-[var(--background)] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

export default TicketForm;
