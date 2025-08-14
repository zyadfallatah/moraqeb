"use server";
import { cookies } from "next/headers";
import db from "@/database";
import { users, type User, type UserWithoutPassword } from "@/database/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth/auth-utils";
import { redirect } from "next/navigation";

export async function getUserBySSN(ssn: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.ssn, ssn));
  return user || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user || null;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return null;
    }

    // Verify the JWT token
    const payload = verifyToken(authToken);
    if (!payload) {
      return null;
    }

    // Get user from database using the verified payload
    const user = await getUserById(payload.userId.toString());
    return user;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireGuest(): Promise<void> {
  const user = await getCurrentUser();
  if (user) {
    redirect("/");
  }
}

export async function createUserSession(
  user: UserWithoutPassword,
  token: string
): Promise<void> {
  const cookieStore = await cookies();

  // Set auth token (httpOnly for security)
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });

  // Set user data (non-httpOnly for UI access)
  cookieStore.set("user-data", JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

export async function destroyUserSession(): Promise<void> {
  const cookieStore = await cookies();

  // Clear auth token
  cookieStore.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  // Clear user data
  cookieStore.set("user-data", "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

// Server action for logout (can be used in forms)
export async function logoutAction(): Promise<void> {
  await destroyUserSession();
  redirect("/");
}
