import { NextRequest } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { Outfit } from "@/app/models/outfit";
import { auth } from "@/auth";
import mongoose from "mongoose";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Ensure valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return Response.json(
        { error: "Invalid ID format" },
        { status: 400 }
      );
    }

    const outfit = await Outfit.findOneAndDelete({
      _id: params.id,
      userId: session.user.email,
    });

    if (!outfit) {
      return Response.json(
        { error: "Outfit not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { message: "Outfit deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete outfit:", error);
    return Response.json(
      { error: "Failed to delete outfit" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const data = await request.json();

    const updatedOutfit = await Outfit.findOneAndUpdate(
      {
        _id: params.id,
        userId: session.user.email,
      },
      data,
      { new: true }
    );

    if (!updatedOutfit) {
      return Response.json(
        { error: "Outfit not found" },
        { status: 404 }
      );
    }

    return Response.json(updatedOutfit, { status: 200 });
  } catch (error) {
    console.error("Failed to update outfit:", error);
    return Response.json(
      { error: "Failed to update outfit" },
      { status: 500 }
    );
  }
} 