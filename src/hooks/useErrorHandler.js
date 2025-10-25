import { useCallback } from "react";
import { useToast } from "../components/ToastProvider";
import { useNavigate } from "react-router-dom";
import { ERROR_MESSAGES, ErrorMessageKey } from "../utils/errorMessages";

export function useErrorHandler() {
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleError = useCallback(
    (error, options = {}) => {
      const { showToast = true, redirectTo, onError } = options;

      let errorMessage = ERROR_MESSAGES.GENERIC_ERROR;

      if (error instanceof Error) {
        errorMessage = error.message;
        onError?.(error);
      } else if (typeof error === "string") {
        errorMessage = error;
      }

      if (showToast) {
        addToast(errorMessage, "error");
      }

      if (redirectTo) {
        navigate(redirectTo);
      }

      console.error("[v0] Error:", errorMessage);
    },
    [addToast, navigate]
  );

  const handleValidationError = useCallback(
    (messageKey) => {
      const message = ERROR_MESSAGES[messageKey];
      addToast(message, "error");
      return message;
    },
    [addToast]
  );

  const handleSessionExpired = useCallback(() => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    addToast(ERROR_MESSAGES.AUTH_SESSION_EXPIRED, "error");
    navigate("/login");
  }, [addToast, navigate]);

  return {
    handleError,
    handleValidationError,
    handleSessionExpired,
  };
}
