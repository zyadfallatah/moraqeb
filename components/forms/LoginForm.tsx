"use client";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [formFields, setFormFields] = useState<{
    ssn: string;
    password: string;
  }>({ ssn: "", password: "" });
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSsnChange = (value: string) => {
    // Only allow digits and limit to 10 characters
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length <= 10) {
      setFormFields({ ...formFields, ssn: digitsOnly });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoggingIn(true);

    try {
      const { ssn, password } = formFields;

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ssn, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormFields({ ssn: "", password: "" });
        // Redirect to home page - cookies are already set by server
        router.push("/");
        // Force a page refresh to update server-side state
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const isFormValid =
    formFields.ssn.length === 10 && formFields.password.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-8">
        <Label htmlFor="ssn" className="text-right block mb-2 text-gray-700">
          رقم الهوية *
        </Label>
        <Input
          id="ssn"
          type="text"
          value={formFields.ssn}
          onChange={(e) => handleSsnChange(e.target.value)}
          placeholder="مثال 1234567890"
          className="text-right"
          dir="ltr"
          maxLength={10}
          required
        />
        {formFields.ssn.length > 0 && formFields.ssn.length < 10 && (
          <p className="text-sm text-red-600 mt-1 text-right">
            يجب أن يكون رقم الهوية 10 أرقام
          </p>
        )}
      </div>

      <div>
        <Label
          htmlFor="password"
          className="text-right block mb-2 text-gray-700"
        >
          الرقم السري *
        </Label>
        <Input
          id="password"
          type="password"
          value={formFields.password}
          onChange={(e) =>
            setFormFields({ ...formFields, password: e.target.value })
          }
          placeholder="رمز المرور"
          className="text-right"
          required
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md text-right">
          {error}
        </div>
      )}

      <Button
        type="submit"
        className="w-full bg-primary text-white p-6 text-lg"
        disabled={!isFormValid || isLoggingIn}
      >
        {isLoggingIn ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </Button>
    </form>
  );
};

export default LoginForm;
