# Copilot Instructions for Bancao Admin Dashboard

## Project Overview
- **Framework:** Next.js 14 (App Router), TypeScript, TailwindCSS
- **Purpose:** Admin dashboard for user and transaction management, with JWT authentication and responsive design.
- **Key Directories:**
  - `app/`: Next.js App Router pages and API routes
  - `components/`: Reusable UI components (Sidebar, Header, DataTable, TransactionTable)
  - `lib/`: Business logic, authentication helpers, mock data
  - `pages/`: Legacy Pages Router (some login/logout logic)

## Architecture & Data Flow
- **App Router (`app/`)** is the main entry for routing and API endpoints.
- **Authentication** is handled via JWT, with login/logout endpoints in `app/api/auth/` and helpers in `lib/auth.ts`.
- **State & Data**: Most data is currently mocked (`lib/mockData.ts`). Replace with backend API calls for production.
- **Protected Routes**: Use `components/ProtectedRoute.tsx` and middleware in `lib/middleware.ts` for access control.
- **Tables**: `components/DataTable.tsx` (generic) and `TransactionTable.tsx` (specific) implement pagination, filtering, and sorting.

## Developer Workflows
- **Install:** `npm install`
- **Dev Server:** `npm run dev` (http://localhost:3000)
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Production:** `npm run start`
- **Contribute:**
  1. Fork & branch (`git checkout -b feature/YourFeature`)
  2. Commit & push
  3. Open a Pull Request

## Project-Specific Patterns
- **Authentication:**
  - Login: `pages/login.tsx` calls API in `app/api/auth/login/route.ts`
  - Logout: `components/Sidebar.tsx` calls API in `app/api/auth/logout/route.ts`
  - Middleware: `lib/middleware.ts` and `app/api/sse/route.ts` for session handling
- **UI:**
  - Sidebar navigation is always present; collapses on tablet/mobile
  - Tables use custom pagination and filtering logic
- **Responsive Design:**
  - TailwindCSS is used throughout; see `app/globals.css` for global styles

## Integration Points
- **Backend API:** Replace mock data and authentication logic with real API calls as needed
- **External Libraries:**
  - Lucide React for icons
  - TailwindCSS for styling

## Examples
- To add a new protected page, create a folder in `app/`, use `ProtectedRoute`, and update navigation in `Sidebar.tsx`.
- To extend authentication, update `lib/auth.ts` and corresponding API routes in `app/api/auth/`.

---
**For unclear or missing conventions, review `README.md` and key files listed above. Ask maintainers for clarification if needed.**
