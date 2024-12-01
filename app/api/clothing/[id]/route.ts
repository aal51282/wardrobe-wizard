import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import { auth } from "@/auth";

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
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Find the item first to get the image URLs
    const item = await ClothingItem.findOne({
      _id: params.id,
      userId: session.user.email
    });

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    // Delete images from Cloudinary
    for (const imageUrl of item.imageUrls) {
      // Extract public_id from Cloudinary URL
      const publicId = imageUrl.split('/').pop()?.split('.')[0];
      if (publicId) {
        await deleteFromCloudinary(publicId);
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
