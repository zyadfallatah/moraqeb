import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth/auth-utils";
import db from "@/database";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  try {
    const { ssn, password, fullName, phone, birthDate } = await request.json();

    // Validate SSN - must be exactly 10 digits
    if (!ssn || !/^\d{10}$/.test(ssn)) {
      return NextResponse.json(
        { error: "SSN must be exactly 10 digits" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!password || !fullName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.ssn, ssn));

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "User with this SSN already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const [newUser] = await db
      .insert(users)
      .values({
        fullName,
        ssn,
        password: hashedPassword,
        phone,
        birthDate,
      })
      .returning();

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
