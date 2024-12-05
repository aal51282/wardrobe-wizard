import { NextRequest } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { User } from "@/app/models/user";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { username } = await request.json();

    if (!username) {
      return Response.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ username: username.toLowerCase() });

    return Response.json(
      { available: !existingUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error);
    return Response.json(
      { error: "Failed to check username availability" },
      { status: 500 }
    );
  }
} 