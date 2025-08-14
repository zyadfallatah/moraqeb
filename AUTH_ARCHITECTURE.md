# Server-Side First Authentication Architecture

## Overview

This application now uses a **server-side first** authentication approach where:

- **Server-side**: Handles all authentication state, user sessions, and protected routes
- **Client-side**: Only handles login/logout forms and UI interactions
- **Security**: JWT tokens are stored in httpOnly cookies, user data in non-httpOnly cookies for UI

## Architecture Components

### 1. Server Actions (`lib/actions/authActions.ts`)

Core authentication functions that run on the server:

- `getCurrentUser()` - Get current authenticated user from cookies
- `requireAuth()` - Protect routes, redirect to login if not authenticated
- `requireGuest()` - Redirect authenticated users away from guest routes
- `createUserSession()` - Set authentication cookies after login
- `destroyUserSession()` - Clear authentication cookies on logout
- `logoutAction()` - Server action for logout (can be used in forms)

### 2. API Routes

- `/api/auth/login` - Handle login, set cookies via server actions
- `/api/auth/logout` - Handle logout, clear cookies via server actions

### 3. Middleware (`middleware.ts`)

Route-level authentication protection:

- Protects `/profile/*` and `/lands/*` routes
- Redirects authenticated users away from `/login` and `/signup`
- Runs before page loads for better UX

### 4. Components

#### Server Components (Default)

- `Header` - Server component that shows user state
- All page components - Can use `getCurrentUser()` directly

#### Client Components (When Needed)

- `LoginForm` - Form handling and API calls
- `Logout` - Logout button with API call
- Any component needing interactivity

### 5. Hooks (Optional)

- `useAuth()` - Client-side hook for when you need auth state in client components

## Usage Examples

### Server Components

```tsx
// In any server component
import { getCurrentUser } from "@/lib/actions/authActions";

export default async function MyPage() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>Please log in</div>;
  }

  return <div>Welcome {user.name}!</div>;
}
```

### Protected Routes

```tsx
// In protected page components
import { requireAuth } from "@/lib/actions/authActions";

export default async function ProtectedPage() {
  const user = await requireAuth(); // Will redirect to /login if not authenticated

  return <div>Protected content for {user.name}</div>;
}
```

### Client Components

```tsx
// When you need auth state in client components
"use client";
import { useAuth } from "@/lib/hooks/useAuth";

export default function MyClientComponent() {
  const { user, logout } = useAuth();

  return <div>{user && <button onClick={logout}>Logout</button>}</div>;
}
```

## Cookie Structure

- `auth-token` - JWT token (httpOnly, secure in production)
- `user-data` - User information for UI (non-httpOnly)

## Security Features

1. **JWT tokens** stored in httpOnly cookies (not accessible via JavaScript)
2. **Server-side validation** of all authentication state
3. **Middleware protection** at the route level
4. **Automatic redirects** for unauthorized access
5. **Secure cookies** in production environment

## Benefits

1. **Better Security** - Authentication logic runs on server
2. **Better Performance** - No client-side auth state management
3. **SEO Friendly** - Server-side rendering with proper user state
4. **Simpler Client Code** - Minimal client-side authentication logic
5. **Better UX** - Immediate redirects and no loading states

## Migration Notes

- Removed `AuthProvider` context
- Removed client-side cookie management
- All authentication now handled server-side
- Client components only handle forms and UI interactions
