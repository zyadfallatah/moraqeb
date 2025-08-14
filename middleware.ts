import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that require authentication
const protectedRoutes = ["/profile", "/lands"];

// Routes that should redirect authenticated users away
const guestRoutes = ["/login", "/signup"];

// Simple JWT verification for middleware (Edge Runtime compatible)
function verifyTokenInMiddleware(token: string): boolean {
  try {
    // Basic JWT structure validation without crypto operations
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    // Decode payload (base64url decode)
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
    );

    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return false;

    // Check if token has required fields
    if (!payload.userId || !payload.ssn) return false;

    return true;
  } catch (error) {
    // Silently fail in middleware - don't log sensitive info
    return false;
  }
}

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Check if user is authenticated
    const authToken = request.cookies.get("auth-token")?.value;
    const isAuthenticated = authToken && verifyTokenInMiddleware(authToken);

    // Handle protected routes
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // Handle guest routes (redirect authenticated users away)
    if (guestRoutes.some((route) => pathname.startsWith(route))) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    return NextResponse.next();
  } catch (error) {
    // If middleware fails, allow the request to continue
    // This prevents the entire app from breaking due to middleware errors
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
