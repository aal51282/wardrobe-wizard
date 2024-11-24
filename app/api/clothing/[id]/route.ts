import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";
import fs from "fs/promises";
import path from "path";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    // Find the item first to get the image URLs
    const item = await ClothingItem.findById(params.id);

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // Delete the associated images from the uploads directory
    for (const imageUrl of item.imageUrls) {
      const imagePath = path.join(process.cwd(), "public", imageUrl);
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error("Error deleting image file:", error);
      }
    }

    // Delete the item from the database
    await ClothingItem.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete item:", error);
    return NextResponse.json(
      { message: "Failed to delete item" },
      { status: 500 }
    );
  }
}
