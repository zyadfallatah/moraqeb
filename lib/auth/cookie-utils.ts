import { User } from "@/database/schema";
import Cookies from "js-cookie";

// Cookie configuration
const COOKIE_OPTIONS = {
  expires: 7, // 7 days
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

// Cookie names
export const COOKIE_NAMES = {
  AUTH_TOKEN: "auth-token",
  USER_DATA: "user-data",
} as const;

// Set authentication token in cookie
export function setAuthToken(token: string): void {
  Cookies.set(COOKIE_NAMES.AUTH_TOKEN, token, COOKIE_OPTIONS);
}

// Get authentication token from cookie
export function getAuthToken(): string | undefined {
  return Cookies.get(COOKIE_NAMES.AUTH_TOKEN);
}

// Remove authentication token from cookie
export function removeAuthToken(): void {
  Cookies.remove(COOKIE_NAMES.AUTH_TOKEN, { path: "/" });
}

// Set user data in cookie (optional, for client-side access)
export function setUserData(user: User): void {
  Cookies.set(COOKIE_NAMES.USER_DATA, JSON.stringify(user), COOKIE_OPTIONS);
}

// Get user data from cookie
export function getUserData(): User | null {
  const data = Cookies.get(COOKIE_NAMES.USER_DATA);
  if (!data) return null;

  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

// Remove user data from cookie
export function removeUserData(): void {
  Cookies.remove(COOKIE_NAMES.USER_DATA, { path: "/" });
}

// Clear all authentication cookies
export function clearAuthCookies(): void {
  removeAuthToken();
  removeUserData();
}

// Check if user is authenticated (client-side)
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}
