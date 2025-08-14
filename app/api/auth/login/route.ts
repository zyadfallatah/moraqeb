import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "@/lib/auth/auth-utils";
import db from "@/database";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

    // Create response with cookies
    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      token,
      message: "Login successful",
    });

    // Set authentication cookies
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    response.cookies.set("user-data", JSON.stringify(userWithoutPassword), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
