import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";
import { auth } from "@/auth";

export const runtime = "nodejs";

// Helper function to capitalize every word
function capitalizeWords(string: string): string {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Helper function to format size to uppercase
function formatSize(size: string): string {
  return size.toUpperCase();
}

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    console.log("Received form data");

    // Extract and format form fields
    const category = capitalizeWords(formData.get("category") as string);
    const color = capitalizeWords(formData.get("color") as string);
    const size = formatSize(formData.get("size") as string);
    const brand = capitalizeWords(formData.get("brand") as string);
    const imageFiles = formData.getAll("images") as File[];

    if (!category || !color || !size || !brand || imageFiles.length === 0) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    const imageUrls: string[] = [];
    
    for (const imageFile of imageFiles) {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('upload_preset', 'wardrobe-wizard');
      
      const uploadResponse = await fetch(
        'https://api.cloudinary.com/v1_1/dia5ivuqq/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload image to Cloudinary');
      }

      const uploadData = await uploadResponse.json();
      imageUrls.push(uploadData.secure_url);
    }

    // Create and save the clothing item
    const newClothingItem = new ClothingItem({
      category,
      color,
      size,
      brand,
      imageUrls,
      userId: session.user.email,
    });

    const savedItem = await newClothingItem.save();
    console.log("Saved item:", savedItem);

    return NextResponse.json(
      {
        message: "Clothing item uploaded successfully",
        item: savedItem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Failed to upload clothing item" },
      { status: 500 }
    );
  }
}
