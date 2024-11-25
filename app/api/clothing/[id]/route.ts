import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";
import fs from "fs/promises";
import path from "path";

// Helper function to capitalize every word
function capitalizeWords(string: string): string {
  return string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Helper function to format size to uppercase
function formatSize(size: string): string {
  return size.toUpperCase();
}

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

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    const data = await req.json();
    
    // Format the data
    const formattedData = {
      category: capitalizeWords(data.category),
      color: capitalizeWords(data.color),
      size: formatSize(data.size),
      brand: capitalizeWords(data.brand),
    };

    const updatedItem = await ClothingItem.findByIdAndUpdate(
      params.id,
      formattedData,
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json(
        { message: "Item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Failed to update item:", error);
    return NextResponse.json(
      { message: "Failed to update item" },
      { status: 500 }
    );
  }
}
