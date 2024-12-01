import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import User from "@/app/models/userModel";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email }).select('photoUrl');

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ photoUrl: user.photoUrl || '/default-avatar.png' });
  } catch (error) {
    console.error("Error fetching user photo:", error);
    return NextResponse.json(
      { error: "Failed to fetch user photo" },
      { status: 500 }
    );
  }
} 