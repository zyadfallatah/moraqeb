"use server";
import { cookies } from "next/headers";
import db from "@/database";
import { users, type User } from "@/database/schema";
import { eq } from "drizzle-orm";
import { verifyToken } from "@/lib/auth/auth-utils";

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
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return null;
    }

    // Verify the JWT token
    const payload = verifyToken(token);
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
