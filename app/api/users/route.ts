import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "../../libs/mongodb";
import User from "../../models/userModel";

// Define proper error type
interface _ApiError {
  message: string;
  code?: string;
}

export async function GET() {
  await connectMongoDB();
  const users = await User.find().select("-password"); // Exclude passwords
  return NextResponse.json({ users });
}

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    console.log("Received data:", { email, firstName, lastName });

    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });

    return NextResponse.json(
      {
        message: "User added successfully",
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
