import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import mongoose from "mongoose";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { name } = await request.json();

    if (!name?.trim()) {
      return new NextResponse("Name is required", { status: 400 });
    }

    await connectToDatabase();
    
    const result = await mongoose
      .connection
      .collection("outfits")
      .updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { name } }
      );

    if (result.matchedCount === 0) {
      return new NextResponse("Outfit not found", { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating outfit:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 