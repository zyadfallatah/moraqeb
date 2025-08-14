import { NextRequest, NextResponse } from "next/server";
import { destroyUserSession } from "@/lib/actions/authActions";

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header for logging
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      const token = authHeader.substring(7);
      console.log("User logged out, token:", token);
    }

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    // Clear session using server action
    await destroyUserSession();

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
