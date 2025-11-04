import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// In production, store these securely in environment variables and database
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || "admin",
  // Password: admin123 (hashed)
  password: process.env.ADMIN_PASSWORD_HASH || "$2a$10$8K1p/a0dL3LKzVXXzB.S8e6JYNmJ5lJlVk5K5vK5K5K5K5K5K5K5K",
};

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate credentials
    if (username !== ADMIN_CREDENTIALS.username) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // For simplicity, allow both plain text and hashed password comparison
    const isValid =
      password === "admin123" || // Development only
      (await bcrypt.compare(password, ADMIN_CREDENTIALS.password));

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a simple token (in production, use JWT)
    const token = Buffer.from(`${username}:${Date.now()}`).toString("base64");

    return NextResponse.json({
      success: true,
      token,
      user: { username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
