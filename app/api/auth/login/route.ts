import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/auth/auth-utils";
import db from "@/database";
import { users, type UserWithoutPassword } from "@/database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createUserSession } from "@/lib/actions/authActions";

export async function POST(request: NextRequest) {
  try {
    const { ssn, password } = await request.json();

    // Validate SSN - must be exactly 10 digits
    if (!ssn || !/^\d{10}$/.test(ssn)) {
      return NextResponse.json(
        { error: "SSN must be exactly 10 digits" },
        { status: 400 }
      );
    }

    // Validate password exists
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    // Find user by SSN
    const [user] = await db.select().from(users).where(eq(users.ssn, ssn));

    if (!user) {
      return NextResponse.json(
        { error: "Invalid SSN or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid SSN or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user.id, user.ssn);

    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    const safeUser: UserWithoutPassword = userWithoutPassword;

    // Create response
    const response = NextResponse.json({
      success: true,
      user: safeUser,
      token,
      message: "Login successful",
    });

    // Set cookies using server action
    await createUserSession(safeUser, token);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
