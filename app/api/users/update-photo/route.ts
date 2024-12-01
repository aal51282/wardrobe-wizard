import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import User from "@/app/models/userModel";
import { auth } from "@/auth";

export async function PUT(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { photoUrl } = await request.json();
    if (!photoUrl) {
      return NextResponse.json({ error: "Photo URL is required" }, { status: 400 });
    }

    await connectToDatabase();

    console.log('Updating user photo:', {
      email: session.user.email,
      photoUrl
    });

    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { photoUrl } },
      { new: true }
    );

    if (!updatedUser) {
      console.error('User not found:', session.user.email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log('User updated successfully:', updatedUser);

    return NextResponse.json({ 
      message: "Profile photo updated successfully",
      photoUrl: updatedUser.photoUrl 
    });
  } catch (error) {
    console.error("Error updating profile photo:", error);
    return NextResponse.json(
      { error: "Failed to update profile photo" },
      { status: 500 }
    );
  }
} 