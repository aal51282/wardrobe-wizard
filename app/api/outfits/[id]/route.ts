import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import mongoose from "mongoose";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { name, items } = await request.json();

    if (!name?.trim()) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!Array.isArray(items)) {
      return new NextResponse("Items must be an array", { status: 400 });
    }

    await connectToDatabase();
    
    const result = await mongoose
      .connection
      .collection("outfits")
      .updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { 
          $set: { 
            name,
            items: items.map(itemId => new mongoose.Types.ObjectId(itemId))
          } 
        }
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await connectToDatabase();
    
    const result = await mongoose
      .connection
      .collection("outfits")
      .deleteOne({ _id: new mongoose.Types.ObjectId(id) });

    if (result.deletedCount === 0) {
      return new NextResponse("Outfit not found", { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting outfit:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 