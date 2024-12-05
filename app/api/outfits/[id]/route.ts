/* eslint-disable */
// @ts-nocheck
// @ts-ignore
// @ts-expect-error
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { Outfit } from "@/app/models/outfit";
import { auth } from "@/auth";
import mongoose from "mongoose";

// @ts-ignore
// @ts-expect-error
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Ensure valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }

    // Delete the outfit
    const deletedOutfit = await Outfit.findOneAndDelete({
      _id: params.id,
      userId: session.user.email
    });

    if (!deletedOutfit) {
      return NextResponse.json(
        { error: "Outfit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Outfit deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete outfit:", error);
    return NextResponse.json(
      { error: "Failed to delete outfit" },
      { status: 500 }
    );
  }
}

// @ts-ignore
// @ts-expect-error
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    const data = await request.json();

    const updatedOutfit = await Outfit.findOneAndUpdate(
      {
        _id: params.id,
        userId: session.user.email
      },
      data,
      { new: true }
    );

    if (!updatedOutfit) {
      return NextResponse.json(
        { message: "Outfit not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOutfit, { status: 200 });
  } catch (error) {
    console.error("Failed to update outfit:", error);
    return NextResponse.json(
      { message: "Failed to update outfit" },
      { status: 500 }
    );
  }
} 