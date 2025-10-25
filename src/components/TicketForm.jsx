import React from "react";
import { useState, useEffect } from "react";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { ERROR_MESSAGES } from "../utils/errorMessages";

export default function TicketForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("open");
  const [errors, setErrors] = useState({});
  const { handleValidationError } = useErrorHandler();

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = ERROR_MESSAGES.FORM_EMPTY_TITLE;
    }

    if (!description.trim()) {
      newErrors.description = ERROR_MESSAGES.FORM_EMPTY_DESCRIPTION;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        status,
      });

      setTitle("");
      setDescription("");
      setStatus("open");
      setErrors({});
    } catch (error) {
      handleValidationError("DATA_SAVE_FAILED");
    }
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
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: undefined });
            }}
            className={`w-full px-4 py-2 rounded-lg bg-[var(--background)] border text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] ${
              errors.title
                ? "border-[var(--destructive)]"
                : "border-[var(--border)]"
            }`}
            placeholder="Ticket title"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <p
              id="title-error"
              className="text-sm text-[var(--destructive)] mt-1"
            >
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description)
                setErrors({ ...errors, description: undefined });
            }}
            className={`w-full px-4 py-2 rounded-lg bg-[var(--background)] border text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] resize-none ${
              errors.description
                ? "border-[var(--destructive)]"
                : "border-[var(--border)]"
            }`}
            rows={4}
            placeholder="Ticket description"
            aria-invalid={!!errors.description}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          />
          {errors.description && (
            <p
              id="description-error"
              className="text-sm text-[var(--destructive)] mt-1"
            >
              {errors.description}
            </p>
          )}
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
