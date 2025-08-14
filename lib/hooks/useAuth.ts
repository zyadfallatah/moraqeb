"use client";
import { useState, useEffect } from "react";
import { UserWithoutPassword } from "@/database/schema";

export function useAuth() {
  const [user, setUser] = useState<UserWithoutPassword | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user data from cookies (non-httpOnly cookie)
    const getUserFromCookies = () => {
      try {
        const userData = document.cookie
          .split("; ")
          .find((row) => row.startsWith("user-data="))
          ?.split("=")[1];

        if (userData) {
          const user = JSON.parse(decodeURIComponent(userData));
          setUser(user);
        }
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserFromCookies();
  }, []);

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        setUser(null);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    user,
    isLoading,
    logout,
    isAuthenticated: !!user,
  };
}
