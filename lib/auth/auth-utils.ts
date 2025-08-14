import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "24h";

// Validate JWT secret is available
if (!JWT_SECRET) {
  console.warn(
    "JWT_SECRET environment variable is not set. Using fallback secret for development only."
  );
}

const SECRET_KEY = JWT_SECRET || "your-secret-key-change-in-production";

export interface JWTPayload {
  userId: number;
  ssn: string;
  iat: number;
  exp: number;
}

// Password utilities
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

// JWT utilities
export function generateToken(userId: string, ssn: string): string {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }

  return jwt.sign({ userId, ssn }, SECRET_KEY, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    if (!JWT_SECRET) {
      console.warn("JWT_SECRET not available, token verification may fail");
      return null;
    }

    return jwt.verify(token, SECRET_KEY) as JWTPayload;
  } catch (error) {
    console.log("Token verification failed:", error);
    return null;
  }
}
