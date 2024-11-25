import { NextResponse } from "next/server";
import connectMongoDB from "@/app/libs/mongodb";
import User from "@/app/models/userModel";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    await connectMongoDB();
    
    const user = await User.findOne({ username }).select("email");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ email: user.email });
  } catch (error) {
    console.error("Error checking username:", error);
    return NextResponse.json(
      { error: "An error occurred while checking username" },
      { status: 500 }
    );
  }
} 