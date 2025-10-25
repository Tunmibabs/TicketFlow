import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { ERROR_MESSAGES } from "../utils/errorMessages";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { handleError } = useErrorHandler();

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = ERROR_MESSAGES.FORM_EMPTY_EMAIL;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = ERROR_MESSAGES.FORM_INVALID_EMAIL;
    }

    if (!password) {
      newErrors.password = ERROR_MESSAGES.FORM_EMPTY_PASSWORD;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        setErrors({ general: ERROR_MESSAGES.AUTH_INVALID_CREDENTIALS });
        return;
      }

      const token = Math.random().toString(36).substr(2);
      localStorage.setItem("authToken", token);
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ email: user.email, id: user.id })
      );
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error) {
      handleError(error, { showToast: true });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--primary)] mb-2">
            TicketFlow
          </h1>
          <p className="text-[var(--muted-foreground)]">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="p-4 rounded-lg bg-[var(--destructive)]/10 border border-[var(--destructive)] text-[var(--destructive)]">
              {errors.general}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={`w-full px-4 py-2 rounded-lg bg-[var(--card)] border text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] ${
                errors.email
                  ? "border-[var(--destructive)]"
                  : "border-[var(--border)]"
              }`}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p
                id="email-error"
                className="text-sm text-[var(--destructive)] mt-1"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
              className={`w-full px-4 py-2 rounded-lg bg-[var(--card)] border text-[var(--foreground)] focus:outline-none focus:border-[var(--primary)] ${
                errors.password
                  ? "border-[var(--destructive)]"
                  : "border-[var(--border)]"
              }`}
              placeholder="••••••••"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <p
                id="password-error"
                className="text-sm text-[var(--destructive)] mt-1"
              >
                {errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-[var(--muted-foreground)] mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[var(--primary)] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
