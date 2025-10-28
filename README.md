TicketFlow - React Implementation
This document outlines the setup, structure, and details for the React version of the TicketFlow application.

Frameworks and Libraries Used
This project is a client-side application built with the following technologies:

Core Framework: React

Build Tool: Vite

Routing: React Router (react-router-dom)

Styling: Tailwind CSS

UI Components:

Recharts (for charts)

lucide-react (for icons)

Linting: ESLint

Setup and Execution
Install Dependencies: Clone the repository and install the required npm packages.

npm install
Run the Development Server: This command starts the Vite development server, typically on http://localhost:5173.

npm run dev
Build for Production: This command bundles the application for deployment.

npm run build

UI Components and State Structure
State Structure
This application uses a client-side state management strategy.

Global State: Global application state, such as authentication status (isAuthenticated), is managed in the root App.jsx component using useState and passed down as props to routes and components.

Page-Level State: Pages like TicketsPage.jsx manage their own state (e.g., tickets, showForm, editingTicket) using useState.

Data Persistence: All application data (users, tickets) is persisted directly in the browser's localStorage. This is a simulation of a database.

localStorage.getItem("users"): Stores an array of user objects.

localStorage.getItem("tickets"): Stores an array of all ticket objects.

localStorage.getItem("currentUser"): Stores the currently logged-in user object.

localStorage.getItem("authToken"): Simulates a user session token.

Notifications: A global toast notification system is available via the ToastProvider and useToast hook, allowing any component to trigger success or error messages.

Core UI Components
App.jsx: The main application entry point. It wraps all pages in the ToastProvider, ErrorBoundary, and Router. It also manages the global isAuthenticated state.

DashboardLayout.jsx: A wrapper for all authenticated pages. It includes the DashboardSidebar and provides the main content area. It also handles the logout logic.

DashboardSidebar.jsx: The main navigation sidebar for the app, including links to pages and the logout button.

ProtectedRoute.jsx: A route guard that checks if isAuthenticated is true. If false, it redirects the user to the /login page.

TicketForm.jsx: A reusable form for both creating and editing tickets. It manages its own internal form state and performs validation before submitting.

DeleteConfirmation.jsx: A reusable modal component to confirm a destructive action (like deleting a ticket).

ToastProvider.jsx: A provider that manages the state for toast notifications, allowing them to be displayed from anywhere in the app.

Statistics.jsx: A component displayed on the dashboard that calculates and shows ticket stats (Total, Open, In Progress, Closed).

Accessibility and Known Issues
Accessibility
Form Labels: All inputs in TicketForm.jsx and Login.jsx are linked to label elements.

ARIA Attributes: Form inputs use aria-invalid and aria-describedby to provide context for screen readers when validation errors occur.

Modals: The sidebar and delete modal include overlay divs to trap focus, although full keyboard trap and focus management are not implemented.

Known Issues
localStorage Data: The use of localStorage as a database is not secure and is only for demonstration. All data is stored in plain text on the user's computer.

Authentication: The "auth token" is a randomly generated string and is not validated, providing no real security.

Chart Data: The analytics charts are currently placeholders or use static data.

React 19: The project uses React 19, which is new. Some libraries may have compatibility issues, though none are apparent.

Test User Credentials
You can create a new user on the Sign Up page. Alternatively, to test the login flow, you can use the following steps:
Sign Up a new user:
Email: test@example.com
Password: password123
Log Out using the button in the sidebar.
Log In on the login page with the same credentials.
