import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import User from "@/app/models/userModel";
import { auth } from "@/auth";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newPassword } = await req.json();

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the user's password
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
} 