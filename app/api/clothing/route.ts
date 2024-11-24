import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/libs/mongodb";
import { ClothingItem } from "@/app/models/clothingItem";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    // Get all clothing items from the database
    const items = await ClothingItem.find({}).sort({ createdAt: -1 });

    // Transform the items to match the frontend interface
    const transformedItems = items.map((item) => ({
      id: item._id.toString(),
      name: `${item.brand} ${item.category}`, // Creating a name from brand and category
      image: item.imageUrls[0], // Using the first image
      category: item.category,
      color: item.color,
      size: item.size,
      brand: item.brand,
      selected: false,
    }));    

    return NextResponse.json(transformedItems);
  } catch (error) {
    console.error("Failed to fetch clothing items:", error);
    return NextResponse.json(
      { message: "Failed to fetch clothing items" },
      { status: 500 }
    );
  }
}
