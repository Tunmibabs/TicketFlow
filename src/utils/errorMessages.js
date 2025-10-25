// Centralized error messages for consistent UX
export const ERROR_MESSAGES = {
  // Form validation errors
  FORM_EMPTY_TITLE: "Ticket title is required",
  FORM_EMPTY_DESCRIPTION: "Ticket description is required",
  FORM_EMPTY_EMAIL: "Email is required",
  FORM_EMPTY_PASSWORD: "Password is required",
  FORM_INVALID_EMAIL: "Please enter a valid email address",
  FORM_PASSWORD_TOO_SHORT: "Password must be at least 6 characters",
  FORM_PASSWORDS_DONT_MATCH: "Passwords do not match",

  // Authentication errors
  AUTH_INVALID_CREDENTIALS: "Invalid email or password",
  AUTH_USER_EXISTS: "An account with this email already exists",
  AUTH_SESSION_EXPIRED: "Your session has expired — please log in again",
  AUTH_UNAUTHORIZED: "You are not authorized to access this resource",

  // Data operation errors
  DATA_LOAD_FAILED: "Failed to load data. Please try again.",
  DATA_SAVE_FAILED: "Failed to save changes. Please try again.",
  DATA_DELETE_FAILED: "Failed to delete item. Please try again.",
  DATA_UPDATE_FAILED: "Failed to update item. Please try again.",

  // Generic errors
  GENERIC_ERROR: "Something went wrong. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
};

export const ErrorMessageKey = Object.keys(ERROR_MESSAGES);
