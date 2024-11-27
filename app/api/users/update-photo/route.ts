import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import User from "@/app/models/userModel";
import { auth } from "@/auth";

export async function PUT(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { photoUrl } = await request.json();
    console.log("Updating photo for user:", session.user.email);
    console.log("New photo URL:", photoUrl);

    await connectToDatabase();

    // Update the user's photo URL in the database
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { photoUrl: photoUrl } },
      { new: true }
    );

    if (!updatedUser) {
      console.log("User not found in database");
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    console.log("Updated user:", updatedUser);

    return NextResponse.json({
      success: true,
      photoUrl: photoUrl,
      message: "Profile photo updated successfully"
    });

  } catch (error) {
    console.error("Update photo error:", error);
    return NextResponse.json(
      { error: "Failed to update profile photo" },
      { status: 500 }
    );
  }
} 