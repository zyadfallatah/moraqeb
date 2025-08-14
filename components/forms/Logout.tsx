"use client";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";

const Logout = () => {
  const { logout } = useAuth();
  const router = useRouter();
  return (
    <Button
      variant="outline"
      size="sm"
      className="text-gray-700"
      type="submit"
      onClick={async () => {
        await logout();
        router.push("/");
      }}
    >
      <LogOut className="w-4 h-4 ml-2" />
      تسجيل الخروج
    </Button>
  );
};

export default Logout;
