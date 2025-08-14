"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface LogoutProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export default function Logout({
  variant = "outline",
  size = "default",
  className = "",
}: LogoutProps) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        // Redirect to home page after logout
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={className}
    >
      تسجيل الخروج
    </Button>
  );
}
