import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { initUploadsDirectory } from "@/app/lib/init-uploads";

export const runtime = "nodejs";

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

export async function POST(req: NextRequest) {
  try {
    initUploadsDirectory();
    await connectToDatabase();

    const formData = await req.formData();
    
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

    // Process and save images
    const imageUrls: string[] = [];
    
    for (const imageFile of imageFiles) {
      try {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const uniqueId = uuidv4();
        const originalName = imageFile.name;
        const extension = path.extname(originalName);
        const filename = `${uniqueId}${extension}`;
        
        // Ensure upload directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        await writeFile(path.join(uploadDir, filename), buffer);
        
        // Store the public URL
        imageUrls.push(`/uploads/${filename}`);
      } catch (error) {
        console.error("Error saving image:", error);
        return NextResponse.json(
          { message: "Error saving image" },
          { status: 500 }
        );
      }
    }

    // Create and save the clothing item with formatted data
    const newClothingItem = new ClothingItem({
      category,
      color,
      size,
      brand,
      imageUrls,
    });

    await newClothingItem.save();

    return NextResponse.json(
      { 
        message: "Clothing item uploaded successfully",
        item: newClothingItem 
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
